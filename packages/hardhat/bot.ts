// Importing modules and libraries
import express from "express";
import { ethers, Contract } from "ethers";
import path from "path";
import http from "http";
import cors from "cors";

// Importing types and interfaces for better typing support
import config from "./config.json";
import { getTokenAndContract, getPairContract, getReserves, calculatePrice, simulate } from "./helpers/helpers";
import { provider, uFactory, uRouter, sFactory, sRouter, arbitrage } from "./helpers/initialization";

import { config as dotenvConfig } from "dotenv";
import { ERC20 } from "./types/ethers-contracts/ERC20";
dotenvConfig({ path: "../../.env" });

// Define your environment variables here. Adjust types as necessary.
const arbFor: string = process.env.ARB_FOR || ""; // This is the address of token we are attempting to arbitrage (WETH)
const arbAgainst: string = process.env.ARB_AGAINST || ""; // SHIB
const units: number = parseInt(process.env.UNITS || "18"); // Used for price display/reporting
const difference: number = parseFloat(process.env.PRICE_DIFFERENCE || "0");
const gasLimit: bigint = BigInt(process.env.GAS_LIMIT || "0");
const gasPrice: bigint = BigInt(ethers.parseUnits(process.env.GAS_PRICE || "0", "ether"));

const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) {
  throw new Error("PRIVATE_KEY environment variable is not set.");
}

// Server setup with express
const PORT: number | string = process.env.PORT || 5001;
const app = express();
http.createServer(app).listen(PORT, () => console.log(`Listening on ${PORT}\n`));

app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ credentials: true, origin: "*" }));

let uPair: Contract, sPair: Contract, amount: bigint;
let isExecuting = false;

interface Token {
  address: string;
  decimals: number;
  symbol: string;
  name: string;
}

const main = async () => {
  const { token0Contract, token1Contract, token0, token1 } = await getTokenAndContract(arbFor, arbAgainst, provider);
  uPair = await getPairContract(uFactory, token0.address, token1.address, provider);
  sPair = await getPairContract(sFactory, token0.address, token1.address, provider);

  console.log(`uPair Address: ${await uPair.getAddress()}`);
  console.log(`sPair Address: ${await sPair.getAddress()}\n`);

  const uPairToken0Amount = await token0Contract.balanceOf(uPair);
  const uPairToken1Amount = await token1Contract.balanceOf(uPair);
  const sPairToken0Amount = await token0Contract.balanceOf(sPair);
  const sPairToken1Amount = await token1Contract.balanceOf(sPair);

  console.log(`uPair WETH: ${ethers.formatUnits(uPairToken0Amount.toString(), "ether")}`);
  console.log(`uPair SHIBA: ${ethers.formatUnits(uPairToken1Amount.toString(), "ether")}\n`);

  console.log(`sPair WETH: ${ethers.formatUnits(sPairToken0Amount.toString(), "ether")}`);
  console.log(`sPair SHIBA: ${ethers.formatUnits(sPairToken1Amount.toString(), "ether")}\n`);

  uPair.on("Swap", async () => {
    if (!isExecuting) {
      isExecuting = true;

      const priceDifference = await checkPrice("Uniswap", token0, token1);
      const routerPath = await determineDirection(priceDifference);

      if (!routerPath) {
        console.log(`No Arbitrage Currently Available\n`);
        console.log(`-----------------------------------------\n`);
        isExecuting = false;
        return;
      }

      const isProfitable = await determineProfitability(routerPath, token0Contract, token0, token1);

      if (!isProfitable) {
        console.log(`No Arbitrage Currently Available\n`);
        console.log(`-----------------------------------------\n`);
        isExecuting = false;
        return;
      }

      await executeTrade(routerPath, token0Contract, token1Contract);

      isExecuting = false;
    }
  });

  sPair.on("Swap", async () => {
    if (!isExecuting) {
      isExecuting = true;

      const priceDifference = await checkPrice("Sushiswap", token0, token1);
      const routerPath = await determineDirection(priceDifference);

      if (!routerPath) {
        console.log(`No Arbitrage Currently Available\n`);
        console.log(`-----------------------------------------\n`);
        isExecuting = false;
        return;
      }

      const isProfitable = await determineProfitability(routerPath, token0Contract, token0, token1);

      if (!isProfitable) {
        console.log(`No Arbitrage Currently Available\n`);
        console.log(`-----------------------------------------\n`);
        isExecuting = false;
        return;
      }

      await executeTrade(routerPath, token0Contract, token1Contract);

      isExecuting = false;
    }
  });

  console.log("Waiting for swap event...");
};

const checkPrice = async (_exchange: string, _token0: Token, _token1: Token): Promise<string> => {
  isExecuting = true;
  console.log(`Swap Initiated on ${_exchange}, Checking Price...\n`);

  const currentBlock = await provider.getBlockNumber();
  const uPrice = await calculatePrice(uPair);
  const sPrice = await calculatePrice(sPair);

  const uFPrice = Number(uPrice).toFixed(units);
  const sFPrice = Number(sPrice).toFixed(units);
  const priceDifference = (((Number(uFPrice) - Number(sFPrice)) / Number(sFPrice)) * 100).toFixed(2);

  console.log(`Current Block: ${currentBlock}`);
  console.log(`-----------------------------------------`);
  console.log(`UNISWAP   | ${_token1.symbol}/${_token0.symbol}\t | ${uFPrice}`);
  console.log(`SUSHISWAP | ${_token1.symbol}/${_token0.symbol}\t | ${sFPrice}\n`);
  console.log(`Percentage Difference: ${priceDifference}%\n`);

  return priceDifference;
};

const determineDirection = async (_priceDifference: string): Promise<Contract[] | null> => {
  console.log(`Determining Direction...\n`);

  if (parseFloat(_priceDifference) >= difference) {
    console.log(`Potential Arbitrage Direction:\n`);
    console.log(`Buy\t -->\t Uniswap\nSell\t -->\t Sushiswap\n`);
    return [uRouter, sRouter];
  } else if (parseFloat(_priceDifference) <= -difference) {
    console.log(`Potential Arbitrage Direction:\n`);
    console.log(`Buy\t -->\t Sushiswap\nSell\t -->\t Uniswap\n`);
    return [sRouter, uRouter];
  }
  return null;
};

const determineProfitability = async (
  _routerPath: Contract[],
  _token0Contract: ERC20,
  _token0: Token,
  _token1: Token,
): Promise<boolean> => {
  console.log(`Determining Profitability...\n`);
  let exchangeToBuy: string, exchangeToSell: string;

  if ((await _routerPath[0].getAddress()) === (await uRouter.getAddress())) {
    exchangeToBuy = "Uniswap";
    exchangeToSell = "Sushiswap";
  } else {
    exchangeToBuy = "Sushiswap";
    exchangeToSell = "Uniswap";
  }

  const uReserves: bigint[] = await getReserves(uPair);
  const sReserves: bigint[] = await getReserves(sPair);

  let minAmount: bigint;

  if (uReserves[0] > sReserves[0]) {
    minAmount = sReserves[0] / BigInt(20);
  } else {
    minAmount = uReserves[0] / BigInt(20);
  }

  try {
    // This returns the amount of WETH needed to swap for X amount of SHIB
    const estimate = await _routerPath[0].getAmountsIn(minAmount, [_token0.address, _token1.address]);

    // This returns the amount of WETH for swapping X amount of SHIB
    const result = await _routerPath[1].getAmountsOut(estimate[1], [_token1.address, _token0.address]);

    console.log(
      `Estimated amount of WETH needed to buy enough SHIB on ${exchangeToBuy}\t\t| ${ethers.formatUnits(
        estimate[0],
        "ether",
      )}`,
    );
    console.log(
      `Estimated amount of WETH returned after swapping SHIB on ${exchangeToSell}\t| ${ethers.formatUnits(
        result[1],
        "ether",
      )}\n`,
    );

    const { amountIn, amountOut } = await simulate(estimate[0], _routerPath, _token0, _token1);
    const amountDifference: number = Number(amountOut) - Number(amountIn);
    const estimatedGasCost = gasLimit * gasPrice;

    // Fetch account
    const account = new ethers.Wallet(privateKey, provider);

    // Fetching WETH balance before in Wei
    const wethBalanceBeforeWei: bigint = await _token0Contract.balanceOf(account.address);

    // Calculating WETH balance after. Note: Both variables should be BigNumber
    const wethBalanceAfterWei: bigint = wethBalanceBeforeWei + ethers.parseUnits(amountDifference.toString(), "ether");

    // Calculating the difference in WETH balance in Wei
    const wethBalanceDifferenceWei: bigint = wethBalanceAfterWei - wethBalanceBeforeWei;

    // For display: Convert Wei values to Ether
    const wethBalanceBefore: string = ethers.formatEther(wethBalanceBeforeWei);
    const wethBalanceAfter: string = ethers.formatEther(wethBalanceAfterWei);
    const wethBalanceDifference: string = ethers.formatEther(wethBalanceDifferenceWei);

    // Assuming estimatedGasCost is a BigNumber representing gas cost in Wei
    const estimatedGasCostEther: string = ethers.formatEther(estimatedGasCost);

    const ethBalanceBeforeWei = await provider.getBalance(account.address);
    const ethBalanceBefore: string = ethers.formatEther(ethBalanceBeforeWei);
    const ethBalanceAfter: string = ethers.formatEther(ethBalanceBeforeWei - estimatedGasCost);

    const data = {
      "ETH Balance Before": ethBalanceBefore,
      "ETH Balance After": ethBalanceAfter,
      "ETH Spent (gas)": estimatedGasCostEther,
      "-": {},
      "WETH Balance BEFORE": wethBalanceBefore,
      "WETH Balance AFTER": wethBalanceAfter,
      "WETH Gained/Lost": wethBalanceDifference,
      "--": {},
      "Total Gained/Lost": ethers.formatEther(wethBalanceDifferenceWei - estimatedGasCost),
    };

    console.table(data);

    if (Number(amountOut) < Number(amountIn)) {
      return false;
    }

    amount = ethers.parseUnits(amountIn, "ether");
    return true;
  } catch (error) {
    console.log(error);
    console.log(`\nError occured while trying to determine profitability...\n`);
    console.log(`This can typically happen because of liquidity issues, see README for more information.\n`);
    return false;
  }
};

const executeTrade = async (_routerPath: Contract[], _token0Contract: ERC20, _token1Contract: ERC20): Promise<void> => {
  console.log(`Attempting Arbitrage...\n`);

  let startOnUniswap;

  if ((await _routerPath[0].getAddress()) == (await uRouter.getAddress())) {
    startOnUniswap = true;
  } else {
    startOnUniswap = false;
  }

  // Create Signer
  const account = new ethers.Wallet(privateKey, provider);

  // Fetch token balances before
  const tokenBalanceBefore = await _token0Contract.balanceOf(account.address);
  const ethBalanceBefore = await provider.getBalance(account.address);

  if (config.PROJECT_SETTINGS.isDeployed) {
    console.log(`Executing trade for amount: ${ethers.formatUnits(amount.toString(), "ether")} WETH ...\n`);
    const transaction = await arbitrage
      .connect(account)
      .executeTrade(startOnUniswap, await _token0Contract.getAddress(), await _token1Contract.getAddress(), amount, {
        gasLimit: process.env.GAS_LIMIT,
      });

    await transaction.wait();
  }

  console.log(`Trade Complete:\n`);

  // Fetch token balances after
  const tokenBalanceAfter = await _token0Contract.balanceOf(account.address);
  const ethBalanceAfter = await provider.getBalance(account.address);

  const tokenBalanceDifference = tokenBalanceAfter - tokenBalanceBefore;
  const ethBalanceDifference = ethBalanceBefore - ethBalanceAfter;

  const data = {
    "ETH Balance Before": ethers.formatUnits(ethBalanceBefore, "ether"),
    "ETH Balance After": ethers.formatUnits(ethBalanceAfter, "ether"),
    "ETH Spent (gas)": ethers.formatUnits(ethBalanceDifference.toString(), "ether"),
    "-": {},
    "WETH Balance BEFORE": ethers.formatUnits(tokenBalanceBefore, "ether"),
    "WETH Balance AFTER": ethers.formatUnits(tokenBalanceAfter, "ether"),
    "WETH Gained/Lost": ethers.formatUnits(tokenBalanceDifference.toString(), "ether"),
    "--": {},
    "Total Gained/Lost": `${ethers.formatUnits(
      (tokenBalanceDifference - ethBalanceDifference).toString(),
      "ether",
    )} ETH`,
  };

  console.table(data);
};

main();

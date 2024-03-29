import { Contract, ethers, Signer } from "ethers";
import { config as dotenvConfig } from "dotenv";
dotenvConfig({ path: "../../.env" });

import hre from "hardhat";

// Import helper functions & config
import { getTokenAndContract, getPairContract, calculatePrice } from "../helpers/helpers";
import { provider, uFactory, uRouter } from "../helpers/initialization";

import { IUniswapV2Router02 } from "../typechain-types/@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02";
import { ERC20 } from "../types/ethers-contracts/ERC20";

interface Token {
  address: string;
  decimals: number;
  symbol: string;
  name: string;
}

// Configure values here
const V2_FACTORY_TO_USE: Contract = uFactory;
const V2_ROUTER_TO_USE: IUniswapV2Router02 = uRouter as unknown as IUniswapV2Router02;
const UNLOCKED_ACCOUNT: string = "0xdEAD000000000000000042069420694206942069";
const AMOUNT: string = "10500000000"; // Will be converted to BigInt

async function main() {
  // Fetch contracts
  const { token0Contract, token0, token1 } = await getTokenAndContract(
    process.env.ARB_AGAINST as string,
    process.env.ARB_FOR as string,
    provider,
  );

  const pair: Contract = await getPairContract(V2_FACTORY_TO_USE, token0.address, token1.address, provider);
  const priceBefore: string = await calculatePrice(pair);
  await manipulatePrice([token0, token1], token0Contract);
  const priceAfter: string = await calculatePrice(pair);

  console.table({
    "Price Before": `1 WETH = ${Number(priceBefore).toFixed(0)} SHIB`,
    "Price After": `1 WETH = ${Number(priceAfter).toFixed(0)} SHIB`,
  });

  console.log("Finished swapping!");
}

async function manipulatePrice(_path: Token[], _token0Contract: ERC20): Promise<void> {
  const amount: bigint = ethers.parseUnits(AMOUNT, "ether");
  const path: string[] = [_path[0].address, _path[1].address];
  const deadline: number = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes

  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [UNLOCKED_ACCOUNT],
  });

  const signer: Signer = await hre.ethers.getSigner(UNLOCKED_ACCOUNT);

  await _token0Contract.connect(signer).approve(V2_ROUTER_TO_USE, amount.toString(), { gasLimit: 50000 });
  await V2_ROUTER_TO_USE.connect(signer).swapExactTokensForTokens(
    amount.toString(),
    0, // Minimum amount out
    path,
    await signer.getAddress(),
    deadline,
    { gasLimit: 125000 },
  );
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

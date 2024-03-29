// import { ethers, WebSocketProvider } from "hardhat";
import { ethers, Contract } from "ethers";
import { FlashLoan__factory } from "../types/ethers-contract";
import { config as dotenvConfig } from "dotenv";
dotenvConfig({ path: "../../.env" });

import config from "../config.json";
import IUniswapV2Router02 from "@uniswap/v2-periphery/build/IUniswapV2Router02.json";
import IUniswapV2Factory from "@uniswap/v2-core/build/IUniswapV2Factory.json";
// import IArbitrage from "../artifacts/contracts/FlashLoan.sol/FlashLoan.json";

let provider: ethers.WebSocketProvider;

if (config.PROJECT_SETTINGS.isLocal) {
  provider = new ethers.WebSocketProvider(`ws://127.0.0.1:8545/`);
} else {
  provider = new ethers.WebSocketProvider(`wss://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);
}

// -- SETUP UNISWAP/SUSHISWAP CONTRACTS -- //
const uFactory = new Contract(config.UNISWAP.FACTORY_ADDRESS, IUniswapV2Factory.abi, provider);
const uRouter = new Contract(config.UNISWAP.V2_ROUTER_02_ADDRESS, IUniswapV2Router02.abi, provider);
const sFactory = new Contract(config.SUSHISWAP.FACTORY_ADDRESS, IUniswapV2Factory.abi, provider);
const sRouter = new Contract(config.SUSHISWAP.V2_ROUTER_02_ADDRESS, IUniswapV2Router02.abi, provider);

// -- SETUP FLASHLOAN CONTRACT -- //
const arbitrage = FlashLoan__factory.connect(config.PROJECT_SETTINGS.ARBITRAGE_ADDRESS, provider);

export { provider, uFactory, uRouter, sFactory, sRouter, arbitrage };

import { Contract, Provider, formatUnits } from "ethers";
import Big from "big.js";
import IUniswapV2Pair from "@uniswap/v2-core/build/IUniswapV2Pair.json";
import { ERC20__factory } from "../types/ethers-contracts/factories/ERC20__factory";
import { ERC20 } from "../types/ethers-contracts/ERC20";

interface Token {
  address: string;
  decimals: number;
  symbol: string;
  name: string;
}

interface TokenContracts {
  token0Contract: ERC20;
  token1Contract: ERC20;
  token0: Token;
  token1: Token;
}

async function getTokenAndContract(
  _token0Address: string,
  _token1Address: string,
  _provider: Provider,
): Promise<TokenContracts> {
  const token0Contract = ERC20__factory.connect(_token0Address, _provider);
  const token1Contract = ERC20__factory.connect(_token1Address, _provider);

  if (!token0Contract || !token1Contract) {
    throw new Error("Failed to create token contract instances. Check contract addresses.");
  }

  const token0: Token = {
    address: _token0Address,
    decimals: 18,
    symbol: await token0Contract.symbol(),
    name: await token0Contract.name(),
  };

  const token1: Token = {
    address: _token1Address,
    decimals: 18,
    symbol: await token1Contract.symbol(),
    name: await token1Contract.name(),
  };

  return { token0Contract, token1Contract, token0, token1 };
}

async function getPairAddress(_V2Factory: Contract, _token0: string, _token1: string): Promise<string> {
  const pairAddress = await _V2Factory.getPair(_token0, _token1);
  return pairAddress;
}

async function getPairContract(
  _V2Factory: Contract,
  _token0: string,
  _token1: string,
  _provider: Provider,
): Promise<Contract> {
  const pairAddress = await getPairAddress(_V2Factory, _token0, _token1);
  const pairContract = new Contract(pairAddress, IUniswapV2Pair.abi, _provider);
  return pairContract;
}

async function getReserves(_pairContract: Contract): Promise<[bigint, bigint]> {
  const reserves = await _pairContract.getReserves();
  return [reserves.reserve0, reserves.reserve1];
}

async function calculatePrice(_pairContract: Contract): Promise<string> {
  const [x, y] = await getReserves(_pairContract);
  return (x / y).toString();
}

async function calculateDifference(_uPrice: string, _sPrice: string): Promise<string> {
  const difference = Big(_uPrice).minus(_sPrice).div(_sPrice).times(100);
  return difference.toFixed(2);
}

async function simulate(
  _amount: string,
  _routerPath: Contract[],
  _token0: Token,
  _token1: Token,
): Promise<{ amountIn: string; amountOut: string }> {
  const trade1 = await _routerPath[0].getAmountsOut(_amount, [_token0.address, _token1.address]);
  const trade2 = await _routerPath[1].getAmountsOut(trade1[1], [_token1.address, _token0.address]);

  const amountIn = formatUnits(trade1[0], "ether");
  const amountOut = formatUnits(trade2[1], "ether");

  return { amountIn, amountOut };
}

export {
  getTokenAndContract,
  getPairAddress,
  getPairContract,
  getReserves,
  calculatePrice,
  calculateDifference,
  simulate,
};

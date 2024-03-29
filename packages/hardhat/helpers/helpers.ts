import { Contract, Provider, formatUnits } from "ethers";
import Big from "big.js";
import IUniswapV2Pair from "@uniswap/v2-core/build/IUniswapV2Pair.json";
import IERC20 from "@openzeppelin/contracts/build/contracts/ERC20.json";

interface Token {
  address: string;
  decimals: number;
  symbol: string;
  name: string;
}

interface TokenContracts {
  token0Contract: Contract;
  token1Contract: Contract;
  token0: Token;
  token1: Token;
}

async function getTokenAndContract(
  _token0Address: string,
  _token1Address: string,
  _provider: Provider,
): Promise<TokenContracts> {
  const token0Contract = new Contract(_token0Address, IERC20.abi, _provider);
  const token1Contract = new Contract(_token1Address, IERC20.abi, _provider);

  console.log(`Provider: ${await _provider.getBlockNumber()}`);
  console.log(`token0Address: ${_token0Address}`);
  console.log(`token1Address: ${_token1Address}`);
  console.log(`token0Contract: ${await token0Contract.name()}`);
  console.log(`token1Contract: ${await token1Contract.name()}`);

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

async function getReserves(_pairContract: Contract): Promise<[Big, Big]> {
  const reserves = await _pairContract.getReserves();
  return [new Big(reserves.reserve0.toString()), new Big(reserves.reserve1.toString())];
}

async function calculatePrice(_pairContract: Contract): Promise<string> {
  const [x, y] = await getReserves(_pairContract);
  return Big(x).div(Big(y)).toString();
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

require("dotenv").config()

const hre = require("hardhat")

// -- IMPORT HELPER FUNCTIONS & CONFIG -- //
const { getTokenAndContract, getPairContract, calculatePrice } = require('../helpers/helpers.js')
const { provider, uFactory, uRouter, sFactory, sRouter } = require('../helpers/initialization.js')

// -- CONFIGURE VALUES HERE -- //
const V2_FACTORY_TO_USE = uFactory
const V2_ROUTER_TO_USE = uRouter

const UNLOCKED_ACCOUNT = '0xdEAD000000000000000042069420694206942069' // SHIB account to impersonate 
const AMOUNT = '50' // 10 WETH -- Tokens will automatically be converted to wei

async function main() {
  // Fetch contracts
  const {
    token0Contract,
    token1Contract,
    token0: ARB_FOR,
    token1: ARB_AGAINST
  } = await getTokenAndContract(process.env.ARB_FOR, process.env.ARB_AGAINST, provider)

  const pair = await getPairContract(V2_FACTORY_TO_USE, ARB_FOR.address, ARB_AGAINST.address, provider)

  // Fetch price of SHIB/WETH before we execute the swap
  const priceBefore = await calculatePrice(pair)

  await manipulatePrice([ARB_FOR, ARB_AGAINST], token1Contract)

  // Fetch price of SHIB/WETH after the swap
  const priceAfter = await calculatePrice(pair)

  const data = {
    'Price Before': `1 ${ARB_AGAINST.symbol} = ${Number(priceBefore).toFixed(0)} ${ARB_FOR.symbol}`,
    'Price After': `1 ${ARB_AGAINST.symbol} = ${Number(priceAfter).toFixed(0)} ${ARB_FOR.symbol}`,
  }

  console.table(data)
}

async function manipulatePrice(_path, _token1Contract) {
  console.log(`\nBeginning Swap...\n`)

  console.log(`Input Token: ${_path[0].symbol}`)
  console.log(`Output Token: ${_path[1].symbol}\n`)

  const amount = hre.ethers.parseUnits(AMOUNT, 'ether')
  const path = [_path[0].address, _path[1].address]
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20 // 20 minutes

  console.log(`Amount: ${AMOUNT}${_path[0].symbol}\n`)

  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [UNLOCKED_ACCOUNT],
  })

  const signer = await hre.ethers.getSigner(UNLOCKED_ACCOUNT)

  const approval = await _token1Contract.connect(signer).approve(await V2_ROUTER_TO_USE.getAddress(), amount, { gasLimit: 50000 })
  await approval.wait()

  const swap = await V2_ROUTER_TO_USE.connect(signer).swapExactTokensForTokens(amount, 0, path, signer.address, deadline, { gasLimit: 125000 })
  await swap.wait()

  console.log(`Swap Complete!\n`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

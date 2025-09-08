
const { ethers } = require('ethers');

const PRESALE_CONTRACT_ADDRESS='0x9bebB43712De6DFe472d1f8Fc9C58a1CE2c8fD52';
const BSC_TESTNET_RPC = "https://rpc.ankr.com/bsc/b5bba617b58751127eb6d670ae95edda22781a2aac79c032eb582bb78f16ee28"
const RPC_URL = "https://bsc-dataseed.bnbchain.org";

const PRESALE_ABI = require('../PRESALE_ABI.json');

const provider = new ethers.JsonRpcProvider(RPC_URL);

const provider2 = new ethers.JsonRpcProvider(BSC_TESTNET_RPC);

const contract = new ethers.Contract(
  PRESALE_CONTRACT_ADDRESS,
  PRESALE_ABI,
  provider
);

function round(val) 
{
	return Math.round(10000*val)/10000;
}

function toEth(val) 
{
	val = round(10000*(ethers.formatEther(val.toString())))/10000;
	return val;
}

function toWei(val) 
{
	val = ethers.parseUnits(val+"", "ether");  
	return val;          
}

module.exports = { provider, provider2, PRESALE_ABI, PRESALE_CONTRACT_ADDRESS, 
	BSC_TESTNET_RPC, RPC_URL, contract, round, toEth, toWei };

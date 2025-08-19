
const { ethers } = require('ethers');

const CONTRACT_ADDRESS='0x710A8F5aE44b5a1a18976D87B4442aAc9b9e9609';
const BSC_TESTNET_RPC = "https://rpc.ankr.com/bsc_testnet_chapel/b5bba617b58751127eb6d670ae95edda22781a2aac79c032eb582bb78f16ee28"
const RPC_URL = "https://data-seed-prebsc-1-s1.binance.org:8545";

const CONTRACT_ABI = require('../ContractABI.json');

const provider = new ethers.JsonRpcProvider(RPC_URL);

const provider2 = new ethers.JsonRpcProvider(BSC_TESTNET_RPC);

const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
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

module.exports = { provider, provider2, CONTRACT_ABI, CONTRACT_ADDRESS, 
	BSC_TESTNET_RPC, RPC_URL, contract, round, toEth, toWei };

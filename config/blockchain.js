
const { ethers } = require('ethers');

const CONTRACT_ABI = require('../ContractABI.json');

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

const provider2 = new ethers.JsonRpcProvider(process.env.BSC_TESTNET_RPC);

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
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

module.exports = { provider, provider2, contract, toEth, toWei };

require('dotenv').config();
const { ethers } = require("ethers");
const { provider2, CONTRACT_ADDRESS, toEth } = require("./blockchain");



const ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "uid",
        "type": "uint256"
      }
    ],
    "name": "presaleBasicInfoByUid",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "uid",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "saleToken",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokensForSale",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "tokensSold",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "tokensPerEth",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "softCap",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "raised",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "startTime",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "endTime",
            "type": "uint256"
          },
          {
            "internalType": "uint8",
            "name": "state",
            "type": "uint8"
          }
        ],
        "internalType": "struct Presale",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "uid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "saleToken",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokensForSale",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokensPerEth",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
      }
    ],
    "name": "PresaleCreated",
    "type": "event"
  }
];




async function presaleCreatedEvent() {
    try {
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider2);
        const latestBlock = await provider2.getBlockNumber();
        
        const fromBlock = latestBlock - 500;
        const events = await contract.queryFilter(
            contract.filters.PresaleCreated(),
            fromBlock,
            latestBlock
        );

        const formattedEvents = events.map(event => ({
            id: event.args[0].toString(),
            uid: event.args[1].toString(),
            creator:event.args[2].toString(),
            token_address:event.args[3].toString(),
            tokens_for_sale:toEth(event.args[4].toString()),
            presale_tokens_per_eth:toEth(event.args[5].toString()),
            start_time:event.args[6].toString(),
            end_time:event.args[7].toString(),
            blockNumber: event.blockNumber.toString(),
            hash: event.transactionHash.toString()
        }));
        console.log(formattedEvents)
        return formattedEvents;
    } catch (err) {
        console.error("❌ Error fetching events:", err);
        return [];
    }
}




async function updateProgress(uid) 
{
    try {
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider2);
        const result = contract.presaleBasicInfoByUid(uid);
        console.log({result, CONTRACT_ADDRESS})
        return result;
    } 
    catch (err) 
    {
        console.log(err);
        return {};
    }
}



module.exports = {
    presaleCreatedEvent,
    updateProgress
};
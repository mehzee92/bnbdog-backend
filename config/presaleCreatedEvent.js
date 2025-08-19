require('dotenv').config();
const { ethers } = require("ethers");
const { provider2, toEth } = require("./blockchain");

const ABI = [
    "event PresaleCreated(uint256 indexed id, uint256 indexed uid, address creatar, address saleToken, uint256 tokensForSale, uint256 tokensPerEth, uint256 startTime, uint256 endTime)"
];

async function presaleCreatedEvent() {



    

    try {
        const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, ABI, provider2);
        const latestBlock = await provider2.getBlockNumber()-6830;
        
        const fromBlock = latestBlock - 500;
        const events = await contract.queryFilter(
            contract.filters.PresaleCreated(),
            fromBlock,
            latestBlock
        );

        console.log({latestBlock, fromBlock});

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


module.exports = {
    presaleCreatedEvent
};
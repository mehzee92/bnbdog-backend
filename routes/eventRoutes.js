const express = require('express');
const router = express.Router();
const fs = require('fs');
const { provider, contract } = require('../config/blockchain');

router.get('/', async (req, res) => {
  try {
    let lastBlock = 0;
    if (fs.existsSync('block.json')) {
      lastBlock = JSON.parse(fs.readFileSync('block.json')).lastBlock || 0;
    }

    const currentBlock = await provider.getBlockNumber();
    const logs = await provider.getLogs({
      address: contract.target,
      fromBlock: lastBlock + 1,
      toBlock: currentBlock
    });

    const events = logs
      .map(log => {
        try { return contract.interface.parseLog(log); }
        catch { return null; }
      })
      .filter(Boolean);

    fs.writeFileSync('block.json', JSON.stringify({ lastBlock: currentBlock }, null, 2));

    res.json({ fromBlock: lastBlock + 1, toBlock: currentBlock, events });
  } catch (err) {
    console.error('Error fetching events', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

// routes/stakeRoutes.js
const express = require('express');
const router = express.Router();
const stakeModel = require('../models/stakeModel');

// POST /api/stake/new
router.post('/new', async (req, res) => {
    try {
        const { uid, index_no, staker, amount, reward = 0 } = req.body;
        const result = await stakeModel.createStake(uid, index_no, staker, amount, reward);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error creating stake', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST /api/stake/unstaked
router.post('/unstaked', async (req, res) => {
    try {
        const { index_no, uid, address } = req.body;
        const result = await stakeModel.unstake(index_no, uid, address);
        res.status(200).json({ status: "done" });
    } catch (error) {
        console.error('Error unstaking', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /api/my-stakes
router.get('/my-stakes', async (req, res) => {
    try {
        const { address} = req.query;
        const rows = await stakeModel.getMyStakes(address);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching stakes', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /api/my-positions
router.get('/my-positions', async (req, res) => {
    try {
        const { uid, staker } = req.query;
        const rows = await stakeModel.getMyPositions(uid, staker);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching positions', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

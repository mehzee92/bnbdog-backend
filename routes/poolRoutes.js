const express = require('express');
const router = express.Router();
const poolModel = require('../models/poolModel');

router.get('/', async (req, res) => {
  try {
    const data = await poolModel.getPools(req.query);
    res.json(data);
  } catch (err) {
    console.error('Error fetching pools', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/recent', async (req, res) => {
  try {
    const data = await poolModel.getLatestPools(req.query);
    res.json(data);
  } catch (err) {
    console.error('Error fetching pools', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/new', async (req, res) => {
  console.log({...req.body});
  try {
    const uid = await poolModel.createPool(req.body);
    res.json({ uid });
  } catch (err) {
    console.error('Error creating pool', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/:uid', async (req, res) => {
  try {
    const data = await poolModel.getPoolByUid(req.params.uid);
    if (!data) return res.status(404).json({ error: 'Not found' });
    res.json(data);
  } catch (err) {
    console.error('Error fetching pool', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





module.exports = router;

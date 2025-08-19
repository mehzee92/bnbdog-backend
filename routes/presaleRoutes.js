const express = require('express');
const router = express.Router();
const presaleModel = require('../models/presaleModel');
const presaleCreatedEvent = require("./../config/presaleCreatedEvent")

// GET /api/presales
router.get('/', async (req, res) => {
  try {
    const data = await presaleModel.getPresales(req.query);
    res.json(data);
  } catch (err) {
    console.error('Error fetching presales', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// GET /api/presales/recent
router.get('/recent', async (req, res) => {
  try {
    const chain = req.query.chain || 0;
    const data = await presaleModel.getRecentPresales(chain);
    res.json(data);
  } catch (err) {
    console.error('Error fetching recent presales', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// GET /api/presales/creator/:creator
router.get('/creator/:creator', async (req, res) => {
  try {
    const data = await presaleModel.getPresalesByCreator(req.params.creator);
    res.json(data);
  } catch (err) {
    console.error('Error fetching presales by creator', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/presales/new
router.post('/new', async (req, res) => {
  try {
    const id = await presaleModel.createPresale(req.body);
    res.json({ id });
  } catch (err) {
    console.error('Error creating presale', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// GET /api/presales/update-lastest
router.get('/update-lastest', async (req, res) => {
  try {
    const result = await presaleCreatedEvent.presaleCreatedEvent();
    if(result.length>0)
    {
      await presaleModel.updatePresaleInfo(result);
    }
    res.json(result);
  } catch (err) {
    console.error('Error creating presale', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// GET /api/presales/update-lastest
router.get('/update-progress', async (req, res) => {
  const uid = req.query.uid;

  try 
  {
    const result = await presaleCreatedEvent.updateProgress(uid);
    const statuses = ["Active", "Finalized", "Canceled", "Blacklist"];
    const resp = {}    
    resp.uid = result[1].toString();
    resp.tokensSold = result[5].toString();
    resp.raised =  result[8].toString();
    resp.status =  statuses[result[11].toString()];
  
    if(result.uid)
    {
      await presaleModel.updatePresaleProgress(resp);
    }    
    
    res.json(resp);
  } 
  catch (err) 
  {
    res.status(500).json({ error: 'Internal Server Error', uid, ...err });
  }
});





// GET /api/presales/:id
router.get('/:uid', async (req, res) => {
  try {
    const data = await presaleModel.getPresaleByUid(req.params.uid);
    if (!data) return res.status(404).json({ error: 'Presale not found' });
    res.json(data);
  } catch (err) {
    console.error('Error fetching presale', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

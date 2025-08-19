require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/pools', require('./routes/poolRoutes'));
app.use('/api/stakes', require('./routes/stakeRoutes'));
app.use('/api/presales', require('./routes/presaleRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/upload', require('./routes/imageRoutes'));


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

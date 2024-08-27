const express = require('express');
const audioRoutes = require('./routes/audioRoutes');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

// Use the audio routes
app.use('/audio', audioRoutes);

// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'API is healthy!' });
});

module.exports = app;

const express = require('express');
const audioRoutes = require('./routes/audioRoutes');
const cors = require('cors');
const path = require('path'); // Import the path module

const app = express();

app.use(express.json());
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the audio routes
app.use('/audio', audioRoutes);

// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'API is healthy!' });
});

// Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;

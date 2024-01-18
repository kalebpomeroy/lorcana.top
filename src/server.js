const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;

// Load the cards "database" into memory
const cards = require('./cards.js');

// Serve static files from the Vue app build directory
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/cards.json', (req, res) => {
    let limit = parseInt(req.query.limit, 10) || 10; // Default limit to 10
    let offset = parseInt(req.query.offset, 10) || 0; // Default offset to 0

    // Apply limit and offset to jsonData
    const paginatedData = cards.slice(offset, offset + limit);
    res.json({cards: paginatedData, total: cards.length});
});

app.get('/cards', (req, res) => {
    res.sendFile(path.join(__dirname, '../data/cards.json'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
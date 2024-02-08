const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const { filter } = require('./composables/cards.js');
const { createProxyMiddleware } = require('http-proxy-middleware'); 

const PORT = process.env.PORT || 3300;
const cards = JSON.parse(fs.readFileSync('./data/cards.json', 'utf8'));

app.use(cors({ origin: '*' }));
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../articles')));

app.get('/cards', async (req, res) => {
    let limit = parseInt(req.query.limit, 10) || 10; // Default limit to 10
    let offset = parseInt(req.query.offset, 10) || 0; // Default offset to 0

    filtered = await filter(req.query.q || '', cards);
    const paginatedData = filtered.slice(offset, offset + limit);
    res.json({cards: paginatedData, total: filtered.length});
});

app.get('/cards.json', (req, res) => {
    res.sendFile(path.join(__dirname, '../data/cards.json'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
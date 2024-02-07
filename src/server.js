const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const { cards, filter } = require('./cards.js');

const PORT = process.env.PORT || 3300;



app.use(cors({
    origin: '*'
}));
// Serve static files from the Vue app build directory
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../articles')));

app.get('/cards.json', (req, res) => {
    let limit = parseInt(req.query.limit, 10) || 10; // Default limit to 10
    let offset = parseInt(req.query.offset, 10) || 0; // Default offset to 0

    filtered = filter(req.query.q || '');
    // Apply limit and offset to jsonData
    const paginatedData = filtered.slice(offset, offset + limit);
    res.json({cards: paginatedData, total: filtered.length});
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
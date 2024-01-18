const fs = require('fs');

const cards = JSON.parse(fs.readFileSync('./data/cards.json', 'utf8'));
module.exports = cards;
const { COLORS, CARD_TYPES, RARITY, ASC, DESC } = require('../const.js');
const { dynamicSort, compareAsNumber, compareAsList } = require('../util.js');

function parseToken(token) {
    // Given a single token, split it based on the special characters (:, <, >, =)
    // and return an array of [key, op, value]
    const match = token.match(/([^:<>=]*)([:<>=]+)(.*)/);
    if (match) {
        return [match[1], match[2], match[3] ? match[3].toLowerCase() : ''];
    }
    if (token == "inkable") { return ['z', ':', true]; }
    if (token == "noninkable") { return ['z', ':', false]; }
    return ['n', ':', token.toLowerCase()];
}

let cached_cards = null;
async function get_cards_from_source() {
    if (cached_cards) { return cached_cards; }

    try {
        const localdevHack = (window.location.hostname === 'localhost') ? 'http://localhost:3300/' : '/';
        const response = await fetch(`${localdevHack}cards.json`);
        cached_cards = await response.json();  // Assuming the response to be JSON
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
    return cached_cards;
}

async function filter(q, cards) {
    if (!cards) { cards = await get_cards_from_source(); }
    if (!q) { return cards; }
    //Split q on spaces and return an array of tokens (respecting quoted strings)
    const tokens = (q.match(/"[^"]*"|\S+/g) ?? []).map(token => token.replace(/^"|"$/g, ''));

    // Default sort to name ascending
    let sort = 'n';
    let sort_order = ASC;

    // Filter the cards based on the tokens
    return cards.filter(card => {
        return tokens.every(token => {
            // Each token is a key value pair with the separator (usually :, but 
            // for integers can also be <, <=, >, >= or =)
            let [key, op, value] = parseToken(token);

            // Special cases for sorting. Not really filters, so return true
            if (key == "sort") {
                sort = value;
                return true;
            }
            if (key == "d") {
                (value == "a") ? sort_order = ASC : sort_order = DESC;
                return true;
            }

            if (value.includes(',')) {
                value = value.split(',').map(val => val.trim()); // Split and trim each value
            }        
            
            try {
                // If the key is prefixed with !, then we want the opposite of the comparison
                let opposite = false;
                if(key.startsWith('!')) {
                    key = key.slice(1);
                    opposite = true;
                }
                // Get the comparison function for the given key, skipping if not found
                const compare = comparisons[key];
                if (!compare) { return true; }

                // Run the comparison function, returning the opposite if necessary
                const performComparison = (val) => {
                    return opposite ? !compare(card, val, op) : compare(card, val, op);
                }; 
                if (Array.isArray(value)) {
                    // Return true if any of the values in the array match
                    return value.some(val => performComparison(val));
                } else {
                    // Handle the case where value is a string
                    return performComparison(value);
                }

            } catch (e) {
                return true // if the filter fails for any reason, don't filter out the card
            }
        });
    }).sort(dynamicSort(sort, sort_order));
}

const comparisons = {
    // Full text searches: Name, Body Text, Artist, Flavor Text, Keywords
    n: (card, value) => { return card.name.toLowerCase().includes(value) },
    b: (card, value) => { return card.body_text.toLowerCase().includes(value) },
    a: (card, value) => { return card.artist.toLowerCase().includes(value) },
    f: (card, value) => { return card.flavor_text.toLowerCase().includes(value) },
    k: (card, value) => { return card.classifications.toLowerCase().includes(value) },
    e: (card, value) => { return card.set_id.toLowerCase() == value },

    // Number comparisons: Cost, Will, Strength, Lore
    c: (card, value, op) => { return compareAsNumber(card.cost, value, op) },
    w: (card, value, op) => { return compareAsNumber(card.willpower, value, op) },
    s: (card, value, op) => { return compareAsNumber(card.strength, value, op) },
    l: (card, value, op) => { return compareAsNumber(card.lore, value, op) },

    // Multi-value comparisons: Color, Rarity, Type
    i: (card, value) => { return compareAsList(card.color, value, COLORS) },
    r: (card, value) => { return compareAsList(card.rarity, value, RARITY) },
    t: (card, value) => { return compareAsList(card.card_type, value, CARD_TYPES) },
    
    z: (card, value) => { return card.inkable == value },
};

module.exports = { filter };
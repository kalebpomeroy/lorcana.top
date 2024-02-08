const COLORS = {
    r: "Ruby",
    e: "Emerald",
    s: "Sapphire", 
    g: "Steel",
    a: "Amber",
    p: "Amethyst"
};

const CARD_TYPES = {
    a: "Action",
    i: "Item",
    c: "Character",
    s: "Action - Song"
};

const RARITY = {
    s: "Super Rare",
    c: "Common",
    l: "Legendary",
    u: "Uncommon",
    r: "Rare"
};

const SETS = {
    TFC: "The First Chapter",
    RFB: "Rise of the Floodborn"
};

const SORT_ORDER = {
    "c": "cost",
    "w": "willpower",
    "l": "lore",
    "s": "strength",
    "i": "color",
    "t": "card_type",
    "r": "rarity",
    "e": "set_num",
    "a": "artist",
    "n": "name"
}

const ASC = 'asc';
const DESC = 'desc';

module.exports = { COLORS, CARD_TYPES, RARITY, SETS, SORT_ORDER, ASC, DESC };
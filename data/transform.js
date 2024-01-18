const fs = require('fs');

// Function to convert Camel_Snake_Case to snake_case
function toSnakeCase(str) {
    return str.replace(/([A-Z])/g, "$1").toLowerCase();
}

// Function to recursively transform keys of an object
function transformKeys(obj) {
    if (Array.isArray(obj)) {
        return obj.map(transformKeys);
    } else if (obj != null && obj.constructor === Object) {
        return Object.keys(obj).reduce((acc, key) => {
            acc[toSnakeCase(key)] = transformKeys(obj[key]);
            return acc;
        }, {});
    }
    return obj;
}

// Read JSON file
const jsonData = JSON.parse(fs.readFileSync('cards-raw.json', 'utf8'));

// Transform JSON keys
const transformedJson = transformKeys(jsonData);

transformedJson.forEach(card => {
    console.log(card);
    card.id = card.set_num + "_" + card.card_num;
});

console.log(transformedJson);

// Write the transformed JSON back to a file
fs.writeFileSync('cards.json', JSON.stringify(transformedJson, null, 2));

const { SORT_ORDER, ASC, DESC } = require('./const.js');

function dynamicSort(sort_letter, sort_order) {
    // Given a letter representing a sort field and a sort order, return a function
    // that sorts an array of objects by that field. 
    return function (a, b) {
        // Get the actual field name from the SORT_ORDER object
        let field = SORT_ORDER[sort_letter] || "name";

        // Get the values of the field for each object
        let valueA = a[field];
        let valueB = b[field];

        // Make sure the sort order is case-insensitive
        if (typeof valueA === 'string') {
            valueA = valueA.toLowerCase(); 
            valueB = valueB.toLowerCase();
        }

        // Do the actual comparison, sorted by the sort_order
        if (sort_order === ASC) {
            return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        } else if (sort_order === DESC) {
            return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
        } else {
            throw new Error('Invalid sort order');
        }
    };
}

function compareAsNumber(raw_a, raw_b, op) {
    // Compare two vars as numbers using the given operator
    let a = parseInt(raw_a);
    let b = parseInt(raw_b);
    switch (op) {
        case '<': return a < b;
        case '>': return a > b;
        case '<=': return a <= b;
        case '>=': return a >= b;
        case ':': // Fall through
        case '=':  return a == b; 
        default: throw new Error(`Unsupported operator: ${op}`);
    }
}

function compareAsList(actual_value, possible_values, ref) {
    // For each character in possible_values, check if it's there. The 
    // ref object maps the character (such as 'r') to the value it represents
    // (such as "Ruby"). Then we compare that to the actual value.
    for (const c of possible_values) {
        if (c in ref && ref[c] === actual_value) {
            return true;
        }
    }
    return false;
}

module.exports = { compareAsNumber, compareAsList, dynamicSort };
import { ref } from 'vue';

const STORAGE_KEY = 'current-list';

// A ref that holds the decklist
let decklist = ref({});
let isLoaded = false;

// Initialize from localStorage
function loadFromLocalStorage() {
    if (isLoaded) {
        return;
    }

    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
        decklist.value = JSON.parse(storedData);
    }

    console.log("Loaded from localStorage: " + JSON.stringify(decklist.value));
    isLoaded = true;
}

function addCard(cardTitle) {
    const newDecklist = { ...decklist.value };
    if (newDecklist[cardTitle]) {
        newDecklist[cardTitle] += 1;
    } else {
        newDecklist[cardTitle] = 1;
    }
    decklist.value = newDecklist; // Replace the entire object
    localStorage.setItem(STORAGE_KEY, JSON.stringify(decklist.value));
}

function removeCard(cardTitle) {
    const newDecklist = { ...decklist.value };
    if (newDecklist[cardTitle]) {
        newDecklist[cardTitle] -= 1;
        if (newDecklist[cardTitle] === 0) {
            delete newDecklist[cardTitle];
        }
    }
    decklist.value = newDecklist; // Replace the entire object
    localStorage.setItem(STORAGE_KEY, JSON.stringify(decklist.value));
}

function clearDeck() {
    decklist.value = {};
    localStorage.setItem(STORAGE_KEY, JSON.stringify(decklist.value));
}


export function getDeckList() {
    loadFromLocalStorage();
    return {
        decklist: decklist,
        addCard: addCard, 
        removeCard: removeCard,
        clearDeck: clearDeck
    };
}



TCG_ID_MAPPING = {
    "TFC": "22937",
    "RFB": "23303"
}
function fetchCardData() {
    const url = 'https://infinite-api.tcgplayer.com/priceguide/set/22937/cards/?rows=5000&productTypeID=116';

    return fetch(url)
        .then(response => response.json())
        .then(data => parseCardData(data))
        .catch(error => console.error('Error fetching data:', error));
}

data = fetchCardData();
filtered = data.filter(item => item.key === filterValue);
console.log(data);


function parseCardData(data) {
    return data.result.map(card => ({
        "condition": card.condition,
        "low_price": card.lowPrice,
        "market_price": card.marketPrice,
        "printing": card.printing,
        "name": card.productName,
    }));
}      



  
<template>
    <h2>Syntax Guide</h2>
    
    <div class="helper-box">
        This search mirrors the syntax used by <a href="https://scryfall.com/docs/syntax">Scryfall</a>. 
        Below are some helpful shortcuts to get you started.

        For most searches you will use the `[field]:[text]` syntax. For example: <code>k:villian</code> shows 
        all cards with the word <code>villian</code> in the keywords field.
    </div>
    <div class="helper-container">
        <div class="helper-box">
            <h4>Full Text Searches</h4>
            <p>
                Text searches match any part. If no filter is specified, it searches the name. 
            </p>
            
            <div class="row"><strong>n:</strong> Name</div>
            <div class="row"><strong>b:</strong> Body</div>
            <div class="row"><strong>a:</strong> Artist</div>
            <div class="row"><strong>k:</strong> Keywords</div>
            <div class="row"><strong>f:</strong> Flavor Text</div>
            <div class="row"><strong>e:</strong> TFC or RFB</div>
            
        </div>
        <div class="helper-box">
            <h3>Numbers</h3>
            <p>
                With numeric fields you can use the `:` syntax, or use 
                <code>&lt;</code>, <code>&gt;</code>, <code>&le;</code>, <code>&ge;</code>, <code>=</code>.
            </p>
            <br />
            <div class="row"><strong>w:</strong> Willpower</div>
            <div class="row"><strong>s:</strong> Strength</div>
            <div class="row"><strong>c:</strong> Cost</div>
            <div class="row"><strong>l:</strong> Lore</div>
            <hr />
            <div class="row">
                Example: 
                <code>c>5</code> Finds all cards that cost more than 5
            </div>
        </div>
        <div class="helper-box">
            <h3>Ink Colors (i)</h3>
            <div class="row"><strong>s:</strong> Steel</div>
            <div class="row"><strong>r:</strong> Ruby</div>
            <div class="row"><strong>b:</strong> Sapphire</div>
            <div class="row"><strong>p:</strong> Amethyst</div>
            <div class="row"><strong>a:</strong> Amber</div>
            <div class="row"><strong>e:</strong> Emerald</div>
            <hr />
            <div class="row">
                Example: 
                <code>i:e</code> Finds all emerald cards
            </div>
        </div>
        <div class="helper-box">
            <h3>Card Types (t)</h3>
            <div class="row"><strong>a:</strong> Action</div>
            <div class="row"><strong>i:</strong> Item</div>
            <div class="row"><strong>c:</strong> Character</div>
            <div class="row"><strong>s:</strong> Song</div>
            <hr />
            <div class="row">
                Example: 
                <code>t:c</code> Finds all character cards
            </div>
        </div>
        <div class="helper-box">
            <h3>Rarity (r)</h3>
            <div class="row"><strong>c:</strong> Common</div>
            <div class="row"><strong>u:</strong> Uncommon</div>
            <div class="row"><strong>r:</strong> Rare</div>
            <div class="row"><strong>s:</strong> Super Rare</div>
            <div class="row"><strong>l:</strong> Legendary</div>
            <hr />
            <div class="row">
                Example: 
                <code>r:u</code> Finds all uncommon cards
            </div>
        </div>
    </div>
    <br />
    <div class="helper-box">
        To sort, you can you <code>sort:x</code> using any of the filters in place of x. 
        For example: <code>sort:c</code> sorts by cost.
        <code>d:a</code> sorts ascending, d:z sorts descending.
    </div>
</template>

m.insert("s".to_string(), "Super Rare".to_string());
m.insert("c".to_string(), "Common".to_string());
m.insert("l".to_string(), "Legendary".to_string());
m.insert("u".to_string(), "Uncommon".to_string());
m.insert("r".to_string(), "Rare".to_string());

<style>
.helper-container {
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
}
.helper-box {
    flex: 1;
    margin-right: 10px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 5px;
    font-size: 0.9em;
    text-align: left;
}
.helper-box h2 {
    margin-top: 0;
}
.helper-box .row {
    margin: 5px 0;
}
.helper-box code {
    background-color: #d8d8d8;
    padding: 2px 4px;
    border-radius: 3px;
}
</style>
use std::collections::HashMap;
use lazy_static::lazy_static;

lazy_static! {
    pub static ref COLORS: HashMap<String, String> = {
        let mut m = HashMap::new();
        m.insert("r".to_string(), "Ruby".to_string());
        m.insert("e".to_string(), "Emerald".to_string());
        m.insert("s".to_string(), "Sapphire".to_string());
        m.insert("a".to_string(), "Amber".to_string());
        m.insert("s".to_string(), "Steel".to_string());
        m.insert("p".to_string(), "Amethyst".to_string());
        m
    };
}

lazy_static! {
    pub static ref CARD_TYPES: HashMap<String, String> = {
        let mut m = HashMap::new();
        m.insert("a".to_string(), "Action".to_string());
        m.insert("i".to_string(), "Item".to_string());
        m.insert("c".to_string(), "Character".to_string());
        m.insert("s".to_string(), "Action - Song".to_string());
        m
    };
}

lazy_static! {
    pub static ref RARITY: HashMap<String, String> = {
        let mut m = HashMap::new();
        m.insert("s".to_string(), "Super Rare".to_string());
        m.insert("c".to_string(), "Common".to_string());
        m.insert("l".to_string(), "Legendary".to_string());
        m.insert("u".to_string(), "Uncommon".to_string());
        m.insert("r".to_string(), "Rare".to_string());
        m
    };
}

lazy_static! {
    pub static ref SETS: HashMap<String, String> = {
        let mut m = HashMap::new();
        m.insert("TFC".to_string(), "The First Chapter".to_string());
        m.insert("RFB".to_string(), "Rise of the Floodborn".to_string());
        m
    };
}
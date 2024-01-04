use lazy_static::lazy_static;
use std::fs;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Card {
    #[serde(rename = "Name", default)] pub name: String,
    #[serde(rename = "Body_Text", default)] pub body: String,
    #[serde(rename = "Artist", default)] pub artist: String,
    #[serde(rename = "Classifications", default)] pub keywords: String,
    #[serde(rename = "Flavor_Text", default)] pub flavor_text: String,
    #[serde(rename = "Inkable", default)] pub inkable: bool,
    #[serde(rename = "Cost", default)] pub cost: u32,
    #[serde(rename = "Willpower", default)] pub will: u32,
    #[serde(rename = "Strength", default)] pub str: u32,
    #[serde(rename = "Lore", default)] pub lore: u32,
    #[serde(rename = "Color", default)] pub color: String,
    #[serde(rename = "Rarity", default)] pub rarity: String,
    #[serde(rename = "Type", default)] pub card_type: String, 
    #[serde(rename = "Set_ID", default)] pub set_id: String,
    #[serde(rename = "Image", default)] pub image: String,
    #[serde(rename = "Card_Num", default)] pub card_num: u32,
    #[serde(rename = "Set_Name", default)] pub set_name: String,
    #[serde(rename = "Set_Num", default)] pub set_num: u32,
}

lazy_static! {
    pub static ref CARDS: Vec<Card> = {
        let file_path = "data/cards.json";
        match fs::read_to_string(file_path) {
            Ok(data) => {
                match serde_json::from_str::<Vec<Card>>(&data) {
                    Ok(cards) => {
                        return cards
                    },
                    Err(e) => {
                        println!("Failed to parse JSON: {}", e);
                        return Vec::new()
                    },
                }
            },
            Err(e) => {
                println!("Failed to read file: {}", e);
                return Vec::new()
            },
        }
    };
}

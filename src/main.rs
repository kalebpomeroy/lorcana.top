mod util;
use std::env;
use crate::util::query::{get_query, compare_as_number};
use crate::util::cards::{Card, CARDS};
use crate::util::consts::{COLORS, RARITY, CARD_TYPES};

fn main() {    
    
    let args: Vec<String> = env::args().skip(1).collect();
    let q = args.join(" "); // Join all arguments with a space
   
     let mut filters: Vec<Box<dyn Fn(&Card) -> bool>> = Vec::new();
     for (filter, value) in get_query(&q){
        let value_clone = value.clone();
        match filter.as_str() {
            "n" => { 
                filters.push(Box::new(move |card: &Card| card.name.to_lowercase().contains(&value_clone))); 
            }
            "b" => { 
                filters.push(Box::new(move |card: &Card| card.body.to_lowercase().contains(&value_clone))); 
            }
            "a" => { 
                filters.push(Box::new(move |card: &Card| card.artist.to_lowercase().contains(&value_clone))); 
            }
            "f" => { 
                filters.push(Box::new(move |card: &Card| card.flavor_text.to_lowercase().contains(&value_clone))); 
            }
            "k" => { 
                filters.push(Box::new(move |card: &Card| card.keywords.to_lowercase().contains(&value_clone))); 
            }
            "c" => { 
                filters.push(Box::new(move |card: &Card| compare_as_number(card.cost, &value_clone))); 
            }
            "w" => { 
                filters.push(Box::new(move |card: &Card| compare_as_number(card.will, &value_clone))); 
            }
            "s" => { 
                filters.push(Box::new(move |card: &Card| compare_as_number(card.str, &value_clone))); 
            }
            "l" => { 
                filters.push(Box::new(move |card: &Card| compare_as_number(card.lore, &value_clone))); 
            }
            "i" => { 
                if COLORS.contains_key(&value) {
                    filters.push(Box::new(move |card: &Card| card.color == *COLORS.get(&value).unwrap())); 
                } else {
                    filters.push(Box::new(move |card: &Card| card.color == value)); 
                }
            }
            "r" => { 
                if RARITY.contains_key(&value) {
                    filters.push(Box::new(move |card: &Card| card.rarity == *RARITY.get(&value).unwrap())); 
                } else {
                    filters.push(Box::new(move |card: &Card| card.rarity.to_lowercase() == value)); 
                }
            }
            "t" => { 
                if CARD_TYPES.contains_key(&value) {
                    filters.push(Box::new(move |card: &Card| card.card_type == *CARD_TYPES.get(&value).unwrap())); 
                } else {
                    filters.push(Box::new(move |card: &Card| card.card_type.to_lowercase().contains(&value))); 
                }
            }
            "z" => { 
                filters.push(Box::new(move |card: &Card| card.inkable == (value == "yes"))); 
            }
            "e" => { 
                filters.push(Box::new(move |card: &Card| card.set_id.to_lowercase() == value)); 
            }
            _ => {}
        }
     }

    let filtered_cards: Vec<Card> = CARDS.clone().into_iter()
        .filter(|card| filters.iter().all(|f| f(card)))
        .collect();

    for c in filtered_cards {
        println!("{} ({})", c.name, c.cost)
    }
}

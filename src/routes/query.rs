use crate::util::query::{get_query, compare_as_number};
use crate::util::cards::{Card, CARDS};
use crate::util::consts::{COLORS, RARITY, CARD_TYPES};
use actix_web::{web, HttpResponse, Responder};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct QueryInfo { q: String }

#[derive(Serialize)]
pub struct QueryCardResponse {
    name: String,
    id: String
}

#[derive(Serialize)]
pub struct QueryResponse {
    cards: Vec<QueryCardResponse>,
}

pub async fn query(info: web::Query<QueryInfo>) -> impl Responder{  
    let mut sort = "name".to_string();
    let mut dir = "a".to_string();
    let mut filters: Vec<Box<dyn Fn(&Card) -> bool>> = Vec::new();
    for (filter, value) in get_query(&info.q){
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
            "sort" => { 
                sort = value_clone;
            }
            "d" => { 
                dir = value_clone;
            }
            _ => {}
        }
     }

    let mut filtered_cards: Vec<Card> = CARDS.clone().into_iter()
        .filter(|card| filters.iter().all(|f| f(card)))
        .collect();

    filtered_cards.sort_by(|a, b| {
        let (a, b) = if dir == "a" { (a, b) } else { (b, a) };

        match sort.as_str() {
            "c" => { a.cost.cmp(&b.cost) }
            "w" => { a.will.cmp(&b.will) }
            "l" => { a.lore.cmp(&b.lore) }
            "s" => { a.str.cmp(&b.str) }
            "i" => { a.color.cmp(&b.color) }
            "t" => { a.card_type.cmp(&b.card_type) }
            "r" => { a.rarity.cmp(&b.rarity) }
            "e" => { a.set_num.cmp(&b.set_num) }
            "a" => { a.artist.cmp(&b.artist) }
            _ => { a.name.cmp(&b.name) }
        }
    });
    
    let mut card_response = Vec::new();
    for c in filtered_cards {
        card_response.push(QueryCardResponse {
            id: format!("{}_{}", c.set_num, c.card_num),
            name: c.name
        });
    }


    HttpResponse::Ok().json(QueryResponse { cards: card_response })
    
}
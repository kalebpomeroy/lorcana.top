fn split_query(query: &str) -> Vec<String> {
    let mut tokens = Vec::new();
    let mut current_token = String::new();
    let mut in_quotes = false;

    for c in query.chars() {
        match c {
            // When we encounter a quote, we toggle our in_quotes flag
            '"' => in_quotes = !in_quotes,
            // If we're not in quotes and we see a space, we push the current token to our list
            // and reset the current token
            ' ' if !in_quotes => {
                if !current_token.is_empty() {
                    tokens.push(current_token.clone());
                    current_token.clear();
                }
            }
            // Any other character gets added to the current token
            _ => current_token.push(c),
        }
    }

    // Don't forget to add the last token if it's not empty
    if !current_token.is_empty() {
        tokens.push(current_token);
    }

    tokens
}

fn get_value(token: &str) -> (&str, &str){
    // Note: Order is important here. We split on < and > before = 
    for special in ['<', '>'] {
        if let Some(pos) = token.find(special) {
            return (&token[..pos], &token[pos..])
        }
    }
    for special in [':', '='] {
        if let Some(pos) = token.find(special) {
            return (&token[..pos], &token[pos + 1..])
        }
    }
    ("n", &token[..])
}

pub fn get_query(query: &str) -> Vec<(String, String)> {
    // Split the token on spaces, accounting for quotes
    let tokens = split_query(query);

    let mut filters: Vec<(String, String)> = Vec::new();
    // For each token, we create a filter for it
    for t in tokens.iter() {
        let (filter, value) = get_value(t);
        filters.push((filter.to_string(), value.to_string().to_lowercase()));
    }
    filters
}

pub fn compare_as_number(value: u32, comparison: &str) -> bool {
    // if the first digit is a number, just see if the value 
    if comparison.chars().next().unwrap_or(' ').is_digit(10) {
        return value == comparison.parse::<u32>().expect("Invalid number");
    }

    let (op, num_str) = comparison.split_at(comparison.chars().position(|c| c.is_digit(10)).unwrap());
    let num: u32 = num_str.parse().expect("Invalid number in comparison string");

    match op {
        ">=" => value >= num,
        ">" => value > num,
        "<=" => value <= num,
        "<" => value < num,
        _ => panic!("Invalid operator in comparison string")
    }
}
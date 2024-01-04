mod util;
mod routes;
use crate::routes::query::query;
use actix_web::{web, App, HttpServer};


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(query))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}


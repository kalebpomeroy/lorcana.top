use actix_files as fs;
use actix_cors::Cors;
use actix_web::{http, web, App, HttpServer};
mod util;
mod routes;
use crate::routes::query::query;


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init();
    HttpServer::new(|| {
        let cors = Cors::default()
            .allowed_origin_fn(|_origin, _req_head| { true })
            .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
            .allowed_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT])
            .allowed_header(http::header::CONTENT_TYPE)
            .max_age(3600);

        App::new()
            .wrap(cors)
            .route("/search", web::get().to(query))
            .service(fs::Files::new("/data/images", "../data/images"))
            .service(fs::Files::new("/", "../frontend/dist").index_file("index.html"))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}


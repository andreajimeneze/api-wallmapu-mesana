## DEPENDENCIAS

```json
 "dependencies": {
    "cors": "^2.8.6",
    "dotenv": "^17.2.3",
    "express": "^4.22.1",
    "multer": "^2.0.2",
    "path": "^0.12.7",
    "pg": "^8.17.2",
    "sequelize": "^6.37.7",
    "sequelize-cli": "^6.6.5",
    "sharp": "^0.34.5"
  }
```

## DOCUMENTACIÓN API

API NEWS
GET / https://api-wallmapu-mesana.vercel.app/api/news

```json
{
    "total": 2,
    "page": 1,
    "news": [
        {
            "id": 3,
            "title": "Noticia 3",
            "subtitle": null,
            "body": "Esta es una noticia sin subtítulo.",
            "date": "2026-01-28"
        },
        {
            "id": 4,
            "title": "Noticia 4",
            "subtitle": "Subtítulo 4",
            "body": "Esta es una noticia con un subtítulo 4. Es correcto???",
            "date": "2026-01-28"
        }
    ]
}
```

GET / https://api-wallmapu-mesana.vercel.app/api/news/{id}

RESPONSE 200
```json
{
  "id": 4,
  "title": "Noticia 4",
  "subtitle": "Subtítulo 4",
  "body": "Esta es una noticia con un subtítulo 4. Es correcto???",
  "date": "2026-01-28"
}
```
RESPONSE 404
```json
{
    "message": "Noticia no encontrada"
}
```

POST / https://api-wallmapu-mesana.vercel.app/api/news

Datos de entrada:
```json 
{
  "title": "Noticia 5",
  "subtitle": "Subtítulo 5",
  "body": "Esta es una noticia con un subtítulo 5"
}
```
Datos de salida:
```json
{
    "data": {
        "id": 5,
        "title": "Noticia 5",
        "subtitle": "Subtítulo 5",
        "body": "Esta es una noticia con un subtítulo 5",
        "date": "2026-02-05"
    },
    "message": "Noticia creada exitosamente"
}
```
PUT / https://api-wallmapu-mesana.vercel.app/api/news/{id}

Datos de entrada:
```json
{
  "title": "Edición noticia 5",
  "subtitle": "Subtítulo 5",
  "body": "Esta es una noticia con un subtítulo 5"
}
```
Datos de salida: 
RESPONSE 200
```json
{
    "message": "Noticia editada correctamente",
    "data": {
        "id": 5,
        "title": "Edición noticia 5",
        "subtitle": "Subtítulo 5",
        "body": "Esta es una noticia con un subtítulo 5",
        "date": "2026-02-05"
    }
}
```
RESPONSE 404
```json
{
    "error": "Noticia no encontrada"
}
```

DELETE / https://api-wallmapu-mesana.vercel.app/api/news/{id}

RESPONSE 200
```json
{
    "message": "Noticia eliminada correctamente"
}
```
RESPONSE 404
```json
{
    "error": "Noticia no encontrada"
}
```

## ESTRUCTURA DE CARPETAS

```
src
    ├───config
    │       dbSequelize.js
    │       env.js
    |       swagger.js
    │
    ├───modules
    │   ├───authors
    │   │       author.model.js
    │   │
    │   ├───books
    │   │       book.model.js
    │   │
    │   ├───categories
    │   │       category.model.js
    │   │
    │   ├───communs
    │   │       commun.model.js
    │   │
    │   ├───editorials
    │   │       editorial.model.js
    │   │
    │   ├───loans
    │   │       loan.model.js
    │   │
    │   ├───loans-status
    │   │       loan-status.model.js
    │   │
    │   ├───news
    │   │       news.controller.js
    │   │       news.dto.js
    │   │       news.model.js
    │   │       news.routes.js
    │   │       news.service.js
    │   │
    │   ├───news-gallery
    │   │       news-gallery.controller.js
    │   │       news-gallery.dto.js
    │   │       news-gallery.model.js
    │   │       news-gallery.routes.js
    │   │       news-gallery.service.js
    │   │
    │   ├───province
    │   │       province.model.js
    │   │
    │   ├───region
    │   │       region.model.js
    │   │
    │   ├───return-status
    │   │       return-status.model.js
    │   │
    │   ├───user-status
    │   │       user-status.model.js
    │   │
    │   ├───user-type
    │   │       user-type.model.js
    │   │
    │   └───users
    │           user.model.js
    │
    ├───public
    │   └───images
    │       └───books
    └───sql
            scriptswallmapu.sql
```

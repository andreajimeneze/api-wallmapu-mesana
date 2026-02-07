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

Datos de salida: 
RESPONSE 200
```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "data": {
    "pagination": {
      "total": 0,
      "page": 0,
      "limit": 0,
      "next": "string",
      "prev": "string"
    },
    "rows": [
      {
        "id": 0,
        "title": "string",
        "subtitle": "string",
        "body": "string",
        "created_at": "string",
        "updated_at": "string",
        "gallery": [
          {
            "id": 0,
            "alt": "string",
            "img": "string",
            "id_news": 0
          }
        ]
      }
    ]
  }
}

```
RESPONSE 404
```json
{
    "isSuccess": false,
    "statusCode": 0,
    "message": "string",
    "data": null
}
```

GET / https://api-wallmapu-mesana.vercel.app/api/news/{id}

Requerido: {id}

Datos de salida: 

RESPONSE 200
```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "data": {
    "id": 0,
    "title": "string",
    "subtitle": "string",
    "body": "string",
    "created_at": "string",
    "updated_at": "string",
    "gallery": [
      {
        "id_news_gallery": 0,
        "img": "string",
        "alt": "string",
        "id_news": 0
      }
    ]
  }
}

```
RESPONSE 404
```json
{
    "isSuccess": false,
    "statusCode": 0,
    "message": "string",
    "data": null
}
```

POST / https://api-wallmapu-mesana.vercel.app/api/news

Datos de entrada:
```json 
{
  "title": "string",
  "subtitle": "string",
  "body": "string"
}
```
Datos de salida:

RESPONSE 201
```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "data": {
    "id": 0,
    "title": "string",
    "subtitle": "string",
    "body": "string",
    "created_at": "string",
    "updated_at": "string",
    "gallery": []
  }
}
```
PUT / https://api-wallmapu-mesana.vercel.app/api/news/{id}

Requerido: {id}

Datos de entrada:
```json
{
  "title": "string",
  "subtitle": "string",
  "body": "string"
}
```
Datos de salida: 

RESPONSE 200
```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "data": {
    "id": 0,
    "title": "string",
    "subtitle": "string",
    "body": "string",
    "created_at": "string",
    "updated_at": "string",
    "gallery": [
      {
        "id_news_gallery": 0,
        "img": "string",
        "alt": "string",
        "id_news": 0
      }
    ]
  }
}

```
RESPONSE 404
```json
{
    "isSuccess": false,
    "statusCode": 0,
    "message": "string",
    "data": null
}
```

DELETE / https://api-wallmapu-mesana.vercel.app/api/news/{id}

Requerido: {id}

RESPONSE 204
```json
{
    "isSuccess": true,
    "statusCode": 0,
    "message": "string"
}
```
RESPONSE 404
```json
{
    "isSuccess": true,
    "statusCode": 0,
    "message": "string",
    "data": null
}
```

## ESTRUCTURA DE CARPETAS

```
src
    ├───config
    │       dbSequelize.js
    │       env.js
    |       multer.js
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
    ├───services
    |       └───processImage.js
    |
    └───sql
    |        scriptswallmapu.sql
    |
    |───app.js
```

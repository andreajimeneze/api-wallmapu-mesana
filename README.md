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
GET / https://api-wallmapu-mesana.vercel.app/api/news?page=0&items=0&search=

Datos de entrada opcional:
page = 0,
items = 0,
search = "string"

Datos de salida:
RESPONSE 200

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": {
    "items": 0,
    "pages": 0,
    "next": "string",
    "prev": "string",
    "result": [
      {
        "id_news": 0,
        "title": "string",
        "subtitle": "string",
        "body": "string",
        "created_at": "string",
        "updated_at": "string",
        "images": [
          {
            "news_id_gallery": 0,
            "alt": "string",
            "url": "string",
            "news_id": 0
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
  "result": null
}
```

GET / https://api-wallmapu-mesana.vercel.app/api/news/{id}

Requerido: {id} \*id_news

Datos de salida:

RESPONSE 200

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": {
    "id_news": 0,
    "title": "string",
    "subtitle": "string",
    "body": "string",
    "created_at": "string",
    "updated_at": "string",
    "images": [
      {
        "id_news_gallery": 0,
        "url": "string",
        "alt": "string",
        "news_id": 0
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
  "result": null
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
  "result": {
    "id_news": 0,
    "title": "string",
    "subtitle": "string",
    "body": "string",
    "created_at": "string",
    "updated_at": "string"
  }
}
```

PUT / https://api-wallmapu-mesana.vercel.app/api/news/{id}

Requerido: {id} \*id_news

Datos de entrada:

```json
{
  "title": "string",
  "subtitle": "string",
  "body": "string"
}
```

Datos de salida:

RESPONSE 202

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": {
    "id_news": 0,
    "title": "string",
    "subtitle": "string",
    "body": "string",
    "created_at": "string",
    "updated_at": "string",
  }
}
```

RESPONSE 404

```json
{
  "isSuccess": false,
  "statusCode": 0,
  "message": "string",
  "result": null
}
```

DELETE / https://api-wallmapu-mesana.vercel.app/api/news/{id}

Requerido: {id} \*id_news

RESPONSE 202

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": {
    "id_news": 0,
    "title": "string",
    "subtitle": "string",
    "body": "string",
    "created_at": "string",
    "updated_at": "string",
  }
}
```

RESPONSE 404

```json
{
  "isSuccess": false,
  "statusCode": 0,
  "message": "string",
  "result": null
}
```

RESPONSE 409 

```json
{
  "isSuccess": false,
  "statusCode": 0,
  "message": "string",
  "result": null
}
```

GET / https://api-wallmapu-mesana.vercel.app/api/gallery/{id}

Requerido: {id} \*news_id

RESPONSE 200

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": [
    {
      "id": 0,
      "alt": "string",
      "url": "string",
      "news_id": 0
    },
    {
      "id": 0,
      "alt": "string",
      "url": "string",
      "news_id": 0
    }
  ]
}
```

RESPONSE 404

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": null
}
```

POST / https://api-wallmapu-mesana.vercel.app/api/gallery/news/{id}

Requerido: {id} \*news_id

Datos de entrada:

```json
{
  "alt": "string",
  "url": "string"
}
```

Datos de salida:

```json
RESPONSE 201
{
    "isSuccess": true,
    "statusCode": 0,
    "message": "string",
    "result": {
        "id": 0,
        "alt": "string",
        "url": "string",
        "news_id": 0
    }
}
```

RESPONSE 404

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": null
}
```

GET /api/communes

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": [
    {
      "id_commune": 0,
      "commune": "string",
      "province_id": 0,
      "province": {
        "id_province": 0,
        "province": "string",
        "region_id": 0
      }
    }
  ]
}
```
GET /api/communes/{id}
```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": {
    "id_commune": 0,
    "commune": "string",
    "province_id": 0,
    "province": {
      "id_province": 0,
      "province": "string",
      "region_id": 0
    }
  }
}
```

GET /api/provinces

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": [
    {
      "id_province": 0,
      "province": "string",
      "region_id": 0,
      "region": {
        "id_region": 0,
        "region": "string"
      }
    }
  ]
}
```
GET /api/provinces/{id}
```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": {
    "id_province": 0,
    "province": "string",
    "region_id": 0,
    "region": {
      "id_region": 0,
      "region": "string"
    }
  }
}
```
GET /api/regions
```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": [
    {
      "id_region": 0,
      "region": "string"
    }
  ]
}
```

GET /api/regions/{id}
```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": {
    "id_region": 0,
    "region": "string"
  }
}
```
GET /api/role/{id}
```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": {
    "id_user_role": 0,
    "role": "string"
  }
}
```
GET /api/status/{id}
```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": {
    "id_user_status": 0,
    "status": "string"
  }
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

# SERVIDOR LOCAL

Para arrancar servidor local:

npm run dev

Corre en http://localhost:3000/

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
    "isSuccess": true,
    "statusCode": 200,
    "message": "Operación exitosa",
    "data": {
        "pagination": {
            "total": int,
            "page": str,
            "limit": int,
            "next": null,
            "prev": null
        },
        "rows": [
            {
                "id": 1,
                "title": string,
                "subtitle": string,
                "body": string,
                "created_at": datetime,
                "updated_at": datetime,
                "images": []
            },
            {
                 "id": 1,
                "title": string,
                "subtitle": string,
                "body": string,
                "created_at": datetime,
                "updated_at": datetime,
                "images": []
            }
        ]
    }
}
```

GET / https://api-wallmapu-mesana.vercel.app/api/news/{id}

RESPONSE 200
```json
{
    "isSuccess": true,
    "statusCode": 200,
    "message": "Noticia encontrada",
    "data": {
        "id": 1,
        "title": string,
        "subtitle": string,
        "body": string,
        "created_at": datetime,
        "updated_at": datetime,
        "images": []
    }
}
```
RESPONSE 404
```json
{
    "isSuccess": false,
    "statusCode": 404,
    "message": "Noticia no encontrada",
    "data": null
}
```

POST / https://api-wallmapu-mesana.vercel.app/api/news

Datos de entrada:
```json 
{
  "title": string,
  "subtitle": string,
  "body": string
}
```
Datos de salida:
```json
{
    "isSuccess": true,
    "statusCode": 200,
    "message": "Noticia creada exitosamente",
    "data": {
        "id": 0,
        "title": string,
        "subtitle": string,
        "body": string,
        "created_at": datetime,
        "updated_at": datetime,
        "images": []
    }
}
```
PUT / https://api-wallmapu-mesana.vercel.app/api/news/{id}

Datos de entrada:
```json
{
  "title": string,
  "subtitle": string,
  "body": string
}
```
Datos de salida: 
RESPONSE 200
```json
{
    "isSuccess": true,
    "statusCode": 200,
    "message": "Noticia editada correctamente",
    "data": {
        "id": 0,
        "title": string,
        "subtitle": string,
        "body": string,
        "created_at": datetime,
        "updated_at": datetime,
        "images": []
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

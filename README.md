## DEPENDENCIAS

```json
 "dependencies": {
    "cloudinary": "^2.9.0",
    "cors": "^2.8.6",
    "dotenv": "^17.3.1",
    "express": "^4.22.1",
    "jsonwebtoken": "^9.0.3",
    "multer": "^2.0.2",
    "passport": "^0.7.0",
    "passport-google-oauth20": "^2.0.0",
    "path": "^0.12.7",
    "pg": "^8.17.2",
    "sequelize": "^6.37.7",
    "sequelize-cli": "^6.6.5"
  }
```

## DOCUMENTACIÓN API

# 📘 WALLMAPU MESANA API

Base URL:

https://api-wallmapu-mesana.vercel.app/api

---

# 📌 FORMATO GLOBAL DE RESPUESTA

Todas las respuestas siguen esta estructura:

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": {}
}
```

---

# 📑 TABLA RESUMEN DE ENDPOINTS

| Método | Endpoint           | Descripción                     |
| ------ | ------------------ | ------------------------------- |
| GET    | /news              | Listado paginado de noticias    |
| GET    | /news/{id}         | Obtener noticia por ID          |
| POST   | /news              | Crear noticia                   |
| PUT    | /news/{id}         | Actualizar noticia              |
| DELETE | /news/{id}         | Eliminar noticia                |
| GET    | /gallery/{id}      | Galería imágenes por ID         |
| POST   | /gallery/news/{id} | Crear imagen por ID noticia     |
| DELETE | /gallery/news/{id} | Eliminar galería por ID noticia |
| DELETE | /gallery/{id}      | Eliminar imagen por ID          |
| GET    | /users             | Listado paginado de usuarios    |
| GET    | /users/{id}        | Usuario por ID                  |
| PUT    | /users/{id}        | Actualizar usuario              |
| GET    | /regions           | Listado de regiones             |
| GET    | /regions/{id}      | Región por ID                   |
| GET    | /provinces         | Listado de provincias           |
| GET    | /provinces/{id}    | Provincia por ID                |
| GET    | /communes          | Listado de comunas              |
| GET    | /communes/{id}     | Comunas por ID                  |
| GET    | /role              | Listado de roles usuarios       |
| GET    | /role/{id}         | Rol por ID                      |
| GET    | /status            | Listado estado usuarios         |
| GET    | /status/{id}       | Estado por ID                   |
| GET    | /books             | Listado paginado de libros      |
| GET    | /books/{id}        | Obtener libro por ID            |
| GET    | /authors           | Listado de autores              |
| GET    | /authors/{id}      | Autor por ID                    |
| GET    | /genres            | Listado de géneros              |
| GET    | /genres/{id}       | Género por ID                   |
| GET    | /subjects          | Listado de materias             |
| GET    | /subjects/{id}     | Materia por ID                  |
| GET    | /editorials        | Listado de editoriales          |
| GET    | /editorials/{id}   | Editorial por ID                |
| GET    | /editions          | Listado de ediciones            |
| GET    | /editions/{id}     | Edición por ID                  |
| GET    | /copies            | Listado de copias               |
| GET    | /copies/{id}       | Copia por ID                    |
| GET    | /copy-status       | Listado de estados de copia     |
| GET    | /copy-status/{id}  | Estado de copia por ID          |

---

# 📰 NEWS

## GET /news

Query Params:

page=0  
items=0  
search=string

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": {
    "page": 0,
    "pages": 0,
    "items": 0,
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
            "id_news_gallery": 0,
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

---

## GET /news/{id}

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
        "alt": "string",
        "url": "string",
        "news_id": 0
      }
    ]
  }
}
```

---

## POST /news

```json
{
  "title": "string",
  "subtitle": "string",
  "body": "string"
}
```

---

## PUT /news/{id}

```json
{
  "title": "string",
  "subtitle": "string",
  "body": "string"
}
```

---

## DELETE /news/{id}

### Response 202

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": {}
}
```

---

# 🖼 GALLERY

## GET /gallery/{id}

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
      "news_id": 0,
      "created_at": "string",
      "updated_at": "string"
    }
  ]
}
```

---

## POST /gallery/news/{id}

```json
{
  "alt": "string",
  "url": "string"
}
```

## DELETE /gallery/{id_gallery}

### Response 202

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": {}
}
```

---

## DELETE /gallery/news/{id_news}

### Response 202

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": {}
}
```

---

# 👥 USERS

## GET /users

Query Params:

page=0  
items=0  
search=string

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": {
    "page": 0,
    "pages": 0,
    "items": 0,
    "next": "string",
    "prev": "string",
    "result": [
      {
        "id_user": 0,
        "username": "string",
        "userlastname": "string",
        "rut": "string",
        "address": "string",
        "phone_number": "string",
        "email": "string",
        "commune_id": 0,
        "user_role_id": 0,
        "user_status_id": 0,
        "created_at": "string",
        "updated_at": "string"
      }
    ]
  }
}
```

---

## GET /users/{id}

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": {
    "id_user": 0,
    "username": "string",
    "userlastname": "string",
    "rut": "string",
    "address": "string",
    "phone_number": "string",
    "email": "string",
    "commune_id": 0,
    "user_role_id": 0,
    "user_status_id": 0,
    "created_at": "string",
    "updated_at": "string"
  }
}
```

---

## PUT /users/{id}

```json
{
  "username": "string",
  "userlastname": "string",
  "rut": "string",
  "address": "string",
  "phone_number": "string",
  "commune_id": 0,
  "user_role_id": 0,
  "user_status_id": 0
}
```

---

# 🌎 REGIONS

## GET /regions

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": [
    {
      "id_region": 0,
      "region": "string",
      "created_at": "string",
      "updated_at": "string"
    }
  ]
}
```

---

## GET /regions/{id}

```json
{
  "id_region": 0,
  "region": "string",
  "created_at": "string",
  "updated_at": "string"
}
```

---

# 🏛 PROVINCES

## GET /provinces

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
      "created_at": "string",
      "updated_at": "string",
      "region": {
        "id_region": 0,
        "region": "string"
      }
    }
  ]
}
```

---

## GET /provinces/{id}

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
      "created_at": "string",
      "updated_at": "string",
      "region": {
        "id_region": 0,
        "region": "string"
      }
    }
  ]
}
```

---

# 🏘 COMMUNES

## GET /communes

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
      "created_at": "string",
      "updated_at": "string",
      "province": {
        "id_province": 0,
        "province": "string",
        "region_id": 0
      }
    }
  ]
}
```

---

## GET /communes/{id}

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
      "created_at": "string",
      "updated_at": "string",
      "province": {
        "id_province": 0,
        "province": "string",
        "region_id": 0
      }
    }
  ]
}
```

---

# 🔐 ROLES

## GET /roles

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": [
    {
      "id_user_role": 0,
      "role": "string",
      "created_at": "string",
      "updated_at": "string"
    }
  ]
}
```

---

## GET /roles/{id}

```json
{
  "id_user_role": 0,
  "role": "string",
  "created_at": "string",
  "updated_at": "string"
}
```

---

# 🔎 STATUS

## GET /status

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": [
    {
      "id_user_status": 0,
      "status": "string",
      "created_at": "string",
      "updated_at": "string"
    }
  ]
}
```

---

## GET /status/{id}

```json
{
  "id_user_status": 0,
  "status": "string",
  "created_at": "string",
  "updated_at": "string"
}
```

---

# AUTHORS

## GET /authors

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": [
    {
      "id_author": 0,
      "name": "string",
      "created_at": "string",
      "updated_at": "string"
    }
  ]
}
```

---

## GET /authors/:id

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": {
    "id_author": 0,
    "name": "string",
    "created_at": "string",
    "updated_at": "string"
  }
}
```

---

# GENRES

## GET /genres

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": [
    {
      "id_genre": 0,
      "name": "string",
      "created_at": "string",
      "updated_at": "string"
    }
  ]
}
```

---

## GET /genres/:id

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": {
    "id_genre": 0,
    "name": "string",
    "created_at": "string",
    "updated_at": "string"
  }
}
```

---

# SUBJECTS

## GET /subjects

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": [
    {
      "id_subject": 0,
      "name": "string",
      "created_at": "string",
      "updated_at": "string"
    }
  ]
}
```

---

## GET /subjects/:id

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": {
    "id_subject": 0,
    "name": "string",
    "created_at": "string",
    "updated_at": "string"
  }
}
```

---

# EDITORIALS

## GET /editorials

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": [
    {
      "id_editorial": 0,
      "name": "string",
      "created_at": "string",
      "updated_at": "string"
    }
  ]
}
```

---

## GET /editorials/:id

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": {
    "id_editorial": 0,
    "name": "string",
    "created_at": "string",
    "updated_at": "string"
  }
}
```

---

# EDITIONS

## GET /editions

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": [
    {
      "id_edition": 0,
      "isbn": "string",
      "publication_year": 0,
      "pages": 0,
      "cover_image": "string",
      "book_id": 0,
      "editorial_id": 0,
      "created_at": "string",
      "updated_at": "string"
    }
  ]
}
```

---

## GET /editions/:id

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": {
    "id_edition": 0,
    "isbn": "string",
    "publication_year": 0,
    "pages": 0,
    "cover_image": "string",
    "book_id": 0,
    "editorial_id": 0,
    "created_at": "string",
    "updated_at": "string"
  }
}
```

---

# COPY STATUS

## GET /copy-status

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": [
    {
      "id_status": 0,
      "name": "string"
    }
  ]
}
```

---

## GET /copy-status/:id

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": {
    "id_status": 0,
    "name": "string"
  }
}
```

---

# COPIES

## GET /copies

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": [
    {
      "id_copy": 0,
      "barcode": "string",
      "signature_topography": "string",
      "copy_number": 0,
      "created_at": "string",
      "updated_at": "string",
      "editions": {
        "id_editions": 0,
        "isbn": "string",
        "publication_year": 0,
        "pages": 0,
        "cover_image": "string",
        "book": {
          "id_book": 0,
          "title": "string",
          "summary": "string",
          "genre": {
            "id_genre": 0,
            "name": "string"
          }
        },
        "editorial": {
          "id_editorial": 0,
          "name": "string"
        }
      },
      "status": {
        "id_copy_status": 0,
        "name": "string"
      }
    }
  ]
}
```

---

## GET /copies/:id

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": {
    "id_copy": 0,
    "barcode": "string",
    "signature_topography": "string",
    "copy_number": 0,
    "created_at": "string",
    "updated_at": "string",
    "editions": {
      "id_editions": 0,
      "isbn": "string",
      "publication_year": 0,
      "pages": 0,
      "cover_image": "string"
    },
    "status": {
      "id_copy_status": 0,
      "name": "string"
    }
  }
}
```

---

# BOOKS

## GET /books

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "page": 0,
  "pages": 0,
  "items": 0,
  "next": "string",
  "prev": "string",
  "result": [
    {
      "id_book": 0,
      "title": "string",
      "summary": "string",
      "created_at": "string",
      "updated_at": "string",
      "genre": {
        "id_genre": 0,
        "name": "string"
      },
      "authors": [
        {
          "id_author": 0,
          "name": "string"
        }
      ],
      "subjects": [
        {
          "id_subject": 0,
          "name": "string"
        }
      ],
      "editions": [
        {
          "id_editions": 0,
          "isbn": "string",
          "publication_year": 0,
          "pages": 0,
          "cover_image": "string",
          "editorial": {
            "id_editorial": 0,
            "name": "string"
          },
          "copies": [
            {
              "id_copies": 0,
              "barcode": "string",
              "signature_topography": "string",
              "copies_number": 0,
              "status": {
                "id_status": 0,
                "name": "string"
              }
            }
          ]
        }
      ]
    }
  ]
}
```

---

## GET /books/:id

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "result": {
    "id_book": 0,
    "title": "string",
    "summary": "string",
    "created_at": "string",
    "updated_at": "string",
    "genre": {
      "id_genre": 0,
      "name": "string"
    },
    "authors": [
      {
        "id_author": 0,
        "name": "string"
      }
    ],
    "subjects": [
      {
        "id_subject": 0,
        "name": "string"
      }
    ],
    "editions": []
  }
}
```

---

## ESTRUCTURA DE CARPETAS

```

---src
|   app.js
|
+---application
|   \---news
|           createNewsWithImages.usecase.js
|           deleteNewsAndImages.usecase.js
|
+---config
|       cloudinary.js
|       dbSequelize.js
|       env.js
|
+---database
|   \---models
|           book_author.model.js
|           book_subject.model.js
|
+---helper
|       profileComplete.js
|
+---modules
|   +---auth
|   |       auth.controller.js
|   |       auth.dto.js
|   |       auth.middleware.js
|   |       auth.routes.js
|   |       auth.service.js
|   |       google.service.js
|   |
|   +---authors
|   |       author.controller.js
|   |       author.dto.js
|   |       author.model.js
|   |       author.routes.js
|   |       author.service.js
|   |
|   +---books
|   |       book.controller.js
|   |       book.dto.js
|   |       book.model.js
|   |       book.routes.js
|   |       book.service.js
|   |
|   +---commune
|   |       commune.controller.js
|   |       commune.dto.js
|   |       commune.model.js
|   |       commune.routes.js
|   |       commune.service.js
|   |
|   +---copies
|   |       copy.controller.js
|   |       copy.dto.js
|   |       copy.model.js
|   |       copy.routes.js
|   |       copy.service.js
|   |
|   +---copy_status
|   |       copy-status.model.js
|   |       copy_status.controller.js
|   |       copy_status.dto.js
|   |       copy_status.routes.js
|   |       copy_status.service.js
|   |
|   +---editions
|   |       edition.controller.js
|   |       edition.dto.js
|   |       edition.model.js
|   |       edition.routes.js
|   |       edition.service.js
|   |
|   +---editorials
|   |       editorial.controller.js
|   |       editorial.dto.js
|   |       editorial.model.js
|   |       editorial.routes.js
|   |       editorial.service.js
|   |
|   +---genres
|   |       genre.controller.js
|   |       genre.dto.js
|   |       genre.model.js
|   |       genre.routes.js
|   |       genre.service.js
|   |
|   +---loans
|   |       loan.model.js
|   |
|   +---loans-status
|   |       loan-status.model.js
|   |
|   +---news
|   |       news.controller.js
|   |       news.dto.js
|   |       news.model.js
|   |       news.routes.js
|   |       news.service.js
|   |
|   +---news-gallery
|   |       news-gallery.controller.js
|   |       news-gallery.dto.js
|   |       news-gallery.model.js
|   |       news-gallery.routes.js
|   |       news-gallery.service.js
|   |
|   +---province
|   |       province.controller.js
|   |       province.dto.js
|   |       province.model.js
|   |       province.routes.js
|   |       province.service.js
|   |
|   +---region
|   |       region.controller.js
|   |       region.dto.js
|   |       region.model.js
|   |       region.routes.js
|   |       region.service.js
|   |
|   +---return-status
|   |       return-status.model.js
|   |
|   +---stats
|   |       stat.controller.js
|   |       stat.dto.js
|   |       stat.routes.js
|   |       stat.service.js
|   |
|   +---subjects
|   |       subject.controller.js
|   |       subject.dto.js
|   |       subject.model.js
|   |       subject.routes.js
|   |       subject.service.js
|   |
|   +---user-role
|   |       user-role.controller.js
|   |       user-role.dto.js
|   |       user-role.model.js
|   |       user-role.routes.js
|   |       user-role.service.js
|   |
|   +---user-status
|   |       user-status.controller.js
|   |       user-status.dto.js
|   |       user-status.model.js
|   |       user-status.routes.js
|   |       user-status.service.js
|   |
|   \---users
|           user.controller.js
|           user.dto.js
|           user.model.js
|           user.routes.js
|           user.service.js
|
+---services
|   \---images
|           cloudinary.service.js
|           generateFileName.js
|           multer.js
|
+---shared
|       apiResponse.js
|       paginationResponse.js
|
\---sql
        scriptswallmapu.sql

```

# SERVIDOR LOCAL

Para arrancar servidor local:

npm run dev

Corre en http://localhost:3000/

```


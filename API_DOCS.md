

# TABLA RESUMEN DE ENDPOINTS



## Noticias
| Método | Endpoint                          | Descripción                           |
|--------|-----------------------------------|---------------------------------------|
| GET    | /news                             | Listado paginado de noticias          |
| GET    | /news/{id}                        | Obtener noticia por ID                |
| POST   | /news                             | Crear noticia                         |
| PUT    | /news/{id}                        | Actualizar noticia                    |
| DELETE | /news/{id}                        | Eliminar noticia                      |
| POST   | /images                           | Crear noticia con imagen              |

## Galería de noticias
| Método | Endpoint                          | Descripción                           |
|--------|-----------------------------------|---------------------------------------|
| GET    | /news-gallery/news/{newsId}       | Galería imágenes por ID noticia       |
| POST   | /news-gallery/news/{newsId}       | Crear imagen por ID noticia           |
| DELETE | /news-gallery/news/{newsId}       | Eliminar galería por ID noticia       |
| GET    | /news-gallery/{id}                | Galería imágenes por ID               |
| DELETE | /news-gallery/{id}                | Eliminar imagen por ID                |

## Usuarios
| Método | Endpoint                          | Descripción                           |
|--------|-----------------------------------|---------------------------------------|
| GET    | /users/detailed/users             | Listado paginado de usuarios          |
| GET    | /users/detailed/{id}              | Usuario por ID                        |
| POST   | /users                            | Crear usuario                         |
| PUT    | /users/{id}                       | Actualizar usuario                    |
| GET    | /users/admin/{id}                 | Usuario por ID (admin)                |

### Roles y estados de usuario
| Método | Endpoint                          | Descripción                           |
|--------|-----------------------------------|---------------------------------------|
| GET    | /user-role                        | Listado de roles usuarios             |
| GET    | /user-role/{id}                   | Rol por ID                            |
| GET    | /user-status                      | Listado estado usuarios               |
| GET    | /user-status/{id}                 | Estado por ID                         |

### Ubicación
| Método | Endpoint                          | Descripción                           |
|--------|-----------------------------------|---------------------------------------|
| GET    | /regions                          | Listado de regiones                   |
| GET    | /regions/{id}                     | Región por ID                         |
| GET    | /provinces                        | Listado de provincias                 |
| GET    | /provinces/{id}                   | Provincia por ID                      |
| GET    | /communes                         | Listado de comunas                    |
| GET    | /communes/{id}                    | Comuna por ID                         |

## Libros
| Método | Endpoint                          | Descripción                           |
|--------|-----------------------------------|---------------------------------------|
| GET    | /books/pagination                 | Listado paginado de libros            |
| GET    | /books                            | Listado de libros                     |
| GET    | /books/{id}                       | Obtener libro por ID                  |
| POST   | /books                            | Crear libro                           |
| PUT    | /books/{id}                       | Actualizar libro                      |
| DELETE | /books/{id}                       | Eliminar libro por ID                 |

### Autores y géneros
| Método | Endpoint                          | Descripción                           |
|--------|-----------------------------------|---------------------------------------|
| GET    | /author                           | Listado de autores                    |
| GET    | /author/{id}                      | Autor por ID                          |
| POST   | /author                           | Crear autor                           |
| GET    | /genre                            | Listado de géneros                    |
| GET    | /genre/{id}                       | Género por ID                         |

### Descriptores y relaciones
| Método | Endpoint                          | Descripción                           |
|--------|-----------------------------------|---------------------------------------|
| GET    | /book-subject                     | Listado de descriptores               |
| GET    | /book-subject/{id}                | Descriptor por ID                     |
| DELETE | /book-author/{bookId}/{authorId}  | Eliminar relación libro-autor         |
| DELETE | /book-subject/{bookId}/{subjectId}| Eliminar relación libro-subject       |

### Editoriales y ediciones
| Método | Endpoint                          | Descripción                           |
|--------|-----------------------------------|---------------------------------------|
| GET    | /editorial                        | Listado de editoriales                |
| GET    | /editorial/{id}                   | Editorial por ID                      |
| POST   | /editorial                        | Crear editorial                       |
| PUT    | /editorial/{id}                   | Actualizar editorial                  |
| GET    | /edition/pagination               | Listado paginado de ediciones         |
| GET    | /edition                          | Listado de ediciones                  |
| GET    | /edition/{id}                     | Edición por ID (user)                 |
| GET    | /edition/{id}/detail              | Edición por ID (admin)                |
| POST   | /edition                          | Crear edición                         |
| PUT    | /edition/{id}                     | Actualizar edición                    |
| DELETE | /edition/{id}                     | Eliminar edición por ID               |
| POST   | /edition-image                    | Cargar portada libro                  |
| PUT    | /edition-image/{id}               | Eliminar portada libro                |

### Copias
| Método | Endpoint                          | Descripción                           |
|--------|-----------------------------------|---------------------------------------|
| GET    | /copy                             | Listado de copias                     |
| GET    | /copy/{id}                        | Copia por ID                          |
| GET    | /copy/book/{bookId}               | Copia por ID book                     |
| GET    | /copy/edition/{editionId}         | Copia por ID edition                  |
| GET    | /copy/book/{bookId}/available     | Copia disponible por ID Book          |
| POST   | /copy                             | Crear copia                           |
| PUT    | /copy/{id}                        | Actualizar copia                      |
| DELETE | /copy/{id}                        | Eliminar copia por ID                 |
| GET    | /copy-status                      | Listado de estados de copia           |
| GET    | /copy-status/{id}                 | Estado de copia por ID                |

## Préstamos
| Método | Endpoint                          | Descripción                           |
|--------|-----------------------------------|---------------------------------------|
| GET    | /loans/pagination                 | Listado paginado de préstamos         |
| GET    | /loans                            | Listado de préstamos                  |
| GET    | /loans/{id}                       | Préstamo por ID                       |
| GET    | /loans/user/{userId}              | Préstamos activos por USER ID         |
| GET    | /loans/copy/{copyId}              | Préstamos activos por COPY ID         |
| GET    | /loans/book/{bookId}              | Préstamos activos por BOOK ID         |
| GET    | /loans/overdue                    | Listado préstamos vencidos            |
| POST   | /loans                            | Crear préstamo                        |
| PUT    | /loans/copy/{copyId}/return       | Registrar devolución libro            |
| DELETE | /loans/expire-overdue             | Actualizar estado a préstamos vencidos|
| GET    | /loan-policies                    | Listado políticas de préstamo         |
| GET    | /loan-policies/{id}               | Política de préstamo por ID           |
| POST   | /loan-policies                    | Crear política de préstamo            |
| PUT    | /loan-policies/{id}               | Actualizar política de préstamo       |
| DELETE | /loan-policies/{id}               | Eliminar política de préstamo por ID  |
| GET    | /loan-status                      | Listado de estados de préstamos       |

## Reservas
| Método | Endpoint                          | Descripción                           |
|--------|-----------------------------------|---------------------------------------|
| GET    | /reservations/pagination          | Listado paginado reservas (admin)     |
| GET    | /reservations/pagination/user     | Listado paginado reservas (user)      |
| GET    | /reservations                     | Listado de reservas                   |
| GET    | /reservations/{id}                | Reserva por ID                        |
| GET    | /reservations/user/{userId}       | Reservas por USER ID                  |
| GET    | /reservations/copy/{copyId}       | Reservas por COPY ID                  |
| POST   | /reservations                     | Crear reserva                         |
| PUT    | /reservations/{id}/cancel         | Cancelar reserva por ID               |
| PUT    | /reservations/{id}/pickup         | Marcar estado reserva como entregado  |
| PUT    | /reservations/expire-overdue      | Actualizar estado a reservas vencidas |
| GET    | /reservation-status               | Listado de estados de reservas        |

## Notificaciones
| Método | Endpoint                          | Descripción                           |
|--------|-----------------------------------|---------------------------------------|
| GET    | /notifications                    | Listado de notificaciones             |
| GET    | /notifications/{id}               | Notificación por ID                   |
| GET    | /notifications/user/{userId}      | Notificaciones por USER ID            |
| POST   | /notifications                    | Crear notificación                    |
| DELETE | /notifications/{id}               | Eliminar notificación por ID          |
| DELETE | /notifications/user/{userId}      | Eliminar notificaciones por USER ID   |


# FORMATO GLOBAL DE RESPUESTA

Todas las respuestas siguen esta estructura:

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "data": {}
}
```

---
---

# NEWS

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
  "data": {
    "page": 0,
    "pages": 0,
    "items": 0,
    "next": "string",
    "prev": "string",
    "data": [
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
  "data": {
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
  "data": {}
}
```

---

# GALLERY

## GET /news-gallery/{id}

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "data": [
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

## POST /news-gallery/news/{id}

```json
{
  "alt": "string",
  "url": "string"
}
```

## DELETE /news-gallery/{id_gallery}

### Response 202

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "data": {}
}
```

---

## DELETE /news-gallery/news/{id_news}

### Response 202

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "data": {}
}
```

---

# USERS

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
  "data": {
    "page": 0,
    "pages": 0,
    "items": 0,
    "next": "string",
    "prev": "string",
    "data": [
      {
        "id_user": 0,
        "name": "string",
        "lastname": "string",
        "rut": "string",
        "address": "string",
        "phone": "string",
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
  "data": {
    "id_user": 0,
    "name": "string",
    "lastname": "string",
    "rut": "string",
    "address": "string",
    "phone": "string",
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
  "name": "string",
  "lastname": "string",
  "rut": "string",
  "address": "string",
  "phone": "string",
  "commune_id": 0,
  "user_role_id": 0,
  "user_status_id": 0
}
```

---

# REGIONS

## GET /regions

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "data": [
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

# PROVINCES

## GET /provinces

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "data": [
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
  "data": [
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

# COMMUNES

## GET /communes

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "data": [
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
  "data": [
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

# ROLES

## GET /roles

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "data": [
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

# STATUS

## GET /status

```json
{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "data": [
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
  "data": [
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
  "data": {
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
  "data": [
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
  "data": {
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
  "data": [
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
  "data": {
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
  "data": [
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
  "data": {
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
  "data": [
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
  "data": {
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
  "data": [
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
  "data": {
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
  "data": [
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
  "data": {
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
  "data": [
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
  "data": {
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

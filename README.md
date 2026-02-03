## DEPENDENCIAS
  "dependencies": {
    "cors": "^2.8.6",
    "dotenv": "^17.2.3",
    "express": "^4.22.1",
    "path": "^0.12.7",
    "pg": "^8.17.2",
    "sequelize": "^6.37.7",
    "sequelize-cli": "^6.6.5",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.1"
  }

## DOCUMENTACIÓN API
    https://api-negociacion.vercel.app/docs

## ESTRUCTURA DE CARPETAS

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
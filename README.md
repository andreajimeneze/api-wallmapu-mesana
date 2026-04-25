# WALLMAPU MESANA API

API REST para la gestión de biblioteca, incluyendo usuarios, libros, ediciones, copias, reservas, préstamos, noticias, entre otros módulos complementarios.

---

## Base URL

```
https://api-wallmapu-mesana.vercel.app/api
```

---

## Tecnologías utilizadas

* Node.js
* Express
* Sequelize (PostgreSQL)
* JWT (Autenticación)
* Cloudinary (gestión de imágenes)
* Multer (upload de archivos)

---

## Dependencias principales

```json
{
  "cloudinary": "^2.9.0",
  "cors": "^2.8.6",
  "dotenv": "^17.3.1",
  "express": "^4.22.1",
  "google-auth-library": "^10.6.1",
  "jsonwebtoken": "^9.0.3",
  "multer": "^2.0.2",
  "path": "^0.12.7",
  "pg": "^8.17.2",
  "sequelize": "^6.37.7",
  "sequelize-cli": "^6.6.5",
  "uuid": "^13.0.0"
}
```

---

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd wallmapu-mesana-api
```

---

### 2. Instalar dependencias

```bash
npm install
```

---

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=3000

DB_HOST=
DB_NAME=
DB_USER=
DB_PASSWORD=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

### 4. Ejecutar servidor en desarrollo

```bash
npm run dev
```

Servidor disponible en:

```
http://localhost:3000/
```

---

## Estructura del proyecto

El proyecto sigue una arquitectura modular basada en responsabilidades:

```
src/
│
├── app.js
├── server.js
├── routes.js
│
├── config/            # Configuraciones globales
│   ├── cloudinary.js
│   ├── dbSequelize.js
│   └── env.js
│
├── core/
│   ├── lib/           # Integraciones (Cloudinary, Multer)
│   ├── responses/     # Respuestas estandarizadas
│   ├── services/      # Servicios base reutilizables
│   └── utils/         # Utilidades generales
│
└── modules/           # Módulos de dominio
    ├── auth/
    ├── users/
    ├── books/
    ├── authors/
    ├── loans/
    ├── reservation/
    ├── news/
    └── ...otros módulos
```

---

## Arquitectura

Cada módulo sigue una estructura consistente:

* **controller** → Manejo de requests y responses
* **service** → Lógica de negocio
* **model** → Definición de entidades (Sequelize)
* **routes** → Definición de endpoints
* **dto** → Validaciones y estructuras de datos

---

## Autenticación

La API utiliza **JWT (JSON Web Tokens)** para la autenticación.

Los endpoints protegidos requieren incluir el token en el header:

```
Authorization: Bearer <token>
```

---

## Manejo de imágenes

* Subida de archivos mediante **Multer**
* Almacenamiento en **Cloudinary**
* Generación de nombres únicos para evitar colisiones

---

## Documentación de la API

La documentación completa de endpoints se encuentra en:

```
[Ver documentación de la API](./API_DOCS.md)
```

---

## Scripts disponibles

```bash
npm run dev     # Ejecuta el servidor en modo desarrollo
npm start       # Ejecuta en producción
```

---

## Notas adicionales

* La API implementa paginación en múltiples endpoints
* Se utilizan relaciones entre entidades mediante Sequelize
* Incluye manejo de estados para préstamos, reservas y usuarios
* Soporta subida de imágenes para recursos como noticias y portadas de libros

---


-- =========================
-- DROP TABLES (orden correcto por dependencias)
-- =========================

DROP TABLE IF EXISTS wm_loans;
DROP TABLE IF EXISTS wm_news_gallery;
DROP TABLE IF EXISTS wm_book_subject;
DROP TABLE IF EXISTS wm_book_author;
DROP TABLE IF EXISTS wm_copies;
DROP TABLE IF EXISTS wm_editions;
DROP TABLE IF EXISTS wm_books;
DROP TABLE IF EXISTS wm_users;

DROP TABLE IF EXISTS wm_copy_status;
DROP TABLE IF EXISTS wm_return_status;
DROP TABLE IF EXISTS wm_loan_status;
DROP TABLE IF EXISTS wm_user_status;
DROP TABLE IF EXISTS wm_user_roles;

DROP TABLE IF EXISTS wm_news;
DROP TABLE IF EXISTS wm_communes;
DROP TABLE IF EXISTS wm_provinces;
DROP TABLE IF EXISTS wm_regions;

DROP TABLE IF EXISTS wm_genres;
DROP TABLE IF EXISTS wm_subjects;
DROP TABLE IF EXISTS wm_editorials;
DROP TABLE IF EXISTS wm_authors;


-- =========================
-- TABLAS BASE
-- =========================

CREATE TABLE wm_authors (
  id_author INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wm_editorials (
  id_editorial INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wm_subjects (
  id_subject INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wm_genres (
  id_genre INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wm_copy_status (
  id_status SMALLINT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE wm_regions (
  id_region INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  region VARCHAR(100) NOT NULL
);

CREATE TABLE wm_provinces (
  id_province INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  province VARCHAR(100) NOT NULL,
  region_id INTEGER NOT NULL REFERENCES wm_regions(id_region)
);

CREATE TABLE wm_communes (
  id_commune INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  commune VARCHAR(100) NOT NULL,
  province_id INTEGER NOT NULL REFERENCES wm_provinces(id_province)
);

CREATE TABLE wm_user_roles (
  id_user_role INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  role VARCHAR(45) NOT NULL
);

CREATE TABLE wm_user_status (
  id_user_status INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  status VARCHAR(45) NOT NULL
);

CREATE TABLE wm_loan_status (
  id_loan_status INTEGER PRIMARY KEY,
  loan_status VARCHAR(45) NOT NULL
);

CREATE TABLE wm_return_status (
  id_return_status INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  return_status VARCHAR(45) NOT NULL
);

CREATE TABLE wm_news (
  id_news INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  subtitle VARCHAR(256) NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================
-- LIBROS (modelo nuevo normalizado)
-- =========================

CREATE TABLE wm_books (
  id_book INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  summary TEXT,
  genre_id INTEGER NOT NULL REFERENCES wm_genres(id_genre),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wm_editions (
  id_edition INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  edition VARCHAR(50),
  isbn VARCHAR(20) UNIQUE NOT NULL,
  publication_year INTEGER NOT NULL,
  pages INTEGER NOT NULL,
  cover_image VARCHAR(255),
  book_id INTEGER NOT NULL REFERENCES wm_books(id_book),
  editorial_id INTEGER NOT NULL REFERENCES wm_editorials(id_editorial),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wm_copies (
  id_copy INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  barcode VARCHAR(100) UNIQUE NOT NULL,
  signature_topography VARCHAR(100) NOT NULL,
  copy_number VARCHAR(20) NOT NULL,
  edition_id INTEGER NOT NULL REFERENCES wm_editions(id_edition),
  status_id INTEGER NOT NULL REFERENCES wm_copy_status(id_status),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wm_book_author (
  id_book INTEGER NOT NULL REFERENCES wm_books(id_book),
  id_author INTEGER NOT NULL REFERENCES wm_authors(id_author),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_book, id_author)
);

CREATE TABLE wm_book_subject (
  id_book INTEGER NOT NULL REFERENCES wm_books(id_book),
  id_subject INTEGER NOT NULL REFERENCES wm_subjects(id_subject),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_book, id_subject)
);


-- =========================
-- USUARIOS Y PRÉSTAMOS
-- =========================

CREATE TABLE wm_users (
  id_user UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(45),
  userlastname VARCHAR(45),
  rut VARCHAR(12),
  address VARCHAR(45),
  commune_id INTEGER REFERENCES wm_communes(id_commune),
  phone_number VARCHAR(10),
  email VARCHAR(45) NOT NULL,
  password VARCHAR(45),
  user_role_id INTEGER NOT NULL REFERENCES wm_user_roles(id_user_role),
  user_status_id INTEGER NOT NULL REFERENCES wm_user_status(id_user_status),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wm_loans (
  id_loan INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID REFERENCES wm_users(id_user),
  book_id INTEGER REFERENCES wm_books(id_book),
  loan_date DATE,
  return_date DATE,
  loan_status_id INTEGER REFERENCES wm_loan_status(id_loan_status),
  return_status_id INTEGER REFERENCES wm_return_status(id_return_status),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wm_news_gallery (
  id_news_gallery INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  alt VARCHAR(100) NOT NULL,
  url VARCHAR(256) NOT NULL,
  news_id INTEGER NOT NULL REFERENCES wm_news(id_news)
);
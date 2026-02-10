DROP TABLE IF EXISTS wm_loans;
DROP TABLE IF EXISTS wm_users;
DROP TABLE IF EXISTS wm_books;
DROP TABLE IF EXISTS wm_news_gallery;
DROP TABLE IF EXISTS wm_communs;
DROP TABLE IF EXISTS wm_provinces;
DROP TABLE IF EXISTS wm_regions;
DROP TABLE IF EXISTS wm_authors;
DROP TABLE IF EXISTS wm_categories;
DROP TABLE IF EXISTS wm_editorials;
DROP TABLE IF EXISTS wm_loan_status;
DROP TABLE IF EXISTS wm_return_status;
DROP TABLE IF EXISTS wm_user_status;
DROP TABLE IF EXISTS wm_user_types;
DROP TABLE IF EXISTS wm_news;


CREATE TABLE wm_authors (
    id_author INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    lastname VARCHAR(45) NOT NULL
);

CREATE TABLE wm_categories (
    id_category INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category VARCHAR(45) NOT NULL
);

CREATE TABLE wm_editorials (
    id_editorial INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    editorial VARCHAR(45) NOT NULL
);

CREATE TABLE wm_loan_status (
    id_loan_status INTEGER PRIMARY KEY,
    loan_status VARCHAR(45) NOT NULL
);

CREATE TABLE wm_user_status (
    id_user_status INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_status VARCHAR(45) NOT NULL
);

CREATE TABLE wm_user_types (
    id_user_type INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_type VARCHAR(45) NOT NULL NOT NULL
);

CREATE TABLE wm_regions (
    id_region INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    region VARCHAR(45) NOT NULL
);

CREATE TABLE wm_provinces (
    id_province INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    province VARCHAR(45) NOT NULL,
    id_region INTEGER NOT NULL,
    CONSTRAINT wm_provinces_wm_regions_fk
        FOREIGN KEY (id_region) REFERENCES wm_regions(id_region)
);

CREATE TABLE wm_communs (
    id_commun INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    commun VARCHAR(45) NOT NULL,
    id_province INTEGER NOT NULL,
    CONSTRAINT wm_communs_wm_provinces_fk
        FOREIGN KEY (id_province) REFERENCES wm_provinces(id_province)
);

CREATE TABLE wm_news (
    id_news INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(45) NOT NULL,
    subtitle VARCHAR(45),
	body TEXT NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wm_return_status (
	id_return_status INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	return_status VARCHAR(45) NOT NULL
);

-- =========================
-- TABLAS DEPENDIENTES
-- =========================

CREATE TABLE wm_books (
    id_book INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(100),
    id_category INTEGER,
    id_author INTEGER,
    id_editorial INTEGER,
    summary TEXT,
    ubication VARCHAR(45) NOT NULL,
    book_cover VARCHAR(45),
    isbn VARCHAR(15),
    number_page INTEGER NOT NULL,
    year_publication INTEGER NOT NULL,
    edition_number VARCHAR(45) NOT NULL,
    CONSTRAINT wm_books_wm_categories_fk
        FOREIGN KEY (id_category) REFERENCES wm_categories(id_category),
    CONSTRAINT wm_books_wm_authors_fk
        FOREIGN KEY (id_author) REFERENCES wm_authors(id_author),
    CONSTRAINT wm_books_wm_editorials_fk
        FOREIGN KEY (id_editorial) REFERENCES wm_editorials(id_editorial)
);

CREATE TABLE wm_users (
    id_user INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(45),
    userlastname VARCHAR(45),
    rut VARCHAR(12),
    address VARCHAR(45),
    id_commun INTEGER,
    phone_number VARCHAR(10),
    email VARCHAR(45),
    password VARCHAR(45),
    id_user_type INTEGER,
    id_user_status INTEGER,
    CONSTRAINT wm_users_wm_communs_fk
        FOREIGN KEY (id_commun) REFERENCES wm_communs(id_commun),
    CONSTRAINT wm_users_wm_status_user_fk
        FOREIGN KEY (id_user_status) REFERENCES wm_user_status(id_user_status),
    CONSTRAINT wm_users_wm_user_types_fk
        FOREIGN KEY (id_user_type) REFERENCES wm_user_types(id_user_type)
);

CREATE TABLE wm_loans (
    id_loan INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_user INTEGER,
    id_book INTEGER,
    loan_date DATE,
    return_date DATE,
    id_loan_status INTEGER,
    id_return_status INTEGER,
    CONSTRAINT wm_loans_wm_users_fk
        FOREIGN KEY (id_user) REFERENCES wm_users(id_user),
    CONSTRAINT wm_loans_wm_books_fk
        FOREIGN KEY (id_book) REFERENCES wm_books(id_book),
    CONSTRAINT wm_loans_wm_loan_status_fk
        FOREIGN KEY (id_loan_status) REFERENCES wm_loan_status(id_loan_status),
	CONSTRAINT wm_loans_wm_return_status_fk
        FOREIGN KEY (id_return_status) REFERENCES wm_return_status(id_return_status)
);


CREATE TABLE wm_news_gallery (
    id_news_gallery INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    alt VARCHAR(45) NOT NULL,
	url VARCHAR(256) NOT NULL,
	id_news INTEGER NOT NULL,
	CONSTRAINT wm_news_gallery_wm_news_fk
        FOREIGN KEY (id_news) REFERENCES wm_news(id_news)
);

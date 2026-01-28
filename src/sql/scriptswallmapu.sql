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
    name VARCHAR(45),
    lastname VARCHAR(45)
);

CREATE TABLE wm_categories (
    id_category INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category VARCHAR(45)
);

CREATE TABLE wm_editorials (
    id_editorial INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    editorial VARCHAR(45)
);

CREATE TABLE wm_loan_status (
    id_loan_status INTEGER PRIMARY KEY,
    loan_status VARCHAR(45)
);

CREATE TABLE wm_user_status (
    id_user_status INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_status VARCHAR(45)
);

CREATE TABLE wm_user_types (
    id_user_type INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_type VARCHAR(45) NOT NULL
);

CREATE TABLE wm_regions (
    id_region INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    region VARCHAR(45)
);

CREATE TABLE wm_provinces (
    id_province INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    province VARCHAR(45),
    region_id INTEGER,
    CONSTRAINT wm_provinces_wm_regions_fk
        FOREIGN KEY (region_id) REFERENCES wm_regions(id_region)
);

CREATE TABLE wm_communs (
    id_commun INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    commun VARCHAR(45),
    province_id INTEGER,
    CONSTRAINT wm_communs_wm_provinces_fk
        FOREIGN KEY (province_id) REFERENCES wm_provinces(id_province)
);

CREATE TABLE wm_news (
    id_news INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(45),
    subtitle VARCHAR(45),
	body TEXT,
	date DATE
);

CREATE TABLE wm_return_status (
	id_return_status INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	return_status VARCHAR(45)
)

-- =========================
-- TABLAS DEPENDIENTES
-- =========================

CREATE TABLE wm_books (
    id_book INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(100),
    category_id INTEGER,
    author_id INTEGER,
    editorial_id INTEGER,
    summary TEXT,
    ubication VARCHAR(45) NOT NULL,
    book_cover VARCHAR(45),
    isbn VARCHAR(15),
    number_page INTEGER NOT NULL,
    year_publication INTEGER NOT NULL,
    edition_number VARCHAR(45) NOT NULL,
    CONSTRAINT wm_books_wm_categories_fk
        FOREIGN KEY (category_id) REFERENCES wm_categories(id_category),
    CONSTRAINT wm_books_wm_authors_fk
        FOREIGN KEY (author_id) REFERENCES wm_authors(id_author),
    CONSTRAINT wm_books_wm_editorials_fk
        FOREIGN KEY (editorial_id) REFERENCES wm_editorials(id_editorial)
);

CREATE TABLE wm_users (
    id_user INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(45),
    userlastname VARCHAR(45),
    rut VARCHAR(12),
    address VARCHAR(45),
    commun_id INTEGER,
    phone_number VARCHAR(10),
    email VARCHAR(45),
    password VARCHAR(45),
    user_type_id INTEGER,
    user_status_id INTEGER,
    CONSTRAINT wm_users_wm_communs_fk
        FOREIGN KEY (commun_id) REFERENCES wm_communs(id_commun),
    CONSTRAINT wm_users_wm_status_user_fk
        FOREIGN KEY (user_status_id) REFERENCES wm_user_status(id_user_status),
    CONSTRAINT wm_users_wm_user_types_fk
        FOREIGN KEY (user_type_id) REFERENCES wm_user_types(id_user_type)
);

CREATE TABLE wm_loans (
    id_loan INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INTEGER,
    book_id INTEGER,
    loan_date DATE,
    return_date DATE,
    loan_status_id INTEGER,
	return_status_id INTEGER,
    CONSTRAINT wm_loans_wm_users_fk
        FOREIGN KEY (user_id) REFERENCES wm_users(id_user),
    CONSTRAINT wm_loans_wm_books_fk
        FOREIGN KEY (book_id) REFERENCES wm_books(id_book),
    CONSTRAINT wm_loans_wm_loan_status_fk
        FOREIGN KEY (loan_status_id) REFERENCES wm_loan_status(id_loan_status),
	CONSTRAINT wm_loans_wm_return_status_fk
        FOREIGN KEY (return_status_id) REFERENCES wm_return_status(id_return_status)
);


CREATE TABLE wm_news_gallery (
    id_news_gallery INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    alt VARCHAR(45),
	url VARCHAR(45),
	news_id INTEGER,
	CONSTRAINT wm_news_gallery_wm_news_fk
        FOREIGN KEY (news_id) REFERENCES wm_news(id_news)
);

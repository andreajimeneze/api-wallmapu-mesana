DROP TABLE IF EXISTS wm_exemplaries;
DROP TABLE IF EXISTS wm_book_author;
DROP TABLE IF EXISTS wm_book_subject;
DROP TABLE IF EXISTS wm_editions;
DROP TABLE IF EXISTS wm_exemplary_status;
DROP TABLE IF EXISTS wm_subjects;
DROP TABLE IF EXISTS wm_editorials;
DROP TABLE IF EXISTS wm_authors;
DROP TABLE IF EXISTS wm_books;

CREATE TABLE wm_books (
    id_book INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    summary TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wm_authors (
    id_author INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wm_editorials (
    id_editorial INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wm_subjects (
    id_subject INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wm_exemplary_status (
    id_status INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE wm_book_author (
    book_id INTEGER NOT NULL,
    author_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (book_id, author_id),

    CONSTRAINT wm_book_author_wm_books_fk
        FOREIGN KEY (book_id) REFERENCES wm_books(id_book)
        ON DELETE CASCADE,

    CONSTRAINT wm_book_author_wm_authors_fk
        FOREIGN KEY (author_id) REFERENCES wm_authors(id_author)
        ON DELETE CASCADE
);

CREATE TABLE wm_book_subject (
    book_id INTEGER NOT NULL,
    subject_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (book_id, subject_id),

    CONSTRAINT wm_book_subject_wm_books_fk
        FOREIGN KEY (book_id) REFERENCES wm_books(id_book)
        ON DELETE CASCADE,

    CONSTRAINT wm_book_subject_wm_subjects_fk
        FOREIGN KEY (subject_id) REFERENCES wm_subjects(id_subject)
        ON DELETE CASCADE
);

CREATE TABLE wm_editions (
    id_edition INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    book_id INTEGER NOT NULL,
    editorial_id INTEGER NOT NULL,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    year_publication INTEGER NOT NULL,
    edition_number VARCHAR(50),
    cover_image VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT wm_editions_wm_books_fk
        FOREIGN KEY (book_id) REFERENCES wm_books(id_book)
        ON DELETE CASCADE,

    CONSTRAINT wm_editions_wm_editorials_fk
        FOREIGN KEY (editorial_id) REFERENCES wm_editorials(id_editorial)
);

CREATE TABLE wm_exemplaries (
    id_exemplary INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    edition_id INTEGER NOT NULL,
    barcode VARCHAR(100) UNIQUE NOT NULL,
    signature_topography VARCHAR(100) NOT NULL,
    copy_number VARCHAR(20) NOT NULL,
    status_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT wm_exemplaries_wm_editions_fk
        FOREIGN KEY (edition_id) REFERENCES wm_editions(id_edition)
        ON DELETE CASCADE,

    CONSTRAINT wm_exemplaries_wm_exemplary_status_fk
        FOREIGN KEY (status_id) REFERENCES wm_exemplary_status(id_status)
);
DROP TABLE IF EXISTS
wm_notifications,
wm_loans,
wm_reservations,
wm_users,
wm_news_gallery,
wm_news,
wm_book_subject,
wm_book_author,
wm_copies,
wm_editions,
wm_books,
wm_subjects,
wm_editorials,
wm_authors,
wm_loan_policies,
wm_loan_status,
wm_reservation_status,
wm_copy_status,
wm_user_roles,
wm_user_status,
wm_communes,
wm_provinces,
wm_regions,
wm_genres
CASCADE;

CREATE TABLE IF NOT EXISTS wm_regions (
  id_region INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  region VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);

CREATE TABLE IF NOT EXISTS wm_provinces (
  id_province INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  province VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  region_id INTEGER NOT NULL,
  CONSTRAINT provinces_regions_fk FOREIGN KEY (region_id) REFERENCES wm_regions(id_region)
);

CREATE TABLE IF NOT EXISTS wm_communes (
  id_commune INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
  province_id INTEGER NOT NULL,
  CONSTRAINT communes_provinces_fk FOREIGN KEY (province_id) REFERENCES wm_provinces(id_province)
);

CREATE TABLE IF NOT EXISTS wm_user_status (
  id_user_status INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);

CREATE TABLE IF NOT EXISTS wm_user_roles (
  id_user_role INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(45) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS wm_copy_status (
  id_status INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS wm_reservation_status (
  id_status INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS wm_loan_status (
  id_status INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS wm_loan_policies (
  id_policy INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100),
  max_books INTEGER,
  max_days INTEGER,
  reservation_days INTEGER DEFAULT 3
);

CREATE TABLE IF NOT EXISTS wm_authors (
  id_author INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS wm_editorials (
  id_editorial INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS wm_genres (
  id_genre INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS wm_subjects (
  id_subject INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS wm_books (
  id_book INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  summary TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  genre_id INTEGER NOT NULL,

  CONSTRAINT wm_genres_wm_books_fk FOREIGN KEY (genre_id) REFERENCES wm_genres(id_genre)
);

CREATE TABLE IF NOT EXISTS wm_formats (
  id_format INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS wm_edition_format (
  id_format INTEGER NOT NULL,
  id_edition INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT pk_edition_format PRIMARY KEY (id_edition, id_format),
  CONSTRAINT fk_ef_format FOREIGN KEY (id_format) REFERENCES wm_formats(id_format),
  CONSTRAINT fk_ef_edition FOREIGN KEY (id_edition) REFERENCES wm_editions(id_edition)
);

CREATE TABLE IF NOT EXISTS wm_editions (
  id_edition INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  edition VARCHAR(50),
  isbn VARCHAR(20) NOT NULL,
  publication_year INTEGER NOT NULL,
  pages INTEGER NOT NULL,
  cover_image VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  book_id INTEGER NOT NULL,
  editorial_id INTEGER NOT NULL,
  
  CONSTRAINT wm_editions_wm_books_fk FOREIGN KEY (book_id) REFERENCES wm_books(id_book),
  CONSTRAINT wm_editions_wm_editorials_fk FOREIGN KEY (editorial_id) REFERENCES wm_editorials(id_editorial)
);

CREATE TABLE IF NOT EXISTS wm_copies (
  id_copy INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  barcode VARCHAR(100) NOT NULL UNIQUE,
  signature_topography VARCHAR(100) NOT NULL UNIQUE,
  copy_number INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  edition_id INTEGER NOT NULL,
  status_id INTEGER NOT NULL,

  CONSTRAINT wm_copies_wm_editions_fk FOREIGN KEY (edition_id) REFERENCES wm_editions(id_edition),
  CONSTRAINT wm_copies_wm_status_fk FOREIGN KEY (status_id) REFERENCES wm_copy_status(id_status)
);

CREATE TABLE IF NOT EXISTS wm_book_author (
  id_author INTEGER NOT NULL,
  id_book INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT pk_book_author PRIMARY KEY (id_book, id_author),
  CONSTRAINT fk_ba_book FOREIGN KEY (id_book) REFERENCES wm_books(id_book),
  CONSTRAINT fk_ba_author FOREIGN KEY (id_author) REFERENCES wm_authors(id_author)
);

CREATE TABLE IF NOT EXISTS wm_book_subject (
  id_subject INTEGER NOT NULL,
  id_book INTEGER NOT NULL,  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT pk_book_subject PRIMARY KEY (id_book, id_subject),
  CONSTRAINT fk_bs_book FOREIGN KEY (id_book) REFERENCES wm_books(id_book),
  CONSTRAINT fk_bs_subject FOREIGN KEY (id_subject) REFERENCES wm_subjects(id_subject)
);

CREATE TABLE IF NOT EXISTS wm_news (
  id_news INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY (INCREMENT 1),
  title VARCHAR(100) NOT NULL,
  subtitle VARCHAR(256) NOT NULL,
  body TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS wm_news_gallery (
  id_news_gallery INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY (INCREMENT 1),
  alt VARCHAR(100) NOT NULL,
  url VARCHAR(256) NOT NULL,
  news_id INTEGER NOT NULL,
  CONSTRAINT news_gallery_fk FOREIGN KEY (news_id) REFERENCES wm_news(id_news)
);

CREATE TABLE IF NOT EXISTS wm_users (
  id_user UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(100),
  name VARCHAR(45),
  lastname VARCHAR(45),
  rut VARCHAR(12),
  address VARCHAR(256),
  phone VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
  commune_id INTEGER,
  user_role_id INTEGER NOT NULL,
  user_status_id INTEGER NOT NULL,
  CONSTRAINT users_commune_fk FOREIGN KEY (commune_id) REFERENCES wm_communes(id_commune),
  CONSTRAINT users_types_fk FOREIGN KEY (user_role_id) REFERENCES wm_user_roles(id_user_role),
  CONSTRAINT users_status_fk FOREIGN KEY (user_status_id) REFERENCES wm_user_status(id_user_status)
);

CREATE TABLE IF NOT EXISTS wm_reservations (
  id_reservation INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 10000) PRIMARY KEY,
  reservation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expiration_date TIMESTAMP NOT NULL,

  user_id UUID NOT NULL,
  copy_id INTEGER NOT NULL,
  reservation_status_id INTEGER NOT NULL DEFAULT 1,

  CONSTRAINT fk_res_user FOREIGN KEY (user_id) REFERENCES wm_users(id_user),
  CONSTRAINT fk_res_copy FOREIGN KEY (copy_id) REFERENCES wm_copies(id_copy),
  CONSTRAINT fk_res_status FOREIGN KEY (reservation_status_id) REFERENCES wm_reservation_status(id_status)
);

CREATE TABLE IF NOT EXISTS wm_loans (
  id_loan INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 10000) PRIMARY KEY,
  loan_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL,
  return_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  copy_id INTEGER NOT NULL,
  user_id UUID NOT NULL,
  loan_status_id INTEGER NOT NULL DEFAULT 1,

  CONSTRAINT loans_copies_fk FOREIGN KEY (copy_id) REFERENCES wm_copies(id_copy),
  CONSTRAINT loans_users_fk FOREIGN KEY (user_id) REFERENCES wm_users(id_user),
  CONSTRAINT loans_status_fk FOREIGN KEY (loan_status_id) REFERENCES wm_loan_status(id_status)
);

CREATE TABLE IF NOT EXISTS wm_notifications (
  id_notification INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  is_priority BOOLEAN DEFAULT FALSE,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  user_id UUID NOT NULL,

  CONSTRAINT fk_notif_user FOREIGN KEY (user_id) REFERENCES wm_users(id_user)
);

CREATE INDEX idx_notif_user ON wm_notifications(user_id);
CREATE INDEX idx_notif_user_unread ON wm_notifications(user_id, is_read) WHERE is_read = FALSE;
CREATE INDEX idx_edition_isbn ON wm_editions(isbn);
CREATE INDEX idx_book_title ON wm_books(title);
CREATE INDEX idx_book_summary ON wm_books(summary);
CREATE INDEX idx_book_genre ON wm_books(genre_id);
CREATE INDEX idx_author_id ON wm_book_author(id_author);
CREATE INDEX idx_editorial_id ON wm_editions(editorial_id);
CREATE INDEX idx_reservation_copy ON wm_reservations(copy_id);
CREATE INDEX idx_reservation_user ON wm_reservations(user_id);

-- ===============================
-- REGIONES / PROVINCIAS / COMUNAS
-- ===============================
INSERT INTO wm_regions (region) VALUES
('Región de Arica y Parinacota'),
('Región de Tarapacá'),
('Región de Antofagasta'),
('Región de Atacama'),
('Región de Coquimbo'),
('Región de Valparaíso'),
('Región Metropolitana de Santiago'),
('Región del Libertador General Bernardo O''Higgins'),
('Región del Maule'),
('Región de Ñuble'),
('Región del Biobío'),
('Región de La Araucanía'),
('Región de Los Ríos'),
('Región de Los Lagos'),
('Región de Aysén del General Carlos Ibáñez del Campo'),
('Región de Magallanes y de la Antártica Chilena');


INSERT INTO wm_provinces (province, region_id) VALUES
('Arica', 1),
('Parinacota', 1),
('Iquique', 2),
('Tamarugal', 2),
('Antofagasta', 3),
('El Loa', 3),
('Tocopilla', 3),
('Chañaral', 4),
('Copiapó', 4),
('Huasco', 4),
('Elqui', 5),
('Limarí', 5),
('Choapa', 5),
('Valparaíso', 6),
('Isla de Pascua', 6),
('Los Andes', 6),
('Petorca', 6),
('San Antonio', 6),
('San Felipe de Aconcagua', 6),
('Quillota', 6),
('Marga Marga', 6),
('Santiago', 7),
('Cordillera', 7),
('Chacabuco', 7),
('Maipo', 7),
('Melipilla', 7),
('Talagante', 7),
('Cachapoal', 8),
('Cardenal Caro', 8),
('Colchagua', 8),
('Talca', 9),
('Curicó', 9),
('Linares', 9),
('Cauquenes', 9),
('Diguillín', 10),
('Itata', 10),
('Punilla', 10),
('Concepción', 11),
('Biobío', 11),
('Arauco', 11),
('Cautín', 12),
('Malleco', 12),
('Valdivia', 13),
('Ranco', 13),
('Llanquihue', 14),
('Chiloé', 14),
('Osorno', 14),
('Palena', 14),
('Coyhaique', 15),
('Aysén', 15),
('General Carrera', 15),
('Capitán Prat', 15),
('Magallanes', 16),
('Última Esperanza', 16),
('Tierra del Fuego', 16),
('Antártica Chilena', 16);


INSERT INTO wm_communes (name, province_id) VALUES
('Arica', 1),
('Camarones', 2),
('Putre', 2),
('General Lagos', 2),
('Iquique', 3),
('Alto Hospicio', 3),
('Pozo Almonte', 4),
('Camiña', 4),
('Colchane', 4),
('Huara', 4),
('Pica', 4),
('Antofagasta', 5),
('Mejillones', 5),
('Sierra Gorda', 5),
('Taltal', 5),
('Calama', 6),
('Ollagüe', 6),
('San Pedro de Atacama', 6),
('Tocopilla', 7),
('María Elena', 7),
('Chañaral', 8),
('Diego de Almagro', 8),
('Copiapó', 9),
('Caldera', 9),
('Tierra Amarilla', 9),
('Vallenar', 10),
('Alto del Carmen', 10),
('Freirina', 10),
('Huasco', 10),
('La Serena', 11),
('Coquimbo', 11),
('Andacollo', 11),
('Vicuña', 11),
('Illapel', 12),
('Canela', 12),
('Los Vilos', 13),
('Salamanca', 13),
('Valparaíso', 14),
('Viña del Mar', 14),
('Concón', 14),
('Puchuncaví', 14),
('Quintero', 14),
('Casablanca', 14),
('Isla de Pascua', 15),
('Los Andes', 16),
('San Esteban', 16),
('Petorca', 17),
('La Ligua', 17),
('San Antonio', 18),
('Cartagena', 18),
('San Felipe', 19),
('Putaendo', 19),
('Quillota', 20),
('La Calera', 20),
('Villa Alemana', 21),
('Limache', 21),
('Santiago', 22),
('Providencia', 22),
('Ñuñoa', 22),
('Puente Alto', 23),
('Pirque', 23),
('Colina', 24),
('Lampa', 24),
('San Bernardo', 25),
('Buin', 25),
('Melipilla', 26),
('Alhué', 26),
('Talagante', 27),
('Peñaflor', 27),
('Rancagua', 28),
('Machalí', 28),
('San Fernando', 30),
('Santa Cruz', 30),
('Pichilemu', 29),
('La Estrella', 29),
('Talca', 31),
('Maule', 31),
('Curicó', 32),
('Hualañé', 32),
('Linares', 33),
('San Javier', 33),
('Cauquenes', 34),
('Chanco', 34),
('Chillán', 35),
('Chillán Viejo', 35),
('Quirihue', 36),
('Cobquecura', 36),
('Pinto', 37),
('Concepción', 38),
('Talcahuano', 38),
('Hualpén', 38),
('Los Ángeles', 39),
('Mulchén', 39),
('Lebu', 40),
('Cañete', 40),
('Arauco', 40),
('Temuco', 41),
('Villarrica', 41),
('Loncoche', 41),
('Angol', 42),
('Renaico', 42),
('Collipulli', 42),
('Valdivia', 43),
('Corral', 43),
('La Unión', 44),
('Río Bueno', 44),
('Puerto Montt', 45),
('Puerto Varas', 45),
('Castro', 46),
('Ancud', 46),
('Osorno', 47),
('Purranque', 47),
('Chaitén', 48),
('Futaleufú', 48),
('Coyhaique', 49),
('Lago Verde', 49),
('Aysén', 50),
('Cisnes', 50),
('Chile Chico', 51),
('Río Ibáñez', 51),
('Tortel', 52),
('Punta Arenas', 53),
('Puerto Natales', 54),
('Porvenir', 55),
('Cabo de Hornos', 55),
('Antártica', 56);

-- ========================
-- USER_STATUS / USER_ROLES
-- ========================
INSERT INTO wm_user_status (name)
VALUES 
('Activo/a'),
('Deudor/a'),
('Bloqueado/a');


INSERT INTO wm_user_roles (name)
VALUES 
('Super Admin'),
('Admin'),
('Lector');

-- ==============================================================
-- RESERVATION_STATUS / COPY_STATUS / LOAN_STATUS / LOAN_POLICIES
-- ==============================================================
INSERT INTO wm_reservation_status (name) VALUES
('Pendiente de retiro'),
('Completada'),
('Cancelada'),
('Vencida');

INSERT INTO wm_copy_status (name) VALUES
('Disponible'),
('Extraviada'),
('En reparación'),
('Prestada');

INSERT INTO wm_loan_status (name) VALUES
('En préstamo'),
('Devuelto'),
('Vencido');

INSERT INTO wm_loan_policies (name, max_books, max_days, reservation_days)
VALUES ('wallmapu policy', 3, 14, 3);


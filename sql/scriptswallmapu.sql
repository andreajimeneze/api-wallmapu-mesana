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

CREATE TABLE IF NOT EXISTS wm_user_role (
  id_user_role INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(45) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
  CONSTRAINT users_types_fk FOREIGN KEY (user_role_id) REFERENCES wm_user_role(id_user_role),
  CONSTRAINT users_status_fk FOREIGN KEY (user_status_id) REFERENCES wm_user_status(id_user_status)
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

CREATE TABLE IF NOT EXISTS wm_subjects (
  id_subject INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
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

CREATE TABLE IF NOT EXISTS wm_copy_status (
  id_status INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
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

CREATE TABLE IF NOT EXISTS wm_editions (
  id_edition INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  edition VARCHAR(50),
  isbn VARCHAR(20) UNIQUE NOT NULL,
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

CREATE TABLE IF NOT EXISTS wm_reservation_status (
  id_status INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
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

CREATE TABLE IF NOT EXISTS wm_loan_status (
  id_status INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
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

CREATE TABLE IF NOT EXISTS wm_loan_policies (
  id_policy INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100),
  max_books INTEGER,
  max_days INTEGER,
  reservation_days INTEGER DEFAULT 3
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

INSERT INTO wm_user_status (name)
VALUES 
('Activo/a'),
('Deudor/a'),
('Bloqueado/a');


INSERT INTO wm_user_role (name)
VALUES 
('Super Admin'),
('Admin'),
('Lector');


-- =========================
-- GÉNEROS / FORMATOS
-- =========================

INSERT INTO wm_genres (name) VALUES ('Novela');
INSERT INTO wm_genres (name) VALUES ('Cuento');
INSERT INTO wm_genres (name) VALUES ('Poesía');
INSERT INTO wm_genres (name) VALUES ('Teatro');
INSERT INTO wm_genres (name) VALUES ('Ensayo');
INSERT INTO wm_genres (name) VALUES ('Crónica y periodismo');
INSERT INTO wm_genres (name) VALUES ('Biografía y autobiografía');
INSERT INTO wm_genres (name) VALUES ('Memorias');
INSERT INTO wm_genres (name) VALUES ('Divulgación');
INSERT INTO wm_genres (name) VALUES ('Libro informativo');
INSERT INTO wm_genres (name) VALUES ('Referencia');
INSERT INTO wm_genres (name) VALUES ('Manual y guía');
INSERT INTO wm_genres (name) VALUES ('Cómic y novela gráfica');


-- =========================
-- DESCRIPTORES TEMÁTICOS
-- =========================

INSERT INTO wm_subjects (name) VALUES ('Literatura infantil');
INSERT INTO wm_subjects (name) VALUES ('Literatura juvenil');
INSERT INTO wm_subjects (name) VALUES ('Aventura');
INSERT INTO wm_subjects (name) VALUES ('Amistad y vínculos');
INSERT INTO wm_subjects (name) VALUES ('Amor y relaciones');
INSERT INTO wm_subjects (name) VALUES ('Familia');
INSERT INTO wm_subjects (name) VALUES ('Crecimiento personal');
INSERT INTO wm_subjects (name) VALUES ('Emociones');
INSERT INTO wm_subjects (name) VALUES ('Duelo y resiliencia');
INSERT INTO wm_subjects (name) VALUES ('Identidad');
INSERT INTO wm_subjects (name) VALUES ('Vida cotidiana');
INSERT INTO wm_subjects (name) VALUES ('Fantasía');
INSERT INTO wm_subjects (name) VALUES ('Ciencia ficción');
INSERT INTO wm_subjects (name) VALUES ('Distopía');
INSERT INTO wm_subjects (name) VALUES ('Terror');
INSERT INTO wm_subjects (name) VALUES ('Misterio y suspenso');
INSERT INTO wm_subjects (name) VALUES ('Policial');
INSERT INTO wm_subjects (name) VALUES ('Romance');
INSERT INTO wm_subjects (name) VALUES ('Realismo mágico');
INSERT INTO wm_subjects (name) VALUES ('Humor');
INSERT INTO wm_subjects (name) VALUES ('Novela histórica');
INSERT INTO wm_subjects (name) VALUES ('Historia latinoamericana');
INSERT INTO wm_subjects (name) VALUES ('Historia universal');
INSERT INTO wm_subjects (name) VALUES ('Memoria histórica');
INSERT INTO wm_subjects (name) VALUES ('Pueblos originarios');
INSERT INTO wm_subjects (name) VALUES ('Colonial');
INSERT INTO wm_subjects (name) VALUES ('Medioevo');
INSERT INTO wm_subjects (name) VALUES ('Siglo XX');
INSERT INTO wm_subjects (name) VALUES ('Chile');
INSERT INTO wm_subjects (name) VALUES ('Conflictos bélicos');
INSERT INTO wm_subjects (name) VALUES ('Política');
INSERT INTO wm_subjects (name) VALUES ('Derechos humanos');
INSERT INTO wm_subjects (name) VALUES ('Movimientos sociales');
INSERT INTO wm_subjects (name) VALUES ('Migración y exilio');
INSERT INTO wm_subjects (name) VALUES ('Ciencia y tecnología');
INSERT INTO wm_subjects (name) VALUES ('Naturaleza y medio ambiente');
INSERT INTO wm_subjects (name) VALUES ('Animales');
INSERT INTO wm_subjects (name) VALUES ('Salud mental');
INSERT INTO wm_subjects (name) VALUES ('Educación');
INSERT INTO wm_subjects (name) VALUES ('Sexualidad');
INSERT INTO wm_subjects (name) VALUES ('Arte y cultura');
INSERT INTO wm_subjects (name) VALUES ('Música');
INSERT INTO wm_subjects (name) VALUES ('Cine');
INSERT INTO wm_subjects (name) VALUES ('Cultura popular');
INSERT INTO wm_subjects (name) VALUES ('Viajes y exploración');
INSERT INTO wm_subjects (name) VALUES ('Deporte y recreación');

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Al cateo ´E la laucha refranes y dichos chilenos',
'Libro que reúne refranes, dichos y expresiones populares chilenas transmitidas de generación en generación. A través de frases típicas y ejemplos cotidianos, la obra rescata el humor, la creatividad y la identidad cultural del pueblo chileno. El texto permite conocer costumbres, formas de hablar y enseñanzas populares presentes en la vida diaria. Es una lectura entretenida que valora el patrimonio oral y las tradiciones del país.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El misterio de la casa encantada',
'Novela juvenil de suspenso donde un grupo de jóvenes investiga fenómenos extraños ocurridos en una antigua casa abandonada. Mientras descubren pistas y secretos ocultos, deberán enfrentar sus propios miedos y trabajar unidos para resolver el misterio. La historia mezcla aventura, tensión y momentos de humor, manteniendo la intriga hasta el desenlace final.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Marido puertas afuera,empleada puertas adentro',
'Comedia teatral chilena que presenta una serie de enredos familiares y sociales dentro de un hogar. A través de diálogos ágiles y situaciones humorísticas, la obra critica costumbres, prejuicios y diferencias sociales presentes en la vida cotidiana. Los personajes reflejan distintos tipos humanos reconocibles dentro de la sociedad chilena.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El hombre que se puso toda la ropa',
'Relato humorístico sobre un hombre que decide vestirse con toda la ropa que posee al mismo tiempo. Lo que comienza como una situación absurda termina generando reflexiones sobre la apariencia, el consumo y la identidad personal. El libro utiliza el humor y el absurdo para entretener y hacer pensar al lector.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Los malvados de Battersea',
'Novela juvenil protagonizada por animales callejeros que viven aventuras y peligros en las calles de Londres. Los personajes deberán enfrentar amenazas, sobrevivir en ambientes difíciles y descubrir el valor de la amistad y la lealtad. La obra combina acción, emoción y momentos de gran sensibilidad.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Una chica a la antigua',
'Historia de crecimiento personal protagonizada por una joven con costumbres y valores tradicionales. A través de nuevas amistades, conflictos familiares y experiencias amorosas, la protagonista aprende a adaptarse al mundo que la rodea sin perder su esencia. La novela destaca la importancia de la honestidad y la independencia.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Gustavo y los miedos',
'Libro infantil que aborda los temores cotidianos de un niño llamado Gustavo. A través de situaciones cercanas y familiares, el protagonista aprende que los miedos pueden enfrentarse con ayuda de quienes lo quieren. La obra transmite seguridad emocional y enseña la importancia de expresar sentimientos.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Hombrecitos',
'Clásica novela de Louisa May Alcott que continúa las historias iniciadas en Mujercitas. El libro sigue la vida de varios niños y jóvenes en una escuela donde aprenden valores como la amistad, el trabajo y la responsabilidad. Cada personaje enfrenta dificultades que lo ayudan a crecer y madurar.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Jack y Jill',
'Novela juvenil centrada en la amistad entre dos jóvenes vecinos que comparten juegos, estudios y aventuras. Tras enfrentar distintos problemas familiares y personales, ambos descubren la importancia de la perseverancia, la empatía y la madurez emocional.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Mujercitas',
'Clásica novela de Louisa May Alcott que relata la vida de las hermanas March durante la Guerra Civil estadounidense. Cada una de ellas enfrenta desafíos relacionados con el amor, los sueños y las responsabilidades familiares. La obra destaca valores como la unión familiar, el sacrificio y la búsqueda de la felicidad.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Ocho Primos',
'Historia familiar que narra la convivencia de una joven huérfana con sus numerosos primos y familiares. A través de experiencias cotidianas y enseñanzas afectivas, la protagonista aprende sobre amistad, cariño y crecimiento personal. La novela presenta un ambiente cálido y lleno de valores humanos.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Luz, Sombra de Dios',
'Novela chilena que mezcla conflictos humanos, espiritualidad y reflexiones sobre la fe. Los personajes enfrentan situaciones difíciles que ponen a prueba sus creencias y su capacidad de esperanza. La historia aborda temas como el sufrimiento, el amor y la búsqueda de sentido.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Cuando el sol se aburrio de trabajar',
'Cuento infantil que imagina un mundo donde el sol decide dejar de iluminar la Tierra. Frente a esta situación extraordinaria, los personajes deberán encontrar soluciones para devolver la alegría y el equilibrio al planeta. La historia estimula la imaginación y el amor por la naturaleza.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El Hombre que vendia Tiempo',
'Relato fantástico sobre un personaje capaz de vender tiempo a quienes desean más horas para cumplir sus deseos. Sin embargo, los compradores pronto descubren que el tiempo tiene un valor mucho más profundo del que imaginaban. La obra invita a reflexionar sobre la vida, las prioridades y las relaciones humanas.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Lautaro, Joven libertador de Arauco',
'Novela histórica juvenil inspirada en la vida del líder mapuche Lautaro. El libro relata su aprendizaje, su liderazgo y la resistencia del pueblo mapuche frente a la conquista española. La historia combina hechos históricos con aventuras y destaca el valor de la libertad y la identidad cultural.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Mundo de Cartón',
'Novela sensible que retrata la vida de personajes marcados por la pobreza y las dificultades sociales. A través de experiencias familiares y sueños personales, la historia muestra la importancia de la esperanza y la dignidad humana. El cartón simboliza tanto fragilidad como resistencia.',
1
);


INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Mi Amigo el Negro',
'Relato juvenil sobre la amistad entre niños provenientes de contextos diferentes. A través de experiencias compartidas y situaciones de discriminación, los protagonistas aprenden el valor del respeto, la empatía y la igualdad. El libro transmite un mensaje de inclusión y convivencia.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El día de las Bacterias',
'Libro infantil y educativo que presenta el mundo de las bacterias de manera entretenida y cercana para niños y jóvenes. A través de situaciones cotidianas y personajes curiosos, la historia explica cómo estos microorganismos forman parte de la vida diaria y pueden ser tanto útiles como peligrosos. La obra mezcla ciencia, humor y aprendizaje, despertando el interés por el conocimiento científico.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Malos pasos',
'Novela juvenil que aborda las consecuencias de las malas decisiones y la presión social en la adolescencia. Los personajes enfrentan conflictos familiares, amistades complejas y situaciones que ponen a prueba sus valores. La historia invita a reflexionar sobre la responsabilidad y las oportunidades de cambiar el rumbo de la vida.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'7 muestras, 7 obras: Teatro chileno actual',
'Compilación de obras teatrales contemporáneas chilenas que reflejan distintas problemáticas sociales, culturales y humanas. Cada texto presenta estilos y personajes diversos, mostrando la riqueza del teatro nacional actual. La obra permite conocer nuevas voces dramáticas y acercarse a la realidad chilena desde distintas perspectivas.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Corazon',
'Clásica novela juvenil escrita por Edmundo de Amicis que reúne relatos y experiencias escolares llenas de valores humanos. A través de la mirada de un estudiante, el libro aborda la amistad, la solidaridad, el esfuerzo y el amor por la familia y la patria. Cada capítulo deja enseñanzas morales y emocionales para el lector.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Octocéfalo',
'Novela contemporánea que mezcla drama psicológico y elementos simbólicos para retratar la complejidad de las relaciones humanas. Los personajes enfrentan conflictos emocionales, secretos y tensiones familiares mientras intentan comprender su propia identidad. La obra destaca por su estilo introspectivo y reflexivo.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Cita en el Azul Profundo',
'Historia de aventuras y misterio ambientada en escenarios marinos llenos de peligros y secretos ocultos. Los protagonistas deberán enfrentar desafíos inesperados mientras buscan respuestas relacionadas con el océano y sus misterios. La novela combina emoción, suspenso y exploración.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Halcones de la Noche',
'Novela juvenil de acción y suspenso protagonizada por personajes que se enfrentan a situaciones peligrosas durante la noche. La historia desarrolla temas de valentía, lealtad y supervivencia, manteniendo un ritmo intenso y lleno de tensión hasta el final.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El Hombre Golondrina',
'Novela ambientada durante la Segunda Guerra Mundial que relata la relación entre un niño huérfano y un misterioso hombre que lo ayuda a sobrevivir. A través de un viaje lleno de peligros, ambos personajes construyen un vínculo basado en la confianza y la protección mutua. La obra reflexiona sobre la guerra, la pérdida y la esperanza.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Los Mejores Amigos',
'Historia infantil que explora el valor de la amistad verdadera a través de las aventuras y conflictos de un grupo de niños. Los personajes aprenden a compartir, resolver diferencias y apoyarse mutuamente en momentos difíciles. El libro transmite enseñanzas sobre empatía y compañerismo.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Papá cocina',
'Libro infantil y familiar donde un padre descubre el mundo de la cocina junto a sus hijos. Entre recetas, errores y situaciones divertidas, la familia fortalece sus vínculos afectivos y aprende la importancia de compartir tiempo juntos. La historia mezcla humor y ternura.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'los mejores relatos de terror llevados al cine',
'Selección de relatos clásicos de terror que han inspirado importantes adaptaciones cinematográficas. Las historias presentan fantasmas, criaturas extrañas y situaciones inquietantes que exploran el miedo humano. El libro combina literatura y cine, permitiendo conocer el origen de famosas películas de horror.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'los cazadores de mamuts',
'Novela prehistórica que sigue la vida de un grupo humano dedicado a la caza y supervivencia en tiempos antiguos. Los personajes enfrentan peligros naturales, conflictos tribales y desafíos relacionados con la convivencia. La historia permite imaginar cómo era la vida en los primeros grupos humanos.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Quique hache. el caballo fantasma',
'Nueva aventura del detective juvenil Quique Hache, quien deberá investigar la aparición de un misterioso caballo relacionado con hechos extraños. Junto a sus amigos, el protagonista descubre pistas y enfrenta situaciones llenas de suspenso y humor. La novela mezcla misterio y aventura juvenil.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Quique hache detective',
'Novela policial juvenil protagonizada por Quique Hache, un joven detective aficionado que se involucra en intrigantes investigaciones. Con ingenio y valentía, el protagonista resuelve casos complejos mientras aprende importantes lecciones sobre la verdad y la justicia.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Quique hache, el mall embrujado',
'Historia juvenil de misterio donde Quique Hache investiga extraños sucesos ocurridos dentro de un centro comercial aparentemente embrujado. Entre pistas, personajes sospechosos y situaciones inesperadas, el detective deberá descubrir qué se oculta detrás de los rumores.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El Rabino',
'Novela que explora la vida, las creencias y los conflictos internos de un líder religioso judío enfrentado a problemas personales y sociales. La obra aborda temas como la identidad, la espiritualidad, la tradición y el sentido de pertenencia dentro de la comunidad.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Las vacaciones del pequeño Nicolás',
'Libro infantil que reúne divertidas historias protagonizadas por Nicolás y sus amigos durante las vacaciones. A través de travesuras, malentendidos y situaciones cotidianas, el personaje vive experiencias llenas de humor y ternura. La obra retrata con sencillez el mundo de la infancia.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El pequeño caballo blanco',
'Novela fantástica y emotiva protagonizada por una joven que llega a una antigua mansión llena de secretos y magia. Allí descubrirá misterios familiares, personajes extraordinarios y un vínculo especial con un pequeño caballo blanco. La historia combina fantasía, aventura y valores como la bondad y el coraje.',
1
);
INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Cámara de gas',
'Thriller judicial escrito por John Grisham que aborda el drama de la pena de muerte en Estados Unidos. La historia sigue a un joven abogado que intenta salvar a su abuelo, condenado a morir en la cámara de gas por un crimen cometido décadas atrás. Mientras avanza el juicio, salen a la luz conflictos familiares, secretos dolorosos y profundas reflexiones sobre la justicia y la discriminación racial. La novela mantiene un clima constante de tensión y crítica social, mostrando los dilemas éticos del sistema judicial.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Cuentos de los hermanos Grimm',
'Recopilación de relatos tradicionales alemanes adaptados por los hermanos Grimm, donde aparecen personajes inolvidables como princesas, brujas, gigantes y animales parlantes. Las historias mezclan fantasía, enseñanzas morales y aventuras llenas de imaginación. Cada cuento transmite valores relacionados con la valentía, la inteligencia y la bondad, aunque también presenta aspectos oscuros propios del folclore europeo. Esta obra constituye uno de los clásicos más importantes de la literatura infantil universal.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'La hija del espantapajaros',
'Novela juvenil que narra la vida de una joven criada en un ambiente aislado y lleno de misterios. La protagonista debe enfrentar prejuicios, secretos familiares y situaciones difíciles mientras busca descubrir quién es realmente. A través de una atmósfera melancólica y emotiva, la historia reflexiona sobre la identidad, la soledad y la necesidad de encontrar un lugar en el mundo. La obra combina elementos de drama y crecimiento personal.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Hugo',
'Historia ambientada en una estación de trenes de París donde un niño huérfano vive oculto entre relojes y mecanismos. Hugo intenta reparar un autómata que perteneció a su padre mientras descubre secretos relacionados con el cine y la magia. La novela mezcla aventura, misterio y emociones profundas, resaltando el valor de los sueños y la imaginación. También funciona como un homenaje a los orígenes del cine y al director Georges Méliès.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Mejor hablar a tiempo',
'Libro juvenil que aborda los problemas de comunicación entre jóvenes, familias y amigos. A través de distintas experiencias cotidianas, los personajes descubren las consecuencias de callar emociones y conflictos importantes. La obra invita a reflexionar sobre la honestidad, el diálogo y la importancia de expresar sentimientos antes de que sea demasiado tarde. Presenta situaciones cercanas a la realidad adolescente y familiar.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'La serpiente blanca y otros cuentos',
'Colección de relatos tradicionales recopilados por los hermanos Grimm donde aparecen criaturas mágicas, animales parlantes y personajes enfrentados a pruebas difíciles. Cada cuento mezcla fantasía y enseñanzas morales relacionadas con la bondad, la inteligencia y la perseverancia. Las historias permiten conocer el imaginario popular europeo y mantienen el encanto clásico de los cuentos maravillosos.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'La bicicleta magica de Sergio Krumm',
'Novela infantil y fantástica sobre un niño que descubre una bicicleta con poderes extraordinarios. Gracias a ella vive aventuras sorprendentes, conoce nuevos amigos y aprende importantes lecciones sobre responsabilidad y amistad. El libro combina imaginación, humor y momentos emotivos, transmitiendo valores positivos para lectores jóvenes.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Las luchas del deseo',
'Obra narrativa que explora los conflictos internos de distintos personajes enfrentados a sus deseos, frustraciones y relaciones afectivas. La historia muestra cómo las emociones humanas pueden convertirse tanto en una fuerza de crecimiento como en motivo de sufrimiento. La novela aborda temas como el amor, la ambición y las contradicciones personales mediante una mirada psicológica e introspectiva.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Cartas del desierto',
'Novela construida a través de cartas que revelan experiencias, recuerdos y emociones vividas en un entorno desértico y aislado. Los personajes reflexionan sobre la soledad, la memoria y los vínculos humanos mientras enfrentan difíciles circunstancias personales. El libro combina un lenguaje poético con una atmósfera melancólica y reflexiva.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Un embrujo de cinco siglos',
'Novela histórica y fantástica ambientada en América Latina, donde sucesos del pasado continúan influyendo sobre el presente. La historia mezcla leyendas, hechos históricos y elementos sobrenaturales relacionados con antiguas maldiciones y secretos familiares. La obra invita a reflexionar sobre la memoria histórica y las huellas del pasado en la sociedad actual.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'La luna tiene ojos negros',
'Novela juvenil de misterio y suspenso donde extraños acontecimientos comienzan a alterar la vida cotidiana de los protagonistas. A medida que avanzan los hechos, los personajes descubren secretos ocultos y enfrentan situaciones inquietantes relacionadas con el miedo y la oscuridad. La obra mantiene una atmósfera intrigante y emocional.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'La pata patana y otros cuentos',
'Libro de cuentos infantiles protagonizados por personajes curiosos y situaciones llenas de humor e imaginación. Cada relato presenta aventuras sencillas que dejan enseñanzas sobre la amistad, la solidaridad y la convivencia. La obra utiliza un lenguaje cercano y entretenido para estimular la lectura en niños.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Romo confesiones de un torturador',
'Libro testimonial basado en las declaraciones de Osvaldo Romo, agente vinculado a violaciones de derechos humanos durante la dictadura chilena. La obra presenta un crudo retrato de la violencia política y de los mecanismos de represión utilizados en ese período. A través de entrevistas y testimonios, el texto invita a reflexionar sobre la memoria histórica, la justicia y las consecuencias humanas de la dictadura.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Del amor y otros demonios',
'Novela de Gabriel García Márquez ambientada en la época colonial, donde una joven acusada de posesión demoníaca vive una intensa historia de amor prohibido. La obra mezcla elementos históricos, religiosos y de realismo mágico para explorar temas como la intolerancia, el deseo y el fanatismo. El lenguaje poético y la atmósfera misteriosa convierten la novela en una profunda reflexión sobre la condición humana.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Poemas de Chile',
'Recopilación poética dedicada a los paisajes, la cultura y la identidad chilena. A través de versos llenos de sensibilidad, el autor retrata la naturaleza, las personas y las emociones vinculadas al país. La obra destaca la relación entre territorio, memoria y pertenencia cultural.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'La abuela',
'Historia emotiva centrada en la relación entre un niño y su abuela, quien transmite enseñanzas, recuerdos y afecto a través de la convivencia cotidiana. La obra aborda temas como la familia, la memoria y el paso del tiempo con un tono sensible y cercano. El libro resalta la importancia de los vínculos intergeneracionales.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Dori fantasmagori',
'Libro infantil protagonizado por Dori, una niña muy imaginativa que transforma situaciones cotidianas en grandes aventuras llenas de fantasía. A través de juegos, monstruos imaginarios y ocurrencias divertidas, la protagonista descubre el valor de la creatividad y la confianza en sí misma. La historia mezcla humor, ternura y situaciones familiares reconocibles para niños pequeños.',
1
);
INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Matate, amor',
'Novela intensa y psicológica escrita por Ariana Harwicz que explora la mente de una mujer atrapada en una vida doméstica marcada por la frustración, el deseo y la violencia emocional. La protagonista vive en un entorno rural junto a su esposo e hijo, mientras experimenta pensamientos obsesivos y una creciente sensación de encierro. La narración se desarrolla mediante un lenguaje crudo, poético y profundamente inquietante, mostrando el deterioro emocional de una mujer que lucha contra las expectativas sociales impuestas sobre la maternidad y el matrimonio. La obra aborda temas como la identidad femenina, la alienación, la sexualidad y la desesperación, construyendo una atmósfera opresiva y provocadora que desafía constantemente al lector.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El latido del pájaro',
'Novela juvenil que combina sensibilidad y reflexión a través de la historia de personajes enfrentados a pérdidas, cambios y descubrimientos personales. El relato utiliza la imagen simbólica de las aves y de la naturaleza para representar la libertad, los sueños y la necesidad de encontrar un lugar propio en el mundo. A medida que avanza la historia, los protagonistas aprenden a enfrentar el dolor, comprender sus emociones y valorar los vínculos afectivos que les rodean. El libro destaca por su tono emotivo y por una narración que invita a reflexionar sobre la fragilidad de la vida y la importancia de escuchar los propios sentimientos.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El poder esta dentro de ti',
'Libro de crecimiento personal orientado a fortalecer la autoestima, el pensamiento positivo y la capacidad de transformación interior. La autora propone distintas reflexiones y ejercicios destinados a ayudar al lector a superar miedos, inseguridades y creencias limitantes que afectan la vida cotidiana. A través de ejemplos simples y mensajes motivadores, la obra sostiene que cada persona posee la capacidad de construir bienestar emocional y alcanzar sus metas mediante cambios internos. El texto enfatiza la importancia de la confianza, el amor propio y la responsabilidad personal en la búsqueda de una vida más plena y consciente.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'La estirpe de los Kuragin',
'Novela histórica y familiar que sigue la trayectoria de una poderosa familia marcada por ambiciones, conflictos y secretos transmitidos de generación en generación. La historia presenta personajes complejos cuyas decisiones afectan profundamente el destino de sus descendientes. Ambientada en un contexto de cambios sociales y políticos, la obra explora temas relacionados con el poder, la herencia, la lealtad y las pasiones humanas. La narración combina drama, intriga y relaciones familiares intensas, construyendo un retrato amplio de las tensiones que surgen entre el deber y los deseos personales.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Leyendas de los otori, el brillo de la luna',
'Primera entrega de la saga ambientada en un Japón feudal imaginario, donde clanes rivales luchan por el poder mientras antiguas profecías comienzan a cumplirse. El protagonista descubre habilidades extraordinarias que lo convierten en una figura clave dentro de los conflictos políticos y militares de la región. La novela mezcla acción, romance, traiciones y elementos de fantasía oriental en una historia cargada de tensión y aventura. Además de las batallas y conspiraciones, la obra reflexiona sobre el honor, la identidad y el destino.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Leyendas  de los otori, con la hierba de almohada',
'Continuación de la saga de los Otori, donde los personajes principales deben enfrentar nuevas amenazas, alianzas peligrosas y decisiones que cambiarán el futuro de sus clanes. La historia profundiza en los conflictos políticos y emocionales surgidos tras las guerras anteriores, mostrando cómo el deseo de venganza y poder puede destruir relaciones y territorios. La novela mantiene una atmósfera de misterio y tensión constante, enriquecida por elementos de la cultura japonesa tradicional y escenas de acción cuidadosamente desarrolladas.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Leyendas de los Otoris, la red del cielo es amplia',
'Novela que amplía el universo de la saga Otori mostrando el origen de algunos personajes y acontecimientos fundamentales para comprender los conflictos posteriores. La historia presenta un mundo gobernado por alianzas frágiles, traiciones y luchas territoriales donde el honor y la estrategia son esenciales para sobrevivir. Los personajes enfrentan pérdidas, dilemas morales y difíciles decisiones mientras intentan proteger a quienes aman. La obra combina aventura épica, drama humano y elementos históricos inspirados en el Japón feudal.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Leyendas de los Otoris, el sueño del ruiseñor',
'Entrega de la saga fantástica que continúa explorando las complejas relaciones entre clanes rivales y protagonistas marcados por el destino. La novela desarrolla conflictos relacionados con el amor, la lealtad y la guerra, mientras los personajes intentan sobrevivir en un mundo lleno de conspiraciones y violencia. La narración incorpora escenas de acción, momentos emotivos y descripciones detalladas de paisajes y costumbres inspiradas en la cultura japonesa. El relato mantiene un tono épico y reflexivo sobre el poder y las consecuencias de las decisiones humanas.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Teatro chileno contemporáneo',
'Compilación de obras dramáticas representativas de la dramaturgia chilena contemporánea. Los textos abordan problemáticas sociales, políticas y humanas vinculadas a la identidad, la desigualdad, la memoria y las transformaciones culturales del país. A través de distintos estilos narrativos y propuestas escénicas, la obra permite conocer las preocupaciones y búsquedas de autores teatrales modernos. El libro constituye una valiosa aproximación al desarrollo del teatro chileno reciente y a su capacidad para interpretar la realidad nacional.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El viejo y el mar',
'Clásica novela corta de Ernest Hemingway que narra la lucha de un viejo pescador cubano contra un enorme pez espada en alta mar. Después de muchos días sin conseguir pesca, el protagonista emprende una batalla física y espiritual marcada por el cansancio, la perseverancia y la dignidad. La historia representa la resistencia humana frente a la adversidad y la relación del hombre con la naturaleza. A través de un lenguaje sencillo pero profundamente simbólico, la obra reflexiona sobre el orgullo, la soledad, el fracaso y la capacidad de seguir luchando incluso en las circunstancias más difíciles.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'La cuncuna Filomena',
'Libro infantil protagonizado por una pequeña oruga llamada Filomena que vive distintas aventuras mientras descubre el mundo que la rodea. A lo largo de la historia, la protagonista aprende sobre la amistad, el crecimiento y la importancia de aceptarse a sí misma. El relato utiliza un lenguaje cercano y colorido que estimula la imaginación de los niños y transmite enseñanzas relacionadas con la naturaleza y la transformación personal. La obra destaca por su tono afectuoso y educativo.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Ficciones detrás del espejo',
'Colección de relatos fantásticos y contemporáneos donde los personajes atraviesan experiencias extrañas que alteran su percepción de la realidad. Los cuentos exploran mundos paralelos, identidades cambiantes y situaciones que mezclan lo cotidiano con lo inquietante. Cada historia invita al lector a cuestionar los límites entre verdad e imaginación, utilizando elementos simbólicos y psicológicos. La obra destaca por su atmósfera misteriosa y por la diversidad de estilos narrativos presentes en sus relatos.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Demian',
'Novela filosófica de Hermann Hesse que relata el proceso de formación espiritual y personal de Emil Sinclair, un joven que busca comprender su verdadera identidad. A través de la influencia de Max Demian, el protagonista descubre nuevas formas de pensar y cuestiona las normas morales impuestas por la sociedad. La obra aborda temas como la dualidad humana, la libertad interior, el despertar de la conciencia y la búsqueda del sentido de la vida. Considerada una de las novelas más importantes del autor, combina reflexión psicológica, simbolismo y desarrollo personal.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Sidharta',
'Novela espiritual escrita por Hermann Hesse inspirada en la filosofía oriental y en la búsqueda del conocimiento interior. El protagonista abandona una vida cómoda para recorrer distintos caminos en busca de la iluminación y del verdadero sentido de la existencia. Durante su viaje experimenta el amor, la riqueza, el sufrimiento y la contemplación, comprendiendo que la sabiduría no puede enseñarse únicamente mediante palabras. La obra reflexiona sobre la naturaleza humana, el equilibrio espiritual y la relación entre experiencia y conocimiento.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Cuentos magicos del sur del mundo',
'Recopilación de relatos inspirados en leyendas y tradiciones del sur de Chile y de otros territorios australes. Las historias presentan criaturas fantásticas, paisajes misteriosos y personajes vinculados con la naturaleza y las creencias populares. Cada cuento mezcla elementos mágicos con aspectos culturales propios de las comunidades del sur, transmitiendo enseñanzas y valores ancestrales. El libro destaca por su riqueza imaginativa y por rescatar parte importante del patrimonio oral y narrativo.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Los cuentos de la ciudad dormida',
'Libro de relatos ambientados en una ciudad aparentemente tranquila donde comienzan a ocurrir hechos extraños y sorprendentes. Los personajes viven experiencias relacionadas con misterios, sueños y secretos ocultos bajo la rutina cotidiana. Cada historia revela aspectos inesperados de la condición humana y construye una atmósfera entre fantástica y melancólica. La obra combina imaginación, simbolismo y reflexión social.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Los derechos de los animales',
'Libro informativo y reflexivo que analiza la relación entre los seres humanos y los animales desde una perspectiva ética y social. La obra aborda temas relacionados con el maltrato animal, la protección de especies y la responsabilidad de las personas frente al medio ambiente. Mediante ejemplos y argumentos accesibles, el texto invita a cuestionar prácticas tradicionales y a promover una convivencia más respetuosa con otras formas de vida. Constituye una lectura orientada a fomentar la conciencia y el respeto por los animales.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Un dialogo pendiente',
'Ensayo y reflexión sobre conflictos sociales, políticos y humanos que requieren comunicación y entendimiento entre distintas partes. El libro analiza la importancia del diálogo como herramienta para resolver diferencias y construir acuerdos duraderos. A través de testimonios, ideas y referencias históricas, la obra plantea la necesidad de escuchar otras voces y superar prejuicios. El texto invita a reflexionar sobre la convivencia democrática y el respeto mutuo.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'La mujer de goma',
'Novela contemporánea que mezcla humor, crítica social y elementos simbólicos para retratar la vida de una mujer enfrentada a relaciones complejas y situaciones absurdas. La protagonista intenta adaptarse a un entorno lleno de presiones sociales y emocionales mientras cuestiona las expectativas impuestas sobre su identidad. La obra desarrolla una mirada irónica sobre la vida cotidiana y las relaciones humanas, utilizando un estilo narrativo creativo y provocador.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El regreso de la mujer de goma',
'Continuación de la historia de la protagonista conocida como “la mujer de goma”, quien debe enfrentar nuevas crisis personales, vínculos afectivos complejos y experiencias que desafían su estabilidad emocional. La novela profundiza en las contradicciones internas del personaje y en la manera en que la sociedad condiciona las relaciones humanas y la percepción de uno mismo. A través de situaciones cargadas de humor negro, tensión psicológica y crítica social, la obra retrata el intento de reconstrucción emocional de una mujer marcada por experiencias difíciles. El relato mezcla momentos absurdos y reflexivos, construyendo una narrativa intensa sobre la identidad, el deseo y la necesidad de reinventarse frente a los cambios de la vida.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Un zorzal llamo a la ventana',
'Novela sensible y poética que narra el encuentro entre personajes que atraviesan momentos de pérdida, nostalgia y transformación personal. La aparición simbólica de un zorzal funciona como un elemento que conecta recuerdos, emociones y esperanzas relacionadas con el pasado. La historia se desarrolla en un ambiente íntimo donde la naturaleza adquiere un papel importante como reflejo de los sentimientos humanos. A medida que avanza el relato, los protagonistas descubren nuevas formas de enfrentar la tristeza y de valorar los vínculos afectivos que permanecen vivos pese al paso del tiempo. La obra combina emoción, contemplación y una profunda reflexión sobre la memoria y la capacidad de sanar.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Adios Mr Chips',
'Clásica novela británica centrada en la vida de un profesor de colegio conocido cariñosamente como Mr. Chips, quien dedica gran parte de su existencia a la enseñanza y a la formación de generaciones de estudiantes. La historia sigue su evolución desde un joven maestro inseguro hasta convertirse en una figura respetada y querida dentro de la institución educativa. A través de recuerdos, experiencias y relaciones humanas significativas, la obra retrata el paso del tiempo, los cambios sociales y el valor de la vocación docente. El relato combina humor, nostalgia y emotividad, mostrando cómo la influencia de un profesor puede permanecer viva en la memoria de muchas personas incluso después de los años.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El grito de las tierras de hielo',
'Novela de aventuras ambientada en territorios helados y extremos donde un grupo de personajes debe sobrevivir enfrentando peligros naturales, conflictos humanos y secretos ocultos. La historia combina acción, exploración y suspenso mientras los protagonistas descubren antiguas amenazas relacionadas con esas tierras inhóspitas. El entorno frío y desolado contribuye a crear una atmósfera intensa y desafiante que pone a prueba la resistencia física y emocional de cada personaje. A lo largo del relato surgen temas vinculados con la supervivencia, el compañerismo, el miedo y la lucha por mantener la esperanza en circunstancias adversas.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'De domingo a lunes',
'Novela juvenil y contemporánea que retrata la vida cotidiana de personajes enfrentados a cambios emocionales y decisiones importantes durante un breve período de tiempo. La obra explora las relaciones familiares, las amistades y las dificultades propias de la adolescencia mediante situaciones cercanas y realistas. El paso simbólico entre el domingo y el lunes representa el tránsito entre la tranquilidad y las responsabilidades, así como el crecimiento personal de los protagonistas. La narración combina momentos de humor, reflexión y sensibilidad, permitiendo al lector identificarse con las emociones y conflictos que atraviesan los personajes.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Rebeldes',
'Clásica novela juvenil escrita por S. E. Hinton que narra la rivalidad entre dos grupos de adolescentes pertenecientes a diferentes clases sociales. Los protagonistas deben enfrentar la violencia, la discriminación y las dificultades de crecer en un entorno marcado por la pobreza y los prejuicios. La historia muestra cómo las diferencias sociales afectan profundamente la vida de los jóvenes y cómo la amistad y la lealtad pueden convertirse en herramientas de supervivencia. La obra destaca por su mirada honesta sobre la adolescencia, la identidad y el deseo de encontrar un lugar dentro de una sociedad desigual.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Kabul',
'Novela ambientada en Afganistán que retrata las consecuencias humanas de la guerra, la pobreza y los cambios políticos sobre la vida cotidiana de distintas personas. A través de múltiples personajes, la obra muestra cómo la violencia y la inestabilidad afectan las relaciones familiares, la educación y los sueños de toda una generación. La ciudad de Kabul aparece como un espacio marcado por el sufrimiento, pero también por la resistencia y la esperanza de quienes intentan reconstruir sus vidas. El libro ofrece una mirada crítica y profundamente humana sobre los conflictos armados y sus efectos en la sociedad.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Mujeres sobre mujeres',
'Libro que reúne relatos, reflexiones o testimonios centrados en las experiencias de distintas mujeres enfrentadas a desafíos personales, sociales y culturales. Las historias abordan temas como la identidad femenina, las relaciones afectivas, la discriminación y la búsqueda de autonomía en distintos contextos de vida. A través de voces diversas y situaciones complejas, la obra construye una mirada amplia sobre las dificultades y fortalezas presentes en la experiencia de ser mujer. El texto combina sensibilidad, crítica social y reflexión sobre los cambios culturales relacionados con el género.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El jardin secreto',
'Clásica novela infantil de Frances Hodgson Burnett que cuenta la historia de Mary Lennox, una niña solitaria y malhumorada que descubre un jardín abandonado dentro de una antigua mansión inglesa. A medida que cuida el jardín junto a nuevos amigos, la protagonista experimenta una profunda transformación emocional y aprende a valorar la amistad, la naturaleza y la esperanza. La obra destaca el poder sanador del afecto y del contacto con el entorno natural, mostrando cómo el crecimiento personal puede surgir incluso en medio del dolor y la soledad. El relato mezcla sensibilidad, aventura y elementos de descubrimiento interior.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Carrington',
'Novela inspirada en la vida de Leonora Carrington, artista surrealista reconocida por su creatividad y rebeldía frente a las normas sociales de su época. La obra retrata su relación con el arte, la libertad y los conflictos emocionales que marcaron su vida personal. A través de una narración cargada de simbolismo y sensibilidad artística, el libro explora la búsqueda de identidad y la resistencia frente a las limitaciones impuestas por la sociedad. La historia combina elementos históricos, psicológicos y culturales relacionados con el movimiento surrealista.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'La Ilíada-La Odisea',
'Edición que reúne dos de las obras más importantes de la literatura clásica griega atribuidas a Homero. La Ilíada relata los acontecimientos finales de la guerra de Troya, destacando el conflicto entre Aquiles y Agamenón, así como las consecuencias humanas de la guerra y el orgullo. La Odisea narra el largo viaje de regreso de Odiseo a Ítaca, donde enfrenta monstruos, dioses y múltiples peligros antes de reencontrarse con su familia. Ambas epopeyas presentan héroes memorables, valores relacionados con el honor y la valentía, y profundas reflexiones sobre el destino humano y la relación entre dioses y mortales.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'La Iliada',
'Poema épico atribuido a Homero que relata parte de la guerra de Troya y las consecuencias de la ira del héroe Aquiles. La obra muestra enfrentamientos entre guerreros, intervenciones divinas y conflictos relacionados con el honor, el orgullo y la gloria militar. Más allá de las batallas, el relato reflexiona sobre el sufrimiento humano provocado por la guerra y la fragilidad de la vida. Considerada una de las bases de la literatura occidental, la epopeya combina acción, tragedia y profundidad emocional mediante personajes inolvidables y escenas de enorme fuerza narrativa.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'La Odisea',
'Poema épico clásico que narra el extenso viaje de Odiseo de regreso a su hogar tras la caída de Troya. Durante años, el héroe enfrenta monstruos, tempestades, hechiceras y peligros enviados por los dioses, mientras su familia espera su regreso en Ítaca. La obra combina aventura, fantasía y reflexión sobre la inteligencia, la perseverancia y el valor de la familia. A través de múltiples episodios memorables, el relato explora la condición humana y la capacidad de resistir frente a la adversidad.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'La gran batalla, los cinco guardianes',
'Novela fantástica y juvenil perteneciente a la saga Los cinco guardianes, donde un grupo de héroes debe unirse para enfrentar una amenaza capaz de destruir el equilibrio del mundo. Los protagonistas poseen habilidades especiales y deben aprender a confiar unos en otros mientras enfrentan enemigos poderosos y situaciones extremadamente peligrosas. La obra combina acción, magia, aventura y valores relacionados con la amistad y el sacrificio. El relato mantiene un ritmo dinámico y construye un universo lleno de criaturas extraordinarias y conflictos épicos.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El portal del cuervo, los cinco guardianes',
'Nueva entrega de la saga fantástica Los cinco guardianes, centrada en la aparición de un misterioso portal vinculado con fuerzas oscuras y antiguas profecías. Los protagonistas deberán enfrentar desafíos cada vez más complejos mientras descubren secretos relacionados con el origen de sus poderes y el destino del mundo que intentan proteger. La historia mezcla aventura, magia y suspenso en una narración llena de enfrentamientos, alianzas inesperadas y pruebas de valentía. Además de la acción, la novela desarrolla temas relacionados con la lealtad, el crecimiento personal y la responsabilidad frente al poder.',
1
);
INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Isaac Campion',
'Novela de aventuras y misterio ambientada en un contexto histórico marcado por conflictos políticos, secretos familiares y luchas de poder. El protagonista, Isaac Campion, es un personaje inteligente y observador que se ve envuelto en una compleja red de conspiraciones que amenazan no solo su seguridad, sino también la estabilidad de quienes lo rodean. A medida que avanza la historia, Isaac debe enfrentarse a enemigos ocultos, descubrir antiguas verdades y tomar decisiones difíciles que pondrán a prueba su moral y su valentía. La obra combina elementos de suspenso, drama y reflexión sobre la identidad y la responsabilidad personal. Los escenarios descritos poseen una fuerte carga atmosférica y contribuyen a generar una sensación constante de intriga. Además de las situaciones de peligro y acción, la novela profundiza en las emociones humanas, mostrando cómo el miedo, la ambición y la esperanza pueden influir en las decisiones de las personas. El relato desarrolla una narrativa dinámica y detallada que mantiene el interés del lector mediante giros inesperados y personajes complejos.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Los miserables',
'Primera parte de la monumental novela de Victor Hugo que retrata la vida de Jean Valjean, un hombre perseguido por la ley tras haber pasado años en prisión por robar un trozo de pan. A través de un extenso recorrido por la Francia del siglo XIX, la obra muestra la pobreza, la desigualdad y las injusticias sociales que afectan a distintos personajes. Jean Valjean intenta reconstruir su vida y convertirse en una mejor persona, pero el inspector Javert lo persigue obsesivamente convencido de que un criminal jamás puede cambiar. La novela desarrolla profundas reflexiones sobre la misericordia, el perdón, la dignidad humana y las consecuencias de la exclusión social. Junto a la historia principal aparecen múltiples personajes cuyas vidas se entrelazan mostrando distintos aspectos de la realidad social y política de la época. Victor Hugo combina momentos de gran dramatismo con descripciones históricas y filosóficas que convierten la obra en uno de los clásicos más importantes de la literatura universal.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Nuestra de señora de París',
'Clásica novela de Victor Hugo ambientada en el París medieval, centrada en la catedral de Notre Dame y en la vida de personajes profundamente marcados por la tragedia y el deseo. La historia sigue a Quasimodo, el campanero jorobado de la catedral, quien desarrolla un profundo afecto por Esmeralda, una joven gitana perseguida por distintos hombres obsesionados con ella. La obra explora temas como la marginación, la injusticia, la pasión y el destino, mientras describe con enorme detalle la sociedad parisina del siglo XV. La catedral adquiere un papel simbólico fundamental, representando tanto la grandeza cultural como el peso de las estructuras sociales y religiosas. A través de personajes intensos y conflictos emocionales complejos, Victor Hugo construye una crítica a la intolerancia y a la crueldad humana. La novela mezcla drama, romance e historia en una narración de gran fuerza emocional y literaria.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Amor en alta mar',
'Novela romántica y de aventuras ambientada en el océano, donde distintos personajes emprenden un viaje marítimo que transformará profundamente sus vidas. Durante la travesía surgen relaciones afectivas marcadas por el deseo, los secretos y los conflictos emocionales, mientras el mar se convierte en escenario de situaciones inesperadas y peligrosas. La obra desarrolla una atmósfera intensa donde el aislamiento del viaje obliga a los personajes a enfrentarse a sus verdaderos sentimientos y temores. Además del romance, la historia aborda temas relacionados con la libertad, la búsqueda de sentido y las segundas oportunidades. El relato combina momentos de tensión, emoción y contemplación, utilizando el paisaje marítimo como símbolo de cambio y descubrimiento personal.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Porque te llevaste mi peineta amarilla',
'Novela juvenil que aborda el dolor de la pérdida y el impacto emocional que produce la desaparición de una persona querida. La protagonista intenta comprender la ausencia de alguien importante mientras enfrenta recuerdos, emociones contradictorias y preguntas que parecen no tener respuesta. La peineta amarilla funciona como un símbolo cargado de significado afectivo y memoria. A lo largo de la historia se exploran temas relacionados con el duelo, la amistad, la familia y la necesidad de aprender a seguir adelante después de una experiencia traumática. La narración combina sensibilidad, cercanía y momentos profundamente emotivos que permiten al lector identificarse con las emociones de los personajes. El libro invita a reflexionar sobre la importancia de los vínculos humanos y sobre la manera en que las personas conservan la presencia de quienes ya no están.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Complicidad',
'Novela contemporánea centrada en las relaciones humanas y en los vínculos secretos que se construyen entre distintos personajes. La historia explora cómo la confianza, el deseo y las decisiones compartidas pueden unir profundamente a las personas, pero también conducirlas hacia situaciones peligrosas o moralmente ambiguas. A través de conflictos afectivos y tensiones psicológicas, la obra desarrolla una mirada compleja sobre la lealtad, la traición y las consecuencias de los actos ocultos. Los personajes deben enfrentar dilemas relacionados con la verdad y la responsabilidad, descubriendo que toda complicidad tiene un precio emocional. La narración utiliza una atmósfera cargada de suspenso y emociones intensas para construir un relato reflexivo sobre las relaciones personales y los límites éticos.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'De cómo decidí convertirse en hermano mayor',
'Libro infantil y juvenil que retrata de forma cercana y divertida las emociones de un niño que debe adaptarse a la llegada de un nuevo integrante a la familia. El protagonista experimenta celos, inseguridades y dudas frente a los cambios que implica convertirse en hermano mayor, pero poco a poco descubre el valor del cariño, la responsabilidad y la convivencia. La obra utiliza situaciones cotidianas y humorísticas para mostrar las dificultades y alegrías propias del crecimiento familiar. A través de un lenguaje sencillo y afectuoso, el relato permite reflexionar sobre las emociones infantiles y sobre la importancia de la empatía dentro del hogar. La historia transmite un mensaje positivo acerca de la aceptación de los cambios y del fortalecimiento de los vínculos familiares.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Cuentos y leyendas de Rumania',
'Recopilación de relatos tradicionales provenientes de Rumania que reúne historias populares transmitidas oralmente durante generaciones. Los cuentos presentan héroes valientes, criaturas fantásticas, brujas, espíritus y personajes enfrentados a pruebas mágicas o morales. La obra permite conocer aspectos importantes de la cultura y del imaginario popular rumano, mostrando valores relacionados con la astucia, la justicia y la perseverancia. Muchas de las narraciones poseen un tono oscuro y misterioso característico del folclore europeo oriental. Además de entretener, los relatos reflejan antiguas creencias y formas de entender el mundo, conectando al lector con tradiciones ancestrales llenas de simbolismo y fantasía.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'María',
'Clásica novela romántica latinoamericana escrita por Jorge Isaacs que narra la intensa y trágica historia de amor entre María y Efraín. Ambientada en el valle del Cauca, la obra destaca por sus descripciones detalladas de la naturaleza y por el tono profundamente emotivo de la narración. Los protagonistas viven un amor marcado por la distancia, la enfermedad y las limitaciones impuestas por la época. A través de recuerdos y sentimientos idealizados, la novela construye una atmósfera melancólica donde el amor aparece ligado al sufrimiento y a la imposibilidad. Considerada una de las obras fundamentales del romanticismo hispanoamericano, combina sensibilidad, paisaje y tragedia en un relato de gran belleza literaria.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Un artista del mundo flotante',
'Novela de Kazuo Ishiguro ambientada en el Japón posterior a la Segunda Guerra Mundial, centrada en un pintor anciano que reflexiona sobre su pasado y sobre el papel que desempeñó durante los años de expansión nacionalista. A través de recuerdos fragmentados y conversaciones familiares, el protagonista comienza a cuestionar sus antiguas convicciones y las consecuencias de sus acciones. La obra aborda temas relacionados con la culpa, la memoria, el honor y los cambios culturales que experimenta la sociedad japonesa tras la guerra. El relato posee un tono íntimo y reflexivo, donde los silencios y las dudas son tan importantes como los hechos narrados. Ishiguro construye una historia profundamente humana sobre la dificultad de enfrentar el pasado y aceptar las propias responsabilidades.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'La octava victima',
'Novela policial y de suspenso donde una serie de crímenes desconcierta a investigadores y habitantes de una ciudad marcada por el miedo. A medida que aparecen nuevas víctimas, los detectives intentan descubrir patrones ocultos y pistas que permitan identificar al responsable antes de que ocurra otro asesinato. La investigación revela secretos personales, tensiones sociales y oscuros intereses relacionados con los personajes involucrados. La obra mantiene un ritmo intenso y una atmósfera inquietante que aumenta progresivamente la tensión narrativa. El lector es llevado constantemente a dudar sobre la identidad del culpable mediante giros inesperados y revelaciones sorpresivas. La novela explora además la fragilidad humana frente al miedo y las consecuencias psicológicas de la violencia.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Platero y yo',
'Obra poética y narrativa escrita por Juan Ramón Jiménez que relata la relación entre un hombre y su burro llamado Platero en un pequeño pueblo andaluz. A través de breves capítulos llenos de sensibilidad y lirismo, el autor describe escenas cotidianas, paisajes naturales y reflexiones sobre la vida, la infancia y el paso del tiempo. Platero aparece como un compañero noble y silencioso que acompaña al narrador en sus observaciones del mundo y de las personas que habitan el pueblo. La obra combina ternura, melancolía y contemplación, convirtiéndose en una profunda meditación sobre la belleza y la fragilidad de la existencia. Considerado un clásico de la literatura en español, el libro destaca por la musicalidad y riqueza poética de su lenguaje.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El misterio de la cañada',
'Novela juvenil de suspenso y aventura donde un grupo de personajes descubre extraños acontecimientos relacionados con una apartada cañada llena de rumores y secretos. La investigación conduce a pistas ocultas, sucesos inexplicables y personajes sospechosos que parecen esconder información importante. A medida que avanza la historia, los protagonistas deberán enfrentar sus propios miedos y aprender a trabajar juntos para resolver el enigma. La obra mantiene una atmósfera intrigante mediante descripciones del paisaje y situaciones cargadas de tensión. Además del misterio principal, el relato desarrolla temas relacionados con la amistad, el coraje y la curiosidad juvenil.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Las piernas de Mariana',
'Novela contemporánea que explora las emociones, inseguridades y experiencias de Mariana, una joven que enfrenta conflictos relacionados con su cuerpo, la identidad y las relaciones humanas. La historia aborda la forma en que la apariencia física y las expectativas sociales pueden influir profundamente en la autoestima y en la percepción de uno mismo. A través de situaciones cotidianas y reflexiones personales, la protagonista intenta comprender su lugar en el mundo mientras atraviesa momentos de vulnerabilidad y crecimiento. La obra combina sensibilidad psicológica y crítica social, mostrando las presiones culturales relacionadas con la imagen y la aceptación.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Franziska, una historia de amor y trabajo',
'Novela que retrata la vida de Franziska, una mujer enfrentada a las dificultades económicas, laborales y afectivas de su tiempo. La protagonista debe equilibrar sus aspiraciones personales con las responsabilidades y limitaciones impuestas por la sociedad. A lo largo de la historia surgen relaciones amorosas complejas y experiencias de esfuerzo que muestran la lucha cotidiana por alcanzar independencia y dignidad. La obra aborda temas relacionados con el trabajo femenino, las desigualdades sociales y la búsqueda de realización personal. El relato combina momentos emotivos y reflexivos, construyendo un retrato humano de perseverancia y esperanza frente a las adversidades.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'La metamorfosis',
'Famosa novela corta de Franz Kafka que comienza cuando Gregor Samsa despierta convertido inexplicablemente en un enorme insecto. A partir de este hecho absurdo y perturbador, la obra desarrolla una profunda reflexión sobre la alienación, la incomunicación y el rechazo social. Gregor, incapaz de continuar trabajando y sosteniendo económicamente a su familia, comienza a ser visto como una carga indeseable por quienes antes dependían de él. La transformación física funciona como símbolo de la deshumanización y de la fragilidad de las relaciones humanas condicionadas por el interés y la utilidad. Kafka construye una atmósfera opresiva y angustiante que refleja la soledad y el sufrimiento del protagonista frente a un mundo incapaz de comprenderlo.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Viaje al futuro del imperio',
'Novela de ciencia ficción y aventura que transporta a los personajes hacia un futuro dominado por enormes imperios tecnológicos y conflictos relacionados con el poder. Durante el viaje, los protagonistas descubren sociedades avanzadas pero profundamente desiguales, donde la tecnología influye en todos los aspectos de la vida humana. La historia desarrolla enfrentamientos políticos, secretos científicos y dilemas éticos vinculados al control social y al progreso. A través de escenarios futuristas y situaciones de riesgo constante, la obra reflexiona sobre las consecuencias del abuso de poder y sobre el impacto que pueden tener las decisiones del presente en el destino de la humanidad.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El halcón',
'Novela de aventuras y simbolismo centrada en la figura de un halcón que representa libertad, fuerza y supervivencia. La historia sigue a personajes vinculados con la naturaleza y con experiencias de búsqueda personal que transforman profundamente sus vidas. A lo largo del relato surgen conflictos relacionados con la ambición, el miedo y la necesidad de encontrar un propósito auténtico. El ave funciona como un elemento simbólico que conecta a los personajes con sus emociones más profundas y con el deseo de superar limitaciones. La obra combina paisajes intensos, momentos de introspección y situaciones cargadas de tensión emocional.',
1
);
INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Desde el jardín',
'Novela filosófica y satírica que relata la historia de un hombre sencillo llamado Chance, cuya vida ha transcurrido casi completamente aislada del mundo exterior mientras trabaja como jardinero. Tras la muerte de la persona que lo cuidaba, Chance abandona por primera vez el lugar donde vivía y comienza a relacionarse con una sociedad sofisticada que interpreta erróneamente sus palabras simples como profundas reflexiones intelectuales. A medida que avanza la historia, el protagonista asciende inesperadamente en círculos políticos y económicos debido a los malentendidos generados por su lenguaje literal y su actitud tranquila. La obra utiliza esta situación para criticar la superficialidad de los medios de comunicación, la política y las apariencias sociales. A través de diálogos cargados de ironía, la novela reflexiona sobre el poder de la imagen pública y la facilidad con que las personas atribuyen significados complejos a ideas simples. El jardín funciona como símbolo de equilibrio, crecimiento y observación del ciclo natural de la vida. El relato mezcla humor, crítica social y reflexión existencial en una narración original y provocadora.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Hasta que volvamos a encontrarnos',
'Novela romántica e histórica que entrelaza destinos marcados por la separación, la memoria y el deseo de reencontrarse después de largos años. La historia sigue a personajes que deben enfrentar conflictos familiares, cambios políticos y profundas heridas emocionales mientras intentan conservar el vínculo que los une. A través de distintos escenarios y períodos de tiempo, la obra desarrolla temas relacionados con el amor persistente, la nostalgia y la fuerza de los recuerdos. Los protagonistas atraviesan experiencias dolorosas que transforman sus vidas y los obligan a replantear sus decisiones y prioridades. La narración combina drama sentimental con descripciones detalladas de ambientes y contextos históricos, construyendo una atmósfera intensa y emotiva. Además del romance principal, el libro explora las relaciones familiares, las pérdidas inevitables y la importancia de mantener la esperanza incluso en los momentos más difíciles. El relato destaca por su tono melancólico y por la profundidad emocional de sus personajes.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El lunático y Prometeo',
'Obra literaria que mezcla elementos de fantasía, ciencia y reflexión filosófica mediante la historia de personajes obsesionados con el conocimiento y el poder de transformar el mundo. El protagonista, conocido como el Lunático, mantiene una visión distinta de la realidad y desarrolla ideas que desafían las normas establecidas. La figura de Prometeo aparece como símbolo del deseo humano de alcanzar aquello que parece prohibido, aun cuando las consecuencias puedan ser peligrosas. La novela explora temas relacionados con la creatividad, la ambición intelectual y los límites éticos del progreso. A través de diálogos simbólicos y situaciones cargadas de tensión, la obra cuestiona la relación entre humanidad, tecnología y responsabilidad moral. El ambiente narrativo posee un tono misterioso y reflexivo que invita al lector a pensar sobre el valor del conocimiento y el precio de desafiar las reglas impuestas por la sociedad.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'La bruja',
'Novela ambientada en un contexto marcado por supersticiones, secretos y conflictos relacionados con el miedo a lo desconocido. La historia sigue a una mujer acusada de practicar brujería debido a sus conocimientos, su comportamiento independiente y los rumores que circulan en la comunidad donde vive. A medida que crece la tensión social, los personajes revelan prejuicios, ambiciones y temores profundamente arraigados. La obra explora la persecución de quienes son considerados diferentes y muestra cómo el fanatismo puede destruir vidas y relaciones. A través de una atmósfera oscura y cargada de misterio, el relato combina elementos históricos, psicológicos y sobrenaturales. Además de desarrollar situaciones de suspenso, la novela reflexiona sobre la intolerancia, el poder y la manipulación social.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Crimen en directo',
'Novela policial y de suspenso centrada en un asesinato que ocurre frente a la mirada pública y que rápidamente se convierte en un espectáculo mediático. Los investigadores deben reconstruir los hechos mientras periodistas, testigos y sospechosos generan versiones contradictorias de lo ocurrido. La obra examina la influencia de los medios de comunicación sobre la percepción de la verdad y muestra cómo el interés por el escándalo puede afectar la justicia. A medida que avanza la investigación, salen a la luz secretos personales, intereses ocultos y relaciones peligrosas entre los personajes. El relato mantiene una tensión constante mediante giros inesperados y una atmósfera de incertidumbre. Además de resolver el crimen, la novela reflexiona sobre la manipulación informativa y la fascinación social por la violencia.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El domador de leones',
'Novela de suspenso perteneciente a una serie policial donde una investigación criminal revela oscuros secretos familiares y traumas ocultos durante años. Los protagonistas deben enfrentarse a asesinatos brutales relacionados con hechos del pasado que continúan afectando a las víctimas y a quienes intentan descubrir la verdad. La historia alterna momentos de tensión psicológica con escenas de investigación detallada que muestran la complejidad de los crímenes. La obra explora temas relacionados con la violencia, el abuso, el miedo y las consecuencias emocionales del silencio. Los personajes poseen una fuerte profundidad humana y atraviesan conflictos personales mientras intentan resolver el caso. La narrativa mantiene un ritmo intenso y utiliza múltiples perspectivas para aumentar el suspenso y la intriga.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Los gritos del pasado',
'Novela policial y psicológica donde antiguos acontecimientos resurgen inesperadamente afectando la vida de diversos personajes. Un crimen sin resolver y recuerdos traumáticos comienzan a conectarse con nuevos hechos violentos, obligando a los protagonistas a enfrentar verdades que habían intentado olvidar. La investigación revela heridas emocionales profundas y relaciones familiares marcadas por el dolor y el resentimiento. La obra combina misterio, drama humano y análisis psicológico en una narración intensa y oscura. A través de escenarios fríos y atmósferas inquietantes, el relato muestra cómo el pasado puede influir poderosamente sobre el presente. La novela reflexiona sobre la culpa, la memoria y las consecuencias de ocultar secretos durante demasiado tiempo.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Las hijas del frío',
'Novela de suspenso y drama psicológico donde la desaparición y muerte de una joven desencadena una compleja investigación llena de secretos familiares y tensiones emocionales. Los personajes deben enfrentar traumas del pasado y conflictos ocultos que salen a la luz a medida que avanzan las pesquisas. La historia explora las relaciones entre padres e hijos, las presiones sociales y la fragilidad emocional de quienes viven bajo el peso del miedo y la culpa. El clima frío y los paisajes aislados contribuyen a crear una atmósfera opresiva que intensifica la sensación de peligro. La obra desarrolla múltiples líneas narrativas que se unen progresivamente hasta revelar una verdad impactante. Además del misterio criminal, la novela reflexiona sobre la vulnerabilidad humana y la dificultad de escapar del pasado.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Las huellas imborrables',
'Novela policial centrada en un caso de asesinato cuyas raíces se encuentran en experiencias traumáticas vividas años atrás. La investigación obliga a los personajes a recordar situaciones dolorosas y a confrontar secretos cuidadosamente ocultos. A medida que aparecen nuevas pistas, la historia revela vínculos familiares complejos y conflictos psicológicos profundamente marcados por la culpa y el resentimiento. La obra desarrolla una atmósfera sombría y tensa donde cada personaje parece esconder información importante. El relato combina suspenso, análisis emocional y crítica social para construir una narración intensa y atrapante. Las huellas del pasado aparecen como marcas imposibles de borrar que continúan condicionando las decisiones y emociones de quienes las cargan.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'La mirada de los ángeles',
'Novela de misterio y suspenso donde una serie de acontecimientos violentos conduce a descubrir oscuros secretos relacionados con la infancia y las relaciones familiares. Los protagonistas enfrentan investigaciones complejas mientras intentan comprender el comportamiento de personajes marcados por el trauma y el sufrimiento. La obra utiliza una narrativa intensa y psicológica para explorar temas como el miedo, la culpa y las consecuencias de la violencia emocional. El relato mantiene una atmósfera inquietante mediante escenas de gran tensión y constantes giros argumentales. A través de múltiples perspectivas, la novela construye un retrato humano de personas atrapadas entre recuerdos dolorosos y peligros presentes.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Los vigilantes del faro',
'Novela de misterio ambientada en una costa aislada donde un antiguo faro guarda secretos relacionados con desapariciones, tragedias y hechos ocurridos décadas atrás. Los protagonistas llegan al lugar impulsados por diferentes motivos y pronto descubren que la comunidad local oculta información importante sobre el pasado. El mar, las tormentas y la soledad del paisaje contribuyen a crear una atmósfera cargada de tensión y peligro. A medida que avanza la investigación, emergen conflictos familiares, antiguas rivalidades y sucesos sobrenaturales o difíciles de explicar. La obra combina aventura, suspenso y drama psicológico en una narración que mantiene el interés mediante revelaciones constantes y personajes complejos.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El último ona',
'Novela histórica inspirada en la cultura del pueblo selknam u ona de Tierra del Fuego y en las consecuencias devastadoras de la colonización sobre las comunidades originarias. La historia sigue a un personaje que presencia la desaparición progresiva de su pueblo, enfrentando violencia, discriminación y pérdida cultural. A través de paisajes australes descritos con gran detalle, la obra muestra las costumbres, creencias y formas de vida de los pueblos indígenas del extremo sur de América. El relato combina drama humano con reflexión histórica, denunciando el exterminio y la marginación sufridos por las comunidades originarias. La novela destaca la importancia de la memoria cultural y la necesidad de preservar las historias de quienes fueron silenciados.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El maravilloso viaje de Nils Holgersson',
'Relato fantástico protagonizado por Nils, un niño travieso que es reducido mágicamente de tamaño y emprende un largo viaje sobre el lomo de unos gansos salvajes a través de Suecia. Durante la travesía, el protagonista descubre paisajes, pueblos y animales mientras aprende importantes lecciones sobre la amistad, la humildad y el respeto por la naturaleza. La obra combina aventura y fantasía con descripciones geográficas y culturales del territorio sueco. A medida que avanza el viaje, Nils cambia profundamente su forma de ver el mundo y desarrolla mayor sensibilidad hacia los demás seres vivos. El libro transmite valores relacionados con la empatía, la responsabilidad y el crecimiento personal.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El secreto de la arboleda',
'Novela juvenil de misterio y aventura ambientada en una arboleda aparentemente tranquila donde comienzan a ocurrir hechos extraños. Los protagonistas descubren pistas ocultas, relatos antiguos y secretos relacionados con el lugar, lo que los lleva a involucrarse en una peligrosa investigación. La naturaleza adquiere un papel fundamental en la historia, funcionando como espacio de descubrimiento y también de amenaza. La obra desarrolla temas relacionados con la amistad, el valor y la curiosidad juvenil frente a lo desconocido. A través de una narración dinámica y atmosférica, el libro mantiene el suspenso mientras revela progresivamente los misterios ocultos entre los árboles.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Kengi y la magia de las palabras',
'Libro infantil y juvenil que destaca el poder de las palabras y de la imaginación mediante la historia de Kengi, un personaje que descubre cómo el lenguaje puede transformar la realidad y las relaciones humanas. A través de aventuras y situaciones emotivas, la obra muestra la importancia de la lectura, la comunicación y la creatividad. El protagonista enfrenta dificultades personales que logra superar gracias al apoyo de otros personajes y al descubrimiento del valor de expresarse libremente. El relato transmite mensajes relacionados con la autoestima, la empatía y el crecimiento emocional. La narración combina fantasía, humor y reflexión en una historia cercana y motivadora.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Los hombres que no amaban a las mujeres',
'Thriller policial que sigue la investigación realizada por un periodista y una experta informática sobre la desaparición de una joven perteneciente a una poderosa familia. A medida que avanzan las pesquisas, los protagonistas descubren una compleja red de violencia, corrupción y abusos ocultos durante décadas. La novela combina investigación criminal, crítica social y análisis psicológico en una narración intensa y llena de giros inesperados. La obra aborda temas relacionados con la violencia de género, el poder económico y las consecuencias del silencio frente al abuso. Los personajes principales desarrollan una relación marcada por la desconfianza inicial y la colaboración progresiva mientras enfrentan peligros crecientes. El relato mantiene un ritmo constante de tensión y suspenso hasta sus impactantes revelaciones finales.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Asesinos en Roma',
'Novela histórica y de misterio ambientada en la antigua Roma, donde una serie de asesinatos amenaza la estabilidad política y social de la ciudad. Los protagonistas deben investigar crímenes complejos mientras enfrentan conspiraciones, rivalidades y peligros relacionados con el poder imperial. La obra recrea con detalle la vida cotidiana, las costumbres y las tensiones políticas de la Roma clásica. A través de intrigas, persecuciones y secretos ocultos, el relato construye una atmósfera intensa que combina aventura e investigación policial. Además de resolver los crímenes, los personajes deben sobrevivir a un entorno marcado por la corrupción y las luchas de influencia.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El coloso de Rodas',
'Novela de aventuras ambientada en el mundo antiguo, inspirada en la famosa estatua del Coloso de Rodas y en los conflictos políticos y comerciales del Mediterráneo. Los personajes se ven involucrados en viajes peligrosos, conspiraciones y enfrentamientos relacionados con el control de importantes territorios y rutas marítimas. La obra combina elementos históricos con acción y misterio, ofreciendo una recreación detallada de culturas, ciudades y costumbres antiguas. El relato explora temas como la ambición, la lealtad y el deseo de alcanzar gloria y poder. A través de escenarios grandiosos y situaciones de constante tensión, la novela mantiene un tono épico y aventurero.',
1
);
INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Los delfines de Laurentum',
'Novela histórica y de aventuras ambientada en el Imperio Romano, donde un grupo de jóvenes se ve envuelto en misterios relacionados con desapariciones, conspiraciones y peligros ocultos cerca de la costa de Laurentum. A través de investigaciones y viajes, los protagonistas descubren secretos vinculados con personajes influyentes y conflictos políticos que amenazan sus vidas. La obra recrea con detalle la vida cotidiana en Roma, incluyendo costumbres, arquitectura y formas de organización social de la época. El mar y los delfines adquieren un valor simbólico asociado a la libertad y al descubrimiento. La narración combina suspenso, acción y aprendizaje histórico mediante una trama dinámica llena de desafíos y situaciones inesperadas. Además de las aventuras, el relato destaca la importancia de la amistad, la inteligencia y el trabajo en equipo frente al peligro.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Los doce trabajos de Flavia Gemina',
'Novela juvenil de aventuras ambientada en la antigua Roma protagonizada por Flavia Gemina y sus amigos, quienes deben enfrentar una serie de desafíos inspirados en los trabajos heroicos de la tradición clásica. Cada misión pone a prueba la valentía, la creatividad y la capacidad de cooperación de los personajes mientras investigan misterios y resuelven conflictos. La obra combina elementos históricos y educativos con acción constante y situaciones llenas de tensión. A través de sus recorridos por ciudades, templos y mercados romanos, los protagonistas descubren aspectos culturales y políticos del Imperio. El relato desarrolla valores relacionados con la lealtad, la perseverancia y la importancia de actuar con justicia. La narrativa mantiene un ritmo ágil y entretenido que acerca la historia antigua al público juvenil.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Los enemigos de Júpiter',
'Novela histórica y de misterio situada en el Imperio Romano, donde un grupo de jóvenes investigadores debe descubrir quiénes están detrás de una peligrosa conspiración relacionada con el templo de Júpiter y con figuras poderosas de la sociedad romana. La historia mezcla intrigas políticas, persecuciones y secretos religiosos que amenazan la estabilidad de la ciudad. Los protagonistas se enfrentan a enemigos ocultos y deben utilizar su ingenio para sobrevivir y resolver el misterio. La obra destaca por sus detalladas descripciones de la vida romana y por la forma en que integra hechos históricos con ficción aventurera. Además de la acción y el suspenso, el libro aborda temas relacionados con la amistad, el valor y la búsqueda de la verdad frente al abuso de poder.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El fugitivo de Corinto',
'Relato de aventuras ambientado en el mundo antiguo que sigue la huida de un personaje perseguido injustamente por autoridades y enemigos poderosos. El protagonista debe atravesar distintos territorios enfrentando peligros, traiciones y obstáculos mientras intenta demostrar su inocencia. Durante el viaje conoce aliados inesperados y descubre secretos relacionados con conflictos políticos y rivalidades personales. La ciudad de Corinto y otros escenarios del Mediterráneo clásico son descritos con riqueza histórica y cultural, aportando profundidad al relato. La obra combina acción, suspenso y reflexión sobre la justicia y la libertad. A través de una narración dinámica, el libro muestra cómo la valentía y la inteligencia pueden convertirse en herramientas fundamentales para sobrevivir.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Los gladiadores de Capua',
'Novela histórica ambientada en la ciudad romana de Capua, famosa por sus escuelas de gladiadores y espectáculos sangrientos. Los protagonistas se ven involucrados en conflictos relacionados con luchas en la arena, conspiraciones políticas y rivalidades entre distintos grupos de poder. La obra describe con intensidad el ambiente brutal y competitivo de los combates, mostrando tanto la fascinación del público como el sufrimiento de quienes participan en ellos. A través de aventuras, investigaciones y momentos de peligro constante, los personajes descubren secretos que amenazan sus vidas. El relato combina acción, misterio y reconstrucción histórica para ofrecer una visión emocionante del mundo romano. Además, reflexiona sobre la violencia, el honor y la lucha por la supervivencia.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Ladrones en el foro',
'Novela juvenil de misterio ambientada en la antigua Roma, donde una serie de robos ocurridos en el foro desencadena una investigación llena de peligros y sospechosos. Los protagonistas deben recorrer mercados, templos y calles concurridas buscando pistas que permitan descubrir a los responsables. La obra presenta una recreación detallada de la vida romana y muestra las diferencias sociales, políticas y económicas presentes en la ciudad. A medida que avanza la investigación, los personajes enfrentan amenazas crecientes y descubren secretos vinculados con figuras influyentes. La narración combina humor, suspenso y aventura, manteniendo el interés mediante constantes giros argumentales. El libro destaca la importancia de la amistad, la inteligencia y la perseverancia frente a las dificultades.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Los piratas de Pompeya',
'Relato de aventuras históricas ambientado en los alrededores de Pompeya, donde ataques piratas generan temor e inestabilidad entre comerciantes y habitantes de la región. Los protagonistas se ven envueltos en investigaciones y persecuciones marítimas mientras intentan descubrir quiénes organizan los asaltos y cuáles son sus verdaderos objetivos. La obra recrea con detalle la vida en las ciudades romanas cercanas al Vesubio y combina hechos históricos con elementos de ficción y suspenso. El relato incluye enfrentamientos, viajes y situaciones de gran tensión que mantienen un ritmo narrativo dinámico. Además de la acción, la novela explora temas relacionados con la lealtad, el coraje y la lucha contra la injusticia.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Los secretos del Vesubio',
'Novela de misterio y aventuras ambientada en la antigua Pompeya poco antes de la erupción del Vesubio. Los personajes descubren señales extrañas y secretos ocultos relacionados con conspiraciones, robos y actividades peligrosas que se desarrollan en la ciudad. A medida que investigan, el volcán comienza a manifestar signos inquietantes que aumentan la sensación de amenaza inminente. La obra mezcla hechos históricos con ficción, permitiendo conocer aspectos de la cultura romana y de la vida cotidiana en Pompeya. El relato desarrolla una atmósfera intensa y cargada de tensión, donde el peligro proviene tanto de las personas como de la naturaleza. La novela reflexiona sobre la fragilidad humana frente a fuerzas imposibles de controlar.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El lazarillo de Tormes',
'Clásica novela picaresca de la literatura española que narra la vida de Lázaro, un niño pobre que debe sobrevivir sirviendo a distintos amos en una sociedad marcada por la desigualdad y la hipocresía. A través de episodios llenos de humor, ironía y crítica social, el protagonista aprende a utilizar la astucia para enfrentar el hambre y las dificultades cotidianas. Cada amo representa distintos sectores sociales y permite mostrar las contradicciones morales de la época. La obra critica la corrupción, las falsas apariencias y la falta de compasión hacia los más vulnerables. Además de su valor literario e histórico, el relato destaca por la humanidad y cercanía de su narrador. Considerada una obra fundamental de la narrativa española, combina entretenimiento con profunda crítica social.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Sarkhan',
'Novela fantástica y de aventuras ambientada en un mundo marcado por guerras, magia y antiguas profecías. El protagonista debe enfrentar peligrosos enemigos y descubrir secretos relacionados con su origen y con el destino de su pueblo. A medida que avanza la historia, surgen alianzas inesperadas, criaturas extraordinarias y conflictos de gran escala que amenazan el equilibrio del reino. La obra desarrolla un universo complejo lleno de tradiciones, símbolos y escenarios épicos. Además de la acción y las batallas, el relato reflexiona sobre la responsabilidad, el poder y el sacrificio personal. La narración mantiene un ritmo intenso y una atmósfera de permanente descubrimiento.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Emilio y el viaje sin tesoro',
'Novela juvenil que relata la aventura de Emilio, un niño que emprende un viaje esperando encontrar riquezas materiales, pero que termina descubriendo valores mucho más importantes relacionados con la amistad, la solidaridad y el crecimiento personal. Durante el recorrido enfrenta obstáculos, conoce personajes diversos y vive experiencias que cambian su manera de comprender el mundo. La obra combina humor, emoción y reflexión en una historia cercana y entretenida. A través de paisajes y situaciones llenas de imaginación, el relato muestra cómo las verdaderas riquezas no siempre son materiales. El protagonista aprende a valorar los afectos, la honestidad y la importancia de compartir con otros.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Gil Blas de santillaña',
'Clásica novela de aventuras y crítica social que sigue la vida de Gil Blas, un joven de origen humilde que recorre distintos lugares enfrentando engaños, dificultades y situaciones inesperadas. A lo largo de sus experiencias conoce personajes pertenecientes a diversos sectores sociales, lo que permite al autor retratar las costumbres y contradicciones de la sociedad de su tiempo. La obra combina humor, ironía y observación psicológica mediante episodios llenos de ingenio y picardía. El protagonista evoluciona constantemente mientras aprende sobre ambición, amistad y supervivencia. La novela destaca por su estilo dinámico y por la riqueza de situaciones y personajes que presenta.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Las crónicas de Narnia, el príncipe Caspian',
'Novela fantástica perteneciente a la serie Las Crónicas de Narnia, donde los hermanos Pevensie regresan al mágico reino para ayudar al príncipe Caspian a recuperar el trono usurpado por fuerzas tiránicas. La historia desarrolla una lucha entre el bien y el mal en medio de bosques encantados, criaturas míticas y antiguas profecías. Los protagonistas deben unir ejércitos y enfrentar peligrosas batallas mientras descubren que Narnia ha cambiado profundamente desde su última visita. La obra mezcla aventura, fantasía y simbolismo moral en una narración emocionante y épica. A través del valor, la amistad y la esperanza, los personajes aprenden la importancia de actuar con nobleza frente a la injusticia.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Las crónicas de Narnia, el león, la bruja y el ropero',
'Primera gran aventura de la serie Las Crónicas de Narnia, donde cuatro hermanos descubren un mundo mágico escondido dentro de un ropero. En Narnia conocen criaturas fantásticas y descubren que el reino se encuentra bajo el dominio de una poderosa bruja que ha impuesto un invierno eterno. Guiados por el león Aslan, símbolo de sabiduría y valentía, los protagonistas deberán participar en una lucha decisiva para devolver la libertad al reino. La novela combina fantasía, aventura y valores relacionados con el sacrificio, la amistad y la esperanza. Los escenarios maravillosos y la presencia constante de magia convierten la historia en un clásico de la literatura juvenil.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Mientras no tengamos rostro',
'Novela inspirada en mitos clásicos que explora temas relacionados con el amor, los celos, la fe y la identidad personal. La historia se centra en una mujer marcada por la inseguridad y el resentimiento hacia su hermana, cuya belleza y relación con fuerzas divinas generan profundas tensiones emocionales. A través de una narración introspectiva y filosófica, la obra reflexiona sobre la naturaleza del sufrimiento humano y sobre la dificultad de comprender aquello que trasciende la razón. Los personajes enfrentan conflictos espirituales y emocionales complejos que transforman profundamente sus vidas. El relato mezcla elementos míticos con análisis psicológico y moral.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El diario violeta de Carlota',
'Novela juvenil en formato de diario donde Carlota reflexiona sobre temas relacionados con la igualdad de género, las relaciones afectivas y las experiencias cotidianas de las mujeres. A través de situaciones cercanas y conversaciones con familiares y amigos, la protagonista comienza a cuestionar conductas discriminatorias y estereotipos presentes en la sociedad. El libro combina humor, reflexión y crítica social mediante un lenguaje accesible y directo. La obra invita a pensar sobre la importancia del respeto, la libertad y la construcción de relaciones más justas. Además de abordar problemas sociales, el relato muestra el crecimiento personal y emocional de Carlota.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El diario azul de Carlota',
'Continuación de las reflexiones de Carlota, esta vez enfocadas en temas relacionados con la sexualidad, el afecto y las relaciones humanas durante la adolescencia. A través de conversaciones, experiencias personales y dudas propias de la edad, la protagonista intenta comprender mejor el mundo emocional y corporal que la rodea. La obra aborda estos temas de manera educativa y cercana, promoviendo el respeto, la comunicación y la responsabilidad afectiva. El formato de diario permite construir una voz íntima y auténtica que facilita la identificación de los lectores jóvenes con la protagonista. Además de informar, el libro busca fomentar la reflexión crítica y el autoconocimiento.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Cañuela y Petaca',
'Relato infantil y humorístico protagonizado por personajes entrañables que viven aventuras llenas de imaginación y situaciones divertidas. La historia desarrolla vínculos de amistad y compañerismo mientras los protagonistas enfrentan pequeños conflictos cotidianos y desafíos inesperados. A través de juegos, travesuras y aprendizajes, la obra transmite valores relacionados con la solidaridad, la empatía y la creatividad. El lenguaje sencillo y dinámico permite acercar la lectura a niños y jóvenes mediante escenas entretenidas y emotivas. El relato destaca la importancia de compartir experiencias y aprender de los demás.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Sub sole/El hallazgo',
'Recopilación de cuentos donde predominan situaciones cargadas de tensión psicológica, crítica social y observación de la naturaleza humana. Las historias presentan personajes enfrentados a conflictos relacionados con la pobreza, la ambición, el destino y las contradicciones morales de la sociedad. El relato “El hallazgo” destaca por desarrollar una situación aparentemente simple que termina revelando profundas consecuencias humanas y emocionales. La obra utiliza descripciones precisas y ambientes intensos para construir narraciones breves pero impactantes. A través de distintos personajes y escenarios, los cuentos muestran la complejidad de las relaciones humanas y las desigualdades sociales.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Sub sole',
'Colección de cuentos del escritor Baldomero Lillo que retrata con fuerza y sensibilidad distintos aspectos de la vida popular chilena. Las historias abordan conflictos humanos relacionados con la pobreza, el trabajo, la injusticia y las dificultades cotidianas enfrentadas por personas humildes. La obra destaca por su mirada crítica hacia las desigualdades sociales y por la profundidad psicológica de sus personajes. A través de relatos breves pero intensos, el autor muestra ambientes rurales y urbanos marcados por la lucha por sobrevivir. El lenguaje preciso y las descripciones detalladas contribuyen a crear una atmósfera realista y emotiva. Considerado un importante exponente del realismo social chileno, el libro combina denuncia, humanidad y gran calidad literaria.',
1
);
INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Sub terra',
'Clásica colección de cuentos de Baldomero Lillo centrada en la dura realidad de los trabajadores de las minas de carbón en Chile. A través de relatos intensos y profundamente humanos, el autor denuncia las condiciones de explotación, pobreza y sufrimiento que enfrentaban los mineros y sus familias. Los personajes viven atrapados entre la necesidad económica y el peligro constante de un trabajo brutal que consume sus cuerpos y esperanzas. La obra utiliza un estilo realista y descriptivo para retratar la oscuridad física y emocional del mundo subterráneo. Además de la crítica social, los cuentos exploran temas como la solidaridad, la desesperación y la dignidad humana frente a la injusticia. Considerado uno de los textos más importantes de la literatura chilena, el libro combina fuerza narrativa y compromiso social.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Papá por un dia',
'Novela infantil y juvenil que relata las divertidas y complicadas experiencias de un personaje que debe asumir inesperadamente responsabilidades propias de un adulto y actuar como padre durante un día. A través de situaciones humorísticas y caóticas, el protagonista descubre lo difícil que resulta cuidar a otros y tomar decisiones importantes. La obra desarrolla temas relacionados con la familia, la empatía y el valor del esfuerzo cotidiano que realizan los adultos. Mediante escenas cercanas y entretenidas, el relato permite reflexionar sobre la convivencia familiar y la importancia de colaborar en el hogar. El lenguaje sencillo y dinámico hace que la historia resulte accesible y entretenida para lectores jóvenes.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Gaspar,el pastor de liebres',
'Relato de carácter rural y reflexivo centrado en la vida de Gaspar, un joven pastor que mantiene una profunda conexión con la naturaleza y con los animales que cuida. A través de sus experiencias cotidianas, la obra muestra la tranquilidad y las dificultades propias de la vida en el campo, así como los aprendizajes que surgen de la observación y del trabajo constante. El protagonista enfrenta conflictos relacionados con el crecimiento personal, la soledad y la necesidad de encontrar su propio camino. La narración utiliza descripciones detalladas de paisajes y ambientes naturales para construir una atmósfera serena y contemplativa. Además de retratar el mundo rural, el libro reflexiona sobre la libertad, la responsabilidad y la relación entre los seres humanos y la naturaleza.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El fantasma de palacio',
'Novela juvenil de misterio y humor ambientada en un antiguo palacio donde comienzan a ocurrir hechos extraños relacionados con la supuesta aparición de un fantasma. Los protagonistas investigan los sucesos mientras recorren pasillos secretos, habitaciones abandonadas y rincones llenos de historia. A medida que avanzan las pesquisas, descubren secretos familiares y acontecimientos ocultos durante años. La obra mezcla suspenso y situaciones cómicas, manteniendo una atmósfera intrigante pero entretenida para lectores jóvenes. Además del misterio principal, el relato aborda temas relacionados con la amistad, el valor y la importancia de enfrentar los propios miedos.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Ingo y Drago',
'Novela fantástica y juvenil que sigue las aventuras de Ingo y Drago, dos personajes unidos por una amistad marcada por la imaginación, los desafíos y el descubrimiento de mundos extraordinarios. La historia desarrolla un universo lleno de criaturas fantásticas, lugares misteriosos y situaciones de peligro que obligan a los protagonistas a demostrar valentía y lealtad. A lo largo de la narración, ambos personajes aprenden a confiar el uno en el otro y a enfrentar sus propios miedos. La obra combina acción, humor y fantasía en un relato dinámico y emocionante. Además de entretener, transmite valores relacionados con la cooperación, la perseverancia y la importancia de creer en uno mismo.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'La nariz de Moritz',
'Relato infantil y humorístico centrado en Moritz, un personaje cuya nariz se convierte en motivo de situaciones extrañas, divertidas y a veces problemáticas. A través de acontecimientos llenos de imaginación, la obra aborda temas relacionados con la aceptación personal, la autoestima y la importancia de valorar las diferencias individuales. El protagonista enfrenta burlas, inseguridades y desafíos que lo llevan a descubrir que aquello que parecía un defecto puede transformarse en algo especial. El relato utiliza humor y fantasía para transmitir un mensaje positivo sobre la identidad y el respeto hacia los demás.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Colmillo blanco',
'Clásica novela de Jack London que narra la vida de un lobo salvaje criado en condiciones extremas durante la fiebre del oro en el norte de América. La historia sigue el proceso de adaptación del animal a distintos entornos y a las complejas relaciones con los seres humanos. Colmillo Blanco experimenta violencia, crueldad y supervivencia en un mundo hostil donde la ley más fuerte parece dominarlo todo. Sin embargo, también descubre el afecto y la confianza gracias al vínculo que desarrolla con personas capaces de tratarlo con respeto. La obra combina aventura y reflexión sobre la naturaleza humana y animal, mostrando cómo el entorno influye profundamente en el comportamiento. El relato destaca por sus descripciones intensas de la vida salvaje y por la profundidad emocional con que construye la evolución del protagonista.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El llamado de la selva',
'Novela de aventuras escrita por Jack London que cuenta la transformación de Buck, un perro doméstico que es arrancado de su vida tranquila y llevado al duro territorio del norte durante la fiebre del oro. Obligado a sobrevivir en condiciones extremas, Buck descubre progresivamente sus instintos más salvajes y aprende las reglas de un entorno brutal donde solo sobreviven los más fuertes. La obra explora la relación entre civilización y naturaleza, mostrando cómo el protagonista responde al “llamado” de sus orígenes salvajes. A través de enfrentamientos, viajes y experiencias de supervivencia, el relato desarrolla una intensa reflexión sobre la adaptación y la libertad. Las descripciones de paisajes helados y de la vida en la naturaleza contribuyen a crear una atmósfera poderosa y emocionante.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Mi ángel de la guarda',
'Novela juvenil y emotiva que aborda la presencia simbólica de un “ángel de la guarda” como representación de la protección, la esperanza y el acompañamiento en momentos difíciles. El protagonista atraviesa experiencias dolorosas relacionadas con la soledad, el miedo y las decisiones importantes que debe tomar durante su crecimiento personal. A través de encuentros y situaciones significativas, descubre que siempre existen personas y recuerdos capaces de brindar apoyo y fortaleza. La obra mezcla elementos cotidianos con una atmósfera sensible y reflexiva que invita a pensar sobre el afecto, la espiritualidad y la importancia de confiar en uno mismo. El relato transmite un mensaje positivo sobre la resiliencia y el valor de los vínculos humanos.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Cielo rojo',
'Novela de suspenso y drama ambientada en un contexto marcado por la violencia, el peligro y las tensiones emocionales entre los personajes. El “cielo rojo” funciona como símbolo de amenaza, conflicto y transformación, acompañando una historia llena de secretos y decisiones difíciles. Los protagonistas deben enfrentar situaciones extremas que ponen a prueba su valentía y su capacidad para confiar en los demás. La obra combina acción, misterio y reflexión sobre las consecuencias del odio, la ambición y la venganza. A través de escenarios intensos y una atmósfera inquietante, la narración mantiene constante tensión emocional y narrativa.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Te cuento y te canto. Fábulas, cuentos, teatro y poesía',
'Antología literaria destinada al público infantil y juvenil que reúne distintos tipos de textos como fábulas, cuentos, poemas y pequeñas obras teatrales. La obra busca acercar a los lectores a la diversidad de géneros literarios mediante relatos entretenidos, personajes imaginativos y situaciones cargadas de humor y enseñanza. Las fábulas presentan moralejas relacionadas con valores como la honestidad, la amistad y la solidaridad, mientras los poemas y canciones desarrollan el gusto por el ritmo y la creatividad. El teatro permite explorar la expresión oral y el trabajo colectivo. El libro combina entretenimiento y aprendizaje en una propuesta variada y dinámica que estimula la imaginación y el interés por la lectura.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'León, el africano',
'Novela histórica inspirada en la vida de Hasan al-Wazzan, conocido como León el Africano, un viajero y erudito musulmán del siglo XVI. La obra relata sus recorridos por ciudades de África, Europa y Medio Oriente en una época marcada por conflictos religiosos, intercambios culturales y transformaciones políticas. A través de sus viajes, el protagonista conoce distintas culturas y enfrenta experiencias que moldean profundamente su identidad. El relato combina aventura, historia y reflexión sobre la tolerancia, el conocimiento y el encuentro entre civilizaciones. Las descripciones detalladas de paisajes, ciudades y costumbres construyen un universo rico y fascinante que permite comprender la diversidad del mundo mediterráneo de la época.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Camilon .comilon',
'Libro infantil protagonizado por Camilón, un personaje simpático y glotón que emprende un recorrido buscando comida y compartiendo con distintos animales y personajes. A través de situaciones divertidas y repetitivas, el relato desarrolla una historia sencilla pero llena de humor y ritmo narrativo. La obra destaca la importancia de compartir, colaborar y disfrutar de la amistad. El lenguaje accesible y las escenas entretenidas convierten el libro en una lectura ideal para niños pequeños. Además de divertir, la historia transmite valores relacionados con la generosidad y la convivencia.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Don Casmurro',
'Clásica novela de Machado de Assis que relata la vida de Bento Santiago, conocido como Don Casmurro, un hombre que reconstruye su pasado intentando comprender las dudas y celos que marcaron su matrimonio con Capitu. A través de recuerdos subjetivos y reflexiones personales, el protagonista analiza acontecimientos de su juventud y cuestiona constantemente la fidelidad de su esposa. La obra explora la fragilidad de la memoria y la dificultad de distinguir entre realidad e interpretación emocional. Con una narrativa sofisticada e irónica, la novela profundiza en temas como el amor, la inseguridad, la obsesión y el paso del tiempo. Considerada una de las grandes obras de la literatura brasileña, combina análisis psicológico y crítica social de manera brillante.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El domador de mostruos',
'Novela infantil y fantástica que sigue las aventuras de un joven personaje especializado en enfrentar y domesticar criaturas monstruosas que atemorizan distintos lugares y personas. A través de situaciones llenas de humor, peligro y acción, el protagonista aprende que muchos monstruos esconden miedos y tristezas detrás de su apariencia aterradora. La obra combina imaginación, escenas dinámicas y personajes extravagantes para construir una historia entretenida y accesible para lectores jóvenes. Durante el relato se desarrollan valores como la valentía, la empatía y la importancia de comprender antes de juzgar. El libro utiliza escenarios fantásticos y desafíos constantes para mantener la tensión narrativa mientras transmite un mensaje positivo sobre la amistad y la superación de los temores.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El hijo del pirata',
'Relato de aventuras ambientado en un mundo de barcos, tesoros escondidos y peligros marítimos. El protagonista, hijo de un famoso pirata, debe enfrentarse a las expectativas heredadas de su familia mientras busca descubrir su propia identidad y destino. A lo largo del viaje aparecen enemigos, tormentas y misterios relacionados con mapas secretos y antiguas leyendas del mar. La novela mezcla acción, exploración y crecimiento personal mediante una narración ágil y entretenida. Además de las aventuras, el libro reflexiona sobre la lealtad, la libertad y las decisiones que determinan quiénes somos realmente.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Judy Moody está de mal humor',
'Divertida novela infantil protagonizada por Judy Moody, una niña imaginativa y temperamental que atraviesa uno de sus famosos cambios de ánimo. Durante la historia, Judy enfrenta problemas escolares, situaciones familiares y pequeños conflictos cotidianos que parecen empeorar su humor. Sin embargo, a medida que avanza el relato, descubre maneras de comprender sus emociones y relacionarse mejor con quienes la rodean. El libro utiliza humor, lenguaje cercano y situaciones reconocibles para retratar las emociones infantiles de manera entretenida y auténtica. La obra transmite mensajes relacionados con la amistad, la autoestima y la importancia de expresar los sentimientos.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Judy Moody es doctora',
'Nueva aventura de Judy Moody en la que la protagonista se obsesiona con el mundo de la medicina y decide convertirse en una especie de “doctora” improvisada. La niña aplica sus propias teorías y tratamientos en situaciones cotidianas, generando momentos muy cómicos y desastrosos. Mientras intenta ayudar a quienes la rodean, Judy aprende sobre la responsabilidad, la paciencia y la importancia de escuchar a los demás. El relato combina humor y aprendizaje emocional mediante un estilo dinámico y cercano al público infantil. La obra destaca por retratar con autenticidad la imaginación y energía de su protagonista.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Judy Moody salva el planeta',
'En esta aventura, Judy Moody se interesa profundamente por el cuidado del medio ambiente y decide emprender acciones para “salvar el planeta”. Motivada por ideas ecológicas y campañas ambientales, intenta cambiar hábitos en su hogar, escuela y comunidad. Aunque sus planes suelen resultar exagerados o caóticos, la protagonista logra generar conciencia sobre la importancia de proteger la naturaleza. El libro combina humor y reflexión ecológica mediante situaciones divertidas y mensajes accesibles para lectores jóvenes. Además de entretener, la obra promueve valores relacionados con la responsabilidad ambiental y la participación activa.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Judy Moody se vuelve famosa',
'Novela infantil donde Judy Moody sueña con convertirse en una persona famosa y admirada por todos. Convencida de que necesita destacar de alguna manera, emprende distintas ideas y proyectos extravagantes que terminan provocando situaciones inesperadas y muy divertidas. A medida que busca reconocimiento, la protagonista descubre que la verdadera importancia está en la autenticidad y en las relaciones con quienes realmente la aprecian. La obra combina humor y reflexión sobre la autoestima, la popularidad y la identidad personal. El estilo ligero y dinámico hace que la historia resulte entretenida y cercana para el público juvenil.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El secuestro de la bibliotecaria',
'Divertida novela infantil que comienza cuando una bibliotecaria es secuestrada por un grupo de bandidos que esperan obtener algún beneficio económico. Sin embargo, la mujer logra transformar la situación utilizando su inteligencia, sus conocimientos y el poder de la lectura para influir en los secuestradores. A medida que avanza la historia, los delincuentes descubren el valor de los libros y experimentan importantes cambios personales. La obra utiliza humor y situaciones absurdas para promover el amor por la lectura y la educación. El relato destaca la importancia de la cultura, la empatía y la imaginación como herramientas capaces de transformar a las personas.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Mujeres alteradas 5',
'Quinta entrega de la reconocida serie de historietas de Maitena, centrada en retratar con humor e ironía las contradicciones, inseguridades y experiencias cotidianas de las mujeres contemporáneas. A través de viñetas breves y situaciones exageradas, la autora aborda temas relacionados con las relaciones amorosas, el trabajo, la maternidad, el cuerpo y las presiones sociales. La obra combina crítica social y comedia mediante personajes cercanos y reconocibles para distintos lectores. El tono irreverente y satírico permite reflexionar sobre los estereotipos y expectativas que afectan la vida cotidiana. El libro destaca por su capacidad para transformar experiencias comunes en relatos humorísticos llenos de ingenio.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'La declaración',
'Novela distópica ambientada en un futuro donde la longevidad humana y el control social han transformado radicalmente la sociedad. En este mundo, los niños son considerados ilegales debido a estrictas políticas de población, y quienes nacen fuera de las normas son perseguidos y marginados. La protagonista debe enfrentarse a un sistema opresivo mientras descubre secretos relacionados con su origen y con las verdaderas intenciones del gobierno. La obra mezcla suspenso, ciencia ficción y crítica social mediante una narrativa intensa y emocional. El relato reflexiona sobre la libertad, la identidad y el valor de la vida humana frente a estructuras autoritarias.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'En familia',
'Novela que explora las relaciones familiares a través de conflictos cotidianos, afectos complejos y diferencias generacionales entre sus personajes. La historia muestra cómo la convivencia obliga a enfrentar tensiones, malentendidos y emociones acumuladas durante años. A medida que avanza el relato, cada integrante de la familia revela sus deseos, frustraciones y necesidades afectivas. La obra combina momentos emotivos y reflexivos con situaciones cercanas a la experiencia cotidiana. El libro destaca la importancia del diálogo, la comprensión y los vínculos familiares como espacios de crecimiento y apoyo.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Familias familiares',
'Libro orientado al público infantil y juvenil que presenta distintos modelos y experiencias de familia mediante relatos, reflexiones y situaciones cotidianas. La obra busca mostrar la diversidad familiar existente en la sociedad y destacar que el afecto y el cuidado son más importantes que cualquier estructura tradicional. A través de historias cercanas y personajes variados, el libro invita a valorar la convivencia, el respeto y la comprensión mutua. El tono accesible y positivo facilita la reflexión sobre la identidad y la pertenencia. La obra promueve valores relacionados con la inclusión y la aceptación de las diferencias.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'La muerte en Venecia',
'Novela corta de Thomas Mann que relata la obsesión de Gustav von Aschenbach, un escritor maduro que viaja a Venecia buscando descanso e inspiración. Durante su estadía queda fascinado por la belleza de un joven llamado Tadzio, iniciando una profunda crisis emocional y existencial. Mientras la ciudad enfrenta una epidemia oculta de cólera, el protagonista se hunde progresivamente en la decadencia física y psicológica. La obra explora temas relacionados con el deseo, la belleza, la obsesión y el conflicto entre razón y pasión. Mediante una atmósfera refinada y melancólica, el relato reflexiona sobre la fragilidad humana y la inevitabilidad de la muerte.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Las batallas por la Alameda',
'Libro de crónica y análisis social centrado en las movilizaciones estudiantiles y los conflictos políticos ocurridos en Chile durante las últimas décadas. La obra examina las demandas relacionadas con la educación, las desigualdades sociales y el papel de los movimientos juveniles en la transformación del país. A través de testimonios, reflexiones y reconstrucciones históricas, el texto muestra cómo la Alameda de Santiago se convirtió en símbolo de protesta y participación ciudadana. El libro combina periodismo, memoria histórica y análisis político para comprender las tensiones entre ciudadanía y poder. La obra destaca la importancia de la movilización social y del debate democrático en la construcción de cambios colectivos.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El diario rojo de Flanagan',
'Novela juvenil escrita en formato de diario que aborda temas relacionados con la sexualidad, las relaciones afectivas y las dudas propias de la adolescencia. El protagonista reflexiona sobre sus experiencias personales y las de quienes lo rodean mediante conversaciones directas y situaciones cercanas a la realidad juvenil. La obra utiliza humor y lenguaje accesible para tratar asuntos que suelen resultar complejos o incómodos. Además de entretener, el libro busca informar y fomentar el diálogo sobre identidad, emociones y responsabilidad afectiva. El tono sincero y desenfadado convierte la historia en una lectura provocadora y reflexiva.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Nicolino',
'Relato infantil protagonizado por Nicolino, un niño curioso y sensible que enfrenta distintas situaciones relacionadas con la amistad, la escuela y la vida cotidiana. A través de experiencias sencillas pero significativas, el protagonista aprende sobre la importancia de la empatía, la honestidad y el respeto hacia los demás. La obra combina humor y ternura mediante un lenguaje cercano y accesible para lectores jóvenes. Las aventuras y dificultades de Nicolino permiten reflexionar sobre el crecimiento personal y las emociones infantiles.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'La noche de los muertos',
'Novela de misterio y terror ambientada durante una inquietante noche en la que sucesos extraños comienzan a alterar la tranquilidad de los personajes. Apariciones, leyendas y secretos del pasado resurgen mientras los protagonistas intentan comprender lo que ocurre antes de que sea demasiado tarde. La obra construye una atmósfera oscura y tensa mediante escenarios sombríos y situaciones de suspenso constante. Además del terror, el relato explora el miedo, la culpa y las consecuencias de acciones ocultas durante años. La historia mantiene una sensación de peligro permanente que atrapa al lector hasta el desenlace.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Pecado perfecto',
'Thriller psicológico centrado en un crimen aparentemente impecable y en las complejas consecuencias emocionales que provoca entre los involucrados. La trama desarrolla una serie de secretos, engaños y sospechas que dificultan descubrir la verdad detrás de los hechos. Los personajes enfrentan conflictos morales y situaciones extremas que revelan sus ambiciones, miedos y contradicciones internas. La obra combina suspenso, tensión narrativa y análisis psicológico mediante giros inesperados y una atmósfera inquietante. El relato reflexiona sobre la culpa, la obsesión y la fragilidad de las apariencias.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'No pidas sardinas fuera de temporada',
'Novela juvenil de misterio protagonizada por un grupo de jóvenes investigadores que se ven envueltos en un caso lleno de pistas confusas, personajes sospechosos y situaciones inesperadas. A medida que intentan resolver el enigma, los protagonistas descubren secretos ocultos y enfrentan peligros que ponen a prueba su inteligencia y valentía. La obra mezcla humor, aventura y suspenso en una narración dinámica y entretenida. El relato destaca la importancia del trabajo en equipo, la observación y la perseverancia frente a los desafíos.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'La liga del tiburón',
'Novela de aventuras y acción centrada en un grupo de personajes vinculados a una peligrosa organización conocida como “La liga del tiburón”. La historia desarrolla persecuciones, conspiraciones y enfrentamientos en distintos escenarios llenos de tensión. Los protagonistas deben descubrir secretos ocultos y sobrevivir a enemigos poderosos mientras intentan evitar una amenaza mayor. La obra combina suspenso y aventura mediante un ritmo narrativo rápido y escenas llenas de emoción. El relato explora temas relacionados con el poder, la ambición y la importancia de la lealtad.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Quimaira',
'Novela fantástica inspirada en criaturas mitológicas y mundos imaginarios donde la magia y el peligro forman parte de la vida cotidiana. El protagonista se enfrenta a fuerzas misteriosas y enemigos poderosos mientras intenta comprender su propio destino. La obra desarrolla un universo lleno de símbolos, secretos y desafíos que exigen valentía e inteligencia. A través de aventuras intensas y escenarios fantásticos, el relato reflexiona sobre la identidad, el poder y la lucha entre el bien y el mal. El libro destaca por su atmósfera misteriosa y su riqueza imaginativa.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Voces griegas',
'Antología o recopilación inspirada en la cultura y literatura de la antigua Grecia, donde distintas voces narrativas presentan mitos, reflexiones y experiencias relacionadas con héroes, dioses y personajes históricos. La obra permite acercarse al pensamiento clásico y a las historias fundamentales de la tradición occidental. A través de relatos variados, se exploran temas universales como el destino, el honor, la guerra y el amor. El libro combina valor literario e histórico mediante un lenguaje accesible y evocador.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Capitanes de plástico',
'Novela juvenil que combina humor y crítica social mediante la historia de personajes que juegan a ser héroes o líderes en un entorno marcado por las apariencias y la superficialidad. El relato muestra cómo los protagonistas enfrentan conflictos personales y sociales mientras intentan encontrar su verdadero lugar en el mundo. A través de situaciones irónicas y emotivas, la obra reflexiona sobre la autenticidad, la amistad y las expectativas impuestas por la sociedad. El tono cercano y dinámico permite conectar fácilmente con el público joven.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Siri y Mateo',
'Relato juvenil centrado en la relación entre Siri y Mateo, dos personajes que desarrollan una amistad profunda mientras enfrentan cambios personales y desafíos emocionales. La historia explora la importancia del apoyo mutuo, la confianza y la comunicación en momentos difíciles. A través de experiencias cotidianas y situaciones emotivas, los protagonistas descubren nuevas formas de comprenderse a sí mismos y a quienes los rodean. La obra combina sensibilidad y cercanía en una narración accesible y reflexiva.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Sublimaciones a orillas del atardecer',
'Obra de carácter poético y reflexivo que reúne textos centrados en las emociones humanas, la contemplación y el paso del tiempo. Mediante imágenes evocadoras y un lenguaje cuidado, el autor explora temas relacionados con la memoria, el amor, la melancolía y la búsqueda interior. El “atardecer” funciona como símbolo de transformación y reflexión existencial. La obra destaca por su sensibilidad literaria y por la capacidad de construir atmósferas íntimas y profundas.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Bel Ami',
'Clásica novela de Guy de Maupassant que narra el ascenso social de Georges Duroy, un hombre ambicioso y seductor que utiliza sus relaciones personales para avanzar en la sociedad parisina del siglo XIX. A través del periodismo, la manipulación y los vínculos amorosos, el protagonista logra obtener riqueza y prestigio mientras revela las hipocresías de la alta sociedad. La obra critica la corrupción moral, el oportunismo y el poder de las apariencias en un mundo dominado por el interés personal. Con una narrativa ágil e irónica, el relato ofrece un retrato profundo de la ambición y del egoísmo humano.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Bola de sebo y otros cuentos',
'Colección de relatos de Guy de Maupassant que retrata con ironía y realismo distintos aspectos de la sociedad francesa del siglo XIX. El cuento principal, “Bola de sebo”, presenta a un grupo de viajeros cuyas actitudes egoístas y prejuicios quedan expuestos durante un viaje marcado por la guerra y la tensión moral. Los demás relatos exploran temas relacionados con el amor, la ambición, la hipocresía y las desigualdades sociales. La obra destaca por la precisión psicológica de sus personajes y por la capacidad del autor para construir críticas sociales mediante historias breves e intensas.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'La señorita Perla, el horla y otros cuentos',
'Antología de cuentos de Guy de Maupassant que reúne relatos de misterio, terror psicológico y análisis social. Entre ellos destaca “El Horla”, historia inquietante sobre un hombre que comienza a sentir la presencia de una entidad invisible que amenaza su cordura. Los cuentos exploran la locura, el miedo, la obsesión y las tensiones ocultas bajo la vida cotidiana. Mediante una narrativa precisa y atmosférica, el autor construye relatos cargados de suspenso y profundidad psicológica. La obra es considerada fundamental dentro del cuento fantástico y del terror moderno.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Moby dick',
'Gran novela de Herman Melville centrada en la obsesiva persecución de la gigantesca ballena blanca Moby Dick por parte del capitán Ahab. La historia es narrada por Ismael, marinero que se embarca en el Pequod sin imaginar el peligroso viaje que emprenderá junto a una tripulación diversa y compleja. A medida que la obsesión de Ahab crece, el viaje se transforma en una reflexión sobre el destino, la locura, el poder de la naturaleza y los límites del ser humano. La obra combina aventura marítima, filosofía y simbolismo en una narración monumental. Las descripciones del océano y de la vida en el barco crean una atmósfera intensa y profundamente épica.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'En la otra Orilla',
'Novela de carácter introspectivo y emotivo que aborda el tránsito entre distintas etapas de la vida y las experiencias que transforman profundamente a los personajes. “La otra orilla” funciona como metáfora del cambio, la esperanza y el descubrimiento personal. A través de encuentros, pérdidas y viajes interiores, la obra reflexiona sobre la memoria, la identidad y el sentido de pertenencia. El relato combina sensibilidad emocional y descripciones evocadoras en una narración serena y reflexiva.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Al y Oli dos vampiros sin dientes',
'Divertida novela infantil protagonizada por Al y Oli, dos pequeños vampiros que, a diferencia de los demás, no tienen dientes y por lo tanto no pueden comportarse como verdaderos monstruos. Esta peculiaridad los convierte en motivo de burlas y problemas dentro de su comunidad, pero también los impulsa a vivir aventuras inesperadas. A través de situaciones cómicas y llenas de imaginación, la obra transmite mensajes relacionados con la aceptación de las diferencias y la importancia de ser uno mismo. El tono humorístico y fantástico hace que la historia resulte entretenida y cercana para lectores jóvenes.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Brujas en el bosque',
'Novela infantil y fantástica ambientada en un misterioso bosque habitado por brujas, criaturas mágicas y secretos ocultos. Los protagonistas deben internarse en este lugar lleno de peligros y encantamientos para resolver un conflicto que amenaza su tranquilidad. La obra combina aventura, humor y suspenso mediante escenarios oscuros y personajes extravagantes. Además de entretener, el relato reflexiona sobre la valentía, la amistad y la necesidad de enfrentar los propios miedos.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Este duende es una ruina',
'Relato infantil humorístico centrado en un duende travieso que provoca desastres y situaciones absurdas allí donde aparece. Aunque sus intenciones no siempre son malas, sus acciones generan constantes problemas para quienes lo rodean. A través de aventuras cómicas y caóticas, la obra desarrolla temas relacionados con la responsabilidad, la convivencia y la importancia de aprender de los errores. El lenguaje dinámico y el tono alegre convierten el libro en una lectura entretenida para niños y niñas.',
1
);
INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El monstruo del arroyo',
'Novela infantil de misterio y aventura centrada en la aparición de una extraña criatura que habita cerca de un arroyo y provoca temor entre los habitantes de una pequeña comunidad. Los protagonistas, impulsados por la curiosidad y el deseo de descubrir la verdad, comienzan una investigación que los lleva a explorar bosques, cuevas y lugares abandonados. A medida que avanzan, descubren que muchas veces los rumores y el miedo exageran la realidad. La obra combina humor, suspenso y momentos de tensión en una narración entretenida y dinámica. Además de las aventuras, el relato desarrolla valores relacionados con la amistad, el trabajo en equipo y la importancia de enfrentar los prejuicios. El ambiente natural y las descripciones del entorno contribuyen a crear una atmósfera misteriosa y atractiva para lectores jóvenes.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Pupi y el monstruo de la vergüenza',
'Historia infantil protagonizada por Pupi, un personaje curioso y divertido que debe enfrentar el “monstruo de la vergüenza”, representación simbólica de los temores e inseguridades que sienten muchos niños. A través de situaciones escolares y familiares, el protagonista descubre cómo superar la timidez y expresar lo que realmente siente. El libro utiliza humor y fantasía para abordar emociones complejas de manera cercana y comprensible. La obra transmite mensajes relacionados con la autoestima, la confianza personal y la importancia de aceptar las propias emociones. El relato mantiene un tono alegre y educativo que facilita la identificación de los lectores con las experiencias de los personajes.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Pupi y el cabeza hueca',
'Nueva aventura de Pupi donde el protagonista conoce a un personaje apodado “cabeza hueca”, generando una serie de situaciones cómicas y reflexivas sobre la inteligencia, las apariencias y el respeto hacia los demás. A medida que se desarrolla la historia, los personajes aprenden que cada persona posee distintas capacidades y talentos. La obra mezcla humor, imaginación y enseñanzas emocionales mediante un lenguaje accesible y dinámico. Además de entretener, el libro promueve valores relacionados con la empatía, la amistad y la aceptación de las diferencias.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Pupi y el club de los dinosaurios',
'Relato infantil donde Pupi y sus amigos forman un club dedicado a investigar y aprender sobre dinosaurios, combinando imaginación y aventuras cotidianas. El entusiasmo de los personajes los lleva a vivir situaciones inesperadas y divertidas mientras intentan descubrir fósiles, resolver misterios y compartir conocimientos. La obra utiliza el interés por la paleontología como punto de partida para estimular la curiosidad y el aprendizaje. El relato transmite valores relacionados con la amistad, la cooperación y el amor por el conocimiento.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Pupi y los fantasmas',
'Novela infantil de humor y misterio protagonizada por Pupi, quien comienza a sospechar que fantasmas y fenómenos extraños están ocurriendo a su alrededor. Las investigaciones del protagonista y sus amigos provocan situaciones absurdas y entretenidas donde el miedo se mezcla constantemente con la comedia. A medida que intentan descubrir la verdad, aprenden a diferenciar entre imaginación y realidad. El libro aborda temas relacionados con los temores infantiles y la importancia de enfrentarlos con valentía y humor.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Pupi y la aventura de los cowboys',
'En esta aventura, Pupi y sus amigos se ven envueltos en una historia inspirada en el lejano oeste, con cowboys, persecuciones y desafíos propios de las películas de vaqueros. A través de juegos e imaginación, los personajes viven experiencias llenas de acción y humor mientras aprenden sobre compañerismo y valentía. La obra mezcla fantasía y situaciones cotidianas en una narración entretenida y dinámica dirigida al público infantil.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Quiero un hermanito',
'Relato infantil que explora los deseos, emociones y expectativas de un niño que sueña con tener un hermano menor. A través de situaciones familiares llenas de ternura y humor, el protagonista imagina cómo cambiaría su vida con la llegada de un nuevo integrante al hogar. Sin embargo, también enfrenta celos, inseguridades y dudas propias de ese proceso emocional. La obra desarrolla temas relacionados con la familia, la convivencia y la adaptación a los cambios. El lenguaje cercano y sensible permite que muchos niños se identifiquen fácilmente con las experiencias narradas.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Sueños en el umbral',
'Obra autobiográfica de Fátima Mernissi que relata su infancia en Marruecos dentro de un harén familiar durante un período de cambios sociales y culturales. A través de recuerdos personales, la autora reflexiona sobre el rol de las mujeres, las restricciones impuestas por la tradición y los deseos de libertad presentes en su entorno. El libro combina memoria, análisis cultural y experiencias íntimas para mostrar la complejidad de la vida femenina en una sociedad conservadora. La narración destaca la importancia de la educación, la imaginación y la resistencia frente a las limitaciones sociales. Con sensibilidad y profundidad, la obra ofrece una mirada crítica y humana sobre las fronteras físicas y simbólicas que condicionan la vida de las mujeres.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Kiki Strike en la ciudad de la sombra',
'Novela juvenil de aventuras y misterio protagonizada por Kiki Strike, una joven inteligente y audaz que lidera un grupo secreto de niñas exploradoras urbanas. Juntas descubren túneles ocultos, conspiraciones y secretos enterrados bajo la ciudad de Nueva York. La obra mezcla acción, suspenso y humor mediante una narración dinámica llena de enigmas y personajes extravagantes. A medida que avanzan en sus investigaciones, las protagonistas enfrentan peligros reales y desafíos que ponen a prueba su valentía e ingenio. El libro destaca la independencia femenina, el trabajo en equipo y la capacidad de enfrentar situaciones complejas con creatividad.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'¡Al mal tiempo buena cara!',
'Libro infantil y juvenil que utiliza humor y situaciones cotidianas para transmitir una actitud optimista frente a las dificultades de la vida. Los personajes enfrentan problemas escolares, familiares y emocionales, pero descubren progresivamente la importancia de mantener la esperanza y buscar soluciones positivas. La obra desarrolla valores relacionados con la resiliencia, la amistad y la capacidad de superar momentos difíciles. El tono alegre y cercano convierte la historia en una lectura motivadora y entretenida.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Vamos mas lentos por favor',
'Libro reflexivo y educativo que invita a cuestionar el ritmo acelerado de la vida moderna y la presión constante por hacer todo rápidamente. A través de relatos, ejemplos y situaciones cotidianas, la obra plantea la necesidad de recuperar espacios de calma, observación y disfrute del presente. El texto reflexiona sobre la importancia del descanso, las relaciones humanas y el equilibrio emocional. La narración promueve valores relacionados con la tranquilidad, la atención consciente y la calidad de vida.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'¿Maestro de Borges?',
'Obra ensayística y literaria que explora la figura de Jorge Luis Borges, sus influencias intelectuales y las relaciones que mantuvo con distintos escritores y pensadores. El texto analiza elementos fundamentales de su obra, como los laberintos, la memoria, el tiempo y la identidad. A través de reflexiones críticas y referencias literarias, el libro permite comprender mejor el universo creativo de uno de los autores más importantes de la literatura latinoamericana. La obra combina análisis académico y admiración literaria en una narración profunda y accesible.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Antologia',
'Recopilación de textos literarios pertenecientes a distintos autores, géneros o períodos históricos, seleccionados con fines educativos y culturales. La obra reúne cuentos, poemas, fragmentos narrativos o ensayos que permiten apreciar la diversidad de estilos y temas presentes en la literatura. A través de sus páginas, los lectores pueden conocer distintas voces y perspectivas sobre experiencias humanas universales como el amor, la muerte, la aventura y la memoria. El libro busca fomentar el interés por la lectura y ampliar el conocimiento literario.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Invierno en Praga',
'Novela ambientada en una Praga fría y melancólica donde los personajes enfrentan conflictos emocionales y políticos en un contexto marcado por la incertidumbre histórica. La ciudad funciona como un escenario cargado de simbolismo, misterio y memoria cultural. A través de relaciones complejas y experiencias dolorosas, la obra reflexiona sobre el amor, la pérdida y la búsqueda de sentido en tiempos difíciles. La narración combina sensibilidad emocional y una fuerte atmósfera histórica.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El avaro',
'Clásica comedia de Molière centrada en Harpagón, un hombre obsesionado con el dinero y la acumulación de riquezas. Su avaricia extrema afecta profundamente la vida de su familia y provoca numerosos conflictos relacionados con el matrimonio, las relaciones afectivas y la confianza. La obra utiliza humor, ironía y situaciones exageradas para criticar el egoísmo y la obsesión materialista. Considerada una de las grandes comedias del teatro universal, combina entretenimiento y crítica social mediante personajes memorables y diálogos ingeniosos.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El burlador de sevilla-Don juan tenorio',
'Obra clásica del teatro español centrada en la figura de Don Juan, personaje seductor y arrogante que engaña y manipula a mujeres sin preocuparse por las consecuencias de sus actos. La historia desarrolla temas relacionados con el honor, el deseo, la moral y el castigo divino. A través de una combinación de drama y elementos sobrenaturales, el relato muestra cómo las acciones irresponsables del protagonista terminan conduciéndolo a la destrucción. La obra es fundamental en la construcción del mito literario de Don Juan.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El burlador de sevilla',
'Clásica obra teatral atribuida a Tirso de Molina que presenta la historia de Don Juan Tenorio, célebre seductor que utiliza mentiras y engaños para conquistar mujeres y desafiar las normas sociales y religiosas. La trama desarrolla una fuerte crítica moral sobre la irresponsabilidad, la arrogancia y la falta de respeto hacia los demás. Mediante elementos dramáticos y sobrenaturales, la obra explora el castigo inevitable de las malas acciones y la importancia de la justicia.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El burlador de sevilla y auto sacarmental',
'Edición que reúne la obra clásica sobre Don Juan junto con un auto sacramental de temática religiosa y moral. Ambos textos reflejan elementos fundamentales del teatro español del Siglo de Oro, combinando entretenimiento, simbolismo y reflexión ética. El volumen permite apreciar la riqueza literaria y cultural de una época marcada por fuertes preocupaciones religiosas y sociales.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El misterio del hombre que desaparecio',
'Novela juvenil de suspenso centrada en la extraña desaparición de un hombre cuya ausencia genera sospechas y desconcierto entre quienes lo conocían. Un grupo de personajes decide investigar el caso y descubre pistas relacionadas con secretos ocultos, engaños y hechos inesperados. La narración mantiene una atmósfera intrigante mediante giros argumentales y situaciones de peligro. La obra combina misterio, aventura y trabajo en equipo en un relato dinámico y entretenido.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'La noche de los trasgos',
'Relato fantástico inspirado en leyendas y criaturas tradicionales conocidas como “trasgos”, seres traviesos vinculados al folclore popular. Durante una noche llena de sucesos extraños, los protagonistas deben enfrentarse a fenómenos misteriosos y situaciones sobrenaturales que alteran completamente su realidad cotidiana. La obra mezcla humor, suspenso y fantasía en una narración entretenida y atmosférica. El relato rescata elementos de la tradición oral y del imaginario popular.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'De Victoria para Alejandro',
'Novela juvenil epistolar o romántica centrada en la relación emocional entre Victoria y Alejandro, dos personajes que se comunican y desarrollan un vínculo profundo a través de experiencias personales y sentimientos compartidos. La obra explora las emociones adolescentes, la amistad, el amor y las dificultades de la comunicación. Mediante una narración sensible y cercana, el libro reflexiona sobre la identidad, los cambios personales y el descubrimiento afectivo.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'De profesion ,fantasma',
'Divertida novela infantil y fantástica protagonizada por un fantasma que considera el asustar personas como su verdadera profesión. Sin embargo, las cosas no siempre salen como espera y sus intentos por cumplir con su “trabajo” terminan generando situaciones absurdas y humorísticas. La obra utiliza elementos sobrenaturales para abordar temas relacionados con la aceptación personal, la amistad y la importancia de encontrar el propio lugar en el mundo.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Cuando las panteras no eran negras',
'Relato de carácter simbólico y reflexivo que utiliza la imagen de las panteras para construir una historia sobre identidad, transformación y diferencia. Los personajes enfrentan situaciones relacionadas con la discriminación, el cambio y la necesidad de comprender aquello que parece distinto. La obra combina elementos poéticos y narrativos en una historia cargada de metáforas y sensibilidad.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El domador del viento',
'Novela de aventuras y fantasía donde el protagonista posee una conexión especial con el viento y las fuerzas de la naturaleza. A través de viajes y desafíos extraordinarios, el personaje descubre habilidades que lo convierten en pieza clave frente a amenazas que ponen en peligro a su comunidad. La obra mezcla imaginación, acción y reflexión sobre la relación entre los seres humanos y el mundo natural.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El increible mundo de llanca',
'Libro infantil y fantástico ambientado en un universo lleno de criaturas imaginarias, lugares sorprendentes y aventuras extraordinarias. Llanca, el personaje principal, debe explorar este mundo mientras aprende importantes lecciones sobre la amistad, la valentía y la imaginación. El relato destaca por su creatividad y por la construcción de escenarios mágicos capaces de estimular la fantasía de los lectores jóvenes.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Las manchas de Vinca',
'Novela juvenil y reflexiva que utiliza la historia de Vinca para abordar temas relacionados con la identidad, las inseguridades y la percepción de uno mismo. Las “manchas” funcionan como símbolo de diferencias físicas o emocionales que afectan la autoestima del personaje. A medida que avanza el relato, la protagonista aprende a aceptarse y a valorar aquello que la hace única. La obra transmite mensajes positivos sobre la diversidad y la confianza personal.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Mitos y leyendas de Magallanes',
'Recopilación de relatos tradicionales provenientes de la región de Magallanes y del extremo sur de Chile. El libro reúne historias sobre seres sobrenaturales, navegantes, espíritus y acontecimientos misteriosos vinculados a la geografía austral. A través de leyendas transmitidas oralmente, la obra rescata parte importante del patrimonio cultural y del imaginario popular de la zona. Las narraciones combinan misterio, aventura y elementos históricos en una atmósfera marcada por paisajes inhóspitos y fascinantes.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'La mujer gallina',
'Relato fantástico y simbólico centrado en una mujer cuya vida y comportamiento se relacionan de manera extraña con el mundo de las aves. La historia utiliza humor, metáfora y elementos surrealistas para reflexionar sobre la identidad, la exclusión y las expectativas sociales. La obra desarrolla una atmósfera peculiar donde lo absurdo y lo humano se mezclan constantemente.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Zalgum',
'Novela fantástica ambientada en un universo imaginario lleno de conflictos, criaturas extraordinarias y antiguas profecías. El protagonista debe enfrentar desafíos peligrosos mientras descubre secretos relacionados con el misterioso Zalgum. La obra combina aventura, magia y acción en un relato dinámico que explora temas como el destino, la valentía y la lucha entre fuerzas opuestas.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El consumo me consume',
'Libro juvenil y reflexivo que analiza críticamente el consumismo y la influencia de la publicidad en la vida cotidiana. A través de ejemplos cercanos y situaciones humorísticas, la obra invita a cuestionar la necesidad constante de comprar y acumular objetos. El texto reflexiona sobre las consecuencias sociales y ambientales del consumo excesivo, promoviendo hábitos más conscientes y responsables.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Oficios campesinos del Valle de Aconcagua',
'Obra documental y cultural dedicada a rescatar los oficios tradicionales desarrollados en el valle de Aconcagua. A través de testimonios, descripciones y relatos de vida, el libro muestra el trabajo de artesanos, agricultores y trabajadores rurales que forman parte importante del patrimonio local. La obra destaca la relación entre las personas y la tierra, así como los conocimientos transmitidos entre generaciones.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Animales en peligro',
'Libro informativo y educativo centrado en distintas especies animales amenazadas por la destrucción de hábitats, la contaminación y la acción humana. A través de información clara y ejemplos concretos, la obra busca generar conciencia sobre la importancia de proteger la biodiversidad y conservar el equilibrio ecológico. El texto combina aprendizaje científico y reflexión ambiental dirigida especialmente a lectores jóvenes.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Los supervivientes',
'Novela de aventuras y supervivencia donde un grupo de personajes debe enfrentar condiciones extremas tras una catástrofe o accidente que altera completamente sus vidas. Aislados y obligados a colaborar, los protagonistas desarrollan estrategias para resistir mientras enfrentan conflictos internos y amenazas externas. La obra explora temas relacionados con la solidaridad, el miedo y la capacidad humana de adaptación.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'La historia de San Michele',
'Obra autobiográfica de Axel Munthe que relata la construcción de la villa San Michele en Capri y las experiencias personales del autor como médico, viajero y observador de distintas culturas. El libro combina recuerdos, reflexiones filosóficas y descripciones de paisajes mediterráneos en una narración íntima y evocadora. La obra aborda temas relacionados con la naturaleza, la enfermedad, el arte y la búsqueda espiritual.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'El pirata garrapata',
'Popular novela infantil de aventuras protagonizada por el extravagante Pirata Garrapata, personaje torpe y divertido que vive situaciones absurdas mientras recorre mares y enfrenta enemigos. La obra mezcla humor, acción y fantasía mediante personajes caricaturescos y episodios llenos de caos. El relato destaca por su tono desenfadado y por las constantes situaciones cómicas que convierten la lectura en una experiencia entretenida para niños y niñas.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Un Bel Ami',
'Novela histórica y de suspenso ambientada en un contexto de guerras, conspiraciones y conflictos políticos. La trama sigue a personajes involucrados en investigaciones y peligrosas intrigas relacionadas con asesinatos y secretos ocultos. La obra combina tensión narrativa y reconstrucción histórica mediante una atmósfera intensa y detallada. El relato reflexiona sobre el honor, el poder y las consecuencias de las decisiones humanas.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Antologia poetica de Pablo Neruda Poemas de Amor',
'Selección de poemas de Pablo Neruda centrados principalmente en el amor, el deseo, la pasión y la melancolía. La antología reúne algunos de los textos más representativos del autor chileno, caracterizados por un lenguaje intenso, imágenes poéticas y gran profundidad emocional. La obra permite apreciar la sensibilidad lírica de Neruda y su capacidad para transformar experiencias personales en poesía universal.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Odas elementales',
'Colección poética de Pablo Neruda dedicada a objetos, elementos cotidianos y aspectos simples de la vida que el autor transforma en materia poética. A través de un lenguaje cercano y lleno de imágenes sensoriales, las odas celebran la belleza presente en cosas aparentemente comunes como el pan, el mar o las frutas. La obra combina sencillez y profundidad en una reflexión sobre la naturaleza y la existencia.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Oda a la bella desnuda',
'Poema o conjunto poético de Pablo Neruda donde el autor desarrolla una intensa exaltación de la belleza, el deseo y el cuerpo femenino mediante imágenes sensuales y lenguaje lírico. La obra combina pasión amorosa y admiración estética en versos cargados de musicalidad y profundidad emocional.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Poemas y prosa autobiográfica',
'Recopilación de textos poéticos y autobiográficos donde el autor reflexiona sobre su vida, sus experiencias personales y su visión del mundo. La obra combina memoria, emoción y sensibilidad literaria mediante relatos íntimos y poemas profundamente humanos. A través de sus páginas se exploran temas relacionados con la identidad, el amor, el tiempo y la creación artística.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Veinte poemas de amor y una canción desesperada',
'Obra fundamental de Pablo Neruda que reúne poemas centrados en el amor, el deseo, la pérdida y la melancolía. Publicado cuando el autor era muy joven, el libro destaca por la intensidad emocional de sus versos y por la riqueza de sus imágenes poéticas. Los poemas exploran distintas facetas de las relaciones amorosas, desde la pasión hasta la tristeza provocada por la separación. Considerada una de las obras más importantes de la poesía en español, combina musicalidad, sensualidad y profundidad emocional.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Antonio en el país del silencio',
'Relato infantil y reflexivo protagonizado por Antonio, un niño que debe aprender a desenvolverse en un entorno marcado por el silencio y la incomunicación. A través de experiencias sensibles y emotivas, la obra aborda temas relacionados con la discapacidad auditiva, la empatía y la importancia de comprender diferentes formas de comunicación. El libro transmite valores de inclusión y respeto mediante una narración cercana y humana.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Los principios matemáticos',
'Obra educativa centrada en conceptos fundamentales de las matemáticas y en la importancia del razonamiento lógico para comprender el mundo. A través de explicaciones, ejemplos y problemas, el texto introduce principios básicos relacionados con números, operaciones y pensamiento abstracto. El libro busca estimular el interés por las matemáticas y mostrar su utilidad en la vida cotidiana y en distintas áreas del conocimiento.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Juan, Julia y Jericó',
'Relato juvenil protagonizado por Juan, Julia y Jericó, tres personajes cuyas vidas se cruzan en medio de experiencias relacionadas con la amistad, los conflictos personales y el crecimiento emocional. La obra desarrolla una historia cercana y sensible donde los protagonistas deben aprender a confiar unos en otros y enfrentar situaciones difíciles. El libro reflexiona sobre la importancia de la solidaridad y de los vínculos afectivos.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Un marido para mama',
'Novela infantil y familiar donde los hijos de una madre soltera intentan encontrarle una nueva pareja, provocando situaciones cómicas y emotivas. Mientras elaboran planes y conocen distintos candidatos, los personajes descubren que las relaciones humanas son más complejas de lo que imaginaban. La obra aborda temas relacionados con la familia, el amor y la convivencia mediante humor y sensibilidad.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Más historias de Franz',
'Colección de relatos protagonizados por Franz, un niño curioso y sensible que vive situaciones cotidianas llenas de humor y aprendizaje. Las historias muestran sus relaciones con la familia, la escuela y los amigos, abordando temas propios de la infancia como la inseguridad, la amistad y el crecimiento personal. El tono cercano y entretenido convierte el libro en una lectura ideal para niños y niñas.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES (
'Piruleta',
'Relato infantil protagonizado por un personaje entrañable vinculado al mundo de los dulces y la imaginación. A través de aventuras sencillas y emotivas, la obra desarrolla temas relacionados con la amistad, la alegría y la importancia de compartir. El lenguaje accesible y el tono optimista convierten la historia en una lectura entretenida y cercana para los más pequeños.',
1
);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Papelucho',
'La novela presenta el diario personal de Papelucho, un niño curioso, imaginativo y muy observador que relata sus experiencias cotidianas con espontaneidad y humor. A través de sus escritos comparte sus pensamientos sobre la escuela, la familia, la amistad y los problemas que enfrenta en su vida diaria. Su mirada ingenua pero crítica permite descubrir el mundo adulto desde una perspectiva infantil llena de creatividad. A medida que avanza la historia, el protagonista reflexiona sobre temas importantes como la soledad, la honestidad y la necesidad de sentirse comprendido. El lenguaje cercano y natural convierte al personaje en una figura entrañable para distintas generaciones de lectores. La obra es considerada uno de los clásicos más importantes de la literatura infantil chilena y destaca por la autenticidad psicológica de su protagonista.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Papelucho casi huérfano',
'En esta entrega Papelucho atraviesa momentos de preocupación y tristeza debido a situaciones familiares que lo hacen sentir abandonado y confundido. A través de su característico diario expresa emociones complejas relacionadas con el miedo, la inseguridad y la necesidad de afecto. Sin perder el humor ni la imaginación, intenta comprender el comportamiento de los adultos y encontrar soluciones a los problemas que lo rodean. El relato muestra cómo el protagonista utiliza la fantasía y la reflexión para enfrentar situaciones difíciles. La novela aborda temas como la familia, la resiliencia y la importancia de la contención emocional en la infancia. Marcela Paz construye nuevamente un personaje cercano y profundamente humano, capaz de conectar emocionalmente con lectores de todas las edades.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Papelucho historiador',
'Papelucho decide transformarse en historiador y comienza a investigar hechos del pasado utilizando su imaginación, sus observaciones y sus particulares conclusiones. Mientras intenta comprender acontecimientos históricos y familiares, mezcla realidad y fantasía de manera divertida e inesperada. El protagonista convierte situaciones cotidianas en grandes descubrimientos personales, siempre desde su mirada infantil llena de preguntas y creatividad. La obra utiliza el humor para reflexionar sobre la memoria, el aprendizaje y la curiosidad intelectual. A través de las anotaciones del diario se desarrolla también un retrato sensible de la infancia chilena. El libro mantiene el estilo espontáneo y cercano que caracteriza toda la serie creada por Marcela Paz.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Papelucho y el marciano',
'La historia comienza cuando Papelucho cree conocer a un verdadero marciano, situación que desencadena una serie de aventuras llenas de imaginación, humor y situaciones absurdas. Convencido de que debe proteger y ayudar a su nuevo amigo, el protagonista vive experiencias que desafían la lógica de los adultos y ponen a prueba su creatividad. El relato explora la capacidad infantil para construir mundos fantásticos y encontrar maravillas en lo cotidiano. A través de las páginas del diario aparecen también reflexiones sobre la amistad, la empatía y el deseo de ser comprendido. La novela combina fantasía y vida cotidiana con gran naturalidad, manteniendo siempre el tono ingenuo y encantador del personaje. Es una de las entregas más recordadas y queridas de la serie.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Papelucho mi hermano hippie',
'En esta novela Papelucho enfrenta la llegada y el comportamiento poco convencional de su hermano, a quien observa con curiosidad, desconcierto y humor. A través de sus anotaciones intenta comprender las nuevas ideas, costumbres y actitudes asociadas al mundo juvenil y contracultural. El protagonista interpreta los conflictos familiares desde una perspectiva inocente pero aguda, generando situaciones divertidas y reflexiones inesperadas. La obra aborda temas como las diferencias generacionales, la convivencia familiar y la búsqueda de identidad. Marcela Paz utiliza el lenguaje cotidiano y el pensamiento infantil para construir una mirada crítica y sensible sobre los cambios sociales. El resultado es una narración entretenida y emocionalmente cercana.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Papelucho misionero',
'Papelucho decide convertirse en misionero y ayudar a quienes considera más necesitados, iniciando así una serie de experiencias marcadas por su entusiasmo y buenas intenciones. A lo largo de la historia intenta resolver problemas ajenos utilizando su imaginación y sus particulares formas de entender la solidaridad. Aunque muchas veces provoca confusiones, sus acciones revelan una profunda sensibilidad hacia los demás. La novela combina humor y ternura mientras reflexiona sobre la empatía, la generosidad y la importancia de actuar con honestidad. El personaje continúa desarrollando su visión del mundo a través de observaciones simples pero significativas. La obra conserva el estilo íntimo y espontáneo característico de la serie.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Papelucho, mi hermana Ji',
'La novela presenta la relación entre Papelucho y su hermana Ji, mostrando las tensiones, juegos y complicidades propias de la vida familiar. El protagonista observa con curiosidad las diferencias entre niños y niñas, intentando comprender las emociones y comportamientos de su hermana desde su perspectiva infantil. Las situaciones cotidianas se transforman en episodios llenos de humor, imaginación y pequeños conflictos domésticos. A través del diario se exploran sentimientos como los celos, el cariño y la necesidad de reconocimiento dentro de la familia. Marcela Paz retrata con gran naturalidad las dinámicas familiares y la psicología infantil. El relato combina sensibilidad y comicidad, manteniendo siempre la voz auténtica de Papelucho.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Papelucho perdido',
'En esta entrega Papelucho vive situaciones que lo hacen sentirse extraviado tanto físicamente como emocionalmente. Mientras intenta resolver diversos problemas y encontrar respuestas a sus inquietudes, el protagonista reflexiona sobre la amistad, la familia y su lugar en el mundo. La historia muestra nuevamente su capacidad para transformar experiencias difíciles en aventuras llenas de imaginación y humor. A través de sus pensamientos espontáneos aparecen también temores y preguntas profundas relacionadas con el crecimiento personal. El relato destaca la importancia del afecto y de la comprensión en la infancia. La novela mantiene el tono cercano y sensible que convirtió a la serie en un clásico de la literatura infantil chilena.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Papelucho ¿soy dix-leso?',
'Papelucho comienza a preocuparse por sus dificultades escolares y por la posibilidad de tener problemas de aprendizaje, situación que observa con angustia pero también con humor. A través de su diario expresa sus inseguridades frente a las expectativas de los adultos y las exigencias del colegio. El relato permite comprender el impacto emocional que pueden generar las dificultades académicas en un niño sensible e imaginativo. Sin perder su espontaneidad característica, el protagonista intenta demostrar sus capacidades y encontrar su propio modo de aprender. La obra aborda temas educativos y emocionales con cercanía y empatía. Marcela Paz construye una reflexión valiosa sobre la autoestima infantil y la importancia de la comprensión adulta.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Papelucho en vacaciones',
'Durante sus vacaciones, Papelucho vive nuevas aventuras marcadas por descubrimientos, juegos y situaciones inesperadas que observa con su particular imaginación. Alejado de las rutinas escolares, el protagonista explora el mundo con curiosidad y transforma hechos cotidianos en grandes acontecimientos. A través de su diario relata experiencias relacionadas con la amistad, la libertad y la convivencia familiar. El libro transmite la alegría y la intensidad emocional propias de la infancia, mezclando humor con reflexiones sensibles. También aparecen pequeños conflictos y aprendizajes que contribuyen al crecimiento del personaje. La narración conserva el estilo espontáneo y cercano que caracteriza toda la serie.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Papelucho detective',
'Papelucho decide convertirse en detective y comienza a investigar misterios y situaciones sospechosas que ocurren a su alrededor. Con mucha imaginación y escasa lógica adulta, interpreta pistas y construye teorías extravagantes que lo llevan a vivir divertidas aventuras. La novela utiliza el humor para mostrar la creatividad infantil y la necesidad de sentirse importante y útil. A través de las investigaciones aparecen también reflexiones sobre la verdad, la confianza y las relaciones familiares. El protagonista enfrenta errores y confusiones, pero siempre mantiene su entusiasmo y sensibilidad. Marcela Paz logra combinar intriga y ternura en un relato dinámico y entretenido.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Papelucho en la clínica',
'La historia muestra la experiencia de Papelucho durante una estadía en una clínica, donde enfrenta el miedo, la enfermedad y la incertidumbre desde su perspectiva infantil. A través de sus anotaciones describe médicos, enfermeras y pacientes con humor, curiosidad y gran imaginación. El protagonista intenta comprender el funcionamiento del mundo adulto mientras enfrenta situaciones que lo hacen madurar emocionalmente. La novela aborda temas como la fragilidad humana, la empatía y la importancia del cuidado afectivo. Pese al contexto difícil, el relato mantiene un tono cercano y optimista gracias a la personalidad del personaje. Marcela Paz transforma una experiencia compleja en una historia sensible y profundamente humana.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Perico trepa por Chile',
'La novela relata las aventuras de Perico, un niño que recorre distintos lugares de Chile descubriendo paisajes, costumbres y personajes representativos del país. A lo largo del viaje el protagonista vive situaciones divertidas y emocionantes que le permiten conocer mejor la diversidad cultural y geográfica chilena. La obra combina aventura, humor y aprendizaje, ofreciendo una mirada cercana sobre distintas regiones y tradiciones nacionales. El relato destaca la curiosidad infantil y el espíritu explorador del personaje principal. También transmite valores relacionados con la amistad, la solidaridad y el amor por el país. El libro es considerado un clásico de la literatura infantil chilena.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Los pecosos',
'La historia sigue a un grupo de niños conocidos como “los pecosos”, quienes viven aventuras cotidianas llenas de humor, amistad y pequeñas travesuras. A través de sus experiencias se retratan emociones propias de la infancia como los celos, la competencia, el compañerismo y el deseo de pertenecer. El relato presenta situaciones simples pero profundamente humanas, narradas con sensibilidad y cercanía. La obra destaca la importancia de la imaginación y de los vínculos afectivos en el crecimiento personal. También refleja aspectos de la vida familiar y escolar chilena de la época. El tono cálido y entretenido convierte al libro en una lectura accesible y entrañable.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('A pesar de mi tía',
'La novela narra las dificultades y situaciones cómicas que enfrenta un niño debido a la estricta personalidad de su tía. A través de conflictos cotidianos y malentendidos familiares, el protagonista intenta encontrar espacios de libertad y comprensión. El relato combina humor y ternura para retratar las tensiones entre el mundo infantil y las normas impuestas por los adultos. La historia muestra cómo los afectos familiares pueden manifestarse de maneras contradictorias y complejas. Marcela Paz desarrolla personajes cercanos y realistas, llenos de humanidad. La obra reflexiona sobre la convivencia familiar y la necesidad de empatía entre generaciones.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('El soldadito rojo',
'La historia presenta las aventuras y reflexiones de un pequeño soldadito que simboliza la valentía, la lealtad y la capacidad de enfrentar dificultades. A través de un relato dirigido al público infantil, la obra mezcla fantasía y emoción para transmitir valores humanos fundamentales. El protagonista vive situaciones que ponen a prueba su coraje y su sentido de la amistad. La narración utiliza elementos simbólicos y poéticos para construir un universo cercano a los niños. También aparecen temas relacionados con la solidaridad y la perseverancia frente a la adversidad. El libro mantiene un tono sensible y educativo característico de la literatura infantil clásica.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Cuentos chilenos para niños',
'Esta recopilación reúne diversos relatos inspirados en la cultura, las tradiciones y la imaginación popular chilena, adaptados especialmente para lectores infantiles. Las historias presentan personajes cercanos, paisajes reconocibles y situaciones llenas de humor, fantasía y enseñanzas morales. A través de distintos cuentos se transmiten valores relacionados con la amistad, la honestidad y el respeto por los demás. La obra permite acercar a los niños al patrimonio narrativo chileno de manera entretenida y accesible. El lenguaje sencillo y las situaciones dinámicas facilitan la lectura y estimulan la imaginación. El libro constituye una valiosa introducción a la literatura infantil nacional.',
2);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Caramelos de luz',
'La obra desarrolla una historia llena de sensibilidad y fantasía en la que los pequeños detalles de la vida cotidiana adquieren un significado mágico y emocional. Los personajes atraviesan experiencias relacionadas con la amistad, la esperanza y el descubrimiento personal. A través de un lenguaje cercano y poético, el relato invita a valorar la imaginación y la capacidad de encontrar belleza incluso en situaciones difíciles. La novela transmite una visión optimista y profundamente humana de la infancia. Marcela Paz construye escenas llenas de ternura y reflexión emocional. El libro destaca por su atmósfera cálida y por la cercanía de sus personajes.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Pazuca en la duna',
'La historia sigue las aventuras de Pazuca en un entorno natural marcado por dunas, paisajes abiertos y situaciones inesperadas. A lo largo del relato el personaje descubre aspectos importantes sobre la amistad, la valentía y la relación con el entorno. La novela combina aventura y reflexión, utilizando un lenguaje cercano al público juvenil. Las experiencias vividas por los protagonistas muestran procesos de crecimiento personal y aprendizaje emocional. También aparece una fuerte valoración de la naturaleza y de la capacidad de imaginar mundos distintos. El libro mantiene el estilo sensible y entretenido característico de Marcela Paz.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Jacky',
'La novela presenta la historia de Jacky, un personaje juvenil que enfrenta distintas situaciones relacionadas con la amistad, la familia y el crecimiento personal. A través de experiencias cotidianas y momentos de conflicto emocional, el protagonista aprende a comprender mejor sus sentimientos y los de quienes lo rodean. El relato destaca la importancia de la empatía y de la comunicación afectiva. Marcela Paz construye personajes cercanos y realistas, capaces de conectar fácilmente con lectores jóvenes. La obra mezcla humor, sensibilidad y reflexión sobre la infancia y la adolescencia. El tono cálido y humano convierte la lectura en una experiencia emotiva y entretenida.',
1);
INSERT INTO wm_books (title, summary, genre_id) VALUES
('La cama mágica de Bartolo',
'La novela cuenta la historia de Bartolo, un niño que descubre una cama capaz de volar y llevarlo a vivir aventuras extraordinarias. Gracias a este objeto mágico, el protagonista recorre distintos lugares y enfrenta situaciones llenas de imaginación y humor. Sin embargo, cuando las autoridades intentan quitarle la cama para aprovecharse de su poder, Bartolo y sus amigos deberán defender su libertad y creatividad. El relato combina fantasía y crítica social de una manera accesible para lectores infantiles. A través de personajes entrañables se reflexiona sobre la solidaridad, la justicia y la importancia de compartir. La obra destaca por su lenguaje cercano, su humor inteligente y su defensa de la imaginación como herramienta de resistencia.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Cómo domesticar a tus papás',
'La historia aborda, desde el humor y la imaginación infantil, las dificultades de convivir con padres que muchas veces parecen incomprensibles para los niños. El protagonista desarrolla ingeniosas estrategias para “domesticar” a sus padres y lograr que entiendan mejor sus necesidades y emociones. A través de situaciones cotidianas se exploran los conflictos familiares, la comunicación y el cariño dentro del hogar. El relato combina momentos divertidos con reflexiones sensibles sobre la infancia y las relaciones familiares. Los personajes muestran debilidades y virtudes que los hacen cercanos y realistas. La novela transmite la importancia del diálogo y de la empatía entre adultos y niños.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('¡ay, cuánto me quiero!',
'El libro desarrolla una divertida y emotiva reflexión sobre la autoestima y la importancia de valorarse a uno mismo. A través de un protagonista lleno de ocurrencias y situaciones cotidianas, la historia muestra cómo los niños aprenden a reconocer sus capacidades, emociones y diferencias. El relato utiliza el humor para abordar inseguridades y conflictos propios de la infancia. También destaca la necesidad de recibir afecto, comprensión y reconocimiento por parte de los demás. La narración mantiene un tono optimista y cercano que facilita la identificación de los lectores. La obra promueve la confianza personal y la aceptación de la propia identidad.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('La negra Ester',
'La obra teatral narra la intensa y compleja historia de amor entre Roberto Parra y Ester, una mujer vinculada al ambiente popular y bohemio de los puertos chilenos. Ambientada en espacios marcados por la música, la pobreza y la vida nocturna, la historia retrata con fuerza la cultura popular chilena. A través de diálogos cargados de humor, emoción y poesía, se exploran temas como el amor, la marginalidad y la nostalgia. La obra combina elementos teatrales y musicales inspirados en la cueca y otras tradiciones populares. Los personajes poseen una gran humanidad y reflejan las contradicciones de la vida urbana popular. Considerada un clásico del teatro chileno contemporáneo, destaca por su riqueza cultural y emocional.',
4);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Poemas y antipoemas',
'Esta obra reúne algunos de los textos más representativos de Nicanor Parra y marca una ruptura profunda con la poesía tradicional latinoamericana. A través de un lenguaje coloquial, irónico y provocador, el autor cuestiona las convenciones literarias y sociales de su tiempo. Los poemas abordan temas como el amor, la muerte, la política, la religión y la vida cotidiana desde una mirada crítica y desacralizadora. La antipoesía busca acercar la literatura al lenguaje común y a las preocupaciones reales de las personas. El libro transformó profundamente la poesía en lengua española y consolidó a Parra como una figura fundamental de la literatura chilena. Su estilo mezcla humor, reflexión filosófica y crítica social.',
3);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Yo recuerdo',
'La obra reúne textos breves y evocadores donde el autor reconstruye recuerdos personales, experiencias cotidianas y momentos significativos de su vida. A través de un lenguaje sencillo y profundamente emocional, se exploran temas como la memoria, la infancia, el paso del tiempo y la identidad. Cada fragmento funciona como una pequeña ventana hacia emociones universales y escenas cargadas de humanidad. El tono íntimo y reflexivo invita al lector a conectar con sus propios recuerdos y experiencias. La escritura destaca por su sensibilidad y capacidad de transmitir nostalgia sin caer en sentimentalismos excesivos. El libro constituye una meditación literaria sobre la memoria y la experiencia humana.',
5);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('La gran Gilly Hopkins',
'La novela cuenta la historia de Gilly, una niña inteligente y rebelde que ha pasado por múltiples hogares sustitutos y que desconfía profundamente de los adultos. Cuando llega a vivir con una nueva familia de acogida, intenta mantener una actitud desafiante para evitar involucrarse emocionalmente. Sin embargo, poco a poco comienza a descubrir el afecto, la estabilidad y la posibilidad de pertenecer a un verdadero hogar. La obra aborda temas complejos como el abandono, la necesidad de amor y la construcción de vínculos afectivos. El personaje principal evoluciona de manera profunda y conmovedora a lo largo del relato. La novela combina humor, sensibilidad y una mirada honesta sobre la infancia vulnerable.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Aventuras de una gotita de agua',
'El libro sigue el recorrido de una pequeña gota de agua a través de distintos lugares y estados de la naturaleza, permitiendo explicar de manera entretenida el ciclo del agua. A lo largo de la historia la protagonista viaja por ríos, mares, nubes y montañas, descubriendo la importancia del agua para todos los seres vivos. El relato mezcla fantasía y divulgación científica para acercar conceptos ecológicos y naturales al público infantil. Además de enseñar contenidos educativos, promueve el respeto por el medio ambiente y la conciencia ecológica. Las ilustraciones y el lenguaje sencillo facilitan la comprensión de fenómenos naturales complejos. La obra destaca por su valor pedagógico y su tono imaginativo.',
9);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Soy una nuez',
'La historia gira en torno a una niña refugiada llamada Omar, quien llega inesperadamente a la vida de una mujer mayor y transforma completamente su rutina y su visión del mundo. A través de situaciones llenas de ternura y humor, el relato aborda temas como la migración, la empatía y los prejuicios sociales. La protagonista deberá enfrentar normas absurdas y autoridades poco sensibles para proteger a la niña. La novela mezcla crítica social y sensibilidad emocional con un tono cercano al público juvenil. Los personajes evolucionan gracias a los vínculos afectivos que construyen entre ellos. La obra destaca la importancia de la solidaridad y de reconocer la humanidad del otro.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('De repente en lo profundo del bosque',
'La novela se sitúa en un pueblo donde todos los animales han desaparecido misteriosamente, generando miedo y silencio entre los habitantes. Dos niños deciden investigar el origen de esa ausencia y descubrir qué secretos esconde el bosque cercano. A medida que avanzan en su exploración, enfrentan historias prohibidas, prejuicios y temores transmitidos por los adultos. El relato funciona como una metáfora sobre la intolerancia, la diferencia y la necesidad de comprender aquello que parece extraño. La narración combina elementos fantásticos, simbólicos y filosóficos en una atmósfera inquietante y poética. La obra invita a reflexionar sobre la convivencia y la construcción del miedo colectivo.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Agentes de A.S.C.O',
'La novela sigue a un grupo de jóvenes agentes secretos que deben enfrentar amenazas extrañas y situaciones absurdas relacionadas con una misteriosa organización. A través de aventuras llenas de humor, acción y tecnología, los protagonistas resuelven problemas utilizando creatividad y trabajo en equipo. El relato combina elementos de espionaje y comedia orientados al público juvenil. Los personajes viven situaciones exageradas y entretenidas que mantienen un ritmo dinámico y constante. La obra destaca la importancia de la amistad y de la cooperación para superar obstáculos. El tono desenfadado y humorístico convierte la lectura en una experiencia ágil y divertida.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Antología de tradiciones peruanas',
'La obra reúne una selección de relatos inspirados en las célebres tradiciones peruanas de Ricardo Palma, donde historia, humor y leyenda se combinan de manera única. Cada narración rescata episodios curiosos del pasado peruano, mezclando hechos históricos con elementos ficticios y anecdóticos. El autor utiliza un lenguaje ágil e irónico para retratar costumbres, personajes y situaciones de distintas épocas. A través de estas historias se construye una visión viva y entretenida de la identidad cultural peruana. El libro posee gran valor literario e histórico, permitiendo acercarse al patrimonio narrativo latinoamericano. La antología destaca por su riqueza cultural y su capacidad de entretener mientras enseña.',
2);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Muchachas 2',
'La novela continúa las historias de diversas mujeres cuyas vidas se cruzan en contextos marcados por conflictos emocionales, relaciones complejas y procesos de transformación personal. A través de distintos personajes femeninos se exploran temas como la violencia, el amor, la independencia y la búsqueda de identidad. El relato alterna momentos de tensión dramática con escenas de profunda sensibilidad humana. Cada personaje enfrenta decisiones difíciles que modifican su manera de entender la vida y sus vínculos. La obra destaca por la construcción psicológica de sus protagonistas y por su mirada crítica sobre las relaciones sociales. La narración mantiene un ritmo intenso y emocional.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('MUchachas',
'La obra presenta las vidas entrelazadas de distintas mujeres que enfrentan experiencias marcadas por el dolor, los recuerdos familiares y la necesidad de reconstruirse emocionalmente. Cada personaje desarrolla una historia personal compleja relacionada con el amor, la violencia y la supervivencia. El relato combina drama psicológico y reflexión social, explorando las heridas invisibles que dejan ciertas relaciones humanas. La narración profundiza en la intimidad de sus protagonistas y en sus procesos de cambio interior. La novela destaca por su sensibilidad y por la fuerza emocional de sus personajes femeninos. También reflexiona sobre la resiliencia y la posibilidad de encontrar nuevas oportunidades de vida.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Pandemonium',
'La novela se sitúa en una sociedad autoritaria donde las emociones están estrictamente controladas y el amor es considerado una enfermedad peligrosa. La protagonista debe enfrentarse a un sistema opresivo mientras descubre sentimientos y deseos que desafían las normas establecidas. A medida que la tensión política aumenta, se ve obligada a tomar decisiones que cambiarán su destino y el de quienes la rodean. El relato combina romance, distopía y acción en un contexto marcado por el miedo y la vigilancia. La obra reflexiona sobre la libertad individual y la necesidad humana de sentir y amar. El ritmo intenso y la atmósfera opresiva mantienen el suspenso constantemente.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Requiem',
'La historia continúa desarrollándose en un mundo distópico donde las emociones son perseguidas y la libertad individual se encuentra severamente restringida. La protagonista enfrenta nuevas pérdidas, conflictos políticos y decisiones personales que ponen a prueba su fortaleza emocional. Mientras la resistencia intenta desafiar el sistema dominante, aumentan las tensiones entre el deber, el amor y la supervivencia. La novela combina acción, drama y reflexión sobre el control social y la identidad humana. Los personajes evolucionan enfrentando consecuencias cada vez más complejas y dolorosas. El relato mantiene una atmósfera intensa y emocional hasta su desenlace.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('La rebelión de las masas',
'En este ensayo filosófico y sociológico, José Ortega y Gasset analiza el surgimiento de la sociedad de masas y sus consecuencias culturales y políticas en el mundo moderno. El autor reflexiona sobre la pérdida de referentes intelectuales y el avance de una mentalidad conformista que amenaza la vida democrática y el desarrollo cultural. La obra examina el papel de las élites, la técnica y la modernidad en la transformación de las sociedades contemporáneas. Con un estilo claro y profundamente reflexivo, el ensayo plantea preguntas sobre la responsabilidad individual y colectiva. El libro se convirtió en una referencia fundamental del pensamiento europeo del siglo XX. Su contenido mantiene vigencia en debates actuales sobre cultura y política.',
5);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('1984',
'La novela presenta una sociedad totalitaria controlada por el Partido y por la figura omnipresente del Gran Hermano, donde la vigilancia constante y la manipulación de la información destruyen la libertad individual. Winston Smith, el protagonista, comienza a cuestionar el sistema mientras intenta preservar sus recuerdos y pensamientos propios. A medida que desarrolla una relación amorosa y se involucra en actividades consideradas subversivas, enfrenta el enorme poder represivo del Estado. La obra explora temas como el control político, la censura, la verdad y la destrucción de la identidad personal. El ambiente opresivo y sombrío construye una de las distopías más influyentes de la literatura universal. El libro constituye una profunda advertencia sobre los peligros del autoritarismo.',
1);
INSERT INTO wm_books (title, summary, genre_id) VALUES
('La granja de los animales',
'La novela utiliza una granja habitada por animales como metáfora política para representar el surgimiento y la corrupción de los regímenes totalitarios. Tras expulsar a los humanos, los animales intentan construir una sociedad basada en la igualdad y la cooperación. Sin embargo, poco a poco los cerdos comienzan a concentrar el poder y reproducir las mismas injusticias que prometieron eliminar. A través de un relato aparentemente sencillo, George Orwell desarrolla una profunda crítica al autoritarismo, la manipulación ideológica y el abuso de poder. La obra muestra cómo los discursos políticos pueden deformarse hasta traicionar sus principios originales. El lenguaje claro y simbólico convierte la novela en un clásico accesible y profundamente vigente.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('El consumo me consume',
'El libro reflexiona sobre la influencia del consumismo en la vida cotidiana y en la construcción de la identidad personal y social. A través de ejemplos cercanos y situaciones reconocibles, analiza cómo la publicidad y el mercado condicionan deseos, comportamientos y relaciones humanas. La obra invita especialmente a los jóvenes a cuestionar la necesidad permanente de comprar y acumular objetos para alcanzar felicidad o reconocimiento social. Con un lenguaje claro y crítico, el autor aborda temas como la presión social, la moda, la desigualdad y el impacto ambiental del consumo excesivo. El texto combina análisis social y reflexión ética de manera accesible. Se trata de una obra orientada a fomentar el pensamiento crítico y la conciencia ciudadana.',
5);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Oficios campesinos del valle de Aconcagua',
'La obra documenta distintos oficios tradicionales desarrollados históricamente en el valle de Aconcagua, rescatando conocimientos, prácticas y experiencias propias de la cultura rural chilena. A través de testimonios, descripciones y relatos, el libro reconstruye formas de trabajo vinculadas a la agricultura, la ganadería y la vida comunitaria campesina. El texto posee un importante valor patrimonial y etnográfico, permitiendo preservar memorias y saberes que forman parte de la identidad cultural local. También muestra la relación entre las personas y el territorio, destacando el esfuerzo y la creatividad presentes en el trabajo rural. La narración combina investigación y sensibilidad cultural. La obra constituye un valioso aporte para comprender la historia social y cultural del campo chileno.',
10);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Animales en peligro',
'El libro presenta información sobre distintas especies animales amenazadas por la acción humana y los cambios ambientales que afectan sus hábitats naturales. A través de textos explicativos e ilustraciones, se analizan las causas de la extinción y la importancia de conservar la biodiversidad del planeta. La obra busca generar conciencia ecológica y promover actitudes responsables hacia el medio ambiente. El lenguaje sencillo y educativo facilita la comprensión de conceptos científicos para lectores jóvenes. También se destacan iniciativas de protección y conservación desarrolladas en distintas partes del mundo. El libro combina divulgación científica y sensibilización ambiental de manera clara y accesible.',
9);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Los supervivientes',
'La novela relata la experiencia de un grupo de personas que debe enfrentar situaciones extremas de peligro y aislamiento luego de una tragedia o catástrofe. En medio de la incertidumbre y la escasez, los personajes ponen a prueba su capacidad de resistencia física y emocional. El relato explora temas como la solidaridad, el miedo, la supervivencia y los conflictos humanos en condiciones límite. A medida que avanzan los acontecimientos, surgen tensiones y alianzas que transforman profundamente a los protagonistas. La obra mantiene un ritmo intenso y una atmósfera de constante tensión. También reflexiona sobre la fragilidad de la civilización y la fuerza de los vínculos humanos.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('La historia de San Michele',
'La obra autobiográfica relata las experiencias del médico y escritor Axel Munthe durante su vida en distintos países europeos y especialmente en su residencia de San Michele, en la isla de Capri. A través de recuerdos personales, anécdotas y reflexiones filosóficas, el autor construye un relato profundamente humano sobre la medicina, el sufrimiento y la belleza de la vida. El libro mezcla observación social, memorias y descripciones de paisajes mediterráneos con gran sensibilidad literaria. También aborda temas como la compasión, la espiritualidad y la relación entre seres humanos y animales. La narración posee un tono íntimo y contemplativo que invita a la reflexión. La obra es considerada un clásico de la literatura autobiográfica europea.',
7);


INSERT INTO wm_books (title, summary, genre_id) VALUES
('El pirata garrapata',
'La novela narra las disparatadas aventuras del pirata Garrapata, un personaje torpe y extravagante que recorre mares y lugares exóticos acompañado por una tripulación igualmente peculiar. A lo largo de la historia se suceden situaciones absurdas, encuentros peligrosos y episodios llenos de humor. El relato utiliza un tono desenfadado y caricaturesco que busca entretener especialmente al público infantil y juvenil. Aunque predominan la comicidad y la aventura, también aparecen valores relacionados con la amistad y el trabajo en equipo. Los personajes viven constantes peripecias que mantienen un ritmo dinámico y divertido. La obra es reconocida por su creatividad y por el humor característico de Juan Muñoz Martín.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Un bel morir',
'La novela desarrolla una compleja trama policial y psicológica centrada en un crimen cuyas circunstancias obligan a los personajes a enfrentar secretos, contradicciones y conflictos morales. A medida que avanza la investigación, surgen revelaciones que transforman completamente la percepción inicial de los hechos. El relato explora temas como la culpa, la verdad y la fragilidad de las relaciones humanas. La atmósfera está marcada por la tensión emocional y el suspenso constante. Los personajes presentan una profunda complejidad psicológica que enriquece el desarrollo narrativo. La obra combina intriga y reflexión sobre la condición humana.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Antologia poetica de Pablo Neruda Poemas de Amor',
'Esta antología reúne algunos de los poemas amorosos más representativos de Pablo Neruda, donde el autor explora intensamente el deseo, la nostalgia, la pasión y la pérdida. A través de imágenes poéticas de gran fuerza sensorial, los textos construyen una visión profundamente emocional del amor y de las relaciones humanas. La naturaleza, el cuerpo y la memoria aparecen constantemente vinculados a las experiencias afectivas. El lenguaje lírico y musical convierte cada poema en una experiencia estética cargada de sensibilidad. La obra refleja distintas etapas de la evolución poética del autor chileno. El libro constituye una excelente introducción a una de las voces más importantes de la poesía hispanoamericana.',
3);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Odas elementales',
'En esta obra Pablo Neruda dedica poemas a objetos, alimentos, elementos naturales y situaciones aparentemente simples de la vida cotidiana. A través de un lenguaje cercano y lleno de imágenes poéticas, el autor transforma lo común en motivo de admiración y reflexión. Las odas celebran la existencia humana, la naturaleza y las pequeñas experiencias diarias desde una mirada profundamente sensible y democrática. El libro propone una poesía accesible que encuentra belleza en aquello que suele pasar desapercibido. La musicalidad y riqueza expresiva de los versos muestran la madurez creativa del poeta chileno. La obra es considerada una de las expresiones más originales y luminosas de su producción literaria.',
3);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Oda a la bella desnuda',
'El poema desarrolla una intensa celebración del cuerpo femenino y de la belleza humana a través de imágenes sensuales y profundamente líricas. Pablo Neruda construye una visión del amor marcada por la admiración, el deseo y la conexión entre cuerpo y naturaleza. El lenguaje poético mezcla delicadeza y fuerza expresiva, creando una atmósfera íntima y apasionada. A lo largo del texto el cuerpo aparece asociado a paisajes, elementos naturales y símbolos vitales. La obra refleja la capacidad del poeta para convertir la experiencia amorosa en una expresión artística universal. El poema destaca por su musicalidad y riqueza sensorial.',
3);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Poemas y prosa autobiografica',
'La obra reúne textos poéticos y fragmentos autobiográficos que permiten recorrer distintas etapas de la vida personal y literaria del autor. A través de recuerdos, reflexiones y experiencias íntimas, se construye un retrato humano marcado por la sensibilidad artística y el compromiso con la realidad social y política. Los poemas y relatos exploran temas como el amor, la memoria, la creación literaria y la identidad. El lenguaje combina intensidad emocional y gran riqueza expresiva. El libro permite comprender mejor la evolución intelectual y emocional del escritor. La mezcla de géneros aporta profundidad y cercanía a la obra.',
3);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Veinte poemas de amor y una cancion desesperada',
'Esta obra reúne algunos de los poemas más célebres de Pablo Neruda y constituye uno de los libros fundamentales de la poesía amorosa en lengua española. Los textos exploran intensamente el deseo, la pasión, la nostalgia y el sufrimiento provocado por la ausencia y el recuerdo del ser amado. A través de imágenes naturales y corporales, el poeta construye una voz profundamente emocional y musical. Los versos combinan sensualidad, melancolía y contemplación del paisaje. El libro refleja la intensidad afectiva de la juventud y la complejidad de las relaciones humanas. Su enorme influencia literaria lo convirtió en un clásico universal de la poesía contemporánea.',
3);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Antonio en el pais del silencio',
'La novela relata la experiencia de Antonio, un niño que debe aprender a relacionarse con un entorno marcado por la incomunicación y las dificultades emocionales. A través de situaciones cotidianas y momentos de introspección, el protagonista descubre nuevas formas de comprender a los demás y expresarse. El relato aborda temas como la soledad, la empatía y la importancia de escuchar. La narración combina sensibilidad psicológica y una mirada esperanzadora sobre las relaciones humanas. Los personajes evolucionan emocionalmente a medida que construyen vínculos más profundos. La obra destaca por su tono humano y reflexivo.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Los principios matematicos',
'La obra introduce conceptos fundamentales de las matemáticas mediante explicaciones claras y ejemplos orientados al aprendizaje. El texto aborda temas relacionados con números, operaciones, razonamiento lógico y principios geométricos, facilitando la comprensión de contenidos abstractos. A través de un enfoque didáctico, el libro busca despertar el interés por el pensamiento matemático y desarrollar habilidades analíticas. También destaca la importancia de las matemáticas en la vida cotidiana y en el desarrollo científico. El lenguaje accesible permite que lectores jóvenes se acerquen a la disciplina sin dificultad excesiva. La obra combina educación y divulgación de manera efectiva.',
10);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Juan,Julia y Jerico',
'La historia sigue las aventuras y conflictos de Juan, Julia y su perro Jericó, quienes viven situaciones llenas de humor, ternura y aprendizaje. A través de experiencias familiares y escolares, los personajes enfrentan desafíos relacionados con la amistad, la convivencia y el crecimiento personal. El relato destaca la importancia de los vínculos afectivos y de la solidaridad entre compañeros. La presencia de Jericó aporta momentos de alegría y sensibilidad al desarrollo narrativo. La obra combina humor cotidiano y reflexión emocional en un lenguaje cercano a los lectores juveniles. El libro transmite valores positivos mediante personajes entrañables y situaciones reconocibles.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Un marido para mama',
'La novela aborda, desde una mirada infantil y humorística, las dificultades que surgen cuando una madre decide rehacer su vida sentimental. El protagonista observa con preocupación, curiosidad y cierta resistencia la llegada de un posible nuevo integrante a la familia. A través de situaciones cotidianas se exploran emociones complejas como los celos, el miedo al cambio y la necesidad de afecto. El relato combina humor y sensibilidad para mostrar los desafíos de la convivencia familiar. Los personajes evolucionan aprendiendo a comprenderse mutuamente. La obra reflexiona sobre la familia y la adaptación emocional frente a nuevas etapas de la vida.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Mas historias de Franz',
'El libro reúne nuevas aventuras de Franz, un niño sensible y creativo que enfrenta situaciones cotidianas relacionadas con la escuela, la familia y la amistad. A través de episodios llenos de humor y ternura, el protagonista intenta comprender el comportamiento de los adultos y encontrar su lugar en el mundo. El relato aborda temas como la autoestima, las diferencias personales y el crecimiento emocional. Franz destaca por su espontaneidad y por la manera sincera en que expresa sus pensamientos y emociones. La narración mantiene un tono cercano y entretenido dirigido al público infantil. La obra transmite valores positivos mediante situaciones simples y profundamente humanas.',
1);
INSERT INTO wm_books (title, summary, genre_id) VALUES
('Piruleta',
'La historia presenta a Piruleta, un personaje infantil lleno de imaginación, energía y curiosidad que enfrenta distintas situaciones cotidianas con humor y sensibilidad. A través de experiencias familiares, escolares y sociales, el protagonista aprende importantes lecciones relacionadas con la amistad, la empatía y la convivencia. El relato combina momentos divertidos con reflexiones emocionales cercanas al mundo de los niños. La narración utiliza un lenguaje sencillo y dinámico que facilita la identificación de los lectores con los personajes y sus conflictos. A medida que avanzan los acontecimientos, Piruleta descubre el valor de la honestidad, el afecto y la responsabilidad. La obra transmite una mirada optimista sobre el crecimiento personal y las relaciones humanas.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Querida Susi,querido paul',
'La novela epistolar relata la relación de amistad y afecto entre Susi y Paul a través de cartas cargadas de humor, ternura y sinceridad. Ambos personajes comparten experiencias escolares, preocupaciones familiares y emociones propias de la infancia y la adolescencia. El intercambio de correspondencia permite conocer sus pensamientos más íntimos y la evolución de su vínculo a lo largo del tiempo. La obra aborda temas como la amistad, el amor juvenil, la autoestima y la importancia de la comunicación. El tono cercano y espontáneo de las cartas genera una lectura dinámica y emotiva. El libro destaca por retratar con sensibilidad las emociones y dificultades del crecimiento.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Rosalinde tiene ideas en la cabeza',
'Rosalinde es una niña creativa e inquieta que constantemente imagina proyectos, soluciones y aventuras que sorprenden a quienes la rodean. A través de distintas situaciones familiares y escolares, la protagonista demuestra una personalidad independiente y llena de curiosidad por el mundo. El relato muestra cómo sus ideas generan tanto problemas como oportunidades de aprendizaje. La obra explora temas relacionados con la creatividad, la identidad y la confianza en uno mismo. Con un tono humorístico y afectuoso, la narración invita a valorar la imaginación infantil y el pensamiento original. Los personajes secundarios enriquecen la historia mediante relaciones cercanas y situaciones cotidianas reconocibles.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('La plegaria de los animales',
'El libro desarrolla una reflexión poética y emocional sobre la relación entre los seres humanos y los animales, resaltando la necesidad de respeto y protección hacia todas las formas de vida. A través de relatos, imágenes y situaciones simbólicas, la obra denuncia el sufrimiento provocado por la violencia, el abandono y la destrucción de la naturaleza. El texto invita a desarrollar empatía y conciencia ecológica desde una mirada profundamente humanista. También destaca la importancia de la convivencia armónica entre personas, animales y medio ambiente. La narración combina sensibilidad literaria y mensaje ético de manera accesible para distintos tipos de lectores. La obra transmite un fuerte llamado a la compasión y la responsabilidad colectiva.',
5);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Bibiana y su mundo',
'La novela cuenta la historia de Bibiana, una niña que debe enfrentar dificultades familiares y sociales mientras intenta conservar la alegría y la esperanza. A través de su mirada sensible y valiente, el relato aborda temas complejos como la pobreza, la soledad y la importancia de los vínculos afectivos. Bibiana encuentra apoyo en personas cercanas que la ayudan a comprender mejor su realidad y a enfrentar los desafíos cotidianos. La obra combina emoción, ternura y crítica social en una narración cercana al público juvenil. Los personajes presentan gran humanidad y profundidad emocional. El libro transmite valores relacionados con la solidaridad, la empatía y la superación personal.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('La flaca y el gordo',
'La historia gira en torno a dos personajes muy distintos físicamente que desarrollan una amistad marcada por el humor, las diferencias y el aprendizaje mutuo. A través de situaciones escolares y familiares, ambos enfrentan prejuicios, inseguridades y conflictos propios de la adolescencia. El relato reflexiona sobre la apariencia física, la aceptación personal y el valor de la verdadera amistad. Con un tono cercano y entretenido, la obra muestra cómo las diferencias pueden convertirse en fortalezas compartidas. Los personajes evolucionan emocionalmente a medida que aprenden a confiar en sí mismos y en los demás. El libro destaca por abordar temas de identidad y convivencia con sensibilidad y naturalidad.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Como traje de fiesta',
'La novela explora las emociones y transformaciones que experimentan distintos personajes frente a acontecimientos importantes de sus vidas. El título funciona como metáfora de las apariencias, los cambios y las expectativas sociales que muchas veces condicionan las relaciones humanas. A través de situaciones familiares y afectivas, el relato aborda temas como el amor, la identidad y el deseo de aceptación. La narración combina momentos íntimos con reflexiones sobre el crecimiento personal y las decisiones difíciles. Los personajes presentan conflictos emocionales complejos que enriquecen el desarrollo de la historia. La obra destaca por su sensibilidad psicológica y por la profundidad de sus relaciones humanas.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Pandemonium',
'La novela continúa desarrollando un mundo distópico marcado por el control social, las restricciones emocionales y la lucha por la libertad individual. La protagonista enfrenta decisiones difíciles mientras intenta sobrevivir en una sociedad donde el amor es considerado una enfermedad peligrosa. A medida que descubre nuevas formas de resistencia y rebeldía, también debe cuestionar sus propias convicciones y emociones. El relato combina acción, tensión política y conflictos afectivos en un escenario opresivo y futurista. La obra explora temas como la identidad, el poder y la manipulación ideológica. El ritmo dinámico y la intensidad emocional mantienen constantemente el interés narrativo.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Requiem',
'La novela cierra una trilogía distópica centrada en una sociedad que intenta controlar las emociones humanas mediante mecanismos autoritarios y represivos. Los personajes principales enfrentan las consecuencias de la guerra, las pérdidas personales y las decisiones tomadas durante la resistencia. El relato alterna perspectivas narrativas que permiten comprender la complejidad emocional y política del conflicto. La obra reflexiona sobre el amor, la libertad y el precio de luchar contra sistemas opresivos. A través de escenas intensas y momentos de gran carga emocional, se desarrollan los dilemas éticos y afectivos de los protagonistas. El libro concluye con una mirada crítica y esperanzadora sobre el futuro y la capacidad humana de resistir.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('La rebelion de las masas',
'En este ensayo filosófico y sociológico, José Ortega y Gasset analiza el surgimiento de la sociedad de masas y sus consecuencias culturales y políticas en el mundo contemporáneo. El autor reflexiona sobre el papel del individuo, la pérdida de referentes intelectuales y el avance de actitudes conformistas dentro de la vida social. A través de un lenguaje profundo y crítico, examina la relación entre democracia, poder y responsabilidad ciudadana. La obra advierte sobre los riesgos de una sociedad dominada por la mediocridad y la falta de pensamiento crítico. También propone la importancia de la cultura y la educación como herramientas fundamentales para el desarrollo humano. El libro es considerado uno de los textos más influyentes del pensamiento español del siglo XX.',
5);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('1984',
'La novela presenta una sociedad totalitaria donde el Estado controla todos los aspectos de la vida mediante vigilancia constante, manipulación de la información y represión política. Winston Smith, el protagonista, comienza a cuestionar el sistema mientras intenta conservar su libertad interior y su capacidad de pensar críticamente. A medida que se rebela contra el poder establecido, descubre el alcance del control ejercido por el Partido y la figura omnipresente del Gran Hermano. La obra explora temas como la censura, la propaganda, la pérdida de la verdad y la destrucción de la individualidad. El ambiente opresivo y la tensión psicológica construyen una de las distopías más influyentes de la literatura universal. El libro sigue siendo una referencia fundamental para reflexionar sobre el autoritarismo y la manipulación política.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Rockeros Celestes',
'La novela combina humor, música y aventuras juveniles en torno a un grupo de personajes apasionados por el rock y los sueños de libertad. A través de situaciones cotidianas y conflictos personales, los protagonistas descubren el valor de la amistad, la creatividad y la expresión artística. El relato retrata el mundo adolescente desde una perspectiva cercana y dinámica, incorporando referencias culturales y musicales que enriquecen la narración. También se exploran temas relacionados con la identidad, las aspiraciones personales y las dificultades familiares. La obra mantiene un ritmo entretenido y personajes carismáticos que conectan fácilmente con los lectores jóvenes. El libro destaca por transmitir entusiasmo y energía juvenil.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('De repente en lo profundo del bosque',
'La novela presenta un pueblo misterioso donde todos los animales han desaparecido hace muchos años, generando miedo y silencio entre los habitantes. Dos niños deciden investigar el origen de esa extraña situación y emprenden un viaje hacia el bosque prohibido. A medida que avanzan, descubren secretos relacionados con la intolerancia, la violencia y la convivencia humana. El relato mezcla elementos de fábula, fantasía y reflexión filosófica. La obra aborda temas como la diversidad, el miedo a lo desconocido y la necesidad de comprender al otro. El lenguaje poético y simbólico construye una atmósfera profunda y evocadora.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Algunos recuerdos del pasado',
'El libro reúne memorias y evocaciones relacionadas con experiencias personales, acontecimientos históricos y transformaciones sociales observadas por el autor a lo largo de su vida. A través de relatos íntimos y reflexivos, la obra reconstruye personajes, lugares y situaciones que forman parte de la memoria colectiva e individual. El texto aborda temas relacionados con el paso del tiempo, la nostalgia y la construcción de identidad. También aparecen observaciones sobre cambios culturales y formas de vida desaparecidas. La narración utiliza un tono cercano y contemplativo que favorece la conexión emocional con el lector. La obra destaca por su valor testimonial y humano.',
8);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Antologia de Gibran',
'La antología reúne textos representativos de Khalil Gibran donde se desarrollan reflexiones filosóficas y poéticas sobre el amor, la espiritualidad, la libertad y la condición humana. A través de un lenguaje simbólico y profundamente lírico, el autor invita a meditar sobre las emociones, la existencia y las relaciones entre las personas. Los escritos combinan sencillez expresiva y profundidad espiritual mediante imágenes cargadas de sensibilidad. También se abordan temas relacionados con la naturaleza, la soledad y el crecimiento interior. La obra constituye una excelente introducción al pensamiento humanista y poético de Gibran. Sus textos mantienen una amplia vigencia por su dimensión universal.',
3);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Diario de un viaje a California',
'La obra relata las experiencias y observaciones de un viaje realizado hacia California en un contexto histórico marcado por transformaciones sociales y movimientos migratorios. A través de anotaciones personales y descripciones detalladas, el narrador reconstruye paisajes, encuentros y dificultades propias de la travesía. El texto combina elementos autobiográficos, históricos y descriptivos que permiten comprender mejor la época representada. También aparecen reflexiones sobre la aventura, la incertidumbre y las expectativas de quienes emprendían largos viajes en busca de nuevas oportunidades. La narración posee valor documental y literario. La obra constituye un interesante testimonio histórico y humano.',
8);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Mai',
'La novela desarrolla la historia de una protagonista marcada por conflictos emocionales, relaciones familiares complejas y procesos de búsqueda personal. A través de distintas experiencias y encuentros significativos, el personaje principal enfrenta decisiones que transforman profundamente su manera de comprender la vida y sus vínculos afectivos. El relato aborda temas relacionados con la identidad, el amor y la superación de dificultades personales. También se exploran aspectos culturales y sociales presentes en el entorno de la protagonista. La narración combina sensibilidad psicológica y profundidad emocional mediante un estilo íntimo y reflexivo. La obra destaca por la construcción humana de sus personajes.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Torquemada en la hoguera',
'La novela presenta la figura de Francisco Torquemada, un prestamista obsesionado con el dinero y el ascenso social, cuya vida comienza a transformarse frente a situaciones familiares y emocionales inesperadas. Benito Pérez Galdós desarrolla una crítica social sobre la avaricia, la hipocresía y las contradicciones de la sociedad española de su tiempo. A través de una narración realista y psicológica, la obra explora las tensiones entre ambición económica y sentimientos humanos. También se desarrollan conflictos relacionados con la enfermedad, el sufrimiento y la moralidad. La escritura combina ironía, observación social y profundidad psicológica. La novela constituye una de las obras representativas del realismo español.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('La vuelta de Pedro Urdemales',
'La obra recupera las aventuras del tradicional personaje popular Pedro Urdemales, conocido por su ingenio, astucia y capacidad para engañar a personajes más poderosos o ambiciosos. A través de distintos episodios llenos de humor y picardía, el protagonista enfrenta situaciones donde utiliza la inteligencia y el lenguaje para salir adelante. El relato se inspira en la tradición oral latinoamericana y conserva elementos culturales profundamente vinculados al folclore popular. También se desarrollan críticas sociales relacionadas con la desigualdad y los abusos de autoridad. La narración posee un tono dinámico y entretenido que mantiene el espíritu de los cuentos tradicionales. La obra destaca por preservar parte importante del imaginario popular chileno e hispanoamericano.',
2);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Caperucita roja ( tal como se lo contaron a Jorge',
'Esta reinterpretación del clásico cuento infantil presenta una versión humorística y original de la historia de Caperucita Roja, narrada desde una perspectiva diferente y llena de confusiones divertidas. A medida que avanza el relato, los personajes tradicionales adquieren nuevos matices y situaciones inesperadas que transforman completamente el desarrollo conocido del cuento. La obra juega constantemente con la imaginación, el absurdo y la creatividad narrativa para sorprender al lector. También promueve el gusto por la lectura y la reinterpretación de relatos clásicos. El lenguaje cercano y dinámico facilita la conexión con lectores infantiles. La narración combina humor y fantasía en una propuesta muy entretenida.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Frin',
'La novela sigue la vida de Frin, un niño sensible e imaginativo que enfrenta las dificultades propias de la adolescencia, incluyendo el amor, la amistad y los cambios emocionales. A través de situaciones cotidianas y escolares, el protagonista comienza a descubrir aspectos importantes sobre sí mismo y sobre las personas que forman parte de su entorno. El relato desarrolla temas relacionados con la inseguridad, la identidad y la necesidad de aceptación social. También aparecen reflexiones sobre la familia y la importancia de expresar los sentimientos. La narración combina humor, ternura y sensibilidad psicológica mediante un estilo cercano y accesible. La obra se ha convertido en una lectura muy valorada dentro de la literatura juvenil latinoamericana.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('El muerto',
'La narración desarrolla una historia marcada por la tensión psicológica, el crimen y las consecuencias inevitables de las decisiones humanas. El protagonista se ve envuelto en situaciones relacionadas con el poder, la violencia y la traición dentro de un ambiente hostil y peligroso. A medida que avanza la trama, se profundiza en la fragilidad de las ambiciones personales y en los límites morales de los personajes. El relato construye una atmósfera inquietante y cargada de fatalismo. También se reflexiona sobre la muerte, el miedo y la lucha por la supervivencia. La obra destaca por su intensidad narrativa y profundidad emocional.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Una llave y un camino',
'La obra relata un proceso de búsqueda personal y descubrimiento interior donde los personajes enfrentan desafíos emocionales y situaciones que transforman su manera de comprender el mundo. A través de encuentros, viajes y experiencias simbólicas, el relato desarrolla temas relacionados con la esperanza, la identidad y la necesidad de encontrar un propósito en la vida. La narración combina sensibilidad emocional y elementos reflexivos mediante un estilo cercano y evocador. También aparecen valores como la amistad, la perseverancia y la confianza en los demás. El libro propone una mirada optimista sobre el crecimiento personal y la superación de dificultades. La obra transmite un mensaje humano y esperanzador.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('El portero de la selva',
'La historia se desarrolla en un entorno natural lleno de animales y paisajes selváticos donde un personaje muy particular debe proteger el equilibrio y la convivencia del lugar. A través de distintas aventuras y conflictos ecológicos, el relato promueve el respeto por la naturaleza y la importancia del cuidado ambiental. Los personajes enfrentan desafíos relacionados con la convivencia, la solidaridad y la protección de los seres vivos. También se desarrollan enseñanzas vinculadas al trabajo colectivo y la responsabilidad ecológica. La narración combina fantasía, humor y contenido educativo mediante un lenguaje accesible para lectores jóvenes. La obra destaca por su mensaje ambientalista y sensibilidad hacia la naturaleza.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('La Quintrala',
'La novela reconstruye la vida de Catalina de los Ríos y Lisperguer, conocida popularmente como La Quintrala, una de las figuras más controvertidas y legendarias de la historia colonial chilena. A través de una narración intensa y llena de conflictos, la obra explora el poder, la violencia y la influencia social ejercida por esta mujer dentro de la aristocracia colonial. El relato mezcla elementos históricos y literarios para representar las tensiones políticas, religiosas y sociales de la época. También se abordan temas relacionados con la ambición, el abuso de poder y la construcción de mitos históricos. La atmósfera oscura y apasionada fortalece la dimensión dramática de la historia. La obra constituye una importante aproximación literaria a uno de los personajes más emblemáticos del imaginario chileno.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Las aventuras del capitan calzocillos',
'La novela presenta las disparatadas aventuras del Capitán Calzoncillos, un superhéroe tan absurdo como divertido creado accidentalmente por dos niños extremadamente imaginativos y traviesos. A través de situaciones llenas de humor, caos y creatividad, los protagonistas deben enfrentar villanos ridículos y resolver problemas escolares completamente fuera de control. El relato utiliza ilustraciones, juegos visuales y un lenguaje dinámico que favorece la lectura entretenida para niños. También aparecen temas relacionados con la amistad, la imaginación y la importancia del humor frente a las dificultades. La obra combina acción y comedia mediante una narrativa rápida y exagerada. El libro se convirtió en uno de los fenómenos más populares de la literatura infantil contemporánea.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('El capitan calzoncillos y el ataque de los retretes parlantes',
'En esta nueva aventura, el Capitán Calzoncillos debe enfrentar una amenaza completamente absurda: unos retretes parlantes que ponen en peligro la tranquilidad de la ciudad y la escuela de los protagonistas. Jorge y Berto vuelven a verse involucrados en situaciones caóticas llenas de humor exagerado, inventos ridículos y persecuciones descontroladas. El relato mantiene un ritmo rápido acompañado de ilustraciones y recursos visuales muy atractivos para lectores infantiles. También se destacan la creatividad, la amistad y la importancia de trabajar en equipo para resolver problemas. La narración utiliza constantemente el absurdo como herramienta humorística. La obra continúa desarrollando el estilo irreverente y entretenido característico de la serie.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Sito kesito y su robot gigantesco',
'La historia sigue las aventuras espaciales de Sito Kesito, un niño valiente y creativo que debe enfrentar peligros interplanetarios junto a un enorme robot. A través de situaciones llenas de acción, humor y ciencia ficción, el protagonista aprende a resolver conflictos mediante la inteligencia y el trabajo en equipo. El relato desarrolla temas relacionados con la amistad, la imaginación y el valor frente a lo desconocido. También aparecen criaturas extravagantes y escenarios fantásticos que enriquecen el universo narrativo. La escritura utiliza un tono dinámico y divertido orientado principalmente a lectores infantiles. La obra combina aventura y humor en una experiencia de lectura entretenida y creativa.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Sito kesito contra los buitres bestiales de Venus',
'En esta aventura, Sito Kesito debe enfrentar una peligrosa amenaza proveniente del planeta Venus, donde unas criaturas gigantes y agresivas ponen en riesgo la seguridad del universo. El protagonista utiliza su ingenio y valentía para superar situaciones llenas de acción y humor absurdo. El relato combina elementos de ciencia ficción y comedia mediante una narración rápida y entretenida. También se destacan valores como la amistad, la perseverancia y la creatividad para resolver problemas difíciles. Los escenarios espaciales y los personajes extravagantes fortalecen la imaginación del lector. La obra mantiene el estilo humorístico y aventurero característico de la serie.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Sito kesitocontra los clonejosaurios jurásicos de Júpiter',
'La novela presenta una nueva misión espacial de Sito Kesito, quien debe enfrentarse a unas peligrosas criaturas híbridas llamadas clonejosaurios que amenazan el equilibrio galáctico. A través de escenas llenas de acción y humor, el protagonista enfrenta desafíos inesperados mientras intenta salvar a sus amigos y derrotar a sus enemigos. El relato desarrolla situaciones absurdas y creativas que estimulan la imaginación infantil. También aparecen enseñanzas relacionadas con la valentía, la cooperación y la importancia de mantener la calma frente a los problemas. La narración combina ciencia ficción y humor disparatado en un ritmo dinámico. La obra continúa ampliando el universo fantástico de la saga.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Sito kesito contra los monos mecanicos de Marte',
'En esta entrega, Sito Kesito debe impedir los planes de unos peligrosos monos mecánicos provenientes de Marte que amenazan con causar caos en distintos planetas. El protagonista se embarca en una aventura espacial llena de persecuciones, inventos extraños y situaciones cómicas. El relato utiliza constantemente la exageración y la imaginación para mantener el interés de lectores infantiles. También se desarrollan valores relacionados con la amistad, el ingenio y la capacidad de enfrentar desafíos inesperados. La narración posee un tono ligero y entretenido acompañado de un ritmo muy ágil. La obra combina humor y aventura en un universo espacial creativo y divertido.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Sito kesito contra las sucias sabandijas sarnosas de Saturno',
'La novela presenta otra extravagante misión de Sito Kesito, quien debe combatir unas desagradables criaturas provenientes de Saturno que amenazan el equilibrio del espacio. A través de situaciones absurdas y llenas de acción, el protagonista enfrenta peligros utilizando creatividad, humor y valentía. El relato desarrolla escenarios fantásticos y personajes extravagantes que estimulan la imaginación infantil. También aparecen enseñanzas relacionadas con la amistad y la importancia de no rendirse frente a las dificultades. La narración mantiene un tono dinámico y cómico orientado al entretenimiento juvenil. La obra destaca por su originalidad y ritmo acelerado.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Sito kesito contra los unicornios radiactivos de Urano',
'En esta aventura espacial, Sito Kesito debe detener a unos peligrosos unicornios radiactivos que amenazan distintos mundos con su extraño poder destructivo. El protagonista se enfrenta a desafíos llenos de humor, creatividad y acción mientras intenta salvar a sus amigos y proteger el universo. El relato combina ciencia ficción absurda y comedia mediante un lenguaje cercano y entretenido. También se destacan valores relacionados con la valentía, la cooperación y la imaginación. Los escenarios extravagantes y las criaturas fantásticas fortalecen el carácter lúdico de la narración. La obra continúa desarrollando el estilo humorístico y aventurero de la saga.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Un ladron entre nosotros',
'La historia se desarrolla en un ambiente escolar donde la desaparición de distintos objetos provoca sospechas, conflictos y tensiones entre compañeros de curso. Los protagonistas deben descubrir quién es el responsable mientras enfrentan problemas relacionados con la confianza y la convivencia. El relato aborda temas vinculados a la honestidad, la amistad y las consecuencias de los prejuicios apresurados. También se exploran emociones relacionadas con la culpa, la exclusión y la necesidad de ser comprendido. La narración combina suspenso y reflexión emocional mediante un lenguaje cercano para lectores jóvenes. La obra transmite importantes enseñanzas sobre empatía y responsabilidad.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Teatro escolar representable 2',
'El libro reúne diversas obras teatrales especialmente diseñadas para ser representadas en contextos escolares. Los textos presentan situaciones entretenidas, personajes dinámicos y diálogos accesibles que facilitan la participación de estudiantes en actividades dramáticas y educativas. A través de distintos temas y estilos, las obras promueven valores relacionados con la convivencia, la creatividad y el trabajo colectivo. También permiten desarrollar habilidades de expresión oral, interpretación y comprensión lectora. La estructura sencilla de las piezas facilita su adaptación a distintos niveles educativos. La obra constituye un importante recurso pedagógico para el fomento del teatro escolar.',
4);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Apologia de Socrates',
'En este texto filosófico, Platón reconstruye el discurso pronunciado por Sócrates durante el juicio que lo condenó a muerte en Atenas. A través de sus palabras, el filósofo defiende su vida dedicada a la búsqueda de la verdad y cuestiona profundamente las creencias y valores de la sociedad ateniense. La obra desarrolla reflexiones sobre la justicia, la moral, la sabiduría y la responsabilidad individual frente al poder político. También se destaca la importancia del pensamiento crítico y de la libertad intelectual. El relato posee una enorme relevancia histórica y filosófica dentro de la tradición occidental. La obra continúa siendo fundamental para el estudio de la filosofía clásica.',
5);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Alejandro y Cesar',
'La obra presenta un recorrido histórico por las vidas y conquistas de Alejandro Magno y Julio César, dos de las figuras más influyentes de la antigüedad. A través de episodios militares, políticos y personales, el relato muestra cómo ambos líderes transformaron profundamente el mundo de su tiempo. También se desarrollan reflexiones sobre el poder, la ambición y el liderazgo. La narración combina elementos históricos y biográficos mediante un lenguaje accesible y dinámico. El texto permite comprender mejor el contexto político y cultural de las civilizaciones clásicas. La obra constituye una introducción interesante a la historia antigua y sus grandes personajes.',
7);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Antologia de la novela policial',
'La antología reúne relatos representativos del género policial escritos por diversos autores clásicos y contemporáneos. A través de investigaciones criminales, enigmas y situaciones de suspenso, las historias exploran la inteligencia deductiva, el misterio y las motivaciones humanas detrás del delito. Los textos presentan distintos estilos narrativos que permiten apreciar la evolución de la novela policial a lo largo del tiempo. También aparecen temas relacionados con la justicia, la corrupción y el conflicto moral. La narración mantiene constantemente el interés mediante giros inesperados y atmósferas intrigantes. La obra constituye una excelente introducción al género policial.',
2);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Aventuras de arthur Gordon Pym',
'La novela narra el viaje marítimo de Arthur Gordon Pym, un joven que se embarca en peligrosas aventuras llenas de misterio, naufragios y exploraciones extremas. A medida que avanza la travesía, el protagonista enfrenta situaciones límite relacionadas con el miedo, la supervivencia y lo desconocido. Edgar Allan Poe construye una atmósfera inquietante donde realidad y fantasía se mezclan constantemente. También aparecen elementos psicológicos y simbólicos que intensifican la sensación de incertidumbre. La narración combina aventura marítima y terror mediante un estilo intenso y descriptivo. La obra es considerada uno de los relatos más originales e influyentes de Poe.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Hop Frog',
'El relato cuenta la historia de Hop-Frog, un bufón enano que vive en la corte de un rey cruel y despiadado. Constantemente humillado debido a su condición física y obligado a divertir a la nobleza, el protagonista soporta abusos que afectan profundamente su dignidad y tranquilidad. Sin embargo, cuando el monarca decide ridiculizar también a Trippetta, la única amiga de Hop-Frog, el personaje comienza a planear una compleja y aterradora venganza. Edgar Allan Poe construye una atmósfera oscura donde el resentimiento y la humillación acumulada conducen a un desenlace brutal e inesperado. El relato explora temas relacionados con el abuso de poder, la violencia psicológica y la justicia personal. También destaca la inteligencia y capacidad estratégica del protagonista frente a quienes lo menosprecian. La narración combina terror, ironía y tensión psicológica mediante un estilo preciso y perturbador.',
2);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Narraciones extraordinarias',
'La obra reúne algunos de los relatos más célebres de Edgar Allan Poe, considerados fundamentales dentro de la literatura de terror, misterio y suspenso psicológico. A través de distintos cuentos, el autor explora obsesiones humanas relacionadas con la locura, la muerte, la culpa y el miedo. Los personajes suelen enfrentarse a situaciones extremas que revelan la fragilidad de la mente y los límites de la razón. La atmósfera inquietante y el uso magistral del suspenso convierten cada relato en una experiencia intensa y perturbadora. También aparecen elementos detectivescos y reflexiones filosóficas que enriquecen las historias. El libro destaca por la profundidad psicológica de sus personajes y la originalidad de sus tramas. La obra tuvo una enorme influencia en la literatura fantástica y policial posterior.',
2);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Viajes de Marco Polo',
'El libro recoge las experiencias y relatos de viaje del explorador veneciano Marco Polo durante sus recorridos por Asia en la Edad Media. A través de descripciones detalladas de ciudades, culturas, costumbres y riquezas desconocidas para Europa, la obra ofrece una visión fascinante del mundo oriental. El relato incluye encuentros con distintos pueblos y referencias al imperio mongol bajo el gobierno de Kublai Kan. También se describen rutas comerciales, tradiciones y paisajes que despertaron la imaginación de generaciones de lectores y exploradores. La narración mezcla observaciones históricas con elementos legendarios y maravillosos. El texto posee un enorme valor histórico y cultural como testimonio de los intercambios entre Oriente y Occidente. La obra influyó profundamente en la expansión geográfica y comercial europea.',
7);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Kiwi',
'La novela desarrolla una historia sensible y cercana centrada en personajes que enfrentan conflictos emocionales, familiares y sociales mientras buscan comprender su lugar en el mundo. A través de situaciones cotidianas y momentos de reflexión, el relato aborda temas relacionados con la amistad, la identidad y el crecimiento personal. Los protagonistas deben aprender a convivir con sus inseguridades y descubrir nuevas formas de relacionarse con los demás. También aparecen enseñanzas vinculadas a la empatía y la importancia de aceptar las diferencias individuales. La narración utiliza un lenguaje sencillo y emotivo que facilita la conexión con lectores jóvenes. El desarrollo de los personajes permite observar cambios emocionales significativos a lo largo de la historia. La obra transmite una mirada humana y esperanzadora sobre la adolescencia.',
1);

INSERT INTO wm_books (title, summary, genre_id) VALUES
('Alsino',
'La novela cuenta la historia de Alsino, un niño campesino que sueña obsesivamente con volar como las aves que observa en el cielo. Después de sufrir un accidente, el protagonista desarrolla una extraña deformación física que le otorga la apariencia de poseer alas, transformando profundamente su relación con el mundo y con quienes lo rodean. A través de esta figura simbólica, la obra reflexiona sobre la libertad, la imaginación y el deseo humano de trascender las limitaciones de la realidad. El relato mezcla elementos poéticos, sociales y fantásticos dentro de un ambiente rural chileno. También se exploran las injusticias sociales y las dificultades de la vida campesina. La narración posee un tono lírico y profundamente simbólico. La obra es considerada una de las novelas más importantes de la literatura chilena.',
1);



INSERT INTO wm_news (title, subtitle, body) VALUES
('Assassin’s Creed Valhalla, aventura vikinga',
 'Explora Inglaterra como un vikingo',
 'Assassin’s Creed Valhalla transporta a los jugadores al siglo IX, donde encarnan a Eivor, un guerrero vikingo. Con un mundo abierto lleno de exploración, combates y decisiones que afectan la historia, el juego busca combinar acción y narrativa histórica para los fanáticos de la saga.'),

('Cyberpunk 2077 sigue evolucionando',
 'Night City recibe mejoras y nuevas historias',
 'Cyberpunk 2077 ha logrado reinventarse tras su lanzamiento inicial, ofreciendo una experiencia más pulida y profunda en la icónica Night City. Con gráficos mejorados, misiones ampliadas y correcciones de bugs, los jugadores pueden sumergirse en un mundo futurista lleno de intrigas, tecnología avanzada y decisiones que afectan la historia. Cada actualización refuerza la narrativa y la libertad de exploración, manteniendo a Cyberpunk como un referente del RPG de mundo abierto en un entorno distópico y vibrante.'),

('Horizon continúa su aventura épica',
 'La saga de Aloy evoluciona con nuevos horizontes',
 'Horizon sigue cautivando a los jugadores con su mezcla de acción, exploración y narrativa envolvente. Con impresionantes paisajes y máquinas robóticas que desafían la imaginación, la saga ofrece una experiencia inmersiva única. Cada entrega expande la historia de Aloy, introduciendo nuevos territorios, enemigos y desafíos, manteniendo la esencia de aventura y descubrimiento que convirtió a Horizon en un referente de los RPG de mundo abierto modernos.'),

('Assassin’s Creed celebra su legado',
 'La franquicia que cambió los videojuegos de acción y aventuras',
 'La saga Assassin’s Creed, lanzada por primera vez en 2007, ha marcado un antes y un después en los videojuegos de mundo abierto. Con sus historias de conspiraciones históricas y exploración detallada de diferentes épocas, se ha ganado un lugar en el corazón de millones de jugadores alrededor del mundo. Cada entrega combina acción, sigilo y narrativa, manteniendo viva la esencia de la hermandad de asesinos a lo largo de los años.'),

('Oblivion regresa con Howard Legacy',
 'Una nueva versión que revitaliza el clásico RPG',
 'El remake Oblivion: HowardLegacy trae de vuelta la magia del clásico RPG de mundo abierto. Con gráficos actualizados y mejoras en la jugabilidad, los jugadores pueden explorar Tamriel con un nivel de detalle nunca antes visto. Esta versión conserva la narrativa rica y las misiones envolventes que hicieron famoso al título, ofreciendo tanto a fans antiguos como a nuevos jugadores la oportunidad de redescubrir la aventura épica en la tierra de los elfos, humanos y criaturas míticas.'),

('Hunter x Hunter sigue cautivando generaciones',
 'Aventuras, amistad, desafíos sin fin y el poder del NEN',
 'Hunter x Hunter es una saga que combina acción, estrategia y narrativa profunda, llevando a los espectadores a un mundo donde cazadores profesionales exploran territorios desconocidos y enfrentan desafíos únicos. Con personajes memorables, giros inesperados y una constante evolución de las habilidades de los protagonistas, la serie mantiene a los fans al borde del asiento. Cada arco amplía la historia, explorando la amistad, la ambición y los límites humanos, consolidando a Hunter x Hunter como un referente del anime moderno.'),

('Final Fantasy VII Remake: La épica historia regresa.',
 'La primera parte del remake revive el clásico de 1997 con gráficos impresionantes y un enfoque narrativo renovado.',
 'Square Enix ha vuelto a capturar la magia del icónico Final Fantasy VII con su remake, ofreciendo a los jugadores una experiencia completamente renovada mientras mantienen la esencia que hizo del original un clásico. La primera parte del remake se centra en la ciudad de Midgar, expandiendo la historia y los personajes con detalles y profundidad inéditos.

Los fans se maravillan con los gráficos modernos, el sistema de combate híbrido que mezcla acción y estrategia por turnos, y la banda sonora remasterizada que trae nostalgia y emoción. Aunque solo cubre la primera sección del juego original, los desarrolladores prometen que las siguientes partes continuarán con la misma fidelidad y expansión narrativa, manteniendo a los jugadores ansiosos por la próxima entrega.

Con un enfoque en la historia, los personajes y la jugabilidad, Final Fantasy VII Remake no solo rinde homenaje al título original, sino que también introduce el mundo a una nueva generación de jugadores, consolidándose como una de las experiencias RPG más destacadas de los últimos años.'),

('Elden Ring anuncia expansión sorpresa con nuevas regiones y jefes colosales.',
 'FromSoftware revela contenido inédito para Elden Ring que ampliará el mapa, incorporará desafiantes mazmorras y profundizará en el misterio de las Tierras Intermedias con nuevas líneas argumentales.',
 'Elden Ring vuelve a acaparar titulares tras el anuncio de una expansión sorpresa que promete ampliar significativamente la experiencia original. El estudio japonés FromSoftware confirmó que el nuevo contenido incluirá regiones completamente inéditas, enemigos nunca antes vistos y jefes de escala monumental que pondrán a prueba incluso a los jugadores más veteranos.

Según los primeros detalles, la expansión profundizará en el trasfondo de las Tierras Intermedias, explorando historias paralelas vinculadas al legado de los semidioses y a los fragmentos restantes del Círculo de Elden. También se introducirán nuevas armas, hechizos y mecánicas de combate que ampliarán las posibilidades de personalización.

Desde su lanzamiento en 2022, el título se consolidó como uno de los RPG de acción más influyentes de la década, gracias a su mundo abierto desafiante y su narrativa fragmentada. Con esta nueva expansión, el estudio busca revitalizar la comunidad y ofrecer retos aún más exigentes para quienes ya dominaron sus secretos.

La fecha de lanzamiento y el nombre oficial del contenido adicional se anunciarán próximamente, pero la expectativa entre los seguidores ya es enorme.'),

('Helldivers 2 recibe nueva ofensiva.',
 'Un parche masivo añade enemigos, armas y un bioma extremo para veteranos',
 'La guerra galáctica se intensifica. Helldivers 2 ha lanzado una actualización de gran magnitud que introduce una nueva ofensiva enemiga, poniendo a prueba incluso a los escuadrones más experimentados. El parche incluye una facción invasora con habilidades adaptativas que obligarán a los jugadores a replantear sus estrategias en el campo de batalla.

Entre las novedades destacan tres armas inéditas: un rifle de pulsos con daño en cadena, una escopeta incendiaria de corto alcance y un lanzador táctico capaz de desplegar cobertura portátil. Además, se han añadido estratagemas defensivas mejoradas, permitiendo solicitar drones de apoyo que patrullan zonas específicas durante tiempo limitado.

El nuevo bioma, un planeta volcánico azotado por tormentas electromagnéticas, añade peligros ambientales dinámicos. Erupciones repentinas, visibilidad reducida y fallos temporales en el equipamiento elevan la tensión en cada misión. La coordinación y la comunicación vuelven a ser claves para sobrevivir.

La comunidad ha reaccionado con entusiasmo ante el aumento de dificultad y la variedad de desafíos. Los desarrolladores han confirmado que este contenido forma parte de un plan de soporte continuo, con más eventos dinámicos y recompensas exclusivas programadas para las próximas semanas.

La Super Tierra necesita refuerzos. Y esta vez, la batalla será más brutal que nunca.'),

('La saga nórdica de God of War brilla',
 'Kratos y Atreus redefinen la acción en PS4 y PS5',
 'La saga nórdica de God of War y su secuela God of War Ragnarök marcó un antes y un después para la franquicia en PlayStation. Tras años centrada en la mitología griega, la serie reinventó su fórmula con una narrativa más madura, un combate renovado y un enfoque más íntimo en la relación entre Kratos y su hijo Atreus.

Lanzado originalmente en PS4, God of War (2018) sorprendió con su cámara en plano secuencia, su sistema de progresión RPG ligero y una exploración más abierta ambientada en los reinos de la mitología nórdica. El Leviatán, el hacha icónica de Kratos, se convirtió en símbolo de esta nueva etapa, combinando brutalidad y precisión táctica.

Por su parte, God of War Ragnarök elevó la apuesta en PS4 y especialmente en PS5, aprovechando la potencia de la nueva generación para ofrecer tiempos de carga casi inexistentes, combates más fluidos y una dirección artística aún más ambiciosa. La historia profundiza en el destino profetizado de Atreus y el inminente Ragnarök, enfrentando a los protagonistas a dioses como Thor y Odín.

La crítica y los jugadores coincidieron en destacar la evolución emocional de Kratos, ahora más humano y reflexivo, sin perder la intensidad que caracteriza a la saga. La etapa nórdica no solo revitalizó la franquicia, sino que consolidó a God of War como uno de los pilares narrativos y técnicos de PlayStation en la última década.'),

('Jedi Survivor expande la Fuerza.',
 'Cal Kestis regresa con combate más profundo y nuevos mundos.',
 'La galaxia vuelve a arder en Star Wars Jedi: Survivor, la esperada secuela de Star Wars Jedi: Fallen Order desarrollada por Respawn Entertainment. Ambientado cinco años después de los eventos anteriores, el título muestra a un Cal Kestis más experimentado, pero también más perseguido por el Imperio.

El nuevo capítulo amplía considerablemente los escenarios, ofreciendo planetas más abiertos, rutas opcionales y secretos que recompensan la exploración. El sistema de combate evoluciona con cinco posturas de sable de luz intercambiables, permitiendo adaptar el estilo de lucha a cada enfrentamiento, desde duelos rápidos hasta combates más pesados y estratégicos.

En PS5 y consolas de nueva generación, el juego destaca por su carga casi instantánea, mejoras gráficas y uso del control háptico para transmitir la intensidad de los choques de sable. Además, la narrativa profundiza en el conflicto interno de Cal, explorando temas como la resistencia, el sacrificio y el peso del legado Jedi.

Con una historia más oscura y ambiciosa, Jedi: Survivor consolida la saga como una de las adaptaciones más sólidas del universo Star Wars en videojuegos, combinando acción cinematográfica con exploración y desarrollo de personaje al más puro estilo Jedi.'),

('GTA V sigue dominando el mercado.',
 'El clásico de Rockstar mantiene su éxito en nueva generación.',
 'Más de una década después de su lanzamiento original, Grand Theft Auto V continúa siendo uno de los títulos más influyentes y vendidos de la industria. Desarrollado por Rockstar Games, el juego ha logrado mantenerse vigente gracias a constantes actualizaciones y su exitosa vertiente online.

En PS4 y PS5, GTA V ofrece mejoras visuales, mayor fluidez y tiempos de carga reducidos, especialmente en la versión optimizada para nueva generación. Los jugadores pueden elegir entre distintos modos gráficos que priorizan rendimiento o calidad visual, elevando la experiencia en la ciudad de Los Santos.

Por su parte, Grand Theft Auto Online sigue expandiéndose con nuevos golpes, vehículos, negocios y eventos semanales que mantienen activa a una comunidad masiva. Esta fórmula de contenido constante ha sido clave para que el juego continúe generando cifras récord año tras año.

Mientras la expectativa crece por el futuro de la franquicia, GTA V demuestra que su combinación de mundo abierto, narrativa criminal y libertad total sigue siendo una referencia dentro del género.');


INSERT INTO wm_news_gallery (alt, url, news_id) VALUES
('Eivor','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1770939914/news/uwe28f3sei5saumlfv7o.webp',1),
('Valhalla','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1770939915/news/u4ygl2bb6nql1y5xtsru.jpg',1),
('Eivor','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1770941204/news/wuvh9nrza7ok9r1wclli.jpg',1),
('Valerie','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1770939716/news/jyhvpdp6qyfglg23dij0.webp',2),
('Vincent','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1770939718/news/t91p3kpx2cy1ypnkft0o.jpg',2),
('Cyberpunk 77','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1770939719/news/gcruoldoxvnvnoybmdlb.webp',2),
('Aloy','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1770860243/news/ruatveggaye123paqwbv.webp',3),
('Aloy','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1770939388/news/f8bxmp98ctc5lfzr5yif.webp',3),
('Horizon','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1770939389/news/srveg87fsk5ybd8iiwz6.webp',3),
('Kassandra','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1770935727/news/v9oxvx7lu7owst444k4h.jpg',4),
('Alexio','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1770939522/news/uozjmpr2yowenri4jfrs.webp',4),
('Odessy','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1770939523/news/gujaxilkk854bws6vlon.jpg',4),
('Oblivion','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1770936527/news/lendveswlwbuyeivubbj.webp',5),
('Hogwarts','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1770936528/news/awlnzgejc6yhhmh6vxg5.webp',5),
('Oblivion','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1770940063/news/rgrqye7kwl8lhdad9rfk.jpg',5),
('Gen''ei Ryodan','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1770940393/news/yqoteucqnlwmdu3lt8dk.webp',6),
('Gon','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1770940394/news/mfr18khtqxia0kica1co.webp',6),
('Killua','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1770940395/news/qg93qwmsovk2nphxb6nc.webp',6),
('Cloud Strife','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1771257298/news/pgxw8jpjgiselqsuw4di.webp',7),
('Tifa Lockhart','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1771257299/news/fg9pfhzxk287wvkok6c6.webp',7),
('Sephiroth','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1771257300/news/pzkqszs9ysasdmysjayl.webp',7),
('Elden Ring','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1771823372/news/nbsnfynpbawekafceblx.webp',8),
('Elden Ring','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1771823372/news/driwxm2zqnpousc2rytc.webp',8),
('Elden Ring','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1771823373/news/re10mxytego7w8bm0yzy.webp',8),
('Helldivers 2','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1771885339/news/aa7ceeyz5v6bkbcqjowt.webp',9),
('Helldivers 2','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1771885341/news/i9co1om3cc7tcn09abrc.webp',9),
('Helldivers 2','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1771885342/news/pxvfuhf6webhyidlgigm.webp',9),
('Kratos','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1771887680/news/gf83vsctlnzuupdsyrkt.webp',10),
('Ragnarok','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1771887682/news/odoxyx9zpwkmaa66m7nk.webp',10),
('God Of War','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1771951578/news/cijm92qqwa79xqqouwn9.webp',10),
('Jedi Survivor','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1771888048/news/kpjxbetb7rze9j0jyu9m.webp',11),
('Jedi Survivor','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1771888049/news/mgulzfkp4xvefmtysrn1.webp',11),
('Cal Kestis','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1771888050/news/fuvvnesjs0jx8bdhw7zn.webp',11),
('GTA 5','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1771888405/news/bmillgcolenf9kfwc7kv.webp',12),
('GTA 5','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1771888406/news/bvzm5cwazjbyvdfriawq.webp',12),
('GTA 5','https://res.cloudinary.com/dsvkbe0mc/image/upload/v1771888407/news/lhjoz9ethysntixpm373.webp',12);


INSERT INTO wm_authors (name) VALUES ('Alejandra Costamagna');
INSERT INTO wm_authors (name) VALUES ('Alfredo Gómez Cerdá');
INSERT INTO wm_authors (name) VALUES ('Ana María Machado');
INSERT INTO wm_authors (name) VALUES ('Andrés Montero');
INSERT INTO wm_authors (name) VALUES ('Antonio Machado');
INSERT INTO wm_authors (name) VALUES ('Armando Uribe');
INSERT INTO wm_authors (name) VALUES ('Arturo Pérez-Reverte');
INSERT INTO wm_authors (name) VALUES ('Beatriz Concha');
INSERT INTO wm_authors (name) VALUES ('Bram Stoker');
INSERT INTO wm_authors (name) VALUES ('Carmen Martín Gaite');
INSERT INTO wm_authors (name) VALUES ('Carlo Collodi');
INSERT INTO wm_authors (name) VALUES ('Carmen Lyra');
INSERT INTO wm_authors (name) VALUES ('Ciro Alegría');
INSERT INTO wm_authors (name) VALUES ('Claudio Aguilera');
INSERT INTO wm_authors (name) VALUES ('Daniel Defoe');
INSERT INTO wm_authors (name) VALUES ('David Almond');
INSERT INTO wm_authors (name) VALUES ('Elvira Lindo');
INSERT INTO wm_authors (name) VALUES ('Emilio Salgari');
INSERT INTO wm_authors (name) VALUES ('Federico García Lorca');
INSERT INTO wm_authors (name) VALUES ('Felipe Jordán Jiménez');
INSERT INTO wm_authors (name) VALUES ('Francisco Hinojosa');
INSERT INTO wm_authors (name) VALUES ('Gianni Rodari');
INSERT INTO wm_authors (name) VALUES ('Gonzalo Rojas');
INSERT INTO wm_authors (name) VALUES ('Gustavo Adolfo Bécquer');
INSERT INTO wm_authors (name) VALUES ('H. G. Wells');
INSERT INTO wm_authors (name) VALUES ('Hernán Rivera Letelier');
INSERT INTO wm_authors (name) VALUES ('Hernán del Solar');
INSERT INTO wm_authors (name) VALUES ('Irene Nemirovsky');
INSERT INTO wm_authors (name) VALUES ('Jacqueline Balcells');
INSERT INTO wm_authors (name) VALUES ('Jaime Alfonso Sandoval');
INSERT INTO wm_authors (name) VALUES ('James Matthew Barrie');
INSERT INTO wm_authors (name) VALUES ('Jean de La Fontaine');
INSERT INTO wm_authors (name) VALUES ('Jorge Amado');
INSERT INTO wm_authors (name) VALUES ('Jorge Baradit');
INSERT INTO wm_authors (name) VALUES ('Jorge Luis Borges');
INSERT INTO wm_authors (name) VALUES ('José Donoso');
INSERT INTO wm_authors (name) VALUES ('José María Arguedas');
INSERT INTO wm_authors (name) VALUES ('Juan Emar');
INSERT INTO wm_authors (name) VALUES ('Julio Cortázar');
INSERT INTO wm_authors (name) VALUES ('Karin Slaughter');
INSERT INTO wm_authors (name) VALUES ('Kerstin Gier');
INSERT INTO wm_authors (name) VALUES ('Laura Devetach');
INSERT INTO wm_authors (name) VALUES ('León Tolstói');
INSERT INTO wm_authors (name) VALUES ('Lina Meruane');
INSERT INTO wm_authors (name) VALUES ('Lope de Vega');
INSERT INTO wm_authors (name) VALUES ('Manuel Peña Muñoz');
INSERT INTO wm_authors (name) VALUES ('María Gripe');
INSERT INTO wm_authors (name) VALUES ('María José Ferrada');
INSERT INTO wm_authors (name) VALUES ('Mario Levrero');
INSERT INTO wm_authors (name) VALUES ('Miguel de Cervantes');
INSERT INTO wm_authors (name) VALUES ('Miguel Delibes');
INSERT INTO wm_authors (name) VALUES ('Nicanor Parra');
INSERT INTO wm_authors (name) VALUES ('Nicolás Guillén');
INSERT INTO wm_authors (name) VALUES ('Nikolái Gógol');
INSERT INTO wm_authors (name) VALUES ('Patricio Manns');
INSERT INTO wm_authors (name) VALUES ('Pedro Prado');
INSERT INTO wm_authors (name) VALUES ('Pepe Pelayo');
INSERT INTO wm_authors (name) VALUES ('Rafael Pombo');
INSERT INTO wm_authors (name) VALUES ('Ray Bradbury');
INSERT INTO wm_authors (name) VALUES ('René Goscinny');
INSERT INTO wm_authors (name) VALUES ('Ricardo Palma');
INSERT INTO wm_authors (name) VALUES ('Rosa Montero');
INSERT INTO wm_authors (name) VALUES ('Rubem Fonseca');
INSERT INTO wm_authors (name) VALUES ('Saki');
INSERT INTO wm_authors (name) VALUES ('Sergio Gómez');
INSERT INTO wm_authors (name) VALUES ('Sergio Vodanovic');
INSERT INTO wm_authors (name) VALUES ('Stefano Bordiglioni');
INSERT INTO wm_authors (name) VALUES ('Stieg Larsson');
INSERT INTO wm_authors (name) VALUES ('Teresa Wilms Montt');
INSERT INTO wm_authors (name) VALUES ('Tirso de Molina');
INSERT INTO wm_authors (name) VALUES ('Umberto Eco');
INSERT INTO wm_authors (name) VALUES ('Vicente Huidobro');
INSERT INTO wm_authors (name) VALUES ('Violeta Parra');
INSERT INTO wm_authors (name) VALUES ('Virginia Woolf');
INSERT INTO wm_authors (name) VALUES ('Wilhelm Grimm');
INSERT INTO wm_authors (name) VALUES ('Yuri Herrera');
INSERT INTO wm_authors (name) VALUES ('Zoé Valdés');
INSERT INTO wm_authors (name) VALUES ('Louisa May Alcott');
INSERT INTO wm_authors (name) VALUES ('Alicia Morel');
INSERT INTO wm_authors (name) VALUES ('Ana María Güiraldes');
INSERT INTO wm_authors (name) VALUES ('Antonio Skármeta');
INSERT INTO wm_authors (name) VALUES ('Baldomero Lillo');
INSERT INTO wm_authors (name) VALUES ('Camilla Läckberg');
INSERT INTO wm_authors (name) VALUES ('Charles Dickens');
INSERT INTO wm_authors (name) VALUES ('C. S. Lewis');
INSERT INTO wm_authors (name) VALUES ('Danilo Kis');
INSERT INTO wm_authors (name) VALUES ('Delia Owens');
INSERT INTO wm_authors (name) VALUES ('Edgar Allan Poe');
INSERT INTO wm_authors (name) VALUES ('Emilia Pardo Bazán');
INSERT INTO wm_authors (name) VALUES ('Enid Blyton');
INSERT INTO wm_authors (name) VALUES ('Erich Kästner');
INSERT INTO wm_authors (name) VALUES ('Francisco Coloane');
INSERT INTO wm_authors (name) VALUES ('Franz Kafka');
INSERT INTO wm_authors (name) VALUES ('Gabriela Mistral');
INSERT INTO wm_authors (name) VALUES ('Gabriel García Márquez');
INSERT INTO wm_authors (name) VALUES ('George Orwell');
INSERT INTO wm_authors (name) VALUES ('Guy de Maupassant');
INSERT INTO wm_authors (name) VALUES ('Hans Christian Andersen');
INSERT INTO wm_authors (name) VALUES ('Héctor Hidalgo');
INSERT INTO wm_authors (name) VALUES ('Hermann Hesse');
INSERT INTO wm_authors (name) VALUES ('Homero');
INSERT INTO wm_authors (name) VALUES ('Isabel Allende');
INSERT INTO wm_authors (name) VALUES ('Jack London');
INSERT INTO wm_authors (name) VALUES ('J. K. Rowling');
INSERT INTO wm_authors (name) VALUES ('J. R. R. Tolkien');
INSERT INTO wm_authors (name) VALUES ('José Mauro de Vasconcelos');
INSERT INTO wm_authors (name) VALUES ('José Ortega y Gasset');
INSERT INTO wm_authors (name) VALUES ('Juan Ramón Jiménez');
INSERT INTO wm_authors (name) VALUES ('Julio Verne');
INSERT INTO wm_authors (name) VALUES ('Khalil Gibran');
INSERT INTO wm_authors (name) VALUES ('Laura Gallego');
INSERT INTO wm_authors (name) VALUES ('Lewis Carroll');
INSERT INTO wm_authors (name) VALUES ('Luis Sepúlveda');
INSERT INTO wm_authors (name) VALUES ('Marcela Paz');
INSERT INTO wm_authors (name) VALUES ('Mario Benedetti');
INSERT INTO wm_authors (name) VALUES ('Mario Vargas Llosa');
INSERT INTO wm_authors (name) VALUES ('Molière');
INSERT INTO wm_authors (name) VALUES ('Oscar Wilde');
INSERT INTO wm_authors (name) VALUES ('Pablo Neruda');
INSERT INTO wm_authors (name) VALUES ('Pearl S. Buck');
INSERT INTO wm_authors (name) VALUES ('Robert Louis Stevenson');
INSERT INTO wm_authors (name) VALUES ('Roald Dahl');
INSERT INTO wm_authors (name) VALUES ('Selma Lagerlöf');
INSERT INTO wm_authors (name) VALUES ('Stephen King');
INSERT INTO wm_authors (name) VALUES ('Thomas Mann');
INSERT INTO wm_authors (name) VALUES ('Victor Hugo');
INSERT INTO wm_authors (name) VALUES ('William Shakespeare');
INSERT INTO wm_authors (name) VALUES ('Ziraldo');
INSERT INTO wm_authors (name) VALUES ('Ana Frank');
INSERT INTO wm_authors (name) VALUES ('Antoine de Saint-Exupéry');
INSERT INTO wm_authors (name) VALUES ('Arthur Conan Doyle');
INSERT INTO wm_authors (name) VALUES ('Astrid Lindgren');
INSERT INTO wm_authors (name) VALUES ('Carlos Ruiz Zafón');
INSERT INTO wm_authors (name) VALUES ('Cecilia Beuchat');
INSERT INTO wm_authors (name) VALUES ('Christine Nöstlinger');
INSERT INTO wm_authors (name) VALUES ('Cornelia Funke');
INSERT INTO wm_authors (name) VALUES ('Eduardo Galeano');
INSERT INTO wm_authors (name) VALUES ('Ema Wolf');
INSERT INTO wm_authors (name) VALUES ('Fernando Savater');
INSERT INTO wm_authors (name) VALUES ('Gloria Fuertes');
INSERT INTO wm_authors (name) VALUES ('Graciela Montes');
INSERT INTO wm_authors (name) VALUES ('Horacio Quiroga');
INSERT INTO wm_authors (name) VALUES ('Jordi Sierra i Fabra');
INSERT INTO wm_authors (name) VALUES ('José Martí');
INSERT INTO wm_authors (name) VALUES ('Katherine Paterson');
INSERT INTO wm_authors (name) VALUES ('Lygia Bojunga');
INSERT INTO wm_authors (name) VALUES ('Manuel Rojas');
INSERT INTO wm_authors (name) VALUES ('María Elena Walsh');
INSERT INTO wm_authors (name) VALUES ('Michael Ende');
INSERT INTO wm_authors (name) VALUES ('Mónica Hughes');
INSERT INTO wm_authors (name) VALUES ('Óscar Hahn');
INSERT INTO wm_authors (name) VALUES ('Paula Danziger');
INSERT INTO wm_authors (name) VALUES ('Ricardo Güiraldes');
INSERT INTO wm_authors (name) VALUES ('Rudyard Kipling');
INSERT INTO wm_authors (name) VALUES ('Shel Silverstein');
INSERT INTO wm_authors (name) VALUES ('Teresa Calderón');
INSERT INTO wm_authors (name) VALUES ('Tomi Ungerer');
INSERT INTO wm_authors (name) VALUES ('Walter Scott');
INSERT INTO wm_authors (name) VALUES ('Yolanda Reyes');

INSERT INTO wm_editorials (name) VALUES ('0Q0 Editora');
INSERT INTO wm_editorials (name) VALUES ('Academia Chilena de la Lengua');
INSERT INTO wm_editorials (name) VALUES ('Aguilar Chilena de Ediciones');
INSERT INTO wm_editorials (name) VALUES ('Alfaguara');
INSERT INTO wm_editorials (name) VALUES ('Alhambra');
INSERT INTO wm_editorials (name) VALUES ('Arrayán Editores');
INSERT INTO wm_editorials (name) VALUES ('Ceibo Ediciones');
INSERT INTO wm_editorials (name) VALUES ('Centro Gráfico');
INSERT INTO wm_editorials (name) VALUES ('Ciertopez');
INSERT INTO wm_editorials (name) VALUES ('Clasicos Juveniles Tacora');
INSERT INTO wm_editorials (name) VALUES ('Comercial Atelí y Cía');
INSERT INTO wm_editorials (name) VALUES ('Comunicaciones Monicaco');
INSERT INTO wm_editorials (name) VALUES ('Círculo de Lectores');
INSERT INTO wm_editorials (name) VALUES ('Diario El País S.L');
INSERT INTO wm_editorials (name) VALUES ('Edebé');
INSERT INTO wm_editorials (name) VALUES ('Ediciones Alfaguara');
INSERT INTO wm_editorials (name) VALUES ('Ediciones Altaya');
INSERT INTO wm_editorials (name) VALUES ('Ediciones Andrés Bello');
INSERT INTO wm_editorials (name) VALUES ('Ediciones B');
INSERT INTO wm_editorials (name) VALUES ('Ediciones Biblioteca Nacional');
INSERT INTO wm_editorials (name) VALUES ('Ediciones Ceres');
INSERT INTO wm_editorials (name) VALUES ('Ediciones Columba');
INSERT INTO wm_editorials (name) VALUES ('Ediciones Desidia');
INSERT INTO wm_editorials (name) VALUES ('Ediciones Destino');
INSERT INTO wm_editorials (name) VALUES ('Ediciones Ekaré');
INSERT INTO wm_editorials (name) VALUES ('Ediciones Grijalbo');
INSERT INTO wm_editorials (name) VALUES ('Ediciones Inubicalistas');
INSERT INTO wm_editorials (name) VALUES ('Ediciones Marcela Paz');
INSERT INTO wm_editorials (name) VALUES ('Ediciones Municipalidad de La Serena');
INSERT INTO wm_editorials (name) VALUES ('Editorial Amanuta');
INSERT INTO wm_editorials (name) VALUES ('Editorial Andrés Bello');
INSERT INTO wm_editorials (name) VALUES ('Editorial Anaya');
INSERT INTO wm_editorials (name) VALUES ('Editorial Atlántida');
INSERT INTO wm_editorials (name) VALUES ('Editorial Cervantes');
INSERT INTO wm_editorials (name) VALUES ('Editorial Debate');
INSERT INTO wm_editorials (name) VALUES ('Editorial Diana');
INSERT INTO wm_editorials (name) VALUES ('Editorial Don Bosco');
INSERT INTO wm_editorials (name) VALUES ('Editorial Ercilla');
INSERT INTO wm_editorials (name) VALUES ('Editorial Estrada');
INSERT INTO wm_editorials (name) VALUES ('Editorial Fondo de Cultura Económica');
INSERT INTO wm_editorials (name) VALUES ('Editorial Forja');
INSERT INTO wm_editorials (name) VALUES ('Editorial Granica');
INSERT INTO wm_editorials (name) VALUES ('Editorial Juventud');
INSERT INTO wm_editorials (name) VALUES ('Editorial LOM');
INSERT INTO wm_editorials (name) VALUES ('Editorial Norma');
INSERT INTO wm_editorials (name) VALUES ('Editorial Océano');
INSERT INTO wm_editorials (name) VALUES ('Editorial Planeta');
INSERT INTO wm_editorials (name) VALUES ('Editorial Santillana');
INSERT INTO wm_editorials (name) VALUES ('Editorial Universitaria');
INSERT INTO wm_editorials (name) VALUES ('Emecé Editores');
INSERT INTO wm_editorials (name) VALUES ('Ercilla');
INSERT INTO wm_editorials (name) VALUES ('Everest');
INSERT INTO wm_editorials (name) VALUES ('Fondo de Cultura Económica');
INSERT INTO wm_editorials (name) VALUES ('Grupo Editorial Norma');
INSERT INTO wm_editorials (name) VALUES ('Impedimenta');
INSERT INTO wm_editorials (name) VALUES ('Juventud');
INSERT INTO wm_editorials (name) VALUES ('LOM Ediciones');
INSERT INTO wm_editorials (name) VALUES ('Norma');
INSERT INTO wm_editorials (name) VALUES ('Océano');
INSERT INTO wm_editorials (name) VALUES ('Pehuén Editores');
INSERT INTO wm_editorials (name) VALUES ('Planeta');
INSERT INTO wm_editorials (name) VALUES ('Random House Mondadori');
INSERT INTO wm_editorials (name) VALUES ('Santillana');
INSERT INTO wm_editorials (name) VALUES ('SM');
INSERT INTO wm_editorials (name) VALUES ('Sudamericana');
INSERT INTO wm_editorials (name) VALUES ('Universitaria');
INSERT INTO wm_editorials (name) VALUES ('Vicens Vives');
INSERT INTO wm_editorials (name) VALUES ('Zig-Zag');
INSERT INTO wm_editorials (name) VALUES ('Origo Ediciones');
INSERT INTO wm_editorials (name) VALUES ('Arrayán');
INSERT INTO wm_editorials (name) VALUES ('Barco de Vapor');
INSERT INTO wm_editorials (name) VALUES ('Bruño');
INSERT INTO wm_editorials (name) VALUES ('Catalonia');
INSERT INTO wm_editorials (name) VALUES ('Cuarto Propio');
INSERT INTO wm_editorials (name) VALUES ('Dolmen Ediciones');
INSERT INTO wm_editorials (name) VALUES ('Ediciones Castillo');
INSERT INTO wm_editorials (name) VALUES ('Ediciones B Chile');
INSERT INTO wm_editorials (name) VALUES ('Ediciones SM');
INSERT INTO wm_editorials (name) VALUES ('El Ateneo');
INSERT INTO wm_editorials (name) VALUES ('Espasa Calpe');
INSERT INTO wm_editorials (name) VALUES ('Euréka');
INSERT INTO wm_editorials (name) VALUES ('HarperCollins');
INSERT INTO wm_editorials (name) VALUES ('Iberoamericana');
INSERT INTO wm_editorials (name) VALUES ('Laberinto');
INSERT INTO wm_editorials (name) VALUES ('Libresa');
INSERT INTO wm_editorials (name) VALUES ('Losada');
INSERT INTO wm_editorials (name) VALUES ('Montena');
INSERT INTO wm_editorials (name) VALUES ('Nascimento');
INSERT INTO wm_editorials (name) VALUES ('Nueva Imagen');
INSERT INTO wm_editorials (name) VALUES ('Panamericana');
INSERT INTO wm_editorials (name) VALUES ('Penguin Random House');
INSERT INTO wm_editorials (name) VALUES ('Pomaire');
INSERT INTO wm_editorials (name) VALUES ('RBA');
INSERT INTO wm_editorials (name) VALUES ('Salamandra');
INSERT INTO wm_editorials (name) VALUES ('Seix Barral');
INSERT INTO wm_editorials (name) VALUES ('Sol y Luna Libros');
INSERT INTO wm_editorials (name) VALUES ('Tajamar Editores');
INSERT INTO wm_editorials (name) VALUES ('Tusquets');
INSERT INTO wm_editorials (name) VALUES ('Universo');
INSERT INTO wm_editorials (name) VALUES ('Verbo Divino');
INSERT INTO wm_editorials (name) VALUES ('Walden Ediciones');
INSERT INTO wm_editorials (name) VALUES ('Zeta');

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
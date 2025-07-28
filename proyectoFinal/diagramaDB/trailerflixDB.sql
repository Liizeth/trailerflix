CREATE TABLE categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    categorias VARCHAR(50) NOT NULL
);

CREATE TABLE genero (
    id_genero INT AUTO_INCREMENT PRIMARY KEY,
    tipo_de_genero VARCHAR(50) NOT NULL
);

CREATE TABLE cartelera (
    id INT AUTO_INCREMENT PRIMARY KEY,
    porter VARCHAR(255) NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    trailer VARCHAR(255), -- opcional
    temporada INT,         -- opcional
    duracion INT,          -- opcional (en minutos, por ejemplo)
    id_genero INT NOT NULL,
    id_categoria INT NOT NULL,
    FOREIGN KEY (id_genero) REFERENCES genero(id_genero),
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
);


CREATE TABLE actores (
    id_actor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL
);

CREATE TABLE reparto (
    id_cartelera INT NOT NULL,
    id_actor INT NOT NULL,
    PRIMARY KEY (id_cartelera, id_actor),
    FOREIGN KEY (id_cartelera) REFERENCES cartelera(id) ON DELETE CASCADE,
    FOREIGN KEY (id_actor) REFERENCES actores(id_actor) ON DELETE CASCADE
);


CREATE TABLE resumen (
    id_cartelera INT PRIMARY KEY,
    texto TEXT NOT NULL,
    FOREIGN KEY (id_cartelera) REFERENCES cartelera(id) ON DELETE CASCADE
);

CREATE TABLE tag (
    id_tag INT AUTO_INCREMENT PRIMARY KEY,
    tag VARCHAR(50) NOT NULL
);

CREATE TABLE cartelera_tag (
    id_cartelera INT NOT NULL,
    id_tag INT NOT NULL,
    PRIMARY KEY (id_cartelera, id_tag),
    FOREIGN KEY (id_cartelera) REFERENCES cartelera(id) ON DELETE CASCADE,
    FOREIGN KEY (id_tag) REFERENCES tag(id_tag) ON DELETE CASCADE
);

USE nombre_de_la_BD;

CREATE TABLE comentario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cartelera INT NOT NULL,
    texto_comentario TEXT,
    calificacion INT CHECK (calificacion BETWEEN 1 AND 10),
    FOREIGN KEY (id_cartelera) REFERENCES cartelera(id)
);

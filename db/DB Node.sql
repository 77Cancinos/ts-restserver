-- Usando MySQL Wokbench
-- Funciona con cualquier DB Relacional

CREATE DATABASE node;
USE node;

CREATE TABLE Usuarios(
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    estado TINYINT NOT NULL -- Este sirve como Booleano (pd: agregar la ,)
    -- createdAt TIMESTAMP, -- Lleva un registro en Node
    -- updatedAt TIMESTAMP -- Lleva un registro en Node
);

ALTER TABLE usuarios ADD createdAt TIMESTAMP, ADD updatedAt TIMESTAMP;

SELECT * FROM usuarios;

INSERT INTO usuarios(nombre, email, estado)
VALUES('Victor Cancinos', '77cancinos@gmail.com', 1);
INSERT INTO usuarios(nombre, email, estado)
VALUES('Maria Solares', 'maria-solares@gmail.com', 1),
	  ('Juan Morales', 'juan-morales@gmail.com', 1);
      
-- DELETE FROM usuarios WHERE id = 8;
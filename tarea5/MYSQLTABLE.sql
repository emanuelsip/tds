CREATE DATABASE apijuegos;

CREATE TABLE filtros (
  id int NOT NULL AUTO_INCREMENT,
  filtro varchar(70) DEFAULT NULL,
  resultado longtext,
  createdAt datetime DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=MyISAM;
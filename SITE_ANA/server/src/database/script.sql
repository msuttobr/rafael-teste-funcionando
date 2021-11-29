CREATE DATABASE sprint3;

USE sprint3;

CREATE TABLE Empresa (
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
	cnpj CHAR(14),
	nomeEmpresa VARCHAR(45),
	senhaEmpresa VARCHAR(45),
	dtInclusao DATETIME DEFAULT NOW()
);

CREATE TABLE Usuario (
	fkEmpresa INT,
	FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nomeUsuario VARCHAR(45),
	email VARCHAR(255),
	senhaUsuario VARCHAR(45)
);
CREATE TABLE Produto (
	idProduto INT PRIMARY KEY AUTO_INCREMENT,
	nomeProduto VARCHAR(45),
	temperatura_min DOUBLE,
	temperatura_max DOUBLE,
	luminosidade_min INT,
	luminosidade_max INT
);

CREATE TABLE Estufa (
	idEstufa INT PRIMARY KEY AUTO_INCREMENT,
	nomeEstufa VARCHAR(45),
	cep CHAR(8),
	cidade VARCHAR(45),
	uf CHAR(2),
	fkEmpresa INT,
	fkProduto INT,
	FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
	FOREIGN KEY (fkProduto) REFERENCES Produto(idProduto)
);


CREATE TABLE Sensor (
	idSensor INT PRIMARY KEY AUTO_INCREMENT,
	tipoSensor VARCHAR(45),
	CHECK (tipoSensor = 'temperatura' OR tipoSensor = 'luminosidade'),
	statusSensor CHAR(1),
	CHECK (statusSensor = 0 OR statusSensor = 1),
	fkEstufa INT,
	FOREIGN KEY (fkEstufa) REFERENCES Estufa(idEstufa)
);
CREATE TABLE LogSensor(
	idLogSensor INT PRIMARY KEY AUTO_INCREMENT,
    mensagem VARCHAR(128),
    fkSensor INT,
    FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor)
);

CREATE TABLE Luminosidade (
	fkSensor INT,
	FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor),
	idLuminosidade INT PRIMARY KEY AUTO_INCREMENT,
	data_hora DATETIME,
	registroLuminosidade INT
);

CREATE TABLE Temperatura (
	fkSensor INT,
	FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor),
	idTemperatura INT,
	PRIMARY KEY (fkSensor, idTemperatura),
	data_hora DATETIME,
	registroTemperatura INT
);

/*
INSERT INTO Produto VALUES(null, 'alface', 21.02, 28.90, 354, 932);
-- apos cadastrar a empresa

INSERT INTO Estufa VALUES(null, 'estufa 1', '08420852', 'são paulo', 'sp', 1, 1);
INSERT INTO Estufa VALUES(null, 'estufa 2', '09630741', 'são paulo', 'sp', 1, 1);
INSERT INTO Estufa VALUES(null, 'estufa 3', '07410963', 'são paulo', 'sp', 1, 1);
INSERT INTO Estufa VALUES(null, 'estufa 4', '01234789', 'são paulo', 'sp', 1, 1);

INSERT INTO Sensor VALUES(null, 'temperatura', '1', 3);
INSERT INTO Sensor VALUES(null, 'luminosidade', '1', 3);
*/
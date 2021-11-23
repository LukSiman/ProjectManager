DROP DATABASE IF EXISTS `project-manager`;
CREATE DATABASE `project-manager`;
USE `project-manager`;

DROP TABLE IF EXISTS project;

-- project table
CREATE TABLE project(
id INTEGER PRIMARY KEY AUTO_INCREMENT,
`name` VARCHAR(50) NOT NULL,
start_date DATE NOT NULL DEFAULT(CURRENT_DATE()),
end_date DATE,
`description` TEXT
);

SELECT * FROM `project-manager`.project;
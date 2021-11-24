DROP DATABASE IF EXISTS `project-manager`;
CREATE DATABASE `project-manager`;
USE `project-manager`;

DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS project_images;

-- project table
CREATE TABLE project(
id INTEGER PRIMARY KEY AUTO_INCREMENT,
`name` VARCHAR(50) NOT NULL,
start_date DATE NOT NULL DEFAULT(CURRENT_DATE()),
end_date DATE,
`description` TEXT
);


-- project images table
CREATE TABLE project_images(
id INTEGER PRIMARY KEY AUTO_INCREMENT,
image_url VARCHAR(255) NOT NULL,
project_id INTEGER NOT NULL,
FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE
);

SELECT * FROM `project-manager`.project;
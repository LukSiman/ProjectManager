DROP DATABASE IF EXISTS `project-manager`;
CREATE DATABASE `project-manager`;
USE `project-manager`;

DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS project_images;

-- project table
CREATE TABLE projects(
id INTEGER PRIMARY KEY AUTO_INCREMENT,
`name` VARCHAR(50) NOT NULL,
start_date DATE NOT NULL DEFAULT(CURRENT_DATE()),
end_date DATE,
`length` INTEGER,
`description` TEXT
);


-- project images table
CREATE TABLE project_images(
id INTEGER PRIMARY KEY AUTO_INCREMENT,
image_url VARCHAR(255) NOT NULL,
project_id INTEGER NOT NULL,
KEY fk_project (project_id),
CONSTRAINT fk_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

SELECT * FROM `project-manager`.projects;
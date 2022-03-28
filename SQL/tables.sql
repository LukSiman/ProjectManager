DROP DATABASE IF EXISTS `project-manager`;
CREATE DATABASE `project-manager`;
USE `project-manager`;

DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS project_images;
DROP TABLE IF EXISTS project_tasks;

-- project table
CREATE TABLE projects(
id INTEGER PRIMARY KEY AUTO_INCREMENT,
`name` VARCHAR(50) NOT NULL,
start_date DATE NOT NULL DEFAULT(CURRENT_DATE()),
end_date DATE,
`length` INTEGER,
`description` TEXT,
`status` VARCHAR(50) NOT NULL
);


-- project images table
CREATE TABLE project_images(
image_id INTEGER PRIMARY KEY AUTO_INCREMENT,
image_url VARCHAR(255) NOT NULL,
project_id INTEGER NOT NULL,
-- KEY fk_project (project_id),
-- CONSTRAINT fk_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
-- CONSTRAINT fk_project 
FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);


-- project tasks table
CREATE TABLE project_tasks(
task_id INTEGER PRIMARY KEY AUTO_INCREMENT,
task_order INTEGER NOT NULL,
task_description TEXT NOT NULL,
task_status VARCHAR(50) NOT NULL,
project_id_task INTEGER NOT NULL,
-- KEY fk_project (project_id),
-- CONSTRAINT fk_project2 FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
-- CONSTRAINT fk_project 
FOREIGN KEY (project_id_task) REFERENCES projects(id) ON DELETE CASCADE
);

SELECT * FROM `project-manager`.projects;
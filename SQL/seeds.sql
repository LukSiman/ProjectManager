USE `project-manager`;

INSERT INTO projects (`name`, start_date, `description`) VALUES ('Project Manager', '2021-11-12', 'A fullstack app that tracks your projects.');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`) VALUES ('Hacker app', CURRENT_DATE(), '2022-12-12', DATEDIFF(end_date, start_date), 'An app that hacks anyone automaticaly');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`) VALUES ('Robot dog', CURRENT_DATE(), CURRENT_DATE() + INTERVAL 1 YEAR, DATEDIFF(end_date, start_date), 'A robot dog that listen to commands.');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`) VALUES ('Fakeazon', '2020-01-01', '2020-10-10', DATEDIFF(end_date, start_date), 'An e-commerce website where you can buy stuff!');
INSERT INTO projects (`name`, start_date, `description`) VALUES ('Long description project', '1990-09-19', "This project tests a long description, time to start copy-pasting because this is going to be annoying otherwise. 
This is taking longer than expected, copy-pasta time! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! 
Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! 
Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! 
Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! END!!!");
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`) VALUES ('Android workout app', '2018-06-08', '2019-06-08', DATEDIFF(end_date, start_date),'A workout app copied and changed to suit me!');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`) VALUES ('Random1', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, DATEDIFF(end_date, start_date), 'A random app!');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`) VALUES ('Random2', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, DATEDIFF(end_date, start_date), 'A random app!');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`) VALUES ('Random3', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, DATEDIFF(end_date, start_date), 'A random app!');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`) VALUES ('Random4', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, DATEDIFF(end_date, start_date), 'A random app!');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`) VALUES ('Random5', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, DATEDIFF(end_date, start_date), 'A random app!');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`) VALUES ('Random6', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, DATEDIFF(end_date, start_date), 'A random app!');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`) VALUES ('Random7', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, DATEDIFF(end_date, start_date), 'A random app!');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`) VALUES ('Random8', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, DATEDIFF(end_date, start_date), 'A random app!');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`) VALUES ('Random9', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, DATEDIFF(end_date, start_date), 'A random app!');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`) VALUES ('Random10', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, DATEDIFF(end_date, start_date), 'A random app!');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`) VALUES ('Random11', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, DATEDIFF(end_date, start_date), 'A random app!');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`) VALUES ('Random12', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, DATEDIFF(end_date, start_date), 'A random app!');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`) VALUES ('Random13', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, DATEDIFF(end_date, start_date), 'A random app!');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`) VALUES ('Random14', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, DATEDIFF(end_date, start_date), 'A random app!');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`) VALUES ('Random15', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, DATEDIFF(end_date, start_date), 'A random app!');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`) VALUES ('Random16', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, DATEDIFF(end_date, start_date), 'A random app!');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`) VALUES ('Random17', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, DATEDIFF(end_date, start_date), 'A random app!');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`) VALUES ('Random18', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, DATEDIFF(end_date, start_date), 'A random app!');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`) VALUES ('Random19', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, DATEDIFF(end_date, start_date), 'A random app!');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`) VALUES ('Random20', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, DATEDIFF(end_date, start_date), 'A random app!');

INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder1.jpg', 1);
#INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder2.jpg', 1);
#INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder3.jpg', 1);
#INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder4.jpg', 1);
#INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder5.jpg', 1);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder2.jpg', 2);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder3.jpg', 3);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder4.jpg', 4);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder5.jpg', 5);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder6.jpg', 6);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder7.jpg', 7);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder8.jpg', 8);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder1.jpg', 9);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder2.jpg', 10);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder3.jpg', 11);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder4.jpg', 12);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder5.jpg', 13);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder6.jpg', 14);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder7.jpg', 15);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder8.jpg', 16);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder1.jpg', 17);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder2.jpg', 18);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder3.jpg', 19);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder4.jpg', 20);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder5.jpg', 21);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder6.jpg', 22);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder7.jpg', 23);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder8.jpg', 24);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder1.jpg', 25);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder2.jpg', 26);

SELECT * FROM `project-manager`.projects;
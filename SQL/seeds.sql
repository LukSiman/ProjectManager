USE `project-manager`;

INSERT INTO project (`name`, start_date, `description`) VALUES ('Project Manager', '2021-11-12', 'A fullstack app that tracks your projects.');
INSERT INTO project (`name`, start_date, end_date, `description`) VALUES ('Hacker app', CURRENT_DATE(), '2022-12-12', 'An app that hacks anyone automaticaly');
INSERT INTO project (`name`, start_date, end_date, `description`) VALUES ('Robot dog', CURRENT_DATE(), CURRENT_DATE() + INTERVAL 1 YEAR, 'A robot dog that listen to commands.');
INSERT INTO project (`name`, start_date, end_date, `description`) VALUES ('Fakeazon', '2020-01-01', '2020-10-10', 'An e-commerce website where you can buy stuff!');
INSERT INTO project (`name`, start_date, `description`) VALUES ('Long description project', '1990-09-19', "This project tests a long description, time to start copy-pasting because this is going to be annoying otherwise. 
This is taking longer than expected, copy-pasta time! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! 
Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! 
Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! 
Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! END!!!");
INSERT INTO project (`name`, start_date, end_date, `description`) VALUES ('Android workout app', '2018-06-08', '2019-06-08', 'A workout app copied and changed to suit me!');
INSERT INTO project (`name`, start_date, end_date, `description`) VALUES ('Random1', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, 'A random app!');
INSERT INTO project (`name`, start_date, end_date, `description`) VALUES ('Random2', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, 'A random app!');
INSERT INTO project (`name`, start_date, end_date, `description`) VALUES ('Random3', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, 'A random app!');
INSERT INTO project (`name`, start_date, end_date, `description`) VALUES ('Random4', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, 'A random app!');
INSERT INTO project (`name`, start_date, end_date, `description`) VALUES ('Random5', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, 'A random app!');
INSERT INTO project (`name`, start_date, end_date, `description`) VALUES ('Random6', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, 'A random app!');
INSERT INTO project (`name`, start_date, end_date, `description`) VALUES ('Random7', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, 'A random app!');
INSERT INTO project (`name`, start_date, end_date, `description`) VALUES ('Random8', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, 'A random app!');
INSERT INTO project (`name`, start_date, end_date, `description`) VALUES ('Random9', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, 'A random app!');
INSERT INTO project (`name`, start_date, end_date, `description`) VALUES ('Random10', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, 'A random app!');
INSERT INTO project (`name`, start_date, end_date, `description`) VALUES ('Random11', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, 'A random app!');
INSERT INTO project (`name`, start_date, end_date, `description`) VALUES ('Random12', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, 'A random app!');
INSERT INTO project (`name`, start_date, end_date, `description`) VALUES ('Random13', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, 'A random app!');
INSERT INTO project (`name`, start_date, end_date, `description`) VALUES ('Random14', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, 'A random app!');
INSERT INTO project (`name`, start_date, end_date, `description`) VALUES ('Random15', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, 'A random app!');
INSERT INTO project (`name`, start_date, end_date, `description`) VALUES ('Random16', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, 'A random app!');
INSERT INTO project (`name`, start_date, end_date, `description`) VALUES ('Random17', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, 'A random app!');
INSERT INTO project (`name`, start_date, end_date, `description`) VALUES ('Random18', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, 'A random app!');
INSERT INTO project (`name`, start_date, end_date, `description`) VALUES ('Random19', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, 'A random app!');
INSERT INTO project (`name`, start_date, end_date, `description`) VALUES ('Random20', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, 'A random app!');

SELECT * FROM `project-manager`.project;
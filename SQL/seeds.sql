USE `project-manager`;

INSERT INTO projects (`name`, start_date, `description`, `status`) VALUES ('Project Manager', '2021-11-12', 'A fullstack app that tracks your projects.', 'New idea');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`, `status`) VALUES ('Hacker app', CURRENT_DATE(), '2022-12-12', DATEDIFF(end_date, start_date), 'An app that hacks anyone automaticaly', 'Completed');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`, `status`) VALUES ('Robot dog', CURRENT_DATE(), CURRENT_DATE() + INTERVAL 1 YEAR, DATEDIFF(end_date, start_date), 'A robot dog that listen to commands.', 'In progress');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`, `status`) VALUES ('Fakeazon', '2020-01-01', '2020-10-10', DATEDIFF(end_date, start_date), 'An e-commerce website where you can buy stuff!', 'Completed');
INSERT INTO projects (`name`, start_date, `description`, `status`) VALUES ('Long description project', '1990-09-19', "This project tests a long description, time to start copy-pasting because this is going to be annoying otherwise. 
This is taking longer than expected, copy-pasta time! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! 
Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! 
Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! 
Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! Copy-pasta! END!!!", 'On hold');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`, `status`) VALUES ('Android workout app', '2018-06-08', '2019-06-08', DATEDIFF(end_date, start_date),'A workout app copied and changed to suit me!', 'Completed');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`, `status`) VALUES ('Random app', '2011-01-01', '2016-04-07', DATEDIFF(end_date, start_date), 'A random app!', 'Completed');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`, `status`) VALUES ('Scheduler', '2018-02-09', '2018-04-01', DATEDIFF(end_date, start_date), 'A random app!', 'Dropped');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`, `status`) VALUES ('Food tracker', '2020-02-11', '2021-04-29', DATEDIFF(end_date, start_date), 'A random app!', 'Completed');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`, `status`) VALUES ('Gym-buddy', '2021-01-04', '2021-04-10', DATEDIFF(end_date, start_date), 'A random app!', 'Dropped');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`, `status`) VALUES ('Quantum teleportation detector', '2016-10-05', CURRENT_DATE() + INTERVAL 1 YEAR, DATEDIFF(end_date, start_date), 'A random app!', 'In progress');
INSERT INTO projects (`name`, start_date, `length`, `description`, `status`) VALUES ('Burger finder', '2017-05-04', DATEDIFF(end_date, start_date), 'A random app!', 'On hold');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`, `status`) VALUES ('Crime fighting app', '2021-04-10', '2021-11-10', DATEDIFF(end_date, start_date), 'A random app!', 'Completed');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`, `status`) VALUES ('Grime fighting searcher', '2021-04-28', '2022-09-25', DATEDIFF(end_date, start_date), 'A random app!', 'In progress');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`, `status`) VALUES ('Applosion', '2019-06-15', '2020-04-01', DATEDIFF(end_date, start_date), 'A random app!', 'Dropped');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`, `status`) VALUES ('Skyrim 2077', '2016-12-24', '2019-10-05', DATEDIFF(end_date, start_date), 'A random app!', 'Dropped');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`, `status`) VALUES ('AI named Jack', '2018-11-03', '2019-02-02', DATEDIFF(end_date, start_date), 'A random app!', 'Completed');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`, `status`) VALUES ('Hacker app: Resurection', '2016-10-27', '2018-11-04', DATEDIFF(end_date, start_date), 'A random app!', 'Completed');
INSERT INTO projects (`name`, start_date, `description`, `status`) VALUES ('Fakebook', '2018-04-29', 'A random app!', 'New idea');
INSERT INTO projects (`name`, start_date, `description`, `status`) VALUES ('FakeTube', '2017-10-01', 'A random app!', 'In progress');
INSERT INTO projects (`name`, start_date, `description`, `status`) VALUES ('Random app 2', '2018-04-25', 'A random app!', 'On hold');
INSERT INTO projects (`name`, start_date, `description`, `status`) VALUES ('Straight up Spotify', '2018-05-12', 'A random app!', 'New idea');
INSERT INTO projects (`name`, start_date, `description`, `status`) VALUES ('Weather app', '2018-10-01', 'A random app!', 'New idea');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`, `status`) VALUES ('Smell-o-vision app', '2018-02-23', '2021-10-13', DATEDIFF(end_date, start_date), 'A random app!', 'Dropped');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`, `status`) VALUES ('Pasta recipe book', '2019-08-14', CURRENT_DATE() + INTERVAL 3 YEAR, DATEDIFF(end_date, start_date), 'A random app!', 'In progress');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`, `status`) VALUES ('Random app 3', CURRENT_DATE() - INTERVAL 2 YEAR, CURRENT_DATE() + INTERVAL 1 YEAR, DATEDIFF(end_date, start_date), 'A random app!', 'In progress');
INSERT INTO projects (`name`, start_date, end_date, `length`, `description`, `status`) VALUES ('1 day project', '2021-12-22', '2021-12-23', DATEDIFF(end_date, start_date), '1 day app for testing purposes.', 'Completed');

INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder1.jpg', 1);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder2.jpg', 1);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder3.jpg', 1);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder4.jpg', 1);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder5.jpg', 1);
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
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder3.jpg', 27);
INSERT INTO project_images (image_url, project_id) VALUES ('assets/images/projects/placeholder4.jpg', 27);


SELECT * FROM `project-manager`.projects;
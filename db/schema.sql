ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
-- Create the database
CREATE DATABASE burgers_db;
USE `burgers_db`;

-- Create the table burgers
CREATE TABLE `burgers`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`burger_name` VARCHAR(255) NOT NULL,
	`devoured` BOOLEAN not null,
	`date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);

START TRANSACTION;

DROP DATABASE IF EXISTS `wherehouse`;

CREATE DATABASE `wherehouse`;

USE `wherehouse`;

CREATE TABLE `document` (
  `document_id` int NOT NULL AUTO_INCREMENT,
  `time` datetime NOT NULL,
  PRIMARY KEY (`document_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `items` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `amount` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `log` (
  `document_id` int NOT NULL,
  `item_id` int NOT NULL,
  `amount` int NOT NULL,
  PRIMARY KEY (`document_id`,`item_id`),
  KEY `fk_log_item_idx` (`item_id`),
  CONSTRAINT `fk_log_document` FOREIGN KEY (`document_id`) REFERENCES `document` (`document_id`),
  CONSTRAINT `fk_log_item` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO items (name) VALUES ('laptop'), ('smartphone'), ('headset'), ('monitor');

COMMIT;
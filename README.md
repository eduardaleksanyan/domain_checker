You need 
1. rabbitmq

2. mysql (i use default root user without password)

3. Execute this sql

CREATE SCHEMA IF NOT EXISTS `domain_checker` DEFAULT CHARACTER SET utf8;
CREATE TABLE `domain_checker`.`domains` ( `id` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(100) NULL DEFAULT NULL , `date` DATE NULL DEFAULT NULL , PRIMARY KEY (`id`), `is_valid` TINYINT NOT NULL DEFAULT '0') ENGINE = InnoDB;

You can run 2 way with docker or manual

4. docker-compose up

If any problem with doctor you can run other way

1. cd server
2. npm install
3. npm run dev
2. cd client
4. npm install
5. npm start

should launch on http://localhost:3000


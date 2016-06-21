CREATE DATABASE prudb;

GRANT ALL PRIVILEGES ON prudb.* TO 'prudb'@'%' IDENTIFIED BY 'password' with GRANT OPTION;

use prudb;

CREATE TABLE test (ID    INTEGER AUTO_INCREMENT,IMAGE    BLOB, REMARKS VARCHAR(50),PRIMARY KEY (ID));

CREATE TABLE prud_ins_app (ID INTEGER AUTO_INCREMENT, FNAME VARCHAR(50), LNAME VARCHAR(50) , DOB VARCHAR(50) , GENDER VARCHAR(50) , INDUSTRY VARCHAR(50) , TITLE VARCHAR(50) , SAL_BAND VARCHAR(50), SAL_BAND_CURR VARCHAR(50),  SMOKER VARCHAR(5), DRINKER VARCHAR(5), RACE_DRV VARCHAR(5), ARRESTED VARCHAR(5), VOLV_DRV VARCHAR(5),  CHESS_CLUB_MEM VARCHAR(5), PRIMARY KEY (ID));

drop table prud_ins_app;

CREATE TABLE prud_ins_img(ID INTEGER AUTO_INCREMENT, APP_ID INTEGER, LIC MEDIUMBLOB, EDU MEDIUMBLOB, ARR MEDIUMBLOB, CAR MEDIUMBLOB, PRIMARY KEY(ID));

CREATE TABLE prud_ins_img_f(ID INTEGER AUTO_INCREMENT, APP_ID INTEGER, LIC VARCHAR(200), EDU VARCHAR(200), ARR VARCHAR(200), CAR VARCHAR(200), PRIMARY KEY(ID));

CREATE TABLE prud_ins_app (ID INTEGER AUTO_INCREMENT, FNAME VARCHAR(50), LNAME VARCHAR(50) , DOB VARCHAR(50) , GENDER VARCHAR(50) , INDUSTRY VARCHAR(50) , TITLE VARCHAR(50) , SAL_BAND VARCHAR(50), SAL_BAND_CURR VARCHAR(50),  SMOKER VARCHAR(5), DRINKER VARCHAR(5), RACE_DRV VARCHAR(5), ARRESTED VARCHAR(5), VOLV_DRV VARCHAR(5),  CHESS_CLUB_MEM VARCHAR(5), LIC VARCHAR(200), EDU VARCHAR(200), ARR VARCHAR(200), CAR VARCHAR(200),PRIMARY KEY (ID));

GO

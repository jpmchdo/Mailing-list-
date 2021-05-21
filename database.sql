#create database + use database 
DROP DATABASE IF EXISTS mailing; 
CREATE DATABASE mailing;
USE mailing;

#create table 
CREATE TABLE users
    (
        email VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW(),
        PRIMARY KEY(email)
    );

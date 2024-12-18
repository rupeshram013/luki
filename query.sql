
-- create database nkfancywears;
use nkfancywears;

-- drop table users;

-- create table users(
--     token varchar(13),
--     Fusername varchar(15),
--     Susername varchar(15),
--     usermail varchar(255) unique primary key ,
--     userpass varchar(32) 
-- );


-- select * from users;

-- create table gym( id int primary key , name varchar (32) , price int , quantity  int , description varchar(255) , path varchar (255) , rating int);

create table users (token int primary key ,firstname varchar (32),secondname varchar(32),username varchar(32) unique, usermail varchar(255) unique, phone varchar(13) , userpass varchar (32) , spending int , admin int );



create table products (productid int primary key,productname varchar(128),productprice int ,productquantity int, description varchar(1024), path varchar(255) , imagenumber int , productcategory varchar (128));

create table productorder (id int ,customername varchar(64),email varchar(255),phonenum varchar(20), city varchar(32), payment varchar (32) , address varchar(255) , total int , token int , category varchar(128) , size varchar(32), ordercode int , quantity int);


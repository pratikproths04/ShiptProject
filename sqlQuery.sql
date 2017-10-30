--create script
create database shiptDB;
use shiptDB;
CREATE TABLE customer (
  id INTEGER NOT NULL AUTO_INCREMENT,
  customerName VARCHAR(255),
  customerEmail VARCHAR(255) NOT NULL UNIQUE,
  customerPassword VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE category (
  id INTEGER NOT NULL AUTO_INCREMENT,
  categoryName VARCHAR(255),
  PRIMARY KEY (id)
);
CREATE TABLE product (
  id INTEGER NOT NULL AUTO_INCREMENT,
  productName VARCHAR (255),
  customerId INTEGER NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE category_product (
  id INTEGER NOT NULL AUTO_INCREMENT,
  productId INTEGER NOT NULL,
  categoryId INTEGER NOT NULL,
  FOREIGN KEY (productId)   
  REFERENCES product(id)   
  ON DELETE CASCADE   
  ON UPDATE NO ACTION,	
  FOREIGN KEY (categoryId)   
  REFERENCES category(id)   
  ON DELETE CASCADE   
  ON UPDATE NO ACTION,	
  PRIMARY KEY (id)
);
CREATE TABLE customers_cart(
  id int(255) NOT NULL AUTO_INCREMENT,
  customerId int(255) NOT NULL,
  FOREIGN KEY (customerId)   
  REFERENCES customer(id)   
  ON DELETE CASCADE   
  ON UPDATE NO ACTION,	
  PRIMARY KEY (id)
);
CREATE TABLE carts_product (
  id INTEGER NOT NULL AUTO_INCREMENT,
  productId INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  cartId INTEGER NOT NULL,
  FOREIGN KEY (productId)   
  REFERENCES product(id)   
  ON DELETE CASCADE   
  ON UPDATE NO ACTION,
  FOREIGN KEY (cartId)   
  REFERENCES customers_cart(id)   
  ON DELETE CASCADE   
  ON UPDATE NO ACTION,
  PRIMARY KEY (id)
);
CREATE TABLE customers_order (
  id INTEGER NOT NULL AUTO_INCREMENT,
  orderStatus VARCHAR(255),
  orderDate DATETIME NOT NULL,
  numberOfProducts INTEGER NOT NULL,
  cartId INTEGER NOT NULL,
  FOREIGN KEY (cartId)   
  REFERENCES customers_cart(id)   
  ON DELETE CASCADE   
  ON UPDATE NO ACTION,
  PRIMARY KEY (id)
);
--insert script
INSERT INTO category (categoryName) VALUES('Vegetables');
INSERT INTO category (categoryName) VALUES('Fruits');
INSERT INTO category (categoryName) VALUES('Fresh Herbs');

INSERT INTO product (productName) VALUES('Onions');
INSERT INTO product (productName) VALUES('Peppers');
INSERT INTO product (productName) VALUES('Potatoes');
INSERT INTO product (productName) VALUES('Mushrooms');
INSERT INTO product (productName) VALUES('Avocados');
INSERT INTO product (productName) VALUES('Carots');
INSERT INTO product (productName) VALUES('Cucumbers');
INSERT INTO product (productName) VALUES('Squash');
INSERT INTO product (productName) VALUES('Cauliflowers');
INSERT INTO product (productName) VALUES('Apples');
INSERT INTO product (productName) VALUES('Berries');
INSERT INTO product (productName) VALUES('Bananas');
INSERT INTO product (productName) VALUES('Grapes');
INSERT INTO product (productName) VALUES('Pears');
INSERT INTO product (productName) VALUES('Lemons');
INSERT INTO product (productName) VALUES('Watermelons');
INSERT INTO product (productName) VALUES('Cantaloupes');
INSERT INTO product (productName) VALUES('Basil');
INSERT INTO product (productName) VALUES('Bay Leaves');
INSERT INTO product (productName) VALUES('Chives');
INSERT INTO product (productName) VALUES('Cilantro');
INSERT INTO product (productName) VALUES('Dill');
INSERT INTO product (productName) VALUES('Mint');
INSERT INTO product (productName) VALUES('Parsley');

INSERT INTO category_product (productId, categoryId) VALUES(1, 1);
INSERT INTO category_product (productId, categoryId) VALUES(2, 1);
INSERT INTO category_product (productId, categoryId) VALUES(3, 1);
INSERT INTO category_product (productId, categoryId) VALUES(4, 1);
INSERT INTO category_product (productId, categoryId) VALUES(5, 1);
INSERT INTO category_product (productId, categoryId) VALUES(6, 1);
INSERT INTO category_product (productId, categoryId) VALUES(7, 1);
INSERT INTO category_product (productId, categoryId) VALUES(8, 1);
INSERT INTO category_product (productId, categoryId) VALUES(9, 1);
INSERT INTO category_product (productId, categoryId) VALUES(10, 1);
INSERT INTO category_product (productId, categoryId) VALUES(11, 2);
INSERT INTO category_product (productId, categoryId) VALUES(12, 2);
INSERT INTO category_product (productId, categoryId) VALUES(13, 2);
INSERT INTO category_product (productId, categoryId) VALUES(14, 2);
INSERT INTO category_product (productId, categoryId) VALUES(15, 2);
INSERT INTO category_product (productId, categoryId) VALUES(16, 2);
INSERT INTO category_product (productId, categoryId) VALUES(17, 2);
INSERT INTO category_product (productId, categoryId) VALUES(18, 2);
INSERT INTO category_product (productId, categoryId) VALUES(19, 3);
INSERT INTO category_product (productId, categoryId) VALUES(20, 3);
INSERT INTO category_product (productId, categoryId) VALUES(21, 3);
INSERT INTO category_product (productId, categoryId) VALUES(22, 3);
INSERT INTO category_product (productId, categoryId) VALUES(23, 3);
INSERT INTO category_product (productId, categoryId) VALUES(24, 3);
INSERT INTO category_product (productId, categoryId) VALUES(25, 3);

--Write a SQL query to return the results as display below:
--***Example***
--customer_id | customer_first_name | category_id | category_name | number_purchased
--- | --- | --- | --- | --- | ---
--1 |John | 1 | Bouquets | 15

SELECT c.Id as customer_id, c.customerName as customer_first_name, 
cat.id as category_id, cat.categoryName as category_name, 
co.numberOfProducts as number_product_purchased
FROM customer c
join customers_cart cc on c.id = cc.customerId 
join customers_order co on cc.id = co.cartId
join carts_product cp on co.cartId = cp.cartId 
join category_product catprod on cp.productId = catprod.productId 
join category cat on catprod.categoryId = cat.Id
GROUP BY cc.customerId;

--We want to give customers the ability to create lists of products for one-click ordering of bulk items. How would you design the tables, what are the pros and cons of your approach?

CREATE TABLE customers_list (
	id INTEGER NOT NULL,
    listName VARCHAR(255),
    customerId INTEGER NOT NULL,
    FOREIGN KEY (customerId)   
	REFERENCES customer(id)   
	ON DELETE CASCADE   
	ON UPDATE NO ACTION,	
	PRIMARY KEY (id, customerId)
);

CREATE TABLE product_list (
  id INTEGER NOT NULL AUTO_INCREMENT,
  listId INTEGER NOT NULL,
  productId INTEGER NOT NULL,
  FOREIGN KEY (listId)   
  REFERENCES customers_list(id)   
  ON DELETE CASCADE   
  ON UPDATE NO ACTION,
  FOREIGN KEY (productId)   
  REFERENCES product(id)   
  ON DELETE CASCADE   
  ON UPDATE NO ACTION,
  PRIMARY KEY (id)
);
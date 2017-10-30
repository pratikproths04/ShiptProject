

# ShiptProject

Create a very basic API application, where a customer can have an order that is made up of products.
## Tasks
Please implement the following stories.
1. A product belongs to many categories. A category has many products.
2. A customer can have many orders. An order is comprised of many products. An order has a status stating if the
order is waiting for delivery, on its way, or delivered.
3. Write a SQL query to return the results as display below:
***Example***
customer_id | customer_first_name | category_id | category_name | number_purchased
--- | --- | --- | --- | --- | ---
1 |John | 1 | Bouquets | 15
4. Include the previous result as part of a function in the application. If you are using an ORM, please write the query
in your ORM's DSL. Leave the original SQL in a separate file.
5. An API end point that returns the orders for a customer.

# Additional questions
*No coding necessary, explain the concept or sketch your thoughts.*
- We want to give customers the ability to create lists of products for one-click ordering of bulk items. How would you
design the tables, what are the pros and cons of your approach?
- If Shipt knew exact inventory of stores, and when facing a high traffic and limited supply of particular item, how do
you distribute the inventory among customers checking out?

## Usage
Coding Interview Exercise.


## Developed
Using NodeJS, AngularJS, ExpressJS, EJS, HTML, CSS, JavaScript, JQuery, Ajax and MySQL 


### Tools

Created with [Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   

Nodeclipse is free open-source project that grows with your contributions.

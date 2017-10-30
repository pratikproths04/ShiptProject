var mysql = require('./mysql');
exports.showQueryResult=function (req,res){
    console.log("Inside showQueryResult");
    var query= "SELECT c.Id as customer_id, c.customerName as customer_first_name, cat.id as category_id, cat.categoryName as category_name, co.numberOfProducts as number_product_purchased\n" +
        "FROM customer c\n" +
        "join customers_cart cc on c.id = cc.customerId \n" +
        "join customers_order co on cc.id = co.cartId\n" +
        "join carts_product cp on co.cartId = cp.cartId \n" +
        "join category_product catprod on cp.productId = catprod.productId \n" +
        "join category cat on catprod.categoryId = cat.Id\n" +
        "GROUP BY cc.customerId";
    var sendObj = {};
    mysql.fetchData(function (err, result) {
        if (err) {
            throw err;
        }
        else {
            if (result.length > 0) {
                sendObj.statusCode = 200;
                console.log("result", result);
                sendObj.data = result;
                res.send(sendObj);
            }else{
                console.log("No data found");
                sendObj.statusCode = 400;
                res.send(sendObj);
            }
        }
    }, query);
};
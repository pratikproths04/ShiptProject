var mysql = require('./mysql');
exports.showAllOrders=function (req,res){
    console.log("Inside showAllOrders");
    var query= "SELECT c.customerName as customer_name, c.customerEmail as customer_email, \n" +
        "  co.orderStatus as order_Status, co.orderDate as order_date,\n" +
        "  co.numberOfProducts as number_product_purchased\n" +
        "  FROM customer c\n" +
        "  join customers_cart cc on c.id = cc.customerId\n" +
        "  join customers_order co on cc.id = co.cartId\n" +
        "  where c.Id = "+req.session.userId;
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
var mysql = require('./mysql');
//Redirects to the homepage
function getDateTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}
exports.goToHomePage = function(req,res){
	//Checks before redirecting whether the session is valid
	if(req.session.userId)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("homePage",{userId:req.session.userId});
	}
	else
	{
		//res.redirect('/logout');
	}
};

exports.processOrder = function(req,res){
    console.log("Inside processOrder");
    var cart = req.body;
    if(!cart && cart.length<1){
        console.log("Unable to get cart");
        res.send({"statusCode" : 400});
    }else{
		var query= "Insert into customers_cart(customerId) VALUES("+req.session.userId+")";
        //console.log("query",query);
		mysql.insertData(function (err, result) {
			if (err) {
				throw err;
			}
			else {
				console.log("Customer cart created successfully");
                var query= "Select id from customers_cart where customerId = "+req.session.userId+" order by id desc LIMIT 1";
                //console.log("query",query);
                mysql.fetchData(function (err, result) {
                    if (err) {
                        throw err;
                    }
                    else {
                        //console.log("result "+JSON.stringify(result[0].id));
                        if (result.length > 0) {
                            var cartId = result[0].id;
                            for(var item in cart){
                                //console.log(cart[item]);
                                var query= "Insert into carts_product(productId, quantity, cartId) VALUES("+cart[item].id+", "+cart[item].quantity+", "+cartId+")";
                                //console.log("query",query);
                                mysql.insertData(function (err, result) {
                                    if (err) {
                                        throw err;
                                    }
                                    else {
                                        console.log("Products getting inserted for cart successfully");
                                    }
                                }, query);
                            }
                            var query= "Insert into customers_order(orderStatus, orderDate, numberOfProducts, cartId) VALUES("+"'waiting for delivery'"+", '"+getDateTime()+"', "+cart.length+", "+cartId+")";
                            //console.log("query",query);
                            mysql.insertData(function (err, result) {
                                if (err) {
                                    throw err;
                                }
                                else {
                                    var json_responses = {};
                                    console.log("Order created successfully");
                                    json_responses.statusCode = 200;
                                    json_responses.message = "Order created successfully";
                                    res.send(json_responses);
                                }
                            }, query);
                        }
                    }
                }, query);
			}
		}, query);
    }
};

exports.goToLogoutPage = function(req,res){
	console.log("In logout");
    req.session.destroy();
    res.redirect('/');
};
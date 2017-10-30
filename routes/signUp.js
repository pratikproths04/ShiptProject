var mysql = require("./mysql");
var bcrypt = require('bcrypt-nodejs');

exports.goToSignUpPage = function(req,res){
	console.log("In goToSignUpPage");
    res.render('signUpPage', function(err, result) {
 	   if (!err) {
            res.end(result);
 	   }
 	   else {
	        res.end('An error occurred');
	        console.log(err);
 	   }
    });
};

exports.afterSignUpPage = function(req,res){
	console.log("In afterSignUpPage");
	if(!req.param("email") || !req.param("password")){
		console.log("Unable to get all details from User");
		res.send({"statusCode" : 400});
	}else{
		var email = req.param("email");
		var password = req.param("password");
		var name = req.param("name");
		var hash = bcrypt.hashSync(password);
        var query= "Select customerEmail from customer where customerEmail = '"+email+"'";
        var sendObj = {};
        mysql.fetchData(function (err, result) {
            if (err) {
                throw err;
            }
            else {
                if (result.length > 0) {
                    console.log("User already exists. Please try login");
                    sendObj.message = "User already exists. Please try login";
                    res.send(sendObj);
                }else{
                    var query= "Insert into customer(customerName, customerEmail, customerPassword) VALUES('"+name+"', '"+email+"', '"+hash+"')";
                    mysql.insertData(function (err, result) {
                        if (err) {
                            throw err;
                        }
                        else {
                            console.log("Customer data inserted successfully");
                        }
                    }, query);
                    sendObj.message = "Customer data  inserted successfully.";
                    res.send(sendObj);
                }
            }
        }, query);
	}
};
var mysql = require('./mysql');
var bcrypt = require('bcrypt-nodejs');

exports.goToLogInPage = function(req,res){
	console.log("In goToLogInPage");
    res.render('logInPage', function(err, result) {
  	   if (!err) {
            res.end(result);
  	   }
  	   else {
            res.end('An error occurred');
            console.log(err);
  	   }
     });
};

exports.afterLogInPage = function(req,res){
	console.log("In afterLogInPage");
	if(!req.param("email") || !req.param("password")){
		console.log("Unable to get all details from User");
		res.send({"login":"Fail"});
	}else{
		var email = req.param("email");
		var password = req.param("password");
        var query= "Select id, customerEmail, customerPassword from customer where customerEmail = '"+email+"'";
        var json_responses = {};
        console.log("Fetching Data to authenticate"+email+password);
        mysql.fetchData(function (err, result) {
            if (err) {
                throw err;
            }
            else {
                if (result.length > 0) {
                    console.log(JSON.stringify(result));
                    if (bcrypt.compareSync(password, result[0].customerPassword))
                    {
                        console.log("User successfully authenticated");
                        req.session.userId = result[0].id;
                        json_responses = {"statusCode" : 200, "message": "LogIn successful"};
                    }
                    else
                    {
                        console.log("User successfully authenticated");
                        json_responses = {"statusCode" : 401, "message": "LogIn Failed"};
                    }
                    res.send(json_responses);
                }else{
                    console.log("No data found");
                    json_responses.statusCode = 400;
                    res.send(json_responses);
                }
            }
        }, query);
	}
};
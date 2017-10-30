var mysql = require('./mysql');
exports.showAllCategories=function (req,res){
    console.log("Inside showAllCategories");
    var query= "Select id, categoryName from category";
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
exports.getCategoryWiseProducts=function (req,res){
    console.log("Inside getCategoryWiseProducts");
    var id = req.param('id');
    var query= "Select id, productName from product where id IN (Select productId from category_product where categoryId = "+id+")";
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
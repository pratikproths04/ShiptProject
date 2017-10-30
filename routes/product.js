var mysql = require('./mysql');
exports.showAllProducts=function (req,res){
    console.log("Inside ShowALLProducts");
    var query= "Select productName from product";
    var sendObj = {};
    mysql.fetchData(function (err, result) {
        if (err) {
            throw err;
        }
        else {
            if (result.length > 0) {
                sendObj.statusCode = 200;
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
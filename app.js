
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mysql = require('./routes/mysql')
  , signUp = require('./routes/signUp')
  , logIn = require('./routes/logIn')
  , home = require('./routes/home')
  , product = require('./routes/product')
  , category = require('./routes/category')
  , order = require('./routes/order')
  , config = require('./routes/config')
  , queryResult = require('./routes/queryResult');

var app = express();
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var options = {
    host: config.server.host,
    port: 3306,
    user:  config.mysqlDB.username,
    password: config.mysqlDB.password,
    database: config.mysqlDB.database,
    checkExpirationInterval: 900000,// How frequently expired sessions will be cleared; milliseconds.
    expiration: 86400000,// The maximum age of a valid session; milliseconds.
    createDatabaseTable: true,// Whether or not to create the sessions database table, if one does not already exist.
    connectionLimit: 1// Number of connections when creating a connection pool
};
var sessionStore = new MySQLStore(options);

app.use(session({
    key: 'session_shipt_cookie_name',
    secret: 'session_shipt__cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

// all environments
app.set('port', process.env.PORT || config.server.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
app.get('/', logIn.goToLogInPage);
app.get('/logIn', logIn.goToLogInPage);
app.get('/signUp', signUp.goToSignUpPage);
app.post('/signUp', signUp.afterSignUpPage);
app.post('/logIn', logIn.afterLogInPage);
app.get('/logOut', home.goToLogoutPage);
app.get('/home', home.goToHomePage);
app.post('/placeOrder', home.processOrder);
app.get('/users', user.list);
app.get('/products', product.showAllProducts);
app.get('/categories/:id/products', category.getCategoryWiseProducts);
app.get('/categories', category.showAllCategories);
app.get('/orders', order.showAllOrders);
app.get('/query', queryResult.showQueryResult);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

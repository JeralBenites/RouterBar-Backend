var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const mongoose = require('mongoose');
var multipart = require('connect-multiparty');
mongoose.connect("mongodb://Jeral:Matsoft2018@ds243491.mlab.com:43491/heroku_89k1zw5x")
//mongoose.connect("mongodb://127.0.0.1/routerBar");

global.utils = require('./helpers/utils');

// Routes
var catalogsRouter = require('./routes/catalogs');
var categoriesRouter = require('./routes/categories');
var customersRouter = require('./routes/customers');
var ordersRouter = require('./routes/orders');
var productPresentationsRouter = require('./routes/productPresentations');
var pubsRouter = require('./routes/pubs');
var reputationsRouter = require('./routes/reputations');
var indexRouter = require('./routes/index');

//Core
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(multipart());
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares para rutas
app.use('/catalogs', catalogsRouter);
app.use('/categories', categoriesRouter);
app.use('/customers', customersRouter);
app.use('/orders', ordersRouter);
app.use('/productPresentations', productPresentationsRouter);
app.use('/pubs', pubsRouter);
app.use('/reputations', reputationsRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

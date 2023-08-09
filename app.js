var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var coueseRouter = require('./routes/course');
var languageRouter = require('./routes/language');
var chatRouter = require('./routes/chat');
var productRouter = require('./routes/product');
var sliderRouter = require('./routes/slider');
var categoryRouter = require('./routes/category');
var colorRouter = require('./routes/color');
var currencyRouter = require('./routes/currencies');
var generalSettingsRouter = require('./routes/generalSettings');
var bannerRouter = require('./routes/banner');
var brandRouter = require('./routes/brand');
var businessSettingsRouter = require('./routes/businessSettings');
var subCategoriesRouter = require('./routes/subCategories');
var homeCategoriesRouter = require('./routes/homeCategories');
var addressRouter = require('./routes/address');
var cartRouter = require('./routes/cart');

var app = express();

// view engine setup

app.use(cors());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));


app.use('/', indexRouter);
app.use(usersRouter);
app.use('/courses', coueseRouter);
app.use(languageRouter);
app.use(chatRouter);
app.use(productRouter);
app.use(sliderRouter);
app.use(categoryRouter);
app.use(colorRouter);
app.use(currencyRouter);
app.use(generalSettingsRouter);
app.use(bannerRouter);
app.use(brandRouter);
app.use(businessSettingsRouter);
app.use(subCategoriesRouter);
app.use(homeCategoriesRouter);
app.use(addressRouter);
app.use(cartRouter);





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

process.on('uncaughtException', function (err) {
  // handle the error safely
  console.log(err);
});



module.exports = app;

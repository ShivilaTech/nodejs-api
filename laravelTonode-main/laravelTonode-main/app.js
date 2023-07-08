var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

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

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses', coueseRouter);
app.use(languageRouter);
app.use(chatRouter);
app.use(productRouter);
app.use(sliderRouter);
app.use(categoryRouter);
app.use(colorRouter);
app.use(currencyRouter);
app.use(generalSettingsRouter);




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
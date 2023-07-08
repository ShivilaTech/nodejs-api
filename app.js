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
var signupRouter = require('./routes/signup');
var loginRouter = require('./routes/login');

var socialRouter = require('./routes/social');
var forgetRequestRouter = require('./routes/forgetRequest')
var confirmResetRouter = require('./routes/confirmReset')
var resendCodeRouter = require('./routes/resendCode')
var logoutRouter = require('./routes/logout');

var userRouter = require('./routes/user');
var authResendCodeRouter = require('./routes/authResendCode')
var confirmResetRouter = require('./routes/confirmCode')
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

app.use(signupRouter);
app.use(loginRouter);
app.use(socialRouter);
app.use(forgetRequestRouter);
app.use(confirmResetRouter)
app.use(resendCodeRouter)
app.use(logoutRouter)
app.use(userRouter)
app.use(authResendCodeRouter)

app.use(confirmResetRouter)

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

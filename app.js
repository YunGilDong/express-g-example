var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const cors = require('cors');
//const net_client = require('./net/client.js');
//const net_client = require('./net/tcpClient');
//const net_client = require('./net/clsTcpClient');
//const net_client = require('./net/clsEchoTcpClient');
const net_client = require('./net/clsTcpClient');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var groupRouter = require('./routes/group');
var loginRouter = require('./routes/login');

var app = express();
//app.use(bodyParser().json());
app.use(bodyParser.urlencoded({extended: false}));


console.log('app start');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.options('/write', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 
  'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send();
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





// router
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/group', groupRouter);
app.use('/login', loginRouter);

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

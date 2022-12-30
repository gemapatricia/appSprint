var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registroRouter = require('./routes/registro');
var tiendaRouter = require('./routes/tienda');
var referentesRouter = require('./routes/referentes');
var deportistaConcretoRouter = require('./routes/deportistaConcreto');
var iniciacionRouter = require('./routes/iniciacion');
var noticiasYEventosRouter = require('./routes/noticiasYEventos');
var administradorRouter = require('./routes/administrador');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/registro', registroRouter);
app.use('/tienda', tiendaRouter);
app.use('/referentes', referentesRouter);
app.use('/deportistaConcreto', deportistaConcretoRouter);
app.use('/iniciacion', iniciacionRouter);
app.use('/noticiasYEventos', noticiasYEventosRouter);
app.use('/administrador', administradorRouter);

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

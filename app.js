var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authData = require('./routes/auth');
require('./db')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(authData.authMiddleware)

app.use('/users', usersRouter);
app.use('/auth', authData.router);
app.use('/', authData.protectRouteMiddleWare, indexRouter);
app.use('/pro', authData.protectRouteMiddleWare, authData.router);

module.exports = app;

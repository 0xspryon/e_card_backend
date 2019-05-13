var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Arena = require('bull-arena');
const queueConfig = require('./queue/Queue').redisConfig
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authData = require('./routes/auth');
const constants = require('./utilities/constants')

require('./db')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(authData.authMiddleware)

const arena = Arena({
    queues: [
        {
            // Name of the bull queue, this name must match up exactly with what you've defined in bull.
            name: constants.USER_REGISTRATION_QUEUE,

            // Hostname or queue prefix, you can put whatever you want.
            hostId: "localhost",

            // Redis auth.
            redis: queueConfig,
        },
    ],
},
    {
        basePath: '/arena',

        // Let express handle the listening.
        disableListen: true
    });
app.use('/', arena);

app.use('/users', usersRouter);
app.use('/auth', authData.router);
app.use('/', authData.protectRouteMiddleWare, indexRouter);
app.use('/pro', authData.protectRouteMiddleWare, authData.router);

module.exports = app;

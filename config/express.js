'use strict';

var express = require('express');
var bodyParser = require('body-parser'),
    flash = require('connect-flash'),
    expressSession = require('express-session'),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo')(expressSession);

module.exports = function (app) {
    app.use(express.static('public'));
    app.use('/bower_components', express.static('bower_components'));
    app.use(bodyParser.json());
    app.set('views', 'views');
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(expressSession({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({mongooseConnection: mongoose.connection})
    }));
    app.use(flash());
};
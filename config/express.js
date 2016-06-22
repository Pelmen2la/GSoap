'use strict';

var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    flash = require('connect-flash'),
    expressSession = require('express-session'),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo')(expressSession);

module.exports = function (app) {
    app.use(express.static(path.join(__dirname, '..', 'public')));
    app.use('/bower_components', express.static(path.join(__dirname, '..', 'bower_components')));
    app.use(bodyParser.json());
    app.set('views', path.join(__dirname, '..', 'views'));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(expressSession({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({mongooseConnection: mongoose.connection})
    }));
    app.use(flash());
};
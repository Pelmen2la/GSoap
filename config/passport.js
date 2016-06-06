'use strict';

var passport = require('passport'),
    mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy;

var User = mongoose.model('user');

module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use('login', new LocalStrategy(function (username, password, done) {
        User.findOne({username: username}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (user && password === user.password) {
                return done(null, user);
            }
            return done(null, false, {message: 'Неправильный логин или пароль.'});
        });
    }));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            err
                ? done(err)
                : done(null, user);
        });
    });

    User.count(function (err, count) {
        if (!count) {
            User.create({
                username: 'elen',
                password: '05062014'
            });
        }
    });
};
'use strict';

var mongoose = require('mongoose'),
    requireTree = require('require-tree');

var models = requireTree('../models');

module.exports = function (app) {
    mongoose.connect('mongodb://localhost:27017/gsoap');
};
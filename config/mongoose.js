'use strict';

var mongoose = require('mongoose'),
    requireTree = require('require-tree'),
    nconf = require('nconf');

var models = requireTree('../models');

nconf.file({
    file: 'mongo.yml',
    format: require('nconf-yaml')
});

module.exports = function (app) {
    mongoose.connect('mongodb://' + nconf.get('net:bindIp') + ':' + nconf.get('net:port') + '/gsoap');
};
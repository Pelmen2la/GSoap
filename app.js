'use strict';

var express = require('express'),
    path = require('path');

var app = express();

global.appRoot = path.resolve(__dirname);

require('./config/index')(app);
require('./routes/index')(app);

var server = app.listen(process.env.PORT || 3001, 'localhost', function () {
    console.log('App listening on port ' + server.address().port);
});

process.on('uncaughtException', function (err) {
    process.exit();
});
'use strict';

var compression = require('compression'),
    express = require('express'),
    path = require('path'),
    app = express();

app.use(compression());

global.appRoot = path.resolve(__dirname);
global.cacheTime = 86400 * 7; //7 days

require('./config/index')(app);
require('./routes/index')(app);

var server = app.listen(process.env.PORT || 3001, 'localhost', function () {
    console.log('App listening on port ' + server.address().port);
});

process.on('uncaughtException', function(err) {
    console.error(err + '\n' + err.stack);
});

'use strict';

var express = require('express');

var app = express();

require('./config/index')(app);
require('./routes/index')(app);

var server = app.listen(process.env.PORT || 3001, 'localhost', function () {
    console.log('App listening on port ' + server.address().port);
});
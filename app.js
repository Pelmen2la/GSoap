'use strict';

var express = require('express');

var app = express();

require('./config/index')(app);
require('./routes/index')(app);

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});
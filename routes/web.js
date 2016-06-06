'use strict';

var mongoose = require('mongoose');

module.exports = function(app) {
    require("./data-helpers/products")(app);
    require("./data-helpers/brands")(app);
    require("./data-helpers/buttonfilters")(app);
    require("./data-helpers/orders")(app);

    app.get('/', function(req, res) {
        res.sendFile('../public/index.html');
    });
};
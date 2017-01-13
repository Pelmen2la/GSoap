'use strict';

var mongoose = require('mongoose'),
    emailHelper = require('app/email-helper'),
    path = require('path'),
    serverSideWeb = require("./server-side-web");

module.exports = function(app) {
    require("./data-helpers/products")(app);
    require("./data-helpers/brands")(app);
    require("./data-helpers/buttonfilters")(app);
    require("./data-helpers/orders")(app);
    require("./data-helpers/promocodes")(app);
    require("./data-helpers/articles")(app);

    app.get('/', function(req, res) {
        if(req.query._escaped_fragment_ !== undefined) {
            serverSideWeb.sendServerSideRenderingResult(req, res, req.query._escaped_fragment_);
            return;
        }
        res.sendFile(path.join(appRoot, '/public/_index.html'));
    });

    app.post('/subscribe/', function(req, res) {
        emailHelper.sendEmail('Новая подписка', req.body.email, function() {
            res.json({
                success: true
            });
        });
    });
};
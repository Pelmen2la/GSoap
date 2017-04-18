'use strict';

var mongoose = require('mongoose'),
    emailHelper = require('app/email-helper'),
    path = require('path'),
    fs = require('fs'),
    serverSideWeb = require("./server-side-web"),
    MobileDetect = require('mobile-detect');

module.exports = function(app) {
    require("./data-helpers/products")(app);
    require("./data-helpers/brands")(app);
    require("./data-helpers/buttonfilters")(app);
    require("./data-helpers/orders")(app);
    require("./data-helpers/promocodes")(app);
    require("./data-helpers/articles")(app);
    require("./data-helpers/slideritems")(app);
    require("./data-helpers/discounts")(app);

    app.get('/', function(req, res) {
        if(req.query._escaped_fragment_ !== undefined) {
            serverSideWeb.sendServerSideRenderingResult(req, res, req.query._escaped_fragment_);
            return;
        }
        fs.readFile(path.join(appRoot, '/public/_index.html'), 'utf8', function(err, indexHtml) {
            fs.readFile(path.join(appRoot, '/public/css/index.css'), 'utf8', function(err, indexCss) {
                var md = new MobileDetect(req.headers['user-agent']);
                res.send(indexHtml.replace('{{css}}', indexCss).replace('{{mobileClass}}', md.mobile() ? 'mobile' : ''));
            });
        });

    });

    app.post('/subscribe/', function(req, res) {
        emailHelper.sendEmail('Новая подписка', req.body.email, function() {
            res.json({
                success: true
            });
        });
    });
};
'use strict';

var mongoose = require('mongoose'),
    Products = require('./products'),
    Acticle = mongoose.model('article');

module.exports = function(app) {
    app.get('/articles', function (req, res) {
        Acticle.find({}, function(err, data) {
            res.json(data);
        });
    });

    app.get('/articles/:id', function (req, res, next) {
        Acticle.findById(req.params.id, function (err, aData) {
            if(err) return next(err);

            if(aData) {
                aData = aData.toObject();
                Products.getProductsDataByIds(aData.boughtTogetherProductIds, function(boughtTogetherProductsData) {
                    aData.boughtTogetherProducts = boughtTogetherProductsData || [];
                    res.json(aData);
                });
            } else {
                res.json(aData);
            }
        });
    });

    app.post('/articles', function (req, res, next) {
        var article = new Acticle(req.body);
        article.save(function (err, data) {
            if (err) return next(err);
            res.json(data);
        });
    });

    app.put('/articles/:id', function (req, res, next) {
        Acticle.findByIdAndUpdate(req.params.id, req.body, {runValidators: true}, function(err, data) {
            if(err) return next(err);
            res.json(data);
        });
    });

    app.delete('/articles/:id', function (req, res, next) {
        Acticle.findByIdAndRemove(req.params.id, function (err, data) {
            if (err) return next(err);
            res.json(data);
        });
    });
}
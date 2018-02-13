'use strict';

var mongoose = require('mongoose'),
    Product = mongoose.model('product'),
    Brand = mongoose.model('brand'),
    debugModule = require('../debug');

module.exports = function(app) {
    app.get('/brands', function (req, res) {
        Brand.find({}, function(err, data) {
            res.json(data);
        });
    });

    app.get('/brands/:id', function (req, res, next) {
        Brand.find({$or: [{ id: req.params.id }, { _id: req.params.id }]}, function (err, data) {
            if(err) return next(err);
            var brand = data[0];
            Product.find({brandId: brand._id}, function(err, data) {
                brand = brand.toObject();
                brand.products = data;
                res.json(brand);
            });
        });
    });

    app.post('/brands', function (req, res, next) {
        var brand = new Brand(req.body);
        if(!brand.id) {
            brand.id = debugModule.transliterate(brand.name);
        }
        brand.save(function (err, data) {
            if (err) return next(err);
            res.json(data);
        });
    });

    app.put('/brands/:id', function (req, res, next) {
        Brand.findByIdAndUpdate(req.params.id, req.body, {runValidators: true}, function(err, data) {
            if(err) return next(err);
            res.json(data);
        });
    });

    app.delete('/brands/:id', function (req, res, next) {
        Brand.findByIdAndRemove(req.params.id, function (err, data) {
            if (err) return next(err);
            res.json(data);
        });
    });
}
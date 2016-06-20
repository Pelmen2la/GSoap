'use strict';

var mongoose = require('mongoose'),
    emailHelper = require('app/email-helper'),
    Order = mongoose.model('order'),
    Product = mongoose.model('product');

module.exports = function(app) {
    app.get('/orders', function (req, res) {
        Order.find({}, function(err, data) {
            res.json(data);
        });
    });

    app.get('/orders/:id', function (req, res, next) {
        Order.findById(req.params.id, function (err, data) {
            if (err) return next(err);
            res.json(data);
        });
    });

    app.post('/orders', function (req, res, next) {
        var orderData = req.body;
        orderData.status = 'new';
        orderData.date = Date.now();
        var order = new Order(orderData);
        order.save(function (err, order) {
            order.products.forEach(function(product) {
                Product.findById(product.id, function(err, productModel) {
                    productModel.orderCount += product.count;
                    productModel.save();
                });
            });
            emailHelper.sendOrderEmail(order);
            if (err) return next(err);
            res.json(order);
        });
    });

    app.put('/orders/:id', function (req, res, next) {
        Order.findByIdAndUpdate(req.params.id, req.body, {runValidators: true}, function (err, data) {
            if (err) return next(err);
            res.json(data);
        });
    });

    app.delete('/orders/:id', function (req, res, next) {
        Order.findByIdAndRemove(req.params.id, function (err, data) {
            if (err) return next(err);
            res.json(data);
        });
    });
}
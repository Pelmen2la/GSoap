'use strict';

var mongoose = require('mongoose'),
    emailHelper = require('app/email-helper'),
    promocodes = require('./promocodes'),
    Order = mongoose.model('order'),
    Product = mongoose.model('product'),
    Products = require('./products');

module.exports = function(app) {
    app.get('/orders', function (req, res) {
        Order.find({}, function(err, data) {
            res.json(data);
        });
    });

    app.get('/orders/:id', function (req, res, next) {
        Order.findById(req.params.id, function (err, data) {
            if (err) return next(err);
            promocodes.getPromocodeInfo(data.customerInfo.promocode, function(info) {
                data = data.toObject();
                data.promocodeInfo = info;
                res.json(data);
            });
        });
    });

    app.post('/orders', function (req, res, next) {
        var orderData = req.body;
        orderData.status = 'new';
        orderData.date = Date.now();
        var order = new Order(orderData);
        Order.find({}, null, {limit: 1, sort: {orderIndex: -1}}, function(err, lastOrderData) {
            var index = lastOrderData.length ? lastOrderData[0].orderIndex : 11160000;
            order.orderIndex = index ? (index + 1) : 11160001;
            order.save(function(err, order) {
                emailHelper.sendOrderEmail(order, function() {
                    res.json({orderIndex: order.orderIndex});
                });
                order.products.forEach(function(product) {
                    Products.getProductDataById(product.id, function(productData) {
                        Product.findById(productData._id, function(err, productModel) {
                            if(productModel) {
                                productModel.orderCount += product.count;
                                productModel.save();
                            }
                        });
                    });
                });
            });
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
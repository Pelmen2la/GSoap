'use strict';

var mongoose = require('mongoose'),
    Discount = mongoose.model('discount'),
    Product = mongoose.model('product');

module.exports = function(app) {
    app.get('/discounts', function (req, res) {
        Discount.find({}, function(err, data) {
            res.json(data);
        });
    });

    app.post('/discounts', function (req, res, next) {
        var discount = new Discount(req.body);
        discount.save(function (err, data) {
            if (err) return next(err);
            applyDiscountToProducts(data, true);
            res.json(data);
        });
    });

    app.delete('/discounts/:id', function (req, res, next) {
        Discount.findByIdAndRemove(req.params.id, function (err, data) {
            if (err) return next(err);
            applyDiscountToProducts(data, false);
            res.json(data);
        });
    });

    function applyDiscountToProducts(discount, isActive) {
        var discountDiff = discount.value * (isActive ? 1 : -1);
        changeProductsDiscount('brandId', discount.brandId, discountDiff);
        changeProductsDiscount('type', discount.productType, discountDiff);
        changeProductsDiscountCore({ '_id': { $in: discount.productIds } }, discountDiff);
    };
    function changeProductsDiscount(filterField, filterVal, discountDiff) {
        if(filterVal) {
            var filterObj = {};
            filterObj[filterField] = filterVal;
            changeProductsDiscountCore(filterObj, discountDiff);
        }
    };
    function changeProductsDiscountCore(filter, discountDiff) {
        Product.find(filter, function(err, data) {
            if(!err) {
                data.forEach(function(p) {
                    var newDiscount = (p.get('discount') || 0) + discountDiff;
                    p.set('discount', newDiscount < 0 ? 0 : newDiscount);
                    p.save();
                });
            }
        });
    };
};
'use strict';

var mongoose = require('mongoose'),
    Product = mongoose.model('product'),
    emailHelper = require('app/email-helper');

module.exports = function(app) {
    app.get('/products', function(req, res) {
        var query = req.query,
            filters = getFilters(query),
            pagingOptions = getPagingOptions(query.pageSize, query.pageIndex);
        if(pagingOptions) {
            Product.find(filters, null, pagingOptions, function(err, data) {
                Product.count(filters, function(err, totalData) {
                    data.push(totalData);
                    res.json(data);
                });
            });
        } else {
            Product.find({}, function(err, data) {
                res.json(data);
            });
        }
    });

    app.get('/products/:id', function(req, res, next) {
        Product.findById(req.params.id, function(err, data) {
            if(err) return next(err);
            res.json(data);
        });
    });

    app.post('/products', function(req, res, next) {
        var product = new Product(req.body);
        product.save(function(err, data) {
            if(err) return next(err);
            res.json(data);
        });
    });

    app.put('/products/:id', function(req, res, next) {
        Product.findByIdAndUpdate(req.params.id, req.body, {runValidators: true}, function(err, data) {
            if(err) return next(err);
            res.json(data);
        });
    });

    app.delete('/products/:id', function(req, res, next) {
        Product.findByIdAndRemove(req.params.id, function(err, data) {
            if(err) return next(err);
            res.json(data);
        });
    });

    app.post('/products/:id/addreview', function(req, res, next) {
        Product.findById(req.params.id, function(err, product) {
            if(err) return next(err);
            var review = req.body;
            product.reviews.push(review);
            product.save(function(err, data) {
                if(err) return next(err);
                emailHelper.sendReviewEmail(review, product);
                res.json(product);
            });
        });
    });

    function getPagingOptions(pageSize, pageIndex) {
        if(!pageSize) {
            return null;
        }
        return {
            skip: pageSize * pageIndex,
            limit: parseInt(pageSize)
        };
    };
    function getFilters(query) {
        var filters = [getSearchFilter(query.searchFilter)],
            buttonFilter = getButtonFilter(query.buttonFilter);
        query.withDiscount === 'true' && filters.push({ discount: { $gt	: 0 } });
        query.isBestseller === 'true' && filters.push({ isBestseller: true });
        if(!query.showInactive) {
            filters.push({ isActive: true });
        }
        buttonFilter && filters.push(buttonFilter);
        return {
            $and: filters
        }
    };
    function getSearchFilter(filterString) {
        var searchFilterFields = ['name', 'brand', 'description'],
            searchFilter = searchFilterFields.map(function(field) {
                var filter = {};
                filter[field] = {"$regex": filterString, "$options": "i"}
                return filter;
            });
        return {$or: searchFilter};
    };
    function getButtonFilter(filter) {
        if(!filter) {
            return '';
        }
        filter = JSON.parse(filter);
        var typeFilter = {type: {$in: filter.productTypes}},
            propertiesFilter = {properties: {$in: filter.properties}};
        return {$and: [typeFilter, propertiesFilter]};
    };
}
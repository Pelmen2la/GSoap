'use strict';

var mongoose = require('mongoose');
var Product = mongoose.model('product');

module.exports = function(app) {
    app.get('/products', function(req, res) {
        var query = req.query;
        Product.find(getFilters(query), null, getPagingOptions(query.pageSize, query.pageIndex), function(err, products) {
            res.json(products);
        });
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
            product.reviews.push(req.body);
            product.save(function(err, data) {
                if(err) return next(err);
                res.json(product);
            });
        });
    });

    function getPagingOptions(pageSize, pageIndex) {
        return {
            skip: pageSize * pageIndex,
            limit: parseInt(pageSize)
        };
    };
    function getFilters(query) {
        var filters = [getSearchFilter(query.searchFilter)],
            buttonFilter = getButtonFilter(query.buttonFilter);
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
        var typeFilter = {type: filter.filterType},
            propertiesFilter = {properties: {$in: filter.properties}};
        return {$and: [typeFilter, propertiesFilter]};
    };
}
'use strict';

var mongoose = require('mongoose'),
    Product = mongoose.model('product'),
    emailHelper = require('app/email-helper');

module.exports = function(app) {
    app.get('/products', function(req, res) {
        var query = req.query,
            filters = getFilters(query),
            pagingOptions = getPagingOptions(query.pagingOptions ? JSON.parse(query.pagingOptions) : {});
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
        getProductDataById(req.params.id, function(data) {
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
        findById(req.params.id, function(productData) {
            Product.findByIdAndUpdate(productData._id, req.body, {runValidators: true}, function(data) {
                res.json(data);
            });
        });
    });

    app.delete('/products/:id', function(req, res, next) {
        findById(req.params.id, function(productData) {
            Product.findByIdAndRemove(productData._id, function(err, data) {
                if(err) return next(err);
                res.json(data);
            });
        });
    });

    app.post('/products/:id/addreview', function(req, res, next) {
        findById(req.params.id, function(product) {
            var review = req.body;
            product.reviews.push(review);
            product.save(function(err, data) {
                if(err) return next(err);
                emailHelper.sendReviewEmail(review, product);
                res.json(product);
            });
        });
    });
};

module.exports.findById = findById;
module.exports.getProductDataById = getProductDataById;

function findById(id, callback) {
    var conditions = [{id: id}];
    parseInt(id) && conditions.push({_id: id});
    Product.find({$or: conditions}, null, null, function(err, data) {
        callback(data[0]);
    });
};

function getProductDataById(id, callback) {
    findById(id, function(productData) {
        if(productData) {
            Product.find({_id: {$in: productData.boughtTogetherProductIds}}, null, null, function(err, boughtTogetherProductsData) {
                productData = productData.toObject();
                productData.boughtTogetherProducts = boughtTogetherProductsData || [];
                callback(productData);
            });
        } else {
            callback({});
        }
    });
};

function getPagingOptions(pagingOptions) {
    if(!pagingOptions.pageSize) {
        return null;
    }
    return {
        skip: pagingOptions.pageSize * ((pagingOptions.pageIndex || 1) - 1),
        limit: parseInt(pagingOptions.pageSize)
    };
};
function getFilters(query) {
    var filters = [getSearchFilter(query.searchFilter)],
        buttonFilter = getButtonFilter(query.buttonFilter);
    query.withDiscount === 'true' && filters.push({discount: {$gt: 0}});
    query.isBestseller === 'true' && filters.push({isBestseller: true});
    if(!query.showHiddenItems) {
        filters.push({isHiddenInList: false});
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
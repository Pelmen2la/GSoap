'use strict';

var mongoose = require('mongoose'),
    Product = mongoose.model('product'),
    buttonFilters =require('./buttonfilters'),
    debugModule = require('../debug'),
    emailHelper = require('app/email-helper');

module.exports = function(app) {
    app.get('/products', function(req, res) {
        var query = req.query,
            pagingOptions = getPagingOptions(query.pagingOptions ? JSON.parse(query.pagingOptions) : {});
        pagingOptions.sort = { discount: -1 };
        getProducts(query, null, pagingOptions, function(data) {
            res.json(data);
        });
    });

    app.get('/products/:id', function(req, res, next) {
        getProductDataById(req.params.id, function(data) {
            res.json(data);
        });
    });

    app.post('/products', function(req, res, next) {
        var product = new Product(req.body);
        if(!product.id) {
            product.id = debugModule.transliterate(product.name);
        }
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
module.exports.getProducts = getProducts;

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
    var options = {
        sort: {
            isActive: -1
        }
    };
    if(pagingOptions.pageSize) {
        options.skip = pagingOptions.pageSize * ((pagingOptions.pageIndex || 1) - 1);
        options.limit = parseInt(pagingOptions.pageSize);
    }
    return options;
};
function getProducts(query, buttonFilterId, pagingOptions, callback) {
    getFilters(query, buttonFilterId, function(filters) {
        if(pagingOptions) {
            Product.find(filters, null, pagingOptions, function(err, data) {
                Product.count(filters, function(err, totalData) {
                    data.push(totalData);
                    callback(data);
                });
            });
        } else {
            Product.find(filters, function(err, data) {
                callback(data);
            });
        }
    });
};
function getFilters(query, buttonFilterId, callback) {
    if(query) {
        var filters = [getSearchFilter(query.searchFilter)];
        buttonFilterId = buttonFilterId || query.buttonFilterId;
        query.typeFilter === 'withDiscount' && filters.push({discount: {$gt: 0}});
        query.typeFilter === 'isBestseller' && filters.push({isBestseller: true});
        query.typeFilter === 'isNovelty' && filters.push({isNovelty: true});
        query.brandIdFilter && filters.push({brandId: query.brandIdFilter});
        if(!query.showHiddenItems) {
            filters.push({isHiddenInList: false});
        }
        filters = {
            $and: filters
        };
    }

    if(buttonFilterId) {
        buttonFilters.getFilter(buttonFilterId, function(filter) {
            if(!filters) {
                filters = {
                    $and: [getButtonFilter(filter)]
                };
            } else {
                filters.$and.push(getButtonFilter(filter));
            }
            callback(filters)
        });
    } else {
        callback(filters)
    }
};
function getSearchFilter(filterString) {
    if(!filterString) {
        return {}
    }
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
    var typeFilter = {type: {$in: filter.productTypes}},
        propertiesFilter = {properties: {$in: filter.properties}};
    return {$and: [typeFilter, propertiesFilter]};
};
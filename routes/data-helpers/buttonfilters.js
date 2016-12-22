'use strict';

var mongoose = require('mongoose'),
    ButtonFilter = mongoose.model('buttonFilter');

module.exports = function(app) {
    app.get('/buttonFilters', function (req, res) {
        var filters = {};
        if(!req.query.showInactive) {
            filters.isActive = true;
        }
        ButtonFilter.find(filters, function(err, data) {
            res.json(data);
        });
    });

    app.get('/buttonFilters/:id', function (req, res, next) {
        ButtonFilter.findById(req.params.id, function (err, data) {
            if (err) return next(err);
            res.json(data);
        });
    });

    app.post('/buttonFilters', function (req, res, next) {
        var buttonFilter = new ButtonFilter(req.body);
        buttonFilter.save(function (err, data) {
            if (err) return next(err);
            res.json(data);
        });
    });

    app.put('/buttonFilters/:id', function (req, res, next) {
        ButtonFilter.findByIdAndUpdate(req.params.id, req.body, {runValidators: true}, function (err, data) {
            if (err) return next(err);
            res.json(data);
        });
    });

    app.delete('/buttonFilters/:id', function (req, res, next) {
        ButtonFilter.findByIdAndRemove(req.params.id, function (err, data) {
            if (err) return next(err);
            res.json(data);
        });
    });

    app.get('/buttonFilters/get_filter_text/:filterId', function(req, res, next) {
        getFilter(req.params.filterId, function(filter) {
            res.json(filter.pageText);
        });
    });
};

module.exports.getFilter = getFilter;

function getFilter (filterId, callback) {
    ButtonFilter.find({}, function(err, buttonFilters) {
        for(var buttonFilter, i = 0; buttonFilter = buttonFilters[i]; i++) {
            for(var filter, j = 0; filter = buttonFilter.filters[j]; j++) {
                if(filter.id === filterId) {
                    callback(filter);
                    return;
                }
            }
        }
        callback({});
    });
};

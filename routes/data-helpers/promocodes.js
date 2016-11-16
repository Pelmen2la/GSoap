'use strict';

var mongoose = require('mongoose');
var Promocode = mongoose.model('promocode');

module.exports = function(app) {
    app.get('/promocodes', function (req, res) {
        Promocode.find({}, function(err, data) {
            res.json(data);
        });
    });

    app.get('/promocodes/isavailable/:code', function (req, res, next) {
        getPromocodeInfo(req.params.code, function(info) {
            res.json(info);
        })
    });


    app.get('/promocodes/:id', function (req, res, next) {
        Promocode.find({ name: req.params.id }, function (err, data) {
            if(err) return next(err);
            res.json(data);
        });
    });

    app.post('/promocodes', function (req, res, next) {
        var promocode = new Promocode(req.body);
        promocode.save(function (err, data) {
            if (err) return next(err);
            res.json(data);
        });
    });

    app.put('/promocodes/:id', function (req, res, next) {
        Promocode.findByIdAndUpdate(req.params.id, req.body, {runValidators: true}, function(err, data) {
            if(err) return next(err);
            res.json(data);
        });
    });

    app.delete('/promocodes/:id', function (req, res, next) {
        Promocode.findByIdAndRemove(req.params.id, function (err, data) {
            if (err) return next(err);
            res.json(data);
        });
    });
};

module.exports.getPromocodeInfo = getPromocodeInfo;

function getPromocodeInfo(promocode, callback) {
    if(!promocode) {
        callback({});
        return;
    };
    Promocode.find({code: promocode}, function(err, data) {
        if(err) return next(err);
        if(!data.length) {
            callback({
                isAvailable: false,
                message: 'Промокод не найден'
            });
        } else {
            var promocode = data[0],
                date = promocode.get('date'),
                isAvailableByDate = !date || Date.now() < date.getTime();
            callback({
                isAvailable: isAvailableByDate,
                message: isAvailableByDate ? 'Промокод действителен' : 'Время действия промокода истекло',
                brandId: isAvailableByDate ? promocode.brandId : '',
                discount: isAvailableByDate ? promocode.discount : '',
                productType: isAvailableByDate ? promocode.productType : ''
            });
        }
    });
};
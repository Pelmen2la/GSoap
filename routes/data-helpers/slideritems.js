'use strict';

var mongoose = require('mongoose'),
    SliderItem = mongoose.model('slideritem');

module.exports = function(app) {
    app.get('/slideritems', function (req, res) {
        SliderItem.find({}, function(err, data) {
            res.setHeader('Cache-Control', 'public, max-age=86400');
            res.json(data);
        });
    });

    app.get('/slideritems/:id', function (req, res, next) {
        SliderItem.findById(req.params.id, function (err, data) {
            if(err) return next(err);
            res.json(data);
        });
    });

    app.post('/slideritems', function (req, res, next) {
        var slideritem = new SliderItem(req.body);
        slideritem.save(function (err, data) {
            if (err) return next(err);
            res.json(data);
        });
    });

    app.put('/slideritems/:id', function (req, res, next) {
        SliderItem.findByIdAndUpdate(req.params.id, req.body, {runValidators: true}, function(err, data) {
            if(err) return next(err);
            res.json(data);
        });
    });

    app.delete('/slideritems/:id', function (req, res, next) {
        SliderItem.findByIdAndRemove(req.params.id, function (err, data) {
            if (err) return next(err);
            res.json(data);
        });
    });
};
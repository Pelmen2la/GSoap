'use strict';

var mongoose = require('mongoose');

var PromocodeScheme = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date
    },
    discount: Number,
    brandId: String,
    productType: String
});

mongoose.model('promocode', PromocodeScheme);
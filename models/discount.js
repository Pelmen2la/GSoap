'use strict';

var mongoose = require('mongoose');

var DiscountScheme = new mongoose.Schema({
    value: Number,
    brandId: String,
    productType: String
});

mongoose.model('discount', DiscountScheme);
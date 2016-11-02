'use strict';

var mongoose = require('mongoose');

var Product = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageName: String,
    capacityList: [{
        capacity: Number,
        price:  Number
    }],
    capacityUnit: String,
    type: String,
    brandId: String,
    brand: String,
    properties: [String],
    description: String,
    use: String,
    ingredients: String,
    additionalInfo: String,
    reviews: [{
        customerName: String,
        text: String
    }],
    boughtTogetherProductIds: [String],
    discount: Number,
    isBestseller: Boolean,
    stockCount: Number,
    orderCount: Number,
    isActive: Boolean
});

mongoose.model('product', Product);
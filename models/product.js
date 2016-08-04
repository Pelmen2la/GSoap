'use strict';

var mongoose = require('mongoose');

var Product = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageName: {
        type: String
    },
    capacityList: [{
        capacity: Number,
        price:  Number
    }],
    capacityUnit: String,
    brand: {
        type: String
    },
    type: {
        type: String
    },
    properties: {
        type: [String]
    },
    description: {
        type: String
    },
    additionalInfo: {
        type: String
    },
    reviews: [{
        customerName: String,
        text: String
    }],
    discount: Number,
    isBestseller: Boolean,
    stockCount: Number,
    orderCount: Number,
    isActive: Boolean
});

mongoose.model('product', Product);
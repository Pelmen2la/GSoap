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
    reviews: [{
        customerName: String,
        text: String
    }]
});

mongoose.model('product', Product);
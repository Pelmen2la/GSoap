'use strict';

var mongoose = require('mongoose');

var Brand = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageName: {
        type: String
    },
    description: {
        type: String
    },
    products: {
        type: [{}]
    }
});

mongoose.model('brand', Brand);
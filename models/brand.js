'use strict';

var mongoose = require('mongoose');

var Brand = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageName: String,
    description: String,
    seoData: {
        title: String,
        keywords: String,
        description: String
    }
});

mongoose.model('brand', Brand);
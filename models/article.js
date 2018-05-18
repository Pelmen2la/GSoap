'use strict';

var mongoose = require('mongoose');

var Article = new mongoose.Schema({
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
    date: Date,
    boughtTogetherProductIds: [String]
});

mongoose.model('article', Article);
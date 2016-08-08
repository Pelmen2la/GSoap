'use strict';

var mongoose = require('mongoose');

var ButtonFilter = new mongoose.Schema({
    name: {
        type: String
    },
    filters: [{
        name: String,
        filterType: String,
        productTypes: [String],
        properties: [String]
    }]
});

mongoose.model('buttonFilter', ButtonFilter);
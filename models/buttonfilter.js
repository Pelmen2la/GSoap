'use strict';

var mongoose = require('mongoose');

var ButtonFilter = new mongoose.Schema({
    name: String,
    isActive: Boolean,
    filters: [{
        id: String,
        name: String,
        productTypes: [String],
        properties: [String],
        pageText: String,
        isActive: Boolean
    }]
});

mongoose.model('buttonFilter', ButtonFilter);
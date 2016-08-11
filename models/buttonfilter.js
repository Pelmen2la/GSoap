'use strict';

var mongoose = require('mongoose');

var ButtonFilter = new mongoose.Schema({
    name: String,
    isActive: Boolean,
    filters: [{
        name: String,
        productTypes: [String],
        properties: [String],
        isActive: Boolean
    }]
});

mongoose.model('buttonFilter', ButtonFilter);
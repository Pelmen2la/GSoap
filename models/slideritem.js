'use strict';

var mongoose = require('mongoose');

var SliderItemScheme = new mongoose.Schema({
    imageName: {
        type: String,
        required: true,
        unique: true
    },
    url: String
});

mongoose.model('slideritem', SliderItemScheme);
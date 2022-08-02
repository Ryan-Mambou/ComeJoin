const mongoose = require('mongoose');


const questionSchema = mongoose.Schema({
author: {type: String, required: true},
name: {type: String, required: true},
firstName: {type: String, required: true},
country: {type: String, required: true},
town: {type: String, required: true},
email: {type: String, required: true},
topic: {type: String, required: true},
question: {type: String, required: true},
})

module.exports = mongoose.model('Question', questionSchema);
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
name: {type: String, required: true},
firstName: {type: String, required: true},
country: {type: String, required: true},
town: {type: String, required: true},
email: {type: String, required: true, unique: true},
password: {type: String, required: true},
questions: [{type: String, ref: 'Questions'}]
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
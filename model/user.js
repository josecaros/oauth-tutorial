const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const User = mongoose.Schema({
    _id: String,
    userName:String,
    email:String
});

module.exports = mongoose.model('user', User);
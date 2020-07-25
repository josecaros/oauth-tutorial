const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const User = mongoose.Schema({
    userName:String,
    googleId: String,
    email:String
});

module.exports = mongoose.model('user', User);
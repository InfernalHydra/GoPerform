var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = {
    name: String,
    username: String,
    password: String,
    email: String,
    phoneNumber: String,
    socialHandle: String,
};

var User = mongoose.model("User", userSchema);

module.exports = User;
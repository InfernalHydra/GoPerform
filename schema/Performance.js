var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var performanceSchema = new Schema({
    location: {latitude : Number, longitude : Number},
    title: String,
    genre: String,
    user : {
        username : {type : String},
        name : {type : String},
        email : {type : String},
        phoneNumber : {type : String},
        socialHandle: {type : String},
    },
});

var Performance = mongoose.model('Performance', performanceSchema);
module.exports = Performance;
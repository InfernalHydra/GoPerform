var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var performanceSchema = new Schema({
    location: {latitude : Number, longitude : Number},
    title: String,
    user : [ ObjectId ],
});

var Performance = mongoose.model('Performance', performanceSchema);
module.exports = Performance;
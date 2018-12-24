var mongoose = require('mongoose');
var LocationSchema = new mongoose.Schema({
    name: String,
    who: String,
    whom: String,
    when: Date,
    lng: String,
    lat: String,
    type: Number
});
mongoose.model('Location', LocationSchema);
module.exports = mongoose.model('Location');
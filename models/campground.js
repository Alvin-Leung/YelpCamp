var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
       name: String,
       imageURL: String,
       description: String
    });
    
var Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;
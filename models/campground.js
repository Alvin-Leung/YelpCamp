var mongoose = require("mongoose"),
    Comment = require("./comment.js");

var campgroundSchema = new mongoose.Schema({
       name: String,
       imageURL: String,
       description: String,
       author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: String
       },
       comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ]
    });
    
var Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;
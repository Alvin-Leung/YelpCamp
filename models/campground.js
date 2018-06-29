var mongoose = require("mongoose"),
    Comment = require("./comment.js");

var campgroundSchema = new mongoose.Schema({
    name: String,
    imageURL: String,
    description: String,
    pricePerNight: String,
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
    ],
    averageRating: {
        type: Number,
        default: 0
    }
});
    
campgroundSchema.methods.updateAverageRating = function(callback) {
    this.populate("comments", function(err, populatedCampground) {
        if (err || populatedCampground === null)
        {
            callback(err, null);
        }
        else 
        {
            if (populatedCampground.comments.length > 0)
            {
                var sum = 0;
            
                populatedCampground.comments.forEach(function(comment) {
                    sum += comment.rating;
                })
                
                populatedCampground.averageRating = Math.round(sum/populatedCampground.comments.length);
            }
            else
            {
                populatedCampground.averageRating = 0;
            }
            
            callback(null, populatedCampground);    
        }
    })
}
    
var Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;
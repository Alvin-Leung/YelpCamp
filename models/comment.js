var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
             type: mongoose.Schema.Types.ObjectId,
             ref: "User"
        },
        username: String
    },
    rating: Number,
    created: { 
        type: Date, 
        default: Date.now 
    }
});

commentSchema.pre('remove', function(next) {
    this.model('Campground').update(
        {}, 
        { "$pull": { "comments": this._id } }, 
        { multi: true }, 
        next);
});

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
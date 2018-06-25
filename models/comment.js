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
    
var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
var express = require("express"),
    router = express.Router(),
    middleware = require("../middleware"),
    Campground = require("../models/campground"),
    Comment = require("../models/comment");

router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) 
        {
            console.log(err);
        }
        else 
        {
            res.render("comments/new", { campground : foundCampground });
        }
    });
});

router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) 
        {
            console.log(err);
        }
        else 
        {
            req.body.comment.author = req.user.username;
            
            Comment.create(req.body.comment, function(err, createdComment) {
                if (err) 
                {
                    console.log(err);    
                }
                else 
                {
                    createdComment.author.id = req.user._id;
                    
                    createdComment.author.username = req.user.username;
                    
                    createdComment.save();
                    
                    foundCampground.comments.push(createdComment);
                    
                    foundCampground.save();
                    
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
});

module.exports = router;
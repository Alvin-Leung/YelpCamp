var express = require("express"),
    router = express.Router(),
    middleware = require("../middleware"),
    Campground = require("../models/campground"),
    Comment = require("../models/comment");

router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) 
        {
            req.flash("error", err.message);
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
            req.flash("error", err.message);
        }
        else 
        {
            req.body.comment.author = req.user.username;
            
            Comment.create(req.body.comment, function(err, createdComment) {
                if (err) 
                {
                    req.flash("error", "Something went wrong");   
                }
                else 
                {
                    createdComment.author.id = req.user._id;
                    
                    createdComment.author.username = req.user.username;
                    
                    createdComment.save();
                    
                    foundCampground.comments.push(createdComment);
                    
                    foundCampground.save();
                    
                    req.flash("success", "Successfully created comment");
                    
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
});

router.get("/campgrounds/:id/comments/:commentID/edit", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err || foundCampground === null) 
        {
            req.flash("error", "Could not find campground");
            
            res.redirect("/campgrounds/");
        }
        else
        {
            Comment.findById(req.params.commentID, function(err, foundComment) {
                if(err || foundComment === null) 
                {
                    req.flash("error", "Could not find comment");
                    
                    res.redirect("/campgrounds/" + req.params.id);
                } 
                else
                {
                    res.render("comments/edit", { campground: foundCampground, comment: foundComment });
                }
            });
        }
    });
});

router.put("/campgrounds/:id/comments/:commentID", function(req, res) {
    res.send("Edited comment");
})

module.exports = router;
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

router.get("/campgrounds/:id/comments/:commentID/edit", middleware.isLoggedIn, middleware.checkCommentOwnership, function(req, res) {
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

router.put("/campgrounds/:id/comments/:commentID", middleware.isLoggedIn, middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.commentID, req.body.comment, function(err, updatedComment) {
        if (err) {
            req.flash("error", "Could not update comment");
        }
        else 
        {
            req.flash("success", "Changes to comment saved");
        }
        
        res.redirect("/campgrounds/" + req.params.id);
    });
});

router.delete("/campgrounds/:id/comments/:commentID", middleware.isLoggedIn, middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.commentID, function(err) {
        if (err) 
        {
            req.flash("error", "Could not remove comment");
        }
        else
        {
            req.flash("success", "Comment deleted");
        }
        
        res.redirect("/campgrounds/" + req.params.id);
    });
});

module.exports = router;
var express = require("express"),
    router = express.Router(),
    Campground = require("../models/campground"),
    Comment = require("../models/comment");

router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
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

router.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
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
                    foundCampground.comments.push(createdComment);
                    
                    foundCampground.save();
                    
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
    {
        return next();   
    }
    else
    {
        res.redirect("/login");
    }
}

module.exports = router;
var Campground = require("../models/campground"),
    Comment = require("../models/comment");

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
    {
        return next();   
    }
    else
    {
        req.flash("error", "Login required");
        
        res.redirect("/login");
    }
}

function checkCampgroundOwnership(req, res, next) {
    var currentUserID = req.user._id;
    
    var campgroundID = req.params.id;
    
    Campground.findById(campgroundID, function(err, foundCampground) {
        if (err || foundCampground === null) 
        {
            req.flash("error", "Campground not found");
            
            res.redirect("/campgrounds");
        }    
        else 
        {
            if(foundCampground.author.id.equals(currentUserID))
            {
                next();
            }
            else 
            {
                req.flash("error", "You are not authorized to modify this campground");
                
                res.redirect("/campgrounds/" + campgroundID);
            }
        }
    });
}

function checkCommentOwnership(req, res, next) {
    var currentUserID = req.user._id,
        campgroundID = req.params.id,
        commentID = req.params.commentID;
    
    Comment.findById(commentID, function(err, foundComment) {
        if (err || foundComment === null)
        {
            req.flash("error", "Comment not found");
            
            res.redirect("/campgrounds/" + campgroundID);
        }
        else if (foundComment.author.id.equals(currentUserID))
        {
            next();
        }
        else 
        {
            req.flash("error", "You are not authorized to modify this comment");
            
            res.redirect("/campgrounds/" + campgroundID);
        }
    });
}

var middlewareObj = {
    isLoggedIn: isLoggedIn,
    checkCampgroundOwnership: checkCampgroundOwnership,
    checkCommentOwnership: checkCommentOwnership
};

module.exports = middlewareObj;
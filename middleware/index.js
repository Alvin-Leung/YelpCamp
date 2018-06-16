var Campground = require("../models/campground");

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

function checkCampgroundOwnership(req, res, next) {
    var currentUserID = req.user._id;
    
    var campgroundID = req.params.id;
    
    Campground.findById(campgroundID, function(err, foundCampground) {
        if (err) 
        {
            res.redirect("back");
        }    
        else 
        {
            if(foundCampground.author.id.equals(currentUserID))
            {
                next();
            }
            else 
            {
                res.redirect("back");
            }
        }
    });
}

var middlewareObj = {
    isLoggedIn: isLoggedIn,
    checkCampgroundOwnership: checkCampgroundOwnership
};

module.exports = middlewareObj;
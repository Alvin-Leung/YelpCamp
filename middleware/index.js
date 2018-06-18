var Campground = require("../models/campground");

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

var middlewareObj = {
    isLoggedIn: isLoggedIn,
    checkCampgroundOwnership: checkCampgroundOwnership
};

module.exports = middlewareObj;
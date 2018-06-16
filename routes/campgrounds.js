var express = require("express"),
    router = express.Router(),
    Campground = require("../models/campground");

router.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if (err)
        {
            console.log(err);
            
            res.render("campgrounds/index", { campgrounds: [] });
        }
        else
        {
            res.render("campgrounds/index", { campgrounds: campgrounds });
        }
    })
});

router.post("/campgrounds", isLoggedIn, function(req, res) {
    var newCampground = req.body.campground;
    
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    
    newCampground.author = author;
    
    Campground.create(newCampground, function(err, createdCampground) {
        if (err) 
        {
            console.log(err);
        }
        else 
        {
            createdCampground.save();
            
            res.redirect("/campgrounds");
        }
    });
});

router.get("/campgrounds/new", isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

router.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) 
        {
            console.log(err);
        }
        else 
        {
            res.render("campgrounds/show", { campground: foundCampground });
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
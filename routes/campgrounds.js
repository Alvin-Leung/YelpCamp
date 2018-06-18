var express = require("express"),
    router = express.Router(),
    middleware = require("../middleware"),
    Campground = require("../models/campground");

router.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if (err)
        {
            req.flash("error", "Something went wrong");
            
            res.render("campgrounds/index", { campgrounds: [] });
        }
        else
        {
            res.render("campgrounds/index", { campgrounds: campgrounds });
        }
    })
});

router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

router.post("/campgrounds", middleware.isLoggedIn, function(req, res) {
    var newCampground = req.body.campground;
    
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    
    newCampground.author = author;
    
    Campground.create(newCampground, function(err, createdCampground) {
        if (err) 
        {
            req.flash("error", err.message);
        }
        else 
        {
            createdCampground.save();
            
            req.flash("success", "Successfully created new campground");
            
            res.redirect("/campgrounds/" + createdCampground._id);
        }
    });
});

router.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err || foundCampground === null) 
        {
            req.flash("error", "The specified campground does not exist");

            res.redirect("/campgrounds");
        }
        else 
        {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

router.get("/campgrounds/:id/edit", middleware.isLoggedIn, middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        res.render("campgrounds/edit", { campground: foundCampground });
    });
});

router.put("/campgrounds/:id", middleware.isLoggedIn, middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        req.flash("success", "Changes to campground saved");
        
        res.redirect("/campgrounds/" + req.params.id);
    });
});

router.delete("/campgrounds/:id", middleware.isLoggedIn, middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        req.flash("success", "Campground successfully deleted");
        
        res.redirect("/campgrounds");
    }); 
});

module.exports = router;
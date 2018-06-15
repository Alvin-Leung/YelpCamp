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

router.post("/campgrounds", function(req, res) {
    var campground = {
        name: req.body.campgroundName,
        imageURL: req.body.imageURL,
        description: req.body.description
    }
    
    Campground.create(campground, function(err) {
        if (err) 
        {
            console.log(err);
        }
        else 
        {
            res.redirect("/campgrounds");
        }
    });
});

router.get("/campgrounds/new", function(req, res) {
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

module.exports = router;
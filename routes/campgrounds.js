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

router.get("/campgrounds/:id/edit", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err)
        {
            console.log(err);
            
            res.redirect("/campgrounds");
        }
        else
        {
            res.render("campgrounds/edit", { campground: foundCampground });
        }
    });
});

router.put("/campgrounds/:id", function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) 
        {
            console.log(err);
            
            res.redirect("/campgrounds");
        }
        else 
        {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/campgrounds/:id", function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) 
        {
            console.log(err);
            
            res.redirect("/campgrounds/" + req.params.id);
        }
        else 
        {
            res.redirect("/campgrounds");
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
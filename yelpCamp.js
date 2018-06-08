var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    app = express();
    
var Campground = require("./models/campground.js")
    
mongoose.connect("mongodb://localhost/yelpcamp");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if (err)
        {
            console.log(err);
            
            res.render("index", { campgrounds: [] });
        }
        else
        {
            res.render("index", { campgrounds: campgrounds });
        }
    })
});

app.post("/campgrounds", function(req, res) {
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

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.get("/campgrounds/:id", function(req, res) {
    var id = req.params.id;
    
    Campground.findById(id, function(err, foundCampground) {
        if (err) 
        {
            console.log(err);
        }
        else 
        {
            res.render("show", { campground: foundCampground });
        }
    })
});

module.exports.start = function() {
    app.listen(process.env.PORT, process.env.IP, function() {
        console.log("server started..");
    });
}

module.exports.addCampground = function(campground) {
    Campground.create(campground, function(err, addedCampground) {
        if (err)
        {
            console.log(err);
        }
        else
        {
            console.log(addedCampground);
        }
    });
}
var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    app = express();
    
var Campground = require("./models/campground.js")

var Comment = require("./models/comment.js");
    
mongoose.connect("mongodb://localhost/yelpcamp");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
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
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req, res) {
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

app.get("/campgrounds/:id/comments/new", function(req, res) {
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

app.post("/campgrounds/:id/comments", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) 
        {
            console.log(err);
        }
        else 
        {
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

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started..");
});
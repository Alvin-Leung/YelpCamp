var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    app = express();
    
var campgroundSchema = new mongoose.Schema({
       name: String,
       imageURL: String
    });
    
var Campground = mongoose.model("Campground", campgroundSchema);
    
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
            
            res.render("campgrounds", { campgrounds: [] });
        }
        else
        {
            res.render("campgrounds", { campgrounds: campgrounds });
        }
    })
});

app.post("/campgrounds", function(req, res) {
    var campground = {
        name: req.body.campgroundName,
        imageURL: req.body.imageURL
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

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started..");
});
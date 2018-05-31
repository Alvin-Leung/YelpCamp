var express = require("express");

var bodyParser = require("body-parser");

var app = express();

var campgrounds = 
    [
        { 
            name: "Lake Pleasant",
            imageURL: "https://img.sunset02.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/2016/10/main/hoodview-campground-0510.jpg?itok=xo0RuR6u"
        },
        {
            name: "False Creek",
            imageURL: "https://res.cloudinary.com/simpleview/image/upload/c_limit,f_auto,h_1200,q_75,w_1200/v1/clients/poconos/Campgrounds_Tent_Sites_Woman_Hemlock_Campground_4_PoconoMtns_06f196d5-8814-4803-a132-8a4daae1755e.jpg"
        },
        {
            name: "Deborah Falls",
            imageURL: "https://mitadmissions.org/images/mit-blogs/P1030843.JPG"
        },
        { 
            name: "Lake Pleasant",
            imageURL: "https://img.sunset02.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/2016/10/main/hoodview-campground-0510.jpg?itok=xo0RuR6u"
        },
        {
            name: "False Creek",
            imageURL: "https://res.cloudinary.com/simpleview/image/upload/c_limit,f_auto,h_1200,q_75,w_1200/v1/clients/poconos/Campgrounds_Tent_Sites_Woman_Hemlock_Campground_4_PoconoMtns_06f196d5-8814-4803-a132-8a4daae1755e.jpg"
        },
        {
            name: "Deborah Falls",
            imageURL: "https://mitadmissions.org/images/mit-blogs/P1030843.JPG"
        },
        { 
            name: "Lake Pleasant",
            imageURL: "https://img.sunset02.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/2016/10/main/hoodview-campground-0510.jpg?itok=xo0RuR6u"
        },
        {
            name: "False Creek",
            imageURL: "https://res.cloudinary.com/simpleview/image/upload/c_limit,f_auto,h_1200,q_75,w_1200/v1/clients/poconos/Campgrounds_Tent_Sites_Woman_Hemlock_Campground_4_PoconoMtns_06f196d5-8814-4803-a132-8a4daae1755e.jpg"
        },
        {
            name: "Deborah Falls",
            imageURL: "https://mitadmissions.org/images/mit-blogs/P1030843.JPG"
        },
        { 
            name: "Lake Pleasant",
            imageURL: "https://img.sunset02.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/2016/10/main/hoodview-campground-0510.jpg?itok=xo0RuR6u"
        },
        {
            name: "False Creek",
            imageURL: "https://res.cloudinary.com/simpleview/image/upload/c_limit,f_auto,h_1200,q_75,w_1200/v1/clients/poconos/Campgrounds_Tent_Sites_Woman_Hemlock_Campground_4_PoconoMtns_06f196d5-8814-4803-a132-8a4daae1755e.jpg"
        },
        {
            name: "Deborah Falls",
            imageURL: "https://mitadmissions.org/images/mit-blogs/P1030843.JPG"
        }
    ];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", function(req, res) {
    var newCampground = {
        name: req.body.campgroundName,
        imageURL: req.body.imageURL
    };
    
    campgrounds.push(newCampground);
    
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started..");
});
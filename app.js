var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    expressSession = require("express-session"),
    bodyParser = require("body-parser"),
    app = express(),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user");
    
mongoose.connect("mongodb://localhost/yelpcamp");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public"));

// --------------
// Authentication
// --------------

app.use(expressSession({
    secret: "campgrounds rock!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());

app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

// ======
// ROUTES
// ======

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

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
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

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
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

app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {
    
});

app.get("/register", function(req, res) {
    res.render("register"); 
});

app.post("/register", function(req, res) {
    var newUser = new User({ username: req.body.username });
    
    User.register(newUser, req.body.password, function(err, user) {
        if (err) 
        {
            console.log(err);
            
            res.redirect("/register");
        }
        else
        {
            passport.authenticate("local")(req, res, function() {
                res.redirect("/campgrounds");
            });
        }
    }); 
});

app.get("/logout", function(req, res) {
    req.logout();
    
    res.redirect("/campgrounds");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started..");
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
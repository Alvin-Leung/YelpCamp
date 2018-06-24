var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user");

router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
}), function(req, res) {
    req.flash("success", "Welcome back to YelpCamp " + req.user.username + "!");
    
    res.redirect("/campgrounds");
});

router.get("/register", function(req, res) {
    res.render("register"); 
});

router.post("/register", function(req, res) {
    var newUser = new User({ username: req.body.username });
    
    User.register(newUser, req.body.password, function(err, user) {
        if (err) 
        {
            req.flash("error", err.message);
            
            res.redirect("/register");
        }
        else
        {
            passport.authenticate("local")(req, res, function() {
                req.flash("success", "Welcome to YelpCamp " + user.username + "!");
                
                res.redirect("/campgrounds");
            });
        }
    }); 
});

router.get("/logout", function(req, res) {
    req.logout();
    
    req.flash("success", "You have been successfully logged out");
    
    res.redirect("/campgrounds");
});

module.exports = router;
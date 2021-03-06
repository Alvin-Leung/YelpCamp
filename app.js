var port = process.env.PORT || "3000";

var ipAddress = process.env.IP || "0.0.0.0";

var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    expressSession = require("express-session"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    flash = require("connect-flash"),
    app = express(),
    User = require("./models/user");
    
var indexRoutes = require("./routes/index"),
    campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes = require("./routes/comments"),
    authenticationRoutes = require("./routes/authentication");

mongoose.connect(process.env.YELPCAMPDB);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

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

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.message = req.flash();
    next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(authenticationRoutes);

app.listen(port, ipAddress, function() {
    console.log("server started..");
});
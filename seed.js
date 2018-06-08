var mongoose = require("mongoose"),
    Campground = require("./models/campground.js"),
    Comment = require("./models/comment.js");

mongoose.connect("mongodb://localhost/yelpcamp");

var campgrounds = 
    [
        { 
            name: "Lake Pleasant",
            imageURL: "https://img.sunset02.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/2016/10/main/hoodview-campground-0510.jpg?itok=xo0RuR6u",
            description: "This campsite is quite pleasant"
        },
        {
            name: "False Creek",
            imageURL: "https://res.cloudinary.com/simpleview/image/upload/c_limit,f_auto,h_1200,q_75,w_1200/v1/clients/poconos/Campgrounds_Tent_Sites_Woman_Hemlock_Campground_4_PoconoMtns_06f196d5-8814-4803-a132-8a4daae1755e.jpg",
            description: "This is a real creek"
        },
        {
            name: "Deborah Falls",
            imageURL: "https://mitadmissions.org/images/mit-blogs/P1030843.JPG",
            description: "A beautiful campsite with a stunning waterfall"
        }
    ];
    
var comments = 
    [
        {
            text: "This place is great",
            author: "Hermione"
        },
        {
            text: "Would definitely come again",
            author: "Fred"
        },
        {
            text: "11/10 for me",
            author: "Sammy"
        }
    ];

Campground.remove({}, function(err) {
    if (err) {
        console.log(err);
    } 
    else {
        console.log("Removed all campgrounds");
        
        Comment.remove({}, function(err) {
            if (err) {
                console.log(err);
            } 
            else {
                console.log("Removed all comments");
                
                seedDatabase();
            }
        });
    }
});

function seedDatabase() {
    campgrounds.forEach(function(campground) {
        Campground.create(campground, function(err, addedCampground) {
            if (err) {
                console.log(err);
            } 
            else {
                console.log("Added campground successfully");
                
                Comment.create(comments[0], function(err, createdComment) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        addedCampground.comments.push(createdComment);
                        
                        addedCampground.save();
                    }
                });
            }
        });
    });
}
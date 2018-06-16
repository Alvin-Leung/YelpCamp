var mongoose = require("mongoose"),
    Campground = require("./models/campground.js"),
    Comment = require("./models/comment.js");

mongoose.connect("mongodb://localhost/yelpcamp");

var campgrounds = 
    [
        { 
            name: "Lake Pleasant",
            imageURL: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d95171e276fbd03de651f9aecb64b53d&auto=format&fit=crop&w=1350&q=80",
            description: "Lorem ipsum dolor amet kickstarter blue bottle cold-pressed helvetica roof party tattooed retro microdosing woke chia. Truffaut semiotics slow-carb shoreditch street art. Flexitarian direct trade small batch, before they sold out fashion axe hammock readymade cronut gochujang. Quinoa vinyl vexillologist selfies swag lomo narwhal disrupt hella chillwave. Celiac master cleanse thundercats vinyl coloring book. Stumptown thundercats gastropub jianbing microdosing portland plaid asymmetrical, hoodie vape ennui af iceland."
        },
        {
            name: "Snow Lake",
            imageURL: "https://images.unsplash.com/photo-1506535995048-638aa1b62b77?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f3e3ff1cce6d43ff22a50a83269f07ac&auto=format&fit=crop&w=1950&q=80",
            description: "Fixie salvia echo park pinterest four dollar toast XOXO mumblecore, 3 wolf moon 8-bit blog copper mug man bun tilde. Wayfarers ethical trust fund selvage green juice art party narwhal marfa. Church-key drinking vinegar you probably haven't heard of them direct trade salvia. Williamsburg tacos vexillologist chartreuse squid pour-over tofu synth. Hexagon semiotics church-key quinoa poutine flexitarian humblebrag put a bird on it jean shorts selvage cred ennui. Keytar you probably haven't heard of them pitchfork lo-fi fam."
        },
        {
            name: "Deborah Falls",
            imageURL: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5cedc6b95f731395da7269d2341f9a5e&auto=format&fit=crop&w=1950&q=80",
            description: "Ethical polaroid irony cray roof party health goth hashtag retro put a bird on it deep v cornhole. Jean shorts knausgaard vinyl shabby chic schlitz cloud bread adaptogen 3 wolf moon thundercats dreamcatcher. Sartorial authentic squid, vice cold-pressed subway tile gluten-free vinyl. Retro art party seitan, quinoa 8-bit tousled fashion axe bespoke. Jean shorts edison bulb iceland iPhone mustache paleo. Venmo marfa heirloom, direct trade poke enamel pin knausgaard snackwave mixtape mustache before they sold out. Kale chips cloud bread copper mug man braid heirloom irony iceland woke man bun, stumptown knausgaard vexillologist XOXO four loko beard."
        },
        {
            name: "Webber Peaks",
            imageURL: "https://images.unsplash.com/photo-1468956398224-6d6f66e22c35?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5d2e4d45d037053be722233b79bd0510&auto=format&fit=crop&w=1355&q=80",
            description: "Fixie salvia echo park pinterest four dollar toast XOXO mumblecore, 3 wolf moon 8-bit blog copper mug man bun tilde. Wayfarers ethical trust fund selvage green juice art party narwhal marfa. Church-key drinking vinegar you probably haven't heard of them direct trade salvia. Williamsburg tacos vexillologist chartreuse squid pour-over tofu synth. Hexagon semiotics church-key quinoa poutine flexitarian humblebrag put a bird on it jean shorts selvage cred ennui. Keytar you probably haven't heard of them pitchfork lo-fi fam."
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
                
                // Comment.create(comments[0], function(err, createdComment) {
                //     if (err) {
                //         console.log(err);
                //     }
                //     else {
                //         addedCampground.comments.push(createdComment);
                        
                //         addedCampground.save();
                //     }
                // });
            }
        });
    });
}
var mongoose = require("mongoose"),
    User = require("./models/user.js"),
    Campground = require("./models/campground.js"),
    Comment = require("./models/comment.js");

mongoose.connect(process.env.YELPCAMPDB);

var campgrounds = 
    [
        { 
            name: "Lake Pleasant",
            imageURL: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d1c8cc988efddbda8746281871c0c8bf&auto=format&fit=crop&w=1259&q=80",
            description: "Lorem ipsum dolor amet kickstarter blue bottle cold-pressed helvetica roof party tattooed retro microdosing woke chia. Truffaut semiotics slow-carb shoreditch street art. Flexitarian direct trade small batch, before they sold out fashion axe hammock readymade cronut gochujang. Quinoa vinyl vexillologist selfies swag lomo narwhal disrupt hella chillwave. Celiac master cleanse thundercats vinyl coloring book. Stumptown thundercats gastropub jianbing microdosing portland plaid asymmetrical, hoodie vape ennui af iceland.",
            pricePerNight: "45.00"
        },
        {
            name: "Grand Lake Park",
            imageURL: "https://images.unsplash.com/photo-1506535995048-638aa1b62b77?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f3e3ff1cce6d43ff22a50a83269f07ac&auto=format&fit=crop&w=1950&q=80",
            description: "Fixie salvia echo park pinterest four dollar toast XOXO mumblecore, 3 wolf moon 8-bit blog copper mug man bun tilde. Wayfarers ethical trust fund selvage green juice art party narwhal marfa. Church-key drinking vinegar you probably haven't heard of them direct trade salvia. Williamsburg tacos vexillologist chartreuse squid pour-over tofu synth. Hexagon semiotics church-key quinoa poutine flexitarian humblebrag put a bird on it jean shorts selvage cred ennui. Keytar you probably haven't heard of them pitchfork lo-fi fam.",
            pricePerNight: "25.93"
        },
        {
            name: "Almond Meadows",
            imageURL: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5cedc6b95f731395da7269d2341f9a5e&auto=format&fit=crop&w=1950&q=80",
            description: "Ethical polaroid irony cray roof party health goth hashtag retro put a bird on it deep v cornhole. Jean shorts knausgaard vinyl shabby chic schlitz cloud bread adaptogen 3 wolf moon thundercats dreamcatcher. Sartorial authentic squid, vice cold-pressed subway tile gluten-free vinyl. Retro art party seitan, quinoa 8-bit tousled fashion axe bespoke. Jean shorts edison bulb iceland iPhone mustache paleo. Venmo marfa heirloom, direct trade poke enamel pin knausgaard snackwave mixtape mustache before they sold out. Kale chips cloud bread copper mug man braid heirloom irony iceland woke man bun, stumptown knausgaard vexillologist XOXO four loko beard.",
            pricePerNight: "34.67"
        },
        {
            name: "Webber Peaks",
            imageURL: "https://images.unsplash.com/photo-1506960854620-e7f3edf5b29d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=58d5628c7f2e5b3eb8d9ced1f2f72c46&auto=format&fit=crop&w=1936&q=80",
            description: "Fixie salvia echo park pinterest four dollar toast XOXO mumblecore, 3 wolf moon 8-bit blog copper mug man bun tilde. Wayfarers ethical trust fund selvage green juice art party narwhal marfa. Church-key drinking vinegar you probably haven't heard of them direct trade salvia. Williamsburg tacos vexillologist chartreuse squid pour-over tofu synth. Hexagon semiotics church-key quinoa poutine flexitarian humblebrag put a bird on it jean shorts selvage cred ennui. Keytar you probably haven't heard of them pitchfork lo-fi fam.",
            pricePerNight: "29.22"
        },
        { 
            name: "McGregor Park",
            imageURL: "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1c80f31bb4040015d51db663252fbd30&auto=format&fit=crop&w=1953&q=80",
            description: "Lorem ipsum dolor amet kickstarter blue bottle cold-pressed helvetica roof party tattooed retro microdosing woke chia. Truffaut semiotics slow-carb shoreditch street art. Flexitarian direct trade small batch, before they sold out fashion axe hammock readymade cronut gochujang. Quinoa vinyl vexillologist selfies swag lomo narwhal disrupt hella chillwave. Celiac master cleanse thundercats vinyl coloring book. Stumptown thundercats gastropub jianbing microdosing portland plaid asymmetrical, hoodie vape ennui af iceland.",
            pricePerNight: "45.00"
        },
        {
            name: "Briarwood Park",
            imageURL: "https://images.unsplash.com/photo-1502218808493-e5fd26249efc?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a924dfa471ed637c604c7adc8a5aacf3&auto=format&fit=crop&w=1950&q=80",
            description: "Fixie salvia echo park pinterest four dollar toast XOXO mumblecore, 3 wolf moon 8-bit blog copper mug man bun tilde. Wayfarers ethical trust fund selvage green juice art party narwhal marfa. Church-key drinking vinegar you probably haven't heard of them direct trade salvia. Williamsburg tacos vexillologist chartreuse squid pour-over tofu synth. Hexagon semiotics church-key quinoa poutine flexitarian humblebrag put a bird on it jean shorts selvage cred ennui. Keytar you probably haven't heard of them pitchfork lo-fi fam.",
            pricePerNight: "25.93"
        },
        {
            name: "Coldwater Meadows",
            imageURL: "https://images.unsplash.com/photo-1508787094006-e564151d4b12?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=12ad7b1d62ef4ffd6dd0a05952db58f5&auto=format&fit=crop&w=1470&q=80",
            description: "Ethical polaroid irony cray roof party health goth hashtag retro put a bird on it deep v cornhole. Jean shorts knausgaard vinyl shabby chic schlitz cloud bread adaptogen 3 wolf moon thundercats dreamcatcher. Sartorial authentic squid, vice cold-pressed subway tile gluten-free vinyl. Retro art party seitan, quinoa 8-bit tousled fashion axe bespoke. Jean shorts edison bulb iceland iPhone mustache paleo. Venmo marfa heirloom, direct trade poke enamel pin knausgaard snackwave mixtape mustache before they sold out. Kale chips cloud bread copper mug man braid heirloom irony iceland woke man bun, stumptown knausgaard vexillologist XOXO four loko beard.",
            pricePerNight: "34.67"
        },
        {
            name: "Clearview Park",
            imageURL: "https://images.unsplash.com/photo-1528774796458-8a45cd2360de?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7395abfce3dc5f268d7f531f21b2ea4c&auto=format&fit=crop&w=1950&q=80",
            description: "Fixie salvia echo park pinterest four dollar toast XOXO mumblecore, 3 wolf moon 8-bit blog copper mug man bun tilde. Wayfarers ethical trust fund selvage green juice art party narwhal marfa. Church-key drinking vinegar you probably haven't heard of them direct trade salvia. Williamsburg tacos vexillologist chartreuse squid pour-over tofu synth. Hexagon semiotics church-key quinoa poutine flexitarian humblebrag put a bird on it jean shorts selvage cred ennui. Keytar you probably haven't heard of them pitchfork lo-fi fam.",
            pricePerNight: "29.22"
        },
        { 
            name: "Moonlight Park",
            imageURL: "https://images.unsplash.com/photo-1519790751650-82078ca9d4f3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9dbccd134520f0fa2a2cda23edf237e0&auto=format&fit=crop&w=1950&q=80",
            description: "Lorem ipsum dolor amet kickstarter blue bottle cold-pressed helvetica roof party tattooed retro microdosing woke chia. Truffaut semiotics slow-carb shoreditch street art. Flexitarian direct trade small batch, before they sold out fashion axe hammock readymade cronut gochujang. Quinoa vinyl vexillologist selfies swag lomo narwhal disrupt hella chillwave. Celiac master cleanse thundercats vinyl coloring book. Stumptown thundercats gastropub jianbing microdosing portland plaid asymmetrical, hoodie vape ennui af iceland.",
            pricePerNight: "45.00"
        },
        {
            name: "Englesonee Park",
            imageURL: "https://images.unsplash.com/photo-1504701365486-b44b67f99439?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8caa83bf3aa0e9a07827ddb36e9fc948&auto=format&fit=crop&w=2094&q=80",
            description: "Fixie salvia echo park pinterest four dollar toast XOXO mumblecore, 3 wolf moon 8-bit blog copper mug man bun tilde. Wayfarers ethical trust fund selvage green juice art party narwhal marfa. Church-key drinking vinegar you probably haven't heard of them direct trade salvia. Williamsburg tacos vexillologist chartreuse squid pour-over tofu synth. Hexagon semiotics church-key quinoa poutine flexitarian humblebrag put a bird on it jean shorts selvage cred ennui. Keytar you probably haven't heard of them pitchfork lo-fi fam.",
            pricePerNight: "25.93"
        },
        {
            name: "Stevenson Grounds",
            imageURL: "https://images.unsplash.com/photo-1513104399965-f5160d963d39?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4b7c1b47415fd5180345ba05cb067f87&auto=format&fit=crop&w=1950&q=80",
            description: "Ethical polaroid irony cray roof party health goth hashtag retro put a bird on it deep v cornhole. Jean shorts knausgaard vinyl shabby chic schlitz cloud bread adaptogen 3 wolf moon thundercats dreamcatcher. Sartorial authentic squid, vice cold-pressed subway tile gluten-free vinyl. Retro art party seitan, quinoa 8-bit tousled fashion axe bespoke. Jean shorts edison bulb iceland iPhone mustache paleo. Venmo marfa heirloom, direct trade poke enamel pin knausgaard snackwave mixtape mustache before they sold out. Kale chips cloud bread copper mug man braid heirloom irony iceland woke man bun, stumptown knausgaard vexillologist XOXO four loko beard.",
            pricePerNight: "34.67"
        },
        {
            name: "Chitague Park",
            imageURL: "https://images.unsplash.com/photo-1501703979959-797917eb21c8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d4132e8087781addd674e137a9f596dc&auto=format&fit=crop&w=1489&q=80",
            description: "Fixie salvia echo park pinterest four dollar toast XOXO mumblecore, 3 wolf moon 8-bit blog copper mug man bun tilde. Wayfarers ethical trust fund selvage green juice art party narwhal marfa. Church-key drinking vinegar you probably haven't heard of them direct trade salvia. Williamsburg tacos vexillologist chartreuse squid pour-over tofu synth. Hexagon semiotics church-key quinoa poutine flexitarian humblebrag put a bird on it jean shorts selvage cred ennui. Keytar you probably haven't heard of them pitchfork lo-fi fam.",
            pricePerNight: "29.22"
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

User.remove({}, function(err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Removed all users");
        
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
    }
});

function seedDatabase() {
    
    var newUser = new User({ username: "Kaitlin" });
    
    var password = "password";
    
    User.register(newUser, password, function(err, registeredUser) {
        if (err) 
        {
            console.log(err);
        }
        else
        {
            console.log("Example user registration successful");
            
            campgrounds.forEach(function(campground) {
                Campground.create(campground, function(err, createdCampground) {
                    if (err) 
                    {
                        console.log("Error creating campground");
                    }
                    else 
                    {
                        createdCampground.author.id = registeredUser._id;
                        
                        createdCampground.author.username = registeredUser.username;
                        
                        createdCampground.save();
                        
                        console.log("Campground created successfully");
                    }
                });
            });
        }
    }); 
}
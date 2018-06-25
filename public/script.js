$(document).ready(function() {
    $(".back-btn").click(function() {
        window.history.back();
    });
    
    var originalAddClassMethod = $.fn.addClass;

    $.fn.addClass = function(){
        // Execute the original method.
        var result = originalAddClassMethod.apply( this, arguments );

        // trigger a custom event
        $(this).trigger("cssClassChanged");
    
        // return the original result
        return result;
    }
    
    $(".comment-review span").bind("cssClassChanged", function() {
        var numEnabledStars = $(".glyphicon-star").length;
        
        $("#rating-input").attr("value", numEnabledStars);
    });
    
    var reviewStars = $(".comment-review span");
    
    reviewStars.each(function(index, star) {
    	bindMouseHoverEvents(star, index);
    	
    	$(star).click(function() {
    	    var events = $._data(this, 'events');
    	    
    	    var isStarDisabled = events && events.mouseover && events.mouseout;
    	    
    	    if (isStarDisabled)
    	    {
    	        enableStarAndStarsToLeft(this, index);
    	    }
    	    else
    	    {
    	       disableStars(this, index);
    	    }
    	});
    });
    
    function disableStars(star, index) {
        var nextEvents;
    	        
        var nextStarIsDisabled;
        
        var isRightmostStar = index === reviewStars.length-1;
        
        if (isRightmostStar)
        {
            disableStarAndStarsToLeft(star, index);
        }
        else
        {
            nextEvents = $._data(reviewStars[index+1], 'events');
            
            nextStarIsDisabled = nextEvents && nextEvents.mouseover && nextEvents.mouseout;
            
            if (nextStarIsDisabled)
            {
                disableStarAndStarsToLeft(star, index);
            }
            else
            {
                disableStarsToRight(index);
            }
        }
    }
    
    function enableStarAndStarsToLeft(star, index) {
        // toggle star on and unbind events
        unbindMouseHoverEvents(star);
        
        for(var i=index-1; i>=0; i--)
        {
            unbindMouseHoverEvents(reviewStars[i]);
        }
    }
    
    function disableStarAndStarsToLeft(star, index) {
        // toggle star off and bind events
        bindMouseHoverEvents(star, index);
        
        // cascade changes to leftward stars only
        for(var i=index-1; i>=0; i--)
        {
            bindMouseHoverEvents(reviewStars[i], i);
        }
    }
    
    function disableStarsToRight(index) {
        var nextEvents;
        
        var nextHasMouseHoverEvents;
        
        // cascade changes to rightward stars only
        for(var k=index+1; k<=reviewStars.length-1; k++)
        {
            nextEvents = $._data(reviewStars[k], 'events');
            
            nextHasMouseHoverEvents = nextEvents && nextEvents.mouseover && nextEvents.mouseout;
            
            if (nextHasMouseHoverEvents)
            {
                break;
            }
            else
            {
                bindMouseHoverEvents(reviewStars[k], k);
                
                removeStarFill(reviewStars[k]);
            }
        }
    }
    
    function bindMouseHoverEvents(star, index) {
        $(star).mouseenter(function() {
    	    addStarFill(this);
    	    
    	    if (index > 0)
    	    {
    	        $(reviewStars[index-1]).trigger("mouseenter");
    	    }
    	});
    	
    	$(star).mouseleave(function() {
    	    removeStarFill(this);
    	    
    	    if (index > 0)
    	    {
    	        $(reviewStars[index-1]).trigger("mouseleave");
    	    }
    	});
    }
    
    function unbindMouseHoverEvents(star) {
        $(star).unbind("mouseenter");
        
        $(star).unbind("mouseleave");
    }
    
    function addStarFill(star) {
        $(star).removeClass("glyphicon-star-empty");
        
        $(star).addClass("glyphicon-star");
    }
    
    function removeStarFill(star) {
        $(star).removeClass("glyphicon-star");
        
        $(star).addClass("glyphicon-star-empty");
    }
});
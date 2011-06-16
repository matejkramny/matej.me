$(document).ready(function(){
    $(".JQ_about_me").nav_flyup( { div:"about_me", baseDiv:".JQ_about_me" } );
    $(".JQ_log_in").nav_flyup( { div:"log_in", baseDiv:".JQ_log_in" } );
    $(".JQ_portfolio").nav_flyup( { div:"portfolio", baseDiv:".JQ_portfolio" } );
    $(".JQ_contact").nav_flyup( { div:"contact", baseDiv:".JQ_contact" } );
});

$.fn.nav_flyup = function (){
    var args = arguments[0] || {};
    
    var nav = args.div;
    var base = args.baseDiv;
    
    $(base + " a").mouseover(function(){
        $(base + " div#" + nav + ", " + base + " div#" + nav + "_active").stop(true).animate({
            'bottom':'50px'
        }, 'fast');
        $(base + " div#" + nav + "_active").css ( {
            'opacity': 0, 
            'visibility': 'visible'
        } ).animate( {
            opacity: 1
        }, 'fast' );
        $(base + " a").animate ( {
            'top':'-50px', 
            'height':'129px'
        } );
    }).mouseout (function(){
        $(base + " div#" + nav + "_active").stop(true).animate( {
            opacity: 0
        }, 'fast', function() {
            $(base + " a").animate( {
                'top':'0px', 
                'height':'79px'
            } );
            $(base + " div#" + nav).animate({
                'height':'79px', 
                'bottom':'0px'
            }, 'slow');
        } );
    }).click(function(){
        // click event handler
        window.location = nav + ".html";
        return false;
    });
};
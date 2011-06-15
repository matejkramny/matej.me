$(document).ready(function(){
    $(".JQ_about_me a").mouseover(function(){
        $(".JQ_about_me div#about_me, .JQ_about_me div#about_me_active").stop(true).animate({ 'bottom':'50px' }, 'fast');
        $(".JQ_about_me div#about_me_active").css ( { 'opacity': 0, 'visibility': 'visible' } ).animate( { opacity: 1 }, 'fast' );
        $(this).animate ( { 'top':'-50px', 'height':'129px' } );
    }).mouseout (function(){
        $(".JQ_about_me div#about_me_active").stop(true).animate( { opacity: 0 }, 'fast', function() {
            $(".JQ_about_me a").animate( { 'top':'0px', 'height':'79px' } );
            $(".JQ_about_me div#about_me").animate({ 'height':'79px', 'bottom':'0px'  }, 'slow');
        } );
    });
});
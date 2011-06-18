$(document).ready(function(){
    $(".JQ_about_me").nav_flyup( {
        div:"about_me",
        baseDiv:".JQ_about_me"
    } );
    $(".JQ_log_in").nav_flyup( {
        div:"log_in",
        baseDiv:".JQ_log_in"
    } );
    $(".JQ_portfolio").nav_flyup( {
        div:"portfolio",
        baseDiv:".JQ_portfolio"
    } );
    $(".JQ_contact").nav_flyup( {
        div:"contact",
        baseDiv:".JQ_contact"
    } );

    $('label').disableSelection();
    $().checkbox ();
    $().button ();
    $().inputs ();
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

$.fn.inputs = function ()
{
    var animatingTo = false;
    
    $("input[type=text]").each(function(){
        $(this).focus(function(){
            $(this).parent().toggleClass ("focused");
        }).blur (function(){
            $(this).parent().toggleClass ("focused");
        }).keyup (function(){
            var child = $(this).parent().children("span");
            
            if($(this).val().length > 0)
            {
                var opacity = 0.5;
                
                var defaultTextWidth = $().getTextWidth(child.html());
                var textWidth;
                
                $('body').after ("<div id=\"textWidth\">" + $(this).val() + "</div>");
                textWidth = $("#textWidth").css ({ display: "none", width: 'auto' }).width();
                $("#textWidth").remove();
                
                var textMaxWidth = 243 - defaultTextWidth;
                
                if(textWidth >= textMaxWidth)
                {
                    opacity = 0;
                }
                
                if(animatingTo == false)
                {
                    animatingTo = true;
                    child.stop(true).animate({ opacity:opacity, fontSize: "18px", width:'293px' }, 'fast', function(){
                        animatingTo = false;
                    });
                }
            }
            else if(child.width() == '293')
            {
                child.stop(true).animate({ fontSize: "5px", opacity:0 }, 'fast', function(){
                    $(this).css ('width', 'auto').animate({ fontSize:"18px", opacity: 1 }, 'fast');
                    animatingFrom = false;
                });
            }
        });
    });
}

$.fn.getTextWidth = function()
{
    $('body').after ("<div id=\"textWidth\">" + arguments[0] + "</div>");
    var textWidth = $("#textWidth").css ({ display: "none", width: "auto" }).width();
    $("#textWidth").remove();
    
    return textWidth;
}

$.fn.checkbox = function ()
{
    $("input[type=checkbox]").each(function() {
        if($(this).is(":checked"))
            $(this).parent().addClass ("checked");
        else
            $(this).parent().addClass ("unchecked");
    })
    
    $(":checkbox").click (function() {
        if($(this).is(':checked'))
            $(this).parent().removeClass ("unchecked").addClass ("checked");
        else
            $(this).parent().removeClass ("checked").addClass ("unchecked");
    });
}

$.fn.button = function ()
{
    $("input[type=button]").each(function(){
        $(this).addClass ("button").css ("opacity", "0.8").mouseover (function(){
            $(this).stop(true).animate({
                opacity: 1
            }, 'fast');
        }).mouseout(function(){
            $(this).stop(true).animate({
                opacity: 0.8
            }, 'fast');
        });
    });
}

$.fn.disableSelection = function () {
    return this.each(function () {
        if (typeof this.onselectstart != 'undefined') {
            this.onselectstart = function() {
                return false;
            };
        } else if (typeof this.style.MozUserSelect != 'undefined') {
            this.style.MozUserSelect = 'none';
        } else {
            this.onmousedown = function() {
                return false;
            };
        }
    });
};
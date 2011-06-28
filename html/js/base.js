$(document).ready(function(){
    $().nav_flyup();

    $('label').disableSelection();
    $().checkbox ();
    $().button ();
    $().inputs ();
});

$.fn.nav_flyup = function (){
    $("#navigation li").prepend("<span></span>");

    $(active).find("a").css({
        marginTop: -79
    });
    $(active).find("span").css({
        marginTop: 0
    });


    $("#navigation li").hover(function() {
        var id = "#" + this.id;

        if(id == active)
        {
            // do nothing
            return;
        }
        else
        {
            $(active).find("a").stop().animate({
                marginTop: 0
            }, 250);
            $(active).find("span").stop().animate({
                marginTop: 79
            }, 250);
        }

        $(this).find("a").stop().animate({
            marginTop: -79
        }, 250);
        $(this).find("span").stop().animate({
            marginTop: 0
        }, 250);
    } , function() {
        var id = "#" + this.id;

        if(id == active)
        {
            // do nothing
            return;
        }
        else
        {
            $(active).find("a").stop().animate({
                marginTop: -79
            }, 250);
            $(active).find("span").stop().animate({
                marginTop: 0
            }, 250);
        }

        $(this).find("a").stop().animate({
            marginTop: "0"
        }, 250);
        $(this).find("span").stop().animate({
            marginTop: 79
        }, 250);
    }).click(function(){
        var href = $(this).find("a").attr ("href");
        window.location = href;
    });
};

$.fn.inputs = function ()
{
    var animatingTo = false;

    $("input[type=text], input[type=password]").each(function(){
        var child = $(this).parent().children("span");
        var isPasswordField = $(this).is("[type=password]");
        var timeout;

        $(this).focus(function(){
            $(this).parent().toggleClass ("focused");
            child.animate({opacity:0.8},'fast');
        }).blur (function(){
            $(this).parent().toggleClass ("focused");
            child.animate({opacity:1},'fast');
        }).keypress(function(e){
            var opacity = 0.5;

            var defaultTextWidth = $().getTextWidth(child.html());
            var textWidth = $().getTextWidth($(this).val(), isPasswordField);

            var textMaxWidth;
            if(isPasswordField)
                textMaxWidth = 273 - defaultTextWidth;
            else textMaxWidth = 253 - defaultTextWidth;

            if(textWidth >= textMaxWidth)
            {
                opacity = 0;
            }

            child.animate({
                opacity:opacity,
                fontSize: "18px",
                width:'293px'
            }, 'fast', function(){
                $(this).stop(true);
            });
        }).keyup (function(){
            if($(this).val().length > 0)
            {

            }
            else if(child.width() >= '293')
            {
                child.stop(true).animate({
                    fontSize: "5px",
                    opacity:0
                }, 'fast', function(){
                    $(this).css ('width', 'auto').animate({
                        fontSize:"18px",
                        opacity: 1
                    }, 'fast');
                    animatingFrom = false;
                });
            }
        });
    });
}

$.fn.getTextWidth = function()
{
    var password = arguments[1] || false;
    var text = arguments[0] || "";
    var length = text.length;
    var textWidth;

    if(password)
    {
        var bulletWidth = 9;
        textWidth = bulletWidth * length;
    }
    else
    {
        text = text.replace (new RegExp(" ", "g"), ".");
        $('body').after ("<div id=\"textWidth\">" + text + "</div>");
        textWidth = $("#textWidth").css ({
            display: "none",
            width: "auto"
        }).width();
        $("#textWidth").remove();
    }

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
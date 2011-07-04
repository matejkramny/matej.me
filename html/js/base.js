$(document).ready(function(){
    $().nav_flyup();

    $('label').disableSelection();
    $().checkbox ();
    $().button ();
    $().inputs ();
    
    $(".gallery").gallery();
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
            child.animate({
                opacity:0.8
            },'fast');
        }).blur (function(){
            $(this).parent().toggleClass ("focused");
            child.animate({
                opacity:1
            },'fast');
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

$.fn.gallery = function () {
    var gal = $(this);
    var args = arguments[0] || null;
    
    var gal_img = gal.find(".img_content img");
    
    var contents_href = $("#canvas").children("span");
    var contents_h1 = $("#canvas").children("h1");
    var contents_p = $("#canvas").children("p");
            
    if(contents_href.length == 0)
    {
        $("#canvas").append ("<span>&nbsp;</span><h1>&nbsp;</h1><p>&nbsp;</p>");
        
        contents_href = $("#canvas span");
        contents_h1 = $("#canvas h1");
        contents_p = $("#canvas p");
    }
    
    var count = 0;
    
    gal.find("li").each(function (){
        $(this).click(function(){
            var li = $(this);
            
            gal_img.stop(true).animate({
                height: "0px",
                marginTop: "158px"
            },'fast', 'swing', function(){
                gal_img.stop(true).attr("src", li.find("img").attr("src")).animate({
                    height: "339px",
                    marginTop: "0px"
                }, 'fast', 'swing');
            });
            
            contents_h1.stop(true).animate ( {
                left: "-" + contents_h1.width() * 1.3 + "px",
                opacity: 0,
                fontSize : "1px",
                textShadow: "0 0 0px #000"
            }, 200, 'linear', function(){
                contents_href.html( li.children("span").html() );
                contents_h1.html( li.find("h1").html() )
                    .animate({ left: "140px", opacity:1, fontSize: "50px", textShadow: "0 0 2px #000" }, 400);
            });
            contents_p.stop(true).animate ( {
                opacity: 0
            }, 'fast', function (){
                contents_p.html ( li.find("p").html() )
                    .animate({ opacity: 1 }, 'fast');
            });
            
            var h1 = $("#canvas h1").last();
            
            h1.mouseover (function(){
                $(this).stop(true).animate ({
                    textShadow: "0 0 6px #FFF"
                },'fast');
            }).mouseout (function(){
                $(this).stop(true).animate({
                    textShadow: "0 0 2px #000"
                })
            }).click (function(){
                window.location = $("#canvas span").last().text();
            });
        });
        
        if (count == 0) $(this).trigger("click");
        count++;
    });
};
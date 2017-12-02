$('.carousel').carousel({
    interval: 2000
})

$(function(){
    var height = $(".large-banner-container").height();
    $('.search-form').height(height/1.4) 
    $('.search-form').css("top", height*0.2)
    $('.search-form').css("bottom", height*0.2)
    $('.event_postcard').height(240);
    $('.fa-heart').css('margin-top','-90px');

    $(window).resize(function(){
        var newheight = $(".large-banner-container").height();
        $('.search-form').height(newheight/1.4);
        $('.search-form').css("top", newheight*0.2)
        $('.search-form').css("bottom", newheight*0.2)
        $('.event_postcard').height($('.event_postcard').width())
        var card_height = $('.event_postcard').height();
        var ratio = -1*card_height/240*90;
        var heart_height= card_height*90/240;
        $('.fa-heart').height(heart_height+'px');
        $('.fa-heart').width(heart_height+'px');
        $('.fa-heart').css("margin-top",  ratio+"px")
    })
});

var counter = 0;
var object = [
    {"event_img" : "img",
    "event_name":"event1"},
    {"event_img" : "img",
    "event_name":"event1"},
    {"event_img" : "img",
    "event_name":"event1"},
    {"event_img" : "img",
    "event_name":"event1"},
    {"event_img" : "img",
    "event_name":"event1"},
    {"event_img" : "img",
    "event_name":"event1"}
]

$(function () {
    $(".fa-heart").on("click", function () {
        $(this).toggleClass("is-active");
    });
});

$(function(){  
    console.log('see more')

    var length = object.length;

    console.log('length: ', length);
    console.log('counter: ', counter);

    if (length>4){
        var i=0;
        while(i<4){
            $(".seemore").on("click",function(){  
                $(".search_result").append("<div class='col-lg-3'><div class='event_card'><a href='{{result_link}}' class='postcard_body'><div class='postcard_image'><img src='#' alt='result_img' class='search_result_img'></div> <div class='postcard_content'><div class='event_title'>{{EventName}}</div><div class='event_date_location'>{{EventDate}}<br>{{Event_Location}}</div></div></a><div class='row card-bottom-container'><div class='event_price col-lg-8'>{{EventPrice}}</div><div class='heart col-lg-4'></div></div></div>")
            });
            i++;
        }
    }
})

$(function(){
    $(".register_bn").on("click", function(){
        var value = $(".register_bn").html()
        if(value==="Register"){
            $(".modal-title").html("Register");
            $(".modal-body").append("<div class='form-group confirmpw'><label for='confirm_pw' class='control-label'>Comfirm Password</label><input type='password' class='form-control' id='confrim_pw' name='confirm_pw' value='' required='' title='Please enter your password'><span class='help-block'></span></div>")
            $(".forgetpw").hide()
            $(".register_bn").html("Sign In")
            $(".submit_bn").html("Register")
        }
        else{
            $(".modal-title").html("Sign In");
            $(".confirmpw").remove()
            $(".forgetpw").show()
            $(".register_bn").html("Register")
            $(".submit_bn").html("Sign In")
        }
    })
})

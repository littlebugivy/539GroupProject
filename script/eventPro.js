$('.carousel').carousel({
    interval: 2000
})

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
    $(".heart").on("click", function () {
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
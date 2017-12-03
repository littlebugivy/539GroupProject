$('.carousel').carousel({
    interval: 2000
})


$(function () {
    var height = $(".large-banner-container").height();
   /* $('.search-form').height(height / 1.4)
    *$('.search-form').css("top", height * 0.2)
    $('.search-form').css("bottom", height * 0.2)*/
    $('.event_postcard').height(240);
    $('.fa-heart').css('margin-top', '-90px');

    $(window).resize(function () {
        var newheight = $(".large-banner-container").height();
        /*$('.search-form').height(newheight / 1.4);
        $('.search-form').css("top", newheight * 0.2)
        $('.search-form').css("bottom", newheight * 0.2)*/
        $('.event_postcard').height($('.event_postcard').width())
        var card_height = $('.event_postcard').height();
        var ratio = -1 * card_height / 240 * 90;
        var heart_height = card_height * 90 / 240;
        $('.fa-heart').height(heart_height + 'px');
        $('.fa-heart').width(heart_height + 'px');
        $('.fa-heart').css("margin-top", ratio + "px")
    })
});

var counter = 0;
var object = [
    {
        "event_img": "img",
        "event_name": "event1"
    },
    {
        "event_img": "img",
        "event_name": "event1"
    },
    {
        "event_img": "img",
        "event_name": "event1"
    },
    {
        "event_img": "img",
        "event_name": "event1"
    },
    {
        "event_img": "img",
        "event_name": "event1"
    },
    {
        "event_img": "img",
        "event_name": "event1"
    }
]


$(document).on('click', '.fa-heart', function () {
    $(this).toggleClass("is-active");
});


$(function () {
    console.log('see more')

    var length = object.length;

    console.log('length: ', length);
    console.log('counter: ', counter);

    if (length > 4) {
        var i = 0;
        while (i < 4) {
            $(".seemore").on("click", function () {
                $(".item-list").append("<div class='col-lg-3 col-md-4 col-sm-6 col-xs-12'><div id='item-G5vYZfSfPYh_1' class='event_postcard item' data-item_id='G5vYZfSfPYh_1' data-favorite='undefined'><div class='postcard_image'><img src='https://s1.ticketm.net/dam/a/375/606d24be-8ead-40aa-a622-22e5dfd02375_562662_RETINA_LANDSCAPE_16_9.jpg' class='search_result_img' alt='item image'></div><div class='postcard_content'><div class='event_title'><a href='http://www.ticketmaster.com/ozuna-odiesa-society-tour-san-jose-california-12-03-2017/event/1C00533525C1B64A' target='_blank' class='item-name'>Ozuna Odiesa Society Tour</a></div><div class='event_date_location'><p class='item-address'>525 W Santa Clara<br>San Jose</p></div></div><div class='event_price col-8'><p class='item-category'>Music</p></div><div class='event_heart fav-link col-4 fa-heart'></div></div></div>")

                var card_height = $('.event_postcard').height();
                var ratio = -1 * card_height / 240 * 90;
                var heart_height = card_height * 90 / 240;
                $('.fa-heart').height(heart_height + 'px');
                $('.fa-heart').width(heart_height + 'px');
                $('.fa-heart').css("margin-top", ratio + "px")
            });
            i++;
        }
    }
})

$(function () {
    $(".register_bn").on("click", function () {
        var value = $(".register_bn").html()
        if (value === "Register") {
            $(".modal-title").html("Register");
            $(".modal-body").append("<div class='form-group confirmpw'><label for='confirm_pw' class='control-label'>Comfirm Password</label><input type='password' class='form-control' id='confrim_pw' name='confirm_pw' value='' required='' title='Please enter your password'><span class='help-block'></span></div>")
            $(".forgetpw").hide()
            $(".register_bn").html("Sign In")
            $(".submit_bn").html("Register")
        }
        else {
            $(".modal-title").html("Sign In");
            $(".confirmpw").remove()
            $(".forgetpw").show()
            $(".register_bn").html("Register")
            $(".submit_bn").html("Sign In")
        }
    })
})

var current_page = 1;

$(function () {
    var total_page = 4;
    $('.pag').on('click', function () {
        var next_pnumber = $(this).html();
            
        if (next_pnumber < total_page+1 ) {
            var present_pnumber = $('.active').html();
            var present_pn = '.pn' + present_pnumber;
            var next_pn = '.pn' + next_pnumber;

            $(present_pn).toggleClass('active')
            $(next_pn).toggleClass('active')

            var pre_page = '.page'+ present_pnumber;
            var next_page = '.page' + next_pnumber;

            $(pre_page).toggleClass('page-active')
            $(next_page).toggleClass('page-active')

            console.log('now: page',next_pnumber)
        }
    })


        $('.pag_next').on('click', function(){
            var pre_pnumber = $('.active').html();         
            if (pre_pnumber < total_page ) {
                var present_page = '.pn' + pre_pnumber;
                var next_pn = parseInt(pre_pnumber) +1;
                var next_page = '.pn' + next_pn;
        
                $(present_page).toggleClass('active');
                $(next_page).toggleClass('active');

                var pre_page = '.page'+ pre_pnumber;
                var next_page = '.page' + next_pn;
    
                $(pre_page).toggleClass('page-active')
                $(next_page).toggleClass('page-active')
    
            }
            })


        $('.pag_prev').on('click', function(){
            var pre_pnumber = $('.active').html();
                
            if (pre_pnumber > 1 ) {
                var present_page = '.pn' + pre_pnumber;
                var next_pn = parseInt(pre_pnumber) -1;
                var next_page = '.pn' + next_pn;
        
                $(present_page).toggleClass('active');
                $(next_page).toggleClass('active');

                var pre_page = '.page'+ pre_pnumber;
                var next_page = '.page' + next_pn;
    
                $(pre_page).toggleClass('page-active')
                $(next_page).toggleClass('page-active')
    
            }
            })
})


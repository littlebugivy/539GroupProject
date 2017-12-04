
$(function(){
    var username = sessionStorage.getItem('username');
    console.log('user name: ' ,username);
    if(username){  
        $('.nav_login').hide();
        $('.user_info').css('display','inline-block');
        $('.user_info').html(username); 
    }

    $('.log-out').on('click', function(){
        var username = sessionStorage.removeItem('username');
        $('.nav_login').show();
        $('.drop-down-content').hide();
        $('.user_info').hide(); 
    })
})


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
        var window_width = $('body').width();
           if(window_width < 1000){
            var margin_bottom = 480 - window_width * 0.4;
            $('.large-banner-container').css("margin-bottom", margin_bottom + 'px');
        }
    })
});


$(document).on('click', '.fa-heart', function () {
    $(this).toggleClass("is-active");
});

var counter = 0; // count how many object has been displayed
var num_obj  = 18;  // number of json objects
var limit = 8;
var num_load = Math.floor((num_obj-4)/limit);
var num_final_load = num_obj % limit;
//  load more cards
$(function () {
        $(".seemore").on("click", function () {
            if(counter<num_load){
                limit = 8;
            }else if(counter==num_load){
                limit = num_final_load;
            }else{
                return;
            }
    
            console.log('number_load',num_load, 'counter:',counter, limit)
            for(var i=0; i<limit; i++) {
            $(".item-list").append("<div class='col-lg-3 col-md-4 col-sm-6 col-xs-12'><div id='item-G5vYZfSfPYh_1' class='event_postcard item' data-item_id='G5vYZfSfPYh_1' data-favourite='undefined'><div class='postcard_image'><img src='https://s1.ticketm.net/dam/a/375/606d24be-8ead-40aa-a622-22e5dfd02375_562662_RETINA_LANDSCAPE_16_9.jpg' class='search_result_img' alt='item image'></div><div class='postcard_content'><div class='event_title'><a href='http://www.ticketmaster.com/ozuna-odiesa-society-tour-san-jose-california-12-03-2017/event/1C00533525C1B64A' target='_self' class='item-name'>Ozuna Odiesa Society Tour</a></div><div class='event_date_location'><p class='item-address'>525 W Santa Clara<br>San Jose</p></div></div><div class='event_price col-8'><p class='item-category'>Music</p></div><div class='event_heart fav-link col-4 fa-heart'></div></div></div>")

            var card_height = $('.event_postcard').height();
            var ratio = -1 * card_height / 240 * 90;
            var heart_height = card_height * 90 / 240;
            $('.fa-heart').height(heart_height + 'px');
            $('.fa-heart').width(heart_height + 'px');
            $('.fa-heart').css("margin-top", ratio + "px")
            }
            counter++;
            console.log('number of load:',counter)
        });
       
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
            $(".confirmpw").remove();
            $(".forgetpw").show();
            $(".register_bn").html("Register")
            $(".submit_bn").html("Sign In")
        }
    })

    // login get user name
    $('.newuser').on('click', function(){

        console.log($(this).html());
        // TODO: js validation needed - password
        var username = $('#username').val();  
        sessionStorage.setItem('username', username);    
        $('.nav_login').hide();
        $('.user_info').css('display','inline-block');
        $('.user_info').html(username);     
    })

    $('.user_info').on('click',function(){
        console.log('userinfo')
        var width = $('.user_info').width();
        $('.drop-down-content').width(width+81); // padding
        $('.drop-down-content').css('display','block')
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

$(function(){
    $('.supportform_submit').on('click',function(){
        $('.supportform').hide();
        $('.support_submit_success').show();
    })   
})


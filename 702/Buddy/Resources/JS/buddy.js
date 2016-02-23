var generalNS={
bodyId:$('body').attr('id'),
init:function(){
		$('.info_btn, .info_btn_tile').on("click",function(){
		    $('.overlay').show();
		    $('.info_screen').fadeIn("slow");
			$('.header, .cindy_circles, .circles, .circles_wrapper, .search_wrapper, .search_btn, .draggable, .drop_circle, .buddy_list_nav_prev, .buddy_list_nav_next').addClass('blur');
		});
		
		$('.info_screen_close').on("click",function(){
			$('.overlay, .info_screen').hide();
			$('.blur').removeClass('blur');
		});
		
		$('body').jKit();
		$('.home_btn').jKit('tooltip', {'classname':'headerToolTip', 'text': 'Go to Home' });
		$('.info_btn').jKit('tooltip', {'classname':'headerToolTip', 'text': 'About Buddy app' });
		$('.notifications_btn').jKit('tooltip', {'classname':'headerToolTip', 'text': 'Check out the Notifications' });
		$('.circles_btn').jKit('tooltip', {'classname':'headerToolTip', 'text': 'Search for a buddy in your Circles' });
		$('.history_header_btn').jKit('tooltip', {'classname':'headerToolTip', 'text': 'Checkout the History of connections' });
		$('.storyline_btn').jKit('tooltip', {'classname':'headerToolTip', 'text': 'Read the Storyline' });
		$('.admin_view_btn').jKit('tooltip', {'classname':'headerToolTip', 'text': 'Change the app configuration' });
		$('.registered_available_btn').jKit('tooltip', {'classname':'headerToolTip', 'text': 'Show Enrolled/Available Buddies' });
		$('.select_buddy_btn').jKit('tooltip', {'classname':'headerToolTip', 'text': 'Select your buddy' });
		$(".menu_btn").on('mousemove',function(e){
			yOffset = 10;
			xOffset = -30;
			
			$("#jkit-tooltip")
				.css("top",(e.pageY - xOffset) + "px")
				.css("left",(e.pageX + yOffset) + "px");
		});
	}
}
var storylineNS={
	init:function(){ 
		/* default view */
		$('#tab1').addClass('selected');
		
		$('.carouseltab').livequery("click", function () {
			$('.carouseltab').removeClass('selected');
			$(this).addClass('selected');
			var tabContentId = "#" + $(this).attr('id') + "_content";
			$('.carousel').addClass('display_none');
			$(tabContentId).removeClass('display_none').fadeIn();
		}); 
		
		$('.nominate_btn').livequery("click", function () {
			$('.overlay').show();
			$('.nomination_confirmation_popup').fadeIn("slow");
			$('.header, .cindy_circles').addClass('blur');
			
		});
		$('.nomination_confirmation_popup_close, .nomination_confirmation_popup .disagree_btn').livequery("click", function () {
			$('.overlay, .nomination_confirmation_popup').hide();
			$('.blur').removeClass('blur');
		});
			
		
		$('#nomination_agree_btn').livequery('click',function(){
			$('.nomination_confirmation_popup, .nominate_btn').hide();
			$('.proceed_arrow,.menu_btn').show();
			setTimeout(function(){
				$('.overlay').show();
				$('.update_profile_popup').fadeIn();
			},50);
			
		});
		
		$('.update_profile_popup_close').livequery("click", function () {
			$('.overlay, .update_profile_popup').hide();
			$('.blur').removeClass('blur');
		});
		
		$('.remove_buddy_btn').livequery("click", function () {
			$('.overlay').show();
			$('.remove_buddy_confirmation_popup').fadeIn("slow");
			$('.header, .cindy_circles').addClass('blur');
		});
		$('.remove_buddy_confirmation_popup_close, .remove_buddy_confirmation_popup .disagree_btn').livequery("click", function () {
			$('.overlay, .remove_buddy_confirmation_popup').hide();
			$('.blur').removeClass('blur');
		});
			
		$('.remove_buddy_confirmation_popup .agree_btn').livequery('click',function(){
			$('.overlay, .remove_buddy_confirmation_popup').hide();
			$('.blur').removeClass('blur');
			$('.remove_buddy_btn').text('Click here to Enroll yourself');
			$('.remove_buddy_btn').removeClass('remove_buddy_btn').addClass('nominate_btn');
		});
		
		$('.storyboard_tile_item').livequery('click',function(){
			$('.overlay').show();
			var tile_id = "#" + $(this).attr('id') + "_content";
			$(tile_id).fadeIn();			
		});
		
		$('.back_btn').livequery('click',function(){
			$('.overlay, .storyboard').hide();			
		});
	}
}
var circlesNS={
	init:function(){
		if($('body').attr('id') == "New_joiners_view_circles"){
			drop_location = 'New_joiners_view_buddy_list.html';
		}else if($('body').attr('id') == "buddy_view_circles"){
			drop_location = 'buddy_view_other_buddies.html';
		}
		$(function () {
			$(".draggable").draggable({ revert: "invalid", helper: "original" });
			$("#droppable").droppable({
				tolerance: "pointer",
				accept: ".draggable",
				drop: function (event, ui) {
					$(this).find("p").html("Dropped!");
					var id_this = ui.draggable;
					var currentItem = $(id_this).attr("id");
					window.location.href = drop_location;
				},
				activate: function( event, ui ) {
					$('.drop_circle').addClass('drop_circle_hover');
				},
				deactivate: function( event, ui ) {
					$('.drop_circle').removeClass('drop_circle_hover');
				}
			});
		});	
		
		/* tooltip */
		$('body').jKit();
		$('.search_btn').jKit('tooltip', {'classname':'mytooltip', 'text': 
			'<div class="bulleted"><ul><li>Search your  referral by Name or Emp-ID.</li><li>You can add buddy only 2 levels above your grade.</li></ul></div>' });
			
		$(".searchBox").bind("focus",function(e){
			var thisObj = $(this);
			if(thisObj.val()=="Search by name or Id"){
				thisObj.val('');
			}
		});
		$(".searchBox").bind("blur",function(e){
			var thisObj = $(this);
			if(thisObj.val()==""){
				thisObj.val('Search by name or Id');
				}
		});
		/* contact card */
		$('.search_btn').bind("click",function(){
			$('.overlay').show();
			$('.contact_card').fadeIn("slow");
			$('.header, .cindy_circles, .circles, .circles_wrapper, .search_wrapper, .search_btn, .draggable, .drop_circle').addClass('blur');
		});
		$('.contact_close').bind("click",function(){
			$('.overlay, .contact_card').hide();
			$('.blur').removeClass('blur');
		});
		
		$('.send_buddy_request_btn').bind('click',function(){
			$('.contact_card').hide();
			$('.confirmation_popup').fadeIn();
		});
		
		$('.disagree_btn, .confirmation_popup_close').bind('click',function(){
			$('.confirmation_popup').hide();
			$('.contact_card').fadeIn();
		});
		
		$('.agree_btn').bind('click',function(){
			$('.confirmation_popup').hide();
			$('.sent_request_info_popup').fadeIn();
		});
		
		$('.sent_request_info_popup_close').bind('click',function(){
			$('.sent_request_info_popup, .overlay').hide();
			$('.blur').removeClass('blur');
		});
		
		$('.ask_your_supervisor').bind("click", function () {
            $('.overlay').show();
            $('.ask_supervisor_popup').fadeIn("slow");
            $('.header').addClass('blur');
        });
		$('.ask_supervisor_popup_close, .ask_supervisor_popup .ask_supervisor_agree, .ask_supervisor_popup .ask_supervisor_cancel').bind("click", function () {
            $('.overlay, .ask_supervisor_popup').hide();
            $('.blur').removeClass('blur');
        });
		var availableTags = [
			"Anju",
			"Arjun",
			"Adithya",
			"Bala",
			"Chandra",
			"Christopher",
			"Chitambaram",
			"Chandramathi",
			"Chithra",
			"Easwar",
			"Francis",
			"Gayathri",
			"Hashir",
			"Jaya",
			"Joshi",
			"Liya",
			"Pearl",
			"Prathibha",
			"Praveen",
			"Ruby",
			"Sreejith",
			"Sravan"
			];
		$( ".searchBox" ).autocomplete({
		source: availableTags
		});
	}
}

var buddyListNS = {
    init: function () {
		/* tooltip */
		$('body').jKit();
		$('.search_btn').jKit('tooltip', {'classname':'mytooltip', 'text': 
			'<div class="bulleted"><ul><li>Search your  referral by Name or Emp-ID.</li><li>You can add buddy only 2 levels above your grade.</li></ul></div>' });
			
        $(".searchBox").bind("focus", function (e) {
            var thisObj = $(this);
            if (thisObj.val() == "Search by name or Id") {
                thisObj.val('');
            }
        });
        $(".searchBox").bind("blur", function (e) {
            var thisObj = $(this);
            if (thisObj.val() == "") {
                thisObj.val('Search by name or Id');
            }
        });
        /* contact card */
        $('.search_btn').bind("click", function () {
            $('.overlay').show();
            $('.contact_card').fadeIn("slow");
            $('.header, .cindy_circles').addClass('blur');
        });
        $('.contact_close').bind("click", function () {
            $('.overlay, .contact_card').hide();
            $('.blur').removeClass('blur');
        });

        /* drop down */
        $('.dropdown_arrow').bind("click", function () {
            var selectObj = $(this).parent().next('.dropdown_select');
            selectObj.slideToggle();
            selectObj.toggleClass('visible');
        });
        $('.dropdown_select li a').bind("click", function () {
            var selectedCircle = $(this).parent().text();
            var thisDropdown = $(this).parentsUntil('.dropdown_wrapper');
            thisDropdown.prev().find('.selected_circle').text(selectedCircle);
            $('.dropdown_select').slideUp();
        });

        $(document).on('mousedown',function (event) {
            if ($(event.target).parent().next('.dropdown_select').length === 0) {
                if (!($(event.target).hasClass('dropdown_select_arrow'))) {
                    var ulVisible = $('ul.visible');
                    ulVisible.each(function () {
                        $(this).hide().removeClass('visible');
                    });
                }
            }
        });
		/* notification popup*/
		$('.notifications_btn').livequery("click", function (event) {
			if ($(event.target).hasClass('notifications_btn')) {
				$(this).toggleClass('selected');
				$(this).find('.notifications_popup').toggle();
				$('.background-size-cover').bgdSize('cover');
            }
        });
		$(document).on('mousedown',function (event) {
			if ($(event.target).parents('.notifications_popup').length ==0) {
				if (!($(event.target).hasClass('notifications_btn'))){
					$('.notifications_popup').hide();
					$('.notifications_btn').removeClass('selected');
				}
            }
        });
		$('.notifications_see_more p img.nj_view_notifications').bind('click',function(){
			window.location.href = "New_joiners_view_notifications.html";
		});
		$('.notifications_see_more p img.buddy_view_notifications').bind('click',function(){
			window.location.href = "buddy_view_notifications.html";
		});

        /* set background size to 'cover'*/
		//$('.background-size-cover').bgdSize('cover');
		$('.background-size-cover').livequery(function(){ 
			$(this).bgdSize('cover');
		}); 
       				
		$('.buddy_list_image').livequery(function () {
			
				$(this).hover(function () {
					var profilePic = $(this).find('img.profile_pic');
					if(profilePic.attr('src').length != 0){
						var linkwidth = $(this).find('img.profile_pic').outerWidth();
						$(this).find('img.profile_pic').animate({ right: linkwidth + 'px' });
					}else{
						$(this).find('img.dummy_image').show();
					}
				},
				function () {
					var profilePic = $(this).find('img.profile_pic');
					if(profilePic.attr('src').length != 0){
						$(this).find('img.profile_pic').animate({ right: 0 + 'px' });
					}else{
						$(this).find('img.dummy_image').hide();
					}
					
				});
			
		});

        $('.buddy_list_nav_next').livequery('click',function() {
			var $current = $('.buddy_list_visible');
			if ($current.next('.buddy_list').length != 0) {
                $('.buddy_list').hide();
                $current.removeClass('buddy_list_visible').hide();
				$current.next('.buddy_list').show().addClass('buddy_list_visible');
				$('.background-size-cover').bgdSize('cover');
            }
        });

        $('.buddy_list_nav_prev').livequery('click',function () {
            var $current = $('.buddy_list_visible');
            if ($current.prev('.buddy_list').length != 0) {
                $('.buddy_list').hide();
                $current.removeClass('buddy_list_visible').hide();
				$current.prev('.buddy_list').show().addClass('buddy_list_visible');
				$('.background-size-cover').bgdSize('cover');
            }
        });
		
		/* contact card on click of buddy_list_image */
		$('a.buddy_list_image').click(function () {
            $('.overlay').show();
            $('.contact_card').fadeIn("slow");
            $('.header, .cindy_circles').addClass('blur');
        });
		
		$('.send_buddy_request_btn').bind('click',function(){
			$('.contact_card').hide();
			$('.confirmation_popup').fadeIn();
		});
		
		$('.disagree_btn, .confirmation_popup_close').bind('click',function(){
			$('.confirmation_popup').hide();
			$('.contact_card').fadeIn();
		});
		
		$('.agree_btn').bind('click',function(){
			$('.confirmation_popup').hide();
			$('.sent_request_info_popup').fadeIn();
		});
		
		$('.sent_request_info_popup_close').bind('click',function(){
			$('.sent_request_info_popup, .overlay').hide();
			$('.blur').removeClass('blur');
		});
		
		/* cross filter */
		var global_counter = 0;
		var top_val = $('.selector').outerHeight();
		$('.checkbox_holder').css("top", top_val);

		$('.arrow_wrapper').click(function () {
			$(this).toggleClass('show_down_arrow show_up_arrow');
			$('.checkbox_holder').toggle();
		});

		$('.closebtn').click(function () {
			$('.arrow_wrapper').toggleClass('show_down_arrow show_up_arrow');
			$('.checkbox_holder').toggle();
		});
		/*Checkbox selection */
		$('.chkbox').change(function () {
			var new_topVal = $('.selector').outerHeight();
			if ($(this).attr("checked") == "checked") {
				global_counter++;
				$('#sel_count').html(global_counter);
				//$(this).attr("disabled", true);
				//var created_filterbtn = '<span title="' + $(this).attr("value") + '" class="filterspan">' + $(this).attr("value") + ' <img alt="" class="filter_close" src="images/close.png" /> </span>';
				/*Append a new span element into the selector area*/
				//$('.selector').append(created_filterbtn);
				//findOutputText();
				/*Adjust the height of the search box according to the height of the selector box*/
				//adjustHeight();
				//	$('.filter_close').livequery('click', myLiveEventHandler);
			}
			else {
				global_counter--;
				$('#sel_count').html(global_counter);
			}
		});

		function adjustHeight() {
			var last_elem = $('.selector').children().last();
			var topPos = $(last_elem).position().top;
			var newHeight = (topPos + top_val);
			$('.checkbox_holder').css("top", newHeight);
		}
		/*Fix for live() event bubbling- sholsinger.com/archive/2011/08/prevent-jquery-live-handlers-from-firing-multiple-times/    */
		function myLiveEventHandler(event) {
			if (event.handled !== true) {
				var removed_id = $(this).parent().attr("title");
				$('input:checkbox[value="' + removed_id + '"]').attr("disabled", false);
				$(this).parent().remove();
				global_counter--;
				$('#sel_count').html(global_counter);
				findOutputText();
				adjustHeight();
				event.handled = true;
				$('input:checkbox[value="' + removed_id + '"]').attr("checked", false);
			}
			return false;
		}	
		function findOutputText() {
			$('.output_actual').html("");
			$('.output_actual').append($('.selector .filterspan').text());
		}
		
		$('.ask_your_supervisor').bind("click", function () {
            $('.overlay').show();
            $('.ask_supervisor_popup').fadeIn("slow");
            $('.header').addClass('blur');
        });
		$('.ask_supervisor_popup_close, .ask_supervisor_popup .ask_supervisor_agree, .ask_supervisor_popup .ask_supervisor_cancel').bind("click", function () {
            $('.overlay, .ask_supervisor_popup').hide();
            $('.blur').removeClass('blur');
        });
		
		var availableTags = [
			"Anju",
			"Arjun",
			"Adithya",
			"Bala",
			"Chandra",
			"Christopher",
			"Chitambaram",
			"Chandramathi",
			"Chithra",
			"Easwar",
			"Francis",
			"Gayathri",
			"Hashir",
			"Jaya",
			"Joshi",
			"Liya",
			"Pearl",
			"Prathibha",
			"Praveen",
			"Ruby",
			"Sreejith",
			"Sravan"
			];
		$( ".searchBox" ).autocomplete({
		source: availableTags
		});
		
    }
}

var homeNS = {
    init: function () {
		$('.div_190_120, .div_285_120').hover(function () {
			$(this).find('.home_tile_wrapper img').fadeTo("fast",0.1);
			$(this).find('.unread_notifications_home').fadeTo("fast",0.1);
            $(this).find('.home_tile_wrapper p').hide();
			$(this).find('.home_tile_description').show();
        }, function () {
			$(this).find('.home_tile_wrapper img').fadeTo("fast",1);
			$(this).find('.unread_notifications_home').fadeTo("fast",1);
			$(this).find('.home_tile_wrapper p').show();
			$(this).find('.home_tile_description').hide();
        });
    }
}

var historyNS = {
    init: function () {
		/* tooltip */
		$('body').jKit();
		$('.search_btn').jKit('tooltip', {'classname':'mytooltip', 'text': 
			'<div class="bulleted"><ul><li>Search your  referral by Name or Emp-ID.</li><li>You can add buddy only 2 levels above your grade.</li></ul></div>' });
			
        $(".searchBox").bind("focus", function (e) {
            var thisObj = $(this);
            if (thisObj.val() == "Search by name or Id") {
                thisObj.val('');
            }
        });
        $(".searchBox").bind("blur", function (e) {
            var thisObj = $(this);
            if (thisObj.val() == "") {
                thisObj.val('Search by name or Id');
            }
        });
        /* contact card */
        $('.search_btn').bind("click", function () {
            $('.overlay').show();
            $('.contact_card').fadeIn("slow");
            $('.header, .cindy_circles').addClass('blur');
        });
        $('.contact_close').bind("click", function () {
            $('.overlay, .contact_card').hide();
            $('.blur').removeClass('blur');
        });

        /* drop down */
        $('.dropdown_arrow').bind("click", function () {
            var selectObj = $(this).parent().next('.dropdown_select');
            selectObj.slideToggle();
            selectObj.toggleClass('visible');
        });
        $('.dropdown_select li a').bind("click", function () {
            var selectedCircle = $(this).parent().text();
            var thisDropdown = $(this).parentsUntil('.dropdown_wrapper');
            thisDropdown.prev().find('.selected_circle').text(selectedCircle);
            $('.dropdown_select').slideUp();
        });

        $(document).mousedown(function (event) {
            if ($(event.target).parent().next('.dropdown_select').length === 0) {
                if (!($(event.target).hasClass('dropdown_select_arrow'))) {
                    var ulVisible = $('ul.visible');
                    ulVisible.each(function () {
                        $(this).hide().removeClass('visible');
                    });
                }
            }
        });
		
		$('.send_buddy_request_btn').bind('click',function(){
			$('.contact_card').hide();
			$('.confirmation_popup').fadeIn();
		});
		
		$('.confirmation_popup .disagree_btn, .confirmation_popup_close').bind('click',function(){
			$('.confirmation_popup').hide();
			$('.contact_card').fadeIn();
		});
		
		$('.confirmation_popup .agree_btn').bind('click',function(){
			$('.confirmation_popup').hide();
			$('.sent_request_info_popup').fadeIn();
		});
		
		$('.sent_request_info_popup_close').bind('click',function(){
			$('.sent_request_info_popup, .overlay').hide();
			$('.blur').removeClass('blur');
		});
		
		/* set background size to 'cover'*/
		$('.background-size-cover').livequery(function(){ 
			$(this).bgdSize('cover');
		}); 
		
		/* history details array */
		historyArray = [
			["Cindy", "Programmer Analyst", "1/1/2013", "4/1/2013", "1 day left"],
			["Joe", "Associate", "8/1/2012", "12/1/2012", "done"],
			["Danny", "Senior Associate", "1/1/2013", "4/1/2013", "1 day left"],
			["Hari", "Associate", "8/1/2012", "12/1/2012", "done"],
			["Vinitha", "Programmer Analyst", "1/1/2013", "4/1/2013", "1 day left"]
		];
		
		$('.history_left_item').livequery('click',function(){
			var thisObj = $(this);
			$('.history_left_item').removeClass('selected');
			thisObj.addClass('selected');			
			var thisObjIndex = $('.history_left_item').index(thisObj);
			if(thisObjIndex < historyArray.length){
				var imgSrc = thisObj.find('.history_left_image img').attr('src');
				var name = historyArray[thisObjIndex][0];
				var designation = historyArray[thisObjIndex][1];
				var fromDate = historyArray[thisObjIndex][2];
				var toDate = historyArray[thisObjIndex][3];
				var status = historyArray[thisObjIndex][4];
				$('.history_content_right .font_name').text(name);
				$('.history_content_right .designation').text(designation);
				$('.history_content_right .fromDate').text(fromDate);
				$('.history_content_right .toDate').text(toDate);
				$('.history_content_right .status').text(status);
				$('.history_content_right .history_right_image img').attr('src', imgSrc) ;
			}
			$('.history_content_right .history_right_image img').bgdSize('cover');
		});	
		
		/* disconnect popup */
		$('.disconnect_btn').bind("click", function () {
            $('.overlay').show();
            $('.discontinue_confirmation_popup').fadeIn("slow");
            $('.header, .cindy_circles').addClass('blur');
        });
		$('.discontinue_confirmation_popup_close, .discontinue_confirmation_popup .disagree_btn').bind("click", function () {
            $('.overlay, .discontinue_confirmation_popup').hide();
            $('.blur').removeClass('blur');
        });
		
		$('.discontinue_confirmation_popup .agree_btn').bind('click',function(){
			$('.discontinue_confirmation_popup').hide();
			$('.discontinue_sent_info_popup').fadeIn();
		});
		
		$('.discontinue_sent_info_popup_close, .discontinue_sent_info_popup .ok_btn').bind('click',function(){
			$('.discontinue_sent_info_popup, .overlay').hide();
			$('.blur').removeClass('blur');
		});
		
		$('#buddy_view_history .feedback_btn').bind('click',function(){
			$('.feedback_popup, .overlay').fadeIn();
		});
		$('#buddy_view_history .feedback_popup_close').bind('click',function(){
			$('.feedback_popup, .overlay').hide();
		});
		
		$('.nominate_btn').livequery("click", function () {
			$('.overlay').show();
			$('.nomination_confirmation_popup').fadeIn("slow");
			$('.header, .cindy_circles').addClass('blur');
			
		});
		$('.nomination_confirmation_popup_close, .nomination_confirmation_popup .disagree_btn').livequery("click", function () {
			$('.overlay, .nomination_confirmation_popup').hide();
			$('.blur').removeClass('blur');
		});
			
		$('.nomination_confirmation_popup .agree_btn').livequery('click',function(){
			$('.overlay, .nomination_confirmation_popup').hide();
			$('.blur').removeClass('blur');
			$('.nominate_btn').text('Click here to remove yourself');
			$('.nominate_btn').removeClass('nominate_btn').addClass('remove_buddy_btn');
		});
		
		$('.remove_buddy_btn').livequery("click", function () {
			$('.overlay').show();
			$('.remove_buddy_confirmation_popup').fadeIn("slow");
			$('.header, .cindy_circles').addClass('blur');
		});
		$('.remove_buddy_confirmation_popup_close, .remove_buddy_confirmation_popup .disagree_btn').livequery("click", function () {
			$('.overlay, .remove_buddy_confirmation_popup').hide();
			$('.blur').removeClass('blur');
		});
			
		$('.remove_buddy_confirmation_popup .agree_btn').livequery('click',function(){
			$('.overlay, .remove_buddy_confirmation_popup').hide();
			$('.blur').removeClass('blur');
			$('.remove_buddy_btn').text('Click here to Enroll yourself');
			$('.remove_buddy_btn').removeClass('remove_buddy_btn').addClass('nominate_btn');
		});
    }
}

var notificationsNS = {
    init: function () {		
		/* set background size to 'cover'*/
        $('.background-size-cover').livequery(function(){ 
			$(this).bgdSize('cover');
		});
		
		/* history details array */
		buddyRequestNotificationsArray = [
			["Cindy", "Programmer Analyst", "English", "OneC", "CI"],
			["Joe", "Associate", "English,French", "Arbitron", "IME"],
			["Danny", "Senior Associate", "English,Chinese", "Nova", "CI"],
			["Hari", "Associate", "English,Spanish", "GoWireless", "Communication"],
			["Vinitha", "Programmer Analyst", "English,Malayalam", "OneC", "CI"]
		];
		
		alertsNotificationArray = [
			["Cindy", "Programmer Analyst", "1/1/2013", "4/1/2013", "1 day left"],
			["Joe", "Associate", "8/1/2012", "12/1/2012", "done"],
			["Danny", "Senior Associate", "1/1/2013", "4/1/2013", "1 day left"],
			["Hari", "Associate", "8/1/2012", "12/1/2012", "done"],
			["Vinitha", "Programmer Analyst", "1/1/2013", "4/1/2013", "1 day left"]
		];
		
		othersNotificationArray = [
			["Danny", "Senior Associate", "1/1/2013", "4/1/2013", "1 day left"],
			["Hari", "Associate", "8/1/2012", "12/1/2012", "done"],
			["Vinitha", "Programmer Analyst", "1/1/2013", "4/1/2013", "1 day left"],
			["Cindy", "Programmer Analyst", "1/1/2013", "4/1/2013", "1 day left"],
			["Joe", "Associate", "8/1/2012", "12/1/2012", "done"]
		];
		
		$('.notifications_left_item').livequery('click',function(){
			var thisObj = $(this);
			$(this).siblings().removeClass('selected');
			thisObj.addClass('selected');			
			//var thisObjIndex = $('.notifications_left_item').index(thisObj);
			var thisObjIndex = $(this).parentsUntil('.notifications_tab_content').find('.notifications_left_item').index(thisObj);
			var parentClass = $(this).parentsUntil('.notifications_tab_content').parent();
			var tabContentClassName = parentClass.attr('class').split(" ")[0];
			switch (tabContentClassName){	
				case 'buddy_request_notifications_content':
					if(thisObjIndex < buddyRequestNotificationsArray.length){
						var imgSrc = thisObj.find('.notifications_left_image img').attr('src');
						var name = buddyRequestNotificationsArray[thisObjIndex][0];
						var designation = buddyRequestNotificationsArray[thisObjIndex][1];
						var language = buddyRequestNotificationsArray[thisObjIndex][2];
						var projectname = buddyRequestNotificationsArray[thisObjIndex][3];
						var buName = buddyRequestNotificationsArray[thisObjIndex][4];
						parentClass.find('.notifications_content_right .font_name').text(name);
						parentClass.find('.notifications_content_right .designation').text(designation);
						parentClass.find('.notifications_content_right .language').text(language);
						parentClass.find('.notifications_content_right .project_name').text(projectname);
						parentClass.find('.notifications_content_right .bu_name').text(buName);
						parentClass.find('.notifications_content_right .notifications_right_image img').attr('src', imgSrc) ;
						parentClass.find('.notifications_content_right .notifications_right_image img').bgdSize('cover');
					}
					break;
				case 'alerts_notifications_content':
					if(thisObjIndex < alertsNotificationArray.length){
						var imgSrc = thisObj.find('.notifications_left_image img').attr('src');
						var name = alertsNotificationArray[thisObjIndex][0];
						var designation = alertsNotificationArray[thisObjIndex][1];
						var fromDate = alertsNotificationArray[thisObjIndex][2];
						var toDate = alertsNotificationArray[thisObjIndex][3];
						var status = alertsNotificationArray[thisObjIndex][4];
						parentClass.find('.notifications_content_right .font_name').text(name);
						parentClass.find('.notifications_content_right .designation').text(designation);
						parentClass.find('.notifications_content_right .fromDate').text(fromDate);
						parentClass.find('.notifications_content_right .toDate').text(toDate);
						parentClass.find('.notifications_content_right .status').text(status);
						parentClass.find('.notifications_content_right .notifications_right_image img').attr('src', imgSrc) ;
						parentClass.find('.notifications_content_right .notifications_right_image img').bgdSize('cover');
					}
					break;
					
				case 'team_members_notifications_content':
					if(thisObjIndex < alertsNotificationArray.length){
						var imgSrc = thisObj.find('.notifications_left_image img').attr('src');
						var name = alertsNotificationArray[thisObjIndex][0];
						var designation = alertsNotificationArray[thisObjIndex][1];
						var fromDate = alertsNotificationArray[thisObjIndex][2];
						var toDate = alertsNotificationArray[thisObjIndex][3];
						var status = alertsNotificationArray[thisObjIndex][4];
						parentClass.find('.notifications_content_right .font_name').text(name);
						parentClass.find('.notifications_content_right .designation').text(designation);
						parentClass.find('.notifications_content_right .fromDate').text(fromDate);
						parentClass.find('.notifications_content_right .toDate').text(toDate);
						parentClass.find('.notifications_content_right .status').text(status);
						parentClass.find('.notifications_content_right .notifications_right_image img').attr('src', imgSrc) ;
						parentClass.find('.notifications_content_right .notifications_right_image img').bgdSize('cover');
					}
					break;
				case 'others_notifications_content':
					if(thisObjIndex < othersNotificationArray.length){
						var imgSrc = thisObj.find('.notifications_left_image img').attr('src');
						var name = othersNotificationArray[thisObjIndex][0];
						var designation = othersNotificationArray[thisObjIndex][1];
						var fromDate = othersNotificationArray[thisObjIndex][2];
						var toDate = othersNotificationArray[thisObjIndex][3];
						var status = othersNotificationArray[thisObjIndex][4];
						parentClass.find('.notifications_content_right .font_name').text(name);
						parentClass.find('.notifications_content_right .designation').text(designation);
						parentClass.find('.notifications_content_right .fromDate').text(fromDate);
						parentClass.find('.notifications_content_right .toDate').text(toDate);
						parentClass.find('.notifications_content_right .status').text(status);
						parentClass.find('.notifications_content_right .notifications_right_image img').attr('src', imgSrc) ;
						parentClass.find('.notifications_content_right .notifications_right_image img').bgdSize('cover');
					}
					break;
				default:
					break;
			}
			
		});	
		//$('.displayNone').hide().removeClass('displayNone');
		
		/* click of notification tabs */
		$('.notifications_content_tabs a').livequery('click',function(){
			$(this).siblings().removeClass('selected');
			var tabClassName = $(this).attr('class').split(" ")[0];
			$(this).addClass('selected');
			$('.notifications_tab_content').hide();
			switch (tabClassName){	
				case 'buddy_request_notifications_btn':
					$('.buddy_request_notifications_content').show();
					$('.background-size-cover').livequery(function(){ 
						$(this).bgdSize('cover');
					});
					break;
				case 'alerts_notifications_btn':
					$('.alerts_notifications_content').show();
					$('.background-size-cover').livequery(function(){ 
						$(this).bgdSize('cover');
					});
					break;
				case 'others_notifications_btn':
					$('.others_notifications_content').show();
					$('.background-size-cover').livequery(function(){ 
						$(this).bgdSize('cover');
					});
					break;
				case 'team_member_notifications_btn':
					$('.team_members_notifications_content').show();
					$('.background-size-cover').livequery(function(){ 
						$(this).bgdSize('cover');
					});
					break;
				default:
					break;
			}
		});
		
		$(".reject_request_popup .comment_area").bind("focus",function(e){
			var thisObj = $(this);
			if(thisObj.val()=="Please provide a reason for rejection..."){
				thisObj.val('');
			}
		});
		$(".reject_request_popup .comment_area").bind("blur",function(e){
			var thisObj = $(this);
			if(thisObj.val()==""){
				thisObj.val('Please provide a reason for rejection...');
				}
		});
		
		$('.buddy_request_notification_btn_wrapper .reject_btn').bind("click", function () {
            $('.overlay').show();
            $('.reject_request_popup').fadeIn("slow");
            $('.header, .cindy_circles').addClass('blur');
        });
		$('.reject_request_popup_close, .reject_request_popup .disagree_btn').bind("click", function () {
            $('.overlay, .reject_request_popup').hide();
            $('.blur').removeClass('blur');
        });
		
    }
}

var feedbackNS = {
    init: function () {
		/* set background size to 'cover'*/
        $('.background-size-cover').livequery(function(){ 
			$(this).bgdSize('cover');
		});
		
		$( "#slider" ).slider({
			animate: true,
			value:4,
			min: 1,
			max: 5,
			step: 1,
			slide: function( event, ui ) {
				var uiValue = ui.value;
				switch (uiValue){	
				case 1:
					$("#slider_wrapper").css('background-image','url("images/slider_bg.png")');
					$(".smiley_wrapper").css('background-image','url("images/smiley_sad.png")');
					break;
				case 2:
					$("#slider_wrapper").css('background-image','url("images/slider_bg_2.png")');
					$(".smiley_wrapper").css('background-image','url("images/smiley_disappointed.png")');
					break;
				case 3:
					$("#slider_wrapper").css('background-image','url("images/slider_bg_3.png")');
					$(".smiley_wrapper").css('background-image','url("images/smiley_happy.png")');
					break;
				case 4:
					$("#slider_wrapper").css('background-image','url("images/slider_bg_4.png")');
					$(".smiley_wrapper").css('background-image','url("images/smiley_cool.png")');
					break;
				case 5:
					$("#slider_wrapper").css('background-image','url("images/slider_bg_5.png")');
					$(".smiley_wrapper").css('background-image','url("images/smiley_lol.png")');
					break;
				default:
					$("#slider_wrapper").css('background-image','url("images/slider_bg.png")');
					$(".smiley_wrapper").css('background-image','url("images/smiley_lol.png")');
					break;
				}
				if(uiValue > 3){
					$(".ui-slider-handle").css('background-image','url("images/slider_handle_green.png")');
				}else{
					$(".ui-slider-handle").css('background-image','url("images/slider_handle.png")');
				}
			}
		});
		$( ".feedback_5" ).bind('click',function() {
			$("#slider").slider( "value", 5 );
			$(".ui-slider-handle").css('background-image','url("images/slider_handle_green.png")');
			$("#slider_wrapper").css('background-image','url("images/slider_bg_5.png")');
			$(".smiley_wrapper").css('background-image','url("images/smiley_lol.png")');
		});
    }
}

var selectBuddyNS = {
    init: function () {
		$('.ask_your_supervisor').bind("click", function () {
            $('.overlay').show();
            $('.ask_supervisor_popup').fadeIn("slow");
            $('.header').addClass('blur');
        });
		$('.ask_supervisor_popup_close, .ask_supervisor_popup .ask_supervisor_agree, .ask_supervisor_popup .ask_supervisor_cancel ').bind("click", function () {
            $('.overlay, .ask_supervisor_popup').hide();
            $('.blur').removeClass('blur');
        });
    }
}

var adminNS = {
    init: function () {	
			
		$(".searchBox").bind("focus",function(e){
			var thisObj = $(this);
			if(thisObj.val()=="Search by name or Id"){
				thisObj.val('');
			}
		});
		$(".searchBox").bind("blur",function(e){
			var thisObj = $(this);
			if(thisObj.val()==""){
				thisObj.val('Search by name or Id');
				}
		});
		
		var availableTags = [
			"Anju",
			"Arjun",
			"Adithya",
			"Bala",
			"Chandra",
			"Christopher",
			"Chitambaram",
			"Chandramathi",
			"Chithra",
			"Easwar",
			"Francis",
			"Gayathri",
			"Hashir",
			"Jaya",
			"Joshi",
			"Liya",
			"Pearl",
			"Prathibha",
			"Praveen",
			"Ruby",
			"Sreejith",
			"Sravan"
			];
		$( ".searchBox" ).autocomplete({
			source: availableTags
		});
		
		/* set background size to 'cover'*/
        $('.background-size-cover').livequery(function(){ 
			$(this).bgdSize('cover');
		});
		
		/* tab navigation */
		$('.main_tab_item').livequery('click',function(){
			var thisObj = $(this);
			$('.main_tab_item').removeClass('selected');
			thisObj.addClass('selected');
			var contentId = "#" + thisObj.attr('id') + "_content";
			$('.admin_view_content').children().each(function(){
				$(this).hide();
			});
			$(contentId).fadeIn();
			$('.background-size-cover').bgdSize('cover');
		});
		
		 /* drop down */
        $('.dropdown_arrow').bind("click", function () {
            var selectObj = $(this).parent().parent().find('.dropdown_select');
            selectObj.slideToggle();
            selectObj.toggleClass('visible');
        });
		
        $('.dropdown_select li a').bind("click", function () {
            var selectedItem = $(this).parent().text();
            var thisDropdown = $(this).parentsUntil('.dropdown_wrapper');
            thisDropdown.prev().find('.selected_item').text(selectedItem);
            $('.dropdown_select').slideUp();
        });
		
		$('#dashboard_tab_content .dropdown_wrapper .dropdown_select li').livequery("click", function () {
			console.log('here');
            var selectedItem = $(this).text();
            var thisDropdown = $(this).parentsUntil('.dropdown_wrapper');
            thisDropdown.prev().find('.selected_item').text(selectedItem);
            $('.dropdown_select').slideUp();
        });

        $(document).on('mousedown',function (event) {
            if ($(event.target).parent().next('.dropdown_select').length === 0) {
                if ((!($(event.target).hasClass('dropdown_select_arrow'))) && (!($(event.target).hasClass('dashboard_bu_option')))
					&& (!($(event.target).hasClass('slimScrollBar')))) {
				    var ulVisible = $('ul.visible');
                    ulVisible.each(function () {
                        $(this).hide().removeClass('visible');
                    });
                }
            }
        });
		
		$('#configure_tab_content .submit_btn').bind('click',function(){
			$('.config_error, .overlay').fadeIn();
		});
		$('.config_error_close').bind('click',function(){
			$('.config_error, .overlay').hide();
		});
		
		$('.successful_popup_close').bind('click',function(){
			$('.successful_popup').hide();
		});
		$('.error_popup_close').bind('click',function(){
			$('.error_popup').hide();
		});
		
		/* history details array */
		connectionsArray = [
			["Cindy", "Programmer Analyst", "4", "4"],
			["Joe", "Associate", "4", "4"],
			["Danny", "Senior Associate", "3", "5"],
			["Hari", "Associate", "5", "5"],
			["Vinitha", "Programmer Analyst", "2", "3"]
		];
				
		$('.notifications_left_item').livequery('click',function(){
			var thisObj = $(this);
			$(this).siblings().removeClass('selected');
			thisObj.addClass('selected');			
			//var thisObjIndex = $('.notifications_left_item').index(thisObj);
			var thisObjIndex = $(this).parentsUntil('.notifications_tab_content').find('.notifications_left_item').index(thisObj);
			var parentClass = $(this).parentsUntil('.notifications_tab_content').parent();
			var tabContentClassName = parentClass.attr('class').split(" ")[0];
			switch (tabContentClassName){	
				case 'dashboard_content_wrapper':
					if(thisObjIndex < connectionsArray.length){
						var imgSrc = thisObj.find('.notifications_left_image img').attr('src');
						var name = connectionsArray[thisObjIndex][0];
						var designation = connectionsArray[thisObjIndex][1];
						var connections = connectionsArray[thisObjIndex][2];
						var averageFeedback = connectionsArray[thisObjIndex][3];
						parentClass.find('.notifications_content_right .font_name').text(name);
						parentClass.find('.notifications_content_right .designation').text(designation);
						parentClass.find('.notifications_content_right .connections_txt').text(connections);
						parentClass.find('.notifications_content_right .av_feedback').text(averageFeedback);
						parentClass.find('.notifications_content_right .notifications_right_image img').attr('src', imgSrc) ;
						parentClass.find('.notifications_content_right .notifications_right_image img').bgdSize('cover');
					}
					break;
				default:
					break;
			}
			
		});	
		
		/** Connections popup **/
		$('.connections_btn').livequery("click",function(){
			$('.overlay').show();
			$('.connections').fadeIn("slow");
			$('.background-size-cover').bgdSize('cover');
		});
		
		$('.connections_close').on("click",function(){
			$('.overlay, .connections').hide();
		});
		
		$('.connections_arrow_next').livequery('click',function() {
			var $current = $('.connections_screen_details.visible');
			if ($current.next('.connections_screen_details').length != 0) {
                //$('.buddy_list').hide();
                $current.removeClass('visible').hide();
				$current.next('.connections_screen_details').show().addClass('visible').removeClass('hiddenDiv');
				$('.background-size-cover').bgdSize('cover');
            }
        });

        $('.connections_arrow_previous').livequery('click',function () {
            var $current = $('.connections_screen_details.visible');
            if ($current.prev('.connections_screen_details').length != 0) {
                //$('.buddy_list').hide();
                $current.removeClass('visible').hide();
				$current.prev('.connections_screen_details').show().addClass('visible').removeClass('hiddenDiv');
				$('.background-size-cover').bgdSize('cover');
            }
        });
		
		/* add admin */
		$(".add_admin_id").bind("focus",function(e){
			var thisObj = $(this);
			if(thisObj.val()=="Name/ID here"){
				thisObj.val('');
			}
		});
		$(".add_admin_id").bind("blur",function(e){
			var thisObj = $(this);
			if(thisObj.val()==""){
				thisObj.val('Name/ID here');
				}
		});
		$('.remove_admin_icon').livequery('click',function () {
            $(this).parent('.notifications_left_item').remove();
        });
		
		/* recommend tab */
		/* tab navigation */
		$('.recommendation_inner_tab').livequery('click',function(){
			var thisObj = $(this);
			$('.recommendation_inner_tab').removeClass('selected');
			thisObj.addClass('selected');
			var thisObjId = thisObj.attr('id');
			if(thisObjId == 'recommend_nj_buddy'){
				$('.recommendations_radio_wrapper').show();
				$('.recommendations_checkbox_wrapper').hide();
			}else{
				$('.recommendations_radio_wrapper').hide();
				$('.recommendations_checkbox_wrapper').show();
			}
			var contentId = "#" + thisObj.attr('id') + "_content";
			$('.recommend_inner_tab_content').hide();
			$(contentId).show();
			$('.background-size-cover').bgdSize('cover');
		});
		
		 //Radio button	
		$('.recommendations_radio_wrapper #buddy').attr('checked', 'checked');
		 $('.radio').livequery(function () {
			 if ($(this).is(':checked')) {
				 $(this).parents('.recommendations_radio_wrapper').addClass('checked');
				 var checkedValue = $(this).attr('value');
				 if(checkedValue == "buddy"){
					 $('.recommend_buddy_list').show();
					 $('.recommend_nj_list').hide(); 
				 }else if(checkedValue == "newjoiner"){
					$('.recommend_buddy_list').hide();
					$('.recommend_nj_list').show();
				 }
			 }
		 });
		 $('.radio').livequery('change', function () {
			$('.background-size-cover').bgdSize('cover');
			 $('.radio[name="' + $(this).attr('name') + '"]').each(function () {
				 var radiowrapper = $(this).parents('.recommendations_radio_wrapper');
				 if ($(this).is(':checked')) {
					 radiowrapper.addClass('checked');
					 var checkedValue = $(this).attr('value');
					 if(checkedValue == "buddy"){
						 $('.recommend_buddy_list').show();
						 $('.recommend_nj_list').hide(); 
					 }else if(checkedValue == "newjoiner"){
						$('.recommend_buddy_list').hide();
						$('.recommend_nj_list').show();
						
					 }
				 } else {
					 radiowrapper.removeClass('checked');
				 }
			 });
		 });
		 
		 //Checkbox
		 $('.checkbox').livequery(function () {
			 if ($(this).is(':checked')) {
				 $(this).parents('.recommendations_checkbox_wrapper').addClass('checked');
				 $('.recommend_registration_list_wrapper.visible .recommend_buddy_tile_wrapper').addClass('selected');
				 $('.recommend_registration_list_wrapper.visible .recommend_buddy_tile_wrapper .recommend_buddy_tile_selected').show();
			 }
		 });
		 $('.checkbox').livequery('change', function () {
			 $('.checkbox[name="' + $(this).attr('name') + '"]').each(function () {
				 var checkboxwrapper = $(this).parents('.recommendations_checkbox_wrapper');
				 if ($(this).is(':checked')) {
					 checkboxwrapper.addClass('checked');
					 $('.recommend_registration_list_wrapper.visible .recommend_buddy_tile_wrapper').addClass('selected');
					 $('.recommend_registration_list_wrapper.visible .recommend_buddy_tile_wrapper .recommend_buddy_tile_selected').show();
				 } else {
					 checkboxwrapper.removeClass('checked');
					 $('.recommend_registration_list_wrapper.visible .recommend_buddy_tile_wrapper').removeClass('selected');
					 $('.recommend_registration_list_wrapper.visible .recommend_buddy_tile_wrapper .recommend_buddy_tile_selected').hide();
				 }
			 });
		 });
		 
		$('.recommend_buddy_tile').livequery(function () {
			$(this).hover(function () {
				$(this).find('img.background-size-cover').hide();
			},
			function () {
				$(this).find('img.background-size-cover').show();
			});
		});
		
		/* drag and drop */
		// there's the gallery and the droparea    
		var $gallery = $(".recommend_buddy_list_wrapper" ),      
		$droparea = $(".drop_area");     
		// let the gallery items be draggable  
		$( ".recommend_buddy_list_wrapper .recommend_buddy_tile").livequery(function(){
			$( ".recommend_buddy_list_wrapper .recommend_buddy_tile").draggable({      
				revert: "invalid", // when not dropped, the item will revert back to its initial position      
				containment: "document",      
				helper: "clone",      
				cursor: "move"   
			});   
		});
		
		// let the droparea be droppable, accepting the gallery items    
		$(".drop_area").droppable({      
			accept: ".recommend_buddy_list_wrapper > .recommend_buddy_tile",      
			activeClass: "drop_area_active",      
			drop: function( event, ui ) {
				var dropareaId = $(this);
				addImage( ui.draggable, dropareaId );     
			}    
		});    
		
		var $njgallery = $(".recommend_nj_list_wrapper" ),      
		$njdroparea = $(".drop_area_newjoiner");     
		// let the gallery items be draggable    
		$( ".recommend_nj_list_wrapper .recommend_buddy_tile").livequery(function(){
			$( ".recommend_nj_list_wrapper .recommend_buddy_tile").draggable({      
				revert: "invalid", // when not dropped, the item will revert back to its initial position      
				containment: "document",      
				helper: "clone",      
				cursor: "move"   
			});     
		});
		
		// let the droparea be droppable, accepting the gallery items    
		$(".drop_area_newjoiner").droppable({      
			accept: ".recommend_nj_list_wrapper > .recommend_buddy_tile",      
			activeClass: "drop_area_active",      
			drop: function( event, ui ) {
				var dropareaId = $(this);
				addImage( ui.draggable, dropareaId );     
			}    
		});    
		
		// image deletion function  
		var remove_icon = "<img src='images/contact_close.png' alt='Close' class='remove_icon'/>";    
		function addImage( $item, dropareaId ) { 			
			var $droppeditem = $( "a", $item ).append(remove_icon);
			$item.appendTo(dropareaId).fadeIn(function() { 
				$item.animate(
					{width: "115px", height: "105px"},
					{duration: 100,
					complete:
						function(){
							$item.find('img.background-size-cover').bgdSize('cover');
						}
					}
				);
			});
			dropareaId.droppable( "disable" );
			$('.drop_area').removeClass('drop_area_active');
		}  
		
		$( ".recommend_buddy_tile" ).livequery('click', function( event ) {
			var $item = $(this),
			$target = $(event.target);
			if ( $target.is( ".remove_icon" ) ) {
				var dropareaId = $item.parent().attr('id');
				removeImage($item, dropareaId);
			} 
			return false;
		});
		function removeImage($item, dropareaId) {
			var recycleGallery;
			$item.parent().droppable("enable");
			if(dropareaId == "drop_area_newjoiner"){
				var visiblegallery = $(".recommend_nj_list_wrapper.visible");
				if(visiblegallery.children().length < 9){
					recycleGallery = $(".recommend_nj_list_wrapper.visible" );
				}else{
					$(".recommend_nj_list_wrapper.hiddenDiv").each(function(){
						if($(this).children().length < 9){
							recycleGallery = $(this);
							return;
						}
					});
				}
			}else{
				var visiblegallery = $(".recommend_buddy_list_wrapper.visible");
				if(visiblegallery.children().length < 9){
					recycleGallery = $(".recommend_buddy_list_wrapper.visible" );
				}else{
					$(".recommend_buddy_list_wrapper.hiddenDiv").each(function(){
						if($(this).children().length < 9){
							recycleGallery = $(this);
							return;
						}
					});
				}
			}
			$item.fadeOut(function() { 
				$item          
					.find(".remove_icon")     
					.remove()         
					.end()       
					.css( "width", "100px")  
					.css( "height", "83px" )          
					.appendTo(recycleGallery)  
					.fadeIn()
					.find('img.background-size-cover').bgdSize('cover').show();      
			});
		}
		
		$('.recommend_buddy_list_arrow_next').livequery('click',function() {
			var $current = $('.recommend_buddy_list_wrapper.visible');
			if ($current.next('.recommend_buddy_list_wrapper').length != 0) {
                //$('.buddy_list').hide();
                $current.removeClass('visible').hide().addClass('hiddenDiv');
				$current.next('.recommend_buddy_list_wrapper').show().addClass('visible').removeClass('hiddenDiv');
				$('.background-size-cover').bgdSize('cover');
            }
        });

        $('.recommend_buddy_list_arrow_previous').livequery('click',function () {
            var $current = $('.recommend_buddy_list_wrapper.visible');
            if ($current.prev('.recommend_buddy_list_wrapper').length != 0) {
                //$('.buddy_list').hide();
                $current.removeClass('visible').hide().addClass('hiddenDiv');
				$current.prev('.recommend_buddy_list_wrapper').show().addClass('visible').removeClass('hiddenDiv');
				$('.background-size-cover').bgdSize('cover');
            }
        });
		
		$('.recommend_nj_list_arrow_next').livequery('click',function() {
			var $current = $('.recommend_nj_list_wrapper.visible');
			if ($current.next('.recommend_nj_list_wrapper').length != 0) {
                //$('.buddy_list').hide();
                $current.removeClass('visible').hide().addClass('hiddenDiv');
				$current.next('.recommend_nj_list_wrapper').show().addClass('visible').removeClass('hiddenDiv');
				$('.background-size-cover').bgdSize('cover');
            }
        });

        $('.recommend_nj_list_arrow_previous').livequery('click',function () {
            var $current = $('.recommend_nj_list_wrapper.visible');
            if ($current.prev('.recommend_nj_list_wrapper').length != 0) {
                //$('.buddy_list').hide();
                $current.removeClass('visible').hide().addClass('hiddenDiv');
				$current.prev('.recommend_nj_list_wrapper').show().addClass('visible').removeClass('hiddenDiv');
				$('.background-size-cover').bgdSize('cover');
            }
        });
		
		$('.recommend_buddy_tile').livequery('click',function () {
			$(this).parent().find('.recommend_buddy_tile_selected').show();
			$(this).parent().addClass('selected');
        });
		$('.recommend_buddy_tile_selected').livequery('click',function () {
			$(this).hide();
			$(this).parent().removeClass('selected');
        });
		
		$('.recommend_registration_arrow_next').livequery('click',function() {
			var $current = $('.recommend_registration_list_wrapper.visible');
			if ($current.next('.recommend_registration_list_wrapper').length != 0) {
                //$('.buddy_list').hide();
                $current.removeClass('visible').hide().addClass('hiddenDiv');
				$current.next('.recommend_registration_list_wrapper').show().addClass('visible').removeClass('hiddenDiv');
				$('.background-size-cover').bgdSize('cover');
            }
        });

        $('.recommend_registration_arrow_previous').livequery('click',function () {
            var $current = $('.recommend_registration_list_wrapper.visible');
            if ($current.prev('.recommend_registration_list_wrapper').length != 0) {
                //$('.buddy_list').hide();
                $current.removeClass('visible').hide().addClass('hiddenDiv');
				$current.prev('.recommend_registration_list_wrapper').show().addClass('visible').removeClass('hiddenDiv');
				$('.background-size-cover').bgdSize('cover');
            }
        });
		
		/* configure tab submit */
		$('#configure_tab_content .submit_btn').livequery("click", function () {
           // $('.overlay').show();
           // $('.configure_submit_confirmation').fadeIn("slow");
           // $('.header, .cindy_circles').addClass('blur');
        });
		$('.configure_submit_confirmation_close, .configure_submit_confirmation .disagree_btn').bind("click", function () {
            $('.overlay, .configure_submit_confirmation').hide();
            $('.blur').removeClass('blur');
        });
		
		$('.configure_submit_confirmation .agree_btn').bind('click',function(){
			$('.configure_submit_confirmation').hide();
			$('.configure_submit_information').fadeIn();
		});
		
		$('.configure_submit_information_close, .configure_submit_information .ok_btn').bind('click',function(){
			$('.configure_submit_information, .overlay').hide();
			$('.blur').removeClass('blur');
		});
		
		/* recommend button */
		$('#recommendations_tab_content .recommend_btn, .recommend_registration_submit').livequery("click", function () {
            $('.overlay').show();
            $('.recommend_submit_confirmation').fadeIn("slow");
            $('.header, .cindy_circles').addClass('blur');
        });
		$('.recommend_submit_confirmation_close, .recommend_submit_confirmation .disagree_btn').bind("click", function () {
            $('.overlay, .recommend_submit_confirmation').hide();
            $('.blur').removeClass('blur');
        });
		
		$('.recommend_submit_confirmation .agree_btn').bind('click',function(){
			$('.recommend_submit_confirmation').hide();
			$('.recommend_submit_information').fadeIn();
		});
		
		$('.recommend_submit_information_close, .recommend_submit_information .ok_btn').bind('click',function(){
			$('.recommend_submit_information, .overlay').hide();
			$('.blur').removeClass('blur');
		});
		
    }
}

$(document).ready(function(){
	bodyId = $('body').attr('id');
	switch (bodyId){	
	case 'New_joiners_view_storyline':
		storylineNS.init();
		break;
	case 'buddy_view_storyline':
		storylineNS.init();
		break;
	case 'New_joiners_view_circles':
		circlesNS.init();
		break;
	case 'buddy_view_circles':
		circlesNS.init();
		break;
	case 'New_joiners_view_buddy_list':
		buddyListNS.init();
		break;
	case 'New_joiners_view_registered_available_buddies':
		buddyListNS.init();
		break;
	case 'buddy_view_other_buddies':
		buddyListNS.init();
		break;
	case 'New_joiners_view_home':
		homeNS.init();
		break;
	case 'buddy_view_home':
		homeNS.init();
		break;
	case 'New_joiners_view_history':
		historyNS.init();
		break;
	case 'buddy_view_history':
		historyNS.init();
		break;
	case 'New_joiners_view_notifications':
		notificationsNS.init();
		break;
	case 'buddy_view_notifications':
		notificationsNS.init();
		break;
	case 'new_joiners_view_feedback':
		feedbackNS.init();
		break;
	case 'admin_view_newjoiners':
		adminNS.init();
		break;
	case 'admin_view_buddy':
		adminNS.init();
		break;
	case 'New_joiners_view_select_buddy':
		selectBuddyNS.init();
		break;
	default:
		generalNS.init();
		break;
	}
	generalNS.init();
});
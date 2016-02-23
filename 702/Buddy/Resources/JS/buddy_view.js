var buddyRequestNotificationsArray = new Array(6);
var connectionsArray = new Array(5);
var alertsNotificationArray = new Array(6);
var othersNotificationArray = new Array(6);
var historyArray = new Array(7);
var searchAssoList = [];
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
		$('.info_btn').jKit('tooltip', {'classname':'headerToolTip', 'text': 'About Buddy App' });
		$('.notifications_btn').jKit('tooltip', {'classname':'headerToolTip', 'text': 'Check out the Notifications' });
		$('.circles_btn').jKit('tooltip', {'classname':'headerToolTip', 'text': 'Search for a buddy in your Circles' });
		$('.history_header_btn').jKit('tooltip', { 'classname': 'headerToolTip', 'text': 'Check out the History of connections' });
		$('.storyline_btn').jKit('tooltip', { 'classname': 'headerToolTip', 'text': 'Read the Storyline' });
		$('.check_name_btn').jKit('tooltip', { 'classname': 'headerToolTip', 'text': '<div class="bulleted1"><ul><li>Check for valid Id first</li><li>Then click on Add admin button.</li></ul></div>' });
		$('#addingadminid').jKit('tooltip', { 'classname': 'headerToolTip', 'text': 'Click if valid Admin' });

		var isTM = document.getElementById("isTM").value;
		var isSupervisor = document.getElementById("isSupervisor").value;
		var isMasteradmin = document.getElementById("isMasteradmin").value;
		if ((isTM == "True" || isSupervisor == "True" || isMasteradmin == "True") && bodyId != "buddy_view_storyline") {
		    $('.admin_view_btn').show();
		    $('.admin_view_btn').jKit('tooltip', { 'classname': 'headerToolTip', 'text': 'Change the app configuration' });
		}
		else {
		    $('.admin_view_btn').hide();
		}
        $('.registered_available_btn').jKit('tooltip', { 'classname': 'headerToolTip', 'text': 'Show Enrolled/Available Buddies' });
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

//===================================================== Storyline ===========================================================
var storylineNS = {
    init: function () {
        /* default view */
        $('#tab1').addClass('selected');
        var reg = $("#isRegistered").val();
        if (reg == 'False') {
            $('.menu_btn').hide();
            $('.nominate_btn').text('Enroll as a Buddy to proceed');
            $('.nominate_btn').removeClass('remove_buddy_btn').addClass('nominate_btn');
            $('.nominate_btn').show();
            $('.proceed_arrow').show();
        }
        else {
            $('.menu_btn').hide();
            $('.nominate_btn').text('Withdraw your enrollment');
            $('.nominate_btn').removeClass('nominate_btn').addClass('remove_buddy_btn');
            $('.proceed_arrow').show();
        }

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


        $('#nomination_agree_btn').livequery('click', function () {
            $('.nomination_confirmation_popup').hide();
            $('.proceed_arrow').show();
            var bodyId = $('body').attr('id');
            $.ajax({
                type: 'POST',
                url: bodyId + '.aspx/NominateAsBuddy',
                contentType: 'application/json',
                data: "{buddyId:'" + $("#CurrentUserId").val() + "'}",
                dataType: 'json',
                processData: false,
                success: function (response) {
                    $("#isRegistered").val("True");
                    return;
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    return;
                }
            });
            setTimeout(function () {
                $('.overlay').show();
                $('.update_profile_popup').fadeIn();
                $('.nominate_btn').text('Withdraw your enrollment');
                $('.nominate_btn').removeClass('nominate_btn').addClass('remove_buddy_btn');
                $("#lnkUpdateProfile").attr('href', "https://onecognizant.cognizant.com?GlobalAppId=896&Source=9&URL=https%3A%2F%2Fonecognizantapps.cognizant.com%2F896%2FDetailedProfilePage.aspx%3FhdnIsTMFlag%3dNo%26viewprofileid%3D" + $("#CurrentUserId").val() + "");
            }, 50);

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

        $('.remove_buddy_confirmation_popup .agree_btn').livequery('click', function () {
            $('.overlay, .remove_buddy_confirmation_popup').hide();
            $('.blur').removeClass('blur');
            $('.remove_buddy_btn').text('Enroll as a Buddy to proceed');
            $('.remove_buddy_btn').removeClass('remove_buddy_btn').addClass('nominate_btn');
            var bodyId = $('body').attr('id');
            $.ajax({
                type: 'POST',
                url: bodyId + '.aspx/RetractAsBuddy',
                contentType: 'application/json',
                data: "{buddyId:'" + $("#CurrentUserId").val() + "'}",
                dataType: 'json',
                processData: false,
                success: function (response) {
                    $("#isRegistered").val("False");
                    return;
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    return;
                }
            });

        });

        $('.storyboard_tile_item').livequery('click', function () {
            $('.overlay').show();
            var tile_id = "#" + $(this).attr('id') + "_content";
            $(tile_id).fadeIn();
            $(tile_id).find('.slimScrollDiv').find('.slimScrollBar')[0].style.top = 0;

        });

        $('.back_btn').livequery('click', function () {
            $('.overlay, .storyboard').hide();

        });

        $("#lnkUpdateProfile").livequery("click", function () {
            $('.overlay, .update_profile_popup').hide();
            $('.blur').removeClass('blur');
        });
    }
}

//===================================================== Circle ===========================================================
var circlesNS = {
    init: function () {
        drop_location = 'buddy_view_other_buddies.aspx';
        $(function () {
            $(".draggable").draggable({ revert: "invalid", helper: "original" });
            $("#droppable").droppable({
                tolerance: "pointer",
                accept: ".draggable",
                drop: function (event, ui) {
                    $(this).find("p").html("Dropped!");
                    var id_this = ui.draggable;
                    var currentItem = $(id_this).attr("id");
                    if (currentItem == "" || currentItem == null)
                        currentItem = $(id_this)[0].parentNode.id;
                    if (currentItem == "" || currentItem == null)
                        currentItem = "Team";
                    window.location.href = drop_location + '?filter_type=' + currentItem;
                },
                activate: function (event, ui) {
                    $('.drop_circle').addClass('drop_circle_hover');
                },
                deactivate: function (event, ui) {
                    $('.drop_circle').removeClass('drop_circle_hover');
                }
            });
        });

        /* tooltip */
        $('body').jKit();
        $('.search_btn').jKit('tooltip', { 'classname': 'mytooltip', 'text':
			'<div class="bulleted"><ul><li>Search other Buddies by Name or Emp-ID.</li></ul></div>'
        });

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
        $('.searchBox').autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: 'POST',
                    url: $('body').attr('id') + '.aspx/SearchAssoData',
                    contentType: 'application/json',
                    dataType: 'json',
                    data: "{searchText:'" + request.term + "'}",
                    success: function (data) {
                        var myData = eval('(' + data.d + ')');
                        response($.map(myData, function (item) {
                            return {
                                label: item.UserName + ' (' + item.UserId.replace(/\s+/g, '') + ')',
                                value: item.UserId.replace(/\s+/g, ''),
                                desc: item.UserName
                            }
                        }));
                    }
                });
            },
            minLength: 3,
            focus: function (event, ui) {
                $('.searchBox').val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                $('.searchBox').val(ui.item.label);
                $('.search_btn').val(ui.item.value);
                $("#search-id").val(ui.item.value);
                $("#search-description").html(ui.item.desc);
                return false;
            }
        })
        .data("ui-autocomplete")._renderItem = function (ul, item) {
            return $("<li>")
            .append("<a href='#'>" + item.value + "<br/>" + item.desc + "</a>")
            .appendTo(ul);
        };

        /* contact card */
        $('.search_btn').bind("click", function () {
            var UserId = $('.search_btn')[0].value;
            //var UserId = $('.searchBox')[0].value;
            if (isNaN(UserId) || UserId == "") {
                $('.overlay').show();
                $('.contact_card').hide();
                $('.error_popup').fadeIn();
                $("#lblCommonInfoPopup").html('');
                $("#lblCommonInfoPopup").append("Please enter the valid Associate ID/Associate Name.");
                $('#Searchtext').val('Search by name or Id');
            }
            else {
                GetContactCard(UserId);
                $('.overlay').show();
                $('.contact_card').fadeIn("slow");
                $('.header, .cindy_circles').addClass('blur');
                $('#Searchtext').val('Search by name or Id');
            }
        });
        $('.contact_close').bind("click", function () {
            $('.overlay, .contact_card').hide();
            $('.blur').removeClass('blur');
        });

        $('.send_buddy_request_btn').bind('click', function () {
            $('.contact_card').hide();
            $('.confirmation_popup').fadeIn();
        });

        $('.disagree_btn, .confirmation_popup_close').bind('click', function () {
            $('.confirmation_popup').hide();
            $('.contact_card').fadeIn();
        });

        $('.agree_btn').bind('click', function () {
            $('.confirmation_popup').hide();
            $('.sent_request_info_popup').fadeIn();
        });

        $('.sent_request_info_popup_close').bind('click', function () {
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
    }
}

//===================================================== BuddyList ===========================================================
var buddyListNS = {
    init: function () {
        /* tooltip */
        $('body').jKit();

        bodyId: $('body').attr('id');
        var UptoLevel = 2;
        var filter_type = $("#filter_type").val();
        if (filter_type == null || filter_type == "")
            filter_type = "Team";
        GetAllLikelyBuddies(filter_type, UptoLevel);

        $('.search_btn').jKit('tooltip', { 'classname': 'mytooltip', 'text':
			'<div class="bulleted"><ul><li>Search other Buddies by Name or Emp-ID.</li></ul></div>'
        });

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

        $('.searchBox').autocomplete({
            minLength: 3,
            source: searchBuddyList,
            focus: function (event, ui) {
                $('.searchBox').val($.trim(ui.item.disp.substring(0,15)) + ' (' + ui.item.value + ')');
                return false;
            },
            select: function (event, ui) {
                $('.searchBox').val($.trim(ui.item.disp.substring(0,15)) + ' (' + ui.item.value + ')');
                $('.search_btn').val(ui.item.value);
                $("#search-id").val(ui.item.value);
                $("#search-description").html(ui.item.desc);
                return false;
            }
        })

        .data("ui-autocomplete")._renderItem = function (ul, item) {
            return $("<li>")
            .append("<a href='#'>" + item.value + "<br/>" + item.desc + "</a>")
            .appendTo(ul);
        };

        /* contact card */
        $('.search_btn').bind("click", function () {
            var UserId = $('.search_btn')[0].value;
            //var UserId = $('.searchBox')[0].value;
            if (isNaN(UserId) || UserId == "") {
                $('.overlay').show();
                $('.contact_card').hide();
                $('.error_popup').fadeIn();
                $("#lblCommonInfoPopup").html('');
                $("#lblCommonInfoPopup").append("Please enter the valid Associate ID/Associate Name.");
                $('#Searchtext').val('Search by name or Id');
            }
            else {
                GetContactCard(UserId);
                $('.overlay').show();
                $('.contact_card').fadeIn("slow");
                $('.header, .cindy_circles').addClass('blur');
                $('#Searchtext').val('Search by name or Id');
            }
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
            var selectedCircleId = $(this).parent()[0].id;
            var thisDropdown = $(this).parentsUntil('.dropdown_wrapper');
            thisDropdown.prev().find('.selected_circle').text(selectedCircle);
            $('.dropdown_select').slideUp();
            if (selectedCircleId != "") {
                $("#filter_type").innerHTML = selectedCircleId;
                $('.buddies_dropdown .selected_circle').text("All");
                $('input:checkbox[value="facility"]').attr("checked", false);
                $('input:checkbox[value="baymates"]').attr("checked", false);
                $('input:checkbox[value="bu"]').attr("checked", false);
                $('input:checkbox[value="department"]').attr("checked", false);
                $('input:checkbox[value="grade"]').attr("checked", false);
                global_counter = 0;
                $('#sel_count').html(global_counter);
                $("#dvBuddyList").html('');
                $("#dvBuddyList").append('<div class="buddy_list buddy_list_visible"><img style="padding-top: 100px; padding-left: 330px; width: 41px;" src="Resources/Images/loading-blue.gif" alt=""/><br/><label style="padding-top: 100px; padding-left: 325px;">Loading...</label></div>');

                GetAllLikelyBuddies(selectedCircleId, 2);
            }
            else {
                FilterLikelyBuddies();
            }
        });

        $(document).on('mousedown', function (event) {
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
                //$(this).find('.notifications_popup').toggle();
                $('#notifPop').toggle();
                $('#dvNotificationArrow').toggle();
                $('.background-size-cover').bgdSize('cover');
            }
        });
        $(document).on('mousedown', function (event) {
            if ($(event.target).parents('.notifications_popup').length == 0) {
                if (!($(event.target).hasClass('notifications_btn'))) {
                    $('.notifications_popup').hide();
                    $('.notifications_btn').removeClass('selected');
                }
            }
        });
        $('.notifications_see_more p img.nj_view_notifications').bind('click', function () {
            window.location.href = "New_joiners_view_notifications.aspx";
        });
        $('.notifications_see_more p img.buddy_view_notifications').bind('click', function () {
            window.location.href = "buddy_view_notifications.aspx";
        });

        /* set background size to 'cover'*/
        //$('.background-size-cover').bgdSize('cover');
        $('.background-size-cover').livequery(function () {
            $(this).bgdSize('cover');
        });

        $('.buddy_list_image').livequery(function () {
            $(this).hover(function () {
                if ($(this)[0].innerHTML != "") {
                    var profilePic = $(this).find('img.profile_pic');
                    var attr = profilePic.attr('src');
                    if (typeof attr !== 'undefined' && attr !== false) {
                        var linkwidth = $(this).find('img.profile_pic').outerWidth();
                        $(this).find('img.profile_pic').animate({ right: linkwidth + 'px' });
                    }
                    //if (profilePic.attr('src').length != 0) {
                    //    var linkwidth = $(this).find('img.profile_pic').outerWidth();
                    //    $(this).find('img.profile_pic').animate({ right: linkwidth + 'px' });
                    //}
                    else {
                        $(this).find('img.dummy_image').show();
                        $(this).find('img.profile_pic').hide();
                    }
                }
            },
			function () {
			    if ($(this)[0].innerHTML != "") {
			        var profilePic = $(this).find('img.profile_pic');
			        var attr = profilePic.attr('src');
			        if (typeof attr !== 'undefined' && attr !== false) {
			            $(this).find('img.profile_pic').animate({ right: 0 + 'px' });
			        }
			        //if (profilePic.attr('src').length != 0) {
			        //    $(this).find('img.profile_pic').animate({ right: 0 + 'px' });
			        //}
			        else {
			            $(this).find('img.dummy_image').hide();
			            $(this).find('img.profile_pic').hide();
			        }
			    }
			});
        });

        $('.buddy_list_nav_next').livequery('click', function () {
            var $current = $('.buddy_list_visible');
            if ($current.next('.buddy_list').length != 0) {
                $('.buddy_list').hide();
                $current.removeClass('buddy_list_visible').hide();
                $current.next('.buddy_list').show().addClass('buddy_list_visible');
                $('.background-size-cover').bgdSize('cover');
            }
        });

        $('.buddy_list_nav_prev').livequery('click', function () {
            var $current = $('.buddy_list_visible');
            if ($current.prev('.buddy_list').length != 0) {
                $('.buddy_list').hide();
                $current.removeClass('buddy_list_visible').hide();
                $current.prev('.buddy_list').show().addClass('buddy_list_visible');
                $('.background-size-cover').bgdSize('cover');
            }
        });

        /* contact card on click of buddy_list_image */
        $('a.buddy_list_image').livequery('click', function () {
            var BuddyId = $(this).find('div')[0].id;
            var bodyId = $('body').attr('id');
            GetContactCard(BuddyId);
            $('.overlay').show();
            $('.contact_card').fadeIn("slow");
            $('.header, .cindy_circles').addClass('blur');
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
                //var created_filterbtn = '<span title="' + $(this).attr("value") + '" class="filterspan">' + $(this).attr("value") + ' <img alt="" class="filter_close" src="Resources/Images/close.png" /> </span>';
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

        $(".reject_request_popup .comment_area").bind("focus", function (e) {
            var thisObj = $(this);
            if (thisObj.val() == "Please provide a reason for rejection...") {
                thisObj.val('');
            }
        });
        $(".reject_request_popup .comment_area").bind("blur", function (e) {
            var thisObj = $(this);
            if (thisObj.val() == "") {
                thisObj.val('Please provide a reason for rejection...');
            }
        });

        $('.reject_request_popup_close').bind("click", function () {
            $('.overlay, .reject_request_popup').hide();
            $('.blur').removeClass('blur');
        });

        $('.reject_request_popup .disagree_btn').bind("click", function () {
            $('.overlay, .reject_request_popup').hide();
            $('.blur').removeClass('blur');

            var RejectionComment = document.getElementById('txtBuddyReject').value;

            if (RejectionComment == 'Please provide a reason for rejection...' || RejectionComment == null || RejectionComment == '') {
                $('.overlay').show();
                $('.error_popup').fadeIn('slow');
                $("#lblCommonInfoPopup").html('');
                $("#lblCommonInfoPopup").append("Please provide a reason for rejection");
            }
            else {
                var BuddyId = $('#CurrentUserId').val();
                var JoineeId = $('#JoineeIdReject').val();
                var RequestType = 'REJECT';
                $.ajax({
                    type: 'POST',
                    url: $('body').attr('id') + '.aspx/BuddyConnectionRequest',
                    contentType: 'application/json',
                    data: "{joineeId:'" + JoineeId + "',buddyId:'" + BuddyId + "',requestType:'" + RequestType + "',rejectionComment:'" + RejectionComment + "',supervisorRecommended:'0'}",
                    dataType: 'json',
                    processData: false,

                    success: function (response) {
                        $('.overlay').show();
                        $('.successful_popup').fadeIn();
                        $("#lblSuccessfulPopup").html('');
                        $("#lblSuccessfulPopup").append("You have rejected joinee's request successfully");
                        $('#notify_popup').click(function () {
                            $(this).parent().slideToggle();
                        });
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        $('.overlay').show();
                        $('.error_popup').fadeIn('slow');
                        $("#lblCommonInfoPopup").html('');
                        $("#lblCommonInfoPopup").append("Looks like some issue while rejecting the request. Please try later");
                    }
                });

            }
        });
    }
}

//===================================================== Home ===========================================================
var homeNS = {
    init: function () {
        $('.div_190_120, .div_285_120').hover(function () {
            $(this).find('.home_tile_wrapper img').fadeTo("fast", 0.1);
            if (document.getElementById('unread_Notify').textContent > 0) {
                $(this).find('.unread_notifications_home').fadeTo("fast", 0.1);
            }
            $(this).find('.home_tile_wrapper p').hide();
            $(this).find('.home_tile_description').show();
        }, function () {
            $(this).find('.home_tile_wrapper img').fadeTo("fast", 1);
            if (document.getElementById('unread_Notify').textContent > 0) {
                $(this).find('.unread_notifications_home').fadeTo("fast", 1);
            }
            $(this).find('.home_tile_wrapper p').show();
            $(this).find('.home_tile_description').hide();
        });
    }
}

//===================================================== History ===========================================================
var historyNS = {
    init: function () {
        var reg = $("#isRegistered").val();
        if (reg == 'False') {
            $('.nominate_btn').text('Click to Enroll yourself');
            $('.nominate_btn').removeClass('remove_buddy_btn').addClass('nominate_btn');
        }
        else {
            $('.nominate_btn').text('Withdraw your enrollment');
            $('.nominate_btn').removeClass('nominate_btn').addClass('remove_buddy_btn');
        }

        GetBuddyHistory();
        /* tooltip */
        $('body').jKit();
        $('.search_btn').jKit('tooltip', { 'classname': 'mytooltip', 'text':
			'<div class="bulleted"><ul><li>Search other Buddies by Name or Emp-ID.</li></ul></div>'
        });

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

        $('.send_buddy_request_btn').bind('click', function () {
            $('.contact_card').hide();
            $('.confirmation_popup').fadeIn();
        });

        $('.confirmation_popup .disagree_btn, .confirmation_popup_close').bind('click', function () {
            $('.confirmation_popup').hide();
            $('.contact_card').fadeIn();
        });

        $('.confirmation_popup .agree_btn').bind('click', function () {
            BuddyDisconnectionRequest();
            $('.confirmation_popup').hide();
            $('.sent_request_info_popup').fadeIn();
        });

        $('.sent_request_info_popup_close').bind('click', function () {
            $('.sent_request_info_popup, .overlay').hide();
            $('.blur').removeClass('blur');
        });

        /* set background size to 'cover'*/
        $('.background-size-cover').livequery(function () {
            $(this).bgdSize('cover');
        });

        $('.history_left_item').livequery('click', function () {
            var thisObj = $(this);
            $('.history_left_item').removeClass('selected');
            thisObj.addClass('selected');
            var thisObjIndex = $('.history_left_item').index(thisObj);
            if (thisObjIndex < historyArray.length) {
                var imgSrc = thisObj.find('.history_left_image img').attr('src');
                var name = historyArray[thisObjIndex][0];
                var designation = historyArray[thisObjIndex][1];
                var fromDate = historyArray[thisObjIndex][2];
                var toDate = historyArray[thisObjIndex][3];
                var status = historyArray[thisObjIndex][4];
                var connectedId = historyArray[thisObjIndex][5];
                var DisconnectionStatus = historyArray[thisObjIndex][6];
                //$('.history_content_right .font_name').text(name);
                $('.history_content_right .designation').text(designation);
                $('.history_content_right .fromDate').text(fromDate);
                $('.history_content_right .toDate').text(toDate);
                $('.history_content_right .status').text(status);
                //$('.history_content_right .history_right_image img').attr('src', imgSrc);
                $('.history_content_right').attr('id', connectedId);
                if (status == 'Done' || DisconnectionStatus == 'Disengaged from Buddy' || DisconnectionStatus == 'Disengaged from Joinee') {
                    $("#btnHistoryPageDisconnect").addClass("hiddenDiv");
                }
                else {
                    $("#btnHistoryPageDisconnect").removeClass("hiddenDiv");
                }
                $("#HistoryJoineeId").val(connectedId);

                var HistorySelectedUserEmailId;
                HistorySelectedUserEmailId = GetAssociateEmailId(connectedId);
                          
                if (HistorySelectedUserEmailId != false || HistorySelectedUserEmailId != null || HistorySelectedUserEmailId != 'undefined') {                    
                    
                    $("#JoineeName").html('');
                    $("#JoineeName").append(name + "        " + "<img style='cursor:pointer;' src='Resources/Images/presence_16-unknown.png' id ='imgCommunicatorStatus' title='Status' /><img title='Ping me' src='Resources/Images/communicator3.png' style='width:20px;cursor:pointer;margin-left:3px;' onclick='OpenCommunicatorTileView();'/><img src='Resources/Images/outlook.jpg' style='width:20px;cursor:pointer;margin-left:4px;' title='Mail' onclick='SendEmail();'/>");
                }
                else {
                    $("#JoineeName").html('');
                    $("#JoineeName").append(name);
                }

                var request = new XMLHttpRequest;
                request.open('GET', "ShowImage.ashx?id=" + connectedId + "", false);
                request.send();
                if (request.status === 200) {
                    $("#JoineeImage").attr('src', 'ShowImage.ashx?id=' + connectedId + '');
                }
                else {
                    $("#JoineeImage").attr('src', 'Resources/Images/dummy_image.jpg');
                }

                document.getElementById('viewprofile').setAttribute('href', "https://onecognizant.cognizant.com?GlobalAppId=896&Source=9&URL=https%3A%2F%2Fonecognizantapps.cognizant.com%2F896%2FDetailedProfilePage.aspx%3FhdnIsTMFlag%3dNo%26viewprofileid%3D" + connectedId + "");
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

        $('.discontinue_confirmation_popup .agree_btn').bind('click', function () {
            BuddyDisconnectionRequest();

        });

        $('.discontinue_sent_info_popup_close, .discontinue_sent_info_popup .ok_btn').bind('click', function () {
            $('.discontinue_sent_info_popup, .overlay').hide();
            $('.blur').removeClass('blur');
        });

        $('#Buddy_view_history .feedback_btn').bind('click', function () {
            GetFeedbackHistory();
        });
        $('#Buddy_view_history .feedback_popup_close').bind('click', function () {
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

        $('.nomination_confirmation_popup .agree_btn').livequery('click', function () {
            $('.overlay, .nomination_confirmation_popup').hide();
            $('.blur').removeClass('blur');
            $('.nominate_btn').text('Withdraw your enrollment');
            $('.nominate_btn').removeClass('nominate_btn').addClass('remove_buddy_btn');

            $.ajax({
                type: 'POST',
                url: $('body').attr('id') + '.aspx/NominateAsBuddy',
                contentType: 'application/json',
                data: "{buddyId:'" + $("#CurrentUserId").val() + "'}",
                dataType: 'json',
                processData: false,
                success: function (response) {
                    $("#isRegistered").val("True");
                    return;
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    return;
                }
            });
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

        $('.remove_buddy_confirmation_popup .agree_btn').livequery('click', function () {
            $('.overlay, .remove_buddy_confirmation_popup').hide();
            $('.blur').removeClass('blur');
            $('.remove_buddy_btn').text('Click to Enroll yourself');
            $('.remove_buddy_btn').removeClass('remove_buddy_btn').addClass('nominate_btn');
            $.ajax({
                type: 'POST',
                url: $('body').attr('id') + '.aspx/RetractAsBuddy',
                contentType: 'application/json',
                data: "{buddyId:'" + $("#CurrentUserId").val() + "'}",
                dataType: 'json',
                processData: false,
                success: function (response) {
                    $("#isRegistered").val("False");
                    return;
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    return;
                }
            });
        });
    }
}

//===================================================== Notification ===========================================================
var notificationsNS = {
    init: function () {

        /* set background size to 'cover'*/
        GetNotificationBuddyRequests();
        $('.background-size-cover').livequery(function () {
            $(this).bgdSize('cover');
        });

        if (document.getElementById("isSupervisor").value == "True")
            $('.team_member_notifications_btn').show();
        else
            $('.team_member_notifications_btn').hide();

        $('.notifications_left_item').livequery('click', function () {
            var thisObj = $(this);
            $(this).siblings().removeClass('selected');
            thisObj.addClass('selected');
            //var thisObjIndex = $('.notifications_left_item').index(thisObj);
            var thisObjIndex = $(this).parentsUntil('.notifications_tab_content').find('.notifications_left_item').index(thisObj);
            var parentClass = $(this).parentsUntil('.notifications_tab_content').parent();
            var tabContentClassName = parentClass.attr('class').split(" ")[0];
            switch (tabContentClassName) {
                case 'buddy_request_notifications_content':
                    if (thisObjIndex < buddyRequestNotificationsArray.length) {
                        var imgSrc = thisObj.find('.notifications_left_image img').attr('src');
                        var name = buddyRequestNotificationsArray[thisObjIndex][0];
                        var designation = buddyRequestNotificationsArray[thisObjIndex][1];
                        var language = buddyRequestNotificationsArray[thisObjIndex][2];
                        var projectname = buddyRequestNotificationsArray[thisObjIndex][3];
                        var buName = buddyRequestNotificationsArray[thisObjIndex][4];
                        var joineeId = buddyRequestNotificationsArray[thisObjIndex][5];
                        parentClass.find('.notifications_content_right .font_name').text(name);
                        parentClass.find('.notifications_content_right .designation').text(designation);
                        parentClass.find('.notifications_content_right .language').text(language);
                        parentClass.find('.notifications_content_right .project_name').text(projectname);
                        parentClass.find('.notifications_content_right .bu_name').text(buName);
                        //parentClass.find('.notifications_content_right .notifications_right_image img').attr('src', imgSrc);
                        parentClass.find('.notifications_content_right .notifications_right_image img').bgdSize('cover');
                        parentClass.find('.notifications_content_right').attr('id', joineeId);
                        $("#btnDetailedProfile").attr('href', "https://onecognizant.cognizant.com?GlobalAppId=896&Source=9&URL=https%3A%2F%2Fonecognizantapps.cognizant.com%2F896%2FDetailedProfilePage.aspx%3FhdnIsTMFlag%3dNo%26viewprofileid%3D" + joineeId + "");
                        $("#NotificationJoineeId").val(joineeId);
                        var HistorySelectedUserEmailId;
                        HistorySelectedUserEmailId = GetAssociateEmailId(joineeId);                        
                        if (HistorySelectedUserEmailId != false || HistorySelectedUserEmailId != null || HistorySelectedUserEmailId != 'undefined') {
                            $("#Joinee_Name").html('');
                            $("#Joinee_Name").append(name + "        " + "<img style='cursor:pointer;' src='Resources/Images/presence_16-unknown.png' id ='imgCommunicatorStatus' title='Status' /><img title='Ping me' src='Resources/Images/communicator3.png' style='width:20px;cursor:pointer;margin-left:3px;' onclick='OpenCommunicatorTileView();'/><img src='Resources/Images/outlook.jpg' style='width:20px;cursor:pointer;margin-left:4px;' title='Mail' onclick='SendEmail();'/>");
                        }
                        else {
                            $("#Joinee_Name").html('');
                            $("#Joinee_Name").append(name);
                        }

                        var request = new XMLHttpRequest;
                        request.open('GET', "ShowImage.ashx?id=" + joineeId + "", false);
                        request.send();
                        if (request.status === 200) {
                            $("#Joinee_Image").attr('src', 'ShowImage.ashx?id=' + joineeId + '');
                        }
                        else {
                            $("#Joinee_Image").attr('src', 'Resources/Images/dummy_image.jpg');
                        }
                    }
                    break;
                case 'alerts_notifications_content':
                    if (thisObjIndex < alertsNotificationArray.length) {
                        var imgSrc = thisObj.find('.notifications_left_image img').attr('src');
                        var name = alertsNotificationArray[thisObjIndex][0];
                        var designation = alertsNotificationArray[thisObjIndex][1];
                        var fromDate = alertsNotificationArray[thisObjIndex][2];
                        var toDate = alertsNotificationArray[thisObjIndex][3];
                        var status = alertsNotificationArray[thisObjIndex][4];
                        var joineeId = alertsNotificationArray[thisObjIndex][5];
                        parentClass.find('.notifications_content_right .font_name').text(name);
                        parentClass.find('.notifications_content_right .designation').text(designation);
                        parentClass.find('.notifications_content_right .fromDate').text(fromDate);
                        parentClass.find('.notifications_content_right .toDate').text(toDate);
                        parentClass.find('.notifications_content_right .status').text(status);
                        //parentClass.find('.notifications_content_right .notifications_right_image img').attr('src', imgSrc);
                        parentClass.find('.notifications_content_right .notifications_right_image img').bgdSize('cover');
                        parentClass.find('.notifications_content_right').attr('id', joineeId);
                        $("#NotificationJoineeId").val(joineeId);
                        var HistorySelectedUserEmailId;
                        HistorySelectedUserEmailId = GetAssociateEmailId(joineeId);
                        $("#ccEmailId").val(HistorySelectedUserEmailId);
                        if (HistorySelectedUserEmailId != false || HistorySelectedUserEmailId != null || HistorySelectedUserEmailId != 'undefined') {

                            $("#Joinee_Name1").html('');
                            $("#Joinee_Name1").append(name + "        " + "<img style='cursor:pointer;' src='Resources/Images/presence_16-unknown.png' id ='imgCommunicatorStatus' title='Status' /><img title='Ping me' src='Resources/Images/communicator3.png' style='width:20px;cursor:pointer;margin-left:3px;' onclick='OpenCommunicatorTileView();'/><img src='Resources/Images/outlook.jpg' style='width:20px;cursor:pointer;margin-left:4px;' title='Mail' onclick='SendEmail();'/>");
                        }
                        else {
                            $("#Joinee_Name1").html('');
                            $("#Joinee_Name1").append(name);
                        }

                        var request = new XMLHttpRequest;
                        request.open('GET', "ShowImage.ashx?id=" + joineeId + "", false);
                        request.send();
                        if (request.status === 200) {
                            $("#Joinee_Image1").attr('src', 'ShowImage.ashx?id=' + joineeId + '');
                        }
                        else {
                            $("#Joinee_Image1").attr('src', 'Resources/Images/dummy_image.jpg');
                        }
                    }
                    break;

                case 'team_members_notifications_content':
                    if (thisObjIndex < alertsNotificationArray.length) {
                        var imgSrc = thisObj.find('.notifications_left_image img').attr('src');
                        var name = alertsNotificationArray[thisObjIndex][0];
                        var designation = alertsNotificationArray[thisObjIndex][1];
                        var JoineeId = alertsNotificationArray[thisObjIndex][2];
                        parentClass.find('.notifications_content_right .font_name').text(name);
                        parentClass.find('.notifications_content_right .designation').text(designation);
                        //parentClass.find('.notifications_content_right .notifications_right_image img').attr('src', imgSrc);
                        parentClass.find('.notifications_content_right .notifications_right_image img').bgdSize('cover');
                        parentClass.find('.notifications_content_right').attr('id', JoineeId);

                        var HistorySelectedUserEmailId;
                        HistorySelectedUserEmailId = GetAssociateEmailId(joineeId);
                        $("#ccEmailId").val(HistorySelectedUserEmailId);
                        if (HistorySelectedUserEmailId != false || HistorySelectedUserEmailId != null || HistorySelectedUserEmailId != 'undefined') {

                            $("#Joinee_Name3").html('');
                            $("#Joinee_Name3").append(name + "        " + "<img style='cursor:pointer;' src='Resources/Images/presence_16-unknown.png' id ='imgCommunicatorStatus' title='Status' /><img title='Ping me' src='Resources/Images/communicator3.png' style='width:20px;cursor:pointer;margin-left:3px;' onclick='OpenCommunicatorTileView();'/><img src='Resources/Images/outlook.jpg' style='width:20px;cursor:pointer;margin-left:4px;' title='Mail' onclick='SendEmail();'/>");
                        }
                        else {
                            $("#Joinee_Name3").html('');
                            $("#Joinee_Name3").append(name);
                        }

                        var request = new XMLHttpRequest;
                        request.open('GET', "ShowImage.ashx?id=" + JoineeId + "", false);
                        request.send();
                        if (request.status === 200) {
                            $("#Joinee_Image3").attr('src', 'ShowImage.ashx?id=' + JoineeId + '');
                        }
                        else {
                            $("#Joinee_Image3").attr('src', 'Resources/Images/dummy_image.jpg');
                        }
                    }
                    break;
                case 'others_notifications_content':
                    if (thisObjIndex < othersNotificationArray.length) {
                        var imgSrc = thisObj.find('.notifications_left_image img').attr('src');
                        var name = othersNotificationArray[thisObjIndex][0];
                        var designation = othersNotificationArray[thisObjIndex][1];
                        var fromDate = othersNotificationArray[thisObjIndex][2];
                        var toDate = othersNotificationArray[thisObjIndex][3];
                        var status = othersNotificationArray[thisObjIndex][4];
                        var joineeId = othersNotificationArray[thisObjIndex][5];
                        parentClass.find('.notifications_content_right .font_name').text(name);
                        parentClass.find('.notifications_content_right .designation').text(designation);
                        parentClass.find('.notifications_content_right .fromDate').text(fromDate);
                        parentClass.find('.notifications_content_right .toDate').text(toDate);
                        parentClass.find('.notifications_content_right .status').text(status);
                        //parentClass.find('.notifications_content_right .notifications_right_image img').attr('src', imgSrc);
                        parentClass.find('.notifications_content_right .notifications_right_image img').bgdSize('cover');
                        parentClass.find('.notifications_content_right').attr('id', joineeId);
                        var HistorySelectedUserEmailId;
                        HistorySelectedUserEmailId = GetAssociateEmailId(joineeId);
                        $("#ccEmailId").val(HistorySelectedUserEmailId);
                        if (HistorySelectedUserEmailId != false || HistorySelectedUserEmailId != null || HistorySelectedUserEmailId != 'undefined') {

                            $("#Joinee_Name2").html('');
                            $("#Joinee_Name2").append(name + "        " + "<img style='cursor:pointer;' src='Resources/Images/presence_16-unknown.png' id ='imgCommunicatorStatus' title='Status' /><img title='Ping me' src='Resources/Images/communicator3.png' style='width:20px;cursor:pointer;margin-left:3px;' onclick='OpenCommunicatorTileView();'/><img src='Resources/Images/outlook.jpg' style='width:20px;cursor:pointer;margin-left:4px;' title='Mail' onclick='SendEmail();'/>");
                        }
                        else {
                            $("#Joinee_Name2").html('');
                            $("#Joinee_Name2").append(name);
                        }

                        var request = new XMLHttpRequest;
                        request.open('GET', "ShowImage.ashx?id=" + joineeId + "", false);
                        request.send();
                        if (request.status === 200) {
                            $("#Joinee_Image2").attr('src', 'ShowImage.ashx?id=' + joineeId + '');
                        }
                        else {
                            $("#Joinee_Image2").attr('src', 'Resources/Images/dummy_image.jpg');
                        }
                    }
                    break;
                default:
                    break;
            }

        });
        //$('.displayNone').hide().removeClass('displayNone');

        /* click of notification tabs */
        $('.notifications_content_tabs a').livequery('click', function () {
            $(this).siblings().removeClass('selected');
            var tabClassName = $(this).attr('class').split(" ")[0];
            $(this).addClass('selected');
            $('.notifications_tab_content').hide();
            switch (tabClassName) {
                case 'buddy_request_notifications_btn':
                    GetNotificationBuddyRequests();
                    $('.buddy_request_notifications_content').show();
                    $('.background-size-cover').livequery(function () {
                        $(this).bgdSize('cover');
                    });
                    break;
                case 'alerts_notifications_btn':
                    GetNotificationBuddyDisconnectionAlerts();
                    $('.alerts_notifications_content').show();
                    $('.background-size-cover').livequery(function () {
                        $(this).bgdSize('cover');
                    });
                    break;
                case 'others_notifications_btn':
                    GetNotificationBuddyOther();
                    $('.others_notifications_content').show();
                    $('.background-size-cover').livequery(function () {
                        $(this).bgdSize('cover');
                    });
                    break;
                case 'team_member_notifications_btn':
                    GetNotificationBuddyTeamMembers();
                    $('.team_members_notifications_content').show();
                    $('.background-size-cover').livequery(function () {
                        $(this).bgdSize('cover');
                    });
                    break;
                default:
                    break;
            }
        });

        $(".reject_request_popup .comment_area").bind("focus", function (e) {
            var thisObj = $(this);
            if (thisObj.val() == "Please provide a reason for rejection...") {
                thisObj.val('');
            }
        });
        $(".reject_request_popup .comment_area").bind("blur", function (e) {
            var thisObj = $(this);
            if (thisObj.val() == "") {
                thisObj.val('Please provide a reason for rejection...');
            }
        });

        $("#BuddyRequestAccept").bind("click", function () {
            var BuddyId = $('#CurrentUserId').val();
            var JoineeId = $('#NotificationJoineeId')[0].value;
            var RejectionComment = '';
            var RequestType = 'ACCEPT';
            $.ajax({
                type: 'POST',
                url: $('body').attr('id') + '.aspx/BuddyConnectionRequest',
                contentType: 'application/json',
                data: "{joineeId:'" + JoineeId + "',buddyId:'" + BuddyId + "',requestType:'" + RequestType + "',rejectionComment:'" + RejectionComment + "',supervisorRecommended:'0'}",
                dataType: 'json',
                processData: false,

                success: function (response) {
                    $('.overlay').show();
                    $('.header, .cindy_circles').addClass('blur');
                    $('.successful_popup').fadeIn();
                    $("#lblSuccessfulPopup").html('');
                    $("#lblSuccessfulPopup").append("You have successfully accepted the Joinee's request.");
                    GetNotificationBuddyRequests();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    $('.overlay').show();
                    $('.header, .cindy_circles').addClass('blur');
                    $('.error_popup').fadeIn();
                    $("#lblCommonInfoPopup").html('');
                    $("#lblCommonInfoPopup").append("Looks like some issue while accepting the request. Please try later.");
                    GetNotificationBuddyRequests();
                }
            });
        });

        $('#BuddyRequestReject').bind("click", function () {
            $('.overlay').show();
            $('.reject_request_popup').fadeIn("slow");
            $('.header, .cindy_circles').addClass('blur');
        });

        $('.reject_request_popup_close').bind("click", function () {
            $('.overlay, .reject_request_popup').hide();
            $('.blur').removeClass('blur');
        });

        $('.reject_request_popup .disagree_btn').bind("click", function () {
            $('.overlay, .reject_request_popup').hide();
            $('.blur').removeClass('blur');

            var RejectionComment = document.getElementById('txtBuddyReject').value;

            if (RejectionComment == 'Please provide a reason for rejection...' || RejectionComment == null || RejectionComment == '') {
                $('.overlay').show();
                $('.error_popup').fadeIn('slow');
                $("#lblCommonInfoPopup").html('');
                $("#lblCommonInfoPopup").append("Please provide a reason for rejection");
            }
            else {
                var BuddyId = $('#CurrentUserId').val();
                var JoineeId = $('#NotificationJoineeId')[0].value;
                var RequestType = 'REJECT';
                $.ajax({
                    type: 'POST',
                    url: $('body').attr('id') + '.aspx/BuddyConnectionRequest',
                    contentType: 'application/json',
                    data: "{joineeId:'" + JoineeId + "',buddyId:'" + BuddyId + "',requestType:'" + RequestType + "',rejectionComment:'" + RejectionComment + "',supervisorRecommended:'0'}",
                    dataType: 'json',
                    processData: false,

                    success: function (response) {
                        $('.overlay').show();
                        $('.successful_popup').fadeIn();
                        $("#lblSuccessfulPopup").html('');
                        $("#lblSuccessfulPopup").append("You have rejected joinee's request successfully");
                        GetNotificationBuddyRequests();
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        $('.overlay').show();
                        $('.error_popup').fadeIn('slow');
                        $("#lblCommonInfoPopup").html('');
                        $("#lblCommonInfoPopup").append("Looks like some issue while rejecting the request. Please try later");
                    }
                });

            }
        });

        $('#DisconnectionRequestAccept').bind('click', function () {
            var JoineeId = $('#NotificationJoineeId')[0].value;
            var BuddyId = $('#CurrentUserId').val();
            var RequestType = 'Accept';
            var ByWhom = 'Buddy';

            $.ajax({
                type: 'POST',
                url: $('body').attr('id') + '.aspx/DisconnectionRequest',
                contentType: 'application/json',
                data: "{joineeId:'" + JoineeId + "',buddyId:'" + BuddyId + "',bywhom:'" + ByWhom + "',requestType:'" + RequestType + "'}",
                dataType: 'json',
                processData: false,

                success: function (response) {
                    $('.overlay').show();
                    $('.successful_popup').fadeIn();
                    $("#lblSuccessfulPopup").html('');
                    $("#lblSuccessfulPopup").append("You are disconnected with Joinee now.");
                    GetNotificationBuddyDisconnectionAlerts();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    $('.overlay').show();
                    $('.error_popup').fadeIn('slow');
                    $("#lblCommonInfoPopup").html('');
                    $("#lblCommonInfoPopup").append("Looks like some issue while requesting for disconnect. Please try later");
                    GetNotificationBuddyDisconnectionAlerts();
                }
            });
        });

        $('#DisconnectionRequestReject').bind('click', function () {
            var JoineeId = $('#NotificationJoineeId')[0].value;
            var BuddyId = $('#CurrentUserId').val();
            var RequestType = 'Reject';
            var ByWhom = 'Buddy';

            $.ajax({
                type: 'POST',
                url: $('body').attr('id') + '.aspx/DisconnectionRequest',
                contentType: 'application/json',
                data: "{joineeId:'" + JoineeId + "',buddyId:'" + BuddyId + "',bywhom:'" + ByWhom + "',requestType:'" + RequestType + "'}",
                dataType: 'json',
                processData: false,

                success: function (response) {
                    $('.overlay').show();
                    $('.successful_popup').fadeIn();
                    $("#lblSuccessfulPopup").html('');
                    $("#lblSuccessfulPopup").append("You have successfully rejected disconnection request.");
                    GetNotificationBuddyDisconnectionAlerts();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    $('.overlay').show();
                    $('.error_popup').fadeIn('slow');
                    $("#lblCommonInfoPopup").html('');
                    $("#lblCommonInfoPopup").append("Looks like some issue while recjecting request. Please try later");
                    GetNotificationBuddyDisconnectionAlerts();
                }
            });
        });
    }
}

//===================================================== Feedback ===========================================================
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
					$("#slider_wrapper").css('background-image','url("Resources/Images/slider_bg.png")');
					$(".smiley_wrapper").css('background-image','url("Resources/Images/smiley_sad.png")');
					break;
				case 2:
					$("#slider_wrapper").css('background-image','url("Resources/Images/slider_bg_2.png")');
					$(".smiley_wrapper").css('background-image','url("Resources/Images/smiley_disappointed.png")');
					break;
				case 3:
					$("#slider_wrapper").css('background-image','url("Resources/Images/slider_bg_3.png")');
					$(".smiley_wrapper").css('background-image','url("Resources/Images/smiley_happy.png")');
					break;
				case 4:
					$("#slider_wrapper").css('background-image','url("Resources/Images/slider_bg_4.png")');
					$(".smiley_wrapper").css('background-image','url("Resources/Images/smiley_cool.png")');
					break;
				case 5:
					$("#slider_wrapper").css('background-image','url("Resources/Images/slider_bg_5.png")');
					$(".smiley_wrapper").css('background-image','url("Resources/Images/smiley_lol.png")');
					break;
				default:
					$("#slider_wrapper").css('background-image','url("Resources/Images/slider_bg.png")');
					$(".smiley_wrapper").css('background-image','url("Resources/Images/smiley_lol.png")');
					break;
				}
				if(uiValue > 3){
					$(".ui-slider-handle").css('background-image','url("Resources/Images/slider_handle_green.png")');
				}else{
					$(".ui-slider-handle").css('background-image','url("Resources/Images/slider_handle.png")');
				}
			}
		});
		$( ".feedback_5" ).bind('click',function() {
			$("#slider").slider( "value", 5 );
			$(".ui-slider-handle").css('background-image','url("Resources/Images/slider_handle_green.png")');
			$("#slider_wrapper").css('background-image','url("Resources/Images/slider_bg_5.png")');
			$(".smiley_wrapper").css('background-image','url("Resources/Images/smiley_lol.png")');
		});
    }
}

//===================================================== Admin ===========================================================
var BuddyDuration = 0;
var RequestToRegBuddy = 0;
var RequestAcceptedbyRegBuddy = 0;
var RequestToUnregBuddy = 0;
var RequestsAcceptedByUnregBuddy = 0;
var RequestsSendByJoinee = 0;
var ConnectionsOfJoiners = 0;
var SelectCountryId = 0;

var adminNS = {
    init: function () {

        var isTM = document.getElementById("isTM").value;
        var isSupervisor = document.getElementById("isSupervisor").value;
        var isMasteradmin = document.getElementById("isMasteradmin").value;

        if (isMasteradmin == "True") {
            
            $("#configure_tab").addClass('selected');
            Getconfiguration();

            $(document).ready(function () {
                $("#BuddyDuration > li").click(function () {
                    // BuddyDuration = ($(this)[0].innerHTML.replace(/\&lt;br\&gt;/gi,"\n").replace(/(&lt;([^&gt;]+)&gt:)/gi, "")).split(" ")[0];
                    BuddyDuration = ($(this)[0].innerText).split(" ")[0];
                });

                $("#RequestToRegBuddy > li").click(function () {
                    RequestToRegBuddy = ($(this)[0].innerText).split(" ")[0];
                });

                $("#RequestAcceptedbyRegBuddy > li").click(function () {
                    RequestAcceptedbyRegBuddy = ($(this)[0].innerText).split(" ")[0];
                });

                $("#RequestToUnregBuddy > li").click(function () {
                    RequestToUnregBuddy = ($(this)[0].innerText).split(" ")[0];
                });
                $("#RequestsAcceptedByUnregBuddy > li").click(function () {
                    RequestsAcceptedByUnregBuddy = ($(this)[0].innerText).split(" ")[0];
                });

                $("#ConnectionsOfJoiners > li").click(function () {
                    ConnectionsOfJoiners = ($(this)[0].innerText).split(" ")[0];
                });
                $("#RequestsSendByJoinee > li").click(function () {
                    RequestsSendByJoinee = ($(this)[0].innerText).split(" ")[0];
                });
            });

            $('#configure_tab').show();
            $('#configure_tab_content').show();
            $('#add_admin_tab').show();
            $('#dashboard_tab').show();
            if (isSupervisor == "False") {
                $('#recommendations_tab').hide();
            }
            else {
                $('#recommendations_tab').show();
            }
        }
        else {
            if (isTM == "True") {
                if (isSupervisor == "False") {
                    $('#recommendations_tab').hide();
                }
                else {
                    $('#recommendations_tab').show();
                }
                $("#configure_tab").removeClass('selected');
                $('#dashboard_tab').show();
                $("#dashboard_tab").addClass('selected');                
                $('#configure_tab').hide();
                $('#add_admin_tab').hide();
                $('#configure_tab_content').hide();
                $('#dashboard_tab_content').fadeIn();
                /* 298015- Callling one func instead 3   
                GetBUNamesbuddy();
                GetPieChartBuddy();
                GetAllBuddiesDashBoard();
                */
                GetDashBoardTabPrefillValues();
            }
            else {
                if (isSupervisor == "True") {
                    $("#configure_tab").removeClass('selected');
                    $("#dashboard_tab").removeClass('selected');
                    $("#recommendations_tab").addClass('selected');
                    $('#configure_tab').hide();
                    $('#add_admin_tab').hide();
                    $("#dashboard_tab").hide();
                    $('#recommendations_tab').show();
                    $('#configure_tab_content').hide();
                    $('#dashboard_tab_content').hide();
                    $('#recommendations_tab_content').fadeIn();
                    EnableDisableDragFields();
                }
            }
        }


        $(".searchBox").livequery("focus", function (e) {
            var thisObj = $(this);
            if (thisObj.val() == "Search by name or Id") {
                thisObj.val('');
            }
        });
        $(".searchBox").livequery("blur", function (e) {
            var thisObj = $(this);
            if (thisObj.val() == "") {
                thisObj.val('Search by name or Id');
            }
        });

        $('.searchBox').autocomplete({
            minLength: 3,
            source: searchSupervisorsList,
            focus: function (event, ui) {
                $('.searchBox').val(ui.item.desc.replace(/\s+/g, ''));
                return false;
            },
            select: function (event, ui) {
                $('.searchBox').val(ui.item.desc.replace(/\s+/g, ''));
                $('.searchBox')[0].id = ui.item.value.replace(/\s+/g, '');
                $("#search-id").val(ui.item.value);
                $("#search-description").html(ui.item.desc);
                return false;
            }
        })
        .data("ui-autocomplete")._renderItem = function (ul, item) {
            return $("<li>")
            .append("<a href='#'>" + item.label + "</a>")
            .appendTo(ul);
        };

        $('.search_btn').livequery("click", function () {
            var UserId = $('.searchBox')[0].id;
            var UserName = $('.searchBox')[0].value;
            if (isNaN(UserId) || UserId == "" || !(isNaN(UserName))) {
                $('.overlay').show();
                $('.contact_card').hide();
                $('.error_popup').fadeIn();
                $("#lblCommonInfoPopup").html('');
                $("#lblCommonInfoPopup").append("Please enter the valid Associate ID/Associate Name.");
                $(".searchBox").val('Search by name or Id');
            }
            else {
                $(".searchBox").val('Search by name or Id');
                if ($("#recommend_nj_buddy").hasClass("selected") == true) {
                    if ($("#newjoiner").is(':checked') == true) {
                        BindRecommendableJoinees(UserId, UserName);
                    }
                    else {
                        BindRecommendableBuddies(UserId, UserName);
                    }
                }
                else {
                    BindEnrollableBuddies(UserId, UserName);
                }
            }

        });

        /* set background size to 'cover'*/
        $('.background-size-cover').livequery(function () {
            $(this).bgdSize('cover');
        });

        /* tab navigation */
        $('.main_tab_item').livequery('click', function () {
            var thisObj = $(this);
            $('.main_tab_item').removeClass('selected');
            thisObj.addClass('selected');
            var contentId = "#" + thisObj.attr('id') + "_content";
            $('.admin_view_content').children().each(function () {
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
            if (selectObj[0].id == 'drpdwnBU' || selectObj[0].id == 'drpdwnCountry')
                $(this).parent().parent().find('.slimScrollBar')[0].style.top = 0;
        });

        $('.dropdown_select li a').bind("click", function () {
            var selectedItem = $(this).parent().text();
            var thisDropdown = $(this).parentsUntil('.dropdown_wrapper');
            thisDropdown.prev().find('.selected_item').text(selectedItem);
            $('.dropdown_select').slideUp();
        });

        $('#dashboard_tab_content .dropdown_wrapper #drpdwnBU li').livequery("click", function () {
            var selectedItem = $(this).text();
            document.getElementById("BUListValue").value = selectedItem;
            var bu = $(this).val();
            var thisDropdown = $(this).parentsUntil('.dropdown_wrapper');
            thisDropdown.prev().find('.selected_item').text(selectedItem);
            $('.dropdown_select').slideUp();            
        });

        $('#dashboard_tab_content .dropdown_wrapper #drpdwnView li').livequery("click", function () {
            //console.log('here');
            var selectedItem = $(this).text();
            var bu = $(this).val();
            var thisDropdown = $(this).parentsUntil('.dropdown_wrapper');
            thisDropdown.prev().find('.selected_item').text(selectedItem);
            $('.dropdown_select').slideUp();
            $('#TypeValue').val($(this).attr('id'));            
        });        

        $('#dashboard_tab_content .dropdown_wrapper #drpdwnCountry li').livequery("click", function () {
            var selectedItem = $(this).text();                    
            var thisDropdown = $(this).parentsUntil('.dropdown_wrapper');
            thisDropdown.prev().find('.selected_item').text(selectedItem);
            $('.dropdown_select').slideUp();
            //$('#selectedCountryId').val($(this).attr('id'));
            $("#hiddenCountryId").val($(this).attr('id'));
        });

        $(document).on('mousedown', function (event) {
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

        $('.config_error_close').bind('click', function () {
            $('.config_error, .overlay').hide();
            $('.blur').removeClass('blur');
        });

        $('.notifications_left_item').livequery('click', function () {
            var thisObj = $(this);
            $(this).siblings().removeClass('selected');
            thisObj.addClass('selected');
            //var thisObjIndex = $('.notifications_left_item').index(thisObj);
            var thisObjIndex = $(this).parentsUntil('.notifications_tab_content').find('.notifications_left_item').index(thisObj);
            var parentClass = $(this).parentsUntil('.notifications_tab_content').parent();
            var tabContentClassName = parentClass.attr('class').split(" ")[0];
            switch (tabContentClassName) {
                case 'dashboard_content_wrapper':
                    if (thisObjIndex < connectionsArray.length) {
                        var imgSrc = thisObj.find('.notifications_left_image img').attr('src');
                        var name = connectionsArray[thisObjIndex][0];
                        var designation = connectionsArray[thisObjIndex][1];
                        var connections = connectionsArray[thisObjIndex][2];
                        if (connectionsArray[thisObjIndex][3] == null || connectionsArray[thisObjIndex][3] == 0) {
                            var averageFeedback = 'Nil';
                        }
                        else {
                            var averageFeedback = connectionsArray[thisObjIndex][3];
                        }
                        var BuddyId = connectionsArray[thisObjIndex][4];
                        parentClass.find('.notifications_content_right .font_name').text(name);
                        parentClass.find('.notifications_content_right .designation').text(designation);
                        parentClass.find('.notifications_content_right .connections_txt').text(connections);
                        //parentClass.find('.notifications_content_right .av_feedback').text(averageFeedback);
                        //parentClass.find('.notifications_content_right .notifications_right_image img').attr('src', imgSrc);
                        parentClass.find('.notifications_content_right .notifications_right_image img').bgdSize('cover');
                        parentClass.find('.notifications_content_right').attr('id', BuddyId);

                        var HistorySelectedUserEmailId;
                        HistorySelectedUserEmailId = GetAssociateEmailId(BuddyId);
                        if (HistorySelectedUserEmailId != false || HistorySelectedUserEmailId != null || HistorySelectedUserEmailId != 'undefined') {
                            $("#buddy_name").html('');
                            $("#buddy_name").append(name + "        " + "<br><img style='cursor:pointer;' src='Resources/Images/presence_16-unknown.png' id ='imgCommunicatorStatus' title='Status' /><img title='Ping me' src='Resources/Images/communicator3.png' style='width:20px;cursor:pointer;margin-left:3px;' onclick='OpenCommunicatorTileView();'/><img src='Resources/Images/outlook.jpg' style='width:20px;cursor:pointer;margin-left:4px;' title='Mail' onclick='SendEmail();'/>");
                        }
                        else {
                            $("#buddy_name").html('');
                            $("#buddy_name").append(name);
                        }

                        var type = $("#TypeValue").val();
                        if (type == "0") {
                            $("#pAvgFeedbackLabel").hide();
                        }
                        else {
                            $("#pAvgFeedbackLabel").show();
                            document.getElementById("Avgfeedback").innerHTML = averageFeedback;
                        }

                        var request = new XMLHttpRequest;
                        request.open('GET', "ShowImage.ashx?id=" + BuddyId + "", false);
                        request.send();
                        if (request.status === 200) {
                            $("#buddy_img").attr('src', 'ShowImage.ashx?id=' + BuddyId + '');
                        }
                        else {
                            $("#buddy_img").attr('src', 'Resources/Images/dummy_image.jpg');
                        }
                    }
                    break;
                default:
                    break;
            }

        });

        /** Connections popup **/
        $('.connections_btn').livequery("click", function () {
            $('.overlay').show();
            $('.connections').fadeIn("slow");
            $('.background-size-cover').bgdSize('cover');
        });

        $('.connections_close').on("click", function () {
            $('.overlay, .connections').hide();
        });

        $('.connections_arrow_next').livequery('click', function () {
            var $current = $('.connections_screen_details.visible');
            if ($current.next('.connections_screen_details').length != 0) {
                //$('.buddy_list').hide();
                $current.removeClass('visible').hide();
                $current.next('.connections_screen_details').show().addClass('visible').removeClass('hiddenDiv');
                $('.background-size-cover').bgdSize('cover');
            }
        });

        $('.connections_arrow_previous').livequery('click', function () {
            var $current = $('.connections_screen_details.visible');
            if ($current.prev('.connections_screen_details').length != 0) {
                //$('.buddy_list').hide();
                $current.removeClass('visible').hide();
                $current.prev('.connections_screen_details').show().addClass('visible').removeClass('hiddenDiv');
                $('.background-size-cover').bgdSize('cover');
            }
        });

        /* add admin */
        $(".add_admin_id").bind("focus", function (e) {
            var thisObj = $(this);
            if (thisObj.val() == "Name/ID here") {
                thisObj.val('');
            }
        });
        $(".add_admin_id").bind("blur", function (e) {
            var thisObj = $(this);
            if (thisObj.val() == "") {
                thisObj.val('Name/ID here');
            }
        });
        $('.remove_admin_icon').livequery('click', function () {
            $(this).parent('.notifications_left_item').remove();
        });

        /* recommend tab */
        /* tab navigation */
        $('.recommendation_inner_tab').livequery('click', function () {
            $('#Searchtext').val('Search by name or Id');
            var thisObj = $(this);
            $('.recommendation_inner_tab').removeClass('selected');
            thisObj.addClass('selected');
            var thisObjId = thisObj.attr('id');
            if (thisObjId == 'recommend_nj_buddy') {
                $('.recommendations_radio_wrapper').show();
                $('.recommendations_checkbox_wrapper').hide();
                EnableDisableDragFields();
            } else {
                $('.recommendations_radio_wrapper').hide();
                $('.recommendations_checkbox_wrapper').show();
                GetUnenrolledBuddies();
            }
            var contentId = "#" + thisObj.attr('id') + "_content";
            $('.recommend_inner_tab_content').hide();
            $(contentId).show();
            $('.background-size-cover').bgdSize('cover');
        });


        //Radio button
        $('.recommendations_radio_wrapper #buddy').attr('checked', 'unchecked');
        $('.recommendations_radio_wrapper #newjoiner').attr('checked', 'checked');
        $('.radio').livequery(function () {
            if ($(this).is(':checked')) {
                $(this).parents('.recommendations_radio_wrapper').addClass('checked');
                var checkedValue = $(this).attr('value');
                if (checkedValue == "buddy") {
                    $('.recommend_buddy_list').show();
                    $('.recommend_nj_list').hide();
                    GetRecommendableBuddies($('#drop_area_newjoiner')[0].lastChild.id);
                    EnableDisableDragFields();
                } else if (checkedValue == "newjoiner") {
                    $('.recommend_buddy_list').hide();
                    $('.recommend_nj_list').show();
                    GetRecommendableJoinees();
                }
            }
        });
        $('.radio').livequery('change', function () {
            $('#Searchtext').val('Search by name or Id');
            $('.background-size-cover').bgdSize('cover');
            $('.radio[name="' + $(this).attr('name') + '"]').each(function () {
                var radiowrapper = $(this).parents('.recommendations_radio_wrapper');
                if ($(this).is(':checked')) {
                    radiowrapper.addClass('checked');
                    var checkedValue = $(this).attr('value');
                    if (checkedValue == "buddy") {
                        $('.recommend_buddy_list').show();
                        $('.recommend_nj_list').hide();
                        if ($('#drop_area_newjoiner')[0].childNodes.length == 2) {
                            GetRecommendableBuddies($('#drop_area_newjoiner')[0].lastChild.id);
                            EnableDisableDragFields();
                        }
                        else {
                            for (var i = 1; i < 4; i++) {
                                if ($('#drop_area_buddy_' + i)[0].childNodes.length == 2) {
                                    $("#drop_area_buddy_" + i).html("<p class='drop_area_text'>Drag Buddy here</p>");
                                    $("#drop_area_buddy_" + i).droppable("enable");
                                }
                            }
                            $("#dvRecommendableBuddies").html('');
                            $("#dvRecommendableBuddies").append('<div class="recommend_buddy_list_wrapper fleft clear visible"><label style="bottom:200px; position:absolute;left:120px;color:#ffffff;font-size:14px">Please Select Joinee First</label></div>');
                        }
                    } else if (checkedValue == "newjoiner") {
                        $('.recommend_buddy_list').hide();
                        $('.recommend_nj_list').show();
                        GetRecommendableJoinees();
                        if ($('#drop_area_newjoiner')[0].childNodes.length == 2) {
                            $("#drop_area_newjoiner").html("<p class='drop_area_text'>Drag New Joiner here</p>");
                            $("#drop_area_newjoiner").droppable("enable");
                        }
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
            $('#Searchtext').val('Search by name or Id');
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
        var $gallery = $(".recommend_buddy_list_wrapper"),
		$droparea = $(".drop_area");
        // let the gallery items be draggable  
        $(".recommend_buddy_list_wrapper .recommend_buddy_tile").livequery(function () {
            $(".recommend_buddy_list_wrapper .recommend_buddy_tile").draggable({
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
            drop: function (event, ui) {
                var dropareaId = $(this);
                addImage(ui.draggable, dropareaId);
            }
        });

        var $njgallery = $(".recommend_nj_list_wrapper"),
		$njdroparea = $(".drop_area_newjoiner");
        // let the gallery items be draggable    
        $(".recommend_nj_list_wrapper .recommend_buddy_tile").livequery(function () {
            $(".recommend_nj_list_wrapper .recommend_buddy_tile").draggable({
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
            drop: function (event, ui) {
                var dropareaId = $(this);
                addImage(ui.draggable, dropareaId);
            }
        });

        // image deletion function  
        var remove_icon = "<img src='Resources/Images/contact_close.png' alt='Close' class='remove_icon'/>";
        function addImage($item, dropareaId) {
            var $droppeditem = $("a", $item).append(remove_icon);
            $item.appendTo(dropareaId).fadeIn(function () {
                $item.animate(
					{ width: "115px", height: "105px" },
					{ duration: 100,
					    complete:
						function () {
						    $item.find('img.background-size-cover').bgdSize('cover');
						}
					}
				);
            });
            dropareaId.droppable("disable");
            $('.drop_area').removeClass('drop_area_active');
        }

        $(".recommend_buddy_tile").livequery('click', function (event) {
            var $item = $(this),
			$target = $(event.target);
            if ($target.is(".remove_icon")) {
                var dropareaId = $item.parent().attr('id');
                removeImage($item, dropareaId);
            }
            return false;
        });
        function removeImage($item, dropareaId) {
            var recycleGallery;
            $item.parent().droppable("enable");
            if (dropareaId == "drop_area_newjoiner") {
                var visiblegallery = $(".recommend_nj_list_wrapper.visible");
                if (visiblegallery.children().length < 9) {
                    recycleGallery = $(".recommend_nj_list_wrapper.visible");
                } else {
                    $(".recommend_nj_list_wrapper.hiddenDiv").each(function () {
                        if ($(this).children().length < 9) {
                            recycleGallery = $(this);
                            return;
                        }
                    });
                }
            } else {
                var visiblegallery = $(".recommend_buddy_list_wrapper.visible");
                if (visiblegallery.children().length < 9) {
                    recycleGallery = $(".recommend_buddy_list_wrapper.visible");
                } else {
                    $(".recommend_buddy_list_wrapper.hiddenDiv").each(function () {
                        if ($(this).children().length < 9) {
                            recycleGallery = $(this);
                            return;
                        }
                    });
                }
            }
            $item.fadeOut(function () {
                $item
					.find(".remove_icon")
					.remove()
					.end()
					.css("width", "100px")
					.css("height", "83px")
					.appendTo(recycleGallery)
					.fadeIn()
					.find('img.background-size-cover').bgdSize('cover').show();
            });
        }

        $('.recommend_buddy_list_arrow_next').livequery('click', function () {
            var $current = $('.recommend_buddy_list_wrapper.visible');
            if ($current.next('.recommend_buddy_list_wrapper').length != 0) {
                //$('.buddy_list').hide();
                $current.removeClass('visible').hide().addClass('hiddenDiv');
                $current.next('.recommend_buddy_list_wrapper').show().addClass('visible').removeClass('hiddenDiv');
                $('.background-size-cover').bgdSize('cover');
            }
        });

        $('.recommend_buddy_list_arrow_previous').livequery('click', function () {
            var $current = $('.recommend_buddy_list_wrapper.visible');
            if ($current.prev('.recommend_buddy_list_wrapper').length != 0) {
                //$('.buddy_list').hide();
                $current.removeClass('visible').hide().addClass('hiddenDiv');
                $current.prev('.recommend_buddy_list_wrapper').show().addClass('visible').removeClass('hiddenDiv');
                $('.background-size-cover').bgdSize('cover');
            }
        });

        $('.recommend_nj_list_arrow_next').livequery('click', function () {
            var $current = $('.recommend_nj_list_wrapper.visible');
            if ($current.next('.recommend_nj_list_wrapper').length != 0) {
                //$('.buddy_list').hide();
                $current.removeClass('visible').hide().addClass('hiddenDiv');
                $current.next('.recommend_nj_list_wrapper').show().addClass('visible').removeClass('hiddenDiv');
                $('.background-size-cover').bgdSize('cover');
            }
        });

        $('.recommend_nj_list_arrow_previous').livequery('click', function () {
            var $current = $('.recommend_nj_list_wrapper.visible');
            if ($current.prev('.recommend_nj_list_wrapper').length != 0) {
                //$('.buddy_list').hide();
                $current.removeClass('visible').hide().addClass('hiddenDiv');
                $current.prev('.recommend_nj_list_wrapper').show().addClass('visible').removeClass('hiddenDiv');
                $('.background-size-cover').bgdSize('cover');
            }
        });

        $('.recommend_buddy_tile').livequery('click', function () {
            $(this).parent().find('.recommend_buddy_tile_selected').show();
            $(this).parent().addClass('selected');
            if ($(this).parent()[0].className == 'recommend_nj_list_wrapper fleft clear visible selected' || $(this).parent()[0].className == 'recommend_buddy_list_wrapper fleft clear visible selected') {
                window.open('https://onecognizant.cognizant.com?GlobalAppId=896&Source=9&URL=https%3A%2F%2Fonecognizantapps.cognizant.com%2F896%2FDetailedProfilePage.aspx%3FhdnIsTMFlag%3dNo%26viewprofileid%3D' + $(this)[0].id, "_blank");
            }
        });

        $('.recommend_buddy_tile_selected').livequery('click', function () {
            $(this).hide();
            $(this).parent().removeClass('selected');
        });

        $('.recommend_registration_arrow_next').livequery('click', function () {
            var $current = $('.recommend_registration_list_wrapper.visible');
            if ($current.next('.recommend_registration_list_wrapper').length != 0) {
                //$('.buddy_list').hide();
                $current.removeClass('visible').hide().addClass('hiddenDiv');
                $current.next('.recommend_registration_list_wrapper').show().addClass('visible').removeClass('hiddenDiv');
                $('.background-size-cover').bgdSize('cover');
            }
        });

        $('.recommend_registration_arrow_previous').livequery('click', function () {
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
            $('.overlay').show();
            $('.configure_submit_confirmation').fadeIn("slow");
            $('.header, .cindy_circles').addClass('blur');
        });
        $('.configure_submit_confirmation_close, .configure_submit_confirmation .disagree_btn').bind("click", function () {
            $('.overlay, .configure_submit_confirmation').hide();
            $('.blur').removeClass('blur');
        });

        $('.configure_submit_confirmation .agree_btn').bind('click', function () {
            $('.configure_submit_confirmation').hide();
            SetConfiguration();
        });

        $('.configure_submit_information_close, .configure_submit_information .ok_btn').bind('click', function () {
            $('.configure_submit_information, .overlay').hide();
            $('.blur').removeClass('blur');
        });
        /* recommend button */
        $('#recommendations_tab_content .recommend_btn').livequery("click", function () {
            $('.overlay').show();
            $('.header, .cindy_circles').addClass('blur');
            if ($('#drop_area_newjoiner')[0].childNodes.length != 2) {
                $('.error_popup').fadeIn();
                $("#lblCommonInfoPopup").html('');
                $("#lblCommonInfoPopup").append("Please select Joinee first");
            }
            else if ($('#drop_area_buddy_1')[0].childNodes.length != 2 &&
                            $('#drop_area_buddy_2')[0].childNodes.length != 2 &&
                            $('#drop_area_buddy_3')[0].childNodes.length != 2) {

                $('.error_popup').fadeIn();
                $("#lblCommonInfoPopup").html('');
                $("#lblCommonInfoPopup").append("Please select atleast one Buddy");
            }
            else {
                $('.recommend_submit_confirmation').fadeIn("slow");
                $('.recommend_submit_confirmation')[0].id = "recommend";
            }
        });

        $('#recommendations_tab_content .recommend_registration_submit').livequery("click", function () {
            $('.overlay').show();
            $('.recommend_submit_confirmation').fadeIn("slow");
            $('.recommend_submit_confirmation')[0].id = "register";
            $('.header, .cindy_circles').addClass('blur');
        });

        $('.recommend_submit_confirmation_close, .recommend_submit_confirmation .disagree_btn').bind("click", function () {
            $('.overlay, .recommend_submit_confirmation').hide();
            $('.blur').removeClass('blur');
        });

        $('.recommend_submit_confirmation .agree_btn').bind('click', function () {
            if ($('.recommend_submit_confirmation')[0].id == "recommend") {
                RecommendBuddyToJoinee();
            }
            else {
                EnrollBuddies();
            }
        });

        $('.recommend_submit_information_close, .recommend_submit_information .ok_btn').bind('click', function () {
            $('.recommend_submit_information, .overlay').hide();
            $('.blur').removeClass('blur');
            if ($('.recommend_submit_confirmation')[0].id == "recommend") {
                for (var i = 1; i < 4; i++) {
                    if ($('#drop_area_buddy_' + i)[0].childNodes.length == 2) {
                        $("#drop_area_buddy_" + i).html("<p class='drop_area_text'>Drag Buddy here</p>");
                        $("#drop_area_buddy_" + i).droppable("enable");
                    }
                }
                if ($('#drop_area_newjoiner')[0].childNodes.length == 2) {
                    $("#drop_area_newjoiner").html("<p class='drop_area_text'>Drag New Joiner here</p>");
                    $("#drop_area_newjoiner").droppable("enable");
                }
                $("#buddy").parents('.recommendations_radio_wrapper').removeClass('checked');
                $("#newjoiner").parents('.recommendations_radio_wrapper').addClass('checked');
                $("#buddy").attr('checked', 'unchecked');
                $("#newjoiner").attr('checked', 'checked');
                GetRecommendableJoinees();
            }
            else {
                GetUnenrolledBuddies();
            }
        });
    }
}

//===================================================== Document Ready ===========================================================
$(document).ready(function(){
	bodyId = $('body').attr('id');
	switch (bodyId){	
	case 'buddy_view_storyline':
		storylineNS.init();
		break;
	case 'buddy_view_circles':
		circlesNS.init();
		break;
	case 'buddy_view_other_buddies':
		buddyListNS.init();
		break;
	case 'buddy_view_home':
		homeNS.init();
		break;
	case 'Buddy_view_history':
		historyNS.init();
		break;
	case 'buddy_view_notifications':
		notificationsNS.init();
		break;
	case 'Admin_view_buddy':
		adminNS.init();
		break;
    case 'buddy_view_welcome':
        break;
    default:
		generalNS.init();
		break;
	}
	generalNS.init();
});

//##########################################################  user defined functions #############################################################

//========================================================= Common functions ===============================

$('.common_info_popup_close').bind('click', function () {
    $('.common_info_popup').hide();
    $('.overlay').hide();
    $('.blur').removeClass('blur');
});

$('.successful_popup .confirmation_popup_btn .ok_btn').bind('click', function () {
    $('.successful_popup, .overlay').hide();
    $('.blur').removeClass('blur');
});

$('.successful_popup_close').bind('click', function () {
    $('.successful_popup, .overlay').hide();
     $('.blur').removeClass('blur');
});

$('.error_popup_close').bind('click', function () {
    $('.error_popup, .overlay').hide();
     $('.blur').removeClass('blur');
});

function closeSuccessPopup(){
    $('.successful_popup, .overlay').hide();
    $('.blur').removeClass('blur');
}

function textLimit(field, maxlen) {
    if (field.value.length > maxlen) {
        while (field.value.length > maxlen) {
            field.value = field.value.replace(/.$/, '');
        }        
    }
}

function maxLengthPaste(field, maxChars) {
    event.returnValue = false;
    if ((field.value.length + window.clipboardData.getData("Text").length) > maxChars) {
        // alert("more than " + maxChars + " chars");
        return false;
    }
    event.returnValue = true;
}

//========================================================== Get all likely buddies ===========================================================
var allresult;  //global variable to store entire likely buddy list without any filteration
var level1result;     //filtered w.r.t. registration & availability

function GetAllLikelyBuddies(FilterType, UptoLevel) {

    var UserId = $("#CurrentUserId").val();

    $.ajax({
        type: 'POST',
        url: 'buddy_view_other_buddies.aspx/GetAllLikelyBuddies',
        contentType: 'application/json',
        data: "{userId:'" + UserId + "',filterType:'" + FilterType + "',uptoLevel:" + UptoLevel + "}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            OnSuccessGetAllLikelyBuddies(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            OnErrorGetAllLikelyBuddies(xhr.status, thrownError);
        }
    });
}

function OnSuccessGetAllLikelyBuddies(result) {
    allresult = result;     //Global variable to save the result
    level1result = eval('(' + result.d + ')');  //by default without filtered buddies
    var Buddies = eval('(' + result.d + ')');
    BindLikelyBuddies(Buddies);
    BindResultToSearchField(Buddies);
}

function OnErrorGetAllLikelyBuddies(status, error) {
    $('.overlay').show();
    $('.error_popup').fadeIn();
    $("#lblCommonInfoPopup").html('');
    $("#lblCommonInfoPopup").append("Sorry, We are unable to show buddy list right now. Try sometime later.");   
}

function FilterLikelyBuddies() {
    var allBuddies = eval('(' + allresult.d + ')');
    var filter = $('.buddies_dropdown .selected_circle').text();
    var obj = {};
    obj.BuddyList = [];
    var i = 0;
    var j = 0;
    switch (filter) {
    case 'Enrolled/Available':
        for(i = 0; i < allBuddies.BuddyList.length; i++){
            if(allBuddies.BuddyList[i].IsRegisteredBuddy == true && allBuddies.BuddyList[i].IsAvailable == true){
                obj.BuddyList[j] = {};
                obj.BuddyList[j] = allBuddies.BuddyList[i];
                j++;
            }
        }
        break;
    case 'Enrolled/Busy':
        for(i = 0; i < allBuddies.BuddyList.length; i++){
            if(allBuddies.BuddyList[i].IsRegisteredBuddy == true && allBuddies.BuddyList[i].IsAvailable == false){
                obj.BuddyList[j] = {};
                obj.BuddyList[j] = allBuddies.BuddyList[i];
                j++;
            }
        }
        break;
    case 'Not Enrolled/Available':
        for(i = 0; i < allBuddies.BuddyList.length; i++){
            if(allBuddies.BuddyList[i].IsRegisteredBuddy == false && allBuddies.BuddyList[i].IsAvailable == true){
                obj.BuddyList[j] = {};
                obj.BuddyList[j] = allBuddies.BuddyList[i];
                j++;
            }
        }
        break;
    case 'Not Enrolled/Busy':
        for(i = 0; i < allBuddies.BuddyList.length; i++){
            if(allBuddies.BuddyList[i].IsRegisteredBuddy == false && allBuddies.BuddyList[i].IsAvailable == false){
                obj.BuddyList[j] = {};
                obj.BuddyList[j] = allBuddies.BuddyList[i];
                j++;
            }
        }
        break;
    default:
        for (i = 0; i < allBuddies.BuddyList.length; i++) {
            obj.BuddyList[j] = {};
            obj.BuddyList[j] = allBuddies.BuddyList[i];
            j++;
        }
    }
    level1result = obj;
    BindLikelyBuddies(obj);
    BindResultToSearchField(obj);
}

function CrossFilterBuddies() {
    var obj = {};
    obj.BuddyList = [];
    var i = 0;
    var j = 0;
    var chkIsSameFacility = document.getElementById("chkFacility").checked;
    var chkIsSameBay = document.getElementById("chkBaymates").checked;
    var chkIsSameBU = document.getElementById("chkBu").checked;
    var chkIsSameDept = document.getElementById("chkDepartment").checked;
    var chkIsSameGrade = document.getElementById("chkGrade").checked;

    for (i = 0; i < level1result.BuddyList.length; i++) {
        if (level1result.BuddyList[i].IsSameFacility == (chkIsSameFacility == true ? true : level1result.BuddyList[i].IsSameFacility)
            && level1result.BuddyList[i].IsSameBay == (chkIsSameBay == true ? true : level1result.BuddyList[i].IsSameBay)
            && level1result.BuddyList[i].IsSameBU == (chkIsSameBU == true ? true : level1result.BuddyList[i].IsSameBU)
            && level1result.BuddyList[i].IsSameDept == (chkIsSameDept == true ? true : level1result.BuddyList[i].IsSameDept)
            && level1result.BuddyList[i].IsSameGrade == (chkIsSameGrade == true ? true : level1result.BuddyList[i].IsSameGrade)) {

            obj.BuddyList[j] = {};
            obj.BuddyList[j] = level1result.BuddyList[i];
            j++;
        }
    }
    BindLikelyBuddies(obj);
    BindResultToSearchField(obj);
}

var searchBuddyList = [];
function BindLikelyBuddies(result) {
    var Buddies = result;    
    var Buddy = '';
    if (Buddies.BuddyList.length != 0) {        
        var i = 0;
        var j = 0;
        var outerCount = 0;
        if (Buddies.BuddyList.length % 13 > 0)
            outerCount = parseInt(Buddies.BuddyList.length / 13) + 1;
        else
            outerCount = parseInt(Buddies.BuddyList.length / 13);
        for (j = 0; j < outerCount; j++) {
            if (j == 0)
                Buddy += "<div class='buddy_list buddy_list_visible'>";
            else
                Buddy += "<div class='buddy_list hiddenDiv'>";
            Buddy += "<div class='div_150_300 fleft'>";
            Buddy += "<div class='div_150_148 border_bottom color_c41c54 fleft'>";
            Buddy += "<a href='#' class='buddy_list_image'>";
            if (i < Buddies.BuddyList.length) {
                //searchBuddyList.push({ value: Buddies.BuddyList[i].UserId, label: Buddies.BuddyList[i].UserId + " " + Buddies.BuddyList[i].UserName.substr(0, 10), desc: Buddies.BuddyList[i].UserName.substr(0, 10) });               
                Buddy += "<div class='buddy_name_designation' id=" + Buddies.BuddyList[i].UserId + ">";
                Buddy += "<p class='corner_tiles_top'>" + Buddies.BuddyList[i].DisplayName.substr(0, 15) + "</p>";
                Buddy += "<p class='font_14'>" + Buddies.BuddyList[i].Designation + "</p>";
                Buddy += "</div>";
                Buddy += "<div class='buddy_other_details'>";
                Buddy += "<p class='font_14'><span class='width_50'>BU</span>:<span class='margin_10'>" + Buddies.BuddyList[i].BU + "</span></p>";
                Buddy += "<p class='font_14'><span class='width_50'>Location</span>:<span class='margin_10'>" + Buddies.BuddyList[i].Location + "</span></p>";
                Buddy += "</div>";
                if (Buddies.BuddyList[i].Gender == 'M') {
                    var request = new XMLHttpRequest;
                    request.open('GET', "ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover profile_pic' runat='server' src='ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "' alt='' />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_male_large.jpg'  />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover profile_pic profile_pic_buddy_list' />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_male_large.jpg'  />";
                    }
                }
                else {
                    var request = new XMLHttpRequest;
                    var imgSrc = request.open('GET', "ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover profile_pic' runat='server' src='ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "' alt='' />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_female_large.jpg'  />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover profile_pic profile_pic_buddy_list' />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_female_large.jpg'  />";
                    }

                }
            }
            Buddy += "</a>";
            Buddy += "</div>";

            i++;
            Buddy += "<div class='div_150 color_00da5b fleft'>";
            Buddy += "<a href='#' class='buddy_list_image'>";
            if (i < Buddies.BuddyList.length) {
                //searchBuddyList.push({ value: Buddies.BuddyList[i].UserId, label: Buddies.BuddyList[i].UserId + " " + Buddies.BuddyList[i].UserName.substr(0, 10), desc: Buddies.BuddyList[i].UserName.substr(0, 10) });
                Buddy += "<div class='buddy_name_designation' id=" + Buddies.BuddyList[i].UserId + ">";
                Buddy += "<p class='corner_tiles_bottom'>" + Buddies.BuddyList[i].DisplayName.substr(0, 14) + "</p>";
                Buddy += "<p class='font_14_black'>" + Buddies.BuddyList[i].Designation + "</p>";
                Buddy += "</div>";
                Buddy += "<div class='buddy_other_details'>";
                Buddy += "<p class='font_14_black'><span class='width_50'>BU</span>:<span class='margin_10'>" + Buddies.BuddyList[i].BU + "</span></p>";
                Buddy += "<p class='font_14_black'><span class='width_50'>Location</span>:<span class='margin_10'>" + Buddies.BuddyList[i].Location + "</span></p>";
                Buddy += "</div>";

                if (Buddies.BuddyList[i].Gender == 'M') {
                    var request = new XMLHttpRequest;
                    request.open('GET', "ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover profile_pic' runat='server' src='ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "' alt='' />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_male_large.jpg'  />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover profile_pic profile_pic_buddy_list' />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_male_large.jpg'  />";
                    }
                }
                else {
                    var request = new XMLHttpRequest;
                    var imgSrc = request.open('GET', "ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover profile_pic' runat='server' src='ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "' alt='' />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_female_large.jpg'  />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover profile_pic profile_pic_buddy_list'/>";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_female_large.jpg'  />";
                    }

                }

            }
            Buddy += "</a>";
            Buddy += "</div>";
            Buddy += "</div>";

            i++;
            Buddy += "<div class='div_455_300 border_right border_left fleft'>";
            Buddy += "<div class='div_150_100 color_f38f2d border_right border_bottom fleft'>";
            Buddy += "<a href='#' class='buddy_list_image'>";
            if (i < Buddies.BuddyList.length) {
                //searchBuddyList.push({ value: Buddies.BuddyList[i].UserId, label: Buddies.BuddyList[i].UserId + " " + Buddies.BuddyList[i].UserName.substr(0, 10), desc: Buddies.BuddyList[i].UserName.substr(0, 10) });
                Buddy += "<div class='buddy_name_designation padding_5' id=" + Buddies.BuddyList[i].UserId + ">";
                Buddy += "<p class='font_14 font_black weight_400'>" + Buddies.BuddyList[i].DisplayName.substr(0, 15) + "</p>";
                Buddy += "<p class='font_12 font_black'>" + Buddies.BuddyList[i].Designation + "</p>";
                Buddy += "</div>";
                Buddy += "<div class='buddy_other_details padding_5'>";
                Buddy += "<p class='font_12 font_black'><span class='width_50'>BU</span>:<span class='margin_10'>" + Buddies.BuddyList[i].BU + "</span></p>";
                Buddy += "<p class='font_12 font_black'><span class='width_50'>Location</span>:<span class='margin_10'>" + Buddies.BuddyList[i].Location + "</span></p>";
                Buddy += "</div>";
                if (Buddies.BuddyList[i].Gender == 'M') {
                    var request = new XMLHttpRequest;
                    request.open('GET', "ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover profile_pic' runat='server' src='ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "' alt='' />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_male_large.jpg'  />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover profile_pic profile_pic_buddy_list'/>";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_male_large.jpg'  />";
                    }
                }
                else {
                    var request = new XMLHttpRequest;
                    var imgSrc = request.open('GET', "ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover profile_pic' runat='server' src='ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "' alt='' />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_female_large.jpg'  />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover profile_pic profile_pic_buddy_list'/>";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_female_large.jpg'  />";
                    }
                }
            }
            Buddy += "</a>";
            Buddy += "</div> ";

            i++;
            Buddy += "<div class='div_147_100 color_03417a border_bottom fleft' runat='server'>";
            Buddy += "<a href='#' class='buddy_list_image' runat='server'>";
            if (i < Buddies.BuddyList.length) {
                //searchBuddyList.push({ value: Buddies.BuddyList[i].UserId, label: Buddies.BuddyList[i].UserId + " " + Buddies.BuddyList[i].UserName.substr(0, 10), desc: Buddies.BuddyList[i].UserName.substr(0, 10) });
                Buddy += "<div class='buddy_name_designation padding_5' id=" + Buddies.BuddyList[i].UserId + ">";
                Buddy += "<p class='font_14 weight_400'>" + Buddies.BuddyList[i].DisplayName.substr(0, 15) + "</p>";
                Buddy += "<p class='font_12'>" + Buddies.BuddyList[i].Designation + "</p>";
                Buddy += "</div>";
                Buddy += "<div class='buddy_other_details padding_5'>";
                Buddy += "<p class='font_12'><span class='width_50'>BU</span>:<span class='margin_10'>" + Buddies.BuddyList[i].BU + "</span></p>";
                Buddy += "<p class='font_12'><span class='width_50'>Location</span>:<span class='margin_10'>" + Buddies.BuddyList[i].Location + "</span></p>";
                Buddy += "</div>";
                if (Buddies.BuddyList[i].Gender == 'M') {
                    var request = new XMLHttpRequest;
                    request.open('GET', "ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover profile_pic' runat='server' src='ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "' alt='' />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_male_large.jpg'  />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover profile_pic profile_pic_buddy_list'/>";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_male_large.jpg'  />";
                    }
                }
                else {
                    var request = new XMLHttpRequest;
                    var imgSrc = request.open('GET', "ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover profile_pic' runat='server' src='ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "' alt='' />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_female_large.jpg'  />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover profile_pic profile_pic_buddy_list'/>";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_female_large.jpg'  />";
                    }

                }
            }
            Buddy += "</a>";
            Buddy += "</div>";

            i++;
            Buddy += "<div class='div_150_100 color_004050 border_left border_bottom fleft'>";
            Buddy += "<a href='#' class='buddy_list_image'>";
            if (i < Buddies.BuddyList.length) {
                //searchBuddyList.push({ value: Buddies.BuddyList[i].UserId, label: Buddies.BuddyList[i].UserId + " " + Buddies.BuddyList[i].UserName.substr(0, 10), desc: Buddies.BuddyList[i].UserName.substr(0, 10) });
                Buddy += "<div class='buddy_name_designation padding_5' id=" + Buddies.BuddyList[i].UserId + ">";
                Buddy += "<p class='font_14 weight_400'>" + Buddies.BuddyList[i].DisplayName.substr(0, 15) + "</p>";
                Buddy += "<p class='font_12'>" + Buddies.BuddyList[i].Designation + "</p>";
                Buddy += "</div>";
                Buddy += "<div class='buddy_other_details padding_5'>";
                Buddy += "<p class='font_12'><span class='width_50'>BU</span>:<span class='margin_10'>" + Buddies.BuddyList[i].BU + "</span></p>";
                Buddy += "<p class='font_12'><span class='width_50'>Location</span>:<span class='margin_10'>" + Buddies.BuddyList[i].Location + "</span></p>";
                Buddy += "</div>";
                if (Buddies.BuddyList[i].Gender == 'M') {
                    var request = new XMLHttpRequest;
                    request.open('GET', "ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover profile_pic' runat='server' src='ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "' alt='' />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_male_large.jpg'  />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover profile_pic profile_pic_buddy_list'/>";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_male_large.jpg'  />";
                    }
                }
                else {
                    var request = new XMLHttpRequest;
                    var imgSrc = request.open('GET', "ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover profile_pic' runat='server' src='ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "' alt='' />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_female_large.jpg'  />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover profile_pic profile_pic_buddy_list'/>";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_female_large.jpg'  />";
                    }

                }
            }
            Buddy += "</a>";
            Buddy += "</div>";

            i++;
            Buddy += "<div class='div_150_100 color_302c2c border_right border_bottom fleft'>";
            Buddy += "<a href='#' class='buddy_list_image'>";
            if (i < Buddies.BuddyList.length) {
                //searchBuddyList.push({ value: Buddies.BuddyList[i].UserId, label: Buddies.BuddyList[i].UserId + " " + Buddies.BuddyList[i].UserName.substr(0, 10), desc: Buddies.BuddyList[i].UserName.substr(0, 10) });
                Buddy += "<div class='buddy_name_designation padding_5' id=" + Buddies.BuddyList[i].UserId + ">";
                Buddy += "<p class='font_14 weight_400'>" + Buddies.BuddyList[i].DisplayName.substr(0, 15) + "</p>";
                Buddy += "<p class='font_12'>" + Buddies.BuddyList[i].Designation + "</p>";
                Buddy += "</div>";
                Buddy += "<div class='buddy_other_details padding_5'>";
                Buddy += "<p class='font_12'><span class='width_50'>BU</span>:<span class='margin_10'>" + Buddies.BuddyList[i].BU + "</span></p>";
                Buddy += "<p class='font_12'><span class='width_50'>Location</span>:<span class='margin_10'>" + Buddies.BuddyList[i].Location + "</span></p>";
                Buddy += "</div>";
                if (Buddies.BuddyList[i].Gender == 'M') {
                    var request = new XMLHttpRequest;
                    request.open('GET', "ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover profile_pic' runat='server' src='ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "' alt='' />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_male_large.jpg'  />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover profile_pic profile_pic_buddy_list'/>";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_male_large.jpg'  />";
                    }
                }
                else {
                    var request = new XMLHttpRequest;
                    var imgSrc = request.open('GET', "ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover profile_pic' runat='server' src='ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "' alt='' />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_female_large.jpg'  />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover profile_pic profile_pic_buddy_list'/>";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_female_large.jpg'  />";
                    }

                }
            }
            Buddy += "</a>";
            Buddy += "</div>";

            i++;
            Buddy += "<div class='div_147_100 color_e36509 border_bottom fleft'>";
            Buddy += "<a href='#' class='buddy_list_image'>";
            if (i < Buddies.BuddyList.length) {
                //searchBuddyList.push({ value: Buddies.BuddyList[i].UserId, label: Buddies.BuddyList[i].UserId + " " + Buddies.BuddyList[i].UserName.substr(0, 10), desc: Buddies.BuddyList[i].UserName.substr(0, 10) });
                Buddy += "<div class='buddy_name_designation padding_5' id=" + Buddies.BuddyList[i].UserId + ">";
                Buddy += "<p class='font_14 weight_400'>" + Buddies.BuddyList[i].DisplayName.substr(0, 15) + "</p>";
                Buddy += "<p class='font_12'>" + Buddies.BuddyList[i].Designation + "</p>";
                Buddy += "</div>";
                Buddy += "<div class='buddy_other_details padding_5'>";
                Buddy += "<p class='font_12'><span class='width_50'>BU</span>:<span class='margin_10'>" + Buddies.BuddyList[i].BU + "</span></p>";
                Buddy += "<p class='font_12'><span class='width_50'>Location</span>:<span class='margin_10'>" + Buddies.BuddyList[i].Location + "</span></p>";
                Buddy += "</div>";
                if (Buddies.BuddyList[i].Gender == 'M') {
                    var request = new XMLHttpRequest;
                    request.open('GET', "ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover profile_pic' runat='server' src='ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "' alt='' />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_male_large.jpg'  />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover profile_pic profile_pic_buddy_list'/>";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_male_large.jpg'  />";
                    }
                }
                else {
                    var request = new XMLHttpRequest;
                    var imgSrc = request.open('GET', "ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover profile_pic' runat='server' src='ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "' alt='' />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_female_large.jpg'  />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover profile_pic profile_pic_buddy_list'/>";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_female_large.jpg'  />";
                    }

                }
            }
            Buddy += "</a>";
            Buddy += "</div>";

            i++;
            Buddy += "<div class='div_150_100 color_0392c8 border_left border_bottom fleft'>";
            Buddy += "<a href='#' class='buddy_list_image'>";
            if (i < Buddies.BuddyList.length) {
                //searchBuddyList.push({ value: Buddies.BuddyList[i].UserId, label: Buddies.BuddyList[i].UserId + " " + Buddies.BuddyList[i].UserName.substr(0, 10), desc: Buddies.BuddyList[i].UserName.substr(0, 10) });
                Buddy += "<div class='buddy_name_designation padding_5' id=" + Buddies.BuddyList[i].UserId + ">";
                Buddy += "<p class='font_14 weight_400'>" + Buddies.BuddyList[i].DisplayName.substr(0, 15) + "</p>";
                Buddy += "<p class='font_12'>" + Buddies.BuddyList[i].Designation + "</p>";
                Buddy += "</div>";
                Buddy += "<div class='buddy_other_details padding_5'>";
                Buddy += "<p class='font_12'><span class='width_50'>BU</span>:<span class='margin_10'>" + Buddies.BuddyList[i].BU + "</span></p>";
                Buddy += "<p class='font_12'><span class='width_50'>Location</span>:<span class='margin_10'>" + Buddies.BuddyList[i].Location + "</span></p>";
                Buddy += "</div>";
                if (Buddies.BuddyList[i].Gender == 'M') {
                    var request = new XMLHttpRequest;
                    request.open('GET', "ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover profile_pic' runat='server' src='ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "' alt='' />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_male_large.jpg'  />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover profile_pic profile_pic_buddy_list'/>";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_male_large.jpg'  />";
                    }
                }
                else {
                    var request = new XMLHttpRequest;
                    var imgSrc = request.open('GET', "ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover profile_pic' runat='server' src='ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "' alt='' />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_female_large.jpg'  />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover profile_pic profile_pic_buddy_list'/>";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_female_large.jpg'  />";
                    }

                }
            }
            Buddy += "</a>";
            Buddy += "</div> ";

            i++;
            Buddy += "<div class='div_150_100 color_eaa527 border_right border_bottom fleft'>";
            Buddy += "<a href='#' class='buddy_list_image'>";
            if (i < Buddies.BuddyList.length) {
                //searchBuddyList.push({ value: Buddies.BuddyList[i].UserId, label: Buddies.BuddyList[i].UserId + " " + Buddies.BuddyList[i].UserName.substr(0, 10), desc: Buddies.BuddyList[i].UserName.substr(0, 10) });
                Buddy += "<div class='buddy_name_designation padding_5' id=" + Buddies.BuddyList[i].UserId + ">";
                Buddy += "<p class='font_14 font_black weight_400'>" + Buddies.BuddyList[i].DisplayName.substr(0, 15) + "</p>";
                Buddy += "<p class='font_12 font_black'>" + Buddies.BuddyList[i].Designation + "</p>";
                Buddy += "</div>";
                Buddy += "<div class='buddy_other_details padding_5'>";
                Buddy += "<p class='font_12 font_black'><span class='width_50'>BU</span>:<span class='margin_10'>" + Buddies.BuddyList[i].BU + "</span></p>";
                Buddy += "<p class='font_12 font_black'><span class='width_50'>Location</span>:<span class='margin_10'>" + Buddies.BuddyList[i].Location + "</span></p>";
                Buddy += "</div>";
                if (Buddies.BuddyList[i].Gender == 'M') {
                    var request = new XMLHttpRequest;
                    request.open('GET', "ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover profile_pic' runat='server' src='ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "' alt='' />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_male_large.jpg'  />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover profile_pic profile_pic_buddy_list'/>";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_male_large.jpg'  />";
                    }
                }
                else {
                    var request = new XMLHttpRequest;
                    var imgSrc = request.open('GET', "ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover profile_pic' runat='server' src='ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "' alt='' />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_female_large.jpg'  />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover profile_pic profile_pic_buddy_list'/>";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_female_large.jpg'  />";
                    }

                }
            }
            Buddy += "</a>";
            Buddy += "</div> ";

            i++;
            Buddy += "<div class='div_147_100 color_5ea124 border_bottom fleft'>";
            Buddy += "<a href='#' class='buddy_list_image'>";
            if (i < Buddies.BuddyList.length) {
                //searchBuddyList.push({ value: Buddies.BuddyList[i].UserId, label: Buddies.BuddyList[i].UserId + " " + Buddies.BuddyList[i].UserName.substr(0, 10), desc: Buddies.BuddyList[i].UserName.substr(0, 10) });
                Buddy += "<div class='buddy_name_designation padding_5' id=" + Buddies.BuddyList[i].UserId + ">";
                Buddy += "<p class='font_14 font_black weight_400'>" + Buddies.BuddyList[i].DisplayName.substr(0, 15) + "</p>";
                Buddy += "<p class='font_12 font_black'>" + Buddies.BuddyList[i].Designation + "</p>";
                Buddy += "</div>";
                Buddy += "<div class='buddy_other_details padding_5'>";
                Buddy += "<p class='font_12 font_black'><span class='width_50'>BU</span>:<span class='margin_10'>" + Buddies.BuddyList[i].BU + "</span></p>";
                Buddy += "<p class='font_12 font_black'><span class='width_50'>Location</span>:<span class='margin_10'>" + Buddies.BuddyList[i].Location + "</span></p>";
                Buddy += "</div>";
                if (Buddies.BuddyList[i].Gender == 'M') {
                    var request = new XMLHttpRequest;
                    request.open('GET', "ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover profile_pic' runat='server' src='ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "' alt='' />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_male_large.jpg'  />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover profile_pic profile_pic_buddy_list'/>";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_male_large.jpg'  />";
                    }
                }
                else {
                    var request = new XMLHttpRequest;
                    var imgSrc = request.open('GET', "ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover profile_pic' runat='server' src='ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "' alt='' />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_female_large.jpg'  />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover profile_pic profile_pic_buddy_list'/>";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_female_large.jpg'  />";
                    }

                }
            }
            Buddy += "</a>";
            Buddy += "</div>";

            i++;
            Buddy += "<div class='div_150_100 color_afb80d border_left border_bottom fleft'>";
            Buddy += "<a href='#' class='buddy_list_image'>";
            if (i < Buddies.BuddyList.length) {
                //searchBuddyList.push({ value: Buddies.BuddyList[i].UserId, label: Buddies.BuddyList[i].UserId + " " + Buddies.BuddyList[i].UserName.substr(0, 10), desc: Buddies.BuddyList[i].UserName.substr(0, 10) });
                Buddy += "<div class='buddy_name_designation padding_5' id=" + Buddies.BuddyList[i].UserId + ">";
                Buddy += "<p class='font_14 font_black weight_400'>" + Buddies.BuddyList[i].DisplayName.substr(0, 15) + "</p>";
                Buddy += "<p class='font_12 font_black'>" + Buddies.BuddyList[i].Designation + "</p>";
                Buddy += "</div>";
                Buddy += "<div class='buddy_other_details padding_5'>";
                Buddy += "<p class='font_12 font_black'><span class='width_50'>BU</span>:<span class='margin_10'>" + Buddies.BuddyList[i].BU + "</span></p>";
                Buddy += "<p class='font_12 font_black'><span class='width_50'>Location</span>:<span class='margin_10'>" + Buddies.BuddyList[i].Location + "</span></p>";
                Buddy += "</div>";
                if (Buddies.BuddyList[i].Gender == 'M') {
                    var request = new XMLHttpRequest;
                    request.open('GET', "ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover profile_pic' runat='server' src='ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "' alt='' />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_male_large.jpg'  />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover profile_pic profile_pic_buddy_list'/>";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_male_large.jpg'  />";
                    }
                }
                else {
                    var request = new XMLHttpRequest;
                    var imgSrc = request.open('GET', "ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover profile_pic' runat='server' src='ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "' alt='' />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_female_large.jpg'  />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover profile_pic profile_pic_buddy_list'/>";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_female_large.jpg'  />";
                    }

                }
            }
            Buddy += "</a>";
            Buddy += "</div> ";
            Buddy += "</div>";

            i++;
            Buddy += "<div class='div_150_300 fleft'>";
            Buddy += "<div class='div_150_148 border_bottom color_5515a7 fleft'>";
            Buddy += "<a href='#' class='buddy_list_image'>";
            if (i < Buddies.BuddyList.length) {
                //searchBuddyList.push({ value: Buddies.BuddyList[i].UserId, label: Buddies.BuddyList[i].UserId + " " + Buddies.BuddyList[i].UserName.substr(0, 10), desc: Buddies.BuddyList[i].UserName.substr(0, 10) });
                Buddy += "<div class='buddy_name_designation' id=" + Buddies.BuddyList[i].UserId + ">";
                Buddy += "<p class='corner_tiles_top'>" + Buddies.BuddyList[i].DisplayName.substr(0, 15) + "</p>";
                Buddy += "<p class='font_14'>" + Buddies.BuddyList[i].Designation + "</p>";
                Buddy += "</div>";
                Buddy += "<div class='buddy_other_details'>";
                Buddy += "<p class='font_14'><span class='width_50'>BU</span>:<span class='margin_10'>" + Buddies.BuddyList[i].BU + "</span></p>";
                Buddy += "<p class='font_14'><span class='width_50'>Location</span>:<span class='margin_10'>" + Buddies.BuddyList[i].Location + "</span></p>";
                Buddy += "</div>";
                if (Buddies.BuddyList[i].Gender == 'M') {
                    var request = new XMLHttpRequest;
                    request.open('GET', "ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover profile_pic' runat='server' src='ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "' alt='' />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_male_large.jpg'  />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover profile_pic profile_pic_buddy_list'  />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_male_large.jpg'  />";
                    }
                }
                else {
                    var request = new XMLHttpRequest;
                    var imgSrc = request.open('GET', "ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover profile_pic' runat='server' src='ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "' alt='' />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_female_large.jpg'  />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover profile_pic profile_pic_buddy_list'/>";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_female_large.jpg'  />";
                    }

                }
            }
            Buddy += "</a>";
            Buddy += "</div>";

            i++;
            Buddy += "<div class='div_150 color_f0fe72 fleft'>";
            Buddy += "<a href='#' class='buddy_list_image'>";
            if (i < Buddies.BuddyList.length) {
                //searchBuddyList.push({ value: Buddies.BuddyList[i].UserId, label: Buddies.BuddyList[i].UserId + " " + Buddies.BuddyList[i].UserName.substr(0, 10), desc: Buddies.BuddyList[i].UserName.substr(0, 10) });
                Buddy += "<div class='buddy_name_designation' id=" + Buddies.BuddyList[i].UserId + ">";
                Buddy += "<p class='corner_tiles_bottom'>" + Buddies.BuddyList[i].DisplayName.substr(0, 14) + "</p>";
                Buddy += "<p class='font_14_black'>" + Buddies.BuddyList[i].Designation + "</p>";
                Buddy += "</div>";
                Buddy += "<div class='buddy_other_details'>";
                Buddy += "<p class='font_14_black'><span class='width_50'>BU</span>:<span class='margin_10'>" + Buddies.BuddyList[i].BU + "</span></p>";
                Buddy += "<p class='font_14_black'><span class='width_50'>Location</span>:<span class='margin_10'>" + Buddies.BuddyList[i].Location + "</span></p>";
                Buddy += "</div>";
                if (Buddies.BuddyList[i].Gender == 'M') {
                    var request = new XMLHttpRequest;
                    request.open('GET', "ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover profile_pic' runat='server' src='ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "' alt='' />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_male_large.jpg'  />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover profile_pic profile_pic_buddy_list'/>";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_male_large.jpg'  />";
                    }
                }
                else {
                    var request = new XMLHttpRequest;
                    var imgSrc = request.open('GET', "ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover profile_pic' runat='server' src='ShowImage.ashx?id=" + Buddies.BuddyList[i].UserId + "' alt='' />";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_female_large.jpg'  />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover profile_pic profile_pic_buddy_list'/>";
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image_female_large.jpg'  />";
                    }

                }
            }
            Buddy += "</a>";
            Buddy += "</div>";
            Buddy += "</div>";
            Buddy += "</div>";
            i++;
        }
        $("#dvBuddyList").html('');
        $("#dvBuddyList").append(Buddy);
        $('#Searchtext').val('Search by name or Id');        
    }
    else {
        $("#dvBuddyList").html('');
        $("#dvBuddyList").append('<div class="buddy_list buddy_list_visible"><label style="bottom:150px; position:absolute;left:210px;color:#ffffff;font-size:14px">No buddies found with given search criteria</label></div>');
    }
}

function BindResultToSearchField(result) {
    var Buddies = result;
    searchBuddyList.splice(0, searchBuddyList.length); 
    for (i = 0; i < Buddies.BuddyList.length; i++) {
        searchBuddyList.push({ value: Buddies.BuddyList[i].UserId.replace(/\s+/g, ''), disp: Buddies.BuddyList[i].DisplayName, label: Buddies.BuddyList[i].UserId.replace(/\s+/g, '') + " " + Buddies.BuddyList[i].DisplayName, desc: Buddies.BuddyList[i].UserName });
    }
}

//======================================================================= Get ContactCard ============================================================
function GetContactCard(BuddyId) {
    if (isNaN(BuddyId) || BuddyId == "Not Avail") {
        $('.contact_card').hide();
        $('.error_popup').fadeIn();
        $("#lblCommonInfoPopup").html('');
        $("#lblCommonInfoPopup").append("Not a valid input.");
    }
    else {
        $.ajax({
            type: 'POST',
            url: bodyId + '.aspx/GetContactCard',
            contentType: 'application/json',
            data: "{userId:'" + BuddyId + "'}",
            dataType: 'json',
            processData: false,
            success: function (response) {
                OnSuccessGetContactCard(response);
            },
            error: function (xhr, ajaxOptions, thrownError) {

                OnErrorGetContactCard(xhr.status, thrownError);
            }
        });
    }
}

function OnSuccessGetContactCard(result) {
    document.getElementById('Searchtext').value = "Search by name or Id";
    var ContactCard = eval('(' + result.d + ')');
    if (ContactCard.UserId != 'Not Available' || ContactCard.UserId != '') {
        document.getElementById("ccDisplayName").innerHTML = ContactCard.DisplayName.substring(0, 18) + '...';

        var request = new XMLHttpRequest;
        request.open('GET', "ShowImage.ashx?id=" + ContactCard.UserId + "", false);
        request.send();
        if (request.status === 200) {
            $("#ccPhoto").attr('src', 'ShowImage.ashx?id=' + ContactCard.UserId + '');
        }
        else {
            $("#ccPhoto").attr('src', 'Resources/Images/dummy_image.jpg');
        }

        $("#SendMailEmailId").val(ContactCard.EmailId);        
        $("#ccEmailId").val(ContactCard.EmailId);
        
        $("#ccUserName").html('');
        $("#ccUserName").append(ContactCard.UserName + "        " + "<img style='cursor:pointer;' src='Resources/Images/presence_16-unknown.png' id ='imgCommunicatorStatus' title='Status' /><img title='Ping me' src='Resources/Images/communicator3.png' style='width:20px;cursor:pointer;margin-left:3px;' onclick='OpenCommunicatorTileView();'/><img src='Resources/Images/outlook.jpg' style='width:20px;cursor:pointer;margin-left:4px;' title='Mail' onclick='SendEmail();'/>");
        
        document.getElementById("ccDesignation").innerHTML = ContactCard.Designation;
        if (ContactCard.IsRegisteredBuddy == true)
            document.getElementById("ccRegStatus").innerHTML = "Enrolled as part of the buddy program";
        else
            document.getElementById("ccRegStatus").innerHTML = "Not enrolled as part of the buddy program";

        if (ContactCard.IsAvailable == true)
            document.getElementById("ccAvailStatus").innerHTML = "Available to take new associates for buddy program";
        else
            document.getElementById("ccAvailStatus").innerHTML = "Unavailable to take new associates for buddy program";

        document.getElementById("ccSpeaks").innerHTML = ContactCard.LanguageSpoken;
        document.getElementById("ccOfficeVenue").innerHTML = ContactCard.OfficeVenue;
        document.getElementById("ccLocation").innerHTML = ContactCard.Location;
        document.getElementById("ccProject").innerHTML = ContactCard.ProjectName;
        document.getElementById("ccBU").innerHTML = ContactCard.BU;
        document.getElementById("ccUserId").innerHTML = ContactCard.UserId;
        if (ContactCard.VNET == '' || ContactCard.VNET == null) {
            document.getElementById("ccMobile").innerHTML = "Not Available";
        }
        else {
            document.getElementById("ccMobile").innerHTML = ContactCard.VNET;
        }
        $('.detailed_profile_btn').attr('href', "https://onecognizant.cognizant.com?GlobalAppId=896&Source=9&URL=https%3A%2F%2Fonecognizantapps.cognizant.com%2F896%2FDetailedProfilePage.aspx%3FhdnIsTMFlag%3dNo%26viewprofileid%3D" + ContactCard.UserId + "");

        SPEEDIMNRC();
    }
    else {
        $('.contact_card').hide();
        $('.error_popup').fadeIn();
        $("#lblCommonInfoPopup").html('');
        $("#lblCommonInfoPopup").append("This is not valid Associate Id"); 
    }
}

function OnErrorGetContactCard() {
    $('.contact_card').hide();
    $('.error_popup').fadeIn();
    $("#lblCommonInfoPopup").html('');
    $("#lblCommonInfoPopup").append("Sorry, We are unable to show buddy details right now.");
}

//============================================ Get Buddy Recommendation data ==============================================
var searchSupervisorsList = [];
function GetRecommendableJoinees() {
    var SupervisorId = $("#CurrentUserId").val();
    $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/GetRecommendableJoinees',
        contentType: 'application/json',
        data: "{supervisorId:'" + SupervisorId + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            onsuccessGetRecommendableJoinees(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            onerrorGetRecommendableJoinees(xhr.status, thrownError);
        }
    });
}

var RecommendableJoinees = '';

function onsuccessGetRecommendableJoinees(result) {
    $('#Searchtext').val('Search by name or Id');
    RecommendableJoinees = eval('(' + result.d + ')');
    $("#dvRecommendableJoinees").html('');
    searchSupervisorsList.splice(0, searchSupervisorsList.length); 
    var i = 0;
    var j = 0;
    var k = 0;
    if (RecommendableJoinees.JoineeList != null) {        
        var outerCount = 0;
        if (RecommendableJoinees.JoineeList.length % 9 > 0)
            outerCount = parseInt(RecommendableJoinees.JoineeList.length / 9) + 1;
        else
            outerCount = parseInt(RecommendableJoinees.JoineeList.length / 9);

        var Joinee = '';

        for (j = 0; j < outerCount; j++) {
            if (j == 0)
                Joinee += "<div class='recommend_nj_list_wrapper fleft clear visible'>";
            else
                Joinee += "<div class='recommend_nj_list_wrapper fleft clear hiddenDiv'>";
            if (j != outerCount - 1 || outerCount == 1) {
                for (k = 0; k < Math.min(RecommendableJoinees.JoineeList.length, 9); k++) {
                    searchSupervisorsList.push({ value: RecommendableJoinees.JoineeList[i].UserId, label: RecommendableJoinees.JoineeList[i].UserId + " " + RecommendableJoinees.JoineeList[i].DisplayName, desc: RecommendableJoinees.JoineeList[i].DisplayName });
                    var JoineeId = RecommendableJoinees.JoineeList[i].UserId.replace(/\s+/g, '');
                    Joinee += "<div class='recommend_buddy_tile fleft ui-draggable' id='" + RecommendableJoinees.JoineeList[i].UserId + "'>";
                    Joinee += "<a href='https://onecognizant.cognizant.com?GlobalAppId=896&Source=9&URL=https%3A%2F%2Fonecognizantapps.cognizant.com%2F896%2FDetailedProfilePage.aspx%3FhdnIsTMFlag%3dNo%26viewprofileid%3D'" + JoineeId + "' target='_blank'>";
                    Joinee += "<p>" + RecommendableJoinees.JoineeList[i].DisplayName + "</p>";
                    Joinee += "<p class='font_12'>View Profile</p>";
                    Joinee += "</a>";
                    
                    var request = new XMLHttpRequest;
                    request.open('GET', "ShowImage.ashx?id=" + RecommendableJoinees.JoineeList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Joinee += "<img class='background-size-cover' runat='server' src='ShowImage.ashx?id=" + RecommendableJoinees.JoineeList[i].UserId + "' alt='' />";
                    }
                    else {
                        Joinee += "<img class='background-size-cover' src='Resources/Images/dummy_image.jpg'  />";
                    }

                    Joinee += "</div>";
                    i++;
                }
                Joinee += "</div>";
            }
            else {
                for (k = 0; k < (RecommendableJoinees.JoineeList.length % 9); k++) {
                    searchSupervisorsList.push({ value: RecommendableJoinees.JoineeList[i].UserId, label: RecommendableJoinees.JoineeList[i].UserId + " " + RecommendableJoinees.JoineeList[i].DisplayName, desc: RecommendableJoinees.JoineeList[i].DisplayName });
                    var JoineeId = RecommendableJoinees.JoineeList[i].UserId.replace(/\s+/g, '');
                    Joinee += "<div class='recommend_buddy_tile fleft ui-draggable' id='" + RecommendableJoinees.JoineeList[i].UserId + "'>";
                    Joinee += "<a href='https://onecognizant.cognizant.com?GlobalAppId=896&Source=9&URL=https%3A%2F%2Fonecognizantapps.cognizant.com%2F896%2FDetailedProfilePage.aspx%3FhdnIsTMFlag%3dNo%26viewprofileid%3D'" + JoineeId + "' target='_blank'>";
                    Joinee += "<p>" + RecommendableJoinees.JoineeList[i].DisplayName + "</p>";
                    Joinee += "<p class='font_12'>View Profile</p>";
                    Joinee += "</a>";
                    
                    var request = new XMLHttpRequest;
                    request.open('GET', "ShowImage.ashx?id=" + RecommendableJoinees.JoineeList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Joinee += "<img class='background-size-cover' runat='server' src='ShowImage.ashx?id=" + RecommendableJoinees.JoineeList[i].UserId + "' alt='' />";                        
                    }
                    else {
                        Joinee += "<img class='background-size-cover' src='Resources/Images/dummy_image.jpg'  />";
                    }
                    
                    Joinee += "</div>";
                    i++;
                }
                Joinee += "</div>";
            }
        }
        $("#dvRecommendableJoinees").append(Joinee);
    }
    else {
        $("#dvRecommendableJoinees").append('<div class="recommend_buddy_list_wrapper fleft clear visible"><label style="bottom:200px; position:absolute;left:90px;color:#ffffff;font-size:14px">No New Joinees Found in Your Team</label></div>');        
    }
}

function onerrorGetRecommendableJoinees() {
    $('#Searchtext').val('Search by name or Id');
    alert('No recommendable Joinees found in your team');
}

function BindRecommendableJoinees(UserId, UserName) {
    $("#dvRecommendableJoinees").html('');
    var Joinee = '';
    Joinee += "<div class='recommend_nj_list_wrapper fleft clear visible'>";
    Joinee += "<div class='recommend_buddy_tile fleft ui-draggable' id='" + UserId + "'>";
    Joinee += "<a href='#'>";
    Joinee += "<p>" + UserName + "</p>";
    Joinee += "<p class='font_12'>(" + UserId.replace(/\s+/g, '') + ")</p>";
    Joinee += "</a>";
    Joinee += "<img class='background-size-cover' runat='server' src='ShowImage.ashx?id=" + UserId + "' alt='' />";
    Joinee += "</div>";
    Joinee += "</div>";
    $("#dvRecommendableJoinees").append(Joinee);
    $(".searchBox").val('Search by name or Id');
    return;
}

//============================================ Get buddies those are recommendable to joinee ==============================================

function GetRecommendableBuddies(JoineeId) {

    $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/GetRecommendableBuddies',
        contentType: 'application/json',
        data: "{joineeId:'" + JoineeId + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            onsuccessGetRecommendableBuddies(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            onerrorGetRecommendableBuddies(xhr.status, thrownError);
        }
    });

}

function onsuccessGetRecommendableBuddies(result) {

    var RecommendableBuddies = eval('(' + result.d + ')');
    $("#dvRecommendableBuddies").html('');
    searchSupervisorsList.splice(0, searchSupervisorsList.length); 
    var i = 0;
    var j = 0;
    var k = 0;
    if (RecommendableBuddies.BuddyList.length != 0) {
        var outerCount = 0;
        if (RecommendableBuddies.BuddyList.length % 9 > 0)
            outerCount = parseInt(RecommendableBuddies.BuddyList.length / 9) + 1;
        else
            outerCount = parseInt(RecommendableBuddies.BuddyList.length / 9);
        var Buddy = '';

        for (j = 0; j < outerCount; j++) {
            if (j == 0)
                Buddy += "<div class='recommend_buddy_list_wrapper fleft clear visible'>";
            else
                Buddy += "<div class='recommend_buddy_list_wrapper fleft clear hiddenDiv'>";
            if (j != outerCount - 1 || outerCount == 1) {
                for (k = 0; k < Math.min(RecommendableBuddies.BuddyList.length, 9); k++) {
                    searchSupervisorsList.push({ value: RecommendableBuddies.BuddyList[i].UserId, label: RecommendableBuddies.BuddyList[i].UserId + " " + RecommendableBuddies.BuddyList[i].DisplayName, desc: RecommendableBuddies.BuddyList[i].DisplayName });
                    var BuddyId = RecommendableBuddies.BuddyList[i].UserId.replace(/\s+/g, '');
                    Buddy += "<div class='recommend_buddy_tile fleft ui-draggable' id='" + RecommendableBuddies.BuddyList[i].UserId + "'>";
                    Buddy += "<a href='https://onecognizant.cognizant.com?GlobalAppId=896&Source=9&URL=https%3A%2F%2Fonecognizantapps.cognizant.com%2F896%2FDetailedProfilePage.aspx%3FhdnIsTMFlag%3dNo%26viewprofileid%3D'" + BuddyId + "' target='_blank'>";
                    Buddy += "<p>" + RecommendableBuddies.BuddyList[i].DisplayName + "</p>";
                    Buddy += "<p class='font_12'>View Profile</p>";
                    Buddy += "</a>";

                    var request = new XMLHttpRequest;
                    request.open('GET', "ShowImage.ashx?id=" + RecommendableBuddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover' runat='server' src='ShowImage.ashx?id=" + RecommendableBuddies.BuddyList[i].UserId + "' alt='' />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image.jpg'  />";
                    }
                    
                    Buddy += "</div>";
                    i++;
                }
                Buddy += "</div>";
            }
            else {
                for (k = 0; k < (RecommendableBuddies.BuddyList.length % 9); k++) {
                    searchSupervisorsList.push({ value: RecommendableBuddies.BuddyList[i].UserId, label: RecommendableBuddies.BuddyList[i].UserId + " " + RecommendableBuddies.BuddyList[i].DisplayName, desc: RecommendableBuddies.BuddyList[i].DisplayName });
                    var BuddyId = RecommendableBuddies.BuddyList[i].UserId.replace(/\s+/g, '');
                    Buddy += "<div class='recommend_buddy_tile fleft ui-draggable' id='" + RecommendableBuddies.BuddyList[i].UserId + "'>";
                    Buddy += "<a href='https://onecognizant.cognizant.com?GlobalAppId=896&Source=9&URL=https%3A%2F%2Fonecognizantapps.cognizant.com%2F896%2FDetailedProfilePage.aspx%3FhdnIsTMFlag%3dNo%26viewprofileid%3D'" + BuddyId + "' target='_blank'>";
                    Buddy += "<p>" + RecommendableBuddies.BuddyList[i].DisplayName + "</p>";
                    Buddy += "<p class='font_12'>View Profile</p>";
                    Buddy += "</a>";

                    var request = new XMLHttpRequest;
                    request.open('GET', "ShowImage.ashx?id=" + RecommendableBuddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover' runat='server' src='ShowImage.ashx?id=" + RecommendableBuddies.BuddyList[i].UserId + "' alt='' />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image.jpg'  />";
                    }

                    Buddy += "</div>";
                    i++;
                }
                Buddy += "</div>";
            }
        }
        $("#dvRecommendableBuddies").append(Buddy);
    }

    else {
        $("#dvRecommendableBuddies").html('');
        $("#dvRecommendableBuddies").append('<div class="recommend_buddy_list_wrapper fleft clear visible"><label style="bottom:200px; position:absolute;left:100px;color:#ffffff;font-size:14px">No Buddy found for selected Joinee</label></div>');
    }
}

function onerrorGetRecommendableBuddies() {
    alert('No recommendable Buddy found in your team');
}

function BindRecommendableBuddies(UserId, UserName) {
    $("#dvRecommendableBuddies").html('');
    var Buddy = '';
    Buddy += "<div class='recommend_buddy_list_wrapper fleft clear visible'>";
    Buddy += "<div class='recommend_buddy_tile fleft ui-draggable' id='" + UserId + "'>";
    Buddy += "<a href='#'>";
    Buddy += "<p>" + UserName + "</p>";
    Buddy += "<p class='font_12'>(" + UserId.replace(/\s+/g, '') + ")</p>";
    Buddy += "</a>";
    Buddy += "<img class='background-size-cover' runat='server' src='ShowImage.ashx?id=" + UserId + "' alt='' />";
    Buddy += "</div>";
    Buddy += "</div>";
    $("#dvRecommendableBuddies").append(Buddy);
    $(".searchBox").val('Search by name or Id');
    return;
}

//===============================================Recommend Buddies to joinee ================================================

function RecommendBuddyToJoinee() {
    var JoineeId = $('#drop_area_newjoiner')[0].lastChild.id;
    var BuddyId;
    
    var i = 1;
    for (i = 1; i < 4; i++) {
        if ($('#drop_area_buddy_' + i)[0].childNodes.length == 2) {
            BuddyId = $('#drop_area_buddy_' + i)[0].lastChild.id;
            CheckConnectionRequestAdmin(JoineeId, BuddyId, function (isAllowed) {
                if (isAllowed) {
                    BuddyConnectionRequestAdmin(JoineeId, BuddyId);
                                  
                }
            });
        }
    }   

    $('.recommend_submit_confirmation').hide();
    $('.recommend_submit_information').fadeIn();
    $('#pRecommendationSent').append("Your recommendations has been sent successfully.</p>");    
}

//============================================CheckConnectionRequestAdmin============================================
function CheckConnectionRequestAdmin(JoineeId, BuddyId, callback) {
    $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/CheckConnectionRequest',
        contentType: 'application/json',
        data: "{joineeId:'" + JoineeId + "',buddyId:'" + BuddyId + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            if (response.d == "1") {                
                var value = true;
            }
            else {                
                var value = false;
            }
            callback(value);

        },
        error: function (xhr, ajaxOptions, thrownError) {
            var value = false;
            callback(value);
        }
    });
}

//===========================================Send connection request onbehalf of joinee ==================================
function BuddyConnectionRequestAdmin(JoineeId, BuddyId) {
    $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/BuddyConnectionRequest',
        contentType: 'application/json',
        data: "{joineeId:'" + JoineeId + "',buddyId:'" + BuddyId + "',requestType:'Send',rejectionComment:'',supervisorRecommended:'1'}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            OnSuccessBuddyConnectionRequestAdmin(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            OnErrorBuddyConnectionRequestAdmin(xhr.status, thrownError);
        }
    });
}

function OnSuccessBuddyConnectionRequestAdmin() {
    return true;
}

function OnErrorBuddyConnectionRequestAdmin() {    
}



//===============================================Get Unenrolled Buddies =====================================================

function GetUnenrolledBuddies() {
    var SupervisorId = $('#CurrentUserId').val();

    $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/GetUnenrolledBuddies',
        contentType: 'application/json',
        data: "{supervisorId:'" + SupervisorId + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            onsuccessGetUnenrolledBuddies(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            onerrorGetUnenrolledBuddies(xhr.status, thrownError);
        }
    });

}

function onsuccessGetUnenrolledBuddies(result) {

    var UnenrolledBuddies = eval('(' + result.d + ')');
    $("#dvUnenrolledBuddies").html('');
    searchSupervisorsList.splice(0, searchSupervisorsList.length); 
    var i = 0;
    var j = 0;
    var k = 0;
    if (UnenrolledBuddies.BuddyList != null) {
        var outerCount = 0;
        if (UnenrolledBuddies.BuddyList.length % 12 > 0)
            outerCount = parseInt(UnenrolledBuddies.BuddyList.length / 12) + 1;
        else
            outerCount = parseInt(UnenrolledBuddies.BuddyList.length / 12);
        var Buddy = '';

        for (j = 0; j < outerCount; j++) {
            if (j == 0)
                Buddy += "<div class='recommend_registration_list_wrapper fleft clear visible'>";
            else
                Buddy += "<div class='recommend_registration_list_wrapper fleft clear hiddenDiv'>";
            if (j != outerCount - 1 || outerCount == 1) {
                for (k = 0; k < Math.min(UnenrolledBuddies.BuddyList.length, 12); k++) {
                    searchSupervisorsList.push({ value: UnenrolledBuddies.BuddyList[i].UserId, label: UnenrolledBuddies.BuddyList[i].UserId + " " + UnenrolledBuddies.BuddyList[i].DisplayName, desc: UnenrolledBuddies.BuddyList[i].DisplayName });
                    Buddy += "<div class='recommend_buddy_tile_wrapper fleft' id='" + UnenrolledBuddies.BuddyList[i].UserId.replace(/\s+/g, '') + "'>";
                    Buddy += "<div class='recommend_buddy_tile fleft'>";
                    Buddy += "<a href='#'>";
                    Buddy += "<p>" + UnenrolledBuddies.BuddyList[i].DisplayName + "</p>";
                    Buddy += "<p class='font_12'>(" + UnenrolledBuddies.BuddyList[i].UserId.replace(/\s+/g, '') + ")</p>";
                    Buddy += "</a>";

                    var request = new XMLHttpRequest;
                    request.open('GET', "ShowImage.ashx?id=" + UnenrolledBuddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover' runat='server' src='ShowImage.ashx?id=" + UnenrolledBuddies.BuddyList[i].UserId + "' alt='' />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image.jpg'  />";
                    }

                    Buddy += "</div>";
                    Buddy += "<div class='recommend_buddy_tile_selected'></div>";
                    Buddy += "</div>";
                    i++;
                }
                Buddy += "</div>";
            }
            else {
                for (k = 0; k < (UnenrolledBuddies.BuddyList.length % 12); k++) {
                    searchSupervisorsList.push({ value: UnenrolledBuddies.BuddyList[i].UserId, label: UnenrolledBuddies.BuddyList[i].UserId + " " + UnenrolledBuddies.BuddyList[i].DisplayName, desc: UnenrolledBuddies.BuddyList[i].DisplayName });                    
                    Buddy += "<div class='recommend_buddy_tile_wrapper fleft' id='" + UnenrolledBuddies.BuddyList[i].UserId.replace(/\s+/g, '') + "'>";
                    Buddy += "<div class='recommend_buddy_tile fleft'>";
                    Buddy += "<a href='#'>";
                    Buddy += "<p>" + UnenrolledBuddies.BuddyList[i].DisplayName + "</p>";
                    Buddy += "<p class='font_12'>(" + UnenrolledBuddies.BuddyList[i].UserId.replace(/\s+/g, '') + ")</p>";
                    Buddy += "</a>";

                    var request = new XMLHttpRequest;
                    request.open('GET', "ShowImage.ashx?id=" + UnenrolledBuddies.BuddyList[i].UserId + "", false);
                    request.send();
                    if (request.status === 200) {
                        Buddy += "<img class='background-size-cover' runat='server' src='ShowImage.ashx?id=" + UnenrolledBuddies.BuddyList[i].UserId + "' alt='' />";
                    }
                    else {
                        Buddy += "<img class='background-size-cover dummy_image' src='Resources/Images/dummy_image.jpg'  />";
                    }

                    Buddy += "</div>";
                    Buddy += "<div class='recommend_buddy_tile_selected'></div>";
                    Buddy += "</div>";
                    i++;
                }
                Buddy += "</div>";
            }
        }
        $("#dvUnenrolledBuddies").append(Buddy);
    }
    else {
        $("#dvUnenrolledBuddies").append('<div class="recommend_registration_list_wrapper fleft clear visible"><label style="bottom:200px; position:absolute;left:290px;color:#ffffff;font-size:14px">No unenrolled buddies found in your team</label></div>');
    }
}

function onerrorGetUnenrolledBuddies() {
    return false;
}

function BindEnrollableBuddies(UserId, UserName) {
    $("#dvUnenrolledBuddies").html('');
    var Buddy = '';
    Buddy += "<div class='recommend_registration_list_wrapper fleft clear visible'>";
    Buddy += "<div class='recommend_buddy_tile_wrapper fleft' id='" + UserId + "'>";
    Buddy += "<div class='recommend_buddy_tile fleft'>";
    Buddy += "<a href='#'>";
    Buddy += "<p>" + UserName + "</p>";
    Buddy += "<p class='font_12'>(" + UserId.replace(/\s+/g, '') + ")</p>";
    Buddy += "</a>";
    Buddy += "<img class='background-size-cover' runat='server' src='ShowImage.ashx?id=" + UserId + "' alt='' />";
    Buddy += "</div>";
    Buddy += "<div class='recommend_buddy_tile_selected'></div>";
    Buddy += "</div>";
    Buddy += "</div>";
    $("#dvUnenrolledBuddies").append(Buddy);
    $(".searchBox").val('Search by name or Id');
}

//============================================= Enroll unenrolled buddies ==================================================
function EnrollBuddies() {
    var selectedBuddies = '';
    var selectedCount = 0;
    if (!($('#dvUnenrolledBuddies').find('.recommend_buddy_tile_wrapper').length == null || $('#dvUnenrolledBuddies').find('.recommend_buddy_tile_wrapper').length == 0)) {

        for (var i = 0; i < $('#dvUnenrolledBuddies').find('.recommend_buddy_tile_wrapper').length; i++) {
            if (($('#dvUnenrolledBuddies').find('.recommend_buddy_tile_wrapper')[i].className) == "recommend_buddy_tile_wrapper fleft selected") {
                selectedBuddies = selectedBuddies + $('#dvUnenrolledBuddies').find('.recommend_buddy_tile_wrapper')[i].id.replace(/\s+/g, '') + ',';
                selectedCount += 1;
            }
        }

        selectedBuddies = selectedBuddies.replace(/,$/, '');

        if (selectedCount == 0) {
            $('.recommend_submit_confirmation').hide();
            $('.error_popup').fadeIn();
            $("#lblCommonInfoPopup").html('');
            $("#lblCommonInfoPopup").append("Please select Buddy for enrollment first");
        }
        else {
            NominateAsBuddy(selectedBuddies);
        }
    }
    else {
        $('.recommend_submit_confirmation').hide();
        $('.error_popup').fadeIn();
        $("#lblCommonInfoPopup").html('');
        $("#lblCommonInfoPopup").append("No buddies for enrollment");
    }
}

function NominateAsBuddy(selectedBuddies) {
    $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/NominateAsBuddy',
        contentType: 'application/json',
        data: "{buddyId:'" + selectedBuddies + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            onsuccessNominateAsBuddy(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            onerrorNominateAsBuddy();
        }
    });
}

function onsuccessNominateAsBuddy(result) {
    $('.recommend_submit_confirmation').hide();
    $('.recommend_submit_information').fadeIn();
    document.getElementById('pRecommendationSent').innerHTML = "Buddy enrollment done successfully";
}

function onerrorNominateAsBuddy() {
    $('.recommend_submit_confirmation').hide();
    $('.recommend_submit_information').fadeIn();
    document.getElementById('pRecommendationSent').innerHTML = "Looks like some issue in enrollment process, please try later";
}

//===================================================== Enable Disable Buddy drag fiels ============================================================
function EnableDisableDragFields() {
    var CurrentUserId = $('#CurrentUserId').val();
    $.ajax({
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        url: $('body').attr('id') + '.aspx/Getconfiguration',
        data: "{associate_Id:'" + CurrentUserId + "'}",
        dataType: 'json',
        success: function (data) {
            Configuration = eval('[' + data.d + ']');
            if (Configuration.length != 0) {
                var NoOfFieldsToBeEnabled = Configuration[0].ConnectionsOfJoiners;
                if (NoOfFieldsToBeEnabled >= 3) {
                    $("#drop_area_buddy_1").html("<p class='drop_area_text'>Drag Buddy here</p>");
                    $("#drop_area_buddy_1").droppable("enable");

                    $("#drop_area_buddy_2").html("<p class='drop_area_text'>Drag Buddy here</p>");
                    $("#drop_area_buddy_2").droppable("enable");

                    $("#drop_area_buddy_3").html("<p class='drop_area_text'>Drag Buddy here</p>");
                    $("#drop_area_buddy_3").droppable("enable");
                }
                else if (NoOfFieldsToBeEnabled == 2) {
                    $("#drop_area_buddy_1").html("<p class='drop_area_text'>Drag Buddy here</p>");
                    $("#drop_area_buddy_1").droppable("enable");

                    $("#drop_area_buddy_2").html("<p class='drop_area_text'>Drag Buddy here</p>");
                    $("#drop_area_buddy_2").droppable("enable");

                    $("#drop_area_buddy_3").html("<p class='drop_area_text'>Only 2 Buddies can be selected</p>");
                    $("#drop_area_buddy_3").droppable("disable");
                }
                else if (NoOfFieldsToBeEnabled == 1) {
                    $("#drop_area_buddy_1").html("<p class='drop_area_text'>Drag Buddy here</p>");
                    $("#drop_area_buddy_1").droppable("enable");

                    $("#drop_area_buddy_2").html("<p class='drop_area_text'>Only 1 Buddy can be selected</p>");
                    $("#drop_area_buddy_2").droppable("disable");

                    $("#drop_area_buddy_3").html("<p class='drop_area_text'>Only 1 Buddy can be selected</p>");
                    $("#drop_area_buddy_3").droppable("disable");
                }
            }
        }
    });    
}

//************************************************************Buddy Notification Page**************************************************************
//=========================================================GetNotificationBuddyRequests  =========================================================
function GetNotificationBuddyRequests() {

    var BuddyId = $('#CurrentUserId').val();
    $.ajax({
        type: 'POST',
        url: 'buddy_view_notifications.aspx/GetNotificationBuddyRequests',
        contentType: 'application/json',
        data: "{buddyId:'" + BuddyId + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            onsuccessGetNotificationBuddyRequests(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            onerrorGetNotificationBuddyRequests(xhr.status, thrownError);
        }
    });
}
function onsuccessGetNotificationBuddyRequests(result) {
    var Joinees = eval('(' + result.d + ')');
    $("#BuddyRequestNotification").html('');    
    if (Joinees.ObjMyPendingConnections.length == null || Joinees.ObjMyPendingConnections.length == 0) {

        $('.notifications_content_right').addClass('hiddenDiv');
        $("#BuddyRequestNotification").append("<label style='top:100px;position:absolute;right:-150px;color:#ffffff'>No Notification...!!!</label>");
    }
    else {

        $('.notifications_content_right').removeClass('hiddenDiv');
        var a = Joinees.ObjMyPendingConnections.length;
        var detaillist = "";
        var list = "";

        for (var i = 0; i < a; i++) {
            if (i == 0) {
                list += "<div class='notifications_left_item selected'>";
            }
            else {
                list += "<div class='notifications_left_item'>";
            }

            list += "<span class='notifications_left_sl_no'>" + (i + 1) + "</span>";
            var request = new XMLHttpRequest;
            request.open('GET', "ShowImage.ashx?id=" + Joinees.ObjMyPendingConnections[i].UserId + "", false);
            request.send();
            if (request.status === 200) {
                list += "<span class='notifications_left_image'><img class='background-size-cover' src='ShowImage.ashx?id=" + Joinees.ObjMyPendingConnections[i].UserId + "' alt='' /></span>";                
            }
            else {
                list += "<span class='notifications_left_image'><img class='background-size-cover' src='Resources/Images/dummy_image.jpg' /></span>";
            }
            
            list += "<div class='notifications_left_details fleft'>";
            var UserName = (Joinees.ObjMyPendingConnections[i].UserName.length < 18 ? (Joinees.ObjMyPendingConnections[i].UserName) : (Joinees.ObjMyPendingConnections[i].UserName.substring(0,18) + '...'));
            list += "<p class='font_name'>" + UserName + "</p>";
            list +="<p>" + Joinees.ObjMyPendingConnections[i].UserDesignation + "</p>";
            list +="</div>";
            list +="</div>";
            buddyRequestNotificationsArray[i] = new Array(a);
            buddyRequestNotificationsArray[i][0] = Joinees.ObjMyPendingConnections[i].UserName;
            buddyRequestNotificationsArray[i][1] = Joinees.ObjMyPendingConnections[i].UserDesignation;
            buddyRequestNotificationsArray[i][2] = Joinees.ObjMyPendingConnections[i].UserLanguage;
            buddyRequestNotificationsArray[i][3] = Joinees.ObjMyPendingConnections[i].UserProjectName;
            buddyRequestNotificationsArray[i][4] = Joinees.ObjMyPendingConnections[i].UserBU;
            buddyRequestNotificationsArray[i][5] = Joinees.ObjMyPendingConnections[i].UserId;


        }
        $("#BuddyRequestNotification").append(list);

        var HistorySelectedUserId = Joinees.ObjMyPendingConnections[0].UserId;
        var HistorySelectedUserEmailId;
        HistorySelectedUserEmailId = GetAssociateEmailId(HistorySelectedUserId);
//        document.getElementById("SendMailEmailId").innerHTML = HistorySelectedUserEmailId;
//        document.getElementById("ccEmailId").innerHTML = HistorySelectedUserEmailId;
        if (HistorySelectedUserEmailId != false) {
            $("#Joinee_Name").html('');
            $("#Joinee_Name").append(Joinees.ObjMyPendingConnections[0].UserName + "        " + "<img style='cursor:pointer;' src='Resources/Images/presence_16-unknown.png' id ='imgCommunicatorStatus' title='Status' /><img title='Ping me' src='Resources/Images/communicator3.png' style='width:20px;cursor:pointer;margin-left:3px;' onclick='OpenCommunicatorTileView();'/><img src='Resources/Images/outlook.jpg' style='width:20px;cursor:pointer;margin-left:4px;' title='Mail' onclick='SendEmail();'/>");
        }
        else {
            $("#Joinee_Name").html('');
            $("#Joinee_Name").append(Joinees.ObjMyPendingConnections[0].UserName);
        }

        var request = new XMLHttpRequest;
        request.open('GET', "ShowImage.ashx?id=" + Joinees.ObjMyPendingConnections[0].UserId + "", false);
        request.send();
        if (request.status === 200) {
            $("#Joinee_Image").attr('src','ShowImage.ashx?id=' + Joinees.ObjMyPendingConnections[0].UserId + '');
        }
        else {
            $("#Joinee_Image").attr('src', 'Resources/Images/dummy_image.jpg');
        }
        document.getElementById("Joinee_Designation").innerHTML = Joinees.ObjMyPendingConnections[0].UserDesignation;
        document.getElementById("Joinee_Speaks").innerHTML = Joinees.ObjMyPendingConnections[0].UserLanguage; ;
        document.getElementById("Joinee_Project").innerHTML = Joinees.ObjMyPendingConnections[0].UserProjectName;
        document.getElementById("Joinee_BU").innerHTML = Joinees.ObjMyPendingConnections[0].UserBU;

        $('.notifications_content_right').attr('id', Joinees.ObjMyPendingConnections[0].UserId);
        $("#NotificationJoineeId").val(Joinees.ObjMyPendingConnections[0].UserId);
        $("#btnDetailedProfile").attr('href', "https://onecognizant.cognizant.com?GlobalAppId=896&Source=9&URL=https%3A%2F%2Fonecognizantapps.cognizant.com%2F896%2FDetailedProfilePage.aspx%3FhdnIsTMFlag%3dNo%26viewprofileid%3D" + Joinees.ObjMyPendingConnections[0].UserId + "");
    }

}

function onerrorGetNotificationBuddyRequests(status, error) {
    alert("Error in Buddy notification connection....!!!!")
}
//=====================================================GetNotificationBuddyDisconnectionAlerts =================================================================
function GetNotificationBuddyDisconnectionAlerts() {
    var BuddyId = $('#CurrentUserId').val();
    $.ajax({
        type: 'POST',
        url: 'buddy_view_notifications.aspx/GetNotificationBuddyDisconnectionAlerts',
        contentType: 'application/json',
        data: "{buddyId:'" + BuddyId + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            onsuccessGetNotificationBuddyDisconnectionAlerts(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            onerrorGetNotificationBuddyDisconnectionAlerts(xhr.status, thrownError);
        }
    });
}
function onsuccessGetNotificationBuddyDisconnectionAlerts(result) {
    var relation = eval('(' + result.d + ')');
    $("#BuddyDiscAlertNotification").html('');
    var a = relation.ObjMyPendingConnections.length;

    var list = "";
    if (relation.ObjMyPendingConnections.length == null || relation.ObjMyPendingConnections.length == 0) {

        $('.notifications_content_right').addClass('hiddenDiv');
        $("#BuddyDiscAlertNotification").append("<label style='top:100px;position:absolute;right:-150px;color:#ffffff'>No Notification...!!!</label>");
    }
    else {
        $('.notifications_content_right').removeClass('hiddenDiv');
      
        for (var i = 0; i < a; i++) {
            if (i == 0) {
                list += "<div class='notifications_left_item selected'>";
            }
            else {
                list += "<div class='notifications_left_item'>";
            }

            list += "<span class='notifications_left_sl_no'>" + (i + 1) + "</span>";

            var request = new XMLHttpRequest;
            request.open('GET', "ShowImage.ashx?id=" + relation.ObjMyPendingConnections[i].UserId + "", false);
            request.send();
            if (request.status === 200) {
                list += "<span class='notifications_left_image'><img class='background-size-cover' src='ShowImage.ashx?id=" + relation.ObjMyPendingConnections[i].UserId + "' alt='' /></span>";
            }
            else {
                list += "<span class='notifications_left_image'><img class='background-size-cover' src='Resources/Images/dummy_image.jpg' /></span>";
            }

            list += "<div class='notifications_left_details fleft'>";
            var UserName = (relation.ObjMyPendingConnections[i].UserName.length < 18 ? (relation.ObjMyPendingConnections[i].UserName) : (relation.ObjMyPendingConnections[i].UserName.substring(0, 18) + '...'));
            list += "<p class='font_name'>" + UserName + "</p>";
           
            list +="<p>" + relation.ObjMyPendingConnections[i].UserDesignation + "</p>";
            list += "</div>";
            list +="</div>";
            alertsNotificationArray[i] = new Array(a);
            alertsNotificationArray[i][0] = relation.ObjMyPendingConnections[i].UserName;
            alertsNotificationArray[i][1] = relation.ObjMyPendingConnections[i].UserDesignation;
            alertsNotificationArray[i][2] = relation.ObjMyPendingConnections[i].ConnectionStartDate;
            alertsNotificationArray[i][3] = relation.ObjMyPendingConnections[i].ConnectionEndDate;
            alertsNotificationArray[i][4] = relation.ObjMyPendingConnections[i].DaysTotal + ' ' + 'Days Left';
            alertsNotificationArray[i][5] = relation.ObjMyPendingConnections[i].UserId;

        }
        $("#BuddyDiscAlertNotification").append(list);

        var HistorySelectedUserId = relation.ObjMyPendingConnections[0].UserId;
        var HistorySelectedUserEmailId;
        HistorySelectedUserEmailId = GetAssociateEmailId(HistorySelectedUserId);
        $("#ccEmailId").val(HistorySelectedUserEmailId);
        //document.getElementById("ccEmailId").innerHTML = HistorySelectedUserEmailId;
        if (HistorySelectedUserEmailId != false) {
            $("#Joinee_Name1").html('');
            $("#Joinee_Name1").append(relation.ObjMyPendingConnections[0].UserName + "        " + "<img style='cursor:pointer;' src='Resources/Images/presence_16-unknown.png' id ='imgCommunicatorStatus' title='Status' /><img title='Ping me' src='Resources/Images/communicator3.png' style='width:20px;cursor:pointer;margin-left:3px;' onclick='OpenCommunicatorTileView();'/><img src='Resources/Images/outlook.jpg' style='width:20px;cursor:pointer;margin-left:4px;' title='Mail' onclick='SendEmail();'/>");
        }
        else {
            $("#Joinee_Name1").html('');
            $("#Joinee_Name1").append(relation.ObjMyPendingConnections[0].UserName);
        }
        //document.getElementById("Joinee_Name1").innerHTML = relation.ObjMyPendingConnections[0].UserName;
        document.getElementById("Joinee_Designation1").innerHTML = relation.ObjMyPendingConnections[0].UserDesignation;
        document.getElementById("StartDate").innerHTML = relation.ObjMyPendingConnections[0].ConnectionStartDate;
        document.getElementById("EndDate").innerHTML = relation.ObjMyPendingConnections[0].ConnectionEndDate;
        document.getElementById("Status").innerHTML = relation.ObjMyPendingConnections[0].DaysTotal + ' ' + 'Days Left';
        $('.notifications_content_right').attr('id', relation.ObjMyPendingConnections[0].UserId);
        $("#NotificationJoineeId").val(relation.ObjMyPendingConnections[0].UserId);

        var request = new XMLHttpRequest;
        request.open('GET', "ShowImage.ashx?id=" + relation.ObjMyPendingConnections[0].UserId + "", false);
        request.send();
        if (request.status === 200) {
            $("#Joinee_Image1").attr('src', 'ShowImage.ashx?id=' + relation.ObjMyPendingConnections[0].UserId + '');
        }
        else {
            $("#Joinee_Image1").attr('src', 'Resources/Images/dummy_image.jpg');
        }
    }

}
function onerrorGetNotificationBuddyDisconnectionAlerts(status, thrownError) {
    
}
//===================================================GetOtherNotificationBuddy========================================================================
function GetNotificationBuddyOther() {
    var BuddyId = $('#CurrentUserId').val();
    $.ajax({
        type: 'POST',
        url: 'buddy_view_notifications.aspx/GetNotificationBuddyOther',
        contentType: 'application/json',
        data: "{buddyId:'" + BuddyId + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            onsuccessGetNotificationBuddyOther(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            onerrorGetNotificationBuddyOther(xhr.status, thrownError);
        }
    });
}
function onsuccessGetNotificationBuddyOther(result) {
    var relation = eval('(' + result.d + ')');
    $("#BuddyOtherNotification").html('');
    var a = relation.ObjMyPendingConnections.length;
    var list = "";
    if (relation.ObjMyPendingConnections.length == null || relation.ObjMyPendingConnections.length == 0) {
        $('.notifications_content_right').addClass('hiddenDiv');
        $("#BuddyOtherNotification").append("<label style='top:100px;position:absolute;right:-150px;color:#ffffff'>No Notification...!!!</label>");
    }
    else {
        $('.notifications_content_right').removeClass('hiddenDiv');
        for (var i = 0; i < a; i++) {
            if (i == 0) {
                list += "<div class='notifications_left_item selected'>";
            }
            else {
                list += "<div class='notifications_left_item'>";
            }
            list += "<span class='notifications_left_sl_no'>" + (i + 1) + "</span>";

            var request = new XMLHttpRequest;
            request.open('GET', "ShowImage.ashx?id=" + relation.ObjMyPendingConnections[i].UserId + "", false);
            request.send();
            if (request.status === 200) {
                list += "<span class='notifications_left_image'><img class='background-size-cover' src='ShowImage.ashx?id=" + relation.ObjMyPendingConnections[i].UserId + "' alt='' /></span>";
            }
            else {
                list += "<span class='notifications_left_image'><img class='background-size-cover' src='Resources/Images/dummy_image.jpg' /></span>";
            }

            list += "<div class='notifications_left_details fleft'>";
            var UserName = (relation.ObjMyPendingConnections[i].UserName.length < 18 ? (relation.ObjMyPendingConnections[i].UserName) : (relation.ObjMyPendingConnections[i].UserName.substring(0, 18) + '...'));
            list += "<p class='font_name'>" + UserName + "</p>";
            list +="<p>" + relation.ObjMyPendingConnections[i].UserDesignation + "</p>";
            list +="</div>" ;
            list +="</div>";
            othersNotificationArray[i] = new Array(a);
            othersNotificationArray[i][0] = relation.ObjMyPendingConnections[i].UserName;
            othersNotificationArray[i][1] = relation.ObjMyPendingConnections[i].UserDesignation;
            othersNotificationArray[i][2] = relation.ObjMyPendingConnections[i].ConnectionStartDate;
            othersNotificationArray[i][3] = relation.ObjMyPendingConnections[i].ConnectionEndDate;
            othersNotificationArray[i][4] = relation.ObjMyPendingConnections[i].DisconnectionStatus;
            othersNotificationArray[i][5] = relation.ObjMyPendingConnections[i].UserId;

        }
        $("#BuddyOtherNotification").append(list);

        var HistorySelectedUserId = relation.ObjMyPendingConnections[0].UserId;
        var HistorySelectedUserEmailId;
        HistorySelectedUserEmailId = GetAssociateEmailId(HistorySelectedUserId);
        $("#ccEmailId").val(HistorySelectedUserEmailId);        
        if (HistorySelectedUserEmailId != false) {
            $("#Joinee_Name2").html('');
            $("#Joinee_Name2").append(relation.ObjMyPendingConnections[0].UserName + "        " + "<img style='cursor:pointer;' src='Resources/Images/presence_16-unknown.png' id ='imgCommunicatorStatus' title='Status' /><img title='Ping me' src='Resources/Images/communicator3.png' style='width:20px;cursor:pointer;margin-left:3px;' onclick='OpenCommunicatorTileView();'/><img src='Resources/Images/outlook.jpg' style='width:20px;cursor:pointer;margin-left:4px;' title='Mail' onclick='SendEmail();'/>");
        }
        else {
            $("#Joinee_Name2").html('');
            $("#Joinee_Name2").append(relation.ObjMyPendingConnections[0].UserName);
        }       
        document.getElementById("Joinee_Designation2").innerHTML = relation.ObjMyPendingConnections[0].UserDesignation;
        document.getElementById("StartDate1").innerHTML = relation.ObjMyPendingConnections[0].ConnectionStartDate;
        document.getElementById("EndDate1").innerHTML = relation.ObjMyPendingConnections[0].ConnectionEndDate;
        document.getElementById("Status1").innerHTML = relation.ObjMyPendingConnections[0].DisconnectionStatus;
        $('.notifications_content_right').attr('id', relation.ObjMyPendingConnections[0].UserId);

        var request = new XMLHttpRequest;
        request.open('GET', "ShowImage.ashx?id=" + relation.ObjMyPendingConnections[0].UserId + "", false);
        request.send();
        if (request.status === 200) {
            $("#Joinee_Image2").attr('src', 'ShowImage.ashx?id=' + relation.ObjMyPendingConnections[0].UserId + '');
        }
        else {
            $("#Joinee_Image2").attr('src', 'Resources/Images/dummy_image.jpg');
        }
    }

}
function onerrorGetNotificationBuddyOther(status, thrownError) {
    alert("Error in Other result");
}
//================================================GetNotificationBuddyTeamMembers==================================================================

function GetNotificationBuddyTeamMembers() {
    var BuddyId = $('#CurrentUserId').val();
    $.ajax({
        type: 'POST',
        url: 'buddy_view_notifications.aspx/GetNotificationBuddyTeamMembers',
        contentType: 'application/json',
        data: "{buddyId:'" + BuddyId + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            onsuccessGetNotificationBuddyTeamMembers(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            onerrorGetNotificationBuddyTeamMembers(xhr.status, thrownError);
        }
    });
}
function onsuccessGetNotificationBuddyTeamMembers(result) {
    
    var Members = eval('(' + result.d + ')');
    $("#BuddyTeamMemberNotification").html('');
    var a = Members.objJoineeNotification.length;
    var list = "";
    if (Members.objJoineeNotification.length == null || Members.objJoineeNotification.length == 0) {

        $('.notifications_content_right').addClass('hiddenDiv');
        $("#BuddyTeamMemberNotification").append("<label style='top:100px;position:absolute;right:-150px;color:#ffffff'>No Notification...!!!</label>");
    }
    else {
        $('.notifications_content_right').removeClass('hiddenDiv');
        for (var i = 0; i < a; i++) {
            if (i == 0) {
                list += "<div class='notifications_left_item selected'>";
            }
            else {
                list += "<div class='notifications_left_item'>";
            }

            list += "<span class='notifications_left_sl_no'>" + (i + 1) + "</span>";

            var request = new XMLHttpRequest;
            request.open('GET', "ShowImage.ashx?id=" + Members.objJoineeNotification[i].UserId + "", false);
            request.send();
            if (request.status === 200) {
                list += "<span class='notifications_left_image'><img class='background-size-cover' src='ShowImage.ashx?id=" + Members.objJoineeNotification[i].UserId + "' alt='' /></span>";
            }
            else {
                list += "<span class='notifications_left_image'><img class='background-size-cover' src='Resources/Images/dummy_image.jpg' /></span>";
            }
            list += "<div class='notifications_left_details fleft'>";
            var UserName = (Members.objJoineeNotification[i].UserName.length < 18 ? (Members.objJoineeNotification[i].UserName) : (Members.objJoineeNotification[i].UserName.substring(0, 18) + '...'));
            list += "<p class='font_name'>" + UserName + "</p>";
            list += "<p>" + Members.objJoineeNotification[i].UserDesignation + "</p>" ;
            list += "</div>";
            list += "</div>";
            alertsNotificationArray[i] = new Array(a);
            alertsNotificationArray[i][0] = Members.objJoineeNotification[i].UserName;
            alertsNotificationArray[i][1] = Members.objJoineeNotification[i].UserDesignation;
            alertsNotificationArray[i][2] = Members.objJoineeNotification[i].UserId;

        }
        $("#BuddyTeamMemberNotification").append(list);

        var HistorySelectedUserId = Members.objJoineeNotification[0].UserId;
        var HistorySelectedUserEmailId;
        HistorySelectedUserEmailId = GetAssociateEmailId(HistorySelectedUserId);
        $("#ccEmailId").val(HistorySelectedUserEmailId);
        //document.getElementById("ccEmailId").innerHTML = HistorySelectedUserEmailId;
        if (HistorySelectedUserEmailId != false) {
            $("#Joinee_Name3").html('');
            $("#Joinee_Name3").append(Members.objJoineeNotification[0].UserName + "        " + "<img style='cursor:pointer;' src='Resources/Images/presence_16-unknown.png' id ='imgCommunicatorStatus' title='Status' /><img title='Ping me' src='Resources/Images/communicator3.png' style='width:20px;cursor:pointer;margin-left:3px;' onclick='OpenCommunicatorTileView();'/><img src='Resources/Images/outlook.jpg' style='width:20px;cursor:pointer;margin-left:4px;' title='Mail' onclick='SendEmail();'/>");
        }
        else {
            $("#Joinee_Name3").html('');
            $("#Joinee_Name3").append(Members.objJoineeNotification[0].UserName);
        }
       // document.getElementById("Joinee_Name3").innerHTML = Members.objJoineeNotification[0].UserName;
        document.getElementById("Joinee_Designation3").innerHTML = Members.objJoineeNotification[0].UserDesignation;
        $('.notifications_content_right').attr('id', Members.objJoineeNotification[0].UserId);

        var request = new XMLHttpRequest;
        request.open('GET', "ShowImage.ashx?id=" + Members.objJoineeNotification[0].UserId + "", false);
        request.send();
        if (request.status === 200) {
            $("#Joinee_Image3").attr('src', 'ShowImage.ashx?id=' + Members.objJoineeNotification[0].UserId + '');
        }
        else {
            $("#Joinee_Image3").attr('src', 'Resources/Images/dummy_image.jpg');
        }
    }
 }
function onerrorGetNotificationBuddyTeamMembers(){

}

//************************************************************Buddy History Page**************************************************************
//==========================================================GetBuddyHistory========================================================================
function GetBuddyHistory() {
   var BuddyId = $('#CurrentUserId').val();  
    var type = 'Buddy';
    $.ajax({
        type: 'POST',
        url: 'Buddy_view_history.aspx/GetBuddyHistory',
        contentType: 'application/json',
        data: "{buddyId:'" + BuddyId + "',type:'" + type + "'}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            OnSuccessGetBuddyHistory(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            OnErrorGetBuddyHistory(xhr.status, thrownError);
        }
    });
}
function OnSuccessGetBuddyHistory(result) {
    var Buddies = eval('(' + result.d + ')');    
    var list = "";
    $("#history").html('');
    if (Buddies.MyConnections != null) {
        $("#lblNotificationRequest").text("");
        $(".history_content_right").removeClass("hiddenDiv");
        var a = Buddies.MyConnections.length;
        for (var i = 0; i < a; i++) {
            if (i == 0) {
                list += "<div class='history_left_item selected'>";
            }
            else {
                list += "<div class='history_left_item'>";
            }

            list += "<span class='history_left_sl_no'>" + (i + 1) + "</span>";

            var request = new XMLHttpRequest;
            request.open('GET', "ShowImage.ashx?id=" + Buddies.MyConnections[i].ConnectedToId + "", false);
            request.send();
            if (request.status === 200) {
                list += "<span class='history_left_image'><img class='background-size-cover' src='ShowImage.ashx?id=" + Buddies.MyConnections[i].ConnectedToId +"' alt='' /></span>";
            }
            else {
                list += "<span class='history_left_image'><img class='background-size-cover' src='Resources/Images/dummy_image.jpg' /></span>";
            }

            list += "<div class='history_left_details fleft'>";
            var UserName = (Buddies.MyConnections[i].UserName.length < 18 ? (Buddies.MyConnections[i].UserName) : (Buddies.MyConnections[i].UserName.substring(0,18) + '...'));
            list += "<p class='font_name'>" + UserName + "</p>";

            list += "<p style='font:lighter 12px Segoe UI'>" + Buddies.MyConnections[i].UserDesignation + "</p>";
            list += "</div>";
            list += "</div>";
            historyArray[i] = new Array(a);
            historyArray[i][0] = Buddies.MyConnections[i].UserName;
            historyArray[i][1] = Buddies.MyConnections[i].UserDesignation;
            historyArray[i][2] = Buddies.MyConnections[i].ConnectionStartDate;
            historyArray[i][3] = Buddies.MyConnections[i].ConnectionEndDate;
            historyArray[i][4] = Buddies.MyConnections[i].DaysTotal;
            historyArray[i][5] = Buddies.MyConnections[i].ConnectedToId;
            historyArray[i][6] = Buddies.MyConnections[i].DisconnectionStatus;

            var days = Buddies.MyConnections[i].DaysTotal;
            if (days <= 0)
                historyArray[i][4] = "Done";
            else
                historyArray[i][4] = Buddies.MyConnections[i].DaysTotal + ' Days Left';
            document.getElementById("User_Id").value = Buddies.MyConnections[i].ConnectedToId;
        }

        $("#history").append(list);

        var HistorySelectedUserId = Buddies.MyConnections[0].ConnectedToId;
        var HistorySelectedUserEmailId;
        HistorySelectedUserEmailId = GetAssociateEmailId(HistorySelectedUserId);
//        document.getElementById("ccEmailId").innerHTML = HistorySelectedUserEmailId;
        if (HistorySelectedUserEmailId != false) {
            $("#JoineeName").html('');
            $("#JoineeName").append(Buddies.MyConnections[0].UserName + "        " + "<img style='cursor:pointer;' src='Resources/Images/presence_16-unknown.png' id ='imgCommunicatorStatus' title='Status' /><img title='Ping me' src='Resources/Images/communicator3.png' style='width:20px;cursor:pointer;margin-left:3px;' onclick='OpenCommunicatorTileView();'/><img src='Resources/Images/outlook.jpg' style='width:20px;cursor:pointer;margin-left:4px;' title='Mail' onclick='SendEmail();'/>");
        }
        else {             
            $("#JoineeName").html('');
            $("#JoineeName").append(Buddies.MyConnections[0].UserName);
        }       
        
        document.getElementById("designation").innerHTML = Buddies.MyConnections[0].UserDesignation;
        document.getElementById("Start_Date").innerHTML = Buddies.MyConnections[0].ConnectionStartDate;
        $('.history_content_right').attr('id', Buddies.MyConnections[0].ConnectedToId);
        document.getElementById("End_Date").innerHTML = Buddies.MyConnections[0].ConnectionEndDate;
        var days = Buddies.MyConnections[0].DaysTotal;
        if (days <= 0) {
            document.getElementById("Status").innerHTML = "Done";           
        }
        else {
            document.getElementById("Status").innerHTML = Buddies.MyConnections[0].DaysTotal + ' Days Left';            
        }

        if (document.getElementById("Status").innerHTML == "Done" || Buddies.MyConnections[0].DisconnectionStatus == "Disengaged from Joinee" || Buddies.MyConnections[0].DisconnectionStatus == "Disengaged from Buddy") {
            $("#btnHistoryPageDisconnect").addClass('hiddenDiv');
        }
        else {
            $("#btnHistoryPageDisconnect").removeClass("hiddenDiv");
        }

        document.getElementById("User_Id").value = Buddies.MyConnections[0].ConnectedToId;
        //document.getElementById("name").innerHTML = Buddies.MyConnections[0].UserFirstName;
        $("#HistoryJoineeId").val(Buddies.MyConnections[0].ConnectedToId);

        var request = new XMLHttpRequest;
        request.open('GET', "ShowImage.ashx?id=" + Buddies.MyConnections[0].ConnectedToId + "", false);
        request.send();
        if (request.status === 200) {
            $("#JoineeImage").attr('src', 'ShowImage.ashx?id=' + Buddies.MyConnections[0].ConnectedToId + '');
        }
        else {
            $("#JoineeImage").attr('src', 'Resources/Images/dummy_image.jpg');
        }

        document.getElementById('viewprofile').setAttribute('href', "https://onecognizant.cognizant.com?GlobalAppId=896&Source=9&URL=https%3A%2F%2Fonecognizantapps.cognizant.com%2F896%2FDetailedProfilePage.aspx%3FhdnIsTMFlag%3dNo%26viewprofileid%3D" + Buddies.MyConnections[0].ConnectedToId + "");   
    }
    else {
        $(".history_content_right").addClass("hiddenDiv");
        $("#history").append("<label style='top:100px;position:absolute;right:-150px;color:#ffffff'>No Connections Found...!!!</label>");
      
    }
 
    
}

function OnErrorGetBuddyHistory(status, error) {
    
}
//========================================================Buddy disconnection Request of history page====================================================
function BuddyDisconnectionRequest() {
    var JoineeId = $("#HistoryJoineeId").val();
    var BuddyId = $('#CurrentUserId').val();
    var RequestType = 'SEND';
    var ByWhom = 'Buddy';

    $.ajax({
        type: 'POST',
        url: 'buddy_view_notifications.aspx/DisconnectionRequest',
        contentType: 'application/json',
        data: "{JoineeId:'" + JoineeId + "',BuddyId:'" + BuddyId + "',ByWhom:'" + ByWhom + "',RequestType:'" + RequestType + "'}",
        dataType: 'json', 

        processData: false,
        success: function (response) {
            OnSuccessAgreeToDisconnect(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            OnErrorAgreeToDisconnect(xhr.status, thrownError);
        }
    });
}

function OnSuccessAgreeToDisconnect() {
    GetBuddyHistory();
    $('.discontinue_confirmation_popup').hide();
    $('.discontinue_sent_info_popup').fadeIn();
}

function OnErrorAgreeToDisconnect() {
    GetBuddyHistory();
}
//========================================================  Configuration  ============================================================
//========================================================= GetConfiguration  ============================================

var z = 0;
var k = 0;
var y = 0;
var x = 0;
var chkconfig = 0;

function Getconfiguration() {
    var CurrentUserId = $('#CurrentUserId').val();
    var CountryId = $('#CountryId').val();
    $.ajax({
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        url: $('body').attr('id') + '.aspx/Getconfiguration',
        data: "{associate_Id:'" + CurrentUserId + "',countryId:'" + CountryId + "'}",
        dataType: 'json',
        success: function (data) {
            Configuration = eval('[' + data.d + ']');
            if (Configuration[0].BuddyDuration != null) {
                BuddyDuration = Configuration[0].BuddyDuration;
                RequestToRegBuddy = Configuration[0].RequestCountToRegBuddy;
                RequestAcceptedbyRegBuddy = Configuration[0].AcceptanceCountOfRegBuddy;
                RequestToUnregBuddy = Configuration[0].RequestCountToUnRegBuddy;
                RequestsAcceptedByUnregBuddy = Configuration[0].AcceptanceCountOfUnRegBuddy;
                ConnectionsOfJoiners = Configuration[0].ConnectionsOfJoiners;
                RequestsSendByJoinee = Configuration[0].RequestsSendByJoinee;

                $("#BuddyNJcon").html(Configuration[0].BuddyJoineeConnections);
                $("#NoofAppUsers").html(Configuration[0].NoofAppusers);

                BuddyDuration = (BuddyDuration == 0 ? "" : BuddyDuration);
                $("#BuddyDura").text(BuddyDuration + ' days ');

                RequestToRegBuddy = (RequestToRegBuddy == 0 ? "" : RequestToRegBuddy);
                $("#RequestToRegB").text(RequestToRegBuddy);

                RequestAcceptedbyRegBuddy = (RequestAcceptedbyRegBuddy == 0 ? "" : RequestAcceptedbyRegBuddy);
                $("#RequestAcceptedByRegB").text(RequestAcceptedbyRegBuddy);

                RequestToUnregBuddy = (RequestToUnregBuddy == 0 ? "" : RequestToUnregBuddy);
                $("#RequestToUnregB").text(RequestToUnregBuddy);

                RequestsAcceptedByUnregBuddy = (RequestsAcceptedByUnregBuddy == 0 ? "" : RequestsAcceptedByUnregBuddy);
                $("#RequestsAcceptedByUnregB").text(RequestsAcceptedByUnregBuddy);

                ConnectionsOfJoiners = (ConnectionsOfJoiners == 0 ? "" : ConnectionsOfJoiners);
                $("#ConnectionsOfNJ").text(ConnectionsOfJoiners);

                RequestsSendByJoinee = (RequestsSendByJoinee == 0 ? "" : RequestsSendByJoinee);
                $("#RequestSendByNJ").text(RequestsSendByJoinee);

                $("#CountryId").text(CountryId);

                var list = '';
                $("#SelectCountryId").html('');
                if (Configuration[0].CountryList.length > 0) {
                    for (var i = 0; i < Configuration[0].CountryList.length; i++) {
                        list += '<li id="' + Configuration[0].CountryList[i].CountryId + '">' + Configuration[0].CountryList[i].CountryDesc + '<a href="#"><img src="Resources/Images/go_arrow.png" alt="Arrow" class="dropdown_select_arrow"/></a></li>';
                    }
                }
                $("#SelectCountryId").html(list);

                $('#SelectCountryId li a').bind("click", function () {
                    var selectedItem = $(this).parent().text();
                    SelectCountryId = $(this).parent()[0].id;
                    var thisDropdown = $(this).parentsUntil('.dropdown_wrapper');
                    thisDropdown.prev().find('.selected_item').text(selectedItem);
                    $('.dropdown_select').slideUp();
                });
            }
            else {
                $("#BuddyNJcon").html(0);
                $("#NoofAppUsers").html(0);

                BuddyDuration = "";
                $("#BuddyDura").text(BuddyDuration + ' days ');

                RequestToRegBuddy = "";
                $("#RequestToRegB").text(RequestToRegBuddy);

                RequestAcceptedbyRegBuddy = "";
                $("#RequestAcceptedByRegB").text(RequestAcceptedbyRegBuddy);

                RequestToUnregBuddy = "";
                $("#RequestToUnregB").text(RequestToUnregBuddy);

                RequestsAcceptedByUnregBuddy = "";
                $("#RequestsAcceptedByUnregB").text(RequestsAcceptedByUnregBuddy);

                ConnectionsOfJoiners = "";
                $("#ConnectionsOfNJ").text(ConnectionsOfJoiners);

                RequestsSendByJoinee = "";
                $("#RequestSendByNJ").text(RequestsSendByJoinee);

                $("#CountryId").text(CountryId);
            }

        },
        error: function (result) {
            $('.error_popup').fadeIn();
            $("#lblCommonInfoPopup").html('');
            $("#lblCommonInfoPopup").append("Unable to retrieve configuration settings. Please try later.");
        }
    });
}
//========================================================= SetConfiguration  =========================================================

function validateconfig(callback) {
    var value;
    x = RequestToRegBuddy;
    y = RequestAcceptedbyRegBuddy;
    z = RequestToUnregBuddy;
    k = RequestsAcceptedByUnregBuddy;
    l = RequestsSendByJoinee;
    m = ConnectionsOfJoiners;
    if (x > y || z > k || z > x || k > y || k > x || l > m) {

        value = false;
    }

    else {        
        value = true;
    }
    callback(value);
}

function SetConfiguration() {
    validateconfig(function (isAllowed) {
        if (isAllowed) {
            $.ajax({
                type: 'POST',
                url: 'Admin_view_buddy.aspx/ConfigureAdmin',
                contentType: 'application/json',
                data: "{buddyDuration: " + BuddyDuration + ",requestToRegBuddy: " + RequestToRegBuddy + ",requestAcceptedByRegBuddy: " + RequestAcceptedbyRegBuddy + ",requestToUnRegBuddy: " + RequestToUnregBuddy + ",requestAcceptedByUnRegBuddy: " + RequestsAcceptedByUnregBuddy + ",requestsSendByJoinee:" + RequestsSendByJoinee + ",connectionsOfJoiners:" + ConnectionsOfJoiners + ",selectCountryId:'" + SelectCountryId + "'}",
                dataType: 'json',
                processData: false,
                success: function (response) {                    
                    $('.configure_submit_information').fadeIn();
                },
                error: function (xhr, ajaxOptions, thrownError) {                    
                    $('.error_popup').fadeIn();
                    $("#lblCommonInfoPopup").html('');
                    $("#lblCommonInfoPopup").append("Cannot set configuration right now, please do it after some time.");
                }
            });
        }
        else {               
            $('.config_error').fadeIn("slow");
        }
    });    
}

//============================================== DASHBOARD ==================================================================

//-----------------------------------------------Prefill values (BUnames, country names, buddylist-dashboard, piechart)-------------------------------------------
function GetDashBoardTabPrefillValues() {
    var bodyId = $('body').attr('id');
    $.ajax({
        type: 'POST',
        url: '' + bodyId + '.aspx/GetDashBoardTabPrefillValues',
        contentType: 'application/json',
        // data: "{}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            onsuccessGetDashBoardTabPrefillValues(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            onerrorGetDashBoardTabPrefillValues(xhr.status, thrownError);
        }
    });
}

function onsuccessGetDashBoardTabPrefillValues(response) { 
    var result = eval('(' + response.d + ')');    
    
    //Start - BU list
    $("#drpdwnBU").html('');
    var BUlist = "<li class='dashboard_bu_option' id='BUAll'>All</li>";

    if (result.BUNames.length > 0) {
        for (var i = 0; i < result.BUNames.length; i++) {
            BUlist += " <li class='dashboard_bu_option' id='" + result.BUNames[i].DeptId + "'>" + result.BUNames[i].DeptDesc + "</li>";
        }
        $("#drpdwnBU").append(BUlist);
    }
    else {
        $("#drpdwnBU").append(BUlist);
    }
    //End - BU list

    //Start - Country list    
    $("#hiddenCountryId").val('0');    
    $("#drpdwnCountry").html('');    
    var countryList = "<li class='dashboard_bu_option' id='0'>All</li>";
    if (result.CountryList.length > 0) {
        for (var i = 0; i < result.CountryList.length; i++) {
            countryList += " <li class='dashboard_bu_option' id='" + result.CountryList[i].CountryId + "'>" + result.CountryList[i].CountryDesc + "</li>";
        }
        $("#drpdwnCountry").append(countryList);
    }
    else {
        $("#drpdwnCountry").append(countryList);
    }        
    //End - Country list

    //Start - Pie Chart
    document.getElementById("Non_Con_buddies").innerHTML = result.NonConnected_buddies;
    document.getElementById("Con_buddies").innerHTML = result.Connected_buddies;
    document.getElementById("td_NotConnBuddy").innerHTML = result.NonConnected_buddies;
    document.getElementById("td_ConnBuddy").innerHTML = result.Connected_buddies;
    $(function () {
        var values = [],
            labels = [];
        $("tr").each(function () {
            values.push(parseInt($("td", this).text(), 10));
            labels.push($("th", this).text());
        });
        $("table").hide();
        document.getElementById("holder").innerHTML = '';
        Raphael("holder", 200, 200).pieChart(70, 60, 40, values, labels, "#626262");
    });
    //End - Pie Chart

    //Start - Initial Dashboard (calling old success func)
    document.getElementById('TypeValue').value = 1;
    OnSuccessAllBuddiesDashBoard(response);
    //End - Initial Dashboard
}

//============================================================= BU Names for Buddies===============================================================
function GetBUNamesbuddy() {
    $.ajax({
        type: 'POST',
        url: 'Admin_view_buddy.aspx/GetBUNames',
        contentType: 'application/json',
        // data: "{}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            onsuccessGetBUNamesbuddy(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            onerrorGetBUNamesbuddy(xhr.status, thrownError);
        }
    });
}

function onerrorGetBUNamesbuddy(status, thrownError) {
    alert("Something is wrong here, Please try again after sometime.");
}

function onsuccessGetBUNamesbuddy(result) {
    var result = eval('(' + result.d + ')');    
    $("#drpdwnBU").html('');
    var list = "<li class='dashboard_bu_option'>All</li>";

    if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {
            list += " <li class='dashboard_bu_option'>" + result[i].DeptDesc + "</li>";
        }
        $("#drpdwnBU").append(list);
    }
    else {
        $("#drpdwnBU").append(list);
    }
}

//================================================== Pie Chart for Buddies ==================================

function GetPieChartBuddy() {
    $.ajax({
        type: 'POST',
        url: 'Admin_view_buddy.aspx/GetPieChartBuddy',
        contentType: 'application/json',
        dataType: 'json',
        processData: false,

        success: function (response) {
            onsuccessGetPieChartBuddy(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            onerrorGetPieChartBuddy(xhr.status, thrownError);
        }
    });
}
function onerrorGetPieChartBuddy(status, thrownError) {
    alert("Something is wrong here, Please try again after sometime.");
}

function onsuccessGetPieChartBuddy(result) {
    var result = eval('(' + result.d + ')');
    document.getElementById("Non_Con_buddies").innerHTML = result.NonConnected_buddies;
    document.getElementById("Con_buddies").innerHTML = result.Connected_buddies;
    document.getElementById("td_NotConnBuddy").innerHTML = result.NonConnected_buddies;
    document.getElementById("td_ConnBuddy").innerHTML = result.Connected_buddies;
    $(function () {
        var values = [],
            labels = [];
        $("tr").each(function () {
            values.push(parseInt($("td", this).text(), 10));
            labels.push($("th", this).text());
        });
        $("table").hide();
        document.getElementById("holder").innerHTML = '';
        Raphael("holder", 200, 200).pieChart(70, 60, 40, values, labels, "#626262");
    });
}

//============================================== Dashboard Data for buddies ========================================

function GetDashBoardData() {
    var val;
    var bu;
    if (document.getElementById("BUListValue").value != "")
        bu = document.getElementById("BUListValue").value;
    else
        bu = "All";
    var type = $("#TypeValue").val();
    if (type == "0")
        val = false;
    else
        val = true;
        
    //298015 - Country dropdown
    var CountryId = $("#hiddenCountryId").val();
    if (CountryId == '' || CountryId == 'undefined' || CountryId == null) {
        CountryId = '0'; //0- stands for Country All
    }

    $.ajax({
        type: 'POST',
        url: 'Admin_view_buddy.aspx/GetDashBoardData',
        contentType: 'application/json',
        data: "{bU:'" + bu + "',chk:'" + val + "', countryId:'" + CountryId + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            OnSuccessGetDashBoardData(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            OnErrorGetDashBoardData(xhr.status, thrownError);
        }
    });
    //    return true;
}
function OnSuccessGetDashBoardData(result) {
    var buddy = eval('(' + result.d + ')');
    var a = buddy.DashBoardData.length;
    var detaillist = "";
    var list = "";

    $("#BuddyData").html('');
    $(".connections").html('');

    if (a != 0) {
        $('.notifications_content_right').removeClass('hiddenDiv');
        $('.connection_status_wrapper').removeClass('hiddenDiv');

        for (var i = 0; i < a; i++) {            

            if (i == 0) {
                list += "<div class='notifications_left_item selected'>";
            }
            else {
                list += "<div class='notifications_left_item'>";
            }
            list += "<span class='notifications_left_sl_no'>" + (i + 1) + "</span>";

            var request = new XMLHttpRequest;
            request.open('GET', "ShowImage.ashx?id=" + buddy.DashBoardData[i].BuddyId + "", false);
            request.send();
            if (request.status === 200) {
                list += "<span class='notifications_left_image'><img class='background-size-cover' runat='server' src='ShowImage.ashx?id=" + buddy.DashBoardData[i].BuddyId + "' alt='' /></span>";
            }
            else {
                list += "<span class='notifications_left_image'><img class='background-size-cover' src='Resources/Images/dummy_image.jpg'  alt='Image'/></span>";
            }

            list += "<div class='notifications_left_details fleft'>";
            var UserName = (buddy.DashBoardData[i].BuddyName.length < 18 ? (buddy.DashBoardData[i].BuddyName) : (buddy.DashBoardData[i].BuddyName.substring(0, 18) + '...'));
            list += "<p class='font_name'>" + UserName + "</p>";            
            list +="<p style='font:lighter 12px Segoe UI'>" + buddy.DashBoardData[i].Designation + "</p>";
            list +="</div>";
            list +="</div>";
            connectionsArray[i] = new Array(a);
            connectionsArray[i][0] = buddy.DashBoardData[i].BuddyName;
            connectionsArray[i][1] = buddy.DashBoardData[i].Designation;
            connectionsArray[i][2] = buddy.DashBoardData[i].Connection;
            connectionsArray[i][3] = buddy.DashBoardData[i].AvgFeedback;
            connectionsArray[i][4] = buddy.DashBoardData[i].BuddyId;
        }

        $("#BuddyData").append(list);

        var HistorySelectedUserId = buddy.DashBoardData[0].BuddyId;
        var HistorySelectedUserEmailId;
        HistorySelectedUserEmailId = GetAssociateEmailId(HistorySelectedUserId);
      
        if (HistorySelectedUserEmailId != false) {
            $("#buddy_name").html('');
            $("#buddy_name").append(buddy.DashBoardData[0].BuddyName + "        " + "<br><img style='cursor:pointer;' src='Resources/Images/presence_16-unknown.png' id ='imgCommunicatorStatus' title='Status' /><img title='Ping me' src='Resources/Images/communicator3.png' style='width:20px;cursor:pointer;margin-left:3px;' onclick='OpenCommunicatorTileView();'/><img src='Resources/Images/outlook.jpg' style='width:20px;cursor:pointer;margin-left:4px;' title='Mail' onclick='SendEmail();'/>");
        }
        else {
            $("#buddy_name").html('');
            $("#buddy_name").append(buddy.DashBoardData[0].BuddyName);
        }
        
        document.getElementById("buddy_designation").innerHTML = buddy.DashBoardData[0].Designation;
        document.getElementById("Connections").innerHTML = buddy.DashBoardData[0].Connection;
        $('.notifications_content_right').attr('id', buddy.DashBoardData[0].BuddyId);
        var type = $("#TypeValue").val();
        if (type == "0") {
            $("#pAvgFeedbackLabel").hide();
        }
        else {
            $("#pAvgFeedbackLabel").show();
            if (buddy.DashBoardData[0].AvgFeedback == null || buddy.DashBoardData[0].AvgFeedback == 0) {
                document.getElementById("Avgfeedback").innerHTML = 'Nil'; 
            }
            else {
                document.getElementById("Avgfeedback").innerHTML = buddy.DashBoardData[0].AvgFeedback;
            }
        }
        
        document.getElementById("User_Id").value = buddy.DashBoardData[0].BuddyId;

        var request = new XMLHttpRequest;
        request.open('GET', "ShowImage.ashx?id=" + buddy.DashBoardData[0].BuddyId + "", false);
        request.send();
        if (request.status === 200) {
            $("#buddy_img").attr('src', 'ShowImage.ashx?id=' + buddy.DashBoardData[0].BuddyId + '');
        }
        else {
            $("#buddy_img").attr('src', 'Resources/Images/dummy_image.jpg');
        }

        //298015- Pie chart data refreshed
        document.getElementById("Non_Con_buddies").innerHTML = buddy.NonConnected_buddies;
        document.getElementById("Con_buddies").innerHTML = buddy.Connected_buddies;
        document.getElementById("td_NotConnBuddy").innerHTML = buddy.NonConnected_buddies;
        document.getElementById("td_ConnBuddy").innerHTML = buddy.Connected_buddies;
        $(function () {
            var values = [],
            labels = [];
            $("tr").each(function () {
                values.push(parseInt($("td", this).text(), 10));
                labels.push($("th", this).text());
            });
            $("table").hide();
            document.getElementById("holder").innerHTML = '';
            Raphael("holder", 200, 200).pieChart(70, 60, 40, values, labels, "#626262");
        });
        
        $("div#BuddyData.notifications_content_left.mousescroll").scrollTop(0);
        $("#BuddyData").parent().find('.slimScrollBar')[0].style.top = 0;       
    }
    else {
        $('.overlay').show();
        $('.error_popup').fadeIn();
        $("#lblCommonInfoPopup").html('');
        $("#lblCommonInfoPopup").append("No Connections Found !");

        $('.notifications_content_right').addClass('hiddenDiv');
        $('.connection_status_wrapper').addClass('hiddenDiv');
        $("#BuddyData").append("<label style='top:100px;position:absolute;right:-150px;color:#ffffff'>No Connections Found...!!!</label>");

        /*
        document.getElementById("selectbuddy").innerHTML = "All";
        document.getElementById("select_buddyview").innerHTML = "Buddy View";        
        document.getElementById("BUListValue").value = "";
        document.getElementById('TypeValue').value = 1;
        //298015 - Country drpdwn        
        document.getElementById("selectCountry").innerHTML = "All";
        $("#hiddenCountryId").val('0');

        //298015 - Calling dashboarddata func instead GetAllBuddiesDashBoard
        //GetAllBuddiesDashBoard();
        GetDashBoardData();
        */
    }

}
function OnErrorGetDashBoardData(status, error) {

    //  alert("Some information cann't be loaded, sorry for inconvenience");
}

//============================== GetAllBuddiesDashboard ===========================================
function GetAllBuddiesDashBoard() {
    var bodyId = $('body').attr('id');
    document.getElementById('TypeValue').value = 1;
    $.ajax({
        type: 'POST',
        url: '' + bodyId + '.aspx/GetAllBuddiesDashBoard',
        contentType: 'application/json',
        data: "{}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            OnSuccessAllBuddiesDashBoard(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            OnErrorAllBuddiesDashBoard(xhr.status, thrownError);
        }
    });
    //    return true;
}
function OnSuccessAllBuddiesDashBoard(result) {
    var buddy = eval('(' + result.d + ')');
    var a = buddy.DashBoardData.length;
    var detaillist = "";
    var list = "";
    $("#BuddyData").html('');

    if (a != 0) {
        $('.notifications_content_right').removeClass('hiddenDiv');
        $('.connection_status_wrapper').removeClass('hiddenDiv');

        for (var i = 0; i < a; i++) {
            if (i == 0) {
                list += "<div class='notifications_left_item selected'>";
            }
            else {
                list += "<div class='notifications_left_item'>";
            }

            list += "<span class='notifications_left_sl_no'>" + (i + 1) + "</span>";
            
            var request = new XMLHttpRequest;
            request.open('GET', "ShowImage.ashx?id=" + buddy.DashBoardData[i].BuddyId + "", false);
            request.send();
            if (request.status === 200) {
                list += "<span class='notifications_left_image'><img class='background-size-cover' runat='server' src='ShowImage.ashx?id=" + buddy.DashBoardData[i].BuddyId + "' alt='' /></span>";
            }
            else {
                list += "<span class='notifications_left_image'><img class='background-size-cover' src='Resources/Images/dummy_image.jpg'  alt='Image'/></span>";
            }


            list += "<div class='notifications_left_details fleft'>";
            var UserName = (buddy.DashBoardData[i].BuddyName.length < 18 ? (buddy.DashBoardData[i].BuddyName) : (buddy.DashBoardData[i].BuddyName.substring(0, 18) + '...'));
            list += "<p class='font_name'>" + UserName + "</p>";
           
            list += "<p style='font:lighter 12px Segoe UI'>" + buddy.DashBoardData[i].Designation + "</p>";
            list += "</div>";
            list += "</div>";
            connectionsArray[i] = new Array(a);
            connectionsArray[i][0] = buddy.DashBoardData[i].BuddyName;
            connectionsArray[i][1] = buddy.DashBoardData[i].Designation;
            connectionsArray[i][2] = buddy.DashBoardData[i].Connection;
            connectionsArray[i][3] = buddy.DashBoardData[i].AvgFeedback;
            connectionsArray[i][4] = buddy.DashBoardData[i].BuddyId;
            document.getElementById("User_Id").value = buddy.DashBoardData[i].BuddyId;

        }

        $("#BuddyData").append(list);

        var HistorySelectedUserId = buddy.DashBoardData[0].BuddyId;
        var HistorySelectedUserEmailId;
        HistorySelectedUserEmailId = GetAssociateEmailId(HistorySelectedUserId);

        if (HistorySelectedUserEmailId != false) {
            $("#buddy_name").html('');
            $("#buddy_name").append(buddy.DashBoardData[0].BuddyName + "        " + "<br><img style='cursor:pointer;' src='Resources/Images/presence_16-unknown.png' id ='imgCommunicatorStatus' title='Status' /><img title='Ping me' src='Resources/Images/communicator3.png' style='width:20px;cursor:pointer;margin-left:3px;' onclick='OpenCommunicatorTileView();'/><img src='Resources/Images/outlook.jpg' style='width:20px;cursor:pointer;margin-left:4px;' title='Mail' onclick='SendEmail();'/>");
        }
        else {
            $("#buddy_name").html('');
            $("#buddy_name").append(buddy.DashBoardData[0].BuddyName);
        }
       
        document.getElementById("buddy_designation").innerHTML = buddy.DashBoardData[0].Designation;
        document.getElementById("Connections").innerHTML = buddy.DashBoardData[0].Connection;
        $('.notifications_content_right').attr('id', buddy.DashBoardData[0].BuddyId);
        if (buddy.DashBoardData[0].AvgFeedback == null || buddy.DashBoardData[0].AvgFeedback == 0) {
            document.getElementById("Avgfeedback").innerHTML = 'Nil'
        }
        else {
            document.getElementById("Avgfeedback").innerHTML = buddy.DashBoardData[0].AvgFeedback;
        }
        document.getElementById("User_Id").value = buddy.DashBoardData[0].BuddyId;

        var request = new XMLHttpRequest;
        request.open('GET', "ShowImage.ashx?id=" + buddy.DashBoardData[0].BuddyId + "", false);
        request.send();
        if (request.status === 200) {
            $("#buddy_img").attr('src', 'ShowImage.ashx?id=' + buddy.DashBoardData[0].BuddyId + '');
        }
        else {
            $("#buddy_img").attr('src', 'Resources/Images/dummy_image.jpg');
        }
    }
    else {
        $('.notifications_content_right').addClass('hiddenDiv');
        $('.connection_status_wrapper').addClass('hiddenDiv');
        $("#BuddyData").append("<label style='top:100px;position:absolute;right:-150px;color:#ffffff'>No Connections Found...!!!</label>");
    }
    document.getElementById("selectbuddy").innerHTML = "All";
    document.getElementById("select_buddyview").innerHTML = "Buddy View";
    document.getElementById("BUListValue").value = "All";
    document.getElementById("selectCountry").innerHTML = "All";
}

function OnErrorAllBuddiesDashBoard(status, error) {
    
}

//==================================  GetDashboardConnectionsofUserForBuddies ===========================================

$('.connections_close').livequery("click", function () {
    $('.overlay, .connections').hide();
});
$('.config_error_close').livequery("click", function () {
    $('.overlay, .connections').hide();
});
function GetDashboardConnectionsofUser() {
    var type = $("#TypeValue").val();
    if (type == "0")
        val = false;
    else
        val = true;
      var JoineeId = $('.notifications_content_right')[0].id;
    $.ajax({
        type: 'POST',
        url: 'Admin_view_buddy.aspx/GetDashboardConnectionsofUser',
        contentType: 'application/json',
        data: "{datauserid:'" + JoineeId + "',chk:'" + val + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            OnSuccessGetDashboardConnectionsofUser(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            OnErrorGetDashboardConnectionsofUser(xhr.status, thrownError);

        }
    });
}

function OnErrorGetDashboardConnectionsofUser(status, thrownError) {

}

function OnSuccessGetDashboardConnectionsofUser(result) {

    $(".connections").html('');
    var buddy = eval('(' + result.d + ')');
    var i = 0;
    var j = 0;
    var list = "";
    var list1 = "";
    list += "<div class='contact_card_header clear'>";
    list += "<p>Connected to</p>";
    list += "<img src='Resources/Images/contact_close.png' alt='Close' class='connections_close'/>";
    list += "</div>";
    var a = buddy.DashBoardData.length;
    if (a == 0) {
        // list1 += " <div class='config_error'>";
        list1 += "<div class='contact_card_header clear'>";
        list1 += "<p>Connections</p>";
        list1 += "<img src='Resources/Images/contact_close.png' alt='Close' class='connections_close'/>";
        list1 += "</div>";
        list1 += "<div class='info_screen_details contact_details clear'>";
        list1 += "<p>";
        list1 += "<span style='margin-left:20px;'>No active connections found for this user!</span>";
        list1 += "</p>";
        list1 += "</div>";
        list1 += "<div class='contact_card_footer'></div>";
        //list1 += "</div>";
        $(".connections").append(list1);
    }

    page = a / 3;
    if (a%3 != 0) {
        page += 1;
    }

    if (a != 0) {
        if (a < 3) {
            list += "<div class='connections_screen_details contact_details clear visible'>";
            list += "<div class='connections_arrow connections_arrow_previous fleft' id='arrow_prev'></div>";

            for (i = 0; i < a; i++) {

                list += "<div class='connections_details_wrapper fleft' id='Connected_data'>";
                list += "<div class='user_image_bg'>";
                list += "<div class='shine'></div>";

                var request = new XMLHttpRequest;
                request.open('GET', "ShowImage.ashx?id=" + buddy.DashBoardData[i].BuddyId + "", false);
                request.send();
                if (request.status === 200) {
                    list += "<div class='thumbnail80'><img class='background-size-cover' id='Connected_img' alt='User' src='ShowImage.ashx?id=" + buddy.DashBoardData[i].BuddyId + "' alt='' /></div>";
                }
                else {
                    list += "<div class='thumbnail80'><img class='background-size-cover' id='Connected_img' alt='User' src='Resources/Images/dummy_image.jpg' /></div>";
                }

                list += "</div>";
                var UserName = buddy.DashBoardData[i].BuddyName.length < 18 ? (buddy.DashBoardData[i].BuddyName) : (buddy.DashBoardData[i].BuddyName.substring(0, 18) + '...');
                list += "<p class='font_20' id='Connected_name'>" + UserName + "</p>";
                list += "<p id='Connected_designation'>" + buddy.DashBoardData[i].Designation + "</p>";
                list += "<p id='Connected_date'>" + buddy.DashBoardData[i].Connection + "</p>";
                list += "</div>";

            }
            list += "<div class='connections_arrow connections_arrow_next fleft'  id='buddy_arrow'></div>";
            list += "</div>";
            list += "<div class='contact_card_footer'></div>";
            $(".connections").append(list);
            $('.connections_arrow_next').hide();
            $('.connections_arrow_previous').hide();

        }
        else {
            for (j = 0; j < parseInt(page); j++) {
                if (j == 0) {
                    list += "<div class='connections_screen_details contact_details clear visible'>";
                    list += "<div class='connections_arrow connections_arrow_previous fleft' id='arrow_prev'></div>";
                    var c = i + 3;

                    for (; i < c; i++) {

                        list += "<div class='connections_details_wrapper fleft' id='Connected_data'>";
                        list += "<div class='user_image_bg'>";
                        list += "<div class='shine'></div>";
                        
                        var request = new XMLHttpRequest;
                        request.open('GET', "ShowImage.ashx?id=" + buddy.DashBoardData[i].BuddyId + "", false);
                        request.send();
                        if (request.status === 200) {
                            list += "<div class='thumbnail80'><img class='background-size-cover' id='Connected_img' alt='User' src='ShowImage.ashx?id=" + buddy.DashBoardData[i].BuddyId + "' alt='' /></div>";
                        }
                        else {
                            list += "<div class='thumbnail80'><img class='background-size-cover' id='Connected_img' alt='User' src='Resources/Images/dummy_image.jpg' /></div>";
                        }
                        list += "</div>";
                        list += "<p class='font_20' id='Connected_name'>" + buddy.DashBoardData[i].BuddyName + "</p>";
                        list += "<p id='Connected_designation'>" + buddy.DashBoardData[i].Designation + "</p>";
                        list += "<p id='Connected_date'>" + buddy.DashBoardData[i].Connection + "</p>";
                        list += "</div>";

                    }
                    list += " <div class='connections_arrow connections_arrow_next fleft'  id='buddy_arrow'></div>";
                    list += " </div>";
                }
                else {

                    list += "<div class='connections_screen_details contact_details clear hiddenDiv'>";
                    list += "<div class='connections_arrow connections_arrow_previous fleft' id='arrow_prev'></div>";
                    var c = i + 3;
                    if (c > a) {
                        c = a;
                    }

                    for (; i < c; i++) {

                        list += "<div class='connections_details_wrapper fleft' id='Connected_data'>";
                        list += "<div class='user_image_bg'>";
                        list += "<div class='shine'></div>";

                        var request = new XMLHttpRequest;
                        request.open('GET', "ShowImage.ashx?id=" + buddy.DashBoardData[i].BuddyId + "", false);
                        request.send();
                        if (request.status === 200) {
                            list += "<div class='thumbnail80'><img class='background-size-cover' id='Connected_img' alt='User' src='ShowImage.ashx?id=" + buddy.DashBoardData[i].BuddyId + "' alt='' /></div>";
                        }
                        else {
                            list += "<div class='thumbnail80'><img class='background-size-cover' id='Connected_img' alt='User' src='Resources/Images/dummy_image.jpg' /></div>";
                        }

                        list += "</div>";
                        var UserName = buddy.DashBoardData[i].BuddyName.length < 18 ? (buddy.DashBoardData[i].BuddyName) : (buddy.DashBoardData[i].BuddyName.substring(0, 18) + '...');
                        list += "<p class='font_20' id='Connected_name'>" + UserName + "</p>";
                        
                        list += "<p id='Connected_designation'>" + buddy.DashBoardData[i].Designation + "</p>";
                        list += "<p id='Connected_date'>" + buddy.DashBoardData[i].Connection + "</p>";
                        list += "</div>";
                    }
                    list += "<div class='connections_arrow connections_arrow_next fleft'  id='buddy_arrow'></div>";
                    list += "</div>";
                }
            }
            list += "<div class='contact_card_footer'></div>";
            $(".connections").append(list);

            if (a < 3 || a == 0) {
                $('.connections_arrow_next').hide();
                $('.connections_arrow_previous').hide();
            }
            else {
                $('.connections_arrow_next').show();
                $('.connections_arrow_previous').hide();
            }

            $('.connections_arrow_next').livequery('click', function () {
                var $current = $('.connections_screen_details.visible');
                if ($current.next('.connections_screen_details').length != 0) {
                    //$('.buddy_list').hide();
                    $current.removeClass('visible').hide();
                    $current.next('.connections_screen_details').show().addClass('visible').removeClass('hiddenDiv');
                    $('.background-size-cover').bgdSize('cover');
                }
                if ($current.next('.connections_screen_details').length >= parseInt(page) - 1) {
                    $('.connections_arrow_next').hide();

                }
                $('.connections_arrow_previous').show();
            });

            $('.connections_arrow_previous').livequery('click', function () {
                var $current = $('.connections_screen_details.visible');
                if ($current.prev('.connections_screen_details').length != 0) {
                    //$('.buddy_list').hide();
                    $current.removeClass('visible').hide();
                    $current.prev('.connections_screen_details').show().addClass('visible').removeClass('hiddenDiv');
                    $('.background-size-cover').bgdSize('cover');
                }
                if ($current.next('.connections_screen_details').length == 0) {
                    $('.connections_arrow_previous').hide();
                }
                $('.connections_arrow_next').show();
            });
        }
    }
}

//==========================================================================   ADD Admin ===========================================================

function GetAdminList() {
    var Admins;
    PageMethods.ShowingAdmin(onsubmitsuccess, onsubmiterror);
    function onsubmitsuccess(result, userContext, methodName) {
        Admins = eval('[' + result + ']');
        if (Admins != null) {
            var AdminView = '';
            for (var i = 0; i < Admins[0].length; i++) {
                AdminView = AdminView + '<div class="notifications_left_item">';
                AdminView = AdminView + '<span class="notifications_left_sl_no">' + (i + 1) + '</span>';
                var request = new XMLHttpRequest;
                request.open('GET', "ShowImage.ashx?id=" + Admins[0][i].UserId + "", false);
                request.send();
                if (request.status === 200) {
                    AdminView = AdminView + "<span class='notifications_left_image'><img class='background-size-cover' runat='server' src='ShowImage.ashx?id=" + Admins[0][i].UserId + "' alt='' /></span>";
                }
                else {
                    AdminView = AdminView + '<span class="notifications_left_image"><img class="background-size-cover" src="Resources/Images/dummy_image.jpg" /></span>';
                }
                AdminView = AdminView + '<div class="notifications_left_details fleft">';
                AdminView = AdminView + '<p class="font_name">' + Admins[0][i].UserName + '</p><p>' + Admins[0][i].Designation + '</p></div>';
                AdminView = AdminView + '<span class="margin_id">' + Admins[0][i].UserId + '</span>';
                AdminView = AdminView + '<a href="#" class="remove_admin_icon"><img src="Resources/Images/remove_admin.png" alt="Remove Admin"  onclick="RemovingAdmin(' + Admins[0][i].UserId + ')" /></a></div>';
                $('#adminlist').html(AdminView);
            }
        }

    }
    function onsubmiterror(error, userContext, methodName) {
        alert("oops Something went wrong please try after some time!");
    }
}
function RemovingAdmin(AdminId) {
    PageMethods.RemovingAdmin(AdminId, onsubmitsuccess, onsubmiterror);

    function onsubmitsuccess(result, userContext, methodName) {
        $('.overlay').show();
        $('.successful_popup').fadeIn();
        $("#lblSuccessfulPopup").html('');
        $("#lblSuccessfulPopup").append("You have successfully removed the admin !");
        GetAdminList();
    }
    function onsubmiterror(error, userContext, methodName) {
        $('.overlay').show();
        $('.error_popup').fadeIn();
        $("#lblCommonInfoPopup").html('');
        $("#lblCommonInfoPopup").append("Oops something went wrong please try after some time");
    }
}


var chk;
var val;
var Admins;
function CheckAdmin() {
    var a = $("#adminlist").children.length;
    if (a == 2) {
        var AdminID = document.getElementById('AddAdminID').value;
        for (var i = 0; i < $("#adminlist")[0].children.length; i++) {
            var id = ($("#adminlist")[0].children[i].children[3].innerText).replace(/\s/g, '');
            if (AdminID == id) {
                $('.overlay').show();
                $('.error_popup').fadeIn();
                $("#lblCommonInfoPopup").html('');
                $("#lblCommonInfoPopup").append("This user already has admin rights.");
                $('#AddAdminID').val('Enter ID here');
                return 0;
            }
        }
    }
    return 1;
}

function ValidateAdmin() {
    var AdminID = document.getElementById('AddAdminID').value;
    if (isNaN(AdminID) || AdminID == '' || AdminID.length != 6) {
        $('.overlay').show();
        $('.error_popup').fadeIn();
        $("#lblCommonInfoPopup").html('');
        $("#lblCommonInfoPopup").append("Please enter valid associate Id");
        $('#AddAdminID').val('Enter ID here');
        return 0;
    }
    else {
        return 1;
    }
}

function disableSubmit() {
    document.getElementById("checkAdminId").disabled = false;
    document.getElementById("addingadminid").disabled = true;
    $("#addingadminid").addClass('DisabledLink');
   }

function enableSubmit() {
    chk = CheckAdmin();
    if (chk == 0) {
        $('#AddAdminID').val('Enter ID here');
        return false;        
    }
    val = ValidateAdmin();
    if (chk == 1 && val == 1) {
        document.getElementById("checkAdminId").disabled = true;
        document.getElementById("addingadminid").disabled = false;
        $("#addingadminid").removeClass('DisabledLink');
        return 2;
    }
    else {
        document.getElementById("checkAdminId").disabled = false;
        document.getElementById("addingadminid").disabled = true;
        $("#addingadminid").addClass('DisabledLink');
        return false;
    }
}

var niadminid;
function SerarchNAME() {
    var enableAdmin = enableSubmit();
    if (enableAdmin == 2) {
        var adminname;
        niadminid = document.getElementById('AddAdminID').value;
        PageMethods.SearchNAME(niadminid, onsubmitsuccess, onsubmiterror);
        function onsubmitsuccess(result, userContext, methodName) {
            adminname = eval('[' + result + ']');
            if (adminname[0].UserName == null) {
                $('.overlay').show();
                $('.error_popup').fadeIn();
                $("#lblCommonInfoPopup").html('');
                $("#lblCommonInfoPopup").append("Associate not found.");
                $('#AddAdminID').val('Enter ID here');
                document.getElementById("checkAdminId").disabled = false;
                document.getElementById("addingadminid").disabled = true;
                $("#addingadminid").addClass('DisabledLink');
            }
            else {                
                $('#AddAdminID').val(adminname[0].UserName);
            }
        }
        function onsubmiterror(error, userContext, methodName) {
            document.getElementById("checkAdminId").disabled = false;
            document.getElementById("addingadminid").disabled = true;
            $("#addingadminid").addClass('DisabledLink');
            $('.overlay').show();
            $('.error_popup').fadeIn();
            $("#lblCommonInfoPopup").html('');
            $("#lblCommonInfoPopup").append("oops something went wrong please try after some time");
            $('#AddAdminID').val('Enter ID here');
        }
    }
    else { 
        
    }
}

function AddAdmin() {
    var CurrentUserId =  $('#CurrentUserId').val();
    if (niadminid == CurrentUserId) {
        $('.overlay').show();
        $('.error_popup').fadeIn();
        $("#lblCommonInfoPopup").html('');
        $("#lblCommonInfoPopup").append("You already have MasterAdmin rights.");
        $('#AddAdminID').val('Enter ID here');
        disableSubmit();
    }
    else if (niadminid != null || niadminid != '' || !(NaN(niadminid))) {
        PageMethods.AddingAdmin(niadminid, onsubmitsuccess, onsubmiterror);
        function onsubmitsuccess(result, userContext, methodName) {
            $('.overlay').show();
            $('.successful_popup').fadeIn();
            $("#lblSuccessfulPopup").html('');
            $("#lblSuccessfulPopup").append("You have successfully added the admin!");
            disableSubmit();
            $('#AddAdminID').val('Enter ID here');
            GetAdminList();
        }

        function onsubmiterror(error, userContext, methodName) {
            $('.overlay').show();
            $('.error_popup').fadeIn();
            $("#lblCommonInfoPopup").html('');
            $("#lblCommonInfoPopup").append("Oops something went wrong please try after some time");
            $('#AddAdminID').val('Enter ID here');
            disableSubmit();
        }
    }
    else {
        $('.overlay').show();
        $('.error_popup').fadeIn();
        $("#lblCommonInfoPopup").html('');
        $("#lblCommonInfoPopup").append("Oops something went wrong please try after some time");
        $('#AddAdminID').val('Enter ID here');
        disableSubmit();
    }

}

function CancelAddAdmin() {
    $('#AddAdminID').val('Enter ID here');
    document.getElementById("checkAdminId").disabled = false;
    document.getElementById("addingadminid").disabled = true;
    $("#addingadminid").addClass('DisabledLink');
}

//============================  Buddy Feedback ==========================================================================
function GetFeedbackHistory() {
    $.ajax({
        type: 'POST',
        url: 'Buddy_view_history.aspx/GetFeedbackHistory',
        contentType: 'application/json',
        data: "{buddy_Id:'" + $('#CurrentUserId').val() + "'}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            OnSuccessGetFeedbackHistory(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            OnErrorGetFeedbackHistory(xhr.status, thrownError);
        }
    });
}

function OnSuccessGetFeedbackHistory(result) {
    var Feedback = eval('(' + result.d + ')');
    var list = "";
    var avg = 0;
    if (Feedback.ObjFeedbackHistory.length != 0) {
        $('.feedback_popup, .overlay').fadeIn();
        $('#feedbk').html('');
        for (var i = 0; i < Feedback.ObjFeedbackHistory.length; i++) {
            list += "<div class='feedback_item'>";
            list += "<p class='heading'>Feedback " + (i + 1) + "</p>";
            list += "<p>" + Feedback.ObjFeedbackHistory[i].Comments + "</p>";
            avg += Feedback.ObjFeedbackHistory[i].Ratings;
            list += "</div>";
        }
        $('#feedbk').append(list);
        var stars = '';
        var a = Math.round(avg / Feedback.ObjFeedbackHistory.length);
               
        for (i = 0; i < 5; i++) {
            if (a != 0) {
                stars += '<div class="star filled"></div>';
                a--;
            }
            else {
                stars += '<div class="star empty"></div>';
            }
        }
        $('.feedback_stars').html(stars);
    }

    else {
        $('.feedback_popup, .overlay').fadeIn();
        $('#feedbk').html('');
        $('#feedbk').append("<label style='font:16px; margin-left:300px' id='lblnofeedback'>No Feedback Found</label>");
        //               $('.feedback_stars').html('<div class="star empty"></div>');
    }
}

function OnErrorGetFeedbackHistory(status, error) {
    $('.overlay').fadeIn();
    $('.error_popup').fadeIn();
    $("#lblCommonInfoPopup").html('');
    $("#lblCommonInfoPopup").append("Unable to retrieve your feedbacks. Please try after sometime."); 
    
}

//***************************************************Admin_view_buddy.aspx***************************************************
//============================================================Export To Excel====================================================
function GetExcelData() {
    //298015 - Country dropdown
    var CountryId = $("#hiddenCountryId").val();
    if (CountryId == '' || CountryId == 'undefined' || CountryId == null) {
        CountryId = '0'; //0- stands for Country All
    }
    $.ajax({
        type: 'POST',
        url: 'Admin_view_buddy.aspx/ExportToExcel',
        contentType: 'application/json',
        data: "{CountryId:'" + CountryId + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            return;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            return;
        }
    });
}

//===================================================================================================================================

//********************************************************** GetBuddyNotify popup ***********************************************
function GetBuddyNotify() {

    var BuddyId = $('#CurrentUserId').val();
    $.ajax({
        type: 'POST',
        url: 'buddy_view_other_buddies.aspx/GetBuddyNotify',
        contentType: 'application/json',
        data: "{buddyID:'" + BuddyId + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            onsuccessGetBuddyNotify(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            onerrorGetBuddyNotify(xhr.status, thrownError);
        }
    });
}
function onerrorGetBuddyNotify(status, thrownError) {
    //  alert("Something is wrong here, Please try again after sometime.");
}

function onsuccessGetBuddyNotify(result) {
    var buddy = eval('(' + result.d + ')');
    var i = 0;
    var a = buddy.BuddyNotify.length;
    var list = "";

    $("#dvNotificationList").html('');
    if (a != 0) {
        for (i = 0; i < a; i++) {
            list += "<div class='notifications_popup_item clear' id='notify_popup'>";
            list += "<div class='notifications_popup_image'>";

            var request = new XMLHttpRequest;
            request.open('GET', "ShowImage.ashx?id=" + buddy.BuddyNotify[i].UserId + "", false);
            request.send();
            if (request.status === 200) {
                list += "<img class='background-size-cover' runat='server' src='ShowImage.ashx?id=" + buddy.BuddyNotify[i].UserId + "' alt='' />";
            }
            else {
                list += "<img class='background-size-cover' src='Resources/Images/dummy_image.jpg'  alt='Image'/>";
            }

            list += "</div>";
            list += "<div class='notifications_popup_details'>";
            var UserName = buddy.BuddyNotify[i].BuddyName.length < 18 ? buddy.BuddyNotify[i].BuddyName : buddy.BuddyNotify[i].BuddyName.substring(0, 18) + '...'; 
            list += "<p class='font_16' id='Connected_name'>" + UserName + "</p>";
           
            
            if (buddy.BuddyNotify[i].ConnectionStatus == "Disconnection Pending") {
                list += "<p>Joinee has send disconnection request</p>";
            }
            if (buddy.BuddyNotify[i].ConnectionStatus == "Request Pending") {
                list += "<p>wants to be your Joinee</p>";
            }            

            list += "</div>";
            list += "<div class='notification_popup_btns'>";
            if (buddy.BuddyNotify[i].ConnectionStatus == "Disconnection Pending") {
                list += "<div class='notifications_popup_btn accept_btn' onclick='DisconnectionRequest(\"" + buddy.BuddyNotify[i].UserId + "\",\"" + $('#CurrentUserId').val() + "\")',\"" + 'Buddy' + "\",\"" + 'Accept' + "\")'>Accept</div>";
                list += "<div class='notifications_popup_btn reject_btn' onclick='BuddyRejectComment(\"" + buddy.BuddyNotify[i].UserId + "\")'>Reject</div>";
                
            }
            if (buddy.BuddyNotify[i].ConnectionStatus == "Request Pending") {
                list += "<div class='notifications_popup_btn accept_btn' onclick='BuddyConnectionRequest(\"" + buddy.BuddyNotify[i].UserId + "\",\"" + $('#CurrentUserId').val() + "\",\"" + 'Accept' + "\",\"" + ' ' + "\")'>Accept</div>";
                list += "<div class='notifications_popup_btn reject_btn' onclick='BuddyRejectComment(\"" + buddy.BuddyNotify[i].UserId + "\")'>Reject</div>";
            }
            list += "</div>";
            list += "</div>";
        }
    }
    else {
        list += "<BR>";
        list += "<BR>";
        list += "<BR>";
        list += "<BR>";
        list += "<BR>";
        list += "<BR>";
        list += "<BR>";
        list += "<div align='center'><h2>No records found.</h2></div>";
    }

    $('#dvNotificationList').append(list);

    // document.getElementById('JoineeIdReject').value = buddy.BuddyNotify[0].UserId;
}

function BuddyRejectComment(JoineeId) {
    $('.overlay').show();
    $('.reject_request_popup').fadeIn("slow");
    $('.notifications_popup').hide();
    document.getElementById('JoineeIdReject').value = JoineeId;
}

/******************************************************** DisconnectionRequest popup ************************************************************************/
function DisconnectionRequest(JoineeId, BuddyId, ByWhom, RequestType) {

    var BuddyId = $('#CurrentUserId').val();
    var ByWhom = 'Buddy';
    $.ajax({
        type: 'POST',
        url: 'buddy_view_other_buddies.aspx/DisconnectionRequest',
        contentType: 'application/json',
        data: "{JoineeId:'" + JoineeId + "',BuddyId:'" + BuddyId + "',ByWhom:'" + ByWhom + "',RequestType:'" + RequestType + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            onsuccessDisconnectionRequest(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            onerrorDisconnectionRequest(xhr.status, thrownError);
        }
    });
}
function onsuccessDisconnectionRequest() {
    var a = document.getElementById('unread_Notify').textContent;
    document.getElementById('unread_Notify').textContent = (a - 1);
    $('#notify_popup').click(function () {
        $(this).parent().slideToggle();
    });

}
function onerrorDisconnectionRequest() {
    GetBuddyNotify();
}

/******************************************************** GetBuddiesNotificationCount popup *************************************************************/
function GetBuddiesNotificationCount() {

    var Userid = $('#CurrentUserId').val();
    var type = 'Buddy';
    var bodyId = $('body').attr('id');
    $.ajax({
        type: 'POST',
        url: '' + bodyId + '.aspx/GetBuddyJoineeNotificationCount',
        contentType: 'application/json',
        data: "{userid:'" + Userid + "',type:'" + type + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            onsuccessGetBuddiesNotification(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            onerrorGetBuddiesNotification(xhr.status, thrownError);
        }
    });
}
function onsuccessGetBuddiesNotification(result) {
    $('#unread_Notify').show();
    var count = eval('(' + result.d + ')');
    var a = count.BuddyNotify.length;
    if (a > 0) {
        $('#unread_Notify').show();
        document.getElementById('unread_Notify').textContent = a;
    }
    else {
        $('#unread_Notify').hide();
    }

}
function onerrorGetBuddiesNotification() {
}

//*********************************************************** BuddyConnectionRequest popup *************************************************************

function BuddyConnectionRequest(JoineeId, BuddyId, RequestType, RejectionComment) {

    var BuddyId = $('#CurrentUserId').val();    
    $.ajax({
        type: 'POST',
        url: 'buddy_view_other_buddies.aspx/BuddyConnectionRequest',
        contentType: 'application/json',
        data: "{joineeId:'" + JoineeId + "',buddyId:'" + BuddyId + "',requestType:'" + RequestType + "',rejectionComment:'" + RejectionComment + "',supervisorRecommended:'0'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            onsuccessBuddyConnectionRequest(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            onerrorBuddyConnectionRequest(xhr.status, thrownError);
        }
    });
}
function onsuccessBuddyConnectionRequest() {
    var a = document.getElementById('unread_Notify').textContent;
    document.getElementById('unread_Notify').textContent = (a - 1);
    $('#notify_popup').click(function () {
        $(this).parent().slideToggle();
    });

}
function onerrorBuddyConnectionRequest() {
}

var arr;
function SearchAssoData() {
    var SearchText = $("#UserId").val();
   
    $.ajax({
        type: 'POST',
        url: bodyId + '.aspx/SearchAssoData',
        contentType: 'application/json',
        data: "{searchText:'" + SearchText + "'}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            OnSuccessSearchAssoData(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {

            OnErrorSearchAssoData(xhr.status, thrownError);
        }
    });
}

function OnSuccessSearchAssoData(result) {
    var datalist = eval('(' + result.d + ')');
    var a = datalist.BuddyList.length;
    for (i = 0; i < a; i++)
      {
        searchAssoList.push({ value: datalist.BuddyList[i].UserId, label: datalist.BuddyList[i].UserId + " " + datalist.BuddyList[i].UserName.substr(0, 10), desc: datalist.BuddyList[i].UserName.substr(0, 10) });
    }
  
}
function OnErrorSearchAssoData(err1, err2) {
    alert("Error in search data.");
}


//=============================================== Send mail through contact card ================================================
function SendEmail() {    
    var body = "Hi,";
    var To = $("#SendMailEmailId")[0].value;
    //var To = document.getElementById("SendMailEmailId").innerHTML; 
    var subject = "Buddy App Program";
    //window.location.href = "mailto:" + To + "?subject=" + subject + "&body=" + body;    

    try {
        var theApp = new ActiveXObject("Outlook.Application")
        var theMailItem = theApp.CreateItem(0) // value 0 = MailItem
        //Bind the variables with the email
        theMailItem.to = To
        theMailItem.Subject = subject;
        theMailItem.Body = body;
        //Show the mail before sending for review purpose
        //You can directly use the theMailItem.send() function
        //if you do not want to show the message.
        theMailItem.display();
    }
    catch (err) {
        window.open("mailto:" + To + "?subject=" + subject + "&body=" + body);
    }
}

//=============================================== Send mail through storyline ================================================
function MailToTMTeam() {
    var body = "Hi Team,";
    var To = "buddyapp@cognizant.com";    
    var subject = "Buddy App Program";
    //window.location.href = "mailto:" + To + "?subject=" + subject + "&body=" + body;
    window.open("mailto:" + To + "?subject=" + subject + "&body=" + body);
}

//===============================================================================================================================

function GetAssociateEmailId(UserId) {
    var bodyId = $('body').attr('id');
    $.ajax({
        type: 'POST',
        url: bodyId + '.aspx/GetContactCard',
        contentType: 'application/json',
        data: "{userId:'" + UserId + "'}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            var ContactCard = eval('(' + response.d + ')');
            if (ContactCard.UserId != 'Not Available' || ContactCard.UserId != '') {
                $("#SendMailEmailId").val(ContactCard.EmailId);
                //document.getElementById("SendMailEmailId").innerHTML = ContactCard.EmailId;
                $("#ccEmailId").val(ContactCard.EmailId);
                SPEEDIMNRC();                                
                return ContactCard.EmailId;
            }
            else
                return false;
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });
}
// ==================================================  Get PageContent =================================================================
function GetPageContent() {
    var PageName = $('body').attr('id');
    var CountryId = $('#CountryId').val();
    var Role = 'Buddy';

    $.ajax({
        type: 'POST',
        url: bodyId + '.aspx/GetPageContent',
        contentType: 'application/json',
        data: "{countryId:'" + CountryId + "',pageName:'" + PageName + "',role:'" + Role + "'}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            var PageContent = eval('(' + response.d + ')');
            var length = PageContent.PageContentDetails.length;
           // var Tile = PageContent.PageContentDetails[0].TileNo;
            for (var i = 0; i < length; i++) {
                document.getElementById('reader' + i).innerHTML = PageContent.PageContentDetails[i].Reader;
                document.getElementById('content' + i).innerHTML = PageContent.PageContentDetails[i].Content;
            }
            document.getElementById('lblConnectionDuration').innerHTML = ConnectionDuration.value;
            document.getElementById('lblDurationStoryline1').innerHTML = ConnectionDuration.value;
            document.getElementById('lblDurationStoryline2').innerHTML = ConnectionDuration.value;
            document.getElementById('lblDurationStoryline3').innerHTML = ConnectionDuration.value;
            document.getElementById('lblDurationStoryline4').innerHTML = ConnectionDuration.value;
            document.getElementById('lblAcceptanceCountOfRegBuddy').innerHTML = AcceptanceCountOfRegBuddy.value;
            document.getElementById('lblAcceptanceCountOfUnRegBuddy').innerHTML = AcceptanceCountOfUnRegBuddy.value;

        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });
}

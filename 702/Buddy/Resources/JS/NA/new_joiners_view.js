var connectionsArray = new Array(5);
var buddyRequestNotificationsArray = new Array(5);
var alertsNotificationArray = new Array(9);
var othersNotificationArray = new Array(5);
var historyArray = new Array(8);
var generalNS = {
    bodyId: $('body').attr('id'),
    init: function () {
        $('.info_btn, .info_btn_tile').on("click", function () {
            $('.overlay').show();
            $('.info_screen').fadeIn("slow");
            $('.header, .cindy_circles, .circles, .circles_wrapper, .search_wrapper, .search_btn, .draggable, .drop_circle, .buddy_list_nav_prev, .buddy_list_nav_next').addClass('blur');
        });

        $('.info_screen_close').on("click", function () {
            $('.overlay, .info_screen').hide();
            $('.blur').removeClass('blur');
        });

        $('body').jKit();
        $('.home_btn').jKit('tooltip', { 'classname': 'headerToolTip', 'text': 'Go to Home' });
        $('.info_btn').jKit('tooltip', { 'classname': 'headerToolTip', 'text': 'About Buddy App' });
        $('.notifications_btn').jKit('tooltip', { 'classname': 'headerToolTip', 'text': 'Check out the Notifications' });
        $('.circles_btn').jKit('tooltip', { 'classname': 'headerToolTip', 'text': 'Search for a buddy in your Circles' });
        $('.history_header_btn').jKit('tooltip', { 'classname': 'headerToolTip', 'text': 'Check out the History of connections' });
        $('.storyline_btn').jKit('tooltip', { 'classname': 'headerToolTip', 'text': 'Read the Storyline' });
        $('.check_name_btn').jKit('tooltip', { 'classname': 'headerToolTip', 'text': '<div class="bulleted1"><ul><li>Check for valid Id first</li><li>Then click on Add admin button.</li></ul></div>' });
        $('#addingadminid').jKit('tooltip', { 'classname': 'headerToolTip', 'text': 'Click if valid Admin' });

        var isTM = document.getElementById("isTM").value;
        var isSupervisor = document.getElementById("isSupervisor").value;
        var isMasteradmin = document.getElementById("isMasteradmin").value;
        if (isTM == "True" || isSupervisor == "True" || isMasteradmin == "True") {
            $('.admin_view_btn').show();
            $('.admin_view_btn').jKit('tooltip', { 'classname': 'headerToolTip', 'text': 'Change the app configuration' });
        }
        else {
            $('.admin_view_btn').hide();
        }
        $('.registered_available_btn').jKit('tooltip', { 'classname': 'headerToolTip', 'text': 'Show Enrolled/Available Buddies' });
        $('.select_buddy_btn').jKit('tooltip', { 'classname': 'headerToolTip', 'text': 'Select your buddy' });
        $(".menu_btn").on('mousemove', function (e) {
            yOffset = 10;
            xOffset = -30;

            $("#jkit-tooltip")
				.css("top", (e.pageY - xOffset) + "px")
				.css("left", (e.pageX + yOffset) + "px");
        });
    }
}

//========================================================= storyline ===========================================================
var storylineNS = {
    init: function () {
        /* default view */
        $('#tab1').addClass('selected');

        $('.carouseltab').livequery("click", function () {
            $('.carouseltab').removeClass('selected');
            $(this).addClass('selected');
            var tabContentId = "#" + $(this).attr('id') + "_content";
            $('.carousel').addClass('display_none');
            $(tabContentId).removeClass('display_none').fadeIn();
        });


        $('.update_profile_popup_close').livequery("click", function () {
            $('.overlay, .update_profile_popup').hide();
            $('.blur').removeClass('blur');
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
    }
}

//========================================================= circle ===========================================================
var AdvisorId = '';
var Location_NA = '';
var BUId_NA = '';
var BUName_NA = '';
var ProjectId_NA = '';
var ProjectName_NA = '';
var AccountId_NA = '';
var AccountName_NA = '';

var circlesNS = {
    init: function () {
        drop_location = 'new_joiners_view_buddy_list.aspx';

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
			'<div class="bulleted"><ul><li>Search your  referral by Name or Emp-ID.</li><li>You can add buddy only 2 levels above your grade.</li></ul></div>'
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
                    data: "{SearchText:'" + request.term + "'}",
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
                AdvisorId = ui.item.value;
                $("#search-id").val(ui.item.value);
                $("#search-description").html(ui.item.desc);
                return false;
            }
        })
        //        .data("ui-autocomplete")._renderItem = function (ul, item) {
        //            return $("<li>")
        //            .append("<a href='#'>" + item.value + "<br/>" + item.desc + "</a>")
        //            .appendTo(ul);

        //        };
        //*************************************************** Project Names ***************************************************************
        $("#ProjectName").bind("focus", function (e) {
            var thisObj = $(this);
            if (thisObj.val() == "Search by ProjectName") {
                thisObj.val('');
            }
        });
        $("#ProjectName").bind("blur", function (e) {
            var thisObj = $(this);
            if (thisObj.val() == "") {
                thisObj.val('Search by ProjectName');
            }
        });

        // for project names
        $('#ProjectName').autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: 'POST',
                    url: $('body').attr('id') + '.aspx/SearchProject',
                    contentType: 'application/json',
                    dataType: 'json',
                    data: "{SearchText:'" + request.term + "'}",
                    success: function (data) {
                        var myData = eval('(' + data.d + ')');
                        response($.map(myData, function (item) {
                            return {
                                // label: item.Projectname + ' (' + item.ProjectId.replace(/\s+/g, '') + ')',
                                label: item.Projectname,
                                value: item.ProjectId.replace(/\s+/g, ''),
                                desc: item.Projectname
                            }
                        }));
                    }
                });
            },
            minLength: 3,
            focus: function (event, ui) {
                $('#ProjectName').val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                $('#ProjectName').val(ui.item.label);
                // $('#ProjectName').val(ui.item.value);
                ProjectId_NA = ui.item.value;
                ProjectName_NA = ui.item.label;
                $("#search-id").val(ui.item.value);
                $("#search-description").html(ui.item.desc);
                return false;
            }
        })

        //************************************************************** BU names ******************************************
        $("#BU").bind("focus", function (e) {
            var thisObj = $(this);
            if (thisObj.val() == "Search by BU") {
                thisObj.val('');
            }
        });
        $("#BU").bind("blur", function (e) {
            var thisObj = $(this);
            if (thisObj.val() == "") {
                thisObj.val('Search by BU');
            }
        });

        // for project names
        $('#BU').autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: 'POST',
                    url: $('body').attr('id') + '.aspx/SearchBU',
                    contentType: 'application/json',
                    dataType: 'json',
                    data: "{SearchText:'" + request.term + "'}",
                    success: function (data) {
                        var myData = eval('(' + data.d + ')');
                        response($.map(myData, function (item) {
                            return {
                                //label: item.Projectname + ' (' + item.ProjectId.replace(/\s+/g, '') + ')',
                                label: item.Projectname,
                                value: item.ProjectId.replace(/\s+/g, ''),
                                desc: item.Projectname
                            }
                        }));
                    }
                });

            },
            minLength: 3,
            focus: function (event, ui) {
                $('#BU').val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                $('#BU').val(ui.item.label);
                // $('#BU').val(ui.item.value);
                BUId_NA = ui.item.value;
                BUName_NA = ui.item.label;
                $("#search-id").val(ui.item.value);
                $("#search-description").html(ui.item.desc);
                return false;
            }
        })
        //**************************************************** Accounts Name ******************************************************
        $("#Account").bind("focus", function (e) {
            var thisObj = $(this);
            if (thisObj.val() == "Search by Account") {
                thisObj.val('');
            }
        });
        $("#Account").bind("blur", function (e) {
            var thisObj = $(this);
            if (thisObj.val() == "") {
                thisObj.val('Search by Account');
            }
        });

        // for project names
        $('#Account').autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: 'POST',
                    url: $('body').attr('id') + '.aspx/SearchAccount',
                    contentType: 'application/json',
                    dataType: 'json',
                    data: "{SearchText:'" + request.term + "'}",
                    success: function (data) {
                        var myData = eval('(' + data.d + ')');
                        response($.map(myData, function (item) {
                            return {
                                // label: item.Projectname + ' (' + item.ProjectId.replace(/\s+/g, '') + ')',
                                label: item.Projectname,
                                value: item.ProjectId.replace(/\s+/g, ''),
                                desc: item.Projectname
                            }
                        }));
                    }
                });
            },
            minLength: 3,
            focus: function (event, ui) {
                $('#Account').val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                $('#Account').val(ui.item.label);
                // $('#Account').val(ui.item.value);
                AccountId_NA = ui.item.value;
                AccountName_NA = ui.item.label;
                $("#search-id").val(ui.item.value);
                $("#search-description").html(ui.item.desc);
                return false;
            }
        })

        //***********************************************************************************************************************
        .data("ui-autocomplete")._renderItem = function (ul, item) {
            return $("<li>")
            .append("<a href='#'>" + item.value + "<br/>" + item.desc + "</a>")
            .appendTo(ul);

        };


        //*****************************************************************************************************************************

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
            var BuddyId = $("#ccUserId")[0].innerHTML;
            document.getElementById('BuddyEligibleId').value = BuddyId;
            var JoineeId = $("#CurrentUserId").val();
            if (BuddyId == JoineeId) {
                $('.error_popup').fadeIn();
                $("#lblCommonInfoPopup").html('');
                $("#lblCommonInfoPopup").append("You can't send Buddy request to yourself.");
            }
            else {
                CheckEligibility(BuddyId);
            }
        });

        $('.disagree_btn, .confirmation_popup_close').bind('click', function () {
            $('.confirmation_popup').hide();
            $('.contact_card').fadeIn();
        });

        $('.agree_btn').bind('click', function () {
            var BuddyId = $("#ccUserId")[0].innerHTML;
            var JoineeId = $("#CurrentUserId").val();
            var bodyId = $('body').attr('id');

            $.ajax({
                type: 'POST',
                url: '' + bodyId + '.aspx/BuddyConnectionRequest',
                contentType: 'application/json',
                data: "{JoineeId:'" + JoineeId + "',BuddyId:'" + BuddyId + "',RequestType:'Send',RejectionComment:''}",
                dataType: 'json',
                processData: false,
                success: function (response) {
                    OnSuccessSendBuddyRequest(response);
                },
                error: function (xhr, ajaxOptions, thrownError) {

                    OnErrorSendBuddyRequest(xhr.status, thrownError);
                }
            });
        });

        function OnSuccessSendBuddyRequest(result) {
            $('.confirmation_popup').hide();
            $('.sent_request_info_popup').fadeIn();
            document.getElementById('lblRequestedBuddyName').innerHTML = $("#ccDisplayName")[0].innerHTML;
        }

        function OnErrorSendBuddyRequest() {
            $('.confirmation_popup').hide();
            $('.error_popup').fadeIn();
            $("#lblCommonInfoPopup").html('');
            $("#lblCommonInfoPopup").append("Sorry, unable to send buddy request now. Try sometime later.");
        }

        $('.sent_request_info_popup_close').bind('click', function () {
            $('.sent_request_info_popup, .overlay').hide();
            $('.blur').removeClass('blur');
        });

        $('.ask_your_supervisor').bind("click", function () {
            $('.overlay').show();
            $('.ask_supervisor_popup').fadeIn("slow");
            $('.header').addClass('blur');

            var UserId = $("#CurrentUserId").val();
            $.ajax({
                type: 'POST',
                url: $('body').attr('id') + '.aspx/GetSupervisorDetails',
                contentType: 'application/json',
                data: "{UserId:'" + UserId + "'}",
                dataType: 'json',
                processData: false,
                success: function (response) {
                    document.getElementById('lblSupervisorName').innerHTML = response.d;
                },
                error: function (xhr, ajaxOptions, thrownError) {

                }
            });

        });

        $('.ask_supervisor_popup .ask_supervisor_agree').bind("click", function () {
            RaiseSupervisorRequest();
        });

        $('.ask_supervisor_popup_close, .ask_supervisor_popup .ask_supervisor_cancel').bind("click", function () {
            $('.overlay, .ask_supervisor_popup').hide();
            $('.blur').removeClass('blur');
        });
    }
}

//========================================================= buddylist ===========================================================
var buddyListNS = {
    init: function () {

        bodyId: $('body').attr('id');
        var UptoLevel = 2;
        var filter_type = $("#filter_type").val();
        if (filter_type == null || filter_type == "")
            filter_type = "Team";
        GetAllLikelyBuddies(filter_type, UptoLevel);

        /* tooltip */
        $('body').jKit();
        $('.search_btn').jKit('tooltip', { 'classname': 'mytooltip', 'text':
			'<div class="bulleted"><ul><li>Search your  referral by Name or Emp-ID.</li><li>You can add buddy only 2 levels above your grade.</li></ul></div>'
        });

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
            source: searchBuddyList,
            focus: function (event, ui) {
                $('.searchBox').val($.trim(ui.item.disp.substring(0, 15)) + ' (' + ui.item.value + ')');
                return false;
            },
            select: function (event, ui) {
                $('.searchBox').val($.trim(ui.item.disp.substring(0, 15)) + ' (' + ui.item.value + ')');
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
        $('.search_btn').livequery("click", function () {
            var UserId = $('.search_btn')[0].value;
            // var UserId = $('.searchBox')[0].value;
            if (isNaN(UserId)) {
                $('.overlay').show();
                $('.contact_card').hide();
                $('.error_popup').fadeIn();
                $("#lblCommonInfoPopup").html('');
                $("#lblCommonInfoPopup").append("Please enter the valid Associate ID/Associate Name.");
                $('#Searchtext').val('Search by name or Id');
            }
            else if (UserId == "") {
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
            window.location.href = "new_joiners_view_notifications.aspx";
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

        $('.send_buddy_request_btn').bind('click', function () {
            $('.contact_card').hide();
            var BuddyId = $("#ccUserId")[0].innerHTML;
            var JoineeId = $("#CurrentUserId").val();
            document.getElementById('BuddyEligibleId').value = BuddyId;
            CheckEligibility(BuddyId);

        });

        $('.disagree_btn, .confirmation_popup_close').bind('click', function () {
            $('.confirmation_popup').hide();
            $('.contact_card').fadeIn();
        });

        $('.agree_btn').bind('click', function () {
            var BuddyId = $("#ccUserId")[0].innerHTML;
            var JoineeId = $("#CurrentUserId").val();
            var bodyId = $('body').attr('id');

            $.ajax({
                type: 'POST',
                url: '' + bodyId + '.aspx/BuddyConnectionRequest',
                contentType: 'application/json',
                data: "{JoineeId:'" + JoineeId + "',BuddyId:'" + BuddyId + "',RequestType:'Send',RejectionComment:''}",
                dataType: 'json',
                processData: false,
                success: function (response) {
                    OnSuccessSendBuddyRequest(response);
                },
                error: function (xhr, ajaxOptions, thrownError) {

                    OnErrorSendBuddyRequest(xhr.status, thrownError);
                }
            });
        });

        function OnSuccessSendBuddyRequest(result) {
            $('.confirmation_popup').hide();
            $('.sent_request_info_popup').fadeIn();
            document.getElementById('lblRequestedBuddyName').innerHTML = $("#ccDisplayName")[0].innerHTML;
        }

        function OnErrorSendBuddyRequest() {
            $('.confirmation_popup').hide();
            $('.error_popup').fadeIn();
            $("#lblCommonInfoPopup").html('');
            $("#lblCommonInfoPopup").append("Sorry, unable to send buddy request now. Try sometime later.");
        }

        $('.sent_request_info_popup_close').bind('click', function () {
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

            var UserId = $("#CurrentUserId").val();
            $.ajax({
                type: 'POST',
                url: $('body').attr('id') + '.aspx/GetSupervisorDetails',
                contentType: 'application/json',
                data: "{UserId:'" + UserId + "'}",
                dataType: 'json',
                processData: false,
                success: function (response) {
                    document.getElementById('lblSupervisorName').innerHTML = response.d;
                },
                error: function (xhr, ajaxOptions, thrownError) {

                }
            });

        });

        $('.ask_supervisor_popup .ask_supervisor_agree').bind("click", function () {
            RaiseSupervisorRequest();
        });

        $('.ask_supervisor_popup_close, .ask_supervisor_popup .ask_supervisor_cancel ').bind("click", function () {
            $('.overlay, .ask_supervisor_popup').hide();
            $('.blur').removeClass('blur');
        });

    }
}


//========================================================= Home ===========================================================
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

//========================================================= history ===========================================================
var historyNS = {
    init: function () {
        GetJoineeHistory();

        /* tooltip */
        $('body').jKit();

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


        });

        $('.sent_request_info_popup_close').bind('click', function () {
            $('.sent_request_info_popup, .overlay').hide();
            $('.blur').removeClass('blur');
        });

        /* set background size to 'cover'*/
        $('.background-size-cover').livequery(function () {
            $(this).bgdSize('cover');
        });

        /* history details array */


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
                var status = historyArray[thisObjIndex][4]
                var FirstName = historyArray[thisObjIndex][5];
                var BuddyId = historyArray[thisObjIndex][6];
                var DisconnectionStatus = historyArray[thisObjIndex][7];
                $('.history_content_right .font_name').text(name);
                $('.history_content_right .designation').text(designation);
                $('.history_content_right .fromDate').text(fromDate);
                $('.history_content_right .toDate').text(toDate);
                $('.history_content_right .status').text(status);
                //$('.history_content_right .history_right_image img').attr('src', imgSrc);
                $('.history_content_right').attr('id', BuddyId);
                $('#feedbtn').attr('href', 'new_joiners_view_feedback.aspx?BuddyId=' + BuddyId + '');
                //$('.history_btn .feedback_btn').attr('href', "new_joiners_view_feedback.aspx?BuddyId=" + BuddyId + "");
                $('#name').text(FirstName);
                //                document.getElementById("name").innerHTML = historyArray[thisObjIndex][0];
                if (status == 'Done')
                    document.getElementById("changetext").innerHTML = "Your ealier buddy was  ";
                else
                    document.getElementById("changetext").innerHTML = "Your request has been accepted by  ";
                if (status == "Done" || DisconnectionStatus == "Disengaged from Joinee" || DisconnectionStatus == "Disengaged from Buddy") {
                    $("#disconnectbtn").addClass('hiddenDiv');
                }
                else {
                    $("#disconnectbtn").removeClass('hiddenDiv');
                }
                GetEnableStatusOfFeedButton();
                $('#HistoryBuddyId').val(BuddyId);

                var HistorySelectedUserEmailId;
                HistorySelectedUserEmailId = GetAssociateEmailId(BuddyId);
                $("#SendMailEmailId").val(HistorySelectedUserEmailId);
                if (HistorySelectedUserEmailId != false || HistorySelectedUserEmailId != null || HistorySelectedUserEmailId != 'undefined') {

                    $("#BuddyName").html('');
                    $("#BuddyName").append(name + "        " + "<img style='cursor:pointer;' src='Resources/Images/presence_16-unknown.png' id ='imgCommunicatorStatus' title='Status' /><img title='Ping me' src='Resources/Images/communicator3.png' style='width:20px;cursor:pointer;margin-left:3px;' onclick='OpenCommunicatorTileView();'/><img src='Resources/Images/outlook.jpg' style='width:20px;cursor:pointer;margin-left:4px;' title='Mail' onclick='SendEmail();'/>");
                }
                else {
                    $("#BuddyName").html('');
                    $("#BuddyName").append(name);
                }

                var request = new XMLHttpRequest;
                request.open('GET', "ShowImage.ashx?id=" + BuddyId + "", false);
                request.send();
                if (request.status === 200) {
                    $("#BuddyImage").attr('src', 'ShowImage.ashx?id=' + BuddyId + '');
                }
                else {
                    $("#BuddyImage").attr('src', '../../Resources/Images/NA/dummy_image.jpg');
                }

                document.getElementById('viewprofile').setAttribute('href', "https://onecognizant.cognizant.com?GlobalAppId=896&Source=9&URL=https%3A%2F%2Fonecognizantapps.cognizant.com%2F896%2FDetailedProfilePage.aspx%3FhdnIsTMFlag%3dNo%26viewprofileid%3D" + BuddyId + "");

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
            DisconnectionRequestByJoinee();
        });

        $('.discontinue_sent_info_popup_close, .discontinue_sent_info_popup .ok_btn').bind('click', function () {
            $('.discontinue_sent_info_popup, .overlay').hide();
            $('.blur').removeClass('blur');
        });

        $('#buddy_view_history .feedback_btn').bind('click', function () {
            $('.feedback_popup, .overlay').fadeIn();
        });
        $('#buddy_view_history .feedback_popup_close').bind('click', function () {
            $('.feedback_popup, .overlay').hide();
        });

    }
}

//========================================================= notification ===========================================================
var notificationsNS = {
    init: function () {
        GetJoineeInboxNotification();

        /* set background size to 'cover'*/
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
                case 'alerts_notifications_content':
                    if (thisObjIndex < alertsNotificationArray.length) {
                        var imgSrc = thisObj.find('.notifications_left_image img').attr('src');
                        var name = alertsNotificationArray[thisObjIndex][0];
                        var designation = alertsNotificationArray[thisObjIndex][1];
                        var fromDate = alertsNotificationArray[thisObjIndex][2];
                        var toDate = alertsNotificationArray[thisObjIndex][3];
                        var status = alertsNotificationArray[thisObjIndex][4];
                        var buddyid = alertsNotificationArray[thisObjIndex][5];
                        var DisconnectionRequests = alertsNotificationArray[thisObjIndex][6];
                        var FeedbackRequest = alertsNotificationArray[thisObjIndex][7];
                        var IsAlertNotification = alertsNotificationArray[thisObjIndex][8];

                        if (IsAlertNotification == true) {
                            $('#pFromDate').removeClass('hiddenDiv');
                            $('#pToDate').removeClass('hiddenDiv');
                            $('#pStatus').removeClass('hiddenDiv');
                            $('#dvAlertButtons').removeClass('hiddenDiv');
                            $('#pRequestDate').addClass('hiddenDiv');

                            if (status == 0 || status <= 0)
                                document.getElementById("Status").innerHTML = 'Done';

                            //                            if (DisconnectionRequests == 1) {
                            //                                $('#AcceptNotification').show();
                            //                                $('#RejectNotification').show();
                            //                            }
                            //                            else {
                            //                                $('#AcceptNotification').hide();
                            //                                $('#RejectNotification').hide();
                            //                            }
                            //                            if (FeedbackRequest == 1) {
                            //                                $('#lnkBuddyFeedback').show();
                            //                                $('#lnkBuddyFeedback').attr('href', 'new_joiners_view_feedback.aspx?BuddyId=' + buddyid);
                            //                            }
                            //                            else {
                            //                                $('#lnkBuddyFeedback').hide();
                            //                            }

                            if (DisconnectionRequests == 1 && FeedbackRequest != 1) {
                                $('#AcceptNotification').show();
                                $('#RejectNotification').show();
                                $('#lnkBuddyFeedback').hide();
                                parentClass.find('.notifications_content_right .status').text('Buddy wants to disengage with you');
                            }
                            else if (DisconnectionRequests != 1 && FeedbackRequest == 1) {
                                $('#AcceptNotification').hide();
                                $('#RejectNotification').hide();
                                $('#lnkBuddyFeedback').show();
                                $('#lnkBuddyFeedback').attr('href', 'new_joiners_view_feedback.aspx?BuddyId=' + buddyid);
                                parentClass.find('.notifications_content_right .status').text('Provide the feedback for this Buddy');
                            }
                            else if (DisconnectionRequests == 1 && FeedbackRequest == 1) {
                                $('#AcceptNotification').show();
                                $('#RejectNotification').show();
                                $('#lnkBuddyFeedback').show();
                                $('#lnkBuddyFeedback').attr('href', 'new_joiners_view_feedback.aspx?BuddyId=' + buddyid);
                                parentClass.find('.notifications_content_right .status').text('Buddy wants to disengage with you. Also, provide the feedback.');
                            }
                            else {
                                $('#AcceptNotification').hide();
                                $('#RejectNotification').hide();
                                $('#lnkBuddyFeedback').hide();
                                parentClass.find('.notifications_content_right .status').text(status);
                            }

                            parentClass.find('.notifications_content_right .font_name').text(name);
                            parentClass.find('.notifications_content_right .designation').text(designation);
                            parentClass.find('.notifications_content_right .fromDate').text(fromDate);
                            parentClass.find('.notifications_content_right .toDate').text(toDate);
                            //parentClass.find('.notifications_content_right .notifications_right_image img').attr('src', imgSrc);
                            parentClass.find('.notifications_content_right .notifications_right_image img').bgdSize('cover');
                            parentClass.find('.notifications_content_right').attr('id', buddyid);
                            $("#NotificationBuddyId").val(buddyid);
                            parentClass.find('.notifications_content_right .status').removeAttr('style');

                            var HistorySelectedUserEmailId;
                            HistorySelectedUserEmailId = GetAssociateEmailId(buddyid);
                            if (HistorySelectedUserEmailId != false || HistorySelectedUserEmailId != null || HistorySelectedUserEmailId != 'undefined') {
                                $("#BuddyName").html('');
                                $("#BuddyName").append(name + "        " + "<img style='cursor:pointer;' src='Resources/Images/presence_16-unknown.png' id ='imgCommunicatorStatus' title='Status' /><img title='Ping me' src='Resources/Images/communicator3.png' style='width:20px;cursor:pointer;margin-left:3px;' onclick='OpenCommunicatorTileView();'/><img src='Resources/Images/outlook.jpg' style='width:20px;cursor:pointer;margin-left:4px;' title='Mail' onclick='SendEmail();'/>");
                            }
                            else {
                                $("#BuddyName").html('');
                                $("#BuddyName").append(name);
                            }

                            var request = new XMLHttpRequest;
                            request.open('GET', "ShowImage.ashx?id=" + buddyid + "", false);
                            request.send();
                            if (request.status === 200) {
                                $("#Buddyimage").attr('src', 'ShowImage.ashx?id=' + buddyid + '');
                            }
                            else {
                                $("#Buddyimage").attr('src', 'Resources/Images/dummy_image.jpg');
                            }
                        }
                        else {
                            $('#pFromDate').addClass('hiddenDiv');
                            $('#pToDate').addClass('hiddenDiv');
                            $('#pStatus').removeClass('hiddenDiv');
                            $('#dvAlertButtons').addClass('hiddenDiv');
                            $('#pRequestDate').removeClass('hiddenDiv');


                            parentClass.find('.notifications_content_right .font_name').text(name);
                            parentClass.find('.notifications_content_right .designation').text(designation);
                            parentClass.find('.notifications_content_right .fromDate').text(fromDate);
                            parentClass.find('.notifications_content_right .toDate').text(toDate);
                            parentClass.find('.notifications_content_right .status').text(status);
                            //parentClass.find('.notifications_content_right .notifications_right_image img').attr('src', imgSrc);
                            parentClass.find('.notifications_content_right .notifications_right_image img').bgdSize('cover');
                            parentClass.find('.notifications_content_right').attr('id', buddyid);

                            if (status == 'You have sent a Buddy request to this associate and the acceptance is pending. If your request is not accepted in 3 working days, you may raise a new request.') {
                                parentClass.find('.notifications_content_right .status').attr('style', 'width: 335px; height: 75.86px; margin-top: -20px; margin-left: 110px;');
                            }
                            else {
                                parentClass.find('.notifications_content_right .status').removeAttr('style');
                            }
                            var HistorySelectedUserEmailId;
                            HistorySelectedUserEmailId = GetAssociateEmailId(buddyid);
                            if (HistorySelectedUserEmailId != false || HistorySelectedUserEmailId != null || HistorySelectedUserEmailId != 'undefined') {
                                $("#BuddyName").html('');
                                $("#BuddyName").append(name + "        " + "<img style='cursor:pointer;' src='Resources/Images/presence_16-unknown.png' id ='imgCommunicatorStatus' title='Status' /><img title='Ping me' src='Resources/Images/communicator3.png' style='width:20px;cursor:pointer;margin-left:3px;' onclick='OpenCommunicatorTileView();'/><img src='Resources/Images/outlook.jpg' style='width:20px;cursor:pointer;margin-left:4px;' title='Mail' onclick='SendEmail();'/>");
                            }
                            else {
                                $("#BuddyName").html('');
                                $("#BuddyName").append(name);
                            }

                            var request = new XMLHttpRequest;
                            request.open('GET', "ShowImage.ashx?id=" + buddyid + "", false);
                            request.send();
                            if (request.status === 200) {
                                $("#Buddyimage").attr('src', 'ShowImage.ashx?id=' + buddyid + '');
                            }
                            else {
                                $("#Buddyimage").attr('src', 'Resources/Images/dummy_image.jpg');
                            }
                        }
                    }
                    break;

                case 'team_members_notifications_content':
                    if (thisObjIndex < alertsNotificationArray.length) {
                        var imgSrc = thisObj.find('.notifications_left_image img').attr('src');
                        var name = alertsNotificationArray[thisObjIndex][0];
                        var designation = alertsNotificationArray[thisObjIndex][1];
                        var BuddyId = alertsNotificationArray[thisObjIndex][2];
                        parentClass.find('.notifications_content_right .font_name').text(name);
                        parentClass.find('.notifications_content_right .designation').text(designation);
                        //parentClass.find('.notifications_content_right .notifications_right_image img').attr('src', imgSrc);
                        parentClass.find('.notifications_content_right .notifications_right_image img').bgdSize('cover');
                        parentClass.find('.notifications_content_right').attr('id', BuddyId);
                        var HistorySelectedUserEmailId;
                        HistorySelectedUserEmailId = GetAssociateEmailId(BuddyId);
                        $("#SendMailEmailId").val(HistorySelectedUserEmailId);
                        if (HistorySelectedUserEmailId != false || HistorySelectedUserEmailId != null || HistorySelectedUserEmailId != 'undefined') {
                            $("#BuddyName1").html('');
                            $("#BuddyName1").append(name + "        " + "<img style='cursor:pointer;' src='Resources/Images/presence_16-unknown.png' id ='imgCommunicatorStatus' title='Status' /><img title='Ping me' src='Resources/Images/communicator3.png' style='width:20px;cursor:pointer;margin-left:3px;' onclick='OpenCommunicatorTileView();'/><img src='Resources/Images/outlook.jpg' style='width:20px;cursor:pointer;margin-left:4px;' title='Mail' onclick='SendEmail();'/>");
                        }
                        else {
                            $("#BuddyName1").html('');
                            $("#BuddyName1").append(name);
                        }

                        var request = new XMLHttpRequest;
                        request.open('GET', "ShowImage.ashx?id=" + BuddyId + "", false);
                        request.send();
                        if (request.status === 200) {
                            $("#BuddyImage1").attr('src', 'ShowImage.ashx?id=' + BuddyId + '');
                        }
                        else {
                            $("#BuddyImage1").attr('src', 'Resources/Images/dummy_image.jpg');
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
                        var BuddyId = othersNotificationArray[thisObjIndex][5];
                        parentClass.find('.notifications_content_right .font_name').text(name);
                        parentClass.find('.notifications_content_right .designation').text(designation);
                        parentClass.find('.notifications_content_right .fromDate').text(fromDate);
                        parentClass.find('.notifications_content_right .toDate').text(toDate);
                        parentClass.find('.notifications_content_right .status').text(status);
                        parentClass.find('.notifications_content_right .notifications_right_image img').attr('src', imgSrc);
                        parentClass.find('.notifications_content_right .notifications_right_image img').bgdSize('cover');
                        parentClass.find('.notifications_content_right').attr('id', BuddyId);

                        var HistorySelectedUserEmailId;
                        HistorySelectedUserEmailId = GetAssociateEmailId(BuddyId);
                        $("#SendMailEmailId").val(HistorySelectedUserEmailId);
                        if (HistorySelectedUserEmailId != false || HistorySelectedUserEmailId != null || HistorySelectedUserEmailId != 'undefined') {
                            $("#BuddyName2").html('');
                            $("#BuddyName2").append(name + "        " + "<img style='cursor:pointer;' src='Resources/Images/presence_16-unknown.png' id ='imgCommunicatorStatus' title='Status' /><img title='Ping me' src='Resources/Images/communicator3.png' style='width:20px;cursor:pointer;margin-left:3px;' onclick='OpenCommunicatorTileView();'/><img src='Resources/Images/outlook.jpg' style='width:20px;cursor:pointer;margin-left:4px;' title='Mail' onclick='SendEmail();'/>");
                        }
                        else {
                            $("#BuddyName2").html('');
                            $("#BuddyName2").append(name);
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
                    $('.buddy_request_notifications_content').show();
                    $('.background-size-cover').livequery(function () {
                        $(this).bgdSize('cover');
                    });
                    break;
                case 'alerts_notifications_btn':
                    GetJoineeInboxNotification();
                    $('.alerts_notifications_content').show();
                    $('.background-size-cover').livequery(function () {
                        $(this).bgdSize('cover');
                    });
                    break;
                case 'others_notifications_btn':
                    GetJoineeOtherNotification();
                    $('.others_notifications_content').show();
                    $('.background-size-cover').livequery(function () {
                        $(this).bgdSize('cover');
                    });
                    break;
                case 'team_member_notifications_btn':
                    GetNotificationJoineeTeamMembers();
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

        $('.buddy_request_notification_btn_wrapper .reject_btn').bind("click", function () {
            $('.overlay').show();
            $('.reject_request_popup').fadeIn("slow");
            $('.header, .cindy_circles').addClass('blur');
        });
        $('.reject_request_popup_close, .reject_request_popup .disagree_btn').bind("click", function () {
            $('.overlay, .reject_request_popup').hide();
            $('.blur').removeClass('blur');
        });

        $("#AcceptNotification").bind("click", function () {
            var JoineeId = $('#CurrentUserId').val();
            var BuddyId = $('#NotificationBuddyId')[0].value;

            var RequestType = 'Accept';
            var ByWhom = 'Joinee';

            $.ajax({
                type: 'POST',
                url: $('body').attr('id') + '.aspx/DisconnectionRequest',
                contentType: 'application/json',
                data: "{JoineeId:'" + JoineeId + "',BuddyId:'" + BuddyId + "',ByWhom:'" + ByWhom + "',RequestType:'" + RequestType + "'}",
                dataType: 'json',
                processData: false,

                success: function (response) {
                    $('.overlay').show();
                    $('.successful_popup').fadeIn();
                    $("#lblSuccessfulPopup").html('');
                    $("#lblSuccessfulPopup").append("You are disconnected with Buddy now.");
                    GetJoineeInboxNotification();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    $('.overlay').show();
                    $('.error_popup').fadeIn('slow');
                    $("#lblCommonInfoPopup").html('');
                    $("#lblCommonInfoPopup").append("Looks like some issue while disconnecting with Buddy. Please try later");
                    GetJoineeInboxNotification();
                }
            });
        });

        $("#RejectNotification").bind("click", function () {
            var JoineeId = $('#CurrentUserId').val();
            var BuddyId = $('#NotificationBuddyId')[0].value;
            var RequestType = 'Reject';
            var ByWhom = 'Joinee';

            $.ajax({
                type: 'POST',
                url: $('body').attr('id') + '.aspx/DisconnectionRequest',
                contentType: 'application/json',
                data: "{JoineeId:'" + JoineeId + "',BuddyId:'" + BuddyId + "',ByWhom:'" + ByWhom + "',RequestType:'" + RequestType + "'}",
                dataType: 'json',
                processData: false,

                success: function (response) {
                    $('.overlay').show();
                    $('.successful_popup').fadeIn();
                    $("#lblSuccessfulPopup").html('');
                    $("#lblSuccessfulPopup").append("You have rejected Buddy's disconnection request successfully.");
                    GetJoineeInboxNotification();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    $('.overlay').show();
                    $('.error_popup').fadeIn('slow');
                    $("#lblCommonInfoPopup").html('');
                    $("#lblCommonInfoPopup").append("Looks like some issue while rejecting the request. Please try later");
                    GetJoineeInboxNotification();
                }
            });
        });
    }
}

//========================================================= feedback ===========================================================
var feedbackNS = {
    init: function () {
        GetFeedbackQuestions();
        // GetBuddyFeedbackDetails();
        /* set background size to 'cover'*/
        $('.background-size-cover').livequery(function () {
            $(this).bgdSize('cover');
        });

        $("#slider").slider({
            animate: true,
            value: 4,
            min: 1,
            max: 5,
            step: 1,

            slide: function (event, ui) {
                var uiValue = ui.value;
                switch (uiValue) {
                    case 1:
                        $("#slider_wrapper").css('background-image', 'url("../../Resources/Images/NA/slider_bg.png")');
                        $(".smiley_wrapper").css('background-image', 'url("../../Resources/Images/NA/smiley_sad.png")');
                        break;
                    case 2:
                        $("#slider_wrapper").css('background-image', 'url("../../Resources/Images/NA/slider_bg_2.png")');
                        $(".smiley_wrapper").css('background-image', 'url("../../Resources/Images/NA/smiley_disappointed.png")');
                        break;
                    case 3:
                        $("#slider_wrapper").css('background-image', 'url("../../Resources/Images/NA/slider_bg_3.png")');
                        $(".smiley_wrapper").css('background-image', 'url("../../Resources/Images/NA/smiley_happy.png")');
                        break;
                    case 4:
                        $("#slider_wrapper").css('background-image', 'url("../../Resources/Images/NA/slider_bg_4.png")');
                        $(".smiley_wrapper").css('background-image', 'url("../../Resources/Images/NA/smiley_cool.png")');
                        break;
                    case 5:
                        $("#slider_wrapper").css('background-image', 'url("../../Resources/Images/NA/slider_bg_5.png")');
                        $(".smiley_wrapper").css('background-image', 'url("../../Resources/Images/NA/smiley_lol.png")');
                        break;
                    default:
                        $("#slider_wrapper").css('background-image', 'url("../../Resources/Images/NA/slider_bg.png")');
                        $(".smiley_wrapper").css('background-image', 'url("../../Resources/Images/NA/smiley_lol.png")');
                        break;
                }
                if (uiValue > 3) {
                    $(".ui-slider-handle").css('background-image', 'url("../../Resources/Images/NA/slider_handle_green.png")');
                } else {
                    $(".ui-slider-handle").css('background-image', 'url("../../Resources/Images/NA/slider_handle.png")');
                }
            }
        });
        $(".feedback_5").bind('click', function () {

            $("#slider").slider("value", 5);
            $(".ui-slider-handle").css('background-image', 'url("../../Resources/Images/NA/slider_handle_green.png")');
            $("#slider_wrapper").css('background-image', 'url("../../Resources/Images/NA/slider_bg_5.png")');
            $(".smiley_wrapper").css('background-image', 'url("../../Resources/Images/NA/smiley_lol.png")');
        });
    }
}

//========================================================= selectbuddy ===========================================================
var selectBuddyNS = {
    init: function () {
        $('.ask_your_supervisor').bind("click", function () {
            $('.overlay').show();
            $('.ask_supervisor_popup').fadeIn("slow");
            $('.header').addClass('blur');

            var UserId = $("#CurrentUserId").val();
            $.ajax({
                type: 'POST',
                url: $('body').attr('id') + '.aspx/GetSupervisorDetails',
                contentType: 'application/json',
                data: "{UserId:'" + UserId + "'}",
                dataType: 'json',
                processData: false,
                success: function (response) {
                    document.getElementById('lblSupervisorName').innerHTML = response.d;
                },
                error: function (xhr, ajaxOptions, thrownError) {

                }
            });

        });

        $('.ask_supervisor_popup .ask_supervisor_agree').bind("click", function () {
            RaiseSupervisorRequest();
        });

        $('.ask_supervisor_popup_close, .ask_supervisor_popup .ask_supervisor_cancel ').bind("click", function () {
            $('.overlay, .ask_supervisor_popup').hide();
            $('.blur').removeClass('blur');
        });

    }
}

//========================================================= admin ===========================================================
var BuddyDuration = 0;
var RequestToRegBuddy = 0;
var RequestAcceptedbyRegBuddy = 0;
var RequestToUnregBuddy = 0;
var RequestsAcceptedByUnregBuddy = 0;
var RequestsSendByJoinee = 0;
var ConnectionsOfJoiners = 0;

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
                GetPieChartNJ();
                GetAllBuddiesDashBoard();
                */
                GetDashBoardTabPrefillValues();
            }
            else {
                if (isSupervisor == "True") {
                    $("#configure_tab").removeClass('selected');
                    $("#dashboard_tab").removeClass('selected');
                    $('#configure_tab').hide();
                    $('#add_admin_tab').hide();
                    $("#dashboard_tab").hide();
                    $('#recommendations_tab').show();
                    $("#recommendations_tab").addClass('selected');
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
            // $('#BUListValue').val($(this).attr('id'));
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

        var page = 0;
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
                        document.getElementById('User_Id').innerHtml = connectionsArray[thisObjIndex][4];
                        parentClass.find('.notifications_content_right .font_name').text(name);
                        parentClass.find('.notifications_content_right .designation').text(designation);
                        parentClass.find('.notifications_content_right .connections_txt').text(connections);
                        //parentClass.find('.notifications_content_right .av_feedback').text(averageFeedback);
                        //parentClass.find('.notifications_content_right .notifications_right_image img').attr('src', imgSrc);
                        parentClass.find('.notifications_content_right .notifications_right_image img').bgdSize('cover');
                        parentClass.find('.notifications_content_right').attr('id', BuddyId);

                        var HistorySelectedUserEmailId;
                        HistorySelectedUserEmailId = GetAssociateEmailId(BuddyId);
                        $("#SendMailEmailId").val(HistorySelectedUserEmailId);
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


        $('.connections_close').livequery("click", function () {
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
        var remove_icon = "<img src='../../Resources/Images/NA/contact_close.png' alt='Close' class='remove_icon'/>";
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

//========================================================= document ready ===========================================================
$(document).ready(function () {
    bodyId = $('body').attr('id');
    switch (bodyId) {
        case 'new_joiners_view_storyline':
            storylineNS.init();
            break;
        case 'new_joiners_view_circles':
            circlesNS.init();
            break;
        case 'new_joiners_view_buddy_list':
            buddyListNS.init();
            break;
        case 'new_joiners_view_registered_available_buddies':
            buddyListNS.init();
            break;
        case 'new_joiners_view_home':
            homeNS.init();
            break;
        case 'new_joiners_view_history':
            historyNS.init();
            break;
        case 'new_joiners_view_notifications':
            notificationsNS.init();
            break;
        case 'new_joiners_view_feedback':
            feedbackNS.init();
            break;
        case 'admin_view_newjoiners':
            adminNS.init();
            break;
        case 'new_joiners_view_select_buddy':
            selectBuddyNS.init();
            break;
        case 'new_joiners_view_welcome':
            break;
        default:
            generalNS.init();
            break;
    }
    generalNS.init();
});

//##########################################################  user defined functions #################################################

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

function closeSuccessPopup() {
    $('.successful_popup, .overlay').hide();
    $('.blur').removeClass('blur');
}

$(".not_now").click(function () {
    $(this).parent().parent().hide();
});

function closeSentRequestPopup() {
    $('.sent_request_info_popup, .overlay').hide();
    $('.blur').removeClass('blur');
}

//========================================================= Buddy List =========================================================
var allresult;  //global variable to store entire likely buddy list without any filteration
var level1result;     //filtered w.r.t. registration & availability
function GetAllLikelyBuddies(FilterType, UptoLevel) {

    var UserId = $("#CurrentUserId").val();

    $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/GetAllLikelyBuddies',
        contentType: 'application/json',
        data: "{UserId:'" + UserId + "',FilterType:'" + FilterType + "',UptoLevel:" + UptoLevel + "}",
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
    level1result = eval('(' + result.d + ')');   //by default without filtered buddies
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
            for (i = 0; i < allBuddies.BuddyList.length; i++) {
                if (allBuddies.BuddyList[i].IsRegisteredBuddy == true && allBuddies.BuddyList[i].IsAvailable == true) {
                    obj.BuddyList[j] = {};
                    obj.BuddyList[j] = allBuddies.BuddyList[i];
                    j++;
                }
            }
            break;
        case 'Enrolled/Busy':
            for (i = 0; i < allBuddies.BuddyList.length; i++) {
                if (allBuddies.BuddyList[i].IsRegisteredBuddy == true && allBuddies.BuddyList[i].IsAvailable == false) {
                    obj.BuddyList[j] = {};
                    obj.BuddyList[j] = allBuddies.BuddyList[i];
                    j++;
                }
            }
            break;
        case 'Not Enrolled/Available':
            for (i = 0; i < allBuddies.BuddyList.length; i++) {
                if (allBuddies.BuddyList[i].IsRegisteredBuddy == false && allBuddies.BuddyList[i].IsAvailable == true) {
                    obj.BuddyList[j] = {};
                    obj.BuddyList[j] = allBuddies.BuddyList[i];
                    j++;
                }
            }
            break;
        case 'Not Enrolled/Busy':
            for (i = 0; i < allBuddies.BuddyList.length; i++) {
                if (allBuddies.BuddyList[i].IsRegisteredBuddy == false && allBuddies.BuddyList[i].IsAvailable == false) {
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

        $("#dvBuddyList").append('<div class="buddy_list buddy_list_visible"><img src="Resources/Images/loader-blue-large.gif" runat="server" style="left:210px;bottom:150px;"/></div>');
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
                        Buddy += "<img class='background-size-cover dummy_image' src='ResourcResources/Images/dummy_image_male_large.jpg'  />";
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
        //searchBuddyList.push({ value: Buddies.BuddyList[i].UserId, label: Buddies.BuddyList[i].UserId + " " + Buddies.BuddyList[i].UserName.substr(0, 10), desc: Buddies.BuddyList[i].UserName.substr(0, 10) });
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
            data: "{UserId:'" + BuddyId + "'}",
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

        $("#ccEmailId").val(ContactCard.EmailId);
        $("#SendMailEmailId").val(ContactCard.EmailId);

        $("#ccUserName").html('');
        $("#ccUserName").append(ContactCard.UserName + "        " + "<img style='cursor:pointer;' src='Resources/Images/presence_16-unknown.png' id ='imgCommunicatorStatus' title='Status' /><img title='Ping me' src='Resources/Images/communicator3.png' style='width:20px;cursor:pointer;margin-left:3px;' onclick='OpenCommunicatorTileView();'/><img src='Resources/Images/outlook.jpg' style='width:20px;cursor:pointer;margin-left:4px;' title='Mail' onclick='SendEmail();'/>");
        //document.getElementById("ccUserName").innerHTML = ContactCard.UserName;
        document.getElementById("ccDesignation").innerHTML = ContactCard.Designation;
        if (ContactCard.IsRegisteredBuddy == true) {
            document.getElementById("ccRegStatus").innerHTML = "Enrolled as part of the buddy program";
            if (ContactCard.IsAvailable == true)
                document.getElementById("ccAvailStatus").innerHTML = "Available to take new associates for buddy program";
            else
                document.getElementById("ccAvailStatus").innerHTML = "Unavailable to take new associates for buddy program";
        }
        else {
            document.getElementById("ccRegStatus").innerHTML = "Not enrolled as part of the buddy program";
            if (ContactCard.IsAvailable == true)
                document.getElementById("ccAvailStatus").innerHTML = "This associate is not enrolled as part of Buddy program,<br/>but you may send a request and check the interest to be <br/> your buddy";
            else
                document.getElementById("ccAvailStatus").innerHTML = "Unavailable to take new associates for buddy program";
        }

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
    $("#lblCommonInfoPopup").append("Sorry, We are unable to show buddy details right now. Try sometime later.");
}

//======================================================= CheckConnectionRequest ====================================================================
function CheckConnectionRequest(JoineeId, BuddyId) {
    $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/CheckConnectionRequest',
        contentType: 'application/json',
        data: "{JoineeId:'" + JoineeId + "',BuddyId:'" + BuddyId + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            onsuccessCheckConnectionRequest(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            onerrorCheckConnectionRequest(xhr.status, thrownError);
        }
    });
}

function onsuccessCheckConnectionRequest(result) {
    if (result.d == '1') {
        $('.confirmation_popup').fadeIn();
        document.getElementById('lblConfirmBuddyReqName').innerHTML = $("#ccDisplayName")[0].innerHTML.substring(0, $("#ccDisplayName")[0].innerHTML.length - 3);
    }
    else if (result.d == '2') {
        $('.error_popup').fadeIn();
        $("#lblCommonInfoPopup").html('');
        $("#lblCommonInfoPopup").append("You are already connected with this Buddy.");
    }
    else if (result.d == '3') {
        $('.error_popup').fadeIn();
        $("#lblCommonInfoPopup").html('');
        $("#lblCommonInfoPopup").append("Earlier he/she was your Buddy, so can't send request again.");
    }
    else if (result.d == '4') {
        $('.error_popup').fadeIn();
        $("#lblCommonInfoPopup").html('');
        $("#lblCommonInfoPopup").append("Earlier Buddy request is pending for approval.");
    }
    else if (result.d == '5') {
        $('.error_popup').fadeIn();
        $("#lblCommonInfoPopup").html('');
        $("#lblCommonInfoPopup").append("Your connection quota is full. You can't send more request.");
    }
    else if (result.d == '6') {
        $('.error_popup').fadeIn();
        $("#lblCommonInfoPopup").html('');
        $("#lblCommonInfoPopup").append("Buddy is not of more than 12 months experience or not upto 2 levels above.");
    }
    else if (result.d == '7') {
        $('.error_popup').fadeIn();
        $("#lblCommonInfoPopup").html('');
        $("#lblCommonInfoPopup").append("Buddy is busy, so can't take anymore requests.");
    }
    else {
        $('.error_popup').fadeIn();
        $("#lblCommonInfoPopup").html('');
        $("#lblCommonInfoPopup").append("This Associate is not eligible to be your Buddy.");
    }
    return true;
}

function onerrorCheckConnectionRequest() {
    $('.error_popup').fadeIn();
    $("#lblCommonInfoPopup").html('');
    $("#lblCommonInfoPopup").append("Can't send request now, please try after some time.");
}

//============================================ Get Buddy Recommendation data ==============================================
var searchSupervisorsList = [];
function GetRecommendableJoinees() {
    var SupervisorId = $("#CurrentUserId").val();

    $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/GetRecommendableJoinees',
        contentType: 'application/json',
        data: "{SupervisorId:'" + SupervisorId + "'}",
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
        //$("#dvRecommendableBuddies").append('<label style="bottom:160px; position:absolute;left:250px;color:#ffffff;font-size:14px">No New Joinees Found in Your Team</label>');
    }
}

function onerrorGetRecommendableJoinees() {
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
        data: "{JoineeId:'" + JoineeId + "'}",
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
    if (RecommendableBuddies.BuddyList.length != null) {
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
        $("#dvRecommendableBuddies").append('<div class="recommend_buddy_list_wrapper fleft clear visible"><label style="bottom:200px; position:absolute;left:120px;color:#ffffff;font-size:14px">No Buddies Found in Your Team</label></div>');
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
        data: "{JoineeId:'" + JoineeId + "',BuddyId:'" + BuddyId + "'}",
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
        data: "{JoineeId:'" + JoineeId + "',BuddyId:'" + BuddyId + "',RequestType:'Send',RejectionComment:''}",
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
    alert("Could not recommend buddy as of now, please try later ");
}


//===============================================Get Unenrolled Buddies =====================================================

function GetUnenrolledBuddies() {
    var SupervisorId = $('#CurrentUserId').val();

    $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/GetUnenrolledBuddies',
        contentType: 'application/json',
        data: "{SupervisorId:'" + SupervisorId + "'}",
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
                    Buddy += "<div class='recommend_buddy_tile_wrapper fleft' id='" + UnenrolledBuddies.BuddyList[i].UserId + "'>";
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
                    Buddy += "<div class='recommend_buddy_tile_wrapper fleft' id='" + UnenrolledBuddies.BuddyList[i].UserId + "'>";
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
    return;
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
        data: "{BuddyId:'" + selectedBuddies + "'}",
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
        data: "{Associate_Id:'" + CurrentUserId + "'}",
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

//===================================================== Get JoineeNotification Count =====================================================
function GetJoineeNotificationCount() {
    var Userid = $('#CurrentUserId').val();
    var type = 'Joinee';
    var bodyId = $('body').attr('id');
    $.ajax({
        type: 'POST',
        url: '' + bodyId + '.aspx/GetBuddyJoineeNotificationCount',
        contentType: 'application/json',
        data: "{Userid:'" + Userid + "',type:'" + type + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            onsuccessGetJoineeNotificationCount(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            onerrorGetJoineeNotificationCount(xhr.status, thrownError);
        }
    });
}
function onsuccessGetJoineeNotificationCount(result) {
    var count = eval('(' + result.d + ')');
    var a = count.buddyNotify.length;
    if (a > 0) {
        $('#unread_Notify').show();
        document.getElementById('unread_Notify').textContent = a;
    }
    else {
        $('#unread_Notify').hide();
    }
}
function onerrorGetJoineeNotificationCount() {
    alert("Something is wrong here, Please try again after sometime.");
}

//======================================================= Get JoineeNotify popup ========================================================
function GetJoineeNotify() {
    var JoineeID = $('#CurrentUserId').val();
    $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/GetJoineeNotify',
        contentType: 'application/json',
        data: "{JoineeID:'" + JoineeID + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            onsuccessGetJoineeNotify(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            onerrorGetJoineeNotify(xhr.status, thrownError);
        }
    });
}
function onerrorGetJoineeNotify(status, thrownError) {
    alert("Something is wrong here, Please try again after sometime.");
}
function onsuccessGetJoineeNotify(result) {
    //$("#notify_popup").removeClass('hiddenDiv');
    var Joinee = eval('(' + result.d + ')');
    var i = 0;
    var a = Joinee.JoineeNotify.length;
    var list = "";
    $('#dvJoineeNotification').html('');

    if (a != 0) {
        for (i = 0; i < a; i++) {
            if (Joinee.JoineeNotify[i].ConnectionStatus == "BOTH") {
                //=============================== disconnection accept/reject div =============================
                list += "<div class='notifications_popup_item clear' id='notify_popup'>";
                list += "<div class='notifications_popup_image'>";

                var request = new XMLHttpRequest;
                request.open('GET', "ShowImage.ashx?id=" + Joinee.JoineeNotify[i].UserId + "", false);
                request.send();
                if (request.status === 200) {
                    list += "<img class='background-size-cover' runat='server' src='ShowImage.ashx?id=" + Joinee.JoineeNotify[i].UserId + "' alt='' />";
                }
                else {
                    list += "<img class='background-size-cover' src='Resources/Images/dummy_image.jpg'  alt='Image'/>";
                }

                list += "</div>";
                list += "<div class='notifications_popup_details'>";
                var UserName = (Joinee.JoineeNotify[i].UserName.length < 18 ? (Joinee.JoineeNotify[i].UserName) : (Joinee.JoineeNotify[i].UserName.substring(0, 18) + '...'));
                list += "<p class='font_16'>" + UserName + "</p>";


                list += "<p>Has sent a disconnect request.</p>";

                list += "</div>";
                list += "<div class='notification_popup_btns'>";
                list += "<div class='notifications_popup_btn accept_btn' onclick='AcceptrejectbyJoinee(\"" + $('#CurrentUserId').val() + "\",\"" + Joinee.JoineeNotify[i].UserId + "\",\"" + 'Joinee' + "\",\"" + 'ACCEPT' + "\")'>Accept</div>";
                list += "<div class='notifications_popup_btn reject_btn' onclick='AcceptrejectbyJoinee(\"" + $('#CurrentUserId').val() + "\",\"" + Joinee.JoineeNotify[i].UserId + "\",\"" + 'Joinee' + "\",\"" + 'REJECT' + "\")'>Reject</div>";
                list += "</div>";
                list += "</div>";

                //=============================== Feedback div =============================
                list += "<div class='notifications_popup_item clear' id='notify_popup'>";
                list += "<div class='notifications_popup_image'>";

                var request = new XMLHttpRequest;
                request.open('GET', "ShowImage.ashx?id=" + Joinee.JoineeNotify[i].UserId + "", false);
                request.send();
                if (request.status === 200) {
                    list += "<img class='background-size-cover' runat='server' src='ShowImage.ashx?id=" + Joinee.JoineeNotify[i].UserId + "' alt='' />";
                }
                else {
                    list += "<img class='background-size-cover' src='Resources/Images/dummy_image.jpg'  alt='Image'/>";
                }

                list += "</div>";
                list += "<div class='notifications_popup_details'>";
                var UserName = (Joinee.JoineeNotify[i].UserName.length < 18 ? (Joinee.JoineeNotify[i].UserName) : (Joinee.JoineeNotify[i].UserName.substring(0, 18) + '...'));
                list += "<p class='font_16'>" + UserName + "</p>";

                list += "<p>Only 10 more days left! Please provide your feedback.</p>";
                list += "</div>";
                list += "<div class='notification_popup_btns'>";
                list += "<div class='notifications_popup_btn accept_btn' onclick='Acceptnotify(\"" + Joinee.JoineeNotify[i].UserId + "\")'>Feedback</div>";
                list += "</div>";
                list += "</div>";
            }
            else {
                list += "<div class='notifications_popup_item clear' id='notify_popup'>";
                list += "<div class='notifications_popup_image'>";
                var request = new XMLHttpRequest;
                request.open('GET', "ShowImage.ashx?id=" + Joinee.JoineeNotify[i].UserId + "", false);
                request.send();
                if (request.status === 200) {
                    list += "<img class='background-size-cover' runat='server' src='ShowImage.ashx?id=" + Joinee.JoineeNotify[i].UserId + "' alt='' />";
                }
                else {
                    list += "<img class='background-size-cover' src='Resources/Images/dummy_image.jpg'  alt='Image'/>";
                }
                list += "</div>";
                list += "<div class='notifications_popup_details'>";

                var UserName = (Joinee.JoineeNotify[i].UserName.length < 18 ? (Joinee.JoineeNotify[i].UserName) : (Joinee.JoineeNotify[i].UserName.substring(0, 18) + '...'));
                list += "<p class='font_16'>" + UserName + "</p>";

                if (Joinee.JoineeNotify[i].ConnectionStatus == 'Disconnection Request') {
                    list += "<p>Has sent a disconnect request.</p>";
                }
                else {
                    list += "<p>Only 10 more days left! Please provide your feedback.</p>";
                }

                list += "</div>";
                list += "<div class='notification_popup_btns'>";
                if (Joinee.JoineeNotify[i].ConnectionStatus == 'Disconnection Request') {
                    list += "<div class='notifications_popup_btn accept_btn' onclick='AcceptrejectbyJoinee(\"" + $('#CurrentUserId').val() + "\",\"" + Joinee.JoineeNotify[i].UserId + "\",\"" + 'Joinee' + "\",\"" + 'ACCEPT' + "\")'>Accept</div>";
                    list += "<div class='notifications_popup_btn reject_btn' onclick='AcceptrejectbyJoinee(\"" + $('#CurrentUserId').val() + "\",\"" + Joinee.JoineeNotify[i].UserId + "\",\"" + 'Joinee' + "\",\"" + 'REJECT' + "\")'>Reject</div>";
                }
                else {
                    list += "<div class='notifications_popup_btn accept_btn' onclick='Acceptnotify(\"" + Joinee.JoineeNotify[i].UserId + "\")'>Feedback</div>";
                    //list += "<div class='notifications_popup_btn reject_btn' onclick='Notnownotify()'>NotNow</div>";
                }

                list += "</div>";
                list += "</div>";
            }
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
    $('#dvJoineeNotification').append(list);
}

function Acceptnotify(BuddyId) {
    window.location = "new_joiners_view_feedback.aspx?BuddyId=" + BuddyId + "";
}

function Notnownotify() {
    //$('.notifications_popup_item clear').style.display = "none";
    // $('.notifications_popup_item clear').hide();
    // $('#notify_popup').removeClass('notifications_popup_item clear');
    //     $("#notify_popup").addClass('hiddenDiv');
    //$(this).parent().slideToggle();
    $(this).parent().parent().hide();
}

//=============================================== AcceptrejectbyJoinee Noyification popup ===============================================
function AcceptrejectbyJoinee(JoineeId, BuddyId, ByWhom, RequestType) {
    var ByWhom = 'Joinee';
    $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/DisconnectionRequest',
        contentType: 'application/json',
        data: "{JoineeId:'" + JoineeId + "',BuddyId:'" + BuddyId + "',ByWhom:'" + ByWhom + "',RequestType:'" + RequestType + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            onsuccessAcceptrejectbyJoinee(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            onerrorAcceptrejectbyJoinee(xhr.status, thrownError);
        }
    });
}
function onsuccessAcceptrejectbyJoinee() {
    var a = document.getElementById('unread_Notify').textContent;
    document.getElementById('unread_Notify').textContent = (a - 1);
    $('#notify_popup').click(function () {
        $(this).parent().slideToggle();
    });
}

function onerrorAcceptrejectbyJoinee() {
}

//============================================== DASHBOARD ==================================================================
//-----------------------------------------------Prefill values (BUnames, country names, buddylist-dashboard, piechart)------
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
    document.getElementById("Non_Con_NJ").innerHTML = result.NonConnected_buddies;
    document.getElementById("Con_NJ").innerHTML = result.Connected_buddies;
    document.getElementById("td_NotConnNJ").innerHTML = result.NonConnected_buddies;
    document.getElementById("td_ConnNJ").innerHTML = result.Connected_buddies;
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
//======================================================= BUNames for NewJoinee ==========================================================
function GetBUNamesNJ() {
    $.ajax({
        type: 'POST',
        url: 'admin_view_newjoiners.aspx/GetBUNames',
        contentType: 'application/json',
        // data: "{}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            onsuccessGetBUNamesNJ(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            onerrorGetBUNamesNJ(xhr.status, thrownError);
        }
    });
}
function onerrorGetBUNamesNJ(status, thrownError) {
    alert("Something is wrong here, Please try again after sometime.");
}
function onsuccessGetBUNamesNJ(result) {
    var result = eval('(' + result.d + ')');
    var list = "";
    $("#drpdwnBU").html('');
    var list = "<li class='dashboard_bu_option'>All</li>";
    if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {
            list += " <li class='dashboard_bu_option'>" + result[i].DeptDesc + "</li>";
        }
        $("#drpdwnBU").append(list);

    }
}

//======================================================= PieChart for NewJoinee ==========================================================
function GetPieChartNJ() {
    $.ajax({
        type: 'POST',
        url: 'admin_view_newjoiners.aspx/GetPieChartNJ',
        contentType: 'application/json',
        dataType: 'json',
        processData: false,

        success: function (response) {
            onsuccessGetPieChartNJ(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            onerrorGetPieChartNJ(xhr.status, thrownError);
        }
    });
}
function onerrorGetPieChartNJ(status, thrownError) {
    alert("Something is wrong here, Please try again after sometime.");
}

function onsuccessGetPieChartNJ(result) {
    var result = eval('(' + result.d + ')');

    document.getElementById("Non_Con_NJ").innerHTML = result.NonConnected_buddies;
    document.getElementById("Con_NJ").innerHTML = result.Connected_buddies;
    document.getElementById("td_NotConnNJ").innerHTML = result.NonConnected_buddies;
    document.getElementById("td_ConnNJ").innerHTML = result.Connected_buddies;

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

//================================================ GetDashBoardData for NewJoinee ==================================================

function GetNJDashBoardData() {
    var val;
    var bu;
    if (document.getElementById("BUListValue").value != "")
        bu = document.getElementById("BUListValue").value;
    else
        bu = "All";
    var type = $("#TypeValue").val();
    if (type == '0')
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
        url: 'admin_view_newjoiners.aspx/GetNJDashBoardData',
        contentType: 'application/json',
        data: "{BU:'" + bu + "',Chk:'" + val + "', CountryId:'" + CountryId + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            OnSuccessGetNJDashBoardData(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            OnErrorGetNJDashBoardData(xhr.status, thrownError);
        }
    });
}

function OnSuccessGetNJDashBoardData(result) {
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
                list += "<span class='notifications_left_image'><img class='background-size-cover' src='Resources/Images/dummy_image.jpg' /></span>";
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
        }
        $("#BuddyData").append(list);

        var HistorySelectedUserId = buddy.DashBoardData[0].BuddyId;
        var HistorySelectedUserEmailId;
        HistorySelectedUserEmailId = GetAssociateEmailId(HistorySelectedUserId);
        $("#SendMailEmailId").val(HistorySelectedUserEmailId);
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

        //document.getElementById("User_Id").value = buddy.DashBoardData[0].BuddyId;
        $('.notifications_content_right').attr('id', buddy.DashBoardData[0].BuddyId);

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
        document.getElementById("Non_Con_NJ").innerHTML = buddy.NonConnected_buddies;
        document.getElementById("Con_NJ").innerHTML = buddy.Connected_buddies;
        document.getElementById("td_NotConnNJ").innerHTML = buddy.NonConnected_buddies;
        document.getElementById("td_ConnNJ").innerHTML = buddy.Connected_buddies;
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
function OnErrorGetNJDashBoardData(status, error) {
    alert("Some information cann't be loaded, sorry for inconvenience");
}

//================================================ GetAllBuddiesDashBoard for NewJoinee ==================================================
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
            if (i == 0)
                list += "<div class='notifications_left_item selected'>";
            else
                list += "<div class='notifications_left_item'>";

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
            //document.getElementById("User_Id").value = buddy.DashBoardData[i].BuddyId;

        }
        $("#BuddyData").append(list);

        var HistorySelectedUserId = buddy.DashBoardData[0].BuddyId;
        var HistorySelectedUserEmailId;
        HistorySelectedUserEmailId = GetAssociateEmailId(HistorySelectedUserId);
        $("#SendMailEmailId").val(HistorySelectedUserEmailId);
        if (HistorySelectedUserEmailId != false) {
            $("#buddy_name").html('');
            $("#buddy_name").append(buddy.DashBoardData[0].BuddyName + "        " + "<br><img style='cursor:pointer;' src='Resources/Images/presence_16-unknown.png' id ='imgCommunicatorStatus' title='Status' /><img title='Ping me' src='Resources/Images/communicator3.png' style='width:20px;cursor:pointer;margin-left:3px;' onclick='OpenCommunicatorTileView();'/><img src='Resources/Images/outlook.jpg' style='width:20px;cursor:pointer;margin-left:4px;' title='Mail' onclick='SendEmail();'/>");
        }
        else {
            $("#buddy_name").html('');
            $("#buddy_name").append(buddy.DashBoardData[0].BuddyName);
        }

        // document.getElementById("buddy_name").innerHTML = buddy.DashBoardData[0].BuddyName;
        document.getElementById("buddy_designation").innerHTML = buddy.DashBoardData[0].Designation;
        document.getElementById("Connections").innerHTML = buddy.DashBoardData[0].Connection;
        if (buddy.DashBoardData[0].AvgFeedback == null || buddy.DashBoardData[0].AvgFeedback == 0) {
            document.getElementById("Avgfeedback").innerHTML = 'Nil'
        }
        else {
            document.getElementById("Avgfeedback").innerHTML = buddy.DashBoardData[0].AvgFeedback;
        }
        // document.getElementById("User_Id").value = buddy.DashBoardData[0].BuddyId;
        $('.notifications_content_right').attr('id', buddy.DashBoardData[0].BuddyId);

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

//================================================ GetDashboardConnections for NewJoinee ==================================================
function GetDashboardConnectionsofUserNJ() {

    var type = $("#TypeValue").val();
    if (type == "0")
        val = false;
    else
        val = true;
    var Buddyid = $('.notifications_content_right')[0].id;
    $.ajax({
        type: 'POST',
        url: 'admin_view_newjoiners.aspx/GetDashboardConnectionsofUser',
        contentType: 'application/json',
        data: "{Datauserid:'" + Buddyid + "',chk:'" + val + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            OnSuccessGetDashboardConnectionsofUserNJ(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            OnErrorGetDashboardConnectionsofUserNJ(xhr.status, thrownError);
            //$('.overlay').show();
        }
    });
}
function OnSuccessGetDashboardConnectionsofUserNJ(result) {
    $(".connections").html('');
    var buddy = eval('(' + result.d + ')');
    var i = 0;
    var j = 0;
    var list = "";
    var list1 = "";
    list += " <div class='contact_card_header clear'>";
    list += " <p>Connected to</p>";
    list += " <img src='Resources/Images/contact_close.png' alt='Close' class='connections_close'/>";
    list += " </div>";
    var a = buddy.DashBoardData.length;
    if (a == 0) {
        // list1 += " <div class='config_error'>";
        list1 += "	<div class='contact_card_header clear'>";
        list1 += "		<p>Connections</p>";
        list1 += "		<img src='Resources/Images/contact_close.png' alt='Close' class='connections_close'/>";
        list1 += "	</div>";
        list1 += "	<div class='info_screen_details contact_details clear'>";
        list1 += "		<p>";
        list1 += "   <span style='margin-left:20px;'>No active connections found for this user!</span>";
        list1 += "		</p>";
        list1 += "	</div>";
        list1 += "	<div class='contact_card_footer'></div>";
        //list1 += "</div>";
        $(".connections").append(list1);
    }

    page = a / 3;
    if (a % 3 != 0) {
        page += 1;
    }

    if (a != 0) {
        if (a < 3) {
            list += "<div class='connections_screen_details contact_details clear visible'>";
            list += "<div class='connections_arrow connections_arrow_previous fleft' id='arrow_prev'></div>";


            for (i = 0; i < a; i++) {

                list += " <div class='connections_details_wrapper fleft' id='Connected_data'>";
                list += "			<div class='user_image_bg'>";
                list += "				<div class='shine'></div>";

                var request = new XMLHttpRequest;
                request.open('GET', "ShowImage.ashx?id=" + buddy.DashBoardData[i].BuddyId + "", false);
                request.send();
                if (request.status === 200) {
                    list += "<div class='thumbnail80'><img class='background-size-cover' id='Connected_img' alt='User' src='ShowImage.ashx?id=" + buddy.DashBoardData[i].BuddyId + "' alt='' /></div>";
                }
                else {
                    list += "<div class='thumbnail80'><img class='background-size-cover' id='Connected_img' alt='User' src='Resources/Images/dummy_image.jpg' /></div>";
                }

                list += "			</div>";
                var UserName = (buddy.DashBoardData[i].BuddyName.length < 18 ? (buddy.DashBoardData[i].BuddyName) : (buddy.DashBoardData[i].BuddyName.substring(0, 18) + '...'));

                list += "			<p class='font_20' id='Connected_name'>" + UserName + "</p>";
                list += "			<p id='Connected_designation'>" + buddy.DashBoardData[i].Designation + "</p>";
                list += "			<p id='Connected_date'>" + buddy.DashBoardData[i].Connection + "</p>";
                list += "		</div>";

            }
            list += " <div class='connections_arrow connections_arrow_next fleft'  id='buddy_arrow'></div>";
            list += " </div>";
            list += " <div class='contact_card_footer'></div>";
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

                        list += " <div class='connections_details_wrapper fleft' id='Connected_data'>";
                        list += "			<div class='user_image_bg'>";
                        list += "				<div class='shine'></div>";

                        var request = new XMLHttpRequest;
                        request.open('GET', "ShowImage.ashx?id=" + buddy.DashBoardData[i].BuddyId + "", false);
                        request.send();
                        if (request.status === 200) {
                            list += "<div class='thumbnail80'><img class='background-size-cover' id='Connected_img' alt='User' src='ShowImage.ashx?id=" + buddy.DashBoardData[i].BuddyId + "' alt='' /></div>";
                        }
                        else {
                            list += "<div class='thumbnail80'><img class='background-size-cover' id='Connected_img' alt='User' src='Resources/Images/dummy_image.jpg' /></div>";
                        }

                        list += "			</div>";
                        var UserName = (buddy.DashBoardData[i].BuddyName.length < 18 ? (buddy.DashBoardData[i].BuddyName) : (buddy.DashBoardData[i].BuddyName.substring(0, 18) + '...'));
                        list += "			<p class='font_20' id='Connected_name'>" + UserName + "</p>";
                        list += "			<p id='Connected_designation'>" + buddy.DashBoardData[i].Designation + "</p>";
                        list += "			<p id='Connected_date'>" + buddy.DashBoardData[i].Connection + "</p>";
                        list += "		</div>";

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

                        list += " <div class='connections_details_wrapper fleft' id='Connected_data'>";
                        list += "			<div class='user_image_bg'>";
                        list += "				<div class='shine'></div>";

                        var request = new XMLHttpRequest;
                        request.open('GET', "ShowImage.ashx?id=" + buddy.DashBoardData[i].BuddyId + "", false);
                        request.send();
                        if (request.status === 200) {
                            list += "<div class='thumbnail80'><img class='background-size-cover' id='Connected_img' alt='User' src='ShowImage.ashx?id=" + buddy.DashBoardData[i].BuddyId + "' alt='' /></div>";
                        }
                        else {
                            list += "<div class='thumbnail80'><img class='background-size-cover' id='Connected_img' alt='User' src='Resources/Images/dummy_image.jpg' /></div>";
                        }

                        list += "			</div>";
                        var UserName = (buddy.DashBoardData[i].BuddyName.length < 18 ? (buddy.DashBoardData[i].BuddyName) : (buddy.DashBoardData[i].BuddyName.substring(0, 18) + '...'));
                        list += "			<p class='font_20' id='Connected_name'>" + UserName + "</p>";
                        list += "			<p id='Connected_designation'>" + buddy.DashBoardData[i].Designation + "</p>";
                        list += "			<p id='Connected_date'>" + buddy.DashBoardData[i].Connection + "</p>";
                        list += "		</div>";

                    }
                    list += " <div class='connections_arrow connections_arrow_next fleft'  id='buddy_arrow'></div>";
                    list += " </div>";
                }

            }
            list += " <div class='contact_card_footer'></div>";
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
function OnErrorGetDashboardConnectionsofUserNJ(status, error) {

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
    $.ajax({
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        url: $('body').attr('id') + '.aspx/Getconfiguration',
        data: "{Associate_Id:'" + CurrentUserId + "'}",
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
                url: $('body').attr('id') + '.aspx/ConfigureAdmin',
                contentType: 'application/json',
                data: "{BuddyDuration: " + BuddyDuration + ",RequestToRegBuddy: " + RequestToRegBuddy + ",RequestAcceptedByRegBuddy: " + RequestAcceptedbyRegBuddy + ",RequestToUnRegBuddy: " + RequestToUnregBuddy + ",RequestAcceptedByUnRegBuddy: " + RequestsAcceptedByUnregBuddy + ",RequestsSendByJoinee:" + RequestsSendByJoinee + ",ConnectionsOfJoiners:" + ConnectionsOfJoiners + "}",
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

//==============================================================  ADD Admin ===============================================================

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
        else {
            document.getElementById('NorecordAdmin').innerHTML = "No Records found......";
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
        $("#lblCommonInfoPopup").append("Oops something went wrong, please try after some time");
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
            var id = ($("#adminlist")[0].children[i].children[3].value).replace(/\s/g, '');
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
    var CurrentUserId = $('#CurrentUserId').val();
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

//===============================================================  RaiseSuperVisorRequest =================================================================

function RaiseSupervisorRequest() {
    var JoineeID = $('#CurrentUserId').val();
    $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/RaiseSupervisorRequest',
        contentType: 'application/json',
        data: "{JoineeId:'" + JoineeID + "'}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            OnSuccessRaiseSupervisorRequest(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            OnErrorRaiseSupervisorRequest(xhr.status, thrownError);
        }
    });
}
function OnSuccessRaiseSupervisorRequest(result) {
    if (result.d == "true") {
        $('.ask_supervisor_popup').hide();
        $('.successful_popup').fadeIn();
        $("#lblSuccessfulPopup").html('');
        $("#lblSuccessfulPopup").append("Request mail has been sent to your supervisor.");
    }
    else {
        $('.ask_supervisor_popup').hide();
        $('.error_popup').fadeIn();
        $("#lblCommonInfoPopup").html('');
        $("#lblCommonInfoPopup").append("You have already asked your supervisor for buddy. Please wait for the response.");
    }
}
function OnErrorRaiseSupervisorRequest(x, y) {
    $('.error_popup').fadeIn();
    $("#lblCommonInfoPopup").html('');
    $("#lblCommonInfoPopup").append("Oops looks like something went wrong, please try raising request after some time.");
}
//*******************************************************new_joiners_view_notifications.aspx******************************************************
//=======================================================Alert Tab================================================================================
function GetJoineeInboxNotification() {
    var JoineeId = $('#CurrentUserId').val();

    $.ajax({
        type: 'POST',
        url: 'new_joiners_view_notifications.aspx/GetJoineeInboxNotification',
        contentType: 'application/json',
        data: "{JoineeId:'" + JoineeId + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            onsuccessGetJoineeInboxNotification(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            onerrorGetJoineeInboxNotification(xhr.status, thrownError);
        }
    });
}

function onsuccessGetJoineeInboxNotification(result) {
    var JonieeNotification = eval('(' + result.d + ')');

    $("#JoineeNotification").html('');
    var a = JonieeNotification.objJoineeNotification.length;
    $('.notifications_content_right').removeClass('hiddenDiv');

    if (a != 0) {
        var detaillist = "";
        var list = "";
        for (var i = 0; i < a; i++) {

            if (i == 0) {
                list += "<div class='notifications_left_item selected'>";
            }
            else {
                list += "<div class='notifications_left_item'>";
            }

            if (JonieeNotification.objJoineeNotification[i].IsAlertNotification == true) {
                list += "<span class='notifications_left_sl_no'>" + (i + 1) + "</span>";
                var request = new XMLHttpRequest;
                request.open('GET', "ShowImage.ashx?id=" + JonieeNotification.objJoineeNotification[i].UserId + "", false);
                request.send();
                if (request.status === 200) {
                    list += "<span class='notifications_left_image'><img class='background-size-cover' src='ShowImage.ashx?id=" + JonieeNotification.objJoineeNotification[i].UserId + "' alt='' /></span>";
                }
                else {
                    list += "<span class='notifications_left_image'><img class='background-size-cover' src='Resources/Images/dummy_image.jpg' /></span>";
                }


                list += "<div class='notifications_left_details fleft'>";
                var UserName = (JonieeNotification.objJoineeNotification[i].UserName.length < 18 ? (JonieeNotification.objJoineeNotification[i].UserName) : (JonieeNotification.objJoineeNotification[i].UserName.substring(0, 18) + '...'));
                list += "<p class='font_name'>" + UserName + "</p>";
                list += "<p>" + JonieeNotification.objJoineeNotification[i].UserDesignation + "</p>" +
            								    "</div>" +
            							    "</div>";
                alertsNotificationArray[i] = new Array(a);
                alertsNotificationArray[i][0] = JonieeNotification.objJoineeNotification[i].UserName;
                alertsNotificationArray[i][1] = JonieeNotification.objJoineeNotification[i].UserDesignation;
                alertsNotificationArray[i][2] = JonieeNotification.objJoineeNotification[i].ConnectionStartDate;
                alertsNotificationArray[i][3] = JonieeNotification.objJoineeNotification[i].ConnectionEndDate;
                if (JonieeNotification.objJoineeNotification[i].DaysTotal <= 0)
                    alertsNotificationArray[i][4] = 'Done';
                else
                    alertsNotificationArray[i][4] = JonieeNotification.objJoineeNotification[i].DaysTotal + ' Days left';
                alertsNotificationArray[i][5] = JonieeNotification.objJoineeNotification[i].UserId;
                alertsNotificationArray[i][6] = JonieeNotification.objJoineeNotification[i].DisconnectionRequests;
                alertsNotificationArray[i][7] = JonieeNotification.objJoineeNotification[i].FeedbackRequest;
                alertsNotificationArray[i][8] = JonieeNotification.objJoineeNotification[i].IsAlertNotification;
                //JonieeNotification.objJoineeNotification[i].DaysTotal + ' ' + 'Days Left';
            }
            else {

                list += "<span class='notifications_left_sl_no'>" + (i + 1) + "</span>";
                var request = new XMLHttpRequest;
                request.open('GET', "ShowImage.ashx?id=" + JonieeNotification.objJoineeNotification[i].UserId + "", false);
                request.send();
                if (request.status === 200) {
                    list += "<span class='notifications_left_image'><img class='background-size-cover' src='ShowImage.ashx?id=" + JonieeNotification.objJoineeNotification[i].UserId + "' alt='' /></span>";
                }
                else {
                    list += "<span class='notifications_left_image'><img class='background-size-cover' src='Resources/Images/dummy_image.jpg' /></span>";
                }

                list += "<div class='notifications_left_details fleft'>";
                var UserName = (JonieeNotification.objJoineeNotification[i].UserName.length < 18 ? (JonieeNotification.objJoineeNotification[i].UserName) : (JonieeNotification.objJoineeNotification[i].UserName.substring(0, 18) + '...'));
                list += "<p class='font_name'>" + UserName + "</p>";
                list += "<p>" + JonieeNotification.objJoineeNotification[i].UserDesignation + "</p>";
                list += "</div>";
                list += "</div>";
                alertsNotificationArray[i] = new Array(a);
                alertsNotificationArray[i][0] = JonieeNotification.objJoineeNotification[i].UserName;
                alertsNotificationArray[i][1] = JonieeNotification.objJoineeNotification[i].UserDesignation;
                alertsNotificationArray[i][2] = JonieeNotification.objJoineeNotification[i].ConnectionStartDate;
                alertsNotificationArray[i][3] = JonieeNotification.objJoineeNotification[i].ConnectionEndDate;
                alertsNotificationArray[i][4] = JonieeNotification.objJoineeNotification[i].ConnectionStatus;
                alertsNotificationArray[i][5] = JonieeNotification.objJoineeNotification[i].UserId;
                alertsNotificationArray[i][8] = JonieeNotification.objJoineeNotification[i].IsAlertNotification;
            }
        }

        $("#JoineeNotification").append(list);

        if (JonieeNotification.objJoineeNotification[0].IsAlertNotification == true) {

            $('#pFromDate').removeClass('hiddenDiv');
            $('#pToDate').removeClass('hiddenDiv');
            //                $('#pStatus').removeClass('hiddenDiv');
            $('#dvAlertButtons').removeClass('hiddenDiv');
            $('#pRequestDate').addClass('hiddenDiv');

            var HistorySelectedUserId = JonieeNotification.objJoineeNotification[0].UserId;
            var HistorySelectedUserEmailId;
            HistorySelectedUserEmailId = GetAssociateEmailId(HistorySelectedUserId);
            $("#ccEmailId").val(HistorySelectedUserEmailId);

            if (HistorySelectedUserEmailId != false) {
                $("#BuddyName").html('');
                $("#BuddyName").append(JonieeNotification.objJoineeNotification[0].UserName + "        " + "<img style='cursor:pointer;' src='Resources/Images/presence_16-unknown.png' id ='imgCommunicatorStatus' title='Status' /><img title='Ping me' src='Resources/Images/communicator3.png' style='width:20px;cursor:pointer;margin-left:3px;' onclick='OpenCommunicatorTileView();'/><img src='Resources/Images/outlook.jpg' style='width:20px;cursor:pointer;margin-left:4px;' title='Mail' onclick='SendEmail();'/>");
            }
            else {
                $("#BuddyName").html('');
                $("#BuddyName").append(JonieeNotification.objJoineeNotification[0].UserName);
            }
            // document.getElementById("BuddyName").innerHTML = JonieeNotification.objJoineeNotification[0].UserName;
            document.getElementById("BuddyDesig").innerHTML = JonieeNotification.objJoineeNotification[0].UserDesignation;
            document.getElementById("StartDate").innerHTML = JonieeNotification.objJoineeNotification[0].ConnectionStartDate;
            document.getElementById("EndDate").innerHTML = JonieeNotification.objJoineeNotification[0].ConnectionEndDate;
            var status = JonieeNotification.objJoineeNotification[0].DaysTotal;
            //JonieeNotification.objJoineeNotification[0].DaysTotal + ' ' + 'Days Left';
            var request = new XMLHttpRequest;
            request.open('GET', "ShowImage.ashx?id=" + JonieeNotification.objJoineeNotification[0].UserId + "", false);
            request.send();
            if (request.status === 200) {
                $("#Buddyimage").attr('src', 'ShowImage.ashx?id=' + JonieeNotification.objJoineeNotification[0].UserId + '');
            }
            else {
                $("#Buddyimage").attr('src', 'Resources/Images/dummy_image.jpg');
            }
            $("#NotificationBuddyId").val(JonieeNotification.objJoineeNotification[0].UserId);


            if (JonieeNotification.objJoineeNotification[0].DisconnectionRequests == 1 && JonieeNotification.objJoineeNotification[0].FeedbackRequest != 1) {
                $('#AcceptNotification').show();
                $('#RejectNotification').show();
                $('#lnkBuddyFeedback').hide();
                document.getElementById("Status").innerHTML = 'Buddy wants to disengage with you';
            }
            else if (JonieeNotification.objJoineeNotification[0].DisconnectionRequests != 1 && JonieeNotification.objJoineeNotification[0].FeedbackRequest == 1) {
                $('#AcceptNotification').hide();
                $('#RejectNotification').hide();
                $('#lnkBuddyFeedback').show();
                $("#lnkBuddyFeedback").attr('href', 'new_joiners_view_feedback.aspx?BuddyId=' + JonieeNotification.objJoineeNotification[0].UserId + '');
                document.getElementById("Status").innerHTML = 'Provide the feedback for this Buddy';
            }
            else if (JonieeNotification.objJoineeNotification[0].DisconnectionRequests == 1 && JonieeNotification.objJoineeNotification[0].FeedbackRequest == 1) {
                $('#AcceptNotification').show();
                $('#RejectNotification').show();
                $('#lnkBuddyFeedback').show();
                $("#lnkBuddyFeedback").attr('href', 'new_joiners_view_feedback.aspx?BuddyId=' + JonieeNotification.objJoineeNotification[0].UserId + '');
                document.getElementById("Status").innerHTML = 'Buddy wants to disengage with you. Also, provide the feedback.';
            }
            else {
                $('#AcceptNotification').hide();
                $('#RejectNotification').hide();
                $('#lnkBuddyFeedback').hide();
                if (status == 0 || status <= 0)
                    document.getElementById("Status").innerHTML = 'Done';
                else
                    document.getElementById("Status").innerHTML = JonieeNotification.objJoineeNotification[0].DaysTotal + ' Days left';
            }

            //            if (JonieeNotification.objJoineeNotification[0].DisconnectionRequests == 1) {
            //                $('#AcceptNotification').show();
            //                $('#RejectNotification').show();
            //            }

            //            else {
            //                $('#AcceptNotification').hide();
            //                $('#RejectNotification').hide();
            //            }

            //            if (JonieeNotification.objJoineeNotification[0].FeedbackRequest == 1)
            //                $('#lnkBuddyFeedback').show();
            //            else
            //                $('#lnkBuddyFeedback').hide();
        }

        else {

            $('#pFromDate').addClass('hiddenDiv');
            $('#pToDate').addClass('hiddenDiv');
            //                $('#pStatus').removeClass('hiddenDiv');
            $('#dvAlertButtons').addClass('hiddenDiv');
            $('#pRequestDate').removeClass('hiddenDiv');

            var HistorySelectedUserId = JonieeNotification.objJoineeNotification[0].UserId;
            var HistorySelectedUserEmailId;
            HistorySelectedUserEmailId = GetAssociateEmailId(HistorySelectedUserId);

            if (HistorySelectedUserEmailId != false) {
                $("#BuddyName").html('');
                $("#BuddyName").append(JonieeNotification.objJoineeNotification[0].UserName + "        " + "<img style='cursor:pointer;' src='Resources/Images/presence_16-unknown.png' id ='imgCommunicatorStatus' title='Status' /><img title='Ping me' src='Resources/Images/communicator3.png' style='width:20px;cursor:pointer;margin-left:3px;' onclick='OpenCommunicatorTileView();'/><img src='Resources/Images/outlook.jpg' style='width:20px;cursor:pointer;margin-left:4px;' title='Mail' onclick='SendEmail();'/>");
            }
            else {
                $("#BuddyName").html('');
                $("#BuddyName").append(JonieeNotification.objJoineeNotification[0].UserName);
            }

            if (JonieeNotification.objJoineeNotification[0].ConnectionStatus == 'You have sent a Buddy request to this associate and the acceptance is pending. If your request is not accepted in 3 working days, you may raise a new request.') {
                $('#Status').attr('style', 'width: 335px; height: 75.86px; margin-top: -20px; margin-left: 110px;');
            }
            else {
                $('#Status').removeAttr('style');
            }

            //document.getElementById("BuddyName2").innerHTML = relation.objJoineeNotification[0].UserName;
            document.getElementById("BuddyDesig").innerHTML = JonieeNotification.objJoineeNotification[0].UserDesignation;
            document.getElementById("RequestDate").innerHTML = JonieeNotification.objJoineeNotification[0].ConnectionStartDate;
            document.getElementById("EndDate").innerHTML = JonieeNotification.objJoineeNotification[0].ConnectionEndDate;
            document.getElementById("Status").innerHTML = JonieeNotification.objJoineeNotification[0].ConnectionStatus;
            $('.notifications_content_right').attr('id', JonieeNotification.objJoineeNotification[0].UserId);
            var request = new XMLHttpRequest;
            request.open('GET', "ShowImage.ashx?id=" + JonieeNotification.objJoineeNotification[0].UserId + "", false);
            request.send();
            if (request.status === 200) {
                $("#Buddyimage").attr('src', 'ShowImage.ashx?id=' + JonieeNotification.objJoineeNotification[0].UserId + '');
            }
            else {
                $("#Buddyimage").attr('src', 'Resources/Images/dummy_image.jpg');
            }
        }
    }
    else {
        $('.notifications_content_right').addClass('hiddenDiv');
        $("#JoineeNotification").append("<label style='top:100px;position:absolute;right:-150px;color:#ffffff'>No alerts.....!!!</label>");
    }
}

function onerrorGetJoineeInboxNotification() {
}
//=======================================================Your Team Member Request Tab=============================================================
function GetNotificationJoineeTeamMembers() {
    var BuddyId = $('#CurrentUserId').val();
    $.ajax({
        type: 'POST',
        url: 'new_joiners_view_notifications.aspx/GetNotificationJoineeTeamMembers',
        contentType: 'application/json',
        data: "{BuddyId:'" + BuddyId + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            onsuccessGetNotificationJoineeTeamMembers(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            onerrorGetNotificationJoineeTeamMembers(xhr.status, thrownError);
        }
    });
}
function onsuccessGetNotificationJoineeTeamMembers(result) {

    var Members = eval('(' + result.d + ')');
    $("#JoineeTeamMember").html('');
    var a = Members.objJoineeNotification.length;
    var list = "";
    if (Members.objJoineeNotification.length == null || Members.objJoineeNotification.length == 0) {

        $(".notifications_content_right").addClass('hiddenDiv');
        $("#JoineeTeamMember").append("<label style='top:100px;position:absolute;right:-150px;color:#ffffff'>No alerts.....!!!</label>");


    }
    else {
        //        $("#lblNotificationOthers").text("");
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
            list += "<p>" + Members.objJoineeNotification[i].UserDesignation + "</p>";
            list += "</div>";
            list += "</div>";
            alertsNotificationArray[i] = new Array(a);
            alertsNotificationArray[i][0] = Members.objJoineeNotification[i].UserName;
            alertsNotificationArray[i][1] = Members.objJoineeNotification[i].UserDesignation;
            alertsNotificationArray[i][2] = Members.objJoineeNotification[i].UserId;

        }
        $("#JoineeTeamMember").append(list);

        var HistorySelectedUserId = Members.objJoineeNotification[0].UserId;
        var HistorySelectedUserEmailId;
        HistorySelectedUserEmailId = GetAssociateEmailId(HistorySelectedUserId);
        $("#SendMailEmailId").val(HistorySelectedUserEmailId);
        if (HistorySelectedUserEmailId != false) {
            $("#BuddyName1").html('');
            $("#BuddyName1").append(Members.objJoineeNotification[0].UserName + "        " + "<img style='cursor:pointer;' src='Resources/Images/presence_16-unknown.png' id ='imgCommunicatorStatus' title='Status' /><img title='Ping me' src='Resources/Images/communicator3.png' style='width:20px;cursor:pointer;margin-left:3px;' onclick='OpenCommunicatorTileView();'/><img src='Resources/Images/outlook.jpg' style='width:20px;cursor:pointer;margin-left:4px;' title='Mail' onclick='SendEmail();'/>");
        }
        else {
            $("#BuddyName1").html('');
            $("#BuddyName1").append(Members.objJoineeNotification[0].UserName);
        }

        document.getElementById("BuddyDesig1").innerHTML = Members.objJoineeNotification[0].UserDesignation;
        $('.notifications_content_right').attr('id', Members.objJoineeNotification[0].UserId);
        var request = new XMLHttpRequest;
        request.open('GET', "ShowImage.ashx?id=" + Members.objJoineeNotification[0].UserId + "", false);
        request.send();
        if (request.status === 200) {
            $("#BuddyImage1").attr('src', 'ShowImage.ashx?id=' + Members.objJoineeNotification[0].UserId + '');
        }
        else {
            $("#BuddyImage1").attr('src', 'Resources/Images/dummy_image.jpg');
        }
    }
}
function onerrorGetNotificationJoineeTeamMembers() {

}
//***************************************************************new_joiners_view_history.aspx***************************************************************
//===================================================================Joinee History==============================================
function GetJoineeHistory() {
    var JoineeId = $('#CurrentUserId').val();

    var type = 'Joinee';

    $.ajax({
        type: 'POST',
        url: 'new_joiners_view_history.aspx/GetJoineeHistory',
        contentType: 'application/json',
        data: "{JoineeId:'" + JoineeId + "',type:'" + type + "'}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            OnSuccessGetJoineeHistory(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            OnErrorGetJoineeHistory(xhr.status, thrownError);
        }
    });
}
function OnSuccessGetJoineeHistory(result) {
    var Joinee = eval('(' + result.d + ')');
    //objdetailed = Buddies

    var list = "";
    $("#JoineeHistory").html('');
    if (Joinee.MyConnections != null) {

        $(".history_content_right").removeClass('hiddenDiv');

        var a = Joinee.MyConnections.length;
        for (var i = 0; i < a; i++) {
            if (i == 0) {
                list += "<div class='history_left_item selected'>";
            }
            else {
                list += "<div class='history_left_item'>";
            }

            list += "<span class='history_left_sl_no'>" + (i + 1) + "</span>";

            var request = new XMLHttpRequest;
            request.open('GET', "ShowImage.ashx?id=" + Joinee.MyConnections[i].ConnectedToId + "", false);
            request.send();
            if (request.status === 200) {
                list += "<span class='history_left_image'><img class='background-size-cover' src='ShowImage.ashx?id=" + Joinee.MyConnections[i].ConnectedToId + "' alt='' /></span>";
            }
            else {
                list += "<span class='history_left_image'><img class='background-size-cover' src='Resources/Images/dummy_image.jpg' /></span>";
            }

            list += "<div class='history_left_details fleft'>";
            var UserName = (Joinee.MyConnections[i].UserName.length < 18 ? (Joinee.MyConnections[i].UserName) : (Joinee.MyConnections[i].UserName.substring(0, 30) + '...'));
            list += "<p class='font_name'>" + UserName + "</p>";
            list += "<p style='font:lighter 12px Segoe UI'>" + Joinee.MyConnections[i].UserDesignation + "</p>";
            list += "</div>";
            list += "</div>";
            historyArray[i] = new Array(a);
            historyArray[i][0] = Joinee.MyConnections[i].UserName;
            historyArray[i][1] = Joinee.MyConnections[i].UserDesignation;
            historyArray[i][2] = Joinee.MyConnections[i].ConnectionStartDate;
            historyArray[i][3] = Joinee.MyConnections[i].ConnectionEndDate;

            var days = Joinee.MyConnections[i].DaysTotal;
            if (days <= 0)
                historyArray[i][4] = "Done";
            else
                historyArray[i][4] = Joinee.MyConnections[i].DaysTotal + ' Days Left';
            historyArray[i][5] = Joinee.MyConnections[i].UserFirstName;
            historyArray[i][6] = Joinee.MyConnections[i].ConnectedToId;
            historyArray[i][7] = Joinee.MyConnections[i].DisconnectionStatus;

            document.getElementById("User_Id").value = Joinee.MyConnections[i].ConnectedToId;
            //document.getElementById("name").innerHTML = Joinee.MyConnections[i].UserFirstName;
        }
        $("#JoineeHistory").append(list);

        var HistorySelectedUserId = Joinee.MyConnections[0].ConnectedToId;
        var HistorySelectedUserEmailId;
        HistorySelectedUserEmailId = GetAssociateEmailId(HistorySelectedUserId);
        $("#ccEmailId").val(HistorySelectedUserEmailId);
        $("#SendMailEmailId").val(HistorySelectedUserEmailId);

        if (HistorySelectedUserEmailId != false) {
            $("#BuddyName").html('');
            $("#BuddyName").append(Joinee.MyConnections[0].UserName + "        " + "<img style='cursor:pointer;' src='Resources/Images/presence_16-unknown.png' id ='imgCommunicatorStatus' title='Status' /><img title='Ping me' src='Resources/Images/communicator3.png' style='width:20px;cursor:pointer;margin-left:3px;' onclick='OpenCommunicatorTileView();'/><img src='Resources/Images/outlook.jpg' style='width:20px;cursor:pointer;margin-left:4px;' title='Mail' onclick='SendEmail();'/>");
        }
        else {
            $("#BuddyName").html('');
            $("#BuddyName").append(Joinee.MyConnections[0].UserName);
        }

        document.getElementById("BuddyDesignation").innerHTML = Joinee.MyConnections[0].UserDesignation;
        document.getElementById("StartDate").innerHTML = Joinee.MyConnections[0].ConnectionStartDate;
        document.getElementById("EndDate").innerHTML = Joinee.MyConnections[0].ConnectionEndDate;
        var days = Joinee.MyConnections[0].DaysTotal;
        if (days <= 0)
            document.getElementById("Status").innerHTML = "Done";
        else
            document.getElementById("Status").innerHTML = Joinee.MyConnections[0].DaysTotal + ' Days Left';

        if (document.getElementById("Status").innerHTML == "Done") {
            document.getElementById("changetext").innerHTML = "Your earlier Buddy was ";
        }
        else {
            document.getElementById("changetext").innerHTML = "Your request has been accepted by ";
        }

        if (document.getElementById("Status").innerHTML == "Done" || Joinee.MyConnections[0].DisconnectionStatus == "Disengaged from Joinee" || Joinee.MyConnections[0].DisconnectionStatus == "Disengaged from Buddy") {
            $("#disconnectbtn").addClass('hiddenDiv');
        }
        else {
            $("#disconnectbtn").removeClass('hiddenDiv');
        }

        document.getElementById("User_Id").value = Joinee.MyConnections[0].ConnectedToId;
        document.getElementById("name").innerHTML = Joinee.MyConnections[0].UserFirstName;

        var request = new XMLHttpRequest;
        request.open('GET', "ShowImage.ashx?id=" + Joinee.MyConnections[0].ConnectedToId + "", false);
        request.send();
        if (request.status === 200) {
            $("#BuddyImage").attr('src', 'ShowImage.ashx?id=' + Joinee.MyConnections[0].ConnectedToId + '');
        }
        else {
            $("#BuddyImage").attr('src', 'Resources/Images/dummy_image.jpg');
        }

        $('.history_content_right').attr('id', Joinee.MyConnections[0].ConnectedToId);
        GetEnableStatusOfFeedButton();
        $("#feedbtn").attr('href', "new_joiners_view_feedback.aspx?BuddyId=" + Joinee.MyConnections[0].ConnectedToId + "");
        $('#HistoryBuddyId').val(Joinee.MyConnections[0].ConnectedToId);
        document.getElementById('viewprofile').setAttribute('href', "https://onecognizant.cognizant.com?GlobalAppId=896&Source=9&URL=https%3A%2F%2Fonecognizantapps.cognizant.com%2F896%2FDetailedProfilePage.aspx%3FhdnIsTMFlag%3dNo%26viewprofileid%3D" + Joinee.MyConnections[0].ConnectedToId + "");
    }
    else {
        document.getElementById("changetext").innerHTML = "No history of connections found ";
        $(".history_content_right").addClass('hiddenDiv');
        $("#JoineeHistory").append("<label style='top:100px;position:absolute;right:-150px;color:#ffffff'>No Connections Found.....!!!</label>");
    }
}

function OnErrorGetJoineeHistory(status, error) {

}

//================================================check status of feedback button=============================================

function GetEnableStatusOfFeedButton() {
    var JoineeId = $('#CurrentUserId').val();
    var BuddyId = $('.history_content_right')[0].id;

    $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/GetEnableStatusOfFeedButton',
        contentType: 'application/json',
        data: "{JoineeID:'" + JoineeId + "',BuddyID:'" + BuddyId + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            onsuccessGetEnableStatusOfFeedButton(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            onerrorGetEnableStatusOfFeedButton(xhr.status, thrownError);
        }
    });
}
function onsuccessGetEnableStatusOfFeedButton(result) {
    var ReturnStatus = eval('(' + result.d + ')');
    if (ReturnStatus.ConnectionStatus == 'NA') {
        $("#feedbtn").addClass('hiddenDiv');
    }
    else {
        $("#feedbtn").removeClass('hiddenDiv');
    }
}
function onerrorGetEnableStatusOfFeedButton() {

}
//========================================================Disconnection Request By Joinee========================================================
function DisconnectionRequestByJoinee() {
    var JoineeId = $('#CurrentUserId').val();
    var BuddyId = $('#HistoryBuddyId').val();
    var bywhom = 'Joinee';
    var RequestType = 'SEND';

    $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/DisconnectionRequest',
        contentType: 'application/json',
        data: "{joineeId:'" + JoineeId + "',buddyId:'" + BuddyId + "',bywhom:'" + bywhom + "',requestType:'" + RequestType + "'}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            OnSuccessDisconnectionRequestByJoinee(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            OnErrorDisconnectionRequestByJoinee(xhr.status, thrownError);
        }
    });
}

function OnSuccessDisconnectionRequestByJoinee() {
    $('.discontinue_confirmation_popup').hide();
    $('.discontinue_sent_info_popup').fadeIn();
    GetJoineeHistory();
}

function OnErrorDisconnectionRequestByJoinee() {
    $('.discontinue_confirmation_popup').hide();
    $('.error_popup').fadeIn();
    $("#lblCommonInfoPopup").html('');
    $("#lblCommonInfoPopup").append("Unable to send disconnection request. Please try after some time.");
    GetJoineeHistory();
}
//*******************************************************new_joiners_view_feedback.aspx***********************************************
//==========================================================Set Joinee Feedback===============================================================
var rating1 = 0;
var rating2 = 0;
var rating3 = 0;
var rating4 = 0;
var rating5 = 0;
$('input[type=radio]').live('click',
  function () {
      rating1 = $("#Rating1 input:radio:checked").val();
      rating2 = $("#Rating2 input:radio:checked").val();
      rating3 = $("#Rating3 input:radio:checked").val();
      rating4 = $("#Rating4 input:radio:checked").val();
      rating5 = $("#Rating5 input:radio:checked").val();
  });

$('.feedback_submit_btn').click(function () {

    var list = '';
    list = rating1 + ',';
    list += rating2 + ',';
    list += rating3 + ',';
    list += rating4 + ',';
    list += rating5;

    Getrating(list);

    //    var suggestion = $('#suggesttext').val();
    //    if ($.trim(suggestion) == '' || $.trim(suggestion) == 'Enter your comment here.') {
    //        $('.error_popup').fadeIn();
    //        $("#lblCommonInfoPopup").html('');
    //        $("#lblCommonInfoPopup").append("Please enter the comments(mandatory).");
    //   }
    //    else {
    //        SubComment();
    //    }
});

function Getrating(list) {
    var BuddyId = $('#BuddyId').val();
    var JoineeId = $('#CurrentUserId').val();

    $.ajax(
            {
                type: 'POST',
                url: 'new_joiners_view_history.aspx/SetFeedbackQuestions',
                contentType: 'application/json',
                data: "{JoineeId:'" + JoineeId + "',BuddyId:'" + BuddyId + "',list:'" + list + "'}",
                dataType: 'json',
                processData: false,
                success: function (response) {
                    //                    OnSuccessSetFeedbackQuestions(response);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    OnError(xhr.status, thrownError);
                }

            });

}


function SubComment() {
    var SubQ = document.getElementById("suggesttext").innerHTML;
    //        var hdnAssociateIDCtrl = document.getElementById('hdnAssociateID');
    //        var JoineeId = hdnAssociateIDCtrl.value;
    var BuddyId = $('#BuddyId').val();
    var JoineeId = $('#CurrentUserId').val();
    var FeedbackRate = $('#slider').slider('value');
    var SubQ_rep = "";
    for (var i = 0; i < SubQ.length; i++) {

        if (SubQ.substring(i, i + 1) == "'") {
            SubQ_rep = SubQ_rep + "~";
        }
        else {
            SubQ_rep = SubQ_rep + (SubQ.substring(i, i + 1));
        }
    }
    $.ajax(
            {
                type: 'POST',
                url: 'new_joiners_view_feedback.aspx/SetFeedbackDetails',
                contentType: 'application/json',
                data: "{JoineeId:'" + JoineeId + "',BuddyId:'" + BuddyId + "',FeedBackComment:'" + SubQ_rep + "',rating:'" + FeedbackRate + "'}",
                dataType: 'json',
                processData: false,
                success: function (response) {
                    OnSuccessSubQue(response, SubQ);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    OnError(xhr.status, thrownError);
                }

            });
    return true;
}
var add = 0;

function OnSuccessSubQue(response, SubQ) {
    $('.successful_popup').fadeIn();
    $("#lblSuccessfulPopup").html('');
    $("#lblSuccessfulPopup").append("Thanks. Feedback has been submitted successfully.");
    $('#Submit').hide();
    document.getElementById("suggesttext").disabled = true;
    document.getElementById("slider").disabled = true;
    document.getElementById("feedback_5").disabled = true;
}

function OnError(status, error) {
    $('.error_popup').fadeIn();
    $("#lblCommonInfoPopup").html('');
    $("#lblCommonInfoPopup").append("Feedback was not submitted succefully. Looks like some issue with connection.");
}

function textLimit(field, maxlen) {
    if (field.value.length > maxlen) {
        while (field.value.length > maxlen) {
            field.value = field.value.replace(/.$/, '');
        }
        // alert('your input has been truncated!');
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



function Disp() {

    document.getElementById("suggesttext").style.color = 'Gray';
    document.getElementById('suggesttext').defaultValue = 'Maximum 300 characters.';
}
function CLRSug() {
    document.getElementById("suggesttext").style.fontSize = '12px';
    document.getElementById("suggesttext").style.color = 'black';
}
function CLRSugb() {
    if (document.getElementById("suggesttext").innerHTML == "Maximum 300 characters.") {
        document.getElementById("suggesttext").style.fontSize = '10px';
        document.getElementById("suggesttext").style.color = 'gray';
    }
}
//====================================================Feedback details of Buddy===========================================================
function GetBuddyFeedbackDetails() {

    var BuddyId = $('#BuddyId').val();
    var JoineeId = $('#CurrentUserId').val();
    $.ajax({
        type: 'POST',
        url: 'new_joiners_view_feedback.aspx/GetBuddyFeedbackDetails',
        contentType: 'application/json',
        data: "{JoineeId:'" + JoineeId + "',BuddyId:'" + BuddyId + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            onsuccessGetBuddyFeedbackDetails(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            onerrorGetBuddyFeedbackDetails(xhr.status, thrownError);
        }
    });
}

function onerrorGetBuddyFeedbackDetails(status, thrownError) {

    alert("Something is wrong here, Please try again after sometime.");
}

function onsuccessGetBuddyFeedbackDetails(result) {
    var relation = eval('(' + result.d + ')');
    $('#Submit').show();
    document.getElementById("BuddyName1").innerHTML = relation.BuddyName;
    document.getElementById("BuddyName").innerHTML = relation.BuddyName;
    document.getElementById("BuddyDesig").innerHTML = relation.BuddyDesignation;
    document.getElementById("StartDate").innerHTML = relation.ConnectionStartDate;
    document.getElementById("EndDate").innerHTML = relation.ConnectionEndDate;
    if (relation.DaysTotal <= 0)
        document.getElementById("Status").innerHTML = 'Done';
    else
        document.getElementById("Status").innerHTML = relation.DaysTotal + ' ' + 'Days Left';

    var request = new XMLHttpRequest;
    request.open('GET', "ShowImage.ashx?id=" + relation.BuddiesId + "", false);
    request.send();
    if (request.status === 200) {
        $("#BuddyImage").attr('src', 'ShowImage.ashx?id=' + relation.BuddiesId + '');
    }
    else {
        $("#BuddyImage").attr('src', 'Resources/Images/dummy_image.jpg');
    }

    if (relation.FeedbackComment == 0 && relation.FeedbackRating == 0) {
        $('#assingslider').html('');
        document.getElementById("suggesttext").innerHTML = 'Enter your comment here.';
        $('#assingslider').html('<div class="slider_smiley_wrapper clear fleft"><div class="slider_content_wrapper clear fleft" ><p class="fleft" >How much your buddy was helpful?</p><div id="slider_wrapper" class="fleft"><div id="slider"></div><div class="feedback_5 fleft"></div></div></div><div class="smiley_wrapper fleft"></div></div>');
        document.getElementById("suggesttext").disabled = false;
        document.getElementById("slider").disabled = false;
        document.getElementById("feedback_5").disabled = false;

    }

    else if (relation.FeedbackComment == 0 && relation.FeedbackRating != 0) {

        document.getElementById("textdown").innerHTML = 'You have already given a rating..!!';

        $('#assingslider').html('');
        $('#slider').slider('value', relation.FeedbackRating);
        document.getElementById("suggesttext").innerHTML = 'Enter your comment here.';
        switch (relation.FeedbackRating) {
            case 1:
                $("#slider_wrapper").css('background-image', 'url("../../Resources/Images/NA/slider_bg.png")');
                $(".smiley_wrapper").css('background-image', 'url("../../Resources/Images/NA/smiley_sad.png")');
                break;
            case 2:
                $("#slider_wrapper").css('background-image', 'url("../../Resources/Images/NA/slider_bg_2.png")');
                $(".smiley_wrapper").css('background-image', 'url("../../Resources/Images/NA/smiley_disappointed.png")');
                break;
            case 3:
                $("#slider_wrapper").css('background-image', 'url("../../Resources/Images/NA/slider_bg_3.png")');
                $(".smiley_wrapper").css('background-image', 'url("../../Resources/Images/NA/smiley_happy.png")');
                break;
            case 4:
                $("#slider_wrapper").css('background-image', 'url("../../Resources/Images/NA/slider_bg_4.png")');
                $(".smiley_wrapper").css('background-image', 'url("../../Resources/Images/NA/smiley_cool.png")');
                break;
            case 5:
                $("#slider_wrapper").css('background-image', 'url("../../Resources/Images/NA/slider_bg_5.png")');
                $(".smiley_wrapper").css('background-image', 'url("../../Resources/Images/NA/smiley_lol.png")');
                break;
            default:
                $("#slider_wrapper").css('background-image', 'url("../../Resources/Images/NA/slider_bg.png")');
                $(".smiley_wrapper").css('background-image', 'url("../../Resources/Images/NA/smiley_lol.png")');
                break;
        }
        if (relation.FeedbackRating > 3) {
            $(".ui-slider-handle").css('background-image', 'url("../../Resources/Images/NA/slider_handle_green.png")');
        } else {
            $(".ui-slider-handle").css('background-image', 'url("../../Resources/Images/NA/slider_handle.png")');
        }
        document.getElementById("suggesttext").disabled = false;
        document.getElementById("slider").disabled = true;
        document.getElementById("feedback_5").disabled = true;
    }
    else if (relation.FeedbackComment != 0 && relation.FeedbackRating == 0) {

        document.getElementById("textup").innerHTML = 'You have already given a feedback comments';
        $('#assingslider').html('');
        document.getElementById('suggesttext').innerHTML = relation.FeedbackComment;
        $('#assingslider').html('<div class="slider_smiley_wrapper clear fleft"><div class="slider_content_wrapper clear fleft" ><p class="fleft" >How much your buddy was helpful?</p><div id="slider_wrapper" class="fleft"><div id="slider"></div><div class="feedback_5 fleft"></div></div></div><div class="smiley_wrapper fleft"></div></div>');
        document.getElementById("suggesttext").disabled = true;
        document.getElementById("slider").disabled = false;
        document.getElementById("feedback_5").disabled = false;
        //document.getElementById("Submit").disabled = true;           

    }
    else if (relation.FeedbackComment != 0 && relation.FeedbackRating != 0) {

        document.getElementById("textdown").innerHTML = 'You have already given a rating..!!';
        document.getElementById("textup").innerHTML = 'You have already given a feedback..!!';
        document.getElementById("suggesttext").innerHTML = relation.FeedbackComment;

        $('#assingslider').html('');
        //document.getElementById("Submit").disabled = true;
        $('#Submit').hide();
        // $('#assingslider').html("<label >Your feedback rating is  " + relation.FeedbackRating + ".</label>");
        $('#slider').slider('value', relation.FeedbackRating);
        switch (relation.FeedbackRating) {
            case 1:
                $("#slider_wrapper").css('background-image', 'url("../../Resources/Images/NA/slider_bg.png")');
                $(".smiley_wrapper").css('background-image', 'url("../../Resources/Images/NA/smiley_sad.png")');
                break;
            case 2:
                $("#slider_wrapper").css('background-image', 'url("../../Resources/Images/NA/slider_bg_2.png")');
                $(".smiley_wrapper").css('background-image', 'url("../../Resources/Images/NA/smiley_disappointed.png")');
                break;
            case 3:
                $("#slider_wrapper").css('background-image', 'url("../../Resources/Images/NA/slider_bg_3.png")');
                $(".smiley_wrapper").css('background-image', 'url("../../Resources/Images/NA/smiley_happy.png")');
                break;
            case 4:
                $("#slider_wrapper").css('background-image', 'url("../../Resources/Images/NA/slider_bg_4.png")');
                $(".smiley_wrapper").css('background-image', 'url("../../Resources/Images/NA/smiley_cool.png")');
                break;
            case 5:
                $("#slider_wrapper").css('background-image', 'url("../../Resources/Images/NA/slider_bg_5.png")');
                $(".smiley_wrapper").css('background-image', 'url("../../Resources/Images/NA/smiley_lol.png")');
                break;
            default:
                $("#slider_wrapper").css('background-image', 'url("../../Resources/Images/NA/slider_bg.png")');
                $(".smiley_wrapper").css('background-image', 'url("../../Resources/Images/NA/smiley_lol.png")');
                break;
        }
        if (relation.FeedbackRating > 3) {
            $(".ui-slider-handle").css('background-image', 'url("../../Resources/Images/NA/slider_handle_green.png")');
        } else {
            $(".ui-slider-handle").css('background-image', 'url("../../Resources/Images/NA/slider_handle.png")');
        }
        document.getElementById("suggesttext").disabled = true;
        document.getElementById("slider").disabled = true;
        document.getElementById("feedback_5").disabled = true;
    }

}
//=============================================== Send mail through contact card ================================================
function SendEmail() {
    var body = "Hi,";
    var To = $("#SendMailEmailId")[0].value;
    //var To = document.getElementById("SendMailEmailId").innerHTML;
    var subject = "Buddy App Program";
    //window.location.href = "mailto:" + To + "?subject=" + subject + "&body=" + body;
    window.open("mailto:" + To + "?subject=" + subject + "&body=" + body);
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
        data: "{UserId:'" + UserId + "'}",
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
//======================================checkieligibility=============================================================
function CheckEligibility(BuddyId) {
    $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/IsAssociateEligible',
        contentType: 'application/json',
        data: "{BuddyId:'" + BuddyId + "'}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            OnSuccessCheckEligibility(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            OnErrorCheckEligibility(xhr.status, thrownError);
        }
    });
}

function OnSuccessCheckEligibility(response) {
    var Associate = eval('(' + response.d + ')');
    if (Associate.IsEligible == true) {
        var JoineeId = $("#CurrentUserId").val();
        var BuddyId = document.getElementById('BuddyEligibleId').value;
        CheckConnectionRequest(JoineeId, BuddyId);
    }
    else {
        $('.confirmation_popup').hide();
        $('.error_popup').fadeIn();
        $("#lblCommonInfoPopup").html('');
        $("#lblCommonInfoPopup").append("Buddy is not eligible to accept your request.");
    }

}

function OnErrorCheckEligibility() {
    $('.confirmation_popup').hide();
    $('.error_popup').fadeIn();
    $("#lblCommonInfoPopup").html('');
    $("#lblCommonInfoPopup").append("Buddy is not eligible to accept your request.");
}

// ==================================================  Get PageContent =================================================================
function GetPageContent() {
    var PageName = $('body').attr('id');
    var CountryId = $('#CountryId').val();
    var Role = 'Joinee';

    $.ajax({
        type: 'POST',
        url: bodyId + '.aspx/GetPageContent',
        contentType: 'application/json',
        data: "{CountryId:'" + CountryId + "',PageName:'" + PageName + "',Role:'" + Role + "'}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            var PageContent = eval('(' + response.d + ')');
            var length = PageContent.PageContentDetails.length;
            // var Tile = PageContent.PageContentDetails[0].TileNo;
            //for (var i = 0; i < length; i++) {
            //    document.getElementById('reader' + i).innerHTML = PageContent.PageContentDetails[i].Reader;
            //    document.getElementById('content' + i).innerHTML = PageContent.PageContentDetails[i].Content;
            //}

            //document.getElementById('lblConnectionDuration').innerHTML = ConnectionDuration.value;
            //document.getElementById('lblDurationStoryline1').innerHTML = ConnectionDuration.value;
            //document.getElementById('lblDurationStoryline2').innerHTML = ConnectionDuration.value;
            //document.getElementById('lblDurationStoryline3').innerHTML = ConnectionDuration.value;

        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });
}

// ===================================================Get Questions and Feedback =====================================================

function GetFeedbackQuestions() {
    var BuddyId = '298015';
    var JoineeId = '362055';
    var ReviewType = '';


    $.ajax({
        type: 'POST',
        url: 'new_joiners_view_history.aspx/GetFeedbackQuestions',
        contentType: 'application/json',
        data: "{BuddyId:'" + BuddyId + "'}",
        dataType: 'json',

        processData: false,
        success: function (response) {
            OnSuccessGetFeedbackQuestions(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            OnErrorGetFeedbackQuestions(xhr.status, thrownError);
        }
    });
}

function OnSuccessGetFeedbackQuestions(response) {
    var Questions = eval('(' + response.d + ')');
    var length = Questions.objFeedbackQuestions.length;

    $('.')
    for (var i = 0; i < length; i++) {

        //document.getElementById('Question' + i).innerHTML = Questions.objFeedbackQuestions[i].QuestionText;
    }


}

// ======================================================= search click event ===========================================

$('#clsSearch_content').livequery("click", function () {
    var p = '';
});
//*********************************************** location Binding *******************************************************
function GeLocation() {
    var PageName = $('body').attr('id');
    var AssociateId = $('#CurrentUserId').val();
    $.ajax({
        type: 'POST',
        url: bodyId + '.aspx/GeLocation',
        contentType: 'application/json',
        data: "{AssociateId:'" + AssociateId + "'}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            var Location = eval('(' + response.d + ')');
            var length = Location.length;
            var list = '';
            $("#Loc").html('');
            list += '<option value="All">All</option>'
            for (var i = 0; i < length; i++) {
                list += '<option value=' + Location[i].Cityname + '>' + Location[i].Cityname + '</option>';
            }
            $("#Loc").append(list);
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });
}
//================================================= Click Search ===================================================
$('#SearchAdvisor').bind('click', function () {
    GetAllPossibleAdvisors();
    if ($('#Loc').val() == 'All') {
        var Location = '';
    }
    else {
        var Location = $('#Loc').val();
    }
    if (ProjectId_NA != '' || BUId_NA != '' || AccountId_NA != '') {
        if (ProjectId_NA != '') {
            document.getElementById("ProjectName").disabled = true;
        }
        else if (BUId_NA != '') {
            document.getElementById("BU").disabled = true;
        }
        else if (AccountId_NA != '') {
            document.getElementById("Account").disabled = true;
        }
        else if (Location != '') {
            $("#Loc").prop('disabled', 'disabled');
        }


        document.getElementById("SearchAdvisor").disabled = true;
        $("#FiterAdvisor").show();
        $("#Reset").show();
    }
});
//================================================= Filter Search ===================================================
$('#FiterAdvisor').bind('click', function () {
    FilterLikelyAdvisors();
});
// =================================================== Get AllPossibile Advisors =====================================================
var allresult;  //global variable to store entire Advisors list without any filteration
var level1result;     //filtered w.r.t. registration & availability

function GetAllPossibleAdvisors() {
    var bodyId = $('body').attr('id');
    var joineeId = $('#CurrentUserId').val();
    var BuddyId = AdvisorId;
    if ($('#Loc').val() == 'All') {
        var Location = '';
    }
    else {
        var Location = $('#Loc').val();
    }
    var BUId = BUId_NA;
    var ProjectId = ProjectId_NA;
    var AccountId = AccountId_NA;

    $.ajax({
        type: 'POST',
        url: 'new_joiners_view_circles.aspx/GetAllPossibleAdvisors',
        contentType: 'application/json',
        data: "{joineeId:'" + joineeId + "',BuddyId:'" + BuddyId + "',Location:'" + Location + "',BUId:'" + BUId + "',ProjectId:'" + ProjectId + "',AccountId:'" + AccountId + "'}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            //var result = eval('(' + response.d + ')');
            OnSuccessGetAllPossibleAdvisors(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {

            OnErrorGetAllPossibleAdvisors(xhr.status, thrownError);
        }
    });
}

function OnSuccessGetAllPossibleAdvisors(result) {
    allresult = result;     //Global variable to save the result
    level1result = eval('(' + result.d + ')');   //by default without filtered buddies
    var Advisors = eval('(' + result.d + ')');

}

function FilterLikelyAdvisors() {
    var allBuddies = eval('(' + allresult.d + ')');
    //var filter = "Enrolled/Busy"; // This for enrolled/Status filter selected from dropdown 
    var obj = {};
    obj.BuddyList = [];
    var ads = {};
    ads.AdvisorList = [];
    var i = 0;
    var j = 0;
    if ($('#Loc').val() == 'All') {
        var Location = '';
    }
    else {
        var Location = $('#Loc').val();
    }

    if ($('#RegisterAdvisor').val() == 'all') {
        var Enrolled = '';
    }
    else {
        var Enrolled = $('#RegisterAdvisor').val();
    }

    if ($('#Status').val() == 'all') {
        var Status = '';
    }
    else {
        var Status = $('#Status').val();
    }

    if (BUId_NA != "" || ProjectId_NA != "" || AccountId_NA != "") {
        if (BUId_NA != "") {
            if (ProjectId_NA != "" && AccountId_NA == "") {
                for (i = 0; i < allBuddies.length; i++) {
                    if (allBuddies[i].ProjectName == ProjectName_NA && allBuddies[i].BU == BUName_NA) {
                        obj.BuddyList[j] = {};
                        obj.BuddyList[j] = allBuddies[i];
                        j++;
                    }
                }
            }
            else if (AccountId_NA != "" && ProjectId_NA == "") {
                for (i = 0; i < allBuddies.length; i++) {
                    if (allBuddies[i].BU == BUName_NA && allBuddies[i].Account == AccountName_NA) {
                        obj.BuddyList[j] = {};
                        obj.BuddyList[j] = allBuddies[i];
                        j++;
                    }
                }
            }
            else if (AccountId_NA != "" && ProjectId_NA != "") {
                for (i = 0; i < allBuddies.length; i++) {
                    if (allBuddies[i].BU == BUName_NA && allBuddies[i].ProjectName == ProjectName_NA && allBuddies[i].Account == AccountName_NA) {
                        obj.BuddyList[j] = {};
                        obj.BuddyList[j] = allBuddies[i];
                        j++;
                    }
                }
            }
            else {
                for (i = 0; i < allBuddies.length; i++) {
                    if (allBuddies[i].BU == BUName_NA) {
                        obj.BuddyList[j] = {};
                        obj.BuddyList[j] = allBuddies[i];
                        j++;
                    }
                }
            }
        }

        else if (ProjectId_NA != "") {
            if (AccountId_NA != "") {
                for (i = 0; i < allBuddies.length; i++) {
                    if (allBuddies[i].ProjectName == ProjectName_NA && allBuddies[i].Account == AccountName_NA) {
                        obj.BuddyList[j] = {};
                        obj.BuddyList[j] = allBuddies[i];
                        j++;
                    }
                }
            }
            else {
                for (i = 0; i < allBuddies.length; i++) {
                    if (allBuddies[i].ProjectName == ProjectName_NA) {
                        obj.BuddyList[j] = {};
                        obj.BuddyList[j] = allBuddies[i];
                        j++;
                    }
                }
            }
        }
        else {
            for (i = 0; i < allBuddies.length; i++) {
                if (allBuddies[i].Account == AccountName_NA) {
                    obj.BuddyList[j] = {};
                    obj.BuddyList[j] = allBuddies[i];
                    j++;
                }
            }
        }
        level1result = obj.BuddyList;
    }

    if (Location != '' || Enrolled != '' || Status != '') {
        j = 0;
        //============= Write same logic as above ============================
        if (Location != '') {
            if (Enrolled != '' && Status == '') {
                for (i = 0; i < level1result.length; i++) {
                    if (level1result[i].Location == Location && level1result[i].IsRegisteredBuddy == Enrolled) {
                        ads.AdvisorList[j] = {};
                        ads.AdvisorList[j] = level1result[i];
                        j++;
                    }
                }
            }
            else if (Enrolled == '' && Status != '') {
                for (i = 0; i < level1result.length; i++) {
                    if (level1result[i].Location == Location && level1result[i].IsAvailable == Status) {
                        ads.AdvisorList[j] = {};
                        ads.AdvisorList[j] = level1result[i];
                        j++;
                    }
                }
            }
            else if (Enrolled != '' && Status != '') {
                for (i = 0; i < level1result.length; i++) {
                    if (level1result[i].Location == Location && level1result[i].IsAvailable == Status && level1result[i].IsRegisteredBuddy == Enrolled) {
                        ads.AdvisorList[j] = {};
                        ads.AdvisorList[j] = level1result[i];
                        j++;
                    }
                }
            }
            else {
                for (i = 0; i < level1result.length; i++) {
                    if (level1result[i].Location == Location) {
                        ads.AdvisorList[j] = {};
                        ads.AdvisorList[j] = level1result[i];
                        j++;
                    }
                }
            }
        }
        else if (Enrolled != '') {
            if (Status != '') {
                for (i = 0; i < level1result.length; i++) {
                    if (level1result[i].IsAvailable == Status && level1result[i].IsRegisteredBuddy == Enrolled) {
                        ads.AdvisorList[j] = {};
                        ads.AdvisorList[j] = level1result[i];
                        j++;
                    }
                }
            }
            else {
                for (i = 0; i < level1result.length; i++) {
                    if (level1result[i].IsRegisteredBuddy == Enrolled) {
                        ads.AdvisorList[j] = {};
                        ads.AdvisorList[j] = level1result[i];
                        j++;
                    }
                }
            }
        }
        else {
            for (i = 0; i < level1result.length; i++) {
                if (level1result[i].IsAvailable == Status) {
                    ads.AdvisorList[j] = {};
                    ads.AdvisorList[j] = level1result[i];
                    j++;
                }
            }
        }
        level1result = ads.AdvisorList;
    }


}


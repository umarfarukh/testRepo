$(document).ready(function () {
    // Display name

    $('.welcome_text').html('');
    var list = '';
    list += 'Welcome<br> <strong>' + DisplayName.value + '</strong><br>' + Designation.value + '';
    $('.welcome_text').append(list);

    ShowHideTiles();

    var advisor_name = [
          "123456",
          "James",
          "Louis",
		  "Madison James",
		  "Joe", "Doe", "John"
      ];
    $('#inpt_IDname_associate').autocomplete({
        source: advisor_name,
        appendTo: '#autocomplete_admin',
        open: function () {
            $('#autocomplete_admin .ui-menu').width(158)
        },
        response: function (event, ui) {
            if (!ui.content.length) {
                var noResult = {
                    value: "",
                    label: "No results found"
                };
                ui.content.push(noResult);
            }
        }
    });
    $('#inpt_IDname_associate_rec').autocomplete({
        source: advisor_name,
        appendTo: '#autocomplete_admin',
        open: function () {
            $('#autocomplete_admin .ui-menu').width(158)
        },
        response: function (event, ui) {
            if (!ui.content.length) {
                var noResult = {
                    value: "",
                    label: "No results found"
                };
                ui.content.push(noResult);
            }
        }
    });
    $('#inpt_IDname_advisors').autocomplete({
        source: advisor_name,
        appendTo: '#autocomplete_admin',
        open: function () {
            $('#autocomplete_admin .ui-menu').width(200)
        },
        response: function (event, ui) {
            if (!ui.content.length) {
                var noResult = {
                    value: "",
                    label: "No results found"
                };
                ui.content.push(noResult);
            }
        }
    });
    $('.selectpicker').selectpicker({

    });

    //Sliding
    $('.more_icon').click(function () {
        $("#panel").slideToggle("slow");
    });


    //Pop up end_connection
    //    $('.no_end_connection').click(function () {
    //        $('.wrapper').prepend('<div class="overlay"></div>');
    //        $('.wrapper').addClass('overflowhid');
    //        $('#endConnection').show();
    //        $(this).addClass('accept_clicked')

    //    });
    //    $('.popup_close').click(function () {
    //        $('#endConnection').hide();
    //        $('.wrapper').removeClass('overflowhid');
    //        $('.overlay').hide();
    //    });
    //    $('#yes_end_connection').click(function () {
    //        $('#endConnection').hide();
    //        $('.wrapper').removeClass('overflowhid');
    //        $('.overlay').hide();
    //        $('.accept_clicked').attr('disabled', 'disabled')
    //								.css({
    //								    "color": "gray",
    //								    "background-color": "gray",
    //								    "border-style": "solid"
    //								});

    //    });
    $('#no_end_connection').click(function () {
        $('.accept_clicked').removeClass('accept_clicked');
        $('#endConnection').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
    });


    //navigation by div
    //slide 20
    //    $(".volunteer_advisor").click(function () {
    //        if ($(this).hasClass('pending_req')) {
    //            $("#clsSlide20Home_content").hide();
    //            $("#clsRequest_content").show();
    //            $('.menu_list_header ul').find('.selected').removeClass('selected');
    //            $('.menu_list_header ul li:nth-child(2)').addClass('selected');

    //            $('.menu_list ul').find('.selected').removeClass('selected');
    //            $('.menu_list ul li:nth-child(2)').addClass('selected');

    //            /* if($('#clsRequest_content .res_wrapper').height()>417){
    //            $('#clsRequest_content .res_wrapper').css({'overflow':'auto','height':'417px'})}
    //            else{$('#clsRequest_content .res_wrapper').css({'overflow':'hidden','height':'auto'})}
    //            */
    //        }
    //        else {
    //            $('.wrapper').prepend('<div class="overlay"></div>');
    //            $('.wrapper').addClass('overflowhid');
    //            $('#popup_volunteer').show();
    //        }
    //    });

    $(".volunteer_advisor").click(function () {
        $('.wrapper').prepend('<div class="overlay"></div>');
        $('.wrapper').addClass('overflowhid');
        $('#popup_volunteer').show();
    });

    $('.popup_close').click(function () {
        $('#popup_volunteer').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
    });
    $('#ys_volunteer').click(function () {

        NominateAsBuddy();
    });

    $('#no_volunteer').click(function () {
        $('#popup_volunteer').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
    });
    $('.clsOk_req').click(function () {
        $('#Popup2_send').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
        //        $('#clsSlide20Home_content').show();
        //        $(".volunteer_advisor").addClass('pending_req');
        //        $(".volunteer_advisor").find('h5').html('View your Pending Requests');
        //        $(".volunteer_advisor").find('p').html('Click here to view your pending Advisor requests.');

    });
    $('.popup_close').click(function () {
        $('#Popup2_send').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
    });


    //slide 22
    /*$(".pending_req").click(function() {	
    $("#clsSlide22Home_content").hide();
    $("#clsRequest_content").show();
    $('.menu_list_header ul').find('.selected').removeClass('selected');		
    $('.menu_list_header ul li:nth-child(5)').addClass('selected');
			
    $('.menu_list ul').find('.selected').removeClass('selected');		
    $('.menu_list ul li:nth-child(5)').addClass('selected');
			
    });*/


    //slide 23
    //confirm 

    $('#accept_req').click(function () {
        /* $('.accept_clicked').attr('disabled','disabled');
        $('.accept_clicked').next().attr('disabled','disabled');
        $('.accept_clicked').next().css('opacity','0.5') */
        $('#accept_request').hide();
        $('.overlay').hide();
        $('.wrapper').addClass('pending_req_clicked');
        $('.view_connections').parent().show();
        $('.newhire_advisor_content').addClass('align_newhire_advisor_content');
        $('.accept_clicked').parent().html('Accepted');
        $('.accept_clicked').removeClass('accept_clicked');
        var RejectionComment = '';
        BuddyConnectionRequest(AcceptJoineeId, RejectionComment);
    });
    $('#reject_req').click(function () {
        $('.accept_clicked').removeClass('accept_clicked');
        $('#accept_request').hide();
        $('.overlay').hide();
    });
    $('.clsDecline').click(function () {
        $('.wrapper').prepend('<div class="overlay"></div>');
        $('.wrapper').addClass('overflowhid');
        $('#decline_popup').show();
        /*$(this).parent().html('Declined');*/
        $('.accept_clicked').removeClass('accept_clicked');
        $(this).addClass("decline_req");
    });

    $('.popup_close').click(function () {
        $('#decline_popup').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
    });


    //Slide26
    //1 NewHire Info
    $(".role_advisor").click(function () {
        $("#role_advisor_content").show();
        $("#clsSlide20Home_content").hide();
        $("#clsSlide22Home_content").hide();
        $("#clsSlide26Home_content").hide();
        $('.menu_list_header ul').find('.selected').removeClass('selected');
        $('.menu_list_header ul li:nth-child(1)').addClass('selected');

        $('.menu_list ul').find('.selected').removeClass('selected');
        $('.menu_list ul li:nth-child(1)').addClass('selected');
        $("#clsReq27_content").hide();
        GetPageContent();
    });


    //3 ViewConnectn
    $(".view_connections").click(function () {
        if ($(this).hasClass('pending_req')) {
            $("#clsSlide20Home_content").hide();
            $("#clsRequest_content").show();
            $('.menu_list_header ul').find('.selected').removeClass('selected');
            $('.menu_list_header ul li:nth-child(2)').addClass('selected');

            $('.menu_list ul').find('.selected').removeClass('selected');
            $('.menu_list ul li:nth-child(2)').addClass('selected');
            GetPendingRequests();
            /* if($('#clsRequest_content .res_wrapper').height()>417){
            $('#clsRequest_content .res_wrapper').css({'overflow':'auto','height':'417px'})}
            else{$('#clsRequest_content .res_wrapper').css({'overflow':'hidden','height':'auto'})}
            */
        }
        else {
            $("#clsSlide20Home_content").hide();
            $("#clsReq27_content").show();
            $('.menu_list_header ul').find('.selected').removeClass('selected');
            $('.menu_list_header ul li:nth-child(5)').addClass('selected');

            $('.menu_list ul').find('.selected').removeClass('selected');
            $('.menu_list ul li:nth-child(5)').addClass('selected');
            //GetAllConnections();
        }
    });


    //Review Feedback

    $('.close_popup,#feedback .popup_close').click(function () {
        $('.modal-backdrop').remove();
        $('.modal').removeClass('in')
    });

    // 4 history_details
    $(".history_details").click(function () {
        $('#clsAlert_content').show();
        $("#clsSlide26Home_content").hide();
        $("#clsSlide22Home_content").hide();
        $("#clsReq27_content").hide();
        $("#clsSlide20Home_content").hide();
        $('.menu_list_header ul').find('.selected').removeClass('selected');
        $('.menu_list_header ul li:nth-child(3)').addClass('selected');

        $('.menu_list ul').find('.selected').removeClass('selected');
        $('.menu_list ul li:nth-child(3)').addClass('selected');
        //			console.log($('#clsAlert_content .res_wrapper').height())
        /* if($('#clsAlert_content .res_wrapper').height()>417)
        { $('#clsAlert_content .res_wrapper').css({'overflow-y':'auto','height':'417px'}) 
        }
        else{$('#clsAlert_content .res_wrapper').css({'overflow':'hidden','height':'auto'})} */
    });


    //navigation by icons
    //whole nav by icons
    //Page navigation by icons (desktop and tab )
    $('.menu_list_header ul li a').click(function (ev) {
        $('.menu_list_header ul li').removeClass('selected');
        $(ev.currentTarget).parent('li').addClass('selected');
    });
    $(".home_icon").click(function () {
        $("#clsSlide20Home_content").show();
        $("#clsSlide22Home_content").hide();
        $("#clsReq27_content").hide();
        $("#clsRequest_content").hide();
        $("#role_advisor_content").hide();
        $('#clsAlert_content').hide();
        $('#tab_superadmin').hide();
        $('.supervisor_view').hide();
    });

    $(".details_icon").click(function () {
        $("#clsRequest_content").show();
        $("#clsSlide26Home_content").hide();
        $("#clsSlide20Home_content").hide();
        $("#clsReq27_content").hide();
        $("#role_advisor_content").hide();
        $('#clsAlert_content').hide();
        $('#tab_superadmin').hide();
        $('.supervisor_view').hide();
        /* if($("#clsReq27_content .req27_wrapper").height()>417){
        $("#clsReq27_content .req27_wrapper").css({'overflow-y':'auto','height':'417px'});
        }
        else{
        $("#clsReq27_content .req27_wrapper").css({'overflow':'auto','height':'auto'})
        }	 */
    });

    $('.alert_icon').click(function () {
        $('#clsAlert_content').show();
        $("#clsSlide26Home_content").hide();
        $("#clsReq27_content").hide();
        $("#clsSlide20Home_content").hide();
        $("#role_advisor_content").hide();
        $("#clsRequest_content").hide();
        $('#tab_superadmin').hide();
        $('.supervisor_view').hide();

    });

    $('.history_icon').click(function () {
        $("#clsReq27_content").show();
        $('#clsAlert_content').hide();
        $("#clsSlide26Home_content").hide();
        $("#clsSlide20Home_content").hide();
        $("#role_advisor_content").hide();
        $("#clsRequest_content").hide();
        $('#tab_superadmin').hide();
        $('.supervisor_view').hide();

    });

    //Superadmin
    $('.superadmin_icon').click(function () {
        $('#tab_superadmin').show();
        $("#clsReq27_content").hide();
        $('#clsAlert_content').hide();
        $("#clsSlide26Home_content").hide();
        $("#clsSlide20Home_content").hide();
        $("#role_advisor_content").hide();
        $("#clsRequest_content").hide();
        $('.supervisor_view').hide();

    });



    //Supervisor
    $('.supervisor_icon').click(function () {
        /*$('.wrapper').prepend('<div class="overlay"></div>');
        $('.wrapper').addClass('overflowhid');
        $('#admin_access').show();*/
        $('#clsSlide20Home_content').hide();
        $('#clsSearch_content').hide();
        $('#clsAdvisorHome_content').hide();
        $('#clsAlert_content').hide();
        $('#clsHirepgm_content').hide();
        $('.main_content_advisor').hide();
        $('#tab_superadmin').hide();
        $('.supervisor_view').show();
        $('#clsReq27_content').hide();
        $('#clsRequest_content').hide();
    });
    $('#clsOk_access').click(function () {
        $('#admin_access').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
    });
    $('.popup_close').click(function () {
        $('#admin_access').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();

    });


    //Page navigation by icons (for mobile)
    $('.menu_list ul li a').click(function (ev) {
        $('.menu_list ul li').removeClass('selected');
        $(ev.currentTarget).parent('li').addClass('selected');
    });

    //console.log($('.res_wrapper').height())
    if (($('.res_wrapper').height()) > 417) {
        //	console.log('hi')
        $(this).css('overflow-y', 'auto');
    }

    //Tooltip function
    $('.header_icons').find('.list_menu_icon').each(function () {
        $(this).hover(function () {

            $(this).children('.driver_score').show();
            //$('.driver_score').show();					
        }).mouseleave(function (event) {
            $(this).children('.driver_score').hide();

        });
    });


    //**SUPERADMIN VIEW**//
    /*$('#view_select').change(function(){
    if($(this).val()==1){	
    $('.feedback_btn_1').hide();
    $('.btn_alignment').addClass('btn_alignment_alt');
    }
    })*/
    $('.clsCancel').click(function () {
        $('.admin_input').val('Enter Associate ID/Name');
    });


    //Popup add (add admin)

    $(".clsAdd").click(function () {
        //console.log($('#add_admin').val())
        if ($('#add_admin').val() == "Enter Associate ID/Name") {
            $('.wrapper').prepend('<div class="overlay"></div>');
            $('.wrapper').addClass('overflowhid');
            $('#Popup_empty_add').show();
        }
        else {
            $('.wrapper').prepend('<div class="overlay"></div>');
            $('.wrapper').addClass('overflowhid');
            $('#Popup1_add').show();
        }
    });
    $('.popup_close').click(function () {
        $('#Popup1_add').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
    });
    $('#ys_add').click(function () {
        $('#Popup1_add').hide();
        var addUser = "<div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content'><div class='profile_pic'><img width='43' height='43' class='img-circle' src='../images/associate_image_img.png'></div><div class='col-xs-8 col-sm-4 col-md-4 col-lg-4 clsDetails'><p><span class='results_label'>Name</span><span class='result_text'>Madison James</span></p><p><span class='results_label'>ID</span><span>1234568888888</span></p></div><div class='col-xs-12 col-sm-4 col-md-4 col-lg-4 clsDetails'><p><span class='results_label'>Title</span><span class='result_text'>AVP Projects</span></p></div><div class='col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_remove'><span><input class='btn_grey clsRemove_access new_remove' id='remove_access' value='Remove access' type='button'></span></div></div></div>";
        $(this).parents().find('.admin_results_wrapper').eq(0).prepend(addUser);
        $('#Popup2_add').show();
    });
    $('#no_add').click(function () {
        $('#Popup1_add').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
    });
    $('.clsOk_add').click(function () {
        $('#Popup2_add').hide();
        $('#Popup_empty_add').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
    });
    $('.popup_close').click(function () {
        $('#Popup2_add').hide();
        $('#Popup_empty_add').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
        $('#Popup1_remove').hide();
    });

    //Popup Remove access (add admin)

    $('.clsRemove_access').click(function () {
        $('.wrapper').prepend('<div class="overlay"></div>');
        $('.wrapper').addClass('overflowhid');
        $('#Popup1_remove').show();
        $(this).addClass('remove');
    });
    $('#ys_remove').click(function () {
        $('#Popup1_remove').hide();
        $('.remove').parents('.results_content').remove();
        $('#Popup2_add').show();
    });
    $('#no_remove').click(function () {
        $('#Popup1_remove').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
        $('.remove').removeClass('remove');
    });
    $('.clsOk_add').click(function () {
        $('#Popup2_add').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
    });
    $('.popup_close').click(function () {
        $('#Popup2_add').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
    });

    //Review Feedback
    $('.feedback_btn_1').click(function () {
        // ViewAdvisorId = $(this).parents('div .view_advisor_inner_content').find('#ViewAdvisorId')[0].innerHTML;
        GetFeedbackQuestions();
        $("#feedback").modal('show');
        $("#feedback li").unbind('click');
    });

    $('.close_popup,#feedback .popup_close').click(function () {
        $('.modal-backdrop').remove();
        $('.modal').removeClass('in')
    });

    //Popup Connections
    $('.connections_btn').click(function () {
        $('.wrapper').prepend('<div class="overlay"></div>');
        $('.wrapper').addClass('overflowhid');
        $('#connections').show();
    });
    $('.popup_close').click(function () {
        $('#connections').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
    });

    /* Vertical Carousel */
    var countList;
    //console.log($(window).width())
    if (($(window).width() >= 320) && ($(window).width() >= 360)) {
        var countList = 2;
    }
    else {
        var countList = 3;
    }
    $(".prev").hide();
    var actualTotalList = $(".assmagslider li").size();
    var totalList = $(".assmagslider li").size() - 1;

    if (actualTotalList <= 3) {
        $(".next").hide();
    }

    $(".next").bind("click", function () {
        $(".prev").show();
        countList++;
        $(".list_carousel").animate({ "margin-left": "-=" + 123 }, 500)
        if (countList >= (actualTotalList)) {
            $(this).hide();
        }
    });
    $(".prev").bind("click", function () {
        $(".next").show();
        countList--;
        $(".list_carousel").animate({ "margin-left": "+=" + 123 }, 500)
        if (countList <= 3) {
            $(this).hide();
        }
    });
    /* Vertical Carousel */

    //**SUPERVISOR VIEW**//	


    //**SUPERVISOR VIEW**//	

    $('.assign_advisor').click(function () {
        $("#advisorAssign").modal('show');
    });
    $('.notify_btn').click(function () {
        $('.wrapper').prepend('<div class="overlay"></div>');
        $('.wrapper').addClass('overflowhid');
        $('#notify_associate').show();
    });

    // var a = []
    // name_txt 
    var array_name = [];
    var i = 0;
    var count = 0;
    var rows = $('.pending_req_set .row');
    /* $('.pending_req_set .row').each(function(i,val){
    var array_name_txt = $(this).find('.name_txt').text();	
    array_name.push(array_name_txt)
    });*/
    $('#autocomplete_admin .ui-menu').on('click', function () {

        $(rows).show();
        $('.no_result').hide();
        var name_val = $('#inpt_IDname_associate').val();
        $(rows).each(function (i, val) {
            var txt_name = $(this).find('.name_txt').text();
            if (txt_name == name_val) {
                count++;
            }
            else {
                $(this).hide()
            }
            if (count == 0) { $('.no_result').css('display', 'inline-block'); }
            else if (count > 0) { $('.no_result').hide(); }
            //if(count==0){ $('.no_result').css('display','inline-block');}
            //$(rows).length

        });
    });

    $('#inpt_IDname_associate').focus(function () {
        if ($(this).val() == "Search") {
            $(this).val("");
            $(rows).show();
            $('.no_result').hide();
        }
    });
    $('#inpt_IDname_associate').blur(function () {
        if ($(this).val() == "") {
            $(rows).show();
            $(this).val("Search");
            $(rows).each(function (i, val) {
                $(this).show();
            });
            $('.no_result').hide();
        }
    });

    $('.clsOk_req_notify').click(function () {
        $('#Popup2_add').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
        $('#notify_associate').hide();
    });

    $('.apply_btn').click(function () {
        if ($('#view_select').val() == 1) {
            $('.feedback_btn_1').hide();
            $('.btn_alignment').addClass('btn_alignment_alt');
        }
        if ($('#view_select').val() == 0) {
            $('.feedback_btn_1').show();
            $('.btn_alignment').removeClass('btn_alignment_alt');
        }
    });


    $(".clsReset").click(function () {
        $('.selectpicker').selectpicker('deselectAll');
        $('.filter-option').text('All');
        $('.view_select_box .filter-option').text('Advisor');
        $('.configure_duration .filter-option').text('30');
        $('.configure_view_box .filter-option').text('1');
        $('.search_by_input').find('input:text').val('');
        $('.feedback_btn_1').show();
    });

    //Popup Send-recomendation 
    var chkbox_count = 0;
    $('.Send_Recommendations').click(function () {
        $('.advisor_assign_popup_content .chkbox').each(function () {
            if ($(this).is(':checked')) { count++ }
        });
        if (count > 0) {
            $('.wrapper').prepend('<div class="overlay"></div>');
            $('.wrapper').addClass('overflowhid');
            $('#send_recommend').show();
            count = 0;
        }
        else {
            $('.wrapper').prepend('<div class="overlay"></div>');
            $('.wrapper').addClass('overflowhid');
            $('#send_recommend_condn').show();
        }
    });



    $('.clsOk_req_rec').click(function () {
        $('#send_recommend').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
        $('#send_recommend_condn').hide();
    });
    $('.popup_close').click(function () {
        $('#send_recommend').hide();
        $('#send_recommend_condn').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
    });

    $('#send_recommend_condn .clsOk_req_rec').click(function () {

        $("#advisorAssign").modal('show');
    });


    //Popup Submit
    $('.submit').click(function () {
        $('.wrapper').prepend('<div class="overlay"></div>');
        $('.wrapper').addClass('overflowhid');
        $('#submit_configure').show();

    });
    $('.clsSubmit').click(function () {
        $('#submit_configure').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
    });
    $('.popup_close').click(function () {
        $('#submit_configure').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
    });

    //Popup  Notify All
    $('.notify_all_btn').click(function () {
        $('.wrapper').prepend('<div class="overlay"></div>');
        $('.wrapper').addClass('overflowhid');
        $('#submit_configure').show();

    });
    $('.clsSubmit').click(function () {
        $('#submit_configure').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
    });
    $('.popup_close').click(function () {
        $('#submit_configure').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
    });


    /*$('.clsSubmit').click(function() {
    $('#decline_popup').hide();
    $('.wrapper').removeClass('overflowhid');
    $('.overlay').hide();
    });*/

    $('#decline_popup .clsSubmit').click(function () {
        var str = $('#wsComment').val();
        if ($.trim(str).length > 0) {
            $('#decline_popup').hide();
            $('.wrapper').removeClass('overflowhid');
            $('.overlay').hide();
            $('.decline_req').parent().html('Declined');
            $('.decline_req').removeClass('decline_req');
        }
        else {
            $('.wrapper').prepend('<div class="overlay"></div>');
            $('.wrapper').addClass('overflowhid');
            $('#decline_popup_reason').show();
            $('#decline_popup').hide();
        }
    });
    $('.clsok').click(function () {
        $('#decline_popup').show();
        $('#decline_popup_reason').hide();
    });

    $('#decline_popup_reason .popup_close').click(function () {
        $('#decline_popup_reason').hide();
    });
});


//*************************************************** User Define Functions ***************************************************

//============================================================ Page Content ====================================================
function GetPageContent() {
    var PageName = $('body').attr('id');
    var CountryId = $('#CountryId').val();
    var Role = 'Buddy';
    $.ajax({
        type: 'POST',
        url: PageName + '.aspx/PageContent',
        contentType: 'application/json',
        data: "{countryId:'" + CountryId + "',pageName:'" + PageName + "',role:'" + Role + "'}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            var PageContent = eval('(' + response.d + ')');
            var length = PageContent.PageContentDetails.length;
            $('#PageContent').html('');
            if (length > 0) {
                var list = '';
                for (var i = 0; i < length; i++) {
                    list += PageContent.PageContentDetails[i].Content;
                }
                $('#PageContent').append(list);
                document.getElementById('lblDuration').innerHTML = ConnectionDuration.value;
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $('#Popup2_send').show();
            $("#message").html('');
            $("#message").append("Oops looks like something went wrong, please try after some time.");
        }
    });
}
//========================================================= Pending request ============================================
function GetPendingRequests() {
    var BuddyId = $('#CurrentUserId').val();
    $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/NotificationBuddyRequests',
        contentType: 'application/json',
        data: "{buddyId:'" + BuddyId + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            onsuccessGetPendingRequests(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            //onerrorGetNotificationBuddyRequests(xhr.status, thrownError);
        }
    });
}
function onsuccessGetPendingRequests(result) {
    var Joinees = eval('(' + result.d + ')');

    list = '';
    $('#PendingRequest').html('');
    if (Joinees.ObjMyPendingConnections != null) {
        var a = Joinees.ObjMyPendingConnections.length;
        if (a > 0) {
            for (var i = 0; i < a; i++) {
                list += '<div class="row">';
                list += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 res_content">';
                list += '<div>';
                var request = new XMLHttpRequest;
                request.open('GET', "../../Pages/NA/ShowImage.ashx?id=" + Joinees.ObjMyPendingConnections[i].UserId + "", false);
                request.send();
                if (request.status === 200) {
                    list += '<img src="../../Pages/NA/ShowImage.ashx?id=' + Joinees.ObjMyPendingConnections[i].UserId + '" class="img-circle pull-left profile"/ >';
                }
                else {
                    list += '<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/ >';
                }
                list += '</div>';
                list += '<div class="col-xs-8 col-sm-3 col-md-3 col-lg-3 clsDetails">';
                list += '<p><span class="results_label">Name</span><span class="result_text">' + Joinees.ObjMyPendingConnections[i].UserName + '</span></p>';
                list += '<p><span class="results_label">ID</span><span id="ccUserId">' + Joinees.ObjMyPendingConnections[i].UserId + '</span></p>';
                list += '</div>';
                list += '<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_status">';
                list += '<span>';
                list += '<input value="Accept" class="clsAccept" id="ys_accept" type="button">';
                list += '<input value="Decline" class="clsDecline" id="no_decline" type="button">';
                list += '</span>';
                list += '</div>';
                list += '</div>';
                list += '</div>';
            }
            $('#PendingRequest').append(list);
        }
        else {
            $("#PendingRequest").append('<label style="color:#999999; padding-left: 40%;">No Pending Request is found</label>');
        }
    }
    else {
        $("#PendingRequest").append('<label style="color:#999999; padding-left: 40%;">No Pending Request is found</label>');
    }

    $('.clsAccept').click(function () {
        $('#accept_request').show();
        $('.wrapper').prepend('<div class="overlay"></div>');
        $('.wrapper').addClass('overflowhid');
        $(this).addClass('accept_clicked')
        AcceptJoineeId = $(this).parents('div .res_content').find('#ccUserId')[0].innerHTML;
    });
}

//*********************************************************** BuddyConnectionRequest  *************************************************************

function BuddyConnectionRequest(JoineeId, RejectionComment) {

    var BuddyId = $('#CurrentUserId').val();
    var RequestType = 'Accept';
    $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/BuddyConnectionRequest',
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

//============================================================Alerts====================================================
function GetBuddyAlerts() {
    var buddyId = $('#CurrentUserId').val();
    $.ajax({
        type: 'POST',
        url: 'Advisor_View.aspx/GetBuddyAlerts',
        contentType: 'application/json',
        data: "{buddyId:'" + buddyId + "'}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            OnSuccessGetBuddyAlerts(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            OnErrorGetBuddyAlerts(xhr.status, thrownError);
        }
    });
}

function OnSuccessGetBuddyAlerts(response) {
    var obj = eval('(' + response.d + ')');
    var length = obj.ObjBuddyAlerts.length;
    $('#Alert_content').html('');
    if (length > 0) {
        var list = '';
        for (var i = 0; i < length; i++) {
            list += ' <div class="row">';
            list += ' <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 alerts_content">';
            //list += ' <img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/>';
            var request = new XMLHttpRequest;
            request.open('GET', "../../Pages/NA/ShowImage.ashx?id=" + obj.ObjBuddyAlerts[i].NewHireId + "", false);
            request.send();
            if (request.status === 200) {
                list += '<img class="img-circle pull-left profile" runat="server" src="../../Pages/NA/ShowImage.ashx?id=' + obj.ObjBuddyAlerts[i].NewHireId + '" alt="" />';
            }
            else {
                list += '<img class="img-circle pull-left profile" src="../../Resources/Images/NA/result_profile.png" />';
            }
            list += ' <p>' + obj.ObjBuddyAlerts[i].BuddyAlerts + '</p>';
            list += ' </div>';
            list += ' </div>';
        }
        $('#Alert_content').append(list);
    }
    else {
        $("#Alert_content").append('<label style="color:#999999; padding-left: 40%;">No Alerts found</label>');
    }
}

//============================================================Advisors Connections Details=======================================================//
function GetAllConnections() {
    var associate_Id = $('#CurrentUserId').val();
    var user_Type = 'Buddy';
    $.ajax({
        type: 'POST',
        url: 'Advisor_View.aspx/GetAllConnectionsOfUser',
        contentType: 'application/json',
        data: "{associate_Id:'" + associate_Id + "',user_Type:'" + user_Type + "'}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            OnSuccessGetAllConnections(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            OnErrorGetAllConnections(xhr.status, thrownError);
        }
    });
}

function OnSuccessGetAllConnections(response) {
    var obj = eval('(' + response.d + ')');
    $('#ConnectionRequest').html('');
    if (obj.MyConnections != null) {
        var days = obj.MyConnections[0].DaysTotal
        var length = obj.MyConnections.length;
        if (days > obj.MyConnections[0].DaysToShowAdvisor) {
            var list = '';
            for (var i = 0; i < length; i++) {
                list += ' <div class="row">';
                list += ' <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 req27_content"> ';
                list += '<div>'
                list += ' <img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/>';
                list += '</div>';
                list += '<div class="col-xs-8 col-sm-3 col-md-3 col-lg-3 clsDetails">';
                list += '<p><span class="results_label">Name</span><span class="result_text">' + obj.MyConnections[i].UserName + '</span></p>';
                list += '<p><span class="results_label">ID</span><span class="results_label" id="connectedId">' + obj.MyConnections[i].ConnectedToId + '</span></p>';
                list += '</div>'
                list += '<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 btn_status">';
                list += '<span>';
                list += '<input value="Review Feedback" class="btn_orange clsReview" id="ys_review" type="button">';
                if (obj.MyConnections[i].ConnectionEndStatus == 1) {
                    list += '<input value="End Connecton" class="btn_grey no_end_connection" id="no_send_req"  type="button">';
                }

                list += '</span>';
                list += '</div>';
                list += '</div>';
                list += '</div>';
            }

            $('#ConnectionRequest').append(list);
            $('.clsReview').click(function () {
                $("#feedback").modal('show');
                $("#feedback li").unbind('click');
                var JoineeId = $(this).parents('div .req27_content').find('#connectedId')[0].innerHTML;
                GetFeedbackQuestions(JoineeId);
            });

            $('.no_end_connection').click(function () {
                $('.wrapper').prepend('<div class="overlay"></div>');
                $('.wrapper').addClass('overflowhid');
                $('#endConnection').show();
                $(this).addClass('accept_clicked')

            });

            $('#yes_end_connection').click(function () {
                $('#endConnection').hide();
                $('.wrapper').removeClass('overflowhid');
                $('.overlay').hide();
                $('.accept_clicked').attr('disabled', 'disabled')
								.css({
								    "color": "gray",
								    "background-color": "gray",
								    "border-style": "solid"
								});
                var JoineeId = $(this).parents('div .req27_content').find('#connectedId')[0].innerHTML;
                EndConnectionByBuddy(JoineeId);
            });

            $('.popup_close').click(function () {
                $('#endConnection').hide();
                $('.wrapper').removeClass('overflowhid');
                $('.overlay').hide();
            });
        }
        else {
            $("#ConnectionRequest").append('<label style="color:#999999; padding-left: 40%;">No Connection found for you</label>');
        }
    }
    else {
        $("#ConnectionRequest").append('<label style="color:#999999; padding-left: 40%;">No Connection found for you</label>');
    }
}
//============================================================Review Feedback====================================================

function GetFeedbackQuestions(JoineeId) {
    var buddyId = $('#CurrentUserId').val();
    var joineeId = JoineeId;
    var countryId = $('#CountryId').val();
    var reviewType = 'Buddy';
    var bodyId = $('body').attr('id');

    $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/GetFeedbackQuestions',
        contentType: 'application/json',
        data: "{buddyId:'" + buddyId + "',joineeId:'" + joineeId + "',countryId:'" + countryId + "',reviewType:'" + reviewType + "'}",
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

var arrQuesAnswer = new Array();
function OnSuccessGetFeedbackQuestions(response) {
    var Questions = eval('(' + response.d + ')');
    var length = Questions.ObjFeedbackQuestions.length;

    $('.feedback_ques').html('');
    var list = '';
    var QueCount = 1;
    if (length > 0) {
        for (var i = 0; i < length; i++) {
            list += ' <li>' + Questions.ObjFeedbackQuestions[i].QuestionText + '';
            list += ' <ul class="choose_option" id="' + QueCount + '">';
            //for(var i = 0; i<length; i++) {

            if (Questions.ObjFeedbackQuestions[i].Feedback == '1') {
                list += ' <li class="cls_stdisagree"><span class="selected">1</span></li>';
                list += ' <li class="cls_disagree"><span>2</span></li>';
                list += ' <li class="cls_neutral"><span>3</span></li>';
                list += ' <li class="cls_agree"><span>4</span></li>';
                list += ' <li class="cls_stagree"><span>5</span></li>';

            }
            if (Questions.ObjFeedbackQuestions[i].Feedback == '2') {
                list += ' <li class="cls_stdisagree"><span>1</span></li>';
                list += ' <li class="cls_disagree"><span class="selected">2</span></li>';
                list += ' <li class="cls_neutral"><span>3</span></li>';
                list += ' <li class="cls_agree"><span>4</span></li>';
                list += ' <li class="cls_stagree"><span>5</span></li>';

            }
            if (Questions.ObjFeedbackQuestions[i].Feedback == '3') {
                list += ' <li class="cls_stdisagree"><span>1</span></li>';
                list += ' <li class="cls_disagree"><span>2</span></li>';
                list += ' <li class="cls_neutral"><span class="selected">3</span></li>';
                list += ' <li class="cls_agree"><span>4</span></li>';
                list += ' <li class="cls_stagree"><span>5</span></li>';

            }
            if (Questions.ObjFeedbackQuestions[i].Feedback == '4') {
                list += ' <li class="cls_stdisagree"><span>1</span></li>';
                list += ' <li class="cls_disagree"><span>2</span></li>';
                list += ' <li class="cls_neutral"><span>3</span></li>';
                list += ' <li class="cls_agree"><span class="selected">4</span></li>';
                list += ' <li class="cls_stagree"><span>5</span></li>';

            }
            if (Questions.ObjFeedbackQuestions[i].Feedback == '5') {
                list += ' <li class="cls_stdisagree"><span>1</span></li>';
                list += ' <li class="cls_disagree"><span>2</span></li>';
                list += ' <li class="cls_neutral"><span>3</span></li>';
                list += ' <li class="cls_agree"><span>4</span></li>';
                list += ' <li class="cls_stagree"><span  class="selected">5</span></li>';

            }
            list += ' </ul>';
            list += ' <div class="clearfix"></div>';
            list += ' </li>';
            QueCount++;

        }
        $('.feedback_ques').append(list);
        $('.feedback_options').show()
    }
    else {
        $('.feedback_options').hide();
        $('.feedback_ques').append('<label>No feedback Avaialble</label>');
    }

    // $('.choose_option li').siblings()[i].find('span').addClass('selected');
    //   $('.choose_option li').siblings().find('span')[0].addClass('selected');
}

//===========================================================Advisor End connection================================================//
function EndConnectionByBuddy(JoineeId) {
    var joineeId = JoineeId;
    var buddyId = $('#CurrentUserId').val();
    var bywhom = 'Buddy';
    var requestType = 'ACCEPT';
    var bodyId = $('body').attr('id');

    $.ajax({
        type: 'POST',
        url: 'Advisor_View.aspx/DisconnectionRequestByBuddy',
        contentType: 'application/json',
        data: "{joineeId:'" + joineeId + "',buddyId:'" + buddyId + "',bywhom:'" + bywhom + "',requestType:'" + requestType + "'}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            OnSuccessDisconnectionRequestByBuddy(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            OnErrorDisconnectionRequestByBuddy(xhr.status, thrownError);
        }
    });
}

function OnSuccessDisconnectionRequestByBuddy() {
    $('#Popup2_send').show();
    $("#message").html('');
    $("#message").append("You have successfully Disconnected with Advisor.");

}

function OnErrorDisconnectionRequestByBuddy() {
    //    $('#Popup2_send').show();
    //    $("#message").html('');
    //    $("#message").append("Can't Disconnect now, please try after some time.");
    $('#endConnection').hide();
}

//================================================= Volunter or Register as buddy ===========================================================
function NominateAsBuddy() {
    var bodyId = $('body').attr('id');
    $.ajax({
        type: 'POST',
        url: bodyId + '.aspx/NominateAsBuddy',
        contentType: 'application/json',
        data: "{buddyId:'" + $("#CurrentUserId").val() + "'}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            $('#popup_volunteer').hide();
            $('#Popup2_send').show();
            $("#message").html('');
            $("#message").append("You have Successfully Enrolled");
            return;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $('#popup_volunteer').hide();
            $('#send_recommend_condn').show();
            $("#ErrorPopUp").html('');
            $("#ErrorPopUp").append('Oops looks like something went wrong, please try after sometime.');
            return;
        }
    });
}
//====================================================== Show/Hide tiles ==========================================================

function ShowHideTiles() {
    var PageName = $('body').attr('id');
    var userId = $('#CurrentUserId').val();
    $.ajax({
        type: 'POST',
        url: PageName + '.aspx/ShowHideTiles',
        contentType: 'application/json',
        data: "{userId:'" + userId + "',userType:''}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            var Result = eval('(' + response.d + ')');
            if (Result.Tiles[0].EnableConnections == 'True' && Result.Tiles[0].EnablePending == 'False' && Result.Tiles[0].EnableEnrollment == 'False') {
                $(".view_connections").parent().show();
                $(".volunteer_advisor").parent().hide();
            }
            if (Result.Tiles[0].EnableConnections == 'True' && Result.Tiles[0].EnablePending == 'False' && Result.Tiles[0].EnableEnrollment == 'True') {
                $(".view_connections").parent().show();
                $('.newhire_advisor_content').addClass('align_newhire_advisor_content');
            }
            if (Result.Tiles[0].EnableConnections == 'False' && Result.Tiles[0].EnablePending == 'True' && Result.Tiles[0].EnableEnrollment == 'True') {
                $(".view_connections").parent().show();
                $(".view_connections").addClass('pending_req');
                $('.newhire_advisor_content').addClass('align_newhire_advisor_content');
                $(".view_connections").find('h5').html('View your Pending Requests');
                $(".view_connections").find('p').html('Click here to view your pending Advisor requests.');
            }

            if (Result.Tiles[0].EnableConnections == 'False' && Result.Tiles[0].EnablePending == 'True' && Result.Tiles[0].EnableEnrollment == 'False') {
                $(".volunteer_advisor").parent().hide();
                $(".view_connections").parent().show();
                $(".view_connections").addClass('pending_req');
                // $('.newhire_advisor_content').addClass('align_newhire_advisor_content');
                $(".view_connections").find('h5').html('View your Pending Requests');
                $(".view_connections").find('p').html('Click here to view your pending Advisor requests.');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });
}


function GetExcelData() {

    //HtmlPage.Window.Invoke("startDownload", httpHandlerUrlBuilder.Uri.ToString());
    //298015 - Country dropdown
    var CountryId = $("#DashboardLoc").val();
    $("#hiddenCountryId").val(CountryId);
    if (CountryId == '' || CountryId == 'undefined' || CountryId == null || CountryId == 'All') {
        CountryId = '0'; //0- stands for Country All
    }
    $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/ExportToExcel',
        contentType: 'application/json',
        data: "{countryId:'" + CountryId + "'}",
        dataType: 'json',
        cache:false,
        //processData: false,

        success: function (response) {
            var Result = eval('(' + response.d + ')');
            //return ;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            //alert(response);
            //return;
        }
    });
}
var AdvisorId = '';
var Location_NA = '';
var BUId_NA = '';
var BUName_NA = '';
var ProjectId_NA = '';
var ProjectName_NA = '';
var AccountId_NA = '';
var AccountName_NA = '';
var allresult;  //global variable to store entire likely buddy list without any filteration
var level1result;     //filtered w.r.t. registration & availability

$(document).ready(function () {
    // Display name
    $('.welcome_text').html('');
    var list = '';
    list += 'Welcome<br> <strong>' + DisplayName.value + '</strong><br>' + Designation.value + '';
    $('.welcome_text').append(list);

    $("#clslazy").lazyload();
    $('.selectpicker').selectpicker({
    });
    ShowHideTiles();

    $('#ConfigReset').click(function () {
        Getconfiguration();
    })
    $('#DashboardReset').click(function () {
        $('.filter-option').text('All');
        $('.view_select_box .filter-option').text('Advisor')
    })
    //result page
    $('.clsSend_req').click(function () {
        var inval = $(".clsSend_req").index(this);
        /* alert( "That was div index #" + inval); */
        $('#success_ok_send').click(function () {
            $('.clsSend_req').hide();
            $('.req_send_label').show();

        });
    });
    //Sliding
    $('.more_icon').click(function () {
        $("#panel").slideToggle("slow");
    });
    //********POPUP starts********//
    //Popup Send request
    $(".clsSend_req").click(function () {
        $('.wrapper').prepend('<div class="overlay"></div>');
        $('.wrapper').addClass('overflowhid');
        $('#Popup1_send_req').show();
    });
    $('.popup_close').click(function () {
        $('#Popup1_send_req').hide();
        $('#endConnection').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
    });
    $('#ys_send_req').click(function () {
        $('#Popup1_send_req').hide();
        $('#Popup2_send').show();
        //  $('.wrapper').addClass('search_advisor_clicked')
        var BuddyId = SelectedbuddyId;
        CheckConnectionRequest(BuddyId);
        //  CheckEligibility(BuddyId);
    });
    $('#no_send_req').click(function () {
        $('#Popup1_send_req').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
        $('#endConnection').hide();
    });
    $('.clsOk_req').click(function () {
        $('#Popup2_send').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
        $('#notify_associate').hide();
    });
    $('.popup_close').click(function () {
        $('#Popup2_send').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
        $('#notify_associate').hide();
    });
    //Pop up end_connection
    $('.end_connection').click(function () {
        $('.wrapper').prepend('<div class="overlay"></div>');
        $('.wrapper').addClass('overflowhid');
        $('#endConnection').show();
        $(this).addClass('accept_clicked')

    });
    $('.popup_close').click(function () {
        $('#endConnection').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
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
        $('.accept_clicked').parents('.view_advisor_inner_content').find('.status_holder').hide();
        $('.accept_clicked').parents('.view_advisor_inner_content').find('.days_left').hide();
        EndConnectionByJoinee();
    });
    $('#no_end_connection').click(function () {
        $('.accept_clicked').removeClass('accept_clicked');
        $('#endConnection').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
    });
    // Popup feedback 
    $(".feedback_btn").click(function () {
        $("#feedback").modal('show');
    });
    //li choose click
    $('.choose_option li').click(function () {
        var ind = $(this).index();
        $(this).siblings().find('span').removeClass('selected');
        $(this).find('span').addClass('selected');
    })
    $('.close_popup,#feedback .popup_close').click(function () {
        $('.modal-backdrop').remove();
        $('.modal').removeClass('in')
    });
    /* $('#yes_end_connection').click(function(){
    $('.main_content_advisor').hide();
    $('#clsAdvisorHome_content').show();
    $('#endConnection,.overlay').hide();
    }); */
    $('.send_fb').click(function () {
        // $('.wrapper').prepend('<div class="overlay"></div>');
        //  $('.modal-backdrop').remove();
        // $('.modal').removeClass('in')
        // $('#successful_completion').show();
        SubmitFeedback(arrQuesAnswer);
    });
    $('.provide_fb').click(function () {
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
        $('#fill_feedback').hide();
        $("#feedback").modal('show');
    });
    $('#fill_feedback .popup_close').click(function () {
        $('#fill_feedback').hide();
        $('.provide_fb').hide();
        $("#feedback").modal('show');
    });
    //27-8
    /* ("#cls_view_advisor").lazyload(); */
    //whole nav by icons
    //Page navigation by icons (desktop and tab )
    $('.menu_list_header ul li a').click(function (ev) {
        $('.menu_list_header ul li').removeClass('selected');
        $(ev.currentTarget).parent('li').addClass('selected');
    });
    $(".search_icon").click(function () {
        $('#clsSearch_content').show();
        $('#clsHome_content').hide();
        $('#clsAdvisorHome_content').hide();
        /* $('#clsSlide15Home_content').hide(); */
        $('#clsAlert_content').hide();
        $('#clsHirepgm_content').hide();
        $('.main_content_advisor').hide();
        $('#tab_superadmin').hide();
        $('.supervisor_view').hide();
    });
    //9 to 14
    $('.history_icon').click(function () {
        $('.main_content_advisor').show();
        $('#clsHome_content').hide();
        $('#clsSearch_content').hide();
        $('#clsAdvisorHome_content').hide();
        /* $('#clsSlide15Home_content').hide(); */
        $('#clsAlert_content').hide();
        $('#clsHirepgm_content').hide();
        $('#tab_superadmin').hide();
        $('.supervisor_view').hide();

    });
    //15 to 18
    $('.alert_icon').click(function () {
        $('#clsAlert_content').show();
        $('#clsHome_content').hide();
        $('#clsSearch_content').hide();
        $('#clsAdvisorHome_content').hide();
        $('.main_content_advisor').hide();
        /* $('#clsSlide15Home_content').hide(); */
        $('#clsHirepgm_content').hide();
        $('#tab_superadmin').hide();
        $('.supervisor_view').hide();
    });

    //    //Superadmin
    //    $('.superadmin_icon').click(function () {
    //        $('.wrapper').prepend('<div class="overlay"></div>');
    //        $('.wrapper').addClass('overflowhid');
    //        $('#admin_access').show();
    //    });
    //    $('#clsOk_access').click(function () {
    //        $('#admin_access').hide();
    //        $('.wrapper').removeClass('overflowhid');
    //        $('.overlay').hide();
    //    });
    //    $('.popup_close').click(function () {
    //        $('#admin_access').hide();
    //        $('.wrapper').removeClass('overflowhid');
    //        $('.overlay').hide();
    //    });

    //*23/09/2014*//
    //Superadmin
    $('.superadmin_icon').click(function () {
        $('#tab_superadmin').show();
        $('#clsHome_content').hide();
        $('#clsSearch_content').hide();
        $('#clsAdvisorHome_content').hide();
        $('.main_content_advisor').hide();
        $('#clsHirepgm_content').hide();
        $('#clsAlert_content').hide();
        $('.supervisor_view').hide();
        GetDashBoardTabPrefillValues();
    });

    //Supervisor
    //    $('.supervisor_icon').click(function () {
    //        $('.wrapper').prepend('<div class="overlay"></div>');
    //        $('.wrapper').addClass('overflowhid');
    //        $('#admin_access').show();
    //    });
    //    $('#clsOk_access').click(function () {
    //        $('#admin_access').hide();
    //        $('.wrapper').removeClass('overflowhid');
    //        $('.overlay').hide();
    //    });
    //    $('.popup_close').click(function () {
    //        $('#admin_access').hide();
    //        $('.wrapper').removeClass('overflowhid');
    //        $('.overlay').hide();

    //    });
    //*23/09/2014*//
    $('.supervisor_icon').click(function () {
        $('#clsHome_content').hide();
        $('#clsSearch_content').hide();
        $('#clsAdvisorHome_content').hide();
        $('#clsAlert_content').hide();
        $('#clsHirepgm_content').hide();
        $('.main_content_advisor').hide();
        $('#tab_superadmin').hide();
        $('#tab_supervisor').show();
        $('.supervisor_view').show();
        GetRecommendableJoinees();
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
        $('#Popup1_remove').hide();
        $('#Popup_empty_add').hide();

    });


    //Page navigation by icons (for mobile)
    $('.menu_list ul li a').click(function (ev) {
        $('.menu_list ul li').removeClass('selected');
        $(ev.currentTarget).parent('li').addClass('selected');
    });
    // 3 to 8
    $(".home_icon").click(function () {
        $('#clsHome_content').show();
        $('#clsSearch_content').hide();
        $('#clsAdvisorHome_content').hide();
        $('#clsAlert_content').hide();
        $('#clsHirepgm_content').hide();
        $('.main_content_advisor').hide();
        $('#tab_superadmin').hide();
        $('.supervisor_view').hide();
        ShowHideTiles();
    });
    $(".search_icon").click(function () {
        $('#clsSearch_content').show();
        $('#clsHome_content').hide();
        $('#clsAdvisorHome_content').hide();
        $('#clsAlert_content').hide();
        $('#clsHirepgm_content').hide();
        $('.main_content_advisor').hide();
        $('.supervisor_view').hide();
    });
    //9 to 14
    $('.history_icon').click(function () {
        $('.main_content_advisor').show();
        $('#clsHome_content').hide();
        $('#clsSearch_content').hide();
        $('#clsAdvisorHome_content').hide();
        $('#clsAlert_content').hide();
        $('#clsHirepgm_content').hide();

    });
    //15 to 18
    $('.alert_icon').click(function () {
        $('#clsAlert_content').show();
        $('#clsHome_content').hide();
        $('#clsSearch_content').hide();
        $('#clsAdvisorHome_content').hide();
        $('.main_content_advisor').hide();
        $('#clsHirepgm_content').hide();
        $('.supervisor_view').hide();
    });

    //whole nav by div
    // 1 Newhire pgm 
    $(".advisor_program").click(function () {
        $('#clsHome_content').hide();
        $('#clsAdvisorHome_content').hide();
        $('#clsHirepgm_content').show();
        $('.menu_list_header ul').find('.selected').removeClass('selected');
        $('.menu_list_header ul li:nth-child(1)').addClass('selected');

        $('.menu_list ul').find('.selected').removeClass('selected');
        $('.menu_list ul li:nth-child(1)').addClass('selected'); $('.supervisor_view').hide();
        GetPageContent();
    });

    // 2 recommend_advisor (popup)
    $(".recommend_advisor").click(function () {
        $('.wrapper').prepend('<div class="overlay"></div>');
        $('.wrapper').addClass('overflowhid');
        $('.popup_recommend').show();
    });
    $('.popup_close,.submit_fb_confirm').click(function () {
        $('.popup_recommend').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
        $('#successful_completion').hide();
    });
    $('#ys_recommend').click(function () {
        $('.popup_recommend').hide();
        $('.wrapper').removeClass('overflowhid');
        //  $('.overlay').hide();
        RaiseSupervisorRequest();
    });
    $('#no_recommend').click(function () {
        $('.popup_recommend').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
    });

    // 3 Search advisor
    $(".search_advisor").click(function () {
        if ($(this).hasClass('view_advisor')) {
            $('.main_content_advisor').show();
            $('.martop').hide();
            $('.menu_list_header ul').find('.selected').removeClass('selected');
            $('.menu_list_header ul li:nth-child(3)').addClass('selected');

            $('.menu_list ul').find('.selected').removeClass('selected');
            $('.menu_list ul li:nth-child(3)').addClass('selected');
            ViewAdvisorsDetails();
        }
        else {
            $('.martop').hide();
            $('.main_content').show();
            $('.menu_list_header ul').find('.selected').removeClass('selected');
            $('.menu_list_header ul li:nth-child(2)').addClass('selected');

            $('.menu_list ul').find('.selected').removeClass('selected');
            $('.menu_list ul li:nth-child(2)').addClass('selected');
            $('.supervisor_view').hide();
            GetLocation();
        }
    });

    /* // 4 view_advisor
    $('.view_advisor').click(function(){
    $('.martop').hide();
    $('.main_content_advisor').show();	
    $('.menu_list_header ul').find('.selected').removeClass('selected');		
    $('.menu_list_header ul li:nth-child(3)').addClass('selected');
			
    $('.menu_list ul').find('.selected').removeClass('selected');		
    $('.menu_list ul li:nth-child(3)').addClass('selected');
    ViewAdvisorsDetails();
    }); */


    // 5 history_details slide 15
    $(".history_details").click(function () {
        $('#clsAlert_content').show();
        $('#clsHome_content').hide();
        $('#clsAdvisorHome_content').hide(); $('.supervisor_view').hide();
        $('.menu_list_header ul').find('.selected').removeClass('selected');
        $('.menu_list_header ul li:nth-child(4)').addClass('selected');

        $('.menu_list ul').find('.selected').removeClass('selected');
        $('.menu_list ul li:nth-child(4)').addClass('selected');

        if ($('#clsAlert_content .alert_wrapper').height() > 395) {
            $('#clsAlert_content .alert_wrapper').css({ 'overflow-y': 'auto', 'height': '395px' })
        }
        else { $('#clsAlert_content .alert_wrapper').css({ 'overflow': 'hidden', 'height': 'auto' }) }
        GetJoineeAlerts();
    });

    //*23/09/2014*//
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
    });*/
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
            ValidateAdmin();
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
        $('.results_wrapper_content').find('.admin_results_wrapper').eq(0).prepend(addUser);
        /* $('.admin_results_wrapper').eq(1).prepend(addUser); */
        $('#Popup2_add').show();
    });
    $('#no_add').click(function () {
        $('#Popup1_add').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
    });
    $('.clsOk_req').click(function () {
        $('#Popup2_add').hide();
        $('#Popup_empty_add').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
    });
    $('.popup_close').click(function () {
        $('#Popup2_add').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
    });
    //Popup Remove access (add admin)
    $('.new_remove').click(function () {
        $('.wrapper').prepend('<div class="overlay"></div>');
        $('.wrapper').addClass('overflowhid');
        $('#Popup1_remove').show();
        $(this).addClass('remove');
    });
    $('#ys_remove').click(function () {
        $('#Popup1_remove').hide();
        RemovingAdmin(RemoveAdmin);
    });
    $('#no_remove').click(function () {
        $('#Popup1_remove').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
        $('.remove').removeClass('remove');
    });
    $('.clsOk_req').click(function () {
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
    //    $('.feedback_btn_1').click(function () {
    //        $("#feedback").modal('show');
    //        $("#feedback li").unbind('click');
    //    });

    $('.close_popup,#feedback .popup_close').click(function () {
        $('.modal-backdrop').remove();
        $('.modal').removeClass('in')
    });
    //Popup Connections
    //    $('.connections_btn').click(function () {
    //        $('.wrapper').prepend('<div class="overlay"></div>');
    //        $('.wrapper').addClass('overflowhid');
    //        $('#connections').show();
    //    });
    $('.popup_close').click(function () {
        $('#connections').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
    });

    //**SUPERVISOR VIEW**//	

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

    $('.apply_btn').click(function () {
        GetDashBoardData();
    });

    //Popup Send-recomendation 
    var chkbox_count = 0;
    $('.Send_Recommendations').click(function () {
        var Recommendadvisorid = "";
        var RecommendIdArray = new Array();
        $('.advisor_assign_popup_content .chkbox').each(function () {
            if ($(this).is(':checked')) {
                count++;
                Recommendadvisorid = $(this).parents('div .results_content').find('#RecommendableAdvisor')[0].innerHTML;
                RecommendIdArray.push(Recommendadvisorid);
            }

        });
        if (count == 0) {
            $('#recommend_content_invalid').html('');
            $('.wrapper').prepend('<div class="overlay"></div>');
            $('.wrapper').addClass('overflowhid');
            $('#recommend_content_invalid').append('Select atleast one Advisor')
            $('#send_recommend_condn').show();
            return;
        }
        if (count <= checklimit) {

            for (var i = 0; i < count; i++) {

                var BuddyId = RecommendIdArray[i];
                var JoineeId = PendingRequestJioneeId;
                CheckConnectionRequestAdmin(JoineeId, BuddyId, function (isAllowed) {
                    if (isAllowed) {
                        BuddyConnectionRequestAdmin(JoineeId, BuddyId);
                    }
                });
            }
            count = 0;

            $('#recommend_content_valid').html('');
            $('.wrapper').prepend('<div class="overlay"></div>');
            $('.wrapper').addClass('overflowhid');
            $('#recommend_content_valid').append('You have successfully send the recommendations');
            $('#send_recommend').show();
        }
        else {
            $('#recommend_content_invalid').html('');
            $('.wrapper').prepend('<div class="overlay"></div>');
            $('.wrapper').addClass('overflowhid');
            $('#recommend_content_invalid').append('Select no more than ' + checklimit + ' Advisor.')
            $('#send_recommend_condn').show();
            count = 0;
        }
    });

    $('.clsOk_req').click(function () {
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

    $('#send_recommend_condn .clsOk_req').click(function () {
        $('#recommend_content_invalid').html('');
        $("#advisorAssign").modal('show');
    });

    //Popup Submit 
    $('.submit').click(function () {
        SetConfiguration();
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
        var RequestType = "notifyAll";
        var notifyAdvisor = "";
        SendNotificationMail(notifyAdvisor, RequestType);
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
    //===================================================== AutoComplete Functions ==========================================================

    //======================================================= Associates names ==============================================================
    $("#inpt_IDname").autocomplete({
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
        select: function (event, ui) {
            $("#inpt_IDname").val(ui.item.label);
            AdvisorId = ui.item.value;
            return false;
        }
    })

    //======================================================== Project names =================================================================
    $("#inpt_Project").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: 'POST',
                url: $('body').attr('id') + '.aspx/SearchProject',
                contentType: 'application/json',
                dataType: 'json',
                data: "{searchText:'" + request.term + "'}",
                success: function (data) {
                    var myData = eval('(' + data.d + ')');
                    response($.map(myData, function (item) {
                        return {
                            label: item.Projectname,
                            value: item.ProjectId.replace(/\s+/g, ''),
                            desc: item.Projectname
                        }
                    }));
                }
            });
        },

        select: function (event, ui) {
            $("#inpt_Project").val(ui.item.label);
            ProjectId_NA = ui.item.value;
            ProjectName_NA = ui.item.label;
            return false;
        }
    })
    //======================================================== BU Names ==================================================================
    $("#inpt_BU").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: 'POST',
                url: $('body').attr('id') + '.aspx/SearchBU',
                contentType: 'application/json',
                dataType: 'json',
                data: "{searchText:'" + request.term + "'}",
                success: function (data) {
                    var myData = eval('(' + data.d + ')');
                    response($.map(myData, function (item) {
                        return {
                            label: item.Projectname,
                            value: item.ProjectId.replace(/\s+/g, ''),
                            desc: item.Projectname
                        }
                    }));
                }
            });
        },

        select: function (event, ui) {
            $("#inpt_BU").val(ui.item.label);
            BUId_NA = ui.item.value;
            BUName_NA = ui.item.label;
            return false;
        }
    })
    //============================================================== Account Names ==============================================
    $("#inpt_Account").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: 'POST',
                url: $('body').attr('id') + '.aspx/SearchAccount',
                contentType: 'application/json',
                dataType: 'json',
                data: "{searchText:'" + request.term + "'}",
                success: function (data) {
                    var myData = eval('(' + data.d + ')');
                    response($.map(myData, function (item) {
                        return {
                            label: item.Projectname,
                            value: item.ProjectId.replace(/\s+/g, ''),
                            desc: item.Projectname
                        }
                    }));
                }
            });
        },

        select: function (event, ui) {
            $("#inpt_Account").val(ui.item.label);
            AccountId_NA = ui.item.value;
            AccountName_NA = ui.item.label;
            return false;
        }
    })

    $('#inpt_IDname_associate').autocomplete({
        source: searchRecommendableJoineesList,
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
        },
        select: function (event, ui) {
            $("#inpt_IDname_associate").val(ui.item.label);
            var JoineeId = ui.item.value;
            GetRecommendableFilterJoinees(JoineeId);
            return false;
        }
    });

    $('#inpt_IDname_associate_rec').autocomplete({
        source: searchUnEnrolledAdvisorsList,
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
        },
        select: function (event, ui) {
            $("#inpt_IDname_associate_rec").val(ui.item.label);
            var UnerolledAdvisorId = ui.item.value;
            GetUnenrolledFilterBuddies(UnerolledAdvisorId)
            return false;
        }
    });

    $('#inpt_IDname_advisors').autocomplete({
        source: searchRecommendableAdvisorsList,
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
        },
        select: function (event, ui) {
            $("#inpt_IDname_advisors").val(ui.item.label);
            var AdvisorId = ui.item.value;
            GetRecommendableFilterAdvisor(AdvisorId);
            return false;
        }
    });
    //================================================== End AutoComplete fun ===================================================
});

//======================================================== Progress bar =========================================================

function init_circular_progress(el_id, xCenter, yCenter, radius, percentage) {

    var paper = Raphael(el_id, 500, 500);

    paper.customAttributes.arc = function (xloc, yloc, value, total, R) {
        var alpha = 360 / total * value,
					a = (90 - alpha) * Math.PI / 180,
					x = xloc + R * Math.cos(a),
					y = yloc + R * Math.sin(a),
					path;
        if (total == value) {
            path = [
						["M", xloc, yloc - R],
						["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
					];
        } else {
            if (x == xCenter) {
                path = [
							["M", xloc, yloc + R],
							["A", R, R, 0, +(alpha > 180), 0, x - 0.01, y]
						];
            }
            else {
                path = [
							["M", xloc, yloc + R],
							["A", R, R, 0, +(alpha > 180), 0, x, y]
						];
            }
        }
        return {
            path: path
        };
    };

    var my_arc = paper.path().attr({
        "stroke": "#484848", 		/* Stroke color */
        "stroke-width": 8, 			/* Stroke width */
        arc: [xCenter, yCenter, 100, 100, radius]
    });

    my_arc.animate({
        arc: [xCenter, yCenter, 100 - percentage, 100, radius]
    }, 1500, "bounce"); 				/* Speed and animation effect */

}
//============================================== User defined functions =========================================================
//======================================= Get Location ======================================================================
function GetLocation() {
    var bodyId = $('body').attr('id');
    var AssociateId = $('#CurrentUserId').val();
    $("#RegisterAdvisor").prop('disabled', 'disabled');
    $("#Status").prop('disabled', 'disabled');
    $("#Loc").html('<option>All</option>');
    $('#Loc').selectpicker("refresh");
    $.ajax({
        type: 'POST',
        url: bodyId + '.aspx/GetLocation',
        contentType: 'application/json',
        data: "{associateId:'" + AssociateId + "'}",
        dataType: 'json',
        processData: false,
        success: function (response) {

            var Location = eval('(' + response.d + ')');
            var Citylength = Location.City.length;
            var AdviosrLength = Location.AdvisorsInfo.length
            var list = '';
            var Advisorlist = '';
            $("#Loc").html('');
            list += '<option>All</option>';
            for (var i = 0; i < Citylength; i++) {
                list += '<option value="' + Location.City[i].Cityname + '">' + Location.City[i].Cityname + '</option>';
            }
            $("#Loc").append(list);
            $('#Loc').selectpicker("refresh");

            if (AdviosrLength > 0) {
                for (var i = 0; i < AdviosrLength; i++) {

                    var temp = Location.AdvisorsInfo[i].Level.split(' for ');
                    var templength = temp.length;
                    if (templength != 1) {
                        var a = '';
                        a = temp[1];
                        temp = temp[1].split(' & ');
                        a = temp[0];
                    }
                    else {
                        a = Location.AdvisorsInfo[i].Level;
                    }
                    Advisorlist += '<div class="row">';
                    Advisorlist += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content">';
                    Advisorlist += '<div>';
                    var request = new XMLHttpRequest;
                    request.open('GET', "../../Pages/NA/ShowImage.ashx?id=" + Location.AdvisorsInfo[i].Associate_Id + "", false);
                    request.send();
                    if (request.status === 200) {
                        Advisorlist += '<img class="img-circle pull-left profile" runat="server" src="../../Pages/NA/ShowImage.ashx?id=' + Location.AdvisorsInfo[i].Associate_Id + '" alt="" />';
                    }
                    else {
                        Advisorlist += '<img class="img-circle pull-left profile" src="../../Resources/Images/NA/result_profile.png" /></span>';
                    }

                    // list += '<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/ >'; 
                    Advisorlist += '</div>';
                    Advisorlist += '<div class="col-xs-8 col-sm-3 col-md-3 col-lg-3 clsDetails">';
                    Advisorlist += '<p><span class="results_label">Name</span><span class="result_text">' + Location.AdvisorsInfo[i].Associate_Name + '</span></p>';
                    Advisorlist += '<p><span class="results_label">ID</span><span id="ccUserId">' + Location.AdvisorsInfo[i].Associate_Id + '</span></p>';
                    Advisorlist += '</div>';
                    Advisorlist += '<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 clsDetails_odd">';
                    Advisorlist += '<p><span class="results_label">Location</span><span class="result_text">' + Location.AdvisorsInfo[i].Location + '</span></p>';
                    Advisorlist += '<p><span class="results_label">BU</span><span class="result_text">' + Location.AdvisorsInfo[i].BU + '</span></p>';
                    Advisorlist += '</div>';
                    Advisorlist += '<div class="col-xs-12 col-sm-2 col-md-2 col-lg-3 clsDetailss">';
                    Advisorlist += '<p><span class="results_label">Designation</span><span class="result_text">' + Location.AdvisorsInfo[i].Designation + '</span></p>';
                    Advisorlist += '<p><span class="results_label">Level</span><span>' + a + '</span></p>';
                    Advisorlist += '</div>';
                    Advisorlist += '<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_send_req">';
                    Advisorlist += '<span>';
                    Advisorlist += '<input class="clsSend_req" type="button" id="clsSend_req' + i + '">';
                    Advisorlist += '<label class="req_send_label"  style="display:none;" id="req_send_label' + i + '">Request sent</label>';
                    Advisorlist += '</span>';
                    Advisorlist += '</div>';
                    Advisorlist += '</div>';
                    Advisorlist += '</div>';
                }
                // $("#searchScroll").html('');
                $("#searchScroll").append(Advisorlist);

                $('.clsSend_req').click(function () {
                    var inval = $(".clsSend_req").index(this);
                    /* alert( "That was div index #" + inval); */
                    $('.wrapper').prepend('<div class="overlay"></div>');
                    $('.wrapper').addClass('overflowhid');
                    $('#Popup1_send_req').show();
                    SelectedbuddyId = $(this).parents('div .results_content').find('#ccUserId')[0].innerHTML; //--working
                    SelectedSendRequestButton = $(this).parents('div .results_content').find('.clsSend_req')[0].id;
                    Replacedlabel = $(this).parents('div .results_content').find('.req_send_label')[0].id;
                });
            }
            else {
                $("#searchScroll").append('<label style="color:#999999; padding-left:35%;">No Advisor found of given Criteria</label>')
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });
}
//============================================ GetSearch Results ===============================================
function GetSearchresult() {

    if ($('input[name="Search"]').val() == 'Search') {
        GetAllPossibleAdvisors();
    }
    else {
        FilterLikelyAdvisors();
    }
}
//============================================== Reset function =================================================
function Resetfields() {
    AdvisorId = '';
    Location_NA = '';
    BUId_NA = '';
    BUName_NA = '';
    ProjectId_NA = '';
    ProjectName_NA = '';
    AccountId_NA = '';
    AccountName_NA = '';
    allresult = '';  //global variable to store entire likely buddy list without any filteration
    level1result = '';     //filtered w.r.t. registration & availability
    document.getElementById("inpt_Project").disabled = false;
    document.getElementById("inpt_BU").disabled = false;
    document.getElementById("inpt_Account").disabled = false;
    $('input[name="Search"]').val('Search');
    $('#Loc').removeAttr('disabled');
    $('#Loc').selectpicker("refresh");
    //  $("#searchScroll").html('');
    $('.selectpicker').selectpicker('deselectAll');
    $('.filter-option').text('All');
    $('.search_by_input').find('input:text').val('');
    $("#RegisterAdvisor").prop('disabled', 'disabled');
    $("#Status").prop('disabled', 'disabled');
}
//=============================================  Search Event =================================================
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

    if ($('#inpt_BU').val() == 'Enter BU') {
        BUId_NA = '';
    }


    if ($('#inpt_Project').val() == 'Enter Project') {
        ProjectId_NA = '';
    }


    if ($('#inpt_Account').val() == 'Enter Account') {
        AccountId_NA = '';
    }

    if (BuddyId == '') {
        if (ProjectId_NA != '' || BUId_NA != '' || AccountId_NA != '' || Location != '') {
            if (ProjectId_NA != '') {
                document.getElementById("inpt_Project").disabled = true;
            }
            else if (BUId_NA != '') {
                document.getElementById("inpt_BU").disabled = true;
            }
            else if (AccountId_NA != '') {
                document.getElementById("inpt_Account").disabled = true;
            }
            else {
                $("#Loc").prop('disabled', 'disabled');
            }
            $('input[name="Search"]').val("Filter");
            $("#RegisterAdvisor").removeAttr('disabled');
            $("#Status").removeAttr('disabled');
            $("#FiterAdvisor").show();
            $("#Reset").show();
        }
    }

    var BUId = BUId_NA; //$('#inpt_BU').val();
    var ProjectId = ProjectId_NA; //$('#inpt_Project').val();
    var AccountId = AccountId_NA; //$('#inpt_Account').val();

    $.ajax({
        type: 'POST',
        url: bodyId + '.aspx/GetAllPossibleAdvisors',
        contentType: 'application/json',
        data: "{joineeId:'" + joineeId + "',buddyId:'" + BuddyId + "',location:'" + Location + "',bussinessUnitId:'" + BUId + "',projectId:'" + ProjectId + "',accountId:'" + AccountId + "'}",
        dataType: 'json',
        processData: false,
        success: function (response) {

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
    var length = level1result.length;
    //=========================== binding ============================
    var list = '';
    $("#searchScroll").html('');
    // $("#searchScroll").append('<img style="padding-top: 100px; padding-left: 330px; width: 41px;" src="../../Resources/Images/NA/loading-blue.gif" runat="server" alt=""/>')
    if (length > 0) {
        for (var i = 0; i < length; i++) {

            var temp = Advisors[i].Level.split(' for ');
            var templength = temp.length;
            if (templength != 1) {
                var a = '';
                a = temp[1];
                temp = temp[1].split(' & ');
                a = temp[0];
            }
            else {
                a = Advisors[i].Level;
            }
            list += '<div class="row">';
            list += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content">';
            list += '<div>';
            var request = new XMLHttpRequest;
            request.open('GET', "../../Pages/NA/ShowImage.ashx?id=" + Advisors[i].Associate_Id + "", false);
            request.send();
            if (request.status === 200) {
                list += '<img class="img-circle pull-left profile" runat="server" src="../../Pages/NA/ShowImage.ashx?id=' + Advisors[i].Associate_Id + '" alt="" />';
            }
            else {
                list += '<img class="img-circle pull-left profile" src="../../Resources/Images/NA/result_profile.png" /></span>';
            }

            // list += '<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/ >'; 
            list += '</div>';
            list += '<div class="col-xs-8 col-sm-3 col-md-3 col-lg-3 clsDetails">';
            list += '<p><span class="results_label">Name</span><span class="result_text">' + Advisors[i].Associate_Name + '</span></p>';
            list += '<p><span class="results_label">ID</span><span id="ccUserId">' + Advisors[i].Associate_Id + '</span></p>';
            list += '</div>';
            list += '<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 clsDetails_odd">';
            list += '<p><span class="results_label">Location</span><span class="result_text">' + Advisors[i].Location + '</span></p>';
            list += '<p><span class="results_label">BU</span><span class="result_text">' + Advisors[i].BU + '</span></p>';
            list += '</div>';
            list += '<div class="col-xs-12 col-sm-2 col-md-2 col-lg-3 clsDetailss">';
            list += '<p><span class="results_label">Designation</span><span class="result_text">' + Advisors[i].Designation + '</span></p>';
            list += '<p><span class="results_label">Level</span><span>' + a + '</span></p>';
            list += '</div>';
            list += '<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_send_req">';
            list += '<span>';
            list += '<input class="clsSend_req" type="button" id="clsSend_req' + i + '">';
            list += '<label class="req_send_label"  style="display:none;" id="req_send_label' + i + '">Request sent</label>';
            list += '</span>';
            list += '</div>';
            list += '</div>';
            list += '</div>';
        }
        // $("#searchScroll").html('');
        $("#searchScroll").append(list);
    }
    else {
        $("#searchScroll").append('<label style="color:#999999; padding-left:35%;">No Advisor found of given Criteria</label>')
        document.getElementById("inpt_Project").disabled = false;
        document.getElementById("inpt_BU").disabled = false;
        document.getElementById("inpt_Account").disabled = false;
        $('input[name="Search"]').val('Search');
        $('#Loc').removeAttr('disabled');
        $("#RegisterAdvisor").prop('disabled', 'disabled');
        $("#Status").prop('disabled', 'disabled');
    }
    $("#clslazy").lazyload();
    //    $(".btn_send_req").click(function () {
    //        $('.wrapper').prepend('<div class="overlay"></div>');
    //        $('.wrapper').addClass('overflowhid');
    //        $('#Popup1_send_req').show();
    //        SelectedbuddyId = $(this).parent('div').find('span#ccUserId').text();
    //    });

    $('.clsSend_req').click(function () {
        var inval = $(".clsSend_req").index(this);
        /* alert( "That was div index #" + inval); */
        $('.wrapper').prepend('<div class="overlay"></div>');
        $('.wrapper').addClass('overflowhid');
        $('#Popup1_send_req').show();
        SelectedbuddyId = $(this).parents('div .results_content').find('#ccUserId')[0].innerHTML; //--working
        SelectedSendRequestButton = $(this).parents('div .results_content').find('.clsSend_req')[0].id;
        Replacedlabel = $(this).parents('div .results_content').find('.req_send_label')[0].id;
    });
}
//============================================================ Filter Event =============================================
function FilterLikelyAdvisors() {
    var allBuddies = eval('(' + allresult.d + ')');
    level1result = allBuddies;
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

    if ($('#RegisterAdvisor').val() == 'All') {
        var Enrolled = '';
    }
    else {
        var Enrolled = $('#RegisterAdvisor').val();
    }

    if ($('#Status').val() == 'All') {
        var Status = '';
    }
    else {
        var Status = $('#Status').val();
    }

    if ($('#inpt_BU').val() == 'Enter BU') {
        BUId_NA = '';
    }


    if ($('#inpt_Project').val() == 'Enter Project') {
        ProjectId_NA = '';
    }


    if ($('#inpt_Account').val() == 'Enter Account') {
        AccountId_NA = '';
    }

    if ($('#inpt_IDname').val() == '' || $('#inpt_IDname').val() == "Enter ID") {
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
    }
    if ($('#inpt_IDname').val() == '' || $('#inpt_IDname').val() == "Enter ID") {
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

    if ($('#inpt_IDname').val() != '' && $('#inpt_IDname').val() != 'Enter ID') {
        var associateid = AdvisorId;
        j = 0;
        for (i = 0; i < level1result.length; i++) {
            if (level1result[i].Associate_Id == associateid) {
                ads.AdvisorList[j] = {};
                ads.AdvisorList[j] = level1result[i];
                j++;
            }
        }
        level1result = ads.AdvisorList;
    }

    var length = level1result.length;
    //=========================== binding ============================
    var list = '';
    $("#searchScroll").html('');
    if (length > 0) {
        for (var i = 0; i < length; i++) {

            var temp = level1result[i].Level.split(' for ');
            var templength = temp.length;
            if (templength != 1) {
                var a = '';
                a = temp[1];
                temp = temp[1].split(' & ');
                a = temp[0];
            }
            else {
                a = Advisors[i].Level;
            }

            list += '<div class="row">';
            list += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content">';
            list += '<div>';
            var request = new XMLHttpRequest;
            request.open('GET', "../../Pages/NA/ShowImage.ashx?id=" + level1result[i].Associate_Id + "", false);
            request.send();
            if (request.status === 200) {
                list += '<img class="img-circle pull-left profile" runat="server" src="../../Pages/NA/ShowImage.ashx?id=' + level1result[i].Associate_Id + '" alt="" />';
            }
            else {
                list += '<img class="img-circle pull-left profile" src="../../Resources/Images/NA/result_profile.png" /></span>';
            }

            // list += '<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/ >'; 
            list += '</div>';
            list += '<div class="col-xs-8 col-sm-3 col-md-3 col-lg-3 clsDetails">';
            list += '<p><span class="results_label">Name</span><span class="result_text">' + level1result[i].Associate_Name + '</span></p>';
            list += '<p><span class="results_label">ID</span><span id="ccUserId">' + level1result[i].Associate_Id + '</span></p>';
            list += '</div>';
            list += '<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 clsDetails_odd">';
            list += '<p><span class="results_label">Location</span><span class="result_text">' + level1result[i].Location + '</span></p>';
            list += '<p><span class="results_label">BU</span><span class="result_text">' + level1result[i].BU + '</span></p>';
            list += '</div>';
            list += '<div class="col-xs-12 col-sm-2 col-md-2 col-lg-3 clsDetailss">';
            list += '<p><span class="results_label">Designation</span><span class="result_text">' + level1result[i].Designation + '</span></p>';
            list += '<p><span class="results_label">Level</span><span>' + a + '</span></p>';
            list += '</div>';
            list += '<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_send_req">';
            list += '<span>';
            list += '<input class="clsSend_req" id="clsSend_req' + i + '" type="button">';
            list += '<label class="req_send_label"  style="display:none;" id="req_send_label' + i + '">Request sent</label>';
            list += '</span>';
            list += '</div>';
            list += '</div>';
            list += '</div>';
        }
        $("#searchScroll").append(list);
    }
    else {
        $("#searchScroll").append('<label style="color:#999999; padding-left:35%;">No Advisor found of given Criteria</label>')
    }
    //    $(".btn_send_req").click(function () {
    //        $('.wrapper').prepend('<div class="overlay"></div>');
    //        $('.wrapper').addClass('overflowhid');
    //        $('#Popup1_send_req').show();
    //        SelectedbuddyId = $(this).parent('div').find('span#ccUserId').text();
    //    });
    $('.clsSend_req').click(function () {
        var inval = $(".clsSend_req").index(this);
        /* alert( "That was div index #" + inval); */
        $('.wrapper').prepend('<div class="overlay"></div>');
        $('.wrapper').addClass('overflowhid');
        $('#Popup1_send_req').show();
        SelectedbuddyId = $(this).parents('div .results_content').find('#ccUserId')[0].innerHTML; //--working
        SelectedSendRequestButton = $(this).parents('div .results_content').find('.clsSend_req')[0].id;
        Replacedlabel = $(this).parents('div .results_content').find('.req_send_label')[0].id;
    });
}

//===============================================================  RaiseSuperVisorRequest =================================================================

function RaiseSupervisorRequest() {
    var JoineeId = $('#CurrentUserId').val();
    var bodyId = $('body').attr('id');
    $.ajax({
        type: 'POST',
        url: bodyId + '.aspx/RaiseSupervisorRequest',
        contentType: 'application/json',
        data: "{joineeId:'" + JoineeId + "'}",
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
        $('#Popup2_send').show();
        $("#message").html('');
        $("#message").append("Request mail has been sent to your supervisor.");
    }
    else {
        $('#Popup2_send').show();
        $("#message").html('');
        $("#message").append("You have already asked your supervisor for buddy. Please wait for the response.");
    }
}
function OnErrorRaiseSupervisorRequest(x, y) {
    $('#Popup2_send').show();
    $("#message").html('');
    $("#message").append("Oops looks like something went wrong, please try raising request after some time.");
}


//======================================================== Get Joinee Alerts =====================================================
function GetJoineeAlerts() {
    var JoineeId = $('#CurrentUserId').val();
    $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/GetJoineeAlerts',
        contentType: 'application/json',
        data: "{joineeId:'" + JoineeId + "'}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            OnSuccessGetJoineeAlerts(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            OnErrorGetJoineeAlerts(xhr.status, thrownError);
        }
    });
}

function OnSuccessGetJoineeAlerts(response) {
    var JoineeAlerts = eval('(' + response.d + ')');
    var length = JoineeAlerts.length;
    $('#Newhire_alerts').html('');

    var list = '';
    if (length > 0) {
        for (var i = 0; i < length; i++) {
            list += ' <div class="row">';
            list += ' <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 alerts_content">';
            //list += ' <img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/>';
            var request = new XMLHttpRequest;
            request.open('GET', "../../Pages/NA/ShowImage.ashx?id=" + JoineeAlerts[i].AdvisorId + "", false);
            request.send();
            if (request.status === 200) {
                list += '<img class="img-circle pull-left profile" runat="server" src="../../Pages/NA/ShowImage.ashx?id=' + JoineeAlerts[i].AdvisorId + '" alt="" />';
            }
            else {
                list += '<img class="img-circle pull-left profile" src="../../Resources/Images/NA/result_profile.png" /></span>';
            }
            list += ' <p>' + JoineeAlerts[i].JoineeAlerts + '</p>';
            list += ' </div>';
            list += ' </div>';
        }
        $('#Newhire_alerts').append(list);
    }
    else {
        $('#Newhire_alerts').append('<label style="color:#999999; padding-left: 40%;">No Alerts found</label>');
    }
}

//======================================================= CheckConnectionRequest ====================================================================
function CheckConnectionRequest(BuddyId) {
    var JoineeId = $("#CurrentUserId").val();
    $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/CheckConnectionRequest',
        contentType: 'application/json',
        data: "{joineeId:'" + JoineeId + "',buddyId:'" + BuddyId + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            onsuccessCheckConnectionRequest(response, JoineeId, BuddyId);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            onerrorCheckConnectionRequest(xhr.status, thrownError);
        }
    });
}

function onsuccessCheckConnectionRequest(result, JoineeId, BuddyId) {
    var Associate = eval('(' + result.d + ')');
    if (result.d == '1') {
        BuddyConnectionRequest(JoineeId, BuddyId);
        $('#Popup2_send').show();
        $("#message").html('');
        $("#message").append("You have successfully send Advisor request.");
        //        $('.clsSend_req').hide();
        //        $('.req_send_label').show();
        $('#' + SelectedSendRequestButton + '').hide();
        $('#' + Replacedlabel + '').show();
    }
    else if (result.d == '2') {
        $('#Popup2_send').show();
        $("#message").html('');
        $("#message").append("You are already connected with this Advisor.");
    }
    else if (result.d == '3') {
        $('#Popup2_send').show();
        $("#message").html('');
        $("#message").append("Earlier he/she was your Advisor, so can't send request again.");
    }
    else if (result.d == '4') {
        $('#Popup2_send').show();
        $("#message").html('');
        $("#message").append("Earlier Advisor request is pending for approval.");
    }
    else if (result.d == '5') {
        $('#Popup2_send').show();
        $("#message").html('');
        $("#message").append("Your connection quota is full. You can't send more request.");
    }
    else if (result.d == '6') {
        $('#Popup2_send').show();
        $("#message").html('');
        $("#message").append("Advisor is not of more than 12 months experience or not upto 2 levels above.");
    }
    else if (result.d == '7') {
        $('#Popup2_send').show();
        $("#message").html('');
        $("#message").append("Advisor is busy, so can't take anymore requests.");
    }
    else {
        $('#Popup2_send').show();
        $("#message").html('');
        $("#message").append("This Associate is not eligible to be your Advisor.");
    }
    return true;
}

function onerrorCheckConnectionRequest() {
    $('#Popup2_send').show();
    $("#message").html('');
    $("#message").append("Can't send request now, please try after some time.");
}
//================================================== BuddyConnection Request ==========================================================

function BuddyConnectionRequest(JoineeId, BuddyId) {
    var bodyId = $('body').attr('id');
    $.ajax({
        type: 'POST',
        url: '' + bodyId + '.aspx/BuddyConnectionRequest',
        contentType: 'application/json',
        data: "{joineeId:'" + JoineeId + "',buddyId:'" + BuddyId + "',requestType:'Send',rejectionComment:'',supervisorRecommended:'0'}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            //  OnSuccessSendBuddyRequest(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $('#Popup2_send').show();
            $("#message").html('');
            $("#message").append("Can't send request now, please try after some time.");
        }
    });
}
//========================================================= Getfeedback Questions =====================================================

//Note need change Sp refered to function
function GetFeedbackQuestions(ViewAdvisorId, ReviewType) {
    var BuddyId = ViewAdvisorId;
    if (ReviewType == 'TM') {
        var JoineeId = '';
    }
    else {
        var JoineeId = $('#CurrentUserId').val();
    }
    var CountryId = $('#CountryId').val();
    var ReviewType = ReviewType;
    var bodyId = $('body').attr('id');
    $.ajax({
        type: 'POST',
        url: '' + bodyId + '.aspx/GetFeedbackQuestions',
        contentType: 'application/json',
        data: "{buddyId:'" + BuddyId + "',joineeId:'" + JoineeId + "',countryId:'" + CountryId + "',reviewType:'" + ReviewType + "'}",
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
        if (Questions.ObjFeedbackQuestions[0].IsFeedbackShared == 1) {
            for (var i = 0; i < length; i++) {
                list += ' <li>' + Questions.ObjFeedbackQuestions[i].QuestionText + '';
                list += ' <ul class="choose_option" id="' + QueCount + '">';
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
                $('#OkFeedback').hide();
                $('#note_text').hide();
            }
        }
        else {
            for (var i = 0; i < length; i++) {
                list += ' <li>' + Questions.ObjFeedbackQuestions[i].QuestionText + '';
                list += ' <ul class="choose_option" id="' + QueCount + '">';
                list += ' <li class="cls_stdisagree"><span>1</span></li>';
                list += ' <li class="cls_disagree"><span>2</span></li>';
                list += ' <li class="cls_neutral"><span>3</span></li>';
                list += ' <li class="cls_agree"><span>4</span></li>';
                list += ' <li class="cls_stagree"><span>5</span></li>';
                list += ' </ul>';
                list += ' <div class="clearfix"></div>';
                list += ' </li>';
                QueCount++;
                $('#OkFeedback').show();
                $('#note_text').show();
            }
        }
        $('.feedback_ques').append(list);
        $('.feedback_options').show()
    }
    else {
        $('.feedback_options').hide();
        $('.feedback_ques').append('<label style="color:#999999;">No feedback Avaialble</label>');
        $('#OkFeedback').hide();
        $('#note_text').hide();
    }

    if (length > 0) {
        if (Questions.ObjFeedbackQuestions[0].IsFeedbackShared == 1) {
            $(".choose_option li").unbind('click');
        }
        else {
            //li choose click
            $('.choose_option li').click(function () {
                var ind = $(this).index().toString();
                var QuesNumber = $(this).parent('ul')[0].id;
                var ArrCount = parseInt(QuesNumber) - 1;
                arrQuesAnswer[ArrCount] = parseInt(ind) + 1;
                var rating = $(this)[0].innerText;
                $(this).siblings().find('span').removeClass('selected');
                $(this).find('span').addClass('selected');
                var i = $('.choose_option').val();

            })
        }
    }
}

//============================================================= Submit FeedBack =======================================================
function SubmitFeedback(list) {
    var BuddyId = ViewAdvisorId;
    var JoineeId = $('#CurrentUserId').val();
    var bodyId = $('body').attr('id');
    var answerList = '';
    for (i = 0; i < list.length; i++) {
        answerList += list[i] + ',';
    }
    //    if (answerList.length > 10) {
    //        // if (list[i] == undefined) {
    //        $('#successful_completion').show();
    //        $("#Send_Feedback").html('');
    //        $("#Send_Feedback").append("All Questions are mandatory");
    //        return;
    //        arrQuesAnswer = [];
    //    }
    if (answerList.length == 10) {
        $.ajax(
        {
            type: 'POST',
            url: '' + bodyId + '.aspx/SetFeedbackQuestions',
            contentType: 'application/json',
            data: "{joineeId:'" + JoineeId + "',buddyId:'" + BuddyId + "',list:'" + answerList + "'}",
            dataType: 'json',
            processData: false,
            success: function (response) {
                //OnSuccessSetFeedbackQuestions(response);
                arrQuesAnswer = [];
                $('#feedback').modal('hide');
                $('.wrapper').prepend('<div class="overlay"></div>');
                $('.modal-backdrop').remove();
                $('.modal').removeClass('in')
                $('#successful_completion').show();
                $("#Send_Feedback").html('');
                $("#Send_Feedback").append("You have successfully submitted your feedback");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //OnErrorFeedbackQuestions(xhr.status, thrownError);
                $('#successful_completion').show();
                $("#Send_Feedback").html('');
                $("#Send_Feedback").append("Can't submit your feedback now, please try after sometime.");
            }

        });
    }

    else {
        $('.wrapper').prepend('<div class="overlay"></div>');
        $('#successful_completion').show();
        $("#Send_Feedback").html('');
        $("#Send_Feedback").append("All Questions are mandatory");
        //   $("#note_text").html('*All Questions are mandatory');
        //  arrQuesAnswer = [];

    }
}

//============================================================ View your Advisors Details ===================================================
function ViewAdvisorsDetails() {
    var JoineeId = $('#CurrentUserId').val();
    var bodyId = $('body').attr('id');
    var type = 'Joinee';

    $.ajax({
        type: 'POST',
        url: '' + bodyId + '.aspx/ViewAdvisorsDetails',
        contentType: 'application/json',
        data: "{joineeId:'" + JoineeId + "',type:'" + type + "'}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            OnSuccessViewAdvisorsDetails(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            // OnErrorViewAdvisorsDetails(xhr.status, thrownError);
        }
    });
}

function OnSuccessViewAdvisorsDetails(result) {
    var Joinee = eval('(' + result.d + ')');
    var list = "";
    $("#cls_view_advisor").html('');
    if (Joinee.MyConnections != null) {
        var a = Joinee.MyConnections.length;
        for (var i = 0; i < a; i++) {
            var days = Joinee.MyConnections[i].DaysTotal;
            if (days > Joinee.MyConnections[i].DaysToShowAdvisor) { // Retrive from database 'DaysToShowAdvisor'
                list += '<div class="row"><div class=" view_advisor_inner_content col-md-offset-1 col-xs-offset-1 col-xs-10 col-sm-10 col-md-10 col-lg-10">';
                var request = new XMLHttpRequest;
                request.open('GET', "../../Pages/NA/ShowImage.ashx?id=" + Joinee.MyConnections[i].ConnectedToId + "", false);
                request.send();
                list += '<span class="associate_image_wrapper" style="background:url(../../Resources/Images/NA/image_bg_new.png) no-repeat; border-radius: 87px;">';
                if (request.status === 200) {
                    list += '<span class="associate_image" style="background:url(../../Pages/NA/ShowImage.ashx?id=' + Joinee.MyConnections[i].ConnectedToId + ') -6px 0 no-repeat; border-radius: 87px;"> </span>';
                }
                else {
                    if (Gender.value == 'M')
                        list += '<span class="associate_image" style="background:url(../../Resources/Images/NA/dummy_image_male.jpg) -6px 0 no-repeat; border-radius: 87px;"> </span>';
                    //                    list += '<span class="associate_image" style="background:url(../../Resources/Images/NA/desktop_associate.png) no-repeat;"> </span>';
                    else
                        list += '<span class="associate_image" style="background:url(../../Resources/Images/NA/dummy_image_female.jpg) -6px 0  no-repeat; border-radius: 87px;"> </span>'
                    //                    list += '<span class="associate_image" style="background:url(../../Resources/Images/NA/desktop_associate.png) no-repeat;"> </span>';
                }
                list += '</span>';
                list += '<div class="row">';
                list += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">';
                list += '<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 pad_50">';
                list += '<div class=" col-xs-12 col-sm-12 col-md-12 col-lg-12 view_advisor_list ">';
                list += '<label for="" class="control-label ">Name :</label>';
                list += '<span>' + Joinee.MyConnections[i].UserName + '</span> </div>';
                list += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 view_advisor_list" id="Advisor">';
                list += '<label for="" class="control-label ">ID :</label>';
                list += '<span id="ViewAdvisorId">' + Joinee.MyConnections[i].ConnectedToId + '</span> </div>';
                list += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 view_advisor_list">';
                list += '<label for="" class="control-label ">BU :</label>';
                list += '<span>' + Joinee.MyConnections[i].UserBU + '</span> </div>';
                list += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 view_advisor_list">';
                list += '<label for="" class="control-label ">Grade :</label>';
                list += '<span>' + Joinee.MyConnections[i].UserDesignation + '</span> </div>';
                list += '</div>';
                if (Joinee.MyConnections[i].ConnectionEndStatus == 1) {
                    list += '<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="text-align:center;" >';
                    list += '<p class="days_left">Days Left</p>';
                    list += '<div class="status_holder">';
                    list += '<div class="man_holder ">';
                    list += '<span class="days_left_number">' + days + '</span>';
                    list += '<img src="../../Resources/Images/NA/progress_bar_image.png" class="progress_bar_bg"/>';
                    list += '<div class="custom_arc" id="custom_arc' + i + '"> </div>';
                    //   list += '<div id="custom_arc"> </div>';
                    list += '</div>';
                    list += '</div>';
                    list += '</div>';
                }
                list += '</div>';
                list += '</div>';
                list += '<div class="row">';
                list += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 pad_140" style="text-align:center;">';
                if (Joinee.MyConnections[i].FeedbackStatus == 1) {
                    list += '<input type="button" class="btn_orange feedback_btn" id="feedback_btn' + i + '" value="Feedback"/>';
                }
                if (Joinee.MyConnections[i].ConnectionEndStatus == 1) {
                    list += '<input type="button" class="btn_grey  end_connection" id="end_connection' + i + '" value="End Connection"/>';
                }
                list += '</div>';
                list += '</div>';
                list += '</div>';
                list += '</div>';
            }
        }
    }
    else {
        $("#cls_view_advisor").append('<label style="color:#999999; padding-left: 40%;">No Advisor is connected with you</label>');
    }
    $("#cls_view_advisor").append(list);
    for (var i = 0; i < a; i++) {
        if (Joinee.MyConnections[i].ConnectionStatus == 'CONNECTED') {
            var days = Joinee.MyConnections[i].DaysTotal;
            if (days > 0) {
                init_circular_progress('custom_arc' + i + '', 38, 38, 31, days);
            }
        }
    }
    // Popup feedback
    $(".feedback_btn").click(function () {
        ViewAdvisorId = $(this).parents('div .view_advisor_inner_content').find('#ViewAdvisorId')[0].innerHTML;
        var ReviewType = '';
        GetFeedbackQuestions(ViewAdvisorId, ReviewType);
        $("#feedback").modal('show');
    });
    //Pop up end_connection
    $('.end_connection').click(function () {
        $('.wrapper').prepend('<div class="overlay"></div>');
        $('.wrapper').addClass('overflowhid');
        $('#endConnection').show();
        $(this).addClass('accept_clicked')
        ViewAdvisorId = $(this).parents('div .view_advisor_inner_content').find('#ViewAdvisorId')[0].innerHTML;
    });
    //$('.associate_image').css("background", "url(../../Pages/NA/ShowImage.ashx?id='" + bgImage + "')");

}
//================================================ check status of feedback button =============================================

function GetEnableStatusOfFeedButton(advisorId, count) {
    var JoineeId = $('#CurrentUserId').val();
    var BuddyId = advisorId;

    $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/GetEnableStatusOfFeedButton',
        contentType: 'application/json',
        data: "{joineeID:'" + JoineeId + "',buddyID:'" + BuddyId + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            onsuccessGetEnableStatusOfFeedButton(response, count);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            onerrorGetEnableStatusOfFeedButton(xhr.status, thrownError);
        }
    });
}
function onsuccessGetEnableStatusOfFeedButton(result, count) {
    var ReturnStatus = eval('(' + result.d + ')');
    if (ReturnStatus.ConnectionStatus == 'NA') {
        $('#feedback_btn' + count + '').hide();
    }
    else {
        $('#feedback_btn' + count + '').show();
    }
}
function onerrorGetEnableStatusOfFeedButton() {

}
//======================================================== End Connection By Joinee========================================================
function EndConnectionByJoinee() {
    var joineeId = $('#CurrentUserId').val();
    var buddyId = ViewAdvisorId; //$('#ViewAdvisorId')[0].innerHTML;
    var bywhom = 'Joinee';
    var requestType = 'ACCEPT';
    var bodyId = $('body').attr('id');

    $.ajax({
        type: 'POST',
        url: '' + bodyId + '.aspx/DisconnectionRequest',
        contentType: 'application/json',
        data: "{joineeId:'" + joineeId + "',buddyId:'" + buddyId + "',bywhom:'" + bywhom + "',requestType:'" + requestType + "'}",
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
    $('#Popup2_send').show();
    $("#message").html('');
    $("#message").append("You have successfully Disconnected with Advisor.");
    ViewAdvisorsDetails();
}

function OnErrorDisconnectionRequestByJoinee() {
    $('#Popup2_send').show();
    $("#message").html('');
    $("#message").append("Can't Disconnect now, please try after some time.");
}
// ==================================================  Get PageContent =================================================================
function GetPageContent() {
    var PageName = $('body').attr('id');
    var CountryId = $('#CountryId').val();
    var Role = 'Joinee';
    $.ajax({
        type: 'POST',
        url: PageName + '.aspx/GetPageContent',
        contentType: 'application/json',
        data: "{countryId:'" + CountryId + "',pageName:'" + PageName + "',role:'" + Role + "'}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            var PageContent = eval('(' + response.d + ')');
            var length = PageContent.PageContentDetails.length;
            $('#PageContent').html('');
            var list = '';
            for (var i = 0; i < length; i++) {
                list += PageContent.PageContentDetails[i].Content;
            }
            $('#PageContent').append(list);
            document.getElementById('lblDuration').innerHTML = ConnectionDuration.value;
            document.getElementById('lblDuration1').innerHTML = ConnectionDuration.value;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $('#Popup2_send').show();
            $("#message").html('');
            $("#message").append("Oops looks like something went wrong, please try after some time.");
        }
    });
}
//====================================================== Show/Hide tiles ==========================================================

function ShowHideTiles() {
    var PageName = $('body').attr('id');
    var joineeId = $('#CurrentUserId').val();
    $.ajax({
        type: 'POST',
        url: PageName + '.aspx/ShowHideTiles',
        contentType: 'application/json',
        data: "{joineeId:'" + joineeId + "',userType:'Joinee'}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            //Result.tiles[0].EnableViewAdvisor == 'True'
            var Result = eval('(' + response.d + ')');
            if (Result.Tiles[0].EnableViewAdvisor == 'True' && Result.Tiles[0].EnableAskSupervisor == 'False' && Result.Tiles[0].EnableSearch == 'False') {
                $('.recommend_advisor').parent().hide();
                $('.newhire_content').css('margin-left', '17%')
                $(".search_advisor").addClass('view_advisor');
                $(".view_advisor").find('h5').html('View your Advisor Details');
                $(".view_advisor").find('img').attr('src', '../../Resources/Images/NA/icon_advisor_details.png');
                $(".view_advisor").find('p').html('Click here to learn more about your Advisor, provide feedback on the program,or end your connection with your Advisor.');
            }
            if (Result.Tiles[0].EnableViewAdvisor == 'True' && Result.Tiles[0].EnableAskSupervisor == 'True' && Result.Tiles[0].EnableSearch == 'False') {
                $(".search_advisor").addClass('view_advisor');
                $(".view_advisor").find('h5').html('View your Advisor Details');
                $(".view_advisor").find('img').attr('src', '../../Resources/Images/NA/icon_advisor_details.png');
                $(".view_advisor").find('p').html('Click here to learn more about your Advisor, provide feedback on the program,or end your connection with your Advisor.');
            }
            if (Result.Tiles[0].EnableViewAdvisor == 'False' && Result.Tiles[0].EnableAskSupervisor == 'False' && Result.Tiles[0].EnableSearch == 'True') {
                $('.recommend_advisor').parent().hide();
                $('.newhire_content').css('margin-left', '17%')
            }

            if (Result.Tiles[0].EnableViewAdvisor == 'False' && Result.Tiles[0].EnableAskSupervisor == 'True' && Result.Tiles[0].EnableSearch == 'True') {

            }

        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });
}
//========================================================  Configuration  ============================================================
//========================================================= GetConfiguration  ============================================

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

                $("#BuddyNJcon").text(Configuration[0].BuddyJoineeConnections);
                $("#NoofAppUsers").text(Configuration[0].NoofAppusers);

                BuddyDuration = (BuddyDuration == 0 ? "" : BuddyDuration);
                $('#AdvisorDuration .filter-option').text(BuddyDuration + ' days ');
                $('#AdvisorDurationSelected').val(BuddyDuration);

                RequestToRegBuddy = (RequestToRegBuddy == 0 ? "" : RequestToRegBuddy);
                $('#RequestToRegBuddy .filter-option').text(RequestToRegBuddy);
                $('#RequestToRegBuddySelected').val(RequestToRegBuddy);

                RequestAcceptedbyRegBuddy = (RequestAcceptedbyRegBuddy == 0 ? "" : RequestAcceptedbyRegBuddy);
                $('#RequestAcceptedbyRegBuddy .filter-option').text(RequestAcceptedbyRegBuddy);
                $('#RequestAcceptedbyRegBuddySelected').val(RequestAcceptedbyRegBuddy);

                RequestToUnregBuddy = (RequestToUnregBuddy == 0 ? "" : RequestToUnregBuddy);
                $('#RequestToUnregBuddy .filter-option').text(RequestToUnregBuddy);
                $('#RequestToUnregBuddySelected').val(RequestToUnregBuddy);

                RequestsAcceptedByUnregBuddy = (RequestsAcceptedByUnregBuddy == 0 ? "" : RequestsAcceptedByUnregBuddy);
                $('#RequestsAcceptedByUnregBuddy .filter-option').text(RequestsAcceptedByUnregBuddy);
                $('#RequestsAcceptedByUnregBuddySelected').val(RequestsAcceptedByUnregBuddy);

                ConnectionsOfJoiners = (ConnectionsOfJoiners == 0 ? "" : ConnectionsOfJoiners);
                $('#ConnectionsOfJoiners .filter-option').text(ConnectionsOfJoiners);
                $('#ConnectionsOfJoinersSelected').val(ConnectionsOfJoiners);

                RequestsSendByJoinee = (RequestsSendByJoinee == 0 ? "" : RequestsSendByJoinee);
                $('#RequestsSendByJoinee .filter-option').text(RequestsSendByJoinee);
                $('#RequestsSendByJoineeSelected').val(RequestsSendByJoinee);

                var list = '';
                $("#ConfigLocation1").html('');
                if (Configuration[0].CountryList.length > 0) {
                    for (var i = 0; i < Configuration[0].CountryList.length; i++) {
                        list += '<option value="' + Configuration[0].CountryList[i].CountryId + '">' + Configuration[0].CountryList[i].CountryDesc + '</option>';
                    }
                }
                $("#ConfigLocation1").append(list);
                $('#ConfigLocation1').selectpicker("refresh");

                $('#ConfigLocation .filter-option').text(Configuration[0].CountryName);
                $('#ConfigLocation1').val(CountryId);
                $('#ConfigLocation').selectpicker("refresh");
            }

        },
        error: function (result) {
            $('.wrapper').prepend('<div class="overlay"></div>');
            $('.wrapper').addClass('overflowhid');
            $('#Popup2_send').show();
            $("#message").html('');
            $("#message").append("Unable to retrieve configuration settings. Please try later.");
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
    BuddyDuration = $('#AdvisorDurationSelected').val();
    RequestToRegBuddy = $('#RequestToRegBuddySelected').val();
    RequestAcceptedbyRegBuddy = $('#RequestAcceptedbyRegBuddySelected').val();
    RequestToUnregBuddy = $('#RequestAcceptedbyRegBuddySelected').val();
    RequestsAcceptedByUnregBuddy = $('#RequestsAcceptedByUnregBuddySelected').val();
    RequestsSendByJoinee = $('#RequestsSendByJoineeSelected').val();
    ConnectionsOfJoiners = $('#ConnectionsOfJoinersSelected').val();
    SelectCountryId = $('#ConfigLocation1').val();

    validateconfig(function (isAllowed) {
        if (isAllowed) {
            $.ajax({
                type: 'POST',
                url: $('body').attr('id') + '.aspx/ConfigureAdmin',
                contentType: 'application/json',
                data: "{buddyDuration: " + BuddyDuration + ",requestToRegBuddy: " + RequestToRegBuddy + ",requestAcceptedByRegBuddy: " + RequestAcceptedbyRegBuddy + ",requestToUnRegBuddy: " + RequestToUnregBuddy + ",requestAcceptedByUnRegBuddy: " + RequestsAcceptedByUnregBuddy + ",requestsSendByJoinee:" + RequestsSendByJoinee + ",connectionsOfJoiners:" + ConnectionsOfJoiners + ",selectCountryId:'" + SelectCountryId + "'}",
                dataType: 'json',
                processData: false,
                success: function (response) {
                    $('.wrapper').prepend('<div class="overlay"></div>');
                    $('.wrapper').addClass('overflowhid');
                    $('#submit_configure').show();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    $('.wrapper').prepend('<div class="overlay"></div>');
                    $('.wrapper').addClass('overflowhid');
                    $('#Popup2_send').show();
                    $("#message").html('');
                    $("#message").append("Cannot set configuration right now, please do it after some time.");
                }
            });
        }
        else {
            $('.wrapper').prepend('<div class="overlay"></div>');
            $('.wrapper').addClass('overflowhid');
            $('#Popup2_send').show();
            $("#message").html('');
            $("#message").append(" <p>1. <span>Enrolled buddy cannot receive requests greater than he can accept.</span><br />2. <span>Non-Enrolled buddy cannot receive requests greater than he can accept.</span><br />3. <span>Non-Enrolled buddy cannot receive requests greater than Enrolled Buddy can.</span><br />4. <span>Non-Enrolled buddy cannot accept requests greater than Enrolled Buddy can.</span><br />5. <span>Joinee cannot send requests greater than No. of connections he can have.</span> </p>");
        }
    });
}

//============================================== DASHBOARD ==================================================================

//-----------------------------------------------Prefill values (BUnames, country names, buddylist-dashboard, piechart)-------------------------------------------
function GetDashBoardTabPrefillValues() {
    var bodyId = $('body').attr('id');
    $("#DashboardBU").html('<option value="All">All</option>');
    $('#DashboardBU').selectpicker("refresh");

    $("#DashboardLoc").html('<option value="All">All</option>');
    $('#DashboardLoc').selectpicker("refresh");
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
            // onerrorGetDashBoardTabPrefillValues(xhr.status, thrownError);
        }
    });
}
function onsuccessGetDashBoardTabPrefillValues(response) {
    var result = eval('(' + response.d + ')');

    var BUlength = result.BUNames.length;
    var Countrylength = result.CountryList.length;
    var Dashboarddatalength = result.DashBoardData.length;
    var BUlist = '';
    $("#DashboardBU").html('');
    BUlist += '<option value="All">All</option>';
    if (BUlength > 0) {
        for (var i = 0; i < BUlength; i++) {
            BUlist += '<option value="' + result.BUNames[i].DeptDesc + '">' + result.BUNames[i].DeptDesc + '</option>';
        }
        $("#DashboardBU").append(BUlist);
        $('#DashboardBU').selectpicker("refresh");
    }
    var Countrylist = '';
    $("#DashboardLoc").html('');
    if (Countrylength > 0) {
        Countrylist += '<option value="All">All</option>';
        for (var i = 0; i < Countrylength; i++) {
            Countrylist += '<option value="' + result.CountryList[i].CountryId + '">' + result.CountryList[i].CountryDesc + '</option>';
        }
    }
    $("#DashboardLoc").append(Countrylist);
    $('#DashboardLoc').selectpicker("refresh");

    var dashboarddata = '';
    $('#DashBoardData').html('');
    if (Dashboarddatalength > 0) {
        for (var i = 0; i < Dashboarddatalength; i++) {
            dashboarddata += '<div class="row">';
            dashboarddata += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content" >';
            //  dashboarddata += '<div class="profile_pic"> <img src="../../Resources/Images/NA/associate_image_img.png" class="img-circle" width="43" height="43"/ > </div>';
            var request = new XMLHttpRequest;
            request.open('GET', "../../Pages/NA/ShowImage.ashx?id=" + result.DashBoardData[i].BuddyId + "", false);
            request.send();
            if (request.status === 200) {
                dashboarddata += '<div class="profile_pic"> <img src="../../Pages/NA/ShowImage.ashx?id=' + result.DashBoardData[i].BuddyId + '" class="img-circle" width="43" height="43"/ > </div>';
            }
            else {
                if (Gender.value == 'M') {
                    dashboarddata += '<div class="profile_pic"> <img src="../../Resources/Images/NA/dummy_image_male.jpg" class="img-circle" width="43" height="43"/ > </div>';
                }
                else {
                    dashboarddata += '<div class="profile_pic"> <img src="../../Resources/Images/NA/dummy_image_female.jpg" class="img-circle" width="43" height="43"/ > </div>';
                }
            }
            dashboarddata += '<div class="col-xs-7 col-sm-12 col-md-3  col-lg-3  clsDetails">';
            dashboarddata += '<p><span class="results_label">Name</span><span class="result_text">' + result.DashBoardData[i].BuddyName + '</span></p>';
            dashboarddata += '<p><span class="results_label">ID</span><span id="dashboardUserId">' + result.DashBoardData[i].BuddyId + '</span></p>';
            dashboarddata += '</div>';
            dashboarddata += '<div class="col-xs-12 col-sm-12 col-md-3  col-lg-4 clsDetails liner_txt">';
            dashboarddata += '<p><span class="results_label">Title</span><span class="result_text">' + result.DashBoardData[i].Designation + '</span></p>';
            dashboarddata += '</div>';
            dashboarddata += '<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3  liner_txt">';
            dashboarddata += '<p>';
            dashboarddata += '<input type="button" class="btn_orange connections_btn btn_alignment" id="dashboardConnection' + i + '" value="Connections"/>';
            dashboarddata += '<input type="button" class="btn_grey feedback_btn_1" id="dashboardFeedback' + i + '" value="Feedback"/>';
            dashboarddata += '</p>';
            dashboarddata += '</div>';
            dashboarddata += '</div>';
            dashboarddata += '</div>';
        }
        $('#DashBoardData').append(dashboarddata);
        //  $('.selectpicker').selectpicker('deselectAll');
        //  $('.filter-option').text('All');
        $('.view_select_box .filter-option').text('Advisor');

        $('.connections_btn').click(function () {
            $('.wrapper').prepend('<div class="overlay"></div>');
            $('.wrapper').addClass('overflowhid');
            var dashboardUserId = $(this).parents('div .results_content').find('#dashboardUserId')[0].innerHTML;
            GetDashboardConnectionsofUser(dashboardUserId);
            // $('#connections').show();
        });

        $('.feedback_btn_1').click(function () {
            $("#feedback").modal('show');
            $("#feedback li").unbind('click');
            var dashboardUserId = $(this).parents('div .results_content').find('#dashboardUserId')[0].innerHTML;
            var ReviewType = 'TM';
            GetFeedbackQuestions(dashboardUserId, ReviewType);
        });
    }
    else {
        $('#DashBoardData').append('<label>No data found</label>');
    }
}

//============================================== Dashboard Data for New Hire ========================================
function GetDashBoardData() {
    var val;
    var bu;
    if (document.getElementById("DashboardBU").value != "All") {
        bu = document.getElementById("DashboardBU").value;
    }
    else {
        bu = "All";
    }
    var type = $('#view_select').val();
    if (type == "0")
        val = false;
    else
        val = true;

    //298015 - Country dropdown
    var CountryId = $("#DashboardLoc").val();
    if (CountryId == '' || CountryId == 'undefined' || CountryId == null || CountryId == 'All') {
        CountryId = '0'; //0- stands for Country All
    }

    $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/GetDashBoardData',
        contentType: 'application/json',
        data: "{bU:'" + bu + "',chk:'" + val + "', countryId:'" + CountryId + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            OnSuccessGetDashBoardData(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            //OnErrorGetDashBoardData(xhr.status, thrownError);
        }
    });
    //    return true;
}
function OnSuccessGetDashBoardData(result) {
    var result = eval('(' + result.d + ')');
    var a = result.DashBoardData.length;
    var dashboarddata = "";
    //buddy.DashBoardData[0]
    $('#DashBoardData').html('');
    if (a > 0) {
        for (var i = 0; i < a; i++) {
            dashboarddata += '<div class="row">';
            dashboarddata += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content" >';
            //  dashboarddata += '<div class="profile_pic"> <img src="../../Resources/Images/NA/associate_image_img.png" class="img-circle" width="43" height="43"/ > </div>';
            var request = new XMLHttpRequest;
            request.open('GET', "../../Pages/NA/ShowImage.ashx?id=" + result.DashBoardData[i].BuddyId + "", false);
            request.send();
            if (request.status === 200) {
                dashboarddata += '<div class="profile_pic"> <img src="../../Pages/NA/ShowImage.ashx?id=' + result.DashBoardData[i].BuddyId + '" class="img-circle" width="43" height="43"/ > </div>';
            }
            else {
                if (Gender.value == 'M') {
                    dashboarddata += '<div class="profile_pic"> <img src="../../Resources/Images/NA/dummy_image_male.jpg" class="img-circle" width="43" height="43"/ > </div>';
                }
                else {
                    dashboarddata += '<div class="profile_pic"> <img src="../../Resources/Images/NA/dummy_image_female.jpg" class="img-circle" width="43" height="43"/ > </div>';
                }
            }
            dashboarddata += '<div class="col-xs-7 col-sm-12 col-md-3  col-lg-3  clsDetails">';
            dashboarddata += '<p><span class="results_label">Name</span><span class="result_text">' + result.DashBoardData[i].BuddyName + '</span></p>';
            dashboarddata += '<p><span class="results_label">ID</span><span id="dashboardUserId">' + result.DashBoardData[i].BuddyId + '</span></p>';
            dashboarddata += '</div>';
            dashboarddata += '<div class="col-xs-12 col-sm-12 col-md-3  col-lg-4 clsDetails liner_txt">';
            dashboarddata += '<p><span class="results_label">Title</span><span class="result_text">' + result.DashBoardData[i].Designation + '</span></p>';
            dashboarddata += '</div>';
            dashboarddata += '<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3  liner_txt">';
            dashboarddata += '<p>';
            dashboarddata += '<input type="button" class="btn_orange connections_btn btn_alignment" id="dashboardConnection' + i + '" value="Connections"/>';
            dashboarddata += '<input type="button" class="btn_grey feedback_btn_1" id="dashboardFeedback' + i + '" value="Feedback"/>';
            dashboarddata += '</p>';
            dashboarddata += '</div>';
            dashboarddata += '</div>';
            dashboarddata += '</div>';
        }
        $('#DashBoardData').append(dashboarddata);

        $('.connections_btn').click(function () {
            $('.wrapper').prepend('<div class="overlay"></div>');
            $('.wrapper').addClass('overflowhid');
            var dashboardUserId = $(this).parents('div .results_content').find('#dashboardUserId')[0].innerHTML;
            GetDashboardConnectionsofUser(dashboardUserId);
            // $('#connections').show();
        });

        $('.feedback_btn_1').click(function () {
            $("#feedback").modal('show');
            $("#feedback li").unbind('click');
            var dashboardUserId = $(this).parents('div .results_content').find('#dashboardUserId')[0].innerHTML;
            var ReviewType = 'TM';
            GetFeedbackQuestions(dashboardUserId, ReviewType);
        });
    }
    else {
        $('#DashBoardData').append('<label>No data found</label>');
    }
    if ($('#view_select').val() == 0) {
        $('.feedback_btn_1').hide();
        $('.btn_alignment').addClass('btn_alignment_alt');
    }
    if ($('#view_select').val() == 1) {
        $('.feedback_btn_1').show();
        $('.btn_alignment').removeClass('btn_alignment_alt');
    }

}

//============================================================Export To Excel====================================================
function GetExcelData() {
    //298015 - Country dropdown
    var CountryId = $("#DashboardLoc").val();
    $("#hiddenCountryId").val(CountryId);
    if (CountryId == '' || CountryId == 'undefined' || CountryId == null || CountryId == 'All') {
        CountryId = '0'; //0- stands for Country All
    }
    $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/GetExcelData',
        contentType: 'application/json',
        data: "{}",
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

//==============================================  GetDashboard ConnectionsofUser ForAdvisors ===========================================
function GetDashboardConnectionsofUser(dashboardUserId) {
    var type = $('#view_select').val();
    if (type == "0")
        val = false;
    else
        val = true;
    var JoineeId = dashboardUserId;
    $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/GetDashboardConnectionsofUser',
        contentType: 'application/json',
        data: "{datauserid:'" + JoineeId + "',chk:'" + val + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            OnSuccessGetDashboardConnectionsofUser(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            // OnErrorGetDashboardConnectionsofUser(xhr.status, thrownError);

        }
    });
}

function OnSuccessGetDashboardConnectionsofUser(result) {
    var buddy = eval('(' + result.d + ')');

    var Connectionlist = '';
    var a = buddy.DashBoardData.length;

    $('.assmagslider').html('');
    if (a == 0) {
        $('.assmagslider').append('<label style="color:#999999">No active connections found for this user!</label>');
    }
    if (a > 0) {
        for (var i = 0; i < a; i++) {
            var request = new XMLHttpRequest;
            request.open('GET', "../../Pages/NA/ShowImage.ashx?id=" + buddy.DashBoardData[i].BuddyId + "", false);
            request.send();
            if (request.status === 200) {
                Connectionlist += '<li class="col-xs-12 col-sm-2 col-md-2 col-lg-2 srules"><img  src="../../Pages/NA/ShowImage.ashx?id=' + result.DashBoardData[i].BuddyId + '" alt=""/>';
            }
            else {
                if (Gender.value == 'M') {
                    Connectionlist += '<li class="col-xs-12 col-sm-2 col-md-2 col-lg-2 srules"><img  src="../../Resources/Images/NA/dummy_image_male.jpg" alt=""/>';
                }
                else {
                    Connectionlist += '<li class="col-xs-12 col-sm-2 col-md-2 col-lg-2 srules"><img  src="../../Resources/Images/NA/dummy_image_female.jpg" alt=""/>';
                }
            }
            //  Connectionlist += '<li class="col-xs-12 col-sm-2 col-md-2 col-lg-2 srules"><img  src="../../Resources/Images/NA/connections_image1.png" alt=""/>';
            var UserName = buddy.DashBoardData[i].BuddyName.length < 25 ? (buddy.DashBoardData[i].BuddyName) : (buddy.DashBoardData[i].BuddyName.substring(0, 25) + '...');
            Connectionlist += '<p class="pro_name">' + UserName + '</p>';
            Connectionlist += '<p>' + buddy.DashBoardData[i].Designation + '</p>';
            Connectionlist += '<p>From ' + buddy.DashBoardData[i].ConnectionStartDate + ' </p>';
            Connectionlist += '<p>To ' + buddy.DashBoardData[i].ConnectionEndDate + '</p></li>';
        }
    }
    $('.assmagslider').append(Connectionlist);
    /* Vertical Carousel */
    var countList = 3;
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
    $('#connections').show();

}
//============================================================ Get Admin List ==========================================================
function GetAdminList() {
    $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/ShowingAdmin',
        contentType: 'application/json',
        data: "{}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            GetAdminListonsubmitsuccess(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            // OnErrorGetDashboardConnectionsofUser(xhr.status, thrownError);

        }
    });

    $("#add_admin").autocomplete({
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
        select: function (event, ui) {
            $("#add_admin").val(ui.item.value);
            // AdvisorId = ui.item.value;
            return false;
        }
    });
}

function GetAdminListonsubmitsuccess(result) {
    var Admins;
    Admins = eval('(' + result.d + ')');
    if (Admins != null) {
        var AdminView = '';
        $('.admin_results_wrapper').html('');
        for (var i = 0; i < Admins.length; i++) {

            AdminView += '<div class="row">';
            AdminView += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content">';
            var request = new XMLHttpRequest;
            request.open('GET', "ShowImage.ashx?id=" + Admins[i].UserId + "", false);
            request.send();
            if (request.status === 200) {
                AdminView += '<div class="profile_pic"> <img src="../../Pages/NA/ShowImage.ashx?id=' + Admins[i].UserId + '" class="img-circle" width="43" height="43"/ > </div>';
            }
            else {
                AdminView += '<div class="profile_pic"> <img src="../../Resources/Images/NA/dummy_image.jpg" class="img-circle" width="43" height="43"/ > </div>';
            }
            AdminView += '<div class="col-xs-8 col-sm-4 col-md-4 col-lg-4 clsDetails">';
            AdminView += '<p><span class="results_label">Name</span><span class="result_text">' + Admins[i].UserName + '</span></p>';
            AdminView += '<p><span class="results_label">ID</span><span id="adminid' + i + '" class="removeadmin">' + Admins[i].UserId + '</span></p>';
            AdminView += '</div>';
            AdminView += '<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 clsDetails">';
            AdminView += '<p><span class="results_label">Title</span><span class="result_text">' + Admins[i].Designation + '</span></p>';
            AdminView += '</div>';
            AdminView += '<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_remove">';
            AdminView += '<span><input class="btn_grey clsRemove_access" id="remove_access" value="Remove access" type="button"></span>';
            AdminView += '</div>';
            AdminView += '</div>';
            AdminView += '</div>';
        }
        $('.admin_results_wrapper').append(AdminView);

        $('.clsRemove_access').click(function () {
            $('.wrapper').prepend('<div class="overlay"></div>');
            $('.wrapper').addClass('overflowhid');
            $('#Popup1_remove').show();
            $(this).addClass('remove');
            RemoveAdmin = $(this).parents('div .results_content').find('.removeadmin')[0].innerHTML;
        });
    }
}
//===================================================== Add Admin /Validate Admin =======================================================
function ValidateAdmin() {
    var AdminID = $("#add_admin").val();
    if (isNaN(AdminID) || AdminID == '' || AdminID.length != 6) {
        $('.wrapper').prepend('<div class="overlay"></div>');
        $('.wrapper').addClass('overflowhid');
        $('#Popup_empty_add').show();
        $('#add_admin').val("Enter Associate ID/Name");
        return 0;
    }
    else {
        var a = $(".admin_results_wrapper").children.length;
        if (a == 2) {
            var AdminID = $("#add_admin").val();
            for (var i = 0; i < $(".admin_results_wrapper")[0].children.length; i++) {
                var id = ($('#adminid' + i + '')[0].innerHTML).replace(/\s/g, '');
                if (AdminID == id) {
                    $('.wrapper').prepend('<div class="overlay"></div>');
                    $('.wrapper').addClass('overflowhid');
                    $('#Popup2_send').show();
                    $("#message").html('');
                    $("#message").append("This user already has admin rights.");
                    $('#add_admin').val('Enter Associate ID/Name');
                    return 0;
                }
            }
        }
        AddAdmin();
    }
}

function AddAdmin() {
    var niadminid = $("#add_admin").val();
    var CurrentUserId = $('#CurrentUserId').val();
    if (niadminid == CurrentUserId) {
        $('.wrapper').prepend('<div class="overlay"></div>');
        $('.wrapper').addClass('overflowhid');
        $('#Popup2_send').show();
        $("#message").html('');
        $("#message").append("You already have MasterAdmin rights.");
        $('#add_admin').val('Enter Associate ID/Name');
    }
    else if (niadminid != null || niadminid != '' || !(NaN(niadminid))) {
        $.ajax({
            type: 'POST',
            url: $('body').attr('id') + '.aspx/AddingAdmin',
            contentType: 'application/json',
            data: "{associate_ID:'" + niadminid + "'}",
            dataType: 'json',
            processData: false,
            success: function (response) {
                $('.wrapper').prepend('<div class="overlay"></div>');
                $('.wrapper').addClass('overflowhid');
                $('#Popup2_send').show();
                $("#message").html('');
                $("#message").append("You have successfully added Admin!");
                $('#add_admin').val('Enter Associate ID/Name');
                GetAdminList();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $('.wrapper').prepend('<div class="overlay"></div>');
                $('.wrapper').addClass('overflowhid');
                $('#Popup2_send').show();
                $("#message").html('');
                $("#message").append("Oops something went wrong please try after some time");
                $('#add_admin').val('Enter Associate ID/Name');
            }
        });
    }
    else {
        $('.wrapper').prepend('<div class="overlay"></div>');
        $('.wrapper').addClass('overflowhid');
        $('#Popup2_send').show();
        $("#message").html('');
        $("#message").append("Oops something went wrong please try after some time");
        $('#add_admin').val('Enter Associate ID/Name');
    }
}

//========================================================= Remove Admin =============================================================
function RemovingAdmin(AdminId) {
    $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/RemovingAdmin',
        contentType: 'application/json',
        data: "{associate_ID:'" + AdminId + "'}",
        dataType: 'json',
        processData: false,
        success: function (response) {
            $('.wrapper').prepend('<div class="overlay"></div>');
            $('.wrapper').addClass('overflowhid');
            $('#Popup2_send').show();
            $("#message").html('');
            $("#message").append("You have successfully removed Admin!");
            $('#add_admin').val('Enter Associate ID/Name');
            GetAdminList();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $('.wrapper').prepend('<div class="overlay"></div>');
            $('.wrapper').addClass('overflowhid');
            $('#Popup2_send').show();
            $("#message").html('');
            $("#message").append("Oops something went wrong please try after some time");
            $('#add_admin').val('Enter Associate ID/Name');
        }
    });
}

//============================================ Supervisor functions ===========================================================================

//============================================ Get Recommendation New Hire data ==============================================
var searchRecommendableJoineesList = [];
function GetRecommendableJoinees() {
    $('#inpt_IDname_associate').val('Search');
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
            // onerrorGetRecommendableJoinees(xhr.status, thrownError);
        }
    });
}

function onsuccessGetRecommendableJoinees(result) {
    RecommendableJoinees = eval('(' + result.d + ')');
    // RecommendableFilterJoinees = eval('(' + result.d + ')');

    if (RecommendableJoinees.JoineeList != null) {
        var length = RecommendableJoinees.JoineeList.length;
        var list = '';
        $('.pending_req_set').html('');
        if (length > 0) {
            for (var i = 0; i < length; i++) {
                list += '<div class="row">';
                list += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content">';
                var request = new XMLHttpRequest;
                request.open('GET', "ShowImage.ashx?id=" + RecommendableJoinees.JoineeList[i].UserId + "", false);
                request.send();
                if (request.status === 200) {
                    list += '<div class="profile_pic"> <img src="../../Pages/NA/ShowImage.ashx?id=' + RecommendableJoinees.JoineeList[i].UserId + '" class="img-circle" width="43" height="43"/ > </div>';
                }
                else {
                    list += '<div class="profile_pic"> <img src="../../Resources/Images/NA/dummy_image.jpg" class="img-circle" width="43" height="43"/ > </div>';
                }
                list += '<div class="col-xs-9 col-sm-4 col-md-4 col-lg-4 clsDetails">';
                list += '<p><span class="results_label">Name</span><span class="result_text name_txt">' + RecommendableJoinees.JoineeList[i].DisplayName + '</span></p>';
                var JoineeId = RecommendableJoinees.JoineeList[i].UserId.replace(/\s+/g, '');
                list += '<p><span class="results_label">ID</span><span id="JoineeId">' + JoineeId + '</span></p>';
                list += '</div>';
                list += '<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 clsDetails">';
                list += '<p><span class="results_label">Title</span><span class="result_text">' + RecommendableJoinees.JoineeList[i].Designation + '</span></p>';
                list += '</div>';
                list += '<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_remove text-center"> <span>';
                list += '<input class="btn_orange assign_advisor" id="" value="Assign an Advisor" type="button">';
                list += '</span> </div>';
                list += '</div>';
                list += '</div>';
            }
            $('.pending_req_set').append(list);

            $('.assign_advisor').click(function () {
                PendingRequestJioneeId = $(this).parents('div .results_content').find('#JoineeId')[0].innerHTML;
                GetRecommendableAdvisors(PendingRequestJioneeId);
                $('#inpt_IDname_advisors').val('Enter ID/Name');
            });

            searchRecommendableJoineesList.splice(0, searchRecommendableJoineesList.length);
            if (RecommendableJoinees.JoineeList != null) {
                for (i = 0; i < RecommendableJoinees.JoineeList.length; i++) {
                    searchRecommendableJoineesList.push({ value: RecommendableJoinees.JoineeList[i].UserId.replace(/\s+/g, ''), disp: RecommendableJoinees.JoineeList[i].DisplayName, label: RecommendableJoinees.JoineeList[i].UserId.replace(/\s+/g, '') + " " + RecommendableJoinees.JoineeList[i].DisplayName, desc: RecommendableJoinees.JoineeList[i].UserName });
                }
            }
        }
    }
    else {
        $('.pending_req_set').append('<span class="no_result">No result to Display</span>');
    }
}
//======================================================  GetRecommendable FilterJoinees ============================================
function GetRecommendableFilterJoinees(JoineeId) {
    var i = 0;
    var j = 0;
    var obj = {};
    var RecommendableFilterJoinees = RecommendableJoinees;
    obj.JoineeList = [];
    for (i = 0; i < RecommendableFilterJoinees.JoineeList.length; i++) {
        if (RecommendableFilterJoinees.JoineeList[i].UserId.replace(/\s+/g, '') == JoineeId) {
            obj.JoineeList[j] = {};
            obj.JoineeList[j] = RecommendableFilterJoinees.JoineeList[i];
            j++;
        }
    }
    RecommendableFilterJoinees = obj.JoineeList;

    $('.pending_req_set').html('');
    var list = '';
    list += '<div class="row">';
    list += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content">';
    var request = new XMLHttpRequest;
    request.open('GET', "ShowImage.ashx?id=" + RecommendableFilterJoinees[0].UserId + "", false);
    request.send();
    if (request.status === 200) {
        list += '<div class="profile_pic"> <img src="../../Pages/NA/ShowImage.ashx?id=' + RecommendableFilterJoinees[0].UserId + '" class="img-circle" width="43" height="43"/ > </div>';
    }
    else {
        list += '<div class="profile_pic"> <img src="../../Resources/Images/NA/dummy_image.jpg" class="img-circle" width="43" height="43"/ > </div>';
    }
    list += '<div class="col-xs-9 col-sm-4 col-md-4 col-lg-4 clsDetails">';
    list += '<p><span class="results_label">Name</span><span class="result_text name_txt">' + RecommendableFilterJoinees[0].DisplayName + '</span></p>';
    var JoineeId = RecommendableFilterJoinees[0].UserId.replace(/\s+/g, '');
    list += '<p><span class="results_label">ID</span><span id="JoineeId">' + JoineeId + '</span></p>';
    list += '</div>';
    list += '<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 clsDetails">';
    list += '<p><span class="results_label">Title</span><span class="result_text">' + RecommendableFilterJoinees[0].Designation + '</span></p>';
    list += '</div>';
    list += '<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_remove text-center"> <span>';
    list += '<input class="btn_orange assign_advisor" id="" value="Assign an Advisor" type="button">';
    list += '</span> </div>';
    list += '</div>';
    list += '</div>';

    $('.pending_req_set').append(list);

    $('.assign_advisor').click(function () {
        PendingRequestJioneeId = $(this).parents('div .results_content').find('#JoineeId')[0].innerHTML;
        GetRecommendableAdvisors(PendingRequestJioneeId);
        $('#inpt_IDname_advisors').val('Enter ID/Name');
    });
}
//====================================================== Assign An Advisor =============================================================
var searchRecommendableAdvisorsList = [];
function GetRecommendableAdvisors(JoineeId) {

    $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/GetRecommendableAdvisors',
        contentType: 'application/json',
        data: "{joineeId:'" + JoineeId + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            onsuccessGetRecommendableAdvisors(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            //onerrorGetRecommendableJoinees(xhr.status, thrownError);
        }
    });
}

function onsuccessGetRecommendableAdvisors(result) {
    RecommendableAdvisors = eval('(' + result.d + ')');
    var length = RecommendableAdvisors.JoineeList.length;
    checklimit = RecommendableAdvisors.BuddyList[0].ConnectionsOfJoiners;
    var list = '';
    $('.advisor_assign_popup_content').html('');
    $('#RecommendNote').html('');
    $('#RecommendNote').append('*Select No more than ' + checklimit + ' Advisors');
    $("#advisorAssign").modal('show');
    if (length > 0) {
        for (var i = 0; i < length; i++) {
            list += '<div class="row">';
            list += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content">';
            list += '<div class="col-xs-4 col-sm-3 col-md-2 col-lg-2 cls_icon_align">';
            list += '<input type="checkbox" class="chkbox"/>';
            var request = new XMLHttpRequest;
            request.open('GET', "ShowImage.ashx?id=" + RecommendableAdvisors.JoineeList[i].UserId + "", false);
            request.send();
            if (request.status === 200) {
                list += '<div class="profile_pic"> <img src="../../Pages/NA/ShowImage.ashx?id=' + RecommendableAdvisors.JoineeList[i].UserId + '" class="img-circle" width="43" height="43"/ > </div></div>';
            }
            else {
                list += '<div class="profile_pic"> <img src="../../Resources/Images/NA/dummy_image.jpg" class="img-circle" width="43" height="43"/ > </div></div>';
            }
            // list += '<div class="profile_pic"> <img src="../../Resources/Images/NA/associate_image_img.png" class="img-circle" width="43" height="43"/ > </div> </div>';
            list += '<div class="col-xs-8 col-sm-5 col-md-5 col-lg-5 clsDetails">';
            list += '<p><span class="results_label">Name</span><span class="result_text">' + RecommendableAdvisors.JoineeList[i].DisplayName + '</span></p>';
            var JoineeId = RecommendableAdvisors.JoineeList[i].UserId.replace(/\s+/g, '');
            list += '<p><span class="results_label">ID</span><span id="RecommendableAdvisor">' + JoineeId + '</span></p>';
            list += '</div>';
            list += '<div class="col-xs-8 col-sm-5 col-md-5 col-lg-5  clsDetails">';
            list += '<p><span class="results_label">Title</span><span class="result_text">' + RecommendableAdvisors.JoineeList[i].Designation + '</span></p>';
            list += '</div>';
            list += '</div>';
            list += '</div>';
        }
        $('.advisor_assign_popup_content').append(list);
        $('.recommend_content').html('');

        searchRecommendableAdvisorsList.splice(0, searchRecommendableAdvisorsList.length);
        if (RecommendableAdvisors.JoineeList != null) {
            for (i = 0; i < RecommendableAdvisors.JoineeList.length; i++) {
                searchRecommendableAdvisorsList.push({ value: RecommendableAdvisors.JoineeList[i].UserId.replace(/\s+/g, ''), disp: RecommendableAdvisors.JoineeList[i].DisplayName, label: RecommendableAdvisors.JoineeList[i].UserId.replace(/\s+/g, '') + " " + RecommendableAdvisors.JoineeList[i].DisplayName, desc: RecommendableAdvisors.JoineeList[i].UserName });
            }
        }
    }

}
//========================================================= GetRecommendable Filter Advisors ====================================
function GetRecommendableFilterAdvisor(AdvisorId) {
    var i = 0;
    var j = 0;
    var obj = {};
    var RecommendableFilterJoinees = RecommendableAdvisors;
    obj.JoineeList = [];
    for (i = 0; i < RecommendableFilterJoinees.JoineeList.length; i++) {
        if (RecommendableFilterJoinees.JoineeList[i].UserId.replace(/\s+/g, '') == AdvisorId) {
            obj.JoineeList[j] = {};
            obj.JoineeList[j] = RecommendableFilterJoinees.JoineeList[i];
            j++;
        }
    }
    RecommendableFilterJoinees = obj.JoineeList;
    var list = '';
    $('.advisor_assign_popup_content').html('');
    list += '<div class="row">';
    list += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content">';
    list += '<div class="col-xs-4 col-sm-3 col-md-2 col-lg-2 cls_icon_align">';
    list += '<input type="checkbox" class="chkbox"/>';
    var request = new XMLHttpRequest;
    request.open('GET', "ShowImage.ashx?id=" + RecommendableFilterJoinees[0].UserId + "", false);
    request.send();
    if (request.status === 200) {
        list += '<div class="profile_pic"> <img src="../../Pages/NA/ShowImage.ashx?id=' + RecommendableFilterJoinees[0].UserId + '" class="img-circle" width="43" height="43"/ > </div></div>';
    }
    else {
        list += '<div class="profile_pic"> <img src="../../Resources/Images/NA/dummy_image.jpg" class="img-circle" width="43" height="43"/ > </div></div>';
    }
    // list += '<div class="profile_pic"> <img src="../../Resources/Images/NA/associate_image_img.png" class="img-circle" width="43" height="43"/ > </div> </div>';
    list += '<div class="col-xs-8 col-sm-5 col-md-5 col-lg-5 clsDetails">';
    list += '<p><span class="results_label">Name</span><span class="result_text">' + RecommendableFilterJoinees[0].DisplayName + '</span></p>';
    var JoineeId = RecommendableFilterJoinees[0].UserId.replace(/\s+/g, '');
    list += '<p><span class="results_label">ID</span><span id="RecommendableAdvisor">' + JoineeId + '</span></p>';
    list += '</div>';
    list += '<div class="col-xs-8 col-sm-5 col-md-5 col-lg-5  clsDetails">';
    list += '<p><span class="results_label">Title</span><span class="result_text">' + RecommendableFilterJoinees[0].Designation + '</span></p>';
    list += '</div>';
    list += '</div>';
    list += '</div>';
    $('.advisor_assign_popup_content').append(list);
}

//============================================CheckConnectionRequestAdmin Supervisor============================================
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

//=========================================== Supervisor Send connection request onbehalf of joinee ==================================
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

//=============================================  Recommend an associate to enroll as an Advisor ==============================================
var searchUnEnrolledAdvisorsList = [];
function GetUnenrolledBuddies() {
    var SupervisorId = $('#CurrentUserId').val();
    $('#inpt_IDname_associate_rec').val('Search')
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
    UnenrolledBuddies = eval('(' + result.d + ')');

    $('#RecommendAdvisortoEnroll').html('');
    var list = '';
    notifyAdvisor = '';
    if (UnenrolledBuddies.BuddyList != null) {
        for (var i = 0; i < UnenrolledBuddies.BuddyList.length; i++) {
            notifyAdvisor += UnenrolledBuddies.BuddyList[i].UserId +',';
            list += '<div class="row">';
            list += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content">';
            list += '<div class="col-xs-3 col-sm-1 col-md-2 col-lg-2 cls_icon_align">';
            var request = new XMLHttpRequest;
            request.open('GET', "ShowImage.ashx?id=" + UnenrolledBuddies.BuddyList[i].UserId + "", false);
            request.send();
            if (request.status === 200) {
                list += '<div class="profile_pic"> <img src="../../Pages/NA/ShowImage.ashx?id=' + UnenrolledBuddies.BuddyList[i].UserId + '" class="img-circle" width="43" height="43"/ > </div></div>';
            }
            else {
                list += '<div class="profile_pic"> <img src="../../Resources/Images/NA/dummy_image.jpg" class="img-circle" width="43" height="43"/ > </div></div>';
            }
            list += '<div class="col-xs-8 col-sm-4 col-md-3 col-lg-3 clsDetails">';
            list += '<p><span class="results_label">Name</span><span class="result_text">' + UnenrolledBuddies.BuddyList[i].UserName + '</span></p>';
            list += '<p><span class="results_label">ID</span><span id="unerolledId">' + UnenrolledBuddies.BuddyList[i].UserId + '</span></p>';
            list += '</div>';
            list += '<div class="col-xs-8 col-sm-4 col-md-4 col-lg-4 clsDetails">';
            list += '<p><span class="results_label">Title</span><span class="result_text">' + UnenrolledBuddies.BuddyList[i].Designation + '</span></p>';
            list += '</div>';
            list += '<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_remove text-center"> <span>';
            list += '<input class="btn_orange notify_btn" id="" value="Notify" type="button">';
            list += '</span> </div>';
            list += '</div>';
            list += '</div>';
        }
    }
    $('#RecommendAdvisortoEnroll').append(list);

    $('.notify_btn').click(function () {
        $('.wrapper').prepend('<div class="overlay"></div>');
        $('.wrapper').addClass('overflowhid');
        $('#notify_associate').show();
        unerolledAd = $(this).parents('div .results_content').find('#unerolledId')[0].innerHTML;
        var RequestType = "";
        SendNotificationMail(unerolledAd, RequestType);
    });

    searchUnEnrolledAdvisorsList.splice(0, searchUnEnrolledAdvisorsList.length);
    if (UnenrolledBuddies.BuddyList != null) {
        for (i = 0; i < UnenrolledBuddies.BuddyList.length; i++) {
            searchUnEnrolledAdvisorsList.push({ value: UnenrolledBuddies.BuddyList[i].UserId.replace(/\s+/g, ''), disp: UnenrolledBuddies.BuddyList[i].DisplayName, label: UnenrolledBuddies.BuddyList[i].UserId.replace(/\s+/g, '') + " " + UnenrolledBuddies.BuddyList[i].DisplayName, desc: UnenrolledBuddies.BuddyList[i].UserName });
        }
    }
}

//================================================ Filtered Recommend an associate to enroll as an Advisor ==========================================
function GetUnenrolledFilterBuddies(UnerolledAdvisorId) {
    var i = 0;
    var j = 0;
    var obj = {};
    var RecommendableFilterJoinees = UnenrolledBuddies;
    obj.JoineeList = [];
    for (i = 0; i < RecommendableFilterJoinees.BuddyList.length; i++) {
        if (RecommendableFilterJoinees.BuddyList[i].UserId.replace(/\s+/g, '') == UnerolledAdvisorId) {
            obj.JoineeList[j] = {};
            obj.JoineeList[j] = RecommendableFilterJoinees.BuddyList[i];
            j++;
        }
    }
    RecommendableFilterJoinees = obj.JoineeList; var list = '';
    list += '<div class="row">';
    list += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content">';
    list += '<div class="col-xs-3 col-sm-1 col-md-2 col-lg-2 cls_icon_align">';
    var request = new XMLHttpRequest;
    request.open('GET', "ShowImage.ashx?id=" + RecommendableFilterJoinees[0].UserId + "", false);
    request.send();
    if (request.status === 200) {
        list += '<div class="profile_pic"> <img src="../../Pages/NA/ShowImage.ashx?id=' + RecommendableFilterJoinees[0].UserId + '" class="img-circle" width="43" height="43"/ > </div></div>';
    }
    else {
        list += '<div class="profile_pic"> <img src="../../Resources/Images/NA/dummy_image.jpg" class="img-circle" width="43" height="43"/ > </div></div>';
    }
    list += '<div class="col-xs-8 col-sm-4 col-md-3 col-lg-3 clsDetails">';
    list += '<p><span class="results_label">Name</span><span class="result_text">' + RecommendableFilterJoinees[0].UserName + '</span></p>';
    list += '<p><span class="results_label">ID</span><span>' + RecommendableFilterJoinees[0].UserId + '</span></p>';
    list += '</div>';
    list += '<div class="col-xs-8 col-sm-4 col-md-4 col-lg-4 clsDetails">';
    list += '<p><span class="results_label">Title</span><span class="result_text">' + RecommendableFilterJoinees[0].Designation + '</span></p>';
    list += '</div>';
    list += '<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_remove text-center"> <span>';
    list += '<input class="btn_orange notify_btn" id="" value="Notify" type="button">';
    list += '</span> </div>';
    list += '</div>';
    list += '</div>';

    $('#RecommendAdvisortoEnroll').html(list);

    $('.notify_btn').click(function () {
        $('.wrapper').prepend('<div class="overlay"></div>');
        $('.wrapper').addClass('overflowhid');
        $('#notify_associate').show();
        unerolledAd = $(this).parents('div .results_content').find('#unerolledId')[0].innerHTML;
        var RequestType = "";
        SendNotificationMail(unerolledAd, RequestType);
    });
}

//=============================================== Send Notification Mail =======================================================
function SendNotificationMail(AdvisorId, RequestType) {
    var SupervisorId = $('#CurrentUserId').val();
           $.ajax({
        type: 'POST',
        url: $('body').attr('id') + '.aspx/SendNotificationMail',
        contentType: 'application/json',
        data: "{supervisorId:'" + SupervisorId + "',advisorId:'" + AdvisorId + "',requestType:'" + RequestType + "'}",
        dataType: 'json',
        processData: false,

        success: function (response) {
            $('.wrapper').prepend('<div class="overlay"></div>');
            $('.wrapper').addClass('overflowhid');
            $('#submit_configure').show();
        },
        error: function (xhr, ajaxOptions, thrownError) {
          //  onerrorGetUnenrolledBuddies(xhr.status, thrownError);
        }
    });

}
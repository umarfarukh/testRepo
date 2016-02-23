$(document).ready(function () {

    //Sliding
    $('.more_icon').click(function () {
        $("#panel").slideToggle("slow");
    });


    //navigation by div
    //slide 20
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
        $('#popup_volunteer').hide();
        $('#Popup2_send').show();
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
        $('#clsSlide20Home_content').hide();
        $('#clsSlide22Home_content').show();
    });
    $('.popup_close').click(function () {
        $('#Popup2_send').hide();
        $('.wrapper').removeClass('overflowhid');
        $('.overlay').hide();
    });


    //slide 22
    $(".pending_req").click(function () {
        $("#clsSlide22Home_content").hide();
        $("#clsRequest_content").show();
        $('.menu_list_header ul').find('.selected').removeClass('selected');
        $('.menu_list_header ul li:nth-child(5)').addClass('selected');

        $('.menu_list ul').find('.selected').removeClass('selected');
        $('.menu_list ul li:nth-child(5)').addClass('selected');
    });


    //slide 23
    //confirm 
    $('.clsAccept').click(function () {
        $('#accept_request').show();
        $('.wrapper').prepend('<div class="overlay"></div>');
        $('.wrapper').addClass('overflowhid');
        $(this).addClass('accept_clicked')
    });
    $('#accept_req').click(function () {
        $('.accept_clicked').attr('disabled', 'disabled');
        $('#accept_request').hide();
        $('.overlay').hide();
    });
    $('#reject_req').click(function () {
        $('.accept_clicked').removeClass('accept_clicked');
        $('#accept_request').hide();
        $('.overlay').hide();
    });



    //Slide26
    //1 NewHire Info
    $(".role_advisor").click(function () {
        $("#clsSlide26Home_content").hide();
        $("#role_advisor_content").show();
        $('.menu_list_header ul').find('.selected').removeClass('selected');
        $('.menu_list_header ul li:nth-child(1)').addClass('selected');

        $('.menu_list ul').find('.selected').removeClass('selected');
        $('.menu_list ul li:nth-child(1)').addClass('selected');
    });


    //3 ViewConnectn
    $(".view_connections").click(function () {
        $("#clsSlide26Home_content").hide();
        $("#clsReq27_content").show();
        $('.menu_list_header ul').find('.selected').removeClass('selected');
        $('.menu_list_header ul li:nth-child(5)').addClass('selected');

        $('.menu_list ul').find('.selected').removeClass('selected');
        $('.menu_list ul li:nth-child(5)').addClass('selected');
    });


    //Review Feedback
    $('.clsReview').click(function () {
        $("#feedback").modal('show');
        GetFeedbackQuestions();
    });

    $('.close_popup,#feedback .popup_close').click(function () {
        $('.modal-backdrop').remove();
        $('.modal').removeClass('in')
        GetFeedbackQuestions();

    });

    // 4 history_details
    $(".history_details").click(function () {
        $('#clsAlert_content').show();
        $("#clsSlide26Home_content").hide();
        $("#clsReq27_content").hide();
        $('.menu_list_header ul').find('.selected').removeClass('selected');
        $('.menu_list_header ul li:nth-child(6)').addClass('selected');

        $('.menu_list ul').find('.selected').removeClass('selected');
        $('.menu_list ul li:nth-child(6)').addClass('selected');
        GetBuddyAlerts();

    });


    //navigation by icons
    //whole nav by icons
    //Page navigation by icons (desktop and tab )
    $('.menu_list_header ul li a').click(function (ev) {
        $('.menu_list_header ul li').removeClass('selected');
        $(ev.currentTarget).parent('li').addClass('selected');
    });
    $(".home_icon").click(function () {
        $("#clsSlide26Home_content").show();
        $("#clsReq27_content").hide();
        $("#role_advisor_content").hide();
        $('#clsAlert_content').hide();
    });
    $(".request_icon").click(function () {
        $("#clsSlide26Home_content").hide();
        $("#clsReq27_content").show();
        $("#role_advisor_content").hide();
        $('#clsAlert_content').hide();
    });
    $('.history_icon').click(function () {
        $('#clsAlert_content').show();
        $("#clsSlide26Home_content").hide();
        $("#clsReq27_content").hide();
        $("#role_advisor_content").hide();
    });

    //Page navigation by icons (for mobile)
    $('.menu_list ul li a').click(function (ev) {
        $('.menu_list ul li').removeClass('selected');
        $(ev.currentTarget).parent('li').addClass('selected');
    });
    $(".home_icon").click(function () {
        $("#clsSlide26Home_content").show();
        $("#clsReq27_content").hide();
        $("#role_advisor_content").hide();
        $('#clsAlert_content').hide();
    });
    $(".request_icon").click(function () {
        $("#clsSlide26Home_content").hide();
        $("#clsReq27_content").show();
        $("#role_advisor_content").hide();
        $('#clsAlert_content').hide();
    });
    $('.history_icon').click(function () {
        $('#clsAlert_content').show();
        $("#clsSlide26Home_content").hide();
        $("#clsReq27_content").hide();
        $("#role_advisor_content").hide();
    });


});

//***************************************************buddy_view_notifications.aspx***************************************************
//============================================================Alerts====================================================
function GetBuddyAlerts() {
    var BuddyId = '298015'; //dont hardcode things, even if u want first write actual statement then comment it
    $.ajax({
        type: 'POST',
        url: 'buddy_view_notifications.aspx/GetBuddyAlerts',
        contentType: 'application/json',
        data: "{BuddyId:'" + BuddyId + "'}",
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
    var length = obj.objBuddyAlerts.length;
    $('#Advisor_alerts').html('');
    {
        var list = '';
        for (var i = 0; i < length; i++) {
            list += ' <div class="row">';
            list += ' <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 alerts_content">';
            //list += ' <img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/>';
            var request = new XMLHttpRequest;
            request.open('GET', "../../Pages/NA/ShowImage.ashx?id=" + obj.objBuddyAlerts[i].NewHireId + "", false);
            request.send();
            if (request.status === 200) {
                list += '<img class="img-circle pull-left profile" runat="server" src="../../Pages/NA/ShowImage.ashx?id=' + obj.objBuddyAlerts[i].NewHireId + '" alt="" />';
            }
            else {
                list += '<img class="img-circle pull-left profile" src="../../Resources/Images/NA/result_profile.png" />';
            }
            list += ' <p>' + obj.objBuddyAlerts[i].BuddyAlerts + '</p>';
            list += ' </div>';
            list += ' </div>';
        }
        $('#Advisor_alerts').append(list);
    }
}

//***************************************************buddy_view_history.aspx***************************************************
//============================================================Review Feedback====================================================

function GetFeedbackQuestions() {
    var BuddyId = $('#CurrentUserId').val();
    var JoineeId = $('#JoineeId').val();
    var CountryId = $('#CountryId').val();
    var ReviewType = 'Buddy';
    var bodyId = $('body').attr('id');

    $.ajax({
        type: 'POST',
        url: 'buddy_view_history.aspx/GetFeedbackQuestions',
        contentType: 'application/json',
        data: "{BuddyId:'" + BuddyId + "',JoineeId:'" + JoineeId + "',countryId:'" + CountryId + "',ReviewType:'" + ReviewType + "'}",
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
            var length = Questions.objFeedbackQuestions.length;

            $('.feedback_ques').html('');
            var list = '';
            var QueCount = 1;
            for (var i = 0; i < length; i++) {
                list += ' <li>' + Questions.objFeedbackQuestions[i].QuestionText + '';
                list += ' <ul class="choose_option" id="' + QueCount + '">';
               //for(var i = 0; i<length; i++) {
               
                if (Questions.objFeedbackQuestions[i].Feedback == '1') {
                    list += ' <li class="cls_stdisagree"><span class="selected">1</span></li>';
                    list += ' <li class="cls_disagree"><span>2</span></li>';
                    list += ' <li class="cls_neutral"><span>3</span></li>';
                    list += ' <li class="cls_agree"><span>4</span></li>';
                    list += ' <li class="cls_stagree"><span>5</span></li>';
                  
                }
                if (Questions.objFeedbackQuestions[i].Feedback == '2') {
                    list += ' <li class="cls_stdisagree"><span>1</span></li>';
                    list += ' <li class="cls_disagree"><span class="selected">2</span></li>';
                    list += ' <li class="cls_neutral"><span>3</span></li>';
                    list += ' <li class="cls_agree"><span>4</span></li>';
                    list += ' <li class="cls_stagree"><span>5</span></li>';

                }
                if (Questions.objFeedbackQuestions[i].Feedback == '3') {
                    list += ' <li class="cls_stdisagree"><span>1</span></li>';
                    list += ' <li class="cls_disagree"><span>2</span></li>';
                    list += ' <li class="cls_neutral"><span class="selected">3</span></li>';
                    list += ' <li class="cls_agree"><span>4</span></li>';
                    list += ' <li class="cls_stagree"><span>5</span></li>';

                }
                if (Questions.objFeedbackQuestions[i].Feedback == '4') {
                    list += ' <li class="cls_stdisagree"><span>1</span></li>';
                    list += ' <li class="cls_disagree"><span>2</span></li>';
                    list += ' <li class="cls_neutral"><span>3</span></li>';
                    list += ' <li class="cls_agree"><span class="selected">4</span></li>';
                    list += ' <li class="cls_stagree"><span>5</span></li>';

                }
                if (Questions.objFeedbackQuestions[i].Feedback == '5') {
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

           // $('.choose_option li').siblings()[i].find('span').addClass('selected');
         //   $('.choose_option li').siblings().find('span')[0].addClass('selected');
            }

            
           
          
        

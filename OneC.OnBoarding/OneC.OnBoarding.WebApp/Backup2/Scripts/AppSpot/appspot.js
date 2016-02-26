/* Added for Survey */
var sessionId = 0, candidateId = 0, surveyUrl = '', url = '', IsSurveyAllowed = 0;
var qs = (function (a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=');
        if (p.length != 2) continue;
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));
sessionId = qs["ss"];
candidateId = qs["cand"];
url = qs["SurveyUrl"];
IsSurveyAllowed = qs["IsSurveyAllowed"];
CandiName = qs["CandidateName"];
$(document).ready(function () {
    if (IsSurveyAllowed == 1) {
        $('#survey-btn').show();
        surveyUrl = url + '?cand=' + parseInt(candidateId) + '&ss=' + parseInt(sessionId);
        confirmBox();
        blink();
        // SurveyPopupWindow(surveyUrl);
    }
    /* Tooltip on hover over tab */
    $('.tabs li').hover(function () {
        var t = $(this).find('.ttip');
        t.show();
        t.before('<span id="arr"></span>');
    },
  function () {
      $('#arr').remove();
      $(this).find('.ttip').hide();
  });

    /* Left Navigation tab functionality */
    $('.tabs li').click(function () {
        $('#landing').hide();   // Hide the landing page
        $('#home-btn').removeClass('selected').removeAttr('disabled');

        $('.tabs li').removeClass('selected');
        $(this).addClass('selected');

        var idx = $('.tabs li').index(this);  // selected tab index
        $('#tabcontainer .content').removeClass('selected');

        var cont = $('#tabcontainer .content').get(idx);
        $(cont).addClass('selected');
    });

    /* Highlight on hover over bubble */
    $('.bubble').hover(function () {
        $(this).addClass('nobg');
        $(this).find('a').css('text-decoration', 'underline');
    },
  function () {
      $(this).removeClass('nobg');
      $(this).find('a').css('text-decoration', 'none');
  });

    /* Page navigation */
    $('.pg1 .next').click(function () {
        var pg = $(this).parent();
        pg.hide();
        pg.next().show();
    });

    $('.pg2 .prev').click(function () {
        var pg = $(this).parent();
        pg.hide();
        pg.prev().show();
    });

    /* Close Popup */
    $('.popup .close').click(function () {
        $(this).parent().hide();
        $('#overlay').hide();
    });

    /* Show popup */
    $('.a-pop').click(function () {
        var id = $(this).parent().attr('id');
        popid = '#' + id + '-pop';

        $('#overlay').show();
        $(popid).show();
    });

    /* Tooltip on hover over next-previous buttons */
    $('.next').hover(function () {
        $(this).parent().append('<span id="next-tt"></span>');
    }, function () {
        $('#next-tt').remove();
    });

    $('.prev').hover(function () {
        $(this).parent().append('<span id="prev-tt"></span>');
    }, function () {
        $('#prev-tt').remove();
    });

    /* Open each link in new Window */
    $('a').click(function () {
        if ($(this).hasClass('a-popup') || $(this).attr('href') == '#')
            return false;

        $(this).attr('target', '_blank');
    });

    /* Home button click */
    $('#home-btn').click(function () {
        $('#landing').show();
        $('#tabcontainer .content, .tabs li').removeClass('selected');

        $(this).addClass('selected').attr('disabled', 'disabled');
    });
});
function SurveyPopupWindow(url) {
    var popupStatus = 0;
    if (url == 0)
     {
        $("#overLay").remove();
        $(".wrapper_landing").remove();
        blink();
     } 
    else {
        try {
            //loads popup only if it is disabled
            if (popupStatus == 0) {
                $("#overLay").remove();
                $(".wrapper_landing").remove();
                //$("#overLay").remove();         
                var $backgroundOverLay = $('<div id="overLay"/>');
                $("body").prepend($backgroundOverLay);
                $("#overLay").css({
                    "opacity": "0.7"
                });
                $("#overLay").show();

                var closeBox = '<table width="102%" border="0" cellspacing="0" cellpadding="0" id="closeBox" style="position:absolute;*margin-left:-5px;">';
                closeBox += '<tr><td style="border:none;"><a onclick="surveydisablePopup()" style="float:right;background:url(../../../../Images/Survey/close.png) no-repeat; width:25px; height:25px; border:none; outline:none; position:relative; z-index:100;"></a></td></tr>'
                closeBox += '</table>';
                //Iframe Box
                var $htmlContent = "<iframe id='iFrameLoader' class='surveyIframe' width='940px' height='510px'  frameborder='0' scrolling='no' src='" + surveyUrl + "' style='margin-top:15px;overflow:hidden;'></iframe>";

                var $popupData = $('<div class="suverypopupContactwrapper" style="z-index:999999"/>').html($htmlContent).prepend(closeBox);
                $("body").prepend($popupData);
                $(".suverypopupContactwrapper").show();
                popupStatus = 1;
            }
            surveycenterPopup();
        } catch (e) {
        }
    }
}
function surveycenterPopup() {
    //request data for centering
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;

    var popupHeight = $(".suverypopupContactwrapper").height();
    var popupWidth = $(".surveyIframe").width();

    //centering
    $(".suverypopupContactwrapper").css({
        "position": "absolute",
        "top": windowHeight / 2 - popupHeight / 2,
        "left": windowWidth / 2 - popupWidth / 2

    });

    //only need force for IE6	
    $("#overLay").css({
        "height": windowHeight
    });
}
//disabling popup with jQuery magic!
function surveydisablePopup(status) {
    //disables popup only if it is enabled

    $("#overLay").remove();
    $(".suverypopupContactwrapper").remove();
    if (status == 2) {
        $('#survey-btn').hide();
    }
    popupStatus = 0;
    blink();
}
var blink = function () {
    $('#survey-btn').animate({opacity : 0},'slow');
    $('#survey-btn').animate({ opacity: 1 }, 'slow', blink);
}
var confirmBox = function () {
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;

    var $backgroundOverLay = $('<div id="overLay"/>');
    $("body").prepend($backgroundOverLay);
    $("#overLay").css({
        "opacity": "0.7"
    });
    $("#overLay").show();
    var $popupContent = '<div class="pop_wrapper" style="width:468px;position: relative;">';
    $popupContent += '<div class="close" onclick="SurveyPopupWindow(0);" style="background:url(../../../../images/Survey/close.png) no-repeat; height:30px; width:30px; float:right;  position: relative;right: -20px;top: 16px;">';
    $popupContent += '</div><div class="pop_content_wrapper" style="background:url(../../../../images/Survey/pop_bg.png) repeat-x; height:385px; width:468px; float:left;"><p class="welcome" style="font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#fefefe; margin: 10px 0 10px 10px; float:left;">';
    $popupContent += 'Welcome <span id="Name" style="font-weight:bold;">' + CandiName + '</span></p><div class="pop_content" style=" background:url(../../../../images/Survey/popup_content_bg.png) repeat-x;border:1px solid #000;width:450px; height:286px;  margin: 0 0 0 8px; float:left; clear:both;">';
    $popupContent += '<p class="note_head" style="font-size:26px; color:#191919; margin: 50px 0 0 23px;">We\'d like to hear from you!!!</p>';
    $popupContent += '<p class="feedback_note" style=" font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#3d3d3d; line-height: 24px;margin: 5px 0 0 25px;width: 74%; ">';
    $popupContent += 'Please share your <span style=" font-weight:bold; color:#226b1f;">feedback</span> by sparing 5 minutes of your valuable time.</p><img src="../../../../images/Survey/icon_bg.png" style="float:right;" /></div>';
    $popupContent += '<div class="btns" style="float:right;clear:both; margin: 9px 34px 0 -60px;font-weight:bold;font-size:12px;*margin-top:70%;"><input type="button" class="remind_me_clicked popup_btn" value="Remind Me Later" style="height:30px; width:132px; border:1px solid #767676; cursor:pointer;margin-right:10px;*float:left;"  onclick="SurveyPopupWindow(0);"/><input type="button" class="take_me_to_survey popup_btn" value="Take Me To The Survey" style="height:30px;border:1px solid #767676; width:145px;cursor:pointer;" onclick="SurveyPopupWindow(1)"/>';
    $popupContent += '</div></div></div>';
    var $popupData = $('<div class="wrapper_landing"/>').html($popupContent);
    $("body").prepend($popupData);
    $(".wrapper_landing").css({
        "position": "absolute",
        "top": windowHeight / 2 - 200,
        "left": windowWidth / 2 - 200,
        "z-index": "999999999"
    }); 
    $(".wrapper_landing").show();
    //SurveyPopupWindow(surveyUrl)
    //SurveyPopupWindow($('#hdnSurveyUrl').val())
}

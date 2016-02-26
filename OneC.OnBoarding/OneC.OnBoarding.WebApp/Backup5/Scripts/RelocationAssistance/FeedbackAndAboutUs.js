//Variable which holds list of parameters passed in query string in array object

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

//Initializing globally processing variables
candidateId = parseInt(qs["cndid"]);
countryId = parseInt(qs["cntyid"]);
sessionId = parseInt(qs["ssid"]);

var returnStatus = 0;
/* feedback module starts here*/
function feedback(mode) {// mode = 1 -> feedback; 2-> about us;
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;

    if (mode == 1) {
        var $popupContent = '<div class = "popupwrapper popupfeedback" style="display:block">';
        $popupContent += '<div class = "headwrap"><div class="headleft" style="margin-top: 0px; padding-top: 10px; padding-left: 10px;"><h3>Feedback</h3></div><div class="headrgt" onclick="Close();" style="cursor:pointer; margin-top: 0px; margin-bottom: 10px;"><img class="popclose" src="../Images/RelocationAssistance/icon_close.png" style="margin-top: 0px;"/></div></div>';
        $popupContent += '<div class="clear"/>';
        $popupContent += '<div class="popup_contwrap"><textarea class="txtarea" label="feedbackValue" title="Max length 2000 characters" name="feedbackValue" id="feedbackValue" maxlength="2000" onfocus="if(this.value==\'Enter your comment here.\')this.value=\'\';" onblur="if(this.value==\'\')this.value=\'Enter your comment here.\';" onpaste=\'return maxLengthPaste(this,"1999");\' onkeypress="textLimit(this,1999)">Enter your comment here.</textarea><div class="clear"/>';
        $popupContent += '<input name="nextbtn" id="submit" class="btnblue" type="submit" value="Submit" onclick="Submit(2)"/><input name="nextbn" class="btnblueCancel" type="submit" value="Cancel" onclick="Close();"/></div>';
        $popupContent += '</div>';
        var $popupData = $('<div class="wrapper_landing"/>').html($popupContent);
    }
    else if (mode == 2) {    
        var $popupContent = '<div class = "popupwrapper popupfeedback" style="display:block">';
        $popupContent += '<div class = "headwrap"> <div class="headleft" style="margin-top: 0px; padding-top: 10px; padding-left: 10px;"><h3>About Us</h3></div><div class="headrgt" onclick="Close()" style="cursor:pointer; margin-top: 0px; margin-bottom: 10px;"><img class="popclose" src="../Images/RelocationAssistance/icon_close.png" style="margin-top: 0px;"/></div>';
        $popupContent += '<div class="clear"/>';
        $popupContent += '<div class="popup_contwrap"><span id="lblSuccessfulPopup" style="font-size: 14px; color: black;">Here is your One Stop Page that will help you understand the city you will soon visit, and the Organization you are about to be a part of!</span><div class="clear"/>';
        $popupContent += '<input name="nextbtn" id="submit" class="btnblue" type="Submit" value="Close" onclick="Close();" style="margin-left:200px; margin-top:20px; "/></div> ';
        $popupContent += '</div>';
        var $popupData = $('<div class="wrapper_landing"/>').html($popupContent);
    }
    
    $("body").prepend($popupData);
    $(".wrapper_landing").css({
        "position": "absolute",
        "top": "150px", // windowHeight / 2 - 200, old value 250
        "left": "250px", //windowWidth / 2 - 200, old value 306
        "z-index": "99999"
    });

    $('.overlay').show();
    $(".wrapper_landing").show();
}

function errorPopup() { // popup msg designed for error will get displayed 
    $('.error_popup').fadeIn();
    $("#pErrorPopupHeader").html('');
    $("#pErrorPopupHeader").append('Error!');
    $("#lblCommonInfoPopup").html('');
    $("#lblCommonInfoPopup").append('Please enter feedback comments.');
    $(".popupwrapper").css('display', 'none');
}

function Close() { 
    $('.overlay').hide();
    $(".wrapper_landing").remove();
}


function Submit(submitMode) {
    // saveMode { 0:Save, 1:Submit }
    if (document.getElementById("feedbackValue").value == null || document.getElementById("feedbackValue").value == "" || document.getElementById("feedbackValue").value == "Enter your comment here.") {
        errorPopup();
    }
    else {
        if (submitMode == 2) {
            try {
                SubmitFeedback(submitMode);
                if (returnStatus == 1) {
                    //Close();
                    $(".wrapper_landing").remove();
                    $(".popupwrapper").css('display', 'none');
                    $('.error_popup').fadeIn();
                    $("#pErrorPopupHeader").html('');
                    $("#pErrorPopupHeader").append('Thanks !!!');
                    $("#lblCommonInfoPopup").html('');
                    $("#lblCommonInfoPopup").append('Thanks for providing your valuable feedback.');
                    
                }
                else if( returnStatus == 0){
                   errorPopup();
                } 
            }
            catch (e) {
                $('.error_popup').fadeIn();
                $("#pErrorPopupHeader").html('');
                $("#pErrorPopupHeader").append('Error!');
                $("#lblCommonInfoPopup").html('');
                $("#lblCommonInfoPopup").append(e.Message);
                $(".popupwrapper").css('display', 'none');
            }
        }
    }
}

function replacequote(text) {
    var newText = "";
    for (var i = 0; i < text.length; i++) {
        if (text[i] == "'") {
            newText += "\\'";
        }
        else
            newText += text[i];
    }
    return newText;
};

function SubmitFeedback(submitMode) {
    var retCisStatus = 0;
    try {
        var commentBoxData = $('#feedbackValue').val();
        commentBoxData = commentBoxData.replace(/\\/g, "\\\\");
        commentBoxData = replacequote(commentBoxData);
        
        var isCisLocked = 0;

        var data = "{";
        data += "'sessionId':" + sessionId.toString() + ",";
        data += "'candidateId':" + candidateId.toString() + ",";
        data += "'feedbackValue':'" + commentBoxData.toString() + "',";
        data += "'saveMode': " + submitMode.toString() + ",";
        data += "'roleGroupId' : 2,";
        data += "'dashboardMode' : 2,";
        data += "'countryId':" + countryId.toString();
        data += "}";

        $.ajax({
            type: "post",
            url: "../FormsService.aspx/saveFeedback",
            data: data,
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                retCisStatus = msg.d;
                if (retCisStatus == 1) {
                    returnStatus = 1;
                }
                else {
                    returnStatus = 0;
                }
            },
            error: function (xhr, status, textRemarks) {
                $('.error_popup').fadeIn();
                $("#pErrorPopupHeader").html('');
                $("#pErrorPopupHeader").append('Error!');
                $("#lblCommonInfoPopup").html('');
                $("#lblCommonInfoPopup").append(xhr.status + " " + textRemarks);
                $(".popupwrapper").css('display', 'none');
                //alert("Error " + xhr.status + " " + textRemarks); 
            }
        });
    }
    catch (e) {
        errorPopup();
    }

}
/*ends*/


$("#feedbackValue").bind("focus", function (e) {
    var thisObj = $(this);
    if (thisObj.val() == "Enter your comment here.") {
        thisObj.val('');
    }
});
$("#feedbackValue").bind("blur", function (e) {
    var thisObj = $(this);
    if (thisObj.val() == "") {
        thisObj.val('Enter your comment here.');
    }
});

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
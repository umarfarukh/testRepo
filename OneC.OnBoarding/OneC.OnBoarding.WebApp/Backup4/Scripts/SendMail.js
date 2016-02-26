var notificationMappingId = 0;
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
candidateId = parseInt(qs["cand"]);
taskId = parseInt(qs["task"]);
countryId = parseInt(qs["cntry"]);
sessionId = parseInt(qs["ss"]);
FromId = qs["EmailId"];
ToId = qs["ToId"];
// Added for BGV and event mailers
queryMode = parseInt(qs["queryMode"]);
if (qs["eventMappingId"] != undefined || qs["eventMappingId"] != null) {
    notificationMappingId = parseInt(qs["eventMappingId"]);
} else {
    notificationMappingId = 0;
}


var SendMail = {
    subject: '',
    body: '',
    returnData: '',
    headContent: '',
    bodyContent: '',
    footerContent: '',
    content: '',
    ajaxUrl: '../FormsService.aspx/',
    ajaxUrlPath: '', // change the url path in AjaxData fn.
    AjaxCall: function (methodData, methodUrl, ajaxMode) {
        var ajaxStatus;
        $.ajax({
            type: "post",
            async: false,
            url: SendMail.ajaxUrlPath + SendMail.ajaxUrl + methodUrl,
            data: methodData,
            cache: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (ajaxMode == 0) {
                    SendMail.returnData.push(result.d[0]);
                } else {
                    SendMail.returnData = result.d;
                }
                return ajaxStatus = true;
            },
            error: function (result) {
                SendMail.returnData = result;
                return ajaxStatus = false;
            }
        });
        return ajaxStatus;
    },
    AjaxData: function (mode) {
        /*
        mode 
        ------
        default - post query
        0 - BGV
        1 - MNA
        */

        SendMail.subject = '';
        SendMail.content = '';
        switch (mode) {
            case 0:
                SendMail.subject = $('#subject').text();
                SendMail.bodyContent = $('#sendMailContent').html();
                SendMail.content = SendMail.headContent + SendMail.bodyContent.replace(/contentEditable="true"/g, '').replace(/contentEditable=true/g, '') + SendMail.footerContent;
                break;
            case 1:
                SendMail.ajaxUrlPath = '../../../';
                SendMail.subject = $('input[name=Response]:radio:checked').val() + " " + $('#Querytitle').val();
                SendMail.content = $('#Querydescription').val();
                break;

            default:

                SendMail.subject = "Post-Query " + $('#subject').val();
                SendMail.content = $.trim($('#comment').val());
                break;
        }
    },
    PostQuery: function (fnMode) {
        if (validate.ValidateSubmit() == true) {
            SendMail.AjaxData(fnMode);
            var htmlContent = SendMail.content;
            htmlContent = htmlContent.replace(/\\n/g, " ");
            htmlContent = htmlContent.replace(/\\/g, "\\\\");
            htmlContent = htmlContent.replace(/'/g, "''").replace(/'/g, "\\\'");
            var data = "{";
            data += "'subject':'" + SendMail.subject.toString() + "',";
            data += "'body':'" + htmlContent.toString() + "',";
            data += "'notificationMappingId':" + notificationMappingId + ",";
            data += "'candidateId':" + candidateId + ",";
            data += "'countryId':" + countryId;
            data += "}";
            $.when(SendMail.AjaxCall(data, 'PostQuery', 1)).done(function (retStatus) {
                if (retStatus === true) {
                    if (notificationMappingId != undefined && notificationMappingId != 0) {
                        SendMail.CloseWindow();
                        if (notificationMappingId != undefined) {
                            parent.MailSent();
                        }
                    }
                    else if (SendMail.returnData == 1) {
                        //  MsgboxInfo1(sessionId, 1, 205, 'POST_QUERY', 'Your query has been posted successfully', 1);
                        alert("Your query has been posted successfully");
                        window.close();
                        $(".inputText").val('');
                    }
                    else {
                        alert("Transaction failed");
                    }
                } else {
                    alert("Transaction failed");
                }
            });
        }
    },
    GetMailContent: function () {
        var data = "{";
        data += "'notificationMappingId':" + notificationMappingId + ",";
        data += "'candidateId':" + candidateId + ",";
        data += "'sessionId':" + sessionId;
        data += "}";
        $.when(SendMail.AjaxCall(data, 'GetEventMailContent', 1)).done(function (retStatus) {
            if (retStatus === true) {
                SendMail.headContent = JSON.parse(SendMail.returnData).HeaderContent;
                SendMail.footerContent = JSON.parse(SendMail.returnData).FooterContent;
                SendMail.bodyContent = JSON.parse(SendMail.returnData).BodyContent;
                var content = '<div style="padding-left:5px;margin-bottom:10px;">';
                content += '<span style="height:17px;background-color:#0092dd;width:97%;display:inline-block;"/>';
                content += '<span style="height:1px;background-color:#eeeeee;width:97%;display:inline-block;"/>';
                content += '<span style="height:10px;background-color:#9ecd59;width:97%;display:inline-block;"/>';
                content += '<span style="background-color:#eeeeee;width:95.8%;display:inline-block;padding:5px;line-height:1.5;" id="sendMailContent">' + SendMail.bodyContent + '</span>';
                content += '<span style="height:10px;background-color:#9ecd59;width:97%;display:inline-block;"/>';
                content += '<span style="height:1px;background-color:#eeeeee;width:97%;display:inline-block;"/>';
                content += '<span style="height:17px;background-color:#0092dd;width:97%;display:inline-block;"/>';
                content += '</div>';
                $('#mailDescription').append(content);
                $('#from').text(JSON.parse(SendMail.returnData).FromId);
                $('#to').text(JSON.parse(SendMail.returnData).ToId);
                $('#cc').text(JSON.parse(SendMail.returnData).CcId);
                $('#bcc').text(JSON.parse(SendMail.returnData).BccId);
                $('#subject').text(JSON.parse(SendMail.returnData).Subject);
            }
        });

    },
    CloseWindow: function () {
        window.frameElement.parentNode.style.display = "none";
        window.frameElement.parentNode.nextSibling.style.display = "none";
    }
}

var validate = {
    errors: '',
    obj: '',
    'textMandatory': function () {
        if (validate.obj == '') {
            validate.obj = this;
        }
        var cl = $(validate.obj).attr('id');
        var cla = $('#' + cl);
        var name = $(cla).attr('title');

        $("#" + cl).siblings('img').remove();
        $("#" + cl).siblings('.alert_f_text').remove();
        $('#' + cl).after('<img class="alert_f"/><label id="' + cl + 'Info" class="alert_f_text"></label>');
        var th = $(cla).siblings('.alert_f_text').attr('id');
        if (cla.val().length < 1) {
            validate.errors = true;
            $("#" + th).html('Please enter "' + name + '"').css('float', 'right').show();
            $("#" + th).prev().show();
            validate.obj = '';
        } else {
            $(".textMandatory").siblings("#" + th).hide();
            $("#" + th).prev().hide();
            validate.obj = '';
        }
        validate.obj == '';
    },

    'ValidateSubmit': function () {
        validate.errors = false;
        $('.textMandatory').each(function () {
            validate.obj = this;
            validate.textMandatory();
        });
        if (validate.errors == true) {
            validate.obj = '';
            return false;
        }
        else {
            return true;
        }
    }

};


// BGV fn's

//var mailContent = {
//    headContent: '',
//    footerContent: '',
//    GetMailContent: function () {
//        var data = "{";
//        data += "'notificationMappingId':" + notificationMappingId + ",";
//        data += "'candidateId':" + candidateId + ",";
//        data += "'sessionId':" + sessionId + ",";
//        data += "'countryId':" + countryId;
//        data += "}";
//        $.ajax({
//            type: 'post',
//            url: "../FormsService.aspx/GetEventMailContent",
//            data: data,
//            dataType: "json",
//            async: false,
//            contentType: 'application/json; charset=utf-8',
//            success: function (msg) {
//                mailContent.headContent = JSON.parse(msg.d).HeaderContent;
//                mailContent.footerContent = JSON.parse(msg.d).FooterContent;
//                var content = '<div style="padding-left:5px;margin-bottom:10px;">';
//                content += '<span style="height:17px;background-color:#0092dd;width:97%;display:inline-block;"/>';
//                content += '<span style="height:1px;background-color:#eeeeee;width:97%;display:inline-block;"/>';
//                content += '<span style="height:10px;background-color:#9ecd59;width:97%;display:inline-block;"/>';
//                content += '<span style="background-color:#eeeeee;width:95.8%;display:inline-block;padding:5px;line-height:1.5;">' + JSON.parse(msg.d).BodyContent + '</span>';
//                content += '<span style="height:10px;background-color:#9ecd59;width:97%;display:inline-block;"/>';
//                content += '<span style="height:1px;background-color:#eeeeee;width:97%;display:inline-block;"/>';
//                content += '<span style="height:17px;background-color:#0092dd;width:97%;display:inline-block;"/>';
//                content += '</div>';
//                $('#mailDescription').append(content);
//                $('#from').text(JSON.parse(msg.d).FromId);
//                $('#to').text(JSON.parse(msg.d).ToId);
//                $('#cc').text(JSON.parse(msg.d).CcId);
//                $('#bcc').text(JSON.parse(msg.d).BccId);
//                $('#subject').text(JSON.parse(msg.d).Subject);
//            },
//            error: function (xhr, status, textRemarks) {
//                //  alert("Error " + xhr.status + " " + textRemarks);
//                return false;
//            }
//        });

//    },
//    CloseWindow: function () {
//        window.frameElement.parentNode.style.display = "none";
//        window.frameElement.parentNode.nextSibling.style.display = "none";
//    }
//}



$(document).ready(function () {
    (function ($) {
        $('.textMandatory').change(validate.textMandatory);
        if (queryMode != null && queryMode == 1) {
            SendMail.GetMailContent();
        }
    })(jQuery);
});

if (window.parent.opener != null && window.parent.opener != undefined) {
    window.onbeforeunload = closeIt;
    function closeIt() {
        window.parent.opener.disablePopup();
        window.close();
    }
    function disablePopup() {
        $("#overLay").hide();
        $(".popupContactwrapper").hide();
        popupStatus = 0;
    }
}


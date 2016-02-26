//var sessionId;
//sessionId = $("#hdnSessionId").val();
$(document).ready(function () {

});

var ECM = {
    documentName: '',
    documentId: 0,
    popupContent: '',
    onComplete: '',
    documentComment: '',
    serviceUrl: '../../FormsService.aspx/',
    approvalStatus: 0,
    documentUniqueId: '',
    callMode: 0,
    response: '',
    status: 0,
    documentStatus: 0,
    IsMandatory: 0,
    documentMatrixId: 0,
    responseData: [],
    comment: '',
    delay: 200,
    url: '../../',
    currentElement: '',
    documentId: 0,
    documentUploadMode: 0,
    documentWebFormMode: 0,
    saveMode: 0,
    candidateBgvComponentDetailKey: 0,
    notificationMappingId: 0,
    refreshPage: 0,
    CheckIn: function () {
    },
    Upload: function (url, taskName, openMode, uploadNote, saveMode) { // openMode 1 -- BGV || 2 -- Web task // saveMode 1 --> Template 0 --> document
        if (openMode == 1) {
            ECM.documentId = taskName.split('_')[0];
            ECM.candidateBgvComponentDetailKey = taskName.split('_')[1];
        }

        ECM.documentWebFormMode = 2;
        ECM.documentUploadMode = openMode;
        if (saveMode != null && saveMode != NaN) {
            ECM.saveMode = saveMode;
        }
        var popupContent = '';
        popupContent += "<div id='upload_container' style='width:500px'>";
        popupContent += '<a id="spinner" style="position:absolute;z-index:99999;top:100px;left:200px;display:block;"><img src="../../Images/spinner_1.gif" /></a>';
        popupContent += "<iframe id='uploadFrameLoader' width='480px' height='350px'    frameborder='0' scrolling='no' src='" + url + "' style='margin-top:15px;overflow:hidden;*margin-left:-5px;'></iframe>";
        if (uploadNote != undefined && uploadNote != null) {
            popupContent += "<div id='uploadNote' style='height:40px;text-align:left;font-weight:bold;margin-top: -30px;margin-left: 10px;font-style: italic;color:red;'>" + $.trim(uploadNote).toString() + "</div>";
        }
        popupContent += "<input id='StatusCode' type='hidden' value='' />";
        popupContent += "<input id='StatusMessage' type='hidden' value='' />";
        popupContent += "<input id='UtilStatusMessage' type='hidden' value='' />";
        popupContent += "<input id='UtilStatus' type='hidden' value='' />";
        popupContent += '</div>';
        $.when(ECM.PopUpWindow(0, popupContent, 0, 480, 200, 50)).done(function () {
            $('#uploadFrameLoader').load(function () {
                $('#spinner').hide();
            });
        });
        ECM.refreshPage = saveMode;
    },
    AjaxCall: function (methodData, methodUrl, ajaxMode) {
        ECM.responseData = [];
        var ajaxStatus;
        try {
            $.ajax({
                type: 'post',
                url: ECM.serviceUrl + methodUrl,
                data: methodData,
                dataType: "json",
                async: false,
                cache: false,
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    if (ajaxMode == 0) {
                        ECM.responseData = [];
                        ECM.responseData.push(msg.d[0]);
                    } else {
                        ECM.response = '';
                        ECM.response = msg.d;
                    }
                    return ajaxStatus = true;
                },
                error: function (xhr, status, textRemarks) {
                    alert("Error " + xhr.status + " " + textRemarks);
                    return ajaxStatus = false;
                }
            });
            return ajaxStatus;
        }
        catch (e) {
            alert(e.Message);
            return false;
        }
        methodData = '';
        methodUrl = ''

    },
    GetUrl: function (documentName) {
        ECM.response = '';
        var data = "{";
        data += "'sessionId':" + sessionId + ",";
        data += "'ecmDocumentName':'" + documentName.toString() + "'";
        data += "}";
        $.when(ECM.AjaxCall(data, 'GetDocumentUrl', 1)).done(function (retStatus) {
            if (retStatus === true) {
                ECM.response.toString();
            }
        });
    },
    GetFile: function (obj, type) {
        var documentName;
        if (type == 0) {
            documentName = ECM.documentName;
        } else {
            documentName = $(obj).attr('ecmDocumentName');
        }
        var data = "{";
        data += "'sessionId':" + sessionId + ",";
        data += "'ecmDocumentName':'" + documentName.toString() + "'";
        data += "}";
        $.when(ECM.AjaxCall(data, 'GetDocumentUrl', 1)).done(function (retStatus) {
            if (retStatus === true) {

                window.open(ECM.response, '_blank', '', '');
                ECM.onComplete = '';
            }
        });
        return true;
    },
    BtnEvent: function (obj, returnMode, fnMode) {
        ECM.status = parseInt($(obj).attr('status'));
        ECM.callMode = returnMode;
        ECM.documentName = $(obj).parent('td').attr('documentName');
        ECM.documentUniqueId = $(obj).parent('td').attr('documentId');
        if (ECM.onComplete == '') {
            ECM.onComplete = $(obj).attr('onComplete');
        }
        if ($(obj).parent().attr('id') != undefined) {
            if (fnMode == 0) {
                ECM.comment = $('label[for="' + $(obj).parent().attr('id') + '_comment"]').text();
            } else {
                ECM.comment = $('label[for="comment_' + $(obj).parent().attr('id').split('_')[1] + '_comment"]').text();
            }
        }
        ECM.response = '';
        switch (ECM.status) {
            case 1: ECM.BtnResponse(obj, 4, fnMode);
                break;
            case 2: ECM.documentStatus = 4;
                ECM.approvalStatus = ECM.status;
                ECM.BtnResponse(obj, 0, ECM.callMode);
                break;
            case 3: ECM.documentStatus = 1;
                ECM.approvalStatus = ECM.status;
                ECM.DocumentRemarks('', ECM.comment, 0);
                break;
            case 4: ECM.GetFile(obj, 0);
                break;
            case 5: ECM.DocumentRemarks(obj);
                break;
            case 7: ECM.BtnResponse(obj, 6, fnMode);
                break;
            default: ECM.BtnResponse(obj, 2, ECM.callMode);
                break;
        }
    },
    BtnResponse: function (obj, mode, fnMode) {
        ECM.documentComment = ECM.comment;
        ECM.comment = ECM.comment.replace(/\\n/g, " ");
        ECM.comment = ECM.comment.replace(/\\/g, "\\\\");
        ECM.comment = ECM.comment.replace(/'/g, "\\\'");
        ECM.comment = ECM.comment.replace(/"/g, "\\\"");
        var documentMatrixId = (ECM.documentUniqueId.split('_')[0] == '') ? 0 : ECM.documentUniqueId.split('_')[0];
        var candidateBgvComponentDetail = (ECM.documentUniqueId.split('_')[1] == undefined) ? 0 : ECM.documentUniqueId.split('_')[1];
        if (ECM.notificationMappingId == '' || ECM.notificationMappingId == undefined || ECM.notificationMappingId == null) {
            ECM.notificationMappingId = 0;
        }

        var data = '{';
        data += "'sessionId':" + sessionId + ",";
        data += "'candidateId':" + candidateId + ",";
        data += "'response':" + ECM.documentStatus + ",";
        data += "'comment':'" + ECM.comment + "',";
        data += "'mode':" + mode + ",";
        data += "'documentMatrixId':" + documentMatrixId + ",";
        data += "'candidateBgvComponentDetail':" + candidateBgvComponentDetail + ",";
        data += "'roleGroupId':" + roleGroupId + ",";
        data += "'notificationMappingId':" + ECM.notificationMappingId;
        data += '}';
        $.when(ECM.AjaxCall(data, 'DocumentApprovalStatus', fnMode)).done(function (retStatus) {
            if (retStatus === true) {
                if (fnMode == 0) {
                    if (ECM.onComplete != undefined && ECM.onComplete != '' && ECM.onComplete != null) {
                        //return eval(ECM.onComplete + '()');
                        returnFn(ECM.onComplete);
                    }
                } else {
                    if (ECM.onComplete != undefined && ECM.onComplete != '' && ECM.onComplete != null) {
                        // return eval(ECM.onComplete + '(' + ECM.response + ')');
                        returnFn(ECM.onComplete, ECM.response);
                    }
                }
                ECM.response = '';
                ECM.onComplete = '';
                return false;
            }
        });

    },
    DocumentRemarks: function (obj, popVal, fnMode) {
        var $popupContent = '<div id="popup_container1" style="position:relative;width:400px;text-align:center;vertical-align:middle;font-size:1.1em;margin-top:10px;" >';
        $popupContent += '<div id="pop_heading" style="height:30px;line-height:30px;background:#22506f;color:white;border-top-right-radius:8px;border-top-left-radius:8px;">Feedback for document upload status</div>'
        $popupContent += '<div id="pop_comment" style="height:140px;background:white;border:2px solid #22506f;border-bottom-right-radius:8px;border-bottom-left-radius:8px;">';
        $popupContent += '<textarea maxlength="200" style="width:90%;height:80px;border:1px solid #99a3a7;margin-top:6px;overflow:hidden;line-height:1.3em;" id="_response"></textarea><br/>';
        $popupContent += '<div style="margin-bottom:4px;margin-top:4px;"><div style="float:left;margin-left:10px;font-style:italic;font-weight:bold;"><label id="_feedbackMan" style="display:none;color:red;"><span>*</span> Please enter feedback</label></div>';
        $popupContent += '<div style="float:right;margin-right:20px;font-style:italic;"><label id="_charleft">200</label><label> characters left</label></div><br/></div><div style="float:right;margin-right:20px;">';
        $popupContent += '<input  value="Ok" type="button" name="Ok" mode="' + fnMode + '" class="rejectOk" style="background:#22506f;color:white;height:20px;cursor:pointer;width:50px;text-align:center;border-radius:2px;margin-right:30px;"/>';
        $popupContent += '<input  value="Cancel" type="button"  name="Cancel" class="rejectCancel" style="background:#22506f;color:white;height:20px;width:50px;cursor:pointer;text-align:center;border-radius:2px;"/>';
        $popupContent += '</div></div></div>';
        if (obj != '' && popVal != undefined && popVal.length != 0) {
            ECM.documentUniqueId = $(obj).parent('td').attr('documentId');
            ECM.onComplete = $(obj).attr('onComplete');
        }
        ECM.PopUpWindow(0, $popupContent, '', '', 0, 0);
        if (popVal != undefined && popVal.length != 0) {
            $('#_response').val(popVal);
            $('#_charleft').text(parseInt($('#_response').attr('maxlength')) - popVal.length);
        }
    },
    ConformBox: function (alertType, msgHeader, msgContent, okBtnTxt, cancelBtnTxt, fnToCall) {
        var $popupContent = '<div id="popup_container1" style="position:relative;width:450px;vertical-align:middle;font-size:1.1em;margin-top:10px;" >';
        $popupContent += '<div id="pop_heading" style="height:30px;line-height:30px;background:#22506f;color:white;border-top-right-radius:8px;border-top-left-radius:8px;text-align:left;padding-left:10px">' + msgHeader + '</div>'
        $popupContent += '<div id="pop_comment" style="background:white;border:2px solid #22506f;border-bottom-right-radius:8px;border-bottom-left-radius:8px;padding-left:10px;padding-top:15px;line-height:1.2em;"><p>' + msgContent + '</p><br/>';
        if (alertType == 0) {
            $popupContent += '<input  value="' + okBtnTxt + '" type="button" returnVal="1" name="Ok" class="action_btn" style="background:#22506f;color:white;height:20px;cursor:pointer;text-align:center;border-radius:2px;margin-right:5px;float:left;padding-left:4px;padding-right:4px;margin-bottom:10px;"/>';
        }
        $popupContent += '<input  value="' + cancelBtnTxt + '" type="button"  returnVal="0" name="Cancel" class="action_btn" style="background:#22506f;color:white;height:20px;cursor:pointer;text-align:center;border-radius:2px;padding-left:4px;padding-right:4px;margin-bottom:10px;"/>';
        $popupContent += '</div></div>';
        ECM.popupContent = $popupContent;
        ECM.onComplete = fnToCall;
        ECM.PopUpWindow(1, ECM.popupContent, '', '', 0, 0);
        //  ECM.Upload(2);
    },
    Msg: function (SendCode, SendMessage, SendUtilMessage, SendStatus) {
        ECM.documentName = '';
        var StatusFlag = 0;
        var responseMessage = SendMessage;
        responseMessage = responseMessage.replace(/\\n/g, " ");
        responseMessage = responseMessage.replace(/\\/g, "\\\\");
        responseMessage = responseMessage.replace(/'/g, "\\\'");
        responseMessage = responseMessage.replace(/"/g, "\\\"");

        SendUtilMessage = SendUtilMessage.replace(/\\n/g, " ");
        SendUtilMessage = SendUtilMessage.replace(/\\/g, "\\\\");
        SendUtilMessage = SendUtilMessage.replace(/'/g, "\\\'");
        SendUtilMessage = SendUtilMessage.replace(/"/g, "\\\"");
        if (SendCode != '' && SendCode != undefined && SendCode != NaN && SendMessage != '' && SendMessage != undefined && SendMessage != NaN && SendUtilMessage != '' && SendUtilMessage != undefined && SendUtilMessage != NaN) {
            if ($('#StatusCode').val() == 0) {
                StatusFlag = 1;
            } else {
                StatusFlag = 2;
            }
            ECM.documentName = SendMessage.split("'")[1];
            var data = '{';
            data += "'candidateId':" + candidateId + ",";
            data += "'sessionId':" + sessionId + ",";
            data += "'documentId':" + ECM.documentId + ",";
            data += "'ecmDocumenName':'" + SendMessage.split("'")[1] + "',";
            data += "'candidateBgvComponentDetailKey':" + ECM.candidateBgvComponentDetailKey + ",";
            data += "'statusFlag':" + StatusFlag + ",";
            data += "'responseMessage':'" + responseMessage + "',";
            data += "'responseCode':" + SendCode + ",";
            data += "'fileName':'" + $.trim(SendUtilMessage.replace('File', '').split('.')[0]) + "',";
            data += "'fileType':'" + SendStatus.replace('File', '').split('.')[1].split(' ')[0] + "',";
            data += "'mode':" + ECM.documentUploadMode + ",";
            data += "'webFormMode':" + ECM.documentWebFormMode + ",";
            data += "'saveMode':" + ECM.saveMode;
            data += "}";
            $.when(ECM.AjaxCall(data, 'SaveUploadedDocName', 1)).done(function (retStatus) {
                if (retStatus === true) {
                    if (ECM.onComplete != undefined && ECM.onComplete != '' && ECM.onComplete != null) {
                        returnFn(ECM.onComplete);
                        //    return eval(ECM.onComplete + '()');
                    }
                    ECM.onComplete = '';
                }
            });
        } else {
            ECM.PopUpClose(0);
            MsgboxAlert(sessionId, 2, 0, null, SendStatus);
        }
    },
    PopUpWindow: function (popUpType, popUpContent, popUpHeight, popUpWidth, popUpLeft, popUpTop) {
        //removing duplicate's start
        $(".uploadContentWrapper").remove();
        $('#overLay').remove();
        // end
        var windowHeight = $(document).height();
        var windowWidth = $(document).width();
        var $backgroundOverLay = $('<div id="overLay"/>');
        var windowLeft = (popUpLeft != 0) ? popUpLeft : (windowWidth / 3);
        var windowTop = (popUpTop != 0) ? popUpTop : ((windowHeight / 3));
        $('body').prepend($backgroundOverLay);
        $("#overLay").css({
            "opacity": "0.7"
        });
        $("#overLay").hide(0).delay(ECM.delay).fadeIn();

        if (popUpType == 0) {
            var closeBox = '<table width="102%" border="0" cellspacing="0" cellpadding="0" style="width:102%;position:absolute;*width:102%;*z-index:9999">';
            closeBox += '<tr><td style="border:none;"><a id="_close" class="rejectCancel"   style="float:right;background:url(../../Images/Survey/close.png) no-repeat; width:25px; height:25px; border:none; outline:none; position:relative; z-index:100;"></a></td></tr>'
            closeBox += '</table>';
            var $popupData = $('<div class="uploadContentWrapper" style="z-index:999999;display:none;" />').html(popUpContent).prepend(closeBox);
        } else {
            var $popupData = $('<div class="uploadContentWrapper" style="z-index:999999;display:none;" />').html(popUpContent);
        }

        $('body').prepend($popupData);
        $('.uploadContentWrapper').hide(0).delay(ECM.delay).fadeIn();

        //for center position 

        $('.uploadContentWrapper').css({
            "position": "absolute",
            "top": windowTop + "px",
            "left": windowLeft + "px",
            "height": popUpHeight + "px",
            "width": popUpWidth + "px"
        });


        //only need force for IE6	
        $("#overLay").css({
            "height": windowHeight
        });
        return false;

    },
    PopUpClose: function (mode) {
        if (mode == 0) {
            $('#overLay').fadeOut(ECM.Delay);
            $('.uploadContentWrapper').fadeOut(ECM.Delay);
        }
        else {
            window.frameElement.parentNode.style.display = "none";
            window.frameElement.parentNode.nextSibling.style.display = "none";
        }
        if (ECM.refreshPage == 1) {

        }
        return false;
    },
    Maxlength: function (obj) {
        try {
            setTimeout(function () {
                var vallength = $(obj).val().length;
                var maxlength = $(obj).attr('Maxlength');
                if (vallength >= maxlength) {
                    $(obj).val($(obj).val().slice(0, 200));
                }
                $('#_charleft').text(maxlength - $(obj).val().length);


            }, 0);
        }
        catch (e) {

        }
    }
}

$(document).ready(function () {
    $('body').on("keypress", "textarea#_response", function (event) {
        var key_codes = [60, 62];
        if (!($.inArray(event.which, key_codes) >= 0)) {
            ECM.Maxlength(this);
        }
        else {
            event.preventDefault();
        }
    }).on("click", ".rejectOk", function () {
        ECM.comment = $.trim($('#_response').val());
        if (ECM.comment.length == 0) {
            $('#_feedbackMan').show();




        } else {
            if ($(this).attr('mode') != undefined && $(this).attr('mode') == 0) {
                ECM.BtnResponse('', 1, ECM.callMode);
            } else {
                ECM.BtnResponse('', 5, ECM.callMode);
            }
            ECM.PopUpClose(0);
        }
    }).on("click", ".rejectCancel", function () {
        ECM.PopUpClose(0);
    }).on("click", ".action_btn", function () {
        ECM.PopUpClose(0);
        if ($(this).attr('returnVal') == 1) {
            if (ECM.onComplete != '' && ECM.onComplete != undefined) {
                returnFn(ECM.onComplete, $(this).attr('returnval'));
                //  return eval(ECM.onComplete + '(' + $(this).attr('returnval') + ')');
            }
        }
    });
});

var returnFn = function (stringFn, returnData) {
    var fnString = stringFn.split('.');
    var fnScope = window;
    for (var i = 0; i < fnString.length; i++) {
        fnScope = fnScope[fnString[i]];
    }
    if (typeof fnScope === 'function' && returnData == undefined) {
        fnScope();
    } else {
        fnScope(returnData);
    }
}
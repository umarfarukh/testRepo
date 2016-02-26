/* 
************************************************
OnBoarding BGV Papers info script
************************************************
Author: 298589
Date: 2014-JULY-25
Purpose: Back Papers list screen
************************************************
*/
/* BgvBackPapers.js */
var candidateId = 0, sessionId = 0, countryId;
var bgvPId = 5; /*BGV Page Id*/

//Variable which holds list of parameters passed in query string in array object
var qs = function (e) { if (e == "") return {}; var t = {}; for (var n = 0; n < e.length; ++n) { var r = e[n].split("="); if (r.length != 2) continue; t[r[0]] = decodeURIComponent(r[1].replace(/\+/g, " ")) } return t } (window.location.search.substr(1).split("&"))
//Initializing globally processing variables
candidateId = parseInt(qs["cand"]);
sessionId = parseInt(qs["ss"]);
countryId = parseInt(qs["cntry"]);

var html = "";
$.ajaxSetup({ cahce: false, dataType: "json", async: false, cache: false, contentType: 'application/json; charset=utf-8' });
var BPapers = {
    urlPath: '../../',
    imgPath: '../../Images/',
    docList: {},
    suspectMappingId: 0,
    noGoMappingId: 0,
    Intialize: function () {
        BPapers.Process(true);
        BPapers.docList["ManDocConfig"] = "";
        var data = "{";
        data += "'candidateId' :" + candidateId.toString() + ",";
        data += "'mode' :" + 1 + ",";
        data += "'docList' :'" + JSON.stringify(BPapers.docList).toString() + "',";
        data += "'noGoTxt' :''"
        data += "}";
        try {
            $.ajax({
                type: 'post',
                url: BPapers.urlPath + 'BGVService.aspx/BackPapers',
                data: data,
                success: function (msg) {
                    BPapers.DesignHTML(msg.d);
                    BPapers.Process(false);
                },
                error: function (xhr, status, textRemarks) {
                    alert("Error " + xhr.status + " " + textRemarks);
                }
            });
        }
        catch (e) {
            BPapers.ErrorTrace(e);
        }
    },
    DesignHTML: function (data) {
        data = JSON.parse(data);
        html += '<table  cellpadding="0"   cellspacing="0" style="width:100%;padding-left:0"><tbody>';
        $(data.BackPapers).each(function (i, val) {
            html += '<tr><th  class="width50"><label for="' + val.DocName + '_txt">' + val.DocName + '</label><div  fu-upid="' + val.DocUpId + '" fu-rnId="0">';
            html += '</div></th></tr>';
        });
        html += '</tbody></table>'
        $('#backpaperList').append(html);
        html = "";
        html += '<table  cellpadding="0"   cellspacing="0" style="width:100%"><tbody><tr class="bgColor" style="background-color:#a0a4a0;"><th style="vertical-align:middle;width:60%;padding-left:10px;text-align:left;">Document(s)</th><th style="vertical-align:middle;padding-left:10px;text-align:left;">Is Required</th><th  style="vertical-align:middle;padding-left:10px;text-align:left;">Mandatory</th></tr>';
        $(data.ManDocConfig).each(function (i, val) {
            html += '<tr class="manDocChk" docId="' + val.DocId + '" style="height:30px;"><th  style="border-bottom:1px solid #2c5673;border-right:1px solid #2c5673;text-align:left;vertical-align:middle;">';
            html += '<label>&nbsp;&nbsp;' + val.DocName + '</label><th style="border-bottom:1px solid #2c5673;border-right:1px solid #2c5673;text-align:left;vertical-align:middle;"><input id="enablechk_' + i + '" type="checkbox" class="manDocList isRequired" style="float:left;vetical-align:middle;margin-left:10px;"';
            if (val.IsDefault == true)
                html += 'checked =' + val.IsDefault;
            html += '/></th><th   style="border-bottom:1px solid #2c5673;text-align:center;vertical-align:middle"><input type="checkbox"  id="manchk_' + i + '" class="manDocList isMandatory"  style="float:center;vetical-align:middle;"';
            if (val.IsMandatory == true)
                html += 'checked =' + val.IsMandatory;
            html += '/></th></tr>';
        });
        html += '</tbody></table>'
        $('#manDocList').append(html);
        html = "";
        if (data.Checks.length > 0) {
            html += '<table  cellpadding="0"   cellspacing="0" style="width:100%"><tbody><tr class="bgColor" style="background-color:#a0a4a0;"><th style="vertical-align:middle;width:50%;padding-left:10px;text-align:left;">Document(s)</th><th style="vertical-align:middle;padding-left:10px;text-align:left;">Is Required</th><th  style="vertical-align:middle;padding-left:10px;text-align:left;">Mandatory</th></tr>';
            $(data.Checks).each(function (i, val) {
                html += '<tr class="manDocChk" docId="' + val.DocId + '" style="height:30px;"><th  style="border-bottom:1px solid #2c5673;border-right:1px solid #2c5673;text-align:left;vertical-align:middle;">';
                html += '<label>&nbsp;&nbsp;' + val.DocName + '</label><th style="border-bottom:1px solid #2c5673;border-right:1px solid #2c5673;text-align:left;vertical-align:middle;"><input id="enablechk_' + i + '" type="checkbox" class="manDocList isRequired" style="float:left;vetical-align:middle;margin-left:10px;"';
                if (val.IsDefault == true)
                    html += 'checked =' + val.IsDefault;
                html += '/></th><th   style="border-bottom:1px solid #2c5673;text-align:center;vertical-align:middle"><input type="checkbox"  id="manchk_' + i + '" class="manDocList isMandatory"  style="float:center;vetical-align:middle;"';
                if (val.IsMandatory == true)
                    html += 'checked =' + val.IsMandatory;
                html += '/></th></tr>';
            });
            html += '</tbody></table>'
        } else {
            html += "<li><label style='color:red;font-weight:bold;'>Oops!! Checks are not available for this candidate account.</label></li>";
            $('#checkList').css({ 'overflow': 'hidden', 'border-bottom': '1px solid #5f8296', 'text-align': 'center' });
        }
        $('#checkList').append(html);
        html = ""
        BPapers.noGoMappingId = data.Utils[0].NoGoMappingId;
        $.fileUpload.Initialize();
        $('#navigateToNxtPage').delay(200).fadeIn('slow');
        $('._btn').css('background-color', '#cccccc');
    },
    Process: function (mode) {
        if (mode) {
            var spinnerHTML = '<a id="spinner" style="position:absolute;z-index:99999;top:300px;left:400px;display:block;"><img src="' + BPapers.imgPath + 'spinner_1.gif" /></a>';
            $('body').append(spinnerHTML);
        } else {
            $('body #spinner').remove();
        }
    },
    SaveManDocConfig: function (mode, nogoTxt) {
        var retStatus = false;
        BPapers.docList = { "ManDocConfig": $('.manDocChk').map(function (i, val) { var obj = $(this); return { "DocumentMatrixId": obj.attr('DocId').split('_')[0], "CandidateBgvComponentDetail": obj.attr('DocId').split('_')[1], "IsDefault": obj.find('.isRequired').is(':checked'), "IsMandatory": obj.find('.isMandatory').is(':checked')} }).get() };
        var data = "{";
        data += "'candidateId' :" + candidateId.toString() + ",";
        data += "'mode' :" + mode + ",";
        data += "'docList' :'" + JSON.stringify(BPapers.docList).toString() + "',";
        data += "'noGoTxt' :'" + nogoTxt.toString() + "'";
        data += "}";
        try {
            $.ajax({
                type: 'post',
                url: BPapers.urlPath + 'BGVService.aspx/BackPapers',
                data: data,
                success: function (msg) {
                    retStatus = msg.d;
                    //  alert("Information saved successfully");
                },
                error: function (xhr, status, textRemarks) {
                    alert("Error " + xhr.status + " " + textRemarks);
                }
            });
        }
        catch (e) {
            BPapers.ErrorTrace(e);
        }
        delete BPapers.docList;
        if (retStatus == "true")
            parent.proceedToUrl();
    },
    ErrorTrace: function (e) {
        alert(e);
    },
    SendMail: function (mappingId) {
        var url = BPapers.urlPath + "CommonPages/SendMail.htm?cand=" + candidateId + "&cntry=" + countryId + "&ss=" + sessionId + "&queryMode=1&eventMappingId=" + mappingId;
        var popupContent = "<iframe id='uploadFrameLoader' width='880px' height='535px'    frameborder='0' scrolling='no' src='" + url + "' style='margin-top:15px;overflow:hidden;*margin-left:-5px;'></iframe>";
        BPapers.PopUpWindow(0, popupContent, 0, 880, 10, 10);
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
        $("#overLay").hide(0).delay(BPapers.delay).fadeIn();
        if (popUpType == 0) {
            var closeBox = '<table width="102%" border="0" cellspacing="0" cellpadding="0" style="width:102%;position:absolute;*width:102%;*z-index:9999">';
            closeBox += '<tr><td style="border:none;"><a id="_close" class="rejectCancel"   style="float:right;background:url(' + BPapers.imgPath + 'Survey/close.png) no-repeat; width:25px; height:25px; border:none; outline:none; position:relative; z-index:100;"></a></td></tr>'
            closeBox += '</table>';
            var $popupData = $('<div class="uploadContentWrapper" style="z-index:999999;display:none;" />').html(popUpContent).prepend(closeBox);
        } else {
            var $popupData = $('<div class="uploadContentWrapper" style="z-index:999999;display:none;" />').html(popUpContent);
        }
        $('body').prepend($popupData);
        $('.uploadContentWrapper').hide(0).delay(BPapers.delay).fadeIn();
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
            $('#overLay').fadeOut(BPapers.delay);
            $('.uploadContentWrapper').fadeOut(BPapers.delay);
        }
        else {
            window.frameElement.parentNode.style.display = "none";
            window.frameElement.parentNode.nextSibling.style.display = "none";
        }
        return false;
    }
}

$(document).ready(function () {
    BPapers.Intialize();
    $('body').on('click', '#navigateToNxtPage', function () { BPapers.SaveManDocConfig(2, '') })
    .on('keyup', 'textarea', function (event) {
        var key_codes = [60, 62, 37, 39];
        if (!($.inArray(event.which, key_codes) >= 0)) {
            $.fileUpload._maxlength(this);
        }
        else {
            event.preventDefault();
        }
    }).on('paste', 'textarea', function (event) {
        var key_codes = [60, 62];
        if (!($.inArray(event.which, key_codes) >= 0)) {
            $.fileUpload._maxlength(this);
            // BPapers.Maxlength(this);
        }
        else {
            event.preventDefault();
        }
    }).on('click', '._send', function () {
        var val = $('#bgnogo_comments').val().replace(/\\n/g, " ").replace(/\\/g, "\\\\").replace(/'/g, "\\\'").replace(/"/g, "\\\"");
        BPapers.SaveManDocConfig(3, val);
        BPapers.SendMail(BPapers.noGoMappingId);
    }).on("click", ".rejectCancel", function () {
        BPapers.PopUpClose(0);
    }).on('click', '.isMandatory', function () {
        var chked = $(this).is(':checked');
        if (chked)
            $(this).closest('tr').find('.isRequired').attr('checked', chked);
    }).on('click', '.isRequired', function () {
        var chked = $(this).is(':checked');
        if (!chked)
            $(this).closest('tr').find('.isMandatory').attr('checked', chked);
    });
});

var MailSent = function () {
    alert('Mail triggered');
};
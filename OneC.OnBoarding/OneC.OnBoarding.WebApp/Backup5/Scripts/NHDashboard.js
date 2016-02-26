/* Alerts.js */
(function (a) { a.alerts = { verticalOffset: -75, horizontalOffset: 0, repositionOnResize: true, overlayOpacity: 0.7, overlayColor: "#000000", Color: "#FF9", bckgrdPopupColor: "#ffffff", draggable: false, okButton: "&nbsp;OK&nbsp;", cancelButton: "&nbsp;Cancel&nbsp;", dialogClass: null, Info: function (b) { a.alerts._show1("Information", b, null, "info", function (c) { }) }, Mandatory: function (b) { a.alerts._show1("Mandatory Fields", b, null, "info", function (c) { }) }, Warning: function (b) { a.alerts._show1("Warning", b, null, "warning", function (c) { }) }, Success: function (b) { a.alerts._show1("Success", b, null, "success", function (c) { }) }, Error: function (b) { a.alerts._show1("Error", b, null, "error", function (c) { }) }, Confirm: function (b) { a.alerts._show1("Confirmation", b, null, "confirm", function (c) { }) }, Prompt: function (b, c) { a.alerts._show1("Prompt", b, c, "prompt", function (d) { }) }, Message: function (b) { a.alerts._show1("Message", b, null, "message", function (c) { }) }, SubmitSuccess: function (b) { a.alerts._show1("Success", b, null, "success", function (c) { window.close() }) }, _show1: function (g, d, i, h, b) { a.alerts._hide(); a.alerts._overlay("show"); if (g == "Message") { a("BODY").append('<div id="popup_container"><h1 id="popup_title" align="center"></h1><div id="popup_content"><div id="popup_message" style="padding:5px 5px 7px;border:0px;height:300px;border-color:blue;margin-left:0px;margin-right:10px;font-size:14;overflow:auto;"></div></div></div>') } else { a("BODY").append('<div id="popup_container"><h1 id="popup_title" align="center"></h1><div id="popup_content"><div id="popup_message" style="padding:5px 5px 7px;border:0px;height:150px;border-color:blue;margin-left:0px;margin-right:10px;font-size:14;overflow:auto;"></div></div></div>') } if (a.alerts.dialogClass) { a("#popup_container").addClass(a.alerts.dialogClass) } var f = (a.browser.msie && parseInt(a.browser.version) <= 6) ? "absolute" : "fixed"; if (g == "Message") { a("#popup_container").css({ width: 700, height: "auto", position: f, zIndex: 99999, padding: 0, margin: 50, left: 400, background: a.alerts.bckgrdPopupColor }) } else { a("#popup_container").css({ width: 450, height: 300, position: f, zIndex: 99999, padding: 0, margin: 50, left: 400, background: a.alerts.bckgrdPopupColor }) } a("#popup_title").text(g); a("#popup_content").addClass(h); a("#popup_message").text(d); a("#popup_message").html(a("#popup_message").text().replace(/\n/g, "<br />")); a("#popup_container").css({ minWidth: a("#popup_container").outerWidth(), maxWidth: a("#popup_container").outerWidth() }); a.alerts._reposition(); a.alerts._maintainPosition(true); switch (h) { case "info": case "warning": case "success": case "error": case "message": a("#popup_message").after('<div id="popup_panel" valign:"vertical"><input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold; position:relative;" class="popup_Button" value="' + a.alerts.okButton + '" id="popup_ok" /></div>'); a("#popup_ok").click(function () { a.alerts._hide(); b(true) }); a("#popup_ok").focus().keypress(function (j) { if (j.keyCode == 13 || j.keyCode == 27) { a("#popup_ok").trigger("click") } }); break; case "confirm": a("#popup_message").after('<div id="popup_panel" valign:"vertical"><input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button"  value="' + a.alerts.okButton + '" id="popup_ok" /> <input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button"  value="' + a.alerts.cancelButton + '" id="popup_cancel" /></div>'); a("#popup_ok").click(function () { a.alerts._hide(); if (b) { b(true) } }); a("#popup_cancel").click(function () { a.alerts._hide(); if (b) { b(false) } }); a("#popup_ok").focus(); a("#popup_ok, #popup_cancel").keypress(function (j) { if (j.keyCode == 13) { a("#popup_ok").trigger("click") } if (j.keyCode == 27) { a("#popup_cancel").trigger("click") } }); break; case "prompt": a("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel" valign:"vertical"><input type="button"  style="background-color:Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button"  value="' + a.alerts.okButton + '" id="popup_ok" /> <input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button" value="' + a.alerts.cancelButton + '" id="popup_cancel" /></div>'); a("#popup_prompt").width(a("#popup_message").width()); a("#popup_ok").click(function () { var e = a("#popup_prompt").val(); a.alerts._hide(); if (b) { b(e) } }); a("#popup_cancel").click(function () { a.alerts._hide(); if (b) { b(null) } }); a("#popup_prompt, #popup_ok, #popup_cancel").keypress(function (j) { if (j.keyCode == 13) { a("#popup_ok").trigger("click") } if (j.keyCode == 27) { a("#popup_cancel").trigger("click") } }); if (i) { a("#popup_prompt").val(i) } a("#popup_prompt").focus().select(); break } if (a.alerts.draggable) { try { a("#popup_container").draggable({ handle: a("#popup_title") }); a("#popup_title").css({ cursor: "move", font: 15 }) } catch (c) { } } }, _hide: function () { a("#popup_container").remove(); a.alerts._overlay("hide"); a.alerts._maintainPosition(false) }, _overlay: function (b) { switch (b) { case "show": a.alerts._overlay("hide"); a("BODY").append('<div id="popup_overlay"></div>'); a("#popup_overlay").css({ position: "absolute", zIndex: 99998, top: "0px", left: "0px", width: "100%", height: a(window).height() - 100 + "px", background: a.alerts.overlayColor, opacity: a.alerts.overlayOpacity }); break; case "hide": a("#popup_overlay").remove(); break } }, _reposition: function () { var c = ((a(window).height() / 2) - (a("#popup_container").outerHeight() / 2)) + a.alerts.verticalOffset; var b = ((a(window).width() / 2) - (a("#popup_container").outerWidth() / 2)) + a.alerts.horizontalOffset; if (c < 0) { c = 0 } if (b < 0) { b = 0 } if (a.browser.msie && parseInt(a.browser.version) <= 6) { c = c + a(window).scrollTop() } a("#popup_container").css({ top: c + "px", left: b + "px" }); a("#popup_overlay").height(a(document).height()) }, _maintainPosition: function (b) { if (a.alerts.repositionOnResize) { switch (b) { case true: a(window).bind("resize", function () { a.alerts._reposition() }); break; case false: a(window).unbind("resize"); break } } } }, MsgboxInfo = function (b) { a.alerts.Info(b) }, MsgboxWarning = function (b) { a.alerts.Warning(b) }, MsgboxSuccess = function (b) { a.alerts.Success(b) }, MsgboxError = function (b) { a.alerts.Error(b) }, MsgboxConfirm = function (b) { a.alerts.Confirm(b) }, MsgboxPrompt = function (b, c) { a.alerts.Prompt(b, c) }, MsgboxAlert = function (i, h, f, d, b) { var g = 2; try { if (f != 0) { a.ajax({ type: "POST", url: "../../FormsService.aspx/GetMessage", data: "{'sessionId':" + i.toString() + ",'messageType':'" + g + "','messageId':" + f.toString() + ",'messageCode':'" + d + "', 'customMessageOnDBFail':'" + b + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false, cache: false, success: function (k) { var l = k.d.DisplayMessage.toString(); var m = k.d.DisplayType.toString(); var e = l.toString(); var j = m.toString(); if (f == 39) { j = "9" } switch (j) { case "1": a.alerts.Success(e); break; case "2": a.alerts.Error(e); break; case "3": a.alerts.Warning(e); break; case "4": a.alerts.Info(e); break; case "5": a.alerts.Prompt(e); break; case "6": a.alerts.Confirm(e); break; case "7": a.alerts.Mandatory(e); break; case "8": a.alerts.Message(e); break; case "9": a.alerts.SubmitSuccess(e); break; default: a.alerts.Info(e) } }, error: function (k, e, j) { a.alerts.Error(k.status + " - " + k.responseText) } }) } else { if (f == 0) { switch (h) { case 1: a.alerts.Success(b); break; case 2: a.alerts.Error(b); break; case 3: a.alerts.Warning(b); break; case 4: a.alerts.Info(b); break; case 5: a.alerts.Prompt(b); break; case 6: a.alerts.Confirm(b); break; case 7: a.alerts.Mandatory(b); break; default: a.alerts.Info(b) } } } } catch (c) { alert(c) } }, MsgboxAlertDashboard = function (i, h, f, d, b) { var g = 2; try { if (f != 0) { a.ajax({ type: "POST", url: "../../FormsService.aspx/GetMessage", data: "{'sessionId':" + i.toString() + ",'messageType':'" + g + "','messageId':" + f.toString() + ",'messageCode':'" + d + "', 'customMessageOnDBFail':'" + b + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false, cache: false, success: function (k) { var l = k.d.DisplayMessage.toString(); var m = k.d.DisplayType.toString(); var e = l.toString(); var j = m.toString(); switch (j) { case "1": a.alerts.Success(e); break; case "2": a.alerts.Error(e); break; case "3": a.alerts.Warning(e); break; case "4": a.alerts.Info(e); break; case "5": a.alerts.Prompt(e); break; case "6": a.alerts.Confirm(e); break; case "7": a.alerts.Mandatory(e); break; default: a.alerts.Info(e) } }, error: function (k, e, j) { a.alerts.Error(k.status + " - " + k.responseText) } }) } else { if (f == 0) { switch (h) { case 1: a.alerts.Success(b); break; case 2: a.alerts.Error(b); break; case 3: a.alerts.Warning(b); break; case 4: a.alerts.Info(b); break; case 5: a.alerts.Prompt(b); break; case 6: a.alerts.Confirm(b); break; case 7: a.alerts.Mandatory(b); break; default: a.alerts.Info(b) } } } } catch (c) { alert(c) } } })(jQuery);
/* Function which holds list of parameters passed in query string in array object*/
var OBQueryString = (function (a) { if (a == "") return {}; var b = {}; for (var i = 0; i < a.length; ++i) { var p = a[i].split('='); if (p.length != 2) continue; b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " ")); } return b; })(window.location.search.substr(1).split('&'));
var roleGroupId = parseInt(OBQueryString["rgid"]);
var roleId = parseInt(OBQueryString["roleid"]);

$("#hdnProcessId").val(1);
var CandidateID = $("#hdnCandidateId").val();
var ProcessId = $("#hdnProcessId").val();
var CountryId = $("#hdnCountryId").val();
var StateID = $("#hdnStateId").val();
var RoleGropuId = $("#hdnRoleGropuId").val();
var preJoiningCompletionStatus = 0;
var postJoiningCompletionStatus = 0;
var NHPhoto = "";
var ibook = 1;
var jbook = ibook - 1;
var ithumb = 1;
var jthumb = ithumb - 1;
var count = 0;
var pgno = 0;
var tcount = 0;
var tpgno = 0;
var bookData;
var thumbkData;
var ListData;
var sessionId = $("#hdnSessionId").val();
var associateId = $("#hdnAssocaiteId").val();
var sessionId = $("#hdnSessionId").val();
var DOJ = $("#hdnDOJ").val();
$("#Date_Of_Joining").text(DOJ);
var DojComparer = $("#hdnDojComparer").val();
var FlashURL;
var setActiveMenu = -1;
var activeMenuFlag = 0;
var recommendedtask;
//var daysLeft = 1;
//ProcessID();
LoadBGVSection();
window.RejectRedirect = function () {
    window.location.href = "../../AccessBlock.aspx?SSId=" + sessionId + "&BlockId=48";
}

window.updateWithNewData = function () {
    var procID = $("#hdnProcessId").val();
    var associateId = $("#hdnAssocaiteId").val();
    var sessionId = $("#hdnSessionId").val();
    var DOJ = $("#hdnDOJ").val();
    LoadBGVSection(procID);
    // ProcessID(procID);
}

/* BGV Section */
window.proceedToUrl = function (url) {
    LoadBGVSection();
    window.setTimeout('', 50);
    OpenFloat(url);
}
/*end BGV */


function AjaxSucceeded(result) {
    recommendedtask = result.d[0].Value;
    $("#DocUploadList").html('');
    $('.icons_nh').css('display', 'block');
    if (result.d[0].Value == "") {
        $("#dNoData").html(result.d[0].Display);
        document.getElementById('dNoData').style.display = "block";

        document.getElementById('List_View').style.display = "none"
        document.getElementById('content_book').style.display = "none"
        document.getElementById('thumbnailview').style.display = "none"
        document.getElementById('list').style.display = "none"
        document.getElementById('book').style.display = "none"
        document.getElementById('thumb').style.display = "none"
    }

    else {
        FlashURL = result.d[15].Value;
        document.getElementById('dNoData').style.display = "none";
        document.getElementById('List_View').style.display = "block"
        document.getElementById('content_book').style.display = "block"
        document.getElementById('thumbnailview').style.display = "block"
        document.getElementById('list').style.display = "block"
        document.getElementById('book').style.display = "block"
        document.getElementById('thumb').style.display = "block"
        if (result.d[0].Value == "BLANK_MESSAGE") {
            $("#NextTask").text('');
        }
        else {
            $("#NextTask").html(result.d[0].Value);
        }
        //  $("#NextTask").text(result.d[0].Value);
        $("#TotalCount").text(result.d[1].Value);
        $("#PendingCount").text(result.d[2].Value);
        $("#CompletedCount").text(result.d[3].Value);

        $("#pplCount").html(result.d[7].Value);
        preJoiningCompletionStatus = result.d[8].Value;
        postJoiningCompletionStatus = result.d[9].Value;
        bookData = result.d[12].Value;
        thumbkData = result.d[13].Value;
        ListData = result.d[11].Value;
        var ViewType = result.d[16].Value;

        if ($("#hdnView").val() != "") {
            ViewType = $("#hdnView").val()
        }

        if (result.d[14].Value == 1) {
            document.getElementById('TimeLeft').style.visibility = 'visible';
            
            $("#DaysLeft").text(result.d[4].Value + " Days");
            document.getElementById('pplJoiningText').style.visibility = 'visible';
            $('#TimeLeft').show();
            $('#pplJoiningText').show();
        }
        NHPhoto = result.d[10].Value;
      //  daysLeft = result.d[4].Value;
        $("#NHPhoto").attr('src', NHPhoto);
        //Switching to Default View
        /* Book View */
        if (ViewType == 2) {
            bookViewClick();

        }
        /* Thumb View */
        else if (ViewType == 3) {
            ThumViewClick();
        }
        //List View
        else {

            ListViewClick();
        }

        $('#video').remove(); /*changed from hide() to remove()*/
        $("#progressbar").progressbar({
            value: result.d[5].Value
        });
        if ($('.ui-progressbar-value').width() == 0)
            $('.ui-widget-header').css('border', 'none');

        //Task Progress
        $("#progressbar1").progressbar({
            value: result.d[6].Value
        });

        if ($('.ui-progressbar-value').width() == 0)
            $('.ui-widget-header').css('border', 'none');

        //        //For Prejoining PostJoining Tab Image Change
        //        if (preJoiningCompletionStatus == 1) {
        //            $("#prejoin_completed").attr('src', '../../Images/prejoining_greentick.png');
        //        }
        //        if (postJoiningCompletionStatus == 1) {
        //            $("#prejoin_completedhide").attr('src', '../../Images/prejoining_greentick.png');
        //        }

        if (result.d[17].Value == 1) {
            if ($("#hdnCandidateType").val() == 2) {
                MsgboxAlert(sessionId, 2, 49, 'PREJOINING_COMPLETION_CONTENT_CAMPIS', 'Form saved successfully!!!');
            }
            else {
                MsgboxAlert(sessionId, 2, 50, 'PREJOINING_COMPLETION_CONTENT_LATERAL', 'Form saved successfully!!!');
            }
        }


        if (result.d[18].Value == 1) {
            // 1-Show/2-Hide
            $('#prebtn').show();
        }
        else if (result.d[18].Value == 2) {
            $('#prebtn').hide();
        }

        if (result.d[19].Value == 1) {
            // 1-Show/2-Hide
            $('#postbtn').show();
        }
        else if (result.d[19].Value == 2) {
            $('#postbtn').hide();
        }

        if (result.d[20].Value == 1) {
            // 1-Show/0-Hide
            $('#Photo').show();
        }
        else {
            $('#Photo').hide();
        }

        if (result.d[21].Value == 1) {
            // 1-Show/0-Hide
            $('#tabFaq').show();
        }
        else {
            $('#tabFaq').hide();
        }


        if (result.d[22].Value == 1) {
            // 1-Show/0-Hide
            $('#cguideenabled').show();
            var cguidepopupContent = $('#hdnCGuideURL').val();
            $('#cguidelink').attr('href', cguidepopupContent);
        }
        else {
            $('#cguideenabled').hide();
        }
      
            if (result.d[23].Value == 1) {
                // 1-Show/0-Hide
                $('#tabRelocationApp').show();
            }
        
        else {

            $('#tabRelocationApp').hide();
        }
    }
}


function AjaxFailed(result) { }


/* BGV section*/

function DrawTabs(obj, processId) {
    var tabHtml = '';
    setActiveMenu = -1;
    tabHtml += '';
    tabHtml += '<div id="divMenu"><ul>';
    if (obj.CanShowBgvTab) {
        tabHtml += '<li onclick="javascript:LoadBGVSection();return;"><div class="div_menu_item" id="div_menu_uploads"><img class="activity_completion_status" src="../../Images/ico_tabBlack.png" /><a class="menu_caption" href="#">Upload Section</a><img class="menu_Status" src="../../Images/prejoining_greyshadow.png"/></div></li>';
        setActiveMenu = 0;
    }
    if (obj.CanShowHTransferTab) {
        tabHtml += '<li onclick="javascript:LoadHTransferSection();return;"><div class="div_menu_item" id="div_menu_htransferuploads"><img class="activity_completion_status" src="../../Images/ico_tabBlack.png" /><a class="menu_caption" href="#">Upload Section</a><img class="menu_Status" src="../../Images/prejoining_greyshadow.png"/></div></li>';
        setActiveMenu = 0;
        $('#hdnHTransferAvailable').val(1);
    }
    if (obj.CanShowPreJoiningTab) {
        tabHtml += '<li onclick="javascript:LoadBGVSection(1);return;"><div class="div_menu_item" id="div_menu_prejoin"><img class="activity_completion_status" src="../../Images/ico_tabBlack.png" /><a class="menu_caption" href="#">Pre Joining</a><img class="menu_Status" src="../../Images/prejoining_greyshadow.png"/></div></li>';
        if (setActiveMenu != 0 || processId > 0) { setActiveMenu = 1; }
    }
    if (obj.CanShowPostJoiningTab) {
        tabHtml += '<li onclick="javascript:LoadBGVSection(2);return;"><div class="div_menu_item" id="div_menu_postjoin"><img class="activity_completion_status" src="../../Images/ico_tabBlack.png" /><a class="menu_caption" href="#">Post Joining</a><img class="menu_Status" src="../../Images/prejoining_greyshadow.png"/></div></li>';
        if (setActiveMenu != 0 || processId > 0) { setActiveMenu = 1; }
    }
    tabHtml += '</ul></div>';

    $('#div_NhTabs').html(tabHtml);

    tabClick();
    tabHover();
}

function ActivateMenu(obj) {
    obj.css('padding-top', '0');
    obj.find('.menu_Status').attr('src', '../../Images/prejoining_blueshadow.png');
    obj.find('.menu_caption').css('color', '#027ab6');
    obj.animate({ paddingTop: '7px' }, 50);
    obj.css('background-size', '130px 42px');
}

function DeactivateMenu(obj) {
    obj.animate({ paddingTop: "0" }, 100);
    obj.find('.menu_Status').attr('src', '../../Images/prejoining_greyshadow.png');
    obj.find('.menu_caption').css('color', '#4b4f4e');
    obj.css('background-size', '130px 35px');
}

/* 249510:BGV - Method to enable and disable tasks based on previous mandatory task values */
function LoadDocUploadSection(obj, processId) {
    $("#DocUploadList").html(obj.HtmlForCisInProgress);
    if (obj.HtmlForHTransferInProgress != "") {
        $("#DocUploadList").html(obj.HtmlForHTransferInProgress);
    }
    $('#DocUploadList').css('display', 'block');
    $('#dNoData').css('display', 'none');
    $('#List_View').css('display', 'none');
    $('#content_book').css('display', 'none');
    $('#thumbnailview').css('display', 'none');
    $('#list').css('display', 'none');
    $('#book').css('display', 'none');
    $('#thumb').css('display', 'none');
    $("#NextTask").html('');
    $("#TotalCount").text('');
    $("#PendingCount").text('');
    $("#CompletedCount").text('');
    $("#pplCount").html('');
    $('.icons_nh').css('display', 'none');

    if (processId != 1 && processId != 2) {
        if (preJoiningCompletionStatus == 1 && postJoiningCompletionStatus == 1) {
            $('#div_menu_prejoin .activity_completion_status').attr('src', '../../Images/prejoining_greytick.png');
            $('#div_menu_postjoin .activity_completion_status').attr('src', '../../Images/prejoining_greytick.png');
        }
        else if (preJoiningCompletionStatus == 0 && postJoiningCompletionStatus == 1) {
            $('#div_menu_prejoin .activity_completion_status').attr('src', '../../Images/ico_tabBlack.png');
            $('#div_menu_postjoin .activity_completion_status').attr('src', '../../Images/prejoining_greytick.png');
        }
        else if (preJoiningCompletionStatus == 1 && postJoiningCompletionStatus == 0) {
            $('#div_menu_prejoin .activity_completion_status').attr('src', '../../Images/prejoining_greytick.png');
            $('#div_menu_postjoin .activity_completion_status').attr('src', '../../Images/ico_tabBlack.png');
        }
        $('#div_menu_uploads .activity_completion_status').attr('src', '../../Images/ico_alert2.gif');

        ActivateMenu($('#div_menu_uploads'));
        DeactivateMenu($('#div_menu_prejoin'));
        DeactivateMenu($('#div_menu_postjoin'));
        activeMenuFlag = 0;
    }
}
/* 249510:  Method to load document upload section */
function LoadBGVSection(processId) {
    var retStatus;
    var candidateID = $("#hdnCandidateId").val();
    var data = "{";
    data += "'sessionId':" + sessionId + ",";
    data += "'candidateId':" + candidateID;
    data += "}";

    $.ajax({
        type: 'post',
        url: "../../FormsService.aspx/GetNHDashboardBgvStatus",
        data: data,
        dataType: "json",
        async: false,
        contentType: 'application/json; charset=utf-8',
        success: function (msg) {
            DrawTabs(msg.d, processId);
            if (setActiveMenu == 0) {
                LoadDocUploadSection(msg.d, processId);
            }
            else if (setActiveMenu == 1) {
                ProcessID(processId);
            }
            retStatus = true;
        },
        error: function (xhr, status, textRemarks) {
            alert("Error : " + xhr.status + " " + textRemarks);
            retStatus = false;
        }
    });
    return retStatus;
}
/*end BGV section */

function ProcessID(processId) {
    if (setActiveMenu != 0) {
        if (processId == undefined || processId == NaN)
            processId = ProcessId;
        if (processId > 0) {
            $("#hdnProcessId").val(processId);
            var associateId = $("#hdnAssocaiteId").val();
            var sessionId = $("#hdnSessionId").val();
            var DOJ = $("#hdnDOJ").val();
            var dataString = '{candidateId:' + CandidateID + "," + 'processId:' + processId + "," + 'countryId:' + CountryId + "," + 'stateId:' + StateID + "," + 'role:' + 0 + "," + 'associateId:' + associateId + "," + 'sessionId:' + sessionId + '}'

             $.ajax({
                type: "POST",
                url: "NHDashBoard.aspx/GetTaskList",
                data: dataString,
                async: false,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: AjaxSucceeded,
                error: AjaxFailed
            });

            if (processId == 1) {
                if (preJoiningCompletionStatus == 1) {
                    $('#div_menu_prejoin .activity_completion_status').attr('src', '../../Images/prejoining_greentick.png');
                }
                else {
                    $('#div_menu_prejoin .activity_completion_status').attr('src', '../../Images/ico_alert2.gif');
                }
                if (postJoiningCompletionStatus == 1) {
                    $('#div_menu_postjoin .activity_completion_status').attr('src', '../../Images/prejoining_greytick.png');
                }
                else {
                    $('#div_menu_postjoin .activity_completion_status').attr('src', '../../Images/ico_tabBlack.png');
                }

                ActivateMenu($('#div_menu_prejoin'));
                DeactivateMenu($('#div_menu_uploads'));
                DeactivateMenu($('#div_menu_postjoin'));
                activeMenuFlag = 1;
            }
            else if (processId == 2) {
                if (preJoiningCompletionStatus == 1) {
                    $('#div_menu_prejoin .activity_completion_status').attr('src', '../../Images/prejoining_greytick.png');
                }
                else {
                    $('#div_menu_prejoin .activity_completion_status').attr('src', '../../Images/ico_tabBlack.png');
                }

                if (postJoiningCompletionStatus == 1) {
                    $('#div_menu_postjoin .activity_completion_status').attr('src', '../../Images/prejoining_greentick.png');
                }
                else {
                    $('#div_menu_postjoin .activity_completion_status').attr('src', '../../Images/ico_alert2.gif');
                }
                ActivateMenu($('#div_menu_postjoin'));
                DeactivateMenu($('#div_menu_uploads'));
                DeactivateMenu($('#div_menu_prejoin'));
                activeMenuFlag = 2;



            }
        }
    }
    if ($('#hdnProcessId').val() == 2 && $('#hdnCountryId').val() == 3) {
        $('#nav1 a img').show();
        if ($('#hdnCandidateType').val() == 2)
            $('#nav1').css('margin-top', '35%');
    }
}

// $(".book").click(function () {
function bookViewClick() {

    ibook = 1;
    jbook = ibook - 1;
    $("#hdnView").val(2);

    $("#content_book").html(bookData);
    $('#tasks_book li:gt(2)').hide();

    //Navigator
    count = $("#tasks_book").children().length;
    pgno = Math.ceil(count / 3);
    var wid = 25;
    for (var i = 0; i < pgno; i++) {
        var img = new Image();
        img.src = "../../Images/greyball.png";
        $(img).attr('class', 'greyball');
        $(img).attr('id', 'greyball' + i);
        $(".navigators").append(img);
        $(".navigators").css('width', wid * i);
    }
    $("#greyball0").attr('src', '../../Images/greenball.png');

    $(".table_nh").hide();
    $(".thumbnailview").hide();
    $(".content_book").show();
    $(".page_two").hide();
    $(".page_one").show();
    //Old Code commented UF20130927
    /*
    $("#book").attr("src", "../../Images/bookb.png");
    $("#thumb").attr("src", "../../Images/thumbg.png");
    $("#list").attr("src", "../../Images/listg.png");
    */

    //CSS sprite UF20130927
    $("#book").css("background-position", "0px -124px");
    $("#thumb").css("background-position", "0px -62px");
    $("#list").css("background-position", "0px 0px");

    if (pgno > 1) {
        $(".leftscroll").show();
        $(".rightscroll").show();
        $("#next_book").attr('src', '../../Images/rightscroll.png');
        $("#previous_book").attr('src', '../../Images/lefthide.png');
    } else {
        $(".leftscroll").hide();
        $(".rightscroll").hide();
    }
    $(".thumbleftscroll").hide();
    $(".thumbrightscroll").hide();

    return;
}



// $("#list").click(function () {
function ListViewClick() {

    $("#hdnView").val(1);
    $("#List_View").html(ListData);


    $(".List_View").show();
    $(".thumbnailview").hide();
    $(".content_book").hide();


    //Old Code UF20130927
    /*
    $("#book").attr("src", "../../Images/bookg.png");
    $("#thumb").attr("src", "../../Images/thumbg.png");
    $("#list").attr("src", "../../Images/list.png");
    */

    //CSS sprite UF20130927
    $("#book").css("background-position", "0px -31px");
    $("#thumb").css("background-position", "0px -62px");
    $("#list").css("background-position", "0px -93px");

    $("#greenballb").attr("src", "../../Images/greenball.png");
    $("#greyball").attr("src", "../../Images/greyball.png");
    $(".leftscroll").hide();
    $(".rightscroll").hide();
    $(".thumbleftscroll").hide();
    $(".thumbrightscroll").hide();
    return;
}

function ThumViewClick() {
    $("#hdnView").val(3);
    ithumb = 1;
    jthumb = ithumb - 1;

    $("#thumbnailview").html(thumbkData);
    $('#tasks_thumb li:gt(8)').hide();

    //ThumbNail Navigators
    tcount = $("#tasks_thumb").children().length;
    tpgno = Math.ceil(tcount / 9);
    var wid = 25;

    for (var ti = 0; ti < tpgno; ti++) {
        var img = new Image();
        img.src = "../../Images/greyball.png";
        $(img).attr('class', 'tgreyball');
        $(img).attr('id', 'tgreyball' + ti);
        $(".thumbnavigators").append(img);
        $(".thumbnavigators").css('width', wid * ti);

    }
    $("#tgreyball0").attr('src', '../../Images/greenball.png');

    $(".table_nh").hide();
    $(".thumbnailview").show();
    $(".content_book").hide();

    //Old code UF20130927
    /*
    $("#book").attr("src", "../../Images/bookg.png");
    $("#thumb").attr("src", "../../Images/thumbnailb.png");
    $("#list").attr("src", "../../Images/listg.png");
    */

    //CSS sprite UF20130927
    $("#book").css("background-position", "0px -31px");
    $("#thumb").css("background-position", "0px -155px");
    $("#list").css("background-position", "0px 0px");

    $(".leftscroll").hide();
    $(".rightscroll").hide();

    if (tpgno > 1) {
        $(".thumbleftscroll").show();
        $(".thumbrightscroll").show();
        $("#next_thumbview").attr('src', '../../Images/rightscroll.png');
        $("#previous_thumbview").attr('src', '../../Images/lefthide.png');
    } else {
        $(".thumbleftscroll").hide();
        $(".thumbrightscroll").hide();
    }
    return;
}

function BookNext() {

    count = $("#tasks_book").children().length;
    pgno = Math.ceil(count / 3);
    if ($(".content_book").is(':visible')) {
        $("#previous_book").attr('src', '../../Images/leftscroll.png');
        //        var index = $("#tasks_book li").index($('li:visible'));
        var index = $("#tasks_book > :visible:first").index('#tasks_book > li');
        if ($('#tasks_book  > li:last-child').is(':visible')) {

            return;
        }
        else {
            $('#tasks_book  > li').hide().slice(index + 3, index + 6).show();
            $("#previous_book").mouseover(function () {
                $("#previous_book").attr('src', '../../Images/leftgreen.png');
            }).mouseout(function () {
                $("#previous_book").attr('src', '../../Images/leftscroll.png');
            });

            $("#greyball" + ibook).attr("src", "../../Images/greenball.png");
            $("#greyball" + jbook).attr("src", "../../Images/greyball.png");
            ibook++; jbook++;
            if (ibook == pgno) {
                $("#next_book").attr('src', '../../Images/righthide.png');
                $("#next_book").mouseover(function () {
                    $("#next_book").attr('src', '../../Images/righthide.png');
                }).mouseout(function () {
                    $("#next_book").attr('src', '../../Images/righthide.png');
                });
            }

        }
        $("#greenballb").attr("src", "../../Images/greyball.png");
    }
}

function ThumbNext() {
    tcount = $("#tasks_thumb").children().length;
    tpgno = Math.ceil(tcount / 9);
    if ($(".thumbnailview").is(':visible')) {
        $("#previous_thumbview").attr('src', '../../Images/leftscroll.png');

        // var index = $("#tasks_thumb li").index($('li:visible'));
        var index = $("#tasks_thumb > :visible:first").index('#tasks_thumb > li');
        if ($('#tasks_thumb  > li:last-child').is(':visible')) {

            return;
        }
        else {
            $('#tasks_thumb  > li').hide().slice(index + 9, index + 18).show();
            $("#previous_thumbview").mouseover(function () {
                $("#previous_thumbview").attr('src', '../../Images/leftgreen.png');
            }).mouseout(function () {
                $("#previous_thumbview").attr('src', '../../Images/leftscroll.png');
            });

            $("#tgreyball" + ithumb).attr("src", "../../Images/greenball.png");
            $("#tgreyball" + jthumb).attr("src", "../../Images/greyball.png");
            ithumb++; jthumb++;

            if (ithumb == tpgno) {
                $("#next_thumbview").attr('src', '../../Images/righthide.png');
                $("#next_thumbview").mouseover(function () {
                    $("#next_thumbview").attr('src', '../../Images/righthide.png');
                }).mouseout(function () {
                    $("#next_thumbview").attr('src', '../../Images/righthide.png');
                });
            }

        }
        $("#tgreenballb").attr("src", "../../Images/greyball.png");
    }
}

function BookPrevious() {
    if ($(".content_book").is(':visible')) {

        $("#next_book").mouseover(function () {
            $("#next_book").attr('src', '../../Images/rightgreen.png');
        }).mouseout(function () {
            $("#next_book").attr('src', '../../Images/rightscroll.png');
        });
        //var index = $("#tasks_book li").index($('li:visible'));        
        var index = $("#tasks_book > :visible:first").index('#tasks_book > li');
        if ($('#tasks_book  > li:first-child').is(':visible')) {
            return;
        }
        else {
            ibook--;
            jbook--;
            $("#next_book").attr('src', '../../Images/rightscroll.png');
            $('#tasks_book  > li').hide().slice(index - 3, index).show();
            $("#greyball" + ibook).attr("src", "../../Images/greenball.png");
            $("#greyball" + jbook).attr("src", "../../Images/greenball.png");
            $("#greyball" + ibook).attr("src", "../../Images/greyball.png");
            if (jbook == 0) {
                $("#previous_book").attr('src', '../../Images/lefthide.png');
                $("#previous_book").mouseover(function () {
                    $("#previous_book").attr('src', '../../Images/lefthide.png');
                }).mouseout(function () {
                    $("#previous_book").attr('src', '../../Images/lefthide.png');
                });
            }

        }
    }
}

function ThumbPrevious() {
    if ($(".thumbnailview").is(':visible')) {

        $("#next_thumbview").mouseover(function () {
            $("#next_thumbview").attr('src', '../../Images/rightgreen.png');
        }).mouseout(function () {
            $("#next_thumbview").attr('src', '../../Images/rightscroll.png');
        });

        // var index = $("#tasks_thumb li").index($('li:visible'));
        var index = $("#tasks_thumb > :visible:first").index('#tasks_thumb > li');
        if ($('#tasks_thumb  > li:first-child').is(':visible')) {
            return;
        }
        else {
            ithumb--;
            jthumb--;
            $("#next_thumbview").attr('src', '../../Images/rightscroll.png');
            $('#tasks_thumb  > li').hide().slice(index - 9, index).show();
            $("#tgreyball" + ithumb).attr("src", "../../Images/greenball.png");
            $("#tgreyball" + jthumb).attr("src", "../../Images/greenball.png");
            $("#tgreyball" + ithumb).attr("src", "../../Images/greyball.png");
            if (jthumb == 0) {
                $("#previous_thumbview").attr('src', '../../Images/lefthide.png');
                $("#previous_thumbview").mouseover(function () {
                    $("#previous_thumbview").attr('src', '../../Images/lefthide.png');
                }).mouseout(function () {
                    $("#previous_thumbview").attr('src', '../../Images/lefthide.png');
                });
            }

        }
    }
}

function loadWindow() {

    var popupStatus = 0;
    //loads popup only if it is disabled
    if (popupStatus == 0) {
        //            if (CountryId == 4) {
        //                $("#embedFlash").attr('src', 'ProcessTour/UK Onboarding Process Tour.swf');
        //                $("#movieFlash").value = "ProcessTour/UK Onboarding Process Tour.swf";
        //            }
        //            else {
        //                $("#embedFlash").attr('src', 'ProcessTour/intro_default.swf');
        //                $("#movieFlash").value = "ProcessTour/intro_default.swf";
        //            }
        var $backgroundOverLay = $('<div id="overLay"/>');
        $("body").prepend($backgroundOverLay);

        $("#overLay").css({
            "opacity": "0.7"
        });
        $("#overLay").show();

        //Close box
        var closeBox = '';
        videoHtml = videoHtml.replace("id=" + '"' + 'embedFlash' + '"' + "", "id=" + '"' + 'embedFlash' + '"' + "  src=" + '"' + FlashURL + '"' + " ");

        videoHtml = videoHtml.replace("id=" + '"' + 'movieFlash' + '"' + "", "id=" + '"' + 'movieFlash' + '"' + " value=" + '"' + FlashURL + '"' + " ");

        var $popupData = $('<div class="popupContactwrapper"/>').html(videoHtml).prepend(closeBox);
        $("body").prepend($popupData);
        $(".popupContactwrapper").show();
        popupStatus = 1;
    }
    centerPopup();


}
function centerPopup() {
    //request data for centering
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var windowWidth1 = '100%';
    var windowHeight1 = '100%';
    var popupHeight = $(".popupContactwrapper").height();
    var popupWidth = $(".popupContactwrapper").width();
    //centering
    $(".popupContactwrapper").css({
        "position": "absolute",
        "top": '30%',
        "left": '30%'
    });
}

function disablePopup() {
    //disables popup only if it is enabled
    $(".popupContactwrapper").empty().remove(); /*changed from hide() to remove*/
    $("#overLay").hide();
    popupStatus = 0;
}

function enablepopUp() {
    var $backgroundOverLay = $('<div id="overLay"/>');
    $("body").prepend($backgroundOverLay);

    $("#overLay").css({
        "opacity": "0.7"
    });
    $("#overLay").show();
}

function OpenChild(Url, TaskID) {
    if (Url == '../../CommonPages/PostQuery.htm') {
        if (CountryId == 3) {
            PostqueryConfirmationpopup();
        }
        else {
            OpenChildPop(Url, TaskID);
        }
    }
    else {
        OpenChildPop(Url, TaskID);
    }
}
function OpenChildPop(Url, TaskID) {
    var Path = Url + '?ss=' + sessionId + '&cand=' + CandidateID + '&task=' + TaskID + '&cntry=' + CountryId + '&EmailId=' + "'" + $("#hdnEmailId").val() + "'" + '&ToId=' + "'" + $("#hdnCountryEmailId").val() + "'";
    try {
        var width = 400;
        var height = 400;
        var left = (screen.width - width) / 2;
        var top = (screen.height - height) / 2;
        var params = 'width=' + width + ', height=' + height;
        params += ', top=' + top + ', left=' + left;
        params += ', directories=no';
        params += ', location=no';
        params += ', menubar=no';
        params += ', resizable=no';
        params += ', scrollbars=no';
        params += ', status=no';
        params += ', toolbar=no';
        params += ', titlebar=no';

        childWin = window.open(Path, "Popup", params);
        var popupStatus = 0;
        //loads popup only if it is disabled
        if (popupStatus == 0) {
            var $backgroundOverLay = $('<div id="overLay"/>');
            $("body").prepend($backgroundOverLay);
            $("#overLay").css({ "opacity": "0.7" });
            $("#overLay").show();
            popupStatus = 1;
        }
    } catch (err) { }
}
function PostqueryConfirmationpopup() {
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var $backgroundOverLay = $('<div id="overLay"/>');
    $("body").prepend($backgroundOverLay);
    $("#overLay").css({
        "opacity": "0.7"
    });
    $("#overLay").show();
    var $popupContent = '<div class="pop_wrapper" style="width:268px;position: relative;">';
    $popupContent += '<div class="close" onclick="SurveyPopupWindow(0,0);">';
    $popupContent += '</div><div class="pop_content_wrapper" style="background:white; height:185px; width:300px; float:left;"><p class="welcome" style="font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#fefefe; margin: 10px 0 10px 10px; float:left;">';
    $popupContent += '<p class="note_head" style="font-size:15px; color:#191919; margin: 50px 0 0 23px;"><a id="FaqLink" href="#">View FAQ\'s</a> before posting your query</p>';
    $popupContent += '<p class="note_head" style="font-size:15px; color:#191919; margin: 20px 0 0 50px;">Click Ok to post your query </p><br /><input  type="button" id="postok" class="btns popup_btn" value="OK" style="height:20px; width:60px; border:1px solid #767676; cursor:pointer;margin-right:10px;margin-left:60px;;margin-top:30px;float:left;"/>';
    $popupContent += '<input  type="button" id="postcancel" class="btns popup_btn" value="Cancel" style="height:20px; width:60px; border:1px solid #767676; cursor:pointer;margin-right:10px;margin-left:20px;margin-top:30px;float:left;"/></div>';
    $popupContent += '</div></div>';
    var $popupData = $('<div class="wrapper_landing"/>').html($popupContent);
    $("body").prepend($popupData);
    $(".wrapper_landing").css({
        "position": "absolute",
        "top": windowHeight / 2 - 200,
        "left": windowWidth / 2 - 200,
        "z-index": "999999999"
    });
    document.getElementById('FaqLink').onclick = function (e) {
        $("#overLay").remove();
        $(".wrapper_landing").remove();
        OpenPop('../../CommonPages/FAQ.htm', 0);

        return false;
    }
    document.getElementById('postok').onclick = function (e) {
        $("#overLay").remove();
        $(".wrapper_landing").remove();
        OpenChildPop('../../CommonPages/PostQuery.htm', 0);

        return false;
    }
    document.getElementById('postcancel').onclick = function (e) {
        $("#overLay").remove();
        $(".wrapper_landing").remove();
        return false;
    }
    $(".wrapper_landing").show();

}
function OpenExternalLink(Url) {
    window.open(Url, '_blank', 'fullscreen=no');
}
function OpenPop(Url, TaskID) {
    var Path = Url + '?ss=' + sessionId + '&cand=' + CandidateID + '&task=' + TaskID + '&cntry=' + CountryId;
    try {
        var width = 970;
        var height = 700;
        var left = (screen.width - width) / 2;
        var top = (screen.height - height) / 2;
        var params = 'width=' + width + ', height=' + height;
        params += ', top=' + top + ', left=' + left;
        params += ', directories=no';
        params += ', location=no';
        params += ', menubar=no';
        params += ', resizable=no';
        params += ', scrollbars=yes';
        params += ', status=no';
        params += ', toolbar=no';

        childWin = window.open(Path, "Popup", params);
        var popupStatus = 0;
        //loads popup only if it is disabled
        if (popupStatus == 0) {
            var $backgroundOverLay = $('<div id="overLay"/>');
            $("body").prepend($backgroundOverLay);

            $("#overLay").css({
                "opacity": "0.7"
            });
            $("#overLay").show();
            popupStatus = 1;
        }
    } catch (err) { }
}
// for NA Payroll app
function OpenPopNA(Url, TaskID) {
    var Path = Url + '?ss=' + sessionId + '&cand=' + CandidateID + '&task=' + TaskID + '&cntry=' + CountryId;
    try {
        var width = 550;
        var height = 786;
        var left = (screen.width - width) / 2;
        var top = (screen.height - height) / 2;
        var params = 'width=' + width + ', height=' + height;
        params += ', top=' + top + ', left=' + left;
        params += ', directories=no';
        params += ', location=no';
        params += ', menubar=no';
        params += ', resizable=no';
        params += ', scrollbars=no';
        params += ', status=no';
        params += ', toolbar=no';

        childWin = window.open(Path, "Popup", params);
        var popupStatus = 0;
        //loads popup only if it is disabled
        if (popupStatus == 0) {
            var $backgroundOverLay = $('<div id="overLay"/>');
            $("body").prepend($backgroundOverLay);

            $("#overLay").css({
                "opacity": "0.7"
            });
            $("#overLay").show();
            popupStatus = 1;
        }
    } catch (err) { }
}

function OpenFloat(Url) {
    var Path = Url + '?ssid=' + sessionId + '&cand=' + CandidateID + '&cntry=' + CountryId + '&opmde=0&rgid=' + roleGroupId + '&roleid=' + roleId;
    try {
        var width = 970;
        var height = 600;
        var left = (screen.width - width) / 2;
        var top = (screen.height - height) / 2;
        var params = 'width=' + width + ', height=' + height;
        params += ', top=' + top + ', left=' + left;
        params += ', directories=no';
        params += ', location=no';
        params += ', menubar=no';
        params += ', resizable=no';
        params += ', scrollbars=yes';
        params += ', status=no';
        params += ', toolbar=no';

        childWin = window.open(Path, "Popup", params);
        var popupStatus = 0;
        //loads popup only if it is disabled
        if (popupStatus == 0) {
            var $backgroundOverLay = $('<div id="overLay"/>');
            $("body").prepend($backgroundOverLay);

            $("#overLay").css({
                "opacity": "0.7"
            });
            $("#overLay").show();
            popupStatus = 1;
        }
    } catch (err) { }
}

function OpenPopAlert() {
    var taskName = recommendedtask.split('</b>');
    MsgboxAlert(sessionId, 2, 0, null, 'Please submit the ' + taskName[1] + ' first to submit this form');

}

function Survey(Url, TaskID) {
    var Path = Url + '?ss=' + sessionId + '&cand=' + CandidateID + '&task=' + TaskID + '&cntry=' + CountryId;
    try {
        var width = 970;
        var height = 700;
        var left = (screen.width - width) / 2;
        var top = (screen.height - height) / 2;
        var params = 'width=' + width + ', height=' + height;
        params += ', top=' + top + ', left=' + left;
        params += ', directories=no';
        params += ', location=no';
        params += ', menubar=no';
        params += ', resizable=no';
        params += ', scrollbars=yes';
        params += ', status=no';
        params += ', toolbar=no';

        childWin = window.open(Path, "Popup", params);
        var popupStatus = 0;
        //loads popup only if it is disabled
        if (popupStatus == 0) {
            var $backgroundOverLay = $('<div id="overLay"/>');
            $("body").prepend($backgroundOverLay);

            $("#overLay").css({
                "opacity": "0.7"
            });
            $("#overLay").show();
            popupStatus = 1;
        }
    } catch (err) { }
}
function OpenSamplePop(Url) {
    var Path = Url;
    try {
        var width = 970;
        var height = 700;
        var left = (screen.width - width) / 2;
        var top = (screen.height - height) / 2;
        var params = 'width=' + width + ', height=' + height;
        params += ', top=' + top + ', left=' + left;
        params += ', directories=no';
        params += ', location=no';
        params += ', menubar=no';
        params += ', resizable=no';
        params += ', scrollbars=no';
        params += ', status=no';
        params += ', toolbar=no';

        childWin = window.open(Path, "Popup", params);
    } catch (err) { }

}

var flag = 0;
/* changed the even from mouseenter to mouse over and mouseleave to mouseout - SIT bug fix*/
function tabHover() {
    $("#div_menu_uploads").hover(function () {
        if (flag != 0) {
            ActivateMenu($(this));
        }
    }, function () {
        if (flag != 0) {
            DeactivateMenu($(this));
        }
    });

    $("#div_menu_prejoin").hover(function () {
        if (flag != 1) {
            ActivateMenu($(this));
        }

    }, function () {
        if (flag != 1) {
            DeactivateMenu($(this));
        }
    });

    $("#div_menu_postjoin").hover(function () {
        if (flag != 2) {
            ActivateMenu($(this));
        }
    }, function () {
        if (flag != 2) {
            DeactivateMenu($(this));
        }
    });
}

function tabClick() {
    $("#div_menu_uploads").click(function () {
        ActivateMenu($('#div_menu_uploads'));
        DeactivateMenu($('#div_menu_prejoin'));
        DeactivateMenu($('#div_menu_postjoin'));
        flag = 0;
        $('#nav1 a img').hide();
    });

    $("#div_menu_prejoin").click(function () {
        ActivateMenu($('#div_menu_prejoin'));
        DeactivateMenu($('#div_menu_uploads'));
        DeactivateMenu($('#div_menu_postjoin'));

        flag = 1;
        $('#nav1 a img').hide();
    });

    $("#div_menu_postjoin").click(function () {
        ActivateMenu($('#div_menu_postjoin'));
        DeactivateMenu($('#div_menu_uploads'));
        DeactivateMenu($('#div_menu_prejoin'));
        flag = 2;
    });
}

var timerId;
var smoothBlink = function (object, interval) { $(object).fadeIn(interval, function () { $(object).fadeOut(interval / 4, function () { clearInterval(timerId); timerId = setInterval("smoothBlink(next_task," + interval + ");", 0); }); }); };
var blink = function () {
    $('#clsMckinley').css("borderColor", "#FF0000");
    $('#clsMckinley').animate({ borderColor: "#FFFF00" }, 'slow');
    $('#clsMckinley').animate({ borderColor: "#FF0000" }, 'slow', blink);
}


$(document).ready(function () {
    // if (parent.location.search != '' && (parent.location.search.substr(1).split('&'))[1].split('=')[0].toLowerCase() == 'surveytype') {
    //  SurveyPopupWindow(1,parseInt(parent.location.search.substr(1).split('&')[1].split('=')[1]));
    // }

    if (CountryId == 1 && DojComparer != 0) {

        if (DojComparer == 1 || DojComparer == 4) {
            //      $('#dynamic_text').text('Status: Ready to be initiated');
            $('#dynamic_text').text('   Urgent Action Required - Please Confirm Your Employment Start Now!');
            $('#NAPayRoll_Tab').click(function () {
                OpenPopNA('../../Roles/NHPages/Paperwork/US/StartDateExperianNAPayroll.htm', 745);
                // / <reference path="../Roles/NHPages/Paperwork/US/StartDateExperianNAPayroll.htm" /> (../../CommonPages/StartDateExperianNAPayroll.htm)

            });
        }
        else if (DojComparer == 2) {
            //  $('#NAPayRoll_nh').append('<div><span id="NAPaystatusimg">&nbsp;&nbsp;&nbsp;&nbsp;Click here On your date of joining<br/>status: Rejected<!--img src="../../Images/Call out.gif"  /--></span></div>');
            // $('#dynamic_text').text('Status: Pending for approval');
            $('#dynamic_text').text('      Your Employment Start Confirmation Request is Pending Approval!');
            var path = encodeURI('../../Images/Call-outPending.gif');    // for dynamically appending background image
            $('#NAPayRoll_Tab').css('background-image', 'url(' + path + ')');
            //            $('#NAPayRoll_Tab').css("background-image", "url('../Images/NACall-outSubmited.png')"
            //            ); /// <reference path="../Images/NACall-outSubmited.png" />
            $('#NAPayRoll_Tab').click(function () {
                MsgboxAlert(sessionId, 4, 219, 'NA_PAYROLL_PENDINGAPPROVAL', 'You have already initiated your employment start confirmation process and it is currently pending for approval with your Hiring Manager.');
            });
            // MsgboxAlert(sessionId, 5, 0, null, 'Details have have been submitted pending for approval');
        }
        else if (DojComparer == 3) {
            //if (daysLeft < 2) {
            $('#dynamic_text').text('Remember to confirm  your Employment Start Date on your actual joining day');

          //  }
          //  else {
          //      $('#dynamic_text').text('Remember to Confirm Your Employment Start in ' + daysLeft + ' days!');
         //   }
            $('#NAPayRoll_Tab').click(function () {
                MsgboxAlert(sessionId, 4, 220, 'NA_PAYROLL_CNTCNFMUNTILL_DOJ', 'You cannot confirm this information until your actual date of joining.  Please ensure you visit this page on your date of joining for employment start confirmation.');
            });
        }
        else if (DojComparer == 5) {
            $('#dynamic_text').text('Your Employment Start Confirmation is Approved'); //../../Images/NACall-outSubmited.png
            var path = encodeURI('../../Images/Call-outApproved.gif');
            $('#NAPayRoll_Tab').css('background-image', 'url(' + path + ')');
            $('#NAPayRoll_Tab').click(function () {
                MsgboxAlert(sessionId, 4, 0, null, 'This request has already been submitted and is confirmed by your Hiring Manager.Please reach out to your Recruiter, if any questions.');
            });
        }

    }
    $('#clsMckinley').click();
    $(".page_two").hide();
    $('#video').hide();
    $('#nho_pop').hide();
    $("#next_book").mouseover(function () {
        $("#next_book").attr('src', '../../Images/rightgreen.png');
    }).mouseout(function () {
        $("#next_book").attr('src', '../../Images/rightscroll.png');
    });
    $("#next_thumbview").mouseover(function () {
        $("#next_thumbview").attr('src', '../../Images/rightgreen.png');
    }).mouseout(function () {
        $("#next_thumbview").attr('src', '../../Images/rightscroll.png');
    });

    $(this).mouseover(function () {
        $(".toolTip").show();
    });
    $(this).mouseout(function () {
        $(".toolTip").hide();
    });

    var l = 0;

    $('a.taskInfo').mouseover(function () { /*Tooltip functionality for task in list view with fixed width*/
        var spanText = $(this).find('span');
        if (!($(spanText).text().length > 0)) {
            $(spanText).hide();
        }
    }).mouseout(function () {
        $(this).removeClass('a.info_hover');
    });

    $('a.info').mouseover(function () {/*Auto width calculation for tooltips - Generic functionality*/
        var spanText = $(this).find('span');
        l = ($(spanText).text().length) * 7;
        /*298015- Hover span width reduced for RA icon as exceeding limit*/
        //		if ($(spanText)[0].id == 'sRelAppTxt') {
        //			$(spanText).css('width', '130px').show();
        //		}
        //		else if ($(spanText)[0].id == 'NAPaystatusimg') {
        //			$(spanText).css('background-color', 'none').show();
        //			$(spanText).css('width', '130px').show();
        //		   
        //		}
        //		else {
        $(spanText).css('width', l + 'px').show();
        //}
    }).mouseout(function () {
        $(this).find('span').hide().width(0);
    });

    smoothBlink(next_task, 2000);
    blink();


});

/*Function to get current date*/
var getCurrentDate = function (el) {
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();

    var currDate = (('' + month).length < 2 ? '0' : '') + month + '/' + (('' + day).length < 2 ? '0' : '') + day + '/' + d.getFullYear();
    if ($(el).length > 0) {
        $(el)[0].value = currDate;
    }
}

function mckinleyWindow(url) {
    var popupStatus = 0;
    //loads popup only if it is disabled
    if (popupStatus == 0) {

        var $backgroundOverLay = $('<div id="overLay"/>');
        $("body").prepend($backgroundOverLay);

        $("#overLay").css({
            "opacity": "0.7"
        });

        $("#overLay").show();

        //Close box
        //        var closeBox = '<table  border="0" cellspacing="0" cellpadding="0" style="margin-top:-5px;width:99.5%"><tr><div style=" float:right;z-index:99999; "><img src="../../Images/pop_btnclose.gif" alt="close" onclick="disablePopupM()"  /></div></tr></table>';
        //        //Iframe Box

        // 0 -- Mckinley || 1 -- poll App
        if (url == 0) {
            var $popupContent = '../../Roles/NHPages/Paperwork/CommonNHPages/Mckinley/Mckinley.htm';
        }
        //Popup div Creation

        var htmlContent = "";
        htmlContent += '<div id="mcPopWindow" style="display:block;z-index:111111;position:relative; margin-top:-10px;">';
        htmlContent += '<table  border="0" cellspacing="0" cellpadding="0" style="margin-top:-5px;width:100%"><tr><div style=" float:right;z-index:99999; "><img src="../../Images/pop_btnclose.gif" alt="close" onclick="disablePopupM()"  /></div></tr></table>';
        htmlContent += '<div id="mcWindow" style="position:absolute;display:block;z-index:-11;margin-top:-8px;">';
        htmlContent += "<iframe id='iFrameLoader' width='940px' height='510px'  frameborder='0' scrolling='no' src='" + $popupContent + "'></iframe>";
        htmlContent += '</div></div>';


        //var $popupWindowData = $('<div id="mcWindow" style="position:absolute;display:block;z-index:-11;margin-top:-8px;"/>').load($popupContent);
        //        var $popupWindowData = $('<div id="mcWindow" style="position:absolute;display:block;z-index:-11;margin-top:-8px;"/>');
        //        var $popupData = $('<div id="mcPopWindow" style="display:block;z-index:111111;position:relative;"/>').html($popupWindowData).prepend(closeBox);
        //$("body").prepend($popupData);
        $("body").prepend(htmlContent);

        //   

        popupStatus = 1;
    }
    centerPopupM()

}
function centerPopupM() {
    //request data for centering
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;

    var popupHeight = $("#mcPopWindow").height();
    var popupWidth = $("#mcPopWindow").width();

    //centering
    $("#mcPopWindow").css({
        "position": "relative",
        "top": popupHeight + 10
        , "padding-left": 10
    });

    //only need force for IE6	
    $("#overLay").css({
        "height": windowHeight
    });
}

//disabling popup with jQuery magic!
function disablePopupM() {
    try {
        //blink();
        $("#mcPopWindow").empty().remove();
        $("#overLay").hide();

        popupStatus = 0;

    }
    catch (e) { }
}

function SurveyPopupWindow(url, surveyType) {
    var popupStatus = 0;
    if (url == 0) {
        $("#overLay").hide();
        $(".wrapper_landing").remove();
    } else {

        try {
            //loads popup only if it is disabled

            if (popupStatus == 0) {
                $(".wrapper_landing").remove();
                var surveyUrl = $('#hdnSurveyUrl').val();
                if ($('#overLay').length == 0) {
                    var $backgroundOverLay = $('<div id="overLay"/>');
                    $("body").prepend($backgroundOverLay);
                    $("#overLay").css({
                        "opacity": "0.7"
                    });
                }
                $("#overLay").show();

                if (surveyType != undefined) {
                    surveyUrl = surveyUrl.split('&surveyType=')[0] + '&surveyType=' + surveyType;
                }
                var closeBox = '<table width="102%" border="0" cellspacing="0" cellpadding="0" style="position:absolute;*width:102%;*margin-left:-20px;">';
                closeBox += '<tr><td style="border:none;"><a onclick="surveydisablePopup()" style="float:right;background:url(../../Images/Survey/close.png) no-repeat; width:25px; height:25px; border:none; outline:none; position:relative; z-index:100;"></a></td></tr>'
                closeBox += '</table>';
                //Iframe Box
                var $htmlContent = "<iframe id='iFrameLoader' class='surveyIframe' width='940px' height='510px'  frameborder='0' scrolling='no' src='" + surveyUrl + "' style='margin-top:15px;overflow:hidden;*margin-left:-5px;'></iframe>";

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
    //if (popupStatus == 1) {
    $("#overLay").hide();
    $(".suverypopupContactwrapper").remove();
    popupStatus = 0;
    window.updateWithNewData();
    // }
}


var confirmBox = function (url) {
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;

    var $backgroundOverLay = $('<div id="overLay"/>');
    $("body").prepend($backgroundOverLay);
    $("#overLay").css({
        "opacity": "0.7"
    });
    $("#overLay").show();
    //    var $popupContent = '<div style="float:left;width:96.8%;background:url(../../../../Images/Bg_Img_new.png) repeat-x top;text-align:center;padding:5px; font:bold 15px \'Trebuchet MS\', Arial, Helvetica, sans-serif; color:#FFF;"></div><div id="welcomPop"><div class="welcome-content"><p style="text-align:center;">Click ok to proceed survey</p>';
    //    $popupContent += '<p align="center" style="margin-bottom:5px;"><input type="submit" class="btn_field ok-wdt" name="button" id="button" value="Skip" onclick="SurveyPopupWindow(0)"/>&nbsp;<input type="submit" class="btn_field ok-wdt" name="button" id="Ok" value="Ok" onclick="SurveyPopupWindow(1)"/></p></div></div>'

    var $popupContent = '<div class="pop_wrapper" style="width:468px;position: relative;">';
    $popupContent += '<div class="close" onclick="SurveyPopupWindow(0,0);" style="background:url(../../images/Survey/close.png) no-repeat; height:30px; width:30px; float:right;cursor:pointer;  position: relative;right: -20px;top: 16px;">';
    $popupContent += '</div><div class="pop_content_wrapper" style="background:url(../../images/Survey/pop_bg.png) repeat-x; height:385px; width:468px; float:left;"><p class="welcome" style="font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#fefefe; margin: 10px 0 10px 10px; float:left;">';
    $popupContent += 'Welcome <span id="Name" style="font-weight:bold;">' + $('#Name').text() + '</span></p><div class="pop_content" style=" background:url(../../images/Survey/popup_content_bg.png) repeat-x;border:1px solid #000;width:450px; height:286px;  margin: 0 0 0 8px; float:left; clear:both;">';
    $popupContent += '<p class="note_head" style="font-size:26px; color:#191919; margin: 50px 0 0 23px;">We\'d like to hear from you!!!</p>';
    $popupContent += '<p class="feedback_note" style=" font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#3d3d3d; line-height: 24px;margin: 5px 0 0 25px;width: 74%; ">';
    $popupContent += 'Please share your <span style=" font-weight:bold; color:#226b1f;">feedback</span> by sparing 5 minutes of your valuable time.</p><img src="../../images/Survey/icon_bg.png" style="float:right;" /></div>';
    $popupContent += '<div class="btns" style="float:right; clear:both; margin: 9px 34px 0 -60px;font-weight:bold;font-size:12px;*margin-top:70%;"><input type="button" class="remind_me_clicked popup_btn" value="Remind Me Later" style="height:30px; width:132px; border:1px solid #767676; cursor:pointer;margin-right:10px;*float:left;"  onclick="SurveyPopupWindow(0,0);"/><input type="button" class="take_me_to_survey popup_btn" value="Take Me To The Survey" style="height:30px;border:1px solid #767676; width:155px;cursor:pointer;" onclick="SurveyPopupWindow(1,0)"/>';
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

window.loadSurveyPopUp = function () {
    if ($('#hdnSurveyAllowed').val() == 1) {
        if ($('#hdnAssocaiteId').val() == 0) {
            confirmBox($('#hdnSurveyUrl').val());
        }
    }
}

/*298015 - relocation app redirection*/
function redirectToRAapp() {
    //window.open('../../../../RelocationAssistance/HomePage.htm?ssid=' + sessionId + '&cndid=' + CandidateID + '&cntyid=' + CountryId + '', '_blank');
    //Redirection issue in SIT
    window.open('../../RelocationAssistance/HomePage.htm?ssid=' + sessionId + '&cndid=' + CandidateID + '&cntyid=' + CountryId + '', '_blank');
}
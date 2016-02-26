var OBQueryString = (function (a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=');
        if (p.length != 2) continue;
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));
var candidateid = parseInt(OBQueryString["cand"]);
var Processid = parseInt(OBQueryString["processid"]);
var candidatetype = parseInt(OBQueryString["candtype"]);
var countryid = parseInt(OBQueryString["cntry"]);
var opmde = parseInt(OBQueryString["opmde"]);
var SessionId = parseInt(OBQueryString["ssid"]);
var roleGroupId = parseInt(OBQueryString["rgid"]);
var RoleId = parseInt(OBQueryString["roleid"]);
var EmailId,
     DOJ,
     CandidateOfferStatus,
     DateIntimationStatus,
     CampusJoiningLocation,
     CampusReportingTime,
     CampusJoiningVenue,
     AttendanceStatusOnDOJ,
     IsAccessAllowed,
     AssetApproval,
     AssetApprovalFlag,
     RecruiterId,
     RecruiterName,
     HMComment,
     JoiningStatusRCShow,
     DOJConfirmRCShow,
     TaskStatus,
     TaskId,
     NotificationMasterId,
     ERRequestConfirm,
     ERRequestStatus,
     ERTaskURL,
     IsERTaskSubmitted,
     IsContractorflag,
     AssociateIdFlag,
     Score,
     RequestedDOJ,
     DojTaskId,
     CandidateComments,
     RcComments,
     DOJChangeDojFlag = 0,
     CompDoj,
     SmabvDOJ,
     ResendI9Mailval;

$().ready(function () {
    (function (b) { b.alerts = { verticalOffset: -75, horizontalOffset: 0, repositionOnResize: true, overlayOpacity: 0.7, overlayColor: "#000000", Color: "#FF9", bckgrdPopupColor: "#ffffff", draggable: false, okButton: "&nbsp;Yes&nbsp;", cancelButton: "&nbsp;No&nbsp;", dialogClass: null, Info: function (a) { b.alerts._show1("Information", a, null, "info", function (d) { }) }, Mandatory: function (a) { b.alerts._show1("Mandatory Fields", a, null, "info", function (d) { }) }, Warning: function (a) { b.alerts._show1("Warning", a, null, "warning", function (d) { }) }, Success: function (a) { b.alerts._show1("Success", a, null, "success", function (d) { }) }, Error: function (a) { b.alerts._show1("Error", a, null, "error", function (d) { }) }, Confirm: function (a, d) { b.alerts._show1("Confirmation", a, null, "confirm", d) }, Prompt: function (a, d) { b.alerts._show1("Prompt", a, d, "prompt", function (c) { }) }, Message: function (a) { b.alerts._show1("Message", a, null, "message", function (d) { }) }, SubmitSuccess: function (a) { b.alerts._show1("Success", a, null, "success", function (d) { window.close() }) }, _show1: function (k, m, e, j, a) { b.alerts._hide(); b.alerts._overlay("show"); if (k == "Message") { b("BODY").append('<div id="popup_container"><h1 id="popup_title" align="center"></h1><div id="popup_content"><div id="popup_message" style="padding:5px 5px 7px;border:0px;height:300px;border-color:blue;margin-left:0px;margin-right:10px;font-size:14;overflow:auto;"></div></div></div>') } else { b("BODY").append('<div id="popup_container"><h1 id="popup_title" align="center"></h1><div id="popup_content"><div id="popup_message" style="padding:5px 5px 7px;border:0px;height:150px;border-color:blue;margin-left:0px;margin-right:10px;font-size:14;overflow:auto;"></div></div></div>') } if (b.alerts.dialogClass) { b("#popup_container").addClass(b.alerts.dialogClass) } var l = b.browser.msie && parseInt(b.browser.version) <= 6 ? "absolute" : "fixed"; if (k == "Message") { b("#popup_container").css({ width: 700, height: "auto", position: l, zIndex: 99999, padding: 0, margin: 50, left: 400, background: b.alerts.bckgrdPopupColor }) } else { b("#popup_container").css({ width: 450, height: 300, position: l, zIndex: 99999, padding: 0, margin: 50, left: 400, background: b.alerts.bckgrdPopupColor }) } b("#popup_title").text(k); b("#popup_content").addClass(j); b("#popup_message").text(m); b("#popup_message").html(b("#popup_message").text().replace(/\n/g, "<br />")); b("#popup_container").css({ minWidth: b("#popup_container").outerWidth(), maxWidth: b("#popup_container").outerWidth() }); b.alerts._reposition(); b.alerts._maintainPosition(true); switch (j) { case "info": case "warning": case "success": case "error": case "message": b("#popup_message").after('<div id="popup_panel" valign:"vertical"><input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold; position:relative;" class="popup_Button" value="' + b.alerts.okButton + '" id="popup_ok" /></div>'); b("#popup_ok").click(function () { b.alerts._hide(); a(true) }); b("#popup_ok").focus().keypress(function (c) { if (c.keyCode == 13 || c.keyCode == 27) { b("#popup_ok").trigger("click") } }); break; case "confirm": b("#popup_message").after('<div id="popup_panel" valign:"vertical"><input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button"  value="' + b.alerts.okButton + '" id="popup_ok" /> <input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button"  value="' + b.alerts.cancelButton + '" id="popup_cancel" /></div>'); b("#popup_ok").click(function () { b.alerts._hide(); if (a) { a(true) } }); b("#popup_cancel").click(function () { b.alerts._hide(); if (a) { a(false) } }); b("#popup_ok").focus(); b("#popup_ok, #popup_cancel").keypress(function (c) { if (c.keyCode == 13) { b("#popup_ok").trigger("click") } if (c.keyCode == 27) { b("#popup_cancel").trigger("click") } }); break; case "prompt": b("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel" valign:"vertical"><input type="button"  style="background-color:Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button"  value="' + b.alerts.okButton + '" id="popup_ok" /> <input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button" value="' + b.alerts.cancelButton + '" id="popup_cancel" /></div>'); b("#popup_prompt").width(b("#popup_message").width()); b("#popup_ok").click(function () { var c = b("#popup_prompt").val(); b.alerts._hide(); if (a) { a(c) } }); b("#popup_cancel").click(function () { b.alerts._hide(); if (a) { a(null) } }); b("#popup_prompt, #popup_ok, #popup_cancel").keypress(function (c) { if (c.keyCode == 13) { b("#popup_ok").trigger("click") } if (c.keyCode == 27) { b("#popup_cancel").trigger("click") } }); if (e) { b("#popup_prompt").val(e) } b("#popup_prompt").focus().select(); break } if (b.alerts.draggable) { try { b("#popup_container").draggable({ handle: b("#popup_title") }); b("#popup_title").css({ cursor: "move", font: 15 }) } catch (n) { } } }, _hide: function () { b("#popup_container").remove(); b.alerts._overlay("hide"); b.alerts._maintainPosition(false) }, _overlay: function (a) { switch (a) { case "show": b.alerts._overlay("hide"); b("BODY").append('<div id="popup_overlay"></div>'); b("#popup_overlay").css({ position: "absolute", zIndex: 99998, top: "0px", left: "0px", width: "100%", height: b(window).height() - 100 + "px", background: b.alerts.overlayColor, opacity: b.alerts.overlayOpacity }); break; case "hide": b("#popup_overlay").remove(); break } }, _reposition: function () { var d = b(window).height() / 2 - b("#popup_container").outerHeight() / 2 + b.alerts.verticalOffset; var a = b(window).width() / 2 - b("#popup_container").outerWidth() / 2 + b.alerts.horizontalOffset; if (d < 0) { d = 0 } if (a < 0) { a = 0 } if (b.browser.msie && parseInt(b.browser.version) <= 6) { d = d + b(window).scrollTop() } b("#popup_container").css({ top: d + "px", left: a + "px" }); b("#popup_overlay").height(b(document).height()) }, _maintainPosition: function (a) { if (b.alerts.repositionOnResize) { switch (a) { case true: b(window).bind("resize", function () { b.alerts._reposition() }); break; case false: b(window).unbind("resize"); break } } } }, MsgboxInfo = function (a) { b.alerts.Info(a) }, MsgboxWarning = function (a) { b.alerts.Warning(a) }, MsgboxSuccess = function (a) { b.alerts.Success(a) }, MsgboxError = function (a) { b.alerts.Error(a) }, MsgboxConfirm = function (e, j, l, n, a, o) { var k = 2; try { if (l != 0) { b.ajax({ type: "POST", url: "../../../FormsService.aspx/GetMessage", data: "{'sessionId':" + e.toString() + ",'messageType':'" + k + "','messageId':" + l.toString() + ",'messageCode':'" + n + "', 'customMessageOnDBFail':'" + a + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false, cache: false, success: function (f) { var d = f.d.DisplayMessage.toString(); var c = f.d.DisplayType.toString(); var h = d.toString(); var g = c.toString(); if (l == 39) { g = "9" } switch (g) { case "6": b.alerts.Confirm(h, o); break; default: b.alerts.Info(h) } }, error: function (c, f, d) { b.alerts.Error(c.status + " - " + c.responseText) } }) } else { if (l == 0) { switch (j) { case 6: b.alerts.Confirm(a, o); break; default: b.alerts.Info(a) } } } } catch (m) { alert(m) } }, MsgboxPrompt = function (a, d) { b.alerts.Prompt(a, d) }, MsgboxAlert = function (e, j, l, m, a) { var k = 2; try { if (l != 0) { b.ajax({ type: "POST", url: "../../../FormsService.aspx/GetMessage", data: "{'sessionId':" + e.toString() + ",'messageType':'" + k + "','messageId':" + l.toString() + ",'messageCode':'" + m + "', 'customMessageOnDBFail':'" + a + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false, cache: false, success: function (f) { var d = f.d.DisplayMessage.toString(); var c = f.d.DisplayType.toString(); var h = d.toString(); var g = c.toString(); if (l == 39) { g = "9" } switch (g) { case "1": b.alerts.Success(h); break; case "2": b.alerts.Error(h); break; case "3": b.alerts.Warning(h); break; case "4": b.alerts.Info(h); break; case "5": b.alerts.Prompt(h); break; case "6": b.alerts.Confirm(h); break; case "7": b.alerts.Mandatory(h); break; case "8": b.alerts.Message(h); break; case "9": b.alerts.SubmitSuccess(h); break; default: b.alerts.Info(h) } }, error: function (c, f, d) { b.alerts.Error(c.status + " - " + c.responseText) } }) } else { if (l == 0) { switch (j) { case 1: b.alerts.Success(a); break; case 2: b.alerts.Error(a); break; case 3: b.alerts.Warning(a); break; case 4: b.alerts.Info(a); break; case 5: b.alerts.Prompt(a); break; case 6: b.alerts.Confirm(a); break; case 7: b.alerts.Mandatory(a); break; default: b.alerts.Info(a) } } } } catch (n) { alert(n) } }, MsgboxAlertDashboard = function (e, j, l, m, a) { var k = 2; try { if (l != 0) { b.ajax({ type: "POST", url: "../../../FormsService.aspx/GetMessage", data: "{'sessionId':" + e.toString() + ",'messageType':'" + k + "','messageId':" + l.toString() + ",'messageCode':'" + m + "', 'customMessageOnDBFail':'" + a + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false, cache: false, success: function (f) { var d = f.d.DisplayMessage.toString(); var c = f.d.DisplayType.toString(); var h = d.toString(); var g = c.toString(); switch (g) { case "1": b.alerts.Success(h); break; case "2": b.alerts.Error(h); break; case "3": b.alerts.Warning(h); break; case "4": b.alerts.Info(h); break; case "5": b.alerts.Prompt(h); break; case "6": b.alerts.Confirm(h); break; case "7": b.alerts.Mandatory(h); break; default: b.alerts.Info(h) } }, error: function (c, f, d) { b.alerts.Error(c.status + " - " + c.responseText) } }) } else { if (l == 0) { switch (j) { case 1: b.alerts.Success(a); break; case 2: b.alerts.Error(a); break; case 3: b.alerts.Warning(a); break; case 4: b.alerts.Info(a); break; case 5: b.alerts.Prompt(a); break; case 6: b.alerts.Confirm(a); break; case 7: b.alerts.Mandatory(a); break; default: b.alerts.Info(a) } } } } catch (n) { alert(n) } } })(jQuery);
    $("#divactions").hide().fadeIn(900);
    //    if (Processid == 1) {
    $("#divactions").show();
    //    }
    //    else {
    //        $("#divactions").hide();
    //    }
    FetchPrefillValues();
    /*commented as the data is not needed to bind the orientation dates   */
    //    //Binding joining dates for SM+ candidates for US
    //    if (roleGroupId == 1 || roleGroupId == 2) {
    //        var mastercodesInput = '{"mode":"56","parentcode":"0","candidateId":"' + candidateid + '"}'
    //        $("#EDOJ").empty();
    //        $.ajax({
    //            type: "POST",
    //            url: "../../../FormsService.aspx/GetGeographyMaster",
    //            data: mastercodesInput,
    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            async: false,
    //            success: function (msg) {
    //                $.each(msg.d, function (index, item) {
    //                    $("#EDOJ").get(0).options[index] = new Option(item.Description, item.ID);
    //                });
    //                //$("#EDOJ").selectedIndex = index;
    //            },
    //            error: function () {
    //                // alert("Failed to load JoiningStatus");
    //            }
    //        });
    //        $("#EDOJ option[value='" + SmabvDOJ + "']").attr('selected', true);
    //    }

    if (Score <= 45) {
        $('#reasonli').css({ 'width': '55%' });
        $('#reason').css({ 'margin-left': '62px' });
        $('#reason1').css({ 'margin-left': '0px' });
        $('#reasontxt').css({ 'margin-right': '70px' });
        $("#smabove").show();
        $("#smbelow").hide();
        //        $("#smbelowreason").hide();
        //        $("#smabovereason").show();
        $("#normaljoiner").hide();
        $("#smabovejoiner").show();
        $("#smabovedoj").val(DOJ);
        $("#smabovedoj").datepicker({ dateFormat: 'mm/dd/yy', showOn: "both", buttonImage: "../../../Images/calendar.png", buttonImageOnly: true, changeMonth: true, changeYear: true, buttonAfter: false, hideIfNoPrevNext: false, navigationAsDateFormat: true });
    }
    else {
        $("#smabove").hide();
        $("#smbelow").show();
        $("#smbelowreason").show();
        $("#smabovereason").hide();
        $("#normaljoiner").show();
        $("#smabovejoiner").hide();
        $("#ReqDOJInputBox").attr('disabled', true);
        $("#EDOJInputBox").datepicker({ dateFormat: 'mm/dd/yy', showOn: "both", buttonImage: "../../../Images/calendar.png", buttonImageOnly: true, changeMonth: true, changeYear: true, buttonAfter: false, hideIfNoPrevNext: false, navigationAsDateFormat: true });
    }


    //    if (roleGroupId == 1 || roleGroupId == 2) {
    //        //RCDashboard
    //        $("#divjoiningstatusNA").show();
    //    }
    //    else {
    //        //HRSS Dasboard
    //        $("#divjoiningstatusNA").show();
    //    }

    /*Disabling the Accept and Reject Button for Normal Hires if DOJ is before EDOJ-2*/
    if (CompDoj == 0) {
        $('#btn_acceptDOJ').attr('disabled', true);
        $('#btn_rejectDOJ').attr('disabled', true);
        $('#pg2_CandComments').attr('readonly', 'readonly');
        $('#txt_reason').attr('readonly', 'readonly');
        //$('#ReqDOJInputBox').removeClass('hasDatepicker');
        $('#ReqDOJInputBox').attr('disabled', true);
        $('#btn_acceptDOJ').css('cursor', 'default');
        $('#btn_rejectDOJ').css('cursor', 'default');
        $('#mandsign').hide();
    }

    /*Code Related to Equipment Request Form starts*/

    if ((TaskId == 18 || TaskId == 235 || TaskId == 28 || TaskId == 720 || TaskId == 721) || TaskId == 746 && (TaskStatus == 1)) {

        // $("#cancelERRequest").show();
        if ((ERRequestConfirm == 1) && (ERRequestStatus == 2)) {
            $("#holdERProcess").hide();
            $("#releaseERProcess").show();
        }
        if ((ERRequestConfirm == 1) && (ERRequestStatus == 1)) {
            $("#releaseERProcess").hide();
            $("#holdERProcess").show();
        }
        if ((ERRequestConfirm == 1) && (ERRequestStatus == 0)) {
            $("#holdERProcess").show();
        }
    }
    else {
        // $("#cancelERRequest").hide();
        $("#holdERProcess").hide();
        $("#releaseERProcess").hide();
    }

    $('#lnkfileuploadpopup').click(function () {
        OpenPopForFileUpload();
    });

    $('#btnUnsetapproval').click(function () {
        UpdateAssetApprovalStatus(0);
        FetchPrefillValues();
        showhidestatusflag();

    });

    $('#btnsetapproval').click(function () {
        UpdateAssetApprovalStatus(1);
        FetchPrefillValues();
        showhidestatusflag();
    });
    $('#ContractorERlink').click(function () {
        OpenERFile();
        showhidestatusflag();

    });

    /*Code Related to Equipment Request Form ends*/


    //    //Bind joiningStatus
    //    if (roleGroupId == 1 || roleGroupId == 2) {
    //        var mastercodesInput = '{"mode":"39","parentcode":"116","candidateId":"0"}'
    //        $("#JoiningStatusNA").empty();
    //        $.ajax({
    //            type: "POST",
    //            url: "../../../FormsService.aspx/GetGeographyMaster",
    //            data: mastercodesInput,
    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            async: false,
    //            success: function (msg) {
    //                $.each(msg.d, function (index, item) {
    //                    $("#JoiningStatusNA").get(0).options[$("#JoiningStatusNA").get(0).options.length] = new Option(item.Description, item.ID);
    //                });
    //                $("#JoiningStatusNA").selectedIndex = 1;
    //            },
    //            error: function () {
    //                // alert("Failed to load JoiningStatus");
    //            }
    //        });
    //        $("#txtDojconfirmComment").val(HMComment);
    //       // $("#JoiningStatusNA option[value=" + AttendanceStatusOnDOJ + "]").attr("selected", "selected");
    //    }
    // ShowjoiningstatusDojConfirm();

    // $("#EDOJInputBox").datepicker({ dateFormat: 'mm/dd/yy', showOn: "both", buttonImage: "../../../Images/calendar.png", buttonImageOnly: true, changeMonth: true, changeYear: true, buttonAfter: false, hideIfNoPrevNext: false, navigationAsDateFormat: true });


    //    if (CompDoj != 2) {
    //        $("#ReqDOJInputBox").datepicker({ dateFormat: 'mm/dd/yy', showOn: "both", buttonImage: "../../../Images/calendar.png", buttonImageOnly: true, changeMonth: true, changeYear: true, buttonAfter: false, hideIfNoPrevNext: false, navigationAsDateFormat: true });
    //    }
    $("#divlateral").css('padding-top', '7px');
    $("#emailid").val(EmailId);
    $("#EDOJInputBox").val(SmabvDOJ);
    $("#divLateral").show();
    if (RequestedDOJ != undefined) {

        if (Score <= 45) {
            //$("#EDOJ option[value='" + RequestedDOJ + "']").attr('selected', true);
            $('#txt_Orientatndte').val(RequestedDOJ);
        }
        else {
            $("#ReqDOJInputBox").val(RequestedDOJ);
        }
    }
    else {
        if (Score <= 45) {
            $("#EDOJ option[value='" + DOJ + "']").attr('selected', true);
        }
        else {
            $("#ReqDOJInputBox").val(SmabvDOJ);
        }
    }
    $("#pg2_CandComments").val(CandidateComments);

    $("#txt_reason").val(HMComment);
    //  $("#EDOJInputBoxPayRl").val(DOJ);
    showhidestatusflag();

    //update candidateInfo
    $('#btnApplyLateral').click(function () {
        UpdateCandidateInfo();
        FetchPrefillValues();
        //SelectionJoiningStatus();
        // ShowjoiningstatusDojConfirm();
    });

    //    $('#btn_acceptDOJ').click(function () {
    //        MsgboxConfirm(SessionId, 6, 218, 'ACTION_POPUP_ACCEPTDOJ_NA', "Is the Expected date of Joining Same as Orientation Date?", callback);

    //    });

});


/*function to validate EmailId*/
function ValidateEmail(mailid) {
    var str = mailid
    var filter = /^.+@.+\..{2,3}$/
    var flag

    if (filter.test(str)) {
        flag = true;
        //return true;
    }
    else {
        MsgboxAlertDashboard(23, 2, 28, "EMAIL_ID_VALIDATE", "Enter Valid E-Mail Id");
        flag = false;
        //return false;
    }
    return flag;
}

/*Updating CandidateDetails to db:On submit button click*/
function UpdateCandidateInfo() {
    var candidateValue;
    var dojValue;
    var emailidValue;
    var ResendMailval;
    var OrgEmailIdval;
    var getdivid = document.getElementById('msg').id;
    var getdivid1 = document.getElementById('msgunlock').id;
    var joiningStatus = $("#JoiningStatusNA").val();
    var RCComment = $("#txtDojconfirmComment").val();

    if (candidateid != null) {
        candidateValue = candidateid;
    }
    else {
        candidateValue = "";
    }

    if (Score <= 45) {
        if (document.getElementById('EDOJ') != null) {
            dojValue = document.getElementById('EDOJ')[document.getElementById('EDOJ').selectedIndex].innerHTML;
        }
        else {
            dojValue = "";
        }
    }
    else {
        if (document.getElementById('EDOJInputBox') != null) {
            dojValue = document.getElementById('EDOJInputBox').value;
        }
        else {
            dojValue = "";
        }
    }
    if (document.getElementById('emailid') != null) {
        emailidValue = document.getElementById('emailid').value;
        var flag = ValidateEmail(emailidValue);
    }
    else {
        emailidValue = "";
    }
    if (document.getElementById('hdnEmailId') != null) {
        OrgEmailIdval = document.getElementById('hdnEmailId').value;
    }
    else {
        OrgEmailIdval = "";
    }
    if (document.getElementById('ResendCheckbox').checked == true) {
        if (OrgEmailIdval == emailidValue) {
            ResendMailval = 1
        }
        else {
            ResendMailval = 2
        }
    }
    else {
        ResendMailval = 0
    }
    if (document.getElementById('ResendI9Checkbox').checked == true) {
        ResendI9Mailval = 1;
    }
    else {
        ResendI9Mailval = 0;
    }
    if (RCComment != null) {
        RCComment = $("#txtDojconfirmComment").val();
    }
    else {
        RCComment = "";
    }
    if (joiningStatus != null) {
        joiningStatus = $("#JoiningStatusNA").val();
    }
    else {
        joiningStatus = 0;
    }
    if (flag == true) {

        var inputData = '{ "candidate":"' + candidateValue + '","candidateDOJ" : "' + dojValue + '","emailId" : "' + emailidValue + '","resendMail":"' + ResendMailval + '","joiningStatus":"' + joiningStatus + '","rccomment":"' + RCComment + '","resendI9Mail":"' + ResendI9Mailval + '","mode" :"1"}'; ;

        $.ajax({
            type: "POST",
            url: "../../../DashboardService.aspx/UpdateCandidateData",
            data: inputData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: '',
            error: ''
        });
        document.getElementById(getdivid).style.display = "block";
        document.getElementById(getdivid1).style.display = "none";
        $("#msgConfirmdoj").hide();

    }
    else {
        document.getElementById(getdivid).style.display = "none";
        document.getElementById(getdivid1).style.display = "none";
        $("#msgConfirmdoj").hide();
    }
}

//Contractor ER file popup
function OpenERFile() {
    //    if (IsQuerystringrequired == "1") {
    var Path = '../' + ERTaskURL + '?ss=' + SessionId + '&cand=' + candidateid + '&task=' + TaskId + '&cntry=' + countryid + '&opmde=' + opmde;
    //    }
    //    else {
    //        var Path = '../NHPages/Paperwork/CommonNHPages/UrlPopUp.htm?PopUp=' + ERTaskURL;
    //    }

    try {
        var width = 950;
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
        var popupStatus = 0;
        //loads popup only if it is disabled
        //if (IsOverlayrequired == "1") {
        var $backgroundOverLay = $('<div id="overLay"/>');
        $("body").prepend($backgroundOverLay);
        $("#overLay").css({
            "opacity": "0.7"
        });
        $("#overLay").show();
        popupStatus = 1;
        //}

    } catch (err) { }
}

// file upload ERprocessRC
function OpenPopForFileUpload() {
    var candidateValue;
    if (candidateid != null) {
        candidateValue = candidateid;
    }
    else {
        candidateValue = "";
    }
    var Path = '../../../CommonPages/UploadFileDashboard.aspx?cand=' + candidateValue + '&IsCont=' + IsContractorflag;

    try {
        var width = 500;
        var height = 360;
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
        //var popupStatus = 0;
        //loads popup only if it is disabled
        var $backgroundOverLay = $('<div id="overLay"/>');
        $("body").prepend($backgroundOverLay);
        $("#overLay").css({
            "opacity": "0.7"
        });
        $("#overLay").show();
        //popupStatus = 1;

    } catch (err) { }
}

function disablePopup() {
    //disables popup only if it is enabled
    $("#overLay").hide();
    $(".popupContactwrapper").hide();
}

/*Asset Approval status*/
function UpdateAssetApprovalStatus(flagstatus) {
    var candidateValue;
    var statusValue;

    if (candidateid != null) {
        candidateValue = candidateid;
    }
    else {
        candidateValue = "";
    }

    if (flagstatus != null) {
        statusValue = flagstatus;
    }
    else {
        statusValue = "";
    }
    var inputData = '{ "candidate":"' + candidateValue + '","assetApprovalStatus" :"' + statusValue + '"}';

    $.ajax({
        type: "POST",
        url: "../../../DashboardService.aspx/UpdateAssetApprovalStatus",
        data: inputData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: '',
        error: ''
    });

}


/*function called after fetching prefill values */
function FetchPrefillvaluesdata(result) {
    var xmldata = ParsexmlDOM(result.d);
    $(xmldata).find('Table').each(function () {

        EmailId = $.trim($(this).find('EmailId').text());
        SmabvDOJ = $.trim($(this).find('DOJ').text()); //doj from candidateTransaction
        DOJ = $.trim($(this).find('DOJ').text()); //doj from candidateTransaction
        CandidateOfferStatus = $(this).find('CandidateOfferStatus').text();
        DateIntimationStatus = $(this).find('DateIntimationStatus').text();
        CampusJoiningLocation = $(this).find('CampusJoiningLocation').text();
        CampusReportingTime = $(this).find('CampusReportingTime').text();
        CampusJoiningVenue = $.trim($(this).find('CampusJoiningVenue').text());
        AttendanceStatusOnDOJ = $(this).find('AttendanceStatusOnDOJ').text();
        IsAccessAllowed = $(this).find('IsAccessAllowed').text();
        AssetApproval = $(this).find('AssetApproval').text();
        AssetApprovalFlag = $(this).find('AssetApprovalFlag').text();
        HMComment = $(this).find('HMComment').text();
        DOJConfirmRCShow = $(this).find('DOJConfirmRCShow').text();
        JoiningStatusRCShow = $(this).find('JoiningStatusRCShow').text();
        AttendanceStatusOnDOJ = $(this).find('AttendanceStatusOnDOJ').text();
        ERRequestConfirm = $(this).find('ERRequestConfirm').text();
        ERRequestStatus = $(this).find('ERRequestStatus').text();
        Score = $.trim($(this).find('Score').text());
        if (countryid == 1 || countryid == 2) {
            IsERTaskSubmitted = $(this).find('IsERTaskSubmitted').text();
            IsContractorflag = $(this).find('IsContractor').text();
            if (IsContractorflag == 1) {
                ERTaskURL = $(this).find('ERTaskURL').text();
                TaskId = $(this).find('TaskId').text();
                AssociateIdFlag = $(this).find('AssociateIdFlag').text();
            }
            else { ERTaskURL = ''; }
        }
    });
    $(xmldata).find('Table4').each(function () {
        TaskId = $(this).find('TaskId').text();
        TaskStatus = $(this).find('TaskStatus').text();
        NotificationMasterId = $(this).find('NotificationMasterId').text();
    });
    $(xmldata).find('Table5').each(function () {
        RequestedDOJ = $(this).find('RequestedDOJ').text();
        //        if (RequestedDOJ == '' || RequestedDOJ == undefined) {
        //            RequestedDOJ = DOJ; /*updating doj from CandiadteTransaction*/
        //        }
        CandidateComments = $(this).find('CandidateComments').text();
        DojTaskId = $(this).find('TaskId').text();
        DOJChangeDojFlag = $(this).find('DOJChangeDojFlag').text();
        CompDoj = $(this).find('CompDoj').text();
    });

}

function ParsexmlDOM(data) {
    var xml;
    try {
        if ($.browser.msie) {
            xml = new ActiveXObject("Microsoft.XMLDOM");
            xml.async = "false";
            xml.loadXML(data);
        }
        else {
            xml = $.parseXML(data);
        }
    }
    catch (e) {
        xml = undefined;
    }
    if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
        jQuery.error("Invalid XML: " + data);
    }
    return xml;
}

/*Fetching Prefill Values */
function FetchPrefillValues() {
    $.ajax({
        type: "POST",
        url: "../../../DashboardService.aspx/FetchCandidatesPrefillvalues",
        data: "{candidateID:'" + candidateid + "',associateID:''}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: FetchPrefillvaluesdata,
        error: function () {
            //alert("Failed to load");
        }
    });


}

function showhidestatusflag() {
    if (AssetApprovalFlag == 1) {
        if (AssetApproval == 1) {

            $("#btnUnsetapproval").show();
            $("#btnsetapproval").hide();

            if (IsContractorflag == 1) {
                if (AssociateIdFlag == 1) {
                    $("#divContractorERlink").hide();
                    $("#divapprovalflagbutton").hide();
                    $("#divfileuploadlink").hide();
                }
                else {
                    if (IsERTaskSubmitted == 1) {
                        $("#divfileuploadlink").show();
                    }
                    else {
                        $("#divfileuploadlink").hide();
                    }
                    $("#divContractorERlink").show();
                    $("#divapprovalflagbutton").show();
                }
            }
            else {
                $("#divContractorERlink").hide();
                $("#divfileuploadlink").show();
                $("#divapprovalflagbutton").show();
            }

        }
        else {

            $("#btnUnsetapproval").hide();
            if (IsContractorflag == 1) {
                if (AssociateIdFlag == 1) {
                    $("#btnsetapproval").hide();
                    $("#divapprovalflagbutton").hide();
                }
                else {
                    $("#btnsetapproval").show();
                    $("#divapprovalflagbutton").show();
                }
            }
            else {
                $("#btnsetapproval").show();
                $("#divapprovalflagbutton").show();
            }
            $("#divContractorERlink").hide();
            $("#divfileuploadlink").hide();

        }
    }
    else {
        $("#divapprovalflagbutton").hide();
    }
}

//function showhidestatusflag() {
//    if (AssetApprovalFlag == 1) {
//        if (AssetApproval == 1) {
//            $("#divapprovalflagbutton").show();
//            $("#btnUnsetapproval").show();
//            $("#btnsetapproval").hide();
//            $("#divContractorERlink").show();
//            $("#divfileuploadlink").show();
//          
//        }
//        else {
//            $("#divapprovalflagbutton").show();
//            $("#btnUnsetapproval").hide();
//            $("#btnsetapproval").show();
//            $("#divContractorERlink").hide();
//            $("#divfileuploadlink").hide();
//          
//        }
//    }
//    else {
//        $("#divapprovalflagbutton").hide();
//    }
//}

//function ShowjoiningstatusDojConfirm() {
//    if (JoiningStatusRCShow == 1) {
//        $("#JoiningStatusNA").show();
//        $("#lblJoiningstatu").show();


//        var joingingStatus = $("#JoiningStatusNA").val();
//        if (joingingStatus == 2) {
//            $("#lblJoiningcomment").show();
//            $("#txtDojconfirmComment").show();
//        }
//        else {
//            $("#lblJoiningcomment").hide();
//            $("#txtDojconfirmComment").hide();
//        }

//    }
//    else {
//        $("#JoiningStatusNA").hide();
//        $("#lblJoiningstatu").hide();
//        $("#lblJoiningcomment").hide();
//        $("#txtDojconfirmComment").hide();

//    }
//    if (DOJConfirmRCShow == 1) {
//        $("#dojconfirm").show();
//        $("divjoiningstatusNA").show();
//    }
//    else {
//        $("#dojconfirm").hide();
//        $("divjoiningstatusNA").hide();
//        $("#txtDojconfirmComment").hide();
//        $("#lblJoiningcomment").hide();

//    }


//}

//313277
//added fro ER cancel Request
//function CancelERRequest(candidateid) {
//    var Cancel = confirm("Are you sure to send a mail to notify NSS to cancel ER request?")
//    if (Cancel == true) {
//        if (candidateid != null) {
//            candidateValue = candidateid;
//        }
//        else {
//            candidateValue = "";
//        }

//        if (countryid != null) {
//            countryid = countryid;
//        }
//        else {
//            countryid = "";
//        }

//        if (NotificationMasterId != null) {
//            NotificationMasterId = 172;
//        }
//        else {
//            NotificationMasterId = "";
//        }

//        var inputData = '{ "candidateid":"' + candidateValue + '", "countryId":"' + countryid + '", "NotificationMasterId":"' + NotificationMasterId + '"}';
//        $.ajax({
//            type: "POST",
//            url: "../../../DashboardService.aspx/CancelERRequest",
//            data: inputData,
//            contentType: "application/json; charset=utf-8",
//            dataType: "json",
//            async: false,
//            success: function (msg) {
//                if (msg.d == 1) {
//                    SuccessER()
//                }
//                else {
//                    //alert("Failed to update")
//                }
//            },
//            error: AjaxFailed
//        });
//    }
//    else {
//        return false;
//    }
//}


//312539 ER Process hold
function HoldERRequest(candidateid) {
    var holdERprocess = confirm("Are you sure want to hold ER Request a mail notify NSS Manager?")
    if (holdERprocess == true) {
        if (candidateid != null) {
            candidateValue = candidateid;
        }
        else {
            candidateValue = "";
        }

        var retTaskStatus = 0;
        var data = "{";
        data += "'sessionId':" + SessionId + ",";
        data += "'candidateId':" + candidateid + ",";
        data += "'taskId':" + TaskId + ",";
        data += "'erprocess':" + 2 + ",";
        data += "'saveMode':" + 0 + "";
        data += "}";

        $.ajax({
            type: "post",
            async: false,
            url: "../../../DashboardService.aspx/SaveConfirmationERprocess",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                retTaskStatus = msg.d;
            },
            error: function (xhr, status, textRemarks) { alert("Error " + xhr.status + " " + textRemarks); }
        });
        HoldReleaseShoeHide();
    }
    else {
        return false;
        HoldReleaseShoeHide();
    }
}

function ReleaseERRequest(candidateid) {
    var ReleaseRprocess = confirm("Are you sure to release ER Request a mail notify NSS Manager?")
    if (ReleaseRprocess == true) {
        if (candidateid != null) {
            candidateValue = candidateid;
        }
        else {
            candidateValue = "";
        }
        var retTaskStatus = 0;
        var data = "{";
        data += "'sessionId':" + SessionId + ",";
        data += "'candidateId':" + candidateid + ",";
        data += "'taskId':" + TaskId + ",";
        data += "'erprocess':" + 1 + ",";
        data += "'saveMode':" + 0 + "";
        data += "}";

        $.ajax({
            type: "post",
            async: false,
            url: "../../../DashboardService.aspx/SaveConfirmationERprocess",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                retTaskStatus = msg.d;
            },
            error: function (xhr, status, textRemarks) { alert("Error " + xhr.status + " " + textRemarks); }
        });
        HoldReleaseShoeHide();

    }
    else {
        return false;
        HoldReleaseShoeHide();
    }
}

//added 312539 : DOJ confirmation RC fro NA
/*Function called when Accept or Reject Button is clicked*/
//confirmstatus 1-->Confirmed 2-->Rejected
function DOJConfirm(candidateid, confirmstatus) {
    if (candidateid != null) {
        candidateValue = candidateid;
    }
    else {
        candidateValue = "";
    }
    if (confirmstatus != null) {
        confirmstatus = confirmstatus;
    }
    else {
        confirmstatus = "";
    }
    if (DojTaskId != null && DojTaskId != "") {
        DojTaskId = DojTaskId;
    }
    else {
        DojTaskId = 0;
    }
    if (document.getElementById('txt_reason') != null) {
        RcComments = document.getElementById('txt_reason').value;
    }
    else {
        RcComments = "";
    }
    /*for sm below Candidate*/

    if (Score <= 45) {

        if (document.getElementById('smabovedoj') != null) {
            dojValue = document.getElementById('smabovedoj').value;
        }
        else {
            dojValue = DOJ;
        }

    }
    else {
        if (document.getElementById('ReqDOJInputBox') != null) {
            dojValue = document.getElementById('ReqDOJInputBox').value;
        }
        else {
            dojValue = SmabvDOJ;
        }
    }
    if (confirmstatus != 2) {
        var inputData = '{ "candidateid":"' + candidateValue + '","confirmstatus" : "' + confirmstatus + '","dojtaskid" :"' + DojTaskId + '","rccomment" :"' + RcComments + '","candidatedoj" :"' + dojValue + '","mode" :"1"}';
        $.ajax({
            type: "POST",
            url: "../../../DashboardService.aspx/ConfirmDoj",
            data: inputData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: SuccessDOJ,
            error: AjaxFailed
        });
    }
    else if (confirmstatus == 2) {
        if (RcComments == "") {
            MsgboxAlertDashboard(23, 2, 221, "NA_HRComment_DOJ", "Please enter reason for rejection");
            // $('#okButton').css({ 'width': '55%' });
            $("#popup_ok").val('Ok');

        }
        else {
            var inputData = '{ "candidateid":"' + candidateValue + '","confirmstatus" : "' + confirmstatus + '","dojtaskid" :"' + DojTaskId + '","rccomment" :"' + RcComments + '","candidatedoj" :"' + dojValue + '","mode" :"1"}';
            $.ajax({
                type: "POST",
                url: "../../../DashboardService.aspx/ConfirmDoj",
                data: inputData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: SuccessDOJ,
                error: AjaxFailed
            });
        }

    }

}

function UpdatedDOJ(result) {
    $("#msgExpeDOJ").show();
}

function SuccessER(result) {
    //$("#msgCancelERRequest").show();
    $("#msgConfirmdoj").hide();
    $("#msg").hide();
    $("#msgunlock").hide();
}
function SuccessDOJ(result) {
    $("#msgConfirmdoj").show();
    $("#msg").hide();
    $("#msgunlock").hide();
    // $("#msgCancelERRequest").hide();
    $(".btnAccpRej").attr('disabled', 'true');
}
function AjaxFailed(result) {
    $("#msgConfirmdoj").hide();
    $("#msg").hide();
    $("#msgunlock").hide();
    // $("#msgCancelERRequest").hide();
}
//selected indexChangejoiningStatus & call pageload
//function SelectionJoiningStatus() {
//    var joingingStatus = $("#JoiningStatusNA").val()
//    if (joingingStatus == 2) {
//        $("#lblJoiningcomment").show();
//        $("#txtDojconfirmComment").show()
//    }
//    else if (joingingStatus == 1) {
//        $("#lblJoiningcomment").hide();
//        $("#txtDojconfirmComment").hide()
//    }
//    else if (joingingStatus == -1) {
//        $("#lblJoiningcomment").hide();
//        $("#txtDojconfirmComment").hide()
//    }

//    else if (joingingStatus == null) {
//        $("#lblJoiningcomment").hide();
//        $("#lblJoiningcomment").hide();
//        $("#txtDojconfirmComment").hide()
//    }
//    else if (joingingStatus == 0) {
//        $("#lblJoiningcomment").hide();
//        $("#txtDojconfirmComment").hide()
//    }
//}
////ER process Hold/release button
function HoldReleaseShoeHide() {
    FetchPrefillValues();
    if ((ERRequestConfirm == 1) && (ERRequestStatus == 2)) {
        $("#holdERProcess").hide();
        $("#releaseERProcess").show();
    }
    if ((ERRequestConfirm == 1) && (ERRequestStatus == 1)) {
        $("#releaseERProcess").hide();
        $("#holdERProcess").show();
    }
    if ((ERRequestConfirm == 1) && (ERRequestStatus == 0)) {
        $("#holdERProcess").show();
    }
}


window.updateWithNewData = function () {
    location.reload();
}


function callback(value) {
    try {
        if (value == true) {
            //var patt = new RegExp("/^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/");
            //if (patt.test(RequestedDOJ) == true) {
            //   alert(true);
            $('#smabovedoj').val(RequestedDOJ);
            // }
            //$('#smabovedoj').val(RequestedDOJ);
            DOJConfirm(candidateid, 1);   //confirmstatus-->1 Onclick of Yes      
        }
        else {
            DOJConfirm(candidateid, 1); //confirmstatus-->1 Onclick of No
        }
    }
    catch (e) { }
}

// function called onClick of Accept Button
function AcceptDOJ(candidateid, confirmstatus) {
    if (Score <= 45) {
        MsgboxConfirm(SessionId, 6, 218, 'ACTION_POPUP_ACCEPTDOJ_NA', "Is the Expected date of Joining Same as Orientation Date?", callback);
    }
    else {
        DOJConfirm(candidateid, confirmstatus);
    }


}

function UpdateDOJ() {
    if (Score <= 45) {
        dojValue = $('#smabovedoj').val();
    }
    else {
        dojValue = $('#EDOJInputBox').val();
    }

    if (candidateid != null) {
        candidateValue = candidateid;
    }
    else {
        candidateValue = "";
    }

    if (DojTaskId != null && DojTaskId != "") {
        DojTaskId = DojTaskId;
    }
    else {
        DojTaskId = 0;
    }
    confirmstatus = 0;
    RcComments = "";
    var inputData = '{ "candidateid":"' + candidateValue + '","confirmstatus" : "' + confirmstatus + '","dojtaskid" :"' + DojTaskId + '","rccomment" :"' + RcComments + '","candidatedoj" :"' + dojValue + '","mode" :"1"}';
    $.ajax({
        type: "POST",
        url: "../../../DashboardService.aspx/ConfirmDoj",
        data: inputData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: UpdatedDOJ,
        error: AjaxFailed
    });
}
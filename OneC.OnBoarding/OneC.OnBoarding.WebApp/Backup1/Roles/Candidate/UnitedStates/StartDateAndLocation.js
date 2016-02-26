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

var candidateId = parseInt(OBQueryString["cand"]);
var Processid = parseInt(OBQueryString["processid"]);
var candidatetype = parseInt(OBQueryString["candtype"]);
var countryid = parseInt(OBQueryString["cntry"]);
var opmde = parseInt(OBQueryString["opmde"]);
var SessionId = parseInt(OBQueryString["ssid"]);
var roleGroupId = parseInt(OBQueryString["rgid"]);
var locationType = 0;
var CandidateConfirmStatus,
 DOJ, City, Country, DojConfirmFlag,County;
$().ready(function () {
    $("#pg_1_hrSubmit").attr('disabled', true);

    (function (b) { b.alerts = { verticalOffset: -75, horizontalOffset: 0, repositionOnResize: true, overlayOpacity: 0.7, overlayColor: "#000000", Color: "#FF9", bckgrdPopupColor: "#ffffff", draggable: false, okButton: "&nbsp;Ok&nbsp;", cancelButton: "&nbsp;No&nbsp;", dialogClass: null, Info: function (a) { b.alerts._show1("Information", a, null, "info", function (d) { }) }, Mandatory: function (a) { b.alerts._show1("Mandatory Fields", a, null, "info", function (d) { }) }, Warning: function (a) { b.alerts._show1("Warning", a, null, "warning", function (d) { }) }, Success: function (a) { b.alerts._show1("Success", a, null, "success", function (d) { }) }, Error: function (a) { b.alerts._show1("Error", a, null, "error", function (d) { }) }, Confirm: function (a, d) { b.alerts._show1("Confirmation", a, null, "confirm", d) }, Prompt: function (a, d) { b.alerts._show1("Prompt", a, d, "prompt", function (c) { }) }, Message: function (a) { b.alerts._show1("Message", a, null, "message", function (d) { }) }, SubmitSuccess: function (a) { b.alerts._show1("Success", a, null, "success", function (d) { window.close() }) }, _show1: function (k, m, e, j, a) { b.alerts._hide(); b.alerts._overlay("show"); if (k == "Message") { b("BODY").append('<div id="popup_container"><h1 id="popup_title" align="center"></h1><div id="popup_content"><div id="popup_message" style="padding:5px 5px 7px;border:0px;height:300px;border-color:blue;margin-left:0px;margin-right:10px;font-size:14;overflow:auto;"></div></div></div>') } else { b("BODY").append('<div id="popup_container"><h1 id="popup_title" align="center"></h1><div id="popup_content"><div id="popup_message" style="padding:5px 5px 7px;border:0px;height:150px;border-color:blue;margin-left:0px;margin-right:10px;font-size:14;overflow:auto;"></div></div></div>') } if (b.alerts.dialogClass) { b("#popup_container").addClass(b.alerts.dialogClass) } var l = b.browser.msie && parseInt(b.browser.version) <= 6 ? "absolute" : "fixed"; if (k == "Message") { b("#popup_container").css({ width: 700, height: "auto", position: l, zIndex: 99999, padding: 0, margin: 50, left: 400, background: b.alerts.bckgrdPopupColor }) } else { b("#popup_container").css({ width: 450, height: 300, position: l, zIndex: 99999, padding: 0, margin: 50, left: 400, background: b.alerts.bckgrdPopupColor }) } b("#popup_title").text(k); b("#popup_content").addClass(j); b("#popup_message").text(m); b("#popup_message").html(b("#popup_message").text().replace(/\n/g, "<br />")); b("#popup_container").css({ minWidth: b("#popup_container").outerWidth(), maxWidth: b("#popup_container").outerWidth() }); b.alerts._reposition(); b.alerts._maintainPosition(true); switch (j) { case "info": case "warning": case "success": case "error": case "message": b("#popup_message").after('<div id="popup_panel" valign:"vertical"><input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold; position:relative;" class="popup_Button" value="' + b.alerts.okButton + '" id="popup_ok" /></div>'); b("#popup_ok").click(function () { b.alerts._hide(); a(true) }); b("#popup_ok").focus().keypress(function (c) { if (c.keyCode == 13 || c.keyCode == 27) { b("#popup_ok").trigger("click") } }); break; case "confirm": b("#popup_message").after('<div id="popup_panel" valign:"vertical"><input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button"  value="' + b.alerts.okButton + '" id="popup_ok" /> <input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button"  value="' + b.alerts.cancelButton + '" id="popup_cancel" /></div>'); b("#popup_ok").click(function () { b.alerts._hide(); if (a) { a(true) } }); b("#popup_cancel").click(function () { b.alerts._hide(); if (a) { a(false) } }); b("#popup_ok").focus(); b("#popup_ok, #popup_cancel").keypress(function (c) { if (c.keyCode == 13) { b("#popup_ok").trigger("click") } if (c.keyCode == 27) { b("#popup_cancel").trigger("click") } }); break; case "prompt": b("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel" valign:"vertical"><input type="button"  style="background-color:Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button"  value="' + b.alerts.okButton + '" id="popup_ok" /> <input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button" value="' + b.alerts.cancelButton + '" id="popup_cancel" /></div>'); b("#popup_prompt").width(b("#popup_message").width()); b("#popup_ok").click(function () { var c = b("#popup_prompt").val(); b.alerts._hide(); if (a) { a(c) } }); b("#popup_cancel").click(function () { b.alerts._hide(); if (a) { a(null) } }); b("#popup_prompt, #popup_ok, #popup_cancel").keypress(function (c) { if (c.keyCode == 13) { b("#popup_ok").trigger("click") } if (c.keyCode == 27) { b("#popup_cancel").trigger("click") } }); if (e) { b("#popup_prompt").val(e) } b("#popup_prompt").focus().select(); break } if (b.alerts.draggable) { try { b("#popup_container").draggable({ handle: b("#popup_title") }); b("#popup_title").css({ cursor: "move", font: 15 }) } catch (n) { } } }, _hide: function () { b("#popup_container").remove(); b.alerts._overlay("hide"); b.alerts._maintainPosition(false) }, _overlay: function (a) { switch (a) { case "show": b.alerts._overlay("hide"); b("BODY").append('<div id="popup_overlay"></div>'); b("#popup_overlay").css({ position: "absolute", zIndex: 99998, top: "0px", left: "0px", width: "100%", height: b(window).height() - 100 + "px", background: b.alerts.overlayColor, opacity: b.alerts.overlayOpacity }); break; case "hide": b("#popup_overlay").remove(); break } }, _reposition: function () { var d = b(window).height() / 2 - b("#popup_container").outerHeight() / 2 + b.alerts.verticalOffset; var a = b(window).width() / 2 - b("#popup_container").outerWidth() / 2 + b.alerts.horizontalOffset; if (d < 0) { d = 0 } if (a < 0) { a = 0 } if (b.browser.msie && parseInt(b.browser.version) <= 6) { d = d + b(window).scrollTop() } b("#popup_container").css({ top: d + "px", left: a + "px" }); b("#popup_overlay").height(b(document).height()) }, _maintainPosition: function (a) { if (b.alerts.repositionOnResize) { switch (a) { case true: b(window).bind("resize", function () { b.alerts._reposition() }); break; case false: b(window).unbind("resize"); break } } } }, MsgboxInfo = function (a) { b.alerts.Info(a) }, MsgboxWarning = function (a) { b.alerts.Warning(a) }, MsgboxSuccess = function (a) { b.alerts.Success(a) }, MsgboxError = function (a) { b.alerts.Error(a) }, MsgboxConfirm = function (e, j, l, n, a, o) { var k = 2; try { if (l != 0) { b.ajax({ type: "POST", url: "../../../FormsService.aspx/GetMessage", data: "{'sessionId':" + e.toString() + ",'messageType':'" + k + "','messageId':" + l.toString() + ",'messageCode':'" + n + "', 'customMessageOnDBFail':'" + a + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false, cache: false, success: function (f) { var d = f.d.DisplayMessage.toString(); var c = f.d.DisplayType.toString(); var h = d.toString(); var g = c.toString(); if (l == 39) { g = "9" } switch (g) { case "6": b.alerts.Confirm(h, o); break; default: b.alerts.Info(h) } }, error: function (c, f, d) { b.alerts.Error(c.status + " - " + c.responseText) } }) } else { if (l == 0) { switch (j) { case 6: b.alerts.Confirm(a, o); break; default: b.alerts.Info(a) } } } } catch (m) { alert(m) } }, MsgboxPrompt = function (a, d) { b.alerts.Prompt(a, d) }, MsgboxAlert = function (e, j, l, m, a) { var k = 2; try { if (l != 0) { b.ajax({ type: "POST", url: "../../../FormsService.aspx/GetMessage", data: "{'sessionId':" + e.toString() + ",'messageType':'" + k + "','messageId':" + l.toString() + ",'messageCode':'" + m + "', 'customMessageOnDBFail':'" + a + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false, cache: false, success: function (f) { var d = f.d.DisplayMessage.toString(); var c = f.d.DisplayType.toString(); var h = d.toString(); var g = c.toString(); if (l == 39) { g = "9" } switch (g) { case "1": b.alerts.Success(h); break; case "2": b.alerts.Error(h); break; case "3": b.alerts.Warning(h); break; case "4": b.alerts.Info(h); break; case "5": b.alerts.Prompt(h); break; case "6": b.alerts.Confirm(h); break; case "7": b.alerts.Mandatory(h); break; case "8": b.alerts.Message(h); break; case "9": b.alerts.SubmitSuccess(h); break; default: b.alerts.Info(h) } }, error: function (c, f, d) { b.alerts.Error(c.status + " - " + c.responseText) } }) } else { if (l == 0) { switch (j) { case 1: b.alerts.Success(a); break; case 2: b.alerts.Error(a); break; case 3: b.alerts.Warning(a); break; case 4: b.alerts.Info(a); break; case 5: b.alerts.Prompt(a); break; case 6: b.alerts.Confirm(a); break; case 7: b.alerts.Mandatory(a); break; default: b.alerts.Info(a) } } } } catch (n) { alert(n) } }, MsgboxAlertDashboard = function (e, j, l, m, a) { var k = 2; try { if (l != 0) { b.ajax({ type: "POST", url: "../../../FormsService.aspx/GetMessage", data: "{'sessionId':" + e.toString() + ",'messageType':'" + k + "','messageId':" + l.toString() + ",'messageCode':'" + m + "', 'customMessageOnDBFail':'" + a + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false, cache: false, success: function (f) { var d = f.d.DisplayMessage.toString(); var c = f.d.DisplayType.toString(); var h = d.toString(); var g = c.toString(); switch (g) { case "1": b.alerts.Success(h); break; case "2": b.alerts.Error(h); break; case "3": b.alerts.Warning(h); break; case "4": b.alerts.Info(h); break; case "5": b.alerts.Prompt(h); break; case "6": b.alerts.Confirm(h); break; case "7": b.alerts.Mandatory(h); break; default: b.alerts.Info(h) } }, error: function (c, f, d) { b.alerts.Error(c.status + " - " + c.responseText) } }) } else { if (l == 0) { switch (j) { case 1: b.alerts.Success(a); break; case 2: b.alerts.Error(a); break; case 3: b.alerts.Warning(a); break; case 4: b.alerts.Info(a); break; case 5: b.alerts.Prompt(a); break; case 6: b.alerts.Confirm(a); break; case 7: b.alerts.Mandatory(a); break; default: b.alerts.Info(a) } } } } catch (n) { alert(n) } } })(jQuery);
    $("#pg_1_hrSubmit").click(function () {
        //        if (document.getElementById('Mngrcfmsts').value == '5') {
        //            if ($("#hdnUploadDocStatus").val() == 1) {
        //                UpdateCandidateInfo();
        //            }
        //            else {
        //                MsgboxAlertDashboard(23, 2, 222, "NA_RC_Upload_Email", "Please upload email to submit");
        //                //alert('hi');
        //            }
        //        }
        //        else {
        var i, count = 0;
        for (i = 0; i < document.getElementsByClassName('textMandatory').length; i++) {
            if (document.getElementsByClassName('textMandatory')[i].value != null && document.getElementsByClassName('textMandatory')[i].value != "") {
                count = count + 1;
            }
            else {
                count = 0;
                break;
                // MsgboxAlertDashboard(23, 2, 0, "Please enter valid data to submit the form", "Please enter valid data to submit the form");
            }
        }
        if (count > 0) {
            if (document.getElementById('DOJConfirmStatus').value == "1" && document.getElementById('pg_1_candlocConfmsts').value == "1") {

                UpdateCandidateInfo();
            }
            else {
                MsgboxAlertDashboard(23, 2, 0, "Please update the Candidate Confirmation Status to Submit.", "Please update the Candidate Confirmation Status to Submit.");
            }
        }
        else {
            MsgboxAlertDashboard(23, 2, 0, "Please enter valid data to submit the form", "Please enter valid data to submit the form");
        }
        //        }
    })

    customDefaults = {
        ajaxURLPath: '../../../',
        imgSrc: '../../../'
    };
    $.fileUpload.Initialize();


    //Binding doj and location confirmation status
    if (roleGroupId == 1 || roleGroupId == 2) {
        var mastercodesInput = '{"mode":"39","parentcode":"116","candidateId":"0"}'
        // $("#JoiningStatusNA").empty();
        $.ajax({
            type: "POST",
            url: "../../../FormsService.aspx/GetGeographyMaster",
            data: mastercodesInput,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                $.each(msg.d, function (index, item) {
                    $("#DOJConfirmStatus").get(0).options[$("#DOJConfirmStatus").get(0).options.length] = new Option(item.Description, item.ID);
                    $("#pg_1_candlocConfmsts").get(0).options[$("#pg_1_candlocConfmsts").get(0).options.length] = new Option(item.Description, item.ID);
                });
                $("#DOJConfirmStatus").selectedIndex = 1;
                $("#pg_1_candlocConfmsts").selectedIndex = 1;

            },
            error: function () {
            }
        });

        // To get values in managerstatus dropdown
        var mastercodesInput = '{"mode":"58","parentcode":"0","candidateId":"0"}'
        $.ajax({
            type: "POST",
            url: "../../../FormsService.aspx/GetGeographyMaster",
            data: mastercodesInput,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                $.each(msg.d, function (index, item) {
                    $("#Mngrcfmsts").get(0).options[$("#Mngrcfmsts").get(0).options.length] = new Option(item.Description, item.ID);
                });
                var options = $("#Mngrcfmsts")[0].options;
                for (var i = 0, iLen = options.length; i < iLen - 1; i++) {
                    options[i].disabled = true;
                }
                $("#Mngrcfmsts")[0].selectedIndex = 1;
            },
            error: function () {
            }
        });

        $("#Mngrcfmsts").live("change", function () {
            if ($("#Mngrcfmsts")[0].selectedIndex == 5 || $("#Mngrcfmsts")[0].selectedIndex == 4) {
                $("#pg_1_hrSubmit").attr('disabled', false);
            }
            else {
                $("#pg_1_hrSubmit").attr('disabled', true);
            }
        });
        /*commented as the drop down is removed*/
        // var mastercodesInput = '{"mode":"60","parentcode":"0","candidateId":"0"}'
        //        $.ajax({
        //            type: "POST",
        //            url: "../../../FormsService.aspx/GetGeographyMaster",
        //            data: mastercodesInput,
        //            contentType: "application/json; charset=utf-8",
        //            dataType: "json",
        //            async: false,
        //            success: function (msg) {
        //                $.each(msg.d, function (index, item) {
        //                    $("#drpdwn_locationType").get(0).options[$("#drpdwn_locationType").get(0).options.length] = new Option(item.Description, item.ID);
        //                });
        //              
        //                $("#drpdwn_locationType").selectedIndex = 1;
        //            },
        //            error: function () {
        //            }
        //        });

        $.ajax({
            type: "POST",
            url: "../../../DashboardService.aspx/FetchCandidatesPrefillvalues",
            data: "{candidateID:'" + candidateId + "',associateID:''}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: FetchPrefillvaluesdata,
            error: function () {
                //alert("Failed to load");
            }
        });

    }

    // if (DojConfirmFlag != 0) {
    $("#candrepjoindt").datepicker({ dateFormat: 'mm/dd/yy', showOn: "both", buttonImage: "../../../Images/calendar.png", buttonImageOnly: true, changeMonth: true, changeYear: true, buttonAfter: false, hideIfNoPrevNext: false, navigationAsDateFormat: true });
    //   }
    //    $("#EDOJInputBox").datepicker({ dateFormat: 'mm/dd/yy', showOn: "both", buttonImage: "../../../Images/calendar.png", buttonImageOnly: true, changeMonth: true, changeYear: true, buttonAfter: false, hideIfNoPrevNext: false, navigationAsDateFormat: true });

});


function FetchPrefillvaluesdata(result) {
    var xmldata = ParsexmlDOM(result.d);
    $(xmldata).find('Table6').each(function () {
        DojConfirmFlag = $(this).find('DojConfirmFlag').text();
        //        if (DojConfirmFlag == 0) {
        //            $("#ReqEDOJContainer").hide();
        //            $("#candrepjoindt").hide();
        //        }
        DOJ = $(this).find('DOJ').text();
        EDOJ = $(this).find('EDOJ').text();

        Country = $(this).find('Country').text();
        State = $(this).find('State').text();
        City = $(this).find('City').text();
        Address1 = $(this).find('Address1').text();
        Address2 = $(this).find('Address2').text();
        Zip = $(this).find('Zip').text();
        locationType = $(this).find('LocationType').text();
        IsDOJConfirmed = $(this).find('IsDOJConfirmed').text();
        IsLocationConfirmed = $(this).find('IsLocationConfirmed').text();
        HrngmngrConfirmStatus = $(this).find('HrngmngrConfirmStatus').text();
        HrngmngrComments = $(this).find('HrngmngrComments').text();
        CandidateConfirmStatus = $(this).find('CandidateConfirmStatus').text();
        County = $(this).find('County').text();
        DojComments = $(this).find('DojComments').text();
        LocationComments = $(this).find('LocationComments').text();
        UploadDocStatus = $(this).find('UploadDocStatus').text();
        $("#EDOJInputBox").val(DOJ);
        //if (EDOJ != null && EDOJ != "") {
        $("#candrepjoindt").val(EDOJ);
        //        }
        //        else {
        //            $("#candrepjoindt").val(DOJ);
        //         }
        $("#req_Country").val(Country);
        $("#req_State").val(State);
        $("#req_City").val(City);
        $("#req_Address1").val(Address1);
        $("#pg_2_Country1").val(Country);
        $("#req_Address2").val(Address2);
        $("#req_Zip").val(Zip);
        $("#pg_1_mngr_cmmts").val(HrngmngrComments);
        // $("#DOJConfirmStatus").val(IsDOJConfirmed);
        //        $("#DOJConfirmStatus").selectedIndex = IsDOJConfirmed + 1;
        $("#DOJConfirmStatus option[value=" + IsDOJConfirmed + "]").attr("selected", "selected");
        $("#pg_1_candlocConfmsts option[value=" + IsLocationConfirmed + "]").attr("selected", "selected");
        $("#Mngrcfmsts option[value=" + HrngmngrConfirmStatus + "]").attr("selected", "selected");
        // $("#drpdwn_locationType option[value=" + locationType + "]").attr("selected", "selected");
//        if (locationType == 1) {
        $("#WorkLocationType").val(locationType);
//        }
//        else if (locationType == 2) {
//            $("#WorkLocationType").val("Cognizant Office");
////        }
////        else if (locationType = 3) {
//            $("#WorkLocationType").val("Client Office");
//        }
        $('#req_County').val(County);
        $("#txt_reason").val(DojComments);
        $("#pg_1_locatcoments").val(LocationComments);
        $("#hdnUploadDocStatus").val(UploadDocStatus);
        if (HrngmngrConfirmStatus == 5 || HrngmngrConfirmStatus == 1) {
            $(".mid_content :input:not(.fn-view)").prop("disabled", true);
//            if(('.mid_content').hasClass('fn-view')){
//            $(".fn-view").attr('disabled', false);}
       }
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
function disablePopup() {
    //disables popup only if it is enabled
    $("#overLay").hide();
    $(".popupContactwrapper").hide();
}

/*Commented as the fileupload to SAN is stopped*/
//function OpenPopForFileUpload() {
//    var candidateValue;
//    if (candidateId != null) {
//        candidateValue = candidateId;
//    }
//    else {
//        candidateValue = "";
//    }
//    var Path = '../../../CommonPages/UploadFileDashboardWithResponse.aspx?cand=' + candidateValue + '&IsCont=0 &SessionId=' + SessionId;

//    try {
//        var width = 500;
//        var height = 360;
//        var left = (screen.width - width) / 2;
//        var top = (screen.height - height) / 2;
//        var params = 'width=' + width + ', height=' + height;
//        params += ', top=' + top + ', left=' + left;
//        params += ', directories=no';
//        params += ', location=no';
//        params += ', menubar=no';
//        params += ', resizable=no';
//        params += ', scrollbars=no';
//        params += ', status=no';
//        params += ', toolbar=no';

//        childWin = window.open(Path, "Popup", params);
//        //var popupStatus = 0;
//        //loads popup only if it is disabled
//        var $backgroundOverLay = $('<div id="overLay"/>');
//        $("body").prepend($backgroundOverLay);
//        $("#overLay").css({
//            "opacity": "0.7"
//        });
//        $("#overLay").show();
//        //popupStatus = 1;

//    } catch (err) { }
//}




//UpdateCandidateDetails
function UpdateCandidateInfo() {
    var candidateIdVal;
    var ReportedDOJVal;
    var DOJConfirmStatusVal;
    var DOJCommentsVal;
    var CountryVal;
    var Address1Val;
    var Address2Val;
    var StateVal;
    var CityVal;
    var ZipVal;
    var LocationConfirmStatusVal;
    var LocationCommentsVal;
    var HiringManagerConfirmStatusval;
    var HiringManagerCommentsval;
    var CountyVal;
   // var candidateId = candidateid;

    if (candidateId != null) {
        candidateIdVal = candidateId;
    }
    else {
        candidateValue = "";
    }

    if (document.getElementById('candrepjoindt') != null) {
        ReportedDOJVal = document.getElementById('candrepjoindt').value;
    }
    else {
        ReportedDOJVal = "";
    }
    if (document.getElementById('DOJConfirmStatus') != null) {
        DOJConfirmStatusVal = document.getElementById('DOJConfirmStatus').value;
    }
    else {
        DOJConfirmStatusVal = 0;
    }

    if (document.getElementById('txt_reason') != null) {
        DOJCommentsVal = document.getElementById('txt_reason').value;
    }
    else {
        DOJCommentsVal = "";
    }

    if (document.getElementById('req_Country') != null) {
        CountryVal = document.getElementById('req_Country').value;
    }
    else {
        CountryVal = "";
    }

    if (document.getElementById('req_Address1') != null) {
        Address1Val = document.getElementById('req_Address1').value;
    }
    else {
        Address1Val = "";
    }
    if (document.getElementById('req_Address2') != null) {
        Address2Val = document.getElementById('req_Address2').value;
    }
    else {
        Address2Val = "";
    }
    if (document.getElementById('req_State') != null) {
        StateVal = document.getElementById('req_State').value;
    }
    else {
        StateVal = "";
    }
    if (document.getElementById('req_City') != null) {
        CityVal = document.getElementById('req_City').value;
    }
    else {
        CityVal = "";
    }

    if (document.getElementById('pg_1_candlocConfmsts') != null) {
        LocationConfirmStatusVal = document.getElementById('pg_1_candlocConfmsts').value;
    }
    else {
        LocationConfirmStatusVal = 0;
    }
    if (document.getElementById('pg_1_locatcoments') != null) {
        LocationCommentsVal = document.getElementById('pg_1_locatcoments').value;
    }
    else {
        LocationCommentsVal = "";
    }
    if (document.getElementById('Mngrcfmsts') != null) {
        HiringManagerConfirmStatusval = document.getElementById('Mngrcfmsts').value;
    }
    else {
        HiringManagerConfirmStatusval = 0;
    }
    if (document.getElementById('pg_1_mngr_cmmts') != null) {
        HiringManagerCommentsval = document.getElementById('pg_1_mngr_cmmts').value;
    }
    else {
        HiringManagerCommentsval = "";
    }
    if (document.getElementById('req_Zip') != null) {
        ZipVal = document.getElementById('req_Zip').value;
    }
    else {
        ZipVal = "";
    }
    if (locationType != undefined || locationType != null) {
        locationType = document.getElementById('WorkLocationType').value;
//        if (locationType == "Home") {
//            locationType = 1;
//        }
//        else if (locationType == "Cognizant Office") {
//            locationType = 2;
//        }
//        else if (locationType == "Client Office") {
//            locationType = 3;
//        }

    }
    else {
        locationType = '';
    }

    if (document.getElementById('req_County') != null) {

        CountyVal = document.getElementById('req_County').value;
    }
    else {CountyVal = "";}

    var inputData = '{ "candidateID":"' + candidateIdVal + '","reportedDOJ" : "' + ReportedDOJVal + '","dojConfirmStatus" : "' + DOJConfirmStatusVal + '","dojComments":"' + DOJCommentsVal + '","country":"' + CountryVal + '","address1":"' + Address1Val + '","address2":"' + Address2Val + '","stateName":"' + StateVal + '","cityName":"' + CityVal + '","zip":"' + ZipVal + '","locationConfirmStatus":"' + LocationConfirmStatusVal + '","locationComments":"' + LocationCommentsVal + '","hiringManagerConfirmStatus":"' + HiringManagerConfirmStatusval + '","hiringManagerComments":"' + HiringManagerCommentsval + '","locationType":"' + locationType + '","county":"' + CountyVal + '"}';

    $.ajax({
        type: "POST",
        url: "../../../DashboardService.aspx/UpdateCandidateStateLocationData",
        data: inputData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (msg) {
                if (msg.d == 1) {
                    showmessage();
                    $(".mid_content :input:not(.fn-view)").prop("disabled", true);
                } else { MsgboxAlertDashboard(23, 2, 222, "NA_RC_Upload_Email", "Please upload email to submit"); $('#msg').hide(); }
                },
        error: function(){alert('falied to Submit')}
    });

}
function showmessage() {
    $('#msg').show();
}

function enable() {
    $('.disable').attr('disabled', false);
}
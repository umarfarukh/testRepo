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
     Score;

$().ready(function () {

    FetchPrefillValues();

    //Binding joining dates for SM+ candidates for US
    if (roleGroupId == 1 || roleGroupId == 2) {
        var mastercodesInput = '{"mode":"56","parentcode":"0","candidateId":"' + candidateid + '"}'
        $("#EDOJ").empty();
        $.ajax({
            type: "POST",
            url: "../../../FormsService.aspx/GetGeographyMaster",
            data: mastercodesInput,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                $.each(msg.d, function (index, item) {
                    $("#EDOJ").get(0).options[index] = new Option(item.Description, item.ID);
                });
                //$("#EDOJ").selectedIndex = index;
            },
            error: function () {
                // alert("Failed to load JoiningStatus");
            }
        });
        $("#EDOJ option[value='" + DOJ + "']").attr('selected', true);
    }

    $("#divactions").hide().fadeIn(900);
    //    if (Processid == 1) {
    $("#divactions").show();
    //    }
    //    else {
    //        $("#divactions").hide();
    //    }


    if (Score <= 45) {
        $("#smabove").show();
        $("#smbelow").hide();
    }
    else {
        $("#smabove").hide();
        $("#smbelow").show();
    }

    if (roleGroupId == 1 || roleGroupId == 2) {
        //RCDashboard
        $("#divjoiningstatusNA").show();
    }
    else {
        //HRSS Dasboard
        $("#divjoiningstatusNA").show();
    }

    if ((TaskId == 18 || TaskId == 235 || TaskId == 28 || TaskId == 720 || TaskId == 721 || TaskId == 746) && (TaskStatus == 1)) {

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
    //Bind joiningStatus
    if (roleGroupId == 1 || roleGroupId == 2) {
        var mastercodesInput = '{"mode":"39","parentcode":"116","candidateId":"0"}'
        $("#JoiningStatusNA").empty();
        $.ajax({
            type: "POST",
            url: "../../../FormsService.aspx/GetGeographyMaster",
            data: mastercodesInput,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                $.each(msg.d, function (index, item) {
                    $("#JoiningStatusNA").get(0).options[$("#JoiningStatusNA").get(0).options.length] = new Option(item.Description, item.ID);
                });
                $("#JoiningStatusNA").selectedIndex = 1;
            },
            error: function () {
                // alert("Failed to load JoiningStatus");
            }
        });
        $("#txtDojconfirmComment").val(HMComment);
        $("#JoiningStatusNA option[value=" + AttendanceStatusOnDOJ + "]").attr("selected", "selected");
    }
    ShowjoiningstatusDojConfirm();

    $("#EDOJInputBox").datepicker({ dateFormat: 'mm/dd/yy', showOn: "both", buttonImage: "../../../Images/calendar.png", buttonImageOnly: true, changeMonth: true, changeYear: true, buttonAfter: false, hideIfNoPrevNext: false, navigationAsDateFormat: true });
    $("#ReqDOJInputBox").datepicker({ dateFormat: 'mm/dd/yy', showOn: "both", buttonImage: "../../../Images/calendar.png", buttonImageOnly: true, changeMonth: true, changeYear: true, buttonAfter: false, hideIfNoPrevNext: false, navigationAsDateFormat: true });
    $("#divlateral").css('padding-top', '7px');
    $("#emailid").val(EmailId);
    $("#EDOJInputBox").val(DOJ);
    $("#divLateral").show();
    showhidestatusflag();

    //update candidateInfo
    $('#btnApplyLateral').click(function () {
        UpdateCandidateInfo();
        FetchPrefillValues();
        //SelectionJoiningStatus();
        ShowjoiningstatusDojConfirm();
    });

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
});

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

//UpdateCandidateDetails
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
        joiningStatus = "";
    }
    if (flag == true) {

        var inputData = '{ "candidate":"' + candidateValue + '","candidateDOJ" : "' + dojValue + '","emailId" : "' + emailidValue + '","resendMail":"' + ResendMailval + '","joiningStatus":"' + joiningStatus + '","rccomment":"' + RCComment + '","resendI9Mail":"0","mode":"0"}';

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
        params += ', scrollbars=no';
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

function FetchPrefillvaluesdata(result) {
    var xmldata = ParsexmlDOM(result.d);
    $(xmldata).find('Table').each(function () {

        EmailId = $.trim($(this).find('EmailId').text());
        DOJ = $.trim($(this).find('DOJ').text());
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

function ShowjoiningstatusDojConfirm() {
    if (JoiningStatusRCShow == 1) {
        $("#JoiningStatusNA").show();
        $("#lblJoiningstatu").show();


        var joingingStatus = $("#JoiningStatusNA").val();
        if (joingingStatus == 2) {
            $("#lblJoiningcomment").show();
            $("#txtDojconfirmComment").show();
        }
        else {
            $("#lblJoiningcomment").hide();
            $("#txtDojconfirmComment").hide();
        }

    }
    else {
        $("#JoiningStatusNA").hide();
        $("#lblJoiningstatu").hide();
        $("#lblJoiningcomment").hide();
        $("#txtDojconfirmComment").hide();

    }
    if (DOJConfirmRCShow == 1) {
        $("#dojconfirm").show();
        $("divjoiningstatusNA").show();
    }
    else {
        $("#dojconfirm").hide();
        $("divjoiningstatusNA").hide();
        $("#txtDojconfirmComment").hide();
        $("#lblJoiningcomment").hide();

    }


}

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
function DOJConfirm(candidateid) {
    if (candidateid != null) {
        candidateValue = candidateid;
    }
    else {
        candidateValue = "";
    }
    var inputData = '{ "candidateid":"' + candidateValue + '","confirmstatus" : "0 ","dojtaskid" :"0","rccomment" :"","candidatedoj" :"1900-01-01","mode" :"0"}';
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
}
function AjaxFailed(result) {
    $("#msgConfirmdoj").hide();
    $("#msg").hide();
    $("#msgunlock").hide();
    // $("#msgCancelERRequest").hide();
}
//selected indexChangejoiningStatus & call pageload
function SelectionJoiningStatus() {
    var joingingStatus = $("#JoiningStatusNA").val()
    if (joingingStatus == 2) {
        $("#lblJoiningcomment").show();
        $("#txtDojconfirmComment").show()
    }
    else if (joingingStatus == 1) {
        $("#lblJoiningcomment").hide();
        $("#txtDojconfirmComment").hide()
    }
    else if (joingingStatus == -1) {
        $("#lblJoiningcomment").hide();
        $("#txtDojconfirmComment").hide()
    }

    else if (joingingStatus == null) {
        $("#lblJoiningcomment").hide();
        $("#lblJoiningcomment").hide();
        $("#txtDojconfirmComment").hide()
    }
    else if (joingingStatus == 0) {
        $("#lblJoiningcomment").hide();
        $("#txtDojconfirmComment").hide()
    }
}
//ER process Hold/release button
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
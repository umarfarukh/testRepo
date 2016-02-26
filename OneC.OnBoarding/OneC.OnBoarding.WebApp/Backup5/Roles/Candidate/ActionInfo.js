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
     RecruiterMobileNo,
     RecruiterVnetNo,
     ManagerId,
     ManagerName,
     ManagerMobileNo,
     ManagerVnetNo;

    $().ready(function () {
        $("#divactions").hide().fadeIn(900);
        FetchPrefillValues();
        BindOfferstatusDropdown();

        var mastercodesInput = '{"mode":"25","parentcode":"35","candidateId":"0"}'
        $.ajax({
            type: "POST",
            url: "../../FormsService.aspx/GetGeographyMaster",
            data: mastercodesInput,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                $.each(msg.d, function (index, item) {
                    $("#Dimcodestatus").get(0).options[$("#Dimcodestatus").get(0).options.length] = new Option(item.Description, item.ID);
                });
                $("#Dimcodestatus").selectedIndex = 1;
            },
            error: function () {
                alert("Failed to load");
            }
        });
        var mastercodesInput = '{"mode":"26","parentcode":"3","candidateId":"0"}'
        $.ajax({
            type: "POST",
            url: "../../FormsService.aspx/GetGeographyMaster",
            data: mastercodesInput,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                $.each(msg.d, function (index, item) {
                    $("#JoiningLocationstatus").get(0).options[$("#JoiningLocationstatus").get(0).options.length] = new Option(item.Description, item.ID);
                });
                $("#JoiningLocationstatus").selectedIndex = 1;
            },
            error: function () {
                alert("Failed to load");
            }
        });
        var mastercodesInput = '{"mode":"27","parentcode":"97","candidateId":"0"}'
        $.ajax({
            type: "POST",
            url: "../../FormsService.aspx/GetGeographyMaster",
            data: mastercodesInput,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                $.each(msg.d, function (index, item) {
                    $("#ReportingTime").get(0).options[$("#ReportingTime").get(0).options.length] = new Option(item.Description, item.Description);
                });
                $("#ReportingTime").selectedIndex = 1;
            },
            error: function () {
                alert("Failed to load");
            }
        });
        var mastercodesInput = '{"mode":"28","parentcode":"5","candidateId":"0"}'
        $.ajax({
            type: "POST",
            url: "../../FormsService.aspx/GetGeographyMaster",
            data: mastercodesInput,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                $.each(msg.d, function (index, item) {
                    $("#JoiningStatus").get(0).options[$("#JoiningStatus").get(0).options.length] = new Option(item.Description, item.ID);
                });
                $("#JoiningStatus").selectedIndex = 1;
            },
            error: function () {
                alert("Failed to load");
            }
        });
        $("#EDOJInputBox").datepicker({ dateFormat: 'mm/dd/yy', showOn: "both", buttonImage: "../../Images/calendar.png", buttonImageOnly: true, changeMonth: true, changeYear: true, buttonAfter: false, hideIfNoPrevNext: false, navigationAsDateFormat: true });


        if (Processid != 2) {
            $("#ResendDiv").show();
            if (countryid == 3) {
                if (candidatetype == 1) {
                    $("#emailid").val(EmailId);
                    $("#EDOJInputBox").val(DOJ);
                    $("#offerstatus option[value=" + CandidateOfferStatus + "]").attr("selected", "selected");

                    $("#RecruiterIDInputBox").val(RecruiterId);
                    $("#lblRecruiterName").text(RecruiterName);
                    $("#RecruiterMobileInputBox").val(RecruiterMobileNo);
                    $("#RecruiterVnetInputBox").val(RecruiterVnetNo);
                    $("#ManagerIDInputBox").val(ManagerId);
                    $("#lblManagerName").text(ManagerName);
                    $("#ManagerMobileInputBox").val(ManagerMobileNo);
                    $("#ManagerVnetInputBox").val(ManagerVnetNo);


                    $("#divLateral").show();
                    $("#divCampus").hide();
                    $("#divlateralbutton").show();
                    $("#divcampusbutton").hide();
                    $("#ResendDimCheckbox").hide();
                    $("#lblDimmailer").hide();
                    $("#divUnlockbuttoncampus").hide();
                    if (IsAccessAllowed == 0) {
                        $("#divUnlockbutton").show();
                    }
                    else {
                        $("#divUnlockbutton").hide();
                    }
                    if (roleGroupId == 1) {
                        $("#divPOCDetails").show();
                        $("#divlateral").css('padding-top', '14px');
                    }
                    else {
                        $("#divPOCDetails").hide();
                        $("#divlateral").css('padding-top', '7px');
                    }
                }
                else {
                    $("#divlateral").css('padding-top', '7px');
                    $("#emailid").val(EmailId);
                    $("#EDOJInputBox").val(DOJ);
                    $("#offerstatus option[value=" + CandidateOfferStatus + "]").attr("selected", "selected");

                    $("#Dimcodestatus option[value=" + DateIntimationStatus + "]").attr("selected", "selected");
                    $("#JoiningLocationstatus option[value=" + CampusJoiningLocation + "]").attr("selected", "selected");
                    $("#ReportingTime option[value='" + CampusReportingTime + "']").attr("selected", "selected");
                    $("#JoiningVenue").val(CampusJoiningVenue);

                    $("#divLateral").show();
                    $("#divCampus").show();
                    $("#divlateralbutton").hide();
                    $("#divcampusbutton").show();
                    $("#ResendDimCheckbox").show();
                    $("#lblDimmailer").show();
                    $("#divUnlockbutton").hide();
                    if (IsAccessAllowed == 0) {
                        $("#divUnlockbuttoncampus").show();
                    }
                    else {
                        $("#divUnlockbuttoncampus").hide();
                    }
                    $("#divPOCDetails").hide();
                }

            }
            else {
                $("#divlateral").css('padding-top', '7px');
                $("#emailid").val(EmailId);
                $("#EDOJInputBox").val(DOJ);
                $("#ResendDimCheckbox").hide();
                $("#lblDimmailer").hide();
                $("#divLateral").show();
                $("#divCampus").hide();
                $("#divlateralbutton").show();
                $("#divcampusbutton").hide();
                $("#divUnlockbutton").hide();
                $("#divUnlockbuttoncampus").hide();
                $("#divJoiningbutton").hide();
                $("#divofferstatus").hide();
                $("#divPOCDetails").hide();
                showhidestatusflag();
            }
        }
        else {
            $("#JoiningStatus option[value='" + AttendanceStatusOnDOJ + "']").attr("selected", "selected");
            $("#divLateral").hide();
            $("#divCampus").hide();
            $("#divJoiningStatus").show();
            $("#divJoiningbutton").show();
            $("#divlateralbutton").hide();
            $("#divcampusbutton").hide();
            $("#ResendDiv").hide();
            if (countryid == 3) {
                if (roleGroupId == 2) {
                    $("#divJoiningStatus").show();
                }
                else {
                    $("#divJoiningStatus").hide();
                }
            }
            else {
                $("#divJoiningStatus").hide();
            }
            $("#divUnlockbutton").hide();
            $("#divUnlockbuttoncampus").hide();
            $("#divPOCDetails").hide();
            $("#divlateral").css('padding-top', '7px');
        }

        $('#btnApplyLateral').click(function () {
            UpdateCandidateInfo();
            if ($("#offerstatus").val() == 1) {
                BindOfferstatusDropdown();
            }
            FetchPrefillValues();
        });

        $('#btnApplyCampus').click(function () {
            UpdateCandidateInfoForCampus();
            if ($("#offerstatus").val() == 1) {
                BindOfferstatusDropdown();
            }
            FetchPrefillValues();
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

        $('#btnUnlock').click(function () {
            UnlockCandidateAccess();
            BindOfferstatusDropdown();
            FetchPrefillValues();
        });

        $('#btnUnlockcampus').click(function () {
            UnlockCandidateAccess();
            BindOfferstatusDropdown();
            FetchPrefillValues();
        });

        $('#btnJoiningstatus').click(function () {
            UpdateCandidateJoiningStatusDetails();
        });

        $('#ManagerIDInputBox').blur(function () {
            if ($("#ManagerIDInputBox").val() == "") {
                $("#lblManagerName").text("");
                $("#ManagerMobileInputBox").val("");
                $("#ManagerVnetInputBox").val("");
                //$("#ManagerMobileInputBox").focus();
            }
            else {
                FetchManagerContactInfo();
            }
        });

        $('#RecruiterIDInputBox').blur(function () {
            if ($("#RecruiterIDInputBox").val() == "") {
                $("#lblRecruiterName").text("");
                $("#RecruiterMobileInputBox").val("");
                $("#RecruiterVnetInputBox").val("");
                //$("#RecruiterMobileInputBox").focus();
            }
            else {
                FetchRecruiterContactInfo();
            }
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

function UpdateCandidateInfo() {
    var candidateValue;
    var dojValue;
    var statusValue;
    var emailidValue;
    var ResendMailval;
    var OrgEmailIdval;
    var ManagerIdval;
    var ManagerNameval;
    var ManagerMobval;
    var ManagerVnetval;
    var RecruiterIdval;
    var RecruiterNameval;
    var RecruiterMobval;
    var RecruiterVnetval;
    var getdivid = document.getElementById('msg').id;
    var getdivid1 = document.getElementById('msgunlock').id;    
    
    if (candidateid != null) {
        candidateValue = candidateid;
    }
    else {
        candidateValue = "";
    }
    
    if (document.getElementById('EDOJInputBox') != null) {
        dojValue = document.getElementById('EDOJInputBox').value;
    }
    else {
        dojValue = "";
    }
    if (document.getElementById('offerstatus') != null) {
        statusValue = document.getElementById('offerstatus').value;
    }
    else {
        statusValue = "";
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
    if (document.getElementById('ManagerIDInputBox') != null) {
        ManagerIdval = document.getElementById('ManagerIDInputBox').value;
    }
    else {
        ManagerIdval = "";
    }
    if (document.getElementById('lblManagerName') != null) {
        ManagerNameval = document.getElementById('lblManagerName').innerHTML;
    }
    else {
        ManagerNameval = "";
    }
    if (document.getElementById('ManagerMobileInputBox') != null) {
        ManagerMobval = document.getElementById('ManagerMobileInputBox').value;
    }
    else {
        ManagerMobval = "";
    }
    if (document.getElementById('ManagerVnetInputBox') != null) {
        ManagerVnetval = document.getElementById('ManagerVnetInputBox').value;
    }
    else {
        ManagerVnetval = "";
    }
    if (document.getElementById('RecruiterIDInputBox') != null) {
        RecruiterIdval = document.getElementById('RecruiterIDInputBox').value;
    }
    else {
        RecruiterIdval = "";
    }
    if (document.getElementById('lblRecruiterName') != null) {
        RecruiterNameval = document.getElementById('lblRecruiterName').innerHTML;
    }
    else {
        RecruiterNameval = "";
    }
    if (document.getElementById('RecruiterMobileInputBox') != null) {
        RecruiterMobval = document.getElementById('RecruiterMobileInputBox').value;
    }
    else {
        RecruiterMobval = "";
    }
    if (document.getElementById('RecruiterVnetInputBox') != null) {
        RecruiterVnetval = document.getElementById('RecruiterVnetInputBox').value;
    }
    else {
        RecruiterVnetval = "";
    }
    if (flag == true) {

        var inputData = '{ "candidate":"' + candidateValue + '","candidateDOJ" : "' + dojValue + '","offerStatus" :"' + statusValue + '","emailId" : "' + emailidValue + '","resendMail":"' + ResendMailval + '","managerId":"' + ManagerIdval + '","managerName":"' + ManagerNameval + '","managerMobileNo":"' + ManagerMobval + '","managerVnetNo":"' + ManagerVnetval + '","recruiterId":"' + RecruiterIdval + '","recruiterName":"' + RecruiterNameval + '","recruiterMobileNo":"' + RecruiterMobval + '","recruiterVnetNo":"' + RecruiterVnetval + '"}';

        $.ajax({
            type: "POST",
            url: "../../DashboardService.aspx/UpdatePersonalData",
            data: inputData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: '',
            error:''
        });
        document.getElementById(getdivid).style.display = "block";
        document.getElementById(getdivid1).style.display = "none";
    }
    else {
        document.getElementById(getdivid).style.display = "none";
        document.getElementById(getdivid1).style.display = "none";
    }
}

function UpdateCandidateInfoForCampus() {
    var candidateValue;
    var dojValue;
    var statusValue;
    var emailidValue;
    var ResendMailval;
    var OrgEmailIdval;
    var getdivid = document.getElementById('msg').id;
    var getdivid1 = document.getElementById('msgunlock').id; 
    var dimStatusValue;
    var joiningLocationValue;
    var reportingTimevalue;
    var joiningVenueValue;
    var ResendDimCheckboxvalue;


   if (candidateid != null) {
        candidateValue = candidateid;
    }
    else {
        candidateValue = "";
    }
    if (document.getElementById('EDOJInputBox') != null) {
        dojValue = document.getElementById('EDOJInputBox').value;
    }
    else {
        dojValue = "";
    }
    if (document.getElementById('offerstatus') != null) {
        statusValue = document.getElementById('offerstatus').value;
    }
    else {
        statusValue = "";
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

    if (document.getElementById('Dimcodestatus') != null) {
        dimStatusValue = document.getElementById('Dimcodestatus').value;
    }
    else {
        dimStatusValue = "";
    }

    if (document.getElementById('JoiningLocationstatus') != null) {
        joiningLocationValue = document.getElementById('JoiningLocationstatus').value;
    }
    else {
        joiningLocationValue = "";
    }

    if (document.getElementById('ReportingTime') != null) {
        reportingTimevalue = document.getElementById('ReportingTime').value;
    }
    else {
        reportingTimevalue = "";
    }

    if (document.getElementById('JoiningVenue') != null) {
        joiningVenueValue = document.getElementById('JoiningVenue').value;
    }
    else {
        joiningVenueValue = "";
    }

    if (document.getElementById('ResendDimCheckbox').checked == true) {
        ResendDimCheckboxvalue = 1
    }
    else {
        ResendDimCheckboxvalue = 0
    }

    if (flag == true) {

        var inputData = '{ "candidate":"' + candidateValue + '","candidateDOJ" : "' + dojValue + '","offerStatus" :"' + statusValue + '","emailId" : "' + emailidValue + '","resendMail":"' + ResendMailval + '","dimStatus":"' + dimStatusValue + '","joiningLocation":"' + joiningLocationValue + '","reportingTime":"' + reportingTimevalue + '","joiningVenue":"' + joiningVenueValue + '","dimresendmail":"' + ResendDimCheckboxvalue + '"}';

        $.ajax({
            type: "POST",
            url: "../../DashboardService.aspx/UpdatePersonalDataForCampus",
            data: inputData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: '',
            error: ''
        });
        document.getElementById(getdivid).style.display = "block";
        document.getElementById(getdivid1).style.display = "none";
    }
    else {
        document.getElementById(getdivid).style.display = "none";
        document.getElementById(getdivid1).style.display = "none";
    }
}

function OpenPopForFileUpload() {
    var candidateValue;
    if (candidateid != null) {
        candidateValue = candidateid;
    }
    else {
        candidateValue = "";
    }
    var Path = '../../CommonPages/UploadFileDashboard.aspx?cand=' + candidateValue;

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
        url: "../../DashboardService.aspx/UpdateAssetApprovalStatus",
        data: inputData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: '',
        error: ''
    });

}

function UnlockCandidateAccess() {
    var candidateValue;
    if (candidateid != null) {
        candidateValue = candidateid;
    }
    else {
        candidateValue = "";
    }
    var inputData = '{ "candidate":' + candidateValue + ',"countryId": ' + countryid + '}';
    var getdivid = document.getElementById('msg').id;
    var getdivid1 = document.getElementById('msgunlock').id; 
    $.ajax({
        type: "POST",
        url: "../../DashboardService.aspx/UnlockCandidateAccess",
        data: inputData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: '',
        error: ''
    });
    document.getElementById(getdivid).style.display = "none";
    document.getElementById(getdivid1).style.display = "block";
}

function UpdateCandidateJoiningStatusDetails() {
    var candidateValue;
    var statusValue;
    var getdivid = document.getElementById('msg').id;
    var getdivid1 = document.getElementById('msgunlock').id; 
    if (candidateid != null) {
        candidateValue = candidateid;
    }
    else {
        candidateValue = "";
    }

    if (document.getElementById('JoiningStatus') != null) {
        statusValue = document.getElementById('JoiningStatus').value;
    }
    else {
        statusValue = "";
    }
    var inputData = '{ "candidate":"' + candidateValue + '","joiningStatus": "' + statusValue + '"}';

    $.ajax({
        type: "POST",
        url: "../../DashboardService.aspx/UpdateCandidateJoiningStatusDetails",
        data: inputData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: '',
        error: ''
    });
    document.getElementById(getdivid).style.display = "block";
    document.getElementById(getdivid1).style.display = "none";
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
     });
     $(xmldata).find('Table2').each(function () {
         RecruiterId = $.trim($(this).find('RecruiterId').text());
         RecruiterName =$.trim($(this).find('RecruiterName').text());
         RecruiterMobileNo =$.trim($(this).find('RecruiterMobileNumber').text());
         RecruiterVnetNo = $.trim($(this).find('RecruiterVnetNumber').text());
         ManagerId =$.trim( $(this).find('ESAHiringManagerId').text());
         ManagerName =$.trim($(this).find('ESAHiringManagerName').text());
         ManagerMobileNo =$.trim($(this).find('ESAHiringManagerMobileNumber').text());
         ManagerVnetNo =$.trim($(this).find('ESAHiringManagerVnetNumber').text());
     });
 }

 function FetchRecruiterdata(result) {
     var xmldata = ParsexmlDOM(result.d);
     if ($(xmldata).find('Table2').text() == "") {
         alert('Please Enter Valid Recruiter Id!');
         $("#lblRecruiterName").text("");
         $("#RecruiterMobileInputBox").val("");
         $("#RecruiterVnetInputBox").val("");
         $("#RecruiterIDInputBox").focus();
         return false;
     }
     else {
         $(xmldata).find('Table2').each(function () {
             RecruiterId =$.trim($(this).find('RecruiterId').text());
             RecruiterName = $.trim($(this).find('RecruiterName').text());
             RecruiterMobileNo = $.trim($(this).find('RecruiterMobileNumber').text());
             RecruiterVnetNo = $.trim($(this).find('RecruiterVnetNumber').text());

             //$("#RecruiterIDInputBox").val(RecruiterId);
             $("#lblRecruiterName").text(RecruiterName);
             $("#RecruiterMobileInputBox").val(RecruiterMobileNo);
             $("#RecruiterVnetInputBox").val(RecruiterVnetNo);
         });
     }   
 }

 function FetchManagerdata(result) {
     var xmldata = ParsexmlDOM(result.d);
     if ($(xmldata).find('Table2').text() == "") {
         alert('Please Enter Valid Hiring Manager Id!');
         $("#lblManagerName").text("");
         $("#ManagerMobileInputBox").val("");
         $("#ManagerVnetInputBox").val("");
         $("#ManagerIDInputBox").focus();
         return false;
     }
     else {
         $(xmldata).find('Table2').each(function () {
             ManagerId = $.trim($(this).find('RecruiterId').text());
             ManagerName =$.trim($(this).find('RecruiterName').text());
             ManagerMobileNo = $.trim($(this).find('RecruiterMobileNumber').text());
             ManagerVnetNo =$.trim($(this).find('RecruiterVnetNumber').text());

             //$("#ManagerIDInputBox").val(ManagerId);
             $("#lblManagerName").text(ManagerName);
             $("#ManagerMobileInputBox").val(ManagerMobileNo);
             $("#ManagerVnetInputBox").val(ManagerVnetNo);
         });
     }
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

function BindOfferstatusDropdown() {
    var dataString = '{"mode":"24","parentcode":"4","candidateId":"' + candidateid + '"}';
    $.ajax({
        type: "POST",
        url: "../../FormsService.aspx/GetGeographyMaster",
        data: dataString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (msg) {
            $("#offerstatus").empty();
            $.each(msg.d, function (index, item) {
                $("#offerstatus").get(0).options[$("#offerstatus").get(0).options.length] = new Option(item.Description, item.ID);
            });
            $("#offerstatus").selectedIndex = 1;
        },
        error: function () {
            alert("Failed to load");
        }
    });
}

function FetchManagerContactInfo() {
    $.ajax({
        type: "POST",
        url: "../../DashboardService.aspx/FetchCandidatesPrefillvalues",
        data: "{candidateID:'" + candidateid + "',associateID:'" + $("#ManagerIDInputBox").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: FetchManagerdata,
        error: function () {
            alert("Failed to load");
        }
    });
}

function FetchRecruiterContactInfo() {
    $.ajax({
        type: "POST",
        url: "../../DashboardService.aspx/FetchCandidatesPrefillvalues",
        data: "{candidateID:'" + candidateid + "',associateID:'" + $("#RecruiterIDInputBox").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: FetchRecruiterdata,
        error: function () {
            alert("Failed to load");
        }
    });
}

function FetchPrefillValues() {
    $.ajax({
        type: "POST",
        url: "../../DashboardService.aspx/FetchCandidatesPrefillvalues",
        data: "{candidateID:'" + candidateid + "',associateID:''}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: FetchPrefillvaluesdata,
        error: function () {
            alert("Failed to load");
        }
    });

    if (countryid == 3) {
        if (candidatetype == 1) {
            if (IsAccessAllowed == 0) {
                $("#divUnlockbutton").show();
            }
            else {
                $("#divUnlockbutton").hide();
            }
        }
        else {
            if (IsAccessAllowed == 0) {
                $("#divUnlockbuttoncampus").show();
            }
            else {
                $("#divUnlockbuttoncampus").hide();
            }
        }
    }
}

function showhidestatusflag() {
    if (countryid == 1 || countryid == 2) {
        if (AssetApprovalFlag == 1) {
            if (AssetApproval == 1) {
                $("#divapprovalflagbutton").show();
                $("#btnUnsetapproval").show();
                $("#btnsetapproval").hide();
                $("#divfileuploadlink").show();
            }
            else {
                $("#divapprovalflagbutton").show();
                $("#btnUnsetapproval").hide();
                $("#btnsetapproval").show();
                $("#divfileuploadlink").hide();
            }
        }
        else {
            $("#divapprovalflagbutton").hide();
        }
    }
}


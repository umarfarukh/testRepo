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
var RoleId = parseInt(OBQueryString["roleid"]);
var EmailId,
     DOJ;

$().ready(function () {
    $("#divactions").hide().fadeIn(900);
    FetchPrefillValues();

    $("#EDOJInputBox").datepicker({ dateFormat: 'mm/dd/yy', showOn: "both", buttonImage: "../../../Images/calendar.png", buttonImageOnly: true, changeMonth: true, changeYear: true, buttonAfter: false, hideIfNoPrevNext: false, navigationAsDateFormat: true });


    if (Processid != 2) {
        $("#ResendDiv").show();

        $("#divlateral").css('padding-top', '7px');
        $("#emailid").val(EmailId);
        $("#EDOJInputBox").val(DOJ);
        $("#postjoiningmessage").hide();
    }
    else {
        $("#postjoiningmessage").show();
        $("#Emailid").hide();
        $("#Doj").hide();
//        $("#EDOJInputBox").val(DOJ);
//        $('#EDOJInputBox').attr('disabled', true);
        $("#divlateralbutton").hide();
        $("#ResendDiv").hide();
        $("#divlateral").css('padding-top', '7px');
    }

    $('#btnApplyLateral').click(function () {
        UpdateCandidateInfo();
        FetchPrefillValues();
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

    var emailidValue;
    var ResendMailval;
    var OrgEmailIdval;

    var getdivid = document.getElementById('msg').id;


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


    if (flag == true) {

        var inputData = '{ "candidate":"' + candidateValue + '","candidateDOJ" : "' + dojValue + '","emailId" : "' + emailidValue + '","resendMail":"' + ResendMailval + '"}';

        $.ajax({
            type: "POST",
            url: "../../../DashboardService.aspx/UpdatePersonalDataForManila",
            data: inputData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: '',
            error: ''
        });
        document.getElementById(getdivid).style.display = "block";
    }
    else {
        document.getElementById(getdivid).style.display = "none";
    }
}



function FetchPrefillvaluesdata(result) {
    var xmldata = ParsexmlDOM(result.d);
    $(xmldata).find('Table').each(function () {
        EmailId = $.trim($(this).find('EmailId').text());
        DOJ = $.trim($(this).find('DOJ').text());

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
    $.ajax
    (
    {
        type: "POST",
        url: "../../../DashboardService.aspx/FetchCandidatesPrefillvalues",
        data: "{candidateID:'" + candidateid + "',associateID:''}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: FetchPrefillvaluesdata,
        error: function () {
            alert("Failed to load");
        }
    }
    );
}



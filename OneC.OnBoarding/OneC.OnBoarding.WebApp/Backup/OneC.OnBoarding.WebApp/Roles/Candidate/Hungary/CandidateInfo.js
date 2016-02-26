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
//var RoleId = parseInt(OBQueryString["roleid"]);
var roleGroupId = parseInt(OBQueryString["rgid"]);

$().ready(function () {
    $("#PersonalDetails").hide().fadeIn(900);
    $("#liAssetstatus").show();
    $("#liConvenienttime").show();

    $("#iframeExcel").hide();
    $("#btnHungaryExcel").hide();
    if (roleGroupId == 2) {
        $("#btnHungaryExcel").show();
        $('#btnHungaryExcel').click(function () {
            $("#LoadingImage").show();
            LoadHungaryExcel();
            $("#LoadingImage").delay(500).hide(0);
        });
    }

    var datastring = '{"candidateID":"' + candidateid + '","processId":"' + Processid + '","candidateType":"' + candidatetype + '","pageNo":"1"}'
    $.ajax({
        type: "POST",
        url: "../../../DashboardService.aspx/PersonalData",
        data: datastring,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            var xmldata = ParsexmlDOM(data.d);
            $(xmldata).find('Table').each(function () {
                var Name = $(this).find('CandidateName').text();
                var EmailID = $(this).find('EmailID').text();
                var Mobile = $(this).find('Mobile').text();
                var HiringDept = $(this).find('HiringDepartment').text();
                var RecruiterID = $(this).find('RecruiterID').text();
                var AssociateID = $(this).find('AssociateID').text();
                var DOJ = $(this).find('DOJ').text();
                var ConvenientTime = $(this).find('ConvenientTime').text();
                var Welcomemail = $(this).find('WelcomeMailStatus').text();
                //                var Photouploadstatus = $(this).find('Photouploadstatus').text();
                //                var Dimstatus = $(this).find('DimStatus').text();
                //                var Seatno = $(this).find('SeatNoLocation').text();
                $("#name").text(Name);
                $("#emailid").text(EmailID);
                $("#telephoneno").text(Mobile);
                $("#hiringdeparment").text(HiringDept);
                $("#recruitername").text(RecruiterID);
                $("#associateid").text(AssociateID);
                $("#Joiningdate").text(DOJ);
                $("#convenienttime").text(ConvenientTime);
                $("#welcomemail").text(Welcomemail);
                //                $("#photostatus").text(Photouploadstatus);
                //                $("#dimstatus").text(Dimstatus);
                //                $("#seatno").text(Seatno);
                $("#assetstatus").text("");
            });
            if (countryid != 3) {
                $("#liAssetstatus").append("<label>Asset Status :</label>");
                $(xmldata).find('Table2').each(function () {
                    var AssetType = $(this).find('AssetType').text();
                    var Status = $(this).find('Status').text();
                    var Comments = $(this).find('Comments').text();
                    $("#liAssetstatus").append("<span style='width: 550px;margin-left: 210px;'><label id='assettype' style='width: 90px;'>" + AssetType + "</label><label id='assetstatus' style='width: 450px;'>" + Status + "</label></span><span style='margin-left: 210px;width:550px'><label style='width:90px'>Comments:</label><label id='comments' style='width: 450px;'>" + Comments + "</label></span>");
                });
            }
        },
        error: function (xhr) {
        }

    });


});

function LoadHungaryExcel() {
    var processId = Processid;
    var pageNo = 1;
    var candidateID = candidateid;
    var name = '';
    var recruiterID = '';
    var emailID = '';
    var requisition = '';
    var candidateTypeval = candidatetype;
    var country = countryid;
    var fromDate="01/01/1900";
    var toDate ="01/01/2100";
    var AssociateId = '';
    var VendorId = '0';
    var CisStatus = '0';
    var OfferStatus = '0';
    var BgvFinalStatus = '0';
    var HireTypeDes = '0';
    var SwizExcel = 2;
    $("#iframeExcel").attr('src', '../../../DashboardService.aspx?processId=' + processId + ' &pageNo=' + pageNo + ' &candidateID=' + candidateID + ' &name=' + name + ' &recruiterID=' + recruiterID + ' &emailID=' + emailID + ' &requisition=' + requisition + ' &candidateType=' + candidateTypeval + ' &fromDate=' + fromDate + ' &toDate=' + toDate + ' &country=' + country + '&associateId=' + AssociateId + '&vendorId=' + VendorId + '&cisstatus=' + CisStatus + '&bgvfinalstatus=' + BgvFinalStatus + '&roleid=2' + '&hiretype=' + HireTypeDes + '&SwizExcel=' + SwizExcel);
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


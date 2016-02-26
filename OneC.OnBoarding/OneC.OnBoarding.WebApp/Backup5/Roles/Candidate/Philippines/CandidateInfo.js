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

$().ready(function () {
    $("#PersonalDetails").hide().fadeIn(900);

    $("#liAssetstatus").show();
  
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
                
                var Welcomemail = $(this).find('WelcomeMailStatus').text();
                
                var Dimstatus = $(this).find('DimStatus').text();
                var Seatno = $(this).find('SeatNoLocation').text();
                $("#name").text(Name);
                $("#emailid").text(EmailID);
                $("#telephoneno").text(Mobile);
                $("#hiringdeparment").text(HiringDept);
                $("#recruitername").text(RecruiterID);
                $("#associateid").text(AssociateID);
                $("#Joiningdate").text(DOJ);
                $("#welcomemail").text(Welcomemail);
                $("#dimstatus").text(Dimstatus);
                $("#seatno").text(Seatno);
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


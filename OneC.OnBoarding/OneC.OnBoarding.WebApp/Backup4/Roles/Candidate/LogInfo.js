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

var DataXml,EventCmt,EventTS;

$().ready(function () {
    $("#divLogEventSearch").hide().fadeIn(900);
    FetchPrefillvalues();
});



function FetchPrefillvalues() {
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
}

function FetchPrefillvaluesdata(result) {
    var rowCount = tbllogeventData.rows.length;
        for (var i = 0; i < rowCount; i++) {
            var row = tbllogeventData.rows[i];

            if (rowCount > 0) {
                tbllogeventData.deleteRow(i); 
                rowCount--;
                i--;
            }
        }

        if (result.d == "") {
            $("#tbllogeventData").append("<tr align='center'><td colspan='7'>Oops!!! No Log history found!</td></tr>");
            $("#divLogEventSearch").show();
        }
        else {
            $("#tbllogeventData").append("<tr><th style='width: 70%;'>LogHistory</th><th style='width: 30%;'>LogEventTime</th></tr>");
            var xmldata = ParsexmlDOM(result.d);
            $(xmldata).find('Table1').each(function () {
                //DataXml = ""; //$(this).find('DataXML').text();
                EventCmt = $(this).find('EventComment').text();
                EventTS = $(this).find('EventTS').text();
                $("#tbllogeventData").append("<tr><td>" + EventCmt + "</td><td>" + EventTS + "</td></tr>");
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



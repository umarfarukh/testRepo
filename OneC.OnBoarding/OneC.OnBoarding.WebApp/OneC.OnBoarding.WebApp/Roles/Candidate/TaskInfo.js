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
var sessionId = parseInt(OBQueryString["ssid"]);
var rolegroupId = parseInt(OBQueryString["rgid"]);

$().ready(function () {
    $("#PersonalDetails").hide().fadeIn(900);
    $("#hdnPageNo").val(1);
    var datastring = '{"candidateID":"' + candidateId + '","processId":"' + Processid + '","candidateType":"' + candidatetype + '","pageNo":"1"}'
    $.ajax({
        type: "POST",
        url: "../../DashboardService.aspx/PersonalData",
        data: datastring,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: AjaxSucceeded,
        error: AjaxFailed

    });

});

function AjaxSucceeded(data) {
    var rowCount = tblNewHireTasks.rows.length;
    for (var i = 0; i < rowCount; i++) {
        var row = tblNewHireTasks.rows[i];

        if (rowCount > 0) {
            tblNewHireTasks.deleteRow(i);
            rowCount--;
            i--;
        }
    }

    if (data.d == "") {
        $("#tblNewHireTasks").append("<tr align='center'><td colspan='7'>Oops!!! No such result found!</td></tr>");

    }
    else {
        var totalcount;
        var NewHireTasks = "NewHire Tasks";
        var NewHireStatus = "Status";
        var NewHireSignatureStatus = "Signature Status";

        if (rolegroupId == 2) {
            $("#tblNewHireTasks").append("<tr><th style='width: 50%;'>" + NewHireTasks + "</th><th style='width: 20%;'>" + NewHireStatus + "</th><th style='width: 30%;'>" + NewHireSignatureStatus + "</th></tr>");
        }
        else {
            $("#tblNewHireTasks").append("<tr><th style='width: 90%;'>" + NewHireTasks + "</th><th style='width: 10%;'>" + NewHireStatus + "</th></tr>");
        }
        var xmldata = ParsexmlDOM(data.d);
        $(xmldata).find('Table1').each(function () {
            var NewHireTasks = $(this).find('Title').text();
            var NewHireStatus = $(this).find('DetailViewStatusImage').text();
            var Url = $(this).find('RelativeUrl').text();
            var TaskId = $(this).find('TaskID').text();
            var Querystring = $(this).find('IsQuerystringrequired').text();
            var Overlay = $(this).find('IsOverlayrequired').text();
            var Status = $(this).find('Status').text();
            var ISECMEnabled = $(this).find('ISECMEnabled').text();
            var DocumentUploadStatus = $(this).find('DocumentUploadStatus').text();
            var ECMDocumentName = $(this).find('ECMDocumentName').text();
            var SignatureStatus = $(this).find('SignatureStatus').text();
            var SignatureDetail = $(this).find('SignatureDetail').text();

            if (SignatureDetail != "") {
                var signaturetable = "<table style='width:26%;border-collapse: collapse; border: 1px  #000;'><tr><th style='width:9%; height:15px;'>Page</th><th style= 'width:3%;height:15px;'>Status</th><th style='width:30%;height:15px;'>Signed Date (GMT)</th></tr>";
                var p = SignatureDetail.split(',');
                for (i = 0; i < (p.length - 1); i++) {

                    var b;
                    var PageNo; var IsSigned; var SignedDate
                    b = (p[i]).replace('{', '');
                    b = b.replace('}', '');
                    PageNo = b.split('_');
                    IsSigned = PageNo[1];
                    SignedDate = PageNo[2];
                    PageNo = PageNo[0];
                    if (IsSigned == 1) {
                        IsSigned = "Signed";
                    }
                    else {
                        IsSigned = "Pending";
                        SignedDate = "";
                    }
                    signaturetable = signaturetable + "<tr><td>" + PageNo + "</td><td >" + IsSigned + "</td><td>" + SignedDate + "</td></tr>";
                }
                signaturetable = signaturetable + "</table>";
            }
            // To get Tasks for ECM Enabled in RC DASHBOARD
            if ((ISECMEnabled == 1) && rolegroupId != 2) {
                if (DocumentUploadStatus == 1) {
                    if (countryid == 1 || countryid == 2) {
                        $("#tblNewHireTasks").append("<tr><td><div id='Tasks' ecmDocumentName=" + ECMDocumentName + " onclick=\"ECM.GetFile(this);\"><a href='#' class='atag'>" + NewHireTasks + "</a></div></td><td><img src=" + NewHireStatus + " /></td></tr>");
                    }
                    else {
                        if (Status > 0) {
                            $("#tblNewHireTasks").append("<tr><td><div id='Tasks' ecmDocumentName=" + ECMDocumentName + " onclick=\"ECM.GetFile(this);\"><a href='#' class='atag'>" + NewHireTasks + "</a></div></td><td><img src=" + NewHireStatus + " /></td></tr>");
                        }
                        else {
                            $("#tblNewHireTasks").append("<tr><td>" + NewHireTasks + "</td><td><img src=" + NewHireStatus + " /></td></tr>");
                        }
                    }
                }
                if (DocumentUploadStatus != 1) {
                    if (countryid == 1 || countryid == 2) {
                        $("#tblNewHireTasks").append("<tr><td><div id='Tasks' onclick=\"OpenPop('" + Url + "'," + TaskId + "," + candidateId + "," + countryid + ",'" + Querystring + "','" + Overlay + "');\"><a href='#' class='atag'>" + NewHireTasks + "</a></div></td><td><img src=" + NewHireStatus + " /></td></tr>");
                    }
                    else {
                        if (Status > 0) {
                            $("#tblNewHireTasks").append("<tr><td><div id='Tasks' onclick=\"OpenPop('" + Url + "'," + TaskId + "," + candidateId + "," + countryid + ",'" + Querystring + "','" + Overlay + "');\"><a href='#' class='atag'>" + NewHireTasks + "</a></div></td><td><img src=" + NewHireStatus + " /></td></tr>");
                        }
                        else {
                            $("#tblNewHireTasks").append("<tr><td>" + NewHireTasks + "</td><td><img src=" + NewHireStatus + " /></td></tr>");
                        }
                    }
                }
            }
            // To get Tasks for ECM Enabled in HRSS DAHBOARD
            else if ((ISECMEnabled == 1) && rolegroupId == 2) {
                if (DocumentUploadStatus == 1) {

                    if (signaturetable != undefined) {
                        $("#tblNewHireTasks").append("<tr><td><div id='Tasks' ecmDocumentName=" + ECMDocumentName + " onclick=\"ECM.GetFile(this);\"><a href='#' class='atag'>" + NewHireTasks + "</a></div></td><td><img src=" + NewHireStatus + " /></td><td class=hasTooltip>" + signaturetable + "" + SignatureStatus + "</td></tr>");
                    }
                    else {
                        $("#tblNewHireTasks").append("<tr><td><div id='Tasks' ecmDocumentName=" + ECMDocumentName + " onclick=\"ECM.GetFile(this);\"><a href='#' class='atag'>" + NewHireTasks + "</a></div></td><td><img src=" + NewHireStatus + " /></td><td>N/A</td></tr>");
                    }
                }
                if (DocumentUploadStatus != 1) {

                    if (signaturetable != undefined) {
                        $("#tblNewHireTasks").append("<tr><td><div id='Tasks' onclick=\"OpenPop('" + Url + "'," + TaskId + "," + candidateId + "," + countryid + ",'" + Querystring + "','" + Overlay + "');\"><a href='#' class='atag'>" + NewHireTasks + "</a></div></td><td><img src=" + NewHireStatus + " /></td><td class=hasTooltip>" + signaturetable + "" + SignatureStatus + "</td></tr>");
                    }
                    else {
                        $("#tblNewHireTasks").append("<tr><td><div id='Tasks' onclick=\"OpenPop('" + Url + "'," + TaskId + "," + candidateId + "," + countryid + ",'" + Querystring + "','" + Overlay + "');\"><a href='#' class='atag'>" + NewHireTasks + "</a></div></td><td><img src=" + NewHireStatus + " /></td><td>N/A</td></tr>");
                    }
                }
            }
            //To get Tasks for ECM Not Enabled in RCDASHBOARD
            else if (rolegroupId != 2) {
                if (countryid == 1 || countryid == 2) {
                    $("#tblNewHireTasks").append("<tr><td><div id='Tasks' onclick=\"OpenPop('" + Url + "'," + TaskId + "," + candidateId + "," + countryid + ",'" + Querystring + "','" + Overlay + "');\"><a href='#' class='atag'>" + NewHireTasks + "</a></div></td><td><img src=" + NewHireStatus + " /></td></tr>");
                }
                else {
                    if (Status > 0) {
                        $("#tblNewHireTasks").append("<tr><td><div id='Tasks' onclick=\"OpenPop('" + Url + "'," + TaskId + "," + candidateId + "," + countryid + ",'" + Querystring + "','" + Overlay + "');\"><a href='#' class='atag'>" + NewHireTasks + "</a></div></td><td><img src=" + NewHireStatus + " /></td></tr>");
                    }
                    else {
                        $("#tblNewHireTasks").append("<tr><td>" + NewHireTasks + "</td><td><img src=" + NewHireStatus + " /></td></tr>");
                    }
                }
            }
            //To get Tasks for ECM Not Enabled in HRSSDASHBOARD
            else if (rolegroupId == 2) {
                if (signaturetable != undefined) {
                    $("#tblNewHireTasks").append("<tr><td><div id='Tasks' onclick=\"OpenPop('" + Url + "'," + TaskId + "," + candidateId + "," + countryid + ",'" + Querystring + "','" + Overlay + "');\"><a href='#' class='atag'>" + NewHireTasks + "</a></div></td><td><img src=" + NewHireStatus + " /></td><td class=hasTooltip>" + signaturetable + "" + SignatureStatus + "</td></tr>");
                }
                else {
                    $("#tblNewHireTasks").append("<tr><td><div id='Tasks' onclick=\"OpenPop('" + Url + "'," + TaskId + "," + candidateId + "," + countryid + ",'" + Querystring + "','" + Overlay + "');\"><a href='#' class='atag'>" + NewHireTasks + "</a></div></td><td><img src=" + NewHireStatus + " /></td><td>N/A</td></tr>");
                }
            }
            var Recordcount = $(this).find('TotalRecords').text();
            $("#hdnTotalRecord").val(Recordcount);
        });

        var Recordcount = $("#hdnTotalRecord").val();
        $.ajax({
            type: "POST",
            url: "../../DashboardService.aspx/DoPagingForDashboard",
            data: "{itotalCount:'" + Recordcount + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: GetPagination,
            error: AjaxFailed
        });
    }
}



function PaginationDashboard(startIndex, pageNo) {
    FetchCand(pageNo, 0);
}

function GetPagination(result) {
    $("#divPagination").html(result.d);
}

function AjaxFailed(data) {
    //alert(result.responseText);
}

function FetchCand(pageNo) {
    $("#hdnPageNo").val(pageNo);
    var datastring = '{"candidateID":"' + candidateId + '","processId":"' + Processid + '","candidateType":"' + candidatetype + '","pageNo":"' + pageNo + '"}'
    $.ajax({
        type: "POST",
        url: "../../DashboardService.aspx/PersonalData",
        data: datastring,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: AjaxSucceeded,
        error: AjaxFailed
    });

    var Recordcount = $("#hdnTotalRecord").val();
    $.ajax({
        type: "POST",
        url: "../../DashboardService.aspx/DoPagingForDashboard",
        data: "{itotalCount:'" + Recordcount + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: GetPagination,
        error: AjaxFailed
    });

}

function OpenPop(Url, TaskID, CandidateId, CountryId, IsQuerystringrequired, IsOverlayrequired) {
    if (IsQuerystringrequired == "1") {
        var Path = Url + '?ss=' + sessionId + '&cand=' + CandidateId + '&task=' + TaskID + '&cntry=' + CountryId + '&opmde=' + opmde;
    }
    else {
        var Path = '../NHPages/Paperwork/CommonNHPages/UrlPopUp.htm?PopUp=' + Url;
    }

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
        if (IsOverlayrequired == "1") {
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

function disablePopup() {
    //disables popup only if it is enabled
    $("#overLay").hide();
    $(".popupContactwrapper").hide();
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

function ClosePDFViewer() {
    document.getElementById("ifPDFViewer").src = '';
    $("#divPDFLoader").hide();
}





var stDate, endDate;
var OBQueryString = (function (a) { if (a == "") return {}; var b = {}; for (var i = 0; i < a.length; ++i) { var p = a[i].split('='); if (p.length != 2) continue; b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " ")); } return b; })(window.location.search.substr(1).split('&'));
//var sessionId = parseInt(OBQueryString["ssid"]);
var countryId = parseInt(OBQueryString["cntry"]);
var roleGroupId = parseInt(OBQueryString["rgid"]);
var roleId = parseInt(OBQueryString["roleid"]);
var pId = $("#hdnPId").val();

$().ready(function () {
    //var flagcountry = 0;
    $.ajax({
        type: "POST",
        url: "../../DashboardService.aspx/BindCountryForHRSS",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (msg) {
            $.each(msg.d, function (index, item) {
            if ((item.CountryID == 0) || (item.CountryID == 1) || (item.CountryID == 2))
            {
               $("#countrySelectBox").get(0).options[$("#countrySelectBox").get(0).options.length] = new Option(item.CountryName, item.CountryID);
            }
            });
            $("#countrySelectBox").selectedIndex = 1;
        },
        error: function () {
          // alert("Failed to load");
        }
    });

    var countryInput = '{"countryID":"' + $("#countrySelectBox").val() + '"}'
    $.ajax({
        type: "POST",
        url: "../../DashboardService.aspx/GetDefaultDate",
        data: countryInput,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            stDate = result.d[0].Value;
            endDate = result.d[1].Value;

        },
        error: function () {
        }
    });


    var mastercodesInput = '{"mode":"42","parentcode":"3","candidateId":"0"}'
    $.ajax({
        type: "POST",
        url: "../../FormsService.aspx/GetGeographyMaster",
        data: mastercodesInput,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (msg) {
            $.each(msg.d, function (index, item) {
                $("#ERFromCandidateStatus").get(0).options[$("#ERFromCandidateStatus").get(0).options.length] = new Option(item.Description, item.ID);
            });
            $("#ERFromCandidateStatus").selectedIndex = 1;
        },
        error: function () {
           // alert("Failed to load");
        }
    });


    var mastercodesInput = '{"mode":"43","parentcode":"3","candidateId":"0"}'
    $.ajax({
        type: "POST",
        url: "../../FormsService.aspx/GetGeographyMaster",
        data: mastercodesInput,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (msg) {
            $.each(msg.d, function (index, item) {
                $("#ConfirmationERprocess").get(0).options[$("#ConfirmationERprocess").get(0).options.length] = new Option(item.Description, item.ID);
            });
            $("#ConfirmationERprocess").selectedIndex = 1;
        },
        error: function () {
          //  alert("Failed to load");
        }
    });

    var mastercodesInput = '{"mode":"48","parentcode":"137","candidateId":"0"}'
    $.ajax({
        type: "POST",
        url: "../../FormsService.aspx/GetGeographyMaster",
        data: mastercodesInput,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (msg) {
            $.each(msg.d, function (index, item) {
                $("#ddHireType").get(0).options[$("#ddHireType").get(0).options.length] = new Option(item.Description, item.ID);
            });
            $("#ddHireType").selectedIndex = 1;
        },
        error: function () {
            //  alert("Failed to load");
        }
    });

    // Added 305054- for Processtype dropdown
    var mastercodesInput = '{"mode":"55","parentcode":"42","candidateId":"0"}'
    $.ajax({
        type: "POST",
        url: "../../FormsService.aspx/GetGeographyMaster",
        data: mastercodesInput,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (msg) {
            $.each(msg.d, function (index, item) {
                $("#ddl_ProcessType").get(0).options[$("#ddl_ProcessType").get(0).options.length] = new Option(item.Description, item.ID);
            });
            $("#ddl_ProcessType").selectedIndex = 1;
        },
        error: function () {
            // alert("Failed to load");
        }
    });


   /* var mastercodesInput = '{"mode":"44","parentcode":"3","candidateId":"0"}'
    $.ajax({
        type: "POST",
        url: "../../FormsService.aspx/GetGeographyMaster",
        data: mastercodesInput,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (msg) {
            $.each(msg.d, function (index, item) {
                $("#selectAssetStatus").get(0).options[$("#selectAssetStatus").get(0).options.length] = new Option(item.Description, item.ID);
            });
            $("#selectAssetStatus").selectedIndex = 1;
        },
        error: function () {
            //  alert("Failed to load");
        }
    });*/
   

    $("#DOJFromInputBox").val(stDate);
    $("#DOJToInputBox").val(endDate);

    $("#DOJFromInputBox").datepicker({ dateFormat: 'mm/dd/yy', showOn: "both", buttonImage: "../../Images/calendar.png", buttonImageOnly: true, changeMonth: true, changeYear: true, buttonAfter: false, hideIfNoPrevNext: false, navigationAsDateFormat: true, buttonText: 'From Date' });
    $("#DOJToInputBox").datepicker({ dateFormat: 'mm/dd/yy', showOn: "both", buttonImage: "../../Images/calendar.png", buttonImageOnly: true, changeMonth: true, changeYear: true, buttonAfter: false, hideIfNoPrevNext: false, navigationAsDateFormat: true, buttonText: 'To Date' });


    $("#hdnProcessId").val(1); 
    $("#hdnPageNo").val(1);
    $('#div_menu_item_bg a:first').click();

    $("#iframeExcel").hide();
    $('#apply_nh').click(function () {
        $("#LoadingImage").show();
        ValidateApply();

        $("#tblDashboardData").hide().fadeIn(700);
        settablebackground();
    });

    $('#clear_nh').click(function () {
        Clear();

    });
    $("#divParent").css('margin-right', '-9px');

    FetchCand(1);
});


function ValidateApply() {
    var status1 = false;
    if (status1 == DateCompare($('#DOJFromInputBox').val(), $('#DOJToInputBox').val())) {
        //MsgboxAlertDashboard(23, 2, 27, "DATE_VALIDATE", "Invalid Date Range!Start Date cannot be after End Date");
        alert("Start Date cannot be after End Date");
        $("#LoadingImage").delay(100).hide(0);
        return false;
    }
    FetchCand(1);
}
function DateCompare(fromDate, toDate) {
    if (Date.parse(fromDate) > Date.parse(toDate)) {
        //alert("Invalid Date Range!\nStart Date cannot be after End Date!")
        return false;
    }
    else
        return true;
}

function Onentertext() {
    $('#CandidateInputBox').keypress(function (e) {
        if (e.which == 13) {
            ValidateApply();
            $(this).focus();
            return false;
        }
    });
    $('#CandidateNameInputBox').keypress(function (e) {
        if (e.which == 13) {
            ValidateApply();
            $(this).focus();
            return false;
        }
    });
  
   }

function Clear() {
    $("#CandidateInputBox").val('');
    $("#CandidateNameInputBox").val('');
    $("#DOJFromInputBox").val(stDate);
    $("#DOJToInputBox").val(endDate);
    if ($("#hdnProcessId").val() == 3) {
     
    }
    else {
        $("#countrySelectBox").prop('selectedIndex', 0);
    
    }
    $("#ddHireType").prop('selectedIndex', 0);
    $("#ConfirmationERprocess").prop('selectedIndex', 0);
    $("#ERFromCandidateStatus").prop('selectedIndex', 0);
    $("#ddl_ProcessType").prop('selectedIndex', 1);
    
    ValidateApply();
}

function FetchCand(pageNo) {

    $("#hdnPageNo").val(pageNo);

    //var dataString = '{"processId" : "' + $("#hdnProcessId").val() + '" ,"pageNo":"' + pageNo + '","candidateID":"' + $("#CandidateInputBox").val() + '", "name":"' + $.trim($("#CandidateNameInputBox").val()) + '",  "fromDate":"' + $("#DOJFromInputBox").val() + '", "todate":"' + $("#DOJToInputBox").val() + '", "country":"' + $("#countrySelectBox").val() + '",  "erfromcandidatectatus":"' + $("#ERFromCandidateStatus").val() + '","confirmationerprocess":"' + $("#ConfirmationERprocess").val() + '","hireType":"' + $("#ddHireType").val() + '","processType":"' + $("#ddl_ProcessType").val() + '"}';
    var dataString = '{"processId" : "' + $("#hdnProcessId").val() + '","pageNo":"' + pageNo + '","candidateID":"' + $("#CandidateInputBox").val() + '", "name":"' + $.trim($("#CandidateNameInputBox").val()) + '",  "fromDate":"' + $("#DOJFromInputBox").val() + '", "todate":"' + $("#DOJToInputBox").val() + '", "country":"' + $("#countrySelectBox").val() + '",  "erfromcandidatectatus":"' + $("#ERFromCandidateStatus").val() + '","confirmationerprocess":"' + $("#ConfirmationERprocess").val() + '","hireType":"' + $("#ddHireType").val() + '","processType":"' + $("#ddl_ProcessType").val() + '"}';
    $.ajax({
        type: "POST",
        url: "../../DashboardService.aspx/GetERprocessCandidateView",
        data: dataString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: AjaxSucceeded,
        error: function () { alert('error'); },
        complete: function () {
            //$("#LoadingImage").delay(100).hide(0);
            $("#LoadingImage").hide();
        }

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

function PaginationDashboard(startIndex, pageNo) {
    $("#LoadingImage").show();
    FetchCand(pageNo);
    //$("#tblDashboardData").hide().fadeIn(700);
}
function DeleteTableRows() {
    var tblDashboardData = document.getElementById("tblDashboardData");
    var rowCount = tblDashboardData.rows.length;
    for (var i = 0; i < rowCount; i++) {
        var row = tblDashboardData.rows[i];

        if (rowCount > 0) {
            tblDashboardData.deleteRow(i);
            rowCount--;
            i--;
        }
    }
}

function AjaxSucceeded(data) {
    DeleteTableRows(); 
    var xmldata = ParsexmlDOM(data.d);
    if ($(xmldata).find('Table1').text() == "") {
        $("#tblDashboardData").append("<tr align='center'><td colspan='7' Style='text-align:center;'>Oops!!! No such result found!</td></tr>");
        $("#divDashboardCandidateSearch").show();
        $("#divPagination").hide();
       
    }
    else {

         var xmldata = ParsexmlDOM(data.d); 
            var RowNumberHeader = "Sno";
            var CandidateNameHeader = "Candidate Name";
            var DesignationDescHeader = "Level";
            var RecruiterNameHeader = "RecruiterNameId";
            var CandidateDOJHeader = "DOJ";
            var ERFormStatusHeader = "ERFormStatus";
            var RCConfirmationHeader = "RCConfirmation";
            var Laptop = "Laptop";
            var Blackberry = "Blackberry";
            var CellPhone = "CellPhone";
            var Z10 = "BlackberryZ10";
            var LGG2 = "LGG2";
            var SamsungNote3 = "SamsungNote3";
            var SamsungS3 = "SamsungS3";            
            var SamsungS4 = "SamsungS4";
            var SamsungS5 = "SamsungS5";
            var IPhone4S = "IPhone4S";
            var IPhone5C = "IPhone5C";
            var IPhone5S = "IPhone5S";

            var SamsungNote4 = "SamsungNote4";
            var IPhone6 = "IPhone6";
            var IPhone6P = "IPhone6P";

            var LG_G3_16GB = "LG_G3_16GB";

            var Samsung_S6_32GB = "Samsung_S6_32GB";
            var Samsung_S6_64GB = "Samsung_S6_64GB";
            var Samsung_S6_128GB = "Samsung_S6_128GB";

            var Samsung_S6edge_32GB = "Samsung_S6edge_32GB";
            var Samsung_S6edge_64GB = "Samsung_S6edge_64GB";
            var Samsung_S6edge_128GB = "Samsung_S6edge_128GB";

            var HireType = "HireType";

            $("#tblDashboardData").append("<tr><th>" + RowNumberHeader + "</th><th>" + CandidateNameHeader + "</th><th>" + DesignationDescHeader + "</th><th>" + RecruiterNameHeader + "</th><th>" + CandidateDOJHeader + "</th><th>" + ERFormStatusHeader + "</th><th>" + RCConfirmationHeader + "</th><th>" + Laptop + "</th><th>" + Blackberry + "</th><th>" + CellPhone + "</th><th>" + Z10 + "</th><th>" + LGG2 + "</th><th>" + SamsungNote3 + "</th><th>" + SamsungS3 + "</th><th>" + SamsungS4 + "</th><th>" + SamsungS5 + "</th><th>" + IPhone4S + "</th><th>" + IPhone5C + "</th><th>" + IPhone5S + "</th><th>" + SamsungNote4 + "</th><th>" + IPhone6 + "</th><th>" + IPhone6P + "</th><th>" + LG_G3_16GB + "</th><th>" + Samsung_S6_32GB + "</th><th>" + Samsung_S6_64GB + "</th><th>" + Samsung_S6_128GB + "</th><th>" + Samsung_S6edge_32GB + "</th><th>" + Samsung_S6edge_64GB + "</th><th>" + Samsung_S6edge_128GB + "</th><th>" + HireType + "</th></tr>");

            $(xmldata).find('Table1').each(function () {
                var RowNumber = $(this).find('RowNumber').text();
                var CandidateName = $(this).find('CandidateName').text();
                var CandidateFName = $(this).find('FName').text();
                var LoginId = $(this).find('LoginId').text();
                var AssociateId = $(this).find('AssociateId').text();
                var DesignationDesc = $(this).find('DesignationDesc').text();
                var RecruiterName = $(this).find('RecruiterNameID').text();
                var CandidateDOJ = $(this).find('DOJ').text();
                var CandidateId = $(this).find('CandidateId').text();
                var CandidateType = $(this).find('CandidateType').text();
                var ProcessId = $(this).find('ProcessId').text();
                var CountryId = $(this).find('CountryId').text();
                var SessionId = $(this).find('SessionId').text();
                $("#hdnSessionId").val(SessionId);
                var RoleId = $(this).find('RoleGroupId').text();
                var CadidateID = $(this).find('CandidateId').text();
                var ERFormStatus = $(this).find('ERFormStatus').text();
                var RCConfirmation = $(this).find('RCConfirmation').text();
                var Laptop = $(this).find('Laptop').text(); // "Laptop";
                var Blackberry = $(this).find('Blackberry').text(); // "Blackberry";
                var CellPhone = $(this).find('CellPhone').text(); // "CellPhone";
                var TaskId = $(this).find('TaskId').text();
                var Z10 = $(this).find('BlackBerryZ10').text();
                var LGG2= $(this).find('LG_G2').text();
                var SamsungNote3 = $(this).find('SamsungNote3').text();
                var SamsungS3 = $(this).find('SamsungS3').text();
                var SamsungS4 = $(this).find('SamsungS4').text();
                var SamsungS5 = $(this).find('SamsungS5').text();
                var IPhone4S = $(this).find('IPhone4S').text();
                var IPhone5C = $(this).find('IPhone5C').text();
                var IPhone5S = $(this).find('IPhone5S').text();

                var SamsungNote4 = $(this).find('SamsungNote4').text();
                var IPhone6 = $(this).find('IPhone6').text();
                var IPhone6P = $(this).find('IPhone6P').text();

                var LG_G3_16GB = $(this).find('LG_G3_16GB').text();

                var Samsung_S6_32GB = $(this).find('Samsung_S6_32GB').text();
                var Samsung_S6_64GB = $(this).find('Samsung_S6_64GB').text();
                var Samsung_S6_128GB = $(this).find('Samsung_S6_128GB').text();

                var Samsung_S6edge_32GB = $(this).find('Samsung_S6edge_32GB').text();
                var Samsung_S6edge_64GB = $(this).find('Samsung_S6edge_64GB').text();
                var Samsung_S6edge_128GB = $(this).find('Samsung_S6edge_128GB').text();

                var HireType = $(this).find('HireType').text();
                var ContractorFlag = $(this).find('ContractorFlag').text();


                $("#tblDashboardData").append("<tr><td>" + RowNumber + "</td><td><div id='Candidate'><a href='#'  onclick=\"OpenPop(" + CandidateId + "," + CountryId + "," + TaskId + "," + ContractorFlag + ");\">" + CandidateName + "</a></div></td><td>" + DesignationDesc + "</td><td>" + RecruiterName + "</td><td>" + CandidateDOJ + "</td><td>" + ERFormStatus + "</td><td>" + RCConfirmation + "</td><td>" + Laptop + "</td><td>" + Blackberry + "</td><td>" + CellPhone + "</td><td>" + Z10 + "</td><td>" + LGG2 + "</td><td>" + SamsungNote3 + "</td><td>" + SamsungS3 + "</td><td>" + SamsungS4 + "</td><td>" + SamsungS5 + "</td><td>" + IPhone4S + "</td><td>" + IPhone5C + "</td><td>" + IPhone5S + "</td><td>" + SamsungNote4 + "</td><td>" + IPhone6 + "</td><td>" + IPhone6P + "</td><td>" + LG_G3_16GB + "</td><td>" + Samsung_S6_32GB + "</td><td>" + Samsung_S6_64GB + "</td><td>" + Samsung_S6_128GB + "</td><td>" + Samsung_S6edge_32GB + "</td><td>" + Samsung_S6edge_64GB + "</td><td>" + Samsung_S6edge_128GB + "</td><td>" + HireType + "</td></tr>");
            });
        
        $(xmldata).find('Table').each(function () {
            var Recordcount = $(this).find('Column1').text();
            $("#hdnTotalRecord").val(Recordcount);
        });
        $("#divPagination").show();
    }
    settablebackground();
}

function AjaxFailed(data) {
    //alert(result.responseText);
}

function GetPagination(result) {
    $("#divPagination").html(result.d);
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
    $(".popupContactwrapper").empty().remove(); /*changed from hide() to remove*/
    $("#overLay").hide();
}

function settablebackground() {
    $('.paper_wrk tr:even td').css('background-color', '#ffffff');
    $('.paper_wrk tr:odd td').css('background-color', '#e1e7e9');
    $('.paper_wrk tr th:not(:last-child)').css('border-right', '1px solid #b2b2b2');
    $('.paper_wrk tr td:not(:last-child)').css('border-right', '1px solid #b2b2b2');
    $('.paper_wrk tr:not(:last-child) td').css('border-bottom', '1px solid #b2b2b2');
    $('.unselected_page').click(function () {
        $(this).addClass('select_page').removeClass('unselected_page');
        $(this).siblings().addClass('unselected_page').removeClass('select_page');
    });
    $('.paper_wrk tr td').each(function (i, val) {
        var txt = $(this).text();
        if (txt == "Completed") {
            $(this).css('color', '#137a13');
        }
    });
}
function openPopup() {
    var $backgroundOverLay = $('<div id="overLay"/>');
    $("body").prepend($backgroundOverLay);
    $("#overLay").css({
        "opacity": "0.7"
    });
    $("#overLay").show();
}


function ValidateOnlyInteger(e) {
    if (window.event) keycode = window.event.keyCode;
    else if (e) keycode = e.which;
    else return true;

    if (((keycode >= 48) && (keycode <= 57)) || (keycode == 8)) {
        return true;
    }
    else {
        return false;
    }
}

function OpenPop(CandidateId, CountryId, TaskId, ContractorFlag) {
 var Url = "";
 var opmde = 1;
 if (CountryId == 1) {
     if (ContractorFlag == 1) {
         Url = '../NHPages/Paperwork/US/ContractorERF.htm';
     }
     else {
         if (TaskId == 746) { 
         Url = '../NHPages/Paperwork/US/CPERF_SM_US.htm'
         }
         else {
             Url = '../NHPages/Paperwork/US/CPERF_US.htm';
         }
     }
 }
 if (CountryId == 2) {
     if (ContractorFlag == 1) {
         Url = '../NHPages/Paperwork/Canada/ContractorERF.htm';
     }
     else {
         Url = '../NHPages/Paperwork/Canada/CperfCanada.htm';
     }
 }
 var sessionId = $("#hdnSessionId").val();

 var Path = Url + '?ss=' + sessionId + '&cand=' + CandidateId + '&task=' + TaskId + '&cntry=' + CountryId + '&opmde=' + opmde;
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
window.updateWithNewData = function () {
    location.reload();
}
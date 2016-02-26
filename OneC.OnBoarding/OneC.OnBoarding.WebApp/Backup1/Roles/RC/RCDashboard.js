var flagdisablecandidatetype = 0;
var flagdisablecandidatehiretype = 0;
var stDate, endDate, countryid;
var OBQueryString = (function (a) { if (a == "") return {}; var b = {}; for (var i = 0; i < a.length; ++i) { var p = a[i].split('='); if (p.length != 2) continue; b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " ")); } return b; })(window.location.search.substr(1).split('&'));
var sessionId = parseInt(OBQueryString["ssid"]);
var countryId = parseInt(OBQueryString["cntry"]);
var roleGroupId = parseInt(OBQueryString["rgid"]);
var roleId = parseInt(OBQueryString["roleid"]);
var pId = $("#hdnPId").val();

function GetDashboardFilters() {
    var datastring = '{"sessionId":' + sessionId + ',"roleGroupId":' + roleGroupId + '}';
   
//    try {
        
//        $.ajax({
//            type: "POST",
//            url: "../../DashboardService.aspx/GetDashboardFilter",
//            data: datastring,
//            contentType: "application/json; charset=utf-8",
//            dataType: "json",
//            async: false,
//            success: function (msg) {
//                $.each(msg.d.DashboardFilterList, function (index, item) {
//                    var obj = $(this);
//                    var cntrl = $('select[name="' + obj[0].FilterName + '"]');
//                    try {
//                        cntrl.get(0).options[cntrl.get(0).options.length] = new Option(item.FilterDesc, item.FilterId);
//                    } catch (e) { }
//                });
//            },
//            error: AjaxFailed
//        });


        try {
            $.ajax({
                type: "POST",
                url: "../../DashboardService.aspx/GetDashboardFilter",
                data: '{"sessionId":' + sessionId + ',"roleGroupId":' + roleGroupId + '}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (msg) {
                    $.each(msg.d.DashboardFilterList, function (index, item) {
                        var obj = $(this);
                        var cntrl = $('select[name="' + obj[0].FilterName + '"]');
                        try {
                            cntrl.get(0).options[cntrl.get(0).options.length] = new Option(item.FilterDesc, item.FilterId);
                        } catch (e) { }
                    });
                },
                error: function (xhr) {
                }
            });
       
      }
    catch (e) { }

    try {
        $("#CisStatusSelectBox").selectedIndex = 1;
        $("#OfferStatusSelectBox").selectedIndex = 1;
        //        if($("#locationSelectBox option:selected").val()=="1"||$("#locationSelectBox option:selected").val()=="2")
        //        {
        $("#candidateHireTypeSelectBox").selectedIndex = 1
        //        }
    } catch (e) { }

}

function GetPageMenu() {
    var dataString = '{"sessionId":' + sessionId.toString() + ',"roleId":' + roleId.toString() + ',"countryId":' + countryId.toString() + ',"basePageId":' + pId.toString() + '}';
    var mCnt = 0;
    try {
        $.ajax({
            type: "POST",
            url: "../../FormsService.aspx/GetPageMenuMappings",
            data: dataString,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (data) {
                mCnt = data.d.MenuCount;
                $("#div_menu_item_bg").append(data.d.MenuHtml);
            },
            error: function (xhr) {
            }
        });
    } catch (e) { }
}

function EnableMenu(obj) {
    $("#div_menu_item_bg a").each(function () { $(this).removeClass('selected_menu_item').addClass('normal_menu_item'); });
    $(obj).removeClass('normal_menu_item').addClass('selected_menu_item');
}

$().ready(function () {
    GetPageMenu();
    GetDashboardFilters();
    //$("#btnUtility").hide();
    $("#divsearchfilter").hide().fadeIn(700);
    $("#LoadingImage").show();
    showhidecontrolsNonBGV();

    $.ajax({
        type: "POST",
        url: "../../DashboardService.aspx/BindLocationForRC",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (msg) {

            $.each(msg.d, function (index, item) {
                $("#locationSelectBox").get(0).options[$("#locationSelectBox").get(0).options.length] = new Option(item.CountryCityDesc, item.CountryID + '-' + item.StateId + '-' + item.CityId);
                if (item.CountryID != "3" || item.CountryID != "0" || item.CountryID != "4") {
                    flagdisablecandidatetype = 1;
                }
                if ($("#locationSelectBox option:selected").val() == "1" || $("#locationSelectBox option:selected").val() == "2") {
                    $("#candidateHireTypeSelectBox").selectedIndex = 1;
                }
            });
            $("#locationSelectBox").selectedIndex = 1;

        },
        error: function () {
            alert("Failed to load");
        }
    });


//    var hireTypeParentId = 138;
//    var parentId = '{"parentId":' + hireTypeParentId + '}';
//    $.ajax({//hiretypeforuk

//        type: "POST",
//        url: "../../DashboardService.aspx/BindCandidateHireType",
//        data: parentId,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        async: false,
//        success: function (msg) {
//            $.each(msg.d, function (index, item) {
//                $("#candidateHireTypeSelectBox").get(0).options[$("#candidateHireTypeSelectBox").get(0).options.length] = new Option(item.CandidateTypeDesc, item.CandidateTypeCode);
//            });
//            $("#candidateHireTypeSelectBox").selectedIndex = 1;
//        },
//        error: function () {
//            alert("Failed to load");
//        }
    //    });


    //    $.ajax({
    //        type: "POST",
    //        url: "../../DashboardService.aspx/BindCandidateType",
    //        data: "{}",
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        async: false,
    //        success: function (msg) {
    //            $.each(msg.d, function (index, item) {
    //                $("#candidateTypeSelectBox").get(0).options[$("#candidateTypeSelectBox").get(0).options.length] = new Option(item.CandidateTypeDesc, item.CandidateTypeCode);
    //            });
    //            $("#candidateTypeSelectBox").selectedIndex = 1;
    //        },
    //        error: function () {
    //            alert("Failed to load");
    //        }
    //    });

    //    var mastercodesInput = '{"mode":"32","parentcode":"131","candidateId":"0"}'
    //    $.ajax({
    //        type: "POST",
    //        url: "../../FormsService.aspx/GetGeographyMaster",
    //        data: mastercodesInput,
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        async: false,
    //        success: function (msg) {
    //            $.each(msg.d, function (index, item) {
    //                $("#TypeOfJoinerSelectBox").get(0).options[$("#TypeOfJoinerSelectBox").get(0).options.length] = new Option(item.Description, item.ID);
    //            });
    //            $("#TypeOfJoinerSelectBox").selectedIndex = 1;
    //        },
    //        error: function () {
    //            alert("Failed to load");
    //        }
    //    });

    HideCandidateType();
    ShowHideHireType();

    $("#locationSelectBox").change(function () {
        HideCandidateType();
        settablebackground();
        ShowHideHireType();
    });

    Onentertext();
    var CountryId = ($("#locationSelectBox option:selected").val()).split("-");
    if (CountryId[0] == "") {
        countryid = '{"countryID":"' + 0 + '"}'
    }
    else {
        countryid = CountryId[0];
        countryid = '{"countryID":"' + countryid + '"}'
    }
    $.ajax({
        type: "POST",
        url: "../../DashboardService.aspx/GetDefaultDate",
        data: countryid,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            stDate = result.d[0].Value;
            endDate = result.d[1].Value;
        },
        error: function () {
            alert("Failed to load");
        }
    });

    $("#DOJFromInputBox").val(stDate);
    $("#DOJToInputBox").val(endDate);

    $("#DOJFromInputBox").datepicker({ dateFormat: 'mm/dd/yy', showOn: "both", buttonImage: "../../Images/calendar.png", buttonImageOnly: true, changeMonth: true, changeYear: true, buttonAfter: false, hideIfNoPrevNext: false, navigationAsDateFormat: true, buttonText: 'From Date' });
    $("#DOJToInputBox").datepicker({ dateFormat: 'mm/dd/yy', showOn: "both", buttonImage: "../../Images/calendar.png", buttonImageOnly: true, changeMonth: true, changeYear: true, buttonAfter: false, hideIfNoPrevNext: false, navigationAsDateFormat: true, buttonText: 'To Date' });

    $("#hdnProcessId").val(1);
    try { $('#div_menu_item_bg a:first').click(); } catch (e) { }

    $("#iframeExcel").hide();
    $('#apply_nh').click(function () {
        $("#LoadingImage").show();
        ValidateApply();
        settablebackground();
        $("#tblDashboardData").hide().fadeIn(700);
    });
    $('#clear_nh').click(function () {
        Clear();
        settablebackground();
    });

    $('#btnExcel').click(function () {
        $("#LoadingImage").show();
        LoadExcel();
        settablebackground();
        $("#LoadingImage").delay(500).hide(0);
    });
});

function LoadPage(pageUrl) {
    $('#divdashboardBase').hide();
    $('#divLoadOther').show();
    $('#ifLoadOtherPage').attr('src', pageUrl);
    return;
}

function LoadPreJoining(obj) {
    $('#LoadingImage').show();
    $('#divLoadOther').hide();
    $('#divdashboardBase').show();
    $("#hdnProcessId").val(1);
    FetchCand(1);
    settablebackground();
    showhidecontrolsNonBGV();
    $("#divsearchfilter").hide().fadeIn(700);
    $("#tblDashboardData").hide().fadeIn(700);
    Clear();
}

function LoadPostJoining(obj) {
    $("#LoadingImage").show();
    $('#divLoadOther').hide();
    $('#divdashboardBase').show();
    $("#hdnProcessId").val(2);
    FetchCand(1);
    settablebackground();
    showhidecontrolsNonBGV();
    $("#divsearchfilter").hide().fadeIn(700);
    $("#tblDashboardData").hide().fadeIn(700);
    Clear();
}

function LoadBGV(obj) {
    $("#LoadingImage").show();
    $('#divLoadOther').hide();
    $('#divdashboardBase').show();
    $("#hdnProcessId").val(3);
    FetchCand(1);
    settablebackground();
    showhidecontrolsBGV();
    $("#divsearchfilter").hide().fadeIn(700);
    $("#tblDashboardData").hide().fadeIn(700);
    Clear();
}

function ValidateApply() {
    var status1 = false;
    if (status1 == DateCompare($('#DOJFromInputBox').val(), $('#DOJToInputBox').val())) {
        alert("Invalid Date Range! Start Date cannot be after End Date");
        $("#LoadingImage").delay(100).hide(0);
        return false;
    }
    FetchCand(1);
    settablebackground();
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
    $('#CandidateEmailIdInputBox').keypress(function (e) {
        if (e.which == 13) {
            ValidateApply();
            $(this).focus();
            return false;
        }
    });
    $('#RequisitionIdInputBox').keypress(function (e) {
        if (e.which == 13) {
            ValidateApply();
            $(this).focus();
            return false;
        }
    });

    $('#AssociateInputBox').keypress(function (e) {
        if (e.which == 13) {
            ValidateApply();
            $(this).focus();
            return false;
        }
    });
}

function PaginationDashboard(startIndex, pageNo) {
    $("#LoadingImage").show();
    FetchCand(pageNo);
    settablebackground();
    //$("#tblDashboardData").hide().fadeIn(700);
}

function HideCandidateType() {
    var CountryId = ($("#locationSelectBox option:selected").val()).split("-");
    if (CountryId[0] == "0") {
        if (flagdisablecandidatetype == "1") {
            $("#lblType").hide();
            $("#candidateTypeSelectBox").hide();
            $("#apply_nh").css('margin-top', '0px');
            $("#clear_nh").css('margin-top', '0px');
        }
        else {
            $("#lblType").show();
            $("#candidateTypeSelectBox").show();
            $("#apply_nh").css('margin-top', '18px');
            $("#clear_nh").css('margin-top', '18px');
        }

    }
    else if (CountryId[0] == "3") {
        $("#lblType").show();
        $("#candidateTypeSelectBox").show();
        $("#apply_nh").css('margin-top', '18px');
        $("#clear_nh").css('margin-top', '18px');
    }
    else if (CountryId[0] == "4") {
        $("#lblType").show();
        $("#candidateTypeSelectBox").show();
        $("#apply_nh").css('margin-top', '18px');
        $("#clear_nh").css('margin-top', '18px');
    }
    else {
        $("#lblType").hide();
        $("#candidateTypeSelectBox").hide();
        $("#apply_nh").css('margin-top', '0px');
        $("#clear_nh").css('margin-top', '0px');
    }
}

function Clear() {
    $("#CandidateInputBox").val('');
    $("#CandidateNameInputBox").val('');
    $("#CandidateEmailIdInputBox").val('');
    $("#DOJFromInputBox").val(stDate);
    $("#DOJToInputBox").val(endDate);
    if ($("#hdnProcessId").val() == 3) {
        $("#AssociateInputBox").val('');
        $("#TypeOfJoinerSelectBox").prop('selectedIndex', 0);
    }
    else {
        $("#locationSelectBox").prop('selectedIndex', 0);
        $("#candidateTypeSelectBox").prop('selectedIndex', 0);
        $("#candidateHireTypeSelectBox").prop('selectedIndex', 0);
        $("#RequisitionIdInputBox").val('');
        $("#CisStatusSelectBox").prop('selectedIndex', 0);
        $("#OfferStatusSelectBox").prop('selectedIndex', 0);
    }
    HideCandidateType();
   // ShowHideHireType();
    ValidateApply();
}

function FetchCand(pageNo) {
    var CountryId = ($("#locationSelectBox option:selected").val()).split("-");
    var HireType = 0;
    if (CountryId[0] == "0") {
        if (flagdisablecandidatetype == "1") {
            var candidateTypeval = 1
        }
        else {
            var candidateTypeval = $("#candidateTypeSelectBox").val();
        }
    }
    else if (CountryId[0] == "1" || CountryId[0] == "2") {
        var candidateTypeval = 1
        var HireType = $("#candidateHireTypeSelectBox").val();
    }
    else if (CountryId[0] == "3") {
        var candidateTypeval = $("#candidateTypeSelectBox").val();
        var HireType = 0;
    }
    else if (CountryId[0] == "4") {
        var candidateTypeval = $("#candidateTypeSelectBox").val();
        var HireType = 0;
    }
    else {
        var candidateTypeval = 1
        var HireType = 0;
    }
    $("#hdnPageNo").val(pageNo);
    try {
        var dataString = '{"processId" : "' + $("#hdnProcessId").val() + '" ,"pageNo":"' + pageNo + '","candidateID":"' + $("#CandidateInputBox").val() + '", "name":"' + $.trim($("#CandidateNameInputBox").val()) + '", "emailID":"' + $.trim($("#CandidateEmailIdInputBox").val()) + '", "requisition": "' + $.trim($("#RequisitionIdInputBox").val()) + '", "candidateType": "' + candidateTypeval + '", "fromDate":"' + $("#DOJFromInputBox").val() + '", "todate":"' + $("#DOJToInputBox").val() + '", "location":"' + $("#locationSelectBox").val() + '", "associateId":"' + $("#AssociateInputBox").val() + '", "typeOfJoining":"' + $("#TypeOfJoinerSelectBox").val() + '", "cisStatus":"' + $("#CisStatusSelectBox").val() + '", "offerStatus":"' + $("#OfferStatusSelectBox").val() + '","hireType":"' + HireType + '"}';
        $.ajax({
            type: "POST",
            url: "../../DashboardService.aspx/FetchCandidatesForDashboardRC",
            data: dataString,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: AjaxSucceeded,
            error: function (xhr) {
            },
            complete: function () {
                //$("#LoadingImage").delay(100).hide(0);
                $("#LoadingImage").hide();
            }

        });

          } catch (e) { }

    try {
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
    } catch (e) { }
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
    var location = ($("#locationSelectBox option:selected").val()).split("-")[0];
    var xmldata = ParsexmlDOM(data.d);
    if ($(xmldata).find('Table1').text() == "") {
        $("#tblDashboardData").append("<tr align='center'><td colspan='7' Style='text-align:center;'>Oops!!! No such result found!</td></tr>");
        $("#divDashboardCandidateSearch").show();
        $("#divPagination").hide();
        $("#btnExcel").attr('disabled', true).css('opacity', 0.5);
    }
    else {
        $("#btnExcel").attr('disabled', false).css('opacity', 1);
        $(xmldata).find('Table2').each(function () {
            var RowNumberHeader = $(this).find('Sno').text();
            var CandidateNameHeader = $(this).find('CandidateName').text();           
            var LoginIdHeader = $(this).find('LoginId').text();
            var DesignationDescHeader = $(this).find('Level').text();
            var RecruiterNameHeader = $(this).find('RecruiterNameId').text();
            var CandidateDOJHeader = $(this).find('DOJ').text();
            var PaperWorkStatusHeader = $(this).find('Paperworkstatus').text();
            var TypeOfJoinerHeader = $(this).find('Paperworkstatus').text();
            var CandidateStatusHeader = $(this).find('CandidateStatus').text();
            var HireTypeDesc = $(this).find('HireType').text();
            if ($("#hdnProcessId").val() == 3) {
                $("#tblDashboardData").append("<tr><th>" + RowNumberHeader + "</th><th>" + CandidateNameHeader + "</th><th>" + LoginIdHeader + "</th><th>" + DesignationDescHeader + "</th><th>" + RecruiterNameHeader + "</th><th>" + CandidateDOJHeader + "</th><th>" + TypeOfJoinerHeader + "</th><th>" + CandidateStatusHeader + "</th></tr>");
            }
            else if ((location == 1) || (location == 2)) {
                $("#tblDashboardData").append("<tr><th>" + RowNumberHeader + "</th><th>" + CandidateNameHeader + "</th><th>" + LoginIdHeader + "</th><th>" + DesignationDescHeader + "</th><th>" + RecruiterNameHeader + "</th><th>" + CandidateDOJHeader + "</th><th>" + PaperWorkStatusHeader + "</th><th>" + HireTypeDesc + "</th></tr>");
            }
            else {
                $("#tblDashboardData").append("<tr><th>" + RowNumberHeader + "</th><th>" + CandidateNameHeader + "</th><th>" + LoginIdHeader + "</th><th>" + DesignationDescHeader + "</th><th>" + RecruiterNameHeader + "</th><th>" + CandidateDOJHeader + "</th><th>" + PaperWorkStatusHeader + "</th></tr>");
            }
        });
        $(xmldata).find('Table1').each(function () {
            var RowNumber = $(this).find('RowNumber').text();           
            var CandidateName = $(this).find('CandidateName').text();
            var CandidateFName = $(this).find('FName').text();
            var LoginId = $(this).find('LoginId').text();
            var DesignationDesc = $(this).find('DesignationDesc').text();
            var RecruiterName = $(this).find('RecruiterNameID').text();
            var CandidateDOJ = $(this).find('DOJ').text();
            var PaperWorkStatus = $(this).find('PaperWorkStatusDesc').text();
            var CandidateId = $(this).find('CandidateId').text();
            var CandidateType = $(this).find('CandidateType').text();
            var ProcessId = $(this).find('ProcessId').text();
            var CountryId = $(this).find('CountryId').text();
            var SessionId = $(this).find('SessionId').text();
            var RoleId = $(this).find('RoleGroupId').text();
            var TypeOfJoiner = $(this).find('TypeOfJoiner').text();
            var CandidateStatus = $(this).find('CandidateStatus').text();
            var HireTypeDesc = $(this).find('HireTypeDes').text();
            if ($("#hdnProcessId").val() == 3) {
                $("#tblDashboardData").append("<tr><td>" + RowNumber + "</td><td><div id='CandidateName'><a href='#' class='atag' onclick=\"OpendrilldownPopup('" + CandidateFName + "'," + CandidateId + "," + CandidateType + "," + ProcessId + "," + CountryId + "," + SessionId + ");\">" + CandidateName + "</a></div></td><td>" + LoginId + "</td><td>" + DesignationDesc + "</td><td>" + RecruiterName + "</td><td>" + CandidateDOJ + "</td><td>" + TypeOfJoiner + "</td><td>" + CandidateStatus + "</td></tr>");
            }
            else if ((location == 1) || (location == 2)) {
                $("#tblDashboardData").append("<tr><td>" + RowNumber + "</td><td><div id='CandidateName'><a href='#' class='atag' onclick=\"OpendrilldownPopup('" + CandidateFName + "'," + CandidateId + "," + CandidateType + "," + ProcessId + "," + CountryId + "," + SessionId + ");\">" + CandidateName + "</a></div></td><td>" + LoginId + "</td><td>" + DesignationDesc + "</td><td>" + RecruiterName + "</td><td>" + CandidateDOJ + "</td><td>" + PaperWorkStatus + "</td><td>" + HireTypeDesc + "</td></tr>");
            }
            else {
                $("#tblDashboardData").append("<tr><td>" + RowNumber + "</td><td><div id='CandidateName'><a href='#' class='atag' onclick=\"OpendrilldownPopup('" + CandidateFName + "'," + CandidateId + "," + CandidateType + "," + ProcessId + "," + CountryId + "," + SessionId + ");\">" + CandidateName + "</a></div></td><td>" + LoginId + "</td><td>" + DesignationDesc + "</td><td>" + RecruiterName + "</td><td>" + CandidateDOJ + "</td><td>" + PaperWorkStatus + "</td></tr>");
            }
        });

        $(xmldata).find('Table').each(function () {
            var Recordcount = $(this).find('Column1').text();
            $("#hdnTotalRecord").val(Recordcount);
        });
        $("#divPagination").show();
    }
}

function AjaxFailed(data) {
   //alert(result.responseText);
}

function GetPagination(result) {
    $("#divPagination").html(result.d);
}

function OpendrilldownPopup(CandidateName, CandidateId, CandidateType, ProcessId, CountryId, SessionId) {
    $("#hdnCandidateName").val(CandidateName);
    $("#hdnCandidateId").val(CandidateId);
    $("#hdnCandidateType").val(CandidateType);
    $("#hdnProcessId").val(ProcessId);
    $("#hdnCountryId").val(CountryId);
    $("#hdnSessionId").val(SessionId);
    var Path = "../Candidate/DrillDown.htm?cand=" + $("#hdnCandidateId").val() + "&processid=" + $("#hdnProcessId").val() + "&candtype=" + $("#hdnCandidateType").val() + "&cntry=" + $("#hdnCountryId").val() + "&opmde=1&ssid=" + $("#hdnSessionId").val() + "&rgid=" + roleGroupId + "&roleid=" + roleId + "&candname=" + $("#hdnCandidateName").val() + "";
    try {
        var width = 982;
        var height = 591;
        var left = (screen.width - width) / 2;
        var top = (screen.height - height) / 2.5;
        var params = 'width=' + width + ', height=' + height;
        params += ', top=' + top + ', left=' + left;
        params += ', directories=no';
        params += ', location=no';
        params += ', menubar=no';
        params += ', resizable=no';
        params += ', scrollbars=no';
        params += ', status=no';
        params += ', toolbar=no';

        childWin = window.open(Path, "RCCandData", params);
        openPopup();
    } catch (err) { }
}

function LoadExcel() {
    var processId = $("#hdnProcessId").val();
    var pageNo = 1;
    var candidateID = $("#CandidateInputBox").val();
    var name = $.trim($("#CandidateNameInputBox").val());
    var emailID = $.trim($("#CandidateEmailIdInputBox").val());
    var requisition = $.trim($("#RequisitionIdInputBox").val());
    var CountryId = ($("#locationSelectBox option:selected").val()).split("-");
    if (CountryId[0] == "0") {
        if (flagdisablecandidatetype == "1") {
            var candidateTypeval = 1
        }
        else {
            var candidateTypeval = $("#candidateTypeSelectBox").val();
        }
    }
    else if (CountryId[0] == "3") {
        var candidateTypeval = $("#candidateTypeSelectBox").val();
    }
    else if (CountryId[0] == "4") {
        var candidateTypeval = $("#candidateTypeSelectBox").val();
    }
    else {
        var candidateTypeval = 1
    }
    var fromDate = $("#DOJFromInputBox").val();
    var toDate = $("#DOJToInputBox").val();
    var location = $("#locationSelectBox").val();

    var AssociateId = $("#AssociateInputBox").val();
    //    var VendorId = $("#VendorNameSelectBox").val();
    //    var CisStatus = $("#CisStatusSelectBox").val();
    //    var BgvFinalStatus = $("#BgvFinalStatusSelectBox").val();
    var TypeOfJoining = $("#TypeOfJoinerSelectBox").val();
    $("#iframeExcel").attr('src', '../../DashboardService.aspx?processId=' + processId + ' &pageNo=' + pageNo + ' &candidateID=' + candidateID + ' &name=' + name + ' &emailID=' + emailID + ' &requisition=' + requisition + ' &candidateType=' + candidateTypeval + ' &fromDate=' + fromDate + ' &toDate=' + toDate + ' &location=' + location + '&associateId=' + AssociateId + '&typeofjoining=' + TypeOfJoining + '&roleid=1');
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
    $('.selected_menu_item').click();
    //    if ($("#tabdashboard1").attr("class") == "selected_menu") {
    //        $("#hdnProcessId").val(1);
    //    }
    //    else if ($("#tabdashboard2").attr("class") == "selected_menu") {
    //        $("#hdnProcessId").val(2);
    //    }
    //    else if ($("#tabdashboard3").attr("class") == "selected_menu") {
    //        $("#hdnProcessId").val(3);
    //    }
    //    //ValidateApply(); 
    //    var pgeno = $("#hdnPageNo").val();
    //    FetchCand(pgeno);
    //    settablebackground();
}

function openPopup() {
    var $backgroundOverLay = $('<div id="overLay"/>');
    $("body").prepend($backgroundOverLay);
    $("#overLay").css({
        "opacity": "0.7"
    });
    $("#overLay").show();
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

function showhidecontrolsBGV() {
    $("#lilblcandidateid").show();
    $("#litxtcandidateid").show();
    $("#lilblAssociateId").show();
    $("#litxtAssociateId").show();
    $("#lilblName").show();
    $("#litxtName").show();
    $("#lilblEmail").show();
    $("#litxtEmail").show();
    //    $("#lilblvendorname").show();
    //    $("#litxtvendorname").show();
    $("#lilblcisstatus").show();
    $("#litxtcisstatus").show();
    //    $("#lilblbgvfinalstatus").show();
    //    $("#litxtbgvfinalstatus").show();
    $("#lilbltypeofjoiner").show();
    $("#litxttypeofjoiner").show();
    $("#lilblFromDate").show();
    $("#litxtFromDate").show();
    $("#lilblToDate").show();
    $("#litxtToDate").show();
    $("#lilblLocation").hide();
    $("#litxtLocation").hide();
    $("#lilblRequisition").hide();
    $("#litxtRequisition").hide();
    $("#lilblType").hide();
    $("#licmbType").hide();

    $("#lilblName").removeClass('width85').addClass('width60');
    $("#lilblFromDate").removeClass('width60').addClass('width85');
    $("#lilblToDate").removeClass('width60').addClass('width85');
    $("#lilblOfferstatus").show();
    $("#litxtOfferstatus").show();
}

function showhidecontrolsNonBGV() {
    $("#lilblcandidateid").show();
    $("#litxtcandidateid").show();
    $("#lilblName").show();
    $("#litxtName").show();
    $("#lilblEmail").show();
    $("#litxtEmail").show();
    $("#lilblLocation").show();
    $("#litxtLocation").show();
    $("#lilblRequisition").show();
    $("#litxtRequisition").show();
    $("#lilblFromDate").show();
    $("#litxtFromDate").show();
    $("#lilblToDate").show();
    $("#litxtToDate").show();
    $("#lilblType").show();
    $("#licmbType").show();
    $("#lilblAssociateId").hide();
    $("#litxtAssociateId").hide();
    //    $("#lilblvendorname").hide();
    //    $("#litxtvendorname").hide();
    $("#lilblcisstatus").hide();
    $("#litxtcisstatus").hide();
    //    $("#lilblbgvfinalstatus").hide();
    //    $("#litxtbgvfinalstatus").hide();
    $("#lilbltypeofjoiner").hide();
    $("#litxttypeofjoiner").hide();

    $("#lilblName").removeClass('width60').addClass('width85');
    $("#lilblFromDate").removeClass('width85').addClass('width85');
    $("#lilblToDate").removeClass('width85').addClass('width60');
    $("#litxtOfferstatus").hide();
    $("#lilblOfferstatus").hide();
}

function ValidateOnlyInteger(e) { if (window.event) { keycode = window.event.keyCode; } else if (e) { keycode = e.which; } else { return true; } if (((keycode >= 48) && (keycode <= 57)) || (keycode == 8)) { return true; } else { return false; } }

function DateCompare(fromDate, toDate) {
    if (Date.parse(fromDate) > Date.parse(toDate)) {
        //alert("Invalid Date Range!\nStart Date cannot be after End Date!")
        return false;
    }
    else
        return true;
}

function ShowHideHireType() {
    var CountryId = ($("#locationSelectBox option:selected").val()).split("-");
    if (CountryId[0] == "1" || CountryId[0] == "2") {
        //if (($("#candidateHireTypeSelectBox option[value=2]").length != 0) && ($("#candidateHireTypeSelectBox option[value=3]").length != 0)) {}
        GetContractorHireType(196, 1);
        $('#lilblType').removeClass('width60').addClass('width0');
        $('#candidateHireTypeSelectBox').get(0).selectedIndex = 0;
            $("#lblHireType").show();
            $("#candidateHireTypeSelectBox").show();
            
           // $("#apply_nh").css('margin-top', '18px');
            //$("#clear_nh").css('margin-top', '18px');
        
    }
    else {
        GetContractorHireType(196, 2);
        $("#lblHireType").hide();
        $("#candidateHireTypeSelectBox").hide();
        $('#lilblType').removeClass('width0').addClass('width60');
        $('#candidateHireTypeSelectBox').get(0).selectedIndex = 0;
        //$("#apply_nh").css('margin-top', '0px');
        //$("#clear_nh").css('margin-top', '0px');
    }
}

function GetContractorHireType(hireTypeParentId, operationFlag){ //operationFlag 1-> Insert 2-> Delete
    //var hireTypeParentId = 139;
    var parentId = '{"parentId":' + hireTypeParentId + '}';
    $.ajax({

        type: "POST",
        url: "../../DashboardService.aspx/BindCandidateHireType",
        data: parentId,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (msg) {
            if (operationFlag == 1) {
                $.each(msg.d, function (index, item) {
                    if ($("#candidateHireTypeSelectBox option[value='" + item.CandidateTypeCode + "']").length == 0) {
                        //alert("#candidateHireTypeSelectBox option[value='" + item.CandidateTypeCode + "']");
                        $("#candidateHireTypeSelectBox").get(0).options[$("#candidateHireTypeSelectBox").get(0).options.length] = new Option(item.CandidateTypeDesc, item.CandidateTypeCode);
                    }
                });
            }
            else if (operationFlag == 2) {
                $.each(msg.d, function (index, item) {
                    $("#candidateHireTypeSelectBox option[value=" + item.CandidateTypeCode + "]").remove();
                });


            }
            $("#candidateHireTypeSelectBox").selectedIndex = 1;
        },
        error: function () {
            alert("Failed to load");
        }
    });
}
var stDate, endDate, UKendDate;
var OBQueryString = (function (a) { if (a == "") return {}; var b = {}; for (var i = 0; i < a.length; ++i) { var p = a[i].split('='); if (p.length != 2) continue; b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " ")); } return b; })(window.location.search.substr(1).split('&'));
var sessionId = parseInt(OBQueryString["ssid"]);
var countryId = parseInt(OBQueryString["cntry"]);
var roleGroupId = parseInt(OBQueryString["rgid"]);
var roleId = parseInt(OBQueryString["roleid"]);
var pId = $("#hdnPId").val();

function GetDashboardFilters() {
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
            error: AjaxFailed
        });
    }
    catch (e) { } 

    try {
        $("#candidateHireTypeSelectBox").selectedIndex = 1;
        $("#candidateTypeSelectBox").selectedIndex = 1;
        if ($('#candidateTypeSelectBox').selectIndex = 1) { $('#candidateHireTypeSelectBox').show(); }
        else { $('#candidateHireTypeSelectBox').hide(); }
        $("#VendorNameSelectBox").selectedIndex = 1;
        $("#CisStatusSelectBox").selectedIndex = 1;
        $("#OfferStatusSelectBox").selectedIndex = 1;
        $("#BgvFinalStatusSelectBox").selectedIndex = 1;
        $("#candidateDocUploadStatus").selectedIndex = 1;
        $("#MngrDocUploadStatus").selectedIndex = 1;
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

    $("#divsearchfilter").hide();
    $("#LoadingImage").show();
    showhidecontrolsNonBGV();

    var flagcountry = 0;
    $.ajax({
        type: "POST",
        url: "../../DashboardService.aspx/BindCountryForHRSS",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (msg) {
            $.each(msg.d, function (index, item) {
                $("#countrySelectBox").get(0).options[$("#countrySelectBox").get(0).options.length] = new Option(item.CountryName, item.CountryID);
                if ($("#countrySelectBox").val() == 1 || $("#countrySelectBox").val() == 2) {
                    $("#candidateHireTypeSelectBox").selectedIndex = 1;
                }

            });
            $("#countrySelectBox").selectedIndex = 1;
        },
        error: function () {
            //alert("Failed to load");
        }
    });



    $("#candidateTypeSelectBox").change(function () {
        HideCandidateType();
        HideSwizExcel();
        //settablebackground();
    });

    Onentertext();
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
            UKendDate = result.d[2].Value;

            //            if ($("#countrySelectBox").val() == 4) {
            //                endDate = result.d[2].Value;
            //            }
            //            else {
            //                endDate = result.d[1].Value;
            //            }

            //            if (countryId == 4 && endDate != undefined && endDate.split('/') != undefined && endDate.split('/').length == 3) {
            //                endDate = '12/31/' + endDate.split('/')[2];
            //            }
        },
        error: function () {
        }
    });

    $("#DOJFromInputBox").val(stDate);

    if ($("#countrySelectBox").val() == 4) {
        $("#DOJToInputBox").val(UKendDate);
    }
    else {
        $("#DOJToInputBox").val(endDate);
    }

    $("#countrySelectBox").change(function () {
        if ($("#hdnProcessId").val() != 4) {
            HideCandidateType();
        }
        HideSwizExcel();
        settablebackground();
        if ($("#countrySelectBox").val() == 4) {
            $("#DOJToInputBox").val(UKendDate);
        }
        else {
            $("#DOJToInputBox").val(endDate);
        }
        ShowHideHireType();
    });


    $("#DOJFromInputBox").datepicker({ dateFormat: 'mm/dd/yy', showOn: "both", buttonImage: "../../Images/calendar.png", buttonImageOnly: true, changeMonth: true, changeYear: true, buttonAfter: false, hideIfNoPrevNext: false, navigationAsDateFormat: true, buttonText: 'From Date' });
    $("#DOJToInputBox").datepicker({ dateFormat: 'mm/dd/yy', showOn: "both", buttonImage: "../../Images/calendar.png", buttonImageOnly: true, changeMonth: true, changeYear: true, buttonAfter: false, hideIfNoPrevNext: false, navigationAsDateFormat: true, buttonText: 'To Date' });
    //  $("#ExtenedeDateInputBox").datepicker({ dateFormat: 'mm/dd/yy', showOn: "both", buttonImage: "../../Images/calendar.png", buttonImageOnly: true, changeMonth: true, changeYear: true, buttonAfter: false, hideIfNoPrevNext: false, navigationAsDateFormat: true, buttonText: 'ExtendedDate' });
    if ($("#countrySelectBox").val() == 3 || $("#countrySelectBox").val() == 4) {
        var candidateTypeval = $("#candidateTypeSelectBox").val();
        if ($("#countrySelectBox").val() == 4 && $("#candidateTypeSelectBox").val() == 1)// Hire type for Uk
        { var candidateHireTypeval = $("#candidateHireTypeSelectBox").val(); }
        else {
            var candidateHireTypeval = 0
        }
    }
    else {
        var candidateTypeval = 1
        var candidateHireTypeval = 0
    }
    $("#hdnProcessId").val(1);
    $("#hdnPageNo").val(1);
    $("#hdnCandidateType").val(candidateTypeval);

    $('#div_menu_item_bg a:first').click();

    $("#iframeExcel").hide();
    $('#apply_nh').click(function () {
        $("#LoadingImage").show();
        ValidateApply();
        settablebackground();
        $("#tblDashboardData").hide().fadeIn(700);
        if (($("#countrySelectBox").val() == 3) && ($("#hdnBulkUpoladbuttonStatus").val() == "YES")) {
            $('#btnUploadeExcel').show();
        }
        else {
            $('#btnUploadeExcel').hide();
        }
    });

    $('#clear_nh').click(function () {
        Clear();
        settablebackground();
        if (($("#countrySelectBox").val() == 3) && ($("#hdnBulkUpoladbuttonStatus").val() == "YES")) {
            $('#btnUploadeExcel').show();
        }
        else {
            $('#btnUploadeExcel').hide();
        }
    });

    $('#btnExcel').click(function () {
        $("#LoadingImage").show();
        LoadExcel();
        settablebackground();
        $("#LoadingImage").delay(500).hide(0);
    });

    $('#btnSwizExcel').click(function () {
        $("#LoadingImage").show();
        LoadSwizExcel();
        settablebackground();
        $("#LoadingImage").delay(500).hide(0);
    });

    $("#divParent").css('margin-right', '-9px');
    ShowHideHireType();
});

function LoadPage(pageUrl) {
    $('#divdashboardBase').hide();
    $('#divLoadOther').show();
    $('#ifLoadOtherPage').attr('src', pageUrl);
    return;
}

function LoadPreJoining(obj) {
    $("#divdashboardBase").show();
    $("#divLoadOther").hide();
    $("#LoadingImage").show();
    $("#divParent").css('margin-right', '-9px');
    $("#hdnProcessId").val(1);
    FetchCand(1);
    showhidecontrolsNonBGV();
    $("#divsearchfilter").hide().fadeIn(700);
    $("#tblDashboardData").hide().fadeIn(700);
    Clear();
}

function LoadPostJoining(obj) {
    $("#divdashboardBase").show();
    $("#divLoadOther").hide();
    $("#LoadingImage").show();
    $("#divParent").css('margin-right', '-9px');
    $("#hdnProcessId").val(2);
    FetchCand(1);
    showhidecontrolsNonBGV();
    $("#divsearchfilter").hide().fadeIn(700);
    $("#tblDashboardData").hide().fadeIn(700);
    Clear();
}

function LoadBGV(obj) {
    $("#divdashboardBase").show();
    $("#divLoadOther").hide();
    $("#LoadingImage").show();
    $("#hdnProcessId").val(3);
    FetchCand(1);
    showhidecontrolsBGV();
    $("#divsearchfilter").hide().fadeIn(700);
    $("#tblDashboardData").hide().fadeIn(700);
    Clear();
}

function LoadHTransfer(obj) {
    $("#divdashboardBase").show();
    $("#divLoadOther").hide();
    $("#LoadingImage").show();
    $("#hdnProcessId").val(4);
    FetchCand(1);
    ShowhidecontrolsHTransfer();
    $("#divsearchfilter").hide().fadeIn(700);
    $("#tblDashboardData").hide().fadeIn(700);
    Clear();
}

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
    $('#RecruiterIdInputBox').keypress(function (e) {
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

function HideCandidateType() {
    if (($("#countrySelectBox").val() == 3) && ($("#hdnBulkUpoladbuttonStatus").val() == "YES")) {
        $('#btnUploadeExcel').show();
    }
    else {
        $('#btnUploadeExcel').hide();
    }
    if ($("#countrySelectBox option:selected").val() == "3" || $("#countrySelectBox option:selected").val() == "4") {
        $("#lblType").show();
        $("#candidateTypeSelectBox").show();
        //$('#lilblHireType').hide();
        $("#lblHireType").hide();
        //$('#licmbHireType').hide();
        $("#candidateHireTypeSelectBox").hide();
        if ($("#countrySelectBox option:selected").val() == "4" && $("#candidateTypeSelectBox option:selected").val() == "1") //for showing hire type for uk
        {
            //$('#lilblHireType').show();
            $("#lblHireType").show();
            //$('#licmbHireType').show();
            $("#candidateHireTypeSelectBox").show();
        }
        else {
            //$('#lilblHireType').hide();
            $("#lblHireType").hide();
            //$('#licmbHireType').hide();
            $("#candidateHireTypeSelectBox").hide();
        }
        $("#apply_nh").css('margin-top', '18px');
        $("#clear_nh").css('margin-top', '18px');
    }
    else {
        $("#lblType").hide();
        $("#candidateTypeSelectBox").hide();
        //$('#lilblHireType').hide();
        $("#lblHireType").hide();
        //$('#licmbHireType').hide();
        $("#candidateHireTypeSelectBox").hide();
        $("#apply_nh").css('margin-top', '0px');
        $("#clear_nh").css('margin-top', '0px');
    }
    $('#candidateHireTypeSelectBox').get(0).selectedIndex = 0;
}

function HideSwizExcel() {
    if ($("#countrySelectBox option:selected").val() == "45") {
        $("#btnSwizExcel").show();
    }
    else {
        $("#btnSwizExcel").hide();
    }
}

function Clear() {
    $("#CandidateInputBox").val('');
    $("#CandidateNameInputBox").val('');
    $("#CandidateEmailIdInputBox").val('');
    $("#DOJFromInputBox").val(stDate);

    if ($("#countrySelectBox").val() == 4) {
        $("#DOJToInputBox").val(UKendDate);
    }
    else {
        $("#DOJToInputBox").val(endDate);
    }
    //    $("#DOJToInputBox").val(endDate);

    if ($("#hdnProcessId").val() == 3) {
        $("#AssociateInputBox").val('');
        $("#VendorNameSelectBox").prop('selectedIndex', 0);
        $("#CisStatusSelectBox").prop('selectedIndex', 0);
        $("#OfferStatusSelectBox").prop('selectedIndex', 0);
        $("#BgvFinalStatusSelectBox").prop('selectedIndex', 0);
    }
    else {
        if ($("#hdnProcessId").val() == 4) {
            $("#candidateDocUploadStatus").prop('selectedIndex', 0);
            $("#MngrDocUploadStatus").prop('selectedIndex', 0);
        }
        $("#countrySelectBox").prop('selectedIndex', 0);
        $("#candidateTypeSelectBox").prop('selectedIndex', 0);
        $("#RequisitionIdInputBox").val('');
        $("#RecruiterIdInputBox").val('');

    }
    if ($("#hdnProcessId").val() != 4) {
        HideCandidateType();
    }
    HideSwizExcel();
    ValidateApply();
    //ShowHideHireType(); 
}

function FetchCand(pageNo) {
    if ($("#countrySelectBox").val() == 3 || $("#countrySelectBox").val() == 4) {
        var candidateTypeval = $("#candidateTypeSelectBox").val();
        if ($("#countrySelectBox").val() == 4 && $("#candidateTypeSelectBox").val() == 1) {
            var candidateHireTypeval = $("#candidateHireTypeSelectBox").val();
        }
        else {
            var candidateHireTypeval = 0
        }
    }
    else if ($("#countrySelectBox").val() == 1 || $("#countrySelectBox").val() == 2) {
        var candidateTypeval = 1;
        var candidateHireTypeval = $("#candidateHireTypeSelectBox").val();


    }
    else {
        var candidateTypeval = 1
        var candidateHireTypeval = 0
    }
    $("#hdnPageNo").val(pageNo);
    var dataString = '{"processId" : "' + $("#hdnProcessId").val() + '" ,"pageNo":"' + pageNo + '","candidateID":"' + $("#CandidateInputBox").val() + '", "name":"' + $.trim($("#CandidateNameInputBox").val()) + '", "recruiterID":"' + $("#RecruiterIdInputBox").val() + '", "emailID":"' + $.trim($("#CandidateEmailIdInputBox").val()) + '", "requisition": "' + $.trim($("#RequisitionIdInputBox").val()) + '", "candidateType": "' + candidateTypeval + '", "fromDate":"' + $("#DOJFromInputBox").val() + '", "todate":"' + $("#DOJToInputBox").val() + '", "country":"' + $("#countrySelectBox").val() + '", "associateId":"' + $("#AssociateInputBox").val() + '", "vendorId":"' + $("#VendorNameSelectBox").val() + '", "cisStatus":"' + $("#CisStatusSelectBox").val() + '", "bgvFinalStatus":"' + $("#BgvFinalStatusSelectBox").val() + '", "hireType":"' + candidateHireTypeval + '", "offerStatus":"' + $("#OfferStatusSelectBox").val() + '", "candidateDocUploadStatus":"' + $("#candidateDocUploadStatus").val() + '","mngrDocUploadStatus":"' + $("#MngrDocUploadStatus").val() + '"}';
    $.ajax({
        type: "POST",
        url: "../../DashboardService.aspx/FetchCandidatesForDashboard",
        data: dataString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: AjaxSucceeded,
        error: AjaxFailed,
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
        $("#btnExcel").attr('disabled', true).css('opacity', 0.5);
        $("#btnSwizExcel").attr('disabled', true).css('opacity', 0.5);
    }
    else {
        $("#btnExcel").attr('disabled', false).css('opacity', 1);
        $("#btnSwizExcel").attr('disabled', false).css('opacity', 1);
        $(xmldata).find('Table2').each(function () {
            var RowNumberHeader = $(this).find('Sno').text();
            var CandidateNameHeader = $(this).find('CandidateName').text();
            var LoginIdHeader = $(this).find('LoginId').text();
            var AssociateIdHeader = $(this).find('AssociateId').text();
            var DesignationDescHeader = $(this).find('Level').text();
            var RecruiterNameHeader = $(this).find('RecruiterNameId').text();
            var CandidateDOJHeader = $(this).find('DOJ').text();
            var PaperWorkStatusHeader = $(this).find('Paperworkstatus').text();
            var HireTypeDesc = $(this).find('HireType').text();
            var CasePriorityHeader = $(this).find('Paperworkstatus').text();
            var CandidateStatusHeader = $(this).find('CandidateStatus').text();
            var CandidateIDHeader = $(this).find('CandidateId').text();
            var OfferExtendedDateHeader = $(this).find('OfferExtendedDate').text();
            var DocumentUploadStatusHeader = $(this).find('DocumentUploadStatus').text();
            var ManagerDocumentUploadHeader = $(this).find('ManagerDocumentUpload').text();
            var AdditinalDocUploadHeader = $(this).find('AdditionalDocumentUploadStatus').text();
            var CandidateStartdateConfirmationStatusHeader = $(this).find('CandidateStartdateConfirmationStatus').text();
            var HiringManagerConfirmationStatusHeader = $(this).find('HiringManagerConfirmationStatus').text();
            if ($("#hdnProcessId").val() == 3) {
                $("#tblDashboardData").append("<tr><th>" + RowNumberHeader + "</th><th>" + CandidateNameHeader + "</th><th>" + CandidateIDHeader + "</th><th>" + AssociateIdHeader + "</th><th>" + DesignationDescHeader + "</th><th>" + RecruiterNameHeader + "</th><th>" + CandidateDOJHeader + "</th><th>" + CasePriorityHeader + "</th><th>" + CandidateStatusHeader +
                "</th><tr>");
            }
            else if ($("#hdnProcessId").val() == 4) {

                $("#tblDashboardData").append("<tr><th>" + RowNumberHeader + "</th><th>" + CandidateNameHeader + "</th><th>" + CandidateIDHeader + "</th><th>" + CandidateDOJHeader + "</th><th>" + DocumentUploadStatusHeader + "</th><th>" + OfferExtendedDateHeader + "</th><th>" + AdditinalDocUploadHeader + "</th><th>" + ManagerDocumentUploadHeader + "</th></th><tr>");
            }
            else if ($("#countrySelectBox").val() == 4 && $("#candidateTypeSelectBox").val() == 1) {
                $("#tblDashboardData").append("<tr><th>" + RowNumberHeader + "</th><th>" + CandidateNameHeader + "</th><th>" + LoginIdHeader + "</th><th>" + DesignationDescHeader + "</th><th>" + RecruiterNameHeader + "</th><th>" + CandidateDOJHeader + "</th><th>" + PaperWorkStatusHeader + "</th><th>" + HireTypeDesc + "</th></tr>");
            }
            else if (($("#countrySelectBox").val() == 1) || ($("#countrySelectBox").val() == 2)) {
                $("#tblDashboardData").append("<tr><th>" + RowNumberHeader + "</th><th>" + CandidateNameHeader + "</th><th>" + LoginIdHeader + "</th><th>" + DesignationDescHeader + "</th><th>" + RecruiterNameHeader + "</th><th>" + CandidateDOJHeader + "</th><th>" + PaperWorkStatusHeader + "</th><th>" + HireTypeDesc + "</th><th>" + CandidateStartdateConfirmationStatusHeader + "</th><th>" + HiringManagerConfirmationStatusHeader + "</th></tr>");
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
            var AssociateId = $(this).find('AssociateId').text();
            var DesignationDesc = $(this).find('DesignationDesc').text();
            var RecruiterName = $(this).find('RecruiterNameID').text();
            var CandidateDOJ = $(this).find('DOJ').text();
            var PaperWorkStatus = $(this).find('PaperWorkStatusDesc').text();
            var HireTypeDesc = $(this).find('HireTypeDes').text();
            var CandidateId = $(this).find('CandidateId').text();
            var CandidateType = $(this).find('CandidateType').text();
            var ProcessId = $(this).find('ProcessId').text();
            var CountryId = $(this).find('CountryId').text();
            var SessionId = $(this).find('SessionId').text();
            var RoleId = $(this).find('RoleGroupId').text();
            var CasePriority = $(this).find('CasePriority').text();
            var CandidateStatus = $(this).find('CandidateStatus').text();
            var CadidateID = $(this).find('CandidateId').text();
            var DocumentUploadStatus = $(this).find('DocumentUploadStatus').text();
            var OfferExtendedDate = $(this).find('OfferExtendedDate').text();
            var MangerDocumentStatus = $(this).find('MangerDocumentStatus').text();
            var AdditionalDocumentStatus = $(this).find('AdditionalDocumentStatus').text();
            var MangerUploadStatusFlag = $(this).find('MangerUploadStatusFlag').text();
            var CandidateStartdateConfirmationStatus = $(this).find('CandidateStartdateConfirmationStatus').text();
            var HiringManagerConfirmationStatus = $(this).find('HiringManagerConfirmationStatus').text();
            if ($("#hdnProcessId").val() == 3) {
                $("#tblDashboardData").append("<tr><td>" + RowNumber + "</td><td><div id='CandidateName'><a href='#' class='atag' onclick=\"OpendrilldownPopup('" + CandidateFName + "'," + CandidateId + "," + CandidateType + "," + ProcessId + "," + CountryId + "," + SessionId + ");\">" + CandidateName + "</a></div></td><td>" + CadidateID + "</td><td>" + AssociateId + "</td><td>" + DesignationDesc + "</td><td>" + RecruiterName + "</td><td>" + CandidateDOJ + "</td><td>" + CasePriority + "</td><td>" + CandidateStatus + "</td></tr>");
            }
            else if ($("#hdnProcessId").val() == 4) {
//                var mngruploadtooltip;
//                if (MangerUploadStatusFlag == 1) {
//                    mngruploadtooltip = "<p class='managerdoc'>Click here to modify the manager letter/additional documentation</p>";
//                }
//                else {
//                    mngruploadtooltip = "<p class='managerdoc'>Click here to upload the manager letter/additional documentation</p>";
//                }
                $("#tblDashboardData").append("<tr><td>" + RowNumber + "</td><td><div id='CandidateName'><a href='#' class='atag' onclick=\"OpendrilldownPopup('" + CandidateFName + "'," + CandidateId + "," + CandidateType + "," + ProcessId + "," + CountryId + "," + SessionId + ");\">" + CandidateName + "</a></div></td><td>" + CadidateID + "</td><td>" + CandidateDOJ + "</td><td>" + DocumentUploadStatus + "</td><td>" + OfferExtendedDate + "</td><td>" + AdditionalDocumentStatus + "</td><td><div class='HTranDocUpload'>" + MangerUploadStatusFlag + " <a href='#' class='atag' onclick=\"HTransferDocUpload('" + CandidateId + "'," + CountryId + "," + SessionId + ");\">" + MangerDocumentStatus + "</a></div></td></tr>");

            }
            else if ($("#countrySelectBox").val() == 4 && $("#candidateTypeSelectBox").val() == 1) {
                $("#tblDashboardData").append("<tr><td>" + RowNumber + "</td><td><div id='CandidateName'><a href='#' class='atag' onclick=\"OpendrilldownPopup('" + CandidateFName + "'," + CandidateId + "," + CandidateType + "," + ProcessId + "," + CountryId + "," + SessionId + ");\">" + CandidateName + "</a></div></td><td>" + LoginId + "</td><td>" + DesignationDesc + "</td><td>" + RecruiterName + "</td><td>" + CandidateDOJ + "</td><td>" + PaperWorkStatus + "</td><td>" + HireTypeDesc + "</td></tr>");
            }
            else if (($("#countrySelectBox").val() == 1) || ($("#countrySelectBox").val() == 2)) {
                $("#tblDashboardData").append("<tr><td>" + RowNumber + "</td><td><div id='CandidateName'><a href='#' class='atag' onclick=\"OpendrilldownPopup('" + CandidateFName + "'," + CandidateId + "," + CandidateType + "," + ProcessId + "," + CountryId + "," + SessionId + ");\">" + CandidateName + "</a></div></td><td>" + LoginId + "</td><td>" + DesignationDesc + "</td><td>" + RecruiterName + "</td><td>" + CandidateDOJ + "</td><td>" + PaperWorkStatus + "</td><td>" + HireTypeDesc + "</td><td>" + CandidateStartdateConfirmationStatus + "</td><td>" + HiringManagerConfirmationStatus + "</td></tr>");
            }
            else {
                $("#tblDashboardData").append("<tr><td>" + RowNumber + "</td><td><div id='CandidateName'><a href='#' class='atag' onclick=\"OpendrilldownPopup('" + CandidateFName + "'," + CandidateId + "," + CandidateType + "," + ProcessId + "," + CountryId + "," + SessionId + ");\">" + CandidateName + "</a></div></td><td>" + LoginId + "</td><td>" + DesignationDesc + "</td><td>" + RecruiterName + "</td><td>" + CandidateDOJ + "</td><td>" + PaperWorkStatus + "</td></tr>");
            }
        });

        $(xmldata).find('Table').each(function () {
            var Recordcount = $(this).find('Column1').text();
            $("#hdnTotalRecord").val(Recordcount);
        });
        $(xmldata).find('Table3').each(function () {
            var BulkUpoladbuttonStatus = $(this).find('BulkUpoladbuttonStatus').text();
            $("#hdnBulkUpoladbuttonStatus").val(BulkUpoladbuttonStatus);
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

function HTransferDocUpload(CandidateId, CountryId, SessionId) {
    
    var DocUploadpath = "../HTransfer/HTransferDocs.htm?ssid=" + SessionId + "&cand=" + CandidateId + "&cntry=" + CountryId + "&opmde=0&rgid=1&roleid=10";
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

        childWin = window.open(DocUploadpath, "HTransferCand", params);
        openPopup();
    } catch (err) { }
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

        childWin = window.open(Path, "SSCandData", params);
        openPopup();
    } catch (err) { }
}

function LoadExcel() {
    var processId = $("#hdnProcessId").val();
    var pageNo = 1;
    var candidateID = $("#CandidateInputBox").val();
    var name = $.trim($("#CandidateNameInputBox").val());
    var recruiterID = $("#RecruiterIdInputBox").val();
    var emailID = $.trim($("#CandidateEmailIdInputBox").val());
    var requisition = $.trim($("#RequisitionIdInputBox").val());
    if ($("#countrySelectBox").val() == 3 || $("#countrySelectBox").val() == 4) {
        var candidateTypeval = $("#candidateTypeSelectBox").val();
    }
    else {
        var candidateTypeval = 1;
    }
    var fromDate = $("#DOJFromInputBox").val();
    var toDate = $("#DOJToInputBox").val();
    var country = $("#countrySelectBox").val();

    var AssociateId = $("#AssociateInputBox").val();
    var VendorId = $("#VendorNameSelectBox").val();
    var CisStatus = $("#CisStatusSelectBox").val();
    var OfferStatus = $("#OfferStatusSelectBox").val();
    var BgvFinalStatus = $("#BgvFinalStatusSelectBox").val();
    var HireTypeDes = $("#candidateHireTypeSelectBox").val();
    var candidateDocUploadStatus = $("#candidateDocUploadStatus").val();
    var MngrDocUploadStatus = $("#MngrDocUploadStatus").val();
    var SwizExcel = 0;

    $("#iframeExcel").attr('src', '../../DashboardService.aspx?processId=' + processId + ' &pageNo=' + pageNo + ' &candidateID=' + candidateID + ' &name=' + name + ' &recruiterID=' + recruiterID + ' &emailID=' + emailID + ' &requisition=' + requisition + ' &candidateType=' + candidateTypeval + ' &fromDate=' + fromDate + ' &toDate=' + toDate + ' &country=' + country + '&associateId=' + AssociateId + '&vendorId=' + VendorId + '&cisstatus=' + CisStatus + '&bgvfinalstatus=' + BgvFinalStatus + '&roleid=2' + '&hiretype=' + HireTypeDes + '&SwizExcel=' + SwizExcel + '&offerStatus=' + OfferStatus + '&documentUploadStatus=' + candidateDocUploadStatus + '&mngrDocUploadStatus=' + MngrDocUploadStatus);
}

function LoadSwizExcel() {
    var processId = $("#hdnProcessId").val();
    var pageNo = 1;
    var candidateID = $("#CandidateInputBox").val();
    var name = $.trim($("#CandidateNameInputBox").val());
    var recruiterID = $("#RecruiterIdInputBox").val();
    var emailID = $.trim($("#CandidateEmailIdInputBox").val());
    var requisition = $.trim($("#RequisitionIdInputBox").val());
    if ($("#countrySelectBox").val() == 3 || $("#countrySelectBox").val() == 4) {
        var candidateTypeval = $("#candidateTypeSelectBox").val();
    }
    else {
        var candidateTypeval = 1;
    }
    var fromDate = $("#DOJFromInputBox").val();
    var toDate = $("#DOJToInputBox").val();
    var country = $("#countrySelectBox").val();

    var AssociateId = $("#AssociateInputBox").val();
    var VendorId = $("#VendorNameSelectBox").val();
    var CisStatus = $("#CisStatusSelectBox").val();
    var OfferStatus = $("#OfferStatusSelectBox").val();
    var BgvFinalStatus = $("#BgvFinalStatusSelectBox").val();
    var HireTypeDes = $("#candidateHireTypeSelectBox").val();
    var candidateDocUploadStatus = $("#candidateDocUploadStatus").val();
    var MngrDocUploadStatus=$("#MngrDocUploadStatus").val();
    var SwizExcel = 0;
    if (country == 45) {
        SwizExcel = 1;
    }
    $("#iframeExcel").attr('src', '../../DashboardService.aspx?processId=' + processId + ' &pageNo=' + pageNo + ' &candidateID=' + candidateID + ' &name=' + name + ' &recruiterID=' + recruiterID + ' &emailID=' + emailID + ' &requisition=' + requisition + ' &candidateType=' + candidateTypeval + ' &fromDate=' + fromDate + ' &toDate=' + toDate + ' &country=' + country + '&associateId=' + AssociateId + '&vendorId=' + VendorId + '&cisstatus=' + CisStatus + '&bgvfinalstatus=' + BgvFinalStatus + '&roleid=2' + '&hiretype=' + HireTypeDes + '&SwizExcel=' + SwizExcel + '&offerStatus=' + OfferStatus + '&documentUploadStatus=' + candidateDocUploadStatus+'&MngrDocUploadStatus='+MngrDocUploadStatus);
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
    $("#lilblvendorname").hide();
    $("#litxtvendorname").hide();
    $("#lilblcisstatus").show();
    $("#litxtcisstatus").show();
    $("#lilblOfferstatus").show();
    $("#litxtOfferstatus").show();
    $("#lilblbgvfinalstatus").hide();
    $("#litxtbgvfinalstatus").hide();
    $("#lilblFromDate").show();
    $("#litxtFromDate").show();
    $("#lilblToDate").show();
    $("#litxtToDate").show();
    $("#lilblCountry").hide();
    $("#litxtCountry").hide();
    $("#lilblRequisition").hide();
    $("#litxtRequisition").hide();
    $("#lilblRecruiterId").hide();
    $("#litxtRecruiterId").hide();
    $("#lilblType").hide();
    $("#licmbType").hide();
    $("#lblHireType").show();
    $("#candidateHireTypeSelectBox").show();
    $("#liblUploadStatus").hide();
    $("#licmbUploadStatus").hide();
    //    $("#liExtendedDate").hide();
    //    $("#litxtExtendedDate").hide();
    $("#lilblName").removeClass('width85').addClass('width60');
    $("#lilblFromDate").removeClass('width60').addClass('width85');
    $("#lilblToDate").removeClass('width60').addClass('width85');
    $("#liblMngrUploadStatus").hide();
    $("#licmbMngrUploadStatus").hide();
}

function showhidecontrolsNonBGV() {
    $("#lilblcandidateid").show();
    $("#litxtcandidateid").show();
    $("#lilblName").show();
    $("#litxtName").show();
    $("#lilblEmail").show();
    $("#litxtEmail").show();
    $("#lilblCountry").show();
    $("#litxtCountry").show();
    $("#lilblRequisition").show();
    $("#litxtRequisition").show();
    $("#lilblRecruiterId").show();
    $("#litxtRecruiterId").show();
    $("#lilblFromDate").show();
    $("#litxtFromDate").show();
    $("#lilblToDate").show();
    $("#litxtToDate").show();
    $("#lilblType").show();
    $("#licmbType").show();
    $("#lblHireType").show();
    $("#candidateHireTypeSelectBox").show();
    $("#lilblAssociateId").hide();
    $("#litxtAssociateId").hide();
    $("#lilblvendorname").hide();
    $("#litxtvendorname").hide();
    $("#lilblcisstatus").hide();
    $("#litxtcisstatus").hide();
    $("#lilblbgvfinalstatus").hide();
    $("#litxtbgvfinalstatus").hide();
    $("#litxtOfferstatus").hide();
    $("#lilblOfferstatus").hide();
    $("#liblUploadStatus").hide();
    $("#licmbUploadStatus").hide();
    //    $("#liExtendedDate").hide();
    //    $("#litxtExtendedDate").hide();
    $("#lilblName").removeClass('width60').addClass('width85');
    $("#lilblFromDate").removeClass('width85').addClass('width60');
    $("#lilblToDate").removeClass('width85').addClass('width60');
    $("#liblMngrUploadStatus").hide();
    $("#licmbMngrUploadStatus").hide();
}

function ShowhidecontrolsHTransfer() {
    $("#lilblcandidateid").show();
    $("#litxtcandidateid").show();
    $("#lilblName").show();
    $("#litxtName").show();
    $("#lilblEmail").show();
    $("#litxtEmail").show();
    $("#lilblCountry").show();
    $("#litxtCountry").show();
    $("#lilblRequisition").show();
    $("#litxtRequisition").show();
    $("#lilblRecruiterId").show();
    $("#litxtRecruiterId").show();
    $("#lilblFromDate").show();
    $("#litxtFromDate").show();
    $("#lilblToDate").show();
    $("#litxtToDate").show();
    $("#lilblType").hide();
    $("#licmbType").hide();
    $("#lblHireType").hide();
    $("#candidateHireTypeSelectBox").hide();
    $("#lilblAssociateId").hide();
    $("#litxtAssociateId").hide();
    $("#lilblvendorname").hide();
    $("#litxtvendorname").hide();
    $("#lilblcisstatus").hide();
    $("#litxtcisstatus").hide();
    $("#lilblbgvfinalstatus").hide();
    $("#litxtbgvfinalstatus").hide();
    $("#litxtOfferstatus").hide();
    $("#lilblOfferstatus").hide();
    $("#liblUploadStatus").show();
    $("#licmbUploadStatus").show();
    $("#liblMngrUploadStatus").show();
    $("#licmbMngrUploadStatus").show();
    //    $("#liExtendedDate").hide();
    //    $("#litxtExtendedDate").hide();
    $("#liblUploadStatus").removeClass('width60').addClass('width85');
    $("#liblMngrUploadStatus").removeClass('width60').addClass('width120');
    $("#licmbMngrUploadStatus").css('margin-left', 10);
    $("#lilblName").removeClass('width60').addClass('width85');
    $("#lilblFromDate").removeClass('width85').addClass('width60');
    $("#lilblToDate").removeClass('width85').addClass('width60');
    $("#lilblHireType").hide();
    $("#licmbHireType").hide();

}


function OpenPopForUtility(Path) {
    try {
        var width = 895;
        var height = 504;
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

        childWin = window.open(Path, "Popuputility", params);
        //openPopup();

    } catch (err) { }
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


function OpenPopForUploadExcel(path) {

    try {
        var path = "UploadAttendance.aspx?page=HRSS"
        var width = 675;
        var height = 254;
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

        childWin = window.open(path, "Popuputility", params);
        //openPopup();
        var popupStatus = 0;
        var $backgroundOverLay = $('<div id="overLay"/>');
        $("body").prepend($backgroundOverLay);
        $("#overLay").css({
            "opacity": "0.7"
        });
        $("#overLay").show();
        popupStatus = 1;
    } catch (err) { }

}

function ShowHideHireType() {
    if ($("#countrySelectBox").val() == "1" || $("#countrySelectBox").val() == "2") {
        GetContractorHireType(196, 1);
        $('#lilblType').removeClass('width85').addClass('width0');
        $("#candidateHireTypeSelectBox").show();
        $("#lblHireType").show();
        
    }
    else if ($("#countrySelectBox").val() == 4 && $("#candidateTypeSelectBox").val() == 1) {
        GetContractorHireType(196, 2);
        $('#lilblType').removeClass('width0').addClass('width85');
    }
    else {
        GetContractorHireType(196, 2);
        $("#candidateHireTypeSelectBox").hide();
        $("#lblHireType").hide();
        $('#lilblType').removeClass('width0').addClass('width85');
    }
    $('#candidateHireTypeSelectBox').get(0).selectedIndex = 0;
}





function GetContractorHireType(hireTypeParentId, operationFlag) //operationFlag 1-> Insert 2-> Delete
{
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

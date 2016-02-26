<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TMDashBoard.aspx.cs" Inherits="OneC.OnBoarding.WebApp.Roles.TM.TMDashboard" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9" />
    <title>TM Dashboard</title>
    <link href="../../Styles/drilldown.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Calender.Css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/jquery.ui.all.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/jquery.ui.base.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/jquery.ui.core.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/jquery.ui.datepicker.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/jquery.ui.theme.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../../Scripts/JQuery/1.8/jquery.js"></script>
    <script type="text/javascript" src="../../Scripts/JQuery/1.8/jquery-ui-1.8.16.custom.min.js"></script>
    <%--<script type="text/javascript" src="../../Scripts/JQuery/1.8/indiaonboarding.js"></script>--%>
    <script type="text/javascript" src="../../Scripts/JQuery/jquery.ui.datepicker.js"></script>
    <script type="text/javascript" src="../../Scripts/Validations.js"></script>
    <script type="text/javascript" src="../../Scripts/JQuery/jquery.alerts.js"></script>
    <link href="../../Styles/jquery.alerts.css" rel="stylesheet" type="text/css" media="screen" /> 
    <script language="javascript" type="text/javascript"> 
        function disablePopup() {
            //disables popup only if it is enabled
            $("#overLay").hide();
            $(".popupContactwrapper").hide();
        }
</script>
</head>
<body>
    <form id="Form1" runat="server">
    <div id="main_rc">
        <div class="header_rc">
            <div class="onboarding_rc">
                <p>
                    On Boarding
                </p>
                <img src="../../Images/pie.png" alt="bar chart" />
                <p class="join_rc">
                   <%-- Pre Joining :<asp:Label ID="lblPreJoiningStats" runat="server"></asp:Label>--%>
                   <%-- |--%> Post Joining :
                    <asp:Label ID="lblPostJoiningStats" runat="server">
                    </asp:Label>
                </p>
            </div>
            <div >
                 <%-- <img src="../../Images/prejoiningb.png" alt="prejoining" title="Pre Joining" id="prejoiningbtn_rc"
                    onclick="setProcessId(1);" />--%>
                 <img src="../../Images/postjoinin.png" onclick="setProcessId(2);" alt="postjoining"
                    title="Post Joining" id="postjoiningbtn_rc" style="margin-left:330px"/> 
            </div>
        </div>
        <div class="icon_rc">
            <ul style="float: right; clear: both">
                <%--<li><a href="#" title="Grid View">
                        <img src="../../Images/grid.png" alt="Grid View" />
                        Grid View</a></li> 
                    <li><a href="#" title="Graph View">
                        <img src="../../Images/graph.png" alt="Graph View" />
                        Graph View</a></li>--%>
              <%--  <li>
                    <img src="../../Images/refresh.png" alt="refresh" title="Refresh" onclick="Clear()" /></li>--%>
                <li>
                    <asp:ImageButton runat="server" ImageUrl="~/Images/excel.png" ID="ExportImageButton"
                        title="Excel" OnClick="ExportButton_Click" CssClass="ExportExcel" 
                        TabIndex="10" />
                </li>
            </ul>
        </div>
        <div class="search_rc">
            <asp:ScriptManager ID="ScriptManager1" EnablePageMethods="true" runat="server">
            </asp:ScriptManager>
            <div class="search_header_rc">
                <p>
                    Search by</p>
            </div>
            <div class="search_content_rc">
                <ul>
                    <li>
                        <label for="CandidateInputBox">
                            Candidate ID
                        </label>
                        <input type="text" class="tb_rc" id="CandidateInputBox" onkeypress="javascript:return ValidateOnlyInteger(event);"
                            maxlength="15" tabindex="1" /></li>
                    <li>
                        <label for="name">
                            Name
                        </label>
                        <input type="text" class="tb_rc" id="CandidateNameInputBox" maxlength="250" 
                            tabindex="2"/></li>
                    <li>
                        <label for="email_id">
                            Email ID
                        </label>
                        <input type="text" class="tb_rc" id="CandidateEmailIdInputBox" tabindex="3" /></li>
                    <li>
                        <label for="country">
                            Country
                        </label>
                        <select class="tb_rc" id="countrySelectBox" tabindex="4" onchange="CountrySelectedIndexChange()">
                        </select></li>
                </ul>
                <ul>
                    <li>
                        <label for="RequisitionIdInputBox">
                            Requisition ID
                        </label>
                        <input type="text" class="tb_rc" id="RequisitionIdInputBox" maxlength="15" tabindex="5" /></li>
                    <li>
                         <label for="RecruiterIdInputBox">
                            Recruiter ID
                        </label>
                        <input type="text" class="tb_rc" 
                             onkeypress="javascript:return ValidateOnlyInteger(event);" 
                             id="RecruiterIdInputBox"  maxlength="6" tabindex="6"/>
                    </li>
                    <li>
                        <label for="doj">
                            From Date</label>
                        <input type="text" runat="server" class="tb_rc1" id="DOJFromInputBox" 
                            value="From Date" tabindex="7" />
                    </li>
                    <li>
                        <label for="eod_to">
                        To Date</label>
                            <input type="text" class="tb_rc1" id="DOJToInputBox" runat="server" 
                            value="To Date" tabindex="8" />
                    </li>
                </ul>
                <ul>
                    <li>
                         <label id="lblDepartment" for="Department">
                            Department
                        </label>
                        <select class="tb_rc" id="DepartmentSelectBox" tabindex="9">
                        </select>
                    </li>
                    <li>
                        <label id="lblType" for="type">
                            Type
                        </label>
                        <select class="tb_rc" id="candidateTypeSelectBox" tabindex="10">
                        </select>
                       
                    </li>
                   
                    <li>
                    
                    </li>
                    <li>
                    
                    </li>
                </ul>
                <img src="../../Images/apply.png" id="apply_nh" onclick="Javascript:return ValidateApply(0);" alt="apply" title="Apply" />
                <img src="../../Images/clear.png" id="clear_nh" onclick="Clear()" alt="clear" title="Clear" />      
            </div>
        </div>
        <div class="footer_rc">
            <div id="gridDiv" runat="server">
            </div>
        </div>
    </div>
    <div id="personalDiv">
    </div>
    <input type="hidden" runat="server" id="hdnStartDate" />
    <input type="hidden" runat="server" id="hdnEndDate" />
    <input type="hidden" runat="server" id="hdnProcessId" />
    <input type="hidden" runat="server" id="hdnSessionId" />  
    <input type="hidden" runat="server" id="hdnPageNo" />
    </form>
</body>
<script type="text/javascript" language="javascript">
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
      

    $(document).ready(function () {
        
        $.ajax({
            type: "POST",
            url: "TMDashBoard.aspx/BindCountry",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                $.each(msg.d, function (index, item) {
                    $("#countrySelectBox").get(0).options[$("#countrySelectBox").get(0).options.length] = new Option(item.CountryName, item.CountryID);
                });
                $("#countrySelectBox").selectedIndex = 1;
            },
            error: function () {
                alert("Failed to load");
            }
        });

        $.ajax({
            type: "POST",
            url: "TMDashBoard.aspx/BindCandidateType",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                $.each(msg.d, function (index, item) {
                    $("#candidateTypeSelectBox").get(0).options[$("#candidateTypeSelectBox").get(0).options.length] = new Option(item.CandidateTypeDesc, item.CandidateTypeCode);
                });
                $("#candidateTypeSelectBox").selectedIndex = 1;
            },
            error: function () {
                alert("Failed to load");
            }
        });

        $.ajax({
            type: "POST",
            url: "TMDashBoard.aspx/BindDepartment",
            data: '{"country": "' + $("#countrySelectBox").val() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                $.each(msg.d, function (index, item) {
                    $("#DepartmentSelectBox").get(0).options[$("#DepartmentSelectBox").get(0).options.length] = new Option(item.DepartmentName, item.DepartmentCode);
                });
                //$("#DepartmentSelectBox").selectedIndex = 1;
            },
            error: function (xhr) {
                alert("Failed to load level" + xhr.status);
            }
        });

        HideCandidateType();

        $("#countrySelectBox").change(function () {
            HideCandidateType();
        });

        Onentertext();
        var countryInput = '{"countryID":"' + $("#countrySelectBox").val() + '"}'
        $.ajax({
            type: "POST",
            url: "../../FormsService.aspx/GetDefaultDate",
            data: countryInput,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                stDate = result.d[0].Value;
                $("#hdnStartDate").val(stDate);
                endDate = result.d[1].Value;
                $("#hdnEndDate").val(endDate);
                
            },
            error: function () {
                alert("Failed to load");
            }
        });

        //        var stDate = $("#hdnStartDate").val();
        //        var endDate = $("#hdnEndDate").val();

        $("#DOJFromInputBox").val(stDate);
        $("#DOJToInputBox").val(endDate);
        $("#hdnProcessId").val(2);
        //$("#DOJFromInputBox").datepicker({ dateFormat: 'm/dd/yy', showOn: "both", buttonImage: "../../Images/calendar.png", buttonImageOnly: true });
        //$("#DOJToInputBox").datepicker({ dateFormat: 'm/dd/yy', showOn: "both", buttonImage: "  ../../Images/calendar.png", buttonImageOnly: true });
        $("#DOJFromInputBox").datepicker({ dateFormat: 'mm/dd/yy', showOn: "both", buttonImage: "../../Images/calendar.png", buttonImageOnly: true, changeMonth: true, changeYear: true, buttonAfter: false, hideIfNoPrevNext: false, navigationAsDateFormat: true });
        $("#DOJToInputBox").datepicker({ dateFormat: 'mm/dd/yy', showOn: "both", buttonImage: "../../Images/calendar.png", buttonImageOnly: true, changeMonth: true, changeYear: true, buttonAfter: false, hideIfNoPrevNext: false, navigationAsDateFormat: true });

        //$("select#candidateTypeSelectBox").attr('selectedIndex', 1);
        //$("select#countrySelectBox").attr('selectedIndex', 1);

        if ($("#countrySelectBox").val() == 3 || $("#countrySelectBox").val() == 4) {
            var candidateTypeval = $("#candidateTypeSelectBox").val();
        }
        else {
            var candidateTypeval = 1
        }
        $("#hdnPageNo").val(1);
        $.ajax({
            type: "POST",
            url: "TMDashBoard.aspx/TransformXML",
            data: '{"gridView":"0","processId":"2","pageNo":"1","candidateID":"' + $("#CandidateInputBox").val() + '", "name":"' + $("#CandidateNameInputBox").val() + '", "recruiterID":"' + $("#RecruiterIdInputBox").val() + '", "emailID":"' + $("#CandidateEmailIdInputBox").val() + '", "requisition": "' + $("#RequisitionIdInputBox").val() + '", "candidateType": "' + candidateTypeval + '", "fromDate":"' + $("#DOJFromInputBox").val() + '", "toDate":"' + $("#DOJToInputBox").val() + '", "country":"' + $("#countrySelectBox").val() + '", "departmentCode":"' + $("#DepartmentSelectBox").val() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: AjaxSucceeded,
            error: AjaxFailed

        });

        FetchCand(1, 0);

    });

    function Onentertext() {
        $('#CandidateInputBox').keypress(function (e) {
            if (e.which == 13) {
                ValidateApply(0);
                $(this).focus();
                return false;
            }
        });
        $('#CandidateNameInputBox').keypress(function (e) {
            if (e.which == 13) {
                ValidateApply(0);
                $(this).focus();
                return false;
            }
        });
        $('#CandidateEmailIdInputBox').keypress(function (e) {
            if (e.which == 13) {
                ValidateApply(0);
                $(this).focus();
                return false; 
            }
        });
        $('#RequisitionIdInputBox').keypress(function (e) {
            if (e.which == 13) {
                ValidateApply(0);
                $(this).focus();
                return false;
            }
        });
        $('#RecruiterIdInputBox').keypress(function (e) {
            if (e.which == 13) {
                ValidateApply(0);
                $(this).focus();
                return false;
            }
        });
    }

    function HideCandidateType() {
        if ($("#countrySelectBox option:selected").val() == "3" || $("#countrySelectBox option:selected").val() == "4") {
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

    function ValidateApply(gridview) {
        var status1 = false;
        //        if (status == ValidateAlphanumeric($('#CandidateNameInputBox').val())) {
        //            MsgboxAlertDashboard(2, 12, "CHARACTER_VALID");
        //            return false;
        //        }
        //                if (status == ValidateAlphanumericForEmailId($('#CandidateEmailIdInputBox').val())) {
        //                    MsgboxAlertDashboard(23, 2, 28, "EMAIL_ID_VALIDATE", "Enter Valid E-Mail Id");
        //                    return false;
        //                }
        if (status1 == DateCompare($('#DOJFromInputBox').val(), $('#DOJToInputBox').val())) {
            MsgboxAlertDashboard(23, 2, 27, "DATE_VALIDATE", "Invalid Date Range!Start Date cannot be after End Date");
            return false;
        }

        FetchCand(1, gridview);
    }

    function AjaxSucceeded(result) {
        var response = result.d.split('*#@');
        $("#gridDiv").html(response[0]);
        if (response[1] != null) {
            if (response[1] == 0) {
                document.getElementById('<%=ExportImageButton.ClientID %>').disabled = true;
            }
            else {
                document.getElementById('<%=ExportImageButton.ClientID %>').disabled = false;
            }

        }

    }
        
    function AjaxFailed(result) {
        //alert(result.responseText);
    }

    function setProcessId(ProcessId) {
        $("#hdnProcessId").val(ProcessId);
        $.ajax({
            type: "POST",
            url: "TMDashBoard.aspx/ClearSession",
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: '',
            error: AjaxFailed

        });
        //$("#prejoiningbtn_rc").attr('src', '../../Images/prejoinin.png');
        $("#postjoiningbtn_rc").attr('src', '../../Images/postjoinin.png');
        FetchCand(1, 0);
    }
    function Clear(result) {
        $("#CandidateInputBox").val('');
        $("#CandidateNameInputBox").val('');
        $("#CandidateEmailIdInputBox").val('');
        $("#RequisitionIdInputBox").val('');
        $("#RecruiterIdInputBox").val('');
        $("#candidateTypeSelectBox").val(1);
        $("#countrySelectBox").val(1);
        var stDate = $("#hdnStartDate").val();
        var endDate = $("#hdnEndDate").val();

        $("#DOJFromInputBox").val(stDate);
        $("#DOJToInputBox").val(endDate);
        //FetchCand(1, 0);
    }


    function FetchCand(pageNo, gridView) {
        if ($("#countrySelectBox").val() == 3 || $("#countrySelectBox").val() == 4) {
            var candidateTypeval = $("#candidateTypeSelectBox").val();
        }
        else {
            var candidateTypeval = 1
        }
        $("#hdnPageNo").val(pageNo);
        var dataString = '{"gridView":"' + gridView + '","processId" : "' + $("#hdnProcessId").val() + '" ,"pageNo":"' + pageNo + '","candidateID":"' + $("#CandidateInputBox").val() + '", "name":"' + $.trim($("#CandidateNameInputBox").val()) + '", "recruiterID":"' + $("#RecruiterIdInputBox").val() + '", "emailID":"' + $.trim($("#CandidateEmailIdInputBox").val()) + '", "requisition": "' + $.trim($("#RequisitionIdInputBox").val()) + '", "candidateType": "' + candidateTypeval + '", "fromDate":"' + $("#DOJFromInputBox").val() + '", "endDate":"' + $("#DOJToInputBox").val() + '", "country":"' + $("#countrySelectBox").val() + '", "departmentCode":"' + $("#DepartmentSelectBox").val() + '"}';

        $.ajax({
            type: "POST",
            url: "TMDashBoard.aspx/TransformXML",
            data: dataString,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: AjaxSucceeded,
            error: AjaxFailed

        });
    }


    function PaginationDashboard(startIndex, pageNo) {
        FetchCand(pageNo, 0);

    }
    function PaginationTask(startIndex, pageNo) {
        $("#personalDiv").show();
        var datastring = '{startIndex:' + startIndex + ',pageNo:' + pageNo + '}';
        $.ajax({
            type: "POST",
            url: "TMDashBoard.aspx/PersonalDataTaskPagination",
            data: datastring,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: PersonalData,
            error: AjaxFailed,
            complete: addDatepicker

        });
    }

    function FetchDrill(CandidateID) {

        $("#personalDiv").show();
        var datastring = '{candidateID:' + CandidateID + ',processId : ' + $("#hdnProcessId").val() + '}'

        $.ajax({
            type: "POST",
            url: "TMDashBoard.aspx/PersonalData",
            data: datastring,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: PersonalData,
            error: AjaxFailed,
            complete:addDatepicker
        });
    }

    function PersonalData(result) {
        //result.toString()


        //        //    $("#personalDiv").show("slide", { direction: "left" }, 1000);
        //        $("#main_rc").fadeTo(900, 0.0);
        //        $("#personalDiv").html(result.d);
        //        //   $("#personalDiv").append(result.d);

        $("#personalDiv").css("display", "block");
        $("#personalDiv").html(result.d);
    }

    function addDatepicker() {
        if ($('input#edoj').parent().length > 0 && $('.fakePicker').length==0) {
            var el = $(".border-dd").children('div').eq(1).children('div').eq(0);
            $(el).addClass('fakePicker').css({ 'position': 'relative' });
            var imgOb = $('<img/>').attr({ 'src': '../../Images/calendar.png', 'width': 19, 'height': '20', 'class': 'imgTarget' }).click
(function (ev) {
    ev.stopPropagation();
    $(el).datepicker('setDate', $("input#edoj")[0].value);
    $(el).children('div').eq(0).css({ 'position': 'absolute', 'top': '-48px', 'left': '155px', 'z-index': '12' }).addClass
('dateBox').show();
});
            $(el).append(imgOb);
            $(el).datepicker({
                dateFormat: 'mm/dd/yy',
                showOn: "both",
                buttonImageOnly: true,
                changeMonth: true,
                changeYear: true,
                buttonAfter: false,
                hideIfNoPrevNext: false,
                navigationAsDateFormat: true,
                onSelect: function (theDate) {
                    $("#edoj").removeAttr('readOnly').val(theDate).attr("readOnly", "readOnly");
                    $(el).children('div').eq(0).hide();
                }

            });

            $(el).children('div').eq(0).hide();

            /*hide datepicker on clicking outside it*/
            $(document).click(function (e) {
                if (!$(e.target).parents().filter('.dateBox').length) {
                    $('.dateBox').hide();
                }
            }); 

        } else { return false; }

    }

    function UpdateCandidateInfo(candidate, doj, status, emailid, OriginalEmailId, ResendCheckbox, divmsg) {
        var candidateValue;
        var dojValue;
        var statusValue;
        var emailidValue;
        var ResendMailval;
        var OrgEmailIdval;
        if (candidate != null) {
            candidateValue = candidate.value;
        }
        else {
            candidateValue = "";
        }
        if (doj != null) {
            dojValue = doj.value;
        }
        else {
            dojValue = "";
        }
        if (status != null) {
            statusValue = status.value;
        }
        else {
            statusValue = "";
        }
        if (emailid != null) {
            emailidValue = emailid.value.trim();
            var flag = ValidateEmail(emailidValue);
        }
        else {
            emailidValue = "";
        }
        if (OriginalEmailId != null) {
            OrgEmailIdval = OriginalEmailId.value;
        }
        else {
            OrgEmailIdval = "";
        }
        if (ResendCheckbox.checked == true) {
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

            var inputData = '{ "candidate":"' + candidateValue + '","candidateDOJ" : "' + dojValue + '","offerStatus" :"' + statusValue + '","emailId" : "' + emailidValue + '","resendMail":"' + ResendMailval + '"}';

            $.ajax({
                type: "POST",
                url: "HRSSDashBoard.aspx/UpdatePersonalData",
                data: inputData,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: Success,
                error: AjaxFailed

            });
            //FetchDrill(candidateValue);
            divmsg.style.display = "block";
        }
        else {
            divmsg.style.display = "none";
        }
    }

    //    function UnlockCandidateAccess(hdnCountryId, candidate, unlockImageButton) {
    //        var inputData = '{ "candidate":' + candidate.value + ',"countryId": ' + hdnCountryId.value + '}';

    //        $.ajax({
    //            type: "POST",
    //            url: "TMDashBoard.aspx/UnlockCandidateAccess",
    //            data: inputData,
    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            success: Success,
    //            error: AjaxFailed

    //        });
    //    }

    function UpdateCandidateJoiningStatusDetails(candidate, status) {
        var candidateValue;
        var statusValue;
        if (candidate != null) {
            candidateValue = candidate.value;
        }
        else {
            candidateValue = "";
        }
        if (status != null) {
            statusValue = status.value;
        }
        else {
            statusValue = "";
        }
        var inputData = '{ "candidate":"' + candidateValue + '","joiningStatus": "' + statusValue + '"}';

        $.ajax({
            type: "POST",
            url: "TMDashBoard.aspx/UpdateCandidateJoiningStatusDetails",
            data: inputData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: Success,
            error: AjaxFailed

        });
    }

    function Success(result) {
        //alert("Updated Sucessfully");
        //$("#personalDiv").html(result.d);
        //MsgboxAlertDashboard(23,1,26,"DATA_UPDATE_SUCCESS","Data Updated Successfully");

    }

//    function OpenPop(Url, TaskID, CandidateId) {

//        var countryId = $("#countrySelectBox").val();
//        var sessionId = $("#hdnSessionId").val();
//        var CandId = CandidateId.value;
//        var openMode = 1;
//        var Path = Url + '?ss=' + sessionId + '&cand=' + CandId + '&task=' + TaskID + '&cntry=' + countryId + '&opmde=' + openMode;
//        //var Path = "../NHPages/Paperwork/Canada/PersonalTax.htm?ss=13319&cand=208099208&task=32&cntry=2";
//      
//        try {
//            var width = 950;
//            var height = 700;
//            var left = (screen.width - width) / 2;
//            var top = (screen.height - height) / 2;
//            var params = 'width=' + width + ', height=' + height;
//            params += ', top=' + top + ', left=' + left;
//            params += ', directories=no';
//            params += ', location=no';
//            params += ', menubar=no';
//            params += ', resizable=no';
//            params += ', scrollbars=no';
//            params += ', status=no';
//            params += ', toolbar=no';

//            childWin = window.open(Path, "Popup", params);
//            var popupStatus = 0;
//            //loads popup only if it is disabled
//            if (popupStatus == 0) {
//                var $backgroundOverLay = $('<div id="overLay"/>');
//                $("body").prepend($backgroundOverLay);

//                $("#overLay").css({
//                    "opacity": "0.7"
//                });
//                $("#overLay").show();
//                popupStatus = 1;
//            }
//     } catch (err) { }

//    }

    function Refreshdata() {
        var pgeno = $("#hdnPageNo").val();
        FetchCand(pgeno, 0);
        $("#personalDiv").hide();
        $("#main_rc").show();
        //  $("#personalDiv").hide("slide", { direction: "left" }, 1000);
        //  $("#main_rc").fadeTo(900, 1);
        $('.fakePicker').children('div').eq(0).hide(); /*SIT bug fix to hide datepicker on clicking back to summary link*/
    }


//    $("#prejoiningbtn_rc").click(function () {
//        $("#prejoiningbtn_rc").attr('src', '../../Images/prejoiningb.png');
//        $("#postjoiningbtn_rc").attr('src', '../../Images/postjoining.png');
//    });
    $("#postjoiningbtn_rc").click(function () {
        //$("#prejoiningbtn_rc").attr('src', '../../Images/prejoinin.png');
        $("#postjoiningbtn_rc").attr('src', '../../Images/postjoinin.png');
    });
</script>
<script type="text/javascript">
    function CountrySelectedIndexChange() {
        $("#DepartmentSelectBox").empty();
        $.ajax({
            type: "POST",
            url: "TMDashBoard.aspx/BindDepartment",
            data: '{"country": "' + $("#countrySelectBox").val() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                $.each(msg.d, function (index, item) {
                    $("#DepartmentSelectBox").get(0).options[$("#DepartmentSelectBox").get(0).options.length] = new Option(item.DepartmentName, item.DepartmentCode);
                });
                //$("#DepartmentSelectBox").selectedIndex = 1;
            },
            error: function (xhr) {
                alert("Failed to load level" + xhr.status);
            }
        });

    }
</script>
</html>

<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="IMDashBoard.aspx.cs" Inherits="OneC.OnBoarding.WebApp.Roles.IM.IMDashBoard" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
 
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Induciton Manager Dashboard</title>
    <link href="../../Styles/drilldown.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Calender.Css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/jquery.ui.all.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/jquery.ui.base.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/jquery.ui.core.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/jquery.ui.datepicker.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/jquery.ui.theme.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../../Scripts/JQuery/1.8/jquery.js"></script>
        <script type="text/javascript" src="../../Scripts/JQuery/1.8/jquery-ui-1.8.16.custom.min.js"></script>
    <script type="text/javascript" src="../../Scripts/JQuery/1.8/indiaonboarding.js"></script>
    <script type="text/javascript" src="../../Scripts/JQuery/jquery.ui.datepicker.js"></script>
  <%--  <script type="text/javascript" src="../../Scripts/Validations.js"></script>--%>
    <script type="text/javascript" src="../../Scripts/JQuery/jquery.alerts.js"></script>
    <script src="../../Scripts/Validations.js" type="text/javascript"></script>
    <link href="../../Styles/jquery.alerts.css" rel="stylesheet" type="text/css" media="screen" />
    <style type="text/css">
#main_nho{width:962px;margin:0 auto; height:500px;}
.height150{height:150px;}
.height110{height:110px;}
.marginT15{margin-top:15px;}
.marginR45{ margin-right:45px;}
.nho_details table{width:100%;}
.nho_details table tr,#enroll_candidate table tr{height:30px; text-align:center; }
.nho_details table tr td,#enroll_candidate table tr td{vertical-align:middle;}
.nho_details table tr th,#enroll_candidate table tr th {background:#e8f5fb; padding-left: 15px;
    text-align: left;
    vertical-align: middle;}
.font16{font-size:1.6em;}
.font14{font-size:1.4em;}
.marginL10{margin-left:10px;}
.blue_text{color:#46b7e8;}
.gray_text{color:#8f9291;}
.nho_details table,td{border:1px solid #bfe5fb;}
.nho_details table tr td a{ text-decoration:none;color:#46b7e8;}
.borderBnone{border-bottom:none; width:20%;}
.paddingT5{padding-top:5px;}
.paddingT10L10{padding:10px 0 0 10px;}
.height20{height:20px !important;}
.heightA{height:auto;}
.height17{height:18px;}
.paddingT3{padding-top:2px;}
.paddingTB10{padding:10px 0;}
.paddingL10{padding-left:10px;}
.paddingT20B10{padding:20px 0 10px 0;}
#enroll_candidate p{ 
filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#FFe2f5fc, endColorstr=#FFd0ecfb);
-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#FFe2f5fc, endColorstr=#FFd0ecfb)";
background: -webkit-gradient(linear, left top, left bottom, from(#e2f5fc), to( #d0ecfb));background: -moz-linear-gradient(top,  #e2f5fc,   #d0ecfb);background: -o-linear-gradient(top,  #e2f5fc,   #d0ecfb); border:1px solid #a3c9dd;}
.fleft{float:left;}
.width165 {width:165px;}
.marginL20 {margin-left:20px;}
.marginL60 {border-left:2px; margin-left:60px;}
#enroll_candidate span{}
#enroll_candidate table tr th{padding-right:15px;}
.color71{color:#716f6b;}
.margin0A{margin:0 auto;}
.paddingLR10{padding:0 10px;}
.cursor_pointer{cursor:pointer;}
.font12px{font-size:12px;}
.font14px{font-size:14px;}
.clear{clear:both;}
.fright{float:right;}
.marginR20{margin-right:20px;}
#enroll_candidate{font-size:62.5%;}
.width100p{padding-right: 4px;
    width: 98%;}
	.font16px{font-size:16px;}
.marginB30{margin-bottom:30px;}
.marginB10{margin-bottom:10px;}
.dayborder{border-left:1px;height:20px;}
</style>
<%--    <script src="../../Scripts/NHOTraining.js" type="text/javascript"></script>--%>
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
                    Pre Joining :<asp:Label ID="lblPreJoiningStats" runat="server"></asp:Label>
                    | Post Joining :
                    <asp:Label ID="lblPostJoiningStats" runat="server">
                    </asp:Label>
                </p>
            </div>
            <div class="joining_rc">
                <img src="../../Images/prejoiningb.png" alt="prejoining" title="Pre Joining" id="prejoiningbtn_rc"
                    onclick="setProcessId(1);Clear();" />
                <img src="../../Images/postjoining.png" onclick="setProcessId(2);Clear();" alt="postjoining"
                    title="Post Joining" id="postjoiningbtn_rc" />
            </div>
        </div>
   
               <div class="icon_rc">
            <ul style="float: right; clear: both">
          
                <li>
                    <asp:ImageButton runat="server" ImageUrl="~/Images/excel.png" ID="ExportImageButton" style="display:block"
                        title="Excel" OnClick="ExportButton_Click" CssClass="ExportExcel" TabIndex="20" />
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
             
           
            <div  class="search_content_rc">
            <ul style="height:30px;"><li style="width:100%;padding-top:5px;">
            Select View: 
                 <select class="tb_rc" id="selectView"  onchange="Javascript:return ValidateApply(0);">
                     
                     <option value="1">Induction View</option>
                     <option value="2">Candidate View</option>
                 </select></li></ul>
                <div id="ulTrainingView" style="display:none">  
             <ul >
                    
                    <li>
                        <label for="doj">
                            Induction date range</label>
                        <input type="text" runat="server" class="tb_rc1" id="training_dateFrom" value="From Date" />
                    </li>
                    <li id="endDate">
                        <label for="eod_to"></label>
                            <input type="text" class="tb_rc1" id="training_dateTo" runat="server" value="To Date" />
                    </li>
                    
                </ul>
                  <img src="../../Images/apply.png" id="apply_induction" onclick="Javascript:return ValidateApply(0);"
                    alt="apply" title="Apply" />  
                </div>
                <div id="ulCandidateView" style="display:none">
                <ul>
                    <li>
                        <label for="CandidateInputBox">
                            Candidate ID
                        </label>
                        <input type="text" class="tb_rc" id="CandidateInputBox" onkeyup="javascript:return ValidateOnlyInteger(this);"
                            maxlength="15" /></li>
                    <li>
                        <label for="name">
                            Name
                        </label>
                        <input type="text" class="tb_rc" id="CandidateNameInputBox" /></li>
                    <li>
                        <label for="email_id">
                            Email ID
                        </label>
                        <input type="text" class="tb_rc" id="CandidateEmailIdInputBox" /></li>
                         <li>
                        <label for="country">
                            Country
                        </label>
                        <select class="tb_rc" id="countrySelectBox" onchange="getHireType()"> 
                        </select></li>
                        
                     
                </ul>
                <ul>
                    <li>
                        <label for="RecruiterIdInputBox">
                            Recruiter ID
                        </label>
                        <input type="text" class="tb_rc" id="RecruiterIdInputBox" onkeyup="javascript:return ValidateOnlyInteger(this);"  maxlength="6" /></li>
                    <li>
                        <label for="doj">
                            EDOJ From Date</label>
                        <input type="text" runat="server" class="tb_rc1" id="DOJFromInputBox" value="From Date" />
                    </li>
                    <li>
                        <label for="eod_to">
                                EDOJ To Date</label>
                            <input type="text" class="tb_rc1" id="DOJToInputBox" runat="server" value="To Date" />
                    </li>
                    
                    <li id="lilblHireType" class="width85">
                        <label id="lblHireType" for="hiretype">
                            Hire Type:</label>
                            <select  class="tb_rc" id="candidateHireTypeSelectBox" style="width:auto;">
                            </select>
                        
                    </li>
                </ul>
                  <img src="../../Images/apply.png" id="apply_nh" onclick="Javascript:return ValidateApply(0);"
                    alt="apply" title="Apply" />
                <img src="../../Images/clear.png" id="clear_nh" alt="clear" onclick="Clear()" title="Clear" />
                </div>
              
            </div>
        </div>
        <div class="footer_rc">
            <div id="gridDiv" runat="server">
            </div>
    <div id="NHOMain" align="center" class="table_nh" style="width: 100%;">
    </div>
        </div>
    </div>
    <div id="nho_pop">
    </div>
    <div id="personalDiv"   >
    </div>
   
   
    <input type="hidden" runat="server" id="hdnStartDate" />
    <input type="hidden" runat="server" id="hdnEndDate" />
        <input type="hidden" runat="server" id="hdnTrainingStartDate" />
    <input type="hidden" runat="server" id="hdnTrainingEndDate" />
    <input type="hidden" runat="server" id="hdnProcessId" />
    </form>
</body>
<script type="text/javascript" language="javascript">


 function ValidateApply(gridview) {
        var ViewType = $("#selectView").val();
        var status = false;

        if (ViewType == 1) {
          
            document.getElementById('ExportImageButton').style.display = "block";

            if (status == DateCompare($('#training_dateFrom').val(), $('#training_dateTo').val())) {
                MsgboxAlertDashboard(23, 2, 27, "DATE_VALIDATE", "Invalid Date Range!Start Date cannot be after End Date");
                return false;
            }
//            document.getElementById('ulTrainingView').style.display = "block";
//            document.getElementById('ulCandidateView').style.display = "none";
            GetInductionInfo(4, 1);
            
           
           
        }
        else {
            document.getElementById('ExportImageButton').style.display = "none";
            
            if (status == ValidateAlphanumeric($('#CandidateNameInputBox').val())) {
                MsgboxAlertDashboard(23, 2, 46, "CANDIDATE_NAME_VALIDATE", "Please Enter a Valid Candidate Name");
                return false;
            }
            if (status == ValidateAlphanumericForEmailId($('#CandidateEmailIdInputBox').val())) {
                MsgboxAlertDashboard(23, 2, 28, "EMAIL_ID_VALIDATE", "Please Enter a Valid EmailID Name");
                return false;
            }
//            if (status == DateCompare($('#DOJFromInputBox').val(), $('#DOJToInputBox').val())) {
//                return false;
//            }
            if (status == DateCompare($('#DOJFromInputBox').val(), $('#DOJToInputBox').val())) {
                MsgboxAlertDashboard(23, 2, 27, "DATE_VALIDATE", "Invalid Date Range!Start Date cannot be after End Date");
                return false;
            }
            FetchCand(1, gridview);
           
        }
    }

    $().ready(function () {

        var hireTypeParentId = 137;
        var parentId = '{"parentId":' + hireTypeParentId + '}';
        $.ajax({//hiretypeforuk

            type: "POST",
            url: "../../DashboardService.aspx/BindCandidateHireType",
            data: parentId,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                $.each(msg.d, function (index, item) {
                    $("#candidateHireTypeSelectBox").get(0).options[$("#candidateHireTypeSelectBox").get(0).options.length] = new Option(item.CandidateTypeDesc, item.CandidateTypeCode);
                });
                $("#candidateHireTypeSelectBox").selectedIndex = 1;
            },
            error: function () {
                alert("Failed to load");
            }
        });
        var countryID;
        $.ajax({
            type: "POST",
            url: "IMDashBoard.aspx/BindCountry",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {

                $.each(msg.d, function (index, item) {
                    // countryID = item.CountryID;
                    $("#countrySelectBox").get(0).options[$("#countrySelectBox").get(0).options.length] = new Option(item.CountryName, item.CountryID);
                    if ($("#countrySelectBox").val() != null) {

                        if (($("#countrySelectBox").val() == "4") || ($("#countrySelectBox").val() == "104")) {

                            $('#lilblHireType').show();
                        }
                        else {

                            $('#lilblHireType').hide();
                        }
                    }
                });
               
                $("#countrySelectBox").selectedIndex = 2;

            },
            error: function () {
                alert("Failed to load Country");
            }
        });


        var countryInput = '{"countryID":"' + $("#countrySelectBox").val() + '"}'
        var stDate, endDate, stTrainingDate, endTrainingDate
        $.ajax({
            type: "POST",
            url: "IMDashBoard.aspx/GetDefaultDate",
            data: countryInput,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                stDate = result.d[0].Value;
                endDate = result.d[1].Value;

                stTrainingDate = result.d[2].Value;
                endTrainingDate = result.d[3].Value;
            },
            error: function () {
                alert("Failed to load");
            }
        });
        //        var stDate = $("#hdnStartDate").val();
        //        var endDate = $("#hdnEndDate").val();

        //        var stTrainingDate = $("#hdnTrainingStartDate").val();
        //        var endTrainingDate = $("#hdnTrainingEndDate").val();

        $("#DOJFromInputBox").val(stDate);
        $("#DOJToInputBox").val(endDate);

        $("#training_dateFrom").val(stTrainingDate);
        $("#training_dateTo").val(endTrainingDate);

        $("#hdnProcessId").val(1);
        $("#countrySelectBox").attr('selectedIndex', 2);
        if ($("#selectView").val() == 1) {
            document.getElementById('ulTrainingView').style.display = "block";
            document.getElementById('ulCandidateView').style.display = "none";
            GetInductionInfo(4, 1);

        }

        else {
            document.getElementById('ulTrainingView').style.display = "none";
            document.getElementById('ulCandidateView').style.display = "block";
            //            FetchCand(1, gridview);
            $.ajax({
                type: "POST",
                url: "IMDashBoard.aspx/TransformXML",
                data: '{ "gridView":"0","processId" : "1"  ,"pageNo":"1" ,"candidateID":"' + $("#CandidateInputBox").val() + '", "name":"'
            + $("#CandidateNameInputBox").val() + '",  "emailID":"' + $("#CandidateEmailIdInputBox").val() + '", "recruiterID": "'
            + $("#RecruiterIdInputBox").val() + '",  "fromDate":"' + $("#DOJFromInputBox").val() + '", "todate":"' + $("#DOJToInputBox").val() + '", "country":"' + "1" + '","hireType":"' + $("#candidateHireTypeSelectBox").val() + '"}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: AjaxSucceeded,
                error: AjaxFailed

            });

        }

    });
   
    $(function () {

        $("#DOJFromInputBox").datepicker({ dateFormat: 'm/dd/yy', showOn: "both", buttonImage: "../../Images/calendar.png", buttonImageOnly: true, changeMonth: true, changeYear: true, buttonAfter: false, hideIfNoPrevNext: false, navigationAsDateFormat: true });
        $("#DOJToInputBox").datepicker({ dateFormat: 'm/dd/yy', showOn: "both", buttonImage: "  ../../Images/calendar.png", buttonImageOnly: true, changeMonth: true, changeYear: true, buttonAfter: false, hideIfNoPrevNext: false, navigationAsDateFormat: true });

        $("#training_dateFrom").datepicker({ dateFormat: 'm/dd/yy', showOn: "both", buttonImage: "../../Images/calendar.png", buttonImageOnly: true, changeMonth: true, changeYear: true, buttonAfter: false, hideIfNoPrevNext: false, navigationAsDateFormat: true });
        $("#training_dateTo").datepicker({ dateFormat: 'm/dd/yy', showOn: "both", buttonImage: "  ../../Images/calendar.png", buttonImageOnly: true, changeMonth: true, changeYear: true, buttonAfter: false, hideIfNoPrevNext: false, navigationAsDateFormat: true });
       

    });
//    $(".datepicker").delegate(".training_dateFrom1", "focusin", function () {
//        $(this).datepicker();
//    });

    function getHireType() {
        if (($('#countrySelectBox').val() == "4") ||($("#countrySelectBox").val() == "104")) {

            $('#lilblHireType').show();
        }

        else {
            $('#lilblHireType').hide();
        }
}

    function AjaxSucceeded(result) {
        var response = result.d.split('*#@');
        $("#gridDiv").html(response[0]);
       

    }

    function AjaxFailed(result) {
        //alert(result.responseText);
    }
    function setProcessId(ProcessId) {
        $("#hdnProcessId").val(ProcessId);
        $.ajax({
            type: "POST",
            url: "IMDashBoard.aspx/ClearSession",
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: '',
            error: AjaxFailed

        });
       
        $("#prejoiningbtn_rc").attr('src', '../../Images/prejoinin.png');
        if ($("#selectView").val() == 1) {
            document.getElementById('ulTrainingView').style.display = "block"
            GetInductionInfo(4, 1);

        }

        else {

            FetchCand(1, 0);

        }
      
    }
    function Clear(result) {
        if ($("#selectView").val() == 2) {
            $("#CandidateInputBox").val('');
            $("#CandidateNameInputBox").val('');
            $("#CandidateEmailIdInputBox").val('');
            $("#RecruiterIdInputBox").val('');

           // var stDate = $("#hdnStartDate").val();
           // var endDate = $("#hdnEndDate").val();

           // $("#DOJFromInputBox").val(stDate);
          //  $("#DOJToInputBox").val(endDate);
            FetchCand(1, 0);

        }
    }
//    (string gridView, string processId, string pageNo, string candidateID, string name, string emailID, string recruiterID, DateTime fromDate, DateTime todate, int country, int hireType)
    function FetchCand(pageNo, gridView) {
        
        document.getElementById('ulTrainingView').style.display = "none";
        document.getElementById('ulCandidateView').style.display = "block";
        document.getElementById("NHOMain").innerHTML = "";
        
        var dataString = '{"gridView":"' + gridView + '","processId" : "' + $("#hdnProcessId").val() + '" ,"pageNo":"' + pageNo + '","candidateID":"' + $("#CandidateInputBox").val() + '", "name":"'
        + $("#CandidateNameInputBox").val() + '",  "emailID":"' + $("#CandidateEmailIdInputBox").val() + '", "recruiterID": "' + $("#RecruiterIdInputBox").val() + '",  "fromDate":"' + $("#DOJFromInputBox").val() + '", "todate":"' + $("#DOJToInputBox").val() + '", "country":"' + $("#countrySelectBox").val() + '","hireType":"'+ $("#candidateHireTypeSelectBox").val() +'"}';

        $.ajax({
            type: "POST",
            url: "IMDashBoard.aspx/TransformXML",
            data: dataString,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: AjaxSucceeded,
            error: AjaxFailed

        });
    }


    function PaginationDashboard1(startIndex, pageNo) {
        FetchCand(pageNo, 0);

    }
    function PaginationTask(startIndex, pageNo) {
        $("#personalDiv").show();
        var datastring = '{startIndex:' + startIndex + ',pageNo:' + pageNo + '}';
        $.ajax({
            type: "POST",
            url: "IMDashBoard.aspx/PersonalDataTaskPagination",
            data: datastring,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: PersonalData,
            error: AjaxFailed

        });
    }

    function FetchDrill(CandidateID) {

        $("#personalDiv").show();
        var datastring = '{candidateID:' + CandidateID + ',processId : ' + $("#hdnProcessId").val() + '}'

        $.ajax({
            type: "POST",
            url: "IMDashBoard.aspx/PersonalData",
            data: datastring,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: PersonalData,
            error: AjaxFailed

        });
    }

    function PersonalData(result) {



        // $("#personalDiv").show("slide", { direction: "left" }, 1000);
        //        $("#main_rc").fadeTo(900, 0);
        //        $("#personalDiv").html(result.d);

        //  $("#main_rc").hide();
        $("#personalDiv").css("display", "block");
        $("#personalDiv").html(result.d);

    }

    
    $("#prejoiningbtn_rc").click(function () {
        $("#prejoiningbtn_rc").attr('src', '../../Images/prejoiningb.png');
        $("#postjoiningbtn_rc").attr('src', '../../Images/postjoining.png');
    });
    $("#postjoiningbtn_rc").click(function () {
        $("#prejoiningbtn_rc").attr('src', '../../Images/prejoinin.png');
        $("#postjoiningbtn_rc").attr('src', '../../Images/postjoinin.png');
    });
    function GetInductionInfo(startIndex, pageNo) {


        document.getElementById('ulCandidateView').style.display = "none";
        document.getElementById('ulTrainingView').style.display = "block";
        document.getElementById("nho_pop").innerHTML = "";
        
        var datastring = "{";
      //  datastring += "'sessionId':" + 23 + ",";
        datastring += "'pageSize':" + startIndex + ",";
        datastring += "'pageNo':" + pageNo + ",";
        datastring += "'startDate':" + "'" + $("#training_dateFrom").val() + "'" + ",";
        datastring += "'country':" + "'" +  $("#countrySelectBox").val() + "'" + ",";
       
        datastring += "'endDate':" + "'" + $("#training_dateTo").val() + "'" ;
        datastring += "}";

        $.ajax({
            type: "POST",
            url: "IMDashBoard.aspx/FetchTrainingData",
            data: datastring,

            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {             
                if (msg.d[1].Value == "") {
                    document.getElementById("NHOMain").innerHTML = "";
                    $("#gridDiv").html('');
                    $('#NHOMain').append(msg.d[0].Value); ;
                }
                else {
                    pgDom = OBParseXML(msg.d[0].Value);

                    var pageDetails = '';
                    var TrainingName;
                    var TrainingDate;
                    var City;
                    var FromTime, ToTime, CandidateCount;
                    var ModifyId = 0;
                    var UpdateId = 1;
                    var DeleteId = 2; var CancelId = 3; var BlockDate = 4; var UnBlockDate = 5;
                    var txt_date = 0;
                    var TrainingID;
                    var SpanId; var TextId; var aTagId; var IsBlocked;


                    pageDetails += '<table width="80%" align="center" border="0" ><tr><th class="task_t">Induction Name</th><th class="task_t">Scheduled Date</th><th class="status_t">Location</th><th class="action_t">Enrolled Candidates</th><th class="ref_t">Modify</th><th class="ref_t">Delete</th><th class="ref_t">Block the Date</th></tr>'; /*adding header image */
                    $(pgDom).find('ArrayOfNewHireTrainingDC').find('NewHireTrainingDC').each(function () {
                        TrainingName = $(this).find('TrainingName').text();
                        TrainingDate = $(this).find('TrainingScheduledDate').text();
                        IsBlocked = $(this).find('IsBlocked').text();
                        City = $(this).find('TrainingLocation').text();
                        FromTime = $(this).find('StartTime').text();
                        ToTime = $(this).find('EndTime').text();
                        CandidateCount = $(this).find('CandidateCount').text();
                        TrainingID = $(this).find('TrainingId').text();
                        txt_date++;
                        SpanId = "span" + txt_date;
                        TextId = "textid" + txt_date;
                        aTagId = "a_Modify" + txt_date;
                        pageDetails += '<tr>';
                        pageDetails += '<td class="even_row">' + TrainingName + '</td>';
                        pageDetails += '<td class="training_dateFrom1" id=' + txt_date + '>';
                        pageDetails += '<span id="span' + txt_date + '"class="labelValue">' + TrainingDate + '</span>';

                        pageDetails += '<p id="p' + txt_date + '"style="display: none"><input type="text"  readonly=true class="editInput"  id="textid' + txt_date + '"style="display: none;border: 1px solid #B9B9B9;color: #4B4F4E;height: 20px;width: 125px;float:left;"/></p></td>'

                        pageDetails += '<td class="even_row">' + City + '</td>';
                        if (CandidateCount == 0)
                            pageDetails += '<td class="even_row cndEnrolled"><a style="cursor: default; color:grey" id="aCandidateCount' + txt_date + '">' + CandidateCount + '</a></td>';

                        else
                            pageDetails += '<td class="even_row cndEnrolled"><a id="aCandidateCount' + txt_date + '"onclick="OpenDrillDown(' + "'" + TrainingID + "'" + ',' + "'" + TrainingDate + "'" + ',' + "'" + FromTime + "'" + ',' + "'" + ToTime + "'" + ',' + "'" + TrainingName + "'" + ',' + 1 + ',' + startIndex + ',' + pageNo + ');">' + CandidateCount + '</a></td>';
                        pageDetails += '<td class="even_row"> <a  id="a_Modify' + txt_date + '"onclick="EnableRowsToEdit(' + txt_date + ',' + ModifyId + ',' + TrainingID + ')";>Modify</a><a id="a_Update' + txt_date + '"style="display: none;" onclick="EnableRowsToEdit(' + txt_date + ',' + UpdateId + ',' + TrainingID + ');">Update</a> <a id="a_Cancel' + txt_date + '" style="display: none;" onclick="EnableRowsToEdit(' + txt_date + ',' + CancelId + ',' + TrainingID + ');">Cancel</a></td>';
                        pageDetails += '<td class="even_row"> <a id="a_Delete' + txt_date + '"onclick="EnableRowsToEdit(' + txt_date + ',' + DeleteId + ',' + TrainingID + ');">Delete</a></td>';

                        if (IsBlocked == 1) {
                            pageDetails += '<td class="even_row"> <a id="a_UnBlock' + txt_date + '"onclick="EnableRowsToEdit(' + txt_date + ',' + UnBlockDate + ',' + TrainingID + ');">UnBlock</a></td>';

                        }
                        else {
                            pageDetails += '<td class="even_row"> <a id="a_Block' + txt_date + '"onclick="EnableRowsToEdit(' + txt_date + ',' + BlockDate + ',' + TrainingID + ');">Block the date</a></td>';

                        }

                        pageDetails += '</tr>';

                    });
                    pageDetails += '</table>';

                    resultdata = msg.d[1].Value;
                    pageDetails += resultdata;

                    document.getElementById("gridDiv").innerHTML = "";
                    document.getElementById("NHOMain").innerHTML = "";
                    $("#NHOMain").html(pageDetails);

                    //   $('#NHOMain').append(pageDetails);


                }

            },


            error: function (xhr) { alert('error'); }

        });

    }

    $("#aCandidateCount").click(function () {
        OpenDrillDown(TrainingID, TrainingDate, FromTime, ToTime, TrainingName, 1, startIndex, pageNo)
    });
    function PaginationDashboard(startIndex, pageNo) {
        GetInductionInfo(startIndex, pageNo);

    }
    function OpenDrillDown(TrainingId, TrainingDate, FromTime, ToTime, TrainingName, IsFirstTime, startIndex, pageNo) {
        var pageDetails = '';
      
        var datastring = "{";
        datastring += "'trainingId':" + TrainingId + ",";
        datastring += "'countryId':" + $("#countrySelectBox").val();
        datastring += "}";
       
        var increment = 0;
        var RegisteredDate, AssociateId, AssociateName,RegisteredCount,CandidateId,BU,Grade;
        var ModifyId = 0;
        var UpdateId = 1,AttendanceStatus=0, AttendanceStatusDay2=0;//YS20130812
        var DeleteId = 2; var CancelId = 3; var TrainingDate;
        var TrainingDropDwonData; var popupStatus = 0;
        var Score, CountryId = $("#countrySelectBox").val();//YS20130812

        if (IsFirstTime == 0) {
            popupStatus = 1;
           
        }

        $.ajax({
            type: "POST",
            url: "IMDashBoard.aspx/FetchTrainingDrillDownData",
            data: datastring,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                //   document.getElementById("nho_pop").innerHTML = "";
                pageDetails += '<div id="nho_pop"><div id="enroll_candidate"><p class="font16px boldtext blue_text paddingTB10 paddingL10 fleft width100p">';
                pageDetails += '<img class="closeBtn" src="../../Images/closebtn.png" alt="Close" title="Close" class="fright marginR20" onclick="disablePopup(' + startIndex + ',' + pageNo + ')"/>Enrolled Candidates</p>';
                // TrainingDate=

                if (msg.d[0].Value == "") {
                    document.getElementById("nho_pop").innerHTML = "";
                    pageDetails += msg.d[1].Value
                    $('#nho_pop').append(pageDetails);
                    popupStatus = 1;
                }


                else {
                    //    document.getElementById("nho_pop").innerHTML
                    $.ajax({
                        type: "POST",
                        url: "IMDashBoard.aspx/BindTrainingName",
                        // data: "{"country":" + $("#countrySelectBox").val()+'}",
                        //  data:"{"'country':" + $("#countrySelectBox").val()'}",
                        data: '{countryId:' + $("#countrySelectBox").val() + '}',
                        contentType: "application/json; charset=utf-8",

                        dataType: "json",
                        async: false,
                        success: function (msg1) {

                            TrainingDropDwonData = msg1;



                        },
                        error: function () {
                            alert("Failed to load Training Name");
                        }

                    });
                    pgDom = OBParseXML(msg.d[0].Value);

                    pageDetails += '<div class="divDrillDownMail"><span class="fleft width165 marginL20 color71 font12px paddingT20B10">Induction Name :</span><span class="fleft width165 marginL20 color71 font12px paddingT20B10">' + TrainingName + '</span>';
                    pageDetails += '<span class="fleft width165 marginL20 color71 font12px paddingT20B10">Induction Date :</span><span class="fleft width165 marginL20 color71 font12px paddingT20B10">' + TrainingDate + '</span><div class="clear"></div></div>';
                    if ((CountryId == 4) ||(CountryId == 104)) {
                        //pageDetails += '<div class="fleft marginB10" id="Day1Div"><span class="fleft width165 marginL20 color71 font12px">Day1 - Start Time :</span><span class="fleft width165 marginL20 color71 font12px">' + FromTime + '</span><span class="fleft width165 marginL20 color71 font12px">Day1 - End Time:</span><span class="fleft width165 marginL20 color71 font12px">' + FromTime + '</span><span class="fleft width165 marginL20 color71 font12px"></span></br></br></div>'
                        //pageDetails += '<div class="fleft marginB30" id="Day2Div"><span class="fleft width165 marginL20 color71 font12px">Day2 - Start Time :</span><span class="fleft width165 marginL20 color71 font12px">' + ToTime + '</span><span class="fleft width165 marginL20 color71 font12px">Day2 - End Time:</span><span class="fleft width165 marginL20 color71 font12px">' + ToTime + '</span><div class="clear"></div></div><div class="clear"></div>'
                        pageDetails += '<div class="fleft marginB10" id="Day1Div"><span class="fleft width165 marginL20 color71 font12px">Day1 - Time :</span><span class="fleft width165 marginL20 color71 font12px">' + FromTime + '</span></br></div>'
                        pageDetails += '<div class="fleft marginB30" id="Day2Div"><span class="fleft width165 marginL20 color71 font12px">Day2 - Time :</span><span class="fleft width165 marginL20 color71 font12px">' + ToTime + '</span><div class="clear"></div></div><div class="clear"></div>'

                    }
                    else {
                        pageDetails += '<div class="fleft marginB30"><span class="fleft width165 marginL20 color71 font12px">Start Time :</span><span class="fleft width165 marginL20 color71 font12px">' + FromTime + '</span><span class="fleft width165 marginL20 color71 font12px">End Time:</span><span class="fleft width165 marginL20 color71 font12px">' + ToTime + '</span><div class="clear"></div></div><div class="clear"></div>'


                    }
                    if ((CountryId == 4) ||(CountryId == 104)) {
                        pageDetails += '<div class="fleft marginB30"> <label id="note"  style="color:#3f678f;width:70%;font-size:1.6em;"  >Mails will be triggerd only if the AssociateID is generated</label>'
                        pageDetails += '<span class="marginL60 color71 font14px paddingT20B10">Designation : </span><span class="marginL20 color71 font12px paddingT20B10">'
                        pageDetails += '<select class="height20 tb_rc"  id="DesignationFilter" "style="width:93%" onchange="FilterByDesignation();"><option value="-1" id="-1">Select All</option><option value="2" id="2">SM Above</option><option value="1" id="1">M Below</option></select>'

                    }
                    else {
                        pageDetails += '<div class="fleft marginB30"> <label id="note"  style="color:#3f678f;width:70%;font-size:1.6em;"  >Mails will be triggerd only if the AssociateID is generated</label>'

                    }
                    pageDetails += '<br/><br/><th class="borderBnon" style="width:2%"> <th class="task_t"><span class="fleft color71 font12px">CC ID</span></th> <input type="text" runat="server" class="tb_rc1" id="CC_ID"></th><br/> <label id="note"  style="color:#3f678f;width:70%;font-size:1.6em;"  >Please Enter the IDs followed by ";" </label></div>';

                    if ((CountryId == 4) ||(CountryId == 104)) {
                        //pageDetails += '<table class="margin0A marginB30 tblDrillDown"> <tr class="font12px blue_text boldtext"><th class="borderBnon dayborder" style="width:5%;"><lable id="lblDay1">Day1</lable>&emsp;<lable id="lblCDay2">Day2</lable></br><input type="checkbox" onclick="checkall(chckHead);" id ="chckHead"/>&emsp;<input type="checkbox" onclick="checkallDay2(chckHeadDay2);" id ="chckHeadDay2"/></th><th class="borderBnone ">Candidate ID</th><th class="borderBnone ">Associate ID</th><th class="borderBnone ">Name</th> <th class="borderBnone " style="width:20%">InductionDates</th> <th class="status_t">Grade</th>   <th class="status_t">BU</th> <th class="borderBnone ">Registeration Date</th><th class="borderBnone">Attendance Status</br><lable id="AttenDay1">Day1</lable>&nbsp;<lable id="AttenDay2">Day2</lable></th><th class="borderBnone ">Modify</th>';
                        pageDetails += '<table class="margin0A marginB30 tblDrillDown"> <tr class="font12px blue_text boldtext"><th class="borderBnon dayborder" style="width:5%;"><lable id="lblDay1">Day1</lable></br><input type="checkbox" onclick="checkall(chckHead);" id ="chckHead"/></th><th class="borderBnon dayborder" style="width:5%;"><lable id="lblCDay2">Day2</lable><br/>&nbsp;<input type="checkbox" onclick="checkallDay2(chckHeadDay2);" id ="chckHeadDay2"/></th><th class="borderBnone ">Candidate ID</th><th class="borderBnone ">Associate ID</th><th class="borderBnone ">Name</th> <th class="borderBnone " style="width:20%">InductionDates</th> <th class="status_t">Grade</th>   <th class="status_t">BU</th> <th class="borderBnone ">Registeration Date</th><th class="borderBnone">Attendance Status - <lable id="AttenDay1">Day1</lable>&nbsp;</th><th class="borderBnone">Attendance Status - <lable id="AttenDay2">Day2</lable></th><th class="borderBnone ">Modify</th>';

                    }
                    else {
                        pageDetails += '<table class="margin0A marginB30 tblDrillDown"> <tr class="font12px blue_text boldtext"><th class="borderBnon" style="width:2%;"><input type="checkbox" onclick="checkall(chckHead);"id ="chckHead"/></th><th class="borderBnone ">Candidate ID</th><th class="borderBnone ">Associate ID</th><th class="borderBnone ">Name</th> <th class="borderBnone " style="width:20%">InductionDates</th> <th class="status_t">Grade</th>   <th class="status_t">BU</th> <th class="borderBnone ">Registeration Date</th><th class="borderBnone ">Attendance Status</th><th class="borderBnone ">Modify</th>';
                    }


                    $(pgDom).find('ArrayOfCandidateTrainingDC').find('CandidateTrainingDC').each(function () {
                        AssociateId = $(this).find('AssociateId').text();
                        AssociateName = $(this).find('AssociateName').text();
                        RegisteredDate = $(this).find('RegisteredDate').text();
                        TrainingID = $(this).find('TrainingId').text();
                        RegisteredCount = $(this).find('RegisterationCount').text();
                        CandidateId = $(this).find('CandidateId').text();
                        AttendanceStatus = $(this).find('AttendanceStatus').text();
                        Score = $(this).find('Score').text();
                        if ((CountryId == 4)||(CountryId == 104)) {
                            if (Score <= 45) {
                                AttendanceStatusDay2 = $(this).find('AttendanceStatusDay2').text();
                            }
                            else {
                                AttendanceStatusDay2 = 'NA';
                            }
                        }
                        BU = $(this).find('BU').text();
                        Grade = $(this).find('Grade').text();
                        increment++;
                        //                        if (AttendanceStatus == 1) {
                        //                            pageDetails += '<tr disabled=true class="font12px color71 trDrillDown">';
                        //                            pageDetails += '<td class="paddingLR10 enrollCndChk"  ><input type="checkbox" class = "chcktbl"  /></td>';
                        //                            pageDetails += '<td class="paddingLR10" id="AssociateID">' + CandidateId + '</td>';
                        //                            pageDetails += '<td class="paddingLR10" id="CandidateId">' + AssociateId + '</td>';
                        //                            pageDetails += '<td class="paddingLR10">' + AssociateName + '</td>';

                        //                            pageDetails += '<input type="text" class="txtAssociateId"   style="display: none" value=' + AssociateId + '/>';
                        //                            pageDetails += '<td class="paddingLR10" id=' + increment + '>';
                        //                            pageDetails += '<span id="candspan' + increment + '"class="labelValue">' + TrainingDate + '</span>';

                        //                            pageDetails += '<select class="height20 tb_rc"  id="selectTrainingDates' + increment + '"style="width:93%;display:none;">'
                        //                            $.each(TrainingDropDwonData.d, function (index, item) {
                        //                                //  $("#selectTrainingDates" + increment).get(0).options[$("#selectTrainingDates" + increment).get(0).options.length] = new Option(item.Description, item.ID);
                        //                                pageDetails += '<option value=' + item.ID + '>' + item.Description + '</option>';
                        //                                // $("#selectTrainingDates" + increment).get(0).options[$("#selectTrainingDates" + increment).get(0).options.length] = new Option(item.Description, item.ID);
                        //                            });
                        //                            pageDetails += '</select></td>';

                        //                            pageDetails += '<td class="paddingLR10">' + Grade + '</td>';
                        //                            pageDetails += '<td class="paddingLR10">' + BU + '</td>';
                        //                            pageDetails += '<td class="paddingLR10">' + RegisteredDate + '</td>';
                        //                            pageDetails += '<td  class="paddingLR10 attendancestatus" style="width:20%">' + AttendanceStatus + '</td>';
                        //                            pageDetails += '<td ></td>';

                        //                            pageDetails += '</tr>';
                        //                           // document.getElementById("selectTrainingDates" + increment).style.display = 'none';
                        //                        }
                        //                        else {
                        pageDetails += '<tr class="font12px color71 trDrillDown">';
                        pageDetails += '<td class="paddingLR10 enrollCndChk"  ><input type="checkbox" class = "chcktbl" id="ChkbxDay1"  value="1"/>&emsp;'
                        if ((CountryId == 4)||(CountryId == 104)) {
                            if (Score <= 45) {
                                pageDetails += '</td><td><input type="checkbox" class = "chcktblDay2" id="ChkbxDay2"  value="2"/></td>';
                            }
                            else {
                                pageDetails += '</td><td>NA</td>';
                            }
                        }
                        else {
                            pageDetails += '</td>';
                        }
                        pageDetails += '<td class="paddingLR10"  id="AssociateID">' + CandidateId + '';
                        pageDetails += '<input type="text" class="trgCandidateId"   style="display: none" value=' + CandidateId + '/></td>';
                        pageDetails += '<td class="paddingLR10" id="CandidateId">' + AssociateId + '';
                        pageDetails += '<input type="text" class="txtAssociateId"   style="display: none" value=' + AssociateId + '/></td>';
                        pageDetails += '<td class="paddingLR10">' + AssociateName + '</td>';
                        
                        pageDetails += '<td class="paddingLR10" id=' + increment + '>';
                        pageDetails += '<span id="candspan' + increment + '"class="labelValue">' + TrainingDate + '</span>';

                        pageDetails += '<select class="height20 tb_rc"  id="selectTrainingDates' + increment + '"style="width:93%;display:none;">'
                        $.each(TrainingDropDwonData.d, function (index, item) {
                            //  $("#selectTrainingDates" + increment).get(0).options[$("#selectTrainingDates" + increment).get(0).options.length] = new Option(item.Description, item.ID);
                            pageDetails += '<option value=' + item.ID + '>' + item.Description + '</option>';
                            // $("#selectTrainingDates" + increment).get(0).options[$("#selectTrainingDates" + increment).get(0).options.length] = new Option(item.Description, item.ID);
                        });
                        pageDetails += '</select></td>';

                        pageDetails += '<td class="paddingLR10">' + Grade + '</td>';
                        pageDetails += '<td class="paddingLR10">' + BU + '</td>';
                        if ((CountryId == 4)||(CountryId == 104)) {
                            if (Score > 45) {
                                pageDetails += '<td class="paddingLR10 scoreMbasedHide" style="display:none">' + Score + '</td>';

                            }
                            else {
                                pageDetails += '<td class="paddingLR10 scoreSMbasedHide" style="display:none">' + Score + '</td>';
                            }
                        }
                        pageDetails += '<td class="paddingLR10">' + RegisteredDate + '</td>';
                        //                        if (CountryId == 4) {
                        //                            if (Score < 45) {
                        //                                pageDetails += '<td  class="paddingLR10 attendancestatus" style="width:20%">' + ' &nbsp;&nbsp;' + AttendanceStatus + '&emsp;&nbsp;&nbsp;' + AttendanceStatusDay2 + '</td>';
                        //                            }
                        //                            else {
                        //                                pageDetails += '<td  class="paddingLR10 attendancestatus" style="width:20%">' + AttendanceStatus + '&emsp;&nbsp;' + '</td>';
                        //                            }
                        //                        }
                        //                        else {
                        //                            pageDetails += '<td  class="paddingLR10 attendancestatus" style="width:20%">' + AttendanceStatus + '</td>';
                        //                        }

                        pageDetails += '<td  class="paddingLR10 attendancestatus" style="width:20%">' + AttendanceStatus + '</td>';

                        if ((CountryId == 4) ||(CountryId == 104)){
                            if (Score <= 45) {
                                pageDetails += '<td  class="paddingLR10 attendancestatus" style="width:20%">' + AttendanceStatusDay2 + '</td>';
                            }
                            else {
                                pageDetails += '<td  class="paddingLR10 attendancestatus" style="width:20%">NA </td>';
                            }
                        }
                        //                        else {
                        //                            pageDetails += '<td  class="paddingLR10 attendancestatus" style="width:20%">' + AttendanceStatus + '</td>';
                        //                        }

                        pageDetails += '<td > <a  id="canda_Modify' + increment + '"onclick="ModifyCandidateDates(' + startIndex + ',' + pageNo + ',' + increment + ',' + AssociateId + ',' + ModifyId + ',' + TrainingID + ',' + CandidateId + ',' + '\'' + TrainingName + '\'' + ',' + '\'' + TrainingDate + '\'' + ',' + '\'' + FromTime + '\'' + ',' + '\'' + ToTime + '\'' + ')";>Modify</a><a id="canda_Update' + increment + '"style="display: none;" onclick="ModifyCandidateDates(' + startIndex + ',' + pageNo + ',' + increment + ',' + AssociateId + ',' + UpdateId + ',' + TrainingID + ',' + CandidateId + ',' + '\'' + TrainingName + '\'' + ',' + '\'' + TrainingDate + '\'' + ',' + '\'' + FromTime + '\'' + ',' + '\'' + ToTime + '\'' + ');">Update</a> <a id="canda_Cancel' + increment + '" style="display: none;" onclick="ModifyCandidateDates(' + startIndex + ',' + pageNo + ',' + increment + ',' + AssociateId + ',' + CancelId + ',' + TrainingID + ',' + CandidateId + ',' + '\'' + TrainingName + '\'' + ',' + '\'' + TrainingDate + '\'' + ',' + '\'' + FromTime + '\'' + ',' + '\'' + ToTime + '\'' + ');">Cancel</a></td>';

                        pageDetails += '</tr>';
                        //document.getElementById("selectTrainingDates" + increment).style.display = 'none';
                        //   }


                    });



                    pageDetails += '<tr><td style="border:none;"> <input id="sendMailBtn" type="button" value="Send Mail" onclick="SendMail(' + startIndex + ',' + pageNo + ',' + TrainingId + ',\'' + TrainingDate + '\',\'' + FromTime + '\',\'' + ToTime + '\',\'' + TrainingName + '\'' + ');"> </td></tr>'
                    pageDetails += '</table></div>';

                    //                    if (document.getElementById("nho_pop").innerHTML != "") {
                    //                        popupStatus = 1;
                    //                    }
                    //  document.getElementById("nho_pop").innerHTML = "";
                    // $("#nho_pop").html(pageDetails);
                    // $('#nho_pop').append(pageDetails);
                }

                loadWindow(popupStatus, pageDetails);
                // $('#DrillDown').append(pageDetails);

                pageDetails += '</div></div>';

            },
            error: function (xhr) { alert('error'); }
        });
    }

    $("#SendMailbtn").click(function(){
    SendMail(startIndex ,pageNo ,TrainingDate ,FromTime ,ToTime ,TrainingName)
    });
    function FilterByDesignation() {        
            
            var Value = $("#DesignationFilter").val();
            if (Value == 1) {
                //document.getElementById("lblCDay2").style.display = 'none';
//                $('#lblDay1').display = none;
                $('#lblCDay2').hide();
                $('#chckHeadDay2').hide();
                $('#AttenDay2').hide();
                $('#AttenDay1').hide();
                $('#Day2Div').hide();
                $('.scoreSMbasedHide').parent().hide();
                $('.scoreMbasedHide').parent().show();
            }
            else if (Value == 2) {
                //document.getElementById("lblCDay2").style.display = 'block';
                $('#lblCDay2').show();
                $('#chckHeadDay2').show();
                $('#Day2Div').show();
                $('#AttenDay2').show();
                $('#AttenDay1').show();
                $('.scoreMbasedHide').parent().hide();
                $('.scoreSMbasedHide').parent().show();
            }
            else {
//                document.getElementById("lblCDay2").style.display = 'block';
                $('#lblCDay2').show();
                $('#chckHeadDay2').show();
                $('#Day2Div').show();
                $('#AttenDay2').show();
                $('#AttenDay1').show();
                $('.scoreMbasedHide').parent().show();
                $('.scoreSMbasedHide').parent().show();
            }      

    }
    
    function checkall(chckHead) {
        var AttendanceStatus;
        
        if (chckHead.checked == false) {
            
            $('.chcktbl:checked').attr('checked', false);
        }
        else {
            
            $('.chcktbl:not(:checked)').attr('checked', true);

        }
        $(".tblDrillDown").find(".trDrillDown").each(function () {
            divReferenc = $(this).parent();
            AttendanceStatus = $(this).find('.attendancestatus').text();
           // if (AttendanceStatus == 1) {
                // $('#Pg_1_check_chkClientEquipment').removeAttr('checked')
                //  $(".tblDrillDown").find(".trDrillDown").find('.chcktbl').removeAttr('checked');
                // $(".tblDrillDown").find(".trDrillDown").find('.chcktbl:checked').attr('checked', false);
                // divReferenc.$('.chcktbl:checked').attr('checked', false);
              //  $(this).find(".chcktbl").removeAttr('checked');
           // }
        });
    }
    function checkallDay2(chckHeadDay2) {
        var AttendanceStatusDay2;
       
        if (chckHeadDay2.checked == false) {
            
            $('.chcktblDay2:checked').attr('checked', false);
        }
        else {
            
            $('.chcktblDay2:not(:checked)').attr('checked', true);

        }
        $(".tblDrillDown").find(".trDrillDown").each(function () {
            divReferenc = $(this).parent();
            AttendanceStatusDay2 = $(this).find('.attendancestatusDay2').text();
        });
    }
    function ModifyCandidateDates(startIndex, pageNo,increment, CandidateID, Mode, TrainingID, AssociateId, TrainingName, TrainingDate, FromTime, ToTime) {
        var DateToUpdate,TrainingIDToUpdate;
        /* Modify Mode */
        if (Mode == 0) {

            document.getElementById("candspan" + increment).style.display = 'none';
            document.getElementById("selectTrainingDates" + increment).style.display = 'block';
    
            document.getElementById("canda_Modify" + increment).style.display = 'none';
            
            document.getElementById("canda_Update" + increment).style.display = 'block';
          
            document.getElementById("canda_Cancel" + increment).style.display = 'block';
          

        }
        /* Update Mode */
        else if (Mode == 1) {


            document.getElementById("candspan" + increment).style.display = 'block';
            document.getElementById("selectTrainingDates" + increment).style.display = 'none';

            document.getElementById("canda_Modify" + increment).style.display = 'block';
            document.getElementById("canda_Update" + increment).style.display = 'none';
            document.getElementById("canda_Cancel" + increment).style.display = 'none';
            TrainingIDToUpdate = document.getElementById("selectTrainingDates" + increment).value;
//            DateToUpdate = document.getElementById("selectTrainingDates" + increment)[increment - 1].text;
            DateToUpdate = document.getElementById("selectTrainingDates" + increment).options[document.getElementById("selectTrainingDates" + increment).selectedIndex].text;
            document.getElementById("candspan" + increment).innerText = DateToUpdate;
            UpdateCandidateDate(TrainingID, CandidateID, DateToUpdate, Mode, AssociateId, increment, TrainingName,TrainingIDToUpdate,TrainingDate,FromTime,ToTime,startIndex,pageNo);

        }
        /* Delete Mode */
        else if (Mode == 2) {
            DateToUpdate = document.getElementById("candspan" + increment).innerText;
            var conf = confirm("Are You sure to Delete?");
            if (conf == true) {
                UpdateCandidateDate(TrainingID, CandidateID, DateToUpdate, Mode, AssociateId, increment, TrainingName, TrainingIDToUpdate, TrainingDate, FromTime, ToTime, startIndex, pageNo);
            }
        }
        /* Cancel Mode */
        else if (Mode == 3) {
            document.getElementById("candspan" + increment).style.display = 'block';
            document.getElementById("selectTrainingDates" + increment).style.display = 'none';
            document.getElementById("candspan" + increment).innerText = document.getElementById("candspan" + increment).innerText;
            document.getElementById("canda_Modify" + increment).style.display = 'block';
            document.getElementById("canda_Update" + increment).style.display = 'none';
            document.getElementById("canda_Cancel" + increment).style.display = 'none';
        }
    }
    function SendMail( startIndex ,pageNo, TrainingID, TrainingDate, FromTime, ToTime, TrainingName) {
        if (($(".tblDrillDown").find(".trDrillDown").find(".chcktbl").is(':checked'))|| $(".tblDrillDown").find(".trDrillDown").find(".chcktblDay2").is(':checked')) {
            var CCid = $('#CC_ID').val();
            var CheckedItem;
            var divReferenc;
            var CandIdToSendMail = "";
            var IdToSendMail = 0; ;
            var IdToSendMailSMAbv = 0;
            var AssociateId;
            var CandidateIdlist;
            var candidateId;
            var candidateIds;
            var candidateIdsSMAbv;
            var CandIdToSendMailSMAbv="";
            var Day1Flag = 0;
            var Day2Flag = 0;
            var loopDay;
            var country = $("#countrySelectBox").val();
            $(".tblDrillDown").find(".trDrillDown").each(function () {

                // divReferenc = $(this).parent();
                CandidateIdlist = $(this).find('.trgCandidateId').val();
                AssociateId = $(this).find('.txtAssociateId').val();

                //  $(this).find(".chcktbl").each(function () {

                CheckedItem = $(this).parent()
                if (($(this).find(".chcktbl").is(':checked') == true)) {
                    //   if (CheckedItem.context.checked == true) {

                    
                    if (CandIdToSendMail == "") {
                        CandIdToSendMail = CandidateIdlist.replace("/", "");
//                        CandIdToSendMail = CandidateIdlist;
                    }

                    if (IdToSendMail != 0) {
                        if (IdToSendMail.indexOf(AssociateId.replace("/", "")) < 0)
                            IdToSendMail = IdToSendMail + ';' + AssociateId;
                    }
                    else {
                        IdToSendMail = AssociateId;
                        Day1Flag = 1;
//                        loopDay = 1;
                    }
                }
                if (($(this).find(".chcktblDay2").is(':checked') == true)) {

                    if (CandIdToSendMailSMAbv == "") {
                        CandIdToSendMailSMAbv = CandidateIdlist.replace('/', '');
//                        CandIdToSendMailSMAbv = CandidateIdlist;
                    }

                    if (IdToSendMailSMAbv != 0) {
                        if (IdToSendMailSMAbv.indexOf(AssociateId.replace('/', '')) < 0)
                            IdToSendMailSMAbv = IdToSendMailSMAbv + ';' + AssociateId;
                    }
                    else {
                        IdToSendMailSMAbv = AssociateId;
                        Day2Flag = 1;
//                        loopDay = 2;
                    }
                }

                // });
            });
            // document.getElementById(".chcktbl");
        
//            var user = "";
//            for (i = 0; i < IdToSendMail; i++) {
//              var  user = IdToSendMail.replace("/", "");
//                candidateIds = user;
            var sd = [];
            var SmAbv = [];

    if (IdToSendMail != 0) {
    sd = IdToSendMail.split('/');
    var user = "";
    for (i = 0; i < sd.length; i++) {
        user = user + sd[i];
    }
    candidateIds = user;
   
    }

if (IdToSendMailSMAbv != 0) {
    SmAbv = IdToSendMailSMAbv.split('/');
    var userSMAbv = "";
    for (i = 0; i < SmAbv.length; i++) {
        userSMAbv = userSMAbv + SmAbv[i];
    }
    candidateIdsSMAbv = userSMAbv;
    
}
//    user = IdToSendMail[i].replace("/","");


var dataString;
var chkflag;
var loopDay = 1;
while (loopDay <= 2) {

    chkflag = 0;    
    if (loopDay == 1 && Day1Flag==1) {
        dataString = '{notificationMasterId:' + 13 + ',notificationMappingId:' + 0 + ',candidateId:' + CandIdToSendMail + "," + 'candidateIds:' + "'" + candidateIds.toString() + "'" + "," + 'ccids:' + "'" + CCid.toString() + "'" + ',countryID:' + "'" + country + "'" + '}';
         chkflag = 1;
    }
     if (loopDay == 2 && Day2Flag == 1) {
         chkflag = 1;
         dataString = '{notificationMasterId:' + 177 + ',notificationMappingId:' + 0 + ',candidateId:' + CandIdToSendMailSMAbv + "," + 'candidateIds:' + "'" + candidateIdsSMAbv.toString() + "'" + "," + 'ccids:' + "'" + CCid.toString() + "'" + ',countryID:' + "'" + country + "'" + '}';
    }

    if (chkflag==1) {

        $.ajax({
            type: "POST",
            url: "../../FormsService.aspx/SendNotifyMail",
            data: dataString,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                if (msg.d == 1) {
                    var dataString
                    if (loopDay == 1 && Day1Flag == 1) {
                        DayFlag = 1;
                        dataString = '{trainingId:' + TrainingID + "," + 'candidateId:' + 0 + "," + 'candidateIDs:' + "'" + IdToSendMail + "'" + ',countryId:' + "'" + country + "'" + ',mode:3' + ',dayFlag:' + "'" + DayFlag + "'" + '}';
                    }
                    if (loopDay == 2 && Day2Flag == 1) {
                        DayFlag = 2;
                        dataString = '{trainingId:' + TrainingID + "," + 'candidateId:' + 0 + "," + 'candidateIDs:' + "'" + IdToSendMailSMAbv + "'" + ',countryId:' + "'" + country + "'" + ',mode:3' + ',dayFlag:' + "'" + DayFlag + "'" + '}';
                    }
                    $.ajax({
                        type: "POST",
                        url: "IMDashBoard.aspx/UpdateCandidateTrainingDate",
                        data: dataString,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (msg) {
                             OpenDrillDown(TrainingID, TrainingDate, FromTime, ToTime, TrainingName, 0, startIndex, pageNo);  
                            
                        },
                        error: function (xhr) { alert(result.responseText); }
                    });

                    

                }
                else
                // MsgboxAlert(23, 1, 45, "DATA_UPDATE_FAILURE", "Failed to Send Mail");
                // MsgboxAlert(23, 1, 26, "DATA_UPDATE_SUCCESS", "Mail Sent Successfully");
                   
                    alert("Failed to Send Mail");
                //GetInductionInfo();
            },
            error: function (xhr) { alert('error'); }
        });
    }

            loopDay = loopDay + 1;
        }
//        var DesFilterVal;
//        DesFilterVal = $('#DesignationFilter').val();
             
        alert("Mail Sent Successfully");
    }

        else {
            alert("Select atleast one Candidate To Send Mail!");
        }
    }

    function SendInductionDiaryInvite(CandidateID, TrainingID, CountryId, DashBoardMode) {

//        var dataString = "{";
//        dataString += "'CandidateID':" + CandidateID + ",";
//        dataString += "'TrainingId':" + TrainingID + ",";
//        dataString += "'CountryId':" + CountryId + ",";
//        dataString += "'Mode':" + 1 + ",";
//        dataString += "}";

        var dataString = '{candidateId:' + CandidateID + "," + 'trainingId:' + TrainingID + "," + 'countryId:' + CountryId + ',mode:' + DashBoardMode + '}';
        
        $.ajax({
            type: "POST",
            url: "IMDashBoard.aspx/SendInductionDiaryInvite",
            data: dataString,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.d != 0) {

                    alert("Diary Invite Processed Successfully for "+msg.d+" candidates");
                }
                else {
                    alert("Diary Invite Process Failed");
                }

            },
            error: function (xhr) { alert('error'); }
        });
    }

    


    function UpdateCandidateDate(TrainingID, CandidateID, DateToUpdate, Mode, AssociateId, increment, TrainingName, TrainingIDToUpdate, TrainingDate, FromTime, ToTime, startIndex, pageNo) {

        var dataString = '{trainingId:' + TrainingIDToUpdate + "," + 'candidateId:' + AssociateId + "," + 'candidateIDs:' + 0 + "," + 'countryId:' + $("#countrySelectBox").val() + "," + 'mode:1' + ',dayFlag:0' + '}';
        var CountryId = $("#countrySelectBox").val();
        var DashBoardMode = 1;
        $.ajax({
            type: "POST",
            url: "IMDashBoard.aspx/UpdateCandidateTrainingDate",
            data: dataString,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.d == 1) {
                    if (TrainingID != TrainingIDToUpdate) {

                        if (Mode == 1) {

                            //inputparam = '{NotificationMasterId:' + 23 + ',NotificationMappingId:' + 26 + ',candidateId:' + candidateId.toString() + ',countryID:' + "'" + $("#countrySelectBox").val() + "'" + '}';
                            SendInductionDateChange(AssociateId);
                            // $.MailSend(inputparam);
                        }
                        else if (Mode == 2) {

                            inputparam = '{NotificationMasterId:' + 26 + ',NotificationMappingId:' + 0 + ',candidateId:' + AssociateId.toString() + ',countryID:' + "'" + $("#countrySelectBox").val() + "'" + '}';
                            $.MailSend(inputparam);
                        }

                        //  SendInductionDateChange(AssociateId);
                    }
                    OpenDrillDown(TrainingID, TrainingDate, FromTime, ToTime, TrainingName, 0, startIndex, pageNo);
                    document.getElementById("candspan" + increment).innerText = DateToUpdate;

                    if ((CountryId == 4) ||(CountryId == 104)){
                        SendInductionDiaryInvite(AssociateId, TrainingIDToUpdate, CountryId, DashBoardMode);
                    }

                    alert("Data Updated Successfully");
                }
                else

                    alert("Data Updation Failed");

            },
            error: function (xhr) { alert('error'); }
        });
    }

    function UpdateDateFromDrillDown(TrainingID, Mode, AssociateId) {
        var dataString = '{trainingId:' + TrainingID + "," + 'candidateId:' + AssociateId + "," + 'candidateIDs:' + 0 + "," + 'countryId:' + $("#countrySelectBox").val() + "," + 'mode:1' + "," + 'dayFlag:0' + '}';
        var DashBoardMode = 1;
        var CountryId = $("#countrySelectBox").val();
               
       // var dataString = '{TrainingId:' + TrainingID + "," + 'candidateId:' + AssociateId + "," + 'CountryId:' + $("#countrySelectBox").val() + ","+ 'Mode:1' + '}';
        if (TrainingID == -1) {
            alert("Please select the Training Date!");
        }
        else {
            $.ajax({
                type: "POST",
                url: "IMDashBoard.aspx/UpdateCandidateTrainingDate",
                data: dataString,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {                    
                    if (msg.d == 1) {
                        SendInductionDateChange(AssociateId);
                        if ((CountryId == 4)||(CountryId == 104))
                         {
                             SendInductionDiaryInvite(AssociateId, TrainingID, CountryId, DashBoardMode);                             
                        }                        
                        alert("Data Updated Successfully");                        
                    }
                    else
                        alert("Data Updation Failed");
                    //GetInductionInfo(); 
                    $('#remove_bt').show();                   
                },
                error: function (xhr) { alert('error'); }
            });
        }
    }

    function RemoveFromInd(TrainingID, Mode, AssociateId) {
        var dataString = '{trainingId:0' + "," + 'candidateId:' + AssociateId + "," + 'candidateIDs:' + 0 + "," + 'countryId:' + $("#countrySelectBox").val() + "," + 'mode:4' + "," + 'dayFlag:0' + '}';
        var DashBoardMode = 1;
        var CountryId = $("#countrySelectBox").val();

        $.ajax({
            type: "POST",
            url: "IMDashBoard.aspx/UpdateCandidateTrainingDate",
            data: dataString,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {                
                if (msg.d == 1) {
                    alert("Unregistered Successfully");
                    if ((CountryId == 4) || (CountryId == 104)) {
                        SendInductionDiaryInvite(AssociateId, -1, CountryId, DashBoardMode);
                    }  
                    $('#remove_bt').hide();
                    $('#status').val('-1');
                }                 
                else
                    alert("Unregister Failed");                
            },
            error: function (xhr) { alert('error'); }
        });        
    }

    function SendInductionDateChange(AssociateId) {
        var MaildataString = '{notificationMasterId:' + 15 + ',countryID:' + $("#countrySelectBox").val() + ',candidateID:' + "'" + AssociateId + "'" + '}';
        $.ajax({
            type: "POST",
            url: "IMDashBoard.aspx/SendInductionDateChange",
            data: MaildataString,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            },
            error: function (xhr) { alert('error'); }
        });
    }
    function loadWindow(popupStatus, pageDetails) {
//	var popupStatus = 0;
        //loads popup only if it is disabled
        //  $('<div class="popupContactwrapper3"/>').html(pageDetails);
        $('.chcktbl:checked').attr('checked', false);
        $('.chcktblDay2:checked').attr('checked', false);
        document.getElementById("nho_pop").innerHTML = pageDetails;
	if(popupStatus==0){
		
		var $backgroundOverLay = $('<div id="overLay"/>');
		$("body").prepend($backgroundOverLay);
		
		$("#overLay").css({
			"opacity": "0.7"
		});
		$("#overLay").show();
		
		//Close box
		/*var closeBox =  '<table width="100%" border="0" cellspacing="0" cellpadding="0">';
			closeBox += '</table>';*/
			var closeBox = '';
		//Iframe Box
		// if(x==4)
		//	{
			//        var $popupContent = $('#nho_pop').html();
			var $popupContent = pageDetails;
		var $popupData = $('<div class="popupContactwrapper3"/>').html($popupContent).prepend(closeBox);
		//}
		//Popup div Creation 
		//var $popupData = $('<div class="popupContactwrapper"/>').html($popupContent).prepend(closeBox);
		

		$("body").prepend($popupData);
		$('.resource_content img').hide();
	

		$(".popupContactwrapper3").show();
		//$('#nho_pop').show();
		popupStatus = 1;
		
	}
	centerPopup();
	
}
function centerPopup(){
	//request data for centering
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var windowWidth1 = '100%';
	var windowHeight1 = '100%';
	var popupHeight = $(".popupContactwrapper3").height();
	var popupWidth = $(".popupContactwrapper3").width();
	var CountryId = $("#countrySelectBox").val();

	if ((CountryId == 4) || (CountryId == 104)){
	    $(".popupContactwrapper3").css({
	        "position": "absolute",
	        "top": '12%',
	        "left": '0%',
	        "width": '1180px',
	        "margin-left": '15px'
	    });
	}
	else {
	    $(".popupContactwrapper3").css({
	        "position": "absolute",
	        "top": '12%',
	        "left": '0%',
	        "width": '930px',
	        "margin-left": '15px'
	    });
	}
}
function disablePopup(startIndex, pageNo) {
    document.getElementById("nho_pop").innerHTML = "";
    $("#overLay").remove();
    $(".popupContactwrapper").remove();
    $(".popupContactwrapper1").remove();
    $(".popupContactwrapper2").remove();
    $(".popupContactwrapper3").remove();
    GetInductionInfo(startIndex, pageNo);
    popupStatus = 0;

}
function EnableRowsToEdit(txt_date, Mode, TrainingID) {
    var DateToUpdate;
    /* Modify Mode */
    if (Mode == 0) {

        document.getElementById("span" + txt_date).style.display = 'none';
        document.getElementById("textid" + txt_date).style.display = 'block';
        document.getElementById("textid" + txt_date).value = document.getElementById("span" + txt_date).innerHTML;
        document.getElementById("a_Modify" + txt_date).style.display = 'none';
        document.getElementById("a_Update" + txt_date).style.display = 'block';
        document.getElementById("a_Cancel" + txt_date).style.display = 'block';
        document.getElementById("p" + txt_date).style.display = 'block';
        //  $("#textid" + txt_date).datepicker({ dateFormat: 'dd/mm/yy', showOn: "both", buttonImage: "../../Images/calendar.png", buttonImageOnly: true, changeMonth: true, changeYear: true, buttonAfter: false, hideIfNoPrevNext: false, navigationAsDateFormat: true });

        $("#textid" + txt_date).datepicker({ dateFormat: 'dd/mm/yy', showOn: "both", buttonImage: "  ../../Images/calendar.png", buttonImageOnly: true, changeMonth: true, changeYear: true, buttonAfter: false, hideIfNoPrevNext: false, navigationAsDateFormat: true });

    }
    /* Update Mode */
    else if (Mode == 1) {


        document.getElementById("span" + txt_date).style.display = 'block';
        document.getElementById("textid" + txt_date).style.display = 'none';

        document.getElementById("a_Modify" + txt_date).style.display = 'block';
        document.getElementById("a_Update" + txt_date).style.display = 'none';
        document.getElementById("a_Cancel" + txt_date).style.display = 'none';
        document.getElementById("p" + txt_date).style.display = 'none';
        DateToUpdate = document.getElementById("textid" + txt_date).value;
        ;
        Update(TrainingID, DateToUpdate, Mode, txt_date);
        //  $(".editInput").datepicker({ dateFormat: 'm/dd/yy', showOn: "both", buttonImage: "../../Images/calendar.png", buttonImageOnly: false });
    }
    /* Delete Mode */
    else if (Mode == 2) {
        if (document.getElementById("aCandidateCount" + txt_date).innerText == 0) {

            DateToUpdate = document.getElementById("span" + txt_date).innerHTML;
            var conf = confirm("Are You sure to Delete?");
            if (conf == true) {
                Update(TrainingID, DateToUpdate, Mode, txt_date);
            }
        }
        else {
            alert("Training can be deleted only if candidates are not tagged to it!");
        }
    }

    /* Cancel Mode */
    else if (Mode == 3) {
        document.getElementById("span" + txt_date).style.display = 'block';
        document.getElementById("textid" + txt_date).style.display = 'none';
        document.getElementById("span" + txt_date).innerText = document.getElementById("span" + txt_date).innerHTML;
        document.getElementById("a_Modify" + txt_date).style.display = 'block';
        document.getElementById("a_Update" + txt_date).style.display = 'none';
        document.getElementById("a_Cancel" + txt_date).style.display = 'none';
        document.getElementById("p" + txt_date).style.display = 'none';
        //  $(".editInput").datepicker({ dateFormat: 'm/dd/yy', showOn: "both", buttonImage: "../../Images/calendar.png", buttonImageOnly: fals });
    }
    /* Delete Mode */
    else if (Mode == 4) {


        DateToUpdate = document.getElementById("span" + txt_date).innerHTML;
        var conf = confirm("Are You sure to Block Induction Date?");
        if (conf == true) {
            Update(TrainingID, DateToUpdate, Mode, txt_date);
            alert("This date has been blocked now. Candidates will be unable to select this date on the system");
            // document.getElementById("a_Block" + txt_date).style.display = 'none';
            //  document.getElementById("lblBlock" + txt_date).style.display = 'block';

        }
    }
    else if (Mode == 5) {

        DateToUpdate = document.getElementById("span" + txt_date).innerHTML;
        var conf = confirm("Are You sure to UnBlock the Induction Date?");
        if (conf == true) {
            Update(TrainingID, DateToUpdate, Mode, txt_date);
            alert("This date has been unblocked now. Candidates will be able to select this date on the system");

        }
    }

    
   
}

$.MailSend = function (dataString) {
    
    $.ajax({
        type: "POST",
        url: "../../FormsService.aspx/SendMail",
        data: dataString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {

        },
        error: function (xhr) { alert(result.responseText);  }
    });
}
function Update(TrainingID, DateToUpdate, Mode, txt_date) {
    var inputparam; var NotificationId;
    var AssociateId = 0;var CountryId = $("#countrySelectBox").val();  var DashBoardMode = 2;
    var TrainindDataXML = '<NewHireInduction><TrainingId' > +TrainingID + '</TrainingId><TrainingStatus>' + Mode + '</TrainingStatus><RegistrationCount /></NewHireInduction>';
    var dataString = '{trainingId:' + TrainingID + "," + 'countryId:' + $("#countrySelectBox").val() + "," + 'dateToUpdate:' + "'" + DateToUpdate + "'" + "," + 'mode:' + Mode + '}';
    $.ajax({
        type: "POST",
        url: "IMDashBoard.aspx/UpdateNHOTrainingData",
        data: dataString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d == 1) {
                // if ($("#countrySelectBox").val() != 4) {
                /*  if (Mode == 1) {

                inputparam = '{NotificationEventID:' + 27 + ',ToId:""' + ',countryID:' + "'" + $("#countrySelectBox").val() + "'" + "," + 'TrainingID:' + TrainingID + '}';

                $.MailSend(inputparam);
                }*/
                //                else if (Mode == 2) {

                //                   inputparam = '{NotificationEventID:' + 26 + ',ToId:""' + ',countryID:' + "'" + $("#countrySelectBox").val() + "'" + '}';
                //             
                //                        $.MailSend(dataString);
                //                    }
                // }

                GetInductionInfo(4, 1);
                document.getElementById("span" + txt_date).innerText = DateToUpdate;

                if (Mode == 1) {
                    if ((CountryId == 4)||(CountryId == 104)) {
                        SendInductionDiaryInvite(AssociateId, TrainingID, CountryId, DashBoardMode);
                    }
                    alert("Data Updated Successfully");
                }
                else if (Mode == 2)
                    alert("Data Deleted Successfully");
            }
            else
                alert("Data updation failed");
            //GetInductionInfo();
        },
        error: function (xhr) { alert('error'); }
    });
}
    function OBParseXML(data) {
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
    };

 
</script>
</html>
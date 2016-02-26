<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="NSSDashboard.aspx.cs" Inherits="OneC.OnBoarding.WebApp.Roles.NSS.NSSDashBoard" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>NSS Dashboard</title>
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
    <script type="text/javascript" src="../../Scripts/Validations.js"></script>
    <%--<script src="../../Scripts/Forms/FormsValidation.js" type="text/javascript"></script>--%>
    <script type="text/javascript" src="../../Scripts/JQuery/jquery.alerts.js"></script>
    <link href="../../Styles/jquery.alerts.css" rel="stylesheet" type="text/css" media="screen" />
    <script language="javascript" type="text/javascript">
        function disablePopup() {
            //disables popup only if it is enabled
            $("#overLay").hide();
            $(".popupContactwrapper").hide();
        }
        function showupload() {
            //disables popup only if it is enabled
            $("#xlsUpload").show();
            $("#btnUpload").show();
            $("#uploadexcel").show();
        }
        function hideload() {
            //disables popup only if it is enabled
            $("#xlsUpload").hide();
            $("#btnUpload").hide();
            $("#uploadexcel").hide();
        }   


        
    </script>
    <script type="text/javascript" language="javascript">
        function initiateSM() {
            document.getElementById('sm').src = '../../CommonPages/SessionMaintainer.aspx';
        }

    
    </script>
</head>
<body>
 
    <div id="smFrame" style="display: none;">
        <iframe id="sm" frameborder="0" width="0" height="0" runat="server"></iframe>
    </div>
    <form id="Form1" runat="server" dir="ltr">
    <div id="main_rc" style="width:837px;">
        <div class="header_rc">
            <div class="onboarding_rc">
                <p>
                    On Boarding
                </p>
                <img src="../../Images/pie.png" alt="bar chart" />
                <p class="join_rc">
                    <label id="ltlbl">Laptop :</label> <asp:Label ID="lblLaptopCnt" runat="server"></asp:Label>
                    <label id="cplbl">| CellPhone :</label> 
                    <asp:Label ID="lblCellCnt" runat="server">
                    </asp:Label>
                    <label id="bblbl">| Blackberry :</label>
                    <asp:Label ID="lblBBCnt" runat="server">
                    </asp:Label>
                     <label id="dclbl">|DataCard:</label>
                    <asp:Label ID="lblDCCnt" runat="server">
                    </asp:Label>
                </p>
            </div>
            <div class="joining_rc">
                <img src="../../Images/prejoiningb.png" alt="prejoining" title="Pre Joining" id="prejoiningbtn_rc"
                    onclick="Clear();setProcessId(1);" />
                <img src="../../Images/postjoining.png" onclick="Clear();setProcessId(2);" alt="postjoining"
                    title="Post Joining" id="postjoiningbtn_rc" />
            </div>
        </div>
        <div class="icon_rc">
            <ul style="float: right; clear: both">
                <li>
                    <asp:ImageButton runat="server" ImageUrl="../../Images/bookb.png" ID="ExportNssReport"
                        CssClass="ExportExcel" OnClick="ExportNssReport_Click" alt="Audit log" title="Audit log"
                        Height="18px" /></li>
                <li>
                    <asp:ImageButton runat="server" ImageUrl="~/Images/excel.png" ID="ExportImageButton"
                        title="Excel" OnClick="ExportButton_Click" CssClass="ExportExcel" />
                </li>
            </ul>
        </div>
        <div class="search_rc">
            <div class="search_header_rc">
                <p>
                    Search by</p>
            </div>
            <div class="search_content_rc">
                <ul>
                    <li>
                        <label for="timeline">
                            Timeline
                        </label>
                        <select class="tb_rc" id="timelineSelectBox" onchange="CountrySelectedIndexChange()"
                            tabindex="1">
                        </select></li>
                    <li>
                        <label for="status">
                            Status
                        </label>
                        <select class="tb_rc" id="statusSelectBox" tabindex="2">
                        </select></li>
                    <li>
                        <label for="country">
                            Country
                        </label>
                        <select class="tb_rc" id="countrySelectBox" tabindex="3" onchange="CountrySelectedIndexChange()">
                        </select></li>
                </ul>
                <ul>
                    <li>
                        <label for="name">
                            Name
                        </label>
                        <input type="text" class="tb_rc" id="CandidateNameInputBox" tabindex="5" maxlength="250" /></li>
                    <li>
                        <label for="designation">
                            Designation
                        </label>
                        <input type="text" class="tb_rc" id="CandidateDesignationInputBox" tabindex="6" maxlength="250" /></li>
                    <li>
                        <label for="project_id">
                            Project ID
                        </label>
                        <input type="text" class="tb_rc" id="CandidateProjectIdInputBox" 
                            tabindex="7" maxlength="10" /></li>
                    <li>
                        <label for="manager_id">
                            Manager ID
                        </label>
                        <input type="text" class="tb_rc" id="CandidateManagerIdInputBox" 
                            tabindex="8" maxlength="6" /></li>
                </ul>
                <ul>
                    <li>
                        <label for="doj">
                            EDOJ date range</label>
                        <input type="text" runat="server" class="tb_rc1" id="DOJFromInputBox" value="From Date"
                            tabindex="9" />
                    </li>
                    <li id="endDate">
                        <label for="eod_to">
                            <input type="text" class="tb_rc1" id="DOJToInputBox" runat="server" value="To Date"
                                tabindex="10" /></label>
                    </li>
                   
                    <li id="lilblHireType" class="width85">
                        <label id="lblHireType" for="hiretype">
                            Hire Type:</label>
                            <select  class="tb_rc" id="candidateHireTypeSelectBox" tabindex="12">
                            </select>
                        
                    </li>
                </ul>
                <div style="float: left; width: 33%;">
                    <img src="../../Images/apply.png" id="apply_nh" onclick="Javascript:return ValidateApply(0);"
                        alt="apply" title="Apply" />
                    <img src="../../Images/clear.png" id="clear_nh" alt="clear" onclick="Clear()" title="Clear" />
                </div>
                <div id="uploadTemplate">
                <div  style="float: left; width: auto; padding-top: 10px;">
                    <asp:FileUpload class="upload" ID="xlsUpload" runat="server" name="Browse" Width="219px" />
                    <asp:Button ID="btnUpload" Text="Upload file" runat="server"
                        Style="margin-left: 20px;  background: url(../../Images/btn.png); width: 80px;
                        color: #fff;" OnClick="BtnUpload_Click" OnClientClick="javascript:return fnGetFile();" />
                </div>
                <a style="margin-top: 24px; float: right; margin-right: 67px;" id="uploadexcel" href="../../Templates/NSSTemplates/FedExTemplate.xml">
                    Download Template</a>
                    </div>
            </div>
            <div class="footer_rc ">
                <div id="gridDiv" style="width:837px;"  runat="server">
                </div>
            </div>
        </div>
    </div>
    <div id="personalDiv">
    </div>
    <input type="hidden" runat="server" id="hdnStartDate" />
    <input type="hidden" runat="server" id="hdnEndDate" />
    <input type="hidden" runat="server" id="hdnProcessId" />
    <input type="hidden" runat="server" id="hdnSessionId" />
    <input type="hidden" runat="server" id="hdcountryid" />
    <input type="hidden" runat="server" id="hdnPageNo" />
  
    </form>
  
</body>
<script type="text/javascript" language="javascript">
    //this function checkeing uploade file name is valied and with out select uploadfile.
    function fnGetFile() {
        var value = $("#xlsUpload").val();
        if (value != "") {
            var FileExt = document.getElementById('xlsUpload').value.lastIndexOf(".xml")
            if (FileExt == -1) {
                alert("Please upload  a valid file.");
                return false;
            }
            else {
                return true;
            }
        }
        else {
            alert('Please select the file to upload.');
            return false;
        }

    }

    function ValidateApply(gridview) {
        var status = false;

        if (status == DateCompare($('#DOJFromInputBox').val(), $('#DOJToInputBox').val())) {
            MsgboxAlertDashboard(23, 2, 27, "DATE_VALIDATE", "Invalid Date Range!Start Date cannot be after End Date");
            return false;
        }

        FetchCand(1, gridview);
    }

    var OBQueryString = (function (a) { if (a == "") return {}; var b = {}; for (var i = 0; i < a.length; ++i) { var p = a[i].split('='); if (p.length != 2) continue; b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " ")); } return b; })(window.location.search.substr(1).split('&'));
    var sessionId = parseInt(OBQueryString["ssid"]);
    var countryId = parseInt(OBQueryString["cntry"]);
    var roleGroupId = parseInt(OBQueryString["rgid"]);
    var roleId = parseInt(OBQueryString["roleid"]);

    var stDate, endDate;
    $().ready(function () {

        if (roleId == 17) {
            $("#uploadTemplate").remove();
        }
                
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


        $.ajax({
            type: "POST",
            url: "NSSDashBoard.aspx/BindTimeline", data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {

                $.each(msg.d, function (index, item) {
                    $("#timelineSelectBox").get(0).options[$("#timelineSelectBox").get(0).options.length] = new Option(item.TimelineDescription, item.TimelineFilterId);
                });
                this.selectedIndex = 2;
            },
            error: function () {
                //alert("Failed to load Timeline" + xhr.status);
            }
        });

        $.ajax({
            type: "POST",
            url: "NSSDashBoard.aspx/BindCountry",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {

                $.each(msg.d, function (index, item) {
                    $("#countrySelectBox").get(0).options[$("#countrySelectBox").get(0).options.length] = new Option(item.CountryName, item.CountryID);

                    if (item.CountryID != null) {

                        if (item.CountryID == "3" || item.CountryID == "4" || item.CountryID == "24" || item.CountryID == "45" || item.CountryID == "62" || item.CountryID == "64" || item.CountryID == "77" || item.CountryID == "101" || item.CountryID == "166" || item.CountryID == "169" || item.CountryID == "208") {

                            $('#ExportNssReport').hide();
                            hideload(); //uopload excel button
                            if ((item.CountryID == "4") || (item.CountryID == "104") || (item.CountryID == "1") || (item.CountryID == "2")) {


                                $('#lilblHireType').show();
                            }
                            else {

                                $('#lilblHireType').hide();
                            }
                        }
                        else {

                            $('#lilblHireType').hide();
                            $('#ExportNssReport').show();
                            showupload(); //uopload excel button
                        }
                    }
                });

                $("#countrySelectBox").selectedIndex = 1;
                var manilacountryflag = $("#countrySelectBox").val();
                var manilacountryflag2 = $("#countrySelectBox option:selected").text();
                if ($("#countrySelectBox").val() == "3" || $("#countrySelectBox").val() == "4" || $("#countrySelectBox").val() == "104") {
                    $('#lilblHireType').show();
                    $("#cplbl").show();
                    $("#dclbl").hide();
                    $("#lblDCCnt").hide();
                    $("#lblCellCnt").show();
                    $('#ExportNssReport').hide();
                    hideload(); //uopload excel button

                }
                else if (manilacountryflag2 == 'philippines') {
                    $("#cplbl").hide();
                    $("#dclbl").hide();
                    $("#lblDCCnt").hide();
                    $("#lblCellCnt").hide();
                    $('#ExportNssReport').hide();
                    hideload(); //uopload excel button

                    $('#lilblHireType').hide();
                }
                else if ($("#countrySelectBox").val() == "24" || $("#countrySelectBox").val() == "45" || $("#countrySelectBox").val() == "62" || $("#countrySelectBox").val() == "64" || $("#countrySelectBox").val() == "77" || $("#countrySelectBox").val() == "101" || $("#countrySelectBox").val() == "166" || $("#countrySelectBox").val() == "169" || $("#countrySelectBox").val() == "208") {
                    $("#cplbl").show();
                    $("#dclbl").show();
                    $("#lblDCCnt").show();
                    $("#lblCellCnt").show();
                    $('#ExportNssReport').hide();
                    hideload(); //uopload excel button

                    $('#lilblHireType').hide();

                }
                else if ($("#countrySelectBox").val() == "1" || $("#countrySelectBox").val() == "2") {
                    $('#lilblHireType').show();
                    $("#cplbl").show();
                    $("#dclbl").hide();
                    $("#lblDCCnt").hide();
                    $("#lblCellCnt").show();

                    $('#ExportNssReport').show();
                    showupload(); //uopload excel button

                }
                else {
                    $("#cplbl").show();
                    $("#dclbl").hide();
                    $("#lblDCCnt").hide();
                    $("#lblCellCnt").show();
                    $('#ExportNssReport').show();
                    showupload(); //uopload excel button
                    $('#lilblHireType').hide();
                }


                $("#hdnProcessId").val(1);
                $("#hdnPageNo").val(1);
                ShowHideHireType();
            },
            error: function () {
                // alert("Failed to load");
            }
        });


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
                endDate = result.d[1].Value;
            },
            error: function () {
                alert("Failed to load Date");
            }
        });
        $("#DOJFromInputBox").val(stDate);
        $("#DOJToInputBox").val(endDate);
        var dataString = '{"timelineId":"' + $("#timelineSelectBox").val() + '" ,"country" : "' + $("#countrySelectBox").val() + '"}';

        $.ajax({
            type: "POST",
            url: "NSSDashBoard.aspx/BindStatus",
            data: dataString,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                $.each(msg.d, function (index, item) {
                    $("#statusSelectBox").get(0).options[$("#statusSelectBox").get(0).options.length] = new Option(item.StatusDescription, item.AssetStatusId);
                });
                $("#statusSelectBox").selectedIndex = 1;

            },
            error: function (xhr) {
                // alert("Failed to load Status" + xhr.status);
            }

        });
        $("#hdnProcessId").val(1);
        $("#hdnPageNo").val(1);



        Onentertext();
                
        var dataString = '{"gridView":"0","processId" : "' + $("#hdnProcessId").val() + '" ,"pageNo":"1", "name":"' + $("#CandidateNameInputBox").val() + '", "designation":"' + $("#CandidateDesignationInputBox").val() + '", "projectID":"' + $("#CandidateProjectIdInputBox").val() + '", "managerID": "' + $("#CandidateManagerIdInputBox").val() + '", "fromDate":"' + $("#DOJFromInputBox").val() + '", "endDate":"' + $("#DOJToInputBox").val() + '", "country":"' + $("#countrySelectBox").val() + '", "assetStatus":"' + $("#statusSelectBox").val() + '", "timelineStatus":"' + $("#timelineSelectBox").val() + '","hireType":"' + $("#candidateHireTypeSelectBox").val() + '"}';
        $.ajax({
            type: "POST",
            url: "NSSDashBoard.aspx/TransformXML", data: dataString,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: AjaxSucceeded,
            error: AjaxFailed
        });

//        FetchCand(1, 0);
    });

    function Onentertext() {
        $('#CandidateNameInputBox').keypress(function (e) {
            if (e.which == 13) {
                ValidateApply(0);
                $(this).focus();
                return false;
                //$("#CandidateNameInputBox").focus();

            }
        });
        $('#CandidateDesignationInputBox').keypress(function (e) {
            if (e.which == 13) {
                ValidateApply(0);
                $(this).focus();
                return false;
                //$("#CandidateDesignationInputBox").focus();
            }
        });
        $('#CandidateProjectIdInputBox').keypress(function (e) {
            if (e.which == 13) {
                ValidateApply(0);
                $(this).focus();
                return false;
                // $("#CandidateProjectIdInputBox").focus();
            }
        });
        $('#CandidateManagerIdInputBox').keypress(function (e) {
            if (e.which == 13) {
                ValidateApply(0);
                $(this).focus();
                return false;
                // $("#CandidateManagerIdInputBox").focus();
            }
        });
    }


    $(function () {

        $("#DOJFromInputBox").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar', showOn: "both", buttonImage: "../../Images/calendar.png", changeMonth: true, buttonImageOnly: true, changeYear: true, buttonAfter: false });
        $("#DOJToInputBox").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar', showOn: "both", buttonImage: "../../Images/calendar.png", changeMonth: true, buttonImageOnly: true, changeYear: true, buttonAfter: false });


    });
    // var stDate = $("#hdnStartDate").val();
    //  var endDate = $("#hdnEndDate").val();

    //    $("#DOJFromInputBox").val(stDate);
    //    $("#DOJToInputBox").val(endDate);

    function CountrySelectedIndexChange() {
        $("#statusSelectBox").empty();
        var dataString = '{"timelineId":"' + $("#timelineSelectBox").val() + '" ,"country" : "' + $("#countrySelectBox").val() + '"}';
        $.ajax({
            type: "POST",
            url: "NSSDashBoard.aspx/BindStatus",
            data: dataString,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                $.each(msg.d, function (index, item) {
                    $("#statusSelectBox").get(0).options[$("#statusSelectBox").get(0).options.length] = new Option(item.StatusDescription, item.AssetStatusId);

                });
                var manilacountryflag = $("#countrySelectBox").val();
                //                var manilacountryflag2 = $("#countrySelectBox option:selected")[0].innerText.toLowerCase();
                var manilacountryflag2 = $("#countrySelectBox option:selected").text();
                if ($("#countrySelectBox").val() == "3" || $("#countrySelectBox").val() == "4" || $("#countrySelectBox").val() == "104") {
                    if ($("#countrySelectBox").val() == "4" || $("#countrySelectBox").val() == "104") {
                        countryChange();
                    }

                    $("#cplbl").show();
                    $("#dclbl").hide();
                    $("#lblDCCnt").hide();
                    $("#lblCellCnt").show();
                    $('#ExportNssReport').hide();
                    hideload(); //uopload excel button
                }
                //                else if ($("#countrySelectBox").val() == "179") {
                //                    $("#statusSelectBox").val()==
                //                }
                else if (manilacountryflag2 == 'philippines') {
                    $("#cplbl").hide();
                    $("#lblCellCnt").hide();
                    $("#dclbl").hide();
                    $("#lblDCCnt").hide();
                    $('#ExportNssReport').hide();
                    hideload(); //uopload excel button
                    $('#lilblType').hide();
                    $('#lilblHireType').hide();
                }
                else if ($("#countrySelectBox").val() == "24" || $("#countrySelectBox").val() == "45" || $("#countrySelectBox").val() == "62" || $("#countrySelectBox").val() == "64" || $("#countrySelectBox").val() == "77" || $("#countrySelectBox").val() == "101" || $("#countrySelectBox").val() == "166" || $("#countrySelectBox").val() == "169" || $("#countrySelectBox").val() == "208") {
                    $("#dclbl").show();
                    $("#lblDCCnt").show();
                    $("#cplbl").show();
                    $("#lblCellCnt").show();
                    $('#ExportNssReport').hide();
                    hideload(); //uopload excel button
                    $('#lilblType').hide();
                    $('#lilblHireType').hide();
                }
                else if ($("#countrySelectBox").val() == "1" || $("#countrySelectBox").val() == "2") {
                    $("#cplbl").show();
                    $("#lblCellCnt").show();
                    $("#dclbl").hide();
                    $("#lblDCCnt").hide();
                    $('#ExportNssReport').show();
                    showupload(); //uopload excel button
                    $('#lilblType').hide();
                    $('#lilblHireType').show();

                }
                else {
                    $("#cplbl").show();
                    $("#lblCellCnt").show();
                    $("#dclbl").hide();
                    $("#lblDCCnt").hide();
                    $('#ExportNssReport').show();
                    showupload(); //uopload excel button
                    $('#lilblType').hide();
                    $('#lilblHireType').hide();

                }
                ShowHideHireType();
            },
            error: function (xhr) {
                // alert("Failed to load Status" + xhr.status);
            }
        });


    }

    function countryChange() {
        if ($('#countrySelectBox').val() == "4" || $("#countrySelectBox").val() == "104" || $('#countrySelectBox').val() == "1" || $('#countrySelectBox').val() == "2") {

            $('#lilblHireType').show();

        }
        else {
            $('#lilblHireType').hide();
        }
    }


    function AjaxSucceeded(result) {
        var response = result.d.split('*#@');
        $("#gridDiv").html(response[0]);
        if (response[1] != null) {
            if (response[1] == 0) {
                document.getElementById('<%=ExportImageButton.ClientID %>').disabled = true;
                document.getElementById('<%=ExportNssReport.ClientID %>').disabled = true;
                //  document.getElementById('<%=btnUpload.ClientID %>').disabled = false;
            }
            else {
                document.getElementById('<%=ExportImageButton.ClientID %>').disabled = false;
                document.getElementById('<%=ExportNssReport.ClientID %>').disabled = false;
                //  document.getElementById('<%=btnUpload.ClientID %>').disabled = false;
            }

        }

    }

    function AjaxFailed(result) {
         alert("Failed");
        //        if (document.getElementById(getdivid) != null)
        //            document.getElementById(getdivid).style.display = "none";
    }

    function setProcessId(ProcessId) {
        $("#hdnProcessId").val(ProcessId);
        $.ajax({
            type: "POST",
            url: "NSSDashBoard.aspx/ClearSession",
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: '',
            error: AjaxFailed

        });
        $("#prejoiningbtn_rc").attr('src', '../../Images/prejoinin.png');
        FetchCand(1, 0);
    }

    function Clear(result) { 
        $("#CandidateNameInputBox").val('');
        $("#CandidateDesignationInputBox").val('');
        $("#CandidateProjectIdInputBox").val('');
        $("#CandidateManagerIdInputBox").val('');
        $("#countrySelectBox").prop('selectedIndex', 0);
        $("#timelineSelectBox").prop('selectedIndex', 0);
        $("#statusSelectBox").prop('selectedIndex', 0);
        $("#candidateHireTypeSelectBox").prop('selectedIndex', 0);
        var test = '';
        $("#lblMessage").val(test);
        $("#lblMessage").hide();

        //        $("#timelineSelectBox").val(0);
        //        $("#statusSelectBox").val(0);
        //        $("#countrySelectBox").val(0);


        //        var stDate = $("#hdnStartDate").val();
        //        var endDate = $("#hdnEndDate").val();

                $("#DOJFromInputBox").val(stDate);
                $("#DOJToInputBox").val(endDate);
    }

    function FetchCand(pageNo, gridView) {
        $("#hdnPageNo").val(pageNo);
        var dataString = '{"gridView":"' + gridView + '","processId" : "' + $("#hdnProcessId").val() + '" ,"pageNo":"' + pageNo + '", "name":"' + $.trim($("#CandidateNameInputBox").val()) + '", "designation":"' + $("#CandidateDesignationInputBox").val() + '", "projectID":"' + $.trim($("#CandidateProjectIdInputBox").val()) + '", "managerID": "' + $.trim($("#CandidateManagerIdInputBox").val()) + '", "fromDate":"' + $("#DOJFromInputBox").val() + '", "endDate":"' + $("#DOJToInputBox").val() + '", "country":"' + $("#countrySelectBox").val() + '", "assetStatus":"' + $("#statusSelectBox").val() + '", "timelineStatus":"' + $("#timelineSelectBox").val() + '","hireType":"' + $("#candidateHireTypeSelectBox").val() + '"}';

        $.ajax({
            type: "POST",
            url: "NSSDashBoard.aspx/TransformXML",
            data: dataString,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: AjaxSucceeded,
            error: AjaxFailed

        });
    }
    function Refreshdata() {
        var pgeno = $("#hdnPageNo").val();
        FetchCand(pgeno, 0);
        $("#personalDiv").hide();
        $("#main_rc").show();
        //  $("#personalDiv").hide("slide", { direction: "left" }, 1000);
        //  $("#main_rc").fadeTo(900, 1);        
        $('.fakePicker').children('div').eq(0).hide(); /*SIT bug fix to hide datepicker on clicking back to summary link*/
        return ChangeCount();

    }

    function PaginationDashboard(startIndex, pageNo) {
        FetchCand(pageNo, 0);

    }
    function PaginationTask(startIndex, pageNo) {
        $("#personalDiv").show();
        var datastring = '{startIndex:' + startIndex + ',pageNo:' + pageNo + '}';
        $.ajax({
            type: "POST",
            url: "NSSDashBoard.aspx/PersonalDataTaskPagination",
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
            url: "NSSDashBoard.aspx/PersonalData",
            data: datastring,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: PersonalData,
            error: AjaxFailed,
            complete: function () {
                if ($('#txtDeliveryDate_Laptop').val() == "1/1/1900" || $('#txtDeliveryDate_Laptop').val() == "") {
                    $('#txtDeliveryDate_Laptop').removeAttr('readOnly');
                    getCurrentDate($('#txtDeliveryDate_Laptop'));
                    $('#txtDeliveryDate_Laptop').attr('readOnly', 'readOnly');
                }
                if ($('#txtDeliveryDate_Blackberry').val() == "1/1/1900" || $('#txtDeliveryDate_Blackberry').val() == "") {
                    $('#txtDeliveryDate_Blackberry').removeAttr('readOnly');
                    getCurrentDate($('#txtDeliveryDate_Blackberry'));
                    $('#txtDeliveryDate_Blackberry').attr('readOnly', 'readOnly');
                }
                if ($('#txtDeliveryDate_CellPhone').val() == "1/1/1900" || $('#txtDeliveryDate_CellPhone').val() == "") {
                    $('#txtDeliveryDate_CellPhone').removeAttr('readOnly');
                    getCurrentDate($('#txtDeliveryDate_CellPhone'));
                    $('#txtDeliveryDate_CellPhone').attr('readOnly', 'readOnly');
                }
                if ($('#txtDeliveryDate_DataCard').val() == "1/1/1900" || $('#txtDeliveryDate_DataCard').val() == "") {
                    $('#txtDeliveryDate_DataCard').removeAttr('readOnly');
                    getCurrentDate($('#txtDeliveryDate_DataCard'));
                    $('#txtDeliveryDate_DataCard').attr('readOnly', 'readOnly');
                }
                if ($('#txtDeliveryDate_SamsungS3').val() == "1/1/1900" || $('#txtDeliveryDate_SamsungS3').val() == "") {
                    $('#txtDeliveryDate_SamsungS3').removeAttr('readOnly');
                    getCurrentDate($('#txtDeliveryDate_SamsungS3'));
                    $('#txtDeliveryDate_SamsungS3').attr('readOnly', 'readOnly');
                }
                if ($('#txtDeliveryDate_SamsungS4').val() == "1/1/1900" || $('#txtDeliveryDate_SamsungS4').val() == "") {
                    $('#txtDeliveryDate_SamsungS4').removeAttr('readOnly');
                    getCurrentDate($('#txtDeliveryDate_SamsungS4'));
                    $('#txtDeliveryDate_SamsungS4').attr('readOnly', 'readOnly');
                }
                if ($('#txtDeliveryDate_SamsungS5').val() == "1/1/1900" || $('#txtDeliveryDate_SamsungS5').val() == "") {
                    $('#txtDeliveryDate_SamsungS5').removeAttr('readOnly');
                    getCurrentDate($('#txtDeliveryDate_SamsungS5'));
                    $('#txtDeliveryDate_SamsungS5').attr('readOnly', 'readOnly');
                }
                if ($('#txtDeliveryDate_IPhone4S').val() == "1/1/1900" || $('#txtDeliveryDate_IPhone4S').val() == "") {
                    $('#txtDeliveryDate_IPhone4S').removeAttr('readOnly');
                    getCurrentDate($('#txtDeliveryDate_IPhone4S'));
                    $('#txtDeliveryDate_IPhone4S').attr('readOnly', 'readOnly');
                }
                if ($('#txtDeliveryDate_IPhone5S').val() == "1/1/1900" || $('#txtDeliveryDate_IPhone5S').val() == "") {
                    $('#txtDeliveryDate_IPhone5S').removeAttr('readOnly');
                    getCurrentDate($('#txtDeliveryDate_IPhone5S'));
                    $('#txtDeliveryDate_IPhone5S').attr('readOnly', 'readOnly');
                }
                if ($('#txtDeliveryDate_IPhone5C').val() == "1/1/1900" || $('#txtDeliveryDate_IPhone5C').val() == "") {
                    $('#txtDeliveryDate_IPhone5C').removeAttr('readOnly');
                    getCurrentDate($('#txtDeliveryDate_IPhone5C'));
                    $('#txtDeliveryDate_IPhone5C').attr('readOnly', 'readOnly');
                }
                if ($('#txtDeliveryDate_LGG2').val() == "1/1/1900" || $('#txtDeliveryDate_LGG2').val() == "") {
                    $('#txtDeliveryDate_LGG2').removeAttr('readOnly');
                    getCurrentDate($('#txtDeliveryDate_LGG2'));
                    $('#txtDeliveryDate_LGG2').attr('readOnly', 'readOnly');
                }
                if ($('#txtDeliveryDate_SamsungNote3').val() == "1/1/1900" || $('#txtDeliveryDate_SamsungNote3').val() == "") {
                    $('#txtDeliveryDate_SamsungNote3').removeAttr('readOnly');
                    getCurrentDate($('#txtDeliveryDate_SamsungNote3'));
                    $('#txtDeliveryDate_SamsungNote3').attr('readOnly', 'readOnly');
                }

                if ($('#txtDeliveryDate_SamsungNote4').val() == "1/1/1900" || $('#txtDeliveryDate_SamsungNote4').val() == "") {
                    $('#txtDeliveryDate_SamsungNote4').removeAttr('readOnly');
                    getCurrentDate($('#txtDeliveryDate_SamsungNote4'));
                    $('#txtDeliveryDate_SamsungNote4').attr('readOnly', 'readOnly');
                }
                if ($('#txtDeliveryDate_IPhone6').val() == "1/1/1900" || $('#txtDeliveryDate_IPhone6').val() == "") {
                    $('#txtDeliveryDate_IPhone6').removeAttr('readOnly');
                    getCurrentDate($('#txtDeliveryDate_IPhone6'));
                    $('#txtDeliveryDate_IPhone6').attr('readOnly', 'readOnly');
                }
                if ($('#txtDeliveryDate_IPhone6P').val() == "1/1/1900" || $('#txtDeliveryDate_IPhone6P').val() == "") {
                    $('#txtDeliveryDate_IPhone6P').removeAttr('readOnly');
                    getCurrentDate($('#txtDeliveryDate_IPhone6P'));
                    $('#txtDeliveryDate_IPhone6P').attr('readOnly', 'readOnly');
                }
                if ($('#txtDeliveryDate_LGG3').val() == "1/1/1900" || $('#txtDeliveryDate_LGG3').val() == "") {
                    $('#txtDeliveryDate_LGG3').removeAttr('readOnly');
                    getCurrentDate($('#txtDeliveryDate_LGG3'));
                    $('#txtDeliveryDate_LGG3').attr('readOnly', 'readOnly');
                }
                if ($('#txtDeliveryDate_SamsungS632GB').val() == "1/1/1900" || $('#txtDeliveryDate_SamsungS632GB').val() == "") {
                    $('#txtDeliveryDate_SamsungS632GB').removeAttr('readOnly');
                    getCurrentDate($('#txtDeliveryDate_SamsungS632GB'));
                    $('#txtDeliveryDate_SamsungS632GB').attr('readOnly', 'readOnly');
                }
                if ($('#txtDeliveryDate_SamsungS664GB').val() == "1/1/1900" || $('#txtDeliveryDate_SamsungS664GB').val() == "") {
                    $('#txtDeliveryDate_SamsungS664GB').removeAttr('readOnly');
                    getCurrentDate($('#txtDeliveryDate_SamsungS664GB'));
                    $('#txtDeliveryDate_SamsungS664GB').attr('readOnly', 'readOnly');
                }
                if ($('#txtDeliveryDate_SamsungS6128GB').val() == "1/1/1900" || $('#txtDeliveryDate_SamsungS6128GB').val() == "") {
                    $('#txtDeliveryDate_SamsungS6128GB').removeAttr('readOnly');
                    getCurrentDate($('#txtDeliveryDate_SamsungS6128GB'));
                    $('#txtDeliveryDate_SamsungS6128GB').attr('readOnly', 'readOnly');
                }
                if ($('#txtDeliveryDate_SamsungS6Edge32GB').val() == "1/1/1900" || $('#txtDeliveryDate_SamsungS6Edge32GB').val() == "") {
                    $('#txtDeliveryDate_SamsungS6Edge32GB').removeAttr('readOnly');
                    getCurrentDate($('#txtDeliveryDate_SamsungS6Edge32GB'));
                    $('#txtDeliveryDate_SamsungS6Edge32GB').attr('readOnly', 'readOnly');
                }
                if ($('#txtDeliveryDate_SamsungS6Edge64GB').val() == "1/1/1900" || $('#txtDeliveryDate_SamsungS6Edge64GB').val() == "") {
                    $('#txtDeliveryDate_SamsungS6Edge64GB').removeAttr('readOnly');
                    getCurrentDate($('#txtDeliveryDate_SamsungS6Edge64GB'));
                    $('#txtDeliveryDate_SamsungS6Edge64GB').attr('readOnly', 'readOnly');
                }
                if ($('#txtDeliveryDate_SamsungS6Edge128GB').val() == "1/1/1900" || $('#txtDeliveryDate_SamsungS6Edge128GB').val() == "") {
                    $('#txtDeliveryDate_SamsungS6Edge128GB').removeAttr('readOnly');
                    getCurrentDate($('#txtDeliveryDate_SamsungS6Edge128GB'));
                    $('#txtDeliveryDate_SamsungS6Edge128GB').attr('readOnly', 'readOnly');
                }

            }
        });
    }

    /*Function to get current date*/
    var getCurrentDate = function (el) {
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();

        var currDate = (('' + month).length < 2 ? '0' : '') + month + '/' + (('' + day).length < 2 ? '0' : '') + day + '/' + d.getFullYear();
        if ($(el).length > 0) {
            $(el)[0].value = currDate;
        }
    }

    function PersonalData(result) {
        //result.toString()


        //        //    $("#personalDiv").show("slide", { direction: "left" }, 1000);
        //        $("#main_rc").fadeTo(900, 0.0);
        //        $("#personalDiv").html(result.d);
        //        //   $("#personalDiv").append(result.d);
        flagA = false;
        flagB = false;
        flagC = false;
        $("#personalDiv").css("display", "block");
        $("#personalDiv").html(result.d);

    }

//    function UpdateCandidateInfo(laptopAssetTrackingID, cellAssetTrackingID, bbAssetTrackingID, ceAssetTrackingID, dcAssetTrackingID, laptopstatus, cellstatus, bbstatus, cestatus, dcstatus, laptopcomments, cellcomments, bbcomments, cecomments, dccomments, laptopFedex, cellFedex, bbFedex, ceFedex, dcFedex, laptopddate, cellddate, bbddate, ceddate, dcddate, z10AssetTrackingID, q10AssetTrackingID, samsungS3AssetTrackingID, samsungS4AssetTrackingID, samsungS5AssetTrackingID, iPhone4SAssetTrackingID, iPhone5CAssetTrackingID, iPhone5SAssetTrackingID, z10status, q10status, samsungS3status, samsungS4status, samsungS5status, iPhone4Sstatus, iPhone5Cstatus, iPhone5Sstatus, z10Comments, q10Comments, samsungS3Comments, samsungS4Comments, samsungS5Comments, iPhone4SComments, iPhone5CComments, iPhone5SComments, z10FedEx, q10FedEx, samsungS3FedEx, samsungS4FedEx, samsungS5FedEx, iPhone4SFedEx, iPhone5CFedEx, iPhone5SFedEx, z10ddate, q10ddate, samsungS3ddate, samsungS4ddate, samsungS5ddate, iPhone4Sddate, iPhone5Sddate, iPhone5Cddate, divmsg) {
    function UpdateCandidateInfo(laptopAssetTrackingID, cellAssetTrackingID, bbAssetTrackingID, ceAssetTrackingID, dcAssetTrackingID, z10AssetTrackingID, q10AssetTrackingID, samsungS3AssetTrackingID, samsungS4AssetTrackingID, samsungS5AssetTrackingID, iPhone4SAssetTrackingID, iPhone5SAssetTrackingID, iPhone5CAssetTrackingID, lgg2AssetTrackingID, samsungNote3AssetTrackingID, samsungNote4AssetTrackingID, iPhone6AssetTrackingID, iPhone6PAssetTrackingID, lgg3AssetTrackingID, samsungS632GBAssetTrackingID, samsungS664GBAssetTrackingID, samsungS6128GBAssetTrackingID, samsungS6Edge32GBAssetTrackingID, samsungS6Edge64GBAssetTrackingID, samsungS6Edge128GBAssetTrackingID, laptopstatus, cellstatus, bbstatus, cestatus, dcstatus, z10status, q10status, samsungS3status, samsungS4status, samsungS5status, iPhone4Sstatus, iPhone5Sstatus, iPhone5Cstatus, lgg2status, samsungNote3status, samsungNote4status, iPhone6status, iPhone6Pstatus, lgg3status, samsungS632GBstatus, samsungS664GBstatus, samsungS6128GBstatus, samsungS6Edge32GBstatus, samsungS6Edge64GBstatus, samsungS6Edge128GBstatus, laptopcomments, cellcomments, bbcomments, cecomments, dccomments, z10Comments, q10Comments, samsungS3Comments, samsungS4Comments, samsungS5Comments, iPhone4SComments, iPhone5SComments, iPhone5CComments, lgg2Comments, samsungNote3Comments, samsungNote4Comments, iPhone6Comments, iPhone6PComments, lgg3Comments, samsungS632GBComments, samsungS664GBComments, samsungS6128GBComments, samsungS6Edge32GBComments, samsungS6Edge64GBComments, samsungS6Edge128GBComments, laptopFedex, cellFedex, bbFedex, ceFedex, dcFedex, z10FedEx, q10FedEx, samsungS3FedEx, samsungS4FedEx, samsungS5FedEx, iPhone4SFedEx, iPhone5SFedEx, iPhone5CFedEx, lgg2FedEx, samsungNote3FedEx, samsungNote4FedEx, iPhone6FedEx, iPhone6PFedEx, lgg3FedEx, samsungS632GBFedEx, samsungS664GBFedEx, samsungS6128GBFedEx, samsungS6Edge32GBFedEx, samsungS6Edge64GBFedEx, samsungS6Edge128GBFedEx, laptopddate, cellddate, bbddate, ceddate, dcddate, z10ddate, q10ddate, samsungS3ddate, samsungS4ddate, samsungS5ddate, iPhone4Sddate, iPhone5Sddate, iPhone5Cddate, lgg2ddate, samsungNote3ddate, samsungNote4ddate, iPhone6ddate, iPhone6Pddate, lgg3ddate, samsungS632GBddate, samsungS664GBddate, samsungS6128GBddate, samsungS6Edge32GBddate, samsungS6Edge64GBddate, samsungS6Edge128GBddate, divmsg) {

        //alert(laptopAssetTrackingID);
        //sree
        var laptopAssetTrackingIDValue;
        var cellAssetTrackingIDValue;
        var bbAssetTrackingIDValue;
        var ceAssetTrackingIDValue;
        var dcAssetTrackingIDValue;
        var Z10AssetTrackingIdValue;
        var Q10AssetTrackingIdValue;
        var SamsungS3AssetTrackingIdValue;
        var SamsungS4AssetTrackingIdValue;
        var SamsungS5AssetTrackingIdValue;
        var IPhone4SAssetTrackingIdValue;
        var IPhone5CAssetTrackingIdValue;
        var IPhone5SAssetTrackingIdValue;
        var lgg2AssetTrackingIdValue;
        var samsungNote3AssetTrackingIdValue;
        var samsungNote4AssetTrackingIdValue;
        var IPhone6AssetTrackingIdValue;
        var IPhone6PAssetTrackingIdValue;
        var lgg3AssetTrackingIdValue;
        var samsungS632GBAssetTrackingIdValue;
        var samsungS664GBAssetTrackingIdValue;
        var samsungS6128GBAssetTrackingIdValue;
        var samsungS6Edge32GBAssetTrackingIdValue;
        var samsungS6Edge64GBAssetTrackingIdValue;
        var samsungS6Edge128GBAssetTrackingIdValue;

        var laptopstatusValue;
        var cellstatusValue;
        var bbstatusValue;
        var cestatusValue;
        var dcstatusValue;
        var Z10statusValue;
        var Q10statusValue;
        var SamsungS3statusValue;
        var SamsungS4statusValue;
        var SamsungS5statusValue;
        var IPhone4SstatusValue;
        var IPhone5CstatusValue;
        var IPhone5SstatusValue;
        var lgg2statusValue;
        var samsungNote3statusValue;
        var samsungNote4statusValue;
        var IPhone6statusValue;
        var IPhone6PstatusValue;
        var lgg3statusValue;
        var samsungS632GBstatusValue;
        var samsungS664GBstatusValue;
        var samsungS6128GBstatusValue;
        var samsungS6Edge32GBstatusValue;
        var samsungS6Edge64GBstatusValue;
        var samsungS6Edge128GBstatusValue;

        var laptopcommentsValue;
        var cellcommentsValue;
        var bbcommentsValue;
        var cecommentsValue;
        var dccommentsValue;
        var Z10CommentsValue;
        var Q10CommentsValue;
        var SamsungS3CommentsValue;
        var SamsungS4CommentsValue;
        var SamsungS5CommentsValue;
        var IPhone4SCommentsValue;
        var IPhone5CCommentsValue;
        var IPhone5SCommentsValue;
        var lgg2CommentsValue;
        var samsungNote3CommentsValue;
        var samsungNote4CommentsValue;
        var IPhone6CommentsValue;
        var IPhone6PCommentsValue;
        var lgg3CommentsValue;
        var samsungS632GBCommentsValue;
        var samsungS664GBCommentsValue;
        var samsungS6128GBCommentsValue;
        var samsungS6Edge32GBCommentsValue;
        var samsungS6Edge64GBCommentsValue;
        var samsungS6Edge128GBCommentsValue;

        var laptopFedexValue;
        var cellFedexValue;
        var bbFedexValue;
        var ceFedexValue;
        var dcFedexValue;
        var Z10FedExValue;
        var Q10FedExValue;
        var SamsungS3FedExValue;
        var SamsungS4FedExValue;
        var SamsungS5FedExValue;
        var IPhone4SFedExValue;
        var IPhone5CFedExValue;
        var IPhone5SFedExValue;
        var lgg2FedExValue;
        var samsungNote3FedExValue;
        var samsungNote4FedExValue;
        var IPhone6FedExValue;
        var IPhone6PFedExValue;
        var lgg3FedExValue;
        var samsungS632GBFedExValue;
        var samsungS664GBFedExValue;
        var samsungS6128GBFedExValue;
        var samsungS6Edge32GBFedExValue;
        var samsungS6Edge64GBFedExValue;
        var samsungS6Edge128GBFedExValue;

        var laptopddateValue;
        var cellddateValue;
        var bbddateValue;
        var ceddateValue;
        var dcddateValue;
        var Z10ddateValue;
        var Q10ddateValue;
        var SamsungS3ddateValue;
        var SamsungS4ddateValue;
        var SamsungS5ddateValue;
        var IPhone4SddateValue;
        var IPhone5SddateValue;
        var IPhone5CddateValue;
        var lgg2ddateValue;
        var samsungNote3ddateValue;
        var samsungNote4ddateValue;
        var IPhone6ddateValue;
        var IPhone6PddateValue;
        var lgg3ddateValue;
        var samsungS632GBddateValue;
        var samsungS664GBddateValue;
        var samsungS6128GBddateValue;
        var samsungS6Edge32GBddateValue;
        var samsungS6Edge64GBddateValue;
        var samsungS6Edge128GBddateValue;

        var getdivid = divmsg.id;


        if (laptopstatus != null) {
            if (laptopstatus.value == "5" || laptopstatus.value == "6") {
                laptopFedex.value = "";
                laptopddate.value = '1/1/1900';
            }
            else if (laptopstatus.value != "14") {
                laptopcomments.value = "";
                laptopFedex.value = "";
                laptopddate.value = '1/1/1900';
            }
        }

        if (cellstatus != null) {
            if (cellstatus.value == "5" || cellstatus.value == "6") {
                cellFedex.value = "";
                cellddate.value = '1/1/1900';
            }
            else if (cellstatus.value != "14") {
                cellcomments.value = "";
                cellFedex.value = "";
                cellddate.value = '1/1/1900';
            }
        }

        if (bbstatus != null) {
            if (bbstatus.value == "5" || bbstatus.value == "6") {
                bbFedex.value = "";
                bbddate.value = '1/1/1900';
            }
            else if (bbstatus.value != "14") {
                bbcomments.value = "";
                bbFedex.value = "";
                bbddate.value = '1/1/1900';
            }
        }

        if (cestatus != null) {
            if (cestatus.value == "5" || cestatus.value == "6") {
                ceFedex.value = "";
                ceddate.value = '1/1/1900';
            }
            else if (cestatus.value != "14") {
                cecomments.value = "";
                ceFedex.value = "";
                ceddate.value = '1/1/1900';
            }
        }
        if (dcstatus != null) {
            if (dcstatus.value == "5" || dcstatus.value == "6") {
                dcFedex.value = "";
                dcddate.value = '1/1/1900';
            }
            else if (dcstatus.value != "14") {
                dccomments.value = "";
                dcFedex.value = "";
                dcddate.value = '1/1/1900';
            }
        }

        if (z10status != null) {
            if (z10status.value == "5" || z10status.value == "6") {
                z10FedEx.value = "";
                z10ddate.value = '1/1/1900';
            }
            else if (Z10status.value != "14") {
                z10Comments.value = "";
                z10FedEx.value = "";
                z10ddate.value = '1/1/1900';
            }
        }
        if (q10status != null) {
            if (q10status.value == "5" || q10status.value == "6") {
                q10FedEx.value = "";
                q10ddate.value = '1/1/1900';
            }
            else if (q10status.value != "14") {
                q10Comments.value = "";
                q10FedEx.value = "";
                q10ddate.value = '1/1/1900';
            }
        }
        if (samsungS3status != null) {
            if (samsungS3status.value == "5" || samsungS3status.value == "6") {
                SamsungS3FedEx.value = "";
                SamsungS3ddate.value = '1/1/1900';
            }
            else if (samsungS3status.value != "14") {
                SamsungS3Comments.value = "";
                SamsungS3FedEx.value = "";
                SamsungS3ddate.value = '1/1/1900';
            }
        }
        if (samsungS4status != null) {
            if (samsungS4status.value == "5" || samsungS4status.value == "6") {
                samsungS4FedEx.value = "";
                samsungS4ddate.value = '1/1/1900';
            }
            else if (samsungS4status.value != "14") {
                samsungS4Comments.value = "";
                samsungS4FedEx.value = "";
                samsungS4ddate.value = '1/1/1900';
            }
        }
        if (samsungS5status != null) {
            if (samsungS5status.value == "5" || samsungS5status.value == "6") {
                samsungS5FedEx.value = "";
                samsungS5ddate.value = '1/1/1900';
            }
            else if (samsungS5status.value != "14") {
                samsungS5Comments.value = "";
                samsungS5FedEx.value = "";
                samsungS5ddate.value = '1/1/1900';
            }
        }
        if (iPhone4Sstatus != null) {
            if (iPhone4Sstatus.value == "5" || iPhone4Sstatus.value == "6") {
                iPhone4SFedEx.value = "";
                iPhone4Sddate.value = '1/1/1900';
            }
            else if (iPhone4Sstatus.value != "14") {
                iPhone4SComments.value = "";
                iPhone4SFedEx.value = "";
                iPhone4Sddate.value = '1/1/1900';
            }
        }
        if (iPhone5Sstatus != null) {
            if (iPhone5Sstatus.value == "5" || iPhone5Sstatus.value == "6") {
                iPhone5SFedEx.value = "";
                iPhone5Sddate.value = '1/1/1900';
            }
            else if (iPhone5Sstatus.value != "14") {
                iPhone5SComments.value = "";
                iPhone5SFedEx.value = "";
                iPhone5Sddate.value = '1/1/1900';
            }
        }
        if (iPhone5Cstatus != null) {
            if (iPhone5Cstatus.value == "5" || iPhone5Cstatus.value == "6") {
                iPhone5CFedEx.value = "";
                iPhone5Cddate.value = '1/1/1900';
            }
            else if (iPhone5Cstatus.value != "14") {
                iPhone5CComments.value = "";
                iPhone5CFedEx.value = "";
                iPhone5Cddate.value = '1/1/1900';
            }
        }
        if (lgg2status != null) {
            if (lgg2status.value == "5" || lgg2status.value == "6") {
                lgg2FedEx.value = "";
                lgg2ddate.value = '1/1/1900';
            }
            else if (lgg2status.value != "14") {
                lgg2Comments.value = "";
                lgg2FedEx.value = "";
                lgg2ddate.value = '1/1/1900';
            }
        }
        if (samsungNote3status != null) {
            if (samsungNote3status.value == "5" || samsungNote3status.value == "6") {
                samsungNote3FedEx.value = "";
                samsungNote3ddate.value = '1/1/1900';
            }
            else if (samsungNote3status.value != "14") {
                samsungNote3Comments.value = "";
                samsungNote3FedEx.value = "";
                samsungNote3ddate.value = '1/1/1900';
            }
        }
        if (samsungNote4status != null) {
            if (samsungNote4status.value == "5" || samsungNote4status.value == "6") {
                samsungNote4FedEx.value = "";
                samsungNote4ddate.value = '1/1/1900';
            }
            else if (samsungNote4status.value != "14") {
                samsungNote4Comments.value = "";
                samsungNote4FedEx.value = "";
                samsungNote4ddate.value = '1/1/1900';
            }
        }
        if (iPhone6status != null) {
            if (iPhone6status.value == "5" || iPhone6status.value == "6") {
                iPhone6FedEx.value = "";
                iPhone6ddate.value = '1/1/1900';
            }
            else if (iPhone6status.value != "14") {
                iPhone6Comments.value = "";
                iPhone6FedEx.value = "";
                iPhone6ddate.value = '1/1/1900';
            }
        }
        if (iPhone6Pstatus != null) {
            if (iPhone6Pstatus.value == "5" || iPhone6Pstatus.value == "6") {
                iPhone6PFedEx.value = "";
                iPhone6Pddate.value = '1/1/1900';
            }
            else if (iPhone6Pstatus.value != "14") {
                iPhone6PComments.value = "";
                iPhone6PFedEx.value = "";
                iPhone6Pddate.value = '1/1/1900';
            }
        }

        if (lgg3status != null) {
            if (lgg3status.value == "5" || lgg3status.value == "6") {
                lgg3FedEx.value = "";
                lgg3ddate.value = '1/1/1900';
            }
            else if (lgg3status.value != "14") {
                lgg3Comments.value = "";
                lgg3PFedEx.value = "";
                lgg3ddate.value = '1/1/1900';
            }
        }
        if (samsungS632GBstatus != null) {
            if (samsungS632GBstatus.value == "5" || samsungS632GBstatus.value == "6") {
                samsungS632GBFedEx.value = "";
                samsungS632GBddate.value = '1/1/1900';
            }
            else if (samsungS632GBstatus.value != "14") {
                samsungS632GBComments.value = "";
                samsungS632GBFedEx.value = "";
                samsungS632GBddate.value = '1/1/1900';
            }
        }
        if (samsungS664GBstatus != null) {
            if (samsungS664GBstatus.value == "5" || samsungS664GBstatus.value == "6") {
                samsungS664GBFedEx.value = "";
                samsungS664GBddate.value = '1/1/1900';
            }
            else if (samsungS664GBstatus.value != "14") {
                samsungS664GBComments.value = "";
                samsungS664GBFedEx.value = "";
                samsungS664GBddate.value = '1/1/1900';
            }
        }
 
        if (samsungS6128GBstatus != null) {
            if (samsungS6128GBstatus.value == "5" || samsungS6128GBstatus.value == "6") {
                samsungS6128GBFedEx.value = "";
                samsungS6128GBddate.value = '1/1/1900';
            }
            else if (samsungS6128GBstatus.value != "14") {
                samsungS6128GBComments.value = "";
                samsungS6128GBFedEx.value = "";
                samsungS6128GBddate.value = '1/1/1900';
            }
        }
        if (samsungS6Edge32GBstatus != null) {
            if (samsungS6Edge32GBstatus.value == "5" || samsungS6Edge32GBstatus.value == "6") {
                samsungS6Edge32GBFedEx.value = "";
                samsungS6Edge32GBddate.value = '1/1/1900';
            }
            else if (samsungS6Edge32GBstatus.value != "14") {
                samsungS6Edge32GBComments.value = "";
                samsungS6Edge32GBFedEx.value = "";
                samsungS6Edge32GBddate.value = '1/1/1900';
            }
        }
        if (samsungS6Edge64GBstatus != null) {
            if (samsungS6Edge64GBstatus.value == "5" || samsungS6Edge32GBstatus.value == "6") {
                samsungS6Edge64GBFedEx.value = "";
                samsungS6Edge64GBddate.value = '1/1/1900';
            }
            else if (samsungS6Edge64GBstatus.value != "14") {
                samsungS6Edge64GBComments.value = "";
                samsungS6Edge64GBFedEx.value = "";
                samsungS6Edge64GBddate.value = '1/1/1900';
            }
        }
        if (samsungS6Edge128GBstatus != null) {
            if (samsungS6Edge128GBstatus.value == "5" || samsungS6Edge128GBstatus.value == "6") {
                samsungS6Edge128GBFedEx.value = "";
                samsungS6Edge128GBddate.value = '1/1/1900';
            }
            else if (samsungS6Edge128GBstatus.value != "14") {
                samsungS6Edge128GBComments.value = "";
                samsungS6Edge128GBFedEx.value = "";
                samsungS6Edge128GBddate.value = '1/1/1900';
            }
        }
        
        if (laptopAssetTrackingID != null) {
            laptopAssetTrackingIDValue = laptopAssetTrackingID.value;
        }
        else {
            laptopAssetTrackingIDValue = "";
        }
        if (cellAssetTrackingID != null) {
            cellAssetTrackingIDValue = cellAssetTrackingID.value;
        }
        else {
            cellAssetTrackingIDValue = "";
        }
        if (bbAssetTrackingID != null) {
            bbAssetTrackingIDValue = bbAssetTrackingID.value;
        }
        else {
            bbAssetTrackingIDValue = "";
        }
        if (ceAssetTrackingID != null) {
            ceAssetTrackingIDValue = ceAssetTrackingID.value;
        }
        else {
            ceAssetTrackingIDValue = "";
        }
        if (dcAssetTrackingID != null) {
            dcAssetTrackingIDValue = dcAssetTrackingID.value;
        }
        else {
            dcAssetTrackingIDValue = "";
        }
        if (z10AssetTrackingID != null) {
            Z10AssetTrackingIdValue = z10AssetTrackingID.value;
        }
        else {
            Z10AssetTrackingIdValue = "";
        }
        if (q10AssetTrackingID != null) {
            Q10AssetTrackingIdValue = q10AssetTrackingID.value;
        }
        else {
            Q10AssetTrackingIdValue = "";
        }
        if (samsungS3AssetTrackingID != null) {
            SamsungS3AssetTrackingIdValue = samsungS3AssetTrackingID.value;
        }
        else {
            SamsungS3AssetTrackingIdValue = "";
        }
        if (samsungS4AssetTrackingID != null) {
            SamsungS4AssetTrackingIdValue = samsungS4AssetTrackingID.value;
        }
        else {
            SamsungS4AssetTrackingIdValue = "";
        }
        if (samsungS5AssetTrackingID != null) {
            SamsungS5AssetTrackingIdValue = samsungS5AssetTrackingID.value;
        }
        else {
            SamsungS5AssetTrackingIdValue = "";
        }
        if (iPhone4SAssetTrackingID != null) {
            IPhone4SAssetTrackingIdValue= iPhone4SAssetTrackingID.value;
        }
        else {
            IPhone4SAssetTrackingIdValue= "";
        }
        if (iPhone5CAssetTrackingID != null) {
            IPhone5CAssetTrackingIdValue = iPhone5CAssetTrackingID.value;
        }
        else {
            IPhone5CAssetTrackingIdValue = "";
        }
        if (iPhone5SAssetTrackingID != null) {
            IPhone5SAssetTrackingIdValue = iPhone5SAssetTrackingID.value;
        }
        else {
            IPhone5SAssetTrackingIdValue = "";
        }
        if (lgg2AssetTrackingID != null) {
            lgg2AssetTrackingIdValue = lgg2AssetTrackingID.value;
        }
        else {
            lgg2AssetTrackingIdValue = "";
        }
        if (samsungNote3AssetTrackingID != null) {
            samsungNote3AssetTrackingIdValue = samsungNote3AssetTrackingID.value;
        }
        else {
            samsungNote3AssetTrackingIdValue = "";
        }
        if (samsungNote4AssetTrackingID != null) {
            samsungNote4AssetTrackingIdValue = samsungNote4AssetTrackingID.value;
        }
        else {
            samsungNote4AssetTrackingIdValue = "";
        }
        if (iPhone6AssetTrackingID != null) {
            iPhone6AssetTrackingIdValue = iPhone6AssetTrackingID.value;
        }
        else {
            iPhone6AssetTrackingIdValue = "";
        }
        if (iPhone6PAssetTrackingID != null) {
            iPhone6PAssetTrackingIdValue = iPhone6PAssetTrackingID.value;
        }
        else {
            iPhone6PAssetTrackingIdValue = "";
        }

        if (lgg3AssetTrackingID != null) {
            lgg3AssetTrackingIdValue = lgg3AssetTrackingID.value;
        }
        else {
            lgg3AssetTrackingIdValue = "";
        }

        if (samsungS632GBAssetTrackingID != null) {
            samsungS632GBAssetTrackingIdValue = samsungS632GBAssetTrackingID.value;
        }
        else {
            samsungS632GBAssetTrackingIdValue = "";
        }

        if (samsungS664GBAssetTrackingID != null) {
            samsungS664GBAssetTrackingIdValue = samsungS664GBAssetTrackingID.value;
        }
        else {
            samsungS664GBAssetTrackingIdValue = "";
        }
        if (samsungS6128GBAssetTrackingID != null) {
            samsungS6128GBAssetTrackingIdValue = samsungS6128GBAssetTrackingID.value;
        }
        else {
            samsungS6128GBAssetTrackingIdValue = "";
        }
        if (samsungS6Edge32GBAssetTrackingID != null) {
            samsungS6Edge32GBAssetTrackingIdValue = samsungS6Edge32GBAssetTrackingID.value;
        }
        else {
            samsungS6Edge32GBAssetTrackingIdValue = "";
        }
        if (samsungS6Edge64GBAssetTrackingID != null) {
            samsungS6Edge64GBAssetTrackingIdValue = samsungS6Edge64GBAssetTrackingID.value;
        }
        else {
            samsungS6Edge64GBAssetTrackingIdValue = "";
        }
        if (samsungS6Edge128GBAssetTrackingID != null) {
            samsungS6Edge128GBAssetTrackingIdValue = samsungS6Edge128GBAssetTrackingID.value;
        }
        else {
            samsungS6Edge128GBAssetTrackingIdValue = "";
        }


        if (laptopstatus != null) {
            laptopstatusValue = laptopstatus.value;
        }
        else {
            laptopstatusValue = "";
        }
        if (cellstatus != null) {
            cellstatusValue = cellstatus.value;
        }
        else {
            cellstatusValue = "";
        }
        if (bbstatus != null) {
            bbstatusValue = bbstatus.value;
        }
        else {
            bbstatusValue = "";
        }
        if (cestatus != null) {
            cestatusValue = cestatus.value;
        }
        else {
            cestatusValue = "";
        }
        if (dcstatus != null) {
            dcstatusValue = dcstatus.value;
        }
        else {
            dcstatusValue = "";
        }
        if (z10status != null) {
            Z10statusValue = z10status.value;
        }
        else {
            Z10statusValue = "";
        }
        if (q10status != null) {
            Q10statusValue = q10status.value;
        }
        else {
            Q10statusValue = "";
        }
        if (samsungS3status != null) {
            SamsungS3statusValue = samsungS3status.value;
        }
        else {
            SamsungS3statusValue = "";
        }
        if (samsungS4status != null) {
            SamsungS4statusValue = samsungS4status.value;
        }
        else {
            SamsungS4statusValue = "";
        }
        if (samsungS5status != null) {
            SamsungS5statusValue = samsungS5status.value;
        }
        else {
            SamsungS5statusValue = "";
        }
        if (iPhone4Sstatus != null) {
            IPhone4SstatusValue = iPhone4Sstatus.value;
        }
        else {
            IPhone4SstatusValue= "";
        }
        if (iPhone5Sstatus != null) {
            IPhone5SstatusValue = iPhone5Sstatus.value;
        }
        else {
            IPhone5SstatusValue = "";
        }
        if (iPhone5Cstatus != null) {
            IPhone5CstatusValue = iPhone5Cstatus.value;
        }
        else {
            IPhone5CstatusValue = "";
        }
        if (lgg2status != null) {
            lgg2statusValue = lgg2status.value;
        }
        else {
            lgg2statusValue = "";
        }
        if (samsungNote3status != null) {
            samsungNote3statusValue = samsungNote3status.value;
        }
        else {
            samsungNote3statusValue = "";
        }
        if (samsungNote4status != null) {
            samsungNote4statusValue = samsungNote4status.value;
        }
        else {
            samsungNote4statusValue = "";
        }
        if (iPhone6status != null) {
            iPhone6statusValue = iPhone6status.value;
        }
        else {
            iPhone6statusValue = "";
        }
        if (iPhone6Pstatus != null) {
            iPhone6PstatusValue = iPhone6Pstatus.value;
        }
        else {
            iPhone6PstatusValue = "";
        }
  
        if (lgg3status != null) {
            lgg3statusValue = lgg3status.value;
        }
        else {
            lgg3statusValue = "";
        }
        if (samsungS632GBstatus != null) {
            samsungS632GBstatusValue = samsungS632GBstatus.value;
        }
        else {
            samsungS632GBstatusValue = "";
        }
        if (samsungS664GBstatus != null) {
            samsungS664GBstatusValue = samsungS664GBstatus.value;
        }
        else {
            samsungS664GBstatusValue = "";
        }
        if (samsungS6128GBstatus != null) {
            samsungS6128GBstatusValue = samsungS6128GBstatus.value;
        }
        else {
            samsungS6128GBstatusValue = "";
        }
        if (samsungS6Edge32GBstatus != null) {
            samsungS6Edge32GBstatusValue = samsungS6Edge32GBstatus.value;
        }
        else {
            samsungS6Edge32GBstatusValue = "";
        }
        if (samsungS6Edge64GBstatus != null) {
            samsungS6Edge64GBstatusValue = samsungS6Edge64GBstatus.value;
        }
        else {
            samsungS6Edge64GBstatusValue = "";
        }
        if (samsungS6Edge128GBstatus != null) {
            samsungS6Edge128GBstatusValue = samsungS6Edge128GBstatus.value;
        }
        else {
            samsungS6Edge128GBstatusValue = "";
        }  

        if (laptopcomments != null) {
            laptopcommentsValue = laptopcomments.value;
        }
        else {
            laptopcommentsValue = "";
        }
        if (cellcomments != null) {
            cellcommentsValue = cellcomments.value;
        }
        else {
            cellcommentsValue = "";
        }
        if (bbcomments != null) {
            bbcommentsValue = bbcomments.value;
        }
        else {
            bbcommentsValue = "";
        }
        if (cecomments != null) {
            cecommentsValue = cecomments.value;
        }
        else {
            cecommentsValue = "";
        }
        if (dccomments != null) {
            dccommentsValue = dccomments.value;
        }
        else {
            dccommentsValue = "";
        }
        if (z10Comments != null) {
            Z10CommentsValue = z10Comments.value;
        }
        else {
            Z10CommentsValue = "";
        }
        if (q10Comments != null) {
            Q10CommentsValue = q10Comments.value;
        }
        else {
            Q10CommentsValue = "";
        }
        if (samsungS3Comments != null) {
            SamsungS3CommentsValue = samsungS3Comments.value;
        }
        else {
            SamsungS3CommentsValue = "";
        }
        if (samsungS4Comments != null) {
            SamsungS4CommentsValue = samsungS4Comments.value;
        }
        else {
            SamsungS4CommentsValue = "";
        }
        if (samsungS5Comments != null) {
            SamsungS5CommentsValue = samsungS5Comments.value;
        }
        else {
            SamsungS5CommentsValue = "";
        }
        if (iPhone4SComments != null) {
            IPhone4SCommentsValue = iPhone4SComments.value;
        }
        else {
            IPhone4SCommentsValue = "";
        }
        if (iPhone5SComments != null) {
            IPhone5SCommentsValue = iPhone5SComments.value;
        }
        else {
            IPhone5SCommentsValue = "";
        }
        if (iPhone5CComments != null) {
            IPhone5CCommentsValue = iPhone5CComments.value;
        }
        else {
            IPhone5CCommentsValue = "";
        }
        if (lgg2Comments != null) {
            lgg2CommentsValue = lgg2Comments.value;
        }
        else {
            lgg2CommentsValue = "";
        }
        if (samsungNote3Comments != null) {
            samsungNote3CommentsValue = samsungNote3Comments.value;
        }
        else {
            samsungNote3CommentsValue = "";
        }
        if (samsungNote4Comments != null) {
            samsungNote4CommentsValue = samsungNote4Comments.value;
        }
        else {
            samsungNote4CommentsValue = "";
        }
        if (iPhone6Comments != null) {
            iPhone6CommentsValue = iPhone6Comments.value;
        }
        else {
            iPhone6CommentsValue = "";
        }
        if (iPhone6PComments != null) {
            iPhone6PCommentsValue = iPhone6PComments.value;
        }
        else {
            iPhone6PCommentsValue = "";
        }
        if (lgg3Comments != null) {
            lgg3CommentsValue = lgg3Comments.value;
        }
        else {
            lgg3CommentsValue = "";
        }
        if (samsungS632GBComments != null) {
            samsungS632GBCommentsValue = samsungS632GBComments.value;
        }
        else {
            samsungS632GBCommentsValue = "";
        }
        if (samsungS664GBComments != null) {
            samsungS664GBCommentsValue = samsungS664GBComments.value;
        }
        else {
            samsungS664GBCommentsValue = "";
        }
        if (samsungS6128GBComments != null) {
            samsungS6128GBCommentsValue = samsungS6128GBComments.value;
        }
        else {
            samsungS6128GBCommentsValue = "";
        }
        if (samsungS6Edge32GBComments != null) {
            samsungS6Edge32GBCommentsValue = samsungS6Edge32GBComments.value;
        }
        else {
            samsungS6Edge32GBCommentsValue = "";
        }
        if (samsungS6Edge64GBComments != null) {
            samsungS6Edge64GBCommentsValue = samsungS6Edge64GBComments.value;
        }
        else {
            samsungS6Edge64GBCommentsValue = "";
        }
        if (samsungS6Edge128GBComments != null) {
            samsungS6Edge128GBCommentsValue = samsungS6Edge128GBComments.value;
        }
        else {
            samsungS6Edge128GBCommentsValue = "";
        }

        if (laptopFedex != null) {
            laptopFedexValue = laptopFedex.value;
        }
        else {
            laptopFedexValue = "";
        }
        if (cellFedex != null) {
            cellFedexValue = cellFedex.value;
        }
        else {
            cellFedexValue = "";
        }
        if (bbFedex != null) {
            bbFedexValue = bbFedex.value;
        }
        else {
            bbFedexValue = "";
        }
        if (ceFedex != null) {
            ceFedexValue = ceFedex.value;
        }
        else {
            ceFedexValue = "";
        }
        if (dcFedex != null) {
            dcFedexValue = dcFedex.value;
        }
        else {
            dcFedexValue = "";
        }
        if (z10FedEx != null) {
            Z10FedExValue = z10FedEx.value;
        }
        else {
            Z10FedExValue = "";
        }
        if (q10FedEx != null) {
            Q10FedExValue = q10FedEx.value;
        }
        else {
            Q10FedExValue = "";
        }
        if (samsungS3FedEx != null) {
            SamsungS3FedExValue = samsungS3FedEx.value;
        }
        else {
            SamsungS3FedExValue = "";
        }
        if (samsungS4FedEx != null) {
            SamsungS4FedExValue = samsungS4FedEx.value;
        }
        else {
            SamsungS4FedExValue = "";
        }
        if (samsungS5FedEx != null) {
            SamsungS5FedExValue = samsungS5FedEx.value;
        }
        else {
            SamsungS5FedExValue = "";
        }
        if (iPhone4SFedEx != null) {
            IPhone4SFedExValue = iPhone4SFedEx.value;
        }
        else {
            IPhone4SFedExValue = "";
        }
        if (iPhone5SFedEx != null) {
            IPhone5SFedExValue = iPhone5SFedEx.value;
        }
        else {
            IPhone5SFedExValue = "";
        }
        if (iPhone5CFedEx != null) {
            IPhone5CFedExValue = iPhone5CFedEx.value;
        }
        else {
            IPhone5CFedExValue = "";
        }
        if (lgg2FedEx != null) {
            lgg2FedExValue = lgg2FedEx.value;
        }
        else {
            lgg2FedExValue = "";
        }
        if (samsungNote3FedEx != null) {
            samsungNote3FedExValue = samsungNote3FedEx.value;
        }
        else {
            samsungNote3FedExValue = "";
        }
        if (samsungNote4FedEx != null) {
            samsungNote4FedExValue = samsungNote4FedEx.value;
        }
        else {
            samsungNote4FedExValue = "";
        }
        if (iPhone6FedEx != null) {
            iPhone6FedExValue = iPhone6FedEx.value;
        }
        else {
            iPhone6FedExValue = "";
        }
        if (iPhone6PFedEx != null) {
            iPhone6PFedExValue = iPhone6PFedEx.value;
        }
        else {
            iPhone6PFedExValue = "";
        }
        if (lgg3FedEx != null) {
            lgg3FedExValue = lgg3FedEx.value;
        }
        else {
            lgg3FedExValue = "";
        }
        if (samsungS632GBFedEx != null) {
            samsungS632GBFedExValue = samsungS632GBFedEx.value;
        }
        else {
            samsungS632GBFedExValue = "";
        }
        if (samsungS664GBFedEx != null) {
            samsungS664GBFedExValue = samsungS664GBFedEx.value;
        }
        else {
            samsungS664GBFedExValue = "";
        }
        if (samsungS6128GBFedEx != null) {
            samsungS6128GBFedExValue = samsungS6128GBFedEx.value;
        }
        else {
            samsungS6128GBFedExValue = "";
        }
        if (samsungS6Edge32GBFedEx != null) {
            samsungS6Edge32GBFedExValue = samsungS6Edge32GBFedEx.value;
        }
        else {
            samsungS6Edge32GBFedExValue = "";
        }
        if (samsungS6Edge64GBFedEx != null) {
            samsungS6Edge64GBFedExValue = samsungS6Edge64GBFedEx.value;
        }
        else {
            samsungS6Edge64GBFedExValue = "";
        }
        if (samsungS6Edge128GBFedEx != null) {
            samsungS6Edge128GBFedExValue = samsungS6Edge128GBFedEx.value;
        }
        else {
            samsungS6Edge128GBFedExValue = "";
        }

        if (laptopddate != null) {
            laptopddateValue = laptopddate.value;
        }
        else {
            laptopddateValue = "";
        }
        if (cellddate != null) {
            cellddateValue = cellddate.value;
        }
        else {
            cellddateValue = "";
        }
        if (bbddate != null) {
            bbddateValue = bbddate.value;
        }
        else {
            bbddateValue = "";
        }
        if (ceddate != null) {
            ceddateValue = ceddate.value;
        }
        else {
            ceddateValue = "";
        }
        if (dcddate != null) {
            dcddateValue = dcddate.value;
        }
        else {
            dcddateValue = "";
        }
        if (z10ddate != null) {
            Z10ddateValue = z10ddate.value;
        }
        else {
            Z10ddateValue = "";
        }
        if (q10ddate != null) {
            Q10ddateValue = q10ddate.value;
        }
        else {
            Q10ddateValue = "";
        }
        if (samsungS3ddate != null) {
            SamsungS3ddateValue = samsungS3ddate.value;
        }
        else {
            SamsungS3ddateValue = "";
        }
        if (samsungS4ddate != null) {
            SamsungS4ddateValue = samsungS4ddate.value;
        }
        else {
            SamsungS4ddateValue = "";
        }
        if (samsungS5ddate != null) {
            SamsungS5ddateValue = samsungS5ddate.value;
        }
        else {
            SamsungS5ddateValue = "";
        }
        if (iPhone4Sddate != null) {
            IPhone4SddateValue = iPhone4Sddate.value;
        }
        else {
            IPhone4SddateValue = "";
        }
        if (iPhone5Sddate != null) {
            IPhone5SddateValue = iPhone5Sddate.value;
        }
        else {
            IPhone5SddateValue = "";
        }
        if (iPhone5Cddate != null) {
            IPhone5CddateValue = iPhone5Cddate.value;
        }
        else {
            IPhone5CddateValue = "";
        }
        if (lgg2ddate != null) {
            lgg2ddateValue = lgg2ddate.value;
        }
        else {
            lgg2ddateValue = "";
        }
        if (samsungNote3ddate != null) {
            samsungNote3ddateValue = samsungNote3ddate.value;
        }
        else {
            samsungNote3ddateValue = "";
        }
        if (samsungNote4ddate != null) {
            samsungNote4ddateValue = samsungNote4ddate.value;
        }
        else {
            samsungNote4ddateValue = "";
        }
        if (iPhone6ddate != null) {
            iPhone6ddateValue = iPhone6ddate.value;
        }
        else {
            iPhone6ddateValue = "";
        }
        if (iPhone6Pddate != null) {
            iPhone6PddateValue = iPhone6Pddate.value;
        }
        else {
            iPhone6PddateValue = "";
        }

        if (lgg3ddate != null) {
            lgg3ddateValue = lgg3ddate.value;
        }
        else {
            lgg3ddateValue = "";
        }
        if (samsungS632GBddate != null) {
            samsungS632GBddateValue = samsungS632GBddate.value;
        }
        else {
            samsungS632GBddateValue = "";
        }
        if (samsungS664GBddate != null) {
            samsungS664GBddateValue = samsungS664GBddate.value;
        }
        else {
            samsungS664GBddateValue = "";
        }
        if (samsungS6128GBddate != null) {
            samsungS6128GBddateValue = samsungS6128GBddate.value;
        }
        else {
            samsungS6128GBddateValue = "";
        }
        if (samsungS6Edge32GBddate != null) {
            samsungS6Edge32GBddateValue = samsungS6Edge32GBddate.value;
        }
        else {
            samsungS6Edge32GBddateValue = "";
        }
        if (samsungS6Edge64GBddate != null) {
            samsungS6Edge64GBddateValue = samsungS6Edge64GBddate.value;
        }
        else {
            samsungS6Edge64GBddateValue = "";
        }
        if (samsungS6Edge128GBddate != null) {
            samsungS6Edge128GBddateValue = samsungS6Edge128GBddate.value;
        }
        else {
            samsungS6Edge128GBddateValue = "";
        }

          //var inputData = '{"laptopAssetTrackingID":"' + laptopAssetTrackingIDValue + '","cellAssetTrackingID" : "' + cellAssetTrackingIDValue + '","bbryAssetTrackingID" :"' + bbAssetTrackingIDValue + '","ceqpAssetTrackingID" :"' + ceAssetTrackingIDValue + '","dcardAssetTrackingID" :"' + dcAssetTrackingIDValue + '","laptopstatus" : "' + laptopstatusValue + '","cellstatus":"' + cellstatusValue + '","bbstatus" : "' + bbstatusValue + '","cestatus" : "' + cestatusValue + '","dcstatus" : "' + dcstatusValue + '","laptopcomments" : "' + laptopcommentsValue + '","cellcomments" : "' + cellcommentsValue + '","bbcomments" : "' + bbcommentsValue + '","cecomments" : "' + cecommentsValue + '","dccomments" : "' + dccommentsValue + '","laptopFedex" : "' + laptopFedexValue + '","cellFedex" : "' + cellFedexValue + '","bbryFedex" : "' + bbFedexValue + '","ceqpFedex" : "' + ceFedexValue + '","dcardFedex" : "' + dcFedexValue + '","laptopddate" : "' + laptopddateValue + '","cellddate" : "' + cellddateValue + '","bbddate" : "' + bbddateValue + '","ceddate" : "' + ceddateValue + '","dcddate" : "' + dcddateValue + '","z10AssetTrackingID" : "' + Z10AssetTrackingIdValue + '","q10AssetTrackingID" : "' + Q10AssetTrackingIdValue + '","samsungS3AssetTrackingID" : "' + SamsungS3AssetTrackingIdValue + '","samsungS4AssetTrackingID" : "' + SamsungS4AssetTrackingIdValue + '","samsungS5AssetTrackingID" : "' + SamsungS5AssetTrackingIdValue + '","iphone4SAssetTrackingID" : "' + IPhone4SAssetTrackingIdValue + '","iphone5SAssetTrackingID" : "' + IPhone5SAssetTrackingIdValue + '","iphone5CAssetTrackingID" : "' + IPhone5CAssetTrackingIdValue + '","lgg2AssetTrackingID" : "' + lgg2AssetTrackingIdValue + '","samsungNote3AssetTrackingID" : "' + samsungNote3AssetTrackingIdValue + '","z10statusValue" : "' + Z10statusValue + '","q10statusValue" : "' + Q10statusValue + '","samsungS3statusValue" : "' + SamsungS3statusValue + '","samsungS4statusValue" : "' + SamsungS4statusValue + '","samsungS5statusValue" : "' + SamsungS5statusValue + '","iphone4SstatusValue" : "' + IPhone4SstatusValue + '","iphone5SstatusValue" : "' + IPhone5SstatusValue + '","iphone5CstatusValue" : "' + IPhone5CstatusValue + '","lgg2statusValue" : "' + lgg2statusValue + '","samsungNote3statusValue" : "' + samsungNote3statusValue + '","z10CommentsValue" : "' + Z10CommentsValue + '","q10CommentsValue" : "' + Q10CommentsValue + '","samsungS3CommentsValue" : "' + SamsungS3CommentsValue + '","samsungS4CommentsValue" : "' + SamsungS4CommentsValue + '","samsungS5CommentsValue" : "' + SamsungS5CommentsValue + '","iphone4SCommentsValue" : "' + IPhone4SCommentsValue + '","iphone5SCommentsValue" : "' + IPhone5SCommentsValue + '","iphone5CCommentsValue" : "' + IPhone5CCommentsValue + '","lgg2CommentsValue" : "' + lgg2CommentsValue + '","samsungNote3CommentsValue" : "' + samsungNote3CommentsValue + '","z10FedExValue" : "' + Z10FedExValue + '","q10FedExValue" : "' + Q10FedExValue + '","samsungS3FedExValue" : "' + SamsungS3FedExValue + '","samsungS4FedExValue" : "' + SamsungS4FedExValue + '","samsungS5FedExValue" : "' + SamsungS5FedExValue + '","iphone4SFedExValue" : "' + IPhone4SFedExValue + '","iphone5SFedExValue" : "' + IPhone5SFedExValue + '","iphone5CFedExValue" : "' + IPhone5CFedExValue + '","lgg2FedExValue" : "' + lgg2FedExValue + '","samsungNote3FedExValue" : "' + samsungNote3FedExValue + '","z10ddateValue" : "' + Z10ddateValue + '","q10ddateValue" : "' + Q10ddateValue + '","samsungS3ddateValue" : "' + SamsungS3ddateValue + '","samsungS4ddateValue" : "' + SamsungS4ddateValue + '","samsungS5ddateValue" : "' + SamsungS5ddateValue + '","iphone4SddateValue" : "' + IPhone4SddateValue + '","iphone5SddateValue" : "' + IPhone5SddateValue + '","iphone5CddateValue" : "' + IPhone5CddateValue + '","lgg2ddateValue" : "' + lgg2ddateValue + '","samsungNote3ddateValue" : "' + samsungNote3ddateValue + '"}';
        var inputData = '{"laptopAssetTrackingID":"' + laptopAssetTrackingIDValue + '","cellAssetTrackingID" : "' + cellAssetTrackingIDValue + '","bbryAssetTrackingID" :"' + bbAssetTrackingIDValue + '","ceqpAssetTrackingID" :"' + ceAssetTrackingIDValue + '","dcardAssetTrackingID" :"' + dcAssetTrackingIDValue + '","laptopstatus" : "' + laptopstatusValue + '","cellstatus":"' + cellstatusValue + '","bbstatus" : "' + bbstatusValue + '","cestatus" : "' + cestatusValue + '","dcstatus" : "' + dcstatusValue + '","laptopcomments" : "' + laptopcommentsValue + '","cellcomments" : "' + cellcommentsValue + '","bbcomments" : "' + bbcommentsValue + '","cecomments" : "' + cecommentsValue + '","dccomments" : "' + dccommentsValue + '","laptopFedex" : "' + laptopFedexValue + '","cellFedex" : "' + cellFedexValue + '","bbryFedex" : "' + bbFedexValue + '","ceqpFedex" : "' + ceFedexValue + '","dcardFedex" : "' + dcFedexValue + '","laptopddate" : "' + laptopddateValue + '","cellddate" : "' + cellddateValue + '","bbddate" : "' + bbddateValue + '","ceddate" : "' + ceddateValue + '","dcddate" : "' + dcddateValue + '","z10AssetTrackingID" : "' + Z10AssetTrackingIdValue + '","q10AssetTrackingID" : "' + Q10AssetTrackingIdValue + '","samsungS3AssetTrackingID" : "' + SamsungS3AssetTrackingIdValue + '","samsungS4AssetTrackingID" : "' + SamsungS4AssetTrackingIdValue + '","samsungS5AssetTrackingID" : "' + SamsungS5AssetTrackingIdValue + '","iphone4SAssetTrackingID" : "' + IPhone4SAssetTrackingIdValue + '","iphone5SAssetTrackingID" : "' + IPhone5SAssetTrackingIdValue + '","iphone5CAssetTrackingID" : "' + IPhone5CAssetTrackingIdValue + '","lgg2AssetTrackingID" : "' + lgg2AssetTrackingIdValue + '","samsungNote3AssetTrackingID" : "' + samsungNote3AssetTrackingIdValue + '","samsungNote4AssetTrackingID" : "' + samsungNote4AssetTrackingIdValue + '","iPhone6AssetTrackingID" : "' + iPhone6AssetTrackingIdValue + '","iPhone6PAssetTrackingID" : "' + iPhone6PAssetTrackingIdValue + '","lgg3AssetTrackingID" : "' + lgg3AssetTrackingIdValue + '","samsungS632GBAssetTrackingID" : "' + samsungS632GBAssetTrackingIdValue + '","samsungS664GBAssetTrackingID" : "' + samsungS664GBAssetTrackingIdValue + '","samsungS6128GBAssetTrackingID" : "' + samsungS6128GBAssetTrackingIdValue + '","samsungS6Edge32GBAssetTrackingID" : "' + samsungS6Edge32GBAssetTrackingIdValue + '","samsungS6Edge64GBAssetTrackingID" : "' + samsungS6Edge64GBAssetTrackingIdValue + '","samsungS6Edge128GBAssetTrackingID" : "' + samsungS6Edge128GBAssetTrackingIdValue +
          '","z10statusValue" : "' + Z10statusValue + '","q10statusValue" : "' + Q10statusValue + '","samsungS3statusValue" : "' + SamsungS3statusValue + '","samsungS4statusValue" : "' + SamsungS4statusValue + '","samsungS5statusValue" : "' + SamsungS5statusValue + '","iphone4SstatusValue" : "' + IPhone4SstatusValue + '","iphone5SstatusValue" : "' + IPhone5SstatusValue + '","iphone5CstatusValue" : "' + IPhone5CstatusValue + '","lgg2statusValue" : "' + lgg2statusValue + '","samsungNote3statusValue" : "' + samsungNote3statusValue + '","samsungNote4statusValue" : "' + samsungNote4statusValue + '","iPhone6statusValue" : "' + iPhone6statusValue + '","iPhone6PstatusValue" : "' + iPhone6PstatusValue
          + '","lgg3statusValue" : "' + lgg3statusValue
          + '","samsungS632GBstatusValue" : "' + samsungS632GBstatusValue
          + '","samsungS664GBstatusValue" : "' + samsungS664GBstatusValue
          + '","samsungS6128GBstatusValue" : "' + samsungS6128GBstatusValue
          + '","samsungS6Edge32GBstatusValue" : "' + samsungS6Edge32GBstatusValue
          + '","samsungS6Edge64GBstatusValue" : "' + samsungS6Edge64GBstatusValue
          + '","samsungS6Edge128GBstatusValue" : "' + samsungS6Edge128GBstatusValue
          + '","z10CommentsValue" : "' + Z10CommentsValue + '","q10CommentsValue" : "' + Q10CommentsValue + '","samsungS3CommentsValue" : "' + SamsungS3CommentsValue + '","samsungS4CommentsValue" : "' + SamsungS4CommentsValue + '","samsungS5CommentsValue" : "' + SamsungS5CommentsValue + '","iphone4SCommentsValue" : "' + IPhone4SCommentsValue + '","iphone5SCommentsValue" : "' + IPhone5SCommentsValue + '","iphone5CCommentsValue" : "' + IPhone5CCommentsValue + '","lgg2CommentsValue" : "' + lgg2CommentsValue + '","samsungNote3CommentsValue" : "' + samsungNote3CommentsValue + '","samsungNote4CommentsValue" : "' + samsungNote4CommentsValue + '","iPhone6CommentsValue" : "' + iPhone6CommentsValue + '","iPhone6PCommentsValue" : "' + iPhone6PCommentsValue
          + '","lgg3CommentsValue" : "' + lgg3CommentsValue
          + '","samsungS632GBCommentsValue" : "' + samsungS632GBCommentsValue
          + '","samsungS664GBCommentsValue" : "' + samsungS664GBCommentsValue
          + '","samsungS6128GBCommentsValue" : "' + samsungS6128GBCommentsValue
          + '","samsungS6Edge32GBCommentsValue" : "' + samsungS6Edge32GBCommentsValue
          + '","samsungS6Edge64GBCommentsValue" : "' + samsungS6Edge64GBCommentsValue
          + '","samsungS6Edge128GBCommentsValue" : "' + samsungS6Edge128GBCommentsValue
          + '","z10FedExValue" : "' + Z10FedExValue + '","q10FedExValue" : "' + Q10FedExValue + '","samsungS3FedExValue" : "' + SamsungS3FedExValue + '","samsungS4FedExValue" : "' + SamsungS4FedExValue + '","samsungS5FedExValue" : "' + SamsungS5FedExValue + '","iphone4SFedExValue" : "' + IPhone4SFedExValue + '","iphone5SFedExValue" : "' + IPhone5SFedExValue + '","iphone5CFedExValue" : "' + IPhone5CFedExValue + '","lgg2FedExValue" : "' + lgg2FedExValue + '","samsungNote3FedExValue" : "' + samsungNote3FedExValue + '","samsungNote4FedExValue" : "' + samsungNote4FedExValue + '","iPhone6FedExValue" : "' + iPhone6FedExValue + '","iPhone6PFedExValue" : "' + iPhone6PFedExValue
          + '","lgg3FedExValue" : "' + lgg3FedExValue
          + '","samsungS632GBFedExValue" : "' + samsungS632GBFedExValue
          + '","samsungS664GBFedExValue" : "' + samsungS664GBFedExValue
          + '","samsungS6128GBFedExValue" : "' + samsungS6128GBFedExValue
          + '","samsungS6Edge32GBFedExValue" : "' + samsungS6Edge32GBFedExValue
          + '","samsungS6Edge64GBFedExValue" : "' + samsungS6Edge64GBFedExValue
          + '","samsungS6Edge128GBFedExValue" : "' + samsungS6Edge128GBFedExValue
          + '","z10ddateValue" : "' + Z10ddateValue + '","q10ddateValue" : "' + Q10ddateValue + '","samsungS3ddateValue" : "' + SamsungS3ddateValue + '","samsungS4ddateValue" : "' + SamsungS4ddateValue + '","samsungS5ddateValue" : "' + SamsungS5ddateValue + '","iphone4SddateValue" : "' + IPhone4SddateValue + '","iphone5SddateValue" : "' + IPhone5SddateValue + '","iphone5CddateValue" : "' + IPhone5CddateValue + '","lgg2ddateValue" : "' + lgg2ddateValue + '","samsungNote3ddateValue" : "' + samsungNote3ddateValue + '","samsungNote4ddateValue" : "' + samsungNote4ddateValue + '","iPhone6ddateValue" : "' + iPhone6ddateValue + '","iPhone6PddateValue" : "' + iPhone6PddateValue
          + '","lgg3ddateValue" : "' + lgg3ddateValue
          + '","samsungS632GBddateValue" : "' + samsungS632GBddateValue
          + '","samsungS664GBddateValue" : "' + samsungS664GBddateValue
          + '","samsungS6128GBddateValue" : "' + samsungS6128GBddateValue
          + '","samsungS6Edge32GBddateValue" : "' + samsungS6Edge32GBddateValue
          + '","samsungS6Edge64GBddateValue" : "' + samsungS6Edge64GBddateValue
          + '","samsungS6Edge128GBddateValue" : "' + samsungS6Edge128GBddateValue 
          + '"}';
        $.ajax({
            type: "POST",
            url: "NSSDashBoard.aspx/UpdatePersonalData",
            data: inputData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: AjaxSucceeded,
            error: function (xhr) {
                alert("falied");

            }
        });
        document.getElementById(getdivid).style.display = "block";
    }

    function addDatepicker(elm) {
        if ($(elm).parent().length > 0) {
            var el = $(elm).parent();
            $(el).addClass('fakePicker').css({ 'position': 'relative', 'display': 'inline-block' });
            var imgOb = $('<img/>').attr({ 'src': '../../Images/calendar.png', 'width': '19', 'height': '20', 'class': 'imgTarget' }).click(function (ev) {
                ev.stopPropagation();
                $(el).children('div').eq(0).css({ 'position': 'absolute', 'top': '-140px', 'right': '15px', 'z-index': '12' }).addClass('dateBox').show();
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
                    $(elm).removeAttr('readOnly').val(theDate).attr("readOnly", "readOnly");
                    $(el).children('div').eq(0).hide();
                }

            });
            $(el).datepicker("setDate", $(el).children()[0].value);
            $(el).children('div').eq(0).hide();

            /*hide datepicker on clicking outside it*/
            $(document).click(function (e) {
                if (!$(e.target).parents().filter('.dateBox').length) {
                    $('.dateBox').hide();
                }
            });
        } else { return false; }
    }

    function OpenPop(Url, TaskID, CandidateId, CountryId) {
        var countryId = CountryId.value;
        var sessionId = $("#hdnSessionId").val();
        var CandId = CandidateId.value;
        var openMode = 1;
        var tskid = TaskID;

        if (tskid == "67")//For Joining report
        {
            var Path = Url;
        }
        else {
            var Path = Url + '?ss=' + sessionId + '&cand=' + CandId + '&task=' + tskid + '&cntry=' + countryId + '&opmde=' + openMode;
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
            if (popupStatus == 0) {
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

    $("#prejoiningbtn_rc").click(function () {
        $("#prejoiningbtn_rc").attr('src', '../../Images/prejoiningb.png');
        $("#postjoiningbtn_rc").attr('src', '../../Images/postjoining.png');
    });
    $("#postjoiningbtn_rc").click(function () {
        $("#prejoiningbtn_rc").attr('src', '../../Images/prejoinin.png');
        $("#postjoiningbtn_rc").attr('src', '../../Images/postjoinin.png');
    });

    function ChangeCount() {
        var inputData = '{';
        inputData += "'processId':" + parseInt($('#hdnProcessId').val());
        inputData += "}";
        $.ajax({
            type: "POST",
            url: "NSSDashBoard.aspx/ChangeAssertCount",
            data: inputData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                $('#lblLaptopCnt').text(msg.d[0].LaptopCount);
                $('#lblBBCnt').text(msg.d[0].BlackberryCount);
                $('#lblCellCnt').text(msg.d[0].CellPhoneCount);
                if ($("#countrySelectBox").val() == "24" || $("#countrySelectBox").val() == "45" || $("#countrySelectBox").val() == "62" || $("#countrySelectBox").val() == "64" || $("#countrySelectBox").val() == "77" || $("#countrySelectBox").val() == "101" || $("#countrySelectBox").val() == "166" || $("#countrySelectBox").val() == "169" || $("#countrySelectBox").val() == "208") {
                    $('#lblDCCnt').text(msg.d[0].DataCardCount);
                }

            }, error: ''
        });
    }
    function ShowHideHireType() {
        if ($("#countrySelectBox").val() == "1" || $("#countrySelectBox").val() == "2") {
            GetContractorHireType(196, 1);
            //$('#lilblType').removeClass('width85').addClass('width0');
            $("#candidateHireTypeSelectBox").show();
            $("#lblHireType").show();

        }
        else if ($("#countrySelectBox").val() == 4) {
            GetContractorHireType(196, 2);
            //$('#lilblType').removeClass('width85').addClass('width0');
            $("#candidateHireTypeSelectBox").show();
            $("#lblHireType").show();
            $('#lilblHireType').show();
        }
        else {
            GetContractorHireType(196, 2);
            $("#candidateHireTypeSelectBox").hide();
            $("#lblHireType").hide();
            //$('#lilblType').removeClass('width0').addClass('width85');
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
    


</script>
</html>

<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ADMINDashBoard.aspx.cs"
    Inherits="OneC.OnBoarding.WebApp.Roles.ADMIN.ADMINDashBoard" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>HRSS Dashboard</title>
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
    <script type="text/javascript" src="../../Scripts/JQuery/jquery.alerts.js"></script>
    <link href="../../Styles/jquery.alerts.css" rel="stylesheet" type="text/css" media="screen" />
    <%-- <script language="javascript" src="../../Scripts/JQuery/jquery-ui.min.js" type="text/javascript"></script>
<script language="javascript" src="../../Scripts/JQuery/jquery.min.js" type="text/javascript"></script>--%>
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
    <form id="Form1" runat="server">
    <div id="main_rc">
        <div class="header_rc">
            <div class="onboarding_rc width160 marginL10">
                <p>
                    On Boarding
                </p>
            </div>
            <div class="icon_rc marginTL10">
                <ul>
                    <li style="display: none"><a href="#" title="Grid View">
                        <img src="../../Images/grid.png" alt="Grid View" />
                        Grid View</a></li>
                    <li style="display: none">
                        <img src="../../Images/refresh.png" alt="refresh" title="Refresh" /></li>
                    <li>
                        <asp:ImageButton runat="server" ImageUrl="~/Images/excel.png" ID="ExportImageButton"
                            title="Excel" OnClick="ExportButton_Click" CssClass="ExportExcel" />
                    </li>
                </ul>
            </div>
        </div>
        <div class="search_rc">
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
                            maxlength="15" /></li>
                    <li>
                        <label for="name">
                            Name
                        </label>
                        <input type="text" class="tb_rc" id="CandidateNameInputBox" /></li>
                    <li>
                        <label for="country">
                            Location
                        </label>
                        <select class="tb_rc" id="LocationInputBox">
                        </select></li>
                    <li>
                        <label for="country">
                            Status
                        </label>
                        <select class="tb_rc" id="statusSelectBox" style="width: auto">
                        </select></li>
                </ul>
                <ul>
                    <li id="Type">
                        <label id="lblType" for="candidateType">
                            Type
                        </label>
                        <select class="tb_rc" id="candidateTypeSelectBox">
                        </select>
                    </li>
                    <li>
                        <label for="doj">
                            From Date</label>
                        <input type="text" runat="server" class="tb_rc1" id="DOJFromInputBox" value="From Date" />
                    </li>
                    <li>
                        <label for="eod_to">
                            To Date</label>
                        <input type="text" class="tb_rc1" id="DOJToInputBox" runat="server" value="To Date" />
                    </li>
                </ul>
                <img src="../../Images/apply.png" id="apply_nh" onclick="Javascript:return ValidateApply(1);"
                    alt="apply" title="Apply" />
                <img src="../../Images/clear.png" id="clear_nh" onclick="Clear()" alt="clear" title="Clear" />
            </div>
        </div>
        <div class="footer_rc">
            <div id="gridDiv" runat="server">
            </div>
        </div>
    </div>
    <input type="hidden" runat="server" id="hdnStartDate" />
    <input type="hidden" runat="server" id="hdnEndDate" />
    <input type="hidden" runat="server" id="hdnSessionId" />
    <input type="hidden" runat="server" id="hdnPageNo" />
   
    </form>
</body>
<script type="text/javascript" language="javascript">
    function disablePopup() {
        //disables popup only if it is enabled
        $("#overLay").hide();
        $(".popupContactwrapper").hide();
        
    }
    function Showmessage(divmsg) {
        //divResend.style.display = "none";
        divmsg.style.display = "block";
    }

    function enablepopUp() {
        var $backgroundOverLay = $('<div id="overLay"/>');
        $("body").prepend($backgroundOverLay);

        $("#overLay").css({
            "opacity": "0.7"
        });
        $("#overLay").show();

    }
    function RetainData() {
        // window.parent.opener.disablePopup();
        var Status = $("#statusSelectBox").val();
        if (Status != "-1") {
            FetchCand(1, 1)
        }
        else {
            var pgeno = $("#hdnPageNo").val();
            FetchCand(pgeno, 0);
        }
    }
    function OpenDrillPop(CandidateID, CountryId, TaskId) {

        var countryId = $("#countrySelectBox").val();
        var sessionId = $("#hdnSessionId").val();
        var CandId = CandidateID.value;
        var Path = window.location;
        var IndiaPath = window.location;
        //Path = Path.protocol + "//" + Path.host + "/" + '../OnboardingV2/Roles/NHPages/Paperwork/India/PhotoUpload.aspx' + '?ss=' + sessionId + '&cand=' + CandidateID + '&task=' + TaskId + '&cntry=' + CountryId + '&admin=1';
        //Path = Path.protocol + "//" + Path.host + "/" + '../../Roles/NHPages/Paperwork/India/PhotoUpload.aspx' + '?ss=' + sessionId + '&cand=' + CandidateID + '&task=' + TaskId + '&cntry=' + CountryId + '&admin=1';
        var Path = '../../Roles/NHPages/Paperwork/India/PhotoUpload.aspx' + '?ss=' + sessionId + '&cand=' + CandidateID + '&task=' + TaskId + '&cntry=' + CountryId + '&admin=1'; ;
        var IndiaPath = '../../Roles/NHPages/Paperwork/India/PhotoUploadIndia.aspx' + '?ss=' + sessionId + '&cand=' + CandidateID + '&task=' + TaskId + '&cntry=' + CountryId + '&admin=1'; ;
        var SingPath = '../../Roles/NHPages/Paperwork/Singapore/PhotoUpload.aspx' + '?ss=' + sessionId + '&cand=' + CandidateID + '&task=' + TaskId + '&cntry=' + CountryId + '&admin=1'; ;
        var MalyPath = '../../Roles/NHPages/Paperwork/Malaysia/PhotoUpload.aspx' + '?ss=' + sessionId + '&cand=' + CandidateID + '&task=' + TaskId + '&cntry=' + CountryId + '&admin=1'; ;
        var IrelandPath = '../../Roles/NHPages/Paperwork/Ireland/PhotoUpload.aspx' + '?ss=' + sessionId + '&cand=' + CandidateID + '&task=' + TaskId + '&cntry=' + CountryId + '&admin=1'; ;
        var PhilippinesPath = '../../Roles/NHPages/Paperwork/Philippines/PhotoUpload.aspx' + '?ss=' + sessionId + '&cand=' + CandidateID + '&task=' + TaskId + '&cntry=' + CountryId + '&admin=1';
        var AusPath = '../../Roles/NHPages/Paperwork/Australia/PhotoUpload.aspx' + '?ss=' + sessionId + '&cand=' + CandidateID + '&task=' + TaskId + '&cntry=' + CountryId + '&admin=1';
        var NewZlandPath = '../../Roles/NHPages/Paperwork/NewZealand/PhotoUpload.aspx' + '?ss=' + sessionId + '&cand=' + CandidateID + '&task=' + TaskId + '&cntry=' + CountryId + '&admin=1';
        var UnitedArabPath = '../../Roles/NHPages/Paperwork/UnitedArab/PhotoUpload.aspx' + '?ss=' + sessionId + '&cand=' + CandidateID + '&task=' + TaskId + '&cntry=' + CountryId + '&admin=1';
        var ThailandPath = '../../Roles/NHPages/Paperwork/Thailand/PhotoUpload.aspx' + '?ss=' + sessionId + '&cand=' + CandidateID + '&task=' + TaskId + '&cntry=' + CountryId + '&admin=1';
        var HongkongPath = '../../Roles/NHPages/Paperwork/Hongkong/PhotoUpload.aspx' + '?ss=' + sessionId + '&cand=' + CandidateID + '&task=' + TaskId + '&cntry=' + CountryId + '&admin=1';
        var SaudiArabPath = '../../Roles/NHPages/Paperwork/SaudiArabia/PhotoUpload.aspx' + '?ss=' + sessionId + '&cand=' + CandidateID + '&task=' + TaskId + '&cntry=' + CountryId + '&admin=1';

        try {
            var width = 970;
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
            if (CountryId == 4) {
                childWin = window.open(Path, "Popup", params);
            }
            else if (CountryId == 193) {
                childWin = window.open(SingPath, "Popup", params);
            }
            else if (CountryId == 156) {
                childWin = window.open(MalyPath, "Popup", params);
            }
            else if (CountryId == 104) {
                childWin = window.open(IrelandPath, "Popup", params);
            }
            else if (CountryId == 175) {
                childWin = window.open(PhilippinesPath, "Popup", params);
            }
            else if (CountryId == 20) {
                childWin = window.open(AusPath, "Popup", params);
            }
            else if (CountryId == 165) {
                childWin = window.open(NewZlandPath, "Popup", params);
            }
            else if (CountryId == 13) {
                childWin = window.open(UnitedArabPath, "Popup", params);
            }
            else if (CountryId == 215) {
                childWin = window.open(ThailandPath, "Popup", params);
            }
            else if (CountryId == 96) {
                childWin = window.open(HongkongPath, "Popup", params);
            }
            else if (CountryId == 190) {
                childWin = window.open(SaudiArabPath, "Popup", params);
            }


            else { childWin = window.open(IndiaPath, "Popup", params); }
            var popupStatus = 0;
            //loads popup only if it is disabled
            if (popupStatus == 0) {
                var $backgroundOverLay = $('<div id="overLay"/>');
                $("body").prepend($backgroundOverLay);

                //                $("#overLay").css({
                //                    "opacity": "0.7"
                //                });
                //                $("#overLay").show();
                popupStatus = 1;


            }
        } catch (err) { }

       

    }
    var stDate, endDate;
    $(document).ready(function () {


        $.ajax({
            type: "POST",
            url: "ADMINDashBoard.aspx/BindLocation",
            data: '{"sessionid":"' + $("#hdnSessionId").val() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                //  $("#LocationInputBox").get(0).options[0] = new Option("Select All", "-1");
                $.each(msg.d, function (index, item) {

                    $("#LocationInputBox").get(0).options[$("#LocationInputBox").get(0).options.length] = new Option(item.CityDescription, item.CountryID);
                });
                $("#LocationInputBox").selectedIndex = 1;
            },
            error: function () {
                alert("Failed to load");
            }
        });

        if ($("#LocationInputBox").val() == 193 || $("#LocationInputBox").val() == 156 || $("#LocationInputBox").val() == 104 || $("#LocationInputBox").val() == 175 || $("#LocationInputBox").val() == 20 || $("#LocationInputBox").val() == 165 || $("#LocationInputBox").val() == 13 || $("#LocationInputBox").val() == 215 || $("#LocationInputBox").val() == 96 || $("#LocationInputBox").val() == 190) {
            $("#Type").hide();
        }
        else {
            $("#Type").show();
        }

        $.ajax({
            type: "POST",
            url: "ADMINDashBoard.aspx/BindCandidateType",
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
        var countryInput = '{"countryID":"' + $("#LocationInputBox").val() + '"}'
        $.ajax({
            type: "POST",
            url: "ADMINDashBoard.aspx/BindStatus",
            data: countryInput,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                $("#statusSelectBox").get(0).options[0] = new Option("Select All", "-1");
                $.each(msg.d, function (index, item) {

                    $("#statusSelectBox").get(0).options[$("#statusSelectBox").get(0).options.length] = new Option(item.FileUploadStatusDesc, item.Status);
                });
                $("#statusSelectBox").selectedIndex = 1;
            },
            error: function () {
                alert("Failed to load Status");
            }
        });
        Onentertext();

       
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

        //        var stDate = $("#hdnStartDate").val();
        //        var endDate = $("#hdnEndDate").val();
        $("#DOJFromInputBox").val(stDate);
        $("#DOJToInputBox").val(endDate);
        $("#hdnProcessId").val(1);
        $("#DOJFromInputBox").datepicker({ dateFormat: 'mm/dd/yy', showOn: "both", buttonImage: "../../Images/calendar.png", buttonImageOnly: true, changeMonth: true, changeYear: true, buttonAfter: false, hideIfNoPrevNext: false, navigationAsDateFormat: true });
        $("#DOJToInputBox").datepicker({ dateFormat: 'mm/dd/yy', showOn: "both", buttonImage: "../../Images/calendar.png", buttonImageOnly: true, changeMonth: true, changeYear: true, buttonAfter: false, hideIfNoPrevNext: false, navigationAsDateFormat: true });
        $.ajax({
            type: "POST",
            url: "ADMINDashBoard.aspx/TransformXML",
            data: '{"gridView":"0","pageNo":"1","candidateID":"' + $("#CandidateInputBox").val() + '", "name":"' + $("#CandidateNameInputBox").val() + '", "fromDate":"' + $("#DOJFromInputBox").val() + '", "todate":"' + $("#DOJToInputBox").val() + '", "candidateType":"' + $("#candidateTypeSelectBox").val() + '", "status":"' + $("#statusSelectBox").val() + '","cityName":"' +  $("#LocationInputBox option:selected").text() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: AjaxSucceeded,
            error: AjaxFailed

        });

    });



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


    function Clear() {
        $("#CandidateInputBox").val('');
        $("#CandidateNameInputBox").val('');
        //$("#statusSelectBox").val('');
        //$("#LocationInputBox").val('');
        $("#LocationInputBox").prop('selectedIndex', 0);
        $("#statusSelectBox").prop('selectedIndex', 0);
        $("#DOJFromInputBox").val(stDate);
        $("#DOJToInputBox").val(endDate);
        $("#candidateTypeSelectBox").prop('selectedIndex', 0);
    }

    function Onentertext() {
        $('#CandidateInputBox').keypress(function (e) {
            if (e.which == 13) {
                ValidateApply(1);
                $("#CandidateInputBox").focus();

            }
        });
        $('#CandidateNameInputBox').keypress(function (e) {
            if (e.which == 13) {
                ValidateApply(1);
                $("#CandidateNameInputBox").focus();
            }
        });

    }

    function FetchCand(pageNo, gridView) {
        $("#hdnPageNo").val(pageNo);

        var dataString = '{"gridView":"' + gridView + '" ,"pageNo":"' + pageNo + '","candidateID":"' + $("#CandidateInputBox").val() + '", "name":"' + $("#CandidateNameInputBox").val() + '", "fromDate":"' + $("#DOJFromInputBox").val() + '", "todate":"' + $("#DOJToInputBox").val() + '", "candidateType":"' + $("#candidateTypeSelectBox").val() + '", "status":"' + $("#statusSelectBox").val() + '","cityName":"' + $("#LocationInputBox option:selected").text() + '"}';
      
        $.ajax({
            type: "POST",
            url: "ADMINDashBoard.aspx/TransformXML",
            data: dataString,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: AjaxSucceeded,
            error: AjaxFailed

        });
    }


    function PaginationDashboard(startIndex, pageNo) {
        FetchCand(pageNo, 1);

    }
    function ValidateApply(gridview) {
        var status = false;
        if (status == DateCompare($('#DOJFromInputBox').val(), $('#DOJToInputBox').val())) {
            MsgboxAlertDashboard(23, 2, 27, "DATE_VALIDATE", "Invalid Date Range!Start Date cannot be after End Date");
            return false;
        }
        FetchCand(1, gridview);
    }

  
</script>
</html>

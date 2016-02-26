<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ForecastDashBoard.aspx.cs" Inherits="OneC.OnBoarding.WebApp.Roles.NSSPages.ForecastDashBoarde" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Forecast DashBoard</title>
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

 
</head>
<body>
    <form   runat="server"  >
 
    <div id="main_rc">
        <div class="header_rc">
            <div class="onboarding_rc">
                <p>
                    On Boarding
                </p>
                <img src="../../Images/pie.png" alt="bar chart" />
                <p class="join_rc" style="float:left;">
                    <label id="laptop" for="laptop" >
                        LapTop :
                    </label>
                    <asp:label id="lblLaptopCount" runat="server">
                    </asp:label>
                    &nbsp;<label id="blackberry" for="BlackBerry">BlackBerry :
                    </label>
                    <asp:Label ID="lblLaptopBlackberryCount" runat="server">
                    </asp:Label>
                     
                </p>
                 
            </div>
            <div class="joining_nss">
                
               
            </div>
        </div>
        <div class="icon_rc">
            <ul style="float: right; clear: both">
             
                <li>
                    <asp:ImageButton runat="server" ImageUrl="~/Images/excel.png" ID="ExportImageButton"
                        title="Excel" OnClick="ExportButton_Click" CssClass="ExportExcel" />
                </li>
            </ul>
        </div>
        <div class="search_rc">
            <div class="search_header_rc">
                <p>
                    Search by
                    </p>
            </div>
            <div class="search_content_rc" id="other">
                <ul>
                    <li>
                        <label for="CandidateInputBox">
                            Candidate ID
                        </label>
                        <input type="text" class="tb_rc" id="CandidateInputBox" onkeypress="javascript:return ValidateOnlyInteger(this);"
                            maxlength="15" /></li>
                    <li>
                        <label for="name">
                            Name
                        </label>
                        <input type="text" class="tb_rc" id="CandidateNameInputBox" /></li>
                    <li>
                        <label for="assciate_id">
                            Associate ID
                        </label>
                        <input type="text" class="tb_rc" id="AssociateInputBox" onkeypress="javascript:return ValidateOnlyInteger(this);"
                            maxlength="6" /></li>
                    <li>
                        <label for="location">
                            Location
                        </label>
                        <select class="tb_rc" id="locationSelectBox" >
                        </select></li>
                </ul>
                <ul>
                    <li>
                        <label for="doj">
                            From Date </label>
                        <input type="text" runat="server" class="tb_rc1" id="DOJFromInputBox" value="From Date"   />
                    </li>
                    <li>
                        <label for="endDate">
                            To Date </label>
                        <input type="text" class="tb_rc1" id="DOJToInputBox" runat="server" value="To Date"  />
                    </li>
             
                    <li>
                        <label for="laptop">
                            Equipment Type </label>
                        <select class="tb_rc" id="laptopSelectBox" runat="server"  >
                        
                        </select>
                    </li>
          
                </ul>
                <ul>
                    <li>
                        <label for="LevalSelectBox">
                            City
                        </label>
                        <select class="tb_rc" id="citySelectBox" onchange="CitySelectedIndexchangeBindWorklocation()">
                        </select></li>
                    <li style=" width: 230px;">
                        <label for="type">
                            Work Location
                        </label>
                        <select class="tb_rc" id="workLocationSelectBox" onchange="WorklocationSelectedIndexChange()" style="width: 210px;">
                        </select></li>
                    <li>
                        <label for="WorkLocation">
                            Level
                        </label>
                        <select class="tb_rc" id="LevalSelectBox" tabindex="12">
                        </select></li>
                </ul>
             <div >

                 <img src="../../Images/apply.png" id="apply_nh" onclick="Javascript:return ValidateApply(0);"  alt="apply" title="Apply" />
                <img src="../../Images/clear.png" id="clear_nh" onclick="Clear()" alt="clear" title="Clear" />  
                </div>
            </div>
        </div>
        <div class="footer_rc">
            <div id="gridDiv" runat="server">
            </div>
        </div>
    </div>
  <input type="hidden" runat="server" id="hdnStartDate" />
    <input type="hidden" runat="server" id="hdnEndDate" />
    <input type="hidden" runat="server" id="laptopSelect" />
  
    
   
    </form>
    <p>
        &nbsp;</p>
</body>
<script type="text/javascript" language="javascript">
    
    // Variables wil store the Previous selected values on the Pagepost event

    var PrevWrkLocSelVal;
    var PrevCitySelVal;
    var PrevLevelSelVal;
    var PrevLaptopSelVal;
    //Page Load Location  SelectBox
    $.ajax({
        type: "POST",
        url: "ForecastDashBoard.aspx/BindLocation",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (msg) {

            $.each(msg.d, function (index, item) {
                $("#locationSelectBox").get(0).options[$("#locationSelectBox").get(0).options.length] = new Option(item.CountryName, item.CountryID);
            });
            $("#locationSelectBox").selectedIndex = 1;

        },
        error: function () {
            //alert("Failed to loadCountry");
        }
    });

  
    $().ready(function () {
        var countryInput = '{"countryID":"' + $("#locationSelectBox").val() + '"}'
        var stDate, endDate;
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

        //    var stDate = $("#hdnStartDate").val();
        //    var endDate = $("#hdnEndDate").val();

        $("#DOJFromInputBox").val(stDate);
        $("#DOJToInputBox").val(endDate);
        //Page Load  EquipmentSelectBox
        $.ajax({
            type: "POST",
            url: "ForecastDashBoard.aspx/Equipment",
            data: '{"fromDate":"' + $("#DOJFromInputBox").val() + '", "endDate":"' + $("#DOJToInputBox").val() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                $.each(msg.d, function (index, item) {

                    $("#laptopSelectBox").get(0).options[$("#laptopSelectBox").get(0).options.length] = new Option(item.CDescription, item.CodeId);
                });
                $("#laptopSelectBox").selectedIndex = 1;

            },
            error: function () {

            }
        });
        //Page Load City SelectBox
        $.ajax({
            type: "POST",
            url: "ForecastDashBoard.aspx/BindCity",
            data: '{"countryId" : "' + $("#locationSelectBox").val() + '","fromDate":"' + $("#DOJFromInputBox").val() + '", "endDate":"' + $("#DOJToInputBox").val() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                $.each(msg.d, function (index, item) {

                    $("#citySelectBox").get(0).options[$("#citySelectBox").get(0).options.length] = new Option(item.CityName, item.CityId);
                });
                $("#citySelectBox").selectedIndex = 1;

            },
            error: function () {
                //alert("Failed to load City");

            }
        });

        // Page Load Bind WorkLocattion SelectBox
        $.ajax({
            type: "POST",
            url: "ForecastDashBoard.aspx/BindWorklocation",
            data: '{"countryId" : "' + $("#locationSelectBox").val() + '", "cityId":"' + $("#citySelectBox").val() + '","fromDate":"' + $("#DOJFromInputBox").val() + '", "endDate":"' + $("#DOJToInputBox").val() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                $.each(msg.d, function (index, item) {
                    $("#workLocationSelectBox").get(0).options[$("#workLocationSelectBox").get(0).options.length] = new Option(item.LocationDesc, item.LocationCode);
                });

                $("#workLocationSelectBox").selectedIndex = 1;

            },
            error: function (xhr) {
                // alert("Failed to load Worklocation" + xhr.status);
            }
        });

        // Page Load Bind DesigniationDesc SelectBox
        $.ajax({
            type: "POST",
            url: "ForecastDashBoard.aspx/BindCandidateLevel",
            data: '{"countryId": "' + $("#locationSelectBox").val() + '","cityId" : "' + $("#citySelectBox").val() + '","locationCode":"' + $("#workLocationSelectBox").val() + '", "fromDate":"' + $("#DOJFromInputBox").val() + '", "endDate":"' + $("#DOJToInputBox").val() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                $.each(msg.d, function (index, item) {
                    $("#LevalSelectBox").get(0).options[$("#LevalSelectBox").get(0).options.length] = new Option(item.DesigniationDesc, item.Jobcode);
                });
                $("#LevalSelectBox").selectedIndex = 1;
            },
            error: function (xhr) {
                // alert("Failed to load level" + xhr.status);
            }
        });
       

        //page Load bind Data
        var dataString = '{ "gridView":"0","loginId":" " ,"candidateId":"' + $("#CandidateInputBox").val() + '", "candidateName":"' + $("#CandidateNameInputBox").val() + '","locationCode":"' + $("#workLocationSelectBox").val() + '", "associateId":"' + $("#AssociateInputBox").val() + '" , "cityId" : "' + $("#citySelectBox").val() + '" , "fromDate":"' + $("#DOJFromInputBox").val() + '", "endDate":"' + $("#DOJToInputBox").val() + '","jobCode":"' + $("#LevalSelectBox").val() + '" ,"countryId":"' + $("#locationSelectBox").val() + '","pageNo":"1","laptopsele":"' + $("#laptopSelectBox").val() + '"}';
        $.ajax({
            type: "POST",
            url: "ForecastDashBoard.aspx/TransformXML",
            data: dataString,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: AjaxSucceeded,
            error: AjaxFailed

        });
        //show page load Page Load

        $.ajax({
            type: "POST",
            url: "ForecastDashBoard.aspx/LapTopBlackpBerryCount",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                $.each(msg.d, function (index, item) {

                    var lap;
                    var blk;
                    $("#lblLaptopCount").text(msg.d[0].Value);
                    $("#lblLaptopBlackberryCount").text(msg.d[1].Value);

                });
            },
            error: function (xhr) {

            }

    });


    });   
   
    //  On Click Bind CandidateData
    function FetchCand(pageNo, gridView) {
    //{ "gridView":"0","loginId":" " ,"candidateId":"", "candidateName":"","locationCode":"null", "associateId":"" , "cityId" : "null" , "fromDate":"9/3/2014", "endDate":"3/2/2015","jobCode":"null" ,"countryId":"3","pageNo":1,"laptopsele":"null"}
        var dataString = '{ "gridView":"' + gridView + '","loginId":" " ,"candidateId":"' + $("#CandidateInputBox").val() + '", "candidateName":"' + $("#CandidateNameInputBox").val() + '","locationCode":"' + $("#workLocationSelectBox").val() + '", "associateId":"' + $("#AssociateInputBox").val() + '" , "cityId" : "' + $("#citySelectBox").val() + '" , "fromDate":"' + $("#DOJFromInputBox").val() + '", "endDate":"' + $("#DOJToInputBox").val() + '","jobCode":"' + $("#LevalSelectBox").val() + '" ,"countryId":"' + $("#locationSelectBox").val() + '","pageNo":' + pageNo + ',"laptopsele":"' + $("#laptopSelectBox").val() + '"}';
       PrevWrkLocSelVal = $("#workLocationSelectBox").val();
        $.ajax({
            type: "POST",
            url: "TransformXML",
            data: dataString,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: AjaxSucceeded,
            error: AjaxFailed
        });

     // Bind Select Box City,Workloction &joblevel
      
        if (PrevWrkLocSelVal != "") {
            $("#workLocationSelectBox").val(PrevWrkLocSelVal);
        }
        else {
            $("#workLocationSelectBox").selectedIndex = 1
        }

        PrevCitySelVal = $("#citySelectBox").val();
        if (PrevCitySelVal != "") {
            $("#citySelectBox").val(PrevCitySelVal);
        }
        else {
            $("#citySelectBox").selectedIndex = 1
        }

        PrevLevelSelVal = $("#LevalSelectBox").val();
        if (PrevLevelSelVal != "") {
            $("#LevalSelectBox").val(PrevLevelSelVal);
        }
        else {
            $("#LevalSelectBox").selectedIndex = 1
        }
        PrevLaptopSelVal = $("#laptopSelectBox").val();
        if (PrevLaptopSelVal != "") {
            $("#laptopSelectBox").val(PrevLaptopSelVal);
        }
        else {
            $("#laptopSelectBox").selectedIndex = 1
        }

        OnclickApply();
    }

  
    $(function () {
       $("#DOJFromInputBox").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar', showOn: "both", buttonImage: "../../Images/calendar.png", changeMonth: true, buttonImageOnly: true, changeYear: true, buttonAfter: false});
       $("#DOJToInputBox").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar', showOn: "both", buttonImage: "../../Images/calendar.png", changeMonth: true,  buttonImageOnly: true ,changeYear: true, buttonAfter: false});
    });
//    var stDate = $("#hdnStartDate").val();
//    var endDate = $("#hdnEndDate").val();

//    $("#DOJFromInputBox").val(stDate);
//    $("#DOJToInputBox").val(endDate);


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
       // alert(result.responseText);
    }


    function ValidateApply(gridview) {
        var status1 = false;
        if (status1 == DateCompare($('#DOJFromInputBox').val(), $('#DOJToInputBox').val())) {
            MsgboxAlertDashboard(23, 2, 27, "DATE_VALIDATE", "Invalid Date Range!Start Date cannot be after End Date");
            return false;
        }
        var status = false;
        if (status == ValidateAlphanumeric($('#CandidateNameInputBox').val())) {
            return false;
        }
        if (status == ValidateAlphanumericForEmailId($('#AssociateInputBox').val())) {
            return false;
        }
        FetchCand(1, gridview);

    }
    function Clear(result) {
        $("#CandidateInputBox").val('');
        $("#CandidateNameInputBox").val('');
        $("#AssociateInputBox").val('');
     
    }
    function PaginationDashboard(startIndex, pageNo) {
        FetchCand(pageNo, 0);

    }


</script>
<script type="text/javascript">

    function CitySelectedIndexchangeBindWorklocation() {
        //Selected indexChange bind SelectBox Worklocation
        $("#workLocationSelectBox").empty();
        $.ajax({
            type: "POST",
            url: "ForecastDashBoard.aspx/BindWorklocation",
            data: '{"countryId" : "' + $("#locationSelectBox").val() + '", "cityId":"' + $("#citySelectBox").val() + '", "fromDate":"' + $("#DOJFromInputBox").val() + '", "endDate":"' + $("#DOJToInputBox").val() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                $.each(msg.d, function (index, item) {
                    $("#workLocationSelectBox").get(0).options[$("#workLocationSelectBox").get(0).options.length] = new Option(item.LocationDesc, item.LocationCode);
                });
                $("#workLocationSelectBox").selectedIndex = 1;
            },
            error: function (xhr) {
                //alert("Failed to load Worklocation" + xhr.status);
            }
        });

        //Selected indexChange bind SelectBox  DesigniationDesc
        $("#LevalSelectBox").empty();
        $.ajax({
            type: "POST",
            url: "ForecastDashBoard.aspx/BindCandidateLevel",
            data: '{"countryId": "' + $("#locationSelectBox").val() + '","cityId" : "' + $("#citySelectBox").val() + '","locationCode":"' + $("#workLocationSelectBox").val() + '", "fromDate":"' + $("#DOJFromInputBox").val() + '", "endDate":"' + $("#DOJToInputBox").val() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                $.each(msg.d, function (index, item) {
                    $("#LevalSelectBox").get(0).options[$("#LevalSelectBox").get(0).options.length] = new Option(item.DesigniationDesc, item.Jobcode);
                });
                $("#LevalSelectBox").selectedIndex = 1;
            },
            error: function (xhr) {
               // alert("Failed to load level" + xhr.status);
            }
        });
    }

    function WorklocationSelectedIndexChange() {

        //  WorkLocation Selected indexChange  Bind  DesigniationDesc
        $("#LevalSelectBox").empty();
        $.ajax({
            type: "POST",
            url: "ForecastDashBoard.aspx/BindCandidateLevel",
            data: '{"countryId": "' + $("#locationSelectBox").val() + '","cityId" : "' + $("#citySelectBox").val() + '","locationCode":"' + $("#workLocationSelectBox").val() + '","fromDate":"' + $("#DOJFromInputBox").val() + '", "endDate":"' + $("#DOJToInputBox").val() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                $.each(msg.d, function (index, item) {
                    $("#LevalSelectBox").get(0).options[$("#LevalSelectBox").get(0).options.length] = new Option(item.DesigniationDesc, item.Jobcode);
                });
                $("#LevalSelectBox").selectedIndex = 1;
            },
            error: function (xhr) {
                //alert("Failed to load level" + xhr.status);
            }
        });

    }


    function OnclickApply() {
      
        //Onclick Equipment  SelectBox
        $("#laptopSelectBox").empty();
        $.ajax({
            type: "POST",
            url: "ForecastDashBoard.aspx/Equipment",
            data: '{"fromDate":"' + $("#DOJFromInputBox").val() + '", "endDate":"' + $("#DOJToInputBox").val() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {

                $.each(msg.d, function (index, item) {
                    $("#laptopSelectBox").get(0).options[$("#laptopSelectBox").get(0).options.length] = new Option(item.CDescription, item.CodeId);
                });
                if (PrevLaptopSelVal != '')
                    $("#laptopSelectBox").val(PrevLaptopSelVal);
           
            },
            error: function () {
                //alert("Failed to load laptop ");
            }
        });
        // Onclick Bind City SelectBox
        $("#citySelectBox").empty();
        $.ajax({
            type: "POST",
            url: "ForecastDashBoard.aspx/BindCity",
            data: '{"countryId" : "' + $("#locationSelectBox").val() + '","fromDate":"' + $("#DOJFromInputBox").val() + '", "endDate":"' + $("#DOJToInputBox").val() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                $.each(msg.d, function (index, item) {

                    $("#citySelectBox").get(0).options[$("#citySelectBox").get(0).options.length] = new Option(item.CityName, item.CityId);
                });
             
                if (PrevCitySelVal != '')
                    $("#citySelectBox").val(PrevCitySelVal);

            },
            error: function () {
               // alert("Failed to load City");

            }
        });

        // Onclick Bind WorkLocattion SelectBox
        $("#workLocationSelectBox").empty();
        $.ajax({
            type: "POST",
            url: "ForecastDashBoard.aspx/BindWorklocation",
            data: '{"countryId" : "' + $("#locationSelectBox").val() + '", "cityId":"' + $("#citySelectBox").val() + '","fromDate":"' + $("#DOJFromInputBox").val() + '", "endDate":"' + $("#DOJToInputBox").val() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                $.each(msg.d, function (index, item) {
                    $("#workLocationSelectBox").get(0).options[$("#workLocationSelectBox").get(0).options.length] = new Option(item.LocationDesc, item.LocationCode);
                });
         
                if (PrevWrkLocSelVal != '')
                    $("#workLocationSelectBox").val(PrevWrkLocSelVal);
   
             
            },
            error: function (xhr) {
               // alert("Failed to load Worklocation" + xhr.status);
            }
        });

        // Onclick Bind DesigniationDesc SelectBox
        $("#LevalSelectBox").empty();
        $.ajax({
            type: "POST",
            url: "ForecastDashBoard.aspx/BindCandidateLevel",
            data: '{"countryId": "' + $("#locationSelectBox").val() + '","cityId" : "' + $("#citySelectBox").val() + '","locationCode":"' + $("#workLocationSelectBox").val() + '", "fromDate":"' + $("#DOJFromInputBox").val() + '", "endDate":"' + $("#DOJToInputBox").val() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                $.each(msg.d, function (index, item) {
                    $("#LevalSelectBox").get(0).options[$("#LevalSelectBox").get(0).options.length] = new Option(item.DesigniationDesc, item.Jobcode);
                });
               
                if (PrevLevelSelVal != '') {
                    $("#LevalSelectBox").val(PrevLevelSelVal);
                }
             
            },
            error: function (xhr) {
                //alert("Failed to load level" + xhr.status);
            }
        });

        // Onclick laptop & blackberycount
        $("#lblLaptopCount").empty();
        $("#lblLaptopBlackberryCount").empty();
        $.ajax({
            type: "POST",
            url: "ForecastDashBoard.aspx/LapTopBlackpBerryCount",
            // data: dataString,
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                $.each(msg.d, function (index, item) 
                {

                    var lap;
                    var blk;
                    $("#lblLaptopCount").text(msg.d[0].Value);
                    $("#lblLaptopBlackberryCount").text(msg.d[1].Value);
                });
            },
            error: function (xhr) {

            }
        });
       
    }
 

</script>
</html>

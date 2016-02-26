$().ready(function () {
    var dataString = '{"joininglocation":"' + "ALL" + '"}';
    $.ajax({
        type: "POST",
        url: "../../FormsService.aspx/JoiningLocation",
        data: dataString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (msg) {
            $.each(msg.d, function (index, item) {
                $("#joininglocation").get(0).options[$("#joininglocation").get(0).options.length] = new Option(item.CityName);
            });
            $("#joininglocation").selectedIndex = 1;
        },
        error: function () {
            // alert("Failed to JoiningLocation");
        }
    });
});

$().ready(function () {
    $("#LoadingImage").show();
    $("#divCandidatedata").hide();
    $("#divDashboardCandidateDetail").hide()
    $("#btnUpdateAttendance").hide();
    $("#divUpdateAttendance").hide();
    
    $("#btnhome").hide();
    $("#divPagination3").hide();
    $("#popup_box").hide(); 
    $("#hdnCandidateAttendance").empty();
    $("#hdnUpdateCandidateAttendance").val("");
    $("#hdnCandidateAttendance").val("");
    $("#hdnUpdateCandidateAttendance").empty();

    // Bind Induction City
    //312539
    $("#joininglocation").empty();
    var dataString = '{"joininglocation":"' + "ALL" + '"}';
    $.ajax({
        type: "POST",
        url: "../../FormsService.aspx/JoiningLocation",
        data: dataString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (msg) {
            $.each(msg.d, function (index, item) {
                $("#joininglocation").get(0).options[$("#joininglocation").get(0).options.length] = new Option(item.CityName);
            });
            $("#joininglocation").selectedIndex = 1;
        },
        error: function () {
            // alert("Failed to JoiningLocation");
        }
    });


    // Bind InductionLocation
    // 312539
    var dataString = '{"joininglocation":"' + $("#joininglocation").val() + '"}';
    $.ajax({
        type: "POST",
        url: "../../FormsService.aspx/InductionLocation",
        data: dataString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (msg) {
            $.each(msg.d, function (index, item) {
                $("#inducationlocationSelectBox").get(0).options[$("#inducationlocationSelectBox").get(0).options.length] = new Option(item.LocationDesc);
            });
            $("#inducationlocationSelectBox").selectedIndex = 1;
        },
        error: function () {
           // alert("Failed to InductionLocation");
        }
    });

    // Bind Induction StartDate & EndDate 
    //312539
    var countryInput = '{"countryID":"' + 3 + '"}'
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
           // alert("Failed to load");
        }
    });
    //on page loade bind date
    //312539
    $("#DOJFromInputBox").val(endDate);
    $("#DOJFromInputBox").datepicker({ dateFormat: 'mm/dd/yy', showOn: "both", buttonImage: "../../Images/calendar.png", buttonImageOnly: true, changeMonth: true, changeYear: true, buttonAfter: false, hideIfNoPrevNext: false, navigationAsDateFormat: true });
   
    // On PageLoad BindDate table1
    ///312539
    $("#hdnPageNo").val(1);
    var dataString = '{"pageNo":"' + $("#hdnPageNo").val() + '","fromDate":"' + $("#DOJFromInputBox").val() + '","joininglocation":"' + $("#joininglocation").val() + '","inductionlocation":"' + $("#inducationlocationSelectBox").val() + '"}';
    $.ajax({
        type: "POST",
        url: "../../FormsService.aspx/FetchCandidateInductionTrackerDashboard",
        data: dataString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: AjaxSucceededOnPageLoad,
        error: AjaxFailed,
        complete: function () {
           $("#LoadingImage").hide();
           
        }
    });

    //apply button onclick
    $("#iframeExcel").hide();
    $("#apply_nh").click(function () {
       $("#LoadingImage").show();
        FetchCandPage1(1);
        settablebackground();
    });
     
    $('#btnExcel').click(function () {
        LoadExcel();
        settablebackground();
    });

    var Recordcount = $("#hdnTotalRecord").val();
    $.ajax({
        type: "POST",
        url: "../../FormsService.aspx/DoPagingForDashboard",
        data: "{itotalCount:'" + Recordcount + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: GetPagination,
        error: AjaxFailed
    });

});

function uploadAttendance()
{ 
var path="InductionTracker.html" 

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

function Clear() {
}
//Hide controls
function Hide() {
    $("#liCountry").hide()
    $("#selectCountrys").hide();
    $("#liCanidateStatus").hide();
    $("#selectCanidateStatus").hide();
    $("#liCanidatejoiningtype").hide();
    $("#selectCanidatejoiningtype").hide();
    $("#divbrack").hide();
    $("#btnDownloadAttendance").hide();
}


function ControlShow() {
    $("#liCountry").show()
    $("#selectCountrys").show();
    $("#liCanidateStatus").show();
    $("#selectCanidateStatus").show();
    $("#liCanidatejoiningtype").show();
    $("#selectCanidatejoiningtype").show();
    $("#divbrack").show();
    $("#btnDownloadAttendance").show();
}
//onclick pagenation bind data table1 
function FetchCandPage1(pageNo) {
    var dataString = '{"pageNo":"' + pageNo + '","fromDate":"' + $("#DOJFromInputBox").val() + '","joininglocation":"' + $("#joininglocation").val() + '","inductionlocation":"' + $("#inducationlocationSelectBox").val() + '"}';
    $.ajax({
        type: "POST",
        url: "../../FormsService.aspx/FetchCandidateInductionTrackerDashboard",
        data: dataString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: AjaxSucceededOnPageLoad,
        error: AjaxFailed,
        complete: function () {
          $("#LoadingImage").hide();
          
        }
    });

    var Recordcount = $("#hdnTotalRecord").val();
    $.ajax({
        type: "POST",
        url: "../../FormsService.aspx/DoPagingForDashboard",
        data: "{itotalCount:'" + Recordcount + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: GetPagination,
        error: AjaxFailed
    });

}

//pagination table1
function PaginationDashboard(startIndex, pageNo) {

    FetchCandPage1(pageNo, 0);
    settablebackground();
}
function PaginationDashboard2(startIndex, pageNo) {
    FetchCandPage2(pageNo)
    settablebackground();
}
//Bind Data table1
function AjaxSucceeded(data) {

    var rowCount = tblDashboardData.rows.length;
    for (var i = 0; i < rowCount; i++) {
        var row = tblDashboardData.rows[i];

        if (rowCount > 0) {
            tblDashboardData.deleteRow(i);
            rowCount--;
            i--;
        }
    }

    if (data.d == "") {
        $("#tblDashboardData").append("<tr align='center'><td colspan='7' Style='text-align:center;'>Oops!!! No such result found!</td></tr>");
        $("#divDashboardSearch").show();
        $("#divPagination").hide();
    }
    else {
        var xmldata = ParsexmlDOM(data.d);

        var RowNumber = "Sr.No";
        var InductionDate = "InductionDate";
        var Location = "Location";
        var Venue = "Vanue";
        var TotalNoJoinees = "Total No.Of Joinees"
        $("#tblDashboardData").append("<tr><th>" + RowNumber + "</th><th>" + InductionDate + "</th><th>" + Location + "</th><th>" + Venue + "</th><th>" + TotalNoJoinees + "</th></tr>");

        $(xmldata).find('Table').each(function () {

            var RowNumber = $(this).find('RowNumber').text();
            var InductionDate = $(this).find('InductionDate').text();
            var Location = $(this).find('Location').text();
            var Venue = $(this).find('Venue').text();
            var TotalNoJoinees = $(this).find('TotalNoJoinees').text();
            var Curentdate = $(this).find('Curentdate').text();
            $("#hdCurentdate").val(Curentdate);
            $("#tblDashboardData").append("<tr><td>" + RowNumber + "</td><td>" + InductionDate + "</td><td>" + Location + "</td><td>" + Venue + "</td><td><div id='TotalNoJoinees'><a href='#' class='atag' onclick=\"InductionCandidateDaetails('" + InductionDate + "','" + Location + "','" + Venue + "');\">" + TotalNoJoinees + "</a></div></td></tr>");
        });

        $(xmldata).find('Table1').each(function () {
            var Recordcount = $(this).find('TotalCount').text();
            $("#hdnTotalRecord").val(Recordcount);
        });

        $("#divDashboardSearch").show();
        $("#divPagination").show();
    }

}

//Date validate
function ValidateApply() {

    FetchCandPage1(1);
    settablebackground();
}
function AjaxFailed(data) {
    //alert(result.responseText);
}

//pagination 1St Data tablepage
function GetPagination(result) {
   
    $("#divPagination").html(result.d);
}
//pagination 2St Data tablepage
function GetPagination2(result) {
    $("#divPagination").hide();
    $("#divPagination").html(result.d);
   
}


function AjaxSucceededOnPageLoad(data) {

    var rowCount = tblDashboardData.rows.length;
    for (var i = 0; i < rowCount; i++) {
        var row = tblDashboardData.rows[i];
        if (rowCount > 0) {
            tblDashboardData.deleteRow(i);
            rowCount--;
            i--;
        }
    }

    if (data.d == "" || data.d == null) {
        settablebackground();
        $("#tblDashboardData").append("<tr align='center'><td colspan='7' Style='text-align:center;'>Oops!!! No such result found!</td></tr>");
        $("#divDashboardSearch").show();
        $("#divPagination").hide();
        settablebackground();
    }
    else {
        var xmldata = ParsexmlDOM(data.d);
        //added table column name 
        var RowNumber = "Sr.No";
        var InductionDate = "Induction Date";
        var Location = "Location";
        var Venue = "Venue";
        var TotalNoJoinees = "Total No.of Joinees"
        $("#tblDashboardData").append("<tr><th>" + RowNumber + "</th><th>" + InductionDate + "</th><th>" + Location + "</th><th>" + Venue + "</th><th>" + TotalNoJoinees + "</th></tr>");
        settablebackground();
        $(xmldata).find('Table').each(function () {

            var RowNumber = $(this).find('RowNumber').text();
            var InductionDate = $(this).find('InductionDate').text();
            var Location = $(this).find('Location').text();
            var Venue = $(this).find('Venue').text();
            var TotalNoJoinees = $(this).find('TotalNoJoinees').text();
            var Curentdate = $(this).find('Curentdate').text();
            $("#hdCurentdate").val(Curentdate);
            $("#tblDashboardData").append("<tr><td>" + RowNumber + "</td><td>" + InductionDate + "</td><td>" + Location + "</td><td>" + Venue + "</td><td><div id='TotalNoJoinees'><a href='#' class='atag' onclick=\"InductionCandidateDaetails('" + InductionDate + "','" + Location + "','" + Venue + "');\">" + TotalNoJoinees + "</a></div></td></tr>");
        });

        $(xmldata).find('Table1').each(function () {
            var Recordcount = $(this).find('TotalCount').text();
            $("#hdnTotalRecord").val(Recordcount);
            
        });
        settablebackground();
        $("#divDashboardSearch").show();
        $("#divPagination").show();
         
    }

}


//2nd page
//312539 Bind induction location  candidate details table2
function InductionCandidateDaetails(InductionDate, Location, Venue) {
    $("#hdnInuctionDate").val(InductionDate);
    $("#hdnLoation").val(Location);
    $("#hdnVanue").val(Venue);
    $("#divDashboardSearch").hide();
    $("#tblDashboardData").hide();
    $("#divsearchfilter").hide();
    $("#btnUpdateAttendance").show();
    $("#divUpdateAttendance").show();
    $("#btnhome").show();
    $("#divDashboardCandidateDetail").show();
    $("#tblDashboardCandidateDetail").show();
    $("#iframeExcel").hide();
    $("#divsearch").hide();
    $("#divhed").hide();
    var dataString = '{"pageNo":"' + $("#hdnPageNo").val() + '","inductinDate":"' + InductionDate + '","joininglocation":"' + Location + '"}';
    $.ajax({
        type: "POST",
        url: "../../FormsService.aspx/FetchCandidateDetailsInductionLocation",
        data: dataString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: SucceededInductionCandidateDaetail,
        error: AjaxFailed,
        complete: function () {
          //  $("#LoadingImage").hide();
      
        }
    });

    var Recordcount = $("#hdnTotalRecord").val();
    $.ajax({
        type: "POST",
        url: "../../FormsService.aspx/DoPagingForDashboard",
        data: "{itotalCount:'" + Recordcount + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: GetPagination2,
        error: AjaxFailed
    });

}
//Bind the InductionCandidate Daetail data table2
function SucceededInductionCandidateDaetail(data) {
    settablebackground();
    var rowCount = tblDashboardCandidateDetail.rows.length;
    for (var i = 0; i < rowCount; i++) {
        var row = tblDashboardCandidateDetail.rows[i];

        if (rowCount > 0) {
            tblDashboardCandidateDetail.deleteRow(i);
            rowCount--;
            i--;
        }
    }

    if (data.d == "" || data.d == null) {
        $("#tblDashboardCandidateDetail").append("<tr align='center'><td colspan='7' Style='text-align:center;'>Oops!!! No such result found!</td></tr>");
        settablebackground();
        $("#divhed").hide();
        $("#divPagination").hide();
        $("#btnUpdateAttendance").hide();
        $("#divUpdateAttendance").hide();
        $("#divsearch").hide();
        $("#divupdateAttendance").hide();
    }
    else {
        var xmldata = ParsexmlDOM(data.d);
        var RowNumber = "Sr.No";
        var CandidateStatus = "Candidate Status";
        var CandidateID = "Candidate ID";
        var CandidateName = "Candidate Name";
        var Level = "Level";
        var DOJ = "DOJ";
        var JoiningLocation = "Joining Location";
        var InductionMode = "Induction Mode";
        var CHireStatus = "CHire Status";
        var CandidateJoiningType = "Candidate Joining Type";
        $("#iframeExcel").hide();
        $("#tblDashboardCandidateDetail").append("<tr><th>" + RowNumber + "</th><th>" + CandidateStatus + "</th><th>" + CandidateID + "</th><th>" + CandidateName + "</th><th>" + Level + "</th><th>" + DOJ + "</th><th>" + JoiningLocation + "</th><th>" + InductionMode + "</th><th>" + CHireStatus + "</th><th>" + CandidateJoiningType + "</th></tr>");

        var i = 0;
        $(xmldata).find('Table').each(function () {
            $("#divsearch").hide();
            var RowNumber = $(this).find('RowNumber').text();
            var CandidateStatus = $(this).find('InductionStatus').text();
            var CandidateID = $(this).find('CandidateID').text();
            var CandidateName = $(this).find('CandidateName').text();
            var Level = $(this).find('Level').text();
            var DOJ = $(this).find('DOJ').text();
            var JoiningLocation = $(this).find('Location').text();
            var InductionMode = $(this).find('InductionMode').text();
            var CHireStatus = $(this).find('OfferStatus').text();
            var CandidateJoiningType = $(this).find('CandidateType').text();
            var optionlist = "";
            $(xmldata).find('Table2').each(function () {
                var InductionStatus = $(this).find('InductionStatus').text();
                if(InductionStatus == CandidateStatus)
                {
                    optionlist += '<option selected>' + InductionStatus + '</option>';
                }
                else
                {
                 optionlist += '<option>' + InductionStatus + '</option>';
                }
               
            });
         $("#tblDashboardCandidateDetail").append("<tr><td>" + RowNumber + "</td><td> <select style='font-size:10px' id='selectAttendance" + i.toString() + "' onchange='OnchangeUpdateAttedance(this);'>" + optionlist + " </selec> </td><td <label id='lblcandidateID'>" + CandidateID + "</label></td><td <label id='lblcandidateName'>" + CandidateName + " </label></td><td>" + Level + "</td><td>" + DOJ + "</td><td>" + JoiningLocation + "</td><td>" + InductionMode + "</td><td>" + CHireStatus + "</td><td>" + CandidateJoiningType + "</td></tr>");
                     i++;
            settablebackground();
              
        });

        $(xmldata).find('Table1').each(function () {
            var rtotalCount = $(this).find('TotalCount').text();
            $("#hdnTotalRecordCount").val(rtotalCount);
        });
 
        var rtotalCount = $("#hdnTotalRecordCount").val();
        $.ajax({
            type: "POST",
            url: "../../FormsService.aspx/DoPagingForInductinTracker",
            data: "{rtotalCount:'" + rtotalCount + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: GetPaginationCandidateDetailPage,
            error: AjaxFailed
        });
  
        settablebackground();
        $("#divhed").hide();
        $("#divDashboardCandidateDetail").show()
        $("#btnUpdateAttendance").show();
        $("#divUpdateAttendance").show();
        $("#divPagination3").show();
        $("#btnhome").show();
        $("#divPagination").hide();

    }

}


//Pagenation 2nd Data table
function GetPaginationSecondpage(result) {
    settablebackground();
    $("#divPagination").hide();
    $("#divPagination3").show();
    $("#divPagination").html(result.d);
    
    $("#divDashboardSearch").hide();
    $("#tblDashboardData").hide();
    $("#divDashboardCandidateDetail").show()
    $("#btnUpdateAttendance").show();
    $("#divUpdateAttendance").show();
    $("#btnhome").show();
}

//Pagenation 3rd Bind DataTable
function GetPaginationCandidateDetailPage(result) {
    settablebackground();
    $("#divhed").hide();
    $("#divPagination").hide();
    $("#divPagination3").html(result.d);
    $("#divPagination3").show();
 }
//2nd page pagenation click event
function FetchCandPage2(pageNo) {
    $("#divhed").hide();
    settablebackground();
    var InductionDate = $("#hdnInuctionDate").val();
    var Location = $("#hdnLoation").val();
    var dataString = '{"pageNo":"' + pageNo + '","inductinDate":"' + InductionDate + '","joininglocation":"' + Location + '"}';
    $.ajax({
        type: "POST",
        url: "../../FormsService.aspx/FetchCandidateDetailsInductionLocation",
        data: dataString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: SucceededInductionCandidateDaetail,
        error: AjaxFailed,
        complete: function () {
          //  $("#LoadingImage").hide();
        }
    });
}
//312539 Onclick Home
function RedirectHome() {
   //GetPagination(result)
    $("#btnhome").hide();
    $("#divPagination").show();
    $("#divsearchfilter").show();
    $("#divDashboardSearch").show();
    $("#tblDashboardData").show();
    $("#divhed").show();
    $("#divhed1").show();
    $("#divsearch").show();
    //2ndtable
    $("#divPagination3").hide();
    $("#btnUpdateAttendance").hide();
    $("#divUpdateAttendance").show();
    $("#divDashboardCandidateDetail").hide()
    $("#tblDashboardCandidateDetail").hide();
    $("#hdnUpdateCandidateAttendance").empty();
    $("#hdnCandidateAttendance").empty();
    $("#hdnCandidateAttendance").val("");
    $("#hdnUpdateCandidateAttendance").val("");
}


//Selecte index Change City
function CitySelectedIndexchange() {

    $("#inducationlocationSelectBox").empty();
    var dataString = '{"joininglocation":"' + $("#joininglocation").val() + '"}';
    $.ajax({
        type: "POST",
        url: "../../FormsService.aspx/CitySelectedIndexchangeBindInductionLocation",
        data: dataString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (msg) {
            $.each(msg.d, function (index, item) {
                $("#inducationlocationSelectBox").get(0).options[$("#inducationlocationSelectBox").get(0).options.length] = new Option(item.LocationDesc);
            });
            $("#inducationlocationSelectBox").selectedIndex = 1;
        },
        error: function () {
           // alert("Failed to InductionLocation");
        }
    });


}


// OnupdateButton click
function fnUpdate() {
   
    $("#tblDashboardCandidateDetail select").each(function () {
        var updateInductionStatus = "";
        updateInductionStatus = $(this).val(); //$(this).children()[0].value;
        var updateCandidateId = $(this).parent().next().text();
        var updateCandidateName = $(this).parent().next().next().text();
        document.getElementById('hdnUpdateCandidateAttendance').value = document.getElementById('hdnUpdateCandidateAttendance').value + ',' + updateInductionStatus + '/' + updateCandidateId + '/' + updateCandidateName;
       /// alert(document.getElementById('hdnUpdateCandidateAttendance').value);
    });
}
//OnchangeUpdateAttedance table to updatd
function OnchangeUpdateAttedance(ctrl) {
 
    var inductionStatus = $("#" + ctrl.id + " :selected").val();
    var candidateId = $(ctrl).parent().next().text();
    var candidateName = $(ctrl).parent().next().next().text();
    var DOJ = $(ctrl).parent().next().next().next().next().text();
     document.getElementById('hdnCandidateAttendance').value = document.getElementById('hdnCandidateAttendance').value + ',' + inductionStatus + '/' + candidateId + '/' + candidateName;
 // alert(document.getElementById('hdnCandidateAttendance').value);
}

//312539 
//UpdateCandidateAttendanceTracker
function UpdateCandidateAttendanceTracker() 
{
    var atteandanceupdateCandiadatelist = $("#hdnCandidateAttendance").val();
    if (atteandanceupdateCandiadatelist != "")
     {
      var getdate = $("#hdCurentdate").val();
      var InuctionDate = $("#hdnInuctionDate").val();
        if (InuctionDate > getdate)
        {
            jAlert("Hey!!Seems that the Induction is yet to get completed. You can mark the attendance only on the Induction date.");
        }
       else
        {
            jConfirm("You are about to change the attendance. Are you sure ?");
       }
        
    }
    else {
        fnUpdate();
        var getdate = $("#hdCurentdate").val();
        var InuctionDate = $("#hdnInuctionDate").val();
        if (InuctionDate > getdate)
             {
                 jAlert("Hey!!Seems that the Induction is yet to get completed. You can mark the attendance only on the Induction date.");
            }
            else {
                jConfirm("You are about to change the attendance. Are you sure ?");
            }
        }
 }
 function disablePopup() {
     $(".popupContactwrapper").empty().remove(); /*changed from hide() to remove*/
     $("#overLay").hide();

 }
 //312539 downloadexcelreportpoppage popupbox
 function OpenPopForDownloadExcel() {
     loadPopupBox()

 }
 function OpenPopForUploadExcel(path) {
    
    try {
        var path = "UploadAttendance.aspx?page=Induction"

        var width = 675;
        var height = 354;
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
 // 312539 pup open & close

 $('#popupBoxClose').click(function () {
     unloadPopupBox();
 });

 function unloadPopupBox() {    // TO Unload the Popupbox
     $('#popup_box').fadeOut("slow");
     $('#container').fadeOut("slow");
    
    
 }

 function loadPopupBox() {    // To Load the Popupbox
 $("#container").css({
         "opacity": "0.5"
         });
     $("#container").fadeIn("slow");
     $('#popup_box').fadeIn("slow");
   
 }


//this function runtime added style
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


  

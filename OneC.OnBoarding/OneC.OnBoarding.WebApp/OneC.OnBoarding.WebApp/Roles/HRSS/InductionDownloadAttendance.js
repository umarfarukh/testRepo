$().ready(function () {
    // Bind Induction City
   //312539
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
                $("#downloadSelectLocation").get(0).options[$("#downloadSelectLocation").get(0).options.length] = new Option(item.CityName);
            });
            $("#downloadSelectLocation").selectedIndex = 1;
        },
        error: function () {
            //alert("Failed to joininglocation");
        }
    });

    /// Bind InductionLocation
    // 312539
    var dataString = '{"joininglocation":"' + $("#downloadSelectLocation").val() + '"}';
    $.ajax({
        type: "POST",
        url: "../../FormsService.aspx/InductionLocation",
        data: dataString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (msg) {
            $.each(msg.d, function (index, item) {
                $("#downloadSelectvenue").get(0).options[$("#downloadSelectvenue").get(0).options.length] = new Option(item.LocationDesc);
            });
            $("#downloadSelectvenue").selectedIndex = 1;
        },
        error: function () {
            //alert("Failed to InductionLocation");
        }
    });

    /// Bind InductionCandidateStatus
    // 312539
    var dataString = '{"joininglocation":"' + $("#downloadSelectLocation").val() + '"}';
    $.ajax({
        type: "POST",
        url: "../../FormsService.aspx/InductionCandidateStatus",
        data: dataString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (msg) {
            $.each(msg.d, function (index, item) {
                $("#selectCanidateStatus").get(0).options[$("#selectCanidateStatus").get(0).options.length] = new Option(item.LocationDesc);
            });
            $("#selectCanidateStatus").selectedIndex = 1;
        },
        error: function () {
           // alert("Failed to CanidateStatus");
        }
    });

    /// Bind InductionCountryName
    // 312539
    var dataString = '{"joininglocation":"' + $("#downloadSelectLocation").val() + '"}';
    $.ajax({
        type: "POST",
        url: "../../FormsService.aspx/InductionCountryName",
        data: dataString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (msg) {
            $.each(msg.d, function (index, item) {
                $("#selectCountry").get(0).options[$("#selectCountry").get(0).options.length] = new Option(item.LocationDesc);
            });
            $("#selectCountry").selectedIndex = 1;
        },
        error: function () {
            //alert("Failed to CanidateStatus");
        }
    });



    //GetCanidateJoiningTypes
    // 312539
    var dataString = '{"joininglocation":"' + $("#downloadSelectLocation").val() + '"}';
    $.ajax({
        type: "POST",
        url: "../../FormsService.aspx/InductionCanidateJoiningTypes",
        data: dataString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (msg) {
            $.each(msg.d, function (index, item) {
                $("#selectCanidatejoiningtype").get(0).options[$("#selectCanidatejoiningtype").get(0).options.length] = new Option(item.LocationDesc);
            });
            $("#selectCanidatejoiningtype").selectedIndex = 1;
        },
        error: function () {
           // alert("Failed to CanidateJoiningTypes");
        }
    });
   // Bind ChireStatus
  //  312539
    var dataString = '{"joininglocation":"' + $("#downloadSelectLocation").val() + '"}';
    $.ajax({
        type: "POST",
        url: "../../FormsService.aspx/GetChireStatus",
        data: dataString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (msg) {
            $.each(msg.d, function (index, item) {
                $("#selectCHireStatus").get(0).options[$("#selectCHireStatus").get(0).options.length] = new Option(item.LocationDesc);
            });
            $("#selectCHireStatus").selectedIndex = 1;
        },
        error: function () {
            //alert("Failed to CHireStatus");
        }
    });
   //  Bind Induction StartDate & EndDate 
   // 312539
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
    $("#DOJFromInputBox1").val(stDate);
    $("#DOJToInputBox").val(endDate);
    $("#DOJFromInputBox1").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar', showOn: "both", buttonImage: "../../Images/calendar.png", changeMonth: true, buttonImageOnly: true, changeYear: true, buttonAfter: false });
    $("#DOJToInputBox").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar', showOn: "both", buttonImage: "../../Images/calendar.png", changeMonth: true, buttonImageOnly: true, changeYear: true, buttonAfter: false });

    ///apply button onclick
    $("#iframeExcel").hide();
    $('#btnDownloadAttendance').click(function () {
         $("#LoadingImage").show();
         LoadExcel();
       
    });
});

function ValidateApply2() {
    var status1 = false;
    if (status1 == DateCompare($('#DOJFromInputBox1').val(), $('#DOJToInputBox').val())) {
        MsgboxAlertDashboard(23, 2, 27, "DATE_VALIDATE", "Invalid Date Range!Start Date cannot be after End Date");
         return false;}
   // DownloadAttendance(1);
}

function LoadExcel() {

    $("#popup_box").show();
    var pageNo = 1;
    var fromDate = $("#DOJFromInputBox1").val();
    var toDate = $("#DOJToInputBox").val();
    var joininglocation = $("#downloadSelectLocation").val();
    var inducationlocation = $("#downloadSelectvenue").val();
    var country = $("#selectCountry").val();
    var canidateStatus = $("#selectCanidateStatus").val();
    var canidatejoiningtype = $("#selectCanidatejoiningtype").val();
    var selectCHireStatus = $("#selectCHireStatus").val();

    $("#iframeExcel").attr('src', '../../FormsService.aspx?pageNo=' + pageNo + ' &fromDate=' + fromDate + ' &toDate=' + toDate + ' &joininglocation=' + joininglocation + ' &inducationlocation=' + inducationlocation + ' &country=' + country + ' &canidateStatus=' + canidateStatus + ' &canidatejoiningtype=' + canidatejoiningtype + ' &selectCHireStatus=' + selectCHireStatus + '');
    $("#LoadingImage").hide();
}


//Selecte index Change City
function CitySelectedIndexchangeBindInductionLocation() {

    $("#downloadSelectvenue").empty();
    var dataString = '{"joininglocation":"' + $("#downloadSelectLocation").val() + '"}';
    $.ajax({
        type: "POST",
        url: "../../FormsService.aspx/CitySelectedIndexchangeBindInductionLocation",
        data: dataString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (msg) {
            $.each(msg.d, function (index, item) {
                $("#downloadSelectvenue").get(0).options[$("#downloadSelectvenue").get(0).options.length] = new Option(item.LocationDesc);
            });
            $("#downloadSelectvenue").selectedIndex = 1;
        },
        error: function () {
           // alert("Failed to InductionLocation");
        }
    });


}





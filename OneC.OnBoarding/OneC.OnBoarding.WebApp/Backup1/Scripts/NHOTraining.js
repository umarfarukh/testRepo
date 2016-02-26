$().ready(function () {
    //Variable which holds list of parameters passed in query string in array object
    var qs = (function (a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'));
    alert("SessionID HArdCoded");
    //Initializing globally processing variables
    candidateId = 20809208; //parseInt(qs["cand"]);
    taskId = 0; // parseInt(qs["task"]);
    countryId = 4; // parseInt(qs["cntry"]);
    sessionId = 23; // parseInt(qs["ss"]);
    ProcessID = 1; //parseInt(qs["processID"]);

    //    $.ajax({
    //        type: "POST",
    //        url: "../../../../FormsService.aspx/BindTrainingName",
    //        data: "{}",
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (msg) {
    //            $.each(msg.d, function (index, item) {
    //                $("#trainingNameSelectBox").get(0).options[$("#trainingNameSelectBox").get(0).options.length] = new Option(item.CandidateTypeDesc, item.CandidateTypeCode);
    //            });
    //          

    //        },
    //        error: function () {
    //            alert("Failed to load Training Name");
    //        }

    //    });

    //    $.ajax({
    //        type: "POST",
    //        url: "../../../../FormsService.aspx/BindTrainingStatus",
    //        data: "{}",
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (msg) {

    //            $.each(msg.d, function (index, item) {
    //                $("#trainingStatusSelectBox").get(0).options[$("#trainingStatusSelectBox").get(0).options.length] = new Option(item.StatusCode, item.StatusDesc);
    //            });
    //            //$("#countrySelectBox").selectedIndex = 3;
    //           
    //        },
    //        error: function () {
    //            alert("Failed to load");
    //        }
    //    });
    var pgDom = {};
    GetFaqInfo(4,1);





});


function OpenDrillDown(TrainingId) {
    var pageDetails = '';
    //var dataString = '{TrainingId:' + TrainingID  '}';
       var datastring = "{";
       datastring += "'trainingId':" + TrainingId + ",";
       datastring += "'sessionId':" + 23 ;
       datastring += "}";
       var increment = 0;
       var RegisteredDate, AssociateId, AssociateName, TrainingID, TrainingDate;
       var ModifyId = 0;
       var UpdateId = 1;
       var DeleteId = 2; var CancelId = 3;
       $.ajax({
           type: "POST",
           url: "../../../../FormsService.aspx/FetchTrainingDrillDownData",
           data: datastring,
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           success: function (msg) {
               pgDom = OBParseXML(msg.d[0].Value); ;
               pageDetails += '<div>Drill Down Data</div>';
               pageDetails += '<table width="40%" align="center" border="0" ><tr><th class="task_t">EmployeeId</th><th class="task_t">EmployeeName</th><th class="status_t">TrainingDates</th></tr><th class="status_t">RegisteredDate</th>'; /*adding header image */
               //   pageDetails += '<div class="content"><div class="faq_header"><p>Generic Frequently Asked Questions</p></div><div class="questions">';
               $(pgDom).find('ArrayOfCandidateTrainingDC').find('CandidateTrainingDC').each(function () {
                   AssociateId = $(this).find('AssociateId').text();
                   AssociateName = $(this).find('AssociateName').text();
                   RegisteredDate = $(this).find('RegisteredDate').text();
                   TrainingID = $(this).find('TrainingId').text();
                   TrainingDate = $(this).find('TrainingScheduledDate').text();
                   increment++;
                   pageDetails += '<tr>';
                   pageDetails += '<td class="even_row">' + AssociateId + '</td>';
                   pageDetails += '<td class="even_row">' + AssociateName + '</td>';
                   pageDetails += '<td class="even_row" id='+increment+ '>';
                   pageDetails += '<span id="candspan'+increment+ '"class="labelValue">' +TrainingDate+ '</span>';
                   //    pageDetails += '<input class="editInput" type="text" style="display:none" id=text_id' + txt_date + '/>' + Date + '</td>';
                   pageDetails += '<input type="text" class="editInput" value="" id="candtextid'+increment+'"style="display: none;"/> </td>'
                   pageDetails += '<td class="even_row">'+RegisteredDate+'</td>';
                //   pageDetails += '<td class="even_row"> <a  id="a_Modify' + increment + '"onclick="ModifyCandidateDates(' + increment + ',' + TrainingID + ')";>Modify</a><a id="a_Update' + txt_date + '"style="display: none;" onclick="ModifyCandidateDates(' + increment + ',' + TrainingID + ');">Update</a> <a id="a_Cancel' + txt_date + '" style="display: none;" onclick="ModifyCandidateDates(' + increment + ',' + TrainingID + ');">Cancel</a></td>';
                   pageDetails += '<td class="even_row"> <a  id="canda_Modify' + increment + '"onclick="ModifyCandidateDates(' + increment + ',' + ModifyId + ',' + TrainingID + ',' + AssociateId + ')";>Modify</a><a id="canda_Update' + increment + '"style="display: none;" onclick="EnableRowsToEdit(' + increment + ',' + UpdateId + ',' + TrainingID + ',' + AssociateId + ');">Update</a> <a id="canda_Cancel' + increment + '" style="display: none;" onclick="EnableRowsToEdit(' + increment + ',' + CancelId + ',' + TrainingID + ',' + AssociateId + ');">Cancel</a></td>';
                    
                   pageDetails += '</tr>';
               });
               pageDetails += '</table>';
               document.getElementById("DrillDown").innerHTML = "";
               $('#DrillDown').append(pageDetails);
               // $('#DrillDown').append(pageDetails);
           },
           error: function (xhr) { alert('error'); }
       });
}
function GetFaqInfo(startIndex, pageNo) {

    var datastring = "{";
    datastring += "'sessionId':" + sessionId + ",";
    datastring += "'PageSize':" + startIndex + ",";
    datastring += "'PageNo':" + pageNo  ;
    datastring += "}";

    $.ajax({
        type: "POST",
        url: "../../../../FormsService.aspx/FetchTrainingData",
        data: datastring,

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d[1].Value == "") {
                $('#NHOMain').append(msg.d[0].Value); ;
            }
            else {
                pgDom = OBParseXML(msg.d[0].Value); ;
                //  pgDom = OBParseXML(msg.d);
                var pageDetails = '';
                var TrainingName;
                var TrainingDate;
                var City;
                var FromTime, ToTime, CandidateCount;
                var ModifyId = 0;
                var UpdateId = 1;
                var DeleteId = 2; var CancelId = 3;
                var txt_date = 0;
                var TrainingID;
                var SpanId; var TextId; var aTagId;

                pageDetails += '<div> NHO Training Details</div>';
                pageDetails += '<table width="40%" align="center" border="0" ><tr><th class="task_t">TrainingName</th><th class="task_t">Date</th><th class="status_t">City</th><th class="date_t">From Date</th><th class="time_t">To Date</th><th class="action_t">Enrolled Candidates</th><th class="ref_t">Modify</th><th class="ref_t">Delete</th></tr>'; /*adding header image */
                //   pageDetails += '<div class="content"><div class="faq_header"><p>Generic Frequently Asked Questions</p></div><div class="questions">';
                $(pgDom).find('ArrayOfNewHireTrainingDC').find('NewHireTrainingDC').each(function () {
                    TrainingName = $(this).find('TrainingName').text();
                    TrainingDate = $(this).find('TrainingScheduledDate').text();
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
                    pageDetails += '<td class="even_row" id=' + txt_date + '>';
                    pageDetails += '<span id="span' + txt_date + '"class="labelValue">' + TrainingDate + '</span>';
                    //    pageDetails += '<input class="editInput" type="text" style="display:none" id=text_id' + txt_date + '/>' + Date + '</td>';
                    pageDetails += '<input type="text" class="editInput" value="" id="textid' + txt_date + '"style="display: none;"/> </td>'
                    pageDetails += '<td class="even_row">' + City + '</td>';
                    pageDetails += '<td class="even_row">' + FromTime + '</td>';
                    pageDetails += '<td class="even_row">' + ToTime + '</td>';
                  //  pageDetails += '<td class="even_row">' + CandidateCount + '</td>';
                    pageDetails += '<td class="even_row"><a id="aCandidateCount' + txt_date + '" onclick="OpenDrillDown(' + TrainingID + ');">' + CandidateCount + '</a></td>';
                    //  pageDetails += '<td class="even_row"> <a  id="a_Modify' + txt_date + '"onclick="EnableRowsToEdit(' + aTagId + ',' + SpanId + ',' + TextId + ',' + ModifyId + ',' + TrainingID + ')";>Modify</a><a id="a_Update" style="display: none;" onclick="EnableRowsToEdit(' + SpanId + ',' + TextId + ',' + UpdateId + ',' + TrainingID + ');">Update</a> <a id="a_Delete" style="display: none;" onclick="EnableRowsToEdit(' + SpanId + ',' + TextId + ',' + DeleteId + ',' + TrainingID + ');">Delete</a></td>';
                    pageDetails += '<td class="even_row"> <a  id="a_Modify' + txt_date + '"onclick="EnableRowsToEdit(' + txt_date + ',' + ModifyId + ',' + TrainingID + ')";>Modify</a><a id="a_Update' + txt_date + '"style="display: none;" onclick="EnableRowsToEdit(' + txt_date + ',' + UpdateId + ',' + TrainingID + ');">Update</a> <a id="a_Cancel' + txt_date + '" style="display: none;" onclick="EnableRowsToEdit(' + txt_date + ',' + CancelId + ',' + TrainingID + ');">Cancel</a></td>';
                    pageDetails += '<td class="even_row"> <a id="a_Delete' + txt_date + '"onclick="EnableRowsToEdit(' + txt_date + ',' + DeleteId + ',' + TrainingID + ');">Delete</a></td>';
                    pageDetails += '</tr>';
                });
                pageDetails += '</table>';

                resultdata = msg.d[1].Value;
                pageDetails += resultdata;

                document.getElementById("NHOMain").innerHTML = "";
                $('#NHOMain').append(pageDetails);

            }
        },
        error: function (xhr) { alert('error'); }

    });
    
}
function PaginationDashboard(startIndex, pageNo) {
      GetFaqInfo(startIndex, pageNo);

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

function ModifyCandidateDates(increment, Mode, TrainingID, AssociateId) {
    var DateToUpdate;
    /* Modify Mode */
    if (Mode == 0) {

        document.getElementById("candspan"+increment).style.display = 'none';
        document.getElementById("candtextid"+increment).style.display = 'block';
        document.getElementById("candtextid"+increment).value = document.getElementById("span" + increment).innerText;
     document.getElementById("canda_Modify" + increment).style.display = 'none';
      //  document.getElementById("a_Modify1").style.display = 'none';
       document.getElementById("canda_Update" + increment).style.display = 'block';
      //  document.getElementById("a_Update1").style.display = 'block';
       document.getElementById("canda_Cancel" + increment).style.display = 'block';
      //  document.getElementById("a_Cancel1").style.display = 'block';

    }
    /* Update Mode */
    else if (Mode == 1) {


        document.getElementById("candspan" + increment).style.display = 'block';
        document.getElementById("candtextid" + increment).style.display = 'none';

        document.getElementById("canda_Modify" + increment).style.display = 'block';
        document.getElementById("canda_Update" + increment).style.display = 'none';
        document.getElementById("canda_Cancel" + increment).style.display = 'none';
        DateToUpdate = document.getElementById("candtextid" + increment).value;
        document.getElementById("candspan" + increment).innerText = DateToUpdate;
        UpdateCandidateDate(TrainingID, DateToUpdate, Mode, AssociateId);

    }
    /* Delete Mode */
    else if (Mode == 2) {
        DateToUpdate = document.getElementById("candspan" +increment).innerText;
        var conf = confirm("Are You sure to Delete?");
        if (conf == true) {
            UpdateCandidateDate(TrainingID, DateToUpdate, Mode, AssociateId);
        }
    }
    /* Cancel Mode */
    else if (Mode == 3) {
        document.getElementById("candspan" + increment).style.display = 'block';
        document.getElementById("candtextid" + increment).style.display = 'none';
        document.getElementById("candspan" + increment).innerText = document.getElementById("candspan" + increment).innerText;
        document.getElementById("canda_Modify" + increment).style.display = 'block';
        document.getElementById("canda_Update" + increment).style.display = 'none';
        document.getElementById("canda_Cancel" + increment).style.display = 'none';
    }
}

function EnableRowsToEdit(txt_date, Mode, TrainingID) {
    var DateToUpdate;
/* Modify Mode */
    if (Mode == 0) {

        document.getElementById("span" + txt_date).style.display = 'none';
        document.getElementById("textid" + txt_date).style.display = 'block';
        document.getElementById("textid" + txt_date).value = document.getElementById("span" + txt_date).innerText;
        document.getElementById("a_Modify" + txt_date).style.display = 'none';
        document.getElementById("a_Update" + txt_date).style.display = 'block';
        document.getElementById("a_Cancel" + txt_date).style.display = 'block';
    }
    /* Update Mode */
    else if (Mode == 1) {
       

        document.getElementById("span" + txt_date).style.display = 'block';
        document.getElementById("textid" + txt_date).style.display = 'none';

        document.getElementById("a_Modify" + txt_date).style.display = 'block';
        document.getElementById("a_Update" + txt_date).style.display = 'none';
        document.getElementById("a_Cancel" + txt_date).style.display = 'none';
        DateToUpdate = document.getElementById("textid" + txt_date).value;
        document.getElementById("span" + txt_date).innerText = DateToUpdate;
        Update(TrainingID, DateToUpdate, Mode);

    }
    /* Delete Mode */
    else if (Mode == 2) {
        DateToUpdate = document.getElementById("span" + txt_date).innerText;
        var conf = confirm("Are You sure to Delete?");
        if (conf == true) {
            Update(TrainingID, DateToUpdate, Mode);
        }
    }
    /* Cancel Mode */
    else if (Mode == 3) {
        document.getElementById("span" + txt_date).style.display = 'block';
        document.getElementById("textid" +txt_date).style.display = 'none';
        document.getElementById("span" + txt_date).innerText = document.getElementById("span" + txt_date).innerText;
        document.getElementById("a_Modify" + txt_date).style.display = 'block';
        document.getElementById("a_Update" + txt_date).style.display = 'none';
        document.getElementById("a_Cancel" + txt_date).style.display = 'none';
    }
}
function UpdateCandidateDate(TrainingID, AssociateId) {

    var dataString = '{trainingId:' + TrainingID + "," + 'sessionId:' + 23 + "," + "," + 'candidateId:' + AssociateId + '}';
    $.ajax({
        type: "POST",
        url: "../../../../FormsService.aspx/UpdateCandidateTrainingData",
        data: dataString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d == 1) {
                GetFaqInfo(4, 1)

                MsgboxAlert(23, 1, 26, "DATA_UPDATE_SUCCESS", "Data Updated Successfully");
            }
            else
                MsgboxAlert(23, 1, 45, "DATA_UPDATE_FAILURE", "Data Updation Failed");
            //GetFaqInfo();
        },
        error: function (xhr) { alert('error'); }
    });
}

function Update(TrainingID, DateToUpdate, Mode) {
    var TrainindDataXML = '<NewHireInduction><TrainingId' > +TrainingID + '</TrainingId><TrainingStatus>' + Mode + '</TrainingStatus><RegistrationCount /></NewHireInduction>';
    var dataString = '{TrainingId:' + TrainingID + "," + 'sessionId:' + 23 + "," + 'DateToUpdate:' + "'" + DateToUpdate +  "'" + "," + 'Mode:' + Mode + '}';
    $.ajax({
        type: "POST",
        url: "../../../../FormsService.aspx/UpdateNHOTrainingData",
        data: dataString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d == 1) {
            GetFaqInfo(4,1)

                MsgboxAlert(23, 1, 26, "DATA_UPDATE_SUCCESS", "Data Updated Successfully");
            }
            else
                MsgboxAlert(23, 1, 45, "DATA_UPDATE_FAILURE", "Data Updation Failed");
            //GetFaqInfo();
        },
        error: function (xhr) { alert('error'); }
    });
}
$(function () {
  //  $('#textid').attr("disabled", "true");
    $("#textid1").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar', showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    });

});





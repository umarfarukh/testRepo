
///* Training Register Cancel*/

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


//Initializing globally processing variables
candidateId = parseInt(qs["cand"]);
taskId = parseInt(qs["task"]);
countryId = parseInt(qs["cntry"]);
sessionId = parseInt(qs["ss"]);
var formClose = 0;

$().ready(function () {

    var IsAttemptsProvided;
    IsAttemptsProvided = TaskPrefillValues.PrefillValues.Set1.IsAttemptsProvided;
    var score = TaskPrefillValues.PrefillValues.Set2.Score;

    if (score > 50) {

        $("#Pg_1_lbl_Day2ST").hide();
        $("#Pg_1_lbl_Day2ET").hide();
        $("#Pg_1_text_DaytwoStartTime").hide();
        $("#Pg_1_text_DaytwoEndTime").hide();

    }

    OBPager.BindTrainingDates("TrainingId");
    if (document.getElementById('TrainingId').length <= 1 && OBPager.taskStatusFlag != 1) {
        //  if( document.getElementById('TrainingId')


        document.getElementById("nodataDiv").style.display = 'block';
    }
    else {
        document.getElementById("InductionSelctionDiv").style.display = 'block';
        if ((OBPager.taskStatusFlag != "-1") && (TaskPrefillValues.PrefillValues.Set1.TrainingId != "-1")) {

            OBPager.SetTaskContentMemberValue('NewHireInduction.TrainingId', null, TaskPrefillValues.PrefillValues.Set1.TrainingId, true);
            //   document.getElementById("Pg_1_text_State").innerText = TaskPrefillValues.PrefillValues.Set1.TrainingState
            if (document.getElementById('TrainingId').length <= 1) {
                document.getElementById('TrainingId')[0].text = TaskPrefillValues.PrefillValues.Set1.TrainingName;
            }
            $("#Pg_1_text_State").val(TaskPrefillValues.PrefillValues.Set1.TrainingState);
            $("#Pg_1_text_StartTime").val(TaskPrefillValues.PrefillValues.Set1.StartTime);
            $("#Pg_1_text_EndTime").val(TaskPrefillValues.PrefillValues.Set1.EndTime);
            if (score < 50) {
                $("#Pg_1_text_DaytwoStartTime").val(TaskPrefillValues.PrefillValues.Set1.DaytwoStartTime);
                $("#Pg_1_text_DaytwoEndTime").val(TaskPrefillValues.PrefillValues.Set1.DaytwoEndTime);
            }
            //   
            if (TaskPrefillValues.PrefillValues.Set1.AttendanceStatus == 1) {

                OBPager.SetTaskContentMemberValue('NewHireInduction.TrainingId', null, TaskPrefillValues.PrefillValues.Set1.TrainingStartDate, true);
                document.getElementById('TrainingId')[0].text = TaskPrefillValues.PrefillValues.Set1.TrainingStartDate;
                document.getElementById('TrainingId').disabled = true;
                document.getElementById('Pg_1_text_State').disabled = true;
                document.getElementById('Pg_1_text_StartTime').disabled = true;
                document.getElementById('Pg_1_text_EndTime').disabled = true;
                if (score < 50) {
                    document.getElementById('Pg_1_text_DaytwoStartTime').disabled = true;
                    document.getElementById('Pg_1_text_DaytwoEndTime').disabled = true;
                }
                document.getElementById("btnRegister").style.display = 'none';
                document.getElementById("btnCancel").style.display = 'none';
                // document.getElementById("note").innerText = "Note*:Your Registration is Blocked.Kinldy Contact your IM for further information"
                $("#note").text("Note*:Your Registration is Blocked.Kinldy Contact your IM for further information");

            }
            else if (TaskPrefillValues.PrefillValues.Set1.RegistrationCount >= 3 && (TaskPrefillValues.PrefillValues.Set1.IsAttemptsProvided == 1)) {
                OBPager.SetTaskContentMemberValue('NewHireInduction.TrainingId', null, TaskPrefillValues.PrefillValues.Set1.TrainingStartDate, true);
                document.getElementById('TrainingId')[0].text = TaskPrefillValues.PrefillValues.Set1.TrainingStartDate;
                document.getElementById('TrainingId').disabled = true;
                document.getElementById('Pg_1_text_State').disabled = true;
                document.getElementById('Pg_1_text_StartTime').disabled = true;
                document.getElementById('Pg_1_text_EndTime').disabled = true;
                if (score < 50) {
                    document.getElementById('Pg_1_text_DaytwoStartTime').disabled = true;
                    document.getElementById('Pg_1_text_DaytwoEndTime').disabled = true;
                }

                document.getElementById("btnRegister").style.display = 'none';
                document.getElementById("btnCancel").style.display = 'none';
                // document.getElementById("note").innerText = "Note*:You have modified the date twice,and will not be able to change it further.Please contact your Recruiter/Induction Manager for any further information/changes.";
                $("#note").text("Note*:You have modified the date twice,and will not be able to change it further.Please contact your Recruiter/Induction Manager for any further information/changes.");
            }

            else {
                if (TaskPrefillValues.PrefillValues.Set1.IsAttemptsProvided == 1) {
                    // document.getElementById("note").innerText = "Note* :You will be allowed to modify the registration date only 2 times.";
                    $("#note").text("Note* : Depending on the number of joiners in Ireland, we may run a local Corporate Induction Program, this will be reviewed at the time of your registration.");
                    $("#note1").text("You will be allowed to modify the registration date twice from the first time you register online.");
                }
                if (document.getElementById('TrainingId').value == -1) {
                    document.getElementById("btnRegister").value = "Register";
                    document.getElementById("btnCancel").style.display = 'none';
                }
                else {
                    document.getElementById("btnRegister").value = "Modify Registration";
                    document.getElementById("btnCancel").value = "Cancel Registration";
                }
            }
        }
        else {
            //  document.getElementById("note").value = "You will be allowed to modify the registration date only 2 times.";
            if (TaskPrefillValues.PrefillValues.Set1.IsAttemptsProvided == 1) {
                //  document.getElementById("note").innerText = "Note* :You will be allowed to modify the registration date only 2 times.";
                $("#note").text("Note* : Depending on the number of joiners in Ireland, we may run a local Corporate Induction Program, this will be reviewed at the time of your registration.");
                $("#note1").text("You will be allowed to modify the registration date twice from the first time you register online.");
            }
            document.getElementById("btnRegister").value = "Register";
            document.getElementById("btnCancel").style.display = 'none';
            if (countryId.toString() == 104)
                document.getElementById("newhireinduction").style.display = 'block';
            $("#Pg_1_text_Name").text(TaskPrefillValues.PrefillValues.Set2.Name);
        }

    }
    TrainingSelectindexChange();
});



///* Training Details*/
function TrainingSelectindexChange() {
    //Selected indexChange
    var score = TaskPrefillValues.PrefillValues.Set2.Score;
    if (score < 50) {
        $(".smLabels").css("display", "block");
        $("#mlvlStartdate").css("display", "none");
    }
    if (document.getElementById('TrainingId').value == -1) {
        document.getElementById('Pg_1_text_State').value = "";
        // document.getElementById('Pg_1_text_City').value = "";
        document.getElementById('Pg_1_text_StartTime').value = "";
        document.getElementById('Pg_1_text_EndTime').value = "";
        document.getElementById('Pg_1_text_DaytwoStartTime').value = "";
        document.getElementById('Pg_1_text_DaytwoEndTime').value = "";
    }
    else {

        var datastring = "{";
        datastring += "'trainingId':" + $("#TrainingId").val() + ",";
        datastring += "'countryId':" + countryId.toString() + ",";
        datastring += "'sessionId':" + sessionId.toString();
        datastring += "}";
        $.ajax({
            type: "POST",
            url: "../../../../FormsService.aspx/FetchTrainingDetails",
            data: datastring,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {

                document.getElementById('btnRegister').disabled = false;
                document.getElementById('btnCancel').disabled = false;
                OBPager.SetTaskContentMemberValue('NewHireInduction.TrainingId', null, $("#TrainingId").val(), true);
                //  $("#Pg_1_text_City").val(TaskPrefillValues.PrefillValues.Set1.TrainingCity);
                $("#Pg_1_text_State").val(msg.d[0].TrainingState);
                $("#Pg_1_text_StartTime").val(msg.d[0].StartTime);
                $("#Pg_1_text_EndTime").val(msg.d[0].EndTime);
                if (score < 50) {
                    $("#Pg_1_text_DaytwoStartTime").val(msg.d[0].DaytwoStartTime);
                    $("#Pg_1_text_DaytwoEndTime").val(msg.d[0].DaytwoEndTime);
                }
            },
            error: function (xhr) {
                alert("Failed to load Training Details");

            }
        });
    }
}


function RegisterCancel(Mode) {
    //Selected indexChange
    var dataString;

    var score = TaskPrefillValues.PrefillValues.Set2.Score;

    if (Mode == 1 && document.getElementById('TrainingId').value == TaskPrefillValues.PrefillValues.Set1.TrainingId) {
        formClose = 1;
        alert("You have already registered for this date, Please choose any other one.");
    }
    else if (document.getElementById('TrainingId').value == -1) {
        formClose = 1;
        alert("Please select the Training Date!");
    }
    else {
        var conf = true; ;
        formClose = 0;
        var datasave = JSON.stringify(jQXB.getDataSource(OBPager.taskContentDSName)).toString();
        var datastring = "{";
        datastring += "'trainingId':" + $("#TrainingId").val() + ",";
        datastring += "'candidateId':" + candidateId.toString() + ",";
        datastring += "'mode':" + Mode + ",";
        datastring += "'datasave':'" + datasave + "',";
        datastring += "'taskid':" + taskId.toString() + ",";
        datastring += "'sessionId':" + sessionId.toString() + ",";

        datastring += "'countryId':" + countryId;
        datastring += "}";
        if (Mode == 2) {
            conf = confirm("Do you want to cancel your registration? You will need to come back and re-register yourself");
        }
        if (conf == true) {
            $.ajax({
                type: "POST",
                url: "../../../../FormsService.aspx/RegisterCancelTrainingDetails",
                data: datastring,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (msg) {
                    if (msg.d[0].Value == 1) {
                        if (Mode == 1) {

                            if (document.getElementById("btnRegister").value == "Register") {

                                if (score >= 50) {
                                    dataString = '{notificationMasterId:' + 23 + ',notificationMappingId:' + 0 + ',candidateId:' + candidateId.toString() + ',countryID:' + "'" + countryId + "'" + '}';
                                    $.MailSend(dataString);
                                }
                                else {

                                    dataString = '{notificationMasterId:' + 90 + ',notificationMappingId:' + 0 + ',candidateId:' + candidateId.toString() + ',countryID:' + "'" + countryId + "'" + '}';
                                    $.MailSend(dataString);
                                }

                                dataString = '{notificationMasterId:' + 40 + ',notificationMappingId:' + 0 + ',candidateId:' + candidateId.toString() + ',countryID:' + "'" + countryId + "'" + '}';
                                $.MailSend(dataString);
                            }


                            if (document.getElementById("btnRegister").value == "Modify Registration") {

                                if (score >= 50) {
                                    dataString = '{notificationMasterId:' + 24 + ',notificationMappingId:' + 0 + ',candidateId:' + candidateId.toString() + ',countryID:' + "'" + countryId + "'" + '}';
                                    $.MailSend(dataString);
                                }
                                else {

                                    dataString = '{notificationMasterId:' + 91 + ',notificationMappingId:' + 0 + ',candidateId:' + candidateId.toString() + ',countryID:' + "'" + countryId + "'" + '}';
                                    $.MailSend(dataString);
                                }

                            }
                        }

                        else if (Mode == 2) {
                            dataString = '{notificationMasterId:' + 25 + ',notificationMappingId:' + 0 + ',candidateId:' + candidateId.toString() + ',countryID:' + "'" + countryId + "'" + '}';
                            $.MailSend(dataString);
                        }
                        /* Disabling after 3rd attempt */
                        if (msg.d[1].Value == 1) {
                            document.getElementById('TrainingId').disabled = true;
                            document.getElementById('Pg_1_text_State').disabled = true;
                            document.getElementById('Pg_1_text_StartTime').disabled = true;
                            document.getElementById('Pg_1_text_EndTime').disabled = true;
                            if (score < 50) {
                                document.getElementById('Pg_1_text_DaytwoStartTime').disabled = true;
                                document.getElementById('Pg_1_text_DaytwoEndTime').disabled = true;
                            }
                            document.getElementById("btnRegister").style.display = 'none';
                            document.getElementById("btnCancel").style.display = 'none';
                            // document.getElementById("note").innerText = "Note*:You have modified the date twice,and will not be able to change it further.Please contact your Recruiter/Induction Manager for any further information/changes."
                            $("#note").text("Note*:You have modified the date twice,and will not be able to change it further.Please contact your Recruiter/Induction Manager for any further information/changes.");
                        }
                        else {
                            if (Mode == 2) {
                                document.getElementById("btnRegister").value = "Register";
                                document.getElementById("btnCancel").style.display = 'none';
                                document.getElementById('TrainingId').value = -1;
                                document.getElementById('Pg_1_text_State').value = "";
                                document.getElementById('Pg_1_text_StartTime').value = "";
                                document.getElementById('Pg_1_text_EndTime').value = "";
                                if (score < 50) {
                                    document.getElementById('Pg_1_text_DaytwoStartTime').value = "";
                                    document.getElementById('Pg_1_text_DaytwoEndTime').value = "";
                                }
                            }
                            else {
                                document.getElementById("btnRegister").style.display = 'block';
                                document.getElementById("btnCancel").style.display = 'block';
                                document.getElementById("btnRegister").value = "Modify Registration";
                                document.getElementById("btnCancel").value = "Cancel Registration";
                                document.getElementById("newhireinduction").style.display = 'none';
                            }
                            alert("Updated Sucessfully!");
                        }
                    }
                    else {
                        alert("Registration Failed");
                    }
                },
                error: function (xhr) {
                    alert("Failed to Register Training Details");
                }
            });

        }
    }
    if (formClose == 0)
        window.close();
}

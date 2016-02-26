/* Make this statement in end of script - as data loading and other predata filling works has to be completed */
//Display default page on load
$().ready(function () {
    if (TaskPrefillValues.PrefillValues.Set1.TaskStatus == 1) {
        $('#Pg_1_check_chkOffice').attr('disabled', 'disabled');
        $('#Pg_1_check_chkOffice').attr('checked', 'checked');
    }
    var candidateId = 0, taskId = 0, countryId = 0, sessionId = 0;
    candidateId = parseInt(qs["cand"]);
    taskId = parseInt(qs["task"]);
    countryId = parseInt(qs["cntry"]);
    sessionId = parseInt(qs["ss"]);
    openMode = 0;
    var qstring = TaskPrefillValues.PrefillValues.Set1.RedirectPDFURL + '?ss=' + sessionId + '&cand=' + candidateId + '&task=' + taskId + '&cntry=' + countryId + '&opmde=' + openMode;


    if (TaskPrefillValues.PrefillValues.Set1.UploadMode != NaN && TaskPrefillValues.PrefillValues.Set1.UploadMode != undefined && TaskPrefillValues.PrefillValues.Set1.UploadMode != null)
        qstring = qstring + '&upmde=' + TaskPrefillValues.PrefillValues.Set1.UploadMode.toString();




    if (qs["opmde"] != NaN && qs["opmde"] != undefined && parseInt(qs["opmde"]) != null) {
        openMode = parseInt(qs["opmde"]);

    }


    $("#ifPopUp").attr('src', qstring)
    if (taskId == 91 || taskId == 93 || taskId == 92 || taskId == 242) {
        $('#ifPopUp').remove();

        $('#Pg_1_check_chkOffice').attr("disabled", true);

        $('.pageDetails').append('<br><br><br><div style="font-size:10pt;">Please click on the link to complete the  <a  href="' + qstring + '" target="_blank" style="color: #3f678f;" onclick="urlchecked();">"' + TaskPrefillValues.PrefillValues.Set1.FormName + '".</a><br><br>Once you have completed the form, please check the box as indicated to confirm that the form has been submitted.This box should <u>not</u> be checked until you have completed the "' + TaskPrefillValues.PrefillValues.Set1.FormName + '".</div>')

//        if (taskId == 91 || taskId == 93 || taskId == 242) {
//            $('.pageDetails').append('<br><br><br><div style="font-size:10pt;">Please click on the link to complete the  <a  href="' + qstring + '" target="_blank" style="color: #3f678f;" onclick="urlchecked();">"' + TaskPrefillValues.PrefillValues.Set1.FormName + '".</a><br><br>Once you have completed the form, please check the box as indicated to confirm that the form has been submitted.This box should <u>not</u> be checked until you have completed the "' + TaskPrefillValues.PrefillValues.Set1.FormName + '".</div>')
//        }
//        else {
//            $('.pageDetails').append('<br><br><br><div style="font-size:10pt;">Please click on the link to complete the  <a  href="' + qstring + '" target="_blank" style="color: #3f678f;" onclick="urlchecked();">"' + TaskPrefillValues.PrefillValues.Set1.FormName + '".</a> (Username: CogUser ; Password: aware) <br><br>Once you have completed the form, please check the box as indicated to confirm that the form has been submitted.This box should <u>not</u> be checked until you have completed the "' + TaskPrefillValues.PrefillValues.Set1.FormName + '".</div>')
//        }
    }

    $("#Pg_1_p_headerName").text(TaskPrefillValues.PrefillValues.Set1.FormName);

    var msgshow = TaskPrefillValues.PrefillValues.Set1.PopUp;
    //    if (msgshow == 1) {
    //        $('#checkMsg').show();  
    //    }

    if (msgshow == 2) {
        $('#checkMsgState').show();
        $('#checkMsg').hide();
        $('#I9Msg').hide();
        $('#Manila_message2').hide();
        $('#Manila_message1').hide();

    }
    else if (msgshow == 3) {
        $('#I9Msg').show();
        $('#checkMsg').hide();
        $('#checkMsgState').hide();
        $('#Manila_message2').hide();
        $('#Manila_message1').hide();
    }
    else if (msgshow == 4) {
        $('#I9Msg').hide();
        $('#checkMsg').hide();
        $('#checkMsgState').hide();
        $('#Manila_message2').show();
        $('#Manila_message1').show();
    }

    else {
        $('#checkMsg').show();
    }

});

function SaveTaskData(saveMode) {
    try {
        if ($('#Pg_1_check_chkOffice').is(':checked')) {
            //    var res = MsgboxAlert(23, 2, 44, 'FORM_SUBMISSION_CONFIRM', "Are you sure to Submit?");
            var agree = confirm("Are you sure to Submit?");
            if (agree) {
                OBPager.PDFFlag = 1;
                if (taskId == 23) {
                    OBPager.taskId = 23;
                    $('#Pg_1_check_chkOffice').attr('disabled', 'disabled');
                    $('#Pg_1_check_chkOffice').attr('checked', 'checked');
                    if (OBPager.ValidateTaskData(1) == true) {
                        return OBPager.SaveTaskData(saveMode);
                    }
                    else {
                        $('#Pg_1_check_chkOffice').attr('disabled', false);
                        document.getElementById('Pg_1_check_chkOffice').checked = false;
                        $('#Pg_1_check_chkOffice').attr('checked', false);
                        MsgboxInfo(OBPager.ValidationMessage);
                    }
                }
                else {
                    return OBPager.SaveTaskData(saveMode);
                }
            }
            else {
                document.getElementById('Pg_1_check_chkOffice').checked = false;
                $('#Pg_1_check_chkOffice').attr('checked', false);
            }
        }
    }
    catch (e) {

    }
}

function urlchecked() {
    if ($('#Pg_1_check_chkOffice').is(':checked') == false) {
        $('#Pg_1_check_chkOffice').attr("disabled", false);
    }
}
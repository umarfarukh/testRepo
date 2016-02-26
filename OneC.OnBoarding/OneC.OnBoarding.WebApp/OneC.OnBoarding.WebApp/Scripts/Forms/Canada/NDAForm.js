﻿function DisableTextBox() {
    OBPager.SetTaskContentMemberValue('NDAForm.NotDisclosed', null, true, false);
    OBPager.SetTaskContentMemberValue('NDAForm.SeeBelow', null, "", false);
    OBPager.SetTaskContentMemberValue('NDAForm.UserDefined', null, "", false);
    OBPager.SetTaskContentMemberValue('NDAForm.Attachments', null, "", true);
    document.getElementById("Pg_9_text_Attachment").disabled = true;
}

function DisableTextBox1() {
    OBPager.SetTaskContentMemberValue('NDAForm.NotDisclosed', null, "", false);
    OBPager.SetTaskContentMemberValue('NDAForm.SeeBelow', null, "", false);
    OBPager.SetTaskContentMemberValue('NDAForm.UserDefined', null, true, false);
    OBPager.SetTaskContentMemberValue('NDAForm.Attachments', null, "", true);
    document.getElementById("Pg_9_text_Attachment").value = "";
    document.getElementById("Pg_9_text_Attachment").disabled = true;
}


function EnableTextBox() {
    OBPager.SetTaskContentMemberValue('NDAForm.NotDisclosed', null, "", false);
    OBPager.SetTaskContentMemberValue('NDAForm.SeeBelow', null, true, false);
    OBPager.SetTaskContentMemberValue('NDAForm.UserDefined', null, "", true);
    document.getElementById("Pg_9_text_Attachment").disabled = false;
}
$().ready(function () {
    $(function () {
        if ($('#Pg_9_check_None').is(':checked')) {
            $('#Pg_9_text_Attachment').attr('disabled', true);
            $('#Pg_9_check_Seebelow').removeAttr('checked');
            $('#Pg_9_check_Undefined').removeAttr('checked');
        }
        else if ($('#Pg_9_check_Undefined').is(':checked')) {
            $('#Pg_9_text_Attachment').attr('disabled', true);
        }
    });

    if (OBPager.taskStatusFlag == "-1") {
        /* Setting default values for the first time */
        OBPager.SetTaskContentMemberValue('NDAForm.NotDisclosed', null, true, false);
        OBPager.SetTaskContentMemberValue('NDAForm.SeeBelow', null, '', false);
        OBPager.SetTaskContentMemberValue('NDAForm.UserDefined', null, '', true);
    }

    $("#Pg_1_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set1.DOJDate);
    $("#Pg_1_text_DOJ").val(TaskPrefillValues.PrefillValues.Set1.DOJ);
    $("#Pg_8_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_8_text_CompanyName").val(TaskPrefillValues.PrefillValues.Set3.cdescription);
    $("#Pg_8_text_Title").val(TaskPrefillValues.PrefillValues.Set2.DesignationDesc);
    $("#Pg_8_text_CompanyTitle").val(TaskPrefillValues.PrefillValues.Set3.cuserdefined1);
    $("#Pg_8_text_Date").val(TaskPrefillValues.PrefillValues.Set1.Date);
    $("#Pg_8_text_CompanyDate").val(TaskPrefillValues.PrefillValues.Set1.Date);
    $("#Pg_9_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_9_text_CompanyName").val(TaskPrefillValues.PrefillValues.Set3.cdescription);
    $("#Pg_9_text_Titile").val(TaskPrefillValues.PrefillValues.Set2.DesignationDesc);
    $("#Pg_9_text_CompanyTitile").val(TaskPrefillValues.PrefillValues.Set3.cuserdefined1);
    $("#Pg_9_text_Date").val(TaskPrefillValues.PrefillValues.Set1.Date);
    $("#Pg_9_text_CompanyDate").val(TaskPrefillValues.PrefillValues.Set1.Date);
    OBPager.ShowPage(1);
    $('#Pg_9_text_Attachment').keydown(function (event) {
        var key_codes = [222, 220];
        if (!($.inArray(event.which, key_codes) >= 0)) {
        }
        else {
            event.preventDefault();
        }

    });
    //    $('#Pg_9_text_Attachment').live('keyup paste contextmenu', function (e) {
    //        $(e.target).keyup(value);
    //        $(e.target).mousemove(value);
    //      });
    //    function value(e) {
    //        var inputText = $(e.target).val().length;
    //        if (inputText > 200) {
    //            alert('Only 200 characters are allowed');
    //            $(this).val($(this).val().substring(0, 200));
    //        }


    //    }
});
function SaveTaskData(saveMode) {
    // saveMode { 0:Save, 1:Submit }
    if (saveMode == 1) {
        if (validate.ValidateSubmit() == true) {
            if (OBPager.ValidateTaskData(saveMode) == true) {
                try {
                    if (OBPager.SaveTaskData(saveMode) == true) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                catch (e) {
                }
            }
            else {

                MsgboxInfo(OBPager.ValidationMessage);
            }
        }
    }
    else {

        try {
            if (OBPager.SaveTaskData(saveMode) == true) {
                //alert('Task saved successfully');
                return true;
            }
            else {
                MsgboxInfo('Error occured while saving the task');
                return false;
            }
        }
        catch (e) {
        }
    }
}

function ResetTaskData() {
    OBPager.ResetTaskContent();
    if ($('#Pg_9_check_Seebelow:checked').length == 0) {
        $('#Pg_9_text_Attachment').attr('disabled', true);
    }
    if (OBPager.taskStatusFlag == -1) {
        // Set member value manually
        $("#Pg_1_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
        $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set1.Date);
        $("#Pg_1_text_DOJ").val(TaskPrefillValues.PrefillValues.Set1.DOJ);
        $("#Pg_8_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
        $("#Pg_8_text_CompanyName").val(TaskPrefillValues.PrefillValues.Set3.cdescription);
        $("#Pg_8_text_Title").val(TaskPrefillValues.PrefillValues.Set2.DesignationDesc);
        $("#Pg_8_text_CompanyTitle").val(TaskPrefillValues.PrefillValues.Set3.cuserdefined1);
        $("#Pg_8_text_Date").val(TaskPrefillValues.PrefillValues.Set1.Date);
        $("#Pg_8_text_CompanyDate").val(TaskPrefillValues.PrefillValues.Set1.Date);
        $("#Pg_9_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
        $("#Pg_9_text_CompanyName").val(TaskPrefillValues.PrefillValues.Set3.cdescription);
        $("#Pg_9_text_Titile").val(TaskPrefillValues.PrefillValues.Set2.DesignationDesc);
        $("#Pg_9_text_CompanyTitile").val(TaskPrefillValues.PrefillValues.Set3.cuserdefined1);
        $("#Pg_9_text_Date").val(TaskPrefillValues.PrefillValues.Set1.Date);
        $("#Pg_9_text_CompanyDate").val(TaskPrefillValues.PrefillValues.Set1.Date);
        OBPager.SetTaskContentMemberValue('NDAForm.Attachments', null, '', false);
        OBPager.SetTaskContentMemberValue('NDAForm.NotDisclosed', null, true, false);
        OBPager.SetTaskContentMemberValue('NDAForm.SeeBelow', null, '', false);
        OBPager.SetTaskContentMemberValue('NDAForm.UserDefined', null, '', true);
        document.getElementById("Pg_9_text_Attachment").disabled = true;
        jQXB.doBind(OBPager.taskContentDSName);
    }
}



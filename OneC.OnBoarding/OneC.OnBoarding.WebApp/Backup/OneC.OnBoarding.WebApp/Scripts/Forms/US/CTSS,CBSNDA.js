function Enableyes() {
    OBPager.SetTaskContentMemberValue('NDAForm.Yes', null, "1", false);
    OBPager.SetTaskContentMemberValue('NDAForm.No', null, "", true);

}
function Enableno() {

    OBPager.SetTaskContentMemberValue('NDAForm.Yes', null, "", false);
    OBPager.SetTaskContentMemberValue('NDAForm.No', null, "1", true);

}

function DisableTextBox() {
    OBPager.SetTaskContentMemberValue('NDAForm.NotDisclosed', null, "1", false);
    OBPager.SetTaskContentMemberValue('NDAForm.SeeBelow', null, "", false);
    OBPager.SetTaskContentMemberValue('NDAForm.UserDefined', null, "", false);
    OBPager.SetTaskContentMemberValue('NDAForm.Attachments', null, "", false);
    OBPager.SetTaskContentMemberValue('NDAForm.Additional', null, "", true);
    document.getElementById("Pg_9_text_Attachment").disabled = true;
    document.getElementById("Pg_9_text_no").disabled = true;
}

function DisableTextBox1() {
    OBPager.SetTaskContentMemberValue('NDAForm.NotDisclosed', null, "", false);
    OBPager.SetTaskContentMemberValue('NDAForm.SeeBelow', null, "", false);
    OBPager.SetTaskContentMemberValue('NDAForm.UserDefined', null, "1", false);
    OBPager.SetTaskContentMemberValue('NDAForm.Attachments', null, "", false);
    OBPager.SetTaskContentMemberValue('NDAForm.Additional', null, "", true);
    document.getElementById("Pg_9_text_Attachment").value = "";
    document.getElementById("Pg_9_text_Attachment").disabled = true;
    document.getElementById("Pg_9_text_no").value = "";
    document.getElementById("Pg_9_text_no").disabled = true;
}
function DisableTextBox2() {
    OBPager.SetTaskContentMemberValue('NDAForm.NotDisclosed', null, "", false);
    OBPager.SetTaskContentMemberValue('NDAForm.SeeBelow', null, "", false);
    OBPager.SetTaskContentMemberValue('NDAForm.UserDefined', null, "", false);
    OBPager.SetTaskContentMemberValue('NDAForm.Attachments', null, "", false);
    OBPager.SetTaskContentMemberValue('NDAForm.Additional', null, "1", true);
    document.getElementById("Pg_9_text_Attachment").value = "";
    document.getElementById("Pg_9_text_Attachment").disabled = true;
    document.getElementById("Pg_9_text_no").disabled = false;
}
function EnableTextBox() {
    OBPager.SetTaskContentMemberValue('NDAForm.NotDisclosed', null, "", false);
    OBPager.SetTaskContentMemberValue('NDAForm.SeeBelow', null, "1", false);
    OBPager.SetTaskContentMemberValue('NDAForm.UserDefined', null, "", false);
    OBPager.SetTaskContentMemberValue('NDAForm.Additional', null, "", true);
    document.getElementById("Pg_9_text_Attachment").disabled = false;
    document.getElementById("Pg_9_text_no").value = "";
    document.getElementById("Pg_9_text_no").disabled = true;
}

function test() {
    var obj = document.getElementById('Pg_9_text_no');
    if (obj.value) {
        if (isNaN(obj.value)) {
            alert('Please enter only numbers');
            return;
        }

    }
}

$().ready(function () {
    $(function () {
        if ($('#Pg_9_check_None').is(':checked')) {
            $('#Pg_9_text_Attachment').attr('disabled', true);
            $('#Pg_9_check_Seebelow').removeAttr('checked');
            $('#Pg_9_check_Undefined').removeAttr('checked');
            $('#Pg_9_check_Additional').removeAttr('checked');
        }
        else if ($('#Pg_9_check_Undefined').is(':checked')) {
            $('#Pg_9_text_Attachment').attr('disabled', true);
        }
    });
    if (OBPager.taskStatusFlag == -1) {
        /* Setting default values for the first time */
        OBPager.SetTaskContentMemberValue('NDAForm.NotDisclosed', null, true, false);
        OBPager.SetTaskContentMemberValue('NDAForm.SeeBelow', null, '', true);
        OBPager.SetTaskContentMemberValue('NDAForm.UserDefined', null, '', true);
        OBPager.SetTaskContentMemberValue('NDAForm.Additional', null, '', true);
    }
    $("#Pg_8_text_Name1").val(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_8_text_Date1").val(TaskPrefillValues.PrefillValues.Set1.Date);
    $("#Pg_8_text_Title1").val(TaskPrefillValues.PrefillValues.Set2.DesignationDesc);
    $("#Pg_8_text_CompanyName1").val(TaskPrefillValues.PrefillValues.Set3.cdescription);
    $("#Pg_8_text_CompanyTitle1").val(TaskPrefillValues.PrefillValues.Set3.cuserdefined1);
    $("#Pg_8_text_CompanyDate1").val(TaskPrefillValues.PrefillValues.Set1.Date);
    $("#Pg_9_text_Name2").val(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_9_text_Date2").val(TaskPrefillValues.PrefillValues.Set1.Date);
    $("#Pg_9_text_Title2").val(TaskPrefillValues.PrefillValues.Set2.DesignationDesc);
    $("#Pg_10_text_Name3").val(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_10_text_Date3").val(TaskPrefillValues.PrefillValues.Set1.Date);
    $("#Pg_10_text_Title3").val(TaskPrefillValues.PrefillValues.Set2.DesignationDesc);
    $("#Pg_10_text_CompanyName3").val(TaskPrefillValues.PrefillValues.Set3.cdescription);
    $("#Pg_10_text_CompanyTitle3").val(TaskPrefillValues.PrefillValues.Set3.cuserdefined1);
    $("#Pg_10_text_CompanyDate3").val(TaskPrefillValues.PrefillValues.Set1.Date);
    $("#Pg_1_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set1.DOJDate);
    $("#Pg_1_text_DOJ").val(TaskPrefillValues.PrefillValues.Set1.DOJ);
    $("#Pg_10_text_DOJ").val(TaskPrefillValues.PrefillValues.Set1.DOJ);
    $("#Pg_10_text_FullName").val(TaskPrefillValues.PrefillValues.Set1.Name);

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
    //    });
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
                    if (JSON.parse(OBPager.strTaskPrefillValues).PrefillValues.Set1.CanConfirmOnSubmit != 0) {
                        MsgboxConfirm(sessionId, 6, 215, 'FORM_ONSUBMIT_CNFRM_NA', "Please verify the details before you submit.<br> To edit information, please make the modifications in personal data form and submit the personal data form for the changes to reflect in this form. Please remember to save and submit this form after verifying the details.", callback);
                    }
                    else {
                        if (OBPager.SaveTaskData(saveMode) == true) {
                            return true;
                        }
                        else {
                            return false;
                        }
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
                alert('Error occured while saving the task');
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
    // Set member value manually
    if (OBPager.taskStatusFlag == -1) {
        $("#Pg_8_text_Name1").val(TaskPrefillValues.PrefillValues.Set1.Name);
        $("#Pg_8_text_Date1").val(TaskPrefillValues.PrefillValues.Set1.Date);
        $("#Pg_8_text_Title1").val(TaskPrefillValues.PrefillValues.Set2.DesignationDesc);
        $("#Pg_8_text_CompanyName1").val(TaskPrefillValues.PrefillValues.Set3.cdescription);
        $("#Pg_8_text_CompanyTitle1").val(TaskPrefillValues.PrefillValues.Set3.cuserdefined1);
        $("#Pg_8_text_CompanyDate1").val(TaskPrefillValues.PrefillValues.Set1.Date);
        $("#Pg_9_text_Name2").val(TaskPrefillValues.PrefillValues.Set1.Name);
        $("#Pg_9_text_Date2").val(TaskPrefillValues.PrefillValues.Set1.Date);
        $("#Pg_9_text_Title2").val(TaskPrefillValues.PrefillValues.Set2.DesignationDesc);
        $("#Pg_10_text_Name3").val(TaskPrefillValues.PrefillValues.Set1.Name);
        $("#Pg_10_text_Date3").val(TaskPrefillValues.PrefillValues.Set1.Date);
        $("#Pg_10_text_Title3").val(TaskPrefillValues.PrefillValues.Set2.DesignationDesc);
        $("#Pg_10_text_CompanyName3").val(TaskPrefillValues.PrefillValues.Set3.cdescription);
        $("#Pg_10_text_CompanyTitle3").val(TaskPrefillValues.PrefillValues.Set3.cuserdefined1);
        $("#Pg_10_text_CompanyDate3").val(TaskPrefillValues.PrefillValues.Set1.Date);
        $("#Pg_1_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
        $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set1.Date);
        $("#Pg_1_text_DOJ").val(TaskPrefillValues.PrefillValues.Set1.DOJ);
        $("#Pg_10_text_FullName").val(TaskPrefillValues.PrefillValues.Set1.Name);
        OBPager.SetTaskContentMemberValue('NDAForm.NotDisclosed', null, true, false);
        OBPager.SetTaskContentMemberValue('NDAForm.SeeBelow', null, '', true);
        OBPager.SetTaskContentMemberValue('NDAForm.UserDefined', null, '', true);
        OBPager.SetTaskContentMemberValue('NDAForm.Additional', null, '', true);
        document.getElementById("Pg_9_text_Attachment").disabled = true;
        document.getElementById("Pg_9_text_no").value = "";
        jQXB.doBind(OBPager.taskContentDSName);
    }
}
if (parseInt(qs["opmde"]) != null) {
    openMode = parseInt(qs["opmde"]);
}

if (openMode != 1) {
    window.onload = function () {
        MsgboxAlert(sessionId, 4, 213, 'FORM_POPUP_ONPAGELOAD_NA', "<p style=line-height:20px;><span style=color:red;>Please note:</span><span> To edit information in this form,<br/> please make the modifications in personal data form and submit the personal data form for the changes to reflect in this form. Please remember to save and submit this form after verifying the details.</span></p>");
    } 
}
function callback(value) {
    try {
        if (value) {
            if (OBPager.SaveTaskData(1) == true) {
                return true;
            }
        }
        else {
            return false;
        }
    }
    catch (e) { }
}




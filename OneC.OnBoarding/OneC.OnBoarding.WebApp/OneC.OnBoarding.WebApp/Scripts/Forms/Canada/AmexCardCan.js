﻿

$().ready(function () {
    $("#Pg_1_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set1.Date);
    $("#Pg_1_text_Title").val(TaskPrefillValues.PrefillValues.Set2.DesignationDesc);
    OBPager.ShowPage(1);
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
                } catch (e) {
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
    if (OBPager.taskStatusFlag == -1) {
        $("#Pg_1_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
        $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set1.Date);
        $("#Pg_1_text_Title").val(TaskPrefillValues.PrefillValues.Set2.DesignationDesc);
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





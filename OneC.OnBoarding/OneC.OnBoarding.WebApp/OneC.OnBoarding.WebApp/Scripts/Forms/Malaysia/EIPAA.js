﻿//Preparing form
$().ready(function () {
    $("#Pg_4_text_Name").val(TaskPrefillValues.PrefillValues.Set1.EmployeeName);
    $("#Pg_4_text_Associate_ID").val(TaskPrefillValues.PrefillValues.Set1.AssociateID);
    OBPager.ShowPage(1);
       
});


function SaveTaskData(saveMode) {
    if (saveMode == 1) {
        if (OBPager.ValidateTaskData(saveMode) == true) {
            try {
                if (OBPager.SaveTaskData(saveMode) == true) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (e) { }
        }
        else {

            MsgboxInfo(OBPager.ValidationMessage);
        }
    }
    else {

        try {
            if (OBPager.SaveTaskData(saveMode) == true) {
                return true;
            }
            else {
                alert('Error occured while saving the task');
                return false;
            }
        }
        catch (e) {
            alert(e.Message);
        }
    }
}
function ResetTaskData() {

    OBPager.ResetTaskContent();
    $("#Pg_4_text_Name").val(TaskPrefillValues.PrefillValues.Set1.EmployeeName);
    $("#Pg_4_text_Associate_ID").val(TaskPrefillValues.PrefillValues.Set1.AssociateID);

    //        $("#Pg_2_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
    //        $("#Pg_2_text_Date").val(TaskPrefillValues.PrefillValues.Set1.Date);
    //        $("#Pg_6_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
    //        $("#Pg_6_text_Date").val(TaskPrefillValues.PrefillValues.Set1.Date);
    //  $("#Pg_6_text_AssociateId").val(TaskPrefillValues.PrefillValues.Set1.AssociateId);

}



//window.onbeforeunload = closeIt;
//function closeIt() {
//    try { window.parent.opener.disablePopup(); } catch (e) { }
//    try { window.parent.opener.CloseChildPage(); } catch (e) { }
//}
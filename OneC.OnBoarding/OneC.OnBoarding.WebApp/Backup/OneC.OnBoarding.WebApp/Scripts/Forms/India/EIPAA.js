﻿//Preparing form
$().ready(function () {
    $("#Pg_4_text_Name").val(TaskPrefillValues.PrefillValues.Set1.EmployeeName);
    $("#Pg_4_text_Associate ID").val(TaskPrefillValues.PrefillValues.Set1.AssociateID);
    OBPager.ShowPage(1);
    $(".mna").hide();
    var Ismigrated = TaskPrefillValues.PrefillValues.Set1.IsMigratedCandidate;
    if (Ismigrated == 8) {
        $(".mna").show();
        $(".indiaEipaa").hide();
    }
    $(".ubs").hide();
    var UBSFlag = TaskPrefillValues.PrefillValues.Set1.UBSFlag
    if (UBSFlag == 1) {
        $(".ubs").show();
        $(".mna").hide();
        $(".indiaEipaa").hide();
    }
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
    $("#Pg_4_text_Associate ID").val(TaskPrefillValues.PrefillValues.Set1.AssociateID);

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
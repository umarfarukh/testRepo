//Preparing form
$().ready(function () {
    $("#Pg1_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg1_Date").val(TaskPrefillValues.PrefillValues.Set1.Date);
    $("#Pg1_Designation").val(TaskPrefillValues.PrefillValues.Set1.Designation);
    $("#Pg2_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg2_Date").val(TaskPrefillValues.PrefillValues.Set1.CurrentDate);

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
            catch (e) {
            }
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
        }
    }
}
function ResetTaskData() {
    try {

        OBPager.ResetTaskContent();
        $("#Pg1_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
        $("#Pg1_Date").val(TaskPrefillValues.PrefillValues.Set1.Date);
        $("#Pg1_Designation").val(TaskPrefillValues.PrefillValues.Set1.Designation);
        $("#Pg2_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
        $("#Pg2_Date").val(TaskPrefillValues.PrefillValues.Set1.CurrentDate);
    }
    catch (e) {
    }
}
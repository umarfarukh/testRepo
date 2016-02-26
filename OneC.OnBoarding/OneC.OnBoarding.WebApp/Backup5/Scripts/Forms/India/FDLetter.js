//Preparing form
$().ready(function () {
    $("#Pg1_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
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

    }
    catch (e) {
    }
}
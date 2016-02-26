
//Preparing form
$().ready(function () {
    OBPager.ShowPage(1);

});
function SaveTaskData(saveMode) {
    // saveMode { 0:Save, 1:Submit }
    if (saveMode == 1) {
        // if (validate.ValidateSubmit() == true) {
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
        //  }
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
    try {

        OBPager.ResetTaskContent();

    }
    catch (e) {
        alert("wrong");
    }
}




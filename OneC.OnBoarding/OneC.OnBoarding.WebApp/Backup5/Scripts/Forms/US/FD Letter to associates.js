
//Preparing form
$().ready(function () {
    OBPager.ShowPage(1);
    if (OBPager.taskStatusFlag == "-1") {
        OBPager.SetTaskContentMemberValue('FDletter.Acknowledge', 1, false, false);
    }

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
        if (OBPager.taskStatusFlag == -1) {
            OBPager.SetTaskContentMemberValue('FDletter.Acknowledge', 1, false, false);
            jQXB.doBind(OBPager.taskContentDSName);
        }
    }
    catch (e) {
        alert("wrong");
    }
}




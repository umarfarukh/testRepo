
function EnableMale() {
    OBPager.SetTaskContentMemberValue('EEO1.Male', null, "1", false);
    OBPager.SetTaskContentMemberValue('EEO1.Female', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO1.Others', null, "", true);
}
function EnableFemale() {
    OBPager.SetTaskContentMemberValue('EEO1.Male', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO1.Female', null, "1", false);
    OBPager.SetTaskContentMemberValue('EEO1.Others', null, "", true);
}
function EnableOthers() {
    OBPager.SetTaskContentMemberValue('EEO1.Male', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO1.Female', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO1.Others', null, "1", true);
}

$().ready(function () {
    OBPager.ShowPage(1);

    if (OBPager.taskStatusFlag == -1) {

    }
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
                    alert(e.Message);
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

                return true;
            }
            else {

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
    if (OBPager.taskStatusFlag == -1) {

        jQXB.doBind(OBPager.taskContentDSName);
    }
}

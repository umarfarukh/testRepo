
$().ready(function () {
    OBPager.ShowPage(1);

    OBPager.SetTaskContentMemberValue('EEO5.Date', null, TaskPrefillValues.PrefillValues.Set1.DATE, true);

    if (OBPager.taskStatusFlag == -1) {
        OBPager.SetTaskContentMemberValue('EEO5.Name', null, TaskPrefillValues.PrefillValues.Set1.NAME, false);
        OBPager.SetTaskContentMemberValue('EEO5.Date', null, TaskPrefillValues.PrefillValues.Set1.DATE, false);
    }
    jQXB.doBind(OBPager.taskContentDSName);
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
        OBPager.SetTaskContentMemberValue('EEO5.Name', null, TaskPrefillValues.PrefillValues.Set1.NAME, false);
        OBPager.SetTaskContentMemberValue('EEO5.Date', null, TaskPrefillValues.PrefillValues.Set1.DATE, false);
        jQXB.doBind(OBPager.taskContentDSName);
    }
}

function EnableYes() {
    OBPager.SetTaskContentMemberValue('EEO5.Yes', null, "1", false);
    OBPager.SetTaskContentMemberValue('EEO5.No', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO5.Others', null, "", true);
}
function EnableNo() {
    OBPager.SetTaskContentMemberValue('EEO5.Yes', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO5.No', null, "1", false);
    OBPager.SetTaskContentMemberValue('EEO5.Others', null, "", true);
}
function EnableOthers() {
    OBPager.SetTaskContentMemberValue('EEO5.Yes', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO5.No', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO5.Others', null, "1", true);
}

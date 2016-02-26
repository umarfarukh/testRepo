
function EnableHispanic() {
    OBPager.SetTaskContentMemberValue('EEO2.Hispanic', null, "1", false);
    OBPager.SetTaskContentMemberValue('EEO2.White', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.Black', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.Native', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.Asian', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.American', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.TwoOrMore', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.Others', null, "", true);
}
function EnableWhite() {
    OBPager.SetTaskContentMemberValue('EEO2.Hispanic', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.White', null, "1", false);
    OBPager.SetTaskContentMemberValue('EEO2.Black', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.Native', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.Asian', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.American', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.TwoOrMore', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.Others', null, "", true);
}
function EnableBlack() {
    OBPager.SetTaskContentMemberValue('EEO2.Hispanic', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.White', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.Black', null, "1", false);
    OBPager.SetTaskContentMemberValue('EEO2.Native', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.Asian', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.American', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.TwoOrMore', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.Others', null, "", true);
}
function EnableNative() {
    OBPager.SetTaskContentMemberValue('EEO2.Hispanic', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.White', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.Black', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.Native', null, "1", false);
    OBPager.SetTaskContentMemberValue('EEO2.Asian', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.American', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.TwoOrMore', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.Others', null, "", true);
}
function EnableAsian() {
    OBPager.SetTaskContentMemberValue('EEO2.Hispanic', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.White', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.Black', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.Native', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.Asian', null, "1", false);
    OBPager.SetTaskContentMemberValue('EEO2.American', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.TwoOrMore', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.Others', null, "", true);
}
function EnableAmerican() {
    OBPager.SetTaskContentMemberValue('EEO2.Hispanic', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.White', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.Black', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.Native', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.Asian', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.American', null, "1", false);
    OBPager.SetTaskContentMemberValue('EEO2.TwoOrMore', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.Others', null, "", true);
}
function EnableTwoOrMore() {
    OBPager.SetTaskContentMemberValue('EEO2.Hispanic', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.White', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.Black', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.Native', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.Asian', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.American', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.TwoOrMore', null, "1", false);
    OBPager.SetTaskContentMemberValue('EEO2.Others', null, "", true);
}
function EnableOthers() {
    OBPager.SetTaskContentMemberValue('EEO2.Hispanic', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.White', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.Black', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.Native', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.Asian', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.American', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.TwoOrMore', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO2.Others', null, "1", true);
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

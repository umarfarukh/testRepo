$().ready(function () {
    OBPager.ShowPage(1);
});
function SaveTaskData(saveMode) {
    if (saveMode == 1) {
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
}
function ResetTaskData() { }
$().ready(function () {
    OBPager.ShowPage(1);
});
function SaveTaskData(saveMode) {
    saveFlag = 1;
    try {
        if (OBPager.SaveTaskData(saveMode) == true) {
            alert('Task saved successfully');
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
function ResetTaskData() { }
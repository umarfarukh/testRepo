$().ready(function () {
    // Set member value manually
    $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set1.DATE);
    $("#Pg_1_text_Name").val(TaskPrefillValues.PrefillValues.Set1.NAME);
    if (OBPager.taskStatusFlag == -1) {
        OBPager.SetTaskContentMemberValue('CodeOfEthicsData.Name', 1, TaskPrefillValues.PrefillValues.Set1.NAME, true);
        OBPager.SetTaskContentMemberValue('CodeOfEthicsData.Date', 1, TaskPrefillValues.PrefillValues.Set1.DATE, true);
    } OBPager.ShowPage(1);
});

function SaveTaskData(saveMode) {


    try {
        if (OBPager.SaveTaskData(saveMode) == true) {

            return true;
        }
        else {

            return false;
        }
    }
    catch (e) {
        MsgboxInfo(e.Message);
    }
    //    }
}


function ResetTaskData() {
    OBPager.ResetTaskContent();
    $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set1.DATE);
        $("#Pg_1_text_Name").val(TaskPrefillValues.PrefillValues.Set1.NAME);
}

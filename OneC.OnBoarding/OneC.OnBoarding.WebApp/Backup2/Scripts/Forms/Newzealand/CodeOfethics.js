$().ready(function () {
    $("#Pg_5_Text_Name").val(TaskPrefillValues.PrefillValues.Set1.FullName);
    $("#Pg_5_Text_CurrentDate").val(TaskPrefillValues.PrefillValues.Set1.CurrentDate);
    var url = TaskPrefillValues.PrefillValues.Set2.Url;
    $("#url_1").text(url).attr('href', url);
    $("#url_2").text(url).attr('href', url);
    OBPager.ShowPage(1);
});

function SaveTaskData(saveMode) {
    // saveMode { 0:Save, 1:Submit }
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
    OBPager.ResetTaskContent();
    $("#Pg_5_text_Name").val(TaskPrefillValues.PrefillValues.Set1.FullName);
    $("#Pg_5_text_CurrentDate").val(TaskPrefillValues.PrefillValues.Set1.CurrentDate);
}



  






$().ready(function () {

    OBPager.ShowPage(1);
    $("#Pg_1_name_lbl").text(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_2_name_lbl").text(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_3_name2_lbl").text(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_3_name1_lbl").text(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_3_name_lbl").text(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_4_name3_lbl").text(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_4_name4_lbl").text(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_4_name2_lbl").text(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_4_name1_lbl").text(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_4_name_lbl").text(TaskPrefillValues.PrefillValues.Set1.Name);

    $("#Pg_1_label_date").text(TaskPrefillValues.PrefillValues.Set1.Date);
    $("#Pg_1_date_label").text(TaskPrefillValues.PrefillValues.Set1.Date);
    $("#Pg_2_date_lbl").text(TaskPrefillValues.PrefillValues.Set1.Date);
    $("#Pg_4_label_date").text(TaskPrefillValues.PrefillValues.Set1.Date);

  $("#Pg_1_FooterName").text(TaskPrefillValues.PrefillValues.Set1.Name);
     $("#Pg_2_FooterName").text(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_3_FooterName").text(TaskPrefillValues.PrefillValues.Set1.Name);




    if (OBPager.taskStatusFlag == -1) {
        OBPager.SetTaskContentMemberValue('EmploymentContract.Name', 1, TaskPrefillValues.PrefillValues.Set1.Name, true);
        OBPager.SetTaskContentMemberValue('EmploymentContract.Date', 1, TaskPrefillValues.PrefillValues.Set1.Date, true);
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

}

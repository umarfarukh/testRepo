$().ready(function () {

    $("#Pg_1_text_FirstName").val(TaskPrefillValues.PrefillValues.Set1.FName);

    $("#Pg_1_text_LastName").val(TaskPrefillValues.PrefillValues.Set1.LName);

    $("#Pg_1_text_EmailID").val(TaskPrefillValues.PrefillValues.Set3.EMAILID);

    $("#Pg_1_text_JobLevel").val(TaskPrefillValues.PrefillValues.Set1.JobLevel);

    $("#Pg_2_text_JobLevel").val(TaskPrefillValues.PrefillValues.Set1.JobLevel);

    $("#Pg_2_text_Supervisor").val(TaskPrefillValues.PrefillValues.Set1.Supervisor);

    $("#Pg_2_text_Baseperperiod").val(TaskPrefillValues.PrefillValues.Set1.Baseperperiod);

    $("#Pg_2_text_BaseSalary").val(TaskPrefillValues.PrefillValues.Set1.BaseSalary);

    $("#Pg_2_text_RetentionBonus").val(TaskPrefillValues.PrefillValues.Set1.RetentionBonus);
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
                    }
                }
                else {
                    MsgboxInfo(OBPager.ValidationMessage);
                }
            }
        else {

            try {
                if (OBPager.SaveTaskData(saveMode) == true) {
                    //alert('Task saved successfully');
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

        function ResetTaskData() {
        OBPager.ResetTaskContent();
            if (OBPager.taskStatusFlag == -1) {

                $("#Pg_1_text_FirstName").val(TaskPrefillValues.PrefillValues.Set1.FName);

                $("#Pg_1_text_LastName").val(TaskPrefillValues.PrefillValues.Set1.LName);


                $("#Pg_1_text_EmailID").val(TaskPrefillValues.PrefillValues.Set3.EMAILID);

                $("#Pg_1_text_JobLevel").val(TaskPrefillValues.PrefillValues.Set1.JobLevel);

                $("#Pg_2_text_JobLevel").val(TaskPrefillValues.PrefillValues.Set1.JobLevel);

                $("#Pg_2_text_Supervisor").val(TaskPrefillValues.PrefillValues.Set1.Supervisor);

                $("#Pg_2_text_Baseperperiod").val(TaskPrefillValues.PrefillValues.Set1.Baseperperiod);

                $("#Pg_2_text_BaseSalary").val(TaskPrefillValues.PrefillValues.Set1.BaseSalary);

                $("#Pg_2_text_RetentionBonus").val(TaskPrefillValues.PrefillValues.Set1.RetentionBonus);

                jQXB.doBind(OBPager.taskContentDSName);
            }
        }


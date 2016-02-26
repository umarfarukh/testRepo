$().ready(function () {

    OBPager.ShowPage(1);
    $("#Pg_2_text_Department").val(TaskPrefillValues.PrefillValues.Set2.Department);
    $("#Pg_2_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_2_text_DOB").val(TaskPrefillValues.PrefillValues.Set1.DOB);
    $("#Pg_2_text_Title").val(TaskPrefillValues.PrefillValues.Set1.DesignationDesc);
    //$("#Pg_2_text_GPIN").val(TaskPrefillValues.PrefillValues.Set2.DesignationDesc);
    $("#Pg_2_text_AssociatID").val(TaskPrefillValues.PrefillValues.Set1.AssociateID);
    //$("#Pg_2_text_startdate").val(TaskPrefillValues.PrefillValues.Set2.DesignationDesc);

    $("#Pg_3_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_2_text_date").val(TaskPrefillValues.PrefillValues.Set1.Date);
    $("#Pg_4_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
    //$("#Pg_4_text_GPIN").val(TaskPrefillValues.PrefillValues.Set2.DesignationDesc);
    $("#Pg_4_text_AssociateID").val(TaskPrefillValues.PrefillValues.Set1.AssociateID);
    $("#Pg_4_text_Date").val(TaskPrefillValues.PrefillValues.Set1.Date);


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
}
function ResetTaskData() {
    OBPager.ResetTaskContent();
    $("#Pg_2_text_Department").val(TaskPrefillValues.PrefillValues.Set2.Department);
    $("#Pg_2_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_2_text_DOB").val(TaskPrefillValues.PrefillValues.Set1.DOB);
    $("#Pg_2_text_Title").val(TaskPrefillValues.PrefillValues.Set1.DesignationDesc);
    //$("#Pg_2_text_GPIN").val(TaskPrefillValues.PrefillValues.Set2.DesignationDesc);
    $("#Pg_2_text_AssociatID").val(TaskPrefillValues.PrefillValues.Set1.AssociateID);
    //$("#Pg_2_text_startdate").val(TaskPrefillValues.PrefillValues.Set2.DesignationDesc);
    $("#Pg_2_text_date").val(TaskPrefillValues.PrefillValues.Set1.Date);
    $("#Pg_4_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
    //$("#Pg_4_text_GPIN").val(TaskPrefillValues.PrefillValues.Set2.DesignationDesc);
    $("#Pg_4_text_AssociateID").val(TaskPrefillValues.PrefillValues.Set1.AssociateID);
    $("#Pg_4_text_Date").val(TaskPrefillValues.PrefillValues.Set1.Date);

}






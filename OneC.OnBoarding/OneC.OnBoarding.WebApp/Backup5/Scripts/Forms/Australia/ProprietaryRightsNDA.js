
//Preparing form
$().ready(function () {
    $("#Pg_2_Text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_2_Text_Date").val(TaskPrefillValues.PrefillValues.Set1.DOJ);
    OBPager.ShowPage(1);
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
                //alert('Task saved successfully');
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


}



function ResetTaskData() {

    OBPager.ResetTaskContent();
    $("#Pg_2_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_2_text_Date").val(TaskPrefillValues.PrefillValues.Set1.CurrentDate);

}

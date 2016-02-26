
/* Make this statement in end of script - as data loading and other predata filling works has to be completed */
//Display default page on load
$().ready(function () {
    // Set member value manually
    $("#Pg_3_text_Date").val(TaskPrefillValues.PrefillValues.Set1.Date);
    $("#Pg_3_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_3_text_Name1").val(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_3_text_Designation").val(TaskPrefillValues.PrefillValues.Set1.Designation);
    $("#Pg_3_text_Project").val(TaskPrefillValues.PrefillValues.Set1.ProjectName);
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
        alert(e.Message);
    }
    //    }
}


function ResetTaskData() {
    OBPager.ResetTaskContent();
    $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set1.Date);
    $("#Pg_1_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
}



$().ready(function () { OBPager.ShowPage(1); });

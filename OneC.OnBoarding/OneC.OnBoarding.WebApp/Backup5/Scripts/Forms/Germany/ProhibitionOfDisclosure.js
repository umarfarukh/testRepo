

/* Make this statement in end of script - as data loading and other predata filling works has to be completed */
//Display default page on load
$().ready(function () {
    // Set member value manually
    $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set1.DATE);
    $("#Pg_1_text_Name").val(TaskPrefillValues.PrefillValues.Set1.NAME);
    $("#Pg_1_text_AssociateId").val(TaskPrefillValues.PrefillValues.Set1.AssociateId);
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

}


function ResetTaskData() {
    OBPager.ResetTaskContent();
    $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set1.DATE);
    $("#Pg_1_text_Name").val(TaskPrefillValues.PrefillValues.Set1.NAME);
        $("#Pg_1_text_AssociateId").val(TaskPrefillValues.PrefillValues.Set1.AssociateId);
    }




//$().ready(function () { OBPager.ShowPage(1); });

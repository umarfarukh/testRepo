﻿
/* Make this statement in end of script - as data loading and other predata filling works has to be completed */
//Display default page on load
$().ready(function () {
    // Set member value manually
    $("#Pg_2_Text_Date").val(TaskPrefillValues.PrefillValues.Set1.DOJ);
    $("#Pg_4_Text_AssociateId").val(TaskPrefillValues.PrefillValues.Set1.AssociateID);
    $("#Pg_4_Text_Date").val(TaskPrefillValues.PrefillValues.Set1.DOJ);
    $("#Pg_4_Text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
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
    $("#Pg_2_Text_Date").val(TaskPrefillValues.PrefillValues.Set1.CurrentDate);
    $("#Pg_4_text_AssociateId").val(TaskPrefillValues.PrefillValues.Set1.AssociateID);
    $("#Pg_4_Text_Date").val(TaskPrefillValues.PrefillValues.Set1.CurrentDate);
    $("#Pg_4_Text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);

}



$().ready(function () { OBPager.ShowPage(1); });

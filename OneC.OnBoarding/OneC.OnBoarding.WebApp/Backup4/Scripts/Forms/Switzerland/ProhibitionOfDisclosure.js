$().ready(function () {
    // Set member value manually

    $("#Pg_1_text_Name").val(TaskPrefillValues.PrefillValues.Set1.NAME);
    $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set1.DATE);
    $("#Pg_1_text_AssociateId").val(TaskPrefillValues.PrefillValues.Set1.AssociateId);

    //    if  (OBPager.taskStatusFlag == -1) {
    //        OBPager.SetTaskContentMemberValue('ProhibitionOfDisclosure.Name', 1, TaskPrefillValues.PrefillValues.Set1.Name, true);
    //        OBPager.SetTaskContentMemberValue('ProhibitionOfDisclosure.Date', 1, TaskPrefillValues.PrefillValues.Set1.Date, true);
    //        OBPager.SetTaskContentMemberValue('ProhibitionOfDisclosure.AssociateId', 1, TaskPrefillValues.PrefillValues.Set1.AssociateId, true);
    //    }

    //     jQXB.doBind(OBPager.taskContentDSName);
    //    OBPager.ShowPage(1);
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


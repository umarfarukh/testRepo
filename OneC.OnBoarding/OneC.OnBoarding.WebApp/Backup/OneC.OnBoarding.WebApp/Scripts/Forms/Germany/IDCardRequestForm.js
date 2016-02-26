$().ready(function () {
//    OBPager.ShowPage(1);


    OBPager.GetMaster(17, "BloodGroupList");
//    PrePopulateValues();
    $("#Pg_1_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_1_text_CognizantID").val(TaskPrefillValues.PrefillValues.Set1.CognizantID);
    $("#Pg_1_text_EmergencyPhone").val(TaskPrefillValues.PrefillValues.Set1.EmergencyPhone);
    $("#Pg_1_text_ShippingAddress").val(TaskPrefillValues.PrefillValues.Set1.ShippingAddress);
    $("#Pg_1_text_Phone").val(TaskPrefillValues.PrefillValues.Set1.Phone);

    if (OBPager.taskStatusFlag == "-1") {
        OBPager.SetTaskContentMemberValue('IDCardRequestForm.Name', 1, TaskPrefillValues.PrefillValues.Set1.Name, true);
        OBPager.SetTaskContentMemberValue('IDCardRequestForm.CognizantID',1, TaskPrefillValues.PrefillValues.Set1.CognizantID, true);
        OBPager.SetTaskContentMemberValue('IDCardRequestForm.EmergencyPhone', 1, TaskPrefillValues.PrefillValues.Set1.EmergencyPhone, true);
        OBPager.SetTaskContentMemberValue('IDCardRequestForm.ShippingAddress',null, TaskPrefillValues.PrefillValues.Set1.ShippingAddress,false);
        OBPager.SetTaskContentMemberValue('IDCardRequestForm.Phone',1, TaskPrefillValues.PrefillValues.Set1.Phone, true);
    }
     //  OBPager.ShowPage(1);
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
    if (OBPager.taskStatusFlag == "-1") {


        $("#Pg_1_text_EmergencyPhone").val(TaskPrefillValues.PrefillValues.Set1.EmergencyPhone);
        $("#Pg_1_text_ShippingAddress").val(TaskPrefillValues.PrefillValues.Set1.ShippingAddress);
        $("#Pg_1_text_Phone").val(TaskPrefillValues.PrefillValues.Set1.Phone);
        jQXB.doBind(OBPager.taskContentDSName);
    }

//    OBPager.SetTaskContentMemberValue('IDCardRequestForm.Name', null, TaskPrefillValues.PrefillValues.Set1.Name, false);
//    OBPager.SetTaskContentMemberValue('IDCardRequestForm.CognizantID', null, TaskPrefillValues.PrefillValues.Set1.CognizantID, false);
//    OBPager.SetTaskContentMemberValue('IDCardRequestForm.EmergencyPhone', null, TaskPrefillValues.PrefillValues.Set1.EmergencyPhone, false);
//    OBPager.SetTaskContentMemberValue('IDCardRequestForm.ShippingAddress', null, TaskPrefillValues.PrefillValues.Set1.ShippingAddress, false);
//    OBPager.SetTaskContentMemberValue('IDCardRequestForm.Phone', null, TaskPrefillValues.PrefillValues.Set1.Phone, false);
    //

}



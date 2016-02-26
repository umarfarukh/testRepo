$().ready(function () {
    $("#Pg_5_text_Name").val(TaskPrefillValues.PrefillValues.Set1.FullName);
    $("#Pg_5_text_CurrentDate").val(TaskPrefillValues.PrefillValues.Set1.CurrentDate);
    OBPager.ShowPage(1);
    $(".mna").hide();
    $(".ubs").hide();
    var Ismigrated = TaskPrefillValues.PrefillValues.Set1.IsMigratedCandidate;
    if (Ismigrated == 8) {
        $(".mna").show();
        $(".india").hide();
    }
    var UBSFlag = TaskPrefillValues.PrefillValues.Set1.UBSFlag
    if (UBSFlag == 1) {
        $(".ubs").show();
        $(".india").hide();
        $(".mna").hide();
    }
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



  





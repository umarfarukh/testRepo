
//Preparing form
$().ready(function () {
    OBPager.ShowPage(1);
    $("#Pg_4_text_Name").val(TaskPrefillValues.PrefillValues.Set1.NAME);
    $("#Pg_4_text_Date").val(TaskPrefillValues.PrefillValues.Set1.Date);
    var dressCodeurl = TaskPrefillValues.PrefillValues.Set2.DressCodeUrl;
    $('#Pg_4_text_DressCodeUrl').text(dressCodeurl).attr('href', dressCodeurl);
    $(".ubs").hide();
    var UBSFlag = TaskPrefillValues.PrefillValues.Set1.UBSFlag
    if (UBSFlag == 1) {
        $(".ubs").show();
        $(".normal").hide();
    }
});


function SaveTaskData(saveMode) {


    // saveMode { 0:Save, 1:Submit }
    if (saveMode == 1) {
        // if (validate.ValidateSubmit() == true) {
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
        //  }
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
}




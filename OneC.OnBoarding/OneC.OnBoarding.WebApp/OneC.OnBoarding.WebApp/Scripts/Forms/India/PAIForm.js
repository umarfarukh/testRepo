
$().ready(function () {
    OBPager.GetMaster(13, "RelationList");
    ValidateOnlyInteger();
    ValidateOnlyAlphabets();

    $("#Pg_1_text_AssociateName").val(TaskPrefillValues.PrefillValues.Set1.AssociateName);
    $("#Pg_1_text_Father_HusbandName").val(TaskPrefillValues.PrefillValues.Set2.FatherorHusbandName);
    $("#Pg_1_text_Address").val(TaskPrefillValues.PrefillValues.Set2.Address);
    $("#Pg_1_text_DOB").val(TaskPrefillValues.PrefillValues.Set1.DOB);
    $("#Pg_1_text_DOJ").val(TaskPrefillValues.PrefillValues.Set1.DOJ);
    $("#Pg_1_text_Designation").val(TaskPrefillValues.PrefillValues.Set2.Designation);
    $("#Pg_1_text_Function").val(TaskPrefillValues.PrefillValues.Set2.Function);
    $("#Pg_1_text_Name").val(TaskPrefillValues.PrefillValues.Set1.AssociateName);

    jQXB.doBind(OBPager.taskContentDSName);
    OBPager.ShowPage(1);
});

$('#TotalAmt4').live("change", function () {
    var totalamt1, totalamt2, totalamt3, totalamt4, Percentage;
        totalamt1 = parseInt(document.getElementById('TotalAmt1').value);
        totalamt2 = parseInt(document.getElementById('TotalAmt2').value);
        totalamt3 = parseInt(document.getElementById('TotalAmt3').value);
        totalamt4 = parseInt(document.getElementById('TotalAmt4').value);
      Percentage = totalamt1 + totalamt2 + totalamt3 + totalamt4;
    if (Percentage > 100) {
        alert("Total Allocation should not exceed 100%");
    }
    else if (Percentage < 100) {
        alert("Make total allocation to 100%");
    }

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
    $("#Pg_1_text_AssociateName").val(TaskPrefillValues.PrefillValues.Set1.AssociateName);
    $("#Pg_1_text_Father/HusbandName").val(TaskPrefillValues.PrefillValues.Set2.FatherorHusbandName);
    $("#Pg_1_text_Address").val(TaskPrefillValues.PrefillValues.Set2.Address);
    $("#Pg_1_text_DOB").val(TaskPrefillValues.PrefillValues.Set1.DOB);
    $("#Pg_1_text_DOJ").val(TaskPrefillValues.PrefillValues.Set1.DOJ);
    $("#Pg_1_text_Designation").val(TaskPrefillValues.PrefillValues.Set2.Designation);
    $("#Pg_1_text_Function").val(TaskPrefillValues.PrefillValues.Set2.Function);
    $("#Pg_1_text_Name").val(TaskPrefillValues.PrefillValues.Set1.AssociateName);
}

function ValidateOnlyInteger() {
    $('input.nospace').keydown(function (e) {
        if (e.which != 8 && e.which != 46 && e.which != 37 && e.which != 32 && e.which != 39 && e.which != 16 && e.which != 9 && (e.which < 48 || e.which > 57) && (e.which < 96 || e.which > 105)) {
            return false;
        }
    });
}

function ValidateOnlyAlphabets() {
    $('input.nospace1').keydown(function (e) {
        if (e.which != 8 && e.which != 46 && e.which != 37 && e.which != 32 && e.which != 39 && e.which != 16 && e.which != 9 && (e.which < 65 || e.which > 90)) {
            return false;
        }
    });
}
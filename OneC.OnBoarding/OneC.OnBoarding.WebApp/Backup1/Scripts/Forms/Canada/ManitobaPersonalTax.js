
$().ready(function () {
    $("#Pg_1_text_LastName").val(TaskPrefillValues.PrefillValues.Set1.LastName);
    $("#Pg_1_text_FirstName").val(TaskPrefillValues.PrefillValues.Set1.FirstNameandInitials);
    $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set1.DateOfBirth);
    $("#Pg_1_text_EmpNumber").val(TaskPrefillValues.PrefillValues.Set1.EmployeeNumber);
    $("#Pg_1_text_Address").val(TaskPrefillValues.PrefillValues.Set1.Address);
    $("#Pg_1_text_SSN").val(TaskPrefillValues.PrefillValues.Set1.SSN);
    $("#Pg_2_text_SignatureDate").val(TaskPrefillValues.PrefillValues.Set1.SubmissionDate);
    if (OBPager.taskStatusFlag == -1) {
        $('.currentDate').html(TaskPrefillValues.PrefillValues.Set1.CurrentDate);
        OBPager.SetTaskContentMemberValue('ManitobaTax.CurrentDate', null, (TaskPrefillValues.PrefillValues.Set1.CurrentDate), true);
    }
    if ((OBPager.taskStatusFlag == 1) || (OBPager.taskStatusFlag == 0)) {

        $('.currentDate').html(JSON.parse(OBPager.strFormDetails).ManitobaTax.CurrentDate);
    }
    if ($("#Pg_1_text_BasicAmt").val()== "") {
        OBPager.SetTaskContentMemberValue('ManitobaTax.BasicPersonalamt', null, 16825, true);
    }
    OBPager.ShowPage(1);
    ValidateOnlyInteger();
    ValidateOnlyAlphabets();
    CalculateClaimAmount(event);
   
});
function SaveTaskData(saveMode) {
    // saveMode { 0:Save, 1:Submit }
    if (saveMode == 1) {
         if (validate.ValidateSubmit() == true) {
        if (OBPager.ValidateTaskData(saveMode) == true) {
            try {
                if (JSON.parse(OBPager.strTaskPrefillValues).PrefillValues.Set1.CanConfirmOnSubmit != 0) {
                    MsgboxConfirm(sessionId, 6, 215, 'FORM_ONSUBMIT_CNFRM_NA', "Please verify the details before you submit.<br> To edit information, please make the modifications in personal data form and submit the personal data form for the changes to reflect in this form. Please remember to save and submit this form after verifying the details.", callback);
                }
                else {
                    if (OBPager.SaveTaskData(saveMode) == true) {
                        return true;
                    }
                    else {
                        return false;
                    }
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
    if (OBPager.taskStatusFlag == -1) {
        $("#Pg_1_text_LastName").val(TaskPrefillValues.PrefillValues.Set1.LastName);
        $("#Pg_1_text_FirstName").val(TaskPrefillValues.PrefillValues.Set1.FirstNameandInitials);
        $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set1.DateOfBirth);
        $("#Pg_1_text_EmpNumber").val(TaskPrefillValues.PrefillValues.Set1.EmployeeNumber);
        $("#Pg_1_text_Address").val(TaskPrefillValues.PrefillValues.Set1.Address);
        $("#Pg_1_text_SSN").val(TaskPrefillValues.PrefillValues.Set1.SSN);
        $("#Pg_2_text_SignatureDate").val(TaskPrefillValues.PrefillValues.Set1.SubmissionDate);
        OBPager.SetTaskContentMemberValue('ManitobaTax.BasicPersonalamt', null, 16825, false);
        OBPager.SetTaskContentMemberValue('ManitobaTax.TotalClaimAmt', null, 16825, true);
        jQXB.doBind(OBPager.taskContentDSName);
        }
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
function CalculateClaimAmount(event) {
    var Total = 0;
    if ($("#Pg_1_text_BasicAmt").val() != "") {
        Total = Total + parseFloat($("#Pg_1_text_BasicAmt").val());
        
    }
    if ($("#Pg_1_text_AgeAmt").val() != "") {
        Total = Total + parseFloat($("#Pg_1_text_AgeAmt").val());
    }
    if ($("#Pg_1_text_PensionAmt").val() != "") {
        Total = Total + parseFloat($("#Pg_1_text_PensionAmt").val());
    }
    if ($("#Pg_1_text_EducationAmt").val() != "") {
        Total = Total + parseFloat($("#Pg_1_text_EducationAmt").val());
    }
    if ($("#Pg_1_text_DisabilityAmt").val() != "") {
        Total = Total + parseFloat($("#Pg_1_text_DisabilityAmt").val());
    }
    if ($("#Pg_1_text_SpouseAmt").val() != "") {
        Total = Total + parseFloat($("#Pg_1_text_SpouseAmt").val());
    }
    if ($("#Pg_1_text_dependantAmt").val() != "") {
        Total = Total + parseFloat($("#Pg_1_text_dependantAmt").val());
    }
    if ($("#Pg_1_text_CaregiverAmt").val() != "") {
        Total = Total + parseFloat($("#Pg_1_text_CaregiverAmt").val());
    }
    if ($("#Pg_1_text_infirmdependant").val() != "") {
        Total = Total + parseFloat($("#Pg_1_text_infirmdependant").val());
    }
    if ($("#Pg_1_text_AmtTransferredFromSpouse").val() != "") {
        Total = Total + parseFloat($("#Pg_1_text_AmtTransferredFromSpouse").val());
    }
    if ($("#Pg_1_text_AmtTransferredFromDependant").val() != "") {
        Total = Total + parseFloat($("#Pg_1_text_AmtTransferredFromDependant").val());
    }
    if ($("#Pg_1_text_FamilyTaxBenefit").val() != "") {
        Total = Total + parseFloat($("#Pg_1_text_FamilyTaxBenefit").val());
    }
    if (Total.toString().indexOf(".") > 0) {
        OBPager.SetTaskContentMemberValue('ManitobaTax.TotalClaimAmt', null, Total.toFixed(2), false);
        $("#Pg_1_text_TotalClaimAmt").val(Total.toFixed(2));
    }
    else {
        OBPager.SetTaskContentMemberValue('ManitobaTax.TotalClaimAmt', null, parseInt(Total), false);
        $("#Pg_1_text_TotalClaimAmt").val(parseInt(Total));
    }
}
if (parseInt(qs["opmde"]) != null) {
    openMode = parseInt(qs["opmde"]);
}

if (openMode != 1) {
    window.onload = function () {
        MsgboxAlert(sessionId, 4, 213, 'FORM_POPUP_ONPAGELOAD_NA', "<p style=line-height:20px;><span style=color:red;>Please note:</span><span> To edit information in this form,<br/> please make the modifications in personal data form and submit the personal data form for the changes to reflect in this form. Please remember to save and submit this form after verifying the details.</span></p>");
    } 
}
function callback(value) {
    try {
        if (value) {
            if (OBPager.SaveTaskData(1) == true) {
                return true;
            }
        }
        else {
            return false;
        }
    }
    catch (e) { }
}


















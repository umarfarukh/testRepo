
$().ready(function () {

    OBPager.ShowPage(1);

    $("#Pg_1_text_LastName").val(TaskPrefillValues.PrefillValues.Set1.LastName);
    $("#Pg_1_text_FirstName").val(TaskPrefillValues.PrefillValues.Set1.FirstNameAndInitials);
    $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set1.DOB);
    $("#Pg_1_text_EmpNumber").val(TaskPrefillValues.PrefillValues.Set1.EmployeeNumber);
    $("#Pg_1_text_Address").val(TaskPrefillValues.PrefillValues.Set2.Address);
    $("#Pg_1_text_SSN").val(TaskPrefillValues.PrefillValues.Set2.ssn);
    $("#Pg_2_text_SignatureDate").val(TaskPrefillValues.PrefillValues.Set1.Date);
    if (TaskPrefillValues.PrefillValues.Set3.SignatureStatus == 0) {
        $("#Sign_PageId_2").hide();
    }
    else {
        $("#Sign_PageId_2").show();
    }
    if (OBPager.taskStatusFlag == -1) {
        $('.currentDate').html(TaskPrefillValues.PrefillValues.Set1.CurrentDate);
        OBPager.SetTaskContentMemberValue('BrunswickPersonalTax.CurrentDate', null, (TaskPrefillValues.PrefillValues.Set1.Date), true);
    }
    if ((OBPager.taskStatusFlag == 1) || (OBPager.taskStatusFlag == 0)) {

        $('.currentDate').html(JSON.parse(OBPager.strFormDetails).BrunswickPersonalTax.CurrentDate);
    }
    if ($("#Pg_1_text_BasicAmt").val() == "") {
        OBPager.SetTaskContentMemberValue('BrunswickPersonalTax.BasicPersonalamt', null, 9472, true);
    }
   
//    ValidateOnlyInteger();
//    ValidateOnlyAlphabets();
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
    if (OBPager.taskStatusFlag == -1) {
        $("#Pg_1_text_LastName").val(TaskPrefillValues.PrefillValues.Set1.LastName);
        $("#Pg_1_text_FirstName").val(TaskPrefillValues.PrefillValues.Set1.FirstNameandInitials);
        $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set1.DateOfBirth);
        $("#Pg_1_text_EmpNumber").val(TaskPrefillValues.PrefillValues.Set1.EmployeeNumber);
        $("#Pg_1_text_Address").val(TaskPrefillValues.PrefillValues.Set1.Address);
        $("#Pg_1_text_SSN").val(TaskPrefillValues.PrefillValues.Set1.SSN);
        $("#Pg_2_text_SignatureDate").val(TaskPrefillValues.PrefillValues.Set1.SubmissionDate);
        OBPager.SetTaskContentMemberValue('BrunswickPersonalTax.TotalClaimAmt', null, 9472, false);
        OBPager.SetTaskContentMemberValue('BrunswickPersonalTax.BasicPersonalamt', null, 9472, true);
        jQXB.doBind(OBPager.taskContentDSName);
    }
}
//function ValidateOnlyInteger() {
//    $('input.nospace').keydown(function (e) {
//        if (e.which != 8 && e.which != 46 && e.which != 37 && e.which != 32 && e.which != 39 && e.which != 16 && e.which != 9 && (e.which < 48 || e.which > 57) && (e.which < 96 || e.which > 105)) {
//            return false;
//        }
//    });
//}
//function ValidateOnlyAlphabets() {
//    $('input.nospace1').keydown(function (e) {
//        if (e.which != 8 && e.which != 46 && e.which != 37 && e.which != 32 && e.which != 39 && e.which != 16 && e.which != 9 && (e.which < 65 || e.which > 90)) {
//            return false;
//        }
//    });
//}
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

    if (Total.toString().indexOf(".") > 0) {
        OBPager.SetTaskContentMemberValue('BrunswickPersonalTax.TotalClaimAmt', null, Total.toFixed(2), false);
        $("#Pg_1_text_TotalClaimAmt").val(Total.toFixed(2));
    }
    else {
        OBPager.SetTaskContentMemberValue('BrunswickPersonalTax.TotalClaimAmt', null, parseInt(Total), false);
        $("#Pg_1_text_TotalClaimAmt").val(parseInt(Total));
    }
}

//$('#Pg_2_check_Income').live("click", function (event) {
//    var a = $(this).is(':checked');

//    if (a == true) {

//        OBPager.SetTaskContentMemberValue('BrunswickPersonalTax.TotalClaimAmt', null, '', true);
//    }
//    else {
//        CalculateClaimAmount(event);
//    }
//});
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
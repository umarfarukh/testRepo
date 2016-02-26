$().ready(function () {
    OBPager.ShowPage(1);

    $("#Pg_1_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_1_text_EffDate").val(TaskPrefillValues.PrefillValues.Set1.Date);
    $("#Pg_1_text_HireDate").val(TaskPrefillValues.PrefillValues.Set1.Date);

    $("#Pg_2_text_Datereceived").val(TaskPrefillValues.PrefillValues.Set1.Date);
    //    $("#Pg_2_text_Dateprovided").val(TaskPrefillValues.PrefillValues.Set1.Date);

    $("#Pg_1_text_Employer").val(TaskPrefillValues.PrefillValues.Set2.CompName);
    $("#Pg_1_text_MainOfficeAddress").val(TaskPrefillValues.PrefillValues.Set2.CompAddres);
    $("#Pg_1_text_MailingAddressEmployer").val(TaskPrefillValues.PrefillValues.Set2.MailingAddres);
    $("#Pg_1_text_EmployerTelNummbe").val(TaskPrefillValues.PrefillValues.Set2.Phone);

    $("#Pg_2_text_EmployerName").val(TaskPrefillValues.PrefillValues.Set1.Name);
    var EmployerName = TaskPrefillValues.PrefillValues.Set4.EmployerName;
    $("#Pg_text_2_representative").val(EmployerName);

    $("#Pg_2_text_Name").val(TaskPrefillValues.PrefillValues.Set3.InsuranceName);
    $("#Pg_2_text_Address").val(TaskPrefillValues.PrefillValues.Set3.Address);
    $("#Pg_2_text_TelephoneNumber").val(TaskPrefillValues.PrefillValues.Set3.TelephoneNumber);
    $("#Pg_2_text_PolicyNo").val(TaskPrefillValues.PrefillValues.Set3.PolicyNumber);

    if ((TaskPrefillValues.PrefillValues.Set5) != null) {
        var SignatureTS = TaskPrefillValues.PrefillValues.Set5.SignatureTS;
        $('#Pg_2_text_Dateprovided').val(SignatureTS);
    }
    var AnnualizedSalary = TaskPrefillValues.PrefillValues.Set4.AnnualizedSalary;
    var RegularPayDay = TaskPrefillValues.PrefillValues.Set4.RegularPayDay;

    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.ACKNOWLEDGMENT.Namerepresentative', 1, EmployerName, false);

    if (TaskPrefillValues.PrefillValues.Set4.IsExempt == "true") {
        $('#Pg_1_check_Corporation').attr('checked', true);
        $("#Pg_1_check_Salary").attr('checked', true);
        $('#Pg_1_check_Hour').attr('disabled', true);
        $('#Pg_1_check_Written').attr('checked', true);
        $('#Pg_1_text_PayDay').val(RegularPayDay);
        $('#Pg_1_text_RatesOfPay').val(AnnualizedSalary);

        OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Corporation', 1, true, false);
        OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.RateofPay', 1, AnnualizedSalary, false);
        OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Salary', 1, true, false);
        OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Hour', 1, "", false);
        OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Written', 1, "1", false);
        OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.RegularPayDay', 1, RegularPayDay, false);

    }
    else if (TaskPrefillValues.PrefillValues.Set4.IsExempt == "false") {
        var OvertimeRateOfPay = (1.5);
        $('#Pg_1_check_Corporation').attr('checked', true);
        $('#Pg_1_check_Hour').attr('checked', true);
        $("#Pg_1_check_Salary").attr('disabled', true);
        $('#Pg_1_check_Written').attr('checked', true);
        $('#Pg_1_text_RatesOfPay').val(AnnualizedSalary);
        $('#Pg_1_text_OvertimeRateOfPay').val(OvertimeRateOfPay);
        $('#Pg_1_text_PayDay').val(TaskPrefillValues.PrefillValues.Set4.RegularPayDay);
        OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Corporation', 1, true, false);
        OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Hour', 1, true, false);
        OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Salary', 1, "", false);
        OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Written', 1, true, false);
        OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.RateofPay', 1, AnnualizedSalary, false);
        OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Overtime', 1, OvertimeRateOfPay, false);
        OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.RegularPayDay', 1, RegularPayDay, false);
    }

    //disabling the Checkboxes and textboxes
    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Proprietor', 1, "", true);
    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Company', 1, "", true);
    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Partnership', 1, "", true);
    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Othertype', 1, "", true);
    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Staffing', 1, "", true);
    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.DoingBusines', 1, "", true);
    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.NameofOtherBusiness', 1, "", true);
    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.PEO', 1, "", true);
    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Other', 1, "", true);
    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Othercheck', 1, "", true);
    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Othertext', 1, "", true);
    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.SalaryShift', 1, "", false);
    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Entity', 1, "", false);
    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Day', 1, "", false);
    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Week', 1, "", false);
    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Price', 1, "", false);
    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Commission', 1, "", false);
    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Otherprovide', 1, "", false);
    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Oral', 1, "", false);




    //    if ($('#Pg_1_check_OtherType').is(':checked')) {
    //        $('#Pg_1_Text_Entity').attr('disabled', false);
    //    } else
    //        $('#Pg_1_Text_Entity').attr('disabled', true);


    //    if ($('#Pg_1_check_Other1').is(':checked')) {
    //        $('#Pg_1_text_Other1').attr('disabled', false);
    //    } else
    //        $('#Pg_1_text_Other1').attr('disabled', true);


    //    if ($('#Pg_1_check_Other').is(':checked')) {
    //        $('#Pg_1_text_providespecifics').attr('disabled', false);
    //    } else
    //        $('#Pg_1_text_providespecifics').attr('disabled', true);


        if ($('#Pa_2_check_Laboar').is(':checked')) {
            $('#Pg_2_text_CertificateNumber').attr('disabled', false);
        } else
            $('#Pg_2_text_CertificateNumber').attr('disabled', true);

});




//function Other() {

//    if ($('#Pg_1_check_OtherType').is(':checked')) {
//        $('#Pg_1_Text_Entity').attr('disabled', false);
//        OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Othertype', 1, "1", true);
//    } else {
//        $('#Pg_1_Text_Entity').attr('disabled', true);
//        OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Othertype', 1, "", false);
//        OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Entity', 1, '', true);

//    }
//}
//function OtherCheck() {
//    if ($('#Pg_1_check_Other1').is(':checked')) {
//        $('#Pg_1_text_Other1').attr('disabled', false);
//        OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Other', 1, "1", true);
//    } else {
//        $('#Pg_1_text_Other1').attr('disabled', true);
//        OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Other', 1, "", false);
//        OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Othertext', 1, '', true);
//    }
//}
//function OtherCheckpecifics() {
//    if ($('#Pg_1_check_Other').is(':checked')) {
//        $('#Pg_1_text_providespecifics').attr('disabled', false);
//        OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Othercheck', 1, "1", true);
//    } else {
//        OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Othercheck', 1, "", false);
//        $('#Pg_1_text_providespecifics').attr('disabled', true);
//        OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Otherprovide', 1, '', true);
//    }
//}
function CertificateNumber() {
    if ($('#Pa_2_check_Laboar').is(':checked')) {
        $('#Pg_2_text_CertificateNumber').attr('disabled', false);
        OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WORKERSCOMPENSATION.SelfInsured', 1, "1", true);
    } else {
        OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WORKERSCOMPENSATION.SelfInsured', 1, "", false);
        $('#Pg_2_text_CertificateNumber').attr('disabled', true);
        OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WORKERSCOMPENSATION.CertificateNumber', 1, '', true);
        
    }
}


//function Staffing() {
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Staffing', 1, "1", true);
//}

//function Oral() {
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Oral', 1, "1", true);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Written', 1, "", false);
//}

//function Written() {
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Oral', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Written', 1, "1", true);

//}

//function Proprietor() {
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Proprietor', 1, "1", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Corporation', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Company', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Partnership', 1, "", true);

//}

//function Corporation() {
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Proprietor', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Corporation', 1, "1", true);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Company', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Partnership', 1, "", false);

//}
//function Company() {
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Proprietor', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Corporation', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Company', 1, "1", true);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Partnership', 1, "", false);

//}
//function Partnership() {
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Proprietor', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Corporation', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Company', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.EMPLOYER.Partnership', 1, "1", true);

//}

//function Hour() {
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Hour', 1, "1", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Shift', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Day', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Week', 1, "", true);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Salary', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Price', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Commission', 1, "", true);
//}
//function Shift() {
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Hour', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Shift', 1, "1", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Day', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Week', 1, "", true);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Salary', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Price', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Commission', 1, "", true);
//}
//function Day() {
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Hour', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Shift', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Day', 1, "1", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Week', 1, "", true);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Salary', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Price', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Commission', 1, "", true);
//}
//function Week() {
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Hour', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Shift', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Day', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Week', 1, "1", true);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Salary', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Price', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Commission', 1, "", true);
//}
//function Salary() {
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Hour', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Shift', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Day', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Week', 1, "", true);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Salary', 1, "1", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Price', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Commission', 1, "", true);
//}

//function Price() {
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Hour', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Shift', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Day', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Week', 1, "", true);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Salary', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Price', 1, "1", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Commission', 1, "", true);
//}
//function Commission() {

//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Shift', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Day', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Week', 1, "", true);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Salary', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Price', 1, "", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Commission', 1, "1", false);
//    OBPager.SetTaskContentMemberValue('NOTICETOEMPLOYEE.WAGEINFORMATION.Hour', 1, "", true);
//}

function SaveTaskData(saveMode) {
    // saveMode { 0:Save, 1:Submit }
    if (saveMode == 1) {
        // if (validate.ValidateSubmit() == true) {
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
            alert(e.Message);
        }
    }
}


//function ResetTaskData() {
//    try {
//        OBPager.ResetTaskContent();

//        $("#Pg_1_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
//        $("#Pg_1_text_EffDate").val(TaskPrefillValues.PrefillValues.Set1.Date);
//        $("#Pg_1_text_HireDate").val(TaskPrefillValues.PrefillValues.Set1.Date);

//        $("#Pg_2_text_Datereceived").val(TaskPrefillValues.PrefillValues.Set1.Date);
//        $("#Pg_2_text_Dateprovided").val(TaskPrefillValues.PrefillValues.Set1.Date);

//        $("#Pg_1_text_Employer").val(TaskPrefillValues.PrefillValues.Set2.CompName);
//        $("#Pg_1_text_MainOfficeAddress").val(TaskPrefillValues.PrefillValues.Set2.CompAddres);
//        $("#Pg_1_text_MailingAddressEmployer").val(TaskPrefillValues.PrefillValues.Set2.MailingAddres);
//        $("#Pg_1_text_EmployerTelNummbe").val(TaskPrefillValues.PrefillValues.Set2.Phone);

//        $("#Pg_2_text_EmployerName").val(TaskPrefillValues.PrefillValues.Set2.CompName);
//        $("#Pg_text_2_representative").val(TaskPrefillValues.PrefillValues.Set1.Name);

//        $("#Pg_2_text_Name").val(TaskPrefillValues.PrefillValues.Set3.InsuranceName);
//        $("#Pg_2_text_Address").val(TaskPrefillValues.PrefillValues.Set3.Address);
//        $("#Pg_2_text_TelephoneNumber").val(TaskPrefillValues.PrefillValues.Set3.TelephoneNumber);
//        $("#Pg_2_text_PolicyNo").val(TaskPrefillValues.PrefillValues.Set3.PolicyNumber);
//    
//    }
//    catch (e) {
//      //  alert("wrong");
//    }
//}

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






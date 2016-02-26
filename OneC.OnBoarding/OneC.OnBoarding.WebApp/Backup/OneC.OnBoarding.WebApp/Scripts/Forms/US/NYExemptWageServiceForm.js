$().ready(function () {
    $("#Pg_9_text_Name").val(TaskPrefillValues.PrefillValues.Set1.FullName);
    $("#Pg_9_text_Date").val(TaskPrefillValues.PrefillValues.Set1.Date);
    $("#Pg_9_text_NameAndTitle").val(TaskPrefillValues.PrefillValues.Set1.FullNameAndTitle);

    OBPager.ShowPage(1);
    if (OBPager.taskStatusFlag == "-1") {
        OBPager.SetTaskContentMemberValue('NewYorkCTSExemptWagesForm.NoticeGiven.AtHiring', 1, true, false);
        OBPager.SetTaskContentMemberValue('NewYorkCTSExemptWagesForm.Payment.Other', 1, true, false)
        OBPager.SetTaskContentMemberValue('NewYorkCTSExemptWagesForm.Payment.OtherText', 1, 'Semi-Monthly', false)
        OBPager.SetTaskContentMemberValue('NewYorkCTSExemptWagesForm.CheckOne.EnglishPrimaryLanguage', 1, true, true)
        OBPager.SetTaskContentMemberValue('NewYorkCTSExemptWagesForm.RegularPayDay', 1, '15th & last business day of each month', false)
        OBPager.SetTaskContentMemberValue('NewYorkCTSExemptWagesForm.OverTimePayRateText', 1, 'Not Applicable', false)
        OBPager.SetTaskContentMemberValue('NewYorkCTSExemptWagesForm.FullNameandTitle', 1, 'Sameer Gokhale; NA HR SS Lead ', false)
        OBPager.SetTaskContentMemberValue('NewYorkCTSExemptWagesForm.EmployeePayRates', 1, TaskPrefillValues.PrefillValues.Set1.AnnualizedSalary, false)
    }

    var AC = TaskPrefillValues.PrefillValues.Set1.AC;
    if (AC == 0) {
        OBPager.SetTaskContentMemberValue('NewYorkCTSExemptWagesForm.AllowanceTaken.None', 1, true, true);
        $('#Pg_1_check_Others').attr('disabled', true);
        $('.check').attr('disabled', true);
        $('.employee').attr('disabled', true);

    }
    else {
        OBPager.SetTaskContentMemberValue('NewYorkCTSExemptWagesForm.AllowanceTaken.Others', 1, true, true);
        OBPager.SetTaskContentMemberValue('NewYorkCTSExemptWagesForm.AllowanceTaken.OthersText', 1, TaskPrefillValues.PrefillValues.Set1.OthersText, false)
        $('.none').attr('disabled', true);
        $('.check').attr('disabled', true);
        $('.employee').attr('disabled', true);
    }
        
    if ($("#Pg_1_check_AtHiring").is(':checked')) {
        $('.notice').attr('disabled', true);
    }
    else {
        $('.notice').attr('disabled', true);
    }

    if ($("#Pg_1_check_Other").is(':checked')) {
        $('.pay').attr('disabled', true);
    }
    else {
        $('.pay').attr('disabled', true);
    }
    if ($('#Pg_1_check_None').is(':checked') == true) {
        $('.employee').attr('disabled', true);
        //   $('.check').attr('disabled', true);
    } else {
        $('.employee').attr('disabled', false);
        //   $('.check').attr('disabled', false);

    }
    //    if ($('#Pg_1_check_None:checked') {
    //        $('.employee').attr('disabled', true);
    //        $('.check').attr('disabled', true);
    //    } else {
    //        $('.employee').attr('disabled', false);
    //        $('.check').attr('disabled', false);
    //    }
    if ($('input[name="Pg_1_check_Payment"]:checked')) {
        var a = $('input[name="Pg_1_check_Payment"]:checked').attr('id');
        if (a == 'Pg_1_check_Other') {
            $('#Pg_1_text_OtherText').attr('disabled', false);
        } else { $('#Pg_1_text_OtherText').val('').attr('disabled', true); }

    }
});

$('input[name="Pg_1_check_Allowances"]').live("click", function () {
    var a = $(this).attr('id');
    var v = $(this).is(':checked');
    var RY = $(this).attr('jqxb-datamember');
    if (a == 'Pg_1_check_None') {
        if (v == true) {
            OBPager.SetTaskContentMemberValue(RY, 1, "true", true);
            ($('input[name="Pg_1_check_Allowances"]').not(":checked")).attr('disabled', true);
            $('.check').removeAttr('checked');
            $('.employee').attr('disabled', true).empty();
            $('input[name="Pg_1_check_Allowances"]:not(:checked)').each(function () {
                var a = $(this).attr('id');
                var b = $(this).next().attr('id');
                var RZ = $('#' + a).attr('jqxb-datamember');
                OBPager.SetTaskContentMemberValue(RZ, 1, "", true);
                var RZZ = $('#' + b).attr('jqxb-datamember');
                OBPager.SetTaskContentMemberValue(RZZ, 1, "", true);
            });
        }
        else {
            OBPager.SetTaskContentMemberValue(RY, 1, "", true);
            ($('input[name="Pg_1_check_Allowances"]')).attr('disabled', false);
            $('.employee').attr('disabled', false);
          
        }

    }

    else {
        $('#Pg_1_check_None').removeAttr("checked");
        OBPager.SetTaskContentMemberValue('NewYorkCTSExemptWagesForm.AllowanceTaken.None', 1, "", true);
        $('.employee').attr('disabled', false);
    }

});
$('input[name="Pg_1_check_Notice"]').live("click", function () {
    var a = $(this).attr('id');
    var b = $(this).attr('jqxb-datamember');
    var c = $(this).attr('name');
    disable(a, b, c);
});
$('input[name="Pg_1_check_Payment"]').live("click", function () {
    var a = $(this).attr('id');
    var b = $(this).attr('jqxb-datamember');
    var c = $(this).attr('name');
    disable(a, b, c);
    if (a == 'Pg_1_check_Other') {
        $('#Pg_1_text_OtherText').attr('disabled', false);

    } else {
        $('#Pg_1_text_OtherText').val('').attr('disabled', true);
        OBPager.SetTaskContentMemberValue('NewYorkCTSExemptWagesForm.Payment.OtherText', 1, "", true);
    }
});
$('input[name="Pg_1_check_CheckOne"]').live("click", function () {
    var a = $(this).attr('id');
    var b = $(this).attr('jqxb-datamember');
    var c = $(this).attr('name');
    disable(a, b, c);
    if (a == 'Pg_1_check_OtherLangPrimary') {
        $('#Pg_9_text_OtherLang').attr('disabled', false);

    } else {
        $('#Pg_9_text_OtherLang').val('').attr('disabled', true);
        OBPager.SetTaskContentMemberValue('NewYorkCTSExemptWagesForm.CheckOne.NonEnglishPrimaryLanguageText', 1, "", true);
    }
});


function disable(a, b, c) {
    if ($('input[name="' + c + '"]:checked').length == 0) {
        OBPager.SetTaskContentMemberValue(b, 1, "true", true);
    } else {
        $('input[name="' + c + '"]:checked').each(function () {
            var f = $(this).attr('jqxb-datamember');
            var b = $(this).attr('id');
            if (a == b) {
                OBPager.SetTaskContentMemberValue(f, 1, true, true);

            }
            else {
                OBPager.SetTaskContentMemberValue(f, 1, "", true);
            }
        });
    }
}

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
    $("#Pg_9_text_Name").val(TaskPrefillValues.PrefillValues.Set1.FullName);
    $("#Pg_9_text_Date").val(TaskPrefillValues.PrefillValues.Set1.Date);
    $("#Pg_9_text_NameAndTitle").val(TaskPrefillValues.PrefillValues.Set1.FullNameAndTitle);
    if (OBPager.taskStatusFlag == -1) {
        OBPager.SetTaskContentMemberValue('NewYorkCTSExemptWagesForm.NoticeGiven.AtHiring', 1, true, false);
        OBPager.SetTaskContentMemberValue('NewYorkCTSExemptWagesForm.Payment.Other', 1, true, false)
        OBPager.SetTaskContentMemberValue('NewYorkCTSExemptWagesForm.Payment.OtherText', 1, 'Semi-Monthly', false)
        OBPager.SetTaskContentMemberValue('NewYorkCTSExemptWagesForm.CheckOne.EnglishPrimaryLanguage', 1, true, true)
        OBPager.SetTaskContentMemberValue('NewYorkCTSExemptWagesForm.RegularPayDay', 1, '15th & last business day of each month', false)
        OBPager.SetTaskContentMemberValue('NewYorkCTSExemptWagesForm.OverTimePayRateText', 1, 'Not Applicable', false)
        OBPager.SetTaskContentMemberValue('NewYorkCTSExemptWagesForm.FullNameandTitle', 1, 'Sameer Gokhale; NA HR SS Lead ', false)
        OBPager.SetTaskContentMemberValue('NewYorkCTSExemptWagesForm.EmployeePayRates', 1, TaskPrefillValues.PrefillValues.Set1.AnnualizedSalary, false)    
        jQXB.doBind(OBPager.taskContentDSName);
    }
    var AC = TaskPrefillValues.PrefillValues.Set1.AC;
    if (AC == 0) {
        OBPager.SetTaskContentMemberValue('NewYorkCTSExemptWagesForm.AllowanceTaken.None', 1, true, true);
        $('#Pg_1_check_Others').attr('disabled', true);
        $('.check').attr('disabled', true);
        $('.employee').attr('disabled', true);

    }
    else {
        OBPager.SetTaskContentMemberValue('NewYorkCTSExemptWagesForm.AllowanceTaken.Others', 1, true, true);
        OBPager.SetTaskContentMemberValue('NewYorkCTSExemptWagesForm.AllowanceTaken.OthersText', 1, TaskPrefillValues.PrefillValues.Set1.OthersText, false)
        $('.none').attr('disabled', true);
        $('.check').attr('disabled', true);
        $('.employee').attr('disabled', true);
    }
};

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

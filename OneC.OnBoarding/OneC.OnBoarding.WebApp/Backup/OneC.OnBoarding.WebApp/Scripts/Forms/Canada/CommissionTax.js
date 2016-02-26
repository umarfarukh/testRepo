
$().ready(function () {

    $("#Pg_1_text_LastName").val(TaskPrefillValues.PrefillValues.Set1.LastName);
    $("#Pg_1_text_FirstName").val(TaskPrefillValues.PrefillValues.Set1.FirstNameAndInitials);
    $("#Pg_1_text_EmpNumber").val(TaskPrefillValues.PrefillValues.Set1.EmployeeNumber);
    $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set1.Date);
    $("#Pg_1_text_Address").val(TaskPrefillValues.PrefillValues.Set2.Address);
    if (OBPager.taskStatusFlag == -1) {
        OBPager.SetTaskContentMemberValue('CommissionTax.SINNAS', null, TaskPrefillValues.PrefillValues.Set2.ssn, true);
    }
    OBPager.ShowPage(1);
    ValidateOnlyInteger();
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

$(function () {
    var textBox1 = $('input:text[id$=Pg_1_text_Commission]').keyup(sumnumbers);
    var textBox2 = $('input:text[id$=Pg_1_text_Salary]').keyup(sumnumbers);
    var textBox3 = $('input:text[id$=Pg_1_text_LastComm]').keyup(sumnumbers);
    function sumnumbers() {
        var value1 = textBox1.val();
        var value2 = textBox2.val();
        var value3 = textBox3.val();
        var sum = add(value1, value2);
        $('input:text[id$=Pg_1_text_TotRenumeration]').val(sum);
        var min = sub(sum, value3);
        $('input:text[id$=Pg_1_text_NetComm]').val(min);
    }
    function add() {
        var sum = 0;
        for (var i = 0, j = arguments.length; i < j; i++) {
            if (IsNumeric(arguments[i])) {
                sum += parseFloat(arguments[i]);
            }
        }
        if (sum.toString().indexOf(".") > 0) {
            OBPager.SetTaskContentMemberValue('CommissionTax.TotRenumeration', null, sum.toFixed(2), false);
            $("Pg_1_text_TotRenumeration").val(sum.toFixed(2));
        }
        else {
            OBPager.SetTaskContentMemberValue('CommissionTax.TotRenumeration', null, parseInt(sum), false);
            $("Pg_1_text_TotRenumeration").val(parseInt(sum));
        }
        return sum;
    }
    function sub(sum, value3) {
        var min = sum - value3;

        if (sum.toString().indexOf(".") > 0) {
            OBPager.SetTaskContentMemberValue('CommissionTax.NetComm', null, min.toFixed(2), false);
            $("Pg_1_text_NetComm").val(min.toFixed(2));
        }
        else {
            OBPager.SetTaskContentMemberValue('CommissionTax.NetComm', null, parseInt(min), false);
            $("Pg_1_text_NetComm").val(parseInt(min));
        }
        return min;
    }
    function IsNumeric(input) {
        return (input - 0) == input && input.length > 0;
    }
});

function ResetTaskData() {
    OBPager.ResetTaskContent();
    if (OBPager.taskStatusFlag == -1) {
        $("#Pg_1_text_LastName").val(TaskPrefillValues.PrefillValues.Set1.LastName);
        $("#Pg_1_text_FirstName").val(TaskPrefillValues.PrefillValues.Set1.FirstNameAndInitials);
        $("#Pg_1_text_EmpNumber").val(TaskPrefillValues.PrefillValues.Set1.EmployeeNumber);
        $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set1.Date);
        $("#Pg_1_text_Address").val(TaskPrefillValues.PrefillValues.Set2.Address);
        OBPager.SetTaskContentMemberValue('CommissionTax.SINNAS', null, TaskPrefillValues.PrefillValues.Set2.ssn, true);
    }
}
function ValidateOnlyInteger() {
    $('input.nospace').keydown(function (e) {
        if (e.which != 8 && e.which != 46 && e.which != 37 && e.which != 32 && e.which != 39 && e.which != 16 && e.which != 9 && (e.which < 48 || e.which > 57) && (e.which < 96 || e.which > 105)) {
            return false;
        }
    });
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

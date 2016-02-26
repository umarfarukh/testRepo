$(document).ready(function () {
    $('.navF').find('img').remove();
    OBPager.SetTaskContentMemberValue('DirectDeposit.DepositTypeBalance.Balance', 1, 'B', true);
    depositVisible();
    depositType();


});
$('#depositType').live('click', function () {
    depositType();
});
function depositType() {
    if ($('#depositType').is(':checked') == true) {
        $('#depositTypeAmount>li').show();
        OBPager.SetTaskContentMemberValue('DirectDeposit.DepositTypeAccount.DepositTypeAccountCheckBox', 1, true, false);
        OBPager.SetTaskContentMemberValue('DirectDeposit.DepositTypeAccount.Account', 1, 'A', true);
        $('.depositType').each(function () {
            var getTagName = $(this).get(0).nodeName;
            if (getTagName == 'INPUT')
                $(this).addClass('textMandatory');
            else
                $(this).addClass('dropdown');
            $(this).find('input').attr('disabled', false);
            $(this).find('select').attr('disabled', false);

        });

    } else {
        $('#depositTypeAmount>li').hide();
        OBPager.SetTaskContentMemberValue('DirectDeposit.DepositTypeAccount.DepositTypeAccountCheckBox', 1, '', false);
        OBPager.SetTaskContentMemberValue('DirectDeposit.DepositTypeAccount.Account', 1, '', true);
        $('.depositType').each(function () {
            var getTagName = $(this).get(0).nodeName;
            var dataMember = $(this).attr('jqxb-datamember');
            if (getTagName == 'INPUT') {
                $(this).removeClass('textMandatory');
                OBPager.SetTaskContentMemberValue(dataMember, 1, "", true);
            }
            else {
                $(this).removeClass('dropdown');
                OBPager.SetTaskContentMemberValue(dataMember, 1, "-1", true);
            }

            $(this).find('input').attr('disabled', true);
            $(this).find('select').attr('disabled', true);

        });
        $('#depositTypeAmount>li').find('.alert_f').remove();
        $('#depositTypeAmount>li').find('.alert_f_text').remove();
        $('.textMandatory').change(validate.textMandatory);
        $('.dropdown').change(validate.dropdown);
    }
}
$('.balMandatory').live('change', function () {
    depositVisible();
});
function depositVisible() {
    $('.balMandatory').each(function () {
        if ($(this).val() == -1 || $(this).val().length == 0) {
            $('#depositTypeAmount').hide();
            OBPager.SetTaskContentMemberValue('DirectDeposit.DepositTypeAccount.DepositTypeAccountCheckBox', 1, '', true);
            depositType();
          

            return false;
        } else {
            depositType();
            $('#depositTypeAmount').show();
            if ($('#depositType').is(':checked') == false)
                $('#depositTypeAmount>li').hide();
            return true;
        }
    });
}
$('#depositAmount').live('keyup', function (e) {
    var key = e.keyCode;
    var a = $(this).val();
    var aa = a.split('.');
    if (a.indexOf('.') != -1) {
        $(this).addClass('doBlock');
        if (e.keyCode == 37 || e.keyCode == 39) {
        } else if (aa[1].length > 2 && aa[1].length != 0) {
            OBPager.SetTaskContentMemberValue('DirectDeposit.DepositTypeAccount.Amount', 1, (aa[0] + '.' + aa[1].substr(0, 2)), true);
           
           
        }
       
    }
    else {
        $(this).removeClass('doBlock');
        if (a.length == 8) {
            OBPager.SetTaskContentMemberValue('DirectDeposit.DepositTypeAccount.Amount', 1, (a+'.00'), true);
           
        }
    }


});
$('.doBlock').live('keydown', function (e) {
    if (e.keyCode == 190 || e.keyCode == 110) {
        e.preventDefault();
    }
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
function ResetTaskData() {
    OBPager.ResetTaskContent();
    depositVisible();
    var checkCondition = (JSON.parse(OBPager.strFormDetails).DirectDeposit.DepositTypeAccount.DepositTypeAccountCheckBox);
    if (OBPager.taskStatusFlag == 1) {

        if ((JSON.parse(OBPager.strFormDetails).DirectDeposit.DepositTypeAccount.AccountType) == null) {
            OBPager.SetTaskContentMemberValue('DirectDeposit.DepositTypeAccount.AccountType', 1, '-1', true);
        } else {
            OBPager.SetTaskContentMemberValue('DirectDeposit.DepositTypeAccount.AccountType', 1, (JSON.parse(OBPager.strFormDetails).DirectDeposit.DepositTypeAccount.AccountType), true);
        }
    }

    if (OBPager.taskStatusFlag == -1) {

        OBPager.SetTaskContentMemberValue('DirectDeposit.DepositTypeBalance.AccountType', 1, '-1', true);

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

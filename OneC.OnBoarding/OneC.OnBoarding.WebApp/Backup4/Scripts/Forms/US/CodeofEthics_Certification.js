
$().ready(function () {
    $("#Pg_1_text_FullName").val(TaskPrefillValues.PrefillValues.Set1.FullName);
    $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set1.CurrentDate);
    var url = TaskPrefillValues.PrefillValues.Set2.Url;
    $('#url').text(url).attr('href', url);
    if ($('#Pg_1_check_Checkbox3').is(':checked') === true) {
        $('#Pg_1_text_Exceptions').attr('disabled', false);
    }
    else {
        $('#Pg_1_text_Exceptions').attr('disabled', true);
    }
    $('#Pg_1_text_Exceptions').keydown(function (event) {
        var key_codes = [222, 220];
        if (!($.inArray(event.which, key_codes) >= 0)) {
        }
        else {
            event.preventDefault();
        }

    });
    $('#Pg_1_text_Exceptions').live('keyup mousemove paste contextmenu', function (e) {
        $(e.target).keyup(value);
        $(e.target).mousemove(value);

    });
    function value(e) {
        var inputText = $(e.target).val().length;
        if (inputText > 200) {
            OBPager.SetTaskContentMemberValue('COECertificationForm.Exceptions', null, $(this).val().substring(0, 200), true);

        }
    }
});

$('input[name="check"]').live("click", function () {
    var a = $(this).attr('id');
    if ($('#' + a).is(':checked') == true) {
        OBPager.SetTaskContentMemberValue($(this).attr('jqxb-datamember'), null, true, true);
    }
    else {
        OBPager.SetTaskContentMemberValue($(this).attr('jqxb-datamember'), null, '', true);
    }
    if ($('#Pg_1_check_Checkbox3').is(':checked') == true) {
        $('#Pg_1_text_Exceptions').attr('disabled', false);
    }
    else {
        $('#Pg_1_text_Exceptions').attr('disabled', true);
        OBPager.SetTaskContentMemberValue('COECertificationForm.Exceptions', null, '', true);
    }
    DisableCutCopyPaste();
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
        $("#Pg_1_text_FullName").val(TaskPrefillValues.PrefillValues.Set1.FullName);
        $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set1.CurrentDate);
        jQXB.doBind(OBPager.taskContentDSName);
    }
}
function DisableCutCopyPaste() {
    $('#Pg_1_text_FullName').live("cut copy paste", function (e) {
        e.preventDefault();
    });
    $('#Pg_1_text_Date').live("cut copy paste", function (e) {
        e.preventDefault();
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



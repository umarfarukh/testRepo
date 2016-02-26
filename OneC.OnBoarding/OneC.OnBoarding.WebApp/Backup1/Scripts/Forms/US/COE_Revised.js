
$().ready(function () {
    OBPager.ShowPage(1);
    $("#Pg_1_text_FullName").val(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_1_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set1.Date);
    $("#Pg_1_text_Title").val(TaskPrefillValues.PrefillValues.Set1.DesignationDesc);
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
    $('#Pg_1_text_Exceptions').live('keyup paste contextmenu', function (e) {
        $(e.target).keyup(value);
        $(e.target).mousemove(value);
    });
    function value(e) {
        var inputText = $(e.target).val().length;
        if (inputText > 200) {
            alert('Only 200 characters are allowed');
            $(this).val($(this).val().substring(0, 200));
        }
    }

});

function pdfcall() {
    $('#Pg_1_check_Checkbox1').attr('disabled', false);
    $('#Pg_1_check_Checkbox2').attr('disabled', false);
    $('#Pg_1_check_Checkbox3').attr('disabled', false);
}
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
        OBPager.SetTaskContentMemberValue('CodeofEthicsVPPlus.Exceptions', null, '', true);
    }
});
//function Checkbox1Val() {
//    if ($('#Pg_1_check_Checkbox1').is(':checked') == true) 
//        OBPager.SetTaskContentMemberValue('CodeofEthicsVPPlus.Checkbox1Val', null, true, true);
//   else
//       OBPager.SetTaskContentMemberValue('CodeofEthicsVPPlus.Checkbox1Val', null, '', true);
//    //    OBPager.SetTaskContentMemberValue('CodeofEthicsVPPlus.Checkbox2Val', null, "", false);
//    //    OBPager.SetTaskContentMemberValue('CodeofEthicsVPPlus.Checkbox3Val', null, "", false);

//    // $('#Pg_1_text_Exceptions').attr('disabled', true);
//}
//function Checkbox2Val() {
//    if ($('#Pg_1_check_Checkbox2').is(':checked') == true)
//        OBPager.SetTaskContentMemberValue('CodeofEthicsVPPlus.Checkbox2Val', null, true, true);
//    else
//        OBPager.SetTaskContentMemberValue('CodeofEthicsVPPlus.Checkbox2Val', null, '', true);
//    //    OBPager.SetTaskContentMemberValue('CodeofEthicsVPPlus.Checkbox1Val', null, "", false);
//    //   OBPager.SetTaskContentMemberValue('CodeofEthicsVPPlus.Checkbox2Val', null, "1", true);
//    //    OBPager.SetTaskContentMemberValue('CodeofEthicsVPPlus.Checkbox3Val', null, "", false);
//    //$('#Pg_1_text_Exceptions').attr('disabled', true);
//}
//function Checkbox3Val() {
//    //    OBPager.SetTaskContentMemberValue('CodeofEthicsVPPlus.Checkbox1Val', null, "", false);
//    //    OBPager.SetTaskContentMemberValue('CodeofEthicsVPPlus.Checkbox2Val', null, "", false);
//    //   OBPager.SetTaskContentMemberValue('CodeofEthicsVPPlus.Checkbox3Val', null, "1", true);
//    if ($('#Pg_1_check_Checkbox3').is(':checked') == true) {
//        $('#Pg_1_text_Exceptions').attr('disabled', false);
//      
//    }
//    else {
//        $('#Pg_1_text_Exceptions').attr('disabled', true);
//       
//    }
//}

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
    if (OBPager.taskStatusFlag == -1) {
        $("#Pg_1_text_FullName").val(TaskPrefillValues.PrefillValues.Set1.Name);
        $("#Pg_1_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
        $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set1.Date);
        $("#Pg_1_text_Title").val(TaskPrefillValues.PrefillValues.Set1.DesignationDesc);
        jQXB.doBind(OBPager.taskContentDSName);
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



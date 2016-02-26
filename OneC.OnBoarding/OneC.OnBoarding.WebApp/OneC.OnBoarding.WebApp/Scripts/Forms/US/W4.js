$().ready(function () {
    $("#Pg_1_text_FMName").val(TaskPrefillValues.PrefillValues.Set1.FMName);
    $("#Pg_1_text_LName").val(TaskPrefillValues.PrefillValues.Set1.LastName);
    $("#Pg_1_text_SSN").val(TaskPrefillValues.PrefillValues.Set1.SSN);
    $("#Pg_1_text_address").val(TaskPrefillValues.PrefillValues.Set1.Address);
    $("#Pg_1_text_code").val(TaskPrefillValues.PrefillValues.Set1.Citycode);
    $("#Pg_1_text_Signature").val(TaskPrefillValues.PrefillValues.Set1.Signeename);
    $("#Pg_1_text_Signdate").val(TaskPrefillValues.PrefillValues.Set1.SubmissionDate);
    if (OBPager.taskStatusFlag == "-1") {
        $('#Pg_1_text_H').val("0");
    }
    OBPager.ShowPage(1);


    $(".ENI").keypress(function (event) {
        var key_codes = [39, 61, 91, 93, 13, 27, 33, 36, 37, 94, 38, 42, 95, 43, 124, 123, 125, 34, 60, 62, 63, 126, 96, 45, 59, 46];
        if (!($.inArray(event.which, key_codes) >= 0)) {
        }
        else {
            event.preventDefault();
        }
        if (event.keyCode == 9) {

        }
    });
    $('#Pg_1_text_Exempt').keypress(function (e) {
        $(e.target).keyup(value);
    });
    function value(e) {
        var inputText = $(this).val();
        if (inputText.indexOf('.') != -1) {
            var s = inputText.split('.');
            var tt = s[s.length - 2] + '.' + s[s.length - 1].substr(0, 2);
            $(this).val(tt);

        }
    }

    $('.allowOnlyOne').keydown(function (event) {
        if (event.keyCode == 49 || event.keyCode == 97 || event.keyCode == 9 || event.keyCode == 8 || event.keyCode == 46) {
        }
        else {
            event.preventDefault();
        }
    });
    $('.allowZeroAndOne').keydown(function (event) {
        if (event.keyCode == 49 || event.keyCode == 97 || event.keyCode == 9 || event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 48 || event.keyCode == 96) {
        }
        else {
            event.preventDefault();
        }
    });

    $('.allowOnlyNumbers').keydown(function (event) {
        if (event.keyCode == 97 || event.keyCode == 9 || event.keyCode == 8 || (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
        }
        else {
            event.preventDefault();
        }
    });
    $('.zeroOne').keydown(function (event) {
        if (event.keyCode == 9 || event.keyCode == 48 || event.keyCode == 49 || event.keyCode == 96 || event.keyCode == 97 || event.keyCode == 47 || event.keyCode == 8 || event.keyCode == 16 || event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40 || event.keyCode == 46) {
        }
        else {
            event.preventDefault();
        }
    });

    $('.onlyOne').keydown(function (event) {
        if (event.keyCode == 49 || event.keyCode == 97 || event.keyCode == 47 || event.keyCode == 8 || event.keyCode == 16 || event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 46 || event.keyCode == 40) {
        }
        else {
            event.preventDefault();
        }
    });

    $('#Pg_1_text_H').live("focus", function () {
        OBPager.SetTaskContentMemberValue('W4Form.PAWH', null, '', true);
        calc();
    });
    $('.calc').live("change", function () {
        //var a = $(this).attr('id');
        calc();
    });

    $('.W4FormTextbox').keydown(function (event) {
        if (event.keyCode == 69 || event.keyCode == 77 || event.keyCode == 80 || event.keyCode == 88 || event.keyCode == 84 ||
            event.keyCode == 101 || event.keyCode == 120 || event.keyCode == 109 || event.keyCode == 112 || event.keyCode == 116
            || event.keyCode == 8 || event.keyCode == 46) {
        }
        else {
            event.preventDefault();
        }
    });

    function calc() {
        var A = isNaN(parseInt($('#Pg_1_text_A').val())) ? 0 : parseInt($('#Pg_1_text_A').val());
        var B = isNaN(parseInt($('#Pg_1_text_B').val())) ? 0 : parseInt($('#Pg_1_text_B').val());
        var C = isNaN(parseInt($('#Pg_1_text_C').val())) ? 0 : parseInt($('#Pg_1_text_C').val());
        var D = isNaN(parseInt($('#Pg_1_text_D').val())) ? 0 : parseInt($('#Pg_1_text_D').val());
        var E = isNaN(parseInt($('#Pg_1_text_E').val())) ? 0 : parseInt($('#Pg_1_text_E').val());
        var F = isNaN(parseInt($('#Pg_1_text_F').val())) ? 0 : parseInt($('#Pg_1_text_F').val());
        var G = isNaN(parseInt($('#Pg_1_text_G').val())) ? 0 : parseInt($('#Pg_1_text_G').val());
        var total = A + B + C + D + E + F + G;
        if (total < 0) {
            total = 0;
            OBPager.SetTaskContentMemberValue('W4Form.PAWH', null, parseInt(total), true);
        }
        else {
            OBPager.SetTaskContentMemberValue('W4Form.PAWH', null, parseInt(total), true);
        }
        $("#Pg_1_text_H").val(parseInt(total));

    }
    $('#Pg_2_text_Deduction3').live("focus", function () {
        val();
    });
    $('#Pg_2_text_Deduction1').live("change", function () {
        val();

    });
    function val() {
        var values = isNaN(parseInt($('#Pg_2_text_Deduction1').val())) ? 0 : parseInt($('#Pg_2_text_Deduction1').val());
        var values1 = isNaN(parseInt($('#Pg_2__select_Deduction2').val())) ? 0 : parseInt($('#Pg_2__select_Deduction2').val());
        var Cal = values - values1;
        if (Cal < 0) {
            Cal = 0;
            OBPager.SetTaskContentMemberValue('W4Form.DAW3', null, parseInt(Cal), true);

        }
        else {
            OBPager.SetTaskContentMemberValue('W4Form.DAW3', null, parseInt(Cal), true);
        }
        isNaN(parseInt($('#Pg_2_text_Deduction3').val())) ? 0 : $("#Pg_2_text_Deduction3").val(parseInt(Cal));

    }
    $('#Pg_2__select_Deduction2').live("change", function () {
        val();
    });
    $('#Pg_2_text_Deduction5').live("focus", function () {
        var values = isNaN(parseInt($('#Pg_2_text_Deduction3').val())) ? 0 : parseInt($('#Pg_2_text_Deduction3').val());

        var values1 = isNaN(parseInt($('#Pg_2_text_Deduction4').val())) ? 0 : parseInt($('#Pg_2_text_Deduction4').val());

        var Total = values + values1;
        if (Total <= 0) {
            Total = 0;
            OBPager.SetTaskContentMemberValue('W4Form.DAW5', null, parseInt(Total), false);
        }
        else {
            OBPager.SetTaskContentMemberValue('W4Form.DAW5', null, parseInt(Total), false);
        }
        $("#Pg_2_text_Deduction5").val(parseInt(Total));

    });

    $('#Pg_2_text_Deduction7').live("focus", function () {
        var values = isNaN(parseInt($('#Pg_2_text_Deduction5').val())) ? 0 : parseInt($('#Pg_2_text_Deduction5').val());

        var values1 = isNaN(parseInt($('#Pg_2_text_Deduction6').val())) ? 0 : parseInt($('#Pg_2_text_Deduction6').val());

        var Cal = values - values1;
        if (Cal <= 0) {
            Cal = 0;
            OBPager.SetTaskContentMemberValue('W4Form.DAW7', null, parseInt(Cal), true);
        }
        else {
            OBPager.SetTaskContentMemberValue('W4Form.DAW7', null, parseInt(Cal), true);
        }
        $("#Pg_2_text_Deduction7").val(parseInt(Cal));

    });

    $('#Pg_2_text_Deduction8').live("focus", function () {

        var values = isNaN(parseInt($('#Pg_2_text_Deduction7').val())) ? 0 : parseInt($('#Pg_2_text_Deduction7').val());

        var values1 = (parseInt(values) / 3800);
        if (values1 == 0)
            OBPager.SetTaskContentMemberValue('W4Form.DAW8', null, values1, true);
        else
        //   var fvalues1 = isNaN(values1) ? 0 : values1;
            OBPager.SetTaskContentMemberValue('W4Form.DAW8', null, values1, true);
        $("#Pg_2_text_Deduction8").val(values1);

    });

    $('#Pg_2_text_Deduction9').live("focus", function () {
        var values = isNaN(parseInt($('#Pg_1_text_H').val())) ? 0 : parseInt($('#Pg_1_text_H').val());


        OBPager.SetTaskContentMemberValue('W4Form.DAW9', null, parseInt(values), true);
        $("#Pg_2_text_Deduction9").val(parseInt(values));

    });

    $('#Pg_2_text_Deduction10').live("focus", function () {
        var values = isNaN(parseInt($('#Pg_2_text_Deduction8').val())) ? 0 : parseInt($('#Pg_2_text_Deduction8').val());

        var values1 = isNaN(parseInt($('#Pg_2_text_Deduction9').val())) ? 0 : parseInt($('#Pg_2_text_Deduction9').val());

        var Total = values + values1;
        if (Total <= 0) {
            Total = 0;
            OBPager.SetTaskContentMemberValue('W4Form.DAW10', null, parseInt(Total), true);
        }
        else {
            OBPager.SetTaskContentMemberValue('W4Form.DAW10', null, parseInt(Total), true);
        }
        $("#Pg_2_text_Deduction10").val(parseInt(Total));

    });
    $('#Pg_2_text_Multiple1').live("focus", function () {
        var values = isNaN(parseInt($('#Pg_1_text_H').val())) ? 0 : parseInt($('#Pg_1_text_H').val());


        OBPager.SetTaskContentMemberValue('W4Form.TEJW1', null, parseInt(values), true);
        $("#Pg_2_text_Multiple1").val(parseInt(values));

    });

    $('#Pg_2_text_Multiple3').live("focus", function () {
        var values = isNaN(parseInt($('#Pg_2_text_Multiple1').val())) ? 0 : parseInt($('#Pg_2_text_Multiple1').val());

        var values1 = isNaN(parseInt($('#Pg_2_text_Multiple2').val())) ? 0 : parseInt($('#Pg_2_text_Multiple2').val());

        var Cal = values - values1;
        if (Cal < 0) {
            Cal = 0;
            OBPager.SetTaskContentMemberValue('W4Form.TEJW3', null, parseInt(Cal), true);
        }
        else {
            OBPager.SetTaskContentMemberValue('W4Form.TEJW3', null, parseInt(Cal), true);
        }
        $("#Pg_2_text_Multiple3").val(parseInt(Cal));

    });

    $('#Pg_2_text_Multiple4').live("focus", function () {
        var values = isNaN(parseInt($('#Pg_2_text_Multiple2').val())) ? 0 : parseInt($('#Pg_2_text_Multiple2').val());


        OBPager.SetTaskContentMemberValue('W4Form.TEJW4', null, parseInt(values), true);
        $("#Pg_2_text_Multiple4").val(parseInt(values));

    });

    $('#Pg_2_text_Multiple5').live("focus", function () {
        var values = isNaN(parseInt($('#Pg_2_text_Multiple1').val())) ? 0 : parseInt($('#Pg_2_text_Multiple1').val());


        OBPager.SetTaskContentMemberValue('W4Form.TEJW5', null, parseInt(values), true);
        $("#Pg_2_text_Multiple5").val(parseInt(values));

    });

    $('#Pg_2_text_Multiple6').live("focus", function () {
        var values = isNaN(parseInt($('#Pg_2_text_Multiple4').val())) ? 0 : parseInt($('#Pg_2_text_Multiple4').val());
        var values1 = isNaN(parseInt($('#Pg_2_text_Multiple5').val())) ? 0 : parseInt($('#Pg_2_text_Multiple5').val());

        var Cal = values - values1;
        if (Cal < 0) {
            Cal = 0;
            OBPager.SetTaskContentMemberValue('W4Form.TEJW6', null, parseInt(Cal), true);
        }
        else {
            OBPager.SetTaskContentMemberValue('W4Form.TEJW6', null, parseInt(Cal), true);
        }
        $("#Pg_2_text_Multiple6").val(parseInt(Cal));

    });

    $('#Pg_2_text_Multiple8').live("focus", function () {
        var values = isNaN(parseInt($('#Pg_2_text_Multiple6').val())) ? 0 : parseInt($('#Pg_2_text_Multiple6').val());

        var values1 = isNaN(parseInt($('#Pg_2_text_Multiple7').val())) ? 0 : parseInt($('#Pg_2_text_Multiple7').val());

        var Cal = values * values1;
        if (Cal < 0) {
            Cal = 0;
            OBPager.SetTaskContentMemberValue('W4Form.TEJW8', null, parseInt(Cal), true);
        }
        else {
            OBPager.SetTaskContentMemberValue('W4Form.TEJW8', null, parseInt(Cal), true);
        }
        $("#Pg_2_text_Multiple8").val(parseInt(Cal));

    });

});

function Uncheckcontrol1() {
    $('#Pg_1_check_Married').removeAttr('checked');
    $('#Pg_1_check_MarSing').removeAttr('checked');
    OBPager.SetTaskContentMemberValue('W4Form.Single', null, true, false);
    OBPager.SetTaskContentMemberValue('W4Form.Married', null, "", false);
    OBPager.SetTaskContentMemberValue('W4Form.MarSingle', null, "", true);
}

function Uncheckcontrol2() {
    $('#Pg_1_check_Single').removeAttr('checked');
    $('#Pg_1_check_MarSing').removeAttr('checked');
    OBPager.SetTaskContentMemberValue('W4Form.Single', null, "", false);
    OBPager.SetTaskContentMemberValue('W4Form.Married', null, true, false);
    OBPager.SetTaskContentMemberValue('W4Form.MarSingle', null, "", true);

}

function Uncheckcontrol3() {
    $('#Pg_1_check_Single').removeAttr('checked');
    $('#Pg_1_check_Married').removeAttr('checked');
    OBPager.SetTaskContentMemberValue('W4Form.Single', null, "", false);
    OBPager.SetTaskContentMemberValue('W4Form.Married', null, "", false);
    OBPager.SetTaskContentMemberValue('W4Form.MarSingle', null, true, true);
}

function onclickCheckLastName() {
    if ($('#Pg_1_check_SSC').is(':checked')) {
        OBPager.SetTaskContentMemberValue('W4Form.CheckLastName', null, true, true);
    }
    else {
        OBPager.SetTaskContentMemberValue('W4Form.CheckLastName', null, "", true);
    }
}

function onclickNonResidentAlien() {
    if ($('#Pg_1_check_NonResident').is(':checked')) {
        OBPager.SetTaskContentMemberValue('W4Form.NonResidentAlien', null, true, true);
    }
    else {
        OBPager.SetTaskContentMemberValue('W4Form.NonResidentAlien', null, "", true);
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
                MsgboxInfo('Error occured while saving the task');
                return false;
            }
        }
        catch (e) {
        }
    }
}
function ResetTaskData() {
    OBPager.ResetTaskContent();
    $("#Pg_1_text_FMName").val(TaskPrefillValues.PrefillValues.Set1.FMName);
    $("#Pg_1_text_LName").val(TaskPrefillValues.PrefillValues.Set1.LastName);
    $("#Pg_1_text_SSN").val(TaskPrefillValues.PrefillValues.Set1.SSN);
    $("#Pg_1_text_address").val(TaskPrefillValues.PrefillValues.Set1.Address);
    $("#Pg_1_text_code").val(TaskPrefillValues.PrefillValues.Set1.Citycode);
    $("#Pg_1_text_Signature").val(TaskPrefillValues.PrefillValues.Set1.Signeename);
    $("#Pg_1_text_Signdate").val(TaskPrefillValues.PrefillValues.Set1.SubmissionDate);

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


             



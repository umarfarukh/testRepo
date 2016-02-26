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
$().ready(function () {
    $("#Pg_1_text_LastName").val(TaskPrefillValues.PrefillValues.Set1.LastName);
    $("#Pg_1_text_FirstName").val(TaskPrefillValues.PrefillValues.Set1.FirstName);
    $("#Pg_1_text_DOB").val(TaskPrefillValues.PrefillValues.Set1.DateOfBirth);
    $("#Pg_1_text_Empnumber").val(TaskPrefillValues.PrefillValues.Set1.EmployeeNumber);
    $("#Pg_1_text_SSN").val(TaskPrefillValues.PrefillValues.Set1.SSN);
    $("#Pg_1_text_Signature").val(TaskPrefillValues.PrefillValues.Set1.Signeename);
    $("#Pg_1_text_SignatureDate").val(TaskPrefillValues.PrefillValues.Set1.SubmissionDate);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_91', null, 30490, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_92Mul', null, '15%', false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.MaxAmtSpouse', null, 10505, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_2ndPerson', null, 2820, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_1stPerson', null, 2820, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_70', null, 0, true);
    var v = parseInt($('#Pg_1_option_Basicamt').val());
    var va = $('#Pg_1_option_Basicamt').val();
    var a = isNaN(v) ? 0 : v;
    option(va, a);
    if (OBPager.taskStatusFlag == -1)
    {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Total_19', null, 0, true);
        $('.currentDate').html(TaskPrefillValues.PrefillValues.Set1.CurrentDate);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.CurrentDate', null, (TaskPrefillValues.PrefillValues.Set1.CurrentDate), true);
    }
    if ((OBPager.taskStatusFlag == 1) || (OBPager.taskStatusFlag == 0)) {

        $('.currentDate').html(JSON.parse(OBPager.strFormDetails).ProvincialTaxQuebecSourceDeduction.CurrentDate);
    }
    
    OBPager.ShowPage(1);
});
function option(va,a) {
    if (va == 10505) {
        $('#Span_Spouse').show();
        $('#Pg_1_text_calc5').removeAttr('readonly');
        $('#main_can_1').find('input').removeAttr('readonly', 'readonly');
        $('#main_can_1').find('select').removeAttr('disabled', 'disabled');
        $('.main_can').find('input').removeAttr('readonly', 'readonly');
        $('.main_can').find('select').removeAttr('disabled', 'disabled');
        $('#check').show();
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_10', null, a, false);
        code(a);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_3', null, 0, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_9', null, 0, true);
        $('#Checkbox1').show();
        $('#Checkbox2').show();
    }
    else {
        $('#Span_Spouse').hide();
        $('#main_can_1').find('input').attr('readonly', 'readonly');
        $('#main_can_1').find('select').attr('disabled', 'disabled');
        $('.main_can').find('input').attr('readonly', 'readonly');
        $('.main_can').find('select').attr('disabled', 'disabled');
        $('#Pg_1_text_calc5').attr('readonly', 'readonly');
        $('#check').hide();
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_10', null, '', false);
        code(a);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_9', null, '', false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_3', null, '', false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_2', null, '', false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_5', null, '', true);
        $('#Checkbox1').hide();
        $('#Checkbox2').hide();
    }
}
$('#Pg_1_option_Basicamt').live("change", function () {
    var v = parseInt($(this).val());
    var va = $(this).val();
    var a = isNaN(v) ? 0 : v;
    option(va, a);
});
$('#Checkbox1').live("click", function () {
    var b = parseInt($('#Text43').val());
    var bb = isNaN(b) ? 0 : b;
    if ($('#Checkbox1:checked').length != 0) {
        var t = parseInt($('#Pg_4_text_1stperson').val());
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_1stPerson50', null, t, false);
        $('#Pg_4_text_EstAmt1stperson').removeAttr('disabled');
        var a = parseInt($('#Text45').val());
        var aa = isNaN(t) ? 0 : t;
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_Total52', null, aa+bb, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_AmntDepend60', null, aa + bb, true);

    }
    else {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_1stPerson50', null, '', false);
         $('#Pg_4_text_EstAmt1stperson').attr('disabled', 'disabled');
        var c = parseInt($('#Pg_4_text_1stperson').val());
        var cc = isNaN(c) ? 0 : c;
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_Total52', null, bb-cc, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_AmntDepend60', null, bb-cc, true);

    }

});
$('#Checkbox2').live("click", function () {
    var b = parseInt($('#Text43').val());
    var bb = isNaN(b) ? 0 : b;
    if ($('#Checkbox2:checked').length != 0) {
        var t = parseInt($('#Pg_4_text_2ndperson').val());
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_2ndPerson50', null, t, false);
        $('#Pg_4_text_EstAmt2ndperson').removeAttr('disabled');
        var a = parseInt($('#Text44').val());
        var aa = isNaN(t) ? 0 : t;
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_Total52', null, aa + bb, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_AmntDepend60', null, aa + bb, true);
    }
    else {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_2ndPerson50', null, '', false);
        $('#Pg_4_text_EstAmt2ndperson').attr('disabled', 'disabled');
        var c = parseInt($('#Pg_4_text_2ndperson').val());
        var cc = isNaN(c) ? 0 : c;
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_Total52', null, bb - cc, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_AmntDepend60', null, bb - cc, true);
    }

});
$('.children1').live("change", function () {
    var a = $('#Pg_4_Option_ChildAmt1');
    var b = $('#Pg_4_text_EstAmt1stchild');
    var c = $('#Text47');
    amount(a, b, c);
    var d = parseInt(a.val());
    var e = parseInt(b.val());
    var ee = isNaN(e) ? 0 : e;
    if (d - ee < 0) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_1stChild50', null, 0, true);
    } else {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_1stChild50', null, d - ee, true);
    }
   
});
$('.children2').live("change", function () {
    var a = $('#Pg_4_Option_ChildAmt2');
    var b = $('#Pg_4_text_EstAmt2ndchild');
    var c = $('#Text46');
    amount(a, b, c);
    var d = parseInt(a.val());
    var e = parseInt(b.val());
    var ee = isNaN(e) ? 0 : e;
    if (d - ee < 0) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_2ndChild50', null, 0, true);
    } else {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_2ndChild50', null, d - ee, true);
    }
});
$('.children3').live("change", function () {
    var a = $('#Pg_4_text_1stperson');
    var b = $('#Pg_4_text_EstAmt1stperson');
    var c = $('#Text45');
    amount(a, b, c);
    var d = parseInt(a.val());
    var e = parseInt(b.val());
    var ee = isNaN(e) ? 0 : e;
    if (d - ee < 0) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_1stPerson50', null, 0, true);
    } else {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_1stPerson50', null, d - ee, true);
    }
});
$('.children4').live("change", function () {
    var a = $('#Pg_4_text_2ndperson');
    var b = $('#Pg_4_text_EstAmt2ndperson');
    var c = $('#Text44');
    amount(a, b, c);
    var d = parseInt(a.val());
    var e = parseInt(b.val());
    var ee = isNaN(e) ? 0 : e;
    if (d - ee < 0) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_2ndPerson50', null, 0, true);
    } else {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_2ndPerson50', null, d - ee, true);
    }
});
function amount(a, b, c) {
    var z = parseInt(a.val());
    var x = parseInt(b.val());
    var zz = isNaN(z) ? 0 : z;
    var xx = isNaN(x) ? 0 : x;
    var yy = zz - xx;
    if (yy > 0) { $(c).val(yy); }
    else { $(c).val(0); }
    var k = parseInt($('#Text44').val());
    var l = parseInt($('#Text45').val());
    var m = parseInt($('#Text46').val());
    var n = parseInt($('#Text47').val());
    var kk = isNaN(k) ? 0 : k;
    var ll = isNaN(l) ? 0 : l;
    var mm = isNaN(m) ? 0 : m;
    var nn = isNaN(n) ? 0 : n;
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_Total52', null, kk + ll + mm + nn, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_AmntDepend60', null, kk + ll + mm + nn, true);


}
$('#Text42').live("change", function () {
    var a = parseInt($(this).val());
    var b = parseInt($('#Text43').val());
    var aa = isNaN(a) ? 0 : a;
    var bb = isNaN(b) ? 0 : b;
    // var cc = isNaN(b) ? 0 : b;
    if (bb - aa > 0) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_AmntDepend60', null, b - a, true);

    }
    else {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_AmntDepend60', null, 0, true);
     }

});
$('#Pg_1_check_Include').live("click", function () {
    var a = parseInt($('#Pg_1_text_Maxamt').val());
    var c = parseInt($('#Pg_1_option_Basicamt').val());
    var d = parseInt($('#Pg_1_text_calc5').val());
    var dd = isNaN(d) ? 0 : d;
    if ($('input[name="spouse"]:checked').length != 0) {
        $('#Pg_1_text_EstTax').removeAttr('readonly');
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.chkSpouse', null, "true", false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.AmntTransf', null, a, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_2', null, a, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_10', null, a + c + dd, true);
        var val = parseInt($('#Pg_1_text_calc10').val());
        code(val);
    }
    else {
        $('#Pg_1_text_EstTax').attr('readonly', 'readonly');
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.chkSpouse', null, "", false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.EstTaxAmntSp', null, '', false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_10', null, c + dd, false);
        var val = parseInt($('#Pg_1_text_calc10').val());
        code(val);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_3', null, 0, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_9', null, 0, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_2', null, '', false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_3', null, 0, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.AmntTransf', null, '', true);

    }
});
$('#Pg_1_text_calc5').live("change", function () {
    var a = parseInt($('#Pg_1_text_Maxamt').val());
    var b = parseInt($('#Pg_1_text_EstTax').val());
    var c = parseInt($('#Pg_1_option_Basicamt').val());
    var d = parseInt($('#Pg_1_text_calc5').val());
    var e = $(this).attr('title');
    var cc = isNaN(c) ? 0 : c;
    var dd = isNaN(d) ? 0 : d;
    var bb = isNaN(b) ? 0 : b;
    if ($('#Pg_1_text_TransAmt1').val().length == 0) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_10', null, cc + dd, false);
        var val = parseInt($('#Pg_1_text_calc10').val());
        code(val);
    } else {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.AmntTransf', null, a - bb, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_2', null, a - bb, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_10', null, a - bb + c + dd, true);
        var val = parseInt($('#Pg_1_text_calc10').val());
        code(val);
    }
    if (dd != 2390) {
        alert(e);
    }
});
$('#Pg_1_text_EstTax').live("change", function () {
    var a = parseInt($('#Pg_1_text_Maxamt').val());
    var b = parseInt($('#Pg_1_text_EstTax').val());
    var c = parseInt($('#Pg_1_option_Basicamt').val());
    var d = parseInt($('#Pg_1_text_calc5').val());
    var val = isNaN(b) ? 0 : b;
    var vals = isNaN(d) ? 0 : d;
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.AmntTransf', null, a - val, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_2', null, a - val, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_10', null, a - val + c + vals, true);
    var val = parseInt($('#Pg_1_text_calc10').val());
    code(val);
});
$('.total').live("change", function () {
    var a = parseInt($('#Pg_1_text_calc14').val());
    var b = parseInt($('#Pg_1_text_calc15').val());
    var aa = isNaN(a) ? 0 : a;
    var bb = isNaN(b) ? 0 : b;
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Total_19', null, aa + bb, true);

});
$('#Select2').live("change", function () {
    var a = $(this).val();
    if (a == 'X') { $('#Pg_1_text_calc20').hide(); }
    else { $('#Pg_1_text_calc20').show(); }

});

function code(val) {
    if (val == 0) { OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, '0', true); }
    else if (val >= 1 && val <= 10505) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'A', true);
    }
    else if (val >= 10506 && val <= 12000) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'B', true);
    }
    else if (val >= 12001 && val <= 14000) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'C', true);
    }
    else if (val >= 14001 && val <= 16500) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'D', true);
    }
    else if (val >= 16501 && val <= 17500) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'E', true);
    }
    else if (val >= 17501 && val <= 18500) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'F', true);
    }
    else if (val >= 18501 && val <= 20000) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'G', true);
    }
    else if (val >= 20001 && val <= 21500) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'H', true);
    }
    else if (val >= 21501 && val <= 24000) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'I', true);
    }
    else if (val >= 24001 && val <= 26000) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'J', true);
    }
    else if (val >= 26001 && val <= 27000) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'K', true);
    }
    else if (val >= 27001 && val <= 29000) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'L', true);
    }
    else if (val >= 29001 && val <= 30000) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'M', true);
    }
    else if (val >= 30001 && val <= 32000) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'N', true);
    }
    else if (val >= 32001) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'X', true);
    }

};
$('#Select4').live("click", function () {
    var c = parseInt($('#Text40').val());
    var a = parseInt($(this).val());
    var b = parseInt($('#Text35').val());
    var e = parseInt($('#Text31').val());
    var bb = isNaN(b) ? 0 : b;
    var aa = isNaN(a) ? 0 : a;
    var cc = isNaN(c) ? 0 : c;
    var ee = isNaN(c) ? 0 : c;
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_73', null, aa, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Total70to71', null, aa, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_85', null, aa + bb + ee, true);
});
$('#Select7').live("click", function () {
    var a = parseInt($(this).val());
    var b = parseInt($('#Select5').val());
    var c = parseInt($('#Select6').val());
    var d = parseInt($('#Text31').val());
    var e = parseInt($('#Text39').val());
    var dd = isNaN(d) ? 0 : d;
    var ee = isNaN(e) ? 0 : e;
    if (a - b > 0) {

        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Total77To76', null, a - b, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_78', null, a - b, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Total75And78', null, a - b + c, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_79', null, a - b + c, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_85', null, a - b + c + dd + ee, true);

    }
    else {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Total77To76', null, 0, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_78', null, 0, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Total75And78', null, c, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_79', null, c, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_85', null, c + dd + ee, true);
    }
});
$('#Select5').live("click", function () {
    var b = parseInt($(this).val());
    var a = parseInt($('#Select7').val());
    var c = parseInt($('#Select6').val());
    var d = parseInt($('#Text31').val());
    var e = parseInt($('#Text39').val());
    var dd = isNaN(d) ? 0 : d;
    var ee = isNaN(e) ? 0 : e;
    if (a - b > 0) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Total77To76', null, a - b, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_78', null, a - b, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Total75And78', null, a - b + c, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_79', null, a - b + c, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_85', null, a - b + c + dd + ee, true);
    }
    else {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Total77To76', null, 0, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_78', null, 0, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Total75And78', null, c, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_79', null, c, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_85', null, c + dd + ee, true);
    }
});
$('#Select6').live("click", function () {
    var b = parseInt($(this).val());
    var d = parseInt($('#Text37').val());
    var e = parseInt($('#Text31').val());
    var f = parseInt($('#Text39').val());
    var ee = isNaN(e) ? 0 : e;
    var dd = isNaN(d) ? 0 : d;
    var ff = isNaN(f) ? 0 : f;
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Total75And78', null, b + dd, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_79', null, b + dd, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_85', null, ff + ee + b + dd, true);

});
$('#Text33').live("change", function () {
    var a = parseInt($(this).val());
    var b = parseInt($('#Text32').val());
    calc(a, b);
});
$('#Text32').live("change", function () {
    var a = parseInt($(this).val());
    var b = parseInt($('#Text33').val());
    calc(a, b);
    if (parseInt(a) >= 2012) {
        alert("The value must be less than or equal to $2012");
    }
});
function calc(a, b) {
    var aa = isNaN(a) ? 0 : a;
    var bb = isNaN(b) ? 0 : b;
    var c = parseInt($('#Text35').val());
    var cc = isNaN(c) ? 0 : c;
    var d = parseInt($('#Text39').val());
    var dd = isNaN(d) ? 0 : d;
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Toatl80And81', null, aa + bb, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_82', null, aa + bb, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_85', null, aa + bb + cc+dd, true);


}
$('#Text17').live("change", function () {

    var a = parseInt($(this).val());
    var aa = isNaN(a) ? 0 : a;
    var b = parseInt($('#Text19').val());
    var bb = isNaN(b) ? 0 : b;
    var c = parseInt($('#Text21').val());
    var cc = isNaN(c) ? 0 : c;

    if (aa - bb > 0) {

        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_92', null, aa - bb, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_92MulTotal', null, ((aa - bb) * 0.15).toFixed(2), false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_95', null, ((aa - bb) * 0.15).toFixed(2), false);
        if ((cc - ((aa - bb) * 0.15)) < 0) {
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_96', null, 0, true);

        } else {

            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_96', null, cc - ((aa - bb) * 0.15).toFixed(2), true);
        }

    } else {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_92', null, 0, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_92MulTotal', null, 0, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_95', null, 0, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_96', null, 0, true);
    }
});
$('#Text9').live("change", function () {
    var a = parseFloat($(this).val());
    var aa = isNaN(a) ? 0 : a;
    var b = parseFloat($('#Text10').val());
    var bb = isNaN(b) ? 0 : b;
    if (b - a > 0) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_98', null, bb - aa, true);
    }
    else {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_98', null, 0, true);
    }
});
function test() {
var scrollY = $('.pageContent').scrollTop();
 OBPager.ShowPage(4);
 $('.pageContent').scrollTop(scrollY); 
}
function test2() {
 OBPager.ShowPage(4);
 $('.pageContent').scrollTop(1000); 
}
function test1() {
 OBPager.ShowPage(1);
 $('.pageContent').scrollTop(328);
}
function page2() {
    OBPager.ShowPage(2);
}
function page3() {
    OBPager.ShowPage(3);
}
function ResetTaskData() { 
OBPager.ResetTaskContent();
    if (OBPager.taskStatusFlag == -1) {
        $("#Pg_1_text_LastName").val(TaskPrefillValues.PrefillValues.Set1.LastName);
        $("#Pg_1_text_FirstName").val(TaskPrefillValues.PrefillValues.Set1.FirstName);
        $("#Pg_1_text_DOB").val(TaskPrefillValues.PrefillValues.Set1.DateOfBirth);
        $("#Pg_1_text_Empnumber").val(TaskPrefillValues.PrefillValues.Set1.EmployeeNumber);
        $("#Pg_1_text_SSN").val(TaskPrefillValues.PrefillValues.Set1.SSN);
        $("#Pg_1_text_Signature").val(TaskPrefillValues.PrefillValues.Set1.Signeename);
        $("#Pg_1_text_SignatureDate").val(TaskPrefillValues.PrefillValues.Set1.SubmissionDate);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.MaxAmtSpouse', null, '10505', false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_1stChild', null, '0', false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_2ndChild', null, '0', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_71', null, '0', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_75', null, '0', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_76', null, '0', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_77', null, '0', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.ddl_20', null, '0', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.chkSpouse', null, '', true);
        $('#main_can_1').find('input').attr('readonly', 'readonly');
        $('#main_can_1').find('select').attr('disabled', 'disabled');
        $('.main_can').find('input').attr('readonly', 'readonly');
        $('.main_can').find('select').attr('disabled', 'disabled');
        $('#Pg_1_text_EstTax').attr('readonly', 'readonly');
        $('#Pg_1_text_calc5').attr('readonly', 'readonly');
        $('#Checkbox1').hide();
        $('#Checkbox2').hide();
        $('#check').hide();
        $('#Span_Spouse').hide();
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
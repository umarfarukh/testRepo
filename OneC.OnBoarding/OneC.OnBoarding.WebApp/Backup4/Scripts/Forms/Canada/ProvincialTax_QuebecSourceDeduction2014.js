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
    var LastName = TaskPrefillValues.PrefillValues.Set1.LastName;
    var FirstName = TaskPrefillValues.PrefillValues.Set1.FirstName;
    var DOB = TaskPrefillValues.PrefillValues.Set1.DateOfBirth;
    var EmployeeNumber = TaskPrefillValues.PrefillValues.Set1.EmployeeNumber;
    var SSN = TaskPrefillValues.PrefillValues.Set1.SSN;
    var Signeename = TaskPrefillValues.PrefillValues.Set1.Signeename;
    var SubmissionDate = TaskPrefillValues.PrefillValues.Set1.SubmissionDate;
    $("#Pg_1_text_LastName").val(LastName);
    $("#Pg_1_text_FirstName").val(FirstName);
    $("#Pg_1_text_DOB").val(DOB);
    $("#Pg_1_text_Empnumber").val(EmployeeNumber);
    $("#Pg_1_text_SSN").val(SSN);
    $("#Pg_1_text_Signature").val(Signeename);
    $("#Pg_1_text_SignatureDate").val(SubmissionDate);
    if (TaskPrefillValues.PrefillValues.Set2.SignatureStatus == 0) {
        $("#Sign_PageId_4").hide();
    }
    else {
        $("#Sign_PageId_4").show();
    }

    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.LastName', null, LastName, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.FirstName', null, FirstName, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DateOfBirth', null, DOB, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.EmployeeNumber', null, EmployeeNumber, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.SocialInsuranceNumber', null, SSN, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.SigneeName', null, Signeename, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.SubmissionDate', null, SubmissionDate, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_91', null, 32795, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_92Mul', null, '15%', false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.MaxAmtSpouse', null, 11305, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_2ndPerson', null, 3035, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_1stPerson', null, 3035, false);
    //OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_70', null, 0, true);
    //$("#Text8").val('$5000');
    OBPager.ShowPage(1);
    var taskObj = JSON.parse(OBPager.strFormDetails).ProvincialTaxQuebecSourceDeduction;
    var v = parseInt($('#Pg_1_option_Basicamt').val()); var va = $('#Pg_1_option_Basicamt').val();
    var a = isNaN(v) ? 0 : v;
    option(va, a);
    if (OBPager.taskStatusFlag == -1) {
       // OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Total_19', null, 0, true);
        $('.currentDate').html(TaskPrefillValues.PrefillValues.Set1.CurrentDate);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.CurrentDate', null, (TaskPrefillValues.PrefillValues.Set1.CurrentDate), true);
    }
    if ((OBPager.taskStatusFlag == 1) || (OBPager.taskStatusFlag == 0)) {

        $('.currentDate').html(JSON.parse(OBPager.strFormDetails).ProvincialTaxQuebecSourceDeduction.CurrentDate);
    }

    
    // OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_11', null, taskObj.Calc_11, false);



    if ($('input[name="spouse"]:checked').length != 0) {
        $('#Pg_1_text_EstTax').removeAttr('readonly');
    }
    if ($("#Checkbox3").is(":checked") == true) {
        $('#Pg_4_text_EstAmt1stperson').removeAttr('disabled', 'disabled');
    }
    if ($("#Checkbox4").is(":checked") == true) {
        $('#Pg_4_text_EstAmt2ndperson').removeAttr('disabled', 'disabled');
    }
//    AddDataofFirstSheet();
});
   function option(va, a) {
       if (va == 11305) {
    var loadXMLData = JSON.parse(OBPager.strFormDetails).ProvincialTaxQuebecSourceDeduction;
        $('#Span_Spouse').show();
        $('#Pg_1_text_calc5').removeAttr('readonly');
        $('#main_can_1').find('input').removeAttr('readonly', 'readonly');
        $('#main_can_1').find('select').removeAttr('disabled', 'disabled');
        $('.main_can').find('input').removeAttr('readonly', 'readonly');
        $('.main_can').find('select').removeAttr('disabled', 'disabled');
        $('#check').show();
        
       // OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_7', null, a, false);
     ///   code(a);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_3', null, 0, true);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_9', null, 0, true);
        $('#Checkbox3').show();
        $('#Checkbox1').show();
        $('#Checkbox2').show();
        $('#Checkbox4').show();

        if (loadXMLData.chkSpouse == 'true') {
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.chkSpouse', null, true, true);
        }
        else {
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.chkSpouse', null, false, true);
        }


        if (loadXMLData.FirstPerson == 'true') {
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.FirstPerson', null, true, true);
        }
        else {
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.FirstPerson', null, false, true);
        }

        if (loadXMLData.SecondPerson == 'true') {
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.SecondPerson', null, true, true);
        }
        else {
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.SecondPerson', null, false, true);
        }


        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_10', null, loadXMLData.Calc_10, true);
        if (loadXMLData.Calc_7 == null || loadXMLData.Calc_7 == 0) {
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_7', null, a, true);
        }
        else {
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_7', null, loadXMLData.Calc_7, true);
        }
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.EstTaxAmntSp', null, loadXMLData.EstTaxAmntSp, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.AmntTransf', null, loadXMLData.AmntTransf, true); 
          
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_9', null, loadXMLData.Calc_9, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_3', null, loadXMLData.Calc_3, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_2', null, loadXMLData.Calc_2, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_5', null, loadXMLData.Calc_5, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_6', null, loadXMLData.Calc_6, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_1stChild', null, loadXMLData.WC1_1stChild, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_2ndChild', null, loadXMLData.WC1_2ndChild, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_1stChild45', null, loadXMLData.WC1_1stChild45, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_1stChild50', null, loadXMLData.WC1_1stChild50, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_2ndChild45', null, loadXMLData.WC1_2ndChild45, true);

        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_2ndChild50', null, loadXMLData.WC1_2ndChild50, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_1stPerson50', null, loadXMLData.WC1_1stPerson50, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_2ndPerson50', null, loadXMLData.WC1_2ndPerson50, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_Total52', null, loadXMLData.WC1_Total52, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_AmntDepend60', null, loadXMLData.WC1_AmntDepend60, true);
       
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_81', null, loadXMLData.WC2_81, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_70', null, loadXMLData.WC2_70, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_75', null, loadXMLData.WC2_75, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_76', null, loadXMLData.WC2_76, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_77', null, loadXMLData.WC2_77, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Total77to76', null, loadXMLData.WC2_Total77to76, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_78', null, loadXMLData.WC2_78, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Total75And78', null, loadXMLData.WC2_Total75And78, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_79', null, loadXMLData.WC2_79, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_85add70add35', null, loadXMLData.WC2_85add70add35, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_90', null, loadXMLData.WC2_90, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_92', null, loadXMLData.WC2_92, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_92MulTotal', null, loadXMLData.WC2_92MulTotal, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_95', null, loadXMLData.WC2_95, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_96', null, loadXMLData.WC2_96, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_97', null, loadXMLData.WC2_97, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_98', null, loadXMLData.WC2_98, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC3_Calc_1', null, loadXMLData.WC3_Calc_1, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC3_Calc_3', null, loadXMLData.WC3_Calc_3, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC3_Calc_5', null, loadXMLData.WC3_Calc_5, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_55', null, loadXMLData.WC1_55, true);
        AddDataofFirstSheet();      
    }
    else {
        $('#Span_Spouse').hide();
        $('#main_can_1').find('input').attr('readonly', 'readonly');
        $('#main_can_1').find('select').attr('disabled', 'disabled');
        $('.main_can').find('input').attr('readonly', 'readonly');
        $('.main_can').find('select').attr('disabled', 'disabled');
        $('#Pg_1_text_calc5').attr('readonly', 'readonly');
        $('#Pg_1_text_EstTax').attr('readonly', 'readonly');
        $('#check').hide();
        $('#Checkbox3').hide();
        $('#Checkbox1').hide();
        $('#Checkbox2').hide();
        $('#Checkbox4').hide();
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_10', null, '', true);

        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.chkSpouse', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.FirstPerson', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.SecondPerson', null, '', true);
        code(a);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.EstTaxAmntSp', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.AmntTransf', null, '', true);     
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_7', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_9', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_3', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_2', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_5', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_6', null, '', true);  
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_1stChild', null, 0, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_2ndChild', null, 0, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_1stChild45', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_1stChild50', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_2ndChild45', null, '', true);

        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_2ndChild50', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_1stPerson50', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_2ndPerson50', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_Total52', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_AmntDepend60', null, '', true);

        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_81', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_70', null, 0, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_75', null, 0, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_76', null, 0, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_77', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Total77to76', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_78', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Total75And78', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_79', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_85add70add35', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_90', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_92', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_92MulTotal', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_95', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_96', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_97', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_98', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC3_Calc_1', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC3_Calc_3', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC3_Calc_5', null, '', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_55', null, '', true);
        
    }
}
   
    $('#Pg_1_option_Basicamt').live("change", function () {
    var v = parseInt($(this).val());
    var va = $(this).val();
    var a = isNaN(v) ? 0 : v;
    option(va, a);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.BasicAmnt_1', null, v, false);  
});


$('#Pg_1_check_Include').live("click", function () {
    var chked = $("#Pg_1_check_Include").is(":checked");
    var val = (chked == true) ? true : '';
    if (val == true) {
        $('#Pg_1_text_EstTax').removeAttr('readonly');
        
        var Ln2maxamt = parseInt($('#Pg_1_text_Maxamt').val()); //Ln2 maxamt
        var Ln2tax = parseInt($('#Pg_1_text_EstTax').val()); //Ln2 tax
        
        var Ln2maxamtVal = isNaN(Ln2maxamt) ? 0 : Ln2maxamt;
        var Ln2taxVal = isNaN(Ln2tax) ? 0 : Ln2tax;
        
        var Ln2TransAmt1 = Ln2maxamtVal - Ln2taxVal;
        if ((Ln2maxamtVal - Ln2taxVal) < 0) {
            Ln2TransAmt1 = 0;
        }
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.chkSpouse', null, "true", false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.EstTaxAmntSp', null, Ln2taxVal, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.AmntTransf', null, Ln2TransAmt1, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_2', null, Ln2TransAmt1, true);
       
    }
    else {
        $('#Pg_1_text_EstTax').attr('readonly', 'readonly');
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.chkSpouse', null, "", false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.EstTaxAmntSp', null, "", false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.AmntTransf', null, "", false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_2', null, "", true);
    }
    AddDataofFirstSheet();
})

//    $('#Pg_1_check_Include').live("click", function () {

//    var Ln1 = parseInt($('#Pg_1_text_Maxamt').val());
//    var Ln1Val = isNaN(Ln1) ? 0 : Ln1;
//    // var c = parseInt($('#Pg_1_option_Basicamt').val());
//    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.MaxAmtSpouse', null, Ln1Val, false); 
//    
//    var Ln3 = parseInt($('#Pg_1_text_calc3').val());
//    var Ln3Val = isNaN(Ln3) ? 0 : Ln3;

//    var Ln5 = parseInt($('#Pg_1_text_calc5').val());
//    var Ln5Val = isNaN(Ln5) ? 0 : Ln5;

//    var Ln6 = parseInt($('Pg_1_text_calc6').val());
//    var Ln6Val = isNaN(Ln6) ? 0 : Ln6;


//    var Ln9 = parseInt($('#Pg_1_text9_calc9').val()); //Ln9
//    var Ln9Val = isNaN(Ln9) ? 0 : Ln9;

//    if ($('input[name="spouse"]:checked').length != 0) {
//        $('#Pg_1_text_EstTax').removeAttr('readonly');

//        var Ln2maxamt = parseInt($('#Pg_1_text_Maxamt').val()); //Ln2 maxamt
//        var Ln2tax = parseInt($('#Pg_1_text_EstTax').val()); //Ln2 tax
//        var Ln2maxamtVal = isNaN(Ln2maxamt) ? 0 : Ln2maxamt;
//        var Ln2taxVal = isNaN(Ln2tax) ? 0 : Ln2tax;
//        var Ln2TransAmt1 = Ln2maxamtVal - Ln2taxVal;
//        if ((Ln2maxamtVal - Ln2taxVal) < 0) {
//            Ln2TransAmt1 = 0;
//        }
//        var Ln7 = Ln1Val + Ln2TransAmt1 + Ln3Val + Ln5Val + Ln6Val; //Ln7
//        var Ln10 = Ln7 + Ln9Val;
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.chkSpouse', null, "true", false);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.AmntTransf', null, Ln2TransAmt1, false);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_2', null, Ln2TransAmt1, false);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_3', null, Ln3Val, false);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_5', null, Ln5Val, false);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_6', null, Ln6Val, false);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_9', null, Ln6Val, false);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_7', null, Ln7, true);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_10', null, Ln10, true);
//        // var val = parseInt($('#Pg_1_text_calc10').val());

//        code(Ln10);
//    }
//    else {
//        $('#Pg_1_text_EstTax').attr('readonly', 'readonly');
//        var Ln7 = Ln1Val + Ln3Val + Ln5Val + Ln6Val;
//        var Ln10 = Ln7 + Ln9Val;
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.chkSpouse', null, "", false);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.EstTaxAmntSp', null, '', false);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_7', null, Ln7, false);
//        // var val = parseInt($('#Pg_1_text_calc10').val());
//        // code(val);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_3', null, 0, false);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_9', null, 0, false);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_2', null, '', false);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_3', null, 0, false);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.AmntTransf', null, '', true);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_10', null, Ln10, true);
//        code(Ln10);
//    }
//});

    $('#Pg_1_text_EstTax').live("change", function ()  {
    var a = parseInt($('#Pg_1_text_Maxamt').val()); //11305
    var b = parseInt($('#Pg_1_text_EstTax').val());
    var c = parseInt($('#Pg_1_option_Basicamt').val()); //Ln1
    var d = parseInt($('#Pg_1_text_calc5').val());

    var Ln3 = parseInt($('#Pg_1_text_calc3').val());
    var Ln3Val = isNaN(Ln3) ? 0 : Ln3;

    var Ln6 = parseInt($('#Pg_1_text_calc6').val());
    var Ln6Val = isNaN(Ln6) ? 0 : Ln6;

    var val = isNaN(b) ? 0 : b;
    var vals = isNaN(d) ? 0 : d;
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.AmntTransf', null, a - val, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_2', null, a - val, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_10', null, a - val + c + vals, true);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_7', null, a - val + c + vals + Ln6Val + Ln3Val, true);
    var val = parseInt($('#Pg_1_text_calc10').val());
    code(val);
});
$('#Pg_1_text_calc5').live("change", function () {

    var Ln5 = parseInt($('#Pg_1_text_calc5').val());
    var Ln5Val = isNaN(Ln5) ? 0 : Ln5;
    if (Ln5Val != 2570) {
        var e = $(this).attr('title');
        alert(e);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_5', null,'', true);
        
        $('#Pg_1_text_calc5').val(0);
        // OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_5', null, '', false);
        AddDataofFirstSheet();
    }
    else {
        AddDataofFirstSheet();

        //        var Ln1 = parseInt($('#Pg_1_option_Basicamt').val()); //Ln1
        //        var Ln2maxamt = parseInt($('#Pg_1_text_Maxamt').val()); //Ln2 maxamt
        //        var Ln2tax = parseInt($('#Pg_1_text_EstTax').val()); //Ln2 tax

        //        var Ln1Val = isNaN(Ln1) ? 0 : Ln1;
        //        var Ln2maxamtVal = isNaN(Ln2maxamt) ? 0 : Ln2maxamt;
        //        var Ln2taxVal = isNaN(Ln2tax) ? 0 : Ln2tax;

        //        var Ln2TransAmt1 = Ln2maxamtVal - Ln2taxVal;
        //        if ((Ln2maxamtVal - Ln2taxVal) < 0) {
        //            Ln2TransAmt1 = 0;
        //        }

        //        var Ln3 = parseInt($('#Pg_1_text_calc3').val());
        //        var Ln3Val = isNaN(Ln3) ? 0 : Ln3;

        //        var Ln6 = parseInt($('#Pg_1_text_calc6').val());
        //        var Ln6Val = isNaN(Ln6) ? 0 : Ln6;

        //        var Ln7 = Ln1Val + Ln2TransAmt1 + Ln3Val + Ln5Val + Ln6Val;

        //        var Ln9 = parseInt($('#Pg_1_text9_calc9').val());
        //        var Ln9Val = isNaN(Ln9) ? 0 : Ln9;

        //        var Ln10 = Ln7 + Ln9Val;

        //        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.AmntTransf', null, Ln2TransAmt1, false);
        //        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_2', null, Ln2TransAmt1, false);
        //        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_7', null, Ln7, false);
        //        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_10', null, Ln10, false);
        //        code(Ln10);
    }

});
$('#Pg_1_text_calc11').live("change", function ()  {
    var Ln11 = parseInt($('#Pg_1_text_calc11').val());
    var Ln11Val = isNaN(Ln11) ? 0 : Ln11;
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_11', null, Ln11Val, false);
})
$('#checkExemptions20').live('click', function () {
    var chked = $("#checkExemptions20").is(":checked");
    var val = (chked == true) ? true : '';
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Exemptions20', null, val, false);
})

$('#checkExemptions22').live('click', function () {
    var chked = $("#checkExemptions22").is(":checked");
    var val = (chked == true) ? true : '';
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Exemptions22', null, val, false);
})

$('#Checkbox3').live("click", function () {
    var b = parseInt($('#Text43').val()); //Ln52
    var bb = isNaN(b) ? 0 : b;
    var Ln40 = parseInt($('#Pg_4_text_1stperson').val()); //Ln40
    // OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_1stPerson50', null, Ln40, false);
    var Estper1 = parseInt($('#Pg_4_text_EstAmt1stperson').val()); //Ln45
    var Estper1Val = isNaN(Estper1) ? 0 : Estper1;
    var Ln55 = parseInt($('#Text42').val()); ;   //Ln55
    var Ln55Val = isNaN(Ln55) ? 0 : Ln55;
    var Ln50 = Ln40 - Estper1Val; //Ln50
    if ($('#Checkbox3:checked').length != 0) {
        $('#Pg_4_text_EstAmt1stperson').removeAttr('disabled');
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_1stPerson50', null, Ln50, false);
        var Ln52New = bb + Ln50;
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_Total52', null, Ln52New, false);
        var Ln60 = Ln52New - Ln55Val;
        if (Ln60 > 0) {
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_AmntDepend60', null, Ln60, true);
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_3', null, Ln60, true);
        }
        else {
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_AmntDepend60', null, 0, true);
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_3', null, 0, true);
        }

    }
    else {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_1stPerson50', null, '', false);
        $('#Pg_4_text_EstAmt1stperson').attr('disabled', 'disabled');
        $('#Pg_4_text_EstAmt1stperson').val(0);
        var Ln52New = bb - Ln50;
        var Ln60 = Ln52New - Ln55Val;
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_Total52', null, Ln52New, false);
        if (Ln60 > 0) {
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_AmntDepend60', null, Ln60, true);
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_3', null, Ln60, true);
        }
        else {
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_AmntDepend60', null, 0, true);
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_3', null, 0, true);
        }

    }
    AddDataofFirstSheet();
});
$('#Checkbox4').live("click", function () {
    var b = parseInt($('#Text43').val()); //Ln52
    var bb = isNaN(b) ? 0 : b;
    var Ln40 = parseInt($('#Pg_4_text_2ndperson').val()); //Ln40

   // OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_1stPerson50', null, Ln40, false);
    var Estper2 = parseInt($('#Pg_4_text_EstAmt2ndperson').val()); //Ln45
    var Estper2Val = isNaN(Estper2) ? 0 : Estper2;
    var Ln55 = parseInt($('#Text42').val()); ;   //Ln55
    var Ln55Val = isNaN(Ln55) ? 0 : Ln55;
    var Ln50 = Ln40 - Estper2Val; //Ln50
    if ($('#Checkbox4:checked').length != 0) {
        $('#Pg_4_text_EstAmt2ndperson').removeAttr('disabled');
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_2ndPerson50', null, Ln50, false);
        var Ln52New = bb + Ln50;
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_Total52', null, Ln52New, false);
        var Ln60 = Ln52New - Ln55Val;
        if (Ln60 > 0) {
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_AmntDepend60', null, Ln60, true);
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_3', null, Ln60, true);
        }
        else {
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_AmntDepend60', null, 0, true);
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_3', null, 0, true);
        }
    }
    else {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_2ndPerson50', null, '', false);
        $('#Pg_4_text_EstAmt2ndperson').attr('disabled', 'disabled');
        $('#Pg_4_text_EstAmt2ndperson').val('');
        var Ln52New = bb - Ln50;
        var Ln60 = Ln52New - Ln55Val;
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_Total52', null, Ln52New, false);
        if (Ln60 > 0) {
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_AmntDepend60', null, Ln60, true);
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_3', null, Ln60, true);
        }
        else {
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_AmntDepend60', null, 0, true);
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_3', null, 0, true);
        }
    }
    AddDataofFirstSheet();
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
    var o= parseInt($('#Text42').val());
    var kk = isNaN(k) ? 0 : k;
    var ll = isNaN(l) ? 0 : l;
    var mm = isNaN(m) ? 0 : m;
    var nn = isNaN(n) ? 0 : n;
    var oo = isNaN(o) ? 0 : o;
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_Total52', null, kk + ll + mm + nn, false);

    if (((kk + ll + mm + nn) - oo) > 0) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_AmntDepend60', null, (kk + ll + mm + nn) - oo, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_3', null, (kk + ll + mm + nn) - oo, true);
    }
    else {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_AmntDepend60', null, 0, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_3', null, 0, true);
     }
    AddDataofFirstSheet();
}
$('#Text42').live("change", function () {
    var a = parseInt($(this).val());
    if (a % 253 != 0) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_55', null,0, true);
        var Invalid= 'InValid value:'
        var e = $(this).attr('title');
        alert(Invalid+e);
     }
    else {

        var b = parseInt($('#Text43').val());
        var aa = isNaN(a) ? 0 : a;
        var bb = isNaN(b) ? 0 : b;
        // var cc = isNaN(b) ? 0 : b;
        if (bb - aa > 0) {
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_AmntDepend60', null, b - a, true);
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_3', null, b - a, true);

        }
        else {
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_AmntDepend60', null, 0, true);
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_3', null, 0, true);
        }
        AddDataofFirstSheet();
    }
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

$('#Text7').live("change", function () {
    var a = parseInt($('#Text7').val()); //Ln110
    var b = parseInt($('#Text8').val()); //Ln111
    var c = a - b;
    //    var c = parseInt($('#Pg_1_option_Basicamt').val());
    //    var d = parseInt($('#Pg_1_text_calc5').val());
    if ((c > 3000) || (c < 0)) {
        c = 0; //Ln112
    }
    else {
        c; //Ln112
    }
    var val = isNaN(c) ? 0 : c; //Ln112
    //    var vals = isNaN(d) ? 0 : d;
    $('#Text12').val(val);
    var d = val * 0.752;
    $('#Text16').val(d);
    $('#Pg_1_text9_calc9').val(d);
    var e = parseInt($('#Pg_1_text_newcalc10').val());
    var f = d + parseInt(e);
    $('Pg_1_text2_wCalc_10').val(f);

    var Ln113 = $('#Text15').val();
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC3_Calc_1', null, a, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC3_Calc_2', null, b, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC3_Calc_3', null, c, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC3_Calc_4', null, Ln113, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC3_Calc_5', null, d, false);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_9', null, d, false);
    AddDataofFirstSheet();
    //    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_10', null, a - val + c + vals, true);
    //    var val = parseInt($('#Pg_1_text_calc10').val());
    //    code(val);

});


function code(val) {
    if (val == 0) { OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, '0', true); }
    else if (val >= 1 && val <= 11305) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'A', true);
    }
    else if (val >= 11306 && val <= 13000) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'B', true);
    }
    else if (val >= 13001 && val <= 15000) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'C', true);
    }
    else if (val >= 15001 && val <= 18000) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'D', true);
    }
    else if (val >= 18001 && val <= 19000) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'E', true);
    }
    else if (val >= 19001 && val <= 20000) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'F', true);
    }
    else if (val >= 20001 && val <= 21500) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'G', true);
    }
    else if (val >= 21501 && val <= 23000) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'H', true);
    }
    else if (val >= 23001 && val <= 26000) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'I', true);
    }
    else if (val >= 26001 && val <= 28000) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'J', true);
    }
    else if (val >= 28001 && val <= 29500) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'K', true);
    }
    else if (val >= 29501 && val <= 31000) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'L', true);
    }
    else if (val >= 31001 && val <= 32000) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'M', true);
    }
    else if (val >= 32001 && val <= 34000) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'N', true);
    }
    else if (val >= 34000) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.DeductCode', null, 'X', true);
    }

};

//$('#Select4').live("click", function () {
//    var c = parseInt($('#Text40').val());
//    var a = parseInt($(this).val());
//    var b = parseInt($('#Text35').val());
//    var e = parseInt($('#Text31').val());
//    var bb = isNaN(b) ? 0 : b;
//    var aa = isNaN(a) ? 0 : a;
//    var cc = isNaN(c) ? 0 : c;
//    var ee = isNaN(c) ? 0 : c;
//    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_73', null, aa, false);
//    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Total70to71', null, aa, false);
//    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_85', null, aa + bb + ee, true);
//});


$('#Select70').live("click", function () {

    //To handle if dropdowns are not selected in Order starts
    var Ln75 = parseInt($('#Select75').val());
    var Ln75Val = isNaN(Ln75) ? 0 : Ln75;

    //To handle if dropdowns are not selected in Order ends

    //To get the Value of Ln85 starts
    var Ln70 = parseInt($('#Select70').val());
    var Ln79 = parseInt($('#Text35').val());
    var Ln80 = parseInt($('#Text32').val());


    var Ln70Val = isNaN(Ln70) ? 0 : Ln70;
    var Ln79Val = isNaN(Ln79) ? 0 : Ln79;
    var Ln80Val = isNaN(Ln80) ? 0 : Ln80;

    var Ln85Val = Ln70Val + Ln79Val + Ln80Val;
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_85add70add35', null, Ln85Val, true);
    //To get the Value of Ln85 ends 

    // To get value in Ln96 starts
    // taking value of Ln95
    var Ln95 = parseInt($('#Text13').val());
    var Ln95Val = isNaN(Ln95) ? 0 : Ln95;

    var Ln96val = (Ln85Val - Ln95Val);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_96', null, Ln96val, true);
    // To get value in Ln96 starts

    //To get Value of Ln98 starts
    //to get ln97 value
    var Ln97 = parseInt($('#Text9').val());
    var Ln97val = isNaN(Ln97) ? 0 : Ln97;

    var Ln98 = Ln96val - Ln97val;
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_98', null, Ln98, true);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_6', null, Ln98, true); //Ln9
    // To get value of Ln98 ends
    AddDataofFirstSheet();
});

$('#Select75').live("click", function () {
   // var a = parseInt($(this).val());
    var b = parseInt($('#Select75').val());
    var c = parseInt($('#Text37').val());

    var bb = isNaN(b) ? 0 : b;
   // var aa = isNaN(a) ? 0 : a;
    var cc = isNaN(c) ? 0 : c;

    var e = parseInt($('#Select70').val());
    var ee = isNaN(e) ? 0 : e;
    var f = parseInt($('#Text32').val());
    var ff = isNaN(f) ? 0 : f;

    var Ln79 = bb + cc; //same value for both fields

    var Ln85 = bb + ee + ff; //Ln85 value
    // taking value of Ln95
    var Ln95 = parseInt($('#Text13').val());
    var Ln95Val = isNaN(Ln95) ? 0 : Ln95;
    var Ln96val = (Ln85 - Ln95Val); //Ln 96 Value

    //to get value in 98 starts
    var Ln97 = parseInt($('#Text9').val());
    var Ln97val = isNaN(Ln97) ? 0 : Ln97;
    var Ln98Val = Ln96val - Ln97val;
    //to get value in 98 ends

    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Total75And78', null, Ln79, true);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_79', null, Ln79, true);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_85add70add35', null, Ln85, true);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_96', null, Ln96val, true);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_98', null, Ln98Val, true);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_6', null, Ln98Val, true); //Ln9
    AddDataofFirstSheet();
})

$('#Select76').live("click", function () {

    var a = parseInt($(this).val());

    var Ln70 = parseInt($('#Select70').val()); //Ln70
    var Ln70Val = isNaN(Ln70) ? 0 : Ln70;
    //To get Ln75 value starts
    var e = parseInt($('#Select75').val());
    var ee = isNaN(e) ? 0 : e;
    //To get Ln75 value ends


    var b = parseInt($('#Select76').val());
    var c = parseInt($('#Select77').val()); //Ln77 Value
    // var e = parseInt($('#Text36').val());
    var d = parseInt($('#Text80').val());//Ln80
    var dd = isNaN(d) ? 0 : d;

    var aa = isNaN(a) ? 0 : a;
    var bb = isNaN(b) ? 0 : b;
    var cc = isNaN(c) ? 0 : c;
    var ff = (bb - cc);
    var Ln79 = ee + ff; //Ln79
    var Ln80 = parseInt($('#Text32').val()); //Ln80
    var Ln80Val = isNaN(Ln80) ? 0 : Ln80;
    var Ln85 = Ln70Val + Ln79 + Ln80Val;
    // to get value in Ln96 starts
    // taking value of Ln95
    var Ln95 = parseInt($('#Text13').val());
    var Ln95Val = isNaN(Ln95) ? 0 : Ln95;
    //taking value of Ln85
    var Ln85Val = Ln70Val + Ln79 + Ln80Val;
    var Ln96val = (Ln85Val - Ln95Val);
    // to get value in Ln96 ends

    //to get value in 98 starts
    var Ln97 = parseInt($('#Text9').val());
    var Ln97val = isNaN(Ln97) ? 0 : Ln97;
    var Ln98Val = Ln96val - Ln97val;
    //to get value in 98 ends

    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Total77to76', null, ff, true);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_78', null, ff, true);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Total75And78', null, Ln79, true);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_79', null, Ln79, true);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_85add70add35', null, Ln85, true);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_96', null, Ln96val, true);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_98', null, Ln98Val, true);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_6', null, Ln98Val, true); //Ln9
    AddDataofFirstSheet();
});

$('#Select77').live("click", function () {
   //var a = parseInt($(this).val());
    var Ln77 = parseInt($(this).val());
    var Ln76 = parseInt($('#Select76').val());

    var Ln77Val = isNaN(Ln77) ? 0 : Ln77;
    var Ln76Val = isNaN(Ln76) ? 0 : Ln76;

    var Ln78 = Ln76Val - Ln77Val;

    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Total77to76', null, Ln78, true);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_78', null, Ln78, true);

    var Ln75 = parseInt($('#Select75').val());
    var Ln75Val = isNaN(Ln75) ? 0 : Ln75;

    var Ln79 = Ln75Val + Ln78;
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Total75And78', null, Ln79, true);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_79', null, Ln79, true);

    var Ln70 = parseInt($('#Select70').val());
    var Ln80 = $('#Text32').val();
    var Ln70Val = isNaN(Ln70) ? 0 : Ln70;
    var Ln80Val = isNaN(Ln80) ? 0 : Ln80;
    var Ln85 = Ln70Val + Ln79 + Ln80Val
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_85add70add35', null, Ln85, true);


    var Ln95 = $('#Text13').val();
    var Ln95Val = isNaN(Ln95) ? 0 : Ln95;

    var Ln96 = Ln85 - Ln95Val;
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_96', null, Ln96, true);

    var Ln97 = $('#Text9').val();
    var Ln97Val = isNaN(Ln97) ? 0 : Ln97;
    var Ln98 = Ln96 - Ln97Val;
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_98', null, Ln98, true);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_6', null, Ln98, true); //Ln9
    AddDataofFirstSheet();
});

//Onchanging Ln80
$('#Text32').live("change", function () {
    var Ln70 = parseInt($('#Select70').val());
    var Ln70Val = isNaN(Ln70) ? 0 : Ln70;
    var Ln79 = parseInt($('#Text35').val());
    var Ln79Val = isNaN(Ln79) ? 0 : Ln79;
    var Ln80 = parseInt($(this).val());
    var Ln80Val = isNaN(Ln80) ? 0 : Ln80;
    var Ln85Val = Ln70Val + Ln79Val + Ln80Val;
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_85add70add35', null, Ln85Val, true);

    var Ln95 = $('#Text13').val();
    var Ln95Val = isNaN(Ln95) ? 0 : Ln95;
    var Ln96 = Ln85Val - Ln95Val;
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_96', null, Ln96, true);

    var Ln97 = $('#Text9').val();
    var Ln97Val = isNaN(Ln97) ? 0 : Ln97;
    var Ln98 = Ln96 - Ln97Val;
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_98', null, Ln98, true);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_6', null, Ln98, true);
    AddDataofFirstSheet();
})

//$('#Text80').live("click", function () {

//    var a = parseInt($(this).val());
//    var b = parseInt($('#Select70').val());
//    var c = parseInt($('#Text35').val());
//    var d = parseInt($('#Text80').val());
//    var bb = isNaN(b) ? 0 : b;
//    var aa = isNaN(a) ? 0 : a;
//    var cc = isNaN(c) ? 0 : c;
//    var dd = isNaN(c) ? 0 : d;
//    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_85add70add35', null, bb + cc + dd, true);
//    // OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_78', null, bb - cc, true);

//});
//$('#Select7').live("click", function () {
//    var a = parseInt($(this).val());
//    var b = parseInt($('#Select5').val());
//    var c = parseInt($('#Select6').val());
//    var d = parseInt($('#Text31').val());
//    var e = parseInt($('#Text39').val());
//    var dd = isNaN(d) ? 0 : d;
//    var ee = isNaN(e) ? 0 : e;
//    if (a - b > 0) {

//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Total77To76', null, a - b, false);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_78', null, a - b, false);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Total75And78', null, a - b + c, false);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_79', null, a - b + c, false);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_85', null, a - b + c + dd + ee, true);

//    }
//    else {
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Total77To76', null, 0, false);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_78', null, 0, false);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Total75And78', null, c, false);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_79', null, c, false);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_85', null, c + dd + ee, true);
//    }
//});
//$('#Select5').live("click", function () {
//    var b = parseInt($(this).val());
//    var a = parseInt($('#Select7').val());
//    var c = parseInt($('#Select6').val());
//    var d = parseInt($('#Text31').val());
//    var e = parseInt($('#Text39').val());
//    var dd = isNaN(d) ? 0 : d;
//    var ee = isNaN(e) ? 0 : e;
//    if (a - b > 0) {
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Total77To76', null, a - b, false);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_78', null, a - b, false);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Total75And78', null, a - b + c, false);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_79', null, a - b + c, false);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_85', null, a - b + c + dd + ee, true);
//    }
//    else {
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Total77To76', null, 0, false);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_78', null, 0, false);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Total75And78', null, c, false);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_79', null, c, false);
//        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_85', null, c + dd + ee, true);
//    }
//});
//$('#Select6').live("click", function () {
//    var b = parseInt($(this).val());
//    var d = parseInt($('#Text37').val());
//    var e = parseInt($('#Text31').val());
//    var f = parseInt($('#Text39').val());
//    var ee = isNaN(e) ? 0 : e;
//    var dd = isNaN(d) ? 0 : d;
//    var ff = isNaN(f) ? 0 : f;
//    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Total75And78', null, b + dd, false);
//    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_79', null, b + dd, false);
//    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_85', null, ff + ee + b + dd, true);

//});

$('#Text33').live("change", function () {
    var a = parseInt($(this).val());
    var b = parseInt($('#Text32').val());
    calc(a, b);
});
//$('#Text32').live("change", function () {
//    var a = parseInt($(this).val());
//    var b = parseInt($('#Text33').val());
//    calc(a, b);
//    if (parseInt(a) >= 2012) {
//        alert("The value must be less than or equal to $2012");
//    }
//});

//function calc(a, b) {
//    var aa = isNaN(a) ? 0 : a;
//    var bb = isNaN(b) ? 0 : b;
//    var c = parseInt($('#Text35').val());
//    var cc = isNaN(c) ? 0 : c;
//    var d = parseInt($('#Text39').val());
//    var dd = isNaN(d) ? 0 : d;

//    var e = parseInt($('#Select70').val());
//    var ee = isNaN(e) ? 0 : e;
//    var f = parseInt($('#Text32').val());
//    var ff = isNaN(f) ? 0 : f;
//    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_Toatl80And81', null, aa + bb, false);
//    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_82', null, aa + bb, false);
//    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_85', null, aa + bb + cc + dd, true);

//    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_85add70add35', null, cc + ee + ff, true);


//}

$('#Text17').live("change", function () {

    var a = parseInt($(this).val());
    var aa = isNaN(a) ? 0 : a; //Ln90 value
    var b = parseInt($('#Text19').val());
    var bb = isNaN(b) ? 0 : b; //Ln91 value
    var c = parseInt($('#Text21').val());
    var cc = isNaN(c) ? 0 : c; //Ln85 value

    var Ln92 = aa - bb;
    var Ln97 = parseInt($('#Text9').val());
    var Ln97Val = isNaN(Ln97) ? 0 : Ln97;

    if (Ln92 > 0) {

        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_92', null, Ln92, false);//ln92
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_92MulTotal', null, ((Ln92) * 0.15).toFixed(2), false); //Ln95-1
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_95', null, ((Ln92) * 0.15).toFixed(2), false); //Ln95-2
        if ((cc - ((aa - bb) * 0.15)) < 0) {
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_96', null, 0, true); //Ln96
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_98', null, 0 - Ln97Val, true); //Ln98
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_6', null, 0 - Ln97Val, true); //Ln9 
           
        } else {

            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_96', null, cc - ((Ln92) * 0.15).toFixed(2), true); //Ln96
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_98', null, (cc - ((Ln92) * 0.15).toFixed(2)) - Ln97Val, true); //Ln98
            OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_6', null, (cc - ((Ln92) * 0.15).toFixed(2)) - Ln97Val, true); //Ln9 
        }

    } else {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_92', null, 0, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_92MulTotal', null, 0, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_95', null, 0, false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_96', null, 0, true);
    }
    AddDataofFirstSheet();
});
$('#Text9').live("change", function () {
    var a = parseFloat($(this).val());
    var aa = isNaN(a) ? 0 : a;
    var b = parseFloat($('#Text10').val());
    var bb = isNaN(b) ? 0 : b;
    if (b - a > 0) {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_98', null, bb - aa, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_6', null, bb - aa, true); //Ln9 
    }
    else {
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_98', null, 0, true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_6', null, 0, true); //Ln9
    }
    AddDataofFirstSheet();
});
function test()  {
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
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.MaxAmtSpouse', null, '11305', false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_1stChild', null, '0', false);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC1_2ndChild', null, '0', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_71', null, '0', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_75', null, '0', true);
        OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.WC2_70', null, '0', true);
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

function AddDataofFirstSheet() {

    var Ln1 = parseInt($('#Pg_1_text_Maxamt').val());
    var Ln1Val = isNaN(Ln1) ? 0 : Ln1;

    var Ln2 = parseInt($('#Pg_1_text_calc2').val());
    var Ln2Val = isNaN(Ln2) ? 0 : Ln2;

    var Ln3 = parseInt($('#Pg_1_text_calc3').val());
    var Ln3Val = isNaN(Ln3) ? 0 : Ln3;

    var Ln5 = parseInt($('#Pg_1_text_calc5').val());
    var Ln5Val = isNaN(Ln5) ? 0 : Ln5;

    var Ln6 = parseInt($('#Pg_1_text_calc6').val());
    var Ln6Val = isNaN(Ln6) ? 0 : Ln6;


    var Ln9 = parseInt($('#Pg_1_text9_calc9').val()); //Ln9
    var Ln9Val = isNaN(Ln9) ? 0 : Ln9;

    var Ln7 = Ln1Val + Ln2Val + Ln3Val + Ln5Val + Ln6Val; //Ln7
    var Ln10 = Ln7 + Ln9Val;
    //$('#Pg_1_text_newcalc7').val(Ln7);
   // $('#Pg_1_text2_wCalc_10').val(Ln10);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_7', null, Ln7, true);
    OBPager.SetTaskContentMemberValue('ProvincialTaxQuebecSourceDeduction.Calc_10', null, Ln10, true);
    code(Ln10);

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
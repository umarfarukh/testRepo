

$().ready(function () {
    OBPager.ShowPage(1);


    OBPager.GetMaster(15, "MaritalList");
    OBPager.GetMaster(13, "RelationshipList");
    OBPager.GetMaster(14, "GenderList");
    OBPager.GetMaster(17, "BloodGroupList");
    OBPager.GetMaster(100, "JustifyrequestList");
    OBPager.GetMaster(101, "AccountTypeList");
    OBPager.GetMaster(116, "YesOrNo");
    OBPager.GetGeographyMaster(1, 0, "CountryList");

//    $('#Pg_2_lbl_CapacityPercentage').attr('disabled', true);
    $('#Pg_2_text_CapacityPercentage').attr('disabled', true);
  //  $('#Pg_2_lbl_SeverePercentage').attr('disabled', true);
    $('#Pg_2_text_SeverePercentage').attr('disabled', true);

    var flagEarning;
    flagEarning = JSON.parse(OBPager.strFormDetails).PersonalData.Earning;

    if (flagEarning == 'Y') {
        $('#Pg_2_text_CapacityPercentage').removeAttr('disabled');
    }
    else {
        $('#Pg_2_text_CapacityPercentage').attr('disabled', true);
    }

    var flagSevere ;
    flagSevere =JSON.parse(OBPager.strFormDetails).PersonalData.Severe;

    if (flagSevere == 'Y') {        
        $('#Pg_2_text_SeverePercentage').removeAttr('disabled');
    }
    else {      
        $('#Pg_2_text_SeverePercentage').attr('disabled', true);
    }


    var CandidateType;
    CandidateType = JSON.parse(OBPager.strFormDetails).PersonalData.Candidatetype;

    if (CandidateType == '1') {
        $('.checking').attr('checked', 'checked');
    }
    else {
        $('.checking').removeAttr('checked');
    }






    //PrePopulateValues();


    //    $("#Pg_1_text_Name").val(TaskPrefillValues.PrefillValues.Set1.FirstName);
    //    $("#Pg_1_text_PassportName").val(TaskPrefillValues.PrefillValues.Set1.FirstName);
    //    $("#Pg_1_text_Givenname").val(TaskPrefillValues.PrefillValues.Set1.MiddleName);
    //    $("#Pg_1_text_Surname").val(TaskPrefillValues.PrefillValues.Set1.LastName);
    //    //$("#Pg_1_text_Employeeid").val(TaskPrefillValues.PrefillValues.Set1.AssociateId);
    //    //    $("#Pg_3_text_Cognizantid").val(TaskPrefillValues.PrefillValues.Set1.AssociateId);
    //    //    $("#Pg_3_text_Cognizantid").val(TaskPrefillValues.PrefillValues.Set1.AssociateId);
    //    //$("#Pg_1_text_Designation").val(TaskPrefillValues.PrefillValues.Set1.Designation);
    //    //$("#Pg_1_text_Joiningdate").val(TaskPrefillValues.PrefillValues.Set1.JoiningDate);
    //    $("#Pg_1_text_Dateofbirth").val(TaskPrefillValues.PrefillValues.Set1.DateOfBirth);
    //    $("#maritalstatus_form").val(TaskPrefillValues.PrefillValues.Set1.MaritalStatus);
    //    $("#sex_form").val(TaskPrefillValues.PrefillValues.Set1.Gender);
    //    //$("#nationality_form").val(TaskPrefillValues.PrefillValues.Set1.Nationality);
    //    $("#relation_form").val(TaskPrefillValues.PrefillValues.Set1.EmergencyRelation);
    //    //$("#Pg_1_text_Homeaddress").val(TaskPrefillValues.PrefillValues.Set1.AddressDetails);
    //    $("#Pg_1_text_Telephone").val(TaskPrefillValues.PrefillValues.Set1.HomePhone);
    //    $("#Pg_1_text_Mobile").val(TaskPrefillValues.PrefillValues.Set1.MobilePhone);
    //    //$("#Pg_1_text_Emailaddress").val(TaskPrefillValues.PrefillValues.Set1.EmailId);
    //    $("#Pg_1_text_Emergencyname").val(TaskPrefillValues.PrefillValues.Set1.EmergencyName);
    //    $("#Pg_1_text_Emergencytelephone").val(TaskPrefillValues.PrefillValues.Set1.EmergencyPhone);
    //    $("#Pg_1_text_PAddress1").val(TaskPrefillValues.PrefillValues.Set1.PAddress1);
    //    $("#Pg_1_text_PAddress2").val(TaskPrefillValues.PrefillValues.Set1.PAddress2);
    //    $("#Pg_1_text_PCity").val(TaskPrefillValues.PrefillValues.Set1.City);
    //    $("#Pg_1_text_PZipcode").val(TaskPrefillValues.PrefillValues.Set1.PinCode);
    //    $("#Pg_1_text_PCountry").val(TaskPrefillValues.PrefillValues.Set1.Country);





    if (OBPager.taskStatusFlag == "-1") {
        OBPager.SetTaskContentMemberValue('PersonalData.FirstName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
        //OBPager.SetTaskContentMemberValue('PersonalData.PassportName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.MiddleName', null, TaskPrefillValues.PrefillValues.Set1.MiddleName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.LastName', null, TaskPrefillValues.PrefillValues.Set1.SurName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PassportName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PassportMiddleName', null, TaskPrefillValues.PrefillValues.Set1.MiddleName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PassportLastName', null, TaskPrefillValues.PrefillValues.Set1.SurName, false);
        //OBPager.SetTaskContentMemberValue('PersonalData.EmployeeId', 1, TaskPrefillValues.PrefillValues.Set1.AssociateId, true);
        //OBPager.SetTaskContentMemberValue('PersonalData.CognizantId', 1, TaskPrefillValues.PrefillValues.Set1.AssociateId, true);
        //OBPager.SetTaskContentMemberValue('PersonalData.Cognizantid', 1, TaskPrefillValues.PrefillValues.Set1.AssociateId, true);
        //OBPager.SetTaskContentMemberValue('PersonalData.Designation', 1, TaskPrefillValues.PrefillValues.Set1.Designation, true);
        //OBPager.SetTaskContentMemberValue('PersonalData.JoiningDate', 1, TaskPrefillValues.PrefillValues.Set1.JoiningDate, true);
        OBPager.SetTaskContentMemberValue('PersonalData.DOB', null, TaskPrefillValues.PrefillValues.Set1.DateOfBirth, false);
        OBPager.SetTaskContentMemberValue('PersonalData.MaritalStatus', null, TaskPrefillValues.PrefillValues.Set1.MaritalStatus, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Gender', null, TaskPrefillValues.PrefillValues.Set1.Gender, false);
        //OBPager.SetTaskContentMemberValue('PersonalData.Nationality', 1, TaskPrefillValues.PrefillValues.Set1.Nationality, true);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactRelationship', null, TaskPrefillValues.PrefillValues.Set1.EmergencyRelation, false);
        //OBPager.SetTaskContentMemberValue('PersonalData.HomeAddress', 1, TaskPrefillValues.PrefillValues.Set1.AddressDetails, true);
        OBPager.SetTaskContentMemberValue('PersonalData.HomePh', null, TaskPrefillValues.PrefillValues.Set1.HomePhone, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Mobile', null, TaskPrefillValues.PrefillValues.Set1.MobilePhone, false);
        //OBPager.SetTaskContentMemberValue('PersonalData.EmailAddress', 1, TaskPrefillValues.PrefillValues.Set1.EmailId, true);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactName', null, TaskPrefillValues.PrefillValues.Set1.EmergencyName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactNo', null, TaskPrefillValues.PrefillValues.Set1.EmergencyPhone, false);
        //OBPager.SetTaskContentMemberValue('PersonalData.EmergencyName3', 1, TaskPrefillValues.PrefillValues.Set1.EmergencyName, true);
        //OBPager.SetTaskContentMemberValue('PersonalData.EmergencyTelephone3', 1, TaskPrefillValues.PrefillValues.Set1.EmergencyPhone, true);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentAddressLine1', null, TaskPrefillValues.PrefillValues.Set1.PAddress1, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentAddressLine2', null, TaskPrefillValues.PrefillValues.Set1.PAddress2, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentCity', null, TaskPrefillValues.PrefillValues.Set1.City, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentPinCode', null, TaskPrefillValues.PrefillValues.Set1.PinCode, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentCountry', null, TaskPrefillValues.PrefillValues.Set1.Country, false);



    }

    jQXB.doBind(OBPager.taskContentDSName);
});




function ChkPemanentAddress() {
    if ($("#chkpermAddress_form").is(':checked')) {
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentAddressLine1', null, $('#Pg_1_text_PAddress1').val(), false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentAddressLine2', null, $('#Pg_1_text_PAddress2').val(), false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentCity', null, $('#Pg_1_text_PCity').val(), false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentPinCode', null, $('#Pg_1_text_PZipcode').val(), false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentCountry', null, $('#Pg_1_text_PCountry').val(), false);



        OBPager.SetTaskContentMemberValue('PersonalData.IsSameCurrPermAddress', 1, '1', false);



    }
    else {
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentAddressLine1', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentAddressLine2', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentCity', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentPinCode', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentCountry', null, '', false);
        $('#Pg_1_text_CCountry').val('-1'); 


        OBPager.SetTaskContentMemberValue('PersonalData.IsSameCurrPermAddress', 1, '', false);


    }
    jQXB.doBind(OBPager.taskContentDSName);

}


//var isdisable = JSON.parse(OBPager.strFormDetails).PersonalData.Capacity;
//if (isdisable == 1) {
//    $('#disabledyes_reduction').attr('checked', 'checked');
//    //        OBPager.SetTaskContentMemberValue('PersonalData.IsDisabled.Yes', 1, '1', true);
//    //        OBPager.SetTaskContentMemberValue('PersonalData.IsDisabled.No', 1, '', true);
//}
//else {
//    $('#disabledno_reduction').attr('checked', 'checked');
//    //        OBPager.SetTaskContentMemberValue('PersonalData.IsDisabled.Yes', 1, '', false);
//    //        OBPager.SetTaskContentMemberValue('PersonalData.IsDisabled.No', 1, '1', false);
//}

//var isdisable = JSON.parse(OBPager.strFormDetails).PersonalData.IsDisabled;
//if (isdisable == 1) {
//    $('#disabledyes_severe').attr('checked', 'checked');
//    //        OBPager.SetTaskContentMemberValue('PersonalData.IsDisabled.Yes', 1, '1', true);
//    //        OBPager.SetTaskContentMemberValue('PersonalData.IsDisabled.No', 1, '', true);
//}
//else {
//    $('#disabledno_severe').attr('checked', 'checked');
//    //        OBPager.SetTaskContentMemberValue('PersonalData.IsDisabled.Yes', 1, '', false);
//    //        OBPager.SetTaskContentMemberValue('PersonalData.IsDisabled.No', 1, '1', false);
//}

//function IsDisabled(flag) {
//    if (flag == 1) {
//        OBPager.SetTaskContentMemberValue('PersonalData.IsDisabled', 1, '1', false);
//    }
//    else {
//        OBPager.SetTaskContentMemberValue('PersonalData.IsDisabled', 1, '', false);
//    }
//}

//function Capacity(flag) {
//    if (flag == 1) {
//        OBPager.SetTaskContentMemberValue('PersonalData.IsDisabled', 1, '1', false);
//    }
//    else {
//        OBPager.SetTaskContentMemberValue('PersonalData.IsDisabled', 1, '', false);
//    }
//}

//function Request(flag) {
//    if (flag == 1) {
//        OBPager.SetTaskContentMemberValue('PersonalData.Request.NewHire', 1, '1', false);
////        OBPager.SetTaskContentMemberValue('PersonalData.Request.Transferin', 1, '', false);
////        OBPager.SetTaskContentMemberValue('PersonalData.Request.LossorDamage', 1, '', true);
////        $('#disablednewhire_justify').hide();
//    }


//    else if (flag == 2) {
////        OBPager.SetTaskContentMemberValue('PersonalData.Request.NewHire', 1, '', false);
//        OBPager.SetTaskContentMemberValue('PersonalData.Request.Transferin', 1, '1', false);
////        OBPager.SetTaskContentMemberValue('PersonalData.Request.LossorDamage', 1, '', true);
////        $('#disabledtransferin_justify').hide();
//    }

//     {
////        OBPager.SetTaskContentMemberValue('PersonalData.Request.NewHire', 1, '', false);
//        //        OBPager.SetTaskContentMemberValue('PersonalData.Request.Transferin', 1, '', false);
//        OBPager.SetTaskContentMemberValue('PersonalData.Request.LossorDamage', 1, '', false);
////        $('#disabledlossdamage_justify').show();
//    }

//}

//function RestrictSpecial() {
//    var Special = "[a-zA-Z0-9]+";
//    if($('#swiftcode').text
//}


// function RestrictSpecial() {
//            var Special = "[a-zA-Z0-9]+";
//            if (document.form.swiftcode.value.search(Special) == -1) {
//                alert("Error");
//                return false;
//            }
//            else
//                return true;
//        }


function Checking() {
    if ($('#Checkbox1').is(':checked')) {
        OBPager.SetTaskContentMemberValue('PersonalData.Candidatetype', 1, '1', false);
    }
    else {
        OBPager.SetTaskContentMemberValue('PersonalData.Candidatetype', 1, '', false);
    }
}


function EarningReduction() {
 if ($('#ReductionInEarningCapacity').val() == 'Y') {
  $('#Pg_2_lbl_CapacityPercentage').attr('disabled', false);
  $('#Pg_2_text_CapacityPercentage').removeAttr('disabled').addClass('Alphanumeric');
   OBPager.SetTaskContentMemberValue('PersonalData.Earning', null, $('#ReductionInEarningCapacity').val(), false);
   document.getElementById('Pg_2_text_CapacityPercentage').value = '';
   }
   else{
   $('#Pg_2_lbl_CapacityPercentage').attr('disabled', true);
   $('#Pg_2_text_CapacityPercentage').attr("disabled", "true").removeClass('Alphanumeric');

   OBPager.SetTaskContentMemberValue('PersonalData.Earning', null, $('#ReductionInEarningCapacity').val(), false);
   $('#Pg_2_text_CapacityPercentage').val('');
      OBPager.SetTaskContentMemberValue('PersonalData.EarningPercentage', null, $('#Pg_2_text_CapacityPercentage').val(), false);
  }
}

//    if ($('#ReductionInEarningCapacity').val() == 'Y') {

//        $('#Pg_2_text_CapacityPercentage').attr('disabled', false);
//        $('#Pg_2_lbl_CapacityPercentage').attr('disabled', false);
//        OBPager.SetTaskContentMemberValue('PersonalData.Earning', null, 'Y', true);
//    }
//    else {
//        $('#Pg_2_text_CapacityPercentage').attr('disabled', true);
//        $('#Pg_2_lbl_CapacityPercentage').attr('disabled', true);
//       OBPager.SetTaskContentMemberValue('PersonalData.Earning', null, 'N', true);

//    }
//}


//function EarningReduction() {
//    if ($('#ReductionInEarningCapacity').val() == 'Y') {

////        $('#Pg_2_lbl_CapacityPercentage').attr('disabled', false);
////        $('#Pg_2_text_CapacityPercentage').attr('disabled', false);
////        OBPager.SetTaskContentMemberValue('PersonalData.Earning', null, 'Y', false);


//        $('#Pg_2_text_CapacityPercentage').removeAttr('disabled').addClass('tbForm textMandatory OnlyNumeric');
//        $('.passportcls').parent('label').removeClass('notMandatory');
//        $('.passportcls').show();
//        //        $('#panname_form').removeAttr('disabled').addClass('Alphanumeric');
//                //$('.pancls').parent('label').removeClass('notMandatory');
//                $('.pancls').show();
//        OBPager.SetTaskContentMemberValue('PersonalData.Earning', 1, '1', false);
//    }
//    else {

////        $('#Pg_2_lbl_CapacityPercentage').attr('disabled', true);
////        $('#Pg_2_text_CapacityPercentage').attr('disabled', true);
////        OBPager.SetTaskContentMemberValue('PersonalData.Earning', null, 'N', true);

//        OBPager.SetTaskContentMemberValue('PersonalData.Earning', 1, '2', false);
//        OBPager.SetTaskContentMemberValue('PersonalData.EarningPercentage', null, '', false);
//        $('#Pg_2_text_CapacityPercentage').empty();
//        $('#Pg_2_text_CapacityPercentage').attr("disabled", "true");
//        jQXB.doBind(OBPager.taskContentDSName);
//        $('.passportcls').hide();
//        $('.passportcls').parent('label').addClass('notMandatory');
//        $('#Pg_2_text_CapacityPercentage').attr("disabled", "true").removeClass('tbForm textMandatory OnlyNumeric');
//        //        $('#panname_form').attr("disabled", "true").removeClass('Alphanumeric');
//                //$('.pancls').parent('label').addClass('notMandatory');
//                $('.pancls').hide();
//        //        $('.pancarddetails').find('img').remove();
//        //        $('.pancarddetails').find('.alert_f_text').remove();
//        //        jQXB.doBind(OBPager.taskContentDSName);
//        //        alert('Please apply pan card before joining.');
//    }

//}

function SevereDisability() {
    if ($('#Severedisability').val() == 'Y') {
        $('#Pg_2_lbl_SeverePercentage').attr('disabled', false);
        $('#Pg_2_text_SeverePercentage').removeAttr('disabled').addClass('Alphanumeric');
        OBPager.SetTaskContentMemberValue('PersonalData.Severe', null, $('#Severedisability').val(), false);
        document.getElementById('Pg_2_text_SeverePercentage').value = '';
    }
    else {
        $('#Pg_2_lbl_SeverePercentage').attr('disabled', true);
        $('#Pg_2_text_SeverePercentage').attr("disabled", "true").removeClass('Alphanumeric');
        OBPager.SetTaskContentMemberValue('PersonalData.Severe', null, $('#Severedisability').val(), false);
        $('#Pg_2_text_SeverePercentage').val('');
        OBPager.SetTaskContentMemberValue('PersonalData.SeverePercentage', null, $('#Pg_2_text_SeverePercentage').val(), false);
    }
}




//        $('#Pg_2_text_SeverePercentage').attr('disabled', false);
//        $('#Pg_2_lbl_SeverePercentage').attr('disabled', false);
//        OBPager.SetTaskContentMemberValue('PersonalData.Severe', null, 'Y', true);
//    }
//    else {
//        $('#Pg_2_text_SeverePercentage').attr('disabled', true);
//        $('#Pg_2_lbl_SeverePercentage').attr('disabled', true);
//        OBPager.SetTaskContentMemberValue('PersonalData.Severe', null, 'N', true);

//    }
//}

//function SevereDisability() {
//    if ($('#Severedisability').val() == 'Y') {
//        $('#Pg_2_text_SeverePercentage').removeAttr('disabled').addClass('tbForm textMandatory OnlyNumeric');
//        $('.passportcls').parent('label').removeClass('notMandatory');
//        $('.passportcls').show();
//        //        $('#panname_form').removeAttr('disabled').addClass('Alphanumeric');
//                //$('.pancls').parent('label').removeClass('notMandatory');
//                $('.pancls1').show();
//        OBPager.SetTaskContentMemberValue('PersonalData.Severe', 1, '1', false);
//    }
//    else {
//        OBPager.SetTaskContentMemberValue('PersonalData.Severe', 1, '2', false);
//        OBPager.SetTaskContentMemberValue('PersonalData.SeverePercentage', null, '', false);
//        $('#Pg_2_text_SeverePercentage').empty();
//        $('#Pg_2_text_SeverePercentage').attr("disabled", "true");
//        jQXB.doBind(OBPager.taskContentDSName);
//        $('.passportcls').hide();
//        $('.passportcls').parent('label').addClass('notMandatory');
//        $('#Pg_2_text_SeverePercentage').attr("disabled", "true").removeClass('tbForm textMandatory OnlyNumeric');
//        //        $('#panname_form').attr("disabled", "true").removeClass('Alphanumeric');
//                //$('.pancls').parent('label').addClass('notMandatory');
//                $('.pancls1').hide();
//        //        $('.pancarddetails').find('img').remove();
//        //        $('.pancarddetails').find('.alert_f_text').remove();
//        //        jQXB.doBind(OBPager.taskContentDSName);
//        //        alert('Please apply pan card before joining.');
//    }

//}


function SaveTaskData(saveMode) {


    // saveMode { 0:Save, 1:Submit }
    if (saveMode == 1) {
        if (validate.ValidateSubmit() == true) {
            if (OBPager.ValidateTaskData(saveMode) == true) {
                try {
                    if (OBPager.SaveTaskData(saveMode) == true) {
                        return true;
                    }
                    else {
                        return false;
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

                return false;
            }
        }
        catch (e) {
            alert(e.Message);
        }
    }


}



$(function () {
    $(".jQrydatepicker").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar',
        yearRange: "-62:+0",
        maxDate: "0",
        showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    });

    $(".jQryExpdate").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar',
        yearRange: "-0:+28",
        minDate: "0",
        showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    });
});




function ResetTaskData() {
    OBPager.ResetTaskContent();
    //PrePopulateValues();
    if (OBPager.taskStatusFlag == -1) {
        // Set member value manually
        OBPager.SetTaskContentMemberValue('PersonalData.FirstName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
        //OBPager.SetTaskContentMemberValue('PersonalData.PassportName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.MiddleName', null, TaskPrefillValues.PrefillValues.Set1.MiddleName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.LastName', null, TaskPrefillValues.PrefillValues.Set1.SurName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PassportName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PassportMiddleName', null, TaskPrefillValues.PrefillValues.Set1.MiddleName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PassportLastName', null, TaskPrefillValues.PrefillValues.Set1.SurName, false);
        //OBPager.SetTaskContentMemberValue('PersonalData.EmployeeId', null, TaskPrefillValues.PrefillValues.Set1.AssociateId, false);
        //OBPager.SetTaskContentMemberValue('PersonalData.CognizantId', null, TaskPrefillValues.PrefillValues.Set1.AssociateId, false);
        //OBPager.SetTaskContentMemberVAlue('PersonalData.Cognizantid', null, TaskPrefillVAlues.PrefillValues.Set1.AssociateId, false);
        //OBPager.SetTaskContentMemberValue('PersonalData.Designation', null, TaskPrefillValues.PrefillValues.Set1.Designation, false);
        //OBPager.SetTaskContentMemberValue('PersonalData.JoiningDate', null, TaskPrefillValues.PrefillValues.Set1.JoiningDate, false);
        OBPager.SetTaskContentMemberValue('PersonalData.DOB', null, TaskPrefillValues.PrefillValues.Set1.DateOfBirth, false);
        OBPager.SetTaskContentMemberValue('PersonalData.MaritalStatus', null, TaskPrefillValues.PrefillValues.Set1.MaritalStatus, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Gender', null, TaskPrefillValues.PrefillValues.Set1.Gender, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Nationality', null, TaskPrefillValues.PrefillValues.Set1.Nationality, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactRelationship', null, TaskPrefillValues.PrefillValues.Set1.EmergencyRelation, false);
        //OBPager.SetTaskContentMemberValue('PersonalData.HomeAddress', null, TaskPrefillValues.PrefillValues.Set1.AddressDetails, false);
        OBPager.SetTaskContentMemberValue('PersonalData.HomePh', null, TaskPrefillValues.PrefillValues.Set1.HomePhone, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Mobile', null, TaskPrefillValues.PrefillValues.Set1.MobilePhone, false);
        //OBPager.SetTaskContentMemberValue('PersonalData.EmailAddress', null, TaskPrefillValues.PrefillValues.Set1.EmailId, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactName', null, TaskPrefillValues.PrefillValues.Set1.EmergencyName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactNo', null, TaskPrefillValues.PrefillValues.Set1.EmergencyPhone, false);
        //OBPager.SetTaskContentMemberValue('PersonalData.EmergencyName3', 1, TaskPrefillValues.PrefillValues.Set1.EmergencyName, true);
        //OBPager.SetTaskContentMemberValue('PersonalData.EmergencyTelephone3', 1, TaskPrefillValues.PrefillValues.Set1.EmergencyPhone, true);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentAddressLine1', null, TaskPrefillValues.PrefillValues.Set1.PAddress1, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentAddressLine2', null, TaskPrefillValues.PrefillValues.Set1.PAddress2, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentCity', null, TaskPrefillValues.PrefillValues.Set1.City, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentPinCode', null, TaskPrefillValues.PrefillValues.Set1.PinCode, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentCountry', null, TaskPrefillValues.PrefillValues.Set1.Country, false);

        $('#Pg_1_text_CCountry').val('-1');
        $('#PassportCountry').val('-1');
        $('#ReductionInEarningCapacity').val('-1');
        $('#Severedisability').val('-1');
        $('#accounttype_form').val('-1');
        $('#Country_form').val('-1');
        $('#maritalstatus_form').val('-1');
        $('#sex_form').val('-1');
        $('#nationality_form').val('-1');
        $('#Pg_1_text_PCountry').val('-1');
        $('#relation_form').val('-1');
        

    }
    jQXB.doBind(OBPager.taskContentDSName);
}
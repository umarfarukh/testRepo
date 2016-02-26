
   var clsObj;

   $().ready(function () {
       OBPager.ShowPage(1);


       OBPager.GetMaster(15, "MaritalList");
       OBPager.GetMaster(14, "GenderList");
       OBPager.GetMaster(13, "RelationshipList");
       OBPager.GetMaster(21, "Nationality");
       OBPager.GetMaster(101, "AccountTypeList");
       OBPager.GetMaster(116, "YesOrNo");
       OBPager.GetMaster(117, "Permittype");
       OBPager.GetMaster(118, "Permitlist");
       OBPager.GetGeographyMaster(1, 0, "CountryList");

       OBPager.GetGeographyMaster(65, 0, "PermittypeNormal");

       //$('#IfNo').attr('disabled', true);
       $('#Pg_1_nameofswisshealthins_tb').attr('disabled', true);
       //$('#Pg_2_dom_tb').attr('disabled', true);
       //$('#Pg_1_DOM_lbl').attr('disabled', true);
       //$('#Pg_2_CantonofResidence_list').attr('disabled', true);
//       $('#Pg_2_Cantonofresidence_txt').attr('disabled', true);
       //$('#Pg_2_NumberofChildren_list').attr('disabled', true);
//       $('#Pg_2_Numberofchildren_txt').attr('disabled', true);
       //$('#Pg_2_Zar_list').attr('disabled', true);
//       $('#Pg_2_zar_txt').attr('disabled', true);
       //$('#Pg_2_Permit_list').attr('disabled', true);
       $('#Pg_2_Permit_txt').attr('disabled', true);
       //$('#Pg_2_SpousePermitType_list').attr('disabled', true);
       $('#Pg_2_Typeofpermitofspouse_txt').attr('disabled', true);
       //$('#Pg_2_EmployerName_list').attr('disabled', true);
       $('#Pg_2_employer_txt').attr('disabled', true);
       //$('#Pg_2_Volume_list').attr('disabled', true);
       $('#Pg_2_volumeofwork_txt').attr('disabled', true);
       //$('#Pg_2_Salary_list').attr('disabled', true);
       $('#Pg_2_salry_txt').attr('disabled', true);
       //$('#Pg_2_AHV').attr('disabled', true);
       $('#pg_2_AHVNo_txt').attr('disabled', true);
       //$('#switz_permit').attr('disabled', true);
       $('#Pg_2_Permittype_ddl').attr('disabled', true);





       var CECountryID;
       CECountryID = TaskPrefillValues.PrefillValues.Set1.CECountryID

       var CEPermitType;
       CEPermitType = TaskPrefillValues.PrefillValues.Set1.CEPermitType

       var CEYes;
       CEYes = TaskPrefillValues.PrefillValues.Set1.CEYes

       var CENo;
       CENo = TaskPrefillValues.PrefillValues.Set1.CENo

       var CENilDropdown;
       CENilDropdown = TaskPrefillValues.PrefillValues.Set1.CENilDropdown





       var checking;
       checking = JSON.parse(OBPager.strFormDetails).PersonalData.Permittype;
      
       var checking1;
       checking1 = JSON.parse(OBPager.strFormDetails).PersonalData.Nationality;

       if (checking == CEPermitType || checking1 == CECountryID) {
           $('#Non_Swiz').hide();
       }
       else {
           $('#Non_Swiz').show();
       }

       var checking2;
       checking2 = JSON.parse(OBPager.strFormDetails).PersonalData.Working;

       if (checking2 == CENo) {
           $('#Pg_2_Employer_list').hide();
           $('#Pg_2_Volumelist').hide();
           $('#Pg_2_Salarylist').hide();
           $('#Pg_2_AHVNO').hide();
       }
       else {
           $('#Pg_2_Employer_list').show();
           $('#Pg_2_Volumelist').show();
           $('#Pg_2_Salarylist').show();
           $('#Pg_2_AHVNO').show();
       }

//       var checking3;
//       checking3 = JSON.parse(OBPager.strFormDetails).PersonalData.CantonofResidence;

//       if (checking3 == undefined) {
//           $('#Pg_2_Cantonofresidence_txt').attr('disabled', true);
//       }
//       else {
//           $('#Pg_2_Cantonofresidence_txt').removeAttr('disabled');
//       }

//       var checking4;
//       checking4 = JSON.parse(OBPager.strFormDetails).PersonalData.NumberofChildren;

//       if (checking4 == undefined) {
//           $('#Pg_2_Numberofchildren_txt').attr('disabled', true);
//       }
//       else {
//           $('#Pg_2_Numberofchildren_txt').removeAttr('disabled');
//       }

//       var checking5;
//       checking5 = JSON.parse(OBPager.strFormDetails).PersonalData.Zarnumber;

//       if (checking5 == undefined) {
//           $('#Pg_2_zar_txt').attr('disabled', true);
//       }
//       else {
//           $('#Pg_2_zar_txt').removeAttr('disabled');
//       }

       var checking6;
       checking6 = JSON.parse(OBPager.strFormDetails).PersonalData.Permitlist;

       if (checking6 == CENilDropdown) {
           $('#Pg_2_Permit_txt').attr('disabled', true);
       }
       else {
           $('#Pg_2_Permit_txt').removeAttr('disabled');
       }

       var flagSwissHealthInsurance;
       flagSwissHealthInsurance = JSON.parse(OBPager.strFormDetails).PersonalData.SwissHealthInsurance;

       if (flagSwissHealthInsurance == CEYes) {
           $('#Pg_1_nameofswisshealthins_tb').removeAttr('disabled');
       }
       else {
           $('#Pg_1_nameofswisshealthins_tb').attr('disabled', true);
       }


       var SpousePermit;
       SpousePermit = JSON.parse(OBPager.strFormDetails).PersonalData.Countryofspouse;

       if (SpousePermit == CECountryID) {
           $('#Pg_2_Typeofpermitofspouse_txt').removeAttr('disabled');
       }
       else {
           $('#Pg_2_Typeofpermitofspouse_txt').attr('disabled', true);
           //$('#Pg_2_Typeofpermitofspouse_txt').val('-1');
       }

       var NationalPermit;
       NationalPermit = JSON.parse(OBPager.strFormDetails).PersonalData.Nationality;

       if (NationalPermit == CECountryID) {
           $('#Pg_2_Permittype_ddl').attr('disabled', true);
       }
       else {
           $('#Pg_2_Permittype_ddl').removeAttr('disabled');
       }

       var Employed;
       Employed = JSON.parse(OBPager.strFormDetails).PersonalData.Working;

       if (Employed == CEYes) {
           $('#Pg_2_employer_txt').removeAttr('disabled');
           $('#Pg_2_volumeofwork_txt').removeAttr('disabled');
           $('#Pg_2_salry_txt').removeAttr('disabled');
           $('#pg_2_AHVNo_txt').removeAttr('disabled');

       }
       else {
           $('#Pg_2_employer_txt').attr('disabled', true);
           $('#Pg_2_volumeofwork_txt').attr('disabled', true);
           $('#Pg_2_salry_txt').attr('disabled', true);
           $('#pg_2_AHVNo_txt').attr('disabled', true);

       }

       if ($('#Pg_2_zar_txt').val() == ',') {
           $('#Pg_2_zar_txt').val('');
           $('#Pg_2_zar_txt').attr('disabled', true);
           OBPager.SetTaskContentMemberValue('PersonalData.Zarnumber', null, $('#Pg_2_zar_txt').val(), false);
       }

       //       var permitTypeVal = JSON.parse(OBPager.strFormDetails).PersonalData.Permittype;
       //       if (permitTypeVal == 'C') {

       //           $('.clsPermitType').each(function () {
       //               clsObj = $(this).attr('id');
       //               var cla = $('#' + clsObj);
       //               cla.attr('disabled', true);


       //           });

       //       }
       //       else {
       //           
       //           $('.clsPermitType').each(function () {
       //               clsObj = $(this).attr('id');
       //               var cla = $('#' + clsObj);
       //               cla.removeAttr('disabled');

       //           });
       //       }






       //Prefill the values at the first time when task not even saved 
       if (OBPager.taskStatusFlag == " -1") {
           // Set member value manually

           // OBPager.SetTaskContentMemberValue('PersonalData.AssociateId', null, TaskPrefillValues.PrefillValues.Set1.EMployyeId, false);
           OBPager.SetTaskContentMemberValue('PersonalData.DOB', null, TaskPrefillValues.PrefillValues.Set1.DateOfBirth, false);
           //OBPager.SetTaskContentMemberValue('PersonalData.AssociateId',1, TaskPrefillValues.PrefillValues.Set1.CandidateId, true);
           OBPager.SetTaskContentMemberValue('PersonalData.FirstName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
           OBPager.SetTaskContentMemberValue('PersonalData.LastName', null, TaskPrefillValues.PrefillValues.Set1.SurName, false);
           OBPager.SetTaskContentMemberValue('PersonalData.Gender', null, TaskPrefillValues.PrefillValues.Set1.Gender, false);
           //OBPager.SetTaskContentMemberValue('PersonalData.MobilePhone',null, TaskPrefillValues.PrefillValues.Set1.MobilePhone, false);
           OBPager.SetTaskContentMemberValue('PersonalData.Maritalstatus', null, TaskPrefillValues.PrefillValues.Set1.MaritalStatus, true);
           OBPager.SetTaskContentMemberValue('PersonalData.PassportName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
           OBPager.SetTaskContentMemberValue('PersonalData.PassportMiddleName', null, TaskPrefillValues.PrefillValues.Set1.MiddleName, false);
           OBPager.SetTaskContentMemberValue('PersonalData.PassportLastName', null, TaskPrefillValues.PrefillValues.Set1.SurName, false);

           OBPager.SetTaskContentMemberValue('PersonalData.PermanentAddressLine1', null, TaskPrefillValues.PrefillValues.Set1.PAddress1, false);
           OBPager.SetTaskContentMemberValue('PersonalData.PermanentAddressLine2', null, TaskPrefillValues.PrefillValues.Set1.PAddress2, false);
           OBPager.SetTaskContentMemberValue('PersonalData.PermanentCity', null, TaskPrefillValues.PrefillValues.Set1.City, false);
           OBPager.SetTaskContentMemberValue('PersonalData.PermanentPinCode', null, TaskPrefillValues.PrefillValues.Set1.PinCode, false);
           OBPager.SetTaskContentMemberValue('PersonalData.PermanentCountry', null, TaskPrefillValues.PrefillValues.Set1.Country, false);
           OBPager.SetTaskContentMemberValue('PersonalData.HomePhone', null, TaskPrefillValues.PrefillValues.Set1.HomePhone, false);
           OBPager.SetTaskContentMemberValue('PersonalData.MobilePhone', null, TaskPrefillValues.PrefillValues.Set1.MobilePhone, false);
           OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactName', null, TaskPrefillValues.PrefillValues.Set1.EmergencyName, false);
           OBPager.SetTaskContentMemberValue('PersonalData.EmergencyTelephone', null, TaskPrefillValues.PrefillValues.Set1.EmergencyPhone, false);
           OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactRelationship', null, TaskPrefillValues.PrefillValues.Set1.EmergencyRelation, false);
           OBPager.SetTaskContentMemberValue('PersonalData.AssociateId', null, TaskPrefillValues.PrefillValues.Set1.EMployyeId, false);
           OBPager.SetTaskContentMemberValue('PersonalData.EmployeeName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);

       }


       //Do a data bind finally
       jQXB.doBind(OBPager.taskContentDSName);

   });

function ChkPemanentAddress() {
    if ($("#chkpermAddress_form").is(':checked')) {
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentAddressLine1', null, $('#Pg_1_text_PAddress1').val(), false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentAddressLine2', null, $('#Pg_1_text_PAddress2').val(), false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentCity', null, $('#Pg_1_text_PCity').val(), false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentPinCode', null, $('#Pg_1_text_PZipcode').val(), false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentCountry', null, $('#Pg_1_text_CurrentCountry').val(), false);

        OBPager.SetTaskContentMemberValue('PersonalData.IsSameCurrPermAddress', 1, '1', false);



    }
    else {
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentAddressLine1', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentAddressLine2', null, '', false);

        OBPager.SetTaskContentMemberValue('PersonalData.CurrentCity', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.CZipcode', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentPinCode', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentCountry', null, '', false);
        $('#Pg_1_text_Country').val('-1'); 
        OBPager.SetTaskContentMemberValue('PersonalData.IsSameCurrPermAddress', 1, '', false);


    }
    jQXB.doBind(OBPager.taskContentDSName);

}



    function RestrictCharCount(fieldID, max) {

        // if the length of the string in the input field is greater than the max value, trim it 
        var field = this.document.getElementById(fieldID);

        if (field.value.length > max)
            field.value = field.value.substring(0, max);
    }


    function Insurance() {

    var CEYes;
    CEYes = TaskPrefillValues.PrefillValues.Set1.CEYes
    if ($('#Pg_1_HealthInsurance_ddl').val() == CEYes) {

        $('#IfNo').attr('disabled', false);
        $('#Pg_1_nameofswisshealthins_tb').removeAttr('disabled').addClass('Alphanumeric');
        OBPager.SetTaskContentMemberValue('PersonalData.SwissHealthInsurance', null, $('#Pg_1_HealthInsurance_ddl').val(), false);
        document.getElementById('Pg_1_nameofswisshealthins_tb').value = '';
        //FOBPager.SetTaskContentMemberValue('PersonalData.PermanentCountry', null, $('#Pg_1_nameofswisshealthins_tb').val(), false);

    }
    else {
        $('#IfNo').attr('disabled', true);
        $('#Pg_1_nameofswisshealthins_tb').attr("disabled", "true").removeClass('Alphanumeric');

      //  OBPager.SetTaskContentMemberValue('PersonalData.SwissHealthInsurance', null, 'N', true);
        OBPager.SetTaskContentMemberValue('PersonalData.SwissHealthInsurance', null, $('#Pg_1_HealthInsurance_ddl').val(), false);

        $('#Pg_1_nameofswisshealthins_tb').val('');
    //    document.getElementById("Pg_1_nameofswisshealthins_tb").value = '';
        OBPager.SetTaskContentMemberValue('PersonalData.NameofSwissHealthInsurance', null, $('#Pg_1_nameofswisshealthins_tb').val(), false);
    }
}

function countryhide() {

    var CECountryID;
    CECountryID = TaskPrefillValues.PrefillValues.Set1.CECountryID
    if ($('#Pg_1_Nationality').val() == CECountryID) {
        $('#Non_Swiz').hide();
    }
    else {
        $('#Non_Swiz').show();
    }
}


function Country() {

    var CECountryID;
    CECountryID = TaskPrefillValues.PrefillValues.Set1.CECountryID
    if ($('#Pg_2_Country_ddl').val() == CECountryID) {

        $('#Pg_2_Typeofpermitofspouse_txt').removeAttr('disabled').addClass('dropdown');

    }
    else {

        $('#Pg_2_Typeofpermitofspouse_txt').attr("disabled", "true").removeClass('dropdown');
        $('#Pg_2_Typeofpermitofspouse_txt').val('-1');
        OBPager.SetTaskContentMemberValue('PersonalData.TypeofPermitofSpouse', null, $('#Pg_2_Typeofpermitofspouse_txt').val(), false);

    }
}


function showhide() {

    var CEYes;
    CEYes = TaskPrefillValues.PrefillValues.Set1.CEYes

    var CENo;
    CENo = TaskPrefillValues.PrefillValues.Set1.CENo

    if ($('#Pg_2_EmployeInfo_ddl').val() == CENo) {
         $('#Pg_2_Employer_list').hide();
         $('#Pg_2_Volumelist').hide();
         $('#Pg_2_Salarylist').hide();
         $('#Pg_2_AHVNO').hide();
     }
    else if ($('#Pg_2_EmployeInfo_ddl').val() == CEYes) {
        $('#Pg_2_Employer_list').show();
        $('#Pg_2_Volumelist').show();
        $('#Pg_2_Salarylist').show();
        $('#Pg_2_AHVNO').show();
    }

}

//function marritalstatus() {
//    if ($('#Pg_1_maritalstatus_ddl').val() == '1' || $('#Pg_1_maritalstatus_ddl').val() == '6' || $('#Pg_1_maritalstatus_ddl').val() == '9') {
//        $('#Pg_2_Nationalityofspouse_txt').attr('disabled', true).removeClass('dropdown');
//        OBPager.SetTaskContentMemberValue('PersonalData.NationalityofSpouse', null, '', true);
//        $('#Pg_2_Nationalityofspouse_txt').val('-1');
//        $('#Pg_2_Country_ddl').attr('disabled', true).removeClass('dropdown');
//        OBPager.SetTaskContentMemberValue('PersonalData.Countryofspouse', null, '', true);
//        $('#Pg_2_Country_ddl').val('-1');
//        $('#Pg_2_EmployeInfo_ddl').attr('disabled', true).removeClass('dropdown');
//        OBPager.SetTaskContentMemberValue('PersonalData.Working', null, '', true);
//        $('#Pg_2_EmployeInfo_ddl').val('-1');
//    }
//    else {
//        $('#Pg_2_Nationalityofspouse_txt').attr('disabled', false);
//        $('#Pg_2_Country_ddl').attr('disabled', false);
//        $('#Pg_2_EmployeInfo_ddl').attr('disabled', false);
//    }

//}

//function Countrylist() {
//    if ($('#Pg_2_country_txt').val() == '45') {

//        $('#Pg_2_EmployerName_list').attr('disabled', false);
//        $('#Pg_2_employer_txt').removeAttr('disabled').addClass('onlyAlphanumeric');
//        $('#Pg_2_Volume_list').attr('disabled', false);
//        $('#Pg_2_volumeofwork_txt').removeAttr('disabled').addClass('OnlyNumeric');
//        $('#Pg_2_Salary_list').attr('disabled', false);
//        $('#Pg_2_salry_txt').removeAttr('disabled').addClass('Alphanumeric');
//        $('#Pg_2_AHV').attr('disabled', false);
//        $('pg_2_AHVNo_txt').removeAttr('disabled').addClass('AlphanumericOnly');
//    }
//    else {

//        $('#Pg_2_EmployerName_list').attr('disabled', true);
//        $('#Pg_2_employer_txt').attr("disabled", "true").removeClass('onlyAlphanumeric');
//        $('#Pg_2_Volume_list').attr('disabled', true);
//        $('#Pg_2_volumeofwork_txt').attr("disabled", "true").removeClass('OnlyNumeric');
//        $('#Pg_2_Salary_list').attr('disabled', true);
//        $('#Pg_2_salry_txt').attr("disabled", "true").removeClass('Alphanumeric');
//        $('#Pg_2_AHV').attr('disabled', false);
//        $('pg_2_AHVNo_txt').attr("disabled", "true").removeClass('AlphanumericOnly');
//    }
//}

//function Marital() {
//    if ($('#Pg_1_maritalstatus_ddl').val() == '2') {
//        $('#Pg_1_DOM_lbl').attr('disabled', false);
//        $('#Pg_2_CantonofResidence_list').attr('disabled', false);
//        $('#Pg_2_NumberofChildren_list').attr('disabled', false);
//        $('#Pg_2_Zar_list').attr('disabled', false);
//        $('#Pg_2_Permit_list').attr('disabled', false);
//        $('#Pg_2_dom_tb').removeAttr('disabled').addClass('jQrydatepicker');
//        $('#Pg_2_Cantonofresidence_txt').removeAttr('disabled').addClass('onlyAlphanumeric');
//        $('#Pg_2_Numberofchildren_txt').removeAttr('disabled').addClass('OnlyNumeric');
//        $('#Pg_2_zar_txt').removeAttr('disabled').addClass('onlyAlphanumeric');
//        $('#Pg_2_Permit_txt').removeAttr('disabled').addClass('dropdown');

//    }
//    else if ($('#Pg_1_maritalstatus_ddl').val() == '10') {
//        $('#Pg_1_DOM_lbl').attr('disabled', false);
//        $('#Pg_2_CantonofResidence_list').attr('disabled', false);
//        $('#Pg_2_NumberofChildren_list').attr('disabled', false);
//        $('#Pg_2_Zar_list').attr('disabled', false);
//        $('#Pg_2_Permit_list').attr('disabled', false);
//        $('#Pg_2_dom_tb').removeAttr('disabled').addClass('jQrydatepicker');
//        $('#Pg_2_Cantonofresidence_txt').removeAttr('disabled').addClass('onlyAlphanumeric');
//        $('#Pg_2_Numberofchildren_txt').removeAttr('disabled').addClass('OnlyNumeric');
//        $('#Pg_2_zar_txt').removeAttr('disabled').addClass('onlyAlphanumeric');
//        $('#Pg_2_Permit_txt').removeAttr('disabled').addClass('dropdown');
//    }
//    else if ($('#Pg_1_maritalstatus_ddl').val() == '1') {
//        $('#Pg_1_DOM_lbl').attr('disabled', true);
//        $('#Pg_2_CantonofResidence_list').attr('disabled', true);
//        $('#Pg_2_NumberofChildren_list').attr('disabled', false);
//        $('#Pg_2_Zar_list').attr('disabled', true);
//        $('#Pg_2_Permit_list').attr('disabled', true);
//        $('#Pg_2_dom_tb').attr("disabled", "true").removeClass('jQrydatepicker');
//        $('#Pg_2_Cantonofresidence_txt').attr("disabled", "true").removeClass('onlyAlphanumeric');
//        $('#Pg_2_Numberofchildren_txt').removeAttr('disabled').addClass('OnlyNumeric');
//        $('#Pg_2_zar_txt').attr("disabled", "true").removeClass('onlyAlphanumeric');
//        $('#Pg_2_Permit_txt').attr("disabled", "true").removeClass('dropdown');
//        $('#Pg_2_dom_tb').val('');
//        $('#Pg_2_Cantonofresidence_txt').val('');
//        $('#Pg_2_zar_txt').val('');
//        $('#Pg_2_Permit_txt').val('-1');
//        OBPager.SetTaskContentMemberValue('PersonalData.DOM', null, $('#Pg_2_dom_tb').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.CantonofResidence', null, $('#Pg_2_Cantonofresidence_txt').val(), false);
//        //OBPager.SetTaskContentMemberValue('PersonalData.NumberofChildren', null, $('#Pg_2_Numberofchildren_txt').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.Zarnumber', null, $('#Pg_2_zar_txt').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.Permitlist', null, $('#Pg_2_Permit_txt').val(), false);
//         }
//    else if ($('#Pg_1_maritalstatus_ddl').val() == '3') {
//        $('#Pg_1_DOM_lbl').attr('disabled', true);
//        $('#Pg_2_CantonofResidence_list').attr('disabled', true);
//        $('#Pg_2_NumberofChildren_list').attr('disabled', false);
//        $('#Pg_2_Zar_list').attr('disabled', true);
//        $('#Pg_2_Permit_list').attr('disabled', true);
//        $('#Pg_2_dom_tb').attr("disabled", "true").removeClass('jQrydatepicker');
//        $('#Pg_2_Cantonofresidence_txt').attr("disabled", "true").removeClass('onlyAlphanumeric');
//        $('#Pg_2_Numberofchildren_txt').removeAttr('disabled').addClass('OnlyNumeric');
//        $('#Pg_2_zar_txt').attr("disabled", "true").removeClass('onlyAlphanumeric');
//        $('#Pg_2_Permit_txt').attr("disabled", "true").removeClass('dropdown');
//        $('#Pg_2_dom_tb').val('');
//        $('#Pg_2_Cantonofresidence_txt').val('');
//        $('#Pg_2_zar_txt').val('');
//        $('#Pg_2_Permit_txt').val('-1');
//        OBPager.SetTaskContentMemberValue('PersonalData.DOM', null, $('#Pg_2_dom_tb').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.CantonofResidence', null, $('#Pg_2_Cantonofresidence_txt').val(), false);
//        //OBPager.SetTaskContentMemberValue('PersonalData.NumberofChildren', null, $('#Pg_2_Numberofchildren_txt').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.Zarnumber', null, $('#Pg_2_zar_txt').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.Permitlist', null, $('#Pg_2_Permit_txt').val(), false);
//    }
//    else if ($('#Pg_1_maritalstatus_ddl').val() == '4') {
//        $('#Pg_1_DOM_lbl').attr('disabled', true);
//        $('#Pg_2_CantonofResidence_list').attr('disabled', true);
//        $('#Pg_2_NumberofChildren_list').attr('disabled', false);
//        $('#Pg_2_Zar_list').attr('disabled', true);
//        $('#Pg_2_Permit_list').attr('disabled', true);
//        $('#Pg_2_dom_tb').attr("disabled", "true").removeClass('jQrydatepicker');
//        $('#Pg_2_Cantonofresidence_txt').attr("disabled", "true").removeClass('onlyAlphanumeric');
//        $('#Pg_2_Numberofchildren_txt').removeAttr('disabled').addClass('OnlyNumeric');
//        $('#Pg_2_zar_txt').attr("disabled", "true").removeClass('onlyAlphanumeric');
//        $('#Pg_2_Permit_txt').attr("disabled", "true").removeClass('dropdown');
//        $('#Pg_2_dom_tb').val('');
//        $('#Pg_2_Cantonofresidence_txt').val('');
//        $('#Pg_2_zar_txt').val('');
//        $('#Pg_2_Permit_txt').val('-1');
//        OBPager.SetTaskContentMemberValue('PersonalData.DOM', null, $('#Pg_2_dom_tb').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.CantonofResidence', null, $('#Pg_2_Cantonofresidence_txt').val(), false);
//        //OBPager.SetTaskContentMemberValue('PersonalData.NumberofChildren', null, $('#Pg_2_Numberofchildren_txt').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.Zarnumber', null, $('#Pg_2_zar_txt').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.Permitlist', null, $('#Pg_2_Permit_txt').val(), false);
//    }
//    else if ($('#Pg_1_maritalstatus_ddl').val() == '5') {
//        $('#Pg_1_DOM_lbl').attr('disabled', true);
//        $('#Pg_2_CantonofResidence_list').attr('disabled', true);
//        $('#Pg_2_NumberofChildren_list').attr('disabled', false);
//        $('#Pg_2_Zar_list').attr('disabled', true);
//        $('#Pg_2_Permit_list').attr('disabled', true);
//        $('#Pg_2_dom_tb').attr("disabled", "true").removeClass('jQrydatepicker');
//        $('#Pg_2_Cantonofresidence_txt').attr("disabled", "true").removeClass('onlyAlphanumeric');
//        $('#Pg_2_Numberofchildren_txt').removeAttr('disabled').addClass('OnlyNumeric');
//        $('#Pg_2_zar_txt').attr("disabled", "true").removeClass('onlyAlphanumeric');
//        $('#Pg_2_Permit_txt').attr("disabled", "true").removeClass('dropdown');
//        $('#Pg_2_dom_tb').val('');
//        $('#Pg_2_Cantonofresidence_txt').val('');
//        $('#Pg_2_zar_txt').val('');
//        $('#Pg_2_Permit_txt').val('-1');
//        OBPager.SetTaskContentMemberValue('PersonalData.DOM', null, $('#Pg_2_dom_tb').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.CantonofResidence', null, $('#Pg_2_Cantonofresidence_txt').val(), false);
//        //OBPager.SetTaskContentMemberValue('PersonalData.NumberofChildren', null, $('#Pg_2_Numberofchildren_txt').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.Zarnumber', null, $('#Pg_2_zar_txt').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.Permitlist', null, $('#Pg_2_Permit_txt').val(), false);
//    }
//    else if ($('#Pg_1_maritalstatus_ddl').val() == '6') {
//        $('#Pg_1_DOM_lbl').attr('disabled', true);
//        $('#Pg_2_CantonofResidence_list').attr('disabled', true);
//        $('#Pg_2_NumberofChildren_list').attr('disabled', false);
//        $('#Pg_2_Zar_list').attr('disabled', true);
//        $('#Pg_2_Permit_list').attr('disabled', true);
//        $('#Pg_2_dom_tb').attr("disabled", "true").removeClass('jQrydatepicker');
//        $('#Pg_2_Cantonofresidence_txt').attr("disabled", "true").removeClass('onlyAlphanumeric');
//        $('#Pg_2_Numberofchildren_txt').removeAttr('disabled').addClass('OnlyNumeric');
//        $('#Pg_2_zar_txt').attr("disabled", "true").removeClass('onlyAlphanumeric');
//        $('#Pg_2_Permit_txt').attr("disabled", "true").removeClass('dropdown');
//        $('#Pg_2_dom_tb').val('');
//        $('#Pg_2_Cantonofresidence_txt').val('');
//        $('#Pg_2_zar_txt').val('');
//        $('#Pg_2_Permit_txt').val('-1');
//        OBPager.SetTaskContentMemberValue('PersonalData.DOM', null, $('#Pg_2_dom_tb').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.CantonofResidence', null, $('#Pg_2_Cantonofresidence_txt').val(), false);
//        //OBPager.SetTaskContentMemberValue('PersonalData.NumberofChildren', null, $('#Pg_2_Numberofchildren_txt').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.Zarnumber', null, $('#Pg_2_zar_txt').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.Permitlist', null, $('#Pg_2_Permit_txt').val(), false);
//    }
//    else if ($('#Pg_1_maritalstatus_ddl').val() == '7') {
//        $('#Pg_1_DOM_lbl').attr('disabled', true);
//        $('#Pg_2_CantonofResidence_list').attr('disabled', true);
//        $('#Pg_2_NumberofChildren_list').attr('disabled', false);
//        $('#Pg_2_Zar_list').attr('disabled', true);
//        $('#Pg_2_Permit_list').attr('disabled', true);
//        $('#Pg_2_dom_tb').attr("disabled", "true").removeClass('jQrydatepicker');
//        $('#Pg_2_Cantonofresidence_txt').attr("disabled", "true").removeClass('onlyAlphanumeric');
//        $('#Pg_2_Numberofchildren_txt').removeAttr('disabled').addClass('OnlyNumeric');
//        $('#Pg_2_zar_txt').attr("disabled", "true").removeClass('onlyAlphanumeric');
//        $('#Pg_2_Permit_txt').attr("disabled", "true").removeClass('dropdown');
//        $('#Pg_2_dom_tb').val('');
//        $('#Pg_2_Cantonofresidence_txt').val('');
//        $('#Pg_2_zar_txt').val('');
//        $('#Pg_2_Permit_txt').val('-1');
//        OBPager.SetTaskContentMemberValue('PersonalData.DOM', null, $('#Pg_2_dom_tb').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.CantonofResidence', null, $('#Pg_2_Cantonofresidence_txt').val(), false);
//        //OBPager.SetTaskContentMemberValue('PersonalData.NumberofChildren', null, $('#Pg_2_Numberofchildren_txt').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.Zarnumber', null, $('#Pg_2_zar_txt').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.Permitlist', null, $('#Pg_2_Permit_txt').val(), false);
//    }
//    else if ($('#Pg_1_maritalstatus_ddl').val() == '8') {
//        $('#Pg_1_DOM_lbl').attr('disabled', true);
//        $('#Pg_2_CantonofResidence_list').attr('disabled', true);
//        $('#Pg_2_NumberofChildren_list').attr('disabled', false);
//        $('#Pg_2_Zar_list').attr('disabled', true);
//        $('#Pg_2_Permit_list').attr('disabled', true);
//        $('#Pg_2_dom_tb').attr("disabled", "true").removeClass('jQrydatepicker');
//        $('#Pg_2_Cantonofresidence_txt').attr("disabled", "true").removeClass('onlyAlphanumeric');
//        $('#Pg_2_Numberofchildren_txt').removeAttr('disabled').addClass('OnlyNumeric');
//        $('#Pg_2_zar_txt').attr("disabled", "true").removeClass('onlyAlphanumeric');
//        $('#Pg_2_Permit_txt').attr("disabled", "true").removeClass('dropdown');
//        $('#Pg_2_dom_tb').val('');
//        $('#Pg_2_Cantonofresidence_txt').val('');
//        $('#Pg_2_zar_txt').val('');
//        $('#Pg_2_Permit_txt').val('-1');
//        OBPager.SetTaskContentMemberValue('PersonalData.DOM', null, $('#Pg_2_dom_tb').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.CantonofResidence', null, $('#Pg_2_Cantonofresidence_txt').val(), false);
//        //OBPager.SetTaskContentMemberValue('PersonalData.NumberofChildren', null, $('#Pg_2_Numberofchildren_txt').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.Zarnumber', null, $('#Pg_2_zar_txt').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.Permitlist', null, $('#Pg_2_Permit_txt').val(), false);
//    }
//    else if ($('#Pg_1_maritalstatus_ddl').val() == '9') {
//        $('#Pg_1_DOM_lbl').attr('disabled', true);
//        $('#Pg_2_CantonofResidence_list').attr('disabled', true);
//        $('#Pg_2_NumberofChildren_list').attr('disabled', false);
//        $('#Pg_2_Zar_list').attr('disabled', true);
//        $('#Pg_2_Permit_list').attr('disabled', true);
//        $('#Pg_2_dom_tb').attr("disabled", "true").removeClass('jQrydatepicker');
//        $('#Pg_2_Cantonofresidence_txt').attr("disabled", "true").removeClass('onlyAlphanumeric');
//        $('#Pg_2_Numberofchildren_txt').removeAttr('disabled').addClass('OnlyNumeric');
//        $('#Pg_2_zar_txt').attr("disabled", "true").removeClass('onlyAlphanumeric');
//        $('#Pg_2_Permit_txt').attr("disabled", "true").removeClass('dropdown');
//        $('#Pg_2_dom_tb').val('');
//        $('#Pg_2_Cantonofresidence_txt').val('');
//        $('#Pg_2_zar_txt').val('');
//        $('#Pg_2_Permit_txt').val('-1');
//        OBPager.SetTaskContentMemberValue('PersonalData.DOM', null, $('#Pg_2_dom_tb').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.CantonofResidence', null, $('#Pg_2_Cantonofresidence_txt').val(), false);
//        //OBPager.SetTaskContentMemberValue('PersonalData.NumberofChildren', null, $('#Pg_2_Numberofchildren_txt').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.Zarnumber', null, $('#Pg_2_zar_txt').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.Permitlist', null, $('#Pg_2_Permit_txt').val(), false);
//    }
//    else if ($('#Pg_1_maritalstatus_ddl').val() == '11') {
//        $('#Pg_1_DOM_lbl').attr('disabled', true);
//        $('#Pg_2_CantonofResidence_list').attr('disabled', true);
//        $('#Pg_2_NumberofChildren_list').attr('disabled', false);
//        $('#Pg_2_Zar_list').attr('disabled', true);
//        $('#Pg_2_Permit_list').attr('disabled', true);
//        $('#Pg_2_dom_tb').attr("disabled", "true").removeClass('jQrydatepicker');
//        $('#Pg_2_Cantonofresidence_txt').attr("disabled", "true").removeClass('onlyAlphanumeric');
//        $('#Pg_2_Numberofchildren_txt').removeAttr('disabled').addClass('OnlyNumeric');
//        $('#Pg_2_zar_txt').attr("disabled", "true").removeClass('onlyAlphanumeric');
//        $('#Pg_2_Permit_txt').attr("disabled", "true").removeClass('dropdown');
//        $('#Pg_2_dom_tb').val('');
//        $('#Pg_2_Cantonofresidence_txt').val('');
//        $('#Pg_2_zar_txt').val('');
//        $('#Pg_2_Permit_txt').val('-1');
//        OBPager.SetTaskContentMemberValue('PersonalData.DOM', null, $('#Pg_2_dom_tb').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.CantonofResidence', null, $('#Pg_2_Cantonofresidence_txt').val(), false);
//        //OBPager.SetTaskContentMemberValue('PersonalData.NumberofChildren', null, $('#Pg_2_Numberofchildren_txt').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.Zarnumber', null, $('#Pg_2_zar_txt').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.Permitlist', null, $('#Pg_2_Permit_txt').val(), false);
//    }
//    else if ($('#Pg_1_maritalstatus_ddl').val() == '12') {
//        $('#Pg_1_DOM_lbl').attr('disabled', true);
//        $('#Pg_2_CantonofResidence_list').attr('disabled', true);
//        $('#Pg_2_NumberofChildren_list').attr('disabled', false);
//        $('#Pg_2_Zar_list').attr('disabled', true);
//        $('#Pg_2_Permit_list').attr('disabled', true);
//        $('#Pg_2_dom_tb').attr("disabled", "true").removeClass('jQrydatepicker');
//        $('#Pg_2_Cantonofresidence_txt').attr("disabled", "true").removeClass('onlyAlphanumeric');
//        $('#Pg_2_Numberofchildren_txt').removeAttr('disabled').addClass('OnlyNumeric');
//        $('#Pg_2_zar_txt').attr("disabled", "true").removeClass('onlyAlphanumeric');
//        $('#Pg_2_Permit_txt').attr("disabled", "true").removeClass('dropdown');
//        $('#Pg_2_dom_tb').val('');
//        $('#Pg_2_Cantonofresidence_txt').val('');
//        $('#Pg_2_zar_txt').val('');
//        $('#Pg_2_Permit_txt').val('-1');
//        OBPager.SetTaskContentMemberValue('PersonalData.DOM', null, $('#Pg_2_dom_tb').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.CantonofResidence', null, $('#Pg_2_Cantonofresidence_txt').val(), false);
//        //OBPager.SetTaskContentMemberValue('PersonalData.NumberofChildren', null, $('#Pg_2_Numberofchildren_txt').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.Zarnumber', null, $('#Pg_2_zar_txt').val(), false);
//        OBPager.SetTaskContentMemberValue('PersonalData.Permitlist', null, $('#Pg_2_Permit_txt').val(), false);
//    }


//}

function EmployeeInfo() {

    var CEYes;
    CEYes = TaskPrefillValues.PrefillValues.Set1.CEYes

    if ($('#Pg_2_EmployeInfo_ddl').val() == CEYes) {
                $('#Pg_2_EmployerName_list').attr('disabled', false);
                $('#Pg_2_employer_txt').removeAttr('disabled').addClass('onlyAlphanumeric');
                $('#Pg_2_employer_txt').removeAttr('disabled').addClass('textMandatory');
                $('#Pg_2_Volume_list').attr('disabled', false);
                $('#Pg_2_volumeofwork_txt').removeAttr('disabled').addClass('OnlyNumeric');
                $('#Pg_2_volumeofwork_txt').removeAttr('disabled').addClass('textMandatory');
                $('#Pg_2_Salary_list').attr('disabled', false);
                $('#Pg_2_salry_txt').removeAttr('disabled').addClass('Alphanumeric');
                $('#Pg_2_salry_txt').removeAttr('disabled').addClass('textMandatory');
                $('#Pg_2_AHV').attr('disabled', false);
                $('#pg_2_AHVNo_txt').removeAttr('disabled').addClass('AlphanumericOnly');
                $('#pg_2_AHVNo_txt').removeAttr('disabled').addClass('textMandatory');
    }
                else {

                    $('#Pg_2_EmployerName_list').attr('disabled', true);
                    $('#Pg_2_employer_txt').attr("disabled", "true").removeClass('onlyAlphanumeric');
                    $('#Pg_2_Volume_list').attr('disabled', true);
                    $('#Pg_2_volumeofwork_txt').attr("disabled", "true").removeClass('OnlyNumeric');
                    $('#Pg_2_Salary_list').attr('disabled', true);
                    $('#Pg_2_salry_txt').attr("disabled", "true").removeClass('Alphanumeric');
                    $('#Pg_2_AHV').attr('disabled', true);
                    $('#pg_2_AHVNo_txt').attr("disabled", "true").removeClass('AlphanumericOnly');
//                    $('#Pg_2_employer_txt').val('');
//                    $('#Pg_2_volumeofwork_txt').val('');
//                    $('#Pg_2_salry_txt').val('');
//                    $('#pg_2_AHVNo_txt').val('');
//                    OBPager.SetTaskContentMemberValue('PersonalData.EmployerName', null, $('#Pg_2_employer_txt').val(), false);
//                    OBPager.SetTaskContentMemberValue('PersonalData.VolumeofWork', null, $('#Pg_2_volumeofwork_txt').val(), false);
//                    OBPager.SetTaskContentMemberValue('PersonalData.BaseSalary', null, $('#Pg_2_salry_txt').val(), false);
//                    OBPager.SetTaskContentMemberValue('PersonalData.AHVNo', null, $('#pg_2_AHVNo_txt').val(), false);
               
                }
}




function PermitType() {

    var CEPermitType;
    CEPermitType = TaskPrefillValues.PrefillValues.Set1.CEPermitType
    if ($('#Pg_2_Permittype_ddl').val() == CEPermitType) {
            $('#Non_Swiz').hide();
        }
        else {
            $('#Non_Swiz').show();
        }

    }

    function Nationality() {

    var CECountryID;
    CECountryID = TaskPrefillValues.PrefillValues.Set1.CECountryID

    if ($('#Pg_1_Nationality').val() == CECountryID) {
        $('#switz_permit').attr('disabled', true);
        $('#Pg_2_Permittype_ddl').attr('disabled', true);
       // $('#Pg_1_DOM_lbl').attr('disabled', true);
        $('#Pg_2_CantonofResidence_list').attr('disabled', true);
        $('#Pg_2_NumberofChildren_list').attr('disabled', true);
        $('#Pg_2_Zar_list').attr('disabled', true);
        $('#Pg_2_Permit_list').attr('disabled', true);
        //$('#Pg_2_dom_tb').attr("disabled", "true").removeClass('jQrydatepicker');
        $('#Pg_2_Cantonofresidence_txt').attr("disabled", "true").removeClass('onlyAlphanumeric');
        $('#Pg_2_Numberofchildren_txt').attr("disabled", "true").removeClass('OnlyNumeric');
        $('#Pg_2_zar_txt').attr("disabled", "true").removeClass('onlyAlphanumeric');
        $('#Pg_2_Permit_txt').attr("disabled", "true").removeClass('dropdown');
        $('#Pg_2_Permittype_ddl').attr("disabled", "true").removeClass('dropdown');
        $('#Pg_2_Permittype_ddl').val('-1');
        OBPager.SetTaskContentMemberValue('PersonalData.Permittype', null, $('#Pg_2_Permittype_ddl').val(), false);
    }
    else {
        //$('#Pg_1_DOM_lbl').attr('disabled', false);
        $('#switz_permit').attr('disabled', false);
        $('#Pg_2_Permittype_ddl').attr('disabled', false);
        $('#Pg_2_CantonofResidence_list').attr('disabled', false);
        $('#Pg_2_NumberofChildren_list').attr('disabled', false);
        $('#Pg_2_Zar_list').attr('disabled', false);
        $('#Pg_2_Permit_list').attr('disabled', false);
        //$('#Pg_2_dom_tb').removeAttr('disabled').addClass('jQrydatepicker');
        $('#Pg_2_Cantonofresidence_txt').removeAttr('disabled').addClass('onlyAlphanumeric');
        $('#Pg_2_Numberofchildren_txt').removeAttr('disabled').addClass('OnlyNumeric');
        $('#Pg_2_zar_txt').removeAttr('disabled').addClass('onlyAlphanumeric');
        $('#Pg_2_Permit_txt').removeAttr('disabled');
        $('#Pg_2_Permittype_ddl').removeAttr('disabled').addClass('dropdown');
       

    }
}
 


         
           function countryofspouse(flag)
           {
               if (flag==1){
                   OBPager.SetTaskContentMemberValue('PersonalData.Countryofspouse', null, $('#Pg_2_Country_ddl').val(), true);
               }
               else{
                   OBPager.SetTaskContentMemberValue('PersonalData.Countryofspouse', null, -1, true);
               }
           }


           $(function () {
               $(".jQrydatepicker").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar',
                   yearRange: "-62:+0",
                   maxDate: "0",
                   showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
               });

               $(".jQryDOB").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar',
                   yearRange: "-115:+0",
                   maxDate: "0",
                   showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
               });

               $(".jQryExpdate").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar',
                   yearRange: "-0:+28",
                   minDate: "0",
                   showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
               });
           });





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

    function ResetTaskData() {
        OBPager.ResetTaskContent();
        if (OBPager.taskStatusFlag == -1) {

        //OBPager.SetTaskContentMemberValue('PersonalData.AssociateId', null, TaskPrefillValues.PrefillValues.Set1.EMployyeId, false);
        OBPager.SetTaskContentMemberValue('PersonalData.DOB', null, TaskPrefillValues.PrefillValues.Set1.DateOfBirth, false);
        OBPager.SetTaskContentMemberValue('PersonalData.FirstName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.LastName', null, TaskPrefillValues.PrefillValues.Set1.SurName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Gender', null, TaskPrefillValues.PrefillValues.Set1.Gender, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Maritalstatus', null, TaskPrefillValues.PrefillValues.Set1.Maritalstatus, false);
        
        OBPager.SetTaskContentMemberValue('PersonalData.PassportName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PassportMiddleName', null, TaskPrefillValues.PrefillValues.Set1.MiddleName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PassportLastName', null, TaskPrefillValues.PrefillValues.Set1.SurName, false);

        OBPager.SetTaskContentMemberValue('PersonalData.PermanentAddressLine1', null, TaskPrefillValues.PrefillValues.Set1.PAddress1, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentAddressLine2', null, TaskPrefillValues.PrefillValues.Set1.PAddress2, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentCity', null, TaskPrefillValues.PrefillValues.Set1.City, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentPinCode', null, TaskPrefillValues.PrefillValues.Set1.PinCode, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentCountry', null, TaskPrefillValues.PrefillValues.Set1.Country, false);
        OBPager.SetTaskContentMemberValue('PersonalData.HomePhone', null, TaskPrefillValues.PrefillValues.Set1.HomePhone, false);
        OBPager.SetTaskContentMemberValue('PersonalData.MobilePhone', null, TaskPrefillValues.PrefillValues.Set1.MobilePhone, false);
         //OBPager.SetTaskContentMemberValue('PersonalData.AssociateId', null, TaskPrefillValues.PrefillValues.Set1.EMployyeId, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactName', null, TaskPrefillValues.PrefillValues.Set1.EmergencyName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyTelephone', null, TaskPrefillValues.PrefillValues.Set1.EmergencyPhone, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactRelationship', null, TaskPrefillValues.PrefillValues.Set1.EmergencyRelation, false);

        OBPager.SetTaskContentMemberValue('PersonalData.EmployeeName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);

        $('#Pg_1_maritalstatus_ddl').val('-1');
        $('#Select2').val('-1');
        $('#Pg_1_Nationality').val('-1');
        $('#Pg_1_text_CurrentCountry').val('-1');
        $('#Pg_1_text_Country').val('-1');
        $('#Pg_2_text_RelationShip').val('-1');
        $('#PassportCountry').val('-1');
        $('#Pg_2_text_accounttype_form').val('-1');
        $('#Pg_2_text_Country_form').val('-1');
        $('#Pg_1_HealthInsurance_ddl').val('-1');
        $('#Pg_2_Permit_txt').val('-1');
        $('#Pg_2_Nationalityofspouse_txt').val('-1');
        $('#Pg_2_Country_ddl').val('-1');
        $('#Pg_2_Typeofpermitofspouse_txt').val('-1');
        $('#Pg_2_EmployeInfo_ddl').val('-1');
        $('#Pg_2_Permittype_ddl').val('-1');
        //$('#aaaaaa').val('-1');     
   
   
            
        }
    jQXB.doBind(OBPager.taskContentDSName);
//    $('#IfNo').attr('disabled', true);
    //    $('#Pg_1_nameofswisshealthins_tb').attr('disabled', true);

    var CEPermitType;
    CEPermitType = TaskPrefillValues.PrefillValues.Set1.CEPermitType

    var CEYes;
    CEYes = TaskPrefillValues.PrefillValues.Set1.CEYes

    var CENo;
    CENo = TaskPrefillValues.PrefillValues.Set1.CENo

    var CENilDropdown;
    CENilDropdown = TaskPrefillValues.PrefillValues.Set1.CENilDropdown

    if ($('#Pg_1_HealthInsurance_ddl').val() == CENilDropdown) {
       
        $('#Pg_1_nameofswisshealthins_tb').attr('disabled', true);
    }
    else {
        $('#Pg_1_nameofswisshealthins_tb').removeAttr('disabled');
    }

    if ($('#Pg_2_Permittype_ddl').val() == CEPermitType) {

        $('#Non_Swiz').hide();
    }
    else {
        $('#Non_Swiz').show();
    }

    if ($('#Pg_2_EmployeInfo_ddl').val() == CENo) {

        $('#Pg_2_Employer_list').hide();
        $('#Pg_2_Volumelist').hide();
        $('#Pg_2_Salarylist').hide();
        $('#Pg_2_AHVNO').hide();
    }
    else {
        $('#Pg_2_Employer_list').show();
        $('#Pg_2_Volumelist').show();
        $('#Pg_2_Salarylist').show();
        $('#Pg_2_AHVNO').show();
        $('#Pg_2_EmployerName_list').removeAttr('disabled');
        $('#Pg_2_employer_txt').removeAttr('disabled');
        $('#Pg_2_Volume_list').removeAttr('disabled');
        $('#Pg_2_volumeofwork_txt').removeAttr('disabled');
        $('#Pg_2_Salary_list').removeAttr('disabled');
        $('#Pg_2_salry_txt').removeAttr('disabled');
        $('#Pg_2_AHV').removeAttr('disabled');
        $('#pg_2_AHVNo_txt').removeAttr('disabled');
    }


    }
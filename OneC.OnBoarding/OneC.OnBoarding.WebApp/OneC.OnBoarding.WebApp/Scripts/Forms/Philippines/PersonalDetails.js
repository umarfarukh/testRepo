﻿$().ready(function () {
    OBPager.ShowPage(1);

    OBPager.GetEmployersDetails();
    OBPager.GetMaster(254, "PrefixList");
    OBPager.GetMaster(255, "SuffixList");
    OBPager.GetMaster(256, "MaritalList");
    OBPager.GetMaster(14, "GenderList");
    OBPager.GetMaster(253, "RelationshipList");
    OBPager.GetMaster(17, "BloodGroupList");
    OBPager.GetMaster(64, "SkillsRating");
    OBPager.GetMaster(229, "ExpertiseList");
    OBPager.GetMaster(136, "CertificaitonList");
    OBPager.GetGeographyMaster(1, 0, "CountryList");
    $('#currstate_form').attr("disabled", "true");
    $('#currcity_form').attr("disabled", "true");
    $('#OtherCurrentCity').hide();
    $('#OtherPermanentCity').hide();
    $('#OtherLongestStayCity').hide();
    $('#citizenship_form').attr("disabled", "true");
    $('#permstate_form').attr("disabled", "true");
    $('#permcity_form').attr("disabled", "true");
    $('#lngstystate_form').attr("disabled", "true");
    $('#lngstycity_form').attr("disabled", "true");
    //$('#lngstycity_form').attr("disabled", "true");
    $('#passportstate_form').attr("disabled", "true");
    $('#Language2').hide();
    $('#Language3').hide();
    $('#Language4').hide();
    $('#Language5').hide();
    //$('#Certification_Other').hide();




    var taskObj = JSON.parse(OBPager.strFormDetails).PersonalData;



    if (taskObj.SecondSkillsAvailability == 'true' || taskObj.SecondSkillsAvailability == '1') {
        $('#Language2').show();
        OBPager.SetTaskContentMemberValue('PersonalData.SecondSkillsAvailability', 1, 'true', false);
    }
    else {
        $('#Language2').hide();
        OBPager.SetTaskContentMemberValue('PersonalData.SecondSkillsAvailability', 1, '', false);
    }
    if (taskObj.ThirdSkillsAvailability == 'true' || taskObj.ThirdSkillsAvailability == '1') {
        $('#Language3').show();
        OBPager.SetTaskContentMemberValue('PersonalData.ThirdSkillsAvailability', 1, 'true', false);
    }
    else {
        $('#Language3').hide();
        OBPager.SetTaskContentMemberValue('PersonalData.ThirdSkillsAvailability', 1, '', false);
    }
    if (taskObj.FourthSkillsAvailability == 'true' || taskObj.FourthSkillsAvailability == '1') {
        $('#Language4').show();
        OBPager.SetTaskContentMemberValue('PersonalData.FourthSkillsAvailability', 1, 'true', false);
    }
    else {
        $('#Language4').hide();
        OBPager.SetTaskContentMemberValue('PersonalData.FourthSkillsAvailability', 1, '', false);
    }
    if (taskObj.FifthSkillsAvailability == 'true' || taskObj.FifthSkillsAvailability == '1') {
        $('#Language5').show();
        OBPager.SetTaskContentMemberValue('PersonalData.FifthSkillsAvailability', 1, 'true', false);
    }
    else {
        $('#Language5').hide();
        OBPager.SetTaskContentMemberValue('PersonalData.FifthSkillsAvailability', 1, '', false);
    }
    var CurrCity = taskObj.CurrentCity;
    if (CurrCity != null) {
        if (CurrCity == 'OTH') {
            $('#OtherCurrentCity').show();
        }
        else {
            $('#OtherCurrentCity').hide();
        }
    }


    PrePopulateValues();



    //Prefill the values at the first time when task not even saved 
    if (OBPager.taskStatusFlag == -1) {
        // Set member value manually
        OBPager.SetTaskContentMemberValue('PersonalData.CandidateId', null, TaskPrefillValues.PrefillValues.Set1.CandidateId, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Prefix', null, TaskPrefillValues.PrefillValues.Set1.Prefix, false);
        OBPager.SetTaskContentMemberValue('PersonalData.FirstName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.MiddleName', null, TaskPrefillValues.PrefillValues.Set1.MiddleName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.LastName', null, TaskPrefillValues.PrefillValues.Set1.LastName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.MaritalStatus', null, TaskPrefillValues.PrefillValues.Set1.MaritalStatus, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Gender', null, TaskPrefillValues.PrefillValues.Set1.Gender, false);
        OBPager.SetTaskContentMemberValue('PersonalData.DOB', null, TaskPrefillValues.PrefillValues.Set1.DateOfBirth, false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentAddress', null, TaskPrefillValues.PrefillValues.Set1.AddressDetails, false);
        //  OBPager.SetTaskContentMemberValue('PersonalData.CurrentCity', null, TaskPrefillValues.PrefillValues.Set1.City, false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentCountry', null, TaskPrefillValues.PrefillValues.Set1.Country, false);
        if (TaskPrefillValues.PrefillValues.Set1.Country != null || TaskPrefillValues.PrefillValues.Set1.Country != '-1' || TaskPrefillValues.PrefillValues.Set1.Country != '') {
            OBPager.GetGeographyMaster(2, TaskPrefillValues.PrefillValues.Set1.Country, "CurrStateList");

            OBPager.SetTaskContentMemberValue('PersonalData.CurrentState', null, TaskPrefillValues.PrefillValues.Set1.State, false);
            $('#currstate_form').removeAttr('disabled');
            OBPager.GetGeographyMaster(63, TaskPrefillValues.PrefillValues.Set1.Country, "CurrCityList");
            OBPager.SetTaskContentMemberValue('PersonalData.CurrentCity', null, TaskPrefillValues.PrefillValues.Set1.City, false);

            $('#currcity_form').removeAttr('disabled');

        }

        OBPager.SetTaskContentMemberValue('PersonalData.CurrentPinCode', null, TaskPrefillValues.PrefillValues.Set1.PostalCode, false);
        OBPager.SetTaskContentMemberValue('PersonalData.HomePh', null, TaskPrefillValues.PrefillValues.Set1.HomePhone, false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentDurationFrom', null, TaskPrefillValues.PrefillValues.Set1.DateOfBirth, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentDurationFrom', null, TaskPrefillValues.PrefillValues.Set1.DateOfBirth, false);
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayDurationFrom', null, TaskPrefillValues.PrefillValues.Set1.DateOfBirth, false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentDurationTo', null, TaskPrefillValues.PrefillValues.Set1.Currentdate, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Mobile', null, TaskPrefillValues.PrefillValues.Set1.MobilePhone, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Phone', null, TaskPrefillValues.PrefillValues.Set1.WorkPhone, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmailId', null, TaskPrefillValues.PrefillValues.Set1.PersonalEmail, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactName', null, TaskPrefillValues.PrefillValues.Set1.ECName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactNo', null, TaskPrefillValues.PrefillValues.Set1.EmergencyPhone, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactRelationship', null, TaskPrefillValues.PrefillValues.Set1.Relationship, false);
        $('#currothervalue_form').hide();
        $('#Language2').hide();
        $('#Language3').hide();
        $('#Language4').hide();
        $('#Language5').hide();
        $('#OtherCurrentCity').hide();
        //$('#Certification_Other').hide();
    }

    //Do a data bind finally

    jQXB.doBind(OBPager.taskContentDSName);

    $('#currcountry_form').change(function () {
        var currstateId = $('#currcountry_form').val();
        if (currstateId != -1) {

            $('#currstate_form').removeAttr('disabled');
            $('#currcity_form').removeAttr('disabled');
            $("#currcity_form").val("-1");
            OBPager.SetTaskContentMemberValue('PersonalData.CurrentCity', null, $("#currcity_form").value, false);
            OBPager.GetGeographyMaster(2, currstateId, "CurrStateList");
            OBPager.GetGeographyMaster(63, currstateId, "CurrCityList");
            $('#OtherCurrentCity').hide();
        }

    });

    //    $('#currstate_form').change(function () {
    //        var currstateid = $('#currstate_form').val();
    //        var currcountryId = $('#currcountry_form').val();
    //        if (currstateid != -1) {
    //            $('#currcity_form').removeAttr('disabled');
    //            OBPager.GetGeographyMaster(63, currstateId, "CurrCityList");
    //            $('#OtherCurrentCity').hide();
    //        }
    //    });

    $('#currcity_form').change(function () {

        var currcityId = $("#currcity_form").val();
        if (currcityId == 'OTH') {
            // $('#currcity_form').removeAttr('disabled');
            $('#OtherCurrentCity').show();
            $('#OtherCurrentCity').addClass('textMandatory');
            OBPager.SetTaskContentMemberValue('PersonalData.OtherCurrentCity', null, $('#OtherCurrentCity').value, false);

        }

        else {
            $('#currcity_form').removeAttr('disabled');
            $('#OtherCurrentCity').hide();
            $('#OtherCurrentCity').removeClass('textMandatory');
        }


    });


    $('.Address').each(function () {
        if ($(this).val().length == 0)
            $(this).removeClass('Alphanumeric').addClass('textMandatory');
        else
            $(this).removeClass('textMandatory').addClass('Alphanumeric');
    });
    $('#permcountry_form').change(function () {
        var permstateId = $('#permcountry_form').val();
        if (permstateId != -1) {
            $('#permstate_form').removeAttr('disabled');
            $('#permcity_form').removeAttr('disabled');
            $("#permcity_form").val("-1");
            OBPager.SetTaskContentMemberValue('PersonalData.PermanentCity', null, $("#permcity_form").value, false);
            OBPager.GetGeographyMaster(2, permstateId, "PermStateList");
            OBPager.GetGeographyMaster(63, permstateId, "PermCityList");
            $('#OtherPermanentCity').hide();
        }
    });
    $('#permcity_form').change(function () {
        var permcityId = $('#permcity_form').val();
        // OBPager.SetTaskContentMemberValue('PersonalData.PermanentCity', null, $('#permcity_form').value, false);
        if (permcityId == 'OTH') {
            $('#permcity_form').removeAttr('disabled');
            $('#OtherPermanentCity').addClass('textMandatory');
            $('#OtherPermanentCity').show();
            OBPager.SetTaskContentMemberValue('PersonalData.OtherPermanentCity', null, $('#OtherPermanentCity').value, false);

        }
        else {
            // OBPager.SetTaskContentMemberValue('PersonalData.OtherPermanentCity', null, '', false);
            $('#permcity_form').removeAttr('disabled');
            $('#OtherPermanentCity').removeClass('textMandatory');
            $('#OtherPermanentCity').hide();

        }

    });


    $('#lngstycountry_form').change(function () {
        var lngstystateId = $('#lngstycountry_form').val();
        if (lngstystateId != -1) {
            $('#lngstystate_form').removeAttr('disabled');
            $('#lngstycity_form').removeAttr('disabled');
            $("#lngstycity_form").val("-1");
            OBPager.SetTaskContentMemberValue('PersonalData.LongestStayCity', null, $("#lngstycity_form").value, false);
            OBPager.GetGeographyMaster(2, lngstystateId, "LngstyStateList");
            OBPager.GetGeographyMaster(63, lngstystateId, "LngstyCityList");
            $('#OtherLongestStayCity').hide();
        }
    });

    $('#lngstycity_form').change(function () {
        var lngstycityId = $('#lngstycity_form').val();

        // OBPager.SetTaskContentMemberValue('PersonalData.PermanentCity', null, $('#permcity_form').value, false);
        if (lngstycityId == 'OTH') {
            $('#lngstycity_form').removeAttr('disabled');
            $('#OtherLongestStayCity').show();
            $('#OtherLongestStayCity').addClass('textMandatory');
            OBPager.SetTaskContentMemberValue('PersonalData.OtherLongestCity', null, $('#OtherLongestStayCity').value, false);

        }
        else {
            $('#lngstycity_form').removeAttr('disabled');
            $('#OtherLongestStayCity').hide();
            $('#OtherLongestStayCity').removeClass('textMandatory');
            //OBPager.SetTaskContentMemberValue('PersonalData.OtherLongestCity', null, '', false);
        }

    });


    $('#passportcountry_form').change(function () {
        var passportstateId = $('#passportcountry_form').val();
        if (passportstateId != -1) {
            $('#passportstate_form').removeAttr('disabled');
            OBPager.GetGeographyMaster(2, passportstateId, "PassportStateList");
        }
    });

    $('#nationality_form').change(function () {
        var nationality = $('#nationality_form').val();
        if (nationality != -1) {
            $('#citizenship_form').removeAttr('disabled');
            OBPager.GetGeographyMaster(62, nationality, "CitizenshipList");
        }
    });

    $(".frmtmdf").focusout(function (e) {

        var $this = $(this);
        var val = $this.val();
        if (val.length != 0) {
            var rep = val.replace('-', '');
            val = rep;
            var padding = '';
            //var padding = val.replace('-', '');

            for (var i = val.length; i < 12; i++) {
                padding += '0';
            }

            $(this).val(padding + $(this).val());
            var retvalue = formatMDFNo($(this));

            $(this).val(retvalue);
            ////            if ($('#MDF_Number')[0].value != null) {
            ////                OBPager.SetTaskContentMemberValue('PersonalData.MDFNumber', null, $('#MDF_Number')[0].value, false);
            ////            }
            if ($('#PhilippineHealthInsuranceNumber')[0].value != null) {
                OBPager.SetTaskContentMemberValue('PersonalData.PhilippineHealthInsuranceNumber', null, $('#PhilippineHealthInsuranceNumber')[0].value, false);
            }
            if ($('#PagIbigNumber')[0].value != null) {
                OBPager.SetTaskContentMemberValue('PersonalData.PagIbigNumber', null, $('#PagIbigNumber')[0].value, false);
            }
        }
    });

        if ($("#chkpermAddress_form").is(':checked')) {
            disablePermanentAddressOnCheckBoxSelection();
        }
        else {
            enablePermanentAddress();
        }

        if ($("#chklngstyaddress_form").is(':checked')) {
            disableLongestAddressOnCheckBoxSelection();
        }
        else {
            enableLongestAddress();
        }

});



function PrePopulateValues() {

    var ccountryId = JSON.parse(OBPager.strFormDetails).PersonalData.CurrentCountry;
    if (ccountryId != -1 && ccountryId != null && ccountryId != '') {
        $('#currstate_form').removeAttr('disabled');
        $('#currcity_form').removeAttr('disabled');
        $('OtherCurrentCity').hide();
        OBPager.GetGeographyMaster(2, ccountryId, "CurrStateList");
        OBPager.GetGeographyMaster(63, ccountryId, "CurrCityList");
    }

    var pcountryId = JSON.parse(OBPager.strFormDetails).PersonalData.PermanentCountry;
    var pcity = JSON.parse(OBPager.strFormDetails).PersonalData.PermanentCity;
    //var pOthCity = JSON.parse(OBPager.strFormDetails).PersonalData.OtherPermanentCity;
    if (pcountryId != -1 && pcountryId != null && pcountryId != '') {
        $('#permstate_form').removeAttr('disabled');
        $('#permcity_form').removeAttr('disabled');
        // $('#OtherPermanentCity').hide();
        OBPager.GetGeographyMaster(2, pcountryId, "PermStateList");
        OBPager.GetGeographyMaster(63, pcountryId, "PermCityList");
        if (pcity=='OTH') {
            $('#OtherPermanentCity').show();
        }
        else {
            $('#OtherPermanentCity').hide();
        }


    }
    var ChkPermAdd = JSON.parse(OBPager.strFormDetails).PersonalData.IsSameCurrPermAddress;
    var PermCity = JSON.parse(OBPager.strFormDetails).PersonalData.PermanentCity;
    var OthCity = JSON.parse(OBPager.strFormDetails).PersonalData.OtherPermanentCity;
    if (ChkPermAdd == 1) {
        $('#chkpermAddress_form').attr('checked', 'checked');
       
        if (PermCity == "OTH") {
            OBPager.SetTaskContentMemberValue('PersonalData.OtherPermanentCity', null, OthCity, false);
            $('#OtherPermanentCity').show();
        }
        else {
            $('#OtherPermanentCity').hide();
        }

    }
    else {
        
        if (PermCity == "OTH") {
            OBPager.SetTaskContentMemberValue('PersonalData.OtherPermanentCity', null, OthCity, false);
            $('#OtherPermanentCity').show();
        }
        else {
            $('#OtherPermanentCity').hide();
        }

    }
  

    var lcountryId = JSON.parse(OBPager.strFormDetails).PersonalData.LongestStayCountry;
    var lcity = JSON.parse(OBPager.strFormDetails).PersonalData.LongestStayCity;
    if (lcountryId != -1 && lcountryId != null && lcountryId != '') {
        $('#lngstystate_form').removeAttr('disabled');
        $('#lngstycity_form').removeAttr('disabled');
        // $('#OtherLongestStayCity').hide();
        OBPager.GetGeographyMaster(2, lcountryId, "LngstyStateList");
        OBPager.GetGeographyMaster(63, lcountryId, "LngstyCityList");
        if (lcity == 'OTH') {
            $('#OtherLongestStayCity').show();
        }
        else {
            $('#OtherLongestStayCity').hide();
        }
    }
    var ChkLongAdd = JSON.parse(OBPager.strFormDetails).PersonalData.IsSameCurrlngAddress;
    var LngCity = JSON.parse(OBPager.strFormDetails).PersonalData.LongestStayCity;
    var OthLngCity = JSON.parse(OBPager.strFormDetails).PersonalData.OtherLongestCity;
    if (ChkLongAdd == 1) {
        $('#chklngstyaddress_form').attr('checked', 'checked');
        
        if (LngCity == "OTH") {
            OBPager.SetTaskContentMemberValue('PersonalData.OtherLongestCity', null, OthLngCity, false);
            $('#OtherLongestStayCity').show();
        }
        else {
            $('#OtherLongestStayCity').hide();
        }

    }
    else {
       
        if (LngCity == "OTH") {
            OBPager.SetTaskContentMemberValue('PersonalData.OtherLongestCity', null, OthLngCity, false);
            $('#OtherLongestStayCity').show();
        }
        else {
            $('#OtherLongestStayCity').hide();
        }

    }

    var pascountryId = JSON.parse(OBPager.strFormDetails).PersonalData.PassportCountry;
    if (pascountryId != -1 && pascountryId != null && pascountryId != '') {
        $('#passportstate_form').removeAttr('disabled');
        OBPager.GetGeographyMaster(2, pascountryId, "PassportStateList");
    }

    var nationality = JSON.parse(OBPager.strFormDetails).PersonalData.Nationality;
    if (nationality != -1 && nationality != null && nationality != '') {
        $('#citizenship_form').removeAttr('disabled');
        OBPager.GetGeographyMaster(62, nationality, "CitizenshipList");
    }

    var isdisable = JSON.parse(OBPager.strFormDetails).PersonalData.IsDisabled;
    if (isdisable == 1) {
        $('#disabledyes_form').attr('checked', 'checked');
        //        OBPager.SetTaskContentMemberValue('PersonalData.IsDisabled.Yes', 1, '1', true);
        //        OBPager.SetTaskContentMemberValue('PersonalData.IsDisabled.No', 1, '', true);
    }
    else {
        $('#disabledno_form').attr('checked', 'checked');
        //        OBPager.SetTaskContentMemberValue('PersonalData.IsDisabled.Yes', 1, '', false);
        //        OBPager.SetTaskContentMemberValue('PersonalData.IsDisabled.No', 1, '1', false);
    }

    var ExemptStatus = JSON.parse(OBPager.strFormDetails).PersonalData.TaxExemptionStatus;
    if (ExemptStatus == 1) {
        $('#exemptionstatusyes_form').attr('checked', 'checked');
    }
    else {
        $('#exemptionstatusno_form').attr('checked', 'checked');
    }

    var IsDateCurrent = JSON.parse(OBPager.strFormDetails).PersonalData.IsDateCurrent;
    if (IsDateCurrent == 1) {
        $('#chkcurrentAddressdate').attr('checked', 'checked');
        $("#currto_form").attr('disabled', true);
        var currParentObj = $(event).parent('li');
        currParentObj.find('.ui-datepicker-trigger').attr('disabled', true);
    }
    else {
        $("#currto_form").attr('disabled', false);
        var currParentObj = $(event).parent('li');
        currParentObj.find('.ui-datepicker-trigger').attr('disabled', false);
    }


    var othersFlag = JSON.parse(OBPager.strFormDetails).PersonalData.CurrentNatureofLoc.Other;
    if (othersFlag == 1 || othersFlag == 'true') {
        $('#currothervalue_form').show();
    }
    else {
        $('#currothervalue_form').hide();
    }

    var certificationoth = JSON.parse(OBPager.strFormDetails).PersonalData.CertificationTaken;
    //    if (certificationoth == '6') {
    //        $('#Certification_Other').show();
    //    }
    //    else {
    //        $('#Certification_Other').hide();
    //    }

    var otherspFlag = JSON.parse(OBPager.strFormDetails).PersonalData.PermanentNatureofLoc.Other;
    if (otherspFlag == 1 || otherspFlag == 'true') {
        $('#permothervalue_form').show();
    }
    else {
        $('#permothervalue_form').hide();
    }


    var othersaodFlag = JSON.parse(OBPager.strFormDetails).PersonalData.LongestStayNatureofLoc.Other;
    if (othersaodFlag == 1 || othersaodFlag == 'true') {
        $('#lngstyothersvalue_form').show();
    }
    else {
        $('#lngstyothersvalue_form').hide();
    }

    var SecndLangAvailability = JSON.parse(OBPager.strFormDetails).PersonalData.SecondSkillsAvailability;
    if (SecndLangAvailability == 1) {
        $('#check_lang2').val('Y');
    }
    var ThirdLangAvailability = JSON.parse(OBPager.strFormDetails).PersonalData.ThirdSkillsAvailability;
    if (ThirdLangAvailability == 1) {
        $('#check_lang3').val('Y');
    }
    var FourthLangAvailability = JSON.parse(OBPager.strFormDetails).PersonalData.FourthSkillsAvailability;
    if (FourthLangAvailability == 1) {
        $('#check_lang4').val('Y');
    }
    var FifthLangAvailability = JSON.parse(OBPager.strFormDetails).PersonalData.FifthSkillsAvailability;
    if (FifthLangAvailability == 1) {
        $('#check_lang5').val('Y');
    }


    var passportID = JSON.parse(OBPager.strFormDetails).PersonalData.PassportAvailability;
    if (passportID == 1) {
        $('#passportavail_form').val('Y');
        $('#passportno_form').removeAttr('disabled');
        $('#passportPrefix_form').removeAttr('disabled');
        $('#passportname_form').removeAttr('disabled');
        $('#PassportMiddleName_form').removeAttr('disabled');
        $('#PassportLastName_form').removeAttr('disabled');
        $('#passportSuffix_form').removeAttr('disabled');
        $('#passportcountry_form').removeAttr('disabled');
        $('#passportstate_form').removeAttr('disabled');
        $('#passportcity_form').removeAttr('disabled');
        $('#passportissuedate_form').removeAttr('disabled');
        $('#passportexp_form').removeAttr('disabled');
        $('#passportvisahis_form').removeAttr('disabled');
        $('#passportrejreason_form').removeAttr('disabled');
        $('#passportvisalist_form').removeAttr('disabled');
        $('.passportcls').show();
    }
    else {
        $('#passportavail_form').val('N');
        $('#passportstate_form').empty();
        $('#passportstate_form').attr("disabled", "true");
        $('#passportno_form').attr("disabled", "true");
        $('#passportPrefix_form').attr("disabled", "true");
        $('#passportname_form').attr("disabled", "true");
        $('#PassportMiddleName_form').attr("disabled", "true");
        $('#PassportLastName_form').attr("disabled", "true");
        $('#passportSuffix_form').attr("disabled", "true");
        $('#passportcountry_form').attr("disabled", "true");
        $('#passportstate_form').attr("disabled", "true");
        $('#passportcity_form').attr("disabled", "true");
        $('#passportissuedate_form').attr("disabled", "true");
        $('#passportexp_form').attr("disabled", "true");
        $('#passportvisahis_form').attr("disabled", "true");
        $('#passportrejreason_form').attr("disabled", "true");
        $('#passportvisalist_form').attr("disabled", "true");
        $('.passportcls').hide();
    }



    var ArrestedDetID = JSON.parse(OBPager.strFormDetails).PersonalData.chkArrestAvailability;
    if (ArrestedDetID == 1) {
        $('#ArrestAvail_form').val('Y');
        $('#ArrestData_form').removeAttr('disabled').addClass('Alphanumeric');
        $('.arrestclass').show();
    }
    else {
        $('#ArrestAvail_form').val('N');
        $('#ArrestData_form').attr("disabled", "true").removeClass('Alphanumeric');
        $('.arrestclass').hide();
    }

    var Language2ID = JSON.parse(OBPager.strFormDetails).PersonalData.SecondSkillsAvailability;
    if (Language2ID == 1 || Language2ID == 'true') {
        document.getElementById('check_lang2').checked = true;
        $('#lang2_form').removeAttr('disabled').addClass('onlyAlp').addClass('textMandatory');
        $('#Expertise2_form').removeAttr('disabled').addClass('dropdown');
        $('.langclass2').show();
        //        document.getElementById('lang2_form').disabled = false;
        //        document.getElementById('Expertise2_form').disabled = false;
    }
    else {
        document.getElementById('check_lang2').checked = false;
        $('#lang2_form').attr('disabled', "true").removeClass('onlyAlp').removeClass('textMandatory');
        $('#Expertise2_form').attr('disabled', "true").removeClass('dropdown');
        $('.langclass2').hide();
    }
    var Language3ID = JSON.parse(OBPager.strFormDetails).PersonalData.ThirdSkillsAvailability;
    if (Language3ID == 1 || Language3ID == 'true') {
        document.getElementById('check_lang3').checked = true;
        $('#lang3_form').removeAttr('disabled').addClass('onlyAlp').addClass('textMandatory');
        $('#Expertise3_form').removeAttr('disabled').addClass('dropdown');
        $('.langclass3').show();
        //        document.getElementById('lang2_form').disabled = false;
        //        document.getElementById('Expertise2_form').disabled = false;
    }
    else {
        document.getElementById('check_lang3').checked = false;
        $('#lang3_form').attr('disabled', "true").removeClass('onlyAlp').removeClass('textMandatory');
        $('#Expertise3_form').attr('disabled', "true").removeClass('dropdown');
        $('.langclass3').hide();
    }
    var Language4ID = JSON.parse(OBPager.strFormDetails).PersonalData.FourthSkillsAvailability;
    if (Language4ID == 1 || Language4ID == 'true') {
        document.getElementById('check_lang4').checked = true;
        $('#lang4_form').removeAttr('disabled').addClass('onlyAlp').addClass('textMandatory');
        $('#Expertise4_form').removeAttr('disabled').addClass('dropdown');
        $('.langclass4').show();
        //        document.getElementById('lang2_form').disabled = false;
        //        document.getElementById('Expertise2_form').disabled = false;
    }
    else {
        document.getElementById('check_lang4').checked = false;
        $('#lang4_form').attr('disabled', "true").removeClass('onlyAlp').removeClass('textMandatory');
        $('#Expertise4_form').attr('disabled', "true").removeClass('dropdown');
        $('.langclass4').hide();
    }
    var Language5ID = JSON.parse(OBPager.strFormDetails).PersonalData.FifthSkillsAvailability;
    if (Language5ID == 1 || Language5ID == 'true') {
        document.getElementById('check_lang5').checked = true;
        $('#lang5_form').removeAttr('disabled').addClass('onlyAlp').addClass('textMandatory');
        $('#Expertise5_form').removeAttr('disabled').addClass('dropdown');
        $('.langclass5').show();
        //        document.getElementById('lang2_form').disabled = false;
        //        document.getElementById('Expertise2_form').disabled = false;
    }
    else {
        document.getElementById('check_lang5').checked = false;
        $('#lang5_form').attr('disabled', "true").removeClass('onlyAlp').removeClass('textMandatory');
        $('#Expertise5_form').attr('disabled', "true").removeClass('dropdown');
        $('.langclass5').hide();
    }

    var candidateType = TaskPrefillValues.PrefillValues.Set1.CandidateType;

    //Hide Office Phone Number for Campus Candidates
    if (candidateType == 2) {
        $('#ofclst_form').hide();
    }
    else {
        $('#ofclst_form').show();
    }
}




function checkLang2() {
    if (document.getElementById('check_lang2').checked == true) {
        $('#Language2').show();
        $('#lang2_form').removeAttr('disabled').addClass('onlyAlp').addClass('textMandatory');
        $('#Expertise2_form').removeAttr('disabled').addClass('dropdown');
        OBPager.SetTaskContentMemberValue('PersonalData.SecondSkillsAvailability', 1, 'true', false);
        document.getElementById('check_lang2').checked = true;
        $('.langclass2').parent('label').removeClass('notMandatory');
        $('.langclass2').show();
    }
    else {
        OBPager.SetTaskContentMemberValue('PersonalData.SecondSkillsAvailability', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.SecondLanguageExpertise', null, '-1', false);
        OBPager.SetTaskContentMemberValue('PersonalData.SecondLanguage', null, '', false);
        $('#lang2_form').attr('disabled', "true").removeClass('onlyAlp').removeClass('textMandatory');
        $('#Expertise2_form').attr('disabled', "true").removeClass('dropdown');
        document.getElementById('check_lang2').checked = false;
        $('.langclass2').parent('label').addClass('notMandatory');
        $('.langclass2').hide();
        jQXB.doBind(OBPager.taskContentDSName);

    }

}



function checkLang3() {
    if (document.getElementById('check_lang3').checked == true) {
        $('#Language3').show();
        $('#lang3_form').removeAttr('disabled').addClass('onlyAlp').addClass('textMandatory');
        $('#Expertise3_form').removeAttr('disabled').addClass('dropdown');
        OBPager.SetTaskContentMemberValue('PersonalData.ThirdSkillsAvailability', 1, 'true', false);
        document.getElementById('check_lang3').checked = true;
        $('.langclass3').parent('label').removeClass('notMandatory');
        $('.langclass3').show();
    }
    else {
        OBPager.SetTaskContentMemberValue('PersonalData.ThirdSkillsAvailability', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.ThirdLanguageExpertise', null, '-1', false);
        OBPager.SetTaskContentMemberValue('PersonalData.ThirdLanguage', null, '', false);
        $('#lang3_form').attr('disabled', "true").removeClass('onlyAlp').removeClass('textMandatory');
        $('#Expertise3_form').attr('disabled', "true").removeClass('dropdown');
        document.getElementById('check_lang3').checked = false;
        $('.langclass3').parent('label').addClass('notMandatory');
        $('.langclass3').hide();
        jQXB.doBind(OBPager.taskContentDSName);
    }
}
function checkLang4() {
    if (document.getElementById('check_lang4').checked == true) {
        $('#Language4').show();
        $('#lang4_form').removeAttr('disabled').addClass('onlyAlp').addClass('textMandatory');
        $('#Expertise4_form').removeAttr('disabled').addClass('dropdown');
        OBPager.SetTaskContentMemberValue('PersonalData.FourthSkillsAvailability', 1, 'true', false);
        document.getElementById('check_lang4').checked = true;
        $('.langclass4').parent('label').removeClass('notMandatory');
        $('.langclass4').show();
    }
    else {

        OBPager.SetTaskContentMemberValue('PersonalData.FourthSkillsAvailability', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.FourthLanguageExpertise', null, '-1', false);
        OBPager.SetTaskContentMemberValue('PersonalData.FourthLanguage', null, '', false);
        $('#lang4_form').attr('disabled', "true").removeClass('onlyAlp').removeClass('textMandatory');
        $('#Expertise4_form').attr('disabled', "true").removeClass('dropdown');
        document.getElementById('check_lang4').checked = false;
        $('.langclass4').parent('label').addClass('notMandatory');
        $('.langclass4').hide();
        jQXB.doBind(OBPager.taskContentDSName);
    }
}
function checkLang5() {
    if (document.getElementById('check_lang5').checked == true) {
        $('#Language5').show();
        $('#lang5_form').removeAttr('disabled').addClass('onlyAlp').addClass('textMandatory');
        $('#Expertise5_form').removeAttr('disabled').addClass('dropdown');
        OBPager.SetTaskContentMemberValue('PersonalData.FifthSkillsAvailability', 1, 'true', false);
        document.getElementById('check_lang5').checked = true;
        $('.langclass5').parent('label').removeClass('notMandatory');
        $('.langclass5').show();
    }
    else {
        OBPager.SetTaskContentMemberValue('PersonalData.FifthSkillsAvailability', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.FifthLanguageExpertise', null, '-1', false);
        OBPager.SetTaskContentMemberValue('PersonalData.FifthLanguage', null, '', false);
        $('#lang5_form').attr('disabled', "true").removeClass('onlyAlp').removeClass('textMandatory');
        $('#Expertise5_form').attr('disabled', "true").removeClass('dropdown');
        $('.langclass5').parent('label').addClass('notMandatory');
        $('.langclass5').hide();
        document.getElementById('check_lang5').checked = false;
        jQXB.doBind(OBPager.taskContentDSName);
    }
}
function chkArrestAvailability() {
    if ($('#ArrestAvail_form').val() == 'Y') {
        $('#ArrestData_form').removeAttr('disabled').addClass('Alphanumeric');
        $('.arrestclass').parent('label').removeClass('notMandatory');
        $('.arrestclass').show();
        OBPager.SetTaskContentMemberValue('PersonalData.chkArrestAvailability', 1, '1', false);
    }
    else {
        OBPager.SetTaskContentMemberValue('PersonalData.chkArrestAvailability', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.ArrestedDetails', null, '', false);
        $('#ArrestData_form').attr("disabled", "true").removeClass('Alphanumeric');
        $('.arrestclass').parent('label').addClass('notMandatory');
        $('.arrestclass').hide();
        jQXB.doBind(OBPager.taskContentDSName);

    }

}


function formatMDFNo(obj) {
    var format = '';
    var numbers = obj.val().replace(/\D/g, ''),
         char = { 0: '', 1: '', 2: '-', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '', 10: '', 11: '-' };

    obj.val('');
    for (var a = 0; a < numbers.length; a++) {
        format += (char[a] || '') + numbers.charAt(a);

    }
    obj.val(format);
    //    $("#MDF_Number").val(obj.value);
    return obj.val();


};


function SaveTaskData(saveMode) {

////    OBPager.SetTaskContentMemberValue('PersonalData.MDFNumber', null, $('#MDF_Number')[0].value, false);
    OBPager.SetTaskContentMemberValue('PersonalData.PhilippineHealthInsuranceNumber', null, $('#PhilippineHealthInsuranceNumber')[0].value, false);
    OBPager.SetTaskContentMemberValue('PersonalData.PagIbigNumber', null, $('#PagIbigNumber')[0].value, false);
    // saveMode { 0:Save, 1:Submit }
    if (saveMode == 1) {
        if (validate.ValidateSubmit() == true) {
            if (OBPager.ValidateTaskData(saveMode) == true) {
                try {
                    //OBPager.SetTaskContentMemberValue('NAPayRoll.EAddress2', null, $('#req_Address2')[0].value, false);

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

function ResetTaskData() {
    OBPager.ResetTaskContent();
    PrePopulateValues();
    if (OBPager.taskStatusFlag == -1) {
        // Set member value manually
        OBPager.SetTaskContentMemberValue('PersonalData.CandidateId', null, TaskPrefillValues.PrefillValues.Set1.CandidateId, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Prefix', null, TaskPrefillValues.PrefillValues.Set1.Prefix, false);
        OBPager.SetTaskContentMemberValue('PersonalData.FirstName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.MiddleName', null, TaskPrefillValues.PrefillValues.Set1.MiddleName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.LastName', null, TaskPrefillValues.PrefillValues.Set1.LastName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.MaritalStatus', null, TaskPrefillValues.PrefillValues.Set1.MaritalStatus, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Gender', null, TaskPrefillValues.PrefillValues.Set1.Gender, false);
        OBPager.SetTaskContentMemberValue('PersonalData.DOB', null, TaskPrefillValues.PrefillValues.Set1.DateOfBirth, false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentAddress', null, TaskPrefillValues.PrefillValues.Set1.AddressDetails, false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentCity', null, TaskPrefillValues.PrefillValues.Set1.City, false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentCountry', null, TaskPrefillValues.PrefillValues.Set1.Country, false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentState', null, TaskPrefillValues.PrefillValues.Set1.State, false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentPinCode', null, TaskPrefillValues.PrefillValues.Set1.PostalCode, false);
        OBPager.SetTaskContentMemberValue('PersonalData.HomePh', null, TaskPrefillValues.PrefillValues.Set1.HomePhone, false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentDurationFrom', null, TaskPrefillValues.PrefillValues.Set1.FromDate, false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentDurationTo', null, TaskPrefillValues.PrefillValues.Set1.ToDate, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Mobile', null, TaskPrefillValues.PrefillValues.Set1.MobilePhone, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Phone', null, TaskPrefillValues.PrefillValues.Set1.WorkPhone, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmailId', null, TaskPrefillValues.PrefillValues.Set1.PersonalEmail, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactName', null, TaskPrefillValues.PrefillValues.Set1.ECName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactNo', null, TaskPrefillValues.PrefillValues.Set1.EmergencyPhone, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactRelationship', null, TaskPrefillValues.PrefillValues.Set1.Relationship, false);

    }
    jQXB.doBind(OBPager.taskContentDSName);
}
//Do a data bind finally



function ChkPassportAvailability() {
    if ($('#passportavail_form').val() == 'Y') {
        $('#passportno_form').removeAttr('disabled').addClass('Alphanumeric');
        $('#passportPrefix_form').removeAttr('disabled');
        $('#passportname_form').removeAttr('disabled').addClass('Alphanumeric');
        $('#PassportMiddleName_form').removeAttr('disabled');
        $('#PassportLastName_form').removeAttr('disabled').addClass('Alphanumeric');
        $('#passportSuffix_form').removeAttr('disabled');
        $('#passportcountry_form').removeAttr('disabled').addClass('dropdown');
        $('#passportstate_form').removeAttr('disabled').addClass('dropdown');
        $('#passportcity_form').removeAttr('disabled').addClass('Alphanumeric');
        $('#passportissuedate_form').removeAttr('disabled').addClass('dateMandatory');
        $('#passportexp_form').removeAttr('disabled').addClass('dateMandatory');
        $('#passportvisahis_form').removeAttr('disabled');
        $('#passportrejreason_form').removeAttr('disabled');
        $('#passportvisalist_form').removeAttr('disabled');
        $('.passportcls').parent('label').removeClass('notMandatory');
        $('.passportcls').show();
        OBPager.SetTaskContentMemberValue('PersonalData.PassportAvailability', 1, '1', false);
    }
    else {
        OBPager.SetTaskContentMemberValue('PersonalData.PassportNo', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.PassportPrefix', null, '-1', false);
        OBPager.SetTaskContentMemberValue('PersonalData.PassportName', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.PassportMiddleName', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.PassportLastName', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.PassportSuffix', null, '-1', false);
        OBPager.SetTaskContentMemberValue('PersonalData.PassportCountry', null, '-1', false);
        $('#passportstate_form').empty();
        $('#passportstate_form').attr("disabled", "true");
        OBPager.SetTaskContentMemberValue('PersonalData.PassportState', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.PassportIssueDate', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.PassportCity', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.PassportExpiryDate', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.VisaRejectionHistory', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.VisasStampedList', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.ReasonForVisaRejection', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.PassportAvailability', 1, '', false);
        jQXB.doBind(OBPager.taskContentDSName);
        $('.passportcls').hide();
        $('.passportcls').parent('label').addClass('notMandatory');
        $('#passportno_form').attr("disabled", "true").removeClass('Alphanumeric');
        $('#passportPrefix_form').attr("disabled", "true");
        $('#passportname_form').attr("disabled", "true").removeClass('Alphanumeric');
        $('#PassportMiddleName_form').attr("disabled", "true");
        $('#PassportLastName_form').attr("disabled", "true").removeClass('Alphanumeric');
        $('#passportSuffix_form').attr("disabled", "true");
        $('#passportcountry_form').attr("disabled", "true").removeClass('dropdown');
        $('#passportstate_form').attr("disabled", "true").removeClass('dropdown');
        $('#passportcity_form').attr("disabled", "true").removeClass('Alphanumeric');
        $('#passportissuedate_form').attr("disabled", "true").removeClass('dateMandatory');
        $('#passportexp_form').attr("disabled", "true").removeClass('dateMandatory');
        $('#passportvisahis_form').attr("disabled", "true");
        $('#passportrejreason_form').attr("disabled", "true");
        $('#passportvisalist_form').attr("disabled", "true");
        $('.passportddetails').find('img').remove();
        $('.passportddetails').find('.alert_f_text').remove();
        alert('Please apply passport before joining.');
    }

}



function chkArrestAvailability() {
    if ($('#ArrestAvail_form').val() == 'Y') {
        $('#ArrestData_form').removeAttr('disabled').addClass('Alphanumeric');
        $('.arrestclass').parent('label').removeClass('notMandatory');
        $('.arrestclass').show();
        OBPager.SetTaskContentMemberValue('PersonalData.chkArrestAvailability', 1, '1', false);
    }
    else {
        OBPager.SetTaskContentMemberValue('PersonalData.chkArrestAvailability', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.ArrestedDetails', null, '', false);
        $('#ArrestData_form').attr("disabled", "true").removeClass('Alphanumeric');
        $('.arrestclass').parent('label').addClass('notMandatory');
        $('.arrestclass').hide();
        jQXB.doBind(OBPager.taskContentDSName);

    }

}



function Chk_ExemptStatus(flag) {
    if (flag == 1) {
        OBPager.SetTaskContentMemberValue('PersonalData.TaxExemptionStatus', 1, '1', false);
    }
    else {
        OBPager.SetTaskContentMemberValue('PersonalData.TaxExemptionStatus', 1, '', false);
    }
}


function ChkPemanentAddress() {
    if ($("#chkpermAddress_form").is(':checked')) {
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentAddress', null, $('#curraddress_form').val(), false);

//        $('#curraddress_form').on('change', function () {
//            OBPager.SetTaskContentMemberValue('PersonalData.CurrentAddress', null, $('#curraddress_form').val(), false);
//            $('#permaddress_form').val($('#curraddress_form').val());
//            OBPager.SetTaskContentMemberValue('PersonalData.PermanentAddress', null, $('#curraddress_form').val(), false);
//        });

        OBPager.SetTaskContentMemberValue('PersonalData.PermanentCountry', null, $('#currcountry_form').val(), false);
//        $('#currcountry_form').on('change', function () {
//            $("#permcountry_form").val($(this).val());
//            OBPager.SetTaskContentMemberValue('PersonalData.PermanentCountry', null, $('#currcountry_form').val(), false);
//            if ($('#currcountry_form').val() != -1) {
//                var permstateId = $('#currcountry_form').val();
//                if (permstateId != -1) {
//                    OBPager.GetGeographyMaster(2, permstateId, "PermStateList");
//                    OBPager.GetGeographyMaster(63, permstateId, "PermCityList");
//                }
//            }
//        });

        if ($('#currcountry_form').val() != -1) {
            var permstateId = $('#currcountry_form').val();
            if (permstateId != -1) {              
                OBPager.GetGeographyMaster(2, permstateId, "PermStateList");
                OBPager.GetGeographyMaster(63, permstateId, "PermCityList");
            }

            OBPager.SetTaskContentMemberValue('PersonalData.PermanentState', null, $('#currstate_form').val(), false);
//            $('#currstate_form').on('change', function () {
//                $("#permstate_form").val($(this).val());
//                OBPager.SetTaskContentMemberValue('PersonalData.PermanentState', null, $('#currstate_form').val(), false);
//            });

            OBPager.SetTaskContentMemberValue('PersonalData.PermanentCity', null, $('#currcity_form').val(), false);
//            $('#currcity_form').on('change', function () {
//                $("#permcity_form").val($(this).val());
//                OBPager.SetTaskContentMemberValue('PersonalData.PermanentCity', null, $('#currcity_form').val(), false);
//                var currcityId = $("#currcity_form").val();
//                if (currcityId == 'OTH') {
//                    $('#OtherPermanentCity').show();
//                    $('#OtherCurrentCity').on('change', function () {
//                        OBPager.SetTaskContentMemberValue('PersonalData.OtherCurrentCity', null, $('#OtherCurrentCity').val(), false);
//                        $('#OtherPermanentCity').val($('#OtherCurrentCity').val());
//                        OBPager.SetTaskContentMemberValue('PersonalData.OtherPermanentCity', null, $('#OtherCurrentCity').val(), false);

//                    });


//                }
//                else {
//                    $('#lngstycity_form').removeAttr('disabled');
//                    $('#OtherLongestStayCity').hide();
//                }

//            });

            var currcityId = $("#currcity_form").val();
            if (currcityId== 'OTH') {
                // $('#currcity_form').removeAttr('disabled');
               // $('#OtherCurrentCity').show();
                OBPager.SetTaskContentMemberValue('PersonalData.OtherPermanentCity', null, $('#OtherCurrentCity').val(), false);
                $('#OtherPermanentCity').show();

            }
            else {
                $('#permcity_form').removeAttr('disabled');
                $('#OtherPermanentCity').hide();
            }


        }

        OBPager.SetTaskContentMemberValue('PersonalData.PermanentPinCode', null, $('#currPostal_form').val(), false);
//        $('#currPostal_form').on('change', function () {
//            OBPager.SetTaskContentMemberValue('PersonalData.CurrentPinCode', null, $('#currPostal_form').val(), false);
//            $('#permpin_form').val($('#currPostal_form').val());
//            OBPager.SetTaskContentMemberValue('PersonalData.PermanentPinCode', null, $('#currPostal_form').val(), false);
//        });

        OBPager.SetTaskContentMemberValue('PersonalData.PermanentDurationFrom', null, $('#currfrom_form').val(), false);
//        $('#currfrom_form').on('change', function () {
//            OBPager.SetTaskContentMemberValue('PersonalData.CurrentDurationFrom', null, $('#currfrom_form').val(), false);
//            $('#permfrom_form').val($('#currfrom_form').val());
//            OBPager.SetTaskContentMemberValue('PersonalData.PermanentDurationFrom', null, $('#currfrom_form').val(), false);
//        });

        OBPager.SetTaskContentMemberValue('PersonalData.PermanentDurationTo', null, $('#currto_form').val(), false);
//        $('#currto_form').on('change', function () {
//            OBPager.SetTaskContentMemberValue('PersonalData.CurrentDurationTo', null, $('#currto_form').val(), false);
//            $('#permto_form').val($('#currto_form').val());
//            OBPager.SetTaskContentMemberValue('PersonalData.PermanentDurationTo', null, $('#currto_form').val(), false);
//        });

        OBPager.SetTaskContentMemberValue('PersonalData.PermanentPhone', null, $('#currph_form').val(), false);
//        $('#currph_form').on('change', function () {
//            OBPager.SetTaskContentMemberValue('PersonalData.CurrentPhone', null, $('#currph_form').val(), false);
//            $('#perph_form').val($('#currph_form').val());
//            OBPager.SetTaskContentMemberValue('PersonalData.PermanentPhone', null, $('#currph_form').val(), false);
//        });
        

        OBPager.SetTaskContentMemberValue('PersonalData.IsSameCurrPermAddress', 1, '1', false);

        if ($('#currrent_form')[0].checked) {
            //   $('#disabledyes_form').attr('checked', 'checked');
            OBPager.SetTaskContentMemberValue('PersonalData.PermanentNatureofLoc.Rent', 1, "true", false);
            $('#permothervalue_form').hide();
        }
        else if ($('#currown_form')[0].checked) {
            OBPager.SetTaskContentMemberValue('PersonalData.PermanentNatureofLoc.Own', 1, "true", false);
            $('#permothervalue_form').hide();
        }
        else if ($('#currother_form')[0].checked) {

            OBPager.SetTaskContentMemberValue('PersonalData.PermanentNatureofLoc.Other', 1, "true", false);
            $('#permothervalue_form').show();
            OBPager.SetTaskContentMemberValue('PersonalData.PermanentNatureofLoc.OtherValue', 1, $('#currothervalue_form').val(), false);
        }
       disablePermanentAddressOnCheckBoxSelection();
    }
    else {
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentAddress', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentCountry', null, '-1', false);
        $('#permstate_form').empty();
        $('#permstate_form').attr("disabled", "true");
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentState', null, '', false);
        $('#permcity_form').empty();
        $('#permcity_form').attr("disabled", "true");
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentCity', null, '', false);
        $('#OtherPermanentCity').hide();
        OBPager.SetTaskContentMemberValue('PersonalData.OtherPermanentCity', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentPinCode', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentDurationFrom', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentDurationTo', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentPhone', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.IsSameCurrPermAddress', 1, '', false);

        OBPager.SetTaskContentMemberValue('PersonalData.PermanentNatureofLoc.Rent', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentNatureofLoc.Own', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentNatureofLoc.Other', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentNatureofLoc.OtherValue', 1, '', false);
        $('#permothervalue_form').hide();
        // $('#OtherPermanentCity').hide();
    }
    jQXB.doBind(OBPager.taskContentDSName);

    if ($("#chkpermAddress_form").is(':checked')) {
        disablePermanentAddressOnCheckBoxSelection();
    }
    else {
        enablePermanentAddress();
    }

}
function ChkCurrentAddressDate(event) {
    if ($("#chkcurrentAddressdate").is(':checked')) {
        $("#currto_form").attr('disabled', true);
        var currParentObj = $(event).parent('li');
        currParentObj.find('.ui-datepicker-trigger').attr('disabled', true);
        OBPager.SetTaskContentMemberValue('PersonalData.IsDateCurrent', 1, '1', false);
        // OBPager.SetTaskContentMemberValue('PersonalData.CurrentDurationTo', null,, false);
    }

    else {
        $("#currto_form").attr('disabled', false);
        var currParentObj = $(event).parent('li');
        currParentObj.find('.ui-datepicker-trigger').attr('disabled', false);
        OBPager.SetTaskContentMemberValue('PersonalData.IsDateCurrent', 1, '', false);
    }
    jQXB.doBind(OBPager.taskContentDSName);
}


function ChklongeststayAddress() {
    if ($("#chklngstyaddress_form").is(':checked')) {
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayAddress', null, $('#curraddress_form').val(), false);
//        $('#curraddress_form').on('change', function () {
//            OBPager.SetTaskContentMemberValue('PersonalData.CurrentAddress', null, $('#curraddress_form').val(), false);
//            $('#lngstyaddress_form').val($('#curraddress_form').val());
//            OBPager.SetTaskContentMemberValue('PersonalData.LongestStayAddress', null, $('#curraddress_form').val(), false);
//        });

        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayCountry', null, $('#currcountry_form').val(), false);
//        $('#currcountry_form').on('change', function () {
//            $("#lngstycountry_form").val($(this).val());
//            OBPager.SetTaskContentMemberValue('PersonalData.LongestStayCountry', null, $('#currcountry_form').val(), false);
//            if ($('#currcountry_form').val() != -1) {

//                var lngstateId = $('#currcountry_form').val();
//                if (lngstateId != -1) {
//                 
//                    OBPager.GetGeographyMaster(2, lngstateId, "LngstyStateList");
//                    OBPager.GetGeographyMaster(63, lngstateId, "LngstyCityList");
//                }

//            }


//        });

        $('#lngstycity_form').removeAttr('disabled');
        if ($('#currcountry_form').val() != -1) {

            var lngstateId = $('#currcountry_form').val();
            if (lngstateId != -1) {
                  
                OBPager.GetGeographyMaster(2, lngstateId, "LngstyStateList");
                OBPager.GetGeographyMaster(63, lngstateId, "LngstyCityList");
            }

            OBPager.SetTaskContentMemberValue('PersonalData.LongestStayState', null, $('#currstate_form').val(), false);
//            $('#currstate_form').on('change', function () {
//                $("#lngstystate_form").val($(this).val());
//                OBPager.SetTaskContentMemberValue('PersonalData.LongestStayState', null, $('#currstate_form').val(), false);
//            });
           
            OBPager.SetTaskContentMemberValue('PersonalData.LongestStayCity', null, $('#currcity_form').val(), false);
//            $('#currcity_form').on('change', function () {
//                $("#lngstycity_form").val($(this).val());
//                OBPager.SetTaskContentMemberValue('PersonalData.LongestStayCity', null, $('#currcity_form').val(), false);
//                var currcityId = $("#currcity_form").val();
//                if (currcityId == 'OTH') {
//                    $('#OtherLongestStayCity').show();
//                    $('#OtherCurrentCity').on('change', function () {
//                        OBPager.SetTaskContentMemberValue('PersonalData.OtherCurrentCity', null, $('#OtherCurrentCity').val(), false);
//                        $('#OtherLongestStayCity').val($('#OtherCurrentCity').val());
//                        OBPager.SetTaskContentMemberValue('PersonalData.OtherLongestCity', null, $('#OtherCurrentCity').val(), false);
//                        
//                    });


//                }
//                else {
//                    $('#lngstycity_form').removeAttr('disabled');
//                    $('#OtherLongestStayCity').hide();
//                }
//                
//            });
            var currcityId = $("#currcity_form").val();
            if (currcityId=='OTH') {
              
                OBPager.SetTaskContentMemberValue('PersonalData.OtherLongestCity', null, $('#OtherCurrentCity').val(), false);
                $('#OtherLongestStayCity').show();

            }
            else {
                $('#lngstycity_form').removeAttr('disabled');
                $('#OtherLongestStayCity').hide();
            }


        }
       
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayPinCode', null, $('#currPostal_form').val(), false);
//        $('#currPostal_form').on('change', function () {
//            OBPager.SetTaskContentMemberValue('PersonalData.CurrentPinCode', null, $('#currPostal_form').val(), false);
//            $('#lngstyPin').val($('#currPostal_form').val());
//            OBPager.SetTaskContentMemberValue('PersonalData.LongestStayPinCode', null, $('#currPostal_form').val(), false);
//        });

        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayDurationFrom', null, $('#currfrom_form').val(), false);
//        $('#currfrom_form').on('change', function () {
//            OBPager.SetTaskContentMemberValue('PersonalData.CurrentDurationFrom', null, $('#currfrom_form').val(), false);
//            $('#lngstyfrom_form').val($('#currfrom_form').val());
//            OBPager.SetTaskContentMemberValue('PersonalData.LongestStayDurationFrom', null, $('#currfrom_form').val(), false);
//        });

        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayDurationTo', null, $('#currto_form').val(), false);
//        $('#currto_form').on('change', function () {
//            OBPager.SetTaskContentMemberValue('PersonalData.CurrentDurationTo', null, $('#currto_form').val(), false);
//            $('#lngstyto_form').val($('#currto_form').val());
//            OBPager.SetTaskContentMemberValue('PersonalData.LongestStayDurationTo', null, $('#currto_form').val(), false);
//        });

        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayPhone', null, $('#currph_form').val(), false);
//        $('#currph_form').on('change', function () {
//            OBPager.SetTaskContentMemberValue('PersonalData.CurrentPhone', null, $('#currph_form').val(), false);
//            $('#lngstyph_form').val($('#currph_form').val());
//            OBPager.SetTaskContentMemberValue('PersonalData.LongestStayPhone', null, $('#currph_form').val(), false);
//        });

        OBPager.SetTaskContentMemberValue('PersonalData.IsSameCurrlngAddress', 1, '1', false);
        if ($('#currrent_form')[0].checked) {
            //   $('#disabledyes_form').attr('checked', 'checked');
            OBPager.SetTaskContentMemberValue('PersonalData.LongestStayNatureofLoc.Rent', 1, "true", false);
            $('#lngstyothersvalue_form').hide();
        }
        else if ($('#currown_form')[0].checked) {
            OBPager.SetTaskContentMemberValue('PersonalData.LongestStayNatureofLoc.Own', 1, "true", false);
            $('#lngstyothersvalue_form').hide();
        }
        else if ($('#currother_form')[0].checked) {

            OBPager.SetTaskContentMemberValue('PersonalData.LongestStayNatureofLoc.Other', 1, "true", false);
            $('#lngstyothersvalue_form').show();

            OBPager.SetTaskContentMemberValue('PersonalData.LongestStayNatureofLoc.OtherValue', 1, $('#currothervalue_form').val(), false);
        }

        //   OBPager.SetTaskContentMemberValue('PersonalData.CurrentNatureofLoc.Rent', null, "true", true);
        //  OBPager.SetTaskContentMemberValue('PersonalData.CurrentNatureofLoc.Own', null, $('#currown_form').val(), false);
        //  OBPager.SetTaskContentMemberValue('PersonalData.CurrentNatureofLoc.Other', null, $('#currother_form').val(), true);
       disableLongestAddressOnCheckBoxSelection();
    }
    else {
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayAddress', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayCountry', null, '-1', false);
        $('#lngstystate_form').empty();
        $('#lngstystate_form').attr("disabled", "true");
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayState', null, '', false);
        //$('#lngstycity_form').empty();
        $('#lngstycity_form').removeAttr('disabled');
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayCity', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.OtherLongestCity', null, '', false);
        $('#OtherLongestStayCity').hide();
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayPinCode', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayDurationFrom', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayDurationTo', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayPhone', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.IsSameCurrlngAddress', 1, '', false);

        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayNatureofLoc.Rent', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayNatureofLoc.Own', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayNatureofLoc.Other', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayNatureofLoc.OtherValue', 1, '', false);
        $('#lngstyothersvalue_form').hide();
        

    }


    jQXB.doBind(OBPager.taskContentDSName);

    if ($("#chklngstyaddress_form").is(':checked')) {
        disableLongestAddressOnCheckBoxSelection();
    }
    else {
        enableLongestAddress();
    }
}

function IsDisabled(flag) {
    if (flag == 1) {
        OBPager.SetTaskContentMemberValue('PersonalData.IsDisabled', 1, '1', false);
    }
    else {
        OBPager.SetTaskContentMemberValue('PersonalData.IsDisabled', 1, '', false);
    }
}

function disableLongestAddressOnCheckBoxSelection() {
    $("#lngstyaddress_form").prop('disabled', true);
    $("#lngstycountry_form").prop('disabled', true);
    $("#lngstystate_form").prop('disabled', true);
    $("#lngstycity_form").prop('disabled', true);
    $("#OtherLongestStayCity").prop('disabled', true);
    $("#lngstyPin").prop('disabled', true);
    $("#lngstyfrom_form").prop('disabled', true);
    $("#lngstyto_form").prop('disabled', true);
    $("#lngstyph_form").prop('disabled', true);
    $("#lngstyrent_form").prop('disabled', true);
    $("#lngstyown_form").prop('disabled', true);
    $("#lngstyothers_form").prop('disabled', true); 
}
function enableLongestAddress() {
    $("#lngstyaddress_form").removeAttr('disabled');
    $("#lngstycountry_form").removeAttr('disabled');
    $("#lngstystate_form").removeAttr('disabled');
    $("#lngstycity_form").removeAttr('disabled');
    $("#OtherLongestStayCity").removeAttr('disabled');
    $("#lngstyPin").removeAttr('disabled');
    $("#lngstyfrom_form").removeAttr('disabled');
    $("#lngstyto_form").removeAttr('disabled');
    $("#lngstyph_form").removeAttr('disabled');
    $("#lngstyrent_form").removeAttr('disabled');
    $("#lngstyown_form").removeAttr('disabled');
    $("#lngstyothers_form").removeAttr('disabled');
}

function disablePermanentAddressOnCheckBoxSelection() {
    $("#permaddress_form").prop('disabled', true);
    $("#permcountry_form").prop('disabled', true);
    $("#permstate_form").prop('disabled', true);
    $("#permcity_form").prop('disabled', true);
    $("#OtherPermanentCity").prop('disabled', true);
    $("#permpin_form").prop('disabled', true);
    $("#permfrom_form").prop('disabled', true);
    $("#permto_form").prop('disabled', true);
    $("#perph_form").prop('disabled', true);
    $("#permrent_form").prop('disabled', true);
    $("#permown_form").prop('disabled', true);
    $("#permother_form").prop('disabled', true);
}

function enablePermanentAddress() {
    $("#permaddress_form").prop("disabled", false);
    $("#permcountry_form").prop("disabled", false);
    $("#permstate_form").prop("disabled", false);
    $("#permcity_form").prop("disabled", false);
    $("#OtherPermanentCity").prop("disabled", false);
    $("#permpin_form").prop("disabled", false);
    $("#permfrom_form").prop("disabled", false);
    $("#permto_form").prop("disabled", false);
    $("#perph_form").prop("disabled", false);
    $("#permrent_form").prop("disabled", false);
    $("#permown_form").prop("disabled", false);
    $("#permother_form").prop("disabled", false);
}
$(function () {
    $(".jQrydatepicker").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar',
        yearRange: "-62:+0",
        maxDate: "0",
        showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    });

    $(".jQryExpdate").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar',
        yearRange: "2012:+50",
        showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    });
});




function CurrentNatureofLoc(flag) {
    if (flag == 1) {
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentNatureofLoc.Rent', 1, true, false);

        if ($("#chklngstyaddress_form").is(':checked')) {
            $("#lngstyrent_form").prop("checked", true);
            AODNatureofLoc(1)
        }
        if ($("#chkpermAddress_form").is(':checked')) {
            $("#permrent_form").prop("checked", true);
            PermNatureofLoc(1);
        }
        
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentNatureofLoc.Own', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentNatureofLoc.Other', 1, '', true);
        $('#currothervalue_form').hide();
    }


    if (flag == 2) {
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentNatureofLoc.Rent', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentNatureofLoc.Own', 1, true, false);
        if ($("#chklngstyaddress_form").is(':checked')) {
            $("#lngstyown_form").prop("checked", true);
            AODNatureofLoc(2)
        }
        if ($("#chkpermAddress_form").is(':checked')) {
            $("#permown_form").prop("checked", true);
            PermNatureofLoc(2);
        }
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentNatureofLoc.Other', 1, '', true);
        $('#currothervalue_form').hide();
    }

    if (flag == 3) {
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentNatureofLoc.Rent', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentNatureofLoc.Own', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentNatureofLoc.Other', 1, true, true);
        if ($("#chklngstyaddress_form").is(':checked')) {
            $("#lngstyothers_form").prop("checked", true);
            AODNatureofLoc(3);
            $('#currothervalue_form').on('change', function () {
                OBPager.SetTaskContentMemberValue('PersonalData.CurrentNatureofLoc.OtherValue', 1, $('#currothervalue_form').val(), false);
                $('#lngstyothersvalue_form').val($('#currothervalue_form').val());
                OBPager.SetTaskContentMemberValue('PersonalData.LongestStayNatureofLoc.OtherValue', 1, $('#currothervalue_form').val(), false);
            });
            
                
            
        }
        if ($("#chkpermAddress_form").is(':checked')) {
            $("#permother_form").prop("checked", true);
            PermNatureofLoc(3);
            $('#currothervalue_form').on('change', function () {
                OBPager.SetTaskContentMemberValue('PersonalData.CurrentNatureofLoc.OtherValue', 1, $('#currothervalue_form').val(), false);
                $('#permothervalue_form').val($('#currothervalue_form').val());
                OBPager.SetTaskContentMemberValue('PersonalData.PermanentNatureofLoc.OtherValue', 1, $('#currothervalue_form').val(), false);
            });
        }
        $('#currothervalue_form').show();
    }

}

function PermNatureofLoc(flag) {
    if (flag == 1) {
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentNatureofLoc.Rent', 1, true, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentNatureofLoc.Own', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentNatureofLoc.Other', 1, '', true);
        $('#permothervalue_form').hide();
    }

    if (flag == 2) {
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentNatureofLoc.Rent', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentNatureofLoc.Own', 1, true, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentNatureofLoc.Other', 1, '', true);
        $('#permothervalue_form').hide();
    }

    if (flag == 3) {
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentNatureofLoc.Rent', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentNatureofLoc.Own', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentNatureofLoc.Other', 1, true, true);
        $('#permothervalue_form').show();

    }

}

function AODNatureofLoc(flag) {

    if (flag == 1) {
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayNatureofLoc.Rent', 1, true, false);
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayNatureofLoc.Own', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayNatureofLoc.Other', 1, '', true);
        $('#lngstyothersvalue_form').hide();
    }

    if (flag == 2) {
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayNatureofLoc.Rent', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayNatureofLoc.Own', 1, true, false);
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayNatureofLoc.Other', 1, '', true);
        $('#lngstyothersvalue_form').hide();
    }

    if (flag == 3) {
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayNatureofLoc.Rent', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayNatureofLoc.Own', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayNatureofLoc.Other', 1, true, true);
        $('#lngstyothersvalue_form').show();
    }

}

function CheckCurrChange(flag) {
    if (flag == 1) {
        if ($("#chklngstyaddress_form").is(':checked')) {
            $('#curraddress_form').on('change', function () {
                OBPager.SetTaskContentMemberValue('PersonalData.CurrentAddress', null, $('#curraddress_form').val(), false);
                $('#lngstyaddress_form').val($('#curraddress_form').val());
                OBPager.SetTaskContentMemberValue('PersonalData.LongestStayAddress', null, $('#curraddress_form').val(), false);
            });
     
            $('#currcountry_form').on('change', function () {
                $("#lngstycountry_form").val($(this).val());
                $('#OtherLongestStayCity').hide();
                OBPager.SetTaskContentMemberValue('PersonalData.LongestStayCountry', null, $('#currcountry_form').val(), false);
                OBPager.SetTaskContentMemberValue('PersonalData.LongestStayState', null, null, false);
                OBPager.SetTaskContentMemberValue('PersonalData.LongestStayCity', null, null, false);
                OBPager.SetTaskContentMemberValue('PersonalData.OtherLongestCity', null, null, false);
                if ($('#currcountry_form').val() != -1) {
                    var lngstateId = $('#currcountry_form').val();
                    if (lngstateId != -1) {
                        OBPager.GetGeographyMaster(2, lngstateId, "LngstyStateList");
                        OBPager.GetGeographyMaster(63, lngstateId, "LngstyCityList");
                    }
                }
            });

            $('#currstate_form').on('change', function () {
                OBPager.SetTaskContentMemberValue('PersonalData.OtherCurrentCity', null, null, false);
                OBPager.SetTaskContentMemberValue('PersonalData.LongestStayCity', null, null, false);
                $("#lngstystate_form").val($(this).val());
                $('#OtherLongestStayCity').hide();
                OBPager.SetTaskContentMemberValue('PersonalData.LongestStayState', null, $('#currstate_form').val(), false);
            });

            $('#currcity_form').on('change', function () {
                $("#lngstycity_form").val($(this).val());
                OBPager.SetTaskContentMemberValue('PersonalData.LongestStayCity', null, $('#currcity_form').val(), false);
                var currcityId = $("#currcity_form").val();
                if (currcityId == 'OTH') {
                    $('#OtherLongestStayCity').show();
                    $('#OtherCurrentCity').on('change', function () {
                        OBPager.SetTaskContentMemberValue('PersonalData.OtherCurrentCity', null, $('#OtherCurrentCity').val(), false);
                        $('#OtherLongestStayCity').val($('#OtherCurrentCity').val());
                        OBPager.SetTaskContentMemberValue('PersonalData.OtherLongestCity', null, $('#OtherCurrentCity').val(), false);
                    });
                }
                else {
                    $('#lngstycity_form').removeAttr('disabled');
                    $('#OtherLongestStayCity').hide();
                }
            });

            $('#currPostal_form').on('change', function () {
                OBPager.SetTaskContentMemberValue('PersonalData.CurrentPinCode', null, $('#currPostal_form').val(), false);
                $('#lngstyPin').val($('#currPostal_form').val());
                OBPager.SetTaskContentMemberValue('PersonalData.LongestStayPinCode', null, $('#currPostal_form').val(), false);
            });
            
            $('#currfrom_form').on('change', function () {
                OBPager.SetTaskContentMemberValue('PersonalData.CurrentDurationFrom', null, $('#currfrom_form').val(), false);
                $('#lngstyfrom_form').val($('#currfrom_form').val());
                OBPager.SetTaskContentMemberValue('PersonalData.LongestStayDurationFrom', null, $('#currfrom_form').val(), false);
            });

           
            $('#currto_form').on('change', function () {
                OBPager.SetTaskContentMemberValue('PersonalData.CurrentDurationTo', null, $('#currto_form').val(), false);
                $('#lngstyto_form').val($('#currto_form').val());
                OBPager.SetTaskContentMemberValue('PersonalData.LongestStayDurationTo', null, $('#currto_form').val(), false);
            });

           
            $('#currph_form').on('change', function () {
                OBPager.SetTaskContentMemberValue('PersonalData.CurrentPhone', null, $('#currph_form').val(), false);
                $('#lngstyph_form').val($('#currph_form').val());
                OBPager.SetTaskContentMemberValue('PersonalData.LongestStayPhone', null, $('#currph_form').val(), false);
            });

        }

        if ($("#chkpermAddress_form").is(':checked')) {
            $('#curraddress_form').on('change', function () {
                OBPager.SetTaskContentMemberValue('PersonalData.CurrentAddress', null, $('#curraddress_form').val(), false);
                $('#permaddress_form').val($('#curraddress_form').val());
                OBPager.SetTaskContentMemberValue('PersonalData.PermanentAddress', null, $('#curraddress_form').val(), false);
            });


            $('#currcountry_form').on('change', function () {
                OBPager.SetTaskContentMemberValue('PersonalData.PermanentState', null, null, false);
                OBPager.SetTaskContentMemberValue('PersonalData.PermanentCity', null, null, false);
                OBPager.SetTaskContentMemberValue('PersonalData.OtherPermanentCity', null, null, false);
                $("#permcountry_form").val($(this).val());
                $('#OtherPermanentCity').hide();
                OBPager.SetTaskContentMemberValue('PersonalData.PermanentCountry', null, $('#currcountry_form').val(), false);
                if ($('#currcountry_form').val() != -1) {
                    var permstateId = $('#currcountry_form').val();
                    if (permstateId != -1) {
                        OBPager.GetGeographyMaster(2, permstateId, "PermStateList");
                        OBPager.GetGeographyMaster(63, permstateId, "PermCityList");
                    }
                }
            });




            $('#currstate_form').on('change', function () {
                    OBPager.SetTaskContentMemberValue('PersonalData.PermanentCity', null, null, false);
                OBPager.SetTaskContentMemberValue('PersonalData.OtherPermanentCity', null, null, false);
                    $("#permstate_form").val($(this).val());
                    $('#OtherPermanentCity').hide();
                    OBPager.SetTaskContentMemberValue('PersonalData.PermanentState', null, $('#currstate_form').val(), false);
                });

               
                $('#currcity_form').on('change', function () {
                    $("#permcity_form").val($(this).val());
                    OBPager.SetTaskContentMemberValue('PersonalData.PermanentCity', null, $('#currcity_form').val(), false);
                    var currcityId = $("#currcity_form").val();
                    if (currcityId == 'OTH') {
                        $('#OtherPermanentCity').show();
                        $('#OtherCurrentCity').on('change', function () {
                            OBPager.SetTaskContentMemberValue('PersonalData.OtherCurrentCity', null, $('#OtherCurrentCity').val(), false);
                            $('#OtherPermanentCity').val($('#OtherCurrentCity').val());
                            OBPager.SetTaskContentMemberValue('PersonalData.OtherPermanentCity', null, $('#OtherCurrentCity').val(), false);

                        });


                    }
                    else {
                        $('#permcity_form').removeAttr('disabled');
                        $('#OtherPermanentCity').hide();
                    }

                });

               

           
            $('#currPostal_form').on('change', function () {
                OBPager.SetTaskContentMemberValue('PersonalData.CurrentPinCode', null, $('#currPostal_form').val(), false);
                $('#permpin_form').val($('#currPostal_form').val());
                OBPager.SetTaskContentMemberValue('PersonalData.PermanentPinCode', null, $('#currPostal_form').val(), false);
            });

            
            $('#currfrom_form').on('change', function () {
                OBPager.SetTaskContentMemberValue('PersonalData.CurrentDurationFrom', null, $('#currfrom_form').val(), false);
                $('#permfrom_form').val($('#currfrom_form').val());
                OBPager.SetTaskContentMemberValue('PersonalData.PermanentDurationFrom', null, $('#currfrom_form').val(), false);
            });

            
            $('#currto_form').on('change', function () {
                OBPager.SetTaskContentMemberValue('PersonalData.CurrentDurationTo', null, $('#currto_form').val(), false);
                $('#permto_form').val($('#currto_form').val());
                OBPager.SetTaskContentMemberValue('PersonalData.PermanentDurationTo', null, $('#currto_form').val(), false);
            });

            
            $('#currph_form').on('change', function () {
                OBPager.SetTaskContentMemberValue('PersonalData.CurrentPhone', null, $('#currph_form').val(), false);
                $('#perph_form').val($('#currph_form').val());
                OBPager.SetTaskContentMemberValue('PersonalData.PermanentPhone', null, $('#currph_form').val(), false);
            });

        }
       

    }

}
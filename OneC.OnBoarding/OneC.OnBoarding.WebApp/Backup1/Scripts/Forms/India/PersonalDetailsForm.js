$().ready(function () {
    OBPager.ShowPage(1);

    OBPager.GetMaster(248, "PrefixList");
    OBPager.GetMaster(102, "SuffixList");
    OBPager.GetMaster(15, "MaritalList");
    OBPager.GetMaster(235, "GenderList");
    OBPager.GetMaster(13, "RelationshipList");
    OBPager.GetMaster(17, "BloodGroupList");
    OBPager.GetMaster(64, "SkillsRating");
    OBPager.GetGeographyMaster(1, 0, "CountryList");
    OBPager.GetMaster(241, "IfYesLocorVisorHearingList");
    $('#currstate_form').attr("disabled", "true");
    $('#citizenship_form').attr("disabled", "true");
    $('#permstate_form').attr("disabled", "true");
    $('#lngstystate_form').attr("disabled", "true");
    $('#passportstate_form').attr("disabled", "true");

    OBPager.GetMaster(116, "YesOrNo");

    $('#UAN1').hide();
    $('#UAN2').hide();
    $('#PF1').hide();
    $('#EarlyPFNo').hide();
    $('#Category').hide();


    var taskObj = JSON.parse(OBPager.strFormDetails).PersonalData;

    if (taskObj.EarlyPFNoYesOrNo == 'Y') {
        $('#PF1').show();
    }
    else {
        $('#PF1').hide();
    }

    //disabledYesorNo

    if (taskObj.IsDisabled == '1') {
        $('#disabledyes_Category').addClass('dropdown');
        $('#disabledyes_Category').show();
        $('#Category').show();
    }
    else {
        $('#disabledyes_Category').removeClass('dropdown');
        $('#disabledyes_Category').hide();
        $('#Category').hide();
    }

    if (taskObj.UANNoYesOrNo == 'Y') {
        $('#UAN1').show();
        $('#UAN2').show();
        $('#form_earlypfno').removeClass('dropdown');
        $('#EarlyPFNo').hide();
        $('#PF1').hide();
    }
    else {
        $('#form_earlypfno').addClass('dropdown');
        $('#UAN1').hide();
        $('#UAN2').hide();
    }

    if (taskObj.UANNoYesOrNo == 'N') {
        $('#EarlyPFNo').show();
        $('#form_earlypfno').addClass('dropdown');
    }
    else {
        $('#form_earlypfno').removeClass('dropdown');
        $('#EarlyPFNo').hide();
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
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentCity', null, TaskPrefillValues.PrefillValues.Set1.City, false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentCountry', null, TaskPrefillValues.PrefillValues.Set1.Country, false);
        if (TaskPrefillValues.PrefillValues.Set1.Country != null || TaskPrefillValues.PrefillValues.Set1.Country != '-1' || TaskPrefillValues.PrefillValues.Set1.Country != '') {
            OBPager.GetGeographyMaster(2, TaskPrefillValues.PrefillValues.Set1.Country, "CurrStateList");
            OBPager.SetTaskContentMemberValue('PersonalData.CurrentState', null, TaskPrefillValues.PrefillValues.Set1.State, false);
            $('#currstate_form').removeAttr('disabled');
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
        OBPager.SetTaskContentMemberValue('PersonalData.IsDisabled', null, '-1', false);
        OBPager.SetTaskContentMemberValue('PersonalData.IfYesLocorVisorHearingList', null, '-1', false);
        OBPager.SetTaskContentMemberValue('PersonalData.PanCardAvailability', 1, '1', false);

        $('#currothervalue_form').hide();
    }

    //Do a data bind finally

    jQXB.doBind(OBPager.taskContentDSName);





    $('#currcountry_form').change(function () {
        var currstateId = $('#currcountry_form').val();
        if (currstateId != -1) {
            $('#currstate_form').removeAttr('disabled');
            OBPager.GetGeographyMaster(2, currstateId, "CurrStateList");
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
            OBPager.GetGeographyMaster(2, permstateId, "PermStateList");
        }
    });

    $('#lngstycountry_form').change(function () {
        var lngstystateId = $('#lngstycountry_form').val();
        if (lngstystateId != -1) {
            $('#lngstystate_form').removeAttr('disabled');
            OBPager.GetGeographyMaster(2, lngstystateId, "LngstyStateList");
        }
    });


    $('#passportcountry_form').change(function () {
        var passportstateId = $('#passportcountry_form').val();
        if (passportstateId != -1) {
            $('#passportstate_form').removeAttr('disabled');
            OBPager.GetGeographyMaster(2, passportstateId, "PassportStateList");
        }
    });

    //    $(".frmtPFNo").focusout(function (e) {

    //        var $this = $(this);
    //        var val = $this.val();
    //        if (val.length != 0) {
    //            var rep = val.replace('/', '');
    //            val = rep;
    //            var padding = '';
    //            //var padding = val.replace('-', '');

    //            for (var i = val.length; i>6 && i < 22 ; i++) {
    //                padding += '0';
    //            }

    //            $(this).val(padding + $(this).val());
    //            var retvalue = formatUAN($(this));

    //            $(this).val(retvalue);
    //            if ($('#form_uanno_2')[0].value != null) {
    //                OBPager.SetTaskContentMemberValue('PersonalData.LastPFNo', null, $('#form_uanno_2')[0].value, false);
    //            }
    //            if ($('#form_pfno_1')[0].value != null) {
    //                OBPager.SetTaskContentMemberValue('PersonalData.EarlyPFNo', null, $('#form_pfno_1')[0].value, false);
    //            }
    //        } 
    //    });

    $('#nationality_form').change(function () {
        var nationality = $('#nationality_form').val();
        if (nationality != -1) {
            $('#citizenship_form').removeAttr('disabled');
            OBPager.GetGeographyMaster(11, nationality, "CitizenshipList");
        }
    });

    var Ispanmandatory = TaskPrefillValues.PrefillValues.Set1.IsPanMandatory;

    if (Ispanmandatory == 1) {
        $('#pannum_form').addClass('textMandatory');
        $('#panname_form').addClass('textMandatory');
        $('.pancls').show();
    }
    else {
        $('.pancls').hide();
        $('#pannum_form').removeClass('textMandatory');
        $('#panname_form').removeClass('textMandatory');

    }


    // m & a malaysia changes
    var Ismigrated = TaskPrefillValues.PrefillValues.Set1.IsMigratedCandidate;
    if (Ismigrated == 8) {
        $('.skillset').hide();
        $('.longestStay').hide();
        $('.mlypsprt').hide();
        $('.clsRemove').each(function () {
            var obj = $(this).attr('id');
            $('#' + obj).removeClass('dropdown');
            $('#' + obj).removeClass('radioBox');
            $('#' + obj).removeClass('Alphanumeric');
            $('#' + obj).removeClass('textMandatory');
            $('#' + obj).removeClass('dateMandatory')

        });
    }


    var isbgvinitiated = OBPager.IsBgvInitiated
    if (isbgvinitiated == 1) {
        $('.BgvSync').attr("disabled", "true");
        $('.BgvSync').removeClass("jQrydatepicker");
    }

    $(".pfreionalcode").keydown(function (event) {
        // Allow only backspace and delete 
        var obj = $(this).attr("id");
        var th = $("#" + obj).val().length;
        var p = $("#" + obj).val();
        var char = String.fromCharCode(event.which);
        if (th < 2) {
            // Allow only backspace and delete 
            if (event.keyCode == 9 || event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 20 || event.keyCode == 32 || event.keyCode == 88 || event.keyCode == 86 || event.keyCode == 67 || event.keyCode == 37 || event.keyCode == 39) {
            }
            else {
                if (event.keyCode < 65 || event.keyCode > 90) {
                    event.preventDefault();
                }
                else {
                    event.preventDefault();
                    $("#" + obj).val(p + char.toUpperCase());
                }
            }
        }
        if ($('#form_PFno_RC').val() != null) {
            OBPager.SetTaskContentMemberValue('PersonalData.LastPFNo_RC', null, $('#form_PFno_RC').val(), false);
        }
        if ($('#form_PFno_OC').val() != null) {
            OBPager.SetTaskContentMemberValue('PersonalData.LastPFNo_OC', null, $('#form_PFno_OC').val(), false);
        }
        if ($('#form_EarlyPFNo_RC').val() != null) {
            OBPager.SetTaskContentMemberValue('PersonalData.EarlyPFNo_RC', null, $('#form_EarlyPFNo_RC').val(), false);
        }
        if ($('#form_EarlyPFNo_OC').val() != null) {
            OBPager.SetTaskContentMemberValue('PersonalData.EarlyPFNo_OC', null, $('#form_EarlyPFNo_OC').val(), false);
        }

    });

    $(".pfocode").keydown(function (event) {
        // Allow only backspace and delete 
        var obj = $(this).attr("id");
        var th = $("#" + obj).val().length;
        var p = $("#" + obj).val();
        var char = String.fromCharCode(event.which);
        if (th < 3) {

            // Allow only backspace and delete 
            if (event.keyCode == 9 || event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 20 || event.keyCode == 32 || event.keyCode == 88 || event.keyCode == 86 || event.keyCode == 67 || event.keyCode == 37 || event.keyCode == 39) {
            }
            else {
                if (event.keyCode < 65 || event.keyCode > 90) {
                    event.preventDefault();
                }
                else {
                    event.preventDefault();
                    $("#" + obj).val(p + char.toUpperCase());
                }
            }

        }
        if ($('#form_PFno_RC').val() != null) {
            OBPager.SetTaskContentMemberValue('PersonalData.LastPFNo_RC', null, $('#form_PFno_RC').val(), false);
        }
        if ($('#form_PFno_OC').val() != null) {
            OBPager.SetTaskContentMemberValue('PersonalData.LastPFNo_OC', null, $('#form_PFno_OC').val(), false);
        }
        if ($('#form_EarlyPFNo_RC').val() != null) {
            OBPager.SetTaskContentMemberValue('PersonalData.EarlyPFNo_RC', null, $('#form_EarlyPFNo_RC').val(), false);
        }
        if ($('#form_EarlyPFNo_OC').val() != null) {
            OBPager.SetTaskContentMemberValue('PersonalData.EarlyPFNo_OC', null, $('#form_EarlyPFNo_OC').val(), false);
        }

    });


});






function PrePopulateValues() {

    var ccountryId = JSON.parse(OBPager.strFormDetails).PersonalData.CurrentCountry;
    if (ccountryId != -1 && ccountryId != null && ccountryId != '') {
        $('#currstate_form').removeAttr('disabled');
        OBPager.GetGeographyMaster(2, ccountryId, "CurrStateList");

    }

    var pcountryId = JSON.parse(OBPager.strFormDetails).PersonalData.PermanentCountry;
    if (pcountryId != -1 && pcountryId != null && pcountryId != '') {
        $('#permstate_form').removeAttr('disabled');
        OBPager.GetGeographyMaster(2, pcountryId, "PermStateList");
    }

    var lcountryId = JSON.parse(OBPager.strFormDetails).PersonalData.LongestStayCountry;
    if (lcountryId != -1 && lcountryId != null && lcountryId != '') {
        $('#lngstystate_form').removeAttr('disabled');
        OBPager.GetGeographyMaster(2, lcountryId, "LngstyStateList");
    }

    var pascountryId = JSON.parse(OBPager.strFormDetails).PersonalData.PassportCountry;
    if (pascountryId != -1 && pascountryId != null && pascountryId != '') {
        $('#passportstate_form').removeAttr('disabled');
        OBPager.GetGeographyMaster(2, pascountryId, "PassportStateList");
    }

    var nationality = JSON.parse(OBPager.strFormDetails).PersonalData.Nationality;
    if (nationality != -1 && nationality != null && nationality != '') {
        $('#citizenship_form').removeAttr('disabled');
        OBPager.GetGeographyMaster(11, nationality, "CitizenshipList");
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

    var ismobilechecked = JSON.parse(OBPager.strFormDetails).PersonalData.IsMobileCheck;
    if (ismobilechecked == 1) {
        $('#ismobilecheckyes_form').attr('checked', 'checked');
    }
    else if (ismobilechecked == 0) {
        $('#ismobilecheckno_form').attr('checked', 'checked');
    }

    var othersFlag = JSON.parse(OBPager.strFormDetails).PersonalData.CurrentNatureofLoc.Other;
    if (othersFlag == 1 || othersFlag == 'true') {
        $('#currothervalue_form').show();
    }
    else {
        $('#currothervalue_form').hide();
    }

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

    //    var pancardID = JSON.parse(OBPager.strFormDetails).PersonalData.PanCardAvailability;
    //    if (pancardID == 1) {
    //        $('#panavail_form').val('Y');
    //        $('#pannum_form').removeAttr('disabled').addClass('Alphanumeric');
    //        $('#panname_form').removeAttr('disabled');
    //        $('.pancls').show();
    //    }
    //    else {
    //        $('#panavail_form').val('N');
    //        $('#pannum_form').attr("disabled", "true").removeClass('Alphanumeric');
    //        $('#panname_form').attr("disabled", "true");
    //        $('.pancls').hide();
    //    }

    var candidateType = TaskPrefillValues.PrefillValues.Set1.CandidateType;

    //Hide Office Phone Number and skillset for Campus Candidates
    if (candidateType == 2) {
        $('#ofclst_form').hide();
        $('.skillset').hide();

    }
    else {
        $('#ofclst_form').show();
        $('.skillset').show();

    }


    var IsMigratedCandidate = TaskPrefillValues.PrefillValues.Set1.IsMigratedCandidate;
    if (IsMigratedCandidate == 3) {
        $("#ismigrated").hide();
    }


}

function formatPFNum(obj1) {
    var id1 = $(obj1).attr("id");
    var obj2 = $("#" + id1);
    var val1 = obj2.val();
    var j = 0;
    obj2.val('');
    if (val1.length != 0) {
        var padding1 = '';
        if ((id1 == 'form_PFno_Ex') || (id1=='form_EarlyPFNo_Ex'))
            j = 3;
        else
            j = 7;


        for (var a = val1.length; a < j; a++) {
            padding1 += '0';
        }
        if (id1 == 'form_PFno_Ex') {
            $('#form_PFno_Ex').val(padding1 + val1);
            OBPager.SetTaskContentMemberValue('PersonalData.LastPFNo_Ex', null, $('#form_PFno_Ex').val(), false);
        }
        else if (id1 == 'form_PFno_EI') {
            $('#form_PFno_EI').val(padding1 + val1);
            OBPager.SetTaskContentMemberValue('PersonalData.LastPFNo_EI', null, $('#form_PFno_EI').val(), false);
        }
        else if (id1 == 'form_PFno_AN') {
            $('#form_PFno_AN').val(padding1 + val1);
            OBPager.SetTaskContentMemberValue('PersonalData.LastPFNo_AN', null, $('#form_PFno_AN').val(), false);
        }
        else if (id1 == 'form_EarlyPFNo_EI') {
            $('#form_EarlyPFNo_EI').val(padding1 + val1);
            OBPager.SetTaskContentMemberValue('PersonalData.EarlyPFNo_EI', null, $('#form_EarlyPFNo_EI').val(), false);
        }
        else if (id1 == 'form_EarlyPFNo_Ex') {
            $('#form_EarlyPFNo_Ex').val(padding1 + val1);
            OBPager.SetTaskContentMemberValue('PersonalData.EarlyPFNo_Ex', null, $('#form_EarlyPFNo_Ex').val(), false);
        }
        else if (id1 == 'form_EarlyPFNo_AN') {
            $('#form_EarlyPFNo_AN').val(padding1 + val1);
            OBPager.SetTaskContentMemberValue('PersonalData.EarlyPFNo_AN', null, $('#form_EarlyPFNo_AN').val(), false);
        }
    }
}

function SaveTaskData(saveMode) {
    if ($('#disabledYesorNo').val() == 2) {
        OBPager.SetTaskContentMemberValue('PersonalData.IfYesLocorVisorHearingList', 1, '', false);
    }
    if ($('#form_uanno').val() == "N") {
        OBPager.SetTaskContentMemberValue('PersonalData.UANNo', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.LastPFNo_RC', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.LastPFNo_OC', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.LastPFNo_EI', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.LastPFNo_Ex', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.LastPFNo_AN', 1, '', false)
    }
    if (($('#form_earlypfno').val() == "N") || ($('#form_uanno').val() == "Y")) {
        OBPager.SetTaskContentMemberValue('PersonalData.EarlyPFNoYesOrNo', 1, 'N', false);
        OBPager.SetTaskContentMemberValue('PersonalData.EarlyPFNo_RC', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.EarlyPFNo_OC', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.EarlyPFNo_EI', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.EarlyPFNo_Ex', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.EarlyPFNo_AN', 1, '', false);
    }
    if (($('#form_uanno').val() == "Y")) {
        OBPager.SetTaskContentMemberValue('PersonalData.EarlyPFNoYesOrNo', 1, '', false);
    }
    // saveMode { 0:Save, 1:Submit }
    if (saveMode == 1) {
        OBPager.SetTaskContentMemberValue('PersonalData.PanCardAvailability', 1, '1', false);
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
        OBPager.SetTaskContentMemberValue('PersonalData.PanCardAvailability', 1, '1', false);
        OBPager.SetTaskContentMemberValue('PersonalData.IsDisabled', null, '-1', false);
        OBPager.SetTaskContentMemberValue('PersonalData.IfYesLocorVisorHearingList', null, '-1', false);

        $('#form_uanno').val('-1');
        $('#form_earlypfno').val('-1');
        $('#UAN1').hide();
        $('#UAN2').hide();
        $('#PF1').hide();
        $('#EarlyPFNo').hide();
        $('#Category').hide();
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
        $('.passportddetails').find('img').show();
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
        $('.passportddetails').find('img').hide();
        $('.passportddetails').find('.alert_f_text').remove();
        alert('Please apply passport before joining.');
    }

}


//function chkPanAvailability() {
//    if ($('#panavail_form').val() == 'Y') {
//        $('#pannum_form').removeAttr('disabled').addClass('Alphanumeric');
//        $('#panname_form').removeAttr('disabled').addClass('Alphanumeric');
//        $('.pancls').parent('label').removeClass('notMandatory');
//        $('.pancls').show();
//        OBPager.SetTaskContentMemberValue('PersonalData.PanCardAvailability', 1, '1', false);
//    }
//    else {
//        OBPager.SetTaskContentMemberValue('PersonalData.PanCardAvailability', 1, '', false);
//        OBPager.SetTaskContentMemberValue('PersonalData.PanCardName', null, '', false);
//        OBPager.SetTaskContentMemberValue('PersonalData.NationalID', null, '', false);
//        $('#pannum_form').attr("disabled", "true").removeClass('Alphanumeric');
//        $('#panname_form').attr("disabled", "true").removeClass('Alphanumeric');
//        $('.pancls').parent('label').addClass('notMandatory');
//        $('.pancls').hide();
//        $('.pancarddetails').find('img').remove();
//        $('.pancarddetails').find('.alert_f_text').remove();
//        jQXB.doBind(OBPager.taskContentDSName);
//        alert('Please apply pan card before joining.');
//    }

//}




function ChkPemanentAddress() {
    if ($("#chkpermAddress_form").is(':checked')) {
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentAddress', null, $('#curraddress_form').val(), false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentCountry', null, $('#currcountry_form').val(), false);
        if ($('#currcountry_form').val() != -1) {

            var permstateId = $('#currcountry_form').val();
            if (permstateId != -1) {
                $('#permstate_form').removeAttr('disabled');
                OBPager.GetGeographyMaster(2, permstateId, "PermStateList");
            }
            OBPager.SetTaskContentMemberValue('PersonalData.PermanentState', null, $('#currstate_form').val(), false);
        }
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentCity', null, $('#currcity_form').val(), false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentPinCode', null, $('#currpin_form').val(), false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentDurationFrom', null, $('#currfrom_form').val(), false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentDurationTo', null, $('#currto_form').val(), false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentPhone', null, $('#currph_form').val(), false);


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

    }
    else {
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentAddress', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentCountry', null, '-1', false);
        $('#permstate_form').empty();
        $('#permstate_form').attr("disabled", "true");
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentState', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentCity', null, '', false);
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
    }
    jQXB.doBind(OBPager.taskContentDSName);

}



function ChklongeststayAddress() {
    if ($("#chklngstyaddress_form").is(':checked')) {
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayAddress', null, $('#curraddress_form').val(), false);
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayCountry', null, $('#currcountry_form').val(), false);
        if ($('#currcountry_form').val() != -1) {

            var permstateId = $('#currcountry_form').val();
            if (permstateId != -1) {
                $('#lngstystate_form').removeAttr('disabled');
                OBPager.GetGeographyMaster(2, permstateId, "LngstyStateList");
            }
            OBPager.SetTaskContentMemberValue('PersonalData.LongestStayState', null, $('#currstate_form').val(), false);
        }
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayCity', null, $('#currcity_form').val(), false);
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayPinCode', null, $('#currpin_form').val(), false);
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayDurationFrom', null, $('#currfrom_form').val(), false);
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayDurationTo', null, $('#currto_form').val(), false);
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayPhone', null, $('#currph_form').val(), false);
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

    }
    else {
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayAddress', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayCountry', null, '-1', false);
        $('#lngstystate_form').empty();
        $('#lngstystate_form').attr("disabled", "true");
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayState', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.LongestStayCity', null, '', false);
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
}

function IsDisabled(flag) {
    if (flag == 1) {
        OBPager.SetTaskContentMemberValue('PersonalData.IsDisabled', 1, '1', false);
        
    }
    else {
        OBPager.SetTaskContentMemberValue('PersonalData.IsDisabled', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.IfYesLocorVisorHearingList', 1,'' , false);
    }
}

function IsMobileCheck(flag) {
    if (flag == 1) {
        OBPager.SetTaskContentMemberValue('PersonalData.IsMobileCheck', 1, '1', false);
        alert("I acknowledge that I’m willing to receive SMS from Cognizant on the mobile number mentioned above.");
    }
    else {
        OBPager.SetTaskContentMemberValue('PersonalData.IsMobileCheck', 1, '0', false);
        alert("Cognizant would trigger only official details pertaining to joining through this sms. I acknowledge that I’m not willing to receive SMS from Cognizant.");
    }
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
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentNatureofLoc.Own', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentNatureofLoc.Other', 1, '', true);
        $('#currothervalue_form').hide();
    }


    if (flag == 2) {
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentNatureofLoc.Rent', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentNatureofLoc.Own', 1, true, false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentNatureofLoc.Other', 1, '', true);
        $('#currothervalue_form').hide();
    }

    if (flag == 3) {
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentNatureofLoc.Rent', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentNatureofLoc.Own', 1, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentNatureofLoc.Other', 1, true, true);
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

function UANNo() {
    if ($('#form_uanno').val() == 'Y') {
        $('#UAN1').show();
        $('#UAN2').show();
        $('#EarlyPFNo').hide();
        $('#PF1').hide();
        $('#form_earlypfno').removeClass('dropdown');

    }
    else {
        $('#UAN1').hide();
        $('#UAN2').hide();
        $('#form_earlypfno').addClass('dropdown');
        //        OBPager.SetTaskContentMemberValue('PersonalData.UANNo', 1, 1, false);
        //        OBPager.SetTaskContentMemberValue('PersonalData.LastPFNo', 1, 1, false);
        //        document.getElementById('form_uanno_1').value = '';
        //        document.getElementById('form_uanno_2').value = '';                
    }
    if ($('#form_uanno').val() == 'N') {
        $('#EarlyPFNo').show();
        $('#form_earlypfno').addClass('dropdown');
    }
    else {
        $('#EarlyPFNo').hide();
        $('#form_earlypfno').removeClass('dropdown');
    }
}


function IsDisabled() {
    if ($('#disabledYesorNo').val() == '1') {
        var taskObj = JSON.parse(OBPager.strFormDetails).PersonalData;
        $('#disabledyes_Category').addClass('dropdown');

        if (taskObj.IfYesLocorVisorHearingList == null || taskObj.IfYesLocorVisorHearingList == '-1') 
        {
                OBPager.SetTaskContentMemberValue('PersonalData.IfYesLocorVisorHearingList', null, '-1', false);
            }
        $('#disabledyes_Category').show();
        $('#Category').show();
        //        $('#UAN2').show();
        //        $('#EarlyPFNo').hide();
        //        $('#PF1').hide();
        //        $('#form_earlypfno').removeClass('dropdown');

    }
    else {

        $('#Category').hide();
        $('#disabledyes_Category').removeClass('dropdown');
        $('.disabledyes_Category').val(-1);
        
        //        $('#UAN1').hide();
        //        $('#UAN2').hide();
        //        $('#form_earlypfno').addClass('dropdown');
        //        OBPager.SetTaskContentMemberValue('PersonalData.UANNo', 1, 1, false);
        //        OBPager.SetTaskContentMemberValue('PersonalData.LastPFNo', 1, 1, false);
        //        document.getElementById('form_uanno_1').value = '';
        //        document.getElementById('form_uanno_2').value = '';                
    }
    //    if ($('#disabledYesorNo').val() == 'N') {
    //        $('#EarlyPFNo').show();
    //        $('#form_earlypfno').addClass('dropdown');
    //    }
    //    else {
    //        $('#EarlyPFNo').hide();
    //        $('#form_earlypfno').removeClass('dropdown');
    //    }

}


function EarlyPFNo() {
    if ($('#form_earlypfno').val() == 'Y') {
        $('#PF1').show();
    }
    else {
        $('#PF1').hide();
    }
}

function formatUAN(obj) {
    var format = '';
    var numbers = obj.val().replace(/\D/g, ''),
         ////char = { 0: '', 1: '', 2: '-', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '', 10: '', 11: '-' };
    char = { 0: '', 1: '', 2: '/', 3: '', 4: '', 5: '', 6: '/', 7: '', 8: '', 9: '', 10: '', 11: '', 12: '', 13: '', 14: '/', 15: '', 16: '', 17: '', 18: '/', 19: '', 20: '', 21: '', 22: '', 23: '', 24: '', 25: '' };
    obj.val('');
    for (var a = 0; a < numbers.length; a++) {
        format += (char[a] || '') + numbers.charAt(a);

    }
    obj.val(format);
    //    $("#MDF_Number").val(obj.value);
    return obj.val();

    
};



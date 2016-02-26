var ValidationMessage;
$().ready(function () {


    $.fn.ssn = function () {
        return this.each(function () {
            var b = $(this).attr('jqxb-datamember');
            $(this).val($(this).val().replace(/^(\d{3})(\d{3})/, '$1-$2-'));
            OBPager.SetTaskContentMemberValue(b, 1, $(this).val(), true);

        })
    }
    OBPager.GetMaster(20, "PrefixList");
    OBPager.GetMaster(15, "MaritalList");
    OBPager.GetMaster(14, "GenderList");
    OBPager.GetMaster(13, "RelationshipList");
    OBPager.GetMaster(52, "EPTypeList");
    OBPager.GetGeographyMaster(1, 0, "CountryList");
    $('#currstate_form').attr("disabled", "true");
  

    PrePopulateValues();

    if (OBPager.taskStatusFlag == -1) {
        // Set member value manually

        OBPager.SetTaskContentMemberValue('PersonalData.Prefix', null, TaskPrefillValues.PrefillValues.Set1.Prefix, true);
        OBPager.SetTaskContentMemberValue('PersonalData.FirstName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.MiddleName', null, TaskPrefillValues.PrefillValues.Set1.MiddleName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.LastName', null, TaskPrefillValues.PrefillValues.Set1.LastName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.MaritalStatus', null, TaskPrefillValues.PrefillValues.Set1.MaritalStatus, true);
        OBPager.SetTaskContentMemberValue('PersonalData.DOB', null, TaskPrefillValues.PrefillValues.Set2.DateOfBirth, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Gender', null, TaskPrefillValues.PrefillValues.Set1.Gender, true);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentAddress', null, TaskPrefillValues.PrefillValues.Set1.AddressDetails, false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentCity', null, TaskPrefillValues.PrefillValues.Set1.City, false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentPinCode', null, TaskPrefillValues.PrefillValues.Set1.PostalCode, false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentCountry', null, TaskPrefillValues.PrefillValues.Set1.Country, false);
        OBPager.SetTaskContentMemberValue('PersonalData.HomePh', null, TaskPrefillValues.PrefillValues.Set1.HomePhone, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Mobile', null, TaskPrefillValues.PrefillValues.Set1.MobilePhone, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmailId', null, TaskPrefillValues.PrefillValues.Set1.PersonalEmail, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactName', null, TaskPrefillValues.PrefillValues.Set1.ECName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactNo', null, TaskPrefillValues.PrefillValues.Set1.EmergencyPhone, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactRelationship', null, TaskPrefillValues.PrefillValues.Set1.Relationship, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyPhoneType', null, TaskPrefillValues.PrefillValues.Set1.EPType, false);
        OBPager.SetTaskContentMemberValue('PersonalData.NationalID', null, TaskPrefillValues.PrefillValues.Set1.NationalId, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmploymentEligibility.Citizen', 1, "true", true);
        $('#currcity_form').attr("disabled", "true");

    }

    jQXB.doBind(OBPager.taskContentDSName);

    $('#currcountry_form').change(function () {
        var currstateId = $('#currcountry_form').val();
        if (currstateId != -1) {
            $('#currstate_form').removeAttr('disabled');
            OBPager.GetGeographyMaster(2, currstateId, "CurrStateList");
        }
    });

    $('#currstate_form').change(function () {
        var currstateId = $('#currcountry_form').val();
        if (currstateId != -1) {
            $('#currcity_form').removeAttr('disabled');
        }
    });

    ssnCheck();
    if (OBPager.taskStatusFlag == -1) {
        $('input.phone').each(function () {
            var a = $(this).attr('id');
            var b = $(this).attr('jqxb-datamember');
            $('#' + a).val($('#' + a).val().replace(/^(\d{3})(\d{3})/, '($1)$2-'));
            OBPager.SetTaskContentMemberValue(b, 1, $('#' + a).val(), true);
        })
        $('#securityForm').ssn();
    }
    ssnCheckDisable();
    OBPager.ShowPage(1);

});




function SaveTaskData(saveMode) {
    // saveMode { 0:Save, 1:Submit }
    if (saveMode == 1) {
        if (validate.ValidateSubmit() == true) {
            if (OBPager.ValidateTaskData(saveMode) == true) {
                try {
                    MsgboxConfirm(sessionId, 6, 217, 'FORM_ONSAVEORSUBMIT_CNFRM_NA', "<p style=line-height:20px;>Please verify the details on the personal data form before you submit as the data saved in this form will be displayed in all other forms.</p>", submitcallback);
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
            MsgboxConfirm(sessionId, 6, 217, 'FORM_ONSAVEORSUBMIT_CNFRM_NA', "<p style=line-height:20px;>Please verify the details on the personal data form before you submit as the data saved in this form will be displayed in all other forms.</p>", savecallback);
        }
        catch (e) {
        }
    }


}

function ResetTaskData() {
    OBPager.ResetTaskContent();
    if (OBPager.taskStatusFlag == -1) {
        // Set member value manually
        OBPager.SetTaskContentMemberValue('PersonalData.Prefix', null, TaskPrefillValues.PrefillValues.Set1.Prefix, true);
        OBPager.SetTaskContentMemberValue('PersonalData.FirstName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.MiddleName', null, TaskPrefillValues.PrefillValues.Set1.MiddleName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.LastName', null, TaskPrefillValues.PrefillValues.Set1.LastName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.MaritalStatus', null, TaskPrefillValues.PrefillValues.Set1.MaritalStatus, true);
        OBPager.SetTaskContentMemberValue('PersonalData.DOB', null, TaskPrefillValues.PrefillValues.Set2.DateOfBirth, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Gender', null, TaskPrefillValues.PrefillValues.Set1.Gender, true);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentAddress', null, TaskPrefillValues.PrefillValues.Set1.AddressDetails, false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentCity', null, TaskPrefillValues.PrefillValues.Set1.City, false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentPinCode', null, TaskPrefillValues.PrefillValues.Set1.PostalCode, false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentCountry', null, TaskPrefillValues.PrefillValues.Set1.Country, false);
        OBPager.SetTaskContentMemberValue('PersonalData.HomePh', null, TaskPrefillValues.PrefillValues.Set1.HomePhone, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Mobile', null, TaskPrefillValues.PrefillValues.Set1.MobilePhone, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmailId', null, TaskPrefillValues.PrefillValues.Set1.PersonalEmail, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactName', null, TaskPrefillValues.PrefillValues.Set1.ECName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactNo', null, TaskPrefillValues.PrefillValues.Set1.EmergencyPhone, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactRelationship', null, TaskPrefillValues.PrefillValues.Set1.Relationship, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyPhoneType', null, TaskPrefillValues.PrefillValues.Set1.EPType, false);
        OBPager.SetTaskContentMemberValue('PersonalData.NationalID', null, TaskPrefillValues.PrefillValues.Set1.NationalId, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmploymentEligibility.Citizen', 1, "true", true);
        jQXB.doBind(OBPager.taskContentDSName);

        $('input.phone').each(function () {
            var a = $(this).attr('id');
            var b = $(this).attr('jqxb-datamember');
            $('#' + a).val($('#' + a).val().replace(/^(\d{3})(\d{3})/, '($1)$2-'));
            OBPager.SetTaskContentMemberValue(b, 1, $('#' + a).val(), true);
        });
        $('#securityForm').ssn();
    }
}

$(function () {
    $("#dobForm").datepicker({
        dateFormat: 'mm/dd/yy',
        yearRange: "1940:-18",
        buttonText: 'Open calendar',
        showOn: "both", buttonImage: "../../../../Images/calendar.png",
        changeMonth: true,
        changeYear: true,
        hideIfNoPrevNext: true,
        buttonAfter: false
    });

    $(".phone").keydown(function (event) {
        var obj = $(this).attr("id");
        var th = $("#" + obj).val().length;
        var p = $("#" + obj).val();
        if (th < 14) {
            if (event.keyCode == 8) {

            }
            else {
                if (th == 3) {
                    $("#" + obj).val('(' + p + ')');
                }
                if (th == 8) {
                    $("#" + obj).val(p + '-');
                }
            }
        }

    });
    $(".ssn").keydown(function (event) {

        var th = $(".ssn").val().length;
        var p = $(".ssn").val();

        if (th < 11) {
            if (event.keyCode == 8) {

            }
            else {
                if (th == 3) {
                    $(".ssn").val(p + '-');
                }
                if (th == 6) {
                    $(".ssn").val(p + '-');
                }
            }
        }

    });


});


function EligibilityUSCitizen() {

    OBPager.SetTaskContentMemberValue('PersonalData.EmploymentEligibility.Citizen', 1, "true", false);
    OBPager.SetTaskContentMemberValue('PersonalData.EmploymentEligibility.AlienTemporary', 1, "", false);
    OBPager.SetTaskContentMemberValue('PersonalData.EmploymentEligibility.PermanentResidence', 1, "", true);
}

function EligibilityAlienTemporary() {
    OBPager.SetTaskContentMemberValue('PersonalData.EmploymentEligibility.Citizen', 1, "", false);
    OBPager.SetTaskContentMemberValue('PersonalData.EmploymentEligibility.AlienTemporary', 1, "true", false);
    OBPager.SetTaskContentMemberValue('PersonalData.EmploymentEligibility.PermanentResidence', 1, "", true);
}
function EligibilityPermanentResident() {
    OBPager.SetTaskContentMemberValue('PersonalData.EmploymentEligibility.Citizen', 1, "", false);
    OBPager.SetTaskContentMemberValue('PersonalData.EmploymentEligibility.AlienTemporary', 1, "", false);
    OBPager.SetTaskContentMemberValue('PersonalData.EmploymentEligibility.PermanentResidence', 1, "true", true);
}

function PrePopulateValues() {

    var ccountryId = JSON.parse(OBPager.strFormDetails).PersonalData.BirthCountry;
    if (ccountryId != -1 && ccountryId != null && ccountryId != '') {
        $('#currstate_form').removeAttr('disabled');
        OBPager.GetGeographyMaster(2, ccountryId, "CurrStateList");
    }
}


$('#SSNCheck').live("click", function () {
    ssnCheck();
});
$('#securityForm').live("change", function () {
    ssnCheckDisable();
    ssnCheck();
});
function ssnCheck() {
    if ($('#SSNCheck').is(':checked') == true) {
        OBPager.SetTaskContentMemberValue('PersonalData.SSNCheck', null, "true", true);
        $('#securityForm').siblings('img').remove();
        $('#securityForm').siblings('.alert_f_text').remove();
        $('#securityForm').removeClass('textMandatory').attr('readonly', true);
    } else {

        OBPager.SetTaskContentMemberValue('PersonalData.SSNCheck', null, "", true);
        $('#securityForm').addClass('textMandatory').attr('readonly', false);
    }
}
function ssnCheckDisable() {
    var ssnValue = $('#securityForm').val();
    if (ssnValue.length == 0) {
        $('#SSNCheck').attr('disabled', false);
        $('#securityForm').addClass('textMandatory');
    }
    else {
        $('#SSNCheck').attr('disabled', true);
        $('#securityForm').removeClass('textMandatory');
        OBPager.SetTaskContentMemberValue('PersonalData.SSNCheck', null, "", true);
    }

}

function submitcallback(value) {
    try {
        if (value) {
            if (OBPager.SaveTaskData(1) == true) {

                return true;
            }
            else {
                return false;
            }

        }
        else {

            return false;
        }


    }
    catch (e) { }
}

function savecallback(value) {
    try {
        if (value) {
            if (OBPager.SaveTaskData(0) == true) {

                return true;
            }
            else {
                return false;
            }

        }
        else {

            return false;
        }


    }
    catch (e) { }
}

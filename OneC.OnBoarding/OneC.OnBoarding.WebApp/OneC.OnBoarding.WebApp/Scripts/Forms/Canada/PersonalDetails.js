var ValidationMessage;
$().ready(function () {
    OBPager.GetMaster(20, "PrefixList");
    OBPager.GetMaster(15, "MaritalList");
    OBPager.GetMaster(14, "GenderList");
    OBPager.GetMaster(13, "RelationshipList");
    OBPager.GetMaster(52, "EPTypeList");
    OBPager.GetGeographyMaster(1, 0, "CountryList");
    $.fn.ssn = function () {
        return this.each(function () {
            $(this).val($(this).val().replace(/^(\d{3})(\d{3})/, '$1-$2-'));
        })
    }
    //Prefill the values at the first time when task not even saved 
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
    }
    jQXB.doBind(OBPager.taskContentDSName);
    if (OBPager.taskStatusFlag == -1) {
        $('input.phone').each(function () {
            var a = $(this).attr('id');
            $('#' + a).val($('#' + a).val().replace(/^(\d{3})(\d{3})/, '($1)$2-'));
        })
        $('#securityForm').ssn();
    }
//    var inputText = $('#addressForm').val().length;
//    if (inputText == 0) {
//        $('#addressForm').removeClass('Alphanumeric').addClass('textMandatory');
//        $('.textMandatory').change(validate.textMandatory);
//    } else {
//        $('#addressForm').addClass('Alphanumeric');
//        $('.Alphanumeric').change(validate.textAlphanumeric);
//    }
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
        OBPager.SetTaskContentMemberValue('PersonalData.DOB', null, TaskPrefillValues.PrefillValues.Set1.DateOfBirth, false);
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
        //Do a data bind finally
        jQXB.doBind(OBPager.taskContentDSName);
        $('input.phone').each(function () {
            var a = $(this).attr('id');
            $('#' + a).val($('#' + a).val().replace(/^(\d{3})(\d{3})/, '($1)$2-'));



        })
    }
}

$(function () {
    $("#dobForm").datepicker({
        dateFormat: 'mm/dd/yy',
        yearRange: "1940:+0",
        maxDate: "0",
        buttonText: 'Open calendar',
        showOn: "both", buttonImage: "../../../../Images/calendar.png",
        changeMonth: true,
        changeYear: true,
        hideIfNoPrevNext:true,
        buttonAfter: false
    });
});

function EligibilityCanadianCitizen() {
    OBPager.SetTaskContentMemberValue('PersonalData.EmploymentEligibility.Citizen', 1, true, false);
    OBPager.SetTaskContentMemberValue('PersonalData.EmploymentEligibility.AlienTemporary', 1, "", false);
    OBPager.SetTaskContentMemberValue('PersonalData.EmploymentEligibility.PermanentResidence', 1, "", true);
}

function EligibilityAlienTemporary() {
    OBPager.SetTaskContentMemberValue('PersonalData.EmploymentEligibility.Citizen', 1, "", false);
    OBPager.SetTaskContentMemberValue('PersonalData.EmploymentEligibility.AlienTemporary', 1, true, false);
    OBPager.SetTaskContentMemberValue('PersonalData.EmploymentEligibility.PermanentResidence', 1, "", true);
}
function EligibilityPermanentResident() {
    OBPager.SetTaskContentMemberValue('PersonalData.EmploymentEligibility.Citizen', 1, "", false);
    OBPager.SetTaskContentMemberValue('PersonalData.EmploymentEligibility.AlienTemporary', 1, "", false);
    OBPager.SetTaskContentMemberValue('PersonalData.EmploymentEligibility.PermanentResidence', 1, true, true);
}

//$('#addressForm').live("paste change mouseleave focus", function (e){

//   $(e.target).mouseleave(value);
//   // $(e.target).change(value);
//});
//function value(e)  {
//    var inputText = $(e.target).val().length;
//    if (inputText == 0) {
//        $(this).removeClass('Alphanumeric').addClass('textMandatory');
//        $('#addressForm').removeAttr('title').attr('title', 'Address');
//        $('.textMandatory').change(validate.textMandatory);
//      
//    } else if (inputText > 0 && inputText < 201) {

//        $('#addressForm').removeClass('textMandatory').addClass('Alphanumeric');
//        $('#addressForm').removeAttr('title').attr('title', 'Address(,.:#@;/)');
//        $('.Alphanumeric').change(validate.textAlphanumeric);
//    }
//    if (inputText >= 200) {
//        var field = this.document.getElementById(this.id);
//        if (field.value.length > 200)
//            field.value = field.value.substring(0, 200);

//    }

//}
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
                alert("error occured while saving the task");
                return false;
            }

        }
        else {

            return false;
        }


    }
    catch (e) { }
}



$().ready(function () {


    OBPager.GetMaster(20, "PrefixList");
    OBPager.GetMaster(15, "MaritalList");
    OBPager.GetMaster(14, "GenderList");
    OBPager.GetMaster(13, "RelationshipList");
    OBPager.GetGeographyMaster(1, 0, "CountryList");
    OBPager.GetMaster(101, "AccountTypeList");
    OBPager.GetMaster(171, "CountyTypeList");
    OBPager.GetMaster(192, "CurrentCityList");
    OBPager.GetMaster(202, "NationalityList");

    OBPager.GetMaster(210, "Ethnicity");
    OBPager.GetMaster(212, "Religion");
    OBPager.GetMaster(116, "Disability");
    OBPager.GetMaster(213, "SexualOrientation");

    $('#county_form').attr('disabled', 'true');

    $('#Others1').hide();
    $('#Others2').hide();
    $('#Others3').hide();


    var taskObj = JSON.parse(OBPager.strFormDetails).PersonalData;

    if (taskObj.IsNationalIdNA == 'true' || taskObj.IsNationalIdNA == '1') {
        $('#NInum_form').attr("disabled", "true").removeClass('textMandatory');
        $('#NInum_form').html('');
        $("#NInum_form").addClass("disable");
        $('#NationalIDNA').attr('checked', 'checked');
    }
    else {
        $('#NationalIDNA').attr('checked', false);
        $('#NatID_form').removeAttr('disabled').addClass('textMandatory');
    }

    if (taskObj.Ethnicity == 'E4-OT1' || taskObj.Ethnicity == 'E8-OT2' || taskObj.Ethnicity == 'E13-OT3' ||
    taskObj.Ethnicity == 'E16-OT4' || taskObj.Ethnicity == 'E18-OT5') 
    {
        $('#Others1').show();
    }
    else
    {
        $('#Others1').hide();
    }

    if (taskObj.Religion == 'R8-OT') 
    {
        $('#Others2').show();
    }
    else {
        $('#Others2').hide();
    }

    if (taskObj.Disability == 'Y') 
    {
        $('#Others3').show();
    }
    else {
        $('#Others3').hide();
    }


    //Prefill the values at the first time when task not even saved 
    if (OBPager.taskStatusFlag == -1) {
        // Set member value manually
        OBPager.SetTaskContentMemberValue('PersonalData.Prefix', null, TaskPrefillValues.PrefillValues.Set1.Prefix, false);
        OBPager.SetTaskContentMemberValue('PersonalData.FirstName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.MiddleName', null, TaskPrefillValues.PrefillValues.Set1.MiddleName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.LastName', null, TaskPrefillValues.PrefillValues.Set1.LastName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.MaritalStatus', null, TaskPrefillValues.PrefillValues.Set1.MaritalStatus, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Gender', null, TaskPrefillValues.PrefillValues.Set1.Gender, false);
        OBPager.SetTaskContentMemberValue('PersonalData.DOB', null, TaskPrefillValues.PrefillValues.Set1.DOB, false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentCity', null, -1, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Prefix', null, -1, false);
        OBPager.SetTaskContentMemberValue('PersonalData.MaritalStatus', null, -1, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Gender', null, -1, false);
        OBPager.SetTaskContentMemberValue('PersonalData.AccountType', null, -1, false);
        OBPager.SetTaskContentMemberValue('PersonalData.BankCountry', null, -1, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactRelationship', null, -1, false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentCounty', null, -1, false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentCountry', null, -1, false);
        OBPager.SetTaskContentMemberValue('PersonalData.BirthCountry', null, -1, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Nationality', null, -1, false);
        //        OBPager.SetTaskContentMemberValue('PersonalData.Address1', null, TaskPrefillValues.PrefillValues.Set2.AddressLine1, false);
        //        OBPager.SetTaskContentMemberValue('PersonalData.Address2', null, TaskPrefillValues.PrefillValues.Set2.AddressLine2, false);
        //        OBPager.SetTaskContentMemberValue('PersonalData.City', null, TaskPrefillValues.PrefillValues.Set2.City, false);
        //        OBPager.SetTaskContentMemberValue('PersonalData.Country', null, TaskPrefillValues.PrefillValues.Set2.Country, false);
        //        OBPager.SetTaskContentMemberValue('PersonalData.PostCode', null, TaskPrefillValues.PrefillValues.Set2.PinCode, false);
        //        OBPager.SetTaskContentMemberValue('PersonalData.Phone', null, TaskPrefillValues.PrefillValues.Set2.MobilePhone, false);
    }

    //Do a data bind finally
    jQXB.doBind(OBPager.taskContentDSName);

    $('#city_form').change(function () {
        var CurrentCityId = $('#city_form').val();
        if (CurrentCityId != -1) {
            $('#county_form').removeAttr('disabled');
            OBPager.GetGeographyMaster(44, CurrentCityId, "CountyTypeList");
            var CurrentCountyId = $('#county_form').val();
            OBPager.SetTaskContentMemberValue('PersonalData.CurrentCounty', null, CurrentCountyId, false);
            $('#county_form').attr('disabled', 'true');
        }
    });

});


function SaveTaskData(saveMode) {
 // saveMode { 0:Save, 1:Submit }
    if (saveMode == 1) {
        if (validate.ValidateSubmit() == true) {
          if (OBPager.ValidateTaskData(saveMode)==true) {
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
        // Set member value manually
        OBPager.SetTaskContentMemberValue('PersonalData.Prefix', null, TaskPrefillValues.PrefillValues.Set1.Prefix, false);
        OBPager.SetTaskContentMemberValue('PersonalData.FirstName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.MiddleName', null, TaskPrefillValues.PrefillValues.Set1.MiddleName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.LastName', null, TaskPrefillValues.PrefillValues.Set1.LastName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.MaritalStatus', null, TaskPrefillValues.PrefillValues.Set1.MaritalStatus, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Gender', null, TaskPrefillValues.PrefillValues.Set1.Gender, false);
        OBPager.SetTaskContentMemberValue('PersonalData.DOB', null, TaskPrefillValues.PrefillValues.Set1.DOB, false);
//        OBPager.SetTaskContentMemberValue('PersonalData.Address1', null, TaskPrefillValues.PrefillValues.Set2.AddressLine1, false);
//        OBPager.SetTaskContentMemberValue('PersonalData.Address2', null, TaskPrefillValues.PrefillValues.Set2.AddressLine2, false);
//        OBPager.SetTaskContentMemberValue('PersonalData.City', null, TaskPrefillValues.PrefillValues.Set2.City, false);
//        OBPager.SetTaskContentMemberValue('PersonalData.Country', null, TaskPrefillValues.PrefillValues.Set2.Country, false);
//        OBPager.SetTaskContentMemberValue('PersonalData.PostCode', null, TaskPrefillValues.PrefillValues.Set2.PinCode, false);
//        OBPager.SetTaskContentMemberValue('PersonalData.Phone', null, TaskPrefillValues.PrefillValues.Set2.MobilePhone, false);
        //Do a data bind finally 

        $('#Prefix').val('-1');
        $('#maritalstatus_form').val('-1');
        $('#sex_form').val('-1');
        $('#accounttype_form').val('-1');
        $('#Country_form').val('-1');
        $('#county_form').val('-1');        
        
        $('#EmergencyRelatives_form').val('-1');
        $('#country_form').val('-1');
        $('#form_birthcountry').val('-1');
        $('#form_nationality').val('-1');

        $('#form_ethnicity').val('-1');
        $('#form_religion').val('-1');
        $('#form_disability').val('-1');
        $('#form_SexOrien').val('-1');
       
        jQXB.doBind(OBPager.taskContentDSName);
    }
}

//$(function () {
//    $("#dob_form").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar', showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true });


//});

$(function () {
    $(".jQrydatepicker").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar',
        yearRange: "-62:+0",
        maxDate: "0",
        showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    });

   
});



function RestrictCharCount(fieldID, max) {

    // if the length of the string in the input field is greater than the max value, trim it 
    var field = this.document.getElementById(fieldID);

    if (field.value.length > max)
        field.value = field.value.substring(0, max);
}

function checkNIDNA() {
    if ($("#NationalIDNA").is(':checked')) {
        OBPager.SetTaskContentMemberValue('PersonalData.IsNationalIdNA', 1, 'true', false);
        $('#NInum_form').attr("disabled", "true").removeClass('textMandatory');
        $('#NInum_form').html('');
        $("#NInum_form").addClass("disable");
        OBPager.SetTaskContentMemberValue('PersonalData.NationalID', null, '', false);
    }

    else {
        OBPager.SetTaskContentMemberValue('PersonalData.IsNationalIdNA', 1,'', false);
        $('#NInum_form').removeAttr('disabled');
        $("#NInum_form").removeClass("disable").addClass("textMandatory"); ;
    }
}

function Ethnicity() 
{
    if ($('#form_ethnicity').val() == 'E4-OT1' || $('#form_ethnicity').val() == 'E8-OT2' || $('#form_ethnicity').val() == 'E13-OT3' ||
    $('#form_ethnicity').val() == 'E16-OT4' || $('#form_ethnicity').val() == 'E18-OT5') 
    {
        $('#Others1').show();
    }
    else 
    {
        $('#form_ethnicity_others').val('');
        OBPager.SetTaskContentMemberValue('PersonalData.EthnicityOthers', null, '', false);
        $('#Others1').hide();
        
    }
}

function Religion() 
{
    if ($('#form_religion').val() == 'R8-OT') 
    {
        $('#Others2').show();
    }
    else {
        $('#form_religion_others').val('');
        OBPager.SetTaskContentMemberValue('PersonalData.ReligionOthers', null, '', false);
        $('#Others2').hide();
        
    }
}

function Disability() 
{
    if ($('#form_disability').val() == 'Y') 
    {
        $('#Others3').show();
    }
    else 
    {
        $('#Others3').hide();
        OBPager.SetTaskContentMemberValue('PersonalData.DisabilityOthers', null, "", false);
    }
}



$().ready(function () {

    OBPager.ShowPage(1);

    OBPager.GetMaster(15, "MaritalList");
    OBPager.GetMaster(14, "GenderList");
    OBPager.GetMaster(13, "RelationshipList");
    OBPager.GetMaster(101, "AccountTypeList");
    OBPager.GetGeographyMaster(1, 0, "CountryList");

    if (OBPager.taskStatusFlag == "-1") {

        OBPager.SetTaskContentMemberValue('PersonalData.FirstName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.MiddleName', null, TaskPrefillValues.PrefillValues.Set1.MiddleName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.LastName', null, TaskPrefillValues.PrefillValues.Set1.SurName, false);

        OBPager.SetTaskContentMemberValue('PersonalData.EmailId', null, TaskPrefillValues.PrefillValues.Set1.EmailAddress, false);

        OBPager.SetTaskContentMemberValue('PersonalData.PassportName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PassportMiddleName', null, TaskPrefillValues.PrefillValues.Set1.MiddleName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PassportLastName', null, TaskPrefillValues.PrefillValues.Set1.SurName, false);

        OBPager.SetTaskContentMemberValue('PersonalData.DOB', null, TaskPrefillValues.PrefillValues.Set1.DateOfBirth, false);
        OBPager.SetTaskContentMemberValue('PersonalData.MaritalStatus', null, TaskPrefillValues.PrefillValues.Set1.MaritalStatus, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Gender', null, TaskPrefillValues.PrefillValues.Set1.Gender, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Mobile', null, TaskPrefillValues.PrefillValues.Set1.MobilePhone, false);

        OBPager.SetTaskContentMemberValue('PersonalData.PermanentAddressLine1', null, TaskPrefillValues.PrefillValues.Set1.PAddress1, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentAddressLine2', null, TaskPrefillValues.PrefillValues.Set1.PAddress2, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentCity', null, TaskPrefillValues.PrefillValues.Set1.City, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentPinCode', null, TaskPrefillValues.PrefillValues.Set1.PinCode, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentCountry', null, TaskPrefillValues.PrefillValues.Set1.Country, false);
        OBPager.SetTaskContentMemberValue('PersonalData.HomePh', null, TaskPrefillValues.PrefillValues.Set1.HomePhone, false);

        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactName', null, TaskPrefillValues.PrefillValues.Set1.EmergencyName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactNo', null, TaskPrefillValues.PrefillValues.Set1.EmergencyPhone, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactRelationship', null, TaskPrefillValues.PrefillValues.Set1.EmergencyRelation, false);

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
        //OBPager.SetTaskContentMemberValue('PersonalData.LocalMobile', null, $('#Pg_1_text_Mobile').val(), false);

        OBPager.SetTaskContentMemberValue('PersonalData.IsSameCurrPermAddress', 1, '1', false);

    }
    else {
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentAddressLine1', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentAddressLine2', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentCity', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentCountry', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentPinCode', null, '', false);
        //OBPager.SetTaskContentMemberValue('PersonalData.LocalMobile', null, '', false);
        $('#Pg_1_text_CCountry').val('-1');

        OBPager.SetTaskContentMemberValue('PersonalData.IsSameCurrPermAddress', 1, '', false);

    }

    jQXB.doBind(OBPager.taskContentDSName);

}

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
        OBPager.SetTaskContentMemberValue('PersonalData.MiddleName', null, TaskPrefillValues.PrefillValues.Set1.MiddleName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.LastName', null, TaskPrefillValues.PrefillValues.Set1.SurName, false);

        OBPager.SetTaskContentMemberValue('PersonalData.EmailId', null, TaskPrefillValues.PrefillValues.Set1.EmailAddress, false);

        OBPager.SetTaskContentMemberValue('PersonalData.PassportName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PassportMiddleName', null, TaskPrefillValues.PrefillValues.Set1.MiddleName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PassportLastName', null, TaskPrefillValues.PrefillValues.Set1.SurName, false);

        OBPager.SetTaskContentMemberValue('PersonalData.DOB', null, TaskPrefillValues.PrefillValues.Set1.DateOfBirth, false);
        OBPager.SetTaskContentMemberValue('PersonalData.MaritalStatus', null, TaskPrefillValues.PrefillValues.Set1.MaritalStatus, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Gender', null, TaskPrefillValues.PrefillValues.Set1.Gender, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Mobile', null, TaskPrefillValues.PrefillValues.Set1.MobilePhone, false);

        OBPager.SetTaskContentMemberValue('PersonalData.PermanentAddressLine1', null, TaskPrefillValues.PrefillValues.Set1.PAddress1, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentAddressLine2', null, TaskPrefillValues.PrefillValues.Set1.PAddress2, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentCity', null, TaskPrefillValues.PrefillValues.Set1.City, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentPinCode', null, TaskPrefillValues.PrefillValues.Set1.PinCode, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentCountry', null, TaskPrefillValues.PrefillValues.Set1.Country, false);
        OBPager.SetTaskContentMemberValue('PersonalData.HomePh', null, TaskPrefillValues.PrefillValues.Set1.HomePhone, false);

        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactName', null, TaskPrefillValues.PrefillValues.Set1.EmergencyName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactNo', null, TaskPrefillValues.PrefillValues.Set1.EmergencyPhone, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactRelationship', null, TaskPrefillValues.PrefillValues.Set1.EmergencyRelation, false);

        $('#accounttype_form').val('-1');
        $('#Country_form').val('-1');
        $('#PassportCountry').val('-1');
        $('#nationality_form').val('-1');
        $('#Pg_1_text_CCountry').val('-1');
        $('#Pg_1_text_PCountry').val('-1');
        $('#maritalstatus_form').val('-1');
        $('#sex_form').val('-1');
        $('#relation_form').val('-1');

    }

    jQXB.doBind(OBPager.taskContentDSName);
}




$().ready(function () {

    OBPager.ShowPage(1);

    OBPager.GetMaster(20, "PrefixList");
    OBPager.GetMaster(15, "MaritalList");
    OBPager.GetMaster(14, "GenderList");
    OBPager.GetMaster(13, "RelationshipList");
    OBPager.GetMaster(101, "AccountTypeList");
    OBPager.GetMaster(106, "Contractlist");
    OBPager.GetMaster(105, "WorkingDaysaWeek");
    OBPager.GetMaster(108, "EmploymentContract");
    //OBPager.GetMaster(107, "WhichDaysweek");
    OBPager.GetGeographyMaster(1, 0, "CountryList");

   
    var Mon;
    Mon = JSON.parse(OBPager.strFormDetails).PersonalData.Mon;

    if (Mon == '1') {
        $('.days').attr('checked', 'checked');
    }
    else {
        $('.days').removeAttr('checked');
        //$('#Pg_2_check_Mon').attr('checked', false);

    }

    var Tue;
    Tue = JSON.parse(OBPager.strFormDetails).PersonalData.Tue;

    if (Tue == '2') {
        $('.days').attr('checked', 'checked');
    }
    else {
        $('.days').removeAttr('checked');
        //$('#Pg_2_check_Tue').attr('checked', false);

    }

    var Wed;
    Wed = JSON.parse(OBPager.strFormDetails).PersonalData.Wed;

    if (Wed == '3') {
        $('.days').attr('checked', 'checked');
    }
    else {
        $('.days').removeAttr('checked');
        //$('#Pg_2_check_Wed').attr('checked', false);

    }

    var Thur;
    Thur = JSON.parse(OBPager.strFormDetails).PersonalData.Thur;

    if (Thur == '4') {
        $('.days').attr('checked', 'checked');
    }
    else {
        $('.days').removeAttr('checked');
        //$('#Pg_2_check_Thur').attr('checked', false);

    }

    var Fri;
    Fri = JSON.parse(OBPager.strFormDetails).PersonalData.Fri;

    if (Fri == '5') {
        $('.days').attr('checked', 'checked');
    }
    else {
        $('.days').removeAttr('checked');
        //$('#Pg_2_check_Fri').attr('checked', false);

    }
    //    $("#Pg_1_text_FirstName").val(TaskPrefillValues.PrefillValues.Set1.FirstName);
    //    $("#Pg_1_text_MiddleName").val(TaskPrefillValues.PrefillValues.Set1.MiddleName);
    //    $("#Pg_1_text_Surname").val(TaskPrefillValues.PrefillValues.Set1.LastName);
    //    $("#Pg_1_text_DateOfBirth").val(TaskPrefillValues.PrefillValues.Set1.DateOfBirth);
    //    $("#maritalstatus_form").val(TaskPrefillValues.PrefillValues.Set1.MaritalStatus);
    //    $("#sex_form").val(TaskPrefillValues.PrefillValues.Set1.Gender);
    //    $("#nationality_form").val(TaskPrefillValues.PrefillValues.Set1.Nationality);
    //    $("#Pg_1_text_BSNNumber").val(TaskPrefillValues.PrefillValues.Set1.BSNNumber);
    //    $("#Pg_1_text_PAddress1").val(TaskPrefillValues.PrefillValues.Set1.PAddress1);
    //    $("#Pg_1_text_PAddress2").val(TaskPrefillValues.PrefillValues.Set1.PAddress2);
    //    $("#Pg_1_text_PCity").val(TaskPrefillValues.PrefillValues.Set1.City);
    //    $("#Pg_1_text_PZipcode").val(TaskPrefillValues.PrefillValues.Set1.PinCode);
    //    $("#Pg_1_text_CurrentCountry").val(TaskPrefillValues.PrefillValues.Set1.Country);
    //    $("#Pg_1_text_HomeTelephone").val(TaskPrefillValues.PrefillValues.Set1.HomePhone);
    //    $("#Pg_2_text_Emergencyname").val(TaskPrefillValues.PrefillValues.Set1.EmergencyName);
    //    $("#Pg_2_text_Emergencytelephone").val(TaskPrefillValues.PrefillValues.Set1.EmergencyPhone);
    //    $("#Pg_2_text_RelationShip").val(TaskPrefillValues.PrefillValues.Set1.EmergencyRelation);

    if (OBPager.taskStatusFlag == "-1") {
        OBPager.SetTaskContentMemberValue('PersonalData.FirstName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.MiddleName', null, TaskPrefillValues.PrefillValues.Set1.MiddleName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.LastName', null, TaskPrefillValues.PrefillValues.Set1.SurName, false);

        OBPager.SetTaskContentMemberValue('PersonalData.PassportName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PassportMiddleName', null, TaskPrefillValues.PrefillValues.Set1.MiddleName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PassportLastName', null, TaskPrefillValues.PrefillValues.Set1.SurName, false);

        OBPager.SetTaskContentMemberValue('PersonalData.DOB', null, TaskPrefillValues.PrefillValues.Set1.DateOfBirth, false);
        OBPager.SetTaskContentMemberValue('PersonalData.MaritalStatus', null, TaskPrefillValues.PrefillValues.Set1.MaritalStatus, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Gender', null, TaskPrefillValues.PrefillValues.Set1.Gender, false);
        // OBPager.SetTaskContentMemberValue('PersonalData.Nationality', null, TaskPrefillValues.PrefillValues.Set1.Nationality, false);
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
        //OBPager.SetTaskContentMemberValue('PersonalData.PassportName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
    }

    jQXB.doBind(OBPager.taskContentDSName);
});


 function ChkPemanentAddress() {
     if ($("#chkpermAddress_form").is(':checked')) {
         OBPager.SetTaskContentMemberValue('PersonalData.CurrentAddressLine1', null, $('#Pg_1_text_PAddress1').val(), false);
         OBPager.SetTaskContentMemberValue('PersonalData.CurrentAddressLine2', null, $('#Pg_1_text_PAddress2').val(), false);
         OBPager.SetTaskContentMemberValue('PersonalData.CurrentCity', null, $('#Pg_1_text_PCity').val(), false);
         OBPager.SetTaskContentMemberValue('PersonalData.CurrentPinCode', null, $('#Pg_1_text_PZipcode').val(), false);
       OBPager.SetTaskContentMemberValue('PersonalData.CurrentCountry',null,$('#Pg_1_text_CurrentCountry').val(),false);

         OBPager.SetTaskContentMemberValue('PersonalData.IsSameCurrPermAddress', 1, '1', false);



     }
     else {
         OBPager.SetTaskContentMemberValue('PersonalData.CurrentAddressLine1', null, '', false);
         OBPager.SetTaskContentMemberValue('PersonalData.CurrentAddressLine2', null, '', false);

         OBPager.SetTaskContentMemberValue('PersonalData.CurrentCity', null, '', false);
         OBPager.SetTaskContentMemberValue('PersonalData.CurrentCountry', null, '', false);
         OBPager.SetTaskContentMemberValue('PersonalData.CurrentPinCode',null,'',false);

         OBPager.SetTaskContentMemberValue('PersonalData.IsSameCurrPermAddress', 1, '', false);

         $('#Pg_1_text_Country').val('-1');


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

//$('.date').each(function () {
//    var a = $(this).attr('id');
//    $("#" + a).datepicker({ dateFormat: 'mm/dd/yy', yearRange: "1980:+1", buttonText: 'Open calendar', showOn: "both",
//        buttonImage: "../../../../Images/calendar.png", maxDate: "0", changeMonth: true, changeYear: true, buttonAfter: true
//    });
//});



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


//function SetValue() {
//    if ($('#Pg_2_check_Mon').is(':checked')) {
//        OBPager.SetTaskContentMemberValue('WhichDays.Mon', null, "1", true);
//        OBPager.SetTaskContentMemberValue('WhichDays.Tue', null, "0", false);
//        OBPager.SetTaskContentMemberValue('WhichDays.Wed', null, "0", false);
//        OBPager.SetTaskContentMemberValue('WhichDays.Thur', null, "0", false);
//        OBPager.SetTaskContentMemberValue('WhichDays.Fri', null, "0", false);

//    }
//    if ($('#Pg_2_check_Tue').is(':checked')) {
//        OBPager.SetTaskContentMemberValue('WhichDays.Mon', null, "0", false);
//        OBPager.SetTaskContentMemberValue('WhichDays.Tue', null, "1", true);
//        OBPager.SetTaskContentMemberValue('WhichDays.Wed', null, "0", false);
//        OBPager.SetTaskContentMemberValue('WhichDays.Thur', null, "0", false);
//        OBPager.SetTaskContentMemberValue('WhichDays.Fri', null, "0", false);

//    }
//    if ($('#Pg_2_check_Wed').is(':checked')) {
//        OBPager.SetTaskContentMemberValue('WhichDays.Mon', null, "0", false);
//        OBPager.SetTaskContentMemberValue('WhichDays.Tue', null, "0", false);
//        OBPager.SetTaskContentMemberValue('WhichDays.Wed', null, "1", true);
//        OBPager.SetTaskContentMemberValue('WhichDays.Thur', null, "0", false);
//        OBPager.SetTaskContentMemberValue('WhichDays.Fri', null, "0", false);

//    }
//    if ($('#Pg_2_check_Thur').is(':checked')) {
//        OBPager.SetTaskContentMemberValue('WhichDays.Mon', null, "0", false);
//        OBPager.SetTaskContentMemberValue('WhichDays.Tue', null, "0", false);
//        OBPager.SetTaskContentMemberValue('WhichDays.Wed', null, "0", false);
//        OBPager.SetTaskContentMemberValue('WhichDays.Thur', null, "1", true);
//        OBPager.SetTaskContentMemberValue('WhichDays.Fri', null, "0", false);

//    }
//    if ($('#Pg_2_check_Fri').is(':checked')) {
//        OBPager.SetTaskContentMemberValue('WhichDays.Mon', null, "0", false);
//        OBPager.SetTaskContentMemberValue('WhichDays.Tue', null, "0", false);
//        OBPager.SetTaskContentMemberValue('WhichDays.Wed', null, "0", false);
//        OBPager.SetTaskContentMemberValue('WhichDays.Thur', null, "0", false);
//        OBPager.SetTaskContentMemberValue('WhichDays.Fri', null, "1", true);

//    }
//}


function WhichDays() {
    if ($('#Pg_2_check_Mon').is(':checked')) {
        OBPager.SetTaskContentMemberValue('PersonalData.Mon', null, '1', false);
    }
    else {
        OBPager.SetTaskContentMemberValue('PersonalData.Mon', null, '', false);
    }
    if ($('#Pg_2_check_Tue').is(':checked')) {
        OBPager.SetTaskContentMemberValue('PersonalData.Tue', null, '2', false);
    }
    else {
        OBPager.SetTaskContentMemberValue('PersonalData.Tue', null, '', false);
    }
    if ($('#Pg_2_check_Wed').is(':checked')) {
        OBPager.SetTaskContentMemberValue('PersonalData.Wed', null, '3', false);
    }
    else {
        OBPager.SetTaskContentMemberValue('PersonalData.Wed', null, '', false);
    }
    if ($('#Pg_2_check_Thur').is(':checked')) {
        OBPager.SetTaskContentMemberValue('PersonalData.Thur', null, '4', false);
    }
    else {
        OBPager.SetTaskContentMemberValue('PersonalData.Thur', null, '', false);
    }
    if ($('#Pg_2_check_Fri').is(':checked')) {
        OBPager.SetTaskContentMemberValue('PersonalData.Fri', null, '5', false);
    }
    else {
        OBPager.SetTaskContentMemberValue('PersonalData.Fri', null, '', false);
    }
}









function ResetTaskData() {

 OBPager.ResetTaskContent();
    //PrePopulateValues();
    if (OBPager.taskStatusFlag == -1) {
        // Set member value manually
        OBPager.SetTaskContentMemberValue('PersonalData.FirstName', null, TaskPrefillValues.PrefillValues.Set1.FirstName,false);
        OBPager.SetTaskContentMemberValue('PersonalData.MiddleName', null, TaskPrefillValues.PrefillValues.Set1.MiddleName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.LastName', null, TaskPrefillValues.PrefillValues.Set1.SurName, false);

        OBPager.SetTaskContentMemberValue('PersonalData.PassportName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PassportMiddleName', null, TaskPrefillValues.PrefillValues.Set1.MiddleName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PassportLastName', null, TaskPrefillValues.PrefillValues.Set1.SurName, false);

        OBPager.SetTaskContentMemberValue('PersonalData.DOB', null, TaskPrefillValues.PrefillValues.Set1.DateOfBirth,false);
        OBPager.SetTaskContentMemberValue('PersonalData.MaritalStatus', null, TaskPrefillValues.PrefillValues.Set1.MaritalStatus, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Gender', null, TaskPrefillValues.PrefillValues.Set1.Gender, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Nationality', null, TaskPrefillValues.PrefillValues.Set1.Nationality, false);
        OBPager.SetTaskContentMemberValue('PersonalData.HomePh', null, TaskPrefillValues.PrefillValues.Set1.HomeTelePhone, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactName', null, TaskPrefillValues.PrefillValues.Set1.EmergencyName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactNo', null, TaskPrefillValues.PrefillValues.Set1.EmergencyPhone, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentAddressLine1', null, TaskPrefillValues.PrefillValues.Set1.PAddress1, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentAddressLine2', null, TaskPrefillValues.PrefillValues.Set1.PAddress2, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentCity', null, TaskPrefillValues.PrefillValues.Set1.City, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentPinCode', null, TaskPrefillValues.PrefillValues.Set1.PinCode, false);
        OBPager.SetTaskContentMemberValue('PersonalData.PermanentCountry',null,TaskPrefillValues.PrefillValues.Set1.CurrentCountry, false);
        OBPager.SetTaskContentMemberValue('PersonalData.EmergencyContactRelationship', null, TaskPrefillValues.PrefillValues.Set1.EmergencyRelation, false);
        //OBPager.SetTaskContentMemberValue('PersonalData.PassportName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.Mobile', null, TaskPrefillValues.PrefillValues.Set1.MobilePhone, false);

        $('#Contract').val('-1');
        $('#WhichDays').val('-1');
//        $('#WorkingDays').val('-1');
        $('#EmploymentContract').val('-1');
        $('#Pg_2_text_accounttype_form').val('-1');
        $('#Pg_2_text_Country_form').val('-1');
        $('#PassportCountry').val('-1');
        $('#nationality_form').val('-1');
        $('#Pg_1_text_CurrentCountry').val('-1');
        $('#Pg_1_text_Country').val('-1');
        $('#maritalstatus_form').val('-1');
        $('#sex_form').val('-1');
        $('#Pg_2_text_RelationShip').val('-1');



    }
    jQXB.doBind(OBPager.taskContentDSName);
}



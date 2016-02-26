
$().ready(function () {

    OBPager.ShowPage(1);

    OBPager.GetMaster(15, "MaritalList");
    OBPager.GetMaster(14, "GenderList");
    OBPager.GetMaster(13, "RelationshipList");
    OBPager.GetMaster(163, "AccountTypeList");
    OBPager.GetMaster(116, "YesOrNo");
    OBPager.GetMaster(152, "StateOrPrivate");
    OBPager.GetGeographyMaster(1, 0, "CountryList");
    OBPager.GetMaster(251, "MajorList");
    OBPager.GetMaster(252, "DegreeList");

    $('#Pg_1_txt_Numberofchildren').attr('disabled', true);
    $('#LoanList').hide();

    var major;
    major = JSON.parse(OBPager.strFormDetails).PersonalData.Major;

    if (major == "1105") {
        $('#Pg_1_txtbx_OtherMajor').addClass('textMandatory');
        $('#NewCandidates_OtherMajor').show();
    }
    else {
        $('#Pg_1_txtbx_OtherMajor').removeClass('textMandatory');
        $('#NewCandidates_OtherMajor').hide();
    }

    var degree;
    degree = JSON.parse(OBPager.strFormDetails).PersonalData.Degree;

    if (degree == "OTH") {
        $('#NewCandidates_OtherDegree').show();
    }
    else {
        $('#NewCandidates_OtherDegree').hide();
    }

//    if ($('#Pg_1_dd_Major').val() == '1105') {
//        $('#Pg_1_txtbx_OtherMajor').addClass('textMandatory');
//        $('#NewCandidates_OtherMajor').show();
//    }
//    else {
//        $('#Pg_1_txtbx_OtherMajor').removeClass('textMandatory');
//        $('#NewCandidates_OtherMajor').hide();
//    }
//    if ($('#Pg_1_dd_Degree').val() == 'OTH') {
//        $('#NewCandidates_OtherDegree').show();
//    }
//    else {
//        $('#NewCandidates_OtherDegree').hide();
//    }

    var checking;
    checking = JSON.parse(OBPager.strFormDetails).PersonalData.NumberofChildren;

    if (checking == undefined) {
        $('#Pg_1_txt_Numberofchildren').attr('disabled', true);
    }
    else {
        $('#Pg_1_txt_Numberofchildren').removeAttr('disabled');
    }

    var checking1;
    checking1 = JSON.parse(OBPager.strFormDetails).PersonalData.AccountType;

    var checking2;
    checking2 = TaskPrefillValues.PrefillValues.Set1.AC

    if (checking1 == checking2) {
        $('#LoanList').show();
    }
    else {
        $('#LoanList').hide();
    }

    var NewCandidateFlag;
    NewCandidateFlag = TaskPrefillValues.PrefillValues.Set2.NewCandidates

    if (NewCandidateFlag == "1") {
        $('#NewCandidates_Degree').show();
        $('#NewCandidates_Major').show();
        $('#NewCandidates_DA').show();
        $('#OldCandidates_Type').hide();
        $('#OldCandidates_Level').hide();
        $('#Pg_1_text_LevelOfEducation').removeClass('textMandatory');
        $('#Pg_1_text_TypeOfEducation').removeClass('textMandatory');
    }
    else {
        $('#NewCandidates_Degree').hide();
        $('#NewCandidates_Major').hide();
        $('#NewCandidates_DA').hide();
        $('#OldCandidates_Type').show();
        $('#OldCandidates_Level').show();
        $('#Pg_1_text_LevelOfEducation').addClass('textMandatory');
        $('#Pg_1_text_TypeOfEducation').addClass('textMandatory');
    }

    if (OBPager.taskStatusFlag == "-1") {

        OBPager.SetTaskContentMemberValue('PersonalData.FirstName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
        //OBPager.SetTaskContentMemberValue('PersonalData.MiddleName', null, TaskPrefillValues.PrefillValues.Set1.MiddleName, false);
        OBPager.SetTaskContentMemberValue('PersonalData.LastName', null, TaskPrefillValues.PrefillValues.Set1.SurName, false);

        OBPager.SetTaskContentMemberValue('PersonalData.EmailId', null, TaskPrefillValues.PrefillValues.Set1.EmailAddress, false);

        //OBPager.SetTaskContentMemberValue('PersonalData.PassportName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
        //OBPager.SetTaskContentMemberValue('PersonalData.PassportMiddleName', null, TaskPrefillValues.PrefillValues.Set1.MiddleName, false);
        //OBPager.SetTaskContentMemberValue('PersonalData.PassportLastName', null, TaskPrefillValues.PrefillValues.Set1.SurName, false);

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
        OBPager.SetTaskContentMemberValue('PersonalData.LocalMobile', null, $('#Pg_1_text_Mobile').val(), false);

        OBPager.SetTaskContentMemberValue('PersonalData.IsSameCurrPermAddress', 1, '1', false);

    }
    else {
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentAddressLine1', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentAddressLine2', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentCity', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentCountry', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.CurrentPinCode', null, '', false);
        OBPager.SetTaskContentMemberValue('PersonalData.LocalMobile', null, '', false);
        $('#Pg_1_text_CCountry').val('-1');

        OBPager.SetTaskContentMemberValue('PersonalData.IsSameCurrPermAddress', 1, '', false);

    }

    jQXB.doBind(OBPager.taskContentDSName);

}

function Major() {
    if ($('#Pg_1_dd_Major').val() == '1105') {        //1105 is the Other Techincal code in MasterCodes 251
        $('#Pg_1_txtbx_OtherMajor').addClass('textMandatory');
        $('#NewCandidates_OtherMajor').show();
    }
    else {
        $('#Pg_1_txtbx_OtherMajor').removeClass('textMandatory');
        $('#NewCandidates_OtherMajor').hide();
    }  
}

function Degree() {
    if ($('#Pg_1_dd_Degree').val() == 'OTH') {      //OTH is the Other Techincal code in MasterCodes 252
        $('#NewCandidates_OtherDegree').show();
    }
    else {
        $('#NewCandidates_OtherDegree').hide();
    }
}

function NoOfChildren() {
    if ($('#maritalstatus_form').val() == '2' || $('#maritalstatus_form').val() == '10') {
        $('#Pg_1_txt_Numberofchildren').attr('disabled', true);
        $('#Pg_1_txt_Numberofchildren').removeAttr('disabled').addClass('OnlyNumeric');
        $('#Pg_1_txt_Numberofchildren').removeAttr('disabled').addClass('textMandatory');
    }
    else {
        $('#Pg_1_txt_Numberofchildren').removeAttr('disabled');
        $('#Pg_1_txt_Numberofchildren').attr("disabled", "true").removeClass('OnlyNumeric');
        $('#Pg_1_txt_Numberofchildren').attr("disabled", "true").removeClass('textMandatory');
        $('#Pg_1_txt_Numberofchildren').val('');
        OBPager.SetTaskContentMemberValue('PersonalData.NumberofChildren', null, $('#Pg_1_txt_Numberofchildren').val(), false);
    }
}

function LoanAmountFieldHide() {

    var checking3;
    checking3 = TaskPrefillValues.PrefillValues.Set1.AC

    if ($('#accounttype_form').val() == checking3) {
        $('#LoanList').show();
        $('#loanamount').removeAttr('disabled').addClass('textMandatory');
    }
    else {
        $('#LoanList').hide();
        $('#loanamount').attr("disabled", "true").removeClass('textMandatory');
    }
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
        //OBPager.SetTaskContentMemberValue('PersonalData.MiddleName', null, TaskPrefillValues.PrefillValues.Set1.MiddleName, false);
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
        $('#relation_form').val('-1');
        $('#PassportCountry').val('-1');
        $('#Pg_1_text_CCountry').val('-1');
        $('#Pg_1_text_PCountry').val('-1');
        $('#PensionFund').val('-1');
        $('#Student').val('-1');
        $('#Pensioner').val('-1');
        $('#FirstPlaceOfWork').val('-1');
        $('#nationality_form').val('-1');
        $('#sex_form').val('-1');
        $('#maritalstatus_form').val('-1');
        $('#Pg_1_dd_Major').val('-1');
        $('#Pg_1_dd_Degree').val('-1');
        
    }

    jQXB.doBind(OBPager.taskContentDSName);

    if ($('#maritalstatus_form').val() == '2' || $('#maritalstatus_form').val() == '10') {
        $('#Pg_1_txt_Numberofchildren').removeAttr('disabled');
    }
    else {
        $('#Pg_1_txt_Numberofchildren').attr('disabled', true);
    }

}



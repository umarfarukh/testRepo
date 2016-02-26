$().ready(function () {
    OBPager.GetGeographyMaster(1, 0, "CountryList");
    OBPager.GetGeographyMaster(8, 0, "DegreeList");
    OBPager.GetGeographyMaster(9, 0, "DisciplineList");
    OBPager.GetMaster(133, "CompletionStatus");
    OBPager.GetMaster(55, "ModeofEducation");
    OBPager.GetGeographyMaster(41, 0, "EducationalAttainment");
    $('.reasonclass').hide();


    $('#divothers').hide();
    $('#divHigher').hide();
    $('#vocotherstate_form').hide();
    $('#BachelorsProvinceothers_form').hide();
    $('#higherstateothers_form').hide();
    $('#BachelorsothersUniverity_form').hide();
    $('#HigherOthuniversity_form').hide();
    $('#vocothuniversity_form').hide();
    $('#BachelorsOthDeg_form').hide();
    $('#HigherOthDeg_form').hide();
    $('#VocOthDeg_form').hide();

    $('#vocstate_form').attr('disabled', 'true');
    $('#vocuniversity_form').attr('disabled', 'true');
    $('#vocstate_form').attr('disabled', 'true');
    $('#Bachelorsuniversity_form').attr('disabled', 'true');
    $('#Higherstate_form').attr('disabled', 'true');
    $('#Higheruniversity_form').attr('disabled', 'true');

    var taskObj = JSON.parse(OBPager.strFormDetails).EducationDetails;
    var vocationalCountryId = taskObj.DiplomaCountry;

    if (vocationalCountryId != -1 && vocationalCountryId != null && vocationalCountryId != '') {
        OBPager.GetGeographyMaster(2, vocationalCountryId, "VocStateList");
        $('#vocstate_form').removeAttr('disabled');
        var vocstateid = taskObj.DiplomaState;
        if (vocstateid != -1 && vocstateid != null && vocstateid != '') {
            OBPager.GetGeographyMaster(7, vocstateid, "VocUniversityList");
            $('#vocuniversity_form').removeAttr('disabled');
        }
    }
    var BachelorsCountryId = taskObj.UGCountry;
    if (BachelorsCountryId != -1 && BachelorsCountryId != null && BachelorsCountryId != '') {
        OBPager.GetGeographyMaster(2, BachelorsCountryId, "BachelorsStateList");
        $('#vocstate_form').removeAttr('disabled');
        var BachelorsProvinceid = taskObj.UGState;
        if (BachelorsProvinceid != -1 && BachelorsProvinceid != null && BachelorsProvinceid != '') {
            OBPager.GetGeographyMaster(7, BachelorsProvinceid, "BachelorsCollegeList");
            $('#Bachelorsuniversity_form').removeAttr('disabled');
        }
    }
    var highercountryId = taskObj.PGCountry;
    if (highercountryId != -1 && highercountryId != null && highercountryId != '') {
        OBPager.GetGeographyMaster(2, highercountryId, "HigherStateList");
        $('#Higherstate_form').removeAttr('disabled');
        var higherstateid = taskObj.PGState;
        if (higherstateid != -1 && higherstateid != null && higherstateid != '') {
            OBPager.GetGeographyMaster(7, higherstateid, "HigherCollegeList");
            $('#Higheruniversity_form').removeAttr('disabled');
        }
    }






    var vocstateoth = taskObj.DiplomaState;
    if (vocstateoth == '9999') {
        $('#vocotherstate_form').show()
    }
    else {
        $('#vocotherstate_form').hide()
    }

    var bachelorsstateoth = taskObj.UGState;

    if (bachelorsstateoth == '9999') {
        $('#bachelorsstateothers_form').show()
    }
    else {
        $('#bachelorsstateothers_form').hide()
    }

    var higherprovinceoth = taskObj.PGState;
    if (higherprovinceoth == '9999') {
        $('#higherstateothers_form').show()
    }
    else {
        $('#higherstateothers_form').hide()
    }



    if (taskObj.IsBreakinEducation.Yes == 'true') {
        $('#reason_form').removeAttr('disabled');
    }
    else {
        $('#reason_form').attr('disabled', 'true');
    }



    if (taskObj.IsAnyOtherDegreeExists == 'true' || taskObj.IsAnyOtherDegreeExists == '1') {
        $('#divothers').show();
        OBPager.SetTaskContentMemberValue('EducationDetails.IsAnyOtherDegreeExists', 1, '1', false);
    }
    else {
        $('#divothers').hide();
        OBPager.SetTaskContentMemberValue('EducationDetails.IsAnyOtherDegreeExists', 1, '', false);
    }

    //    if (taskObj.IsUGExists == 'true' || taskObj.IsUGExists == '1') {
    //        $('#divBachelors').show();
    //        OBPager.SetTaskContentMemberValue('EducationDetails.IsUGExists', 1, 'true', false);
    //    }
    //    else {
    //        $('#divBachelors').hide();
    //        OBPager.SetTaskContentMemberValue('EducationDetails.IsUGExists', 1, '', false);
    //    }

    if (taskObj.IsPGExists == 'true' || taskObj.IsPGExists == '1') {
        $('#divHigher').show();
        OBPager.SetTaskContentMemberValue('EducationDetails.IsPGExists', 1, 'true', false);
    }
    else {
        $('#divHigher').hide();
        OBPager.SetTaskContentMemberValue('EducationDetails.IsPGExists', 1, '', false);
    }



    var Bachelorsunivoth = taskObj.UGCollege;
    var BachelorOthUniv = taskObj.UGOthersCollege;
    if (Bachelorsunivoth != null) {
        if (Bachelorsunivoth.indexOf('OLB') >= 0 || Bachelorsunivoth.indexOf('OLT') >= 0 || Bachelorsunivoth.indexOf('OLG') >= 0 || Bachelorsunivoth == 'CLG99999' || Bachelorsunivoth == '9999999') {
            //  OBPager.SetTaskContentMemberValue('EducationDetails.UGOthersCollege', null, BachelorOthUniv, false);

            $('#BachelorsothersUniverity_form').show();
        }
        else {
            $('#BachelorsothersUniverity_form').hide();
        }
    }

    var higherunivoth = taskObj.PGCollege;
    if (higherunivoth != null) {
        if (higherunivoth.indexOf('OLB') >= 0 || higherunivoth.indexOf('OLT') >= 0 || higherunivoth.indexOf('OLG') >= 0 || higherunivoth == 'CLG99999' || higherunivoth == '9999999') {
            $('#HigherOthuniversity_form').show();
        }
        else {
            $('#HigherOthuniversity_form').hide();
        }
    }



    var vocunivoth = taskObj.DiplomaCollege;
    if (vocunivoth != null) {
        if (vocunivoth.indexOf('OLB') >= 0 || vocunivoth.indexOf('OLT') >= 0 || vocunivoth.indexOf('OLG') >= 0 || vocunivoth == 'CLG99999' || vocunivoth == '9999999') {
            $('#vocothuniversity_form').show();
        }
        else {
            $('#vocothuniversity_form').hide();
        }
    }

    var vocdegoth = taskObj.DiplomaDegree;
    if (vocdegoth != null) {
        if (vocdegoth.indexOf('OTH') >= 0) {
            $('#VocOthDeg_form').show();
        }
        else {
            $('#VocOthDeg_form').hide();
        }
    }

    var Bachelorsdegoth = taskObj.UGDegree;
    if (Bachelorsdegoth != null) {
        if (Bachelorsdegoth.indexOf('OTH') >= 0) {
            $('#BachelorsOthDeg_form').show();
        }
        else {
            $('#BachelorsOthDeg_form').hide();
        }
    }

    var Higherdegoth = taskObj.PGDegree;
    if (Higherdegoth != null) {
        if (Higherdegoth.indexOf('OTH') >= 0) {
            $('#HigherOthDeg_form').show();
        }
        else {
            $('#HigherOthDeg_form').hide();
        }
    }

    var ReasonForBreakInEdu = taskObj.IsBreakinEducation;
    if (ReasonForBreakInEdu.Yes == 1 || ReasonForBreakInEdu.Yes == 'true') {
        OBPager.SetTaskContentMemberValue('EducationDetails.IsBreakinEducation.Yes', 1, '1', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.IsBreakinEducation.No', 1, '', false);
        $('#reason_form').removeAttr('disabled').addClass('Alphanumeric');
        $('.reasonclass').show();
    }
    else if (ReasonForBreakInEdu.No == 1 || ReasonForBreakInEdu.No == 'true') {
        OBPager.SetTaskContentMemberValue('EducationDetails.IsBreakinEducation.No', 1, '1', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.IsBreakinEducation.Yes', 1, '', false);
        $('#reason_form').attr("disabled", "true").removeClass('Alphanumeric');
        $('.reasonclass').hide();
    }




    $('#voccountry_form').change(function () {
        var countryId = $('#voccountry_form').val();
        OBPager.GetGeographyMaster(2, countryId, "VocStateList");
        $('#vocstate_form').removeAttr('disabled');
        OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaOthersCollege', null, '', false);
        $('#vocothuniversity_form').hide()

    });


    //Doubt
    $('#vocstate_form').change(function () {
        var stateId = $('#vocstate_form').val();
        OBPager.GetGeographyMaster(7, stateId, "VocUniversityList");
        $('#vocuniversity_form').removeAttr('disabled');

        if (stateId == '9999') {
            $('#vocotherstate_form').show()
        }
        else {
            $('#vocotherstate_form').hide()
        }
    });

    $('#Bachelorscountry_form').change(function () {
        var stateId = $('#Bachelorscountry_form').val();
        OBPager.GetGeographyMaster(2, stateId, "BachelorsStateList");
        $('#bachelorsstate_form').removeAttr("disabled");
        OBPager.SetTaskContentMemberValue('EducationDetails.UGOthersCollege', null, '', false);
        $('#BachelorsothersUniverity_form').hide();

    });

    //Doubt
    $('#bachelorsstate_form').change(function () {
        var stateId = $('#bachelorsstate_form').val();
        OBPager.GetGeographyMaster(7, stateId, "BachelorsCollegeList");
        $('#Bachelorsuniversity_form').removeAttr("disabled");
        $('#BachelorsothersUniverity_form').hide();
        //OBPager.SetTaskContentMemberValue('EducationDetails.UGOthersCollege', null, '', false);
        if (stateId == '9999') {
            $('#UGstateothers_form').show()
        }
        else {
            $('#UGstateothers_form').hide()
        }
    });

    $('#Highercountry_form').change(function () {
        var stateId = $('#Highercountry_form').val();
        OBPager.GetGeographyMaster(2, stateId, "HigherStateList");
        $('#Higherstate_form').removeAttr("disabled");
        $('#HigherOthuniversity_form').hide();
        OBPager.SetTaskContentMemberValue('EducationDetails.PGOthersCollege', null, '', false);

    });

    $('#Higherstate_form').change(function () {
        var stateId = $('#Higherstate_form').val();
        OBPager.GetGeographyMaster(7, stateId, "HigherCollegeList");
        $('#Higheruniversity_form').removeAttr("disabled");
        $('#HigherOthuniversity_form').hide();
        if (stateId == '9999') {
            $('#higherstateothers_form').show()
        }
        else {
            $('#higherstateothers_form').hide()
        }
    });


    $('#Bachelorsuniversity_form').change(function () {
        var univVal = $('#Bachelorsuniversity_form').val();

        if (univVal.indexOf('OLB') >= 0 || univVal.indexOf('OLT') >= 0 || univVal.indexOf('OLG') >= 0 || univVal == 'CLG99999' || univVal == '9999999') {
            $('#BachelorsothersUniverity_form').addClass('textMandatory');
            OBPager.SetTaskContentMemberValue('EducationDetails.UGOthersCollege', null, $('#BachelorsothersUniverity_form').val(), false);
            $('#BachelorsothersUniverity_form').show();

        }
        else {
            $('#BachelorsothersUniverity_form').hide();
            $('#BachelorsothersUniverity_form').removeClass('textMandatory');
            OBPager.SetTaskContentMemberValue('EducationDetails.UGOthersCollege', null, '', false);
        }
    });

    $('#BachelorsDeg_form').change(function () {
        var univVal = $('#BachelorsDeg_form').val();

        if (univVal.indexOf('OTH') >= 0) {
            $('#BachelorsOthDeg_form').show();
        }
        else {
            $('#BachelorsOthDeg_form').hide();

        }
    });

    $('#vocuniversity_form').change(function () {
        var univVal = $('#vocuniversity_form').val();

        if (univVal.indexOf('OLB') >= 0 || univVal.indexOf('OLT') >= 0 || univVal.indexOf('OLG') >= 0 || univVal == 'CLG99999' || univVal == '9999999') {
            $('#vocothuniversity_form').show();
            $('#vocothuniversity_form').addClass('textMandatory');
        }
        else {
            OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaOthersCollege', null, '', false);
            $('#vocothuniversity_form').removeClass('textMandatory');
            $('#vocothuniversity_form').hide();

        }
    });

    $('#VocDeg_form').change(function () {
        var univVal = $('#VocDeg_form').val();

        if (univVal.indexOf('OTH') >= 0) {
            $('#VocOthDeg_form').show();
        }
        else {
            $('#VocOthDeg_form').hide();
        }
    });

    $('#Higheruniversity_form').change(function () {
        var univVal = $('#Higheruniversity_form').val();

        if (univVal.indexOf('OLB') >= 0 || univVal.indexOf('OLT') >= 0 || univVal.indexOf('OLG') >= 0 || univVal == 'CLG99999' || univVal == '9999999') {
            $('#HigherOthuniversity_form').addClass('textMandatory');
            $('#HigherOthuniversity_form').show();
            
        }
        else {
            $('#HigherOthuniversity_form').removeClass('textMandatory');
            $('#HigherOthuniversity_form').hide();
            
            OBPager.SetTaskContentMemberValue('EducationDetails.PGOthersCollege', null, '', false);
        }
    });

    $('#HigherDeg_form').change(function () {
        var univVal = $('#HigherDeg_form').val();

        if (univVal.indexOf('OTH') >= 0) {
            $('#HigherOthDeg_form').show();
        }
        else {
            $('#HigherOthDeg_form').hide();
        }
    });



    jQXB.doBind(OBPager.taskContentDSName);
    OBPager.ShowPage(1)
});


function SaveTaskData(saveMode) {


    // saveMode { 0:Save, 1:Submit }
    if (saveMode == 1) {
        //if (validate.ValidateSubmit() == true) {
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
        //}
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

function IsBreakEducation(flag) {
    if (flag == 1) {
        OBPager.SetTaskContentMemberValue('EducationDetails.IsBreakinEducation.Yes', 1, '1', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.IsBreakinEducation.No', 1, '', false);
        $('#reason_form').removeAttr('disabled').addClass('Alphanumeric');
        $('.reasonclass').show();

    }
    else {
        OBPager.SetTaskContentMemberValue('EducationDetails.IsBreakinEducation.No', 1, '1', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.IsBreakinEducation.Yes', 1, '', false);
        $('#reason_form').attr("disabled", "true").removeClass('Alphanumeric');
        $('.reasonclass').hide();
    }
}

function ResetTaskData() {
    OBPager.ResetTaskContent();
}


//function checkVocational() {
//    if (document.getElementById('chk_vocational').checked == true) {
//        $('#divVocational').show();
//        OBPager.SetTaskContentMemberValue('EducationDetails.IsVocationalExists', 1, 'true', false);
//    }
//    else {
//        $('#divVocational').hide();
//        OBPager.SetTaskContentMemberValue('EducationDetails.IsVocationalExists', 1, '', false);
//        OBPager.SetTaskContentMemberValue('EducationDetails.VocationalCountry', null, '-1', false);
//        $('#vocstate_form').empty();
//        $('#vocstate_form').attr("disabled", "true");
//        OBPager.SetTaskContentMemberValue('EducationDetails.VocationalProvince', null, '', false);
//        $('#vocuniversity_form').empty();
//        $('#vocuniversity_form').attr("disabled", "true");
//        OBPager.SetTaskContentMemberValue('EducationDetails.VocationalUniversity', null, '', false);
//        OBPager.SetTaskContentMemberValue('EducationDetails.VocationalOthersUniversity', null, '', false);
//        OBPager.SetTaskContentMemberValue('EducationDetails.VocationalCollege', null, '', false);
//        OBPager.SetTaskContentMemberValue('EducationDetails.VocationalDegreeOrCourse', null, '-1', false);
//        OBPager.SetTaskContentMemberValue('EducationDetails.VocationalOthersDegree', null, '', false);
//        OBPager.SetTaskContentMemberValue('EducationDetails.VocationalDiscipline', null, '-1', false);
//        OBPager.SetTaskContentMemberValue('EducationDetails.VocationalCourseAttended', null, '-1', false);
//        OBPager.SetTaskContentMemberValue('EducationDetails.VocationalCGPAOrClass', null, '', false);
//        OBPager.SetTaskContentMemberValue('EducationDetails.VocationalAttendedFrom', null, '', false);
//        OBPager.SetTaskContentMemberValue('EducationDetails.VocationalAttendedTo', null, '', false);
//        OBPager.SetTaskContentMemberValue('EducationDetails.VocationalRegistrationNumber', null, '', false);
//        OBPager.SetTaskContentMemberValue('EducationDetails.VocationalCompletionStatus', null, '-1', false);
//        // jQXB.doBind(OBPager.taskContentDSName);
//    }
//}

function checkOthers() {
    if (document.getElementById('chk_otherdegree').checked == true) {
        $('#divothers').show();
        OBPager.SetTaskContentMemberValue('EducationDetails.IsAnyOtherDegreeExists', 1, 'true', false);
    }
    else {
        $('#divothers').hide();
        OBPager.SetTaskContentMemberValue('EducationDetails.IsAnyOtherDegreeExists', 1, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaCountry', null, '-1', false);
        $('#vocstate_form').empty();
        $('#vocstate_form').attr("disabled", "true");
        OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaState', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaStateOthers', null, '', false);
        $('#vocuniversity_form').empty();
        $('#vocuniversity_form').attr("disabled", "true");
        OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaBoardOrUniversity', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaOthersCollege', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaCollege', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaDegree', null, '-1', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaOthersDegree', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaDiscipline', null, '-1', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaModeofEdu', null, '-1', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaGradeOrClass', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaAttendedFrom', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaAttendedTo', null, '', false);
//        OBPager.SetTaskContentMemberValue('EducationDetails.UGRegistrationNumber', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaCompletionStatus', null, '-1', false);

    }
}

function checkHigher() {
    if (document.getElementById('chk_higher').checked == true) {
        $('#divHigher').show();
        OBPager.SetTaskContentMemberValue('EducationDetails.IsPGExists', 1, 'true', false);
    }
    else {
        $('#divHigher').hide();
        OBPager.SetTaskContentMemberValue('EducationDetails.IsPGExists', 1, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.PGCountry', null, '-1', false);
        $('#Higherstate_form').empty();
        $('#Higherstate_form').attr("disabled", "true");
        OBPager.SetTaskContentMemberValue('EducationDetails.PGState', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.PGStateOthers', null, '', false);
        $('#Higheruniversity_form').empty();
        $('#Higheruniversity_form').attr("disabled", "true");
        OBPager.SetTaskContentMemberValue('EducationDetails.PGCollege', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.PGOthersCollege', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.PGBoardOrUniversity', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.PGDegree', null, '-1', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.PGOthersDegree', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.PGDiscipline', null, '-1', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.PGModeofEdu', null, '-1', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.PGGradeOrClass', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.PGAttendedFrom', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.PGAttendedTo', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.PGRegistrationNumber', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.PGCompletionStatus', null, '-1', false);
    }

}




$(function () {
    //   $(".jqrydatepicker").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar', showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    $(".jqrydatepicker").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar', yearRange: "1940:+0", maxDate: "0",
        showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true
    });

    // });



});




$('select').live("mouseover", function () {

    var a = $(this).attr('id');

    var d = $('#' + a + " option:selected").text();

    if (d == '--Select--') {


    }

    else {

        $(this).attr('title', d);

        $('#' + a + ' > option').each(function () {

            this.title = this.text;

        });

    }

});

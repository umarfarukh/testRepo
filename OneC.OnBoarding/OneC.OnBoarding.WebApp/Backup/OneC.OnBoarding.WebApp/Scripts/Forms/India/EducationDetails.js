﻿$().ready(function () {
    OBPager.GetGeographyMaster(1, 0, "CountryList");
    OBPager.GetGeographyMaster(8, 0, "DegreeList");
    OBPager.GetGeographyMaster(9, 0, "DisciplineList");
    OBPager.GetMaster(55, "ModeofEducation");
    var isbgvinitiated = OBPager.IsBgvInitiated
    $('#divHsc').hide();
    $('#divDiploma').hide();
    $('#divUG').hide();
    $('#divPG').hide();
    $('#sscstateothers_form').hide();
    $('#hscstateothers_form').hide();
    $('#dipotherstate_form').hide();
    $('#UGstateothers_form').hide();
    $('#PGstateothers_form').hide();
    $('#AODstateothers_form').hide();
    $('#UGothersColg_form').hide();
    $('#PGOthcollege_form').hide();
    $('#AODOthcollege_form').hide();
    $('#dipothcollege_form').hide();
    $('#UGOthDeg_form').hide();
    $('#PGOthDeg_form').hide();
    $('#AODOthDeg_form').hide();
    $('#dipOthDeg_form').hide();
    $('#divAod').hide();
    $('#sscstate_form').attr('disabled', 'true');
    $('#hscstate_form').attr('disabled', 'true');
    $('#dipstate_form').attr('disabled', 'true');
    $('#UGstate_form').attr('disabled', 'true');
    $('#PGstate_form').attr('disabled', 'true');
    $('#AODstate_form').attr('disabled', 'true');
    $('#dipcollege_form').attr('disabled', 'true');
    $('#UGcollege_form').attr('disabled', 'true');
    $('#PGcollege_form').attr('disabled', 'true');
    $('#AODcollege_form').attr('disabled', 'true');
    $('.bgvLabel').hide();


    var taskObj = JSON.parse(OBPager.strFormDetails).EducationDetails;

    var ssccountryId = taskObj.SscCountry;
    if (ssccountryId != -1 && ssccountryId != null && ssccountryId != '') {
        OBPager.GetGeographyMaster(2, ssccountryId, "SSCStateList");
        $('#sscstate_form').removeAttr('disabled');
    }
    var hsccountryId = taskObj.HscCountry;
    if (hsccountryId != -1 && hsccountryId != null && hsccountryId != '') {
        OBPager.GetGeographyMaster(2, hsccountryId, "HSCStateList");
        $('#hscstate_form').removeAttr('disabled');
    }
    var dipcountryId = taskObj.DiplomaCountry;
    if (dipcountryId != -1 && dipcountryId != null && dipcountryId != '') {
        OBPager.GetGeographyMaster(2, dipcountryId, "DipStateList");
        $('#dipstate_form').removeAttr('disabled');
        var dipstateid = taskObj.DiplomaState;
        if (dipstateid != -1 && dipstateid != null && dipstateid != '') {
            OBPager.GetGeographyMaster(7, dipstateid, "DipCollegeList");
            $('#dipcollege_form').removeAttr('disabled');

        }
    }
    var ugcountryId = taskObj.UGCountry;
    if (ugcountryId != -1 && ugcountryId != null && ugcountryId != '') {
        OBPager.GetGeographyMaster(2, ugcountryId, "UGStateList");
        $('#UGstate_form').removeAttr('disabled');
        var ugstateid = taskObj.UGState;
        if (ugstateid != -1 && ugstateid != null && ugstateid != '') {
            OBPager.GetGeographyMaster(7, ugstateid, "UGCollegeList");
            $('#UGcollege_form').removeAttr('disabled');

        }
    }
    var pgcountryId = taskObj.PGCountry;
    if (pgcountryId != -1 && pgcountryId != null && pgcountryId != '') {
        OBPager.GetGeographyMaster(2, pgcountryId, "PGStateList");
        $('#PGstate_form').removeAttr('disabled');
        var pgstateid = taskObj.PGState;
        if (pgstateid != -1 && pgstateid != null && pgstateid != '') {
            OBPager.GetGeographyMaster(7, pgstateid, "PGCollegeList");
            $('#PGcollege_form').removeAttr('disabled');

        }
    }
    var aodcountryId = taskObj.AODCountry;
    if (aodcountryId != -1 && aodcountryId != null && aodcountryId != '') {
        OBPager.GetGeographyMaster(2, aodcountryId, "AODStateList");
        $('#AODstate_form').removeAttr('disabled');
        var aodstateid = taskObj.AODState;
        if (aodstateid != -1 && aodstateid != null && aodstateid != '') {
            OBPager.GetGeographyMaster(7, aodstateid, "AODCollegeList");
            $('#AODcollege_form').removeAttr('disabled');

        }
    }


    var sscstateothers = taskObj.SscState;

    if (sscstateothers == '9999') {
        $('#sscstateothers_form').show()
    }
    else {
        $('#sscstateothers_form').hide()
    }

    var hscstateothers = taskObj.HscState;

    if (hscstateothers == '9999') {
        $('#hscstateothers_form').show()
    }
    else {
        $('#hscstateothers_form').hide()
    }

    var dipstateoth = taskObj.DiplomaState;
    if (dipstateoth == '9999') {
        $('#dipotherstate_form').show()
    }
    else {
        $('#dipotherstate_form').hide()
    }

    var ugstateoth = taskObj.UGState;

    if (ugstateoth == '9999') {
        $('#UGstateothers_form').show()
    }
    else {
        $('#UGstateothers_form').hide()
    }

    var pgstateoth = taskObj.PGState;
    if (pgstateoth == '9999') {
        $('#PGstateothers_form').show()
    }
    else {
        $('#PGstateothers_form').hide()
    }

    var aodstateoth = taskObj.AODState;
    if (aodstateoth == '9999') {
        $('#AODstateothers_form').show()
    }
    else {
        $('#AODstateothers_form').hide()
    }

    if (taskObj.IsBreakinEducation.Yes == 'true') {
        $('#reason_form').removeAttr('disabled');
    }
    else {
        $('#reason_form').attr('disabled', 'true');
    }

    if (taskObj.IsHscExists == 'true' || taskObj.IsHscExists == '1') {
        $('#divHsc').show();
        OBPager.SetTaskContentMemberValue('EducationDetails.IsHscExists', null, '1', false);
    }
    else {
        $('#divHsc').hide();
        OBPager.SetTaskContentMemberValue('EducationDetails.IsHscExists', null, '', false);
    }

    if (taskObj.IsDiplomaExists == 'true' || taskObj.IsDiplomaExists == '1') {
        $('#divDiploma').show();
        OBPager.SetTaskContentMemberValue('EducationDetails.IsDiplomaExists', 1, '1', false);
    }
    else {
        $('#divDiploma').hide();
        OBPager.SetTaskContentMemberValue('EducationDetails.IsDiplomaExists', 1, '', false);
    }

    if (taskObj.IsUGExists == 'true' || taskObj.IsUGExists == '1') {
        $('#divUG').show();
        OBPager.SetTaskContentMemberValue('EducationDetails.IsUGExists', 1, '1', false);
    }
    else {
        $('#divUG').hide();
        OBPager.SetTaskContentMemberValue('EducationDetails.IsUGExists', 1, '', false);
    }

    if (taskObj.IsPGExists == 'true' || taskObj.IsPGExists == '1') {
        $('#divPG').show();
        OBPager.SetTaskContentMemberValue('EducationDetails.IsPGExists', 1, '1', false);
    }
    else {
        $('#divPG').hide();
        OBPager.SetTaskContentMemberValue('EducationDetails.IsPGExists', 1, '', false);
    }

    if (taskObj.IsAnyOtherDegreeExists == 'true' || taskObj.IsAnyOtherDegreeExists == '1') {
        $('#divAod').show();
        OBPager.SetTaskContentMemberValue('EducationDetails.IsAnyOtherDegreeExists', 1, '1', false);
    }
    else {
        $('#divAod').hide();
        OBPager.SetTaskContentMemberValue('EducationDetails.IsAnyOtherDegreeExists', 1, '', false);
    }

    var ugunivoth = taskObj.UGCollege;
    if (ugunivoth != null) {
        if (ugunivoth.indexOf('OLB') >= 0 || ugunivoth.indexOf('OLT') >= 0 || ugunivoth.indexOf('OLG') >= 0 || ugunivoth == 'CLG99999') {
            $('#UGothersColg_form').show();
        }
        else {
            $('#UGothersColg_form').hide();
        }
    }

    var pgunivoth = taskObj.PGCollege;
    if (pgunivoth != null) {
        if (pgunivoth.indexOf('OLB') >= 0 || pgunivoth.indexOf('OLT') >= 0 || pgunivoth.indexOf('OLG') >= 0 || pgunivoth == 'CLG99999') {
            $('#PGOthcollege_form').show();
        }
        else {
            $('#PGOthcollege_form').hide();
        }
    }

    var aodunivoth = taskObj.AODCollege;
    if (aodunivoth != null) {
        if (aodunivoth.indexOf('OLB') >= 0 || aodunivoth.indexOf('OLT') >= 0 || aodunivoth.indexOf('OLG') >= 0 || aodunivoth == 'CLG99999') {
            $('#AODOthcollege_form').show();
        }
        else {
            $('#AODOthcollege_form').hide();
        }
    }

    var dipunivoth = taskObj.DiplomaCollege;
    if (dipunivoth != null) {
        if (dipunivoth.indexOf('OLB') >= 0 || dipunivoth.indexOf('OLT') >= 0 || dipunivoth.indexOf('OLG') >= 0 || dipunivoth == 'CLG99999') {
            $('#dipothcollege_form').show();
        }
        else {
            $('#dipothcollege_form').hide();
        }
    }

    var dipdegoth = taskObj.DiplomaDegree;
    if (dipdegoth != null) {
        if (dipdegoth.indexOf('OTH') >= 0) {
            $('#dipOthDeg_form').show();
        }
        else {
            $('#dipOthDeg_form').hide();
        }
    }

    var UGdegoth = taskObj.UGDegree;
    if (UGdegoth != null) {
        if (UGdegoth.indexOf('OTH') >= 0) {
            $('#UGOthDeg_form').show();
        }
        else {
            $('#UGOthDeg_form').hide();
        }
    }

    var PGdegoth = taskObj.PGDegree;
    if (PGdegoth != null) {
        if (PGdegoth.indexOf('OTH') >= 0) {
            $('#PGOthDeg_form').show();
        }
        else {
            $('#PGOthDeg_form').hide();
        }
    }

    var AODdegoth = taskObj.AODDegree;
    if (AODdegoth != null) {
        if (AODdegoth.indexOf('OTH') >= 0) {
            $('#AODOthDeg_form').show();
        }
        else {
            $('#AODOthDeg_form').hide();
        }
    }

    $('#ssccountry_form').change(function () {
        var countryId = $('#ssccountry_form').val();
        OBPager.GetGeographyMaster(2, countryId, "SSCStateList");
        $('#sscstate_form').removeAttr('disabled');
        OBPager.SetTaskContentMemberValue('EducationDetails.SscState', null, '-1', false);


    });

    $('#hsccountry_form').change(function () {
        var countryId = $('#hsccountry_form').val();
        OBPager.GetGeographyMaster(2, countryId, "HSCStateList");
        $('#hscstate_form').removeAttr('disabled');
        OBPager.SetTaskContentMemberValue('EducationDetails.HscState', null, '-1', false);
    });

    $('#dipcountry_form').change(function () {
        var countryId = $('#dipcountry_form').val();
        OBPager.GetGeographyMaster(2, countryId, "DipStateList");
        $('#dipstate_form').removeAttr('disabled');
        OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaState', null, '-1', false);
    });

    $('#sscstate_form').change(function () {
        var stateId = $('#sscstate_form').val();
        if (stateId == '9999') {
            $('#sscstateothers_form').show()

        }
        else {
            $('#sscstateothers_form').hide()

        }
    });


    $('#hscstate_form').change(function () {
        var stateId = $('#hscstate_form').val();
        if (stateId == '9999') {
            $('#hscstateothers_form').show()
        }
        else {
            $('#hscstateothers_form').hide()
        }
    });


    $('#dipstate_form').change(function () {
        var stateId = $('#dipstate_form').val();
        if (isbgvinitiated != 1) {
            OBPager.GetGeographyMaster(7, stateId, "DipCollegeList");
            $('#dipcollege_form').removeAttr('disabled');
            OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaCollege', null, '-1', false);
        }
        else {
            OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaCollege', null, 'CLG99999', false);
        }


        if (stateId == '9999') {
            $('#dipotherstate_form').show()
        }
        else {
            $('#dipotherstate_form').hide()
        }
    });

    $('#UGcountry_form').change(function () {
        var stateId = $('#UGcountry_form').val();
        OBPager.GetGeographyMaster(2, stateId, "UGStateList");
        $('#UGstate_form').removeAttr("disabled");
        OBPager.SetTaskContentMemberValue('EducationDetails.UGState', null, '-1', false);
    });

    $('#UGstate_form').change(function () {
        var stateId = $('#UGstate_form').val();
        if (isbgvinitiated != 1) {
            OBPager.GetGeographyMaster(7, stateId, "UGCollegeList");
            $('#UGcollege_form').removeAttr("disabled");
            OBPager.SetTaskContentMemberValue('EducationDetails.UGCollege', null, '-1', false);
        }
        else {
            OBPager.SetTaskContentMemberValue('EducationDetails.UGCollege', null, 'CLG99999', false);
        }

       

        if (stateId == '9999') {
            $('#UGstateothers_form').show()
        }
        else {
            $('#UGstateothers_form').hide()
        }
    });

    $('#PGcountry_form').change(function () {
        var stateId = $('#PGcountry_form').val();
        OBPager.GetGeographyMaster(2, stateId, "PGStateList");
        $('#PGstate_form').removeAttr("disabled");
        OBPager.SetTaskContentMemberValue('EducationDetails.PGState', null, '-1', false);
    });

    $('#PGstate_form').change(function () {
        var stateId = $('#PGstate_form').val();
        if (isbgvinitiated != 1) {
            OBPager.GetGeographyMaster(7, stateId, "PGCollegeList");
            $('#PGcollege_form').removeAttr("disabled");
            OBPager.SetTaskContentMemberValue('EducationDetails.PGCollege', null, '-1', false);
        }
        else {
            OBPager.SetTaskContentMemberValue('EducationDetails.PGCollege', null, 'CLG99999', false);
        }

 

        if (stateId == '9999') {
            $('#PGstateothers_form').show()
        }
        else {
            $('#PGstateothers_form').hide()
        }
    });

    $('#AODcountry_form').change(function () {
        var stateId = $('#AODcountry_form').val();
        OBPager.GetGeographyMaster(2, stateId, "AODStateList");
        $('#AODstate_form').removeAttr("disabled");
        OBPager.SetTaskContentMemberValue('EducationDetails.AODState', null, '-1', false);
    });

    $('#AODstate_form').change(function () {
        var stateId = $('#AODstate_form').val();
        if (isbgvinitiated != 1) {
            OBPager.GetGeographyMaster(7, stateId, "AODCollegeList");
            $('#AODcollege_form').removeAttr("disabled");
            OBPager.SetTaskContentMemberValue('EducationDetails.AODCollege', null, '-1', false);
        }
        else {
            OBPager.SetTaskContentMemberValue('EducationDetails.AODCollege', null, 'CLG99999', false);
        }


        if (stateId == '9999') {
            $('#AODstateothers_form').show()
        }
        else {
            $('#AODstateothers_form').hide()
        }
    });

    $('#UGcollege_form').change(function () {
        var univVal = $('#UGcollege_form').val();

        if (univVal.indexOf('OLB') >= 0 || univVal.indexOf('OLT') >= 0 || univVal.indexOf('OLG') >= 0 || univVal == 'CLG99999') {
            $('#UGothersColg_form').show();
        }
        else {
            $('#UGothersColg_form').hide();
        }
    });

    $('#UGDeg_form').change(function () {
        var univVal = $('#UGDeg_form').val();

        if (univVal.indexOf('OTH') >= 0) {
            $('#UGOthDeg_form').show();
        }
        else {
            $('#UGOthDeg_form').hide();
        }
    });

    $('#dipcollege_form').change(function () {
        var univVal = $('#dipcollege_form').val();

        if (univVal.indexOf('OLB') >= 0 || univVal.indexOf('OLT') >= 0 || univVal.indexOf('OLG') >= 0 || univVal == 'CLG99999') {
            $('#dipothcollege_form').show();
        }
        else {
            $('#dipothcollege_form').hide();
        }
    });

    $('#dipDeg_form').change(function () {
        var univVal = $('#dipDeg_form').val();

        if (univVal.indexOf('OTH') >= 0) {
            $('#dipOthDeg_form').show();
        }
        else {
            $('#dipOthDeg_form').hide();
        }
    });

    $('#PGcollege_form').change(function () {
        var univVal = $('#PGcollege_form').val();

        if (univVal.indexOf('OLB') >= 0 || univVal.indexOf('OLT') >= 0 || univVal.indexOf('OLG') >= 0 || univVal == 'CLG99999') {
            $('#PGOthcollege_form').show();
        }
        else {
            $('#PGOthcollege_form').hide();
        }
    });

    $('#PGDeg_form').change(function () {
        var univVal = $('#PGDeg_form').val();

        if (univVal.indexOf('OTH') >= 0) {
            $('#PGOthDeg_form').show();
        }
        else {
            $('#PGOthDeg_form').hide();
        }
    });

    $('#AODcollege_form').change(function () {
        var univVal = $('#AODcollege_form').val();

        if (univVal.indexOf('OLB') >= 0 || univVal.indexOf('OLT') >= 0 || univVal.indexOf('OLG') >= 0 || univVal == 'CLG99999') {
            $('#AODOthcollege_form').show();
        }
        else {
            $('#AODOthcollege_form').hide();
        }
    });

    $('#AODDeg_form').change(function () {
        var univVal = $('#AODDeg_form').val();

        if (univVal.indexOf('OTH') >= 0) {
            $('#AODOthDeg_form').show();
        }
        else {
            $('#AODOthDeg_form').hide();
        }
    });

    var isbgvinitiated = OBPager.IsBgvInitiated
    if (isbgvinitiated == 1) {
        var dipVal = taskObj.DiplomaCollege;
        var ugVal = taskObj.UGCollege;
        var pgVal = taskObj.PGCollege;
        var aodVal = taskObj.AODCollege;
        $('.BgvSync').each(function () {
            var obj = $(this);
            if (obj.val() != '' && obj.val() != null) {
                var cntrlID = obj.attr('id');
                $(this).remove();
                try { $('#' + cntrlID + '_bgvlbl').css('display', 'block'); } catch (e) { }
                try { $('#' + cntrlID + '_bgvlbl').html(obj.val().substring(0, 24)); } catch (e) { }
                try { $('#' + cntrlID + '_bgvlbl').val(obj.val()); } catch (e) { }
                $(this).removeClass("jqrydatepicker");
            }
        });

        $('.BgvdrpdwnSync').each(function () {
            var obj = $(this);
            if (obj.val() != '-1' && obj.val() != '- 1' && obj.val() != null) {
                var cntrlID = obj.attr('id');
                $(this).remove();
                try { $('#' + cntrlID + '_bgvlbl').css('display', 'block'); } catch (e) { }
                try { $('#' + cntrlID + '_bgvlbl').html(obj.find('option:selected').text().substring(0, 24)); } catch (e) { }
                try { $('#' + cntrlID + '_bgvlbl').val(obj.find('option:selected').text()); } catch (e) { }
            }
        });

        $('.BgvSyncChkbx').attr("disabled", "true");

        if (dipVal == 'CLG99999') {
            $('#dipcollege_form').remove();
            $('#dipcollege_form_bgvlbl').html($('#dipothcollege_form_bgvlbl').html());
            $('#dipcollege_form_bgvlbl').val($('#dipothcollege_form_bgvlbl').val());
            $('#dipothcollege_form_bgvlbl').remove();
            $('#dipcollege_form_bgvlbl').show();
        }
        if (ugVal == 'CLG99999') {
            $('#UGcollege_form').remove();
            $('#UGcollege_form_bgvlbl').html($('#UGothersColg_form_bgvlbl').html());
            $('#UGcollege_form_bgvlbl').val($('#UGothersColg_form_bgvlbl').val());
            $('#UGothersColg_form_bgvlbl').remove();
            $('#UGcollege_form_bgvlbl').show();
        }
        if (pgVal == 'CLG99999') {
            $('#PGcollege_form').remove();
            $('#PGcollege_form_bgvlbl').html($('#PGOthcollege_form_bgvlbl').html());
            $('#PGcollege_form_bgvlbl').val($('#PGOthcollege_form_bgvlbl').val());
            $('#PGOthcollege_form_bgvlbl').remove();
            $('#PGcollege_form_bgvlbl').show();
        }
        if (aodVal == 'CLG99999') {
            $('#AODcollege_form').remove();
            $('#AODcollege_form_bgvlbl').html($('#AODOthcollege_form_bgvlbl').html());
            $('#AODcollege_form_bgvlbl').val($('#AODOthcollege_form_bgvlbl').val());
            $('#AODOthcollege_form_bgvlbl').remove();
            $('#AODcollege_form_bgvlbl').show();
        }

    }

    $('.mna').hide();
    var Ismigrated = TaskPrefillValues.PrefillValues.Set1.IsMigratedCandidate;
    if (Ismigrated == 8) {

        $('.rollNo').each(function () {
            var obj = $(this).attr('id');
            $('#' + obj).removeClass('textMandatory');
        });
        $('.removecls').hide();
        $('.mna').show();

    }

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
        $('#reason_form').removeAttr('disabled');
    }
    else {
        OBPager.SetTaskContentMemberValue('EducationDetails.IsBreakinEducation.No', 1, '1', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.IsBreakinEducation.Yes', 1, '', false);
        $('#reason_form').attr('disabled', 'true');
    }
}

function ResetTaskData() {
    OBPager.ResetTaskContent();
}

function checkHsc() {
    if (document.getElementById('chk_hsc').checked == true) {
        $('#divHsc').show();
        OBPager.SetTaskContentMemberValue('EducationDetails.IsHscExists', null, 'true', true);
    }
    else {
        $('#divHsc').hide();
        OBPager.SetTaskContentMemberValue('EducationDetails.IsHscExists', null, '', true);
        OBPager.SetTaskContentMemberValue('EducationDetails.HscCountry', null, '-1', false);
        $('#hscstate_form').empty();
        $('#hscstate_form').attr("disabled", "true");
        OBPager.SetTaskContentMemberValue('EducationDetails.HscState', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.HscCollege', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.HscBoardOrUniversity', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.HscDegree', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.HscDiscipline', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.HscModeofEdu', null, '-1', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.HscGradeOrClass', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.HscAttendedFrom', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.HscAttendedTo', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.HscRegistrationNumber', null, '', false);
    }
}

function checkDiploma() {
    if (document.getElementById('chk_diploma').checked == true) {
        $('#divDiploma').show();
        OBPager.SetTaskContentMemberValue('EducationDetails.IsDiplomaExists', 1, 'true', false);
    }
    else {
        $('#divDiploma').hide();
        OBPager.SetTaskContentMemberValue('EducationDetails.IsDiplomaExists', 1, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaCountry', null, '-1', false);
        $('#dipstate_form').empty();
        $('#dipstate_form').attr("disabled", "true");
        OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaState', null, '', false);
        $('#dipcollege_form').empty();
        $('#dipcollege_form').attr("disabled", "true");
        OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaCollege', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaOthersCollege', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaBoardOrUniversity', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaDegree', null, '-1', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaOthersDegree', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaDiscipline', null, '-1', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaModeofEdu', null, '-1', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaGradeOrClass', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaAttendedFrom', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaAttendedTo', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.DiplomaRegistrationNumber', null, '', false);
        // jQXB.doBind(OBPager.taskContentDSName);
    }
}

function checkUG() {
    if (document.getElementById('chk_ug').checked == true) {
        $('#divUG').show();
        OBPager.SetTaskContentMemberValue('EducationDetails.IsUGExists', 1, 'true', false);
    }
    else {
        $('#divUG').hide();
        OBPager.SetTaskContentMemberValue('EducationDetails.IsUGExists', 1, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.UGCountry', null, '-1', false);
        $('#UGstate_form').empty();
        $('#UGstate_form').attr("disabled", "true");
        OBPager.SetTaskContentMemberValue('EducationDetails.UGState', null, '', false);
        $('#UGcollege_form').empty();
        $('#UGcollege_form').attr("disabled", "true");
        OBPager.SetTaskContentMemberValue('EducationDetails.UGCollege', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.UGOthersCollege', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.UGBoardOrUniversity', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.UGDegree', null, '-1', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.UGOthersDegree', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.UGDiscipline', null, '-1', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.UGModeofEdu', null, '-1', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.UGGradeOrClass', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.UGAttendedFrom', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.UGAttendedTo', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.UGRegistrationNumber', null, '', false);
    }
}

function checkPG() {
    if (document.getElementById('chk_pg').checked == true) {
        $('#divPG').show();
        OBPager.SetTaskContentMemberValue('EducationDetails.IsPGExists', 1, 'true', false);
    }
    else {
        $('#divPG').hide();
        OBPager.SetTaskContentMemberValue('EducationDetails.IsPGExists', 1, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.PGCountry', null, '-1', false);
        $('#PGstate_form').empty();
        $('#PGstate_form').attr("disabled", "true");
        OBPager.SetTaskContentMemberValue('EducationDetails.PGState', null, '', false);
        $('#PGcollege_form').empty();
        $('#PGcollege_form').attr("disabled", "true");
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
    }

}

function checkAOD() {
    if (document.getElementById('chk_aod').checked == true) {
        $('#divAod').show();
        OBPager.SetTaskContentMemberValue('EducationDetails.IsAnyOtherDegreeExists', 1, 'true', false);
    }
    else {
        $('#divAod').hide();
        OBPager.SetTaskContentMemberValue('EducationDetails.IsAnyOtherDegreeExists', 1, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.AODCountry', null, '-1', false);
        $('#AODstate_form').empty();
        $('#AODstate_form').attr("disabled", "true");
        OBPager.SetTaskContentMemberValue('EducationDetails.AODState', null, '', false);
        $('#AODcollege_form').empty();
        $('#AODcollege_form').attr("disabled", "true");
        OBPager.SetTaskContentMemberValue('EducationDetails.AODCollege', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.AODOthersCollege', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.AODBoardOrUniversity', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.AODDegree', null, '-1', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.AODOthersDegree', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.AODDiscipline', null, '-1', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.AODModeofEdu', null, '-1', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.AODGradeOrClass', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.AODAttendedFrom', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.AODAttendedTo', null, '', false);
        OBPager.SetTaskContentMemberValue('EducationDetails.AODRegistrationNumber', null, '', false);

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

$('.bgvLabel').live("mouseover", function () {

    var a = $(this).attr('id');
    //    a = a.replace("_bgvlbl", "");

    var d = $('#' + a).val();

    if (d == '--Select--') {


    }

    else {

        $(this).attr('title', d);

        $('#' + a + ' > option').each(function () {

            this.title = this.text;

        });

    }

});
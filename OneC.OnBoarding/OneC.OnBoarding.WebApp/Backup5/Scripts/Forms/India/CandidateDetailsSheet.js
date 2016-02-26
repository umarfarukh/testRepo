$().ready(function () {
    OBPager.ShowPage(1);
    OBPager.GetMaster(116, "YesOrNo");
    $('#FullTime').hide();
    $('#Contract').hide();
    $('#Intern').hide();
    $('#FullEmpID').hide();
    $('#ContractEmpID').hide();
    $('#InternEmpID').hide();



    PrePopulateValues();

    if (OBPager.taskStatusFlag == -1) {
        // Set member value manually
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.Candidateid', null, TaskPrefillValues.PrefillValues.Set1.Candidateid, false);
        // OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.Prefix', null, TaskPrefillValues.PrefillValues.Set1.Prefix, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.FirstName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.MiddleName', null, TaskPrefillValues.PrefillValues.Set1.MiddleName, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.LastName', null, TaskPrefillValues.PrefillValues.Set1.LastName, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.DateofJoining', null, TaskPrefillValues.PrefillValues.Set1.DateofJoining, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.DateofBirth', null, TaskPrefillValues.PrefillValues.Set1.DateofBirth, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.Designation', null, TaskPrefillValues.PrefillValues.Set1.Designation, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.Recruiter', null, TaskPrefillValues.PrefillValues.Set1.Recruiter, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.FullTime', null, TaskPrefillValues.PrefillValues.Set1.FullTime, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.Contract', null, TaskPrefillValues.PrefillValues.Set1.Contract, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.Intern', null, TaskPrefillValues.PrefillValues.Set1.Intern, false);
        $('#FullTime').removeClass('textMandatory');
        $('#Contract').removeClass('textMandatory');
        $('#Intern').removeClass('textMandatory');

    }
    else if (OBPager.taskStatusFlag == 0 || OBPager.taskStatusFlag == 1) {
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.Candidateid', null, TaskPrefillValues.PrefillValues.Set1.Candidateid, false);
        // OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.Prefix', null, TaskPrefillValues.PrefillValues.Set1.Prefix, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.FirstName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.MiddleName', null, TaskPrefillValues.PrefillValues.Set1.MiddleName, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.LastName', null, TaskPrefillValues.PrefillValues.Set1.LastName, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.DateofJoining', null, TaskPrefillValues.PrefillValues.Set1.DateofJoining, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.DateofBirth', null, TaskPrefillValues.PrefillValues.Set1.DateofBirth, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.Designation', null, TaskPrefillValues.PrefillValues.Set1.Designation, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.Recruiter', null, TaskPrefillValues.PrefillValues.Set1.Recruiter, false);
        //        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.FullTime', null, TaskPrefillValues.PrefillValues.Set1.FullTime, false);
        //        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.Contract', null, TaskPrefillValues.PrefillValues.Set1.Contract, false);
        //        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.Intern', null, TaskPrefillValues.PrefillValues.Set1.Intern, false);
        



    }

    jQXB.doBind(OBPager.taskContentDSName);


    $('#FullTime_form').change(function () {
        var FullTime = $('#FullTime_form').val();
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.FullTime', null, FullTime, false);
        if (FullTime != -1) {
            if (FullTime == 1) {
                $('#FullTime').show();
                $('#FullEmpID').show();
                $('#FullTime').addClass('textMandatory');

                OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.FullTimeEmployeeID', null, $('#FullTime').value, false);
            }
            else {

                $('#FullTime').hide();
                $('#FullEmpID').hide();
                $('#FullTime').removeClass('textMandatory');
                OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.FullTimeEmployeeID', null, null, false);
            }
        }
        else {
            $('#FullTime').hide();
            $('#FullEmpID').hide();
            $('#FullTime').removeClass('textMandatory');
            OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.FullTimeEmployeeID', null, null, false);

        }
    });
  
    $('#Contract_form').change(function () {
        var Contract = $('#Contract_form').val();
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.Contract', null, Contract, false);
        if (Contract != -1) {
            if (Contract == 1) {
                $('#Contract').show();
                $('#ContractEmpID').show();
                $('#Contract').addClass('textMandatory');

                OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.ContractEmployeeID', null, $('#Contract').value, false);
            }
            else {
                $('#Contract').hide();
                $('#ContractEmpID').hide();
                $('#Contract').removeClass('textMandatory');
                OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.ContractEmployeeID', null, null, false);
            }
        }
        else {
            $('#Contract').hide();
            $('#ContractEmpID').hide();
            $('#Contract').removeClass('textMandatory');
            OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.ContractEmployeeID', null, null, false);
        }
    });

    $('#Intern_form').change(function () {
        var Intern = $('#Intern_form').val();
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.Intern', null, Intern, false);
        if (Intern != -1) {
            if (Intern == 1) {
                $('#Intern').show();
                $('#InternEmpID').show();
                $('#Intern').addClass('textMandatory');
                OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.InternEmployeeID', null, $('#Intern').value, false);
            }
            else {
                $('#Intern').hide();
                $('#InternEmpID').hide();
                $('#Intern').removeClass('textMandatory');
                OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.InternEmployeeID', null, null, false);
            }
        }
        else {
            $('#Intern').hide();
            $('#InternEmpID').hide();
            $('#Intern').removeClass('textMandatory');
            OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.InternEmployeeID', null, null, false);
        }
    });

    jQXB.doBind(OBPager.taskContentDSName);

});
function PrePopulateValues() {
    var FullTime = JSON.parse(OBPager.strFormDetails).CandidateDetailsSheet.FullTime;
    var FullTimeEmpID = JSON.parse(OBPager.strFormDetails).CandidateDetailsSheet.FullTimeEmployeeID;
    var Contract = JSON.parse(OBPager.strFormDetails).CandidateDetailsSheet.Contract;
    var ContractEmpID = JSON.parse(OBPager.strFormDetails).CandidateDetailsSheet.ContractEmployeeID;
    var Intern = JSON.parse(OBPager.strFormDetails).CandidateDetailsSheet.Intern;
    var InternEmpID = JSON.parse(OBPager.strFormDetails).CandidateDetailsSheet.InternEmployeeID;
    if (FullTime != -1 && FullTime != null && FullTime != '') {
        if (FullTime == 1) {
            OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.FullTimeEmployeeID', null, FullTimeEmpID, false);
            $('#FullTime').show();
            $('#FullEmpID').show();
        }
        else {
            $('#FullTime').hide();
            $('#FullEmpID').hide();
            $('#FullTime').removeClass('textMandatory');
            OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.FullTimeEmployeeID', null, null, false);
        }
    }
    if (Contract != -1 && Contract != null && Contract != '') {
        if (Contract == 1) {
            OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.ContractEmployeeID', null, ContractEmpID, false);
            $('#Contract').show();
            $('#ContractEmpID').show();
        }
        else {
            $('#Contract').hide();
            $('#ContractEmpID').hide();
            $('#Contract').removeClass('textMandatory');
            OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.ContractEmployeeID', null, null, false);
        }
    }
    if (Intern != -1 && Intern != null && Intern != '') {
        if (Intern == 1) {
            OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.InternEmployeeID', null, InternEmpID, false);
            $('#Intern').show();
            $('#InternEmpID').show();
        }
        else {
            $('#Intern').hide();
            $('#InternEmpID').hide();
            $('#Intern').removeClass('textMandatory');
            OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.InternEmployeeID', null, null, false);
        }
    }

    jQXB.doBind(OBPager.taskContentDSName);
}

function SaveTaskData(saveMode) {
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

function ResetTaskData() {
    OBPager.ResetTaskContent();
    PrePopulateValues();
    if (OBPager.taskStatusFlag == -1) {
        $('#Intern').hide();
        $('#InternEmpID').hide();
        $('#Contract').hide();
        $('#ContractEmpID').hide();
        $('#FullTime').hide();
        $('#FullEmpID').hide();
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.Candidateid', null, TaskPrefillValues.PrefillValues.Set1.Candidateid, false);
        // OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.Prefix', null, TaskPrefillValues.PrefillValues.Set1.Prefix, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.FirstName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.MiddleName', null, TaskPrefillValues.PrefillValues.Set1.MiddleName, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.LastName', null, TaskPrefillValues.PrefillValues.Set1.LastName, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.DateofJoining', null, TaskPrefillValues.PrefillValues.Set1.DateofJoining, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.DateofBirth', null, TaskPrefillValues.PrefillValues.Set1.DateofBirth, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.Designation', null, TaskPrefillValues.PrefillValues.Set1.Designation, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.Recruiter', null, TaskPrefillValues.PrefillValues.Set1.Recruiter, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.FullTime', null, TaskPrefillValues.PrefillValues.Set1.FullTime, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.Contract', null, TaskPrefillValues.PrefillValues.Set1.Contract, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.Intern', null, TaskPrefillValues.PrefillValues.Set1.Intern, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.InternEmployeeID', null, null, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.ContractEmployeeID', null, null, false);
        OBPager.SetTaskContentMemberValue('CandidateDetailsSheet.FullTimeEmployeeID', null, null, false);

    }
    jQXB.doBind(OBPager.taskContentDSName);
}

$(function () {
    $(".jQrydatepicker").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar',
        yearRange: "-62:+0",
        maxDate: "0",
        disabled: true,
        showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    });

    $(".jQryExpdate").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar',
        yearRange: "2012:+50",
        showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    });
});
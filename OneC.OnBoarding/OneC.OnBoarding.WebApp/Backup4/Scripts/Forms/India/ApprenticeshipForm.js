




//Preparing form
$().ready(function () {
    OBPager.ShowPage(1);
    var caste = JSON.parse(OBPager.strFormDetails).ApprenticeshipForm.MinorityCommunity;
    $('#minority_form').hide();
    

    $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set1.Date);
    //if (OBPager.taskStatusFlag == -1) {
        // Set member value manually
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.Name', null, TaskPrefillValues.PrefillValues.Set1.Name, false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.DOB', null, TaskPrefillValues.PrefillValues.Set1.DOB, false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.Age', null, TaskPrefillValues.PrefillValues.Set1.Age, false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.TempAddress', null, TaskPrefillValues.PrefillValues.Set1.CurrentAddress, false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.PermAddress', null, TaskPrefillValues.PrefillValues.Set1.PermanentAddress, false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.TempPincode', null, TaskPrefillValues.PrefillValues.Set1.CurrPinCode, false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.PermPincode', null, TaskPrefillValues.PrefillValues.Set1.PermPinCode, false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.Institution', null, TaskPrefillValues.PrefillValues.Set1.College, false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.Qualification', null, TaskPrefillValues.PrefillValues.Set1.Qualification, false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.YOP', null, TaskPrefillValues.PrefillValues.Set1.YearMonthPassing, false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.MOP', null, TaskPrefillValues.PrefillValues.Set1.PassingYear, false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.Period', null, TaskPrefillValues.PrefillValues.Set1.Period, false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.Stipend', null, TaskPrefillValues.PrefillValues.Set1.Stipend, false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.Grade', null, TaskPrefillValues.PrefillValues.Set1.Grade, false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.DOT', null, TaskPrefillValues.PrefillValues.Set1.DOJ, false);
        $('#minority_form').hide();
   // }


    if (TaskPrefillValues.PrefillValues.Set1.Sex == 'M') {
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.Male', null, '1', false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.Female', null, '', false);
    }
    else {
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.Female', null, '1', false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.Male', null, '', false);
    }

    jQXB.doBind(OBPager.taskContentDSName);


});


function Course(flag) {
    if (flag == 0) {
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.SandwichCourseYes', null, '1', false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.SandwichCourseNo', null, '', false);
        
        
    }
    else {
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.SandwichCourseYes', null, '', false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.SandwichCourseNo', null, '1', false);
    }

}

function Caste(flag) {
    if (flag == 0) {
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.SC', null, '1', false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.ST', null, '', false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.Handicapped', null, '', false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.MinorityCommunity', null, '', false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.NotApplicable', null, '', false);
        $('#minority_form').hide();
     }
    if (flag == 1) {
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.SC', null, '', false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.ST', null, '1', false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.Handicapped', null, '', false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.MinorityCommunity', null, '', false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.NotApplicable', null, '', false);
        $('#minority_form').hide();
    }
    if (flag == 2) {
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.SC', null, '', false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.ST', null, '', false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.Handicapped', null, '1', false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.MinorityCommunity', null, '', false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.NotApplicable', null, '', false);
        $('#minority_form').hide();
    }
    if (flag == 3) {
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.SC', null, '', false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.ST', null, '', false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.Handicapped', null, '', false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.MinorityCommunity', null, '1', false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.NotApplicable', null, '', false);
        $('#minority_form').hide();

    }
    if (flag == 4) {
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.SC', null, '', false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.ST', null, '', false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.Handicapped', null, '', false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.MinorityCommunity', null, '', false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.NotApplicable', null, '1', false);
        $('#minority_form').hide();
    }

}




function SaveTaskData(saveMode) {


    // saveMode { 0:Save, 1:Submit }
    if (saveMode == 1) {
        // if (validate.ValidateSubmit() == true) {
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
            }
        }
        else {

            MsgboxInfo(OBPager.ValidationMessage);
        }
        //  }
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
        }
    }


}


function ResetTaskData() {
    OBPager.ResetTaskContent();
    $("#Pg_1_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_1_text_DOB").val(TaskPrefillValues.PrefillValues.Set1.DOB);
    $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set1.Date);
    $("#Pg_1_text_Name1").val(TaskPrefillValues.PrefillValues.Set1.Name);
    if (OBPager.taskStatusFlag == -1) {
        // Set member value manually
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.Name', null, TaskPrefillValues.PrefillValues.Set1.Name, false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.DOB', null, TaskPrefillValues.PrefillValues.Set1.DOB, false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.Age', null, TaskPrefillValues.PrefillValues.Set1.Age, false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.TempAddress', null, TaskPrefillValues.PrefillValues.Set1.CurrentAddress, false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.PermAddress', null, TaskPrefillValues.PrefillValues.Set1.PermanentAddress, false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.TempPincode', null, TaskPrefillValues.PrefillValues.Set1.CurrPinCode, false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.PermPincode', null, TaskPrefillValues.PrefillValues.Set1.PermPinCode, false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.Institution', null, TaskPrefillValues.PrefillValues.Set1.College, false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.Qualification', null, TaskPrefillValues.PrefillValues.Set1.Qualification, false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.YOP', null, TaskPrefillValues.PrefillValues.Set1.YearMonthPassing, false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.MOP', null, TaskPrefillValues.PrefillValues.Set1.PassingYear, false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.Period', null, TaskPrefillValues.PrefillValues.Set1.Period, false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.Stipend', null, TaskPrefillValues.PrefillValues.Set1.Stipend, false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.Grade', null, TaskPrefillValues.PrefillValues.Set1.Grade, false);
        OBPager.SetTaskContentMemberValue('ApprenticeshipForm.DOT', null, TaskPrefillValues.PrefillValues.Set1.DOJ, false);
        $('#minority_form').hide();
        jQXB.doBind(OBPager.taskContentDSName);
    }

}

window.onbeforeunload = closeIt;
function closeIt() {
    try { window.parent.opener.disablePopup(); } catch (e) { }
    try { window.parent.opener.CloseChildPage(); } catch (e) { }
} 

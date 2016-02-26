var ValidationMessage;

$().ready(function () {
    //OBPager.GetMaster(13, "RelationList");

    if (TaskPrefillValues.PrefillValues.Set1.Gender == 'M') {
        OBPager.GetGeographyMaster(23, 1, "RelationList");
    }
    else {
        OBPager.GetGeographyMaster(23, 0, "RelationList");
    }
    OBPager.GetMaster(14, "GenderList");
    OBPager.GetMaster(15, "MaritalStatusList");
    $('#Gender').attr('disabled', 'true');
    $('#MaritalStatus').attr('disabled', 'true');


    $('#NomineeRelation1').change(function () {
        var stateId = $('#NomineeRelation1').val();
        if (stateId == 53 || stateId == 54) {
            alert('Grandson and Granddaughter can be a nominee only if they were born to your son and your son is not currently alive');
        }

    });

    $('#NomineeRelation2').change(function () {
        var stateId = $('#NomineeRelation2').val();
        if (stateId == 53 || stateId == 54) {
            alert('Grandson and Granddaughter can be a nominee only if they were born to your son and your son is not currently alive');
        }

    });


    //   if (OBPager.taskStatusFlag == -1) {

    OBPager.SetTaskContentMemberValue('GratutiyNominationForm.Name1', null, TaskPrefillValues.PrefillValues.Set1.NAME, false);
    OBPager.SetTaskContentMemberValue('GratutiyNominationForm.Name2', null, TaskPrefillValues.PrefillValues.Set1.NAME, false);
    OBPager.SetTaskContentMemberValue('GratutiyNominationForm.Gender', null, TaskPrefillValues.PrefillValues.Set1.Gender, false);
    OBPager.SetTaskContentMemberValue('GratutiyNominationForm.DOJ1', null, TaskPrefillValues.PrefillValues.Set1.DOJ, false);
    OBPager.SetTaskContentMemberValue('GratutiyNominationForm.DOJ2', null, TaskPrefillValues.PrefillValues.Set1.DOJ, false);
    OBPager.SetTaskContentMemberValue('GratutiyNominationForm.Date4', null, TaskPrefillValues.PrefillValues.Set1.DOJ, false);
    OBPager.SetTaskContentMemberValue('GratutiyNominationForm.DOJ3', null, TaskPrefillValues.PrefillValues.Set1.DOJ, false);

    jQXB.doBind(OBPager.taskContentDSName);
    OBPager.ShowPage(1);

    $(".ubs").hide();
    $(".cls").hide();
    var UBSFlag = TaskPrefillValues.PrefillValues.Set1.UBSFlag
    if (UBSFlag == 1) {
        $(".ubs").show();
        $(".normal").hide();
        $(".cls").hide();
    }
    if (UBSFlag == 2) {
        $(".cls").show();
        $(".normal").hide();
        $(".ubs").hide();
    }

});

function SaveTaskData(saveMode) {
    if (saveMode == 1) {
        if (OBPager.ValidateTaskData(saveMode) == true) {
//            try {
//                if (OBPager.SaveTaskData(saveMode) == true) {
//                    return true;
//                }
//                else {
//                    return false;
//                }
//            }
            //            catch (e) { }
            try {
                MsgboxConfirm(sessionId, 6, 223, 'Ind_FormF_Form2_Submit', "<p style=line-height:20px;>Please carry the duly signed Form on your date of joining. This form will be part of Joining booklet which will be available for print on completion of all Joining formalities.</p>", submitcallback);
            }
            catch (e) {
                alert(e);
            }
        }
        else {

            MsgboxInfo(OBPager.ValidationMessage);
        }
    }
    else {
        try {
            MsgboxConfirm(sessionId, 6, 223, 'Ind_FormF_Form2_Submit', "<p style=line-height:20px;>Please carry the duly signed Form on your date of joining. This form will be part of Joining booklet which will be available for print on completion of all Joining formalities.</p>", savecallback);
        }
        catch (e) {
            alert(e);
        }
//        try {
//            if (OBPager.SaveTaskData(saveMode) == true) {
//                return true;
//            }
//            else {
//                alert('Error occured while saving the task');
//                return false;
//            }
//        }
//        catch (e) {
//            alert(e.Message);
//        }
    }
}
function ResetTaskData() {
    OBPager.ResetTaskContent();
    if (OBPager.taskStatusFlag == -1) {

        OBPager.SetTaskContentMemberValue('GratutiyNominationForm.Name1', null, TaskPrefillValues.PrefillValues.Set1.NAME, false);
        OBPager.SetTaskContentMemberValue('GratutiyNominationForm.Name2', null, TaskPrefillValues.PrefillValues.Set1.NAME, false);
        OBPager.SetTaskContentMemberValue('GratutiyNominationForm.Gender', null, TaskPrefillValues.PrefillValues.Set1.Gender, false);
        OBPager.SetTaskContentMemberValue('GratutiyNominationForm.DOJ1', null, TaskPrefillValues.PrefillValues.Set1.DOJ, false);
        OBPager.SetTaskContentMemberValue('GratutiyNominationForm.DOJ2', null, TaskPrefillValues.PrefillValues.Set1.DOJ, false);
        OBPager.SetTaskContentMemberValue('GratutiyNominationForm.Date4', null, TaskPrefillValues.PrefillValues.Set1.CurrentDate, false);
        OBPager.SetTaskContentMemberValue('GratutiyNominationForm.DOJ3', null, TaskPrefillValues.PrefillValues.Set1.DOJ, false);

        jQXB.doBind(OBPager.taskContentDSName);
    }

}

$('#NomineeProportion1').live("change", function () {
    if ($(this).val() < 101) { } else { alert("Proportion should not exceed 100%"); }
});

$(function () {
    
    $(".jqrydatepicker").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar', yearRange: "1920:+0", maxDate: "0",
        showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true
    });

});

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
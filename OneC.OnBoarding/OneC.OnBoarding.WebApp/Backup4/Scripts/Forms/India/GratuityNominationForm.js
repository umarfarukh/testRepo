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
    // Set member value manually
    OBPager.SetTaskContentMemberValue('GratutiyNominationForm.Name', null, TaskPrefillValues.PrefillValues.Set1.NAME, false);
    OBPager.SetTaskContentMemberValue('GratutiyNominationForm.Name1', null, TaskPrefillValues.PrefillValues.Set1.Name1, false);
    OBPager.SetTaskContentMemberValue('GratutiyNominationForm.Gender', null, TaskPrefillValues.PrefillValues.Set1.Gender, false);
    OBPager.SetTaskContentMemberValue('GratutiyNominationForm.AssosiateName', null, TaskPrefillValues.PrefillValues.Set1.Name1, false);
    OBPager.SetTaskContentMemberValue('GratutiyNominationForm.MaritalStatus', null, TaskPrefillValues.PrefillValues.Set1.MaritalStatus, false);
    OBPager.SetTaskContentMemberValue('GratutiyNominationForm.DOB', null, TaskPrefillValues.PrefillValues.Set1.DOB, false);
    OBPager.SetTaskContentMemberValue('GratutiyNominationForm.Date', null, TaskPrefillValues.PrefillValues.Set1.CurrentDate, false);
    OBPager.SetTaskContentMemberValue('GratutiyNominationForm.Gender', null, TaskPrefillValues.PrefillValues.Set1.Gender, false);
    OBPager.SetTaskContentMemberValue('GratutiyNominationForm.Address1', null, TaskPrefillValues.PrefillValues.Set1.AddressDetails, false);
    OBPager.SetTaskContentMemberValue('GratutiyNominationForm.Scheme', null, TaskPrefillValues.PrefillValues.Set1.CurrentDate, false);
    OBPager.SetTaskContentMemberValue('GratutiyNominationForm.Date1', null, TaskPrefillValues.PrefillValues.Set1.CurrentDate, false);
    //   }
    jQXB.doBind(OBPager.taskContentDSName);
    OBPager.ShowPage(1);
    $(".ubs").hide();
    var UBSFlag = TaskPrefillValues.PrefillValues.Set1.UBSFlag
    if (UBSFlag == 1) {
        $(".ubs").show();
        $(".normal").hide();
    }

});

function SaveTaskData(saveMode) {
    if (saveMode == 1) {
        if (OBPager.ValidateTaskData(saveMode) == true) {
            try {
                if (OBPager.SaveTaskData(saveMode) == true) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (e) {}
        }
        else {

            MsgboxInfo(OBPager.ValidationMessage);
        }
    }
    else {

        try {
            if (OBPager.SaveTaskData(saveMode) == true) {
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
        OBPager.SetTaskContentMemberValue('GratutiyNominationForm.Name', null, TaskPrefillValues.PrefillValues.Set1.Name, false);
        OBPager.SetTaskContentMemberValue('GratutiyNominationForm.Name1', null, TaskPrefillValues.PrefillValues.Set1.Name1, false);
        OBPager.SetTaskContentMemberValue('GratutiyNominationForm.Gender', null, TaskPrefillValues.PrefillValues.Set1.Gender, false);
        OBPager.SetTaskContentMemberValue('GratutiyNominationForm.AssosiateName', null, TaskPrefillValues.PrefillValues.Set1.Name1, false);
        OBPager.SetTaskContentMemberValue('GratutiyNominationForm.MaritalStatus', null, TaskPrefillValues.PrefillValues.Set1.MaritalStatus, false);
        OBPager.SetTaskContentMemberValue('GratutiyNominationForm.DOB', null, TaskPrefillValues.PrefillValues.Set1.DOB, false);
        OBPager.SetTaskContentMemberValue('GratutiyNominationForm.Date', null, TaskPrefillValues.PrefillValues.Set1.CurrentDate, false);
        OBPager.SetTaskContentMemberValue('GratutiyNominationForm.Gender', null, TaskPrefillValues.PrefillValues.Set1.Gender, false);
        OBPager.SetTaskContentMemberValue('GratutiyNominationForm.Address1', null, TaskPrefillValues.PrefillValues.Set1.AddressDetails, false);
        OBPager.SetTaskContentMemberValue('GratutiyNominationForm.RelationName', null, TaskPrefillValues.PrefillValues.Set1.RelationName, false);
        OBPager.SetTaskContentMemberValue('GratutiyNominationForm.Scheme', null, TaskPrefillValues.PrefillValues.Set1.CurrentDate, false);
        OBPager.SetTaskContentMemberValue('GratutiyNominationForm.Date1', null, TaskPrefillValues.PrefillValues.Set1.CurrentDate, false);
        //   OBPager.SetTaskContentMemberValue('GratutiyNominationForm.NomineeRelation1', null, TaskPrefillValues.PrefillValues.Set2.NomineeRelation1, false);
        //Do a data bind finally
        jQXB.doBind(OBPager.taskContentDSName);
    }
 
}
$('#NomineeProportion1').live("change",function () {
    if ($(this).val() < 101) { } else { alert("Proportion should not exceed 100%"); }
});
//$('#NomineeProportion2').live('focus', function () {
//    var t = $('#NomineeProportion1').val();
//    var z = 100 - t;
//    var nomAge = $('#NomineeAge2').val().length;
//    var nomName = $('#NomineeName2').val().length;
//    if (nomAge != 0 && nomName != 0) {
//        if (t <= 100) {
//            $('#NomineeProportion2').val(z);
//        }
//        else {
//            alert("Proportion should not exceed 100%");
//        } 
//    }

//});



$(function () {
    //   $(".jqrydatepicker").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar', showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    $(".jqrydatepicker").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar', yearRange: "1920:+0", maxDate: "0",
        showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true
    });

    // });



});
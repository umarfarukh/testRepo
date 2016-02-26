$().ready(function () {
    OBPager.ShowPage(1);
    if (OBPager.taskStatusFlag == "-1") {
    }
//    $('input[type="checkbox"]').live("click", function () {
//        var obj = $(this);
//        var chked = obj.is(":checked");
//        var val = (chked == true) ? true : '';
//        var datamember = obj.attr('jqxb-datamember');
//        OBPager.SetTaskContentMemberValue(datamember, null, val, true);

    //    });

       $('input[class="FormChkBx"]').live("click", function () {
        var obj = $(this);
        var chked = obj.is(":checked");
        var val = (chked == true) ? true : '';
        var datamember = obj.attr('jqxb-datamember');
        OBPager.SetTaskContentMemberValue(datamember, null, val, true);

    });

});


function ChangeFlasetoEmpty() {
//    $('input[type="checkbox"]').each(function () {
//        var obj = $(this);
//        var chked = obj.is(":checked");
//        if (chked == false) {
//            var datamember = obj.attr('jqxb-datamember');
//            OBPager.SetTaskContentMemberValue(datamember, null, '', true);
//        }
    //    });
   
        $('input[class="FormChkBx"]').each(function () {
        var obj = $(this);
        var chked = obj.is(":checked");
        if (chked == false) {
            var datamember = obj.attr('jqxb-datamember');
            OBPager.SetTaskContentMemberValue(datamember, null, '', true);
        }
        });

}


function SaveTaskData(saveMode) {
    ChangeFlasetoEmpty();

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
    if (OBPager.taskStatusFlag == "-1") {
    }

}

//    if ($('#DS_Amphetamine_chkbx').is(':checked')) {
//        OBPager.SetTaskContentMemberValue('DrugScreening.PAmphetamine', null, 'true', false);
//    }
//    else {
//        OBPager.SetTaskContentMemberValue('DrugScreening.PAmphetamine', null, '', false);
//    }
//    if ($('#DS_THC_chkbx').is(':checked')) {
//        OBPager.SetTaskContentMemberValue('DrugScreening.PTHC', null, 'true', false);
//    }
//    else {
//        OBPager.SetTaskContentMemberValue('DrugScreening.PTHC', null, '', false);
//    }
//    if ($('#DS_Methamphetamine_chkbx').is(':checked')) {
//        OBPager.SetTaskContentMemberValue('DrugScreening.PMethamphetamine', null, 'true', false);
//    }
//    else {
//        OBPager.SetTaskContentMemberValue('DrugScreening.PMethamphetamine', null, '', false);
//    }
//    if ($('#DS_Cocine_chkbx').is(':checked')) {
//        OBPager.SetTaskContentMemberValue('DrugScreening.PCocine', null, 'true', false);
//    }
//    else {
//        OBPager.SetTaskContentMemberValue('DrugScreening.PCocine', null, '', false);
//    }
//    if ($('#DS_Opiate_chkbx').is(':checked')) {
//        OBPager.SetTaskContentMemberValue('DrugScreening.POpiate', null, 'true', false);
//    }
//    else {
//        OBPager.SetTaskContentMemberValue('DrugScreening.POpiate', null, '', false);
//    }
//    if ($('#DS_Morphine_chkbx').is(':checked')) {
//        OBPager.SetTaskContentMemberValue('DrugScreening.PMorphine', null, 'true', false);
//    }
//    else {
//        OBPager.SetTaskContentMemberValue('DrugScreening.PMorphine', null, '', false);
//    }
//    if ($('#DS_Codeine_chkbx').is(':checked')) {
//        OBPager.SetTaskContentMemberValue('DrugScreening.PCodeine', null, 'true', false);
//    }
//    else {
//        OBPager.SetTaskContentMemberValue('DrugScreening.PCodeine', null, '', false);
//    }
//    if ($('#DS_Heroin_chkbx').is(':checked')) {
//        OBPager.SetTaskContentMemberValue('DrugScreening.PHeroin', null, 'true', false);
//    }
//    else {
//        OBPager.SetTaskContentMemberValue('DrugScreening.PHeroin', null, '', false);
//    }
//    if ($('#DS_Phencyclidine_chkbx').is(':checked')) {
//        OBPager.SetTaskContentMemberValue('DrugScreening.PPCP', null, 'true', false);
//    }
//    else {
//        OBPager.SetTaskContentMemberValue('DrugScreening.PPCP', null, '', false);
//    }



//});
$(function () {
    //    $(".jQrydatepicker").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar',
    //        yearRange: "-62:+0",
    //        maxDate: "0",
    //        showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    //    });

    $(".jqrydatepicker").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar', yearRange: "1940:+0", maxDate: "0",
        showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true
    });
});
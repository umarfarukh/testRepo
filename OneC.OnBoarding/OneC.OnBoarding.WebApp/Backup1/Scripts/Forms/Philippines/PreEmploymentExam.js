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

        ChangeFlasetoEmpty()
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
//function Examination() {
//    if ($('#PEE_Complete_chkbx').is(':checked')) {
//        OBPager.SetTaskContentMemberValue('PreEmploymentExam.PComplete', null, 'true', false);
//    }
//    else {
//        OBPager.SetTaskContentMemberValue('PreEmploymentExam.PComplete', null, '', false);
//    }
//    if ($('#PPE_Urinalysis_chkbx').is(':checked')) {
//        OBPager.SetTaskContentMemberValue('PreEmploymentExam.PUrinalysis', null, 'true', false);
//    }
//    else {
//        OBPager.SetTaskContentMemberValue('PreEmploymentExam.PUrinalysis', null, '', false);
//    }
//    if ($('#PPE_Fecalysis_chkbx').is(':checked')) {
//        OBPager.SetTaskContentMemberValue('PreEmploymentExam.PFecalysis', null, 'true', false);
//    }
//    else {
//        OBPager.SetTaskContentMemberValue('PreEmploymentExam.PFecalysis', null, '', false);
//    }
//    if ($('#PPE_Blood_chkbx').is(':checked')) {
//        OBPager.SetTaskContentMemberValue('PreEmploymentExam.PBloodCount', null, 'true', false);
//    }
//    else {
//        OBPager.SetTaskContentMemberValue('PreEmploymentExam.PBloodCount', null, '', false);
//    }
//    if ($('#PPE_Chest_chkbx').is(':checked')) {
//        OBPager.SetTaskContentMemberValue('PreEmploymentExam.PChestXRay', null, 'true', false);
//    }
//    else {
//        OBPager.SetTaskContentMemberValue('PreEmploymentExam.PChestXRay', null, '', false);
//    }
//}
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
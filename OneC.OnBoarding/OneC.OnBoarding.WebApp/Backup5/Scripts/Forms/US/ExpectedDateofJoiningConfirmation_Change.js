
var ChangeDojFlag = 0;
var compDoj = 0;//Flag to enable based on date doj-2,doj-1
$().ready(function () {
    OBPager.ShowPage(1);
    // OBPager.GetMaster(217, "LocationList");
    $('#btnResetTask').hide();
    $('#btnSaveTask').hide();
    var doj_2 = TaskPrefillValues.PrefillValues.Set1.DOJ1;
    $('#doj_2').text(doj_2);
    $('#doj_3').text(doj_2);
    if (OBPager.taskStatusFlag == -1) {
        $('#Pg_1_text_EDOJ').attr('disabled', true);
        OBPager.SetTaskContentMemberValue('EDOJ.DOJ', null, TaskPrefillValues.PrefillValues.Set1.DOJ, false);
    }
    jQXB.doBind(OBPager.taskContentDSName);

    var IsChangeDojReq = TaskPrefillValues.PrefillValues.Set1.DOJChangeDojFlag;
        compDoj = TaskPrefillValues.PrefillValues.Set1.CompDoj;
    var DojConfirmRC = TaskPrefillValues.PrefillValues.Set1.DojConfirmRC;//flag to check the confirmation status of RC
    if (compDoj == 1 || compDoj == 3) {
        $("#pg_2_REDOJ").hide();
        $("#pg1_dtmodify").hide();
        $("#pg_1_EDOJ").attr('disabled', true);
        $("#pg_2_candComments").hide();
        $("#Pg_1_text_EDOJ").removeClass('jQryExpdate');
        $("#pg_1_Note").hide();
        $("#pg1_inititate").show();
    }
    else {
        $("#pg_2_REDOJ").hide();
        $("#pg1_inititate").hide();
        $("#pg_2_candComments").hide();
    }
    if (OBPager.taskStatusFlag == 1 && IsChangeDojReq == 1) {
        $('.ui-datepicker-trigger').remove();
        $("#pg_2_REDOJ").attr('disabled', true);
        $("#pg2_CandComments").attr('disabled', true);
        $("#pg1_inititate").remove();
 
        window.onload = function () {
            if (DojConfirmRC != 2 && DojConfirmRC != 1) {
                MsgboxAlert(sessionId, 4, 0, null, '<p style="align=left;color:#1F497D;line-height:20px;">A request for changing expected date of joining is already under process. If you need to make any further changes then, please get in touch with your Recruiter/ RC.</p>');
                $('#btnSubmitTask').hide();
            }
            else if (DojConfirmRC == 2 || DojConfirmRC == 1) {
                $('#btnSubmitTask').show();
            }
        }
    }
});

function leadingZero(value) {
    if (value < 10) {
        return "0" + value.toString();
    }
    return value.toString();
}

function enabledisable() {
    ChangeDojFlag = 1;
    $("#pg_1_EDOJ").hide();
    $("#pg_2_REDOJ").show();
    $("#pg_2_candComments").show();
    //$("#Pg_1_text_REDOJ").addClass('jQryExpdate');
    $('#Pg_1_text_REDOJ').val(TaskPrefillValues.PrefillValues.Set1.DOJ);
}
$('#popup_ok').live("click", function () {
    closeIt();
});

function SaveTaskData(saveMode) {
    var DateofJoin = $('#Pg_1_text_EDOJ').val();
    // saveMode { 0:Save, 1:Submit } 
    if (saveMode == 1) {
        // if (validate.ValidateSubmit() == true) {
        //  if (OBPager.ValidateTaskData(saveMode) == true) {
        try {
            if (ChangeDojFlag == 1 && $("#Pg_1_text_REDOJ").val() != "" && ($('#Pg_1_text_REDOJ').val() != $("#Pg_1_text_EDOJ").val())) {
                OBPager.SetTaskContentMemberValue('EDOJ.DOJChangeDojFlag', null, ChangeDojFlag, true);
            }
            else {
                OBPager.SetTaskContentMemberValue('EDOJ.DOJChangeDojFlag', null, 0, true);
            }
            OBPager.SetTaskContentMemberValue('EDOJ.DOJ', null, DateofJoin, true);
            OBPager.SetTaskContentMemberValue('EDOJ.CompDoj', null, compDoj, false);
            if (OBPager.SaveTaskData(saveMode) == true) {
                $('#popup_overlay').hide();
                $('#popup_container').hide();
                if (ChangeDojFlag == 1 && $("#Pg_1_text_REDOJ").val() != "" && ($('#Pg_1_text_REDOJ').val() != $("#Pg_1_text_EDOJ").val())) {
                    MsgboxAlert(sessionId, 4, 0, null, '<p style="align=left;color:#1F497D;line-height:20px;">Your request for changing the expected date of joining has been successfully submitted to the recruiter/RC for approval.<br/>You will be notified when it gets approved.</p>');
                    $('#btnSubmitTask').hide();
                    $('.ui-datepicker-trigger').remove();
                    $("#pg_2_REDOJ").attr('disabled', true);
                    $("#pg2_CandComments").attr('disabled', true);
                }
                else {
                    MsgboxAlert(sessionId, 4, 0, null, 'Expected date of joining has been updated successfully.');
                }
                return true;
            }
            else {
                return false;
            }
        }
        catch (e) {
            alert(e.Message);
        }
        // }
        //            else {

        //                MsgboxInfo(OBPager.ValidationMessage);
        //            }
        // }
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
    var DOJ
//    if (compDoj == 3) {
//        var dateobj = new Date()
//        var month = (dateobj.getUTCMonth()) + 1;
//        var day = dateobj.getUTCDate();
//        var year = dateobj.getFullYear();
//        var dateCurrent = leadingZero(month) + "/" + leadingZero(day) + "/" + year;
//        DOJ = dateCurrent;
//    }
//    else {
        DOJ = TaskPrefillValues.PrefillValues.Set1.DOJ
//    }
    $(".jQryExpdate").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar',
        yearRange: "-0:+28",
        minDate: DOJ,
        beforeShowDay: $.datepicker.noWeekends,
        showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    });

});


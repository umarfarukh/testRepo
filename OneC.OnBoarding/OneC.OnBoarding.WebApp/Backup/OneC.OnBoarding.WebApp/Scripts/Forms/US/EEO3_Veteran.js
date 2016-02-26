
function EnableDisabledVeteran() {
    if ($('#Pg_1_chkbox_DisabledVeteran').is(':checked') == true) {
        OBPager.SetTaskContentMemberValue('EEO3.DisabledVeteran', null, "true", false);
        $('#section2').hide();
        OBPager.SetTaskContentMemberValue('EEO3.Yes', null, "", false);
        OBPager.SetTaskContentMemberValue('EEO3.No', null, "", false);
        OBPager.SetTaskContentMemberValue('EEO3.Others', null, "", true);
    }
    else {
        OBPager.SetTaskContentMemberValue('EEO3.DisabledVeteran', null, "", false);
    }
    OBPager.SetTaskContentMemberValue('EEO3.NoneOfAbove', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO3.VeteranNoAns', null, "", true);
}

function EnableRecentVeteran() {
    if ($('#Pg_1_chkbox_RecentVeteran').is(':checked') == true) {
        OBPager.SetTaskContentMemberValue('EEO3.RecentVeteran', null, "true", false);
        $('#section2').hide();
        $('#section3').show();
        OBPager.SetTaskContentMemberValue('EEO3.Yes', null, "", false);
        OBPager.SetTaskContentMemberValue('EEO3.No', null, "", false);
        OBPager.SetTaskContentMemberValue('EEO3.Others', null, "", true);
    }
    else {
        OBPager.SetTaskContentMemberValue('EEO3.RecentVeteran', null, "", false);
        OBPager.SetTaskContentMemberValue('EEO3.RD', null, "", true);
        $('#section3').hide();
    }
    OBPager.SetTaskContentMemberValue('EEO3.NoneOfAbove', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO3.VeteranNoAns', null, "", true);
}

function EnableArmedVeteran() {
    if ($('#Pg_1_chkbox_ArmedVeteran').is(':checked') == true) {
        OBPager.SetTaskContentMemberValue('EEO3.ArmedVeteran', null, "true", false);
        $('#section2').hide();
        OBPager.SetTaskContentMemberValue('EEO3.Yes', null, "", false);
        OBPager.SetTaskContentMemberValue('EEO3.No', null, "", false);
        OBPager.SetTaskContentMemberValue('EEO3.Others', null, "", true);
    }
    else {
        OBPager.SetTaskContentMemberValue('EEO3.ArmedVeteran', null, "", false);
    }
    OBPager.SetTaskContentMemberValue('EEO3.NoneOfAbove', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO3.VeteranNoAns', null, "", true);
}

function EnableActiveVeteran() {
    if ($('#Pg_1_chkbox_ActiveVeteran').is(':checked') == true) {
        OBPager.SetTaskContentMemberValue('EEO3.ActiveVeteran', null, "true", false);
        $('#section2').hide();
        OBPager.SetTaskContentMemberValue('EEO3.Yes', null, "", false);
        OBPager.SetTaskContentMemberValue('EEO3.No', null, "", false);
        OBPager.SetTaskContentMemberValue('EEO3.Others', null, "", true);
    }
    else {
        OBPager.SetTaskContentMemberValue('EEO3.ActiveVeteran', null, "", false);
    }
    OBPager.SetTaskContentMemberValue('EEO3.NoneOfAbove', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO3.VeteranNoAns', null, "", true);
}

function EnableNoneOfAbove() {
    if ($('#Pg_1_chkbox_NoneOfAbove').is(':checked') == true) {
        OBPager.SetTaskContentMemberValue('EEO3.NoneOfAbove', null, "true", false);
        $('#section2').show();
    }
    else {
        OBPager.SetTaskContentMemberValue('EEO3.NoneOfAbove', null, "", false);
        $('#section2').hide();
    }
    OBPager.SetTaskContentMemberValue('EEO3.DisabledVeteran', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO3.RecentVeteran', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO3.ArmedVeteran', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO3.ActiveVeteran', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO3.VeteranNoAns', null, "", true);
}

function EnableVeteranNoAns() {
    if ($('#Pg_1_chkbox_VeteranNoAns').is(':checked') == true) {
        OBPager.SetTaskContentMemberValue('EEO3.VeteranNoAns', null, "true", false);
        $('#section2').show();
    }
    else {
        OBPager.SetTaskContentMemberValue('EEO3.VeteranNoAns', null, "", false);
        $('#section2').hide();
    }
    OBPager.SetTaskContentMemberValue('EEO3.DisabledVeteran', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO3.RecentVeteran', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO3.ArmedVeteran', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO3.ActiveVeteran', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO3.NoneOfAbove', null, "", true);
}

function EnableYes() {
    OBPager.SetTaskContentMemberValue('EEO3.Yes', null, "1", false);
    OBPager.SetTaskContentMemberValue('EEO3.No', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO3.Others', null, "", true);
}
function EnableNo() {
    OBPager.SetTaskContentMemberValue('EEO3.Yes', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO3.No', null, "1", false);
    OBPager.SetTaskContentMemberValue('EEO3.Others', null, "", true);
}
function EnableOthers() {
    OBPager.SetTaskContentMemberValue('EEO3.Yes', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO3.No', null, "", false);
    OBPager.SetTaskContentMemberValue('EEO3.Others', null, "1", true);
}

$(function () {
    $(".jQrydatepicker").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar',
        yearRange: "-62:+15",
        //        maxDate: "0",
        showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    });
});

$().ready(function () {
    OBPager.ShowPage(1);

    $('#section2').hide();
    $('#section3').hide();

    var taskObj = JSON.parse(OBPager.strFormDetails).EEO3;

    if (taskObj.NoneOfAbove == '1' || taskObj.NoneOfAbove == 'true' || taskObj.VeteranNoAns == '1' || taskObj.VeteranNoAns == 'true') {
        $('#section2').show();
    }
    else {
        $('#section2').hide();
    }

    if (taskObj.RecentVeteran == '1' || taskObj.RecentVeteran == 'true') {
        $('#section3').show();
    }
    else {
        $('#section3').hide();
    }

    if (OBPager.taskStatusFlag == -1) {

    }
});

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

function ResetTaskData() {

    OBPager.ResetTaskContent();
    if (OBPager.taskStatusFlag == -1) {

        if ($('#Pg_1_chkbox_NoneOfAbove').is(':checked') == true) {
            $('#section2').show();
        }
        else {
            $('#section2').hide();
        }

        if ($('#Pg_1_chkbox_RecentVeteran').is(':checked') == true) {
            $('#section3').show();
        }
        else {
            $('#section3').hide();
        }

        jQXB.doBind(OBPager.taskContentDSName);
    }
}

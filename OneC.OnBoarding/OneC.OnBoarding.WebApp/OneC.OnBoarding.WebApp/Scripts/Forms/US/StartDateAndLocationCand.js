var wrkaddrsflag = 0;    // for address modify
var locflag = 0; // after submit to display modified address
var mdateflag = 0;  //  for date modify clicked
$(document).ready(function (e) {
    $('#datebutton').css({ ' margin-top': '-45px' });
    $('#startDateConfirmPopup').show();
    $('#modfied_date_wrapper').hide();
    $('#SMnote').hide();
    $('#NormalNote').hide();
    $('#Txt_ExpStatDt').removeClass('jQrydatepickerForNA');
    $('.ui-datepicker-trigger').hide();

    //for SM below
    if (TaskPrefillValues.PrefillValues.Set1.SMflag == 0) {
        $('#NormalNote').show();
        $('#SMnote').hide();
    }
    else if (TaskPrefillValues.PrefillValues.Set1.SMflag == 1) {    //for SM above
        $('#NormalNote').hide();
        $('#SMnote').show();
    }

    if (OBPager.taskStatusFlag == -1) {
        OBPager.SetTaskContentMemberValue('NAPayRoll.DOJ', null, TaskPrefillValues.PrefillValues.Set1.DOJ, false);
        OBPager.SetTaskContentMemberValue('NAPayRoll.IsLocationConfirmed', null, -1, false);
    }
    jQXB.doBind(OBPager.taskContentDSName);
    jQXB.initialize();
    jQXB.compatibilitymode = false;

    if (OBPager.taskStatusFlag == 1) {
        locflag = TaskPrefillValues.PrefillValues.Set1.DOJLocationFlag; //to show corresponding Address
        $('#addressContent').show();
        if (TaskPrefillValues.PrefillValues.Set1.ESHMStatus != 4) { // except for rework
            $('#addressSubmit').hide();
            $('.button_wrapper').hide();
            $('.clearfix').hide();
            $('#datebutton').hide();
            $('#datebutton').css({ 'display': 'none' });
            $('#addressModify').hide();
            $('#dateConfirm').hide();
            $('#dateModify').hide();
            window.onload = function () {
                MsgboxAlert(sessionId, 4, 219, 'NA_PAYROLL_PENDINGAPPROVAL', 'You have already initiated your employment start confirmation process and it is currently pending for approval with your Hiring Manager.');
            }
        }
    }

    var dateConfirm = TaskPrefillValues.PrefillValues.Set1.IsDOJConfirmed; //to display address after date confirmed
    if (dateConfirm == 1) {
        $('#addressContent').show();
        if (TaskPrefillValues.PrefillValues.Set1.EDOJ == null) {
            $('#modfied_date_wrapper').hide();
            $('#datebutton').css({ 'margin-top': '-72px' });
            $('.start_date_wrapper').show();
            $('.ui-datepicker-trigger').hide();
        }
        else {
            forDateModify();
        }
        WorkAddressDisplay();
    }
    var qs = (function (a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'));

    candidateId = parseInt(qs["cand"]);
    sessionId = parseInt(qs["ss"]);
    countryId = parseInt(qs["cntry"]);
    taskid = parseInt(qs["task"]);

    // on date confirmation
    $('#dateConfirm').bind('click', function () {
        if (mdateflag == 1) {
            if ($('#txt_ModStatDt')[0].value == TaskPrefillValues.PrefillValues.Set1.DOJ || $('#txt_ModStatDt')[0].value == "") {
                $('#modfied_date_wrapper').hide();
                $('#datebutton').css({ 'margin-top': '-72px' });
                $('.start_date_wrapper').show();
                $('.ui-datepicker-trigger').hide();
            }
        }
        dateConfirm = TaskPrefillValues.PrefillValues.Set1.IsDOJConfirmed;
        WorkAddressDisplay();
        $('.na_popup').css({ 'margin-top': '0px' });
        $('.na_popup').animate({ top: '5%' }, 700, function () { });
        OBPager.SetTaskContentMemberValue('NAPayRoll.IsDOJConfirmed', null, 1, false);
        jQXB.doBind(OBPager.taskContentDSName);
        SaveTaskData(0);
        $('#popup_overlay').hide();
        $('#popup_container').hide();
        PresentAddressDisplay();

    });

    $('#addressContent li').bind('click', function () {
        $('#addressContent li').removeClass('active');
        $(this).addClass('active');

        $('#addressContent .tab_content').hide();
        $('#addressContent  ' + $(this).find('a').attr("data-attr")).show();
        return false;
    });

    $('#addressContent .modify_address').bind('click', function () {
        wrkaddrsflag = 1;
        OBPager.SetTaskContentMemberValue('NAPayRoll.IsLocationConfirmed', null, 1, false);
        jQXB.doBind(OBPager.taskContentDSName);
        SaveTaskData(0);
        $('#popup_overlay').hide();
        $('#popup_container').hide();
    });

    $('#addressSubmit').bind('click', function () {
        var popupId = 'warningMessagePopup';
        var popupIdStatus = 0;
        var popupIdHomeStatus = 0; // for location type validation

        if (validate.ValidateSubmit() == true) {
            if (mdateflag == 1) {
                if ($('#txt_ModStatDt')[0].value == TaskPrefillValues.PrefillValues.Set1.DOJ || $('#txt_ModStatDt')[0].value == "") {
                    $('#modfied_date_wrapper').hide();
                    $('#datebutton').css({ 'margin-top': '-72px' });
                    $('.start_date_wrapper').show();
                    $('.ui-datepicker-trigger').hide();
                }
            }
            OBPager.SetTaskContentMemberValue('NAPayRoll.EState', null, $('#req_State')[0].value, false);
            OBPager.SetTaskContentMemberValue('NAPayRoll.LocationType', null, $('#WorkLocationType')[0].value, false);
            OBPager.SetTaskContentMemberValue('NAPayRoll.ECountry', null, $('#req_Country')[0].value, false);
            OBPager.SetTaskContentMemberValue('NAPayRoll.EAddress1', null, $('#req_Address1')[0].value, false);
            OBPager.SetTaskContentMemberValue('NAPayRoll.EAddress2', null, $('#req_Address2')[0].value, false);
            OBPager.SetTaskContentMemberValue('NAPayRoll.ECity', null, $('#req_City')[0].value, false);
            OBPager.SetTaskContentMemberValue('NAPayRoll.EZip', null, $('#req_Zip')[0].value, false);
            OBPager.SetTaskContentMemberValue('NAPayRoll.ECounty', null, $('#req_County')[0].value, false);
            jQXB.doBind(OBPager.taskContentDSName);
            saveMode = 0;
            if (OBPager.ValidateTaskData(saveMode) == true) {
                var popupId = 'warningMessagePopup1';
                if ($('#addressContent li').hasClass('clicked')) {
                    if (validateworktype() == true) {
                        popupId = 'confrimationMessagePopup';
                    }
                    else {
                        var popupId = 'warningMessagePopup2';
                    }
                }
            }
            else {

                MsgboxInfo(OBPager.ValidationMessage);
                $('#popup_container').css({ 'left': '0px' });
                popupId = "";
            }
        }


        $("#" + popupId).dialog({
            modal: true,
            autoOpen: true,
            dialogClass: "na_popup warning_popup",
            width: '450px',
            draggable: false,
            show: { effect: 'fade', duration: 400 },
            buttons: [{ text: "Ok", 'class': "custom_button confirm_button", click: function () {
                if (popupId == 'confrimationMessagePopup') {
                    SaveTaskData(1);
                    $('#popup_overlay').hide();
                    $('#popup_container').hide();
                    popupIdStatus = 1;
                }
                else if (popupId == 'warningMessagePopup2') { popupIdHomeStatus = 1; }; $(this).dialog("close");
            }
            }],
            open: function () {
                $('.warning_popup').prev('.ui-widget-overlay').css({ 'opacity': '0.45', 'z-index': '101' });
                if (popupId == 'warningMessagePopup2') { $('.ui-dialog-titlebar-close').hide(); }
            },
            close: function () {
                $('.warning_popup').prev('.ui-widget-overlay').css({ 'opacity': '0.45', 'z-index': '100' });
                if (popupId == 'confrimationMessagePopup') { submitclose(popupIdStatus); }
                else if (popupId == 'warningMessagePopup1') { presentAddressView(); }
                else if (popupId == 'warningMessagePopup') { WorkAddressView(); }
                else if (popupId == 'warningMessagePopup2') {
                    submitcall(popupIdHomeStatus);
                }
            }
        });
    });

    //present address confirm
    $('#presentResidanceAddress').bind('click', function () {
        $(this).addClass('clicked');
    });

    $('#addressContent li').bind('click', function () { //toggles active classes(Present and Work Address
        $('#addressContent li').removeClass('active');
        $(this).addClass('active');
        $('#addressContent .tab_content').hide();
        $('#addressContent  ' + $(this).find('a').attr("data-attr")).show();
        PresentAddressDisplay();
        $(this).addClass('clicked');
        return false;
    });

    $('.ui-icon-closethick').hide();
});
function submitcall(popupIdHomeStatus) {
    if (popupIdHomeStatus == 1) {
        popupId = 'confrimationMessagePopup';
        var popupIdStatus = 0;
        $("#" + popupId).dialog({
            modal: true,
            autoOpen: true,
            dialogClass: "na_popup warning_popup",
            width: '450px',
            draggable: false,
            show: { effect: 'fade', duration: 400 },
            buttons: [{ text: "Ok", 'class': "custom_button confirm_button", click: function () {
                if (popupId == 'confrimationMessagePopup') {
                    SaveTaskData(1);
                    $('#popup_overlay').hide();
                    $('#popup_container').hide();
                    popupIdStatus = 1;
                }; $(this).dialog("close");
            }
            }],
            open: function () {
                $('.warning_popup').prev('.ui-widget-overlay').css({ 'opacity': '0.45', 'z-index': '101' });
            },
            close: function () {
                $('.warning_popup').prev('.ui-widget-overlay').css({ 'opacity': '0.45', 'z-index': '100' });
                if (popupId == 'confrimationMessagePopup') { submitclose(popupIdStatus); }
                else if (popupId == 'warningMessagePopup1') { presentAddressView(); }
                else if (popupId == 'warningMessagePopup') { WorkAddressView(); }
                else if (popupId == 'warningMessagePopup2') {
                    submitcall();
                }
            }
        });
    }
    else {
        locflag = TaskPrefillValues.PrefillValues.Set1.DOJLocationFlag;
        WorkAddressView();
    }
}
function submitclose(popupIdStatus) {
    if (popupIdStatus == 1) {
        closeIt();
    }
    else {
        presentAddressView();
    }
}

function forDateModify() {
    mdateflag = 1;  //flag to confirm modify date is clicked
    $('.start_date_wrapper').hide();
    $('.ui-datepicker-trigger').show();
    $(function () { // datepicker to change date
        $(".jQrydatepickerForNA").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar',
            maxDate: "0",
            beforeShowDay: $.datepicker.noWeekends,
            showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, changeDate: true, buttonAfter: true
        });
    });
    OBPager.SetTaskContentMemberValue('NAPayRoll.EDOJ', null, TaskPrefillValues.PrefillValues.Set1.EDOJ, false);
    jQXB.doBind(OBPager.taskContentDSName);
    if (TaskPrefillValues.PrefillValues.Set1.EDOJ == null) {
        var date = TaskPrefillValues.PrefillValues.Set1.DOJ;
        $('#txt_ModStatDt')[0].value = date;
    }
    else {
        $('#txt_ModStatDt').val(TaskPrefillValues.PrefillValues.Set1.EDOJ);
    }
    $('#datebutton').css({ 'margin-top': '-90px' });
    $('#modfied_date_wrapper').show();
}

function presentAddressView() {
    $('#addressContent li').removeClass('active');
    $('#prsntAddli').addClass('active');
    $('#addressContent .tab_content').hide();
    $('#prsntAddli').addClass('clicked');
    $('#addressContent  ' + $('#prsntAddli').find('a').attr("data-attr")).show();
    PresentAddressDisplay();
}
function WorkAddressView() {
    $('#addressContent li').removeClass('active');
    $('#wrkAddli').addClass('active');
    $('#addressContent .tab_content').hide();
    $('#addressContent  ' + $('#wrkAddli').find('a').attr("data-attr")).show();
    WorkAddressDisplay();
}
function WorkAddressDisplay() {
    var locationtype = TaskPrefillValues.PrefillValues.Set1.LocationType;

    if (locflag == 3 || locflag == 4) {
        $('#req_Country')[0].value = TaskPrefillValues.PrefillValues.Set1.ECountry;
        $('#req_County')[0].value = TaskPrefillValues.PrefillValues.Set1.ECounty;
        $('#req_Address1')[0].value = TaskPrefillValues.PrefillValues.Set1.EAddress1;
        (TaskPrefillValues.PrefillValues.Set1.EAddress2 !== null) ? $('#req_Address2')[0].value = TaskPrefillValues.PrefillValues.Set1.EAddress2 : $('#req_Address2')[0].value = '';
        $('#req_State')[0].value = TaskPrefillValues.PrefillValues.Set1.EState;
        $('#req_City')[0].value = TaskPrefillValues.PrefillValues.Set1.ECity;
        $('#req_Zip')[0].value = TaskPrefillValues.PrefillValues.Set1.EZip;
    }
    else {
        (TaskPrefillValues.PrefillValues.Set1.Country !== null) ? $('#req_Country')[0].value = TaskPrefillValues.PrefillValues.Set1.Country : $('#req_Country')[0].value = '';
        (TaskPrefillValues.PrefillValues.Set1.Address1 !== null) ? $('#req_Address1')[0].value = TaskPrefillValues.PrefillValues.Set1.Address1 : $('#req_Address1')[0].value = '';
        (TaskPrefillValues.PrefillValues.Set1.Address2 !== null) ? $('#req_Address2')[0].value = TaskPrefillValues.PrefillValues.Set1.Address2 : $('#req_Address2')[0].value = '';
        (TaskPrefillValues.PrefillValues.Set1.County !== null) ? $('#req_County')[0].value = TaskPrefillValues.PrefillValues.Set1.County : $('#req_County')[0].value = '';
        (TaskPrefillValues.PrefillValues.Set1.City !== null) ? $('#req_City')[0].value = TaskPrefillValues.PrefillValues.Set1.City : $('#req_City')[0].value = '';
        (TaskPrefillValues.PrefillValues.Set1.Zip !== null) ? $('#req_Zip')[0].value = TaskPrefillValues.PrefillValues.Set1.Zip : $('#req_Zip')[0].value = '';
        (TaskPrefillValues.PrefillValues.Set1.StateName !== null) ? $('#req_State')[0].value = TaskPrefillValues.PrefillValues.Set1.StateName : $('#req_State')[0].value = '';

    }
    if (locationtype == '' || locationtype == null) {
        OBPager.SetTaskContentMemberValue('NAPayRoll.LocationType', null, '', false);
    }
    else {
        OBPager.SetTaskContentMemberValue('NAPayRoll.LocationType', null, TaskPrefillValues.PrefillValues.Set1.LocationType, false);
        $('#WorkLocationType')[0].value = TaskPrefillValues.PrefillValues.Set1.LocationType;
    }
    jQXB.doBind(OBPager.taskContentDSName);

    $('.clearfix').show();
}

function PresentAddressDisplay() {
    var prsntCountry = TaskPrefillValues.PrefillValues.Set1.PrstCountry;
    var prsntState = TaskPrefillValues.PrefillValues.Set1.PrstStateName;
    var prsntCity = TaskPrefillValues.PrefillValues.Set1.PrstCity;
    var prsntAddress1 = TaskPrefillValues.PrefillValues.Set1.PrstAddress1;
    var prsntAddress2 = TaskPrefillValues.PrefillValues.Set1.PrstAddress2;
    var prsntCounty = TaskPrefillValues.PrefillValues.Set1.PrstCounty;
    var prsntZip = TaskPrefillValues.PrefillValues.Set1.PrstZip;
    (prsntCountry !== null) ? $('#PrstCountry')[0].value = prsntCountry : $('#PrstCountry')[0].value = '';
    (prsntAddress1 !== null) ? $('#PrstAddress1')[0].value = prsntAddress1 : $('#PrstAddress1')[0].value = '';
    (prsntAddress2 !== null) ? $('#PrstAddress2')[0].value = prsntAddress2 : $('#PrstAddress2')[0].value = '';
    (prsntCity !== null) ? $('#PrstCity')[0].value = prsntCity : $('#PrstCity')[0].value = '';
    (prsntZip !== null) ? $('#PrstZip')[0].value = prsntZip : $('#PrstZip')[0].value = '';
    (prsntState !== null) ? $('#PrstState')[0].value = prsntState : $('#PrstState')[0].value = '';
    (prsntCounty !== null) ? $('#PrstCountry1')[0].value = prsntCounty : $('#PrstCountry1')[0].value = '';
}
function validateworktype() {
    if ($('#WorkLocationType')[0].value == 'Home') {
        var prsntAddress2;
        (TaskPrefillValues.PrefillValues.Set1.PrstAddress2 !== null) ? prsntAddress2 = TaskPrefillValues.PrefillValues.Set1.PrstAddress2 : prsntAddress2 = '';
        if ($('#req_Country')[0].value == "UNITED STATES OF AMERICA")
            if ($('#req_County')[0].value == TaskPrefillValues.PrefillValues.Set1.PrstCounty)
                if ($('#req_Address1')[0].value == TaskPrefillValues.PrefillValues.Set1.PrstAddress1)
                    if ($('#req_Address2')[0].value == prsntAddress2)
                        if ($('#req_State')[0].value == TaskPrefillValues.PrefillValues.Set1.PrstStateName)
                            if ($('#req_City')[0].value == TaskPrefillValues.PrefillValues.Set1.PrstCity)
                                if ($('#req_Zip')[0].value == TaskPrefillValues.PrefillValues.Set1.PrstZip) {
                                    return true;
                                }
    }
    else {
        return true;
    }
}
// For Saving and Submitting the taskdata
function SaveTaskData(saveMode) {
    if (saveMode == 1) {
        if (validate.ValidateSubmit() == true) {
            try {
                var dateConfirm = TaskPrefillValues.PrefillValues.Set1.IsDOJConfirmed;
                var locConfirm = TaskPrefillValues.PrefillValues.Set1.IsLocationConfirmed;
                JSON.stringify(jQXB.getDataSource(OBPager.taskContentDSName));
                if (dateConfirm != 1 || locConfirm != 1) {
                    OBPager.SetTaskContentMemberValue('NAPayRoll.DOJ', null, TaskPrefillValues.PrefillValues.Set1.DOJ, false);
                    OBPager.SetTaskContentMemberValue('NAPayRoll.IsLocationConfirmed', null, 1, true);
                    OBPager.SetTaskContentMemberValue('NAPayRoll.IsDOJConfirmed', null, 1, true);
                }
                if (wrkaddrsflag == 1) {
                    OBPager.SetTaskContentMemberValue('NAPayRoll.Country', null, TaskPrefillValues.PrefillValues.Set1.Country, false);
                    OBPager.SetTaskContentMemberValue('NAPayRoll.Address1', null, TaskPrefillValues.PrefillValues.Set1.Address1, false);
                    OBPager.SetTaskContentMemberValue('NAPayRoll.Address2', null, TaskPrefillValues.PrefillValues.Set1.Address2, false);
                    OBPager.SetTaskContentMemberValue('NAPayRoll.State', null, TaskPrefillValues.PrefillValues.Set1.StateName, false);
                    OBPager.SetTaskContentMemberValue('NAPayRoll.County', null, TaskPrefillValues.PrefillValues.Set1.County, false);
                    OBPager.SetTaskContentMemberValue('NAPayRoll.City', null, TaskPrefillValues.PrefillValues.Set1.City, false);
                    OBPager.SetTaskContentMemberValue('NAPayRoll.Zip', null, TaskPrefillValues.PrefillValues.Set1.Zip, false);
                    OBPager.SetTaskContentMemberValue('NAPayRoll.ECountry', null, $('#req_Country')[0].value, false);
                    OBPager.SetTaskContentMemberValue('NAPayRoll.EAddress1', null, $('#req_Address1')[0].value, false);
                    OBPager.SetTaskContentMemberValue('NAPayRoll.EAddress2', null, $('#req_Address2')[0].value, false);
                    OBPager.SetTaskContentMemberValue('NAPayRoll.EState', null, $('#req_State')[0].value, false);
                    OBPager.SetTaskContentMemberValue('NAPayRoll.ECity', null, $('#req_City')[0].value, false);
                    OBPager.SetTaskContentMemberValue('NAPayRoll.EZip', null, $('#req_Zip')[0].value, false);
                    OBPager.SetTaskContentMemberValue('NAPayRoll.ECounty', null, $('#req_County')[0].value, false);
                }
                else {
                    OBPager.SetTaskContentMemberValue('NAPayRoll.Country', null, $('#req_Country')[0].value, false);
                    OBPager.SetTaskContentMemberValue('NAPayRoll.County', null, $('#req_County')[0].value, false);
                    OBPager.SetTaskContentMemberValue('NAPayRoll.Address1', null, $('#req_Address1')[0].value, false);
                    OBPager.SetTaskContentMemberValue('NAPayRoll.Address2', null, $('#req_Address2')[0].value, false);
                    OBPager.SetTaskContentMemberValue('NAPayRoll.State', null, $('#req_State')[0].value, false);
                    OBPager.SetTaskContentMemberValue('NAPayRoll.City', null, $('#req_City')[0].value, false);
                    OBPager.SetTaskContentMemberValue('NAPayRoll.Zip', null, $('#req_Zip')[0].value, false);
                    OBPager.SetTaskContentMemberValue('NAPayRoll.ECountry', null, "", false);
                    OBPager.SetTaskContentMemberValue('NAPayRoll.EAddress1', null, "", false);
                    OBPager.SetTaskContentMemberValue('NAPayRoll.EAddress2', null, "", false);
                    OBPager.SetTaskContentMemberValue('NAPayRoll.EState', null, "", false);
                    OBPager.SetTaskContentMemberValue('NAPayRoll.ECity', null, "", false);
                    OBPager.SetTaskContentMemberValue('NAPayRoll.EZip', null, "", false);
                    OBPager.SetTaskContentMemberValue('NAPayRoll.ECounty', null, "", false);
                }
                OBPager.SetTaskContentMemberValue('NAPayRoll.LocationType', null, $('#WorkLocationType')[0].value, false);
                jQXB.doBind(OBPager.taskContentDSName);
                if (OBPager.SaveTaskData(saveMode) == true) {
                    return true;
                }
            }
            catch (e) {
            }
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
        }
    }
}
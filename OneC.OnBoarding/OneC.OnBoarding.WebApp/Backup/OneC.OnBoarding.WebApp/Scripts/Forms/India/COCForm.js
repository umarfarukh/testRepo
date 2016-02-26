var BaseData = {};
var resetEmployerDS = {};

function NonSSADet() {
    this.NCountryName = '';
    this.TravelReason = '';
    this.TravelType = '';
    this.FromDate = '';
    this.ToDate = '';
    this.ClientName = '';

}

function PassportInfo() {
    this.PassportType = '';
    this.PassportNumber = '';
    this.ValidFrom = '';
    this.ValidTill = '';
    this.IssueLocation = '';
}


$().ready(function () {
    jQXB.initialize();
    jQXB.compatibilitymode = false;
    var obj = new NonSSADet();
    OBPager.GetMaster(116, "YesOrNo");
    OBPager.GetMaster(257, "NonSSATravelType");
    OBPager.GetGeographyMaster(1, 0, "CountryList");

    OBPager.GetEmployersDetails();

    jQXB.addOnTemplateItemBoundhnd(function (dataSourceName, templateName, occurrency, dataItem, jQrytemplateItem) {
        switch (templateName) {
            case "CountryTemplate":
                var delBtn = jQrytemplateItem.find('.deleteCountryRow');
                var NCountryName = jQrytemplateItem.find('.ClsCountryName');
                var TravelReason = jQrytemplateItem.find('.ClsTravelReason');
                var TravelType = jQrytemplateItem.find('.ClsTravelType');
                var FromDate = jQrytemplateItem.find('.ClsFromDate');
                var Todate = jQrytemplateItem.find('.ClsToDate');
                var jQryDate = jQrytemplateItem.find('.dobForm');
                var jQryToDate = jQrytemplateItem.find('.jQryTodate'); 
                var RowCount = occurrency - 1;


                $('#Countryrow_0').hide();
                $('#Countryrow_1').hide();

                delBtn.unbind();
                delBtn.bind('click', function () {
                    delCountryRow(occurrency);
                    alert('Non SSA Country Row ' + RowCount + ' has been deleted');
                });

                jQXB.getValueFromAttrib = function (chkAddress) {
                    var result = "";
                    var attrib = chkAddress.attr(jQXB.JQXB_BINDEDATTRIBUTE_ATTR);
                    if (attrib != undefined) {
                        if (attrib === "checked") {
                            if (chkAddress.is(':checked')) {
                                result = true;
                            } else {
                                result = "";
                            }
                        } else {
                            result = chkAddress.attr(attrib);
                        }
                    } else {
                        result = chkAddress.val();
                    }
                    return result;
                }

                //To Initialize Validation 
                //                $('.textMandatory').change(validate.textMandatory);
                //                $('.textMandatoryDynamic').change(validate.textMandatoryDynamic);
                //                $('.Alphanumeric').change(validate.textAlphanumeric);
                //                $('.dropdown').change(validate.dropdown);
                //                $('.dob').change(validate.birthDate);

                $(function () {
                    $(jQryDate).datepicker({ dateFormat: 'mm/dd/yy', yearRange: "-62:+0", maxDate: "0", buttonText: 'Open calendar', showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
                    });
                    IsTravelReason();
                });
                $(function () {
                    $(jQryToDate).datepicker({ dateFormat: 'mm/dd/yy', yearRange: "1973:2025", maxDate: "2025", buttonText: 'Open calendar', showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
                    });
                    IsTravelReason();
                });

                
                break;
            case "PassportTemplate":
                var delBtn2 = jQrytemplateItem.find('.deletePassportRow');
                var PassportType = jQrytemplateItem.find('ClsPassportType');
                var PassportNumber = jQrytemplateItem.find('ClsPassportNumber');
                var ValidFrom = jQrytemplateItem.find('ClsValidFrom');
                var ValidTill = jQrytemplateItem.find('ClsValidTill');
                var IssueLocation = jQrytemplateItem.find('ClsIssueLocation');
                var PRowCount = occurrency - 1;
                var jQryDate = jQrytemplateItem.find('.dobForm');
                var jQryDate1 = jQrytemplateItem.find('.jQryExpdate');


                if (TaskPrefillValues.PrefillValues.Set1.PassportAvailability == 1) {
                    $('#Passportrow_1').show();
                    $('#Passportrow_0').hide();
                }
                else {
                    $('#Passportrow_0').hide();
                    $('#Passportrow_1').hide();
                }
                delBtn2.unbind();
                delBtn2.bind('click', function () {
                    delPassportRow(occurrency);
                    alert('Passport Details Row ' + PRowCount + ' has been deleted');
                });

                //To Initialize Validation 
                //                $('.textMandatory').change(validate.textMandatory);
                //                $('.textMandatoryDynamic').change(validate.textMandatoryDynamic);
                //                $('.Alphanumeric').change(validate.textAlphanumeric);
                //                $('.dropdown').change(validate.dropdown);
                //$('.dob').change(validate.birthDate);

                $(function () {
                    $(jQryDate).datepicker({ dateFormat: 'mm/dd/yy', yearRange: "-100:+0", maxDate: "0", buttonText: 'Open calendar', showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
                    });
                    $('#ValidFrom1')[0].parentElement.lastElementChild.disabled = true;
                    //ToDateObj[0].parentElement.lastElementChild.disabled = false;
                });

                $(function () {
                    $(jQryDate1).datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar',
                    yearRange: "-100:+50",
                    showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
                });
                $('#ValidTill1')[0].parentElement.lastElementChild.disabled = true;
            });
        }
    });


    jQXB.setDataSource('FormDetails', BaseData).doBind('FormDetails');
    jQXB.setDataSource('NonSSACountryData', BaseData.COCData.NonSSACountryData, true).doBind('NonSSACountryData');
    jQXB.setDataSource('PassportInfo', BaseData.COCData.PassportInfo, true).doBind('PassportInfo');


    if (OBPager.taskStatusFlag == -1 ) {
        // Set member value manually
        OBPager.SetTaskContentMemberValue('COCData.CandidateId', null, TaskPrefillValues.PrefillValues.Set1.CandidateId, false);
        OBPager.SetTaskContentMemberValue('COCData.CandidateName', null, TaskPrefillValues.PrefillValues.Set1.NAME, false);
        OBPager.SetTaskContentMemberValue('COCData.DOJ', null, TaskPrefillValues.PrefillValues.Set1.DOJ, false);
        OBPager.SetTaskContentMemberValue('COCData.JoiningLocation', null, TaskPrefillValues.PrefillValues.Set1.JoiningLocation, false);


        if (TaskPrefillValues.PrefillValues.Set1.PassportAvailability == 1) {
            var PassportObj = $('#Passportrow' + TaskPrefillValues.PrefillValues.Set1.PassportAvailability);
            var PassportNumber = TaskPrefillValues.PrefillValues.Set1.PassportNumber;
            var ValidFrom = TaskPrefillValues.PrefillValues.Set1.ValidFrom;
            var ValidTill = TaskPrefillValues.PrefillValues.Set1.ValidTill;
            var IssueLocation = TaskPrefillValues.PrefillValues.Set1.IssueLocation;
            jQXB.setmemberVarvalue('PassportInfo', TaskPrefillValues.PrefillValues.Set1.PassportAvailability, 'PassportType', 'Current', PassportObj);
            jQXB.setmemberVarvalue('PassportInfo', TaskPrefillValues.PrefillValues.Set1.PassportAvailability, 'PassportNumber', PassportNumber, PassportObj);
            jQXB.setmemberVarvalue('PassportInfo', TaskPrefillValues.PrefillValues.Set1.PassportAvailability, 'ValidFrom', ValidFrom, PassportObj);
            jQXB.setmemberVarvalue('PassportInfo', TaskPrefillValues.PrefillValues.Set1.PassportAvailability, 'ValidTill', ValidTill, PassportObj);
            jQXB.setmemberVarvalue('PassportInfo', TaskPrefillValues.PrefillValues.Set1.PassportAvailability, 'IssueLocation', IssueLocation, PassportObj);
            jQXB.doBind('PassportInfo');
        }
    }
    Istravelled();
    //LoadSSA();
    IsNameChange();
    IstravelledToSSA()
    //IsTravelReason()
    jQXB.doBind(OBPager.taskContentDSName);

});


function LoadSSA() {
    var NumberofRows = $('#SSATable tr').length;
    
    for (var i = 1; i < NumberofRows; i++) {
        var id = $('#SSATable tr')[i].id
        var target1 = 'COCObtained_' + id;
        var target2 = 'EnableRow_' + id;
        var target3 = 'TravelledBefore_' + id;

        if ($('#' + target3 + '')[0].value == '1' && $('#' + target1 + '')[0].value == '1') {
            $('#' + target1 + '').attr('disabled', false);
            $('.' + target2 + '').attr('disabled', false);
            $('.' + target2 + '')[2].parentElement.firstChild.nextSibling.nextSibling.disabled = false;
            $('.' + target2 + '')[3].parentElement.firstChild.nextSibling.nextSibling.disabled = false;
        }
        else if ($('#' + target3 + '')[0].value == '1' && ($('#' + target1 + '')[0].value == '2' || $('#' + target1 + '')[0].value == '-1')) {
            $('#' + target1 + '').attr('disabled', false);
            $('.' + target2 + '').attr('disabled', true);
            $('.' + target2 + '')[2].parentElement.firstChild.nextSibling.nextSibling.disabled = true;
            $('.' + target2 + '')[3].parentElement.firstChild.nextSibling.nextSibling.disabled = true;
        }
        else if ($('#' + target3 + '')[0].value == '2' || $('#' + target3 + '')[0].value == '-1') {
            $('#' + target1 + '').attr('disabled', true);
            $('.' + target2 + '').attr('disabled', true);
            $('.' + target2 + '')[2].parentElement.firstChild.nextSibling.nextSibling.disabled = true;
            $('.' + target2 + '')[3].parentElement.firstChild.nextSibling.nextSibling.disabled = true;

        }
    }
    $('#PassportType1,#PassportNumber1,#ValidFrom1,#ValidTill1,#IssueLocation1,#TravelReason1').attr('disabled', true);
    $('.RecordNumber')[2].disabled = true;
}
function IstravelledToSSA() {
    var SelectedValue = $('#TravelledToSSA')[0].value
    if (SelectedValue == '1') {

        $("#SSA .ui-datepicker-trigger").attr("disabled", true);
        LoadSSA();

        $('#SSA').show();
    }
    else {
        for (var i = 1; i <= 13; i++) {
            var a = $('#' + $('#TravelledBefore_' + i + '')[0].id + '').attr('jqxb-datamember');
            var b = $('#' + $('#COCObtained_' + i + '')[0].id + '').attr('jqxb-datamember');
            var c = $('#' + $('.EnableRow_' + i + '')[0].id + '').attr('jqxb-datamember');
            var d = $('#' + $('.EnableRow_' + i + '')[1].id + '').attr('jqxb-datamember');
            var e = $('#' + $('.EnableRow_' + i + '')[2].id + '').attr('jqxb-datamember');
            var f = $('#' + $('.EnableRow_' + i + '')[3].id + '').attr('jqxb-datamember');
            var g = $('#' + $('.EnableRow_' + i + '')[4].id + '').attr('jqxb-datamember');
            OBPager.SetTaskContentMemberValue(a, 1, '-1', true);
            OBPager.SetTaskContentMemberValue(b, 1, '-1', true);
            OBPager.SetTaskContentMemberValue(c, 1, '', true);
            OBPager.SetTaskContentMemberValue(d, 1, '', true);
            OBPager.SetTaskContentMemberValue(e, 1, '', true);
            OBPager.SetTaskContentMemberValue(f, 1, '', true);
            OBPager.SetTaskContentMemberValue(g, 1, '-1', true);
            $('#' + $('#COCObtained_' + i + '')[0].id + '').attr('disabled', true);
            $('#' + $('.EnableRow_' + i + '')[4].id + '').attr('disabled', true);
            $('.EnableRow_' + i + '')[2].parentElement.firstChild.nextSibling.nextSibling.disabled = true;
            $('.EnableRow_' + i + '')[3].parentElement.firstChild.nextSibling.nextSibling.disabled = true;

        }
            OBPager.SetTaskContentMemberValue('COCData.TravelToSSACountry', 1, SelectedValue, true);
            $('#SSA').hide();
            

    }
}
function Istravelled() {
    if ($('#NonSSADropDown')[0].value == '1') {
        $('#NonSSA').show();
        $('#btnaddnonSSA').show();
        
    }
    else {        
        ResetNonSSARows();
        $('#NonSSA').hide();
        $('#btnaddnonSSA').hide();
        
    }
}
function IsTravelReason() {
    for (var x = 2; x < $('.ClsTravelReason').length; x++) {        
            var id = $('.ClsTravelReason')[x].id.slice(-1);
            var TravelTypeObj = $('#TravelType' + id)
            var FromDateObj = $('#FromDate' + id)
            var ToDateObj = $('#ToDate' + id)
            var ClientNameObj = $('#ClientName' + id)

            if ($('.ClsTravelReason')[x].value == 1) {
                TravelTypeObj.attr('disabled', false);
                FromDateObj.attr('disabled', false);
                ToDateObj.attr('disabled', false);
                ClientNameObj.attr('disabled', false);
                FromDateObj[0].parentElement.lastElementChild.disabled = false;
                ToDateObj[0].parentElement.lastElementChild.disabled = false;

            }
            else {
                TravelTypeObj.attr('disabled', true);
                FromDateObj.attr('disabled', true);
                ToDateObj.attr('disabled', true);
                ClientNameObj.attr('disabled', true);
                FromDateObj[0].parentElement.lastElementChild.disabled = true;
                ToDateObj[0].parentElement.lastElementChild.disabled = true;
                jQXB.setmemberVarvalue('NonSSACountryData', id, 'TravelType', $('.ClsTravelReason')[x].value, TravelTypeObj);
                jQXB.setmemberVarvalue('NonSSACountryData', id, 'TravelType', '', TravelTypeObj);
                jQXB.setmemberVarvalue('NonSSACountryData', id, 'FromDate', '', FromDateObj);
                jQXB.setmemberVarvalue('NonSSACountryData', id, 'ToDate', '', ToDateObj);
                jQXB.setmemberVarvalue('NonSSACountryData', id, 'ClientName', '', ClientNameObj);
        }

    }
}
function IsNameChange() {
    //$('#NameChange').change(function () {
    var NameChange = $('#NameChange')[0].value;
    if ($('#NameChange')[0].value == '1') {
        $('#NameChangeDetails').attr('disabled', false);
        $('#NameChangeUL').show()
        $('#NameChangeDetails').addClass('textMandatory');
        $('#NameChangeDetails').focus();
    }
    else {
        $('#NameChangeDetails').attr('disabled', true);
        OBPager.SetTaskContentMemberValue('COCData.SpacifiedNameChange', null, '', true);
        OBPager.SetTaskContentMemberValue('COCData.NameChange', null, NameChange, true);
        $('#NameChangeUL').hide();
        //$('#NameChangeDetails').Removeclass('textMandatory');
    }
}
//$(function () {
//    $(".jQrydatepicker").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar',
////        yearRange: "-62:+0",
////        maxDate: "2020",
//        showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
//    });
//    LoadSSA();

//});
$(function () {
    $(".SSAFromDate").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar',
       yearRange: "1953:2015",
        maxDate: "0",
        showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    });
    LoadSSA();
    
});
$(function () {
    $(".SSAToDate").datepicker({ dateFormat: 'mm/dd/yy',
        yearRange: "1953:2025", 
    maxDate: "2025",
        buttonText: 'Open calendar', showOn: "both", 
     buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    });
    LoadSSA();
});

$().ready(function () {
    IsTravelReason();
    if (TaskPrefillValues.PrefillValues.Set1.PassportAvailability == 1) {
        var delbtnid = $('.PassportTable')[0].firstElementChild.firstElementChild.lastElementChild.firstElementChild.id;
        $('.PassportTable')[1].firstElementChild.firstElementChild.lastElementChild.firstElementChild.disabled = true;
    }
    else {
        //addPassportRow();
    }

    $('.TravelledBefore').change(function () {
        var id = $(this)[0].parentElement.parentElement.id;
        var target1 = 'COCObtained_' + id;
        var target2 = 'EnableRow_' + id;
        var cur = $('#' + $(this)[0].id + '').attr('jqxb-datamember');
        var a = $('#' + $('.' + target2 + '')[0].id + '').attr('jqxb-datamember');
        var b = $('#' + $('.' + target2 + '')[1].id + '').attr('jqxb-datamember');
        var c = $('#' + $('.' + target2 + '')[2].id + '').attr('jqxb-datamember');
        var d = $('#' + $('.' + target2 + '')[3].id + '').attr('jqxb-datamember');
        var e = $('#' + $('.' + target2 + '')[4].id + '').attr('jqxb-datamember');
        var f = $('#' + $('#' + target1 + '')[0].id + '').attr('jqxb-datamember');


        if ($(this)[0].value == '1') {
            $('#' + target1 + '').attr('disabled', false);
            $('.' + target2 + '')[2].parentElement.firstChild.nextSibling.nextSibling.disabled = true;
            $('.' + target2 + '')[3].parentElement.firstChild.nextSibling.nextSibling.disabled = true;

        }
        else if ($(this)[0].value == '2') {
            OBPager.SetTaskContentMemberValue(a, 1, '', true);
            OBPager.SetTaskContentMemberValue(b, 1, '', true);
            OBPager.SetTaskContentMemberValue(c, 1, '', true);
            OBPager.SetTaskContentMemberValue(d, 1, '', true);
            OBPager.SetTaskContentMemberValue(e, 1, '-1', true);
            OBPager.SetTaskContentMemberValue(f, 1, '-1', true);
            OBPager.SetTaskContentMemberValue(cur, 1, '2', true);
            $('#' + target1 + '').attr('disabled', true);
            $('.' + target2 + '').attr('disabled', true);
            $('.' + target2 + '')[2].parentElement.firstChild.nextSibling.nextSibling.disabled = true;
            $('.' + target2 + '')[3].parentElement.firstChild.nextSibling.nextSibling.disabled = true;
        }
        else {
            OBPager.SetTaskContentMemberValue(a, 1, '', true);
            OBPager.SetTaskContentMemberValue(b, 1, '', true);
            OBPager.SetTaskContentMemberValue(c, 1, '', true);
            OBPager.SetTaskContentMemberValue(d, 1, '', true);
            OBPager.SetTaskContentMemberValue(e, 1, '-1', true);
            OBPager.SetTaskContentMemberValue(f, 1, '-1', true);
            OBPager.SetTaskContentMemberValue(cur, 1, '-1', true);
            $('#' + target1 + '').attr('disabled', true);
            $('.' + target2 + '').attr('disabled', true);
            $('.' + target2 + '')[2].parentElement.firstChild.nextSibling.nextSibling.disabled = true;
            $('.' + target2 + '')[3].parentElement.firstChild.nextSibling.nextSibling.disabled = true;
        }

    })

    $('#NonSSADropDown').change(function () {
        if ($(this)[0].value == '1') {
            addRow();
        }
        else {
            ResetNonSSARows();
        }
    })

    $('.COCObtained').change(function () {
        var id = $(this)[0].parentElement.parentElement.id;
        var target = 'EnableRow_' + id;
        var cur = $('#' + $(this)[0].id + '').attr('jqxb-datamember');
        var a = $('#' + $('.' + target + '')[0].id + '').attr('jqxb-datamember');
        var b = $('#' + $('.' + target + '')[1].id + '').attr('jqxb-datamember');
        var c = $('#' + $('.' + target + '')[2].id + '').attr('jqxb-datamember');
        var d = $('#' + $('.' + target + '')[3].id + '').attr('jqxb-datamember');
        var e = $('#' + $('.' + target + '')[4].id + '').attr('jqxb-datamember');
        if ($(this)[0].value == '1')
         {
            $('.' + target + '').attr('disabled', false);
            
                $('.' + target + '')[2].parentElement.firstChild.nextSibling.nextSibling.disabled = false;


                $('.' + target + '')[3].parentElement.firstChild.nextSibling.nextSibling.disabled = false;


        }
        else if ($(this)[0].value == '2') {
            OBPager.SetTaskContentMemberValue(a, 1, '', true);
            OBPager.SetTaskContentMemberValue(b, 1, '', true);
            OBPager.SetTaskContentMemberValue(c, 1, '', true);
            OBPager.SetTaskContentMemberValue(d, 1, '', true);
            OBPager.SetTaskContentMemberValue(e, 1, '-1', true);
            OBPager.SetTaskContentMemberValue(cur, 1, '2', true);
            $('.' + target + '').attr('disabled', true);
            $('.' + target + '')[2].parentElement.firstChild.nextSibling.nextSibling.disabled = true;
            $('.' + target + '')[3].parentElement.firstChild.nextSibling.nextSibling.disabled = true;
        }
        else {
            OBPager.SetTaskContentMemberValue(a, 1, '', true);
            OBPager.SetTaskContentMemberValue(b, 1, '', true);
            OBPager.SetTaskContentMemberValue(c, 1, '', true);
            OBPager.SetTaskContentMemberValue(d, 1, '', true);
            OBPager.SetTaskContentMemberValue(e, 1, '-1', true);
            OBPager.SetTaskContentMemberValue(cur, 1, '-1', true);
            $('.' + target + '').attr('disabled', true);
            $('.' + target + '')[2].parentElement.firstChild.nextSibling.nextSibling.disabled = true;
            $('.' + target + '')[3].parentElement.firstChild.nextSibling.nextSibling.disabled = true;
        }

    })

});

function addRow() {
    var obj = new NonSSADet();
    jQXB.addObjectToDataSource('NonSSACountryData', obj);

}

function delCountryRow(index) {
    jQXB.deleteObjectFromDataSource('NonSSACountryData', index);
}

function addPassportRow() {
    var obj = new PassportInfo();
    jQXB.addObjectToDataSource('PassportInfo', obj);

}

function delPassportRow(index) {
    jQXB.deleteObjectFromDataSource('PassportInfo', index);
}

function ResetNonSSARows() {
    if (BaseData.COCData.NonSSACountryData != 'undefined' && BaseData.COCData.NonSSACountryData.length > 0) {
        var count = BaseData.COCData.NonSSACountryData.length;
        var i = count - 1; /* Stop iteration from max to 2 as 1, 0 will be default empty items which should not be removed from data source */
        while (i >= 2) {
            delCountryRow(i);
            i--;
        }

    }
}

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
            catch (e) {
            }
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
        }
    }
}

function ResetTaskData() {
    OBPager.ResetTaskContent();
    if (BaseData.COCData.PassportInfo != 'undefined' && BaseData.COCData.PassportInfo.length > 0) {
        var count = BaseData.COCData.PassportInfo.length;
        var i = count - 1; /* Stop iteration from max to 2 as 1, 0 will be default empty items which should not be removed from data source */
        while (i >= 2) {
            delPassportRow(i);
            i--;
        }
    }
    Istravelled();
    BaseData = JSON.parse(OBPager.strFormDetails);
    jQXB.setDataSource('FormDetails', BaseData).doBind('FormDetails');
    jQXB.setDataSource('NonSSACountryData', BaseData.COCData.NonSSACountryData, true).doBind('NonSSACountryData');
    jQXB.setDataSource('PassportInfo', BaseData.COCData.PassportInfo, true).doBind('PassportInfo');


        OBPager.SetTaskContentMemberValue('COCData.CandidateId', null, TaskPrefillValues.PrefillValues.Set1.CandidateId, false);
        OBPager.SetTaskContentMemberValue('COCData.CandidateName', null, TaskPrefillValues.PrefillValues.Set1.NAME, false);
        OBPager.SetTaskContentMemberValue('COCData.DOJ', null, TaskPrefillValues.PrefillValues.Set1.DOJ, false);
        OBPager.SetTaskContentMemberValue('COCData.JoiningLocation', null, TaskPrefillValues.PrefillValues.Set1.JoiningLocation, false);

        if (TaskPrefillValues.PrefillValues.Set1.PassportAvailability == 1) {
            var PassportObj = $('#Passportrow' + TaskPrefillValues.PrefillValues.Set1.PassportAvailability);
            var PassportNumber = TaskPrefillValues.PrefillValues.Set1.PassportNumber;
            var ValidFrom = TaskPrefillValues.PrefillValues.Set1.ValidFrom;
            var ValidTill = TaskPrefillValues.PrefillValues.Set1.ValidTill;
            var IssueLocation = TaskPrefillValues.PrefillValues.Set1.IssueLocation;
            jQXB.setmemberVarvalue('PassportInfo', TaskPrefillValues.PrefillValues.Set1.PassportAvailability, 'PassportType', 'Current', PassportObj);
            jQXB.setmemberVarvalue('PassportInfo', TaskPrefillValues.PrefillValues.Set1.PassportAvailability, 'PassportNumber', PassportNumber, PassportObj);
            jQXB.setmemberVarvalue('PassportInfo', TaskPrefillValues.PrefillValues.Set1.PassportAvailability, 'ValidFrom', ValidFrom, PassportObj);
            jQXB.setmemberVarvalue('PassportInfo', TaskPrefillValues.PrefillValues.Set1.PassportAvailability, 'ValidTill', ValidTill, PassportObj);
            jQXB.setmemberVarvalue('PassportInfo', TaskPrefillValues.PrefillValues.Set1.PassportAvailability, 'IssueLocation', IssueLocation, PassportObj);
            jQXB.doBind('PassportInfo');
        }
        jQXB.doBind('NonSSACountryData');
        jQXB.doBind('PassportInfo');
        jQXB.doBind(OBPager.taskContentDSName);
        Istravelled();
        LoadSSA();
        IsNameChange();
        IsTravelReason();
        IstravelledToSSA()
}
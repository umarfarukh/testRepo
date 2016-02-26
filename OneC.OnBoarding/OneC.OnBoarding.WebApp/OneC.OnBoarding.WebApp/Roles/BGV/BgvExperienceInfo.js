/* 
************************************************
OnBoarding BGV Candidate info script
************************************************
Author: 249510
Date: 2013-JAN-07
Purpose: Candidate Experience related info function for BGV
************************************************
*/


var dsEmploymentTypeList = 'EmploymentTypeList';
//var RelevantExp = 0;
var relevantExp = 0;
var cisStatus = 0;
var chkVal = '';
var bgvPId = 4; /*BGV Page Id*/
//alert(roleGroupId);
function PostDrawingAddComponent() {

    jQXB.doBind(dsEmploymentTypeList);
    jQXB.doBind(BGVComponent.componentDSName);
    SetDatePicker();
    if (cisStatus >= 3) {
        CalcTotalExp(2); //For NH
    }
    else {
        CalcTotalExp(1); //For HRSS
    }
    
}

$().ready(function () {

    jQXB.initialize();
    jQXB.compatibilitymode = false;

    BGVComponentHandler.Initialize(2);

    BGVComponentHandler.onPostAddComponent = 'PostDrawingAddComponent';
    GetRelevantExpInfo();
    $("#relevantExp").val(relevantExp);

    if (roleGroupId == 1 || roleGroupId == 6) {
        chkVal = true;
    }
    BGVComponentHandler.GetMaster(166, dsEmploymentTypeList);

    BGVComponentHandler.GetCandidateComponentData();
    // AddExpContent();
    if (BGVComponentHandler.isComponentInfoAvailable == 1) {
        BGVComponentHandler.DrawSavedXMLComponent();
        $('.empType').each(function () {
            if (parseInt($('#' + $(this).attr('id')).val()) == 2) {
                $(this).siblings('.principleCompanyBlock').show();
                $(this).siblings('.principalCompany').addClass('textMandatory');
            }
        });
        chkVal = true;
    }
    else {
        if (BGVComponent.Initialize(2, 'EMPCR', 1, null)) {
            BGVComponent.AddComponent(1);
            //chkVal = true;
            $('.empType').each(function () {
                if (parseInt($('#' + $(this).attr('id')).val()) == 2) {
                    $(this).siblings('.principleCompanyBlock').hide();
                }
            });
            $('#exp_info_content').css('display', 'none');
        }
    }

    //$('.textMandatory').unbind();
    $('.textMandatory').on("change", validate.textMandatory);
    //$('.Alphanumeric').unbind();
    $('.Alphanumeric').on("change", validate.textAlphanumeric);
    //$('.dropdown').unbind();
    $('.dropdown').on("change", validate.dropdown);

    if ((BGVComponentHandler.hrssSaveStatus > 0) && (BGVComponentHandler.componentCount == 0)) {
        $('#exp_info_content').css('display', 'none');
        $('#chkExpAvailable').removeAttr('checked');
        chkVal = false;
    }

    if ((BGVComponentHandler.hrssSaveStatus > 0) && (BGVComponentHandler.componentCount > 0)) {
        $('#chkExpAvailable').attr('checked', 'checked');
        chkVal = true;
    }

    $('input[name="InstitutionName"]').each(function (i) {
        if ($(this).val().toLowerCase() == 'others') {
            $(this).siblings('div.others').show();
            //$(this).parent().css({ 'height': '70px' });
        }
    });
});

function AddExpContent() {
    //if (BGVComponentHandler.hrssSaveStatus == 0) { chkVal = true; }
    chkVal = $('#chkExpAvailable').is(':checked');
    if (chkVal == false) {
        $('#exp_info_content').css('display', 'none');
        $('.componentTemplateContainer').find('ul>li>div').find('input').removeClass('textMandatory');
        $('.componentTemplateContainer').find('ul>li').find('input').removeClass('textMandatory');
        $('.componentTemplateContainer').find('ul>li').find('select').removeClass('dropdown');
    }
    else {
        $('#exp_info_content').css('display', 'block');
        chkVal = true;
    }
}
function SetDatePicker() {

    if (roleGroupId == 1 || roleGroupId == 6) {
        $('.nhDate').addClass('nhDatePicker'); // date picker only for nh
        $('.nhReadonly').attr('disabled', 'true');
        $('.nhMandatory').addClass('textMandatory');
        $('.nhDate').addClass('dateMandatory');
        $('.nhOnlyAlphanumeric').addClass('onlyAlphanumeric');
        $('.nhOnlyNumeric').addClass('OnlyNumeric');
        $('.hrssDatePicker').attr('disabled', 'true');
        $('.nhEmailMandatory').addClass('emailMandatory');
        $('.hrssDatePicker').focus(function () {
            $('.ui-datepicker-calendar').attr('disabled', 'true');
        });
        $('.nhDisplay').css('display', 'block');
        $('.hrssDisplay').css('display', 'none');
        $('.startDate').removeClass('hrssDatePicker');
        $('.endDate').removeClass('hrssDatePicker');
    }
    else if (roleGroupId == 2) {
        $('.nhDate').removeClass('nhDatePicker');
        $('.nhDate').each(function () {
            if ($(this).val() == "") {
                $('#' + (this.id)).css('display', 'none');
            }
            else if ($(this).val() != "") {
                $('#' + (this.id)).css('display', 'block');
                $('#' + (this.id)).attr('disabled', 'true');
            }
        });
        $('.nhDisplay').css('display', 'none');
        $('.hrssDisplay').css('display', 'block');
    }
    /* To specify only month and year */
    $(".hrssDatePicker").datepicker({ dateFormat: 'MM yy', buttonText: 'Open calendar',
        yearRange: "-50:+0",
        maxDate: "0", prevText: 'Prev', nextText: 'Next',
        showOn: "both", buttonImage: "../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: true, showButtonPanel: true, buttonImageOnly: true,
        onClose: function (dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            BGVComponentHandler.SetTaskContentMemberValue($(this).attr('jqxb-datasource'), $(this).attr('jqxb-datamember'), 1, $.datepicker.formatDate('MM yy', new Date(year, month, 1)), true);
            CalcTotalExp(1);
            validate.obj = this;
            validate.dateMandatory();
        },

        beforeShow: function (input, inst) {
            if ((datestr = $(this).val()).length > 0) {
                year = datestr.substring(datestr.length - 4, datestr.length);
                month = jQuery.inArray(datestr.substring(0, datestr.length - 5), $(this).datepicker('option', 'monthNames'));
                $(this).datepicker('option', 'defaultDate', new Date(year, month, 1));
                $(this).datepicker('setDate', new Date(year, month, 1));
            }
        }
    });

    $(".hrssDatePicker").focus(function () {
        $(".ui-datepicker-calendar").css('display', 'none');
        $(".ui-datepicker").css('font-size', '12px');
        $(".ui-datepicker").css('width', '150px');
        $(".ui-datepicker-title").css('width', '105px');
        $('.ui-widget-content').css({
            'top': ($(this).offset().top + 30) + "px"
        });
    });

    $(".nhDatePicker").datepicker({
        dateFormat: 'mm/dd/yy',
        maxDate: "0",
        yearRange: "-50+0", prevText: 'Prev', nextText: 'Next',
        buttonText: 'Open calendar',
        showOn: "both", buttonImage: "../../Images/calendar.png",
        buttonAfter: false,
        buttonImageOnly: true,
        changeMonth: true, changeYear: true,
        onClose: function (dateText, inst) {
            CalcTotalExp(2);
            validate.obj = this;
            validate.dateMandatory();
        }
    });
}

function ChangeEmploymentType(obj) {
    obj = $(obj);
    var objJqxbId = obj.attr(BGVComponent.componentControlsIdAttr);
    var objId = obj.attr('id');
    var empTypeVal = obj.val();
    if (empTypeVal == '2') {
        $('#' + obj.attr('id')).siblings('.principleCompanyBlock').show();
        $('#' + obj.attr('id')).siblings('.principleCompanyBlock').find('input').addClass('textMandatory');
        BGVComponentHandler.SetTaskContentMemberValue(objId.replace('EmpType_', ''), 'EmployerDetails.PrincipalCompany', null, null, false);
        BGVComponentHandler.SetTaskContentMemberValue(objId.replace('EmpType_', ''), 'EmployerDetails.EmploymentType', null, '2', true);
    }
    else {
        $('#' + obj.attr('id')).siblings('.principleCompanyBlock').hide();
        $('#' + obj.attr('id')).siblings('.principleCompanyBlock').find('input').removeClass('textMandatory');
        BGVComponentHandler.SetTaskContentMemberValue(objId.replace('EmpType_', ''), 'EmployerDetails.PrincipalCompany', null, null, false);
        if (empTypeVal == '1') {
            BGVComponentHandler.SetTaskContentMemberValue(objId.replace('EmpType_', ''), 'EmployerDetails.EmploymentType', null, '1', true);
        }
        else {
            BGVComponentHandler.SetTaskContentMemberValue(objId.replace('EmpType_', ''), 'EmployerDetails.EmploymentType', null, '-1', true);
        }
    }
    
    return false;
}

function SaveComponentDetails(componentType, saveMode) {
    if (saveMode == 1) {
        if (chkVal == false) {
            BaseCisComponentObj = {};
            try {
                if (BGVComponentHandler.SaveComponentData(saveMode) == true) {
                    parent.proceedToUrl();
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
            if (validate.ValidateSubmit() == true) {
                if (BGVComponentHandler.ValidateComponentData(saveMode, componentType) == true) {
                    try {
                        if (BGVComponentHandler.SaveComponentData(saveMode) == true) {
                            parent.proceedToUrl();
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
                    MsgboxInfo(BGVComponentHandler.validationMessage);
                }
            }
            else {
                MsgboxError("Some of the fields are having invalid values");
            }
        }
    }

    else {
        if (chkVal == false) {
            BaseCisComponentObj = {};
        }
        try {
            if (BGVComponentHandler.SaveComponentData(saveMode) == true) {
                parent.loadSelf();
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

function GetRelevantExpInfo() {
    try {
        var data = "{";
        data += "'sessionId':" + sessionId + ",";
        data += "'candidateId':" + candidateId + ",";
        data += "'countryId':" + countryId;
        data += "}";

        $.ajax({
            type: 'post',
            url: "../../FormsService.aspx/GetRelevantExpInfo",
            data: data,
            dataType: "json",
            async: false,
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                var expInfo = msg.d;
                relevantExp = expInfo.RelevantExp;
                cisStatus = expInfo.CisStatus;
            },
            error: function (xhr, status, textRemarks) {
                alert("Error : " + xhr.status + " " + textRemarks);
            }
        });
    }
    catch (e) {
        alert(e.Message);
    }
}

function CalcTotalExp(mode) {
    var totalExp = 0;
    if (mode == 1) {
        $('.totalFrom').each(function () {
            var obj = $(this);
            var totFrom = obj.val();
            var totTo = $('#' + obj.attr('parentContainer') + ' .totalTo').val();

            if (totFrom != undefined && totFrom != null && totFrom != NaN && totFrom != 'null' && totFrom != '') {
                if (totTo != undefined && totTo != null && totTo != NaN && totTo != 'null' && totTo != '') {
                    var objFromDate = $.datepicker.parseDate('d MM yy', '1 ' + totFrom);
                    var objToDate = $.datepicker.parseDate('d MM yy', '1 ' + totTo);
                    totalExp = totalExp + GetMonthDifference(objFromDate, objToDate);
                }
            }
            else {
                totalExp = totalExp + 0;
            }
        });
    }
    else if (mode == 2) {
        $('.totalNhFrom').each(function () {
            var obj = $(this);
            var totNhFrom = obj.val();
            var totNhTo = $('#' + obj.attr('parentContainer') + ' .totalNhTo').val();
            if (totNhFrom != undefined && totNhFrom != null && totNhFrom != NaN && totNhFrom != 'null' && totNhFrom != '') {
                if (totNhTo != undefined && totNhTo != null && totNhTo != NaN && totNhTo != 'null' && totNhTo != '') {

                    var objNhFromDate = $.datepicker.parseDate('mm/dd/yy', totNhFrom);
                    var objNhToDate = $.datepicker.parseDate('mm/dd/yy', totNhTo);

                    totalExp = totalExp + GetMonthDifference(objNhFromDate, objNhToDate);
                }
            }
            else {
                totalExp = totalExp + 0;
            }

        });
    }
    $('#totalExp').val(totalExp);
}

function GetMonthDifference(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - (d1.getMonth() - 1))
    return months <= 0 ? 0 : months;
}
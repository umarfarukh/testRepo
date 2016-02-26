/*BgvCandidateEduInfo.js*/

componentType = 1; /*1-Education*/
var bgvPId = 3; /*BGV Page Id*/
var dsModeofEduaction = 'ModeofEducation';
var dsDegreeList = 'DegreeList';
var dsCountryList = 'CountryList';
var dsStateList = 'StateList';



function PostDrawingAddComponent() {
    jQXB.doBind(dsModeofEduaction);
    jQXB.doBind(dsDegreeList);
    jQXB.doBind(BGVComponent.componentDSName);
    SetDatePicker();
    //SetNHControls();
}

function PostRemoveComponent() {

}

$(document).ready(function () {
    jQXB.initialize();
    jQXB.compatibilitymode = false;

    BGVComponentHandler.Initialize(1);
    BGVComponentHandler.onPostAddComponent = 'PostDrawingAddComponent';
    BGVComponentHandler.onPostDeleteComponent = 'PostRemoveComponent';

    BGVComponentHandler.GetMaster(139, dsModeofEduaction);
    BGVComponentHandler.GetGeographyMaster(8, 0, dsDegreeList);
    //BGVComponentHandler.GetGeographyMaster(45, 0, dsCountryList);
    //BGVComponentHandler.GetGeographyMaster(44, 0, dsStateList);

    //dashboardMode = 0;
    if (roleGroupId == 2) {
        BgvCandidateEduInfo.GetComponentList();
    }
    else if (roleGroupId == 1 || roleGroupId == 6) {
        $('#qualify_div').remove();

    }
    BGVComponentHandler.GetCandidateComponentData();

    var div, divDoc;
    if (BGVComponentHandler.isComponentInfoAvailable == 1) {
        BGVComponentHandler.DrawSavedXMLComponent();
    }

    $('.componentGroupContainer').on("change", "input.textMandatory", validate.textMandatory)
    .on("change", "input.Alphanumeric", validate.textAlphanumeric)
    .on("change", "select.dropdown", validate.dropdown);




    $('input[name="InstitutionName"]').each(function (i) {
        if ($(this).val().toLowerCase() == 'others') {
            $(this).siblings('div.others').show();
            $(this).parent().css({ 'height': '70px' });
        }
    });
    $('select[name="Specialization"]').each(function (i) {
        var degreeId = $(this).attr('id');
        if ($('#' + degreeId + ' option:selected').text().toLowerCase() == 'others') {
            $(this).siblings('div.otherdegree').show();
            $(this).parent().css({ 'height': '70px' });
        }
    });



    $('.componentGroupSubContainer').on("change", "select.specialization", function () {
        var selectedId = $(this).attr('id');
        var degreeName = $('#' + selectedId + ' option:selected').text();
        var otherId = $('#' + selectedId.replace('Specialization', 'otherdegree')).children('input:text').attr('id');

        if (degreeName.toLowerCase() == 'others') {
            $('#' + selectedId.replace('Specialization', 'otherdegree')).show();
            $('#' + otherId).addClass('textMandatory');
            $(this).parent().css({ 'height': '70px' });
        }
        else {
            $('#' + otherId).removeClass('textMandatory');
            $('#' + selectedId.replace('Specialization', 'otherdegree')).hide();
            $(this).parent().css({ 'height': '30px' });
        }
        var degreeId = $('#' + selectedId).val();
        BGVComponentHandler.SetDataMemberValue(selectedId, degreeId);
        BGVComponentHandler.SetDataMemberValue(otherId, '');

    });

    //    $('.componentGroupContainer').on("change", "select.country", function () {
    //        var selectedId = $(this).attr('id');
    //        var selectedStateId = selectedId.replace('Country', 'State');
    //        var selectedInstitutionId = 'relId_' + selectedId.replace('CountryId', 'InstitutionName');
    //        var countryId = $('#' + selectedId).val();
    //        var institutionId = parseInt($('#' + selectedInstitutionId).val());
    //        if (institutionId != 0 && institutionId != 1 && institutionId != 9) {
    //            BGVComponentHandler.GetGeographyMaster(44, institutionId, $('#' + selectedStateId).attr('jqxb-listsource'));
    //            BGVComponentHandler.SetDataMemberValue(selectedId, countryId);
    //        } else {
    //            BGVComponentHandler.GetGeographyMaster(2, countryId, $('#' + selectedStateId).attr('jqxb-listsource'));
    //            BGVComponentHandler.SetDataMemberValue(selectedId, countryId);
    //        }
    //        BGVComponentHandler.SetDataMemberValue(selectedStateId, '-1');
    //    });

});


var BgvCandidateEduInfo =
{
    ComponentList: new Array(),
    DocumentList: new Array(),
    GetComponentList: function () {
        try {
            var typeGroupId = 1;
            var data = "{";
            data += "'sessionId':" + sessionId + ",";
            data += "'candidateId':" + candidateId + ",";
            data += "'countryId':" + countryId + ",";
            data += "'typeGroupId':" + typeGroupId;
            data += "}";

            $.ajax({
                type: 'post',
                url: BGVComponentHandler.serviceURL + "/GetComponentList",
                data: data,
                dataType: "json",
                async: false,
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    BgvCandidateEduInfo.BindComponent(msg.d)
                },
                error: function (xhr, status, textRemarks) {
                    alert("Error : " + xhr.status + " " + textRemarks);
                    return false;
                }
            });
            return true;
        }
        catch (e) {
            alert(e.Message);
        }

    },
    BindComponent: function (dataSource) {
        BgvCandidateEduInfo.ComponentList = JSON.parse(dataSource).ComponentList;

        $(BgvCandidateEduInfo.ComponentList).each(function (i, comp) {
            $('#qualification').append('<li><div style="width: 105px;"><div style="width: 13px; float: left;"><input type="checkbox" id="chk_' + comp.ComponentDetailId + '" onclick="BgvCandidateEduInfo.AddEduComp(\'chk_' + comp.ComponentDetailId + '\', \'' + comp.ComponentCode + '\', \'' + comp.ComponentDetailId + '\'); return;" /></div><label style="float: right; width: 90px;">' + comp.ComponentDesc + '</label></div></li>');
            if (comp.IsComponentSelected == 1) {
                $('#chk_' + comp.ComponentDetailId).attr('checked', true);
            }
        });

    },

    AddEduComp: function (objCheckBoxId, componentCode, componentDetailId) {
        if ($('#' + objCheckBoxId).is(':checked')) {
            if (BGVComponent.Initialize(componentType, componentCode, 1, componentDetailId)) {
                BGVComponent.AddComponent(1);
                $('.onlyFloating').keydown(function (event) {
                    if (event.keyCode == 190 || event.keyCode == 110) {

                    } else {
                        onlyNum(event);
                    }
                });
                $(".onlyAlp").keydown(function (event) {
                    // Allow only backspace and delete 
                    if (event.keyCode == 9 || event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 20 || event.keyCode == 32 || event.keyCode == 88 || event.keyCode == 86 || event.keyCode == 67 || event.keyCode == 37 || event.keyCode == 39) {
                    }
                    else {
                        if (event.keyCode < 65 || event.keyCode > 90) {
                            event.preventDefault();
                        }
                    }
                });

            }
        }
        else {
            $('#div_ComponentGroupSubContainer_' + componentCode).find('.componentContainer').each(function () {

                //var result = BGVComponent.DeleteComponent(null, $(this).attr('compDSName'));
                if (BGVComponent.DeleteComponent(null, $(this).attr('compDSName'))) {
                    $('#' + objCheckBoxId).attr('checked', false);
                }
                else {
                    $('#' + objCheckBoxId).attr('checked', true);
                }
            });
            $('#div_ComponentGroupControlsContainer_' + componentCode).remove();
        }

        // validate.ValidateSubmit();
    }
}

function SetDatePicker() {

    if (roleGroupId == 1 || roleGroupId == 6) {
        $('.nhDate').addClass('nhDatePicker'); // date picker only for nh
        $('.nhDate').addClass('dateMandatory');
        $('.hrssDatePicker').attr('disabled', 'true');
        $('.hrssDatePicker').focus(function () {
            $('.ui-datepicker-calendar').attr('disabled', 'true');
        });
        $('.nhDisplay').css('display', 'block');
        $('.hrssDisplay').css('display', 'none');
        $('.yearofPassing').removeClass('hrssDatePicker');
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
        maxDate: "0",
        prevText: 'Prev',
        nextText: 'Next',
        showOn: "both",
        buttonImage: "../../Images/calendar.png",
        changeMonth: true,
        changeYear: true,
        buttonAfter: true,
        showButtonPanel: true,
        buttonImageOnly: true,
        onClose: function (dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            BGVComponentHandler.SetTaskContentMemberValue($(this).attr('jqxb-datasource'), $(this).attr('jqxb-datamember'), 1, $.datepicker.formatDate('MM yy', new Date(year, month, 1)), true);
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
        $(".ui-datepicker-title").css('width', '100px');
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
        changeMonth: true,
        changeYear: true,
        onClose: function (dateText, inst) {

        }
    });
}

function SetNHControls() {
    if (roleGroupId == 1 || roleGroupId == 6) {
        $('.nhdropdown').addClass('dropdown');
        $('.nhcollege').addClass('textMandatory');
    }

}

// saveMode { 0:Save, 1:Submit }
function SaveComponentDetails(componentType, saveMode) {
    if (saveMode == 1) {
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
        else { MsgboxError("Some of the fields are having invalid values"); }
    }
    else {

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
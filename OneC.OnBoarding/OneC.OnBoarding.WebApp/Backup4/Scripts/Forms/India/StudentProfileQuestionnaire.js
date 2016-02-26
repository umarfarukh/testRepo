$().ready(function () {
    OBPager.GetGeographyMaster(19, 61, "SemesterList");
    OBPager.GetGeographyMaster(18, 68, "certificationlist");
    // OBPager.GetMaster(68, "certificationlist");
    OBPager.GetMaster(69, "language");
    $("#Pg_1_text_Name_Header").val(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_1_Text_Name_Footer").val(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_1_Text_Date_Footer").val(TaskPrefillValues.PrefillValues.Set1.CurrentDate);
    if (OBPager.taskStatusFlag == -1) {
        // Set member value manually
        OBPager.SetTaskContentMemberValue('QuestionnaireData.PersonalInfo.EmployeeName', 1, TaskPrefillValues.PrefillValues.Set1.Name, false);
        OBPager.SetTaskContentMemberValue('QuestionnaireData.PersonalInfo.Date', 1, TaskPrefillValues.PrefillValues.Set1.DOJ, true);
        OBPager.SetTaskContentMemberValue('QuestionnaireData.PersonalInfo.CurrentDate', 1, TaskPrefillValues.PrefillValues.Set1.CurrentDate, true);
    }

    jQXB.doBind(OBPager.taskContentDSName);
    OBPager.ShowPage(1);

    $('#Pg_1_DropDownList_NoTLPCertification1').change(function () {
        var a = $('#Pg_1_DropDownList_NoTLPCertification1').attr('id');
        var b = $('#' + a + " option:selected").text();
        if (b == 'Others') {
            $('#Pg_1_Text_othershide1').show();
            $('#Pg_1_Span_Othershide1').show();
        }
        else {
            $('#Pg_1_Text_othershide1').hide();
            $('#Pg_1_Span_Othershide1').hide();
        }
    });

    $('option').each(function () {
        $(this).attr('title', $(this).text());
    });

    $('.preview').hover(function () {
        this.t = this.title;
        this.n = this.name;
        var a = $(this).attr('id');
        $('#' + a).attr('title', this.n);
    }, function () {
        var a = $(this).attr('id');
        $('#' + a).attr('title', this.t);
        this.t = "";
        this.n = "";
    });

    $('.certification').each(function () {
        var a = $(this).attr('id');
        var d = $("#" + a + " option:selected").text();
        if (d == 'Others') {
            $('#' + a).siblings('input').show();
            $('#' + a).siblings('span').show();
        }
    });

    $('select').change(function () {

        $('select').change(function () {
            var a = $(this).attr('id');
            // var c = $('#' + a).siblings('span').attr('id');
            var e = $('#' + a).closest('li').parent().attr('id');
            var b = $('#' + a).val();
            var d = $('#' + a + " option:selected").text();
            if (b == -1) {
                $('#' + a).attr('title', e);
            }
            else {
                //FUnction for othercertification textbox visiblity
                if (e == 'certification') {
                    var f = $('#' + a).siblings('input').attr('jqxb-datamember');
                    var h = $('#' + a).attr('jqxb-datamember');
                    if (d == 'Others') {
                        //                        OBPager.SetTaskContentMemberValue(h, 1, d, false);
                        $('#' + a).siblings('span').show();
                        $('#' + a).siblings('input').show();
                        $('#' + a).siblings('input').focus();
                        // 
                    }
                    else {
                        $('#' + a).siblings('input').hide();
                        $('#' + a).siblings('span').hide();
                        //                         OBPager.SetTaskContentMemberValue(h, 1, d, false);
                        //                         OBPager.SetTaskContentMemberValue(f, 1, '', true);
                        //FUnction for othercertification textbox visiblity
                        if (e == 'certification') {
                            var f = $('#' + a).siblings('input').attr('jqxb-datamember');
                            var h = $('#' + a).attr('jqxb-datamember');
                            if (d == 'Others') {
                                //                        OBPager.SetTaskContentMemberValue(h, 1, d, false);
                                $('#' + a).siblings('span').show();
                                $('#' + a).siblings('input').show();
                                $('#' + a).siblings('input').focus();
                                // 
                            }
                            else {
                                $('#' + a).siblings('input').hide();
                                $('#' + a).siblings('span').hide();
                                //                         OBPager.SetTaskContentMemberValue(h, 1, d, false);
                                //                         OBPager.SetTaskContentMemberValue(f, 1, '', true);
                            }
                        }
                        $('#' + a).attr('title', d);
                    }
                }
            }
        });
    });


    $('.date').each(function () {
        var a = $(this).attr('id');
        $("#" + a).datepicker({
            dateFormat: 'mm/dd/yy', yearRange: "1980:+1", buttonText: 'Open calendar', showOn: "both",
            buttonImage: "../../../../Images/calendar.png", maxDate: "0", changeMonth: true, changeYear: true, buttonAfter: true
        });
    });
});

////Function for Save the Task Data
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

//Function for Reset the Task Data 
function ResetTaskData() {
    OBPager.ResetTaskContent();
    if (OBPager.taskStatusFlag == -1) {
        // Set member value manually
        OBPager.SetTaskContentMemberValue('QuestionnaireData.EmployeeName', null, TaskPrefillValues.PrefillValues.Set1.Name, false);
        OBPager.SetTaskContentMemberValue('QuestionnaireData.Date', null, TaskPrefillValues.PrefillValues.Set1.DOJ, false);
        jQXB.doBind(OBPager.taskContentDSName);
    }
}
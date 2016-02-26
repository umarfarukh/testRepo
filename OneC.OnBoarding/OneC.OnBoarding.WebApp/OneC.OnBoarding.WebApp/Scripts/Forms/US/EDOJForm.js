var $year = {}, $Month = "";

$().ready(function () {

    $('#SubDate1').hide();
    $('#SubDate2').hide();
    $('#SubDate3').hide();
    $('#SubDate4').hide();

    $('#location_form').hide();
    $('#location_form_2').hide();
    $('#part1').hide();

    if (TaskPrefillValues.PrefillValues.Set3.Checking_new == '1') {
        $('#location_form').show();
        $('#location_form_2').hide();
        $('#part1').show();
        $('#location_form').removeAttr('disabled').addClass('dropdown');
        $('#dress_form').removeAttr('disabled').addClass('dropdown');  
    }
    else if (TaskPrefillValues.PrefillValues.Set3.Checking_new == '0') {
        $('#location_form').hide();
        $('#location_form_2').show();
        $('#part1').hide();
        $('#location_form').attr("disabled", "true").removeClass('dropdown');
        $('#dress_form').attr("disabled", "true").removeClass('dropdown');
    }

    OBPager.ShowPage(1);
    OBPager.GetMaster(217, "LocationList");
    OBPager.GetMaster(220, "DressList");
    OBPager.GetGeographyMaster(57, 0, "DateList");

    var Checking;
    Checking = TaskPrefillValues.PrefillValues.Set2.Checking

    if (Checking == '1') {
        $('#SubDate1').show();
        $('#SubDate2').show();
        $('#SubDate3').show();
        $('#SubDate4').show();
    }
    else {
        $('#SubDate1').hide();
        $('#SubDate2').hide();
        $('#SubDate3').hide();
        $('#SubDate4').hide();
    }

    OBPager.SetTaskContentMemberValue('EDOJ.DOJSubmitted', null, TaskPrefillValues.PrefillValues.Set2.SelectedDate, true);
    OBPager.SetTaskContentMemberValue('EDOJ.SubmittedDate', null, TaskPrefillValues.PrefillValues.Set2.SubmittedDate, true); 

    if (OBPager.taskStatusFlag == "-1") {            
        //OBPager.SetTaskContentMemberValue('EDOJ.DOJ', null, TaskPrefillValues.PrefillValues.Set1.DOJ, false);
        OBPager.SetTaskContentMemberValue('EDOJ.DOJ', null, '-Select-', true);
        OBPager.SetTaskContentMemberValue('EDOJ.Location', null, -1, false);
        OBPager.SetTaskContentMemberValue('EDOJ.DressSize', null, -1, false);
    }

    jQXB.doBind(OBPager.taskContentDSName);

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

$(function () {

    var DOJ = TaskPrefillValues.PrefillValues.Set1.DOJ
    $(".jQryExpdate").datepicker({ dateFormat: 'mm/dd/yy', hideIfNoPrevNext: true,
        yearRange: "-0:+20",
        minDate: "09/08/14",
        changeMonth: true, changeYear: true
    });

});
$(document).ready(function () {

    $('body').on('change', '.ui-datepicker-month,.ui-datepicker-year', function () {
        datePickerUi($('.ui-datepicker-year option:selected').text(), parseInt($('.ui-datepicker-month option:selected').val()) + 1);
    }).on('click', ".jQryExpdate", function () {
        datePickerUi('2014', 9);
    })
    var date = new Date('09/08/2014');
    $Month = date.getMonth() + 1;
    calCDateView(date, '2034');
});

var datePickerUi = function (yr, mon) {
    $('.ui-datepicker-next').remove();
    $('.ui-datepicker-prev').remove();
    var arr = $year[yr][mon];
    var day = 0;
    $('.ui-datepicker-calendar tbody tr').each(function (i) {
        $(this).children().each(function (j, val) {
            var txt = ($.trim($(this).text()) == "" ? 0 : parseInt($(this).text()));
            if (j != 1 || $.inArray(txt, arr) == -1) {
                $(this).attr('class', '').addClass(' ui-datepicker-unselectable ui-state-disabled');
                $(this).html('').append('<span class="ui-state-default">&nbsp;</span>');
            }
            day++;
        });
    });
}

function ResetTaskData() {

    OBPager.ResetTaskContent();
    //PrePopulateValues();
    if (OBPager.taskStatusFlag == -1) {
        // Set member value manually

        $('#date_form').val('-1');
        $('#location_form').val('-1');
        $('#dress_form').val('-1');

    }

    jQXB.doBind(OBPager.taskContentDSName);

}


var calCDateView = function (date, yrRange) {
    var $Mon = {}, $date = date, lastVal = date.getDate(), $yr = date.getFullYear();
    for (var year = date.getFullYear(); year <= yrRange; year++) {
        $Mon = {};
        for (var month = date.getMonth() + 1; month <= 12; month++) {
            var i = 0, d = [];
            for (var day = $date.getDate(); $yr <= yrRange && $date.getMonth() + 1 == month; ) {
                d[i] = day;
                i++;
                day = $date.getDate() + 14;
                $date.setDate($date.getDate() + 14);
                $yr = $date.getFullYear();
            }
            $Mon[month] = d;
        }
        $year[year] = $Mon;
    }
}

var img = "../../../../Images/EDOJ2_new.jpg";
$(document).ready(function () {
    $('.info_img').on({
        mouseover: function () {
            var obj = $(this), position = obj.position();
            $('#Img-Preview').remove();
            var preview = '<a id="Img-Preview"><img src="' + img + '"/></a>';
            $('body').append(preview);
            $('#Img-Preview').css({
                'z-index': 9999,
                'left': position.left - 20 + "px",
                'top': position.top - 55 + "px",
                'position': 'absolute',
                'float': 'right',
                'border': '2px solid #000',
                'display': 'block'
            })
        },
        mouseleave: function () {
            $('#Img-Preview').remove();
        }
    });
});
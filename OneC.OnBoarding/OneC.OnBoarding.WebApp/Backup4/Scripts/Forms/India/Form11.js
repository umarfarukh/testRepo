
//Preparing form
$().ready(function () {


    //    $('select[name="PF Account No2"] option value="not applicable "').attr('disabled', false).show();


    if (TaskPrefillValues.PrefillValues.Set1.Gender == 'M') {
        OBPager.GetGeographyMaster(161, 1, "RelationshipList");
    }
    else {
        OBPager.GetGeographyMaster(161, 0, "RelationshipList");
    }

    OBPager.GetMaster(116, "accountconfirmation");
    $('#part1').hide();
    $('#part2').hide();

    OBPager.GetMaster(236, "PFMember");
    $('#PFMemberName1').hide();


    var taskObj = JSON.parse(OBPager.strFormDetails).Form11;

    if (taskObj.accountconfirmation == '1') {
        $('#part1').show();
        $('#part2').hide();
    }
    if (taskObj.accountconfirmation == '2') {
        $('#part2').show();
        $('#part1').hide();
    }

    if (taskObj.PFMember == '1') {
        $('#PFMemberName1').hide();
    }
    if (taskObj.PFMember == '2') {
        $('#PFMemberName1').show();
    }
    if (taskObj.PFMember == '-1') {
        OBPager.SetTaskContentMemberValue('Form11.fundvalue', null, "", true);
    }
    if (taskObj.PFMember == '1') {
        OBPager.SetTaskContentMemberValue('Form11.fundvalue', null, TaskPrefillValues.PrefillValues.Set2.fvalue1, false);
    }
    if (taskObj.PFMember == '2') {
        OBPager.SetTaskContentMemberValue('Form11.fundvalue', null, TaskPrefillValues.PrefillValues.Set2.fvalue2, false);
    }

    OBPager.GetMaster(239, "socialsecurityvalue");
    OBPager.GetMaster(237, "fundvalue");
    OBPager.GetMaster(236, "PFMember");
    OBPager.GetMaster(231, "withdrawnvalue1");
    OBPager.GetMaster(231, "traveldetails");
    OBPager.GetMaster(231, "withdrawnvalue2");
    OBPager.GetMaster(231, "withdrawnvalue3");
    OBPager.GetMaster(232, "pensionvalue");
    OBPager.GetMaster(233, "certificateholder");
    OBPager.GetMaster(234, "schemecertificate");

    OBPager.SetTaskContentMemberValue('Form11.Name', null, TaskPrefillValues.PrefillValues.Set1.Name, false);
    OBPager.SetTaskContentMemberValue('Form11.Date', null, TaskPrefillValues.PrefillValues.Set1.DOJ, false);

    //OBPager.SetTaskContentMemberValue('Form11.CurrentEmployerAddress', null, TaskPrefillValues.PrefillValues.Set1.currentemployment, false);
    //OBPager.SetTaskContentMemberValue('Form11.CurrentEmployerEndDate', null, TaskPrefillValues.PrefillValues.Set1.currentEmptodate, false);

    jQXB.doBind(OBPager.taskContentDSName);
    PFMembertrustvalue();
    scheme('#SchemeID');
    OBPager.ShowPage(1);
    $('#SchemeID').on('change', function () {
        scheme(this, 0);
    });
    $('#Pg1_text_PFAccNo').text('NOT APPLICABLE');
    //  OBPager.SetTaskContentMemberValue('Form11.CurrentEmployerAddress', null, TaskPrefillValues.PrefillValues.Set1.currentemployment, false);
    //OBPager.SetTaskContentMemberValue('Form11.CurrentEmployerEndDate', null, TaskPrefillValues.PrefillValues.Set1.currentEmptodate, false);
});


var scheme = function (obj, fnMode) {
    var val = $(obj).val();
    OBPager.SetTaskContentMemberValue('Form11.HoldingSchemeCertificate', null, val, false);
    if (val == 2) {

        //        $('select[name="Relationship6"] option value="not applicable "').attr('disabled', false).show();

        //$('select[name="Relationship6"]').attr('disabled', false).show().after(OBPager.GetMaster(238, "schemecertificate"));
        OBPager.GetMaster(238, "schemecertificate");
        if (fnMode == 0)
            OBPager.SetTaskContentMemberValue('Form11.Certificatesurrenderedvalue', null, 1, true);
        $('#Select6').attr('disabled', true);
        //        .after('<label class="msg" > not applicable</label>').hide();

        //        OBPager.SetTaskContentMemberValue('Form11.Certificatesurrenderedvalue', null, '', false);
    } else if (val == 1) {
        $('select[name="Relationship6"]').attr('disabled', false).show();
        $('.msg').remove();
        OBPager.GetMaster(234, "schemecertificate");
        if (fnMode == 0)
            OBPager.SetTaskContentMemberValue('Form11.Certificatesurrenderedvalue', null, -1, true);
    }
    //    else {
    //        OBPager.SetTaskContentMemberValue('Form11.Certificatesurrenderedvalue', null, "-1", false);
    //    }
    //    OBPager.SetTaskContentMemberValue('Form11.HoldingSchemeCertificate', null, val, true);
    //    OBPager.SetTaskContentMemberValue('Form11.Certificatesurrenderedvalue', null, "1", false);
}


$('#CurrentEmployerAddress').hover(function () {
    $('#CurrentEmployerAddress').tooltip();
});

$('#PreviousEmployerAddress').hover(function () {
    $('#PreviousEmployerAddress').tooltip();
});

$('#PFMemberName').hover(function () {
    $('#PFMemberName').tooltip();
});

$('#Pg1_text_PFAccNo').hover(function () {
    $('#Pg1_text_PFAccNo').tooltip();
});
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
    try {
        OBPager.ResetTaskContent();

        //        $('#accountconfirmation').val('-1');
        //        $('#PFMember').val('-1');
        //        $('#PFMemberName1').val('-1');
        OBPager.SetTaskContentMemberValue('Form11.Name', null, TaskPrefillValues.PrefillValues.Set1.Name, false);
        OBPager.SetTaskContentMemberValue('Form11.Date', null, TaskPrefillValues.PrefillValues.Set1.DOJ, false);
        OBPager.SetTaskContentMemberValue('Form11.CurrentEmployerAddress', null, TaskPrefillValues.PrefillValues.Set1.currentemployment, false);
        //OBPager.SetTaskContentMemberValue('Form11.Form11.CurrentEmployerAddress2', null, TaskPrefillValues.PrefillValues.Set1.currentemployment, false);
        // OBPager.SetTaskContentMemberValue('Form11.CurrentEmployerEndDate', null, TaskPrefillValues.PrefillValues.Set1.currentEmptodate, false);        
        YesOrNo();
        jQXB.doBind(OBPager.taskContentDSName);
    }
    catch (e) { }
};

$(function () {
    $(".jQrydatepicker1").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar',

        showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true
    });

    $(".jQrydatepicker").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar',
        yearRange: "-62:+0",
        maxDate: "0",
        showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    });
    $(".jQryExpdate").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar',
        //  yearRange: "2012:+50",
        showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    });

});

function ValidateOnlyInteger() {
    $('input.nospace').keydown(function (e) {
        if (e.which != 8 && e.which != 46 && e.which != 37 && e.which != 32 && e.which != 39 && e.which != 16 && e.which != 9 && (e.which < 48 || e.which > 57) && (e.which < 96 || e.which > 105)) {
            return false;
        }
    });
}
function ValidateOnlyAlphabets() {
    $('input.nospace1').keydown(function (e) {
        if (e.which != 8 && e.which != 46 && e.which != 37 && e.which != 32 && e.which != 39 && e.which != 16 && e.which != 9 && (e.which < 65 || e.which > 90)) {
            return false;
        }
    });
}

function YesOrNo() {
    if ($('#accountconfirmation').val() != '-1') {
        if ($('#accountconfirmation').val() == '1') {
            $('#part1').show();
            $('#part2').hide();
        }
        else {
            $('#part1').hide();
            $('#part2').show();
        }
        $('[jqxb-datamember]').not('input.inputText_Readonly, textarea.inputText_Readonly').map(function () { OBPager.SetTaskContentMemberValue($(this).attr('jqxb-datamember'), null, '') });
        OBPager.SetTaskContentMemberValue('Form11.CurrentEmployerAddress', null, TaskPrefillValues.PrefillValues.Set1.currentemployment);
        OBPager.SetTaskContentMemberValue('Form11.RelationName', null, TaskPrefillValues.PrefillValues.Set1.FatherName);
        if (TaskPrefillValues.PrefillValues.Set1.Gender == 'F') {
            OBPager.SetTaskContentMemberValue('Form11.Relation', null, 3);
            $('#Pg_1_text_Relationship, #Pg_1_text_Relationship_2').attr('disabled', true);
        } if (TaskPrefillValues.PrefillValues.Set1.Gender == 'M') {
            OBPager.SetTaskContentMemberValue('Form11.Relation', null, 1);
            $('#Pg_1_text_Relationship, #Pg_1_text_Relationship_2').attr('disabled', true);
        }
        OBPager.SetTaskContentMemberValue('Form11.accountconfirmation', null, $('#accountconfirmation').val());
        //jQXB.doBind(OBPager.taskContentDSName);
    } if ($('#accountconfirmation').val() == null) {

        $('#part1').hide(); $('#part2').hide();
    }
}

function PFMembertrustvalue() {
    if ($('#PFMember').val() == '1') {
        $('.dd').remove();
        OBPager.GetMaster(236, "PFMember");
        $('select[name="PFMember"]').after('<label class="message" > Provident Fund and also Pension Fund</label>').show();
        $('#PFMemberName1').hide();
        OBPager.SetTaskContentMemberValue('Form11.PFMember', null, 1, false);
        OBPager.SetTaskContentMemberValue('Form11.fundvalue', null, TaskPrefillValues.PrefillValues.Set2.fvalue1, true);

    }
    else if ($('#PFMember').val() == '2') {
        $('.message').remove();
        OBPager.GetMaster(236, "PFMember");
        $('select[name="PFMember"]').attr('disabled', false).show()
        $('#PFMemberName1').show().after('<label class="dd"> Provident Fund but not of the Pension Fund</label>').show();
        OBPager.SetTaskContentMemberValue('Form11.PFMember', null, 2, false);
        OBPager.SetTaskContentMemberValue('Form11.fundvalue', null, TaskPrefillValues.PrefillValues.Set2.fvalue2, true);
    }

    else {
        OBPager.SetTaskContentMemberValue('Form11.PFMember', null, -1, false);
        OBPager.SetTaskContentMemberValue('Form11.fundvalue', null, "", true);
        $('.message').hide();
        $('.dd').hide();
        $('#PFMemberName1').hide();
    }





}



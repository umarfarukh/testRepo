var flag = 0;
var locationValue;
var confirmErprocess = 0;
$().ready(function () {

    OBPager.GetMaster(240, "PortWirelessProviderList");
    $(".new2015").hide();
    $(".ver").hide();
    $(".att").hide();
    $(".ver_new").hide();
    $(".oldphone_model").hide();
    $(".ver_txtbox").hide();
    $(".ver_drpdwn").hide();
    //    $("#SmartPhones_2").hide();  
    $("#Pg_2_LaptopOptions").hide();

    if (TaskPrefillValues.PrefillValues.Set4.Checking_new == '1') {

        //        $("#SmartPhones_2").show();
        $("#Rd5").show();

        $(".att").show();
        $(".ver").hide();

        $(".newer").hide();
        $(".old").show();
        //        $('#Pg_2_text_Homecity').removeAttr('disabled').addClass('textMandatory');
    }
    else if (TaskPrefillValues.PrefillValues.Set4.Checking_new == '0') {

        //        $("#SmartPhones_2").hide();
        $("#Rd5").hide();

        $(".att").hide();
        $(".ver").hide();

        $(".newer").show();
        $(".old").hide();
        //        $('#Pg_2_text_Homecity').attr("disabled", "true").removeClass('textMandatory');
    }
    if (TaskPrefillValues.PrefillValues.Set4.hideatt == '0') {
        $("#atandt").hide();
        $(".atandt").hide();
        $(".oldphone_model").hide();
        $(".ver_txtbox").show();
        $(".ver_drpdwn").hide();
        $(".new2015").hide();
        $(".att").hide();
        $(".newPrice2015").show();
      //  $("#Pg_2_LaptopOptions").show();
        //        $(".ver_new").show();
        //        $(".ver").hide();


    }
    else if (TaskPrefillValues.PrefillValues.Set4.hideatt == '1') {
        $("#atandt").show();
        $(".atandt").show();
        $(".oldphone_model").show();
        $(".ver_txtbox").hide();
        $(".ver_drpdwn").show();
        $(".new2015").show();
        $(".newPrice2015").hide();
        //        $(".ver_new").hide();
        //        $(".ver").hide();
    }

    $("#Color1").hide();
    $("#Color2").hide();
    $("#Color3").hide();

    if (TaskPrefillValues.PrefillValues.Set4.Checking == '1') {
        $("#SmartPhones_Div").show();
        $("#SmartPhones_2").hide();
    }
    else if (TaskPrefillValues.PrefillValues.Set4.Checking == '0') {
        $("#SmartPhones_Div").hide();
        $("#SmartPhones_2").show();
    }

    var taskObj = JSON.parse(OBPager.strFormDetails).EquipmentRequestData;

    if (taskObj.atandt == '1' || taskObj.atandt == 'true') {
        //        $("#SmartPhones_2").show();
        $('.att').show();
        $("#atandt").show();
        $(".atandt").show();
        $(".oldphone_model").show();
    }
    //    else {
    //        $('.att').hide();
    //    }

    if (taskObj.verizon == '1' || taskObj.verizon == 'true') {
        //        $("#SmartPhones_2").show();
        if (TaskPrefillValues.PrefillValues.Set4.hideatt == '0') {
            if (TaskPrefillValues.PrefillValues.Set4.Checking == '0') {
                $(".ver_new").show();

            }
            else {
                $(".ver_new").hide();
            }
            $(".ver").hide();
            $(".oldphone_model").hide();
            $(".newPrice2015").show();
        }
        else if (TaskPrefillValues.PrefillValues.Set4.hideatt == '1') {
            $('.ver').show();
            $(".ver_new").hide();
            $(".oldphone_model").show();
        }
        if (taskObj.iPhone5C_2 == "true" || taskObj.SamsungNote3_2 == "true" || taskObj.SamsungS4_2 == "true" || taskObj.iPhone5C_2 == '1' || taskObj.SamsungNote3_2 == '1' || taskObj.SamsungS4_2 == '1') {
            if (TaskPrefillValues.PrefillValues.Set4.hideatt == '0') {
                $('.ver').hide();
                $(".ver_new").show();
            }
            else {
                $('.ver').show();
                $(".ver_new").hide();
            }
            $(".oldphone_model").show();
        }
    }
    //    else {
    //        $('.ver').hide();
    //    }

    if (taskObj.iPhone5C_2 == '1' || taskObj.iPhone5C_2 == 'true') {
        $('#Color1').show();
    }
    else {
        $('#Color1').hide();
    }

    if (taskObj.iPhone5S_2 == '1' || taskObj.iPhone5S_2 == 'true' || taskObj.iPhone6_2 == '1' || taskObj.iPhone6_2 == 'true'
    || taskObj.iPhone6P_2 == '1' || taskObj.iPhone6P_2 == 'true' || taskObj.iPhone6_64GB_2 == '1' || taskObj.iPhone6_64GB_2 == 'true'
    || taskObj.iPhone6_128GB_2 == '1' || taskObj.iPhone6_128GB_2 == 'true'
    || taskObj.iPhone6P_64GB_2 == '1' || taskObj.iPhone6P_64GB_2 == 'true' || taskObj.iPhone6P_128GB_2 == '1' || taskObj.iPhone6P_128GB_2 == 'true') {
        $('#Color2').show();
    }
    else {
        $('#Color2').hide();
    }

    if (taskObj.SamsungS4_2 == '1' || taskObj.SamsungS4_2 == 'true' || taskObj.SamsungS5_2 == '1' || taskObj.SamsungS5_2 == 'true'
    || taskObj.SamsungNote3_2 == '1' || taskObj.SamsungNote3_2 == 'true' || taskObj.SamsungNote4_2 == '1' || taskObj.SamsungNote4_2 == 'true'
    || taskObj.Nexus_6_2 == '1' || taskObj.Nexus_6_2 == 'true') {
        $('#Color3').show();
    }
    else {
        $('#Color3').hide();
    }

    if (taskObj.Acknowledge == 'true' || taskObj.Acknowledge == '1') {
        $('#Pg_1_check_ack').prop('checked', true);
    }
    else {
        $('#Pg_1_check_ack').prop('checked', false);
    }
    if (taskObj.X250 == 'true' || taskObj.X250 == '1' || taskObj.T450 == 'true' || taskObj.T450 == '1') {
        if (taskObj.X250 == 'true' || taskObj.X250 == '1') {
            $('#Pg_2_text_Laptop_X250').prop('checked', true);
        }
        else {
            $('#Pg_2_text_Laptop_X250').prop('checked', false);
        }
        if (taskObj.T450 == 'true' || taskObj.T450 == '1') {
            $('#Pg_2_text_Laptop_T450').prop('checked', true);
        }
        else {
            $('#Pg_2_text_Laptop_T450').prop('checked', false);
        }
        $("#Pg_2_LaptopOptions").show();
    }
    if (taskObj.PortStatus == 'true' || taskObj.PortStatus == '1') {
        $("#Port_chk").show();
        $('#Port_DPlus_chkbx').prop('checked', true);
        $("#Port_div").show();
        if (taskObj.PortWirelessProvider_new != null) {
            $(".ver_txtbox").hide();
            $(".ver_drpdwn").show();
        }
        else {
            $(".ver_txtbox").show();
            $(".ver_drpdwn").hide();
        }
        validatePortingBlackberry();
    }
    else {
        $("#Port_chk").hide();
        $('#Port_DPlus_chkbx').prop('checked', false);
        $("#Port_div").hide();
        ValidatePortingBlackberryNo();
    }
    if (TaskPrefillValues.PrefillValues.Set3.Location == 'NJ') {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Address.NJ', 1, 1, false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Address.AZ', 1, '', true);
    }
    else if (TaskPrefillValues.PrefillValues.Set3.Location == 'AZ') {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Address.NJ', 1, '', false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Address.AZ', 1, 1, true);
    }

    if (TaskPrefillValues.PrefillValues.Set1.Score <= 45) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Laptop', null, 1, true);
        $("#Pg_2_text_Laptop").attr('disabled', 'disabled');

        if (TaskPrefillValues.PrefillValues.Set1.Score <= 35) {
            $("#lbl_LT_AutoAprvd").show();
            $("#lbl_SP_AutoAprvd").show();
            //$("#Port_chk").show();
        }
        else {
            $("#lbl_LT_AutoAprvd").show();
            $("#lbl_SP_AutoAprvd").hide();
            //$("#Port_chk").hide();
        }
    }

    var IsTaskSubmitted = TaskPrefillValues.PrefillValues.Set2.IsTaskSubmitted;
    var ERRequestConfirm = TaskPrefillValues.PrefillValues.Set2.ERRequestConfirm;
    if (IsTaskSubmitted == 1) {
        if (IsTaskSubmitted == 1 && ERRequestConfirm == 1) {
            $('#btnSubmitTask').hide();
            $('input').attr('disabled', " true");
            $('select').attr("disabled", "true");
            $('textarea').attr("disabled", "true");

        }
        if (OBPager.taskSubmittedFlag == 1 && openMode == 1) {
            $('#btnConfirmTask').show();
            $('input').attr('disabled', false);
            $('select').attr("disabled", false);
            $('textarea').attr("disabled", false);
        }
    }
    else {
        if (IsTaskSubmitted == 0) {
            if (OBPager.taskSubmittedFlag == 0 && openMode == 1) {
                $('#btnConfirmTask').show();
                $('input').attr('disabled', false);
                $('select').attr("disabled", false);
                $('textarea').attr("disabled", false);
            }

        }
    }

    /* Added 312539  RC Confirmed ER Request block the confirm button */
    if (ERRequestConfirm == 1) {
        if (OBPager.taskSubmittedFlag == 1 && openMode == 1) {
            $('#btnConfirmTask').hide();
            $('select').attr("disabled", "true");
            $('textarea').attr("disabled", "true");
            $('input').attr('disabled', " true");
        }
    }

    var IsFreezed = TaskPrefillValues.PrefillValues.Set2.IsFreezed;
    if (IsFreezed == 1) {
        $('input').attr("disabled", "true");
        $('select').attr("disabled", "true");
        $('#btnResetTask').hide();
        $('#btnSaveTask').hide();
        $('#btnSubmitTask').hide();

    }

    //    OBPager.GetMaster(58, "LocationCity");
    $(".collapses").live("click", function () {
        var t = $(this).attr('id');
        $('#' + t).removeAttr('src').attr('src', '../../../../Images/Expand.png');
        if (flag == 0) {
            $("." + t).show();
            $('#' + t).removeAttr('src').attr('src', '../../../../Images/Expand.png');
            flag = 1;
        }
        else {
            $("." + t).hide();
            $('#' + t).removeAttr('src').attr('src', '../../../../Images/Collapse.png');
            flag = 0;
        }
    });

    //    $('.equipment').on("click", function (event) {
    //        $('.equipment').prop('checked', false);
    //        $(this).prop('checked', true);
    //    });

    //need to hide on page load

    if (TaskPrefillValues.PrefillValues.Set4.Checking_new == '1') {
        if (($("#BB_Z10_rdb").is(':checked') || $("#iPhone_4S_rdb").is(':checked') || $("#Samsung_S3_rdb").is(':checked') ||
                $("#LG_G2_rdb").is(':checked') || $("#Samsung_S4_rdb").is(':checked') || $("#Samsung_S5_rdb").is(':checked') || $("#iPhone_5C_rdb").is(':checked') ||
                $("#iPhone_5S_rdb").is(':checked') || $("#Samsung_Note3_rdb").is(':checked')
                || $("#Radio1").is(':checked') || $("#Radio2").is(':checked') || $("#Radio3").is(':checked')
                || $("#Radio4").is(':checked') || $("#Radio5").is(':checked') || $("#Radio6").is(':checked')
                || $("#Radio7").is(':checked') || $("#Radio8").is(':checked') || $("#Radio9").is(':checked')
                || $("#Radio10").is(':checked') || $("#Radio11").is(':checked') || $("#Radio12").is(':checked') || $("#Radio13").is(':checked') || $("#Radio14").is(':checked') || $("#Radio15").is(':checked'))
                && (TaskPrefillValues.PrefillValues.Set1.Score <= 35)) {
            $("#Port_chk").show();
        }
        else {
            $("#Port_chk").hide();
        }
    }
    else if (TaskPrefillValues.PrefillValues.Set4.Checking_new == '0') {
        $("#Port_chk").show();
    }

    if (TaskPrefillValues.PrefillValues.Set4.Checking_new == '1') {

        $("input[type='radio']").on('change', function () {

            if (($("#BB_Z10_rdb").is(':checked') || $("#iPhone_4S_rdb").is(':checked') || $("#Samsung_S3_rdb").is(':checked') ||
                $("#LG_G2_rdb").is(':checked') || $("#Samsung_S4_rdb").is(':checked') || $("#Samsung_S5_rdb").is(':checked') || $("#iPhone_5C_rdb").is(':checked') ||
                $("#iPhone_5S_rdb").is(':checked') || $("#Samsung_Note3_rdb").is(':checked')
                || $("#Radio1").is(':checked') || $("#Radio2").is(':checked') || $("#Radio3").is(':checked')
                || $("#Radio4").is(':checked') || $("#Radio5").is(':checked') || $("#Radio6").is(':checked')
                || $("#Radio7").is(':checked') || $("#Radio8").is(':checked') || $("#Radio9").is(':checked') || $("#Radio10").is(':checked') || $("#Radio11").is(':checked')
                || $("#Radio12").is(':checked') || $("#Radio13").is(':checked') || $("#Radio14").is(':checked') || $("#Radio15").is(':checked'))
        && (TaskPrefillValues.PrefillValues.Set1.Score <= 35)) {
                $("#Port_chk").show();
            }
            else {
                $("#Port_chk").hide();
            }

        });
    }
    else if (TaskPrefillValues.PrefillValues.Set4.Checking_new == '0') {
        $("#Port_chk").show();
    }

    $("input[type='checkbox']").on('change', function () {
        var obj = $(this).attr("id");        // for laptop changes
        if ($("#Port_DPlus_chkbx").is(':checked')) {
            //&& (TaskPrefillValues.PrefillValues.Set1.Score <= 35)
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.PortStatus', null, 1, true);
            $("#Port_div").show();
            validatePortingBlackberry();
        }
        else {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.PortStatus', null, 0, true);
            $("#Port_div").hide();

            ValidatePortingBlackberryNo();
        }
        // for laptop changes
        if (obj == 'Pg_2_text_Laptop_X250') {
            $('#Pg_2_text_Laptop_T450').attr('checked', false);
        }
        else if (obj == 'Pg_2_text_Laptop_T450') {
            $('#Pg_2_text_Laptop_X250').attr('checked', false);
        }
        if ($("#Pg_2_text_Laptop_X250").is(':checked')) {
            //&& (TaskPrefillValues.PrefillValues.Set1.Score <= 35)
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.X250', null, 1, true);
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.T450', null, "", true);
        }
        else {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.X250', null, "", true);
        }
        if ($("#Pg_2_text_Laptop_T450").is(':checked')) {
            //&& (TaskPrefillValues.PrefillValues.Set1.Score <= 35)
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.T450', null, 1, true);
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.X250', null, "", true);
            //  $('#Pg_2_text_Laptop_X250').attr('checked', false); 
        }
        else {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.T450', null, "", true);
        }
    });



    //        if ($('input[name="Pg_2_rdbtn_Blackberry_Z10"]:checked').length == 0) {
    //            $("#Port_div").hide();

    //            //        $("#conformation").hide();
    //            //        OBPager.SetTaskContentMemberValue('EquipmentRequestData.yes', null, "", false);
    //            //        OBPager.SetTaskContentMemberValue('EquipmentRequestData.No', null, "", true);
    //        }
    //        else {

    //            //        $("#conformation").show();
    //            //        if ($('#yes:checked').length == 1) {
    //            $("#Port_div").show();
    //            validatePortingBlackberry();
    //            //        }

    //        }
    //    if ($('input[name="cognizantOffice"]:checked').length == 1) {
    //        $("#addressForm").attr('disabled', 'disabled');
    //        $("#Pg_2_text_Homecity").attr('disabled', 'disabled');
    //    }

    //    $("#Pg_2_text_BlackBerry").live("click", function () {
    //        if ($('input[name="Pg_2_text_BlackBerry"]:checked').length == 1) {
    //            OBPager.SetTaskContentMemberValue('EquipmentRequestData.Blackberry', null, true, false);
    //            OBPager.SetTaskContentMemberValue('EquipmentRequestData.Cellphone', null, "", true);

    //            $("#conformation").show();
    //        }
    //        else {

    //            OBPager.SetTaskContentMemberValue('EquipmentRequestData.yes', null, "", false);
    //            OBPager.SetTaskContentMemberValue('EquipmentRequestData.No', null, "", false);
    //            OBPager.SetTaskContentMemberValue('EquipmentRequestData.Blackberry', null, "", false);
    //            OBPager.SetTaskContentMemberValue('EquipmentRequestData.Cellphone', null, "", true);
    //            $("#conformation").hide();
    //            $("#details").hide();
    //            clear();
    //        }

    //    });

    //    $('#Pg_2_text_Laptop').live("click", function () {

    //        if ($('input[name="Laptop"]:checked').length == 1) {
    //            OBPager.SetTaskContentMemberValue('EquipmentRequestData.Laptop', null, true, true);
    //        }
    //        else {
    //            OBPager.SetTaskContentMemberValue('EquipmentRequestData.Laptop', null, "", true);
    //        }
    //    });

    $("#Pg_2_text_Name").val(TaskPrefillValues.PrefillValues.Set1.NAME);
    $("#Pg_2_text_AssociateId").val(TaskPrefillValues.PrefillValues.Set1.AssociateId);
    $("#Pg_2_text_level").val(TaskPrefillValues.PrefillValues.Set1.DesignationDesc);
    $("#Pg_2_text_mailid").val(TaskPrefillValues.PrefillValues.Set2.PersonalEmail);
    $("#Pg_2_text_TelNo").val(TaskPrefillValues.PrefillValues.Set2.MobilePhone);
    $("#HomeAddress").val(TaskPrefillValues.PrefillValues.Set2.Address);
    $("#Pg_2_text_Homecity").val(TaskPrefillValues.PrefillValues.Set2.City);
    $("#Pg_2_text_DOJ").val(TaskPrefillValues.PrefillValues.Set2.DOJ);
    $("#Pg_2_text_RecruiterId").val(TaskPrefillValues.PrefillValues.Set2.RecruiterId);
    OBPager.ShowPage(1);
    if (OBPager.taskStatusFlag == "-1") {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Laptop', null, "1", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.BlackberryZ10', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone4S', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5C', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5S', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS3', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS4', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS5', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.LGG2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.HomeAddress', null, TaskPrefillValues.PrefillValues.Set2.Address, false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Homecity', null, TaskPrefillValues.PrefillValues.Set2.City, false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote3', null, "", true);
        $("#Pg_2_LaptopOptions").show();
        //        Permanent();

    }
    //    if (OBPager.taskStatusFlag == 1) {
    //        //$('.disable').find('input').attr('disabled', true);
    //        $('.equipment').attr('disabled', true);
    //        $('.collapses').attr('disabled', false);
    //    }

    //    if ($('input[name="cognizantOffice"]:checked').length == 1) {
    //        $(".CognizantOffice").show();
    //        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Address.permanent', 1, "", false);
    //        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Address.cognizantOffice', 1, true, true);
    //    }
    //    else {
    //        $(".CognizantOffice").hide();
    //        locationValue = parseInt($('#Location').val());
    //        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Address.permanent', 1, true, false);
    //        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Address.cognizantOffice', 1, "", false);
    //        OBPager.SetTaskContentMemberValue('EquipmentRequestData.location', null, -1, true);

    //    }
    //    var inputText = $('#addressForm').val().length;
    //    if (inputText == 0) {
    //        $('#addressForm').removeClass('Alphanumeric').addClass('textMandatory');
    //        $('.textMandatory').change(validate.textMandatory);

    //    } else {
    //        $('#addressForm').removeClass('textMandatory').addClass('Alphanumeric');
    //        $('.Alphanumeric').change(validate.textAlphanumeric);
    //    }

    //    $('#addressForm').live("paste change mouseleave focus", function (e) {
    //        $(e.target).mouseleave(value);
    //    });

    //    function value(e) {
    //        var inputText = $(e.target).val().length;
    //        if (inputText == 0) {
    //            $('#addressForm').removeClass('Alphanumeric').addClass('textMandatory');
    //            $('.textMandatory').change(validate.textMandatory);

    //        } else {
    //            $('#addressForm').removeClass('textMandatory').addClass('Alphanumeric');
    //            $('.Alphanumeric').change(validate.textAlphanumeric);
    //        }
    //    }    
    if (OBPager.taskSubmittedFlag == 1 && openMode == 1) {
        $('#Teaneck_radio').attr("disabled", "disabled");
        $('#Phoenix_radio').attr("disabled", "disabled");
    }
});

//$("#BB_Z10_rdb").live("click", function () {
//    if ($('input[name="Pg_2_rdbtn_Blackberry_Z10"]:checked').length == 1) {
//        OBPager.SetTaskContentMemberValue('EquipmentRequestData.BlackberryZ10', null, true, true);
//        $("#Port_div").show();
//        $("#conformation").show();
//        validatePortingBlackberry();
//    }
//    else {
//        OBPager.SetTaskContentMemberValue('EquipmentRequestData.BlackberryZ10', null, "", true);
//        $("#Port_div").hide();
//        $("#conformation").hide();
//        $("#details").hide();
//        clear();
//        ValidatePortingBlackberryNo();
//    }
//});

//$('#Pg_2_text_Cellphone').live("click", function () {
//    OBPager.SetTaskContentMemberValue('EquipmentRequestData.Blackberry', null, "", false);
//    OBPager.SetTaskContentMemberValue('EquipmentRequestData.yes', null, "", false);
//    OBPager.SetTaskContentMemberValue('EquipmentRequestData.No', null, "", false);
//    if ($('input[name="CellPhone"]:checked').length == 1) {
//        $("#conformation").hide();
//        $("#details").hide();
//        clear();
//        ValidatePortingBlackberryNo();
//        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Cellphone', null, true, true);
//    }
//    else {
//        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Cellphone', null, "", true);
//    }
//});
//$('#Pg_2_text_Laptop').live("click", function () {

//    if ($('input[name="Laptop"]:checked').length == 1) {
//        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Laptop', null, true, true);
//    }
//    else {
//        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Laptop', null, "", true);
//    }
//});
//function Permanent() {
//    
//    $("#addressForm").removeAttr('disabled');
//    //  $("#Pg_2_text_Homecity").removeAttr('disabled');
//    OBPager.SetTaskContentMemberValue('EquipmentRequestData.ShippingStreetAddress', null, TaskPrefillValues.PrefillValues.Set2.Address, false);
//    OBPager.SetTaskContentMemberValue('EquipmentRequestData.Homecity', null, TaskPrefillValues.PrefillValues.Set2.City, false);
//    OBPager.SetTaskContentMemberValue('EquipmentRequestData.Address.permanent', 1, true, false);
//    OBPager.SetTaskContentMemberValue('EquipmentRequestData.Address.cognizantOffice', 1, "", false);
//    OBPager.SetTaskContentMemberValue('EquipmentRequestData.location', null, -1, true);
//    $("#addressForm").siblings().hide();
//    $("#addressForm").prev().hide();


//}
//function cognizantOffice() {
//    $(".CognizantOffice").show();
//    locationValue = parseInt($('#Location').val());
//    $("#addressForm").attr('disabled', 'disabled');
//    $("#Pg_2_text_Homecity").attr('disabled', 'disabled');
//    OBPager.SetTaskContentMemberValue('EquipmentRequestData.ShippingStreetAddress', null, "", false);
//    OBPager.SetTaskContentMemberValue('EquipmentRequestData.Homecity', null, "", false);
//    OBPager.SetTaskContentMemberValue('EquipmentRequestData.Address.permanent', 1, "", false);
//    OBPager.SetTaskContentMemberValue('EquipmentRequestData.Address.cognizantOffice', 1, true, true);
//    OBPager.SetTaskContentMemberValue('EquipmentRequestData.location', null, locationValue, true);
//    GetLocation();

//}
//$('input[name="choice"]').live("click", function () {
//    var i = $(this).attr('id');
//    if (i == 'yes') {
//        OBPager.SetTaskContentMemberValue('EquipmentRequestData.yes', null, true, false);
//        OBPager.SetTaskContentMemberValue('EquipmentRequestData.No', null, "", true);
//        $('#details').show();
//        validatePortingBlackberry();
//    }
//    if (i == 'no') {
//        OBPager.SetTaskContentMemberValue('EquipmentRequestData.yes', null, "", false);
//        OBPager.SetTaskContentMemberValue('EquipmentRequestData.No', null, true, true);
//        $('#details').hide();
//        clear();
//        ValidatePortingBlackberryNo();
//    }
//});
$('input[name="CurrentCarrier"]').live("click", function () {
    $('input[name="CurrentCarrier"]').each(function () {
        OBPager.SetTaskContentMemberValue($(this).attr('jqxb-datamember'), null, "", false);
    });
    OBPager.SetTaskContentMemberValue($(this).attr('jqxb-datamember'), null, 1, true);
});


function Address() {
    //    if (flag == 1) {
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.Address.NJ', null, "1", false);
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.Address.AZ', null, "", true);
    $('input[name=AZ]').attr('checked', false);
    //    }

    //    else if (flag == 2) {
    //        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Address.NJ', null, 0, true);
    //        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Address.AZ', null, 1, true);        
    //    }
}

function Address1() {
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.Address.NJ', null, "", false);
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.Address.AZ', null, "1", true);
    $('input[name=NJ]').attr('checked', false);
}

function Smartphone(flag) {
    if (flag == 1) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone4S', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone4C', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5S', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS3', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS4', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS5', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote3', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.LGG2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.BlackberryZ10', null, 1, true);
    }
    else if (flag == 2) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.BlackberryZ10', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5C', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5S', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS3', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS4', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS5', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote3', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.LGG2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone4S', null, 1, true);
    }
    else if (flag == 3) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.BlackberryZ10', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone4S', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5C', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5S', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS4', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS5', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote3', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.LGG2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS3', null, 1, true);
    }
    else if (flag == 4) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.BlackberryZ10', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone4S', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS3', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5C', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5S', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS5', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote3', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.LGG2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS4', null, 1, true);
    }
    else if (flag == 5) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.BlackberryZ10', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone4S', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS3', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5S', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS4', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS5', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote3', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.LGG2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5C', null, 1, true);
    }
    else if (flag == 6) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.BlackberryZ10', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone4S', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS3', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5C', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS4', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS5', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote3', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.LGG2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5S', null, 1, true);
    }
    else if (flag == 7) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.BlackberryZ10', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone4S', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS3', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5C', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5S', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS4', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote3', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.LGG2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS5', null, 1, true);
    }
    else if (flag == 8) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.BlackberryZ10', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone4S', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS3', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5C', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5S', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS4', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS5', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.LGG2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote3', null, 1, true);
    }
    else if (flag == 9) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.BlackberryZ10', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone4S', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS3', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5C', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5S', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS4', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS5', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote3', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.LGG2', null, 1, true);
    }
}

function Phone(flag) {
    if (flag == 1) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5C_2', null, "1", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5S_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6P_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS4_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS5_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote3_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote4_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.LG_G3_16GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_32GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_64GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_128GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_32GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_64GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_128GB_2', null, "", true);
        $("#Color1").show();
        $("#Color2").hide();
        $("#Color3").hide();
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Black', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gray', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Silver', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gold', null, "", true);
        if (TaskPrefillValues.PrefillValues.Set4.hideatt == '0') {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.verizon', null, "1", true);
        }
    }
    else if (flag == 2) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5C_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5S_2', null, "1", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6P_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS4_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS5_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote3_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote4_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.LG_G3_16GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_32GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_64GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_128GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_32GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_64GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_128GB_2', null, "", true);
        $("#Color1").hide();
        $("#Color2").show();
        $("#Color3").hide();
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gray', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Silver', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gold', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White1', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Blue', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Green', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Black', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White2', null, "", true);
        if (TaskPrefillValues.PrefillValues.Set4.hideatt == '0') {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.verizon', null, "1", true);
        }
    }
    else if (flag == 3) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5C_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5S_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6_2', null, "1", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6P_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS4_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS5_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote3_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote4_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.LG_G3_16GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_32GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_64GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_128GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_32GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_64GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_128GB_2', null, "", true);
        $("#Color1").hide();
        $("#Color2").show();
        $("#Color3").hide();
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gray', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Silver', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gold', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White1', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Blue', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Green', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Black', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White2', null, "", true);
        if (TaskPrefillValues.PrefillValues.Set4.hideatt == '0') {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.verizon', null, "1", true);
        }
    }
    else if (flag == 4) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5C_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5S_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6P_2', null, "1", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS4_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS5_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote3_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote4_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.LG_G3_16GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_32GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_64GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_128GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_32GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_64GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_128GB_2', null, "", true);
        $("#Color1").hide();
        $("#Color2").show();
        $("#Color3").hide();
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gray', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Silver', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gold', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White1', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Blue', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Green', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Black', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White2', null, "", true);
        if (TaskPrefillValues.PrefillValues.Set4.hideatt == '0') {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.verizon', null, "1", true);
        }
    }
    else if (flag == 5) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5C_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5S_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6P_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS4_2', null, "1", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS5_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote3_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote4_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.LG_G3_16GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_32GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_64GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_128GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_32GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_64GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_128GB_2', null, "", true);
        $("#Color1").hide();
        $("#Color2").hide();
        $("#Color3").show();
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gray', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Silver', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gold', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White1', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Blue', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Green', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Black', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White2', null, "", true);
        if (TaskPrefillValues.PrefillValues.Set4.hideatt == '0') {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.verizon', null, "1", true);
        }
    }
    else if (flag == 6) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5C_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5S_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6P_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS4_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS5_2', null, "1", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote3_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote4_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.LG_G3_16GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_32GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_64GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_128GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_32GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_64GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_128GB_2', null, "", true);
        $("#Color1").hide();
        $("#Color2").hide();
        $("#Color3").show();
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gray', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Silver', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gold', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White1', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Blue', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Green', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Black', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White2', null, "", true);
        if (TaskPrefillValues.PrefillValues.Set4.hideatt == '0') {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.verizon', null, "1", true);
        }
    }
    else if (flag == 7) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5C_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5S_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6P_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS4_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS5_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote3_2', null, "1", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote4_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.LG_G3_16GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_32GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_64GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_128GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_32GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_64GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_128GB_2', null, "", true);
        $("#Color1").hide();
        $("#Color2").hide();
        $("#Color3").show();
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gray', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Silver', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gold', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White1', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Blue', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Green', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Black', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White2', null, "", true);
        if (TaskPrefillValues.PrefillValues.Set4.hideatt == '0') {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.verizon', null, "1", true);
        }
    }
    else if (flag == 8) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5C_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5S_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6P_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS4_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS5_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote3_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote4_2', null, "1", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.LG_G3_16GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_32GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_64GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_128GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_32GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_64GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_128GB_2', null, "", true);
        $("#Color1").hide();
        $("#Color2").hide();
        $("#Color3").show();
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gray', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Silver', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gold', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White1', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Blue', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Green', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Black', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White2', null, "", true);
        if (TaskPrefillValues.PrefillValues.Set4.hideatt == '0') {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.verizon', null, "1", true);
        }
    }
    else if (flag == 9) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5C_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5S_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6P_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS4_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS5_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote3_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote4_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.LG_G3_16GB_2', null, "1", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_32GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_64GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_128GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_32GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_64GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_128GB_2', null, "", true);
        $("#Color1").hide();
        $("#Color2").hide();
        $("#Color3").hide();
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Black', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gray', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Silver', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gold', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White1', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Blue', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Green', null, "", true);
        if (TaskPrefillValues.PrefillValues.Set4.hideatt == '0') {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.verizon', null, "1", true);
        }
    }
    else if (flag == 10) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5C_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5S_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6P_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS4_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS5_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote3_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote4_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.LG_G3_16GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_32GB_2', null, "1", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_64GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_128GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_32GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_64GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_128GB_2', null, "", true);
        $("#Color1").hide();
        $("#Color2").hide();
        $("#Color3").hide();
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Black', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gray', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Silver', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gold', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White1', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Blue', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Green', null, "", true);
        if (TaskPrefillValues.PrefillValues.Set4.hideatt == '0') {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.verizon', null, "1", true);
        }
    }
    else if (flag == 11) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5C_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5S_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6P_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS4_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS5_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote3_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote4_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.LG_G3_16GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_32GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_64GB_2', null, "1", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_128GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_32GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_64GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_128GB_2', null, "", true);
        $("#Color1").hide();
        $("#Color2").hide();
        $("#Color3").hide();
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Black', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gray', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Silver', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gold', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White1', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Blue', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Green', null, "", true);
        if (TaskPrefillValues.PrefillValues.Set4.hideatt == '0') {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.verizon', null, "1", true);
        }
    }
    else if (flag == 12) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5C_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5S_2', null, "", false); 
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6P_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS4_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS5_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote3_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote4_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.LG_G3_16GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_32GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_64GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_128GB_2', null, "1", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_32GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_64GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_128GB_2', null, "", true);
        $("#Color1").hide();
        $("#Color2").hide();
        $("#Color3").hide();
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Black', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gray', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Silver', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gold', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White1', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Blue', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Green', null, "", true);
        if (TaskPrefillValues.PrefillValues.Set4.hideatt == '0') {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.verizon', null, "1", true);
        }
    }
    else if (flag == 13) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5C_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5S_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6P_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS4_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS5_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote3_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote4_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.LG_G3_16GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_32GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_64GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_128GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_32GB_2', null, "1", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_64GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_128GB_2', null, "", true);
        $("#Color1").hide();
        $("#Color2").hide();
        $("#Color3").hide();
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Black', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gray', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Silver', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gold', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White1', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Blue', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Green', null, "", true);
        if (TaskPrefillValues.PrefillValues.Set4.hideatt == '0') {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.verizon', null,"1", true);
        }
    }
    else if (flag == 14) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5C_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5S_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6P_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS4_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS5_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote3_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote4_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.LG_G3_16GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_32GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_64GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_128GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_32GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_64GB_2', null, "1", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_128GB_2', null, "", true);
        $("#Color1").hide();
        $("#Color2").hide();
        $("#Color3").hide();
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Black', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gray', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Silver', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gold', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White1', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Blue', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Green', null, "", true);
        if (TaskPrefillValues.PrefillValues.Set4.hideatt == '0') {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.verizon', null, "1", true);
        }
    }
    else if (flag == 15) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5C_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5S_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6P_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS4_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS5_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote3_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote4_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.LG_G3_16GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_32GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_64GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6_128GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_32GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_64GB_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Samsung_S6edge_128GB_2', null, "1", true);
        $("#Color1").hide();
        $("#Color2").hide();
        $("#Color3").hide();
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Black', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gray', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Silver', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gold', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White1', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Blue', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Green', null, "", true);
        if (TaskPrefillValues.PrefillValues.Set4.hideatt == '0') {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.verizon', null, "1", true);
        }
    }
}


function EnableColor1(flag) {
    if (flag == 1) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White1', null, "1", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Blue', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Green', null, "", true);
    }
    else if (flag == 2) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White1', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Blue', null, "1", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Green', null, "", true);
    }
    else if (flag == 3) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White1', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Blue', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Green', null, "1", true);
    }
}

function EnableColor2(flag) {
    if (flag == 1) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gray', null, "1", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Silver', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gold', null, "", true);
    }
    else if (flag == 2) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gray', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Silver', null, "1", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gold', null, "", true);
    }
    else if (flag == 3) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gray', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Silver', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Gold', null, "1", true);
    }
}

function EnableColor3(flag) {
    if (flag == 1) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Black', null, "1", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White2', null, "", true);
    }
    else if (flag == 2) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Black', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.White2', null, "1", true);
    }
}

function EnableCarrier(flag) {
    if (flag == 1) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.atandt', null, "1", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.verizon', null, "", true);
        //        $("#SmartPhones_2").show();
        $(".att").show();
        $(".ver").hide();
        $(".ver_new").hide();
        $(".oldphone_model").show();
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5C_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5S_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6P_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS5_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote3_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote4_2', null, "", true);
        $("#Color1").hide();
        $("#Color2").hide();
        $("#Color3").hide();
    }
    else if (flag == 2) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.atandt', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.verizon', null, "1", true);
        //        $("#SmartPhones_2").show();
        $(".att").hide();
        if (TaskPrefillValues.PrefillValues.Set4.hideatt == '0') {
            $(".ver_new").show();
            $(".ver").hide();
            $(".oldphone_model").hide();
        }
        else if (TaskPrefillValues.PrefillValues.Set4.hideatt == '1') {
            $(".ver_new").hide();
            $(".ver").show();
            $(".oldphone_model").show();
        }
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5C_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5S_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone6P_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS5_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote3_2', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote4_2', null, "", true);
        $("#Color1").hide();
        $("#Color2").hide();
        $("#Color3").hide();
    }
}

function EnableAck() {
    if ($('#Pg_1_check_ack').is(':checked') == true) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Acknowledge', null, "true", false);
    }
    else {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Acknowledge', null, "", false);
    }
}


//function clear() {

////    OBPager.SetTaskContentMemberValue('EquipmentRequestData.ATT', null, "", false);
////    OBPager.SetTaskContentMemberValue('EquipmentRequestData.Sprint', null, "", false);
////    OBPager.SetTaskContentMemberValue('EquipmentRequestData.TMobile', null, "", false);
////    OBPager.SetTaskContentMemberValue('EquipmentRequestData.verizon', null, "", false);
////    OBPager.SetTaskContentMemberValue('EquipmentRequestData.Others', null, "", false);
////    OBPager.SetTaskContentMemberValue('EquipmentRequestData.CurrentMobileNumber', null, "", false);
////    OBPager.SetTaskContentMemberValue('EquipmentRequestData.DeviceModel', null, "", false);
////    OBPager.SetTaskContentMemberValue('EquipmentRequestData.AccountNumber', null, "", false);
////    OBPager.SetTaskContentMemberValue('EquipmentRequestData.NameoftheAccount', null, "", false);
////    OBPager.SetTaskContentMemberValue('EquipmentRequestData.HomeAddress', null, "", false);
////    OBPager.SetTaskContentMemberValue('EquipmentRequestData.ShippingStreetAddress', null, "", false);
////    OBPager.SetTaskContentMemberValue('EquipmentRequestData.PortBillingAddress', null, "", false);
////    OBPager.SetTaskContentMemberValue('EquipmentRequestData.PortPortingNumber', null, "", false);
////    OBPager.SetTaskContentMemberValue('EquipmentRequestData.PortWirelessProvider', null, "", false);
////    OBPager.SetTaskContentMemberValue('EquipmentRequestData.PortPassword', null, "", false);
////    OBPager.SetTaskContentMemberValue('EquipmentRequestData.PortAccountNumber', null, "", false);
////    OBPager.SetTaskContentMemberValue('EquipmentRequestData.PortStatus', null, "", false);    
////    OBPager.SetTaskContentMemberValue('EquipmentRequestData.HomeAddress', null, TaskPrefillValues.PrefillValues.Set2.Address, false);
////    OBPager.SetTaskContentMemberValue('EquipmentRequestData.Homecity', null, TaskPrefillValues.PrefillValues.Set2.City, false);
////    OBPager.SetTaskContentMemberValue('EquipmentRequestData.Password', null, "", false);
////    OBPager.SetTaskContentMemberValue('EquipmentRequestData.BlackberryZ10', null, "", false);
////    OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone4S', null, "", false);
////    OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS3', null, "", false);
////    OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS4', null, "", false);
////    OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5C', null, "", false);
////    OBPager.SetTaskContentMemberValue('EquipmentRequestData.iPhone5S', null, "", false);
////    OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungS5', null, "", false);
//    //    OBPager.SetTaskContentMemberValue('EquipmentRequestData.SamsungNote3', null, "", true);
//    jQXB.setDataSource(OBPager.taskContentDSName, FormDetails, true).doBind(OBPager.taskContentDSName);
//}
function SaveTaskData(saveMode) {
    // saveMode { 0:Save, 1:Submit }
    if (saveMode == 1) {
        if (validate.ValidateSubmit() == true) {
            if (OBPager.ValidateTaskData(saveMode) == true) {
                try {
                    //                    if (JSON.parse(OBPager.strTaskPrefillValues).PrefillValues.Set1.CanConfirmOnSubmit != 0) {
                    //                        MsgboxConfirm(sessionId, 6, 215, 'FORM_ONSUBMIT_CNFRM_NA', "Please verify the details before you submit.<br> To edit information, please make the modifications in personal data form and submit the personal data form for the changes to reflect in this form. Please remember to save and submit this form after verifying the details.", callback);
                    //                    }
                    //                    else {
                    if (OBPager.SaveTaskData(saveMode) == true) {
                        return true;
                    }
                    else {
                        return false;
                    }
                    //                    }
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
    /*Added 312539 : SaveMode 3 RC confirm the ER Request we send mail to NSS Manager */
    else if (saveMode == 3) {
        if (validate.ValidateSubmit() == true) {
            if (OBPager.ValidateTaskData(saveMode) == true) {
                try {
                    if (saveMode == 3) {
                        ConfirmERProcess(saveMode);
                        SaveConfirmationERprocess();
                        //alert('Task saved successfully');
                        return true;

                    }
                    else {
                        // alert('Error occured while saving the task');
                        MsgboxInfo('Error occured while saving the task');
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
                // alert('Error occured while saving the task');
                //                MsgboxInfo('Error occured while saving the task')
                //                return false;
            }
        }
        catch (e) {
            alert(e.Message);
        }
    }


}

$(".Mobile").keydown(function (event) {
    var obj = $(this).attr("id");
    var th = $("#" + obj).val().length;
    var p = $("#" + obj).val();
    if (th < 14) {
        if (event.keyCode == 8) {
        }
        else {
            if (th == 3) {
                $("#" + obj).val('(' + p + ')');
            }
            if (th == 8) {
                $("#" + obj).val(p + '-');
            }
        }
    }
});

function validatePortingBlackberry() {

    $('#Porting_Billing_Name').addClass('textMandatory');
    $('#Porting_Billing_Address').addClass('textMandatory');
    $('#Porting_PhoneNumber').addClass('textMandatory');

    if (TaskPrefillValues.PrefillValues.Set4.Checking_new == '1') {
        $('#Porting_Wireless_provider').addClass('textMandatory');
    }
    if (TaskPrefillValues.PrefillValues.Set4.Checking_new == '0') {
        $('#PortWirelessProvider_new').addClass('dropdown');
    }
    if (TaskPrefillValues.PrefillValues.Set4.hideatt == '1') {
        $('#Porting_Wireless_provider').removeClass('textMandatory');
        $('#PortWirelessProvider_new').addClass('dropdown');
    }
    if (TaskPrefillValues.PrefillValues.Set4.hideatt == '0') {
        $('#PortWirelessProvider_new').removeClass('dropdown');
        $('#Porting_Wireless_provider').addClass('textMandatory');
    }
    $('#Porting_Password').addClass('textMandatory');
    $('#Porting_AccountNumber').addClass('textMandatory');
    $('.textMandatory').change(validate.textMandatory);
}
function ValidatePortingBlackberryNo() {
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.PortBillingName', null, "", false);
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.PortBillingAddress', null, "", false);
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.PortPortingNumber', null, "", false);
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.PortWirelessProvider', null, "", false);
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.PortPassword', null, "", false);
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.PortAccountNumber', null, "", true);
    $('#Porting_Billing_Name').removeClass('textMandatory');
    $('#Porting_Billing_Address').removeClass('textMandatory');
    $('#Porting_PhoneNumber').removeClass('textMandatory');

    if (TaskPrefillValues.PrefillValues.Set4.Checking_new == '1') {
        $('#Porting_Wireless_provider').removeClass('textMandatory');
    }
    if (TaskPrefillValues.PrefillValues.Set4.Checking_new == '0') {
        $('#PortWirelessProvider_new').removeClass('dropdown');
    }
    if (TaskPrefillValues.PrefillValues.Set4.hideatt == '0') {
        $('#Porting_Wireless_provider').removeClass('textMandatory');
    }
    $('#Porting_Password').removeClass('textMandatory');
    $('#Porting_AccountNumber').removeClass('textMandatory');
    $('#details').find('.alert_f').remove();
    $('#details').find('.alert_f_text').remove();
}
function ResetTaskData() {
    OBPager.ResetTaskContent();
    //    if ($('input[name="Pg_2_rdbtn_Blackberry_Z10"]:checked').length == 1) {
    //        $("#Port_div").show();
    //        //        if ($('#yes:checked').length == 1) {
    //        //            $("#details").show();
    //        validatePortingBlackberry();
    //        //        }
    //    }
    //    else {
    //        $("#Port_div").hide();
    //        validatePortingBlackberry();
    //    }
    //    if ($('input[name="CellPhone"]:checked').length == 1) {
    //        $("#conformation").hide();
    //        $("#details").hide();
    //        ValidatePortingBlackberryNo();
    //    }

    //    if ($('input[name="Address"]:checked').length == 0) {
    //        $('#Pg_2_text_Homecity').attr('disabled', false);
    //        $('#addressForm').attr('disabled', false);
    //        $('.CognizantOffice').hide();
    //    }
    //    if ($('input[name="Address"]:checked').length == 1) {
    //        $('#Pg_2_text_Homecity').attr('disabled', false);
    //        $('#addressForm').attr('disabled', false);
    //        $('.CognizantOffice').hide();
    //    }
    //    if ($('input[name="cognizantOffice"]:checked').length == 1) {
    //        $('#Pg_2_text_Homecity').attr('disabled', true);
    //        $('#addressForm').attr('disabled', true);
    //        $('.CognizantOffice').show();

    //    }
    if (OBPager.taskStatusFlag == -1) {
        $("#Pg_2_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
        $("#Pg_2_text_AssociateId").val(TaskPrefillValues.PrefillValues.Set1.AssociateId);
        $("#Pg_2_text_DOJ").val(TaskPrefillValues.PrefillValues.Set2.DOJ);
        $("#Pg_2_text_RecruiterId").val(TaskPrefillValues.PrefillValues.Set2.RecruiterId);
        $("#Pg_2_text_level").val(TaskPrefillValues.PrefillValues.Set1.DesignationDesc);
        $("#Pg_2_text_TelNo").val(TaskPrefillValues.PrefillValues.Set2.MobilePhone);
        $("#Pg_2_text_mailid").val(TaskPrefillValues.PrefillValues.Set2.PersonalEmail);
        //        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Address.permanent', 1, true, false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.HomeAddress', null, TaskPrefillValues.PrefillValues.Set2.Address, false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Homecity', null, TaskPrefillValues.PrefillValues.Set2.City, false);
        //OBPager.SetTaskContentMemberValue('EquipmentRequestData.Laptop', null, true, true);
        //        if (((TaskPrefillValues.PrefillValues.Set1.Score) > 35) && ((TaskPrefillValues.PrefillValues.Set1.Jobcode).indexOf('CF') == -1) && ((TaskPrefillValues.PrefillValues.Set1.Jobcode).indexOf('BC') == -1)) {
        //            OBPager.SetTaskContentMemberValue('EquipmentRequestData.Laptop', null, "", false);
        //        }
        //        else {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Laptop', null, "1", false);
        //        }
        $("#Porting_Billing_Name").val("");
        $("#Porting_Billing_Address").val("");
        $("#Porting_PhoneNumber").val("");
        $("#Porting_Wireless_provider").val("");
        $("#Porting_Password").val("");
        $("#Porting_AccountNumber").val("");
        ValidatePortingBlackberryNo();
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.PortStatus', null, 0, true);
        $('#Port_DPlus_chkbx').prop('checked', false);
        $('#Pg_2_text_Laptop_X250').prop('checked', false);
        $('#Pg_2_text_Laptop_T450').prop('checked', false);
        
        //            if ($('input[name="Pg_2_rdbtn_Blackberry_Z10"]:checked').length == 1) {
        //                $("#Port_div").show();
        //                validatePortingBlackberry();
        //            }
        //            else {
        //                $("#Port_div").hide();
        //                validatePortingBlackberry();
        //            }
        $('#Pg_1_check_ack').prop('checked', false);
        //        $("#Port_chk").hide();
        $("#Port_div").hide();
        $(".ver").hide();
        $(".ver_new").hide();
        $(".att").hide();
        $(".newPrice2015").show();
        if ($('#Radio1').is(':checked') == true) {
            $('#Color1').show();
        }
        else {
            $('#Color1').hide();
        }

        if ($('#Radio2').is(':checked') == true || $('#Radio4').is(':checked') == true || $('#Radio4').is(':checked') == true) {
            $('#Color2').show();
        }
        else {
            $('#Color2').hide();
        }

        if ($('#Radio5').is(':checked') == true || $('#Radio6').is(':checked') == true
            || $('#Radio7').is(':checked') == true || $('#Radio8').is(':checked') == true) {
            $('#Color3').show();
        }
        else {
            $('#Color3').hide();
        }

        jQXB.doBind(OBPager.taskContentDSName);

    }
}

//$('#Location').live("change", function () {
//    GetLocation();
//});

//function GetLocation() {

//    var addressVal = "";
//    var CityVal = "";
//    var Location = $("#Location").val();
//    /* To get address based on location */
//    OBPager.GetGeographyMaster(15, Location, "LocationData");
//    if (jQXB.getDataSource("LocationData") != null && jQXB.getDataSource("LocationData") != "") {
//        addressVal = jQXB.getDataSource("LocationData")[0].Description.toString();
//    }
//    $("#addressForm").val(addressVal);
//    var addressval = $('#addressForm').val();
//    OBPager.SetTaskContentMemberValue('EquipmentRequestData.ShippingStreetAddress', null, addressval, false);
//    /* To get stateid/zipcod based on location*/
//    OBPager.GetGeographyMaster(20, Location, "CityData");
//    if (jQXB.getDataSource("CityData") != null && jQXB.getDataSource("CityData") != "") {
//        CityVal = jQXB.getDataSource("CityData")[0].Description.toString();
//    }
//    $("#Pg_2_text_Homecity").val(CityVal);
//    var cityval = $('#Pg_2_text_Homecity').val();
//    OBPager.SetTaskContentMemberValue('EquipmentRequestData.Homecity', null, cityval, false);
//}

/* Confirm ER process */
function ConfirmERProcess(saveMode) {
    var retTaskStatus = 0;
    var isTaskSignedOnAllPage = false;
    confirmErprocess = saveMode;
    try {
        if (OBPager.taskErrorFlag != 0) {
            MsgboxAlert(sessionId, 2, 0, null, 'Task saving failed due to validation');
            return false;
        }
        else {
            /* If form is getting submitted then check all validations */
            if (saveMode == 3) {
                isTaskSignedOnAllPage = OBPager.CheckSignOnAllPage();
                if (isTaskSignedOnAllPage == false) {
                    return false;
                }
            }

            var taskdata = JSON.stringify(jQXB.getDataSource(OBPager.taskContentDSName)).toString();
            taskdata = taskdata.replace(/\\n/g, " ");
            taskdata = taskdata.replace(/\\/g, "\\\\");
            taskdata = taskdata.replace(/'/g, "\\\'")
            var signData = '';

            if ($(OBPager.signatureDOM) != null) {
                signData = OBPager.getXmlStringFromDOM(OBPager.signatureDOM);
                signData = signData.replace(/'/g, "\\\'");
                OBPager.strResetSignatureDetails = OBPager.getXmlStringFromDOM(OBPager.signatureDOM);
            }

            var data = "{";
            data += "'sessionId':" + OBPager.sessionId.toString() + ",";
            data += "'candidateId':" + OBPager.candidateId.toString() + ",";
            data += "'taskId':" + OBPager.taskId.toString() + ",";
            data += "'taskData':'" + taskdata + "',";
            data += "'signatureData':'" + signData + "',";
            data += "'lastViewPage':" + OBPager.displayPageCount.toString() + ",";
            data += "'saveMode':" + 1 + "";
            data += "}";

            $.ajax({
                type: "post",
                async: false,
                url: "../../../../FormsService.aspx/SaveTaskData",
                data: data,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    retTaskStatus = msg.d;
                },
                error: function (xhr, status, textRemarks) { alert("Error " + xhr.status + " " + textRemarks); }
            });
        }
    }
    catch (e) {
        MsgboxAlert(sessionId, 2, 0, null, e.Message);
    }
    if (retTaskStatus == 1) {
        OBPager.strFormDetails = taskdata;
        if (saveMode == 1) {
            $('#btnResetTask').css('visibility', 'hidden'); // Hide Reset button 
            $('#btnSaveTask').css('visibility', 'hidden'); // Hide Save button 
            if (saveMode == 1 && (OBPager.isPDFEnable == 1 || OBPager.isPDFEnable.toString() == 'NaN')) {
                $('#previewForm').show();
                $('#printerForm').show();
                $('#pdfForm').show();
            }
        }
        if (saveMode == 0) {
            OBPager.taskStatusFlag = 0;
            MsgboxAlert(sessionId, 1, 41, 'FORM_SAVE_SUCCESS', 'Form saved successfully!!!');
        }
        else if (saveMode == 3 && TaskPrefillValues.PrefillValues.Set1.CandidateGroup != 2) {
            if (OBPager.PDFFlag == 0) {
                MsgboxAlert(sessionId, 1, 39, 'FORM_SUBMIT_SUCCESS', 'Form submitted successfully!!!');
            }

            else if (OBPager.PDFFlag == 1) {
                alert("Form submitted successfully!!");
            }
            OBPager.taskStatusFlag = 1;
            OBPager.taskSubmittedFlag = 1;
        }
        return true;
    }
    else {
        if (saveMode == 0)
            MsgboxAlert(sessionId, 2, 42, 'FORM_SAVE_FAILED', 'Form saving failed!!!');
        else if (saveMode == 3)
            if (OBPager.PDFFlag == 0) {
                MsgboxAlert(sessionId, 2, 40, 'FORM_SUBMIT_FAILED', 'Form submission failed!!!');
            }
            else if (OBPager.PDFFlag == 1) {
                alert("Form submission failed!!!");
            }
        return false;
    }
}

function SaveConfirmationERprocess() {
    var retTaskStatus = 0;
    var erprocess = 0;
    var data = "{";
    data += "'sessionId':" + OBPager.sessionId.toString() + ",";
    data += "'candidateId':" + OBPager.candidateId.toString() + ",";
    data += "'taskId':" + OBPager.taskId.toString() + ",";
    data += "'saveMode':" + confirmErprocess + ",";
    data += "'erprocess':" + erprocess + "";
    data += "}";

    $.ajax({
        type: "post",
        async: false,
        url: "../../../../DashboardService.aspx/SaveConfirmationERprocess",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            retTaskStatus = msg.d;
        },
        error: function (xhr, status, textRemarks) { alert("Error " + xhr.status + " " + textRemarks); }
    });

}
if (parseInt(qs["opmde"]) != null) {
    openMode = parseInt(qs["opmde"]);
}

//if (openMode != 1) {
//    window.onload = function () {
//        MsgboxAlert(sessionId, 4, 213, 'FORM_POPUP_ONPAGELOAD_NA', "<p style=line-height:20px;><span style=color:red;>Please note:</span><span> To edit information in this form,<br/> please make the modifications in personal data form and submit the personal data form for the changes to reflect in this form. Please remember to save and submit this form after verifying the details.</span></p>");
//    }
//}
function callback(value) {
    try {
        if (value) {
            if (OBPager.SaveTaskData(1) == true) {
                return true;
            }
        }
        else {
            return false;
        }
    }
    catch (e) { }
}

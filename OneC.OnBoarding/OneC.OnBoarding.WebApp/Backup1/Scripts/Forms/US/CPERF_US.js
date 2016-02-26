var flag = 0;
var locationValue;
var confirmErprocess = 0;
$().ready(function () {

    if ((TaskPrefillValues.PrefillValues.Set1.Jobcode).indexOf('CF') != -1) {
        if ((TaskPrefillValues.PrefillValues.Set1.Score) > 35) {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.Laptop', null, true, true);
            $("#Pg_2_text_Laptop").attr('disabled', 'disabled');
            $('.disablecellphone').hide();
            $('.disableblackberry').hide();
        }
        else if ((TaskPrefillValues.PrefillValues.Set1.Score <= 35) && (TaskPrefillValues.PrefillValues.Set1.Score > 25)) {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.Laptop', null, true, true);
            $("#Pg_2_text_Laptop").attr('disabled', 'disabled');
            $("#conformation").remove();
        } else if ((TaskPrefillValues.PrefillValues.Set1.Score) <= 25) {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.Laptop', null, true, true);
            $("#Pg_2_text_Laptop").attr('disabled', 'disabled');
        }
    }
    else if ((TaskPrefillValues.PrefillValues.Set1.Jobcode).indexOf('BC') != -1) {
        if ((TaskPrefillValues.PrefillValues.Set1.Score) > 45) {
            $('.disableassets').hide();
        }
        else if ((TaskPrefillValues.PrefillValues.Set1.Score > 35) && (TaskPrefillValues.PrefillValues.Set1.Score <= 45)) {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.Laptop', null, true, true);
            $("#Pg_2_text_Laptop").attr('disabled', 'disabled');
            $('.disablecellphone').hide();
            $('.disableblackberry').hide();
        }
        else if ((TaskPrefillValues.PrefillValues.Set1.Score <= 35) && (TaskPrefillValues.PrefillValues.Set1.Score > 25)) {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.Laptop', null, true, true);
            $("#Pg_2_text_Laptop").attr('disabled', 'disabled');
            $("#conformation").remove();
        } else if ((TaskPrefillValues.PrefillValues.Set1.Score) <= 25) {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.Laptop', null, true, true);
            $("#Pg_2_text_Laptop").attr('disabled', 'disabled');
        }
    }
    else {
        if ((TaskPrefillValues.PrefillValues.Set1.Score) > 35) {
            $('.disableassets').hide();
        }
        else if ((TaskPrefillValues.PrefillValues.Set1.Score <= 35) && (TaskPrefillValues.PrefillValues.Set1.Score > 25)) {
            $("#conformation").remove();
        } else if ((TaskPrefillValues.PrefillValues.Set1.Score) <= 25) {
        }
    }
    /* Added 312539  the candidate submitted ER form block the submitt button */
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

    OBPager.GetMaster(58, "LocationCity");
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

    if ($('input[name="Pg_2_text_BlackBerry"]:checked').length == 0) {

        $("#conformation").hide();
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.yes', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.No', null, "", true);
    }
    else {

        $("#conformation").show();
        if ($('#yes:checked').length == 1) {

            $("#details").show();
        }

    }
    if ($('input[name="cognizantOffice"]:checked').length == 1) {
        $("#addressForm").attr('disabled', 'disabled');
        $("#Pg_2_text_Shippingcity").attr('disabled', 'disabled');
    }

    $("#Pg_2_text_BlackBerry").live("click", function () {
        if ($('input[name="Pg_2_text_BlackBerry"]:checked').length == 1) {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.Blackberry', null, true, false);
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.Cellphone', null, "", true);

            $("#conformation").show();
        }
        else {

            OBPager.SetTaskContentMemberValue('EquipmentRequestData.yes', null, "", false);
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.No', null, "", false);
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.Blackberry', null, "", false);
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.Cellphone', null, "", true);
            $("#conformation").hide();
            $("#details").hide();
            clear();
        }

    });

    $('#Pg_2_text_Laptop').live("click", function () {

        if ($('input[name="Laptop"]:checked').length == 1) {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.Laptop', null, true, true);
        }
        else {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.Laptop', null, "", true);
        }
    });

    $("#Pg_2_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_2_text_AssociateId").val(TaskPrefillValues.PrefillValues.Set1.AssociateId);
    $("#Pg_2_text_DOJ").val(TaskPrefillValues.PrefillValues.Set2.DOJ);
    $("#Pg_2_text_RecruiterId").val(TaskPrefillValues.PrefillValues.Set2.RecruiterId);
    $("#Pg_2_text_level").val(TaskPrefillValues.PrefillValues.Set1.DesignationDesc);
    $("#Pg_2_text_TelNo").val(TaskPrefillValues.PrefillValues.Set2.MobilePhone);
    $("#Pg_2_text_mailid").val(TaskPrefillValues.PrefillValues.Set2.PersonalEmail);
    OBPager.ShowPage(1);
    if (OBPager.taskStatusFlag == "-1") {

        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Address.permanent', 1, true, false);

        if (((TaskPrefillValues.PrefillValues.Set1.Score) > 35) && ((TaskPrefillValues.PrefillValues.Set1.Jobcode).indexOf('CF') == -1) && ((TaskPrefillValues.PrefillValues.Set1.Jobcode).indexOf('BC') == -1)) {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.Laptop', null, "", false);
        }
        else {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.Laptop', null, true, false);
        }
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Cellphone', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Blackberry', null, "", true);
        Permanent();
    }
    if (OBPager.taskStatusFlag == 1) {
        //$('.disable').find('input').attr('disabled', true);
        $('.equipment').attr('disabled', true);
        $('.collapses').attr('disabled', false);
    }

    if ($('input[name="cognizantOffice"]:checked').length == 1) {
        $(".CognizantOffice").show();
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Address.permanent', 1, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Address.cognizantOffice', 1, true, true);
    }
    else {
        $(".CognizantOffice").hide();
        locationValue = parseInt($('#Location').val());
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Address.permanent', 1, true, false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Address.cognizantOffice', 1, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.location', null, -1, true);

    }
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

});
$("#Pg_2_text_BlackBerry").live("click", function () {
    if ($('input[name="Pg_2_text_BlackBerry"]:checked').length == 1) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Blackberry', null, true, false);

        $("#conformation").show();
    }
    else {

        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Blackberry', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.yes', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.No', null, "", false);

        $("#conformation").hide();
        $("#details").hide();
        clear();
        ValidatePortingBlackberryNo();
    }
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.Cellphone', null, "", true);

});
$('#Pg_2_text_Cellphone').live("click", function () {
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.Blackberry', null, "", false);
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.yes', null, "", false);
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.No', null, "", false);
    if ($('input[name="CellPhone"]:checked').length == 1) {
        $("#conformation").hide();
        $("#details").hide();
        clear();
        ValidatePortingBlackberryNo();
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Cellphone', null, true, true);
    }
    else {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Cellphone', null, "", true);
    }
});
$('#Pg_2_text_Laptop').live("click", function () {

    if ($('input[name="Laptop"]:checked').length == 1) {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Laptop', null, true, true);
    }
    else {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Laptop', null, "", true);
    }
});
function Permanent() {
    $(".CognizantOffice").hide();
    $("#addressForm").removeAttr('disabled');
  //  $("#Pg_2_text_Shippingcity").removeAttr('disabled');
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.ShippingStreetAddress', null, TaskPrefillValues.PrefillValues.Set2.Address, false);
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.Shippingcity', null, TaskPrefillValues.PrefillValues.Set2.City, false);
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.Address.permanent', 1, true, false);
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.Address.cognizantOffice', 1, "", false);
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.location', null, -1, true);
    $("#addressForm").siblings().hide();
    $("#addressForm").prev().hide();


}
function cognizantOffice() {
    $(".CognizantOffice").show();
    locationValue = parseInt($('#Location').val());
    $("#addressForm").attr('disabled', 'disabled');
    $("#Pg_2_text_Shippingcity").attr('disabled', 'disabled');
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.ShippingStreetAddress', null, "", false);
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.Shippingcity', null, "", false);
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.Address.permanent', 1, "", false);
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.Address.cognizantOffice', 1, true, true);
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.location', null, locationValue, true);
    GetLocation();

}
$('input[name="choice"]').live("click", function () {
    var i = $(this).attr('id');
    if (i == 'yes') {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.yes', null, true, false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.No', null, "", true);
        $('#details').show();
        validatePortingBlackberry();
    }
    if (i == 'no') {
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.yes', null, "", false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.No', null, true, true);
        $('#details').hide();
        clear();
        ValidatePortingBlackberryNo();
    }
});
$('input[name="CurrentCarrier"]').live("click", function () {
    $('input[name="CurrentCarrier"]').each(function () {
        OBPager.SetTaskContentMemberValue($(this).attr('jqxb-datamember'), null, '', false);
    });
    OBPager.SetTaskContentMemberValue($(this).attr('jqxb-datamember'), null, true, true);
});

function clear() {

    OBPager.SetTaskContentMemberValue('EquipmentRequestData.ATT', null, "", false);
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.Sprint', null, "", false);
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.TMobile', null, "", false);
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.verizon', null, "", false);
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.Others', null, "", false);
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.CurrentMobileNumber', null, "", false);
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.DeviceModel', null, "", false);
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.AccountNumber', null, "", false);
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.NameoftheAccount', null, "", false);
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.Streetaddress', null, "", false);
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.City', null, "", false);
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.Password', null, "", true);
}
function SaveTaskData(saveMode) {
    // saveMode { 0:Save, 1:Submit }
    if (saveMode == 1) {
        if (validate.ValidateSubmit() == true) {
            if (OBPager.ValidateTaskData(saveMode) == true) {
                try {
                    if (JSON.parse(OBPager.strTaskPrefillValues).PrefillValues.Set1.CanConfirmOnSubmit != 0) {
                        MsgboxConfirm(sessionId, 6, 215, 'FORM_ONSUBMIT_CNFRM_NA', "Please verify the details before you submit.<br> To edit information, please make the modifications in personal data form and submit the personal data form for the changes to reflect in this form. Please remember to save and submit this form after verifying the details.", callback);
                    }
                    else {
                        if (OBPager.SaveTaskData(saveMode) == true) {
                            return true;
                        }
                        else {
                            return false;
                        }
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

    $('#mobilePhone').addClass('textMandatory');
    $('#DeviceModel').addClass('textMandatory');
    $('#Accountnumber').addClass('textMandatory');
    $('#AccountName').addClass('textMandatory');
    $('#Streetaddress').addClass('Alphanumeric');
    $('#usercity').addClass('Alphanumeric');
    $('.textMandatory').change(validate.textMandatory);
}
function ValidatePortingBlackberryNo() {

    $('#mobilePhone').removeClass('textMandatory');
    $('#DeviceModel').removeClass('textMandatory');
    $('#Accountnumber').removeClass('textMandatory');
    $('#AccountName').removeClass('textMandatory');
    $('#usercity').removeClass('Alphanumeric');
    $('#Streetaddress').removeClass('Alphanumeric');
    $('#details').find('.alert_f').remove();
    $('#details').find('.alert_f_text').remove();
}
function ResetTaskData() {
    OBPager.ResetTaskContent();
    if ($('input[name="Pg_2_text_BlackBerry"]:checked').length == 1) {
        $("#conformation").show();
        if ($('#yes:checked').length == 1) {
            $("#details").show();
            validatePortingBlackberry();
        }
    }
    if ($('input[name="CellPhone"]:checked').length == 1) {
        $("#conformation").hide();
        $("#details").hide();
        ValidatePortingBlackberryNo()
    }

    if ($('input[name="Address"]:checked').length == 0) {
        $('#Pg_2_text_Shippingcity').attr('disabled', false);
        $('#addressForm').attr('disabled', false);
        $('.CognizantOffice').hide();
    }
    if ($('input[name="Address"]:checked').length == 1) {
        $('#Pg_2_text_Shippingcity').attr('disabled', false);
        $('#addressForm').attr('disabled', false);
        $('.CognizantOffice').hide();
    }
    if ($('input[name="cognizantOffice"]:checked').length == 1) {
        $('#Pg_2_text_Shippingcity').attr('disabled', true);
        $('#addressForm').attr('disabled', true);
        $('.CognizantOffice').show();

    }
    if (OBPager.taskStatusFlag == -1) {
        $("#Pg_2_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
        $("#Pg_2_text_AssociateId").val(TaskPrefillValues.PrefillValues.Set1.AssociateId);
        $("#Pg_2_text_DOJ").val(TaskPrefillValues.PrefillValues.Set2.DOJ);
        $("#Pg_2_text_RecruiterId").val(TaskPrefillValues.PrefillValues.Set2.RecruiterId);
        $("#Pg_2_text_level").val(TaskPrefillValues.PrefillValues.Set1.DesignationDesc);
        $("#Pg_2_text_TelNo").val(TaskPrefillValues.PrefillValues.Set2.MobilePhone);
        $("#Pg_2_text_mailid").val(TaskPrefillValues.PrefillValues.Set2.PersonalEmail);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Address.permanent', 1, true, false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.ShippingStreetAddress', null, TaskPrefillValues.PrefillValues.Set2.Address, false);
        OBPager.SetTaskContentMemberValue('EquipmentRequestData.Shippingcity', null, TaskPrefillValues.PrefillValues.Set2.City, false);
        //OBPager.SetTaskContentMemberValue('EquipmentRequestData.Laptop', null, true, true);
        if (((TaskPrefillValues.PrefillValues.Set1.Score) > 35) && ((TaskPrefillValues.PrefillValues.Set1.Jobcode).indexOf('CF') == -1) && ((TaskPrefillValues.PrefillValues.Set1.Jobcode).indexOf('BC') == -1)) {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.Laptop', null, "", false);
        }
        else {
            OBPager.SetTaskContentMemberValue('EquipmentRequestData.Laptop', null, true, false);
        }
        $("#conformation").hide();
        $("#details").hide();
        jQXB.doBind(OBPager.taskContentDSName);

    }
}

$('#Location').live("change", function () {
    GetLocation();
});

function GetLocation() {

    var addressVal = "";
    var CityVal = "";
    var Location = $("#Location").val();
    /* To get address based on location */
    OBPager.GetGeographyMaster(15, Location, "LocationData");
    if (jQXB.getDataSource("LocationData") != null && jQXB.getDataSource("LocationData") != "") {
        addressVal = jQXB.getDataSource("LocationData")[0].Description.toString();
    }
    $("#addressForm").val(addressVal);
    var addressval = $('#addressForm').val();
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.ShippingStreetAddress', null, addressval, false);
    /* To get stateid/zipcod based on location*/
    OBPager.GetGeographyMaster(20, Location, "CityData");
    if (jQXB.getDataSource("CityData") != null && jQXB.getDataSource("CityData") != "") {
        CityVal = jQXB.getDataSource("CityData")[0].Description.toString();
    }
    $("#Pg_2_text_Shippingcity").val(CityVal);
    var cityval = $('#Pg_2_text_Shippingcity').val();
    OBPager.SetTaskContentMemberValue('EquipmentRequestData.Shippingcity', null, cityval, false);
}

/* Confirm ER process */
 function   ConfirmERProcess (saveMode) {
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
            else if (saveMode ==3 && TaskPrefillValues.PrefillValues.Set1.CandidateGroup != 2) {
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

function  SaveConfirmationERprocess() {
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

if (openMode != 1) {
    window.onload = function () {
        MsgboxAlert(sessionId, 4, 213, 'FORM_POPUP_ONPAGELOAD_NA', "<p style=line-height:20px;><span style=color:red;>Please note:</span><span> To edit information in this form,<br/> please make the modifications in personal data form and submit the personal data form for the changes to reflect in this form. Please remember to save and submit this form after verifying the details.</span></p>");
    } 
}
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

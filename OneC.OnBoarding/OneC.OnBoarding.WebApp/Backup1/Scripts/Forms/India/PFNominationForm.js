
//Preparing form
$().ready(function () {


    if (TaskPrefillValues.PrefillValues.Set2.Gender == 'M') {
        OBPager.GetGeographyMaster(23, 1, "RelationshipList");
    }
    else {
        OBPager.GetGeographyMaster(23, 0, "RelationshipList");
    }
    $("#normal").show();
    if (TaskPrefillValues.PrefillValues.Set2.UBSFlag == 'ITAAS') {
        $('#SealImgItaas').attr('src', '../../../../Images/Indlogos/ItaasSEAL.png');
    }
    else if (TaskPrefillValues.PrefillValues.Set2.UBSFlag == 'UB') {
        $('#SealImgItaas').attr('src', '../../../../Images/Indlogos/UBS_SEAL.png');
    }
    else if (TaskPrefillValues.PrefillValues.Set2.UBSFlag == 'CL') {
        $('#SealImgItaas').attr('src', '../../../../Images/Indlogos/CorelogicSeal.png');
    }
    else if (TaskPrefillValues.PrefillValues.Set2.UBSFlag == 'VS') {
        $('#SealImgItaas').attr('src', '../../../../Images/Indlogos/VSISEAL.png');
    }
    else if (TaskPrefillValues.PrefillValues.Set2.UBSFlag == 'ED') {
        $('#SealImgItaas').attr('src', '../../../../Images/Indlogos/EDRSEAL.png');
    }
    else {
        $('#SealImgItaas').attr('src', '../../../../Images/roundseal.png');
    }
    $('#SealImgItaas').show();

    $('#CompanyAddress')[0].innerHTML = TaskPrefillValues.PrefillValues.Set2.Companyaddress;
    //    $("#ubs").hide();
    ////    $("#cls").hide();
    //    var UBSFlag = TaskPrefillValues.PrefillValues.Set2.UBSFlag
    //    if (UBSFlag == 1) {
    //        $("#ubs").show();
    //        $("#normal").hide();
    //        //$("#cls").hide();
    //    }
    ////    if (UBSFlag == 2) {
    ////        $("#cls").show();
    ////        $("#normal").hide();
    ////        $("#ubs").hide();
    ////    }

    ValidateOnlyInteger();
    ValidateOnlyAlphabets();


    $('#Pg_1_text_Relationship1').change(function () {
        var stateId = $('#Pg_1_text_Relationship1').val();
        if (stateId == 53 || stateId == 54) {
            alert('Grandson and Granddaughter can be a nominee only if they were born to your son and your son is not currently alive');
        }

    });


    $('#Pg_1_text_Relationship2').change(function () {
        var stateId = $('#Pg_1_text_Relationship2').val();
        if (stateId == 53 || stateId == 54) {
            alert('Grandson and Granddaughter can be a nominee only if they were born to your son and your son is not currently alive');
        }

    });


    $('#Pg_1_text_Relationship3').change(function () {
        var stateId = $('#Pg_1_text_Relationship3').val();
        if (stateId == 53 || stateId == 54) {
            alert('Grandson and Granddaughter can be a nominee only if they were born to your son and your son is not currently alive');
        }

    });

    $('#Pg_1_text_Relationship4').change(function () {
        var stateId = $('#Pg_1_text_Relationship4').val();
        if (stateId == 53 || stateId == 54) {
            alert('Grandson and Granddaughter can be a nominee only if they were born to your son and your son is not currently alive');
        }

    });


    $('#Pg_2_text_Relationship11').change(function () {
        var stateId = $('#Pg_2_text_Relationship11').val();
        if (stateId == 53 || stateId == 54) {
            alert('Grandson and Granddaughter can be a nominee only if they were born to your son and your son is not currently alive');
        }

    });


    $('#Pg_2_text_Relationship').change(function () {
        var stateId = $('#Pg_2_text_Relationship').val();
        if (stateId == 53 || stateId == 54) {
            alert('Grandson and Granddaughter can be a nominee only if they were born to your son and your son is not currently alive');
        }

    });


    $('#Pg_2_text_Relationship33').change(function () {
        var stateId = $('#Pg_2_text_Relationship33').val();
        if (stateId == 53 || stateId == 54) {
            alert('Grandson and Granddaughter can be a nominee only if they were born to your son and your son is not currently alive');
        }

    });

    $('#Pg_2_text_Relationship12').change(function () {
        var stateId = $('#Pg_2_text_Relationship12').val();
        if (stateId == 53 || stateId == 54) {
            alert('Grandson and Granddaughter can be a nominee only if they were born to your son and your son is not currently alive');
        }

    });



    $("#Pg_1_text_Name").val(TaskPrefillValues.PrefillValues.Set2.Name);
    $("#Pg_2_text_Name").val(TaskPrefillValues.PrefillValues.Set2.Name);
    $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set2.DOB);
    $("#Pg_2_text_CurrentDate").val(TaskPrefillValues.PrefillValues.Set2.CurrentDate);
    $("#Pg_2_text_CurrentDate2").val(TaskPrefillValues.PrefillValues.Set2.CurrentDate);
    $("#Pg_1_text_MaritalStatus").val(TaskPrefillValues.PrefillValues.Set1.MaritalStatus);
    $("#Pg_1_text_Sex").val(TaskPrefillValues.PrefillValues.Set2.Gender);
    $("#Pg_1_text_AddressPermanent").val(TaskPrefillValues.PrefillValues.Set2.AddressDetails);
    jQXB.doBind(OBPager.taskContentDSName);
    OBPager.ShowPage(1);
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
        $("#Pg_1_text_Name").val(TaskPrefillValues.PrefillValues.Set2.Name);
        $("#Pg_2_text_Name").val(TaskPrefillValues.PrefillValues.Set2.Name);
        $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set2.DOB);
        $("#Pg_2_text_CurrentDate").val(TaskPrefillValues.PrefillValues.Set2.CurrentDate);
        $("#Pg_2_text_CurrentDate2").val(TaskPrefillValues.PrefillValues.Set2.CurrentDate);
        $("#Pg_1_text_MaritalStatus").val(TaskPrefillValues.PrefillValues.Set1.MaritalStatus);
        $("#Pg_1_text_Sex").val(TaskPrefillValues.PrefillValues.Set2.Gender);
        $("#Pg_1_text_AddressPermanent").val(TaskPrefillValues.PrefillValues.Set2.AddressDetails);
    }
    catch (e) { }
};

$(function () {
    $("#Pg_1_text_DataOfBirth1").datepicker({ dateFormat: 'mm/dd/yy', yearRange: "1920:+0", maxDate: "0", buttonText: 'Open calendar', showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false });
    $("#Pg_1_text_DataOfBirth2").datepicker({ dateFormat: 'mm/dd/yy', yearRange: "1920:+0", maxDate: "0", buttonText: 'Open calendar', showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false });
    $("#Pg_1_text_DataOfBirth3").datepicker({ dateFormat: 'mm/dd/yy', yearRange: "1920:+0", maxDate: "0", buttonText: 'Open calendar', showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false });
    $("#Pg_1_text_DataOfBirth4").datepicker({ dateFormat: 'mm/dd/yy', yearRange: "1920:+0", maxDate: "0", buttonText: 'Open calendar', showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false });
    $("#Pg_2_text_DataOfBirth8").datepicker({ dateFormat: 'mm/dd/yy', yearRange: "1920:+0", maxDate: "0", buttonText: 'Open calendar', showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false });
    $("#Pg_2_text_DataOfBirth5").datepicker({ dateFormat: 'mm/dd/yy', yearRange: "1920:+0", maxDate: "0", buttonText: 'Open calendar', showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false });
    $("#Pg_2_text_DataOfBirth6").datepicker({ dateFormat: 'mm/dd/yy', yearRange: "1920:+0", maxDate: "0", buttonText: 'Open calendar', showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false });
    $("#Pg_2_text_DataOfBirth7").datepicker({ dateFormat: 'mm/dd/yy', yearRange: "1920:+0", maxDate: "0", buttonText: 'Open calendar', showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false });
    $("#Pg_2_text_DataOfBirth8").datepicker({ dateFormat: 'mm/dd/yy', yearRange: "1920:+0", maxDate: "0", buttonText: 'Open calendar', showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false });
    $("#Pg_2_text_DataOfBirth9").datepicker({ dateFormat: 'mm/dd/yy', yearRange: "1920:+0", maxDate: "0", buttonText: 'Open calendar', showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false });
    $("#Pg_2_text_DataOfBirth10").datepicker({ dateFormat: 'mm/dd/yy', yearRange: "1920:+0", maxDate: "0", buttonText: 'Open calendar', showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false });
    $("#Pg_2_text_DataOfBirth11").datepicker({ dateFormat: 'mm/dd/yy', yearRange: "1920:+0", maxDate: "0", buttonText: 'Open calendar', showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false });
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
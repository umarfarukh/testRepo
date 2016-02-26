//function EnableMale() {
//    OBPager.SetTaskContentMemberValue('EEOForm.Male', null, "1", false);
//    OBPager.SetTaskContentMemberValue('EEOForm.Female', null, "", false);
//    OBPager.SetTaskContentMemberValue('EEOForm.Notanswer', null, "", true);
//}
//function EnableFemale() {
//    OBPager.SetTaskContentMemberValue('EEOForm.Male', null, "", false);
//    OBPager.SetTaskContentMemberValue('EEOForm.Female', null, "1", false);
//    OBPager.SetTaskContentMemberValue('EEOForm.Notanswer', null, "", true);
//}
//function EnableNotToAnswer() {
//    OBPager.SetTaskContentMemberValue('EEOForm.Male', null, "", false);
//    OBPager.SetTaskContentMemberValue('EEOForm.Female', null, "", false);
//    OBPager.SetTaskContentMemberValue('EEOForm.Notanswer', null, "1", true);
//}
function EnableHispanic() {
    OBPager.SetTaskContentMemberValue('EEOForm.Hispanic', null, "1", false);
    OBPager.SetTaskContentMemberValue('EEOForm.NonHispanic', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.NotPrefered', null, "", true);
    $('input[name=race]').attr('checked', false);
    // jQuery("input[name='race']").each(function (i) {
        jQuery("input[name='race']").attr('disabled', true);
    //});
    OBPager.SetTaskContentMemberValue('EEOForm.White', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.Black', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.Native', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.Asian', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.American', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.TwoMore', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.RaceNoAns', null, "", true);
}

function EnableNonHispanic() {
    OBPager.SetTaskContentMemberValue('EEOForm.Hispanic', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.NonHispanic', null, "1", false);
    OBPager.SetTaskContentMemberValue('EEOForm.NotPrefered', null, "", true);
    jQuery("input[name='race']").attr('disabled', false);
}

function EnableEthnicityNotPrefer() {

    OBPager.SetTaskContentMemberValue('EEOForm.Hispanic', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.NotPrefered', null, "1", true);
    //  jQuery("input[name='race']").each(function (i) {
    jQuery("input[name='race']").attr('disabled', false);
   // });
}
function EnableWhite() {
    OBPager.SetTaskContentMemberValue('EEOForm.White', null, "1", false);
    OBPager.SetTaskContentMemberValue('EEOForm.Black', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.Native', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.Asian', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.American', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.TwoMore', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.RaceNoAns', null, "", true);
}
function EnableBlack() {
    OBPager.SetTaskContentMemberValue('EEOForm.White', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.Black', null, "1", false);
    OBPager.SetTaskContentMemberValue('EEOForm.Native', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.Asian', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.American', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.TwoMore', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.RaceNoAns', null, "", true);
}
function EnableNative() {
    OBPager.SetTaskContentMemberValue('EEOForm.White', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.Black', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.Native', null, "1", false);
    OBPager.SetTaskContentMemberValue('EEOForm.Asian', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.American', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.TwoMore', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.RaceNoAns', null, "", true);
}
function EnableAsian() {
    OBPager.SetTaskContentMemberValue('EEOForm.White', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.Black', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.Native', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.Asian', null, "1", false);
    OBPager.SetTaskContentMemberValue('EEOForm.American', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.TwoMore', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.RaceNoAns', null, "", true);

}
function EnableAmerican() {
    OBPager.SetTaskContentMemberValue('EEOForm.White', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.Black', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.Native', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.Asian', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.American', null, "1", false);
    OBPager.SetTaskContentMemberValue('EEOForm.TwoMore', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.RaceNoAns', null, "", true);
}

function EnableTwoOrMore() {
    OBPager.SetTaskContentMemberValue('EEOForm.White', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.Black', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.Native', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.Asian', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.American', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.TwoMore', null, "1", false);
    OBPager.SetTaskContentMemberValue('EEOForm.RaceNoAns', null, "", true);
}
function EnableRaceNoAns() {
    OBPager.SetTaskContentMemberValue('EEOForm.White', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.Black', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.Native', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.Asian', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.American', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.TwoMore', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.RaceNoAns', null, "1", true);
}
/* VETERAN BLOCK STARTS HERE */
//function EnableVeteran() {
//    $('#divetow').show();
//    OBPager.SetTaskContentMemberValue('EEOForm.Veterancheck', null, "1", false);
//    OBPager.SetTaskContentMemberValue('EEOForm.Reservists', null, "", false);
//    OBPager.SetTaskContentMemberValue('EEOForm.NoneOfAbove', null, "", false);
//    OBPager.SetTaskContentMemberValue('EEOForm.VeteranNoAns', null, "", true);
//}
/* SUB GROUP OF VETERAN BLOCK STARTS HERE */
function EnableDisabledVeterans() {
    if ($('#Pg_1_chkbox_DisabledVeteran').is(':checked') == true) {
        OBPager.SetTaskContentMemberValue('EEOForm.DisabledVeteran', null, "true", false);
    }
    else {
        OBPager.SetTaskContentMemberValue('EEOForm.DisabledVeteran', null, "", false);
    }
//    $('#Pg_1_chkbox_NoneOfAbove').attr('checked', false);
//    $('#Pg_1_chkbox_VeteranNoAns').attr('checked', false);
    OBPager.SetTaskContentMemberValue('EEOForm.NoneOfAbove', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.VeteranNoAns', null, "", true);
//    OBPager.SetTaskContentMemberValue('EEOForm.DisabledVeteran', null, "1", true);
//    OBPager.SetTaskContentMemberValue('EEOForm.ArmedVeteran', null, "", false);
//    OBPager.SetTaskContentMemberValue('EEOForm.OthersVeteran', null, "", false);
//    OBPager.SetTaskContentMemberValue('EEOForm.SeperatedVeteran', null, "", true);
}
function EnableArmedVeterans() {
//    $('#Pg_1_chkbox_NoneOfAbove').attr('checked', false);
    //    $('#Pg_1_chkbox_VeteranNoAns').attr('checked', false);
//    var chkType = $('#Pg_1_chkbox_ArmedVeteran').is(':checked');
//    var chkvalue = (chkType == true) ? '1' : '';
//    OBPager.SetTaskContentMemberValue('EEOForm.ArmedVeteran', null, chkvalue, false);
    if ($('#Pg_1_chkbox_ArmedVeteran').is(':checked') == true) {
        OBPager.SetTaskContentMemberValue('EEOForm.ArmedVeteran', null, 'true', true);
    }
    else {
        OBPager.SetTaskContentMemberValue('EEOForm.ArmedVeteran', null, '', true);
    }
    OBPager.SetTaskContentMemberValue('EEOForm.NoneOfAbove', null, '', false);
    OBPager.SetTaskContentMemberValue('EEOForm.VeteranNoAns', null, '', true);    
//    Chk(this);
    //    OBPager.SetTaskContentMemberValue('EEOForm.DisabledVeteran', null, "", false);
   // OBPager.SetTaskContentMemberValue('EEOForm.ArmedVeteran', null, "1", true);
//    OBPager.SetTaskContentMemberValue('EEOForm.OthersVeteran', null, "", false);
//    OBPager.SetTaskContentMemberValue('EEOForm.SeperatedVeteran', null, "", true);

}
function EnableOthers() {
//    var chkType = $('#Pg_1_chkbox_OthersVeteran').is(':checked');
//    var chkvalue = (chkType == true) ? '1' : '';
    //    OBPager.SetTaskContentMemberValue('EEOForm.OthersVeteran', null, chkvalue, false);
    if ($('#Pg_1_chkbox_OthersVeteran').is(':checked') == true) {
        OBPager.SetTaskContentMemberValue('EEOForm.OthersVeteran', null, "true", false);
    }
    else {
        OBPager.SetTaskContentMemberValue('EEOForm.OthersVeteran', null, "", false);
    }
    OBPager.SetTaskContentMemberValue('EEOForm.NoneOfAbove', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.VeteranNoAns', null, "", true);
   
//    OBPager.SetTaskContentMemberValue('EEOForm.DisabledVeteran', null, "", false);
    //    OBPager.SetTaskContentMemberValue('EEOForm.ArmedVeteran', null, "", false);
    
//    OBPager.SetTaskContentMemberValue('EEOForm.SeperatedVeteran', null, "", true);
}
function EnableSeperatedVeterans() {
//    $('#Pg_1_chkbox_NoneOfAbove').attr('checked', false);
    //    $('#Pg_1_chkbox_VeteranNoAns').attr('checked', false);
//    var chkType = $('#Pg_1_chkbox_SeperatedVeteran').is(':checked');
//    var chkvalue = (chkType == true) ? '1' : '';
    //    OBPager.SetTaskContentMemberValue('EEOForm.SeperatedVeteran', null, chkvalue, false);
    if ($('#Pg_1_chkbox_SeperatedVeteran').is(':checked') == true) {
        OBPager.SetTaskContentMemberValue('EEOForm.SeperatedVeteran', null, "true", false);
    }
    else {
        OBPager.SetTaskContentMemberValue('EEOForm.SeperatedVeteran', null, "", false);
    }
    OBPager.SetTaskContentMemberValue('EEOForm.NoneOfAbove', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.VeteranNoAns', null, "", true);
    
//    OBPager.SetTaskContentMemberValue('EEOForm.DisabledVeteran', null, "", false);
//    OBPager.SetTaskContentMemberValue('EEOForm.ArmedVeteran', null, "", false);
//    OBPager.SetTaskContentMemberValue('EEOForm.OthersVeteran', null, "", false);
//    OBPager.SetTaskContentMemberValue('EEOForm.SeperatedVeteran', null, "1", true);
}
/* SUB GROUP OF VETERAN BLOCK ENDS HERE */

/* NONE OF THE ABOVE BLOCK */

function EnableMilitary() {
//    $('#Pg_1_chkbox_NoneOfAbove').attr('checked', false);
//    $('#Pg_1_chkbox_VeteranNoAns').attr('checked', false);
//    var chkType = $('#Pg_1_chkbox_military').is(':checked');
//    var chkvalue = (chkType == true) ? '1' : '';
    //    OBPager.SetTaskContentMemberValue('EEOForm.Military', null, chkvalue, false);
    if ($('#Pg_1_chkbox_military').is(':checked') == true) {
        OBPager.SetTaskContentMemberValue('EEOForm.Military', null, "true", false);
    }
    else {
        OBPager.SetTaskContentMemberValue('EEOForm.Military', null, "", false);
    }

    OBPager.SetTaskContentMemberValue('EEOForm.NoneOfAbove', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.VeteranNoAns', null, "", true);
} 

function EnableReservists() {
//    $('#divetow').hide();
//    OBPager.SetTaskContentMemberValue('EEOForm.Veterancheck', null, "", false);
//    $('#Pg_1_chkbox_NoneOfAbove').attr('checked', false);
    //    $('#Pg_1_chkbox_VeteranNoAns').attr('checked', false);
    if ($('#Pg_1_chkbox_Reservists').is(':checked') == true) {
        OBPager.SetTaskContentMemberValue('EEOForm.Reservists', null, "true", false);
    }
    else {
        OBPager.SetTaskContentMemberValue('EEOForm.Reservists', null, "", false);
    }
    OBPager.SetTaskContentMemberValue('EEOForm.NoneOfAbove', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.VeteranNoAns', null, "", true);
    
//    OBPager.SetTaskContentMemberValue('EEOForm.Reservists', null, "1", false);
//    OBPager.SetTaskContentMemberValue('EEOForm.DisabledVeteran', null, "", false);
//    OBPager.SetTaskContentMemberValue('EEOForm.ArmedVeteran', null, "", false);
//    OBPager.SetTaskContentMemberValue('EEOForm.OthersVeteran', null, "", false);
//    OBPager.SetTaskContentMemberValue('EEOForm.SeperatedVeteran', null, "", true);
}

function EnableNoneVeterans() {
//    $('#divetow').hide();
//    OBPager.SetTaskContentMemberValue('EEOForm.Veterancheck', null, "", false);
//    var chkType = $('#Pg_1_chkbox_NoneOfAbove').is(':checked');
//    var chkvalue = (chkType == true) ? '1' : '';
    //    OBPager.SetTaskContentMemberValue('EEOForm.NoneOfAbove', null, chkvalue, false);
    if ($('#Pg_1_chkbox_NoneOfAbove').is(':checked') == true) {
        OBPager.SetTaskContentMemberValue('EEOForm.NoneOfAbove', null, "true", false);
    }
    else {
        OBPager.SetTaskContentMemberValue('EEOForm.NoneOfAbove', null, "", false);
    }
    OBPager.SetTaskContentMemberValue('EEOForm.VeteranNoAns', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.Reservists', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.DisabledVeteran', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.ArmedVeteran', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.OthersVeteran', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.SeperatedVeteran', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.Military', null, "", true);
//    OBPager.SetTaskContentMemberValue('EEOForm.NoneOfAbove', null, "1", true);

}
/* NOT TO PREFER BLOCK */
function EnableNotPreferVeterans() {
//    $('#divetow').hide();
//    var chkType = $('#Pg_1_chkbox_VeteranNoAns').is(':checked');
    //    var chkvalue = (chkType == true) ? '1' : '';
    if ($('#Pg_1_chkbox_VeteranNoAns').is(':checked') == true) {
        OBPager.SetTaskContentMemberValue('EEOForm.VeteranNoAns', null, "true", false);
    }
    else{
        OBPager.SetTaskContentMemberValue('EEOForm.VeteranNoAns', null, "", false);   
    }
    OBPager.SetTaskContentMemberValue('EEOForm.Reservists', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.DisabledVeteran', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.ArmedVeteran', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.OthersVeteran', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.SeperatedVeteran', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.Military', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.NoneOfAbove', null, "", true);

}
/* VETERAN BLOCK ENDS HERE */
/*Disability Block*/

function EnableDisability() {


    OBPager.SetTaskContentMemberValue('EEOForm.NonDisability', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.Disability', null, "1", false);
    OBPager.SetTaskContentMemberValue('EEOForm.DisabilityNoAns', null, "", true);
}

function EnableNONDisability() {
    OBPager.SetTaskContentMemberValue('EEOForm.NonDisability', null, "1", false);
    OBPager.SetTaskContentMemberValue('EEOForm.Disability', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.DisabilityNoAns', null, "", true);
}
function EnableDisabilityNotPrefer() {
    OBPager.SetTaskContentMemberValue('EEOForm.Disability', null, "", false);
    OBPager.SetTaskContentMemberValue('EEOForm.DisabilityNoAns', null, "1", false);
    OBPager.SetTaskContentMemberValue('EEOForm.NonDisability', null, "", true);
}




$().ready(function () {
    OBPager.ShowPage(1);
    if(TaskPrefillValues.PrefillValues.Set1.Gender == 'N' || TaskPrefillValues.PrefillValues.Set1.Gender == 'U')
        $('input[name="Null"]').attr('checked', true);
    else
        $('input[name="' + TaskPrefillValues.PrefillValues.Set1.Gender + '"]').attr('checked', true);
    $("#Pg_1_text_SecurityNumber").val(TaskPrefillValues.PrefillValues.Set1.SSN);
    $("#Pg_1_text_FirstName").val(TaskPrefillValues.PrefillValues.Set1.FirstName);
    $("#Pg_1_text_LastName").val(TaskPrefillValues.PrefillValues.Set1.LastName);
    $("#Pg_1_text_MiddleInitial").val(TaskPrefillValues.PrefillValues.Set1.MiddleName);

    $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set1.Date);

//    $("radio[id='Pg_1_radio_HISPANIC']").change(function () {
//        if ($(this).val() === 'ETHNICITY') {
//            if ($(this).is(":checked")) {
//                $("#race").hide();
//            }
//        }
//    });

//    if ($('Pg_1_radio_HISPANIC').attr('checked') === true) {
//        $('#race').hide();
//    }
//    else {
//        $('#race').show();
//    }

//    if ($(this).val() === 'ETHNICITY') {
//        if ($(this).is(":checked")) {
//            $("#race").hide();
//        }
//    }
//    if ($('#Pg_1_radio_HISPANIC').is(":checked")) {
//        $("#race").hide();
//    }
//    /* Display and hide of div while changing the radio button */
//    $("radio[id='Pg_1_radio_HISPANIC']").change(function () {
//        if ($(this).val() === 'ETHNICITY') {
//            if ($(this).is(":checked")) {
//                $("#race").hide();
//            }
//        }
//    });
    if (OBPager.taskStatusFlag == -1) {
        OBPager.SetTaskContentMemberValue('EEOForm.Date', null, TaskPrefillValues.PrefillValues.Set1.Date, true);
        //Gender();
    }
  
});
//function Gender() {
//    var a = (TaskPrefillValues.PrefillValues.Set1.Gender);
//    var b = $('input[name="' + a + '"]').attr('jqxb-datamember');
//    $('.Gender').attr('disabled', true);
//    OBPager.SetTaskContentMemberValue(b, null, true, true);

//}


/*To set empty values for each check box and also use this method in SaveTaskData function*/
function ChangeFlasetoEmpty() {
    $('input[type="checkbox"]').each(function () {
        var obj = $(this);
        var chked = obj.is(":checked");
        if (chked == false) {
            var datamember = obj.attr('jqxb-datamember');
            if (datamember != undefined && datamember != '') {
                OBPager.SetTaskContentMemberValue(datamember, null, '', false);
            }
        }
    });
}
//function ChangeFlasetoEmpty1() {
//    $('input[type="checkbox"]').each(function () {
//        var obj = $(this);
//        var chked = obj.is(":checked");
//        if (chked == false) {
//            var datamember = obj.attr('jqxb-datamember');
//            OBPager.SetTaskContentMemberValue(datamember, null, '', false);
//        }
//    });
//}
function SaveTaskData(saveMode) {
    ChangeFlasetoEmpty();
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
        }
    }
}
function ResetTaskData() {
    
    OBPager.ResetTaskContent();
    if (OBPager.taskStatusFlag == -1) {
       // Gender();
        $("#Pg_1_text_SecurityNumber").val(TaskPrefillValues.PrefillValues.Set1.SSN);
        $("#Pg_1_text_FirstName").val(TaskPrefillValues.PrefillValues.Set1.FirstName);
        $("#Pg_1_text_LastName").val(TaskPrefillValues.PrefillValues.Set1.LastName);
        $("#Pg_1_text_MiddleInitial").val(TaskPrefillValues.PrefillValues.Set1.MiddleName);
        $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set1.Date);
//        OBPager.SetTaskContentMemberValue('EEOForm.Date', null, "", true);
//        if ($('#Pg_1_radio_HISPANIC').is(":checked") == 'true') {
//            $("#race").show();
        //        };
        jQuery("input[name='race']").attr('disabled', false);
        jQXB.doBind(OBPager.taskContentDSName);
    }
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










/* Make this statement in end of script - as data loading and other predata filling works has to be completed */
//Display default page on load
$().ready(function () {



    /* Setting prefill values */
    OBPager.GetMaster(60, "OfficeAddress");
    $("#Pg_1_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_1_label_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);

    $("#Pg_1_text_Level").val(TaskPrefillValues.PrefillValues.Set1.Level);
    $("#Pg_1_text_Emailid").val(TaskPrefillValues.PrefillValues.Set1.Emailid);
    $("#Pg_1_text_Telephone").val(TaskPrefillValues.PrefillValues.Set1.Telephone);


    if (OBPager.taskStatusFlag == "-1") {
        /* Setting default values for the first time */
        OBPager.SetTaskContentMemberValue('Equipment.OfficeLocation', null, "1", false);
        OBPager.SetTaskContentMemberValue('Equipment.ShippingLocation', null, "", false);

        /* Make Laptop and CellPhone CheckBox Select on First Time*/


        OBPager.SetTaskContentMemberValue('Equipment.ClientEquipment', null, "1", false);
        OBPager.SetTaskContentMemberValue('Equipment.Laptop', null, "1", false);

        if (TaskPrefillValues.PrefillValues.Set1.IsBlackBerryEnable == "true") {
            OBPager.SetTaskContentMemberValue('Equipment.BlackBerry', null, "1", false);
            OBPager.SetTaskContentMemberValue('Equipment.CellPhone', null, "1", false);
        }
        else {
            OBPager.SetTaskContentMemberValue('Equipment.BlackBerry', null, "1", false);
            OBPager.SetTaskContentMemberValue('Equipment.CellPhone', null, "1", false);
        }

        /* Make Office Location Select on First Time*/
        $("#Pg_1_check_OfficeAddress").val(2);
        OBPager.SetTaskContentMemberValue('Equipment.OfficeAddress', null, 2, true);
    }
    else {
        OBPager.SetTaskContentMemberValue('Equipment.OfficeAddress', null, TaskPrefillValues.PrefillValues.Set1.OfficeAddress, false);
        OBPager.SetTaskContentMemberValue('Equipment.OfficeLocation', null, TaskPrefillValues.PrefillValues.Set1.OfficeLocation, false);

        if (TaskPrefillValues.PrefillValues.Set1.ClientEquipment == null || TaskPrefillValues.PrefillValues.Set1.ClientEquipment == 'false') {
            OBPager.SetTaskContentMemberValue('Equipment.ClientEquipment', null, "1", true);
        }
        else {
            OBPager.SetTaskContentMemberValue('Equipment.ClientEquipment', null, TaskPrefillValues.PrefillValues.Set1.ClientEquipment, true);
        }

        if (TaskPrefillValues.PrefillValues.Set1.Laptop == null || TaskPrefillValues.PrefillValues.Set1.Laptop == 'false') {
            OBPager.SetTaskContentMemberValue('Equipment.Laptop', null, "1", true);
        }
        else {
            OBPager.SetTaskContentMemberValue('Equipment.Laptop', null, TaskPrefillValues.PrefillValues.Set1.Laptop, true);
        }

        if (TaskPrefillValues.PrefillValues.Set1.CellPhone == null || TaskPrefillValues.PrefillValues.Set1.CellPhone == 'false') {
            OBPager.SetTaskContentMemberValue('Equipment.CellPhone', null, "1", true);
        }
        else {
            OBPager.SetTaskContentMemberValue('Equipment.CellPhone', null, TaskPrefillValues.PrefillValues.Set1.CellPhone, true);
        }
        //   OBPager.SetTaskContentMemberValue('Equipment.CellPhone', null, TaskPrefillValues.PrefillValues.Set1.CellPhone, false);
        if (TaskPrefillValues.PrefillValues.Set1.BlackBerry == null || TaskPrefillValues.PrefillValues.Set1.BlackBerry == 'false') {
            OBPager.SetTaskContentMemberValue('Equipment.BlackBerry', null, false, true);
        }
        else {
            OBPager.SetTaskContentMemberValue('Equipment.BlackBerry', null, TaskPrefillValues.PrefillValues.Set1.BlackBerry, true);
        }
        /* Setting member value manually */
        OBPager.SetTaskContentMemberValue('Equipment.ShippingAddress', null, TaskPrefillValues.PrefillValues.Set1.ShippingAddress, false);
        OBPager.SetTaskContentMemberValue('Equipment.ShippingPostCode', null, TaskPrefillValues.PrefillValues.Set1.ShippingPostCode, true);

    }

    if ($('#Pg_1_check_chkOffice').is(':checked') == true) {
        $('#shippingDetails').hide();
        $('#shippingDetails1').hide();
        //$('#shippingNote').hide();
        //$('#ShippingNotePaddington').hide();
        $('#trOfficeLocation').show();
    }
    else {
        $('#shippingDetails').show();
        $('#shippingDetails1').show();
        //$('#shippingNote').show();
       // $('#ShippingNotePaddington').show();
        $('#trOfficeLocation').hide();
    }
   if (TaskPrefillValues.PrefillValues.Set1.IsBlackBerryEnable == "true")
        document.getElementById('Pg_9_tr_Equipment').style.display = "none"
    else
        document.getElementById('Pg_9_tr_Equipment').style.display = "none"



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
function ResetTaskData() {
    OBPager.ResetTaskContent();
    if (OBPager.taskStatusFlag == -1) {

        /* Setting default values for the first time */
        OBPager.SetTaskContentMemberValue('Equipment.OfficeLocation', null, "1", false);
        OBPager.SetTaskContentMemberValue('Equipment.ShippingLocation', null, "", false);

        /* Make Laptop and CellPhone CheckBox Select on First Time*/


        OBPager.SetTaskContentMemberValue('Equipment.ClientEquipment', null, "1", false);
        OBPager.SetTaskContentMemberValue('Equipment.Laptop', null, "1", false);
        OBPager.SetTaskContentMemberValue('Equipment.CellPhone', null, "1", false);
        OBPager.SetTaskContentMemberValue('Equipment.BlackBerry', null, "1", false);

        /* Make Office Location Select on First Time*/
        $("#Pg_1_check_OfficeAddress").val(2);
        OBPager.SetTaskContentMemberValue('Equipment.OfficeAddress', null, 2, true);

       
        //Do a data bind finally
        jQXB.doBind(OBPager.taskContentDSName);
    }
    if ($('#Pg_1_check_chkOffice').is(':checked') == true) {
        $('#shippingDetails').hide();
        $('#shippingDetails1').hide();
       // $('#shippingNote').hide();
        //$('#ShippingNotePaddington').hide();
        $('#trOfficeLocation').show();
    }
    else {
        $('#shippingDetails').show();
        $('#shippingDetails1').show();
        //$('#shippingNote').show();
        //$('#ShippingNotePaddington').show();
        $('#trOfficeLocation').hide();
    }
//    if (Pg_1_check_chkOffice.checked == true) {
//        document.getElementById("shippingDetails").style.display = 'none';
//        document.getElementById("shippingDetails1").style.display = 'none';
//        document.getElementById("shippingNote").style.display = 'none';
//        document.getElementById("trOfficeLocation").style.display = '';
//    }
//    else {
//        document.getElementById("shippingDetails").style.display = '';
//        document.getElementById("shippingDetails1").style.display = ''
//        document.getElementById("shippingNote").style.display = '';
//        document.getElementById("trOfficeLocation").style.display = 'none';
//    }
};

$('#Pg_1_check_chkOffice').live("click", function () {
    $('#shippingDetails').hide();
    $('#shippingDetails1').hide();
    //$('#shippingNote').hide();
    //$('#ShippingNotePaddington').hide();
    $('#trOfficeLocation').show();
    OBPager.SetTaskContentMemberValue('Equipment.OfficeLocation', null, "1", false);
    OBPager.SetTaskContentMemberValue('Equipment.ShippingLocation', null, "", true);
});
$('#Pg_1_check_chkShipping').live("click", function () {
    $('#shippingDetails').show();
    $('#shippingDetails1').show();
    //$('#shippingNote').show();
    //$('#ShippingNotePaddington').show();
    $('#trOfficeLocation').hide();
    OBPager.SetTaskContentMemberValue('Equipment.OfficeLocation', null, "", false);
    OBPager.SetTaskContentMemberValue('Equipment.ShippingLocation', null, "1", true);

});
//function OfficeLocation() {

//    if (Pg_1_check_chkOffice.checked == true) {
//        document.getElementById("shippingDetails").style.display = 'none';
//        document.getElementById("shippingDetails1").style.display = 'none';
//        document.getElementById("shippingNote").style.display = 'none';
//      document.getElementById("trOfficeLocation").style.display = '';
//        OBPager.SetTaskContentMemberValue('Equipment.OfficeLocation', 1, "1", false);
//        OBPager.SetTaskContentMemberValue('Equipment.ShippingLocation', 1, "", true);
//    }
//    else {
//        document.getElementById("shippingDetails").style.display = '';
//        OBPager.SetTaskContentMemberValue('Equipment.OfficeLocation', 1, "", false);
//        OBPager.SetTaskContentMemberValue('Equipment.ShippingLocation', 1, "", true);
//    }

//}

//function ShippingLocation() {

// 
//    if (Pg_1_check_chkShipping.checked == true) {
//        document.getElementById("shippingDetails").style.display = '';
//        document.getElementById("shippingDetails1").style.display = '';
//        document.getElementById("shippingNote").style.display = '';
//         document.getElementById("trOfficeLocation").style.display = 'none';
//         OBPager.SetTaskContentMemberValue('Equipment.OfficeLocation', 1, "", false);
//        OBPager.SetTaskContentMemberValue('Equipment.ShippingLocation', 1, "1", true);

//        

//    }
//    else {
//        OBPager.SetTaskContentMemberValue('Equipment.OfficeLocation', 1, "", false);
//        OBPager.SetTaskContentMemberValue('Equipment.ShippingLocation', 1, "", true);
//    }

//}
function SetValue() {
    if ($('#Pg_1_check_chkClientEquipment').is(':checked')) {
        OBPager.SetTaskContentMemberValue('Equipment.ClientEquipment', 1, "1", false);
        OBPager.SetTaskContentMemberValue('Equipment.Laptop', 1, "1", false);
        OBPager.SetTaskContentMemberValue('Equipment.CellPhone', 1, "1", false);
        OBPager.SetTaskContentMemberValue('Equipment.BlackBerry', 1, "1", true);
     
    }
    if ($('#Pg_1_check_chkLaptop').is(':checked')) {
        OBPager.SetTaskContentMemberValue('Equipment.Laptop', 1, "1", false);
        OBPager.SetTaskContentMemberValue('Equipment.ClientEquipment', 1, "1", true);
       // $('#Pg_1_check_chkClientEquipment').removeAttr('checked');
    }
    if ($('#Pg_1_check_chkClientCellPhone').is(':checked')) {
            OBPager.SetTaskContentMemberValue('Equipment.CellPhone', 1, "1", false);
            OBPager.SetTaskContentMemberValue('Equipment.ClientEquipment', 1, "1", true);
      //  $('#Pg_1_check_chkClientEquipment').removeAttr('checked');
    }
    if ($('#Pg_1_check_chkClientBlackBerry').is(':checked')) {
      OBPager.SetTaskContentMemberValue('Equipment.BlackBerry', 1, "1", false);
      OBPager.SetTaskContentMemberValue('Equipment.ClientEquipment', 1, "1", true);
       // $('#Pg_1_check_chkClientEquipment').removeAttr('checked');
    }
  

//    if (Pg_1_check_chkLaptop.checked == true) {
//        OBPager.SetTaskContentMemberValue('Equipment.Laptop', null, "1", false);
//    } else {
//        OBPager.SetTaskContentMemberValue('Equipment.Laptop', null, "", false);
//    }
//    if (Pg_1_check_chkClientCellPhone.checked == true) {
//        OBPager.SetTaskContentMemberValue('Equipment.CellPhone', null, "1", false);
//        if (Pg_1_check_chkClientEquipment.checked == true) {
//           // Pg_1_check_chkClientEquipment.checked = false;
//            OBPager.SetTaskContentMemberValue('Equipment.ClientEquipment', null, "", false);
//        }
//    } else {
//        OBPager.SetTaskContentMemberValue('Equipment.CellPhone', null, "", false);
//    }
//    if (Pg_1_check_chkClientBlackBerry.checked == true) {
//        OBPager.SetTaskContentMemberValue('Equipment.BlackBerry', null, "1", false);
//    } else {
//        OBPager.SetTaskContentMemberValue('Equipment.BlackBerry', null, "", false);
//    }



}
function ClientEquipment() {
    if ($('#Pg_1_check_chkClientEquipment').is(':checked')) {
        OBPager.SetTaskContentMemberValue('Equipment.ClientEquipment', 1, "1", false);
        OBPager.SetTaskContentMemberValue('Equipment.Laptop', 1, "1", false);
        OBPager.SetTaskContentMemberValue('Equipment.CellPhone', 1, "1", false);
        OBPager.SetTaskContentMemberValue('Equipment.BlackBerry', 1, "1", false);
    }
}
function Laptop() {
    if ($('#Pg_1_check_chkLaptop').is(':checked')) {
        OBPager.SetTaskContentMemberValue('Equipment.ClientEquipment', 1, "1", false);
        OBPager.SetTaskContentMemberValue('Equipment.Laptop', 1, "1", false);
    }
    else {
        OBPager.SetTaskContentMemberValue('Equipment.Laptop', 1, "1", false);
    }
  

}
function CellPhone() {
    if ($('#Pg_1_check_chkClientCellPhone').is(':checked')) {
        OBPager.SetTaskContentMemberValue('Equipment.ClientEquipment', 1, "1", false);
        // OBPager.SetTaskContentMemberValue('Equipment.Laptop', null, "", false);
        OBPager.SetTaskContentMemberValue('Equipment.BlackBerry', 1, "1", false);
        OBPager.SetTaskContentMemberValue('Equipment.CellPhone', 1, "1", false);
       
    }

}
function BlackBerry() {
    if ($('#Pg_1_check_chkClientBlackBerry').is(':checked')) {
        OBPager.SetTaskContentMemberValue('Equipment.ClientEquipment', 1, "1", false);
        OBPager.SetTaskContentMemberValue('Equipment.CellPhone', 1, "1", false)
        //  OBPager.SetTaskContentMemberValue('Equipment.Laptop', null, "", false);
        //  OBPager.SetTaskContentMemberValue('Equipment.CellPhone', null, "", false)
        OBPager.SetTaskContentMemberValue('Equipment.BlackBerry', 1, "1", false)
    }

}


$().ready(function () { OBPager.ShowPage(1); });

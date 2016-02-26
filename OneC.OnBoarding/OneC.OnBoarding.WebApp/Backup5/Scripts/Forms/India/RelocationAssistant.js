
$().ready(function () {
    Getvendorslist();
    if (OBPager.taskStatusFlag == -1) {
        OBPager.SetTaskContentMemberValue('RelocationAssistant.AssociateName', null, TaskPrefillValues.PrefillValues.Set1.AssociateName, false);
        OBPager.SetTaskContentMemberValue('RelocationAssistant.FromAddress', null, TaskPrefillValues.PrefillValues.Set1.Address, false);
        OBPager.SetTaskContentMemberValue('RelocationAssistant.Mphone', null, TaskPrefillValues.PrefillValues.Set1.Mphone, false);
        OBPager.SetTaskContentMemberValue('RelocationAssistant.Hphone', null, TaskPrefillValues.PrefillValues.Set1.Hphone, false);
        OBPager.SetTaskContentMemberValue('RelocationAssistant.RelocationAmount', null, TaskPrefillValues.PrefillValues.Set1.RelocationAmount, false);
        OBPager.SetTaskContentMemberValue('RelocationAssistant.Designation', null, TaskPrefillValues.PrefillValues.Set1.Designation, false);
        OBPager.SetTaskContentMemberValue('RelocationAssistant.CandidateId', null, TaskPrefillValues.PrefillValues.Set1.CandidateId, false);       
    }

    /*249510 - Relocation hyperlink added*/
    //$('#aRelocationLink').attr('href', '../../RelocationAssistance/HomePage.htm?ssid=' + sessionId + '&cndid=' + candidateId + '&cntyid=' + countryId);

    jQXB.doBind(OBPager.taskContentDSName);
    OBPager.ShowPage(1);
    $('.vendor').on("click", function () {
        OBPager.SetTaskContentMemberValue($(this).attr('jqxb-datamember'), null, ($(this).is(":checked") == true ? true : ''), true);
    });

    $("#Relocate_Mobile").keyup(function (event) {
        var obj = $(this).attr("id");
        var th = $("#" + obj).val().length;
        var p = $("#" + obj).val();


        if (p.substring(0, 1) == '0') {
            alert("Mobile Number should not start with Zero");
            if (th == 1)
                $("#" + obj).attr("value", "");
            else
            $("#" + obj).attr("value", p.substring(1, th - 1));
            var p = $("#" + obj).val();
        }


//        if ($("#" + obj).val() == '0') {
//            alert("Mobile Number should not start with Zero");
//            $("#" + obj).attr("value", "");
//            p = $("#" + obj).val();

//        }

        if (th == 0) {
            if (event.keyCode == 48 || event.keyCode == 96) {
                alert("Mobile Number should not start with Zero");
                event.preventDefault();
            }
        }

       
       
        if (th < 14) {
            if (event.keyCode == 8) {

            }

        }
        onlyNum(event);
    });
});



$(function () {
    $(".jQrydatepicker").datepicker({ dateFormat: 'mm/dd/yy', minDate:1,buttonText: 'Open calendar',
        showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    });
});
function SaveTaskData(saveMode) {
    if (saveMode == 1) {
        if (OBPager.ValidateTaskData(saveMode) == true) {
            try {
                if (OBPager.SaveTaskData(saveMode) == true) {
                    SendMailtoVendor();
                   
                    return true;

                }
                else {
                    return false;
                }
            }
            catch (e) { }
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
            alert(e.Message);
        }
    }
}


function ResetTaskData() {

    OBPager.ResetTaskContent();
    if (OBPager.taskStatusFlag == -1) {
        OBPager.SetTaskContentMemberValue('RelocationAssistant.AssociateName', null, TaskPrefillValues.PrefillValues.Set1.AssociateName, false);
        OBPager.SetTaskContentMemberValue('RelocationAssistant.FromAddress', null, TaskPrefillValues.PrefillValues.Set1.Address, false);
        OBPager.SetTaskContentMemberValue('RelocationAssistant.Mphone', null, TaskPrefillValues.PrefillValues.Set1.Mphone, false);
        OBPager.SetTaskContentMemberValue('RelocationAssistant.Hphone', null, TaskPrefillValues.PrefillValues.Set1.Hphone, false);
        OBPager.SetTaskContentMemberValue('RelocationAssistant.RelocationAmount', null, TaskPrefillValues.PrefillValues.Set1.RelocationAmount, false);
        OBPager.SetTaskContentMemberValue('RelocationAssistant.Designation', null, TaskPrefillValues.PrefillValues.Set1.Designation, false);
    }
    /*249510 - Relocation hyperlink added*/
    //$('#aRelocationLink').attr('href', '../../RelocationAssistance/HomePage.htm?ssid=' + sessionId + '&cndid=' + candidateId + '&cntyid=' + countryId);

     $(".vendor").attr('checked', false);
//    var obj = JSON.parse(OBPager.strFormDetails).RelocationAssistant;
//    $.each(obj, function (name, val) {
//    if($("#" + name).attr('type') == "checkbox"){
//        if (name.indexOf("Vendor") != -1 && val != false && val != 0 && val != null && val != NaN) {
//            $("#" + name).attr('checked', true);
//            OBPager.SetTaskContentMemberValue("RelocationAssistant." + name + "", null, true, true);
//        } else {
//            $("#" + name).attr('checked', false);
//            OBPager.SetTaskContentMemberValue("RelocationAssistant." + name + "", null, false, true);
//        }
//    });

    jQXB.doBind(OBPager.taskContentDSName);

};

function Getvendorslist() {
    var data = '{';
    data += "'sessionId':1,";
    data += "'parentCode':'184'";
    data += "}";

    $.ajax({
        type: "post",
        url: "../../../../FormsService.aspx/GetMaster",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (msg) {
            vendorList(msg.d);
        },
        vendorList: function (xhr, status, textRemarks) { alert("Error " + xhr.status + " " + textRemarks); }
    });
}

var vendorList = function (vendorData) {
    var content = '';
    $(vendorData).each(function (i, data) {
        content += '<tr><td> <input type="checkbox"  class="vendor" jqxb-datasource="FormDetails" id="Vendor' + (i + 1) + '"  jqxb-datamember="RelocationAssistant.Vendor' + (i + 1) + '"   style="Margin-left:60px"  id="Pg_1_check_Vendor' + i + '" mailAddress="' + data.UserValue + '" /><label>' + data.Description + '</label></td></tr>';
        //OBPager.SetTaskContentMemberValue("RelocationAssistant.Vendor" + (i + 1), null,  , true);


    });
    $('#Vendors').append(content);
    var obj = JSON.parse(OBPager.strFormDetails).RelocationAssistant;
    $.each(obj, function (name, val) {
        if (name.indexOf("Vendor") != -1 && val != false && val != 0 && val != null && val != NaN) {
            $("#" + name).attr('checked', true);
         //   OBPager.SetTaskContentMemberValue("RelocationAssistant." + name + "", null, true, true);
        }
    });

}



function SendMailtoVendor() {
    var val='';
    $(':checkbox:checked').each(function (i) {
        val += ';'+ $(this).attr("mailAddress")
    });
    if (val != '') {
        Notify(OBPager.candidateId, 178, 0, 3, val);
    }
}

function Notify(candidateId, notificationEventMasterId, notificationMappingId, countryId,  val) {
    var dataString = '{notificationMasterId:' + notificationEventMasterId + ',notificationMappingId:' + notificationMappingId + ',candidateId:' + candidateId + ',countryID:' + countryId + ',ToId:"' + val + '"}';
    try {
        $.ajax({
            type: "POST",
            url: "../../../../FormsService.aspx/SendVendorMail",
            data: dataString,
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
               
            },
            error: function (xhr) {
               
            }
        });
    }
    catch (e) {
    }

}

function redirectToRAapp() {
    window.open('../../../../RelocationAssistance/HomePage.htm?ssid=' + sessionId + '&cndid=' + candidateId + '&cntyid=' + countryId + '', '_blank');
}





   
        


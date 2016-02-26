function Residing(obj, aa) {
    var Y = $(obj).attr('id');
    var RY = $(obj).attr('jqxb-datamember');
    var v = $(obj).val();
    if (v == 'yes') {
        var RN = $(obj).next().attr('jqxb-datamember'); $(aa).find(".Res")[0].val = " "; $(aa).find(".Res")[1].val = " "; $(aa).find(".Res")[0].disabled = true;
        $(aa).find(".Res")[1].disabled = true;
        cleartextvalue();
    }
    else {
        var RN = $(obj).prev().attr('jqxb-datamember'); $(aa).find(".Res")[0].disabled = false;
        $(aa).find(".Res")[1].disabled = false;
    }
    if (document.getElementById(Y).checked == true) {
        OBPager.SetTaskContentMemberValue(RY, 1, "true", false);

        //     OBPager.SetTaskContentMemberValue(RY, 1, "", false);
        OBPager.SetTaskContentMemberValue(RN, 1, "", false);  
    }


};

function cleartextvalue() { 
    var clr = "";
    if (document.getElementById('Yes1').checked == true) {
        $("#Town1").val(clr);
        $("#State1").val(clr);
    }
    if (document.getElementById('Yes2').checked == true) {
        $("#Text9").val(clr);
        $("#Text10").val(clr);
    }
    if (document.getElementById('Yes3').checked == true) {
        $("#Text7").val(clr);
        $("#Text8").val(clr);
    }
    if (document.getElementById('Yes4').checked == true) {
        $("#Text4").val(clr);
        $("#Text5").val(clr);
    }
    if (document.getElementById('Yes5').checked == true) {
        $("#Text12").val(clr);
        $("#Text13").val(clr);
    }
    if (document.getElementById('Yes6').checked == true) {
        $("#Text16").val(clr);
        $("#Text17").val(clr);
    }

}

var ValidationMessage;
$().ready(function () {


    OBPager.GetMaster(13, "RelationshipList");
    OBPager.GetMaster(218, "MaritalList");
    OBPager.GetMaster(219, "GenderList");

    //Prefill the values at the first time when task not even saved 
    if (OBPager.taskStatusFlag == -1) {

        OBPager.SetTaskContentMemberValue('ESIForm.Name', null, TaskPrefillValues.PrefillValues.Set1.Name, false);
        OBPager.SetTaskContentMemberValue('ESIForm.DateOfBirth', null, TaskPrefillValues.PrefillValues.Set1.DOB, false);
        OBPager.SetTaskContentMemberValue('ESIForm.Gender', null, TaskPrefillValues.PrefillValues.Set1.Gender, false);
        OBPager.SetTaskContentMemberValue('ESIForm.MaritalStatus', null, TaskPrefillValues.PrefillValues.Set1.MaritalStatus, false);
        OBPager.SetTaskContentMemberValue('ESIForm.RelationName', null, TaskPrefillValues.PrefillValues.Set1.RelationName, false);
        OBPager.SetTaskContentMemberValue('ESIForm.DateOfApp', null, TaskPrefillValues.PrefillValues.Set1.DOJ, false);
        OBPager.SetTaskContentMemberValue('ESIForm.PresentAddress', null, TaskPrefillValues.PrefillValues.Set2.PresentAddress, false);
        OBPager.SetTaskContentMemberValue('ESIForm.PermanentAddress', null, TaskPrefillValues.PrefillValues.Set2.PermanentAddress, false);
        OBPager.SetTaskContentMemberValue('ESIForm.EmployersCode', null, TaskPrefillValues.PrefillValues.Set2.EmployersCode, false);
        OBPager.SetTaskContentMemberValue('ESIForm.AddressOfEmp', null, TaskPrefillValues.PrefillValues.Set2.AddressOfEmp, false);

        document.getElementById('fRelation1').value = 1;
        document.getElementById('Select2').value = 2;
        OBPager.SetTaskContentMemberValue('ESIForm.Group1.RelationShip', 1, 1, false);

        OBPager.SetTaskContentMemberValue('ESIForm.Group2.RelationShip', 1, 2, true);

    }



    jQXB.doBind(OBPager.taskContentDSName);
    OBPager.ShowPage(1);


    if ($('#No1').is(':checked')) {
        $('#Town1').attr('disabled', false);
        $('#State1').attr('disabled', false);


    }


    if ($('#No2').is(':checked')) {
        $('#Text9').attr('disabled', false);
        $('#Text10').attr('disabled', false);
    }


    if ($('#No3').is(':checked')) {
        $('#Text7').attr('disabled', false);
        $('#Text8').attr('disabled', false);
    }


    if ($('#No4').is(':checked')) {
        $('#Textt4').attr('disabled', false);
        $('#Text5').attr('disabled', false);
    }

    if ($('#No5').is(':checked')) {
        $('#Text12').attr('disabled', false);
        $('#Text13').attr('disabled', false);
    }

    if ($('#No6').is(':checked')) {
        $('#Text16').attr('disabled', false);
        $('#Text17').attr('disabled', false);
    }

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
        // Set member value manually
        OBPager.SetTaskContentMemberValue('ESIForm.Name', null, TaskPrefillValues.PrefillValues.Set1.Name, false);
        OBPager.SetTaskContentMemberValue('ESIForm.DateOfBirth', null, TaskPrefillValues.PrefillValues.Set1.DOB, false);
        OBPager.SetTaskContentMemberValue('ESIForm.Gender', null, TaskPrefillValues.PrefillValues.Set1.Gender, false);
        OBPager.SetTaskContentMemberValue('ESIForm.MaritalStatus', null, TaskPrefillValues.PrefillValues.Set1.MaritalStatus, false);
        OBPager.SetTaskContentMemberValue('ESIForm.RelationName', null, TaskPrefillValues.PrefillValues.Set1.RelationName, false);
        OBPager.SetTaskContentMemberValue('ESIForm.DateOfApp', null, TaskPrefillValues.PrefillValues.Set1.DOJ, false);
        OBPager.SetTaskContentMemberValue('ESIForm.PresentAddress', null, TaskPrefillValues.PrefillValues.Set2.PresentAddress, false);
        OBPager.SetTaskContentMemberValue('ESIForm.PermanentAddress', null, TaskPrefillValues.PrefillValues.Set2.PermanentAddress, false);
        OBPager.SetTaskContentMemberValue('ESIForm.EmployersCode', null, TaskPrefillValues.PrefillValues.Set2.EmployersCode, false);
        OBPager.SetTaskContentMemberValue('ESIForm.AddressOfEmp', null, TaskPrefillValues.PrefillValues.Set2.AddressOfEmp, false);


        document.getElementById('fRelation1').value = 1;
        document.getElementById('Select2').value = 2;
        OBPager.SetTaskContentMemberValue('ESIForm.Group1.RelationShip', 1, 1, false);
        OBPager.SetTaskContentMemberValue('ESIForm.Group2.RelationShip', 1, 2, true);
        jQXB.doBind(OBPager.taskContentDSName);
    }
}



$(function () {
    $("#date").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar', yearRange: "-100:+0",
        maxDate: "0", showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    });
    $("#Text1").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar', yearRange: "-100:+0",
        maxDate: "0", showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    });
    $("#Text2").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar', yearRange: "-100:+0",
        maxDate: "0", showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    });
    $("#Text4").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar', yearRange: "-100:+0",
        maxDate: "0", showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    });
    $("#Text6").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar', yearRange: "-100:+0",
        maxDate: "0", showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    });
    $("#Text11").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar', yearRange: "-100:+0",
        maxDate: "0", showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    });
    $("#Text15").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar', yearRange: "-100:+0",
        maxDate: "0", showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    });


});



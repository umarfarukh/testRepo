
/* Make this statement in end of script - as data loading and other predata filling works has to be completed */
//Display default page on load
$().ready(function () {
    // Set member value manually

    $("#Pg_1_text_Date").val(TaskPrefillValues.PrefillValues.Set1.Date);
    $("#Pg_1_text_Date1").val(TaskPrefillValues.PrefillValues.Set1.Date);
    $("#Pg_1_text_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_1_text_CandidateAddress").val(TaskPrefillValues.PrefillValues.Set1.CandidateAddress);

    if (OBPager.taskStatusFlag == "-1") {
        $("#Pg_1_text_AgencyName").val("Enter your Agency Name");
        document.getElementById('Pg_1_text_AgencyName').style.color = "grey";
        OBPager.SetTaskContentMemberValue('NDAForm.AgencyName', null, "Enter your Agency Name", false);
        document.getElementById('Pg_1_text_AgencyAddress').style.color = "grey";
        $("#Pg_1_text_AgencyAddress").val("Enter your Agency Address");
        OBPager.SetTaskContentMemberValue('NDAForm.AgencyAddress', null, "Enter your Agency Address", true);
    }
    else {

        /* Setting member value manually */
        if (TaskPrefillValues.PrefillValues.Set1.AgencyName == null) {
            $("#Pg_1_text_AgencyName").val("Enter your Agency Name");
            document.getElementById('Pg_1_text_AgencyName').style.color = "grey";
        }
        if (TaskPrefillValues.PrefillValues.Set1.AgencyAddress == null) {
            $("#Pg_1_text_AgencyAddress").val("Enter your Agency Address");
            document.getElementById('Pg_1_text_AgencyAddress').style.color = "grey";
        }
        if (TaskPrefillValues.PrefillValues.Set1.AgencyName != null) {
            OBPager.SetTaskContentMemberValue('NDAForm.AgencyName', null, TaskPrefillValues.PrefillValues.Set1.AgencyName, true);
        }
        if (TaskPrefillValues.PrefillValues.Set1.AgencyAddress != null) {
            OBPager.SetTaskContentMemberValue('NDAForm.AgencyAddress', null, TaskPrefillValues.PrefillValues.Set1.AgencyAddress, true);
        }
    }
    DisableCutCopyPaste();
    OBPager.ShowPage(1);
});



function SaveTaskData(saveMode) {


    // saveMode { 0:Save, 1:Submit }
    if (saveMode == 1) {
        if (validate.ValidateSubmit() == true) {
                if ($("#Pg_1_text_AgencyName").val() == "Enter your Agency Name") {
                    $("#Pg_1_text_AgencyName").val("");
                    OBPager.SetTaskContentMemberValue('NDAForm.AgencyName', null, "", true);

                }
                if ($("#Pg_1_text_AgencyAddress").val() == "Enter your Agency Address") {
                    $("#Pg_1_text_AgencyAddress").val("");
                    OBPager.SetTaskContentMemberValue('NDAForm.AgencyAddress', null, "", true);

                }
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
            //  }
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


function ClearDefaultAgencyName() {
    document.getElementById('Pg_1_text_AgencyName').style.color = "black";
   // if (OBPager.taskStatusFlag == "-1") {
        if ($("#Pg_1_text_AgencyName").val() == "Enter your Agency Name") {
            $("#Pg_1_text_AgencyName").val("");
          //  OBPager.SetTaskContentMemberValue('NDAForm.AgencyName', null, "", true);

        }
  //  }
//    else {
        /* Setting member value manually */
        if ((TaskPrefillValues.PrefillValues.Set1.AgencyName == null) && ($("#Pg_1_text_AgencyName").val() == "")) {
            $("#Pg_1_text_AgencyName").val("");
           // OBPager.SetTaskContentMemberValue('NDAForm.AgencyName', null, "", true);
        }
        
 //}
}
function ClearDefaultAgencyAddress() {
    document.getElementById('Pg_1_text_AgencyAddress').style.color = "black";
   // if (OBPager.taskStatusFlag == "-1") {
        if ($("#Pg_1_text_AgencyAddress").val() == "Enter your Agency Address") {
            $("#Pg_1_text_AgencyAddress").val("");
         //   OBPager.SetTaskContentMemberValue('NDAForm.AgencyAddress', null, "", true);

        }
   // }
   // else {
        if ((TaskPrefillValues.PrefillValues.Set1.AgencyAddress == null) && ($("#Pg_1_text_AgencyAddress").val() == "")) {
            $("#Pg_1_text_AgencyAddress").val("");
          //  OBPager.SetTaskContentMemberValue('NDAForm.AgencyAddress', null, "", true);
        }
   // }
}
function ResetTaskData() {
OBPager.ResetTaskContent();
    
  //  OBPager.ResetTaskContent();
    // Set member value manually

}

function DisableCutCopyPaste() {
    $('#Pg_1_text_AgencyName').live("cut copy paste", function (e) {
        e.preventDefault();
    });
    $('#Pg_1_text_AgencyAddress').live("cut copy paste", function (e) {
        e.preventDefault();
    });

}
//$().ready(function () { OBPager.ShowPage(1); });

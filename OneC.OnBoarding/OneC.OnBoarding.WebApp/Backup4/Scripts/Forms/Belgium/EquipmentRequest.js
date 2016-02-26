$().ready(function () {
    $(document).bind("contextmenu", function (e) {
        return false;
    });
    OBPager.ShowPage(1);



    //    OBPager.GetMaster(60, "OfficeAddress");
    OBPager.GetMaster(179, "CEShippingLocation");
    OBPager.GetMaster(180, "LaptopKeyboardLanguage");
    OBPager.GetMaster(185, "Equipment");
    $("#Pg_1_text_CandidateId").val(TaskPrefillValues.PrefillValues.Set1.CandidateId);
    $("#Pg_1_label_Name").val(TaskPrefillValues.PrefillValues.Set1.Name);
    $("#Pg_1_text_CandidateFName").val(TaskPrefillValues.PrefillValues.Set1.CandidateFName);
    $("#Pg_1_text_CandidateLName").val(TaskPrefillValues.PrefillValues.Set1.CandidateLName);
    $("#Pg_1_text_Designation").val(TaskPrefillValues.PrefillValues.Set1.Designation);
    $("#Pg_1_text_joiningLocation").val(TaskPrefillValues.PrefillValues.Set1.JoiningLocation);
    $("#Pg_1_text_Requestdate").val(TaskPrefillValues.PrefillValues.Set1.RequestInitiationDate);
    //$("#Pg_1_text_SLAdate").val(TaskPrefillValues.PrefillValues.Set1.SLADate);

    $("#LTKeyboard1").hide();
    $("#Equipment2").hide();
    $("#LTKeyboard2").hide();
    $("#Equipment3").hide();
    $("#LTKeyboard3").hide();
    $("#Equipment4").hide();
    $("#LTKeyboard4").hide();

    //    var Equipment1;
    //    Equipment1 = JSON.parse(OBPager.strFormDetails).Equipment.Equipment1;

    //    //    if ((Equipment1 == undefined)) {
    //    //        $("#add_1").show();
    //    //    }
    //    //    else {
    //    //        $("#add_1").hide();
    //    //    }

    var Instuctions;
    Instuctions = JSON.parse(OBPager.strFormDetails).Equipment.Accept;

    if (Instuctions == '1' || Instuctions == 'true') {
        $("#Details").show();
    }
    else {
        $("#Details").hide();
    }

    var KeyBoard1;
    KeyBoard1 = JSON.parse(OBPager.strFormDetails).Equipment.LTKeyboard1;

    if ((KeyBoard1 == undefined)) {
        $("#LTKeyboard1").hide();
        //$("#add_2").show();
    }
    else {
        $("#LTKeyboard1").show();
    }
    //    else if ((KeyBoard1 != undefined) && (Equipment1 != 1)) {
    //        $("#LTKeyboard1").hide();
    //        //$("#add_2").show();
    //    }
    //    else {
    //        $("#LTKeyboard1").show();
    //        //$("#add_2").hide();
    //    }

    var Equipment2;
    Equipment2 = JSON.parse(OBPager.strFormDetails).Equipment.Equipment2;

    if ((Equipment2 == undefined)) {
        $("#Equipment2").hide();
        //$("#add_3").show();
    }
    else {
        $("#Equipment2").show();
        $("#add_1").hide();
        $("#add_2").show();
        $("#remove_1").show();

    }

    var KeyBoard2;
    KeyBoard2 = JSON.parse(OBPager.strFormDetails).Equipment.LTKeyboard2;

    if (KeyBoard2 == undefined) {
        $("#LTKeyboard2").hide();
        //$("#add_4").show();
    }
    //    else if ((KeyBoard2 != undefined) && (Equipment2 != 1)) {
    //        $("#LTKeyboard2").hide();
    //        //$("#add_4").show();
    //    }
    else {
        $("#LTKeyboard2").show();
        //$("#add_4").hide();
    }

    var Equipment3;
    Equipment3 = JSON.parse(OBPager.strFormDetails).Equipment.Equipment3;

    if ((Equipment3 == undefined)) {
        $("#Equipment3").hide();
        //$("#add_5").hide();
    }
    else {
        $("#Equipment3").show();
        $("#add_2").hide();
        $("#add_3").show();
        $("#remove_2").show();
        $("#remove_1").hide();
    }

    var KeyBoard3;
    KeyBoard3 = JSON.parse(OBPager.strFormDetails).Equipment.LTKeyboard3;

    if (KeyBoard3 == undefined) {
        $("#LTKeyboard3").hide();
        //$("#add_6").show();
    }
    //    else if ((KeyBoard3 != undefined) && (Equipment3 != 1)) {
    //        $("#LTKeyboard3").hide();
    //        //$("#add_6").show();
    //    }
    else {
        $("#LTKeyboard3").show();
        //$("#add_6").hide();
    }

    var Equipment4;
    Equipment4 = JSON.parse(OBPager.strFormDetails).Equipment.Equipment4;

    if ((Equipment4 == undefined)) {
        $("#Equipment4").hide();
    }
    else {
        $("#Equipment4").show();
        $("#add_3").hide();
        $("#remove_3").show();
        $("#remove_2").hide();
    }

    var KeyBoard4;
    KeyBoard4 = JSON.parse(OBPager.strFormDetails).Equipment.LTKeyboard4;

    if (KeyBoard4 == undefined) {
        $("#LTKeyboard4").hide();
    }
    //    else if ((KeyBoard4 != undefined) && (Equipment4 != 1)) {
    //        $("#LTKeyboard4").hide();
    //    }
    else {
        $("#LTKeyboard4").show();
    }

    //    //Equipment1,Equipment2,Equipment3,Equipment4
    //    //KeyBoard1,KeyBoard2,KeyBoard3,KeyBoard4

    //    //1
    //    if ((Equipment1 == undefined)) {
    //        $("#add_1").show();
    //    }
    //    else {
    //        $("#add_1").hide();
    //    }

    //    if ((KeyBoard1 != undefined) && (Equipment2 == undefined)) {
    //        $("#add_2").show();
    //        $("#add_1").hide();
    //    }
    //    else {
    //        $("#add_2").hide();
    //    }

    //    //2
    //    if ((Equipment2 == undefined)) {
    //        $("#add_3").show();
    //    }
    //    else {
    //        if (Equipment3 == undefined) {
    //            $("#add_3").show();
    //        }
    //        else {
    //            $("#add_3").hide();
    //        }
    //    }

    //    if ((KeyBoard2 != undefined) && (Equipment3 == undefined)) {
    //        $("#add_4").show();
    //        $("#add_3").hide();
    //    }
    //    else {
    //        $("#add_4").hide();
    //    }

    //    //3
    //    if ((Equipment3 == undefined)) {
    //        $("#add_5").show();
    //    }
    //    else {
    //        if (Equipment4 == undefined) {
    //            $("#add_5").show();
    //        }
    //        else{
    //            $("#add_5").hide();
    //        }
    //    }

    //    if ((KeyBoard3 != undefined) && (Equipment4 == undefined)) {
    //        $("#add_6").show();
    //        $("#add_5").hide();
    //    }
    //    else {
    //        $("#add_6").hide();
    //    }

    //var a = $("#Pg_1_text_LTEquipment").val()

    if (OBPager.taskStatusFlag == "-1") {
        OBPager.SetTaskContentMemberValue('Equipment.CandidateId', null, TaskPrefillValues.PrefillValues.Set1.CandidateId, false);
        OBPager.SetTaskContentMemberValue('Equipment.CandidateFName', null, TaskPrefillValues.PrefillValues.Set1.CandidateFName, false);
        OBPager.SetTaskContentMemberValue('Equipment.CandidateLName', null, TaskPrefillValues.PrefillValues.Set1.CandidateLName, false);
        OBPager.SetTaskContentMemberValue('Equipment.RequestDate', null, TaskPrefillValues.PrefillValues.Set1.RequestInitiationDate, false);
        //OBPager.SetTaskContentMemberValue('Equipment.SLADate', null, TaskPrefillValues.PrefillValues.Set1.SLADate, false);
        OBPager.SetTaskContentMemberValue('Equipment.Designation', null, TaskPrefillValues.PrefillValues.Set1.Designation, false);
        OBPager.SetTaskContentMemberValue('Equipment.JoiningLocation', null, TaskPrefillValues.PrefillValues.Set1.JoiningLocation, false);

    }
    jQXB.doBind(OBPager.taskContentDSName);


});

function changeEquipment(EqVal) {
    var Eq1val = $("#Pg_1_text_Equipment1").val()
    if (EqVal == 1) {
        if (Eq1val == 1) {
            //document.getElementById("#LTKeyboard1").style.display="none";
            $("#LTKeyboard1").show();
            //            $("#add_1").hide();
            //            $("#add_2").show();
        }
        else {
            OBPager.SetTaskContentMemberValue('Equipment.LTKeyboard1', null, '', false);
            $("#LTKeyboard1").hide();
            //            $("#add_1").show();
            //            $("#add_2").hide();
        }
    }
    var Eq2Val = $("#Pg_1_text_Equipment2").val();
    if (EqVal == 2) {
        if (Eq2Val == 1) {
            $("#LTKeyboard2").show();
            //            $("#add_3").hide();
            //            $("#add_4").show();
        }
        else {
            OBPager.SetTaskContentMemberValue('Equipment.LTKeyboard2', null, '', false);
            $("#LTKeyboard2").hide();
            //            $("#add_2").hide();
            //            $("#add_3").show();
            //            $("#add_4").hide();
        }
    }
    var Eq3Val = $("#Pg_1_text_Equipment3").val();
    if (EqVal == 3) {
        if (Eq3Val == 1) {
            $("#LTKeyboard3").show();
            //            $("#add_4").hide();
            //            $("#add_5").hide();
            //            $("#add_6").show();
        }
        else {
            OBPager.SetTaskContentMemberValue('Equipment.LTKeyboard3', null, '', false);
            $("#LTKeyboard3").hide();
            //            $("#add_4").hide();
            //            $("#add_5").show();
            //            $("#add_6").hide();
        }
    }
    var Eq4Val = $("#Pg_1_text_Equipment4").val();
    if (EqVal == 4) {
        if (Eq4Val == 1) {
            $("#LTKeyboard4").show();
            //            $("#add_5").hide();
            //            $("#add_6").hide();
        }
        else {
            OBPager.SetTaskContentMemberValue('Equipment.LTKeyboard4', null, '', false);
            $("#LTKeyboard4").hide();
            //            $("#add_5").hide();
            //            $("#add_6").hide();
        }
    }
}

function Instructions() {

    if ($("#Instruction").is(':checked')) {
        $("#Details").show();
        OBPager.SetTaskContentMemberValue('Equipment.Accept', 1, '1', false);
    }
    else {
        $("#Details").hide();
        OBPager.SetTaskContentMemberValue('Equipment.Accept', 1, '', false);

    }

}

function addEquipment(Add) {
    //    var Eq1Val = $("#Pg_1_text_LTEquipment").val();
    //    if ((Eq1Val == '-1' || Eq1Val == 'undefined') && (Add == 1)) {
    //        alert('please select an equipment');
    //    }
    //    else {
    if (Add == 1) {
        $('#Pg_1_text_Equipment1').addClass('textMandatory');
        $("#Equipment2").show();
        $("#add_2").show();
        $("#remove_1").show();
        $("#add_1").hide();
        //            $("#add_1").hide();
        //            $("#add_2").hide();
    }
    //    }
    //    var x = $("#Pg_1_text_BBEquipment").val();
    //    if ((x == '-1' || x == 'undefined') && (a == 2)) {
    //        alert('please select an equipment');
    //    }

    //    else {
    else if (Add == 2) {
        $('#Pg_1_text_Equipment2').addClass('textMandatory');
        $("#Equipment3").show();
        $("#add_3").show();
        $("#remove_2").show();
        $("#add_2").hide();
        $("#remove_1").hide();
        //            $("#add_3").hide();
        //            $("#add_4").hide();


    }
    //    }

    //    var x = $("#Pg_1_text_PhoneEquipment").val();
    //    if ((x == '-1' || x == 'undefined') && (a == 3)) {
    //        alert('please select an equipment');
    //    }
    //    else {
    else if (Add == 3) {
        $('#Pg_1_text_Equipment3').addClass('textMandatory');
        $("#Equipment4").show();
        $("#remove_3").show();
        $("#add_3").hide();
        $("#remove_2").hide();
        //            $("#add_5").hide();
        //            $("#add_6").hide();
    }
    //    }

}

function removeEquipment(Remove) {
    if (Remove == 1) {
        OBPager.SetTaskContentMemberValue('Equipment.LTKeyboard2', null, '', false);
        OBPager.SetTaskContentMemberValue('Equipment.Equipment2', null, '', false);
        $("#Pg_1_text_LTKeyboard2").val('-1');
        $("#Pg_1_text_Equipment2").val('-1');
        $("#LTKeyboard2").hide();
        $("#Equipment2").hide();
        $("#add_2").hide();
        $("#remove_1").hide();
        $("#add_1").show();

    }
    else if (Remove == 2) {
        OBPager.SetTaskContentMemberValue('Equipment.LTKeyboard3', null, '', false);
        OBPager.SetTaskContentMemberValue('Equipment.Equipment3', null, '', false);
        $("#Pg_1_text_LTKeyboard3").val('-1');
        $("#Pg_1_text_Equipment3").val('-1');
        $("#LTKeyboard3").hide();
        $("#Equipment3").hide();
        $("#add_3").hide();
        $("#remove_2").hide();
        $("#remove_1").show();
        $("#add_2").show();
    }
    else if (Remove == 3) {
        OBPager.SetTaskContentMemberValue('Equipment.LTKeyboard4', null, '', false);
        OBPager.SetTaskContentMemberValue('Equipment.Equipment4', null, '', false);
        $("#Pg_1_text_LTKeyboard4").val('-1');
        $("#Pg_1_text_Equipment4").val('-1');
        $("#LTKeyboard4").hide();
        $("#Equipment4").hide();
        $("#remove_3").hide();
        $("#add_3").show();
        $("#remove_2").show();

    }

}

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
    //PrePopulateValues();
    if (OBPager.taskStatusFlag == -1) {
        OBPager.SetTaskContentMemberValue('Equipment.CandidateId', null, TaskPrefillValues.PrefillValues.Set1.CandidateId, false);
        OBPager.SetTaskContentMemberValue('Equipment.CandidateFName', null, TaskPrefillValues.PrefillValues.Set1.CandidateFName, false);
        OBPager.SetTaskContentMemberValue('Equipment.CandidateLName', null, TaskPrefillValues.PrefillValues.Set1.CandidateLName, false);
        OBPager.SetTaskContentMemberValue('Equipment.RequestDate', null, TaskPrefillValues.PrefillValues.Set1.RequestInitiationDate, false);
        //OBPager.SetTaskContentMemberValue('Equipment.SLADate', null, TaskPrefillValues.PrefillValues.Set1.SLADate, false);
        OBPager.SetTaskContentMemberValue('Equipment.Designation', null, TaskPrefillValues.PrefillValues.Set1.Designation, false);
        OBPager.SetTaskContentMemberValue('Equipment.JoiningLocation', null, TaskPrefillValues.PrefillValues.Set1.JoiningLocation, false);
        $("#Pg_1_text_LTKeyboard1").val('-1');
        $("#Pg_1_text_LTKeyboard2").val('-1');
        $("#Pg_1_text_LTKeyboard3").val('-1');
        $("#Pg_1_text_LTKeyboard4").val('-1');
        $("#Pg_1_text_Equipment1").val('-1');
        $("#Pg_1_text_Equipment2").val('-1');
        $("#Pg_1_text_Equipment3").val('-1');
        $("#Pg_1_text_Equipment4").val('-1');
        $("#Pg_1_dd_shippinglocation").val('-1');
        jQXB.doBind(OBPager.taskContentDSName);
    }
}

$().ready(function () { OBPager.ShowPage(1); });
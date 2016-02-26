
$().ready(function () {
    OBPager.ShowPage(1);

});
    // alert(OBPager.taskStatusFlag);
//    if (TaskPrefillValues.PrefillValues.Set1.AssociateId == null)
//        $('#delete').attr('disabled', true);
//    if (OBPager.taskStatusFlag == 1) {
//        if ($('#test').val() != '') {
//            var text = JSON.parse(OBPager.strFormDetails).StateW4Form.UploadText;
//            $('#message').html(text).show()
//            $('#messageContent').show();
//            $('#Pg_1_button_Upload').removeAttr('onclick').attr('onclick', 'alert("Single File is allowed")');
//        }
//    }




//function UploadFormDetails(flag) {
//    var fileText = $('#Pg_1_text_FileUploadtext').val();

//    var checkFlag = flag;
//    var filepath = fileText.replace(/\\/g, "\\\\");

//    var s = filepath.split('\\');
//    var file = s[s.length - 1];

//    //    $.ajax({
//    //        url: filepath,
//    //        context: document.body,
//    //        success: function ()
//    //       { $(this).addClass("done"); } }); 

//  





//    var data = "{";
//    data += "'sessionId':" + OBPager.sessionId.toString() + ","
//    data += "'candidateId':" + OBPager.candidateId.toString() + ",";
//    data += "'taskId':" + OBPager.taskId.toString() + ",";
//    data += "'filepath':'" + filepath + "',";
//    data += "'flag':" + checkFlag;
//    data += "}";

//    var imageRegex = /([^\s]+(?=\.(pdf))\.\2)/gm;
//    //   alert(file[0].size);
//    if (file.match(imageRegex) != null) {

//        alert(data);


//        if (checkFlag == 0) {
//            $.ajax({
//                type: "POST",
//                url: "../../../../FormsService.aspx/UploadFormDetails",
//                data: data,
//                contentType: "application/json; charset=utf-8",
//                dataType: "json",
//                success: function (result) {

//                    $('#messageContent').show();
//                    $('#message').html(file).show().next().show();
//                    OBPager.SetTaskContentMemberValue('StateW4Form.UploadText', null, file, true);
//                    SaveTaskData(1);
//                },
//                error: function (xhr, status, textRemarks) {
//                    var errorMsg = xhr.responseText;
//                    var errMsg = JSON.parse(errorMsg).Message;
//                    //alert("Error : " + xhr.status + " " + textRemarks);
//                    alert(errMsg);
//                    isActive = false;
//                }

//            });
//        }
//        else {
//            $('#messageContent').show();
//            $('#message').html('Please Upload pdf file').show().next().hide();
//            OBPager.SetTaskContentMemberValue('StateW4Form.UploadText', null, '', true);

//        }

//    }
//    if (checkFlag == 1) {
//        $.ajax({
//            type: "POST",
//            url: "../../../../FormsService.aspx/UploadFormDetails",
//            data: data,
//            contentType: "application/json; charset=utf-8",
//            dataType: "json",
//            success: function (result) {
//                SaveTaskData(0);
//                $('#messageContent').show();
//                $('#message').text("File is deleted").next().hide();
//                $('#Pg_1_button_Upload').removeAttr('onclick').attr('onclick', 'UploadFormDetails(0)');
//                OBPager.SetTaskContentMemberValue('StateW4Form.UploadText', null, '', true);
//            },
//            error: function (xhr, status, textRemarks) {
//                alert("Error : " + xhr.status + " " + textRemarks);
//                isActive = false;
//            }

//        });

//    }

//}
function savetaskdata(savemode) {
    // savemode { 0:save, 1:submit }
    if (savemode == 1) {
        //  if (validate.validatesubmit() == true) {
        if (obpager.validatetaskdata(savemode) == true) {
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
                alert(e.message);
            }
        }
        else {

            msgboxinfo(obpager.validationmessage);
            //   }
        }
    }
    else {

        try {
            if (obpager.savetaskdata(savemode) == true) {
                //alert('task saved successfully');
                return true;
            }
            else {
                // alert('error occured while saving the task');
                msgboxinfo('error occured while saving the task')
                return false;
            }
        }
        catch (e) {
            alert(e.message);
        }
    }


}



function ResetTaskData() {


    OBPager.ResetTaskContent();
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

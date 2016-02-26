var ValidationMessage;
var childWin;


var UploadStatus = { PendingWithAdminforApproval: 0, PhotoApproveNameReject: 1, PhotoRejectNameApprove: 2, PhotoApproveNamePending: 3, PhotoandNameApprove: 4, PhotoandNameReject: 5, NameApprovedPhotoPending: 6, IDCardPrinted: 9 };
(function ($) { $.QueryString = (function (a) { if (a == "") return {}; var b = {}; for (var i = 0; i < a.length; ++i) { var p = a[i].split('='); if (p.length != 2) continue; b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " ")); } return b; })(window.location.search.substr(1).split('&')) })(jQuery);
$().ready(function () {
    try { window.parent.opener.enablepopUp(); } catch (e) { }
    var qs = $.QueryString;
    var txtFNameCntrl = document.getElementById('firstName');
    var txtLNameCntrl = document.getElementById('lastName');

    document.getElementById("UpdatePrintStatus").style.display = "none";
    document.getElementById("lblNote").style.display = "none";
    //    $('#UpdatePrintStatus').hide();
    //    $('#lblNote').hide();
    //first time Logins
    if (OBPager.taskStatusFlag == -1) {
        OBPager.SetTaskContentMemberValue('PhotoUpload.loginId', null, TaskPrefillValues.PrefillValues.Set1.LoginId, false);
        OBPager.SetTaskContentMemberValue('PhotoUpload.FirstName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
        OBPager.SetTaskContentMemberValue('PhotoUpload.LastName', null, TaskPrefillValues.PrefillValues.Set1.LastName, false);
        $("#firstName").val(TaskPrefillValues.PrefillValues.Set1.FirstName);
        $("#lastName").val(TaskPrefillValues.PrefillValues.Set1.LastName);
        $("#adminfirstName").val(TaskPrefillValues.PrefillValues.Set1.FirstName);
        $("#adminlastName").val(TaskPrefillValues.PrefillValues.Set1.LastName);
        //$("#adminDeliveryAddress").val(TaskPrefillValues.PrefillValues.Set4.ShippingAddress);
    }
    //check the querystring param for View(admin or candidate)
    if (qs["admin"] == undefined) {
        $('#nameDivAdminView').hide();
        if (txtFNameCntrl.value != null && txtLNameCntrl.value != null) {
            var txtNameCntrl = txtFNameCntrl.value.length + txtLNameCntrl.value.length;
        }
        //if the FirstName+last name(prefilled values) length exceeds 20 enable the textboxes
        if (txtNameCntrl <= 19) {
            $('#firstName').attr('disabled', true);
            $('#lastName').attr('disabled', true);
        }
        else {

            $('#firstName').attr('disabled', false);
            $('#lastName').attr('disabled', false);
        }

    }
    else {
        $('#nameDivAdminView').show();
        $('#hdnCandidateID').val(qs["cand"]);
    }
    GetFileUploadDetails();


});

///Getting the Central rep file upload details and the File upload details in xml too

function GetFileUploadDetails() {


    var qs = $.QueryString;
    var data = "{";
    data += "'sessionId':" + OBPager.sessionId.toString() + ","
    data += "'candidateId':" + OBPager.candidateId.toString() + ",";
    data += "'taskId':'" + OBPager.taskId.toString() + "'" + ",";
    data += "'countryId':'" + OBPager.countryId.toString() + "'";
    data += "}";

    $.ajax({
        type: "POST",
        url: "../../../../FormsService.aspx/GetFileUploadDetails",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: AjaxSucceeded,
        error: function (result) {
            alert(result.responseText);
        }
    });

}
//if succeeded do the locking for admin/candidate View
function AjaxSucceeded(result) {
    response = result.d;
    var status = "0";
    var fileUploadId = 0;
    var fileUploadUrl = "";
    var adminView = false;

    /*To Enable Form Even Afte AssocaiteID Generation for ADMIN */
    if (response[0].TaskStatus == 2 && qs["admin"] == 1) {
        $('input').removeAttr("disabled");
        $('select').removeAttr("disabled");
    }
    //Enable the note
    if (qs["admin"] == undefined && response[0]["FileUploadStatus"] == "-1") {
        $('#noteForUpload').show();
    }
    else {
        $('#noteForUpload').hide();
    }
    //If the query string contains value it is redirected from admin page
    if (qs["admin"] != undefined) {
        adminView = true;

        $('#nameDivCandidateView').hide();
        $('#adminfirstName').attr('disabled', true);
        $('#adminlastName').attr('disabled', true);
        //$('#adminDeliveryAddress').attr('disabled', true);
        $("#adminfirstName").val(TaskPrefillValues.PrefillValues.Set1.FirstName);
        $("#adminlastName").val(TaskPrefillValues.PrefillValues.Set1.LastName);
        //$("#adminDeliveryAddress").val(TaskPrefillValues.PrefillValues.Set4.ShippingAddress);
        //        if (qs["cntry"] != 4) {

        //            $('#lblDeliveryAddress').hide();
        //            $('#adminDeliveryAddress').hide();
        //        }
    }
    //if the file scan is failed (2) show the message to the candidate
    if (response[0]["FileScanStatus"] == "2") {
        var statusDesc = response[0]["FileUploadStatusDesc"];
        document.getElementById("errorLabel1").innerHTML = "Scanning failed.Please Upload a new image";
        document.getElementById("errorLabel").innerHTML = "";
        if (statusDesc != null)
            document.getElementById("errorLabel").innerHTML = statusDesc;
    }
    //if the file scan is in progress(0) show the message to the candidate
    else if (response[0]["FileScanStatus"] == "0" && response[0]["ModifiedDate"] == null) {
        var statusDesc = response[0]["FileUploadStatusDesc"];
        document.getElementById("errorLabel1").innerHTML = "Scanning in Progress,Kindly Check After 5 Minutes For Scan Status";
        document.getElementById("errorLabel").innerHTML = "";
        if (statusDesc != null)
            document.getElementById("errorLabel").innerHTML = statusDesc;

    }
    //if the sacnning is over and the xml have the Upload status set the status description to the Label
    else {
        var statusDesc = response[0]["FileUploadStatusDesc"];
        document.getElementById("errorLabel1").innerHTML = "";
        if (statusDesc != null)
            document.getElementById("errorLabel").innerHTML = statusDesc;
    }

    //get the file upload status
    if (response[0]["FileUploadStatus"] != -1 && response[0]["FileUploadId"] != 0) {
        status = response[0]["FileUploadStatus"];
        //get the status description



        //set the admin view for the photoupload page
        if (adminView == true) {

            document.getElementById("uploadHeadingSpan").innerHTML = "Approve/Reject";
            $('#acceptRejectDiv').show();
            $('#submitButton').show();
            $('#doneButton').hide();
            $('#imgDiv').show();
            //IF IDCard Pirnted disable Submit Button
            if (status == UploadStatus.IDCardPrinted && qs["cntry"] == 13) {
                $('#submitButton').hide();
            }
            //IF IdCard Print and PhotoandNameApproved  disable Print Button
            if (status == UploadStatus.PhotoandNameApprove && qs["cntry"] == 13) {
                if (status != UploadStatus.IDCardPrinted)
                    document.getElementById("UpdatePrintStatus").style.display = "block";
                document.getElementById("submitButton").style.display = "none";
                //                                    $('#UpdatePrintStatus').show();
                //                                  $('#submitButton').hide();
            }



            //                    $('#photoDiv').hide();
            if (status == UploadStatus.PhotoApproveNamePending || status == UploadStatus.PhotoApproveNameReject) {

                $('#adminUploadDiv').hide();
                $('#Upload1').hide();
                $('#Upload').hide();
                $('#uploadPhotoCheckBox').attr('disabled', true);
                $('#rejectDiv').hide();

            }
            else if (status == UploadStatus.NameApprovedPhotoPending || status == UploadStatus.PhotoRejectNameApprove) {
                $('#adminUploadDiv').show();
                $('#Upload1').show();
                $('#Upload').hide();
                $('#refreshLnk').show();
                $('#displayNameCheckBox').attr('disabled', true);
                $('#nameOnIDCard').attr('disabled', true);
                $('#rejectDiv').hide();
            }
            else if (status == UploadStatus.PhotoandNameApprove || status == UploadStatus.IDCardPrinted) {
                $('#adminUploadDiv').hide();
                $('#rejectDiv').hide();
                $('#Upload1').hide();
                $('#Upload').hide();
                $('#displayNameCheckBox').attr('disabled', true);
                $('#nameOnIDCard').attr('disabled', true);
                $('#uploadPhotoCheckBox').attr('disabled', true);
                document.getElementById("accept_radio").checked = true;
                document.getElementById("accept_radio").disabled = true;
                document.getElementById("reject_radio").checked = false;
                document.getElementById("reject_radio").disabled = true;
            }
            else if (status == UploadStatus.PhotoandNameReject || status == UploadStatus.PendingWithAdminforApproval) {
                $('#adminUploadDiv').show();
                $('#Upload1').show();
                $('#Upload').hide();
                $('#refreshLnk').show();
                $('#displayNameCheckBox').attr('enabled', true);
                $('#uploadPhotoCheckBox').attr('enabled', true);
                $('#remarksTextArea').value = "";
                $('#rejectDiv').hide();

            }
            else {
                $('#adminUploadDiv').show();
                $('#Upload1').show();
                $('#Upload').hide();
                $('#refreshLnk').show();
                $('#displayNameCheckBox').attr('enabled', true);
                $('#uploadPhotoCheckBox').attr('enabled', true);
                $('#remarksTextArea').value = "";
                $('#rejectDiv').hide();
            }
        }
        //set the candidateView for the photo upload page
        else if (adminView == false) {

            //  $('#photoDiv').show();
            $('#submitButton').hide();
            $('#doneButton').show();
            $('#nameOnIDCard').attr('disabled', true);
            $('#nameInfo').hide();
            if (status == UploadStatus.NameApprovedPhotoPending || status == UploadStatus.PhotoandNameApprove || status == UploadStatus.PhotoRejectNameApprove || status == UploadStatus.IDCardPrinted) {
                $('#nameDivAdminView').show();
                $('#adminfirstName').hide();
                $('#adminlastName').hide();
                $('#adminlbllastName').hide();
                $('#adminlblfirstName').hide();
                $('#lblDeliveryAddress').hide();
                //$('#adminDeliveryAddress').hide();
            }
            if (status == UploadStatus.PendingWithAdminforApproval || status == UploadStatus.NameApprovedPhotoPending) {
                $('#firstName').attr('disabled', true);
                $('#lastName').attr('disabled', true);
                $('#imgDiv').show();
                // $('#photoDiv').hide();
                $('#doneButton').attr('disabled', true);
                $('#adminUploadDiv').hide();
                $('#Upload').hide();
                $('#Upload1').hide();
                $('#refreshLnk').hide();
            }
            //Photo Approved By Admin, But Name Rejected(3)
            //Photo shown to user. Name to be displayed can be updated.
            else if (status == UploadStatus.PhotoApproveNameReject) {
                status = UploadStatus.PhotoApproveNamePending;
                $('#firstName').attr('disabled', false);
                $('#lastName').attr('disabled', false);
                $('#imgDiv').show();
                //$('#photoDiv').hide();
                $('#adminUploadDiv').hide();
                $('#Upload').hide();
                $('#Upload1').hide();
                $('#refreshLnk').hide();

            }
            //Photo rejected by Admin, Name Approved(4)
            //Photo needs to be uploaded again. Name field will be disabled
            else if (status == UploadStatus.PhotoRejectNameApprove) {
                status = UploadStatus.NameApprovedPhotoPending;
                $('#firstName').attr('disabled', true);
                $('#lastName').attr('disabled', true);
                $('#imgDiv').show();
                //$('#photoDiv').hide();
                $('#adminUploadDiv').show();
                $('#Upload').show();
                $('#Upload1').hide();
                $('#refreshLnk').show();

            }
            //  Photo and Name approved by Admin or waiting for approval(5)
            //Photo and name to be displayed on ID card shown, with all controls disabled
            else if (status == UploadStatus.PhotoandNameApprove || status == UploadStatus.PhotoApproveNamePending || status == UploadStatus.IDCardPrinted) {

                $('#doneButton').attr('disabled', true);
                $('#firstName').attr('disabled', true);
                $('#lastName').attr('disabled', true);
                $('#imgDiv').show();
                //$('#photoDiv').hide();
                $('#adminUploadDiv').hide();
                $('#Upload1').hide();
                $('#Upload').hide();
                $('#refreshLnk').hide();
            }
            // Photo and Name rejected by Admin(6)
            // Candidate can upload a new photo and update name to be displayed
            else if (status == UploadStatus.PhotoandNameReject) {

                status = UploadStatus.PendingWithAdminforApproval;
                $('#firstName').attr('disabled', false);
                $('#lastName').attr('disabled', false);
                $('#imgDiv').show();
                // $('#photoDiv').hide();
                $('#adminUploadDiv').show();
                $('#Upload').show();
                $('#Upload1').hide();
                $('#refreshLnk').show();

            }

        }
        //candidateView end
    }
    //if the Candidate is not yet started the Photo Upload task
    else {
        if (adminView == false) {
            $('#refreshLnkCandidate').show();
            $('#nameDivAdminView').hide();
            $('#nameOnIDCard').attr('disabled', true);
            $('#nameInfo').hide();
            $('#adminUploadDiv').show();
            $('#Upload').show();
            $('#Upload1').hide();
            $('#imgDiv').show();
        }
        else {
            if (response[0]["FileUploadId"] != 0) {
                document.getElementById("errorLabel1").innerHTML = "Photo Uploaded Successfully";
                $('#nameDivCandidateView').hide();
                $('#nameDivAdminView').show();
                $('#adminUploadDiv').show();
                $('#refreshLnk').show();
                $('#displayNameCheckBox').attr('enabled', true);
                $('#uploadPhotoCheckBox').attr('enabled', true);
                $('#remarksTextArea').value = "";
                $('#acceptRejectDiv').show();
                $('#rejectDiv').hide();
                $('#submitButton').show();
                $('#doneButton').hide();
                $('#Upload1').show();
                $('#Upload').hide();

            }
            else {

                $('#nameDivCandidateView').hide();
                $('#nameDivAdminView').show();
                $('#adminUploadDiv').show();
                $('#refreshLnk').show();
                $('#displayNameCheckBox').attr('enabled', true);
                $('#uploadPhotoCheckBox').attr('enabled', true);
                $('#remarksTextArea').value = "";
                $('#acceptRejectDiv').show();
                $('#rejectDiv').hide();
                $('#submitButton').show();
                $('#doneButton').hide();
                $('#Upload1').show();
                $('#Upload').hide();
            }
        }

    }
    //set the Image Url from the fileupload urtl
    if (response[0]["FileUploadId"] != "0") {
        fileUploadId = response[0]["FileUploadId"];
        fileUploadUrl = response[0]["FileUploadURL"];

        $('#imgUpload1').attr("src", fileUploadUrl);
        if (response[0]["FileUploadStatus"] == -1) {
            $('#imgDiv').show();
            // $('#photoDiv').hide();
            if (adminView == false) {
                $('#adminUploadDiv').show();
                $('#Upload').show();
                $('#Upload1').hide();
            }
            else {
                $('#adminUploadDiv').show();
                $('#Upload1').show();
                $('#Upload').hide();
            }
            $('#refreshLnk').show();
        }



        //set the status,upload Id
        OBPager.SetTaskContentMemberValue('PhotoUpload.FileUploadStatus', null, status, true);
        OBPager.SetTaskContentMemberValue('PhotoUpload.FileUploadId', null, fileUploadId, true);
        OBPager.SetTaskContentMemberValue('PhotoUpload.Remarks', null, "", true);

    }
}
///format the Date to set the rejection Date
function js_yyyy_mm_dd_hh_mm_ss() {

    now = new Date();

    year = "" + now.getFullYear();

    month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }

    day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }

    hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }

    minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }

    second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
    milliSeconds = "" + now.getMilliseconds(); if (milliSeconds.length == 1) { milliSeconds = "0" + milliSeconds; }

    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second + ":" + milliSeconds;
}
//Display rejection Div
function ShowHideDiv(rdClientId) {
    if (rdClientId.defaultValue == "accept") {
        $('#rejectDiv').hide();
        $('#remarksTextArea').value = ""
        $('#displayNameCheckBox').checked = false;
        $('#uploadPhotoCheckBox').checked = false;

    }
    else if (rdClientId.defaultValue == "reject") {
        $('#rejectDiv').show();
    }
}
function UpdatePrintCompleteStatus() {
    var conf = confirm("Are you sure to Update the Status to ID Card Printed?");
    if (conf == true) {
        var inputData = "{";
        inputData += "'sessionId':" + qs["ss"] + ","
        inputData += "'candidateId':" + qs["cand"] + ",";
        inputData += "'taskId':'" + qs["task"] + "'";
        inputData += "}";
        $.ajax({
            type: "POST",
            url: "../../../../FormsService.aspx/UpdatePhotoStatus",
            data: inputData,
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                MsgboxAlert(23, 1, 26, "DATA_UPDATE_SUCCESS", "Data Updated Successfully");
                //  $('#UpdatePrintStatus').hide();
                document.getElementById("UpdatePrintStatus").style.display = "none";
                document.getElementById("errorLabel").innerHTML = "ID Card Printed";

            },
            error: function (result) {
                MsgboxAlert(23, 1, 45, "DATA_UPDATE_FAILURE", "Data Updation Failed");
            }

        });
    }

}
function PhotoUpload() {

    $.ajax({
        type: "POST",
        url: "../../../../FormsService.aspx/BindUrl",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var response = result.d;

            response = response + "?AppId=2&CandidateId=" + OBPager.candidateId;
            var loginUserId = '';
            var windowUri = response + loginUserId + "&AppId=2&AssociateId=" + OBPager.candidateId;
            w = screen.availWidth;
            h = screen.availHeight;
            var popW = 350, popH = 150;
            var leftPos = (w - popW) / 2, topPos = (h - popH) / 2;
            childWin = window.open(windowUri, 'popUpWindow', 'width=' + popW + ',height=' + popH + ',top=' + topPos + ',left=' + leftPos);
            return false;

        },
        error: function (result) {
            alert(result.responseText);
        }

    });


}
function afterChildClose(childWin) {
    if (childWin.closed) {
        alert("closed");
        window.location.reload(true);
    }
    //  return true;
}
//Validate the Name field
function ValidateName() {
    //validate for Name to be displayed
    if (qs["admin"] != undefined) {
        var txtNameCntrl = document.getElementById('nameOnIDCard');
        if (txtNameCntrl.value == null || txtNameCntrl.value == "") {
            alert("Please enter a name to be displayed on ID Card");
            txtNameCntrl.focus();
            return false;
        }
        if (txtNameCntrl.value.length > 20) {
            alert("Name to be displayed can have a maximum of 20 characters only.Please update accordingly.");
            txtNameCntrl.focus();
            return false;

        }

    }
    //candidate View /so validate for FirstName+Lastname
    else {
        var txtFNameCntrl = document.getElementById('firstName');
        var txtLNameCntrl = document.getElementById('lastName');
        var txtNameCntrl = txtFNameCntrl.value + txtLNameCntrl.value;
        if (txtFNameCntrl.value == null || txtFNameCntrl.value == "") {
            alert("Please enter firstName to be displayed on ID Card");
            txtFNameCntrl.focus();
            return false;
        }
        if (txtLNameCntrl.value == null || txtLNameCntrl.value == "") {
            alert("Please enter lastName to be displayed on ID Card");
            txtLNameCntrl.focus();
            return false;
        }
        if (txtFNameCntrl.value == null || txtFNameCntrl.value == "" && txtLNameCntrl.value == null || txtLNameCntrl.value == "") {
            alert("Please enter firstName&lastName to be displayed on ID Card");
            txtFNameCntrl.focus();
            return false;
        }
        if (txtNameCntrl.length > 19) {
            alert("Name to be displayed can have a maximum of 19 characters only.Please update accordingly.");
            txtFNameCntrl.focus();
            return false;

        }
    }
    return true;
}
function ValidatePhoto() {
    var data = "{";
    data += "'sessionId':" + OBPager.sessionId.toString() + ","
    data += "'candidateId':" + OBPager.candidateId.toString() + ",";
    data += "'taskId':'" + OBPager.taskId.toString() + "'" + ",";
    data += "'countryId':'" + OBPager.countryId.toString() + "'";
    data += "}";

    $.ajax({
        type: "POST",
        url: "../../../../FormsService.aspx/GetFileUploadDetails",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            response = result.d;
            var status = "0";
            var fileUploadId = 0;
            fileUploadId = response[0]["FileUploadId"];
            var rejectionDate = response[0]["RejectionDate"];
            var modifiedDate = response[0]["ModifiedDate"];

            //if the photo is not uploaded throw the message
            if (fileUploadId == '0') {
                alert("Please Upload an image.");
                return false;
            }
            else {
                ValidateSubmit();
            }

        },
        error: function (result) {
            alert(result.responseText);
        }

    });
}

//Save Photo Upload Task
function SaveTaskData(saveMode) {

    var saveBstatus = response[0]["FileUploadStatus"];

    if (ValidateName() == true) {

        // saveMode { 0:Save, 1:Submit }
        if (saveMode == 1) {
            // if (validate.ValidateSubmit() == true) {
            if (OBPager.ValidateTaskData(saveMode) == true) {
                try {
                    if (OBPager.SaveTaskData(saveMode) == true) {
                        //call the function for locking/unlocking
                        GetFileUploadDetails();
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                catch (e) {
                    alert(e.message);
                }
            }
            else {

                MsgboxInfo(OBPager.ValidationMessage);
            }
            //  }
        }
        else {

            try {
                if (OBPager.taskStatusFlag == -1) {
                    var txtFNameCntrl = document.getElementById('firstName');
                    var txtLNameCntrl = document.getElementById('lastName');
                    OBPager.SetTaskContentMemberValue('PhotoUpload.NameOnIDCard', null, txtFNameCntrl.value + " " + txtLNameCntrl.value, false);
                }
                if (OBPager.SaveTaskData(saveMode) == true) {

                    if (qs["cntry"] == 13 && qs["admin"] == undefined && (saveBstatus == UploadStatus.PendingWithAdminforApproval || saveBstatus == -1 || saveBstatus == UploadStatus.PhotoApproveNameReject || saveBstatus == UploadStatus.PhotoRejectNameApprove || saveBstatus == UploadStatus.PhotoandNameReject)) {
                        //  $('#lblNote').show();
                        document.getElementById("lblNote").style.display = "block";
                    }
                    //alert('Task saved successfully');
                    GetFileUploadDetails();
                    return true;
                }
                else {
                    alert('Error occured while saving the task');
                    return false;
                }
            }
            catch (e) {
                alert(e.message);
            }
        }

    }

}

/* Function to convert XML Timestamp data type to Javascript date */
function getTSToUTCDate(xmlDate) {
    var dt = new Date();
    var dtS = xmlDate.slice(xmlDate.indexOf('T') + 1, xmlDate.indexOf('.'))
    var TimeArray = dtS.split(":");
    dt.setUTCHours(TimeArray[0], TimeArray[1], TimeArray[2]);
    dtS = xmlDate.slice(0, xmlDate.indexOf('T'))
    TimeArray = dtS.split("-");
    dt.setUTCFullYear(TimeArray[0], (TimeArray[1] - 1), TimeArray[2]);
    return dt;
}
//Validate for candidate Done click
function ValidateSave() {
    //if(qs["admin"] != undefined) {
    //  
    //}
    //else
    //{
    var data = "{";
    data += "'sessionId':" + OBPager.sessionId.toString() + ","
    data += "'candidateId':" + OBPager.candidateId.toString() + ",";
    data += "'taskId':'" + OBPager.taskId.toString() + "'" + ",";
    data += "'countryId':'" + OBPager.countryId.toString() + "'";
    data += "}";

    $.ajax({
        type: "POST",
        url: "../../../../FormsService.aspx/GetFileUploadDetails",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            response = result.d;
            var status = "0";
            var fileUploadId = 0;
            fileUploadId = response[0]["FileUploadId"];
            var rejectionDate = response[0]["RejectionDate"];
            var modifiedDate = response[0]["ModifiedDate"];
            var txtNameCntrl = document.getElementById('nameOnIDCard');
            var txtFNameCntrl = document.getElementById('firstName');
            var txtLNameCntrl = document.getElementById('lastName');
            if (response[0]["FileUploadStatus"] != -1 && response[0]["FileUploadId"] != 0) {
                status = response[0]["FileUploadStatus"];
                //Set the status as pending for the Rejection cases(photoRejected,NameRejected,Both rejected)
                status = SetStatusAsPending(status);
            }
            //if the photo is not uploaded throw the message
            if (fileUploadId == '0') {
                alert("Please Upload an image.");
                return false;
            }
            //if the photo is not uploaded even if the admin rejected
            else if (fileUploadId != '0' && modifiedDate != "null" && rejectionDate != "null") {
                if (modifiedDate < rejectionDate && (status == UploadStatus.PhotoRejectNameApprove || status == PhotoandNameReject)) {
                    alert("Photo is rejected.Please Upload an image.");
                    return false;
                }
                else {
                    if (qs["admin"] != undefined) {

                        OBPager.SetTaskContentMemberValue('PhotoUpload.NameOnIDCard', null, txtNameCntrl.value, false);
                    }
                    else {

                        if (status == UploadStatus.PhotoandNameApprove || status == UploadStatus.IDCardPrinted || status == UploadStatus.NameApprovedPhotoPending || status == UploadStatus.PhotoRejectNameApprove) {

                            OBPager.SetTaskContentMemberValue('PhotoUpload.NameOnIDCard', null, txtNameCntrl.value, false);
                        }
                        else {
                            OBPager.SetTaskContentMemberValue('PhotoUpload.NameOnIDCard', null, txtFNameCntrl.value + " " + txtLNameCntrl.value, false);
                        }
                    }
                    //set the status,upload Id
                    OBPager.SetTaskContentMemberValue('PhotoUpload.FileUploadStatus', null, status, true);
                    OBPager.SetTaskContentMemberValue('PhotoUpload.FileUploadId', null, fileUploadId, true);

                    SaveTaskData(0);
                }
            }
            else {
                if (qs["admin"] != undefined) {

                    OBPager.SetTaskContentMemberValue('PhotoUpload.NameOnIDCard', null, txtNameCntrl.value, false);
                }
                else {

                    if (status == UploadStatus.PhotoandNameApprove || status == UploadStatus.IDCardPrinted || status == UploadStatus.NameApprovedPhotoPending || status == UploadStatus.PhotoRejectNameApprove) {

                        OBPager.SetTaskContentMemberValue('PhotoUpload.NameOnIDCard', null, txtNameCntrl.value, false);
                    }
                    else {
                        OBPager.SetTaskContentMemberValue('PhotoUpload.NameOnIDCard', null, txtFNameCntrl.value + " " + txtLNameCntrl.value, false);
                    }
                }
                OBPager.SetTaskContentMemberValue('PhotoUpload.FileUploadStatus', null, status, true);
                OBPager.SetTaskContentMemberValue('PhotoUpload.FileUploadId', null, fileUploadId, true);
                SaveTaskData(0);
            }

        },
        error: function (result) {
            alert(result.responseText);
        }

    });
    //}
}

//Validation for photo Upload from admin side

function ValidateSubmit() {
    var rdApproveCntrlValue = document.getElementById("accept_radio").checked;
    var rdRejectCntrlValue = document.getElementById("reject_radio").checked;
    var chkNameCntrlValue = document.getElementById("displayNameCheckBox").checked;
    var chkPhotoCntrlValue = document.getElementById("uploadPhotoCheckBox").checked;
    var countryid = 0;
    var Candidateid = 0;
    var notificationMasterID = 0;
    var dataString = '';

    if (rdApproveCntrlValue == 0 && rdRejectCntrlValue == 0) {
        alert('Please Approve/Reject');
        return false;
    }

    if (ValidateName() == true) {
        var status = 0;
        if (rdApproveCntrlValue == 1) {
            status = UploadStatus.PhotoandNameApprove;
        }
        else if (rdRejectCntrlValue == 1) {
            if (chkNameCntrlValue == 1 && chkPhotoCntrlValue == 1)
                status = UploadStatus.PhotoandNameReject;
            else if (chkNameCntrlValue == 0 && chkPhotoCntrlValue == 1)
                status = UploadStatus.PhotoRejectNameApprove;
            else if (chkNameCntrlValue == 1 && chkPhotoCntrlValue == 0)
                status = UploadStatus.PhotoApproveNameReject;
        }
        OBPager.SetTaskContentMemberValue('PhotoUpload.FileUploadStatus', null, status, true);
        if (status == UploadStatus.PhotoRejectNameApprove || status == UploadStatus.PhotoandNameReject) {

            OBPager.SetTaskContentMemberValue('PhotoUpload.RejectionDate', null, js_yyyy_mm_dd_hh_mm_ss(), false);

        }

        if (rdApproveCntrlValue == 1) {
            return SaveTaskData(1);
        }
        else if (rdRejectCntrlValue == 1 && displayConfirmBox() == true) {
            SaveTaskData(0);
            //Mail Trigger On Rejection Of Photo/NameOnIDCard

            if (qs["admin"] != undefined && qs["cntry"] != undefined && qs["cand"] != undefined) {
                countryid = qs["cntry"];
                Candidateid = qs["cand"];
                if (status == UploadStatus.PhotoandNameReject) {
                    notificationMasterID = 33
                    dataString = '{notificationMasterID:' + 33 + ',countryID:' + countryid + ',candidateID:' + "'" + Candidateid + "'" + '}';
                    $.MailSend(dataString);
                }
                if (status == UploadStatus.PhotoApproveNameReject) {
                    notificationMasterID = 32
                    dataString = '{notificationMasterID:' + 32 + ',countryID:' + countryid + ',candidateID:' + "'" + Candidateid + "'" + '}';
                    $.MailSend(dataString);
                }
                if (status == UploadStatus.PhotoRejectNameApprove) {
                    notificationMasterID = 31
                    dataString = '{notificationMasterID:' + 31 + ',countryID:' + countryid + ',candidateID:' + "'" + Candidateid + "'" + '}';
                    $.MailSend(dataString);
                }
            }


        }




        return true;
    }
    else {

        return false;
    }

}
//Display Confirm boxes while rejection of name/photo updated by the candidate
function displayConfirmBox() {

    var chkNameCntrlValue = document.getElementById("displayNameCheckBox").checked;
    var chkPhotoCntrlValue = document.getElementById("uploadPhotoCheckBox").checked;
    var rdRejectCntrlValue = document.getElementById("reject_radio").checked;
    var txtRemarksCntrl = document.getElementById("remarksTextArea");
    var errorTR = document.getElementById("resonForRejectionDiv");
    var errorTD = document.getElementById("reasonRejectionLabel");
    var status = "";


    if (chkNameCntrlValue == 0 && chkPhotoCntrlValue == 0) {
        alert("Please select any checkbox for rejection")
        return false;

    }
    else if (chkNameCntrlValue == 0 && chkPhotoCntrlValue == 1) {

        status = " the Uploaded Photograph and approve the IDCard DisplayName?";
    }
    else if (chkNameCntrlValue == 1 && chkPhotoCntrlValue == 0) {

        status = " the IDCard DisplayName and approve the Uploaded Photograph?";
    }
    else if (chkNameCntrlValue == 1 && chkPhotoCntrlValue == 1) {

        status = " both the IDCard DisplayName and the Uploaded Photograph?";

    }
    //                if (isClicked == false) {
    var msg1 = "Are you going to reject ";
    var msg = msg1 + status;
    if (txtRemarksCntrl.value == null || txtRemarksCntrl.value == "") {
        errorTR.style.display = "inline";
        txtRemarksCntrl.focus();
        errorTD.innerHTML = "Enter the reason for rejection.";
        return false;
    }
    var r = confirm(msg);
    if (r == true) {
        //        if (txtRemarksCntrl.value == null || txtRemarksCntrl.value == "") {
        //            errorTR.style.display = "inline";
        //            txtRemarksCntrl.focus();
        //            errorTD.innerHTML = "Enter the reason for rejection.";
        //            return false;
        //        }
        return true;
    }

    else
        return false;

    OBPager.SetTaskContentMemberValue('PhotoUpload.Remarks', null, txtRemarksCntrl.value, true);
    return true;
}



window.onbeforeunload = closeIt;
function closeIt() {

    try { window.parent.opener.disablePopup(); } catch (e) { }
    try { window.parent.opener.CloseChildPage(); } catch (e) { }
    if (qs["admin"] != undefined) {
        try {

            window.parent.opener.disablePopup();
            window.opener.RetainData();

        }
        catch (e) { }
    }
    else {
        try {
            window.opener.location.reload();
        } catch (e) { }
    }

}

$.MailSend = function (dataString) {
    $.ajax({
        type: "POST",
        url: "PhotoUpload.aspx/SendRejectionMAil",
        data: dataString,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
        },
        error: function (xhr) { alert('error'); }
    });
}
//Refersh the image
function RefershTheImage() {

    var data = "{";
    data += "'sessionId':" + OBPager.sessionId.toString() + ","
    data += "'candidateId':" + OBPager.candidateId.toString() + ",";
    data += "'taskId':'" + OBPager.taskId.toString() + "'" + ",";
    data += "'countryId':'" + OBPager.countryId.toString() + "'";
    data += "}";

    $.ajax({
        type: "POST",
        url: "../../../../FormsService.aspx/GetFileUploadDetails",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            response = result.d;
            var status = 0;
            var fileUploadId = 0;
            var fileUploadUrl = "";
            if (response[0]["FileUploadURL"] != null) {
                //get the file upload status
                $('#imgUpload1').attr("src", response[0]["FileUploadURL"]);
                $('#imgDiv').show();
                // $('#photoDiv').hide();
                $('#adminUploadDiv').show();
                $('#refreshLnk').show();
            }

        },
        error: function (result) {
            alert(result.responseText);
        }
    });

}

//
function UploadFormDetails() {
    var fileText = $('#name1').val();

    var filepath = fileText.replace(/\\/g, "\\\\");

    var s = filepath.split('\\');
    var file = s[s.length - 1];

    var imageRegex = /([^\s]+(?=\.(jpg|png|gif|bmp|JPG))\.\2)/gm;


    //   alert(file[0].size);
    if (file.match(imageRegex) != null) {
        //        var data = "{";
        //        data += "'sessionId':" + OBPager.sessionId.toString() + ","
        //        data += "'candidateId':" + OBPager.candidateId.toString() + ",";
        //        data += "'taskId':" + OBPager.taskId.toString() + ",";
        //        data += "'filepath':'" + filepath + "'";

        //        data += "}";

        //        $.ajax({
        //            type: "POST",
        //            url: "../../../../PhotoUpload.aspx/UploadPhotoDetails",
        //            data: data,
        //            contentType: "application/json; charset=utf-8",
        //            dataType: "json",
        //            success: function (result) {
        //                alert("File Uploaded successfully.");
        //            },
        //            error: function (xhr, status, textRemarks) {
        //                var errorMsg = xhr.responseText;
        //                var errMsg = JSON.parse(errorMsg).message;
        //                //alert("Error : " + xhr.status + " " + textRemarks);
        //                alert(errMsg);
        //                isActive = false;
        //            }

        //        });

    }



    else {
        alert('Please Upload an image file');
        return false;

    }



}
///Set the status as pending from candidate side in any of the rejection cases 
function SetStatusAsPending(status) {
    if (status == UploadStatus.PhotoRejectNameApprove) {
        status = UploadStatus.NameApprovedPhotoPending;

    }
    else if (status == UploadStatus.PhotoApproveNameReject) {
        status = UploadStatus.PhotoApproveNamePending;
    }
    else if (status == UploadStatus.PhotoandNameReject) {
        status = UploadStatus.PendingWithAdminforApproval;
    }
    return status;
}

function overlay() {
    var popupStatus = 0;
    //loads popup only if it is disabled
    if (popupStatus == 0) {
        var $backgroundOverLay = $('<div id="overLay"/>');
        $("body").prepend($backgroundOverLay);

        $("#overLay").css({
            "opacity": "0.7"
        });
        $("#overLay").show();
        popupStatus = 1;
    }

}

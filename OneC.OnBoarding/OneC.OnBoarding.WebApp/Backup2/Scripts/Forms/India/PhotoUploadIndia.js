var ValidationMessage;
var childWin;
var savemodeflag;
var rejectionDatedone;
var modifiedDatedone;
var rejphotoid;
var UploadStatus = { PendingWithAdminforApproval: 0, PhotoApprove: 1, PhotoReject: 2 };
(function ($) { $.QueryString = (function (a) { if (a == "") return {}; var b = {}; for (var i = 0; i < a.length; ++i) { var p = a[i].split('='); if (p.length != 2) continue; b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " ")); } return b; })(window.location.search.substr(1).split('&')) })(jQuery);
$().ready(function () {
    try { window.parent.opener.enablepopUp(); } catch (e) { }
    var qs = $.QueryString;
    var txtFNameCntrl = document.getElementById('firstName');
    var txtLNameCntrl = document.getElementById('lastName');
    var rejectreasons = TaskPrefillValues.PrefillValues.Set3.Remarks;
    var otherRemarks = TaskPrefillValues.PrefillValues.Set3.OtherRemarks;
    OBPager.GetMaster(156, "ReasonsforRejection");

    if (OBPager.taskStatusFlag == -1) {
        OBPager.SetTaskContentMemberValue('PhotoUpload.loginId', null, TaskPrefillValues.PrefillValues.Set1.LoginId, false);
        OBPager.SetTaskContentMemberValue('PhotoUpload.FirstName', null, TaskPrefillValues.PrefillValues.Set1.FirstName, false);
        OBPager.SetTaskContentMemberValue('PhotoUpload.LastName', null, TaskPrefillValues.PrefillValues.Set1.LastName, false);
        $("#firstName").val(TaskPrefillValues.PrefillValues.Set1.FirstName);
        $("#lastName").val(TaskPrefillValues.PrefillValues.Set1.LastName);
        $("#adminfirstName").val(TaskPrefillValues.PrefillValues.Set1.FirstName);
        $("#adminlastName").val(TaskPrefillValues.PrefillValues.Set1.LastName);
        $("#rejectreasons").val(TaskPrefillValues.PrefillValues.Set3.Remarks);
        $("#remarksTextArea").val(TaskPrefillValues.PrefillValues.Set3.OtherRemarks);
        jQXB.doBind(OBPager.taskContentDSName);
    }
    $("select").change(function () //fix for ie 9 compatability issue
    {
        // if (parseInt($(this + 'option:selected').attr('value')) == 10) 
        OBPager.SetTaskContentMemberValue('PhotoUpload.Remarks', null, $(this).val(), true);
        if ($(this).val() == "10") //fix for ie 9 compatability issue
        {
            $('#remarksTextArea').show();
        } else {
            $('#remarksTextArea').hide();
        }
    });

    //check the querystring param for View(admin or candidate)
    if (qs["admin"] == undefined) {
        $('#nameDivAdminView').hide();
        if (txtFNameCntrl.value != null && txtLNameCntrl.value != null) {
            var CandidateName = txtFNameCntrl.value + " " + txtLNameCntrl.value;
            var txtNameCntrl = txtFNameCntrl.value.length + txtLNameCntrl.value.length;
        }
        //if the FirstName+last name(prefilled values) length exceeds 20 enable the textboxes
        if (txtNameCntrl <= 19) {
            $('#firstName').attr('disabled', true);
            $('#lastName').attr('disabled', true);
            $('#nameOnIDCard').attr('disabled', true);
            $('#nameOnIDCard').val(CandidateName);
            OBPager.SetTaskContentMemberValue('PhotoUpload.NameOnIDCard', null, CandidateName, false);
        }
        else {
            $('#firstName').attr('disabled', true);
            $('#lastName').attr('disabled', true);
            GenerateNameSuggestion();
            $('#nameOnIDCard').attr('disabled', true);
        }
    }
    else {
        $('#nameDivAdminView').show();
        $('#hdnCandidateID').val(qs["cand"]);
    }
    GetFileUploadDetails();
});

//auto suggestion of names
function GenerateNameSuggestion() {

    var txtFNameCntrl = document.getElementById('firstName');
    var txtLNameCntrl = document.getElementById('lastName');

    var firstName = txtFNameCntrl.value;
    var lastName = txtLNameCntrl.value;
    var qs = $.QueryString;
    var data = "{";
    data += "'firstName':'" + firstName.toString() + "',"
    data += "'middleName':'" + " " + "',";
    data += "'lastName':'" + lastName.toString() + "'";
    data += "}";

    $.ajax({
        type: "POST",
        url: "PhotoUploadIndia.aspx/GenerateNameSuggestion",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (savemodeflag == undefined) {
                $('#autosuggestion').empty();
                var htmlContent = '';
                htmlContent += '<label for="autosuggestion">Auto Suggestion:</label><br/>';
                $.each(msg.d, function (i, data) {
                    htmlContent += '<br/><input type="radio" style="font-size: 1.3em" onclick="change(this)" name="pickName" value="' + data + '" />&nbsp;' + data + '<br/><br/>';
                });
                $('#autosuggestion').append(htmlContent);
                if ($('#nameOnIDCard').val().length != 0) {
                    $('input[value="' + $('#nameOnIDCard').val() + '"]').attr('checked', true);
                }
            }
        }
    });
}
var change = function (obj) {
    OBPager.SetTaskContentMemberValue('PhotoUpload.NameOnIDCard', null, $(obj)[0].value, true);
}

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
        $('#nameOnIDCard').attr('disabled', true);
        $('#nameDivCandidateView').hide();
        $('#adminfirstName').attr('disabled', true);
        $('#adminlastName').attr('disabled', true);
        //$('#adminDeliveryAddress').attr('disabled', true);
        $("#adminfirstName").val(TaskPrefillValues.PrefillValues.Set1.FirstName);
        $("#adminlastName").val(TaskPrefillValues.PrefillValues.Set1.LastName);


    }
    //if the file scan is failed (2) show the message to the candidate
    if (response[0]["FileScanStatus"] == "2") {
        var statusDesc = response[0]["FileUploadStatusDesc"];
        document.getElementById("errorLabel1").innerHTML = "Scanning failed due to the detection of a virus. Please upload the photograph once again.";
        document.getElementById("errorLabel").innerHTML = "";
        $('#Upload').attr('disabled', false);
        $('#Upload1').attr('disabled', false);
        if (statusDesc != null)
            document.getElementById("errorLabel").innerHTML = statusDesc;
    }
    //if the file scan is in progress(0) show the message to the candidate
    else if (response[0]["FileScanStatus"] == "0" && response[0]["ModifiedDate"] == null) {
        var statusDesc = response[0]["FileUploadStatusDesc"];
        document.getElementById("errorLabel1").innerHTML = "Scanning in progress…please check in five minutes for scan status.";
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

    //get the status description check to show the done button 
    var fileUploadId = 0;
    fileUploadId = response[0]["FileUploadId"];
    rejphotoid = fileUploadId;
    var rejectionDatedone = response[0]["RejectionDate"];
    var modifiedDatedone = response[0]["ModifiedDate"];
    if (fileUploadId != '0' && modifiedDatedone != "null" && rejectionDatedone != "null") {
        $("#doneButton").show();
    }
    else {
        $("#doneButton").hide();
    }

    //get the file upload status
    if (response[0]["FileUploadStatus"] != -1 && response[0]["FileUploadId"] != 0) {
        status = response[0]["FileUploadStatus"];


        //set the admin view for the photoupload page
        if (adminView == true) {

            document.getElementById("uploadHeadingSpan").innerHTML = "Approve/Reject";
            $('#acceptRejectDiv').show();
            $('#submitButton').show();
            $('#doneButton').hide();
            $('#imgDiv').show();
            $('#autosuggestion').hide();
            $('#nameOnIDCard').attr('disabled', true);
            $('#nameOnIDCardamin').attr('disabled', true);
            var nameOnIDCardAdmin = document.getElementById('nameOnIDCard').value;
            $('#nameOnIDCardamin').val(nameOnIDCardAdmin);


            if (status == UploadStatus.PhotoApprove) {

                $('#adminUploadDiv').hide();
                $('#Upload1').hide();
                $('#Upload').hide();
                //$('#uploadPhotoCheckBox').attr('disabled', true);
                $('#rejectDiv').hide();
                $('#nameOnIDCardamin').attr('disabled', true);
                $('#submitButton').attr('disabled', false);
                document.getElementById("accept_radio").checked = true;
//                 $('#accept_radio').attr('disabled', true);
                document.getElementById("reject_radio").checked = false;
                // $('#reject_radio').attr('disabled', true);
            }
            else if (status == UploadStatus.PhotoReject) {
                $('#adminUploadDiv').show();
                $('#Upload1').show();
                $('#Upload').hide();
                $('#refreshLnk').show();
                $('#errorLabel1').hide();
                $('#nameOnIDCardamin').attr('disabled', true);
                //$('#rejectDiv').hide();
                //$('#submitButton').attr('disabled', false);
                document.getElementById("accept_radio").checked = false;
                //$('#accept_radio').attr('disabled', true);
                document.getElementById("reject_radio").checked = true;
                //$('#reject_radio').attr('disabled', true);
                $('#rejectreasons').show();
                $('#rejectreasons').attr('disabled', true);
                var txtRemarkReasons = TaskPrefillValues.PrefillValues.Set3.Remarks;
                if (txtRemarkReasons == 10) {
                    $('#remarksTextArea').show();
                    $('#remarksTextArea').attr('disabled', true);

                }
                else { $('#remarksTextArea').hide(); }
            }

            else if (status == UploadStatus.PendingWithAdminforApproval) {
                $('#adminUploadDiv').show();
                $('#Upload1').show();
                $('#Upload').hide();
                $('#refreshLnk').show();
                //$('#uploadPhotoCheckBox').attr('enabled', true);
                $('#remarksTextArea').value = "";
                $('#rejectDiv').hide();

            }
            else {
                $('#adminUploadDiv').show();
                $('#Upload1').show();
                $('#Upload').hide();
                $('#refreshLnk').show();
                //$('#uploadPhotoCheckBox').attr('enabled', true);
                $('#remarksTextArea').value = "";
                $('#rejectDiv').hide();
            }
        }
        //set the candidateView for the photo upload page
        else if (adminView == false) {

            //$('#photoDiv').show();
            $('#submitButton').hide();
            //$('#doneButton').show();
            $('#nameInfo').hide();
            $('#autosuggestion').show();
            $('#nameOnIDCard').attr('disabled', true);
            if (status == UploadStatus.PendingWithAdminforApproval || status == UploadStatus.PhotoApprove || status == UploadStatus.PhotoReject) {
                $('#nameDivAdminView').show();
                $('#adminfirstName').hide();
                $('#adminlastName').hide();
                $('#adminlbllastName').hide();
                $('#adminlblfirstName').hide();
                //$('#lblDeliveryAddress').hide();
                //$('#adminDeliveryAddress').hide();
                $('#nameOnIDCardamin').hide();
                $('#adminlabel').hide();
                $('#autosuggestion').attr('disabled', true);
            }
            if (status == UploadStatus.PendingWithAdminforApproval) {
                //document.getElementById("errorLabel").innerHTML = "Pending With Admin for Approval";
                document.getElementById("errorLabel").innerHTML = "";
                document.getElementById("errorLabel1").innerHTML = response[0]["Photostatusdescription"];
                $('#firstName').attr('disabled', true);
                $('#lastName').attr('disabled', true);
                $('#imgDiv').show();
                $('#doneButton').attr('disabled', true);
                $('#nameOnIDCard').attr('disabled', true);
                $('#adminUploadDiv').hide();
                $('#Upload').hide();
                $('#Upload1').hide();
                $('#refreshLnk').hide();
                $('#nameOnIDCardamin').hide();
                $('#adminlabel').hide();
                $('#autosuggestion').attr('disabled', true);
            }
            //Photo Approved By Admin, But Name Rejected(3)
            //Photo shown to user. Name to be displayed can be updated.
            else if (status == UploadStatus.PhotoApprove) {
                status = UploadStatus.PhotoApprove;
                $('#doneButton').attr('disabled', true);
                $('#firstName').attr('disabled', true);
                $('#lastName').attr('disabled', true);
                $('#imgDiv').show();
                //$('#photoDiv').hide();
                $('#adminUploadDiv').hide();
                $('#nameOnIDCard').attr('disabled', true);
                $('#Upload').hide();
                $('#Upload1').hide();
                $('#refreshLnk').hide();
                $('#nameOnIDCardamin').hide();
                $('#adminlabel').hide();
                $('#autosuggestion').attr('disabled', true);

            }
            //Photo rejected by Admin, Name Approved(4)
            //Photo needs to be uploaded again. Name field will be disabled
            else if (status == UploadStatus.PhotoReject) {
                status = UploadStatus.PendingWithAdminforApproval;
                $('#firstName').attr('disabled', true);
                $('#lastName').attr('disabled', true);
                $('#imgDiv').show();
                $('#errorLabel').show();
                $('#adminUploadDiv').show();
                $('#nameOnIDCard').attr('disabled', true);
                $('#Upload').show();
                $('#Upload1').hide();
                $('#refreshLnk').show();
                $('#nameOnIDCardamin').hide();
                $('#adminlabel').hide();
                $('#autosuggestion').attr('disabled', true);

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
            $('#nameInfo').show();
            $('#adminUploadDiv').show();
            $('#Upload').show();
            $('#Upload1').hide();
            $('#imgDiv').show();
            //$('#doneButton').show();
        }
        else {
            if (response[0]["FileUploadId"] != 0) {
                document.getElementById("errorLabel1").innerHTML = "Photo Uploaded Successfully";
                $('#nameDivCandidateView').hide();
                $('#nameDivAdminView').show();
                $('#adminUploadDiv').show();
                $('#refreshLnk').show();
                //$('#uploadPhotoCheckBox').attr('enabled', true);
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
                //$('#uploadPhotoCheckBox').attr('enabled', true);
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
       // OBPager.SetTaskContentMemberValue('PhotoUpload.Remarks', null, "", true);
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

        //        $('#uploadPhotoCheckBox').checked = false;

    }
    else if (rdClientId.defaultValue == "reject") {
        var rejectreasons = TaskPrefillValues.PrefillValues.Set3.Remarks;
        var otherRemarks = TaskPrefillValues.PrefillValues.Set3.OtherRemarks;
        $('#rejectDiv').show();
        //$('#uploadPhotoCheckBox').checked = true;
        $("#rejectreasons").show();
        $("#rejectreasons").val(rejectreasons);
        if (rejectreasons == 10) {
            $("#remarksTextArea").show();
            $("#remarksTextArea").val(otherRemarks);

        }
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
        var txtFNameCntrl = document.getElementById('firstName');
        var txtLNameCntrl = document.getElementById('lastName');
        var txtNameCntrl = txtFNameCntrl.value + txtLNameCntrl.value;
        if (txtNameCntrl == null || txtNameCntrl == "") {
            alert("Please enter a name to be displayed on ID Card");
            txtNameCntrl.focus();
            return false;
        }
        if (txtNameCntrl.length > 19) {
            $('#autosuggestion').show();
            GenerateNameSuggestion();


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
            $('#autosuggestion').attr('disabled', false);
            GenerateNameSuggestion();


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
                ValidateSubmit(fileUploadId);
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
                var txtlngthcheck = 0;
                var confirmstatusonreject;
                var confirmstatus;
                if (OBPager.taskStatusFlag == -1) {
                    var txtFNameCntrl = document.getElementById('firstName');
                    var txtLNameCntrl = document.getElementById('lastName');
                    var txtNameOnIDCardCntrl = txtFNameCntrl.value + ' ' + txtLNameCntrl.value;
                    var txtNameOnIDCardlength = txtNameOnIDCardCntrl.length;

                    if (txtNameOnIDCardlength <= 19) {
                        OBPager.SetTaskContentMemberValue('PhotoUpload.NameOnIDCard', null, txtNameOnIDCardCntrl, false);
                        txtlngthcheck = 1;
                    }
                    else {
                        GenerateNameSuggestion();
                        confirmstatus = confirm('Are you sure want to submit name for autoapproval?');
                        confirmstatusonreject = confirmstatus;
                    }
                }
                if (confirmstatus == true || txtlngthcheck == 1 || (qs["admin"] != undefined)) {
                    if (OBPager.SaveTaskData(saveMode) == true) {

                        GetFileUploadDetails();
                        return true;

                    }
                    else {
                        alert('Error occured while saving the task');
                        return false;
                    }
                }
                else if (qs["admin"] == undefined && confirmstatusonreject == true) {
                    if (OBPager.SaveTaskData(saveMode) == true) {

                        GetFileUploadDetails();
                        return true;

                    }
                    else {
                        alert('Error occured while saving the task');
                        return false;
                    }
                }
                else if (qs["admin"] != undefined && confirmstatusonreject == false) {
                    if (OBPager.SaveTaskData(saveMode) == true) {

                        GetFileUploadDetails();
                        return true;

                    }
                    else {
                        alert('Error occured while saving the task');
                        return false;
                    }
                }


                else if (confirmstatusonreject == undefined) {
                    if (OBPager.SaveTaskData(saveMode) == true) {

                        GetFileUploadDetails();
                        return true;

                    }
                    else {
                        alert('Error occured while saving the task');
                        return false;
                    }
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
//confirmation message before proceeding with photo submission
    var agree = confirm("Please check your photograph before submitting. Once uploaded, the photo cannot be edited or modified.Do you want to continue?");
    if (agree) {
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
            else if (txtNameCntrl.value.length == 0)
            { alert("Please select a name to be displayed on ID Card"); }
            //if the photo is not uploaded even if the admin rejected
            else if (fileUploadId != '0' && modifiedDate != "null" && rejectionDate != "null") {
                if (modifiedDate < rejectionDate && (status == UploadStatus.PhotoReject)) {
                    alert("Photo is rejected.Please Upload an image.");
                    return false;
                }
                else {
                    if (qs["admin"] != undefined) {

                        OBPager.SetTaskContentMemberValue('PhotoUpload.NameOnIDCard', null, txtNameCntrl.value, false);
                    }
                    else {

                        if (status == UploadStatus.PhotoApprove || status == UploadStatus.PendingWithAdminforApproval || status == UploadStatus.PhotoReject) {

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

                    if (status == UploadStatus.PhotoApprove || status == UploadStatus.PendingWithAdminforApproval || status == UploadStatus.PhotoReject) {

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

else {
    return false;

}
}

//Validation for photo Upload from admin side

function ValidateSubmit(fileID) {
    var rdApproveCntrlValue = document.getElementById("accept_radio").checked;
    var rdRejectCntrlValue = document.getElementById("reject_radio").checked;
    //var chkNameCntrlValue = document.getElementById("displayNameCheckBox").checked;
    //var chkPhotoCntrlValue = document.getElementById("uploadPhotoCheckBox").checked;
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
            status = UploadStatus.PhotoApprove;
        }
        else if (rdRejectCntrlValue == 1) {
            status = UploadStatus.PhotoReject;

        }
        OBPager.SetTaskContentMemberValue('PhotoUpload.FileUploadStatus', null, status, true);
        if (status == UploadStatus.PhotoReject) {
            var drprejectreason = $('#rejectreasons').val();
            OBPager.SetTaskContentMemberValue('PhotoUpload.RejectionDate', null, js_yyyy_mm_dd_hh_mm_ss(), false);
            OBPager.SetTaskContentMemberValue('PhotoUpload.Remarks', null, drprejectreason, true);


        }

        if (rdApproveCntrlValue == 1) {
            return SaveTaskData(1);
        }
        else if (rdRejectCntrlValue == 1 && displayConfirmBox() == true) {
            SaveTaskData(0);
            var fileUploadId = fileID;
            var data = "{";
            data += "'candidateId':" + OBPager.candidateId.toString() + ",";
            data += "'FileUploadID':" + fileUploadId.toString();
            data += "}";
            $.deleterejectedphoto(data);

            if (qs["admin"] != undefined && qs["cntry"] != undefined && qs["cand"] != undefined) {
                countryid = qs["cntry"];
                Candidateid = qs["cand"];
                if (status == UploadStatus.PhotoReject) {
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

    //    var chkNameCntrlValue = document.getElementById("displayNameCheckBox").checked;
    //var chkPhotoCntrlValue = document.getElementById("uploadPhotoCheckBox").checked;
    var rdRejectCntrlValue = document.getElementById("reject_radio").checked;
    var txtRemarksCntrl = $('#remarksTextArea').val();
    var errorTR = document.getElementById("resonForRejectionDiv");
    var errorTD = document.getElementById("reasonRejectionLabel");
    var errorRR = $('#rejectreasons').val();
    var status = "";
    if (errorRR == '-1') {
        alert("Please select reasons for rejection")
        return false;

    }

    //    if (chkPhotoCntrlValue == 0) {
    //        alert("Please select checkbox for rejection")
    //        return false;

    //    }
    //    else if (chkPhotoCntrlValue == 1) {

    //        status = " the Uploaded Photograph?";
    //    }

    //    var msg1 = "Are you going to reject ";
    //    var msg = msg1 + status;
    if (errorRR == 10) {
        if (txtRemarksCntrl == null || txtRemarksCntrl == "") {
            errorTR.style.display = "inline";
            errorTD.innerHTML = "Enter the reason for rejection.";
            return false;
        }
    }
    //    var r = confirm(msg);
    //    if (r == true) {
    //        //        if (txtRemarksCntrl.value == null || txtRemarksCntrl.value == "") {
    //        //            errorTR.style.display = "inline";
    //        //            txtRemarksCntrl.focus();
    //        //            errorTD.innerHTML = "Enter the reason for rejection.";
    //        //            return false;
    //        //        }
    //        return true;
    //    }

    //    else
    //        return false;

    OBPager.SetTaskContentMemberValue('PhotoUpload.Remarks', null, errorRR, true);
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

$.deleterejectedphoto = function (dataString) {
    $.ajax({
        type: "POST",
        url: "PhotoUploadIndia.aspx/DeleteRejectedPhoto",
        data: dataString,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
        },
        error: function (xhr) { alert(result.responseText); }
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

    var imageRegex = /([^\s]+(?=\.(jpg|JPG|png|PNG|gif|GIF|bmp|BMP))\.\2)/gm;


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
    if (status == UploadStatus.PhotoReject) {
        status = UploadStatus.PendingWithAdminforApproval;

    }
    else if (status == UploadStatus.PhotoApprove) {
        status = UploadStatus.PhotoApprove;
    }
    else if (status == UploadStatus.PhotoReject) {
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

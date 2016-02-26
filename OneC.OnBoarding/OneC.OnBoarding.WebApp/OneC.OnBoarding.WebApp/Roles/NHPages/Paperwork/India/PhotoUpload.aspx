<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PhotoUpload.aspx.cs" Inherits="OneC.OnBoarding.WebApp.Roles.NHPages.Paperwork.India.PhotoUpload" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Photo Upload</title>
    <link href="../../../../Styles/Forms/StandardForms.css" rel="stylesheet" type="text/css" />
    <link href="../../../../Styles/Forms/photoupload.css" rel="stylesheet" type="text/css" />
    <link href="../../../../Styles/jquery.alerts.css" rel="stylesheet" type="text/css" />
    <link href="../../../../Styles/jquery.ui.datepicker.css" rel="stylesheet" type="text/css" />
    <script src="../../../../Scripts/JQuery/1.8/Jquery-1.7.1.js" type="text/javascript"></script>
    <script src="../../../../Scripts/Forms/CoreScripts/OBPaging.js" type="text/javascript"></script>
    <script src="../../../../Scripts/Forms/India/PhotoUpload.js" type="text/javascript"></script>
    <script src="../../../../Scripts/JQuery/jquery.ui.datepicker.js" type="text/javascript"></script>
    <script src="../../../../Scripts/Forms/FormsValidation.js" type="text/javascript"></script>
</head>
<body>
    <form id="formPhotoUpload" runat="server">
    <div id='baseContent'>
        <div id='pageMain' class="fleft">
            <div id='headerContent'>
                <div id="pagingControls">
                </div>
            </div>
            <!--headerContent-->
            <div id='PageContent' class="pagesContainer fleft pageContent height475"  style="position:absolute;">
                <!--Start of 1st page-->
                <div class="pageData">
                    <div class="pagesDetails">
                        <div class="margin_auto">
                            <div class="wrap" style="background-color: transparent;">
                                <div id="main" style="display: block; overflow: scroll; height: 350px; position:relative">
                                    <p>
                                        <span id="uploadHeadingSpan">Upload your picture</span>
                                        <img src="../../../../Images/close.png" alt="Close" class="close" title="Close" style="display: none" /></p>
                                    <span class="links_img" style="display: none"><a href="#">Refresh</a></span>
                                    <div class="fleft wrap_left">
                                        <div class="photo_frame" id="photoDiv" style="display: none">
                                        </div>
                                        <!--photoDiv-->
                                        <div class="photo_frame" id="imgDiv" runat="server" style="display: inline;">
                                            <div class="photo">
                                                <asp:Image runat="server" ID="imgUpload1" Width="112px" Height="132px" />
                                            </div>
                                            <!--photo-->
                                        </div>
                                        <!--imgDiv-->
                                        </br>
                                        <div class="fleft" id="adminUploadDiv" style="display: none">
                                            <input type="text" id="name1" class="fleft" />
                                            <asp:FileUpload runat="server" name="Browse" ID="browse_txtbx"/>
                                            <img src="../../../../Images/browse.png" alt="browse" title="Browse" class="browse_photo"/>
                                        </div>
                                        <div class="fleft width100per paddingB20L5">
                                            <asp:Button ID="Upload" class="done_btn marginTL20 font13" runat="server" OnClick="Button1_Click" OnClientClick="UploadFormDetails();"
                                                Text="Upload" />
                                            <asp:Button ID="Upload1" class="done_btn marginTL20 font13" runat="server" OnClick="Button2_Click" OnClientClick="UploadFormDetails();"
                                                Text="Upload" />
                                        </div>
                                    </div>
                                    <div class="photo_info" style="float: right">
                                        <p class="color_red font12" style="margin-top: 8px">
                                            <label for="errorMessage" id="errorLabel">
                                            </label>
                                        </p>
                                        <p class="color_red font12" style="margin-top: 8px">
                                            <label for="errorMessage" id="errorLabel1">
                                            </label>
                                        </p>
                                         <p class="color_red font11" id="noteForUpload"  style="display: none">
                                       
                                               Please make sure you check your photograph before submitting.
                                               After it has been submitted you will not have an option to modify the uploaded photograph.</p>
                                            <p>
                                        <div id="nameDivCandidateView">
                                            <p class="color_red font11">
                                               <%-- *(maximum permissible characters is 19)--%>
                                                *(The maximum permissible characters for the 'First name and Last name' together should be 19 characters.)</p>
                                            <p>
                                                <label for="firstName">
                                                    First Name:</label></p>
                                            <input type="text" id="firstName" style="font-size: 1.3em" jqxb-datasource="FormDetails"
                                                jqxb-datamember="PhotoUpload.FirstName" />
                                            <p>
                                                <label for="lastName">
                                                    Last Name:</label></p>
                                            <input type="text" id="lastName" style="font-size: 1.3em" jqxb-datasource="FormDetails"
                                                jqxb-datamember="PhotoUpload.LastName" />
                                                
                                        </div>
                                        <!--nameDivCandidateView-->
                                        <div id="nameDivAdminView" style="display: none">
                                            <p>
                                                <label for="firstName" id="adminlblfirstName">
                                                    First Name:</label></p>
                                            <input type="text" id="adminfirstName" style="font-size: 1.3em" />
                                            <p>
                                                <label for="lastName" id="adminlbllastName">
                                                    Last Name:</label></p>
                                            <input type="text" id="adminlastName" style="font-size: 1.3em" />
                                            <p>
                                                <label for="name">
                                                    Name to be displayed on ID card:</label></p>
                                            <p class="color_red font11" id="nameInfo">
                                               <%-- *(maximum permissible characters is 20)--%>
                                                *(The maximum permissible characters for 'Name to be displayed on ID card' is 20 characters including the space.)</p>
                                            <input type="text" id="nameOnIDCard" style="font-size: 1.3em" jqxb-datasource="FormDetails"
                                                jqxb-datamember="PhotoUpload.NameOnIDCard" />
                                                 <p>
                                                <label for="deliveryaddress" id="lblDeliveryAddress">
                                                    Delivery Address:</label></p>
                                            <input type="text" id="adminDeliveryAddress" style="font-size: 1.3em" />
                                        </div>
                                        <!--nameDivAdminView-->
                                        <div id="acceptRejectDiv" style="display: none">
                                            <p>
                                                <input type="radio" value="accept" name="accept" id="accept_radio" onclick="return ShowHideDiv(this);" />
                                                <label for="accept_radio">
                                                    Approve</label>
                                                <input type="radio" value="reject" name="accept" id="reject_radio" onclick="return ShowHideDiv(this);" />
                                                <label for="reject_radio">
                                                    Reject</label>
                                            </p>
                                         
                                            <div id="rejectDiv">
                                                <p class="marginT10">
                                                    <input type="checkbox" id="displayNameCheckBox" class="marginR5" /><label for="display_name">IDCard
                                                        DisplayName:</label></p>
                                                <p class="marginT10">
                                                    <input type="checkbox" id="uploadPhotoCheckBox" class="marginR5" onclick="return ShowHideDiv(this);" /><label
                                                        for="upload_photo">Uploaded Photograph:</label></p>
                                                <p >
                                                  <label style="color:Red">*</label> <label for="remarks">Reason for Rejection:</label>
                                                     </p>
                                                <textarea id="remarksTextArea" class="height50" style="font-size: 1.3em" jqxb-datasource="FormDetails"
                                                    jqxb-datamember="PhotoUpload.Remarks"></textarea>
                                                <div id="resonForRejectionDiv" style="display: none">
                                                    <p class="marginTB10">
                                                        <label for="error" id="reasonRejectionLabel" style="color: Red; font-size: 11px">
                                                        </label>
                                                    </p>
                                                </div>
                                                <!--resonForRejectionDiv-->
                                            </div>
                                            <!--rejectDiv-->
                                        </div>
                                        <!--acceptRejectDiv-->
                                        <p class="paddingB20">
                                            <input type="button" class="done_btn" id="doneButton" title="Done" value="Done" onclick="return ValidateSave();" />
                                            <input type="button" class="done_btn" id="submitButton" title="Submit" value="Submit"
                                                style="display: none" onclick="return ValidatePhoto();" />
                                        </p>
                                           <p>
                                          
                                         <input type="button" style="display:none; background:url(../../../../Images/btnprint.png) ; width:120px; height:24px; border:none; cursor:pointer; color:#fff; "  id="UpdatePrintStatus" title="ID Card Printed" value="ID Card Printed"
                                                  onclick="return UpdatePrintCompleteStatus();" />
                                            </p>
                                    </div>
                                    <!--photo_info-->
                                    <div style="clear: both">
                                    </div>
                                   
                                </div>
                     
                                   <p id="lblNote" runat="server" class="note-error" style="float: left; margin-top:-20px;display:none; width: 70%; height:20%; font-size:13px;
                                       font-family:Trebuchet MS, Arial, Helvetica, sans-serif; ">
                                                <%--<label id="lblNote" style="display:none" >--%>
                                                Thanks for uploading your photo. Once your photo is approved by the Admin, 
                                                the ID cards will be printed and be made available to you within 5 business days of your Date of Joining.
                                                If you have opted to take delivery of your ID card either at Canary Wharf or Paddington,you are 
                                                requested to check for it at the office reception the day you join. 
                                                Thank you.</p>
                                               
                                <!--main-->
                                <div><p class="pageText" style="margin-left:-20px; font-weight:bold; color:Green;">
                                Please be informed that the photo uploaded will automatically reflect in Outlook within 3 business days 
                                from the date of joining. <%--Hence this activity need not be repeated through
                                "My Image Update"
                                application available in the post joining section. However you may change the image in future using 
                                My Image application in Post joining/One Cognizant.--%>
                                </p></div>
                                <br /><br />
                                <div>
                                    <div class="pre fleft" style="float: left; padding-right: 0px; width: 50%;">
                                        <p class="font14 color_pre">
                                            Prerequisites for a right picture:</p>
                                        <p class="font14 color_pre paddingTB10">
                                            <a href="#">Do's</a></p>
                                        <ul>
                                            <li>You should be in "Business casuals" attire and against plain
                                                <br />
                                                white or light blue background.</li>
                                            <li>Image should be of good quality and the size of the image
                                                <br />
                                                should not exceed 200kB.</li>
                                            <li>You should be facing the camera such that both the ears are visible.</li>
                                            <li>The image should be colored.</li>
                                        </ul>
                                    </div>
                                    <div class="pre fleft" style="width: 50%; float: right; padding-top: 8px;">
                                        <p class="font14 color_pre paddingTB10">
                                            <a href="#">Dont's</a></p>
                                        <ul>
                                            <li>No informal or casual attire.</li>
                                            <li>No head gear/hat,etc unless you wear it habitually on account of religious
                                                reasons .</li>
                                            <li>No dark glasses/non-prescription tinted glasses.</li>
                                        </ul> 
                                    </div>
                                </div>
                                
                                <!--pre-->
                            </div>
                            <!--wrap-->                            
                        </div>
                        <!--margin_auto-->                        
                    </div>
                    <!--pagesDetails-->
                </div>
                <!--pageData-->                                
            </div>
            <!--PageContent-->           
        </div>
        <!--pageMain-->
    </div>
    <!--baseContent-->
    <input type="hidden" runat="server" id="hdnSessionId" />
    <input type="hidden" runat="server" id="hdnCandidateID" />
    </form>
</body>
<script type="text/javascript">
    $(document).change(function () {
        if (($("#browse_txtbx").val())) {
            $("#name1").val($("#browse_txtbx").val());
        }
    });
</script>
</html>

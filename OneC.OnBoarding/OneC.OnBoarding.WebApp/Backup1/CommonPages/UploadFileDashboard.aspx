<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="UploadFileDashboard.aspx.cs"
    Inherits="OneC.OnBoarding.WebApp.CommonPages.UploadFileDashboard" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <meta http-equiv="X-UA-Compatible" content="IE=EDGE" />
    <title></title>
    <base target="_self" />
    <link href="../Styles/Forms/StandardForms.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/Forms/form.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../Scripts/JQuery/1.8/jquery.js"></script>
    <script type="text/javascript" src="../Scripts/JQuery/1.8/jquery-ui-1.8.16.custom.min.js"></script>
    <script src="../Scripts/Forms/FormsValidation.js" type="text/javascript"></script>
    <script type="text/javascript" src="../Scripts/Validations.js"></script>
    <script type="text/javascript">
        function Confirm() {
            var uploadcontrol = document.getElementById('<%=FileUpload1.ClientID%>').value;
            var confirm_value = document.createElement("INPUT");
            var valflag;
            if (document.getElementById('<%=urllink1.ClientID%>') != null) {
                valflag = 1;
            }
            else {
                valflag = 0;
            }

            confirm_value.type = "hidden";
            confirm_value.name = "confirm_value";
            if (uploadcontrol.length > 0 && valflag == 1) {
                if (confirm("Are you sure you want to replace this document?")) {
                    confirm_value.value = "Yes";
                } else {
                    confirm_value.value = "No";
                }
                document.forms[0].appendChild(confirm_value);
            }
        }

        /*Function to disable the popup window */
        window.onbeforeunload = closeIt;
        function closeIt() {
            if (window.parent.opener != null) {
                window.parent.opener.disablePopup();
            }
            //window.close();
        }

       

         


    </script>
    <style type="text/css">
        .ApproverHeader
        {
            font-weight: bold;
            padding: 10px 10px 10px 0px;
        }
        .Appovertxtbx
        {
            border: 1px solid #000;
            width: 115px;
            height: 18px;
        }
        .Assetdd
        {
            border: 1px solid #000;
            width: 115px;
            height: 18px;
        }
        .tdpadding10px
        {
            padding: 5px 0px 0px 0px;
        }
        .tdpaddingtopandbottom10px
        {
            padding: 5px 5px 0px 0px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <input type="hidden" runat="server" id="hdnUploadId" />
    <div class="pageText" style="padding-left: 0px;line-height: 13px;">
        <div style="text-align: left; padding-left: 10px;">
            <table cellpadding="4" cellspacing="4">
                <tr>
                    <td colspan="3">
                        <span style="font-style: italic; text-decoration: none; color:Red;">
                        New Assets (SamsungNote4, IPhone6, IPhone6+) will not be applicable for <br />
                        candidates who have submitted ER form before Jan 11th, 7.30 AM (EST).
                        </span>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <asp:Label ID="LblAttachFile" runat="server">
                            <strong>Attachment:</strong></asp:Label><span style="font-style: italic; text-decoration: none;">
                                (Valid File Formats:.msg,.zip,.jpg,.jpeg,.doc,.docx)</span>
                    </td>
                </tr>
                <tr>
                    <td align="center" colspan="2">
                        <asp:FileUpload ID="FileUpload1" runat="server" name="Browse" Width="222px" />
                    </td>
                    <td>
                        <asp:Button ID="btnUpload" Text="Upload file" runat="server" OnClick="BtnUpload_Click"
                            OnClientClick="Confirm()" Style="margin-left: 10px; background: url(../Images/btn.png);
                            width: 70px; color: #fff;" />
                    </td>
                </tr>
                <tr>
                    <td style="color: Red" colspan="3">
                        Note : Maximum Upload limit is 400 KB
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <asp:LinkButton ID="urllink1" runat="server" Style="text-decoration: none;" OnClick="Urllink1_Click"></asp:LinkButton>
                    </td>
                </tr>                
                <tr>
                    <td>
                        <label id="lblAssetheader" runat="server" style="font-weight: bold">
                            AssetType</label>
                    </td>
                    <td>
                        <label id="lblApproveridheader" runat="server" style="font-weight: bold">
                            ApproverId</label>
                    </td>
                    <td>
                        <label id="lblNameDesig" runat="server" style="font-weight: bold">
                            Name/Designation</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label id="lblLaptop" runat="server">
                            <input id="chkLaptop" type="checkbox" runat="server" />Laptop</label>
                    </td>
                    <td>
                        <input id="txtLaptopApproverId" runat="server" style="border: 1px solid #000; width: 115px;
                            height: 18px;" type="text" maxlength="6" class="OnlyNumeric"
                            onblur="FetchAssociateDetails(document.getElementById('txtLaptopApproverId').value, this.id);" />
                    </td>
                    <td>
                        <label id="lblLaptopApproverNameDesg" runat="server" style="font-weight: normal">
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label id="lblCellphone" runat="server">
                            <input id="chkCellphone" type="checkbox" runat="server" />Cellphone</label>
                    </td>
                    <td>
                        <input id="txtCellphoneApproverId" runat="server" style="border: 1px solid #000;
                            width: 115px; height: 18px;" type="text" maxlength="6" class="OnlyNumeric"
                            onblur="FetchAssociateDetails(document.getElementById('txtCellphoneApproverId').value, this.id);" />
                    </td>
                    <td>
                        <label id="lblCellphoneApproverNameDesg" runat="server" style="font-weight: normal">
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label id="lblBlackberry" runat="server">
                            <input id="chkBlackberry" type="checkbox" runat="server" />Blackberry</label>
                    </td>
                    <td>
                        <input id="txtBlackberryApproverId" runat="server" style="border: 1px solid #000;
                            width: 115px; height: 18px;" type="text" maxlength="6" class="OnlyNumeric"
                            onblur="FetchAssociateDetails(document.getElementById('txtBlackberryApproverId').value, this.id);" />
                    </td>
                    <td>
                        <label id="lblBlackberryApproverNameDesg" runat="server" style="font-weight: normal">
                        </label>
                    </td>
                </tr>
                 <tr>
                    <td>
                        <label id="lblBlackberryZ10" runat="server">
                            <input id="rdbBlackberryZ10" type="radio" name="smartphone" runat="server" />BlackberryZ10</label>
                    </td>
                    <td>
                        <input id="txtBlackberryZ10ApproverId" runat="server" style="border: 1px solid #000;
                            width: 115px; height: 18px;" type="text" maxlength="6" class="OnlyNumeric"
                            onblur="FetchAssociateDetails(document.getElementById('txtBlackberryZ10ApproverId').value, this.id);" />
                    </td>
                    <td>
                        <label id="lblBlackberryZ10ApproverNameDesg" runat="server" style="font-weight: normal">
                        </label>
                    </td>
                </tr>
                  <tr>
                    <td>
                        <label id="lblSamsungNote3" runat="server">
                            <input id="rdbSamsungNote3" type="radio" name="smartphone" runat="server" />SamsungNote3</label>
                    </td>
                    <td>
                        <input id="txtSamsungNote3ApproverId" runat="server" style="border: 1px solid #000;
                            width: 115px; height: 18px;" type="text" maxlength="6" class="OnlyNumeric"
                            onblur="FetchAssociateDetails(document.getElementById('txtSamsungNote3ApproverId').value, this.id);" />
                    </td>
                    <td>
                        <label id="lblSamsungNote3ApproverNameDesg" runat="server" style="font-weight: normal">
                        </label>
                    </td>
                </tr>
                 <tr>
                    <td>
                        <label id="lblSamsungS3" runat="server">
                            <input id="rdbSamsungS3" type="radio" name="smartphone" runat="server" />SamsungS3</label>
                    </td>
                    <td>
                        <input id="txtSamsungS3ApproverId" runat="server" style="border: 1px solid #000;
                            width: 115px; height: 18px;" type="text" maxlength="6" class="OnlyNumeric"
                            onblur="FetchAssociateDetails(document.getElementById('txtSamsungS3ApproverId').value, this.id);" />
                    </td>
                    <td>
                        <label id="lblSamsungS3ApproverNameDesg" runat="server" style="font-weight: normal">
                        </label>
                    </td>
                </tr>
                 <tr>
                    <td>
                        <label id="lblSamsungS4" runat="server">
                            <input id="rdbSamsungS4" type="radio" name="smartphone" runat="server" />SamsungS4</label>
                    </td>
                    <td>
                        <input id="txtSamsungS4ApproverId" runat="server" style="border: 1px solid #000;
                            width: 115px; height: 18px;" type="text" maxlength="6" class="OnlyNumeric"
                            onblur="FetchAssociateDetails(document.getElementById('txtSamsungS4ApproverId').value, this.id);" />
                    </td>
                    <td>
                        <label id="lblSamsungS4ApproverNameDesg" runat="server" style="font-weight: normal">
                        </label>
                    </td>
                </tr>
                  <tr>
                    <td>
                        <label id="lblSamsungS5" runat="server">
                            <input id="rdbSamsungS5" type="radio" name="smartphone" runat="server" />SamsungS5</label>
                    </td>
                    <td>
                        <input id="txtSamsungS5ApproverId" runat="server" style="border: 1px solid #000;
                            width: 115px; height: 18px;" type="text" maxlength="6" class="OnlyNumeric"
                            onblur="FetchAssociateDetails(document.getElementById('txtSamsungS5ApproverId').value, this.id);" />
                    </td>
                    <td>
                        <label id="lblSamsungS5ApproverNameDesg" runat="server" style="font-weight: normal">
                        </label>
                    </td>
                </tr>
                  <tr>
                    <td>
                        <label id="lblIPhone4S" runat="server">
                            <input id="rdbIPhone4S" type="radio" name="smartphone" runat="server" />IPhone4S</label>
                    </td>
                    <td>
                        <input id="txtIPhone4SApproverId" runat="server" style="border: 1px solid #000;
                            width: 115px; height: 18px;" type="text" maxlength="6" class="OnlyNumeric"
                            onblur="FetchAssociateDetails(document.getElementById('txtIPhone4SApproverId').value, this.id);" />
                    </td>
                    <td>
                        <label id="lblIPhone4SApproverNameDesg" runat="server" style="font-weight: normal">
                        </label>
                    </td>
                </tr>
                 <tr>
                    <td>
                        <label id="lblIPhone5S" runat="server">
                            <input id="rdbIPhone5S" type="radio" name="smartphone" runat="server" />IPhone5S</label>
                    </td>
                    <td>
                        <input id="txtIPhone5SApproverId" runat="server" style="border: 1px solid #000;
                            width: 115px; height: 18px;" type="text" maxlength="6" class="OnlyNumeric"
                            onblur="FetchAssociateDetails(document.getElementById('txtIPhone5SApproverId').value, this.id);" />
                    </td>
                    <td>
                        <label id="lblIPhone5SApproverNameDesg" runat="server" style="font-weight: normal">
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label id="lblIPhone5C" runat="server">
                            <input id="rdbIPhone5C" type="radio" name="smartphone" runat="server" />IPhone5C</label>
                    </td>
                    <td>
                        <input id="txtIPhone5CApproverId" runat="server" style="border: 1px solid #000;
                            width: 115px; height: 18px;" type="text" maxlength="6" class="OnlyNumeric"
                            onblur="FetchAssociateDetails(document.getElementById('txtIPhone5CApproverId').value, this.id);" />
                    </td>
                    <td>
                        <label id="lblIPhone5CApproverNameDesg" runat="server" style="font-weight: normal">
                        </label>
                    </td>
                </tr>
                 <tr>
                    <td>
                        <label id="lblLGG2" runat="server">
                            <input id="rdbLGG2" type="radio" name="smartphone" runat="server" />LG_G2</label>
                    </td>
                    <td>
                        <input id="txtLGG2ApproverId" runat="server" style="border: 1px solid #000;
                            width: 115px; height: 18px;" type="text" maxlength="6" class="OnlyNumeric"
                            onblur="FetchAssociateDetails(document.getElementById('txtLGG2ApproverId').value, this.id);" />
                    </td>
                    <td>
                        <label id="lblLGG2ApproverNameDesg" runat="server" style="font-weight: normal">
                        </label>
                    </td>
                </tr>


                 <tr>
                    <td>
                        <label id="lblSamsungNote4" runat="server">
                            <input id="rdbSamsungNote4" type="radio" name="smartphone" runat="server" />SamsungNote4</label>
                    </td>
                    <td>
                        <input id="txtSamsungNote4ApproverId" runat="server" style="border: 1px solid #000;
                            width: 115px; height: 18px;" type="text" maxlength="6" class="OnlyNumeric"
                            onblur="FetchAssociateDetails(document.getElementById('txtSamsungNote4ApproverId').value, this.id);" />
                    </td>
                    <td>
                        <label id="lblSamsungNote4ApproverNameDesg" runat="server" style="font-weight: normal">
                        </label>
                    </td>
                </tr>
                 <tr>
                    <td>
                        <label id="lblIPhone6" runat="server">
                            <input id="rdbIPhone6" type="radio" name="smartphone" runat="server" />IPhone6</label>
                    </td>
                    <td>
                        <input id="txtIPhone6ApproverId" runat="server" style="border: 1px solid #000;
                            width: 115px; height: 18px;" type="text" maxlength="6" class="OnlyNumeric"
                            onblur="FetchAssociateDetails(document.getElementById('txtIPhone6ApproverId').value, this.id);" />
                    </td>
                    <td>
                        <label id="lblIPhone6ApproverNameDesg" runat="server" style="font-weight: normal">
                        </label>
                    </td>
                </tr>
                 <tr>
                    <td>
                        <label id="lblIPhone6P" runat="server">
                            <input id="rdbIPhone6P" type="radio" name="smartphone" runat="server" />IPhone6+</label>
                    </td>
                    <td>
                        <input id="txtIPhone6PApproverId" runat="server" style="border: 1px solid #000;
                            width: 115px; height: 18px;" type="text" maxlength="6" class="OnlyNumeric"
                            onblur="FetchAssociateDetails(document.getElementById('txtIPhone6PApproverId').value, this.id);" />
                    </td>
                    <td>
                        <label id="lblIPhone6PApproverNameDesg" runat="server" style="font-weight: normal">
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label id="lblLGG3" runat="server">
                            <input id="rdbLGG3" type="radio" name="smartphone" runat="server" />LG_G3</label>
                    </td>
                    <td>
                        <input id="txtLGG3ApproverId" runat="server" style="border: 1px solid #000;
                            width: 115px; height: 18px;" type="text" maxlength="6" class="OnlyNumeric"
                            onblur="FetchAssociateDetails(document.getElementById('txtLGG3ApproverId').value, this.id);" />
                    </td>
                    <td>
                        <label id="lblLGG3ApproverNameDesg" runat="server" style="font-weight: normal">
                        </label>
                    </td>
                </tr>
                 <tr>
                    <td>
                        <label id="lblSamsungS632GB" runat="server">
                            <input id="rdbSamsungS632GB" type="radio" name="smartphone" runat="server" />SamsungS6 32GB</label>
                    </td>
                    <td>
                        <input id="txtSamsungS632GBApproverId" runat="server" style="border: 1px solid #000;
                            width: 115px; height: 18px;" type="text" maxlength="6" class="OnlyNumeric"
                            onblur="FetchAssociateDetails(document.getElementById('txtSamsungS632GBApproverId').value, this.id);" />
                    </td>
                    <td>
                        <label id="lblSamsungS632GBApproverNameDesg" runat="server" style="font-weight: normal">
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label id="lblSamsungS664GB" runat="server">
                            <input id="rdbSamsungS664GB" type="radio" name="smartphone" runat="server" />SamsungS6 64GB</label>
                    </td>
                    <td>
                        <input id="txtSamsungS664GBApproverId" runat="server" style="border: 1px solid #000;
                            width: 115px; height: 18px;" type="text" maxlength="6" class="OnlyNumeric"
                            onblur="FetchAssociateDetails(document.getElementById('txtSamsungS664GBApproverId').value, this.id);" />
                    </td>
                    <td>
                        <label id="lblSamsungS664GBApproverNameDesg" runat="server" style="font-weight: normal">
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label id="lblSamsungS6128GB" runat="server">
                            <input id="rdbSamsungS6128GB" type="radio" name="smartphone" runat="server" />SamsungS6 128GB</label>
                    </td>
                    <td>
                        <input id="txtSamsungS6128GBApproverId" runat="server" style="border: 1px solid #000;
                            width: 115px; height: 18px;" type="text" maxlength="6" class="OnlyNumeric"
                            onblur="FetchAssociateDetails(document.getElementById('txtSamsungS6128GBApproverId').value, this.id);" />
                    </td>
                    <td>
                        <label id="lblSamsungS6128GBApproverNameDesg" runat="server" style="font-weight: normal">
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label id="lblSamsungS6Edge32GB" runat="server">
                            <input id="rdbSamsungS6Edge32GB" type="radio" name="smartphone" runat="server" />SamsungS6Edge 32GB</label>
                    </td>
                    <td>
                        <input id="txtSamsungS6Edge32GBApproverId" runat="server" style="border: 1px solid #000;
                            width: 115px; height: 18px;" type="text" maxlength="6" class="OnlyNumeric"
                            onblur="FetchAssociateDetails(document.getElementById('txtSamsungS6Edge32GBApproverId').value, this.id);" />
                    </td>
                    <td>
                        <label id="lblSamsungS6Edge32GBApproverNameDesg" runat="server" style="font-weight: normal">
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label id="lblSamsungS6Edge64GB" runat="server">
                            <input id="rdbSamsungS6Edge64GB" type="radio" name="smartphone" runat="server" />SamsungS6Edge 64GB</label>
                    </td>
                    <td>
                        <input id="txtSamsungS6Edge64GBApproverId" runat="server" style="border: 1px solid #000;
                            width: 115px; height: 18px;" type="text" maxlength="6" class="OnlyNumeric"
                            onblur="FetchAssociateDetails(document.getElementById('txtSamsungS6Edge64GBApproverId').value, this.id);" />
                    </td>
                    <td>
                        <label id="lblSamsungS6Edge64GBApproverNameDesg" runat="server" style="font-weight: normal">
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label id="lblSamsungS6Edge128GB" runat="server">
                            <input id="rdbSamsungS6Edge128GB" type="radio" name="smartphone" runat="server" />SamsungS6 Edge 128GB</label>
                    </td>
                    <td>
                        <input id="txtSamsungS6Edge128GBApproverId" runat="server" style="border: 1px solid #000;
                            width: 115px; height: 18px;" type="text" maxlength="6" class="OnlyNumeric"
                            onblur="FetchAssociateDetails(document.getElementById('txtSamsungS6Edge128GBApproverId').value, this.id);" />
                    </td>
                    <td>
                        <label id="lblSamsungS6Edge128GBApproverNameDesg" runat="server" style="font-weight: normal">
                        </label>
                    </td>
                </tr>


                <tr>
                    <td colspan="3" align="center" style="padding-top:10px;">
                        <asp:Button ID="btnSubmit" Text="Update" runat="server" Style="background: url(../Images/btn.png);
                            width: 70px; color: #fff; margin-left: 10px;" OnClick="BtnSubmit_Click" />
                    </td>
                </tr>
                <tr>
                    <td colspan="3" align="center">
                        <label id="lblmsg" style="color: Red; font-weight: normal;" runat="server">
                            Updated Successfully..</label>
                    </td>
                </tr>
                <tr>
                    <td class="tdpaddingtop10px">
                        <label id="lblContractorAssetName" runat="server" class="ApproverHeader">
                            Asset Name:</label>
                    </td>
                    <td colspan="2" align="center" class="tdpadding10px">                    
                        <select id="ddEquipment" runat="server" title="AssetName" class="Assetdd" name="Equipements" onchange="EquipmentChange()">
                        </select>
                    </td>
                </tr>
                <tr>
                    <td class="tdpaddingtop10px">
                        <label id="lblAprvrIdHeader" runat="server" class="ApproverHeader">
                            Approver ID:</label>
                    </td>
                    <td colspan="2" align="center" class="tdpadding10px">
                        <input id="txtappid" runat="server" type="text" class="Appovertxtbx tbForm OnlyNumeric" maxlength="6"
                             onblur="FetchAssociateDetails(document.getElementById('txtappid').value, this.id);" />
                    </td>
                </tr>
                <tr>
                    <td class="tdpaddingtopandbottom10px">
                        <label id="lblApproverNameHeader" runat="server" class="ApproverHeader">
                            Approver Name:</label>
                    </td>
                    <td colspan="2" align="center" class="tdpadding10px" style="width: 115px;">
                        <label id="ContctEquiAprvName" runat="server" style="font-weight: normal;">
                        </label>
                    </td>
                </tr>
                <tr>
                    <td colspan="3" align="center" style="padding-top:10px;">
                        <asp:Button ID="btnSubmit_Cntcr" Text="Update" runat="server" Style="background: url(../Images/btn.png);
                            width: 70px; color: #fff; margin-left: 10px;" OnClick="BtnSubmit_Click" />
                    </td>
                </tr>
                <tr>
                    <td colspan="3" align="center">
                        <label id="lblmsg_cntct" style="color: Red; font-weight: normal;" runat="server">
                            Updated Successfully..</label>
                    </td>
                </tr>
                <tr>                    
                    <td colspan="3">
                        <asp:HiddenField ID="hdnSelectedEquipment" runat="server" />
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div style="clear: both;">
    </div>
    <div style="clear: both;">
    </div>
    <div id="tableDiv" runat="server" class="stateH">
    </div>
    </form>
</body>
<script type="text/javascript" language="javascript">

    function FetchAssociateDetails(AssociateID, controlid) {
        if (controlid == "txtLaptopApproverId") {
            if (AssociateID == "") {
                $("#lblLaptopApproverNameDesg").text("");
            }
        }
        if (controlid == "txtCellphoneApproverId") {
            if (AssociateID == "") {
                $("#lblCellphoneApproverNameDesg").text("");
            }
        }
        if (controlid == "txtBlackberryApproverId") {
            if (AssociateID == "") {
                $("#lblBlackberryApproverNameDesg").text("");
            }
        }
        if (controlid == "txtBlackberryZ10ApproverId") {
            if (AssociateID == "") {
                $("#lblBlackberryZ10ApproverNameDesg").text("");
            }
        }
        if (controlid == "txtSamsungNote3ApproverId") {
            if (AssociateID == "") {
                $("#lblSamsungNote3ApproverNameDesg").text("");
            }
        }

        if (controlid == "txtSamsungS3ApproverId") {
            if (AssociateID == "") {
                $("#lblSamsungS3ApproverNameDesg").text("");
            }
        } 
        if (controlid == "txtSamsungS4ApproverId") {
            if (AssociateID == "") {
                $("#lblSamsungS4ApproverNameDesg").text("");
            }
        }
        if (controlid == "txtSamsungS5ApproverId") {
            if (AssociateID == "") {
                $("#lblSamsungS5ApproverNameDesg").text("");
            }
        }
        if (controlid == "txtIPhone4SApproverId") {
            if (AssociateID == "") {
                $("#lblIPhone4SApproverNameDesg").text("");
            }
        }
        if (controlid == "txtIPhone5SApproverId") {
            if (AssociateID == "") {
                $("#lblIPhone5SApproverNameDesg").text("");
            }
        }
        if (controlid == "txtIPhone5CApproverId") {
            if (AssociateID == "") {
                $("#lblIPhone5CApproverNameDesg").text("");
            }
        }
        if (controlid == "txtLGG2ApproverId") {
            if (AssociateID == "") {
                $("#lblLGG2ApproverNameDesg").text("");
            }
        }

        if (controlid == "txtSamsungNote4ApproverId") {
            if (AssociateID == "") {
                $("#lblSamsungNote4ApproverNameDesg").text("");
            }
        }
        if (controlid == "txtIPhone6ApproverId") {
            if (AssociateID == "") {
                $("#lblIPhone6ApproverNameDesg").text("");
            }
        }
        if (controlid == "txtIPhone6PApproverId") {
            if (AssociateID == "") {
                $("#lblIPhone6PApproverNameDesg").text("");
            }
        }
        if (controlid == "txtLGG3ApproverId") {
            if (AssociateID == "") {
                $("#lblLGG3ApproverNameDesg").text("");
            }
        }
        if (controlid == "txtSamsungS632GBApproverId") {
            if (AssociateID == "") {
                $("#lblSamsungS632GBApproverNameDesg").text("");
            }
        }
        if (controlid == "txtSamsungS664GBApproverId") {
            if (AssociateID == "") {
                $("#lblSamsungS664GBApproverNameDesg").text("");
            }
        }
        if (controlid == "txtSamsungS6128GBApproverId") {
            if (AssociateID == "") {
                $("#lblSamsungS6128GBApproverNameDesg").text("");
            }
        }
        if (controlid == "txtSamsungS6Edge32GBApproverId") {
            if (AssociateID == "") {
                $("#lblSamsungS6Edge32GBApproverNameDesg").text("");
            }
        }
        if (controlid == "txtSamsungS6Edge64GBApproverId") {
            if (AssociateID == "") {
                $("#lblSamsungS6Edge64GBApproverNameDesg").text("");
            }
        }
        if (controlid == "txtSamsungS6Edge128GBApproverId") {
            if (AssociateID == "") {
                $("#lblSamsungS6Edge128GBApproverNameDesg").text("");
            }
        }
        if (controlid == "txtappid") {
            if (AssociateID == "") {
                $("#ContctEquiAprvName").text("");
            }
        }
        $.ajax({
            type: "POST",
            url: "UploadFileDashboard.aspx/FetchAssociateData",
            data: '{"associateId":"' + AssociateID + '"}',
            //'","ContractorEquipmentId":"' +$("#ContcrEquidd").val() + 
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                if (msg.d == "") {
                    if (controlid == "txtLaptopApproverId") {
                        alert('Please Enter Valid ApproverId For Laptop!');
                        $("#lblLaptopApproverNameDesg").text("");
                        $("#txtLaptopApproverId").focus();
                        return false;
                    }
                    if (controlid == "txtCellphoneApproverId") {
                        alert('Please Enter Valid ApproverId For Cellphone!');
                        $("#lblCellphoneApproverNameDesg").text("");
                        $("#txtCellphoneApproverId").focus();
                        return false;
                    }
                    if (controlid == "txtBlackberryApproverId") {
                        alert('Please Enter Valid ApproverId For Blackberry!');
                        $("#lblBlackberryApproverNameDesg").text("");
                        $("#txtBlackberryApproverId").focus();
                        return false;
                    }
                    if (controlid == "txtBlackberryZ10ApproverId") {
                        alert('Please Enter Valid ApproverId For BlackberryZ10!');
                        $("#lblBlackberryZ10ApproverNameDesg").text("");
                        $("#txtBlackberryZ10ApproverId").focus();
                        return false;
                    }
                    if (controlid == "txtSamsungNote3ApproverId") {
                        alert('Please Enter Valid ApproverId For SamsungNote3!');
                        $("#lblSamsungNote3ApproverNameDesg").text("");
                        $("#txtSamsungNote3ApproverId").focus();
                        return false;
                    }
                    if (controlid == "txtSamsungS3ApproverId") {
                        alert('Please Enter Valid ApproverId For SamsungS3!');
                        $("#lblSamsungS3ApproverNameDesg").text("");
                        $("#txtSamsungS3ApproverId").focus();
                        return false;
                    }
                    if (controlid == "txtSamsungS4ApproverId") {
                        alert('Please Enter Valid ApproverId For SamsungS4!');
                        $("#lblSamsungS4ApproverNameDesg").text("");
                        $("#txtSamsungS4ApproverId").focus();
                        return false;
                    }
                    if (controlid == "txtSamsungS5ApproverId") {
                        alert('Please Enter Valid ApproverId For SamsungS5!');
                        $("#lblSamsungS5ApproverNameDesg").text("");
                        $("#txtSamsungS5ApproverId").focus();
                        return false;
                    }
                    if (controlid == "txtIPhone4SApproverId") {
                        alert('Please Enter Valid ApproverId For IPhone4S!');
                        $("#lblIPhone4SApproverNameDesg").text("");
                        $("#txtIPhone4SApproverId").focus();
                        return false;
                    }
                    if (controlid == "txtIPhone5SApproverId") {
                        alert('Please Enter Valid ApproverId For IPhone5S!');
                        $("#lblIPhone5SApproverNameDesg").text("");
                        $("#txtIPhone5SApproverId").focus();
                        return false;
                    }
                    if (controlid == "txtIPhone5CApproverId") {
                        alert('Please Enter Valid ApproverId For IPhone5C!');
                        $("#lblIPhone5CApproverNameDesg").text("");
                        $("#txtIPhone5CApproverId").focus();
                        return false;
                    }
                    if (controlid == "txtLGG2ApproverId") {
                        alert('Please Enter Valid ApproverId For LGG2!');
                        $("#lblLGG2ApproverNameDesg").text("");
                        $("#txtLGG2ApproverId").focus();
                        return false;
                    }

                    if (controlid == "txtSamsungNote4ApproverId") {
                        alert('Please Enter Valid ApproverId For SamsungNote4!');
                        $("#lblSamsungNote4ApproverNameDesg").text("");
                        $("#txtSamsungNote4ApproverId").focus();
                        return false;
                    }
                    if (controlid == "txtIPhone6ApproverId") {
                        alert('Please Enter Valid ApproverId For IPhone6!');
                        $("#lblIPhone6ApproverNameDesg").text("");
                        $("#txtIPhone6ApproverId").focus();
                        return false;
                    }
                    if (controlid == "txtIPhone6PApproverId") {
                        alert('Please Enter Valid ApproverId For IPhone6P!');
                        $("#lblIPhone6PApproverNameDesg").text("");
                        $("#txtIPhone6PApproverId").focus();
                        return false;
                    }
                    if (controlid == "txtLGG3ApproverId") {
                        alert('Please Enter Valid ApproverId For LGG3!');
                        $("#lblLGG3ApproverNameDesg").text("");
                        $("#txtLGG3ApproverId").focus();
                        return false;
                    }
                    if (controlid == "txtSamsungS632GBApproverId") {
                        alert('Please Enter Valid ApproverId For Samsung S6 32GB!');
                        $("#lblSamsungS632GBApproverNameDesg").text("");
                        $("#txtSamsungS632GBApproverId").focus();
                        return false;
                    }
                    if (controlid == "txtSamsungS664GBApproverId") {
                        alert('Please Enter Valid ApproverId For Samsung S6 64GB!');
                        $("#lblSamsungS664GBApproverNameDesg").text("");
                        $("#txtSamsungS664GBApproverId").focus();
                        return false;
                    }
                    if (controlid == "txtSamsungS6128GBApproverId") {
                        alert('Please Enter Valid ApproverId For Samsung S6 128GB!');
                        $("#lblSamsungS6128GBApproverNameDesg").text("");
                        $("#txtSamsungS6128GBApproverId").focus();
                        return false;
                    }
                    if (controlid == "txtSamsungS6Edge32GBApproverId") {
                        alert('Please Enter Valid ApproverId For Samsung S6 Edge 32GB!');
                        $("#lblSamsungS6Edge32GBApproverNameDesg").text("");
                        $("#txtSamsungS6Edge32GBApproverId").focus();
                        return false;
                    }
                    if (controlid == "txtSamsungS6Edge64GBApproverId") {
                        alert('Please Enter Valid ApproverId For Samsung S6 Edge 64GB!');
                        $("#lblSamsungS6Edge64GBApproverNameDesg").text("");
                        $("#txtSamsungS6Edge64GBApproverId").focus();
                        return false;
                    }
                    if (controlid == "txtSamsungS6Edge128GBApproverId") {
                        alert('Please Enter Valid ApproverId For SamsungS6 Edge 128GB!');
                        $("#lblSamsungS6Edge128GBApproverNameDesg").text("");
                        $("#txtSamsungS6Edge128GBApproverId").focus();
                        return false;
                    }

                    if (controlid == "txtappid") {
                        alert('Please Enter Valid ApproverId!');
                        $("#ContctEquiAprvName").text("");
                        $("#txtappid").focus();
                        return false;
                    }
                }
                else {
                    if (controlid == "txtLaptopApproverId") {
                        $("#lblLaptopApproverNameDesg").text(msg.d);
                    }
                    if (controlid == "txtCellphoneApproverId") {
                        $("#lblCellphoneApproverNameDesg").text(msg.d);
                    }
                    if (controlid == "txtBlackberryApproverId") {
                        $("#lblBlackberryApproverNameDesg").text(msg.d);
                    }
                    if (controlid == "txtBlackberryZ10ApproverId") {
                        $("#lblBlackberryZ10ApproverNameDesg").text(msg.d);
                    }
                    if (controlid == "txtSamsungNote3ApproverId") {
                        $("#lblSamsungNote3ApproverNameDesg").text(msg.d);
                    }
                    if (controlid == "txtSamsungS3ApproverId") {
                        $("#lblSamsungS3ApproverNameDesg").text(msg.d);
                    }
                    if (controlid == "txtSamsungS4ApproverId") {
                        $("#lblSamsungS4ApproverNameDesg").text(msg.d);
                    }
                    if (controlid == "txtSamsungS5ApproverId") {
                        $("#lblSamsungS5ApproverNameDesg").text(msg.d);
                    }
                    if (controlid == "txtIPhone4SApproverId") {
                        $("#lblIPhone4SApproverNameDesg").text(msg.d);
                    }
                    if (controlid == "txtIPhone5SApproverId") {
                        $("#lblIPhone5SApproverNameDesg").text(msg.d);
                    }
                    if (controlid == "txtIPhone5CApproverId") {
                        $("#lblIPhone5CApproverNameDesg").text(msg.d);
                    }
                    if (controlid == "txtLGG2ApproverId") {
                        $("#lblLGG2ApproverNameDesg").text(msg.d);
                    }

                    if (controlid == "txtSamsungNote4ApproverId") {
                        $("#lblSamsungNote4ApproverNameDesg").text(msg.d);
                    }
                    if (controlid == "txtIPhone6ApproverId") {
                        $("#lblIPhone6ApproverNameDesg").text(msg.d);
                    }
                    if (controlid == "txtIPhone6PApproverId") {
                        $("#lblIPhone6PApproverNameDesg").text(msg.d);
                    }
                    if (controlid == "txtLGG3ApproverId") {
                        $("#lblLGG3ApproverNameDesg").text(msg.d);
                    }
                    if (controlid == "txtSamsungS632GBApproverId") {
                        $("#lblSamsungS632GBApproverNameDesg").text(msg.d);
                    }
                    if (controlid == "txtSamsungS664GBApproverId") {
                        $("#lblSamsungS664GBApproverNameDesg").text(msg.d);
                    }
                    if (controlid == "txtSamsungS6128GBApproverId") {
                        $("#lblSamsungS6128GBApproverNameDesg").text(msg.d);
                    }
                    if (controlid == "txtSamsungS6Edge32GBApproverId") {
                        $("#lblSamsungS6Edge32GBApproverNameDesg").text(msg.d);
                    }
                    if (controlid == "txtSamsungS6Edge64GBApproverId") {
                        $("#lblSamsungS6Edge64GBApproverNameDesg").text(msg.d);
                    }
                    if (controlid == "txtSamsungS6Edge128GBApproverId") {
                        $("#lblSamsungS6Edge128GBApproverNameDesg").text(msg.d);
                    }
                    if (controlid == "txtappid") {
                        $("#ContctEquiAprvName").text(msg.d);
                    }
                    //                    $('#btnSubmit').show();
                }
            }
        });

    }
//    var mastercodesInput = '{"mode":"46","parentcode":"194","candidateId":"0"}'
//    $.ajax({
//        type: "POST",
//        url: "../FormsService.aspx/GetGeographyMaster",
//        data: mastercodesInput,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        async: false,
//        success: function (msg) {
//            $.each(msg.d, function (index, item) {
//                $("#ddEquipment").get(0).options[$("#ddEquipment").get(0).options.length] = new Option(item.Description, item.ID);
//            });
//            //document.getElementById("ddEquipment").selectedIndex = 1;
//            //    $("#ddEquipment").selectedIndex = 1;
//        },
//        error: function () {
//            alert("Failed to load");
//        }
//    });
    function EquipmentChange() {
        document.getElementById("hdnSelectedEquipment").value = $("#ddEquipment :selected").val();
        
        //var SelectedClientEquipment = document.getElementById("ddEquipment").selectedIndex;
    }

    $('input[type=radio]').change(function () {
        if (this.checked) {
            $(this).closest()
            .find('input[type=radio]name="smartphone"]').not(this)
            .prop('checked', false);
        }
    });
</script>
</html>

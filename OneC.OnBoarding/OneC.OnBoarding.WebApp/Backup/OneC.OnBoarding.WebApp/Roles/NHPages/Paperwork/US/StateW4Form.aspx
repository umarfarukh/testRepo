<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="StateW4Form.aspx.cs" Inherits="OneC.OnBoarding.WebApp.Roles.NHPages.Paperwork.US.StateW4Form" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <base target="_self" />
    <script src="../../../../Scripts/JQuery/1.8/Jquery-1.7.1.js" type="text/javascript"></script>
    <link href="../../../../Styles/Forms/StandardForms.css" rel="stylesheet" type="text/css" />
    <link href="../../../../Styles/Forms/form.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
        .collaps_title { padding: 5px; vertical-align: middle; position: relative; background: url(../../../../../Images/blue_headingbg.jpg) repeat-x; /*298015 wrong path old- ../Images/blue_headingbg.jpg */ border: 1px solid #8fb9d0; color: #19678f; }
        .collaps_title strong { position: absolute; top: 7px; left: 10px; }
        .collaps_title img { position: absolute; top: 7px; right: 10px; }
        .inputTextSmall { background: url("../../../../Images/search_inputbg.jpg") repeat-x scroll 0 0 transparent; /*298105 wrong path old- Images/search+inputbg.jpg */ border: 1px solid #717171; color: #4A4A4A; font-size: 12px; padding: 3px 5px 2px; width: 100px; }
        
        .inputTextLarge { background: url("../../../../Images/search_inputbg.jpg") repeat-x scroll 0 0 transparent; /*298105 wrong path old- Images/search+inputbg.jpg */ border: 1px solid #717171; color: #4A4A4A; font-size: 12px; padding: 3px 5px 2px; width: 200px; }
        .inputTextExtLarge { background: url("../../../../Images/search_inputbg.jpg") repeat-x scroll 0 0 transparent; /*298105 wrong path old- Images/search+inputbg.jpg */ border: 1px solid #717171; color: #4A4A4A; font-size: 12px; padding: 3px 5px 2px; width: 300px; }
        p.MsoNormal { margin-bottom: .0001pt; font-size: 10.0pt; font-family: "Verdana" , "sans-serif"; margin-left: 0in; margin-right: 0in; margin-top: 0in; }
        .stateH .state { width: 19%; height: 43px; float: left; font-size: 13px; color: #4a4a4a; padding: 5px 1px 0 8px; margin-left: 10px; border-left: 1px solid #d4e7ef; border-bottom: 1px solid #d4e7ef; }
        .stateH .state a { padding-left: 4px; }
        .Remarks { width: 76.5%; height: 43px; float: left; color: #4a4a4a; font-size: 13px; padding-top: 5px; padding-left: 5px; border-left: 1px solid #d4e7ef; border-right: 1px solid #d4e7ef; border-bottom: 1px solid #d4e7ef; }
        .pageContent .pageHeader p { color: #3f678f; font-weight: bold; font-size: 1.4em; font-family: "Trebuchet MS" ,Verdana, Arial, Helvetica, sans-serif; padding: 10px 0 0 5px; }
        .pagesDetails { margin: 0 0 0 10px; width: 880px; padding: 10px; border: 1px #d4e7ef solid; background-color: #FFF; text-decoration: none; display: inline; float: left; overflow: hidden; }
        .pageHeader { margin: 0 10px 0 10px; width: 98%; background: url(../../../../Images/pagefourheader.png) repeat-x; border: 1px #8fb9d0 solid; text-align: center; height: 20px; font-weight: bold; font-size: 1.2em; color: #3f678f; }
        
        
        #mainTable { width: 810px; margin-left: 15px; font-size: 1.3em; font-family: "Trebuchet MS" , Verdana, Arial, Helvetica, sans-serif; color: #4a4a4a; border: 1px solid #d4e7ef; line-height: 18px; }
        #mainTable tr td { border: 1px solid #d4e7ef; padding: 4px; }
        /*#overLay
        {
            display: none;
            position: fixed;
            _position: absolute; 
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            background-color: #000000;
            border: 1px solid #cecece;
            z-index: 9999;
        }
        .popupContactwrapper
        {
            background: none repeat scroll 0 0 #51aad8;
            border: 1px solid #CECECE;
            display: none;
            font-size: 13px;
            z-index: 111111;
            width: 500px;
            height: 300px;
            margin: 0px auto;
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FF51aad8',endColorstr='#FF01537e');
            -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#FF51aad8,endColorstr=#FF01537e)";
            background: -webkit-gradient(linear, left top, left bottom, from(#51aad8), to( #01537e));
            background: -moz-linear-gradient(top,  #51aad8,   #01537e);
            background: -o-linear-gradient (top, #51aad8, #01537e);
        }
        .popupContactwrapper1
        {
            border: 1px solid #CECECE;
            display: none;
            font-size: 13px;
            z-index: 111111;
            width: 325px;
            height: 215px;
            margin: 0px auto;
        }
        .popupContactwrapper2
        {
            border: 1px solid #CECECE;
            display: none;
            font-size: 13px;
            z-index: 111111;
            width: 335px;
            height: 215px;
            margin: 0px auto;
        }
        
        .popupContactwrapper #video_demo
        {
            margin: 30px 0 0 50px;
            float: left;
        }
        .popupContactwrapper p
        {
            float: right;
        } */
    </style>
    <script type="text/javascript">
        function OnDeleting() {
            $('iframe', parent.document).parent('div').find('#Pg_1_check_chkOffice').attr('disabled', false).attr('checked', false);
        }
    
    </script>
</head>
<body style="height: 2160px;">
    <form id="form1" runat="server">
    <input type="hidden" runat="server" id="hdnUploadId" />
    <div class="pageText" style="padding-left: 0px;">
        <div id="changetext" runat="server" style="display: none;">
            <p class="table_formfield" style="padding-left: 10px;">
                Please refer to the detailed state list below to determine if you are required to
                submit a state tax form. If required, please upload the relevant state tax form.
                Please contact your Recruiting Coordinator if you have any issues uploading the
                form.
            </p>
        </div>
        <div id="MckinleyText" runat="server" style="display: none;">
            <p class="table_formfield" style="padding-left: 10px;">
                At this time, we are not able to accept online submissions of State Tax Forms. In
                order to submit your State Tax form, please download the appropriate state tax form,
                complete the form, and upload a completed scanned copy here. You may also hand in
                a hard copy of your completed form to an HR representative onsite in Minot and Des
                Moines by July 13. If you have any difficulty submitting your state tax form, please
                contact us at <a href="mailto:HR@Cognizant.com" target="_blank">HR@Cognizant.com</a>.
            </p>
        </div>
        <div style="text-align: left; padding-left: 10px;">
            <table>
                <tr>
                    <td colspan="2">
                        <asp:Label ID="LblAttachFile" runat="server">
                            <strong>Attach File Here</strong></asp:Label><span style="font-style: italic; text-decoration: none;">(Valid
                                File Formats:pdf,png,jpg,tif,bmp)</span>
                    </td>
                </tr>
                <tr>
                    <td align="center" id='loadUpload'>
                        <div id="divSanUpload" runat="server">
                            <asp:FileUpload ID="FileUpload1" runat="server" name="Browse" />
                            <asp:Button ID="btnUpload" Text="Upload file" runat="server" OnClick="BtnUpload_Click"
                                Style="margin-left: 20px; background: url(../../../../Images/btn.png); width: 70px;
                                color: #fff;" />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="color: Red">
                        Note : Maximum Upload limit is 2 MB
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id="trSanControls" runat="server">
                    <td>
                        <asp:HyperLink ID="urllink" runat="server" Style="text-decoration: none;" Target="_new">
                        </asp:HyperLink>
                    </td>
                    <td>
                        <asp:Button ID="btnDelete" Text="Delete" runat="server" OnClick="BtnDelete_Click"
                            Style="background: url(../../../../Images/btn.png); width: 70px; color: #fff;
                            margin-left: 21px;" />
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
    <input type="hidden" runat="server" id="hdnSessionId" />
    <input type="hidden" runat="server" id="hdnCandidateId" />
    <input type="hidden" runat="server" id="hdnMode" />
    <input type="hidden" runat="server" id="hdnId" />
    <input type="hidden" runat="server" id="hdnCountryId" />
    <input type="hidden" runat="server" id="hdnUploadMode" />
    <script src="../../../../Scripts/Forms/CoreScripts/JSON.js" type="text/javascript"></script>
    <script src="../../../../Scripts/Forms/CoreScripts/UploadUtility.js" type="text/javascript"></script>
    <script type="text/javascript">
        var candidateId;
        $().ready(function () {
            var sessionId = $('#hdnSessionId').val();
            candidateId = $('#hdnCandidateId').val();
            var dashboardMode = $('#hdnMode').val();
            var id = $('#hdnId').val();
            var countryId = $('#hdnCountryId').val();
            var uploadMode = $('#hdnUploadMode').val();

            if (dashboardMode == NaN || dashboardMode == undefined || dashboardMode == "")
                dashboardMode = 0;
            if (uploadMode == 1) {
                customDefaults = {
                    ajaxURLPath: '../../../../',
                    imgSrc: '../../../../'
                }
                fileName = {
                    showFileName: 1
                }
                var uploadSection = '<div  fu-upId="' + $('#hdnId').val() + 'T00" fu-rnId="0" fu-ui="fileName" />';
                $('#loadUpload').html(uploadSection);
                $.fileUpload.Initialize();
            }
        });
    </script>
</body>
</html>

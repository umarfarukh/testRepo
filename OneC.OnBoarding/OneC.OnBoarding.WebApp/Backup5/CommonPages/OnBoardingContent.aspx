<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="OnBoardingContent.aspx.cs"
    Inherits="OneC.OnBoarding.WebApp.CommonPages.OnBoardingContent" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <input id="hdnExpire" runat="server" type="hidden" />
    <input id="hdnWarning" runat="server" type="hidden" />
    <input id="hdnSessionMode" runat="server" type="hidden" />
    <title></title>
    <script type="text/javascript">
        function loadIframe(url) {
            document.getElementById('iFrameLoader').src = url;
        }
    </script>
    <style type="text/css">
        #divLoader #iFrameLoader
        {
            overflow: hidden;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <div id="SpanRoles" style="font-family: 'Trebuchet MS', Arial, Helvetica, sans-serif;
            font-size: 75%;" runat="server">
            Select Role :
            <asp:DropDownList ID="SelRolesList" runat="server" Style="font-family: 'Trebuchet MS', Arial, Helvetica, sans-serif;
                font-size: 90%;" OnSelectedIndexChanged="SelRolesList_SelectedIndexChanged" AutoPostBack="true">
            </asp:DropDownList>
        </div>
    </div>
    <div id="divLoader">
        <iframe id="iFrameLoader" width="962px" height="550px" frameborder="0" scrolling="yes">
        </iframe>
    </div>
    </form>
</body>
</html>

<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SANRedirectionPage.aspx.cs" Inherits="OneC.OnBoarding.WebApp.Roles.SANRedirectionPage" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Photo Redirection</title>    
</head>
<body>
    <form id="form1" runat="server">
    <div>    
    <input type="hidden" runat="server" id="hdnSessionId" />
    <input type="hidden" runat="server" id="hdnCandidateID" />
    <input type="hidden" runat="server" id="sanMReturnHdnField" />
    <input type="hidden" runat="server" id="sanMClientHdnField" />
    </div>
    </form>
</body>
</html>

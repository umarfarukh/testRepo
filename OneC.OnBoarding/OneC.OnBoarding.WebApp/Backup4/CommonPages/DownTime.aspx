<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DownTime.aspx.cs" Inherits="OneC.OnBoarding.WebApp.CommonPages.DownTime" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Downtime</title>
    <link href="../Styles/downtime.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <div class="div-main">
        <div class="logo">
            <img src="../Images/logo_1c.png" alt="One Cognizant"></div>
        <div class="content">
            <div class="flt_left">
                <img src="../Images/icon-downtime.png" alt="" style="padding-top:15px;"/></div>
           <%-- <img src="../Images/icon-downtime.png" />--%>
            <div class="flt_right wd-content">
                <p>
                    OneC Onboarding application is currently <strong>down for a planned maintenance activity</strong>.
                    Please see below the time when the site will be back up.</p>
                <p class="mart10">
                    Thanks for your patience.</p>
            </div>
            <div class="clear">
            </div>
        </div>
        <div class="txt-center">
            <p class="sub-title">
                Maintenance Schedule</p>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="downtime-grid">
                <tr>
                    <th width="160px">
                        Time zone
                    </th>
                    <th width="200px">
                        Start time
                    </th>
                    <th width="200px" class="lastcol">
                        End time
                    </th>
                </tr>
                <tr class="odd">
                    <td class="bor-right-td">
                        IST
                    </td>
                    <td class="bor-right-grid">
                        <asp:Label ID="lblISTStart" runat="server" Text="Label"></asp:Label>
&nbsp;</td>
                    <td class="bor-right-grid">
                        <asp:Label ID="lblISTEnd" runat="server" Text="Label"></asp:Label>
                    </td>
                </tr>
                <tr class="even">
                    <td class="bor-right-td">
                        PST
                    </td>
                    <td class="bor-right-grid">
                        <asp:Label ID="lblPSTStart" runat="server" Text="Label"></asp:Label>
                    </td>
                    <td class="bor-right-grid">
                        <asp:Label ID="lblPSTEnd" runat="server" Text="Label"></asp:Label>
                    </td>
                </tr>
                <tr class="odd">
                    <td class="bor-right-td">
                        GMT
                    </td>
                    <td class="bor-right-grid">
                        <asp:Label ID="lblGMTStart" runat="server" Text="Label"></asp:Label>
                    </td>
                    <td class="bor-right-grid">
                        <asp:Label ID="lblGMTEnd" runat="server" Text="Label"></asp:Label>
                    </td>
                </tr>
            </table>
        </div>
        
    </div>
    </form>
</body>
</html>


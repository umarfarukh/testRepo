<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AccessBlock.aspx.cs" Inherits="OneC.OnBoarding.WebApp.AccessBlock" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Access Blocked</title>
    <%--<script language="javascript" type="text/javascript">
        window.onload = function () { Clear(); }
        function Clear() {
            var Backlen = history.length;
            if (Backlen > 0) { history.go(-Backlen) };
        }

        if (window.history.forward(1) != null)
            window.history.forward(1);
    </script>--%>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <div class="wide_wrapper">
            <table style="width: 90%;" cellpadding="5%" cellspacing="5%">
                <tr>
                    <td>
                        <div class="space_L20">
                            <br />
                            <div class='outerDiv'>
                                <div style='text-align: center'>
                                    <img src="Images/OneCOnboarding.png" alt='One Cognizant' />
                                </div>
                                <div style='font-family: Trebuchet MS,Verdana, Arial, Helvetica, sans-serif; font-size: 14px;
                                    color: #4a4a4a; text-align: center; padding-top: 7px;'>
                                    <div id="divBody" style="color: #0379b4;" runat="server">
                                    </div>
                                    <br />
                                </div>
                            </div>
                        </div>
                        <br />
                    </td>
                </tr>
            </table>
        </div>
    </div>
    </form>
</body>
</html>

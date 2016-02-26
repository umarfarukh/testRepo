<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PopUp.aspx.cs" Inherits="OneC.OnBoarding.WebApp.CommonPages.PopUp" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <script src="../Scripts/JQuery/1.8/Jquery-1.7.1.js" type="text/javascript"></script>
    <script type="text/javascript" language="javascript">
        var timer = (parseInt(parent.sessionExpireTime) - parseInt(parent.sessionWarnTime)) / 1000;
        var sessionExpireCount = parseInt(parent.sessionExpireTime) / 1000;
        var popupInterval;

        $(document).ready(function () {
            $("#spnTimer").text("Your session will expire in " + timer + " seconds. Please click OK to continue your session");
            popupInterval = setInterval(ShowTimer, 1000);
        });

        function ShowTimer() {
            timer--;
            if (timer == 0) {
                clearInterval(popupInterval);
                self.parent.tb_remove();
                if (document.all['hdnSSId'] != null) {
                    self.parent.location = "../Accessblock.aspx?SSId=" + document.all['hdnSSId'].value.toString() + "&BlockId=7"; // Session expired
                }
                else {
                    self.parent.location = "../Accessblock.aspx?BlockId=7";  // Session expired 
                }
            }
            else {
                $("#spnTimer").text("Your session will expire in " + timer + " seconds. Please click OK to continue your session");
            }
        }

        function ClosePopup() {
            self.parent.tb_remove();
            self.parent.ResetTimer();
        }
    </script>
</head>
<body background="../Images/Bg_Img_new.png">
    <form id="form1" runat="server">
    <div>
        <span id="spnTimer" style="background-image: url('../Images/Bg_Img_new.png');"></span>
        <br />
        <%--<a href="javascript:self.parent.tb_remove();self.parent.ResetTimer();">ok</a>--%>
        <asp:Button ID="btnOk" runat="server" Text="Ok" onclick="BtnOk_Click"
            BackColor="Gray" Font-Bold="True" ForeColor="White"  />
    </div>
    </form>
</body>
</html>

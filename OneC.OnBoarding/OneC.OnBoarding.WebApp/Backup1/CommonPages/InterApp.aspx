<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="InterApp.aspx.cs" Inherits="HReStorage.InterApp" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Intermediate Page</title>
    <style type="text/css">
    body{
       font-family:"Calibri", Arial, Helvetica, sans-serif;  font-size:12px; 
       background-color:#e1e7e9;
        }
        #GetVal{
            display:none;
            }
        ._upload{
            height:20px;
            width:60px;
            cursor:pointer;
            border-radius:4px;
            *font-size:1em;
            border: 1px solid #5482a3;  
            color : #fff;
            background-color:#3a6686;
            margin-left: 45%; margin-top: 40px;
        } 
    </style>
    <script src="../Scripts/JQuery/1.8/Jquery-1.7.1.js" type="text/javascript"></script>
    <script src="../Scripts/JQuery/1.8/jquery-ui-1.8.16.custom.min.js" type="text/javascript"></script>
    <script type="text/javascript">

        var Message = "";
        var Code = "";
        function DoOnSuccess() {
            $('iframe', parent.document).parent('div').find('#uploadNote').remove();
            $('#returnMsg').text(SendUtilMessage);
            parent.ECM.Msg(SendCode, SendMessage, SendUtilMessage, SendStatus, DocumentID);
        }
    </script>
</head>
<body>
    <div class="temp">
        <form id="Intermediate" runat="server" enctype="multipart/form-data" style="padding-top: 60px">
        <asp:TextBox ID="GetVal" runat="server">Currently No Value</asp:TextBox>
        <div>
            <label id="returnMsg" style="padding-left: 80px">
            </label>
            <br />
            <input type="button" class="_upload" onclick="parent.ECM.PopUpClose(0)" value="Ok" />
        </div>
        </form>
    </div>
</body>
</html>

<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="UploadFile.aspx.cs" Inherits="OneC.OnBoarding.WebApp.CommonPages.UploadFile" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
      <script language="javascript" type="text/javascript">
         
          window.closeChild = function () {
              window.close();
          }

       
        </script>
</head>
<body>
    <form id="form1" runat="server">
    <input type="hidden" id="hdnLoginID" runat="server" />
    <div>
     <table style="width:70%;" id="tblFAQMail"><tr>
        <td width="30%"  style="margin-top:7px;">
               <h5> Attachment :</h5></td>
        
        <td>
            <asp:FileUpload ID="FileUploadAttach" runat="server" 
                Width="95%" />
                
        </td> 
        <td>
         <asp:Button ID="btnUploadFile" runat="server" Text="Post Query"
                    CssClass="btn_field flt_right" onclick="BtnUploadFile_Click" 
                Width="90px"/></td>
                
    </tr>
    </table>
    </div>
    </form>
</body>
</html>

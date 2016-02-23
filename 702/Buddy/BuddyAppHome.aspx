<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="BuddyAppHome.aspx.cs" Inherits="Buddy.BuddyAppHome" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Buddy App</title> 
    <meta http-equiv="X-UA-Compatible" content="IE=8,IE=EDGE,IE=9" /> 
   
</head>
<body id="buddy_app_launch_page">
    
    <div id="wrapper">   
    </div>

    <input id="IsJoinee" runat="server" type="hidden" /> 
    <input id="IsLateral" runat="server" type="hidden" /> 
    <input id="CurrentUserId" runat="server" type="hidden" /> 
    <input id="UserCountryId" runat="server" type="hidden" />
    
    <script src="Resources/JS/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript">
         $(document).ready(function () {
             if ($("#IsJoinee").val() == "True") {
                 if ($("#IsLateral").val() == "True") {
                     if ($("#UserCountryId").val() == "USA") {
                         window.location = "Pages/NA/NewHire_View.aspx";
                     }
                     else {
                         window.location = "new_joiners_view_welcome.aspx";
                     }
                 }
                 else {
                     window.location = "BuddyAppEligibleError.aspx";                     
                 }
             }
             else {
                 if ($("#UserCountryId").val() == "USA") {
                     window.location = "Pages/NA/Advisor_View.aspx";
                 }
                 else {
                     window.location = "buddy_view_welcome.aspx";
                 }
             }
         });
    </script> 
</body>
</html>

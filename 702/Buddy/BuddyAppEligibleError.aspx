<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="BuddyAppEligibleError.aspx.cs" Inherits="Buddy.BuddyAppEligibleError" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Buddy App</title>
    <meta http-equiv="X-UA-Compatible" content="IE=8,IE=EDGE,IE=9" />
    <link href="Resources/Styles/reset.css" rel="stylesheet" type="text/css"/>
	<link href="Resources/Styles/styles.css" rel="stylesheet" type="text/css"/>
</head>
<body id="buddy_app_launch_page">
    <div id="wrapper" style="background-color:White; background-image:none; border:3px solid gray">
    <input id="CurrentUserId" runat="server" type="hidden" />    
    <asp:Label runat="server" id="lblOnError"><center style="margin-top:130px; color:Maroon; font-family:Comic Sans MS;" ><b style="font-size:20px">Sorry, Currently you don't have access since this application is in pilot phase</b><br /><br /><br /><p style="font-size:16px"></p><br/><p style="font-size:16px"></p><br/><p style="font-size:16px"></p></center></asp:Label>    
    <img src="Resources/Images/errTextImage.png" style="margin-left:650px; width:200px" />
    <br/>
    <img src="Resources/Images/errJoineeImage.jpg" style="margin-left:50px; width:175px;"/>
    <img src="Resources/Images/errBuddyImage.jpg" style="margin-left:500px" />
    </div>
</body>
</html>

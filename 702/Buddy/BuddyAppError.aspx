<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="BuddyAppError.aspx.cs" Inherits="Buddy.BuddyAppError" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Buddy App</title>
    <meta http-equiv="X-UA-Compatible" content="IE=8,IE=EDGE,IE=9" />
    <link href="Resources/Styles/reset.css" rel="stylesheet" type="text/css"/>
	<link href="Resources/Styles/styles.css" rel="stylesheet" type="text/css"/>
</head>
<body id="buddy_app_launch_page">
    <div id="wrapper" style="background-color:White; background-image:none; border:3px solid gray">
    <input id="CurrentUserId" runat="server" type="hidden" />    
    <asp:Label runat="server" id="lblOnError"><center style="margin-top:130px; color:Maroon; font-family:Comic Sans MS;" ><b style="font-size:20px">Well this is Embarrasing...!!!</b><br /><br /><br /><p style="font-size:16px">Seems like this page has gone to find it’s own Buddy…</p><br/><p style="font-size:16px">Hope it comes back soon</p><br/><p style="font-size:16px">Till then you can get a cup of coffee for you</p></center></asp:Label>    
    <img src="Resources/Images/errTextImage.png" style="margin-left:650px; width:200px" />
    <br/>
    <img src="Resources/Images/errJoineeImage.jpg" style="margin-left:50px; width:175px;"/>
    <img src="Resources/Images/errBuddyImage.jpg" style="margin-left:500px" />
    <br/>
    <br/>
    <br/>
    <br/>
    <label style="font-size:12px; margin-left:50px; color:Red;" >*Error Message - </label>
    <label id="ErrorMessage" runat="server" style="font-size:12px; color:Red;" ></label>
    
    </div>
</body>
</html>

﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="buddy_view_home.aspx.cs" Inherits="Buddy.Buddy_view_home" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="X-UA-Compatible" content="IE=8,IE=EDGE,IE=9" />
    <title>Buddy App</title>
		<link href="Resources/Styles/reset.css" rel="stylesheet" type="text/css"/>
		<link href="Resources/Styles/styles.css" rel="stylesheet" type="text/css"/>
</head>
<body id="buddy_view_home">
		<div id="wrapper">
			<div class="header clear">
				<img src="Resources/Images/logo.png" alt="logo" class="logo"/>
			</div>			
			<div class="home_content_wrapper">	
				<div class="home_content clear">
					<div class="div_590_123 fleft clear">
						<a href="buddy_view_storyline.aspx" class="div_285_120 fleft color_5515a7">
							<div class="home_tile_wrapper">
								<img src="Resources/Images/storyline_tile.png" alt="logo" class="home_tile_image"/>
								<p>Storyline</p>
							</div>
							<div class="home_tile_description">
								<p>Read the Storyline</p>
							</div>
						</a>
						<a href="Buddy_view_history.aspx" class="div_285_120 fleft color_de781b">
							<div class="home_tile_wrapper">
								<img src="Resources/Images/history_tile.png" alt="logo" class="home_tile_image"/>
								<p>History</p>
							</div>
							<div class="home_tile_description">
								<p>Check out the history of connections</p>
							</div>
						</a>
					</div>
					<div class="div_590_122 fleft clear">
						<a href="buddy_view_circles.aspx" class="div_190_120 fleft color_00728f">
							<div class="home_tile_wrapper">
								<img src="Resources/Images/circles_tile.png" alt="logo" class="home_tile_image"/>
								<p>Circles</p>
							</div>
							<div class="home_tile_description">
								<p>Search in your circles</p>
							</div>
						</a>
						<a href="buddy_view_notifications.aspx" class="div_190_120 fleft color_1fb259">
							<div class="home_tile_wrapper">
								<div class="unread_notifications_home" id="unread_Notify" style="display:none"></div>
								<img src="Resources/Images/notifications_tile.png" alt="logo" class="home_tile_image"/>
								<p>Notifications</p>
							</div>
							<div class="home_tile_description">
								<p>Check the notifications</p>
							</div>
						</a>
						<a href="#" class="div_190_120 fleft color_363636 info_btn_tile">
							<div class="home_tile_wrapper">
								<img src="Resources/Images/info_tile.png" alt="logo" class="home_tile_image"/>
								<p>Information</p>
							</div>
							<div class="home_tile_description">
								<p>For your information</p>
							</div>
						</a>
					</div>
				</div>	
			</div>	
            <a href="buddy_view_storyline.aspx" class="back_arrow"></a>
			<div class="cindy_home"><img src="Resources/Images/cindy_right.gif" alt="Cindy"/></div>
			<div class="overlay"></div>
			<div class="info_screen">
				<div class="contact_card_header clear">
					<p>Enroll as Buddy!</p>
					<img src="Resources/Images/contact_close.png" alt="Close" class="info_screen_close"/>
				</div>
				<div class="info_screen_details contact_details clear">
					<p>
						<span><img src="Resources/Images/go_arrow.png" alt="Arrow"/></span>
						<span>Enroll yourself as buddy.</span>
					</p>
					<p>
						<span><img src="Resources/Images/go_arrow.png" alt="Arrow"/></span>
						<span>You will receive request mail, if a new joiner selects you as buddy.</span>
					</p>
					<p>
						<span><img src="Resources/Images/go_arrow.png" alt="Arrow"/></span>
						<span>Once request accepted, you will be buddy for <label id="lblConnectionDuration" runat="server"></label> days.</span>
					</p>
                    <p>
						<span><img src="Resources/Images/go_arrow.png" alt="Arrow"/></span>
						<span>For any further queries drop a mail to <a id="A1" href="#" runat="server" onclick="MailToTMTeam();"><u>buddyapp@cognizant.com</u></a></span>
					</p>
				</div>
				<div class="contact_card_footer"></div>
			</div>
            <div class="error_popup hiddenDiv">
				<div class="contact_card_header clear">
					<p>Error!</p>
					<img src="Resources/Images/contact_close.png" alt="Close" class="error_popup_close"/>
				</div>
				<div class="info_screen_details contact_details clear">
					<p>
						<span id="lblCommonInfoPopup" style="font-size:16px"></span>
					</p>                    
				</div>
				<div class="contact_card_footer"></div>
			</div>
            <div class="successful_popup hiddenDiv">
				<div class="contact_card_header clear">
					<p>Successful!</p>
					<img src="Resources/Images/contact_close.png" alt="Close" class="successful_popup_close"/>
				</div>
				<div class="info_screen_details contact_details clear">
					<p>
						<span id="lblSuccessfulPopup" style="font-size:16px"></span>
					</p>
					<a href="#" onclick="closeSuccessPopup();" class="confirmation_popup_btn ok_btn">OK</a>
				</div>
				<div class="contact_card_footer"></div>
			</div>
		</div>

        <input id="CurrentUserId" runat="server" type="hidden" />
        <input id="DisplayName" runat="server" type="hidden" />
        <input id="isRegistered" runat="server" type="hidden" />
		<input id="isSupervisor" runat="server" type="hidden" />
        <input id="isTM" runat="server" type="hidden" />
        <input id="isMasteradmin" runat="server" type="hidden" />
        <input id="myImageSrc" runat="server"  type="hidden" />
        <input id="Gender" runat="server"  type="hidden" />
        <input id="ConnectionDuration" type="hidden" runat="server" />

		<script type="text/javascript" src="Resources/JS/jquery-1.8.3.js"></script>
		<script type="text/javascript" src="Resources/JS/jquery.livequery.js"></script>
		<script type="text/javascript" src="Resources/JS/jquery.jkit.1.1.11.js"></script>
		<script type="text/javascript" src="Resources/JS/buddy_view.js"></script>
          <script type="text/javascript">
              $(document).ready(function () {
                  
                  document.getElementById('lblConnectionDuration').innerHTML = ConnectionDuration.value;
                  GetBuddiesNotificationCount();
              });  
        </script>
	</body>
</html>

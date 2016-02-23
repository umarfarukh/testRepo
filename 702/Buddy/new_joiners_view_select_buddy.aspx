<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="New_joiners_view_select_buddy.aspx.cs" Inherits="Buddy.New_joiners_view_select_buddy" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="X-UA-Compatible" content="IE=8,IE=EDGE,IE=9" />
    <title>Buddy App</title>
		<link href="Resources/Styles/reset.css" rel="stylesheet" type="text/css"/>
		<link href="Resources/Styles/styles.css" rel="stylesheet" type="text/css"/>
</head>
<body id="New_joiners_view_select_buddy">
		<div id="wrapper">
			<div class="header clear">
				<img src="Resources/Images/logo.png" alt="logo" class="logo"/>
				<a href="New_joiners_view_home.aspx" class="menu_btn home_btn"></a>
				<a href="#" class="menu_btn info_btn"></a>
				<a href="Admin_view_newjoiners.aspx" class="menu_btn admin_view_btn"></a>
				
				<a href="New_joiners_view_history.aspx" class="menu_btn history_header_btn"></a>
				<a href="New_joiners_view_notifications.aspx" class="menu_btn notifications_btn"></a>
				<a href="New_joiners_view_circles.aspx" class="menu_btn circles_btn"></a>
				<a href="New_joiners_view_registered_available_buddies.aspx" class="menu_btn registered_available_btn"></a>
				<a href="New_joiners_view_select_buddy.aspx" class="menu_btn select_buddy_btn selected"></a>
				<a href="New_joiners_view_storyline.aspx" class="menu_btn storyline_btn"></a>
			</div>
			<div class="overlay"></div>
			<div class="select_buddy_wrapper">
				<a href="#" class="div_355_165 fleft cursor_default">
					<div class="page_title">
						<p class="font_30">Select your</p>
						<p class="font_88">Buddy</p>
                        <p style="font-size: 20px;">(3 simple ways)</p>
					</div>
				</a>
				<a href="New_joiners_view_registered_available_buddies.aspx" class="div_355_165 color_de7a10 marginLeft_10 fleft">
					<div class="tile_content">
						<p class="bold">Enrolled buddies</p>
						<p>Find the list of enrolled Buddies in the organization, in your BU and office. </p>
					</div>
				</a>
				<a href="#" class="div_355_165 color_141414 marginTop_10 fleft ask_your_supervisor">
					<div class="tile_content">
						<p class="bold">Ask your supervisor</p>
						<p>You may check with your supervisor to nominate a Buddy for you.</p>
					</div>
				</a>
				<a href="New_joiners_view_circles.aspx" class="div_355_165 color_15b43b marginTop_10 marginLeft_10 fleft">
					<div class="tile_content">
						<p class="bold">Explore the circles</p>
						<p>Check out the relevant people circles, like your peers, bay mates and other associates of your choice. 
                        <br/>Do you know someone in Cognizant and want to reach out to them, search here and if there are interested they can be a Buddy of yours too!
                        </p>
					</div>
				</a>				
			</div>
			<a href="New_joiners_view_registered_available_buddies.aspx" class="proceed_arrow"></a>
			<div class="info_screen">
				<div class="contact_card_header clear">
					<p>Make a buddy:</p>
					<img src="Resources/Images/contact_close.png" alt="Close" class="info_screen_close"/>
				</div>
				<div class="info_screen_details contact_details clear">
					<p>
						<span><img src="Resources/Images/go_arrow.png" alt="Arrow"/></span>
						<span>Click on the name to visit profile.</span>
					</p>
					<p>
						<span><img src="Resources/Images/go_arrow.png" alt="Arrow"/></span>
						<span>Select a person whom you want to make buddy.</span>
					</p>
					<p>
						<span><img src="Resources/Images/go_arrow.png" alt="Arrow"/></span>
						<span>Once selected, request will be sent to that person.</span>
					</p>
					<p>
						<span><img src="Resources/Images/go_arrow.png" alt="Arrow"/></span>
						<span>If person accepts the request, he will be your buddy for <label id="lblConnectionDuration" runat="server"></label> days.</span>
					</p>
					<p class="font_bold">
						<span><img src="Resources/Images/go_arrow.png" alt="Arrow"/></span>
						<span>You can make buddy to associate 2 levels higher to you.</span>
					</p>
                    <p>
						<span><img src="Resources/Images/go_arrow.png" alt="Arrow"/></span>
						<span>For any further queries drop a mail to <a id="A1" href="#" runat="server" onclick="MailToTMTeam();"><u>buddyapp@cognizant.com</u></a></span>
					</p>
				</div>
				<div class="contact_card_footer"></div>
			</div>
			<div class="ask_supervisor_popup">
				<div class="contact_card_header clear">
					<p>Request for a buddy?</p>
					<img src="Resources/Images/contact_close.png" alt="Close" class="ask_supervisor_popup_close"/>
				</div>
				<div class="info_screen_details contact_details clear">
					<p>Do you want to send a request to your supervisor, <span class="bold" id="lblSupervisorName"></span> to help you in connecting with a buddy?</p>
					<div class="clear">
						<a href="#" class="confirmation_popup_btn ask_supervisor_agree">Yes</a>
						<a href="#" class="confirmation_popup_btn ask_supervisor_cancel">Cancel</a>
					</div>
					<p class="disclaimer">*On confirmation, a request mail will be triggered to your supervisor.</p>
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
		<input id="isSupervisor" runat="server" type="hidden" />
        <input id="isTM" runat="server" type="hidden" />
        <input id="isMasteradmin" runat="server" type="hidden" />
        <input id="myImageSrc" runat="server"  type="hidden" />
        <input id="Gender" runat="server"  type="hidden" />
        <input id="filter_type" runat="server" type="hidden" />
        <input id="ConnectionDuration" type="hidden" runat="server" />

		<script type="text/javascript" src="Resources/JS/jquery-1.8.3.js"></script>
		<script type="text/javascript" src="Resources/JS/jquery.livequery.js"></script>
		<script type="text/javascript" src="Resources/JS/jquery.jkit.1.1.11.js"></script>
		<script type="text/javascript" src="Resources/JS/new_joiners_view.js"></script>
        <script src="Resources/JS/JSCommunicatorStatus.js" type="text/javascript"></script>
        <script type="text/javascript">
            $(document).ready(function () {
                document.getElementById('lblConnectionDuration').innerHTML = ConnectionDuration.value;
            });  
        </script>
	</body>
</html>

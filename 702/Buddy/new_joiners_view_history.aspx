﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="New_joiners_view_history.aspx.cs" Inherits="Buddy.New_joiners_view_history" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="X-UA-Compatible" content="IE=8,IE=EDGE,IE=9" />
    <title>Buddy App</title>
		<link href="Resources/Styles/reset.css" rel="stylesheet" type="text/css"/>
		<link href="Resources/Styles/styles.css" rel="stylesheet" type="text/css"/>
</head>
<body id="New_joiners_view_history">
		<div id="wrapper">
			<div class="header clear">
				<img src="Resources/Images/logo.png" alt="logo" class="logo"/>
				<a href="New_joiners_view_home.aspx" class="menu_btn home_btn"></a>
				<a href="#" class="menu_btn info_btn"></a>
				<a href="Admin_view_newjoiners.aspx" class="menu_btn admin_view_btn"></a>
				
				<a href="New_joiners_view_history.aspx" class="menu_btn history_header_btn selected"></a>
				<a href="New_joiners_view_notifications.aspx" class="menu_btn notifications_btn"></a>
				<a href="New_joiners_view_circles.aspx" class="menu_btn circles_btn"></a>
				<a href="New_joiners_view_registered_available_buddies.aspx" class="menu_btn registered_available_btn"></a>
				<a href="New_joiners_view_select_buddy.aspx" class="menu_btn select_buddy_btn"></a>
				<a href="New_joiners_view_storyline.aspx" class="menu_btn storyline_btn"></a>
			</div>
			<div class="cindy_circles"><img src="Resources/Images/cindy_left.gif" alt="Cindy"/></div>
			<div class="history_wrapper clear">
				<div class="feedback_callout_wrapper clear">
					<div class="cindy_callout">
						<p class="callout_address">Hey <span id="myName"></span>,</p>
						<p><label id="changetext"></label><span class="font_bold" id="name"></span>!</p>
					</div>
					<div class="feedback_button_wrapper">
						<p class="registered_available_text">History of Connections</p>
					</div>
				</div>
				<div class="history_content_wrapper">
					<p class="clear">
						<span><a href="New_joiners_view_home.aspx" title="Go Home"><img src="Resources/Images/back_arrow.png" alt="Arrow" class="history_back_arrow"/></a></span>
						<span>Connections</span>
					</p>
					<div class="history_content">
						<div class="history_header">
							<span>Sl.No.</span>
							<span>Name</span>
						</div>
						<div class="history_content_details clear">
							<div class="history_content_left mousescroll" id="JoineeHistory">								
							</div>
							<div class="history_content_right hiddenDiv">
								<div class="history_image_name clear">
									<a id="viewprofile" target="_blank" runat="server" title="View Profile" href="#"><span class="history_right_image fleft"><img class="background-size-cover" runat="server" alt="User" id="BuddyImage" /></span></a>
									<div class="history_right_details fleft">
										<p class="font_name" id="BuddyName"></p>
										<p class="designation" id="BuddyDesignation"></p>
									</div>
								</div>
								<p class="clear"><span class="width_50">From</span><span>:</span><span class="fromDate margin_10" id="StartDate"></span></p>
								<p class="clear"><span class="width_50">To</span><span>:</span><span class="toDate margin_10" id="EndDate"></span></p>
								<p class="clear"><span class="width_50">Status</span><span>:</span><span class="status margin_10" id="Status"></span></p>
								<div class="history_btn_wrapper clear">
									<a href="#" class="history_btn feedback_btn" id="feedbtn">Feedback</a>
									<a href="#" class="history_btn disconnect_btn" id="disconnectbtn">Disconnect</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="overlay"></div>
			<div class="contact_card" style="top:20px;">
				<div class="contact_card_header clear">
					<p>Profile of <span id="ccDisplayName"></span></p>
					<img src="Resources/Images/contact_close.png" alt="Close" class="contact_close"/>
				</div>
				<div class="contact_details clear">
					<div class="contact_details_primary_wrapper clear">
						<div class="contact_details_image_bg">
							<div class="contact_details_shine"></div>
							<div class="thumbnail75"><img id="ccPhoto" alt="User"/></div>
						</div>
						<div class="contact_details_primary">
							<p class="associate_name" id="ccUserName"></p>
							<p class="designation" id="ccDesignation"></p>
						</div>
					</div>
					<div class="contact_details_secondary_wrapper clear">
						<div class="contact_details_secondary clear">
							<p class="contact_info_title">Status</p>
							<p class="divider">:</p>
							<p class="contact_info_details" id="ccRegStatus"></p>
						</div>
						<div class="contact_details_secondary clear">
							<p class="contact_info_title">Availability</p>
							<p class="divider">:</p>
							<p class="contact_info_details" id="ccAvailStatus" style="width: 365px;"></p>
						</div>
						<div class="contact_details_secondary clear">
							<p class="contact_info_title">Speaks</p>
							<p class="divider">:</p>
							<p class="contact_info_details" id="ccSpeaks"></p>
						</div>
                        <div class="contact_details_secondary clear">
							<p class="contact_info_title">Office Venue</p>
							<p class="divider">:</p>
							<p class="contact_info_details" id="ccOfficeVenue"></p>
						</div>
						<div class="contact_details_secondary clear">
							<p class="contact_info_title">Location</p>
							<p class="divider">:</p>
							<p class="contact_info_details" id="ccLocation"></p>
						</div>
						<div class="contact_details_secondary clear">
							<p class="contact_info_title">Project</p>
							<p class="divider">:</p>
							<p class="contact_info_details" id="ccProject"></p>
						</div>
						<div class="contact_details_secondary clear">
							<p class="contact_info_title">Business Unit</p>
							<p class="divider">:</p>
							<p class="contact_info_details" id="ccBU"></p>
						</div>
						<div class="contact_details_secondary clear">
							<p class="contact_info_title">Associate ID</p>
							<p class="divider">:</p>
							<p class="contact_info_details" id="ccUserId"></p>
						</div>
						<div class="contact_details_secondary clear">
							<p class="contact_info_title">Mobile/Vnet</p>
							<p class="divider">:</p>
							<p class="contact_info_details" id="ccMobile"></p>
						</div>
						<p class="contact_error"><span class="sorry">Sorry! </span><span class="error_message">You are not eligible to send request to associates higher than 2 levels of you.</span></p>
					</div>
					<a href="#" class="contact_card_btn send_buddy_request_btn">Send Buddy Request</a>
					<a href="#" target="_blank" class="contact_card_btn detailed_profile_btn">Detailed Profile</a>
                    <input type="hidden" id="ccEmailId" runat="server" />
				</div>
				<div class="contact_card_footer"></div>
			</div>
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
			<div class="confirmation_popup">
				<div class="contact_card_header clear">
					<p>Are you sure?</p>
					<img src="Resources/Images/contact_close.png" alt="Close" class="confirmation_popup_close"/>
				</div>
				<div class="confirmation_popup_details contact_details clear">
					<p>
						Do you want to send buddy request to <span class="font_bold" id="lblConfirmBuddyReqName"></span>?
					</p>
					<a href="#" class="confirmation_popup_btn disagree_btn">Disagree</a>
					<a href="#" class="confirmation_popup_btn agree_btn">Agree</a>
				</div>
				<div class="contact_card_footer"></div>
			</div>
			<div class="sent_request_info_popup">
				<div class="contact_card_header clear">
					<img src="Resources/Images/contact_close.png" alt="Close" class="sent_request_info_popup_close"/>
				</div>
				<div class="confirmation_popup_details contact_details clear">
					<p>           
                        You have sent a Buddy request to <span class="font_bold" id="lblRequestedBuddyName"></span> and the acceptance is pending. 
                    </p>
                    <br/>
                    <br/>
                    <p>      
                         If your request is not accepted in 3 working days, it will be terminated. You may raise a new Buddy request.                  						
					</p>  
                    <a href="#" onclick="closeSentRequestPopup();" class="confirmation_popup_btn ok_btn">OK</a> 
				</div>
				<div class="contact_card_footer"></div>
			</div>
			<div class="discontinue_confirmation_popup">
				<div class="contact_card_header clear">
					<p>Are you sure?</p>
					<img src="Resources/Images/contact_close.png" alt="Close" class="discontinue_confirmation_popup_close"/>
				</div>
				<div class="confirmation_popup_details contact_details clear">
					<p>
						Do you really want to discontinue with this buddy?
					</p>
					<a href="#" class="confirmation_popup_btn disagree_btn">Disagree</a>
					<a href="#" class="confirmation_popup_btn agree_btn">Agree</a>
				</div>
				<div class="contact_card_footer"></div>
			</div>
			<div class="discontinue_sent_info_popup">
				<div class="contact_card_header clear">
					<p>Disconnect Request Sent!</p>
					<img src="Resources/Images/contact_close.png" alt="Close" class="discontinue_sent_info_popup_close"/>
				</div>
				<div class="confirmation_popup_details contact_details clear">
					<p>
						Your disengagement request has been sent to buddy!
					</p>
					<a href="#" class="confirmation_popup_btn ok_btn">OK</a>
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
        <input id="User_Id" runat="server" type="hidden" />
        <input id="HistoryBuddyId" type="hidden" runat="server" />
        <input id="ConnectionDuration" type="hidden" runat="server" />
        <input id="SendMailEmailId" type="hidden" runat="server" />

		<script type="text/javascript" src="Resources/JS/jquery-1.8.3.js"></script>
		<script type="text/javascript" src="Resources/JS/jquery.livequery.js"></script>
		<script type="text/javascript" src="Resources/JS/new_joiners_view.js"></script>
		<script type="text/javascript" src="Resources/JS/jquery.jkit.1.1.11.js"></script>
		<script type="text/javascript" src="Resources/JS/jquery.bgdsize.js"></script>
		<!-- for scroll -->
		<script type="text/javascript" src="Resources/JS/jquery-ui-1.9.2.custom.min.js"></script>
		<script type="text/javascript" src="Resources/JS/scroll.js"></script>
                <script type="text/javascript">
                    $(document).ready(function () {
                        document.getElementById('myName').innerHTML = DisplayName.value;
                        document.getElementById('lblConnectionDuration').innerHTML = ConnectionDuration.value;
                    });            
        </script>
        <script src="Resources/JS/JSCommunicatorStatus.js" type="text/javascript"></script>
	</body>
</html>

<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="New_joiners_view_registered_available_buddies.aspx.cs" Inherits="Buddy.New_joiners_view_registered_available_buddies" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="X-UA-Compatible" content="IE=8,IE=EDGE,IE=9" />
    <title>Buddy App</title>
		<link href="Resources/Styles/reset.css" rel="stylesheet" type="text/css"/>
		<link href="Resources/Styles/styles.css" rel="stylesheet" type="text/css"/>
		<link href="Resources/Styles/jquery-ui-autocomplete.css" rel="stylesheet" type="text/css"/>        
</head>
<body id="New_joiners_view_registered_available_buddies">
		<div id="wrapper">
			<div class="header clear">
				<img src="Resources/Images/logo.png" alt="logo" class="logo"/>
				<a href="New_joiners_view_home.aspx" class="menu_btn home_btn"></a>
				<a href="#" class="menu_btn info_btn"></a>
				<a href="Admin_view_newjoiners.aspx" class="menu_btn admin_view_btn"></a>
				
				<a href="New_joiners_view_history.aspx" class="menu_btn history_header_btn"></a>
				<a href="#" class="menu_btn notifications_btn" onclick="GetJoineeNotify();">
					<div class="unread_notifications" id="unread_Notify" ></div>	
                    <div class="notifications_popup_arrow" id="dvNotificationArrow" style="display:none;"></div>				
				</a>
				<a href="New_joiners_view_circles.aspx" class="menu_btn circles_btn"></a>
				<a href="New_joiners_view_registered_available_buddies.aspx" class="menu_btn registered_available_btn selected"></a>
				<a href="New_joiners_view_select_buddy.aspx" class="menu_btn select_buddy_btn"></a>
				<a href="New_joiners_view_storyline.aspx" class="menu_btn storyline_btn"></a>	
                <div class="notifications_popup" id="notifPop">					
					<p class="notifications_popup_header">Notifications</p>
					<div class="notifications_popup_content" id="dvJoineeNotification">						
					</div>
					<div class="notifications_see_more">
						<p>See More <img src="Resources/Images/go_arrow_large.png" alt="Go" class="nj_view_notifications"/></p>							
					</div>
				</div>			
			</div>
			<div class="cindy_circles"><img src="Resources/Images/cindy_left.gif" alt="Cindy"/></div>
			<div class="buddy_list_wrapper">
				<div class="buddy_list_callout_wrapper clear">
					<div class="buddy_list_callout">
						<p class="callout_address">Hey <span id="myName"></span>,</p>
						<p>Here you will find buddy in your BU and office facility that have enrolled as part of this program...</p>
					</div>
					<div class="buddy_list_search_wrapper clear">
						<p class="registered_available_text">Enrolled/Available Buddies</p>
						<div class="buddy_list_search">
							<p >Search for your Buddy here :</p>
							<input type="text" class="searchBox" id="Searchtext" value="Search by name or Id"/>
							<button class="search_btn"></button>
							
						</div>
                        <div class="otherway" id="otherway">
                        <p style="padding-top:0px; text-align:center;"> Other way to find Buddy</p>
                        <a class="dashboard_btn ask_your_supervisor" href="#" >ask your supervisor</a>
							<a class="dashboard_btn explore_circle_btn" href="New_joiners_view_circles.aspx">explore your circles</a>
                        </div>
					</div>
				</div>
				<div class="buddy_list_nav_prev"></div>
				<div class="buddy_list_nav_next"></div>
				<div id="dvBuddyList" runat="server"><div class="buddy_list buddy_list_visible"><img style="padding-top: 100px; padding-left: 330px; width: 41px;" src="Resources/Images/loading-blue.gif" alt=""/><br/><label style="padding-top: 100px; padding-left: 325px;" >Loading...</label></div></div>
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
					<a href="#" class="contact_card_btn detailed_profile_btn">Detailed Profile</a>
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
                        On clicking “Agree”, a request mailer will be sent to the selected Buddy <span class="font_bold" id="lblConfirmBuddyReqName"></span> with a copy to you. 
					</p>
                    <p>
                        Do you want to send buddy request ?
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
        <input id="BuddyEligibleId" runat="server" type="hidden" />

		<script type="text/javascript" src="Resources/JS/jquery-1.8.3.js"></script>
		<script type="text/javascript" src="Resources/JS/jquery.livequery.js"></script>
		<script type="text/javascript" src="Resources/JS/jquery-ui-1.9.2.custom.min.js"></script>
		<script type="text/javascript" src="Resources/JS/new_joiners_view.js"></script>
		<script type="text/javascript" src="Resources/JS/jquery.jkit.1.1.11.js"></script>
		<script type="text/javascript" src="Resources/JS/jquery.bgdsize.js"></script>
        <script src="Resources/JS/JSCommunicatorStatus.js" type="text/javascript"></script>
        <script type="text/javascript" src="Resources/JS/scroll.js"></script>
        <script type="text/javascript">
            $(document).ready(function () {
                document.getElementById('myName').innerHTML = DisplayName.value;
                document.getElementById('lblConnectionDuration').innerHTML = ConnectionDuration.value;
                GetJoineeNotificationCount();             
            });  
        </script>
	</body>
</html>

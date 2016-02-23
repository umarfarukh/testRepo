<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="buddy_view_notifications.aspx.cs" Inherits="Buddy.Buddy_view_notifications" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="X-UA-Compatible" content="IE=8,IE=EDGE,IE=9" />
    <title>Buddy App</title>
		<link href="Resources/Styles/reset.css" rel="stylesheet" type="text/css"/>
		<link href="Resources/Styles/styles.css" rel="stylesheet" type="text/css"/>
</head>
<body id="buddy_view_notifications">
		<div id="wrapper">
			<div class="header clear">
				<img src="Resources/Images/logo.png" alt="logo" class="logo"/>
				<a href="buddy_view_home.aspx" class="menu_btn home_btn"></a>
				<a href="#" class="menu_btn info_btn"></a>	
				<a href="Admin_view_buddy.aspx" class="menu_btn admin_view_btn "></a>
				<a href="Buddy_view_history.aspx" class="menu_btn history_header_btn "></a>
				<a href="buddy_view_notifications.aspx" class="menu_btn notifications_btn selected" style="display:none"></a>	
				<a href="buddy_view_circles.aspx" class="menu_btn circles_btn "></a>				
				<a href="buddy_view_storyline.aspx" class="menu_btn storyline_btn "></a>
			</div>
			<div class="notifications_wrapper clear">
				<div class="main_tabs">
					<div class="notifications_tab_selected"><p>Notifications</p></div>
				</div>
				<div class="notifications_content">
					<div class="notifications_content_tabs">
						<a href="#" class="buddy_request_notifications_btn selected">Buddy Requests</a>
						<a href="#" class="team_member_notifications_btn" style="display:none">Your team members' requests</a>
						<a href="#" class="alerts_notifications_btn">Disconnect Alerts</a>
						<a href="#" class="others_notifications_btn">Others</a>
                    </div>
					<div class="buddy_request_notifications_content notifications_tab_content">
						<div class="notifications_content_header">
							<span>Sl.No.</span>
							<span>Name</span>
						</div>
						<div class="notifications_content_details clear">
							<div class="notifications_content_left mousescroll" id="BuddyRequestNotification">						
							</div>
							<div class="notifications_content_right hiddenDiv">
								<div class="notifications_image_name clear">
									<span class="notifications_right_image fleft"><img class="background-size-cover" runat="server" alt=""  id="Joinee_Image" ></span>
									<div class="notifications_right_details fleft">
										<p class="font_name" id="Joinee_Name"></p>
										<p class="designation" id="Joinee_Designation"></p>
									</div>
								</div>
								<p class="clear"><span class="width_50">Speaks</span><span>:</span><span class="language margin_10" id="Joinee_Speaks"></span></p>
								<p class="clear"><span class="width_50">Project</span><span>:</span><span class="project_name margin_10" id="Joinee_Project"></span></p>
								<p class="clear"><span class="width_50">BU</span><span>:</span><span class="bu_name margin_10" id="Joinee_BU"></span></p>
                                <label id="lblNotificationRequest" style='bottom:160px; position:absolute;right:250px;color:#ffffff;font:16px'></label>
								<div class="buddy_request_notification_btn_wrapper clear">
								<a href="#" class="notification_btn accept_btn" id="BuddyRequestAccept">Accept</a>
								<a href="#" class="notification_btn reject_btn" id="BuddyRequestReject">Reject</a>
								<a href="#" target="_blank" class="notification_btn detailed_profile_btn" id="btnDetailedProfile">Detailed Profile</a>
								</div>
							</div>
						</div>
					</div>

					<div class="team_members_notifications_content notifications_tab_content" style="display:none" id="teammemtab">
						<div class="notifications_content_header">
							<span>Sl.No.</span>
							<span>Name</span>
						</div>
						<div class="notifications_content_details clear">
							<div class="notifications_content_left mousescroll" id="BuddyTeamMemberNotification">								
							</div>
							<div class="notifications_content_right">
								<div class="notifications_image_name clear">
									<span class="notifications_right_image fleft"><img class="background-size-cover" runat="server" id="Joinee_Image3"/></span>
									<div class="notifications_right_details fleft">
										<p class="font_name" id="Joinee_Name3"></p>
										<p class="designation" id="Joinee_Designation3"></p>
									</div>
								</div>
								<%--<p class="clear"><span class="width_50">From</span><span>:</span><span class="fromDate margin_10" id="StartDate3"></span></p>
								<p class="clear"><span class="width_50">To</span><span>:</span><span class="toDate margin_10" id="EndDate3"></span></p>--%>
								<p class="clear"><span class="width_50">Status</span><span>:</span><span class="status margin_10" id="Status3">Has requested for Buddy suggestion</span></p>
                                <label id="lbltmnotification" style='bottom:160px; position:absolute;right:250px;color:#ffffff;font:16px'></label>
								<div class="history_btn_wrapper clear" >
									<a href="Admin_view_newjoiners.aspx" class="history_btn feedback_btn" id="RecommendBuddy" style="margin-top: 50px; margin-left: 120px;">Recommend a buddy</a>
								</div>
							</div>
						</div>
					</div>

					<div class="alerts_notifications_content notifications_tab_content" style="display:none">
						<div class="notifications_content_header">
							<span>Sl.No.</span>
							<span>Name</span>
						</div>
						<div class="notifications_content_details clear">
							<div class="notifications_content_left mousescroll" id="BuddyDiscAlertNotification">								
							</div>
							<div class="notifications_content_right">
								<div class="notifications_image_name clear">
									<span class="notifications_right_image fleft"><img class="background-size-cover" runat="server" alt="" id="Joinee_Image1"/></span>
									<div class="notifications_right_details fleft">
										<p class="font_name" id="Joinee_Name1"></p>
										<p class="designation" id="Joinee_Designation1"></p>
									</div>
								</div>
								<p class="clear"><span class="width_50">From</span><span>:</span><span class="fromDate margin_10"  id="StartDate"></span></p>
								<p class="clear"><span class="width_50">To</span><span>:</span><span class="toDate margin_10" id="EndDate"></span></p>
								<p class="clear"><span class="width_50">Status</span><span>:</span><span class="status margin_10" id="Status"></span></p>
                                <label id="lblNotificationAlerts" style='bottom:160px; position:absolute;right:250px;color:#ffffff;font:16px'></label>
								<div class="buddy_request_notification_btn_wrapper clear">
                                    <a href="#" class="notification_btn accept_btn" id="DisconnectionRequestAccept">Accept</a>
									<a href="#" class="notification_btn reject_btn" id="DisconnectionRequestReject">Reject</a>
								</div>
							</div>
						</div>
					</div>

					<div class="others_notifications_content notifications_tab_content" style="display:none">
						<div class="notifications_content_header">
							<span>Sl.No.</span>
							<span>Name</span>
						</div>
						<div class="notifications_content_details clear">
							<div class="notifications_content_left mousescroll" id="BuddyOtherNotification">								
							</div>
							<div class="notifications_content_right">
								<div class="notifications_image_name clear">
									<span class="notifications_right_image fleft"><img class="background-size-cover" runat="server" id="Joinee_Image2"/></span>
									<div class="notifications_right_details fleft">
										<p class="font_name" id="Joinee_Name2"></p>
										<p class="designation" id="Joinee_Designation2"></p>
									</div>
								</div>
								<p class="clear"><span class="width_50">From</span><span>:</span><span class="fromDate margin_10" id="StartDate1"></span></p>
								<p class="clear"><span class="width_50">To</span><span>:</span><span class="toDate margin_10" id="EndDate1"></span></p>
								<p class="clear"><span class="width_50">Status</span><span>:</span><span class="status margin_10" id="Status1"></span></p>
                                <label id="lblNotificationOthers" style='bottom:160px; position:absolute;right:250px;color:#ffffff;font:16px'></label>								
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="overlay"></div>
			<div class="contact_card">
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
							<p class="contact_info_details" id="ccAvailStatus"></p>
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
					<a href="#" target="_blank" class="contact_card_btn detailed_profile_btn">Detailed Profile</a>
                    <input type="hidden" id="ccEmailId" runat="server" />
				</div>
				<div class="contact_card_footer"></div>
			</div>
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
			<div class="nomination_confirmation_popup">
				<div class="contact_card_header clear">
					<p>Are you sure?</p>
					<img src="Resources/Images/contact_close.png" alt="Close" class="nomination_confirmation_popup_close"/>
				</div>
				<div class="confirmation_popup_details contact_details clear">
					<p>
					Are you sure? Do you really wish to enroll as part of buddy program? 
					</p>
					<a href="#" class="confirmation_popup_btn disagree_btn">Disagree</a>
					<a href="#" class="confirmation_popup_btn agree_btn">Agree</a>
				</div>
				<div class="contact_card_footer"></div>
			</div>
			<div class="remove_buddy_confirmation_popup">
				<div class="contact_card_header clear">
					<p>Are you sure?</p>
					<img src="Resources/Images/contact_close.png" alt="Close" class="remove_buddy_confirmation_popup_close"/>
				</div>
				<div class="confirmation_popup_details contact_details clear">
					<p>
					You have already enrolled as part of Buddy program.<br/> Now, do you really want to withdraw your enrollment?
					</p>
					<a href="#" class="confirmation_popup_btn disagree_btn">Disagree</a>
					<a href="#" class="confirmation_popup_btn agree_btn">Agree</a>
				</div>
				<div class="contact_card_footer"></div>
			</div>
			<div class="reject_request_popup">
				<div class="contact_card_header clear">
					<p>Reject Buddy Request</p>
					<img src="Resources/Images/contact_close.png" alt="Close" class="reject_request_popup_close"/>
				</div>
				<div class="confirmation_popup_details contact_details clear">
					<textarea class="comment_area fleft" id="txtBuddyReject" onpaste='return maxLengthPaste(this,"500");' onkeypress="textLimit(this,500)" style="font-size:medium;color:Gray" >Please provide a reason for rejection...</textarea>
					<a href="#" class="confirmation_popup_btn disagree_btn">Confirm Rejection</a>
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
        <input id="RejectComment" runat="server"  type="hidden" />
        <input id="ConnectionDuration" type="hidden" runat="server" />
        <input id="User_Id" type="hidden" runat="server" />
        <input id="NotificationJoineeId" type="hidden" runat="server" />
        <input id="SendMailEmailId" type="hidden" runat="server" />

		<script type="text/javascript" src="Resources/JS/jquery-1.8.3.js"></script>
		<script type="text/javascript" src="Resources/JS/jquery.livequery.js"></script>
		<script type="text/javascript" src="Resources/JS/buddy_view.js"></script>
		<script type="text/javascript" src="Resources/JS/jquery.jkit.1.1.11.js"></script>
		<script type="text/javascript" src="Resources/JS/jquery.bgdsize.js"></script>
        <script src="Resources/JS/JSCommunicatorStatus.js" type="text/javascript"></script>
		<!-- for scroll -->
		<script type="text/javascript" src="Resources/JS/jquery-ui-1.9.2.custom.min.js"></script>
		<script type="text/javascript" src="Resources/JS/scroll.js"></script>
        <script type="text/javascript">
            $(document).ready(function () {
                document.getElementById('lblConnectionDuration').innerHTML = ConnectionDuration.value;
            });
        </script>
	</body>
</html>

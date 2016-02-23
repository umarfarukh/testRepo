<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Buddy_view_circles.aspx.cs" Inherits="Buddy.Buddy_view_circles" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="X-UA-Compatible" content="IE=8,IE=EDGE,IE=9" />
    <title>Buddy App</title>
	<link href="Resources/Styles/reset.css" rel="stylesheet" type="text/css"/>
	<link href="Resources/Styles/styles.css" rel="stylesheet" type="text/css"/>
	<link href="Resources/Styles/jquery-ui-autocomplete.css" rel="stylesheet" type="text/css"/>
    <style type="text/css">
        .ui-autocomplete-loading {
        background: white url('Resources/Images/ui-anim_basic_16x16.gif') right center no-repeat;            
        }         
    </style> 
</head>
<body id="buddy_view_circles">
		<div id="wrapper">
			<div class="header clear">
				<img src="Resources/Images/logo.png" alt="logo" class="logo"/>
				<a href="buddy_view_home.aspx" class="menu_btn home_btn"></a>
				<a href="#" class="menu_btn info_btn"></a>	
				<a href="Admin_view_buddy.aspx" class="menu_btn admin_view_btn"></a>
				<a href="Buddy_view_history.aspx" class="menu_btn history_header_btn "></a>
				<a href="buddy_view_notifications.aspx" class="menu_btn notifications_btn"></a>	
				<a href="Buddy_view_circles.aspx" class="menu_btn circles_btn selected"></a>				
				<a href="buddy_view_storyline.aspx" class="menu_btn storyline_btn"></a>	
			</div>
			<div class="cindy_circles"><img src="Resources/Images/cindy_left.gif" alt="Cindy"/></div>
			<div class="circles_wrapper">
				<div class="cindy_callout_wrapper clear">
					<div class="cindy_callout">
						<p class="callout_address">Hey <span id="myName"></span>,</p>
						<p>Please see other buddies from the Circles you may know... </p>
					</div>
					<div class="search_wrapper">
						<p>Search for a Buddy here :</p>
						<input type="text" class="searchBox" id="Searchtext" value="Search by name or Id"/>
						<button class="search_btn"></button>
					</div>
				</div>
				<div class="circles">
					<div id="Team" class="drag_batchmates">
						<p class="circles_title">My Team</p>
						<div class="draggable circles_image my_batchmates"></div>
					</div>
					<div id="Peers" class="drag_peers">
						<p class="circles_title">My Peers around Me</p>
						<div class="draggable circles_image my_peers"></div>
					</div>
					<div id="Grade" class="drag_grades">
						<p class="circles_title">My Grade</p>
						<div class="draggable circles_image my_grade"></div>
					</div>
					<div id="Location" class="drag_collegemates">
						<p class="circles_title">My Facility</p>
						<div class="draggable circles_image my_collegemates"></div>
					</div>
					<div id="Baymate" class="drag_baymates">
						<p class="circles_title">My Bay Mates</p>
						<div class="draggable circles_image my_baymates"></div>
					</div>
					<div id="Department" class="drag_department">
						<p class="circles_title">My Department</p>
						<div class="draggable circles_image my_department"></div>
					</div>
					
					<div class="drop_circle"></div>
					<div id="droppable" class="droppable_area">
						<p style="color:#ffffff">Drag the Circles here</p>
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
					You have already enrolled as part of buddy program.<br/> Now, do you really want to withdraw your enrollment?
					</p>
					<a href="#" class="confirmation_popup_btn disagree_btn">Disagree</a>
					<a href="#" class="confirmation_popup_btn agree_btn">Agree</a>
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
        <input id="SendMailEmailId" type="hidden" runat="server" />      

        <script type="text/javascript" src="Resources/JS/jquery-1.8.3.js"></script>
        <script type="text/javascript" src="Resources/JS/jquery.livequery.js"></script>
		<!-- for drag and drop -->
		<script type="text/javascript" src="Resources/JS/jquery-ui-1.9.2.custom.min.js"></script>        
        <script type="text/javascript" src="Resources/JS/buddy_view.js"></script>
        
		<!-- for tooltip -->
		<script type="text/javascript" src="Resources/JS/jquery.jkit.1.1.11.js"></script>
        <script src="Resources/JS/JSCommunicatorStatus.js" type="text/javascript"></script>
        <script type="text/javascript">
            $(document).ready(function () {
                document.getElementById('myName').innerHTML = DisplayName.value;
                document.getElementById('lblConnectionDuration').innerHTML = ConnectionDuration.value;
            });         

        </script>
</body>
</html>

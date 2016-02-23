<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="new_joiners_view_feedback.aspx.cs" Inherits="Buddy.New_joiners_view_feedback" %>

<!DOCTYPE html >
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="X-UA-Compatible" content="IE=8,IE=EDGE,IE=9" />
    <link href="Resources/Styles/reset.css" rel="stylesheet" type="text/css" />
    <link href="Resources/Styles/styles.css" rel="stylesheet" type="text/css" />
    <link href="Resources/Styles/jquery-ui-1.10.0.custom.css" rel="stylesheet" type="text/css"/>        
</head>
<body id="new_joiners_view_feedback">
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
			<div class="feedback_wrapper">
				<div class="feedback_callout_wrapper clear">
					<div class="cindy_callout">
						<p class="callout_address">Hey <span id="myName"></span>,</p>
						<p id="textup">Please provide your feedback for <span class="font_bold" id="BuddyName1"></span>...</p>
					</div>
					<div class="feedback_button_wrapper">
						<a href="New_joiners_view_history.aspx" class="back_to_history_btn"><img src="Resources/Images/back_arrow.png" alt="arrow" class="back_to_history_arrow"/>History</a>
					</div>
				</div>
				<div class="feedback_content_wrapper">
					<div class="feedback_content">
						<p class="font_26">Feedback</p>
						<div class="slider_comment_wrapper fleft clear">
                      <div id="#assingslider">
							<div class="slider_smiley_wrapper clear fleft">
								<div class="slider_content_wrapper clear fleft">
									<p class="fleft" id="textdown">How helpful was your buddy?</p>
									<div id="slider_wrapper" class="fleft">
										<div id="slider"></div>
										<div class="feedback_5 fleft" id="feedback_5"></div>
									</div>
									<div class="feedback_scale">
										<span>1</span>
										<span class="margin_left">2</span>
										<span class="margin_left">3</span>   
										<span class="margin_left">4</span>
										<span class="margin_left">5</span>
									</div>
								</div>
								<div class="smiley_wrapper fleft"></div>
							</div>
                            </div>
							<%--<textarea class="comment_area fleft">Comment</textarea> --%>
                         <textarea name="textfield" id="suggesttext" class="comment_area fleft" onpaste='return maxLengthPaste(this,"299");'
                         onkeypress="textLimit(this,299)" style="font-size:medium;color:Black" onfocus="if(this.value=='Enter your comment here.')this.value='';" 
                        onblur="if(this.value=='')this.value='Enter your comment here.';">Enter your comment here.</textarea> 
						</div>
						<div class="feedback_buddy_details fleft">
							<div class="history_image_name clear">
								<span class="history_right_image fleft"><img class="background-size-cover" id="BuddyImage" runat="server" src="Resources/Images/dummy_image.jpg" alt="" /></span>
								<div class="history_right_details fleft">
									<p class="font_name" id="BuddyName"></p>
									<p class="designation" id="BuddyDesig"></p>
								</div>
							</div>
							<p class="clear"><span class="width_50">From</span><span>:</span><span class="fromDate margin_10" id="StartDate"></span></p>
							<p class="clear"><span class="width_50">To</span><span>:</span><span class="toDate margin_10" id="EndDate"></span></p>
							<p class="clear"><span class="width_50">Status</span><span>:</span><span class="status margin_10" id="Status"></span></p>
							<a href="#" class="feedback_submit_btn" id="Submit" style="cursor:pointer">Submit</a>
						</div>
					</div>
				</div>
			</div>
			<div class="overlay"></div>
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
						<span>Select a person whom you want to make Buddy.</span>
					</p>
					<p>
						<span><img src="Resources/Images/go_arrow.png" alt="Arrow"/></span>
						<span>Once selected, request will be sent to that person.</span>
					</p>
					<p>
						<span><img src="Resources/Images/go_arrow.png" alt="Arrow"/></span>
						<span>If person accepts the request, he will be your Buddy for <label id="lblConnectionDuration" runat="server"></label> days.</span>
					</p>
					<p class="font_bold">
						<span><img src="Resources/Images/go_arrow.png" alt="Arrow"/></span>
						<span>You can make Buddy to associate 2 levels higher to you.</span>
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
        <input id="Gender" runat="server"  type="hidden" />
		<input id="isSupervisor" runat="server" type="hidden" />
        <input id="isTM" runat="server" type="hidden" />
        <input id="isMasteradmin" runat="server" type="hidden" />
        <input id="myImageSrc" runat="server"  type="hidden" />
        <input id="BuddyId" runat="server" type="hidden" />
        <input id="ConnectionDuration" type="hidden" runat="server" />
        <input id="SendMailEmailId" type="hidden" runat="server" />      
       
        <script type="text/javascript" src="Resources/JS/jquery-1.8.3.js"></script>
		<script type="text/javascript" src="Resources/JS/jquery.livequery.js"></script>
		<script type="text/javascript" src="Resources/JS/jquery.jkit.1.1.11.js"></script>	
       
		<script type="text/javascript" src="Resources/JS/jquery-ui-1.10.0.custom.js"></script>
		<script type="text/javascript" src="Resources/JS/jquery.bgdsize.js"></script>         
        <script src="Resources/JS/new_joiners_view.js" type="text/javascript"></script>
        <script type="text/javascript">
             $(document).ready(function () {
                 document.getElementById('myName').innerHTML = DisplayName.value;
                 document.getElementById('lblConnectionDuration').innerHTML = ConnectionDuration.value;               
             });                    
        </script>
     
	</body>

</html>

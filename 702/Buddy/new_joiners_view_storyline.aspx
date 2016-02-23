<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="New_joiners_view_storyline.aspx.cs" Inherits="Buddy.New_joiners_view_storyline" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="X-UA-Compatible" content="IE=8,IE=EDGE,IE=9" />
    <title>Buddy App</title>
		<link href="Resources/Styles/reset.css" rel="stylesheet" type="text/css"/>
		<link href="Resources/Styles/styles.css" rel="stylesheet" type="text/css"/>
</head>
<body id="New_joiners_view_storyline">
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
				<a href="New_joiners_view_select_buddy.aspx" class="menu_btn select_buddy_btn"></a>
				<a href="New_joiners_view_storyline.aspx" class="menu_btn storyline_btn selected"></a>
			</div>
			<div class="overlay"></div>
			<div class="storyboard_tiles">
				<div class="div_235_440 fleft">
					<div id="tile1" class="storyboard_tile_item div_140 color_37458e">						
                        <%--<p>I am<span class="bold"> new</span> to Cognizant, is there someone to help?</p>--%>
                        <p id="reader0"></p>
					</div>
					<div class="div_140 marginTop_9 cursor_default">
						<img src="Resources/Images/about_buddy_program.png" alt="About Buddy"/>
					</div>
					<div id="tile2" class="storyboard_tile_item div_140 color_999999 marginTop_9">						
                      <%--  <p>How do I <span class="bold"> disengage </span>from the Buddy Program?</p>--%>
                         <p id="reader1"></p>
					</div>
				</div>
				<div class="div_235_440 marginLeft_9 fleft">
					<div id="tile3" class="storyboard_tile_item div_140 color_fac81a">
						<%--<p class="text_color_333333"><span class="bold">Cool, </span>now how can I select a Buddy in this app?</p>--%>
                         <p id="reader2"></p>
					</div>
					<div id="tile4" class="storyboard_tile_item div_140 color_1bbedb marginTop_9">
						<%--<p>What can I <span class="bold">ask</span> my Buddy?</p>--%>
                         <p id="reader3"></p>
					</div>
					<div id="tile5" class="storyboard_tile_item div_140 color_e65904 marginTop_9">
                    
                  <%--  <p>I know someone in Cognizant, can I<span class="bold"> select</span> that person as my Buddy? </p>--%>
                    <p id="reader4"></p>						
					</div>
				</div>
				<div class="div_235_440 marginLeft_9 fleft">
					<div id="tile6" class="storyboard_tile_item div_290 color_414141">
						<%--<p>How do I connect with a Buddy and how <span class="bold">long</span> will a Buddy help me?</p>--%>
                         <p id="reader5"></p>
					</div>
					<div id="tile7" class="storyboard_tile_item div_65 color_66cc33 marginTop_9">
                    <%--p>How can I thank or give<span class="bold"> Feedback</span> to my Buddy?</p>--%>		
                    <p id="reader6"></p>			
					</div>
					<div id="tile8"class="storyboard_tile_item div_65 color_cc3300 marginTop_9">
						<%--<p><span class="bold">Help</span></p>--%>
                         <p id="reader7"></p>
					</div>
				</div>
			</div>           
			<div id="tile1_content" class="storyboard">
				<div class="chatbox">
					<div class="chatboxscroll mousescroll">
                     <p id="content0"></p>
                    <%--<p class="bold">I am new to Cognizant, is there someone to help?</p>
						<p>Sure, Buddy App is place where you can find friendly Cognizant associates, who will listen and help you on your initial days at Cognizant. So select a Buddy from this app or ask your supervisor to nominate a Buddy in this app.</p>						--%>
					</div>
				</div>
				<div class="cindy_storyline"><img src="Resources/Images/cindy_right.gif" alt="Cindy" style="margin-left: 30px;"/></div>
				<div class="back_btn">Back</div>
			</div>
			<div id="tile2_content" class="storyboard">
				<div class="chatbox">
					<div class="chatboxscroll mousescroll">
                     <p id="content1"></p>
						<%--<p class="bold">How do I disengage from the Buddy Program?</p>
						<p>As you know, the Buddy program is for <label id="lblDurationStoryline1" runat="server"></label> days. At any point of time within <label id="lblDurationStoryline2" runat="server"></label> days, if you and your Buddy decide that your connection was beneficial, you may terminate connection and very importantly give feedback on your Buddy in the app.</p>--%>
					</div>
				</div>
				<div class="cindy_storyline"><img src="Resources/Images/cindy_right.gif" alt="Cindy" style="margin-left: 30px;"/></div>
				<div class="back_btn">Back</div>
			</div>
			<div id="tile3_content" class="storyboard">
				<div class="chatbox">
					<div class="chatboxscroll mousescroll">
                     <p id="content2"></p>
                    <%--<p class="bold">Cool, now how can I select a Buddy in this app?</p>
                   <p>You can select a Buddy, in three simple ways.</p>
                    <ul class="poppara">
						<li>There are some volunteered associates in the Organization who are keen to connect with you as a Buddy. You may select them at the Enrolled and Available page of the app <a href="New_joiners_view_registered_available_buddies.aspx"><img src="Resources/Images/storyline_Icon.png" height="15px" alt=""/></a>. Once you select a Buddy here, you and the Buddy will be notified with a mail trigger. You may also select a person who has not enrolled as part of program. The Buddy may be available to connect with you.</li>
                        <li>Click “Ask your supervisor tab”  and your supervisor will get a mail trigger and he has to nominate a associate as a Buddy in the buddy app. When he nominates you and the nominated Buddy will get a mail trigger.</li>
                        <li>Go to the circles and select a Buddy of your choice too!  A mail trigger will follow once you select a Buddy.</li>
                       </ul>--%>                       
					</div>
				</div>
				<div class="cindy_storyline"><img src="Resources/Images/cindy_right.gif" alt="Cindy" style="margin-left: 30px;"/></div>
				<div class="back_btn">Back</div>
			</div>
			<div id="tile4_content" class="storyboard">
				<div class="chatbox">
					<div class="chatboxscroll mousescroll">
                     <p id="content3"></p>
                   <%-- <p class="bold">What can I ask my Buddy?</p>
						<p>You may ask your Buddy on the important things that will help you settle at Cognizant, like to help you declare tax, know about your PF transfer, HR policies, process and internal systems of Cognizant.</p>
						<p>You may also ask about your goal setting process and learning and development plans at Cognizant.</p>						--%>
					</div>
				</div>
				<div class="cindy_storyline"><img src="Resources/Images/cindy_right.gif" alt="Cindy" style="margin-left: 30px;"/></div>
				<div class="back_btn">Back</div>
			</div>
			<div id="tile5_content" class="storyboard">
				<div class="chatbox">
					<div class="chatboxscroll mousescroll">
                     <p id="content4"></p>
						<%--<p class="bold">I know someone in Cognizant, can I select that person as my Buddy? </p>
						<p>If you know a person already in Cognizant, you may search (with their name or associate ID) and select that person as your Buddy <a href="New_joiners_view_circles.aspx" style="color: #ffffff;">Search for a Buddy.</a></p>--%>
					</div>
				</div>
				<div class="cindy_storyline"><img src="Resources/Images/cindy_right.gif" alt="Cindy" style="margin-left: 30px;"/></div>
				<div class="back_btn">Back</div>
			</div>
			<div id="tile6_content" class="storyboard">
				<div class="chatbox">
					<div class="chatboxscroll mousescroll">
                     <p id="content5"></p>
                   <%-- <p class="bold">How do I connect with a Buddy and how long will a Buddy help me?</p>
                    <p>Once you select a Buddy and send a request, the Buddy has to accept your request.  You will have a Buddy for a span of  <label id="lblDurationStoryline3" runat="server"></label> days. This app is just to establish a contact with your Buddy, after selecting a Buddy you can meet the Buddy, talk over phone, simply ping and get to know about Cognizant.</p>						--%>
					</div>
				</div>
				<div class="cindy_storyline"><img src="Resources/Images/cindy_right.gif" alt="Cindy" style="margin-left: 30px;"/></div>
				<div class="back_btn">Back</div>
			</div>
			<div id="tile7_content" class="storyboard">
				<div class="chatbox">
					<div class="chatboxscroll mousescroll">
                     <p id="content6"></p>
						<%--<p class="bold">How can I thank or give feedback to my Buddy? </p>
						<p>If your Buddy has made a difference to you, please go ahead and ensure that you give a feedback and a thank you note in the app. A good feedback will also reward your Buddy with wah points. The feedback link is always open for you to give feedback</p>--%>
					</div>
				</div>
				<div class="cindy_storyline"><img src="Resources/Images/cindy_right.gif" alt="Cindy" style="margin-left: 30px;"/></div>
				<div class="back_btn">Back</div>
			</div>
			<div id="tile8_content" class="storyboard">
				<div class="chatbox">
					<div class="chatboxscroll mousescroll">
                     <p id="content7"></p>
						<%--<p class="bold">Help</p>
						<p>For any help / troubleshooting guidelines, please mail to <a href="#" runat="server" onclick="MailToTMTeam();"><u style="color:#4b088a;">buddyapp@cognizant.com</u></a></p>--%>
					</div>
				</div>
				<div class="cindy_storyline"><img src="Resources/Images/cindy_right.gif" alt="Cindy" style="margin-left: 30px;"/></div>
				<div class="back_btn">Back</div>
			</div>            
			<a href="New_joiners_view_select_buddy.aspx" class="proceed_arrow"></a>
            <a href="new_joiners_view_welcome.aspx" class="back_arrow"></a>
			<div class="info_screen">
				<div class="contact_card_header clear">
					<p>Make a Buddy:</p>
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
        <input id="ConnectionDuration" type="hidden" runat="server" />
         <input id="CountryId" type="hidden" runat="server" />       

		<script type="text/javascript" src="Resources/JS/jquery-1.8.3.js"></script>
		<script type="text/javascript" src="Resources/JS/jquery.livequery.js"></script>
		<script type="text/javascript" src="Resources/JS/jquery.jkit.1.1.11.js"></script>
		<script type="text/javascript" src="Resources/JS/jquery-ui-1.9.2.custom.min.js"></script>
		<script type="text/javascript" src="Resources/JS/new_joiners_view.js"></script>
		<!-- for scroll -->		
		<script type="text/javascript" src="Resources/JS/scroll.js"></script>
        <script type="text/javascript">
            $(document).ready(function () {
                  GetPageContent();
//                document.getElementById('lblConnectionDuration').innerHTML = ConnectionDuration.value;
//                document.getElementById('lblDurationStoryline1').innerHTML = ConnectionDuration.value;
//                document.getElementById('lblDurationStoryline2').innerHTML = ConnectionDuration.value;
//                document.getElementById('lblDurationStoryline3').innerHTML = ConnectionDuration.value;
            });  
        </script>
	</body>
</html>

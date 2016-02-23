<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="buddy_view_storyline.aspx.cs" Inherits="Buddy.Buddy_view_storyline" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="X-UA-Compatible" content="IE=8,IE=EDGE,IE=9" />
   <title>Buddy App</title>
		<link href="Resources/Styles/reset.css" rel="stylesheet" type="text/css"/>
		<link href="Resources/Styles/styles.css" rel="stylesheet" type="text/css"/>
</head>
<body id="buddy_view_storyline">
<form runat="server">
		<div id="wrapper">
			<div class="header clear">
				<img src="Resources/Images/logo.png" alt="logo" class="logo"/>
				<a href="buddy_view_home.aspx" class="menu_btn home_btn"></a>
				<a href="#" class="menu_btn info_btn"></a>	
				<a href="Admin_view_buddy.aspx" class="menu_btn admin_view_btn "></a>
				<a href="Buddy_view_history.aspx" class="menu_btn history_header_btn "></a>
				<a href="buddy_view_notifications.aspx" class="menu_btn notifications_btn"></a>	
				<a href="buddy_view_circles.aspx" class="menu_btn circles_btn "></a>				
				<a href="buddy_view_storyline.aspx" class="menu_btn storyline_btn selected"></a>	
				<a href="#" class="nominate_btn">Enroll as a Buddy to proceed</a>
			</div>
			<div class="overlay"></div>
			<div class="storyboard_tiles">
				<div class="div_235_440 fleft">
					<div id="tile1" class="storyboard_tile_item div_140 color_37458e">						
                      <%--  <p>What is the <span class="bold">Buddy</span> Program all about? </p>--%>
                        <p id="reader0"></p>
					</div>
					<div class="div_140 marginTop_9 cursor_default">
						<img src="Resources/Images/about_buddy_program.png" alt="About Buddy"/>
					</div>
					<div id="tile2" class="storyboard_tile_item div_140 color_999999 marginTop_9">
					<%--	<p>Who can be a <span class="bold">Buddy?</span></p>--%>
                        <p id="reader1"></p>
					</div>
				</div>
				<div class="div_235_440 marginLeft_9 fleft">
					<div id="tile3" class="storyboard_tile_item div_140 color_fac81a">						
                     <%--   <p class="text_color_333333">What are the<span class="bold"> roles </span>and responsibilities of a Buddy?</p>--%>
                        <p class="text_color_333333" id="reader2" ></p>
					</div>
					<div id="tile4" class="storyboard_tile_item div_140 color_1bbedb marginTop_9">						
                      <%--  <p>What does a <span class="bold">Buddy do?</span></p>--%>
                         <p id="reader3"></p>
					</div>
					<div id="tile5" class="storyboard_tile_item div_140 color_e65904 marginTop_9">						
                        <%--<p>Can I close the connection or should I wait for<span class="bold"> <label id="lblDurationStoryline1" runat="server"></label> days?</span></p>--%>
                         <p id="reader4"></p>
					</div>
				</div>
				<div class="div_235_440 marginLeft_9 fleft">
					<div id="tile6" class="storyboard_tile_item div_290 color_414141">
						<%--<p>What happens if I am too<span class="bold"> busy </span>to take on a Buddy request? </p>--%>
                        <p id="reader5"></p>
					</div>
					<div id="tile7" class="storyboard_tile_item div_65 color_66cc33 marginTop_9">	
                     <p id="reader6"></p>					
                   <%--  <p id="pQueTile7"></p>--%>
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
						<%--<p class="bold">What is the Buddy Program all about? </p>
						<p>The Buddy Program has been designed to help recently joined Cognizant associates establish contact with a Buddy within Cognizant who will help them settle in and understand the Cognizant way of life. The Buddy plays the role of a friend who helps the new associate learn about the various processes, policies, internal systems and other details that make the Cognizant world.</p>
					    <p>The <span class="bold">Buddy App </span>is the easy interface that helps new associates choose a Buddy to interact with and better understand Cognizant.</p>--%>					    
                    </div>
				</div>
				<div class="cindy_storyline"><img src="Resources/Images/cindy_right.gif" alt="Cindy" style="margin-left: 10px; margin-top: 70px;"/></div>
				<div class="back_btn">Back</div>
			</div>
			<div id="tile2_content" class="storyboard">
				<div class="chatbox">
					<div class="chatboxscroll mousescroll">
                     <p id="content1"></p>
					<%--<p class="bold">Who can be a Buddy?</p>
						<p class="bold">Eligibility: </p>   
                        <ul class="poppara">
                        <li><span class="bold">Buddy:</span> An associate, who has completed one year at Cognizant, is eligible for being a Buddy and should enroll as a Buddy in the Buddy app.</li>
                        <li><span class="bold">New Associate:</span>  An experienced / lateral new hire into the organization. Buddy App is not for campus joiners.</li>
                        </ul>    --%>                   
					</div>
				</div>
				<div class="cindy_storyline"><img src="Resources/Images/cindy_right.gif" alt="Cindy" style="margin-left: 10px; margin-top: 70px;"/></div>
				<div class="back_btn">Back</div>
			</div>
			<div id="tile3_content" class="storyboard">
				<div class="chatbox">
					<div class="chatboxscroll mousescroll">	
                    <p id="content2"></p>					
                        <%--<p class="bold">What are the roles and responsibilities of a Buddy?</p>
                        <p>The Buddy should partner with the new associate and help him/her familiarize the various processes, policies, internal systems and other details that make the world of Cognizant. </p>
                        <p> We suggest the following three phase approach:</p>

                        <p><span class="bold" style="font-size:16px; font-weight:bold;">Phase 1:</span>Build a rapport</p>
                        <ul class="poppara">
                        <li>Proactively call or meet your new associate. Introduce yourself and get to know your new Buddy.  </li>
                        <li id="lstPhase1"></li>                        
                        <li>Introduce the new associate to the Cognizant Corporate Functions such as HR, NSS, Admin and GWFM. Guide the new associate to the right source of information or point of contact.</li>
                        <li>Be available to the new associate when he/she seeks information or guidance. </li>                                                                                              
                        </ul>
						
                        <p><span class="bold" style="font-size:16px; font-weight:bold;">Phase 2:</span> Share knowledge on Organization</p>
                        <ul class="poppara">
                        <li>Spend at least 10 minutes every day with the new associate.</li>
                        <li>Provide organizational and BU-level updates.</li>                        
                        <li>Help the new associate understand how to fill in the timesheet, leave application and other PeopleSoft HCM sections such as Goal Setting.</li>
                        <li>Answer queries on polices and process and then direct the new associate to the right point of contact.</li>                        
                        <li>Suggest relevant learning plans, certifications, e-learning modules and other courses available on MyAcademy.</li>
                        <li>Actively seek feedback on how the new associate is experiencing Cognizant. </li>                                                
                        </ul>

                        <p><span class="bold" style="font-size:16px; font-weight:bold;">Phase 3:</span>Help new associate settle in and get integrated</p>
                        <ul class="poppara">
                        <li>Introduce the new associate to people in your network. Help them establish a network of their own. </li>
                        <li>At the end of the Buddy connection, the new associate must be fully integrated into Cognizant and have a good understanding of how things work here.</li>                                                                   
                        </ul>--%>
					</div>
				</div>
				<div class="cindy_storyline"><img src="Resources/Images/cindy_right.gif" alt="Cindy" style="margin-left: 10px; margin-top: 70px;"/></div>
				<div class="back_btn">Back</div>
			</div>
			<div id="tile4_content" class="storyboard">
				<div class="chatbox">
					<div class="chatboxscroll mousescroll">
                     <p id="content3"></p>	
                    <%--<p class="bold">What does a Buddy do? </p>
                        <ul class="poppara">
                        <li>The Buddy program connection between a new associate and Buddy is for <label id="lblDurationStoryline4" runat="server"></label> days. The new associate will send a request and you need to accept the request within 2 working days. The Buddy and associate can interact in person and over phone. There is no separate medium of communication in the app.</li>
                        <li>At any point in time, a Buddy can connect with a maximum of <br/> <label id="lblAcceptanceCountOfRegBuddy" runat="server"></label>(if enrolled Buddy) / <label id="lblAcceptanceCountOfUnRegBuddy" runat="server"></label>(if non-enrolled Buddy) new associates</li>
                        <li id="lstWahText"></li>
                        </ul>  --%>                     
					</div>
				</div>
				<div class="cindy_storyline"><img src="Resources/Images/cindy_right.gif" alt="Cindy" style="margin-left: 10px; margin-top: 70px;"/></div>
				<div class="back_btn">Back</div>
			</div>
			<div id="tile5_content" class="storyboard">
				<div class="chatbox">
					<div class="chatboxscroll mousescroll">
                    <p id="content4"></p>	
                    <%-- <p class="bold"> Can I close the connection or should I wait for <label id="lblDurationStoryline2" runat="server"></label> days? </p>
                        <p>Yes, at any point of time within <label id="lblDurationStoryline3" runat="server"></label> days, if you and your Buddy decide that your connection was beneficial and you have provided them with necessary information, you may disengage from the connection. </p>--%>						
					</div>
				</div>
				<div class="cindy_storyline"><img src="Resources/Images/cindy_right.gif" alt="Cindy" style="margin-left: 10px; margin-top: 70px;"/></div>
				<div class="back_btn">Back</div>
			</div>
			<div id="tile6_content" class="storyboard">
				<div class="chatbox">
					<div class="chatboxscroll mousescroll">
                     <p id="content5"></p>
                  <%-- <p class="bold">What happens if I am too busy to take on a Buddy request? </p>

                        <p>Having volunteered for the Buddy Program, we request that you honor every request. However, if you are travelling or working on some critical deliverables, you may decline the request on the App, citing the appropriate reason. </p>--%>						
					</div>
				</div>
				<div class="cindy_storyline"><img src="Resources/Images/cindy_right.gif" alt="Cindy" style="margin-left: 10px; margin-top: 70px;"/></div>
				<div class="back_btn">Back</div>
			</div>
			<div id="tile7_content" class="storyboard">
				<div class="chatbox">
					<div class="chatboxscroll mousescroll">
                    <p id="content6"></p>
                   <%-- <p class="bold" id="pAnsTile7"></p>
                        <p id="pWahText"></p>     --%>               
                    </div>
				</div>
				<div class="cindy_storyline"><img src="Resources/Images/cindy_right.gif" alt="Cindy" style="margin-left: 10px; margin-top: 70px;"/></div>
				<div class="back_btn">Back</div>
			</div>
			<div id="tile8_content" class="storyboard">
				<div class="chatbox">
					<div class="chatboxscroll mousescroll">
                     <p id="content7"></p>
						<%--<p class="bold">Help</p>
                        <ul class="poppara">
                        <li>Any troubleshooting guidelines, mail to <a href="#" runat="server" onclick="MailToTMTeam();"><u style="color:#4b088a;">buddyapp@cognizant.com</u></a> for any technical issues and clarifications.</li>
                        </ul>	--%>					
					</div>
				</div>
				<div class="cindy_storyline"><img src="Resources/Images/cindy_right.gif" alt="Cindy" style="margin-left: 10px; margin-top: 70px;"/></div>
				<div class="back_btn">Back</div>
			</div>
			<a href="buddy_view_home.aspx" class="proceed_arrow"></a>
            <a href="buddy_view_welcome.aspx" class="back_arrow"></a>
			<div class="info_screen">
				<div class="contact_card_header clear">
					<p>Enroll as Buddy!</p>
					<img src="Resources/Images/contact_close.png" alt="Close" class="info_screen_close"/>
				</div>
				<div class="info_screen_details contact_details clear">
					<p>
						<span><img src="Resources/Images/go_arrow.png" alt="Arrow"/></span>
						<span>Enroll yourself as Buddy.</span>
					</p>
					<p>
						<span><img src="Resources/Images/go_arrow.png" alt="Arrow"/></span>
						<span>You will receive request mail, if a new joiner selects you as Buddy.</span>
					</p>
					<p>
						<span><img src="Resources/Images/go_arrow.png" alt="Arrow"/></span>
						<span>Once request accepted, you will be Buddy for <label id="lblConnectionDuration" runat="server"></label> days.</span>
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
					Are you sure? Do you really wish to enroll as part of Buddy program? 
					</p>
					<a href="#" class="confirmation_popup_btn disagree_btn">Disagree</a>
					<a id="nomination_agree_btn" href="#" class="confirmation_popup_btn agree_btn">Agree</a>
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
			<div class="update_profile_popup">
				<div class="contact_card_header clear">
					<p>Thank you !</p>
					<img src="Resources/Images/contact_close.png" alt="Close" class="update_profile_popup_close"/>
				</div>
				<div class="confirmation_popup_details contact_details clear">
					<p style="font-size:16px;">
                        Thanks for enrolling as part of Buddy program. 
                    </p>
                    <p style="font-size:16px;">
                        We are sure you will make a difference to a new associate. If a new associate selects you as a Buddy, you will get a mailer notification TM team (mail from OneCommunicator). Please respond to the invite in 2 working days or else the request will expire automatically.
                    </p>
                    <p style="font-size:16px;">
                        Let the conversations begin! 
                    </p>
                    <p style="font-size:16px;">
                        Do you want to update your profile now?
					</p>
					<a href="#" class="confirmation_popup_btn disagree_btn" target="_blank" id="lnkUpdateProfile">Update Profile</a>
					<a href="buddy_view_home.aspx" class="confirmation_popup_btn agree_btn">Skip to Home</a>
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
	    </form>
        <input id="CurrentUserId" runat="server" type="hidden" />
        <input id="DisplayName" runat="server" type="hidden" />
        <input id="isRegistered" runat="server" type="hidden" />
		<input id="isSupervisor" runat="server" type="hidden" />
        <input id="isTM" runat="server" type="hidden" />
        <input id="isMasteradmin" runat="server" type="hidden" />
        <input id="myImageSrc" runat="server"  type="hidden" />
        <input id="Gender" runat="server"  type="hidden" />
        <input id="ConnectionDuration" type="hidden" runat="server" />
        <input id="AcceptanceCountOfRegBuddy" type="hidden" runat="server" />
        <input id="AcceptanceCountOfUnRegBuddy" type="hidden" runat="server" />
        <input id="ConnectionsOfJoiners" type="hidden" runat="server" />
        <input id="CountryId" type="hidden" runat="server" />

		<script type="text/javascript" src="Resources/JS/jquery-1.8.3.js"></script>
		<script type="text/javascript" src="Resources/JS/jquery.livequery.js"></script>
		<script type="text/javascript" src="Resources/JS/jquery.jkit.1.1.11.js"></script>
		<script type="text/javascript" src="Resources/JS/jquery-ui-1.9.2.custom.min.js"></script>
		<!-- for scroll -->		
        <script type="text/javascript" src="Resources/JS/scroll.js"></script>
        <script type="text/javascript" src="Resources/JS/buddy_view.js"></script>
		<script type="text/javascript">
		    $(document).ready(function () {
		        GetPageContent();		       
//		        document.getElementById('lblConnectionDuration').innerHTML = ConnectionDuration.value;
//		        document.getElementById('lblDurationStoryline1').innerHTML = ConnectionDuration.value;
//		        document.getElementById('lblDurationStoryline2').innerHTML = ConnectionDuration.value;
//		        document.getElementById('lblDurationStoryline3').innerHTML = ConnectionDuration.value;
//		        document.getElementById('lblDurationStoryline4').innerHTML = ConnectionDuration.value;
//		        document.getElementById('lblAcceptanceCountOfRegBuddy').innerHTML = AcceptanceCountOfRegBuddy.value;
//		        document.getElementById('lblAcceptanceCountOfUnRegBuddy').innerHTML = AcceptanceCountOfUnRegBuddy.value;
//		        if (CountryId.value == 'IND') {
//		            document.getElementById('pQueTile7').innerHTML = 'How do I get my <span class="bold"> WAH! </span>points?';
//		            document.getElementById('pAnsTile7').innerHTML = 'How do I get my WAH! points?';
//		            document.getElementById('lstWahText').innerHTML = 'At the end of Buddy program, new associate will give feedback on the Buddy. If the feedback is good, the Buddy will get 300 wah points.';
//		            document.getElementById('pWahText').innerHTML = 'If you have been rated well by your new associate, you will be rewarded 300 WAH! points by your BU’s Talent Manager.';
//		            document.getElementById('lstPhase1').innerHTML = 'Talk to the new associate about the various repositories of information and important links such as CWorld, One Cognizant, GSD, MyPay, and so forth.';
//		        }
//                //for rest countries like Singapore, Aus, NZ, dubai, japan etc
//		        else {
//		            document.getElementById('pQueTile7').innerHTML = '<span class="bold">Rewards </span> for Buddy';
//		            document.getElementById('pAnsTile7').innerHTML = 'Rewards for Buddy';
//		            document.getElementById('pWahText').innerHTML = 'Associates who have been Buddies for 3 associates or more will be awarded a Buddy Certificate and a exciting reward.';
//		            document.getElementById('lstWahText').innerHTML = 'Associates who have been Buddies for 3 associates or more will be awarded a Buddy Certificate and a exciting reward.';
//		            document.getElementById('lstPhase1').innerHTML = 'Talk to the new associate about the various repositories of information and important links such as CWorld, One Cognizant, GSD and so forth.';		            
//		        }
		    });
        </script>
        
	</body>
</html>

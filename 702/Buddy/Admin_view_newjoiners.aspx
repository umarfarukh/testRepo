<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Admin_view_newjoiners.aspx.cs" Inherits="Buddy.Admin_view_newjoiners" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="X-UA-Compatible" content="IE=EDGE" />
    <%--<meta http-equiv="content-type" content="text/html; charset=UTF-8">--%>
	<title>Buddy App</title>
	<link href="Resources/Styles/reset.css" rel="stylesheet" type="text/css"/>
	<link href="Resources/Styles/styles.css" rel="stylesheet" type="text/css"/>
	<link href="Resources/Styles/jquery-ui-autocomplete.css" rel="stylesheet" type="text/css"/>   
    <script type="text/javascript" src="Resources/JS/jquery-1.8.3.js"></script>
    <style type="text/css">
        .ui-autocomplete-loading {
        background: white url('Resources/Images/ui-anim_basic_16x16.gif') right center no-repeat;            
        }        
         .DisabledLink {
            pointer-events: none;
            cursor: default;
        } 
    </style>  
</head>
<body id="Admin_view_newjoiners">
<form id="Form1" runat="server">
<asp:ScriptManager ID="ScriptManager1" runat="server" EnablePageMethods="true" EnablePartialRendering="true">
</asp:ScriptManager>
		<div id="wrapper">
			<div class="header clear">
				<img src="Resources/Images/logo.png" alt="logo" class="logo"/>
				<a href="New_joiners_view_home.aspx" class="menu_btn home_btn"></a>
				<a href="#" class="menu_btn info_btn"></a>
				<a href="Admin_view_newjoiners.aspx" class="menu_btn admin_view_btn selected"></a>				
				<a href="New_joiners_view_history.aspx" class="menu_btn history_header_btn"></a>
				<a href="New_joiners_view_notifications.aspx" class="menu_btn notifications_btn"></a>
				<a href="New_joiners_view_circles.aspx" class="menu_btn circles_btn"></a>
				<a href="New_joiners_view_registered_available_buddies.aspx" class="menu_btn registered_available_btn"></a>
				<a href="New_joiners_view_select_buddy.aspx" class="menu_btn select_buddy_btn"></a>
				<a href="New_joiners_view_storyline.aspx" class="menu_btn storyline_btn"></a>
			</div>
			<div class="admin_view_wrapper clear">
				<div class="admin_view_title">Admin View</div>
				<div class="main_tabs">
					<div id="configure_tab" style="display:none" class="main_tab_item selected"><p>Configure</p></div>
					<div id="dashboard_tab" style="display:none" class="main_tab_item" onclick="GetDashBoardTabPrefillValues();"><p>Dashboard</p></div>
					<div id="recommendations_tab" style="display:none" class="main_tab_item"><p>Supervisor's view</p></div>
					<div id="add_admin_tab" style="display:none" class="main_tab_item" onclick="GetAdminList(),disableSubmit();"><p>Add Admin</p></div>
				</div>
				<div class="admin_view_content">
					<div id="configure_tab_content" style="display:none">
						<div class="configure_tab_content_wrapper clear">
							<div class="configure_tab_left_content fleft">
								<div class="configure_tab_content_item clear">
									<p><span class="item_title">Buddy duration</span>:</p>
									<div class="dropdown_wrapper">
										<div class="dropdown_box">
											<span id ="BuddyDura" class="selected_item"></span>
											<span class="dropdown_arrow"><img src="Resources/Images/dropdown_arrow.png" alt="Arrow"/></span>
										</div>
										<ul id="BuddyDuration" class="dropdown_select">
											<li>120 days<a href="#"><img src="Resources/Images/go_arrow.png" alt="Arrow" class="dropdown_select_arrow"/></a></li>
											<li>90 days<a href="#"><img src="Resources/Images/go_arrow.png" alt="Arrow" class="dropdown_select_arrow"/></a></li>
											<li>60 days<a href="#"><img src="Resources/Images/go_arrow.png" alt="Arrow" class="dropdown_select_arrow"/></a></li>
											<li>30 days<a href="#"><img src="Resources/Images/go_arrow.png" alt="Arrow" class="dropdown_select_arrow"/></a></li>
										</ul>
									</div>
								</div>
								<div class="configure_tab_content_item clear">
									<p class="line_ht_17"><span class="item_title">No. of requests that can be received by enrolled buddies</span>:</p>
									<div class="dropdown_wrapper">
										<div class="dropdown_box">
											<span id="RequestToRegB" class="selected_item"></span>
											<span class="dropdown_arrow"><img src="Resources/Images/dropdown_arrow.png" alt="Arrow"/></span>
										</div>
										<ul id="RequestToRegBuddy" class="dropdown_select">
											<li>1<a href="#"><img src="Resources/Images/go_arrow.png" alt="Arrow" class="dropdown_select_arrow"/></a></li>
											<li>2<a href="#"><img src="Resources/Images/go_arrow.png" alt="Arrow" class="dropdown_select_arrow"/></a></li>
											<li>3<a href="#"><img src="Resources/Images/go_arrow.png" alt="Arrow" class="dropdown_select_arrow"/></a></li>
											<li>4<a href="#"><img src="Resources/Images/go_arrow.png" alt="Arrow" class="dropdown_select_arrow"/></a></li>
										</ul>
									</div>
								</div>
								<div class="configure_tab_content_item clear">
									<p class="line_ht_17"><span class="item_title">No. of requests that can be accepted by enrolled buddies</span>:</p>
									<div class="dropdown_wrapper">
										<div class="dropdown_box">
											<span id="RequestAcceptedByRegB" class="selected_item"></span>
											<span class="dropdown_arrow"><img src="Resources/Images/dropdown_arrow.png" alt="Arrow"/></span>
										</div>
										<ul id="RequestAcceptedbyRegBuddy" class="dropdown_select">
											<li>1<a href="#"><img src="Resources/Images/go_arrow.png" alt="Arrow" class="dropdown_select_arrow"/></a></li>
											<li>2<a href="#"><img src="Resources/Images/go_arrow.png" alt="Arrow" class="dropdown_select_arrow"/></a></li>
											<li>3<a href="#"><img src="Resources/Images/go_arrow.png" alt="Arrow" class="dropdown_select_arrow"/></a></li>
											<li>4<a href="#"><img src="Resources/Images/go_arrow.png" alt="Arrow" class="dropdown_select_arrow"/></a></li>
										</ul>
									</div>
								</div>
                                <div class="configure_tab_content_item clear">
									<p class="line_ht_17"><span class="item_title">No. of connections that the new joiner can have</span>:</p>
									<div class="dropdown_wrapper">
										<div class="dropdown_box">
											<span id="ConnectionsOfNJ" class="selected_item"></span>
											<span class="dropdown_arrow"><img src="Resources/Images/dropdown_arrow.png" alt="Arrow"/></span>
										</div>
										<ul id="ConnectionsOfJoiners" class="dropdown_select">
											<li>1<a href="#"><img src="Resources/Images/go_arrow.png" alt="Arrow" class="dropdown_select_arrow"/></a></li>
											<li>2<a href="#"><img src="Resources/Images/go_arrow.png" alt="Arrow" class="dropdown_select_arrow"/></a></li>
											<li>3<a href="#"><img src="Resources/Images/go_arrow.png" alt="Arrow" class="dropdown_select_arrow"/></a></li>
											<li>4<a href="#"><img src="Resources/Images/go_arrow.png" alt="Arrow" class="dropdown_select_arrow"/></a></li>
										</ul>
									</div>
								</div>
								<div class="configure_tab_content_item clear">
									<p><span class="item_title">No of app users</span>:</p>
									<div class="read_only_text">
										<p id="NoofAppUsers"></p>
									</div>
								</div>
							</div>
							<div class="configure_tab_right_content fleft">
								<div class="configure_tab_content_item clear">
									<p class="line_ht_17"><span class="item_title">No. of requests that can be received by non-enrolled buddies</span>:</p>
									<div class="dropdown_wrapper">
										<div class="dropdown_box">
										<span id="RequestToUnregB" class="selected_item"></span>
											<span class="dropdown_arrow"><img src="Resources/Images/dropdown_arrow.png" alt="Arrow"/></span>
										</div>
		                                    <ul id="RequestToUnregBuddy" class="dropdown_select">
											<li>1<a href="#"><img src="Resources/Images/go_arrow.png" alt="Arrow" class="dropdown_select_arrow"/></a></li>
											<li>2<a href="#"><img src="Resources/Images/go_arrow.png" alt="Arrow" class="dropdown_select_arrow"/></a></li>
											<li>3<a href="#"><img src="Resources/Images/go_arrow.png" alt="Arrow" class="dropdown_select_arrow"/></a></li>
											<li>4<a href="#"><img src="Resources/Images/go_arrow.png" alt="Arrow" class="dropdown_select_arrow"/></a></li>
										</ul>
									</div>
								</div>
								<div class="configure_tab_content_item clear">
									<p class="line_ht_17"><span class="item_title">No. of requests that can be accepted by non-enrolled buddies</span>:</p>
									<div class="dropdown_wrapper">
										<div class="dropdown_box">
											<span id="RequestsAcceptedByUnregB" class="selected_item"></span>
											<span class="dropdown_arrow"><img src="Resources/Images/dropdown_arrow.png" alt="Arrow"/></span>
										</div>
										<ul id="RequestsAcceptedByUnregBuddy" class="dropdown_select">
											<li>1<a href="#"><img src="Resources/Images/go_arrow.png" alt="Arrow" class="dropdown_select_arrow"/></a></li>
											<li>2<a href="#"><img src="Resources/Images/go_arrow.png" alt="Arrow" class="dropdown_select_arrow"/></a></li>
											<li>3<a href="#"><img src="Resources/Images/go_arrow.png" alt="Arrow" class="dropdown_select_arrow"/></a></li>
											<li>4<a href="#"><img src="Resources/Images/go_arrow.png" alt="Arrow" class="dropdown_select_arrow"/></a></li>
										</ul>
									</div>
								</div>
                                <div class="configure_tab_content_item clear">
									<p class="line_ht_17"><span class="item_title">No. of requests that joinee can send to buddy</span>:</p>
									<div class="dropdown_wrapper">
										<div class="dropdown_box">
											<span id="RequestSendByNJ" class="selected_item"></span>
											<span class="dropdown_arrow"><img src="Resources/Images/dropdown_arrow.png" alt="Arrow"/></span>
										</div>
										<ul id="RequestsSendByJoinee" class="dropdown_select">
											<li>1<a href="#"><img src="Resources/Images/go_arrow.png" alt="Arrow" class="dropdown_select_arrow"/></a></li>
											<li>2<a href="#"><img src="Resources/Images/go_arrow.png" alt="Arrow" class="dropdown_select_arrow"/></a></li>
											<li>3<a href="#"><img src="Resources/Images/go_arrow.png" alt="Arrow" class="dropdown_select_arrow"/></a></li>
											<li>4<a href="#"><img src="Resources/Images/go_arrow.png" alt="Arrow" class="dropdown_select_arrow"/></a></li>
										</ul>
									</div>
								</div>
								<div class="configure_tab_content_item clear">
									<p><span class="item_title">No of Buddy-NJ connections</span>:</p>
									<div class="read_only_text">
										<p id="BuddyNJcon"></p>
									</div>
								</div>
							</div>
						</div>
						<div>
							<a href="#" class="submit_btn">Submit</a>
						</div>
					</div>

					<div id="dashboard_tab_content" style="display:none">
						<div class="notifications_content_tabs">
							<div class="dashboard_bu_dropdown_wrapper clear">
								<p><span class="item_title">BU Name</span>:</p>
								<div class="dropdown_wrapper">
									<div class="dropdown_box">
										<p class="selected_item" id="selectbuddy">All</p>
										<span class="dropdown_arrow"><img src="Resources/Images/dropdown_arrow.png" alt="Arrow"/></span>
									</div>
									<ul class="dropdown_select dashboard_bu_scroll mousescroll" id="drpdwnBU" runat="server">
									</ul>
								</div>
							</div>
							<div class="dashboard_view_dropdown_wrapper clear">
								<p><span class="item_title">View</span>:</p>
								<div class="dropdown_wrapper">
									<div class="dropdown_box">
										<p class="selected_item" id="select_buddyview">Buddy view</p>
										<span class="dropdown_arrow"><img src="Resources/Images/dropdown_arrow.png" alt="Arrow"/></span>
									</div>
									<ul class="dropdown_select" id="drpdwnView">
										<li class="dashboard_bu_option" id="1">Buddy view</li>
										<li class="dashboard_bu_option" id="0">New Joiners view</li>
									</ul>
								</div>
							</div>
                            <div class="dashboard_country_dropdown_wrapper clear">
								<p><span class="item_title">Country</span>:</p>
								<div class="dropdown_wrapper">
									<div class="dropdown_box">
										<p class="selected_item" id="selectCountry">All</p>
										<span class="dropdown_arrow"><img src="Resources/Images/dropdown_arrow.png" alt="Arrow"/></span>
									</div>
									<ul class="dropdown_select dashboard_country_scroll mousescroll" id="drpdwnCountry" runat="Server">										
									</ul>
								</div>
							</div>
							<a href="#" style="float:right;" onclick="GetNJDashBoardData();">GO</a>
						</div>
						<div class="dashboard_content_wrapper notifications_tab_content">
							<div class="notifications_content_header">
								<span>Sl.No.</span>
								<span>Name</span>
							</div>
							<div class="notifications_content_details clear">
								<div class="notifications_content_left mousescroll" runat="server" id="BuddyData">
                                </div>								
								<div class="notifications_content_right" id="Buddydata">
									<div class="notifications_image_name clear">
										<span class="notifications_right_image fleft"><img class="background-size-cover" id="buddy_img"/></span>
										<div class="notifications_right_details fleft">
											<p class="font_name" id="buddy_name"></p>
											<p class="designation" id="buddy_designation"></p>
										</div>
									</div>
									<p class="margin_12 clear"><span class="width_125">Connections</span><span>:</span><span class="connections_txt margin_10" id="Connections"></span></p>
									<p class="clear" id="pAvgFeedbackLabel"><span class="width_125">Average Feedback</span><span>:</span><span class="av_feedback margin_10" id="Avgfeedback"></span></p>
									<div class="dashboard_btn_wrapper clear" style="margin-left:75px;">
									<a href="#" class="dashboard_btn connections_btn" onclick="GetDashboardConnectionsofUserNJ();">Connections</a>										
									</div>
								</div>
								<div class="connection_status_wrapper">
									<p class="status_title">Connection Status</p>
									<table>
										<tbody>
											<tr>
												<th scope="row">Not Connected</th>
												<td id="td_NotConnNJ"></td>
											</tr>
											<tr>
												<th scope="row">Connected</th>
												<td id="td_ConnNJ"></td>
											</tr>
										</tbody>
									</table>
									<div id="holder"></div>	
									<div class="status_legend clear">                                     										
										<div class="legend fleft clear" style="margin-left:-25px;">
											<div class="legend_item fleft">
												<div class="legend_color color_42D9FC fleft"></div>
												<span class="width_112">NonConnected Buddies</span><span>: </span><span id="Non_Con_NJ"></span>
											</div>
											<div class="legend_item fleft">
												<div class="legend_color color_333333 fleft"></div>
												<span class="width_112">Connected Buddies</span><span>: </span><span id="Con_NJ"></span>
											</div>
										</div>
                                        <asp:LinkButton ID="LinkButton1" class="dashboard_btn export_btn" runat="server" OnClick="GetExcelData">Export to Excel </asp:LinkButton>
                                        <asp:HiddenField ID="hiddenCountryId" runat="server" />
									</div>
								</div>
							</div>
                        </div>						
					</div>

					<div id="recommendations_tab_content" style="display:none">
						<div class="recommendations_options_wrapper clear">
							<div class="recommendations_inner_tab_wrapper fleft">
								<div id="recommend_nj_buddy" class="recommendation_inner_tab selected fleft">Recommend Connections</div>
								<div id="recommend_registration" class="recommendation_inner_tab fleft margin_left_2">Recommend Enrollment</div>
							</div>
							<asp:UpdatePanel ID="UpdatePanel1" UpdateMode="Conditional"  runat="server">
                            <ContentTemplate>
                            <div class="recommendations_search_wrapper clear">
								<input class="searchBox" type="text" id="Searchtext" value="Search by name or Id">
								<button class="search_btn"></button>
							</div>
                            </ContentTemplate>
                            </asp:UpdatePanel>
							<div class="recommendations_radio_wrapper">
								<input type="radio" name="nj_buddy" id="buddy" value="buddy" class="radio" >
								<label for="buddy">Buddy</label>
							</div>
							<div class="recommendations_radio_wrapper checked">
								<input type="radio" name="nj_buddy" id="newjoiner" value="newjoiner" class="radio" checked="checked">
								<label for="newjoiner">NewJoiner</label>
							</div>
							<div class="recommendations_checkbox_wrapper"  style="padding-right: 15px;">
								<input type="checkbox" name="select_buddies" id="select_buddies" value="all" class="checkbox">
								<label for="select_buddies">Select All Buddies</label>
							</div>
						</div>
						<div id="recommend_nj_buddy_content" class="recommend_inner_tab_content">
							<p class="info_text">List of reportees who need to enhance their connection:</p>
							<div class="recommend_buddy_list fleft">
								<div class="recommend_buddy_list_arrow recommend_buddy_list_arrow_previous fleft"></div>								
								<div id="dvRecommendableBuddies"></div>
								<div class="recommend_buddy_list_arrow recommend_buddy_list_arrow_next fleft"></div>
							</div>
							<div class="recommend_nj_list fleft">
								<div class="recommend_buddy_list_arrow recommend_nj_list_arrow_previous fleft"></div>								
								<div id="dvRecommendableJoinees"></div>
								<div class="recommend_buddy_list_arrow recommend_nj_list_arrow_next fleft"></div>
							</div>
							<div class="recommend_buddy_drop_area fleft">
								<div class="drop_area_wrapper clear">
									<div id="drop_area_newjoiner" class="drop_area_newjoiner fleft"><p class="drop_area_text">Drag New Joiner here</p></div>
									<a href="#" class="recommend_btn fleft">
										<img src="Resources/Images/go_arrow_white.png" alt="Go"/>
										<p>Recommmend</p>
									</a>
									<div id="drop_area_buddy_1" class="drop_area fleft"><p class="drop_area_text">Drag Buddy here</p></div>
									<div id="drop_area_buddy_2" class="drop_area fleft"><p class="drop_area_text">Drag Buddy here</p></div>
									<div id="drop_area_buddy_3" class="drop_area fleft"><p class="drop_area_text">Drag Buddy here</p></div>
								</div>
							</div>
						</div>
						<div id="recommend_registration_content" class="recommend_inner_tab_content">
							<p class="title">List of non-enrolled buddies</p>
							<div class="recommend_registration_list fleft">
								<div class="recommend_registration_arrow recommend_registration_arrow_previous fleft"></div>
								<div id="dvUnenrolledBuddies"></div>								
								<div class="recommend_registration_arrow recommend_registration_arrow_next fleft"></div>
							</div>
							<a href="#" class="recommend_registration_submit">Submit</a>
						</div>
					</div>

					<div id="add_admin_tab_content" style="display:none">
						<div class="notifications_content_tabs">
							<p>Enter ID/Name : </p>
							<input id="AddAdminID" type="text" class="add_admin_id" value="Name/ID here"/>
							<div class="check_name_btn" id="checkAdminId" onclick="SerarchNAME()"></div>
							<a href="#" id="addingadminid" onclick="AddAdmin()">ADD</a>
                            <a id="cancelAddAdmin" href="#" onclick="CancelAddAdmin()">CANCEL</a>
						</div>
						<div class="notifications_content_header">
							<span class="margin_sl_no">Sl.No.</span>
							<span class="margin_admin_user">Admin Users</span>
							<span class="margin_id">IDs</span>
							<span class="margin_remove_admin">Remove Admin</span>
						</div>
						<div class="add_admin_content mousescroll" id="adminlist">
						 <label id ="NorecordAdmin" style="top:80px;position:absolute;left:350px;color:#000000 ;font-size:14px"></label>
						
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
		    <div class="config_error">
				<div class="contact_card_header clear">
					<p>Error in Configuration</p>
					<img src="Resources/Images/contact_close.png" alt="Close" class="config_error_close"/>
				</div>
				<div class="info_screen_details contact_details clear">
					<p>
                    1. <span>Enrolled buddy cannot receive requests greater than he can accept.</span><br/>
                    2. <span>Non-Enrolled buddy cannot receive requests greater than he can accept.</span><br/>
                    3. <span>Non-Enrolled buddy cannot receive requests greater than Enrolled Buddy can.</span><br/>
                    4. <span>Non-Enrolled buddy cannot accept requests greater than Enrolled Buddy can.</span><br/>
                    5. <span>Joinee cannot send requests greater than No. of connections he can have.</span>
                    </p>     
				</div>
				<div class="contact_card_footer"></div>
			</div>						
			<div class="connections">		
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
					Do you really wish to remove yourself as buddy?
					</p>
					<a href="#" class="confirmation_popup_btn disagree_btn">Disagree</a>
					<a href="#" class="confirmation_popup_btn agree_btn">Agree</a>
				</div>
				<div class="contact_card_footer"></div>
			</div>
			<div class="configure_submit_confirmation discontinue_confirmation_popup">
				<div class="contact_card_header clear">
					<p>Are you sure?</p>
					<img src="Resources/Images/contact_close.png" alt="Close" class="configure_submit_confirmation_close discontinue_confirmation_popup_close"/>
				</div>
				<div class="confirmation_popup_details contact_details clear">
					<p>
						Do you really want to submit?
					</p>
					<a href="JavaScript:Window.Close" class="confirmation_popup_btn disagree_btn">No</a>
					<a href="#" onclick="SetConfiguration()" class="confirmation_popup_btn agree_btn">Yes</a>
				</div>
				<div class="contact_card_footer"></div>
			</div>
			<div class="configure_submit_information discontinue_sent_info_popup">
				<div class="contact_card_header clear">
					<p>Updated!</p>
					<img src="Resources/Images/contact_close.png" alt="Close" class="configure_submit_information_close discontinue_sent_info_popup_close"/>
				</div>
				<div class="confirmation_popup_details contact_details clear">
					<p>
						The new configurations are updated!
					</p>
					<a href="#" class="confirmation_popup_btn ok_btn">OK</a>
				</div>
				<div class="contact_card_footer"></div>
			</div>
			<div class="recommend_submit_confirmation discontinue_confirmation_popup">
				<div class="contact_card_header clear">
					<p>Are you sure?</p>
					<img src="Resources/Images/contact_close.png" alt="Close" class="recommend_submit_confirmation_close discontinue_confirmation_popup_close"/>
				</div>
				<div class="confirmation_popup_details contact_details clear">
					<p>
						Are you sure you want to send these recommendations?
					</p>
					<a href="#" class="confirmation_popup_btn disagree_btn">No</a>
					<a href="#" class="confirmation_popup_btn agree_btn">Yes</a>
				</div>
				<div class="contact_card_footer"></div>
			</div>
			<div class="recommend_submit_information discontinue_sent_info_popup">
				<div class="contact_card_header clear">
					<p>Recommendations sent!</p>
					<img src="Resources/Images/contact_close.png" alt="Close" class="recommend_submit_information_close discontinue_sent_info_popup_close"/>
				</div>
				<div class="confirmation_popup_details contact_details clear">
					<p id="pRecommendationSent">						
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
        </form>		
        <input id="CurrentUserId" runat="server" type="hidden" />
        <input id="DisplayName" runat="server" type="hidden" />
		<input id="isSupervisor" runat="server" type="hidden" />
        <input id="isTM" runat="server" type="hidden" />
        <input id="isMasteradmin" runat="server" type="hidden" />
        <input id="myImageSrc" runat="server"  type="hidden" />
        <input id="Gender" runat="server"  type="hidden" />
        <input type="hidden" id="User_Id" runat="server"/>
        <input type="hidden" id="BUListValue" runat="server"/>
        <input type="hidden" id="TypeValue" runat="server"/>
        <input id="ConnectionDuration" type="hidden" runat="server" />
        <input type="hidden" id="ccEmailId" runat="server" />
        <input id="SendMailEmailId" type="hidden" runat="server" />
		
        <script type="text/javascript" src="Resources/JS/jquery.livequery.js"></script>
		<script type="text/javascript" src="Resources/JS/jquery.bgdsize.js"></script>
        <script type="text/javascript" src="Resources/JS/jquery.jkit.1.1.11.js"></script>
        <script type="text/javascript" src="Resources/JS/new_joiners_view.js"></script>        
		<!-- for scroll -->
		<script type="text/javascript" src="Resources/JS/jquery-ui-1.9.2.custom.min.js"></script>
		<script type="text/javascript" src="Resources/JS/scroll.js"></script>
		
		<!-- for pie chart -->
		<script type="text/javascript" src="Resources/JS/raphael.js"></script>
		<script type="text/javascript" src="Resources/JS/pie.js"></script>
        <script src="Resources/JS/JSCommunicatorStatus.js" type="text/javascript"></script>
        <script type="text/javascript">
            $(document).ready(function () {
                document.getElementById('lblConnectionDuration').innerHTML = ConnectionDuration.value;
                Sys.WebForms.PageRequestManager.getInstance().add_endRequest(EndRequestHandler);

                function EndRequestHandler(sender, args) {
                    $('.searchBox').autocomplete({
                        minLength: 3,
                        source: searchSupervisorsList,
                        focus: function (event, ui) {
                            $('.searchBox').val(ui.item.desc.replace(/\s+/g, ''));
                            return false;
                        },
                        select: function (event, ui) {
                            $('.searchBox').val(ui.item.desc.replace(/\s+/g, ''));
                            $('.searchBox')[0].id = ui.item.value.replace(/\s+/g, '');
                            $("#search-id").val(ui.item.value);
                            $("#search-description").html(ui.item.desc);
                            return false;
                        }
                    })
                    .data("ui-autocomplete")._renderItem = function (ul, item) {
                        return $("<li>")
                        .append("<a href='#'>" + item.label + "</a>")
                        .appendTo(ul);
                    };
                }
            });
        </script>
</body>
</html>

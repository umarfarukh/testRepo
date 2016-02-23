<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="buddy_view_welcome.aspx.cs" Inherits="Buddy.Buddy_view_welcome" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="X-UA-Compatible" content="IE=EDGE"/>
    <title>Buddy App</title>
		<link href="Resources/Styles/reset.css" rel="stylesheet" type="text/css"/>
		<link href="Resources/Styles/styles.css" rel="stylesheet" type="text/css"/>
</head>
<body id="buddy_view_welcome">
		<div id="wrapper">
			<div class="header clear">
				<img src="Resources/Images/logo.png" alt="logo" class="logo"/>
			</div>			
			<div class="welcome">
				<div class="welcome_address clear">
					<p>Hi <span id="myName"></span>,</p>
					<div class="user_image_bg">
                        <a id="editprofile" target="_blank" runat="server" title="Edit Profile" href="#">
						<div class="shine"></div>                        
						<div class="thumbnail35" id="myImage" runat="server">                           
						</div>
                        </a>
					</div>
					
				</div>
				<p class="welcome_msg">Happy to see you here! </p>
				<p class="welcome_msg_content">Welcome to the Buddy program. Go on; make a difference by becoming a buddy and helping a new associate settle down at Cognizant! </p>
				<p class="welcome_msg_content">Explore the Buddy App! Let the conversation begin! </p>
				<div class="cindy"><img src="Resources/Images/cindy_right.gif" alt="Cindy"/></div>
				<a href="buddy_view_storyline.aspx" class="go_btn"></a>	
			</div>
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
         <input id="CountryId" type="hidden" runat="server" />

		<script type="text/javascript" src="Resources/JS/jquery-1.8.3.js"></script>
		<script type="text/javascript" src="Resources/JS/jquery.livequery.js"></script>
		<script type="text/javascript" src="Resources/JS/jquery.jkit.1.1.11.js"></script>
		<script type="text/javascript" src="Resources/JS/buddy_view.js"></script>
        <script type="text/javascript">
            $(document).ready(function () {
                document.getElementById('myName').innerHTML = DisplayName.value;
                document.getElementById('lblConnectionDuration').innerHTML = ConnectionDuration.value;
                document.getElementById('editprofile').setAttribute('href', "https://onecognizant.cognizant.com?GlobalAppId=896&Source=9&URL=https%3A%2F%2Fonecognizantapps.cognizant.com%2F896%2FDetailedProfilePage.aspx%3FhdnIsTMFlag%3dNo%26viewprofileid%3D" + CurrentUserId.value + "");
                if (myImageSrc.value != '') {                    
                    document.getElementById('myImage').innerHTML = '<img src="data:image/jpeg;base64,' + myImageSrc.value + '" alt="User"/>';
                }
                else {
                    if (Gender.value == 'M')
                        document.getElementById('myImage').innerHTML = "<img src='Resources/Images/dummy_image_male.png' alt='User'/>"
                    else
                        document.getElementById('myImage').innerHTML = "<img src='Resources/Images/dummy_image_female.png' alt='User'/>"
                }
            });       
        </script> 
	</body>
</html>

<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="new_joiners_view_welcome.aspx.cs" Inherits="Buddy.New_joiners_view_welcome" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="X-UA-Compatible" content="IE=8,IE=EDGE,IE=9" />
    <title>Buddy App</title>
		<link href="Resources/Styles/reset.css" rel="stylesheet" type="text/css"/>
		<link href="Resources/Styles/styles.css" rel="stylesheet" type="text/css"/>
</head>
<body id="new_joiners_view_welcome">
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
						<div class="thumbnail35" id="myImage"></div>
                        </a>
					</div>
					
					</div>
				<p class="welcome_msg">Great to see you here!</p>
				<p class="welcome_msg_content">Welcome to the Buddy program.  We wish to help you find a buddy who will help you settle down at Cognizant!</p>
				<p class="welcome_msg_content">Explore the Buddy App! Let the conversation begin!</p>
				<div class="cindy"><img src="Resources/Images/cindy_right.gif" alt="Cindy"/></div>
				<a href="New_joiners_view_storyline.aspx" class="go_btn"></a>	
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

		<script type="text/javascript" src="Resources/JS/jquery-1.8.3.js"></script>
		<script type="text/javascript" src="Resources/JS/jquery.livequery.js"></script>
		<script type="text/javascript" src="Resources/JS/jquery.jkit.1.1.11.js"></script>
		<script type="text/javascript" src="Resources/JS/new_joiners_view.js"></script>
        <script type="text/javascript">
            $(document).ready(function () {
                document.getElementById('myName').innerHTML = DisplayName.value;
                document.getElementById('lblConnectionDuration').innerHTML = ConnectionDuration.value;
                document.getElementById('editprofile').setAttribute('href', "https://onecognizant.cognizant.com?GlobalAppId=896&Source=9&URL=https%3A%2F%2Fonecognizantapps.cognizant.com%2F896%2FDetailedProfilePage.aspx%3FhdnIsTMFlag%3dNo%26viewprofileid%3D" + CurrentUserId.value + "");
                if (myImageSrc.value != '') {
                    //document.getElementById('myImage').innerHTML = "<a title='Edit Profile' href='https://onecognizant.cognizant.com?GlobalAppId=896&Source=9&URL=https%3A%2F%2Fonecognizantapps.cognizant.com%2F896%2FDetailedProfilePage.aspx%3FhdnIsTMFlag%3dNo%26viewprofileid%3D'" + CurrentUserId.value + "' target='_blank'><img src='data:image/jpeg;base64," + myImageSrc.value + "' alt='User'/></a>";
                    document.getElementById('myImage').innerHTML = '<img src="data:image/jpeg;base64,' + myImageSrc.value + '" alt="User"/>';
                }
                else {
                    if (Gender.value == 'M')
                        document.getElementById('myImage').innerHTML = "<img src='Resources/Images/dummy_image_male.png' alt='User'/>";
                    else
                        document.getElementById('myImage').innerHTML = "<img src='Resources/Images/dummy_image_female.png' alt='User'/>";
                }
            });            
        
        </script>  
	</body>
</html>

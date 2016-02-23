<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Advisor_View.aspx.cs" Inherits="Buddy.Pages.NA.Advisor_View" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>NEW HIRE</title>	
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<link rel="stylesheet" type="text/css" href="../../Resources/Styles/NA/jquery-ui.css">
	<link rel="stylesheet" type="text/css" href="../../Resources/Styles/NA/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="../../Resources/Styles/NA/bootstrap-select.css">
	<link rel="stylesheet" type="text/css" href="../../Resources/Styles/NA/styles.css">
	
	<script type="text/javascript" src="../../Resources/JS/NA/jquery-1.9.1.min.js"></script>
	<script  type="text/javascript" src="../../Resources/JS/NA/AdvisorView.js"></script>
	<script type="text/javascript" src="../../Resources/JS/NA/jquery-ui.js"></script>
	<script type="text/javascript" src="../../Resources/JS/NA/bootstrap.min.js"></script>
	<script type="text/javascript" src="../../Resources/JS/NA/bootstrap-select.js"></script>
	<script type="text/javascript" src="../../Resources/JS/NA/respond.min.js"></script>
	<script type="text/javascript" src="../../Resources/JS/NA/jquery.lazyload.min.js"></script>

	<script type="text/javascript" src="../../Resources/JS/NA/raphael.js"></script>
    
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->    
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->    
    <!--[if lt IE 9]>
    	<script src="js/html5shiv.js"></script>
    	<script src="js/respond.min.js"></script>
    <![endif]--> 


</head>

<body class="bgmid" id="Advisor_View">
	<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wrapper">
 
		<div class="container">
			<div class="row">
			
			<!--Header starts-->
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
					<header class="header headwrapper">
						<div class="row">
							<div class="col-xs-6 leftheader">
								<!-- <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 "><img src="../images/logo.png" class="logoholder" /></div>
								<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 "><img src="../images/logotxt.png" class="logoholder2" /></div> -->
							</div>
							<!-- <div class="hidden-sm hidden-md hidden-lg func-navBar">
								<img class="func-navBarOn" toggle="show" src="../images/icon-navbar.png" / > 
							</div> -->
							<div class="col-xs-6 rightheader right_content">	
								<!-- <div class="rightheader prof-img-container hidden-xs" >
									<img src="../images/icon-profile.png" class="img-circle pull-left"/ > 
								</div>	 -->
								<div class="rightheader text_container hidden-xs">
									
									<span class="welcome_text">Welcome<br> <strong></strong><br></span> 
									<span><img  src="../../Resources/Images/NA/vertical_bar.png" class="hidden-xs"/> </span>
									
								</div>
								<div class="menu_list_header hidden-xs">
									<div class="row header_icons">
										<ul class="head_menu_nav">
									
											<li class="list_menu_icon selected" id="home">
                                                <a href="javascript:;"><div class="home_icon"></div></a>
                                                <div class="driver_score">
                                                    <p>Home</p>
                                                </div>
                                        	</li>
											<li class="list_menu_icon" id="home">
                                                <a href="javascript:GetPendingRequests();"><div class="details_icon"></div></a>
                                                <div class="driver_score">
                                                    <p>Request</p>
                                                </div>
                                        	</li>
											<li class="list_menu_icon" id="alert">
                                                <a href="javascript:GetBuddyAlerts();"><div class="alert_icon"></div></a>
                                                <div class="driver_score ">
                                                    <p>Alert</p>
                                                </div>
                                            </li>
											<li class="list_menu_icon" id="history">
                                                <a href="javascript:GetAllConnections();"><div class="history_icon"></div></a>
                                                <div class="driver_score ">
                                                    <p>Connection</p>
                                                </div>
                                            </li>
											<li class="list_menu_icon" id="supervisor">
                                                <a href="javascript:"><div class="supervisor_icon"></div></a>
                                                <div class="driver_score">
                                                    <p>Supervisor</p>
                                                </div>	
                                            </li>
											<li class="list_menu_icon" id="superadmin">
                                                <a href="javascript:"><div class="superadmin_icon"></div></a>
                                                <div class="driver_score">
                                                    <p>SuperAdmin</p>
                                                </div>
                                            </li>
											

										</ul>
									</div>
									
									
								</div> 
							</div>  				
						</div>
					
					</header>
				</div>
				<!--Header ends-->	
                	
					
		<div class="row">
      <!--Content slide 20 starts-->	
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 martop clsMain_content" id="clsSlide20Home_content">
				<div class="container newhire_advisor_content">
					<div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
						<div id="slide22_role_advisor" class="role_advisor">
							<div class="header_advisor_program"></div>
								<span class="img-responsive img-center bg"> <img src="../../Resources/Images/NA/icon_advisor.png"/> </span>
								<h5>What is the New Hire Advisor Program and your role as an Advisor</h5>
								<p>Click here to learn more about the New Hire Advisor program and the roles/responsibilities of an Advisor.</p>
							<div class="footer_advisor_program"></div>
						</div>
					</div>
					<div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
						<div class="volunteer_advisor">
							<div class="header_view_advisor"></div>
								<span class="img-responsive img-center bg"> <img src="../../Resources/Images/NA/icon_volunteer.png"/> </span>
								<h5>Volunteer/enroll as an Advisor</h5>
								<p>Click here if you would like to participate in the program as an Advisor.</p> 
							<div class="footer_view_advisor"></div>
						</div>
					</div>
					<div class="col-xs-6 col-sm-3 col-md-3 col-lg-3" style="display:none;">
						<div class="view_connections" >
							<div class="header_search_advisor">		 
							</div>
							<span class=" img-responsive img-center bg">
								<img src="../../Resources/Images/NA/icon_connection.png"/>
							</span>
							<h5>View Your Connections</h5>
							<p>Click here to view a list of your active new hire connections, review feedback, or end a connection with a new hire.</p>
							<div class="footer_search_advisor"></div>
						</div>				
					</div> 
					<div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
						<div class="history_details">
							<div class="header_history_details"></div>
								<span class="img-responsive img-center bg"> <img src="../../Resources/Images/NA/icon_history.png"/> </span>
								<h5>History/Notifications</h5>
								<p>Click here to view your pending Advisor requests and check for recent status updates.</p>
							<div class="footer_history_details"></div>
						</div>
					</div>
				</div>
				<div class="container disclaimer_content">
					<h5>Disclaimer:</h5>
					<p>Your participation in this program confirms that you are aware your project/account info,level and Outlook details will be provided to your Advisor so that they may contact you accordingly.</p>
				</div>
				<div class="bgbtm hidden-lg"></div>
			</div>
		<!--Content slide 20 ends-->	
		</div>	
			
		<!--Requests slide 23 starts-->
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 martop res_main_content" id="clsRequest_content" style="display:none;">
						<div class="container res_container">
							<h5>Requests</h5>
                            <div class="clsRequest_content_wrap">
							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 res_wrapper" id="PendingRequest">	
								<%--<div class="row">
									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 res_content">
										<div>
											<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/ >  
										</div>
										<div class="col-xs-8 col-sm-3 col-md-3 col-lg-3 clsDetails">
											<p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
											<p><span class="results_label">ID</span><span>123456</span></p>	
										</div>
										<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_status">
												<span>
													<input value="Accept" class="clsAccept" id="ys_accept" type="button">
													<input value="Decline" class="clsDecline" id="no_decline" type="button">
											</span>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 res_content">
										<div>
											<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/ >  
										</div>
										<div class="col-xs-8 col-sm-3 col-md-3 col-lg-3 clsDetails">
											<p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
											<p><span class="results_label">ID</span><span>123456</span></p>	
										</div>
										<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_status">
											<span>
												<input value="Accept" class="clsAccept" id="ys_accept" type="button">
												<input value="Decline" class="clsDecline" id="no_decline" type="button">
											</span>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 res_content">
										<div>
											<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/ >  
										</div>
										<div class="col-xs-8 col-sm-3 col-md-3 col-lg-3 clsDetails">
											<p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
											<p><span class="results_label">ID</span><span>123456</span></p>	
										</div>
										<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_status">
											<span>
												<input value="Accept" class="clsAccept" id="ys_accept" type="button">
												<input value="Decline" class="clsDecline" id="no_decline" type="button">
											</span>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 res_content">
										<div>
											<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/ >  
										</div>
										<div class="col-xs-8 col-sm-3 col-md-3 col-lg-3 clsDetails">
											<p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
											<p><span class="results_label">ID</span><span>123456</span></p>	
										</div>
										<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_status">
											<span>
												<input value="Accept" class="clsAccept" id="ys_accept" type="button">
												<input value="Decline" class="clsDecline" id="no_decline" type="button">
											</span>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 res_content">
										<div>
											<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/ >  
										</div>
										<div class="col-xs-8 col-sm-3 col-md-3 col-lg-3 clsDetails">
											<p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
											<p><span class="results_label">ID</span><span>123456</span></p>	
										</div>
										<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_status">
											<span>
												<input value="Accept" class="clsAccept" id="ys_accept" type="button">
												<input value="Decline" class="clsDecline" id="no_decline" type="button">
											</span>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 res_content">
										<div>
											<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/ >  
										</div>
										<div class="col-xs-8 col-sm-3 col-md-3 col-lg-3 clsDetails">
											<p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
											<p><span class="results_label">ID</span><span>123456</span></p>	
										</div>
										<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_status">
											<span>
												<input value="Accept" class="clsAccept" id="ys_accept" type="button">
												<input value="Decline" class="clsDecline" id="no_decline" type="button">
											</span>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 res_content">
										<div>
											<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/ >  
										</div>
										<div class="col-xs-8 col-sm-3 col-md-3 col-lg-3 clsDetails">
											<p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
											<p><span class="results_label">ID</span><span>123456</span></p>	
										</div>
										<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_status">
											<span>
												<input value="Accept" class="clsAccept" id="ys_accept" type="button">
												<input value="Decline" class="clsDecline" id="no_decline" type="button">
											</span>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 res_content">
										<div>
											<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/ >  
										</div>
										<div class="col-xs-8 col-sm-3 col-md-3 col-lg-3 clsDetails">
											<p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
											<p><span class="results_label">ID</span><span>123456</span></p>	
										</div>
										<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_status">
											<span>
												<input value="Accept" class="clsAccept" id="ys_accept" type="button">
												<input value="Decline" class="clsDecline" id="no_decline" type="button">
											</span>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 res_content">
										<div>
											<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/ >  
										</div>
										<div class="col-xs-8 col-sm-3 col-md-3 col-lg-3 clsDetails">
											<p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
											<p><span class="results_label">ID</span><span>123456</span></p>	
										</div>
										<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_status">
											<span>
												<input value="Accept" class="clsAccept" id="ys_accept" type="button">
												<input value="Decline" class="clsDecline" id="no_decline" type="button">
											</span>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 res_content">
										<div>
											<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/ >  
										</div>
										<div class="col-xs-8 col-sm-3 col-md-3 col-lg-3 clsDetails">
											<p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
											<p><span class="results_label">ID</span><span>123456</span></p>	
										</div>
										<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_status">
											<span>
												<input value="Accept" class="clsAccept" id="ys_accept" type="button">
												<input value="Decline" class="clsDecline" id="no_decline" type="button">
											</span>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 res_content">
										<div>
											<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/ >  
										</div>
										<div class="col-xs-8 col-sm-3 col-md-3 col-lg-3 clsDetails">
											<p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
											<p><span class="results_label">ID</span><span>123456</span></p>	
										</div>
										<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_status">
											<span>
												<input value="Accept" class="clsAccept" id="ys_accept" type="button">
												<input value="Decline" class="clsDecline" id="no_decline" type="button">
											</span>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 res_content">
										<div>
											<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/ >  
										</div>
										<div class="col-xs-8 col-sm-3 col-md-3 col-lg-3 clsDetails">
											<p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
											<p><span class="results_label">ID</span><span>123456</span></p>	
										</div>
										<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_status">
											<span>
												<input value="Accept" class="clsAccept" id="ys_accept" type="button">
												<input value="Decline" class="clsDecline" id="no_decline" type="button">
											</span>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 res_content">
										<div>
											<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/ >  
										</div>
										<div class="col-xs-8 col-sm-3 col-md-3 col-lg-3 clsDetails">
											<p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
											<p><span class="results_label">ID</span><span>123456</span></p>	
										</div>
										<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_status">
											<span>
												<input value="Accept" class="clsAccept" id="ys_accept" type="button">
												<input value="Decline" class="clsDecline" id="no_decline" type="button">
											</span>
										</div>
									</div>
								</div>--%>

							</div>
                            </div>
                            
						</div>
					</div>
					<!--Requests slide 23  ends-->
					
					<!--Result Content slide 27 starts-->
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 martop res_main_content" id="clsReq27_content" style="display:none;">
						<div class="container req27_container">
							<h5>Requests</h5>
                            <div class="clsRequest_content_wrap">
							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 req27_wrapper" id="ConnectionRequest">
								 
									<%--<div class="row">
										<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 req27_content">
											<div>
												<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/ >  
											</div>
											<div class="col-xs-8 col-sm-3 col-md-3 col-lg-3 clsDetails">
												<p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
												<p><span class="results_label">ID</span><span>123456</span></p>	
											</div>
											<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 btn_status">
													<span>
														<input value="Review Feedback" class="btn_orange clsReview" id="ys_review" type="button">
														<input value="End Connecton" class="btn_grey no_end_connection" id="no_send_req"  type="button">
													</span>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 req27_content">
											<div>
												<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/ >  
											</div>
											<div class="col-xs-8 col-sm-3 col-md-3 col-lg-3 clsDetails">
												<p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
												<p><span class="results_label">ID</span><span>123456</span></p>	
											</div>
											<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 btn_status">
													<span>
														<input value="Review Feedback" class="btn_orange clsReview" id="ys_review" type="button">
														<input value="End Connecton" class="btn_grey no_end_connection" id="no_send_req"  type="button">
													</span>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 req27_content">
											<div>
												<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/ >  
											</div>
											<div class="col-xs-8 col-sm-3 col-md-3 col-lg-3 clsDetails">
												<p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
												<p><span class="results_label">ID</span><span>123456</span></p>	
											</div>
											<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 btn_status" >
													<span>
														<input value="Review Feedback" class="btn_orange clsReview" id="ys_review" type="button" >
														<input value="End Connecton" class="btn_grey no_end_connection" id="no_send_req"  type="button">
													</span>
											</div>
										</div>
									</div>--%>

							
							</div>
                            </div>
						</div>
					</div>
					<!--Result Content slide 27  ends-->
				<!--Content slide 29 starts-->	
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 main_content clsMain_content_29" id="clsAlert_content" style="display:none;">
					<div class="container res_container">
						<h5>Alerts</h5>
						<div class="clsRequest_content_wrap">
							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 res_wrapper" id="Alert_content">
							<!-- <div class="clsRes_Scroll"> -->
								<div class="row">
									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 alerts_content">
										<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/>
										<p>Madison James has shared feedback</p>
									</div>
								</div>
							
								
							<!-- </div>	 -->
							</div>
						 </div>   
					</div>

                </div>   
				<!--Content  slide 29 ends-->	
					
					
			<!--slide 31,32,33 starts-->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 martop clsMain_content" id="role_advisor_content"  style="display:none;">
					<div class="container newhire_content">
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 hire_wrapper">
							<div class="row">
								<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 hire_content role_advisor_inner_cont" id="PageContent">
									<%--<h5>New Hire Advisor Program Overview</h5>
									<ul class="bulletdot">
										<li>What is the New Hire Advisor Program?  The New Hire Advisor Program is designed to help s integrate into the organization during their first <label id="lblDuration" runat="server"></label> days by partnering with a seasoned employee ("Advisor") who is available for immediate assistance and ongoing support.  an Advisor offers advice, guidance, resources, and an introduction to the culture.
											Goals of the Program
										</li>
										
											<ul class="bulletarrow">
												<li>Provide new associates with a high touch, reliable, motivated, single point-of-contact/resource for their basic questions</li>
												<li>Deliver 'just-in-time' responses on what the  can expect from their work environment</li>
												<li>Enhance the new associate connection and assimilation </li>
												<li>Assist the new hire's integrate into the organization by providing access to someone who is familiar with the culture and expectations  </li>
												<li>Reduce attrition</li>
											</ul>
										
									</ul>
									
									<h5>Who is eligible to be an Advisor (criteria)?</h5>
									<ul class="bulletdot">
										<li>Full-time employee who has completed a minimum of 18 months at Cognizant </li>
										<li>Should not be the  new hire's Manager, HCM Supervisor, or ESA Project Manager</li>
										<li>Any desigtion, function, or location across </li>
                                        <li>Can only be connected to no more than 3 s at a time </li>
                                        <li>Demonstrates a positive attitude, willingness to assist ,and desire to help others succeed</li>
                                        <li>Strong communication & interpersonal skills</li>
                                        <li>Has working knowledge of the organization and strong resource base</li>
									</ul>
                                    
                                   <h5>Why should I volunteer to be an Advisor?</h5> 
                                   <ul class="bulletdot">
                                   	<li>Being an Advisor provides you with the opportunity to:</li>
                                    <ul class="bulletarrow">
                                    
                                    	<li>Share your accumulated knowledge and experience with others</li>
                                        <li>Gain a better understanding of yourself through helping others</li>
                                        <li>Expand your skills & capabilities</li>
                                        <li>Meet new colleagues</li>
                                        <li>Assist in making the a productive and valuable asset to the organization</li>
                                        <li>Achieve a greater sense of satisfaction by helping s grow and develop</li>
                                    </ul>
                                   </ul>
                                   <h5>Roles/Responsibilities of the Advisor</h5>
                                    <ul class="bulletdot">
                                    	<li>Provide awareness and serve as a resource guide on processes, policies, systems, and the culture of Cognizant</li>
                                        <li>Share repositories of information and any relevant websites (refer to collaterals list)</li>
                                        <li>Socialize guidelines, culture, expectations, etc</li>
                                        <li>Assist in responding to general/onboarding questions</li>
                                        <li>Share knowledge on the organization – including BU info, culture, etc.</li>
                                        <li>Introduce the  to any relevant key stakeholders or POC's related to their concerns</li>
                                        <li>Build a rapport - Reach out to the  immediately to initiate contact/discussions</li>
                                        <li>Encourage open lines of communication - be available to the  when they seek information or guidance</li>
                                        <li>Help the  to build a network – introduce them to key contacts within your network and help them establish their own network</li>
                                        <li>* Stress the importance of connecting with the 's Manager to define their role and complete their goal setting documentation</li>
                                        <li>Actively seek feedback on how the  is integrating into the organization</li>
                                        <li>An Advisor is not a:</li>
                                         <ul class="bulletarrow">
                                         	<li>Manager/Supervisor</li>
                                            <li>Mentor</li>
                                         </ul>
                                    </ul>
                                    <h5>Tips for the Advisor/Advice for new advisors</h5>
                                    <ul class="bulletdot">
                                    	<li>Be positive – maintain a good attitude and teaching spirit; do not be judgmental</li>
                                        <li>Be patient – don't try to force a relationship  & don't try to cover everything right away</li>
                                        <li>Be a good listener </li>
                                        <li>Encourage open lines of communication – be approachable</li>
                                        <li>Don't worry about being perceived as an expert – if you don't know the answer you can direct them to the appropriate POC</li>
                                        <li>Try to identify the new employee's persolity and preferred style of communication and adapt your approach accordingly</li>
                                    </ul>
                                    <h5>What the Advisor can expect from the new hire </h5>
                                    <ul class="bulletdot">
                                    	<li>An eagerness to learn & coachable attitude</li>
                                        <li>Openness to (constructive) feedback & suggestions</li>
                                        <li>Lots of questions!</li>
                                    </ul>--%>
								</div>
							</div>
							
							
							
						</div>
					</div>
                    
                    <div class="bgbtm hidden-lg"></div>
               
                </div>
            
           <!--slide 31,32,33 ends-->
			<!--Content SUPERADMIN starts-->	
			<div class="dashboard_content">	
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 martop clsMain_content" id="tab_superadmin"  style="display:none;">
				<ul id="myTab" class="nav nav-tabs">
					  <li class="adminview_tab active"><a href="#clsDashboard"  data-toggle="tab"> Dashboard </a> </li>
					  <li class="adminview_tab"><a href="#clsConfigure" data-toggle="tab"> Configure </a> </li>
					  <li class="adminview_tab"><a href="#clsAddAdmin" data-toggle="tab"> Add Admin </a> </li>
				</ul>

         
                <div id="myTabContent" class="tab_content tab-content">
					<!--Dashboard Content starts-->	
						<div id="clsDashboard" class="clsTabDetails tab-pane fade in active">
							<!--Dropdown starts-->
								<div class="row">
									<form class="form-horizontal" role="form">
									  <div class="row">
										<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 clsForm">
										  <label for="inputPassword3" class="control-label tab_label">BU Name : </label>
										  <div class="switch_view_wrapper">
											<select class="selectpicker">
                                             <option value="0">All</option>
											  <option value="1">Retail</option>
											  <option value="2">ASP</option>
											</select>
										  </div>
										</div>
										<div class="dropdown col-xs-12 col-sm-4 col-md-4 col-lg-4 clsForm">
										  <label for="inputPassword3" class="control-label tab_label">View :</label>
										  <div class="switch_view_wrapper view_select_box">
											<select class="selectpicker"  id="view_select">
												<option value="0">Advisor</option>
												<option value="1">New Joiner</option>
											</select>
										  </div>
										</div>
										<div class="dropdown col-xs-12 col-sm-4 col-md-4 col-lg-4 clsForm">
										  <label for="inputPassword3" class="control-label tab_label">Country :</label>
										  <div class="switch_view_wrapper">
											<select class="selectpicker">
											  <option value="0">All</option>
											  <option value="1">NewJersey</option>
											  <option value="2">Teaneck</option>
											  <option value="3">Texas</option>
											  <option value="4">Washington</option>
											  <option value="5">NewJersey</option>
											</select>
										  </div>
										</div>
									  </div>
									  <div class="row search_advisor_footer text-center clsForm">
										<input class="clsSearch apply_btn" type="button" value="Apply">
										<input class="clsReset" type="reset" value="Reset">
									  </div>
									</form>
								</div>
							<!--Dropdown ends-->
							
							<!--Result starts-->
							<div class="row">
								<div class="container dashboard_results">
									<div class="row">
										<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
											<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 pull-left dashboard_content_h5">
												<h5>Results</h5></div>
											<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right   excel_upload_wrap"> <a href="#" class="excel_upload" onclick= "GetExcelData();"> <img src="../../Resources/Images/NA/excel_icon.png" width="39" height="38"/></a> </div>
										</div>
									</div>
									<div class="results_wrapper_content">
										<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_wrapper res_main_content">
											<div class="row">
												<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content" >
													<div class="profile_pic"> <img src="../../Resources/Images/NA/associate_image_img.png" class="img-circle" width="43" height="43"/ > </div>
													<div class="col-xs-7 col-sm-12 col-md-3  col-lg-3  clsDetails">
														<p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
														<p><span class="results_label">ID</span><span>123456</span></p>
													</div>
													<div class="col-xs-12 col-sm-12 col-md-3  col-lg-4 clsDetails liner_txt">
														<p><span class="results_label">Title</span><span class="result_text">Associate</span></p>
													</div>
													<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3  liner_txt">
														<p>
														  <input type="button" class="btn_orange connections_btn btn_alignment" value="Connections"/>
														  <input type="button" class="btn_grey feedback_btn_1" value="Feedback"/>
														</p>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content" >
												 <div class="profile_pic"> <img src="../../Resources/Images/NA/associate_image_img.png" class="img-circle" width="43" height="43"/ > </div>
												  <div class="col-xs-7 col-sm-12 col-md-3 col-lg-3  clsDetails">
													<p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
													<p><span class="results_label">ID</span><span>123456</span></p>
												  </div>
												  <div class="col-xs-12 col-sm-12 col-md-3  col-lg-4  clsDetails liner_txt">
													<p><span class="results_label">Title</span><span class="result_text">Associate</span></p>
												  </div>
												  <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3  liner_txt">
													<p>
													  <input type="button" class="btn_orange connections_btn btn_alignment" value="Connections"/>
													  <input type="button" class="btn_grey feedback_btn_1" value="Feedback"/>
													</p>
												  </div>
												</div>
											</div>
											<div class="row">
												<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content" >
												  <div class="profile_pic"> <img src="../../Resources/Images/NA/associate_image_img.png" class="img-circle" width="43" height="43"/ > </div>
												  <div class="col-xs-7 col-sm-12 col-md-3  col-lg-3  clsDetails">
													<p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
													<p><span class="results_label">ID</span><span>123456</span></p>
												  </div>
												  <div class="col-xs-12 col-sm-12 col-md-3  col-lg-4  clsDetails liner_txt">
													<p><span class="results_label">Title</span><span class="result_text">Associate</span></p>
												  </div>
												  <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3  liner_txt">
													<p>
													  <input type="button" class="btn_orange connections_btn btn_alignment" value="Connections"/>
													  <input type="button" class="btn_grey feedback_btn_1" value="Feedback"/>
													</p>
												  </div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!--Result ends-->
						</div>
					<!--Dashboard Content ends-->			
					<!--Configure Content starts-->	
						<div id="clsConfigure" class="clsTabDetails tab-pane fade">
							<form class="form-horizontal" role="form">
								<div class="row">
									<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6 clsForm">
										<label for="inputEmail3" class="control-label configure_label">Connection duration<span class="clsColon_xs">:</span></label>
										<div class="configure_select configure_duration">										       
											<select class="selectpicker">
												<option value="0">30 days</option>
												<option value="1">60 days</option>
												<option value="2">90 days</option>
												<option value="3">120 days</option>
													
											</select>
										</div>			
									</div>
									<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6 clsForm">
										<label for="inputEmail3" class="control-label configure_label cls_length_txt">No. of Requests that can be received by non enrolled advisors<span class="clsColon_xs">:</span> </label>
										<div class="configure_select configure_view_box cls_length_inp">										       
											<select class="selectpicker">
												<option value="0">1</option>
												<option value="1">2</option>
												<option value="2">3</option>
												<option value="3">4</option>
											</select>
										</div>			
									</div>					
								</div>
								<div class="row">
									<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6 clsForm">
										<label for="inputEmail3" class="control-label configure_label cls_length_txt">No. of Requests that can be received by enrolled advisors <span class="clsColon_xs">:</span></label>
										<div class="configure_select configure_view_box cls_length_inp">										       
											<select class="selectpicker">
												<option value="0">1</option>
												<option value="1">2</option>
												<option value="2">3</option>
												<option value="3">4</option>
											</select>
										</div>			
									</div>
									<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6 clsForm">
										<label for="inputEmail3" class="control-label configure_label cls_length_txt">No. of Requests that can be accepted by non enrolled advisors<span class="clsColon_xs">:</span> </label>
										<div class="configure_select configure_view_box cls_length_inp">										       
											<select class="selectpicker">
												<option value="0">1</option>
												<option value="1">2</option>
												<option value="2">3</option>
												<option value="3">4</option>
											</select>
										</div>			
									</div>						
								</div>
								<div class="row">
									<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6 clsForm">
										<label for="inputEmail3" class="control-label configure_label cls_length_txt">No. of Requests that can be accepted by enrolled advisors<span class="clsColon_xs">:</span> </label>
										<div class="configure_select">										       
											<select class="selectpicker configure_view_box cls_length_inp">
												<option value="0">1</option>
												<option value="1">2</option>
												<option value="2">3</option>	
												<option value="3">4</option>
											</select>
										</div>			
									</div>
									<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6 clsForm">
										<label for="inputEmail3" class="control-label configure_label cls_length_txt">No. of Requests that joinee can send to Advisor <span class="clsColon_xs">:</span></label>
										<div class="configure_select">										       
											<select class="selectpicker configure_view_box cls_length_inp">
												<option value="0">1</option>
												<option value="1">2</option>
												<option value="2">3</option>
												<option value="3">4</option>
											</select>
										</div>			
									</div>		
								</div>
								<div class="row">
									<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6 clsForm">
										<label for="inputEmail3" class="control-label configure_label cls_length_txt cls_length_align_1">No. of connections that the new joiner can have <span class="clsColon_xs">:</span></label>
										<div class="configure_select">										       
											<select class="selectpicker configure_view_box cls_length_inp">
												<option value="0">1</option>
												<option value="1">2</option>
												<option value="2">3</option>
												<option value="3">4</option>										
											</select>
										</div>			
									</div>
									<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6 clsForm">
										<label for="inputEmail3" class="control-label configure_label">Country <span class="clsColon_xs">:</span></label>
										<div class="configure_select">										       
											<select class="selectpicker">
												  <option value="0">NewJersey</option>
												  <option value="1">NewJersey</option>
												  <option value="2">Teaneck</option>
												  <option value="3">Texas</option>
												  <option value="4">Washington</option>
												  <option value="5">NewJersey</option>											
											</select>
										</div>			
									</div>
																	
								</div>
								<div class="row">
									<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6 clsForm">
										<label for="inputEmail3" class="control-label configure_label cls_length_txt_1 cls_len_1">No. of app users<span class="clsColon_lbl">:</span> </label>
										<input type="text" value="20" class="configure_input" id="inpt_Project"
													onfocus="if(this.value=='20') this.value='';"
													onblur="if (this.value == '') this.value = '20';"/>
									</div>	
									<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6 clsForm">
										<label for="inputEmail3" class="control-label configure_label cls_length_txt_1 cls_length_txt_2 cls_length_align">No. of Advisor-NewHire connections <span class="clsColon_lbl">:</span></label>
										<input type="text" value="20" class="configure_input cls_len_1 cls_length_align_inp" id="inpt_Project"
													onfocus="if(this.value=='20') this.value='';"
													onblur="if (this.value == '') this.value = '20';"/>	
									</div>		
								</div>
								<div class="row configure_footer text-center clsForm">
									<input class="clsSearch submit" type="button" value="Submit">
									<input class="clsReset" type="reset" value="Reset">
								</div>
							</form>
						</div>
					<!--Configure Content ends-->		
					<!--Add Admin Content starts-->
						<div id="clsAddAdmin" class="clsTabDetails tab-pane fade">
							<div class="row">
								<div class="form-group col-xs-12 col-sm-7 col-md-7 col-lg-7 clsForm">
									<label for="inputPassword3" class="control-label tab_label">Associate ID/Name :</label>
									<input type="text" value="Enter Associate ID/Name" class="form-control admin_input" id="add_admin"
												onfocus="if(this.value=='Enter Associate ID/Name') this.value='';"
												onblur="if (this.value == '') this.value = 'Enter Associate ID/Name';"/>
								</div>
							</div>
							<div class="row admin_tab_btn text-center clsForm">
								<input class="clsAdd" type="button" value="Add"/>
								<input class="clsCancel" type="reset" value="Cancel"/>
							</div>
							<div class="container admin_container">
								<h5>List of Admin Users</h5>
								<div class="results_wrapper_content">
									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 admin_results_wrapper res_main_content">
										<div class="row">
											<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content">
												<div class="profile_pic"> <img src="../../Resources/Images/NA/associate_image_img.png" class="img-circle" width="43" height="43"/ > </div>
												<div class="col-xs-8 col-sm-4 col-md-4 col-lg-4 clsDetails">
													<p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
													<p><span class="results_label">ID</span><span>123456</span></p>	
												</div>
												<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 clsDetails">
													<p><span class="results_label">Title</span><span class="result_text">AVP Projects</span></p>	
												</div>
												<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_remove">
													<span><input class="btn_grey clsRemove_access" id="remove_access" value="Remove access" type="button"></span>
												</div>
											</div>
										</div>
										<div class="row">
											<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content">
												<div class="profile_pic"> <img src="../../Resources/Images/NA/associate_image_img.png" class="img-circle" width="43" height="43"/ > </div>
												<div class="col-xs-8 col-sm-4 col-md-4 col-lg-4 clsDetails">
													<p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
													<p><span class="results_label">ID</span><span>123456</span></p>	
												</div>
												<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 clsDetails">
													<p><span class="results_label">Title</span><span class="result_text">AVP Projects</span></p>	
												</div>
												<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_remove">
													<span><input class="btn_grey clsRemove_access" id="remove_access" value="Remove access" type="button"></span>
												</div>
											</div>
										</div>
									</div>
								</div>	
							</div>
						</div>
						<!--Add Admin Content ends-->
				</div>
			</div>
		</div>
				<!--Content SUPERADMIN ends-->
	<!--Content SUPERVISOR starts-->	
				
				
				<div class="dashboard_content supervisor_view" style="display:none;">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 martop clsMain_content" id="tab_supervisor">
          <ul id="myTab" class="nav nav-tabs">
            <li class="adminview_tab active"><a href="#pendingreq"  data-toggle="tab"> Pending Advisor Requests </a> </li>
            <li class="adminview_tab"><a href="#recommendassociate" data-toggle="tab"> Recommend an associate to enroll as an Advisor </a> </li>
          </ul>
          
          <!--    <div class="tab-pane fade in active"> -->
          <div id="myTabContent" class="tab_content tab-content"> 
            
            <!--pending request-->
            <div id="pendingreq" class="clsTabDetails tab-pane fade in active">
              <div class="row">
                <div class="form-group col-xs-12 col-sm-7 col-md-7 col-lg-7 clsForm">
                  <label for="inputPassword3" class="control-label tab_label">Associate ID :</label>
                  <input type="text" value="Search" class="form-control admin_input" id="inpt_IDname_associate"
											/>
                </div>
              </div>
              <div class="container admin_container">
                <h5>Pending Advisor Requests</h5>
                <div class="results_wrapper_content">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_wrapper res_main_content pending_req_set">
                  <span class="no_result">No results to display</span>
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content">
                        <div class="profile_pic"> <img src="../../Resources/Images/NA/associate_image_img.png" class="img-circle" width="43" height="43"/ > </div>
                        <div class="col-xs-9 col-sm-4 col-md-4 col-lg-4 clsDetails">
                          <p><span class="results_label">Name</span><span class="result_text name_txt">John</span></p>
                          <p><span class="results_label">ID</span><span>123456</span></p>
                        </div>
                        <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 clsDetails">
                          <p><span class="results_label">Title</span><span class="result_text">AVP Projects</span></p>
                        </div>
                        <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_remove text-center"> <span>
                          <input class="btn_orange assign_advisor" id="" value="Assign an Advisor" type="button">
                          </span> </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content">
                        <div> <div class="profile_pic"> <img src="../../Resources/Images/NA/associate_image_img.png" class="img-circle" width="43" height="43"/ > </div> </div>
                        <div class="col-xs-9 col-sm-4 col-md-4 col-lg-4 clsDetails">
                          <p><span class="results_label">Name</span><span class="result_text name_txt">Madison James</span></p>
                          <p><span class="results_label">ID</span><span>123456</span></p>
                        </div>
                        <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 clsDetails">
                          <p><span class="results_label">Title</span><span class="result_text">AVP Projects</span></p>
                        </div>
                        <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_remove text-center"> <span>
                          <input class="btn_orange assign_advisor" id="" value="Assign an Advisor" type="button">
                          </span> </div>
                      </div>
                    </div>
                    
                    
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content">
                        <div> <div class="profile_pic"> <img src="../../Resources/Images/NA/associate_image_img.png" class="img-circle" width="43" height="43"/ > </div> </div>
                        <div class="col-xs-9 col-sm-4 col-md-4 col-lg-4 clsDetails">
                          <p><span class="results_label">Name</span><span class="result_text name_txt">Joe</span></p>
                          <p><span class="results_label">ID</span><span>123456</span></p>
                        </div>
                        <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 clsDetails">
                          <p><span class="results_label">Title</span><span class="result_text">AVP Projects</span></p>
                        </div>
                        <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_remove text-center"> <span>
                          <input class="btn_orange assign_advisor" id="" value="Assign an Advisor" type="button">
                          </span> </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content">
                        <div> <div class="profile_pic"> <img src="../../Resources/Images/NA/associate_image_img.png" class="img-circle" width="43" height="43"/ > </div> </div>
                        <div class="col-xs-9 col-sm-4 col-md-4 col-lg-4 clsDetails">
                          <p><span class="results_label">Name</span><span class="result_text name_txt">Doe</span></p>
                          <p><span class="results_label">ID</span><span>123456</span></p>
                        </div>
                        <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 clsDetails">
                          <p><span class="results_label">Title</span><span class="result_text">AVP Projects</span></p>
                        </div>
                        <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_remove text-center"> <span>
                          <input class="btn_orange assign_advisor" id="" value="Assign an Advisor" type="button">
                          </span> </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content">
                        <div> <div class="profile_pic"> <img src="../../Resources/Images/NA/associate_image_img.png" class="img-circle" width="43" height="43"/ > </div> </div>
                        <div class="col-xs-9 col-sm-4 col-md-4 col-lg-4 clsDetails">
                          <p><span class="results_label">Name</span><span class="result_text name_txt">Arun</span></p>
                          <p><span class="results_label">ID</span><span>123456</span></p>
                        </div>
                        <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 clsDetails">
                          <p><span class="results_label">Title</span><span class="result_text">AVP Projects</span></p>
                        </div>
                        <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_remove text-center"> <span>
                          <input class="btn_orange assign_advisor" id="" value="Assign an Advisor" type="button">
                          </span> </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content">
                        <div> <div class="profile_pic"> <img src="../../Resources/Images/NA/associate_image_img.png" class="img-circle" width="43" height="43"/ > </div> </div>
                        <div class="col-xs-9 col-sm-4 col-md-4 col-lg-4 clsDetails">
                          <p><span class="results_label">Name</span><span class="result_text name_txt">John</span></p>
                          <p><span class="results_label">ID</span><span>123456</span></p>
                        </div>
                        <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 clsDetails">
                          <p><span class="results_label">Title</span><span class="result_text">AVP Projects</span></p>
                        </div>
                        <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_remove text-center"> <span>
                          <input class="btn_orange assign_advisor" id="" value="Assign an Advisor" type="button">
                          </span> </div>
                      </div>
                    </div><div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content">
                        <div> <div class="profile_pic"> <img src="../../Resources/Images/NA/associate_image_img.png" class="img-circle" width="43" height="43"/ > </div> </div>
                        <div class="col-xs-9 col-sm-4 col-md-4 col-lg-4 clsDetails">
                          <p><span class="results_label">Name</span><span class="result_text name_txt">John</span></p>
                          <p><span class="results_label">ID</span><span>123456</span></p>
                        </div>
                        <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 clsDetails">
                          <p><span class="results_label">Title</span><span class="result_text">AVP Projects</span></p>
                        </div>
                        <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_remove text-center"> <span>
                          <input class="btn_orange assign_advisor" id="" value="Assign an Advisor" type="button">
                          </span> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!--recommend associate-->
            <div id="recommendassociate" class="clsTabDetails tab-pane fade">
              <div class="row">
                <div class="form-group col-xs-12 col-sm-7 col-md-7 col-lg-7 clsForm">
                  <label for="inputPassword3" class="control-label tab_label">Associate ID :</label>
                  <input type="text" value="Search" class="form-control admin_input" id="inpt_IDname_associate_rec" 
											onfocus="if(this.value=='Search') this.value='';"
											onblur="if (this.value == '') this.value = 'Search';"/>
                </div>
              </div>
              <div class="container admin_container">
                <h5>Pending</h5>
                <div class="results_wrapper_content">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_wrapper res_main_content">
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content">
                        <div class="col-xs-3 col-sm-1 col-md-2 col-lg-2 cls_icon_align">
                         <div class="profile_pic"> <img src="../../Resources/Images/NA/associate_image_img.png" class="img-circle" width="43" height="43"/ > </div></div>
                        <div class="col-xs-8 col-sm-4 col-md-3 col-lg-3 clsDetails">
                          <p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
                          <p><span class="results_label">ID</span><span>123456</span></p>
                        </div>
                        <div class="col-xs-8 col-sm-4 col-md-4 col-lg-4 clsDetails">
                          <p><span class="results_label">Title</span><span class="result_text">AVP Projects</span></p>
                        </div>
                        <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_remove text-center"> <span>
                          <input class="btn_orange notify_btn" id="" value="Notify" type="button">
                          </span> </div>
                      </div>
                    </div>
                    
                    
                    
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                    <input type="button" class="btn_orange notify_all_btn" value="Notify All"/>
                  </div>
                </div>
              </div>
            </div>
            
            <!--Add Admin Content ends--> 
            
          </div>
          <!--  </div> --> 
        </div>
      </div>
				
				<!--Content SUPERVISOR starts-->
			<!--Footer starts-->
			<footer class="navbar-fixed-bottom hidden-sm hidden-md hidden-lg">
				
				<div class="foot container menu_list">
					<div class="row">
						<ul class="head_nav">
						
							<li class="list_menu_icon selected"><a href="javascript:;"><div class="home_icon"></div></a></li>
							<li class="list_menu_icon"><a href="javascript:;"><div class="details_icon"></div></a></li>
							<li class="list_menu_icon"><a href="javascript:GetBuddyAlerts();"><div class="alert_icon"></div></a></li>
							<li class="list_menu_icon"><a href="javascript:GetAllConnections();"><div class="history_icon"></div></a></li>
							<li class="list_menu_icon"><a href="javascript:;"><div class="supervisor_icon"></div></a></li>
							<li class="list_menu_icon"><a href="javascript:;"><div class="more_icon"></div></a></li>
							
							
							<div id="panel" style="display:none;">
								<ul class="head_nav">
									<li class="list_menu_icon"><a href="javascript:;"><div class="superadmin_icon"></div></a></li>	
								</ul>
							</div>

						</ul>
					</div>
				</div>
			</footer> 
			<!--Footer ends-->
			
			<div class="footer-body">	
				<div class="bgbtm hidden-lg"></div>
			</div>
				
			</div>
		</div>
		<!-- Container ends --> 
 <!-- Start :Popup Connections -->
		<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 popup_send_request" id="connections"  style="display:none;">
			<div class="clsHeader">
				<h5><strong>Connections:</strong></h5>
				<a href="javascript:;" class="popup_close"></a>
			</div>
			<div class="clsContent">
				<div class="sliderwrap">
					<div class="slider_innerwrap">
						<div class="list_carousel">            	
							<ul class="assmagslider">                           
								<li class="col-xs-12 col-sm-2 col-md-2 col-lg-2 srules"><img rel="1" src="../../Resources/Images/NA/connections_image1.png" alt=""/>
									<p class="pro_name">Jimmy Page</p>
									<p>Programmer Analyst</p>
									<p>From 14/5/2012 </p>
									<p>To 20/8/2012</p></li>
								<li class="col-xs-12 col-sm-2 col-md-2 col-lg-2 sguideline"><img rel="2" src="../../Resources/Images/NA/connections_image1.png" alt=""/>
									<p class="pro_name">Taylor Darton</p>
									<p>Programmer Analyst</p>
									<p>From 14/5/2012 </p>
									<p>To 20/8/2012</p></li>
								<li class="col-xs-12 col-sm-2 col-md-2 col-lg-2 staketest"><img rel="3" src="../../Resources/Images/NA/connections_image1.png" alt=""/>
									<p class="pro_name">Ashley  olsen</p>
									<p>Programmer Analyst</p>
									<p>From 14/5/2012 </p>
									<p>To 20/8/2012</p></li>
								<li class="col-xs-12 col-sm-2 col-md-2 col-lg-2 staketest"><img rel="3" src="../../Resources/Images/NA/connections_image1.png" alt=""/>
									<p class="pro_name">Taylor Darton</p>
									<p>Programmer Analyst</p>
									<p>From 14/5/2012 </p>
									<p>To 20/8/2012</p></li></li>
								<li class="col-xs-12 col-sm-2 col-md-2 col-lg-2 staketest"><img rel="3" src="../../Resources/Images/NA/connections_image1.png" alt=""/>
									<p class="pro_name">Ashley  olsen</p>
									<p>Programmer Analyst</p>
									<p>From 14/5/2012 </p>
									<p>To 20/8/2012</p></li></li>				
							</ul>                
						</div>
					</div>
					<div class="icon_nav"> 
						<div id="prev2" class="prev"></div>
						<div id="next2" class="next"></div>               
					</div>
				</div>
			</div>	 
			<div class="clsFooter">
			</div>
		</div>
	<!-- End :Popup Connections -->
	</div>
<!-- wrapper ends--> 


	<!-- Start : 1st Volunteer popup --> 

		<div class="col-xs-10 col-sm-6 col-md-4 col-lg-4 popup_send_request" id="popup_volunteer" style="display:none;">
			<div class="clsHeader">
				<h5><strong>Confirmation Message</strong></h5>
				<a href="javascript:;" class="popup_close"></a>
			</div>
			<div class="clsContent">
				<p class="recommend_content">As a reminder,your participation in this Program confirms that you are aware your project/account info, level, and
				Outlook details will be visible to the new hire via the search function so that the new hire may contact you accordingly.</p>
				
				<p>I would like to enroll as an Advisor</p>
			</div>	
			<div class="clsFooter">
				<span>
					<input class="clsYes" id="ys_volunteer" type="button">
					<input class="clsNo" id="no_volunteer" type="button">
				</span>
			</div>
		</div>
	
	<!-- End :1st Volunteer popup--> 
	
		<!-- Start : 2nd Volunteer popup --> 

		<div class="col-xs-10 col-sm-6 col-md-4 col-lg-4 popup_send_request" id="Popup2_send"  style="display:none;">
			<div class="clsHeader">
				<h5><strong>Successful !</strong></h5>
				<a href="javascript:;" class="popup_close"></a>
			</div>
			<div class="clsContent">
				<p class="recommend_content" id="message"></p>
			</div>	
			<div class="clsFooter">
				<span>
					<input class="clsOk_req" id="success_ok_send" type="button" value="Ok">
					
				</span>
			</div>
		</div>
	
	<!-- End :2nd Volunteer popup--> 
	
	
	<!-- Start :Acceptance popup --> 
		<div class="col-xs-10 col-sm-6 col-md-4 col-lg-4 popup_send_request" id="accept_request" style="display:none;">
			<div class="clsHeader clearfix">
				<h5><strong>Confirmation Message</strong></h5>
				<a href="javascript:;" class="popup_close"></a>
			</div>
            
			<div class="clsContent">
				<p class="recommend_content ">I would like to accept the request from this individual.</p>
				
			
			</div>	
			<div class="clsFooter">
				<span>
					<input class="clsYes" id="accept_req" type="button">
					<input class="clsNo" id="reject_req" type="button">
				</span>
			</div>
		</div>
	<!-- End :Acceptance popup--> 
	<!-- Start : feedback popup--> 
	<!-- Modal HTML -->
		<div id="feedback" class="modal fade">
		  <div class="modal-dialog">
			<div class="modal-content">
			  <div class="modal-header">
			<button type="button" class="close popup_close" data-dismiss="modal" aria-hidden="true"></button>
                <!--<a class="popup_close" href="javascript:;"></a>-->
				<h4 class="modal-title">Feedback</h4>
			  </div>
			  <div class="modal-body">
				<div class="feedback_options">
				  <ul>
					<li class="str_disagree">Strongly disagree</li>
					<li class="disagree">Disagree</li>
					<li class="neutral">Neutral</li>
					<li class="agree">Agree</li>
					<li class="str_agree">Strongly agree</li>
				  </ul>
				</div>
				<div class="clearfix"></div>
				<div>
				  <ul class="feedback_ques">
					<li>The New Hire Advisor App was an effective tool in locating an appropriate Advisor
					  <ul class="choose_option">
						<li class="cls_stdisagree"><span>1</span></li>
						<li class="cls_disagree"><span>2</span></li>
						<li class="cls_neutral"><span>3</span></li>
						<li class="cls_agree"><span>4</span></li>
						<li class="cls_stagree"><span>5</span></li>
					  </ul>
					  <div class="clearfix"></div>
					</li>
					<li>I was happy with the support provided by my Advisor
					  <ul class="choose_option">
						<li class="cls_stdisagree"><span>1</span></li>
						<li class="cls_disagree"><span>2</span></li>
						<li class="cls_neutral"><span>3</span></li>
						<li class="cls_agree"><span>4</span></li>
						<li class="cls_stagree"><span>5</span></li>
					  </ul>
					  <div class="clearfix"></div>
					</li>
					<li>The frequency of discussions was adequate
					  <ul class="choose_option">
						<li class="cls_stdisagree"><span>1</span></li>
						<li class="cls_disagree"><span>2</span></li>
						<li class="cls_neutral"><span>3</span></li>
						<li class="cls_agree"><span>4</span></li>
						<li class="cls_stagree"><span>5</span></li>
					  </ul>
					  <div class="clearfix"></div>
					</li>
					<li>The content of our discussions was appropriate
					  <ul class="choose_option">
						<li class="cls_stdisagree"><span>1</span></li>
						<li class="cls_disagree"><span>2</span></li>
						<li class="cls_neutral"><span>3</span></li>
						<li class="cls_agree"><span>4</span></li>
						<li class="cls_stagree"><span>5</span></li>
					  </ul>
					  <div class="clearfix"></div>
					</li>
					<li>The aims and objectives of the New Hire Advisor Program were met
					  <ul class="choose_option">
						<li class="cls_stdisagree"><span>1</span></li>
						<li class="cls_disagree"><span>2</span></li>
						<li class="cls_neutral"><span>3</span></li>
						<li class="cls_agree"><span>4</span></li>
						<li class="cls_stagree"><span>5</span></li>
					  </ul>
					  <div class="clearfix"></div>
					</li>
				  </ul>
				</div>
			  </div>
			  <div class="modal-footer">
				<div class="row search_advisor_footer text-center clsForm">
				
				  <input class="clsSearch" type="button" value="Ok" data-dismiss="modal" aria-hidden="true">
				
				</div>
			  </div>
			</div>
		  </div>
		</div>
		<!-- End : feedback popup--> 
	
		<!-- Start :endConnection --> 
		<div class="col-xs-10 col-sm-6 col-md-4 col-lg-4 popup_send_request" id="endConnection" style="display:none;">
			<div class="clsHeader">
				<h5><strong>Confirmation Message</strong></h5>
				<a href="javascript:;" class="popup_close"></a>
			</div>
			<div class="clsContent">
				<p class="recommend_content">
                Are you sure you would like to end your connection with your Advisor?
                </p>
			</div>	
			<div class="clsFooter">
				<span>
					<input class="clsYes" id="yes_end_connection" type="button">
					<input class="clsNo" id="no_end_connection" type="button">
				</span>
			</div>
		</div>
        <!-- End :endConnection --> 
		
			<!-- Start : Error message for admin access --> 
		
        <div class="col-xs-10 col-sm-6 col-md-4 col-lg-4 popup_send_request" id="admin_access" style="display:none;">
			<div class="clsHeader">
				<h5><strong>Access Denied !</strong></h5>
				<a href="javascript:;" class="popup_close"></a>
			</div>
			<div class="clsContent">
				<p class="recommend_content">
                Sorry ! You dont have access.
                </p>
			</div>	
			<div class="clsFooter">
				<input class="clsOk_req_access" id="clsOk_access" type="button" value="Ok">	
			</div>
		</div>
		<!-- End :  Error message for admin access  --> 
		
		<!----------- SUPERADMIN POPUP starts -------------> 
		<!-- Start : 1st popup_add --> 

			<div class="col-xs-10 col-sm-6 col-md-4 col-lg-4 popup_send_request" id="Popup1_add" style="display:none;">
				<div class="clsHeader">
					<h5><strong>Confirmation Message</strong></h5>
					<a href="javascript:;" class="popup_close"></a>
				</div>
				<div class="clsContent">
					<p class="recommend_content">Disclaimer: Your project/account info, level, and Outlook details will be provided to your Advisor so that they may contact you accordingly.</p>
					
					<p>I would like to send request to this individual</p>
				</div>	
				<div class="clsFooter">
					<span>
						<input class="clsYes" id="ys_add" type="button">
						<input class="clsNo" id="no_add" type="button">
					</span>
				</div>
			</div>
		
	<!-- End :1st  popup_add--> 
	<!-- Start : 2nd popup_add--> 
	
		<div class="col-xs-10 col-sm-6 col-md-4 col-lg-4 popup_send_request" id="Popup2_add"  style="display:none;">
			<div class="clsHeader">
				<h5><strong>Successful !</strong></h5>
				<a href="javascript:;" class="popup_close"></a>
			</div>
			<div class="clsContent">
				<p class="recommend_content">You have successfully send advisor request</p>
			</div>	
			<div class="clsFooter">
				<span>
					<input class="clsOk_add" id="success_ok_send" type="button" value="Ok">	
				</span>
			</div>
		</div>
		
	<!-- End : 2nd popup_add-->
	<!-- Start : 2nd popup_empty_add--> 
	
		<div class="col-xs-10 col-sm-6 col-md-4 col-lg-4 popup_send_request" id="Popup_empty_add"  style="display:none;">
			<div class="clsHeader">
				<h5><strong>Alert !</strong></h5>
				<a href="javascript:;" class="popup_close"></a>
			</div>
			<div class="clsContent">
				<p class="recommend_content">Please Enter valid associate Id/Name</p>
			</div>	
			<div class="clsFooter">
				<span>
					<input class="clsOk_add" id="success_ok_send" type="button" value="Ok">	
				</span>
			</div>
		</div>
		
	<!-- End : 2nd popup_empty_add-->
	<!-- Start :Popup remove access --> 
	
			<div class="col-xs-10 col-sm-6 col-md-4 col-lg-4 popup_send_request" id="Popup1_remove" style="display:none;">
				<div class="clsHeader">
					<h5><strong>Confirmation Message</strong></h5>
					<a href="javascript:;" class="popup_close"></a>
				</div>
				<div class="clsContent">
					<p class="recommend_content">Disclaimer: Your project/account info, level, and Outlook details will be provided to your Advisor so that they may contact you accordingly.</p>
					
					<p>I would like to send request to this individual</p>
				</div>	
				<div class="clsFooter">
					<span>
						<input class="clsYes" id="ys_remove" type="button">
						<input class="clsNo" id="no_remove" type="button">
					</span>
				</div>
			</div>
	<!-- End :Popup remove access --> 
	
	<!--View Modal HTML -->
		<div id="feedback" class="modal fade">
		  <div class="modal-dialog">
			<div class="modal-content">
			  <div class="modal-header">
			<button type="button" class="close popup_close" data-dismiss="modal" aria-hidden="true"></button>
                <!--<a class="popup_close" href="javascript:;"></a>-->
				<h4 class="modal-title">Feedback</h4>
			  </div>
			  <div class="modal-body">
				<div class="feedback_options">
				  <ul>
					<li class="str_disagree">Strongly disagree</li>
					<li class="disagree">Disagree</li>
					<li class="neutral">Neutral</li>
					<li class="agree">Agree</li>
					<li class="str_agree">Strongly agree</li>
				  </ul>
				</div>
				<div class="clearfix"></div>
				<div>
				  <ul class="feedback_ques">
					<%--<li>The New Hire Advisor App was an effective tool in locating an appropriate Advisor
					  <ul class="choose_option">
						<li class="cls_stdisagree"><span>1</span></li>
						<li class="cls_disagree"><span>2</span></li>
						<li class="cls_neutral"><span>3</span></li>
						<li class="cls_agree"><span>4</span></li>
						<li class="cls_stagree"><span>5</span></li>
					  </ul>
					  <div class="clearfix"></div>
					</li>
					<li>I was happy with the support provided by my Advisor
					  <ul class="choose_option">
						<li class="cls_stdisagree"><span>1</span></li>
						<li class="cls_disagree"><span>2</span></li>
						<li class="cls_neutral"><span>3</span></li>
						<li class="cls_agree"><span>4</span></li>
						<li class="cls_stagree"><span>5</span></li>
					  </ul>
					  <div class="clearfix"></div>
					</li>
					<li>The frequency of discussions was adequate
					  <ul class="choose_option">
						<li class="cls_stdisagree"><span>1</span></li>
						<li class="cls_disagree"><span>2</span></li>
						<li class="cls_neutral"><span>3</span></li>
						<li class="cls_agree"><span>4</span></li>
						<li class="cls_stagree"><span>5</span></li>
					  </ul>
					  <div class="clearfix"></div>
					</li>
					<li>The content of our discussions was appropriate
					  <ul class="choose_option">
						<li class="cls_stdisagree"><span>1</span></li>
						<li class="cls_disagree"><span>2</span></li>
						<li class="cls_neutral"><span>3</span></li>
						<li class="cls_agree"><span>4</span></li>
						<li class="cls_stagree"><span>5</span></li>
					  </ul>
					  <div class="clearfix"></div>
					</li>
					<li>The aims and objectives of the New Hire Advisor Program were met
					  <ul class="choose_option">
						<li class="cls_stdisagree"><span>1</span></li>
						<li class="cls_disagree"><span>2</span></li>
						<li class="cls_neutral"><span>3</span></li>
						<li class="cls_agree"><span>4</span></li>
						<li class="cls_stagree"><span>5</span></li>
					  </ul>
					  <div class="clearfix"></div>
					</li>--%>
				  </ul>
				</div>
			  </div>
			  <div class="modal-footer">
				<div class="row search_advisor_footer text-center clsForm">
				
				  <input class="clsSearch" type="button" value="Ok" data-dismiss="modal" aria-hidden="true">
				
				</div>
			  </div>
			</div>
		  </div>
		</div>
        <div id="advisorAssign" class="modal fade in assign_advisor_popup">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class=" popup_close" data-dismiss="modal" aria-hidden="true"></button>
        <!--<a class="popup_close" href="javascript:;"></a>-->
        <h5 class="modal-title">List of Advisors</h5>
      </div>
      <div class="modal-body">
        <input type="text" value="Enter ID/Name" class="form-control admin_input" id="inpt_IDname_advisors"
											onfocus="if(this.value=='Enter ID/Name') this.value='';"
											onblur="if (this.value == '') this.value = 'Enter ID/Name';"/>
        <div class="clearfix"></div>
        <div class="advisor_assign_popup_content">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content">
            <div class="col-xs-4 col-sm-3 col-md-2 col-lg-2 cls_icon_align">
              <input type="checkbox" class="chkbox"/>
              <div class="profile_pic"> <img src="../../Resources/Images/NA/associate_image_img.png" class="img-circle" width="43" height="43"/ > </div> </div>
            <div class="col-xs-8 col-sm-5 col-md-5 col-lg-5 clsDetails">
              <p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
              <p><span class="results_label">ID</span><span>123456</span></p>
            </div>
            <div class="col-xs-8 col-sm-5 col-md-5 col-lg-5  clsDetails">
              <p><span class="results_label">Title</span><span class="result_text">AVP Projects</span></p>
            </div>
            
          </div>
        </div>
       <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content">
            <div class="col-xs-4 col-sm-3 col-md-2 col-lg-2 cls_icon_align">
              <input type="checkbox" class="chkbox"/>
              <div class="profile_pic"> <img src="../../Resources/Images/NA/associate_image_img.png" class="img-circle" width="43" height="43"/ > </div></div>
            <div class="col-xs-8 col-sm-5 col-md-5 col-lg-5 clsDetails">
              <p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
              <p><span class="results_label">ID</span><span>123456</span></p>
            </div>
            <div class="col-xs-8 col-sm-5 col-md-5 col-lg-5  clsDetails">
              <p><span class="results_label">Title</span><span class="result_text">AVP Projects</span></p>
            </div>
            
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content">
            <div class="col-xs-4 col-sm-3 col-md-2 col-lg-2 cls_icon_align">
              <input type="checkbox" class="chkbox"/>
              <div class="profile_pic"> <img src="../../Resources/Images/NA/associate_image_img.png" class="img-circle" width="43" height="43"/ > </div> </div>
            <div class="col-xs-8 col-sm-5 col-md-5 col-lg-5 clsDetails">
              <p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
              <p><span class="results_label">ID</span><span>123456</span></p>
            </div>
            <div class="col-xs-8 col-sm-5 col-md-5 col-lg-5  clsDetails">
              <p><span class="results_label">Title</span><span class="result_text">AVP Projects</span></p>
            </div>
            
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content">
            <div class="col-xs-4 col-sm-3 col-md-2 col-lg-2 cls_icon_align">
              <input type="checkbox" class="chkbox"/>
             <div class="profile_pic"> <img src="../../Resources/Images/NA/associate_image_img.png" class="img-circle" width="43" height="43"/ > </div> </div>
            <div class="col-xs-8 col-sm-5 col-md-5 col-lg-5 clsDetails">
              <p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
              <p><span class="results_label">ID</span><span>123456</span></p>
            </div>
            <div class="col-xs-8 col-sm-5 col-md-5 col-lg-5  clsDetails">
              <p><span class="results_label">Title</span><span class="result_text">AVP Projects</span></p>
            </div>
            
          </div>
        </div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="row search_advisor_footer text-center clsForm">
          <input class="btn_orange Send_Recommendations" type="button" value="Send Recommendations" data-dismiss="modal" aria-hidden="true">
          <span class="note_txt">*Select No more than three advisors</span>
        </div>
      </div>
    </div>
  </div>
</div>
		<div class="col-xs-10 col-sm-6 col-md-4 col-lg-4 popup_send_request" id="notify_associate"  style="display:none;">
			<div class="clsHeader">
				<h5><strong>Successful !</strong></h5>
				<a href="javascript:;" class="popup_close"></a>
			</div>
			<div class="clsContent">
				<p class="recommend_content">You have successfully sent the notification.</p>
			</div>	
			<div class="clsFooter">
				<span>
					<input class="clsOk_req_notify" id="success_ok_send" type="button" value="Ok">	
				</span>
			</div>
		</div>
		<!-- End : feedback popup-->
		
		<!-- Start : send recommendation  --> 
		<div class="col-xs-10 col-sm-6 col-md-4 col-lg-4 popup_send_request" id="send_recommend"  style="display:none;">
			<div class="clsHeader">
				<h5><strong>Successful !</strong></h5>
				<a href="javascript:;" class="popup_close"></a>
			</div>
			<div class="clsContent">
				<p class="recommend_content">You have successfully send the recommendation</p>
			</div>	
			<div class="clsFooter">
				<span>
					<input class="clsOk_req_rec" type="button" value="Ok">	
				</span>
			</div>
		</div>
        <div class="col-xs-10 col-sm-6 col-md-4 col-lg-4 popup_send_request" id="send_recommend_condn"  style="display:none;">
			<div class="clsHeader">
				<h5><strong>Error !</strong></h5>
				<a href="javascript:;" class="popup_close"></a>
			</div>
			<div class="clsContent">
				<p class="recommend_content" id="ErrorPopUp"></p>
			</div>	
			<div class="clsFooter">
				<span>
					<input class="clsOk_req_rec" type="button" value="Ok">	
				</span>
			</div>
		</div>
        
	<!-- End :  send recommendation  --> 
	<!-- Start : configure submit  --> 
		<div class="col-xs-10 col-sm-6 col-md-4 col-lg-4 popup_send_request" id="submit_configure"  style="display:none;">
			<div class="clsHeader">
				<h5><strong>Successful !</strong></h5>
				<a href="javascript:;" class="popup_close"></a>
			</div>
			<div class="clsContent">
				<p class="recommend_content">You have successfully submitted the request details</p>
			</div>	
			<div class="clsFooter">
				<span>
					<input class="clsSubmit" type="button" value="Ok">	
				</span>
			</div>
		</div>
	<!-- End :  configure submit  -->   
	<!-- Start : configure submit  --> 
		<div class="col-xs-10 col-sm-6 col-md-3 col-lg-3 popup_send_request" id="decline_popup"  style="display:none;">
			<div class="clsHeader">
				<h5><strong>Reasons to decline</strong></h5>
				<a href="javascript:;" class="popup_close"></a>
			</div>
			<div class="clsContent">
				<p class="recommend_content">Fields are mandatory*</p>
				<textarea name="wsComment" id="wsComment" rows="4" class="decline_text"  cols="4" maxlength="200"></textarea>
			</div>	
			<div class="clsFooter">
				<span>
					<input class="clsSubmit" type="button" value="Submit">	
				</span>
			</div>
		</div>
        <div class="col-xs-10 col-sm-6 col-md-3 col-lg-3 popup_send_request" id="decline_popup_reason"  style="display:none;">
			<div class="clsHeader">
				<h5><strong>Reasons to decline</strong></h5>
				<a href="javascript:;" class="popup_close"></a>
			</div>
			<div class="clsContent">
				<p class="recommend_content">Please enter valid reason to decline.</p>
				
			</div>	
			<div class="clsFooter">
				<span>
					<input class="clsok" type="button" value="Ok">	
				</span>
			</div>
		</div>
	<!-- End :  configure submit  -->   
        	
		
	<div id="autocomplete_admin"></div>
		
	<input id="CurrentUserId" runat="server" type="hidden" />
    <input id="DisplayName" runat="server" type="hidden" />
    <input id="isSupervisor" runat="server" type="hidden" />
    <input id="isTM" runat="server" type="hidden" />
    <input id="isMasteradmin" runat="server" type="hidden" />
    <input id="myImageSrc" runat="server" type="hidden" />
    <input id="Gender" runat="server" type="hidden" />
    <input id="ConnectionDuration" type="hidden" runat="server" />
    <input id="Designation" type="hidden" runat="server" />
    <input id="CountryId" type="hidden" runat="server" />
    <input id="hiddenCountryId" type="hidden" runat="server" />

  <%--  HtmlPage.Window.Invoke("startDownload", httpHandlerUrlBuilder.Uri.ToString());

    <script type="text/javascript">
function startDownload(url){
    alert('Hello');}
</script>--%>
	</body>
</html>

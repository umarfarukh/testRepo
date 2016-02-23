<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="NewHire_View.aspx.cs" Inherits="Buddy.Pages.NA.NewHire_View" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>NEW HIRE</title>	
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
	<link rel="stylesheet" type="text/css" href="../../Resources/Styles/NA/jquery-ui.css"/>
	<link rel="stylesheet" type="text/css" href="../../Resources/Styles/NA/bootstrap.css"/>
	<link rel="stylesheet" type="text/css" href="../../Resources/Styles/NA/bootstrap-select.css"/>
	<link rel="stylesheet" type="text/css" href="../../Resources/Styles/NA/styles.css"/>
	
	<script type="text/javascript" src="../../Resources/JS/NA/jquery-1.9.1.min.js"></script>
	<script  type="text/javascript" src="../../Resources/JS/NA/NewHire_View_older.js"></script>
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
<body class="bgmid" id="NewHire_View">
	<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wrapper"> 
		<div class="container">
			<div class="row">			
			    <!--Header starts-->
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
					<header class="header headwrapper">
						<div class="row">
							<div class="col-xs-6 leftheader">
								<!-- <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 "><img src="../../Resources/Images/NA/logo.png" class="logoholder" /></div>
								<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 "><img src="../../Resources/Images/NA/logotxt.png" class="logoholder2" /></div> -->
							</div>
							<!-- <div class="hidden-sm hidden-md hidden-lg func-navBar">
								<img class="func-navBarOn" toggle="show" src="../../Resources/Images/NA/icon-navbar.png" / > 
							</div> -->
							<div class="col-xs-6 rightheader right_content">	
								<!-- <div class="rightheader prof-img-container hidden-xs" >
									<img src="../../Resources/Images/NA/icon-profile.png" class="img-circle pull-left"/ > 
								</div>	 -->
								<div class="rightheader text_container hidden-xs">
									
									<span class="welcome_text">Welcome<br> <strong id="myName"></strong><br></span>
									<span><img  src="../../Resources/Images/NA/vertical_bar.png" class="hidden-xs"/> </span>
									
								</div>
								<div class="menu_list_header hidden-xs">
									<div class="row header_icons">
										<ul class="head_menu_nav">									
											<%--<li class="list_menu_icon selected"><a href="javascript:;"><div class="home_icon"></div></a></li>
											<li class="list_menu_icon"><a href="javascript:GetLocation();"><div class="search_icon"></div></a></li>
											<li class="list_menu_icon"><a href="javascript:ViewAdvisorsDetails();"><div class="history_icon"></div></a></li>
											<li class="list_menu_icon"><a href="javascript:GetJoineeAlerts();"><div class="alert_icon"></div></a></li>
											<li class="list_menu_icon"><a href="javascript:"><div class="superadmin_icon"></div></a></li>
											<li class="list_menu_icon"><a href="javascript:"><div class="supervisor_icon"></div></a></li>--%>
                                            <li class="list_menu_icon selected" id="home">
                                                <a href="javascript:;"><div class="home_icon"></div></a>
                                                <div class="driver_score">
                                                    <p>Home</p>
                                                </div>
                                        	</li>
											<li class="list_menu_icon" id="search">
                                                <a href="javascript:GetLocation();"><div class="search_icon"></div></a>
                                                <div class="driver_score ">
                                                    <p>Search</p>
                                                </div>
                                            </li>
											<li class="list_menu_icon" id="history">
                                                <a href="javascript:ViewAdvisorsDetails();"><div class="history_icon"></div></a>
                                                <div class="driver_score ">
                                                    <p>Details</p>
                                                </div>
                                            </li>
											<li class="list_menu_icon" id="alert">
                                                <a href="javascript:GetJoineeAlerts();"><div class="alert_icon"></div></a>
                                                <div class="driver_score ">
                                                    <p>Alert</p>
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
					
			
			<div class="clsContent">
                <!-- Slide 3  Content starts-->
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 martop clsMain_content" id="clsHome_content">
					<div class="container newhire_content">
						<div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
							<div id="slide3_advisor_program" class="advisor_program">
								<div class="header_advisor_program">	
								</div>
								 <span class="img-responsive img-center bg">
									<img src="../../Resources/Images/NA/icon_advisor.png"/>
								</span>
								<h5>What is the New Hire Advisor Program</h5>
								<p>The New Hire Advisor Program pairs a new employee with a seasoned resource who is available for immediate assistance,
								guidance, advice, and ongoing support during the assimilation process. Click here to learn more.</p>
								<div class="footer_advisor_program"></div>
							</div>
				
						</div>
						<div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
							<div class="recommend_advisor">
								<div class="header_recommend_advisor">	
								</div>
								 <span class="img-responsive img-center bg">
									<img src="../../Resources/Images/NA/icon_supervisor.png"/>
								</span>
								<h5>Ask your Supervisor to recommend an Advisor</h5>
								<p>Not sure how to select an Advisor ? Click here if you would like your Supervisor/Manager to choose an Advisor for you.</p>	
								<div class="footer_recommend_advisor"></div>
							</div>
						</div>
						<div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
							<div class="search_advisor">
								<div class="header_search_advisor">		 
								</div>
								<span class=" img-responsive img-center bg">
									<img src="../../Resources/Images/NA/icon_search_advisor.png"/>
								</span>
								<h5>Search for an Advisor</h5>
								<p>Click here if you would like to select your own Advisor.You can search by various fields including BU, Account, location etc.</p>
								<div class="footer_search_advisor"></div>
							</div>
				
						</div>
						<div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
							<div id="slide3_history_details" class="history_details">
								<div class="header_history_details">	
								</div>
								 <span class="img-responsive img-center bg">
									<img src="../../Resources/Images/NA/icon_history.png"/>
								</span>
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
				<!--Slide 3 Content ends--> 
				<!--Slide 6 Content starts-->			
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 main_content clsMain_content_15" id="clsSearch_content" style="display:none;">
					<!--SearchBy Content starts-->
					<div class="container search_by">
						<h5>Search By</h5>
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 search_by_wrapper">
							
								<div class="search_by_content">
										
									<form class="form-horizontal" role="form">
										<div class="row">
										
										  <div class="form-group col-xs-12 col-sm-4 col-md-4 col-lg-4 clsForm">
											<label for="inputEmail3" class="control-label search_by_label">Associate ID/Name :</label>
											<input type="text" value="Enter ID" class="form-control search_by_input" id="inpt_IDname" 
											onfocus="if(this.value=='Enter ID') this.value='';"
											onblur="if (this.value == '') this.value = 'Enter ID';"/>
										  </div>
 
										  <div class="form-group col-xs-12 col-sm-4 col-md-4 col-lg-4 clsForm">
											<label for="inputPassword3" class="control-label search_by_label">Project Name  :</label>
											<input type="text" value="Enter Project" class="form-control search_by_input" id="inpt_Project"
											onfocus="if(this.value=='Enter Project') this.value='';"
											onblur="if (this.value == '') this.value = 'Enter Project';"/>
										  </div>
										  
										  <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 clsForm">
												<label for="inputPassword3" class="control-label search_by_label">Status : </label>
												<div class="switch_view_wrapper">										       
													<select class="selectpicker" id="Status">
														<option value="All">All</option>
														<option value="1">Available</option>
														<option value="0">Busy</option>												
													</select>
												</div> 
												<!-- <div class="btn-group">
													<a class="btn btn-default dropdown-toggle search_by_dropdown" data-toggle="dropdown" href="#">All
													<span class="caret search_by_caret"></span></a>
													<ul class="dropdown-menu search_dropdown_select">
														<li><a href="#">All</a></li>
														<li><a href="#">Available</a></li>
														<li><a href="#">Busy</a></li>
													</ul>
												</div>  -->
											</div>
										  
										</div>
										<div class="row">
										
										<div class="form-group col-xs-12 col-sm-4 col-md-4 col-lg-4 clsFormBU">
											<label for="inputEmail3" class="control-label search_by_label">BU :</label>
											<input type="text" value="Enter BU" class="form-control  search_by_input" id="inpt_BU"
											onfocus="if(this.value=='Enter BU') this.value='';"
											onblur="if (this.value == '') this.value = 'Enter BU';"/>
										 </div>
										  
										<div class="form-group col-xs-12 col-sm-4 col-md-4 col-lg-4 clsForm">
											<label for="inputPassword3" class="control-label search_by_label">Account :</label>
											<input type="text" value="Enter Account" class="form-control  search_by_input" id="inpt_Account"
											onfocus="if(this.value=='Enter Account') this.value='';"
											onblur="if (this.value == '') this.value = 'Enter Account';"/>
										</div>
										  
										<div class="form-group col-xs-12 col-sm-4 col-md-4 col-lg-4 clsForm">
											<label for="inputEmail3" class="control-label search_by_label">Enrollment :</label>
											<div class="switch_view_wrapper">										       
												<select class="selectpicker"  id="RegisterAdvisor">
													<option value="All">All</option>
													<option value="1">Enrolled</option>
													<option value="0">UnEnrolled</option>												
												</select>
											</div>
											
										</div>
										  
										</div>
										<div class="row">
											<div class="dropdown col-xs-12 col-sm-4 col-md-4 col-lg-4 clsForm">
												<label for="inputPassword3" class="control-label search_by_label">Location :</label>
												<div class="switch_view_wrapper">										       
													<select class="selectpicker" id='Loc'>
														<%--<option value="0">All</option>
														<option value="1">NewJersey</option>
														<option value="2">Teaneck</option>	
														<option value="3">Texas</option>
														<option value="4">Washington</option>
														<option value="5">NewJersey</option>		--%>
													</select>
												</div>
											</div>
										</div> 
										<div class="row search_advisor_footer text-center clsForm">
											<input class="clsSearch" id="SearchAdvisor" onclick=" GetSearchresult();" type="button"  name="Search" value="Search"/>
											<input class="clsReset"  onclick="Resetfields();" type="reset" value="Reset"/>
										</div>
									</form>
							
							
								</div>	
						</div>
					</div>
					<!--SearchBy Content ends-->
					
					<!--Result Content starts-->
					<div class="container results">
						<h5>Results</h5>
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_wrapper" id="clslazy">
							<div class="clsScroll" id="searchScroll" runat="server">							
							<%--	<div class="row">
									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content" >
										<div>
											<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/ >  
										</div>
										<div class="col-xs-8 col-sm-3 col-md-3 col-lg-3 clsDetails">
								
												<p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
												<p><span class="results_label">ID</span><span>123456</span></p>
											
										</div>
										<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 clsDetails_odd">
										
											<p><span class="results_label">Location</span><span class="result_text">Teaneck, New Jersey</span></p>
											<p><span class="results_label">BU</span><span class="result_text">Cognizant Interactive</span></p>
											
										</div>
										<div class="col-xs-12 col-sm-2 col-md-2 col-lg-3 clsDetailss">
										
											<p><span class="results_label">Designation</span><span class="result_text">Associate</span></p>
											<p><span class="results_label">Level</span><span>A</span></p>
											
										</div>
										<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_send_req">
											<span>
												<input class="clsSend_req" type="button">
												<label class="req_send_label"  style="display:none;">Request sent</label>
											</span>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content">
										<div>
											<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/ >  
										</div>
										<div class="col-xs-8 col-sm-3 col-md-3 col-lg-3 clsDetails">
								
												<p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
												<p><span class="results_label">ID</span><span>123456</span></p>
											
										</div>
										<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 clsDetails_odd">
										
											<p><span class="results_label">Location</span><span class="result_text">Teaneck, New Jersey</span></p>
											<p><span class="results_label">BU</span><span class="result_text">Cognizant Interactive</span></p>
											
										</div>
										<div class="col-xs-12 col-sm-2 col-md-2 col-lg-3 clsDetailss">
										
											<p><span class="results_label">Designation</span><span class="result_text">Associate</span></p>
											<p><span class="results_label">Level</span><span>A</span></p>
											
										</div>
										<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_send_req">
											<span>
												<input class="clsSend_req" type="button">
												<label class="req_send_label"  style="display:none;">Request sent</label>
											</span>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content">
										<div>
											<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/ >  
										</div>
										<div class="col-xs-8 col-sm-3 col-md-3 col-lg-3 clsDetails">
								
												<p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
												<p><span class="results_label">ID</span><span>123456</span></p>
											
										</div>
										<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 clsDetails_odd">
										
											<p><span class="results_label">Location</span><span class="result_text">Teaneck, New Jersey</span></p>
											<p><span class="results_label">BU</span><span class="result_text">Cognizant Interactive</span></p>
											
										</div>
										<div class="col-xs-12 col-sm-2 col-md-2 col-lg-3 clsDetailss">
										
											<p><span class="results_label">Designation</span><span class="result_text">Associate</span></p>
											<p><span class="results_label">Level</span><span>A</span></p>
											
										</div>
										<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_send_req">
											<span>
												<input class="clsSend_req" type="button">
												<label class="req_send_label"  style="display:none;">Request sent</label>
											</span>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_content">
										<div>
											<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/ >  
										</div>
										<div class="col-xs-8 col-sm-3 col-md-3 col-lg-3 clsDetails">
								
												<p><span class="results_label">Name</span><span class="result_text">Madison James</span></p>
												<p><span class="results_label">ID</span><span>123456</span></p>
											
										</div>
										<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 clsDetails_odd">
										
											<p><span class="results_label">Location</span><span class="result_text">Teaneck, New Jersey</span></p>
											<p><span class="results_label">BU</span><span class="result_text">Cognizant Interactive</span></p>
											
										</div>
										<div class="col-xs-12 col-sm-2 col-md-2 col-lg-3 clsDetailss">
										
											<p><span class="results_label">Designation</span><span class="result_text">Associate</span></p>
											<p><span class="results_label">Level</span><span>A</span></p>
											
										</div>
										<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 btn_send_req">
											<span>
												<input class="clsSend_req" type="button">
												<label class="req_send_label"  style="display:none;">Request sent</label>
												
											</span>
										</div>
									</div>
								</div>--%>
							</div>
						</div>
					</div> 
					<!--Result Content ends-->
				</div>					
			    <!--Slide 6 Content ends-->  		
			    <!--Content slide 9 starts-->		
				<!-- <div class="row">
				  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 martop clsMain_content" id="clsAdvisorHome_content" style="display:none;">
					<div class="container newhire_advisor_content">
					  <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
						<div id="Slide9_advisor_program" class="advisor_program">
						  <div class="header_advisor_program"> </div>
						  <span class="img-responsive img-center bg"> <img src="../../Resources/Images/NA/icon_advisor.png"/> </span>
						  <h5>What is the New Hire Advisor Program</h5>
						  <p>The New Hire Advisor Program pairs a new employee with a seasoned resource who is available for immediate assistance,
							guidance, advice, and ongoing support during the assimilation process. Click here to learn more.</p>
						  <div class="footer_advisor_program"></div>
						</div>
					  </div>
					  <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
						<div class="view_advisor">
						  <div class="header_view_advisor"> </div>
						  <span class="img-responsive img-center bg"> <img src="../../Resources/Images/NA/icon_advisor_details.png"/> </span>
						  <h5>View your Advisor Details</h5>
						  <p>Click here to learn more about your Advisor, provide feedback on the program,or end your connection with your Advisor.</p>
						  <div class="footer_recommend_advisor"></div>
						</div>
					  </div>
					  <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
						<div id="slide9_history_details" class="history_details">
						  <div class="header_history_details"> </div>
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
				
				</div> -->
		        <!--Content slide 9 ends-->					
	            <!--Content slide 10 starts-->	
			    <div class="row">
		 
				<div class="cls_scroll_area">
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 main_content_advisor clsMain_content" id="cls_view_advisor" style="display:none;">
				  
					<%--<div class="row"><div class=" view_advisor_inner_content col-md-offset-1 col-xs-offset-1 col-xs-10 col-sm-10 col-md-10 col-lg-10">
					<span class="associate_image"> </span>
					 <div class="row">
					  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						
							<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 pad_50">
							  <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-12 view_advisor_list ">
								<label for="" class="control-label ">Name :</label>
								<span>James Madison</span> </div>
							  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 view_advisor_list">
								<label for="" class="control-label ">ID :</label>
								<span>123565</span> </div>
							  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 view_advisor_list">
								<label for="" class="control-label ">BU :</label>
								<span>Retail</span> </div>
							  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 view_advisor_list">
								<label for="" class="control-label ">Grade :</label>
								<span>Associate</span> </div>
							</div>
							<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="text-align:center;" >
							<p class="days_left">Days Left</p>
							  <div class="status_holder">
								<div class="man_holder ">
								<span class="days_left_number">40</span>
								 <img src="../../Resources/Images/NA/progress_bar_image.png" class="progress_bar_bg"/>
								  <div id="custom_arc"> </div>
								</div>
							  </div>
							</div>
							</div>
					  </div>
					   <div class="row">
						  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 pad_140" style="text-align:center;">
							<input type="button" class="btn_orange feedback_btn" value="Feedback"/>
							<input type="button" class="btn_grey  end_connection" value="End Connection"/>
						  </div>
					  </div>
					</div></div>--%>
					<%--<div class="row"><div class=" view_advisor_inner_content col-md-offset-1 col-xs-offset-1 col-xs-10 col-sm-10 col-md-10 col-lg-10 mtop25">
					<span class="associate_image"> </span>
					 <div class="row">
					  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						
							<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 pad_50">
							  <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-12 view_advisor_list ">
								<label for="" class="control-label ">Name :</label>
								<span>James Madison</span> </div>
							  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 view_advisor_list">
								<label for="" class="control-label ">ID :</label>
								<span>123565</span> </div>
							  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 view_advisor_list">
								<label for="" class="control-label ">BU :</label>
								<span>Retail</span> </div>
							  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 view_advisor_list">
								<label for="" class="control-label ">Grade :</label>
								<span>Associate</span> </div>
							</div>
							<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="text-align:center;" >
							<p class="days_left">Days Left</p>
							  <div class="status_holder">
								<div class="man_holder ">
								<span class="days_left_number">40</span>
								 <img src="../../Resources/Images/NA/progress_bar_image.png" class="progress_bar_bg"/>
								  <div id="custom_arc"> </div>
								</div>
							  </div>
							</div>
							</div>
					  </div>
					   <div class="row">
						  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 pad_140" style="text-align:center;">
							<input type="button" class="btn_orange feedback_btn" value="Feedback"/>
							<input type="button" class="btn_grey end_connection" value="End Connection"/>
						  </div>
					  </div>
					</div></div>--%>
					<%--<div class="row"><div class=" view_advisor_inner_content col-md-offset-1 col-xs-offset-1 col-xs-10 col-sm-10 col-md-10 col-lg-10 mtop25">
					<span class="associate_image"> </span>
					 <div class="row">
					  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						
							<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 pad_50">
							  <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-12 view_advisor_list ">
								<label for="" class="control-label ">Name :</label>
								<span>James Madison</span> </div>
							  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 view_advisor_list">
								<label for="" class="control-label ">ID :</label>
								<span>123565</span> </div>
							  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 view_advisor_list">
								<label for="" class="control-label ">BU :</label>
								<span>Retail</span> </div>
							  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 view_advisor_list">
								<label for="" class="control-label ">Grade :</label>
								<span>Associate</span> </div>
							</div>
							<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="text-align:center;" >
							<p class="days_left">Days Left</p>
							  <div class="status_holder">
								<div class="man_holder ">
								<span class="days_left_number">40</span>
								 <img src="../../Resources/Images/NA/progress_bar_image.png" class="progress_bar_bg"/>
								  <div id="custom_arc"> </div>
								</div>
							  </div>
							</div>
							</div>
					  </div>
					   <div class="row">
						  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 pad_140" style="text-align:center;">
							<input type="button" class="btn_orange feedback_btn" value="Feedback"/>
							<input type="button" class="btn_grey end_connection" value="End Connection"/>
						  </div>
					  </div>
					</div></div>--%>
					<%--<div class="row"><div class=" view_advisor_inner_content col-md-offset-1 col-xs-offset-1 col-xs-10 col-sm-10 col-md-10 col-lg-10 mtop25">
					<span class="associate_image"> </span>
					 <div class="row">
					  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						
							<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 pad_50">
							  <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-12 view_advisor_list ">
								<label for="" class="control-label ">Name :</label>
								<span>James Madison</span> </div>
							  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 view_advisor_list">
								<label for="" class="control-label ">ID :</label>
								<span>123565</span> </div>
							  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 view_advisor_list">
								<label for="" class="control-label ">BU :</label>
								<span>Retail</span> </div>
							  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 view_advisor_list">
								<label for="" class="control-label ">Grade :</label>
								<span>Associate</span> </div>
							</div>
							<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="text-align:center;" >
							<p class="days_left">Days Left</p>
							  <div class="status_holder">
								<div class="man_holder ">
								<span class="days_left_number">40</span>
								 <img src="../../Resources/Images/NA/progress_bar_image.png" class="progress_bar_bg"/>
								  <div id="custom_arc"> </div>
								</div>
							  </div>
							</div>
							</div>
					  </div>
					   <div class="row">
						  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 pad_140" style="text-align:center;">
							<input type="button" class="btn_orange feedback_btn" value="Feedback"/>
							<input type="button" class="btn_grey end_connection" value="End Connection"/>
						  </div>
					  </div>
					</div></div>--%>
			  </div>
			  </div>
   
			</div>
		        <!--Content slide 10 ends-->		
				<!--Content slide 16 starts-->	
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 martop clsMain_content" id="clsAlert_content" style="display:none;">
					<div class="container alert_container">
					<h5>Alerts</h5>
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 alert_wrapper" id="Newhire_alerts">
							<%--<div class="row">
								<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 alerts_content">
									<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/>
									<p>Your connection/relationship with 'Madison James' has been terminated</p>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 alerts_content">
									<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/>
									<p>Your connection/relationship with 'Madison James' has been terminated</p>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 alerts_content">
									<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/>
									<p>Your connection/relationship with 'Madison James' has been terminated</p>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 alerts_content">
									<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/>
									<p>Your connection/relationship with 'Madison James' has been terminated</p>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 alerts_content">
									<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/>
									<p>Your connection/relationship with 'Madison James' has been terminated</p>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 alerts_content">
									<img src="../../Resources/Images/NA/result_profile.png" class="img-circle pull-left profile"/>
									<p>Your connection/relationship with 'Madison James' has been terminated</p>
								</div>
							</div>--%>
							
						</div>
					</div>

                </div>   
				<!--Content  slide 16 ends-->					
				<!--Content slide 18 starts-->	
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 martop clsMain_content" id="clsHirepgm_content"  style="display:none;">
					<div class="container hire_container">
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 hire_wrapper">
							<div class="row">
								<div class="col-xs-12 col-sm-12 col-md-12 col-lg-11 hire_content" id="PageContent">
								<%--	<h5>What is the New Hire Advisor Program?</h5>
									<ul class="bulletdot">
										<li>What is the New Hire Advisor Program?  The New Hire Advisor Program is designed to help s integrate into the organization
										during their first 120 days by partnering with a seasoned employee (“Advisor”) who is available for immediate assistance and ongoing
										support.  an Advisor offers advice, guidance, resources, and an introduction to the culture.</li><br>
										<li>Goals of the Program include</li>
											<ul class="bulletarrow">
												<li>Provide new associates with a high touch, reliable, motivated, single point-of-
												contact/resource for their basic questions</li>
												<li>Deliver ‘just-in-time’ responses on what the  can expect from their work environment</li>
												<li>Enhance the new associate connection and assimilation</li>
												<li>Assist the ’s integrate into the organization by providing access to someone who is familiar
												with the culture and expectations</li>
												<li> Reduce attrition</li>
											</ul>
										<li>Who is eligible to participate ? All US lateral new hires, who have been with organization for less than 120 days, are eligible to participate in the program </li>	
									</ul>
									
									<h5>What the New Hire can expect from their Advisor</h5>
									<ul class="bulletdot">
										<li>Open communication</li>
										<li>Easy access</li>
										<li>Patience</li>
									</ul>--%>
								</div>
							</div>
							
							
							
						</div>
					</div>
                    
                    <div class="bgbtm hidden-lg"></div>
               
                </div>   
				<!--Content  slide 18 ends-->	
			
			
            <!--Content SUPERADMIN starts-->	
			<div class="dashboard_content">	
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 martop clsMain_content" id="tab_superadmin"  style="display:none;">
					<ul id="myTab" class="nav nav-tabs">
						  <li class="adminview_tab active"><a href="#clsDashboard" onclick="GetDashBoardTabPrefillValues();" data-toggle="tab"> Dashboard </a> </li>
						  <li class="adminview_tab"><a href="#clsConfigure" onclick="Getconfiguration();" data-toggle="tab"> Configure </a> </li>
						  <li class="adminview_tab"><a href="#clsAddAdmin" onclick="GetAdminList();" data-toggle="tab"> Add Admin </a> </li>
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
												<select class="selectpicker" id="DashboardBU">
												 <%--<option value="0">All</option>
												  <option value="1">Retail</option>
												  <option value="2">ASP</option>--%>
												</select>
											  </div>
											</div>
											<div class="dropdown col-xs-12 col-sm-4 col-md-4 col-lg-4 clsForm">
											  <label for="inputPassword3" class="control-label tab_label">View :</label>
											  <div class="switch_view_wrapper view_select_box">
												<select class="selectpicker"  id="view_select">
													<option value="1">Advisor</option>
													<option value="0">New Joiner</option>
												</select>
											  </div>
											</div>
											<div class="dropdown col-xs-12 col-sm-4 col-md-4 col-lg-4 clsForm">
											  <label for="inputPassword3" class="control-label tab_label">Country :</label>
											  <div class="switch_view_wrapper">
												<select class="selectpicker" id="DashboardLoc">
												 <%-- <option value="0">All</option>
												  <option value="1">NewJersey</option>
												  <option value="2">Teaneck</option>
												  <option value="3">Texas</option>
												  <option value="4">Washington</option>
												  <option value="5">NewJersey</option>--%>
												</select>
											  </div>
											</div>
										  </div>
										  <div class="row search_advisor_footer text-center clsForm">
											<input class="clsSearch apply_btn" type="button" value="Apply">
											<input class="clsReset" id="DashboardReset" type="reset" value="Reset">
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
												<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right   excel_upload_wrap"> 
                                                <a href="#" class="excel_upload" onclick="GetExcelData();"> <img src="../../Resources/Images/NA/excel_icon.png" width="39" height="38"/></a> 
                                                 <%--   <asp:LinkButton ID="LinkButton1" class="excel_upload" runat="server" OnClick="GetExcelData"></asp:LinkButton>
                                                    <asp:Image ID="Image1" src="../../Resources/Images/NA/excel_icon.png" width="39" height="38" runat="server" />--%>                                                    
                                                </div>
											</div>
										</div>
										<div class="results_wrapper_content">
											<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_wrapper res_main_content" id="DashBoardData">
											<%--	<div class="row">
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
												</div>--%>
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
											<label for="inputEmail3" class="control-label configure_label">Advisor duration<span class="clsColon_xs">:</span></label>
											<div class="configure_select configure_duration" id="AdvisorDuration">										       
												<select class="selectpicker" id="AdvisorDurationSelected">
													<option value="30">30 days</option>
													<option value="60">60 days</option>
													<option value="90">90 days</option>
													<option value="120">120 days</option>
														
												</select>
											</div>			
										</div>
										<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6 clsForm">
											<label for="inputEmail3" class="control-label configure_label cls_length_txt">No of Requests that can be received by non enrolled advisors<span class="clsColon_xs">:</span> </label>
											<div class="configure_select configure_view_box cls_length_inp" id="RequestToUnregBuddy">										       
												<select class="selectpicker" id="RequestToUnregBuddySelected">
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
												</select>
											</div>			
										</div>					
									</div>
									<div class="row">
										<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6 clsForm">
											<label for="inputEmail3" class="control-label configure_label cls_length_txt">No of Requests that can be received by enrolled advisors <span class="clsColon_xs">:</span></label>
											<div class="configure_select configure_view_box cls_length_inp" id="RequestToRegBuddy">										       
												<select class="selectpicker" id="RequestToRegBuddySelected">
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
												</select>
											</div>			
										</div>
										<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6 clsForm">
											<label for="inputEmail3" class="control-label configure_label cls_length_txt">No of Requests that can be accepted by non enrolled advisors<span class="clsColon_xs">:</span> </label>
											<div class="configure_select configure_view_box cls_length_inp" id="RequestsAcceptedByUnregBuddy">										       
												<select class="selectpicker" id="RequestsAcceptedByUnregBuddySelected">
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
												</select>
											</div>			
										</div>						
									</div>
									<div class="row">
										<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6 clsForm">
											<label for="inputEmail3" class="control-label configure_label cls_length_txt">No of Requests that can be accepted by enrolled advisors<span class="clsColon_xs">:</span> </label>
											<div class="configure_select" id="RequestAcceptedbyRegBuddy">										       
												<select class="selectpicker configure_view_box cls_length_inp" id="RequestAcceptedbyRegBuddySelected">
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>	
													<option value="4">4</option>
												</select>
											</div>			
										</div>
										<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6 clsForm">
											<label for="inputEmail3" class="control-label configure_label cls_length_txt">No of Requests that joinee can send to Advisor <span class="clsColon_xs">:</span></label>
											<div class="configure_select"  id="RequestsSendByJoinee">										       
												<select class="selectpicker configure_view_box cls_length_inp" id="RequestsSendByJoineeSelected">
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
												</select>
											</div>			
										</div>		
									</div>
									<div class="row">
										<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6 clsForm">
											<label for="inputEmail3" class="control-label configure_label cls_length_txt">No of connections that the new joiner can have <span class="clsColon_xs">:</span></label>
											<div class="configure_select"  id="ConnectionsOfJoiners">										       
												<select class="selectpicker configure_view_box cls_length_inp" id="ConnectionsOfJoinersSelected">
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>										
												</select>
											</div>			
										</div>
										<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6 clsForm">
											<label for="inputEmail3" class="control-label configure_label">Country <span class="clsColon_xs">:</span></label>
											<div class="configure_select"  id="ConfigLocation">										       
												<select class="selectpicker" id="ConfigLocation1">
													  <%--<option value="0">NewJersey</option>
													  <option value="1">NewJersey</option>
													  <option value="2">Teaneck</option>
													  <option value="3">Texas</option>
													  <option value="4">Washington</option>
													  <option value="5">NewJersey</option>		--%>									
												</select>
											</div>			
										</div>
																		
									</div>
									<div class="row">
										<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6 clsForm">
											<label for="inputEmail3" class="control-label configure_label cls_length_txt_1 cls_len_1">No of app users<span class="clsColon_lbl">:</span> </label>
											<%--<input type="text" value="20" class="configure_input" id="Text1"
														onfocus="if(this.value=='20') this.value='';"
														onblur="if (this.value == '') this.value = '20';"/>--%>
                                                        <label id="NoofAppUsers" style="color:#999999"></label>
										</div>	
										<div class="form-group col-xs-12 col-sm-6 col-md-6 col-lg-6 clsForm">
											<label for="inputEmail3" class="control-label configure_label cls_length_txt_1 cls_length_txt_2">No of Advisor-NewHire connections <span class="clsColon_lbl">:</span></label>
											<%--<input type="text" value="20" class="configure_input cls_len_1" id="Text2"
														onfocus="if(this.value=='20') this.value='';"
														onblur="if (this.value == '') this.value = '20';"/>	--%>
                                                        <label id="BuddyNJcon" style="color:#999999"></label>
										</div>		
									</div>
									<div class="row configure_footer text-center clsForm">
										<input class="clsSearch submit" type="button" value="Submit"/>
										<input class="clsReset" id="ConfigReset" type="reset" value="Reset"/>
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
											<%--<div class="row">
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
											</div>--%>
											<%--<div class="row">
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
											</div>--%>
										</div>
									</div>	
								</div>
							</div>
							<!--Add Admin Content ends-->
					</div>
				</div>
				<!--Content SUPERVISOR starts-->			
				<div class="supervisor_view" style="display:none;">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 martop clsMain_content" id="tab_supervisor">
				  <ul id="myTab" class="nav nav-tabs">
					<li class="adminview_tab active"><a href="#pendingreq"  data-toggle="tab" onclick="GetRecommendableJoinees();"> Pending Advisor Requests </a> </li>
					<li class="adminview_tab"><a href="#recommendassociate" data-toggle="tab" onclick="GetUnenrolledBuddies();"> Recommend an associate to register as an Advisor </a> </li>
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
						 <%-- <span class="no_result">No result to Display</span>--%>
							<%--<div class="row">
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
							</div>--%>
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
						  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 results_wrapper res_main_content" id="RecommendAdvisortoEnroll">
							<%--<div class="row">
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
							</div>--%>
							
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
			    <!--Content SUPERVISOR ends-->	
			</div>
		   <!--Content SUPERADMIN ends-->

			<!--Footer starts-->
			<footer class="navbar-fixed-bottom hidden-sm hidden-md hidden-lg">				
				<div class="foot container menu_list">
					<div class="row">
						<ul class="head_nav">
						
							<li class="list_menu_icon selected"><a href="javascript:;"><div class="home_icon"></div></a></li>
							<li class="list_menu_icon"><a href="javascript:GetLocation();"><div class="search_icon"></div></a></li>
							<li class="list_menu_icon"><a href="javascript:ViewAdvisorsDetails();"><div class="history_icon"></div></a></li>
							<li class="list_menu_icon"><a href="javascript:GetJoineeAlerts();"><div class="alert_icon"></div></a></li>
							<li class="list_menu_icon"><a href="javascript:;"><div class="superadmin_icon"></div></a></li>
							<li class="list_menu_icon"><a href="javascript:;"><div class="more_icon"></div></a></li>
							
							
							<div id="panel" style="display:none;">
								<ul class="head_nav">
									<li class="list_menu_icon"><a href="javascript:;"><div class="supervisor_icon"></div></a></li>
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
								<%--<li class="col-xs-12 col-sm-2 col-md-2 col-lg-2 srules"><img  src="../../Resources/Images/NA/connections_image1.png" alt=""/>
									<p class="pro_name">Jimmy Page</p>
									<p>Programmer Analyst</p>
									<p>From 14/5/2012 </p>
									<p>To 20/8/2012</p></li>
								<li class="col-xs-12 col-sm-2 col-md-2 col-lg-2 sguideline"><img  src="../../Resources/Images/NA/connections_image1.png" alt=""/>
									<p class="pro_name">Taylor Darton</p>
									<p>Programmer Analyst</p>
									<p>From 14/5/2012 </p>
									<p>To 20/8/2012</p></li>
								<li class="col-xs-12 col-sm-2 col-md-2 col-lg-2 staketest"><img  src="../../Resources/Images/NA/connections_image1.png" alt=""/>
									<p class="pro_name">Ashley  olsen</p>
									<p>Programmer Analyst</p>
									<p>From 14/5/2012 </p>
									<p>To 20/8/2012</p></li>
								<li class="col-xs-12 col-sm-2 col-md-2 col-lg-2 staketest"><img  src="../../Resources/Images/NA/connections_image1.png" alt=""/>
									<p class="pro_name">Taylor Darton</p>
									<p>Programmer Analyst</p>
									<p>From 14/5/2012 </p>
									<p>To 20/8/2012</p></li></li>
								<li class="col-xs-12 col-sm-2 col-md-2 col-lg-2 staketest"><img  src="../../Resources/Images/NA/connections_image1.png" alt=""/>
									<p class="pro_name">Ashley  olsen</p>
									<p>Programmer Analyst</p>
									<p>From 14/5/2012 </p>
									<p>To 20/8/2012</p></li></li>--%>				
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


	    <!-- Start :popup_recommend --> 	
		<div class="col-xs-10 col-sm-6 col-md-4 col-lg-4 popup_recommend" style="display:none;">
			<a href="javascript:;" class="popup_close"></a>
			<div class="clsHeader">
				<h5><strong>Confirmation Message</strong></h5>
				
			</div>
			<div class="clearfix"></div>
			<div class="clsContent">
				<p class="recommend_content">Disclaimer:As a reminder, your participation in this Program confirms that you are aware your project/account
				   info, level, and Outlook details will be provided to your Advisor so that they may contact you accordingly.</p>
				
				<p>I would like my Supervisor to recommend an Advisor.</p>
			</div>	
			<div class="clsFooter">
				<span>
					<input class="clsYes" id="ys_recommend" type="button"/>
					<input class="clsNo" id="no_recommend" type="button"/>
				</span>
			</div>
		</div>	
	    <!-- End : popup_recommend--> 
	
	    <!-- Start : 1st popup_send_request --> 
		<div class="col-xs-10 col-sm-6 col-md-4 col-lg-4 popup_send_request" id="Popup1_send_req" style="display:none;">
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
					<input class="clsYes" id="ys_send_req" type="button"/>
					<input class="clsNo" id="no_send_req" type="button"/>
				</span>
			</div>
		</div>	
	    <!-- End :1st  popup_send_request--> 
	
	    <!-- Start : 2nd popup_send_request --> 
		<div class="col-xs-10 col-sm-6 col-md-4 col-lg-4 popup_send_request" id="Popup2_send"  style="display:none;">
			<div class="clsHeader">
				<h5><strong>Message !</strong></h5>
				<a href="javascript:;" class="popup_close"></a>
			</div>
			<div class="clsContent">
				<p class="recommend_content" id="message"></p>
			</div>	
			<div class="clsFooter">
				<span>
					<input class="clsOk_req" id="success_ok_send" type="button" value="Ok"/>	
				</span>
			</div>
		</div>
	    <!-- End : 2nd popup_send_request--> 
	
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
				<%--	<li>The New Hire Advisor App was an effective tool in locating an appropriate Advisor
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
				  <input class="clsSearch send_fb" type="button" value="Submit" id="OkFeedback"/>
				  <input class="clsReset close_popup" type="button" value="Cancel" data-dismiss="modal" aria-hidden="true"/>
                  <span class="note_txt" id="note_text" style="margin-right:-100px;">*All Questions are mandatory</span>
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
					<input class="clsYes" id="yes_end_connection" type="button"/>
					<input class="clsNo" id="no_end_connection" type="button"/>
				</span>
			</div>
		</div>
        <!-- End :endConnection --> 
			
		<!-- Start : successful_completion --> 		
        <div class="col-xs-10 col-sm-6 col-md-4 col-lg-4 popup_send_request" id="successful_completion" style="display:none;">
			<div class="clsHeader">
				<h5><strong>Confirmation Message</strong></h5>
				<a href="javascript:;" class="popup_close"></a>
			</div>
			<div class="clsContent">
				<p class="recommend_content" id="Send_Feedback">
               <%-- You have successfully submitted your feedback--%>
                </p>
			</div>	
			<div class="clsFooter row" style="text-align:center">
				<input type="button" value="Ok" class="clsSearch submit_fb_confirm"/>
			</div>
		</div>
		<!-- End : successful_completion --> 
		
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
				<input class="clsOk_req" id="clsOk_access" type="button" value="Ok"/>	
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
					<p class="recommend_content">Are you sure to Add Admin!</p>
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
				<p class="recommend_content">You have successfully send buddy request</p>
			</div>	
			<div class="clsFooter">
				<span>
					<input class="clsOk_req" id="Button1" type="button" value="Ok">	
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
					<input class="clsOk_req" id="Button2" type="button" value="Ok">	
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
					<p class="recommend_content">Are you sure to remove Admin!</p>
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
		<div id="Div1" class="modal fade">
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
        <!--assign advisor-->
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
        <%--<div class="row">
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
        </div>--%>
        </div>
      </div>
      <div class="modal-footer">
        <div class="row search_advisor_footer text-center clsForm">
          <input class="btn_orange Send_Recommendations" type="button" value="Send Recommendations" data-dismiss="modal" aria-hidden="true">
          <%--<span class="note_txt">*Select No more than three buddies</span>--%>
          <span class="note_txt" id="RecommendNote"></span>
        </div>
      </div>
    </div>
  </div>
</div>
		<div class="col-xs-10 col-sm-6 col-md-4 col-lg-5 popup_send_request" id="notify_associate"  style="display:none;">
			<div class="clsHeader">
				<h5><strong>Successful !</strong></h5>
				<a href="javascript:;" class="popup_close"></a>
			</div>
			<div class="clsContent">
				<p class="recommend_content">You have successfully sent the notification.</p>
			</div>	
			<div class="clsFooter">
				<span>
					<input class="clsOk_req" id="Button3" type="button" value="Ok">	
				</span>
			</div>
		</div>
		
    <!-- Start : send recommendation  --> 
		<div class="col-xs-10 col-sm-6 col-md-4 col-lg-4 popup_send_request" id="send_recommend"  style="display:none;">
			<div class="clsHeader">
				<h5><strong>Successful !</strong></h5>
				<a href="javascript:;" class="popup_close"></a>
			</div>
			<div class="clsContent">
				<p class="recommend_content" id="recommend_content_valid"></p>
			</div>	
			<div class="clsFooter">
				<span>
					<input class="clsOk_req" type="button" value="Ok">	
				</span>
			</div>
		</div>
        <div class="col-xs-10 col-sm-6 col-md-4 col-lg-4 popup_send_request" id="send_recommend_condn"  style="display:none;">
			<div class="clsHeader">
				<h5><strong>Error !</strong></h5>
				<a href="javascript:;" class="popup_close"></a>
			</div>
			<div class="clsContent">
				<p class="recommend_content" id="recommend_content_invalid"></p>
			</div>	
			<div class="clsFooter">
				<span>
					<input class="clsOk_req" type="button" value="Ok">	
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
    
	<!-- Start : popup decline --> 
		<div class="col-xs-10 col-sm-6 col-md-4 col-lg-4 popup_send_request" id="decline"  style="display:none;">
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
	<!-- End :  popup decline  -->   
		<div class="col-xs-10 col-sm-6 col-md-4 col-lg-4 popup_send_request" id="fill_feedback" style="display:none;">
			<div class="clsHeader">
				<h5><strong>Confirmation Message</strong></h5>
				<a href="javascript:;" class="popup_close"></a>
			</div>
			<div class="clsContent">
				<p class="recommend_content">
                Please provide feedback.
                </p>
			</div>	
			<div class="clsFooter row" style="text-align:center">
				<input type="button" value="Ok" class="clsSearch provide_fb">
			</div>
		</div>        
     
	<div id="autocomplete_admin"></div>
	
	<!----------- SUPERVISOR POPUP starts -------------> 

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
</body>

</html>

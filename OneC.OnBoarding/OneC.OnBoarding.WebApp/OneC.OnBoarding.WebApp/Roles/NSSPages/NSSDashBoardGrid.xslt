<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl"
>
	<xsl:template match="/">
		<html>
			<head>
				<link href="../../Styles/drilldown.css" rel="stylesheet" type="text/css" />
				<script type="text/javascript" src="../../Scripts/JQuery/1.8/indiaonboarding.js"></script>
				<script type="text/javascript" language="javascript"></script>
				<script language="javascript" type="text/javascript" src="../Scripts/jquery-1.4.1.js"></script>
				<script language="javascript" type="text/javascript" >
					window.updateWithNewData = function () {
					location.reload();
					}
				</script>
			</head>
			<body>
				<xsl:variable name="CEFlag" xml:space="preserve">
					<xsl:value-of select="ArrayOfCandidateDetail/CandidateDetail[1]/CEFlag"/>
				</xsl:variable>
				<xsl:variable name="CountryID" xml:space="preserve">
					<xsl:value-of select="ArrayOfCandidateDetail/CandidateDetail[1]/CountryID"/>
				</xsl:variable>
				<xsl:choose>
					<xsl:when test="($CEFlag)=1">
						<div style="width:818px;height:250px;top:0px;left:0px;position:relative; overflow-x:scroll;overflow-y:scroll;padding:0;">
							<table summary="Details about new hire candidates" >

								<tr>
									<th class="sno">S.No.</th>
									<th class="c_name">CandidateName</th>

									<th  class="l_id">
										<xsl:text >LoginId</xsl:text>
									</th>
									<th  class="l_id">
										<xsl:text >AssociateId</xsl:text>
									</th>
									<th
									   class="level">Level</th>
									<th
									  class="doj">DOJ</th>
									<th
									  class="project_id">ProjectID</th>
									<th class="OwniningDepartment">Ownining Department</th>
									<th class="RequestingDept">Requesting Department</th>


									<th
										 class="laptop">Laptop</th>

									<th class="KeyBoard">Keyboard Language</th>

									<th
										 class="blackberry">Blackberry</th>

									<th  class="l_id">
										<xsl:text >Cellphone</xsl:text>
									</th>


									<th  class="l_id">
										<xsl:text >DataCard</xsl:text>
									</th>
									<th  class="l_id">
										<xsl:text >Shipping Location</xsl:text>
									</th>
									<th  class="l_id">
										<xsl:text >Work Location</xsl:text>
									</th>
									<th  class="l_id">
										<xsl:text >ESA Work Location</xsl:text>
									</th>
								</tr>

								<xsl:for-each select="ArrayOfCandidateDetail/CandidateDetail">
									<tr>

										<td>
											<xsl:value-of select="RowNumber"/>
										</td>
										<td class="tdName" >
											<xsl:variable name="CandidateID">
												<xsl:value-of select="CandidateId"/>
											</xsl:variable>

											<a href="#"  OnClick="FetchDrill({$CandidateID});" class="atag">
												<xsl:value-of select="CandidateFName"/>
												<xsl:attribute name="title" >
													<xsl:value-of select="CandidateFName"/>
												</xsl:attribute>
											</a>

										</td>

										<td style="white-space:nowrap">
											<xsl:variable name="LoginId" xml:space="preserve">
                        <xsl:value-of select="LoginId"/>    
                    </xsl:variable>

											<xsl:choose>
												<xsl:when test="(string-length(LoginId)) > 10">
													<xsl:attribute name="title">
														<xsl:value-of select="LoginId"/>
													</xsl:attribute>
													<xsl:value-of select="(substring(LoginId,1,10))"/>
													<xsl:text>..</xsl:text>
												</xsl:when>
												<xsl:otherwise>
													<xsl:value-of select="LoginId"/>
												</xsl:otherwise>
											</xsl:choose>
										</td>
										<td style="white-space:nowrap">
											<xsl:variable name="AssociateId" xml:space="preserve">
                        <xsl:value-of select="AssociateId"/>    
                    </xsl:variable>
											<xsl:value-of select="AssociateId"/>

										</td>
										<td style="white-space:nowrap">
											
											<xsl:variable name="DesignationDesc" xml:space="preserve">
                         <xsl:value-of select="DesignationDesc"/>
                     </xsl:variable>
											<xsl:value-of select="DesignationDesc"/>

										</td>

										<td style="white-space:nowrap">
											<xsl:value-of select="DOJ"/>
										</td>

										<td >
											<xsl:value-of select="ProjectId"/>
										</td>

										<td>
											<xsl:value-of select="OwniningDepartment"/>
										</td>
										<td>
											<xsl:value-of select="RequestingDepartment"/>
										</td>


										<td>
											<xsl:variable name="LaptopRequestStatus" xml:space="preserve">
                        <xsl:value-of select="LaptopRequestStatus"/>    
                    </xsl:variable>

											<xsl:value-of select="LaptopRequestStatus"/>
										</td>

										<td>
											<xsl:variable name="KeyboardLanguage" xml:space="preserve">
									  <xsl:value-of select="KeyBoardLanguage"/>
								  </xsl:variable>
											<xsl:value-of select="KeyBoardLanguage"/>
										</td>

										<td>
											<xsl:variable name="BlackberryRequestStatus" xml:space="preserve">
                        <xsl:value-of select="BlackberryRequestStatus"/>    
                    </xsl:variable>
											<xsl:value-of select="BlackberryRequestStatus"/>

										</td>

										<td>
											<xsl:variable name="CellPhoneRequestStatus" xml:space="preserve">
                              <xsl:value-of select="CellPhoneRequestStatus"/>    
                          </xsl:variable>
											<xsl:value-of select="CellPhoneRequestStatus"/>
										</td>


										<td>
											<xsl:variable name="DataCard" xml:space="preserve">
								  <xsl:value-of select="DataCard"/>
							  </xsl:variable>
											<xsl:value-of select="DataCard"/>
										</td>

										<td>
											<xsl:variable name="ShippinAddress" xml:space="preserve">
								  <xsl:value-of select="ShippingAddress"/>
							  </xsl:variable>
											<xsl:value-of select="ShippingAddress"/>
										</td>
										<td>
											<xsl:variable name="WorkLocation" xml:space="preserve">
								  <xsl:value-of select="WorkLocation"/>
							  </xsl:variable>
											<xsl:value-of select="WorkLocation"/>
										</td>
										<td>
											<xsl:variable name="WorkLocation" xml:space="preserve">
								  <xsl:value-of select="ESAWorkLocation"/>
							  </xsl:variable>
											<xsl:value-of select="ESAWorkLocation"/>
										</td>




									</tr>
								</xsl:for-each>
							</table>
						</div>
					</xsl:when>
					<xsl:when test ="($CountryID)=1 or ($CountryID)=2">
						<div style="width:818px;height:230px;top:0px;left:0px;position:relative; overflow-x:scroll;padding:0;">
							<table summary="Details about new hire candidates" >

								<tr>
									<th class="sno">S.No.</th>
									<th class="c_name">CandidateName</th>
									<th  class="l_id">
										AssociateId
									</th>
									<th
									   class="level">Level</th>
									<th
									  class="doj">DOJ</th>
									<th
									  class="project_id">ProjectID</th>
									<th class="manager_id">ManagerID</th>
									<th
										 class="laptop">Laptop</th>
									<th
										 class="blackberry">Blackberry</th>
									<th  class="l_id">
										Cellphone
									</th>
									<th  class="LGG2">
										LG_G2
									</th>
									<th  class="Q10">
										SamsungNote3
									</th>									
									<th  class="Samsung_S4">
										Samsung_S4
									</th>
									<th  class="Samsung_S5">
										Samsung_S5
									</th>
									<th  class="IPhone_4S">
										IPhone_4S
									</th>
									<th  class="IPhone_5C">
										IPhone_5C
									</th>
									<th  class="IPhone_5S">
										IPhone_5S
									</th>
									<th  class="Z10">
										BlackBerryZ10
									</th>
									<th  class="Q10">
										Q10
									</th>
									<th  class="Samsung_S3">
										Samsung_S3
									</th>

                  <th  class="Samsungnote4">
                    SamsungNote4
                  </th>
                  <th  class="IPhone_6">
                    IPhone_6
                  </th>
                  <th  class="IPhone_6P">
                    IPhone_6+
                  </th>
                  <th  class="LGg3">
                    LG_G3
                  </th>
                  <th  class="Samsungs632GB">
                    Samsung_S6_32GB
                  </th>
                  <th  class="Samsungs664GB">
                    Samsung_S6_64GB
                  </th>
                  <th  class="Samsungs6128GB">
                    Samsung_S6_128GB
                  </th>
                  <th  class="Samsungs6Edge32GB">
                    Samsung_S6_Edge_32GB
                  </th>
                  <th  class="Samsungs6Edge64GB">
                    Samsung_S6_Edge_64GB
                  </th>
                  <th  class="Samsungs6Edge128GB">
                    Samsung_S6_Edge_128GB
                  </th>
                  <th  class="BillingName">
                    BillingName
                  </th>
                  <th  class="BillingAddress">
                    BillingAddress
                  </th>
                  <th  class="BillingPhone">
                    BillingPhone
                  </th>
                  <th  class="BillingWirelessProvider">
                    BillingWirelessProvider
                  </th>
                  <th  class="BillingPassword">
                    BillingPassword
                  </th>
                  <th  class="BillingAccount">
                    BillingAccount
                  </th>
                  <th  class="HireType">
										<xsl:text >HireType</xsl:text>
									</th>


								</tr>

								<xsl:for-each select="ArrayOfCandidateDetail/CandidateDetail">
									<tr>

										<td>
											<xsl:value-of select="RowNumber"/>
										</td>
										<td class="tdName" >
											<xsl:variable name="CandidateID">
												<xsl:value-of select="CandidateId"/>
											</xsl:variable>
											<xsl:choose>
												<xsl:when test="(ERRequestStatus)=2">
													<a href="#"  OnClick="FetchDrill({$CandidateID});" class="atag" style="font-weight:bold;color:red">
														<xsl:value-of select="CandidateFName"/>
														<xsl:attribute name="title" >
															<xsl:value-of select="CandidateFName"/>
														</xsl:attribute>
													</a>
												</xsl:when>
												<xsl:otherwise>
													<a href="#"  OnClick="FetchDrill({$CandidateID});" class="atag">
														<xsl:value-of select="CandidateFName"/>
														<xsl:attribute name="title" >
															<xsl:value-of select="CandidateFName"/>
														</xsl:attribute>
													</a>
												</xsl:otherwise>
											</xsl:choose>
										</td>

										<td style="white-space:nowrap">
											<xsl:variable name="LoginId" xml:space="preserve">
                        <xsl:value-of select="LoginId"/>    
                    </xsl:variable>

											<xsl:choose>
												<xsl:when test="(string-length(LoginId)) > 10">
													<xsl:attribute name="title">
														<xsl:value-of select="LoginId"/>
													</xsl:attribute>
													<xsl:value-of select="(substring(LoginId,1,10))"/>
													<xsl:text>..</xsl:text>
												</xsl:when>
												<xsl:otherwise>
													<xsl:value-of select="LoginId"/>
												</xsl:otherwise>
											</xsl:choose>
										</td>

										<td style="white-space:nowrap">
											
											<xsl:variable name="DesignationDesc" xml:space="preserve">
                         <xsl:value-of select="DesignationDesc"/>
                     </xsl:variable>
											<xsl:value-of select="DesignationDesc"/>

										</td>

										<td style="white-space:nowrap">
											<xsl:value-of select="DOJ"/>
										</td>

										<td >
											<xsl:value-of select="ProjectId"/>
										</td>

										<td >
											<xsl:value-of select="HiringManagerId"/>
										</td>


										<td>
											<xsl:variable name="LaptopRequestStatus" xml:space="preserve">
                        <xsl:value-of select="LaptopRequestStatus"/>    
                    </xsl:variable>

											<xsl:value-of select="LaptopRequestStatus"/>
										</td>

										<td>
											<xsl:variable name="BlackberryRequestStatus" xml:space="preserve">
                        <xsl:value-of select="BlackberryRequestStatus"/>    
                    </xsl:variable>
											<xsl:value-of select="BlackberryRequestStatus"/>

										</td>

										<td>
											<xsl:variable name="CellPhoneRequestStatus" xml:space="preserve">
                              <xsl:value-of select="CellPhoneRequestStatus"/>    
                          </xsl:variable>
											<xsl:value-of select="CellPhoneRequestStatus"/>
										</td>
										<td>
											<xsl:variable name="LGG2" xml:space="preserve">
                                         <xsl:value-of select="LGg2"/>    
                                  </xsl:variable>
											<xsl:value-of select="LGg2"/>

										</td>
										<td>
											<xsl:variable name="SamsungNote3" xml:space="preserve">
                                         <xsl:value-of select="Samsungnote3"/>    
                                  </xsl:variable>
											<xsl:value-of select="Samsungnote3"/>

										</td>										
										<td>
											<xsl:variable name="SamsungS4" xml:space="preserve">
                                         <xsl:value-of select="SamsungS4"/>    
                                  </xsl:variable>
											<xsl:value-of select="SamsungS4"/>

										</td>
										<td>
											<xsl:variable name="SamsungS5" xml:space="preserve">
                                         <xsl:value-of select="SamsungS5"/>    
                                  </xsl:variable>
											<xsl:value-of select="SamsungS5"/>

										</td>
										<td>
											<xsl:variable name="IPhone4S" xml:space="preserve">
                                         <xsl:value-of select="IPhone4S"/>    
                                  </xsl:variable>
											<xsl:value-of select="IPhone4S"/>

										</td>
										<td>
											<xsl:variable name="IPhone5C" xml:space="preserve">
                                         <xsl:value-of select="IPhone5C"/>    
                                  </xsl:variable>
											<xsl:value-of select="IPhone5C"/>

										</td>
										<td>
											<xsl:variable name="IPhone5S" xml:space="preserve">
                                         <xsl:value-of select="IPhone5S"/>    
                                  </xsl:variable>
											<xsl:value-of select="IPhone5S"/>

										</td>
										<td>
											<xsl:variable name="Z10" xml:space="preserve">
                                         <xsl:value-of select="BlackBerryZ10"/>    
                                  </xsl:variable>
											<xsl:value-of select="BlackBerryZ10"/>

										</td>
										<td>
											<xsl:variable name="Q10" xml:space="preserve">
                                         <xsl:value-of select="Q10"/>    
                                  </xsl:variable>
											<xsl:value-of select="Q10"/>

										</td>
										<td>
											<xsl:variable name="SamsungS3" xml:space="preserve">
                                         <xsl:value-of select="SamsungS3"/>    
                                  </xsl:variable>
											<xsl:value-of select="SamsungS3"/>

										</td>

                    <td>
                      <xsl:variable name="Samsungnote4" xml:space="preserve">
                                         <xsl:value-of select="Samsungnote4"/>    
                                  </xsl:variable>
                      <xsl:value-of select="Samsungnote4"/>

                    </td>
                    <td>
                      <xsl:variable name="IPhone6" xml:space="preserve">
                                         <xsl:value-of select="IPhone6"/>    
                                  </xsl:variable>
                      <xsl:value-of select="IPhone6"/>

                    </td>
                    <td>
                      <xsl:variable name="IPhone6P" xml:space="preserve">
                                         <xsl:value-of select="IPhone6P"/>    
                                  </xsl:variable>
                      <xsl:value-of select="IPhone6P"/>

                    </td>
                    <td>
                      <xsl:variable name="LGg3" xml:space="preserve">
                                         <xsl:value-of select="LGg3"/>    
                                  </xsl:variable>
                      <xsl:value-of select="LGg3"/>

                    </td>
                    <td>
                      <xsl:variable name="Samsungs632GB" xml:space="preserve">
                                         <xsl:value-of select="Samsungs632GB"/>    
                                  </xsl:variable>
                      <xsl:value-of select="Samsungs632GB"/>

                    </td>
                    <td>
                      <xsl:variable name="Samsungs664GB" xml:space="preserve">
                                         <xsl:value-of select="Samsungs664GB"/>    
                                  </xsl:variable>
                      <xsl:value-of select="Samsungs664GB"/>

                    </td>
                    <td>
                      <xsl:variable name="Samsungs6128GB" xml:space="preserve">
                                         <xsl:value-of select="Samsungs6128GB"/>    
                                  </xsl:variable>
                      <xsl:value-of select="Samsungs6128GB"/>

                    </td>
                    <td>
                      <xsl:variable name="Samsungs6Edge32GB" xml:space="preserve">
                                         <xsl:value-of select="Samsungs6Edge32GB"/>    
                                  </xsl:variable>
                      <xsl:value-of select="Samsungs6Edge32GB"/>

                    </td>
                    <td>
                      <xsl:variable name="Samsungs6Edge64GB" xml:space="preserve">
                                         <xsl:value-of select="Samsungs6Edge64GB"/>    
                                  </xsl:variable>
                      <xsl:value-of select="Samsungs6Edge64GB"/>

                    </td>
                    <td>
                      <xsl:variable name="Samsungs6Edge128GB" xml:space="preserve">
                                         <xsl:value-of select="Samsungs6Edge128GB"/>    
                                  </xsl:variable>
                      <xsl:value-of select="Samsungs6Edge128GB"/>

                    </td>
                    <td>
                      <xsl:variable name="PortingName" xml:space="preserve">
                                         <xsl:value-of select="PortingName"/>    
                                  </xsl:variable>
                      <xsl:value-of select="PortingName"/>

                    </td>
                    <td>
                      <xsl:variable name="PortingAddress" xml:space="preserve">
                                         <xsl:value-of select="PortingAddress"/>    
                                  </xsl:variable>
                      <xsl:value-of select="PortingAddress"/>

                    </td>
                    <td>
                      <xsl:variable name="PortingPhoneNumber" xml:space="preserve">
                                         <xsl:value-of select="PortingPhoneNumber"/>    
                                  </xsl:variable>
                      <xsl:value-of select="PortingPhoneNumber"/>

                    </td>
                    <td>
                      <xsl:variable name="PortWirelessProvider" xml:space="preserve">
                                         <xsl:value-of select="PortWirelessProvider"/>    
                                  </xsl:variable>
                      <xsl:value-of select="PortWirelessProvider"/>

                    </td>
                    <td>
                      <xsl:variable name="PortPassword" xml:space="preserve">
                                         <xsl:value-of select="PortPassword"/>    
                                  </xsl:variable>
                      <xsl:value-of select="PortPassword"/>

                    </td>
                    <td>
                      <xsl:variable name="PortAccountNumber" xml:space="preserve">
                                         <xsl:value-of select="PortAccountNumber"/>    
                                  </xsl:variable>
                      <xsl:value-of select="PortAccountNumber"/>

                    </td>
										<td>
											<xsl:variable name="HireTypeDes" xml:space="preserve">
                                         <xsl:value-of select="HireTypeDes"/>    
                                  </xsl:variable>
											<xsl:value-of select="HireTypeDes"/>

										</td>
									
				</tr>
								</xsl:for-each>
				</table>
				</div>
					</xsl:when>
					<xsl:otherwise>
            <div style="width:850px;height:230px;top:0px;left:0px;position:relative; overflow-x:scroll;padding:0;">
              <table summary="Details about new hire candidates" >

                <tr>
                  <th class="sno">S.No.</th>
                  <th class="c_name">Candidate Name</th>
                  <!--<xsl:variable name="CountryID" xml:space="preserve">
                <xsl:value-of select="ArrayOfCandidateDetail/CandidateDetail[1]/CountryID"/>				
              </xsl:variable>-->

                  <xsl:choose>
                    <xsl:when test="($CountryID)=4 or ($CountryID)=104">
                      <th  class="l_id">
                        <xsl:text >Login Id</xsl:text>
                      </th>
                    </xsl:when>

                    <xsl:otherwise>
                      <th  class="l_id">
                        <xsl:text >Associate Id</xsl:text>
                      </th>
                    </xsl:otherwise>
                  </xsl:choose>

                  <th
                     class="level">Level</th>
                  <th
                    class="doj">DOJ</th>
                  <th
                    class="project_id">ProjectID</th>


                  <th class="manager_id">ManagerID</th>

                  <xsl:choose>
                    <xsl:when test="($CountryID)=4">
                  <th
                     class="laptop" style="white-space:nowrap;">Laptop issued by cognizant</th>
                    </xsl:when>
                    <xsl:otherwise>
                      <th
                   class="laptop" style="white-space:nowrap;">Laptop</th>
                      </xsl:otherwise>
                  </xsl:choose>
                    <xsl:choose>
                      <xsl:when test="($CountryID)=4">
                    <th
                     class="blackberry" style="white-space:nowrap;">Android Device</th>
                      </xsl:when>
                      <xsl:otherwise>                  
                      <th
                         class="blackberry" style="white-space:nowrap;">BlackBerry</th>
                    </xsl:otherwise>
                  </xsl:choose>
                  <xsl:choose>
                    <xsl:when test="ArrayOfCandidateDetail/CandidateDetail[1]/NSSChosenLocation='True'">
                    </xsl:when>
                    <xsl:otherwise>
                      <th  class="l_id">
                        <xsl:text >Cellphone</xsl:text>
                      </th>
                    </xsl:otherwise>

                  </xsl:choose>
                  <xsl:choose>
                    <xsl:when test="($CountryID)=4 or ($CountryID)=104">
                      <xsl:choose>
                        <xsl:when test="($CountryID)=4">
                          <th  class="clientEquipment" style="white-space:nowrap;">
                            <xsl:text >Client Laptop</xsl:text>
                          </th>
                        </xsl:when>
                      </xsl:choose>
                      <th  class="HireType">
                        <xsl:text >Hire Type</xsl:text>
                      </th>
                    </xsl:when>

                  </xsl:choose>

                </tr>

                <xsl:for-each select="ArrayOfCandidateDetail/CandidateDetail">
                  <tr>

                    <td>
                      <xsl:value-of select="RowNumber"/>
                    </td>
                    <td class="tdName" >
                      <xsl:variable name="CandidateID">
                        <xsl:value-of select="CandidateId"/>
                      </xsl:variable>
                      <xsl:choose>
                        <xsl:when test="(ERRequestStatus)=2">
                          <a href="#"  OnClick="FetchDrill({$CandidateID});" class="atag" style="font-weight:bold;color:red">
                            <xsl:value-of select="CandidateFName"/>
                            <xsl:attribute name="title" >
                              <xsl:value-of select="CandidateFName"/>
                            </xsl:attribute>
                          </a>
                        </xsl:when>
                        <xsl:otherwise>
                          <a href="#"  OnClick="FetchDrill({$CandidateID});" class="atag">
                            <xsl:value-of select="CandidateFName"/>
                            <xsl:attribute name="title" >
                              <xsl:value-of select="CandidateFName"/>
                            </xsl:attribute>
                          </a>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>

                    <td style="white-space:nowrap">
                      <xsl:variable name="LoginId" xml:space="preserve">
                        <xsl:value-of select="LoginId"/>    
                    </xsl:variable>

                      <xsl:choose>
                        <xsl:when test="(string-length(LoginId)) > 10">
                          <xsl:attribute name="title">
                            <xsl:value-of select="LoginId"/>
                          </xsl:attribute>
                          <xsl:value-of select="(substring(LoginId,1,10))"/>
                          <xsl:text>..</xsl:text>
                        </xsl:when>
                        <xsl:otherwise>
                          <xsl:value-of select="LoginId"/>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>

                    <td>

                      <xsl:variable name="DesignationDesc" xml:space="preserve">
                         <xsl:value-of select="DesignationDesc"/>
                     </xsl:variable>
                      <xsl:value-of select="DesignationDesc"/>

                    </td>

                    <td style="white-space:nowrap">
                      <xsl:value-of select="DOJ"/>
                    </td>

                    <td >
                      <xsl:value-of select="ProjectId"/>
                    </td>

                    <td >
                      <xsl:value-of select="HiringManagerId"/>
                    </td>


                    <td>
                      <xsl:variable name="LaptopRequestStatus" xml:space="preserve">
                        <xsl:value-of select="LaptopRequestStatus"/>    
                    </xsl:variable>

                      <xsl:value-of select="LaptopRequestStatus"/>
                    </td>

                    <td>
                      <xsl:variable name="BlackberryRequestStatus" xml:space="preserve">
                        <xsl:value-of select="BlackberryRequestStatus"/>    
                    </xsl:variable>
                      <xsl:value-of select="BlackberryRequestStatus"/>

                    </td>
                    <xsl:choose>
                      <xsl:when test="NSSChosenLocation='True'">
                      </xsl:when>
                      <xsl:otherwise>
                        <td>
                          <xsl:variable name="CellPhoneRequestStatus" xml:space="preserve">
                              <xsl:value-of select="CellPhoneRequestStatus"/>    
                          </xsl:variable>
                          <xsl:value-of select="CellPhoneRequestStatus"/>
                        </td>
                      </xsl:otherwise>
                    </xsl:choose>
                    <!--<xsl:variable name="CountryID" xml:space="preserve">
                            <xsl:value-of select="CountryID"/>
                    </xsl:variable>-->
                    <xsl:choose>

                      <xsl:when test="($CountryID)=4 or ($CountryID)=104">
                        <xsl:choose>
                          <xsl:when test="($CountryID)=4">

                            <td>
                              <xsl:variable name="ClientEquipmentRequestStatus" xml:space="preserve">
                                         <xsl:value-of select="ClientEquipmentRequestStatus"/>    
                                  </xsl:variable>
                              <xsl:value-of select="ClientEquipmentRequestStatus"/>
                              <!--<xsl:choose>
                                <xsl:when test="(string-length(ClientEquipmentRequestStatus)) > 10">
                                  <xsl:attribute name="title">
                                    <xsl:value-of select="ClientEquipmentRequestStatus"/>
                                  </xsl:attribute>
                                  <xsl:value-of select="(substring(ClientEquipmentRequestStatus,1,10))"/>
                                  <xsl:text>..</xsl:text>
                                </xsl:when>
                                <xsl:otherwise>
                                  <xsl:value-of select="ClientEquipmentRequestStatus"/>
                                </xsl:otherwise>
                              </xsl:choose>-->
                            </td>
                          </xsl:when>
                        </xsl:choose>
                        <td>
                          <xsl:variable name="HireTypeDes" xml:space="preserve">
                                         <xsl:value-of select="HireTypeDes"/>    
                                  </xsl:variable>
                          <xsl:value-of select="HireTypeDes"/>

                        </td>
                      </xsl:when>

                    </xsl:choose>
                  </tr>
                </xsl:for-each>
              </table>
            </div>
					</xsl:otherwise>
				</xsl:choose>


			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>

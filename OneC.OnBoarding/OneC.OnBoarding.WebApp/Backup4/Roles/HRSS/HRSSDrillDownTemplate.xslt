<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:asp="remove"
    exclude-result-prefixes="msxsl">
  <xsl:template match="/">
    <html>
      <head>
        <meta http-equiv="x-ua-compatible" content="IE=9" />
        <link href="../../Styles/drilldown.css" rel="stylesheet" type="text/css" />
        <script type="text/javascript" src="../../Scripts/JQuery/1.8/indiaonboarding.js"></script> 
        <script type="text/javascript" language="javascript">
          $(document).ready(function() {onSelection();
          statuschange();
          });

          function onSelection(){
          statuschange();

          }
          function statuschange() {
          if ($("#joiningstatus option:selected").val() == "2") {
          $("#Dojconfirmtxtcomment").show();
          }
          else if ($("#joiningstatus option:selected").val() == "1")
          {
          $("#Dojconfirmtxtcomment").hide();
          }
          else if ($("#joiningstatus option:selected").val() == "-1")
          {
          $("#Dojconfirmtxtcomment").hide();
          }

          }
        </script>
      </head>
      <body>

        <div id="personalDiv" class="reward-profile_details" >
          <!--<div id="personalDiv" class="drill-down_details pd_nss" >-->
          <table width="95%">
            <tr>
              <div class="header_dd" style="height:41px; width:850px;">
                <p>
                  Candidate details view
                </p>
              </div>
              <xsl:for-each select="CandidateTask">
                
                <xsl:variable name="countryCheck">
                  <xsl:choose>
                    <xsl:when test="CountryID!=3">
                      <xsl:value-of select="''"/>
                    </xsl:when>
                    <xsl:otherwise>
                      <xsl:value-of select="'last_li'"/>
                    </xsl:otherwise>
                  </xsl:choose>
                </xsl:variable>
                <xsl:variable name="CandidateType" xml:space="preserve">
                    <xsl:value-of select="CandidateType"/>
                  </xsl:variable>
                <div class="name_dd">
                  <p id="back_dd" onclick="Refreshdata();">
                    &lt;&lt; back to summary page
                  </p>
                  <img src="../../Images/person.png" alt="PersonIcon" />
                  <span>
                    <xsl:value-of select="CandidateFName" />

                    (<xsl:value-of select="CandidateId" />)
                    <input type="hidden" id="hdnCandidateid"  >
                      <xsl:attribute name="value">
                        <xsl:value-of select="CandidateId" />
                      </xsl:attribute>
                    </input>

                    <input type="hidden" id="hdnCountryId"  >
                      <xsl:attribute name="value">
                        <xsl:value-of select="CountryID" />
                      </xsl:attribute>
                    </input>

                  </span>
                </div>

                <div class="personal_details_dd">
                  <div class="pdhead">
                    <p>
                      Personal details
                    </p>
                  </div>

                  <div class="pd_details" style="overflow:scroll;overflow-x: hidden;">
                   
                    <ul class="pdlist">
                      <li class="boldtext">E-mail:</li>
                      <li>
                        <xsl:value-of select="CandidateEmailId" />
                      </li>
                      <li class="boldtext">Telephone:</li>
                      <li>
                        <xsl:value-of select="CandidateMobileNo" />
                      </li>
                      <xsl:variable name="CountryID" xml:space="preserve">
                        <xsl:value-of select="CountryID"/>
                      </xsl:variable>
                      <xsl:variable name="ManilaCountryID" xml:space="preserve">
                          <xsl:value-of select="ManilaCountryId"/>
                        </xsl:variable>
                      <xsl:variable name="ProcessID" xml:space="preserve">
                        <xsl:value-of select="ProcessID"/>
                      </xsl:variable>
                      
                      <xsl:if test="($CountryID)=3">
                        <xsl:if test="($ProcessID)=2">
                          <li class="boldtext">Seat Number/ Location:</li>
                          <li>
                            <xsl:value-of select="CandSeatNo" />
                          </li>
                        </xsl:if>
                      </xsl:if >

                      <li class="boldtext">Hiring Department:</li>
                      <li>
                        <xsl:value-of select="DepartmentName" />
                      </li>
                      <li class="boldtext">Recruiter Name(Id)</li>
                      <li>
                        <xsl:value-of select="RecruiterName" />
                      </li>
                      <li class="boldtext">Associate Id#:</li>
                      <li>
                        <xsl:value-of select="AssociateId" />
                      </li>
                      <li class="boldtext">Joining Date:</li>
                      <li>
                        <xsl:value-of select="CandidateDOJ" />
                      </li>
                   
                      <xsl:choose>
                        <xsl:when test="($CountryID)=number($ManilaCountryID)">
                         </xsl:when>
                        <xsl:otherwise>
                          <li class="boldtext">Convenient time to reach:</li>
                          <li>
                            <xsl:value-of select="ConvenientTime" />
                          </li>
                        </xsl:otherwise>

                      </xsl:choose>
                      <li class="boldtext">Welcome mail status:</li>
                      <li>
                        <xsl:value-of select="WelcomeMailStatus" />
                      </li>
                      <xsl:if test="($CountryID)=3">
                        <li class="boldtext">Photo Upload Status:</li>
                        <li>
                          <xsl:value-of select="FileUploadStatusDesc" />
                        </li>
                      </xsl:if >

                      <xsl:if test="($CountryID)=3">
                        <xsl:if test="($CandidateType)=2">
                          <li class="boldtext">DIM Status:</li>
                          <li>
                            <xsl:value-of select="DimMailerStatus" />
                          </li>
                        </xsl:if>
                      </xsl:if>


                      <xsl:if test="($CountryID)!=3">
                        <li class="boldtext">Asset Status:</li>
                        <xsl:for-each select="/CandidateTask/ArrayOfAssetStatusDC/AssetStatusDC">
                          <li class="boldtext last_li asset_li">
                            <label >
                              <xsl:value-of select="AssetType" />
                            </label>
                            <span style="float:left;">
                              <xsl:value-of select="AssetStatusDesc" />
                            </span>
                            <li class="boldtext last_li asset_li">
                              <label>
                                Comments:
                              </label>
                              <span style="float:left;">
                                <xsl:value-of select="Comments" />
                              </span>
                            </li>
                          </li>
                        </xsl:for-each>
                        <li></li>
                      </xsl:if >


                      <xsl:variable name="ShowUpdateDiv" xml:space="preserve">
                        <xsl:value-of select="ShowUpdateDiv"/>
                      </xsl:variable>
                      <xsl:if test="($ShowUpdateDiv)!=1">
                      </xsl:if>
                    </ul>
                  </div>

                </div>
              </xsl:for-each>

              <div class="new_hire_dd">
                <div class="pdhead">
                  <p>
                    New Hire  tasks
                  </p>
                </div>

                <div class="pd_details">
                  <ul class="new_hire_list" id="new_hire_data">
                    <xsl:for-each select="CandidateTask/ArrayOfTaskDetail/TaskDetail">
                      <xsl:variable name="TaskID">
                        <xsl:value-of select="TaskId"/>
                      </xsl:variable>
                      <xsl:variable name="Url">
                        <xsl:value-of select="RelativeUrl"/>
                      </xsl:variable>
                      <xsl:variable name="GetDoc">
                        <xsl:value-of select="ECMDocumentName"/>
                      </xsl:variable>
                      <xsl:variable name="QueryString">
                        <xsl:value-of select="IsQuerystringrequired"/>
                      </xsl:variable>
                      <xsl:variable name="Overlay">
                        <xsl:value-of select="IsOverlayrequired"/>
                      </xsl:variable>
                      <xsl:variable name="CountryID" xml:space="preserve">
                        <xsl:value-of select="CountryID"/>
                      </xsl:variable>
                      <xsl:variable name="DocumentUploadStatus"  xml:space="preserve">
                        <xsl:value-of select="DocumentUploadStatus"/>
                      </xsl:variable>
                      <xsl:variable name="IsECMEnabled"  xml:space="preserve">
                        <xsl:value-of select="IsECMEnabled"/>
                      </xsl:variable>

                      <li class="boldtext task">
                        <xsl:element name="img">
                          <xsl:attribute name="src">
                            <xsl:value-of select="StatusImage" />
                          </xsl:attribute>
                        </xsl:element>

                        <xsl:choose>
                          <xsl:when test="($IsECMEnabled)=1">
                            <xsl:if test="($DocumentUploadStatus)=1">                         
                              <xsl:choose>
                                <xsl:when test="($CountryID)=1">
                                  <p style="cursor:pointer" ecmDocumentName="{$GetDoc}" onclick="ECM.GetFile(this);">
                                    <xsl:value-of select="Title" />
                                  </p>
                                </xsl:when>
                                <xsl:when test="($CountryID)=2">
                                  <p style="cursor:pointer" ecmDocumentName="{$GetDoc}" onclick="ECM.GetFile(this);">
                                    <xsl:value-of select="Title" />
                                  </p>
                                </xsl:when>
                                <xsl:otherwise>
                                  <xsl:if test="Status &gt; '0' ">
                                    <p style="cursor:pointer" ecmDocumentName="{$GetDoc}" onclick="ECM.GetFile(this);">
                                      <xsl:value-of select="Title" />
                                    </p>
                                  </xsl:if>
                                  <xsl:if test="Status &lt;='0' ">
                                    <p>
                                      <xsl:value-of select="Title" />
                                    </p>
                                  </xsl:if>
                                </xsl:otherwise>
                              </xsl:choose>
                            </xsl:if>
                            <xsl:if test="($DocumentUploadStatus)!=1">
                              <xsl:choose>
                                <xsl:when test="($CountryID)=1">
                                  <p style="cursor:pointer" onclick="OpenPop('{$Url}','{$TaskID}',document.getElementById('hdnCandidateid'),document.getElementById('hdnCountryId'),'{$QueryString}','{$Overlay}');">
                                    <xsl:value-of select="Title" />
                                  </p>
                                </xsl:when>
                                <xsl:when test="($CountryID)=2">
                                  <p style="cursor:pointer" onclick="OpenPop('{$Url}','{$TaskID}',document.getElementById('hdnCandidateid'),document.getElementById('hdnCountryId'),'{$QueryString}','{$Overlay}');">
                                    <xsl:value-of select="Title" />
                                  </p>
                                </xsl:when>
                                <xsl:otherwise>
                                <xsl:if test="Status &gt; '0' ">
                                  <p style="cursor:pointer" onclick="OpenPop('{$Url}','{$TaskID}',document.getElementById('hdnCandidateid'),document.getElementById('hdnCountryId'),'{$QueryString}','{$Overlay}');">
                                    <xsl:value-of select="Title" />
                                  </p>
                                </xsl:if>
                                <xsl:if test="Status &lt;='0' ">
                                  <p>
                                    <xsl:value-of select="Title" />
                                  </p>
                                </xsl:if>
                                </xsl:otherwise>
                              </xsl:choose>
                            </xsl:if>
                            <!--<xsl:choose>
                              <xsl:when test="($CountryID)=1">
                                <p style="cursor:pointer" ecmDocumentName="{$GetDoc}" onclick="ECM.GetFile(this);">
                                  <xsl:value-of select="Title" />
                                </p>
                              </xsl:when>
                              <xsl:when test="($CountryID)=2">
                                <p style="cursor:pointer" ecmDocumentName="{$GetDoc}" onclick="ECM.GetFile(this);">
                                  <xsl:value-of select="Title" />
                                </p>
                              </xsl:when>
                              <xsl:otherwise>
                                <xsl:if test="Status &gt; '0' ">
                                  <p style="cursor:pointer" ecmDocumentName="{$GetDoc}" onclick="ECM.GetFile(this);">
                                    <xsl:value-of select="Title" />
                                  </p>
                                </xsl:if>
                                <xsl:if test="Status &lt;='0' ">
                                  <p>
                                    <xsl:value-of select="Title" />
                                  </p>
                                </xsl:if>
                              </xsl:otherwise>
                            </xsl:choose>-->
                          </xsl:when>
                          <xsl:otherwise>
                            <xsl:choose>
                              <xsl:when test="($CountryID)=1">
                                <p style="cursor:pointer" onclick="OpenPop('{$Url}','{$TaskID}',document.getElementById('hdnCandidateid'),document.getElementById('hdnCountryId'),'{$QueryString}','{$Overlay}');">
                                  <xsl:value-of select="Title" />
                                </p>
                              </xsl:when>
                              <xsl:when test="($CountryID)=2">
                                <p style="cursor:pointer" onclick="OpenPop('{$Url}','{$TaskID}',document.getElementById('hdnCandidateid'),document.getElementById('hdnCountryId'),'{$QueryString}','{$Overlay}');">
                                  <xsl:value-of select="Title" />
                                </p>
                              </xsl:when>
                              <xsl:otherwise>
                                <xsl:if test="Status &gt; '0' ">
                                  <p style="cursor:pointer" onclick="OpenPop('{$Url}','{$TaskID}',document.getElementById('hdnCandidateid'),document.getElementById('hdnCountryId'),'{$QueryString}','{$Overlay}');">
                                    <xsl:value-of select="Title" />
                                  </p>
                                </xsl:if>
                                <xsl:if test="Status &lt;='0' ">
                                  <p>
                                    <xsl:value-of select="Title" />
                                  </p>
                                </xsl:if>
                              </xsl:otherwise>
                            </xsl:choose>
                          </xsl:otherwise>
                        </xsl:choose>

                      </li>
                    </xsl:for-each>
                  </ul>

                  <div id="paginationTask">
                  </div>
                </div>


              </div>

            </tr>
          </table>

          <div class="footer_dd" style="overflow-y:auto;overflow-x: hidden; width:100%">
            <div class="border-dd" >
              <xsl:for-each select="CandidateTask">
                <xsl:variable name="ProcessID" xml:space="preserve">
                      <xsl:value-of select="ProcessID"/>
                    </xsl:variable>
                <xsl:variable name="CountryID" xml:space="preserve">
                <xsl:value-of select="CountryID"/>
                </xsl:variable>
                <xsl:variable name="CandidateType" xml:space="preserve">
                        <xsl:value-of select="CandidateType"/>
                    </xsl:variable>
                <xsl:if test="($ProcessID)!=2">
                  <div style="padding: 0 0 0 0px; float: left; height:60px">
                    E-mail:
                    <div style="padding-top:5px;">
                      <input type="text" id="emailid" class="tbinfo1">
                        <xsl:attribute name="value">
                          <xsl:value-of select="CandidateEmailId" />
                        </xsl:attribute>
                      </input>
                      <input type="hidden" id="hdnEmailId"  >
                        <xsl:attribute name="value">
                          <xsl:value-of select="CandidateEmailId" />
                        </xsl:attribute>
                      </input>
                    </div>
                    <div id="ResendDiv">
                      <input type="checkbox" name="Resend" id="ResendCheckbox" /> Resend Welcome Mail
                      <xsl:if test="($CandidateType)=2">
                        <xsl:if test="($CountryID!=4)">
                        <input type="checkbox" name="ResendDimCheckbox" id="ResendDimCheckbox" /> Resend Dim Mailer
                      </xsl:if>
                      </xsl:if>
                    </div>
                  </div>
                </xsl:if>
              </xsl:for-each>

              <xsl:for-each select="CandidateTask">
                <xsl:variable name="ShowUpdateDiv" xml:space="preserve">
                    <xsl:value-of select="ShowUpdateDiv"/>
                 </xsl:variable>
                <xsl:if test="($ShowUpdateDiv)=1">
                  <div style="padding: 0 0 0 20px; float: left; height:60px">
                    Expected date of joining:
                    <div style="padding-top:5px;">
                      <input type="text"  class="tb_rc1" readonly="readonly" name="Expected date of joining"
                          id="edoj">
                        <xsl:attribute name="value">
                          <xsl:value-of select="CandidateDOJ" />
                        </xsl:attribute>
                      </input>
                    </div>
                  </div>
                </xsl:if>
              </xsl:for-each>

              
              
              <xsl:for-each select="CandidateTask">
                <xsl:variable name="CountryID" xml:space="preserve">
                  <xsl:value-of select="CountryID"/>
                </xsl:variable>
                <xsl:variable name="AssetApproval" xml:space="preserve">
                  <xsl:value-of select="AssetApproval"/>
                </xsl:variable>
                <xsl:variable name="AssetApprovalFlag" xml:space="preserve">
                  <xsl:value-of select="AssetApprovalFlag"/>
                </xsl:variable>
                <xsl:if test="($CountryID)=1">
                  <xsl:if test="($AssetApprovalFlag)=1">
                    <div style="padding: 15px 0 0 10px; float: left; height:60px">
                      <xsl:if test="($AssetApproval)=1">
                        <input type="button" style="background-color:#3399FF;color:#FFFFFF" value="UnsetApprovalFlag" onclick="UpdateAssetApprovalStatus(document.getElementById('hdnCandidateid'),0);" id="update_Status" title="Do you want to stop the processing of an exception asset for this candidate?" />
                      </xsl:if>
                      <xsl:if test="($AssetApproval)!=1">
                        <input type="button" style="background-color:#3399FF;color:#FFFFFF" value="SetApprovalFlag" onclick="UpdateAssetApprovalStatus(document.getElementById('hdnCandidateid'),1);" id="update_Status" title="Do you want to process an asset for this candidate as an exception?" />
                      </xsl:if>
                    </div>
                  </xsl:if>
                  <xsl:if test="($AssetApproval)=1">
                    <div style="padding: 0 0 0 10px; float: left; height:60px">
                      <p style="cursor:pointer;color: #0000FF;text-decoration: underline" onclick="OpenPopForFileUpload(document.getElementById('hdnCandidateid'));">Upload Approval Mail</p>
                    </div>
                  </xsl:if>
                </xsl:if>
                <xsl:if test="($CountryID)=2">
                  <xsl:if test="($AssetApprovalFlag)=1">
                    <div style="padding: 15px 0 0 10px; float: left; height:60px">
                      <xsl:if test="($AssetApproval)=1">
                        <input type="button" style="background-color:#3399FF;color:#FFFFFF" value="UnsetApprovalFlag" onclick="UpdateAssetApprovalStatus(document.getElementById('hdnCandidateid'),0);" id="update_Status" title="Do you want to stop the processing of an exception asset for this candidate?" />
                      </xsl:if>
                      <xsl:if test="($AssetApproval)!=1">
                        <input type="button" style="background-color:#3399FF;color:#FFFFFF" value="SetApprovalFlag" onclick="UpdateAssetApprovalStatus(document.getElementById('hdnCandidateid'),1);" id="update_Status" title="Do you want to process an asset for this candidate as an exception?" />
                      </xsl:if>
                    </div>
                  </xsl:if>
                  <xsl:if test="($AssetApproval)=1">
                    <div style="padding: 0 0 0 10px; float: left; height:60px">
                      <p style="cursor:pointer;color: #0000FF;text-decoration: underline" onclick="OpenPopForFileUpload(document.getElementById('hdnCandidateid'));">Upload Approval Mail</p>
                    </div>
                  </xsl:if>
                </xsl:if>
              </xsl:for-each>

              <xsl:variable name="title">
                <xsl:choose>
                  <xsl:when test="CandidateTask/CandidateOfferStatus!=''">
                    <xsl:value-of select="CandidateTask/CandidateOfferStatus" />
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:value-of select="0" />
                  </xsl:otherwise>
                </xsl:choose>
              </xsl:variable>

              <xsl:if test="CandidateTask/CountryID!=175">
              <xsl:if test="CandidateTask/ArrayOfOfferStatusDC/OfferStatusDC">
                <div style="padding:0 0 0 0px; float:left; margin-bottom: 20px;padding-left: 20px;">
                  Offer status:
                  <div style="padding-top:5px;">
                    <select id = "status" name="status">
                      <xsl:for-each select="CandidateTask/ArrayOfOfferStatusDC/OfferStatusDC">
                        <xsl:choose>
                          <xsl:when test="($title)=OfferStatusCode">
                            <option>
                              <xsl:attribute name="value">
                                <xsl:value-of select="OfferStatusCode" />
                              </xsl:attribute>
                              <xsl:attribute name="selected">
                                selected
                              </xsl:attribute>
                              <xsl:value-of select="OfferStatusDesc"  />
                            </option>
                          </xsl:when>
                          <xsl:otherwise>
                            <option>
                              <xsl:attribute name="value">
                                <xsl:value-of select="OfferStatusCode"/>
                              </xsl:attribute>
                              <xsl:value-of select="OfferStatusDesc" />
                            </option>
                          </xsl:otherwise>
                        </xsl:choose>
                      </xsl:for-each>
                    </select>
                  </div>
                </div>
              </xsl:if>
              </xsl:if>

              <xsl:for-each select="CandidateTask">
                <xsl:variable name="CandidateType" xml:space="preserve">
                    <xsl:value-of select="CandidateType"/>
                </xsl:variable>
                <xsl:variable name="ProcessID" xml:space="preserve">
                      <xsl:value-of select="ProcessID"/>
                    </xsl:variable>
                <xsl:variable name="CountryID" xml:space="preserve">
                      <xsl:value-of select="CountryID"/>
                    </xsl:variable>
                <!--<xsl:variable name="IsAccessAllowed">
                  <xsl:value-of select="IsAccessAllowed"/>
                </xsl:variable>-->

                <xsl:if test="($ProcessID)!=2">
                  <xsl:if test="($CandidateType)=2">
                    <div style="height:60px; padding-left: 20px;">
                      <img src="../../Images/updatebtn.png" title="Update" onclick="UpdateCandidateInfoForCampus(document.getElementById('hdnCandidateid'),document.getElementById('edoj'),document.getElementById('status'),document.getElementById('emailid'),document.getElementById('hdnEmailId'),document.getElementById('ResendCheckbox'),document.getElementById('msg'),document.getElementById('Dimcodestatus'),document.getElementById('JoiningLocationstatus'),document.getElementById('ReportingTime'),document.getElementById('JoiningVenue'),document.getElementById('ResendDimCheckbox'));" id="update_dd" alt="UpdateButton" />
                    </div>
                  </xsl:if>


                  <!--<xsl:if test="($CountryID)=3">
                    <xsl:if test="($IsAccessAllowed)= 'false'">
                      <div style="padding: 0 0 0 0px; float: left;height:60px" id="UnlockAccess">
                        <img src="../../Images/unlockbtn.png" title="Unlock" id="update_dd" alt="UnlockButton"  onclick="UnlockCandidateAccess(document.getElementById('hdnCountryId'),document.getElementById('hdnCandidateid'),document.getElementById('msgunlock'));"/>
                      </div>
                    </xsl:if>
                  </xsl:if>-->
                </xsl:if>
              </xsl:for-each>

              <xsl:variable name="Dimstatus">
                <xsl:choose>
                  <xsl:when test="CandidateTask/CandDIMStatus!=''">
                    <xsl:value-of select="CandidateTask/CandDIMStatus" />
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:value-of select="-1" />
                  </xsl:otherwise>
                </xsl:choose>
              </xsl:variable>

              <xsl:if test="CandidateTask/ArrayOfDimStatusDC/DimStatusDC">
                <div style="padding:4px 0 0 0px; float:left;height:45px;width:150px;clear:both">
                  DOJ Confirmation status:
                  <div style="padding-top:5px;">
                    <select id = "Dimcodestatus" name="Dimcodestatus">
                      <xsl:for-each select="CandidateTask/ArrayOfDimStatusDC/DimStatusDC">
                        <xsl:choose>
                          <xsl:when test="($Dimstatus)=DimStatusCode">
                            <option>
                              <xsl:attribute name="value">
                                <xsl:value-of select="DimStatusCode" />
                              </xsl:attribute>
                              <xsl:attribute name="selected">
                                selected
                              </xsl:attribute>
                              <xsl:value-of select="DimStatusDesc"  />
                            </option>
                          </xsl:when>
                          <xsl:otherwise>
                            <option>
                              <xsl:attribute name="value">
                                <xsl:value-of select="DimStatusCode"/>
                              </xsl:attribute>
                              <xsl:value-of select="DimStatusDesc" />
                            </option>
                          </xsl:otherwise>
                        </xsl:choose>
                      </xsl:for-each>
                    </select>
                  </div>

                </div>
              </xsl:if>

              <xsl:variable name="Location">
                <xsl:choose>
                  <xsl:when test="CandidateTask/CampusJoiningLocation!=''">
                    <xsl:value-of select="CandidateTask/CampusJoiningLocation" />
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:value-of select="-1" />
                  </xsl:otherwise>
                </xsl:choose>
              </xsl:variable>

              <xsl:if test="CandidateTask/ArrayOfLocationDC/LocationDC">
                <div style="padding:4px 0 0 20px; float:left;height:45px">
                  Joining Location:
                  <div style="padding-top:5px;">
                    <select id = "JoiningLocationstatus" name="JoiningLocationstatus">
                      <xsl:for-each select="CandidateTask/ArrayOfLocationDC/LocationDC">
                        <xsl:choose>
                          <xsl:when test="($Location)=LocationCode">
                            <option>
                              <xsl:attribute name="value">
                                <xsl:value-of select="LocationCode" />
                              </xsl:attribute>
                              <xsl:attribute name="selected">
                                selected
                              </xsl:attribute>
                              <xsl:value-of select="LocationDesc"  />
                            </option>
                          </xsl:when>
                          <xsl:otherwise>
                            <option>
                              <xsl:attribute name="value">
                                <xsl:value-of select="LocationCode"/>
                              </xsl:attribute>
                              <xsl:value-of select="LocationDesc" />
                            </option>
                          </xsl:otherwise>
                        </xsl:choose>
                      </xsl:for-each>
                    </select>
                  </div>
                </div>
              </xsl:if>


              <xsl:variable name="ReportingTime">
                <xsl:choose>
                  <xsl:when test="CandidateTask/CampusReportingTime!=''">
                    <xsl:value-of select="CandidateTask/CampusReportingTime" />
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:value-of select="-1" />
                  </xsl:otherwise>
                </xsl:choose>
              </xsl:variable>

              <xsl:if test="CandidateTask/ArrayOfCampusReportingTimeDC/CampusReportingTimeDC">
                <div style="padding:4px 0 0 20px; float:left;height:45px;">
                  Reporting Time:
                  <div style="padding-top:5px;">
                    <select id = "ReportingTime" name="ReportingTime">
                      <xsl:for-each select="CandidateTask/ArrayOfCampusReportingTimeDC/CampusReportingTimeDC">
                        <xsl:choose>
                          <xsl:when test="($ReportingTime)=ReportingTimeDesc">
                            <option>
                              <xsl:attribute name="value">
                                <xsl:value-of select="ReportingTimeDesc" />
                              </xsl:attribute>
                              <xsl:attribute name="selected">
                                selected
                              </xsl:attribute>
                              <xsl:value-of select="ReportingTimeDesc"  />
                            </option>
                          </xsl:when>
                          <xsl:otherwise>
                            <option>
                              <xsl:attribute name="value">
                                <xsl:value-of select="ReportingTimeDesc"/>
                              </xsl:attribute>
                              <xsl:value-of select="ReportingTimeDesc" />
                            </option>
                          </xsl:otherwise>
                        </xsl:choose>
                      </xsl:for-each>
                    </select>
                  </div>
                </div>
              </xsl:if>

              <xsl:for-each select="CandidateTask">
                <xsl:variable name="CandidateType" xml:space="preserve">
                      <xsl:value-of select="CandidateType"/>
                </xsl:variable>
                <xsl:variable name="CountryID" xml:space="preserve">
                <xsl:value-of select="CountryID"/>
                </xsl:variable>
                
                <xsl:variable name="ProcessID" xml:space="preserve">
                      <xsl:value-of select="ProcessID"/>
                </xsl:variable>
                <xsl:if test="($ProcessID)!=2">
                  <xsl:if test="($CandidateType)=2">
                    <xsl:if test="($CountryID)!=4">
                      <div style="padding:4px 0 0 20px; float: left;height:45px">
                        Joining Venue:
                        <div style="padding-top:5px;">
                          <textarea id="JoiningVenue" title="JoiningVenue" class="tbinfo2" style="overflow:auto" rows="4" cols="25">
                            <xsl:value-of select="CampusJoiningVenue"/>
                          </textarea>
                        </div>
                      </div>
                    </xsl:if>
                  </xsl:if>
                </xsl:if>
              </xsl:for-each>

              <xsl:variable name="title1">
                <xsl:choose>
                  <xsl:when test="CandidateTask/CandidateJoiningStatus!=''">
                    <xsl:value-of select="CandidateTask/CandidateJoiningStatus" />
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:value-of select="0" />
                  </xsl:otherwise>
                </xsl:choose>
              </xsl:variable>
           
              <xsl:variable name="CheckCountryID" xml:space="preserve">
                  <xsl:value-of select="CandidateTask/CountryID"/>
            </xsl:variable>
              <xsl:if test="CheckCountryID=3">
                <xsl:if test="CandidateTask/ArrayOfJoiningStatusDC/JoiningStatusDC">
                  <div style=" float:left; margin-bottom: 20px;  width: 95%;">
                    Joining status:
                    <div style="padding-top:5px;">
                      <select id = "status" name="status">
                        <xsl:for-each select="CandidateTask/ArrayOfJoiningStatusDC/JoiningStatusDC">
                          <xsl:choose>
                            <xsl:when test="($title1)=JoiningStatusCode">
                              <option>
                                <xsl:attribute name="value">
                                  <xsl:value-of select="JoiningStatusCode" />
                                </xsl:attribute>
                                <xsl:attribute name="selected">
                                  selected
                                </xsl:attribute>
                                <xsl:value-of select="JoiningStatusDesc"  />
                              </option>
                            </xsl:when>
                            <xsl:otherwise>
                              <option>
                                <xsl:attribute name="value">
                                  <xsl:value-of select="JoiningStatusCode"/>
                                </xsl:attribute>
                                <xsl:value-of select="JoiningStatusDesc" />
                              </option>
                            </xsl:otherwise>
                          </xsl:choose>
                        </xsl:for-each>
                      </select>
                    </div>
                  </div>
                </xsl:if>
              </xsl:if>
              <!--CandidateDOJ-->
              <xsl:variable name="title2">
                <xsl:choose>
                  <xsl:when test="CandidateTask/CandidateJoiningStatus!=''">
                    <xsl:value-of select="CandidateTask/CandidateJoiningStatus" />
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:value-of select="-1" />
                  </xsl:otherwise>
                </xsl:choose>
              </xsl:variable>

              <xsl:variable name="CheckDOJConfirm" xml:space="preserve">
                    <xsl:value-of select="CandidateTask/CurrentDate"/>
              </xsl:variable>
              <xsl:variable name="CandJoiningToday" xml:space="preserve">
                    <xsl:value-of select="CandidateTask/Today"/>
              </xsl:variable>

              <xsl:if test="($CheckDOJConfirm)=1">
                <xsl:if test="($CandJoiningToday)=1">
                  <!--show Joining status-->
                  <xsl:if test="CandidateTask/ArrayOfJoiningStatusDC/JoiningStatusDC">
                    <div style="width:48%; margin-left:5px; float:left">
                      Joining status:
                      <div style="padding-top:5px;">
                        <select style="width:24%;" id="joiningstatus" name="joiningstatus"  onchange="onSelection()">
                          <xsl:for-each select="CandidateTask/ArrayOfJoiningStatusDC/JoiningStatusDC">
                            <xsl:choose>
                              <xsl:when test="($title2)=JoiningStatusCodeNA">
                                <option>
                                  <xsl:attribute name="value">
                                    <xsl:value-of select="JoiningStatusCodeNA" />
                                  </xsl:attribute>
                                  <xsl:attribute name="selected">
                                    selected
                                  </xsl:attribute>
                                  <xsl:value-of select="JoiningStatusDescNA"  />
                                </option>
                              </xsl:when>
                              <xsl:otherwise>
                                <option>
                                  <xsl:attribute name="value">
                                    <xsl:value-of select="JoiningStatusCodeNA"/>
                                  </xsl:attribute>
                                  <xsl:value-of select="JoiningStatusDescNA" />
                                </option>
                              </xsl:otherwise>
                            </xsl:choose>
                          </xsl:for-each>
                        </select>
                        <xsl:for-each select="CandidateTask">

                          <input type="text" id="Dojconfirmtxtcomment" class="tbinfo1" style="width:250px" maxlength="250">
                            <xsl:attribute name="value">
                              <xsl:value-of select="RCComment" />
                            </xsl:attribute>
                          </input>
                        </xsl:for-each>

                      </div>
                    </div>
                  </xsl:if>
                </xsl:if>
              </xsl:if>
              <xsl:for-each select="CandidateTask">
                <xsl:variable name="ProcessID" xml:space="preserve">
                      <xsl:value-of select="ProcessID"/>
                    </xsl:variable>
                <xsl:variable name="CountryID" xml:space="preserve">
                      <xsl:value-of select="CountryID"/>
                    </xsl:variable>
                <xsl:variable name="CandidateType" xml:space="preserve">
                      <xsl:value-of select="CandidateType"/>
                    </xsl:variable>
                <xsl:variable name="CandidateDOJ" xml:space="preserve">
                    <xsl:value-of select="CandidateDOJ"/>
                </xsl:variable>
                <xsl:variable name="CurrentDate" xml:space="preserve">
                    <xsl:value-of select="CurrentDate"/>
                </xsl:variable>
               
                <xsl:variable name="JoingStatus" xml:space="preserve">
                    <xsl:value-of select="JoingStatus"/>
                </xsl:variable>
                <xsl:variable name="IsAccessAllowed">
                  <xsl:value-of select="IsAccessAllowed"/>
                </xsl:variable>

                <!--show Joining status-->
                <xsl:if test="($CurrentDate)=1">
                  <!--NA DOJ Confirm-->
                  <xsl:if test="($CountryID)=1">
                    <div style=" float: right; width: 37%; height:30px; padding-top:17px;">
                      <input type="button" style="background-color:#3399FF;color:#FFFFFF" value="Confirm DOJ" title="Confirm DOJ" onclick="DOJConfirm(document.getElementById('hdnCandidateid'));" id="dojconfirm" alt="Confirm DOJ" />
                    </div>
                  </xsl:if>
                  <!--NA DOJ Confirm-->
                  <xsl:if test="($CountryID)=2">
                    <div style=" float: right; width: 37%; height:30px; padding-top:17px;">
                      <input type="button" style="background-color:#3399FF;color:#FFFFFF" value="Confirm DOJ" title="Confirm DOJ" onclick="DOJConfirm(document.getElementById('hdnCandidateid'));" id="dojconfirm" alt="Confirm DOJ" />
                    </div>
                  </xsl:if>
                </xsl:if>

                <xsl:if test="($CandidateType)!=2">
                  <div style="float: left;margin-left:1px; padding-right:20px;">
                    <img src="../../Images/updatebtn.png" title="Update" onclick="UpdateCandidateInfo(document.getElementById('hdnCandidateid'),document.getElementById('edoj'),document.getElementById('status'),document.getElementById('emailid'),document.getElementById('hdnEmailId'),document.getElementById('ResendCheckbox'),document.getElementById('msg'),document.getElementById('joiningstatus'),document.getElementById('Dojconfirmtxtcomment'));" id="update_dd" alt="UpdateButton" />
                  </div>
                </xsl:if>

                <xsl:if test="($ProcessID)=2">
                  <xsl:if test="($CountryID)=3">
                    <div style="padding:15px 0 0 5px; float: left;">
                      <img src="../../Images/updatebtn.png" title="Update" onclick="UpdateCandidateJoiningStatusDetails(document.getElementById('hdnCandidateid'),document.getElementById('status'),document.getElementById('msg'));" id="update_dd" alt="UpdateButton" />
                    </div>
                  </xsl:if>
                </xsl:if>
                <xsl:if test="($CountryID)=3">
                  <xsl:if test="($IsAccessAllowed)= 'false'">
                    <div style="padding: 0 0 0 0px; float: left;height:60px;margin-left: -10px;" id="UnlockAccess">
                      <img src="../../Images/unlockbtn.png" title="Unlock" id="update_dd" alt="UnlockButton"  onclick="UnlockCandidateAccess(document.getElementById('hdnCountryId'),document.getElementById('hdnCandidateid'),document.getElementById('msgunlock'));"/>
                    </div>
                  </xsl:if>
                </xsl:if>
                <xsl:if test="($CandidateType)!=2">
                  <div id="msg" style="padding:67px 0 0 280px;color:red;font-weight:bold;height:10px;width:150px;clear:both;Display:none">Updated Successfully</div>
                  <div id="msgunlock" style="padding:0 0 0 280px;color:red;font-weight:bold;height:10px;clear:both;Display:none">Unlocked Successfully</div>
                </xsl:if>
                <xsl:if test="($CandidateType)=2">
                  <div id="msg" style="padding:67px 0 0 280px;color:red;font-weight:bold;height:10px;width:150px;clear:both;Display:none">Updated Successfully</div>
                  <div id="msgunlock" style="padding:0 0 0 280px;color:red;font-weight:bold;height:10px;clear:both;Display:none">Unlocked Successfully</div>
                </xsl:if>
              </xsl:for-each>
            </div>
          </div>
        </div>
        <script src="../../Scripts/ECM.js" type="text/javascript" charset="utf-8">
        </script>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

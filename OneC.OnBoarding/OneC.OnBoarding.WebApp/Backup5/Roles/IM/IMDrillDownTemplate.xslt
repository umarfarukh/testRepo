<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl"
>
  <xsl:template match="/">
    <html>
      <head>
        <link href="../../Styles/drilldown.css" rel="stylesheet" type="text/css" />
        <script type="text/javascript" src="../../Scripts/JQuery/1.8/indiaonboarding.js"></script>
        <script type="text/javascript" language="javascript">


        </script>
      </head>
      <body>

        <div id="personalDiv" class="reward-profile_details" >
          <table width="95%">
            <tr>
              <div class="header_dd" style="height:41px; width:850px;">
                <p>
                  Candidate details view
                </p>
              </div>
              <xsl:for-each select="CandidateTask">


                <div class="name_dd">
                  <p id="back_dd">
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

                  <div class="pd_details">
                    <ul class="pdlist pdlist_IM">
                      <li class="boldtext">E-mail:</li>
                      <li>
                        <xsl:value-of select="CandidateEmailId" />
                      </li>
                      <li class="boldtext">Telephone:</li>
                      <li>
                        <xsl:value-of select="CandidateMobileNo" />
                      </li>

                      <li class="addressLi">
                        <span class="boldtext" style="width:36%;">Address:</span>
                        <span style="width:54%;">
                        <xsl:value-of select="CandidateAddress" />
                        </span>
                      </li>

                      <li class="boldtext">Level of Hire:</li>
                      <li>
                        <xsl:value-of select="LevelOfHire" />
                      </li>

                      <li class="boldtext">Hiring Department:</li>
                      <li>
                        <xsl:value-of select="DepartmentName" />
                      </li>
                      <li class="boldtext">Recruiter Id</li>
                      <li>
                        <xsl:value-of select="RecruiterName" />
                      </li>
                      <li class="boldtext">Associate Id#:</li>
                      <li>
                        <xsl:value-of select="AssociateID" />
                      </li>

                      <xsl:if test="ConvenientTime !='null'">
                        <li class="boldtext">Convenient time to reach:</li>
                        <li>
                          <xsl:value-of select="ConvenientTime" />
                        </li>
                      </xsl:if>
                      <li class="boldtext last_li">Welcome mail status:</li>
                      <li class="last_li">
                        <xsl:value-of select="WelcomeMailStatus" />
                      </li>

                      <xsl:if test="CandSeatNo !='null'">

                        <li class="boldtext last_li">Seat Number / Location:</li>
                        <li class="last_li">
                          <xsl:value-of select="CandSeatNo" />
                        </li>
                      </xsl:if>
                      <!--<li class="boldtext last_li">Training Date:</li>
                      <li class="last_li">
                        <xsl:value-of select="CandidateDOJ" />
                      </li>-->
                    
                    </ul>
                  </div>

                </div>
              </xsl:for-each>

              

            </tr>
          </table>
          <div class="footer_dd">
            <div class="border-dd">
    

              <xsl:variable name="title">
                <xsl:choose>
                  <xsl:when test="CandidateTask/TrainingId!=''">
                    <xsl:value-of select="CandidateTask/TrainingId" />
                  </xsl:when>                                 
                  <xsl:otherwise>
                    <xsl:value-of select="0" />
                  </xsl:otherwise>
                </xsl:choose>
              </xsl:variable>
              <!--<input type="textbox"  class="tbinfo" name="Expected date of joining"
                           id="edoj">
                  <xsl:attribute name="value">
                    <xsl:value-of select="$title" />
                  </xsl:attribute>
                </input>-->
              <xsl:if test="CandidateTask/ArrayOfNewHireTrainingDC/NewHireTrainingDC">
                <div style="padding:0 0 0 20px; float:left">
                  Induction Date:
                  <div style="padding-top:5px;">
                    <select id = "status" name="status">
                      <xsl:for-each select="CandidateTask/ArrayOfNewHireTrainingDC/NewHireTrainingDC">
                        <xsl:choose>
                          <xsl:when test="($title)=TrainingId">
                            <option>
                              <xsl:attribute name="value">
                                <xsl:value-of select="TrainingId" />
                              </xsl:attribute>
                              <xsl:attribute name="selected">
                                selected
                              </xsl:attribute>
                              <xsl:value-of select="TrainingScheduledDate"  />
                            </option>
                          </xsl:when>
                          <xsl:otherwise>
                            <option>
                              <xsl:attribute name="value">
                                <xsl:value-of select="TrainingId"/>
                              </xsl:attribute>
                              <xsl:value-of select="TrainingScheduledDate" />
                            </option>
                          </xsl:otherwise>
                        </xsl:choose>
                      </xsl:for-each>
                    </select>
                  </div>
                </div>
              </xsl:if>
              <xsl:for-each select="CandidateTask">

              
                <div style="padding: 0 0 0 20; float: left;margin-top:-12px;">
                    <img src="../../Images/updatebtn.png" title="Update" onclick="UpdateDateFromDrillDown(document.getElementById('status').value,1,document.getElementById('hdnCandidateid').value);" id="update_dd" alt="UpdateButton" />
                  </div>
                
                <xsl:choose>
                  <xsl:when test="Tasksubstatus=1">
                    <div style="padding: 0 0 0 20; float: left;margin-top:4px;margin-left:10px;">
                      <img src="../../Images/unregister.png" title="Unregister" style="cursor:pointer;"
                      onclick="RemoveFromInd(0,4,document.getElementById('hdnCandidateid').value);" 
                      id="remove_bt" alt="RemoveButton" />
                    </div>    
                  </xsl:when>                  
                </xsl:choose>
                
              
                <div id="msg" style="padding:70px 0 0 300px;width:100%;color:red;font-weight:bold;Display:none">Updated Successfully</div>
              </xsl:for-each>
             
            </div>
          </div>
          
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

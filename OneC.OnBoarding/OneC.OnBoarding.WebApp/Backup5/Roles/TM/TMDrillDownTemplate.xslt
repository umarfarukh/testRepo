<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt"
    exclude-result-prefixes="msxsl">
  <xsl:template match="/">
    <html>
      <head>
        <link href="../../Styles/drilldown.css" rel="stylesheet" type="text/css" />
        <script type="text/javascript" src="../../Scripts/JQuery/1.8/indiaonboarding.js"></script>
      </head>
      <body>

        <div id="personalDiv" class="reward-profile_details" >
          <table width="95%">
            <tr>
              <div class="header_dd" style="height:41px; width:850px;">
                <p>
                  Associate detail view
                </p>
              </div>
              <xsl:for-each select="CandidateTask">
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
                      <li class="boldtext">EmployeeId:</li>
                      <li>
                        <xsl:value-of select="LoginId" />
                      </li>
                      <li class="boldtext">EmployeeName:</li>
                      <li>
                        <xsl:value-of select="AssociateName" />
                      </li>
                      <li class="boldtext">E-mail:</li>
                      <li>
                        <xsl:value-of select="CandidateEmailId" />
                      </li>
                      <li class="boldtext">DOJ:</li>
                      <li>
                        <xsl:value-of select="CandidateDOJ" />
                      </li>
                      <li class="boldtext">DepartmentDescription:</li>
                      <li>
                        <xsl:value-of select="DepartmentName" />
                      </li>
                      <li class="boldtext">JobCode:</li>
                      <li>
                        <xsl:value-of select="Jobcode" />
                      </li>
                      <li class="boldtext">JobDescription:</li>
                      <li>
                        <xsl:value-of select="JobDescription" />
                      </li>
                      <li class="boldtext">GradeDescription:</li>
                      <li>
                        <xsl:value-of select="GradeDescription" />
                      </li>
                      <li class="boldtext">Location:</li>
                      <li>
                        <xsl:variable name="CountryID" xml:space="preserve">
                          <xsl:value-of select="CountryID"/>
                        </xsl:variable>
                        <xsl:if test="($CountryID)=3">
                          <xsl:value-of select="CityName"/>
                        </xsl:if >
                        <xsl:if test="($CountryID)!=3">
                          <xsl:value-of select="StateDescription"/>
                        </xsl:if >
                        <!--<xsl:value-of select="CityName" />-->
                      </li>
                      <li class="boldtext">Region:</li>
                      <li>
                        <xsl:value-of select="CountryName" />
                      </li>
                      <li class="boldtext">Gender:</li>
                      <li>
                        <xsl:value-of select="Gender" />
                      </li>
                     
                   </ul>
                  </div>

                </div>
              

              <div class="new_hire_dd">
                <div class="pdhead">
                  <p>
                    <!--New Hire  tasks-->
                  </p>
                </div>

                <div class="pd_details">
                  <ul class="pdlist">
                    <li class="boldtext">SupervisorId:</li>
                    <li>
                      <xsl:value-of select="SupervisorId" />
                    </li>
                    <li class="boldtext">SupervisorName:</li>
                    <li>
                      <xsl:value-of select="SupervisorName" />
                    </li>
                  </ul>

                  <!--<div id="paginationTask"> 
                  </div>-->
                </div>
              </div>
              </xsl:for-each>
            </tr>
          </table>

          <div class="footer_dd">
            <div class="border-dd">
              <xsl:for-each select="CandidateTask">
                <xsl:variable name="ProcessID" xml:space="preserve">
                  <xsl:value-of select="ProcessID"/>
                </xsl:variable>
                <xsl:if test="($ProcessID)=1">
                  <div style="padding: 0 0 0 20px; float: left">
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

                    </div>
                  </div>
                </xsl:if>
              </xsl:for-each>

              <!--<xsl:for-each select="CandidateTask">
                <xsl:variable name="ShowUpdateDiv" xml:space="preserve">
                    <xsl:value-of select="ShowUpdateDiv"/>
                 </xsl:variable>
                <xsl:if test="($ShowUpdateDiv)=1">
                  <div style="padding: 0 0 0 20px; float: left">
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
              </xsl:for-each>-->

              <!--<xsl:variable name="title">
                <xsl:choose>
                  <xsl:when test="CandidateTask/CandidateOfferStatus!=''">
                    <xsl:value-of select="CandidateTask/CandidateOfferStatus" />
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:value-of select="0" />
                  </xsl:otherwise>
                </xsl:choose>
              </xsl:variable>-->

              <!--<xsl:if test="CandidateTask/ArrayOfOfferStatusDC/OfferStatusDC">
                <div style="padding:0 0 0 20px; float:left">
                  Offer status
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
              </xsl:if>-->

              <!--<xsl:variable name="title1">
                <xsl:choose>
                  <xsl:when test="CandidateTask/CandidateJoiningStatus!=''">
                    <xsl:value-of select="CandidateTask/CandidateJoiningStatus" />
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:value-of select="0" />
                  </xsl:otherwise>
                </xsl:choose>
              </xsl:variable>-->
             
            </div>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl"
>


  <xsl:template match="/">
    <html>
      <head>
        <link href="../../Styles/drilldown.css" rel="stylesheet" type="text/css" />
        <script type="text/javascript" src="../../Scripts/JQuery/1.8/indiaonboarding.js"></script>

      </head>
      <body>
        <table summary="Details about new hire candidates">
          <tr>
            <th class="sno">S no.</th>

            <th
              class="l_id" >Candidate Id</th>

            <xsl:variable name="CountryID" xml:space="preserve">
                <xsl:value-of select="ArrayOfCandidateDetail/CandidateDetail[1]/CountryID"/>
              </xsl:variable>

            <xsl:choose>
              <xsl:when test="($CountryID)=4">
                <th  class="AssociateId">
                  <xsl:text>Associate Id</xsl:text>
                </th>
              </xsl:when>

            </xsl:choose>

            <th class="c_name">Candidate Name</th>
            <xsl:choose>
              <xsl:when test="($CountryID)=4">
                <th  class="EmergencyContactNo">
                  <xsl:text>Emergency Contact No</xsl:text>
                </th>
              </xsl:when>
            </xsl:choose>
            <!--<th
                class="r_name">Emergency Contact No</th>-->
            <xsl:choose>
              <xsl:when test="($CountryID)=4">
                <th  class="DeliveryAddress">
                  <xsl:text>Delivery Address</xsl:text>
                </th>
              </xsl:when>
            </xsl:choose>
            <xsl:choose>
              <xsl:when test="($CountryID)=104">
                <th  class="DeliveryAddress">
                  <xsl:text>Delivery Address</xsl:text>
                </th>
              </xsl:when>
            </xsl:choose>
            <!--<th
               class="r_name">Delivery Address</th>-->
            <th
               class="r_name">Work Location</th>
            <!--<th
              class="o_status">Offer Status</th>-->
            <th
              class="doj">DOJ</th>
            <th
               class="p_work">Upload Status</th>
            <!--<xsl:choose>
              <xsl:when test="($CountryID)=4">
                <th  class="p_work">
                  <xsl:text >Update Print Statu</xsl:text>
                </th>
              </xsl:when>
            </xsl:choose>-->


          </tr>

          <xsl:for-each select="ArrayOfCandidateDetail/CandidateDetail">
            <!--<xsl:variable name="CountryID" xml:space="preserve">
                <xsl:value-of select="ArrayOfCandidateDetail/CandidateDetail[1]/CountryID"/>
             </xsl:variable>-->
            <tr>
              <td style="text-align:center;width:8px" >
                <xsl:value-of select="RowNumber"/>
              </td>

              <td class="tdName">


                <xsl:variable name="Status">
                  <xsl:value-of select="Status"/>
                </xsl:variable>
                <xsl:variable name="CandidateId">
                  <xsl:value-of select="CandidateId"/>
                </xsl:variable>

                <!--<input type="hidden" id="hdnCandidateid"  >
                  <xsl:attribute name="value">
                    <xsl:value-of select="CandidateId" />
                  </xsl:attribute>
                </input>

                <input type="hidden" id="hdnCountryid"  >
                  <xsl:attribute name="value">
                    -->
                <!--<xsl:value-of select="CountryID" />-->
                <!--
                    <xsl:value-of select="CountryID" />
                  </xsl:attribute>
                </input>-->

                <xsl:variable name="CountryID">
                  <xsl:value-of select="CountryID"/>
                </xsl:variable>
                <xsl:variable name="TaskId">
                  <xsl:value-of select="TaskId"/>
                </xsl:variable>
                <!--<xsl:if test="Status='0' or Status='3' or Status='6' ">-->

                <!--</xsl:if>-->
                <xsl:if test="CountryID !='4'">
                  <xsl:if test="CountryID !='193'">
                    <xsl:if test="CountryID !='156'">
                      <xsl:if test="CountryID !='175'">
                        <xsl:if test="CountryID !='104'">
                          <xsl:if test="CountryID !='20'">
                            <xsl:if test="CountryID !='165'">
                              <xsl:if test="CountryID !='13'">
                                <xsl:if test="CountryID !='215'">
                                  <xsl:if test="CountryID !='96'">
                                    <xsl:if test="CountryID !='190'">
                                      <xsl:if test="Status='4'">
                                        <p>
                                          <label>
                                            <xsl:value-of select="CandidateId" />
                                          </label>
                                        </p>
                                      </xsl:if>
                                      <!--<xsl:if test="Status!='4' and Status!='8'">-->
                                      <xsl:if test="Status!='4'">
                                        <a href="#" onclick="OpenDrillPop('{$CandidateId}','{$CountryID}','{$TaskId}');">
                                          <xsl:value-of select="CandidateId" />
                                        </a>
                                      </xsl:if>
                                    </xsl:if>
                                  </xsl:if>
                                </xsl:if>
                              </xsl:if>
                            </xsl:if>
                          </xsl:if>
                        </xsl:if>
                      </xsl:if>
                    </xsl:if>
                  </xsl:if>
                  <xsl:if test="CountryID ='193'">
                    <a href="#" onclick="OpenDrillPop('{$CandidateId}','{$CountryID}','{$TaskId}');">
                      <xsl:value-of select="CandidateId" />
                    </a>
                  </xsl:if>
                  <xsl:if test="CountryID ='156'">
                    <a href="#" onclick="OpenDrillPop('{$CandidateId}','{$CountryID}','{$TaskId}');">
                      <xsl:value-of select="CandidateId" />
                    </a>
                  </xsl:if>
                  <xsl:if test="CountryID ='175'">
                    <a href="#" onclick="OpenDrillPop('{$CandidateId}','{$CountryID}','{$TaskId}');">
                      <xsl:value-of select="CandidateId" />
                    </a>
                  </xsl:if>
                  <xsl:if test="CountryID ='104'">
                    <a href="#" onclick="OpenDrillPop('{$CandidateId}','{$CountryID}','{$TaskId}');">
                      <xsl:value-of select="CandidateId" />
                    </a>
                  </xsl:if>
                  <xsl:if test="CountryID ='20'">
                    <a href="#" onclick="OpenDrillPop('{$CandidateId}','{$CountryID}','{$TaskId}');">
                      <xsl:value-of select="CandidateId" />
                    </a>
                  </xsl:if>
                  <xsl:if test="CountryID ='165'">
                    <a href="#" onclick="OpenDrillPop('{$CandidateId}','{$CountryID}','{$TaskId}');">
                      <xsl:value-of select="CandidateId" />
                    </a>
                  </xsl:if>
                  <xsl:if test="CountryID ='13'">
                    <a href="#" onclick="OpenDrillPop('{$CandidateId}','{$CountryID}','{$TaskId}');">
                      <xsl:value-of select="CandidateId" />
                    </a>
                  </xsl:if>
                  <xsl:if test="CountryID ='215'">
                    <a href="#" onclick="OpenDrillPop('{$CandidateId}','{$CountryID}','{$TaskId}');">
                      <xsl:value-of select="CandidateId" />
                    </a>
                  </xsl:if>
                  <xsl:if test="CountryID ='96'">
                    <a href="#" onclick="OpenDrillPop('{$CandidateId}','{$CountryID}','{$TaskId}');">
                      <xsl:value-of select="CandidateId" />
                    </a>
                  </xsl:if>
                  <xsl:if test="CountryID ='190'">
                    <a href="#" onclick="OpenDrillPop('{$CandidateId}','{$CountryID}','{$TaskId}');">
                      <xsl:value-of select="CandidateId" />
                    </a>
                  </xsl:if>

                </xsl:if>
                <xsl:if test="CountryID ='4'">
                  <!--<xsl:if test="Status!='4'">-->
                  <a href="#" onclick="OpenDrillPop('{$CandidateId}','{$CountryID}','{$TaskId}');">
                    <xsl:value-of select="CandidateId" />
                  </a>
                  <!--</xsl:if>-->
                </xsl:if>


              </td>


              <xsl:variable name="CountryID" xml:space="preserve">
                <xsl:value-of select="ArrayOfCandidateDetail/CandidateDetail[1]/CountryID"/>
              </xsl:variable>
              <!--<xsl:choose>-->
              <xsl:if test="CountryID='4'">
                <td style="white-space:nowrap">
                  <xsl:value-of select="AssociateId"/>
                </td>
              </xsl:if>
              <!--</xsl:choose>-->
              <!--<td style="white-space:nowrap">
                  <xsl:value-of select="AssociateId"/>
                </td>-->


              <td style="white-space:nowrap">

                <xsl:value-of select="Name"/>


                <!--</xsl:variable>-->

                <!--<xsl:value-of  select="DesignationDesc"/>-->

              </td>
              <xsl:if test="CountryID='4'">
                <td style="white-space:nowrap">
                  <xsl:value-of select="CandidateMobileNo"/>
                </td>
              </xsl:if>
              <!--<xsl:choose>
                <xsl:when test="($CountryID)=4">
                  <td>
                    <xsl:variable name="CandidateMobileNo" xml:space="preserve">
                                   <xsl:value-of select="CandidateMobileNo"/>    
                            </xsl:variable>
                    <xsl:value-of select="CandidateMobileNo"/>
                  </td>
                </xsl:when>
              </xsl:choose>-->
              <!--<td style="white-space:nowrap">
                <xsl:value-of select="CandidateMobileNo"/>
              </td>-->


              <xsl:choose>
                <xsl:when test="CountryID='4'">
                  <td style="white-space:nowrap">
                    <xsl:variable name="ShippingAddress" xml:space="preserve">
                <xsl:value-of select="ShippingAddress"/>
              
              </xsl:variable>

                    <xsl:choose>
                      <xsl:when test="(string-length(ShippingAddress)) > 14">
                        <xsl:attribute name="title">

                          <xsl:value-of select="ShippingAddress"/>
                        </xsl:attribute>
                        <xsl:value-of select="(substring(ShippingAddress,1,14))"/>
                        <xsl:text>..</xsl:text>
                      </xsl:when>
                      <xsl:otherwise>
                        <xsl:value-of select="ShippingAddress"/>
                      </xsl:otherwise>
                    </xsl:choose>
                    <!--</xsl:variable>-->
                    <!--<xsl:value-of  select="DesignationDesc"/>-->
                  </td>
                </xsl:when>
              </xsl:choose>

              <xsl:choose>
                <xsl:when test="CountryID='104'">
                  <td style="white-space:nowrap">
                    <xsl:variable name="ShippingAddress" xml:space="preserve">
                <xsl:value-of select="ShippingAddress"/>
              
              </xsl:variable>

                    <xsl:choose>
                      <xsl:when test="(string-length(ShippingAddress)) > 14">
                        <xsl:attribute name="title">

                          <xsl:value-of select="ShippingAddress"/>
                        </xsl:attribute>
                        <xsl:value-of select="(substring(ShippingAddress,1,14))"/>
                        <xsl:text>..</xsl:text>
                      </xsl:when>
                      <xsl:otherwise>
                        <xsl:value-of select="ShippingAddress"/>
                      </xsl:otherwise>
                    </xsl:choose>
                    <!--</xsl:variable>-->
                    <!--<xsl:value-of  select="DesignationDesc"/>-->
                  </td>
                </xsl:when>
              </xsl:choose>
              <td style="white-space:nowrap">
                <xsl:variable name="LocationDesc" xml:space="preserve">
                <xsl:value-of select="LocationDesc"/>
              
              </xsl:variable>

                <xsl:choose>
                  <xsl:when test="(string-length(LocationDesc)) > 14">
                    <xsl:attribute name="title">

                      <xsl:value-of select="LocationDesc"/>
                    </xsl:attribute>
                    <xsl:value-of select="(substring(LocationDesc,1,14))"/>
                    <xsl:text>..</xsl:text>


                  </xsl:when>
                  <xsl:otherwise>

                    <xsl:value-of select="LocationDesc"/>


                  </xsl:otherwise>
                </xsl:choose>

                <!--</xsl:variable>-->

                <!--<xsl:value-of  select="DesignationDesc"/>-->

              </td>



              <td style="white-space:nowrap">
                <xsl:value-of select="CandidateDOJ"/>
              </td>

              <td style="nowrap">
                <xsl:value-of select="FileUploadStatusDesc"/>
              </td>
              <!--<xsl:if test="CountryID='4'">
              <xsl:if test="Status!='9'">
                <td style="nowrap">
                  <a id="UpdatePrintOutStatus" onclick="UpdatePhotoStatus(document.getElementById('hdnCandidateid'),document.getElementById('hdnCountryid'));">Update Print Out Status</a>
                </td>
              </xsl:if>
              </xsl:if>-->
            </tr>

          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>


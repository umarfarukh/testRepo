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
          <!--<div  >-->
            <span style="display:inline">
              <tr>
                <th class="sno">S no.</th>
                <th class="c_name">Candidate Name</th>
                <th
                  class="l_id" >Login Id</th>
                <th
                   class="level" >Level</th>
                <th
                   class="r_name">Recruiter Name(ID)</th>
                <!--<th
              class="o_status">Offer Status</th>-->
                <th
                  class="doj">DOJ</th>
                <th
                   class="p_work">Paperwork</th>
                <!--<xsl:variable name="CountryID" xml:space="preserve">
                <xsl:value-of select="ArrayOfCandidateDetail/CandidateDetail[1]/CountryID"/>
              </xsl:variable>-->
                <xsl:choose>
                  <xsl:when test="ArrayOfCandidateDetail/CandidateDetail[1]/CountryID=4 or ArrayOfCandidateDetail/CandidateDetail[1]/CountryID=104">
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

                  <td class="tdName">

                    <xsl:variable name="CandidateID">
                      <xsl:value-of select="CandidateId"/>
                    </xsl:variable>
                    <a href="#"  OnClick="FetchDrill({$CandidateID});" class="atag">
                      <xsl:attribute name="title">

                        <xsl:value-of select="CandidateFName"/>
                      </xsl:attribute>
                      <xsl:value-of select="CandidateFName"/>
                    </a>
                  </td>

                  <td>
                    <xsl:value-of select="LoginId"/>
                  </td>

                  <td style="white-space:nowrap">
                    <xsl:variable name="DesignationDesc" xml:space="preserve">
                         <xsl:value-of select="DesignationDesc"/>
                     </xsl:variable>

                    <xsl:choose>
                      <xsl:when test="(string-length(DesignationDesc)) > 10">
                        <xsl:attribute name="title">
                          <xsl:value-of select="DesignationDesc"/>
                        </xsl:attribute>
                        <xsl:value-of select="(substring(DesignationDesc,1,10))"/>
                        <xsl:text>..</xsl:text>
                      </xsl:when>
                      <xsl:otherwise>
                        <xsl:value-of select="DesignationDesc"/>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                  
                  <!--<td>
                    <xsl:value-of select="DesignationDesc"/>
                  </td>-->

                  <td>
                    <xsl:value-of select="RecruiterName"/>
                  </td>

                  <!--<td >
                <xsl:value-of select="CandidateOfferStatusDesc"/>
              </td>-->
                  <td >
                    <xsl:value-of select="CandidateDOJ"/>
                  </td>

                  <td >
                    <xsl:value-of select="PaperWorkStatus"/>
                  </td>
                  <xsl:variable name="CountryID" xml:space="preserve">
                            <xsl:value-of select="CountryID"/>
                    </xsl:variable>
                  <xsl:choose>
                    <xsl:when test="($CountryID)=4 or ($CountryID)=104">                  
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
            </span>
          <!--</div>-->
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

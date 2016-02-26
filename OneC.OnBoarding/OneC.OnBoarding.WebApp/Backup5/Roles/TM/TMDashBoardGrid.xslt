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
          <xsl:choose>
            <xsl:when test="ArrayOfCandidateDetail/CandidateDetail[1]/CountryID=ArrayOfCandidateDetail/CandidateDetail[1]/Check_CountryID and ArrayOfCandidateDetail/CandidateDetail[1]/RcChosenLocation='false'">
              <!--To check Manila-->
              <tr>
              <th class="sno">S no.</th>
              <th class="c_name">Candidate Name</th>
              <th
                class="l_id" >Login Id</th>
              <th
                 class="level" >On-Boarding Stage</th>
              <th
                 class="r_name">Hiring Unit</th>
              <th
                class="r_name">DOJ</th>
              <th
                class="p_work">Joining Location</th>
              </tr>
            </xsl:when>
           
            <xsl:otherwise>
              <tr>
                
            <th
              class="">DOJ</th>
            <th
               class="">EmployeeId</th>
            <th
              class="">EmployeeName</th>
            <th 
              class="">Department</th>
            <th 
              class="">Jobcode</th>
            <th
               class="">GradeDescription</th>
            <th
               class="">Region</th>
            <th
               class="">Location</th>
          </tr>
            </xsl:otherwise>
          </xsl:choose>
          <xsl:for-each select="ArrayOfCandidateDetail/CandidateDetail">

            <xsl:choose>
              <xsl:when test="CountryID=Check_CountryID and RcChosenLocation='false'">
                <tr>
                  <td style="text-align:center;" >
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
                    <xsl:variable name="LoginId" xml:space="preserve">
                <xsl:value-of select="LoginId"/>
              
              </xsl:variable>

                    <xsl:choose>
                      <xsl:when test="(string-length(LoginId)) > 13">
                        <xsl:attribute name="title">

                          <xsl:value-of select="LoginId"/>
                        </xsl:attribute>
                        <xsl:value-of select="(substring(LoginId,1,13))"/>
                        <xsl:text>..</xsl:text>


                      </xsl:when>
                      <xsl:otherwise>

                        <xsl:value-of select="LoginId"/>


                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                
                    <!--To check Manila-->
                    <td style="white-space:nowrap">
                      <xsl:variable name="StageDescription" xml:space="preserve">
                <xsl:value-of select="StageDescription"/>
                </xsl:variable>

                      <xsl:choose>
                        <xsl:when test="(string-length(StageDescription)) > 14">
                          <xsl:attribute name="title">

                            <xsl:value-of select="StageDescription"/>
                          </xsl:attribute>
                          <xsl:value-of select="(substring(StageDescription,1,14))"/>
                          <xsl:text>..</xsl:text>


                        </xsl:when>
                        <xsl:otherwise>

                          <xsl:value-of select="StageDescription"/>


                        </xsl:otherwise>
                      </xsl:choose>

                      <!--</xsl:variable>-->

                      <!--<xsl:value-of  select="DesignationDesc"/>-->

                    </td>

                    <td style="white-space:nowrap" >

                      <xsl:variable name="BUDescription" xml:space="preserve">
                <xsl:value-of select="BUDescription"/>
              
              </xsl:variable>

                      <xsl:choose>
                        <xsl:when test="(string-length(BUDescription)) > 22">
                          <xsl:attribute name="title">

                            <xsl:value-of select="BUDescription"/>
                          </xsl:attribute>
                          <xsl:value-of select="(substring(BUDescription,1,22))"/>
                          <xsl:text>..</xsl:text>


                        </xsl:when>
                        <xsl:otherwise>

                          <xsl:value-of select="BUDescription"/>


                        </xsl:otherwise>
                      </xsl:choose>

                    </td>

                    <td style="white-space:nowrap">
                      <xsl:value-of select="CandidateDOJ"/>
                    </td>
                    <td >
                      <xsl:value-of select="ESAWorkLocation"/>
                    </td>
                    </tr>
                  </xsl:when>
              <xsl:otherwise>
            <tr>
              <!--<td style="text-align:center;width:8px" >
                <xsl:value-of select="RowNumber"/>
              </td>-->
              <td style="white-space:nowrap">
                <xsl:value-of select="CandidateDOJ"/>
              </td>
              <td>
                <xsl:variable name="LoginId" xml:space="preserve">
                <xsl:value-of select="LoginId"/>
              
              </xsl:variable>

                <xsl:choose>
                  <xsl:when test="(string-length(LoginId)) > 13">
                    <xsl:attribute name="title">

                      <xsl:value-of select="LoginId"/>
                    </xsl:attribute>
                    <xsl:value-of select="(substring(LoginId,1,13))"/>
                    <xsl:text>..</xsl:text>


                  </xsl:when>
                  <xsl:otherwise>

                    <xsl:value-of select="LoginId"/>


                  </xsl:otherwise>
                </xsl:choose>
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

              <td style="white-space:nowrap" >

                <xsl:variable name="DepartmentName" xml:space="preserve">
                  <xsl:value-of select="DepartmentName"/>
                </xsl:variable>

                <xsl:choose>
                  <xsl:when test="(string-length(DepartmentName)) > 16">
                    <xsl:attribute name="title">

                      <xsl:value-of select="DepartmentName"/>
                    </xsl:attribute>
                    <xsl:value-of select="(substring(DepartmentName,1,16))"/>
                    <xsl:text>..</xsl:text>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:value-of select="DepartmentName"/>
                  </xsl:otherwise>
                </xsl:choose>

              </td>
              
              <td>
                <xsl:value-of select="Jobcode"/>
              </td>

              <td style="white-space:nowrap" >
                <xsl:variable name="GradeDescription" xml:space="preserve">
                  <xsl:value-of select="GradeDescription"/>
                </xsl:variable>

                <xsl:choose>
                  <xsl:when test="(string-length(GradeDescription)) > 25">
                    <xsl:attribute name="title">

                      <xsl:value-of select="GradeDescription"/>
                    </xsl:attribute>
                    <xsl:value-of select="(substring(GradeDescription,1,25))"/>
                    <xsl:text>..</xsl:text>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:value-of select="GradeDescription"/>
                  </xsl:otherwise>
                </xsl:choose>

              </td>
              
              <td>
                <xsl:value-of select="CountryName"/>
              </td>
              <td>
                <xsl:variable name="CountryID" xml:space="preserve">
                  <xsl:value-of select="CountryID"/>
                </xsl:variable>
                <xsl:if test="($CountryID)=3">
                  <xsl:value-of select="CityName"/>
                </xsl:if >
                <xsl:if test="($CountryID)!=3">
                  <xsl:value-of select="StateDescription"/>
                </xsl:if >
              </td>

            </tr>
                </xsl:otherwise>
              </xsl:choose>

          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

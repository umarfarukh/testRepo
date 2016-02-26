<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl">


  <xsl:template match="/">
    <html>
      <head>
        <link href="../../Styles/drilldown.css" rel="stylesheet" type="text/css" />
        <script type="text/javascript" src="../../Scripts/JQuery/1.8/indiaonboarding.js"></script>
      </head>
      <body>
        <table summary="Details about new hire candidates">
          <tr>
            <th class="sno">S No.</th>
            <th class="c_name">Full Name</th>
          
            <th
               class="level" >Level</th>
            <th
               class="r_name">SO WorkLocation</th>
            <th
            class="l_id" >Expected DOJ</th>
            <th
              class="o_status">Associate Id</th>
            
          </tr>

          <xsl:for-each select="ArrayOfCandidateDetail/CandidateDetail">
            <tr>
              <td>
                <xsl:value-of select="RowNumber"/>
              </td>
              <!--<td class="tdName">

                <xsl:variable name="CandidateFName">
                  <xsl:value-of select="CandidateFName"/>
                </xsl:variable>
                <a   class="atag">
                  <xsl:attribute name="title">

                    <xsl:value-of select="CandidateFName"/>
                  </xsl:attribute>
                  <xsl:value-of select="CandidateFName"/>
                </a>
              </td>-->
              <td  class="atag">

                <xsl:value-of select="AssociateName"/>
             
              </td>
              <td>
                <xsl:value-of select="DesignationDesc"/>
              </td>
              <td>
                <xsl:value-of select="SoWorkLocation"/>
              </td>

              <td>
                <xsl:value-of select="DOJ"/>
              </td>

              <td >
                <!--<xsl:value-of select="AssociateId"/>-->
                <xsl:choose>
                  <xsl:when test="AssociateId!='0'">
                    <xsl:value-of select="AssociateId"/>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:value-of select= "''"  />
                  </xsl:otherwise>
                </xsl:choose>
             
              </td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

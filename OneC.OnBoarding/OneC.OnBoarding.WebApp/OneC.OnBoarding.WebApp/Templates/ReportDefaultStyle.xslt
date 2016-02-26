<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt">
    <xsl:output method="html" indent="yes" encoding="iso-8859-1" />
    <xsl:template match="Root">
        <html>
            <body>
                <table border="1">
                    <xsl:apply-templates select="Data"></xsl:apply-templates>
                </table>
            </body>
        </html>
    </xsl:template>
    <xsl:template name="Header">
        <tr>
            <xsl:for-each select="*">
                <th bgcolor="#9acd32">
                    <xsl:value-of select="translate(name(.),'_x0020_',' ')" />
                </th>
            </xsl:for-each>
        </tr>
    </xsl:template>
    <xsl:template name="Content" match="Data">
        <xsl:if test="position()=1">
            <xsl:call-template name="Header"></xsl:call-template>
        </xsl:if>
        <tr style="height:19px;">
            <xsl:for-each select="*">
                <td>
                    <xsl:choose>
                        <xsl:when test=".=''">
                            <xsl:text></xsl:text>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="."/>
                        </xsl:otherwise>
                    </xsl:choose>
                </td>
            </xsl:for-each>
        </tr>
    </xsl:template>
</xsl:stylesheet>

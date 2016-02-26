<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt"
    exclude-result-prefixes="msxsl">
  <xsl:template match="/">
    <html>
      <head>
        <link href="../../Styles/NHStyles.css" rel="stylesheet" type="text/css" />
        <script type="text/javascript" src="../../Scripts/JQuery/1.8/indiaonboarding.js"></script>
      </head>
      <body>
        <div class="thumbnailview">
          <div class="thumbleftscroll">
            <img src="../../Images/lefthide.png" alt="leftscroll" title="Previous" id="previous_thumbview" onclick="ThumbPrevious();"  />
          </div>
          <ul id="tasks_thumb">

            <xsl:for-each select="ArrayOfTaskDetail/TaskDetail">
              <xsl:variable name="TaskID">
                <xsl:value-of select="TaskId"/>
              </xsl:variable>
              <xsl:variable name="Url">
                <xsl:value-of select="RelativeUrl"/>
              </xsl:variable>
              <xsl:variable name="SampleFormUrl">
                <xsl:value-of select="SampleFormUrl"/>
              </xsl:variable>
              <li>
                <div class="inner_top_content_thumb">
                  <xsl:element name="img" >
                    <xsl:attribute name="src">
                      <xsl:value-of select="TileViewStatusImage" />
                    </xsl:attribute>
                    <xsl:attribute name="class">
                      thumbnailview_icon
                    </xsl:attribute>

                  </xsl:element>
                 
                  <xsl:if test="IsLinkEnable='1' ">
                    <xsl:if test="IsExternalURL='0' ">
                    <p class="thumbnail_enable"  style="cursor:hand">
                      <!--<xsl:value-of select="Title" />-->
                      <xsl:if test="IsExternalURL='0' ">

                        <xsl:if test="ProcessID='1' or ProcessID='0'">
                          <xsl:choose>
                            <xsl:when test="PreviousTaskStatus='1'">
                              <a style="color: #3bb9ff; text-decoration: none;" href="javascript:OpenPop('{$Url}','{$TaskID}');" >
                                <xsl:value-of select="Title" />
                                
                              </a>
                            </xsl:when>
                            <xsl:otherwise>
                              <xsl:choose>
                                <xsl:when test="PreviousMandatoryTask_Ref='0'">
                                  <a style="color: #3bb9ff; text-decoration: none;" href="javascript:OpenPop('{$Url}','{$TaskID}');" >
                                    
                                    <xsl:value-of select="Title" />
                                  </a>
                                </xsl:when>
                                <xsl:otherwise>
                                  <a style="color: #3bb9ff; text-decoration: none;" href="javascript:OpenPopAlert();" >
                                    
                                    <xsl:value-of select="Title" />
                                  </a>
                                </xsl:otherwise>
                              </xsl:choose>

                            </xsl:otherwise>

                          </xsl:choose>
                        </xsl:if>
                        <xsl:if test="ProcessID='2'">
                          <a style="color: #3bb9ff; text-decoration: none;" href="javascript:OpenPop('{$Url}','{$TaskID}');" >
                            
                            <xsl:value-of select="Title" />
                          </a>
                        </xsl:if>
                        
                      </xsl:if>
                      
                    </p>
                    </xsl:if>

                    <xsl:if test="IsExternalURL='1' ">
                      <p class="thumbnail_enable"  style="cursor:hand"  onclick="OpenExternalLink('{$Url}');">
                        <xsl:value-of select="Title" />
                      </p>
                    </xsl:if>
                  </xsl:if>


                  <xsl:if test="IsLinkEnable='0' ">
                    <p class="code_thumbnail">
                      <xsl:value-of select="Title" />
                    </p>
                  </xsl:if>
                </div>
                <div class="inner_bottom_content_thumb">
                  <span>
                    Due / Completion Date :  <xsl:value-of select="DueCompletionDate" />
                  </span>
                
                  <!--<xsl:if test="IsResourceCenter=1">
                    --><!--<img src="../../Images/notes.png" class="remainder_code" alt="Reference" title="Reference"/>--><!--
                    <img src="../../Images/SampleForm1.jpg" class="remainder_code_t" alt="SampleForm" title="SampleForm"/>

                  </xsl:if>-->

                 
                  <xsl:if test="$SampleFormUrl!=''">
                   
                    <!--<img src="../../Images/SampleForm1.jpg"   width="8%"  border="1px solid #b9b9b9"  alt="SampleForm" title="SampleForm" onclick="OpenSamplePop('{$SampleFormUrl}');"/>-->
                    <img src="../../Images/notes.png"  width="8%"  border="1px solid #b9b9b9"  alt="SampleForm" title="SampleForm" onclick="OpenSamplePop('{$SampleFormUrl}');" style="cursor: pointer;"/>
                  </xsl:if>

                  <xsl:if test="IsReminder=1">
                    <!--<img src="../../Images/remainder.png" class="remainder_code_t" alt="Reminder" title="Reminder"/>-->
                    <img src="../../Images/faq2.jpg" class="remainder_code" onclick="OpenPop('../../CommonPages/FAQ.htm','{$TaskID}');" alt="FAQs" title="FAQs"/>



                  </xsl:if>
                 
                </div>
              </li>
            </xsl:for-each>
          </ul>
          <div class="thumbnavigators"></div>
          
        </div>
        <div class="thumbrightscroll">
          <img src="../../Images/rightscroll.png" alt="Rightscroll" title="Next" id="next_thumbview" onclick="ThumbNext();" />
        </div>

      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

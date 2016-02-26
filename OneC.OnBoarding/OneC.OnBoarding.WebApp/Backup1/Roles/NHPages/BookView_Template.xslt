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

        
      
          <div class="content_book">

            <div class="leftscroll">
              <img src="../../Images/lefthide.png" alt="leftscroll" title="Previous" id="previous_book" onclick="BookPrevious();" />
            </div>
             <ul id="tasks_book">
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
                  <div class="top_content">
                  <xsl:element name="img">
                    <xsl:attribute name="src">
                      <xsl:value-of select="TileViewStatusImage" />
                    </xsl:attribute>
                  </xsl:element>
                  <p>
                    <xsl:value-of select="Title" />
                  </p>
                  <p class="desc">
                    <xsl:value-of select="Description" />
                  </p>
                </div>
                  <div class="bottom_content">
                    <div class="panel_book" >
                      <xsl:element name="img" >
                        <xsl:attribute name="src">
                          <xsl:value-of select="StatusImage" />
                        </xsl:attribute>
                        <xsl:attribute name="class">
                          resume_icon_book
                        </xsl:attribute>
                      </xsl:element>
                      <div class="panel_book_duedate">
                        <div class="inner_top_content">
                          <p class="paddingT0">
                            Due / Completion Date : <xsl:value-of select="DueCompletionDate" />
                          </p>
                          <p class="paddingT0">
                            Estimated: <xsl:value-of select="RequiredTime" />
                          </p>
                        </div>
                        <!--<div class="inner_bottom_content">-->
                          <!--<img src="../../Images/resume.png" alt="Resume" title="Resume"/>-->
                        <div class="inner_bottom_content" style="cursor:hand">
                          <xsl:if test="IsLinkEnable='1' ">
                            <xsl:variable name="buttonText">
                              <xsl:value-of select="ActionMessage" />
                            </xsl:variable>
                            <img src="../../Images/btn1.png" alt="{$buttonText}"   class="submitbtn" style="margin-right:-17px"/>
                            <xsl:if test="IsExternalURL='0' ">
                              
                            <span class="submit_text" style="padding-left:0px;">
                              
                              <xsl:if test="ProcessID='1' or ProcessID='0'">
                                <xsl:choose>
                                  <xsl:when test="PreviousTaskStatus='1'">
                                    <a style="color: white; text-decoration: none;" href="javascript:OpenPop('{$Url}','{$TaskID}');" >
                                      <xsl:value-of select="ActionMessage" />
                                    </a>
                                  </xsl:when>
                                  <xsl:otherwise>
                                    <xsl:choose>
                                      <xsl:when test="PreviousMandatoryTask_Ref='0'">
                                        <a style="color: white; text-decoration: none;" href="javascript:OpenPop('{$Url}','{$TaskID}');" >
                                          <xsl:value-of select="ActionMessage" />
                                        </a>
                                      </xsl:when>
                                      <xsl:otherwise>
                                        <a style="color: white; text-decoration: none;" href="javascript:OpenPopAlert();" >
                                          <xsl:value-of select="ActionMessage" />
                                        </a>
                                      </xsl:otherwise>
                                    </xsl:choose>

                                  </xsl:otherwise>

                                </xsl:choose>
                              </xsl:if>
                              <xsl:if test="ProcessID='2'">
                                <a style="color: white; text-decoration: none;" href="javascript:OpenPop('{$Url}','{$TaskID}');" >
                                  <xsl:value-of select="ActionMessage" />
                                </a>
                              </xsl:if>
                            </span>
                            </xsl:if>
                          <!--</xsl:if>-->
                            
                            <xsl:if test="IsExternalURL='1' ">
                            <span class="submit_text" style="padding-left:5px;" onclick="OpenExternalLink('{$Url}');">
                              <xsl:value-of select="ActionMessage" />
                            </span>
                          </xsl:if>
                            <!--</div>-->
                          <!--</xsl:if>-->
                          </xsl:if>
                        </div>
                        </div>
                      </div>
                  
                      <!--<xsl:if test="IsResourceCenter=1">
                        --><!--<img src="../../Images/remainder.png" alt="Reminder" title="Reminder" class="remainder" />--><!--
                        <img src="../../Images/SampleForm1.jpg" class="remainder" alt="SampleForm" title="SampleForm"/>
                      </xsl:if>-->

                   
                    <xsl:if test="$SampleFormUrl!=''">
                      
                      <!--<img src="../../Images/SampleForm1.jpg"   width="8%;" class="reference"   border="1px solid #b9b9b9"  alt="SampleForm" title="SampleForm" onclick="OpenSamplePop('{$SampleFormUrl}');"/>-->
                      <img src="../../Images/notes.png"   width="8%;" class="reference"   border="1px solid #b9b9b9"  alt="SampleForm" title="SampleForm" onclick="OpenSamplePop('{$SampleFormUrl}');"/>
                    </xsl:if>

                    <xsl:if test="IsReminder=1">
                      <!--<img src="../../Images/notes.png" alt="Reference" title="Reference" class="reference"/>-->
                      <img src="../../Images/faq2.jpg" onclick="OpenPop('../../CommonPages/FAQ.htm','{$TaskID}');" class="reference" alt="FAQs" title="FAQs"/>
                    </xsl:if>
                    </div>
                </li>

              </xsl:for-each>
               
            </ul>
            <div class="navigators">
           
            </div>
         
          </div>

        <div class="rightscroll">
          <img src="../../Images/rightscroll.png" alt="Rightscroll" title="Next" id="next_book" onclick="BookNext();" />
        </div>

    
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

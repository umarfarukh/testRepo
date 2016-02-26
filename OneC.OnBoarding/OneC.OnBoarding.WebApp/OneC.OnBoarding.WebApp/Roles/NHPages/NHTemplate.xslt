<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt"
    exclude-result-prefixes="msxsl">
  <xsl:template match="/">
    <html>
      <head>
        <link href="../../Styles/NHStyles.css" rel="stylesheet" type="text/css" />
        <!--<script type="text/javascript" src="../../Scripts/JQuery/1.8/indiaonboarding.js"></script>-->
      </head>
      <body>

        <div class="table_nh">
          <ul class="headerTbl">
            <li class="task_t">
              Task
            </li>
            <li class="status_t">
              Status
            </li>
            <li class="date_t">
              Due / Completion Date
            </li>
            <li class="time_t">
              Estimated Time
            </li>
            <li class="action_t">
              Action
            </li>
            <li class="ref_t">
              FAQs / Sample Form
            </li>
          </ul>
        </div>
        <div class="table_nh tblScroll">
          <xsl:for-each select="ArrayOfTaskDetail/TaskDetail">
            <xsl:variable name="TaskID">
              <xsl:value-of select="TaskId"/>
            </xsl:variable>
            <xsl:variable name="PreviousTaskStatus">
              <xsl:value-of select="PreviousTaskStatus"/>
            </xsl:variable>
            <xsl:variable name="PreviousMandatoryTask_Ref">
              <xsl:value-of select="PreviousMandatoryTask_Ref"/>
            </xsl:variable>
            <xsl:variable name="ProcessID">
              <xsl:value-of select="ProcessID"/>
            </xsl:variable>
            <!--Variable storing class names after checking whether row is even or odd-->
            <xsl:variable name="rowClass">
              <xsl:choose>
                <xsl:when test="position() mod 2 = 0">
                  <xsl:value-of select="'even_row'"/>
                </xsl:when>
                <xsl:otherwise>
                  <xsl:value-of select="'odd_row'"/>
                </xsl:otherwise>
              </xsl:choose>
            </xsl:variable>
            <!--Variable to check completion status - default false-->
            <xsl:variable name="completionStatus" select="boolean(StatusMessage='Completed')" />
            <!--Variable storing styles for rows having completed status-->
            <xsl:variable name="rowStyles">
              <xsl:choose>
                <xsl:when test="$completionStatus">
                  <xsl:value-of select="'color:#84b51e;'" />
                </xsl:when>
                <xsl:otherwise></xsl:otherwise>
              </xsl:choose>
            </xsl:variable>


            <xsl:variable name="Url">
              <xsl:value-of select="RelativeUrl"/>
            </xsl:variable>
            <xsl:variable name="SampleFormUrl">
              <xsl:value-of select="SampleFormUrl"/>
            </xsl:variable>
            <xsl:variable name="Title">
              <xsl:value-of select="TooltipText"/>
            </xsl:variable>
			<xsl:variable name="SurveyType">
				  <xsl:value-of select="SurveyType"/>
			</xsl:variable>
			  
            <ul >
              <li class="{$rowClass} task_t " style="{$rowStyles}">
                <a class="taskInfo">
                  <xsl:value-of select="Title" />
                  <span>
                    <xsl:value-of select="$Title" />
                  </span>
                  <!--<div class="tail1" style="display:none"></div>
                        <div class="tailShadow" style="display:none"></div>
                        <div class="tail2" style="display:none"></div>-->

                </a>
              </li>
              <li class="{$rowClass} status_t" style="{$rowStyles}">
                <xsl:value-of select="StatusMessage" />
              </li>
              <li class="{$rowClass} date_t" style="{$rowStyles}">
                <xsl:value-of select="DueCompletionDate" />
              </li>
              <li class="{$rowClass} time_t" style="{$rowStyles}">
                <xsl:value-of select="RequiredTime"/>
              </li>
              <!--<xsl:if test="ProcessID='1' or ProcessID='0' ">-->
              <xsl:if test="IsLinkEnable='1' ">
                <li class="{$rowClass} action_t" >
                  <xsl:if test="IsExternalURL='0' ">
					  <xsl:if test="SurveyType > 0">
						  <a href="javascript:SurveyPopupWindow('{$Url}','{$SurveyType}');" >
							  <xsl:value-of select="ActionMessage" />
						  </a>
					  </xsl:if>
					  <xsl:if test="SurveyType = 0">
						 <xsl:if test="ProcessID='1' or ProcessID='0'">
                      <xsl:choose>
                        <xsl:when test="PreviousTaskStatus='1'">
                          <a href="javascript:OpenPop('{$Url}','{$TaskID}');" >
                            <xsl:value-of select="ActionMessage" />
                          </a>
                        </xsl:when>
                        <xsl:otherwise>
                          <xsl:choose>
                            <xsl:when test="PreviousMandatoryTask_Ref='0'">
                              <a href="javascript:OpenPop('{$Url}','{$TaskID}');" >
                                <xsl:value-of select="ActionMessage" />
                              </a>

                            </xsl:when>
                            <xsl:otherwise>
                              <a href="javascript:OpenPopAlert();" >
                                <xsl:value-of select="ActionMessage" />
                              </a>
                            </xsl:otherwise>
                          </xsl:choose>

                        </xsl:otherwise>

                      </xsl:choose>
                    </xsl:if>
						 <xsl:if test="ProcessID='2'">
                      <a href="javascript:OpenPop('{$Url}','{$TaskID}');" >
                        <xsl:value-of select="ActionMessage" />
                      </a>
                    </xsl:if>
					  </xsl:if>
                  </xsl:if>
                  <xsl:if test="IsExternalURL='1' ">
                    <a href="javascript:OpenExternalLink('{$Url}');" >
                      <xsl:value-of select="ActionMessage" />
                    </a>
                  </xsl:if>
                </li>
              </xsl:if>
              <!--</xsl:if>-->
              <xsl:if test="IsLinkEnable='0' ">
                <li class="{$rowClass} action_t" >
                </li>
              </xsl:if>
              <li class="{$rowClass} ref_t" >


                <!--<xsl:if test="IsResourceCenter=1">-->
                <xsl:if test="$SampleFormUrl!=''">
					<xsl:choose>
            <xsl:when test ="IsReminder!=2">
              <xsl:choose>
            <xsl:when test ="($TaskID=793) or ($TaskID=588) or ($TaskID=792)">
              <!--<img src="../../Images/remainder.png" alt="Reminder" title="Reminder" />-->
              <!--<img src="../../Images/SampleForm1.jpg"   width="8%"    border="1px solid #b9b9b9"  alt="SampleForm" title="SampleForm" onclick="OpenSamplePop('{$SampleFormUrl}');"/>-->
              <img src="../../Images/notes.png"    border="1px solid #b9b9b9"  alt="SampleForm" title="Guideline Document" onclick="OpenSamplePop('{$SampleFormUrl}');"/>

            </xsl:when>
            <xsl:otherwise>
                <!--<img src="../../Images/remainder.png" alt="Reminder" title="Reminder" />-->
                <!--<img src="../../Images/SampleForm1.jpg"   width="8%"    border="1px solid #b9b9b9"  alt="SampleForm" title="SampleForm" onclick="OpenSamplePop('{$SampleFormUrl}');"/>-->
                <img src="../../Images/notes.png"    border="1px solid #b9b9b9"  alt="SampleForm" title="sampleform" onclick="OpenSamplePop('{$SampleFormUrl}');"/>
             </xsl:otherwise>
					</xsl:choose>
            </xsl:when>
            </xsl:choose>
                </xsl:if>
               
                <xsl:if test="IsReminder=1">	
                  <!--<img src="../../Images/notes.png" alt="Reference" title="Reference" />-->
                  <!--<img src="../../Images/faq2.jpg"  onclick="OpenPop('../../CommonPages/FAQ.htm','{$TaskID}');" width="10%"  alt="FAQs" title="FAQs"/>-->
                  <img src="../../Images/faq2.jpg"  onclick="OpenPop('../../CommonPages/FAQ.htm','{$TaskID}');" width="18%"  alt="FAQs" title="FAQs"/>
                </xsl:if>

				 <xsl:if test="IsReminder=2">
				   <!--<img src="../../Images/notes.png" alt="Reference" title="Reference" />-->
				   <!--<img src="../../Images/faq2.jpg"  onclick="OpenSamplePop('{$SampleFormUrl}');" width="10%"  alt="FAQs" title="FAQs"/>-->
           <img src="../../Images/faq2.jpg"  onclick="OpenSamplePop('{$SampleFormUrl}');" width="18%"  alt="FAQs" title="FAQs"/>
				 </xsl:if>
			

              </li>
            </ul>
          </xsl:for-each>
        </div>


      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

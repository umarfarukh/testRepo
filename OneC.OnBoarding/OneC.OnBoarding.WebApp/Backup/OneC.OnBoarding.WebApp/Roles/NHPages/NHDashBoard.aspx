<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="NHDashBoard.aspx.cs" Inherits="OneC.OnBoarding.WebApp.Roles.NHPages.NHDashBoard" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="CACHE-CONTROL" content="NO-CACHE">
    <meta http-equiv="X-UA-Compatible" content="IE=8" />
    <title>NH dashboard</title>
    <link href="../../Styles/NHStyles.css" rel="stylesheet" type="text/css" />
    <input type="hidden" id="hdnSmMode" runat="server" />    
</head>
<body>
    <form id="Form1" runat="server">
    <div id="smFrame">
        <iframe id="sm" frameborder="0" width="0" height="0" runat="server"></iframe>
    </div>
    <div class="header_nh">
        <div class="photo_nh" id="Photo">
            <img alt="Photo" id="NHPhoto"/>
        </div>
        <div class="text_nh">
            <p class="welcome_text">
                Welcome
                <label id="Name" class="name_nh" runat="server">
                </label>
                ,</p>
            <span id="Designation" runat="server" />
            <div id="NAPayRoll_Tab" style="cursor:pointer;">
            <div id="dynamic_text" style="width: 270px; height: 40px; margin-left: 70px; padding-top: 10px; font-size: 14px; color: white;"></div>
             <%--   <img src="../../Images/NewNACall-out.gif" />--%>
            </div>
            <div id="NextTaskPrgBar">
                <blink><p id="next_task" class="next_task"> 
            <label id="NextTask" class="next_label"></label></p></blink>
            </div>
            <p id="dateofjoining" class="next_task">
                <label id="DateOfJoin" class="next_label">
                    Date Of Joining:</label>
                <label id="ExpectedDateOfJoin" class="next_label">
                    Expected Date Of Joining:</label>
                <label id="Date_Of_Joining" class="next_label">
                </label>
            </p>
        </div>
        <div class="tasks_nh">
            <div id="cguideenabled" style="display: none;">
                <div style="float: left; width: 100%";>
                    <div style="float: left;height:50px;padding-left:10px;">                        
                        <%--UF20130930--%>
                        <img src="../../Images/C-Guide_Logo.jpg" alt="Cguide" id="cguide" style="cursor: hand" /></div>
                        <%--<img src="data:image/jpg;base64,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XPc697HOYP3fb7Ib+8rWQMZzAMnbs3AjeQBuH0eUVZmPljHPkzGZlx7An/pfvcP6DpAU/wD/2f/tDBZQaG90b3Nob3AgMy4wADhCSU0EJQAAAAAAEAAAAAAAAAAAAAAAAAAAAAA4QklNBC8AAAAAAEqvAQEASAAAAEgAAAAAAAAAAAAAANACAABAAgAAAAAAAAAAAAAYAwAAZAIAAAABwAMAALAEAAABAA8nAQAuAGIAbQBwAAAAAAAAADhCSU0D7QAAAAAAEABIAAAAAQABAEgAAAABAAE4QklNBCYAAAAAAA4AAAAAAAAAAAAAP4AAADhCSU0EDQAAAAAABAAAAB44QklNBBkAAAAAAAQAAAAeOEJJTQPzAAAAAAAJAAAAAAAAAAABADhCSU0ECgAAAAAAAQAAOEJJTScQAAAAAAAKAAEAAAAAAAAAAjhCSU0D9QAAAAAASAAvZmYAAQBsZmYABgAAAAAAAQAvZmYAAQChmZoABgAAAAAAAQAyAAAAAQBaAAAABgAAAAAAAQA1AAAAAQAtAAAABgAAAAAAAThCSU0D+AAAAAAAcAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAA4QklNBAgAAAAAABAAAAABAAACQAAAAkAAAAAAOEJJTQQeAAAAAAAEAAAAADhCSU0EGgAAAAADQQAAAAYAAAAAAAAAAAAAAC8AAAAvAAAABgA0ADcAeAA0ADcAXwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAALwAAAC8AAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAQAAAAAAAG51bGwAAAACAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9uZwAAAC8AAAAAUmdodGxvbmcAAAAvAAAABnNsaWNlc1ZsTHMAAAABT2JqYwAAAAEAAAAAAAVzbGljZQAAABIAAAAHc2xpY2VJRGxvbmcAAAAAAAAAB2dyb3VwSURsb25nAAAA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aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIiB4YXA6Q3JlYXRlRGF0ZT0iMjAxMi0xMS0xOVQxNTowMDo1MSswNTozMCIgeGFwOk1vZGlmeURhdGU9IjIwMTItMTEtMTlUMTU6MDA6NTErMDU6MzAiIHhhcDpNZXRhZGF0YURhdGU9IjIwMTItMTEtMTlUMTU6MDA6NTErMDU6MzAiIHhhcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTMyBXaW5kb3dzIiBkYzpmb3JtYXQ9ImltYWdlL2pwZWciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgcGhvdG9zaG9wOkhpc3Rvcnk9IiIgeGFwTU06SW5zdGFuY2VJRD0idXVpZDoyNDkxNzA3NzJCMzJFMjExOTc4QkIyNzJBMTBGNzg5QyIgeGFwTU06RG9jdW1lbnRJRD0idXVpZDoyMzkxNzA3NzJCMzJFMjExOTc4QkIyNzJBMTBGNzg5QyIgdGlmZjpPcmllbnRhdGlvbj0iMSIgdGlmZjpYUmVzb2x1dGlvbj0iNzIwMDAwLzEwMDAwIiB0aWZmOllSZXNvbHV0aW9uPSI3MjAwMDAvMTAwMDAiIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiIHRpZmY6TmF0aXZlRGlnZXN0PSIyNTYsMjU3LDI1OCwyNTksMjYyLDI3NCwyNzcsMjg0LDUzMCw1MzEsMjgyLDI4MywyOTYsMzAxLDMxOCwzMTksNTI5LDUzMiwzMDYsMjcwLDI3MSwyNzIsMzA1LDMxNSwzMzQzMjtBMUU1N0NCMDlFRUREMTAzNURGMTE5MjcwRjBDOTVDQiIgZXhpZjpQaXhlbFhEaW1lbnNpb249IjQ3IiBleGlmOlBpeGVsWURpbWVuc2lvbj0iNDciIGV4aWY6Q29sb3JTcGFjZT0iMSIgZXhpZjpOYXRpdmVEaWdlc3Q9IjM2ODY0LDQwOTYwLDQwOTYxLDM3MTIxLDM3MTIyLDQwOTYyLDQwOTYzLDM3NTEwLDQwOTY0LDM2ODY3LDM2ODY4LDMzNDM0LDMzNDM3LDM0ODUwLDM0ODUyLDM0ODU1LDM0ODU2LDM3Mzc3LDM3Mzc4LDM3Mzc5LDM3MzgwLDM3MzgxLDM3MzgyLDM3MzgzLDM3Mzg0LDM3Mzg1LDM3Mzg2LDM3Mzk2LDQxNDgzLDQxNDg0LDQxNDg2LDQxNDg3LDQxNDg4LDQxNDkyLDQxNDkzLDQxNDk1LDQxNzI4LDQxNzI5LDQxNzMwLDQxOTg1LDQxOTg2LDQxOTg3LDQxOTg4LDQxOTg5LDQxOTkwLDQxOTkxLDQxOTkyLDQxOTkzLDQxOTk0LDQxOTk1LDQxOTk2LDQyMDE2LDAsMiw0LDUsNiw3LDgsOSwxMCwxMSwxMiwxMywxNCwxNSwxNiwxNywxOCwyMCwyMiwyMywyNCwyNSwyNiwyNywyOCwzMDsxNThEOUZCMzA4QUI3MDVFRDc0OEQxNzgzNUQ5RjgzOCI+IDx4YXBNTTpEZXJpdmVkRnJvbSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+IMWElDQ19QUk9GSUxFAAEBAAAMSExpbm8CEAAAbW50clJHQiBYWVogB84AAgAJAAYAMQAAYWNzcE1TRlQAAAAASUVDIHNSR0IAAAAAAAAAAAAAAAEAAPbWAAEAAAAA0y1IUCAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARY3By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" alt="Cguide" id="Img1" style="cursor: hand" /></div>--%>
                    <div id="clscguidelink" style="float: right;padding:2px 40px 0 0;width:170px;word-wrap:break-word;font-size:1.2em;">
                        <a class="clscguidelink" target="_parent" id="cguidelink">Launch Me</a>
                        ,your friendly guide for                          
                        a seamless integration into Cognizant</div>
                </div>
            </div>
            <div class="onboarding_nh">
                <p>
                    On Boarding
                </p>
                <p class="completed_nh">
                    <span style="display: block; float: left; width: 100%;">
               <span id="completedSquare"></span>
                        Completed:
                        <label id="CompletedCount">
                        </label>
                    </span><span style="display: block; float: left; width: 100%;">
                    <span id="pendingSquare"></span>
                        Pending:<label id="PendingCount"></label>
                    </span>
                </p>
                <div id="progressbar1">
                </div>
            </div>
            <div class="progress_nh" id="TimeLeft" style="display:none; margin-top:10px;">
                <p>
                    Time left to join us</p>
                <span>
                    <label id="DaysLeft">
                    </label>
                </span>
                <div id="progressbar"> 
                </div>
            </div>
            <div class="video_nh" id="video_nhid">
                <p id="pplJoiningText" style="display:none;">
                    People joining with you:<span id="pplCount"></span>
                </p>
                <a href="#" id="tabVideo" class="info">
                <div id="demo_nh" onclick="loadWindow();"></div>
                    <div>
                        <span>Video</span>
                    </div>
                </a>
                <a href="#" id="tabFaq" class="info">
                <div id="faq_nh" onclick="OpenPop('../../CommonPages/FAQ.htm', 0);"></div>
                    <div>
                        <span>FAQ's</span>
                    </div>
                </a>
                <a href="#" id="tabPostQuery" class="info">
                <div id="postQuery_nh" onclick="OpenChild('../../CommonPages/PostQuery.htm', 0);"></div>
                    <div>
                        <span>Post your Query here</span>
                    </div>
                </a>
              <!--312020 for NA PayRollApp-->
                <!--<a href="#" id="tab_NAPayRoll">
                <div id="NAPayRoll_nh" >
                <div id ="text">Click on date of joining/later.</div>
                <div id="dynamic_text"><%--<span id ="dynamic_text">--%></span></div>
                </div>    
                </a>-->
                
                <!--298015 - Commented- not moving to PROD
                -->
                <a href="#" id="tabRelocationApp" class="info">
                <div id="Relocation_nh" onclick="redirectToRAapp();"></div>
                    <div>
                        <span id="sRelAppTxt">Explore the City<br/>-Relocation Assistant</span>
                    </div>
                </a>
                
            </div>
        </div>
    </div>
    <div class="content_nh" style="height: 50%">
        <div class="views_nh" id="div_NhTabs">
        </div>
        <div class="icons_nh">
            <p class="highlighted_text">
                Tasks: (<label id="TotalCount"></label>)
            </p>
            <div id="dNoData">
            </div>

            <%--<img src="../../Images/list.png" alt="List View" title="List View" onclick="return ListViewClick();"
                id="list" />
            <img src="../../Images/bookg.png" alt="Book View" title="Book View" onclick="return bookViewClick();"
                id="book" />
            <img src="../../Images/thumbg.png" alt="Thumbnail View" title="Thumbnail View" onclick="return ThumViewClick();"
                id="thumb" />--%>

            <%-- UF20130927 --%>
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAP//////zCH5BAEHAAAALAAAAAABAAEAAAICRAEAOw==" width="28" height="21" style="background-image: url('../../Images/Sprt_NHD_Icons.png'); background-position: 0px 0px;" alt="List View" title="List View" onclick="return ListViewClick();"
                id="list" />
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAP//////zCH5BAEHAAAALAAAAAABAAEAAAICRAEAOw==" width="28" height="21" style="background-image: url('../../Images/Sprt_NHD_Icons.png'); background-position: 0px -31px;" alt="Book View" title="Book View" onclick="return bookViewClick();"
                id="book" />
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAP//////zCH5BAEHAAAALAAAAAABAAEAAAICRAEAOw==" width="28" height="21" style="background-image: url('../../Images/Sprt_NHD_Icons.png'); background-position: 0px -62px;" alt="Thumbnail View" title="Thumbnail View" onclick="return ThumViewClick();"
                id="thumb" />
        </div> 
    </div>
    <div id="List_View">
    </div>   
    <div id="content_book">
    </div>
    <div id="thumbnailview">
    </div>
    <div id="DocUploadList">
    </div>       
        <%---299080 - Commented-navigator banner--%>
    <div id="nav1"> 
        <a href="#." target="_blank" class="a_navi"><img src="../../Images/navi-banner.jpg" /> </a> </div> 
                 
    <input type="hidden" runat="server" id="hdnProcessId" />
    <input type="hidden" runat="server" id="hdnSessionId" />
    <input type="hidden" runat="server" id="hdnCandidateId" />
    <input type="hidden" runat="server" id="hdnTaskId" />
    <input type="hidden" runat="server" id="hdnCountryId" />
    <input type="hidden" runat="server" id="hdnStateId" />
    <input type="hidden" runat="server" id="hdnView" />
    <input type="hidden" runat="server" id="hdnEmailId" />
    <input type="hidden" runat="server" id="hdnCountryEmailId" />
    <input type="hidden" runat="server" id="hdnAssocaiteId" />
    <input type="hidden" runat="server" id="hdnDOJ" />
    <input type="hidden" runat="server" id="hdnMigrateCandidate" />
    <input runat="server" type="hidden" id="hdnCandidateType" />
    <input runat="server" type="hidden" id="hdnIsPreJoiningEnabled" />
    <input runat="server" type="hidden" id="hdnIsPostJoiningEnabled" />

    <input type="hidden" id="hdnSurveyUrl" runat="server" />
    <input type="hidden" id="hdnSurveyAllowed" runat="server" />
    <input type="hidden" id="hdnCGuideURL" runat="server" />
   <%-- <input type="hidden" id="hdnRelocationApp" runat="server" />--%>
    <input type="hidden" id="hdnNavigateURL" runat="server" />
    <input type="hidden" id= "hdnCisStatus" runat = "server" />
    <input type="hidden" id= "hdnRoleGropuId" runat = "server" />
    <input type="hidden" id="hdnSurveyType" runat = "server" />
    <input type="hidden" id="hdnHTransferAvailable" runat = "server" value="0"/>
    <input type="hidden" id="hdnDojComparer" runat="server" /> <!--312020 Commented As not moving to Prod-->

    </form>
</body>
<script type="text/javascript" src="../../Scripts/JQuery/1.8/jquery.js"></script>
<script type="text/javascript" src="../../Scripts/JQuery/1.8/jquery-ui-1.8.16.custom.min.js"></script>
<script type="text/javascript" language="javascript">
    var videoHtml = '';

    videoHtml += '';
    videoHtml += '<p>';
    videoHtml += '<img src="../../Images/closebtn.png" alt="video" onclick="disablePopup()" /></p>';
    videoHtml += '<div id="video_demo">';
    videoHtml += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="400px" height="240px"';
    videoHtml += 'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">';
    videoHtml += '<param name="movie" id="movieFlash"  />';
    videoHtml += '<param name="quality" value="high" />';
    videoHtml += '<param name="menu" value="true" />';
    videoHtml += '<param name="wmode" value="transparent" />';
    videoHtml += '<param name="FlashVars" value="init=yes&check=true" />';
    videoHtml += '<embed id="embedFlash"  flashvars="init=yes&check=true"';
    videoHtml += 'quality="high" bgcolor="#FFFFFF" width="400px" height="240px" name="" type="application/x-shockwave-flash"';
    videoHtml += 'wmode="transparent" align="" pluginspage="http://www.macromedia.com/go/getflashplayer"';
    videoHtml += 'onclick="disablePopup()">';
    videoHtml += '</embed>';
    videoHtml += '</object>';
    videoHtml += '</div>';

    function initiateSM() {
        if (document.getElementById('sm').src == "")
            document.getElementById('sm').src = '../../CommonPages/SessionMaintainer.aspx';
    }

    $(document).ready(function () {
        if ($("#hdnSmMode").val() == "1")
            initiateSM();
        if ($('#hdnMigrateCandidate').val() == 2) {
            $("#clsMckinley").show();
            $("#tabFaq").hide();
            $("#tabVideo").hide();
            $("#tabPostQuery").hide();
        }
        if ($('#hdnMigrateCandidate').val() == 8) {
            $("#tabFaq").hide();
        }
        if (($('#hdnMigrateCandidate').val() == 3)) {
            $("#tabVideo").hide();
            $("#tabFaq").show();
            $("#tabPostQuery").show();
            $("#DateOfJoin").show();
            $("#ExpectedDateOfJoin").hide();
        }

        else if (($('#hdnMigrateCandidate').val() != 3)) {
            $("#ExpectedDateOfJoin").show();
            $("#DateOfJoin").hide()
        }
        /*299080 show navigator*/
        $("#nav1 a").attr('href', $('#hdnNavigateURL').val());
        if ($('#hdnProcessId').val() == 2 && $('#hdnCountryId').val() == 3) {

            $("#nav1 a img").show();
        }
        else {
            $("#nav1  a img").hide();
        }


        /*298015 - Relocation app enabled for India NH
        298015 - Commented- not moving to PROD
        */
//        if ($('#hdnCountryId').val() == 3) {
//            $("#tabRelocationApp").show();
//        }
//        else {
//            $("#tabRelocationApp").hide();
//        }

        if (($('#hdnCountryId').val() == 1) && ($('#hdnDojComparer').val() != 0)) {
            $("#NAPayRoll_Tab").show();
            $("#dateofjoining").css('padding-top', '0px');
            $("#dateofjoining").css('margin-top', '-12px');
            $("#NextTask").css('padding-top', ' 10px');
            $("#next_task").css('padding-top', ' 20px');
            //            $("#tab_NAPayRoll").show();
            //            $("#NAPayRoll_nh").css('display', 'block');
        }
        else {
            $("#NAPayRoll_Tab").hide();
            //            $("#tab_NAPayRoll").hide();
        }



    });
</script>
<script src="../../Scripts/NHDashboard.js" type="text/javascript"></script>
<script type="text/javascript">
    //  $(document).ready(function () {
    var urlPrams = (window.frameElement.ownerDocument.referrer == undefined ? '' : window.frameElement.ownerDocument.referrer);
    var SurveyQueryString = (function (a) { if (a == "") return {}; var b = {}; for (var i = 0; i < a.length; ++i) { var p = a[i].split('='); if (p.length != 2) continue; b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " ")); } return b; })(urlPrams.substr(1).split('&'));
    if (SurveyQueryString["surveyType"] != undefined && SurveyQueryString["surveyType"] != null) {
        $('#hdnSurveyType').val(SurveyQueryString["surveyType"]);
    }
    if ($('#hdnSurveyAllowed').val() == 1) {
        if ($('#hdnSurveyType').val() != null && $('#hdnSurveyType').val() != undefined && $('#hdnSurveyType').val() != 0) {
            var surveyType = parseInt($('#hdnSurveyType').val());
            var data = "{";
            data += "candidateId:" + document.getElementById("hdnCandidateId").value + ",";
            data += "surveyType:'" + surveyType + "',";
            data += "spMode:1";
            data += "}";
            $.ajax({
                type: 'post',
                url: "../../FormsService.aspx/GetSurveyData",
                data: data,
                dataType: "json",
                async: false,
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    if (msg.d != 0 && msg.d == surveyType) {
                        SurveyPopupWindow(1, surveyType);
                    }
                }
            });
        }
        else {
            if ($('#hdnAssocaiteId').val() == 0 && $('#hdnHTransferAvailable').val() == 0) {
                confirmBox($('#hdnSurveyUrl').val());
            }
        }

    };
    //  });
</script>
</html>

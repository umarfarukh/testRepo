<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="UploadAttendance.aspx.cs" Inherits="OneC.OnBoarding.WebApp.Roles.HRSS.UploadAttendance" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<title>Bulk Upload</title>

<link href="../../Styles/jquery.ui.all.css" rel="stylesheet" type="text/css" />
<link href="../../Styles/jquery.ui.base.css" rel="stylesheet" type="text/css" />
<link href="../../Styles/jquery.ui.core.css" rel="stylesheet" type="text/css" />
<link href="../../Styles/jquery.ui.datepicker.css" rel="stylesheet" type="text/css" />
<link href="../../Styles/jquery.ui.theme.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="../../Scripts/JQuery/1.8/jquery.js"></script>
<script type="text/javascript" src="../../Scripts/JQuery/1.8/jquery-ui-1.8.16.custom.min.js"></script>
<script type="text/javascript" src="../../Scripts/JQuery/jquery.ui.datepicker.js"></script>
<script type="text/javascript" src="../../Scripts/JQuery/jquery.alerts.js"></script> 
<link href="../../Styles/styles.css" rel="stylesheet" type="text/css" />
<style type="text/css">
    .modal
     {
       position: fixed;
        top: 0;
        left: 0;
        background-color: black;
        z-index: 99;
        opacity: 0.7;
        filter: alpha(opacity=80);
        -moz-opacity: 0.7;
        min-height: 100%;
        width: 100%;
    }
    .loading
    {
        font-family: Arial;
        font-size: 10pt;
        border: 5px solid #67CFF5;
        width: 200px;
        height: 50px;
        display: none;
        position: fixed;
        background-color: White;
        z-index: 999;
    }

</style>
</head>
 
<body>
    <form id="uploadattendance" runat="server" style="width:100%; height:400px;">
       <div id="uploadAttanceTemplate" style="width:100%; height:400px; background-repeat:repeat-x;
	border:1px solid #d1c7ac; color:#333333;	padding:3px;	margin-right:4px;">
       <br />
       <div style="width:55%; height:50px;  font-size:small;">Note:Please use the attached template to upload data</div>    
       <div id="InductionAttendance" runat="server"  style="float: left; font-family:Arial; font-size:small; width:100%;  padding-top: 10px;">Upload Excel File:<asp:FileUpload  ID="xlsUpload" runat="server"  />
       <asp:Button ID="btnUpload" Text="Upload file" runat="server" style="margin-left:20px; display:none; background: url(../../Images/btn.png); width: 80px; color: #fff;" 
       OnClick="BtnUpload_Click" OnClientClick="javascript:return fnGetFile();" />
       <asp:Button ID="btnbulkuplodexcel" Text="Upload file" runat="server" style="margin-left: 20px; display:none;  background: url(../../Images/btn.png); width: 80px;
       color: #fff;" OnClick="Btnbulkuplodexcel_Click" OnClientClick="javascript:return fnGetFile();" />
       <asp:Button ID="DownloadTemplate" 
               
               style="margin-left:20px; background: url(../../Images/btn.png);color: #fff; "  runat="server" 
               Text="Download Template" onclick="DownloadTemplate_Click" Width="140px" />
       <%--<a style="margin-left:20px;display:none;text-decoration:underline " id="uploadexcel";  href="../../Templates/InductionAttendanceTemplates/InductionAttendanceTemplate.xml"> Download Template</a>--%>
       <a style="margin-left:20px;display:none;text-decoration:underline" id="candidateidBulkUpload";  href="../../Templates/candidateidBulkUpload/candidateidBulkUpload.xml"> Download Template</a>
       </div>
       <br />
       <br />
       <div align="center" >
        <br />
         <div id="mesgfile" style="width:auto; height:10px; float:none;  color:red; font-family:Arial; font-size:small; text-align:center;display:none">Please select the file to upload.</div>
         <div id="mesgvalidfine" style="width:auto; height:10px; float:none;  color:red; font-family:Arial; font-size:small;text-align:center;clear:both;display:none">Please upload  a valid file.</div>
         <asp:Label Id="mesgshowsuccess" runat="server" style="width:auto; height:10px; float:none;  color:Green; font-family:Arial; font-size:small;" ></asp:Label>
         <asp:Label Id="mesgshow" runat="server" style="width:auto; height:10px; float:none;  color:Red; font-family:Arial; font-size:small;" ></asp:Label>
       </div>
       <br />
       <div id="divUpdatedCandidateDetail">
        <div style="float: left; color:Green; font-size:small;" >List of candidates successfully 
            uploaded :<br /> </div> 
   
      <p>
    <textarea id="UpdatedCandidateDetail" readonly="readonly" rows="2" cols="10" runat="server"   style="background-repeat:repeat-x; float: left; 
	border:1px solid #d1c7ac;	width: 90%;	height: 60px;	color:#333333;	padding:3px;	margin-right:4px;
	margin-bottom:8px;	font-family:tahoma, arial, sans-serif;" name="S1"></textarea></p>
       </div> 
       <br />
        <div class="loading" align="center"> Loading. Please wait.<br />
        <br />  <img src="../../Images/spinner.gif" alt="" />
    </div>
     <div style="float: left; color:Red;  font-size:small;" >List of candidates upload failed :<br /> </div> 
      <p>
    <textarea id="uploadCandidateFaild" readonly="readonly" rows="2" cols="10" runat="server"   style="background-repeat:repeat-x;
	border:1px solid #d1c7ac;	width: 90%;	height: 60px;	color:#333333;	padding:3px;	margin-right:4px;
	margin-bottom:8px;	font-family:tahoma, arial, sans-serif;" name="S1"></textarea></p>
          </div>
    <asp:HiddenField ID="hidquerstingvalue" runat="server" />
   </form>
</body>
<script type="text/javascript" language="javascript">
    window.closeChild = function () {
        window.close();
    }
    window.onbeforeunload = closeIt;
    function closeIt() {
        window.parent.opener.disablePopup();
        //  window.close();

    }
    function disablePopup() {
        //disables popup only if it is enabled
        $("#overLay").hide();
        popupStatus = 0;
    }

    $(function () {
        var overlay = $('<div id="overlay"></div>');
        $('.close').click(function () {
            $('.popup').hide();
            overlay.appendTo(document.body).remove();
            return false;
        });

        $('.x').click(function () {
            $('.popup').hide();
            overlay.appendTo(document.body).remove();
            return false;
        });

        $('.click').click(function () {
            overlay.show();
            overlay.appendTo(document.body);
            $('.popup').show();
            return false;
        });
    });

    var querstingvalue = document.getElementById("<%=hidquerstingvalue.ClientID %>").value;
    $().ready(function () {
        if (querstingvalue == 'HRSS') {
            $("#btnUpload").hide();
            $("#uploadexcel").hide();
            $("#candidateidBulkUpload").show();
            $("#btnbulkuplodexcel").show();
            $("#divUpdatedCandidateDetail").hide();
        }
        if (querstingvalue == 'Induction') {
            $("#candidateidBulkUpload").hide();
            $("#btnbulkuplodexcel").hide();
            $("#uploadexcel").show();
            $("#btnUpload").show();
            $("#divUpdatedCandidateDetail").show();
        }
    });
   
    //this function checkeing uploade file name is valied and with out select uploadfile.
    function fnGetFile() {
        var value = $("#xlsUpload").val();
         $("overLay").show();
        if (value != "") {
            var FileExt = document.getElementById('xlsUpload').value.lastIndexOf(".xml")
            if (FileExt == -1) {
                $("#mesgfile").hide();
                $("#mesgvalidfine").show();
               
                return false;
            }
            else {
                return true;
            }
        }
        else {
            $("#mesgvalidfine").hide();
            $("#mesgfile").show();
            return false;
        }
    }

    function ShowProgress() {
        setTimeout(function () {
            var modal = $('<div />');
            modal.addClass("modal");
            $('body').append(modal);
            var loading = $(".loading");
            loading.show();
            var top = Math.max($(window).height() / 2 - loading[0].offsetHeight / 2, 0);
            var left = Math.max($(window).width() / 2 - loading[0].offsetWidth / 2, 0);
            loading.css({ top: top, left: left });
        }, 200);

    }
    var id;
    $('#DownloadTemplate').click(function () {
        id = this.id;
    });
    $('form').live("submit", function () {
        if (id != 'DownloadTemplate') {
            ShowProgress();
        }
        id = null;
    });
   </script>
</html>
     
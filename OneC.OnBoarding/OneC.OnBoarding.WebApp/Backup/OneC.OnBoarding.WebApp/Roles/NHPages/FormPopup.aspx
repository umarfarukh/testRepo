<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FormPopup.aspx.cs" Inherits="OneC.OnBoarding.WebApp.Roles.NHPages.FormPopup" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>One Cognizant-The Power Of One!</title>
    
<script type="text/javascript" src="../../Scripts/JQuery/1.8/jquery.js"></script>
<script type="text/javascript" src="../../Scripts/JQuery/1.8/jquery-ui-1.8.16.custom.min.js"></script>
<script type="text/javascript" src="../../Scripts/JQuery/1.8/indiaonboarding.js"></script>
<script type="text/javascript" src="../../../../Scripts/jquery.js"></script>
<!--<script type="text/javascript" src="../../../../Scripts/form.js"></script>-->
    <script src="../../../../Scripts/jQXB.1.1.js" type="text/javascript"></script>
    <script src="../../../../Scripts/JSON.js" type="text/javascript"></script>
</head>
<body  style="background: url(../../Images/Forms/headerbg.jpg) repeat-x repeat-y;">
    <form id="form1" runat="server">
    <div id="divFAQLoader" style="margin-left: auto; margin-right: auto; position: absolute;
        top: 200px; left: 370px;">
        <%--<img src="Images/spinner.gif" alt="Loading..." />--%>
    </div>
    <div id="headersss">
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr style="height: 50px;">
                <td valign="middle" align="left" colspan="1">
                    &nbsp;
                </td>
                <td valign="top" width="250px" align="right">
                    <div id="headcontent" style="height: 45px; font-size: 11px; color: #666; font-family: Gill Sans MT;">
              <img src="../../../../Images/formpdf.png" id="pdf_form" alt="PDF" title="PDF" />                             
              <img src="../../../../Images/formprinter.png" id="printer_form" alt="Print" title="Print"/>
              <img src="../../../../Images/formpreview.png" id="preview_form" alt="Preview" title="Preview"/>
    
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div id="divLoader">
       <iframe id="ifPopUp" width="100%" height="585px" frameborder="0" scrolling="auto"></iframe>
       
           
    </div>
    </form>
</body>
</html>
<script type="text/javascript">
    var popupURL = GetPopupURLString("PopUpURL");
    if (popupURL != null && popupURL != '')
     document.getElementById("ifPopUp").src = popupURL;

         
    

    function GetPopupURLString(strKey) {

        var urlFull = window.location.search.substring(1);
        var urlQStr = urlFull.split(strKey + "=");
        return urlQStr[1];
    }

    $().ready(function () {
        jQXB.initialize();
        jQXB.compatibilitymode = false;

        GetMaster(20, "PrefixList"); //Prefix

    });


    function GetMaster(masterCode, dataSourceName) {
        $.ajax({
            type: "post",
            url: "FormPopup.aspx/GetMaster",
            data: "{'masterCode':'" + masterCode + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {

                BindData(msg.d, dataSourceName, false);
            },
            error: function (xhr, status, textRemarks) { alert("Error " + xhr.status); }
        });
    }


//    $("#pdf_form").click(function () {

//        var htmlContent = '<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\"><html xmlns=\"http://www.w3.org/1999/xhtml\"><head></head><body><div><h2>PERSONAL ACCIDENT INSURANCE NOMINATION FORM</h2><table><tr><td>Name of the Associate</td><td>#$AssociateName$#</td></tr><tr><td>Fathers/Husbands Name(in case of married women)</td><td >#$FathersName$#</td></tr></table></div></body></html>';
//        var margin = "10";
//        var PDFName = 'Application Form';
//        var dataString = '{htmlstring:' + htmlContent + "," + 'margin:' + margin + "," + 'pdfName:' + PDFName + '}'


//        $.ajax({
//            type: "POST",
//            url: "FormPopup.aspx/ConvertHtmlTemplateFileToPdf",
//            data: dataString,
//            contentType: "application/json; charset=utf-8",
//            dataType: "json",
//            success: ReturnTrue,
//            error: ReturnFalse

//        });

//    });


//    function ReturnTrue(result) {
//        alert(result.responseText);
//    }

//    function ReturnFalse(result) {
//        alert(result.responseText);
//    }
    
 </script>
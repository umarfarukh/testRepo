/* 
************************************************
OnBoarding HTransfer Document List info script
************************************************
Author: 261671
Date: 2013-Jan-01
Purpose: Document List related information for HTransfer
************************************************
*/
/* HTransferDocs.js */
var candidateId = 0, sessionId = 0;
var dashboardMode;
var countryId;
var Mode;
var roleGroupId;
var sid;
var downloadFile;
var messageHtml = '';
var k = 0;
var firstDocflag = 0;
var onSubmitFlag = 0;
//Variable which holds list of parameters passed in query string in array object
var qs = (function (a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=');
        if (p.length != 2) continue;
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;

})(window.location.search.substr(1).split('&'));
//Initializing globally processing variables
candidateId = parseInt(qs["cand"]);
sessionId = parseInt(qs["ssid"]);
countryId = parseInt(qs["cntry"]);
dashboardMode = parseInt(qs["opmde"]);
roleGroupId = parseInt(qs["rgid"]);
//var roleId= parseInt(qs["roleid"]);
var DocListInfo = {
    delay: 200,
    delaySlow: 'slow',
    delayFast: 'fast',
    serviceUrl: '../../FormsService.aspx/',
    locationUrl: '../../',
    currentElement: '',
    eventElement: '',
    successData: '',
    Responsestatus: '',
    StatusData: '',
    GroupData: '',
    BtnStatus: [],
    BtnView: [],
    BtnViewData: '',
    AddRowData: '',
    AddTableData: '',
    UploadedSrc: '',
    DocumentName: '',
    ECMDocumentName: '',
    DownloadSrc: '',
    DocumentStatus: '',
    DocumentStatusId: '',
    CustomNotificationContent: '',
    DocumentId: '',
    DocumentPkId: '',
    UploadMessage: '',
    TableId: '',
    QGroup: '',
    YNFlag: '',
    SPMode: '',
    FormSubmissionStatus: '',
    AdditionalDocumentName: '',
    AjaxCall: function (methodData, methodUrl, ajaxMode) {
        var ajaxStatus;
        try {
            $.ajax({
                type: 'post',
                url: DocListInfo.serviceUrl + methodUrl,
                data: methodData,
                dataType: "json",
                async: false,
                cache: false,
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    if (ajaxMode == 0) {
                        DocListInfo.successData = msg.d;
                    } else if (ajaxMode == 2) {
                        ECM.response = '';
                        ECM.response = msg.d;
                    }
                    else {
                        DocListInfo.successData = JSON.parse(msg.d);

                    }
                    return ajaxStatus = true;
                },
                error: function (xhr, status, textRemarks) {
                    alert('Sorry for the inconvenience.Seems to be a problem with the server currently.Please try again.');
                    return ajaxStatus = false;
                }
            });
            return ajaxStatus;
        }
        catch (e) {
            alert(e.Message);
            return false;
        }
        methodData = '';
        methodUrl = ''

    },
    //method calls after clicking on YES.Gets the list of documents to be added into group rows
    DesignGroup: function (dataSource) {
        var groupContentData = JSON.parse(dataSource.HtmlContent).GroupData;
        var groupHtmlContent = '';
        $(groupContentData).each(function (i, list) {
            DocListInfo.AddRow(i, list);
            groupHtmlContent += DocListInfo.AddRowData; //retrieving rows for the group table
        });

        $('#' + DocListInfo.TableId).append(groupHtmlContent); //adding the content to the group table
        $('#div_' + DocListInfo.QGroup).show(); //showing the div of the group table
    },

    DesignHtml: function (dataSource) {

        var htmlContent = JSON.parse(dataSource.HtmlContent).Data; //list of documents        
        var groupcontent = JSON.parse(dataSource.HtmlContent).Group; //group related data
        var submitdata = JSON.parse(dataSource.HtmlContent).SubmitData; //submit form related data   
        DocListInfo.FormSubmissionStatus = JSON.parse(dataSource.HtmlContent).SubmitData.HTransferDocUploadStatus; //Form Completion Status
        var doccontent = '';
        doccontent += '<div class="exp_info_inner_content docs" style="margin-left:10px;">';
        doccontent += '<table cellpadding="0" class="doc_details_upload table_header" cellspacing="0" style="text-align:center;font-size:13px;width:850px;">';
        doccontent += '<tbody><tr>';
        doccontent += '<th  style="width: 57%;">Documents</th><th  style="width: 12%;">Status</th><th  style="width: 31%;"';
        doccontent += '>Actions</th>';
        doccontent += '</tr>';
        doccontent += '</tbody></table>';
        doccontent += '<div class="allcontent"><div><table cellpadding="0" id="table_1" class="pending_documents doc_details_upload doc_table_All" cellspacing="0" style="text-align: center;width:850px">';
        doccontent += '<tbody><tr class="hide_header">';
        doccontent += '<th style="width: 57%;"></th><th style="width: 12%;"></th>';
        doccontent += '<th style="width: 31%;"></th>';
        doccontent += '</tr>';
        doccontent += '</tbody></table></div>';

        /*change for HRSS STARTS*/
        //        if (roleGroupId == 1 || roleGroupId == 2) {
        //            //setRCHTMLContent();
        //            doccontent += '</div></div>';
        //            $('#docContent').append(doccontent);
        //            var rchtml = '';
        //            //rchtml += 'a<table style="width:420px;">';
        //            rchtml += '<tr>';
        //            rchtml += '<td class="design" style="text-align:left;width: 57%;"><span style="color:red;display:">* </span>ManagerLetter</td>';
        //            rchtml += '<td class="design" style="width: 12%;" id="status_99">Not Uploaded</td>';
        //            rchtml += '<td class="design" docid="999" documentId="999_99" style="width: 31%;" id="action_99">';
        //            rchtml += '<input type="button"  status="1" class="btn_ btn_upload" target="_blank" src="www.google.com" uploadSrc="www.google.com"  onclick=UploadDoc(this) value="Upload"  title="Click here to upload the document" /></td></tr>';
        //            //$('#RCDocumentContent').css('display', 'block');
        //            $('#table_1').append(rchtml);
        //        }
        /*change for HRSS ENDS*/
        //        else {
        if (roleGroupId == 6) {
            $(groupcontent).each(function (j, list) {
                //creation of tables for Spouse,Tax,I140 sections
                DocListInfo.AddTable(list.QuestionGroupId, list.Question, list.Answer, list.GroupUploadCount);
                doccontent += DocListInfo.AddTableData;
            });
            doccontent += '</div></div>';
            $('#docContent').append(doccontent);
        }
        else {
            doccontent += '</div></div>';
            $('#docContent').append(doccontent);
        }
        $(htmlContent).each(function (i, list) {
            var backGroundColor = '';
            var tableid = '';
            if (list.QuestionGroup == "1") {
                DocListInfo.AddRow(i, list); //adding rows to the first table                
                $('#table_' + list.QuestionGroup).append(DocListInfo.AddRowData);
            }
            else if (list.QuestionGroup == "2") {
                DocListInfo.AddRow(i, list); //retrieving rows for the second table
                $('#table_' + list.QuestionGroup).append(DocListInfo.AddRowData); //adding the rows to the second table
                $('#div_' + list.QuestionGroup).show(); //showing the div of second table
            }
            else if (list.QuestionGroup == "3") {
                DocListInfo.AddRow(i, list); //retrieving rows for the third table
                $('#table_' + list.QuestionGroup).append(DocListInfo.AddRowData);
                $('#div_' + list.QuestionGroup).show();
            }
            else if (list.QuestionGroup == "4") {
                DocListInfo.AddRow(i, list); //retrieving rows for the forth table
                $('#table_' + list.QuestionGroup).append(DocListInfo.AddRowData);
                $('#div_' + list.QuestionGroup).show();
            }
            else if (list.QuestionGroup == "5" || list.QuestionGroup == "6") {
                DocListInfo.AddRow(i, list); //retrieving rows for the forth table
                $('#table_1').append(DocListInfo.AddRowData);
            }

        });

        if (roleGroupId == 6) {
            var btn = '';
            var footerId = $('#footerContent');
            if (DocListInfo.FormSubmissionStatus != "3") {
                btn += ' <input class="btn_ btn_submit" type="button" subFlag=' + submitdata.CanBeSubmitted + ' onclick="saveForm(1)" id="btn_submit" value="Submit" style="width:70px;float:right;height:29px;margin-right:10px;"/>';
                btn += ' <input class="btn_ btn_save" type="button" onclick="saveForm(0)" id="btn_save" value="Save" style="width:70px;float:right;height:29px;margin-right:10px;"/>&nbsp;&nbsp;';
            }
            footerId.append(btn);
        }

        if (roleGroupId == 1 || roleGroupId == 2) {
            var btn = '';
            var footerId = $('#footerContent');
            btn += ' <input class="btn_ btn_submit" type="button" onclick="saveForm(3)" id="btn_submit" value="Save" style="width:70px;float:right;height:29px;margin-right:10px;"/>';

            footerId.append(btn);
            footerId.css({
                "left": "810 px"
            });
        }

        $('.pending_documents tbody tr:first th').each(function (i) {
            $('.table_header  tbody tr:first th').eq(i).css({ "width": $(this).width() + "px" });
        });
    },

    AddTable: function (QuestionGroupId, Question, Answer, GroupUploadCount) {
        DocListInfo.AddTableData = '';
        var tablecontent = '';
        tablecontent += '<br /><div id="div_Q' + QuestionGroupId + '_Qustn" class="divQustn"><table style="width:420px;"><tr><td style="width: 70%;"><span style="color:red;padding-right:2px;">* </span><span>' + Question + '</span></td>';
        if (Answer == '' || Answer == undefined || Answer == NaN)
            tablecontent += '<td style="width: 15%;"><input type="radio" class="radio_qustn" id="radio_' + QuestionGroupId + '_Yes" name="' + QuestionGroupId + 'Avail" value="yes_' + QuestionGroupId + '" onclick="ShowHideQustns(1,' + QuestionGroupId + ',table_' + QuestionGroupId + ',' + GroupUploadCount + ')"/>Yes</td><td style="width: 15%;"><input type="radio"  class="radio_qustn" uploadCnt="' + GroupUploadCount + '" id="radio_' + QuestionGroupId + '_No" value="no_' + QuestionGroupId + '" name="' + QuestionGroupId + 'Avail" onclick="ShowHideQustns(2,' + QuestionGroupId + ',table_' + QuestionGroupId + ',' + GroupUploadCount + ')"/>No </td></tr></table></div>';
        else if (Answer == '1')
            tablecontent += '<td style="width: 15%;"><input type="radio" class="radio_qustn" checked id="radio_' + QuestionGroupId + '_Yes" name="' + QuestionGroupId + 'Avail" value="yes_' + QuestionGroupId + '" onclick="ShowHideQustns(1,' + QuestionGroupId + ',table_' + QuestionGroupId + ',' + GroupUploadCount + ')"/>Yes</td><td style="width: 15%;"><input type="radio" class="radio_qustn" uploadCnt="' + GroupUploadCount + '" id="radio_' + QuestionGroupId + '_No" value="no_' + QuestionGroupId + '" name="' + QuestionGroupId + 'Avail" onclick="ShowHideQustns(2,' + QuestionGroupId + ',table_' + QuestionGroupId + ',' + GroupUploadCount + ')"/>No</td></tr></table></div> ';
        else if (Answer == '0')
            tablecontent += '<td style="width: 15%;"><input type="radio" class="radio_qustn" id="radio_' + QuestionGroupId + '_Yes" name="' + QuestionGroupId + 'Avail" value="yes_' + QuestionGroupId + '" onclick="ShowHideQustns(1,' + QuestionGroupId + ',table_' + QuestionGroupId + ',' + GroupUploadCount + ')"/>Yes</td><td style="width: 15%;"><input type="radio" class="radio_qustn" checked uploadCnt="' + GroupUploadCount + '" id="radio_' + QuestionGroupId + '_No" value="no_' + QuestionGroupId + '" name="' + QuestionGroupId + 'Avail" onclick="ShowHideQustns(2,' + QuestionGroupId + ',table_' + QuestionGroupId + ',' + GroupUploadCount + ')"/>No</td></tr></table></div> ';
        tablecontent += '<div id="div_' + QuestionGroupId + '" class="exp_info_inner_content qustn_grp docs">';
        tablecontent += '<table cellpadding="0" id="table_' + QuestionGroupId + '" class="doc_details_upload pending_documents grp_table doc_table_' + QuestionGroupId + '" cellspacing="0"  style="text-align: center;width:850px;background-color:#efefef;margin-left:0px;">';
        tablecontent += '<tbody></tbody></table></div><br/><br/>';

        DocListInfo.AddTableData = tablecontent;
    },

    //method to add new rows
    AddRow: function (i, list) {
        var additonalDocumentsFlag = 0;
        DocListInfo.AddRowData = '';
        i = parseInt(i) + 1;
        var trcontent = '';
        trcontent += '<tr  id=doc' + list.DocumentId + '_' + i + '  class="doc' + list.DocumentId + ' doc' + list.DocumentId + '_' + i + '" pkid=' + list.DocumentPkId + ' >';
        trcontent += '<td class="design" style="text-align: left;width: 57%;">' + ((list.IsRemoveAvailable == 'true') ? "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" : "") + '<span style="color:red;display:' + ((list.IsMandatory == 'true') ? "inline-block" : "none") + ';padding-right:2px;">* </span>' + list.DocumentName;
        if (list.QuestionGroup == 6 && (roleGroupId == 1 || roleGroupId == 2)) {
            if (list.DocumentRemarks == null || list.DocumentRemarks == undefined || list.DocumentRemarks == '') {
                trcontent += '<input type=text class=tbForm id=text_docname_' + i + '></input></td>';
            }
            else {
                trcontent += '<input type=text class=tbForm value="' + list.DocumentRemarks + '" id=text_docname_' + i + '></input></td>';
            }
            additonalDocumentsFlag = 1;
        }
        else {
            trcontent += '</td>';
        }
        trcontent += '<td class="design" style="width: 12%;"';
        trcontent += 'id="status_' + i + '">' + list.DocumentStatus + '</td>';

        trcontent += '<td class="design" docname=' + list.DocumentName + ' additonalDocumentsFlag=' + additonalDocumentsFlag + ' docid=' + list.DocumentId + ' documentId=' + list.DocumentId + '_' + i + ' style="width: 31%;" id="action_' + i + '"';
        trcontent += '>';
        DocListInfo.BtnViewData = '';
        DocListInfo.DocumentName = '';
        DocListInfo.UploadedSrc = list.URL;
        DocListInfo.DocumentName = list.DocumentName;
        DocListInfo.ECMDocumentName = list.ECMDocumentName;
        DocListInfo.DownloadSrc = list.DocumentSrc;
        DocListInfo.DocumentStatus = list.DocumentStatus;
        DocListInfo.DocumentStatusId = list.DocumentStatusId;
        DocListInfo.CustomNotificationContent = list.CustomNotificationContent;
        DocListInfo.BtnView.push(list.IsDownloadAvailable, list.IsUploadAvailable, list.IsViewAvailable, list.IsAddAvailable, list.IsRemoveAvailable, list.FileName, list.FileNameToolTip);
        DocListInfo.StatusBtn();
        trcontent += DocListInfo.BtnViewData;
        trcontent += '</td>';
        trcontent += '</tr>';
        DocListInfo.AddRowData = trcontent;
    },
    //method to create buttons available in action TD column
    StatusBtn: function () {

        var data = '';
        //        if (DocListInfo.FormSubmissionStatus != "3") {
        if (DocListInfo.BtnView[0] == "true") {
            data += '<a  class="downloadFile btn_download" ecmDocumentName="' + DocListInfo.DownloadSrc + '" viewSrc="" documentName="' + DocListInfo.DocumentName + '" onclick=DownloadDoc(this)  msgContent="' + ((DocListInfo.CustomNotificationContent == undefined) ? 0 : 1) + '" style="cursor:pointer;" title="' + DocListInfo.CustomNotificationContent + '"><img src="' + DocListInfo.locationUrl + 'Images/Bgv/download_btn.png" alt="download" style="vertical-align:middle;height:30px;" /></a>'
        }
        //        }
        //        if (DocListInfo.FormSubmissionStatus != "3") {
        if (DocListInfo.BtnView[1] == "true") {
            data += '<input type="button"  status="1" class="btn_ btn_upload"  uploadSrc="' + DocListInfo.UploadedSrc + '"  onclick=UploadDoc(this) value="Upload"  title="Click here to upload the document" />&nbsp;';
        }
        //        }
        if (DocListInfo.BtnView[2] == "true") {
            if (DocListInfo.DocumentStatusId == "1")
                data += '<input type="button" status="4" class="btn_ downloadFile btn_view"  value="' + DocListInfo.BtnView[5] + '"  viewSrc="" onclick=DownloadDoc(this) ecmDocumentName = "' + DocListInfo.ECMDocumentName + '" title="' + DocListInfo.BtnView[6] + '"/>&nbsp;';
        }
        //        if (DocListInfo.FormSubmissionStatus != "3") {
        if (DocListInfo.BtnView[4] == "true") {
            if (DocListInfo.DocumentStatusId != "1")
                data += '<input type="button" value="-" status="5" class="btn_ar RemoveDoc" onclick=RemoveDoc(this)   title="Click here to remove the document"/>&nbsp';
        }
        else if (DocListInfo.BtnView[3] == "true") {
            data += '<input type="button" value="+" status="2" class="btn_ar AddDoc" onclick = AddDoc(this)   title="Click here to add another document"/>&nbsp;';
        }
        //        }

        DocListInfo.BtnView = [];
        DocListInfo.BtnViewData = data;
    }
}

var ECM = {
    documentName: '',
    documentId: 0,
    popupContent: '',
    onComplete: '',
    serviceUrl: '../../FormsService.aspx/',
    response: '',
    status: 0,
    documentStatus: 0,
    IsMandatory: 0,
    delay: 200,
    url: '../../',
    currentElement: '',
    saveMode: 0,
    Pk_CandidateDocumentUploadDetail: 0,
    refreshPage: 0,
    CheckIn: function () {
    },
    Upload: function (url, docId, openMode, uploadNote, saveMode, pkId) { // openMode 1 -- DOC // saveMode 1 --> document
        if (openMode == 1) {
            ECM.documentId = docId;
            ECM.Pk_CandidateDocumentUploadDetail = pkId;
        }
        if (saveMode != null && saveMode != NaN) {
            ECM.saveMode = saveMode;
        }
        var popupContent = '';
        popupContent += "<div id='upload_container' style='width:500px'>";
        popupContent += '<a id="spinner" style="position:absolute;z-index:99999;top:100px;left:200px;display:block;"><img src="../../Images/spinner_1.gif" /></a>';
        popupContent += "<iframe id='uploadFrameLoader' width='480px' height='350px'    frameborder='0' scrolling='no' src='" + url + "' style='margin-top:15px;overflow:hidden;*margin-left:-5px;'></iframe>";
        if (uploadNote != undefined && uploadNote != null) {
            popupContent += "<div id='uploadNote' style='height:40px;text-align:left;font-weight:bold;margin-top: -30px;margin-left: 10px;font-size:12px;font-style:italic;color:black;'>" + $.trim(uploadNote).toString() + "</div>";
        }
        popupContent += "<input id='StatusCode' type='hidden' value='' />";
        popupContent += "<input id='StatusMessage' type='hidden' value='' />";
        popupContent += "<input id='UtilStatusMessage' type='hidden' value='' />";
        popupContent += "<input id='UtilStatus' type='hidden' value='' />";
        popupContent += '</div>';
        $.when(ECM.PopUpWindow(0, popupContent, 0, 480, 200, 50)).done(function () {
            $('#uploadFrameLoader').load(function () {
                $('#spinner').hide();
            });
        });
        ECM.refreshPage = saveMode;
    },

    ConformBox: function (alertType, msgHeader, msgContent, okBtnTxt, cancelBtnTxt, fnToCall, callType) {
        var $popupContent = '<div id="popup_container1" style="position:relative;width:450px;vertical-align:middle;font-size:1.1em;margin-top:10px;" >';
        $popupContent += '<div id="pop_heading" style="height:30px;line-height:30px;background:#22506f;color:white;border-top-right-radius:8px;border-top-left-radius:8px;text-align:left;padding-left:10px">' + msgHeader + '</div>'
        $popupContent += '<div id="pop_comment" style="background:white;border:2px solid #22506f;border-bottom-right-radius:8px;border-bottom-left-radius:8px;padding-left:10px;padding-top:15px;line-height:1.2em;"><p>' + msgContent + '</p><br/>';
        if (alertType == 0) {
            $popupContent += '<input  value="' + okBtnTxt + '" type="button" returnVal="1" callType=' + callType + ' name="OK" class="action_btn" style="background:#22506f;color:white;height:20px;cursor:pointer;text-align:center;border-radius:2px;margin-right:5px;float:left;padding-left:4px;padding-right:4px;margin-bottom:10px;"/>';
        }
        $popupContent += '<input  value="' + cancelBtnTxt + '" type="button"  returnVal="0" name="Cancel" callType=' + callType + ' class="action_btn" style="background:#22506f;color:white;height:20px;cursor:pointer;text-align:center;border-radius:2px;padding-left:4px;padding-right:4px;margin-bottom:10px;"/>';
        $popupContent += '</div></div>';
        ECM.popupContent = $popupContent;
        ECM.onComplete = fnToCall;
        ECM.PopUpWindow(1, ECM.popupContent, '', '', 0, 0);
    },

    Msg: function (SendCode, SendMessage, SendUtilMessage, SendStatus) {
        ECM.documentName = '';
        var StatusFlag = 0;
        var responseMessage = SendMessage;
        var mode = 4;
        responseMessage = responseMessage.replace(/\\n/g, " ");
        responseMessage = responseMessage.replace(/\\/g, "\\\\");
        responseMessage = responseMessage.replace(/'/g, "\\\'");
        responseMessage = responseMessage.replace(/"/g, "\\\"");

        SendUtilMessage = SendUtilMessage.replace(/\\n/g, " ");
        SendUtilMessage = SendUtilMessage.replace(/\\/g, "\\\\");
        SendUtilMessage = SendUtilMessage.replace(/'/g, "\\\'");
        SendUtilMessage = SendUtilMessage.replace(/"/g, "\\\"");
        if (SendCode != '' && SendCode != undefined && SendCode != NaN && SendMessage != '' && SendMessage != undefined && SendMessage != NaN && SendUtilMessage != '' && SendUtilMessage != undefined && SendUtilMessage != NaN) {
            if ($('#StatusCode').val() == 0) {
                StatusFlag = 1;
            } else {
                StatusFlag = 2;
            }

            ECM.documentName = SendMessage.split("'")[1];
            var data = '{';
            data += "'candidateId':" + candidateId + ",";
            data += "'sessionId':" + sessionId + ",";
            data += "'roleGroupId':" + roleGroupId + ",";
            data += "'documentId':" + ECM.documentId + ",";
            data += "'ecmDocumentName':'" + SendMessage.split("'")[1] + "',";
            data += "'pk_CandidateDocumentUploadDetail':" + ECM.Pk_CandidateDocumentUploadDetail + ",";
            data += "'statusFlag':" + StatusFlag + ",";
            data += "'responseMessage':'" + responseMessage + "',";
            data += "'responseCode':" + SendCode + ",";
            data += "'fileName':'" + $.trim(SendUtilMessage.replace('File', '').split('.')[0]) + "',";
            data += "'fileType':'" + SendStatus.replace('File', '').split('.')[1].split(' ')[0] + "',";
            data += "'additionalDocumentName':'" + DocListInfo.AdditionalDocumentName + "',";
            data += "'spmode':" + mode;
            data += "}";
            $.when(DocListInfo.AjaxCall(data, 'SaveHTransferUploadedDocName', 0)).done(function (retStatus) {
                if (retStatus == true) {
                    $('#btn_submit').attr('subFlag', DocListInfo.successData.CanBeSubmitted);

                    //getting the contents for the buttons in td
                    var o = DocListInfo.currentElement.parent('td').find('input')[0];
                    var tdcontent = DocListInfo.currentElement.parents('tr').find('td');
                    tdcontent[1].innerHTML = DocListInfo.successData.DocumentStatus;
                    var downloadbtn = tdcontent.find('a.downloadFile');
                    var downlodavailable = (downloadbtn.length == 1) ? "true" : "false";
                    var uploadavail = "true", viewavail = "true";
                    var addavailable = (tdcontent.find('input').hasClass('AddDoc') == true) ? "true" : "false";
                    if (downlodavailable == "true") {
                        DocListInfo.DownloadSrc = downloadbtn.attr('ecmDocumentName');
                        DocListInfo.DocumentName = downloadbtn.attr('DocumentName');
                        DocListInfo.CustomNotificationContent = downloadbtn.attr('title');
                    }
                    DocListInfo.UploadedSrc = DocListInfo.successData.UploadURL;
                    DocListInfo.ECMDocumentName = SendMessage.split("'")[1];
                    DocListInfo.DocumentStatusId = "1";
                    //refreshing the td with buttons
                    var uploadedfilename = $.trim(SendUtilMessage.replace('File', '').split('.')[0]);
                    uploadedfilename = uploadedfilename.substring(0, 6);
                    DocListInfo.BtnView.push(downlodavailable, uploadavail, viewavail, addavailable, "false", uploadedfilename, $.trim(SendUtilMessage.replace('File', '').split('.')[0]));
                    DocListInfo.StatusBtn();
                    tdcontent[2].innerHTML = DocListInfo.BtnViewData;
                    if ($('#radio_' + DocListInfo.successData.QuestionGroupId + '_No').length == 1)
                        $('#radio_' + DocListInfo.successData.QuestionGroupId + '_No').attr('uploadCnt', 1);
                    ECM.onComplete = '';
                }
            });
        } else {
            ECM.PopUpClose(0);
            MsgboxAlert(sessionId, 2, 0, null, SendStatus);
        }
    },
    PopUpWindow: function (popUpType, popUpContent, popUpHeight, popUpWidth, popUpLeft, popUpTop) {
        //removing duplicate's start
        $(".uploadContentWrapper").remove();
        $('#overLay').remove();
        // end
        var windowHeight = $(document).height();
        var windowWidth = $(document).width();
        var $backgroundOverLay = $('<div id="overLay"/>');
        var windowLeft = (popUpLeft != 0) ? popUpLeft : (windowWidth / 3);
        var windowTop = (popUpTop != 0) ? popUpTop : ((windowHeight / 3));
        $('body').prepend($backgroundOverLay);
        $("#overLay").css({
            "opacity": "0.7"
        });
        $("#overLay").hide(0).delay(ECM.delay).fadeIn();

        if (popUpType == 0) {
            var closeBox = '<table width="102%" border="0" cellspacing="0" cellpadding="0" style="width:102%;position:absolute;*width:102%;*z-index:9999">';
            closeBox += '<tr><td style="border:none;"><a id="_close" class="rejectCancel"   style="float:right;background:url(../../Images/Survey/close.png) no-repeat; width:25px; height:25px; border:none; outline:none; position:relative; z-index:100;"></a></td></tr>'
            closeBox += '</table>';
            var $popupData = $('<div class="uploadContentWrapper" style="z-index:999999;display:none;" />').html(popUpContent).prepend(closeBox);
        } else {
            var $popupData = $('<div class="uploadContentWrapper" style="z-index:999999;display:none;" />').html(popUpContent);
        }

        $('body').prepend($popupData);
        $('.uploadContentWrapper').hide(0).delay(ECM.delay).fadeIn();

        //for center position 

        $('.uploadContentWrapper').css({
            "position": "absolute",
            "top": windowTop + "px",
            "left": windowLeft + "px",
            "height": popUpHeight + "px",
            "width": popUpWidth + "px"
        });


        //only need force for IE6	
        $("#overLay").css({
            "height": windowHeight
        });
        return false;

    },
    PopUpClose: function (mode) {
        if (mode == 0) {
            $('#overLay').fadeOut(ECM.Delay);
            $('.uploadContentWrapper').fadeOut(ECM.Delay);
        }
        else {
            window.frameElement.parentNode.style.display = "none";
            window.frameElement.parentNode.nextSibling.style.display = "none";
        }
        if (ECM.refreshPage == 1) {

        }
        return false;
    },
    GetUrl: function (documentName) {
        ECM.response = '';
        var data = "{";
        data += "'sessionId':" + sessionId + ",";
        data += "'ecmDocumentName':'" + documentName.toString() + "'";
        data += "}";
        $.when(DocListInfo.AjaxCall(data, 'GetDocumentUrl', 2)).done(function (retStatus) {
            if (retStatus === true) {
                ECM.response.toString();
            }
        });
    }
}

$(document).ready(function () {

    //method to form the html page content
    GetHtmlContent();

    //disabling the radio checking option if candidate already submitted the form
    if (DocListInfo.FormSubmissionStatus == "3") {
        $(':radio').attr('disabled', 'disabled');
    }

    //hiding the question group divs initially if there are no rows in the group tables
    $('.qustn_grp').hide();

    //if there are rows in group table, showing the div of the group table
    $('.grp_table').each(function (i) {
        if ($(this)[0].rows.length != 0) {
            $('#div_' + ($(this)[0].id.split('_')[1])).show();
        }
    });

    $('body').on("click", ".rejectCancel", function () {
        ECM.PopUpClose(0);
    })
    .on("click", ".action_btn", function () {
        ECM.PopUpClose(0);

        //method for submitting the Document Section
        if ($(this).attr('returnVal') == 1 && $(this).attr('callType') == 1) {

            //need to call the submit SP and return the message Success if uploaded all.
            //Need to Disable the Submit button and Upload buttons also. 
            var data = "{";
            data += "'sessionId':" + sessionId + ",";
            data += "'candidateId':" + candidateId + ",";
            data += "'roleGroupId':" + roleGroupId + ",";
            data += "'spmode':" + DocListInfo.SPMode;
            data += "}";
            var docsMsg = "";
            $.when(DocListInfo.AjaxCall(data, 'SubmitHTransferDocuments')).promise().done(function (response) {
                if (response == true) {
                    $(JSON.parse(DocListInfo.successData.HtmlContent).MessageData).each(function (i, list) {
                        docsMsg += list.Message + "";
                    });

                    //restricting the user from uploading /submitting the details after succesful 
                    $('#btn_submit').remove();
                    $('#btn_save').remove();
                    //                    $('.btn_download').remove();
                    //                    $('.btn_upload').remove();
                    //                    $('.AddDoc').remove();
                    $(':radio').attr('disabled', 'disabled');
                    //MsgboxSuccess(docsMsg);
                    $.alerts.SubmitSuccess(docsMsg);
                    onSubmitFlag = 1;
                }
            });
        }

        //respective yes has to be checked after clicking on NO cancel
        else if ($(this).attr('returnVal') == 0 && $(this).attr('callType') == 2) {
            $('#radio_' + DocListInfo.QGroup + '_Yes').attr('checked', 'checked');
        }

        //method for deleting the documents after clicking on selecting NO radio and confirmation
        else if ($(this).attr('returnVal') == 1 && $(this).attr('callType') == 2) {
            var data = "{";
            data += "'sessionId':" + sessionId + ",";
            data += "'candidateId':" + candidateId + ",";
            data += "'documentId':0,";
            data += "'docPkId':0,";
            data += "'roleGroupId':" + roleGroupId + ",";
            data += "'questionGroupId':" + DocListInfo.QGroup + ",";
            data += "'spmode':" + DocListInfo.SPMode + ",";
            data += "'ynflag':" + DocListInfo.YNFlag;
            data += "}";
            $.when(DocListInfo.AjaxCall(data, 'InsertDeleteDocument', 0)).promise().done(function (response) {
                if (response == true) {
                    $("#table_" + DocListInfo.QGroup + " tr").remove();
                    $('#div_' + DocListInfo.QGroup).hide();
                    $('#radio_' + DocListInfo.QGroup + '_No').attr('uploadCnt', 0);
                    $('#btn_submit').attr('subFlag', DocListInfo.successData.CanBeSubmitted);
                    MsgboxAlert(sessionId, 4, 0, null, "Documents deleted successfully.");
                }
            });
        }

        //method to upload the document after clicking on OK of the message which will be shown for documents which has to be filled and uploaded.
        else if ($(this).attr('returnVal') == 1 && $(this).attr('callType') == 3) {
            ECM.Upload(DocListInfo.UploadedSrc, DocListInfo.DocumentId, 1, DocListInfo.UploadMessage, '1', DocListInfo.DocumentPkId);
        }
    });
});


function GetHtmlContent() {
    var spMode = 1;
    if (roleGroupId == 1 || roleGroupId == 2)
        spMode = 7;
    var data = "{";
    data += "'sessionId':" + sessionId + ",";
    data += "'candidateId':" + candidateId + ",";
    data += "'spmode':" + spMode + ",";
    data += "'roleGroupId':" + roleGroupId;
    data += "}";
    $.when(DocListInfo.AjaxCall(data, 'GetUploadDocumentList')).promise().done(function (response) {
        if (response == true) {
            DocListInfo.DesignHtml(DocListInfo.successData);
            messageHtml = JSON.parse(DocListInfo.successData.HtmlContent).SubmitData.MessageHtml;
        }
    });
    SetMessageContent();
}

//method for inserting the document in html table and DB table
function AddDoc(event) {

    var bgcolor = '';
    var obj = $(event).parents('tr'); //retrieving the contents of TR which is clicked
    var tdcontent = obj.find('td'); //finding the TDs in TR
    //var documentName = tdcontent[0].innerHTML.replace('*', ''); //document name    
    var documentName;
    //if textContent for firefox.innerText will not available in Firefox
    if ((tdcontent[0].textContent) && (typeof (tdcontent[0].textContent) != "undefined")) {
        documentName = tdcontent[0].textContent.replace('*', ''); ;
    }
    else {
        documentName = tdcontent[0].innerText.replace('*', ''); ;
    }

    var btncontent = tdcontent.find('input'); //finding the input tags in TR
    var TableContent = $(event).parents('table'); //getting all the table contents which was clicked
    var TrId = obj.attr('id'); //id of the tr in which button clicked
    var docno = TrId.split('_')[0]; //splitting the id ex:doc1_2 ,where 1 indicates document id and 2 indicates a unique no for that document set
    var SameTrCls = "tr." + docno; //checking the documents with the same class
    var SameTrs = TableContent.find(SameTrCls); //getting all the documents with same class name
    var SameTrLen = parseInt(TableContent.find(SameTrCls).length); //knowing the length of all the documents with same class name
    var MaxTrId = "#" + SameTrs[SameTrLen - 1].id; //finding the maximum ID in the list of same document tr's
    var NewTrId = parseInt(SameTrs[SameTrLen - 1].id.split('_')[1]) + 1; //creating the new TR
    var RemoveObj = $(SameTrCls).find('td').find('input');
    var additionalDocFlag = $(event).parent('td').attr('additonalDocumentsFlag');
    var CurrentTRVwObj = $(event).parents('tr').find('td').find('input').hasClass('btn_view');
    if (CurrentTRVwObj == false) {
        MsgboxAlert(sessionId, 3, 0, null, 'Please upload the " ' + documentName + ' " and add new documents.');
    }
    else if (RemoveObj.hasClass('RemoveDoc') == true) {
        MsgboxAlert(sessionId, 3, 0, null, 'Please upload the " ' + documentName + ' " and add new documents.');
    }
    else {
        var documentid = $(event).parent('td').attr('documentId'); //finding an attribute documentId in TD
        var docid = documentid.split('_')[0]; //splitting the documentId ex:doc1_2,where  1 indicates document id and 2 indicates a unique no for that document set
        var i = parseInt(documentid.split('_')[1]);
        var mode = 2; //mode 1 for Inserting a row into table,2 for deleting row from table    
        var candidateDocPkId = "0";
        var data = "{";
        data += "'sessionId':" + sessionId + ",";
        data += "'candidateId':" + candidateId + ",";
        data += "'roleGroupId':" + roleGroupId + ",";
        data += "'documentId':" + docid + ",";
        data += "'docPkId':" + candidateDocPkId + ",";
        data += "'ynflag':0,";
        data += "'questionGroupId':0,";
        data += "'spmode':" + mode;
        data += "}";
        $.when(DocListInfo.AjaxCall(data, 'InsertDeleteDocument', 0)).promise().done(function (response) {
            if (response == true) {
                $('#btn_submit').attr('subFlag', DocListInfo.successData.CanBeSubmitted);
                candidateDocPkId = DocListInfo.successData.Pk_CandidateDocumentUploadDetail;
                DocListInfo.UploadedSrc = DocListInfo.successData.UploadURL;
                DocListInfo.DocumentStatus = DocListInfo.successData.DocumentStatus;
                DocListInfo.DocumentName = DocListInfo.successData.DocumentName;
                //Forming the new rows button contents
                //Document Name column
                var docNameCol = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red;display:' + ((DocListInfo.successData.IsMandatory == "1") ? "inline-block" : "none") + ';padding-right:2px;">* </span>' + DocListInfo.DocumentName;
                //upload button content                        
                var uploadcontent = tdcontent.find('input.btn_upload').clone(true); //getting the upload content from the td which is clicked and cloning it and updating the URL
                uploadcontent.attr('uploadSrc', DocListInfo.UploadedSrc);
                uploadcontent = uploadcontent[0].outerHTML;
                //remove button content
                var removecontent = '<input type="button" value="-" status="5" class="btn_ar RemoveDoc" onclick=RemoveDoc(this)   title="Click here to remove the document"/>&nbsp';
                //new tr content to be added
                var newcontent = '<tr ' + bgcolor + ' pkid=' + candidateDocPkId + ' id=doc' + docid + '_' + NewTrId + ' class="doc' + docid + ' doc' + docid + '_' + i + '">';
                if (additionalDocFlag != "1")
                    newcontent += '<td class="design" style="text-align:left;width: 57%;">' + docNameCol + '</td>';
                else
                    newcontent += '<td class="design" style="text-align:left;width: 57%;">' + docNameCol + '<input type=text class=tbForm id=text_docname_' + i + '></input></td>';
                newcontent += '<td class="design" style="width: 12%;">' + DocListInfo.DocumentStatus + '</td><td class="design" additonalDocumentsFlag=' + additionalDocFlag + ' documentid=' + docid + '_' + i + ' style="width: 31%;" id="action_' + i + '">' + uploadcontent + '&nbsp;' + removecontent + '</td></tr>';
                // adding a tr at the end of the each document set.(Using the maximum tr id.Adding after maximum tr id for that document set)
                $(MaxTrId).after(newcontent);
                DocListInfo.DocumentName = '';
                DocListInfo.DocumentStatus = '';
                DocListInfo.UploadedSrc = '';
            }
        });
    }
}

//method to delete a row from html table as well as from DB table
function RemoveDoc(event) {
    var pkid = $(event).parents('tr').attr('pkid');
    var mode = 3;
    var documentid = $(event).parent('td').attr('documentId'); //finding an attribute documentId in TD
    var docid = documentid.split('_')[0]; //splitting the documentId ex:doc1_2,where  1 indicates document id and 2 indicates a unique no for that document set
    var data = "{";
    data += "'sessionId':" + sessionId + ",";
    data += "'candidateId':" + candidateId + ",";
    data += "'roleGroupId':" + roleGroupId + ",";
    data += "'documentId':" + docid + ",";
    data += "'docPkId':" + pkid + ",";
    data += "'ynflag':0,";
    data += "'questionGroupId':0,";
    data += "'spmode':" + mode;
    data += "}";
    $.when(DocListInfo.AjaxCall(data, 'InsertDeleteDocument', 0)).promise().done(function (response) {
        if (response == true) {
            $('#btn_submit').attr('subFlag', DocListInfo.successData.CanBeSubmitted);
            $(event).parents('tr').eq(0).remove();
        }
    });
}

//method to upload the document
function UploadDoc(event) {

    DocListInfo.AdditionalDocumentName = "";
    var obj = $(event).parents('tr');
    var tdcontent = obj.find('td');
    var btncontent = tdcontent.find('input');
    var documentid = $(event).parent('td').attr('documentId');
    var docid = documentid.split('_')[0];
    var i = parseInt(documentid.split('_')[1]) + 1;
    //pk id of the document
    var pkid = $(event).parents('tr').attr('pkid'); //pk id of the document
    var downloadbtn = tdcontent.find('a.downloadFile'); //checking whether download button is there

    var additionalDocFlag = $(event).parent('td').attr('additonalDocumentsFlag'); //flag =1 if td contains additional document
    if (additionalDocFlag != 0) {
        var additionalDocName = tdcontent.find('input.tbForm').val(); //retrieving the text box value
        DocListInfo.AdditionalDocumentName = additionalDocName; //setting the text box value to a variable to be inserted into DB after succe
    }
    if (additionalDocFlag == "1" && (additionalDocName == "" || additionalDocName == undefined || additionalDocName == null)) {
        MsgboxAlert(sessionId, 3, 0, null, 'Please enter the document name before uploading the document');
    }
    else {
        DocListInfo.Responsestatus = $(event).attr('status');
        DocListInfo.currentElement = $(event);
        DocListInfo.currentElement.attr('viewSrc', '');
        DocListInfo.DocumentId = docid;
        DocListInfo.UploadedSrc = $(event).attr('uploadSrc');
        DocListInfo.DocumentPkId = pkid;
        var documentName;
        //if textContent for firefox.innerText will not available in Firefox
        if ((tdcontent[0].textContent) && (typeof (tdcontent[0].textContent) != "undefined")) {
            documentName = tdcontent[0].textContent;
        }
        else {
            documentName = tdcontent[0].innerText;
        }

        DocListInfo.UploadMessage = 'Please upload ' + $.trim(documentName.replace(/&nbsp;/g, '').replace('*', ''));
        var downlodavailable = (downloadbtn.length == 1) ? "true" : "false";
        if (downlodavailable == 'true') {
            ECM.ConformBox(0, "Confirmation", 'Please ensure you have filled all of the mandatory details in the form before uploading it.', "OK", "CANCEL", "", "3");
        }
        else {
            ECM.Upload(DocListInfo.UploadedSrc, DocListInfo.DocumentId, 1, DocListInfo.UploadMessage, '1', DocListInfo.DocumentPkId);
        }
    }
}

function DownloadDoc(event) {
    var obj = $(event);
    if (obj.attr('msgContent') == 1) {
        downloadFile = obj.attr('ecmDocumentName');

        //adding the download functionality directly without any message.
        ECM.GetUrl(downloadFile);
        window.open(ECM.response, "_blank", '', '');
        downloadFile = '';
        //var content = '<a  class="downloadFile" style="cursor:pointer;text-decoration:underline;" onclick="DownloadFile();">' + obj.attr('title') + '</a>';
        //MsgboxAlert(sessionId, 4, 0, null, content);
    } else {
        if (obj.attr('viewSrc').length == 0) {
            ECM.GetUrl(obj.attr('ecmDocumentName'));
            obj.attr('viewSrc', ECM.response);
        }
        window.open(obj.attr('viewSrc'), "_blank", '', '');
    }
}


var DownloadFile = function () {
    ECM.GetUrl(downloadFile);
    window.open(ECM.response, "_blank", '', '');
    downloadFile = '';
}

//for hiding and showing tables based on yes /no answers
function ShowHideQustns(flag, Qgroup, table, GroupUploadCount) {

    var secname = Qgroup;
    var tableid = 'table_' + secname;
    var trData = $('#table_' + secname).find('tr');
    var grpUploadCnt = GroupUploadCount;
    var mode = 5;
    //if clicked on YES, documents will be inserted into table and same will added as TRs in html table

    if (flag == 1) {
        //restricting from insertion of documents into table again 
        if (trData.length != 0) {
        }
        else {
            var data = "{";
            data += "'sessionId':" + sessionId + ",";
            data += "'candidateId':" + candidateId + ",";
            data += "'roleGroupId':" + roleGroupId + ",";
            data += "'questionGroupId':" + Qgroup + ",";
            data += "'spmode':" + mode + ",";
            data += "'ynflag':" + flag;
            data += "}";
            $.when(DocListInfo.AjaxCall(data, 'GetGroupDocumentList')).promise().done(function (response) {
                if (response == true) {
                    $('#btn_submit').attr('subFlag', JSON.parse(DocListInfo.successData.HtmlContent).SubmitData.CanBeSubmitted);
                    DocListInfo.TableId = tableid;
                    DocListInfo.QGroup = Qgroup;
                    DocListInfo.DesignGroup(DocListInfo.successData);
                    $('#div_' + secname).show();
                }
            });

        }
    }
    //if clicked on NO,documents will be deleted from DB table as well as html table
    else if (flag == 2) {
        //if none of the documents uploaded in this section, deleting the documents directly without asking confirmation from user
        grpUploadCnt = $('#radio_' + secname + '_No').attr('uploadCnt');
        DocListInfo.QGroup = Qgroup;
        DocListInfo.SPMode = mode;
        DocListInfo.YNFlag = flag;
        if (grpUploadCnt == "0") {
            var mode = 5;
            var data = "{";
            data += "'sessionId':" + sessionId + ",";
            data += "'candidateId':" + candidateId + ",";
            data += "'documentId':0,";
            data += "'docPkId':0,";
            data += "'roleGroupId':" + roleGroupId + ",";
            data += "'questionGroupId':" + DocListInfo.QGroup + ",";
            data += "'spmode':" + DocListInfo.SPMode + ",";
            data += "'ynflag':" + DocListInfo.YNFlag;
            data += "}";
            $.when(DocListInfo.AjaxCall(data, 'InsertDeleteDocument', 0)).promise().done(function (response) {
                if (response == true) {
                    $('#btn_submit').attr('subFlag', DocListInfo.successData.CanBeSubmitted);
                    $("#table_" + DocListInfo.QGroup + " tr").remove();
                    $('#div_' + DocListInfo.QGroup).hide();
                }
            });
        }
        //if any of the documents uploaded in this section, deleting the documents only after asking confirmation from user
        else {
            ECM.ConformBox(0, "Confirmation", 'Please note: By confirming “No” the documents that you have<br/> uploaded(if any) will be deleted.<br/>Please click “OK” to delete or “CANCEL” to go back. ', "OK", "CANCEL", "", "2");
        }
    }
}


//method for Saving the Form (flag 2) and Submitting the Form(Flag 1)
function saveForm(flag) {
    //For Submit button
    if (flag == 1) {

        DocListInfo.SPMode = 6;
        //function to submit the section

        //if any of the mandatory is not submitted,showing user the list of not submitted mandatory documents and questions                          
        if ($('#btn_submit').attr('subFlag') == "0") {
            var data = "{";
            data += "'sessionId':" + sessionId + ",";
            data += "'candidateId':" + candidateId + ",";
            data += "'roleGroupId':" + roleGroupId + ",";
            data += "'spmode':" + DocListInfo.SPMode;
            data += "}";
            $.when(DocListInfo.AjaxCall(data, 'SubmitHTransferDocuments')).promise().done(function (response) {
                if (response == true) {
                    //if documents yet to submit
                    //show the message of mandatory documents
                    var docsMsg = "";
                    $(JSON.parse(DocListInfo.successData.HtmlContent).MessageData).each(function (i, list) {
                        docsMsg += list.Message + "<br/>";
                    });
                    MsgboxAlert(sessionId, 7, 0, null, docsMsg);
                }
            });
        }

        else {
            ECM.ConformBox(0, "Confirmation", 'Please note that you will not be able to view or edit the information or <br/> re-upload the documents after submitting the details <br/> Are you sure you want to submit?', "OK", "CANCEL", "", "1");
        }

    }
    //for Save button
    else if (flag == 0) {
        MsgboxAlert(sessionId, 1, 0, null, "Form saved successfully.");
    }
    else if (flag == 3) {
        $.alerts.SubmitSuccess("Form saved successfully.");
    }
}
function SetMessageContent() {
    $('#MessageContent').html('<ul style="padding-left: 20px;font-size: 12px">' + messageHtml + '</ul>');
    if ($.trim(messageHtml) != "") {
        $('#MessageContent').css('display', 'block');
    } else {
        $('#MessageContent').css('display', 'none');
    }
}

/*Function to disable the popup window */
window.onbeforeunload = closeIt;
function closeIt() {
    if (window.parent.opener != null) {
        window.parent.opener.disablePopup();
    }
    window.close();
    if (dashboardMode != 1) {
        if (window.opener != null) {
            if (onSubmitFlag == 1) {
                onSubmitFlag = 0;
                window.opener.loadSurveyPopUp();
            }
            if (roleGroupId == 6) {
                window.opener.updateWithNewData();
            }

        }
    }
}

function disablePopup() {
    //disables popup only if it is enabled
    $("#overLay").hide();
    $(".popupContactwrapper").hide();
    if (dashboardMode != 1) {
        popupStatus = 0;
    }

}

(function (a) {
    a.alerts = { verticalOffset: -75, horizontalOffset: 0, repositionOnResize: true, overlayOpacity: 0.7, overlayColor: "#000000", Color: "#FF9", bckgrdPopupColor: "#ffffff", draggable: false, okButton: "&nbsp;OK&nbsp;", cancelButton: "&nbsp;Cancel&nbsp;", dialogClass: null, Info: function (b) { a.alerts._show1("Information", b, null, "info", function (c) { }) }, Mandatory: function (b) { a.alerts._show1("Mandatory Fields", b, null, "info", function (c) { }) }, Warning: function (b) { a.alerts._show1("Warning", b, null, "warning", function (c) { }) }, Success: function (b) { a.alerts._show1("Success", b, null, "success", function (c) { }) }, Error: function (b) { a.alerts._show1("Error", b, null, "error", function (c) { }) }, Confirm: function (b) { a.alerts._show1("Confirmation", b, null, "confirm", function (c) { }) }, Prompt: function (b, c) { a.alerts._show1("Prompt", b, c, "prompt", function (d) { }) }, Message: function (b) { a.alerts._show1("Message", b, null, "message", function (c) { }) },
        SubmitSuccess: function (b) {
            a.alerts._show1("Success", b, null, "success",
  function (c) { window.close() })
        }, _show1: function (g, d, i, h, b) { a.alerts._hide(); a.alerts._overlay("show"); if (g == "Message") { a("BODY").append('<div id="popup_container"><h1 id="popup_title" align="center"></h1><div id="popup_content"><div id="popup_message" style="padding:5px 5px 7px;border:0px;height:300px;border-color:blue;margin-left:0px;margin-right:10px;font-size:14;overflow:auto;"></div></div></div>') } else { a("BODY").append('<div id="popup_container"><h1 id="popup_title" align="center"></h1><div id="popup_content"><div id="popup_message" style="padding:5px 5px 7px;border:0px;height:150px;border-color:blue;margin-left:0px;margin-right:10px;font-size:14;overflow:auto;"></div></div></div>') } if (a.alerts.dialogClass) { a("#popup_container").addClass(a.alerts.dialogClass) } var f = (a.browser.msie && parseInt(a.browser.version) <= 6) ? "absolute" : "fixed"; if (g == "Message") { a("#popup_container").css({ width: 700, height: "auto", position: f, zIndex: 99999, padding: 0, margin: 50, left: 400, background: a.alerts.bckgrdPopupColor }) } else { a("#popup_container").css({ width: 450, height: 300, position: f, zIndex: 99999, padding: 0, margin: 50, left: 400, background: a.alerts.bckgrdPopupColor }) } a("#popup_title").text(g); a("#popup_content").addClass(h); a("#popup_message").text(d); a("#popup_message").html(a("#popup_message").text().replace(/\n/g, "<br />")); a("#popup_container").css({ minWidth: a("#popup_container").outerWidth(), maxWidth: a("#popup_container").outerWidth() }); a.alerts._reposition(); a.alerts._maintainPosition(true); switch (h) { case "info": case "warning": case "success": case "error": case "message": a("#popup_message").after('<div id="popup_panel" valign:"vertical"><input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold; position:relative;" class="popup_Button" value="' + a.alerts.okButton + '" id="popup_ok" /></div>'); a("#popup_ok").click(function () { a.alerts._hide(); b(true) }); a("#popup_ok").focus().keypress(function (j) { if (j.keyCode == 13 || j.keyCode == 27) { a("#popup_ok").trigger("click") } }); break; case "confirm": a("#popup_message").after('<div id="popup_panel" valign:"vertical"><input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button"  value="' + a.alerts.okButton + '" id="popup_ok" /> <input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button"  value="' + a.alerts.cancelButton + '" id="popup_cancel" /></div>'); a("#popup_ok").click(function () { a.alerts._hide(); if (b) { b(true) } }); a("#popup_cancel").click(function () { a.alerts._hide(); if (b) { b(false) } }); a("#popup_ok").focus(); a("#popup_ok, #popup_cancel").keypress(function (j) { if (j.keyCode == 13) { a("#popup_ok").trigger("click") } if (j.keyCode == 27) { a("#popup_cancel").trigger("click") } }); break; case "prompt": a("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel" valign:"vertical"><input type="button"  style="background-color:Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button"  value="' + a.alerts.okButton + '" id="popup_ok" /> <input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button" value="' + a.alerts.cancelButton + '" id="popup_cancel" /></div>'); a("#popup_prompt").width(a("#popup_message").width()); a("#popup_ok").click(function () { var e = a("#popup_prompt").val(); a.alerts._hide(); if (b) { b(e) } }); a("#popup_cancel").click(function () { a.alerts._hide(); if (b) { b(null) } }); a("#popup_prompt, #popup_ok, #popup_cancel").keypress(function (j) { if (j.keyCode == 13) { a("#popup_ok").trigger("click") } if (j.keyCode == 27) { a("#popup_cancel").trigger("click") } }); if (i) { a("#popup_prompt").val(i) } a("#popup_prompt").focus().select(); break } if (a.alerts.draggable) { try { a("#popup_container").draggable({ handle: a("#popup_title") }); a("#popup_title").css({ cursor: "move", font: 15 }) } catch (c) { } } }, _hide: function () { a("#popup_container").remove(); a.alerts._overlay("hide"); a.alerts._maintainPosition(false) }, _overlay: function (b) { switch (b) { case "show": a.alerts._overlay("hide"); a("BODY").append('<div id="popup_overlay"></div>'); a("#popup_overlay").css({ position: "absolute", zIndex: 99998, top: "0px", left: "0px", width: "100%", height: a(window).height() - 100 + "px", background: a.alerts.overlayColor, opacity: a.alerts.overlayOpacity }); break; case "hide": a("#popup_overlay").remove(); break } }, _reposition: function () { var c = ((a(window).height() / 2) - (a("#popup_container").outerHeight() / 2)) + a.alerts.verticalOffset; var b = ((a(window).width() / 2) - (a("#popup_container").outerWidth() / 2)) + a.alerts.horizontalOffset; if (c < 0) { c = 0 } if (b < 0) { b = 0 } if (a.browser.msie && parseInt(a.browser.version) <= 6) { c = c + a(window).scrollTop() } a("#popup_container").css({ top: c + "px", left: b + "px" }); a("#popup_overlay").height(a(document).height()) }, _maintainPosition: function (b) { if (a.alerts.repositionOnResize) { switch (b) { case true: a(window).bind("resize", function () { a.alerts._reposition() }); break; case false: a(window).unbind("resize"); break } } }
    }, MsgboxInfo = function (b) { a.alerts.Info(b) }, MsgboxWarning = function (b) { a.alerts.Warning(b) }, MsgboxSuccess = function (b) { a.alerts.Success(b) }, MsgboxError = function (b) { a.alerts.Error(b) }, MsgboxConfirm = function (b) { a.alerts.Confirm(b) }, MsgboxPrompt = function (b, c) { a.alerts.Prompt(b, c) }, MsgboxAlert = function (i, h, f, d, b) { var g = 2; try { if (f != 0) { a.ajax({ type: "POST", url: "../../FormsService.aspx/GetMessage", data: "{'sessionId':" + i.toString() + ",'messageType':'" + g + "','messageId':" + f.toString() + ",'messageCode':'" + d + "', 'customMessageOnDBFail':'" + b + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false, cache: false, success: function (k) { var l = k.d.DisplayMessage.toString(); var m = k.d.DisplayType.toString(); var e = l.toString(); var j = m.toString(); if (f == 39) { j = "9" } switch (j) { case "1": a.alerts.Success(e); break; case "2": a.alerts.Error(e); break; case "3": a.alerts.Warning(e); break; case "4": a.alerts.Info(e); break; case "5": a.alerts.Prompt(e); break; case "6": a.alerts.Confirm(e); break; case "7": a.alerts.Mandatory(e); break; case "8": a.alerts.Message(e); break; case "9": a.alerts.SubmitSuccess(e); break; default: a.alerts.Info(e) } }, error: function (k, e, j) { a.alerts.Error(k.status + " - " + k.responseText) } }) } else { if (f == 0) { switch (h) { case 1: a.alerts.Success(b); break; case 2: a.alerts.Error(b); break; case 3: a.alerts.Warning(b); break; case 4: a.alerts.Info(b); break; case 5: a.alerts.Prompt(b); break; case 6: a.alerts.Confirm(b); break; case 7: a.alerts.Mandatory(b); break; default: a.alerts.Info(b) } } } } catch (c) { alert(c) } }, MsgboxAlertDashboard = function (i, h, f, d, b) { var g = 2; try { if (f != 0) { a.ajax({ type: "POST", url: "../../FormsService.aspx/GetMessage", data: "{'sessionId':" + i.toString() + ",'messageType':'" + g + "','messageId':" + f.toString() + ",'messageCode':'" + d + "', 'customMessageOnDBFail':'" + b + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false, cache: false, success: function (k) { var l = k.d.DisplayMessage.toString(); var m = k.d.DisplayType.toString(); var e = l.toString(); var j = m.toString(); switch (j) { case "1": a.alerts.Success(e); break; case "2": a.alerts.Error(e); break; case "3": a.alerts.Warning(e); break; case "4": a.alerts.Info(e); break; case "5": a.alerts.Prompt(e); break; case "6": a.alerts.Confirm(e); break; case "7": a.alerts.Mandatory(e); break; default: a.alerts.Info(e) } }, error: function (k, e, j) { a.alerts.Error(k.status + " - " + k.responseText) } }) } else { if (f == 0) { switch (h) { case 1: a.alerts.Success(b); break; case 2: a.alerts.Error(b); break; case 3: a.alerts.Warning(b); break; case 4: a.alerts.Info(b); break; case 5: a.alerts.Prompt(b); break; case 6: a.alerts.Confirm(b); break; case 7: a.alerts.Mandatory(b); break; default: a.alerts.Info(b) } } } } catch (c) { alert(c) } }
})(jQuery);

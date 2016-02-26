$.ajaxSetup({ cahce: false, dataType: "json", async: false, cache: false, contentType: 'application/json; charset=utf-8' });
(function ($) {
    customDefaults = {};
    fileUploadDefaults = {
        ajaxURLPath: '../../',
        delay: '200',
        ajaxLocationPath: 'CommonPages/UploadUtility.aspx/',
        imgSrc: '../../',
        overLay: { 'display': 'none', 'position': 'fixed', '_position': 'absolute', 'height': '100%', 'width': '100%', 'top': '0', 'left': '0', 'background-color': '#000000', 'border': '1px solid #cecece;', 'z-index': '9999;', 'opacity': '0.7' },
        overLayDivIdName: 'overLay',
        uploadPopupContainerClassName: 'uploadContentWrapper',
        sanUploadMessage: ["File uploaded successfully", "Please upload only bmp,doc,jpg,pdf,png,tif,zip,jpeg,tiff extension file", "Please upload less than 2MB", "File upload failed"],
        FILEUPLOAD_CONTAINER_ATTR: 'fu-upId', // Upload container attribute   
        FILEUPLOAD_CONTAINER_UI_ATTR: 'fu-ui', // Upload container user interface design attribute       
        FILEUPLOAD_CONTAINER_RUNNER_ATTR: 'fu-rnId',
        FILEUPLOAD_CONTAINER_APPENDCONTENTID_ATTR: 'fu-cntId',
        FILEUPLOAD_CONTAINER_CONTENTID_ATTR: 'fu-id',
        FILEUPLOAD_CONTAINER_GLOBALUI_ATTR: 'fu-gui',
        FILEUPLOAD_CONTAINER_UPID_DID_ATTR: 'fu-dId' 
    };
    $.uploadUIDefaults = {
        uploadType: 0, //0->ECM;1->SAN        
        showFileName: 0, // 0 -> Hide; 1-> Show        
        uiCustomType: 0,
        uIBtnArr: ["masterCopy", "download", "upload", "view", "approve", "reject", "add", "remove", "delete"],
        mode: { "fn-masterCopy": 0, "fn-download": 1, "fn-upload": 2, "fn-view": 3, "fn-approve": 4, "fn-reject": 5, "fn-add": 6, "fn-remove": 7, "fn-delete": 8 },
        arrageBtnOrder: { "masterCopy": 0, "download": 1, "upload": 2, "view": 3, "approve": 4, "reject": 5, "add": 6, "remove": 7, "delete": 8 },
        onBeforeProcess: {},
        onDoneProcess: {},
        masterCopyBtnTxt: "Master Copy",
        downloadBtnTxt: "Download",
        uploadBtnTxt: "Upload",
        viewBtnTxt: "View",
        approveBtnTxt: "Approve",
        rejectBtnTxt: "Reject",
        addBtnTxt: "Add",
        removeBtnTxt: "Remove",
        deleteBtnTxt: "Delete",
        masterCopySrc: "",
        downloadSrc: "",
        uploadSrc: "",
        viewSrc: "",
        approveSrc: "",
        rejectSrc: "",
        addSrc: "",
        removeSrc: "",
        deleteSrc: "",
        uploadClassName: "fn-upload",
        viewClassName: "fn-view",
        masterCopyClassName: "fn-masterCopy",
        downloadClassName: "fn-download",
        approveClassName: "fn-approve",
        addClassName: "fn-add",
        rejectClassName: "fn-reject",
        removeClassName: "fn-remove",
        deleteClassName: "fn-delete",
        restrictUploadType: '',
        restrictUploadSize: '',
        containterStyle: "height:30px:padding:2px 2px 2px 2px ;width:auto;",
        btnStyle: "height:24px;min-width:42px;cursor:pointer;margin:2px 0 4px 0;padding:0 4px 0 4px;border: 1px solid #5482a3;color:#fff;font-weight:bold;text-align:center;vertical-align:middle;border-radius:3px;background-color:#396584;"
    };
    $.fileUpload = {
        htmlContent: '',
        upList: {},        
        upArr: new Array(),
        upUICustom: new Array(),
        maintenance: new Array(),
        upGroupId: '',
        uploadMode: '',
        downloadMode: '',
        saveMode: '',
        processMode: '',
        documentId: 0,
        currentElement: '',
        currentElmRnId: '',
        ajaxReturnResponse: '',
        ajaxReturnData: {},
        upRefVal: {},
        customParams: {},
        currentProcess: 0,
        Initialize: function () { /*This function will initializes the upload configuration.*/
            try {
                fileUploadDefaults = $.extend(fileUploadDefaults, customDefaults);                
                $.fileUpload.upArr = $('[' + fileUploadDefaults.FILEUPLOAD_CONTAINER_ATTR + ']').map(function (i, v) {
                    var JQCurElm = $(this);
                    var rnId = ((JQCurElm.attr(fileUploadDefaults.FILEUPLOAD_CONTAINER_RUNNER_ATTR) == undefined || JQCurElm.attr(fileUploadDefaults.FILEUPLOAD_CONTAINER_RUNNER_ATTR) == '') ? 0 : JQCurElm.attr(fileUploadDefaults.FILEUPLOAD_CONTAINER_RUNNER_ATTR));
                    return JQCurElm.attr(fileUploadDefaults.FILEUPLOAD_CONTAINER_ATTR) + ':' + rnId;
                }).get()//.filter(function (value) { return value != '' && value != null && value != undefined });         
                $.fileUpload.upGroupId = $.fileUpload.upArr.join(':;');
                $.fileUpload._getData();
            }
            catch (e) {
                $.fileUpload._exceptionLog(e);
            }
        },
        _ajaxCall: function (methodData, methodName) { /*This is common Ajax function for transaction.*/
            var ajaxStatus = false;
            try {
                $.ajax({
                    type: 'post',
                    url: fileUploadDefaults.ajaxURLPath + fileUploadDefaults.ajaxLocationPath + methodName,
                    data: '{' + methodData + '}',
                    success: function (msg) {
                        $.fileUpload.ajaxReturnResponse = msg.d;
                        return ajaxStatus = true;
                    },
                    error: function (xhr, status, textRemarks) {
                        alert("Error " + xhr.status + " " + textRemarks);
                        return ajaxStatus = false;
                    }
                });
                return ajaxStatus;
            } catch (e) {
                $.fileUpload._exceptionLog(e.toString());
            }
        },
        _exceptionLog: function (ex) { /*This function is used to get the exceptions in functions.*/
            // alert(ex);
        },
        _getData: function () { /*This function is used to get the upload configuration*/
            try {
                var ajaxData = "";
                 ajaxData += "'uploadGroupId':'" + $.fileUpload.upGroupId + "',";
                ajaxData += "'candidateId':'" + candidateId + "'";               
                $.when($.fileUpload._ajaxCall(ajaxData, 'UploadIntialize')).done(function (ajaxCallStatus) {
                    if (ajaxCallStatus == true) {
                        $.fileUpload.maintenance = JSON.parse($.fileUpload.ajaxReturnResponse).UploadEnableChecks[0];
                        if ($.fileUpload.maintenance.IsECMUnderMaintainence == 0 && $.fileUpload.maintenance.IsSANUnderMaitainence == 0) {
                            $.fileUpload._designContainer(JSON.parse($.fileUpload.ajaxReturnResponse).Data);
                        } else {
                            $.fileUpload._maintenancePopUp();
                        }
                    }
                });
                delete $.fileUpload.upGroupId, $.fileUpload.ajaxReturnResponse;
            } catch (e) {
                $.fileUpload._exceptionLog(e.toString());
            }
        },
        _designContainer: function (data) {
            if (data != null && data.length != undefined && data.length != 0) {
                $(data).each(function (i, val) {
                    $.fileUpload._createUpRefVar(val);
                    var declaredParams, toolTip, options, thisElm, customParams;
                    declaredParams = { btnVisility: { "masterCopy": val.IsMasterCopyBtnRequired, "download": val.IsDownloadBtnRequired, "upload": val.IsUploadBtnRequired, "view": val.IsViewBtnRequired, "approve": val.IsApproveBtnRequired, "reject": val.IsRejectBtnRequired, "add": val.IsAddBtnRequired, "remove": val.IsRemoveBtnRequired, "delete": val.IsDeleteBtnRequired} };
                    toolTip = { "uploadTP": val.UploadTooltip, "viewTP": val.ViewTooltip, "downloadTP": val.DownloadTooltip, "masterCopyTP": val.MasterCopyTooltip, "approveTP": val.ApproveTooltip, "rejectTP": val.RejectTooltip, "deleteTP": val.DeleteTooltip, "addTP": val.AddTooltip, "removeTP": val.RemoveTooltip };
                    thisElm = $('[' + fileUploadDefaults.FILEUPLOAD_CONTAINER_ATTR + '=' + val.UpId + ']').filter('[' + ' ' + fileUploadDefaults.FILEUPLOAD_CONTAINER_RUNNER_ATTR + '=' + val.UpRunnerId + ']');
                    customParams = window[thisElm.attr(fileUploadDefaults.FILEUPLOAD_CONTAINER_UI_ATTR)];
                    options = $.extend({}, $.uploadUIDefaults, customParams, declaredParams, { documentName: val.DocumentName, documentUploadStatus: val.DocumentUploadStatus, uploadDestination: val.UploadDestination }, toolTip);
                    $.fileUpload._containerHTML(val.UpId, val.UpRunnerId, options, thisElm, customParams);
                    delete declaredParams, toolTip, options, customParams, thisElm;
                });
            }
        },
        _containerHTML: function (upId, RnId, options, thisElm, customParams) {
            var startDiv = '<div class="uploadContainer" style="' + options.containterStyle + '">';
            var endDiv = '</div>';
            var content = '';
            var upDestinationClass = (options.uploadDestination == 1 ? 'sn' : 'em');
            var fileName = '<label class="fn-view" style="cursor:pointer;">' + options.documentName + '</label>';
            var comment = '<label style="display:none;"></label>';
            var containterHTML = new Array();
            // create buttons          
            if (options.uiCustomType == 0) {
                $($.uploadUIDefaults.uIBtnArr).each(function (i, val) {
                    if ((options.btnVisility)[val] == true || (options.btnVisility)[val] == 'true') {
                        var contentHtml = '';
                        var contentType = (options[val + "Src"] == "" ? 0 : 1);
                        if (contentType == 0) {
                            if (options.uploadDestination == 1 && val == 'upload') {
                                contentHtml += "<div><input type='file' class='browse'  style=''  id='file'/>&nbsp;";
                                contentHtml += "<input type='button' value='" + options.uploadBtnTxt + "' title='" + options[val + "TP"] + "'  style='" + options.btnStyle + "'  class='_uploadToSan  " + upDestinationClass + "'/></div>";
                            }
                            else {
                                contentHtml = '<input type="Button" value="' + options[val + "BtnTxt"] + '"  title="' + options[val + "TP"] + '" style="' + options.btnStyle + '" class="' + options[val + "ClassName"] + ' _btn ' + upDestinationClass + '"/>';
                            }
                        }
                        if (contentType == 1) {
                            contentHtml = '<a href="javascript:;"  title="' + options[val + "TP"] + '" class="' + options[val + "ClassName"] + ' _btn  ' + upDestinationClass + '"><img logo="' + options[val + "BtnTxt"] + '" src="' + options[val + "Src"] + '" /></a>';
                        }
                        containterHTML[(options.arrageBtnOrder)[val]] = contentHtml;
                    }
                });
                containterHTML = $.grep(containterHTML, function (v, i) { return v != '' });
                //thisElm.empty();
                if (options.showFileName == 1) {
                    switch (parseInt(options.documentUploadStatus)) {
                        case 1: content = $(startDiv + containterHTML.join("&nbsp;") + endDiv);
                            break;
                        case 2: content = $(startDiv + containterHTML.join("&nbsp;") + endDiv);
                            break;
                        default: content = $(startDiv + containterHTML.join("&nbsp;") + '<br/>' + fileName + endDiv);
                            break;
                    }
                } else {
                    content = $(startDiv + containterHTML.join("&nbsp;") + endDiv);
                }
            } else if (options.uiCustomType == 1) {                
                var currentELMClass = $('[' + fileUploadDefaults.FILEUPLOAD_CONTAINER_CONTENTID_ATTR + '=' + thisElm.attr(fileUploadDefaults.FILEUPLOAD_CONTAINER_APPENDCONTENTID_ATTR) + ']').attr('class');
                currentELMClass = (currentELMClass == undefined ? '' : currentELMClass);
                content = $('[' + fileUploadDefaults.FILEUPLOAD_CONTAINER_CONTENTID_ATTR + '=' + thisElm.attr(fileUploadDefaults.FILEUPLOAD_CONTAINER_APPENDCONTENTID_ATTR) + ']').removeClass(currentELMClass).addClass($.uploadUIDefaults.viewClassName + ' ' + upDestinationClass + ' ' + currentELMClass).detach();
                if(content.length > 0)
                content = $(startDiv + content[0].outerHTML + endDiv);
                //  thisElm = thisElm.filter('['+fileUploadDefaults.FILEUPLOAD_CONTAINER_APPENDCONTENTID_ATTR+'='+thisElm.attr(fileUploadDefaults.FILEUPLOAD_CONTAINER_APPENDCONTENTID_ATTR)+']');
                //thisElm = thisElm.filter(fileUploadDefaults.FILEUPLOAD_CONTAINER_APPENDCONTENTID_ATTR);
            }
            if(content.length > 0){
            thisElm.empty();
            content.appendTo(thisElm);            
            }
            delete startDiv, endDiv, content, upDestinationClass, fileName, comment, containterHTML, thisElm, options;
        },
        _createUpRefVar: function (data) {
            var upRef = {}, upRef1 = {};
            upRef["ApproveCommentsRequired"] = data.IsApproveCommentsRequired;
            upRef["RemoveCommentsRequired"] = data.IsRejectCommentsRequired;
            upRef1[data.UpRunnerId] = upRef
            if ($.fileUpload.upRefVal[data.UpId] == undefined)
                $.fileUpload.upRefVal[data.UpId] = upRef1;
            else
                $.fileUpload.upRefVal[data.UpId][data.UpRunnerId] = upRef;
        },
        _popUpContainer: function (url, uploadNote, popUpMode, fnMode) {
            /*Initializing the pop up overlay */
            /*Design pop up window*/
            var $popupContent = '', $tableWidth = '';
            if (popUpMode == 0) { /*This mode is used for upload window*/
                $popupContent += "<div id='upload_container' style='width:480px;'>";
                $popupContent += '<a id="spinner" style="position:absolute;z-index:99999;top:100px;left:200px;display:block;"><img src="' + fileUploadDefaults.imgSrc + 'Images/spinner_1.gif" /></a>';
                $popupContent += "<iframe id='uploadFrameLoader' width='480px' height='350px'    frameborder='0' scrolling='no' src='" + url + "' style='margin-top:15px;overflow:hidden;*margin-left:-5px;'></iframe>";
                if (uploadNote != undefined && uploadNote != null) {
                    $popupContent += "<div id='uploadNote' style='height:40px;text-align:left;font-weight:bold;margin-top: -30px;margin-left: 10px;font-style: italic;color:red;width:90%;'>" + $.trim(uploadNote).toString() + "</div>";
                }
                $popupContent += '</div>';

            }
            if (popUpMode == 1) {
                $popupContent += "<div id='upload_container' style='width:480px;'>";
                $popupContent = '<div id="popup_container1" style="position:relative;width:400px;text-align:center;vertical-align:middle;font-size:1.1em;margin-top:10px;" >';
                $popupContent += '<div id="pop_heading" style="height:30px;line-height:30px;background:#22506f;color:white;border-top-right-radius:8px;border-top-left-radius:8px;">Feedback for document upload status</div>'
                $popupContent += '<div id="pop_comment" style="height:140px;background:white;border:2px solid #22506f;border-bottom-right-radius:8px;border-bottom-left-radius:8px;">';
                $popupContent += '<textarea maxlength="180" style="width:90%;height:80px;border:1px solid #99a3a7;margin-top:6px;overflow:hidden;line-height:1.3em;" id="_response"></textarea><br/>';
                $popupContent += '<div style="margin-bottom:4px;margin-top:4px;"><div style="float:left;margin-left:10px;font-style:italic;font-weight:bold;"><label id="_feedbackMan" style="display:none;color:red;"><span>*</span> Please enter feedback</label></div>';
                $popupContent += '<div style="float:right;margin-right:20px;font-style:italic;"><label id="_charleft">180</label><label> characters left</label></div><br/></div><div style="float:right;margin-right:20px;">';
                $popupContent += '<input  value="Ok" type="button" name="Ok" mode="' + fnMode + '" class="_rejectOk" style="background:#22506f;color:white;height:20px;cursor:pointer;width:50px;text-align:center;border-radius:2px;margin-right:30px;"/>';
                $popupContent += '<input  value="Cancel" type="button"  name="Cancel" class="_rejectCancel" style="background:#22506f;color:white;height:20px;width:50px;cursor:pointer;text-align:center;border-radius:2px;"  onclick="$.fileUpload._popUpClose(0)"/>';
                $popupContent += '</div></div></div>';
                $popupContent += '</div>';

            }
            /*Remove already existing container containers*/
            $('.' + fileUploadDefaults.uploadPopupContainerClassName).remove();
            $('#' + fileUploadDefaults.overLayDivIdName).remove();
            /*Calculate dynamic height and width*/
            var windowHeight = $(document).height();
            var windowWidth = $(document).width();
            var $backgroundOverLay = $('<div id="' + fileUploadDefaults.overLayDivIdName + '"/>');
            var windowLeft = (windowWidth / 3) - 100;
            var windowTop = "100";
            $('body').prepend($backgroundOverLay);
            $('#' + fileUploadDefaults.overLayDivIdName).css(fileUploadDefaults.overLay);
            $('#' + fileUploadDefaults.overLayDivIdName).hide(0).delay(fileUploadDefaults.delay).fadeIn();
            /*Close icon*/
            var closeBox = '<table border="0" cellspacing="0" cellpadding="0" style="width:103%;position:absolute;*width:103%;*z-index:9999">';
            closeBox += '<tr><td style="border:none;"><a id="fn-close" class="_rejectCancel"   style="float:right;background:url(' + fileUploadDefaults.imgSrc + 'Images/Survey/close.png) no-repeat; width:25px; height:25px; border:none; outline:none; position:relative; z-index:100;" onclick="$.fileUpload._popUpClose(0)"></a></td></tr>'
            closeBox += '</table>';
            var $popupData = $('<div class="' + fileUploadDefaults.uploadPopupContainerClassName + '" style="z-index:999999;display:none;" />').html($popupContent).prepend(closeBox);
            $('body').prepend($popupData);
            $('.' + fileUploadDefaults.uploadPopupContainerClassName).hide(0).delay(fileUploadDefaults.delay).fadeIn();
            $('.' + fileUploadDefaults.uploadPopupContainerClassName).css({ "position": "absolute", "top": windowTop + "px", "left": windowLeft + "px" });
            /*Remove spinner after iframe loaded content*/
            $('#uploadFrameLoader').load(function () { $('#spinner').remove(); });
            delete windowHeight, windowWidth, $backgroundOverLay, windowLeft, windowTop, $popupContent;
        },
        _popUpClose: function (mode) {
            if (mode == 0) {
                $('#' + fileUploadDefaults.overLayDivIdName).fadeOut(fileUploadDefaults.delay);
                $('.' + fileUploadDefaults.uploadPopupContainerClassName).fadeOut(fileUploadDefaults.delay);
            }
            else {
                window.frameElement.parentNode.style.display = "none";
                window.frameElement.parentNode.nextSibling.style.display = "none";
            }
            return false;
        },
        _replaceTxt: function (inputTxt) {
            return inputTxt.replace(/\\n/g, " ").replace(/\\/g, "\\\\").replace(/'/g, "\\\'").replace(/"/g, "\\\"");
        },
        _saveResponse: function (sendCode, sendMessage, sendUtilMessage, sendStatus, documentId) {
            try {
                sendMessage = $.fileUpload._replaceTxt(sendMessage);
                sendUtilMessage = $.fileUpload._replaceTxt(sendUtilMessage);
                sendStatus = $.fileUpload._replaceTxt(sendStatus);
                documentId = (documentId == null || documentId == undefined) ? 0 : documentId;
                var ajaxData = '';
                ajaxData += "'uploadId':'" + $.fileUpload.currentElement + "',";
                ajaxData += "'uploadRnId':" + $.fileUpload.currentElmRnId + ",";                
                ajaxData += "'candidateId':'" + candidateId + "',";
                ajaxData += "'sendMessage':'" + sendMessage.toString() + "',";
                ajaxData += "'sendUtilMessage':'" + sendUtilMessage.toString() + "',";
                ajaxData += "'sendStatus':'" + sendStatus.toString() + "',";
                ajaxData += "'sendCode':" + sendCode + ",";
                ajaxData += "'documentId':" + documentId + ","
                ajaxData += "'mode':" + $.fileUpload.saveMode
                $.when($.fileUpload._ajaxCall(ajaxData, 'SaveUploadedResponse')).done(function (retStatus) {
                    if (retStatus == true) {
                        $.fileUpload._designContainer(JSON.parse($.fileUpload.ajaxReturnResponse).Data);
                    }
                    $.fileUpload._callBackUserFn(1, [$.fileUpload.currentElement, $.fileUpload.currentElmRnId]);
                });
                delete $.fileUpload.ajaxReturnResponse, ajaxData;
            } catch (e) {
                $.fileUpload._exceptionLog(e.toString());
            }
        },
        _maintenancePopUp: function () {
            alert($.fileUpload.maintenance.ECMMaintainenceMsg);
        },
        _comments: function (response) {
            var ajaxData = '';
               ajaxData += "'uploadId':'" + $.fileUpload.currentElement + "',";
            ajaxData += "'uploadRnId':" + $.fileUpload.currentElmRnId + ",";          
            ajaxData += "'response':'" + $.fileUpload._replaceTxt(response) + "',";
            ajaxData += "'candidateId':'" + candidateId + "',";
            ajaxData += "'mode':" + $.fileUpload.processMode
            $.when($.fileUpload._ajaxCall(ajaxData, 'DocumentUploadStatus')).done(function (retStatus) {
                if (retStatus == true) {
                    $.fileUpload._designContainer(JSON.parse($.fileUpload.ajaxReturnResponse).Data);
                    $.fileUpload._callBackUserFn(1, [$.fileUpload.currentElement, $.fileUpload.currentElmRnId]);
                }
            });
        }, _maxlength: function (obj) {
            try {
                setTimeout(function () {
                    var vallength = $(obj).val().length;
                    var maxlength = $(obj).attr('maxlength');
                    if (vallength >= maxlength) {
                        $(obj).val($(obj).val().slice(0, maxlength));
                    }
                    $('#_charleft').text(maxlength - $(obj).val().length - 1);


                }, 0);
            }
            catch (e) {

            }
        },
        _getCurrElmParams: function (obj, mode) {
            delete $.fileUpload.currentElement, $.fileUpload.uploadMode, $.fileUpload.currentElmRnId, $.fileUpload.saveMode, $.fileUpload.downloadMode, $.fileUpload.currentElmRnId, $.fileUpload.processMode, $.fileUpload.customParams, $.fileUpload.currentProcess, $.fileUpload.documentId;
            $.fileUpload.currentElement = obj.closest("[" + fileUploadDefaults.FILEUPLOAD_CONTAINER_ATTR + "]").attr(fileUploadDefaults.FILEUPLOAD_CONTAINER_ATTR);
            $.fileUpload.customParams = window[$('[' + fileUploadDefaults.FILEUPLOAD_CONTAINER_ATTR + ' = ' + $.fileUpload.currentElement + ']').attr(fileUploadDefaults.FILEUPLOAD_CONTAINER_UI_ATTR)];
            $.fileUpload.currentProcess = $.uploadUIDefaults.mode[obj.attr('class').split(' ')[0]];
            if (obj.closest("[" + fileUploadDefaults.FILEUPLOAD_CONTAINER_ATTR + "]").attr(fileUploadDefaults.FILEUPLOAD_CONTAINER_RUNNER_ATTR) != undefined) {
                $.fileUpload.currentElmRnId = obj.closest("[" + fileUploadDefaults.FILEUPLOAD_CONTAINER_ATTR + "]").attr(fileUploadDefaults.FILEUPLOAD_CONTAINER_RUNNER_ATTR);
            } else { $.fileUpload.currentElmRnId = 0; }
            switch (mode) {
                case 1: $.fileUpload.saveMode = $.fileUpload.currentProcess; // Upload                            
                    break;
                case 2: $.fileUpload.downloadMode = $.fileUpload.currentProcess; // Download
                    if (obj.closest("[" + fileUploadDefaults.FILEUPLOAD_CONTAINER_ATTR + "]").attr(fileUploadDefaults.FILEUPLOAD_CONTAINER_UPID_DID_ATTR) != undefined)
                        $.fileUpload.documentId = obj.closest("[" + fileUploadDefaults.FILEUPLOAD_CONTAINER_ATTR + "]").attr(fileUploadDefaults.FILEUPLOAD_CONTAINER_UPID_DID_ATTR);
                    break;
                case 3: $.fileUpload.processMode = $.fileUpload.currentProcess; //Approve, Reject
                    break;
                default: break;

            }
        },
        _callBackUserFn: function (fnMode, elm) {
            if (fnMode == 0) { }
            if (fnMode == 1) {
                if ($.fileUpload.customParams.onDoneProcess != undefined) {
                    var fnCallBack = $.fileUpload.customParams.onDoneProcess[$.fileUpload.currentProcess];
                    if (fnCallBack.inputRequired != undefined && fnCallBack.inputRequired == true) {
                        returnFn(fnCallBack.fnName, elm);
                    } else {
                        returnFn(fnCallBack.fnName);
                    }
                }
            }
        }
    }

    $(document).on('click', '.' + $.uploadUIDefaults.masterCopyClassName + ',.' + $.uploadUIDefaults.uploadClassName, function () {
        try {
            var obj = $(this);
            $.fileUpload._getCurrElmParams(obj, 1);
            var method = (obj.hasClass('sn') == true ? '' : 'GetLatestURL');
            var ajaxData = '';
              ajaxData += "'uploadGroupId':'" + ($.fileUpload.currentElement + ':' + $.fileUpload.currentElmRnId).toString() + "',";
            ajaxData += "'candidateId':'" + candidateId + "'";
            $.when($.fileUpload._ajaxCall(ajaxData, method)).done(function (ajaxCallStatus) {
                if (ajaxCallStatus == true) {
                    if (obj.hasClass('sn') == true) {
                        $.fileUpload._designContainer(JSON.parse(JSON.parse($.fileUpload.ajaxReturnResponse)['DataXML'])['Upload'].Data);
                    }
                    else {
                        var parseResponse = JSON.parse($.fileUpload.ajaxReturnResponse).Data[0];
                        $.fileUpload._popUpContainer(parseResponse.Url, parseResponse.UploadNote, 0);
                    }
                }
            });
            delete $.fileUpload.upGroupId, $.fileUpload.currentElmRnId;
        } catch (e) {
            $.fileUpload._exceptionLog(e.toString());
        }
    }).on('click', '.' + $.uploadUIDefaults.downloadClassName + ',.' + $.uploadUIDefaults.viewClassName, function () {
        try {
            var obj = $(this);
            $.fileUpload._getCurrElmParams(obj, 2);
            var method = (obj.hasClass('sn') == true ? 'DownloadFileFromSAN' : 'DownloadECMFile');
            var ajaxData = '';
            ajaxData += "'uploadId':'" + $.fileUpload.currentElement + "'";
            if (!obj.hasClass('sn')) {
                 ajaxData += ",'uploadRnId':" + $.fileUpload.currentElmRnId + "";
                ajaxData += ",'candidateId':'" + candidateId + "',";
                ajaxData += "'mode':'" + $.fileUpload.downloadMode + "',";
                ajaxData += "'documentId':'" + $.fileUpload.documentId + "'";
            }
            $.when($.fileUpload._ajaxCall(ajaxData, method)).done(function (ajaxCallStatus) {
                if (ajaxCallStatus == true) {
                    window.open($.fileUpload.ajaxReturnResponse, '', "width=200,height=100");
                }
            });
        } catch (e) {
            $.fileUpload._exceptionLog(e.toString());
        }
    })
    .on('click', '._uploadToSan', function (e) {
        var obj = $(this);
        $.fileUpload.currentElement = obj.closest("[" + fileUploadDefaults.FILEUPLOAD_CONTAINER_ATTR + "]").attr(fileUploadDefaults.FILEUPLOAD_CONTAINER_ATTR);
        var ajaxData = '';
        ajaxData += "'filePath':'" + obj.siblings('input[type="file"]').val().replace(/\\/g, "/") + "',";
        ajaxData += "'candidateId':" + candidateId + ",";
        ajaxData += "'uploadId':'" + $.fileUpload.currentElement + "',";
        ajaxData += "'mode':" + 0;
        $.when($.fileUpload._ajaxCall(ajaxData, 'UploadFileToSAN')).done(function (ajaxCallStatus) {
            if (ajaxCallStatus == true) {
                obj.siblings('input[type="file"]').val('');
                $.fileUpload._designContainer(JSON.parse(JSON.parse($.fileUpload.ajaxReturnResponse)['DataXML'])['Upload'].Data);
                if (!parseInt($.fileUpload.ajaxReturnResponse))
                    alert(fileUploadDefaults.sanUploadMessage[0]);
                else
                    alert(fileUploadDefaults.sanUploadMessage[parseInt($.fileUpload.ajaxReturnResponse)]);

            }
        });
    })
    .on('click', '.fn-remove', function (e) {
        //    var obj = $(this);
        //     $.fileUpload.currentElement = obj.parent().parent().attr(fileUploadDefaults.FILEUPLOAD_CONTAINER_ATTR);
        //    var ajaxData = '';
        //     ajaxData += "'uploadId':'"+ $.fileUpload.currentElement+"'";
        //     $.when($.fileUpload._ajaxCall(ajaxData, 'DeleteFileFromECM')).done(function (ajaxCallStatus) {
        //            if (ajaxCallStatus == true) {
        //                alert(fileUploadDefaults.sanUploadMessage[$.fileUpload.ajaxReturnResponse]);
        //            }
        //        });
    }).on('click', '.fn-delete', function (e) {
        var obj = $(this);
        $.fileUpload._getCurrElmParams(obj, 0);
        var method = (obj.hasClass('sn') == true ? 'DeleteFileFromSAN' : 'DeleteFileFromECM');
        var ajaxData = '';
        ajaxData += "'uploadId':'" + $.fileUpload.currentElement + "',";
        ajaxData += "'uploadRnId':" + $.fileUpload.currentElmRnId + ",";        
        ajaxData += "'candidateId':" + candidateId;
        $.when($.fileUpload._ajaxCall(ajaxData, method)).done(function (ajaxCallStatus) {
            if (ajaxCallStatus == true) {
                alert('File deleted successfully');
                $.fileUpload._designContainer(JSON.parse($.fileUpload.ajaxReturnResponse).Data);
            }
        });
    }).on('click', '.' + $.uploadUIDefaults.approveClassName + ',.' + $.uploadUIDefaults.rejectClassName, function () {
        var obj = $(this);
        $.fileUpload._getCurrElmParams(obj, 3);
        if ($.fileUpload.upRefVal[$.fileUpload.currentElement][$.fileUpload.currentElmRnId].ApproveCommentsRequired && obj.hasClass($.uploadUIDefaults.approveClassName)) {
            $.fileUpload._popUpContainer('', '', 1);
        }
        else if ($.fileUpload.upRefVal[$.fileUpload.currentElement][$.fileUpload.currentElmRnId].RemoveCommentsRequired && obj.hasClass($.uploadUIDefaults.rejectClassName)) {
            $.fileUpload._popUpContainer('', '', 1);
        } else {
            $.fileUpload._comments('');
        }
    }).on("keyup", "textarea#_response", function (event) {
        var key_codes = [60, 62];
        if (!($.inArray(event.which, key_codes) >= 0)) {
            $.fileUpload._maxlength(this);
        }
        else {
            event.preventDefault();
        }
    }).on("click", "._rejectOk", function () {
        var comment = $.trim($('#_response').val());
        if (comment.length == 0) {
            $('#_feedbackMan').show();
        } else {
            $.fileUpload._comments(comment);
            $.fileUpload._popUpClose(0);
        }

    });
})(jQuery);

/*The below snippet is the temporarily code*/
var ECM = {
    Msg: function (SendCode, SendMessage, SendUtilMessage, SendStatus, DocumentID) {
        if (SendCode == 0) {
            $.fileUpload._saveResponse(SendCode, SendMessage, SendUtilMessage, SendStatus, DocumentID);
        }
    },
    PopUpClose: function (mode) {
        $.fileUpload._popUpClose(mode);
    }
}

var returnFn = function (stringFn, returnData) {
    var fnString = stringFn.split('.');
    var fnScope = window;
    for (var i = 0; i < fnString.length; i++) {
        fnScope = fnScope[fnString[i]];
    }
    if (typeof fnScope === 'function' && returnData == undefined) {
        fnScope();
    } else {
        fnScope(returnData);
    }
}
/*
************************************************
OnBoarding BGV vendor dashboard info script
************************************************
Author: 313248
Date: 2014-July-05
Purpose: Assign Vendor
************************************************
*/
/* Jquery-1.7.1.js */

/* Alerts.js */
(function (a) { a.alerts = { verticalOffset: -75, horizontalOffset: 0, repositionOnResize: true, overlayOpacity: 0.7, overlayColor: "#000000", Color: "#FF9", bckgrdPopupColor: "#ffffff", draggable: false, okButton: "&nbsp;OK&nbsp;", cancelButton: "&nbsp;Cancel&nbsp;", dialogClass: null, Info: function (b) { a.alerts._show1("Information", b, null, "info", function (c) { }) }, Mandatory: function (b) { a.alerts._show1("Mandatory Fields", b, null, "info", function (c) { }) }, Warning: function (b) { a.alerts._show1("Warning", b, null, "warning", function (c) { }) }, Success: function (b) { a.alerts._show1("Success", b, null, "success", function (c) { }) }, Error: function (b) { a.alerts._show1("Error", b, null, "error", function (c) { }) }, Confirm: function (b) { a.alerts._show1("Confirmation", b, null, "confirm", function (c) { }) }, Prompt: function (b, c) { a.alerts._show1("Prompt", b, c, "prompt", function (d) { }) }, Message: function (b) { a.alerts._show1("Message", b, null, "message", function (c) { }) }, SubmitSuccess: function (b) { a.alerts._show1("Success", b, null, "success", function (c) { window.close() }) }, _show1: function (g, d, i, h, b) { a.alerts._hide(); a.alerts._overlay("show"); if (g == "Message") { a("BODY").append('<div id="popup_container"><h1 id="popup_title" align="center"></h1><div id="popup_content"><div id="popup_message" style="padding:5px 5px 7px;border:0px;height:300px;border-color:blue;margin-left:0px;margin-right:10px;font-size:14;overflow:auto;"></div></div></div>') } else { a("BODY").append('<div id="popup_container"><h1 id="popup_title" align="center"></h1><div id="popup_content"><div id="popup_message" style="padding:5px 5px 7px;border:0px;height:150px;border-color:blue;margin-left:0px;margin-right:10px;font-size:14;overflow:auto;"></div></div></div>') } if (a.alerts.dialogClass) { a("#popup_container").addClass(a.alerts.dialogClass) } var f = (a.browser.msie && parseInt(a.browser.version) <= 6) ? "absolute" : "fixed"; if (g == "Message") { a("#popup_container").css({ width: 700, height: "auto", position: f, zIndex: 99999, padding: 0, margin: 50, left: 400, background: a.alerts.bckgrdPopupColor }) } else { a("#popup_container").css({ width: 450, height: 300, position: f, zIndex: 99999, padding: 0, margin: 50, left: 400, background: a.alerts.bckgrdPopupColor }) } a("#popup_title").text(g); a("#popup_content").addClass(h); a("#popup_message").text(d); a("#popup_message").html(a("#popup_message").text().replace(/\n/g, "<br />")); a("#popup_container").css({ minWidth: a("#popup_container").outerWidth(), maxWidth: a("#popup_container").outerWidth() }); a.alerts._reposition(); a.alerts._maintainPosition(true); switch (h) { case "info": case "warning": case "success": case "error": case "message": a("#popup_message").after('<div id="popup_panel" valign:"vertical"><input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold; position:relative;" class="popup_Button" value="' + a.alerts.okButton + '" id="popup_ok" /></div>'); a("#popup_ok").click(function () { a.alerts._hide(); b(true) }); a("#popup_ok").focus().keypress(function (j) { if (j.keyCode == 13 || j.keyCode == 27) { a("#popup_ok").trigger("click") } }); break; case "confirm": a("#popup_message").after('<div id="popup_panel" valign:"vertical"><input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button"  value="' + a.alerts.okButton + '" id="popup_ok" /> <input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button"  value="' + a.alerts.cancelButton + '" id="popup_cancel" /></div>'); a("#popup_ok").click(function () { a.alerts._hide(); if (b) { b(true) } }); a("#popup_cancel").click(function () { a.alerts._hide(); if (b) { b(false) } }); a("#popup_ok").focus(); a("#popup_ok, #popup_cancel").keypress(function (j) { if (j.keyCode == 13) { a("#popup_ok").trigger("click") } if (j.keyCode == 27) { a("#popup_cancel").trigger("click") } }); break; case "prompt": a("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel" valign:"vertical"><input type="button"  style="background-color:Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button"  value="' + a.alerts.okButton + '" id="popup_ok" /> <input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button" value="' + a.alerts.cancelButton + '" id="popup_cancel" /></div>'); a("#popup_prompt").width(a("#popup_message").width()); a("#popup_ok").click(function () { var e = a("#popup_prompt").val(); a.alerts._hide(); if (b) { b(e) } }); a("#popup_cancel").click(function () { a.alerts._hide(); if (b) { b(null) } }); a("#popup_prompt, #popup_ok, #popup_cancel").keypress(function (j) { if (j.keyCode == 13) { a("#popup_ok").trigger("click") } if (j.keyCode == 27) { a("#popup_cancel").trigger("click") } }); if (i) { a("#popup_prompt").val(i) } a("#popup_prompt").focus().select(); break } if (a.alerts.draggable) { try { a("#popup_container").draggable({ handle: a("#popup_title") }); a("#popup_title").css({ cursor: "move", font: 15 }) } catch (c) { } } }, _hide: function () { a("#popup_container").remove(); a.alerts._overlay("hide"); a.alerts._maintainPosition(false) }, _overlay: function (b) { switch (b) { case "show": a.alerts._overlay("hide"); a("BODY").append('<div id="popup_overlay"></div>'); a("#popup_overlay").css({ position: "absolute", zIndex: 99998, top: "0px", left: "0px", width: "100%", height: a(window).height() - 100 + "px", background: a.alerts.overlayColor, opacity: a.alerts.overlayOpacity }); break; case "hide": a("#popup_overlay").remove(); break } }, _reposition: function () { var c = ((a(window).height() / 2) - (a("#popup_container").outerHeight() / 2)) + a.alerts.verticalOffset; var b = ((a(window).width() / 2) - (a("#popup_container").outerWidth() / 2)) + a.alerts.horizontalOffset; if (c < 0) { c = 0 } if (b < 0) { b = 0 } if (a.browser.msie && parseInt(a.browser.version) <= 6) { c = c + a(window).scrollTop() } a("#popup_container").css({ top: c + "px", left: b + "px" }); a("#popup_overlay").height(a(document).height()) }, _maintainPosition: function (b) { if (a.alerts.repositionOnResize) { switch (b) { case true: a(window).bind("resize", function () { a.alerts._reposition() }); break; case false: a(window).unbind("resize"); break } } } }, MsgboxInfo = function (b) { a.alerts.Info(b) }, MsgboxWarning = function (b) { a.alerts.Warning(b) }, MsgboxSuccess = function (b) { a.alerts.Success(b) }, MsgboxError = function (b) { a.alerts.Error(b) }, MsgboxConfirm = function (b) { a.alerts.Confirm(b) }, MsgboxPrompt = function (b, c) { a.alerts.Prompt(b, c) }, MsgboxAlert = function (i, h, f, d, b) { var g = 2; try { if (f != 0) { a.ajax({ type: "POST", url: "../../FormsService.aspx/GetMessage", data: "{'sessionId':" + i.toString() + ",'messageType':'" + g + "','messageId':" + f.toString() + ",'messageCode':'" + d + "', 'customMessageOnDBFail':'" + b + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false, cache: false, success: function (k) { var l = k.d.DisplayMessage.toString(); var m = k.d.DisplayType.toString(); var e = l.toString(); var j = m.toString(); if (f == 39) { j = "9" } switch (j) { case "1": a.alerts.Success(e); break; case "2": a.alerts.Error(e); break; case "3": a.alerts.Warning(e); break; case "4": a.alerts.Info(e); break; case "5": a.alerts.Prompt(e); break; case "6": a.alerts.Confirm(e); break; case "7": a.alerts.Mandatory(e); break; case "8": a.alerts.Message(e); break; case "9": a.alerts.SubmitSuccess(e); break; default: a.alerts.Info(e) } }, error: function (k, e, j) { a.alerts.Error(k.status + " - " + k.responseText) } }) } else { if (f == 0) { switch (h) { case 1: a.alerts.Success(b); break; case 2: a.alerts.Error(b); break; case 3: a.alerts.Warning(b); break; case 4: a.alerts.Info(b); break; case 5: a.alerts.Prompt(b); break; case 6: a.alerts.Confirm(b); break; case 7: a.alerts.Mandatory(b); break; default: a.alerts.Info(b) } } } } catch (c) { alert(c) } }, MsgboxAlertDashboard = function (i, h, f, d, b) { var g = 2; try { if (f != 0) { a.ajax({ type: "POST", url: "../../FormsService.aspx/GetMessage", data: "{'sessionId':" + i.toString() + ",'messageType':'" + g + "','messageId':" + f.toString() + ",'messageCode':'" + d + "', 'customMessageOnDBFail':'" + b + "'}", contentType: "application/json; charset=utf-8", dataType: "json", async: false, cache: false, success: function (k) { var l = k.d.DisplayMessage.toString(); var m = k.d.DisplayType.toString(); var e = l.toString(); var j = m.toString(); switch (j) { case "1": a.alerts.Success(e); break; case "2": a.alerts.Error(e); break; case "3": a.alerts.Warning(e); break; case "4": a.alerts.Info(e); break; case "5": a.alerts.Prompt(e); break; case "6": a.alerts.Confirm(e); break; case "7": a.alerts.Mandatory(e); break; default: a.alerts.Info(e) } }, error: function (k, e, j) { a.alerts.Error(k.status + " - " + k.responseText) } }) } else { if (f == 0) { switch (h) { case 1: a.alerts.Success(b); break; case 2: a.alerts.Error(b); break; case 3: a.alerts.Warning(b); break; case 4: a.alerts.Info(b); break; case 5: a.alerts.Prompt(b); break; case 6: a.alerts.Confirm(b); break; case 7: a.alerts.Mandatory(b); break; default: a.alerts.Info(b) } } } } catch (c) { alert(c) } } })(jQuery);

var candidateId = 0, sessionId = 0;
var dashboardMode;
var countryId;
var Mode;
var roleGroupId;
var downloadFile;
var bgvPId = 6;
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
sessionId = parseInt(qs["ss"]);
dashboardMode = parseInt(qs["opmde"]);
countryId = parseInt(qs["cntry"]);
roleGroupId = parseInt(qs["rgid"]);
(function ($) {
    $.fn.liveDroppable = function (dropcomponent) {
        this.on("mouseenter", function () {
            if (!$(this).data("init")) {
                $(this).data("init", true).droppable(dropcomponent);
            }
        });
    };
} (jQuery));
$(document).ready(function () {
    BgvAssignVendorInfo.GetComponentList();
    BgvAssignVendorInfo.GetCandidateComponentData(candidateId, '', 0, 0, 0, 1);

    $('body').on("click", '#newvbox', function () {
        //  BgvAssignVendorInfo.AddNewVerification(1);
        var obj = $("#vlist");
        var lboxid = obj.children().last('div').attr('id');
        var boxcontent = '';
        var boxid = +lboxid[lboxid.length - 1] + 1;
        var assignType;
        $('#ul_compmaster').children('li').not('.li_head').each(function () {
            assignType = this.id.split('_')[4];
        });

        var verificationLevel = 1;
        if ($('#' + lboxid).children().find('.assign').length > 0) {
            MsgboxError('Please assign verification box -' + (boxid - 1) + ' before initiating a new verification');
        }
        else {
            boxcontent = boxcontent + BgvAssignVendorInfo.AddVerificationBox(boxid, '', '', '', '', 0, 0, '', '', 0, 1, assignType, verificationLevel, 0, '', 0);
            $('#vlist').append(boxcontent);
            $('#vbox_' + assignType + '_' + verificationLevel + '_' + boxid + ' .droptable').liveDroppable(dropcomponent);
            BgvAssignVendorInfo.GetFilters(51, 0, boxid, 'vlist');
            BgvAssignVendorInfo.GetFilters(52, 207, boxid, 'hrstatus');
        }
        $('#avheader').animate({ scrollTop: $(document).height() }, 'slow');
    });

    $('body').on("click", '.dshare', function () {
        var documentList = new Array();
        var verificationList = new Array();
        var componentList = new Array();

        var docshareId = this.id;
        var docchkId = $('#' + docshareId).siblings('input[type="checkbox"]').attr('id');
        if ($('#' + docchkId).is(':checked')) {
            var idList = docshareId.split('_');
            var documentData = new Object();
            documentData.BoxId = idList[2];
            documentData.ComponentCode = idList[3];
            documentData.ComponentDetailId = idList[4];
            documentData.ComponentRunnerId = idList[5];
            documentData.DocumentMatrixId = idList[6];
            documentData.AssignStatus = 1;
            documentList.push(documentData);

            BgvAssignVendorInfo.SaveCandidateDocument(documentList, componentList, verificationList)//, true);
        }
    });

    $('body').on("click", '.clrinsuf', function () {
        var documentList = new Array();
        var verificationList = new Array();
        var componentList = new Array();

        var insufId = this.id;
        //var clrcommentsId = $(this).closest('.clrcmt').attr('id');
        var compList = insufId.split('_');
        var componentData = new Object();
        componentData.BoxId = compList[2];
        componentData.ComponentCode = compList[3];
        componentData.ComponentDetailId = compList[4];
        componentData.ComponentRunnerId = compList[5];
        componentData.HrStatus = compList[6];
        componentData.HrComments = $('#' + insufId).prev().val();

        componentList.push(componentData);
        BgvAssignVendorInfo.SaveCandidateDocument(documentList, componentList, verificationList)//, true);

        $('#' + insufId).remove();
        $('#' + insufId).prev().remove();
    });

    $('body').on("click", '.secvendor', function () {
        var secvendorid = this.id;
        var compList = secvendorid.split('_');

        var obj = $("#vlist");
        var lboxid = obj.children().last('div').attr('id');
        var boxcontent = '';
        var boxid = +lboxid[lboxid.length - 1] + 1;
        var assignType;
        $('#ul_compmaster').children('li').not('.li_head').each(function () {
            assignType = this.id.split('_')[4];
        });
        var verificationLevel = 2;
        boxcontent = boxcontent + BgvAssignVendorInfo.AddVerificationBox(boxid, '', '', '', '', 0, 0, '', '', 0, 1, assignType, verificationLevel, 0, '', 0);
        $('#vlist').append(boxcontent);
        $('#vbox_' + assignType + '_' + verificationLevel + '_' + boxid + ' .droptable').liveDroppable(dropcomponent);
        BgvAssignVendorInfo.GetFilters(51, 0, boxid, 'vlist');
        BgvAssignVendorInfo.GetFilters(52, 207, boxid, 'hrstatus');
        BgvAssignVendorInfo.GetCandidateComponentData(candidateId, compList[3], compList[4], compList[5], boxid, 2);
        $('#' + secvendorid).remove();
    });

    $('body').on("click", '.assign', function () {
        var documentList = new Array();
        var verificationList = new Array();
        var componentList = new Array();

        var vheaderId = $(this).parent().parent().siblings('.vheader').attr('id');
        var vheaderList = vheaderId.split("_");
        var boxid = vheaderList[3];
        var assigntype = vheaderList[1];
        var verificationLevel = vheaderList[2];
        var vendor = '#' + vheaderId + ' select[name="selectvendor"]';
        var hrssstatusId = '#' + vheaderId + ' select[name="hrresponse"]';
        var hrsscommentId = '#' + vheaderId + ' input[name="hrcomment"]';
        var vendorId = $(vendor).children("option").filter(":selected").val();
        var hrstatus = 0;
        var hrcomment = '';
        var isactive = 1;
        var assignstatus = 1;
        var svlength = $('.selectvendor').length - 1;
        if (vendorId == -1) {
            MsgboxError("Please select vendor to assign");
            //alert('Please select vendor');
        }
        else {
            if ($(hrssstatusId).length) {
                hrstatus = $(hrssstatusId).children("option").filter(":selected").val();
            }
            else {
                hrstatus = 0;
            }
            if ($(hrsscommentId).length) {
                hrcomment = $(hrsscommentId).val();
            }

            var verificationData = new Object();
            verificationData.BoxId = boxid;
            verificationData.VendorId = vendorId;
            verificationData.HrStatus = hrstatus;
            verificationData.HrComment = hrcomment;
            verificationData.IsActive = isactive;
            verificationData.AssignType = assigntype;
            verificationData.VerificationLevel = verificationLevel;
            verificationList.push(verificationData);

            var compboxId = $(this).parent().parent().siblings('.compbox').attr('id');
            var tableId = $('#' + compboxId + ' .droptable').attr('id');

            $('#' + tableId + ' tr .compchk').each(function () {
                var compId = this.id;
                var comstatus = $('#' + compId).is(':checked');
                if (comstatus) {
                    var compList = compId.split('_');
                    var componentData = new Object();
                    componentData.BoxId = compList[2];
                    componentData.ComponentCode = compList[3];
                    componentData.ComponentDetailId = compList[4];
                    componentData.ComponentRunnerId = compList[5];
                    componentData.HrStatus = 0;
                    componentList.push(componentData);
                }
            });

            if ($('#' + tableId + ' .doclist').length != 0) {
                $('#' + tableId + ' .doclist').each(function () {
                    var docId = '#' + this.id + ' li';

                    var compId = this.id;
                    var compList = compId.split('_');
                    var comstatus = 0;
                    var compchkId = '#compstat_' + compList[1] + '_' + compList[2] + '_' + compList[3] + '_' + compList[4] + '_' + compList[5];
                    if ($(compchkId).length == 1) {
                        comstatus = $(compchkId).is(':checked');
                    }
                    if (comstatus) {
                        $(docId).each(function () {
                            var doc = '#' + this.id;
                            var idList = doc.split('_');
                            var status;
                            if ($(doc + ' input[type=checkbox]').length) {
                                status = $(doc + ' input[type=checkbox]').is(':checked');
                                var documentData = new Object();
                                documentData.BoxId = idList[2];
                                documentData.ComponentCode = idList[3];
                                documentData.ComponentDetailId = idList[4];
                                documentData.ComponentRunnerId = idList[5];
                                documentData.DocumentMatrixId = idList[6];
                                documentData.AssignStatus = (status == true ? 1 : 0);
                                documentList.push(documentData);
                            }
                        });
                    }
                });

                $('.selectvendor').each(function (i) {
                    if (i < svlength) {
                        var vendorname = $('#' + this.id).children("option").filter(":selected").text();
                        var componentname = '';
                        if (vendorId == $('#' + this.id).children("option").filter(":selected").val()) {

                            var vboxid = this.id.replace('sv', 'tb');

                            $('#' + vboxid + ' .doclist').each(function () {
                                var idList = this.id.split('_');

                                var compstatus = $.grep(componentList, function (e) { return (e.ComponentDetailId == idList[4] && e.ComponentRunnerId == idList[5]); });
                                if ($(compstatus).length > 0) {
                                    componentname = componentname + $('#' + this.id).parent().prev().prev('td').text() + ':' + $('#' + this.id).parent().prev('td').text() + '\n';
                                    assignstatus = 0;

                                }
                            });

                            if (assignstatus == 0) {
                                MsgboxError("Below Components:\n" + componentname + " are already assigned to " + vendorname + ".");
                            }
                        }
                    }


                });

                if (assignstatus == 1) {
                    BgvAssignVendorInfo.SaveCandidateDocument(documentList, componentList, verificationList)//, true);
                }
            }
            else {
                MsgboxError("Please add components to assign");
                // alert('Please add components to assign');
            }
        }
    });

    $('body').on("click", '.stopbgv', function () {


        var documentList = new Array();
        var verificationList = new Array();
        var componentList = new Array();

        var stopbgvId = this.id;

        var vheaderId = $(this).parent().parent().siblings('.vheader').attr('id');

        var vheaderList = vheaderId.split("_");
        var boxid = vheaderList[3];
        var conform = window.confirm('This is to notify that, once BGV is stopped no other operations are allowed for verification box-' + boxid);
        if (conform == 'true' || conform == 1) {
            var assigntype = vheaderList[1];
            var verificationLevel = vheaderList[2];
            var vendor = '#' + vheaderId + ' select[name="selectvendor"]';
            var hrssstatusId = '#' + vheaderId + ' select[name="hrresponse"]';
            var hrsscommentId = '#' + vheaderId + ' input[name="hrcomment"]';
            var vendorId = $(vendor).children("option").filter(":selected").val();
            var hrstatus = 0;
            var hrcomment = '';
            var isactive = 0;

            if ($(hrssstatusId).length) {
                hrstatus = $(hrssstatusId).children("option").filter(":selected").val();
            }
            else {
                hrstatus = 0;
            }
            if ($(hrsscommentId).length) {
                hrcomment = $(hrsscommentId).val();
            }

            var verificationData = new Object();
            verificationData.BoxId = boxid;
            verificationData.VendorId = vendorId;
            verificationData.HrStatus = hrstatus;
            verificationData.HrComment = hrcomment;
            verificationData.IsActive = isactive;
            verificationData.AssignType = assigntype;
            verificationData.VerificationLevel = verificationLevel;
            verificationList.push(verificationData);

            BgvAssignVendorInfo.SaveCandidateDocument(documentList, componentList, verificationList)//, false);
        }
    });

    $('body').on("change", 'select.hrresponse', function () {
        var vheaderId = $(this).closest('ul').attr('id');
        var boxid = vheaderId[vheaderId.length - 1];
        var hreresponse = '';
        if ($('#' + vheaderId + ' li .hrcomment').length == 0) {
            hreresponse = hreresponse + '<li class="width85"><label id="lbl_hrcomment_vbox_' + boxid + '">Comments:</label></li>';
            hreresponse = hreresponse + '<li><input type="text" id="hrcomment_vbox_' + boxid + '" class="hrcomment txtbox" name="hrcomment" /></li>';
        }
        if ($('#' + vheaderId + ' li .hrapproval').length == 0) {
            hreresponse = hreresponse + '<li class="width85"><input id="reportapproval_' + boxid + '" type="button" class="btn hrapproval" value="Submit" text="Submit" /></li>';
        }
        $('#' + vheaderId).append(hreresponse);
    });

    $('body').on("click", '.hrapproval', function () {
        var documentList = new Array();
        var verificationList = new Array();
        var componentList = new Array();

        var stopbgvId = this.id;

        var vheaderId = $(this).closest('.vheader').attr('id');

        var vheaderList = vheaderId.split("_");
        var boxid = vheaderList[3];
        var assigntype = vheaderList[1];
        var verificationLevel = vheaderList[2];
        var vendor = '#' + vheaderId + ' select[name="selectvendor"]';
        var hrssstatusId = '#' + vheaderId + ' select[name="hrresponse"]';
        var hrsscommentId = '#' + vheaderId + ' input[name="hrcomment"]';
        var vendorId = $(vendor).children("option").filter(":selected").val();
        var hrstatus = 0;
        var hrcomment = '';
        var isactive = 1;

        if ($(hrssstatusId).length) {
            hrstatus = $(hrssstatusId).children("option").filter(":selected").val();
        }
        else {
            hrstatus = 0;
        }
        if ($(hrsscommentId).length) {
            hrcomment = $(hrsscommentId).val();
        }
        var verificationData = new Object();
        verificationData.BoxId = boxid;
        verificationData.VendorId = vendorId;
        verificationData.HrStatus = hrstatus;
        verificationData.HrComment = hrcomment;
        verificationData.IsActive = isactive;
        verificationData.AssignType = assigntype;
        verificationData.VerificationLevel = verificationLevel;
        verificationList.push(verificationData);
        if (hrstatus == -1) {
            MsgboxError("Please select approve or reject");
            //alert('Please select vendor');
        }
        else {
            BgvAssignVendorInfo.SaveCandidateDocument(documentList, componentList, verificationList)//, true);
            //            if (verificationLevel == 2) {
            //                if ($('#' + vheaderId + ' ul li .secresponse').length == 0) {
            //                    $('#' + vheaderId + ' ul').append('<li style="width:100px;margin-left: 10px;"><input id="secresponse_' + boxid + '" type="button" class="btn secresponse" value="Update Primary Vendor" text="Update Primary Vendor" /></li>');
            //                }
            //            }
        }
    });

    $('body').on("change", '.compchk', function () {
        var compid = '#' + this.id.replace('compstat', 'doc');
        var chkstatus = $(this).is(':checked');
        $(compid + ' .av_checkbox').each(function () {
            $('#' + this.id).prop('checked', chkstatus);
        });

        if (chkstatus == 0 || chkstatus == 'false') {
            var conform = window.confirm('Do you want to remove this component from the component list ?');
            if (conform == 'true' || conform == 1) {
                var boxid = this.id.split('_')[2]
                var dropboxid = '#tb_vbox_' + boxid;
                $('#' + this.id).closest('tr').remove();
                var droptemp = $(dropboxid).find('tr').children('td').length;
                if (droptemp == 0) {
                    var html = '<tr id="dropbox_vbox_' + boxid + '" class="dropbox"><td colspan="5"> Drop here</td></tr>';

                    $(dropboxid).append(html);

                }
            }
        }

    });

    var dropcomponent = {
        drop: function (event, ui) {
            var draggableId = ui.draggable.attr("id");
            var droppableId = $(this).attr("id");
            var boxid = +droppableId[droppableId.length - 1];
            var compId = draggableId.split("_");
            var componentCode = compId[1];
            var componentDetailId = compId[2];
            var componentRunnerId = compId[3];
            var isCompExist = 0;

            //var destdropId = $('#' + droppableId + ' tr ul.doclist').attr('id');
            //var destcompId = destdropId.split("_");

            //BGvGetData.GetActivityList(draggableId);
            var compname = $('#' + draggableId + ' label').html();
            $('#' + droppableId + ' tr ul.doclist').each(function () {
                var doclistid = this.id;
                var tgtcompId = doclistid.split("_");
                //alert(tgtcompId[4] + '_' + componentDetailId + ',' + tgtcompId[5] + '_' + componentRunnerId);

                if ((tgtcompId[4] == componentDetailId) && (tgtcompId[5] == componentRunnerId)) {
                    isCompExist = 1;
                }
            });

            var dropboxid = $('#' + droppableId).parent().parent().attr('id');
            //var assignstatus = $('#' + dropboxid + ' .assign').length;

            if (isCompExist == 0) {
                if ($('#' + dropboxid).children().find('.assign').length > 0) {
                    BgvAssignVendorInfo.GetCandidateComponentData(candidateId, componentCode, componentDetailId, componentRunnerId, boxid, 2);

                }
                else {
                    MsgboxError('Create new verification to add new components to vendor');
                }
            }
            else {
                MsgboxError(compname + ' already available for verification');
            }
            //$(droppableId).append(toDrop);
            // $.fileUpload.Initialize();

        }
    };

    $(this).find(".droptable").droppable(dropcomponent);

    //$.fileUpload.Initialize();
});

var BgvAssignVendorInfo = {
    BgvCandidateDetail: {},
    BgvComponentDetail: {},
    BgvDocumentDetail: {},
    GetComponentList: function () {
        try {
            var data = "{";
            //data += "'sessionId':" + sessionId + ",";
            data += "'candidateId':" + candidateId;
            data += "}";

            $.ajax({
                type: 'post',
                url: "../../BGVService.aspx/GetAssignVendorComponents",
                data: data,
                dataType: "json",
                async: false,
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    BgvAssignVendorInfo.BindComponentList(JSON.parse(msg.d))
                },
                error: function (xhr, status, textRemarks) {
                    alert("Error : " + xhr.status + " " + textRemarks);
                    return false;
                }
            });
            return true;
        }
        catch (e) {
            alert(e.Message);
        }
    },
    BindComponentList: function (dataSrc) {
        var masterlist = '';
        var verifiedlist = '';
        var unassigedlist = '';
        $('ul.comp').children('li').not('.li_head').remove();
        $(dataSrc.ComponentList).each(function (i, data) {
            if (data.ComponentStatus == 1) {
                masterlist = masterlist + '<li id="comp_' + data.ComponentCode + '_' + data.ComponentDetailId + '_' + data.ComponentRunnerId + '_' + data.AssignType + '" class="addborder"> <label>' + data.ComponentDesc + '' + (data.ComponentCode == 'EMPPR' ? '-' + parseInt(data.ComponentRunnerId + 1) : '') + '</label></li>';
            }
            if (data.ComponentStatus == 2) {
                verifiedlist = verifiedlist + '<li id="comp_' + data.ComponentCode + '_' + data.ComponentDetailId + '_' + data.ComponentRunnerId + '_' + data.AssignType + '" class="addborder"> <label>' + data.ComponentDesc + '' + (data.ComponentCode == 'EMPPR' ? '-' + parseInt(data.ComponentRunnerId + 1) : '') + '</label></li>'; ;
            }
            if (data.ComponentStatus == 3) {
                unassigedlist = unassigedlist + '<li id="comp_' + data.ComponentCode + '_' + data.ComponentDetailId + '_' + data.ComponentRunnerId + '_' + data.AssignType + '" class="addborder"> <label>' + data.ComponentDesc + '' + (data.ComponentCode == 'EMPPR' ? '-' + parseInt(data.ComponentRunnerId + 1) : '') + '</label></li>'; ;
            }
        });
        $('#ul_compmaster').append(masterlist);
        $('#ul_verifycomp').append(verifiedlist);
        $('#ul_unassigncomp').append(unassigedlist);
        $('li.addborder').draggable({ helper: 'clone' });
    },
    GetCandidateComponentData: function (candidateId, componentCode, componentDetailId, componentRunnerId, boxId, spMode) {
        try {
            //  var componentCode = 'CLGUG';
            var data = "{";
            data += "'candidateId':" + candidateId + ",";
            data += "'componentCode':'" + componentCode + "',";
            data += "'componentDetailId':'" + componentDetailId + "',";
            data += "'componentRunnerId':'" + componentRunnerId + "',";
            data += "'mode':'" + spMode + "'";
            data += "}";

            $.ajax({
                type: 'post',
                url: "../../BGVService.aspx/GetAssignVendorCandidateData",
                data: data,
                dataType: "json",
                async: false,
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    BgvAssignVendorInfo.BindCandidateComponentData(JSON.parse(msg.d), boxId, spMode)
                },
                error: function (xhr, status, textRemarks) {
                    alert("Error : " + xhr.status + " " + textRemarks);
                    return false;
                }
            });
            return true;
        }
        catch (e) {
            alert(e.Message);
        }
    },
    BindCandidateComponentData: function (dataSrc, boxId, spMode) {
        BgvAssignVendorInfo.BgvComponentDetail = dataSrc.ComponentDetail;
        BgvAssignVendorInfo.BgvDocumentDetail = dataSrc.DocumentDetail;

        if (spMode == 1) {
            var boxcontent = '';
            var isActive;
            var assignmode = 0;
            BgvAssignVendorInfo.BgvCandidateDetail = dataSrc.CandidateDetail;
            $('#vlist').children().remove();

            $(BgvAssignVendorInfo.BgvCandidateDetail).each(function (i, data) {
                boxcontent = BgvAssignVendorInfo.AddVerificationBox(data.BoxId, data.VendorName, data.ExpectedClosureDate, data.HRSSStatus, data.HRSSComments, data.ReportStatus, data.ReportSubStatus, data.RStatusDesc, data.RSubStatusDesc, data.AssignStatus, data.IsActive, data.AssignType, data.VerificationLevel, data.AssociateId, data.ReportUpId, data.ReportUpRunnerId);
                isActive = data.IsActive;
                assignmode = (data.VendorId == 0 ? 0 : 1);
                $('#vlist').append(boxcontent);
                if (data.IsActive == 1 && data.VendorId != 0) {
                    $('#assign_' + data.BoxId).hide();
                }
                else {
                    $('#stopbgv_' + data.BoxId).hide();
                }

                BgvAssignVendorInfo.GetFilters(51, 0, data.BoxId, 'vlist');
                if (data.ReportStatus != 0) {
                    BgvAssignVendorInfo.GetFilters(52, 207, data.BoxId, 'hrstatus');
                }

                $('.vboxhead').each(function () {
                    var vboxid = this.id;
                    var boxid = vboxid[vboxid.length - 1];
                    if (boxid == data.BoxId) {
                        var vendor = '#' + vboxid + ' select[name="selectvendor"]';
                        // var ebcdateId = $('#' + vendor).find('input[type=text]').attr('id');
                        var selectId = '#' + $(vendor).attr('id');
                        //$(ebcdateId).attr('disabled', true);
                        $(selectId + ' option[value=' + data.VendorId + ']').prop("selected", true);
                        //$(ebcdateId).val = data.ExpectedClosureDate;

                        if (data.VendorId != 0) {
                            $(vendor).attr('disabled', true);
                        }
                        if (data.ReportStatus != 0) {
                            var hrssstatusId = '#' + vboxid + ' select[name="hrresponse"]';
                            var selecthrId = '#' + $(hrssstatusId).attr('id');
                            if ($(selecthrId).length) {
                                $(selecthrId + ' option[value=' + data.HRSSStatus + ']').prop("selected", true);

                                if (data.HRSSStatus == 1) {
                                    $(hrssstatusId).attr('disabled', true);
                                }
                            }
                        }
                    }
                });

                $('.vbox').each(function () {
                    var vboxid = this.id;
                    var boxid = vboxid[vboxid.length - 1];
                    if (boxid == data.BoxId && data.IsActive == 0) {
                        $(this).children().attr('disabled', true);
                    }
                });

                var tablecontent = '';
                var tableId = '#tb_vbox_' + data.BoxId;
                var approvalcomp = '';

                if ($(BgvAssignVendorInfo.BgvComponentDetail).length > 0) {
                    $(BgvAssignVendorInfo.BgvComponentDetail).each(function (i, comp) {

                        if (data.BoxId == comp.BoxId) {
                            tablecontent = BgvAssignVendorInfo.AddComponent(comp.BoxId, comp.ComponentDesc, comp.ComponentCode, comp.ComponentDetailId, comp.ComponentRunnerId,
                                                    comp.InstitutionName, comp.NHStatus, comp.VendorName, comp.VendorStatus, comp.VendorSubStatus, comp.VendorComments, comp.VendorStatusId, comp.VendorSubStatusId, comp.SecondaryVendorStatus, comp.AssignStatus);

                            var doccontent = '';
                            var doclistid = '#doc_vbox_' + comp.BoxId + '_' + comp.ComponentCode + '_' + comp.ComponentDetailId + '_' + comp.ComponentRunnerId;

                            var compstatus = $.grep(BgvAssignVendorInfo.BgvDocumentDetail, function (e) { return (e.ComponentDetailId == comp.ComponentDetailId && e.ComponentRunnerId == comp.ComponentRunnerId && e.BoxId == comp.BoxId); });

                            if ($(compstatus).length > 0) {
                                $(BgvAssignVendorInfo.BgvDocumentDetail).each(function (i, doc) {

                                    if (comp.BoxId == doc.BoxId && comp.ComponentDetailId == doc.ComponentDetailId && comp.ComponentRunnerId == doc.ComponentRunnerId) {

                                        doccontent = doccontent + BgvAssignVendorInfo.AddDocument(doc.BoxId, doc.ComponentCode, doc.ComponentDetailId, doc.ComponentRunnerId, doc.DocumentMatrixId, doc.DocumentName, doc.AssignStatus, spMode, assignmode, doc.UpId, doc.UpRunnerId, doc.DocumentType);
                                    }
                                });
                                //adding component
                                $(tableId + ' tr.dropbox').remove();
                                $(tableId).append(tablecontent);

                                //adding documents
                                $(doclistid).append(doccontent);
                            }
                            else {
                                approvalcomp = approvalcomp + comp.ComponentDesc + '' + (comp.ComponentCode == 'EMPPR' ? comp.ComponentRunnerId : " ") + '\n';
                            }
                        }
                    });
                }
                else {
                    MsgboxError("Please configure the component before assigning to vendor");
                }
                if (approvalcomp.length > 0) {
                    MsgboxError("Please upload all mandatory documents for the below components: \n" + approvalcomp + "");
                }
            });

            //            $(BgvAssignVendorInfo.BgvCandidateDetail).each(function (i, data) {
            //                var tablecontent = '';
            //                var tableId = '#tb_vbox_' + data.BoxId;
            //                $(BgvAssignVendorInfo.BgvComponentDetail).each(function (i, comp) {
            //                    if (data.BoxId == comp.BoxId) {
            //                        tablecontent = tablecontent + BgvAssignVendorInfo.AddComponent(comp.BoxId, comp.ComponentDesc, comp.ComponentCode, comp.ComponentDetailId, comp.ComponentRunnerId,
            //                                                    comp.InstitutionName, comp.NHStatus, comp.VendorName, comp.VendorStatus, comp.VendorSubStatus, comp.VendorComments, comp.VendorStatusId, comp.VendorSubStatusId, comp.SecondaryVendorStatus, comp.AssignStatus);
            //                    }
            //                });
            //                $(tableId + ' tr.dropbox').remove();
            //                $(tableId).append(tablecontent);
            //            });

            //            $(BgvAssignVendorInfo.BgvComponentDetail).each(function (i, comp) {
            //                var doccontent = '';
            //                var doclistid = '#doc_vbox_' + comp.BoxId + '_' + comp.ComponentCode + '_' + comp.ComponentDetailId + '_' + comp.ComponentRunnerId;
            //                $(BgvAssignVendorInfo.BgvDocumentDetail).each(function (i, doc) {
            //                    if (comp.BoxId == doc.BoxId && comp.ComponentDetailId == doc.ComponentDetailId && comp.ComponentRunnerId == doc.ComponentRunnerId) {
            //                        doccontent = doccontent + BgvAssignVendorInfo.AddDocument(doc.BoxId, doc.ComponentCode, doc.ComponentDetailId, doc.ComponentRunnerId, doc.DocumentMatrixId, doc.DocumentName, doc.AssignStatus, spMode, assignmode, doc.UpId, doc.UpRunnerId);
            //                    }
            //                });
            //                $(doclistid).append(doccontent);
            //            });
        }
        else if (spMode == 2) {
            var tablecontent = '';
            var doccontent = '';
            var doclistid = '';
            var tableId = '#tb_vbox_' + boxId;

            //BgvAssignVendorInfo.AddVerificationBox(boxId, '', '', '', 0, 0);

            //alert('dragcomp');
            if ($(BgvAssignVendorInfo.BgvComponentDetail).length > 0) {
                $(BgvAssignVendorInfo.BgvComponentDetail).each(function (i, comp) {
                    //alert(tablecontent);
                    tablecontent = tablecontent + BgvAssignVendorInfo.AddComponent(boxId, comp.ComponentDesc, comp.ComponentCode, comp.ComponentDetailId, comp.ComponentRunnerId,
                                                        comp.InstitutionName, comp.NHStatus, comp.VendorName, comp.VendorStatus, comp.VendorSubStatus, comp.VendorComments, comp.VendorStatusId, comp.VendorSubStatusId, comp.SecondaryVendorStatus, comp.AssignStatus);
                    doclistid = '#doc_vbox_' + boxId + '_' + comp.ComponentCode + '_' + comp.ComponentDetailId + '_' + comp.ComponentRunnerId;
                });

                if ($(BgvAssignVendorInfo.BgvDocumentDetail).length > 0) {
                    $(BgvAssignVendorInfo.BgvDocumentDetail).each(function (i, doc) {
                        doccontent = doccontent + BgvAssignVendorInfo.AddDocument(boxId, doc.ComponentCode, doc.ComponentDetailId, doc.ComponentRunnerId, doc.DocumentMatrixId, doc.DocumentName, doc.AssignStatus, spMode, 0, doc.UpId, doc.UpRunnerId, doc.DocumentType);
                    });

                    //add components
                    $(tableId + ' tr.dropbox').remove();
                    $(tableId).append(tablecontent);

                    //adding docs
                    $(doclistid).append(doccontent);
                }
                else {
                    var complist = '';
                    $(BgvAssignVendorInfo.BgvComponentDetail).each(function (i, comp) {
                        // complist = complist + comp.ComponentDesc + ':' + comp.ComponentRunnerId + '-';
                        complist = complist + comp.ComponentDesc + '' + (comp.ComponentCode == 'EMPPR' ? comp.ComponentRunnerId : " ") + '\n';
                    });
                    MsgboxError("Please upload documents for the below components: \n" + complist + "");
                }
            }
            else {
                MsgboxError("Please configure the component before assigning to vendor");
            }

            //            //alert('dragdoc');
        }

        $('.av_checkbox').each(function () {
            if ($(this).hasClass("unselected")) {
                $(this).attr('checked', false);
            }
            else {
                if ($(this).hasClass("selected")) {
                    $(this).attr('checked', true);
                }
            }
        });
        //settablebackground();
        $.fileUpload.Initialize();
        //  $('.vbox').last().find('[fu-id]').each(function () { var chk = $(this).attr('fu-id').match(/CADDYRS/g); if (chk && $('[fu-id="ADDYRS"]').length > 0) { $(this).remove(); } });
    },
    GetFilters: function (mode, parentId, boxid, dsrc) {
        var data = "{";
        data += "'mode':" + mode.toString() + ",";
        data += "'candidateId':" + candidateId + ",";
        data += "'parentcode':" + parentId.toString();
        data += "}";
        if (dsrc == 'vlist') { var vendorlist = $('#sv_vbox_' + boxid); }
        else if (dsrc == 'hrstatus') { var hrssstatus = $('#hrres_vbox_' + boxid); }
        $.ajax({
            type: "post",
            url: "../../FormsService.aspx/GetGeographyMaster",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            cache: false,
            success: function (msg) {
                var test = msg.d;
                $(msg.d).each(function (i, item) {
                    try {
                        if (dsrc == 'vlist') { vendorlist.get(0).options[vendorlist.get(0).options.length] = new Option(item.Description, item.ID); }
                        else if (dsrc == 'hrstatus') { hrssstatus.get(0).options[hrssstatus.get(0).options.length] = new Option(item.Description, item.ID); }
                    } catch (e) { }
                });
            },
            error: function (xhr, status, textRemarks) { alert("Error " + xhr.status + " " + textRemarks); }
        });
    },
    SaveCandidateDocument: function (documentList, componentList, verificationList) {//, ActiveStatus) 
        try {
            var data = JSON.stringify({ candidateId: candidateId, verifyList: verificationList, compList: componentList, docList: documentList }); //, isActive: ActiveStatus
            $.ajax({
                type: 'post',
                url: "../../BGVService.aspx/SaveAssignVendorDocument",
                data: data,
                dataType: "json",
                async: false,
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    if (msg.d == 1) {
                        BgvAssignVendorInfo.GetComponentList();
                        BgvAssignVendorInfo.GetCandidateComponentData(candidateId, '', 0, 0, 0, 1);
                    }
                    else {
                        MsgboxError("Please check the components list");
                    }
                },
                error: function (xhr, status, textRemarks) {
                    alert("Error : " + xhr.status + " " + textRemarks);
                    return false;
                }
            });
            return true;
        }
        catch (e) {
            alert(e.Message);
        }
    },
    AddVerificationBox: function (boxid, vendor, expectedCDate, hrrssresponse, hrsscomments, reportStatus, reportSubStatus, rStatusDesc, rSubStatusDesc, assignStatus, activeStatus, assignType, verificationLevel, associateId, reportUpId, reportUpRunnerId) {
        var date = new Date(parseInt(expectedCDate.substr(6)));
        var dateFormat = $.datepicker.formatDate('MM dd yy', date);

        var html = '<div id="vbox_' + assignType + '_' + verificationLevel + '_' + boxid + '" class="vbox">';
        html = html + '<div class="vboxname"> Verification Box - ' + boxid + '</div>';
        html = html + '<div id="vheader_' + assignType + '_' + verificationLevel + '_' + boxid + '" class="vheader">';

        html = html + '<div class="vendorinfo"> ' + (assignType == 2 ? "Suspect" : "Document") + ' Verification </div>';
        html = html + '<div id="header_vbox_' + assignType + '_' + verificationLevel + '_' + boxid + '" class="vboxhead">';

        html = html + '<ul id="hlist_vbox_' + assignType + '_' + verificationLevel + '_' + boxid + '" class="flft content">';
        html = html + '<li class="width85"><label id="lbl_vendor_vbox_' + boxid + '">Vendor:</label></li>';
        html = html + '<li><select id="sv_vbox_' + boxid + '" class="selectvendor styled" name="selectvendor"></select></li>';
        if (vendor != '' || vendor.length != 0) {
            html = html + '<li class="width85"><label id="lbl_ecd_vbox_' + boxid + '">Expected BGV Closure Date:</label></li>';
            html = html + '<li><input type="text" class="txtbox ebcdata" value="' + dateFormat + '" disabled="true" /></li>';
        }
        if (associateId != 0 && associateId.length != 0) {
            html = html + '<li class="width85"><label id="lbl_assid_vbox_' + boxid + '">AssociateId:</label></li>';
            html = html + '<li><input type="text" class="txtbox associateid" value="' + associateId + '" disabled="true" /></li>';
        }
        if (reportStatus != 0) {
            html = html + '<div class="clear"></div><li class="width85"><label id="lbl_status_' + boxid + '"> Report Status: </label></li>';
            html = html + '<li><input type="text" class="txtbox" value="' + rStatusDesc + '" disabled="true"/></li>';
            html = html + '<li class="width85"><label id="lbl_substatus_' + boxid + '"> Report SubStatus: </label></li>';
            html = html + '<li><input type="text" class="txtbox" value="' + rSubStatusDesc + '" disabled="true" /></li>';
            //html = html + '<li class="width85"><a id="report_' + boxid + '" href="#." fu-id="report_' + boxid + '"> Report</a><div  fu-upId="' + reportUpId + '" fu-rnId="' + reportUpRunnerId + '" fu-cntId="report_' + boxid + '" fu-ui="customBtn"/></li><div class="clear"></div>';
            html = html + '<li class="width85"><a id="report_' + boxid + '" href="#." fu-id="report_' + reportUpId + '_' + reportUpRunnerId + '"> Report</a><div  fu-upId="' + reportUpId + '" fu-rnId="' + reportUpRunnerId + '" fu-cntId="report_' + reportUpId + '_' + reportUpRunnerId + '" fu-ui="customBtn"/></li><div class="clear"></div>';
            html = html + '<li class="width85"><label id="lbl_hrres_vbox_' + boxid + '">HRSS Response:</label></li>';
            html = html + '<li><select id="hrres_vbox_' + boxid + '" class="hrresponse" name="hrresponse"></select></li>';
            if (hrrssresponse != 0) {
                html = html + '<li class="width85"><label id="lbl_hrcomment_vbox_' + boxid + '">Comments:</label></li>';
                html = html + '<li><input type="text" id="hrcomment_vbox_' + boxid + '" class="hrcomment txtbox" name="hrcomment" value="' + hrsscomments + '" /></li>';
            }
            //html = html + '<li class="width85"><label id="lbl_hrcomment_vbox_' + boxid + '">Comments:</label></li>';
            //html = html + '<li><input type="text" id="hrcomment_vbox_' + boxid + '" class="hrcomment txtbox" name="hrcomment" /></li>';
            //html = html + '<li class="width85"><input id="reportapproval_' + boxid + '" type="button" class="btn" value="Submit" text="Submit" /></li>';
        }
        html = html + '</ul>';

        html = html + '</div></div>'
        html = html + '<div id="comp_vbox_' + assignType + '_' + verificationLevel + '_' + boxid + '" class="compbox">';
        html = html + '<table id="tb_vbox_' + boxid + '" class="droptable">';

        if (assignStatus == 1) {
            html = html + '<tr>';
            html = html + '<th style="width: 70px;" rowspan="2">Type</th>';
            html = html + '<th style="width: 100px;" rowspan="2">Institution Name</th>';
            html = html + '<th style="width: 350px;" rowspan="2">Document List</th>';
            html = html + '<th style="width: 70px;" rowspan="2">NH Status</th>';
            html = html + '<th colspan="3">Vendor Information</th>';
            html = html + '</tr>';
            html = html + '<tr>';
            //html = html + '<th>Name</th>';
            html = html + '<th style="width: 110px;">Response</th>';
            html = html + '<th>Comments</th>';
            html = html + '</tr>';
        }
        else {
            html = html + '<tr>';
            html = html + '<th style="width: 70px;">Type</th>';
            html = html + '<th style="width: 100px;">Institution Name</th>';
            html = html + '<th style="width: 350px;">Document List</th>';
            html = html + '<th style="width: 70px;">NH Status</th>';
            html = html + '<th style="width: 70px;">Vendor Status</th>';
            html = html + '</tr>';

            html = html + '<tr id="dropbox_vbox_' + boxid + '" class="dropbox">';
            html = html + '<td colspan="5"> Drop here</td>';
            html = html + '</tr>';
        }

        html = html + '</table> </div>'
        html = html + '<div id="vfooter_' + assignType + '_' + verificationLevel + '_' + boxid + '" class="vfooter">';
        html = html + '<div id="footer_vbox_' + assignType + '_' + verificationLevel + '_' + boxid + '" class="vboxfoot" style="text-align:' + (assignStatus == 0 ? "right" : "left") + ';">';
        if (assignStatus == 1) {
            if (hrrssresponse != 1) {
                html = html + '<input id="stopbgv_' + boxid + '" type="button" value="Stop BGV" class="btn stopbgv" />';
            }
        }
        else {
            html = html + '<input id="assign_' + boxid + '" type="button" value="Assign Vendor" class="btn assign" />';
        }
        html = html + '</div>';
        html = html + '</div>';
        html = html + '</div>';
        return html;
    },
    AddComponent: function (boxId, componentDesc, componentCode, componentDetailId, componentRunnerId, institutionName, nHStatus, vendorName, vendorStatus, vendorSubStatus, vendorComments, vendorStatusId, vendorSubStatusId, secondaryVendorStatus, assignStatus) {
        var html = '';
        var doclistId = 'vbox_' + boxId + '_' + componentCode + '_' + componentDetailId + '_' + componentRunnerId;

        html = html + '<tr>';
        html = html + '<td>';
        if (assignStatus == 0) {
            html = html + '<input id="compstat_' + doclistId + '" class="av_checkbox selected compchk" type="checkbox"/> ';
        }
        html = html + '' + componentDesc + '</td>';
        html = html + '<td>' + institutionName + '</td>';
        html = html + '<td><ul id="doc_' + doclistId + '" class="doclist"></ul></td>';
        html = html + '<td>' + nHStatus + '</td>';

        if (vendorName == '' || vendorName.length == 0) {
            html = html + '<td><div>' + vendorStatus + '</div></td>';
        }
        else {
            // html = html + '<td>' + vendorName + '</td>';
            html = html + '<td><div class="statusdiv">';
            html = html + '<div class="vstatus">' + vendorStatus + '</div></Br>';
            html = html + '<div class="vsubstatus">' + vendorSubStatus + '</div></Br>';
            if (vendorStatusId == 2) {
                html = html + '<input id="clrcmt_' + doclistId + '_' + vendorStatusId + '" type="text" class="txtbox clrcmt">';
                html = html + '<input id="clr_' + doclistId + '_' + vendorStatusId + '" type="button" value="Clear insufficiency" class="btn clrinsuf" />';

            }
            else if (vendorStatusId == 4 && vendorSubStatusId == 1) {
                html = html + '<input id="clrcmt_' + doclistId + '_' + vendorStatusId + '" type="text" class="txtbox clrcmt">';
                html = html + '<input id="clr_' + doclistId + '_' + vendorStatusId + '" type="button" value="Complete Review" class="btn clrinsuf" />';
            }
            else if (vendorStatusId == 6 && vendorSubStatusId == 1) {
                html = html + '<input id="clrcmt_' + doclistId + '_' + vendorStatusId + '" type="text" class="txtbox clrcmt">';
                html = html + '<input id="clr_' + doclistId + '_' + vendorStatusId + '" type="button" value="Clear Unable to verify" class="btn clrinsuf" />';
                if (secondaryVendorStatus == 0) {
                    html = html + '<input id="secvendor_' + doclistId + '_' + vendorStatusId + '" type="button" value="Initiate New Verification" class="btn secvendor" />';
                }
            }
            html = html + '</div></td>';
            //html = html + '<td title="' + vendorComments + '">' + vendorComments.substring(0, 10) + '..</td>';
            //html = html + '<td title="' + vendorComments + '">' + vendorComments+ '</td>';
            //html = html + '<td> <textarea readonly>' + vendorComments + '</textarea></td>';
            html = html + '<td> <p class="vcomment">' + vendorComments + '</p></td>';
        }
        html = html + '</tr>';
        return html;
    },
    AddDocument: function (boxId, componentCode, componentDetailId, componentRunnerId, documentMatrixId, documentName, assignStatus, spMode, assignmode, UpId, UpRunnerId, DocumentType) {
        var html = '';
        var docid = 'vbox_' + boxId + '_' + componentCode + '_' + componentDetailId + '_' + componentRunnerId + '_' + documentMatrixId;
        var fuId = componentRunnerId + '_' + UpId + '_' + UpRunnerId;
        html = html + '<li id="doc_' + docid + '">';
        if (assignStatus != 1) {
            html = html + '<input id="docstat_' + docid + '" class="av_checkbox doccheck ' + (assignmode == 0 ? "selected" : "unselected") + '" type="checkbox" value="' + assignStatus + '"/> ';
        }
        if (DocumentType == 1) {
            html = html + '<a id="Doc_' + docid + '" href="#."  fu-id="' + fuId + '" class="doc">' + documentName + '</a>';
            html = html + '<div  fu-upId="' + UpId + '" fu-rnId="' + UpRunnerId + '" fu-cntId="' + fuId + '" fu-ui="customBtn"/>';
        }
        else {
            html = html + documentName;
        }

        if (spMode == 1) {
            if (assignStatus == 0 || assignStatus.length == 0) {
                if (assignmode == 1) {
                    html = html + '<input id="docshare_' + docid + '" type="button" value="Share" class="dshare" />';
                }
            }
        }
        html = html + '</li><div class="clear"></div>';
        return html;
    }
}

function settablebackground() {
    // $('tr:even td').css('background-color', '#ffffff');
    //$('tr:odd td').css('background-color', '#e1e7e9');
    $('tr th:not(:last-child)').css('border-right', '1px solid #b2b2b2');
    $('tr td:not(:last-child)').css('border-right', '1px solid #b2b2b2');
    $('tr:not(:last-child) td').css('border-bottom', '1px solid #b2b2b2');
}
var customBtn = {
    uiCustomType: 1
}
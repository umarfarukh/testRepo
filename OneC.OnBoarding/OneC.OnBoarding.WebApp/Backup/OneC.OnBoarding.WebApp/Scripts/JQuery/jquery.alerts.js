// jQuery Alert Dialogs Plugin

(function ($) {

    $.alerts = {

        // These properties can be read/written by accessing $.alerts.propertyName from your scripts at any time

        verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
        horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
        repositionOnResize: true,           // re-centers the dialog on window resize
        overlayOpacity: .70,                // transparency level of overlay
        overlayColor: '#000000',               // base color of overlay
        Color: '#FF9',
        bckgrdPopupColor: '#ffffff',
        draggable: false,                    // make the dialogs draggable (requires UI Draggables plugin)
        okButton: '&nbsp;OK&nbsp;',         // text for the OK button
        cancelButton: '&nbsp;Cancel&nbsp;', // text for the Cancel button
        dialogClass: null,                  // if specified, this class will be applied to all dialogs

        // Public methods
        Info: function (message) {
            $.alerts._show1('Information', message, null, 'info', function (result) {
            });
        },

        Mandatory: function (message) {
            $.alerts._show1('Mandatory Fields', message, null, 'info', function (result) {
            });
        },

        Warning: function (message) {
            $.alerts._show1('Warning', message, null, 'warning', function (result) {
            });
        },

        Success: function (message) {
            $.alerts._show1('Success', message, null, 'success', function (result) {
            });
        },

        Error: function (message) {
            $.alerts._show1('Error', message, null, 'error', function (result) {
            });
        },

        Confirm: function (message) {
            $.alerts._show1('Confirmation', message, null, 'confirm', function (result) {
            });
        },

        Prompt: function (message, value) {
            $.alerts._show1('Prompt', message, value, 'prompt', function (result) {
            });
        },

        Message: function (message) {
            $.alerts._show1('Message', message, null, 'message', function (result) {
            });
        },

        // included to close the form once it gets submitted : By 207953
        SubmitSuccess: function (message) {
            $.alerts._show1('Success', message, null, 'success', function (result) {
                window.close();
            });
        },
        // Private methods

        _show1: function (title, msg, value, type, callback) {

            $.alerts._hide();
            $.alerts._overlay('show');
            if (title == "Message") {
                $("BODY").append(
			  '<div id="popup_container">' +
			    '<h1 id="popup_title" align="center"></h1>' +
			    '<div id="popup_content">' +
			      '<div id="popup_message" style="padding:5px 5px 7px;border:0px;height:300px;border-color:blue;margin-left:0px;margin-right:10px;font-size:14;overflow:auto;"></div>' +
				'</div>' +
			  '</div>');
            }
            else {
                $("BODY").append(
			  '<div id="popup_container">' +
			    '<h1 id="popup_title" align="center"></h1>' +
			    '<div id="popup_content">' +
			      '<div id="popup_message" style="padding:5px 5px 7px;border:0px;height:150px;border-color:blue;margin-left:0px;margin-right:10px;font-size:14;overflow:auto;"></div>' +
				'</div>' +
			  '</div>');
            }

            if ($.alerts.dialogClass) $("#popup_container").addClass($.alerts.dialogClass);

            // IE6 Fix
            var pos = ($.browser.msie && parseInt($.browser.version) <= 6) ? 'absolute' : 'fixed';
            if (title == "Message") {
                $("#popup_container").css({
                    width: 700,
                    height: 'auto',
                    position: pos,
                    zIndex: 99999,
                    padding: 0,
                    margin: 50,
                    left: 400,
                    background: $.alerts.bckgrdPopupColor

                });

            }
            else {

                $("#popup_container").css({
                    width: 450,
                    height: 300,
                    position: pos,
                    zIndex: 99999,
                    padding: 0,
                    margin: 50,
                    left: 400,
                    background: $.alerts.bckgrdPopupColor

                });
            }

            $("#popup_title").text(title);
            $("#popup_content").addClass(type);
            $("#popup_message").text(msg);
            $("#popup_message").html($("#popup_message").text().replace(/\n/g, '<br />'));

            $("#popup_container").css({
                minWidth: $("#popup_container").outerWidth(),
                maxWidth: $("#popup_container").outerWidth()
            });

            $.alerts._reposition();
            $.alerts._maintainPosition(true);
            switch (type) {
                case 'info':
                case 'warning':
                case 'success':
                case 'error':
                case 'message':
                    $("#popup_message").after('<div id="popup_panel" valign:"vertical"><input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold; position:relative;" class="popup_Button" value="' + $.alerts.okButton + '" id="popup_ok" /></div>');
                    $("#popup_ok").click(function () {
                        $.alerts._hide();
                        callback(true);
                    });
                    $("#popup_ok").focus().keypress(function (e) {
                        if (e.keyCode == 13 || e.keyCode == 27) $("#popup_ok").trigger('click');
                    });
                    break;
                case 'confirm':
                    $("#popup_message").after('<div id="popup_panel" valign:"vertical"><input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button"  value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button"  value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
                    $("#popup_ok").click(function () {
                        $.alerts._hide();
                        if (callback) callback(true);
                    });
                    $("#popup_cancel").click(function () {
                        $.alerts._hide();
                        if (callback) callback(false);
                    });
                    $("#popup_ok").focus();
                    $("#popup_ok, #popup_cancel").keypress(function (e) {
                        if (e.keyCode == 13) $("#popup_ok").trigger('click');
                        if (e.keyCode == 27) $("#popup_cancel").trigger('click');
                    });
                    break;
                case 'prompt':
                    $("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel" valign:"vertical"><input type="button"  style="background-color:Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button"  value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button"  style="background-color: Gray; color: #FFFFFF; font-weight: bold;" class="popup_Button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
                    $("#popup_prompt").width($("#popup_message").width());
                    $("#popup_ok").click(function () {
                        var val = $("#popup_prompt").val();
                        $.alerts._hide();
                        if (callback) callback(val);
                    });
                    $("#popup_cancel").click(function () {
                        $.alerts._hide();
                        if (callback) callback(null);
                    });
                    $("#popup_prompt, #popup_ok, #popup_cancel").keypress(function (e) {
                        if (e.keyCode == 13) $("#popup_ok").trigger('click');
                        if (e.keyCode == 27) $("#popup_cancel").trigger('click');
                    });
                    if (value) $("#popup_prompt").val(value);
                    $("#popup_prompt").focus().select();
                    break;
            }

            // Make draggable
            if ($.alerts.draggable) {
                try {
                    $("#popup_container").draggable({ handle: $("#popup_title") });
                    $("#popup_title").css({ cursor: 'move', font: 15 });
                } catch (e) { /* requires jQuery UI draggables */ }
            }
        },


        _hide: function () {
            $("#popup_container").remove();
            $.alerts._overlay('hide');
            $.alerts._maintainPosition(false);
        },

        _overlay: function (status) {
            switch (status) {
                case 'show':
                    $.alerts._overlay('hide');
                    $("BODY").append('<div id="popup_overlay"></div>');
                    $("#popup_overlay").css({
                        position: 'absolute',
                        zIndex: 99998,
                        top: '0px',
                        left: '0px',
                        width: '100%',
                        height: $(window).height() - 100 + 'px',
                        background: $.alerts.overlayColor,
                        opacity: $.alerts.overlayOpacity
                    });
                    break;
                case 'hide':
                    $("#popup_overlay").remove();
                    break;
            }
        },

        _reposition: function () {
            var top = (($(window).height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.alerts.verticalOffset;
            var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
            if (top < 0) top = 0;
            if (left < 0) left = 0;

            // IE6 fix
            if ($.browser.msie && parseInt($.browser.version) <= 6) top = top + $(window).scrollTop();

            $("#popup_container").css({
                top: top + 'px',
                left: left + 'px'
            });
            $("#popup_overlay").height($(document).height());
        },

        _maintainPosition: function (status) {
            if ($.alerts.repositionOnResize) {
                switch (status) {
                    case true:
                        $(window).bind('resize', function () {
                            $.alerts._reposition();
                        });
                        break;
                    case false:
                        $(window).unbind('resize');
                        break;
                }
            }
        }

    },



    // Shortcut functions
    MsgboxInfo = function (message) {
        $.alerts.Info(message);
    },

    MsgboxWarning = function (message) {
        $.alerts.Warning(message);
    },

    MsgboxSuccess = function (message) {
        $.alerts.Success(message);
    },

    MsgboxError = function (message) {
        $.alerts.Error(message);
    },

    MsgboxConfirm = function (message) {
        $.alerts.Confirm(message);
    },

    MsgboxPrompt = function (message, value) {
        $.alerts.Prompt(message, value);
    },
    MsgboxInfo1 = function (sessionId, messageType, messageId, messageCode, customMessageOnDBFail, mode) {
        //var Methodtype = 2;
        var messageMode = 2;
        var url = '';
        if (mode == 1) {
            url = "../../../../FormsService.aspx/GetMessage"
        } else {
        url = "../FormsService.aspx/GetMessage"
        }
        try {
            if (messageId != 0) {
                $.ajax({
                    type: "POST",
                    url: url,
                    data: "{'sessionId':" + sessionId.toString() + ",'messageType':'" + messageMode + "','messageId':" + messageId.toString() + ",'messageCode':'" + messageCode + "', 'customMessageOnDBFail':'" + customMessageOnDBFail + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    cache: false,

                    success: function (msg) {
                        var strmsg = msg.d.DisplayMessage.toString();
                        var strmsgtype = msg.d.DisplayType.toString();
                        var Displaymsg = strmsg.toString();
                        var Displaymsgtype = strmsgtype.toString();
                        // included by 207953 : To close the form automatically once it is submitted               
                        if (messageId == 39 || messageId == 205) {
                            Displaymsgtype = '9';
                        }
                        switch (Displaymsgtype) {
                            case '1':
                                $.alerts.Success(Displaymsg);
                                break;
                            case '2':
                                $.alerts.Error(Displaymsg);
                                break;
                            case '3':
                                $.alerts.Warning(Displaymsg);
                                break;
                            case '4':
                                $.alerts.Info(Displaymsg);
                                break;
                            case '5':
                                $.alerts.Prompt(Displaymsg);
                                break;
                            case '6':
                                $.alerts.Confirm(Displaymsg);
                                break;
                            case '7':
                                $.alerts.Mandatory(Displaymsg);
                                break;
                            case '8':
                                $.alerts.Message(Displaymsg);
                                break;
                            case '9':
                                $.alerts.SubmitSuccess(Displaymsg);
                                break;
                            default:
                                $.alerts.Info(Displaymsg);
                        };
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        $.alerts.Error(xhr.status + " - " + xhr.responseText);
                    }
                });
            }
            else if (messageId == 0) {
                switch (messageType) {
                    case 1:
                        $.alerts.Success(customMessageOnDBFail);
                        break;
                    case 2:
                        $.alerts.Error(customMessageOnDBFail);
                        break;
                    case 3:
                        $.alerts.Warning(customMessageOnDBFail);
                        break;
                    case 4:
                        $.alerts.Info(customMessageOnDBFail);
                        break;
                    case 5:
                        $.alerts.Prompt(customMessageOnDBFail);
                        break;
                    case 6:
                        $.alerts.Confirm(customMessageOnDBFail);
                        break;
                    case 7:
                        $.alerts.Mandatory(customMessageOnDBFail);
                        break;
                    default:
                        $.alerts.Info(customMessageOnDBFail);
                }
            }
        }
        catch (e) {
            alert(e);
        }
    },
    MsgboxAlert = function (sessionId, messageType, messageId, messageCode, customMessageOnDBFail) {
        //var Methodtype = 2;
        var messageMode = 2;
        try {
            if (messageId != 0) {
                $.ajax({
                    type: "POST",
                    url: "../../../../FormsService.aspx/GetMessage",
                    data: "{'sessionId':" + sessionId.toString() + ",'messageType':'" + messageMode + "','messageId':" + messageId.toString() + ",'messageCode':'" + messageCode + "', 'customMessageOnDBFail':'" + customMessageOnDBFail + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    cache: false,
                    success: function (msg) {
                        var strmsg = msg.d.DisplayMessage.toString();
                        var strmsgtype = msg.d.DisplayType.toString();
                        var Displaymsg = strmsg.toString();
                        var Displaymsgtype = strmsgtype.toString();
                        // included by 207953 : To close the form automatically once it is submitted               
                        if (messageId == 39 || messageId == 205) {
                            Displaymsgtype = '9';
                        }
                        switch (Displaymsgtype) {
                            case '1':
                                $.alerts.Success(Displaymsg);
                                break;
                            case '2':
                                $.alerts.Error(Displaymsg);
                                break;
                            case '3':
                                $.alerts.Warning(Displaymsg);
                                break;
                            case '4':
                                $.alerts.Info(Displaymsg);
                                break;
                            case '5':
                                $.alerts.Prompt(Displaymsg);
                                break;
                            case '6':
                                $.alerts.Confirm(Displaymsg);
                                break;
                            case '7':
                                $.alerts.Mandatory(Displaymsg);
                                break;
                            case '8':
                                $.alerts.Message(Displaymsg);
                                break;
                            case '9':
                                $.alerts.SubmitSuccess(Displaymsg);
                                break;
                            default:
                                $.alerts.Info(Displaymsg);
                        };
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        $.alerts.Error(xhr.status + " - " + xhr.responseText);
                    }
                });
            }
            else if (messageId == 0) {
                switch (messageType) {
                    case 1:
                        $.alerts.Success(customMessageOnDBFail);
                        break;
                    case 2:
                        $.alerts.Error(customMessageOnDBFail);
                        break;
                    case 3:
                        $.alerts.Warning(customMessageOnDBFail);
                        break;
                    case 4:
                        $.alerts.Info(customMessageOnDBFail);
                        break;
                    case 5:
                        $.alerts.Prompt(customMessageOnDBFail);
                        break;
                    case 6:
                        $.alerts.Confirm(customMessageOnDBFail);
                        break;
                    case 7:
                        $.alerts.Mandatory(customMessageOnDBFail);
                        break;
                    default:
                        $.alerts.Info(customMessageOnDBFail);
                }
            }
        }
        catch (e) {
            alert(e);
        }
    },

    MsgboxAlertDashboard = function (sessionId, messageType, messageId, messageCode, customMessageOnDBFail) {
        //var Methodtype = 2;
        var messageMode = 2; 
        try {
            if (messageId != 0) {
                $.ajax({
                    type: "POST",
                    url: "../../FormsService.aspx/GetMessage",
                    data: "{'sessionId':" + sessionId.toString() + ",'messageType':'" + messageMode + "','messageId':" + messageId.toString() + ",'messageCode':'" + messageCode + "', 'customMessageOnDBFail':'" + customMessageOnDBFail + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    cache: false,
                    success: function (msg) {
                        var strmsg = msg.d.DisplayMessage.toString();
                        var strmsgtype = msg.d.DisplayType.toString();
                        var Displaymsg = strmsg.toString();
                        var Displaymsgtype = strmsgtype.toString();

                        switch (Displaymsgtype) {
                            case '1':
                                $.alerts.Success(Displaymsg);
                                break;
                            case '2':
                                $.alerts.Error(Displaymsg);
                                break;
                            case '3':
                                $.alerts.Warning(Displaymsg);
                                break;
                            case '4':
                                $.alerts.Info(Displaymsg);
                                break;
                            case '5':
                                $.alerts.Prompt(Displaymsg);
                                break;
                            case '6':
                                $.alerts.Confirm(Displaymsg);
                                break;
                            case '7':
                                $.alerts.Mandatory(Displaymsg);
                                break;
                            default:
                                $.alerts.Info(Displaymsg);
                        };
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        $.alerts.Error(xhr.status + " - " + xhr.responseText);
                    }
                });
            }
            else if (messageId == 0) {
                switch (messageType) {
                    case 1:
                        $.alerts.Success(customMessageOnDBFail);
                        break;
                    case 2:
                        $.alerts.Error(customMessageOnDBFail);
                        break;
                    case 3:
                        $.alerts.Warning(customMessageOnDBFail);
                        break;
                    case 4:
                        $.alerts.Info(customMessageOnDBFail);
                        break;
                    case 5:
                        $.alerts.Prompt(customMessageOnDBFail);
                        break;
                    case 6:
                        $.alerts.Confirm(customMessageOnDBFail);
                        break;
                    case 7:
                        $.alerts.Mandatory(customMessageOnDBFail);
                        break;
                    default:
                        $.alerts.Info(customMessageOnDBFail);
                }
            }
        }
        catch (e) {
            alert(e);
        }
    }

})(jQuery);
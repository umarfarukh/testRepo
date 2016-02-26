/* 
************************************************
Autocomplete plugin
************************************************
Author: 298589
Date: 2012-Nov-30
Purpose: Autocomplete
************************************************

Your Web method should return params as below: 
************************************************
ItemId = Id of the selected value from Auto complete control;
ItemName = Name which will be displayed in Auto complete control; 
ItemDescription = Description which will be displayed if display mode is 2;

*/

//   $.fn.autoComplete = function (AcDefaults) {
var AcDefaults = {
    /* Global declarations related to autocomplete content */
    initialized: false,
    alertOnError: false,
    /* Global declarations for defaults attribute values*/
    fieldVal: '',
    displayType: 1,
    ajaxCallUrl: '',
    length: 3,
    /*Content default css*/
    postionLeft: 0,
    postionTop: 0,
    contentHeight: 200,
    contentWidth: 400,
    overFlow: 'scroll',
    /*Event defaults*/
    keyEvent: 'keyup',
    keyCode: '',
    restrictChar: '',
    restrictCharArray: new Array(), // store the restricted characters
    dataArray: new Array(), // stores the data
    /*Event defaults*/
    onBeforeDataInit: '',
    onComplete: '',
    onSuccess: '',
    onFailure: '',
    /* Initializing attributes for autocomplete, * - this is mandatory */
    AC_ENABLED: 'ac-enabled', //* true - to enable autocomplete plugin, false - to disabled
    AC_URL_ATTR: 'ac-url', //* path of the ajax method
    AC_TYPE: 'ac-type', //* 1 - category, 2 - category,subcategory
    AC_LENGTH_ATTR: 'ac-length', //  To get data after enter the length in the input field
    AC_EVENT_ATTR: 'ac-event', // to change key event
    AC_ONRESTRICTCHAR_ATTR: 'ac-restrictChar', // restricted character
    AC_ONBEFOREDATAINIT: 'ac-onBeforeDataInit', // call required method first
    AC_ONSUCCESS_ATTR: 'ac-onSuccess', // success call your function
    AC_ONCOMPLETE_ATTR: 'ac-onComplete', // complete call your function
    AC_ONFAILURE_ATTR: 'ac-onFailure', // failure call your function
    AC_HEIGHT_ATTR: 'ac-height', // To change autocomplete  window height
    AC_WIDTH_ATTR: 'ac-width', // To change autocomplete window width
    AC_OVERFLOW: 'ac-overflow' // To hide scroll bar
    
};

var ACData = {
    items: 0,
    totalItems: 0,
    visibleScroll: 0,
    Initialize: function () {
        $('[' + AcDefaults.AC_ENABLED + ']').each(function () {
            if ($(this).attr(AcDefaults.AC_ENABLED).toLowerCase() == 'true' && $(this).attr(AcDefaults.AC_URL_ATTR) != undefined && $(this).attr(AcDefaults.AC_URL_ATTR) != '') {
                $(this).addClass('_autocomplete');
            }
        });
        return ACData.BindEvent();
    },
    onBeforeDataInit: function (AcElement) {
        if (AcDefaults.onBeforeDataInit != null || AcDefaults.onBeforeDataInit != undefined) {
            return eval(AcDefaults.onBeforeDataInit);
        } else { return true; }
    },
    BindEvent: function () {
        $('._autocomplete').unbind();
        $('._autocomplete').bind(AcDefaults.keyEvent, function (e) {
            var AcElement = $(this);
            AcDefaults.onBeforeDataInit = AcElement.attr(AcDefaults.AC_ONBEFOREDATAINIT);
            $.when(ACData.onBeforeDataInit(AcElement)).promise().done(function (response) {
                if (response == true) {
                    AcDefaults.ajaxCallUrl = AcElement.attr(AcDefaults.AC_URL_ATTR);
                    AcDefaults.keyCode = e.keyCode;
                    ACData.GetValueFromAtrr(AcElement);
                    return ACData.RestrictChar(e, AcElement);
                }
            });
        });
    },
    GetValueFromAtrr: function (AcElement) {
        /*Attributes declared in the HTML page */
        if (AcElement.attr(AcDefaults.AC_LENGTH_ATTR) != undefined && AcElement.attr(AcDefaults.AC_LENGTH_ATTR) != '') {
            AcDefaults.length = AcElement.attr(AcDefaults.AC_LENGTH_ATTR);
        }
        if (AcElement.attr(AcDefaults.AC_ONRESTRICTCHAR_ATTR) != undefined && AcElement.attr(AcDefaults.AC_ONRESTRICTCHAR_ATTR) != '') {
            AcDefaults.restrictChar = AcElement.attr(AcDefaults.AC_ONRESTRICTCHAR_ATTR);
        }
        if (AcElement.attr(AcDefaults.AC_ONSUCCESS_ATTR) != undefined && AcElement.attr(AcDefaults.AC_ONSUCCESS_ATTR) != '') {
            AcDefaults.onSuccess = AcElement.attr(AcDefaults.AC_ONSUCCESS_ATTR);
        }
        if (AcElement.attr(AcDefaults.AC_ONCOMPLETE_ATTR) != undefined && AcElement.attr(AcDefaults.AC_ONCOMPLETE_ATTR) != '') {
            AcDefaults.onComplete = AcElement.attr(AcDefaults.AC_ONCOMPLETE_ATTR);
        }
        if (AcElement.attr(AcDefaults.AC_ONFAILURE_ATTR) != undefined && AcElement.attr(AcDefaults.AC_ONFAILURE_ATTR) != '') {
            AcDefaults.onFailure = AcElement.attr(AcDefaults.AC_ONFAILURE_ATTR);
        }
        if (AcElement.attr(AcDefaults.AC_EVENT_ATTR) != undefined && AcElement.attr(AcDefaults.AC_EVENT_ATTR) != '') {
            AcDefaults.keyEvent = AcElement.attr(AcDefaults.AC_EVENT_ATTR);
        }
        if (AcElement.attr(AcDefaults.AC_HEIGHT_ATTR) != undefined && AcElement.attr(AcDefaults.AC_HEIGHT_ATTR) != '') {
            AcDefaults.contentHeight = AcElement.attr(AcDefaults.AC_HEIGHT_ATTR);
        }
        if (AcElement.attr(AcDefaults.AC_WIDTH_ATTR) != undefined && AcElement.attr(AcDefaults.AC_WIDTH_ATTR) != '') {
            AcDefaults.contentWidth = AcElement.attr(AcDefaults.AC_WIDTH_ATTR);
        }
        if (AcElement.attr(AcDefaults.AC_OVERFLOW) != undefined && AcElement.attr(AcDefaults.AC_OVERFLOW) != '') {
            AcDefaults.overFlow = AcElement.attr(AcDefaults.AC_OVERFLOW);
        }
        if (AcElement.attr(AcDefaults.AC_TYPE) != undefined && AcElement.attr(AcDefaults.AC_TYPE) != '') {
            AcDefaults.displayType = AcElement.attr(AcDefaults.AC_TYPE);
        }
        /* Variable of the autocomplete field position */
        AcDefaults.postionTop = AcElement.position().top;
        AcDefaults.postionLeft = AcElement.position().left;
        /*Get the entered value*/
        setTimeout(function () {
            AcDefaults.fieldVal = AcElement.val();
        }, 0);
        if (AcDefaults.fieldVal.length >= AcDefaults.length && AcDefaults.keyCode != 8) {
            if (AcDefaults.keyCode == 40 || AcDefaults.keyCode == 38 || AcDefaults.keyCode == 13) {
                return ACData.SelectValue(AcDefaults.keyCode, AcElement);
            }
            else {
                return ACData.AjaxCall(AcElement);
            }
        }
        else {
            $('#_content').remove();
        }

    },
    AjaxCall: function (AcElement) {
        try {
            $.ajax({
                type: "post",
                url: AcDefaults.ajaxCallUrl,
                data: '{ "val": "' + AcDefaults.fieldVal + '" }',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                success: function (msg) {
                    ACData.OnSuccess(AcElement, msg.d);
                },
                error: function (msg) {
                    if (AcDefaults.onFailure != '') {
                        ACData.OnError(msg.d);
                    }
                    return false;
                }
            });
        }
        catch (e) {
        }
    },
    OnSuccess: function (AcElement, elemData) {
        $('#_content').remove();
        if (AcDefaults.fieldVal.length != 0 && elemData.length != 0) {
            $('body').append('<div id="_content" />');
            $('#_content').show();
            var $content = '';
            $content += "<ul>";
            $.each(elemData, function (i, data) {
                var itemId = elemData[i].ItemId;
                if (itemId == undefined || itemId == null) {
                    itemId = '';
                }
                $content += "<li pos='" + i + "' class='_default_li' ac-valueId='" + itemId.toString() + "' ><span>" + elemData[i].ItemName + "</span>";
                if (AcDefaults.displayType == 2) {
                    $content += "<i>" + elemData[i].ItemDescription + "</i>";
                }
                $content += "</li>";
            });
            $content += "</ul>";
            $('#_content').append($content);
            ACData.ContentPosition();
            ACData.SelectValue('', AcElement, 1);
        }
        if (AcDefaults.onSuccess != '') {
            var fn = AcDefaults.onSuccess;
            return eval(fn);
        }
    },
    OnError: function () {
        var fn = AcDefaults.onFailure;
        return eval(fn);
    },
    OnComplete: function () {
        var fn = AcDefaults.onComplete;
        return eval(fn);
    },
    RestrictChar: function (e, obj) {
        var key_Codes = AcDefaults.restrictChar.split('');
        var prevVal = $(obj).val();
        $.each(key_Codes, function (i) {
            AcDefaults.restrictCharArray[i] = key_Codes[i].toString();
        });
        setTimeout(function (e) {
            var elementVal = $(obj).val();
            var valSplit = elementVal.split('');
            $(valSplit).each(function (i) {
                if ($.inArray(valSplit[i].toString(), AcDefaults.restrictCharArray) != -1) {
                    $(obj).val(prevVal);
                    return false;
                }
            });
        }, 0);
    },
    SelectValue: function (event, AcElement, mode) {
        AcElement.attr('ac-valueId', '');
        if (mode == 1) {
            $('#_content>ul li').unbind();
            $('#_content>ul li').bind("click", function () {
                AcElement.val($(this).text());
                AcElement.attr('ac-valueId', $(this).attr('ac-valueId'));
                $('#_content').remove();
                ACData.OnComplete();
            });
        } else {
            ACData.totalItems = $('#_content>ul').find('li').length;
            if ($('#_content>ul').find('li._active_li').attr('pos') == undefined) {
                ACData.items = 0;
            } else {
                if (event == 40) {
                    ACData.items = parseInt($('#_content>ul').find('li._active_li').attr('pos')) + 1;
                } else if (event == 38) {
                    if (ACData.items > 0) {
                        ACData.items = parseInt($('#_content>ul').find('li._active_li').attr('pos')) - 1;
                    }
                }
                var position = $('#_content>ul').find('li._active_li').position();
                $('#_content>ul').scrollTop(position.top - 10);
            }
            if (event == 40 || event == 38) {
                if (ACData.items < ACData.totalItems && ACData.items >= 0) {
                    $('#_content>ul').find('li').removeClass('_active_li').addClass('_default_li');
                }
                setTimeout(function () {
                    $('#_content>ul').find('li').eq(ACData.items).removeClass('_default_li').addClass('_active_li');
                }, 0);
            }
            else if (event == 13) {
                if ($('#_content>ul').find('li._active_li').text().length != 0) {
                    $(AcElement).val($('#_content>ul').find('li._active_li').text());
                }
                $('#_content').remove();
                ACData.OnComplete();
                ACData.items = 0;
            }
        }
    },
    ContentPosition: function () {
        xOffset = 2;
        yOffset = 20;
        var documentHeight = $(document).height();
        var documentWidth = $(document).width();
        var top;
        //if (AcDefaults.postionTop > (documentHeight / 3)) {
        //top = AcDefaults.postionTop - AcDefaults.contentHeight - 2;
        //} else {
            top = AcDefaults.postionTop + yOffset;
        //}
        $("#_content").css({
            "top": top + "px",
            "left": (AcDefaults.postionLeft) + "px",
            "width": (AcDefaults.contentWidth) + "px",
            "height": (AcDefaults.contentHeight) + "px"
        }).slideDown("slow");
        $('#_content>ul').find('li').each(function () {
            ACData.visibleScroll = ACData.visibleScroll + $(this).outerHeight(true);
        });
        if (ACData.visibleScroll <= AcDefaults.contentHeight) {
            $("#_content ul").css({
                'overflow-y': 'hidden'
            });
        } else {
            $("#_content ul").css({
                'overflow-y': AcDefaults.overFlow
            });
        }
        ACData.visibleScroll = 0;
        ACData.RemoveContent();
    },
    RemoveContent: function () {
        $('body').unbind;
        $('body').bind("click", function () {
            $('#_content').remove();            
        });
        if (AcDefaults.keyCode == 9) {
            $('#_content').remove();
        }

    }
}
$(document).ready(function () {
    ACData.Initialize();
});
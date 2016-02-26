/* 
************************************************
OnBoarding Candidate Drill Down helper
************************************************
Author: 260947
Date: 2012-Nov-29
Purpose: Utility methods for drill down function
************************************************
*/
/* Function which holds list of parameters passed in query string in array object*/
var OBQueryString = (function (a) { if (a == "") return {}; var b = {}; for (var i = 0; i < a.length; ++i) { var p = a[i].split('='); if (p.length != 2) continue; b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " ")); } return b; })(window.location.search.substr(1).split('&'));
var candidateId = parseInt(OBQueryString["cand"]);
var sessionId = parseInt(OBQueryString["ssid"]);
var countryId = parseInt(OBQueryString["cntry"]);
var openMode = parseInt(OBQueryString["opmde"]);
var roleGroupId = parseInt(OBQueryString["rgid"]);
var roleId = parseInt(OBQueryString["roleid"]);
var qsAppend = 'ss=' + sessionId.toString() + '&cand=' + candidateId.toString() + '&cntry=' + countryId.toString() + '&opmde=' + openMode.toString() + '&rgid=' + roleGroupId + '&roleid=' + roleId;
var bgvPId = 1; /*BGV Page Id*/

$().ready(function () {
    //SetNotificationText();
    candidateDrillDown.GetURLforRole();

});

var loadedSrc = "";

window.proceedToUrl = function () {
    window.setTimeout('', 2);
    loadedSrc = "";
    candidateDrillDown.GetURLforRole();
}

window.loadSelf = function () {
    candidateDrillDown.LoadBgvPage(loadedSrc);
}


var candidateDrillDown = {
    AllowedUrlList: {},
    AjaxUrl: "../../BGVService.aspx/GetPageUrlForRole",
    GetURLforRole: function () {
        var infoContent = '';
        try {
            var data = "{";
            data += "'sessionId':" + sessionId + ",";
            data += "'candidateId':" + candidateId + ",";
            data += "'roleGroupId':'" + roleGroupId + "'";
            data += "}";

            $.ajax({
                type: "post",
                url: candidateDrillDown.AjaxUrl,
                data: data,
                async: false,
                cache: false,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    var tabCount = JSON.parse(msg.d).Tabs.length;
                    if (tabCount > 0)
                    {
                        candidateDrillDown.AllowedUrlList = JSON.parse(msg.d).Tabs;
                        candidateDrillDown.DesignHtml(candidateDrillDown.AllowedUrlList);
                    }
                    // else {
                    //    infoContent += '<div style="padding-top:250px; padding-left:125px; color: #FF0000">BGV not configured for this candidate<div/>'
                    //    $("#divCandidateDrillDownBase").html(infoContent);
                    // }
                },
                error: function (xhr, status, textRemarks) { alert("Error " + xhr.status + " " + textRemarks); }
            });
        }
        catch (e) {
            alert(e.Message);
        }

    },
    DesignHtml: function (data) {
        $('#menu_content').empty();
        var content = '';
        $(data).each(function (i, list) {
            var patt = /\"|\'|\)/g;
            var url = list.Url + "?" + qsAppend;
            var htmlPageName = url.split('/').pop().replace(patt, '').split('.');
            content += '<li class="';
            if (list.IsAllowed == 1 && list.PageStatus != 2) {
                if (loadedSrc == "")
                    loadedSrc = url;
                //   candidateDrillDown.AllowedUrlList[i].Url = candidateDrillDown.AllowedUrlList[i].Url + qsAppend;
                // candidateDrillDown.AllowedUrl.push(url);
                content += 'allow ';
            }
            content += 'menuTab" id="divMenu_' + htmlPageName[0] + '"><a href="#" class="basic_info" id="divMenu_' + htmlPageName[0] + '_Link" style="width:98%;">' + list.MenuName + '</a></li>';
        });
        $('#menu_content').append(content);
        if (loadedSrc.length != 0) {
            candidateDrillDown.LoadBgvPage(loadedSrc);
        } else {
            candidateDrillDown.LoadBgvPage(candidateDrillDown.AllowedUrlList[0].Url + "?" + qsAppend);
        }
        $('.menuTab').css({
            "width": ($('#menu_content').width() / $(data).length).toFixed(2) + "px",
            "padding": 0
        });
        $('.menuTab:first').css({ "margin-left": "-6px" });
    },
    LoadBgvPage: function (page) {
        $('body').append('<a id="spinner" style="position:absolute;z-index:99999;top:300px;left:400px;display:block;"><img src="../../Images/spinner_1.gif" /></a>');
        var ifHtml = '<iframe id="iBgvTaskList" frameborder="no" width="970px" height="500px" style="padding-top:10px;margin-left: 5px;" src="' + page + '"></iframe>';
        try { $("#iBgvTaskList").remove(); } catch (e) { }
        $("#divIframe").html(ifHtml);
        $("#iBgvTaskList").load(function () {
            $('body').find('#spinner').hide();
        });
        candidateDrillDown.NavigateTab(page);
        loadedSrc = page;
    },
    NavigateTab: function (url) {
        var patt = /\"|\'|\)/g;
        var htmlPageName = url.split('/').pop().replace(patt, '').split('.');
        $('.menuTab').removeClass('selected_nav');
        $('.menuTab a').removeClass('pointer');
        $('#divMenu_' + htmlPageName[0]).addClass('selected_nav');
        $('#divMenu_' + htmlPageName[0] + '_Link').addClass('pointer');
        candidateDrillDown.TriggerClick();
    },
    TriggerClick: function () {
        $('.menuTab').unbind();
        $('.menuTab').bind({
            click: function () {
                var obj = $(this), prevTxt = "", prevUrl = "";
                //   var search = new RegExp($(this).attr('id').split('_')[1].toLowerCase(), "gi");                
                $(candidateDrillDown.AllowedUrlList).each(function (i, val) {
                    if (prevTxt == "" && prevUrl == "" && val.PageStatus != 2 && val.IsAllowed == 1) {
                        prevTxt = val.MenuName;
                        prevUrl = val.Url;
                    }
                    if (obj.find('a').text() == val.MenuName && val.IsAllowed == 1) {
                        candidateDrillDown.LoadBgvPage(val.Url + "?" + qsAppend);
                        return false;
                    }
                    if (val.IsAllowed == 0) {
                        if (prevTxt != obj.find('a').text() && prevUrl != "") {
                            alert('Please submit ' + prevTxt + ' before proceeding to ' + obj.find('a').text() + '');
                            candidateDrillDown.LoadBgvPage(prevUrl + "?" + qsAppend);
                            return false;
                        }
                        else {
                            candidateDrillDown.LoadBgvPage(candidateDrillDown.AllowedUrlList[i + 1].Url + "?" + qsAppend);
                            return false;
                        }
                    }
                });
            }
        });
    }

}

/*Function to disable the popup window */
window.onbeforeunload = closeIt;
function closeIt() {
    if (window.parent.opener != null) {
        window.parent.opener.disablePopup();
    }
    window.close();
    if (openMode != 1) {
        if (window.opener != null) {
            window.opener.updateWithNewData();
        }
    }
}

function disablePopup() {
    //disables popup only if it is enabled
    $("#overLay").hide();
    $(".popupContactwrapper").hide();
    if (openMode != 1) {
        popupStatus = 0;
    }

}

function SetNotificationText() {
    var notifyHtml = "";
    try {
        var data = "{'sessionId':" + sessionId + ",'candidateId':" + candidateId + ",'roleGroupId':" + roleGroupId + ",'bgvPageId':" + bgvPId + "}";
        $.ajax({
            type: "post",
            async: true,
            url: "../../FormsService.aspx/GetPageNotification",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                notifyHtml = msg.d;
                $('#divBgvNoticeBar').html('<ul style="padding-left: 20px;">' + notifyHtml + '</ul>');
                if ($.trim(notifyHtml) != "") { $('#divBgvNoticeBar').css('display', 'block'); $('#nav').css('display', 'none'); }
                else { $('#divBgvNoticeBar').css('display', 'none'); $('#nav').css('display', 'block'); }
            },
            error: function (xhr, status, textRemarks) { notifyHtml = ""; }
        });
    } catch (e) { } return;
}
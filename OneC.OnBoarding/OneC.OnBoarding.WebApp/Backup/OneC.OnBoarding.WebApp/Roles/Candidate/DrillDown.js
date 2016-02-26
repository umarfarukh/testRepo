var OBQueryString = (function (a) { if (a == "") return {}; var b = {}; for (var i = 0; i < a.length; ++i) { var p = a[i].split('='); if (p.length != 2) continue; b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " ")); } return b; })(window.location.search.substr(1).split('&'));
var candidateid = parseInt(OBQueryString["cand"]);
var processId = parseInt(OBQueryString["processid"]);
var candidatetype = parseInt(OBQueryString["candtype"]);
var countryid = parseInt(OBQueryString["cntry"]);
var opmde = parseInt(OBQueryString["opmde"]);
var sessionId = parseInt(OBQueryString["ssid"]);
var candidatename = OBQueryString["candname"].toString();
var roleGroupId = parseInt(OBQueryString["rgid"]);
var roleId = OBQueryString["roleid"].toString();
var pID = 429;

$().ready(function () {
    var dataString = '{"sessionId":' + sessionId.toString() + ',"roleId":' + roleId.toString() + ',"countryId":' + countryid.toString() + ',"basePageId":' + pID.toString() + '}';
    var mCnt = 0;
    $.ajax({
        type: "POST",
        url: "../../FormsService.aspx/GetPageMenuMappings",
        data: dataString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            mCnt = data.d.MenuCount;
            $("#div_menu_item_bg").append(data.d.MenuHtml);
        },
        error: function (xhr) {
        }
    });

    if (mCnt > 1)
    { $('#div_menu_item_bg').show(); $('#' + pID + 'M').css('width', mCnt * 100 + 'px'); }
    else
    { $('#div_menu_item_bg').hide(); }

    $("#lblCandidateName").text(candidatename);
    $("#lblCandidateId").text(candidateid);

    $("#divCandidatedata").show();
    $('.menu_bar a:first').css('color', '#6fe6fc');
    $('.menu_bar a:first').click();
    window.onbeforeunload = closeDashboardOverlay;
});

function EnableMenu(obj) {
    $("#LoadingImage").show();
    var url = $(obj).attr('navigateTo') + "?cand=" + candidateid + "&processid=" + processId + "&candtype=" + candidatetype + "&cntry=" + countryid + "&opmde=1&ssid=" + sessionId + "&rgid=" + roleGroupId + "&roleid=" + roleId;
    $("#ifDrillDownCD").attr('src', url);
    $("#div_menu_item_bg a").each(function () {
        if ($(this).hasClass('selectedstartdate_menu_item')) {
            $(this).removeClass('selectedstartdate_menu_item').addClass('startdate_menu_item');
        }
        else {
            $(this).removeClass('selected_menu_item').addClass('normal_menu_item');
        }
    });
    if ($(obj).hasClass('startdate_menu_item')) {
        $(obj).removeClass('startdate_menu_item').addClass('selectedstartdate_menu_item');
    }
    else {
        $(obj).removeClass('normal_menu_item').addClass('selected_menu_item');
    }
    $("#LoadingImage").delay(100).hide(0);
}

function closeDashboardOverlay() {
    if (window.parent.opener != null) {
        window.parent.opener.disablePopup();
    }
    window.close();
}


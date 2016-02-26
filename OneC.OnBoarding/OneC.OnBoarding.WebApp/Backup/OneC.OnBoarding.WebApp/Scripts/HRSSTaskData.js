
var HRSSTaskData = {
    Totalitems: '',
    ArrayOfElements: [],
    ActivePage: 1,
    ItemsPerPage: 1,
    NoOfPages: '',
    ShowPerPage: 0,
    NextPage: 0,
    CandidateData: function () {
        var taskData = '<li>';
        taskData += '<a href="#"  style="float:left;" >hi welcome to hrss dashboard</a>';
        taskData += '<div style="float:right;" id="task_0"><a href="#"><img title="Approve" style="float:left;" onclick="HRSSTaskData.Approve()" src="../../Images/correct.png" /></a>';
        taskData += '<a href="#"><img title="Decline" onclick="HRSSTaskData.RejectedReason()" style="float:left;" src="../../Images/correct.png" /></a>';
        taskData += '<a href="#"><img title="Upload" style="float:left;" src="../../Images/correct.png" /></a></div>';
        taskData += '</li>';
        taskData += '<li>';
        taskData += '<a href="#"  style="float:left;" >hi welcome to hrss dashboard1</a>';
        taskData += '<div style="float:right;"><a href="#"><img title="Approve" style="float:left;" src="../../Images/correct.png" /></a>';
        taskData += '<a href="#"><img title="Decline" style="float:left;" src="../../Images/correct.png" /></a>';
        taskData += '<a href="#"><img title="Upload" style="float:left;" src="../../Images/correct.png" /></a></div>';
        taskData += '</li>';
        taskData += '<li>';
        taskData += '<a href="#"  style="float:left;" >hi welcome to hrss dashboard2</a>';
        taskData += '<div style="float:right;"><a href="#"><img title="Approve" style="float:left;" src="../../Images/correct.png" /></a>';
        taskData += '<a href="#"><img title="Decline" style="float:left;" src="../../Images/correct.png" /></a>';
        taskData += '<a href="#"><img title="Upload" style="float:left;" src="../../Images/correct.png" /></a></div>';
        taskData += '</li>';
        $('#new_hire_data').append(taskData);
        HRSSTaskData.Totalitems = $('#new_hire_data').children().size();
        $('#total_items').append('Total Items (' + HRSSTaskData.Totalitems + '):');
        HRSSTaskData.Pagination();
    },
    Approve: function () {
        $('#task_0').empty().append('<label style="margin-right:20px;">Approved</label>');
    },
    RejectedReason: function () {
        var windowWidth = $(document).width();
        var windowHeight = $(document).height();
        var $backgroundOverLay = $('<div id="overLay"/>');
        $("body").prepend($backgroundOverLay);
        $("#overLay").css({
            "opacity": "0.7"
        });
        $("#overLay").show();
        var $popupContent = '<div id="popup_container" style="left: 252px; top: 122px; width: 450px; height: 300px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 50px; margin-right: 50px; margin-bottom: 50px; margin-left: 50px; position: fixed; z-index: 99999; min-width: 460px; max-width: 460px; background-image: none; background-attachment: scroll; background-repeat: repeat; background-position-x: 0%; background-position-y: 0%; background-size: auto; background-origin: padding-box; background-clip: border-box; background-color: rgb(255, 255, 255);">';
        $popupContent += '<h1 id="popup_title" align="center">Please provide reason for reject</h1><div id="popup_content" class="Reject">';
        $popupContent += '<textarea style="width:90%" rows="10" cols="50"></textarea>';
        $popupContent += '<div id="popup_panel" valign:?vertical?="">';
        $popupContent += '<input style="color: rgb(255, 255, 255); font-weight: bold; position: relative; background-color: gray;" id="popup_ok" class="popup_Button" value="&nbsp;OK&nbsp;" type="button" onclick="HRSSTaskData.PopupClose(0)">';
        $popupContent += '<input style="color: rgb(255, 255, 255);width:auto;font-weight: bold; position: relative; background-color: gray;" id="popup_cancel" class="popup_Button" value="&nbsp;Cancel&nbsp;" type="button" onclick="HRSSTaskData.PopupClose(1)"></div></div>';
        var $popupData = $('<div id="wrapper_landing"/>').html($popupContent);
        $("body").prepend($popupData);
        $("#wrapper_landing").css({
            "position": "absolute",
            "top": windowHeight / 2 - 200,
            "left": windowWidth / 2 - 200,
            "z-index": "999999999"
        });
        //only need force for IE6	
        $("#overLay").css({
            "height": windowHeight
        });
    },
    PopupClose: function () {
        $("#overLay").remove();
        $("#wrapper_landing").remove();
    },
    Pagination: function () {
        HRSSTaskData.NoOfPages = Math.ceil(HRSSTaskData.Totalitems / HRSSTaskData.ItemsPerPage);
        HRSSTaskData.ShowPerPage = HRSSTaskData.ItemsPerPage;
        for (i = 1; i <= HRSSTaskData.NoOfPages; i++) {
            HRSSTaskData.ArrayOfElements[i] = $('#new_hire_data').children().slice(HRSSTaskData.NextPage, HRSSTaskData.ShowPerPage);
            HRSSTaskData.NextPage += HRSSTaskData.ItemsPerPage;
            HRSSTaskData.ShowPerPage += HRSSTaskData.ItemsPerPage;
        }
        HRSSTaskData.ShowPage(1);
    },
    ShowPage: function (page) {
        $('#new_hire_data').children().hide();
        HRSSTaskData.ArrayOfElements[page].show();
        $('#page_active').empty().append(page);
        if (page == 1) {
            $('.btn_first').addClass('active_point');
            $('.btn_last').removeClass('active_point');
        } else if (page == HRSSTaskData.NoOfPages) {
            $('.btn_last').addClass('active_point');
            $('.btn_first').removeClass('active_point');
        } else {
            $('.btn_last').removeClass('active_point');
            $('.btn_first').removeClass('active_point');
        }
        return;
    },
    Next: function () {
        if (HRSSTaskData.ActivePage < HRSSTaskData.NoOfPages) {
            HRSSTaskData.ActivePage += 1;
            HRSSTaskData.ShowPage(HRSSTaskData.ActivePage);
        }
    },
    Prev: function () {
        if (HRSSTaskData.ActivePage > 1) {
            HRSSTaskData.ActivePage -= 1;
            HRSSTaskData.ShowPage(HRSSTaskData.ActivePage);
        }
    },
    First: function () {
        HRSSTaskData.ActivePage = 1;
        HRSSTaskData.ShowPage(HRSSTaskData.ActivePage);
    },
    Last: function () {
        HRSSTaskData.ActivePage = HRSSTaskData.NoOfPages;
        HRSSTaskData.ShowPage(HRSSTaskData.NoOfPages);
    }
}

$(document).ready(function () {
    HRSSTaskData.CandidateData();
});
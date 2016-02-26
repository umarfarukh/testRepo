function tabchange() {
    if ($('.submit_btn').hasClass('searching')) {
        $('.highlighted').contents().unwrap();  //Remove old search highlights
        $('.firstHighlighted').contents().unwrap();

        var searchTerm = $('#txtSearch').val();
        searchTerm = searchTerm.replace(/^\s+|\s+$/g, '');

        if (searchTerm == 'Search here' || searchTerm == '') {
            //alert("Please enter some text");
            $('.overlay').show();
            $('.error_popup').fadeIn();
            $("#pErrorPopupHeader").html('');
            $("#pErrorPopupHeader").append('Error!');
            $("#lblCommonInfoPopup").html('');
            $("#lblCommonInfoPopup").append("Please enter some text");

        }
        else {
            var selectedMainTab = $('.tabcontent').filter(function () {
                return $(this).css('display') == 'block';
            });

            var selectedMainTabId = selectedMainTab[0].id;

            var selectedSubTab = $('#' + selectedMainTabId + '').find('.continner').filter(function () {
                return $(this).css('display') == 'block';
            });

            var selectedSubTabId = selectedSubTab[0].id;
            if ($('#' + selectedSubTabId + 'Count').text() == "0 matches") {
                $('.total').text(0);
                $('.number').text(0);
            }
            else {
                searchAndHighlight(searchTerm, '#' + selectedSubTabId + '');
            }
        }
    }
}

$('.submit_btn').livequery('click', function () {
    if ($(this).hasClass('searching')) {
        $(this).removeClass('searching');
        $(this).css({ 'background-image': 'url(../Images/RelocationAssistance/btn_search.jpg)' });
        $('.pagination').hide();
        $('.matches').hide();
        $('.matches_tab').hide();
        $('.highlighted').contents().unwrap();  //Remove old search highlights
        $('.firstHighlighted').contents().unwrap();
        $('.submit_btn').css({ 'background-image': 'url(../Images/RelocationAssistance/btn_search.jpg)' });
        $('#txtSearch').val('Search here');
        $("#txtSearch").bind("focus", function (e) {
            var thisObj = $(this);
            if (thisObj.val() == "Search here") {
                thisObj.val('');
            }
        });
        $("#txtSearch").bind("blur", function (e) {
            var thisObj = $(this);
            if (thisObj.val() == "") {
                thisObj.val('Search here');
            }
        });
    }
    else {

        if ($('#txtSearch').val() == 'Search here') {
            $('.overlay').show();
            $('.error_popup').fadeIn();
            $("#pErrorPopupHeader").html('');
            $("#pErrorPopupHeader").append('Error!');
            $("#lblCommonInfoPopup").html('');
            $("#lblCommonInfoPopup").append("Please enter some text");

            $('.submit_btn').css({ 'background-image': 'url(../Images/RelocationAssistance/btn_search.jpg)' });
            $('#txtSearch').val('Search here');
        }
        else {
            
            $('.highlighted').contents().unwrap();  //Remove old search highlights
            $('.firstHighlighted').contents().unwrap();
            $('.submit_btn').css({ 'background-image': 'url(../Images/RelocationAssistance/close_btn.png)' });

            var searchTerm = $('#txtSearch').val();
            searchTerm = searchTerm.replace(/^\s+|\s+$/g, '');

            $(this).addClass('searching');
            var selectedMainTab = $('.tabcontent').filter(function () {
                return $(this).css('display') == 'block';
            });

            var selectedMainTabId = selectedMainTab[0].id;

            var selectedSubTab = $('#' + selectedMainTabId + '').find('.continner').filter(function () {
                return $(this).css('display') == 'block';
            });

            var selectedSubTabId = selectedSubTab[0].id;
            
            searchAndCount(searchTerm);
            searchAndHighlight(searchTerm, '#' + selectedSubTabId + '');
            //$('.continner').jScrollPane({ verticalDragMinHeight: 20, verticalDragMaxHeight: 20 });     

        }
    }
});



function searchAndCount(searchTerm) {

    if (searchTerm) {
        var searchTermRegEx = new RegExp("(" + searchTerm + ")(?![^<>]*>)", "ig");

        $('.tabcontent').each(function (i) {
            MainTabCount = 0;
            $(this).find('.continner').each(function (j) {
                var subTabCount = 0;
                var matches = $(this).text().match(searchTermRegEx);
                if (matches) {
                    MainTabCount += matches.length;
                    subTabCount = matches.length;
                    //this.find('.matches_tab').show();
                }
                $('#' + this.id + 'Count').show();
                $('#' + this.id + 'Count').text(subTabCount + ' matches');                        
            });
            $('#' + this.id + 'Count').show();
            $('#' + this.id + 'Count').text(MainTabCount + ' matches');            
        });

        //$('.continner').jScrollPane({ verticalDragMinHeight: 20, verticalDragMaxHeight: 20 });        
    }    
}

function searchAndHighlight(searchTerm, selector) {    
    if (searchTerm) {
        var selector = selector || '.wrapper';                             //use body as selector if none provided        
        var searchTermRegEx = new RegExp("(" + searchTerm + ")(?![^<>]*>)", "ig");

        var matches = $(selector).text().match(searchTermRegEx);
        if (matches) {

            $('.submit_btn').css({ 'background-image': 'url(../Images/RelocationAssistance/close_btn.png)' });
            $('.pagination').show();
            $('.total').text(matches.length);
            $('.number').text(1);
                       
            $(selector).html($(selector).html().replace(searchTermRegEx, "<span class='highlighted'>$&</span>"));
            //$(selector).html($(selector).html().replace(searchTermRegEx, "<span class='highlighted'>" + searchTerm + "</span>"));
            
            $('.highlighted:first').addClass('firstHighlighted');

            if ($('.highlighted:first').length) {             //if match found, scroll to where the first one appears
                $(window).scrollTop($('.highlighted:first').position().top);
            }
                        
            //$('.continner').jScrollPane({ verticalDragMinHeight: 20, verticalDragMaxHeight: 20 });            
        }
    }    
}

$('.next').livequery('click', function () {
    //$('.continner').jScrollPane({ verticalDragMinHeight: 20, verticalDragMaxHeight: 20 });
    $('.highlighted').each(function (i) {
        if (this.className == 'highlighted firstHighlighted') {
            $('.highlighted').eq(i).removeClass('firstHighlighted');
            $('.highlighted').eq(i == $('.highlighted').length - 1 ? 0 : i + 1).addClass('firstHighlighted');
            $('.number').text(i == $('.highlighted').length - 1 ? 1 : i + 2);
            //$('.continner').jScrollPane({ verticalDragMinHeight: 20, verticalDragMaxHeight: 20 });
            $('.continner').scrollTop($('.highlighted').eq(i == $('.highlighted').length - 1 ? 0 : i + 1).position().top);
            return false;        
        }
    });
});

$('.prev').livequery('click', function () {

    $('.highlighted').each(function (i) {
        if (this.className == 'highlighted firstHighlighted') {
            $('.highlighted').eq(i).removeClass('firstHighlighted');
            $('.highlighted').eq(i == 0 ? $('.highlighted').length - 1 : i - 1).addClass('firstHighlighted');
            $('.number').text(i == 0 ? $('.highlighted').length : i);
            return false;
        }
    });
});

$('#search-button').livequery("click", function () {
    searchAndHighlight($('#search-term').val(), '#configure_tab_content');
    return false;
});

$('#clear').livequery("click", function () {
    $('.highlighted').contents().unwrap();  //Remove old search highlights
    $('.firstHighlighted').contents().unwrap();
    $('.pagination').hide();
    $('.submit_btn').css({ 'background-image': 'url(../Images/RelocationAssistance/btn_search.jpg)' });
    $('#txtSearch').val('Search here');
    $('#txtSearch').text = '';
    $("#txtSearch").bind("focus", function (e) {
        var thisObj = $(this);
        if (thisObj.val() == "Search here") {
            thisObj.val('');
        }
    });
    $("#txtSearch").bind("blur", function (e) {
        var thisObj = $(this);
        if (thisObj.val() == "") {
            thisObj.val('Search here');
        }
    });

});

function CloseErrorPopup() {
    $('.error_popup').hide();
    $('.overlay').hide();    
}

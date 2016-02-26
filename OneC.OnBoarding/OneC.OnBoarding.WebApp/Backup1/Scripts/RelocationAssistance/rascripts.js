// JavaScript Document



$(document).ready(function () {
    tooltipfun();

    $(".topwrgt li:last-child").css({ 'border-right': '0px' });
    $(".contheadlist li:first-child").css({ 'border-left': '0px' });
    $(".contheadlist li:last-child").css({ 'border-right': '0px' });
    //$(".conttable tbody tr:nth-child(odd)").css({'background-color':'#ffffff'});
    $(".conttable tbody tr:nth-child(even)").css({ 'background-color': '#ebebeb' });
    //$(".conttable li:nt-child(odd)").addClass('tableodd');
    //$(".conttable li:nt-child(even)").addClass('tableeven');
    //$('.continner').slimScroll({ scroll: '50px' });

    //$(".zone1_stonewrap li:nth-child(odd)").addClass("mar10");
    $(".tabheaderlist li:first-child").addClass('tabheadselected');

    $('.s1_navigator').click(function () {
        //$('.zone3_wrapper').append('<div class="overlay"></div>');
        //$('.s1_wraptrigger').hide();
        $('.popwrap').show();
    });
    $('.headlft h4').click(function () {
        //$('.zone3_wrapper').append('<div class="overlay"></div>');
        //$('.s1_wraptrigger').hide();
        $('.popwrap').show();
    });

    /* Close Popup */
    $('.popclose').click(function () {
        //$(this).parent().parent().hide();
        $('.popwrap').hide();
        //$('.s1_wraptrigger').show();
        //$('.overlay').hide();
    });

    $('.feedback').click(function () {
        $('.wrapper').prepend('<div class="overlay"></div>');
        $('.popfeedback').show();
    });

    $('.aboutus').click(function () {
        $('.wrapper').prepend('<div class="overlay"></div>');
        $('.popaboutus').show();
    });
    /* Close Popup */
    $('.popclose').click(function () {
        $('.overlay').hide();
        $('.popfeedback').hide();
        $('.popaboutus').hide();
    });

    var active = "mtab1";
    $('.tabheaderlist li a').live('click', function () {


        $('.tabcontent').stop(true, false).css('display', 'none');
        //	    $(".tabheaderlist li").removeClass("tabtoplist");
        $(".tabheaderlist li").removeClass("tabheadselected");
        active = $(this).attr('rel');
        //alert(active)
        var currentList = $(this).parent().html();
        //alert(currentList)
        //$(this).parent().remove();
        //alert(active)

        $(this).parent().addClass('tabheadselected');
        $('#' + active).stop(true, false).fadeIn();
        var aa = $('#' + active).fadeIn();
        //alert('Active - ' +active)
        $('#' + active).find('.continner').hide();
        $('#' + active).find('.continner').eq('0').fadeIn();
        //$('.tabheaderlist').prepend('<li>' +currentList + '</li>')
        $(".tabheaderlist li:first-child").addClass("tabtoplist");
        $(".contheadlist li").removeClass("selected");
        $('.contheadlist li:first-child').addClass("selected");

        //$('.continner').jScrollPane({ verticalDragMinHeight: 20, verticalDragMaxHeight: 20 });        
    });


    $(".tabheaderlist li:first-child").addClass("tabtoplist");

    $('.contheadlist li:first-child').addClass("selected");
    
    //$('.continner').jScrollPane({ verticalDragMinHeight: 20, verticalDragMaxHeight: 20 });

    var currentList1;
    $('.contheadlist li a').live('click', function () {
        $('.continner').stop(true, false).css('display', 'none');
        $(".contheadlist li").removeClass("tabtoplist");
        $(".contheadlist li").removeClass("selected");

        var active1 = $(this).attr('rel');
        currentList1 = $(this).parent().html();

        //append the tab in first 

        //$(this).parent().remove();
        $('#' + active1).stop(true, false).fadeIn();
        $(this).parent().addClass("selected");
        //$('.continner').slimScroll({ scroll: '50px' });	
        //$('.continner').jScrollPane({ verticalDragMinHeight: 20, verticalDragMaxHeight: 20 });
        
        //append the tab in first 
        //$('#'+active).find('.contheadlist').prepend('<li>' +currentList1 + '</li>')
    });
    /* Main Tab Script Ends */

    /*Next button function*/
    $('.s2_iconwrap ').live('click', function () {
        $('.contentwrapper').fadeIn('slow');
        $('.s2_wraptrigger, .s1_wraptrigger').hide();
    });
});

/* Tool tip Starts */
function tooltipfun () {
        $('.s2_mapwrap li span').each(function () {
            $(this).qtip({
                content: {
                    text: $(this).parent().children('.info').html()
                },

                show: 'mouseover',
				hide: 'mouseout',
                //hide: 'click',
                style: {
                   // name: 'dark',
                    //tip: 'bottomLeft' 
                    //classes: { tooltip: 'qtip-dark' },
                   // border: { width: 0, radius: 0, color: '#ccd6af' },
                   // title: { background: '#f7faef', color: '#2e2e2e' },
                   // background: '#f7faef',
                   // color: '#2e2e2e',
                    fontSize: '11px',
                    width: { min: 0, max: 350 },
                    tip: {
                        corner: 'leftMiddle',
						size: { width: 24, height: 27 }
                    }
                },

                position: {
                    my: 'Center Left',
                    target: 'mouse',
					corner: {
						target: 'rightMiddle',
						tooltip: 'leftMiddle'
					 },
                    adjust: {
                        screen: true
                    },
                    viewport: $(window)
                }
            });
        });

        $('.s2_mapwrap span').remove('.info');
        
}

/* Tool tip Ends */

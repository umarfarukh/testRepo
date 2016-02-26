$(document).ready(function () {
    var count = 0;
    $('.paper_wrk tr:even td').css('background-color', '#ffffff');
    $('.paper_wrk tr:odd td').css('background-color', '#e1e7e9');
    $('.paper_wrk tr th:not(:last-child)').css('border-right', '1px solid #b2b2b2');
    $('.paper_wrk tr td:not(:last-child)').css('border-right', '1px solid #b2b2b2');
    $('.paper_wrk tr:not(:last-child) td').css('border-bottom', '1px solid #b2b2b2');
    $('.unselected_page').click(function () {
        $(this).addClass('select_page').removeClass('unselected_page');
        $(this).siblings().addClass('unselected_page').removeClass('select_page');
    });
    $('.paper_wrk tr td').each(function (i, val) {
        var txt = $(this).text();
        if (txt == "Completed") {
            $(this).css('color', '#137a13');
        }
    });
    $('.menu_bar a:first').css('color', '#6fe6fc');
    $('.menu_bar a').click(function () {
        $(this).css('color', '#6fe6fc');
        $(this).siblings().css('color', '#FEFEFE');
        var clsname = $(this).attr('class');
        var prevcls = $(this).parent().attr('class');
        var curcls = clsname + '_bg';
        if (prevcls != curcls) {
            $(this).parent().addClass(curcls).removeClass(prevcls);

            $('.' + clsname + '_content').css('display', 'block');
            $('.' + clsname + '_content').siblings().css('display', 'none');
        }

    });

    $('.top_menu li a').click(function () {
        var cls = $(this).parent().attr('class');
        if (cls == "normal_menu") {
            $(this).parent().addClass('selected_menu').removeClass('normal_menu');
            $(this).parent().siblings('.selected_menu').addClass('normal_menu').removeClass('selected_menu');
        }
    });
    $('.nav_bar ul li a').click(function () {
        var acls = $(this).attr('class');
        var curcls = acls + '_content';
        $('.' + curcls).css('display', 'block');
        $('.' + curcls).siblings().css('display', 'none');
    });
    $('.doc_details tr:even td').css('background-color', '#ffffff');
    $('.doc_details tr:odd td').css('background-color', '#e1e7e9');
    $('.doc_details tr:not(:last) td').css('border-bottom', '1px solid #99a3a7');
    $('.doc_details tr td:not(:last-child)').css('border-right', '1px solid #99a3a7');

    $('.doc_details_1 tr:even td').css('background-color', '#ffffff');
    $('.doc_details_1 tr:odd td').css('background-color', '#e1e7e9');
    $('.doc_details_1 tr:not(:last) td').css('border-bottom', '1px solid #99a3a7');
    $('.doc_details_1 tr td:not(:last-child)').css('border-right', '1px solid #99a3a7');
    $('.upload').click(function () {
        $(this).prev().show();
        $(this).hide();
    });
    $('.doc_details_upload tr:odd td').css('background-color', '#ffffff');
    $('.doc_details_upload tr:even td:not(:nth-child(2)').css('background-color', '#e1e7e9');
    $('.doc_details_upload tr:not(:last) td').css('border-bottom', '1px solid #99a3a7');
    $('.doc_details_upload tr td:not(:last-child)').css('border-right', '1px solid #99a3a7');
    $('.doc_details_upload tr td:first-child').css('background-color', '#ffffff');


    $('.cst_checkbox').click(function () {
        var idx = $(this).attr('id');
        var idx_new = idx + '_content';
        if ($('.' + idx_new).is(':visible')) {
            $('.' + idx_new).hide();
        }
        else {
            $('.' + idx_new).show();
            $('.' + idx_new).siblings('.docs').hide()
        }
    });

//    $('.expand').click(function () {
//        var $obj = $(this).parent().parent();
//        var curIndex = ($(this).closest('.wrapper_cont').index(".wrapper_cont"))
//        $('.expand').each(function (i, val) {
//            //console.log($(val).attr('src'))
//            $(val).attr('src', 'images/collapse.png');
//            //$(val).find('.left_head img').attr('src','images/right_arrow.png');
//            //$(val).find('.middle_head p').removeClass('open_header').addClass('close_header');
//        });
//        $('.edu_info_inner_content').each(function (i, val) {
//            if ($(val).closest('.wrapper_cont').index(".wrapper_cont") == curIndex) {
//                if ($(val).is(":visible")) {
//                    $(val).css('display', 'none')
//                }
//                else {
//                    $(val).css('display', 'block')
//                    $obj.find('img').attr('src', 'images/expand.png');
//                    /*	$obj.find('.left_head img').attr('src','images/down_arrow.png');
//                    $obj.find('.middle_head p').removeClass('close_header').addClass('open_header');*/
//                }
//            }
//            else {
//                $(val).css('display', 'none')
//            }
//        })
//    });
    //    $('.add_qualification').click(function () {
    //        console.log($(this).prev().prev())
    //        var prevcls = $(this).prev().prev();
    //        if (count < 9) {

    //            $('.ug_holder:last').clone(true).appendTo(prevcls);


    //        }
    //        count++;
    //    });


    $(".cst_checkbox").click(function () {
        if ($(this).hasClass("unselected")) {
            $(this).next().prop("checked", true);
            $(this).removeClass("unselected").addClass("selected");
        }
        else {
            if ($(this).hasClass("selected")) {
                $(this).next().prop("checked", false);
                $(this).removeClass("selected").addClass("unselected");
            }
        }

    });


});



	



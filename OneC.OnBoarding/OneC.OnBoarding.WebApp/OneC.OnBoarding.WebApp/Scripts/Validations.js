//Jquery validation for numbers and alphabets
(function ($) {
    $.fn.alphanumeric = function (p) {
        p = $.extend({
            exp: ""
        }, p);
        return this.each(function () {
            var sets = function (obj, ev) {
                var val = $(obj).val();
                var re = new RegExp(p.exp);
                var testVal = val.replace(re, '');
                $(obj).val(testVal);
                if (ev != undefined) {
                    var charCode = null;
                    if (!ev.charCode) charCode = String.fromCharCode(ev.which);
                    else charCode = String.fromCharCode(ev.charCode);
                    var testChar = charCode.replace(re, '');
                    if (testChar == '') ev.preventDefault();
                }
            }
            sets(this);
            $(this).keypress(function (e) { sets(this, e); });
            $(this).click(function (e) { sets(this, e); });
            $(this).change(function (e) { sets(this, e); });
        });
    };

    $.fn.numeric = function (p) {
        var allow = /[^0-9\.\s,]+/g;
        p = $.extend({
            exp: allow
        }, p);
        return this.each(function () {
            $(this).alphanumeric(p);
        });
    };

    $.fn.alpha = function (p) {
        var allow = /[0-9\.\s,]+/g;
        p = $.extend({
            exp: allow
        }, p);
        return this.each(function () {
            $(this).alphanumeric(p);
        }
		);
    };
})(jQuery);

function ValidateOnlyInteger(e) {

    if (window.event) keycode = window.event.keyCode;

    else if (e) keycode = e.which;

    else return true;

    if ((keycode >= 48) && (keycode <= 57)) {

        return true;

    }

    else {

        return false;

    }

}

function ValidateAlpanumeric(e) {
    if (window.event) keycode = window.event.keyCode;

    else if (e) keycode = e.which;

    else return true;

    if ((keycode >= 48) && (keycode <= 57) || (keycode >= 65) && (keycode <= 90) || (keycode >= 97) && (keycode <= 122) || (keycode == 0) || (keycode == 8) || (keycode == 32) || (keycode == 9) || (keycode == 13) || (keycode == 27)) {
        return true;
    }

    else {

        return false;

    }
}

function ValidateAlphanumeric(values) {

    var RegexChar = /^[0-9A-Z a-z]{0,150}$/;
    var isValid = RegexChar.test(values);
    if (!isValid) {
        return false;
    }
    return true;

}


function ValidateAlphanumericForEmailId(values) {

    var RegexChar = /^[0-9A-Z a-z@.]{0,150}$/;
    var isValid = RegexChar.test(values);
    if (!isValid) {
        return false;
    }
    return true;

}

function DateCompare(fromDate, toDate) {
    if (Date.parse(fromDate) > Date.parse(toDate)) {
        //alert("Invalid Date Range!\nStart Date cannot be after End Date!")
        return false;
    }


    else
        return true;
}

function ShowModalPopup(ModalBehaviour) {
    $find(ModalBehaviour).show();
}

function HideModalPopup(ModalBehaviour) {
    $find(ModalBehaviour).hide();
}

$(document).ready(function () {
    (function ($) {
        var validate = {
            'birthDate': function () {
                var cl = $(this).attr('id');
                var cla = $('#' + cl);
                $("#" + cl).siblings('.alert_f').remove();
                $("#" + cl).siblings('.alert_f_text').remove();
                $('#' + cl).siblings('img').after('<img class="alert_f"/><label id="' + cl + 'Info" class="alert_f_text"></label>');
                var th = $(this).siblings('.alert_f_text').attr('id');
                var patt = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/i;
                var pos = cla.offset();
                if (!patt.test(cla.val())) {
                    validate.errors = true;
                    $('#' + th).html('Please select date of birth').css('float', 'right').show();
                    $('#' + th).prev().show();

                } else {
                    $(".dob").siblings('#'+th).hide();
                    $('#'+th).prev().hide();
                }
            },
            'email': function () {
                var cl = $(this).attr('id');
                var cla = $('#' + cl);
                $("#" + cl).siblings('img').remove();
                $("#" + cl).siblings('.alert_f_text').remove();
                $('#' + cl).after('<img class="alert_f"/><label id="' + cl + 'Info" class="alert_f_text"></label>');
                var th = $(this).siblings('.alert_f_text').attr('id');
                var patt = /^.+@.+[.].{2,}$/i;
                if (!patt.test(cla.val())) {
                    validate.errors = true;
                    $('#' + th).html('Please enter valid email Id').css('float', 'right').show();
                    $('#' + th).prev().show();

                } else {
                    $(".email").siblings('#' + th).hide();
                    $('#' + th).prev().hide();
                }
            },

            'phone': function () {
                var cl = $(this).attr('id');
                var cla = $('#' + cl);
                $("#" + cl).siblings('img').remove();
                $("#" + cl).siblings('.alert_f_text').remove();
                $('#' + cl).after('<img class="alert_f"/><label id="' + cl + 'Info" class="alert_f_text"></label>');
                var th = $(this).siblings('.alert_f_text').attr('id');
                var patt = /^\([0-9]{3}\)[0-9]{3}\-[0-9]{4}$/i;
                if (!patt.test(cla.val())) {
                    validate.errors = true;
                    $("#" + th).html('Please enter valid phone number').css('float', 'right').show();
                    $("#" + th).prev().show();
                }
                else {
                    $(".hphone").siblings('#' + th).hide();
                    $("#" + th).prev().hide();
                }
            },
            'Name': function () {
                var cl = $(this).attr('id');
                var cla = $('#' + cl);
                $("#" + cl).siblings('img').remove();
                $("#" + cl).siblings('.alert_f_text').remove();
                $('#' + cl).after('<img class="alert_f"/><label id="' + cl + 'Info" class="alert_f_text"></label>');
                var th = $(this).siblings('.alert_f_text').attr('id');
                if (cla.val().length < 3) {
                    validate.errors = true;
                    $("#" + th).html('Please enter full name').css('float', 'right').show();
                    $("#" + th).prev().show();
                } else {

                    $(".name").siblings("#" + th).hide();
                    $("#" + th).prev().hide();
                }

            },
            'city': function () {
                var cl = $(this).attr('id');
                var cla = $('#' + cl);
                $("#" + cl).siblings('img').remove();
                $("#" + cl).siblings('.alert_f_text').remove();
                $('#' + cl).after('<img class="alert_f"/><label id="' + cl + 'Info" class="alert_f_text"></label>');
                var th = $(this).siblings('.alert_f_text').attr('id');
                if (cla.val().length < 2) {
                    validate.errors = true;
                    $("#" + th).html('Please enter City').css('float', 'right').show();
                    $("#" + th).prev().show();

                } else {
                    $(".city").siblings('#'+th).hide();
                    $("#"+th).prev().hide();

                }

            },
            'zip': function () {
                var cla = $(this).attr("id");
                if (cla == 'US') {
                    if ($("#" + cla).val().length < 5) {
                        validate.errors = true;
                        $("#zipcodeInfo").html('Please enter valid zipcode').css('float', 'right').show();
                        $("#zipcodeInfo").prev().show();

                    } else {
                        $(".zipcode").siblings('#zipcodeInfo').hide();
                        $("#zipcodeInfo").prev().hide();

                    }
                }
                else {
                    alert();
                }

            },
            'address': function () {

                var cla = $('.address');


                if (cla.val().length < 10) {
                    validate.errors = true;
                    $("#addressInfo").html('Please enter address').css('float', 'right').show();
                    $("#addressInfo").prev().show();


                } else {
                    $(".address").siblings('#addressInfo').hide();
                    $("#addressInfo").prev().hide();

                }

            },
            
            'gender': function () {


                var cla = $('.gselect');
                if (cla.val() == 'select') {
                    validate.errors = true;
                    $("#gselectInfo").html('Please select gender').css('float', 'right').show();
                    $("#gselectInfo").prev().show();

                } else {
                    $(".gselect").siblings('#gselectInfo').hide();
                    $("#gselectInfo").prev().hide();
                }
            },
            'eligibility': function () {

                var eligibilityInfo = $('#eligibilityInfo');
                var cla = $('.Permanent');
                if ($('input[name="eligibility"]:checked').length === 0) {
                    validate.errors = true;
                    $("#PermanentInfo").html('Please select eligibity').css('float', 'right').show();
                    $("#PermanentInfo").prev().show();

                } else {
                    $(".Permanent").siblings('#PermanentInfo').hide();
                    $("#PermanentInfo").prev().hide();
                }
            },
            'option': function () {


                var cla = $('.select');

                if (cla.val() == 'select') {
                    validate.errors = true;
                    $("#optionInfo").html('Please select one option').css('float', 'right').show();
                    $("#optionInfo").prev().show();

                } else {
                    $(".select").siblings('#optionInfo').hide();
                    $("#optionInfo").prev().hide();
                }
            },
            'eConRes': function () {


                var cla = $('.ecr');

                if (cla.val() == 'select') {
                    validate.errors = true;

                    $("#ecrInfo").html('Please select one option').css('float', 'right').show();
                    $("#ecrInfo").prev().show();
                } else {
                    $(".ecr").siblings('#ecrInfo').hide();
                    $("#ecrInfo").prev().hide();
                }
            },
            'marriedStatus': function () {


                var cla = $('.ms');

                if (cla.val() == 'select') {
                    validate.errors = true;
                    $("#msInfo").html('Please select one option').css('float', 'right').show();
                    $("#msInfo").prev().show();
                } else {
                    $(".ms").siblings('#msInfo').hide();
                }
            }

        };
        $("#submit").click(function () {

            validate.errors = false;
            validate.email();
            validate.phone();
            validate.lName();
            validate.fName();
            validate.city();
            validate.address();
            validate.zip();
            validate.birthDate();
            validate.eligibility();
            validate.option();
            validate.gender();
            validate.ephone();
            validate.eConRes();
            validate.eConNam();
            validate.marriedStatus();
            return false;

        });
        $('.email').change(validate.email);
        $('.hphone').change(validate.phone);
        $('.name').change(validate.Name);
       
        $('.zipcode').change(validate.zip);
        $('.city').change(validate.city);
        $('.address').change(validate.address);
        $('.dob').change(validate.birthDate);
        $('input[name="eligibility"]').change(validate.eligibility);
        $('.pselect').change(validate.option);
        $('.gselect').change(validate.gender);
        $('.select').change(validate.option);
        $('.ecr').change(validate.eConRes);
        $('.ecn').change(validate.eConNam);
        $('.ms').change(validate.marriedStatus);

    })(jQuery);
    $(".phone").blur(function (event) {
        var obj = $(this).attr("id");
        var th = $("#" + obj).val().length;
        var p = $("#" + obj).val();

        if (th < 14) {
            if (event.keyCode == 8) {

            }
            else {
                if (th == 3) {
                    $("#" + obj).val('(' + p + ')');
                }
                if (th == 8) {
                    $("#" + obj).val(p + '-');
                }
            }
        }
        onlyNum(event);
    });
    $(".phone").blur(function () {
        var q = $(this).attr("id");
        var z = $("#" + q).val();
        if (z == '(___)___-____') {
            $("#" + q).val('');
        }
    });
    $(".ssn").keydown(function (event) {

        var th = $(".ssn").val().length;
        var p = $(".ssn").val();

        if (th < 11) {
            if (event.keyCode == 8) {

            }
            else {
                if (th == 3) {
                    $(".ssn").val(p + '-');
                }
                if (th == 6) {
                    $(".ssn").val(p + '-');
                }
            }
        }
        onlyNum(event);
    });

    $(".onlyAlp").focus(function (event) {
        // Allow only backspace and delete 
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 20) {
        }
        else {
            if (event.keyCode < 65 || event.keyCode > 90) {
                event.preventDefault();
            }
        }
    });


});
function onlyNum(event) {
    if (event.shiftKey) {
        event.preventDefault();
    }
    if (event.keyCode == 46 || event.keyCode == 8) {
    }
    else {
        if (event.keyCode < 95) {
            // Allow from 0-9
            if (event.keyCode < 48 || event.keyCode > 57) {
                event.preventDefault();
            }
        }
        else {
            // Allow from 0-9 (Num Lock)
            if (event.keyCode < 96 || event.keyCode > 105) {
                event.preventDefault();
            }
        }
    }
};


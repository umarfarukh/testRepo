
var validate = {

    errors: '',
    obj: '',
    // Validates mandatory check for text boxes

    'textMandatory': function () {

        if (validate.obj == '') {
            validate.obj = this;
        }
        var cl = $(validate.obj).attr('id');
        var cla = $('#' + cl);
        var name = $(cla).attr('title');

        $("#" + cl).siblings('img').remove();
        $("#" + cl).siblings('.alert_f_text').remove();
        $('#' + cl).after('<img class="alert_f"/><label id="' + cl + 'Info" class="alert_f_text"></label>');
        var th = $(cla).siblings('.alert_f_text').attr('id');
        if (cla.val() != undefined) {
            if (cla.val().length < 1 && OBPager.resetFlag != 1) {
                validate.errors = true;

                $("#" + th).html('Please enter "' + name + '"').css('float', 'right').show();
                $("#" + th).prev().show();

                validate.obj = '';

                //return true;
                // return false;


            } else {

                $(".textMandatory").siblings("#" + th).hide();
                $("#" + th).prev().hide();
                validate.obj = '';
                // return true;
            }
        }

        validate.obj == '';

    },

    //Validation for Date only 
    'dateMandatory': function () {

        if (validate.obj == '') {
            validate.obj = this;
        }
        var cl = $(validate.obj).attr('id');
        var cla = $('#' + cl);
        var name = $(cla).attr('title');
        //console.log(cl);
        $("#" + cl).siblings('img').remove();
        $("#" + cl).siblings('.alert_f_text').remove();
        $('#' + cl).before('<img class="alert_f"/>')
        $('#' + cl).siblings('button').after('<label id="' + cl + 'Info" class="alert_f_text"></label>');
        var th = $(cla).siblings('.alert_f_text').attr('id');
        if (cla.val() != undefined) {
            if (cla.val().length < 1 && OBPager.resetFlag != 1) {
                validate.errors = true;

                $("#" + th).html('Please enter "' + name + '"').show();
                $("#" + th).siblings().show();
                //  $(".alert_f").show();

                validate.obj = '';

                //return true;
                // return false;


            } else {

                $(".dateMandatory").siblings("#" + th).hide();
                $("#" + th).siblings(".alert_f").hide();
                validate.obj = '';
                // return true;
            }
        }
        validate.obj == '';

    },
    //Validation for Alphanumeric 

    'textAlphanumeric': function () {

        if (validate.obj == '') {
            validate.obj = this;
        }
        var cl = $(validate.obj).attr('id');
        var name = $(validate.obj).attr('title');
        var cla = $('#' + cl);

        $("#" + cl).siblings('img').remove();
        $("#" + cl).siblings('.alert_f_text').remove();
        $('#' + cl).after('<img class="alert_f"/><label id="' + cl + 'Info" class="alert_f_text"></label>');

        var th = $(validate.obj).siblings('.alert_f_text').attr('id');
        //   0-9A-Z a-z ,.-:#@/\;\-

        //     var RegexChar = /^[-0-9A-Z a-z\n\W]{0,200}$/;


        //            //var RegexChar = /^[a-zA-Z0-9- \/] ?([a-zA-Z0-9- \/]|[a-zA-Z0-9- \/] )*[a-zA-Z0-9- \/]$/;
        //    var isValid = RegexChar.test(cla.val());


        //        if (cla.val().length == 0 || cla.val().indexOf('>') != '-1' || cla.val().indexOf('<') != '-1') {
        //            isValid = !isValid;
        //        }
        //    //   if (!isValid && OBPager.resetFlag != 1) {
        if (cla.val() != undefined) {
            if ((cla.val().length == 0 || cla.val().indexOf('>') != '-1' || cla.val().indexOf('<') != '-1' || cla.val().length > 200) && OBPager.resetFlag != 1) {
                validate.errors = true;
                $("#" + th).html('Please enter valid "' + name + '"').css('float', 'right').show();
                $("#" + th).prev().show();

                validate.obj = '';
                return false;
            }
            else {
                $(".Alphanumeric").siblings("#" + th).hide();
                $("#" + th).prev().hide();
                validate.obj = '';
                return true;
            }
        }

    },

    'email': function () {
        if (validate.obj == '') {
            validate.obj = this;
        }
        var cl = $(validate.obj).attr('id');
        var name = $(validate.obj).attr('title');
        var cla = $('#' + cl);

        $("#" + cl).siblings('img').remove();
        $("#" + cl).siblings('.alert_f_text').remove();
        $('#' + cl).after('<img class="alert_f"/><label id="' + cl + 'Info" class="alert_f_text"></label>');
        var th = $(validate.obj).siblings('.alert_f_text').attr('id');
        var RegexChar = /^.+@.+[.].{2,}$/i;
        var isValid = RegexChar.test(cla.val());
        if (!isValid && OBPager.resetFlag != 1) {
            validate.errors = true;
            $("#" + th).html('Please enter valid "' + name + '"').css('float', 'right').show();
            $("#" + th).prev().show();

            validate.obj = '';
            // return false;
        }
        else {
            $(".email").siblings("#" + th).hide();
            $("#" + th).prev().hide();
            validate.obj = '';
            //return true;
        }
    },
    'dropdown': function () {
        if (validate.obj == '') {
            validate.obj = this;
        }
        var cl = $(validate.obj).attr('id');
        var name = $(validate.obj).attr('title');
        $("#" + cl).siblings('img').remove();
        $("#" + cl).siblings('.alert_f_text').remove();
        $('#' + cl).after('<img class="alert_f"/><label id="' + cl + 'Info" class="alert_f_text"></label>');
        var th = $(validate.obj).siblings('.alert_f_text').attr('id');
        var cla = $('#' + cl);
        if (((cla.val() == -1) || (cla.val() == '-Select-')) && OBPager.resetFlag != 1) {
            validate.errors = true;
            //            $("#" + th).html('Please select "' + name + '"').css('float', 'right').show();
            $("#" + th).html('Please select an option').css('float', 'right').show();
            $("#" + th).prev().show();
            validate.obj = '';


        }
        else {
            $(".dropdown").siblings('#' + th).hide();
            $("#" + th).prev().hide();
            //            $("#" + th).get(0).selectedIndex = 0;
            //$("#" + th + " option:first").attr('selected', 'selected');
            $("#" + th + "option").prop('selected', false).eq(1).prop('selected', true);
            //            $("#" + th +" option:eq(0)").attr('selected', 'selected');


            validate.obj = '';
            //return true;
        }
    },
    'birthDate': function () {
        if (validate.obj == '') {
            validate.obj = this;
        }
        var cl = $(validate.obj).closest('div').attr('id');
        var th = $(validate.obj).attr('id');
        var cla = $('#' + th);
        var name = $(validate.obj).attr('title');
        $('#' + cl).siblings('.alert_f').remove();
        $('#' + cl).siblings('.alert_f_text').remove();
        $('#' + cl).after('<img class="alert_f"/><label id="' + cl + 'Info" class="alert_f_text"></label>');
        if (cla.val() != undefined) {
            if (cla.val().length < 1 && OBPager.resetFlag != 1) {
                validate.errors = true;
                $('#' + cl + 'Info').html('Please select "' + name + '"').css('float', 'right').show();
                $('#' + cl + 'Info').prev().show();
                validate.obj = '';
                //  return false;
            } else {
                $('#' + cl + 'Info').siblings('.alert_f').hide();
                $('#' + cl + 'Info').hide();
                validate.obj = '';
                //    return true;

            }
        }
    },
    'eligibility': function () {
        if (validate.obj == '') {
            validate.obj = this;
        }
        var cl = $(validate.obj).closest('p').attr('id');
        var name = $(validate.obj).closest('p').attr('title');
        var cla = $(validate.obj).attr('name');
        $("#" + cl).siblings('.alert_f').remove();
        $("#" + cl).siblings('.alert_f_text').remove();
        $("#" + cl).after('<img class="alert_f"/><label id="' + cl + 'Info" class="alert_f_text"></label>');
        if ($('input[name="eligibility"]:checked').length === 0 && OBPager.resetFlag != 1) {
            validate.errors = true;
            $('#' + cl + 'Info').html('Please select "' + name + '"').css('float', 'right').show();
            $('#' + cl + 'Info').prev().show();
            validate.obj = '';
            //            return false;
        } else {
            $('#' + cl + 'Info').siblings('.alert_f').hide();
            $('#' + cl + 'Info').hide();
            validate.obj = '';
            // return true;
        }
    },
    'textarea': function () {
        if (validate.obj == '') {
            validate.obj = this;
        }
        var cl = $(validate.obj).attr('id');
        if (cl != undefined) {
            var cla = $('#' + cl);
            if ((cla.val().indexOf('>') != '-1' || cla.val().indexOf('<') != '-1') && OBPager.resetFlag != 1) {
                validate.errors = true;

                alert(' These  ><  Special characters are not allowed.');
                //            var a = $('#' + cl).val().replace(/>/g, ' ').replace(/</g, ' ');
                //            $('#' + cl).val(a);
                focus(cl);
                validate.obj = '';
                return false;

            }
            else {
                validate.obj = '';
                return true;
            }
        }
    },
    'ValidateSubmit': function () {
        validate.errors = false;

        $('.Alphanumeric').each(function () {
            validate.obj = this;
            validate.textAlphanumeric();

        });

        $('.emailMandatory').each(function () {
            validate.obj = this;
            validate.email();

        });

        $('.textMandatory').each(function () {
            validate.obj = this;
            validate.textMandatory();

        });

        $('.dateMandatory').each(function () {
            validate.obj = this;
            validate.dateMandatory();

        });

        $('.dropdown').each(function () {
            validate.obj = this;
            validate.dropdown();

        });
        $('.dob').each(function () {
            validate.obj = this;
            validate.birthDate();

        });
        $('.eligibility').each(function () {
            validate.obj = this;
            validate.eligibility();
        });
        $('textarea').each(function () {
            validate.obj = this;
            if ($(validate.obj).hasClass('Alphanumeric') == false) {
                validate.textarea();
            }

            validate.obj = '';
        });
        $('input[type="text"]').each(function () {
            validate.obj = this;
            if ($(validate.obj).hasClass('textMandatory') == false) {
                validate.textarea();
            }

            validate.obj = '';
        });
        OBPager.resetFlag = 0;
        if (validate.errors == true) {

            $('.alert_f_text').each(function () {
                var a = $(this).attr('id');
                var b = $(this).attr('id').length;
                var aa = a.substr(0, b - 4);
                //  var z = $('#' + aa).val();

                var c = $('#' + a).css('display');

                if (c == 'block' || c == 'inline') {

                    focus(aa);
                    return false;
                }


            });


            validate.obj = '';
            return false;
        }
        else {
            return true;
        }


    }
};
function focus(aa) {
    $('.pageData').each(function (i) {
        $(this).attr('id', i);
        if ($('#' + i).find('#' + aa).length == 1) {
            OBPager.ShowPage(i + 1);
            setTimeout(function () { $('#' + aa).focus(); }, 10);
            return false;

        }
    });
};

$(document).ready(function () {

    (function ($) {
        $('.textMandatory').change(validate.textMandatory);
        $('.Alphanumeric').change(validate.textAlphanumeric);
        $('.dropdown').change(validate.dropdown);
        $('.dob').change(validate.birthDate);
        $('.dateMandatory').change(validate.dateMandatory);
        $('input[name="eligibility"]').change(validate.eligibility);
        $('.emailMandatory').change(validate.email);
    })(jQuery);

    $('input').bind('copy paste cut', function (e) {
        e.preventDefault(); //disable cut,copy,paste
        alert('cut,copy & paste options are disabled !!');
    });

    $('.cntrlAuthenticationKey').unbind('copy paste cut');

    $("textarea").bind('copy paste cut', function (e) {
        e.preventDefault(); //disable cut,copy,paste
        alert('cut,copy & paste options are disabled !!');
    });

    $('textarea').each(function () {
        validate.obj = this;
        if ($(validate.obj).hasClass('onlyAlphanumeric') == false) {
            $(validate.obj).addClass('onlyAlphanumeric');
            validate.obj = '';

        }
    });
    $(".onlyAlphanumeric").keypress(function (event) {
        var key_codes = [60, 62];

        //            var key_codes = [61, 91, 93, 13, 27, 33, 36, 37, 94, 42, 95, 43, 124, 123, 125, 60, 62, 63, 126];
        if (!($.inArray(event.which, key_codes) >= 0)) {
        }
        else {
            event.preventDefault();
        }
        if (event.keyCode == 9 || event.keyCode == 48 || event.keyCode == 57) {

        }
    });
    //    $(".NIValidate").keydown(function (event)
    //     {
    //        var obj = $(this).attr("id");
    //        var th = $("#" + obj).val().length;
    //        var p = $("#" + obj).val();

    //        if (th < 2 || (th > 7 && th < 9)) 
    //        {
    //            if (event.keyCode == 9 || event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 20 || event.keyCode == 32 || event.keyCode == 88 || event.keyCode == 86 || event.keyCode == 67 || event.keyCode == 37 || event.keyCode == 39) {
    //            }
    //            else {
    //                if (event.keyCode < 65 || event.keyCode > 90) {
    //                    event.preventDefault();
    //                }
    //            }
    //        }

    //        if (th >= 2 && th <= 7)
    //        {
    //            if (event.keyCode == 8) {

    //            }

    //            onlyNum(event);
    //        }


    //    });

    $('.ccpDisabled').keydown(function (event) {
        if ((event.ctrlKey && (event.keyCode == 86)) || (event.ctrlKey && (event.keyCode == 88)) || (event.ctrlKey && (event.keyCode == 67))) {
            event.preventDefault();
        }
        if (event.keyCode == 9) {

        }
    });
    $(".OnlyNumeric").keydown(function (event) {
        var obj = $(this).attr("id");
        var th = $("#" + obj).val().length;
        var p = $("#" + obj).val();

        if (th < 14) {
            if (event.keyCode == 8) {

            }

        }
        onlyNum(event);
    });

    $(".OnlyNumericwithShift").keydown(function (event) {
        if (event.keyCode == 9 || event.keyCode == 46 || event.keyCode == 8 || (event.ctrlKey && (event.keyCode == 86)) || (event.ctrlKey && (event.keyCode == 88)) || (event.ctrlKey && (event.keyCode == 67)) || event.keyCode == 37 || event.keyCode == 39) {
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
    });

    $(".onlyAlp").keydown(function (event) {
        // Allow only backspace and delete 
        if (event.keyCode == 9 || event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 20 || event.keyCode == 32 || event.keyCode == 88 || event.keyCode == 86 || event.keyCode == 67 || event.keyCode == 37 || event.keyCode == 39) {
        }
        else {
            if (event.keyCode < 65 || event.keyCode > 90) {
                event.preventDefault();
            }
        }
    });
    $('.onlyFloating').keydown(function (event) {




        if (event.keyCode == 190 || event.keyCode == 110) {

        } else {
            onlyNum(event);
        }

    });
    $('.AlphanumericOnly').keypress(function (event) {
        var key_codes = [60, 62];

        if (!($.inArray(event.which, key_codes) >= 0)) {

        }
        else {
            event.preventDefault();
        }
        if (event.shiftKey) {
            event.preventDefault();
        }
        if (event.keyCode == 9 || event.keyCode == 48 || event.keyCode == 57) {

        }
        if (event.keyCode == 43 || event.keyCode == 42 || event.keyCode == 13 || event.keyCode == 45 || event.keyCode == 46 || event.keyCode == 47 || event.keyCode == 59 || event.keyCode == 61 || event.keyCode == 96 || event.keyCode == 91 || event.keyCode == 92 || event.keyCode == 93 || event.keyCode == 39 || event.keyCode == 44) {
            event.preventDefault();
        }
    });



    $(".pannum_ind_form").keydown(function (event) {
        // Allow only backspace and delete 
        var obj = $(this).attr("id");
        var th = $("#" + obj).val().length;
        var p = $("#" + obj).val();

        if (th < 4 || th == 9) {
            if (event.keyCode == 9 || event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 20 || event.keyCode == 32 || event.keyCode == 88 || event.keyCode == 86 || event.keyCode == 67 || event.keyCode == 37 || event.keyCode == 39) {
            }
            else {
                if (event.keyCode < 65 || event.keyCode > 90) {
                    event.preventDefault();
                }
            }

        }
        if (th > 4 && th < 9) {
            onlyNum(event);
        }


    });


    $(".SsnValidate").keydown(function (event) {
        // Allow only backspace and delete 
        var obj = $(this).attr("id");
        var th = $("#" + obj).val().length;
        var p = $("#" + obj).val();

        if (th < 12) {
            if (th == 2 || th == 10) {
                if (event.keyCode == 8) {
                }
                else
                    $(".SsnValidate").val(p + '-');
                onlyNum(event);

            }
            if (th > 2 && th < 10 || th == 11 || th < 2) {
                if (event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 37 || event.keyCode == 39) { }
                onlyNum(event);
            }


        }
        else {

            if (event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 37) { }
            else
                event.preventDefault();

        }


    });

    $(".PHLphNoValidate").keydown(function (event) {
        // Allow only backspace and delete 
        var obj = $(this).attr("id");
        var th = $("#" + obj).val().length;
        var p = $("#" + obj).val();
        if (th < 14) {
            if (th < 1) {
                if (event.keyCode == 8) {
                }
                else
                    $("#" + obj).val(p + '(');
                onlyNum(event);
            }
            if (th == 4) {
                if (event.keyCode == 8) {
                }
                else
                    $("#" + obj).val(p + ')');
                onlyNum(event);
            }
            if (th == 8) {
                if (event.keyCode == 8) {
                }
                else
                    $("#" + obj).val(p + '-');
                onlyNum(event);
            }
            if (p.indexOf('(') == -1) {
                p = '(' + p;
                $("#" + obj).val(p);
            }
        }
        else {

            if (event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 37) { }
            else
                event.preventDefault();
        }
    });


    $(".tecomValidate").keydown(function (event) {
        // Allow only backspace and delete 
        var obj = $(this).attr("id");
        var th = $("#" + obj).val().length;
        var p = $("#" + obj).val();

        if (th < 18) {
            if (th == 3 || th == 8 || th == 16) {
                if (event.keyCode == 8) {
                }
                else
                    $(".tecomValidate").val(p + '-');
                onlyNum(event);
            }
            if (th > 3 && th < 8 || th > 8 && th < 16 || th > 16 || th == 18 || th < 3) {
                if (event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 37 || event.keyCode == 39) { }
                onlyNum(event);
            }
        }
        else {

            if (event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 37) { }
            else
                event.preventDefault();
        }
    });


    $(".HKIDNoValidate").keydown(function (event) {
        // Allow only backspace and delete 
        var obj = $(this).attr("id");
        var th = $("#" + obj).val().length;
        var p = $("#" + obj).val();
        var char = String.fromCharCode(event.which);
        if (th < 10) {
            if (th == 0) {
                // Allow only backspace and delete 
                if (event.keyCode == 9 || event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 20 || event.keyCode == 32 || event.keyCode == 88 || event.keyCode == 86 || event.keyCode == 67 || event.keyCode == 37 || event.keyCode == 39) {
                }
                else {
                    if (event.keyCode < 65 || event.keyCode > 90) {
                        event.preventDefault();
                    }
                    else {
                        event.preventDefault();
                        $("#" + obj).val(char.toUpperCase());
                    }
                }
            }
            else if (th == 7) {
                if (event.keyCode == 8) {
                }
                else
                    $("#" + obj).val(p + '(');
                onlyNum(event);

            }

            else if (th == 9) {
                if (event.keyCode == 8) {
                }
                else
                    $("#" + obj).val(p + ')');
                onlyNum(event);
            }
            else if (th > 7 || th == 10 || th > 0 && th < 7) {
                if (event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 37 || event.keyCode == 39)
                { }
                
                if (th > 0 && th < 7) {
                    onlyNum(event);
                }
                else if (th == 8) {
                    // Allow only backspace and delete 
                    if (event.keyCode == 9 || event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 20 || event.keyCode == 32 || event.keyCode == 88 || event.keyCode == 86 || event.keyCode == 67 || event.keyCode == 37 || event.keyCode == 39) {
                    }
                    else {
                        if (event.keyCode > 64 || event.keyCode < 91) {
                            $("#" + obj).val(p+char.toUpperCase()+')');                                                                                   
                        }
                         
                        else {
                            if (event.keyCode < 95) {
                                // Allow from 0-9
                                if (event.keyCode < 48 || event.keyCode > 95) {
                                    event.preventDefault();
                                }
                            }
                            else {
                                // Allow from 0-9 (Num Lock)
                                if (event.keyCode > 96 || event.keyCode < 105) {

                                }
                            }
                        }
                    }
                }

            }
        }
        else {

            if (event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 37) { }
            else
                event.preventDefault();
        }
    });

    $(".frmtPFNo").keydown(function (event) {
        // Allow only backspace and delete 
        var obj = $(this).attr("id");
        var th = $("#" + obj).val().length;
        var p = $("#" + obj).val();
        var char = String.fromCharCode(event.which);

        if (th < 26) {

            if (th == 0 || th == 1 || th == 3 || th == 4 || th == 5) {
                // Allow only backspace and delete 
                if (event.keyCode == 9 || event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 20 || event.keyCode == 32 || event.keyCode == 88 || event.keyCode == 86 || event.keyCode == 67 || event.keyCode == 37 || event.keyCode == 39) {
                }
                else {
                    if (event.keyCode < 65 || event.keyCode > 90) {
                        event.preventDefault();
                    }
                    else {
                        event.preventDefault();
                        //$("#" + obj).val(char.toUpperCase());
                        var res = String.fromCharCode(event.which); //str.toUpperCase();
                        $("#" + obj).val(p + res);
                    }
                }
            }

            if (th == 2 || th == 6 || th == 14 || th == 18) {
                if (event.keyCode == 8) {
                }
                else {
                    $("#" + obj).val(p + '/');
                    onlyNum(event);
                }
            }
            if (th > 6 || th == 10 || th > 0 && th < 7) {
                if (event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 37 || event.keyCode == 39)
                { }
                onlyNum(event);
            }
        }
        else {

            if (event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 37) { }
            else
                event.preventDefault();
        }
    });

    $(".frmtPFNo").focusout(function (e) {

        var $this = $(this);
        var val = $this.val();
        if (val.length != 0) {
            var rep = val.replace('/', '');
            val = rep;
            var padding = '';
            //var padding = val.replace('-', '');

            for (var i = val.length; i > 6 && i < 26; i++) {
                padding += '0';
            }

            $(this).val(padding + $(this).val());
            var retvalue = formatUAN($(this));

            $(this).val(retvalue);
            if ($('#form_uanno_2')[0].value != null) {
                OBPager.SetTaskContentMemberValue('PersonalData.LastPFNo', null, $('#form_uanno_2')[0].value, false);
            }
            if ($('#form_pfno_1')[0].value != null) {
                OBPager.SetTaskContentMemberValue('PersonalData.EarlyPFNo', null, $('#form_pfno_1')[0].value, false);
            }
        }
    });

    $(".mdfvalidate").keydown(function (event) {
        // Allow only backspace and delete 
        var obj = $(this).attr("id");
        var th = $("#" + obj).val().length;
        var p = $("#" + obj).val();

        if (th < 14) {
            if (th == 2 || th == 12) {
                if (event.keyCode == 8) {
                }
                else
                    $(".mdfvalidate").val(p + '-');
                onlyNum(event);
            }
            if (th > 2 && th < 12 || th == 13 || th < 2) {
                if (event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 37 || event.keyCode == 39) { }
                onlyNum(event);
            }
        }
        else {

            if (event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 37) { }
            else
                event.preventDefault();
        }
    });

    $(".PHLfaxvalidate").keydown(function (event) {
        // Allow only backspace and delete 
        var obj = $(this).attr("id");
        var th = $("#" + obj).val().length;
        var p = $("#" + obj).val();

        if (th < 12) {
            if (th == 3 || th == 7) {
                if (event.keyCode == 8) {
                }
                else
                    $(".PHLfaxvalidate").val(p + '-');
                onlyNum(event);
            }
            if (th > 3 && th < 7 || th == 8 || th < 3) {
                if (event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 37 || event.keyCode == 39) { }
                onlyNum(event);
            }
        }
        else {

            if (event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 37) { }
            else
                event.preventDefault();
        }
    });

    $('.GermanClass').keypress(function (event) {

        var key_codes = [60, 62];

        if (!($.inArray(event.which, key_codes) >= 0)) {

        }
        else {
            event.preventDefault();
        }
        if (event.keyCode == 196 || event.keyCode == 228 || event.keyCode == 214 || event.keyCode == 246 || event.keyCode == 220 || event.keyCode == 252 || event.keyCode == 223 || event.keyCode == 201 || event.keyCode == 233 || event.keyCode == 45) {
        }

        if (event.shiftKey) {
            event.preventDefault();
        }
    });

    $('.GermanCityClass').keypress(function (event) {

        var key_codes = [60, 62];

        if (!($.inArray(event.which, key_codes) >= 0)) {

        }
        else {
            event.preventDefault();
        }
        if (event.keyCode == 196 || event.keyCode == 228 || event.keyCode == 214 || event.keyCode == 246 || event.keyCode == 220 || event.keyCode == 252 || event.keyCode == 223 || event.keyCode == 201 || event.keyCode == 233 || event.keyCode == 45 || event.keyCode == 41 || event.keyCode == 47 || event.keyCode == 42 || event.keyCode == 46) {
        }

        if (event.shiftKey) {
            event.preventDefault();
        }

    });


    $('.Alphaspecialchar').keypress(function (event) {
        var key_codes = [60, 62];

        if (!($.inArray(event.which, key_codes) >= 0)) {

        }
        else {
            event.preventDefault();
        }

        if (event.keyCode == 9) {

        }

        if (event.keyCode == 48 || event.keyCode == 48 || event.keyCode == 49 || event.keyCode == 50 || event.keyCode == 51 || event.keyCode == 52 || event.keyCode == 53 || event.keyCode == 54 || event.keyCode == 55 || event.keyCode == 56 || event.keyCode == 57) {
            event.preventDefault();
        }
    });
    $('textarea,input').bind('paste', function () {
        var id = $(this);
        validate.obj = this;
        var val = $(validate.obj).attr('jqxb-datamember');
        setTimeout(function () {
            var allowchar = $(validate.obj).attr('allowchar');
            //            if ($(validate.obj).hasClass('NDAForm') == true) {
            if ($(validate.obj).val().length > allowchar) {
                alert("Only " + allowchar + " character(s) are allowed");
                var a = $(validate.obj).val().substr(0, allowchar);
                // $(validate.obj).val(a);
                OBPager.SetTaskContentMemberValue(val, 1, a, true);
            }
            //    $('textarea,input').bind('paste', function () {
            //        var id = $(this);
            //        validate.obj = this;
            //        var val = $(validate.obj).attr('jqxb-datamember');
            //        setTimeout(function () {
            //            if ($(validate.obj).hasClass('NDAForm') == true) {
            //                if ($(validate.obj).val().length > 500) {
            //                    alert("Only 500 characters are allowed");
            //                    var a = $(validate.obj).val().substr(0, 500);
            //                   // $(validate.obj).val(a);
            //                    OBPager.SetTaskContentMemberValue(val, 1, a, true);
            //                }
            //            }

            //            else if ($(validate.obj).val().length > 200) {
            //                alert("Only 200 characters are allowed");
            //                var a = $(validate.obj).val().substr(0, 200);
            //                OBPager.SetTaskContentMemberValue(val, 1, a, true);

            //            }

            //  if ($(validate.obj).hasClass('Alphanumeric') == false) {
            //  RestrictCharCount(fieldID, max);
            validate.textarea();
            //  }
        }, 0);

        //        setTimeout(function () {
        //            if (id.val().length >= 200) {
        //                alert("Only 200 characters are allowed");
        //            }
        //            var a = (id.val()).substr(0, 200);
        //            id.val(a);
        //            //  var aa = (/^[-0-9A-Z a-z,&.:#@;\\()\/\n\'\"]{0,200}$/).test(id.val());
        //            var aa = (/[^<>]$/).test(id.val());

        //            if (aa == false) {
        //                alert("These >< special Characters are not allowed");
        //            }
        //            //  OBPager.resetFlag = 0;
        //        }, 0);

        // id.unbind();
    });

});


function onlyNum(event) {
    if (event.shiftKey) {
        event.preventDefault();
    }

    if (event.keyCode == 9 || event.keyCode == 46 || event.keyCode == 8 || (event.ctrlKey && (event.keyCode == 86)) || (event.ctrlKey && (event.keyCode == 88)) || (event.ctrlKey && (event.keyCode == 67)) || event.keyCode == 37 || event.keyCode == 39) {
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
    //  ccp();
};

function onlyMedNum(event) {

    var obj = $(this).attr("id");
    var th = $("#" + obj).val().length;
    var p = $("#" + obj).val();

    if (th < 14) {
        if (event.keyCode == 8) {

        }

    }
    if (event.shiftKey) {
        event.preventDefault();
    }

    if (event.keyCode == 9 || event.keyCode == 46 || event.keyCode == 8 || (event.ctrlKey && (event.keyCode == 86)) || (event.ctrlKey && (event.keyCode == 88)) || (event.ctrlKey && (event.keyCode == 67)) || event.keyCode == 37 || event.keyCode == 39) {
    }

    else {

        // Allow from 0-9 (Num Lock)
        if (event.keyCode < 48 || event.keyCode > 57) {
            (event.preventDefault) ? event.preventDefault() : event.returnValue = false;
        }

    }
    //  ccp();
};

function RestrictCharCount(fieldID, max) {
    // if the length of the string in the input field is greater than the max value, trim it 
    var field = this.document.getElementById(fieldID);
    if (field.value.length > max)
        field.value = field.value.substring(0, max);

}

function formatUAN(obj) {
    var format = '';
    var numbers = obj.val().replace(/\D/g, ''),
         char = { 0: '', 1: '', 2: '/', 3: '', 4: '', 5: '', 6: '/', 7: '', 8: '', 9: '', 10: '', 11: '', 12: '', 13: '', 14: '/', 15: '', 16: '', 17: '', 18: '/', 19:'',20: '',21: '',22: '', 23: '', 24: '' ,25: '' };

    obj.val('');
    for (var a = 6; a < numbers.length; a++) {
        format += (char[a] || '') + numbers.charAt(a);

    }
    obj.val(format);
    //    $("#MDF_Number").val(obj.value);
    return obj.val();


};


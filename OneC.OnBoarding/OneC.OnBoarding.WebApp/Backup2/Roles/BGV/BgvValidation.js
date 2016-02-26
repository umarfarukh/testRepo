
var validate = {
    errors: '',
    obj: '',    // Validates mandatory check for text boxes
    'mandatory': function (event, eventTagType) {
        if ((validate.obj == '') || (validate.obj == null)) {
            validate.obj = event;
        }
        var eventId = event.attr('id');
        var title = event.attr('title');
        var alertTxtLabel = eventId + 'Info';
        var condition = '';
        var messageTxt = '';
        if ($('#' + alertTxtLabel).length == 0) {
            var alertContent = '<img class="alert_f"/><label id="' + alertTxtLabel + '" class="alert_f_text"></label>';
        }
        if (eventTagType == 0) { // Txt field
            event.after(alertContent);
            condition = (event.val().length == 0 ? true : false);
            messageTxt = 'Please enter ' + title;
        }
        if (eventTagType == 1) { // DatePicker
            if (event.siblings("button").length > 0)
                event.siblings("button").after(alertContent);
            else
                event.after(alertContent);
            condition = (event.val().length == 0 ? true : false);
            messageTxt = 'Please select ' + title;
        }
        if (eventTagType == 2) { // drop down
            event.after(alertContent);
            condition = (event.val() == -1 || event.val() == null ? true : false);
            messageTxt = 'Please select an option';
        }
        if (eventTagType == 3) { // text area
            event.after(alertContent);
            condition = ((event.val().length == 0 || event.val().indexOf('>') != '-1' || event.val().indexOf('<') != '-1' || event.val().length > 200) ? true : false);
            messageTxt = 'Please enter ' + title;
        }
        if (eventTagType == 4) { // Email
            event.after(alertContent);
            var RegexChar = /^.+@.+[.].{2,}$/i;
            var isValid = RegexChar.test(event.val());
            condition = !isValid;
            messageTxt = 'Please enter valid ' + title;
        }

        if (condition) {
            validate.errors = true;
            var styleLeft = (event.position().left) + "px";
            var styleHeight = (event.position().top) + (event.height()) + 3 + "px";
            $("#" + alertTxtLabel).css({ 'float': 'right', 'left': styleLeft, 'top': styleHeight });
            $("#" + alertTxtLabel).html(messageTxt);
            event.parent().find('.alert_f,.alert_f_text').show();
            validate.obj = '';
        } else {
            event.parent().find('.alert_f,.alert_f_text').remove();
            validate.obj = '';
            // return true;
        }

        validate.obj == '';

    },
    'ValidateTag': function (validateElm) {
        var tagType;
        if (validateElm.val() != null && validateElm[0].tagName.toLowerCase() == 'input') {
            if (validateElm.hasClass('datePicker')) {
                tagType = 1; // Date picker input field
            }
            else if (validateElm.hasClass('email')) {
                tagType = 4; // Email
            } else {
                tagType = 0; // Input field
            }
        }
        if (validateElm[0].tagName.toLowerCase() == 'select') {
            tagType = 2; // Drop down
        }
        if (validateElm.val() != null && validateElm[0].tagName.toLowerCase() == 'textarea') {
            tagType = 3; // Text area
        }
        if (tagType != undefined)
            validate.mandatory(validateElm, tagType);
        validateElm = '';
    },
    'ValidateSubmit': function () {
        validate.errors = false;
        validate.obj = '';
        $('.mandatory').each(function () {
            validate.ValidateTag($(this));
        });
        if (validate.errors == true) {
            $('.alert_f_text:visible').each(function () {
                var obj = $(this);
                var id = obj.attr('id');
                var idLength = id.length;
                var currentElement = id.substr(0, idLength - 4);
                var position = $('#' + currentElement).position();
                $('#' + currentElement).focus();
                return false;
            });
            validate.obj = '';
            return false;
        }
        else {
            return true;
        }
    }
};




$(document).ready(function () {
    $('body').on(
        'change', '.mandatory', function () {
            validate.ValidateTag($(this));
        }
    );
    $('textarea').each(function () {
        validate.obj = this;
        if ($(validate.obj).hasClass('onlyAlphanumeric') == false) {
            $(validate.obj).addClass('onlyAlphanumeric');
        }
        validate.obj = '';
    });
    $('body').on("keypress", ".onlyAlphanumeric", function (event) {
        var key_codes = [60, 62];

        //            var key_codes = [61, 91, 93, 13, 27, 33, 36, 37, 94, 42, 95, 43, 124, 123, 125, 60, 62, 63, 126];
        if (!($.inArray(event.which, key_codes) >= 0)) {
        }
        else {
            event.preventDefault();
        }
        if (event.keyCode == 9 || event.keyCode == 48 || event.keyCode == 57) {

        }
    }).on("keydown", ".ccpDisabled", function (event) {
        if ((event.ctrlKey && (event.keyCode == 86)) || (event.ctrlKey && (event.keyCode == 88)) || (event.ctrlKey && (event.keyCode == 67))) {
            event.preventDefault();
        }
        if (event.keyCode == 9) {
        }
    }).on("keydown", ".OnlyNumeric", function (event) {
        var obj = $(this).attr("id");
        var th = $("#" + obj).val().length;
        var p = $("#" + obj).val();
        if (th < 14) {
            if (event.keyCode == 8) {
            }
        }
        onlyNum(event);
    }).on("keydown", ".onlyAlp", function (event) {
        // Allow only backspace and delete 
        if (event.keyCode == 9 || event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 20 || event.keyCode == 32 || event.keyCode == 88 || event.keyCode == 86 || event.keyCode == 67 || event.keyCode == 37 || event.keyCode == 39) {
        }
        else {
            if (event.keyCode < 65 || event.keyCode > 90) {
                event.preventDefault();
            }
        }
    }).on("keydown", ".onlyFloating", function (event) {
        if (event.keyCode == 190 || event.keyCode == 110) {

        } else {
            onlyNum(event);
        }

    });

    $("body").on("paste", "textarea,input", function () {
        if ($(this).hasClass('OnlyNumeric')) {
            validateVal(this, 1);
        }
        else if ($(this).hasClass('onlyFloating')) {
            validateVal(this, 2);
        }
        else if ($(this).hasClass('onlyAlphanumeric')) {
            validateVal(this, 3);
        }
        else if ($(this).hasClass('onlyAlp')) {
            validateVal(this, 4);
        }
        else if ($(this).hasClass('OnlyEmail')) {
            validateVal(this, 5);
        }
        else {
            validateVal(this, 3);
        }
    });
    var validateVal = function (obj, type) {
        setTimeout(function () {
            var val = $.trim($(obj).val());
            if (type == 1) { // Only numeric values
                var reg = /^[0-9\s]+$/;
                if (!reg.test(val)) {
                    alert("Only numeric values are allowed.");
                    $(obj).val('');
                }
            }
            if (type == 2) { // floating values
                if (val.indexOf('.') > -1) {
                    var reg = /^[0-9]*[.][0-9]+$/;
                } else {
                    var reg = /^[0-9\s]+$/;
                }
                if (!reg.test(val)) {
                    alert("Only numeric and floating values are allowed.");
                    $(obj).val('');
                }
            }
            if (type == 3) { // 
                var reg = /^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.\/?]*$/
                if (!reg.test(val)) {
                    alert("Only these special characters are allowed !@#$%^&*()_+\\[]{}\";':|,./? ");
                    // $(obj).val(val.replace(/</g, "").replace(/>/g, ""));
                    $(obj).val('');
                }

            }
            if (type == 4) {
                var reg = /^[a-zA-Z\s]*$/;
                if (!reg.test(val)) {
                    alert("Only alphabets are allowed.");
                    $(obj).val('');
                }
            }
            if (type == 5) {
                var reg = /^.+@.+[.].{2,}$/i;
                if (!reg.test(val)) {
                    alert("Please enter valid email id.");
                    $(obj).val('');
                }
            }
        });
    }

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

function RestrictCharCount(fieldID, max) {
    // if the length of the string in the input field is greater than the max value, trim it 
    var field = this.document.getElementById(fieldID);
    if (field.value.length > max)
        field.value = field.value.substring(0, max);

}


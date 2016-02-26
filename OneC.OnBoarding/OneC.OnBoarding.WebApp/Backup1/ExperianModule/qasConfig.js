/*globals $ */
/*********************************************************************************************************************************************************************
**********************************************************************************************************************************************************************
*
*QAS Capture for Websites Sample Code
*Date: 3/19/2013
*
**********************************************************************************************************************************************************************
*
*Tested with (Dated: 3/19/2013):
*  Browsers:
*    Firefox    v19.0
*    Chrome     v25.0
*    IE         v8
*
*  Countries:
*    USA
*    CAN
*
**********************************************************************************************************************************************************************
**********************************************************************************************************************************************************************
*
*QAS Capture for Websites Sample Code
*Date: 7/11/2011
*
**********************************************************************************************************************************************************************
*
*Tested with:
*  Proweb:
*    v6.45
*  Browsers:
*    Firefox v4.0
*    Firefox v3.6
*    Chrome v11.0
*    Safari v5.05
*    Opera v11.10
*    IE v6, v7, v8
*  Countries:
*    USA
*    CAN
*    BRA
*    CHN
*    HKG
*    IND
*    IDN
*    ITA
*    JPN
*    KOR
*    MEX
*    RUS
*    ESP
*    UKR
*    VNM
*
**********************************************************************************************************************************************************************
*
*This code is written to be used in conjunction with QAS Pro Web and the provided Common Classes along with a language specific qas_proxy file. It is dependent
*on both jQuery and jQueryUI.
*
*This code processes all addresses on a web page through the proweb engine and requests interaction from an end-user when appropriate. All cleansed
*addresses are then returned to the proper form. All unique addresses will be processed exactly once, if there are two addresses with the same input ignoring case
*and after extraneous spaces have been stripped they will be considered the same and processed only once. If any user interaction is needed, it will be requested
*only once and used for both addresses.
*
*
*All settings are created at the top of the code and can be changed to properly integrate into a website. QAS_Verify() is the function that should be called by
*a website in order to initiate address verification. The Classes are as follows:
*
*Main
*  Instantiates all objects
*  Loops through addresses
*  Calls function to return all results
*  Calls pre and post validation functions
*
*Address
*  Retrieves and stores addresses
*  Determines unique addresses
*  Builds search strings
*  Stores cleaned addresses
*  Returns addresses to web page
*
*Clean
*  Used to clean a single address by making an AJAX call to qas_proxy
*  Cleans/Refines/Formats addresses
*  Stores verifylevel/cleansed result/picklist
*
*Business
*  All business logic is handled here
*  Controls interaction
*
*Interface
*  creates div tags
*  populates tags with appropriate messages
*  displays pop up
*  accepts user interaction
*
**********************************************************************************************************************************************************************
*
*Programmer: Jonathan Reimels
*Date: 10/5/2010
*
**********************************************************************************************************************************************************************
*Please log any internal changes to the code here with the following format(Programmer, Date, Reason for change, Change made)
*
*UPDATES:
*
*Programmer:  Akshay Davis
*Date: 04/01/11
*Reason: Updating for cleaning additional countries as well as e-mail and phone validation
*Change: The following was done:
*           * Code jslinted
*           * Global's encapsulated with "QAS_Variable" singleton
*           * Added conditional proxy redirection
*           * Added URI encoding and decoding for search strings
*           * Added e-mail and phone validation functionality
*           * Improved error reporting for server errors returned
*
*Programmer:  Zulfiqar Ahmad
*Date: 12/15/10
*Reason: Renaming/Reorganization for clarity and consistency with prior versions of BP
*Change: Alphabetized countries in stripPostCode switch statement.   JS updated to match proxy name changes: dpv->dpvstatus; matchtype->verifylevel; isfull->fulladdress
*
*Programmer:  Jonathan Reimels
*Date: 12/15/10
*Reason: Messaging added for when secondary info inputted on prompt is out of range, as per older versions of BP
*Change:  Additions to lines 156, 164, 979-986, 994-1001
*Programmer:  Usama Khalil
*Date: 01/15/13
*Reason: removed the phone validation code from email validation function. Now the phone validation is handled by using phoneAdvance.js or phoneBasic.js.
*Change:
*           * removed the phone validation code from email validation function i.e. phone was being validated by tower data
*           * Added ConfirmPhone message to QAS_PROMPTS, TARGUS_PROXY_PATH,
*           * Added  message to QAS_PROMPTS
*           * Renamed email variables to remove the phone word
*           * removed double encoding in refine method parameters. i.e. "moniker": encodeURIComponent(moniker)
*
**********************************************************************************************************************************************************************
*********************************************************************************************************************************************************************/

/*********************************************************************************************************************************************************************
*
*Settings
*
*Set all variables here to properly integrate into website
*
*********************************************************************************************************************************************************************/
var QAS_Variables = {
    // Location of the proxy files - path needs to either be fixed or relative to the web page the js is loaded on.
    //PROXY_PATH: "../ExperianModule/qas_proxy.aspx",   // Standard ProWeb proxy file.
    PROXY_PATH: "../../../../ExperianModule/qas_proxy.aspx", 
    ADD_PROXY_PATH: "add_proxy.aspx",   // Address Doctor proxy file.
    TD_PROXY_PATH: "td_proxy.aspx", // Email validation proxy file.
    TARGUS_PROXY_PATH: "targus_proxy.aspx", // Targus validation proxy file.

    // ProWeb configuration to use.
    QAS_LAYOUT: "onboarding",

    // Set any onclick events and submit buttons to use pre and post validation.
    PRE_ON_CLICK: null,
    POST_ON_CLICK: null,
    BUTTON_ID: null,

    /*
    * This is an array of "string arrays" with each set containing ids of the address fields (excluding the country field).
    * These should be listed to match the ProWeb configuration.
    * For each cleaned result, the first field in the string array will go into the first item (ie. Address Line 1) in the config.
    */
    ADDRESS_FIELD_IDS: [
           ["req_Address1", "req_Address2", "req_City", "req_State", "req_Zip", "req_Country"] 
//["req_Address1"]

    ],

    /*
    * This is an array of the country fields' id. These should be listed following the same set order as the "ADDRESS_FIELD_IDS".
    * ie. the order of the first set of address field ids should correspond with the first element of the country field id
    * (["add1", "add2", ...] should be grouped with ["country"].
    * If a layout does not have a country field. then enter "false" for appropriate address within the string.
    */
    COUNTRY_FIELD_IDS: ["req_Country"],

    // This is an array of city fields' id. This is to indicate which id in the "ADDRESS_FIELD_IDS" is representing the city field.
    CITY_FIELD_IDS: ["req_City"],

    // Hidden fields for data override and timeout flags.
    DATA_OVERRIDDEN_INDICES_FIELD_ID: "dataOverriddenIndices",
    EMAIL_TIMEOUT_FIELD_ID: "emailTimeout",
    ADD_TIMEOUT_FIELD_ID: "addressTimeout",
    PHONE_TIMEOUT_FIELD_ID: "phoneTimeout",

    // Hidden fields for phone validation additional information.
//    PHONE_ADDRESS_FIELD_IDS: [
//        ["hiddenAdd1", "hiddenCity", "hiddenState", "hiddenZip"],
//        ["hiddenBillAdd1", "hiddenBillCity", "hiddenBillState", "hiddenBillZip"],
//        ["hiddenAltAdd1", "hiddenAltCity", "hiddenAltState", "hiddenAltZip"]
//    ],368982
    PHONE_COUNTRY_FIELD_IDS: ["hiddenCountry", "hiddenBillCountry", "hiddenAltCountry"],
    PHONE_CONSUMERNAME_FIELD_IDS: ["hiddenConsumerName", "hiddenBillConsumerName", "hiddenAltConsumerName"],
    PHONE_BUSINESSNAME_FIELD_IDS: ["hiddenBusinessName", "hiddenBillBusinessName", "hiddenAltBusinessName"],
    PHONE_PHONETYPE_FIELD_IDS: ["hiddenPhoneType", "hiddenBillPhoneType", "hiddenAltPhoneType"],

    /*
    * Addresses from different countries will be cleaned using different proxies.
    */
    DATA_SETS: ["USA", "CAN"], // ProWeb.
    ADD_DATA_SETS: [], //  Address Doctor.

    // Default dataset to use if the country field is empty.
    DEFAULT_DATA: "USA",

    // Map country name to QAS country code (not cap-sensitive).
    COUNTRY_MAP: [
        ['US', 'USA'],
        ['U.S.', 'USA'],
        ['U.S.A.', 'USA'],
        ['United States', 'USA'],
        ['United States of America', 'USA'],
        ['Canada', 'CAN'],
        ['CA', 'CAN'],
        ['1','USA']

    ],

    /*
    * This is only for Canadian addresses.
    * The ProWeb configuration should be setup to include LVR and Building Name as one of the last lines to properly handle the CAN apartments.
    * This variable should be set to the line number that contains these fields in the config.
    */
    LVR: 7,
    // Array of strings that identify the email fields' id in the form.
 //   EMAIL_FIELD_IDS: ["email", "billemail", "altemail"],--368982
    // Array of strings that identify the email error labels' id in the form. This is to display the error message if email is invalid.
    EMAIL_ERR_FIELD_IDS: ["email_error", "billemail_error", "altemail_error"],
    // Array of strings that identify the phone number fields' id in the form.
    PHONE_FIELD_IDS: ["phone", "billphone", "altphone"],
    // Array of strings that identify the phone number error labels' id in the form. This is to display the error message if phone number is invalid.
    PHONE_ERR_FIELD_IDS: ["phone_error", "billphone_error", "altphone_error"],

    // Function for phone validation's address format.
    PHONE_ADDRESS_FORMATS: function (e) {
        return {
            add1: {
                populateTo: $(".inputAdd1", e.closest("ol")),
                delimiter: " ",
                usFormat: "PrimaryAddressNumber,StreetName,StreetType",
                canFormat: "BuildingNumber,StreetName,StreetType"
            },
            city: {
                populateTo: $(".inputCity", e.closest("ol")),
                delimiter: " ",
                usFormat: "PostOfficeCityName",
                canFormat: "Municipality"
            },
            state: {
                populateTo: $(".inputState", e.closest("ol")),
                delimiter: " ",
                usFormat: "State",
                canFormat: "Province"
            },
            zip: {
                populateTo: $(".inputZip", e.closest("ol")),
                delimiter: "-",
                usFormat: "ZIPCode,ZIP+4",
                canFormat: "SpatialKey"
            }
        };
    },
    // Display error message on the email dialog box when email is invalid.
    DISPLAY_CUSTOM_EMAIL_ERR: true,
    // Display error message on the phone dialog box when phone number is invalid.
    DISPLAY_CUSTOM_PHONE_ERR: true,
    /*
    * Level to which e-mail validation should be performed.
    * 1 = syntax only.
    * 2 = syntax and status of the domain in the database.
    */
    EMAIL_VAL_LEVEL: "2",
    // The number of times to retry cleaning the e-mail address before accepting. 0 indicates always re-submit.
    EMAIL_NUM_SUBMITS: 2,
    // The number of times to retry cleaning the phone number before accepting. 0 indicates always re-submit.
    PHONE_NUM_SUBMITS: 2,
    // Set true to prompt user for information to correct address when needed.
    ADDRESS_USEDIALOG: true,
    // Set true to prompt user for information to correct email when needed.
    EMAIL_USEDIALOG: true,
    // Set true to prompt user for information to correct phone number when needed.
    PHONE_USEDIALOG: true,
    // Set true to always use address (when available) from phone validation.
    // NOTE: This will overwrite the address entered by the user. (Applicable only when "PHONE_USEDIALOG" is set to false)
    USE_PHONE_ADDRESS: false,
    // Display any errors encountered in an alert, should only be used for debugging.
    DISPLAY_ERRORS: true,
    // Ajax timeout for address validation.
    TIMEOUT: 15000,
    // Ajax timeout for email validation.
    TIMEOUT_EMAIL: 15000,
    // Ajax timeout for  phone validation.
    TIMEOUT_PHONE: 15000,
    // Number of lines to display in an "Interaction Required" address dialog box.
    DISPLAY_LINES: 6,
    // Set true to display phoneType to user.
    PHONETYPE_VISIBLE: true,
    // Set true to pre-pend '@' on the city field.
    IGNORE_RETENTION_ON_CITY: true
};

function callExperianValidation() {
    QAS_Variables.QAS_LAYOUT = "onboarding";
    //QAS_Variables.ADDRESS_FIELD_IDS[0] = ["req_Address1", "req_Address2", "req_City", "req_State", "req_Zip", "req_Country"]
    QAS_Variables.COUNTRY_FIELD_IDS[0] = "countryForm";
    QAS_Variables.CITY_FIELD_IDS[0] = "cityForm";

    // This is an array of city fields' id. This is to indicate which id in the "ADDRESS_FIELD_IDS" is representing the city field.



    QAS_Variables.ADDRESS_FIELD_IDS[0] = ["addressForm","address2Form", "cityForm", "stateForm", "zipCodeForm"];
    return QAS_Verify();
}

// These are the texts displayed to the end-user when interaction is required. Make changes here to alter the texts displayed.
var QAS_PROMPTS = {
    "InteractionRequired": {
        "header": "<b>We think that your address may be incorrect or incomplete.</b><br />To proceed, please choose one of the options below.",
        "prompt": "We recommend:",
        "button": "Use suggested address"
    },
    "PremisesPartial": {
        "header": "<b>Sorry, we think your apartment/suite/unit is missing or wrong</b><br />To proceed, please enter your apartment/suite/unit or use your address as entered",
        "prompt": "Confirm your Apartment/Suite/Unit number:",
        "button": "Confirm number",
        "showPicklist": "Show all potential matches",
        "invalidRange": "Secondary information not within valid range"
    },
    "StreetPartial": {
        "header": "<b>Sorry, we do not recognize your house or building number.</b><br />To proceed, please check and choose from one of the options below.",
        "prompt": "Confirm your House/Building number:",
        "button": "Confirm number",
        "showPicklist": "Show all potential matches",
        "invalidRange": "Primary information not within valid range"
    },
    "DPVNotConfirmed": {
        "header": "<b>Sorry, we could not confirm that this is an active mailing address.</b><br />To proceed, please choose one of the options below.",
        "prompt": "We recommend:",
        "button": "Use suggested address"
    },
    "AptAppend": {
        "header": "<b>Sorry, we think your apartment/suite/unit may be missing.</b><br />To proceed, please check and choose from one of the options below.",
        "prompt": "Confirm Apt/Ste:",
        "button": "Continue",
        "noApt": "I do not have an apt or suite"
    },
    "Multiple": {
        "header": "<b>We found more than one match for your address.</b><br />To proceed, please choose one of the options below.",
        "prompt": "Our suggested matches:"
    },
    "None": {
        "header": "<b>Sorry, we could not find a match for your address.</b><br />To proceed, please choose one of the options below."
    },
    "RightSide": {
        "prompt": "You Entered:",
        "edit": "Edit",
        "button": "Use Address As Entered*",
        "warning": "<b>*Your address may be undeliverable</b>"
    },
    "ConfirmEmail": {
        "header": "<b>Sorry we could not confirm your e-mail address and phone number</b><br />To proceed, please confirm your e-mail address and phone number below.",
        "headerPhone": "<b>Sorry we could not confirm your phone number</b><br />To proceed, please confirm your phone number below.",
        "headerEmail": "<b>Sorry we could not confirm your e-mail address</b><br />To proceed, please confirm your e-mail address below.",
        "promptEmail": "Confirm or edit your e-mail address",
        "promptPhone": "Confirm or edit your phone number"
    },
    "waitMessage": "Please wait, your details are being verified",
    "title": "Verify your address details",
    "emailTitle": "Verify your contact details",
    ConfirmPhone: {
        title: "Verify your contact details",
        header: "<b>Sorry we could not confirm your phone number</b><br />To proceed, please confirm your phone number below.",
        prompt: "Confirm or edit your phone number",
        addressTitle: "Verify your name and address details.",
        fullHeader: "<b>To proceed, please confirm your name and address details.</b>",
        fullLeftPrompt: "Returned address",
        fullRightPrompt: "Returned name",
        partialHeader: "<b>Sorry, we could not confirm your address.</b><br/>To proceed, please confirm your address.",
        partialLeftPrompt: "Confirm your address",
        partialRightPrompt: "Returned name",
        emptyHeader: "<b>Sorry, no name and address could be found.</b><br/>To proceed, please enter your name and address manually.",
        emptyPrompt: "No name and address could be found.",
        undeterminedLocaleHeader: "<b>Sorry, no additional information could be found.</b><br/>To proceed, please confirm your phone number.",
        undeterminedLocalePrompt: "Phone number is valid but no additional information is found.<br/>{0}"
    },
    "refineValueInvalidRange": "The value you entered is not within valid range."
};

var EMAIL_ERR_MESSAGES = {
    "5": "Validation Timeout",
    "10": "Syntax OK",
    "20": "Syntax OK and domain valid according to the domain database",
    "30": "Syntax OK and domain exists",
    "40": "Syntax OK, domain exists, and domain can receive email",
    "50": "Syntax OK, domain exists, and mailbox does not reject mail",
    "100": "Email has a general syntax error",
    "110": "Email has an invalid character",
    "115": "Email domain syntax is invalid",
    "120": "Email username syntax is invalid",
    "125": "Username syntax is invalid for that domain",
    "130": "Email is too long",
    "135": "Incorrect parentheses, brackets, or quotes",
    "140": "Email does not have a username",
    "145": "Email does not have a domain",
    "150": "Email does not have an @ sign",
    "155": "Email has more than one @ sign",
    "200": "Email has an invalid top-level-domain",
    "205": "Email cannot have an IP address as domain",
    "210": "Email address contains space or extra text",
    "215": "Email has unquoted spaces",
    "310": "Email domain is invalid",
    "315": "Email domain IP address is not valid",
    "325": "Email domain cannot receive email",
    "400": "Email username is invalid or nonexistent",
    "410": "Email mailbox is full",
    "420": "Email is not accepted for this domain",
    "500": "Email username is not permitted",
    "505": "Emails domain is not permitted",
    "510": "Email is suppressed and not permitted"
};

var PHONE_ERR_MESSAGES = {
    "default": "An unknown error has occurred.",
    "-1": "Phone number is invalid.",
    "-2": "Phone number has too few digits.",
    "-3": "Phone number has too many digits.",
    "-4": "Phone number is valid but no additional information could be returned.",
    "-5": "Phone number is valid but no additional information could be returned."
};

var QAS_TEMP_VARS = {
    NUM_EMAIL_SUBMITS: 0,
    EMAIL_POS: 0,
    NUM_PHONE_SUBMITS: 0,
    PHONE_POS: 0
};

/*
* The initial function to call from the webpage to initiate (in their respective order) e-mail, phone, and address validation.
*/
function QAS_Verify() {
    // Set any onclick events and submit buttons to use pre and post validation.
    var preOnclick = QAS_Variables.PRE_ON_CLICK;
    var postOnclick = QAS_Variables.POST_ON_CLICK;
    var buttonID = QAS_Variables.BUTTON_ID;

    // Clear the form.
    clearForm();

    var validateAddress = function () {
        if (typeof Main != "undefined" && $.isFunction(Main)) {
            // Define the address validation.
            var main = new Main(postOnclick, buttonID);

            // (Un)comment to set the timeout callback.
            main.timeoutCallback = onAddressTimeout;

            // (Un)comment to set the data override callback.
            main.dataOverrideCallback = onDataOverride;

            // Execute the address validation process.
            main.process();
        } else {
            if (buttonID !== "") {
                $('#' + buttonID).closest("form").submit();
            }
        }
    }

    var validatePhoneAddress = function () {
        if (typeof PhoneValidation != "undefined" && $.isFunction(PhoneValidation)) {
            // define phone validation
            var phone = new PhoneValidation(postOnclick, buttonID, validateAddress);

            // (Un)Comment to set the timeout callback.
            phone.timeoutCallback = onPhoneTimeout;

            // (Un)Comment to set the validated callback.
            phone.validatedCallback = onValidated;

            // Execute the phone validation process.
            phone.process.call(this);
        } else {
            validateAddress();
        }
    }

    var validateEmailPhoneAddress = function () {
        if (typeof EmailValidation != "undefined" && $.isFunction(EmailValidation)) {
            // validate email
            var email = new EmailValidation(postOnclick, buttonID, validatePhoneAddress);

            // (Un)Comment to set the timeout callback.
            email.timeoutCallback = onEmailTimeout;

            // Execute the email validation process.
            email.process();
        } else {
            validatePhoneAddress();
        }
    }
    if (preOnclick === null) {
        validateEmailPhoneAddress();
    } else if (preOnclick()) {
        validateEmailPhoneAddress();
    }

    return false;
};

window.QAS_Verify = QAS_Verify;

/***************************************************************************************
* Private
****************************************************************************************/
// clear the form.
function clearForm() {
    $("input[type='hidden']").val("");
    $("#emailTimeout").val("false");
    $("#addressTimeout").val("false");
    $("#phoneTimeout").val("false");
    $(".phoneTypeValue, .consumerName, .businessName").html("");
    $(".error").hide();
};

/***************************************************************************************
* Timeout functions.
* How to use (respectively for Address/Phone/Email):
*   1. Uncomment the timeout sections in QAS_Verify().
*   2. Uncomment the timeout function below.
****************************************************************************************/
function onAddressTimeout() {
    // Store address timeout flag to hidden field.
    $("#" + QAS_Variables.ADD_TIMEOUT_FIELD_ID).val("true");
};

function onPhoneTimeout() {
    // Store phone timeout flag to hidden field.
    $("#" + QAS_Variables.PHONE_TIMEOUT_FIELD_ID).val("true");
};

function onEmailTimeout() {
    // Store phone timeout flag to hidden field.
    $("#" + QAS_Variables.EMAIL_TIMEOUT_FIELD_ID).val("true");
};

/***************************************************************************************
* Data override function.
*
* Parameter:
*   index   - represents the index of the form i.e. [0], [0,1], [0,1,2]
* How to use:
*   1. Uncomment the data override sections in QAS_Verify().
*   2. Uncomment the data override function below.
****************************************************************************************/
function onDataOverride(index) {
    // Stores the indices into a hidden field
    $("#" + QAS_Variables.DATA_OVERRIDDEN_INDICES_FIELD_ID).val(index);
};

/***************************************************************************************
* Description:  Validated function. Will always be executed when phone number is
*               valid.
*
* Parameters:
*   index           - represents the index of the form.
*   address         - address returned by service (targus).
*   country         - country returned by service (targus).
*   consumerName    - consumer name returned by service (targus).
*   businessName    - business name returned by service (targus).
*   phoneType       - phone type returned by service (targus).
* How to use:
*   1. Uncomment the validation success sections in QAS_Verify().
*   2. Uncomment the validation success function below.
****************************************************************************************/
function onValidated(index, address, country, consumerName, businessName, phoneType) {
    // Set address to hidden field.
    var addFieldsId = QAS_Variables.PHONE_ADDRESS_FIELD_IDS[index];
    $.each(address, function (i, value) {
        $("#" + addFieldsId[i]).val(value);
    });

    // Set country to hidden field.
    $("#" + QAS_Variables.PHONE_COUNTRY_FIELD_IDS[index]).val(country);

    // Set consumer name to hidden field..
    $("#" + QAS_Variables.PHONE_CONSUMERNAME_FIELD_IDS[index]).val(consumerName);

    // Set business name to hidden field.
    $("#" + QAS_Variables.PHONE_BUSINESSNAME_FIELD_IDS[index]).val(businessName);

    // Set phone type to hidden field.
    $("#" + QAS_Variables.PHONE_PHONETYPE_FIELD_IDS[index]).val(phoneType);
};
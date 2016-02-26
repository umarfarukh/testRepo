/* 
************************************************
OnBoarding BGV utility helper
************************************************
Author: 260947
Date: 2012-Nov-28
Purpose: Utility methods related to BGV module
************************************************
*/
var bgvPId = 2; /*BGV Page Id*/
var CisPrefillData = {};
(function ($) {
    $.Compare = function (pageId, candidateId) {
        var data = "{";
        data += "'candidateId' :" + candidateId;
        data += ",'pageId' :" + pageId;
        data += "}";
        $.ajax({
            type: 'post', dataType: "json", async: false, contentType: 'application/json; charset=utf-8',
            url: '../../BGVService.aspx/GetCompareData',
            data: data, cache: false, success: function (msg) {
                //                var html = ""
                //                html += '<div class="div_instructions"><img src="../../Images/Bgv/collapse.png" style="vertical-align: middle; height: 12px;" />&nbsp;';
                //                html += headerTxt + '</div><div class="instructions_txt" ref="div_instructions">';
                //                html += '<ul style="list-style-type:disc;"><li>' + (msg.d).join('</li><li>') + '</li></ul></div>';
                //                $('.div_pagenotifications').empty().append(html);
                //                html = "";
            }
        })
    }
})(jQuery);
$().ready(function () {
    var checkValidPage = true;

    var CisDetails = {};
    //Checking here for whether the session id is available
    if (sessionId == null || sessionId == 0 || sessionId == "" || sessionId == NaN) {
        OBPage.RedirectOnSessionInvalid();
        return false;
    }
    else //If session id is available
    {
        var isSessionActive = OBUtils.ActiveSession(sessionId);
        isSessionActive = true;
        //Checking here for active session
        if (!isSessionActive) {
            OBPage.RedirectOnSessionExpire();
            return;
        }
        else //If session is active
        {
            //Whether the page is valid for this candidate
            if (checkValidPage) {
                jQXB.initialize();
                jQXB.compatibilitymode = false;

                if (BGVUtility.InitializeTaskSettings(candidateId, countryId, sessionId) == true) {

                    if (BGVUtility.GetCisData() == true) {

                        //Making Json ready to serve for js page
                        CisPrefillData = JSON.parse(BGVUtility.strCisPrefillValues);
                        CisDetails = JSON.parse(BGVUtility.cisPersonalDetails);

                        jQXB.setDataSource(BGVUtility.cisContentDSName, CisDetails, true).doBind(BGVUtility.cisContentDSName);


                    }

                    else {
                        OBPage.RedirectOnError("Could not access");
                        return false;
                    }
                }
                else {
                    OBPage.RedirectOnUnAuthorizedAccess();
                    return false;
                }
            }
            else {
                OBPage.RedirectOnAccessDenied();
                return false;
            }
        }
    }
    $.Compare(candidateId, 401);
});

/* BGV utility class */
var BGVUtility = {
    serviceURL: "../../FormsService.aspx",
    cisPersonalDetails: '',
    strCisPrefillValues: '',

    cisPersonalDetailsDataLog: '',

    cisContentDSName: '',

    isCisStarted: '',
    cisStatus: 0,
    componentData: '',

    ValidationStatus: '',
    ValidationMessage: '',
    ValidationSet: '',

    InitializeTaskSettings: function (candidateId, countryId, sessionId) {
        if (candidateId != "" && countryId != null && countryId != 0 && sessionId != null && sessionId != 0) {
            BGVUtility.candidateId = candidateId;
            BGVUtility.cisContentDSName = 'CisDetails';


            BGVUtility.taskErrorFlag = 0;
            BGVUtility.countryId = countryId;
            sessionId = sessionId;
            return true;
        }
        else {
            alert('Could not initialize BGV settings');
            return false;
        }
    },
    /* Function to bind data to DS */
    BindData: function (dataSource, dataSourceName, boolParseJSON) {
        if (boolParseJSON == true) {
            var objDataSource = JSON.parse(dataSource);
            jQXB.setDataSource(dataSourceName, objDataSource).doBind(dataSourceName);

            if (dataSourceName == 'DataXML') {
                /* Setting task data XML */
                if (BGVUtility.cisPersonalDetails == '') { BGVUtility.cisPersonalDetails = objDataSource.CisPersonalDataXML; }
                /* Setting prefill values XML */
                if (BGVUtility.strCisPrefillValues == '') { BGVUtility.strCisPrefillValues = objDataSource.CisPrefillData; }
                if (BGVUtility.isCisStarted == '') { BGVUtility.isCisStarted = objDataSource.IsCisStarted; }
                BGVUtility.cisStatus = objDataSource.CisStatus;
                if (BGVUtility.isCisComponentStarted == '') { BGVUtility.isCisComponentStarted = objDataSource.IsCisComponentStarted; }
                if (BGVUtility.cisPersonalDetailsDataLog == '' || BGVUtility.cisPersonalDetailsDataLog == null) { BGVUtility.cisPersonalDetailsDataLog = objDataSource.CisPersonalDataLogXML; }
                if ((roleGroupId == 2) && (BGVUtility.cisStatus >= 2)) {
                    if (BGVUtility.cisPersonalDetails != null) {
                        BGVUtility.cisPersonalDetails = objDataSource.CisPersonalDataXML;
                        BGVUtility.cisPersonalDetailsDataLog = objDataSource.CisPersonalDataLogXML;
                        /* Datalog XML working  */
                        if (objDataSource.CisPersonalDataLogXML != null && objDataSource.CisPersonalDataLogXML != undefined) {
                            var baseObj = JSON.parse(objDataSource.CisPersonalDataXML);
                            if (baseObj.CisPersonalData != null && baseObj.CisPersonalData != undefined) {
                                var dLObj = JSON.parse(objDataSource.CisPersonalDataLogXML).CisPersonalData;
                                baseObj = baseObj.CisPersonalData;
                                $.each(baseObj, function (tagName, data) {
                                    if (data != dLObj[tagName]) {
                                        $('label[for="' + tagName + 'Old"]').text(dLObj[tagName]);
                                    }
                                });
                            }
                        }
                    }
                }
            }
            if (dataSourceName == 'ValidationXML') {
                BGVUtility.ValidationStatus = objDataSource.ValidationStatus;
                BGVUtility.ValidationSet = objDataSource.ValidationMessage;
            }
        }
        else { jQXB.setDataSource(dataSourceName, dataSource).doBind(dataSourceName); }
    },

    /* Function to get the cis related data from DB */
    GetCisData: function () {
        if (BGVUtility.candidateId.toString() == "") {
            alert('Candidate Id not found');
            return false;
        }
        var retStatus = true;
        try {
            var data = "{";
            data += "'sessionId':" + sessionId + ",";
            data += "'candidateId':" + candidateId + ",";
            data += "'countryId':" + countryId + ",";
            data += "'roleGroupId':" + roleGroupId;
            data += "}";

            $.ajax({
                type: 'post',
                url: BGVUtility.serviceURL + "/GetCisData",
                data: data,
                dataType: "json",
                async: false,
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    BGVUtility.BindData(msg.d, "DataXML", true);
                    retStatus = true;
                },
                error: function (xhr, status, textRemarks) {
                    alert("Error : " + xhr.status + " " + textRemarks);
                    retStatus = false;
                }
            });
        }
        catch (e) {
            alert(e.Message);
            retStatus = false;
        }
        return retStatus;
    },
    /* Function to save /submit the cis content */
    /* Param 1: saveMode = Determines save method; 0->Save CIS Data; 1->Submit CIS Data*/
    SaveCisData: function (saveMode) {
        if (saveMode == 1) {
            // return false;
        }
        var retCisStatus = 0;
        try {

            var cisPersonalData = JSON.stringify(jQXB.getDataSource(BGVUtility.cisContentDSName)).toString();
            // var cisOtherData = JSON.stringify(jQXB.getDataSource(BGVUtility.cisOtherContentDSName)).toString();

            cisPersonalData = cisPersonalData.replace(/\\n/g, " ");
            cisPersonalData = cisPersonalData.replace(/\\/g, "\\\\");
            cisPersonalData = cisPersonalData.replace(/'/g, "\\\'");

            var isCisLocked = 0;

            var data = "{";
            data += "'sessionId':" + sessionId + ",";
            data += "'candidateId':" + BGVUtility.candidateId + ",";
            data += "'cisPersonalData':'" + cisPersonalData.toString() + "',";
            data += "'saveMode':" + saveMode.toString() + ",";
            data += "'isCisLocked':" + isCisLocked.toString() + ",";
            data += "'roleGroupId':" + roleGroupId;
            data += "}";

            $.ajax({
                type: "post",
                url: BGVUtility.serviceURL + "/SaveCisData",
                data: data,
                async: false,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) { retCisStatus = msg.d; },
                error: function (xhr, status, textRemarks) { alert("Error " + xhr.status + " " + textRemarks); }
            });
        }
        catch (e) {
            MsgboxAlert(sessionId, 2, 0, null, e.Message);
        }
        if (retCisStatus == 1) {
            BGVUtility.cisPersonalDetails = cisPersonalData;
            {
                if (saveMode == 0) {
                    BGVUtility.taskStatusFlag = 0;
                    MsgboxAlert(sessionId, 2, 207, 'TASK_SAVED_SUCCESS', 'Task Saved Successfully!!!');
                }
                else if (saveMode == 1) {
                    // alert("Form submitted successfully!!");
                    MsgboxAlert(sessionId, 2, 208, 'TASK_SUBMIT_SUCCESS', 'Task Submitted Successfully!!!');
                    BGVUtility.taskStatusFlag = 1;
                    BGVUtility.taskSubmittedFlag = 1;
                }
                return true;
            }
        }
        else {
            if (saveMode == 0)
                MsgboxAlert(sessionId, 2, 42, 'TASK_SAVE_FAILED', 'Task saving failed!!!');
            else if (saveMode == 1)
                MsgboxAlert(sessionId, 2, 42, 'TASK_SAVE_FAILED', 'Task saving failed!!!');

            return false;
        }
    },

    /* Function to validate the Cis content */
    ValidateCisData: function (actionmode) {
        var cisPersonalDataXML = JSON.stringify(jQXB.getDataSource(BGVUtility.cisContentDSName)).toString();

        cisPersonalDataXML = cisPersonalDataXML.replace(/\\n/g, " ");
        cisPersonalDataXML = cisPersonalDataXML.replace(/\\/g, "\\\\");
        cisPersonalDataXML = cisPersonalDataXML.replace(/'/g, "\\\'\\\'");

        BGVUtility.ValidationMessage = '';
        var isCisLocked = 0;
        var data = "{";
        data += "'sessionId':" + sessionId + ",";
        data += "'candidateId':" + BGVUtility.candidateId + ",";
        data += "'cisDataXML':'" + cisPersonalDataXML.toString() + "',";
        data += "'isCisSaved':" + actionmode.toString() + ",";
        data += "'isCisLocked':" + isCisLocked.toString() + ",";
        data += "'roleGroupId':" + roleGroupId;
        data += "}";


        $.ajax({
            type: "post",
            async: false,
            url: BGVUtility.serviceURL + "/ValidateCisContent",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                BGVUtility.BindData(msg.d, "ValidationXML", true);
            },
            error: function (xhr, status, textRemarks) { alert("Error " + xhr.status + " " + textRemarks); return false; }
        });

        if (BGVUtility.ValidationStatus == 0) {
            BGVUtility.errorDOM = OBUtils.OBParseXML(BGVUtility.ValidationSet);
            if (BGVUtility.errorDOM != null) {
                $(BGVUtility.errorDOM).find('ValidationSet').find('ValidationError').each(function () {
                    BGVUtility.ValidationMessage = BGVUtility.ValidationMessage + $(this).find('ValidationMessage').text();
                });
            }
            return false;
        }
        else {
            return true;
        }
    },


    /* Function to set member value manually */
    /* Param 1: dataMember = Exact data member name to which the value needs to be changed */
    /* Param 2: childLevel = Level of child to which the member belongs */
    /* Param 3: value = Value which needs to be updated */
    /* Param 4: doDataBind = Do data refresh is required */
    /* Param 5: index = Index value of child node - must be used in repeated child node items */
    SetTaskContentMemberValue: function (dataMember, childLevel, value, doDataBind, index) {
        var member = dataMember.split(".");
        var DSName = BGVUtility.cisContentDSName
        if (childLevel == null) {
            jQXB.setmemberVarvalue(DSName, member[0], member[1], value);
        }
        else {
            var memberList = '';
            for (var idx = 0; idx < member.length; idx++) {
                memberList = memberList + '.' + member[idx];
            }
            memberList = memberList.substring(1, memberList.length);
            jQXB.setmemberVarvalue(DSName, null, memberList, value);
        }
        if (doDataBind == true)
            jQXB.doBind(DSName);
    },
    /* Function to get master data from DB */
    GetMaster: function (masterCode, dataSourceName) {
        var data = "{";
        data += "'sessionId':" + sessionId.toString() + ",";
        data += "'parentCode':'" + masterCode + "'";
        data += "}";

        $.ajax({
            type: "post",
            url: BGVUtility.serviceURL + "/GetMaster",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) { BGVUtility.BindData(msg.d, dataSourceName, false); },
            error: function (xhr, status, textRemarks) { alert("Error " + xhr.status + " " + textRemarks); }
        });
    },

    /* Function to Get Geography master */
    GetGeographyMaster: function (mode, parentId, dataSourceName, asyncMode) {
        var data = "{";
        data += "'mode':" + mode.toString() + ",";
        data += "'candidateId':" + BGVUtility.candidateId + ",";
        data += "'parentcode':" + parentId.toString();
        data += "}";
        if (asyncMode == null)
            asyncMode = false;
        $.ajax({
            type: "post",
            url: BGVUtility.serviceURL + "/GetGeographyMaster",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: asyncMode,
            success: function (msg) { BGVUtility.BindData(msg.d, dataSourceName, false); },
            error: function (xhr, status, textRemarks) { alert("Error " + xhr.status + " " + textRemarks); }
        });
    },

    /* Function to Get BGV master */
    GetBGVMaster: function (Mode, TypeId, SubTypeId, dataSourceName) {
        var data = "{";
        data += "'Mode':" + Mode.toString() + ",";
        data += "'TypeId':" + TypeId + ",";
        data += "'SubTypeId':" + SubTypeId;

        data += "}";

        $.ajax({
            type: "post",
            url: BGVUtility.serviceURL + "/GetBGVMaster",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) { BGVUtility.BindData(msg.d, dataSourceName, false); },
            error: function (xhr, status, textRemarks) { alert("Error " + xhr.status + " " + textRemarks); }
        });
    },
    /* Function to Get BGV master */
    GetInstitutionDocuments: function () {
        var data = "{";
        data += "'sessionId':" + sessionId + ",";
        data += "'InstitutionId': 1";

        data += "}";

        $.ajax({
            type: "post",
            url: BGVUtility.serviceURL + "/GetInstitutionDocuments",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {
                var InstituionDocs = OBUtils.OBParseXML(msg.d); /* creating xml DOM object */
                return InstituionDocs;
            },

            error: function (xhr, status, textRemarks) { alert("Error " + xhr.status + " " + textRemarks); }
        });
    }

};

/* 
************************************************
OnBoarding BGV Candidate info script
************************************************
Author: 260947
Date: 2012-Nov-29
Purpose: Candidate related info function for BGV
************************************************
*/

$().ready(function () {
    $('.readOnly').attr('disabled', true);

    if (roleGroupId == 2) {/* if HRSS mode */
        $('.hrssReadonly').attr('disabled', true);
        BindInfoToControls();
    }
    else { /* if candidate or RC mode */
        if (BGVUtility.cisStatus >= 2) { /*  */
            $('#currentState').attr("disabled", "true");
            $('#longestStayState').attr("disabled", "true");
            $('#permanentState').attr("disabled", "true");
            $('.nfc').remove();
            $('.nhMandatory').text("*");
            $('.nhTextMandatory').addClass('textMandatory');
            $('.nhDropdownMandatory').addClass('dropdown');
            $('.nhDateMandatory').addClass('datepicker');
            $('.nhDateMandatory').addClass('dateMandatory');
            BindInfoToControls();
        }
        else {
            alert("BGV not initiated");
            return false;
        }
    }
    alignControls();
    SetNotificationText();
});

/*Function to set display notification*/
function SetNotificationText() { var notifyHtml = ""; try { var data = "{'sessionId':" + sessionId + ",'candidateId':" + candidateId + ",'roleGroupId':" + roleGroupId + ",'bgvPageId':" + bgvPId + "}"; $.ajax({ type: "post", async: true, url: "../../FormsService.aspx/GetPageNotification", data: data, contentType: "application/json; charset=utf-8", dataType: "json", success: function (msg) { notifyHtml = msg.d; $('#divBgvNoticeBar').html('<ul style="padding-left: 20px;">' + notifyHtml + '</ul>'); if ($.trim(notifyHtml) != "") { $('#divBgvNoticeBar').css('display', 'block'); } else { $('#divBgvNoticeBar').css('display', 'none'); } }, error: function (xhr, status, textRemarks) { notifyHtml = ""; } }); } catch (e) { } return; }

function alignControls() {
    var pos = 1;
    $(".alignMe").each(function () {
        if (pos == 1) {
            $(this).removeClass('flrt').addClass('flft');
            pos = 2;
            return;
        }
        if (pos == 2) {
            $(this).removeClass('flft').addClass('flrt');
            pos = 1;
        }
    });
}

$(function () {
    $(".datepicker").datepicker({ changeMonth: true,
        changeYear: true,
        yearRange: "1940:+0",
        maxDate: "0",
        showButtonPanel: false,
        dateFormat: 'mm/dd/yy',
        buttonText: 'Open calendar',
        showOn: "both", buttonImage: "../../Images/calendar.png",
        buttonAfter: false,
        buttonImageOnly: true
    });
});

function BindInfoToControls() {
    BGVUtility.GetMaster(131, "JoiningList");
    //BGVUtility.GetMaster(6, "JoiningLocationList");
    BGVUtility.GetMaster(132, "CasePriorityList");
    BGVUtility.GetGeographyMaster(1, 0, "CountryList");

    PrePopulateValues();

    if (BGVUtility.isCisStarted == 0) {
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.CandidateId', 1, CisPrefillData.PrefillValues.Set1.CandidateId, false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.CandidateFirstName', 1, CisPrefillData.PrefillValues.Set1.CandidateFirstName, false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.CandidateMiddleName', 1, CisPrefillData.PrefillValues.Set1.CandidateMiddleName, false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.CandidateLastName', 1, CisPrefillData.PrefillValues.Set1.CandidateLastName, false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.Designation', 1, CisPrefillData.PrefillValues.Set1.Designation, false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.DOJ', 1, CisPrefillData.PrefillValues.Set1.ExpectedDateOfJoining, false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.Joining', 1, CisPrefillData.PrefillValues.Set1.Joining, false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.OwningDepartment', 1, CisPrefillData.PrefillValues.Set1.OwningDepartment, false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.OfferExtendedDate', null, CisPrefillData.PrefillValues.Set1.OfferExtendedDate, false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.JoiningLocation', 1, CisPrefillData.PrefillValues.Set1.JoiningLocation, false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.OfferLocation', 1, CisPrefillData.PrefillValues.Set1.OfferLocation, false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.AccountName', null, CisPrefillData.PrefillValues.Set1.AccountName, false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.BU', 1, CisPrefillData.PrefillValues.Set1.BusinessEntity, false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.CasePriority', null, CisPrefillData.PrefillValues.Set1.CasePriority, false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.ExpectedBgvClosureDate', null, CisPrefillData.PrefillValues.Set1.ExpectedBgvClosureDate, false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.BgvCompletionDate', null, CisPrefillData.PrefillValues.Set1.BgvCompletionDate, false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.HomePh', 1, CisPrefillData.PrefillValues.Set1.LandLineNumber, false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.Mobile', 1, CisPrefillData.PrefillValues.Set1.MobilNumber, false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.EmailId', 1, CisPrefillData.PrefillValues.Set1.EmailId, false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.CurrentAddress', null, CisPrefillData.PrefillValues.Set1.CurrentAddress, false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.CurrentCountry', null, CisPrefillData.PrefillValues.Set1.CurrentCountry, false);
        if (CisPrefillData.PrefillValues.Set1.CurrentCountry != null || CisPrefillData.PrefillValues.Set1.CurrentCountry != '-1' || CisPrefillData.PrefillValues.Set1.CurrentCountry != '') {
            BGVUtility.GetGeographyMaster(2, CisPrefillData.PrefillValues.Set1.CurrentCountry, "CurrStateList");
            BGVUtility.SetTaskContentMemberValue('CisPersonalData.CurrentState', null, CisPrefillData.PrefillValues.Set1.CurrentState, false);
        }
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.CurrentCity', null, CisPrefillData.PrefillValues.Set1.CurrentCity, false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.CurrentPinCode', null, CisPrefillData.PrefillValues.Set1.CurrentPinCode, false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.CurrentDurationOfStayFrom', null, CisPrefillData.PrefillValues.Set1.CurrentDurationOfStayFrom, false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.CurrentDurationOfStayTo', null, CisPrefillData.PrefillValues.Set1.CurrentDurationOfStayTo, false);
        jQXB.doBind(BGVUtility.cisContentDSName);
    }
    else {
        jQXB.doBind(BGVUtility.cisContentDSName);
    }
    return true;
}

function SaveCisData(saveMode) {
    // saveMode { 0:Save, 1:Submit }
    if (saveMode == 1) {
        if (validate.ValidateSubmit() == true) {
            if (BGVUtility.ValidateCisData(saveMode) == true) {
                try {
                    if (BGVUtility.SaveCisData(saveMode) == true) {
                        // if (dashboardMode == 1) {
                        parent.proceedToUrl();
                        // }
                        //else {
                        //    window.opener.proceedToUrl('../BGV/BgvCandidateEduInfo.htm');
                        // }
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                catch (e) { alert(e.Message); }
            }
            else {
                MsgboxInfo(BGVUtility.ValidationMessage);
            }
        }
        else { MsgboxError("Some of the fields are having invalid values"); }
    }
    else {

        try {
            if (BGVUtility.SaveCisData(saveMode) == true) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (e) {
            alert(e.Message);
        }
    }
}

$('#currentCountry').change(function () {
    var currstateId = $('#currentCountry').val();
    if (currstateId != -1) {
        $('#currentState').removeAttr('disabled');
        BGVUtility.GetGeographyMaster(2, currstateId, "CurrStateList");
    }
});

$('#permanentCountry').change(function () {
    var currstateId = $('#permanentCountry').val();
    if (currstateId != -1) {
        $('#permanentState').removeAttr('disabled');
        BGVUtility.GetGeographyMaster(2, currstateId, "PermStateList");
    }
});

$('#longestStayCountry').change(function () {
    var currstateId = $('#longestStayCountry').val();
    if (currstateId != -1) {
        $('#longestStayState').removeAttr('disabled');
        BGVUtility.GetGeographyMaster(2, currstateId, "longestStayStateList");
    }
});

function PrePopulateValues() {

    var ccountryId = JSON.parse(BGVUtility.cisPersonalDetails).CisPersonalData.CurrentCountry;
    if (ccountryId != -1 && ccountryId != null && ccountryId != '') {
        if (roleGroupId != 2) {
            $('#currentState').removeAttr('disabled');
        }
        BGVUtility.GetGeographyMaster(2, ccountryId, "CurrStateList");
    }

    var pcountryId = JSON.parse(BGVUtility.cisPersonalDetails).CisPersonalData.PermanentCountry;
    if (pcountryId != -1 && pcountryId != null && pcountryId != '') {
        if (roleGroupId != 2) {
            $('#permanentState').removeAttr('disabled');
        }
        BGVUtility.GetGeographyMaster(2, pcountryId, "PermStateList");
    }

    var lcountryId = JSON.parse(BGVUtility.cisPersonalDetails).CisPersonalData.LongestStayCountry;
    if (lcountryId != -1 && lcountryId != null && lcountryId != '') {
        if (roleGroupId != 2) {
            $('#longestStayState').removeAttr('disabled');
        }
        BGVUtility.GetGeographyMaster(2, lcountryId, "longestStayStateList");
    }
}

function ChkPemanentAddress() {
    if ($("#chkPermAddress").is(':checked')) {
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.PermanentAddress', null, $('#currAddress').val(), false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.PermanentCountry', null, $('#currentCountry').val(), false);
        if ($('#currentCountry').val() != -1) {

            var permstateId = $('#currentCountry').val();
            if (permstateId != -1) {
                $('#permanentState').removeAttr('disabled');
                BGVUtility.GetGeographyMaster(2, permstateId, "PermStateList");
            }
            BGVUtility.SetTaskContentMemberValue('CisPersonalData.PermanentState', null, $('#currentState').val(), false);
        }
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.PermanentCity', null, $('#currentCity').val(), false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.PermanentPinCode', null, $('#currentPincode').val(), false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.PermanentDurationOfStayFrom', null, $('#currentDurationOfStayFrom').val(), false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.PermanentDurationOfStayTo', null, $('#currentDurationOfStayTo').val(), false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.IsSameCurrPermAddress', null, '1', false);

    }
    else {
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.PermanentAddress', null, '', false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.PermanentCountry', null, '-1', false);
        $('#permanentState').empty();
        $('#permanentState').attr("disabled", "true");
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.PermanentState', null, '', false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.PermanentCity', null, '', false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.PermanentPinCode', null, '', false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.PermanentDurationOfStayFrom', null, '', false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.PermanentDurationOfStayTo', null, '', false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.IsSameCurrPermAddress', null, '', false);

    }
    jQXB.doBind(BGVUtility.cisContentDSName);

}


function ChkLongestStayAddress() {
    if ($("#chkLongestStayAddress").is(':checked')) {
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.LongestStayAddress', null, $('#currAddress').val(), false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.LongestStayCountry', null, $('#currentCountry').val(), false);
        if ($('#currentCountry').val() != -1) {

            var longStaystateId = $('#currentCountry').val();
            if (longStaystateId != -1) {
                $('#longestStayState').removeAttr('disabled');
                BGVUtility.GetGeographyMaster(2, longStaystateId, "longestStayStateList");
            }
            BGVUtility.SetTaskContentMemberValue('CisPersonalData.LongestStayState', null, $('#currentState').val(), false);
        }
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.LongestStayCity', null, $('#currentCity').val(), false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.LongestStayPinCode', null, $('#currentPincode').val(), false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.LongestStaytDurationOfStayFrom', null, $('#currentDurationOfStayFrom').val(), false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.LongestStayDurationOfStayTo', null, $('#currentDurationOfStayTo').val(), false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.IsSameCurrLongestStayAddress', null, '1', false);

    }
    else {
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.LongestStayAddress', null, '', false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.LongestStayCountry', null, '-1', false);
        $('#longestStayState').empty();
        $('#longestStayState').attr("disabled", "true");
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.LongestStayState', null, '', false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.LongestStayCity', null, '', false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.LongestStayPinCode', null, '', false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.LongestStaytDurationOfStayFrom', null, '', false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.LongestStayDurationOfStayTo', null, '', false);
        BGVUtility.SetTaskContentMemberValue('CisPersonalData.IsSameCurrLongestStayAddress', null, '', false);

    }
    jQXB.doBind(BGVUtility.cisContentDSName);

}

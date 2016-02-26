var skipSurvey = 0;
var disableCalender = true;
$().ready(function () {


//    if (TaskPrefillValues.PrefillValues.Set1.Deferstatus == 'TRUE') {
//        $('#DIMDefer').hide();
//        $('#Deferstatus').hide();

//    }
//    else {
//        $('#DIMDefer').show();
//       
//    }

    //taskStatusFlag=1(TaskSubmitted), DOJSTATUSFLAG == 1(DOJ Updated by Candidate), TASKSTATUSFLAG == 1(Task Submitted), REQUESTSTATUS == 3(Request Pending)
    if (OBPager.taskStatusFlag == 1 && TaskPrefillValues.PrefillValues.Set1.CandidateType == 1 && TaskPrefillValues.PrefillValues.Set2.DOJSTATUSFLAG == 1 && TaskPrefillValues.PrefillValues.Set2.TASKSTATUSFLAG == 1 && TaskPrefillValues.PrefillValues.Set2.REQUESTSTATUS == 3) {

        var curdoj = TaskPrefillValues.PrefillValues.Set2.UpdatedDOJ;
        $('#edoj').val(curdoj);
        $("#alertDiv").show();
        $("#edoj").attr('disabled', 'disabled');
        disableCalender = false;
    }
    else {
        $('#alertDiv').hide();
    }

    if (self != top) {
        $('body').addClass('offerPage');
    }
    $('#please3_label').hide();
    $('#Next2').hide();
    var candidateType = TaskPrefillValues.PrefillValues.Set1.CandidateType;
    var candidateGroup = TaskPrefillValues.PrefillValues.Set1.CandidateGroup;
    var IsMigratedCandidate = TaskPrefillValues.PrefillValues.Set1.IsMigratedCandidate;
    var dosrvy = parseInt(qs["dosrvy"]);
    var srvyurl = "../../Paperwork/CommonNHPages/Survey.htm?ss=" + parseInt(qs["ss"]).toString() + "&cand=" + OBPager.candidateId.toString() + "&surveyType=1";

    if (dosrvy == "1") {
        confirmBox(srvyurl);
    }

    if (IsMigratedCandidate == 3) {
        $('#IsMigrate').hide();
        $('#please3_label').show();
        $('#please_label').hide();
        $('#Next2').show();
    }
    if (candidateType == 1 && (candidateGroup == 1 || candidateGroup == 0)) { $('#userManualPDF').hide(); }

    $('#manualpdf').on("click", function () {
        var urlpath = TaskPrefillValues.PrefillValues.Set1.URL;
        var Path = urlpath;
        try {
            var width = 970;
            var height = 700;
            var left = (screen.width - width) / 2;
            var top = (screen.height - height) / 2;
            var params = 'width=' + width + ', height=' + height;
            params += ', top=' + top + ', left=' + left;
            params += ', directories=no';
            params += ', location=no';
            params += ', menubar=no';
            params += ', resizable=no';
            params += ', scrollbars=yes';
            params += ', status=no';
            params += ', toolbar=no';

            var childWin1 = window.open(Path, "Popup1", params);
        }
        catch (e) { };
    });

    //var disableCalender = true;
    var status = 1;
    OBPager.GetGeographyMaster(14, OBPager.candidateId, "ReasonForDecline");
    if (TaskPrefillValues.PrefillValues.Set1.CandidateType == 2) {
        OBPager.GetMaster(6, "CampusLoc1");
        OBPager.GetGeographyMaster(16, OBPager.candidateId, "DeferYear");
        // OBPager.GetGeographyMaster(17, year, OBPager.candidateId, "DeferMonth");
    }
    else {
        OBPager.GetMaster(8, "ConvenientTime");
        $("#hdnHolidayDates").val(TaskPrefillValues.PrefillValues.Set1.HolidayDate);
        $("#hdnEligibleDays").val(TaskPrefillValues.PrefillValues.Set1.ValidDay);
        $("#hdnMaxDayValue").val(TaskPrefillValues.PrefillValues.Set1.MaxDate);
        $("#hdnMinDayValue").val(TaskPrefillValues.PrefillValues.Set1.MinDate);

        var holDt = "";
        var locEligibleDays = "", maxDt = "1", minDt = "1";
        var eligibleDays = new Array();

        if (document.getElementById("hdnHolidayDates").value != null) {
            holDt = document.getElementById("hdnHolidayDates").value.toString();
        }

        if (document.getElementById("hdnEligibleDays").value != null) {
            locEligibleDays = document.getElementById("hdnEligibleDays").value.toString();
        }

        if (document.getElementById("hdnMaxDayValue").value != null) {
            maxDt = document.getElementById("hdnMaxDayValue").value.toString();
        }

        if (document.getElementById("hdnMinDayValue").value != null) {
            minDt = document.getElementById("hdnMinDayValue").value.toString();
        }

        var unavailableDates = holDt.split(',');
        eligibleDays = $.map(locEligibleDays.split(','), function (val, idx) { return parseInt(val, 10) });

        function unavailable(date) {
            dmy = ("0" + date.getDate()).slice(-2) + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + date.getFullYear();
            if ($.inArray(dmy, unavailableDates) == -1) {
                if ($.inArray(date.getDay(), eligibleDays) != -1) {
                    return [true, "", "Available"];
                }
                else {
                    return [false, "", "Unavailable"];
                }
            } else {
                return [false, "", "Holiday"];
            }
        }
    }

    //Updating the value in Expected Date of Joining field with new DOJ Requested by the Candidate
    if (TaskPrefillValues.PrefillValues.Set1.CandidateType == 1) {
        if (OBPager.taskStatusFlag == 1 && TaskPrefillValues.PrefillValues.Set2.DOJSTATUSFLAG == 1 && TaskPrefillValues.PrefillValues.Set2.TASKSTATUSFLAG == 1 && TaskPrefillValues.PrefillValues.Set2.REQUESTSTATUS == 3) {
            OBPager.SetTaskContentMemberValue('OfferStatus.DOJ', null, TaskPrefillValues.PrefillValues.Set2.UpdatedDOJ, false);
        }
        else {
            OBPager.SetTaskContentMemberValue('OfferStatus.DOJ', null, TaskPrefillValues.PrefillValues.Set1.DOJ, false);
        }
    }
    else {
        OBPager.SetTaskContentMemberValue('OfferStatus.DOJ', null, TaskPrefillValues.PrefillValues.Set1.DOJ, false);
    }

    OBPager.SetTaskContentMemberValue('OfferStatus.City', null, TaskPrefillValues.PrefillValues.Set1.City, false);
    document.getElementById('IntroContent').innerHTML = TaskPrefillValues.PrefillValues.Set1.IntroContent;
    document.getElementById('AcceptContent').innerHTML = TaskPrefillValues.PrefillValues.Set1.AcceptContent;
    document.getElementById('AcceptContentCampus').innerHTML = TaskPrefillValues.PrefillValues.Set1.IntroContent;
    document.getElementById('RejectContent').innerHTML = TaskPrefillValues.PrefillValues.Set1.RejectContent;
    document.getElementById('RejectContentCampus').innerHTML = TaskPrefillValues.PrefillValues.Set1.RejectContent;
    document.getElementById('defered_DIM').innerHTML = TaskPrefillValues.PrefillValues.Set1.DeferredMsg;
    OBPager.SetTaskContentMemberValue('OfferStatus.EmailId', null, TaskPrefillValues.PrefillValues.Set1.EmailId, false);
    $("#btnsaveBSchool").hide();
    $("#city").text = TaskPrefillValues.PrefillValues.Set1.City;
    OBPager.SetTaskContentMemberValue('OfferStatus.PrefferedContactNumber', null, TaskPrefillValues.PrefillValues.Set1.PrefferedContactNumber, false);

    if (TaskPrefillValues.PrefillValues.Set1.CandidateType == 2 && TaskPrefillValues.PrefillValues.Set1.CandidateGroup == 0) {
        document.getElementById('IntroContent').innerHTML = TaskPrefillValues.PrefillValues.Set1.IntroContent;
        $("#other1").hide();
        $("#other2").hide();

        if (TaskPrefillValues.PrefillValues.Set1.OfferStatus == 0) {
            $('#accept_offer_page').hide();
            $('#landing_page').show();
            $('#reject_offer_page1').hide();
            OBPager.SetTaskContentMemberValue('OfferStatus.Accept', 1, "", false);
            OBPager.SetTaskContentMemberValue('OfferStatus.Reject', 1, "", false);
        }
        if (TaskPrefillValues.PrefillValues.Set1.DateIntimationMailStatus == 1) {
            $('#fstatus').hide();
            $('#accept_offer_page').hide();
            $('#reject_offer_page1').hide();
            $('#landing_page').show();
            $('#DIMStatus').show();
            document.getElementById('IntroContent').innerHTML = TaskPrefillValues.PrefillValues.Set1.DIMIntro;
            if (TaskPrefillValues.PrefillValues.Set1.DIMDefer == "true") {
                $('#fstatus').hide();
                $('#landing_page').hide();
                $('#DIMStatus').hide();
                document.getElementById('defered_DIM').style.display = "block";
            }
            else {
                OBPager.SetTaskContentMemberValue('OfferStatus.Campus.DIMAccept', 1, "", false);
                OBPager.SetTaskContentMemberValue('OfferStatus.Campus.DIMDefer', 1, "", false);
                OBPager.SetTaskContentMemberValue('OfferStatus.Campus.DIMDecline', 1, "", true);
            }
        }
    }

    if (TaskPrefillValues.PrefillValues.Set1.CandidateType == 1 && TaskPrefillValues.PrefillValues.Set1.CandidateGroup == 1) {
        $('#fstatus').hide();
        $(".lblDOJ").text(TaskPrefillValues.PrefillValues.Set1.DOJ);

        if (TaskPrefillValues.PrefillValues.Set1.FreezeStatus == 1) {
            OBPager.SetTaskContentMemberValue('OfferStatus.Accept', 1, "true", false);
            OBPager.SetTaskContentMemberValue('OfferStatus.Reject', 1, "", false);
            $('#landing_page').hide();
            $('#reject_offer_page1').hide();

            if (OBPager.taskStatusFlag == -1) {
                $('#accept_offer_page').show();
                $('#AcceptContent').css('display', 'block');
            }
        }
        else {
            if (TaskPrefillValues.PrefillValues.Set1.Accept == "true") {
                $('#accept_offer_page').show();
                $('#landing_page').hide();
                $('#AcceptContent').css('display', 'block');

                OBPager.SetTaskContentMemberValue('OfferStatus.Accept', 1, "true", false);
                OBPager.SetTaskContentMemberValue('OfferStatus.Reject', 1, "", false);

                $('#reject_offer_page1').hide();
            }
            else if (TaskPrefillValues.PrefillValues.Set1.Reject == "true") {
                $('#accept_offer_page').hide();
                OBPager.SetTaskContentMemberValue('OfferStatus.Reject', 1, "true", false);
                OBPager.SetTaskContentMemberValue('OfferStatus.Accept', 1, "", false);
                $('#landing_page').hide();
                $('#reject_offer_page1').show();
                $("#other").show();
            }
            else {
                document.getElementById('DIMStatusBschool').style.display = "block";
                $('#accept_offer_page').hide();
                $('#reject_offer_page1').hide();
                $("#other").hide();
                OBPager.SetTaskContentMemberValue('OfferStatus.Reject', 1, "", false);
                OBPager.SetTaskContentMemberValue('OfferStatus.Accept', 1, "", false);
            }
        }
        if (TaskPrefillValues.PrefillValues.Set1.FreexeEDOJ == 1) {
            $('#EDOJFreezeMsg').text(TaskPrefillValues.PrefillValues.Set1.EDOJFreezeMsg);
            document.getElementById('EDOJFreezeMsg').style.display = "block";
            $('#edoj').attr('disabled', 'disabled');
            disableCalender = false;
        }
    }

    if (TaskPrefillValues.PrefillValues.Set1.CandidateType == 1 && TaskPrefillValues.PrefillValues.Set1.CandidateGroup == 0) {
        if (TaskPrefillValues.PrefillValues.Set1.FreezeStatus == 1) {
            OBPager.SetTaskContentMemberValue('OfferStatus.Accept', 1, "true", false);
            OBPager.SetTaskContentMemberValue('OfferStatus.Reject', 1, "", false);
            $('#landing_page').hide();
            $('#reject_offer_page1').hide();
            document.getElementById('fstatus').style.display = "none";
            if (OBPager.taskStatusFlag == -1) {
                $('#accept_offer_page').show();
                $('#AcceptContent').css('display', 'block');
            }
        }
        else {
            if (TaskPrefillValues.PrefillValues.Set1.Accept == "true") {
                $('#accept_offer_page').show();
                $('#landing_page').hide();
                $('#AcceptContent').css('display', 'block');

                OBPager.SetTaskContentMemberValue('OfferStatus.Accept', 1, "true", false);
                OBPager.SetTaskContentMemberValue('OfferStatus.Reject', 1, "", false);

                $('#reject_offer_page1').hide();
            }
            else if (TaskPrefillValues.PrefillValues.Set1.Reject == "true") {
                $('#accept_offer_page').hide();
                OBPager.SetTaskContentMemberValue('OfferStatus.Reject', 1, "true", false);
                OBPager.SetTaskContentMemberValue('OfferStatus.Accept', 1, "", false);
                //   $('#reject')[0].checked = true;
                //  $('#reject').attr('checked', true);
                $('#landing_page').hide();
                $('#reject_offer_page1').show();
                $("#other").show();
            }
            else {
                $('#radiobtn').css('display', 'block');
                $('#accept_offer_page').hide();
                $('#reject_offer_page1').hide();
                $("#other").hide();
                OBPager.SetTaskContentMemberValue('OfferStatus.Reject', 1, "", false);
                OBPager.SetTaskContentMemberValue('OfferStatus.Accept', 1, "", false);
            }
        }
        if (TaskPrefillValues.PrefillValues.Set1.FreexeEDOJ == 1) {
            $('#EDOJFreezeMsg').text(TaskPrefillValues.PrefillValues.Set1.EDOJFreezeMsg);
            document.getElementById('EDOJFreezeMsg').style.display = "block";
            $('#edoj').attr('disabled', 'disabled');
            // $('#edoj').datepicker({ enable: false });
            disableCalender = false;

            //$("#edoj").datepicker('destroy');
            //  $('#pEDOJ').css('visibility', 'hidden'); // Hide EDOJ Change Control 
        }
        jQXB.doBind(OBPager.taskContentDSName);
    }
    $(function () {
        if (disableCalender) {
            $("#edoj").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar',
                showOn: "both", buttonImage: "../../../../Images/calender_icon.jpg", buttonAfter: false, changeMonth: true, changeYear: true, beforeShowDay: unavailable, minDate: minDt, maxDate: maxDt
            });
        }
    });

    $(".jQrydatepicker").datepicker({ dateFormat: 'mm/dd/yy', buttonText: 'Open calendar',
        showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    });

    $('#accept').click(function () {
        if (TaskPrefillValues.PrefillValues.Set1.CandidateType == 1) {
            //   $('#accept').attr('checked', true);
            OBPager.SetTaskContentMemberValue('OfferStatus.Accept', 1, "true", false);
            OBPager.SetTaskContentMemberValue('OfferStatus.Reject', 1, "", false);
            $('#AcceptContent').css('display', 'block');
            $.fn.page1();
            $.fn.page3();
            $('#accept_offer_page').show();
        }
        else {
            OBPager.SetTaskContentMemberValue('OfferStatus.Accept', 1, "true", false);
            OBPager.SetTaskContentMemberValue('OfferStatus.Reject', 1, "", false);

            $('#AcceptContentCampus').css('display', 'block');
            $.fn.page1();
            $('#reject_offer_pageCampus').hide();
            $('#accept_offer_page_campus').show();

            $('#accept_offer_page').hide();
            $('#reject_offer_page1').hide();
        }
    });
    $('#reject').click(function () {
        //   $('#reject').attr('checked', true);
        if (TaskPrefillValues.PrefillValues.Set1.CandidateType == 1) {
            OBPager.SetTaskContentMemberValue('OfferStatus.Reject', 1, "true", false);
            OBPager.SetTaskContentMemberValue('OfferStatus.Accept', 1, "", false);
            $.fn.page1();
            $.fn.page2();
            $('#reject_offer_page1').show();
        }
        else {
            OBPager.SetTaskContentMemberValue('OfferStatus.Reject', 1, "true", false);
            OBPager.SetTaskContentMemberValue('OfferStatus.Accept', 1, "", false);
            $.fn.page1();

            $('#accept_offer_page').hide();
            $('#accept_offer_page_campus').hide();
            $('#reject_offer_pageCampus').show();
        }
    });
    $('#DIMAccept').click(function () {
        OBPager.SetTaskContentMemberValue('OfferStatus.Campus.DIMAccept', 1, "true", false);
        OBPager.SetTaskContentMemberValue('OfferStatus.Campus.DIMDefer', 1, "", false);
        OBPager.SetTaskContentMemberValue('OfferStatus.Campus.DIMDecline', 1, "", false);
        Save(1);
    });
    //defer option
//    $('#DIMDefer').click(function () {
//        OBPager.SetTaskContentMemberValue('OfferStatus.Campus.DIMAccept', 1, "", false);
//        OBPager.SetTaskContentMemberValue('OfferStatus.Campus.DIMDefer', 1, "true", false);
//        OBPager.SetTaskContentMemberValue('OfferStatus.Campus.DIMDecline', 1, "", false);
//        $('#defer_date_campus').show();
//        $('#decline_date_campus').hide();
//    });



    $('#DIMDecline').click(function () {
        OBPager.SetTaskContentMemberValue('OfferStatus.Campus.DIMAccept', 1, "", false);
        OBPager.SetTaskContentMemberValue('OfferStatus.Campus.DIMDefer', 1, "", false);
        OBPager.SetTaskContentMemberValue('OfferStatus.Campus.DIMDecline', 1, "true", false);
        $('#decline_date_campus').show();
        $('#defer_date_campus').hide();
    });


    $('#DIMBschoolAccept').click(function () {
        OBPager.SetTaskContentMemberValue('OfferStatus.Accept', 1, true, false);
        OBPager.SetTaskContentMemberValue('OfferStatus.Reject', 1, "", true);
        $('#AcceptContent').css('display', 'block');
        $('#landing_page').show();
        $.fn.page3();
        $('#lblcaptionDOJ').show();
        $('#lblDOJ').show();
        $("#btnsaveBSchool").show();
    });

    $('#DIMBschoolDecline').click(function () {
        OBPager.SetTaskContentMemberValue('OfferStatus.Reject', 1, true, false);
        OBPager.SetTaskContentMemberValue('OfferStatus.Accept', 1, "", true);
        $.fn.page1();
        $.fn.page2();
        $('#lblcaptionDOJ').hide();
        $('#lblDOJ').hide();
        $("#btnsaveBSchool").hide();
        $("#RejectContent").hide();
        $('#reject_offer_page1').show();

    });

    $.fn.page1 = function () {
        $('#landing_page').hide();
    }
    $.fn.page2 = function () {
        $('#accept_offer_page').hide();
    }
    $.fn.page3 = function () {
        $('#reject_offer_page1').hide();
    }
    $('#DeferYear').change(function () {
        var year = $('#DeferYear').val();
        OBPager.GetGeographyMaster(17, year, "DeferMonth");
    });

    $(".decline_reason").change(function () {
        var str = "";
        $(".decline_reason option:selected").each(function () {
            str = $(this).text();
            if (str == "Others") {
                $("#other").slideToggle(500);
            }
            else {
                $("#other").hide();
            }
        });
    }).trigger('change');

    $(".decline_reason1").change(function () {
        var str = "";
        $(".decline_reason1 option:selected").each(function () {
            str = $(this).text();
            if (str == "Others") {
                $("#other1").slideToggle(500);
            }
            else {
                $("#other1").hide();
            }
        });
    }).trigger('change');

    $(".decline_reason2").change(function () {
        var str = "";
        $(".decline_reason2 option:selected").each(function () {
            str = $(this).text();
            if (str == "Others") {
                $("#other2").slideToggle(500);
            }
            else {
                $("#other2").hide();
            }
        });

    }).trigger('change');
});

function SetStatus(OfferStatus) {
    if (OfferStatus == 1) {
        OBPager.SetTaskContentMemberValue('OfferStatus.Accept', 1, "true", false);
        OBPager.SetTaskContentMemberValue('OfferStatus.Reject', 1, "false", false);
    }
    else {
        OBPager.SetTaskContentMemberValue('OfferStatus.Reject', 1, 1, false);
    }
}

function SaveCampus() {
    document.getElementById('divToBeinTouch').style.display = "block";
    $('#reject_offer_pageCampus').hide();
    document.getElementById('fstatus').style.display = "none";
    $('#AcceptContent').css('display', 'none');
}

function Save(mode) {

    var TaskStatus = OBPager.taskStatusFlag;
    var NotificationEventID; var dataString;
    // curdoj:DOJ from candidatetransaction table, newdoj:DOJ from inputtextbox  
    var curDOJ = TaskPrefillValues.PrefillValues.Set1.DOJ;
    var updatedDOJ = $('#edoj').val();
    // saveMode { 0:Save, 1:Submit }
    if (TaskStatus == -1 || TaskPrefillValues.PrefillValues.Set1.CandidateType == 2 || ($('#reject')[0].checked == true)) {
        OBPager.PDFFlag = 2;
    }

    if (validate.ValidateSubmit() == true) {
        if (OBPager.ValidateTaskData(1) == true) {

            if (updatedDOJ == curDOJ && TaskPrefillValues.PrefillValues.Set1.CandidateType == 1) {
            }
            else if (updatedDOJ != null || updatedDOJ != '') {
                if (TaskPrefillValues.PrefillValues.Set1.CandidateType == 1) {
                    alert("Please wait for Date of Joining Confirmation from your Recruiter");
                }
            }

            try {
                if ((TaskPrefillValues.PrefillValues.Set1.CandidateType == 2) && ($('#reject')[0].checked == true) && mode == 2) {
                    var agree = confirm("Are you interested to be in touch with cognizant?");
                    if (agree) { SaveCampus(); }
                    else {
                        if (OBPager.SaveTaskData(1) == true) {
                            //Mailer entries for campus when not agreed to be in touch with Cognizant
                            Notify(OBPager.candidateId, 11, 0, 3);
                            Notify(OBPager.candidateId, 85, 0, 3);
                            OBPager.RedirectOnOfferStatus(2);
                        }
                        else {
                            return false;
                        }
                    }
                }
                else {
                    if (TaskPrefillValues.PrefillValues.Set1.IsMigratedCandidate == 3) {
                        OBPager.SetTaskContentMemberValue('OfferStatus.Accept', 1, "true", false);
                    }

                    if (OBPager.SaveTaskData(1) == true) {
                        //Mailer entries for campus when agreed to be in touch with Cognizant
                        if ((TaskPrefillValues.PrefillValues.Set1.CandidateType == 2) && ($('#reject')[0].checked == true) && mode == 1) {
                            Notify(OBPager.candidateId, 11, 0, 3);
                            Notify(OBPager.candidateId, 85, 0, 3);
                        }

                        //Mail to campus on reject DOJ with Cognizant
                        if ((TaskPrefillValues.PrefillValues.Set1.CandidateType == 2) && ($('#DIMDecline')[0].checked == true)) {
                            Notify(OBPager.candidateId, 175, 0, 3);
                        }

                        if ((TaskPrefillValues.PrefillValues.Set1.CandidateType == 1 && TaskPrefillValues.PrefillValues.Set1.CandidateGroup == 0) || (TaskPrefillValues.PrefillValues.Set1.IsMigratedCandidate == 3)) {
                            if ($('#reject')[0].checked == true) {
                                Notify(OBPager.candidateId, 11, 0, 3);
                                Notify(OBPager.candidateId, 70, 0, 3);
                            }
                            else if ($('#accept')[0].checked == true) {
                                if (TaskStatus == -1) {
                                    /* On First TIme Submit */
                                    Notify(OBPager.candidateId, 10, 0, 3);
                                    //Mail to NH once NH accepts the Offer
                                    Notify(OBPager.candidateId, 171, 0, 3);

                                    /* commented to fix issue of EDOJ maile rgetting triggerred on first time submit without DOJ change */
                                    //  NotificationEventID = 4
                                    // dataString = '{NotificationEventID:' + NotificationEventID + ',ToId:""' + ',CCid:""' + ',countryID:' + "'" + 3 + "'" + '}';
                                    // $.MailSend(dataString);

                                    if (TaskPrefillValues.PrefillValues.Set1.DOJ != (document.getElementById("edoj").value)) {
                                        /* On EDOJ CHnages */
                                        Notify(OBPager.candidateId, 4, 0, 3);
                                    }
                                }
                                else {
                                    if (TaskPrefillValues.PrefillValues.Set1.DOJ != (document.getElementById("edoj").value)) {
                                        /* On EDOJ CHnages */
                                        Notify(OBPager.candidateId, 4, 0, 3);
                                    }
                                    if (window.parent.opener == undefined) {
                                        OBPager.RedirectOnOfferStatus(1, skipSurvey);
                                    }
                                }
                            }
                        }

                        if (TaskPrefillValues.PrefillValues.Set1.CandidateType == 1 && TaskPrefillValues.PrefillValues.Set1.CandidateGroup == 1) {
                            if ($('#DIMBschoolDecline')[0].checked == true) {
                                Notify(OBPager.candidateId, 11, 0, 3);
                                Notify(OBPager.candidateId, 70, 0, 3);
                            }
                            else if ($('#DIMBschoolAccept')[0].checked == true) {
                                if (TaskStatus == -1) {
                                    /* On First TIme Submit */
                                    Notify(OBPager.candidateId, 10, 0, 3);
                                    Notify(OBPager.candidateId, 171, 0, 3);

                                    /* commented to fix issue of EDOJ maile rgetting triggerred on first time submit without DOJ change */
                                    //  NotificationEventID = 4
                                    // dataString = '{NotificationEventID:' + NotificationEventID + ',ToId:""' + ',CCid:""' + ',countryID:' + "'" + 3 + "'" + '}';
                                    // $.MailSend(dataString);

                                    if (TaskPrefillValues.PrefillValues.Set1.DOJ != (document.getElementById("edoj").value)) {
                                        /* On EDOJ CHnages */
                                        Notify(OBPager.candidateId, 4, 0, 3);
                                    }
                                }
                                else {
                                    if (TaskPrefillValues.PrefillValues.Set1.DOJ != (document.getElementById("edoj").value)) {
                                        /* On EDOJ CHnages */
                                        Notify(OBPager.candidateId, 4, 0, 3);
                                    }
                                    if (window.parent.opener == undefined) {
                                        OBPager.RedirectOnOfferStatus(1, skipSurvey);
                                    }
                                }
                            }

                        }
                        //                        else if ((TaskPrefillValues.PrefillValues.Set1.CandidateType == 1) && (TaskPrefillValues.PrefillValues.Set1.CandidateGroup == 2)) {
                        //                            OBPager.RedirectOnOfferStatus(1);
                        //                        }
                        if (TaskStatus == -1) {
                            if (TaskPrefillValues.PrefillValues.Set1.FreezeStatus == 1) {
                                OBPager.RedirectOnOfferStatus(1, skipSurvey);
                            }
                            else if ($('#reject')[0].checked == true || $('#DIMBschoolDecline')[0].checked == true) {
                                OBPager.taskStatusFlag = TaskStatus;
                                OBPager.RedirectOnOfferStatus(2);
                            }
                            else {
                                OBPager.taskStatusFlag = TaskStatus;
                                OBPager.RedirectOnOfferStatus(1, skipSurvey);
                            }
                        }
                        else if ($('#reject')[0].checked == true || $('#DIMBschoolDecline')[0].checked == true) {
                            try { window.parent.opener.disablePopup(); } catch (e) { }
                            try { window.close(); } catch (e) { }
                            try { window.opener.RejectRedirect(); } catch (e) { }
                            try { OBPager.RedirectOnOfferStatus(null); } catch (e) { }
                        }
                        else if ((TaskPrefillValues.PrefillValues.Set1.CandidateType == 2) && ($('#accept')[0].checked == true)) {
                            OBPager.RedirectOnOfferStatus(1, skipSurvey);
                        }
                        else if ($('#DIMAccept')[0].checked == true) {
                            OBPager.RedirectOnOfferStatus(1, skipSurvey);
                            //OBPager.RedirectOnOfferStatus(2);
                        }
                        else if ($('#DIMDecline')[0].checked == true) {
                            OBPager.RedirectOnOfferStatus(2);
                            //OBPager.RedirectOnOfferStatus(2);
                        }
                                                else if ($('#DIMDefer')[0].checked == true) {
                                                    document.getElementById('defered_DIM').style.display = "block";
                                                    $('#defer_date_campus').hide();
                                                    document.getElementById('DIMStatus').style.display = "none";
                                                    $('#landing_page').css('display', 'none');
                                                }

                        if (TaskPrefillValues.PrefillValues.Set1.IsBgvEnabled == 1 && TaskPrefillValues.PrefillValues.Set1.CandidateType == 1) {
                            if ($('#reject')[0].checked == true) {
                                Notify(OBPager.candidateId, 169, 0, 3);
                            }
                        }
                    }
                    else {
                        return false;
                    }
                }

              
            }
            catch (e) {
                alert(e.Message);
            }
        }

        else {
            MsgboxInfo(OBPager.ValidationMessage);
        }
    }

   
}


/* Survey */
function SurveyPopupWindow(url, surveyUrl) {
    var popupStatus = 0;
    if (url == 0) {
        $("#overLay").hide();
        $(".wrapper_landing").remove();
        skipSurvey = 1;
    } else {

        try {
            //loads popup only if it is disabled
            if (popupStatus == 0) {
                $(".wrapper_landing").remove();
                var closeBox = '<table width="102%" border="0" cellspacing="0" cellpadding="0" style="position:absolute;*width:102%;*margin-left:-20px;">';
                closeBox += '<tr><td style="border:none;"><a onclick="surveydisablePopup();return;" style="float:right;background:url(../../../../Images/Survey/close.png) no-repeat; width:25px; height:25px; border:none; outline:none; position:relative; z-index:100;"></a></td></tr>'
                closeBox += '</table>';
                //Iframe Box
                var $htmlContent = "<iframe id='iFrameLoader' class='surveyIframe' width='940px' height='510px'  frameborder='0' scrolling='no' src='" + surveyUrl + "' style='margin-top:15px;overflow:hidden;*margin-left:-5px;'></iframe>";

                var $popupData = $('<div class="suverypopupContactwrapper" style="z-index:999999"/>').html($htmlContent).prepend(closeBox);
                $("body").prepend($popupData);
                $(".suverypopupContactwrapper").show();
                popupStatus = 1;
            }
            surveycenterPopup();
        } catch (e) {
        }
    }
}

function surveycenterPopup() {
    //request data for centering
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;

    var popupHeight = $(".suverypopupContactwrapper").height();
    var popupWidth = $(".surveyIframe").width();

    //centering
    $(".suverypopupContactwrapper").css({
        "position": "absolute",
        "top": windowHeight / 2 - popupHeight / 2,
        "left": windowWidth / 2 - popupWidth / 2

    });

    //only need force for IE6	
    $("#overLay").css({
        "height": windowHeight
    });
}
//disabling popup with jQuery magic!
function surveydisablePopup(status) {
    //disables popup only if it is enabled
    $("#overLay").hide();
    $(".suverypopupContactwrapper").hide();
    popupStatus = 0;

    if (status == undefined)
        skipSurvey = 1;
}

var confirmBox = function (url) {
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var candName = OBPager.candidateName.toString();
    if (candName == null || candName == undefined || candName == '')
        candName = '';
    var $backgroundOverLay = $('<div id="overLay"/>');
    $("body").prepend($backgroundOverLay);
    $("#overLay").css({
        "opacity": "0.7"
    });
    $("#overLay").show();
    var $popupContent = '<div class="pop_wrapper" style="width:468px;position: relative;">';
    $popupContent += '<div class="close" onclick="SurveyPopupWindow(0);" style="background:url(../../../../images/Survey/close.png) no-repeat; height:30px; width:30px; float:right;cursor:pointer;  position: relative;right: -20px;top: 16px;">';
    $popupContent += '</div><div class="pop_content_wrapper" style="background:url(../../../../images/Survey/pop_bg.png) repeat-x; height:385px; width:468px; float:left;"><p class="welcome" style="font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#fefefe; margin: 10px 0 10px 10px; float:left;">';
    $popupContent += 'Welcome <span id="Name" style="font-weight:bold;">' + candName + '</span></p><div class="pop_content" style=" background:url(../../../../images/Survey/popup_content_bg.png) repeat-x;border:1px solid #000;width:450px; height:286px;  margin: 0 0 0 8px; float:left; clear:both;">';
    $popupContent += '<p class="note_head" style="font-size:26px; color:#191919; margin: 50px 0 0 23px;">We\'d like to hear from you!!!</p>';
    $popupContent += '<p class="feedback_note" style=" font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#3d3d3d; line-height: 24px;margin: 5px 0 0 25px;width: 74%; ">';
    $popupContent += 'Please share your <span style=" font-weight:bold; color:#226b1f;">feedback</span> by sparing 5 minutes of your valuable time.</p><img src="../../../../images/Survey/icon_bg.png" style="float:right;" /></div>';
    $popupContent += '<div class="btns" style="float:right; clear:both; margin: 9px 34px 0 -60px;font-weight:bold;font-size:12px;*margin-top:70%;"><input type="button" class="remind_me_clicked popup_btn" value="Remind Me Later" style="height:30px; width:132px; border:1px solid #767676; cursor:pointer;margin-right:10px;*float:left;"  onclick="SurveyPopupWindow(0);"/><input type="button" class="take_me_to_survey popup_btn" value="Take Me To The Survey" style="height:30px;border:1px solid #767676; width:155px;cursor:pointer;" onclick="SurveyPopupWindow(1, \'' + url + '\')"/>';
    $popupContent += '</div></div></div>';
    var $popupData = $('<div class="wrapper_landing"/>').html($popupContent);
    $("body").prepend($popupData);
    $(".wrapper_landing").css({
        "position": "absolute",
        "top": windowHeight / 2 - 200,
        "left": windowWidth / 2 - 200,
        "z-index": "999999999"
    });

    $(".wrapper_landing").show();
}

function Notify(candidateId, notificationEventMasterId, notificationMappingId, countryId) {
    var dataString = '{notificationMasterId:' + notificationEventMasterId + ',notificationMappingId:' + notificationMappingId + ',countryID:' + countryId + ',candidateId:' + candidateId + '}';
    try {
        $.ajax({
            type: "POST",
            url: "../../../../FormsService.aspx/SendMail",
            data: dataString,
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) { },
            error: function (xhr) { }
        });
    }
    catch (e) {
    }

}


var BaseData = {}
var resetEmployerDS = {};

function EmployerDet() {
    this.CompanyName = '';
    this.EmployeeID = '';
    this.JobTitle = '';
    this.Address = '';
    this.City = '';
    this.State = '';
    this.Country = '';
    this.Postalcode = '';
    this.EmployersPhone = '';
    this.FromDate = '';
    this.ToDate = '';
    this.Fax = '';
    this.CurrentlyEmployed = '';
    this.DescriptionOfDuties = '';
    this.EmploymentStatus = '';
    this.ReasonForLeaving = '';
    this.OutsourcingAgencyName = '';
    this.OutsourcingAgencyAddress = '';
    this.OutsourcingAgencyPhoneNo = '';
    this.SupervisorDetailsName = '';
    this.SupervisorDetailsTitle = '';
    this.SupervisorDetailsPhoneNo = '';
    this.SupervisorDetailsEmailID = '';
    this.HRManagerDetailsName = '';
    this.HRManagerDetailsPhoneNo = '';
    this.HRManagerDetailsEmailID = '';
}


$().ready(function () {
    OBPager.GetEmployersDetails();
    OBPager.resetFlag = 1;
    var isbgvinitiated = OBPager.IsBgvInitiated;
    if (JSON.parse(OBPager.strFormDetails).EmployersData.IfBreaksinEmployers.Yes == 'true') {
        $('#reason_form').removeAttr('disabled');
    }
    else {
        $('#reason_form').attr('disabled', 'true');
    }

    //BaseData = JSON.parse(OBPager.strFormDetails);
    jQXB.addOnTemplateItemBoundhnd(function (dataSourceName, templateName, occurrency, dataItem, jQrytemplateItem) {
        switch (templateName) {
            case "EmployerTemplate": // filter only event databound from a specific template
                var delBtn = jQrytemplateItem.find('.deleteEmployer');
                var datePicker = jQrytemplateItem.find('.datePicker');
                var mandatoryspan = jQrytemplateItem.find('.span');
                var empfulltimeStatus = jQrytemplateItem.find('.empfulltimeStatus');
                var empcontractStatus = jQrytemplateItem.find('.empcontractStatus');
                var agencyDetails = jQrytemplateItem.find('.agencyDetails');
                var employerRecord = jQrytemplateItem.find('.employerRecord');
                var streetAddress = jQrytemplateItem.find('.streetAddress');
                var duties = jQrytemplateItem.find('.duties');
                var reasonleaving = jQrytemplateItem.find('.reasonleaving');
                var outsrcaddress = jQrytemplateItem.find('.outsrcaddress');
                var Ismigrated = TaskPrefillValues.PrefillValues.Set1.IsMigratedCandidate;
                var CompanyName = TaskPrefillValues.PrefillValues.Set1.ACECompanyName;
                // for migrated candidates(ACE)

                if (Ismigrated == 3 && occurrency == 1 && CompanyName != undefined) {
                    $(employerRecord).text('Employer Record ' + occurrency + '(' + CompanyName + ')');
                }
                else if (isbgvinitiated == 1 && occurrency == 1) {
                    $(employerRecord).text('Current Employer');
                }
                else {
                    $(employerRecord).text('Employer Record ' + occurrency);
                }
                $('#EmployersRow_0').hide();
                ChkmaxEmployersDependents(occurrency);

                // prevent events fires twice in case of re-binding
                if (occurrency == 1) {  // Hiding the delete button for first Employer record
                    delBtn.attr('style', 'display:none');
                }
                else {

                    delBtn.unbind();
                    delBtn.bind('click', function () {
                        DeleteEmployersRecord(occurrency);
                        alert('Employer Record  ' + occurrency + ' has been deleted');
                    });
                }
                empfulltimeStatus.unbind();
                empfulltimeStatus.bind('change', function () {
                    var chkfulltime = $('#empstatusfull' + occurrency);
                    var chkcontract = $('#empstatuscontract' + occurrency);
                    var outsrcnameObj = $('#OutsrcName' + occurrency);
                    var outsrcaddObj = $('#OutsrcAddress' + occurrency);
                    var outsrcphoneObj = $('#OutsrcPhone' + occurrency);
                    var mrkoutsrcnameObj = $('#mrkOutsrcName' + occurrency);
                    var mrkoutsrcaddObj = $('#mrkOutsrcAddress' + occurrency);
                    var mrkoutsrcphoneObj = $('#mrkOutsrcPhone' + occurrency);
                    var outsrcdetails = $('#outsrcdetails' + occurrency);
                    $(outsrcnameObj).attr('disabled', 'true').addClass('clsreadonly');
                    $(outsrcaddObj).attr('disabled', 'true').addClass('clsreadonly');
                    $(outsrcphoneObj).attr('disabled', 'true').addClass('clsreadonly');
                    $(mrkoutsrcnameObj).attr('visible', 'false');
                    $(mrkoutsrcaddObj).attr('visible', 'false');
                    $(mrkoutsrcphoneObj).attr('visible', 'false');
                    $(outsrcdetails).attr('visible', 'false');
                    jQXB.setmemberVarvalue('EmployersDetails', occurrency, 'EmployementFullTime', 'true', chkfulltime);
                    jQXB.setmemberVarvalue('EmployersDetails', occurrency, 'EmployementContract', '', chkcontract);
                    jQXB.doBind('EmployersDetails');
                });

                empcontractStatus.unbind();
                empcontractStatus.bind('change', function () {
                    var chkfulltime = $('#empstatusfull' + occurrency);
                    var chkcontract = $('#empstatuscontract' + occurrency);
                    var outsrcnameObj = $('#OutsrcName' + occurrency);
                    var outsrcaddObj = $('#OutsrcAddress' + occurrency);
                    var outsrcphoneObj = $('#OutsrcPhone' + occurrency);
                    $(outsrcnameObj).removeAttr('disabled').removeClass('clsreadonly');
                    $(outsrcaddObj).removeAttr('disabled').removeClass('clsreadonly');
                    $(outsrcphoneObj).removeAttr('disabled').removeClass('clsreadonly');

                    var mrkoutsrcnameObj = $('#mrkOutsrcName' + occurrency);
                    var mrkoutsrcaddObj = $('#mrkOutsrcAddress' + occurrency);
                    var mrkoutsrcphoneObj = $('#mrkOutsrcPhone' + occurrency);
                    var outsrcdetails = $('#outsrcdetails' + occurrency);
                    $(mrkoutsrcnameObj).attr('visible', 'true');
                    $(mrkoutsrcaddObj).attr('visible', 'true');
                    $(mrkoutsrcphoneObj).attr('visible', 'true');
                    $(outsrcdetails).attr('visible', 'true');
                    jQXB.setmemberVarvalue('EmployersDetails', occurrency, 'EmployementFullTime', '', chkfulltime);
                    jQXB.setmemberVarvalue('EmployersDetails', occurrency, 'EmployementContract', 'true', chkcontract);
                    jQXB.doBind('EmployersDetails');
                });

                streetAddress.unbind();
                streetAddress.bind('keydown', function () {
                    var field = $('#Address' + occurrency);
                    var max = 150;
                    if (field.val().length > max)
                        field.val(field.val().substring(0, max));

                });

                duties.unbind();
                duties.bind('keydown', function () {
                    var field = $('#Duties' + occurrency);
                    var max = 150;
                    if (field.val().length > max)
                        field.val(field.val().substring(0, max));

                });

                reasonleaving.unbind();
                reasonleaving.bind('keydown', function () {
                    var field = $('#ReasonforLeaving' + occurrency);
                    var max = 150;
                    if (field.val().length > max)
                        field.val(field.val().substring(0, max));

                });

                outsrcaddress.unbind();
                outsrcaddress.bind('keydown', function () {
                    var field = $('#OutsrcAddress' + occurrency);
                    var max = 150;
                    if (field.val().length > max)
                        field.val(field.val().substring(0, max));

                });

                $(function () {
                    $(datePicker).datepicker({ dateFormat: 'mm/dd/yy', yearRange: "-62:+0", maxDate: "0", buttonText: 'Open calendar', showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
                    });
                });
                break;
        }

        if (Ismigrated == 3) {
            $(".ismigrated").hide();

        }

        if (isbgvinitiated == 1) {
            $('.BgvSync').removeClass("datePicker").removeClass("jqrydatepicker");
            EmployeeStatusBgvsyn(occurrency);
        }

        //        var isbgvinitiated = OBPager.IsBgvInitiated


    });

    //Do a data bind finally
    jQXB.setDataSource('FormDetails', BaseData).doBind('FormDetails');
    jQXB.setDataSource('EmployersDetails', BaseData.EmployersData.EmployerDetails).doBind('EmployersDetails');
    if (OBPager.taskStatusFlag == -1) {
        // Set member value manually       
        OBPager.SetTaskContentMemberValue('EmployersData.IfBreaksinEmployers.No', 1, 'true', false);
        OBPager.SetTaskContentMemberValue('EmployersData.CurrentlyEmployed.Yes', 1, 'true', false);
        $('#chkn_form').attr('checked', 'checked');
        $('#reason_form').attr('disabled', 'true');
    }
    jQXB.doBind(OBPager.taskContentDSName);
    OBPager.SetTaskContentMemberValue('EmployersData.RelavantExperience', null, TaskPrefillValues.PrefillValues.Set1.RelevantExperience, true);
    OBPager.ShowPage(1);
    if (isbgvinitiated == 1) {
        $('.BgvSync').each(function () {
            var obj = $(this);
            if (obj.val() != '' && obj.val() != null) {
                var cntrlID = obj.attr('id');
                var lastChar = cntrlID.substr(cntrlID.length - 2);
                if (!$.isNumeric(lastChar)) {
                    lastChar = cntrlID.substr(cntrlID.length - 1);
                    cntrlID = cntrlID.slice(0, -1);
                }
                else {
                    cntrlID = cntrlID.slice(0, -2);
                }
                try {
                    if (lastChar != "1") {
                        $('#HRspan' + lastChar).hide();
                        $('#EmployeeIDspan' + lastChar).hide();
                        $('#EmployeeIDlbl' + lastChar).addClass("notMandatory");
                    }
                }
                catch (e) { }
//                cntrlID = cntrlID.slice(0, -1);
                $(this).remove();
                try { $('#' + cntrlID + '_bgvlbl' + lastChar).css('display', 'block'); } catch (e) { }
                try { $('#' + cntrlID + '_bgvlbl' + lastChar).html(obj.val().substring(0,24)); } catch (e) { }
                try { $('#' + cntrlID + '_bgvlbl' + lastChar).val(obj.val()); } catch (e) { }
                //                document.getElementById(cntrlID + '_bgvlbl' + lastChar).style.display = 'block';
                //                document.getElementById(cntrlID + '_bgvlbl' + lastChar).innerHTML = obj.val().substring(0, 24);
                //                document.getElementById(cntrlID + '_bgvlbl' + lastChar).value = obj.val();
                //                $(this).attr("disabled", "true");
            }
        });

        $('.BgvSyncHr').each(function () {
            var obj = $(this);
            if (obj.val() != '' && obj.val() != null) {
                var cntrlID = obj.attr('id');
                var lastChar = cntrlID.substr(cntrlID.length - 2);
                if (!$.isNumeric(lastChar)) {
                    lastChar = cntrlID.substr(cntrlID.length - 1);
                    cntrlID = cntrlID.slice(0, -1);
                }
                else {
                    cntrlID = cntrlID.slice(0, -2);
                }
//                cntrlID = cntrlID.slice(0, -1);
                $(this).remove();
                try { $('#' + cntrlID + '_bgvlbl' + lastChar).css('display', 'block'); } catch (e) { }
                try { $('#' + cntrlID + '_bgvlbl' + lastChar).html(obj.val().substring(0, 24)); } catch (e) { }
                try { $('#' + cntrlID + '_bgvlbl' + lastChar).val(obj.val()); } catch (e) { }
                //                    document.getElementById(cntrlID + '_bgvlbl' + lastChar).style.display = 'block';
                //                    document.getElementById(cntrlID + '_bgvlbl' + lastChar).innerHTML = obj.val().substring(0, 24);
                //                    document.getElementById(cntrlID + '_bgvlbl' + lastChar).value = obj.val();
                //                $(this).attr("disabled", "true");
            }
        });

        $('.BgvSyncStatic').each(function () {
            var obj = $(this);
            if (obj.val() != '' && obj.val() != null) {
                var cntrlID = obj.attr('id');
                $(this).remove();
                try { $('#' + cntrlID + '_bgvlbl').css('display', 'block'); } catch (e) { }
                try { $('#' + cntrlID + '_bgvlbl').html(obj.val().substring(0, 24)); } catch (e) { }
                try { $('#' + cntrlID + '_bgvlbl').val(obj.val()); } catch (e) { }
                //                document.getElementById(cntrlID + '_bgvlbl').style.display = 'block';
                //                document.getElementById(cntrlID + '_bgvlbl').innerHTML = obj.val().substring(0, 24);
                //                document.getElementById(cntrlID + '_bgvlbl').value = obj.val();
                //                $(this).attr("disabled", "true");

            }
        });


        $('.BgvSyncChkbx').attr('disabled', 'true');

        $('.BgvSyncBtn').hide();
    }
});


function DeleteEmployersRecord(index) {
    jQXB.deleteObjectFromDataSource('EmployersDetails', index);
}

function EmployeeStatusBgvsyn(index) {
    var chkfulltime = $('#empstatusfull' + index);
    var outsrcnameObj = $('#OutsrcName' + index);
    var outsrcaddObj = $('#OutsrcAddress' + index);
    var outsrcphoneObj = $('#OutsrcPhone' + index);
    var mrkoutsrcnameObj = $('#mrkOutsrcName' + index);
    var mrkoutsrcaddObj = $('#mrkOutsrcAddress' + index);
    var mrkoutsrcphoneObj = $('#mrkOutsrcPhone' + index);
    var outsrcdetails = $('#outsrcdetails' + index);
    var obj = JSON.parse(OBPager.strFormDetails).EmployersData.EmployerDetails[index].EmployementFullTime;
    if (obj == "true" || obj == "1") {
        $(outsrcnameObj).attr('disabled', 'true').addClass('clsreadonly');
        $(outsrcaddObj).attr('disabled', 'true').addClass('clsreadonly');
        $(outsrcphoneObj).attr('disabled', 'true').addClass('clsreadonly');
        $(mrkoutsrcnameObj).attr('visible', 'false');
        $(mrkoutsrcaddObj).attr('visible', 'false');
        $(mrkoutsrcphoneObj).attr('visible', 'false');
        $(outsrcdetails).attr('visible', 'false');

    }

}


function AddEmployerRecord() {
    var obj = new EmployerDet();
    jQXB.addObjectToDataSource('EmployersDetails', obj);
}


function ChkmaxEmployersDependents(occurrency) {
    var maxCount = TaskPrefillValues.PrefillValues.Set1.MaxEmployers;
    maxCount = maxCount - 1;
    if (occurrency > maxCount) {
        $('#btnAdddependents').attr('disabled', 'true');
    }
    else {
        $('#btnAdddependents').removeAttr('disabled');
    }
}

function SaveTaskData(saveMode) {
    if (saveMode == 1) {
        if (OBPager.ValidateTaskData(saveMode) == true) {
            try {
                if (OBPager.SaveTaskData(saveMode) == true) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (e) {
            }
        }
        else {
            MsgboxInfo(OBPager.ValidationMessage);
        }
    }
    else {
        try {
            if (OBPager.SaveTaskData(saveMode) == true) {
                return true;
            }
            else {
                alert('Error occured while saving the task');
                return false;
            }
        }
        catch (e) {
        }
    }
}

function ResetTaskData() {
    if (BaseData.EmployersData.EmployerDetails != 'undefined' && BaseData.EmployersData.EmployerDetails > 0) {
        var count = BaseData.EmployersData.EmployerDetails;
        var i = count - 1; /* Stop iteration from max to 2 as 1, 0 will be default empty items which should not be removed from data source */
        while (i >= 1) {
            DeleteEmployersRecord(i);
            i--;
        }
    }
    BaseData = JSON.parse(OBPager.strFormDetails);
    jQXB.setDataSource('FormDetails', BaseData).doBind('FormDetails');
    jQXB.setDataSource('EmployersDetails', BaseData.EmployersData.EmployerDetails).doBind('EmployersDetails');

    if (OBPager.taskStatusFlag == -1) {
        OBPager.SetTaskContentMemberValue('EmployersData.RelavantExperience', null, TaskPrefillValues.PrefillValues.Set1.RelevantExperience, false);
        OBPager.SetTaskContentMemberValue('EmployersData.IfBreaksinEmployers.No', 1, 'true', false);
        OBPager.SetTaskContentMemberValue('EmployersData.CurrentlyEmployed.Yes', 1, 'true', false);
        $('#chkn_form').attr('checked', 'checked');
        $('#reason_form').attr('disabled', 'true');
    }
}

function IsDisabled(flag) {
    if (flag == 1) {
        OBPager.SetTaskContentMemberValue('EmployersData.CurrentlyEmployed.Yes', 1, '1', false);
        OBPager.SetTaskContentMemberValue('EmployersData.CurrentlyEmployed.No', 1, '', false);
    }
    else {
        OBPager.SetTaskContentMemberValue('EmployersData.CurrentlyEmployed.No', 1, '1', false);
        OBPager.SetTaskContentMemberValue('EmployersData.CurrentlyEmployed.Yes', 1, '', false);
    }
}

function IsBreakEmployers(flag) {
    if (flag == 1) {
        OBPager.SetTaskContentMemberValue('EmployersData.IfBreaksinEmployers.Yes', 1, '1', false);
        OBPager.SetTaskContentMemberValue('EmployersData.IfBreaksinEmployers.No', 1, '', false);
        $('#reason_form').removeAttr('disabled');
    }
    else {
        OBPager.SetTaskContentMemberValue('EmployersData.IfBreaksinEmployers.No', 1, '1', false);
        OBPager.SetTaskContentMemberValue('EmployersData.IfBreaksinEmployers.Yes', 1, '', false);
        $('#reason_form').attr('disabled', 'true');
    }
}

function EmployerStatus(flag) {
    if (flag == 1) {
        OBPager.SetTaskContentMemberValue('EmployersData.EmployerDetails.EmployementFullTime', 1, '1', false);
        OBPager.SetTaskContentMemberValue('EmployersData.EmployerDetails.EmployementContract', 1, '', false);
    }
    else {
        OBPager.SetTaskContentMemberValue('EmployersData.EmployerDetails.EmployementContract', 1, '1', false);
        OBPager.SetTaskContentMemberValue('EmployersData.EmployerDetails.EmployementFullTime', 1, '', false);
    }
}

$('.bgvLabel').live("mouseover", function () {

    var a = $(this).attr('id');
    //    a = a.replace("_bgvlbl", "");

    var d = $('#' + a).val();


    $(this).attr('title', d);


});

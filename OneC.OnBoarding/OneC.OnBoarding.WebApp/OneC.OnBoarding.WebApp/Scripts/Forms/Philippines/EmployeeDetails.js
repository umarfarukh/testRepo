var BaseData = {}
var resetEmployerDS = {};

function EmployerDet() {
    this.CompanyName = '';
    this.JobTitle = '';
    this.Address = '';
    this.City = '';
    this.Province = '';
    this.Country = '';
    this.Postalcode = '';
    this.EmployersPhone = '';
    this.FromDate = '';
    this.ToDate = '';
    this.Fax = '';
    this.CurrentlyEmployed = '';
    this.DescriptionOfDuties = '';
    this.EmploymentStatus = '';
    this.Level = '';
    this.FinalBaseSalary = '';
    this.AnnualBonus = '';
    this.ReasonForLeaving = '';
    this.OutsourcingAgencyName = '';
    this.OutsourcingAgencyAddress = '';
    this.OutsourcingAgencyPhoneNo = '';
    this.SupervisorDetailsName = '';
    this.SupervisorDetailsTitle = '';
    this.SupervisorDetailsPhoneNo = '';
    this.SupervisorDetailsEmailID = '';
}


$().ready(function () {
    OBPager.GetEmployersDetails();
    OBPager.resetFlag = 1;
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
                var todatePicker = jQrytemplateItem.find('.todatePicker');
                var mandatoryspan = jQrytemplateItem.find('.span');
                var empfulltimeStatus = jQrytemplateItem.find('.empfulltimeStatus');
                var empparttimeStatus = jQrytemplateItem.find('.empparttimeStatus');
                var empcontractStatus = jQrytemplateItem.find('.empcontractStatus');
                var agencyDetails = jQrytemplateItem.find('.agencyDetails');
                var employerRecord = jQrytemplateItem.find('.employerRecord');
                var streetAddress = jQrytemplateItem.find('.streetAddress');
                var duties = jQrytemplateItem.find('.duties');
                var reasonleaving = jQrytemplateItem.find('.reasonleaving');
                var outsrcaddress = jQrytemplateItem.find('.outsrcaddress');
                var Ismigrated = TaskPrefillValues.PrefillValues.Set1.IsMigratedCandidate;
                // for migrated candidates(ACE)
                if (Ismigrated == 3 && occurrency == 1) {
                    $(employerRecord).text('Employer Record ' + occurrency + ' (Affiliated Computer Services of India/ Pvt Ltd)');
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
                    var chkparttime = $('#empstatuspart' + occurrency);
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
                    // $(outsrcnameObj).parent('li').find('span').hide();
                    $(mrkoutsrcnameObj).css('display', 'none');
                    $(mrkoutsrcaddObj).css('display', 'none');
                    $(mrkoutsrcphoneObj).css('display', 'none');
                    $('#OutsrcNamelbl' + occurrency).addClass("notMandatory");
                    $('#OutsrcAddresslbl' + occurrency).addClass("notMandatory");
                    $('#OutsrcPhonelbl' + occurrency).addClass("notMandatory");
                    $(outsrcdetails).attr('visible', 'false');
                    jQXB.setmemberVarvalue('EmployersDetails', occurrency, 'EmployementFullTime', 'true', chkfulltime);
                    jQXB.setmemberVarvalue('EmployersDetails', occurrency, 'EmployementPartTime', '', chkparttime);
                    jQXB.setmemberVarvalue('EmployersDetails', occurrency, 'EmployementContract', '', chkcontract);
                    jQXB.setmemberVarvalue('EmployersDetails', occurrency, 'OutsourcingAgencyName', '', outsrcnameObj);
                    jQXB.setmemberVarvalue('EmployersDetails', occurrency, 'OutsourcingAgencyAddress', '', outsrcaddObj);
                    jQXB.setmemberVarvalue('EmployersDetails', occurrency, 'OutsourcingAgencyPhoneNo', '', outsrcphoneObj);
                    jQXB.doBind('EmployersDetails');
                });

                empparttimeStatus.unbind();
                empparttimeStatus.bind('change', function () {
                    var chkfulltime = $('#empstatusfull' + occurrency);
                    var chkparttime = $('#empstatuspart' + occurrency);
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
                    $(mrkoutsrcnameObj).css('display', 'none');
                    $(mrkoutsrcaddObj).css('display', 'none');
                    $(mrkoutsrcphoneObj).css('display', 'none');
                    $('#OutsrcNamelbl' + occurrency).addClass("notMandatory");
                    $('#OutsrcAddresslbl' + occurrency).addClass("notMandatory");
                    $('#OutsrcPhonelbl' + occurrency).addClass("notMandatory");
                    $(outsrcdetails).attr('visible', 'false');
                    jQXB.setmemberVarvalue('EmployersDetails', occurrency, 'EmployementFullTime', '', chkfulltime);
                    jQXB.setmemberVarvalue('EmployersDetails', occurrency, 'EmployementPartTime', 'true', chkparttime);
                    jQXB.setmemberVarvalue('EmployersDetails', occurrency, 'EmployementContract', '', chkcontract);
                    jQXB.setmemberVarvalue('EmployersDetails', occurrency, 'OutsourcingAgencyName', '', outsrcnameObj);
                    jQXB.setmemberVarvalue('EmployersDetails', occurrency, 'OutsourcingAgencyAddress', '', outsrcaddObj);
                    jQXB.setmemberVarvalue('EmployersDetails', occurrency, 'OutsourcingAgencyPhoneNo', '', outsrcphoneObj);

                    jQXB.doBind('EmployersDetails');
                });

                empcontractStatus.unbind();
                empcontractStatus.bind('change', function () {
                    var chkfulltime = $('#empstatusfull' + occurrency);
                    var chkparttime = $('#empstatuspart' + occurrency);
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
                    $('#OutsrcNamelbl' + occurrency).removeClass("notMandatory");
                    $('#OutsrcAddresslbl' + occurrency).removeClass("notMandatory");
                    $('#OutsrcPhonelbl' + occurrency).removeClass("notMandatory");
                    $(mrkoutsrcnameObj).show();
                    $(mrkoutsrcaddObj).show();
                    $(mrkoutsrcphoneObj).show();
                    jQXB.setmemberVarvalue('EmployersDetails', occurrency, 'EmployementFullTime', '', chkfulltime);
                    jQXB.setmemberVarvalue('EmployersDetails', occurrency, 'EmployementPartTime', '', chkparttime);
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
                    $(todatePicker).datepicker({ dateFormat: 'mm/dd/yy', yearRange: "-62:+0", maxDate: "+30", buttonText: 'Open calendar', showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
                    });
                });
                break;
        }

        if (Ismigrated == 3) {
            $(".ismigrated").hide();

        }

        
    });

    //Do a data bind finally
    jQXB.setDataSource('FormDetails', BaseData).doBind('FormDetails');
    jQXB.setDataSource('EmployersDetails', BaseData.EmployersData.EmployerDetails).doBind('EmployersDetails');
    if (OBPager.taskStatusFlag == -1) {
        // Set member value manually       
        OBPager.SetTaskContentMemberValue('EmployersData.IfBreaksinEmployers.No', 1, 'true', false);
        OBPager.SetTaskContentMemberValue('EmployersData.CurrentlyEmployed.Yes', 1, 'true', false);
        OBPager.SetTaskContentMemberValue('EmployersData.Awareofcursalary.Yes', 1, 'true', false);
        $('#chkn_form').attr('checked', 'checked');
        $('#reason_form').attr('disabled', 'true');
    }
    jQXB.doBind(OBPager.taskContentDSName);
    //    OBPager.SetTaskContentMemberValue('EmployersData.RelavantExperience', null, TaskPrefillValues.PrefillValues.Set1.RelevantExperience, true);
    OBPager.ShowPage(1);
});


function DeleteEmployersRecord(index) {
    jQXB.deleteObjectFromDataSource('EmployersDetails', index);
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
    OBPager.ResetTaskContent();
    
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
        //        OBPager.SetTaskContentMemberValue('EmployersData.RelavantExperience', null, TaskPrefillValues.PrefillValues.Set1.RelevantExperience, false);
        OBPager.SetTaskContentMemberValue('EmployersData.IfBreaksinEmployers.No', 1, 'true', false);
        OBPager.SetTaskContentMemberValue('EmployersData.CurrentlyEmployed.Yes', 1, 'true', false);
        $('#chkn_form').attr('checked', 'checked');
        $('#reason_form').attr('disabled', 'true');
    }
    jQXB.doBind(OBPager.taskContentDSName); 
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

function Areyouawareofcursal(flag) {
    if (flag == 1) {
        OBPager.SetTaskContentMemberValue('EmployersData.Awareofcursalary.Yes', 1, '1', false);
        OBPager.SetTaskContentMemberValue('EmployersData.Awareofcursalary.No', 1, '', false);
    }
    else {
        OBPager.SetTaskContentMemberValue('EmployersData.Awareofcursalary.No', 1, '1', false);
        OBPager.SetTaskContentMemberValue('EmployersData.Awareofcursalary.Yes', 1, '', false);
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
        OBPager.SetTaskContentMemberValue('EmployersData.ReasonForBreak', null, '', false);
    }
}

function EmployerStatus(flag) {
    if (flag == 1) {
        OBPager.SetTaskContentMemberValue('EmployersData.EmployerDetails.EmployementFullTime', 1, '1', false);
        OBPager.SetTaskContentMemberValue('EmployersData.EmployerDetails.EmployementPartTime', 1, '', false);
        OBPager.SetTaskContentMemberValue('EmployersData.EmployerDetails.EmployementContract', 1, '', false);
    }
    else {
        OBPager.SetTaskContentMemberValue('EmployersData.EmployerDetails.EmployementContract', 1, '1', false);
        OBPager.SetTaskContentMemberValue('EmployersData.EmployerDetails.EmployementPartTime', 1, '', false);
        OBPager.SetTaskContentMemberValue('EmployersData.EmployerDetails.EmployementFullTime', 1, '', false);
    }
}


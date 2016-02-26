var BaseData = {}
var resetEmployerDS = {};

function MedicalCoverdet() {
    this.Name = '';
    this.Relationship = '';
    this.DOB = '';
    this.Gender = '';
    this.EmailID = '';
    this.Address = '';
    this.AddressSameasEmployee = '';
    this.City = '';
    this.State = '';
    this.Country = '';
    this.Pincode = '';
    this.Phone = '';
    this.Mobile = '';
}

$().ready(function () {

    OBPager.GetMaster(14, "GenderList");
    OBPager.GetGeographyMaster(12, 1, "BaseCoverRelationshipList");
    // OBPager.GetGeographyMaster(12, 2, "TopupCoverRelationshipList");
    OBPager.GetGeographyMaster(1, 0, "CountryList");
    // OBPager.GetMedicalTopupCoverage("TopupCoverageList");

    OBPager.resetFlag = 0;
    OBPager.GetEmployersDetails();

    jQXB.addOnTemplateItemBoundhnd(function (dataSourceName, templateName, occurrency, dataItem, jQrytemplateItem) {
        switch (templateName) {
            case "BaseCoverDependentsTemplate": // filter only event databound from a specific template
                var delBtn = jQrytemplateItem.find('.deleteBaseCoverageDependents');
                var chkAddress = jQrytemplateItem.find('.chkAddress');
                var Address = jQrytemplateItem.find('.clsAddress');
                var Country = jQrytemplateItem.find('.countryobj');
                var State = jQrytemplateItem.find('.stateobj');
                var City = jQrytemplateItem.find('.cityObj');
                var Pincode = jQrytemplateItem.find('.pincodeObj');
                var HPhone = jQrytemplateItem.find('.phoneObj');
                var Mobile = jQrytemplateItem.find('.mobileObj');
                var datePicker = jQrytemplateItem.find('.jqrydatepicker');
                var dependentCount = occurrency - 1;
                $('#BaseCoverDependentsRow_0').hide();
                $('#BaseCoverDependentsRow_1').hide();
                ChkBaseCoverDependents(occurrency);
                // prevent events fires twice in case of re-binding
                delBtn.unbind();
                delBtn.bind('click', function () {
                    DeleteBaseCoverDependent(occurrency);
                    alert('Base cover dependent Record ' + dependentCount + ' has been deleted');
                });

                jQXB.getValueFromAttrib = function (chkAddress) {
                    var result = "";
                    var attrib = chkAddress.attr(jQXB.JQXB_BINDEDATTRIBUTE_ATTR);
                    if (attrib != undefined) {
                        if (attrib === "checked") {
                            if (chkAddress.is(':checked')) {
                                result = true;
                            } else {
                                result = "";
                            }
                        } else {
                            result = chkAddress.attr(attrib);
                        }
                    } else {
                        result = chkAddress.val();
                    }
                    return result;
                }

                var DynDS = jQrytemplateItem.find('.onchangecountry');
                DynDS.unbind();
                DynDS.bind('change', function () {
                    bindState(jQuery(this));
                    //   jQXB.doBind('BaseCoverDependents');
                });

                           function bindState(obj) {
                                    var GUID = G(); +G();
                                    var childDSName = obj.attr('jqxb-dynamicChildDataSourceCountry') + '_' + GUID;
                                    var Child = jQrytemplateItem.find('.child');
                                    var ChildDs = Child.attr('jqxb-dynamicChildDataSourceCountry');
                                    Child.removeAttr('jqxb-listsource').attr('jqxb-listsource', ChildDs + '_' + GUID);
                                    OBPager.GetGeographyMaster(2, obj.val(), childDSName);
                                    Child.removeAttr('disabled');
                                }
                
                chkAddress.unbind();
                chkAddress.bind('change', function () {
                    var chkAddressobj = $('#chkAddress' + occurrency);
                    var addressObj = $('#Address' + occurrency);
                    var CountryObj = $('#Country' + occurrency);
                    var StateObj = $('#State' + occurrency);
                    var PincodeObj = $('#Pincode' + occurrency);
                    var MobileObj = $('#Mobile' + occurrency);
                    var CityObj = $('#City' + occurrency);
                    var HPhoneObj = $('#Phone' + occurrency);

                    var empAddress = TaskPrefillValues.PrefillValues.Set1.AddressDetails;
                    var empcountry = TaskPrefillValues.PrefillValues.Set1.CountryId;
                    var empState = TaskPrefillValues.PrefillValues.Set1.State;
                    var empCity = TaskPrefillValues.PrefillValues.Set1.City;
                    var empPincode = TaskPrefillValues.PrefillValues.Set1.Pincode;
                    var empHPhone = TaskPrefillValues.PrefillValues.Set1.Hphone;
                    var empMobile = TaskPrefillValues.PrefillValues.Set1.Mobile;



                    if ($(chkAddress).is(':checked')) {
                        jQXB.setmemberVarvalue('BaseCoverDependents', occurrency, 'IsAddressSameasEmployee', 'true', chkAddressobj);
                        // $(Address).val(empAddress);
                        $(CountryObj).val(empcountry);
                        jQXB.setmemberVarvalue('BaseCoverDependents', occurrency, 'Address', empAddress, addressObj);
                        jQXB.setmemberVarvalue('BaseCoverDependents', occurrency, 'Country', empcountry, CountryObj);
                        bindState(CountryObj);

                        jQXB.setmemberVarvalue('BaseCoverDependents', occurrency, 'State', empState, StateObj);
                        jQXB.setmemberVarvalue('BaseCoverDependents', occurrency, 'City', empCity, CityObj);
                        jQXB.setmemberVarvalue('BaseCoverDependents', occurrency, 'Pincode', empPincode, PincodeObj);
                        jQXB.setmemberVarvalue('BaseCoverDependents', occurrency, 'Mobile', empMobile, MobileObj);
                        jQXB.setmemberVarvalue('BaseCoverDependents', occurrency, 'Phone', empHPhone, HPhoneObj);
                        jQXB.doBind('BaseCoverDependents');
                    }
                    else {
                        $(Address).val("");
                        $(CountryObj).val('-1');
                        $(StateObj).empty();
                        $(CityObj).val('');
                        $(PincodeObj).val('');
                        $(MobileObj).val('');
                        $(HPhoneObj).val('');
                        jQXB.setmemberVarvalue('BaseCoverDependents', occurrency, 'Address', '', addressObj);
                        jQXB.setmemberVarvalue('BaseCoverDependents', occurrency, 'Country', '-1', CountryObj);
                        jQXB.setmemberVarvalue('BaseCoverDependents', occurrency, 'City', '', CityObj);
                        jQXB.setmemberVarvalue('BaseCoverDependents', occurrency, 'Pincode', '', PincodeObj);
                        jQXB.setmemberVarvalue('BaseCoverDependents', occurrency, 'Mobile', '', MobileObj);
                        jQXB.setmemberVarvalue('BaseCoverDependents', occurrency, 'Phone', '', HPhoneObj);
                    }
                });

                //To Initialize Validation 
                $('.textMandatory').change(validate.textMandatory);
                $('.textMandatoryDynamic').change(validate.textMandatoryDynamic);
                $('.Alphanumeric').change(validate.textAlphanumeric);
                $('.dropdown').change(validate.dropdown);
                $('.dob').change(validate.birthDate);

                Address.unbind();
                Address.bind('keydown', function () {
                    var field = $('#Address' + occurrency);
                    var max = 150;
                    if (field.val().length > max)
                        field.val(field.val().substring(0, max));
                });

                $(function () {
                    $(datePicker).datepicker({ dateFormat: 'mm/dd/yy', yearRange: "-150:+0", maxDate: "0", buttonText: 'Open calendar', showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
                    });
                });
                break;
        }
    });


    function ChkBaseCoverDependents(occurrency) {
        var MaxBaseCoverDependent = TaskPrefillValues.PrefillValues.Set1.MaxBaseDependent;
        if (occurrency > MaxBaseCoverDependent) {
            $('#btnAdddependents').attr('disabled', 'true');
        }
        else {
            $('#btnAdddependents').removeAttr('disabled');
        }
    }

    //    function ChkTopupCoverDependent(occurrency) {
    //        var MaxTopupCoverDependent = TaskPrefillValues.PrefillValues.Set1.MaxTopupDependent;
    //        MaxTopupCoverDependent = MaxTopupCoverDependent - 1;
    //        if (occurrency > MaxTopupCoverDependent) {
    //            $('#btntopupcoverDependent').attr('disabled', 'true');
    //        }
    //        else {
    //            $('#btntopupcoverDependent').removeAttr('disabled');
    //        }
    //    }

    //    jQXB.addOnTemplateItemBoundhnd(function (dataSourceName, templateName, occurrency, dataItem, jQrytemplateItem) {
    //        switch (templateName) {
    //            case "TopupCoverDependentsTemplate": // filter only event databound from a specific template
    //                var delBtn = jQrytemplateItem.find('.deleteTopupCoverageDependents');
    //                var chktopAddress = jQrytemplateItem.find('.chkTopAddress');
    //                var Address = jQrytemplateItem.find('.topupAddress');
    //                var Country = jQrytemplateItem.find('.topupcountry');
    //                var State = jQrytemplateItem.find('.topupstate');
    //                var City = jQrytemplateItem.find('.topupcity');
    //                var Pincode = jQrytemplateItem.find('.topuppincode');
    //                var HPhone = jQrytemplateItem.find('.topupphone');
    //                var Mobile = jQrytemplateItem.find('.topupmobile');
    //                var datePicker = jQrytemplateItem.find('.jqrytoup');
    //                var dependentCount = occurrency - 1;
    //                $('#TopupCoverDependentsRow_0').hide();
    //                $('#TopupCoverDependentsRow_1').hide();
    //                ChkTopupCoverDependent(dependentCount);
    //                // prevent events fires twice in case of re-binding
    //                delBtn.unbind();
    //                delBtn.bind('click', function () {
    //                    DeleteTopupCoverDependent(occurrency);
    //                    alert('Top-up cover dependent Record ' + dependentCount + ' has been deleted');
    //                });

    //                var DyntopupDS = jQrytemplateItem.find('.onchangetopupcountry');
    //                DyntopupDS.unbind();
    //                DyntopupDS.bind('change', function () {
    //                    bindtopupState(jQuery(this));
    //                    //   jQXB.doBind('TopupCoverDependents');
    //                });

    //                function bindtopupState(obj) {
    //                    var GUID = G() + G();
    //                    var childDSName = obj.attr('jqxb-dynamicchilddatasourcetopupcountry') + '_' + GUID;
    //                    var Child = jQrytemplateItem.find('.topupchild');
    //                    var ChildDs = Child.attr('jqxb-dynamicchilddatasourcetopupcountry');
    //                    Child.removeAttr('jqxb-listsource').attr('jqxb-listsource', ChildDs + '_' + GUID);
    //                    OBPager.GetGeographyMaster(2, obj.val(), childDSName);
    //                    Child.removeAttr('disabled');
    //                }

    //                jQXB.getValueFromAttrib = function (chktopAddress) {
    //                    var result = "";
    //                    var attrib = chktopAddress.attr(jQXB.JQXB_BINDEDATTRIBUTE_ATTR);
    //                    if (attrib != undefined) {
    //                        if (attrib === "checked") {
    //                            if (chktopAddress.is(':checked')) {
    //                                result = true;
    //                            } else {
    //                                result = "";
    //                            }
    //                        } else {
    //                            result = chktopAddress.attr(attrib);
    //                        }
    //                    } else {
    //                        result = chktopAddress.val();
    //                    }
    //                    return result;
    //                }

    //                chktopAddress.unbind();
    //                chktopAddress.bind('change', function () {
    //                    var chktopupAddressObj = $('#chktopupAddress' + occurrency);
    //                    var addressObj = $('#topupAddress' + occurrency);
    //                    var CountryObj = $('#topupCountry' + occurrency);
    //                    var StateObj = $('#topupState' + occurrency);
    //                    var PincodeObj = $('#topupPincode' + occurrency);
    //                    var MobileObj = $('#topupMobile' + occurrency);
    //                    var CityObj = $('#topupCity' + occurrency);
    //                    var HPhoneObj = $('#topupPhone' + occurrency);

    //                    var empAddress = TaskPrefillValues.PrefillValues.Set1.AddressDetails;
    //                    var empcountry = TaskPrefillValues.PrefillValues.Set1.CountryId;
    //                    var empState = TaskPrefillValues.PrefillValues.Set1.State;
    //                    var empCity = TaskPrefillValues.PrefillValues.Set1.City;
    //                    var empPincode = TaskPrefillValues.PrefillValues.Set1.Pincode;
    //                    var empHPhone = TaskPrefillValues.PrefillValues.Set1.Hphone;
    //                    var empMobile = TaskPrefillValues.PrefillValues.Set1.Mobile;

    //                    if ($(chktopAddress).is(':checked')) {
    //                        jQXB.setmemberVarvalue('TopupCoverDependents', occurrency, 'IsAddressSameasEmployee', 'true', chktopupAddressObj);
    //                        jQXB.setmemberVarvalue('TopupCoverDependents', occurrency, 'Country', empcountry, CountryObj);
    //                        jQXB.setmemberVarvalue('TopupCoverDependents', occurrency, 'Address', empAddress, addressObj);
    //                        $(Address).val(empAddress);
    //                        $(CountryObj).val(empcountry);
    //                        bindtopupState(CountryObj);
    //                        $(CityObj).val(empCity);
    //                        $(PincodeObj).val(empPincode);
    //                        $(MobileObj).val(empMobile);
    //                        $(HPhoneObj).val(empHPhone);
    //                        jQXB.setmemberVarvalue('TopupCoverDependents', occurrency, 'State', empState, StateObj);
    //                        jQXB.setmemberVarvalue('TopupCoverDependents', occurrency, 'City', empCity, CityObj);
    //                        jQXB.setmemberVarvalue('TopupCoverDependents', occurrency, 'Pincode', empPincode, PincodeObj);
    //                        jQXB.setmemberVarvalue('TopupCoverDependents', occurrency, 'Mobile', empMobile, MobileObj);
    //                        jQXB.setmemberVarvalue('TopupCoverDependents', occurrency, 'Phone', empHPhone, HPhoneObj);
    //                        jQXB.doBind('TopupCoverDependents');
    //                    }
    //                    else {
    //                        $(Address).val("");
    //                        $(CountryObj).val('-1');
    //                        $(StateObj).empty();
    //                        $(CityObj).val('');
    //                        $(PincodeObj).val('');
    //                        $(MobileObj).val('');
    //                        $(HPhoneObj).val('');
    //                        $(Address).attr('readonly', false);
    //                        jQXB.setmemberVarvalue('TopupCoverDependents', occurrency, 'Address', '', addressObj);
    //                        jQXB.setmemberVarvalue('TopupCoverDependents', occurrency, 'Country', '-1', CountryObj);
    //                        //jQXB.setmemberVarvalue('BaseCoverDependents', occurrency, 'State', '-1', StateObj);
    //                        jQXB.setmemberVarvalue('TopupCoverDependents', occurrency, 'City', '', CityObj);
    //                        jQXB.setmemberVarvalue('TopupCoverDependents', occurrency, 'Pincode', '', PincodeObj);
    //                        jQXB.setmemberVarvalue('TopupCoverDependents', occurrency, 'Mobile', '', MobileObj);
    //                        jQXB.setmemberVarvalue('TopupCoverDependents', occurrency, 'Phone', '', HPhoneObj);
    //                    }
    //                });

    //                Address.unbind();
    //                Address.bind('keydown', function () {
    //                    var field = $('#topupAddress' + occurrency);
    //                    var max = 150;
    //                    if (field.val().length > max)
    //                        field.val(field.val().substring(0, max));
    //                });
    //                $(function () {
    //                    $(datePicker).datepicker({ dateFormat: 'mm/dd/yy', yearRange: "-75:+0", maxDate: "0", buttonText: 'Open calendar', showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    //                    });
    //                });
    //                break;
    //        }
    // });

    //Do a data bind finally
    jQXB.setDataSource('FormDetails', BaseData).doBind('FormDetails');
    // jQXB.setDataSource(OBPager.taskContentDSName, BaseData).doBind(OBPager.taskContentDSName);
    jQXB.setDataSource('BaseCoverDependents', BaseData.MedicalInsuranceForm.BaseCoverDependents).doBind('BaseCoverDependents');
    //jQXB.setDataSource('TopupCoverDependents', BaseData.MedicalInsuranceForm.TopupCoverDetails).doBind('TopupCoverDependents');
    //Prefill the values at the first time when task not even saved 
    //    if (OBPager.taskStatusFlag == -1) {
    // Set member value manually
    OBPager.SetTaskContentMemberValue('MedicalInsuranceForm.CandidateId', null, TaskPrefillValues.PrefillValues.Set1.CandidateId, false);
    OBPager.SetTaskContentMemberValue('MedicalInsuranceForm.Name', null, TaskPrefillValues.PrefillValues.Set1.Name, false);
    OBPager.SetTaskContentMemberValue('MedicalInsuranceForm.Gender', null, TaskPrefillValues.PrefillValues.Set1.Gender, false);
    OBPager.SetTaskContentMemberValue('MedicalInsuranceForm.DOB', null, TaskPrefillValues.PrefillValues.Set1.DOB, false);
    OBPager.SetTaskContentMemberValue('MedicalInsuranceForm.DOJ', null, TaskPrefillValues.PrefillValues.Set1.DOJ, false);
    OBPager.SetTaskContentMemberValue('MedicalInsuranceForm.EmailId', null, TaskPrefillValues.PrefillValues.Set1.EmailId, false);
    OBPager.SetTaskContentMemberValue('MedicalInsuranceForm.EntitledBaseCoverage', null, TaskPrefillValues.PrefillValues.Set2.BaseCoverDescr, false);

    //    }

    //var maxTopup = TaskPrefillValues.PrefillValues.Set3.MaxTopup;
    var BasecovePolicyPeriod = TaskPrefillValues.PrefillValues.Set1.BasecovePolicyPeriod;
    //var TopupPolicyPeriod = TaskPrefillValues.PrefillValues.Set1.TopupPolicyPeriod;
    $('#TopupPolicy_Period').text(BasecovePolicyPeriod);
    // $('#topupamt').text(maxTopup);
    jQXB.doBind(OBPager.taskContentDSName);
});

$().ready(function () {
    var cntrl = 0;
    $(BaseData.MedicalInsuranceForm.BaseCoverDependents).each(function () {
        var country = BaseData.MedicalInsuranceForm.BaseCoverDependents[cntrl].Country;
        var state = BaseData.MedicalInsuranceForm.BaseCoverDependents[cntrl].State;
        var cnt = 0;
        if (cntrl > 1) {
            $('.stateobj').each(function () {
                var stateobj = $(this);
                var ChildDs = stateobj.attr('jqxb-dynamicChildDataSourceCountry');
                if (cntrl == cnt - 1 && country != null) {
                    var dynDS = ChildDs + G() + G();
                    stateobj.removeAttr('jqxb-listsource').attr('jqxb-listsource', dynDS);
                    OBPager.GetGeographyMaster(2, country, dynDS);
                    stateobj.removeAttr('disabled');
                }
                cnt = cnt + 1;
            });
        }
        cntrl = cntrl + 1;
    });

    jQXB.doBind('BaseCoverDependents');

//    var topcntrl = 0;
//    $(BaseData.MedicalInsuranceForm.TopupCoverDetails).each(function () {
//        var country = BaseData.MedicalInsuranceForm.TopupCoverDetails[topcntrl].Country;
//        var state = BaseData.MedicalInsuranceForm.TopupCoverDetails[topcntrl].State;
//        var topupcnt = 0;
//        if (topcntrl > 1) {
//            $('.topupstate').each(function () {
//                var stateobj = $(this);
//                var ChildDs = stateobj.attr('jqxb-dynamicchilddatasourcetopupcountry');
//                if (topcntrl == topupcnt - 1 && country != null) {
//                    var dynDS = ChildDs + G() + G();
//                    stateobj.removeAttr('jqxb-listsource').attr('jqxb-listsource', dynDS);
//                    OBPager.GetGeographyMaster(2, country, dynDS);
//                    stateobj.removeAttr('disabled');
//                }
//                topupcnt = topupcnt + 1;
//            });
//        }
//        topcntrl = topcntrl + 1;
//    });
    //jQXB.doBind('TopupCoverDependents');
});

function DeleteBaseCoverDependent(index) {
    jQXB.deleteObjectFromDataSource('BaseCoverDependents', index);
}

function AddBaseCoverDependent() {
    var obj = new MedicalCoverdet();
    jQXB.addObjectToDataSource('BaseCoverDependents', obj);
}

//function DeleteTopupCoverDependent(index) {
//    jQXB.deleteObjectFromDataSource('TopupCoverDependents', index);
//}

//function AddTopupCoverDependent() {
//    var obj = new MedicalCoverdet();
//    jQXB.addObjectToDataSource('TopupCoverDependents', obj);
//}

function G() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}

function SaveTaskData(saveMode) {
    if (saveMode == 1) {
        if (OBPager.ValidateTaskData(saveMode) == true)
         {
             try 
            {
                if (OBPager.SaveTaskData(saveMode) == true)
                {
                return true;
                }
                else 
                {
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
    //PrePopulateValues();
    if (OBPager.taskStatusFlag == -1) {
    }

    if (BaseData.MedicalInsuranceForm.BaseCoverDependents != 'undefined' && BaseData.MedicalInsuranceForm.BaseCoverDependents.length > 0) {
        var count = BaseData.MedicalInsuranceForm.BaseCoverDependents.length;
        var i = count - 1; /* Stop iteration from max to 2 as 1, 0 will be default empty items which should not be removed from data source */
        while (i >= 2) {
            DeleteBaseCoverDependent(i);
            i--;
        }
    }

//    if (BaseData.MedicalInsuranceForm.TopupCoverDetails != 'undefined' && BaseData.MedicalInsuranceForm.TopupCoverDetails.length > 0) {
//        var count = BaseData.MedicalInsuranceForm.TopupCoverDetails.length;
//        var i = count - 1; /* Stop iteration from max to 2 as 1, 0 will be default empty items which should not be removed from data source */
//        while (i >= 2) {
//            DeleteTopupCoverDependent(i);
//            i--;
//        }
//    }

    BaseData = JSON.parse(OBPager.strFormDetails);
    jQXB.setDataSource('FormDetails', BaseData).doBind('FormDetails');
    jQXB.setDataSource('BaseCoverDependents', BaseData.MedicalInsuranceForm.BaseCoverDependents).doBind('BaseCoverDependents');
    //jQXB.setDataSource('TopupCoverDependents', BaseData.MedicalInsuranceForm.TopupCoverDetails).doBind('TopupCoverDependents');

    //if (OBPager.taskStatusFlag == -1) {
    // Set member value manually
    OBPager.SetTaskContentMemberValue('MedicalInsuranceForm.CandidateId', null, TaskPrefillValues.PrefillValues.Set1.CandidateId, false);
    OBPager.SetTaskContentMemberValue('MedicalInsuranceForm.Name', null, TaskPrefillValues.PrefillValues.Set1.Name, false);
    OBPager.SetTaskContentMemberValue('MedicalInsuranceForm.Gender', null, TaskPrefillValues.PrefillValues.Set1.Gender, false);
    OBPager.SetTaskContentMemberValue('MedicalInsuranceForm.DOB', null, TaskPrefillValues.PrefillValues.Set1.DOB, false);
    OBPager.SetTaskContentMemberValue('MedicalInsuranceForm.DOJ', null, TaskPrefillValues.PrefillValues.Set1.DOJ, false);
    OBPager.SetTaskContentMemberValue('MedicalInsuranceForm.EmailId', null, TaskPrefillValues.PrefillValues.Set1.EmailId, false);
    OBPager.SetTaskContentMemberValue('MedicalInsuranceForm.EntitledBaseCoverage', null, TaskPrefillValues.PrefillValues.Set2.BaseCoverDescr, false);
    jQXB.doBind(OBPager.taskContentDSName);
    // }
}

$(function () {
    $('.domdate').datepicker({ dateFormat: 'mm/dd/yy', yearRange: "1940:+0", maxDate: "0", buttonText: 'Open calendar', showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    });
});

var BaseData = {};
var resetEmployerDS = {};

function EmployerDet() {
    this.FormatType = '';
    this.FirstName = '';
    this.MiddleName = '';
    this.LastName = '';
    this.Prefix = '';
    this.AddressType = '';
    this.Address = '';
    this.DateofBirth = '';
    this.Occupation = '';
    this.Relationship = '';
    this.DependentType = '';
    this.MaritalStatus = '';
    this.Sex = '';
    this.ChkAddress = '';
    this.ChkPhone = '';
    this.Suffix = '';
    this.City = '';
    this.State = '';
    this.Country = '';
    this.ZipCode = '';
    this.PhoneType = '';
    this.Phone = '';
    this.BirthLocation = '';
    this.BirthCountry = '';
    this.BirthState = '';
    this.MaritalStatusDt = '';


}

$().ready(function () {
    jQXB.initialize();
    jQXB.compatibilitymode = false;
    OBPager.ShowPage(1);

    var obj = new EmployerDet();

    // Set member value manually
    OBPager.GetEmployersDetails();
    OBPager.GetMaster(20, "PrefixList");
    OBPager.GetMaster(102, "SuffixList");
    OBPager.GetMaster(13, "RelationList");
    OBPager.GetMaster(14, "GenderList");
    OBPager.GetMaster(15, "MaritalStatusList");
    //    OBPager.GetMaster(49, "DependentList");
    OBPager.GetMaster(50, "AddressList");
    OBPager.GetGeographyMaster(1, 0, "CountryList");
    OBPager.GetGeographyMaster(1, 0, "BirthCountryList");
    OBPager.GetMaster(110, "PhoneTypeList");



    // Attach template Event Handling, it should be declared before binding 
    jQXB.addOnTemplateItemBoundhnd(function (dataSourceName, templateName, occurrency, dataItem, jQrytemplateItem) {
        switch (templateName) {
            case "DependentTemplate": // filter only event databound from a specifica template
                var jQryElem = jQrytemplateItem.find('.rowsummary');
                var jQryElemHeader = jQrytemplateItem.find('.RecordNumber');
                var jQryBtn = jQrytemplateItem.find('.onDelRowClick');
                var addDependents = document.getElementById("btnAdddependents");
                var jQryChk = jQrytemplateItem.find('.chkAddrss');
                var jQryaddress_form = jQrytemplateItem.find('.address_form');
                var jQrylblFormatType = jQrytemplateItem.find('.lblFormatType');
                var jQryaddresstype_form = jQrytemplateItem.find('.addresstype_form');
                var jQryprefix = jQrytemplateItem.find('.prefix');
                var jQryrelation = jQrytemplateItem.find('.relation');
                var jQrydependenttype = jQrytemplateItem.find('.dependenttype');
                var jQrymaritalstatus = jQrytemplateItem.find('.marital');
                var jQrygender = jQrytemplateItem.find('.gender');
                var jQryDOB = jQrytemplateItem.find('.dobForm');
                var jQryAddressKey = jQrytemplateItem.find('.addresskey');
                var jQryCheckPhone = jQrytemplateItem.find('.onCheckPhone');
                var jQryPhoneType = jQrytemplateItem.find('.phoneType');
                var jQryAddress = jQrytemplateItem.find('.clsAddress');



                jQryElemHeader.val(' Dependent Record ' + (occurrency - 1))
                jQrylblFormatType.val('English');
                $('#Dependentrowitemtemplate').hide();
                $('#Dependentrow_0').hide();
                $('#Dependentrow_1').hide();
                ChkforDisable(occurrency);

                if ($(jQryprefix).val() == null) {
                    $(jQryprefix).val(-1);
                }
                if ($(jQrydependenttype).val() == null) {
                    $(jQrydependenttype).val(-1);
                }
                if ($(jQryrelation).val() == null) {
                    $(jQryrelation).val(-1);
                }
                if ($(jQrymaritalstatus).val() == null) {
                    $(jQrymaritalstatus).val(-1);
                }
                if ($(jQrygender).val() == null) {
                    $(jQrygender).val(-1);
                }

                //To Validate OnChange of dropdown
                jQryaddresstype_form.unbind();
                jQryaddresstype_form.bind('change', function () {
                    var childObj = $('#Address' + occurrency);
                    var cityObj = $('#City' + occurrency);
                    var stateObj = $('#State' + occurrency);
                    var countryObj = $('#Country' + occurrency);
                    var pinObj = $('#ZipCode' + occurrency);
                    var countryId;


                    var strAddress = "";

                    if ($(this).val() == "HOME") {
                        strAddress = TaskPrefillValues.PrefillValues.Set1.PermanentAddress;
                        jQXB.setmemberVarvalue('DependentDetail', occurrency, 'Address', strAddress, childObj);
                        jQXB.setmemberVarvalue('DependentDetail', occurrency, 'City', TaskPrefillValues.PrefillValues.Set1.PermanentCity, cityObj);
                        jQXB.setmemberVarvalue('DependentDetail', occurrency, 'Country', TaskPrefillValues.PrefillValues.Set1.PermanentCountry, countryObj);
                        if (TaskPrefillValues.PrefillValues.Set1.PermanentCountry != undefined) {
                            countryId = TaskPrefillValues.PrefillValues.Set1.PermanentCountry;
                            bindState(countryObj);
                            jQXB.setmemberVarvalue('DependentDetail', occurrency, 'State', TaskPrefillValues.PrefillValues.Set1.PermanentState, stateObj);
                        }
                        stateObj.attr('disabled', 'true');
                        jQXB.setmemberVarvalue('DependentDetail', occurrency, 'ZipCode', TaskPrefillValues.PrefillValues.Set1.PermanentPinCode, pinObj);

                    }
                    else if ($(this).val() == "MAIL") {
                        strAddress = TaskPrefillValues.PrefillValues.Set1.PresentAddress;
                        jQXB.setmemberVarvalue('DependentDetail', occurrency, 'Address', strAddress, childObj);
                        jQXB.setmemberVarvalue('DependentDetail', occurrency, 'City', TaskPrefillValues.PrefillValues.Set1.CurrentCity, cityObj);
                        jQXB.setmemberVarvalue('DependentDetail', occurrency, 'Country', TaskPrefillValues.PrefillValues.Set1.CurrentCountry, countryObj);
                        if (TaskPrefillValues.PrefillValues.Set1.CurrentCountry != undefined) {
                            countryId = TaskPrefillValues.PrefillValues.Set1.CurrentCountry;
                            bindState(countryObj);
                            jQXB.setmemberVarvalue('DependentDetail', occurrency, 'State', TaskPrefillValues.PrefillValues.Set1.CurrentState, stateObj);
                        }
                        stateObj.attr('disabled', 'true');
                        jQXB.setmemberVarvalue('DependentDetail', occurrency, 'ZipCode', TaskPrefillValues.PrefillValues.Set1.CurrentPinCode, pinObj);
                    }



                });


                //                var jQryRelationobj = $('#Relationobj' + occurrency);
                ////                var Relationid;
                ////                Relationid = TaskPrefillValues.PrefillValues.Set1.currentRelation;
                //                bindRelation(jQryRelationobj);

                //                jQXB.setmemberVarvalue('DependentDetail', occurrency, 'State', TaskPrefillValues.PrefillValues.Set1.CurrentState, stateObj);
                //                        }
                //                        stateObj.attr('disabled', 'true');
                //                        jQXB.setmemberVarvalue('DependentDetail', occurrency, 'ZipCode', TaskPrefillValues.PrefillValues.Set1.CurrentPinCode, pinObj);
                //                    }




                //                $('#Relationship').change(function () {
                //                    var currrelationId = $('#Relationship').val();
                //                    if (currrelationId != -1) {
                //                        $('#DependentType').removeAttr('disabled');
                //                        OBPager.GetGeographyMaster(37, currrelationId, "DependentList");
                //                    }
                //                });

                //For Saving CheckBox Value
                jQXB.getValueFromAttrib = function (jQryChk) {
                    var result = "";
                    var attrib = jQryChk.attr(jQXB.JQXB_BINDEDATTRIBUTE_ATTR);
                    if (attrib != undefined) {
                        if (attrib === "checked") {
                            if (jQryChk.is(':checked')) {
                                result = true;
                            } else {
                                result = "";
                            }
                        } else {
                            result = jQryChk.attr(attrib);
                        }
                    } else {
                        result = jQryChk.val();
                    }
                    return result;
                }

                // prevent events fires twice in case of re-binding
                jQryBtn.unbind();
                jQryBtn.bind('click', function () {
                    //                    alert('you are about to delete row : ' + occurrency);
                    delItem(occurrency);
                });

                //  To Validate OnChange of checkbox
                jQryChk.unbind();
                jQryChk.bind('change', function () {


                    var childObj = $('#Address' + occurrency);
                    var childObj1 = $('#AddressType' + occurrency);
                    var cityObj = $('#City' + occurrency);
                    var stateObj = $('#State' + occurrency);
                    var countryObj = $('#Country' + occurrency);
                    var pinObj = $('#ZipCode' + occurrency);
                    var strAddress = "";
                    var strAddresstype = "-1";




                    if ($(jQryChk).is(':checked')) {
                        $(jQryaddress_form).val("");
                        $(jQryaddress_form).attr('readonly', true);
                        $(jQryaddresstype_form).attr('disabled', false);
                        cityObj.attr('disabled', true);
                        stateObj.attr('disabled', true);
                        countryObj.attr('disabled', true);
                        pinObj.attr('disabled', true);
                    }
                    else {
                        $(jQryaddresstype_form).val(-1);
                        $(jQryaddress_form).val("");
                        $(jQryaddresstype_form).attr('disabled', true);
                        $(jQryaddress_form).attr('readonly', false);
                        cityObj.removeAttr('disabled');

                        countryObj.removeAttr('disabled');
                        pinObj.removeAttr('disabled');
                        jQXB.setmemberVarvalue('DependentDetail', occurrency, 'AddressType', strAddresstype, childObj1);
                        jQXB.setmemberVarvalue('DependentDetail', occurrency, 'Address', strAddress, childObj);
                        jQXB.setmemberVarvalue('DependentDetail', occurrency, 'Address', strAddress, childObj);
                        jQXB.setmemberVarvalue('DependentDetail', occurrency, 'City', '', cityObj);
                        jQXB.setmemberVarvalue('DependentDetail', occurrency, 'Country', '-1', countryObj);
                        if (TaskPrefillValues.PrefillValues.Set1.PermanentCountry != undefined) {
                            countryId = TaskPrefillValues.PrefillValues.Set1.PermanentCountry;
                            bindState(countryObj);
                            jQXB.setmemberVarvalue('DependentDetail', occurrency, 'State', '-1', stateObj);

                        }
                        stateObj.removeAttr('disabled');
                        jQXB.setmemberVarvalue('DependentDetail', occurrency, 'ZipCode', '', pinObj);
                    }
                });
                //To Validate OnLoad 
                if ($(jQryChk).is(':checked')) {

                    $(jQryaddress_form).attr('readonly', true);
                    $(jQryaddresstype_form).attr('disabled', false);
                }
                else {
                    $(jQryaddresstype_form).val(-1);
                    $(jQryaddresstype_form).attr('disabled', true);
                    $(jQryaddress_form).attr('readonly', false);
                }

                jQryAddressKey.unbind();
                jQryAddressKey.bind('keydown', function () {
                    var field = $('#Address' + occurrency);
                    var max = 200;
                    if (field.val().length > max)
                        field.val(field.val().substring(0, max));
                });


                var DynDS = jQrytemplateItem.find('.onchangecountry');
                DynDS.unbind();
                DynDS.bind('change', function () {
                    bindState(jQuery(this));
                    //   jQXB.doBind('BaseCoverDependents');
                });



                var DynDSBirth = jQrytemplateItem.find('.onchangebirthcountry');
                DynDSBirth.unbind();
                DynDSBirth.bind('change', function () {
                    bindBirthState(jQuery(this));
                });


                 function bindState(obj) {
                    var GUID = G() + G();
                    var childDSName = obj.attr('jqxb-dynamicChildDataSourceCountry') + '_' + GUID;
                    var Child = jQrytemplateItem.find('.child');
                    var ChildDs = Child.attr('jqxb-dynamicChildDataSourceCountry');
                    Child.removeAttr('jqxb-listsource').attr('jqxb-listsource', ChildDs + '_' + GUID);
                    OBPager.GetGeographyMaster(2, obj.val(), childDSName);
                    Child.removeAttr('disabled');
                }

                function bindBirthState(obj) {
                    var GUID = G() + G();
                    var childDSName = obj.attr('jqxb-dynamicChildDataSourceCountry') + '_' + GUID;
                    var Child = jQrytemplateItem.find('.birthchild');
                    var ChildDs = Child.attr('jqxb-dynamicChildDataSourceCountry');
                    Child.removeAttr('jqxb-listsource').attr('jqxb-listsource', ChildDs + '_' + GUID);
                    OBPager.GetGeographyMaster(2, obj.val(), childDSName);
                    Child.removeAttr('disabled');
                }


                var DynDSDepend = jQrytemplateItem.find('.onchangeRelationShip');
                DynDSDepend.unbind();
                DynDSDepend.bind('change', function () {
                    bindDependentType(jQuery(this));
                });


                //                function bindRelation(obj) {
                //                    var GUID = G() + G();
                //                    var childDSName = obj.attr('jqxb-dynamicchilddatasourceRelationShip') + '_' + GUID;
                //                    var Child = jQrytemplateItem.find('.child');
                //                    var ChildDs = Child.attr('jqxb-dynamicchilddatasourceRelationShip');
                //                    Child.removeAttr('jqxb-listsource').attr('jqxb-listsource', ChildDs + '_' + GUID);
                //                    OBPager.GetGeographyMaster(38, obj.val(), childDSName);
                //                    Child.removeAttr('disabled');
                //                }

                function bindDependentType(obj) {
                    var GUID = G() + G();
                    var childDSName = obj.attr('jqxb-dynamicchilddatasourceRelationShip') + '_' + GUID;
                    var Child = jQrytemplateItem.find('.benefchild');
                    var ChildDs = Child.attr('jqxb-dynamicchilddatasourceRelationShip');
                    Child.removeAttr('jqxb-listsource').attr('jqxb-listsource', ChildDs + '_' + GUID);
                    OBPager.GetGeographyMaster(38, obj.val(), childDSName);
                    Child.removeAttr('disabled');
                }

                var jQrydepPhone = jQrytemplateItem.find('.depPhone');
                var PhoneType = $('#PhoneType' + occurrency);

                if (jQryCheckPhone.is(':checked')) {
                    PhoneType.removeAttr('disabled');

                } else {
                    PhoneType.attr('disabled', 'true');
                }


                jQXB.getValueFromAttrib = function (jQryCheckPhone) {
                    var result = "";
                    var attrib = jQryCheckPhone.attr(jQXB.JQXB_BINDEDATTRIBUTE_ATTR);
                    if (attrib != undefined) {
                        if (attrib === "checked") {
                            if (jQryCheckPhone.is(':checked')) {
                                result = true;

                            } else {
                                result = "";
                            }
                        } else {
                            result = jQryCheckPhone.attr(attrib);
                        }
                    } else {
                        result = jQryCheckPhone.val();
                    }
                    return result;
                }


                jQryCheckPhone.unbind();
                jQryCheckPhone.bind('change', function () {
                    var Phone = $('#Phone' + occurrency);
                    var phoneType = $('#PhoneType' + occurrency);
                    var ChkPhone = $('#ChkPhone' + occurrency);

                    if ($(jQryCheckPhone).is(':checked')) {
                        PhoneType.removeAttr('disabled');
                        Phone.attr('disabled', 'true');
                        jQXB.setmemberVarvalue('DependentDetail', occurrency, 'ChkPhone', '1', ChkPhone);
                        //                        jQXB.setmemberVarvalue('DependentDetail', occurrency, 'PhoneType', '1', ChkPhone);
                        //                        jQXB.setmemberVarvalue('DependentDetail', occurrency, 'Phone', '1', ChkPhone);

                    }
                    else {
                        PhoneType.attr('disabled', 'true');
                        Phone.removeAttr('disabled');
                        jQXB.setmemberVarvalue('DependentDetail', occurrency, 'ChkPhone', '', ChkPhone);
                        jQXB.setmemberVarvalue('DependentDetail', occurrency, 'PhoneType', '-1', ChkPhone);
                        jQXB.setmemberVarvalue('DependentDetail', occurrency, 'Phone', '', ChkPhone);
                    }
                });


                // To Bind the corresponding phone type value
                jQryPhoneType.unbind();
                jQryPhoneType.bind('change', function () {
                    var strPhone = '';
                    var phoneObj = $('#Phone' + occurrency);

                    if ($(this).val() == "HME1") {
                        strPhone = TaskPrefillValues.PrefillValues.Set1.PermanentPhone;
                    }
                    if ($(this).val() == "HME2") {
                        strPhone = TaskPrefillValues.PrefillValues.Set1.CurrentPhone;
                    }

                    if ($(this).val() == 'MBL1') {
                        strPhone = TaskPrefillValues.PrefillValues.Set1.Mobile;
                    }
                    jQXB.setmemberVarvalue('DependentDetail', occurrency, 'Phone', strPhone, phoneObj);

                });


                jQryAddress.unbind();
                jQryAddress.bind('keydown', function () {
                    var field = $('#Address' + occurrency);
                    var max = 150;
                    if (field.val().length > max)
                        field.val(field.val().substring(0, max));
                });



                //To Initialize Validation 
                $('.textMandatory').change(validate.textMandatory);
                $('.textMandatoryDynamic').change(validate.textMandatoryDynamic);
                $('.Alphanumeric').change(validate.textAlphanumeric);
                $('.dropdown').change(validate.dropdown);
                $('.dob').change(validate.birthDate);

                //To Initialize DatePicker
                $(function () {
                    $(jQryDOB).datepicker({ dateFormat: 'mm/dd/yy', yearRange: "-100:+0", maxDate: "0", buttonText: 'Open calendar', showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
                    });
                });
                break;
        }
    });
    jQXB.setDataSource('FormDetails', BaseData).doBind('FormDetails');
    jQXB.setDataSource('DependentDetail', BaseData.DependentDetailsData.DependentRecordinfo.DependentsList, true).doBind('DependentDetail');
    $('.statebirthobj').attr('disabled', 'true');
    $('.stateobj').attr('disabled', 'true');
    $('.Dependentobj').attr('disabled', 'true');

});

function G() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}

$().ready(function () {

 ResetValues();


});

function ChkforDisable(occurrency) {
    var chkNoDependents = document.getElementById("chkNodependents");
    var addDependents = document.getElementById("btnAdddependents");
    if (occurrency == 1 || occurrency == "" || occurrency == 0) {
        chkNoDependents.disabled = false;
        $("#btnAdddependents").attr("disabled", false);
    }
    else if (occurrency > 1 && occurrency < 7) {
        chkNoDependents.disabled = true;
        $("#btnAdddependents").attr("disabled", false);
    }
    else {
        chkNoDependents.disabled = true;
        $("#btnAdddependents").attr("disabled", true);
    }
    if ($('#chkNodependents').is(':checked')) {
        $("#btnAdddependents").attr("disabled", true);
    }
    else {
        if (occurrency == 1 || occurrency == "" || occurrency == 0) {
            chkNoDependents.disabled = false;
            $("#btnAdddependents").attr("disabled", false);
        }
        else if (occurrency > 1 && occurrency < 7) {
            chkNoDependents.disabled = true;
            $("#btnAdddependents").attr("disabled", false);
        }
        else {
            chkNoDependents.disabled = true;
            $("#btnAdddependents").attr("disabled", true);
        }
    }
}
function SetCheckBoxValue() {
    if ($('#chkNodependents').is(':checked')) {
        OBPager.SetTaskContentMemberValue('DependentDetailsData.PersonalDetailsinfo.CheckDependents', 1, true, false);
    }
    else {
        OBPager.SetTaskContentMemberValue('DependentDetailsData.PersonalDetailsinfo.CheckDependents', 1, "", false);
    }
}
function getDS() {
    alert(JSON.stringify(jQXB.getDataSource('FormDetails')));
}

function addItem() {
    var obj = new EmployerDet();
    jQXB.addObjectToDataSource('DependentDetail', obj);

}

function delItem(index) {
    jQXB.deleteObjectFromDataSource('DependentDetail', index);
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
    //PrePopulateValues();
if (OBPager.taskStatusFlag == -1) {
}

    if (BaseData.DependentDetailsData.DependentRecordinfo.DependentsList != null && BaseData.DependentDetailsData.DependentRecordinfo.DependentsList.length > 0) {
        var count = BaseData.DependentDetailsData.DependentRecordinfo.DependentsList.length;
        var i = count - 1; /* Stop iteration from max to 2 as 1, 0 will be default empty items which should not be removed from data source */
        while (i >= 2) {
            delItem(i);
            i--;
        }
    }

    BaseData = JSON.parse(OBPager.strFormDetails);
    jQXB.setDataSource('FormDetails', BaseData).doBind('FormDetails');
    jQXB.setDataSource('DependentDetail', BaseData.DependentDetailsData.DependentRecordinfo.DependentsList).doBind('DependentDetail');
    ResetValues();

    jQXB.doBind(OBPager.taskContentDSName);

}

function ResetValues() {

    var cntrl = 0;

    $(BaseData.DependentDetailsData.DependentRecordinfo.DependentsList).each(function () {
        var country = BaseData.DependentDetailsData.DependentRecordinfo.DependentsList[cntrl].Country;
        var state = BaseData.DependentDetailsData.DependentRecordinfo.DependentsList[cntrl].State;
        var cnt = 0;
        if (cntrl > 1) {
            $('.stateobj').each(function () {
                var stateobj = $(this);
                var ChildDs = stateobj.attr('jqxb-dynamicChildDataSourceCountry');
                if (cntrl == cnt - 1 && country != null && country!="") {
                    var dynDS = ChildDs + G() + G();
                    stateobj.removeAttr('jqxb-listsource').attr('jqxb-listsource', dynDS);
                    OBPager.GetGeographyMaster(2, country, dynDS);
                    stateobj.removeAttr('disabled');
                }
                cnt = cnt + 1;
            });
        }


        var birthCountry = BaseData.DependentDetailsData.DependentRecordinfo.DependentsList[cntrl].BirthCountry;
        var birthState = BaseData.DependentDetailsData.DependentRecordinfo.DependentsList[cntrl].BirthState;
        var birthcnt = 0;


        if (cntrl > 1) {
            $('.statebirthobj').each(function () {

                var stateobj = $(this);

                var ChildDs = stateobj.attr('jqxb-dynamicChildDataSourceCountry');
                if (cntrl == birthcnt - 1 && birthCountry != null && birthCountry!="") {
                    var dynDS = ChildDs + G() + G();
                    stateobj.removeAttr('jqxb-listsource').attr('jqxb-listsource', dynDS);
                    OBPager.GetGeographyMaster(2, birthCountry, dynDS);
                    stateobj.removeAttr('disabled');
                }

                birthcnt = birthcnt + 1;
            });

        }



        var depRelationship = BaseData.DependentDetailsData.DependentRecordinfo.DependentsList[cntrl].Relationship;
        var depBenef = BaseData.DependentDetailsData.DependentRecordinfo.DependentsList[cntrl].DependentType;
        var benefCnt = 0;


        if (cntrl > 1) {
            $('.Dependentobj').each(function () {

                var benefObj = $(this);
                var ChildDs = benefObj.attr('jqxb-dynamicchilddatasourceRelationShip');
                if (cntrl == benefCnt - 1 && depRelationship != null && depRelationship!="") {
                    var dynDS = ChildDs + G() + G();
                    benefObj.removeAttr('jqxb-listsource').attr('jqxb-listsource', dynDS);
                    OBPager.GetGeographyMaster(38, depRelationship, dynDS);
                    benefObj.removeAttr('disabled');
                }

                benefCnt = benefCnt + 1;
            });

        }

        cntrl = cntrl + 1;



    });

    jQXB.doBind('DependentDetail');

}
var BaseData = {};
var resetEmployerDS = {};

function DependentDet() {
    this.ArrivalDate = '';
    this.FamilyName= '';
    this.FirstName = '';
    this.Nationality = '';
    this.DOB = '';
    this.DOM = '';
    this.Ch1SurName = '';
    this.Ch1GivenName = '';
    this.Ch1Nationality = '';
    this.Ch1DOB = '';    
    this.Gender = '';
}
$().ready(function () {
    jQXB.initialize();
    jQXB.compatibilitymode = false;
    OBPager.ShowPage(1);

    var obj = new DependentDet();

    // Set member value manually
    OBPager.GetEmployersDetails();
    // Attach template Event Handling, it should be declared before binding 
    jQXB.addOnTemplateItemBoundhnd(function (dataSourceName, templateName, occurrency, dataItem, jQrytemplateItem) {
        switch (templateName) {
            case "DependentTemplate": // filter only event databound from a specifica template
                var jQryElemHeader = jQrytemplateItem.find('.RecordNumber');
                var jQryBtn = jQrytemplateItem.find('.onDelRowClick');
//                var jQryChildHeader = jQrytemplateItem("Pg_1_children_pgf");
                var addDependents = document.getElementById("btnAdddependents");
                var jQryDOB = jQrytemplateItem.find('.dobForm');
                jQryElemHeader.val(' Dependent Record ' + (occurrency - 1));
//                jQryChildHeader.val(' Child ' + (occurency - 1));
                $('#Dependentrowitemtemplate').hide();
                $('#Dependentrow_0').hide();
                $('#Dependentrow_1').hide();
                ChkforDisable(occurrency);

                // prevent events fires twice in case of re-binding
                jQryBtn.unbind();
                jQryBtn.bind('click', function () {
                    //                    alert('you are about to delete row : ' + occurrency);
                    delItem(occurrency);
                });
                //To Initialize Validation 
                $('.textMandatory').change(validate.textMandatory);
                $('.textMandatoryDynamic').change(validate.textMandatoryDynamic);
                $('.Alphanumeric').change(validate.textAlphanumeric);
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
    jQXB.setDataSource('DependentDetail', BaseData.DepedentInfo.DependentRecordinfo.DependentsList, true).doBind('DependentDetail');
});
function ChkforDisable(occurrency) {
    var chkNoDependents = document.getElementById("chkNodependents");
    var addDependents = document.getElementById("btnAdddependents");
    if (occurrency == 1 || occurrency == "" || occurrency == 0) {
        chkNoDependents.disabled = false;
        $("#btnAdddependents").attr("disabled", false);
    }
    else if (occurrency > 1 && occurrency < 5) {
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
        else if (occurrency > 1 && occurrency < 5) {
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
        OBPager.SetTaskContentMemberValue('DepedentInfo.DependentStatus', 1, true, false);
    }
    else {
        OBPager.SetTaskContentMemberValue('DepedentInfo.DependentStatus', 1, "", false);
    }
}
function getDS() {
    alert(JSON.stringify(jQXB.getDataSource('FormDetails')));
}
function addItem() {
    var obj = new DependentDet();
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
    if (BaseData.DepedentInfo.DependentRecordinfo.DependentsList != null && BaseData.DepedentInfo.DependentRecordinfo.DependentsList.length > 0) {
        var count = BaseData.DepedentInfo.DependentRecordinfo.DependentsList.length;
        var i = count - 1; /* Stop iteration from max to 2 as 1, 0 will be default empty items which should not be removed from data source */
        while (i >= 2) {
            delItem(i);
            i--;
        }
    }
    BaseData = JSON.parse(OBPager.strFormDetails);
    jQXB.setDataSource('FormDetails', BaseData).doBind('FormDetails');
    jQXB.setDataSource('DependentDetail', BaseData.DepedentInfo.DependentRecordinfo.DependentsList).doBind('DependentDetail');
}
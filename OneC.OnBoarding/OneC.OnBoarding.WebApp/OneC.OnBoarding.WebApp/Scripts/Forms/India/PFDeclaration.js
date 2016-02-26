var kycflag = 0;

$().ready(function () {
    OBPager.ShowPage(1);

    //   dropdown values
    OBPager.GetMaster(248, "PrefixList");
    OBPager.GetMaster(15, "MaritalList");
    OBPager.GetMaster(235, "GenderList");
    OBPager.GetMaster(244, "CountryIND");
    OBPager.GetGeographyMaster(23, 1, "RelationshipList");
    OBPager.GetGeographyMaster(1, 0, "CountryList");
    OBPager.GetMaster(242, "EducationQualificationList");
    OBPager.GetMaster(241, "IfYesLocorVisorHearingList");
    OBPager.GetMaster(116, "YesOrNo");
    OBPager.GetMaster(231, "EarlyPFNoHave");
    OBPager.GetMaster(237, "EarlyPFNoStatus");
    $('#DisableCategory').removeClass('dropdown');
    $('#form_PFno_RC').attr("disabled", "true");
    $('#form_PFno_OC').attr("disabled", "true");
    $('#form_PFno_EI').attr("disabled", "true");
    $('#form_PFno_Ex').attr("disabled", "true");
    $('#form_PFno_AN').attr("disabled", "true");
    $('#PrevPFhave').attr("disabled", "true");
    $('#form_EarlyPFNo_RC').attr("disabled", "true");
    $('#form_EarlyPFNo_OC').attr("disabled", "true");
    $('#form_EarlyPFNo_EI').attr("disabled", "true");
    $('#form_EarlyPFNo_Ex').attr("disabled", "true");
    $('#form_EarlyPFNo_AN').attr("disabled", "true");
    $('.PFdropdownClass').attr("disabled", "true");
    $('#PMemberIDDate').attr("disabled", "true");
    $('#Country_Origin1').attr("disabled", "true");
    $('#UANNo').attr("disabled", "true");
    $('#PrevPensionNo').attr("disabled", "true");
    $('#PreviousPFStatus').attr("disabled", "true");
    $('#PrevPFhave').attr("disabled", "true");
    $('#PrevPFNo').attr("disabled", "true");
    $('#PassportIssueDate').attr("disabled", "true");
    $('#PassportExpiryDate').attr("disabled", "true");
    $('#PASSPORT_NUMBER').attr("disabled", "true");
    $('#Scheme_Certificate').attr("disabled", "true");
    $('.InternatnlClass').removeAttr("disabled");
    $('#PPO_Number').attr("disabled", "true");

    $('.PassportCountryNameClass').hide();
    $('.DisableCategoryClass').hide();
    $('.NoInternationalWorker').hide();
    $('.PFNoclass').hide();
    $('.IntnlWrkrClass').hide();
    $('.IntnlWrkrClass1').hide();
    $('.NAPFclass').hide();
    $('.pfnumberclass').find('img').hide();

    //seal and address

    $('#CompanyAddress')[0].innerHTML = TaskPrefillValues.PrefillValues.Set1.Companyaddress;
    if (TaskPrefillValues.PrefillValues.Set1.Sealflag == 'ITAAS') {
        $('#SealImgItaas').attr('src', '../../../../Images/Indlogos/ItaasSEAL.png');
    }
    else if (TaskPrefillValues.PrefillValues.Set1.Sealflag == 'UB') {
        $('#SealImgItaas').attr('src', '../../../../Images/Indlogos/UBS_SEAL.png');
    }
    else if (TaskPrefillValues.PrefillValues.Set1.Sealflag == 'CL') {
        $('#SealImgItaas').attr('src', '../../../../Images/Indlogos/CorelogicSeal.png');
    }
    else if (TaskPrefillValues.PrefillValues.Set1.Sealflag == 'VS') {
        $('#SealImgItaas').attr('src', '../../../../Images/Indlogos/VSISEAL.png');
    }
    else if (TaskPrefillValues.PrefillValues.Set1.Sealflag == 'ED') {
        $('#SealImgItaas').attr('src', '../../../../Images/Indlogos/EDRSEAL.png');
    }
    else {
        $('#SealImgItaas').attr('src', '../../../../Images/roundseal.png');
    }
    $('#SealImgItaas').show();


    if (TaskPrefillValues.PrefillValues.Set1.IsDisabled == '1') {
        $('#IsDisabledId').attr("disabled", "true");
        $('.DisableCategoryClass').attr("disabled", "true");
        $('#DisableCategory').attr("disabled", "true");
        $('#DisableCategory').addClass('dropdown');
        $('.DisableCategoryClass').show();
    }
    else if (TaskPrefillValues.PrefillValues.Set1.IsDisabled == '2') {
        OBPager.SetTaskContentMemberValue('PFDeclaration.IfYesLocorVisorHearing', null, '', false);
        $('#IsDisabledId').attr("disabled", "true");
        $('#DisableCategory').removeClass('dropdown');
        $('.DisableCategoryClass').attr("disabled", "true");
        $('#DisableCategory').attr("disabled", "true");
        $('#DisableCategory').val('-1');
        $('.DisableCategoryClass').hide();
    }
    else {
        $('#IsDisabledId').removeAttr("disabled");
        $('.DisableCategoryClass').removeAttr("disabled");
        $('#DisableCategory').removeAttr("disabled");
    }
    if (TaskPrefillValues.PrefillValues.Set1.MaritalStatus != '-1') {
        $('#MaritalStatus').attr("disabled", "true");
    }

    if (TaskPrefillValues.PrefillValues.Set1.kycPASSPORTRemarks != null) {
        $('#PassportExpiredDate').removeClass('jQryExpdate');
    }
    else {
        $('#PassportExpiredDate').addClass('jQryExpdate');
    }
    if (TaskPrefillValues.PrefillValues.Set1.DOB == null) {
        var dateofbirth = null;
        var fromatteddateofbirth = null;
    }
    else {
        var dateofbirth = new Date(TaskPrefillValues.PrefillValues.Set1.DOB);
        var fromatteddateofbirth = ((dateofbirth.getDate() < 10) ? "0" + dateofbirth.getDate() : dateofbirth.getDate()) + '/' + ((dateofbirth.getMonth() < 10) ? "0" + (dateofbirth.getMonth() + 1) : (dateofbirth.getMonth() + 1)) + '/' + dateofbirth.getFullYear();
    }
    // formatting date dd/mm/yyyy

    OBPager.SetTaskContentMemberValue('PFDeclaration.DOB', null, fromatteddateofbirth, false);

    //Prefill the values at the first time when task not even saved 
    if (OBPager.taskStatusFlag == -1) {
        // Set member value manually
        OBPager.SetTaskContentMemberValue('PFDeclaration.Prefix', null, TaskPrefillValues.PrefillValues.Set1.Prefix, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.Name', null, TaskPrefillValues.PrefillValues.Set1.Name, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.PrefixFather', null, TaskPrefillValues.PrefillValues.Set1.PrefixFather, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.FatherName', null, TaskPrefillValues.PrefillValues.Set1.FatherName, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.FatherRelation', null, TaskPrefillValues.PrefillValues.Set1.FatherRelation, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.Gender', null, TaskPrefillValues.PrefillValues.Set1.Gender, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.MaritalStatus', null, TaskPrefillValues.PrefillValues.Set1.MaritalStatus, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.IsDisabled', null, TaskPrefillValues.PrefillValues.Set1.IsDisabled, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.IfYesLocorVisorHearing', null, TaskPrefillValues.PrefillValues.Set1.IfYesLocorVisorHearing, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.kycPANNumber', null, TaskPrefillValues.PrefillValues.Set1.kycPANNumber, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.kycPANName', null, TaskPrefillValues.PrefillValues.Set1.kycPANName, false);
        if (TaskPrefillValues.PrefillValues.Set1.Date == null) {
            var today = null;
            var fromattedDate = null;
        }
        else {
            var today = new Date(TaskPrefillValues.PrefillValues.Set1.Date);
            var fromattedDate = ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate()) + '/' + ((today.getMonth() < 10) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '/' + today.getFullYear();
        }
        OBPager.SetTaskContentMemberValue('PFDeclaration.Date', null, fromattedDate, false);
        //    OBPager.SetTaskContentMemberValue('PFDeclaration.Date', null, TaskPrefillValues.PrefillValues.Set1.Date, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.kycPASSPORTName', null, TaskPrefillValues.PrefillValues.Set1.kycPASSPORTName, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.kycPASSPORTNumber', null, TaskPrefillValues.PrefillValues.Set1.kycPASSPORTNumber, false);
        if (TaskPrefillValues.PrefillValues.Set1.PassportExpiryDate == null) {
            var expiryDate = null;
            var fromattedexpiryDate = null;
        }
        else {
            var expiryDate = new Date(TaskPrefillValues.PrefillValues.Set1.PassportExpiryDate);
            var fromattedexpiryDate = ((expiryDate.getDate() < 10) ? "0" + expiryDate.getDate() : expiryDate.getDate()) + '/' + ((expiryDate.getMonth() < 10) ? "0" + (expiryDate.getMonth() + 1) : (expiryDate.getMonth() + 1)) + '/' + expiryDate.getFullYear();
        }
        OBPager.SetTaskContentMemberValue('PFDeclaration.kycPASSPORTRemarks', null, fromattedexpiryDate, false);

        // OBPager.SetTaskContentMemberValue('PFDeclaration.kycPASSPORTRemarks', null, TaskPrefillValues.PrefillValues.Set1.kycPASSPORTRemarks, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.EarlierPFscheme1952YesOrNo', null, TaskPrefillValues.PrefillValues.Set1.EarlierPFscheme1952YesOrNo, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.EarlierPension1995YesOrNo', null, TaskPrefillValues.PrefillValues.Set1.EarlierPension1995YesOrNo, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.InternationalWorkerYesorNo', null, TaskPrefillValues.PrefillValues.Set1.InternationalWorkerYesorNo, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.EducationQualification', null, TaskPrefillValues.PrefillValues.Set1.EducationQualification, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNoYesOrNo', null, TaskPrefillValues.PrefillValues.Set1.EarlyPFNoYesOrNo, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNoHave', null, TaskPrefillValues.PrefillValues.Set1.EarlyPFNoHave, false);
        if (TaskPrefillValues.PrefillValues.Set1.InternationalWorkerYesorNo == 1) {
            OBPager.SetTaskContentMemberValue('PFDeclaration.InternationalWorkerYesorNo', null, TaskPrefillValues.PrefillValues.Set1.InternationalWorkerYesorNo, false);
            if (TaskPrefillValues.PrefillValues.Set1.PassportCountry == 2) {

                if (TaskPrefillValues.PrefillValues.Set1.PassportNo != null && TaskPrefillValues.PrefillValues.Set1.PassportNo != '') {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.PassportNo', null, TaskPrefillValues.PrefillValues.Set1.PassportNo, false);
                }
                if (TaskPrefillValues.PrefillValues.Set1.PassportIssueDate != null && TaskPrefillValues.PrefillValues.Set1.PassportIssueDate != '') {
                    if (TaskPrefillValues.PrefillValues.Set1.PassportIssueDate == null) {
                        var issueDate = null;
                        var fromattedissueDate = null;
                    }
                    else {
                        var issueDate = new Date(TaskPrefillValues.PrefillValues.Set1.PassportIssueDate);
                        var fromattedissueDate = ((issueDate.getDate() < 10) ? "0" + issueDate.getDate() : issueDate.getDate()) + '/' + ((issueDate.getMonth() < 10) ? "0" + (issueDate.getMonth() + 1) : (issueDate.getMonth() + 1)) + '/' + issueDate.getFullYear();
                    }
                    OBPager.SetTaskContentMemberValue('PFDeclaration.PassportIssueDate', null, fromattedissueDate, false);
                }
                if (TaskPrefillValues.PrefillValues.Set1.PassportExpiryDate != null && TaskPrefillValues.PrefillValues.Set1.PassportExpiryDate != '') {
                    if (TaskPrefillValues.PrefillValues.Set1.PassportExpiryDate == null) {
                        var expiryDate = null;
                        var fromattedexpiryDate = null;
                    }
                    else {
                        var expiryDate = new Date(TaskPrefillValues.PrefillValues.Set1.PassportExpiryDate);
                        var fromattedexpiryDate = ((expiryDate.getDate() < 10) ? "0" + expiryDate.getDate() : expiryDate.getDate()) + '/' + ((expiryDate.getMonth() < 10) ? "0" + (expiryDate.getMonth() + 1) : (expiryDate.getMonth() + 1)) + '/' + expiryDate.getFullYear();
                    }
                    OBPager.SetTaskContentMemberValue('PFDeclaration.PassportExpiryDate', null, fromattedexpiryDate, false);
                }
                else {
                    $('#PASSPORT_NUMBER').removeAttr('disabled').addClass('textMandatory');
                    $('#PassportIssueDate').removeAttr('disabled').addClass('dateMandatory');
                    $('#PassportExpiryDate').removeAttr('disabled').addClass('dateMandatory');
                    $('.passportddetails').find('img').show();
                }
                $('#Country_Origin1').removeAttr('disabled').addClass(' dropdown');
                OBPager.SetTaskContentMemberValue('PFDeclaration.PassportCountry', null, TaskPrefillValues.PrefillValues.Set1.PassportCountry, false);
                OBPager.SetTaskContentMemberValue('PFDeclaration.PassportCountryName', null, TaskPrefillValues.PrefillValues.Set1.PassportCountryName, false);
                $('.PassportCountryNameClass').show();
                $('#PassportCountryName').addClass('dropdown');
                $('.IntnlWrkrClass').show();
                $('.YesInternationalWorker').show();
                $('.NoInternationalWorker').hide();
                $('.InternatnlClass').attr("disabled", "true");
            }
        }
        if (TaskPrefillValues.PrefillValues.Set1.EarlierPension1995YesOrNo == 2 && TaskPrefillValues.PrefillValues.Set1.EarlierPFscheme1952YesOrNo == 2) {
            $('.NAPFCLASStext').hide();
            $('.NAPFclass').show();
            removeValuesPFScheme();
        }
        else if (TaskPrefillValues.PrefillValues.Set1.EarlierPension1995YesOrNo == 1 || TaskPrefillValues.PrefillValues.Set1.EarlierPFscheme1952YesOrNo == 1) {
            if (TaskPrefillValues.PrefillValues.Set1.UANNoYesOrNo == 'Y') {
                OBPager.SetTaskContentMemberValue('PFDeclaration.UANNo', null, TaskPrefillValues.PrefillValues.Set1.UANNo, false);
                OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_RC', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_RC, false);
                OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_OC', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_OC, false);
                OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_EI', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_EI, false);
                OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_Ex', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_Ex, false);
                OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_AN', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_AN, false);
            }
            else if (TaskPrefillValues.PrefillValues.Set1.UANNoYesOrNo == 'N' && TaskPrefillValues.PrefillValues.Set1.PFYesOrNo == 'Y') {
                OBPager.SetTaskContentMemberValue('PFDeclaration.UANNo', null, '', false);
                OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_RC', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_RC, false);
                OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_OC', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_OC, false);
                OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_EI', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_EI, false);
                OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_Ex', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_Ex, false);
                OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_AN', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_AN, false);
            }
            OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNoHave', null, TaskPrefillValues.PrefillValues.Set1.EarlyPFNoHave, false);
            OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNoYesOrNo', null, TaskPrefillValues.PrefillValues.Set1.EarlyPFNoYesOrNo, false);
            addValuesPFScheme();
        }
    }
    else if (OBPager.taskStatusFlag != -1) {
        OBPager.SetTaskContentMemberValue('PFDeclaration.Prefix', null, TaskPrefillValues.PrefillValues.Set1.Prefix, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.Name', null, TaskPrefillValues.PrefillValues.Set1.Name, false);
        //OBPager.SetTaskContentMemberValue('PFDeclaration.DOB', null, TaskPrefillValues.PrefillValues.Set1.DOB, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.PrefixFather', null, TaskPrefillValues.PrefillValues.Set1.PrefixFather, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.FatherName', null, TaskPrefillValues.PrefillValues.Set1.FatherName, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.FatherRelation', null, TaskPrefillValues.PrefillValues.Set1.FatherRelation, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.IsDisabled', null, TaskPrefillValues.PrefillValues.Set1.IsDisabled, false);
        if (TaskPrefillValues.PrefillValues.Set1.IsDisabled == 2) {
            OBPager.SetTaskContentMemberValue('PFDeclaration.IfYesLocorVisorHearing', null, '', false);
        }
        OBPager.SetTaskContentMemberValue('PFDeclaration.Gender', null, TaskPrefillValues.PrefillValues.Set1.Gender, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.MaritalStatus', null, TaskPrefillValues.PrefillValues.Set1.MaritalStatus, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.EarlierPFscheme1952YesOrNo', null, TaskPrefillValues.PrefillValues.Set1.EarlierPFscheme1952YesOrNo, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.EarlierPension1995YesOrNo', null, TaskPrefillValues.PrefillValues.Set1.EarlierPension1995YesOrNo, false);
        if (TaskPrefillValues.PrefillValues.Set1.Date == null) {
            var today = null;
            var fromattedDate = null;
        }
        else {
            var today = new Date(TaskPrefillValues.PrefillValues.Set1.Date);
            var fromattedDate = ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate()) + '/' + ((today.getMonth() < 10) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '/' + today.getFullYear();
        }
        OBPager.SetTaskContentMemberValue('PFDeclaration.Date', null, fromattedDate, false);
        if (TaskPrefillValues.PrefillValues.Set1.kycPANNumber != '' && TaskPrefillValues.PrefillValues.Set1.kycPANNumber != null) {
            OBPager.SetTaskContentMemberValue('PFDeclaration.kycPANNumber', null, TaskPrefillValues.PrefillValues.Set1.kycPANNumber, false);
        }
        if (TaskPrefillValues.PrefillValues.Set1.kycPANName != '' && TaskPrefillValues.PrefillValues.Set1.kycPANName != null) {
            OBPager.SetTaskContentMemberValue('PFDeclaration.kycPANName', null, TaskPrefillValues.PrefillValues.Set1.kycPANName, false);
        }
        if (TaskPrefillValues.PrefillValues.Set1.kycPASSPORTName != '' && TaskPrefillValues.PrefillValues.Set1.kycPASSPORTName != null) {
            OBPager.SetTaskContentMemberValue('PFDeclaration.kycPASSPORTName', null, TaskPrefillValues.PrefillValues.Set1.kycPASSPORTName, false);
        }
        if (TaskPrefillValues.PrefillValues.Set1.kycPASSPORTNumber != '' && TaskPrefillValues.PrefillValues.Set1.kycPASSPORTNumber != null) {
            OBPager.SetTaskContentMemberValue('PFDeclaration.kycPASSPORTNumber', null, TaskPrefillValues.PrefillValues.Set1.kycPASSPORTNumber, false);
        }
        if (TaskPrefillValues.PrefillValues.Set1.kycPASSPORTRemarks != '' && TaskPrefillValues.PrefillValues.Set1.kycPASSPORTRemarks != null) {
            if (TaskPrefillValues.PrefillValues.Set1.PassportExpiryDate == null) {
                var expiryDate = null;
                var fromattedexpiryDate = null;
            }
            else {
                var expiryDate = new Date(TaskPrefillValues.PrefillValues.Set1.PassportExpiryDate);
                var fromattedexpiryDate = ((expiryDate.getDate() < 10) ? "0" + expiryDate.getDate() : expiryDate.getDate()) + '/' + ((expiryDate.getMonth() < 10) ? "0" + (expiryDate.getMonth() + 1) : (expiryDate.getMonth() + 1)) + '/' + expiryDate.getFullYear();
            }
            OBPager.SetTaskContentMemberValue('PFDeclaration.kycPASSPORTRemarks', null, fromattedexpiryDate, false);
            OBPager.SetTaskContentMemberValue('PFDeclaration.kycPASSPORTRemarks', null, fromattedexpiryDate, false);

            // OBPager.SetTaskContentMemberValue('PFDeclaration.kycPASSPORTRemarks', null, TaskPrefillValues.PrefillValues.Set1.kycPASSPORTRemarks, false);
        }
    }
    // Set member value manually
    //Do a data bind finally
    jQXB.doBind(OBPager.taskContentDSName);
    if (OBPager.taskStatusFlag == -1) {
        if (TaskPrefillValues.PrefillValues.Set1.kycPANNumber != null) {
            OBPager.SetTaskContentMemberValue('PFDeclaration.kycPANNumber', null, TaskPrefillValues.PrefillValues.Set1.kycPANNumber, false);
            $('#PanNumber').attr("disabled", "true");
        }
        else {
            $('#PanNumber').removeAttr("disabled");
        }
        if (TaskPrefillValues.PrefillValues.Set1.kycPANName != null) {
            OBPager.SetTaskContentMemberValue('PFDeclaration.kycPANName', null, TaskPrefillValues.PrefillValues.Set1.kycPANName, false);
            $('#PanName').attr("disabled", "true");
        }
        else {
            $('#PanName').removeAttr("disabled");
        }
        if (TaskPrefillValues.PrefillValues.Set1.kycPASSPORTName != null) {
            OBPager.SetTaskContentMemberValue('PFDeclaration.kycPASSPORTName', null, TaskPrefillValues.PrefillValues.Set1.kycPASSPORTName, false);
            $('#PassportName').attr("disabled", "true");
        }
        else {
            $('#PassportName').removeAttr("disabled");
        }
        if (TaskPrefillValues.PrefillValues.Set1.kycPASSPORTNumber != null) {
            OBPager.SetTaskContentMemberValue('PFDeclaration.kycPASSPORTNumber', null, TaskPrefillValues.PrefillValues.Set1.kycPASSPORTNumber, false);
            $('#PassportNo').attr("disabled", "true");
        }
        else {
            $('#PassportNo').removeAttr("disabled");
        }
        if (TaskPrefillValues.PrefillValues.Set1.kycPASSPORTRemarks != null) {
            if (TaskPrefillValues.PrefillValues.Set1.PassportExpiryDate == null) {
                var expiryDate = null;
                var fromattedexpiryDate = null;
            }
            else {
                var expiryDate = new Date(TaskPrefillValues.PrefillValues.Set1.PassportExpiryDate);
                var fromattedexpiryDate = ((expiryDate.getDate() < 10) ? "0" + expiryDate.getDate() : expiryDate.getDate()) + '/' + ((expiryDate.getMonth() < 10) ? "0" + (expiryDate.getMonth() + 1) : (expiryDate.getMonth() + 1)) + '/' + expiryDate.getFullYear();
            }
            OBPager.SetTaskContentMemberValue('PFDeclaration.kycPASSPORTRemarks', null, fromattedexpiryDate, false);
            OBPager.SetTaskContentMemberValue('PFDeclaration.kycPASSPORTRemarks', null, fromattedexpiryDate, false);
            $('#PassportExpiredDate').val(fromattedexpiryDate);
            //  $('#PassportExpiredDate').val(TaskPrefillValues.PrefillValues.Set1.kycPASSPORTRemarks);
            $('#PassportExpiredDate').attr("disabled", "true");
        }
        else {
            $('#PassportExpiredDate').removeAttr("disabled");
            $('#PassportExpiredDate').css({
                "color": "grey"
            });
            $('#PassportExpiredDate').val('Expiry Date');

        }
        if ($('#BankAccountRemarks').val() != "") {
            $('#BankAccountRemarks').val(TaskPrefillValues.PrefillValues.Set1.BankAccountRemarks);
        }
        else {

            $('#BankAccountRemarks').css({
                "color": "grey"
            });
            $('#BankAccountRemarks').val('IFSC Code');

        }
        if ($('#DRIVINGLicenceRemarks').val() != "") {
            $('#DRIVINGLicenceRemarks').val(TaskPrefillValues.PrefillValues.Set1.DRIVINGLicenceRemarks);
        }
        else {

            $('#DRIVINGLicenceRemarks').css({
                "color": "grey"
            });
            $('#DRIVINGLicenceRemarks').val('Expiry Date');

        }
    }

    if (OBPager.taskStatusFlag != -1) {
        if (TaskPrefillValues.PrefillValues.Set1.kycPANNumber != null) {
            OBPager.SetTaskContentMemberValue('PFDeclaration.kycPANNumber', null, TaskPrefillValues.PrefillValues.Set1.kycPANNumber, false);
            $('#PanNumber').attr("disabled", "true");
        }
        else {
            $('#PanNumber').removeAttr("disabled");
        }
        if (TaskPrefillValues.PrefillValues.Set1.kycPANName != null) {
            OBPager.SetTaskContentMemberValue('PFDeclaration.kycPANName', null, TaskPrefillValues.PrefillValues.Set1.kycPANName, false);
            $('#PanName').attr("disabled", "true");
        }
        else {
            $('#PanName').removeAttr("disabled");
        }
        if (TaskPrefillValues.PrefillValues.Set1.kycPASSPORTName != null) {
            OBPager.SetTaskContentMemberValue('PFDeclaration.kycPASSPORTName', null, TaskPrefillValues.PrefillValues.Set1.kycPASSPORTName, false);
            $('#PassportName').attr("disabled", "true");
        }
        else {
            $('#PassportName').removeAttr("disabled");
        }
        if (TaskPrefillValues.PrefillValues.Set1.kycPASSPORTNumber != null) {
            OBPager.SetTaskContentMemberValue('PFDeclaration.kycPASSPORTNumber', null, TaskPrefillValues.PrefillValues.Set1.kycPASSPORTNumber, false);
            $('#PassportNo').attr("disabled", "true");
        }
        else {
            $('#PassportNo').removeAttr("disabled");
        }
        if (TaskPrefillValues.PrefillValues.Set1.kycPASSPORTRemarks != null) {
            if (TaskPrefillValues.PrefillValues.Set1.PassportExpiryDate == null) {
                var expiryDate = null;
                var fromattedexpiryDate = null;
            }
            else {
                var expiryDate = new Date(TaskPrefillValues.PrefillValues.Set1.PassportExpiryDate);
                var fromattedexpiryDate = ((expiryDate.getDate() < 10) ? "0" + expiryDate.getDate() : expiryDate.getDate()) + '/' + ((expiryDate.getMonth() < 10) ? "0" + (expiryDate.getMonth() + 1) : (expiryDate.getMonth() + 1)) + '/' + expiryDate.getFullYear();
            }
            OBPager.SetTaskContentMemberValue('PFDeclaration.kycPASSPORTRemarks', null, fromattedexpiryDate, false);

            OBPager.SetTaskContentMemberValue('PFDeclaration.kycPASSPORTRemarks', null, fromattedexpiryDate, false);
            $('#PassportExpiredDate').val(fromattedexpiryDate);
            $('#PassportExpiredDate').attr("disabled", "true");
        }
        else {
            $('#PassportExpiredDate').removeAttr("disabled");
        }
        if ($('#IsDisabledId').val() == '1') {
            OBPager.SetTaskContentMemberValue('PFDeclaration.IsDisabled', null, TaskPrefillValues.PrefillValues.Set1.IsDisabled, false);
            $('#DisableCategory').addClass('dropdown');
            if (TaskPrefillValues.PrefillValues.Set1.IfYesLocorVisorHearing != '-1') {
                OBPager.SetTaskContentMemberValue('PFDeclaration.IfYesLocorVisorHearing', null, TaskPrefillValues.PrefillValues.Set1.IfYesLocorVisorHearing, false);
            }
            else {
                $('.DisableCategoryClass').removeAttr("disabled");
                $('#DisableCategory').addClass('dropdown');
                $('#DisableCategory').removeAttr("disabled");
                $('.DisableCategoryClass').show();
            }

        }
        else if ($('#IsDisabledId').val() == '2') {
            OBPager.SetTaskContentMemberValue('PFDeclaration.IsDisabled', null, TaskPrefillValues.PrefillValues.Set1.IsDisabled, false);
            OBPager.SetTaskContentMemberValue('PFDeclaration.IfYesLocorVisorHearing', null, '', false);
        }
        jQXB.doBind(OBPager.taskContentDSName);
        if ($('#PassportExpiredDate').val() == null) {
            $('#PassportExpiredDate').css({
                "color": "grey"
            });
            $('#PassportExpiredDate').val('Expiry Date');

        }
        if ($('#BankAccountRemarks').val() == "") {
            $('#BankAccountRemarks').css({
                "color": "grey"
            });
            $('#BankAccountRemarks').val('IFSC Code');
        }
        if ($('#DRIVINGLicenceRemarks').val() == "") {
            $('#DRIVINGLicenceRemarks').css({
                "color": "grey"
            });
            $('#DRIVINGLicenceRemarks').val('Expiry Date');

        }


    }
    var taskObj = JSON.parse(OBPager.strFormDetails).PFDeclaration;
    if (OBPager.taskStatusFlag != -1) {
        if (TaskPrefillValues.PrefillValues.Set1.IsDisabled == null || TaskPrefillValues.PrefillValues.Set1.IsDisabled == '-1') {
            if (taskObj.IsDisabled == 1) {
                $('#DisableCategory').addClass('dropdown');
                $('.DisableCategoryClass').removeAttr('disabled');
                $('#DisableCategory').removeAttr('disabled');
                OBPager.SetTaskContentMemberValue('PFDeclaration.IsDisabled', null, taskObj.IsDisabled, false);
                OBPager.SetTaskContentMemberValue('PFDeclaration.IfYesLocorVisorHearing', null, taskObj.IfYesLocorVisorHearing, false);
                $('.DisableCategoryClass').show();
                $('#IsDisabledId').removeAttr('disabled');
            }
            else if (taskObj.IsDisabled == 2) {
                OBPager.SetTaskContentMemberValue('PFDeclaration.IsDisabled', null, taskObj.IsDisabled, false);
                OBPager.SetTaskContentMemberValue('PFDeclaration.IfYesLocorVisorHearing', null, '', false);
                $('#DisableCategory').removeClass('dropdown');
                $('#DisableCategory').val('-1');
                $('.DisableCategoryClass').hide();
            }
        }
    }

    if ((TaskPrefillValues.PrefillValues.Set1.EarlierPFscheme1952YesOrNo == '1') || (taskObj.EarlierPension1995YesOrNo == '1')) {
        OBPager.SetTaskContentMemberValue('PFDeclaration.EarlierPension1995YesOrNo', null, taskObj.EarlierPension1995YesOrNo, false);
        jQXB.doBind(OBPager.taskContentDSName);
        if (OBPager.taskStatusFlag == -1) {
            if (TaskPrefillValues.PrefillValues.Set1.UANNoYesOrNo == 'Y') {
                OBPager.SetTaskContentMemberValue('PFDeclaration.UANNo', null, TaskPrefillValues.PrefillValues.Set1.UANNo, false);
                OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_RC', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_RC, false);
                OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_OC', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_OC, false);
                OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_EI', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_EI, false);
                OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_Ex', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_Ex, false);
                OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_AN', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_AN, false);
                addValuesPFScheme();
            }
            else if (TaskPrefillValues.PrefillValues.Set1.UANNoYesOrNo == 'N' && TaskPrefillValues.PrefillValues.Set1.PFYesOrNo == 'Y') {
                OBPager.SetTaskContentMemberValue('PFDeclaration.UANNo', null, '', false);
                OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_RC', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_RC, false);
                OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_OC', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_OC, false);
                OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_EI', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_EI, false);
                OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_Ex', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_Ex, false);
                OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_AN', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_AN, false);

            }
            OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNoHave', null, TaskPrefillValues.PrefillValues.Set1.EarlyPFNoHave, false);
            OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNoYesOrNo', null, TaskPrefillValues.PrefillValues.Set1.EarlyPFNoYesOrNo, false);
            addValuesPFScheme();
        }
        else if (OBPager.taskStatusFlag != -1) {
            if (taskObj.InternationalWorkerYesorNo == '1') {
                if (taskObj.PassportCountry == TaskPrefillValues.PrefillValues.Set1.PassportCountry) {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.PassportCountry', null, TaskPrefillValues.PrefillValues.Set1.PassportCountry, false);
                }
                else {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.PassportCountry', null, taskObj.PassportCountry, false);
                    $('.IntnlWrkrClass').show();
                    $('.YesInternationalWorker').show();
                    $('.NoInternationalWorker').hide();
                    // $('.InternatnlClass').attr("disabled", "true");
                    $('.PassportCountryNameClass').show();
                    $('#PassportCountryName').addClass('dropdown');
                    OBPager.SetTaskContentMemberValue('PFDeclaration.PassportCountryName', null, taskObj.PassportCountryName, false);
                    jQXB.doBind(OBPager.taskContentDSName);
                }
            }
            if (TaskPrefillValues.PrefillValues.Set1.UANNoYesOrNo == 'Y') {
                if (TaskPrefillValues.PrefillValues.Set1.UANNo != null && TaskPrefillValues.PrefillValues.Set1.UANNo != '') {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.UANNo', null, TaskPrefillValues.PrefillValues.Set1.UANNo, false);
                }
                if (TaskPrefillValues.PrefillValues.Set1.LastPFNo_RC != null && TaskPrefillValues.PrefillValues.Set1.LastPFNo_RC != '') {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_RC', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_RC, false);
                }
                if (TaskPrefillValues.PrefillValues.Set1.LastPFNo_OC != null && TaskPrefillValues.PrefillValues.Set1.LastPFNo_OC != '') {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_OC', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_OC, false);
                }
                if (TaskPrefillValues.PrefillValues.Set1.LastPFNo_EI != null && TaskPrefillValues.PrefillValues.Set1.LastPFNo_EI != '') {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_EI', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_EI, false);
                }
                if (TaskPrefillValues.PrefillValues.Set1.LastPFNo_Ex != null && TaskPrefillValues.PrefillValues.Set1.LastPFNo_Ex != '') {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_Ex', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_Ex, false);
                }
                if (TaskPrefillValues.PrefillValues.Set1.LastPFNo_AN != null && TaskPrefillValues.PrefillValues.Set1.LastPFNo_AN != '') {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_AN', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_AN, false);
                }
            }
            else if (TaskPrefillValues.PrefillValues.Set1.UANNoYesOrNo == 'N' && TaskPrefillValues.PrefillValues.Set1.PFYesOrNo == 'Y') {
                OBPager.SetTaskContentMemberValue('PFDeclaration.UANNo', null, '', false);
                if (TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_RC != null && TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_RC != '') {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_RC', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_RC, false);
                }
                if (TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_OC != null && TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_OC != '') {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_OC', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_OC, false);
                }
                if (TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_EI != null && TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_EI != '') {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_EI', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_EI, false);
                }
                if (TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_Ex != null && TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_Ex != '') {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_Ex', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_Ex, false);
                }
                if (TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_AN != null && TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_AN != '') {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_AN', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_AN, false);
                }

            }
            if (taskObj.EarlyPFNoHave == '-1' || taskObj.EarlyPFNoHave == '' || taskObj.EarlyPFNoHave == null) {
                OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNoHave', null, TaskPrefillValues.PrefillValues.Set1.EarlyPFNoHave, false);
            }
            jQXB.doBind(OBPager.taskContentDSName);
            if (taskObj.EarlyPFNoYesOrNo == '-1' || taskObj.EarlyPFNoYesOrNo == '' || taskObj.EarlyPFNoYesOrNo == null) {
                OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNoYesOrNo', null, '-1', false);
            }

            addValuesPFScheme();
        }
    }
    else if ((TaskPrefillValues.PrefillValues.Set1.EarlierPFscheme1952YesOrNo == '2') && (taskObj.EarlierPension1995YesOrNo == '2')) {
        OBPager.SetTaskContentMemberValue('PFDeclaration.EarlierPension1995YesOrNo', null, taskObj.EarlierPension1995YesOrNo, false);
        jQXB.doBind(OBPager.taskContentDSName);
        $('.NAPFclass').show();
        $('.NAPFCLASStext').hide();
        OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNoHave', null, '-1', false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNoYesOrNo', null, '-1', false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.DateofExit', null, '', false);
        jQXB.doBind(OBPager.taskContentDSName);
        removeValuesPFScheme();
    }
    if (TaskPrefillValues.PrefillValues.Set1.PassportCountry == '1') {
        if (taskObj.InternationalWorkerYesorNo == '1') {
            OBPager.SetTaskContentMemberValue('PFDeclaration.PassportCountry', null, TaskPrefillValues.PrefillValues.Set1.PassportCountry, false);
            if (TaskPrefillValues.PrefillValues.Set1.PassportNo != null && TaskPrefillValues.PrefillValues.Set1.PassportNo != '') {
                OBPager.SetTaskContentMemberValue('PFDeclaration.PassportNo', null, TaskPrefillValues.PrefillValues.Set1.PassportNo, false);
            }
            if (TaskPrefillValues.PrefillValues.Set1.PassportIssueDate != null && TaskPrefillValues.PrefillValues.Set1.PassportIssueDate != '') {
                if (TaskPrefillValues.PrefillValues.Set1.PassportIssueDate == null) {
                    var issueDate = null;
                    var fromattedissueDate = null;
                }
                else {
                    var issueDate = new Date(TaskPrefillValues.PrefillValues.Set1.PassportIssueDate);
                    var fromattedissueDate = ((issueDate.getDate() < 10) ? "0" + issueDate.getDate() : issueDate.getDate()) + '/' + ((issueDate.getMonth() < 10) ? "0" + (issueDate.getMonth() + 1) : (issueDate.getMonth() + 1)) + '/' + issueDate.getFullYear();
                }
                OBPager.SetTaskContentMemberValue('PFDeclaration.PassportIssueDate', null, fromattedissueDate, false);
                //OBPager.SetTaskContentMemberValue('PFDeclaration.PassportIssueDate', null, TaskPrefillValues.PrefillValues.Set1.PassportIssueDate, false);
            }
            if (TaskPrefillValues.PrefillValues.Set1.PassportExpiryDate != null && TaskPrefillValues.PrefillValues.Set1.PassportExpiryDate != '') {
                if (TaskPrefillValues.PrefillValues.Set1.PassportExpiryDate == null) {
                    var expiryDate = null;
                    var fromattedexpiryDate = null;
                }
                else {
                    var expiryDate = new Date(TaskPrefillValues.PrefillValues.Set1.PassportExpiryDate);
                    var fromattedexpiryDate = ((expiryDate.getDate() < 10) ? "0" + expiryDate.getDate() : expiryDate.getDate()) + '/' + ((expiryDate.getMonth() < 10) ? "0" + (expiryDate.getMonth() + 1) : (expiryDate.getMonth() + 1)) + '/' + expiryDate.getFullYear();
                }
                OBPager.SetTaskContentMemberValue('PFDeclaration.PassportExpiryDate', null, fromattedexpiryDate, false);

            }
            else {
                $('#PASSPORT_NUMBER').removeAttr('disabled').addClass('textMandatory');
                $('#PassportIssueDate').removeAttr('disabled').addClass('dateMandatory');
                $('#PassportExpiryDate').removeAttr('disabled').addClass('dateMandatory');
                $('.passportddetails').find('img').show();
            }

            $('#Country_Origin1').addClass(' dropdown');
            $('.IntnlWrkrClass').show();
            $('.YesInternationalWorker').show();
            $('.NoInternationalWorker').hide();
            if (TaskPrefillValues.PrefillValues.Set1.PassportCountry == '2') {
                $('.InternatnlClass').attr("disabled", "true");
            }
            if (taskObj.PassportCountry == '1') {
                $('.PassportCountryNameClass').hide();
                $('#PassportCountryName').removeClass('dropdown');
                OBPager.SetTaskContentMemberValue('PFDeclaration.PassportCountryName', null, '-1', false);
            }
            else if (taskObj.PassportCountry == '2') {
                $('.PassportCountryNameClass').show();
                $('#PassportCountryName').addClass('dropdown');
                OBPager.SetTaskContentMemberValue('PFDeclaration.PassportCountryName', null, taskObj.PassportCountryName, false);
            }
        }
        else if (taskObj.InternationalWorkerYesorNo == '2') {
            $('.YesInternationalWorker').hide();
            $('.NoInternationalWorker').show();
            $('.passportddetails').find('img').hide();
            $('#NoCountry_Origin').attr("disabled", "true").removeClass(' dropdown');
        }
    }
    else if (TaskPrefillValues.PrefillValues.Set1.PassportCountry == '2') {
        OBPager.SetTaskContentMemberValue('PFDeclaration.InternationalWorkerYesorNo', null, TaskPrefillValues.PrefillValues.Set1.InternationalWorkerYesorNo, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.PassportCountry', null, TaskPrefillValues.PrefillValues.Set1.PassportCountry, false);
        if (TaskPrefillValues.PrefillValues.Set1.PassportNo != null && TaskPrefillValues.PrefillValues.Set1.PassportNo != '') {
            OBPager.SetTaskContentMemberValue('PFDeclaration.PassportNo', null, TaskPrefillValues.PrefillValues.Set1.PassportNo, false);
        }
        if (TaskPrefillValues.PrefillValues.Set1.PassportIssueDate != null && TaskPrefillValues.PrefillValues.Set1.PassportIssueDate != '') {
            if (TaskPrefillValues.PrefillValues.Set1.PassportIssueDate == null) {
                var issueDate = null;
                var fromattedissueDate = null;
            }
            else {
                var issueDate = new Date(TaskPrefillValues.PrefillValues.Set1.PassportIssueDate);
                var fromattedissueDate = ((issueDate.getDate() < 10) ? "0" + issueDate.getDate() : issueDate.getDate()) + '/' + ((issueDate.getMonth() < 10) ? "0" + (issueDate.getMonth() + 1) : (issueDate.getMonth() + 1)) + '/' + issueDate.getFullYear();
            }
            OBPager.SetTaskContentMemberValue('PFDeclaration.PassportIssueDate', null, fromattedissueDate, false);
            //OBPager.SetTaskContentMemberValue('PFDeclaration.PassportIssueDate', null, TaskPrefillValues.PrefillValues.Set1.PassportIssueDate, false);
        }
        if (TaskPrefillValues.PrefillValues.Set1.PassportExpiryDate != null && TaskPrefillValues.PrefillValues.Set1.PassportExpiryDate != '') {
            if (TaskPrefillValues.PrefillValues.Set1.PassportExpiryDate == null) {
                var expiryDate = null;
                var fromattedexpiryDate = null;
            }
            else {
                var expiryDate = new Date(TaskPrefillValues.PrefillValues.Set1.PassportExpiryDate);
                var fromattedexpiryDate = ((expiryDate.getDate() < 10) ? "0" + expiryDate.getDate() : expiryDate.getDate()) + '/' + ((expiryDate.getMonth() < 10) ? "0" + (expiryDate.getMonth() + 1) : (expiryDate.getMonth() + 1)) + '/' + expiryDate.getFullYear();
            }
            OBPager.SetTaskContentMemberValue('PFDeclaration.PassportExpiryDate', null, fromattedexpiryDate, false);
            //OBPager.SetTaskContentMemberValue('PFDeclaration.PassportExpiryDate', null, TaskPrefillValues.PrefillValues.Set1.PassportExpiryDate, false);
            $('.passportddetails').find('img').hide();
        }
        else {
            $('#PASSPORT_NUMBER').removeAttr('disabled').addClass('textMandatory');
            $('#PassportIssueDate').removeAttr('disabled').addClass('dateMandatory');
            $('#PassportExpiryDate').removeAttr('disabled').addClass('dateMandatory');
            $('.passportddetails').find('img').show();
        }
        $('#Country_Origin1').addClass(' dropdown');
        $('.IntnlWrkrClass').show();
        $('.YesInternationalWorker').show();
        $('.NoInternationalWorker').hide();
        $('.InternatnlClass').attr("disabled", "true");
        $('.PassportCountryNameClass').show();
        $('#PassportCountryName').addClass('dropdown');
        OBPager.SetTaskContentMemberValue('PFDeclaration.PassportCountryName', null, TaskPrefillValues.PrefillValues.Set1.PassportCountryName, false);
        jQXB.doBind(OBPager.taskContentDSName);

    }

    $('#form_PFscheme').change(function () {
        if ((form_PFscheme.value == '1') || (form_Pension.value == '1')) {
            if (OBPager.taskStatusFlag == -1) {
                if (TaskPrefillValues.PrefillValues.Set1.UANNoYesOrNo == 'Y') {
                    if (TaskPrefillValues.PrefillValues.Set1.UANNo != null && TaskPrefillValues.PrefillValues.Set1.UANNo != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.UANNo', null, TaskPrefillValues.PrefillValues.Set1.UANNo, false);
                    }
                    if (TaskPrefillValues.PrefillValues.Set1.LastPFNo_RC != null && TaskPrefillValues.PrefillValues.Set1.LastPFNo_RC != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_RC', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_RC, false);
                    }
                    if (TaskPrefillValues.PrefillValues.Set1.LastPFNo_OC != null && TaskPrefillValues.PrefillValues.Set1.LastPFNo_OC != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_OC', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_OC, false);
                    }
                    if (TaskPrefillValues.PrefillValues.Set1.LastPFNo_EI != null && TaskPrefillValues.PrefillValues.Set1.LastPFNo_EI != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_EI', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_EI, false);
                    }
                    if (TaskPrefillValues.PrefillValues.Set1.LastPFNo_Ex != null && TaskPrefillValues.PrefillValues.Set1.LastPFNo_Ex != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_Ex', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_Ex, false);
                    }
                    if (TaskPrefillValues.PrefillValues.Set1.LastPFNo_AN != null && TaskPrefillValues.PrefillValues.Set1.LastPFNo_AN != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_AN', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_AN, false);
                    }
                }
                else if (TaskPrefillValues.PrefillValues.Set1.UANNoYesOrNo == 'N' && TaskPrefillValues.PrefillValues.Set1.PFYesOrNo == 'Y') {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.UANNo', null, '', false);
                    if (TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_RC != null && TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_RC != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_RC', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_RC, false);
                    }
                    if (TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_OC != null && TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_OC != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_OC', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_OC, false);
                    }
                    if (TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_EI != null && TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_EI != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_EI', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_EI, false);
                    }
                    if (TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_Ex != null && TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_Ex != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_Ex', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_Ex, false);
                    }
                    if (TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_AN != null && TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_AN != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_AN', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_AN, false);
                    }
                }
                if (taskObj.EarlyPFNoHave == '-1' || taskObj.EarlyPFNoHave == '' || taskObj.EarlyPFNoHave == null) {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNoHave', null, TaskPrefillValues.PrefillValues.Set1.EarlyPFNoHave, false);
                }
                jQXB.doBind(OBPager.taskContentDSName);
                if (taskObj.EarlyPFNoYesOrNo == '-1' || taskObj.EarlyPFNoYesOrNo == '' || taskObj.EarlyPFNoYesOrNo == null) {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNoYesOrNo', null, '-1', false);
                }
                addValuesPFScheme();
            }
            else if (OBPager.taskStatusFlag != -1) {
                if (TaskPrefillValues.PrefillValues.Set1.UANNo != null && TaskPrefillValues.PrefillValues.Set1.UANNo != '') {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.UANNo', null, TaskPrefillValues.PrefillValues.Set1.UANNo, false);
                }
                if (TaskPrefillValues.PrefillValues.Set1.LastPFNo_RC != null && TaskPrefillValues.PrefillValues.Set1.LastPFNo_RC != '') {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_RC', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_RC, false);
                }
                if (TaskPrefillValues.PrefillValues.Set1.LastPFNo_OC != null && TaskPrefillValues.PrefillValues.Set1.LastPFNo_OC != '') {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_OC', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_OC, false);
                }
                if (TaskPrefillValues.PrefillValues.Set1.LastPFNo_EI != null && TaskPrefillValues.PrefillValues.Set1.LastPFNo_EI != '') {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_EI', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_EI, false);
                }
                if (TaskPrefillValues.PrefillValues.Set1.LastPFNo_Ex != null && TaskPrefillValues.PrefillValues.Set1.LastPFNo_Ex != '') {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_Ex', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_Ex, false);
                }
                if (TaskPrefillValues.PrefillValues.Set1.LastPFNo_AN != null && TaskPrefillValues.PrefillValues.Set1.LastPFNo_AN != '') {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_AN', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_AN, false);
                }
                else if (TaskPrefillValues.PrefillValues.Set1.UANNoYesOrNo == 'N' && TaskPrefillValues.PrefillValues.Set1.PFYesOrNo == 'Y') {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.UANNo', null, '', false);
                    if (TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_RC != null && TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_RC != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_RC', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_RC, false);
                    }
                    if (TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_OC != null && TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_OC != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_OC', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_OC, false);
                    }
                    if (TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_EI != null && TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_EI != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_EI', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_EI, false);
                    }
                    if (TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_Ex != null && TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_Ex != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_Ex', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_Ex, false);
                    }
                    if (TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_AN != null && TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_AN != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_AN', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_AN, false);
                    }
                }
                if (taskObj.EarlyPFNoHave == '-1' || taskObj.EarlyPFNoHave == '' || taskObj.EarlyPFNoHave == null) {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNoHave', null, TaskPrefillValues.PrefillValues.Set1.EarlyPFNoHave, false);
                }
                if (taskObj.EarlyPFNoYesOrNo == '-1' || taskObj.EarlyPFNoYesOrNo == '' || taskObj.EarlyPFNoYesOrNo == null) {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNoYesOrNo', null, TaskPrefillValues.PrefillValues.Set1.EarlyPFNoYesOrNo, false);
                }
                addValuesPFScheme();
            }
        }
        else if ((form_PFscheme.value == '2') && (form_Pension.value == '2')) {
            $('.NAPFclass').show();
            removeValuesPFScheme();
        }
        else if ((form_PFscheme.value != '1') && (form_Pension.value != '1')) {
            removeValuesPFScheme();
        }
    });

    $('#form_Pension').change(function () {
        if ((form_PFscheme.value == '1') || (form_Pension.value == '1')) {
            if (OBPager.taskStatusFlag == -1) {
                if (TaskPrefillValues.PrefillValues.Set1.UANNoYesOrNo == 'Y') {
                    if (TaskPrefillValues.PrefillValues.Set1.UANNo != null && TaskPrefillValues.PrefillValues.Set1.UANNo != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.UANNo', null, TaskPrefillValues.PrefillValues.Set1.UANNo, false);
                    }
                    if (TaskPrefillValues.PrefillValues.Set1.LastPFNo_RC != null && TaskPrefillValues.PrefillValues.Set1.LastPFNo_RC != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_RC', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_RC, false);
                    }
                    if (TaskPrefillValues.PrefillValues.Set1.LastPFNo_OC != null && TaskPrefillValues.PrefillValues.Set1.LastPFNo_OC != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_OC', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_OC, false);
                    }
                    if (TaskPrefillValues.PrefillValues.Set1.LastPFNo_EI != null && TaskPrefillValues.PrefillValues.Set1.LastPFNo_EI != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_EI', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_EI, false);
                    }
                    if (TaskPrefillValues.PrefillValues.Set1.LastPFNo_Ex != null && TaskPrefillValues.PrefillValues.Set1.LastPFNo_Ex != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_Ex', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_Ex, false);
                    }
                    if (TaskPrefillValues.PrefillValues.Set1.LastPFNo_AN != null && TaskPrefillValues.PrefillValues.Set1.LastPFNo_AN != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_AN', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_AN, false);
                    }
                }
                else if (TaskPrefillValues.PrefillValues.Set1.UANNoYesOrNo == 'N' && TaskPrefillValues.PrefillValues.Set1.PFYesOrNo == 'Y') {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.UANNo', null, '', false);
                    if (TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_RC != null && TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_RC != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_RC', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_RC, false);
                    }
                    if (TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_OC != null && TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_OC != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_OC', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_OC, false);
                    }
                    if (TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_EI != null && TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_EI != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_EI', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_EI, false);
                    }
                    if (TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_Ex != null && TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_Ex != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_Ex', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_Ex, false);
                    }
                    if (TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_AN != null && TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_AN != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_AN', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_AN, false);
                    }
                }
                if (taskObj.EarlyPFNoHave == '-1' || taskObj.EarlyPFNoHave == '' || taskObj.EarlyPFNoHave == null) {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNoHave', null, TaskPrefillValues.PrefillValues.Set1.EarlyPFNoHave, false);
                }
                // jQXB.doBind(OBPager.taskContentDSName);
                if (taskObj.EarlyPFNoYesOrNo == '-1' || taskObj.EarlyPFNoYesOrNo == '' || taskObj.EarlyPFNoYesOrNo == null) {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNoYesOrNo', null, TaskPrefillValues.PrefillValues.Set1.EarlyPFNoYesOrNo, false);
                }
                addValuesPFScheme();
            }
            else if (OBPager.taskStatusFlag != -1) {
                if (TaskPrefillValues.PrefillValues.Set1.UANNo != null && TaskPrefillValues.PrefillValues.Set1.UANNo != '') {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.UANNo', null, TaskPrefillValues.PrefillValues.Set1.UANNo, false);
                }
                if (TaskPrefillValues.PrefillValues.Set1.LastPFNo_RC != null && TaskPrefillValues.PrefillValues.Set1.LastPFNo_RC != '') {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_RC', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_RC, false);
                }
                if (TaskPrefillValues.PrefillValues.Set1.LastPFNo_OC != null && TaskPrefillValues.PrefillValues.Set1.LastPFNo_OC != '') {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_OC', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_OC, false);
                }
                if (TaskPrefillValues.PrefillValues.Set1.LastPFNo_EI != null && TaskPrefillValues.PrefillValues.Set1.LastPFNo_EI != '') {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_EI', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_EI, false);
                }
                if (TaskPrefillValues.PrefillValues.Set1.LastPFNo_Ex != null && TaskPrefillValues.PrefillValues.Set1.LastPFNo_Ex != '') {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_Ex', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_Ex, false);
                }
                if (TaskPrefillValues.PrefillValues.Set1.LastPFNo_AN != null && TaskPrefillValues.PrefillValues.Set1.LastPFNo_AN != '') {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_AN', null, TaskPrefillValues.PrefillValues.Set1.LastPFNo_AN, false);
                }
                else if (TaskPrefillValues.PrefillValues.Set1.UANNoYesOrNo == 'N' && TaskPrefillValues.PrefillValues.Set1.PFYesOrNo == 'Y') {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.UANNo', null, '', false);
                    if (TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_RC != null && TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_RC != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_RC', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_RC, false);
                    }
                    if (TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_OC != null && TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_OC != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_OC', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_OC, false);
                    }
                    if (TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_EI != null && TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_EI != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_EI', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_EI, false);
                    }
                    if (TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_Ex != null && TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_Ex != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_Ex', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_Ex, false);
                    }
                    if (TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_AN != null && TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_AN != '') {
                        OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_AN', null, TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_AN, false);
                    }
                }
                //jQXB.doBind(OBPager.taskContentDSName);
                if (taskObj.EarlyPFNoHave == '-1' || taskObj.EarlyPFNoHave == '' || taskObj.EarlyPFNoHave == null) {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNoHave', null, TaskPrefillValues.PrefillValues.Set1.EarlyPFNoHave, false);
                }
                if (taskObj.EarlyPFNoYesOrNo == '-1' || taskObj.EarlyPFNoYesOrNo == '' || taskObj.EarlyPFNoYesOrNo == null) {
                    OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNoYesOrNo', null, TaskPrefillValues.PrefillValues.Set1.EarlyPFNoYesOrNo, false);
                }
                addValuesPFScheme();
            }
        }
        else if ((form_PFscheme.value == '2') && (form_Pension.value == '2')) {
            $('.NAPFclass').show();
            removeValuesPFScheme();
        }
        else if ((form_PFscheme.value != '1') && (form_Pension.value != '1')) {
            removeValuesPFScheme();
        }
    });

    $('#InternationalWorkerYesorNo').change(function () {
        if (InternationalWorkerYesorNo.value == '1') {
            $('.NoInternationalWorker').hide();
            $('.YesInternationalWorker').show();
            $('#Country_Origin1').removeAttr('disabled').addClass(' dropdown');
            $('#PASSPORT_NUMBER').removeAttr('disabled').addClass('textMandatory');
            $('#PassportIssueDate').removeAttr('disabled').addClass('dateMandatory');
            $('#PassportExpiryDate').removeAttr('disabled').addClass('dateMandatory');
            $('.passportddetails').find('img').show();
            OBPager.SetTaskContentMemberValue('PFDeclaration.PassportCountry', null, TaskPrefillValues.PrefillValues.Set1.PassportCountry, false);
            //            $('.PASSPORT_Validity').find('img').show();
            if (TaskPrefillValues.PrefillValues.Set1.PassportCountry == '2') {
                OBPager.SetTaskContentMemberValue('PFDeclaration.PassportCountryName', null, TaskPrefillValues.PrefillValues.Set1.PassportCountryName, false);
                //                $('.IntnlWrkrClass1').show();
                $('.PassportCountryNameClass').show();
                $('#PassportCountryName').addClass('dropdown');
            }
            $('.IntnlWrkrClass').show();
            OBPager.SetTaskContentMemberValue('PFDeclaration.PassportNo', null, TaskPrefillValues.PrefillValues.Set1.PassportNo, false);
            if (TaskPrefillValues.PrefillValues.Set1.PassportIssueDate == null) {
                var issueDate = null;
                var fromattedissueDate = null;
            }
            else {
                var issueDate = new Date(TaskPrefillValues.PrefillValues.Set1.PassportIssueDate);
                var fromattedissueDate = ((issueDate.getDate() < 10) ? "0" + issueDate.getDate() : issueDate.getDate()) + '/' + ((issueDate.getMonth() < 10) ? "0" + (issueDate.getMonth() + 1) : (issueDate.getMonth() + 1)) + '/' + issueDate.getFullYear();
            }
            OBPager.SetTaskContentMemberValue('PFDeclaration.PassportIssueDate', null, fromattedissueDate, false);
            if (TaskPrefillValues.PrefillValues.Set1.PassportExpiryDate == null) {
                var expiryDate = null;
                var fromattedexpiryDate = null;
            }
            //OBPager.SetTaskContentMemberValue('PFDeclaration.PassportIssueDate', null, TaskPrefillValues.PrefillValues.Set1.PassportIssueDate, false);
            else {
                var expiryDate = new Date(TaskPrefillValues.PrefillValues.Set1.PassportExpiryDate);
                var fromattedexpiryDate = ((expiryDate.getDate() < 10) ? "0" + expiryDate.getDate() : expiryDate.getDate()) + '/' + ((expiryDate.getMonth() < 10) ? "0" + (expiryDate.getMonth() + 1) : (expiryDate.getMonth() + 1)) + '/' + expiryDate.getFullYear();
            }
            OBPager.SetTaskContentMemberValue('PFDeclaration.PassportExpiryDate', null, fromattedexpiryDate, false);
            //OBPager.SetTaskContentMemberValue('PFDeclaration.PassportExpiryDate', null, TaskPrefillValues.PrefillValues.Set1.PassportExpiryDate, false);

            //            jQXB.doBind(OBPager.taskContentDSName);
        }
        else {
            if (InternationalWorkerYesorNo.value == '2') {
                $('.YesInternationalWorker').hide();
                $('.NoInternationalWorker').show();
                $('#NoCountry_Origin').attr("disabled", "true").removeClass(' dropdown');
            }
            $('#Country_Origin1').attr("disabled", "true").removeClass(' dropdown');
            $('#PASSPORT_NUMBER').attr("disabled", "true").removeClass('textMandatory');
            $('#PassportIssueDate').attr("disabled", "true").removeClass('dateMandatory');
            $('#PassportExpiryDate').attr("disabled", "true").removeClass('dateMandatory');
            $('.passportddetails').find('img').hide();
            $('.PassportCountryNameClass').hide();
            $('#PassportCountryName').removeClass('dropdown');
            $('.IntnlWrkrClass').hide();
            OBPager.SetTaskContentMemberValue('PFDeclaration.PassportCountry', null, '-1', false);
            OBPager.SetTaskContentMemberValue('PFDeclaration.PassportCountryName', null, '-1', false);
            OBPager.SetTaskContentMemberValue('PFDeclaration.PassportNo', null, '', false);
            OBPager.SetTaskContentMemberValue('PFDeclaration.PassportIssueDate', null, '', false);
            OBPager.SetTaskContentMemberValue('PFDeclaration.PassportExpiryDate', null, '', false);
            //            jQXB.doBind(OBPager.taskContentDSName);
        }
    });

    $('#Country_Origin1').change(function () {
        if ($('#Country_Origin1').val() == '2') {
            $('.IntnlWrkrClass1').show();
            $('.PassportCountryNameClass').show();
            $('#PassportCountryName').addClass('dropdown');
        }
        else {
            $('.PassportCountryNameClass').hide();
            $('#PassportCountryName').removeClass('dropdown');
        }

    });
    //    $('#PrevPFhave').change(function () {
    //        if ($('#PrevPFhave').val() != -1) {
    //            $('#PreviousPFStatus').removeAttr('disabled');
    //            OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNoHave', null, $('#PrevPFhave').val(), false);
    //            OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNoYesOrNo', null, $('#PreviousPFStatus').val(), false);
    //        }
    //        else {
    //            $('#PreviousPFStatus').attr("disabled", "true");
    //        }
    //    });

    $('#IsDisabledId').change(function () {
        if (IsDisabledId.value == '1') {
            $('#DisableCategory').addClass('dropdown');
            $('.DisableCategoryClass').removeAttr('disabled');
            $('#DisableCategory').removeAttr('disabled');
            $('.DisableCategoryClass').show();
            $('#IsDisabledId').removeAttr('disabled');


        }
        else if (IsDisabledId.value == '2') {
            $('#DisableCategory').removeClass('dropdown');
            OBPager.SetTaskContentMemberValue('PFDeclaration.IfYesLocorVisorHearing', null, '', false);
            $('#DisableCategory').val('-1');
            $('.DisableCategoryClass').hide();
        }
    });

    $(".pfreionalcode").keydown(function (event) {
        // Allow only backspace and delete 
        var obj = $(this).attr("id");
        var th = $("#" + obj).val().length;
        var p = $("#" + obj).val();
        var char = String.fromCharCode(event.which);
        if (th < 2) {
            // Allow only backspace and delete 
            if (event.keyCode == 9 || event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 20 || event.keyCode == 32 || event.keyCode == 88 || event.keyCode == 86 || event.keyCode == 67 || event.keyCode == 37 || event.keyCode == 39) {
            }
            else {
                if (event.keyCode < 65 || event.keyCode > 90) {
                    event.preventDefault();
                }
                else {
                    event.preventDefault();
                    $("#" + obj).val(p + char.toUpperCase());
                }
            }
        }
        if ($('#form_PFno_RC').val() != null || $('#form_PFno_RC').val() != "") {
            OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_RC', null, $('#form_PFno_RC').val(), false);
        }
        if ($('#form_PFno_OC').val() != null || $('#form_PFno_OC').val() != "") {
            OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_OC', null, $('#form_PFno_OC').val(), false);
        }
        if ($('#form_EarlyPFNo_RC').val() != null || $('#form_EarlyPFNo_RC').val() != "") {
            OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNo_RC', null, $('#form_EarlyPFNo_RC').val(), false);
        }
        if ($('#form_EarlyPFNo_OC').val() != null || $('#form_EarlyPFNo_OC').val() != "") {
            OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNo_OC', null, $('#form_EarlyPFNo_OC').val(), false);
        }

    });

    $(".pfocode").keydown(function (event) {
        // Allow only backspace and delete 
        var obj = $(this).attr("id");
        var th = $("#" + obj).val().length;
        var p = $("#" + obj).val();
        var char = String.fromCharCode(event.which);
        if (th < 3) {

            // Allow only backspace and delete 
            if (event.keyCode == 9 || event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 20 || event.keyCode == 32 || event.keyCode == 88 || event.keyCode == 86 || event.keyCode == 67 || event.keyCode == 37 || event.keyCode == 39) {
            }
            else {
                if (event.keyCode < 65 || event.keyCode > 90) {
                    event.preventDefault();
                }
                else {
                    event.preventDefault();
                    $("#" + obj).val(p + char.toUpperCase());
                }
            }

        }
        if ($('#form_PFno_RC').val() != null || $('#form_PFno_RC').val() != "") {
            OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_RC', null, $('#form_PFno_RC').val(), false);
        }
        if ($('#form_PFno_OC').val() != null || $('#form_PFno_OC').val() != "") {
            OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_OC', null, $('#form_PFno_OC').val(), false);
        }
        if ($('#form_EarlyPFNo_RC').val() != null || $('#form_EarlyPFNo_RC').val() != "") {
            OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNo_RC', null, $('#form_EarlyPFNo_RC').val(), false);
        }
        if ($('#form_EarlyPFNo_OC').val() != null || $('#form_EarlyPFNo_OC').val() != "") {
            OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNo_OC', null, $('#form_EarlyPFNo_OC').val(), false);
        }

    });

});

$(function () {
    $(".jQrydatepicker").datepicker({ dateFormat: 'dd/mm/yy', buttonText: 'Open calendar',
        yearRange: "-62:+0",
        maxDate: "0",
        showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    });

    $(".jQryExpdate").datepicker({ dateFormat: 'dd/mm/yy', buttonText: 'Open calendar',
        yearRange: "0:+700",
        minDate: "0",
        showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    });
    $(".jQryLastdate").datepicker({ dateFormat: 'dd/mm/yy', buttonText: 'Open calendar',
        yearRange: "-100:+700",
        showOn: "both", buttonImage: "../../../../Images/calendar.png", changeMonth: true, changeYear: true, buttonAfter: false
    });
});

function addValuesPFScheme() {
    if (TaskPrefillValues.PrefillValues.Set1.UANNo == null) {
        $('#UANNo').addClass('onlyNumeric');
        $('#UANNo').removeAttr('disabled');
    }
    if ((TaskPrefillValues.PrefillValues.Set1.LastPFNo_RC == null || TaskPrefillValues.PrefillValues.Set1.LastPFNo_OC == null || TaskPrefillValues.PrefillValues.Set1.LastPFNo_EI == null || TaskPrefillValues.PrefillValues.Set1.LastPFNo_Ex == null || TaskPrefillValues.PrefillValues.Set1.LastPFNo_AN == null) && (TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_RC == null || TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_OC == null || TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_EI == null || TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_Ex == null || TaskPrefillValues.PrefillValues.Set1.EarlyLastPFNo_AN == null)) {
        $('#form_PFno_RC').removeAttr('disabled').addClass('textMandatory');
        $('#form_PFno_OC').removeAttr('disabled').addClass('textMandatory');
        $('#form_PFno_EI').removeAttr('disabled').addClass('textMandatory');
        $('#form_PFno_Ex').removeAttr('disabled').addClass('textMandatory');
        $('#form_PFno_AN').removeAttr('disabled').addClass('textMandatory');
    }

    $('#form_EarlyPFNo_RC').removeAttr('disabled');
    $('#form_EarlyPFNo_OC').removeAttr('disabled');
    $('#form_EarlyPFNo_EI').removeAttr('disabled');
    $('#form_EarlyPFNo_Ex').removeAttr('disabled');
    $('#form_EarlyPFNo_AN').removeAttr('disabled');
    $('#Scheme_Certificate').removeAttr('disabled');
    $('#PPO_Number').removeAttr('disabled');
    $('#PrevPensionNo').removeAttr('disabled');
    $('#PMemberIDDate').removeAttr('disabled');
    $('#PMemberIDDate').addClass('textMandatory');
    $('#PreviousPFStatus').removeAttr('disabled').addClass('dropdown');
    $('#PrevPFNo').removeAttr('disabled');
    $('#PrevPFhave').removeAttr('disabled').addClass('dropdown');
    $('.PFNoclass').show();
    $('.NAPFclass').hide();
    $('.NAPFCLASStext').show();
    $('.pfnumberclass').find('img').show();
}

function removeValuesPFScheme() {
    $('#UANNo').val('');
    $('#form_PFno_RC').val('');
    $('#form_PFno_OC').val('');
    $('#form_PFno_EI').val('');
    $('#form_PFno_Ex').val('');
    $('#form_PFno_AN').val('');
    $('#form_EarlyPFNo_RC').val('');
    $('#form_EarlyPFno_OC').val('');
    $('#form_EarlyPFno_EI').val('');
    $('#form_EarlyPFno_Ex').val('');
    $('#form_EarlyPFno_AN').val('');
    $('#PrevPensionNo').val('');
    $('#PrevPensionNo').val('');
    $('#PrevPensionNo').val('');
    clearvaluesPF();

    // if (TaskPrefillValues.PrefillValues.Set1.LastPFNo_RC == null || TaskPrefillValues.PrefillValues.Set1.LastPFNo_OC == null || TaskPrefillValues.PrefillValues.Set1.LastPFNo_EI == null || TaskPrefillValues.PrefillValues.Set1.LastPFNo_Ex == null || TaskPrefillValues.PrefillValues.Set1.LastPFNo_AN == null) {
    $('#form_PFno_RC').attr("disabled", "true").removeClass('textMandatory');
    $('#form_PFno_OC').attr("disabled", "true").removeClass('textMandatory');
    $('#form_PFno_EI').attr("disabled", "true").removeClass('textMandatory');
    $('#form_PFno_Ex').attr("disabled", "true").removeClass('textMandatory');
    $('#form_PFno_AN').attr("disabled", "true").removeClass('textMandatory');
    // }
    $('#Scheme_Certificate').attr("disabled", "true");
    $('#form_EarlyPFNo_RC').attr("disabled", "true");
    $('#form_EarlyPFNo_OC').attr("disabled", "true");
    $('#form_EarlyPFNo_EI').attr("disabled", "true");
    $('#form_EarlyPFNo_Ex').attr("disabled", "true");
    $('#form_EarlyPFNo_AN').attr("disabled", "true");
    $('#PPO_Number').attr("disabled", "true");
    $('#PrevPFNo').attr("disabled", "true");
    $('#PrevPFhave').attr("disabled", "true").removeClass('dropdown');
    $('#PreviousPFStatus').attr("disabled", "true").removeClass('dropdown');
    $('#PMemberIDDate').attr("disabled", "true");
    $('#PrevPensionNo').attr("disabled", "true");
    $('#UANNo').attr("disabled", "true");
    $('#PMemberIDDate').removeClass('textMandatory');
    $('#UANNo').removeClass('onlyNumeric');
    if ((form_PFscheme.value == '2') && (form_Pension.value == '2')) {
        $('.NAPFCLASStext').hide();
    }
    $('.PFNoclass').hide();
    $('.pfnumberclass').find('img').hide();
}
function clearvaluesPF() {
    OBPager.SetTaskContentMemberValue('PFDeclaration.UANNo', null, '', false);
    OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_RC', null, '', false);
    OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_OC', null, '', false);
    OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_EI', null, '', false);
    OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_Ex', null, '', false);
    OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_AN', null, '', false);
    OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNoHave', null, '', false);
    OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNoYesOrNo', null, '', false);
    OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNo_RC', null, '', false);
    OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNo_OC', null, '', false);
    OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNo_EI', null, '', false);
    OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNo_Ex', null, '', false);
    OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNo_AN', null, '', false);
    OBPager.SetTaskContentMemberValue('PFDeclaration.DateofExit', null, '', false);
    OBPager.SetTaskContentMemberValue('PFDeclaration.PrevPensionNo', null, '', false);
    OBPager.SetTaskContentMemberValue('PFDeclaration.PreviousSchemaCertificateNo', null, '', false);
    OBPager.SetTaskContentMemberValue('PFDeclaration.PPONumber', null, '', false);
}

function formatPFNum(obj1) {
    var id1 = $(obj1).attr("id");
    var obj2 = $("#" + id1);
    var val1 = obj2.val();
    var j = 0;
    obj2.val('');
    if (val1.length != 0) {
        var padding1 = '';
        if (id1 == 'form_PFno_Ex' || id1 == 'form_EarlyPFNo_Ex')
            j = 3;
        else
            j = 7;


        for (var a = val1.length; a < j; a++) {
            padding1 += '0';
        }
        //$(this).val(padding1 + $(this).val());
        //$('#form_PFno_EI').val(padding1 + val1);
        if (id1 == 'form_PFno_Ex') {
            $('#form_PFno_Ex').val(padding1 + val1);
            OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_Ex', null, $('#form_PFno_Ex').val(), false);
        }
        else if (id1 == 'form_PFno_EI') {
            $('#form_PFno_EI').val(padding1 + val1);
            OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_EI', null, $('#form_PFno_EI').val(), false);
        }
        else if (id1 == 'form_PFno_AN') {
            $('#form_PFno_AN').val(padding1 + val1);
            OBPager.SetTaskContentMemberValue('PFDeclaration.LastPFNo_AN', null, $('#form_PFno_AN').val(), false);
        }
        else if (id1 == 'form_EarlyPFNo_EI') {
            $('#form_EarlyPFNo_EI').val(padding1 + val1);
            OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNo_EI', null, $('#form_EarlyPFNo_EI').val(), false);
        }
        else if (id1 == 'form_EarlyPFNo_Ex') {
            $('#form_EarlyPFNo_Ex').val(padding1 + val1);
            OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNo_Ex', null, $('#form_EarlyPFNo_Ex').val(), false);
        }
        else if (id1 == 'form_EarlyPFNo_AN') {
            $('#form_EarlyPFNo_AN').val(padding1 + val1);
            OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNo_AN', null, $('#form_EarlyPFNo_AN').val(), false);
        }
    }
}

function Cleartext(obj1) {
    //    this = obj1.id; 
    var id = $(obj1).attr("id");
    var obj = $("#" + id);
    if (obj.val() == 'Expiry Date') {
        obj.val('');
    }
    else if (obj.val() == 'IFSC Code') {

        obj.val('');
    }
    obj.css({
        "color": "black"
    });
}

function submitcallback(value) {
    try {
        if (value) {
            if (OBPager.SaveTaskData(1) == true) {

                return true;
            }
            else {
                return false;
            }

        }
        else {

            return false;
        }


    }
    catch (e) { }
}

function SaveTaskData(saveMode) {
    if (!(TaskPrefillValues.PrefillValues.Set1.Prefix == '6' || TaskPrefillValues.PrefillValues.Set1.Prefix == '7' || TaskPrefillValues.PrefillValues.Set1.Prefix == '8')) {
        alert('Please change the Prefix value in Personal Details form');
    }
    if (form_Pension.value == '' || form_Pension.value == null) {

        OBPager.SetTaskContentMemberValue('PFDeclaration.EarlierPension1995YesOrNo', null, '-1', false);
        jQXB.doBind(OBPager.taskContentDSName);
    }
    if (InternationalWorkerYesorNo.value == '-1') {
        $('#InternationalWorkerYesorNo').removeClass('dropdown');
    }
    if (TaskPrefillValues.PrefillValues.Set1.IsDisabled == '1' && (TaskPrefillValues.PrefillValues.Set1.IfYesLocorVisorHearing == '' || TaskPrefillValues.PrefillValues.Set1.IfYesLocorVisorHearing == null)) {
        alert('Please select the "are you differently abled" value in personal details form');
    }
    if (TaskPrefillValues.PrefillValues.Set1.IsDisabled == '2') {
        OBPager.SetTaskContentMemberValue('PFDeclaration.IfYesLocorVisorHearing', null, '', false);
        $('#DisableCategory').removeClass('dropdown');
    }
    else if (IsDisabled.value == 2) {
        OBPager.SetTaskContentMemberValue('PFDeclaration.IfYesLocorVisorHearing', null, '', false);
        $('#DisableCategory').removeClass('dropdown');
    }
    if ((form_PFscheme.value == '2') && (form_Pension.value == '2')) {
        clearvaluesPF();
    }
    OBPager.SetTaskContentMemberValue('PFDeclaration.DOB', null, TaskPrefillValues.PrefillValues.Set1.DOB, false);
    OBPager.SetTaskContentMemberValue('PFDeclaration.kycflag', null, kycflag, false);
    // saveMode { 0:Save, 1:Submit }
    if (saveMode == 1) {

        if (validate.ValidateSubmit() == true) {
            if (OBPager.ValidateTaskData(saveMode) == true) {
                try {
                    MsgboxConfirm(sessionId, 6, 224, 'Ind_PFDeclaration_Submit', "<p style=line-height:20px;>I agree that the information provided in the form will not be Edited/Altered on the day of joining and such actions will not be considered. </p><p style=height:10px;></p> <p style=line-height:20px;>Note: Please carry the duly signed Form on your date of joining. This form will be part of Joining Booklet which will be available for print on completion of all Joining formalities.</p><p style=height:10px;></p><p style=line-height:20px;>On the date of joining please carry self-attested photocopies of the documents mentioned in the KYC details </b> as they must be attached with this form.</p>", submitcallback);
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
    else {

        try {
            if (OBPager.SaveTaskData(saveMode) == true) {

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

function ResetTaskData() {
    OBPager.ResetTaskContent();

    if (OBPager.taskStatusFlag == -1) {
        // Set member value manually
        if (TaskPrefillValues.PrefillValues.Set1.IsDisabled == '1') {
            $('#DisableCategory').addClass('dropdown');
            $('#DisableCategory').attr("disabled", "true");
            $('.DisableCategoryClass').show();
        }
        OBPager.SetTaskContentMemberValue('PFDeclaration.Prefix', null, TaskPrefillValues.PrefillValues.Set1.Prefix, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.Name', null, TaskPrefillValues.PrefillValues.Set1.Name, false);

        if (TaskPrefillValues.PrefillValues.Set1.DOB == null) {
            var dateofbirth = null;
            var fromatteddateofbirth = null;
        }
        else {
            var dateofbirth = new Date(TaskPrefillValues.PrefillValues.Set1.DOB);
            var fromatteddateofbirth = ((dateofbirth.getDate() < 10) ? "0" + dateofbirth.getDate() : dateofbirth.getDate()) + '/' + ((dateofbirth.getMonth() < 10) ? "0" + (dateofbirth.getMonth() + 1) : (dateofbirth.getMonth() + 1)) + '/' + dateofbirth.getFullYear();
        }
        OBPager.SetTaskContentMemberValue('PFDeclaration.DOB', null, fromatteddateofbirth, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.PrefixFather', null, TaskPrefillValues.PrefillValues.Set1.PrefixFather, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.FatherName', null, TaskPrefillValues.PrefillValues.Set1.FatherName, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.FatherRelation', null, TaskPrefillValues.PrefillValues.Set1.FatherRelation, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.Gender', null, TaskPrefillValues.PrefillValues.Set1.Gender, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.MaritalStatus', null, TaskPrefillValues.PrefillValues.Set1.MaritalStatus, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.IsDisabled', null, TaskPrefillValues.PrefillValues.Set1.IsDisabled, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.IfYesLocorVisorHearing', null, TaskPrefillValues.PrefillValues.Set1.IfYesLocorVisorHearing, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.kycPANNumber', null, TaskPrefillValues.PrefillValues.Set1.kycPANNumber, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.kycPANName', null, TaskPrefillValues.PrefillValues.Set1.kycPANName, false);
        if (TaskPrefillValues.PrefillValues.Set1.Date == null) {
            var today = null;
            var fromattedDate = null;
        }
        else {
            var today = new Date(TaskPrefillValues.PrefillValues.Set1.Date);
            var fromattedDate = ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate()) + '/' + ((today.getMonth() < 10) ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '/' + today.getFullYear();
        }
        OBPager.SetTaskContentMemberValue('PFDeclaration.Date', null, fromattedDate, false);
        //OBPager.SetTaskContentMemberValue('PFDeclaration.Date', null, TaskPrefillValues.PrefillValues.Set1.Date, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.kycPASSPORTName', null, TaskPrefillValues.PrefillValues.Set1.kycPASSPORTName, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.kycPASSPORTNumber', null, TaskPrefillValues.PrefillValues.Set1.kycPASSPORTNumber, false);
        if (TaskPrefillValues.PrefillValues.Set1.PassportExpiryDate == null) {
            var expiryDate = null;
            var fromattedexpiryDate = null;
        }
        else {
            var expiryDate = new Date(TaskPrefillValues.PrefillValues.Set1.PassportExpiryDate);
            var fromattedexpiryDate = ((expiryDate.getDate() < 10) ? "0" + expiryDate.getDate() : expiryDate.getDate()) + '/' + ((expiryDate.getMonth() < 10) ? "0" + (expiryDate.getMonth() + 1) : (expiryDate.getMonth() + 1)) + '/' + expiryDate.getFullYear();
        }
        OBPager.SetTaskContentMemberValue('PFDeclaration.kycPASSPORTRemarks', null, fromattedexpiryDate, false);

        //OBPager.SetTaskContentMemberValue('PFDeclaration.kycPASSPORTRemarks', null, TaskPrefillValues.PrefillValues.Set1.kycPASSPORTRemarks, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.EarlierPFscheme1952YesOrNo', null, TaskPrefillValues.PrefillValues.Set1.EarlierPFscheme1952YesOrNo, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.EarlierPension1995YesOrNo', null, TaskPrefillValues.PrefillValues.Set1.EarlierPension1995YesOrNo, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.InternationalWorkerYesorNo', null, TaskPrefillValues.PrefillValues.Set1.InternationalWorkerYesorNo, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.EducationQualification', null, TaskPrefillValues.PrefillValues.Set1.EducationQualification, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNoYesOrNo', null, TaskPrefillValues.PrefillValues.Set1.EarlyPFNoYesOrNo, false);
        OBPager.SetTaskContentMemberValue('PFDeclaration.EarlyPFNoYesOrNo', null, TaskPrefillValues.PrefillValues.Set1.EarlyPFNoYesOrNo, false);
    }
    jQXB.doBind(OBPager.taskContentDSName); //Do a data bind finally
    if (OBPager.taskStatusFlag == -1) {
        if (TaskPrefillValues.PrefillValues.Set1.PassportExpiryDate != null) {
            var expiryDate = new Date(TaskPrefillValues.PrefillValues.Set1.PassportExpiryDate);
            var fromattedexpiryDate = ((expiryDate.getDate() < 10) ? "0" + expiryDate.getDate() : expiryDate.getDate()) + '/' + ((expiryDate.getMonth() < 10) ? "0" + (expiryDate.getMonth() + 1) : (expiryDate.getMonth() + 1)) + '/' + expiryDate.getFullYear();
            OBPager.SetTaskContentMemberValue('PFDeclaration.kycPASSPORTRemarks', null, fromattedexpiryDate, false);
            $('#PassportExpiredDate').val(fromattedexpiryDate);
        }
        else {

            $('#PassportExpiredDate').css({
                "color": "grey"
            });
            $('#PassportExpiredDate').val('Expiry Date');

        }
        if ($('#BankAccountRemarks').val() != "") {
            $('#BankAccountRemarks').val(TaskPrefillValues.PrefillValues.Set1.BankAccountRemarks);
        }
        else {

            $('#BankAccountRemarks').css({
                "color": "grey"
            });
            $('#BankAccountRemarks').val('IFSC Code');

        }
        if ($('#DRIVINGLicenceRemarks').val() != "") {
            $('#DRIVINGLicenceRemarks').val(TaskPrefillValues.PrefillValues.Set1.DRIVINGLicenceRemarks);
        }
        else {

            $('#DRIVINGLicenceRemarks').css({
                "color": "grey"
            });
            $('#DRIVINGLicenceRemarks').val('Expiry Date');

        }
    }
}






/* 
************************************************
OnBoarding BGV Component helper
************************************************
Author: 260947
Date: 2012-Dec-03
Purpose: Methods related to BGV component module
************************************************
*/
var CisComponentXml = {};
var BaseCisComponentObj = {};
//var BaseCisComponentLogObj = {};
var SavedCanddiateComponentData = {};
/***********************
* Component Handler *
************************/
var BGVComponentHandler = {
    serviceURL: "../../FormsService.aspx",
    isComponentInfoAvailable: 0,
    componentType: 0, /* 1-Education;2-Employment; */
    componentRootNode: '',
    dsDataLog: 'LogData',
    onPostAddComponent: '',
    onPostDeleteComponent: '',
    componentCount: 0,
    //pgDocListDOM: {},
    //pgDocListDOMJson: {},
    pgDocListDoMArray: [],
    componentList: [],
    ComponentXml: [],
    /* componentsAlreadyAvailable: [],
    componentsNewlyAdded: [],
    componentsDeleted: [],*/
    suspectCount: 0,

    validationStatus: '',
    validationMessage: '',
    validationSet: '',
    retSaveStatus: 0,
    retSaveDetails: '',
    hrssSaveStatus: 0,
    candidateSaveStatus: 0,
    cisStatus: 0,
    isAssignedToVendor: 0,

    /***********************
    * Component Event Handlers *
    ************************/
    InvokeMethod: function (methodName) {
        try {
            var target = methodName;
            if (window[target] != undefined) {
                if (typeof window[target] === 'function') {
                    return window[target]();
                }
            }
        } catch (e) { }
    },

    /* Function to set member value manually */
    /* Param 1: dataMember = Exact data member name to which the value needs to be changed */
    /* Param 2: childLevel = Level of child to which the member belongs */
    /* Param 3: value = Value which needs to be updated */
    /* Param 4: doDataBind = Do data refresh is required */
    /* Param 5: index = Index value of child node - must be used in repeated child node items */
    SetTaskContentMemberValue: function (dataSourceName, dataMember, childLevel, value, doDataBind, index) {
        var member = dataMember.split(".");
        if (childLevel == null) {
            jQXB.setmemberVarvalue(dataSourceName, member[0], member[1], value);
        }
        else {
            var memberList = '';
            for (var idx = 0; idx < member.length; idx++) {
                memberList = memberList + '.' + member[idx];
            }
            memberList = memberList.substring(1, memberList.length);
            jQXB.setmemberVarvalue(dataSourceName, null, memberList, value);
        }
        if (doDataBind == true)
            jQXB.doBind(dataSourceName);
    },

    /***********************
    * Component operations *
    ************************/
    Initialize: function (componentType) {
        //  BGVComponentHandler.pgDocListDOM = $.parseXML("<DocumentListXml></DocumentListXml>");
        //BGVComponentHandler.pgDocListDOMJson = {};
        BGVComponentHandler.componentType = componentType;
        if (componentType == 1) {
            BGVComponentHandler.componentRootNode = 'CisEduData';
        }
        else if (componentType == 2) {
            BGVComponentHandler.componentRootNode = 'CisExpData';
        }
    },

    GetCandidateComponentData: function () {
     
        try {
            var data = "{";
            data += "'sessionId':" + sessionId + ",";
            data += "'candidateId':" + candidateId + ",";
            data += "'countryId':" + countryId + ",";
            data += "'dashboardMode':" + dashboardMode + ",";
            data += "'componentType':" + BGVComponentHandler.componentType + ",";
            data += "'xmlRootNode':'" + BGVComponentHandler.componentRootNode.toString() + "'";
            data += "}";

            $.ajax({
                type: 'post',
                url: BGVComponentHandler.serviceURL + "/GetCandidateComponentData",
                data: data,
                dataType: "json",
                async: false,
                cache: false,
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    var objXml = msg.d;

                    if (objXml.CisComponentData != null && objXml.CisComponentData != "" && objXml.CisComponentData != "null") {
                        BGVComponentHandler.isComponentInfoAvailable = 1;
                        BaseCisComponentObj = JSON.parse(objXml.CisComponentData);
                        //BaseCisComponentLogObj = BaseCisComponentObj;
                        CisComponentXml = OBUtils.OBParseXML(objXml.CisComponentDataXML);
                        if (objXml.CisComponentDataLog != null && objXml.CisComponentDataLog != "" && objXml.CisComponentDataLog != "null") {
                            BGVComponentHandler.BindData(JSON.parse(objXml.CisComponentDataLog), BGVComponentHandler.dsDataLog, false);
                        }
                    }
                    else {
                        BGVComponentHandler.isComponentInfoAvailable = 0;
                    }
                    BGVComponentHandler.hrssSaveStatus = objXml.HrssSaveStatus;
                    BGVComponentHandler.candidateSaveStatus = objXml.CandidateSaveStatus;
                    BGVComponentHandler.cisStatus = objXml.CisStatus;
                    BGVComponentHandler.isAssignedToVendor = objXml.IsAssignedToVendor;
                    BGVComponentHandler.ComponentXml = CisComponentXml;
                    if (BGVComponentHandler.isAssignedToVendor > 0) { $('.repeater').attr('disabled', true); $('.canDelete').attr('disabled', true); $('#chkExpAvailable').attr('disabled', true); $('.disableAfterAssignVendor').attr('disabled', true); $('#qualification').attr('disabled', true); }
                },
                error: function (xhr, status, textRemarks) {
                    alert("Error : " + xhr.status + " " + textRemarks);
                }
            });
        }
        catch (e) {
            alert(e.Message);
        }
    },

    /* Draw existing componets from XML*/
    DrawSavedXMLComponent: function () {
        try {
            BGVComponentHandler.componentCount = $(CisComponentXml)[0].childNodes[0].childNodes.length;
        } catch (e) { }

        if (BGVComponentHandler.componentCount > 0) {

            var i = 0;

            var componentName = '', componentCode = '', componentRunnerId = 0, componentDetailId = 0;

            if (BGVComponentHandler.componentCount > 0) {
                for (i = 0; i < BGVComponentHandler.componentCount; i++) {
                    componentName = '';
                    componentCode = '';
                    componentRunnerId = 0;
                    componentDetailId = 0;

                    componentName = $(CisComponentXml)[0].childNodes[0].childNodes[i].nodeName;
                    componentCode = componentName.replace('COMP_', '').split('_')[0];
                    componentRunnerId = componentName.replace('COMP_', '').split('_')[1];
                    componentDetailId = componentName.replace('COMP_', '').split('_')[2];

                    if (BGVComponent.Initialize(BGVComponentHandler.componentType, componentCode, componentRunnerId, componentDetailId)) {
                        BGVComponent.componentXMLString = $(CisComponentXml)[0].childNodes[0].childNodes[i].childNodes[0].xml
                        BGVComponent.documentXMLString = $(CisComponentXml)[0].childNodes[0].childNodes[i].childNodes[1].xml
                        BGVComponent.AddComponent(2);
                    }
                }
            }
        }
        if (roleGroupId == 2 || roleGroupId == 6) {
            try {
                jQXB.doBind(BGVComponentHandler.dsDataLog);
                $('.LogData').each(function () {
                    var obj = $(this);
                    var parentds = obj.attr('jqxb-parentds');
                    var parentdm = obj.attr('jqxb-parentdm');
                    var logVal = obj.val();
                    var dataVal = jQXB.getMemberByReflection(jQXB.getDataSource(parentds), null, parentdm.split('.')); //jQXB.getmemberValue(jQXB.getDataSource(parentds), null, parentdm, obj);

                    if (dataVal != logVal) {
                        if (roleGroupId == 2) {
                            obj.removeAttr('jqxb-datamember').removeAttr('jqxb-parentds').removeAttr('jqxb-parentdm');
                            obj.text(logVal);

                            obj.css('color', 'red');
                            if (obj.prev()[0].tagName.toLowerCase() == 'select') {
                                var id = obj.prev().attr('id');
                                var txtValue = $('#' + id).find('option[value="' + logVal + '"]').text();
                                obj.text(txtValue);
                            }
                        }

                        if (roleGroupId == 6) {
                            obj.prev().css("border-color", "#FF0000");


                        }
                    }


                });
            } catch (e) { }
        }
        SetNotificationText();
    },

    GetMaster: function (masterCode, dataSourceName) {
        var data = "{";
        data += "'sessionId':" + sessionId.toString() + ",";
        data += "'parentCode':'" + masterCode + "'";
        data += "}";

        $.ajax({
            type: "post",
            url: BGVComponentHandler.serviceURL + "/GetMaster",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            cache: false,
            success: function (msg) { BGVComponentHandler.BindData(msg.d, dataSourceName, false); },
            error: function (xhr, status, textRemarks) { alert("Error " + xhr.status + " " + textRemarks); }
        });
    },

    /* Function to Get Geography master */
    GetGeographyMaster: function (mode, parentId, dataSourceName, asyncMode) {
        var data = "{";
        data += "'mode':" + mode.toString() + ",";
        data += "'candidateId':" + candidateId + ",";
        data += "'parentcode':" + parentId.toString();
        data += "}";
        if (asyncMode == null)
            asyncMode = false;
        $.ajax({
            type: "post",
            url: BGVComponentHandler.serviceURL + "/GetGeographyMaster",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: asyncMode,
            cache: false,
            success: function (msg) { BGVComponentHandler.BindData(msg.d, dataSourceName, false); },
            error: function (xhr, status, textRemarks) { alert("Error " + xhr.status + " " + textRemarks); }
        });
    },


    SetDataMemberValue: function (parentId, newValue) {
        var cntrlObj = $('#' + parentId);
        var ds = cntrlObj.attr('jqxb-datasource');
        var dm = cntrlObj.attr('jqxb-datamember');

        if (ds != undefined && ds != null && ds != "") {
            if (dm != undefined && dm != null && dm != "") {
                BGVComponentHandler.SetTaskContentMemberValue(ds, dm, 1, newValue, true);
            }
        }
    },

    SetRelativeObjDataMemberValue: function (parentId, newValue) {
        var hdnRelativeObjId = $('#' + parentId).attr('relId');

        if (hdnRelativeObjId != undefined && hdnRelativeObjId != null && hdnRelativeObjId != "") {
            var hdnRelativeObj = $('#' + hdnRelativeObjId);
            var ds = hdnRelativeObj.attr('jqxb-datasource');
            var dm = hdnRelativeObj.attr('jqxb-datamember');

            if (ds != undefined && ds != null && ds != "") {
                if (dm != undefined && dm != null && dm != "") {
                    BGVComponentHandler.SetTaskContentMemberValue(ds, dm, 1, newValue, false);
                }
            }
            else {
                hdnRelativeObj.attr('value', newValue);
            }
        }
    },

    AutoCompleteValue: function (obj) {
        var id = $(obj).attr('id');
        BGVComponentHandler.SetRelativeObjDataMemberValue(id, null);

        try {
            var ds = $(obj).attr('jqxb-datasource');
            $(obj).autocomplete({
                minLength: 3,
                source: function (request, response) {
                    $.ajax({
                        type: 'post',
                        url: BGVComponentHandler.serviceURL + "/EmploymentNameAutoSearch",
                        dataType: "json",
                        cahce: false,
                        data: "{'val':'" + $(obj).val() + "','typeGroup':" + BGVComponentHandler.componentType + "}",
                        contentType: 'application/json; charset=utf-8',
                        success: function (data) {
                            response($.map(data.d, function (item) { return { label: item.ItemName, value: item.ItemId} }));
                        }
                    });
                },
                change: function (event, ui) {
                    if (ui.item != null) {
                        var val = ui.item.value;
                        var institutionId = $(this).attr('id');
                        var otherId = $('#' + institutionId.replace('InstitutionName', 'others')).children('input:text').attr('id');

                        if (ui.item.label.toLowerCase() == 'others') {
                            $('#' + institutionId.replace('InstitutionName', 'others')).show();
                            $('#' + otherId).addClass('textMandatory');
                            $(this).parent().css({ 'height': '70px' });
                        }
                        else {
                            $('#' + otherId).removeClass('textMandatory');
                            $('#' + otherId).val('');
                            $('#' + institutionId.replace('InstitutionName', 'others')).hide();
                            $(this).parent().css({ 'height': '30px' });
                        }
                    }
                    if (!ui.item) {
                        BGVComponentHandler.SetDataMemberValue(id, '');
                        BGVComponentHandler.SetRelativeObjDataMemberValue(id, null);
                        BGVComponentDocumentList.GetDocumetDataXml(ds.replace('COMP_', '').split('_')[2], ds.replace('COMP_', '').split('_')[1], 0, 'div_ComponentDocumentContainer_' + ds, 1);
                        $('#' + event.currentTarget.id).addClass('textMandatory');
                    }
                    return false;
                },
                focus: function (event, ui) {
                    //$(obj).val(ui.item.label);
                    return false;
                },
                select: function (event, ui) {
                    var val = ui.item.value;
                    var institutionId = $(this).attr('id');
                    var otherId = $('#' + institutionId.replace('InstitutionName', 'others')).children('input:text').attr('id');
                    if (ui.item.label.toLowerCase() == 'others') {
                        $('#' + institutionId.replace('InstitutionName', 'others')).show();
                        $('#' + otherId).addClass('textMandatory');
                        $(this).parent().css({ 'height': '70px' });
                    }
                    else {
                        $('#' + otherId).removeClass('textMandatory');
                        $('#' + otherId).val('');
                        $('#' + institutionId.replace('InstitutionName', 'others')).hide();
                        $(this).parent().css({ 'height': '30px' });
                    }
                    var otherval = $('#' + otherId).val();
                    BGVComponentHandler.SetDataMemberValue(id, ui.item.label);
                    BGVComponentHandler.SetDataMemberValue(otherId, otherval);
                    BGVComponentHandler.SetRelativeObjDataMemberValue(id, val);
                    BGVComponentDocumentList.GetDocumetDataXml(ds.replace('COMP_', '').split('_')[2], ds.replace('COMP_', '').split('_')[1], val, 'div_ComponentDocumentContainer_' + ds, 1);
                    BGVComponent.DrawSuspectStatus(ds, val);
                    validate.obj = this;
                    validate.textMandatory();
                    return false;
                }
            })
            //.data("autocomplete")
        }
        catch (e) { }
        return;
    },

    /* Function to bind data to DS */
    BindData: function (dataSource, dataSourceName, boolParseJSON) {
        if (boolParseJSON == true) {
            var objDataSource = JSON.parse(dataSource);
            jQXB.setDataSource(dataSourceName, objDataSource).doBind(dataSourceName);

            if (dataSourceName == 'ValidationXML') {
                BGVComponentHandler.validationStatus = objDataSource.ValidationStatus;
                BGVComponentHandler.validationSet = objDataSource.ValidationMessage;
            }
        }
        else { jQXB.setDataSource(dataSourceName, dataSource).doBind(dataSourceName); }
    },

    SaveComponentData: function (saveMode) {
        try {

            //            /*Get component stats*/
            //            if (BaseCisComponentObj != null && BaseCisComponentObj != undefined) {
            //                if (BaseCisComponentObj['ComponentStat'] == null || BaseCisComponentObj['ComponentStat'] == undefined) {
            //                    BaseCisComponentObj['ComponentStat'] = {};
            //                }
            //                BaseCisComponentObj['ComponentStat']['ExistingComponentCount'] = BGVComponentHandler.componentsAlreadyAvailable.length;
            //                BaseCisComponentObj['ComponentStat']['NewComponentCount'] = BGVComponentHandler.componentsNewlyAdded.length;
            //                BaseCisComponentObj['ComponentStat']['DeletedComponentCount'] = BGVComponentHandler.componentsDeleted.length;
            //            }

            var cisComponentData = JSON.stringify(BaseCisComponentObj).toString();

            cisComponentData = cisComponentData.replace(/\\n/g, " ");
            cisComponentData = cisComponentData.replace(/\\/g, "\\\\");
            cisComponentData = cisComponentData.replace(/'/g, "\\\'");
            var docListXml = '';
            if (BGVComponentHandler.pgDocListDoMArray.length != 0) {
                var SaveDocumentData = [];
                var SaveDesignData = '';
                $(BGVComponentHandler.pgDocListDoMArray).each(function (i, data) {

                    var docData = JSON.parse(data);
                    SaveDocumentData[i] = { "ComponentDetailId": docData.ComponentDetailId, "ComponentRunnerId": docData.ComponentRunnerId, "DocumentId": docData.DocumentId, "IsMandatory": docData.IsMandatory, "IsDefault": docData.IsDefault, "Comments": docData.Comments };

                });
                SaveDesignData = { "DocumentListXml": { "Document": SaveDocumentData} };
                docListXml = JSON.stringify(SaveDesignData);
                docListXml = docListXml.replace(/\\n/g, " ");
                docListXml = docListXml.replace(/\\/g, "\\\\");
                docListXml = docListXml.replace(/'/g, "\\\'");
            } else {
                SaveDesignData = { "DocumentListXml": "" };
                docListXml = JSON.stringify(SaveDesignData);
            }
            var data = "{";
            data += "'sessionId':" + sessionId + ",";
            data += "'candidateId':" + candidateId + ",";
            data += "'dashboardMode':" + dashboardMode + ",";
            data += "'roleGroupId':" + roleGroupId + ",";
            data += "'componentType':" + BGVComponentHandler.componentType + ",";
            data += "'xmlRootNode':'" + BGVComponentHandler.componentRootNode.toString() + "',";
            data += "'componentData':'" + cisComponentData.toString() + "',";
            data += "'docListXml':'" + docListXml.toString() + "',";
            data += "'saveMode':'" + saveMode + "'";

            data += "}";

            $.ajax({
                type: "post",
                url: BGVComponentHandler.serviceURL + "/SaveCandidateComponentData",
                data: data,
                async: false,
                cache: false,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    var objDataSource = JSON.parse(msg.d);
                    BGVComponentHandler.retSaveStatus = objDataSource.Status;
                    BGVComponentHandler.retSaveDetails = objDataSource.ValidationMessage;
                },
                error: function (xhr, status, textRemarks) { /*alert("Error " + xhr.status + " " + textRemarks); */ }
            });
        }
        catch (e) {
            MsgboxAlert(sessionId, 2, 0, null, e.Message);
        }

        if (BGVComponentHandler.retSaveStatus == 1) {
            if (saveMode == 0) {
                BGVComponentHandler.taskStatusFlag = 0;
                MsgboxAlert(sessionId, 2, 207, 'TASK_SAVED_SUCCESS', 'Task Saved Successfully!!!');
            }
            else if (saveMode == 1) {
                MsgboxAlert(sessionId, 2, 208, 'TASK_SUBMIT_SUCCESS', 'Task Submitted Successfully!!!');
                BGVComponentHandler.taskStatusFlag = 1;
                BGVComponentHandler.taskSubmittedFlag = 1;
            }
            return true;
        }
        else {
            if (BGVComponentHandler.retSaveStatus == 0) {

                if (saveMode == 0) {
                    var errorDOM = OBUtils.OBParseXML(BGVComponentHandler.retSaveDetails);
                    BGVComponentHandler.validationMessage = '';
                    if (errorDOM != null) {
                        $(errorDOM).find('ValidationSet').find('ValidationError').each(function () {
                            BGVComponentHandler.validationMessage = BGVComponentHandler.validationMessage + $(this).find('ValidationMessage').text();
                        });
                        MsgboxInfo(BGVComponentHandler.validationMessage);
                    }
                    else {
                        MsgboxError(sessionId, 2, 209, 'TASK_SAVE_FAILED', 'Task Save failed!!!');
                    }
                }
                else if (saveMode == 1) {
                    MsgboxError(sessionId, 2, 210, 'TASK_SUBMIT_FAILED', 'Task Submitted failed!!!');
                }
            }

            return false;
        }
    },

    /* Function to validate the Cis content */
    ValidateComponentData: function (actionmode, mode) { // mode : 1-> educational form ; 2-> experience form; actionmode : 0 -> Save ; 1-> submit;
        var cisComponentData = "{\"" + BGVComponentHandler.componentRootNode + "\":" + JSON.stringify(BaseCisComponentObj).toString() + "}";

        cisComponentData = cisComponentData.replace(/\\n/g, " ");
        cisComponentData = cisComponentData.replace(/\\/g, "\\\\");
        cisComponentData = cisComponentData.replace(/'/g, "\\\'\\\'");

        BGVComponentHandler.validationMessage = '';
        var isCisLocked = 0;
        var data = "{";
        data += "'sessionId':" + sessionId + ",";
        data += "'candidateId':" + candidateId + ",";
        data += "'cisDataXML':'" + cisComponentData.toString() + "',";
        data += "'roleGroupId':" + roleGroupId.toString() + ",";
        data += "'isCisLocked':" + isCisLocked.toString() + ",";
        data += "'dashboardMode':" + dashboardMode + ",";
        data += "'mode':" + mode;
        data += "}";

        $.ajax({
            type: "post",
            async: false,
            url: BGVComponentHandler.serviceURL + "/ValidateComponentData",
            data: data,
            cache: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                BGVComponentHandler.BindData(msg.d, "ValidationXML", true);
            },
            error: function (xhr, status, textRemarks) { alert("Error " + xhr.status + " " + textRemarks); return false; }
        });

        if (BGVComponentHandler.validationStatus == 0) {
            BGVComponentHandler.errorDOM = OBUtils.OBParseXML(BGVComponentHandler.validationSet);
            if (BGVComponentHandler.errorDOM != null) {
                $(BGVComponentHandler.errorDOM).find('ValidationSet').find('ValidationError').each(function () {
                    BGVComponentHandler.validationMessage = BGVComponentHandler.validationMessage + $(this).find('ValidationMessage').text();
                });
            }
            return false;
        }
        else {
            return true;
        }
    },

    /*Function to get suspect component count*/
    GetSuspectCount: function () {
        var suspectCount = 0;
        var dataSourceObj = {};
        /*Check here for suspect status and show text*/
        try {
            for (var ds in BGVComponentHandler.componentList) {
                dataSourceObj = BaseCisComponentObj[BGVComponentHandler.componentList[ds]];
                var suspectStatus = 0;
                if (dataSourceObj != null && dataSourceObj != undefined) {
                    if (dataSourceObj['SuspectStatus'] != null && dataSourceObj['SuspectStatus'] != undefined) {
                        suspectStatus = dataSourceObj['SuspectStatus'];
                    } else { suspectStatus = 0; }
                }
                if (suspectStatus == 1 || suspectStatus == 2 || suspectStatus == 3) {
                    suspectCount += 1;
                }
            }
        } catch (e) { }

        BGVComponentHandler.suspectCount = suspectCount;
        return false;
    },

    /*Function to enable or disable submit button*/
    EnableOrDisableSubmitButton: function () {
        BGVComponentHandler.GetSuspectCount();
        if (BGVComponentHandler.suspectCount > 0) {
            $('#btnSubmitTask').attr('disabled', true);
            $('#btnSubmitTask').hide();
        }
        else {
            $('#btnSubmitTask').attr('disabled', false);
            $('#btnSubmitTask').show();
        }

        SetNotificationText();
    }
};

/***********************
* Component Maker *
************************/
var BGVComponent = {
    componentJqxbDSAttr: 'jqxb-dynamicDS', /* Attribute which needs to be replaced with actual jqxb-datasource syntax */
    componentControlsIdAttr: 'ob-dynId',
    componentControlsNameAttr: 'ob-dynName',
    componentContainerIdAttr: 'ob-dynContainerId',
    componentAConCompleteAttr: 'ob-dynoncomplete',
    componentBaseContainer: 'div_BaseComponentContainer',
    componentGroupContainer: '',
    componentGroupSubContainer: '',
    componentGroupControlsContainer: '',
    componentContainer: '',  /* Container(DIV) to hold the component HTML: Global container syntax "div_ComponentContainer_COMP_" + ComponentCode + "_" + RunnerId */
    componentTemplateContainer: '',
    componentDocumentContainer: '',
    componentDataFieldContainer: '',
    componentTemplateDFContainer: '',
    componentDeleteControlClass: 'canDelete',
    hiddenInputAttr: 'ob-hdn',
    hiddenInputJqxbDMAttr: 'ob-hdndatamember',
    delay: 100,

    componentName: '',
    componentDSName: '',
    componentType: 0, /* 1-Education;2-Employment; */
    componentName: '',
    componentCode: '',
    componentRunnerId: 0,
    componentDetailId: 0,
    isRepeatable: false,
    canDelete: false,
    componentDisplayOrder: 0,
    suspectRating: 0,
    maxRunnerId: 0,

    componentHTMLString: '',
    componentXMLString: '',
    documentXMLString: '',

    Initialize: function (componentType, componentCode, componentRunnerId, componentDetailId) {
        var retStatus = false;
        try {
            /* if component detail id is not available, then getting proper component detail id */
            if (componentDetailId == null || componentDetailId == undefined || componentDetailId == NaN || componentDetailId == 0) {
                componentDetailId = BGVComponent.GetComponentDetailId(componentCode, candidateId);
            }

            if (componentDetailId != null && componentDetailId != undefined && componentDetailId != NaN && componentDetailId > 0) {
                BGVComponent.componentType = componentType;
                BGVComponent.componentCode = componentCode.toString();
                BGVComponent.componentRunnerId = componentRunnerId.toString();
                BGVComponent.componentDetailId = componentDetailId;
                BGVComponent.componentName = 'COMP_' + BGVComponent.componentCode.toString() + '_' + BGVComponent.componentRunnerId.toString() + '_' + BGVComponent.componentDetailId.toString();
                BGVComponent.componentDSName = BGVComponent.componentName;

                BGVComponent.componentGroupContainer = 'div_ComponentGroupContainer_' + BGVComponent.componentCode.toString();
                BGVComponent.componentGroupSubContainer = 'div_ComponentGroupSubContainer_' + BGVComponent.componentCode.toString();
                BGVComponent.componentGroupControlsContainer = 'div_ComponentGroupControlsContainer_' + BGVComponent.componentCode.toString();
                BGVComponent.componentContainer = 'div_ComponentContainer_' + BGVComponent.componentName.toString();
                BGVComponent.componentTemplateContainer = 'div_ComponentTemplateContainer_' + BGVComponent.componentName.toString();
                BGVComponent.componentDocumentContainer = 'div_ComponentDocumentContainer_' + BGVComponent.componentName.toString();
                BGVComponent.componentDataFieldContainer = 'div_ComponentDataFieldContainer_' + BGVComponent.componentName.toString();
                BGVComponent.componentTemplateDFContainer = 'div_ComponentTemplateDFContainer_' + BGVComponent.componentName.toString();
                BGVComponent.suspectRating = 0;

                retStatus = true;
            }
            else {
                retStatus = false;
            }
        }
        catch (e) { }
        return retStatus;
    },

    /***********************
    * Component operations * 
    ************************/
    /* Create new dynamic component */
    /* mode: 1- New component; 2- Component already availble in saved XML */
    AddComponent: function (mode) {
        if (BGVComponent.DrawComponentHTML(mode) == 0) {
            BGVComponent.SetComponentDataSource(mode);
            if (roleGroupId == 1 || roleGroupId == 6) {
                //if (BGVComponent.componentType = 1) {
                $('#InstitutionName_' + BGVComponent.componentDSName).attr('disabled', true);
                $('#otherInstitution_' + BGVComponent.componentDSName).attr('disabled', true);
                //  }
            }
            jQXB.doBind(BGVComponent.componentDSName);
            /*if (mode == 1) { BGVComponentHandler.componentsNewlyAdded.push(BGVComponent.componentDSName); } else if (mode == 2) { BGVComponentHandler.componentsAlreadyAvailable.push(BGVComponent.componentDSName); }*/
            BGVComponentHandler.componentList.push(BGVComponent.componentDSName); /*Adding the component name in global component list*/
            BGVComponentHandler.InvokeMethod(BGVComponentHandler.onPostAddComponent);
            BGVComponentDocumentList.GetDocumetDataXml(BGVComponent.componentDetailId, BGVComponent.componentRunnerId.toString(), 0, BGVComponent.componentDocumentContainer.toString(), mode);
            BGVComponent.SetDataLog();
            BGVComponent.DrawSuspectStatus(BGVComponent.componentDSName, null, mode);
        }
        else
        { alert('Component config info not found'); }
        SetRoleControls();
    },

    /* Delete existing component */
    DeleteComponent: function (obj, componentDSName) {
        if (window.confirm("Are you sure want to remove this component?")) {
            try {
                var dsName = '';
                if (obj != null && obj != undefined) {
                    dsName = $(obj).attr('ob-dynDSName');
                }
                if (componentDSName != null && componentDSName != undefined && componentDSName != "") {
                    dsName = componentDSName;
                }

                if (dsName != null && dsName != undefined && $.trim(dsName) != "") {
                    var componentDetailId = dsName.replace('COMP_', '').split('_')[2];
                    var componentRunnerId = dsName.replace('COMP_', '').split('_')[1];
                    var componentCode = dsName.replace('COMP_', '').split('_')[0];
                    if (jQXB.datasourcesCollection[dsName] != undefined && jQXB.datasourcesCollection[dsName].datasource != undefined) {
                        $('[' + jQXB.JQXB_DATASOURCE_ATTR + '=' + dsName + ']').each(function () {
                            var obj = $(this);
                            obj.removeAttr('jqxb-datasource').removeAttr('jqxb-datamember');
                        });

                        $('#div_ComponentContainer_' + dsName).remove();
                        /*Removing component from global component list*/
                        try {
                            for (var i in BGVComponentHandler.componentList) {
                                if (BGVComponentHandler.componentList[i] == dsName) {
                                    BGVComponentHandler.componentList.splice(i, 1);
                                    break;
                                }
                            }
                        } catch (e) { }
                        /*BGVComponentHandler.componentsDeleted.push(dsName);*//*Counting list of deleted components*/
                        try { delete jQXB.datasourcesCollection[dsName]; } catch (e) { }
                        try { delete BaseCisComponentObj[dsName]; } catch (e) { }
                    }
                    BGVComponent.EnableDisableRepeater(componentCode);
                    BGVComponentDocumentList.RemoveDocumentTag(componentDetailId, componentRunnerId);
                    BGVComponentHandler.InvokeMethod(BGVComponentHandler.onPostDeleteComponent);
                }
                return true;
            }
            catch (e) { alert('Component not available'); return false; }

        }
        else {
            // $('#' + objCheckBoxId).attr('checked', true);
            return false;
        }
    },

    /* Set dynamic component data source*/
    /* mode: 1- New component; 2- Component already availble in saved XML */
    SetComponentDataSource: function (mode) {
        var dataSourceObj = {};

        if (mode == 1) {
            /* Creating JSON object from json */
            dataSourceObj = JSON.parse(BGVComponent.componentXMLString);
            dataSourceObj['DataFields'] = {};
            BaseCisComponentObj[BGVComponent.componentDSName] = dataSourceObj;
        }
        else if (mode == 2) {
            dataSourceObj = BaseCisComponentObj[BGVComponent.componentDSName];
            /*Adding datafields root tag if not available*/
            if (dataSourceObj['DataFields'] == null || dataSourceObj['DataFields'] == undefined || dataSourceObj['DataFields'] == "")
                dataSourceObj['DataFields'] = {};
        }

        if (dataSourceObj != null && dataSourceObj != undefined) {
            dataSourceObj['ComponentCode'] = BGVComponent.componentDSName.replace('COMP_', '').split('_')[0];
            dataSourceObj['ComponentDetailId'] = BGVComponent.componentDSName.replace('COMP_', '').split('_')[2];
            dataSourceObj['ComponentRunnerId'] = BGVComponent.componentDSName.replace('COMP_', '').split('_')[1];
        }

        /* Create dynamic component data source */
        jQXB.setDataSource(BGVComponent.componentDSName, dataSourceObj)
    },

    /* Draw controls based on component html */
    /* mode: 1- New component; 2- Component already availble in saved XML */
    DrawComponentHTML: function (mode) {
        var retHtmlStatus = BGVComponent.GetComponentHTML(mode);

        if (BGVComponent.componentHTMLString != null && BGVComponent.componentHTMLString != undefined && $.trim(BGVComponent.componentHTMLString) != '') {

            // BGVComponent.GetExpDocumetData(BGVComponent.componentDSName);
            if ($('#' + BGVComponent.componentGroupContainer).contents().length == 0) {
                $('#' + BGVComponent.componentBaseContainer).append('<div id="' + BGVComponent.componentGroupContainer + '" class="componentGroupContainer"></div>');
            }

            if ($('#' + BGVComponent.componentGroupSubContainer).contents().length == 0) {
                $('#' + BGVComponent.componentGroupContainer).append('<div id="' + BGVComponent.componentGroupSubContainer + '" class="componentGroupSubContainer"></div>');
            }

            $('#' + BGVComponent.componentGroupSubContainer).attr("maxRunner", BGVComponent.maxRunnerId).attr("componentName", BGVComponent.componentName.toString());

            if ($('#' + BGVComponent.componentContainer).contents().length == 0) {
                $('#' + BGVComponent.componentGroupSubContainer).append('<div id="' + BGVComponent.componentContainer + '" class="componentContainer" itemCode="' + BGVComponent.componentCode.toString() + '" itemIdx=' + BGVComponent.componentRunnerId.toString() + ' compDIdx=' + BGVComponent.componentDetailId.toString() + ' compDSName=' + BGVComponent.componentDSName.toString() + '><div class="inner_header"><div class="flft employmentHeader" ob-dynname="divDisplayCompName"></div><div class="flft utilityPanel"></div><div class="flft canDelete" style="cursor:pointer;"> Delete</div></div></div>');
            }

            /* Appending the template html to template and document container */
            if ($('#' + BGVComponent.componentTemplateContainer).contents().length == 0) {
                $('#' + BGVComponent.componentContainer).append('<div id="' + BGVComponent.componentTemplateDFContainer + '" class="componentTemplateDFContainer"><div id="' + BGVComponent.componentTemplateContainer + '" class="componentTemplateContainer">' + BGVComponent.componentHTMLString + '</div></div>');
            }
            /* Appending the document html to document container */
            if ($('#' + BGVComponent.componentDocumentContainer).contents().length == 0) {
                $('#' + BGVComponent.componentContainer).append('<div id="' + BGVComponent.componentDocumentContainer + '" class="componentDocListContainer nfc nfrc nfv" ob-dynDocId="documentList"></div>');
            }

            /*data field working */
            if ($('#' + BGVComponent.componentDataFieldContainer).contents().length == 0) {
                $('#' + BGVComponent.componentTemplateDFContainer).append('<div class="clear"></div><div id="' + BGVComponent.componentDataFieldContainer + '" class="componentDataFieldContainer"></div>');
            }

            $('#' + BGVComponent.componentGroupContainer).append('<div class="clear"></div>');
            /* Replacing the data source with valid syntax */
            $('#' + BGVComponent.componentContainer).find('[' + BGVComponent.componentJqxbDSAttr + ']').each(function () {
                var obj = $(this);
                obj.attr('jqxb-datasource', BGVComponent.componentDSName);
            });

            /* Replacing the control id with valid component syntax */
            $('#' + BGVComponent.componentContainer).find('[' + BGVComponent.componentControlsIdAttr + ']').each(function () {
                var obj = $(this);
                var idPrefix = obj.attr(BGVComponent.componentControlsIdAttr);
                obj.attr('id', idPrefix + '_' + BGVComponent.componentDSName.toString());
            });

            /* Replacing the component display name with valid component syntax */
            $('#' + BGVComponent.componentContainer).find('[' + BGVComponent.componentControlsNameAttr + ']').each(function () {
                var obj = $(this);
                var displayText = BGVComponent.componentName.toString();
                if (BGVComponent.isRepeatable == true) {
                    obj.text(displayText + ' ' + BGVComponent.componentRunnerId.toString());
                }
                else {
                    obj.text(displayText);
                }
            });

            /* Replacing the attribute "ob-dynContainerId" with valid Component container Id */
            $('#' + BGVComponent.componentContainer).find('[' + BGVComponent.componentContainerIdAttr + ']').each(function () {
                var obj = $(this);
                obj.attr('parentContainer', BGVComponent.componentContainer.toString());
            });

            /* Working for Adding hidden input for required controls */
            $('#' + BGVComponent.componentContainer).find('[' + BGVComponent.hiddenInputAttr + ']').each(function () {
                var obj = $(this);
                var hdnInput = '';
                var hdnAttr = obj.attr(BGVComponent.hiddenInputAttr);
                var name = obj.attr('name');
                var id = "relId_" + name + "_" + BGVComponent.componentDSName.toString();
                if (hdnAttr == 'required') {
                    hdnInput += '<input type="hidden" id="' + id + '"';
                    var hdnDmAttr = obj.attr(BGVComponent.hiddenInputJqxbDMAttr);
                    if (hdnDmAttr != undefined && hdnDmAttr != null && $.trim(hdnDmAttr) != '') {
                        hdnInput += ' jqxb-datasource="' + BGVComponent.componentDSName + '" jqxb-datamember="' + hdnDmAttr + '" ';
                    }
                    hdnInput += ' />';
                    $('#' + id).remove();
                    $('#' + BGVComponent.componentContainer).append(hdnInput);
                    obj.attr('relId', id);
                }
            });

            /* Working for repeater controls */
            if (BGVComponent.isRepeatable == true && BGVComponent.maxRunnerId > 1) {
                var addButtonHtml = '';
                //alert(BGVComponent.componentRunnerId);
                //addButtonHtml += '<input type="button" id="btnAdd_' + BGVComponent.componentCode.toString() + '" style="float: left; margin-top: 50px; font-family:Trebuchet MS, Arial, Helvetica, sans-serif;  font-size:98.5%;" class="repeater nfc nfrc nfv" value="Add another ' + BGVComponent.componentName + '" onclick="BGVComponent.AddRunnerComponent(this,\'' + BGVComponent.componentGroupSubContainer.toString() + '\', \'' + BGVComponent.componentCode.toString() + '\', ' + BGVComponent.componentType.toString() + ', ' + BGVComponent.componentDetailId.toString() + ');return;"/>';
                addButtonHtml += '<input type="button" id="btnAdd_' + BGVComponent.componentCode.toString() + '" style="float: left; margin-top: 50px; font-family:Trebuchet MS, Arial, Helvetica, sans-serif;  font-size:98.5%;" class="repeater nfc nfrc nfv addRunnerComp" value="Add another ' + BGVComponent.componentName + '" ref="' + BGVComponent.componentGroupSubContainer.toString() + ';;' + BGVComponent.componentCode.toString() + ';;' + BGVComponent.componentType.toString() + ';;' + BGVComponent.componentDetailId.toString() + '"/>';
                $('#' + BGVComponent.componentGroupControlsContainer).remove();
                $('#' + BGVComponent.componentGroupContainer).append('<div id="' + BGVComponent.componentGroupControlsContainer + '">' + addButtonHtml + '</div>');

            }

            /* Adding delete functionality with valid component syntax */
            if (BGVComponent.canDelete == true) {
                $('#' + BGVComponent.componentContainer).find('.' + BGVComponent.componentDeleteControlClass).each(function () {
                    var obj = $(this);
                    obj.attr('ob-dynDSName', BGVComponent.componentDSName.toString());
                    // obj.addClass('deleteComponent');
                    obj.unbind();
                    obj.bind('click', function () {
                        BGVComponent.DeleteComponent(this);
                    });
                });
            }
            else {
                $('#' + BGVComponent.componentContainer).find('.' + BGVComponent.componentDeleteControlClass).hide();
            }



            BGVComponent.EnableDisableRepeater(BGVComponent.componentCode.toString()); /* Enabling or disabling Add button based on max runner limit*/
        }
        return retHtmlStatus;
    },

    SetDataLog: function () {
        /* Replacing log controls with valid syntax and value */
        $('#' + BGVComponent.componentTemplateDFContainer + ' .showLog').each(function () {
            var obj = $(this);
            var logHtml = '';
            var styleHtml = "left:" + (obj.position().left + 25) + "px;";
            logHtml = '<label class="LogData" style="' + styleHtml + '" jqxb-parentds="' + BGVComponent.componentDSName.toString() + '" jqxb-parentdm="' + obj.attr('jqxb-datamember') + '" jqxb-datasource="' + BGVComponentHandler.dsDataLog + '" jqxb-datamember="' + BGVComponent.componentDSName + '.' + obj.attr('jqxb-datamember') + '" />';
            obj.after(logHtml);
        });
    },

    AddRunnerComponent: function (obj, componentGroupSubContainer, compCode, compType, compDetailId) {
        //alert(BGVComponent.maxRunnerId);
        var maxId = 0;
        $('#' + componentGroupSubContainer).find('[itemIdx]').each(function () {
            var objItem = $(this);

            if (maxId < parseInt(objItem.attr('itemIdx'))) {
                maxId = parseInt(objItem.attr('itemIdx'));
            }
        });

        $('input[name="InstitutionName"]').each(function (i) {
            if ($(this).val().toLowerCase() == 'others') {
                $(this).siblings('div.others').show();
                $(this).siblings('div>input.otherInstitution').addClass('textMandatory');
                //$(this).parent().css({ 'height': '70px' });
            }
        });
        if (BGVComponent.Initialize(compType, compCode, maxId + 1, compDetailId)) { BGVComponent.AddComponent(1); }
    },

    EnableDisableRepeater: function (componentCode) {
        var maxRunner = $('#div_ComponentGroupSubContainer_' + componentCode).attr('maxRunner');
        var componentName = $('#div_ComponentGroupSubContainer_' + componentCode).attr('componentName');
        var existingCount = 0;
        var thisCount = 0;
        /* Getting count of component in same group*/
        $('#div_ComponentGroupSubContainer_' + componentCode + ' .componentContainer').each(function () {
            existingCount += 1;
        });
        /* Set component header name */
        $('#div_ComponentGroupSubContainer_' + componentCode + ' .componentContainer').each(function () {
            thisCount += 1;
            $(this).find('[ob-dynname]').each(function () {
                var obj = $(this);
                if (maxRunner > 1 && existingCount > 1) {
                    obj.text(componentName + ' ' + thisCount.toString());
                }
                else {
                    obj.text(componentName);
                }
            });
        });
        /* Show or hide delete button based on component runner count */
        //        $('#div_ComponentGroupSubContainer_' + componentCode + ' .componentContainer .canDelete').each(function () {
        //            if (existingCount > 1) {
        //                $(this).show();
        //            }
        //            else
        //                $(this).hide();
        //        });

        /* Enable or disable add button based on component runner count */
        if (existingCount < maxRunner) {
            $('#btnAdd_' + componentCode).attr('disabled', false);
        }
        else {
            $('#btnAdd_' + componentCode).attr('disabled', true);
        }
        if ($('.componentContainer').length == 1) {
            $('#btnAdd_' + BGVComponent.componentCode.toString()).val('Add Previous Employment');
        }
    },

    /* Method to get component detail id based on candidate's BUID, Country id and component code */
    GetComponentDetailId: function (componentCode, candidateId) {
        var retComponentDetailId = 0;
        try {
            var data = "{";
            data += "'sessionId':" + sessionId + ",";
            data += "'candidateId':" + candidateId + ",";
            data += "'componentCode':'" + componentCode + "'";
            data += "}";

            $.ajax({
                type: 'post',
                url: BGVComponentHandler.serviceURL + "/GetComponentDetailId",
                data: data,
                dataType: "json",
                async: false,
                cache: false,
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    retComponentDetailId = msg.d.ComponentDetailId;
                },
                error: function (xhr, status, textRemarks) {
                    alert("Error : " + xhr.status + " " + textRemarks);
                }
            });
        }
        catch (e) {
            alert(e.Message);
            retComponentDetailId = 0;
        }

        return retComponentDetailId;
    },

    /* Get component HTML */
    /* mode: 1- New component; 2- Component already availble in saved XML */
    GetComponentHTML: function (mode) {
        var retGetHtmlStatus = 0;
        try {
            var data = "{";
            data += "'sessionId':" + sessionId + ",";
            data += "'candidateId':" + candidateId + ",";
            data += "'countryId':" + countryId + ",";
            data += "'dashboardMode':" + dashboardMode + ",";
            data += "'componentType':" + BGVComponent.componentType + ",";
            data += "'componentDetailId':" + BGVComponent.componentDetailId + ",";
            data += "'xmlRootNode':'" + BGVComponent.componentDSName.toString() + "'";
            data += "}";

            $.ajax({
                type: 'post',
                url: BGVComponentHandler.serviceURL + "/GetComponentConfig",
                data: data,
                dataType: "json",
                async: false,
                cache: false,
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    var objComp = msg.d;
                    if (mode == 1) {
                        if (objComp.XMLTemplate != null && objComp.XMLTemplate != undefined && $.trim(objComp.XMLTemplate) != '') {
                            BGVComponent.componentXMLString = objComp.XMLTemplate.toString();
                        }
                        else {
                            retGetHtmlStatus = 1;
                        }
                    }
                    BGVComponent.componentName = objComp.ComponentName.toString();

                    if (objComp.HTMLTemplate != null && objComp.HTMLTemplate != undefined && $.trim(objComp.HTMLTemplate) != '') {
                        BGVComponent.componentHTMLString = objComp.HTMLTemplate.toString();
                    }
                    else {
                        retGetHtmlStatus = 2;
                    }

                    BGVComponent.isRepeatable = objComp.IsRepeatable;
                    BGVComponent.componentDisplayOrder = objComp.DisplayOrder;
                    BGVComponent.canDelete = objComp.CanDelete;
                    BGVComponent.maxRunnerId = objComp.MaxRunnerId;
                    if (roleGroupId == 1 || roleGroupId == 6) {
                        //  BGVComponent.isRepeatable = 0;
                        BGVComponent.canDelete = 0;
                    }
                },
                error: function (xhr, status, textRemarks) {
                    alert("Error : " + xhr.status + " " + textRemarks);
                }
            });
        }
        catch (e) {
            alert(e.Message);
        }
        return retGetHtmlStatus;
    },

    ResetSuspectStatus: function (componentDSName) {
        var dataSourceObj = {};
        dataSourceObj = BaseCisComponentObj[componentDSName];
        if (dataSourceObj != null && dataSourceObj != undefined) {
            dataSourceObj['SuspectStatus'] = 0;
            dataSourceObj['SuspectRaisedSession'] = 0;
            dataSourceObj['BackPaperRequestedBy'] = '';
            dataSourceObj['SuspectClearedSession'] = 0;
        }
    },

    /* Draws suspect status against component */
    /* 
    mode: 1- New component; 2- Component already availble in saved XML;
    */
    DrawSuspectStatus: function (componentDSName, institutionId, mode, suspectStatus) {

        var dataSourceObj = {};
        var componentDetailId = componentDSName.replace('COMP_', '').split('_')[2];
        var componentRunnerId = componentDSName.replace('COMP_', '').split('_')[1];
        var backPaperRequestedBy = '', suspectRaisedSession = 0, suspectClearedSession = 0;

        if (suspectStatus == null || suspectStatus == undefined || suspectStatus == NaN) { suspectStatus = 0; }
        if (institutionId == undefined || institutionId == null) { institutionId = 0; }
        dataSourceObj = BaseCisComponentObj[componentDSName];

        if (dataSourceObj != null && dataSourceObj != undefined) {
            if (dataSourceObj['SuspectStatus'] != null && dataSourceObj['SuspectStatus'] != undefined) {
                suspectStatus = dataSourceObj['SuspectStatus'];
            } else { dataSourceObj['SuspectStatus'] = 0; }
            if (dataSourceObj['SuspectRaisedSession'] != null && dataSourceObj['SuspectRaisedSession'] != undefined) {
                suspectRaisedSession = dataSourceObj['SuspectRaisedSession'];
            } else { dataSourceObj['SuspectRaisedSession'] = 0; }
            if (dataSourceObj['BackPaperRequestedBy'] != null && dataSourceObj['BackPaperRequestedBy'] != undefined) {
                backPaperRequestedBy = dataSourceObj['BackPaperRequestedBy'];
            } else { dataSourceObj['BackPaperRequestedBy'] = ''; }
            if (dataSourceObj['SuspectClearedSession'] != null && dataSourceObj['SuspectClearedSession'] != undefined) {
                suspectClearedSession = dataSourceObj['SuspectClearedSession'];
            } else { dataSourceObj['SuspectClearedSession'] = 0; }
        }

        if (backPaperRequestedBy != null && backPaperRequestedBy != undefined && $.trim(backPaperRequestedBy) != '') {
            suspectRaisedSession = 0;
        }
        else {
            suspectRaisedSession = sessionId;
        }

        /* if not a new component and institution is not yet selected then proceeding with suspect status */
        if (mode != 1 && institutionId != 0) {
            /* 1->Suspect found; 2->Mail in queue; 3->Mail sent & Locked; 4->Unlocked; 5->Cancel;*/
            var objSuspect = BGVComponent.GetSuspectStatus(componentDetailId, componentRunnerId, institutionId, suspectRaisedSession);
            if (objSuspect.SuspectRating != null && objSuspect.SuspectRating != undefined && objSuspect.SuspectRating != NaN && objSuspect.SuspectRating > 0) {
                if (suspectStatus == 0) { suspectStatus = 1; } /* Suspect found */
                else { suspectStatus = objSuspect.SuspectStatus; }
                backPaperRequestedBy = objSuspect.BackPaperRequestedBy;
            }
        }

        if (suspectStatus == 1 || suspectStatus == 2 || suspectStatus == 3) {
            if (roleGroupId == 2) {
                BGVComponent.SetSuspectStatus(componentDSName, suspectStatus, backPaperRequestedBy);
                /*Disable all the input controls inside suspect component*/
                BGVComponent.EnableDisableControlsOnSuspectStatus(componentDSName, true);
            }
            else {
                $('#div_ComponentContainer_' + componentDSName).remove();
                BGVComponent.EnableDisableControlsOnSuspectStatus(componentDSName, true);
            }
        }

        if (suspectStatus == 4 || suspectStatus == 5) {
            /*Enable all the input controls inside suspect component*/
            BGVComponent.EnableDisableControlsOnSuspectStatus(componentDSName, false);
        }
    },

    DrawRequestBackPaper: function (componentDSName, suspectStatus, backPaperRequestedBy) {
        var overlayId = 'div_overLay_' + componentDSName;
        var contentId = 'div_olcontent_' + componentDSName;
        var componentDetailId = componentDSName.replace('COMP_', '').split('_')[2];
        var componentRunnerId = componentDSName.replace('COMP_', '').split('_')[1];

        $('#' + contentId).remove();
        $('#' + overlayId).remove();

        if (suspectStatus == 1 || suspectStatus == 2 || suspectStatus == 3) {
            var componentContainer = 'div_ComponentContainer_' + componentDSName;
            var componentTemplateDFContainer = 'div_ComponentTemplateDFContainer_' + componentDSName;
            var windowHeight = $('#' + componentTemplateDFContainer).height();
            var windowWidth = $('#' + componentTemplateDFContainer).width();
            var windowLeft = $('#' + componentTemplateDFContainer).position().left + 12;
            var windowTop = $('#' + componentTemplateDFContainer).position().top;

            var $backgroundOverLay = $('<div id="' + overlayId + '"/>');

            $('#' + componentContainer).prepend($backgroundOverLay);
            //$('#' + overlayId).css({ "opacity": "0.7" });
            $('#' + overlayId).hide(0).delay(BGVComponent.delay).fadeIn();
            //'left': '10px'
            $('#' + overlayId).css({ 'position': 'absolute', '_position': 'absolute', 'height': '100%', 'width': '889px', 'left': windowLeft, 'top': windowTop, 'background-color': '#c0c0c0', 'border': '1px solid #cecece', 'z-index': '9999' });

            var popupContent = '';
            popupContent += '';
            popupContent += '<table width="550px" align="center" border="0" cellspacing="0" cellpadding="0" style="position:absolute;*width:550px;*margin-left:-20px;margin-top:20px; left:150px; padding-left:10px;background-color:white;">';
            popupContent += '<tr><td colspan=3><div><div style="height: 35px; background-image: url(../../Images/important.gif); background-repeat: no-repeat; background-color: white;width:35px; float: left;"></div><div style="font-size: 14px; font-weight: bold; width: 300px; line-height: 35px;">Suspect component found</div></div></td></tr>'
            popupContent += '<tr style="height:3px;"></tr>';

            if (suspectStatus == 1) {
                /* Found suspect and show Request BackPaper controls */
                popupContent += '<tr><td colspan=3>Click on <strong>Queue Email Request</strong> and proceed checking other components by saving the page.<br /> To send a consolidated email to recruiter navigate to Back papers tab and click on <strong>Send Suspect Employment Email</strong>.<br /> To submit and proceed further please <strong>Cancel Suspect Status</strong> or <strong>Unlock Suspect Status</strong></td></tr>';
                //    popupContent += '<tr><td colspan=1></td><td align="right"><input type="button" class="repeater" value="Queue Email Request" onclick="BGVComponent.SetSuspectStatus(\'' + componentDSName + '\', 3, \'' + backPaperRequestedBy + '\')"></td>';
                //    popupContent += '<td align="left"><input type="button" class="repeater" value="Cancel Suspect Status" onclick="BGVComponent.SetSuspectStatus(\'' + componentDSName + '\', 5, \'' + backPaperRequestedBy + '\')"></td></tr>';
                popupContent += '<tr><td colspan=1></td><td align="right"><input type="button" class="repeater setsuspect" value="Queue Email Request" ref="' + componentDSName + ';;3;;' + backPaperRequestedBy + '"></td>';
                popupContent += '<td align="left"><input type="button" class="repeater setsuspect" value="Cancel Suspect Status" ref="' + componentDSName + ';;5;;' + backPaperRequestedBy + '"></td></tr>';

            }

            if (suspectStatus == 3) {
                /* Raise suspect and lock controls */
                popupContent += '<tr><td colspan=3>Additional information requested by <strong>' + backPaperRequestedBy + '</strong></td></tr>';
                popupContent += '<tr><td colspan=3>To send a consolidated email to recruiter navigate to Back papers tab and click on <strong>Send Suspect Employment Email</strong>.<br /> To submit and proceed further please <strong>Cancel Suspect Status</strong> or <strong>Unlock Suspect Status</strong></td></tr>';
                //  popupContent += '<tr><td colspan=3 align="center"><input type="button" class="repeater setsuspect" value="Unlock Suspect Status" onclick="BGVComponent.SetSuspectStatus(\'' + componentDSName + '\', 4, \'' + backPaperRequestedBy + '\')"></td></tr>';
                popupContent += '<tr><td colspan=3 align="center"><input type="button" class="repeater setsuspect" value="Unlock Suspect Status" ref="' + componentDSName + ';;4;;' + backPaperRequestedBy + '"></td></tr>';
            }

            popupContent += '<tr style="height:10px;"></tr></table>';

            var $popupData = $('<div id="' + contentId + '" style="z-index:999999;display:block;left:10px;width:570px;" />').html(popupContent); //.prepend(closeBox);
            $('#' + overlayId).prepend($popupData);
            $('#' + contentId).hide(0).delay(BGVComponent.delay).fadeIn();
            var documentHeight = $(document).height();
            var documentWidth = $(document).width();
            //for center position 
            $('#' + contentId).css({
                "position": "absolute"
            });
            //only need force for IE6	
            $('#' + overlayId).css({
                "height": windowHeight - 5
            });
        }
        return false;
    },

    /* Method to get suspect status against institution */
    GetSuspectStatus: function (componentDetailId, componentRunnerId, institutionId, suspectRaisedSession) {
        var retObj = {};
        try {
            var data = "{";
            data += "'sessionId':" + sessionId + ",";
            data += "'candidateId':" + candidateId + ",";
            data += "'componentDetailId':" + componentDetailId + ",";
            data += "'componentRunnerId':" + componentRunnerId + ",";
            data += "'institutionId':" + institutionId + ",";
            data += "'suspectRaisedSession':" + suspectRaisedSession;
            data += "}";

            $.ajax({
                type: 'post',
                url: BGVComponentHandler.serviceURL + "/GetSuspectStatus",
                data: data,
                dataType: "json",
                async: false,
                cache: false,
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    retObj = msg.d;
                },
                error: function (xhr, status, textRemarks) {
                    /*alert("Error : " + xhr.status + " " + textRemarks);*/
                }
            });
        }
        catch (e) {
            alert(e.Message);
        }

        return retObj;
    },

    SetSuspectStatus: function (componentDSName, suspectStatus, backPaperRequestedBy) {
        var dataSourceObj = {};
        dataSourceObj = BaseCisComponentObj[componentDSName];

        if (dataSourceObj != null && dataSourceObj != undefined) {
            if (dataSourceObj['SuspectStatus'] != null && dataSourceObj['SuspectStatus'] != undefined) {
                dataSourceObj['SuspectStatus'] = suspectStatus;
            }
            if (dataSourceObj['SuspectRaisedSession'] != null && dataSourceObj['SuspectRaisedSession'] != undefined) {
                if (suspectStatus == 1) {

                    $('#div_ComponentTemplateContainer_' + componentDSName).find('ul>li>div').find('input').removeClass('textMandatory');
                    $('#div_ComponentTemplateContainer_' + componentDSName).find('ul>li').find('input').removeClass('textMandatory');
                    //$('#' + $(this)[0].componentContainer).find('ul>li>div').find('.mandatory').removeClass('textMandatory');
                    $('#div_ComponentTemplateContainer_' + componentDSName).find('ul>li').find('select').removeClass('dropdown');
                    $('#div_ComponentTemplateContainer_' + componentDSName).find('ul>li').find('input').removeClass('dateMandatory');
                    $('#div_ComponentDataFieldContainer_' + componentDSName).find('ul>li').find('input').removeClass('textMandatory');
                }
            }

            if (dataSourceObj['SuspectRaisedSession'] != null && dataSourceObj['SuspectRaisedSession'] != undefined) {
                if (suspectStatus == 2) {
                    dataSourceObj['SuspectRaisedSession'] = sessionId;
                    $('#div_ComponentTemplateContainer_' + componentDSName).find('ul>li>div').find('input').removeClass('textMandatory');
                    $('#div_ComponentTemplateContainer_' + componentDSName).find('ul>li').find('input').removeClass('textMandatory');
                    //$('#' + $(this)[0].componentContainer).find('ul>li>div').find('.mandatory').removeClass('textMandatory');
                    $('#div_ComponentTemplateContainer_' + componentDSName).find('ul>li').find('select').removeClass('dropdown');
                    $('#div_ComponentTemplateContainer_' + componentDSName).find('ul>li').find('input').removeClass('dateMandatory');
                    $('#div_ComponentDataFieldContainer_' + componentDSName).find('ul>li').find('input').removeClass('textMandatory');
                }
            }
            if (dataSourceObj['BackPaperRequestedBy'] != null && dataSourceObj['BackPaperRequestedBy'] != undefined) {
                if (suspectStatus == 3) {
                    dataSourceObj['BackPaperRequestedBy'] = backPaperRequestedBy;
                }
            }
            if (dataSourceObj['SuspectClearedSession'] != null && dataSourceObj['SuspectClearedSession'] != undefined) {
                if (suspectStatus == 4 || suspectStatus == 5) {
                    dataSourceObj['SuspectClearedSession'] = sessionId;
                    /*Enable all the input controls inside suspect component*/
                    BGVComponent.EnableDisableControlsOnSuspectStatus(componentDSName, false);
                    $('#div_ComponentTemplateContainer_' + componentDSName).find('ul>li>div').find('.mandatory').addClass('textMandatory');
                    $('#div_ComponentTemplateContainer_' + componentDSName).find('ul>li').find('select').addClass('dropdown');
                }
            }
        }
        BGVComponent.DrawRequestBackPaper(componentDSName, suspectStatus, backPaperRequestedBy);
        BGVComponentHandler.EnableOrDisableSubmitButton();
    },

    /*Enable or Disable all the input controls inside suspect component*/
    EnableDisableControlsOnSuspectStatus: function (componentDSName, status) {
        try {
            var componentContainer = "div_ComponentContainer_" + componentDSName;
            $('#' + componentContainer + ' :input:not(:button,:hidden)').each(function () {
                $(this).attr('disabled', status);
            });
        } catch (e) { }
        BGVComponentHandler.EnableOrDisableSubmitButton();
    },

    SetDataFieldValues: function (sourceId, isDefault, isMandatory, documentName, customType) {
        var dataSourceObj = {};
        var docName = documentName.replace(/ /g, "_")
        var compCode = sourceId.split('_')[1];
        var componentDetailId = sourceId.split('_')[3];
        var componentRunnerId = sourceId.split('_')[2];
        var componentDSName = 'COMP_' + compCode + '_' + componentRunnerId + '_' + componentDetailId;
        var docDetails = '';
        dataSourceObj = BaseCisComponentObj[componentDSName];

        if ((isDefault == 1) && (isMandatory == 0)) {
            if ((dataSourceObj != null && dataSourceObj != undefined) && (dataSourceObj['DataFields'] != null && dataSourceObj['DataFields'] != undefined)) {
                if (dataSourceObj['DataFields'][docName] == null || dataSourceObj['DataFields'][docName] == undefined) {
                    dataSourceObj['DataFields'][docName] = "";
                }
                BGVComponent.DrawDataFieldContainer(componentDSName, isDefault, isMandatory, documentName);
                // $('#ComponentSubInputContainer_' + docName + '_' + componentDSName).removeClass('textMandatory');
                $('#li_DFC_' + componentDSName + '_' + documentName.replace(/ /g, "_")).addClass('componentDataFieldContainerNonMand');
            }
        }
        else if (isDefault == 0) {
            if ((dataSourceObj != null && dataSourceObj != undefined) && (dataSourceObj['DataFields'] != null && dataSourceObj['DataFields'] != undefined)) {
                if (dataSourceObj['DataFields'][docName] != null && dataSourceObj['DataFields'][docName] != undefined) {
                    delete dataSourceObj['DataFields'][docName];
                    $('#li_DFC_' + componentDSName + '_' + docName).remove();
                }
            }
            //$('#ComponentSubInputContainer_' + docName + '_' + componentDSName).removeClass('textMandatory');
        }
        if (isMandatory == 1) {
            //$('#ComponentSubInputContainer_' + docName + '_' + componentDSName).addClass('textMandatory');
            BGVComponent.DrawDataFieldContainer(componentDSName, isDefault, isMandatory, documentName);
        }
        jQXB.doBind(BGVComponent.componentDSName);
    },

    DrawDataFieldContainer: function (componentDSName, isDefault, isMandatory, documentName) {
        var docHtml = '';
        var docName = documentName.replace(/ /g, "_")

        if (isDefault == null || isDefault == undefined || isDefault == NaN) { isDefault = 0; }
        if (isMandatory == null || isMandatory == undefined || isMandatory == NaN) { isMandatory = 0; }
        var disStatus = 'block';
        var dataSourceObj = {};
        dataSourceObj = BaseCisComponentObj[componentDSName];

        //alert(x.find("input[name=NS$MYFIELD]").length);
        // alert($('#div_ComponentDataFieldContainer_' + componentDSName).find("ul[id=NS$li_DFC_"+componentDSName + "_" + docName+"]").length);

        if ((isDefault == 1) && ($('#div_ComponentDataFieldContainer_' + componentDSName).find('#li_DFC_' + componentDSName + '_' + docName)).length == 0) {
            // $('#div_ComponentDataFieldContainer_' + componentDSName).find($('#li_DFC_' + componentDSName + '_' + docName))
            docHtml += '<ul class="ComponentSubContainer" id="li_DFC_' + componentDSName + '_' + docName + '" style="display:' + disStatus + ';float:left; margin-bottom:12px; width:410px;"><li id="mand_DFC_' + componentDSName + '_' + docName + '" style="display:none;color:red;float:left; margin-right:12px;">*</li><li style="float:left;width:125px; "><label class="label_width_change">' + documentName + '</label></li><li><input type="text" class="txtbx2 showLog componentSubInputContainer onlyAlphanumeric"  name="' + documentName + '" id="ComponentSubInputContainer_' + docName + '_' + componentDSName + '" ob-dynid="ComponentSubContainer"  jqxb-datasource="' + componentDSName + '" title="' + documentName + '" jqxb-datamember="DataFields.' + docName + '"/></li></ul>'
            $('#div_ComponentDataFieldContainer_' + componentDSName).append(docHtml);
        }
        if (isMandatory == 1) {
            $('#mand_DFC_' + componentDSName + '_' + documentName.replace(/ /g, "_")).css('display', 'block');
            BGVComponentDocumentList.SetDataFieldMandatoryStatus('ComponentSubInputContainer_' + documentName.replace(/ /g, "_") + '_' + componentDSName, ((isMandatory == 1) ? true : false));
            //$('#ComponentSubInputContainer_' + documentName.replace(" ", "_") + '_' + componentDSName).addClass('textMandatory');
        }
        var sourceId = componentDSName + '_' + docName + '_DataFieldContainer';
        jQXB.doBind(BGVComponent.componentDSName);
    }
};

var BGVComponentDocumentList = {
    designHtml: '',
    compBaseXml: {},
    compBaseJson: [],
    documentName: '', // actual document name
    docName: '', // To specify the ref -> replacing space with underscore

    DesignDataField: function (dataSourceXml, componentRunnerId) { // Only for RC / NH to draw the Data field values
        BGVComponentDocumentList.compBaseXml = {};
        //BGVComponentDocumentList.compBaseXml = OBUtils.OBParseXML(dataSourceXml);
        BGVComponentDocumentList.compBaseXml = JSON.parse(dataSourceXml).Data;
        $(BGVComponentDocumentList.compBaseXml).each(function (i, data) {
            BGVComponentDocumentList.documentName = data.DocumentName;
            var compCode = data.ComponentCode;
            var documentId = data.DocumentId;
            var isDefault = data.IsDefault;
            var isMandatory = data.IsMandatory;
            var componentDetailId = data.ComponentDetailId;
            var customType = data.CustomType;
            var componentDSName = 'Comp_' + compCode + '_' + componentRunnerId + '_' + componentDetailId;
            if (customType == 2) {
                BGVComponent.SetDataFieldValues(componentDSName + '_' + BGVComponentDocumentList.documentName.replace(/ /g, "_") + '_DataFieldContainer', isDefault, isMandatory, BGVComponentDocumentList.documentName, 2);
            }
        });
        //        $(BGVComponentDocumentList.compBaseXml).find("Data").each(function (i) {
        //            BGVComponentDocumentList.documentName = $(this).find('DocumentName').text();
        //            var compCode = $(this).find('ComponentCode').text();
        //            var documentId = $(this).find('DocumentId').text();
        //            var isDefault = $(this).find('IsDefault').text();
        //            var isMandatory = $(this).find('IsMandatory').text();
        //            var componentDetailId = $(this).find('ComponentDetailId').text();
        //            var customType = $(this).find('CustomType').text();
        //            var componentDSName = 'Comp_' + compCode + '_' + componentRunnerId + '_' + componentDetailId;
        //            if (customType == 2) {
        //                BGVComponent.SetDataFieldValues(componentDSName + '_' + BGVComponentDocumentList.documentName.replace(/ /g, "_") + '_DataFieldContainer', isDefault, isMandatory, BGVComponentDocumentList.documentName, 2);
        //            }
        //        });
    },
    DesignHtml: function (dataSource, componentRunnerId, componentContainerId) {// mode : 1 - First time to create document data table; 2 - Based on Company Name
        //  BGVComponentDocumentList.compBaseXml = {};
        //   BGVComponentDocumentList.compBaseXml = OBUtils.OBParseXML(dataSource);
        BGVComponentDocumentList.compBaseJson = [];
        BGVComponentDocumentList.compBaseJson = JSON.parse(dataSource).Data;
        var windowHeight = $('#div_ComponentContainer_' + componentContainerId.replace('div_ComponentDocumentContainer_', '')).height();
        var tableName = "docDetails_" + componentContainerId;
        //$('#' + componentContainerId).css({ 'height': windowHeight + 'px'});

        $('#' + componentContainerId).html("<div class='docListHeader'><div style='width:60%;float:left;padding-top:8px;padding-left:8px;color:white;'>Document(s)</div><div style='width:30%;float:right;padding-top:8px;color:white;'>Comments</div></div><div class='docListcontent'><table id='" + tableName + "' class='doc_details' cellpadding='0' cellspacing='0'><tbody></tbody></table></div>");
        $(BGVComponentDocumentList.compBaseJson).each(function (i, compData) {
            BGVComponentDocumentList.documentName = compData.DocumentName;
            BGVComponentDocumentList.docName = BGVComponentDocumentList.documentName.replace(/ /g, "_");
            var compCode = compData.ComponentCode;
            var documentId = compData.DocumentId;
            var isDefault = compData.IsDefault;
            var isMandatory = compData.IsMandatory;
            var componentDetailId = compData.ComponentDetailId;
            var comments = (compData.Comment == null ? '' : compData.Comment);
            var customType = compData.CustomType;
            var chkDefaultId = "chkDefaultDoc_" + componentContainerId + "_" + i;
            var chkReqDocId = "chkRequiredDoc_" + componentContainerId + "_" + i;
            var commentId = "comments_" + componentContainerId + "_" + i;
            var styleColor = '';
            if ((i % 2) == 0) {
                styleColor = "background-color:white;";
            }
            else {
                styleColor = "background-color:rgb(225, 231, 233);";
            }
            var data = '';
            data += '<tr><td style="border-right-color: #99a3a7;border-bottom-color:#99a3a7;border-right-width:1px;border-bottom-width:1px;border-right-style:solid;border-bottom-style:solid;' + styleColor + '">';
            // data += '<input type="checkbox" class="chkDefaultDoc" id="' + chkDefaultId + '" name="IsDefault" onclick="BGVComponentDocumentList.SetDocumentDefaultStatus(\'' + chkDefaultId + '\',' + componentDetailId + ', ' + componentRunnerId + ', ' + documentId + ',' + customType + ',\'' + BGVComponentDocumentList.documentName + '\'); return;" />';
            data += '<input type="checkbox" class="chkDefaultDoc" id="' + chkDefaultId + '" name="IsDefault" ref=' + chkDefaultId + ';;' + componentDetailId + ';;' + componentRunnerId + ';;' + documentId + ';;' + customType + ';;' + BGVComponentDocumentList.docName + '  />';
            data += '</td>';
            data += '<td style = "border-right-color: #99a3a7;border-bottom-color:#99a3a7;border-right-width:1px;border-bottom-width:1px;border-right-style:solid;border-bottom-style:solid;' + styleColor + '"><div style="float: left; margin-left: -6px;">' + BGVComponentDocumentList.documentName + '</div></td>';
            data += '<td style = "border-right-color: #99a3a7;border-bottom-color:#99a3a7;border-right-width:1px;border-bottom-width:1px;border-right-style:solid;border-bottom-style:solid;' + styleColor + '">';
            //data += '<div><div style="width: 13px; margin:0 7px 0 -8px; float: left;"><input type="checkbox" class="chkRequiredDoc" id="' + chkReqDocId + '"  name="IsRequired" onclick="BGVComponentDocumentList.SetDocumentMandatoryStatus(\'' + chkReqDocId + '\',' + componentDetailId + ', ' + componentRunnerId + ',' + documentId + ',' + customType + ',\'' + BGVComponentDocumentList.documentName + '\'); return;" /></div>'
            data += '<div><div style="width: 13px; margin:0 7px 0 -8px; float: left;"><input type="checkbox" class="chkRequiredDoc" id="' + chkReqDocId + '"  name="IsRequired" ref=' + chkReqDocId + ';;' + componentDetailId + ';;' + componentRunnerId + ';;' + documentId + ';;' + customType + ';;' + BGVComponentDocumentList.docName + ' /></div>'
            if (customType == 1) {
                data += 'Mandatory Document</div>';
            }
            else {
                data += 'Mandatory Value</div>';
            }
            data += '</td>';
            //data += '<td style = "width:350px;border-right-color: #99a3a7;border-bottom-color:#99a3a7;border-right-width:1px;border-bottom-width:1px;border-right-style:solid;border-bottom-style:solid;' + styleColor + '">Required Document</td>';
            //data += '<td style = "border-right-color: #99a3a7;border-bottom-color:#99a3a7;border-right-width:1px;border-bottom-width:1px;border-right-style:solid;border-bottom-style:solid;' + styleColor + '"><div style="float: left; margin-left: -6px;"><input type="text" class="comments commentField" maxlength="100"  id="' + commentId + '"  name="comments" onchange="BGVComponentDocumentList.SetDocumentComment(\'' + commentId + '\',' + componentDetailId + ', ' + componentRunnerId + ', ' + documentId + '); return;" value="' + comments + '" /></div></td>';
            data += '<td style = "border-right-color: #99a3a7;border-bottom-color:#99a3a7;border-right-width:1px;border-bottom-width:1px;border-right-style:solid;border-bottom-style:solid;' + styleColor + '"><div style="float: left; margin-left: -6px;"><input type="text" class="comments commentField" maxlength="100"  id="' + commentId + '"  name="comments" ref=' + commentId + ';;' + componentDetailId + ';;' + componentRunnerId + ';;' + documentId + ' value="' + comments + '" /></div></td>';
            data += '</tr>';

            $('#' + tableName + ' > tbody:last').append(data);

            BGVComponentDocumentList.AddDocumentTag(componentDetailId, componentRunnerId, documentId, isDefault, isMandatory, comments);

            if ((isDefault == "true") || (isDefault == 1)) {
                $('#chkDefaultDoc_' + componentContainerId + '_' + i).attr('checked', true);
            }
            else if ((isDefault == "false") || (isDefault == 0)) {
                $('#chkDefaultDoc_' + componentContainerId + '_' + i).attr('checked', false);
            }
            if ((isMandatory == "true") || (isMandatory == 1)) {
                $('#chkRequiredDoc_' + componentContainerId + '_' + i).attr('checked', true);
            }
            else if ((isMandatory == "false") || (isMandatory == 0)) {
                $('#chkRequiredDoc_' + componentContainerId + '_' + i).attr('checked', false);
            }
            BGVComponentDocumentList.SetDocumentDefaultStatus(chkDefaultId, componentDetailId, componentRunnerId, documentId, customType, BGVComponentDocumentList.documentName);
            BGVComponentDocumentList.SetDocumentMandatoryStatus(chkReqDocId, componentDetailId, componentRunnerId, documentId, customType, BGVComponentDocumentList.documentName);
        });
        //  $(BGVComponentDocumentList.compBaseXml).find("Data").each(function (i) {
        //            BGVComponentDocumentList.documentName = $(this).find('DocumentName').text();
        //            var compCode = $(this).find('ComponentCode').text();
        //            var documentId = $(this).find('DocumentId').text();
        //            var isDefault = $(this).find('IsDefault').text();
        //            var isMandatory = $(this).find('IsMandatory').text();
        //            var componentDetailId = $(this).find('ComponentDetailId').text();
        //            var comments = $(this).find('Comment').text();
        //            var customType = $(this).find('CustomType').text();

        //            var chkDefaultId = "chkDefaultDoc_" + componentContainerId + "_" + i;
        //            var chkReqDocId = "chkRequiredDoc_" + componentContainerId + "_" + i;
        //            var commentId = "comments_" + componentContainerId + "_" + i;

        //            var styleColor = '';
        //            if ((i % 2) == 0) {
        //                styleColor = "background-color:white;";
        //            }
        //            else {
        //                styleColor = "background-color:rgb(225, 231, 233);";
        //            }

        //            var data = '';
        //            data += '<tr><td style="border-right-color: #99a3a7;border-bottom-color:#99a3a7;border-right-width:1px;border-bottom-width:1px;border-right-style:solid;border-bottom-style:solid;' + styleColor + '">';
        //            data += '<input type="checkbox" class="chkDefaultDoc" id="' + chkDefaultId + '" name="IsDefault" onclick="BGVComponentDocumentList.SetDocumentDefaultStatus(\'' + chkDefaultId + '\',' + componentDetailId + ', ' + componentRunnerId + ', ' + documentId + ',' + customType + ',\'' + BGVComponentDocumentList.documentName + '\'); return;" />';
        //            data += '</td>';
        //            data += '<td style = "border-right-color: #99a3a7;border-bottom-color:#99a3a7;border-right-width:1px;border-bottom-width:1px;border-right-style:solid;border-bottom-style:solid;' + styleColor + '"><div style="float: left; margin-left: -6px;">' + BGVComponentDocumentList.documentName + '</div></td>';
        //            data += '<td style = "border-right-color: #99a3a7;border-bottom-color:#99a3a7;border-right-width:1px;border-bottom-width:1px;border-right-style:solid;border-bottom-style:solid;' + styleColor + '">';
        //            data += '<div><div style="width: 13px; margin:0 7px 0 -8px; float: left;"><input type="checkbox" class="chkRequiredDoc" id="' + chkReqDocId + '"  name="IsRequired" onclick="BGVComponentDocumentList.SetDocumentMandatoryStatus(\'' + chkReqDocId + '\',' + componentDetailId + ', ' + componentRunnerId + ',' + documentId + ',' + customType + ',\'' + BGVComponentDocumentList.documentName + '\'); return;" /></div>'
        //            if (customType == 1) {
        //                data += 'Mandatory Document</div>';
        //            }
        //            else {
        //                data += 'Mandatory Value</div>';
        //            }
        //            data += '</td>';
        //            //data += '<td style = "width:350px;border-right-color: #99a3a7;border-bottom-color:#99a3a7;border-right-width:1px;border-bottom-width:1px;border-right-style:solid;border-bottom-style:solid;' + styleColor + '">Required Document</td>';
        //            data += '<td style = "border-right-color: #99a3a7;border-bottom-color:#99a3a7;border-right-width:1px;border-bottom-width:1px;border-right-style:solid;border-bottom-style:solid;' + styleColor + '"><div style="float: left; margin-left: -6px;"><input type="text" class="comments" maxlength="100"  id="' + commentId + '"  name="comments" onchange="BGVComponentDocumentList.SetDocumentComment(\'' + commentId + '\',' + componentDetailId + ', ' + componentRunnerId + ', ' + documentId + '); return;" value="' + comments + '" /></div></td>';
        //            data += '</tr>';

        //            $('#' + tableName + ' > tbody:last').append(data);

        //            //   BGVComponentDocumentList.AddDocumentTag(componentDetailId, componentRunnerId, documentId, isDefault, isMandatory, comments);

        //            if ((isDefault == "true") || (isDefault == 1)) {
        //                $('#chkDefaultDoc_' + componentContainerId + '_' + i).attr('checked', true);
        //            }
        //            else if ((isDefault == "false") || (isDefault == 0)) {
        //                $('#chkDefaultDoc_' + componentContainerId + '_' + i).attr('checked', false);
        //            }
        //            if ((isMandatory == "true") || (isMandatory == 1)) {
        //                $('#chkRequiredDoc_' + componentContainerId + '_' + i).attr('checked', true);
        //            }
        //            else if ((isMandatory == "false") || (isMandatory == 0)) {
        //                $('#chkRequiredDoc_' + componentContainerId + '_' + i).attr('checked', false);
        //            }

        //            //     BGVComponentDocumentList.SetDocumentDefaultStatus(chkDefaultId, componentDetailId, componentRunnerId, documentId, customType, BGVComponentDocumentList.documentName);
        //            //    BGVComponentDocumentList.SetDocumentMandatoryStatus(chkReqDocId, componentDetailId, componentRunnerId, documentId, customType, BGVComponentDocumentList.documentName);
        //        });
    },

    /* Document configuration xml working */
    AddDocumentTag: function (componentDetailId, componentRunnerId, documentId, isDefault, isMandatory, comments) {
        var isDocMapFound = false;
        //if (BGVComponentHandler.pgDocListDOMJson != null && BGVComponentHandler.pgDocListDOMJson != undefined) {

        //            if (BGVComponentHandler.pgDocListDOMJson.length != 0) {
        //                $(BGVComponentHandler.pgDocListDOMJson).each(function (i, data) {
        //                    var JsonData = JSON.parse(data).Document;
        //                    if (JsonData.ComponentDetailId == componentDetailId && JsonData.ComponentRunnerId == componentRunnerId && JsonData.DocumentId == documentId) {
        //                        $(this).remove();
        //                    }
        //                });
        //            }
        if (BGVComponentHandler.pgDocListDoMArray.length != 0) {
            $(BGVComponentHandler.pgDocListDoMArray).each(function (i, data) {
                var JsonData = JSON.parse(data);
                if (JsonData.ComponentDetailId == componentDetailId && JsonData.ComponentRunnerId == componentRunnerId && JsonData.DocumentId == documentId) {
                    BGVComponentHandler.pgDocListDoMArray.splice(i, 1);
                }
            });
        }

        if (isDefault != undefined && isDefault != null) {
            if (isDefault == "true" || (isDefault == 1)) {
                isDefault = 1;
            }
            else {
                isDefault = 0;
            }
        }
        else {
            isDefault = 0;
        }

        if (isMandatory != undefined && isMandatory != null) {
            if (isMandatory == "true" || (isMandatory == 1)) {
                isMandatory = 1;
            }
            else {
                isMandatory = 0;
            }
        }
        else {
            isMandatory = 0;
        }


        var DocumentData = new Object();
        DocumentData.ComponentDetailId = componentDetailId;
        DocumentData.ComponentRunnerId = componentRunnerId;
        DocumentData.DocumentId = documentId;
        DocumentData.IsMandatory = isMandatory;
        DocumentData.IsDefault = isDefault;
        DocumentData.Comments = comments;


        var pgDocListDoMChildArray = [];
        pgDocListDoMChildArray[0] = "ComponentDetailId";
        pgDocListDoMChildArray[1] = "ComponentRunnerId";
        pgDocListDoMChildArray[2] = "DocumentId";
        pgDocListDoMChildArray[3] = "IsMandatory";
        pgDocListDoMChildArray[4] = "IsDefault";
        pgDocListDoMChildArray[5] = "Comments";
        var arrLen = BGVComponentHandler.pgDocListDoMArray.length;
        BGVComponentHandler.pgDocListDoMArray.splice(arrLen, 0, JSON.stringify(DocumentData, pgDocListDoMChildArray, ""));
        //BGVComponentHandler.pgDocListDOMJson = { "DocumentListXml": { "Document": BGVComponentHandler.pgDocListDoMArray} };


        //            var documentXml = '';
        //            documentXml += '<Document>';
        //            documentXml += '<ComponentDetailId>' + componentDetailId.toString() + '</ComponentDetailId>';
        //            documentXml += '<ComponentRunnerId>' + componentRunnerId.toString() + '</ComponentRunnerId>';
        //            documentXml += '<DocumentId>' + documentId.toString() + '</DocumentId>';

        //            if (isDefault != undefined && isDefault != null) {
        //                if (isDefault == "true" || (isDefault == 1)) {
        //                    isDefault = 1;
        //                }
        //                else {
        //                    isDefault = 0;
        //                }
        //            }
        //            else {
        //                isDefault = 0;
        //            }

        //            if (isMandatory != undefined && isMandatory != null) {
        //                if (isMandatory == "true" || (isMandatory == 1)) {
        //                    isMandatory = 1;
        //                }
        //                else {
        //                    isMandatory = 0;
        //                }
        //            }
        //            else {
        //                isMandatory = 0;
        //            }
        //            documentXml += '<IsMandatory>' + isMandatory.toString() + '</IsMandatory>';
        //            documentXml += '<IsDefault>' + isDefault.toString() + '</IsDefault>';
        //            documentXml += '<Comments>' + comments.toString() + '</Comments>';
        //            documentXml += '</Document>';

        //   var nodeJson = JSON.stringify(documentJson);
        //  BGVComponentHandler.pgDocListDOMJson.push(nodeJson);

        //var nodeXML = $.parseXML(documentXml);
        //$(BGVComponentHandler.pgDocListDOM).children(0).append($(nodeXML).children(0))
        // }
    },

    RemoveDocumentTag: function (componentDetailId, componentRunnerId) {
        //  if (BGVComponentHandler.pgDocListDOMJson != null && BGVComponentHandler.pgDocListDOMJson != undefined) {
        var tempArr = [];

        $(BGVComponentHandler.pgDocListDoMArray).each(function (i, data) {
            var JsonData = JSON.parse(data);
            if (JsonData.ComponentDetailId != componentDetailId) {
                tempArr.push(BGVComponentHandler.pgDocListDoMArray[i]);
            }
            else if (JsonData.ComponentDetailId == componentDetailId) {
                if (JsonData.ComponentRunnerId != componentRunnerId) {
                    tempArr.push(BGVComponentHandler.pgDocListDoMArray[i]);
                }
            }
            //            if (JsonData.ComponentDetailId != componentDetailId && JsonData.ComponentRunnerId != componentRunnerId) {
            //                tempArr.push(BGVComponentHandler.pgDocListDoMArray[i]);
            //            }
            //            if (JsonData.ComponentDetailId == componentDetailId && JsonData.ComponentRunnerId != componentRunnerId) {
            //                tempArr.push(BGVComponentHandler.pgDocListDoMArray[i]);
            //            }
        });
        BGVComponentHandler.pgDocListDoMArray = [];
        BGVComponentHandler.pgDocListDoMArray = tempArr;

        //            $(BGVComponentHandler.pgDocListDOM).find('Document').each(function () {
        //                if (parseInt($(this).find('ComponentDetailId').text()) == componentDetailId && parseInt($(this).find('ComponentRunnerId').text()) == componentRunnerId) {
        //                    $(this).remove();
        //                }
        //            });
        //  }
    },

    /* Function to set IsDefault status */
    SetDocumentDefaultStatus: function (objId, componentDetailId, componentRunnerId, documentId, customType, documentName) {
        var isDefault = 0;
        var compCode = objId.replace('COMP_', '').split('_')[3];
        var componentDSName = 'COMP_' + compCode + '_' + componentRunnerId + '_' + componentDetailId;
        $('#ComponentSubInputContainer_' + documentName + '_' + componentDSName).unbind();
        if ($('#' + objId).is(':checked')) {
            isDefault = 1;
        }
        else {
            $('#chkRequiredDoc_' + objId.replace('chkDefaultDoc_', '')).attr('checked', false);
        }
        //  if (BGVComponentHandler.pgDocListDOMJson != undefined && BGVComponentHandler.pgDocListDOMJson != null) {

        $(BGVComponentHandler.pgDocListDoMArray).each(function (i, data) {
            var JsonData = JSON.parse(data);
            if (JsonData.ComponentDetailId == componentDetailId && JsonData.ComponentRunnerId == componentRunnerId && JsonData.DocumentId == documentId) {
                var replaceData = '{ "ComponentDetailId": ' + JsonData.ComponentDetailId + ', "ComponentRunnerId": ' + JsonData.ComponentRunnerId + ', "DocumentId":  ' + JsonData.DocumentId + ', "IsMandatory": ' + JsonData.IsMandatory + ', "IsDefault": ' + isDefault + ', "Comments": "' + JsonData.Comments + '" }';
                BGVComponentHandler.pgDocListDoMArray.splice(i, 1, replaceData);
                return false;
            }
        });
        //            $(BGVComponentHandler.pgDocListDOM).find('Document').each(function () {
        //                if (parseInt($(this).find('ComponentDetailId').text()) == componentDetailId && parseInt($(this).find('ComponentRunnerId').text()) == componentRunnerId && parseInt($(this).find('DocumentId').text()) == documentId) {
        //                    $(this).find('IsDefault').text(isDefault);
        //                }
        //            });
        //  }
        if ((customType == 2)) {
            BGVComponent.SetDataFieldValues(componentDSName + '_' + documentName.replace(/ /g, "_") + '_DataFieldContainer', isDefault, 0, documentName, 2);
        }
    },

    /* Function to set IsMandatory status */
    SetDocumentMandatoryStatus: function (objId, componentDetailId, componentRunnerId, documentId, customType, documentName) {
        var isMandatory = 0;
        var compCode = objId.replace('COMP_', '').split('_')[3];
        var componentDSName = 'COMP_' + compCode + '_' + componentRunnerId + '_' + componentDetailId;
        $('#ComponentSubInputContainer_' + documentName + '_' + componentDSName).unbind();
        if ($('#' + objId).is(':checked')) {
            isMandatory = 1;
            $('#chkDefaultDoc_' + objId.replace('chkRequiredDoc_', '')).attr('checked', true);
        }
        //  if (BGVComponentHandler.pgDocListDOMJson != undefined && BGVComponentHandler.pgDocListDOMJson != null) {
        $(BGVComponentHandler.pgDocListDoMArray).each(function (i, data) {
            var JsonData = JSON.parse(data);
            if (JsonData.ComponentDetailId == componentDetailId && JsonData.ComponentRunnerId == componentRunnerId && JsonData.DocumentId == documentId) {
                var replaceData = '{ "ComponentDetailId": ' + JsonData.ComponentDetailId + ', "ComponentRunnerId": ' + JsonData.ComponentRunnerId + ', "DocumentId":  ' + JsonData.DocumentId + ', "IsMandatory": ' + isMandatory + ', "IsDefault": ' + JsonData.IsDefault + ', "Comments": "' + JsonData.Comments + '" }';
                $('#mand_DFC_' + componentDSName + '_' + documentName.replace(/ /g, "_")).css('display', 'none');
                $('#li_DFC_' + componentDSName + '_' + documentName.replace(/ /g, "_")).addClass('componentDataFieldContainerNonMand');

                if (isMandatory == 1) {
                    replaceData = '{ "ComponentDetailId": ' + JsonData.ComponentDetailId + ', "ComponentRunnerId": ' + JsonData.ComponentRunnerId + ', "DocumentId":  ' + JsonData.DocumentId + ', "IsMandatory": ' + isMandatory + ', "IsDefault": ' + isMandatory + ', "Comments": "' + JsonData.Comments + '" }';
                    //   BGVComponentDocumentList.SetDocumentDefaultStatus(objId, componentDetailId, componentRunnerId, documentId, customType, documentName);
                    $('#mand_DFC_' + componentDSName + '_' + documentName.replace(/ /g, "_")).css('display', 'block');
                    $('#li_DFC_' + componentDSName + '_' + documentName.replace(/ /g, "_")).removeClass('componentDataFieldContainerNonMand');
                }
                if (JsonData.IsDefault == 0 && isMandatory == 1 && customType == 2) {
                    JsonData.IsDefault = 1;
                    BGVComponent.SetDataFieldValues(componentDSName + '_' + documentName.replace(/ /g, "_") + '_DataFieldContainer', 1, 0, documentName, 2);
                    BGVComponent.DrawDataFieldContainer(componentDSName, 1, 1, BGVComponentDocumentList.documentName);

                }
                BGVComponentHandler.pgDocListDoMArray.splice(i, 1, replaceData);
                return false;
            }
        });
        //            $(BGVComponentHandler.pgDocListDOM).find('Document').each(function () {
        //                if (parseInt($(this).find('ComponentDetailId').text()) == componentDetailId && parseInt($(this).find('ComponentRunnerId').text()) == componentRunnerId && parseInt($(this).find('DocumentId').text()) == documentId) {
        //                    $(this).find('IsMandatory').text(isMandatory);
        //                    $('#mand_DFC_' + componentDSName + '_' + documentName.replace(/ /g, "_")).css('display', 'none');
        //                    $('#li_DFC_' + componentDSName + '_' + documentName.replace(/ /g, "_")).addClass('componentDataFieldContainerNonMand');
        //                    if (isMandatory == 1) {
        //                        $(this).find('IsDefault').text(isMandatory);
        //                        BGVComponentDocumentList.SetDocumentDefaultStatus(objId, componentDetailId, componentRunnerId, documentId, customType, documentName);
        //                        $('#mand_DFC_' + componentDSName + '_' + documentName.replace(/ /g, "_")).css('display', 'block');
        //                        $('#li_DFC_' + componentDSName + '_' + documentName.replace(/ /g, "_")).removeClass('componentDataFieldContainerNonMand');
        //                    }
        //                }
        //            });
        // }
        if ((customType == 2)) {
            BGVComponentDocumentList.SetDataFieldMandatoryStatus('ComponentSubInputContainer_' + documentName.replace(/ /g, "_") + '_' + componentDSName, ((isMandatory == 1) ? true : false));
        }
    },

    SetDataFieldMandatoryStatus: function (cntrlId, dataFieldMandatoryStatus) {
        $('#' + cntrlId).css('display', dataFieldMandatoryStatus);
        if (dataFieldMandatoryStatus) {
            if (roleGroupId != 2) {
                $('#' + cntrlId).addClass('textMandatory');
            }
        }
        else {
            $('#' + cntrlId).removeClass('textMandatory');
        }
    },

    /* Function to set Comments for document */
    SetDocumentComment: function (objId, componentDetailId, componentRunnerId, documentId) {
        var comment = '';
        if ($('#' + objId).text() != null && $('#' + objId).text() != undefined) {
            comment = $('#' + objId).val();
        }
        // if (BGVComponentHandler.pgDocListDOMJson != undefined && BGVComponentHandler.pgDocListDOMJson != null) {
        $(BGVComponentHandler.pgDocListDoMArray).each(function (i, data) {
            var JsonData = JSON.parse(data);
            if (JsonData.ComponentDetailId == componentDetailId && JsonData.ComponentRunnerId == componentRunnerId && JsonData.DocumentId == documentId) {
                var replaceData = '{ "ComponentDetailId": ' + JsonData.ComponentDetailId + ', "ComponentRunnerId": ' + JsonData.ComponentRunnerId + ', "DocumentId":  ' + JsonData.DocumentId + ', "IsMandatory": ' + JsonData.IsMandatory + ', "IsDefault": ' + JsonData.IsDefault + ', "Comments": "' + comment + '" }';
                BGVComponentHandler.pgDocListDoMArray.splice(i, 1, replaceData);
                return false;
            }
        });
        //  }
    },

    /* Function to return Document detail xml */
    GetDocumetDataXml: function (componentDetailId, componentRunnerId, institutionId, documentContent, mode) {

        try {
            var data = "{";
            data += "'sessionId':" + sessionId + ",";
            data += "'candidateId':" + candidateId + ",";
            data += "'countryId':" + countryId + ",";
            data += "'componentDetailId':" + componentDetailId + ",";
            data += "'componentRunnerId':" + componentRunnerId + ",";
            data += "'institutionId':" + institutionId + ",";
            data += "'mode':" + mode;
            data += "}";
            $.ajax({
                type: 'post',
                url: BGVComponentHandler.serviceURL + "/GetDocumetDataXml",
                data: data,
                dataType: "json",
                async: false,
                cache: false,
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    var dataFieldXml = msg.d.XMLTemplate;
                    if (roleGroupId == 1 || roleGroupId == 6) {
                        BGVComponentDocumentList.DesignDataField(JSON.parse(msg.d), componentRunnerId);
                    }
                    if (roleGroupId == 2) {

                        BGVComponentDocumentList.DesignHtml(JSON.parse(msg.d), componentRunnerId, documentContent);
                    }
                },
                error: function (xhr, status, textRemarks) {
                    alert("Error " + xhr.status + " " + textRemarks);
                    return false;
                }
            });
            return true;
        }
        catch (e) {
            alert(e.Message);
            return false;
        }
    }
};

function SetRoleControls() {
    if (dashboardMode == 1) {
        switch (roleGroupId) {
            case 1: $('.nfc').remove(); break;
            case 2: $('.nfhrss').remove(); break;
            case 6: $('.nfc').remove(); break;
            case 11: $('.nfv').remove(); break;
            default: $('.nfrc, .nfv, .nfhrss').remove(); break;
        }
    }
    else { $('.nfc').remove(); }
}


$(document).ready(function () {
    $('body').on("change", '.commentField', function () {
        var refVal = $(this).attr('ref');
        var commentId = refVal.split(';;')[0];
        var componentDetailId = refVal.split(';;')[1];
        var componentRunnerId = refVal.split(';;')[2];
        var documentId = refVal.split(';;')[3];
        BGVComponentDocumentList.SetDocumentComment(commentId, componentDetailId, componentRunnerId, documentId);

        //    BGVComponentDocumentList.SetDocumentComment(commentId + '\',' + componentDetailId + ', ' + componentRunnerId + ', ' + documentId + ')
    }).on("click", 'input[name="IsDefault"]', function () {
        var refVal = $(this).attr('ref');
        var chkDefaultId = refVal.split(';;')[0];
        var componentDetailId = refVal.split(';;')[1];
        var componentRunnerId = refVal.split(';;')[2];
        var documentId = refVal.split(';;')[3];
        var customType = refVal.split(';;')[4];
        var documentName = refVal.split(';;')[5];
        BGVComponentDocumentList.documentName = documentName.replace(/_/g, " ");
        BGVComponentDocumentList.SetDocumentDefaultStatus(chkDefaultId, componentDetailId, componentRunnerId, documentId, customType, BGVComponentDocumentList.documentName);
    }).on("click", 'input[name="IsRequired"]', function () {
        var refVal = $(this).attr('ref');
        var chkReqDocId = refVal.split(';;')[0];
        var componentDetailId = refVal.split(';;')[1];
        var componentRunnerId = refVal.split(';;')[2];
        var documentId = refVal.split(';;')[3];
        var customType = refVal.split(';;')[4];
        var documentName = refVal.split(';;')[5];
        BGVComponentDocumentList.documentName = documentName.replace(/_/g, " ");
        BGVComponentDocumentList.SetDocumentMandatoryStatus(chkReqDocId, componentDetailId, componentRunnerId, documentId, customType, BGVComponentDocumentList.documentName);
    }).on("click", ".setsuspect", function () {
        var refVal = $(this).attr('ref');
        var componentDS = refVal.split(';;')[0];
        var suspectStatus = refVal.split(';;')[1];
        var backpapersRequestedBy = refVal.split(';;')[2];
        BGVComponent.SetSuspectStatus(componentDS, suspectStatus, backpapersRequestedBy);
    }).on("click", ".addRunnerComp", function () {
        var refVal = $(this).attr('ref');
        var componentGroupSubContainer = refVal.split(';;')[0];
        var componentCode = refVal.split(';;')[1];
        var componentType = refVal.split(';;')[2];
        var componentDetail = refVal.split(';;')[3];
        BGVComponent.AddRunnerComponent(this, componentGroupSubContainer, componentCode, componentType, componentDetail);
    });

});

/*Function to set display notification*/
function SetNotificationText() { var notifyHtml = ""; try { var data = "{'sessionId':" + sessionId + ",'candidateId':" + candidateId + ",'roleGroupId':" + roleGroupId + ",'bgvPageId':" + bgvPId + "}"; $.ajax({ type: "post", async: true, url: "../../FormsService.aspx/GetPageNotification", data: data, contentType: "application/json; charset=utf-8", dataType: "json", success: function (msg) { notifyHtml = msg.d; $('#divBgvNoticeBar').html('<ul style="padding-left: 20px;">' + notifyHtml + '</ul>'); if ($.trim(notifyHtml) != "") { $('#divBgvNoticeBar').css('display', 'block'); } else { $('#divBgvNoticeBar').css('display', 'none'); } }, error: function (xhr, status, textRemarks) { notifyHtml = ""; } }); } catch (e) { } return; }
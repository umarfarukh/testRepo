//-----------------------------------------------------------------------=
// <copyright file="IOBUtilityMethods.cs" company="Cognizant Technology Solutions">
// Copyright  . All Rights Reserved.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.Services.ServiceContract
 * Class Name       : IUtilityMethods
 * Version          : 1.0
 * Type             : Interface
 * Purpose          : Interface references of utility service methods
 * Created date     : 2012-Jan-17
 * Author           : 260947
 * Reviewed by      :
 *------------------------------------------------------
 *                  Change history
 *------------------------------------------------------
 * Date             :
 * Author           :
 * Signature        :
 * Reviewed by      :
 * Change details   :
 * -----------------------------------------------------
 *******************************************************
*/

namespace OneC.OnBoarding.Services.ServiceContract
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Security;
    using System.Runtime.Serialization;
    using System.ServiceModel;
    using System.Text;
    using OneC.OnBoarding.DC.CandidateDC;
    using OneC.OnBoarding.DC.UtilityDC;
    #endregion

    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IUtilityMethods" in both code and config file together.
    [ServiceContract(Name = "IOBUtilityMethods", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/OBUtilityMethods/ServiceContracts/")]

    /// <summary>
    /// 369041: Interface which holds all the OB Utility Methods
    /// </summary>
    public interface IOBUtilityMethods
    {
        [OperationContract(Name = "LogException", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: Exception Logging
        /// </summary>
        /// <param name="errDetail">Error Detail</param>  
        void LogException(ErrorDetails errDetail);

        [OperationContract(Name = "SetSession", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Set Session
        /// </summary>
        /// <param name="sessionDetail">Session Detail</param>  
        /// <returns>Set Session</returns>
        SessionDetails SetSession(SessionDetails sessionDetail);

        [OperationContract(Name = "LogEventData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To get Event Data Log 
        /// </summary>
        /// <param name="evntLog">Event Log</param>  
        void LogEventData(EventLog evntLog);

        [OperationContract(Name = "FetchRoles", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch Roles
        /// </summary>
        /// <param name="sessionDetail">Session Detail</param>  
        /// <returns>Fetch Roles</returns>
        UserRolesContainer FetchRoles(SessionDetails sessionDetail);

        [OperationContract(Name = "GetSystemKey", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get System Key
        /// </summary>
        /// <param name="sysKey">System Key Detail</param>  
        /// <returns>Get System Key</returns>
        SystemKey GetSystemKey(SystemKey sysKey);

        [OperationContract(Name = "IsPageAllowed", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Check whether the Page is Allowed
        /// </summary>
        /// <param name="pageAccess">Page Access</param>  
        /// <returns>Get System Key</returns>
        PageAccess IsPageAllowed(PageAccess pageAccess);

        [OperationContract(Name = "IsSessionActive", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Check whether the Session is Active
        /// </summary>
        /// <param name="sessionDetail">Session Detail</param>  
        /// <returns>Is Session Active</returns>
        bool IsSessionActive(SessionDetails sessionDetail);

        [OperationContract(Name = "GetMessage", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Message
        /// </summary>
        /// <param name="messages">Number of messages</param>  
        /// <returns>Get Message</returns>
        Messages GetMessage(Messages messages);

        [OperationContract(Name = "GetExternalUserInfo", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Logged In User Information
        /// </summary>
        /// <param name="sessionDetail">Session Detail</param>  
        /// <returns>Get Logged In User Information</returns>
        UserInfoDC GetLoggedInUserInfo(SessionDetails sessionDetail);

        [OperationContract(Name = "SendNotificationMail", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Send Notification Mail
        /// </summary>
        /// <param name="objMail">Mail Data</param>  
        /// <returns>Send Notification Mail</returns>
        int SendNotificationMail(MailData objMail);

        [OperationContract(Name = "SendMail", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Send Mail
        /// </summary>
        /// <param name="maildata">Mail Data</param>  
        /// <returns>Send Mail</returns>
        string SendMail(MailData maildata);

        [OperationContract(Name = "SendMailWithConfirmBoolStatus", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Send Mail With Confirm Boolean Status
        /// </summary>
        /// <param name="maildata">Mail Data</param>  
        /// <returns>Send Mail With Confirm Boolean Status</returns>
        bool SendMailWithConfirmBoolStatus(MailData maildata);

        [OperationContract(Name = "UploadAttachment", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Upload Attachment
        /// </summary>
        /// <param name="objAttachments">Upload mail Attachments</param>  
        /// <returns>Send Mail With Confirm Boolean Status</returns>
        int UploadAttachment(MailAttachment objAttachments);

        // [OperationContract(Name = "MailSent", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        // [FaultContract(typeof(OBFaultContractFC))]
        // string MailSent(MailerEntity maildata);
        [OperationContract(Name = "GetMckinleyCategories", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get MC kinley Categories
        /// </summary>
        /// <param name="mckinleyCategories">kinley Categories</param>  
        /// <returns>Get MC kinley Categories</returns>
        MCkinleyDC GetMckinleyCategories(MCkinleyDC mckinleyCategories);

        [OperationContract(Name = "GetFilterDate", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Filter Date
        /// </summary>
        /// <param name="sysKey">System Key</param>  
        /// <returns>Get Filter Date</returns>
        SystemKey GetFilterDate(SystemKey sysKey);

        [OperationContract(Name = "GetSurveyData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Survey Data
        /// </summary>
        /// <param name="surveyData">survey Data</param>  
        /// <returns>Get Survey Data</returns>
        SurveyDC GetSurveyData(SurveyDC surveyData);

        [OperationContract(Name = "UpdateECMFileUploadStatus", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Update ECM File Upload Status
        /// </summary>
        /// <param name="objDocumentDetail">Document Detail</param>  
        /// <returns>Update ECM File Upload Status</returns>
        int UpdateECMFileUploadStatus(VirtualDocumentDetail objDocumentDetail);

        [OperationContract(Name = "UpdateIDMRegistartionforRetry", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Update IDM Registration for Retry
        /// </summary>
        /// <param name="sessionDetail">Session Detail</param>  
        /// <returns>Update IDM Registration for Retry</returns>
        int UpdateIDMRegistartionforRetry(SessionDetails sessionDetail);

        [OperationContract(Name = "GetEventMailContent", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Event Mail Content
        /// </summary>
        /// <param name="getMailContent">Get Mail Content</param>  
        /// <returns>Get Event Mail Content</returns>
        GetMailContent GetEventMailContent(GetMailContent getMailContent);

        [OperationContract(Name = "SaveUploadedDocName", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Save Uploaded Document Name
        /// </summary>
        /// <param name="objDocName">Document Name</param>  
        /// <returns>Save Uploaded Document Name</returns>
        int SaveUploadedDocName(ECMDocument objDocName);

        [OperationContract(Name = "GetPageMenuMappings", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Page Menu Mappings
        /// </summary>
        /// <param name="objPageMenuMappingContract">Page Menu Mapping Contract</param>  
        /// <returns>Get Page Menu Mappings</returns>
        PageMenuMappingContainer GetPageMenuMappings(PageMenuMappingContract objPageMenuMappingContract);

        [OperationContract(Name = "FetchUserAssignRoles", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch User Assigned Roles
        /// </summary>
        /// <param name="objRoleAccessDC">Role Access DC</param>  
        /// <returns>Fetch User Assigned Roles</returns>
        UserRolesAccessContainer FetchUserAssignRoles(RoleAccessDC objRoleAccessDC);

        [OperationContract(Name = "FetchActiveUsers", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch Active Users
        /// </summary>
        /// <param name="objRoleAccessDC">Role Access DC</param>  
        /// <returns>Fetch Active Users</returns>
        UserRolesAccessContainer FetchActiveUsers(RoleAccessDC objRoleAccessDC);

        [OperationContract(Name = "SetRoleToAssociate", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: Set Role To Associate
        /// </summary>
        /// <param name="objRoleAccessDC">Role Access DC</param>  
        /// <returns>Set Role To Associate</returns>
        int SetRoleToAssociate(RoleAccessDC objRoleAccessDC);

        // [OperationContract(Name = "GetUploadList", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        // [FaultContract(typeof(OBFaultContractFC))]
        // UploadReturnResponseDC GetUploadList(UploadUtiltiyDC fileUpload);

        // [OperationContract(Name = "SaveUploadResponse", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        // [FaultContract(typeof(OBFaultContractFC))]
        // UploadReturnResponseDC SaveUploadResponse(UploadUtiltiyDC fileUpload);

        /// <summary>
        /// 312020: To update candidate start Date and Location
        /// </summary>
        /// <param name="candDetail">candidate detail</param>
        /// <returns>Returns the upload status</returns>
        [OperationContract(Name = "UpdateCandidateStateAndLocationDetails", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]
        int UpdateCandidateStateAndLocationDetails(StartDateAndLocationDC candDetail);

        /// <summary>
        /// This method is used to get the list of upload configuration. 
        /// </summary>
        /// <param name="fileUpload">Input data contract parameters</param>
        /// <returns>Returns the page configuration list.</returns>
        [OperationContract(Name = "GetUploadList", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]
        string GetUploadList(UploadUtiltiyDC fileUpload);

        /// <summary>
        /// This method is used for transactions.
        /// </summary>
        /// <param name="fileUpload">Input data contract parameters</param>
        /// <returns>Returns the refreshed configuration</returns>
        [OperationContract(Name = "SaveUploadResponse", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]
        string SaveUploadResponse(UploadUtiltiyDC fileUpload);

        /// <summary>
        /// This method is used to get the latest upload URL.
        /// </summary>
        /// <param name="fileUpload">Input data contract parameters</param>
        /// <returns>Returns the latest ECM upload URL.</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1055:UriReturnValuesShouldNotBeStrings", Justification = "Reviewed."), OperationContract(Name = "GetECMUploadURL", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]
        string GetECMUploadURL(UploadUtiltiyDC fileUpload);

        /// <summary>
        /// This method is used to save SAN response.
        /// </summary>
        /// <param name="fileUpload">Input data contract parameters</param>
        [OperationContract(Name = "SaveSANUploadDetails", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]
        void SaveSANUploadDetails(SANUploadDetails fileUpload);
    }
}

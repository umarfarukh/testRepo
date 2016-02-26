//-----------------------------------------------------------------------=
// <copyright file="OBUtilityMethods.cs" company="Cognizant Technology Solutions">
// Copyright  . All Rights Reserved.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.Services.ServiceBase
 * Class Name       : UtilityMethods
 * Version          : 1.0
 * Type             : Class
 * Purpose          : Method references of utility service methods 
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

namespace OneC.OnBoarding.Services.ServiceBase
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.ServiceModel;
    using System.Text;
    using OneC.OnBoarding.BAL;
    using OneC.OnBoarding.BAL.DashBoard;
    using OneC.OnBoarding.BAL.Mckinley;
    using OneC.OnBoarding.BAL.Utility;
    using OneC.OnBoarding.DC.CandidateDC;
    using OneC.OnBoarding.DC.UploadUtility;
    using OneC.OnBoarding.DC.UtilityDC;
    using OneC.OnBoarding.Services.ServiceContract;
    #endregion

    /// <summary>
    /// 369041: Class which holds all the OB Utility Methods mapping to BAL
    /// </summary>
    public sealed class OBUtilityMethods : IOBUtilityMethods, IDisposable
    {
        /// <summary>
        /// 260947: Method which converts occurred exception into custom fault type
        /// 369041: Modified
        /// </summary>
        /// <param name="ex">System Exception type</param>
        /// <returns>OB Fault Contract FC type</returns>
        public static OBFaultContractFC GetFaultException(Exception ex)
        {
            using (OBFaultContractFC retFault = new OBFaultContractFC())
            {
                if (ex == null)
                {
                    throw new ArgumentNullException("ex");
                }

                if (ex != null)
                {
                    retFault.FaultMessage = ex.Message.ToString();
                    retFault.FaultInnerException = ex.InnerException == null ? string.Empty : ex.InnerException.ToString();
                    retFault.FaultStack = ex.StackTrace;
                    retFault.FaultSource = ex.Source;
                }

                    return retFault;
            }
        }

        /// <summary>
        /// 260947: Method which logs system generated exceptions
        /// 369041: Modified
        /// </summary>
        /// <param name="errDetail">This parameter helps in getting the Error Details</param>
        public void LogException(ErrorDetails errDetail)
        {
            try
            {
                using (UtilityBAL objBal = new UtilityBAL())
                {
                    objBal.LogException(errDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312511: Method to create or update session id for active session
        /// 369041: Modified
        /// </summary>
        /// <param name="sessionDetail">To get the Session detail</param>
        /// <returns>Session details</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public SessionDetails SetSession(SessionDetails sessionDetail)
        {
            UtilityBAL objBal = new UtilityBAL();
            try
            {
                return objBal.SetSession(sessionDetail);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
            finally
            {
                objBal = null;
            }
        }

        /// <summary>
        /// 312511: Method to log the user event related data's
        /// 369041: Modified
        /// </summary>
        /// <param name="evntLog">Event Log</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public void LogEventData(EventLog evntLog)
        {
            UtilityBAL objBal = new UtilityBAL();
            try
            {
                objBal.LogEventData(evntLog);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
            finally
            {
                objBal = null;                
            }
        }

        /// <summary>
        /// 208099: Method to Fetch the Roles of the Logged in User
        /// 369041: Modified
        /// </summary>
        /// <param name="sessionDetail">to fetch the roles</param>
        /// <returns>Session Detail</returns>
        public UserRolesContainer FetchRoles(SessionDetails sessionDetail)
        {
            try
            {
                using (UtilityBAL objBal = new UtilityBAL())
                {
                    return objBal.FetchRoles(sessionDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            // finally
            // {
            // }
        }

        /// <summary>
        /// 260947: Method to get system keys from DB
        /// 369041: Modified
        /// </summary>
        /// <param name="sysKey">System key of type SystemKey</param>
        /// <![CDATA[
        ///    SystemKey sysKey = new SystemKey();
        ///    sysKey.KeyCode = "ONBOARDING_KEY";
        ///    sysKey.CountryId = 0;
        ///   string Key = (new UtilityBAL()).GetSystemKey(sysKey).KeyValue;
        /// ]]>
        /// <returns>returns the System Key</returns>
        public SystemKey GetSystemKey(SystemKey sysKey)
        {
            try
            {
                using (UtilityBAL objBal = new UtilityBAL())
                {
                    return objBal.GetSystemKey(sysKey);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 260947: Method to check whether the page is allowed to access for this role
        /// 369041: Modified
        /// </summary>
        /// <param name="pageAccess">Page Access entity which holds RoleGroupId, Country Id, Page Id</param>
        /// <returns>Returns true if allowed, false if not allowed with Message Id</returns>
        public PageAccess IsPageAllowed(PageAccess pageAccess)
        {
            try
            {
                using (UtilityBAL objBal = new UtilityBAL())
                {
                    return objBal.IsPageAllowed(pageAccess);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 260947: Method to check whether the session is active
        /// 369041: Modified
        /// </summary>
        /// <param name="sessionDetail">Session detail</param>
        /// <returns>Returns true if active, false if inactive</returns>
        public bool IsSessionActive(SessionDetails sessionDetail)
        {
            try
            {
                using (UtilityBAL objBal = new UtilityBAL())
                {
                    return objBal.IsSessionActive(sessionDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 220930: Method to fetch  the alert message
        /// 369041: Modified
        /// </summary>
        /// <param name="message">Object containing method type, message ID, message Code</param>
        /// <returns>Object containing display message,display type</returns>
        public Messages GetMessage(Messages message)
        {
            try
            {
                using (UtilityBAL objBal = new UtilityBAL())
                {
                    return objBal.GetMessage(message);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        #region Mail Notifications

        /// <summary>
        /// 208099: Method to Send Mail without attachment
        /// 369041: Modified
        /// </summary>
        /// <param name="maildata">This parameters helps in get the Mail Data</param>
        /// <returns>Sent Mail Data</returns>
        public string SendMail(MailData maildata)
        {
            try
            {
                using (UtilityBAL objBal = new UtilityBAL())
                {
                    return objBal.SendMail(maildata);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 208099: Method to Send Mail with attachment
        /// 369041: Modified
        /// </summary>
        /// <param name="mailData">This parameter gets the Mail Data</param>
        /// <param name="mailAttachmentDetails">This parameter sends the mail attachment details</param>
        /// <returns>Mail Data</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", MessageId = "mailAttachmentDetails", Justification = "Reviewed.")]
        public string SendMail(MailData mailData, MailAttachment mailAttachmentDetails)
        {
            try
            {
                using (UtilityBAL objBal = new UtilityBAL())
                {
                    return objBal.SendMail(mailData);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 260947: Method to Send Mail with attachment
        /// 369041: Modified
        /// </summary>
        /// <param name="mailData">To get the confirmation Mail data</param>
        /// <returns>Status of the confirmation mail sent </returns>
        public bool SendMailWithConfirmBoolStatus(MailData mailData)
        {
            try
            {
                using (UtilityBAL objBal = new UtilityBAL())
                {
                    return objBal.SendMailWithConfirmBoolStatus(mailData);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        // SendMailWithConfirmBoolStatus
        ///// <summary>
        ///// 208099: Method to Send Mail with attachment
        ///// </summary>
        ///// <param name="errDetail"></param>
        // public string MailSent(MailerEntity maildata)
        // {
        //    try
        //    {
        //        return (new UtilityBAL().MailSent(maildata));
        //    }
        //    catch (Exception ex)
        //    {
        //        OBFaultContractFC objFault = GetFaultException(ex);
        //        throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
        //    }
        //    finally
        //    {
        //    }
        // }
        #endregion

        /// <summary>
        /// 260947: Method to get user information of externally logged in user
        /// </summary>
        /// <param name="sessionDetail">Session detail</param>
        /// <returns>Object of ExternalUser type</returns>
        public UserInfoDC GetLoggedInUserInfo(SessionDetails sessionDetail)
        {
            try
            {
                using (UtilityBAL objBal = new UtilityBAL())
                {
                    return objBal.GetLoggedInUserInfo(sessionDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            // finally
            // {
            // }
        }

        /// <summary>
        /// 207953: Method to Fetch all the mailer content based on the notification content code
        /// 369041: Modified
        /// </summary>
        /// <param name="objMail">This parameter is used to get the Notification mail Data</param>
        /// <returns>status of the notification mail</returns>
        public int SendNotificationMail(MailData objMail)
        {
            try
            {
                using (UtilityBAL objBal = new UtilityBAL())
                {
                    return objBal.SendNotificationMail(objMail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            // finally
            // {
            // }
        }

        /// <summary>
        /// 208099:Method to Upload Attachment
        /// 369041: Modified
        /// </summary>
        /// <param name="objAttachments">This parameter helps in uploading attachments</param>
        /// <returns>Uploaded attachments</returns>
        public int UploadAttachment(MailAttachment objAttachments)
        {
            try
            {
                using (UtilityBAL objBal = new UtilityBAL())
                {
                    return objBal.UploadAttachment(objAttachments);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            // finally
            // {
            // }
        }

        #region Mckinley

        /// <summary>
        /// 369041: To get the MC Kinley Categories
        /// </summary>
        /// <param name="mckinleyCategories">kinley Categories</param>
        /// <returns>MC Kinley Categories</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public MCkinleyDC GetMckinleyCategories(MCkinleyDC mckinleyCategories)
        {            
            try
            {
                return (new MckinleyBAL()).GetMckinleyCategories(mckinleyCategories);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            // finally
            // {
            // }
        }

        #endregion Mckinley

        /// <summary>
        /// 208099: Method to get system keys from DB as Dataset
        /// </summary>
        /// <param name="sysKey">System key of type System Key</param>
        /// <![CDATA[
        ///    SystemKey sysKey = new SystemKey();
        ///    sysKey.KeyCode = "ONBOARDING_KEY";
        ///    sysKey.CountryId = 0;
        ///    string Key = (new UtilityBAL()).GetFilterDate(sysKey).KeyValue;
        ///    ]]>
        /// <returns>System Key which gives the Filtered Date</returns>
        public SystemKey GetFilterDate(SystemKey sysKey)
        {
            try
            {
                using (UtilityBAL objBal = new UtilityBAL())
                {
                    return objBal.GetFilterDate(sysKey);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        #region Survey

        /// <summary>
        /// 369041: To get the Survey Data 
        /// </summary>
        /// <param name="surveyData">To get the survey data</param>
        /// <returns>returns survey Data</returns>
        public SurveyDC GetSurveyData(SurveyDC surveyData)
        {
            try
            {
                using (UtilityBAL objBal = new UtilityBAL())
                {
                    return objBal.GetSurveyData(surveyData);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            // finally
            // {
            // }
        }

        #endregion Survey

        #region ECM file upload

        /// <summary>
        /// 260947: Method to log ECM file upload status
        /// 369041: Modified
        /// </summary>
        /// <param name="objDocumentDetail">To get the Document detail</param>
        /// <returns>Updated ECM File Upload Status</returns>
        public int UpdateECMFileUploadStatus(VirtualDocumentDetail objDocumentDetail)
        {
            try
            {
                using (UtilityBAL objBal = new UtilityBAL())
                {
                    return objBal.UpdateECMFileUploadStatus(objDocumentDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        #endregion

        #region GetMailContent

        /// <summary>
        /// 298589: Method to get html content for BGV
        /// 369041: Modified
        /// </summary>
        /// <param name="getMailContent">This parameter helps in getting the content of the event mail</param>
        /// <returns>Event Mail Content</returns>
        public GetMailContent GetEventMailContent(GetMailContent getMailContent)
        {
            try
            {
                using (UtilityBAL objBal = new UtilityBAL())
                {
                    return objBal.GetEventMailContent(getMailContent);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            // finally
            // {
            // }
        }
        #endregion GetMailContent

        /// <summary>
        /// 298589: Method to save ECM return parameter values to database
        /// 369041: Modified
        /// </summary>
        /// <param name="objDocName">To get the Document Name of ECM</param>
        /// <returns>Updated Status</returns>
        public int SaveUploadedDocName(ECMDocument objDocName)
        {
            int retUpdateStatus = 0;
            try
            {
                using (UtilityBAL objUpBAL = new UtilityBAL())
                {
                    retUpdateStatus = objUpBAL.SaveUploadedDocName(objDocName);
                }          
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            return retUpdateStatus;
        }

        /// <summary>
        /// 369041: Public implementation of Dispose pattern callable 
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// 267083: Method to get File Upload data
        /// 369041: Modified
        /// </summary>
        /// <param name="sessionDetail">This parameter helps in getting the sessionDetail</param>
        /// <returns>Updated Status of the IDM Registration</returns>
        public int UpdateIDMRegistartionforRetry(SessionDetails sessionDetail)
        {
            int retUpdateStatus = 0;

            try
            {
                using (UtilityBAL objUpBAL = new UtilityBAL())
                {
                    retUpdateStatus = objUpBAL.UpdateIDMRegistartionforRetry(sessionDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            return retUpdateStatus;
        }

        #region Role Service Methods

        /// <summary>
        /// 369041: Method to get the Page menu mapping 
        /// </summary>
        /// <param name="objPageMenuMappingContract">This parameter helps in getting the Page Menu Mapping Contract</param>
        /// <returns>Page Menu Mappings</returns>
        public PageMenuMappingContainer GetPageMenuMappings(PageMenuMappingContract objPageMenuMappingContract)
        {
            try
            {
                using (UtilityBAL objBal = new UtilityBAL())
                {
                    return objBal.GetPageMenuMappings(objPageMenuMappingContract);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        #endregion

        #region AssignRoles
        /// <summary>
        /// 312020: Method to Fetch to give RolesAccess by the Logged in User
        /// 369041: Modified
        /// </summary>
        /// <param name="roleAccessDC">To get the Role Access Data</param>
        /// <returns>User assigned roles access</returns>
        public UserRolesAccessContainer FetchUserAssignRoles(RoleAccessDC roleAccessDC)
        {
            try
            {
                using (UtilityBAL objBal = new UtilityBAL())
                {
                    return objBal.FetchUserAssignRoles(roleAccessDC);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312020:Method to Fetch Active Users
        /// 369041: Modified
        /// </summary>
        /// <param name="roleAccessDC">Fetch the Active Users Role Access Data</param>
        /// <returns>Role Access Data</returns>
        public UserRolesAccessContainer FetchActiveUsers(RoleAccessDC roleAccessDC)
        {
            try
            {
                using (UtilityBAL objBal = new UtilityBAL())
                {
                    return objBal.FetchActiveUsers(roleAccessDC);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312020:Method To set Roles To the Associates
        /// 369041: Modified
        /// </summary>
        /// <param name="objRoleAccessDC">Role Access Data</param>
        /// <returns>Role access data</returns>
        public int SetRoleToAssociate(RoleAccessDC objRoleAccessDC)
        {
            try
            {
                using (UtilityBAL objBAL = new UtilityBAL())
                {
                    return objBAL.SetRoleToAssociate(objRoleAccessDC);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }
        #endregion

        // #region UploadDC

        // public UploadReturnResponseDC GetUploadList(UploadUtiltiyDC upload)
        // {
        //    try
        //    {
        //        return (new UploadUtilityBAL()).GetUploadList(upload);
        //    }
        //    catch (Exception ex)
        //    {
        //        OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
        //        throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
        //    }
        // }

        // public UploadReturnResponseDC SaveUploadResponse(UploadUtiltiyDC upload)
        // {
        //    try
        //    {
        //        return (new UploadUtilityBAL()).SaveUploadResponse(upload);
        //    }
        //    catch (Exception ex)
        //    {
        //        OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
        //        throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
        //    }
        // }
        // #endregion

        /// <summary>
        /// 312020: Update Candidate Start Date and location
        /// </summary>
        /// <param name="candDetail">candidate detail</param>
        public int UpdateCandidateStateAndLocationDetails(StartDateAndLocationDC candDetail)
        {
            int uploadStatus = 0;
            try
            {
                using (UtilityBAL objBAL = new UtilityBAL())
                {
                    uploadStatus = objBAL.UpdateCandidateStateAndLocationDetails(candDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
            return uploadStatus;
        }

        #region UploadDC

        /// <summary>
        /// This method is used to get the list of upload configuration. 
        /// </summary>
        /// <param name="upload">Input data contract parameters</param>
        /// <returns>Returns the page configuration list.</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public string GetUploadList(UploadUtiltiyDC upload)
        {
            try
            {
                return (new UploadUtilityBAL()).GetUploadList(upload);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// This method is used for transactions.
        /// </summary>
        /// <param name="upload">Input data contract parameters</param>
        /// <returns>Returns the refreshed configuration</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public string SaveUploadResponse(UploadUtiltiyDC upload)
        {
            try
            {
                return (new UploadUtilityBAL()).SaveUploadResponse(upload);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// This method is used to save SAN response.
        /// </summary>
        /// <param name="uploadDetails">Input data contract parameters</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public void SaveSANUploadDetails(SANUploadDetails uploadDetails)
        {
            try
            {
                (new UploadUtilityBAL()).SaveSANUploadDetails(uploadDetails);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// This method is used to get the latest upload URL.
        /// </summary>
        /// <param name="upload">Input data contract parameters</param>
        /// <returns>Returns the latest ECM upload URL.</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public string GetECMUploadURL(UploadUtiltiyDC upload)
        {
            try
            {
                return (new UploadUtilityBAL()).GetECMUploadURL(upload);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        #endregion
    }
}

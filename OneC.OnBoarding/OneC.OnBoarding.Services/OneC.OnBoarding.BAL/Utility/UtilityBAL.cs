//// <copyright file="UtilityBAL.cs" company="CognizantTechnologySolutions">
////Copyright (c) CognizantTechnologySolutions. All rights reserved.
//// </copyright>

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.BAL         
 * Class Name       : UtilityBAL.cs
 * Version          : 1.0
 * Type             : Business Access Class
 * Purpose          : Utility methods for Onboarding
 * Created date     : 2011-Dec-28
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
namespace OneC.OnBoarding.BAL.Utility
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.IO;
    using System.Linq;
    using System.Text;   
    using OneC.OnBoarding.DAL.Utility;
    using OneC.OnBoarding.DC.UtilityDC;
    
    #endregion 
    /// <summary>
    /// Utility BAL
    /// </summary>
    public sealed class UtilityBAL : IDisposable
    {
        /// <summary>
        /// 260947: Method to log raised exception into DB
        /// </summary>
        /// <param name="errDetail">Occurred error detail of type ErrorDetails</param>
        public void LogException(ErrorDetails errDetail)
        {
            using (UtilityDAL objDAL = new UtilityDAL())
            {
                objDAL.LogException(errDetail);
            }
        }

        /// <summary>
        /// 312511: Method to create or update session id for active session
        /// </summary>
        /// <param name="sessionDetail">Passing session detail</param>
        /// <returns>session detail values</returns>
        public SessionDetails SetSession(SessionDetails sessionDetail)
        {
            using (UtilityDAL objDAL = new UtilityDAL())
            {
                return objDAL.SetSession(sessionDetail);
            }
        }

        /// <summary>
        /// 312511: Method to log the user event related data's
        /// </summary>
        /// <param name="evntLog">Event Log</param>
        public void LogEventData(EventLog evntLog)
        {
            using (UtilityDAL objDAL = new UtilityDAL())
            {
                objDAL.LogEventData(evntLog);
            }
        }

       /// <summary>
        /// 208099: Method to Fetch the Roles of the Logged in User
       /// </summary>
       /// <param name="sessionDetail">Session detail</param>
       /// <returns>returns roles</returns>
        public UserRolesContainer FetchRoles(SessionDetails sessionDetail)
        {
            using (UtilityDAL objDAL = new UtilityDAL())
            {
                return objDAL.FetchRoles(sessionDetail);
            }
        }

        /// <summary>
        /// to get the system key
        /// </summary>
        /// <param name="sysKey">System key of type SystemKey</param>
        /// <![CDATA[SystemKey sysKey = new SystemKey();
        ///    sysKey.KeyCode = "ONBOARDING_KEY";
        ///    sysKey.CountryId = 0;
        ///    string Key = (new UtilityBAL()).GetSystemKey(sysKey).KeyValue;]]>
        /// <returns> System key</returns>
        public SystemKey GetSystemKey(SystemKey sysKey)
        {
            using (UtilityDAL objDAL = new UtilityDAL())
            {
                return objDAL.GetSystemKey(sysKey);
            }
        }

        /// <summary>
        /// 208099: Method to get system key through KEYGROUPCODE
        /// </summary>
        /// <param name="sysKey">KEY GROUP CODE</param>
        /// <returns>filter date</returns>
        public SystemKey GetFilterDate(SystemKey sysKey)
        {
            using (UtilityDAL objDAL = new UtilityDAL())
            {
                return objDAL.GetFilterDate(sysKey);
            }
        }

       /// <summary>
        /// 260947: Method to check whether the page is allowed to access for this role
       /// </summary>
        /// <param name="pageAccess">Page Access entity which holds RoleGroupId, Country Id, Page Id</param>
        /// <returns>Returns true if allowed, false if not allowed with Message Id</returns>
        /*
          /// <summary>
         /// 260947: Method to check whether the page is allowed to access for this role
         /// </summary>
         /// <param name="messageId">out parameter to get return message id; if non zero redirect to AccessBlock.aspx</param>
         /// <param name="pageAccess">Page Access entity which holds RoleGroupId, Country Id, Page Id</param>
         /// <returns>Returns true if allowed, false if not allowed with Message Id</returns>
        
         */
        public PageAccess IsPageAllowed(PageAccess pageAccess)
        {
            using (UtilityDAL objDAL = new UtilityDAL())
            {
                return objDAL.IsPageAllowed(pageAccess);
            }
        }

        /// <summary>
        /// 260947: Method to check whether the session is active
        /// </summary>
        /// <param name="sessionDetail">Session detail</param>
        /// <returns>returns is session active status</returns>
        public bool IsSessionActive(SessionDetails sessionDetail)
        {
            using (UtilityDAL objDAL = new UtilityDAL())
            {
                return objDAL.IsSessionActive(sessionDetail);
            }
        }

        /// <summary>
        /// 220930: Method to fetch  the alert message
        /// </summary>
        /// <param name="messages">Object containing method type,message id,message code</param>
        /// <returns>Object containing display message,display type</returns>
        public Messages GetMessage(Messages messages)
        {
            using (UtilityDAL objDAL = new UtilityDAL())
            {
                return objDAL.GetMessage(messages);
            }
        }

       /// <summary>
        /// 208099: Method to Send Mails without Attachments
       /// </summary>
       /// <param name="maildata"> mail data</param>
       /// <returns>returns mail sent data</returns>
        public string SendMail(MailData maildata)
        {
            int mailRefKey = 0;
            string errMsg = string.Empty;
            using (UtilityDAL objDAL = new UtilityDAL())
            {
                objDAL.SendMail(maildata, out mailRefKey, out errMsg);
            }

            return errMsg;
        }

        /// <summary>
        /// 208099: Method to Send Mails without Attachments
        /// </summary>
        /// <param name="maildata">Mail Data</param>
        /// <returns>Returns the Mail Send Status</returns>
        public bool SendMailWithConfirmBoolStatus(MailData maildata)
        {
            int mailRefKey = 0;
            string errMsg = string.Empty;
            using (UtilityDAL objDAL = new UtilityDAL())
            {
                objDAL.SendMail(maildata, out mailRefKey, out errMsg);
            }

            if (mailRefKey > 0)
            {
                return true;
            }
            else
            {
                return false;               
            }
        }

        /// <summary>
        /// 207953:Method to Fetch all the mailer content based on the notification content code
        /// </summary>
        /// <param name="objMailer">data to send the mail</param>
        /// <returns>status to know if mail is sent</returns>
        public int SendNotificationMail(MailData objMailer)
        {
            int mailRefKey = 0;
            int retStatus = 0;
            string errMsg = string.Empty;
            using (UtilityDAL objDAL = new UtilityDAL())
            {
               retStatus = objDAL.SendMail(objMailer, out mailRefKey, out errMsg);
            }

            return retStatus;
        }

        ///// <summary>
        ///// 208099: Method to Send Mails with Attachments
        ///// </summary>
        ///// <param name="MailData">Mail Data</param>
        ///// <returns>Returns the Mail Send Status</returns>
        ////public string MailSent(MailData mailData)
        ////{
        ////    using (VirtualMailData objMailers = new VirtualMailData())
        ////    {
        ////        objMailers.FromId = mailData.FromId;
        ////        objMailers.ToId = mailData.To;
        ////        objMailers.MessageSubject = mailData.Subject;
        ////        objMailers.MessageBody = mailData.Body;
        ////        objMailers.SessionId = mailData.SessionId;
        ////        return new UtilityDAL().SendMail(objMailers);
        ////    }
        ////}

        /// <summary>
        /// 260947: Method to get user information of externally logged in user
        /// </summary>
        /// <param name="sessionDetail">Session detail</param>
        /// <returns>Object of ExternalUser type</returns>
        public UserInfoDC GetLoggedInUserInfo(SessionDetails sessionDetail)
        {
            using (UtilityDAL objDAL = new UtilityDAL())
            {
                return objDAL.GetLoggedInUserInfo(sessionDetail);
            }
        }

        /// <summary>
        /// 208099:Method to Upload Attachment
        /// </summary>
        /// <param name="objAttachments">To send data required for attachments</param>
        /// <returns>returns status of attachment</returns>
        public int UploadAttachment(MailAttachment objAttachments)
        {
            using (UtilityDAL objDAL = new UtilityDAL())
            {
                return objDAL.UploadAttachment(objAttachments);
            }
        }

        /// <summary>
        /// 249510:Method for Survey module
        /// </summary>
        /// <param name="surveyData">data to be sent to get survey</param>
        /// <returns>returns survey data</returns>
        public SurveyDC GetSurveyData(SurveyDC surveyData)
        {
            using (UtilityDAL objDAL = new UtilityDAL())
            {
                return objDAL.GetSurveyData(surveyData);
            }
        }

        /// <summary>
        /// 260947: Method to log ECM file upload status
        /// </summary>
        /// <param name="objDocumentDetail">Data to upload Enterprise Content Management file</param>
        /// <returns>Enterprise Content Management file upload status</returns>
        public int UpdateECMFileUploadStatus(VirtualDocumentDetail objDocumentDetail)
        {
            using (UtilityDAL objDAL = new UtilityDAL())
            {
                return objDAL.UpdateECMFileUploadStatus(objDocumentDetail);
            }
        }

        /// <summary>
        /// Method to Dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// To Update IDM Registration
        /// </summary>
        /// <param name="sessionDetail">Sending session details for IDM Registration</param>
        /// <returns>Status of IDM Registration</returns>
        public int UpdateIDMRegistartionforRetry(SessionDetails sessionDetail)
        {
            using (UtilityDAL objDAL = new UtilityDAL())
            {
                return objDAL.UpdateIDMRegistartionforRetry(sessionDetail);
            }
        }

        /// <summary>
        /// 298589: Method to get html content for BGV
        /// </summary>
        /// <param name="getMailContent"> Details to get mail content</param>
        /// <returns>to get mail content</returns>
        public GetMailContent GetEventMailContent(GetMailContent getMailContent)
        {
            using (UtilityDAL objDAL = new UtilityDAL())
            {
                return objDAL.GetEventMailContent(getMailContent);
            }
        }

        /// <summary>
        /// 298589: Method to get save Enterprise content management uploaded return values
        /// </summary>
        /// <param name="objDocName"> to save uploaded document name</param>
        /// <returns>saved document status</returns>
        public int SaveUploadedDocName(ECMDocument objDocName)
        {
            using (UtilityDAL objDAL = new UtilityDAL())
            {
                return objDAL.SaveUploadedDocName(objDocName);
            }
        }

        #region Role Service Methods
        /// <summary>
        /// To get Page Menu Mapping
        /// </summary>
        /// <param name="objPageMenuMappingContract">parameters for page menu mapping </param>
        /// <returns>returns page menu mapping data</returns>
        public PageMenuMappingContainer GetPageMenuMappings(PageMenuMappingContract objPageMenuMappingContract)
        {
            using (UtilityDAL objDAL = new UtilityDAL())
            {
                return objDAL.GetPageMenuMappings(objPageMenuMappingContract);
            }
        }

        #endregion

        #region Assign Roles
       /// <summary>
        /// 312020: Method to Fetch to give RolesAccess by the Logged in User
       /// </summary>
       /// <param name="roleAccessDC">To fetch Active Roles</param>
       /// <returns>Roles to Assign</returns>
        public UserRolesAccessContainer FetchUserAssignRoles(RoleAccessDC roleAccessDC)
        {
            using (UtilityDAL objDAL = new UtilityDAL())
            {
                return objDAL.FetchUserAssignRoles(roleAccessDC);
            }
        }

        /// <summary>
        /// 312020:Method to fetch ActiveUsers
        /// </summary>
        /// <param name="roleAccessDC">To fetch Active Users</param>
        /// <returns>Active Users</returns>
        public UserRolesAccessContainer FetchActiveUsers(RoleAccessDC roleAccessDC)
        {
            using (UtilityDAL objDAL = new UtilityDAL())
            {
                return objDAL.FetchActiveUsers(roleAccessDC);
            }
        }

        /// <summary>
        /// 312020:Method to Set Roles to Associate
        /// </summary>
        /// <param name="objRoleAccessDC"> To Set Role to Associate</param>
        /// <returns>status of the Assignment</returns>
        public int SetRoleToAssociate(RoleAccessDC objRoleAccessDC)
        {
            using (UtilityDAL objDAL = new UtilityDAL())
            {
                return objDAL.SetRoleToAssociate(objRoleAccessDC);
            }
        }
        #endregion
        /// <summary>
        /// 312020: To update candidate State and Location
        /// </summary>
        /// <param name="candDetail"> Start date and location</param>
        public int UpdateCandidateStateAndLocationDetails(StartDateAndLocationDC candDetail)
        {
            
            using (UtilityDAL objDAL = new UtilityDAL())
            {
               return objDAL.UpdateCandidateStateAndLocationDetails(candDetail);
            }
        }
    }
}

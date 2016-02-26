//// <copyright file="UtilityDAL.cs" company="CognizantTechnologySolutions">
////Copyright (c) CognizantTechnologySolutions. All rights reserved.
//// </copyright>
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DAL         
 * Class Name       : Utility.cs
 * Version          : 1.0
 * Type             : Class
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

namespace OneC.OnBoarding.DAL.Utility
{
    #region Namespaces
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.SqlClient;
    using System.Linq;
    using System.Text;
    using OneC.OnBoarding.DC.UtilityDC;
    #endregion
    /// <summary>
    /// Utility DAL
    /// </summary>
    public sealed class UtilityDAL : IDisposable
    {
        #region Utility DB Methods

        /// <summary>
        /// 260947: Method to log the exception occurred in application
        /// </summary>
        /// <param name="errDetail">Exception detail</param>
        public void LogException(ErrorDetails errDetail)
        {
            DBHelper.ExecuteNonQuery("usp_LogException", errDetail);
        }

       /// <summary>
        /// 260947: Method to create or update session id for active session
       /// </summary>
       /// <param name="sessionDetail">Session Detail</param>
       /// <returns>session details of current user</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "0", Justification = "Reviewed.")]
        public SessionDetails SetSession(SessionDetails sessionDetail)
        {
            DataSet dsResult = DBHelper.ExecuteDataset("usp_UserSessionTracker", sessionDetail);
            if (dsResult != null)
            {
                if (dsResult.Tables.Count > 0)
                {
                    sessionDetail.SessionId = Convert.ToInt64(dsResult.Tables[0].Rows[0]["SessionId"]);
                    sessionDetail.IsSessionActive = Convert.ToBoolean(dsResult.Tables[0].Rows[0]["SessionStatus"]);
                    sessionDetail.IsCustomMessageLogEnabled = Convert.ToBoolean(dsResult.Tables[0].Rows[0]["IsCustomMessageLogEnabled"]);
                }
            }

            dsResult.Dispose();
            return sessionDetail;
        }

        /// <summary>
        /// 312511: Method to log the user event related data's
        /// </summary>
        /// <param name="evntLog">Event Log</param>
        public void LogEventData(EventLog evntLog)
        {
            DBHelper.ExecuteNonQuery("usp_LogUserEventData", evntLog);
        }

       /// <summary>
        /// 208099: Method to Fetch the Roles of the Logged in User
       /// </summary>
       /// <param name="sessionDetail">session detail</param>
       /// <returns>Roles of current user</returns>
        public UserRolesContainer FetchRoles(SessionDetails sessionDetail)
        {
            DataSet dsRoles;
            UserRolesContainer retContainer = new UserRolesContainer();
            UserRolesList retRoles = new UserRolesList();
            dsRoles = DBHelper.ExecuteDataset("usp_FetchRoleURLMap", sessionDetail);

            foreach (DataRow dr in dsRoles.Tables[0].Rows)
            {
                UserRoles objDCRole = new UserRoles();
                objDCRole.RoleGroupId = (RoleGroup)Enum.ToObject(typeof(RoleGroup), dr["RoleGroupId"]);
                objDCRole.RoleGroupCode = dr["RoleGroupCode"].ToString();
                objDCRole.RoleDetailId = dr["RoleDetailId"].ToString();
                objDCRole.RoleDescription = dr["RoleDescription"].ToString();
                objDCRole.RoleCountryId = dr["CountryId"].ToString();
                objDCRole.RoleURL = dr["LandingURL"].ToString();
                objDCRole.RoleDisplayOrder = Convert.ToInt16(dr["DisplayOrder"]);

                retRoles.Add(objDCRole);
            }

            dsRoles.Dispose();
            retContainer.UserRoles = retRoles;
            return retContainer;
        }
         
       /// <summary>
        /// 260947: Method to get system keys from DB
       /// </summary>
       /// <param name="sysKey">system key data</param>
       /// <returns>system key</returns>
        public SystemKey GetSystemKey(SystemKey sysKey)
        {
            string sysKeyValue = DBHelper.ExecuteScalar("usp_GetSystemKey", sysKey).ToString();

            if (sysKeyValue != null)
            { 
                sysKey.KeyValue = sysKeyValue;
            }

            return sysKey;
        }

        /// <summary>
        /// 208099: Method to Fetch Country
        /// </summary>
        /// <returns>country location</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CountryList FetchCountry()
        {
            DataSet dsCountry;

            CountryList retCountry = new CountryList();
            dsCountry = DBHelper.ExecuteDataset("usp_FetchMasters");

            foreach (DataRow dr in dsCountry.Tables[0].Rows)
            {
                Country objDCCOuntry = new Country();
                objDCCOuntry.CountryCode = dr["Code"].ToString();
                objDCCOuntry.CountryDescription = dr["Description"].ToString();
                retCountry.Add(objDCCOuntry);
            }

            dsCountry.Dispose();
            return retCountry;
        }

       /// <summary>
        ///  208099: Method to Fetch State
       /// </summary>
       /// <param name="countryMaster">country master</param>
       /// <returns>fetch state</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public StateList FetchState(Country countryMaster)
        {
            DataSet dsState;
            StateList retState = new StateList();
            dsState = DBHelper.ExecuteDataset("usp_FetchMasters", countryMaster);

            foreach (DataRow dr in dsState.Tables[0].Rows)
            {
                State objDCState = new State();
                objDCState.StateCode = dr["Code"].ToString();
                objDCState.StateDescription = dr["Description"].ToString();
                retState.Add(objDCState);
            }

            dsState.Dispose();
            return retState;
        }

        /// <summary>
        /// 208099: Method to Fetch City
        /// </summary>
        /// <param name="stateMaster">state master</param>
        /// <returns>city name</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CityList FetchCity(State stateMaster)
        {
            DataSet dsCity;
            CityList retCity = new CityList();
            dsCity = DBHelper.ExecuteDataset("usp_FetchMasters", stateMaster);

            foreach (DataRow dr in dsCity.Tables[0].Rows)
            {
                City objDCCity = new City();
                objDCCity.CityCode = dr["Code"].ToString();
                objDCCity.CityDescription = dr["Description"].ToString();
                retCity.Add(objDCCity);
            }

            dsCity.Dispose();
            return retCity;
        }

        /// <summary>
        /// 260947: Method to check whether the page is allowed to access for this role
        /// </summary>
        /// <param name="pageAccess">Page Access entity which holds Role Group Id, Country Id, Page Id</param>
        /// <returns>Returns true if allowed, false if not allowed with Message Id</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "0", Justification = "Reviewed.")]
        public PageAccess IsPageAllowed(PageAccess pageAccess)
        {
            pageAccess.IsAllowed = false;
            pageAccess.MessageId = 0;
            DataSet dsResult = DBHelper.ExecuteDataset("usp_IsPageAllowed", pageAccess);

            if (dsResult != null)
            {
                pageAccess.IsAllowed = Convert.ToBoolean(dsResult.Tables[0].Rows[0][0].ToString());
                pageAccess.MessageId = Convert.ToInt32(dsResult.Tables[0].Rows[0][1].ToString());
            }

            dsResult.Dispose();
            return pageAccess;
        }

       /// <summary>
        /// 260947: Method to check whether the page is allowed to access for this role
       /// </summary>
        /// <param name="sessionDetail">Page Access entity which holds RoleGroupId, Country Id, Page Id</param>
        /// <returns>Returns true if allowed, false if not allowed with Message Id</returns>
        public bool IsSessionActive(SessionDetails sessionDetail)
        {
            bool isActive = false;
            DataSet dsResult = DBHelper.ExecuteDataset("usp_GetSessionStatus", sessionDetail);

            if (dsResult != null)
            {
                if (dsResult.Tables.Count > 0)
                { 
                    isActive = Convert.ToBoolean(dsResult.Tables[0].Rows[0][0].ToString());
                }
            }

            dsResult.Dispose();
            return isActive;
        }

      /// <summary>
        /// 220930: Method to fetch  the alert message
      /// </summary>
        /// <param name="messages">Object containing method type,message id,message code</param>
        /// <returns>Object containing display message,display type</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "0", Justification = "Reviewed.")]
        public Messages GetMessage(Messages messages)
        {
            DataSet dsResult = DBHelper.ExecuteDataset("usp_getDisplayMsg", messages);
            if (dsResult != null)
            {
                messages.DisplayMessage = dsResult.Tables[0].Rows[0]["DisplayMessage"].ToString();
                messages.DisplayType = dsResult.Tables[0].Rows[0]["DisplayType"].ToString();
            }

            dsResult.Dispose();
            return messages;
        }

        /// <summary>
        /// 260947: Method to get user information of externally logged in user
        /// </summary>
        /// <param name="sessionDetail">Session detail</param>
        /// <returns>Object of ExternalUser type</returns>
        public UserInfoDC GetLoggedInUserInfo(SessionDetails sessionDetail)
        {
            UserInfoDC user = new UserInfoDC();
            DataSet dsResult = DBHelper.ExecuteDataset("usp_GetLoggedInUserInfo", sessionDetail);
            if (dsResult != null)
            {
                user.LoginId = dsResult.Tables[0].Rows[0]["LoginId"].ToString();
                user.FirstName = dsResult.Tables[0].Rows[0]["FirstName"].ToString();
                user.LastName = dsResult.Tables[0].Rows[0]["LastName"].ToString();
                user.EmailId = dsResult.Tables[0].Rows[0]["EmailId"].ToString();
                user.DisplayName = dsResult.Tables[0].Rows[0]["DisplayName"].ToString();
                user.IsExternalUser = Convert.ToBoolean(dsResult.Tables[0].Rows[0]["UserType"].ToString());
                user.IsCandidate = Convert.ToBoolean(dsResult.Tables[0].Rows[0]["IsCandidate"].ToString());
                user.LoggedInUser = dsResult.Tables[0].Rows[0]["LoggedInUser"].ToString();
                user.IsApplicationInSupportMode = Convert.ToBoolean(dsResult.Tables[0].Rows[0]["IsApplicationInSupportMode"].ToString());
                user.EnableIdmRetry = Convert.ToBoolean(dsResult.Tables[0].Rows[0]["EnableIdmRetry"].ToString());
                user.ChkRegistrationStatus = Convert.ToBoolean(dsResult.Tables[0].Rows[0]["ChkRegistrationStatus"].ToString());
            }

            dsResult.Dispose();
            return user;
        }

        /// <summary>
        /// 249510: Method to get survey xml
        /// </summary>
        /// <param name="surveyData">Survey data</param>
        /// <returns>survey status</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "0", Justification = "Reviewed."), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public SurveyDC GetSurveyData(SurveyDC surveyData)
        {
            SurveyDC objSurveyDC = new SurveyDC();
            DataSet dsSurveyData;
            dsSurveyData = DBHelper.ExecuteDataset("usp_Survey_GetSurveyDetail", surveyData);
            if (dsSurveyData != null && dsSurveyData.Tables.Count > 0)
            {
                foreach (DataRow dr in dsSurveyData.Tables[0].Rows)
                {
                    if (surveyData.SpMode == 0)
                    { 
                    objSurveyDC.SurveyDataXml = dr["SurveyDataXml"].ToString();
                    objSurveyDC.SurveyDesignXml = dr["SurveyDesignXml"].ToString();
                    objSurveyDC.CandidateSurveyDetailXml = dr["SurveyData"].ToString();
                    objSurveyDC.SurveyType = dr["SurveyType"].ToString();
                    objSurveyDC.SurveyStatus = dr["SurveyStatus"].ToString();
                    }
                    else
                    {
                        objSurveyDC.ReturnSurveyType = Convert.ToInt32(dr["ReturnSurveyType"]);
                    }
                }
            }
           
            return objSurveyDC;
        }

        #region Mail Notification

        /// <summary>
        /// 208099: Method to Send Mails
        /// </summary>
        /// <param name="mailData">mail data</param>
        /// <param name="mailRefKey">mail reference key</param>
        /// <param name="mailErrorMsg">error message</param>
        /// <returns>mail status</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "0", Justification = "Reviewed.")]
        public int SendMail(MailData mailData, out int mailRefKey, out string mailErrorMsg)
        {
            int retStatus = 0;
            mailErrorMsg = string.Empty;
            mailRefKey = 0;
            mailData.SpMode = 1;
            DataSet ds = DBHelper.ExecuteDataset("usp_Notify_SendEventMail", mailData);
            if (ds.Tables.Count > 0)
            {
                retStatus = Convert.ToInt16(ds.Tables[1].Rows[0][0].ToString());
                if (retStatus == 0)
                {
                    mailErrorMsg = ds.Tables[2].Rows[0][0].ToString();
                }
                    else
                {
                    mailRefKey = Convert.ToInt32(ds.Tables[0].Rows[0][0].ToString());
                    mailErrorMsg = retStatus.ToString();
                    if (mailData.MailAttachmentsDetail != null)
                    { 
                        this.UploadAttachmentToDB(mailData.SessionId, mailRefKey, mailData.MailAttachmentsDetail); ////retStatus to  mailRefKey changed to as per Chitanya  require 
                    }
                }
            }

            return retStatus;
        }

        /// <summary>
        /// 207953:Method to Fetch all the mailer content based on the notification content code
        /// </summary>
        /// <param name="objMail">data required mail</param>
        /// <returns>mail status</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public int SendNotificationMail(MailData objMail)
        {
            int retStatus = 0;
            //// MailData objNotfmail = new MailData();
            DataSet dsmail = new DataSet();
            dsmail = DBHelper.ExecuteDataset("usp_Notify_SendEventMail", objMail);
            if (dsmail.Tables.Count > 0)
            {
                retStatus = Convert.ToInt16(dsmail.Tables[1].Rows[0][0].ToString());
            }

            return retStatus;
        }

        /// <summary>
        /// 208099:Method to Upload Attachment
        /// </summary>
        /// <param name="objAttachments"> attachment data</param>
        /// <returns>upload status</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public int UploadAttachment(MailAttachment objAttachments)
        {
            int retStatus = 0;
            DataSet dsmail = new DataSet();
            dsmail = DBHelper.ExecuteDataset("usp_InsertAttachementIntoTemp", objAttachments);
            if (dsmail.Tables.Count > 0)
            {
                retStatus = Convert.ToInt16(dsmail.Tables[0].Rows[0][0].ToString());
            }

            return retStatus;
        }

        #endregion

        #endregion

        /// <summary>
        /// 208099: Method to get system key through KEYGROUPCODE
        /// </summary>
        /// <param name="sysKey">Key Group code</param>
        /// <returns>filter date</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "0", Justification = "Reviewed.")]
        public SystemKey GetFilterDate(SystemKey sysKey)
        {
            DataSet dsKeys;
            dsKeys = DBHelper.ExecuteDataset("usp_GetSystemKey", sysKey);

            if (dsKeys != null)
            {
                if (dsKeys.Tables.Count > 0)
                {
                    sysKey.KeyValue = dsKeys.Tables[0].Rows[0][2].ToString();
                }
            }

            dsKeys.Dispose();
            return sysKey;
        }

        /// <summary>
        /// Update ECM file uploaded status
        /// </summary>
        /// <param name="objDocumentDetail">Document property</param>
        /// <returns> upload status</returns>
        public int UpdateECMFileUploadStatus(VirtualDocumentDetail objDocumentDetail)
        {
            return Convert.ToInt32(DBHelper.ExecuteScalar("usp_ECM_UpdateStatus", objDocumentDetail));
        }

        /// <summary>
        /// dispose method
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// To update IDM Registration for retry
        /// </summary>
        /// <param name="sessionDetail">details of session</param>
        /// <returns>status of registration for retry</returns>
        public int UpdateIDMRegistartionforRetry(SessionDetails sessionDetail)
        {
            return Convert.ToInt32(DBHelper.ExecuteScalar("usp_UpdateLoginIdfromIDMRetry", sessionDetail));
        }

        /// <summary>
        /// 298589: Method to get data table similar to physical table
        /// </summary>
        /// <param name="getMailContent">mail content</param>
        /// <returns>mail data</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public GetMailContent GetEventMailContent(GetMailContent getMailContent)
        {
            GetMailContent objGetMailContent = new GetMailContent();
            DataSet dsGetMailContent;
            dsGetMailContent = DBHelper.ExecuteDataset("usp_Notify_GetEventMailContent", getMailContent);
            if (dsGetMailContent != null && dsGetMailContent.Tables.Count > 0)
            {
                foreach (DataRow dr in dsGetMailContent.Tables[0].Rows)
                {
                    objGetMailContent.BodyContent = dr["BodyContent"].ToString();
                    objGetMailContent.HeaderContent = dr["HeaderContent"].ToString();
                    objGetMailContent.FooterContent = dr["FooterContent"].ToString();
                    objGetMailContent.Subject = dr["Subject"].ToString();
                    objGetMailContent.FromId = dr["FromId"].ToString();
                    objGetMailContent.ToId = dr["ToId"].ToString();
                    objGetMailContent.CcId = dr["CcId"].ToString();
                    objGetMailContent.BccId = dr["BccId"].ToString();
                }
            }

            return objGetMailContent;
        }

        #region ECM
        
        /// <summary>
        /// Method to Save uploaded return values in data base
        /// </summary>
        /// <param name="objDocName">Document name</param>
        /// <returns>saved status</returns>
        public int SaveUploadedDocName(ECMDocument objDocName)
        {
            return Convert.ToInt32(DBHelper.ExecuteScalar("usp_BGV_SaveEcmstatusMessage", objDocName));
        }

        #endregion

        #region Role Service Methods
        /// <summary>
        /// To get page menu mappings
        /// </summary>
        /// <param name="objPageMenuMappingContract">Page and menu mapping</param>
        /// <returns>menu mapping data</returns>
        public PageMenuMappingContainer GetPageMenuMappings(PageMenuMappingContract objPageMenuMappingContract)
        {
            using (PageMenuMappingContainer objPageMenuMappingContainer = new PageMenuMappingContainer())
            {
                DataSet dsGetPageMenuMappings = DBHelper.ExecuteDataset("dbo.usp_Role_PageMenuData", objPageMenuMappingContract);
                if (dsGetPageMenuMappings != null && dsGetPageMenuMappings.Tables.Count > 0 && dsGetPageMenuMappings.Tables[0].Rows.Count > 0)
                {
                    PageMenuMappingList objPageMenuMappingList = new PageMenuMappingList();

                    foreach (DataRow dr in dsGetPageMenuMappings.Tables[0].Rows)
                    {
                        using (PageMenuMapping objPageMenuMapping = new PageMenuMapping(Convert.ToInt32(dr["MenuId"]), dr["MenuName"].ToString(), dr["MenuToolTip"].ToString(), dr["MenuImage"].ToString(), dr["PageUrl"].ToString(), dr["EventOnClick"].ToString(), dr["CssClass"].ToString()))
                        {
                            objPageMenuMappingList.Add(objPageMenuMapping);
                        }
                    }

                    objPageMenuMappingContainer.PageMenuMappings = objPageMenuMappingList;
                }

                dsGetPageMenuMappings.Dispose();
                return objPageMenuMappingContainer;
            }
        }

        #endregion

        #region Assign Roles
       /// <summary>
        /// 312020: Method to Fetch to give RolesAccess by the Logged in User
       /// </summary>
       /// <param name="roleAccessDC">role Access</param>
       /// <returns>Assigned Roles</returns>
        public UserRolesAccessContainer FetchUserAssignRoles(RoleAccessDC roleAccessDC)
        {
            DataSet dstRolesAccess;
            UserRolesAccessContainer retAccessContainer = new UserRolesAccessContainer();
            UserRolesAceesList retRolesAccessListObj = new UserRolesAceesList();
            dstRolesAccess = DBHelper.ExecuteDataset("usp_FetchRoleToAssignData", roleAccessDC);

            foreach (DataRow dr in dstRolesAccess.Tables[0].Rows)
            {
                RoleAccessDC objDCRoleAccess = new RoleAccessDC();
                objDCRoleAccess.RoleDetailId = dr["RoleId"].ToString();
                objDCRoleAccess.CountryId = Convert.ToInt32(dr["CountryId"]);
                objDCRoleAccess.RoleName = dr["RoleDescription"].ToString();
                objDCRoleAccess.CountryName = dr["CountryName"].ToString();
                retRolesAccessListObj.Add(objDCRoleAccess);
            }

            dstRolesAccess.Dispose();
            retAccessContainer.UserRolesListObj = retRolesAccessListObj;
            return retAccessContainer;
        }

      /// <summary>
        /// 312020:Method to fetch ActiveUsers
      /// </summary>
      /// <param name="roleAccessDC">role access</param>
      /// <returns>active users</returns>
        public UserRolesAccessContainer FetchActiveUsers(RoleAccessDC roleAccessDC)
        {
            DataSet dstActiveUsers;
            UserRolesAccessContainer objContainerActiveUsers = new UserRolesAccessContainer();
            UserRolesAceesList objActiveList = new UserRolesAceesList();
            RoleAssociateList objretAssociateList = new RoleAssociateList();
            dstActiveUsers = DBHelper.ExecuteDataset("usp_FetchActiveUsersForRole", roleAccessDC);

            foreach (DataRow drwActUsr in dstActiveUsers.Tables[0].Rows)
            {
                RoleAccessDC objActiveClass = new RoleAccessDC();
                objActiveClass.ActiveUserId = drwActUsr["ActiveUserId"].ToString();
                objActiveClass.ActiveUserName = drwActUsr["ActiveUserName"].ToString();
                objActiveClass.ActivationDate = drwActUsr["ActivationDate"].ToString();
                objActiveClass.PortFolio = drwActUsr["PortFolio"].ToString();
                objActiveList.Add(objActiveClass);
            }

            foreach (DataRow drwAssoc in dstActiveUsers.Tables[1].Rows)
            {
                RoleAssociateDc objDCAssoc = new RoleAssociateDc();
                objDCAssoc.AssociateId = Convert.ToInt64(drwAssoc["AssociateId"]);
                objDCAssoc.AssociateName = drwAssoc["AssociateName"].ToString();
                objDCAssoc.Designation = drwAssoc["Designation"].ToString();
                objDCAssoc.Location = drwAssoc["Location"].ToString();
                objretAssociateList.Add(objDCAssoc);
            }

            dstActiveUsers.Dispose();
            objContainerActiveUsers.UserRolesListObj = objActiveList;
            objContainerActiveUsers.UserRolesListObj1 = objretAssociateList;
            return objContainerActiveUsers;
        }

       /// <summary>
        /// 312020:Setting Role to the Associate
       /// </summary>
       /// <param name="objRoleAccessDC">Accessing roles</param>
       /// <returns>status of Associate</returns>
        public int SetRoleToAssociate(RoleAccessDC objRoleAccessDC)
        {
            return Convert.ToInt32(DBHelper.ExecuteScalar("usp_Role_SetUserAccess", objRoleAccessDC));
        }
        #endregion       
  
        /// <summary>
        /// 312020: Method to update Update Candidate State And LocationDetails
        /// </summary>
        /// <param name="candDetail"> Candidate detail are provided to do update parameters like EDOJ , Offer status , Email Id </param>
        public int UpdateCandidateStateAndLocationDetails(StartDateAndLocationDC candDetail)
        {
            int uploadStatus = 0;
            DataSet datsetResult = DBHelper.ExecuteDataset("usp_UpdateCandidateStartdateAndLocation", candDetail);
            if (datsetResult != null)
            {
                if (datsetResult.Tables.Count > 0)
                {
                    uploadStatus = Convert.ToInt32(datsetResult.Tables[0].Rows[0][0].ToString());
                }
            }

            datsetResult.Dispose();
            return uploadStatus;
        }

        // Private methods are reordered to remove stylecop warngins

        /// <summary>
        /// 260947: Method to upload attachment into DB directly through BulkCopy mode
        /// </summary>
        /// <param name="sessionId">session id</param>
        /// <param name="mailRef">mail reference</param>
        /// <param name="mailAttachmentsDetail">mail attachment detail</param>
        /// <returns>upload status</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        private bool UploadAttachmentToDB(long sessionId, long mailRef, MailAttachmentsDetail mailAttachmentsDetail)
        {
            bool retStatus = false;
            SqlTransaction transaction = null;
            try
            {
                using (SqlConnection sqlConn = DBHelper.GetConnection)
                {
                    sqlConn.Open();

                    transaction = sqlConn.BeginTransaction();
                    SqlCommand cmd = new SqlCommand();

                    cmd.Transaction = transaction;

                    DataTable tble_AllAttachment = this.GetAttachmentTable();

                    foreach (MailAttachment ma in mailAttachmentsDetail.MailAttachments)
                    {
                        DataRow dr = tble_AllAttachment.NewRow();
                        dr["Fk_MailerHeader"] = mailRef;
                        dr["MailAFileName"] = ma.AttachmentName;
                        dr["MailAData"] = ma.AttachmentContent;
                        dr["CreatedBy"] = sessionId;
                        dr["ModifiedBy"] = sessionId;
                        dr["RowStatus"] = 1;
                        tble_AllAttachment.Rows.Add(dr);
                    }

                    SqlBulkCopy fileStorage = new SqlBulkCopy(sqlConn, SqlBulkCopyOptions.Default, transaction);

                    fileStorage.DestinationTableName = "MailerAttachment";

                    fileStorage.ColumnMappings.Add("Fk_MailerHeader", "Fk_MailerHeader");
                    fileStorage.ColumnMappings.Add("MailAFileName", "MailAFileName");
                    fileStorage.ColumnMappings.Add("MailAData", "MailAData");
                    fileStorage.ColumnMappings.Add("CreatedBy", "CreatedBy");
                    fileStorage.ColumnMappings.Add("ModifiedBy", "ModifiedBy");
                    fileStorage.ColumnMappings.Add("RowStatus", "RowStatus");
                    fileStorage.WriteToServer(tble_AllAttachment, DataRowState.Added);

                    transaction.Commit();
                    fileStorage.Close();
                    cmd.Dispose();
                }

                retStatus = true;
            }
            catch
            {
                if (transaction != null)
                {
                    transaction.Rollback();
                }

                retStatus = false;
                throw;
            }
            finally
            {
                if (transaction != null)
                {
                    transaction.Dispose();
                }
            }

            return retStatus;
        }

        // 261890- Changed Private methods order to remove stylecop

        /// <summary>
        /// 260947: Method to get data table similar to physical table
        /// </summary>
        /// <returns>Data Table</returns>
        private DataTable GetAttachmentTable()
        {
            using (DataTable tb = new DataTable())
            {
                DataColumn frgnky_MailerHeader = new DataColumn("Fk_MailerHeader", typeof(long));
                tb.Columns.Add(frgnky_MailerHeader);

                DataColumn mailAFileName = new DataColumn("MailAFileName", typeof(string));
                tb.Columns.Add(mailAFileName);

                DataColumn mailAData = new DataColumn("MailAData", typeof(byte[]));
                tb.Columns.Add(mailAData);

                DataColumn col_CreatedBy = new DataColumn("CreatedBy", typeof(long));
                tb.Columns.Add(col_CreatedBy);

                DataColumn col_ModifiedBy = new DataColumn("ModifiedBy", typeof(long));
                tb.Columns.Add(col_ModifiedBy);

                DataColumn col_RowStatus = new DataColumn("RowStatus", typeof(int));
                tb.Columns.Add(col_RowStatus);

                return tb;
            }
        }
    }
}

//-----------------------------------------------------------------------
// <copyright file="Utility.cs" company="Cognizant Technology Solutions">
// Copyright  . All Rights Reserved.
// </copyright>
//-----------------------------------------------------------------------

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp.Utility
 * Class Name       : Utility
 * Version          : 1.0
 * Type             : Static Class
 * Purpose          : Utility methods for webapp
 * Created date     : 2012-Jan-24
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
using org.bouncycastle.asn1.ocsp;
namespace OneC.OnBoarding.WebApp.Utility
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Configuration;
    using System.Data;
    using System.Data.SqlClient;
    using System.Diagnostics;
    using System.Linq;
    using System.Reflection;
    using System.ServiceModel;
    using System.Web;
    using CTS.OneCognizant.Platform.CoreServices;
    using OneC.OnBoarding.DC.UtilityDC;
    using OneC.OnBoarding.WebApp.Service.OBUtilityMethods;

    #endregion
    /// <summary>
    /// 260947: Class which contains utility methods of onboarding web app
    /// </summary>
    public sealed class UtilityMethods : IDisposable
    {
        #region Onboarding Constants
        /// <summary>
        /// OB ACCESS DENIED 
        /// </summary>
        public const int OBACCESSDENIED = 0;

        /// <summary>
        /// OB UNAUTHORIZED ACCESS
        /// </summary>
        public const int OBUNAUTHORIZEDACCESS = 6;

        /// <summary>
        /// OB SESSION_NOT_FOUND
        /// </summary>
        public const int OBSESSIONNOTFOUND = 1;

        /// <summary>
        /// OB SESSION_EXPIRED
        /// </summary>
        public const int OBSESSIONEXPIRED = 7;

        /// <summary>
        /// OB UNAUTHORIZED_MAKEMEAS
        /// </summary>
        public const int OBUNAUTHORIZEDMAKEMEAS = 9;

        /// <summary>
        /// OB MAINTENANCE
        /// </summary>
        public const int OBMAINTENANCE = 51;

        /// <summary>
        /// OB NOTIFY_JOB_STATUS
        /// </summary>
        public const int OBNOTIFYJOBSTATUS = 5;

        /// <summary>
        /// OB NOTIFY_SERVICE_STATUS
        /// </summary>
        public const int OBNOTIFYSERVICESTATUS = 12;

        /// <summary>
        /// OB NOTIFY_POST_QUERY
        /// </summary>
        public const int OBNOTIFYPOSTQUERY = 16;

        /// <summary>
        /// session Expire Duration
        /// </summary>
        private string sessionExpireDuration;

        /// <summary>
        /// session WarningDuration
        /// </summary>
        private string sessionWarningDuration;

        /// <summary>
        /// Gets Session Detail
        /// </summary>
        public SessionDetails SessionDetail
        {
            // gets { return sessionInfo; }
            get { return (SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail"); }
        }

        /// <summary>
        /// Gets SessionExpireDuration
        /// </summary>
        public string SessionExpireDuration
        {
            get { return this.sessionExpireDuration; }
        }

        /// <summary>
        /// Gets SessionWarningDuration
        /// </summary>
        public string SessionWarningDuration
        {
            get { return this.sessionWarningDuration; }
        }

        /// <summary>
        /// 260947: Method which logs events of users
        /// </summary>
        /// <param name="sessionId">Current session id</param>
        /// <param name="candidateId">CandidateId of logged in candidate</param>
        /// <param name="taskId">TaskId to which the candidate is going to perform operation</param>
        /// <param name="eventName">Performing event</param>
        /// <param name="methodName">Exact method name through which the event occurred</param>
        /// <param name="value">Current value</param>
        /// <param name="isValueXmlType">True if supplied value is of XML type else false</param>
        /// <param name="comment">necessary comments received</param>
        public static void LogEventData(long sessionId, long candidateId, int taskId, string eventName, string methodName, string value, bool isValueXmlType, string comment)
        {
            OneC.OnBoarding.DC.UtilityDC.EventLog evntLog = new OneC.OnBoarding.DC.UtilityDC.EventLog();
            evntLog.SessionId = sessionId;
            evntLog.CandidateId = candidateId;
            evntLog.PageId = taskId;
            evntLog.Event = eventName;
            evntLog.MethodName = methodName;
            evntLog.Value = value;
            evntLog.XmlType = isValueXmlType;
            evntLog.EventTS = DateTime.Now.ToLocalTime();
            if (string.IsNullOrEmpty(comment) || string.IsNullOrWhiteSpace(comment))
            {
                evntLog.Comment = null;
            }
            else
            {
                evntLog.Comment = comment.ToString();
            }

            // Creating new client to get message from DB
            var clntUtility = new Service.OBUtilityMethods.OBUtilityMethodsClient();
            try
            {
                clntUtility.Open();
                clntUtility.LogEventData(evntLog);
                //// clntUtility.Close(); //// already closed in Final block
            }
            catch (FaultException<OBFaultContractFC> exceptionFault)
            {
                UtilityMethods objUtil = new UtilityMethods();
                (new ErrorLogger(objUtil.SessionDetail.SessionId)).LogError(exceptionFault);
            }
            catch (Exception ex)
            {
                UtilityMethods objUtil = new UtilityMethods();
                (new ErrorLogger(objUtil.SessionDetail.SessionId)).LogError(ex);
            }
            finally
            {
                if (clntUtility.State != System.ServiceModel.CommunicationState.Faulted)
                {
                    clntUtility.Close();
                }
                else
                {
                    clntUtility.Abort();
                }

                clntUtility = null;
            }
        }

        /// <summary>
        /// 260947: Method which initializes session
        /// </summary>
        /// <param name="httpContext">HttpContext object which contains user information</param>
        /// <param name="httpRequest">HttpRequest object which contains request data</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", MessageId = "httpContext", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1506:AvoidExcessiveClassCoupling", Justification = "Reviewed.")]
        public void InitiateSession(HttpContext httpContext, HttpRequest httpRequest)
        {
            UserContext objUser;
            string loginId = string.Empty;

            // Initializing new session
            try
            {
                if (ConfigurationManager.AppSettings["Isdowntimeenabled"].ToString() == "true")
                {
                    HttpContext.Current.Response.Redirect("../CommonPages/DownTime.aspx");
                }

                if (ConfigurationManager.AppSettings["ispenabled"].ToString() == "true")
                {
                    string loginName = HttpContext.Current.User.Identity.Name;
                    loginId = HttpContext.Current.User.Identity.Name.Split('\\')[1];
                }
                else
                {
                    objUser = UserContext.GetUserContext();
                    loginId = objUser.CurrentUser.UserId;
                }
            }
            catch
            {
                string loginName = HttpContext.Current.User.Identity.Name;

                if (loginName != null && loginName.Contains('\\'))
                {
                    loginId = HttpContext.Current.User.Identity.Name.Split('\\')[1];
                }
                else
                {
                    loginId = loginName;
                }
            }

            // Retrieving session parameters
            SessionDetails sessDetails = new SessionDetails();
            sessDetails.LoginId = loginId;
            sessDetails.LoggedInUser = loginId;
            sessDetails.BrowserDetails = '{' + httpRequest.Browser.Browser + '}'
                                        + '{' + httpRequest.Browser.Version + '}'
                                        + '{' + httpRequest.Browser.EcmaScriptVersion + '}'
                                        + '{' + Environment.MachineName + '}';

            sessDetails.SessionFlag = 0;
            sessDetails.UniqueSessionId = HttpContext.Current.Session.SessionID;
            sessDetails.IsSessionActive = true;

            if (httpRequest.QueryString["MakeMeAs"] != null)
            {
                sessDetails.LoginId = httpRequest.QueryString["MakeMeAs"];
            }

            string ipList = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            if (string.IsNullOrEmpty(ipList))
            {
                sessDetails.IpAddress = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
            }
            else
            {
                sessDetails.IpAddress = ipList.Split(',')[0];
            }

            if (ConfigurationManager.AppSettings["ispenabled"].ToString() == "true")
            {
                string datbConString = ConfigurationManager.ConnectionStrings["conString"].ConnectionString;
                SqlConnection conSqlConnection;
                SqlDataAdapter dataEmpData = new SqlDataAdapter();
                DataSet dtsResult = new DataSet();

                try
                {
                    using (conSqlConnection = new SqlConnection(datbConString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand("usp_UserSessionTracker", conSqlConnection))
                        {
                            dataEmpData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;

                            cmdEmpData.Parameters.AddWithValue("@LoginId", sessDetails.LoginId);
                            cmdEmpData.Parameters.AddWithValue("@BrowserDetails", sessDetails.BrowserDetails);
                            cmdEmpData.Parameters.AddWithValue("@SessionFlag", sessDetails.SessionFlag);
                            cmdEmpData.Parameters.AddWithValue("@UniqueSessionId", sessDetails.UniqueSessionId);
                            cmdEmpData.Parameters.AddWithValue("@LoggedInUser", sessDetails.LoggedInUser);
                            cmdEmpData.Parameters.AddWithValue("@Remarks", sessDetails.Remarks);
                            cmdEmpData.Parameters.AddWithValue("@SessionId", sessDetails.SessionId);
                            cmdEmpData.Parameters.AddWithValue("@IpAddress", sessDetails.IpAddress);

                            cmdEmpData.ExecuteNonQuery();
                            dataEmpData.Fill(dtsResult);
                        }

                        conSqlConnection.Close();
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }

                if (dtsResult != null)
                {
                    if (dtsResult.Tables.Count > 0)
                    {
                        sessDetails.SessionId = Convert.ToInt64(dtsResult.Tables[0].Rows[0]["SessionId"]);
                        sessDetails.IsSessionActive = Convert.ToBoolean(dtsResult.Tables[0].Rows[0]["SessionStatus"]);
                        sessDetails.IsCustomMessageLogEnabled = Convert.ToBoolean(dtsResult.Tables[0].Rows[0]["IsCustomMessageLogEnabled"]);
                    }
                }
            }
            else
            {
                var clntUtility = new OBUtilityMethodsClient();
                try
                {
                    clntUtility.Open();
                    sessDetails = clntUtility.SetSession(sessDetails);
                }
                catch (FaultException<OBFaultContractFC> ex)
                {
                    using (ErrorLogger err = new ErrorLogger())
                    {
                        err.LogError(ex);
                    }
                }
                catch (Exception ex)
                {
                    using (ErrorLogger err = new ErrorLogger())
                    {
                        err.LogError(ex);
                    }
                }
                finally
                {
                    if (clntUtility.State != System.ServiceModel.CommunicationState.Faulted)
                    {
                        clntUtility.Close();
                    }
                    else
                    {
                        clntUtility.Abort();
                    }

                    clntUtility = null;
                }
            }
        #endregion

            // Initiate session timeout parameters
            // GetSessionDurationParameters();

            // Setting value in session
            (new SessionHelper()).SetSessionValue("SessionDetail", sessDetails);
        }

        /// <summary>
        /// 260947: Method which updates the session status in System Session object as inactive if time out
        /// </summary>
        /// <param name="status">status of the session</param>
        public void SetSessionActive(bool status)
        {
            SessionDetails sessDetails = this.SessionDetail;
            sessDetails.IsSessionActive = status;
            (new SessionHelper()).SetSessionValue("SessionDetail", sessDetails);
        }

        /// <summary>
        /// 260947: Global redirection method to Access block
        /// </summary>
        /// <param name="blockId">sending block id</param>
        public void RedirectToAccessBlock(int blockId)
        {
            HttpContext.Current.Response.Cache.SetCacheability(HttpCacheability.NoCache);
            HttpContext.Current.Response.Cache.SetExpires(DateTime.UtcNow.AddHours(-1));
            HttpContext.Current.Response.Cache.SetNoStore();
            string redirectUrl = string.Empty;
            if (this.SessionDetail != null)
            {
                redirectUrl = "../AccessBlock.aspx?SSId=" + this.SessionDetail.SessionId.ToString() + "&BlockId=" + blockId.ToString();
            }
            else
            {
                redirectUrl = "../AccessBlock.aspx?BlockId=" + blockId.ToString();
            }

            HttpContext.Current.Response.Redirect(redirectUrl, false);
            HttpContext.Current.Response.Clear();
            HttpContext.Current.ApplicationInstance.CompleteRequest();
        }

        /// <summary>
        /// 260947: Method which retrieves session parameters from DB and stores in static variable
        /// </summary>
        public void GetSessionDurationParameters()
        {
            this.sessionExpireDuration = this.GetKeyValue(23); // Getting session expire duration
            this.sessionWarningDuration = this.GetKeyValue(24); // Getting session warning duration
        }

        /// <summary>
        /// 312511: Method to get key value from database based on key id
        /// </summary>
        /// <param name="keyid">sends Key Id</param>
        /// <returns>returns key id</returns>
        public string GetKeyValue(int keyid)
        {
            string getkeyid = string.Empty;
            ////OBUtilityMethodsClient clnt = new OBUtilityMethodsClient();
            SystemKey sysKey = new SystemKey();
            sysKey.KeyId = keyid;

            // Creating new client to get message from DB
            var clntUtility = new OBUtilityMethodsClient();
            try
            {
                clntUtility.Open();
                sysKey = clntUtility.GetSystemKey(sysKey);
                //// clntUtility.Close(); //// already closed in Final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(this.SessionDetail.SessionId);
                logger.LogError(ex);
            }
            finally
            {
                if (clntUtility.State != System.ServiceModel.CommunicationState.Faulted)
                {
                    clntUtility.Close();
                }
                else
                {
                    clntUtility.Abort();
                }

                clntUtility = null;
            }

            getkeyid = sysKey.KeyValue;
            return getkeyid;
        }

        /// <summary>
        /// 260947: Method to get default landing url on session start
        /// </summary>
        /// <returns>returns url</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1055:UriReturnValuesShouldNotBeStrings", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1024:UsePropertiesWhereAppropriate", Justification = "Reviewed")]
        public string GetLandingURL()
        {
            string retUrl = string.Empty;
            retUrl = this.GetKeyValue(30);
            return retUrl;
        }

        /// <summary>
        /// 260947: Method to check whether the page is allowed to navigate
        /// </summary>
        /// <param name="pageId">the page id</param>
        /// <param name="countryId">corresponding country Id</param>
        /// <param name="roleGroup">role group</param>
        /// <returns>page access</returns>
        public PageAccess IsPageAllowed(int pageId, int countryId, DC.UtilityDC.RoleGroup roleGroup)
        {
            PageAccess pageAccess = new PageAccess();
            pageAccess.PageId = pageId;
            pageAccess.CountryId = countryId;
            pageAccess.RoleGroupId = roleGroup;

            // Initiating client for utility methods service
            var clientPageAccess = new OBUtilityMethodsClient();
            try
            {
                clientPageAccess.Open();
                pageAccess = clientPageAccess.IsPageAllowed(pageAccess);
            }
            catch
            {
                pageAccess.IsAllowed = false;
            }
            finally
            {
                if (clientPageAccess.State != System.ServiceModel.CommunicationState.Faulted)
                {
                    clientPageAccess.Close();
                }
                else
                {
                    clientPageAccess.Abort();
                }
            }

            return pageAccess;
        }

        /// <summary>
        /// 260947: Method which gets list of roles mapped to this user from DB
        /// </summary>
        /// <returns>user roles</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1024:UsePropertiesWhereAppropriate", Justification = "Reviewed")]
        public UserRolesList GetUserRoles()
        {
            UserRolesContainer userRoles = new UserRolesContainer();

            // Creating client for service
            var clnt = new Service.OBUtilityMethods.OBUtilityMethodsClient();
            try
            {
                // Opening client
                clnt.Open();

                // Executing the method
                userRoles = clnt.FetchRoles(this.SessionDetail);
            }
            catch (FaultException<OBFaultContractFC> ex)
            { // Catching custom exception of type OBFaultContract 
                (new ErrorLogger(this.SessionDetail.SessionId)).LogError(ex);
            }
            catch (Exception ex)
            { // Catching unhandled exception with global exception class
                (new ErrorLogger(this.SessionDetail.SessionId)).LogError(ex);
            }
            finally
            {
                // If connection resulted in faulted state then aborting client
                if (clnt.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    clnt.Abort();
                }
                else
                {
                    clnt.Close(); // Closing connection if no exception
                }

                clnt = null; // Clearing client
            }

            return userRoles.UserRoles;
        }

        /// <summary>
        /// method to dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}

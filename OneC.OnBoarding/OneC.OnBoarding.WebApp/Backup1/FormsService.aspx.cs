//-----------------------------------------------------------------------
// <copyright file="FormsService.aspx.cs" company="Cognizant">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp
 * Class Name       : FormsService
 * Version          : 1.0
 * Type             : Class
 * Purpose          : Aspx page to hold all the web methods for forms services
 * Created date     : 2012-Feb-13
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
namespace OneC.OnBoarding.WebApp
{
    #region Namespaces
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Configuration;
    using System.Data;
    using System.Diagnostics.CodeAnalysis;
    using System.IO;
    using System.Linq;
    using System.Net;
    using System.Net.Security;
    using System.Runtime.Remoting.Messaging;
    using System.Security.Cryptography.X509Certificates;
    using System.ServiceModel;
    using System.Text;
    using System.Web;
    using System.Web.Script.Serialization;
    using System.Web.Services;
    using System.Web.UI;
    using System.Web.UI.HtmlControls;
    using System.Web.UI.WebControls;
    using System.Xml;
    using System.Xml.Serialization;
    using System.Xml.XPath;
    using System.Xml.Xsl;
    using iTextSharp.text;
    using iTextSharp.text.html;
    using iTextSharp.text.pdf;
    using Microsoft.Exchange.WebServices.Data;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;
    using OneC.OnBoarding.DC.CandidateDC;
    using OneC.OnBoarding.DC.DashBoardDC;
    using OneC.OnBoarding.DC.UtilityDC;
    using OneC.OnBoarding.WebApp.FileUploadService;
    using OneC.OnBoarding.WebApp.Service.CandidateServices;
    using OneC.OnBoarding.WebApp.Service.DashBoardServices;
    using OneC.OnBoarding.WebApp.Service.OBUtilityMethods;
    using OneC.OnBoarding.WebApp.Utility;
    using Winnovative.WnvHtmlConvert;

    #endregion
    /// <summary>
    /// 260947: Form Service class
    /// </summary>
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1506:AvoidExcessiveClassCoupling", Justification = "Reviewed.")]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", Justification = "Reviewed.")]
    public partial class FormsService : System.Web.UI.Page
    {
        ////Initializing list limit size

        /// <summary>
        /// variable for page Size DashBoard candidates
        /// </summary>
        private static int pageSizeDashBoardcandidates = 4;   // added to fix style cop warnings 

        /// <summary>
        /// variable for total Pages Display DashBoard candidates
        /// </summary>
        private static int totalPagesDisplayDashBoardcandidates = 2; // added to fix style cop warnings

        /// <summary>
        /// variable for data Page Index DashBoard candidates
        /// </summary>
        private static int dataPageIndexDashBoardcandidates = 1; // added to fix style cop warnings

        ////Dashboard Pagination For Induction

        /// <summary>
        /// variable for page Size DashBoard candidates
        /// </summary>
        private static int pageSizeDashBoardcandidates1 = 5;

        /// <summary>
        /// variable for page Size Induction Tracker
        /// </summary>
        private static int pageSizeInductinTracker = 5;

        /// <summary>
        /// variable for total Pages Display DashBoard candidates
        /// </summary>
        private static int totalPagesDisplayDashBoardcandidates1 = 3;

        /// <summary>
        /// variable for data Page Index DashBoard candidates
        /// </summary>
        private static int dataPageIndexDashBoardcandidates1 = 1;

        ////Initializing list limit size

        /// <summary>
        /// Gets or sets value for Page Size DashBoard candidates
        /// </summary>
        public int PageSizeDashBoardcandidates
        {
            get { return pageSizeDashBoardcandidates; } // modified to fix style cop warnings
            set { pageSizeDashBoardcandidates = value; }
        }

        /// <summary>
        /// Gets or sets value for TotalPages display DashBoard candidates
        /// </summary>
        public int TotalPagesDisplayDashBoardcandidates
        {
            get { return totalPagesDisplayDashBoardcandidates; }        // modified to fix style cop warnings
            set { totalPagesDisplayDashBoardcandidates = value; }
        }

        /// <summary>
        /// Gets or sets value for Data Page Index DashBoard candidates
        /// </summary>
        public int DataPageIndexDashBoardcandidates
        {
            get { return dataPageIndexDashBoardcandidates; }        // modified to fix style cop warnings
            set { dataPageIndexDashBoardcandidates = value; }
        }

        #region Global methods to perform form operations

        /// <summary>
        /// 260947: Method to get data for forms which is already saved in XML format
        /// </summary>
        /// <param name="sessionId">Current session id</param>
        /// <param name="candidateId">CandidateId of logged in candidate</param>
        /// <param name="taskId">TaskId to which the candidate is going to perform operation</param>
        /// <param name="countryId">Country id to which candidate is mapped</param>
        /// <returns>Returns string in JSON format</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", MessageId = "countryId", Justification = "Reviewed.")]
        [WebMethod(BufferResponse = true, Description = "Gets task data need for this operation", EnableSession = true)]        
        public static string GetTaskData(long sessionId, long candidateId, int taskId, int countryId)
        {
            int totalPages = 1;
            SaveTaskDC objPrefill = new SaveTaskDC();
            objPrefill.CandidateId = candidateId;
            objPrefill.TaskId = taskId;
            objPrefill.SessionId = sessionId;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new CandidateServicesClient();
            try
            {
                clntUtility.Open();
                objPrefill = clntUtility.GetPrefillValues(objPrefill);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            objPrefill.CandidateId = candidateId;
            objPrefill.TaskId = taskId;
            objPrefill.SessionId = sessionId;

            ////#region Preparing JSON content

            XmlDocument xmlDesignDoc = new XmlDocument();
            xmlDesignDoc.LoadXml(objPrefill.TaskDesignXML);
            totalPages = Convert.ToInt16(xmlDesignDoc.SelectNodes("/xml/TotalNoOfPages").Item(0).InnerText);
            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.LoadXml("<TaskDataXML>" + objPrefill.TaskDataXML + "</TaskDataXML>");
            objPrefill.TaskDataXML = JsonConvert.SerializeXmlNode(xmlDoc.SelectNodes("TaskDataXML").Item(0), Newtonsoft.Json.Formatting.None, true);
            xmlDoc = new XmlDocument();
            xmlDoc.LoadXml("<TaskPrefillValues>" + objPrefill.TaskPrefillValues + "</TaskPrefillValues>");
            objPrefill.TaskPrefillValues = JsonConvert.SerializeXmlNode(xmlDoc.SelectNodes("TaskPrefillValues").Item(0), Newtonsoft.Json.Formatting.None, true);

            if (string.IsNullOrEmpty(objPrefill.TaskSignatureXML))
            {
                PageSignatureContainer objSignContainer = new PageSignatureContainer();
                objSignContainer.SignatureData = new PageSignatureList();
                for (int count = 0; count < totalPages; count++)
                {
                    if (xmlDesignDoc.SelectNodes("/xml/PageDetails/Page/RequireSignature").Item(count).InnerText == "1")
                    {
                        PageSignature objSign = new PageSignature();
                        objSign.SignaturePageId = Convert.ToInt16(xmlDesignDoc.SelectNodes("/xml/PageDetails/Page/Id").Item(count).InnerXml);
                        objSign.SignerName = string.Empty;
                        objSign.SignatureStatus = "0";
                        objSignContainer.SignatureData.Add(objSign);
                    }
                }

                objSignContainer.TaskId = objPrefill.TaskId;
                string signXML = ObjectSerializer(objSignContainer);
                objPrefill.TaskSignatureXML = signXML.Replace("<?xml version=\"1.0\"?>", string.Empty);
            }

            string strJSON = string.Empty;
            strJSON = JsonConvert.SerializeObject(objPrefill);
            ////#endregion

            return strJSON;
        }

        /// <summary>
        /// 260947: Method to save the content of task to Database
        /// </summary>
        /// <param name="sessionId">Current session id</param>
        /// <param name="candidateId">CandidateId of logged in candidate</param>
        /// <param name="taskId">TaskId to which the candidate is going to perform operation</param>        
        /// <param name="taskData">Content of task in JSON format string</param>
        /// <param name="signatureData">signature Data</param>
        /// <param name="saveMode">Decides whether the method is called in save mode or submit mode. 1 for save, 2 for submit</param>
        /// <param name="lastViewPage">Last view page</param>
        /// <returns>Returns SUCCESS - if task content saved successfully/ FAILED - if task content failed to save</returns>
        [WebMethod(BufferResponse = false, Description = "Saves the content of task to DB", EnableSession = true)]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", MessageId = "str", Justification = "Reviewed.")]
        public static int SaveTaskData(long sessionId, long candidateId, int taskId, string taskData, string signatureData, int saveMode, int lastViewPage)
        {
            int retStatus = 0;
            string str = taskData;
            ////CandidateServicesClient objService = new CandidateServicesClient();
            SaveTaskDC objsave = new SaveTaskDC();
            objsave.TaskId = taskId;
            objsave.CandidateId = candidateId;
            XmlDocument doc = (XmlDocument)JsonConvert.DeserializeXmlNode(taskData); ////, rootElementName); 
            objsave.TaskData = doc.InnerXml;
            doc = null;
            objsave.TaskStatus = saveMode;
            objsave.TaskSignatureXML = signatureData;
            objsave.SessionId = sessionId;
            objsave.IsTaskSigned = true;
            if (saveMode == 1)
            {
                objsave.IsTaskSubmitted = 1;
            }
            else
            {
                objsave.IsTaskSubmitted = 0;
            }

            objsave.IsTaskLocked = 0;
            objsave.LastViewPageIndex = lastViewPage;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new CandidateServicesClient();
            try
            {
                clntUtility.Open();
                retStatus = clntUtility.SaveTaskData(objsave);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            ////#region Logging Event Data
            string comment = "Saving of task {" + taskId.ToString() + "} resulted in status {" + retStatus.ToString() + "}";
            LogEventData(sessionId, candidateId, taskId, "Save task mode{" + saveMode.ToString() + "}", "SaveTaskData", objsave.TaskData, true, comment);
            ////#endregion

            return retStatus;
        }

        /// <summary>
        /// 260947: Method to validate the content of task before save or submit
        /// </summary>
        /// <param name="sessionId">Current session id</param>
        /// <param name="candidateId">CandidateId of logged in candidate</param>
        /// <param name="taskId">TaskId to which the candidate is going to perform operation</param>
        /// <param name="taskData">Content of task in JSON format string</param>
        /// <param name="saveMode">Decides whether the method is called in save mode or submit mode. 1 for save, 2 for submit</param>
        /// <returns>Returns JSON format string with status and validation message</returns>
        [WebMethod(BufferResponse = true, Description = "Validates the content of task before saving", EnableSession = true)]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        public static string ValidateTaskContent(long sessionId, long candidateId, int taskId, string taskData, int saveMode)
        {
            string retValidationStatus = string.Empty;
            SaveTaskDCSource objsrc = new SaveTaskDCSource();
            SaveTaskDC objvalidation = new SaveTaskDC();
            objvalidation.CandidateId = candidateId;
            objvalidation.TaskId = taskId;
            objvalidation.TaskStatus = saveMode;
            objvalidation.SessionId = sessionId;
            XmlDocument doc = (XmlDocument)JsonConvert.DeserializeXmlNode(taskData);
            objvalidation.TaskDataXML = doc.InnerXml;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new CandidateServicesClient();
            try
            {
                clntUtility.Open();
                objvalidation = clntUtility.ValidateTaskContent(objvalidation);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            ////objvalidation.ValidationMessage = JsonConvert.SerializeXmlNode(retDoc.SelectNodes("TaskDataXML").Item(0), Newtonsoft.Json.Formatting.None, true);
            retValidationStatus = JsonConvert.SerializeObject(objvalidation);
            return retValidationStatus;
        }

        /// <summary>
        /// 207953: Method to sign the form 
        /// </summary>
        /// <param name="sessionId">Current session id</param>
        /// <param name="candidateId">CandidateId of logged in candidate</param>
        /// <param name="taskId">TaskId to which the candidate is going to perform operation</param>
        /// <param name="signPageId">Sign page Id</param>
        /// <param name="authenticationKey">Supplied authentication key which is used for signing the task</param>
        /// <returns>returns the flag to validate Authentication key , return 1 for valid key and 0 for invalid key</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", Justification = "Reviewed.")]
        [WebMethod(BufferResponse = true, Description = "Method to validate the authenticationKey", EnableSession = true)]
        public static int ValidateAuthenticationKey(long sessionId, long candidateId, int taskId, int signPageId, string authenticationKey)
        {
            int retValidateStatus = 0;
            SaveTaskDC objsaveDc = new SaveTaskDC();
            objsaveDc.CandidateId = candidateId;
            objsaveDc.SignatureKey = authenticationKey;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new CandidateServicesClient();
            try
            {
                clntUtility.Open();
                retValidateStatus = clntUtility.ValidateAuthenticationKey(objsaveDc);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            ////#region Logging Event Data
            string comment = "Signing of task {" + taskId.ToString() + "} in page {" + signPageId.ToString() + "} with key {" + authenticationKey.ToString() + "} resulted in status {" + retValidateStatus.ToString() + "}";
            LogEventData(sessionId, candidateId, taskId, "Task Signing", "ValidateAuthenticationKey", string.Empty, false, comment);
            ////#endregion

            return retValidateStatus;
        }

        /// <summary>
        /// 260947: Method to create XML from object
        /// </summary>
        /// <param name="obj">Object type</param>
        /// <returns>xml formatted string</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", Justification = "Reviewed.")]
        public static string ObjectSerializer(object obj)
        {
            string retStr = string.Empty;
            try
            {
                MemoryStream mem = new MemoryStream();
                System.Xml.Serialization.XmlSerializer xs = new XmlSerializer(obj.GetType());
                xs.Serialize(mem, obj);
                byte[] data = mem.GetBuffer();
                retStr = Encoding.UTF8.GetString(data, 0, data.Length).Replace("\0", string.Empty);
                mem.Dispose();
            }
            catch
            {
                retStr = string.Empty;
            }

            return retStr;
        }

        #endregion

        #region Utility methods for forms .Forgot Key Method
        /// <summary>
        /// 207953:Method to Reset the Authentication key and send mail to candidate
        /// </summary>
        /// <param name="sessionId">Current session id</param>
        /// <param name="countryId">Country Id</param>
        /// <param name="candidateId">CandidateId of logged in candidate</param>
        /// <returns>Returns ret Status</returns>
        [WebMethod(BufferResponse = true, Description = "Method to Reset the Authentication key and send mail to candidate", EnableSession = true)]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", MessageId = "countryId", Justification = "Reviewed.")]
        public static int ResetAuthenticationKey(long sessionId, int countryId, long candidateId)
        {
            int retStatus = 0;
            SaveTaskDC objKey = new SaveTaskDC();
            objKey.SessionId = sessionId;
            objKey.CandidateId = candidateId;

            ////#region Candidate Service call

            var clntUtility = new CandidateServicesClient();
            try
            {
                clntUtility.Open();
                clntUtility.ResetAuthenticationKey(objKey);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            MailData objmaildata = new MailData();
            objmaildata.CandidateId = candidateId;
            objmaildata.SessionId = sessionId;
            objmaildata.CountryId = 0;
            objmaildata.SpMode = 1;
            objmaildata.NotificationMasterId = 3; //// Notification ID for forgot key mailer

            ////#region Utility Service call
            ////Creating new client to get message from DB
            var objtUtility = new OBUtilityMethodsClient();
            try
            {
                objtUtility.Open();
                retStatus = objtUtility.SendNotificationMail(objmaildata);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
                logger.LogError(ex);
            }
            finally
            {
                if (objtUtility.State != System.ServiceModel.CommunicationState.Faulted)
                {
                    objtUtility.Close();
                }
                else
                {
                    objtUtility.Abort();
                }

                objtUtility = null;
            }
            ////#endregion

            return retStatus;
        }

        #endregion

        #region Service methods for forms

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
        /// <param name="comment">for Comment</param>
        public static void LogEventData(long sessionId, long candidateId, int taskId, string eventName, string methodName, string value, bool isValueXmlType, string comment)
        {
            Utility.UtilityMethods.LogEventData(sessionId, candidateId, taskId, eventName, methodName, value, isValueXmlType, comment);
        }

        #region InductionDiaryInvites

        /// <summary>
        /// 261890: Method to create Induction Dairy Invite
        /// </summary>
        /// <param name="retTrainingList">Array List for CandidateTraining Data</param>
        /// <returns>status Invite</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", MessageId = "returnstatus", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", MessageId = "timeZones", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", Justification = "Reviewed.")]
        public static int SendDiaryInvite(NewHireTrainingDC[] retTrainingList)
        {
            int statusInvite = 0;
            long sessionid = retTrainingList[0].SessionId;
            try
            {
                if (retTrainingList[0].RequiredAttendees != null)
                {
                    ExchangeService service1 = new ExchangeService();
                    ServicePointManager.ServerCertificateValidationCallback =
                    delegate(object obj, X509Certificate certificate, X509Chain chain, SslPolicyErrors errors)
                    {
                        // trust any certificate
                        return true;
                    };
                    string serviceAccount = retTrainingList[0].ServiceAccount;
                    string servicePW = retTrainingList[0].ServicePWD;
                    string serviceDomain = retTrainingList[0].ServiceDomain;
                    string serviceUrl = retTrainingList[0].ServiceUrl.ToString();
                    service1.Credentials = new NetworkCredential(serviceAccount, servicePW, serviceDomain);
                    service1.Url = new Uri(serviceUrl);
                    //// To create the Meeting Request
                    if (retTrainingList[0].OperationType == 1)
                    {
                        ReadOnlyCollection<TimeZoneInfo> timeZones = TimeZoneInfo.GetSystemTimeZones();
                        Appointment app = new Appointment(service1);
                        app.Subject = retTrainingList[0].Subject;
                        app.Body = new MessageBody(BodyType.HTML, retTrainingList[0].Body);
                        app.StartTimeZone = TimeZoneInfo.FindSystemTimeZoneById("GMT Standard Time"); ////Sets Time Zone to London
                        app.EndTimeZone = TimeZoneInfo.FindSystemTimeZoneById("GMT Standard Time");
                        app.Start = retTrainingList[0].MeetingStartDate;
                        app.End = retTrainingList[0].MeetingEndDate;
                        app.Location = retTrainingList[0].Location;
                        if (retTrainingList[0].IsReminderSet == "true")
                        {
                            app.IsReminderSet = true;
                        }

                        app.ReminderMinutesBeforeStart = retTrainingList[0].ReminderMinutesBeforeStart;
                        app.RequiredAttendees.Add(retTrainingList[0].RequiredAttendees);
                        if (retTrainingList[0].OfcMailId != retTrainingList[0].RequiredAttendees)
                        {
                            app.RequiredAttendees.Add(retTrainingList[0].OfcMailId);
                        }

                        app.Save(SendInvitationsMode.SendToAllAndSaveCopy);
                        int returnstatus = SaveMeetingID(app.Id.ToString(), sessionid, retTrainingList[0].TaskId, retTrainingList[0].Candidateid, 1, retTrainingList[0].MeetingRequestNum);
                    }
                }

                statusInvite = 1;
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionid);
                logger.LogError(ex);
                statusInvite = 0;
            }

            return statusInvite;
        }

        /// <summary>
        /// 261890: Method to Update Induction Dairy Invite
        /// </summary>
        /// <param name="retTrainingList">Array List for CandidateTraining Data</param>
        /// <returns>update Status</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", MessageId = "returnstatus", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", Justification = "Reviewed.")]
        public static int UpdateDiaryInvite(NewHireTrainingDC[] retTrainingList)
        {
            int updStatus = 0;
            long sessionid = retTrainingList[0].SessionId;
            try
            {
                ExchangeService service1 = new ExchangeService();
                ServicePointManager.ServerCertificateValidationCallback =
                delegate(object obj, X509Certificate certificate, X509Chain chain, SslPolicyErrors errors)
                {
                    // trust any certificate
                    return true;
                };
                string serviceAccount = retTrainingList[0].ServiceAccount;
                string servicePW = retTrainingList[0].ServicePWD;
                string serviceDomain = retTrainingList[0].ServiceDomain;
                string serviceUrl = retTrainingList[0].ServiceUrl.ToString();
                service1.Credentials = new NetworkCredential(serviceAccount, servicePW, serviceDomain);
                service1.Url = new Uri(serviceUrl);
                Appointment app = Appointment.Bind(service1, new ItemId(retTrainingList[0].MeetingID.ToString()));
                app.End = retTrainingList[0].MeetingEndDate;
                ////app.Body = app.Body.ToString().Replace(app.Start.ToString("yyyy-MM-dd").Trim(), retTrainingList[0].MeetingStartDate.ToString("yyyy-MM-dd").Trim());
                app.Start = retTrainingList[0].MeetingStartDate;
                app.Body = new MessageBody(BodyType.HTML, retTrainingList[0].Body);
                app.StartTimeZone = TimeZoneInfo.FindSystemTimeZoneById("GMT Standard Time"); ////Sets Time zone to London
                app.EndTimeZone = TimeZoneInfo.FindSystemTimeZoneById("GMT Standard Time");
                app.Location = retTrainingList[0].Location;
                if (retTrainingList[0].OfcMailId != retTrainingList[0].RequiredAttendees)
                {
                    app.RequiredAttendees.Add(retTrainingList[0].OfcMailId);
                }

                app.Update(ConflictResolutionMode.AlwaysOverwrite);
                int returnstatus = SaveMeetingID(app.Id.ToString(), sessionid, retTrainingList[0].TaskId, retTrainingList[0].Candidateid, 2, retTrainingList[0].MeetingRequestNum);
                updStatus = 1;
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionid);
                logger.LogError(ex);
                updStatus = 0;
            }

            return updStatus;
        }

        /// <summary>
        /// 261890: Method to Cancel Induction Dairy Invite
        /// </summary>
        /// <param name="retTrainingList">Array List for CandidateTraining Data</param>
        /// <returns>cancel Status</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", MessageId = "returnstatus", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", Justification = "Reviewed.")]
        public static int CancelDiaryInvite(NewHireTrainingDC[] retTrainingList)
        {
            int cnclStatus = 0;
            long sessionid = retTrainingList[0].SessionId;
            try
            {
                ExchangeService service1 = new ExchangeService();
                ServicePointManager.ServerCertificateValidationCallback =
                delegate(object obj, X509Certificate certificate, X509Chain chain, SslPolicyErrors errors)
                {
                    //// trust any certificate
                    return true;
                };
                string serviceAccount = retTrainingList[0].ServiceAccount;
                string servicePW = retTrainingList[0].ServicePWD;
                string serviceDomain = retTrainingList[0].ServiceDomain;
                string serviceUrl = retTrainingList[0].ServiceUrl.ToString();
                service1.Credentials = new NetworkCredential(serviceAccount, servicePW, serviceDomain);
                service1.Url = new Uri(serviceUrl);
                Appointment app = Appointment.Bind(service1, new ItemId(retTrainingList[0].MeetingID.ToString()));
                app.CancelMeeting("You Have Canceled the Registration");
                int returnstatus = SaveMeetingID(app.Id.ToString(), sessionid, retTrainingList[0].TaskId, retTrainingList[0].Candidateid, 3, retTrainingList[0].MeetingRequestNum);
                cnclStatus = 1;
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionid);
                logger.LogError(ex);
                cnclStatus = 0;
            }

            return cnclStatus;
        }

        /// <summary>
        /// 261890: Method to Save Meeting ID and update the log
        /// </summary>
        /// <param name="meetingID">Meeting Id</param>
        /// <param name="sessionId">Session id</param>
        /// <param name="taskId">Task id</param>
        /// <param name="candidateId">Candidate id</param>
        /// <param name="mode">for Mode</param>
        /// <param name="meetingRequestNum">Meeting Request Number</param>
        /// <returns>return status</returns>
        public static int SaveMeetingID(string meetingID, long sessionId, int taskId, long candidateId, int mode, int meetingRequestNum)
        {
            int returnstatus;
            SaveMeetingID meetingDet = new SaveMeetingID();
            meetingDet.MeetingID = meetingID;
            meetingDet.SessionId = sessionId;
            meetingDet.TaskId = taskId;
            meetingDet.CandidateId = candidateId;
            meetingDet.Mode = mode;
            meetingDet.MeetingRequestNum = meetingRequestNum;
            var meetinUtility = new CandidateServicesClient();
            try
            {
                meetinUtility.Open();
                meetinUtility.SaveMeetingID(meetingDet);
                //// clntUtility.Close(); //// already closed in final block
                returnstatus = 1;
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
                logger.LogError(ex);
                returnstatus = 0;
            }
            finally
            {
                if (meetinUtility.State != System.ServiceModel.CommunicationState.Faulted)
                {
                    meetinUtility.Close();
                }
                else
                {
                    meetinUtility.Abort();
                }

                meetinUtility = null;
            }

            return returnstatus;
        }
        #endregion

        /// <summary>
        /// 260947: Method which logs exception occurred in ajax calls
        /// </summary>
        /// <param name="sessionId">Current session id</param>
        /// <param name="errId">Error id</param>
        /// <param name="errMsg">error message</param>
        [WebMethod(BufferResponse = false, Description = "Logs ajax based exceptions", EnableSession = true)]
        public static void LogError(long sessionId, string errId, string errMsg)
        {
            try
            {
                HttpException expAjaxCall = new HttpException(errMsg);
                expAjaxCall.Source = errId;
                (new ErrorLogger(sessionId)).LogError(expAjaxCall);
            }
            catch
            {
            }
        }

        /// <summary>
        /// 260947: Method to get active status of session
        /// </summary>
        /// <param name="sessionId">Current session id</param>
        /// <returns name="isServiceActive">boolean value</returns>
        [WebMethod(BufferResponse = false, Description = "Gets the session active status", EnableSession = true)]
        public static bool IsServiceActive(long sessionId)
        {
            bool isServiceActive = false;
            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new Service.OBUtilityMethods.OBUtilityMethodsClient();
            try
            {
                SessionDetails sessionDetail = new SessionDetails();
                sessionDetail.SessionId = sessionId;
                clntUtility.Open();
                isServiceActive = clntUtility.IsSessionActive(sessionDetail);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                isServiceActive = false;
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            return isServiceActive;
        }

        ///// <summary>
        ///// 260947: Method to get active status of session
        ///// </summary>
        ///// <param name="sessionId">Current session id</param>
        ///// <returns></returns>
        ////[WebMethod(BufferResponse = false, Description = "Gets whether the page is valid", EnableSession = true)]
        ////public static bool IsPageValid(long sessionId,long candidateId,int TaskId,int countryId)
        ////{
        ////    bool isPageValid = false;
        ////    #region Service call
        ////    //Creating new client to get message from DB
        ////    var clntUtility = new Service.OBUtilityMethods.OBUtilityMethodsClient();
        ////    try
        ////    {
        ////        SaveTaskDC clntIsPageValid = new SaveTaskDC();
        ////        clntIsPageValid.CandidateId = candidateId;
        ////        clntIsPageValid.SessionId = sessionId;
        ////        clntIsPageValid.TaskId = TaskId;
        ////        clntIsPageValid.CountryId = countryId;

        ////        clntUtility.Open();
        ////        //isPageValid = clntUtility.IsSessionActive(sessionDetail);;
        ////        clntUtility.Close();
        ////    }
        ////    catch (Exception ex)
        ////    {
        ////        isPageValid = false;
        ////        ErrorLogger logger = new ErrorLogger(sessionId);
        ////        logger.LogError(ex);
        ////    }
        ////    finally
        ////    {
        ////        if (clntUtility.State != System.ServiceModel.CommunicationState.Faulted)
        ////            clntUtility.Close();
        ////        else
        ////            clntUtility.Abort();

        ////        clntUtility = null;
        ////    }
        ////    #endregion
        ////    return isPageValid;
        ////}

        /// <summary>
        /// 260947: Method to get display messages from DB
        /// </summary>
        /// <param name="sessionId">Current session id</param>
        /// <param name="messageType">message type</param>
        /// <param name="messageId">Unique message id</param>
        /// <param name="messageCode">Unique message code</param>
        /// <param name="customMessageOnDBFail">Custom message to display when database fails</param>
        /// <returns name="Messages">gets message</returns>
        [WebMethod(BufferResponse = false, Description = "Gets the message from database", EnableSession = true)]
        public static DC.UtilityDC.Messages GetMessage(long sessionId, DC.UtilityDC.MessageType messageType, int messageId, string messageCode, string customMessageOnDBFail)
        {
            DC.UtilityDC.Messages objMessage = new DC.UtilityDC.Messages();
            objMessage.MethodType = messageType;
            objMessage.MessageId = messageId;
            objMessage.MessageCode = messageCode;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new Service.OBUtilityMethods.OBUtilityMethodsClient();
            try
            {
                clntUtility.Open();
                objMessage = clntUtility.GetMessage(objMessage);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                objMessage = new DC.UtilityDC.Messages();
                objMessage.MethodType = messageType;
                objMessage.MessageId = messageId;
                objMessage.MessageCode = messageCode;
                objMessage.DisplayMessage = customMessageOnDBFail;
                objMessage.DisplayType = "1";
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            return objMessage;
        }

        /// <summary>
        /// 260947: Method to get master information
        /// </summary>
        /// <param name="sessionId">session id</param>
        /// <param name="parentCode">Unique master code for corresponding master information</param>
        /// <returns>Returns list of master information in array list</returns>
        [WebMethod(BufferResponse = true, Description = "Gets the Master Data for this operation", EnableSession = true)]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        public static ArrayList GetMaster(long sessionId, string parentCode)
        {
            ArrayList retObj = new ArrayList();
            string retMasterData = string.Empty;
            MasterList objMaster = new MasterList();
            objMaster.ParentId = Convert.ToInt32(parentCode);
            MasterListSource masterData = new MasterListSource();

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new CandidateServicesClient();
            try
            {
                clntUtility.Open();
                masterData = clntUtility.FetchMasterData(objMaster);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            MasterListData lstData = masterData.MasterData;
            foreach (MasterList ml in lstData)
            {
                retObj.Add(new { ID = ml.MasterCode, Description = ml.MasterDescription.ToString(), UserValue = ml.MasterUserValue.ToString() });
            }

            return retObj;
        }

        /// <summary>
        /// 207953: Method to get Geography master information
        /// </summary>
        /// <param name="mode">for mode</param>
        /// <param name="parentcode">Unique master code for corresponding master information</param>
        /// <param name="candidateId">candidate id</param>
        /// <returns>Returns list of master information in array list</returns>
        [WebMethod(BufferResponse = true, Description = "Gets the Geography Master Data for this operation", EnableSession = true)]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", MessageId = "retMasterData", Justification = "Reviewed.")]
        public static ArrayList GetGeographyMaster(int mode, int parentcode, int candidateId)
        {
            ArrayList retobjGeo = new ArrayList();
            string retMasterData = string.Empty;
            CandidateServicesClient objService = new CandidateServicesClient();
            Country objCountry = new Country();
            objCountry.Mode = mode;
            objCountry.ParentId = parentcode;
            objCountry.CandidateId = candidateId;
            CountryListSource countryData = objService.GetGeographyMaster(objCountry);
            CountryList objlist = countryData.CountryData;
            foreach (Country ml in objlist)
            {
                retobjGeo.Add(new { ID = ml.CountryCode, Description = ml.CountryDescription.ToString() });
            }

            return retobjGeo;
        }

        #region PostQuery Method

        /// <summary>
        /// 208099:Method to send mail
        /// </summary>
        /// <param name="subject">for subject</param>
        /// <param name="body">for body</param>
        /// <param name="notificationMappingId">notification mapping id</param>
        /// <param name="candidateId">CandidateId of logged in candidate</param>
        /// <param name="countryId">country id</param>
        /// <returns>returns ret status</returns>
        [WebMethod(BufferResponse = true, Description = "Method to send mail", EnableSession = true)]
        public static string PostQuery(string subject, string body, int notificationMappingId, long candidateId, int countryId)
        {
            string retStatus = string.Empty;
            long sessionId;
            SessionDetails sessionDetail;
            Utility.UtilityMethods objUtil = new UtilityMethods();
            sessionDetail = objUtil.SessionDetail;
            sessionId = sessionDetail.SessionId;

            ////#region Utility Service call

            var clntUtility = new OBUtilityMethodsClient();
            try
            {
                clntUtility.Open();
                using (MailData maildata = new MailData())
                {
                    maildata.Subject = subject;
                    maildata.Body = body;
                    maildata.CandidateId = candidateId;
                    maildata.CountryId = countryId;
                    if (notificationMappingId == 0)
                    {
                        maildata.NotificationMasterId = UtilityMethods.OBNOTIFYPOSTQUERY;
                    }
                    else
                    {
                        maildata.NotificationMappingId = notificationMappingId;
                    }

                    maildata.SessionId = sessionId;
                    maildata.IsReSendRequired = false;
                    maildata.IsRemainderRequired = false;
                    maildata.SpMode = 1;
                    retStatus = clntUtility.SendMail(maildata);
                }

                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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

            ////#endregion

            return retStatus;
        }

        #endregion

        /// <summary>
        /// 208099: Method to Update Training Data
        /// </summary>
        /// <param name="datasave">data save</param>
        /// <param name="candidateId">candidate id</param>
        /// <param name="trainingId">training id</param>
        /// <param name="mode">for mode</param>
        /// <param name="sessionId">session id</param>
        /// <param name="countryId">country id</param>
        /// <param name="taskid">task id</param>
        /// <returns>object array</returns>
        [WebMethod(BufferResponse = false, Description = "Saves the content of task to DB", EnableSession = true)]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", MessageId = "ret2", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", Justification = "Reviewed.")]
        public static ArrayList RegisterCancelTrainingDetails(string datasave, int candidateId, int trainingId, int mode, long sessionId, int countryId, int taskid)
        {
            int retStatus = 0;
            ////string strCandTrainingxml = string.Empty;
            NewHireTrainingDC[] retTrainingList;
            ArrayList objArray = new ArrayList();
            Utility.UtilityMethods objUtil = new UtilityMethods();
            sessionId = objUtil.SessionDetail.SessionId;
            SaveTaskDC objsave = new SaveTaskDC();
            CandidateTrainingDC objCandTraining = new CandidateTrainingDC();
            objCandTraining.TrainingId = trainingId;
            objCandTraining.CandidateId = candidateId;
            objCandTraining.CountryId = countryId;
            if (mode == 1)
            {
                objCandTraining.Status = "2";
            }
            else
            {
                objCandTraining.Status = "4";
            }

            datasave = datasave.Replace("\"TrainingStatus\":null", "\"TrainingStatus\":" + '"' + objCandTraining.Status + '"');
            datasave = datasave.Replace("\"RegistrationCount\":null", "\"RegistrationCount\":" + '"' + 1 + '"');
            datasave = datasave.Replace("\"AttendanceStatus\":null", "\"AttendanceStatus\":" + '"' + 0 + '"');
            ////  objCandTraining.RegisterationCount = RegisteredCount;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new CandidateServicesClient();
            try
            {
                clntUtility.Open();
                XmlDocument doc = (XmlDocument)JsonConvert.DeserializeXmlNode(datasave); ////, rootElementName);
                objCandTraining.TrainingData = doc.InnerXml;
                doc = null;
                objCandTraining.TaskId = taskid; //// Convert.ToInt16(TaskID.IMTaskId);
                objCandTraining.Mode = mode;
                objCandTraining.SessionId = sessionId;
                ////  objCandTraining.TrainingData = strCandTrainingxml.InnerXml;
                ////doc = null;
                retTrainingList = clntUtility.RegisterCancelTrainingDetails(objCandTraining);
                if (retTrainingList != null)
                {
                    if (retTrainingList[0].IsMailToBeSent == 1)
                    {
                        /* Sends Mail After the Registration Limit of 3 times*/
                        MailData objMailData = new MailData();
                        objMailData.NotificationMasterId = 14;
                        objMailData.CountryId = countryId;
                        objMailData.CandidateId = candidateId;
                        //// SendMail(24, null, countryId);
                        UtilitySendMail(objMailData);
                        objArray.Add(new { Display = string.Empty, Value = retTrainingList[0].Mode });
                        objArray.Add(new { Display = string.Empty, Value = retTrainingList[0].IsMailToBeSent });
                    }
                    else
                    {
                        objArray.Add(new { Display = string.Empty, Value = retTrainingList[0].Mode });
                        objArray.Add(new { Display = string.Empty, Value = string.Empty });
                    }

                    //// retStatus = retTrainingList[0].Mode;
                    ////#region InductionDiaryInvites
                    ////will be processed only when Mail Id is not null
                    if (retTrainingList[0].RequiredAttendees != null && retTrainingList[0].InductionDiaryFlag == 1)
                    {
                        retTrainingList[0].Candidateid = objCandTraining.CandidateId;
                        retTrainingList[0].TaskId = objCandTraining.TaskId;
                        retTrainingList[0].SessionId = sessionId;
                        retTrainingList[0].MeetingRequestNum = 1;
                        //// It will create Induction Diary Invite
                        if (retTrainingList[0].OperationType == 1)
                        {
                            int ret1 = SendDiaryInvite(retTrainingList);
                            ////This will process second meeting request only when scoreFlag is 1 and 1st meeting request is processed
                            if (retTrainingList[0].Score == 1 && ret1 == 1)
                            {
                                retTrainingList[0].MeetingStartDate = retTrainingList[0].MeetingStartDate2;
                                retTrainingList[0].MeetingEndDate = retTrainingList[0].MeetingEndDate2;
                                retTrainingList[0].MeetingRequestNum = 2;

                                ////retTrainingList[0].Body = retTrainingList[0].Body2;
                                int ret2 = SendDiaryInvite(retTrainingList);
                            }
                        }
                        //// It will Update Induction Diary Invite
                        if (retTrainingList[0].OperationType == 2)
                        {
                            int ret1 = UpdateDiaryInvite(retTrainingList);
                            ////This will process second meeting request only when scoreFlag is 1 and 1st meeting request is processed
                            if (retTrainingList[0].Score == 1 && ret1 == 1)
                            {
                                retTrainingList[0].MeetingID = retTrainingList[0].MeetingID2;
                                retTrainingList[0].MeetingStartDate = retTrainingList[0].MeetingStartDate2;
                                retTrainingList[0].MeetingEndDate = retTrainingList[0].MeetingEndDate2;
                                retTrainingList[0].MeetingRequestNum = 2;

                                ////retTrainingList[0].Body = retTrainingList[0].Body2;
                                int ret2 = UpdateDiaryInvite(retTrainingList);
                            }
                        }
                        //// It will Cancel Induction Diary Invite
                        if (retTrainingList[0].OperationType == 3)
                        {
                            int ret1 = CancelDiaryInvite(retTrainingList);
                            ////This will process second meeting request only when scoreFlag is 1 and 1st meeting request is processed
                            if (retTrainingList[0].Score == 1 && ret1 == 1)
                            {
                                retTrainingList[0].MeetingID = retTrainingList[0].MeetingID2;
                                retTrainingList[0].MeetingRequestNum = 2;
                                int ret2 = CancelDiaryInvite(retTrainingList);
                            }
                        }
                        ////#region oldcode
                        ////ExchangeService service1 = new ExchangeService();
                        ////ServicePointManager.ServerCertificateValidationCallback =
                        ////delegate(Object obj, X509Certificate certificate, X509Chain chain, SslPolicyErrors errors)
                        ////{
                        //// trust any certificate
                        ////    return true;
                        ////};
                        ////string serviceDomain = retTrainingList[0].ServiceDomain;
                        ////string serviceUrl = retTrainingList[0].serviceUrl;
                        ////service1.Credentials = new NetworkCredential(serviceAccount, servicePW, serviceDomain);
                        ////service1.Url = new Uri(serviceUrl);
                        ////if (retTrainingList[0].OperationType == 1)
                        ////{
                        ////    Appointment app = new Appointment(service1);
                        ////    app.Subject = retTrainingList[0].Subject;
                        ////    app.Body = retTrainingList[0].Body;
                        ////    app.Location = "Vnet";
                        ////    app.Start = retTrainingList[0].MeetingStartDate;
                        ////    app.End = retTrainingList[0].MeetingEndDate;
                        ////    if (retTrainingList[0].IsReminderSet == "true")
                        ////        app.IsReminderSet = true;
                        ////    app.ReminderMinutesBeforeStart = retTrainingList[0].ReminderMinutesBeforeStart;
                        ////    app.RequiredAttendees.Add(retTrainingList[0].RequiredAttendees);
                        ////    app.Save(SendInvitationsMode.SendToAllAndSaveCopy);
                        ////    int returnstatus = SaveMeetingID(app.Id.ToString(), sessionId, objCandTraining.TaskId, objCandTraining.CandidateId);
                        ////}
                        ////else if (retTrainingList[0].OperationType == 2)
                        ////{
                        ////    Appointment app = Appointment.Bind(service1, new ItemId(retTrainingList[0].MeetingID.ToString()));
                        ////    app.Start = retTrainingList[0].MeetingStartDate;
                        ////    app.End = retTrainingList[0].MeetingEndDate;
                        ////    app.Update(ConflictResolutionMode.AlwaysOverwrite);
                        ////}
                        ////else if (retTrainingList[0].OperationType == 3)
                        ////{
                        ////    Appointment app = Appointment.Bind(service1, new ItemId(retTrainingList[0].MeetingID.ToString()));
                        ////    app.CancelMeeting("You Have Cancelled the Registration");
                        ////}

                        ////#endregion
                    }
                    ////#endregion
                }

                ////  retTrainingList
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            ////#region Logging Event Data
            ////string comment = "Saving of task {" + taskId.ToString() + "} resulted in status {" + retStatus.ToString() + "}";
            ////LogEventData(sessionId, candidateId, taskId, "Save task mode{" + saveMode.ToString() + "}", "SaveTaskData", objsave.TaskData, true, comment);
            ////#endregion
            ////#region Logging Event Data

            string comment = "Saving of Induction Data {" + taskid.ToString() + "} resulted in status {" + retStatus.ToString() + "}";
            LogEventData(sessionId, candidateId, taskid, "SaveInduction{" + mode + "}", "SaveInduction", objsave.TaskData, true, comment);
            ////#endregion
            return objArray;
        }
        #region SendMail with NotificationID
        /// <summary>
        /// 208099:Method to send mail
        /// </summary>
        /// <param name="notificationMasterId">notification master id</param>
        /// <param name="notificationMappingId">notification mapping id</param>
        /// <param name="candidateId">CandidateId of logged in candidate</param>
        /// <param name="candidateIds">candidate ids</param>
        /// <param name="ccids">for CcIds</param>
        /// <param name="countryID">country id</param>
        /// <returns>return retStatus</returns>
        [WebMethod(BufferResponse = true, Description = "Method to send mail", EnableSession = true)]
        public static int SendNotifyMail(int notificationMasterId, int notificationMappingId, long candidateId, string candidateIds, string ccids, int countryID)
        {
            int retStatus = 0;
            long sessionId;
            SessionDetails sessionDetail;
            Utility.UtilityMethods objUtil = new UtilityMethods();
            sessionDetail = objUtil.SessionDetail;
            sessionId = sessionDetail.SessionId;

            ////#region Utility Service call

            var clntUtility = new OBUtilityMethodsClient();
            try
            {
                clntUtility.Open();

                /* Sends Thank You Mail */
                MailData objMailData = new MailData();
                objMailData.NotificationMasterId = notificationMasterId;
                objMailData.NotificationMappingId = notificationMappingId;
                objMailData.ToId = candidateIds;
                objMailData.CcId = ccids;
                objMailData.CountryId = countryID;
                objMailData.SessionId = sessionId;
                objMailData.CandidateId = candidateId;
                ////objMailData.CandidateId = candidateId;
                objMailData.SpMode = 1; ////Running through App

                //// SendMail(24, null, countryId);
                retStatus = UtilitySendMail(objMailData);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion
            return retStatus;
        }
        #endregion

        #region SendMail with NotificationID
        /// <summary>
        /// 208099:Method to send mail
        /// </summary>
        /// <param name="notificationMasterId">notification master id</param>
        /// <param name="notificationMappingId">notification mapping id</param>
        /// <param name="candidateId">candidate id</param>
        /// <param name="countryID">country id</param>
        /// <returns>returns ret status</returns>
        [WebMethod(BufferResponse = true, Description = "Method to send mail", EnableSession = true)]
        public static int SendMail(int notificationMasterId, int notificationMappingId, long candidateId, int countryID)
        {
            int retStatus = 0;
            long sessionId;
            SessionDetails sessionDetail;
            Utility.UtilityMethods objUtil = new UtilityMethods();
            sessionDetail = objUtil.SessionDetail;
            sessionId = sessionDetail.SessionId;

            ////#region Utility Service call

            var clntUtility = new OBUtilityMethodsClient();
            try
            {
                clntUtility.Open();
                /* Sends Thank You Mail */
                MailData objMailData = new MailData();
                objMailData.NotificationMasterId = notificationMasterId;
                objMailData.NotificationMappingId = notificationMappingId;
                objMailData.CountryId = countryID;
                objMailData.SessionId = sessionId;
                objMailData.CandidateId = candidateId;
                objMailData.SpMode = 1; ////Running through App
                //// SendMail(24, null, countryId);
                retStatus = UtilitySendMail(objMailData);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            return retStatus;
        }
        #endregion

        #region SendMail with ToID
        /// <summary>
        /// 208099:Method to send mail
        /// </summary>
        /// <param name="notificationMasterId">notification master id</param>
        /// <param name="notificationMappingId">notification mapping id</param>
        /// <param name="candidateId">candidate id</param>
        /// <param name="countryID">country id</param>
        /// <param name="toid"> for to id</param>
        /// <returns>return ret status</returns>
        [WebMethod(BufferResponse = true, Description = "Method to send mail", EnableSession = true)]
        public static int SendVendorMail(int notificationMasterId, int notificationMappingId, long candidateId, int countryID, string toid)
        {
            int retStatus = 0;
            long sessionId;
            SessionDetails sessionDetail;
            Utility.UtilityMethods objUtil = new UtilityMethods();
            sessionDetail = objUtil.SessionDetail;
            sessionId = sessionDetail.SessionId;

            ////#region Utility Service call

            var clntUtility = new OBUtilityMethodsClient();
            try
            {
                clntUtility.Open();

                /* Sends Thank You Mail */
                MailData objMailData = new MailData();
                objMailData.NotificationMasterId = notificationMasterId;
                objMailData.NotificationMappingId = notificationMappingId;
                objMailData.CountryId = countryID;
                objMailData.SessionId = sessionId;
                objMailData.CandidateId = candidateId;
                objMailData.ToId = toid;
                objMailData.SpMode = 1; ////Running through App

                //// SendMail(24, null, countryId);
                retStatus = UtilitySendMail(objMailData);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion
            return retStatus;
        }
        #endregion

        #region FAQ Method
        ////  [SuppressMessage("StyleCop.CSharp.DocumentationRules", "SA1650:ElementDocumentationMustBeSpelledCorrectly", Justification = "Reviewed.")]

        /// <summary>
        /// 208099: Web method to get list of tasks for candidate
        /// </summary>
        /// <param name="sessionId">session id</param>
        /// <param name="candidateId">candidate id</param>
        /// <param name="taskId">task id</param>
        /// <param name="countryId">country id</param>
        /// <param name="processId">process id</param>       
        /// <returns>string FAQ string</returns>
        [WebMethod]
        public static string FAQ(long sessionId, long candidateId, int taskId, int countryId, int processId)
        {
            string strFaq = string.Empty;
            FaqSearch objFaqSearch = new FaqSearch();
            //// List<FaqMasterList> faqMasterList = new  List<FaqMasterList>();
            ////FaqMasterList faqMasterList = new FaqMasterList();
            //// Faq[][] faqMasterList;
            ////Faq[][] objFAQ;   //stylecop 298015
            objFaqSearch.CandidateId = candidateId;
            objFaqSearch.TaskId = taskId;
            objFaqSearch.ProcessId = processId;
            objFaqSearch.CountryId = countryId;

            ////#region Service call
            ////Creating new client to get message from DB
            ////   var clntUtility = new Service.CandidateServices.CandidateServicesClient();
            var clntUtility = new CandidateServicesClient();
            try
            {
                clntUtility.Open();
                strFaq = clntUtility.FetchFaq(objFaqSearch);
                ////    List<FaqMasterList> faqMasterList = objFAQ.ToList();
                //// clntUtility.Close();//// already closed in final block
                //// strFaq = ObjectSerializer(objFAQ);
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion
            return strFaq;
        }
        #endregion

        /// <summary>
        /// Pagination for the dashboard view 
        /// </summary>
        /// <param name="sessionId">session id</param>
        /// <param name="pageSize">page size</param>
        /// <param name="pageNo">page number</param>
        /// <returns>returns object array</returns>
        [WebMethod]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", MessageId = "pageSize", Justification = "Reviewed.")]
        public static ArrayList FetchTrainingData(int sessionId, int pageSize, int pageNo)
        {
            FormsService objForm = new FormsService();
            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new Service.CandidateServices.CandidateServicesClient();
            ArrayList objArray = new ArrayList();
            TotalCountDC tc = new TotalCountDC();
            ////TrainingList objTrainingData = new TrainingList();
            string strTrainingList = string.Empty;
            NewHireTrainingDC[] objTrainingDC;
            NewHireTrainingDC objDc = new NewHireTrainingDC();
            tc.TotalCount = 0;
            ////int totalCount = 0;
            try
            {
                clntUtility.Open();
                objDc.PageNo = pageNo;
                objDc.PageSize = objForm.PageSizeDashBoardcandidates;
                objForm.DataPageIndexDashBoardcandidates = pageNo;
                objTrainingDC = clntUtility.FetchTraningData(objDc, tc);
                ////  totalCount = objTrainingDC.Count();
                if (tc.TotalCount.Equals(0))
                {
                    objArray.Add(new { Display = string.Empty, Value = "<div class=\"footer_rc_invalid\"> <p>Oops!!! No such result found!</p> </div>" });
                    objArray.Add(new { Display = string.Empty, Value = string.Empty });
                }
                else
                {
                    strTrainingList = ObjectSerializer(objTrainingDC);
                    objArray.Add(new { Display = string.Empty, Value = strTrainingList });
                    int intPagesCount = tc.TotalCount / objForm.PageSizeDashBoardcandidates;
                    int intRemainder = tc.TotalCount % objForm.PageSizeDashBoardcandidates;
                    StringBuilder strbContent = new StringBuilder(string.Empty, 800);
                    try
                    {
                        ////Bind First
                        int ifirstPageNoIndex = 1;
                        int ifirstPageStartIndex = 0;
                        ////Bind Last
                        int ilastPageNoIndex = 1;
                        int ilastPageStartIndex = 0;
                        if (intRemainder == 0)
                        {
                            ilastPageNoIndex = tc.TotalCount / objForm.PageSizeDashBoardcandidates;
                            ilastPageStartIndex = ((tc.TotalCount / objForm.PageSizeDashBoardcandidates) * objForm.PageSizeDashBoardcandidates) - objForm.PageSizeDashBoardcandidates;
                        }
                        else
                        {
                            ilastPageNoIndex = (tc.TotalCount / objForm.PageSizeDashBoardcandidates) + 1;
                            ilastPageStartIndex = (tc.TotalCount / objForm.PageSizeDashBoardcandidates) * objForm.PageSizeDashBoardcandidates;
                        }

                        ////Bind Prev
                        int iprevPageNoIndex = objForm.DataPageIndexDashBoardcandidates - 1;
                        int iprevPageStartIndex = (iprevPageNoIndex * objForm.PageSizeDashBoardcandidates) - objForm.PageSizeDashBoardcandidates;
                        if (iprevPageNoIndex <= ifirstPageNoIndex)
                        {
                            iprevPageNoIndex = ifirstPageNoIndex;
                            iprevPageStartIndex = ifirstPageStartIndex;
                        }

                        ////Bind Next
                        int inextPageNoIndex = objForm.DataPageIndexDashBoardcandidates + 1;
                        int inextPageStartIndex = (inextPageNoIndex * objForm.PageSizeDashBoardcandidates) - objForm.PageSizeDashBoardcandidates;
                        if (inextPageNoIndex >= ilastPageNoIndex)
                        {
                            inextPageNoIndex = ilastPageNoIndex;
                            inextPageStartIndex = ilastPageStartIndex;
                        }

                        ////Bind number of pages to display
                        int iprevPageCount = objForm.DataPageIndexDashBoardcandidates - (objForm.TotalPagesDisplayDashBoardcandidates / 2);
                        int inextPageCount = objForm.DataPageIndexDashBoardcandidates + (objForm.TotalPagesDisplayDashBoardcandidates / 2);
                        if (iprevPageCount <= 0)
                        {
                            iprevPageCount = ifirstPageNoIndex;
                            inextPageCount = ifirstPageNoIndex + objForm.TotalPagesDisplayDashBoardcandidates - 1;
                        }

                        if (inextPageCount >= ilastPageNoIndex)
                        {
                            inextPageCount = ilastPageNoIndex;
                            iprevPageCount = ilastPageNoIndex - objForm.TotalPagesDisplayDashBoardcandidates + 1;
                        }

                        strbContent.Append("<div class=\"pagination\">");
                        strbContent.Append("<div class=\"btn_pagination\">");
                        strbContent.Append("<div class=\"flt_right\">");

                        if ((intPagesCount > 0) && (tc.TotalCount > objForm.PageSizeDashBoardcandidates))
                        {
                            if (objForm.DataPageIndexDashBoardcandidates == 1)
                            {
                                strbContent.Append("<span class='active_point' >First</span></a>");
                                strbContent.Append("<span class='active_point' >Previous</span></a>");
                            }
                            else
                            {   ////Append First
                                strbContent.Append("<a href=\"javascript:PaginationDashboard(" + ifirstPageStartIndex + "," + ifirstPageNoIndex + ")\">First</a>");
                                strbContent.Append("<a href=\"javascript:PaginationDashboard(" + iprevPageStartIndex + "," + iprevPageNoIndex + ")\"><span class='prev_point' >Previous</span></a>");
                            }

                            for (int i = iprevPageCount; i <= inextPageCount; i++)
                            {
                                if (i >= ifirstPageNoIndex && i <= ilastPageNoIndex)
                                {
                                    int istartIndex = (i * objForm.PageSizeDashBoardcandidates) - objForm.PageSizeDashBoardcandidates;
                                    if (i.Equals(objForm.DataPageIndexDashBoardcandidates))
                                    {
                                        strbContent.Append("<span class='active_point'>" + i.ToString() + "</span>");
                                    }
                                    else
                                    {
                                        strbContent.Append("<a href=\"javascript:PaginationDashboard(" + istartIndex.ToString() + "," + i.ToString() + ")\">" + i.ToString() + "</a>");
                                    }
                                }
                            }

                            if (objForm.DataPageIndexDashBoardcandidates == ilastPageNoIndex)
                            {
                                strbContent.Append("<span class='active_point' >Next</span></a>");
                                strbContent.Append("<span class='active_point' >Last</span></a>");
                            }
                            else
                            {
                                ////Append Next
                                strbContent.Append("<a href=\"javascript:PaginationDashboard(" + inextPageStartIndex + "," + inextPageNoIndex + ")\"><span class='next_point' >Next</span></a>");

                                ////Append Last
                                strbContent.Append("<a href=\"javascript:PaginationDashboard(" + ilastPageStartIndex + "," + ilastPageNoIndex + ")\">Last</a>");
                            }
                        }

                        strbContent.Append("<div class=\"clear\"></div>");
                        strbContent.Append("</div><span class=\"totalResult\" style=\"margin-top:3px\" >Total (" + tc.TotalCount + ")</span> </div><div class=\"clear\"></div></div>");
                    }
                    catch
                    {
                        throw;
                    }
                    ////  return sbContent.ToString() + "<div class='clear'></div>";
                    objArray.Add(new { Display = string.Empty, Value = strbContent.ToString() + "<div class='clear'></div>" });
                //// clntUtility.Close(); //// already closed in final block
                }
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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

            return objArray;
            ////#endregion
        }

        /// <summary>
        /// Binds the Training Status 
        /// </summary>        
        /// <returns>returns ret status</returns>
        [WebMethod]
        public static NewHireTrainingDC[] BindTrainingStatus()
        {
            try
            {
                using (CandidateServicesClient objDashBoardClient = new CandidateServicesClient())
                {
                    return (NewHireTrainingDC[])objDashBoardClient.FetchTrainingStatus();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// 208099: Method to Update Training Data for a candidate
        /// </summary>
        /// <param name="sessionId">session id</param>
        /// <param name="trainingId">training id</param>
        /// <param name="candidateId">candidate id</param>
        /// <returns>return ret status</returns>
        [WebMethod(BufferResponse = false, Description = "Saves the content of task to DB", EnableSession = true)]
        public static int UpdateCandidateTrainingData(long sessionId, int trainingId, int candidateId)
        {
            int retStatus = 0;
            ////  string str = taskData;

            ////SaveTaskDC objsave = new SaveTaskDC();
            NewHireTrainingDC objTraining = new NewHireTrainingDC();
            CandidateTrainingDC objCandTrainingDC = new CandidateTrainingDC();
            objCandTrainingDC.TrainingId = trainingId;
            objCandTrainingDC.SessionId = sessionId;
            objCandTrainingDC.CandidateId = candidateId;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new CandidateServicesClient();
            try
            {
                clntUtility.Open();
                retStatus = clntUtility.UpdateTrainingDate(objTraining);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            ////#region Logging Event Data
            ////string comment = "Saving of task {" + taskId.ToString() + "} resulted in status {" + retStatus.ToString() + "}";
            ////LogEventData(sessionId, candidateId, taskId, "Save task mode{" + saveMode.ToString() + "}", "SaveTaskData", objsave.TaskData, true, comment);
            ////#endregion

            return retStatus;
        }

        /// <summary>
        /// Binds the Training Name 
        /// </summary>  
        /// <param name="candidateId">candidate id</param>
        /// <param name="countryId">country id</param>
        /// <param name="sessionId">session id></param>
        /// <returns>array list</returns>
        [WebMethod]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        public static ArrayList BindTrainingDates(long candidateId, int countryId, int sessionId)
        {
            //// Service call
            ////Creating new client to get message from DB
            var clntUtility = new CandidateServicesClient();
            CandidateDetail objCandidateDC = new CandidateDetail();
            ////CandidateTrainingList objTrainingData = new CandidateTrainingList();
            CandidateTrainingDC[] objTrainingDC = null;
            ArrayList arlist = new ArrayList();
            int i = 0;
            objCandidateDC.CandidateId = candidateId;
            objCandidateDC.CountryID = countryId;
            objCandidateDC.Mode = 1;
            try
            {
                clntUtility.Open();
                objTrainingDC = clntUtility.FetchTrainingDates(objCandidateDC);
                foreach (CandidateTrainingDC aa in objTrainingDC)
                {
                    arlist.Add(new { ID = objTrainingDC[i].TrainingId, Description = objTrainingDC[i].RegisteredDate });
                    i += 1;
                }

                ////clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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

            return arlist;
        }

        /// <summary>
        /// Binds the Training Name 
        /// </summary>   
        /// <param name="trainingId">training id</param>
        /// <param name="countryId">country id</param>
        /// <param name="sessionId">session id</param>
        /// <returns>object TrainingListDC</returns>
        [WebMethod]
        public static NewHireTrainingDC[] FetchTrainingDetails(int trainingId, int countryId, int sessionId)
        {
            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new CandidateServicesClient();
            NewHireTrainingDC objTrainingDC = new NewHireTrainingDC();
            ////CandidateTrainingList objTrainingData = new CandidateTrainingList();
            NewHireTrainingDC[] objTrainingListDC = null;
            objTrainingDC.TrainingId = trainingId;
            objTrainingDC.CountryId = countryId;
            try
            {
                clntUtility.Open();
                objTrainingListDC = clntUtility.FetchTrainingDetails(objTrainingDC);
                //// clntUtility.Close(); /////// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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

            return objTrainingListDC;
            ////#endregion
        }

        /// <summary>
        /// Binds the Training Name 
        /// </summary>        
        /// <param name="candidateId">candidate id</param>
        /// <param name="sessionId">session id</param>
        /// <returns>returns object trainingDC</returns>
        [WebMethod]
        public static NewHireTrainingDC[] PopulateCandidateTrainingDetails(int candidateId, int sessionId)
        {
            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new CandidateServicesClient();
            CandidateDetail objCandidateDC = new CandidateDetail();
            //// CandidateTrainingList objTrainingData = new CandidateTrainingList();
            //// CandidateTrainingDC objCandDc = new CandidateTrainingDC();
            NewHireTrainingDC[] objTrainingDC = null;
            objCandidateDC.CandidateId = candidateId;
            objCandidateDC.Mode = 2;

            try
            {
                clntUtility.Open();
                objTrainingDC = clntUtility.PopulateCandidateTrainingDetails(objCandidateDC);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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

            return objTrainingDC;
            ////#endregion
        }

        #endregion

        #region Method to fetch Employers data
        /// <summary>
        /// 207953: Method to fetch Employers data
        /// </summary>
        /// <param name="sessionId">Current session id</param>
        /// <param name="candidateId">CandidateId of logged in candidate</param>
        /// <param name="taskId">TaskId to which the candidate is going to perform operation</param>
        /// <param name="countryId">Country id to which candidate is mapped</param>
        /// <returns>Returns string in JSON format</returns>
        [WebMethod(BufferResponse = true, Description = "Gets task data need for this operation", EnableSession = true)]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", MessageId = "countryId", Justification = "Reviewed.")]
        public static string GetEmployersDetails(long sessionId, long candidateId, int taskId, int countryId)
        {
            string jsonData = string.Empty;
            SaveTaskDC objPrefill = new SaveTaskDC();
            objPrefill.CandidateId = candidateId;
            objPrefill.TaskId = taskId;
            objPrefill.SessionId = sessionId;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new CandidateServicesClient();
            try
            {
                clntUtility.Open();
                objPrefill = clntUtility.GetEmployersDetails(objPrefill);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            objPrefill.CandidateId = candidateId;
            objPrefill.TaskId = taskId;
            objPrefill.SessionId = sessionId;
            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.LoadXml("<TaskDataXML>" + objPrefill.TaskDataXML + "</TaskDataXML>");
            objPrefill.TaskDataXML = JsonConvert.SerializeXmlNode(xmlDoc.SelectNodes("TaskDataXML").Item(0), Newtonsoft.Json.Formatting.None, true);
            ////string strXml = string.Empty;
            ////strXml = "<EmployersData><RelavantExperience>22</RelavantExperience>";
            ////strXml += "  <EmployerDetails><CompanyName>Cognizant</CompanyName><EmployeeID /><JobTitle /><Address /><City /><State /><Country /><Postalcode /><EmployersPhone /><FromDate /><ToDate /><Fax /><CurrentlyEmployed /><DescriptionOfDuties /><EmploymentStatus /><ReasonForLeaving />";
            ////strXml += "<OutsourcingAgencyName /><OutsourcingAgencyAddress /><OutsourcingAgencyPhoneNo /><SupervisorDetailsName /><SupervisorDetailsTitle /><SupervisorDetailsPhoneNo /><SupervisorDetailsEmailID /><HRManagerDetailsName /><HRManagerDetailsPhoneNo /><HRManagerDetailsEmailID /></EmployerDetails>";
            ////strXml += " <EmployerDetails><CompanyName /><EmployeeID /><JobTitle /><Address /><City /><State /><Country /><Postalcode /><EmployersPhone /><FromDate /><ToDate /><Fax /><CurrentlyEmployed /><DescriptionOfDuties /><EmploymentStatus /><ReasonForLeaving />";
            ////strXml += "<OutsourcingAgencyName /><OutsourcingAgencyAddress /><OutsourcingAgencyPhoneNo /><SupervisorDetailsName /><SupervisorDetailsTitle /><SupervisorDetailsPhoneNo /><SupervisorDetailsEmailID /><HRManagerDetailsName /><HRManagerDetailsPhoneNo /><HRManagerDetailsEmailID /></EmployerDetails>";
            ////strXml += "</EmployersData>";
            ////xmlDoc.LoadXml(strXml);
            jsonData = objPrefill.TaskDataXML;
            return jsonData;
        }

        #endregion

        #region Generic SendMail Method
        ////[SuppressMessage("StyleCop.CSharp.DocumentationRules", "SA1650:ElementDocumentationMustBeSpelledCorrectly", Justification = "Reviewed.")]

        /// <summary>
        /// 208099:Generic Method to send mail
        /// </summary>
        /// <param name="objMailData">object mail data</param>
        /// <returns>returns  status</returns>
        [WebMethod(BufferResponse = true, Description = "Method to send mail", EnableSession = true)]
        public static int UtilitySendMail(MailData objMailData)
        {
            int retStatus = 0;
            long sessionId;
            Utility.UtilityMethods objUtil = new UtilityMethods();
            sessionId = objUtil.SessionDetail.SessionId;

            ////#region Utility Service call

            var clntUtility = new OBUtilityMethodsClient();
            try
            {
                clntUtility.Open();

                retStatus = clntUtility.SendNotificationMail(objMailData);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion
            return retStatus;
        }
        #endregion

        #region PHotoUpload
        /// <summary>
        /// Fetching Service url from config 
        /// </summary>  
        /// /// <returns>returns url</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1055:UriReturnValuesShouldNotBeStrings", Justification = "Reviewed.")]
        [WebMethod]
        public static string BindUrl()
        {
            string url = ConfigurationManager.AppSettings["GenericPhotoUploadURL"].ToString();
            return url;
            ////OBUtilityMethodsClient obj = new OBUtilityMethodsClient();
            ////SystemKey sysKey = new SystemKey();
            ////DashBoard objDC = new DashBoard();
            //// sysKey.KeyId = 25;
            ////sysKey.KeyGroupCode = "FileUploadID";
            ////sysKey = obj.GetSystemKey(sysKey);
            ////return "";
        }

        /// <summary>
        /// Getting file Upload details from central repository if the candidate is uploaded the photo
        /// </summary>
        /// <param name="sessionId">session id</param>
        /// <param name="candidateId">candidate id</param>
        /// <param name="taskId">task id</param>   
        /// <param name="countryId">country id</param>
        /// <returns>returns object</returns>
        [WebMethod]
        public static ArrayList GetFileUploadDetails(long sessionId, string candidateId, string taskId, string countryId)
        {
            AdminDashBoard adminDashBoard = new AdminDashBoard();
            adminDashBoard.CandidateId = Convert.ToInt32(candidateId);
            adminDashBoard.TaskId = Convert.ToInt32(taskId);
            adminDashBoard.SessionId = sessionId;
            adminDashBoard.CountryId = Convert.ToInt32(countryId);

            ////#region Service call
            ////Creating new client to get message from DB
            var dashBoard = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                adminDashBoard = dashBoard.GetFileUploadDetails(adminDashBoard);
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
                logger.LogError(ex);
            }
            finally
            {
                if (dashBoard.State != System.ServiceModel.CommunicationState.Faulted)
                {
                    dashBoard.Close();
                }
                else
                {
                    dashBoard.Abort();
                }

                dashBoard = null;
            }
            ////#endregion

            ArrayList retObj = new ArrayList();
            string modifiedDate;
            modifiedDate = adminDashBoard.ModifiedDate != DateTime.MinValue ? adminDashBoard.ModifiedDate.ToString("yyyy-MM-dd HH:mm:ss:fff") : null;
            retObj.Add(new { FileUploadId = adminDashBoard.FileUploadId.ToString(), FileUploadStatus = adminDashBoard.FileUploadStatus, Photostatusdescription = adminDashBoard.Photostatusdescription, FileUploadURL = adminDashBoard.FileUploadURL, FileUploadStatusDesc = adminDashBoard.FileUploadStatusDesc, ModifiedDate = modifiedDate, RejectionDate = adminDashBoard.RejectionDate, TaskStatus = adminDashBoard.TaskStatus });
            ////  return adminDashBoard.FileUploadId + ";" + adminDashBoard.FileUploadStatus+";"+adminDashBoard.FileUploadURL+";"+adminDashBoard.FileUploadStatusDesc;

            return retObj;
        }

        /// <summary>
        /// 207953: Method to get master information
        /// </summary>
        /// <param name="sessionId">session id</param>
        /// <param name="candidateId">candidate id</param>
        /// <returns>Returns list of master information in array list</returns>
        [WebMethod(BufferResponse = true, Description = "Gets the Medical Top up Coverage amount for this operation", EnableSession = true)]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        public static ArrayList GetMedicalTopUpCoverage(long sessionId, long candidateId)
        {
            ArrayList retObj = new ArrayList();
            string retMasterData = string.Empty;
            MasterList objMaster = new MasterList();
            objMaster.CandidateId = Convert.ToInt32(candidateId);
            MasterListSource masterData = new MasterListSource();

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new CandidateServicesClient();
            try
            {
                clntUtility.Open();
                masterData = clntUtility.GetMedicalTopupCover(objMaster);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            MasterListData lstData = masterData.MasterData;

            foreach (MasterList ml in lstData)
            {
                retObj.Add(new { Description = ml.MasterDescription.ToString(), UserValue = ml.MasterUserValue.ToString() });
            }

            return retObj;
        }

        #endregion

        #region UploadForPhotoUpload
        ////<summary>
        ////224730: Method to Upload Photo for a candidate
        ////</summary>
        ////<returns></returns>
        //// [WebMethod()]
        ////public void UploadFormDetails(long sessionId, long candidateId, int taskId, string fileText)
        ////public static string UploadPhotoDetails(long sessionId, long candidateId, int taskId, string filepath)
        ////{
        ////    //Save the file temporarily in the server....
        ////    string _tempfilePath = HttpContext.Current.Server.MapPath("~/Temp/");
        ////    string _tempfileName = _tempfilePath + Path.GetFileName(filepath);
        ////    var f1 = new FileInfo(_tempfileName);
        ////    f1.Create();
        ////    var f = new FileInfo(_tempfileName);
        ////    var size = (f.Length / 1024.0);
        ////    if (size > 200)
        ////    {
        ////        throw new Exception("File size exceeds allowed limit");
        ////    }
        ////    else
        ////    {
        ////        string[] fileSplit = filepath.Split('.'); 
        ////        string fileExt = "";
        ////        if (fileSplit.Length > 1) 
        ////        { fileExt = fileSplit[fileSplit.Length - 1]; 
        ////        } 
        ////        OneC.OnBoarding.DC.CandidateDC.FileUploadDC objDC = new OneC.OnBoarding.DC.CandidateDC.FileUploadDC();
        ////        objDC.SessionId = sessionId;
        ////        objDC.CandidateId = candidateId;
        ////        objDC.TaskId = taskId;
        ////        objDC.FileText = filepath;
        ////        StreamReader sr = new System.IO.StreamReader(System.IO.File.OpenRead(filepath));
        ////        string strbuild = sr.ReadLine();
        ////        FileStream fs = new FileStream(filepath, FileMode.Open, FileAccess.Read);
        ////        BinaryReader br = new BinaryReader(fs);
        ////        Byte[] bytes = br.ReadBytes((Int32)filepath.Length);
        ////        int appId = 2;//This is common keyId 
        ////        OBUtilityMethodsClient obj = new OBUtilityMethodsClient();
        ////        SystemKey sysKey = new SystemKey();
        ////        sysKey.KeyId = 40;
        ////        sysKey = obj.GetSystemKey(sysKey);
        ////        FileUploadService.FileUploadDetailsRequest objFileUploadDetailsRequest = new FileUploadService.FileUploadDetailsRequest();
        ////        FileUploadService.MFileuploadResponse objMFileuploadResponse = new FileUploadService.MFileuploadResponse();
        ////        FileUploadService.DocumentUploadServiceClient objDocumentUploadServiceClient = new FileUploadService.DocumentUploadServiceClient();
        ////        objFileUploadDetailsRequest.AppId = appId;
        ////        objFileUploadDetailsRequest.AppTemplateId = sysKey.KeyValue;
        ////        objFileUploadDetailsRequest.FileName = candidateId+"."+fileExt;
        ////        objFileUploadDetailsRequest.IncomingFile = bytes;
        ////        objFileUploadDetailsRequest.AssociateId = Convert.ToInt32(objDC.CandidateId);
        ////        //objFileUploadDetailsRequest.AssociateId = 220932;
        ////        objFileUploadDetailsRequest.CreatedBy = objDC.CandidateId.ToString();
        ////        objFileUploadDetailsRequest.CreatedDate = DateTime.UtcNow;
        ////        objMFileuploadResponse = objDocumentUploadServiceClient.UploadFile(objFileUploadDetailsRequest);
        ////        if (!f.Exists)
        ////            f.Delete();

        ////        return objMFileuploadResponse.Filestatus;
        ////    }

        ////}
        ////#endregion

        #region Mckinley

        /// <summary>
        /// 207953: Method to get master information
        /// </summary>
        /// <returns>Returns string JSON</returns>
        [WebMethod]
        [SuppressMessage("Microsoft.Design", "CA1024:UsePropertiesWhereAppropriate", Justification = "Reviewed.")]
        public static string GetMckinleyCategories()
        {
            MCkinleyDC objMCkinleyDC = new MCkinleyDC();
            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new OBUtilityMethodsClient();
            try
            {
                clntUtility.Open();
                objMCkinleyDC = clntUtility.GetMckinleyCategories(objMCkinleyDC);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception)
            {
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
            ////#endregion

            ////#region Preparing JSON content

            XmlDocument xmlDoc = new XmlDocument();

            xmlDoc = new XmlDocument();
            xmlDoc.LoadXml("<Categories>" + objMCkinleyDC.Content + "</Categories>");
            objMCkinleyDC.Content = JsonConvert.SerializeXmlNode(xmlDoc.SelectNodes("Categories").Item(0), Newtonsoft.Json.Formatting.None, true);
            string strJSON = string.Empty;
            strJSON = JsonConvert.SerializeObject(objMCkinleyDC);
            ////#endregion

            return strJSON;
        }
        ////public static ArrayList GetMckinleyCategories()
        ////{
        ////    ArrayList retObj = new ArrayList();
        ////    int i = 0;
        ////    MCkinleyDC objMCkinleyDC = new MCkinleyDC();
        ////    MCkinleyList masterData = new MCkinleyList();

        ////    //Creating new client to get message from DB
        ////    var clntUtility = new OBUtilityMethodsClient();
        ////    try
        ////    {
        ////        clntUtility.Open();

        ////        objMCkinleyDC = clntUtility.GetMckinleyCategories(objMCkinleyDC);

        ////           foreach (MCkinleyDC aa in objMCkinleyDC)
        ////             {

        ////               retObj.Add(new { ID = objMCkinleyDC.CategoryId, Description = objMCkinleyDC.SubCategoryId });
        ////               i += 1;
        ////             }
        ////        clntUtility.Close();
        ////    }
        ////    catch (Exception ex)
        ////    {
        ////        //ErrorLogger logger = new ErrorLogger(sessionId);
        ////        //logger.LogError(ex);
        ////    }
        ////    finally
        ////    {
        ////        if (clntUtility.State != System.ServiceModel.CommunicationState.Faulted)
        ////            clntUtility.Close();
        ////        else
        ////            clntUtility.Abort();

        ////        clntUtility = null;
        ////    }
        ////}
        #endregion

        /// <summary>
        /// Binds Default Date for Dashboard
        /// </summary>    
        /// <param name="countryID">country id</param>
        /// <returns>returns object array</returns>
        [WebMethod]
        public static ArrayList GetDefaultDate(int countryID)
        {
            try
            {
                SystemKey sysKey = new SystemKey();
                OBUtilityMethodsClient obj = new OBUtilityMethodsClient();
                ArrayList objArray = new ArrayList();
                string datetimeSDate, datetimeEDate;
                sysKey.CountryId = countryID;
                sysKey.KeyGroupCode = "DASHBOARD_START_DATE";
                sysKey = obj.GetFilterDate(sysKey);
                DateTime datetimeStartDate = DateTime.Today.AddDays(Convert.ToInt16(sysKey.KeyValue)); ////DateTime.Today.AddDays(Convert.ToInt16(objDC.StartDate)) ;
                datetimeSDate = datetimeStartDate.ToShortDateString();
                sysKey.KeyGroupCode = "DASHBOARD_END_DATE";
                sysKey = obj.GetFilterDate(sysKey);
                DateTime datetimeEndDate = DateTime.Today.AddMonths(Convert.ToInt16(sysKey.KeyValue)); ////DateTime.Today.AddDays(Convert.ToInt16(objDC.EndDate));
                datetimeEDate = datetimeEndDate.ToShortDateString();
                objArray.Add(new { Display = "Start Date", Value = datetimeSDate });
                objArray.Add(new { Display = "End Date", Value = datetimeEDate });

                return objArray;
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Updates Print Status
        /// </summary>
        /// <param name="candidateId">candidate id</param>
        /// <param name="taskId">task id</param>
        /// <param name="sessionId">session id</param>        
        [WebMethod]
        public static void UpdatePhotoStatus(long candidateId, int taskId, long sessionId)
        {
            ////#region Service call
            ////Creating new client to get message from DB
            var clntdashBoard = new Service.DashBoardServices.DashBoardServicesClient();
            CandidateDetail objCand = new CandidateDetail();
            try
            {
                clntdashBoard.Open();
                objCand.CandidateId = candidateId;
                objCand.SessionId = sessionId;
                objCand.TaskId = taskId;
                clntdashBoard.UpdatePhotoStatus(objCand);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
                logger.LogError(ex);
            }
            finally
            {
                if (clntdashBoard.State != System.ServiceModel.CommunicationState.Faulted)
                {
                    clntdashBoard.Close();
                }
                else
                {
                    clntdashBoard.Abort();
                }

                clntdashBoard = null;
            }
            ////#endregion
        }

        #region Survey
        /// <summary>
        /// Updates Print Status
        /// </summary>
        /// <param name="candidateId">candidate id</param>
        /// <param name="surveyType">survey Type</param>
        /// <param name="spmode">for Mode</param>   
        /// <returns>returns a string</returns>
        [WebMethod]
        public static string GetSurveyData(long candidateId, string surveyType, int spmode)
        {
            string strJSON = string.Empty;
            SurveyDC objSurvey = new SurveyDC();
            objSurvey.CandidateId = candidateId;
            objSurvey.SurveyType = surveyType;
            objSurvey.SpMode = spmode;
            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new OBUtilityMethodsClient();
            try
            {
                clntUtility.Open();
                objSurvey = clntUtility.GetSurveyData(objSurvey);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception)
            {
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
            ////#endregion

            ////#region Preparing JSON content

            if (spmode == 0)
            {
                XmlDocument xmlDoc = new XmlDocument();
                xmlDoc = new XmlDocument();
                xmlDoc.LoadXml("<Design>" + objSurvey.SurveyDesignXml + "</Design>");
                objSurvey.SurveyDesignXml = JsonConvert.SerializeXmlNode(xmlDoc.SelectNodes("Design").Item(0), Newtonsoft.Json.Formatting.None, true);
                xmlDoc.LoadXml("<Data>" + objSurvey.SurveyDataXml + "</Data>");
                objSurvey.SurveyDataXml = JsonConvert.SerializeXmlNode(xmlDoc.SelectNodes("Data").Item(0), Newtonsoft.Json.Formatting.None, true);
                xmlDoc.LoadXml("<SurveyData>" + objSurvey.CandidateSurveyDetailXml + "</SurveyData>");
                objSurvey.CandidateSurveyDetailXml = JsonConvert.SerializeXmlNode(xmlDoc.SelectNodes("SurveyData").Item(0), Newtonsoft.Json.Formatting.None, true);
                strJSON = JsonConvert.SerializeObject(objSurvey);
            }
            else
            {
                strJSON = objSurvey.ReturnSurveyType.ToString();
            }
            ////#endregion
            return strJSON;
        }

        /// <summary>
        /// 298589: Method to save the Survey Data
        /// </summary>
        /// <param name="sessionId">Current session id</param>
        /// <param name="candidateId">CandidateId of logged in candidate</param>
        /// <param name="surveyType">survey type</param>
        /// <param name="surveyData">Content of task in JSON format string</param>
        /// <param name="surveyStatus">Decides whether the method is called in progress or completed</param>
        /// <returns>Returns SUCCESS - if task content saved successfully/ FAILED - if task content failed to save</returns>
        [WebMethod(BufferResponse = false, Description = "Saves the content of task to DB", EnableSession = true)]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        public static int SaveSurveyData(long sessionId, long candidateId, int surveyType, string surveyData, int surveyStatus)
        {
            int retStatus = 0;
            string str = surveyData;
            //// CandidateServicesClient objService = new CandidateServicesClient();    fixing CA
            SaveTaskDC objsave = new SaveTaskDC();
            objsave.CandidateId = candidateId;
            XmlDocument doc = (XmlDocument)JsonConvert.DeserializeXmlNode(surveyData); ////, rootElementName);
            objsave.SurveyData = doc.InnerXml;
            doc = null;
            objsave.SurveyStatus = surveyStatus;
            objsave.SessionId = sessionId;
            objsave.SurveyType = surveyType;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new CandidateServicesClient();
            try
            {
                clntUtility.Open();
                retStatus = clntUtility.SaveSurveyData(objsave);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            ////#region Logging Event Data
            string comment = "Saving of surveyType {" + surveyType.ToString() + "} resulted in status {" + surveyStatus.ToString() + "}";
            LogEventData(sessionId, candidateId, surveyType, "Save survey status{" + surveyStatus.ToString() + "}", "SaveTaskData", objsave.TaskData, true, comment);
            ////#endregion

            return retStatus;
        }

        #endregion Survey

        #region InductionTracker Methods
        /// <summary>
        /// Select Box Bind JoiningLocation
        /// 312539
        /// </summary>
        /// <param name="joininglocation">joining location</param>
        /// <returns>Array List</returns>
        [WebMethod]
        public static CandidateDetail[] InductionLocation(string joininglocation)
        {
            var objDashBoardClient = new DashBoardServicesClient();
            try
            {
                objDashBoardClient.Open();
                CandidateDetail objCandidateDetail = new CandidateDetail();

                if (joininglocation == "ALL")
                {
                    objCandidateDetail.CityName = null;
                }
                else
                {
                    objCandidateDetail.CityName = joininglocation;
                }

                return (CandidateDetail[])objDashBoardClient.GetInductionLocation(objCandidateDetail);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                objDashBoardClient.Abort();
            }
        }

        /// <summary>
        /// Select Box Bind JoiningLocation
        /// 312539
        /// </summary>
        /// <param name="joininglocation">joining location</param>
        /// <returns>Array List</returns>
        [WebMethod]
        public static CandidateDetail[] CitySelectedIndexchangeBindInductionLocation(string joininglocation)
        {
            var objDashBoardClient = new DashBoardServicesClient();
            try
            {
                objDashBoardClient.Open();
                CandidateDetail objCandidateDetail = new CandidateDetail();

                if (joininglocation == "ALL")
                {
                    objCandidateDetail.CityName = null;
                }
                else
                {
                    objCandidateDetail.CityName = joininglocation;
                }

                return (CandidateDetail[])objDashBoardClient.GetInductionLocation(objCandidateDetail);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                objDashBoardClient.Abort();
            }
        }

        /// <summary>
        /// Select Box Bind InductionCandidateStatus
        /// 312539
        /// </summary>
        /// <param name="joininglocation">joining location</param>
        /// <returns>Array List</returns>
        [WebMethod]
        public static CandidateDetail[] InductionCandidateStatus(string joininglocation)
        {
            var objDashBoardClient = new DashBoardServicesClient();
            try
            {
                objDashBoardClient.Open();
                CandidateDetail objCandidateDetail = new CandidateDetail();

                if (joininglocation == "ALL")
                {
                    objCandidateDetail.CityName = null;
                }
                else
                {
                    objCandidateDetail.CityName = joininglocation;
                }

                return (CandidateDetail[])objDashBoardClient.GetInductionCandidateStatus(objCandidateDetail);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                objDashBoardClient.Abort();
            }
        }

        /// <summary>
        /// Select Box Bind InductionCountryName
        /// 312539
        /// </summary>
        /// <param name="joininglocation">joining location</param>
        /// <returns>Array List</returns>
        [WebMethod]
        public static CandidateDetail[] InductionCountryName(string joininglocation)
        {
            var objDashBoardClient = new DashBoardServicesClient();
            try
            {
                objDashBoardClient.Open();
                CandidateDetail objCandidateDetail = new CandidateDetail();

                if (joininglocation == "ALL")
                {
                    objCandidateDetail.CityName = null;
                }
                else
                {
                    objCandidateDetail.CityName = joininglocation;
                }

                return (CandidateDetail[])objDashBoardClient.GetInductionCountryName(objCandidateDetail);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                objDashBoardClient.Abort();
            }
        }

        /// <summary>
        /// Select Box Bind InductionCountryName
        /// 312539
        /// </summary>
        /// <param name="joininglocation">joining location</param>
        /// <returns>object Candidate Detail</returns>
        [WebMethod]
        public static CandidateDetail[] InductionCanidateJoiningTypes(string joininglocation)
        {
            var objDashBoardClient = new DashBoardServicesClient();
            try
            {
                objDashBoardClient.Open();
                CandidateDetail objCandidateDetail = new CandidateDetail();

                if (joininglocation == "ALL")
                {
                    objCandidateDetail.CityName = null;
                }
                else
                {
                    objCandidateDetail.CityName = joininglocation;
                }

                return (CandidateDetail[])objDashBoardClient.GetCanidateJoiningTypes(objCandidateDetail);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                objDashBoardClient.Abort();
            }
        }

        /// <summary>
        /// 312539 :get joining location
        /// </summary>   
        /// <param name="joininglocation">joining location</param>
        /// <returns>object Candidate Detail</returns>
        [WebMethod]
        public static CandidateDetail[] JoiningLocation(string joininglocation)
        {
            var objDashBoardClient = new DashBoardServicesClient();
            try
            {
                objDashBoardClient.Open();
                CandidateDetail objCandidateDetail = new CandidateDetail();

                if (joininglocation == "ALL")
                {
                    objCandidateDetail.CityName = null;
                }
                else
                {
                    objCandidateDetail.CityName = joininglocation;
                }

                return (CandidateDetail[])objDashBoardClient.GetJoiningLocation(objCandidateDetail);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                objDashBoardClient.Abort();
            }
        }

        /// <summary>
        /// 312539 :get joining location
        /// </summary>      
        /// <param name="joininglocation">joining location</param>
        /// <returns>object Candidate Detail</returns>
        [WebMethod]
        public static CandidateDetail[] GetChireStatus(string joininglocation)
        {
            var objDashBoardClient = new DashBoardServicesClient();
            try
            {
                objDashBoardClient.Open();
                //// FormsService objNssDashBoard = new FormsService();
                CandidateDetail objCandidateDetail = new CandidateDetail();

                if (joininglocation == "ALL")
                {
                    objCandidateDetail.CityName = null;
                }
                else
                {
                    objCandidateDetail.CityName = joininglocation;
                }

                return (CandidateDetail[])objDashBoardClient.GetChireStatus(objCandidateDetail);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                objDashBoardClient.Abort();
            }
        }

        /// <summary>
        /// Pagination for the dashboard Grid view 
        /// </summary>
        /// <param name="itotalCount">total count</param>   
        /// <returns>returns string</returns>
        [WebMethod]
        public static string DoPagingForDashboard(int itotalCount)
        {
            if (itotalCount.Equals(0))
            {
                return string.Empty;
            }

            int pagesCount = itotalCount / pageSizeDashBoardcandidates1;
            int remainder = itotalCount % pageSizeDashBoardcandidates1;
            StringBuilder strbContent = new StringBuilder(string.Empty, 800);

            try
            {
                ////Bind First
                int firstPageNoIndex = 1;
                int firstPageStartIndex = 0;

                ////Bind Last
                int lastPageNoIndex = 1;
                int lastPageStartIndex = 0;
                if (remainder == 0)
                {
                    lastPageNoIndex = itotalCount / pageSizeDashBoardcandidates1;
                    lastPageStartIndex = ((itotalCount / pageSizeDashBoardcandidates1) * pageSizeDashBoardcandidates1) - pageSizeDashBoardcandidates1;
                }
                else
                {
                    lastPageNoIndex = (itotalCount / pageSizeDashBoardcandidates1) + 1;
                    lastPageStartIndex = (itotalCount / pageSizeDashBoardcandidates1) * pageSizeDashBoardcandidates1;
                }

                ////Bind Prev
                int prevPageNoIndex = dataPageIndexDashBoardcandidates1 - 1;
                int prevPageStartIndex = (prevPageNoIndex * pageSizeDashBoardcandidates1) - pageSizeDashBoardcandidates1;
                if (prevPageNoIndex <= firstPageNoIndex)
                {
                    prevPageNoIndex = firstPageNoIndex;
                    prevPageStartIndex = firstPageStartIndex;
                }

                ////Bind Next
                int nextPageNoIndex = dataPageIndexDashBoardcandidates1 + 1;
                int nextPageStartIndex = (nextPageNoIndex * pageSizeDashBoardcandidates1) - pageSizeDashBoardcandidates1;
                if (nextPageNoIndex >= lastPageNoIndex)
                {
                    nextPageNoIndex = lastPageNoIndex;
                    nextPageStartIndex = lastPageStartIndex;
                }

                ////Bind number of pages to display
                int prevPageCount = dataPageIndexDashBoardcandidates1 - (totalPagesDisplayDashBoardcandidates1 / 2);
                int nextPageCount = dataPageIndexDashBoardcandidates1 + (totalPagesDisplayDashBoardcandidates1 / 2);
                if (prevPageCount <= 0)
                {
                    prevPageCount = firstPageNoIndex;
                    nextPageCount = firstPageNoIndex + totalPagesDisplayDashBoardcandidates1 - 1;
                }

                if (nextPageCount >= lastPageNoIndex)
                {
                    nextPageCount = lastPageNoIndex;
                    prevPageCount = lastPageNoIndex - totalPagesDisplayDashBoardcandidates1 + 1;
                }

                strbContent.Append("<div class=\"pagination\">");
                strbContent.Append("<div class=\"btn_pagination\" >");
                strbContent.Append("<div class=\"flt_right\">");

                if ((pagesCount > 0) && (itotalCount > pageSizeDashBoardcandidates1))
                {
                    if (dataPageIndexDashBoardcandidates1 == 1)
                    {
                        strbContent.Append("<span class='active_point' >First</span></a>");
                        strbContent.Append("<span class='active_point' >Previous</span></a>");
                    }
                    else
                    {
                        ////Append First
                        strbContent.Append("<a href=\"javascript:PaginationDashboard(" + firstPageStartIndex + "," + firstPageNoIndex + ")\">First</a>");

                        strbContent.Append("<a href=\"javascript:PaginationDashboard(" + prevPageStartIndex + "," + prevPageNoIndex + ")\"><span class='prev_point' >Previous</span></a>");
                    }

                    for (int i = prevPageCount; i <= nextPageCount; i++)
                    {
                        if (i >= firstPageNoIndex && i <= lastPageNoIndex)
                        {
                            int startIndex = (i * pageSizeDashBoardcandidates1) - pageSizeDashBoardcandidates1;
                            if (i.Equals(dataPageIndexDashBoardcandidates1))
                            {
                                strbContent.Append("<span class='active_point'>" + i.ToString() + "</span>");
                            }
                            else
                            {
                                strbContent.Append("<a href=\"javascript:PaginationDashboard(" + startIndex.ToString() + "," + i.ToString() + ")\">" + i.ToString() + "</a>");
                            }
                        }
                    }

                    if (dataPageIndexDashBoardcandidates1 == lastPageNoIndex)
                    {
                        strbContent.Append("<span class='active_point' >Next</span></a>");
                        strbContent.Append("<span class='active_point' >Last</span></a>");
                    }
                    else
                    {
                        ////Append Next
                        strbContent.Append("<a href=\"javascript:PaginationDashboard(" + nextPageStartIndex + "," + nextPageNoIndex + ")\"><span class='next_point' >Next</span></a>");

                        ////Append Last
                        strbContent.Append("<a href=\"javascript:PaginationDashboard(" + lastPageStartIndex + "," + lastPageNoIndex + ")\">Last</a>");
                    }
                }
                ////sbContent.Append("<div class=\"clear\"></div>");
                strbContent.Append("</div><span class=\"active_point flt_right\" style=\"font-weight:bold; float:right\" >Total (" + itotalCount + ")</span> </div><div class=\"clear\"></div></div>");
            }
            catch (Exception)
            {
                throw;
            }

            return strbContent.ToString() + "<div class='clear'></div>";
        }

        /// <summary>
        /// 312539 Pagination for the dashboard Induction Tracker
        /// </summary>
        /// <param name="rtotalCount">total count</param>    
        /// <returns>returns SB Content</returns>
        [WebMethod]
        public static string DoPagingForInductinTracker(int rtotalCount)
        {
            if (rtotalCount.Equals(0))
            {
                return string.Empty;
            }

            int ipagesCount = rtotalCount / pageSizeInductinTracker;
            int iremainder = rtotalCount % pageSizeInductinTracker;
            StringBuilder strbContent = new StringBuilder(string.Empty, 800);

            try
            {
                ////Bind First
                int ifirstPageNoIndex = 1;
                int ifirstPageStartIndex = 0;

                ////Bind Last
                int ilastPageNoIndex = 1;
                int ilastPageStartIndex = 0;
                if (iremainder == 0)
                {
                    ilastPageNoIndex = rtotalCount / pageSizeInductinTracker;
                    ilastPageStartIndex = ((rtotalCount / pageSizeInductinTracker) * pageSizeInductinTracker) - pageSizeInductinTracker;
                }
                else
                {
                    ilastPageNoIndex = (rtotalCount / pageSizeInductinTracker) + 1;
                    ilastPageStartIndex = (rtotalCount / pageSizeInductinTracker) * pageSizeInductinTracker;
                }

                ////Bind Prev
                int iprevPageNoIndex = dataPageIndexDashBoardcandidates1 - 1;
                int iprevPageStartIndex = (iprevPageNoIndex * pageSizeInductinTracker) - pageSizeInductinTracker;
                if (iprevPageNoIndex <= ifirstPageNoIndex)
                {
                    iprevPageNoIndex = ifirstPageNoIndex;
                    iprevPageStartIndex = ifirstPageStartIndex;
                }

                ////Bind Next
                int inextPageNoIndex = dataPageIndexDashBoardcandidates1 + 1;
                int inextPageStartIndex = (inextPageNoIndex * pageSizeInductinTracker) - pageSizeInductinTracker;
                if (inextPageNoIndex >= ilastPageNoIndex)
                {
                    inextPageNoIndex = ilastPageNoIndex;
                    inextPageStartIndex = ilastPageStartIndex;
                }

                ////Bind number of pages to display
                int iprevPageCount = dataPageIndexDashBoardcandidates1 - (totalPagesDisplayDashBoardcandidates1 / 2);
                int inextPageCount = dataPageIndexDashBoardcandidates1 + (totalPagesDisplayDashBoardcandidates1 / 2);
                if (iprevPageCount <= 0)
                {
                    iprevPageCount = ifirstPageNoIndex;
                    inextPageCount = ifirstPageNoIndex + totalPagesDisplayDashBoardcandidates1 - 1;
                }

                if (inextPageCount >= ilastPageNoIndex)
                {
                    inextPageCount = ilastPageNoIndex;
                    iprevPageCount = ilastPageNoIndex - totalPagesDisplayDashBoardcandidates1 + 1;
                }

                strbContent.Append("<div class=\"pagination\">");
                strbContent.Append("<div class=\"btn_pagination\" >");
                strbContent.Append("<div class=\"flt_right\">");

                if ((ipagesCount > 0) && (rtotalCount > pageSizeInductinTracker))
                {
                    if (dataPageIndexDashBoardcandidates1 == 1)
                    {
                        strbContent.Append("<span class='active_point' >First</span></a>");
                        strbContent.Append("<span class='active_point' >Previous</span></a>");
                    }
                    else
                    {
                        ////Append First
                        strbContent.Append("<a href=\"javascript:PaginationDashboard2(" + ifirstPageStartIndex + "," + ifirstPageNoIndex + ")\">First</a>");

                        strbContent.Append("<a href=\"javascript:PaginationDashboard2(" + iprevPageStartIndex + "," + iprevPageNoIndex + ")\"><span class='prev_point' >Previous</span></a>");
                    }

                    for (int i = iprevPageCount; i <= inextPageCount; i++)
                    {
                        if (i >= ifirstPageNoIndex && i <= ilastPageNoIndex)
                        {
                            int istartIndex = (i * pageSizeInductinTracker) - pageSizeInductinTracker;
                            if (i.Equals(dataPageIndexDashBoardcandidates1))
                            {
                                strbContent.Append("<span class='active_point'>" + i.ToString() + "</span>");
                            }
                            else
                            {
                                strbContent.Append("<a href=\"javascript:PaginationDashboard2(" + istartIndex.ToString() + "," + i.ToString() + ")\">" + i.ToString() + "</a>");
                            }
                        }
                    }

                    if (dataPageIndexDashBoardcandidates1 == ilastPageNoIndex)
                    {
                        strbContent.Append("<span class='active_point' >Next</span></a>");
                        strbContent.Append("<span class='active_point' >Last</span></a>");
                    }
                    else
                    {
                        ////Append Next
                        strbContent.Append("<a href=\"javascript:PaginationDashboard2(" + inextPageStartIndex + "," + inextPageNoIndex + ")\"><span class='next_point' >Next</span></a>");

                        ////Append Last
                        strbContent.Append("<a href=\"javascript:PaginationDashboard2(" + ilastPageStartIndex + "," + ilastPageNoIndex + ")\">Last</a>");
                    }
                }
                ////sbContent.Append("<div class=\"clear\"></div>");
                strbContent.Append("</div><span class=\"active_point flt_right\" style=\"font-weight:bold ;float:right\" >Total (" + rtotalCount + ")</span> </div><div class=\"clear\"></div></div>");
            }
            catch (Exception)
            {
                throw;
            }

            return strbContent.ToString() + "<div class='clear'></div>";
        }

        /// <summary>
        /// Fetching the  Induction candidate lists
        /// </summary>      
        /// <param name="pageNo">page number</param>
        /// <param name="fromDate">from date</param>
        /// <param name="joininglocation">joining location</param>
        /// <param name="inductionlocation">induction location</param>
        /// <returns>returns candidate list</returns>
        [WebMethod]
        public static string FetchCandidateInductionTrackerDashboard(string pageNo, DateTime fromDate, string joininglocation, string inductionlocation)
        {
            var objDashBoardClient = new DashBoardServicesClient();
            try
            {
                objDashBoardClient.Open();
                DashboardDataDC objDashboardDetail = new DashboardDataDC();
                ////Utility.UtilityMethods objUtil = new UtilityMethods();
                TotalCountDC tc = new TotalCountDC();
                string xmlcandidateslist = string.Empty;

                if (joininglocation == "ALL")
                {
                    objDashboardDetail.JoiningLocation = null;
                }
                else
                {
                    objDashboardDetail.JoiningLocation = joininglocation;
                }

                if (inductionlocation == "ALL")
                {
                    objDashboardDetail.InductionLocation = null;
                }
                else
                {
                    objDashboardDetail.InductionLocation = inductionlocation;
                }

                objDashboardDetail.InductinDate = fromDate;
                objDashboardDetail.PageNo = int.Parse(pageNo);
                objDashboardDetail.PageSize = pageSizeDashBoardcandidates1;
                dataPageIndexDashBoardcandidates1 = int.Parse(pageNo);
                tc.TotalCount = 0;
                ////int totalRecords = 0;
                xmlcandidateslist = objDashBoardClient.FetchCandidateInductionTrackerDashboard(objDashboardDetail, tc);
                if (!string.IsNullOrEmpty(xmlcandidateslist))
                {
                    return xmlcandidateslist;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                objDashBoardClient.Abort();
            }
        }

        /// <summary>
        /// Fetching the Crop Induction candidate lists based on location
        /// </summary>       
        /// <param name="pageNo">page number</param>\
        /// <param name="inductinDate">induction date</param>
        /// <param name="joininglocation">joining location</param>
        /// <returns>XML candidates list</returns>
        [WebMethod]
        public static string FetchCandidateDetailsInductionLocation(string pageNo, DateTime? inductinDate, string joininglocation)
        {
            var objDashBoardClient = new DashBoardServicesClient();
            try
            {
                objDashBoardClient.Open();
                DashboardDataDC objDashboardDetail = new DashboardDataDC();
                ////Utility.UtilityMethods objUtil = new UtilityMethods();
                TotalCountDC tc = new TotalCountDC();
                string xmlcandidateslist = string.Empty;
                objDashboardDetail.InductionLocation = joininglocation;
                objDashboardDetail.InductinDate = inductinDate;
                objDashboardDetail.PageNo = int.Parse(pageNo);
                objDashboardDetail.PageSize = pageSizeInductinTracker;
                dataPageIndexDashBoardcandidates1 = int.Parse(pageNo);
                tc.TotalCount = 0;
                ////int totalRecords = 0;
                xmlcandidateslist = objDashBoardClient.FetchCandidateDetailsInductionLocation(objDashboardDetail, tc);
                if (!string.IsNullOrEmpty(xmlcandidateslist))
                {
                    return xmlcandidateslist;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                objDashBoardClient.Abort();
            }
        }

        /// <summary>
        /// 312539 Update Candidate Attendance Tracker
        /// </summary>   
        /// <param name="atteandanceupdateCandiadatelist">attendance update Candidate list</param>
        /// <param name="inductinDate">induction date</param>
        /// <param name="joininglocation">joining location</param>
        /// <param name="issingle">is single</param>
        /// <returns>object dashboard</returns>
        [WebMethod]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        public static string UpdateCandidateAttendanceTrackerBulk(string atteandanceupdateCandiadatelist, DateTime? inductinDate, string joininglocation, string issingle)
        {
            var objDashBoardClient = new DashBoardServicesClient();
            try
            {
                objDashBoardClient.Open();
                DashboardDataDC objDashboardDetail = new DashboardDataDC();
                Utility.UtilityMethods objUtil = new UtilityMethods();
                SessionHelper objSession = new SessionHelper();
                UserRolesList roleList = new UserRolesList();
                string xmlcandidateslist = string.Empty;
                objDashboardDetail.AtteandanceUpdateCandiadatelist = atteandanceupdateCandiadatelist;
                objDashboardDetail.InductionLocation = joininglocation;
                objDashboardDetail.InductinDate = inductinDate;
                objDashboardDetail.IsSingle = issingle;
                objDashboardDetail.SessionId = objUtil.SessionDetail.SessionId;
                objDashBoardClient.UpdateCandidateAttendanceTracker(objDashboardDetail);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                objDashBoardClient.Abort();
            }

            return null;
        }

        /// <summary>
        /// 312539 Update Candidate Attendance Tracker
        /// </summary>  
        /// <param name="atteandanceupdateCandiadatelist">attendance update Candidate list</param>
        /// <returns>object dashboard</returns>
        [WebMethod]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        public static string UpdateCandidateAttendanceTracker(string atteandanceupdateCandiadatelist)
        {
            var objDashBoardClient = new DashBoardServicesClient();
            try
            {
                objDashBoardClient.Open();
                DashboardDataDC objDashboardDetail = new DashboardDataDC();
                Utility.UtilityMethods objUtil = new UtilityMethods();
                SessionHelper objSession = new SessionHelper();
                ////UserRolesList roleList = new UserRolesList();
                ////string xmlcandidateslist = string.Empty;
                objDashboardDetail.AtteandanceUpdateCandiadatelist = atteandanceupdateCandiadatelist;
                objDashboardDetail.SessionId = objUtil.SessionDetail.SessionId;
                objDashBoardClient.UpdateCandidateAttendanceTracker(objDashboardDetail);
            }
            catch (Exception)
            {
                ////ErrorLogger logger = new ErrorLogger(sessionId);
                ////logger.LogError(ex);
                throw;
            }
            finally
            {
                objDashBoardClient.Abort();
            }

            return null;
        }

        #endregion

        #region ECM
        /// <summary>
        /// 298589: Method to get downloaded url
        /// </summary>
        /// <param name="sessionId">session id</param>
        /// <param name="ecmDocumentName">document name</param>
        /// <returns>object File URL Result</returns>
        [WebMethod(BufferResponse = true, Description = "Gets the url of the document", EnableSession = true)]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1055:UriReturnValuesShouldNotBeStrings", Justification = "Reviewed.")]
        public static string GetDocumentUrl(long sessionId, string ecmDocumentName)
        {
            ECMSharedServicesLib.ECMCommon.ECMFileURLResult objFileURLResult = new ECMSharedServicesLib.ECMCommon.ECMFileURLResult();
            ECMSharedServicesLib.ECMSharedServices objECMSharedServices;

            if (System.Configuration.ConfigurationManager.AppSettings["IsECMSSOEnabled"].ToString().ToLower() == "false")
            {
                ////Initializing credentials
                objECMSharedServices = new ECMSharedServicesLib.ECMSharedServices(System.Configuration.ConfigurationManager.AppSettings["ecmUserName"].ToString(), System.Configuration.ConfigurationManager.AppSettings["ecmPassword"].ToString());
            }
            else
            {
                objECMSharedServices = new ECMSharedServicesLib.ECMSharedServices();
            }

            try
            {
                int appId = Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings["AppId"]);
                string logonUser = HttpContext.Current.User.Identity.Name;

                objFileURLResult = objECMSharedServices.GetNativeFileURL(ecmDocumentName, 0, appId, true, false, logonUser); ////passing it with ContentID and validating URL  
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }

            if (string.IsNullOrEmpty(objFileURLResult.AppFileDownloadURL))
            {
                objFileURLResult.AppFileDownloadURL = string.Empty;
            }

            return objFileURLResult.AppFileDownloadURL;
        }

        /// <summary>
        /// 298589: method to Save uploaded values to database
        /// </summary>
        /// <param name="candidateId">candidate id</param>
        /// <param name="sessionId">session id</param>
        /// <param name="documentId">document id</param>
        /// <param name="ecmDocumenName">document name</param>
        /// <param name="candidateBgvComponentDetailKey">candidate component detail key</param>
        /// <param name="statusFlag">status flag</param>
        /// <param name="responseMessage">response message</param>
        /// <param name="responseCode">response code</param>
        /// <param name="fileName">file name</param>
        /// <param name="fileType">file type</param>
        /// <param name="mode">for mode</param>
        /// <param name="webFormMode">webForm Mode</param>
        /// <param name="saveMode">save mode</param>
        /// <returns>returns status</returns>
        [WebMethod]
        public static int SaveUploadedDocName(long candidateId, long sessionId, int documentId, string ecmDocumenName, long candidateBgvComponentDetailKey, int statusFlag, string responseMessage, int responseCode, string fileName, string fileType, int mode, int webFormMode, int saveMode)
        {
            int retStatus = 0;
            ECMDocument objEcmDocumentName = new ECMDocument();
            objEcmDocumentName.CandidateId = candidateId;
            objEcmDocumentName.SessionId = sessionId;
            objEcmDocumentName.DocumentId = documentId;
            objEcmDocumentName.ECMDocumentName = ecmDocumenName;
            objEcmDocumentName.CandidateBgvComponentDetailKey = candidateBgvComponentDetailKey;
            objEcmDocumentName.StatusFlag = statusFlag;
            objEcmDocumentName.ResponseMessage = responseMessage;
            objEcmDocumentName.ResponseCode = responseCode;
            objEcmDocumentName.Filename = fileName;
            objEcmDocumentName.FileType = fileType;
            objEcmDocumentName.Mode = mode;
            objEcmDocumentName.WebFormMode = webFormMode;
            objEcmDocumentName.SaveMode = saveMode;
            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new OBUtilityMethodsClient();
            try
            {
                clntUtility.Open();
                retStatus = clntUtility.SaveUploadedDocName(objEcmDocumentName);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion
            return retStatus;
        }
        #endregion

        #region BGV Web Methods
        ////[SuppressMessage("StyleCop.CSharp.DocumentationRules", "SA1650:ElementDocumentationMustBeSpelledCorrectly", Justification = "Reviewed.")]

        /// <summary>
        /// 249510: Method to validate the content of CIS before save or submit
        /// </summary>
        /// <param name="sessionId">session id</param>
        /// <param name="candidateId">candidate Id</param>
        /// <param name="cisDataXML">CIS Data XML</param>
        /// <param name="isCisSaved">is CIS Saved</param>
        /// <param name="isCisLocked">is CIS Locked</param>
        /// <param name="roleGroupId">role Group Id</param>
        /// <returns>returns ret Validation Status</returns>
        [WebMethod(BufferResponse = true, Description = "Validates the content of cis before saving", EnableSession = true)]
        public static string ValidateCisContent(long sessionId, long candidateId, string cisDataXML, int isCisSaved, int isCisLocked, int roleGroupId)
        {
            string retValidationStatus = string.Empty;
            ////SaveTaskDCSource objsrc = new SaveTaskDCSource();
            SaveCisDC objvalidation = new SaveCisDC();
            objvalidation.SessionId = sessionId;
            objvalidation.CandidateId = candidateId;
            objvalidation.IsCisSaved = isCisSaved;
            objvalidation.IsCisLocked = isCisLocked;
            objvalidation.RoleGroupId = roleGroupId;
            XmlDocument docData = (XmlDocument)JsonConvert.DeserializeXmlNode(cisDataXML);
            objvalidation.CisDataXML = docData.InnerXml;
            docData = null;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new CandidateServicesClient();
            try
            {
                clntUtility.Open();
                objvalidation = clntUtility.ValidateCisContent(objvalidation);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            retValidationStatus = JsonConvert.SerializeObject(objvalidation);

            return retValidationStatus;
        }

        /// <summary>
        /// Method to save candidate component information
        /// </summary>
        /// <param name="sessionId">session id</param>
        /// <param name="candidateId">candidate id</param>
        /// <param name="dashboardMode">dashboard mode</param>
        /// <param name="roleGroupId">role group id</param>
        /// <param name="componentType"> component type</param>
        /// <param name="xmlRootNode"> xml root node </param>
        /// <param name="componentData"> component data </param>
        /// <param name="docListXml"> doc list xml </param>
        /// <param name="saveMode">save mode</param>
        /// <returns>validation message</returns>
        [WebMethod(BufferResponse = true, Description = "Gets Candidate Component data data need for this operation", EnableSession = true)]
        public static string SaveCandidateComponentData(long sessionId, long candidateId, int dashboardMode, int roleGroupId, int componentType, string xmlRootNode, string componentData, string docListXml, int saveMode)
        {
            string retValidationMessage = string.Empty;
            SaveCisDC objComponent = new SaveCisDC();
            XmlDocument doc = (XmlDocument)JsonConvert.DeserializeXmlNode(docListXml); ////, rootElementName);
            objComponent.CisDocumentListXml = doc.InnerXml;
            doc = null;
            objComponent.CandidateId = candidateId;
            objComponent.SessionId = sessionId;
            objComponent.ComponentType = componentType;
            ////  objComponent.CisDocumentListXml = docListXml;
            objComponent.RoleGroupId = roleGroupId;
            objComponent.DashboardMode = dashboardMode;
            objComponent.SaveMode = saveMode;

            if (componentData != null)
            {
                XmlDocument docCisComponentData = (XmlDocument)JsonConvert.DeserializeXmlNode(componentData, xmlRootNode);
                objComponent.CisComponentData = docCisComponentData.InnerXml;
                docCisComponentData = null;
            }

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new CandidateServicesClient();
            try
            {
                clntUtility.Open();
                objComponent = clntUtility.SaveCandidateComponentData(objComponent);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            retValidationMessage = JsonConvert.SerializeObject(objComponent);
            return retValidationMessage;
        }

        /// <summary>       
        /// 249510: Method to validate the content of CIS before save or submit
        /// </summary>
        /// <param name="sessionId">session id</param>
        /// <param name="candidateId">candidate id</param>
        /// <param name="cisDataXML">data xml</param>
        /// <param name="roleGroupId">role group id</param>
        /// <param name="isCisLocked">is locked</param>
        /// <param name="dashboardMode">dashboard mode</param>
        /// <param name="mode">for mode</param>
        /// <returns>returns validation status</returns>
        [WebMethod(BufferResponse = true, Description = "Validates the content of cis before saving", EnableSession = true)]
        public static string ValidateComponentData(long sessionId, long candidateId, string cisDataXML, int roleGroupId, int isCisLocked, int dashboardMode, int mode)
        {
            string retValidationStatus = string.Empty;
            ////SaveTaskDCSource objsrc = new SaveTaskDCSource();
            SaveCisDC objvalidation = new SaveCisDC();
            objvalidation.SessionId = sessionId;
            objvalidation.CandidateId = candidateId;
            objvalidation.RoleGroupId = roleGroupId;
            objvalidation.IsCisLocked = isCisLocked;
            objvalidation.DashboardMode = dashboardMode;
            objvalidation.Mode = mode;

            XmlDocument docData = (XmlDocument)JsonConvert.DeserializeXmlNode(cisDataXML);
            objvalidation.CisDataXML = docData.InnerXml;
            docData = null;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new CandidateServicesClient();
            try
            {
                clntUtility.Open();
                objvalidation = clntUtility.ValidateComponentData(objvalidation);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            retValidationStatus = JsonConvert.SerializeObject(objvalidation);

            return retValidationStatus;
        }

        /// <summary>
        /// 208099: Method to get  Data
        /// </summary>
        /// <param name="sessionId">session id</param>
        /// <param name="candidateId">candidate id</param>
        /// <param name="countryId">country id</param>
        /// <param name="roleGroupId">role group id</param>
        /// <returns>returns string</returns>
        [WebMethod(BufferResponse = true, Description = "Gets task data need for this operation", EnableSession = true)]
        public static string GetCisData(long sessionId, long candidateId, int countryId, int roleGroupId)
        {
            BgvCandidateData objPrefill = new BgvCandidateData();
            objPrefill.SessionId = sessionId;
            objPrefill.CandidateId = candidateId;
            objPrefill.CountryId = countryId;
            objPrefill.TypeGroup = 1;
            objPrefill.SpMode = 1;
            objPrefill.RoleGroupId = roleGroupId;
            objPrefill.IsCisSaved = 0;
            objPrefill.IsCisSubmitted = 0;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                clntUtility.Open();
                objPrefill = clntUtility.GetCisData(objPrefill);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            ////#region Preparing JSON content

            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.LoadXml("<CisPersonalDataXML>" + objPrefill.CisPersonalDataXML + "</CisPersonalDataXML>");
            objPrefill.CisPersonalDataXML = JsonConvert.SerializeXmlNode(xmlDoc.SelectNodes("CisPersonalDataXML").Item(0), Newtonsoft.Json.Formatting.None, true);
            xmlDoc = new XmlDocument();
            xmlDoc.LoadXml("<CisPersonalDataLogXML>" + objPrefill.CisPersonalDataLogXML + "</CisPersonalDataLogXML>");
            objPrefill.CisPersonalDataLogXML = JsonConvert.SerializeXmlNode(xmlDoc.SelectNodes("CisPersonalDataLogXML").Item(0), Newtonsoft.Json.Formatting.None, true);
            xmlDoc = new XmlDocument();
            xmlDoc.LoadXml("<CisPrefillData>" + objPrefill.CisPrefillData + "</CisPrefillData>");
            objPrefill.CisPrefillData = JsonConvert.SerializeXmlNode(xmlDoc.SelectNodes("CisPrefillData").Item(0), Newtonsoft.Json.Formatting.None, true);
            xmlDoc = null;
            string strJSON = string.Empty;
            strJSON = JsonConvert.SerializeObject(objPrefill);

            ////#endregion

            return strJSON;
        }

        /// <summary>
        /// 313248: Method to Get Component List
        /// </summary>
        /// <param name="sessionId">session Id</param>
        /// <param name="candidateId">candidate id</param>
        /// <param name="countryId">country id</param>
        /// <param name="typeGroupId">group id</param>
        /// <returns name="strJSON">task data</returns>
        [WebMethod(BufferResponse = true, Description = "Gets task data need for this operation", EnableSession = true)]
        public static string GetComponentList(long sessionId, long candidateId, int countryId, int typeGroupId)
        {
            BgvCandidateData objComponentData = new BgvCandidateData();

            objComponentData.TypeGroup = typeGroupId;
            objComponentData.SessionId = sessionId;
            objComponentData.CountryId = countryId;
            objComponentData.CandidateId = candidateId;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                clntUtility.Open();
                objComponentData = clntUtility.GetComponentList(objComponentData);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            ////#region Preparing JSON content

            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.LoadXml("<CisEduData>" + objComponentData.CisEduDataXML + "</CisEduData>");
            objComponentData.CisEduDataXML = JsonConvert.SerializeXmlNode(xmlDoc.SelectNodes("CisEduData").Item(0), Newtonsoft.Json.Formatting.None, true);
            xmlDoc = null;
            string strJSON = string.Empty;
            strJSON = JsonConvert.SerializeObject(objComponentData);

            ////#endregion

            return strJSON;
        }

        /// <summary>
        /// Method to get ComponentDetailId
        /// </summary>
        /// <param name="sessionId">session id</param>
        /// <param name="candidateId">candidate id</param>
        /// <param name="componentCode">component code</param>
        /// <returns name="BgvComponent">component list</returns>
        [WebMethod(BufferResponse = true, Description = "Gets Component detail id", EnableSession = true)]
        public static BgvComponent GetComponentDetailId(long sessionId, long candidateId, string componentCode)
        {
            BgvComponent objComponent = new BgvComponent();
            objComponent.CandidateId = candidateId;
            objComponent.SessionId = sessionId;
            objComponent.ComponentCode = componentCode;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new DashBoardServicesClient();
            try
            {
                clntUtility.Open();
                objComponent = clntUtility.GetComponentDetailId(objComponent);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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

            ////#endregion
            return objComponent;
        }

        /// <summary>
        /// Method to get CIS Component XML data
        /// </summary>
        /// <param name="sessionId">session id</param>
        /// <param name="candidateId">candidate Id </param>
        /// <param name="countryId">country Id </param>
        /// <param name="dashboardMode">dashboard Mode </param>
        /// <param name="componentType">component Type </param>
        /// <param name="componentDetailId">component Detail Id </param>
        /// <param name="xmlRootNode">XML Root Node </param>
        /// <returns>BGV Component </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", MessageId = "dashboardMode", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", Justification = "Reviewed.")]
        [WebMethod(BufferResponse = true, Description = "Gets Cis Component XML data need for this operation", EnableSession = true)]
        public static BgvComponent GetComponentConfig(long sessionId, long candidateId, int countryId, int dashboardMode, int componentType, int componentDetailId, string xmlRootNode)
        {
            BgvComponent objComponent = new BgvComponent();
            objComponent.CandidateId = candidateId;
            objComponent.SessionId = sessionId;
            objComponent.ComponentDetailId = componentDetailId;
            objComponent.CountryId = countryId;
            objComponent.ComponentType = componentType;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new DashBoardServicesClient();
            try
            {
                clntUtility.Open();
                objComponent = clntUtility.GetComponentConfig(objComponent);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            xmlRootNode = xmlRootNode.Trim();

            if (componentDetailId != 0)
            {
                XmlDocument xmlDoc = new XmlDocument();
                xmlDoc.LoadXml("<" + xmlRootNode + ">" + objComponent.XMLTemplate + "</" + xmlRootNode + ">");
                objComponent.XMLTemplate = JsonConvert.SerializeXmlNode(xmlDoc.SelectNodes(xmlRootNode).Item(0), Newtonsoft.Json.Formatting.None, true);
                ////objComponent.XMLTemplate = xmlDoc.InnerXml.ToString();
            }

            return objComponent;
        }

        /// <summary>
        /// Method to Get Suspect Status against Institution
        /// </summary>
        /// <param name="sessionId">session id</param>
        /// <param name="candidateId">candidate id</param>
        /// <param name="componentDetailId">component detail id</param>
        /// <param name="componentRunnerId">component runner id</param>
        /// <param name="institutionId">institutional id</param>
        /// <param name="suspectRaisedSession">suspect raised session</param>
        /// <returns>returns object institute</returns>
        [WebMethod(BufferResponse = true, Description = "Get Suspect Status against Institution", EnableSession = true)]
        public static InstitutionDC GetSuspectStatus(long sessionId, long candidateId, int componentDetailId, int componentRunnerId, int institutionId, long suspectRaisedSession)
        {
            InstitutionDC objInstitute = new InstitutionDC();
            BgvComponent objComponent = new BgvComponent();
            objComponent.CandidateId = candidateId;
            objComponent.SessionId = sessionId;
            objComponent.ComponentDetailId = componentDetailId;
            objComponent.RunnerId = componentRunnerId;
            objComponent.InstitutionId = institutionId;
            objComponent.SuspectRaisedSession = suspectRaisedSession;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new DashBoardServicesClient();
            try
            {
                clntUtility.Open();
                objInstitute = clntUtility.GetSuspectStatus(objComponent);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            return objInstitute;
        }

        /// <summary>
        /// Method to Gets Candidate Component data data need for this operation
        /// </summary>
        /// <param name="sessionId">session id</param>
        /// <param name="candidateId">candidate id</param>
        /// <param name="countryId">country id</param>
        /// <param name="dashboardMode">dashboard mode</param>
        /// <param name="componentType">component type</param>
        /// <param name="xmlRootNode">xml root node</param>
        /// <returns>returns component list</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", Justification = "Reviewed.")]
        [WebMethod(BufferResponse = true, Description = "Gets Candidate Component data data need for this operation", EnableSession = true)]
        public static BgvCandidateData GetCandidateComponentData(long sessionId, long candidateId, int countryId, int dashboardMode, int componentType, string xmlRootNode)
        {
            BgvCandidateData objComponent = new BgvCandidateData();
            objComponent.CandidateId = candidateId;
            objComponent.SessionId = sessionId;
            objComponent.CountryId = countryId;
            objComponent.ComponentType = componentType;
            objComponent.DashboardMode = dashboardMode;
            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new DashBoardServicesClient();
            try
            {
                clntUtility.Open();
                objComponent = clntUtility.GetCandidateComponentData(objComponent);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            xmlRootNode = xmlRootNode.Trim();
            if (!string.IsNullOrEmpty(objComponent.CisComponentData))
            {
                XmlDocument xmlDoc = new XmlDocument();
                xmlDoc.LoadXml(objComponent.CisComponentData);
                objComponent.CisComponentData = JsonConvert.SerializeXmlNode(xmlDoc.SelectNodes(xmlRootNode).Item(0), Newtonsoft.Json.Formatting.None, true);
                objComponent.CisComponentDataXML = xmlDoc.InnerXml.ToString();
            }

            if (!string.IsNullOrEmpty(objComponent.CisComponentDataLog))
            {
                XmlDocument xmlDoc = new XmlDocument();
                xmlDoc.LoadXml(objComponent.CisComponentDataLog);
                objComponent.CisComponentDataLog = JsonConvert.SerializeXmlNode(xmlDoc.SelectNodes(xmlRootNode).Item(0), Newtonsoft.Json.Formatting.None, true);
                objComponent.CisComponentDataLogXML = xmlDoc.InnerXml.ToString();
            }

            return objComponent;
        }

        /// <summary>
        /// 249510: Method to get Document List
        /// </summary>
        /// <param name="sessionId">Current session id</param>
        /// <param name="candidateId">CandidateId of logged in candidate</param>
        /// <param name="countryId">Candidate's country Name</param>
        /// <param name="componentDetailId">component detail id</param>
        /// <param name="componentRunnerId">Component runner id</param>
        /// <param name="institutionId">institution Id</param>
        /// <param name="mode">for mode</param>
        /// <returns>Returns string in JSON format</returns>
        [WebMethod(BufferResponse = true, Description = "Gets Document data need for this operation", EnableSession = true)]
        public static string GetDocumetDataXml(long sessionId, long candidateId, int countryId, int componentDetailId, int componentRunnerId, int institutionId, int mode)
        {
            BgvComponent objDocumentData = new BgvComponent();
            objDocumentData.SessionId = sessionId;
            objDocumentData.CandidateId = candidateId;
            objDocumentData.CountryId = countryId;
            objDocumentData.ComponentDetailId = componentDetailId;
            objDocumentData.InstitutionId = institutionId;
            objDocumentData.RunnerId = componentRunnerId;
            objDocumentData.Mode = mode;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                clntUtility.Open();
                objDocumentData = clntUtility.GetDocumetDataXml(objDocumentData);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion
            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.LoadXml(objDocumentData.XMLTemplate);
            objDocumentData.XMLTemplate = JsonConvert.SerializeXmlNode(xmlDoc.SelectNodes("DesignHtml").Item(0), Newtonsoft.Json.Formatting.None, true);
            xmlDoc = null;
            string strJSON = string.Empty;
            strJSON = JsonConvert.SerializeObject(objDocumentData.XMLTemplate);
            return strJSON;
            //// return objDocumentData;
        }

        /// <summary>
        /// Method to get page wise BGV notifications
        /// </summary>
        /// <param name="sessionId">Current session id</param>
        /// <param name="candidateId">Current candidate id</param>
        /// <param name="roleGroupId">Current role group id</param>
        /// <param name="bgvPageId">Current page id</param>
        /// <returns>returns object html to a string</returns>
        [WebMethod(BufferResponse = true, Description = "Gets notifications need to display in BGV pages", EnableSession = true)]
        public static string GetPageNotification(long sessionId, long candidateId, int roleGroupId, int bgvPageId)
        {
            BgvPageNotificationData objBgvPageNotificationData = new BgvPageNotificationData();
            //// MenuTabList objlist = new MenuTabList();
            //// MenuTabContent objTabContent = new MenuTabContent();
            objBgvPageNotificationData.SessionId = sessionId;
            objBgvPageNotificationData.CandidateId = candidateId;
            objBgvPageNotificationData.BgvPageId = bgvPageId;
            objBgvPageNotificationData.RoleGroupId = roleGroupId;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                clntUtility.Open();
                objBgvPageNotificationData = clntUtility.GetPageNotification(objBgvPageNotificationData);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            StringBuilder objHtml = new StringBuilder();
            foreach (BgvPageNotification objPageNotification in objBgvPageNotificationData.BgvPageNoticationList)
            {
                objHtml.Append("<li style='list-style-type:disc;'>" + objPageNotification.Message + "</li>");
            }

            return objHtml.ToString();
        }

        /// <summary>
        /// 249510: Method to get BGV URL
        /// </summary>
        /// <param name="sessionId">Current session id</param>
        /// <param name="candidateId">Current candidate Id</param>
        /// <param name="countryId">Current country Id</param>
        /// <param name="roleGroupId">Current role Group Id</param>
        /// <returns>tab list</returns>
        [WebMethod(BufferResponse = true, Description = "Gets URL based on role", EnableSession = true)]
        public static ArrayList GetURLforRole(long sessionId, long candidateId, int countryId, int roleGroupId)
        {
            ArrayList retTabList = new ArrayList();
            BgvCandidateData objComponentData = new BgvCandidateData();
            MenuTabList objlist = new MenuTabList();
            //// MenuTabContent objTabContent = new MenuTabContent();
            objComponentData.SessionId = sessionId;
            objComponentData.CandidateId = candidateId;
            objComponentData.CountryId = countryId;
            objComponentData.RoleGroupId = roleGroupId;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                clntUtility.Open();
                objComponentData = clntUtility.GetURLforRole(objComponentData);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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

            ////#endregion

            objlist = objComponentData.MenuTab;

            foreach (MenuTabContent ml in objlist)
            {
                retTabList.Add(new { MenuName = ml.MenuName, Url = ml.PageUrl, IsAllowed = ml.IsUrlAllowed, IsBgvEnabled = ml.IsBgvEnabled, CurrentPage = ml.CurrentPage });
            }

            return retTabList;
        }

        /// <summary>
        /// 249510: Method to get relevant Experience for candidate
        /// </summary>
        /// <param name="sessionId">session Id</param>
        /// <param name="candidateId">candidate Id</param>
        /// <param name="countryId">country Id</param>
        /// <returns>object data</returns>
        [WebMethod(BufferResponse = true, Description = "Gets relevant Experience for candidate", EnableSession = true)]
        public static BgvCandidateData GetRelevantExpInfo(long sessionId, long candidateId, int countryId)
        {
            BgvCandidateData objData = new BgvCandidateData();
            objData.CandidateId = candidateId;
            objData.CountryId = countryId;
            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                clntUtility.Open();
                objData = clntUtility.GetRelevantExpInfo(objData);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            return objData;
        }

        /// <summary>
        /// 313248: Method to get Document List
        /// </summary>
        /// <param name="sessionId">session Id</param>
        /// <param name="candidateId">candidate Id</param>
        /// <param name="roleGroupId">role Group Id</param>
        /// <returns>returns string of JSON format</returns>
        [WebMethod(BufferResponse = true, Description = "Gets Document list for candidate", EnableSession = true)]
        public static string GetDocumentList(long sessionId, long candidateId, int roleGroupId)
        {
            BgvCandidateData objComponentData = new BgvCandidateData();
            BGVDocumentUploadDetail objDocumentdata = new BGVDocumentUploadDetail();
            ////UtilityMethods objUtil = new UtilityMethods();

            objComponentData.SessionId = sessionId;
            objComponentData.CandidateId = candidateId;
            objComponentData.SpMode = 0;
            objComponentData.RoleGroupId = roleGroupId;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                clntUtility.Open();
                objDocumentdata = clntUtility.GetDocumentList(objComponentData);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            ////#region Preparing JSON content
            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc = new XmlDocument();
            xmlDoc.LoadXml(objDocumentdata.HtmlContent);
            objDocumentdata.HtmlContent = JsonConvert.SerializeXmlNode(xmlDoc.SelectNodes("DesignHtml").Item(0), Newtonsoft.Json.Formatting.None, true);
            xmlDoc = null;
            string strJSON = string.Empty;
            strJSON = JsonConvert.SerializeObject(objDocumentdata);
            ////#endregion

            return strJSON;
        }

        /// <summary>
        /// 298589: Method to update the status of the uploaded document
        /// </summary>
        /// <param name="sessionId">session Id</param>
        /// <param name="candidateId">candidate Id</param>
        /// <param name="response">for response</param>
        /// <param name="comment">for comment</param>
        /// <param name="mode">for mode</param>
        /// <param name="documentMatrixId">document Matrix Id</param>
        /// <param name="candidateBgvComponentDetail">candidate BGV Component Detail</param>
        /// <param name="roleGroupId">role Group Id</param>
        /// <param name="notificationMappingId">notification Mapping Id</param>
        /// <returns>returns data</returns>
        [WebMethod(BufferResponse = true, Description = "Approve or Reject the uploaded document", EnableSession = true)]
        public static ArrayList DocumentApprovalStatus(long sessionId, long candidateId, int response, string comment, int mode, int documentMatrixId, long candidateBgvComponentDetail, int roleGroupId, long notificationMappingId)
        {
            ArrayList data = new ArrayList();
            DocumentApprovalStatusDC objApprovalStatus = new DocumentApprovalStatusDC();

            objApprovalStatus.CandidateId = candidateId;
            objApprovalStatus.Response = response;
            objApprovalStatus.Comment = comment;
            objApprovalStatus.Mode = mode;
            objApprovalStatus.SessionId = sessionId;
            objApprovalStatus.DocumentMatrixId = documentMatrixId;
            objApprovalStatus.CandidateBgvComponentDetail = candidateBgvComponentDetail;
            objApprovalStatus.RoleGroupId = roleGroupId;
            objApprovalStatus.NotificationMappingId = notificationMappingId;
            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new DashBoardServicesClient();
            try
            {
                clntUtility.Open();
                objApprovalStatus = clntUtility.DocumentApprovalStatus(objApprovalStatus);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            data.Add(new { VendorEnabled = objApprovalStatus.VendorEnabled, BgvSpecStatus = objApprovalStatus.BGvSpecStatus, MandatoryApproved = objApprovalStatus.MandatoryApproved, RequestDoc = objApprovalStatus.RequestDoc, StatusTxt = objApprovalStatus.StatusTxt, DocumentStatus = objApprovalStatus.DocumentStatus, ApprovalStatus = objApprovalStatus.ApprovalStatus, Upload = objApprovalStatus.Upload, DocView = objApprovalStatus.DocView, Approve = objApprovalStatus.Approve, Reject = objApprovalStatus.Reject, MandatoryDocUpload = objApprovalStatus.MandatoryDocUploaded, CisDocDataFlag = objApprovalStatus.CisDocDataFlag, ECMDocumentName = objApprovalStatus.ECMDocumentName, Url = objApprovalStatus.Url, CisStatus = objApprovalStatus.CisStatus, SubmitBtnEnabled = objApprovalStatus.SubmitBtnEnabled, ApprovalBtnEnable = objApprovalStatus.ApprovalBtnEnable, MandatoryAlert = objApprovalStatus.MandatoryAlert, DocUploadedTS = objApprovalStatus.DocUploadedTS, InfoMsg = objApprovalStatus.InfoMsg });
            return data;
        }

        /// <summary>
        /// 298589:Method to Get BackPaper for the Candidate
        /// </summary>
        /// <param name="sessionId">session Id</param>
        /// <param name="candidateId">candidate Id</param>
        /// <returns>returning string which is of JSON format</returns>
        [WebMethod(BufferResponse = true, Description = "Gets BackPaper for the Candidate", EnableSession = true)]
        public static string GetBackPapers(long sessionId, long candidateId)
        {
            BgvCandidateData objComponentData = new BgvCandidateData();
            BGVDocumentUploadDetail objDocumentdata = new BGVDocumentUploadDetail();
            ////UtilityMethods objUtil = new UtilityMethods();
            objComponentData.SessionId = sessionId;
            objComponentData.CandidateId = candidateId;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                clntUtility.Open();
                objDocumentdata = clntUtility.GetBackPapers(objComponentData);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            ////#region Preparing JSON content

            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc = new XmlDocument();
            xmlDoc.LoadXml(objDocumentdata.HtmlContent);
            objDocumentdata.HtmlContent = JsonConvert.SerializeXmlNode(xmlDoc.SelectNodes("DesignHtml").Item(0), Newtonsoft.Json.Formatting.None, true);
            xmlDoc = null;
            string strJSON = string.Empty;
            strJSON = JsonConvert.SerializeObject(objDocumentdata);
            ////#endregion

            return strJSON;
        }

        /// <summary>
        /// 298589: Method to Save Back Papers
        /// </summary>
        /// <param name="candidateId">candidate Id</param>
        /// <param name="sessionId">session Id</param>
        /// <param name="documentMatrixid">document Matrix id</param>
        /// <param name="candidateBgvComponentDetail">candidate BGV Component Detail</param>
        /// <param name="manDocConfig">Man Document Config</param>
        /// <returns>returns data</returns>
        [WebMethod]
        public static ArrayList SaveBackPapers(long candidateId, long sessionId, int documentMatrixid, long candidateBgvComponentDetail, string manDocConfig)
        {
            int spmode;
            ArrayList data = new ArrayList();
            DocumentApprovalStatusDC objApprovalStatus = new DocumentApprovalStatusDC();
            if (!string.IsNullOrEmpty(manDocConfig))
            {
                spmode = 2;
                XmlDocument manDocConfigXML = (XmlDocument)JsonConvert.DeserializeXmlNode(manDocConfig); ////, rootElementName);
                objApprovalStatus.ManDocConfigXML = manDocConfigXML.InnerXml;
                manDocConfigXML = null;
            }
            else
            {
                spmode = 1;
                objApprovalStatus.ManDocConfigXML = null;
            }

            objApprovalStatus.CandidateId = candidateId;
            objApprovalStatus.SessionId = sessionId;
            objApprovalStatus.Mode = spmode;
            objApprovalStatus.DocumentMatrixId = documentMatrixid;
            objApprovalStatus.CandidateBgvComponentDetail = candidateBgvComponentDetail;
            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new DashBoardServicesClient();
            try
            {
                clntUtility.Open();
                objApprovalStatus = clntUtility.SaveBackPapers(objApprovalStatus);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            data.Add(new { objApprovalStatus.ECMDocumentName, objApprovalStatus.Url });
            return data;
        }

        /// <summary>
        /// 249510: Method to save CIS content
        /// </summary>
        /// <param name="sessionId">session Id</param>
        /// <param name="candidateId">candidate Id</param>
        /// <param name="cisPersonalData">Personal Data</param>
        /// <param name="saveMode">save Mode</param>
        /// <param name="isCisLocked">is CIS Locked</param>
        /// <param name="roleGroupId">role Group Id</param>
        /// <returns>returns status</returns>
        [WebMethod(BufferResponse = false, Description = "Saves the content of bgv info to DB", EnableSession = true)]
        public static int SaveCisData(long sessionId, long candidateId, string cisPersonalData, int saveMode, int isCisLocked, int roleGroupId)
        {
            int retStatus = 0;
            SaveCisDC objsave = new SaveCisDC();
            objsave.CandidateId = candidateId;
            objsave.SpMode = 2;
            objsave.RoleGroupId = roleGroupId;

            if (cisPersonalData != null)
            {
                XmlDocument docCisPersonalData = (XmlDocument)JsonConvert.DeserializeXmlNode(cisPersonalData);
                objsave.CisPersonalDataXML = docCisPersonalData.InnerXml;
                docCisPersonalData = null;
            }

            objsave.CisStatus = saveMode;
            objsave.SessionId = sessionId;

            if (saveMode == 0)
            {
                objsave.IsCisSaved = 1;
            }
            else
            {
                objsave.IsCisSaved = 0;
            }

            if (saveMode == 1)
            {
                objsave.IsCisSubmitted = 1;
            }
            else
            {
                objsave.IsCisSubmitted = 0;
            }

            objsave.IsCisLocked = isCisLocked;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new CandidateServicesClient();
            try
            {
                clntUtility.Open();
                retStatus = clntUtility.SaveCisData(objsave);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            return retStatus;
        }

        /// <summary>
        /// 249510 :Method to Get the Employment Name filter value
        /// </summary>
        /// <param name="val">for value</param>
        /// <param name="typeGroup">type group</param>
        /// <returns>returns data</returns>
        [WebMethod(BufferResponse = false, Description = "Getting the Employment Name filter value", EnableSession = true)]
        public static ArrayList EmploymentNameAutoSearch(string val, int typeGroup)
        {
            try
            {
                ArrayList data = new ArrayList();
                InstitutionList objList = new InstitutionList();
                ////InstitutionDC objContent = new InstitutionDC();
                BgvCandidateData objCompanyName = new BgvCandidateData();
                objCompanyName.ItemName = val;
                objCompanyName.TypeGroup = typeGroup;

                ////#region Service call
                ////Creating new client to get message from DB

                var clntUtility = new DashBoardServicesClient();
                clntUtility.Open();
                objCompanyName = clntUtility.EmploymentNameAutoSearch(objCompanyName);
                clntUtility.Close();

                ////#endregion
                objList = objCompanyName.InstitutionList;
                if (objList != null)
                {
                    foreach (InstitutionDC ls in objList)
                    {
                        data.Add(new { ItemId = ls.InstitutionId, ItemName = ls.InstitutionName });
                    }
                }

                return data;
            }
            catch (Exception)
            {
                throw;
            }
        }

        ////[SuppressMessage("StyleCop.CSharp.DocumentationRules", "SA1650:ElementDocumentationMustBeSpelledCorrectly", Justification = "Reviewed.")]

        /// <summary>
        /// Method to get the BGV status lists
        /// </summary>
        /// <param name="sessionId">session Id</param>
        /// <param name="candidateId">candidate Id</param>
        /// <returns>object NH dashboard data</returns>
        [WebMethod(BufferResponse = true, Description = "Gets the basic bgv status lists", EnableSession = true)]
        public static BgvNHDashboardData GetNHDashboardBgvStatus(long sessionId, long candidateId)
        {
            BgvNHDashboardData objNHDashboardData = new BgvNHDashboardData();
            objNHDashboardData.SessionId = sessionId;
            objNHDashboardData.CandidateId = candidateId;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new Service.CandidateServices.CandidateServicesClient();
            try
            {
                clntUtility.Open();
                objNHDashboardData = clntUtility.GetNHDashboardBgvStatus(objNHDashboardData);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            return objNHDashboardData;
        }

        /// <summary>
        /// Method to update Is suspect mail status in Database
        /// </summary>
        /// <param name="sessionId">session Id</param>
        /// <param name="candidateId">candidate Id</param>
        /// <returns>returns status</returns>
        [WebMethod]
        public static int UpdateSuspectStatus(long sessionId, long candidateId)
        {
            int retStatus = 0;
            try
            {
                BgvCandidateData objDocument = new BgvCandidateData();
                objDocument.SessionId = sessionId;
                objDocument.CandidateId = candidateId;
                ////#region Service call
                ////Creating new client to get message from DB
                var clntUtility = new DashBoardServicesClient();
                try
                {
                    clntUtility.Open();
                    retStatus = clntUtility.UpdateSuspectStatus(objDocument);
                    //// clntUtility.Close(); //// already closed in final block
                }
                catch (Exception ex)
                {
                    ErrorLogger logger = new ErrorLogger(sessionId);
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

                return retStatus;
                ////#endregion
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// 249510: BPNOGO 
        /// </summary>
        /// <param name="candidateId">candidate Id</param>
        /// <param name="sessionId">session Id</param>
        /// <param name="bpnoGoFlag">BP No Go Flag</param>
        /// <param name="dashboardMode">dashboard Mode</param>
        /// <param name="roleGroupId">role Group Id</param>
        /// <param name="bpnoGoComments">BP No Go Comments</param>
        /// <returns>returns status</returns>
        [WebMethod]
        public static int SaveBpNoGo(long candidateId, long sessionId, int bpnoGoFlag, int dashboardMode, int roleGroupId, string bpnoGoComments)
        {
            int retStatus = 0;
            SaveCisDC objsave = new SaveCisDC();
            objsave.CandidateId = candidateId;
            objsave.SessionId = sessionId;
            objsave.BpNoGoFlag = bpnoGoFlag;
            objsave.DashboardMode = dashboardMode;
            objsave.RoleGroupId = roleGroupId;
            objsave.BpNoGoComments = bpnoGoComments;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new CandidateServicesClient();
            try
            {
                clntUtility.Open();
                retStatus = clntUtility.SaveBpNoGo(objsave);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            return retStatus;
        }

        /// <summary>
        /// 249510: BPNOGO pending document count calculation 
        /// </summary>
        /// <param name="candidateId">candidate Id</param>
        /// <param name="sessionId">session Id</param>
        /// <param name="cisStatus">CIS Status</param>
        /// <param name="dashboardMode">dashboard Mode</param>
        /// <param name="roleGroupId">role Group Id</param>
        /// <returns>returns status</returns>
        [WebMethod]
        public static int PendingBackPaperCount(long candidateId, long sessionId, int cisStatus, int dashboardMode, int roleGroupId)
        {
            int retStatus = 0;
            SaveCisDC objsave = new SaveCisDC();
            objsave.CandidateId = candidateId;
            objsave.SessionId = sessionId;
            objsave.CisStatus = cisStatus;
            objsave.DashboardMode = dashboardMode;
            objsave.RoleGroupId = roleGroupId;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new CandidateServicesClient();
            try
            {
                clntUtility.Open();
                retStatus = clntUtility.PendingBackPaperCount(objsave);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            return retStatus;
        }
        #endregion

        #region MailContent

        /// <summary>
        /// Method to get mail content
        /// </summary>
        /// <param name="candidateId">candidate Id</param>
        /// <param name="notificationMappingId">notification Mapping Id</param>
        /// <param name="sessionId">session Id</param>
        /// <returns>returns string of JSON format</returns>
        [WebMethod(BufferResponse = true, Description = "get mail content", EnableSession = true)]
        public static string GetEventMailContent(long candidateId, int notificationMappingId, long sessionId)
        {
            GetMailContent objGetMailContent = new GetMailContent();
            objGetMailContent.CandidateId = candidateId;
            objGetMailContent.NotificationMappingId = notificationMappingId;
            objGetMailContent.SessionId = sessionId;
            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new OBUtilityMethodsClient();
            try
            {
                clntUtility.Open();
                objGetMailContent = clntUtility.GetEventMailContent(objGetMailContent);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            ////#region Logging Event Data
            ////Getting html content for notification based on event
            string comment = "Getting html content for notification based on event";
            LogEventData(sessionId, candidateId, notificationMappingId, "Get event html content", "GetEventMailContent", objGetMailContent.NotificationMappingId.ToString(), true, comment);
            ////#endregion
            string strJSON = string.Empty;
            strJSON = JsonConvert.SerializeObject(objGetMailContent);
            return strJSON;
        }

        #endregion MailContent

        #region Role Service Methods

        /// <summary>
        /// Method to Get Page Menu Mappings
        /// </summary>
        /// <param name="sessionId">session Id</param>
        /// <param name="roleId">notification Mapping Id</param>
        /// <param name="countryId">country Id</param>
        /// <param name="basePageId">base Page Id</param>
        /// <returns>menu Html</returns>
        [WebMethod(BufferResponse = true, Description = "Method which gets the menu which are mapped to current page", EnableSession = true)]
        public static object GetPageMenuMappings(long sessionId, int roleId, int countryId, int basePageId)
        {
            PageMenuMappingContainer objPageMenuContainer = new PageMenuMappingContainer();
            PageMenuMappingContract objPageMenuMappingContract = new PageMenuMappingContract();
            objPageMenuMappingContract.SessionId = sessionId;
            objPageMenuMappingContract.RoleId = roleId;
            objPageMenuMappingContract.CountryId = countryId;
            objPageMenuMappingContract.BasePageId = basePageId;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new Service.OBUtilityMethods.OBUtilityMethodsClient();
            try
            {
                SessionDetails sessionDetail = new SessionDetails();
                sessionDetail.SessionId = sessionId;
                clntUtility.Open();
                objPageMenuContainer = clntUtility.GetPageMenuMappings(objPageMenuMappingContract);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            ////creating menu html
            int menuCount = 0;
            StringBuilder menuHtml = new StringBuilder();
            if (objPageMenuContainer != null && objPageMenuContainer.PageMenuMappings != null && objPageMenuContainer.PageMenuMappings.Count > 0)
            {
                menuCount = objPageMenuContainer.PageMenuMappings.Count;
                if (menuCount > 0)
                {
                    menuHtml.Append("<div class='menu_bg_left'></div>");
                    foreach (PageMenuMapping objMenu in objPageMenuContainer.PageMenuMappings)
                    {
                        menuHtml.Append("<a href='#' id='" + basePageId.ToString() + "M" + objMenu.MenuId.ToString() + "' navigateTo='" + objMenu.PageUrl + "' onclick='" + objMenu.EventOnClick + "' title='" + objMenu.MenuToolTip + "' class='" + objMenu.CssClass + "'>" + objMenu.MenuName + "</a>");
                    }

                    menuHtml.Append("<div class='menu_bg_right'></div>");
                }
            }

            return new { MenuHtml = menuHtml.ToString(), MenuCount = menuCount };
        }

        #endregion

        #region Assign Roles
        /// <summary>
        /// 312020:method to set Role to Associate
        /// </summary>
        /// <param name="sessionId">session Id</param>
        /// <param name="associateId">associate Id</param>
        /// <param name="associateName">associate Name</param>
        /// <param name="roleId">role Id</param>
        /// <param name="roleName">role Name</param>
        /// <param name="portFolio">for portFolio</param>
        /// <param name="countryname">country name</param>
        /// <param name="activeStatus">active Status</param>
        /// <returns>returns status</returns>
        [WebMethod(BufferResponse = true, Description = "Set Role To Associate", EnableSession = true)]
        public static int SetRoleToAssociate(long sessionId, long associateId, string associateName, string roleId, string roleName, string portFolio, string countryname, int activeStatus)
        {
            ////UserRolesAccessContainer objcontainer = new UserRolesAccessContainer();
            RoleAccessDC objRoleAccessDC = new RoleAccessDC();

            objRoleAccessDC.SessionId = sessionId;
            objRoleAccessDC.RoleDetailId = roleId;
            objRoleAccessDC.RoleName = roleName;
            objRoleAccessDC.PortFolio = portFolio;
            objRoleAccessDC.ActiveStatus = Convert.ToInt16(activeStatus);
            objRoleAccessDC.AssociateId = associateId;
            objRoleAccessDC.CountryName = countryname;
            objRoleAccessDC.AssociateName = associateName;
            var clntUtility = new OBUtilityMethodsClient();
            int status = 0;
            try
            {
                clntUtility.Open();

                status = clntUtility.SetRoleToAssociate(objRoleAccessDC);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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

            return status;
        }

        #endregion

        #region HTransfer Methods
        /// <summary>
        /// 261671: Method to get HTransfer Document List
        /// </summary>
        /// <param name="sessionId">session Id</param>
        /// <param name="candidateId">candidate Id</param>
        /// <param name="spmode">SP mode</param>
        /// <param name="roleGroupId">role Group Id</param>
        /// <returns>returns string of JSON format</returns>
        [WebMethod(BufferResponse = true, Description = "Gets HTransfer Document list for candidate", EnableSession = true)]
        public static string GetUploadDocumentList(long sessionId, long candidateId, int spmode, int roleGroupId)
        {
            HTransferCandidateData objCandidateData = new HTransferCandidateData();
            HTransferDocumentUploadDetail objDocumentdata = new HTransferDocumentUploadDetail();
            ////UtilityMethods objUtil = new UtilityMethods();
            objCandidateData.SessionId = sessionId;
            objCandidateData.CandidateId = candidateId;
            objCandidateData.SpMode = spmode;
            objCandidateData.RoleGroupId = roleGroupId;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                clntUtility.Open();
                objDocumentdata = clntUtility.GetUploadDocumentList(objCandidateData);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            ////#region Preparing JSON content
            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc = new XmlDocument();
            xmlDoc.LoadXml(objDocumentdata.HtmlContent);
            objDocumentdata.HtmlContent = JsonConvert.SerializeXmlNode(xmlDoc.SelectNodes("DesignHtml").Item(0), Newtonsoft.Json.Formatting.None, true);
            xmlDoc = null;
            string strJSON = string.Empty;
            strJSON = JsonConvert.SerializeObject(objDocumentdata);
            ////#endregion

            return strJSON;
        }

        ////[SuppressMessage("StyleCop.CSharp.DocumentationRules", "SA1650:ElementDocumentationMustBeSpelledCorrectly", Justification = "Reviewed.")]

        /// <summary>
        /// 261671: Method to insert or delete the HTransfer Document after clicking on Add document or Remove Document
        /// </summary>
        /// <param name="sessionId">session Id</param>
        /// <param name="candidateId">candidate Id</param>
        /// <param name="documentId">role Group Id</param>
        /// <param name="spmode">document Id</param>
        /// <param name="roleGroupId">SP Mode</param>
        ///  <param name="docPkId">doc Primary key Id</param>
        /// <param name="ynflag">YN Flag</param>
        /// <param name="questionGroupId">QuestionGroup Id</param>
        /// <returns name="HTransferCandidateDocInfo">HTransferCandidateDoc Info</returns>      
        [WebMethod(BufferResponse = true, Description = "insert or delete the HTransfer Document after clicking on Add document or Remove Document", EnableSession = true)]
        public static HTransferCandidateDocInfo InsertDeleteDocument(long sessionId, long candidateId, int documentId, int spmode, int roleGroupId, string docPkId, int ynflag, int questionGroupId)
        {
            HTransferDocumentDC objDocData = new HTransferDocumentDC();
            HTransferCandidateDocInfo objCandidateDocData = new HTransferCandidateDocInfo();

            ////to insert the new document into DB after clicking on Add document button and returning PK id 
            if (spmode == 2)
            {
                objDocData.CandidateId = candidateId;
                objDocData.SessionId = sessionId;
                objDocData.DocumentId = documentId;
                objDocData.SpMode = spmode;
                objDocData.RoleGroupId = roleGroupId;
                ////#region Service call
                ////Creating new client to get pk from DB
                var clntUtility = new Service.DashBoardServices.DashBoardServicesClient();
                try
                {
                    clntUtility.Open();
                    objCandidateDocData = clntUtility.InsertDeleteDocument(objDocData);
                    //// clntUtility.Close(); //// already closed in final block
                }
                catch (Exception ex)
                {
                    ErrorLogger logger = new ErrorLogger(sessionId);
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
                ////#endregion
            }

            ////to delete the tr from html and row from table after clicking on Remove document button.
            if (spmode == 3)
            {
                objDocData.CandidateId = candidateId;
                objDocData.SessionId = sessionId;
                objDocData.DocumentId = documentId;
                objDocData.SpMode = spmode;
                objDocData.RoleGroupId = roleGroupId;
                objDocData.Pk_CandidateDocumentUploadDetail = long.Parse(docPkId);
                ////#region Service call
                ////Creating new client to get pk from DB
                var clntUtility = new Service.DashBoardServices.DashBoardServicesClient();
                try
                {
                    clntUtility.Open();
                    objCandidateDocData = clntUtility.InsertDeleteDocument(objDocData);
                    //// clntUtility.Close(); //// already closed in final block
                }
                catch (Exception ex)
                {
                    ErrorLogger logger = new ErrorLogger(sessionId);
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
                ////#endregion
            }

            ////to delete the documents from DB after clicking on No radio 
            if (spmode == 5)
            {
                objDocData.CandidateId = candidateId;
                objDocData.SessionId = sessionId;
                objDocData.SpMode = spmode;
                objDocData.RoleGroupId = roleGroupId;
                objDocData.YNFlag = ynflag;
                objDocData.QuestionGroupId = questionGroupId;
                ////#region Service call
                ////Creating new client to get pk from DB
                var clntUtility = new Service.DashBoardServices.DashBoardServicesClient();
                try
                {
                    clntUtility.Open();
                    objCandidateDocData = clntUtility.InsertDeleteDocument(objDocData);
                    //// clntUtility.Close(); //// already closed in final block
                }
                catch (Exception ex)
                {
                    ErrorLogger logger = new ErrorLogger(sessionId);
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
                ////#endregion
            }

            return objCandidateDocData;
        }

        /// <summary>
        /// 261671: method to Save HTransfer documents uploaded values to database
        /// </summary>
        /// <param name="candidateId">session Id</param>
        /// <param name="sessionId">candidate Id</param>
        /// <param name="roleGroupId">ECM Document Name</param>
        /// <param name="documentId">document Id</param>
        /// <param name="ecmDocumentName">SP Mode</param>
        /// <param name="pk_CandidateDocumentUploadDetail">PK_CandidateDocumentUpload Detail</param>
        /// <param name="statusFlag">status Flag</param>
        /// <param name="responseMessage">response Message</param>
        /// <param name="responseCode">response Code</param>
        /// <param name="fileName">file Name</param>
        /// <param name="fileType">file Type</param>
        /// <param name="additionalDocumentName">additional Document Name</param>
        /// <param name="spmode">mode n</param>
        /// <returns name="HTransferCandidateDocInfo">HTransferCandidate DocInfo</returns> 
        [WebMethod]
        public static HTransferCandidateDocInfo SaveHTransferUploadedDocName(long candidateId, long sessionId, int roleGroupId, int documentId, string ecmDocumentName, long pk_CandidateDocumentUploadDetail, int statusFlag, string responseMessage, int responseCode, string fileName, string fileType, string additionalDocumentName, int spmode)
        {
            ////string NewUploadSrc = "";
            HTransferDocumentDC objEcmDocumentName = new HTransferDocumentDC();
            HTransferCandidateDocInfo objCandData = new HTransferCandidateDocInfo();
            objEcmDocumentName.CandidateId = candidateId;
            objEcmDocumentName.SessionId = sessionId;
            objEcmDocumentName.RoleGroupId = roleGroupId;
            objEcmDocumentName.DocumentId = documentId;
            objEcmDocumentName.ECMDocumentName = ecmDocumentName;
            objEcmDocumentName.Pk_CandidateDocumentUploadDetail = pk_CandidateDocumentUploadDetail;
            objEcmDocumentName.StatusFlag = statusFlag;
            objEcmDocumentName.ResponseMessage = responseMessage;
            objEcmDocumentName.ResponseCode = responseCode;
            objEcmDocumentName.Filename = fileName;
            objEcmDocumentName.FileType = fileType;
            objEcmDocumentName.AdditionalDocumentName = additionalDocumentName;
            objEcmDocumentName.SpMode = spmode;
            ////#region Service call
            ////Creating new client to get message from DB
            ////var clntUtility = new OBUtilityMethodsClient();
            var clntUtility = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                clntUtility.Open();
                objCandData = clntUtility.SaveHTransferUploadedDocName(objEcmDocumentName);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion
            return objCandData;
        }

        /// <summary>
        /// 261671: Method to insert/delete Group doc list of HTransfer Documents 
        /// </summary>
        /// <param name="sessionId">session Id</param>
        /// <param name="candidateId">candidate Id</param>
        /// <param name="roleGroupId">roleGroup Id</param>
        /// <param name="ynflag">YN Flag</param>
        /// <param name="questionGroupId">Question GroupId</param>
        /// <param name="spmode">SP Mode</param>
        /// <returns name="strJSON">Gets HTransfer</returns>
        [WebMethod(BufferResponse = true, Description = "Gets HTransfer Group Document list for candidate", EnableSession = true)]
        public static string GetGroupDocumentList(long sessionId, long candidateId, int roleGroupId, short ynflag, int questionGroupId, int spmode)
        {
            HTransferDocumentDC objCandidateData = new HTransferDocumentDC();
            HTransferDocumentUploadDetail objDocumentdata = new HTransferDocumentUploadDetail();
            objCandidateData.SessionId = sessionId;
            objCandidateData.CandidateId = candidateId;
            objCandidateData.SpMode = spmode;
            objCandidateData.RoleGroupId = roleGroupId;
            objCandidateData.YNFlag = ynflag;
            objCandidateData.QuestionGroupId = questionGroupId;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                clntUtility.Open();
                objDocumentdata = clntUtility.GetGroupDocumentList(objCandidateData);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            ////#region Preparing JSON content
            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc = new XmlDocument();
            xmlDoc.LoadXml(objDocumentdata.HtmlContent);
            objDocumentdata.HtmlContent = JsonConvert.SerializeXmlNode(xmlDoc.SelectNodes("DesignHtml").Item(0), Newtonsoft.Json.Formatting.None, true);
            xmlDoc = null;
            string strJSON = string.Empty;
            strJSON = JsonConvert.SerializeObject(objDocumentdata);
            ////#endregion

            return strJSON;
        }

        /// <summary>
        /// 261671: Method to Submit HTransfer Section.Returns Section Completion Message or not Submitted mandatory documents List
        /// </summary>
        /// <param name="sessionId">session Id</param>
        /// <param name="candidateId">candidate Id</param>
        /// <param name="roleGroupId">roleGroup Id</param>
        /// <param name="spmode">SP Mode</param>
        /// <returns name="strJSON">Section Completion</returns>
        [WebMethod(BufferResponse = true, Description = "Returns Section Completion Message or not Submitted mandatory documents List", EnableSession = true)]
        public static string SubmitHTransferDocuments(long sessionId, long candidateId, int roleGroupId, int spmode)
        {
            HTransferCandidateData objCandidateData = new HTransferCandidateData();
            HTransferDocumentUploadDetail objDocumentdata = new HTransferDocumentUploadDetail();

            objCandidateData.SessionId = sessionId;
            objCandidateData.CandidateId = candidateId;
            objCandidateData.SpMode = spmode;
            objCandidateData.RoleGroupId = roleGroupId;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                clntUtility.Open();
                objDocumentdata = clntUtility.SubmitHTransferDocuments(objCandidateData);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            ////#region Preparing JSON content
            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc = new XmlDocument();
            xmlDoc.LoadXml(objDocumentdata.HtmlContent);
            objDocumentdata.HtmlContent = JsonConvert.SerializeXmlNode(xmlDoc.SelectNodes("SubmitInfo").Item(0), Newtonsoft.Json.Formatting.None, true);
            xmlDoc = null;
            string strJSON = string.Empty;
            strJSON = JsonConvert.SerializeObject(objDocumentdata);
            ////#endregion

            return strJSON;
        }

        #endregion

        #region RLA
        /// <summary>
        /// 261671: Method to save feedback values
        /// </summary>
        /// <param name="sessionId">session Id</param>
        /// <param name="candidateId">candidate Id</param>
        /// <param name="feedbackValue">role GroupId</param>
        /// <param name="saveMode">feedback Value</param>
        /// <param name="roleGroupId">save Mode</param>
        /// <param name="dashboardMode">dashboard Mode</param>
        /// <param name="countryId">country Id</param>
        /// <returns name="retStatus">feedback information</returns>
        [WebMethod(BufferResponse = false, Description = "Saves the feedback information to DB", EnableSession = true)]
        public static int SaveFeedback(long sessionId, long candidateId, string feedbackValue, int saveMode, int roleGroupId, int dashboardMode, int countryId)
        {
            int retStatus = 0;
            SaveRLAFeedbackDC objsave = new SaveRLAFeedbackDC();
            objsave.CandidateId = candidateId;
            objsave.RoleGroupId = roleGroupId;
            objsave.DashboardMode = dashboardMode;
            objsave.CountryId = countryId;

            if (feedbackValue != null)
            {
                objsave.FeedbackValue = feedbackValue.ToString();
            }

            objsave.SessionId = sessionId;
            objsave.IsFeedbackSubmitted = saveMode;

            ////#region Service call
            ////Creating new client to get message from DB
            var clntUtility = new CandidateServicesClient();
            try
            {
                clntUtility.Open();
                retStatus = clntUtility.saveFeedback(objsave);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
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
            ////#endregion

            return retStatus;
        }
        #endregion

        #region Page non static methods
        /// <summary>
        /// 312539  Method for Export to Excel data
        /// </summary>        
        public void ExcelExportForDashboard()
        {
            string pageNo = Request.QueryString["pageNo"].ToString().Trim();
            DateTime fromDate = DateTime.Parse(Request.QueryString["fromDate"]);
            DateTime todate = DateTime.Parse(Request.QueryString["toDate"]);
            string joininglocation = Request.QueryString["joininglocation"].ToString().Trim();
            string inducationlocation = Request.QueryString["inducationlocation"].ToString().Trim();
            string country = Request.QueryString["country"].ToString().Trim();
            string canidateStatus = Request.QueryString["canidateStatus"].ToString().Trim();
            string canidatejoiningtype = Request.QueryString["canidatejoiningtype"].ToString().Trim();
            string selectCHireStatus = Request.QueryString["selectCHireStatus"].ToString().Trim();
            this.DownloadAttendance(pageNo, fromDate, todate, joininglocation, inducationlocation, country, canidateStatus, canidatejoiningtype, selectCHireStatus);
        }
        #endregion

        #region InductionTracker Protected Methods

        /// <summary>
        /// 312539 Method to Fetch Download Induction Attendance Tracker
        /// </summary>
        /// <param name="pageNo">page Number</param>
        /// <param name="fromDate">from Date</param>
        /// <param name="todate">to Date</param>
        /// <param name="joininglocation">joining location</param>
        /// <param name="inducationlocation">education location</param>
        /// <param name="country">which country</param>
        /// <param name="canidateStatus">candidate Status</param>
        /// <param name="canidatejoiningtype">candidate joining type</param>
        /// <param name="selectCHireStatus">select CHIRE Status</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", Justification = "Reviewed.")]
        protected void DownloadAttendance(string pageNo, DateTime fromDate, DateTime todate, string joininglocation, string inducationlocation, string country, string canidateStatus, string canidatejoiningtype, string selectCHireStatus)
        {
            var objDashBoardClient = new DashBoardServicesClient();
            try
            {
                objDashBoardClient.Open();
                canidateStatus = canidateStatus.Replace("�", "–");
                DashboardDataDC objDashboardDetail = new DashboardDataDC();
                Utility.UtilityMethods objUtil = new UtilityMethods();
                TotalCountDC tc = new TotalCountDC();
                objDashboardDetail.SessionId = objUtil.SessionDetail.SessionId;
                DataSet dsexportToExcel = new DataSet();
                SessionHelper objSession = new SessionHelper();
                objDashboardDetail.FromDate = fromDate;
                objDashboardDetail.ToDate = todate;
                if (joininglocation == "ALL")
                {
                    objDashboardDetail.JoiningLocation = null;
                }
                else
                {
                    objDashboardDetail.JoiningLocation = joininglocation;
                }

                if (inducationlocation == "ALL")
                {
                    objDashboardDetail.InductionLocation = null;
                }
                else
                {
                    objDashboardDetail.InductionLocation = inducationlocation;
                }

                objDashboardDetail.Country = country;
                objDashboardDetail.CandidateStatus = canidateStatus;
                objDashboardDetail.InductionCandidateType = canidatejoiningtype;
                objDashboardDetail.PageNo = int.Parse(pageNo);
                objDashboardDetail.PageSize = pageSizeDashBoardcandidates1;
                objDashboardDetail.OfferStatus = selectCHireStatus;
                dataPageIndexDashBoardcandidates1 = int.Parse(pageNo);
                tc.TotalCount = 0;
                ////int totalRecords = 0;
                objSession.SetSessionValue("CandidateDetail", objDashboardDetail);
                string fileName = string.Empty;
                fileName = "InductionAttendanctTracker";
                dsexportToExcel = objDashBoardClient.DownloadAttendanceExcel(objDashboardDetail, tc);
                if ((dsexportToExcel != null) && (dsexportToExcel.Tables[0].Rows.Count > 0))
                {
                    ExportToExcel.ExportDatasetToExcel(dsexportToExcel, fileName);
                }
                else
                {
                    Response.Write("<script>alert('No Records Found.');</script>");
                }
            }
            catch (Exception)
            {
            }
            finally
            {
                objDashBoardClient.Abort();
            }
        }
        #endregion

        #region Page methods

        /// <summary>
        /// 312539  Method for download excel report
        /// </summary>   
        /// <param name="sender">for sender</param>
        /// <param name="e">for e</param>
        protected void Page_Load(object sender, EventArgs e)
        {   ////download Induction Attendanc excel report
            this.ExcelExportForDashboard();
        }
        #endregion

        /// <summary>
        /// 312539  Method for exception
        /// </summary>   
        /// <param name="errorLogger">error Logger</param>
        /// <returns>for exception</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode", Justification = "Reviewed.")]
        private static object Exception(ErrorLogger errorLogger)
        {
            throw new NotImplementedException();
        }
    }
}
        #endregion
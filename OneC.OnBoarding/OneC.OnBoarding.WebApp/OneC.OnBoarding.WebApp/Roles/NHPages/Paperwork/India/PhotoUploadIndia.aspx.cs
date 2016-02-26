//-----------------------------------------------------------------------=
// <copyright file="PhotoUploadIndia.aspx.cs" company="Cognizant Technology Solutions">
// Copyright  . All Rights Reserved.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace            : OneC.OnBoarding.WebApp.Roles.NHPages
 * Interface Name       : IDashBoardServices.cs
 * Version              : 1.0
 * Type                 : Interface
 * Purpose              : Interface references of dashboard service methods
 * Created date         : 2012-Jan-16
 * Author               : 208099
 * Reviewed by          :
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

namespace OneC.OnBoarding.WebApp.Roles.NHPages.Paperwork.India
{
    #region Namespaces
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Configuration;
    using System.IO;
    using System.Linq;
    using System.Net;
    using System.Runtime.Remoting.Messaging;
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
    using iTextSharp.text;
    using iTextSharp.text.html;
    using iTextSharp.text.pdf;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;
    using OneC.OnBoarding.DC.CandidateDC;
    using OneC.OnBoarding.DC.DashBoardDC;
    using OneC.OnBoarding.DC.UtilityDC;
    using OneC.OnBoarding.WebApp.FileUploadService;
    using OneC.OnBoarding.WebApp.Service.CandidateServices;
    using OneC.OnBoarding.WebApp.Service.OBUtilityMethods;
    using OneC.OnBoarding.WebApp.Utility;
    using Winnovative.WnvHtmlConvert;
    #endregion

    /// <summary>
    /// 208099:Class to Upload a photo
    /// </summary>
    public partial class PhotoUploadIndia : System.Web.UI.Page
    {
        #region Page initialization
        /// <summary>
        /// 208099:Method to send mail
        /// </summary>
        /// <param name="NotificationEventID">The current event's notification Id</param>
        /// <param name="countryID">Country Id from where the candidate is joining</param>
        /// <param name="candidateID">CandidateId of logged in candidate</param>
        /// <returns name="retStatus">returning the status of the mail</returns>
        private SessionDetails sessionDetail;

        // private List<string> SuggestedNames;

        // public List<string> suggestedNames
        // {
        //    get { return SuggestedNames; }
        //    set { SuggestedNames = value; }
        // }
        #endregion

        #region Page Init

        /* Initializing global object for Utility class to access utility methods if required */

        /// <summary>
        /// 369041: Utility Methods
        /// </summary>
        private Utility.UtilityMethods objUtil = new UtilityMethods();

        /// <summary>
        /// 369041: OB Utility Methods Client
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields", Justification = "Reviewed.")]
        private OBUtilityMethodsClient obj = new OBUtilityMethodsClient();

        /// <summary>
        /// 369041: Session
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields", Justification = "Reviewed.")]
        private SessionHelper objSession = new SessionHelper();

        #endregion

        #region SendMail with NotificationID
        /// <summary>
        /// 208099:Method to send mail
        /// </summary>
        /// <param name="notificationEventID">The current event's notification Id</param>
        /// <param name="countryID">Country Id from where the candidate is joining</param>
        /// <param name="candidateID">CandidateId of logged in candidate</param>
        /// <returns name="retStatus">returning the status of the mail</returns>        
        [WebMethod(BufferResponse = true, Description = "Method to send mail", EnableSession = true)]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", Justification = "Reviewed.")]
        public static int SendRejectionMAil(int notificationEventID, int countryID, int candidateID)
        {
            int retStatus = 0;
            long sessionId;
            SessionDetails sessionDetail;
            Utility.UtilityMethods objUtil = new UtilityMethods();
            sessionDetail = objUtil.SessionDetail;
            sessionId = sessionDetail.SessionId;

            // #region Utility Service call
            var clntUtility = new OBUtilityMethodsClient();
            try
            {
                clntUtility.Open();
                /* Sends Induction Date Cahnge Mail */

                // MailData objMailData = new MailData();
                // objMailData.NotificationEventID = NotificationEventID;
                // objMailData.CountryId = countryID;
                // objMailData.SessionId = sessionId;
                // objMailData.CandidateId = candidateID;

                //// SendMail(24, null, countryId);
                // retStatus = clntUtility.SendNotificationMail(objMailData);
                // clntUtility.Close();
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

            // #endregion
            return retStatus;
        }
        #endregion

        // generating name suggestion accepts parameters Firstname,Middlename,Lastname 
        // returns list<string>
        [WebMethod]

        /// <summary>
        /// 208099:Generate Name Suggestion
        /// </summary>
        /// <param name="firstName">First Name of the candidate</param>
        /// <param name="middleName">middle Name of the candidate</param>
        /// <param name="lastName">last Name of the candidate</param>
        /// <returns>Generate Name Suggestion</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1820:TestForEmptyStringsUsingStringLength", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", Justification = "Reviewed.")]
        public static List<string> GenerateNameSuggestion(string firstName, string middleName, string lastName)
        {
            List<string> suggestedNames = new List<string>();
            string associateFirstName;
            string middleInitial;
            if (middleName.Trim() != string.Empty)
            {
                middleInitial = " " + middleName.Trim() + " ";
            }
            else
            {
                middleInitial = " ";
            }

            string assocaiteName = firstName.Trim() + lastName.Trim();
            associateFirstName = firstName.Trim();

            // if associates First name alone goes beyond 20 charcters
            if (associateFirstName.Length > 20)
            {
                string lname11;

                // taking the first character of the lastname
                lname11 = lastName.Trim().Substring(0, 1);

                string[] fnamesplitArray;
                List<string> fnameArray = new List<string>();

                // splitting the first name based on space
                fnamesplitArray = associateFirstName.Split(' ');

                int flag = 0;
                foreach (string name in fnamesplitArray)
                {
                    if (flag == 0)
                    {
                        // checking whether splitted name has more than 2 charcters to check whether it is a logical name
                        if (name.Length > 2)
                        {
                            if (!fnameArray.Contains(name))
                            {
                                fnameArray.Add(name);

                                flag = 1;
                            }
                        }
                    }
                    else
                    {
                        if (!fnameArray.Contains(name))
                        {
                            fnameArray.Add(name);
                        }
                    }
                }

                // considering only First and second split from the First name splitted array
                int d = fnameArray.ToArray().Length;
                string fname11 = fnameArray[0];
                string fname12 = " ";
                if (d >= 2)
                {
                    fname12 = fnameArray[1];
                    if (fname12 != " ")
                    {
                        fname12 = " " + fname12 + " ";
                    }
                    else
                    {
                        fname12 = " ";
                    }
                }

                // combining the splitted names to generate logical name
                string combinedName;
                if (fnameArray[0].Length > 2 && fnameArray[0].Length < 20)
                {
                    if (!suggestedNames.Contains(fnameArray[0]))
                    {
                        suggestedNames.Add(fnameArray[0]);
                    }
                }

                if (fname11.Length > 2 && fname11.Length < 20)
                {
                    combinedName = fname11 + " " + lname11;
                    if (combinedName.Length <= 20)
                    {
                        if (!suggestedNames.Contains(combinedName))
                        {
                            suggestedNames.Add(combinedName);
                        }
                    }
                }

                combinedName = fname11 + fname12;
                if (combinedName.Length <= 20)
                {
                    if (!suggestedNames.Contains(combinedName))
                    {
                        suggestedNames.Add(combinedName);
                    }
                }

                combinedName = fname11 + fname12 + " " + lname11;
                if (combinedName.Length <= 20)
                {
                    if (!suggestedNames.Contains(combinedName))
                    {
                        suggestedNames.Add(combinedName);
                    }
                }

                // if (AssocaiteName.Length > 20)
                // if assocaite name goes beyond 20 characters(Firstname + middlename + lastname)
            }
            else
            {
                string lname1, suggName, mname1;

                // taking the first character of Lastname
                if (lastName.Trim() != string.Empty)
                {
                    lname1 = lastName.Trim().Substring(0, 1);
                }
                else
                {
                    lname1 = string.Empty;
                }

                // taking the first character of Middlename
                if (middleName.Trim() != string.Empty)
                {
                    mname1 = middleName.Trim().Substring(0, 1);
                }
                else
                {
                    mname1 = string.Empty;
                }

                string fname = firstName.Trim();

                // generating combinations of name
                suggName = fname;

                if (suggName.Length <= 20)
                {
                    if (!suggestedNames.Contains(suggName))
                    {
                        suggestedNames.Add(suggName);
                    }
                }

                if (mname1.Trim() != string.Empty)
                {
                    mname1 = " " + mname1.Trim() + " ";
                }
                else
                {
                    mname1 = " ";
                }

                suggName = fname + mname1 + lname1.Trim();
                if (suggName.Length <= 20)
                {
                    if (!suggestedNames.Contains(suggName))
                    {
                        suggestedNames.Add(suggName);
                    }
                }

                suggName = fname + mname1 + lastName.Trim();
                if (suggName.Length <= 20)
                {
                    if (!suggestedNames.Contains(suggName))
                    {
                        suggestedNames.Add(suggName);
                    }
                }

                suggName = fname + " " + lname1.Trim();
                if (suggName.Length <= 20)
                {
                    if (!suggestedNames.Contains(suggName))
                    {
                        suggestedNames.Add(suggName);
                    }
                }

                string middlename = middleName.Trim();
                if (middlename != string.Empty)
                {
                    middlename = " " + middlename + " ";
                }
                else
                {
                    middlename = " ";
                }

                suggName = fname + middlename + lname1.Trim();
                if (suggName.Length <= 20)
                {
                    if (!suggestedNames.Contains(suggName))
                    {
                        suggestedNames.Add(suggName);
                    }
                }
            }

            // returns the possible combination of names as suggestion.
            return suggestedNames;
        }

        [WebMethod]

        /// <summary>
        /// 208099:Method to Delete Rejected Photo
        /// </summary>
        /// <param name="fileUploadID">File Upload ID</param>
        /// <param name="candidateId">CandidateId of logged in candidate</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", Justification = "Reviewed.")]
        public static void DeleteRejectedPhoto(string fileUploadID, string candidateId)
        {
            long sessionId;
            SessionDetails sessionDetail;
            Utility.UtilityMethods objUtil = new UtilityMethods();
            sessionDetail = objUtil.SessionDetail;
            sessionId = sessionDetail.SessionId;
            FileUploadService.DocumentUploadServiceClient objDocumentUploadService = new FileUploadService.DocumentUploadServiceClient();
            try
            {
                FileUploadService.FileUploadDetailsRequest a = new FileUploadDetailsRequest();
                a.FileUploadId = Convert.ToInt32(fileUploadID);
                a.CreatedBy = candidateId.ToString();
                a.CreatedDate = DateTime.UtcNow;
                objDocumentUploadService.DeleteFileUploadDetails(a);

                // #region Logging Event Data
                string value = "candidateId:{" + candidateId.ToString() + "};fileuploadId:{" + fileUploadID.ToString() + "}";
                LogEventData(sessionId, Convert.ToInt64(candidateId), 0, "DeleteFileUploadDetails", "DeleteRejectedPhoto", value, false, "DeleteFileUploadDetails called");

                // #endregion
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionDetail.SessionId);
                logger.LogError(ex);
            }
            finally
            {
                // If connection resulted in faulted state then aborting client
                if (objDocumentUploadService.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    objDocumentUploadService.Abort();
                }
                else
                {
                    objDocumentUploadService.Close();   // Closing connection if no exception
                }

                objDocumentUploadService = null;    // Disposing client
            }
        }

        /// <summary>
        /// 208099:Logged event data
        /// </summary>
        /// <param name="sessionId">The current session's Id</param>
        /// <param name="candidateId">CandidateId of logged in candidate</param>
        /// <param name="taskId">Task Id</param>
        /// <param name="eventName">event Name</param>
        /// <param name="methodName">method Name</param>
        /// <param name="value">value is </param>
        /// <param name="isValueXmlType">is Value Xml Type</param>
        /// <param name="comment">comment Data</param>
        public static void LogEventData(long sessionId, long candidateId, int taskId, string eventName, string methodName, string value, bool isValueXmlType, string comment)
        {
            Utility.UtilityMethods.LogEventData(sessionId, candidateId, taskId, eventName, methodName, value, isValueXmlType, comment);
        }

        /// <summary>
        /// 369041: Page Load
        /// </summary>
        /// <param name="sender">Session Detail</param>
        /// <param name="e">Session Event</param>
        protected void Page_Load(object sender, EventArgs e)
        {
            if (this.sessionDetail == null)
            {
                this.sessionDetail = this.objUtil.SessionDetail;
            }
        }

        /// <summary>
        /// 369041: On Click button
        /// </summary>
        /// <param name="sender">Session Detail</param>
        /// <param name="e">Session Event</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", Justification = "Reviewed")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields", Justification = "Reviewed.")]
        protected void Button1_Click(object sender, EventArgs e)
        {
            FileUploadService.DocumentUploadServiceClient objDocumentPhotoUploadService = new FileUploadService.DocumentUploadServiceClient("BasicHttpMtomBinding");
            try
            {
                string message = string.Empty;
                if (this.browse_txtbx.HasFile)
                {
                    double size = this.browse_txtbx.PostedFile.ContentLength / 1024.0;
                    if (size > 200)
                    {
                        message = "alert('Max Upload size is 200 KB')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "UploadMessage", message, true);
                    }

                    CandidateServicesClient objCandClient = new CandidateServicesClient();
                    CandidateDetail[] objCandDetail = objCandClient.FetchCandidateTracking(this.sessionDetail);
                    string candidateId = objCandDetail[0].CandidateId.ToString();

                    string tempPath = Server.MapPath("~/Temp/");
                    string tempFileName = tempPath + "Photo" + Path.GetExtension(this.browse_txtbx.PostedFile.FileName);
                    this.browse_txtbx.SaveAs(tempFileName);
                    string ext = Path.GetExtension(tempFileName).ToLower();
                    System.IO.FileStream fileStream = new System.IO.FileStream(tempFileName, System.IO.FileMode.Open, System.IO.FileAccess.Read);
                    System.IO.BinaryReader binaryReader = new System.IO.BinaryReader(fileStream);
                    long totalBytes = new System.IO.FileInfo(tempFileName).Length;
                    byte[] buffer = binaryReader.ReadBytes((int)totalBytes); // Int32 was replaced with int
                    int appId = 2; // This is common keyId 
                    OBUtilityMethodsClient obj = new OBUtilityMethodsClient();
                    SystemKey sysKey = new SystemKey();
                    sysKey.KeyId = 40;
                    sysKey = obj.GetSystemKey(sysKey);
                    FileUploadService.FileUploadDetailsRequest objFileUploadDetailsRequest = new FileUploadService.FileUploadDetailsRequest();
                    FileUploadService.MFileuploadResponse objMFileuploadResponse = new FileUploadService.MFileuploadResponse();

                    FileUploadService.DocumentUploadServiceClient objDocumentUploadServiceClient = new FileUploadService.DocumentUploadServiceClient("BasicHttpMtomBinding");
                    objFileUploadDetailsRequest.AppId = appId;
                    objFileUploadDetailsRequest.AppTemplateId = sysKey.KeyValue;
                    objFileUploadDetailsRequest.FileName = candidateId + "." + ext;
                    objFileUploadDetailsRequest.IncomingFile = buffer;
                    objFileUploadDetailsRequest.AssociateId = Convert.ToInt32(candidateId.ToString());
                    objFileUploadDetailsRequest.CreatedBy = candidateId.ToString();
                    objFileUploadDetailsRequest.CreatedDate = DateTime.UtcNow;
                    objMFileuploadResponse = objDocumentUploadServiceClient.UploadFile_WithResponse(objFileUploadDetailsRequest);

                    // FileUploadService.FileUploadDetailsRequest a = new FileUploadDetailsRequest();
                    // a.FileUploadId = 1240;
                    // objDocumentUploadServiceClient.DeleteFileUploadDetails(a);
                    string response = objMFileuploadResponse.Filestatus;

                    // fileStream.Close();
                    fileStream.Dispose();
                    binaryReader.Close();
                    buffer = null;
                    if (File.Exists(tempFileName))
                    {
                        File.Delete(tempFileName);
                    }

                    if (objMFileuploadResponse.Filestatus == "Success")
                    {
                        SANUploadDetails UploadDetails = new SANUploadDetails();
                        UploadDetails.CandidateId = objFileUploadDetailsRequest.AssociateId;
                        UploadDetails.AppTemplateId = 1;
                        UploadDetails.FileUploadId = objMFileuploadResponse.FileUploadId;
                        UploadDetails.FileContentId = objMFileuploadResponse.FileContentId.ToString();
                        UploadDetails.FileName = objFileUploadDetailsRequest.FileName;
                        UploadDetails.FileSaveName = objFileUploadDetailsRequest.FileSaveName;
                        UploadDetails.FileURL = objMFileuploadResponse.FileURL;
                        UploadDetails.FileExternalURL = objMFileuploadResponse.FileExternalURL;
                        UploadDetails.FileLocation = objMFileuploadResponse.FileLocation;
                        UploadDetails.KeyId = 40;
                        UploadDetails.SessionId = sessionDetail.SessionId;
                        obj.SaveSANUploadDetails(UploadDetails);

                    }

                }
                else
                {
                    // message = "alert('Please select a file')";
                    // Page.ClientScript.RegisterStartupScript(this.GetType(), "UploadMessage", message, true);
                }
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(this.sessionDetail.SessionId);
                logger.LogError(ex);
            }
            finally
            {
                // If connection resulted in faulted state then aborting client
                if (objDocumentPhotoUploadService.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    objDocumentPhotoUploadService.Abort();
                }
                else
                {
                    objDocumentPhotoUploadService.Close();   // Closing connection if no exception
                }

                objDocumentPhotoUploadService = null;    // Disposing client
            }
        }

        /// <summary>
        /// 369041: On Click button file upload
        /// </summary>
        /// <param name="sender">Session Detail</param>
        /// <param name="e">Session Event</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", Justification = "Reviewed")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields", Justification = "Reviewed.")]
        protected void Button2_Click(object sender, EventArgs e)
        {
            FileUploadService.DocumentUploadServiceClient objDocumentPhotoUploadService = new FileUploadService.DocumentUploadServiceClient("BasicHttpMtomBinding");
            try
            {
                string message = string.Empty;
                if (this.browse_txtbx.HasFile)
                {
                    double size = this.browse_txtbx.PostedFile.ContentLength / 1024.0;
                    if (size > 200)
                    {
                        message = "alert('Max Upload size is 200 KB')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "UploadMessage", message, true);
                    }

                    CandidateServicesClient objCandClient = new CandidateServicesClient();

                    // CandidateDetail[] objCandDetail = objCandClient.FetchCandidateTracking(sessionDetail);
                    string candidateId = this.hdnCandidateID.Value;

                    string tempPath = Server.MapPath("~/Temp/");
                    string tempFileName = tempPath + "Photo." + Path.GetExtension(this.browse_txtbx.PostedFile.FileName);
                    this.browse_txtbx.SaveAs(tempFileName);
                    string ext = Path.GetExtension(tempFileName).ToLower();
                    System.IO.FileStream fileStream = new System.IO.FileStream(tempFileName, System.IO.FileMode.Open, System.IO.FileAccess.Read);
                    System.IO.BinaryReader binaryReader = new System.IO.BinaryReader(fileStream);
                    long totalBytes = new System.IO.FileInfo(tempFileName).Length;
                    byte[] buffer = binaryReader.ReadBytes((int)totalBytes); // Int32 was replaced with int

                    int appId = 2; // This is common keyId 
                    OBUtilityMethodsClient obj = new OBUtilityMethodsClient();
                    SystemKey sysKey = new SystemKey();

                    sysKey.KeyId = 40;
                    sysKey = obj.GetSystemKey(sysKey);

                    FileUploadService.FileUploadDetailsRequest objFileUploadDetailsRequest = new FileUploadService.FileUploadDetailsRequest();
                    FileUploadService.MFileuploadResponse objMFileuploadResponse = new FileUploadService.MFileuploadResponse();

                    FileUploadService.DocumentUploadServiceClient objDocumentUploadServiceClient = new FileUploadService.DocumentUploadServiceClient();
                    objFileUploadDetailsRequest.AppId = appId;
                    objFileUploadDetailsRequest.AppTemplateId = sysKey.KeyValue;
                    objFileUploadDetailsRequest.FileName = candidateId + "." + ext;
                    objFileUploadDetailsRequest.IncomingFile = buffer;
                    objFileUploadDetailsRequest.AssociateId = Convert.ToInt32(candidateId.ToString());
                    objFileUploadDetailsRequest.CreatedBy = candidateId.ToString();
                    objFileUploadDetailsRequest.CreatedDate = DateTime.UtcNow;
                    objMFileuploadResponse = objDocumentUploadServiceClient.UploadFile_WithResponse(objFileUploadDetailsRequest);

                    string response = objMFileuploadResponse.Filestatus;

                    if (objMFileuploadResponse.Filestatus == "Success")
                    {
                        SANUploadDetails UploadDetails = new SANUploadDetails();
                        UploadDetails.CandidateId = objFileUploadDetailsRequest.AssociateId;
                        UploadDetails.AppTemplateId = 1;
                        UploadDetails.FileUploadId = objMFileuploadResponse.FileUploadId;
                        UploadDetails.FileContentId = objMFileuploadResponse.FileContentId.ToString();
                        UploadDetails.FileName = objFileUploadDetailsRequest.FileName;
                        UploadDetails.FileSaveName = objFileUploadDetailsRequest.FileSaveName;
                        UploadDetails.FileURL = objMFileuploadResponse.FileURL;
                        UploadDetails.FileExternalURL = objMFileuploadResponse.FileExternalURL;
                        UploadDetails.FileLocation = objMFileuploadResponse.FileLocation;
                        UploadDetails.KeyId = 40;
                        UploadDetails.SessionId = sessionDetail.SessionId;
                        obj.SaveSANUploadDetails(UploadDetails);

                    }

                    // fileStream.Close();
                    fileStream.Dispose();
                    binaryReader.Close();
                    buffer = null;

                    if (File.Exists(tempFileName))
                    {
                        File.Delete(tempFileName);
                    }
                }
                else
                {
                    // message = "alert('Please select a file')";
                    // Page.ClientScript.RegisterStartupScript(this.GetType(), "UploadMessage", Message, true);
                }
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(this.sessionDetail.SessionId);
                logger.LogError(ex);
            }
            finally
            {
                // If connection resulted in faulted state then aborting client
                if (objDocumentPhotoUploadService.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    objDocumentPhotoUploadService.Abort();
                }
                else
                {
                    objDocumentPhotoUploadService.Close();   // Closing connection if no exception
                }

                objDocumentPhotoUploadService = null;    // Disposing client
            }
        }

        /// <summary>
        /// 369041: Page initialize
        /// </summary>
        /// <param name="sender">Session Detail</param>
        /// <param name="e">Session Event</param>
        protected void Page_init(object sender, EventArgs e)
        {
            /* Initialize session detail */
            if (this.objUtil.SessionDetail != null)
            {
                this.sessionDetail = this.objUtil.SessionDetail;
            }
        }

        // protected void Button3_Click(object sender, EventArgs e)
        // {
        // FileUploadService.DocumentUploadServiceClient objDocumentUploadServiceClient = new FileUploadService.DocumentUploadServiceClient();
        // FileUploadService.FileUploadDetailsRequest a = new FileUploadDetailsRequest();
        // FileUploadService.MFileuploadResponse objMFileuploadResponse = new FileUploadService.MFileuploadResponse();
        // a.FileUploadId = 1240;
        // a.AssociateId = 0;
        // a.AppTemplateId = "1";
        // a.CreatedBy = "267083";
        // a.AppId = 2;
        // objDocumentUploadServiceClient.DeleteFileUploadDetails(a);
        // string msg = objMFileuploadResponse.Filestatus;
        // }
    }
}
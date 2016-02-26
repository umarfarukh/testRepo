//-----------------------------------------------------------------------
// <copyright file="UploadUtility.aspx.cs" company="CTS">
//      Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
namespace OneC.OnBoarding.WebApp.CommonPages
{
    using System;
    using System.Collections.ObjectModel;
    using System.Configuration;
    using System.IO;
    using System.Web;
    using System.Web.Services;
    using System.Xml;
    using ECMSharedServicesLib;
    using Newtonsoft.Json;
    using OneC.OnBoarding.DC.UtilityDC;
    using OneC.OnBoarding.WebApp.Service.OBUtilityMethods;
    using OneC.OnBoarding.WebApp.Utility;

    /// <summary>
    /// Represents the upload utility web methods.
    /// </summary>
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields", Justification = "Reviewed.")]
    public partial class UploadUtility : System.Web.UI.Page
    {
        #region Fields
        /*Declaring parameters*/

        /// <summary>
        /// Declaring the ECM configured app Id.
        /// </summary>        
        private static int appId = 0;

        /// <summary>
        /// Declaring the ECM user name
        /// </summary>
        private static string ecmPassWord = string.Empty;

        /// <summary>
        /// Declaring the ECM SSO 
        /// </summary>
        private static bool ecmSSOEnabled = false;

        /// <summary>
        /// Declaring the ECM SSO token name
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields", Justification = "Reviewed.")]
        private static string ecmSSOTokenName = string.Empty;

        /// <summary>
        /// Declaring the ECM user name 
        /// </summary>
        private static string ecmUserName = string.Empty;

        /// <summary>
        /// Declaring the On-Boarding App Id in one cognizant platform
        /// </summary>
        private static int globalAppId = 2; /*This is static On-Boarding OneC app Id*/

        /// <summary>
        /// Declaring the Upload utility of ECM
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields", Justification = "Reviewed.")]
        private static string uploadUtilityURL = string.Empty;

        #endregion Fields

        #region Methods

        /// <summary>
        /// Represents the method used to delete documents from ECM.
        /// </summary>
        /// <param name="uploadId">Upload Id</param>
        /// <param name="uploadRnId">Upload runner id</param>
        /// <param name="candidateId">Candidate Id</param>
        /// <returns>Returns the status of delete method</returns>
        [WebMethod]
        public static string DeleteFileFromECM(string uploadId, int uploadRnId, long candidateId)
        {
            int appId;
            int dId;
            string strJSON = string.Empty;
            SessionHelper sessionData = new SessionHelper();
            UploadUtiltiyDC objUploadDC = new UploadUtiltiyDC();
            UploadReturnResponseDC objUploadReturnResponseDC = new UploadReturnResponseDC();
            SessionHelper session = new SessionHelper();
            UploadStorageData objUploadStorageData = new UploadStorageData();
            objUploadStorageData = (UploadStorageData)session.GetSessionValue("UploadData");
            var contentId = objUploadStorageData.UploadSessionStorageData.Find(delegate(UploadSessionStorage uss) { return uss.UpId == uploadId && uss.UpRunnerId == uploadRnId; });
            appId = int.Parse(System.Configuration.ConfigurationManager.AppSettings["AppId"]);
            ECMSharedServicesLib.ECMCommon.IdcPropertyList propList = new ECMSharedServicesLib.ECMCommon.IdcPropertyList();
            ECMSharedServicesLib.ECMAdditionalFiles.DELETE_CONTENTResult objFileDeleteResult = new ECMSharedServicesLib.ECMAdditionalFiles.DELETE_CONTENTResult();
            try
            {
                ECMSharedServices objECMSharedServices = new ECMSharedServices();
                objECMSharedServices = new ECMSharedServicesLib.ECMSharedServices(System.Configuration.ConfigurationManager.AppSettings["ecmUserName"].ToString(), System.Configuration.ConfigurationManager.AppSettings["ecmPassword"].ToString());
                if (contentId.DocumentId != 0)
                {
                    dId = contentId.DocumentId;
                }
                else
                {
                    dId = GetLatestdID(contentId.ECMContentId, appId);
                }

                objFileDeleteResult = objECMSharedServices.DeleteContent(dId, contentId.ECMContentId, propList, appId, System.Guid.Empty);
                if (objFileDeleteResult.StatusInfo.statusCode == 0)
                {
                    objUploadDC.UpId = uploadId;
                    objUploadDC.CandidateId = candidateId;
                    objUploadDC.SessionId = int.Parse(sessionData.GetSessionValue("ssid").ToString());
                    objUploadDC.SendCode = 0;
                    objUploadDC.ECMUtilMessage = objFileDeleteResult.StatusInfo.statusMessage;
                    objUploadDC.SpMode = 1;
                    objUploadDC.RoleGroupId = int.Parse(sessionData.GetSessionValue("rgid").ToString());
                    objUploadDC.DocumentId = dId;
                    var clntUtility = new OBUtilityMethodsClient();
                    try
                    {
                        clntUtility.Open();
                        strJSON = clntUtility.SaveUploadResponse(objUploadDC);
                    }
                    catch (Exception ex)
                    {
                        ErrorLogger logger = new ErrorLogger(((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId);
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
                }

                PushJsonDataToSession(strJSON, true);
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId);
                logger.LogError(ex);
            }

            return strJSON;
        }

        /// <summary>
        /// This method is used to delete the file from SAN.
        /// </summary>
        /// <param name="candidateId">Candidate Id</param>
        /// <param name="uploadId">Upload Id</param>
        /// <returns>Returns the response of delete method</returns>
        [WebMethod]
        public static string DeleteFileFromSAN(long candidateId, string uploadId)
        {
            string strJSON = string.Empty;
            SessionHelper sessionData = new SessionHelper();
            UploadReturnResponseDC objUploadReturnResponseDC = new UploadReturnResponseDC();
            OBUtilityMethodsClient obj = new OBUtilityMethodsClient();
            SystemKey sysKey = new SystemKey();
            sysKey.KeyId = 38;
            sysKey = obj.GetSystemKey(sysKey);
            SessionHelper session = new SessionHelper();
            UploadSessionStorageDCList objuploadSessionList = new UploadSessionStorageDCList();
            try
            {
                objuploadSessionList = (UploadSessionStorageDCList)session.GetSessionValue("UploadData");
                var listData = objuploadSessionList.Find(delegate(UploadSessionStorage uss) { return uss.UpId == uploadId; });
                FileUploadService.FileUploadDetailsRequest objFileUploadDetailsRequest = new FileUploadService.FileUploadDetailsRequest();
                FileUploadService.MFileuploadResponse objMFileuploadResponse = new FileUploadService.MFileuploadResponse();

                FileUploadService.DocumentUploadServiceClient objDocumentUploadServiceClient = new FileUploadService.DocumentUploadServiceClient();

                objFileUploadDetailsRequest.AppTemplateId = sysKey.KeyValue;
                objFileUploadDetailsRequest.FileUploadId = Convert.ToInt32(listData.FileUploadId);
                objFileUploadDetailsRequest.FileContentId = Guid.Parse(listData.FileContentId.ToString());
                objFileUploadDetailsRequest.CreatedBy = candidateId.ToString();

                objMFileuploadResponse = objDocumentUploadServiceClient.DeleteFileUploadDetails(objFileUploadDetailsRequest);

                if (objMFileuploadResponse.Filestatus.ToLower() == "success")
                {
                    UploadUtiltiyDC objUploadDC = new UploadUtiltiyDC();
                    objUploadDC.UpId = uploadId;
                    objUploadDC.CandidateId = candidateId;
                    objUploadDC.SessionId = int.Parse(sessionData.GetSessionValue("ssid").ToString());
                    objUploadDC.SpMode = 1;
                    objUploadDC.SendMessage = objMFileuploadResponse.Filestatus;
                    objUploadDC.RoleGroupId = int.Parse(sessionData.GetSessionValue("rgid").ToString());
                    var clntUtility = new OBUtilityMethodsClient();
                    try
                    {
                        clntUtility.Open();
                        strJSON = clntUtility.SaveUploadResponse(objUploadDC);
                    }
                    catch (Exception ex)
                    {
                        ErrorLogger logger = new ErrorLogger(((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId);
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

                    XmlDocument xmlDoc = new XmlDocument();
                    xmlDoc = new XmlDocument();
                    xmlDoc.LoadXml("<Table>" + objUploadReturnResponseDC.DataXML + "</Table>");
                    PushDataToSession(xmlDoc);
                    objUploadReturnResponseDC.DataXML = JsonConvert.SerializeXmlNode(xmlDoc.SelectNodes("Table").Item(0), Newtonsoft.Json.Formatting.None, true);
                    strJSON = JsonConvert.SerializeObject(objUploadReturnResponseDC);
                }
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId);
                logger.LogError(ex);
            }

            return strJSON;
        }

        /// <summary>
        /// Represents the document upload status.
        /// </summary>
        /// <param name="candidateId">Candidate ID</param>
        /// <param name="uploadRnId">Upload runner Id</param>
        /// <param name="uploadId">Upload ID</param>
        /// <param name="mode">SP mode</param>
        /// <param name="response">Input response</param>
        /// <returns>Returns the SP status</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", Justification = "Reviewed.")]
        [WebMethod]
        public static string DocumentUploadStatus(long candidateId, int uploadRnId, string uploadId, int mode, string response)
        {
            string strJSON = string.Empty;
            SessionHelper sessionData = new SessionHelper();
            UploadUtiltiyDC objUploadDC = new UploadUtiltiyDC();
            objUploadDC.UpId = uploadId;
            objUploadDC.UpRunnerId = uploadRnId;
            objUploadDC.CandidateId = candidateId;
            objUploadDC.SessionId = int.Parse(sessionData.GetSessionValue("ssid").ToString());
            objUploadDC.Mode = mode;
            objUploadDC.SpMode = 0;
            objUploadDC.FileUploadId = 0;
            objUploadDC.UploadDocRemarks = response.Trim();
            objUploadDC.RoleGroupId = int.Parse(sessionData.GetSessionValue("rgid").ToString());
            objUploadDC.Return = true;
            var clntUtility = new OBUtilityMethodsClient();
            try
            {
                clntUtility.Open();
                strJSON = clntUtility.SaveUploadResponse(objUploadDC);
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId);
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

            return strJSON;
        }

        /// <summary>
        /// This method is used to download the latest or version of uploaded file.
        /// </summary>
        /// <param name="uploadId">Upload Id</param>
        /// <param name="uploadRnId">Upload runner Id</param>
        /// <param name="candidateId">Candidate ID</param>
        /// <param name="mode">SP mode</param>
        /// <param name="documentId">Version of the document</param>
        /// <returns>Returns the URL of the content ID.</returns>        
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", Justification = "Reviewed.")]
        [WebMethod]
        public static string DownloadECMFile(string uploadId, int uploadRnId, long candidateId, int mode, int documentId)
        {
            string contentId = string.Empty;
            SessionHelper session = new SessionHelper();
            UploadStorageData objUploadStorageData = new UploadStorageData();
            objUploadStorageData = (UploadStorageData)session.GetSessionValue("UploadData");
            var listData = objUploadStorageData.UploadSessionStorageData.Find(delegate(UploadSessionStorage uss) { return uss.UpId == uploadId && uss.UpRunnerId == uploadRnId; });
            if (mode == 1)
            {
                if (string.IsNullOrEmpty(listData.MasterCopyContentId))
                {
                    contentId = listData.TemplateContentId;
                }
                else
                {
                    contentId = listData.MasterCopyContentId;
                }
            }
            else if (mode == 3)
            {
                contentId = listData.ECMContentId;
            }

            ECMSharedServicesLib.ECMCommon.ECMFileURLResult objFileURLResult = new ECMSharedServicesLib.ECMCommon.ECMFileURLResult();
            ECMSharedServicesLib.ECMSharedServices objECMSharedServices;

            if (ecmSSOEnabled == false)
            {
                // Initializing credentials
                objECMSharedServices = new ECMSharedServicesLib.ECMSharedServices(ecmUserName, ecmPassWord);
            }
            else
            {
                objECMSharedServices = new ECMSharedServicesLib.ECMSharedServices();
            }

            try
            {
                string logonUser = HttpContext.Current.User.Identity.Name;
                objFileURLResult = objECMSharedServices.GetNativeFileURL(contentId, 0, appId, true, false, logonUser); // passing it with ContentID and validating URL
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId);
                logger.LogError(ex);
            }

            if (objFileURLResult.AppFileDownloadURL == null || objFileURLResult.AppFileDownloadURL.Trim() == string.Empty)
            {
                objFileURLResult.AppFileDownloadURL = string.Empty;
            }

            return objFileURLResult.AppFileDownloadURL;
        }

        /// <summary>
        /// This method is used to download the uploaded file from SAN.
        /// </summary>
        /// <param name="uploadId">Upload Id</param>
        /// <returns>Returns the URL to download uploaded file.</returns>
        [WebMethod]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", MessageId = "uploadId", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", MessageId = "session", Justification = "Reviewed.")]
        public static string DownloadFileFromSAN(string uploadId)
        {
            SessionHelper session = new SessionHelper();
            ////    UploadSessionStorageDCList objuploadSessionList = new UploadSessionStorageDCList();
            ////    objuploadSessionList = (UploadSessionStorageDCList)session.GetSessionValue("UploadData");
            ////    var listData = objuploadSessionList.Find(delegate(UploadSessionStorage uss) { return uss.UpId == upId; });
            ////   return listData.SANDownloadURL.ToString();
            return string.Empty;
        }

        /// <summary>
        /// This method is used to get the upload list of the initialized page.
        /// </summary>
        /// <param name="uploadGroupId">upload group Id is the array of list of upload Id and runner Id</param>
        /// <param name="candidateId">Candidate Id</param>
        /// <param name="mode">SP mode</param>
        /// <returns>Returns the document configuration of initialized page.</returns>
        [WebMethod]
        public static string GetDocumentUploadList(string uploadGroupId, long candidateId, int mode)
        {
            string strJSON = string.Empty;
            SessionHelper sessionData = new SessionHelper();
            UploadUtiltiyDC objUploadDC = new UploadUtiltiyDC();
            objUploadDC.CandidateId = candidateId;
            objUploadDC.SessionId = int.Parse(sessionData.GetSessionValue("ssid").ToString());
            objUploadDC.RoleGroupId = int.Parse(sessionData.GetSessionValue("rgid").ToString());
            objUploadDC.UpGroupId = uploadGroupId;
            var clntUtility = new OBUtilityMethodsClient();
            try
            {
                clntUtility.Open();
                strJSON = clntUtility.GetUploadList(objUploadDC);
                clntUtility.Close();
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId);
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

            if (mode == 0)
            {
                PushJsonDataToSession(strJSON, false);
            }

            return strJSON;
        }

        /// <summary>
        /// This method is used to get the ECM latest URL
        /// </summary>
        /// <param name="uploadGroupId">Upload group Id</param>
        /// <param name="candidateId">Candidate Id</param>
        /// <returns>Returns the latest upload URL.</returns>
        [WebMethod]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1055:UriReturnValuesShouldNotBeStrings", Justification = "Reviewed.")]
        public static string GetLatestURL(string uploadGroupId, long candidateId)
        {
            string strJson = string.Empty;
            SessionHelper sessionData = new SessionHelper();
            int sessionId = int.Parse(sessionData.GetSessionValue("ssid").ToString());
            UploadUtiltiyDC objUploadDC = new UploadUtiltiyDC();
            objUploadDC.CandidateId = candidateId;
            objUploadDC.UpGroupId = uploadGroupId;
            objUploadDC.SessionId = sessionId;
            var clntUtility = new OBUtilityMethodsClient();
            try
            {
                clntUtility.Open();
                strJson = clntUtility.GetECMUploadURL(objUploadDC);
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

            return strJson;
        }

        /// <summary>
        /// Represents the file upload save method of SAN.
        /// </summary>
        /// <param name="candidateId">Candidate Id</param>
        /// <param name="uploadId">Upload Id</param>
        /// <param name="mode">SP Mode</param>
        /// <param name="fileUploadId">File Upload Id</param>
        /// <param name="fileContentId">File Content Id</param>
        /// <param name="fileName">Name of the upload file</param>
        /// <param name="message">Upload return message from SAN</param>
        /// <returns>Returns the save response from SP</returns>
        public static string SaveFileUploadDataToSAN(long candidateId, string uploadId, int mode, long fileUploadId, string fileContentId, string fileName, string message)
        {
            string strJSON = string.Empty;
            try
            {
                SessionHelper sessionData = new SessionHelper();
                UploadUtiltiyDC objUploadDC = new UploadUtiltiyDC();
                UploadReturnResponseDC objUploadReturnResponseDC = new UploadReturnResponseDC();
                objUploadDC.UpId = uploadId;
                objUploadDC.CandidateId = candidateId;
                objUploadDC.SessionId = int.Parse(sessionData.GetSessionValue("ssid").ToString());
                objUploadDC.Mode = mode;
                objUploadDC.SpMode = 0;
                objUploadDC.FileUploadId = fileUploadId;
                objUploadDC.FileContentId = fileContentId;
                objUploadDC.SendMessage = message;
                objUploadDC.ECMUtilMessage = fileName;
                objUploadDC.RoleGroupId = int.Parse(sessionData.GetSessionValue("rgid").ToString());
                var clntUtility = new OBUtilityMethodsClient();
                try
                {
                    clntUtility.Open();
                    strJSON = clntUtility.SaveUploadResponse(objUploadDC);
                }
                catch (Exception ex)
                {
                    ErrorLogger logger = new ErrorLogger(((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId);
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

                XmlDocument xmlDoc = new XmlDocument();
                xmlDoc = new XmlDocument();
                xmlDoc.LoadXml("<Table>" + objUploadReturnResponseDC.DataXML + "</Table>");
                PushDataToSession(xmlDoc);
                objUploadReturnResponseDC.DataXML = JsonConvert.SerializeXmlNode(xmlDoc.SelectNodes("Table").Item(0), Newtonsoft.Json.Formatting.None, true);
                strJSON = JsonConvert.SerializeObject(objUploadReturnResponseDC);
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId);
                logger.LogError(ex);
            }

            return strJSON;
        }

        /// <summary>
        /// This method is used to save the upload response of ECM.
        /// </summary>
        /// <param name="uploadId">Upload Id</param>
        /// <param name="uploadRnId">Upload runner Id is used to identify the unique upload Id configuration.</param>
        /// <param name="candidateId">Candidate Id</param>
        /// <param name="mode">Stored procedure mode</param>
        /// <param name="sendMessage">send message received from upload utility tool of ECM.</param>
        /// <param name="sendUtilMessage">send utility message received from upload utility tool of ECM.</param>
        /// <param name="sendStatus">send status received from upload utility tool of ECM.</param>
        /// <param name="sendCode">send code received from upload utility tool of ECM.</param>
        /// <param name="documentId">document Id received from upload utility tool of ECM to identify the version.</param>
        /// <returns>Returns the saved status.</returns>
        [WebMethod]
        public static string SaveUploadedResponse(string uploadId, int uploadRnId, long candidateId, int mode, string sendMessage, string sendUtilMessage, string sendStatus, int sendCode, int documentId)
        {
            string strJSON = string.Empty;
            SessionHelper sessionData = new SessionHelper();
            UploadUtiltiyDC objUploadDC = new UploadUtiltiyDC();
            objUploadDC.UpId = uploadId;
            objUploadDC.UpRunnerId = uploadRnId;
            objUploadDC.CandidateId = candidateId;
            objUploadDC.SessionId = int.Parse(sessionData.GetSessionValue("ssid").ToString());
            objUploadDC.Mode = mode;
            objUploadDC.SendCode = sendCode;
            objUploadDC.SendMessage = sendMessage;
            objUploadDC.SendStatus = sendStatus;
            objUploadDC.ECMUtilMessage = sendUtilMessage;
            objUploadDC.SpMode = 0;
            objUploadDC.FileUploadId = 0;
            objUploadDC.RoleGroupId = int.Parse(sessionData.GetSessionValue("rgid").ToString());
            objUploadDC.DocumentId = documentId;
            objUploadDC.Return = true;
            var clntUtility = new OBUtilityMethodsClient();
            try
            {
                clntUtility.Open();
                strJSON = clntUtility.SaveUploadResponse(objUploadDC);
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId);
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

            if (strJSON.Length != 0)
            {
                PushJsonDataToSession(strJSON, true);
            }

            return strJSON;
        }

        /// <summary>
        /// Represents the method to upload file to SAN.
        /// </summary>
        /// <param name="filePath">File path in user system.</param>
        /// <param name="candidateId">Candidate Id</param>
        /// <param name="uploadId">Upload Id</param>
        /// <param name="mode">SP mode</param>
        /// <returns>Returns the upload status</returns>
        [WebMethod]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        public static string UploadFileToSAN(string filePath, long candidateId, string uploadId, int mode)
        {
            string strJSON = string.Empty;
            string retMessage = string.Empty;
            string[] fileUploadAllowedExtensions = { ".bmp", ".doc", ".jpg", ".pdf", ".png", ".tif", ".zip", ".jpeg", ".tiff" };

            try
            {
                var path = new System.IO.FileInfo(filePath);
                string fileExtension = Path.GetExtension(filePath);
                int pos = Array.IndexOf(fileUploadAllowedExtensions, fileExtension.ToLower().Trim());
                if (pos > -1)
                {
                    FileStream fileStream = File.Open(filePath, FileMode.Open, FileAccess.Read);
                    BinaryReader binaryReader = new BinaryReader(fileStream);
                    long totalBytes = new System.IO.FileInfo(filePath).Length;
                    if (totalBytes <= 2048000)
                    {
                        string fileName = Path.GetFileName(filePath);
                        byte[] buffer = binaryReader.ReadBytes((int)totalBytes);
                        OBUtilityMethodsClient obj = new OBUtilityMethodsClient();
                        SystemKey sysKey = new SystemKey();
                        sysKey.KeyId = 38;
                        sysKey = obj.GetSystemKey(sysKey);
                        FileUploadService.FileUploadDetailsRequest objFileUploadDetailsRequest = new FileUploadService.FileUploadDetailsRequest();
                        FileUploadService.MFileuploadResponse objMFileuploadResponse = new FileUploadService.MFileuploadResponse();
                        FileUploadService.DocumentUploadServiceClient objDocumentUploadServiceClient = new FileUploadService.DocumentUploadServiceClient();
                        objFileUploadDetailsRequest.AppId = globalAppId;
                        objFileUploadDetailsRequest.AppTemplateId = sysKey.KeyValue;
                        objFileUploadDetailsRequest.FileName = fileName;
                        objFileUploadDetailsRequest.IncomingFile = buffer;
                        objFileUploadDetailsRequest.AssociateId = Convert.ToInt32(candidateId.ToString());
                        objFileUploadDetailsRequest.CreatedBy = candidateId.ToString();
                        objFileUploadDetailsRequest.CreatedDate = DateTime.UtcNow;
                        objMFileuploadResponse = objDocumentUploadServiceClient.UploadFile_WithResponse(objFileUploadDetailsRequest);
                        buffer = null;
                        fileStream.Close();
                        ////fileStream.Dispose();
                        binaryReader.Close();
                        buffer = null;
                        strJSON = SaveFileUploadDataToSAN(candidateId, uploadId, mode, objMFileuploadResponse.FileUploadId, objMFileuploadResponse.FileContentId.ToString(), fileName, objMFileuploadResponse.Filestatus);
                    }
                    else
                    {
                        strJSON = "2"; // File size exceeds
                    }
                }
                else
                {
                    strJSON = "1"; // File is invalid
                }
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId);
                logger.LogError(ex);
                strJSON = "3"; // File upload failed
            }

            return strJSON;
        }

        /// <summary>
        /// This method is used to get the upload list on page initialization.
        /// </summary>
        /// <param name="uploadGroupId">Upload group Id</param>
        /// <param name="candidateId">Candidate Id</param>
        /// <returns>Returns the list of upload configuration.</returns>
        [WebMethod]
        public static string UploadIntialize(string uploadGroupId, long candidateId)
        {
            string strJson = string.Empty;
            GetAppSettingsKeys();
            SessionHelper sessionData = new SessionHelper();
            UploadUtiltiyDC objUploadDC = new UploadUtiltiyDC();
            objUploadDC.CandidateId = candidateId;
            objUploadDC.SessionId = int.Parse(sessionData.GetSessionValue("ssid").ToString());
            objUploadDC.RoleGroupId = int.Parse(sessionData.GetSessionValue("rgid").ToString());
            objUploadDC.UpGroupId = uploadGroupId;
            var con = new OBUtilityMethodsClient();
            try
            {
                con.Open();
                strJson = con.GetUploadList(objUploadDC);
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId);
                logger.LogError(ex);
            }
            finally
            {
                if (con.State != System.ServiceModel.CommunicationState.Faulted)
                {
                    con.Close();
                }
                else
                {
                    con.Abort();
                }

                con = null;
            }

            if (strJson.Length != 0)
            {
                PushJsonDataToSession(strJson, false);
            }

            return strJson;
        }

        /// <summary>
        /// This method is used to get the key values from web config.
        /// </summary>
        private static void GetAppSettingsKeys()
        {
            appId = int.Parse(ConfigurationManager.AppSettings["AppId"].ToString());
            ecmUserName = ConfigurationManager.AppSettings["ecmUserName"].ToString();
            ecmPassWord = ConfigurationManager.AppSettings["ecmPassword"].ToString();
            ecmSSOEnabled = bool.Parse(ConfigurationManager.AppSettings["IsECMSSOEnabled"].ToString());
            ecmSSOTokenName = ConfigurationManager.AppSettings["ECMSSOTokenName"].ToString();
            uploadUtilityURL = ConfigurationManager.AppSettings["UploadUtilityURL"].ToString();
        }

        /// <summary>
        /// This method will get the version of the document from ECM.
        /// </summary>
        /// <param name="contentID">ECM uploaded content Id</param>
        /// <param name="appID">On-Boarding ECM App Id</param>
        /// <returns>Returns the latest version of the content.</returns>
        private static int GetLatestdID(string contentID, int appID)
        {
            ECMSharedServices objECMSharedServices = new ECMSharedServices();
            return objECMSharedServices.GetLatestdIDForContent(contentID, null, appID);
        }

        /// <summary>
        /// This is used to push the data to session.
        /// </summary>
        /// <param name="xmlDoc">Input XML</param>
        private static void PushDataToSession(XmlDocument xmlDoc)
        {
            SessionHelper sessionData = new SessionHelper();
            UploadSessionStorageDCList objuploadSessionList = new UploadSessionStorageDCList();
            UploadSessionStorage objStores = new UploadSessionStorage();

            foreach (XmlNode nodes in xmlDoc.SelectNodes("Table/Upload/Data"))
            {
                UploadSessionStorage objStore = new UploadSessionStorage();
                objStore.UpId = nodes["UpId"].InnerText.ToString().Trim();
                objStore.ECMContentId = nodes["ECMDocumentContentId"].InnerText.ToString().Trim();
                objStore.MasterCopyContentId = nodes["MasterCopyContentId"].InnerText.ToString().Trim();
                objStore.TemplateContentId = nodes["DownloadTemplateContentId"].InnerText.ToString().Trim();
                objStore.DocumentId = int.Parse(nodes["DocumentId"].InnerText.Trim());
                objStore.FileContentId = nodes["SANFileContentId"].InnerText.ToString().Trim();
                objStore.FileUploadId = int.Parse(nodes["SANFileUploadId"].InnerText.ToString().Trim());
                objStore.SANDownloadURL = nodes["SANDownloadURL"].InnerText.ToString().Trim();
                objuploadSessionList.Add(objStore);
            }

            sessionData.SetSessionValue("UploadData", objuploadSessionList);
        }

        /// <summary>
        /// Represents the method push the data to session
        /// </summary>
        /// <param name="jsonData">input string data</param>
        /// <param name="chkSessionStorage">Check session storage</param>
        private static void PushJsonDataToSession(string jsonData, bool chkSessionStorage)
        {
            SessionHelper sessionData = new SessionHelper();
            UploadStorageData objUploadStorageData = new UploadStorageData();
            ////var listData = objUploadStorageData.UploadSessionStorageData.Find(delegate(UploadSessionStorage uss) { return uss.UpId == upId && uss.UpRunnerId == upRnId; });
            objUploadStorageData = JsonConvert.DeserializeObject<UploadStorageData>(jsonData);
            if (chkSessionStorage && objUploadStorageData.UploadSessionStorageData.Count > 0)
            {
                UploadStorageData objUploadStorageDatas = new UploadStorageData();
                objUploadStorageDatas = (UploadStorageData)sessionData.GetSessionValue("UploadData");
                var list = objUploadStorageData.UploadSessionStorageData[0];
                objUploadStorageDatas.UploadSessionStorageData.RemoveAll(s => s.UpId == list.UpId && s.UpRunnerId == list.UpRunnerId);
                objUploadStorageData.UploadSessionStorageData.AddRange(objUploadStorageDatas.UploadSessionStorageData);
            }

            sessionData.SetSessionValue("UploadData", objUploadStorageData);
        }

        #endregion Methods
    }
}
﻿//-----------------------------------------------------------------------=
// <copyright file="PhotoUpload.aspx.cs" company="Cognizant Technology Solutions">
// Copyright  . All Rights Reserved.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace            : OneC.OnBoarding.WebApp.Roles.NHPages.Singapore
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

namespace OneC.OnBoarding.WebApp.Roles.NHPages.Paperwork.Singapore
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
    /// Class for Photo Upload
    /// </summary>
    public partial class PhotoUpload : System.Web.UI.Page
    {
        #region Page initialization

        /// <summary>
        /// To get the Session Details
        /// </summary>
        private SessionDetails sessionDetail;
        #endregion
        #region Page Init

        /* Initializing global object for Utility class to access utility methods if required */

        /// <summary>
        /// To get the Utility Methods
        /// </summary>
        private Utility.UtilityMethods objUtil = new UtilityMethods();

        /// <summary>
        /// OB Utility Methods 
        /// </summary>       
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields", Justification = "Reviewed.")]
        private OBUtilityMethodsClient obj = new OBUtilityMethodsClient();

        /// <summary>
        /// Session Helper
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields", Justification = "Reviewed.")]
        private SessionHelper objSession = new SessionHelper();

        #region SendMail with NotificationID

        /// <summary>
        /// 208099:Method to send rejection mail
        /// </summary>
        /// <param name="notificationMasterID">To get the Notification Master ID</param>
        /// <param name="countryID">To get the Candidate Country ID</param>
        /// <param name="candidateID">To get the Candidate ID</param>
        /// <returns>Status of the Mail</returns>
        [WebMethod(BufferResponse = true, Description = "Method to send mail", EnableSession = true)]
        public static int SendRejectionMAil(int notificationMasterID, int countryID, int candidateID)
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
                MailData objMailData = new MailData();
                objMailData.NotificationMasterId = notificationMasterID;
                objMailData.CountryId = countryID;
                objMailData.SessionId = sessionId;
                objMailData.CandidateId = candidateID;
                objMailData.SpMode = 1;

                // SendMail(24, null, countryId);
                retStatus = clntUtility.SendNotificationMail(objMailData);
                //// clntUtility.Close();
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

        /// <summary>
        /// Method for Page Initialization
        /// </summary>
        /// <param name="sender">Sends the Data</param>
        /// <param name="e">This parameter helps in getting the Session details</param>
        protected void Page_init(object sender, EventArgs e)
        {
            /* Initialize session detail */
            if (this.objUtil.SessionDetail != null)
            {
                this.sessionDetail = this.objUtil.SessionDetail;
            }
        }
        #endregion

        /// <summary>
        /// Method for Page Load
        /// </summary>
        /// <param name="sender">Sends the Data</param>
        /// <param name="e">This parameter helps in getting the Session details</param>
        protected void Page_Load(object sender, EventArgs e)
        {
            if (this.sessionDetail == null)
            {
                this.sessionDetail = this.objUtil.SessionDetail;
            }
        }

        /// <summary>
        /// Method to get the File Upload
        /// </summary>
        /// <param name="sender">Sends the Data</param>
        /// <param name="e">To get the attachment Size</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", Justification = "Reviewed")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields", Justification = "Reviewed.")]
        protected void Button1_Click(object sender, EventArgs e)
        {
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
                    else
                    {
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
                        byte[] buffer = binaryReader.ReadBytes((int)totalBytes); // Changed Int32 to int
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
                        //// fileStream.Close();
                        fileStream.Dispose();
                        binaryReader.Close();
                        buffer = null;
                        if (File.Exists(tempFileName))
                        {
                            File.Delete(tempFileName);
                        }
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
        }

        /// <summary>
        /// Method for File Upload
        /// </summary>
        /// <param name="sender">Sends the Data</param>
        /// <param name="e">To get the size of the attachment</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", Justification = "Reviewed")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields", Justification = "Reviewed.")]
        protected void Button2_Click(object sender, EventArgs e)
        {
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
                    byte[] buffer = binaryReader.ReadBytes((int)totalBytes); // Changed Int32 to int
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
                    //// fileStream.Close();
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
                    // Page.ClientScript.RegisterStartupScript(this.GetType(), "UploadMessage", message, true);
                }
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(this.sessionDetail.SessionId);
                logger.LogError(ex);
            }
        }
    }
}

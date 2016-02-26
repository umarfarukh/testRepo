//-----------------------------------------------------------------------=
// <copyright file="UploadFileDashboardWithResponse.aspx.cs" company="Cognizant Technology Solutions">
// Copyright  . All Rights Reserved.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp.CommonPages
 * Class Name       : UploadFileDashboardWithResponse
 * Version          : 1.0
 * Type             : WebPage class
 * Purpose          : To upload file to SAN along with Response 
 * Created date     : 2014-SEP-10
 * Author           : 312020
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

namespace OneC.OnBoarding.WebApp.CommonPages
{
    #region Imported Namespaces
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.SqlClient;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Web;
    using System.Web.Services;
    using System.Web.Services.Description;
    using System.Web.UI;
    using System.Web.UI.WebControls;
    using OneC.OnBoarding.DC.CandidateDC;
    using OneC.OnBoarding.DC.DashBoardDC;
    using OneC.OnBoarding.DC.UtilityDC;
    using OneC.OnBoarding.WebApp.Service.CandidateServices;
    using OneC.OnBoarding.WebApp.Service.DashBoardServices;
    using OneC.OnBoarding.WebApp.Service.OBUtilityMethods;
    using OneC.OnBoarding.WebApp.Utility;
    #endregion Imported NameSpaces

    /// <summary>
    /// Class to upload file with response
    /// </summary>
    public partial class UploadFileDashboardWithResponse : System.Web.UI.Page
    {
        /// <summary>
        /// To save FileContentId;
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("StyleCop.CSharp.MaintainabilityRules", "SA1401:FieldsMustBePrivate", Justification = "Reviewed.")]
        public string FileContentId;

        /// <summary>
        /// To get the Utility Methods
        /// </summary>
        private Utility.UtilityMethods objUtil = new UtilityMethods();

        /// <summary>
        /// To get the OB Utility Methods
        /// </summary>
        private OBUtilityMethodsClient obj = new OBUtilityMethodsClient();

        //// <summary>
        //// To get the Session Details 
        //// </summary>
        ////private SessionHelper objSession = new SessionHelper();

        //// <summary>
        //// To get the Approval Details
        //// </summary>
        ////private ApprovalDetails objApprovalDetails = new ApprovalDetails();

        //// <summary>
        //// To identify the Contractor status using Flag
        //// </summary>
        ////private short contractorFlag;

        #region Page initialization

        /// <summary>
        /// To get the Session Details
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields", Justification = "Reviewed.")]
        private SessionDetails sessionDetail;

        /// <summary>
        /// To get the File URL
        /// </summary>
        private string fileurl = string.Empty;

        /// <summary>
        /// To get the File UploadID
        /// </summary>
        private int fileUploadId;

        /// <summary>
        /// To get the File Name
        /// </summary>
        private string fileName;

        /// <summary>
        /// To get the Response
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields", Justification = "Reviewed.")]
        private string response;

        #endregion

        #region Page Event handlers

        /// <summary>
        /// Method to get the Candidate Location i.e., candidate belongs to which country
        /// </summary>
        /// <param name="mode">To get the Mode of the country</param>
        /// <param name="parentcode">To get the parent code of the country</param>
        /// <param name="candidateId">To get the candidate ID</param>
        /// <returns>Country Code and Description</returns>
        public string[] GetGeographyMaster(int mode, int parentcode, int candidateId)
        {
            string[] arr4 = new string[3];
            CandidateServicesClient objService = new CandidateServicesClient();
            Country objCountry = new Country();
            objCountry.Mode = mode;
            objCountry.ParentId = parentcode;
            objCountry.CandidateId = candidateId;
            CountryListSource countryData = objService.GetGeographyMaster(objCountry);
            CountryList objlist = countryData.CountryData;
            foreach (Country ml in objlist)
            {
                // arr4[0] = ml.CountryCode;
                // arr4[1] = ml.CountryDescription;
                if (mode == 22)
                {
                    arr4[0] = ml.CountryCode.Split('~')[0];
                    arr4[1] = ml.CountryDescription;
                    if (ml.CountryCode.Contains("~"))
                    {
                        arr4[2] = ml.CountryCode.Split('~')[1];
                    }
                }
                else if (mode == 46)
                {
                    arr4[0] = ml.CountryCode;
                    arr4[1] = ml.CountryDescription;
                }
                else
                {
                    arr4[0] = ml.CountryCode;
                    arr4[1] = ml.CountryDescription;
                }
            }

            return arr4;
        }

        /// <summary>
        /// Method to get the Details of the File Uploaded by the candidate
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", Justification = "Reviewed")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields", Justification = "Reviewed.")]
        public void UploadFile()
        {
            string message;
            string cand = Request.QueryString["cand"];
            string sessionId = Request.QueryString["SessionId"];
            //// short
            ////this.contractorFlag = Convert.ToInt16(Request.QueryString["IsCont"]);

            CandidateServicesClient objCandClient = new CandidateServicesClient();
            CandidateDetail objCandidateDetail = new CandidateDetail();

            objCandidateDetail.CandidateId = Convert.ToInt64(cand);

            OneC.OnBoarding.DC.CandidateDC.CandidateDetail[] objCandDetail = objCandClient.FetchCandidateId(objCandidateDetail);

            string candidateId = objCandDetail[0].CandidateId.ToString();

            string tempPath = Server.MapPath("~/Temp/");
            string tempFileName = tempPath + "RCApprovalMail" + Path.GetExtension(this.FileUpload1.PostedFile.FileName);

            this.FileUpload1.SaveAs(tempFileName);
            string ext = Path.GetExtension(tempFileName).ToLower();
            string contenttype = string.Empty;
            switch (ext)
            {
                case ".msg":
                    contenttype = "application/msg";
                    break;

                case ".zip":
                    contenttype = "application/zip";
                    break;

                case ".jpg":
                    contenttype = "application/jpg";
                    break;

                case ".jpeg":
                    contenttype = "application/jpeg";
                    break;

                case ".doc":
                    contenttype = "application/doc";
                    break;

                case ".docx":
                    contenttype = "application/docx";
                    break;
            }

            if (ext == ".msg" || ext == ".zip" || ext == ".jpg" || ext == ".jpeg" || ext == ".doc" || ext == ".docx")
            {
                System.IO.FileStream fileStream = new System.IO.FileStream(tempFileName, System.IO.FileMode.Open, System.IO.FileAccess.Read);
                System.IO.BinaryReader binaryReader = new System.IO.BinaryReader(fileStream);
                long totalBytes = new System.IO.FileInfo(tempFileName).Length;
                byte[] buffer = binaryReader.ReadBytes((int)totalBytes);

                int appId = 2; // This is common keyId 
                OBUtilityMethodsClient obj = new OBUtilityMethodsClient();
                SystemKey sysKey = new SystemKey();

                sysKey.KeyId = 62;
                sysKey = obj.GetSystemKey(sysKey);

                FileUploadService.FileUploadDetailsRequest objFileUploadDetailsRequest = new FileUploadService.FileUploadDetailsRequest();
                FileUploadService.MFileuploadResponse objMFileuploadResponse = new FileUploadService.MFileuploadResponse();
                FileUploadService.DocumentUploadServiceClient objDocumentUploadServiceClient = new FileUploadService.DocumentUploadServiceClient();
                objFileUploadDetailsRequest.AppId = appId;
                objFileUploadDetailsRequest.AppTemplateId = sysKey.KeyValue;
                string fileName = this.FileUpload1.FileName;
                objFileUploadDetailsRequest.FileName = fileName;
                objFileUploadDetailsRequest.IncomingFile = buffer;
                objFileUploadDetailsRequest.AssociateId = Convert.ToInt32(candidateId.ToString());
                objFileUploadDetailsRequest.CreatedBy = candidateId.ToString();
                objFileUploadDetailsRequest.CreatedDate = DateTime.UtcNow;
                objMFileuploadResponse = objDocumentUploadServiceClient.UploadFile_WithResponse(objFileUploadDetailsRequest); // 312020
                
                this.FileContentId = objMFileuploadResponse.FileContentId.ToString();
                this.response = objMFileuploadResponse.Filestatus;             
                fileStream.Close();
                //// fileStream.Dispose();
                binaryReader.Close();
                buffer = null;

                if (File.Exists(tempFileName))
                {
                    File.Delete(tempFileName);
                }

                message = "alert('File Uploaded Successfully')";
                Page.ClientScript.RegisterStartupScript(this.GetType(), "UploadMessage", message, true);

                StartDateAndLocationDC objStartdate = new StartDateAndLocationDC();
                objStartdate.CandidateId = Convert.ToInt32(candidateId);
                objStartdate.FileContentId = this.FileContentId;
                objStartdate.SessionId = Convert.ToInt32(sessionId);
                objStartdate.Mode = 0;
                obj.UpdateCandidateStateAndLocationDetails(objStartdate);
                string[] objarray;
                objarray = this.GetGeographyMaster(59, 1, Convert.ToInt32(candidateId));
                string filename = Convert.ToString(objarray[1].ToString());
                this.urllink1.Visible = true;
                string[] name = filename.Split('#');
                this.urllink1.Text = name[1];

                message = "alert('Please upload  a valid file')";
                Page.ClientScript.RegisterStartupScript(this.GetType(), "UploadMessage", message, true);
            }
        }
        #endregion

        /// <summary>
        /// Method for page load
        /// </summary>
        /// <param name="sender">object sender </param>
        /// <param name="e">event e</param>
        protected void Page_Load(object sender, EventArgs e)
        {      
            if (!this.IsPostBack)
            {
                ////CandidateServicesClient objCID = new CandidateServicesClient();
                ////Utility.UtilityMethods objUtil = new UtilityMethods();

                ////CandidateDetail[] objStateformlist = objCID.FetchStateTaxFormList();

                CandidateDetail objCandidateDetail = new CandidateDetail();

                string cand = Request.QueryString["cand"];
                objCandidateDetail.CandidateId = Convert.ToInt64(cand);

                CandidateServicesClient objCandClient = new CandidateServicesClient();
                OneC.OnBoarding.DC.CandidateDC.CandidateDetail[] objCandDetail = objCandClient.FetchCandidateId(objCandidateDetail);

                string candidateId = objCandDetail[0].CandidateId.ToString();

                string[] objarray = this.GetGeographyMaster(59, 1, Convert.ToInt32(candidateId));

                if (!string.IsNullOrEmpty(objarray[1].ToString()))
                {
                    this.fileurl = Convert.ToString(objarray[1].ToString());
                    string[] name = this.fileurl.Split('#');
                    this.urllink1.Text = name[1];
                }
                else
                {
                    this.urllink1.Text = string.Empty;
                    this.urllink1.Visible = false;
                }               
            }
        }

        /// <summary>
        /// Method to get the file Uploaded Details
        /// </summary>
        /// <param name="sender">To Send the Data to get the </param>
        /// <param name="e">To get the file upload details</param>
        protected void BtnUpload_Click(object sender, EventArgs e)
        {
            string message;
            string cand = Request.QueryString["cand"];
            string[] objarray;
            try
            {
                if (this.FileUpload1.HasFile)
                {
                    objarray = this.GetGeographyMaster(59, 1, Convert.ToInt32(cand));
                    if (!string.IsNullOrEmpty(objarray[1].ToString()))
                    {
                        this.fileurl = Convert.ToString(objarray[1].ToString());
                    }
                    else
                    {
                        this.fileurl = string.Empty;
                    }

                    //// File must be 400kb or smaller
                    if (this.FileUpload1.PostedFile.ContentLength > 409600)
                    {
                        message = "alert('Max Upload size is 400 KB')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "UploadMessage", message, true);
                    }
                    else if (string.IsNullOrEmpty(this.fileurl))
                    {
                        this.UploadFile();
                    }
                    else if (!string.IsNullOrEmpty(this.fileurl))
                    {
                        string confirmValue = Request.Form["confirm_value"];
                        if (confirmValue == "Yes")
                        {
                            this.UploadFile();
                        }
                        else
                        {
                            return;
                        }
                    }
                }
                else
                {
                    message = "alert('Please select a file')";
                    Page.ClientScript.RegisterStartupScript(this.GetType(), "UploadMessage", message, true);
                }
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger();
                logger.LogError(ex);
            }
        }

        /// <summary>
        /// Method for Page Initialization
        /// </summary>
        /// <param name="sender">Sends the Session Detail</param>
        /// <param name="e">To get the Session Details</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields", Justification = "Reviewed.")]
        protected void Page_init(object sender, EventArgs e)
        {
            /* Initialize session detail */
            if (this.objUtil.SessionDetail != null)
            {
                this.sessionDetail = this.objUtil.SessionDetail;
            }
        }

        /// <summary>
        /// Method to get the details of the candidate on clicking the URL Link
        /// </summary>
        /// <param name="sender">Sends the Data</param>
        /// <param name="e">To get the Candidate details</param>
        protected void Urllink1_Click(object sender, EventArgs e)
        {
            string[] objarray;
            string cand = Request.QueryString["cand"];
            CandidateServicesClient objCandClient = new CandidateServicesClient();
            CandidateDetail objCandidateDetail = new CandidateDetail();
            SystemKey sysKey = new SystemKey();
            objCandidateDetail.CandidateId = Convert.ToInt64(cand);
            OneC.OnBoarding.DC.CandidateDC.CandidateDetail[] objCandDetail = objCandClient.FetchCandidateId(objCandidateDetail);

            string candidateId = objCandDetail[0].CandidateId.ToString();
            objarray = this.GetGeographyMaster(59, 1, Convert.ToInt32(candidateId));
            sysKey.KeyId = 62;
            sysKey = this.obj.GetSystemKey(sysKey);

            //// Guid filecontentid = new Guid(objarray[2].ToString());File Content ID
            Guid fileContentId = Guid.Empty;
            if (!string.IsNullOrEmpty(objarray[0].ToString()) && !string.IsNullOrEmpty(objarray[1].ToString()))
            {
                FileUploadService.FileUploadDC objFileUploadDC = new FileUploadService.FileUploadDC();
                FileUploadService.MFileuploadResponse objMFileuploadResponse = new FileUploadService.MFileuploadResponse();
                FileUploadService.DocumentUploadServiceClient objDocumentUploadServiceClient = new FileUploadService.DocumentUploadServiceClient();
                this.fileUploadId = Convert.ToInt32(objarray[0].ToString());
                this.fileurl = Convert.ToString(objarray[1].ToString());
                objFileUploadDC.FileUploadId = this.fileUploadId;
                objFileUploadDC.FileContentId = Guid.Parse(fileContentId.ToString());
                objFileUploadDC.AppTemplateId = sysKey.KeyValue;

                objMFileuploadResponse = objDocumentUploadServiceClient.DownloadFile(objFileUploadDC);

                this.fileName = objMFileuploadResponse.FileName;
                if (objMFileuploadResponse.OutgoingFile.Length > 0)
                {
                    HttpResponse respnse = HttpContext.Current.Response;
                    respnse.Clear();
                    respnse.ClearContent();
                    respnse.ClearHeaders();
                    respnse.Buffer = true;

                    respnse.AddHeader("Content-Disposition", "attachment;filename=\"" + this.fileName + "\"");
                    respnse.BinaryWrite(objMFileuploadResponse.OutgoingFile);
                    respnse.End();
                }
                else
                {
                    return;
                }
            }
        }
    }
}
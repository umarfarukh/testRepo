//-----------------------------------------------------------------------=
// <copyright file="StateW4Form.aspx.cs" company="Cognizant Technology Solutions">
// Copyright  . All Rights Reserved.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace            : OneC.OnBoarding.WebApp.NHPages.United States     
 * Interface Name       : IDashBoardServices.cs
 * Version              : 1.0
 * Type                 : Interface
 * Purpose              : 
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
namespace OneC.OnBoarding.WebApp.Roles.NHPages.Paperwork.US
{
    #region Imported Namespaces
    using System;
    using System.Collections;
    using System.Data;
    using System.Data.SqlClient;
    using System.IO;
    using System.Text;
    using System.Web;
    using System.Web.Services.Description;
    using System.Web.UI;
    using System.Web.UI.WebControls;
    using OneC.OnBoarding.DC.CandidateDC;
    using OneC.OnBoarding.DC.UtilityDC;
    using OneC.OnBoarding.WebApp.Service.CandidateServices;
    using OneC.OnBoarding.WebApp.Service.OBUtilityMethods;    
    using OneC.OnBoarding.WebApp.Utility;
    #endregion Imported Namespaces
  
    /// <summary>
    /// Class hold all the State Form Details
    /// </summary>
    public partial class StateW4Form : System.Web.UI.Page
    {
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

       // /// <summary>
       // /// Session ID
       // /// </summary>
       // private long sessionId;

        /// <summary>
        /// Candidate ID
        /// </summary>
       private long candidateId;

        /// <summary>
        /// Country ID
        /// </summary>
       private int countryId;

        /// <summary>
        /// Task ID
        /// </summary>
       private int taskId;

        /// <summary>
        /// Mode : Location
        /// </summary>
       private int mode;
        
        /// <summary>
        /// Upload Mode
        /// </summary>
       private int uploadMode = 0; // 0 - SAN; 1 - ECM;

        #region Page initialization

        /// <summary>
        /// Session Details
        /// </summary>
        private SessionDetails sessionDetail;
        #endregion

        /// <summary>
        /// Method to Get the Geography Master Details
        /// </summary>
        /// <param name="mode">Mode Details</param>
        /// <param name="parentcode">Country Code</param>
        /// <param name="candidateId">To get the particular Location for particular Candidate ID</param>
        /// <returns>Country List</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", MessageId = "candidateId", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", MessageId = "mode", Justification = "Reviewed.")]
        public string[] GetGeographyMaster(int mode, int parentcode, int candidateId)
        {
            ////ArrayList retobjGeo = new ArrayList();
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
                if (mode == 21)
                {
                    arr4[0] = ml.CountryCode.Split('~')[0];
                    arr4[1] = ml.CountryDescription;
                    if (ml.CountryCode.Contains("~"))
                    {
                        arr4[2] = ml.CountryCode.Split('~')[1];
                    }
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

            this.hdnSessionId.Value = this.sessionDetail.SessionId.ToString();

            // sessionId = Convert.ToInt64(sessionDetail.SessionId);
            this.candidateId = Convert.ToInt64(Request.QueryString["cand"]);
            this.hdnCandidateId.Value = this.candidateId.ToString();

            this.countryId = Convert.ToInt32(Request.QueryString["cntry"]);
            this.hdnCountryId.Value = this.countryId.ToString();

            this.taskId = Convert.ToInt32(Request.QueryString["task"]);
            this.hdnId.Value = this.taskId.ToString();

            this.mode = Convert.ToInt32(Request.QueryString["opmde"]);
            this.hdnMode.Value = this.mode.ToString();

            this.uploadMode = Convert.ToInt32(Request.QueryString["upmde"]);
            this.hdnUploadMode.Value = this.uploadMode.ToString();
        }

        #region Page Event handlers

        /// <summary>
        /// Method for Page Load
        /// </summary>
        /// <param name="sender">Sends the Data</param>
        /// <param name="e">This parameter helps in getting the Session details</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", MessageId = "candidateId", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", MessageId = "objUtil", Justification = "Reviewed.")]
        protected void Page_Load(object sender, EventArgs e)
        {
            CandidateServicesClient objCID = new CandidateServicesClient();
            ////Utility.UtilityMethods objUtil = new UtilityMethods();

            CandidateDetail objCandidateDetail = new CandidateDetail();
            string cand = Request.QueryString["cand"];
            objCandidateDetail.CandidateId = Convert.ToInt64(cand);

            CandidateDetail[] objStateformlist = objCID.FetchStateTaxFormList(objCandidateDetail);
            StringBuilder startTag = new StringBuilder(); // endTag, newTable;

            startTag.Append("<TABLE id='mainTable'><TBODY><TR><TD class='pageHeader' style=\"WIDTH: 18%;\">State</TD><TD class='pageHeader' style=\"WIDTH: 80%;\">Remarks</TD></TR>");

            foreach (CandidateDetail formlist in objStateformlist)
            {
                if (formlist.CUserDefined2 == null || string.IsNullOrEmpty(formlist.CUserDefined2) || string.IsNullOrEmpty(formlist.CUserDefined2))
                {
                    startTag.Append("<TR><TD>" + formlist.CDescription + "</TD><TD>" + formlist.CUserDefined1 + "</TD></TR>");
                }
                else
                {
                    startTag.Append("<TR><TD><a href='" + formlist.CUserDefined2 + "' target='_blank'>" + formlist.CDescription + "</a></TD><TD>" + formlist.CUserDefined1 + "</TD></TR>");
                }
            }

            startTag.Append("</TBODY></TABLE>");
            this.tableDiv.InnerHtml = startTag.ToString();

            //CandidateDetail objCandidateDetail = new CandidateDetail();
            //string cand = Request.QueryString["cand"];
            //objCandidateDetail.CandidateId = Convert.ToInt64(cand);

            CandidateServicesClient objCandClient = new CandidateServicesClient();
            OneC.OnBoarding.DC.CandidateDC.CandidateDetail[] objCandDetail = objCandClient.FetchCandidateId(objCandidateDetail);

            // Mckinley Candidate Changing text
            string candidateId = objCandDetail[0].CandidateId.ToString();
            int isMigratedCandidate = objCandDetail[0].MigratedCandidate;

            if (isMigratedCandidate == 2)
            {
                this.MckinleyText.Style.Add("display", "block");
            }
            else
            {
                this.changetext.Style.Add("display", "block");
            }

            if (this.uploadMode == 1)
            {
                this.trSanControls.Visible = false;
                this.divSanUpload.Visible = false;
            }

            if (this.uploadMode == 0)
            {
                // Disabling the controls if the logged in user is HRSS...
                if (Request.QueryString["opmde"] != null && Request.QueryString["opmde"] == "1")
                {
                    this.btnDelete.Enabled = false;
                    this.FileUpload1.Enabled = false;
                    this.btnUpload.Enabled = false;
                }

                string fileurl = string.Empty;
                ////ArrayList retobjGeo = new ArrayList();
                string[] objarray = this.GetGeographyMaster(21, 1, Convert.ToInt32(candidateId));
                if (!string.IsNullOrEmpty(objarray[1].ToString()) && objarray[1].ToString() != null)
                {
                    fileurl = Convert.ToString(objarray[1].ToString());
                    string[] name = fileurl.Split('#');
                    string urlPath = name[0];
                    string finalurl = "../../../NHPages/Paperwork/CommonNHPages/UrlPopUp.htm?PopUp=" + urlPath;

                    // Page.ClientScript.RegisterStartupScript(this.GetType(), "OpenPop", URLPath, true);
                    // urllink.NavigateUrl = name[0];
                    this.urllink.Text = name[1];
                    this.urllink.Attributes.Add("href", finalurl);
                    this.FileUpload1.Enabled = false;
                }
                else
                {
                    this.urllink.Visible = false;
                    this.btnDelete.Visible = false;
                }

                // Check for Associate Id Generated or not
                // int flag = objCandDetail[0].Flag;
                // if (flag == 1)
                //    {
                //    if (fileurl == string.Empty)
                //    {
                //        btnDelete.Visible = false;
                //        FileUpload1.Enabled = true;
                //    }
                //    else
                //    {
                //        btnDelete.Visible = true;
                //        FileUpload1.Enabled = false;
                //        btnUpload.Enabled = false;
                //    }
                // }
                // else
                // {
                //    btnDelete.Enabled = false;
                //    FileUpload1.Enabled = false;
                //    btnUpload.Enabled = false;
                // }
            }
        }

        /// <summary>
        /// Method to get the File Upload
        /// </summary>
        /// <param name="sender">Sends the Data</param>
        /// <param name="e">To get the attachment Size</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", MessageId = "candidateId", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", MessageId = "obj", Justification = "Reviewed.")]
        protected void BtnUpload_Click(object sender, EventArgs e)
        {
            string message;
            string urlPath;
            try
            {
                if (this.FileUpload1.HasFile)
                {
                    if (this.FileUpload1.PostedFile.ContentLength > 2097152)
                    {
                        message = "alert('Max Upload size is 2 MB')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "UploadMessage", message, true);
                    }
                    else
                    {
                        CandidateServicesClient objCandClient = new CandidateServicesClient();
                        CandidateDetail objCandidateDetail = new CandidateDetail();
                        string cand = Request.QueryString["cand"];
                        objCandidateDetail.CandidateId = Convert.ToInt64(cand);

                        OneC.OnBoarding.DC.CandidateDC.CandidateDetail[] objCandDetail = objCandClient.FetchCandidateId(objCandidateDetail);

                        string candidateId = objCandDetail[0].CandidateId.ToString();

                        string tempPath = Server.MapPath("~/Temp/");
                        string tempFileName = tempPath + "StateW4Form" + Path.GetExtension(this.FileUpload1.PostedFile.FileName);

                        this.FileUpload1.SaveAs(tempFileName);
                        string ext = Path.GetExtension(tempFileName).ToLower();
                        string contenttype = string.Empty;
                        switch (ext)
                        {
                            case ".pdf":
                                contenttype = "application/pdf";
                                break;

                            case ".bmp":
                                contenttype = "application/bmp";
                                break;

                            // case ".doc":
                            // contenttype = "application/doc";
                            // break;
                            case ".jpg":
                                contenttype = "application/jpg";
                                break;

                            case ".png":
                                contenttype = "application/png";
                                break;

                            case ".tif":
                                contenttype = "application/tif";
                                break;

                            // case ".zip":
                            // contenttype = "application/zip";
                            // break;
                            case ".jpeg":
                                contenttype = "application/jpeg";
                                break;

                            case ".tiff":
                                contenttype = "application/tiff";
                                break;
                        }

                        if (ext == ".pdf" || ext == ".bmp" || ext == ".jpg" || ext == ".png" || ext == ".tif" || ext == ".jpeg" || ext == ".tiff")
                        {
                            System.IO.FileStream fileStream = new System.IO.FileStream(tempFileName, System.IO.FileMode.Open, System.IO.FileAccess.Read);
                            System.IO.BinaryReader binaryReader = new System.IO.BinaryReader(fileStream);
                            long totalBytes = new System.IO.FileInfo(tempFileName).Length;
                            byte[] buffer = binaryReader.ReadBytes((int)totalBytes); // Changed int32 to int

                            int appId = 2; // This is common keyId 
                            OBUtilityMethodsClient obj = new OBUtilityMethodsClient();
                            SystemKey sysKey = new SystemKey();

                            sysKey.KeyId = 38;
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
                            ////objMFileuploadResponse = objDocumentUploadServiceClient.UploadFile(objFileUploadDetailsRequest);

                            ////string response = objMFileuploadResponse.Filestatus;

                            fileStream.Close();
                            ////fileStream.Dispose();
                            binaryReader.Close();
                            buffer = null;

                            if (File.Exists(tempFileName))
                            {
                                File.Delete(tempFileName);
                            }

                            message = "alert('File Uploaded Successfully')";
                            Page.ClientScript.RegisterStartupScript(this.GetType(), "UploadMessage", message, true);

                            ////ArrayList retobjGeo = new ArrayList();

                            string[] objarray = this.GetGeographyMaster(21, 1, Convert.ToInt32(candidateId));
                            string filename = Convert.ToString(objarray[1].ToString());
                            this.urllink.Visible = true;
                            string[] name = filename.Split('#');
                            urlPath = name[0];

                            // Page.ClientScript.RegisterStartupScript(this.GetType(), "OpenPop", URLPath, true);
                            // urllink.NavigateUrl = name[0];
                            string finalurl = "../../../NHPages/Paperwork/CommonNHPages/UrlPopUp.htm?PopUp=" + urlPath;
                            this.urllink.Text = name[1];
                            this.urllink.Attributes.Add("href", finalurl);

                            this.FileUpload1.Enabled = false;
                            this.btnUpload.Enabled = false;
                            this.btnDelete.Visible = true;
                        }
                        else
                        {
                            message = "alert('Please upload  a valid file')";
                            Page.ClientScript.RegisterStartupScript(this.GetType(), "UploadMessage", message, true);
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
        /// Method for Deleting
        /// </summary>
        /// <param name="sender">To delete the Data</param>
        /// <param name="e">For Deleting</param>
         [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", MessageId = "candidateId", Justification = "Reviewed.")]
         [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", MessageId = "obj", Justification = "Reviewed.")]
         [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", MessageId = "objUtil", Justification = "Reviewed.")]
         [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", MessageId = "taskId", Justification = "Reviewed.")]
         [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        protected void BtnDelete_Click(object sender, EventArgs e)
        {
            CandidateServicesClient objCID = new CandidateServicesClient();
            ////Utility.UtilityMethods objUtil = new UtilityMethods();
            CandidateDetail objCandidateDetail = new CandidateDetail();
            string cand = Request.QueryString["cand"];
            string sessionId = Request.QueryString["ss"];
            string taskId = Request.QueryString["task"];
            objCandidateDetail.CandidateId = Convert.ToInt64(cand);
            objCandidateDetail.DeleteFlag = 1; // sending Flag to update Task Status of Deleted
            objCandidateDetail.TaskId = Convert.ToInt32(taskId);
            objCandidateDetail.SessionId = Convert.ToInt64(sessionId);
            CandidateDetail[] objCandDetail = objCID.FetchCandidateId(objCandidateDetail);
            CandidateServicesClient objCandClient = new CandidateServicesClient();
            objCandDetail = objCandClient.FetchCandidateId(objCandidateDetail);
            string candidateId = objCandDetail[0].CandidateId.ToString();
            ////ArrayList retobjGeo = new ArrayList();
            string[] objarray = this.GetGeographyMaster(21, 1, Convert.ToInt32(candidateId));
            int fileid = Convert.ToInt32(objarray[0].ToString());
            Guid filecontentid = new Guid(objarray[2].ToString()); // File Content ID
            this.hdnUploadId.Value = fileid.ToString();
            string message;
            OBUtilityMethodsClient obj = new OBUtilityMethodsClient();
            SystemKey sysKey = new SystemKey();
            sysKey.KeyId = 38;
            sysKey = obj.GetSystemKey(sysKey);
            FileUploadService.FileUploadDetailsRequest objFileUploadDetailsRequest = new FileUploadService.FileUploadDetailsRequest();
            FileUploadService.MFileuploadResponse objMFileuploadResponse = new FileUploadService.MFileuploadResponse();
            FileUploadService.DocumentUploadServiceClient objDocumentUploadServiceClient = new FileUploadService.DocumentUploadServiceClient();
            objFileUploadDetailsRequest.AppTemplateId = sysKey.KeyValue;
            objFileUploadDetailsRequest.FileUploadId = Convert.ToInt32(this.hdnUploadId.Value);
            objFileUploadDetailsRequest.CreatedBy = candidateId.ToString();
            objFileUploadDetailsRequest.FileContentId = filecontentid;
            objMFileuploadResponse = objDocumentUploadServiceClient.DeleteFileUploadDetails(objFileUploadDetailsRequest);
            ////string response = objMFileuploadResponse.Filestatus;
            this.urllink.Text = string.Empty;
            this.btnDelete.Visible = false;
            this.FileUpload1.Enabled = true;
            this.btnUpload.Enabled = true;
            message = "alert('File Deleted Successfully')";
            Page.ClientScript.RegisterStartupScript(this.GetType(), "UploadMessage", message, true);
            string ondelete = "<script type='text/javascript'>OnDeleting();</script>";
            ClientScript.RegisterStartupScript(this.GetType(), "Delete1", ondelete);
            if (string.IsNullOrEmpty(objarray[1].ToString()))
            {
                this.urllink.Visible = false;
            }
        }
    }
}
        #endregion Page Event handlers

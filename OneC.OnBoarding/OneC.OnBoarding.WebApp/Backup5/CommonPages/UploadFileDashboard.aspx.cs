//-----------------------------------------------------------------------=
// <copyright file="UploadFileDashboard.aspx.cs" company="Cognizant Technology Solutions">
// Copyright  . All Rights Reserved.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp.CommonPages
 * Class Name       : OnBoardingContent
 * Version          : 1.0
 * Type             : WebPage class
 * Purpose          : Landing page of onboarding
 * Created date     : 2012-Jan-01
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
    #endregion Imported Namespaces

    /// <summary>
    /// This Class helps in getting the File uploaded in the DashBoard
    /// </summary>
    public partial class UploadFileDashboard : System.Web.UI.Page
    {
        /// <summary>
        /// To get the Utility Methods
        /// </summary>
        private Utility.UtilityMethods objUtil = new UtilityMethods();

        /// <summary>
        /// To get the OB Utility Methods
        /// </summary>
        private OBUtilityMethodsClient obj = new OBUtilityMethodsClient();

        /// <summary>
        /// To get the Session Details 
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields", Justification = "Reviewed.")]
        private SessionHelper objSession = new SessionHelper();

        /// <summary>
        /// To get the Approval Details
        /// </summary>
        private ApprovalDetails objApprovalDetails = new ApprovalDetails();

        /// <summary>
        /// To identify the Contractor status using Flag
        /// </summary>
        private short contractorFlag;

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

        /// <summary>
        /// To get the Equipment 
        /// </summary>
        private Dictionary<int, string> equipmentDic = new Dictionary<int, string>();

        #region Page Event handlers

        /// <summary>
        /// A web method to Fetch the Associate Data i.e., Associate Name and Designation
        /// </summary>
        /// <param name="associateId">To get the Associate ID for a particular Candidate</param>
        /// <returns>Associate Name and Designation</returns>
        [WebMethod]
        public static string FetchAssociateData(int associateId)
        {
            try
            {
                DataSet datsetAssociatedetail = new DataSet();
                ApprovalDetails objApprovalDetails = new ApprovalDetails();
                objApprovalDetails.ApproverId = associateId;

                // objApprovalDetails.ContractorEquipment = ContractorEquipmentId;
                //// DashBoardServicesClient objDashBoardClient = new DashBoardServicesClient();
                string nameDesignation = string.Empty;

                using (DashBoardServicesClient objDashBoardServicesClient = new DashBoardServicesClient())
                {
                    datsetAssociatedetail = objDashBoardServicesClient.FetchAssetApprovalRequestData(objApprovalDetails);
                    if ((datsetAssociatedetail != null) && (datsetAssociatedetail.Tables[0].Rows.Count > 0))
                    {
                        foreach (DataRow datrowAssociatedetail in datsetAssociatedetail.Tables[0].Rows)
                        {
                            nameDesignation = datrowAssociatedetail[0].ToString() + "/" + datrowAssociatedetail[1].ToString();
                        }
                    }
                    else
                    {
                        nameDesignation = string.Empty;
                    }
                }

                return nameDesignation;
            }
            catch (Exception)
            {
                throw;
            }
        }

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
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1505:AvoidUnmaintainableCode", Justification = "reviewed")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", MessageId = "contenttype", Justification = "reviewed")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", Justification = "Reviewed")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields", Justification = "Reviewed.")]
        public void UploadFile()
        {
            string message;
            string cand = Request.QueryString["cand"];
            //// short
            this.contractorFlag = Convert.ToInt16(Request.QueryString["IsCont"]);

            CandidateServicesClient objCandClient = new CandidateServicesClient();
            CandidateDetail objCandidateDetail = new CandidateDetail();

            objCandidateDetail.CandidateId = Convert.ToInt64(cand);

            OneC.OnBoarding.DC.CandidateDC.CandidateDetail[] objCandDetail = objCandClient.FetchCandidateId(objCandidateDetail);

            string candidateId = objCandDetail[0].CandidateId.ToString();

            string tempPath = Server.MapPath("~/Temp/");
            string tempFileName = tempPath + "NSSApprovalMail" + Path.GetExtension(this.FileUpload1.PostedFile.FileName);

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
                FileUploadService.DocumentUploadServiceClient objDocumentUploadServiceClient = new FileUploadService.DocumentUploadServiceClient("BasicHttpMtomBinding");
                objFileUploadDetailsRequest.AppId = appId;
                objFileUploadDetailsRequest.AppTemplateId = sysKey.KeyValue;
                string fileName = this.FileUpload1.FileName;
                objFileUploadDetailsRequest.FileName = fileName;
                objFileUploadDetailsRequest.IncomingFile = buffer;
                objFileUploadDetailsRequest.AssociateId = Convert.ToInt32(candidateId.ToString());
                objFileUploadDetailsRequest.CreatedBy = candidateId.ToString();
                objFileUploadDetailsRequest.CreatedDate = DateTime.UtcNow;
                objMFileuploadResponse = objDocumentUploadServiceClient.UploadFile_WithResponse(objFileUploadDetailsRequest); // sree

                this.response = objMFileuploadResponse.Filestatus;

                fileStream.Close();

                if (objMFileuploadResponse.Filestatus == "Success")
                {
                    SANUploadDetails UploadDetails = new SANUploadDetails();
                    UploadDetails.CandidateId = objFileUploadDetailsRequest.AssociateId;
                    UploadDetails.FileUploadId = objMFileuploadResponse.FileUploadId;
                    UploadDetails.FileContentId = objMFileuploadResponse.FileContentId.ToString();
                    UploadDetails.FileName = objFileUploadDetailsRequest.FileName;
                    UploadDetails.FileSaveName = objFileUploadDetailsRequest.FileSaveName;
                    UploadDetails.FileURL = objMFileuploadResponse.FileURL;
                    UploadDetails.FileExternalURL = objMFileuploadResponse.FileExternalURL;
                    UploadDetails.FileLocation = objMFileuploadResponse.FileLocation;
                    UploadDetails.KeyId = sysKey.KeyId;
                    UploadDetails.SessionId = sessionDetail.SessionId;
                    obj.SaveSANUploadDetails(UploadDetails);

                }

                //// fileStream.Dispose();
                binaryReader.Close();
                buffer = null;

                if (File.Exists(tempFileName))
                {
                    File.Delete(tempFileName);
                }

                message = "alert('File Uploaded Successfully')";
                Page.ClientScript.RegisterStartupScript(this.GetType(), "UploadMessage", message, true);

                string[] objarray;
                objarray = this.GetGeographyMaster(22, 1, Convert.ToInt32(candidateId));
                string filename = Convert.ToString(objarray[1].ToString());
                this.urllink1.Visible = true;
                string[] name = filename.Split('#');
                this.urllink1.Text = name[1];

                if (this.contractorFlag == 1)
                {
                    if (string.IsNullOrEmpty(filename))
                    {
                        this.lblLaptop.Visible = false;
                        this.lblCellphone.Visible = false;
                        this.lblBlackberry.Visible = false;
                        this.lblBlackberryZ10.Visible = false;
                        this.lblSamsungNote3.Visible = false;
                        this.lblSamsungS3.Visible = false;
                        this.lblSamsungS4.Visible = false;
                        this.lblSamsungS5.Visible = false;
                        this.lblIPhone4S.Visible = false;
                        this.lblIPhone5C.Visible = false;
                        this.lblIPhone5S.Visible = false;

                        this.lblSamsungNote3.Visible = false;
                        this.lblIPhone6.Visible = false;
                        this.lblIPhone6P.Visible = false;

                        this.lblLGG3.Visible = false;
                        this.lblSamsungS632GB.Visible = false;
                        this.lblSamsungS664GB.Visible = false;
                        this.lblSamsungS6128GB.Visible = false;
                        this.lblSamsungS6Edge32GB.Visible = false;
                        this.lblSamsungS6Edge64GB.Visible = false;
                        this.lblSamsungS6Edge128GB.Visible = false;

                        this.lblAssetheader.Visible = false;
                        this.lblApproveridheader.Visible = false;
                        this.lblNameDesig.Visible = false;
                        this.txtLaptopApproverId.Visible = false;
                        this.txtCellphoneApproverId.Visible = false;
                        this.txtBlackberryApproverId.Visible = false;
                        this.txtBlackberryZ10ApproverId.Visible = false;
                        this.txtSamsungNote3ApproverId.Visible = false;
                        this.txtSamsungS3ApproverId.Visible = false;
                        this.txtSamsungS4ApproverId.Visible = false;
                        this.txtSamsungS5ApproverId.Visible = false;
                        this.txtIPhone4SApproverId.Visible = false;
                        this.txtIPhone5CApproverId.Visible = false;
                        this.txtIPhone5SApproverId.Visible = false;

                        this.txtSamsungNote4ApproverId.Visible = false;
                        this.txtIPhone6ApproverId.Visible = false;
                        this.txtIPhone6PApproverId.Visible = false;

                        this.txtLGG3ApproverId.Visible = false;
                        this.txtSamsungS632GBApproverId.Visible = false;
                        this.txtSamsungS664GBApproverId.Visible = false;
                        this.txtSamsungS6128GBApproverId.Visible = false;
                        this.txtSamsungS6Edge32GBApproverId.Visible = false;
                        this.txtSamsungS6Edge64GBApproverId.Visible = false;
                        this.txtSamsungS6Edge128GBApproverId.Visible = false;

                        this.chkLaptop.Visible = false;
                        this.chkLaptop.Visible = false;
                        this.chkCellphone.Visible = false;
                        this.chkBlackberry.Visible = false;
                        this.rdbBlackberryZ10.Visible = false;
                        this.rdbSamsungNote3.Visible = false;
                        this.rdbSamsungS3.Visible = false;
                        this.rdbSamsungS4.Visible = false;
                        this.rdbSamsungS5.Visible = false;
                        this.rdbIPhone4S.Visible = false;
                        this.rdbIPhone5C.Visible = false;
                        this.rdbIPhone5S.Visible = false;

                        this.rdbSamsungNote4.Visible = false;
                        this.rdbIPhone6.Visible = false;
                        this.rdbIPhone6P.Visible = false;

                        this.rdbLGG3.Visible = false;
                        this.rdbSamsungS632GB.Visible = false;
                        this.rdbSamsungS664GB.Visible = false;
                        this.rdbSamsungS6128GB.Visible = false;
                        this.rdbSamsungS6Edge32GB.Visible = false;
                        this.rdbSamsungS6Edge64GB.Visible = false;
                        this.rdbSamsungS6Edge128GB.Visible = false;

                        this.btnSubmit.Visible = false;
                        this.lblContractorAssetName.Visible = false;
                        this.ddEquipment.Visible = false;
                        this.lblAprvrIdHeader.Visible = false;
                        this.txtappid.Visible = false;
                        this.lblApproverNameHeader.Visible = false;
                        this.ContctEquiAprvName.Visible = false;
                        this.btnSubmit_Cntcr.Visible = false;
                    }
                    else
                    {
                        this.lblLaptop.Visible = false;
                        this.lblCellphone.Visible = false;
                        this.lblBlackberry.Visible = false;
                        this.lblBlackberryZ10.Visible = false;
                        this.lblSamsungNote3.Visible = false;
                        this.lblSamsungS3.Visible = false;
                        this.lblSamsungS4.Visible = false;
                        this.lblSamsungS5.Visible = false;
                        this.lblIPhone4S.Visible = false;
                        this.lblIPhone5C.Visible = false;
                        this.lblIPhone5S.Visible = false;

                        this.lblSamsungNote4.Visible = false;
                        this.lblIPhone6.Visible = false;
                        this.lblIPhone6P.Visible = false;

                        this.lblLGG3.Visible = false;
                        this.lblSamsungS632GB.Visible = false;
                        this.lblSamsungS664GB.Visible = false;
                        this.lblSamsungS6128GB.Visible = false;
                        this.lblSamsungS6Edge32GB.Visible = false;
                        this.lblSamsungS6Edge64GB.Visible = false;
                        this.lblSamsungS6Edge128GB.Visible = false;

                        this.lblAssetheader.Visible = false;
                        this.lblApproveridheader.Visible = false;
                        this.lblNameDesig.Visible = false;
                        this.txtLaptopApproverId.Visible = false;
                        this.txtCellphoneApproverId.Visible = false;
                        this.txtBlackberryApproverId.Visible = false;
                        this.txtBlackberryZ10ApproverId.Visible = false;
                        this.txtSamsungNote3ApproverId.Visible = false;
                        this.txtSamsungS3ApproverId.Visible = false;
                        this.txtSamsungS4ApproverId.Visible = false;
                        this.txtSamsungS5ApproverId.Visible = false;
                        this.txtIPhone4SApproverId.Visible = false;
                        this.txtIPhone5CApproverId.Visible = false;
                        this.txtIPhone5SApproverId.Visible = false;

                        this.txtSamsungNote4ApproverId.Visible = false;
                        this.txtIPhone6ApproverId.Visible = false;
                        this.txtIPhone6PApproverId.Visible = false;

                        this.txtLGG3ApproverId.Visible = false;
                        this.txtSamsungS632GBApproverId.Visible = false;
                        this.txtSamsungS664GBApproverId.Visible = false;
                        this.txtSamsungS6128GBApproverId.Visible = false;
                        this.txtSamsungS6Edge32GBApproverId.Visible = false;
                        this.txtSamsungS6Edge64GBApproverId.Visible = false;
                        this.txtSamsungS6Edge128GBApproverId.Visible = false;

                        this.chkLaptop.Visible = false;
                        this.chkCellphone.Visible = false;
                        this.chkBlackberry.Visible = false;
                        this.rdbBlackberryZ10.Visible = false;
                        this.rdbSamsungNote3.Visible = false;
                        this.rdbSamsungS3.Visible = false;
                        this.rdbSamsungS4.Visible = false;
                        this.rdbSamsungS5.Visible = false;
                        this.rdbIPhone4S.Visible = false;
                        this.rdbIPhone5C.Visible = false;
                        this.rdbIPhone5S.Visible = false;

                        this.rdbSamsungNote4.Visible = false;
                        this.rdbIPhone6.Visible = false;
                        this.rdbIPhone6P.Visible = false;

                        this.rdbLGG3.Visible = false;
                        this.rdbSamsungS632GB.Visible = false;
                        this.rdbSamsungS664GB.Visible = false;
                        this.rdbSamsungS6128GB.Visible = false;
                        this.rdbSamsungS6Edge32GB.Visible = false;
                        this.rdbSamsungS6Edge64GB.Visible = false;
                        this.rdbSamsungS6Edge128GB.Visible = false;

                        this.btnSubmit.Visible = false;
                        this.lblContractorAssetName.Visible = true;
                        this.ddEquipment.Visible = true;
                        this.lblAprvrIdHeader.Visible = true;
                        this.txtappid.Visible = true;
                        this.lblApproverNameHeader.Visible = true;
                        this.ContctEquiAprvName.Visible = true;
                        this.btnSubmit_Cntcr.Visible = true;
                        this.FetchAssetDetails();
                        this.txtLaptopApproverId.Value = string.Empty;
                        this.txtCellphoneApproverId.Value = string.Empty;
                        this.txtBlackberryApproverId.Value = string.Empty;
                        this.txtBlackberryZ10ApproverId.Value = string.Empty;
                        this.txtSamsungNote3ApproverId.Value = string.Empty;
                        this.txtSamsungS3ApproverId.Value = string.Empty;
                        this.txtSamsungS4ApproverId.Value = string.Empty;
                        this.txtSamsungS5ApproverId.Value = string.Empty;
                        this.txtIPhone4SApproverId.Value = string.Empty;
                        this.txtIPhone5CApproverId.Value = string.Empty;
                        this.txtIPhone5SApproverId.Value = string.Empty;

                        this.txtSamsungNote4ApproverId.Value = string.Empty;
                        this.txtIPhone6ApproverId.Value = string.Empty;
                        this.txtIPhone6PApproverId.Value = string.Empty;

                        this.txtLGG3ApproverId.Value = string.Empty;
                        this.txtSamsungS632GBApproverId.Value = string.Empty;
                        this.txtSamsungS664GBApproverId.Value = string.Empty;
                        this.txtSamsungS6128GBApproverId.Value = string.Empty;
                        this.txtSamsungS6Edge32GBApproverId.Value = string.Empty;
                        this.txtSamsungS6Edge64GBApproverId.Value = string.Empty;
                        this.txtSamsungS6Edge128GBApproverId.Value = string.Empty;

                        this.lblLaptopApproverNameDesg.InnerText = string.Empty;
                        this.lblBlackberryApproverNameDesg.InnerText = string.Empty;
                        this.lblCellphoneApproverNameDesg.InnerText = string.Empty;
                        this.lblBlackberryZ10ApproverNameDesg.InnerText = string.Empty;
                        this.lblSamsungNote3ApproverNameDesg.InnerText = string.Empty;
                        this.lblSamsungS3ApproverNameDesg.InnerText = string.Empty;
                        this.lblSamsungS4ApproverNameDesg.InnerText = string.Empty;
                        this.lblSamsungS5ApproverNameDesg.InnerText = string.Empty;
                        this.lblIPhone4SApproverNameDesg.InnerText = string.Empty;
                        this.lblIPhone5CApproverNameDesg.InnerText = string.Empty;
                        this.lblIPhone5SApproverNameDesg.InnerText = string.Empty;

                        this.lblSamsungNote4ApproverNameDesg.InnerText = string.Empty;
                        this.lblIPhone6ApproverNameDesg.InnerText = string.Empty;
                        this.lblIPhone6PApproverNameDesg.InnerText = string.Empty;

                        this.lblLGG3ApproverNameDesg.InnerText = string.Empty;
                        this.lblSamsungS632GBApproverNameDesg.InnerText = string.Empty;
                        this.lblSamsungS664GBApproverNameDesg.InnerText = string.Empty;
                        this.lblSamsungS6128GBApproverNameDesg.InnerText = string.Empty;
                        this.lblSamsungS6Edge32GBApproverNameDesg.InnerText = string.Empty;
                        this.lblSamsungS6Edge64GBApproverNameDesg.InnerText = string.Empty;
                        this.lblSamsungS6Edge128GBApproverNameDesg.InnerText = string.Empty;
                    }
                }
                else
                {
                    if (string.IsNullOrEmpty(filename))
                    {
                        this.lblLaptop.Visible = false;
                        this.lblCellphone.Visible = false;
                        this.lblBlackberry.Visible = false;
                        this.lblBlackberryZ10.Visible = false;
                        this.lblSamsungNote3.Visible = false;
                        this.lblSamsungS3.Visible = false;
                        this.lblSamsungS4.Visible = false;
                        this.lblSamsungS5.Visible = false;
                        this.lblIPhone4S.Visible = false;
                        this.lblIPhone5C.Visible = false;
                        this.lblIPhone5S.Visible = false;

                        this.lblSamsungNote4.Visible = false;
                        this.lblIPhone6.Visible = false;
                        this.lblIPhone6P.Visible = false;

                        this.lblLGG3.Visible = false;
                        this.lblSamsungS632GB.Visible = false;
                        this.lblSamsungS664GB.Visible = false;
                        this.lblSamsungS6128GB.Visible = false;
                        this.lblSamsungS6Edge32GB.Visible = false;
                        this.lblSamsungS6Edge64GB.Visible = false;
                        this.lblSamsungS6Edge128GB.Visible = false;

                        this.lblAssetheader.Visible = false;
                        this.lblApproveridheader.Visible = false;
                        this.lblNameDesig.Visible = false;
                        this.txtLaptopApproverId.Visible = false;
                        this.txtCellphoneApproverId.Visible = false;
                        this.txtBlackberryApproverId.Visible = false;
                        this.txtBlackberryZ10ApproverId.Visible = false;
                        this.txtSamsungNote3ApproverId.Visible = false;
                        this.txtSamsungS3ApproverId.Visible = false;
                        this.txtSamsungS4ApproverId.Visible = false;
                        this.txtSamsungS5ApproverId.Visible = false;
                        this.txtIPhone4SApproverId.Visible = false;
                        this.txtIPhone5CApproverId.Visible = false;
                        this.txtIPhone5SApproverId.Visible = false;

                        this.txtSamsungNote4ApproverId.Visible = false;
                        this.txtIPhone6ApproverId.Visible = false;
                        this.txtIPhone6PApproverId.Visible = false;

                        this.txtLGG3ApproverId.Visible = false;
                        this.txtSamsungS632GBApproverId.Visible = false;
                        this.txtSamsungS664GBApproverId.Visible = false;
                        this.txtSamsungS6128GBApproverId.Visible = false;
                        this.txtSamsungS6Edge32GBApproverId.Visible = false;
                        this.txtSamsungS6Edge64GBApproverId.Visible = false;
                        this.txtSamsungS6Edge128GBApproverId.Visible = false;

                        this.chkLaptop.Visible = false;
                        this.chkCellphone.Visible = false;
                        this.lblBlackberry.Visible = false;
                        this.rdbBlackberryZ10.Visible = false;
                        this.rdbSamsungNote3.Visible = false;
                        this.rdbSamsungS3.Visible = false;
                        this.rdbSamsungS4.Visible = false;
                        this.rdbSamsungS5.Visible = false;
                        this.rdbIPhone4S.Visible = false;
                        this.rdbIPhone5C.Visible = false;
                        this.rdbIPhone5S.Visible = false;

                        this.rdbSamsungNote4.Visible = false;
                        this.rdbIPhone6.Visible = false;
                        this.rdbIPhone6P.Visible = false;

                        this.rdbLGG3.Visible = false;
                        this.rdbSamsungS632GB.Visible = false;
                        this.rdbSamsungS664GB.Visible = false;
                        this.rdbSamsungS6128GB.Visible = false;
                        this.rdbSamsungS6Edge32GB.Visible = false;
                        this.rdbSamsungS6Edge64GB.Visible = false;
                        this.rdbSamsungS6Edge128GB.Visible = false;

                        this.btnSubmit.Visible = false;
                        this.lblContractorAssetName.Visible = false;
                        this.ddEquipment.Visible = false;
                        this.lblAprvrIdHeader.Visible = false;
                        this.txtappid.Visible = false;
                        this.lblApproverNameHeader.Visible = false;
                        this.ContctEquiAprvName.Visible = false;
                        this.btnSubmit_Cntcr.Visible = false;
                    }
                    else
                    {
                        this.lblLaptop.Visible = true;
                        this.lblCellphone.Visible = true;
                        this.lblBlackberry.Visible = true;
                        this.lblBlackberryZ10.Visible = true;
                        this.lblSamsungNote3.Visible = true;
                        this.lblSamsungS3.Visible = true;
                        this.lblSamsungS4.Visible = true;
                        this.lblSamsungS5.Visible = true;
                        this.lblIPhone4S.Visible = true;
                        this.lblIPhone5C.Visible = true;
                        this.lblIPhone5S.Visible = true;

                        this.lblSamsungNote4.Visible = true;
                        this.lblIPhone6.Visible = true;
                        this.lblIPhone6P.Visible = true;

                        this.lblLGG3.Visible = true;
                        this.lblSamsungS632GB.Visible = true;
                        this.lblSamsungS664GB.Visible = true;
                        this.lblSamsungS6128GB.Visible = true;
                        this.lblSamsungS6Edge32GB.Visible = true;
                        this.lblSamsungS6Edge64GB.Visible = true;
                        this.lblSamsungS6Edge128GB.Visible = true;

                        this.lblAssetheader.Visible = true;
                        this.lblApproveridheader.Visible = true;
                        this.lblNameDesig.Visible = true;
                        this.txtLaptopApproverId.Visible = true;
                        this.txtCellphoneApproverId.Visible = true;
                        this.txtBlackberryApproverId.Visible = true;
                        this.txtBlackberryZ10ApproverId.Visible = true;
                        this.txtSamsungNote3ApproverId.Visible = true;
                        this.txtSamsungS3ApproverId.Visible = true;
                        this.txtSamsungS4ApproverId.Visible = true;
                        this.txtSamsungS5ApproverId.Visible = true;
                        this.txtIPhone4SApproverId.Visible = true;
                        this.txtIPhone5CApproverId.Visible = true;
                        this.txtIPhone5SApproverId.Visible = true;

                        this.txtSamsungNote4ApproverId.Visible = true;
                        this.txtIPhone6ApproverId.Visible = true;
                        this.txtIPhone6PApproverId.Visible = true;

                        this.txtLGG3ApproverId.Visible = true;
                        this.txtSamsungS632GBApproverId.Visible = true;
                        this.txtSamsungS664GBApproverId.Visible = true;
                        this.txtSamsungS6128GBApproverId.Visible = true;
                        this.txtSamsungS6Edge32GBApproverId.Visible = true;
                        this.txtSamsungS6Edge64GBApproverId.Visible = true;
                        this.txtSamsungS6Edge128GBApproverId.Visible = true;

                        this.chkLaptop.Visible = true;
                        this.chkCellphone.Visible = true;
                        this.lblBlackberry.Visible = true;
                        this.rdbBlackberryZ10.Visible = true;
                        this.rdbSamsungNote3.Visible = true;
                        this.rdbSamsungS3.Visible = true;
                        this.rdbSamsungS4.Visible = true;
                        this.rdbSamsungS5.Visible = true;
                        this.rdbIPhone4S.Visible = true;
                        this.rdbIPhone5C.Visible = true;
                        this.rdbIPhone5S.Visible = true;

                        this.rdbSamsungNote4.Visible = true;
                        this.rdbIPhone6.Visible = true;
                        this.rdbIPhone6P.Visible = true;

                        this.rdbLGG3.Visible = true;
                        this.rdbSamsungS632GB.Visible = true;
                        this.rdbSamsungS664GB.Visible = true;
                        this.rdbSamsungS6128GB.Visible = true;
                        this.rdbSamsungS6Edge32GB.Visible = true;
                        this.rdbSamsungS6Edge64GB.Visible = true;
                        this.rdbSamsungS6Edge128GB.Visible = true;

                        this.btnSubmit.Visible = true;
                        this.lblContractorAssetName.Visible = false;
                        this.ddEquipment.Visible = false;
                        this.lblAprvrIdHeader.Visible = false;
                        this.txtappid.Visible = false;
                        this.lblApproverNameHeader.Visible = false;
                        this.ContctEquiAprvName.Visible = false;
                        this.btnSubmit_Cntcr.Visible = false;
                        this.FetchAssetDetails();
                        this.txtLaptopApproverId.Value = string.Empty;
                        this.txtCellphoneApproverId.Value = string.Empty;
                        this.txtBlackberryApproverId.Value = string.Empty;
                        this.lblLaptopApproverNameDesg.InnerText = string.Empty;
                        this.lblBlackberryApproverNameDesg.InnerText = string.Empty;
                        this.lblCellphoneApproverNameDesg.InnerText = string.Empty;
                        this.lblBlackberryZ10ApproverNameDesg.InnerText = string.Empty;
                        this.lblSamsungNote3ApproverNameDesg.InnerText = string.Empty;
                        this.lblSamsungS3ApproverNameDesg.InnerText = string.Empty;
                        this.lblSamsungS4ApproverNameDesg.InnerText = string.Empty;
                        this.lblSamsungS5ApproverNameDesg.InnerText = string.Empty;
                        this.lblIPhone4SApproverNameDesg.InnerText = string.Empty;
                        this.lblIPhone5CApproverNameDesg.InnerText = string.Empty;
                        this.lblIPhone5SApproverNameDesg.InnerText = string.Empty;

                        this.lblSamsungNote4ApproverNameDesg.InnerText = string.Empty;
                        this.lblIPhone6ApproverNameDesg.InnerText = string.Empty;
                        this.lblIPhone6PApproverNameDesg.InnerText = string.Empty;

                        this.lblLGG3ApproverNameDesg.InnerText = string.Empty;
                        this.lblSamsungS632GBApproverNameDesg.InnerText = string.Empty;
                        this.lblSamsungS664GBApproverNameDesg.InnerText = string.Empty;
                        this.lblSamsungS6128GBApproverNameDesg.InnerText = string.Empty;
                        this.lblSamsungS6Edge32GBApproverNameDesg.InnerText = string.Empty;
                        this.lblSamsungS6Edge64GBApproverNameDesg.InnerText = string.Empty;
                        this.lblSamsungS6Edge128GBApproverNameDesg.InnerText = string.Empty;
                    }
                }
            }
            else
            {
                message = "alert('Please upload  a valid file')";
                Page.ClientScript.RegisterStartupScript(this.GetType(), "UploadMessage", message, true);
            }
        }

        /// <summary>
        /// Method to fetch the Asset Details of the Candidate
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", Justification = "Reviewed")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1505:AvoidUnmaintainableCode", Justification = "Reviewed.")]
        public void FetchAssetDetails()
        {
            DataSet datsetApproverequestdata;
            string cand = Request.QueryString["cand"];
            short contractorFlag = Convert.ToInt16(Request.QueryString["IsCont"]);
            this.objApprovalDetails.CandidateId = Convert.ToInt32(cand.ToString());

            // Equipments binding
            ArrayList obj = this.GetGeographyMaster(46, 194);
            this.ddEquipment.DataSource = obj;
            this.ddEquipment.DataValueField = "ID";
            this.ddEquipment.DataTextField = "Description";
            this.ddEquipment.DataBind();

            using (DashBoardServicesClient objDashBoardServicesClient = new DashBoardServicesClient())
            {
                datsetApproverequestdata = objDashBoardServicesClient.FetchAssetApprovalRequestData(this.objApprovalDetails);
                if (contractorFlag == 1)
                {
                    if ((datsetApproverequestdata != null) && (datsetApproverequestdata.Tables[0].Rows.Count > 0))
                    {
                        foreach (DataRow datrowApproverrequestdata in datsetApproverequestdata.Tables[0].Rows)
                        {
                            int i = this.equipmentDic.Where(s => s.Value == datrowApproverrequestdata[0].ToString()).Select(s => new { index = s.Key }).ToList()[0].index;
                            this.ddEquipment.SelectedIndex = i;
                            if (datrowApproverrequestdata[1].ToString() == "0")
                            {
                                this.txtappid.Value = string.Empty;
                            }
                            else
                            {
                                this.txtappid.Value = datrowApproverrequestdata[1].ToString();
                            }

                            if (datrowApproverrequestdata[2] != DBNull.Value && datrowApproverrequestdata[3] != DBNull.Value)
                            {
                                this.ContctEquiAprvName.InnerText = datrowApproverrequestdata[2].ToString() + "/" + datrowApproverrequestdata[3].ToString();
                            }
                        }
                    }

                    if ((datsetApproverequestdata != null) && (datsetApproverequestdata.Tables[1].Rows.Count > 0))
                    {
                        foreach (DataRow datrowApproverrequestdata in datsetApproverequestdata.Tables[1].Rows)
                        {
                            this.chkLaptop.Visible = false;
                            this.lblLaptop.Visible = false;
                            this.txtLaptopApproverId.Visible = false;
                            this.lblLaptopApproverNameDesg.Visible = false;

                            this.chkCellphone.Visible = false;
                            this.lblCellphone.Visible = false;
                            this.txtCellphoneApproverId.Visible = false;
                            this.lblCellphoneApproverNameDesg.Visible = false;

                            this.chkBlackberry.Visible = false;
                            this.lblBlackberry.Visible = false;
                            this.txtBlackberryApproverId.Visible = false;
                            this.lblBlackberryApproverNameDesg.Visible = false;
                        }
                    }
                }
                else
                {
                    if ((datsetApproverequestdata != null) && (datsetApproverequestdata.Tables[0].Rows.Count > 0))
                    {
                        foreach (DataRow datrowApproverrequestdata in datsetApproverequestdata.Tables[0].Rows)
                        {
                            if (datrowApproverrequestdata[0].ToString() == "1")
                            {
                                this.chkLaptop.Checked = true;
                                if (datrowApproverrequestdata[1].ToString() == "0")
                                {
                                    this.txtLaptopApproverId.Value = string.Empty;
                                }
                                else
                                {
                                    this.txtLaptopApproverId.Value = datrowApproverrequestdata[1].ToString();
                                }

                                if (datrowApproverrequestdata[2] != DBNull.Value && datrowApproverrequestdata[3] != DBNull.Value)
                                {
                                    this.lblLaptopApproverNameDesg.InnerText = datrowApproverrequestdata[2].ToString() + "/" + datrowApproverrequestdata[3].ToString();
                                }
                            }
                            else if (datrowApproverrequestdata[0].ToString() == "2")
                            {
                                this.chkBlackberry.Checked = true;
                                if (datrowApproverrequestdata[1].ToString() == "0")
                                {
                                    this.txtBlackberryApproverId.Value = string.Empty;
                                }
                                else
                                {
                                    this.txtBlackberryApproverId.Value = datrowApproverrequestdata[1].ToString();
                                }

                                if (datrowApproverrequestdata[2] != DBNull.Value && datrowApproverrequestdata[3] != DBNull.Value)
                                {
                                    this.lblBlackberryApproverNameDesg.InnerText = datrowApproverrequestdata[2].ToString() + "/" + datrowApproverrequestdata[3].ToString();
                                }
                            }
                            else if (datrowApproverrequestdata[0].ToString() == "3")
                            {
                                this.chkCellphone.Checked = true;
                                if (datrowApproverrequestdata[1].ToString() == "0")
                                {
                                    this.txtCellphoneApproverId.Value = string.Empty;
                                }
                                else
                                {
                                    this.txtCellphoneApproverId.Value = datrowApproverrequestdata[1].ToString();
                                }

                                if (datrowApproverrequestdata[2] != DBNull.Value && datrowApproverrequestdata[3] != DBNull.Value)
                                {
                                    this.lblCellphoneApproverNameDesg.InnerText = datrowApproverrequestdata[2].ToString() + "/" + datrowApproverrequestdata[3].ToString();
                                }
                            }
                            else if (datrowApproverrequestdata[0].ToString() == "4")
                            {
                                this.rdbBlackberryZ10.Checked = true;
                                if (datrowApproverrequestdata[1].ToString() == "0")
                                {
                                    this.txtBlackberryZ10ApproverId.Value = string.Empty;
                                }
                                else
                                {
                                    this.txtBlackberryZ10ApproverId.Value = datrowApproverrequestdata[1].ToString();
                                }

                                if (datrowApproverrequestdata[2] != DBNull.Value && datrowApproverrequestdata[3] != DBNull.Value)
                                {
                                    this.lblBlackberryZ10ApproverNameDesg.InnerText = datrowApproverrequestdata[2].ToString() + "/" + datrowApproverrequestdata[3].ToString();
                                }
                            }
                            else if (datrowApproverrequestdata[0].ToString() == "6")
                            {
                                this.rdbSamsungS3.Checked = true;
                                if (datrowApproverrequestdata[1].ToString() == "0")
                                {
                                    this.txtSamsungS3ApproverId.Value = string.Empty;
                                }
                                else
                                {
                                    this.txtSamsungS3ApproverId.Value = datrowApproverrequestdata[1].ToString();
                                }

                                if (datrowApproverrequestdata[2] != DBNull.Value && datrowApproverrequestdata[3] != DBNull.Value)
                                {
                                    this.lblSamsungS3ApproverNameDesg.InnerText = datrowApproverrequestdata[2].ToString() + "/" + datrowApproverrequestdata[3].ToString();
                                }
                            }
                            else if (datrowApproverrequestdata[0].ToString() == "7")
                            {
                                this.rdbSamsungS4.Checked = true;
                                if (datrowApproverrequestdata[1].ToString() == "0")
                                {
                                    this.txtSamsungS4ApproverId.Value = string.Empty;
                                }
                                else
                                {
                                    this.txtSamsungS4ApproverId.Value = datrowApproverrequestdata[1].ToString();
                                }

                                if (datrowApproverrequestdata[2] != DBNull.Value && datrowApproverrequestdata[3] != DBNull.Value)
                                {
                                    this.lblSamsungS4ApproverNameDesg.InnerText = datrowApproverrequestdata[2].ToString() + "/" + datrowApproverrequestdata[3].ToString();
                                }
                            }
                            else if (datrowApproverrequestdata[0].ToString() == "8")
                            {
                                this.rdbSamsungS5.Checked = true;
                                if (datrowApproverrequestdata[1].ToString() == "0")
                                {
                                    this.txtSamsungS5ApproverId.Value = string.Empty;
                                }
                                else
                                {
                                    this.txtSamsungS5ApproverId.Value = datrowApproverrequestdata[1].ToString();
                                }

                                if (datrowApproverrequestdata[2] != DBNull.Value && datrowApproverrequestdata[3] != DBNull.Value)
                                {
                                    this.lblSamsungS5ApproverNameDesg.InnerText = datrowApproverrequestdata[2].ToString() + "/" + datrowApproverrequestdata[3].ToString();
                                }
                            }
                            else if (datrowApproverrequestdata[0].ToString() == "9")
                            {
                                this.rdbIPhone4S.Checked = true;
                                if (datrowApproverrequestdata[1].ToString() == "0")
                                {
                                    this.txtIPhone4SApproverId.Value = string.Empty;
                                }
                                else
                                {
                                    this.txtIPhone4SApproverId.Value = datrowApproverrequestdata[1].ToString();
                                }

                                if (datrowApproverrequestdata[2] != DBNull.Value && datrowApproverrequestdata[3] != DBNull.Value)
                                {
                                    this.lblIPhone4SApproverNameDesg.InnerText = datrowApproverrequestdata[2].ToString() + "/" + datrowApproverrequestdata[3].ToString();
                                }
                            }
                            else if (datrowApproverrequestdata[0].ToString() == "10")
                            {
                                this.rdbIPhone5C.Checked = true;
                                if (datrowApproverrequestdata[1].ToString() == "0")
                                {
                                    this.txtIPhone5CApproverId.Value = string.Empty;
                                }
                                else
                                {
                                    this.txtIPhone5CApproverId.Value = datrowApproverrequestdata[1].ToString();
                                }

                                if (datrowApproverrequestdata[2] != DBNull.Value && datrowApproverrequestdata[3] != DBNull.Value)
                                {
                                    this.lblIPhone5CApproverNameDesg.InnerText = datrowApproverrequestdata[2].ToString() + "/" + datrowApproverrequestdata[3].ToString();
                                }
                            }
                            else if (datrowApproverrequestdata[0].ToString() == "11")
                            {
                                this.rdbIPhone5S.Checked = true;
                                if (datrowApproverrequestdata[1].ToString() == "0")
                                {
                                    this.txtIPhone5SApproverId.Value = string.Empty;
                                }
                                else
                                {
                                    this.txtIPhone5SApproverId.Value = datrowApproverrequestdata[1].ToString();
                                }

                                if (datrowApproverrequestdata[2] != DBNull.Value && datrowApproverrequestdata[3] != DBNull.Value)
                                {
                                    this.lblIPhone5SApproverNameDesg.InnerText = datrowApproverrequestdata[2].ToString() + "/" + datrowApproverrequestdata[3].ToString();
                                }
                            }
                            else if (datrowApproverrequestdata[0].ToString() == "12")
                            {
                                this.rdbSamsungNote3.Checked = true;
                                if (datrowApproverrequestdata[1].ToString() == "0")
                                {
                                    this.txtSamsungNote3ApproverId.Value = string.Empty;
                                }
                                else
                                {
                                    this.txtSamsungNote3ApproverId.Value = datrowApproverrequestdata[1].ToString();
                                }

                                if (datrowApproverrequestdata[2] != DBNull.Value && datrowApproverrequestdata[3] != DBNull.Value)
                                {
                                    this.lblSamsungNote3ApproverNameDesg.InnerText = datrowApproverrequestdata[2].ToString() + "/" + datrowApproverrequestdata[3].ToString();
                                }
                            }
                            else if (datrowApproverrequestdata[0].ToString() == "16")
                            {
                                this.rdbIPhone6.Checked = true;
                                if (datrowApproverrequestdata[1].ToString() == "0")
                                {
                                    this.txtIPhone6ApproverId.Value = string.Empty;
                                }
                                else
                                {
                                    this.txtIPhone6ApproverId.Value = datrowApproverrequestdata[1].ToString();
                                }

                                if (datrowApproverrequestdata[2] != DBNull.Value && datrowApproverrequestdata[3] != DBNull.Value)
                                {
                                    this.lblIPhone6ApproverNameDesg.InnerText = datrowApproverrequestdata[2].ToString() + "/" + datrowApproverrequestdata[3].ToString();
                                }
                            }
                            else if (datrowApproverrequestdata[0].ToString() == "17")
                            {
                                this.rdbIPhone6P.Checked = true;
                                if (datrowApproverrequestdata[1].ToString() == "0")
                                {
                                    this.txtIPhone6PApproverId.Value = string.Empty;
                                }
                                else
                                {
                                    this.txtIPhone6PApproverId.Value = datrowApproverrequestdata[1].ToString();
                                }

                                if (datrowApproverrequestdata[2] != DBNull.Value && datrowApproverrequestdata[3] != DBNull.Value)
                                {
                                    this.lblIPhone6PApproverNameDesg.InnerText = datrowApproverrequestdata[2].ToString() + "/" + datrowApproverrequestdata[3].ToString();
                                }
                            }
                            else if (datrowApproverrequestdata[0].ToString() == "18")
                            {
                                this.rdbSamsungNote4.Checked = true;
                                if (datrowApproverrequestdata[1].ToString() == "0")
                                {
                                    this.txtSamsungNote4ApproverId.Value = string.Empty;
                                }
                                else
                                {
                                    this.txtSamsungNote4ApproverId.Value = datrowApproverrequestdata[1].ToString();
                                }

                                if (datrowApproverrequestdata[2] != DBNull.Value && datrowApproverrequestdata[3] != DBNull.Value)
                                {
                                    this.lblSamsungNote4ApproverNameDesg.InnerText = datrowApproverrequestdata[2].ToString() + "/" + datrowApproverrequestdata[3].ToString();
                                }
                            }
                            else if (datrowApproverrequestdata[0].ToString() == "24")
                            {
                                this.rdbLGG3.Checked = true;
                                if (datrowApproverrequestdata[1].ToString() == "0")
                                {
                                    this.txtLGG3ApproverId.Value = string.Empty;
                                }
                                else
                                {
                                    this.txtLGG3ApproverId.Value = datrowApproverrequestdata[1].ToString();
                                }

                                if (datrowApproverrequestdata[2] != DBNull.Value && datrowApproverrequestdata[3] != DBNull.Value)
                                {
                                    this.lblLGG3ApproverNameDesg.InnerText = datrowApproverrequestdata[2].ToString() + "/" + datrowApproverrequestdata[3].ToString();
                                }
                            }
                            else if (datrowApproverrequestdata[0].ToString() == "25")
                            {
                                this.rdbSamsungS632GB.Checked = true;
                                if (datrowApproverrequestdata[1].ToString() == "0")
                                {
                                    this.txtSamsungS632GBApproverId.Value = string.Empty;
                                }
                                else
                                {
                                    this.txtSamsungS632GBApproverId.Value = datrowApproverrequestdata[1].ToString();
                                }

                                if (datrowApproverrequestdata[2] != DBNull.Value && datrowApproverrequestdata[3] != DBNull.Value)
                                {
                                    this.lblSamsungS632GBApproverNameDesg.InnerText = datrowApproverrequestdata[2].ToString() + "/" + datrowApproverrequestdata[3].ToString();
                                }
                            }
                            else if (datrowApproverrequestdata[0].ToString() == "26")
                            {
                                this.rdbSamsungS664GB.Checked = true;
                                if (datrowApproverrequestdata[1].ToString() == "0")
                                {
                                    this.txtSamsungS664GBApproverId.Value = string.Empty;
                                }
                                else
                                {
                                    this.txtSamsungS664GBApproverId.Value = datrowApproverrequestdata[1].ToString();
                                }

                                if (datrowApproverrequestdata[2] != DBNull.Value && datrowApproverrequestdata[3] != DBNull.Value)
                                {
                                    this.lblSamsungS664GBApproverNameDesg.InnerText = datrowApproverrequestdata[2].ToString() + "/" + datrowApproverrequestdata[3].ToString();
                                }
                            }
                            else if (datrowApproverrequestdata[0].ToString() == "27")
                            {
                                this.rdbSamsungS6128GB.Checked = true;
                                if (datrowApproverrequestdata[1].ToString() == "0")
                                {
                                    this.txtSamsungS6128GBApproverId.Value = string.Empty;
                                }
                                else
                                {
                                    this.txtSamsungS6128GBApproverId.Value = datrowApproverrequestdata[1].ToString();
                                }

                                if (datrowApproverrequestdata[2] != DBNull.Value && datrowApproverrequestdata[3] != DBNull.Value)
                                {
                                    this.lblSamsungS6128GBApproverNameDesg.InnerText = datrowApproverrequestdata[2].ToString() + "/" + datrowApproverrequestdata[3].ToString();
                                }
                            }
                            else if (datrowApproverrequestdata[0].ToString() == "28")
                            {
                                this.rdbSamsungS6Edge32GB.Checked = true;
                                if (datrowApproverrequestdata[1].ToString() == "0")
                                {
                                    this.txtSamsungS6Edge32GBApproverId.Value = string.Empty;
                                }
                                else
                                {
                                    this.txtSamsungS6Edge32GBApproverId.Value = datrowApproverrequestdata[1].ToString();
                                }

                                if (datrowApproverrequestdata[2] != DBNull.Value && datrowApproverrequestdata[3] != DBNull.Value)
                                {
                                    this.lblSamsungS6Edge32GBApproverNameDesg.InnerText = datrowApproverrequestdata[2].ToString() + "/" + datrowApproverrequestdata[3].ToString();
                                }
                            }
                            else if (datrowApproverrequestdata[0].ToString() == "29")
                            {
                                this.rdbSamsungS6Edge64GB.Checked = true;
                                if (datrowApproverrequestdata[1].ToString() == "0")
                                {
                                    this.txtSamsungS6Edge64GBApproverId.Value = string.Empty;
                                }
                                else
                                {
                                    this.txtSamsungS6Edge64GBApproverId.Value = datrowApproverrequestdata[1].ToString();
                                }

                                if (datrowApproverrequestdata[2] != DBNull.Value && datrowApproverrequestdata[3] != DBNull.Value)
                                {
                                    this.lblSamsungS6Edge64GBApproverNameDesg.InnerText = datrowApproverrequestdata[2].ToString() + "/" + datrowApproverrequestdata[3].ToString();
                                }
                            }
                            else if (datrowApproverrequestdata[0].ToString() == "30")
                            {
                                this.rdbSamsungS6Edge128GB.Checked = true;
                                if (datrowApproverrequestdata[1].ToString() == "0")
                                {
                                    this.txtSamsungS6Edge128GBApproverId.Value = string.Empty;
                                }
                                else
                                {
                                    this.txtSamsungS6Edge128GBApproverId.Value = datrowApproverrequestdata[1].ToString();
                                }

                                if (datrowApproverrequestdata[2] != DBNull.Value && datrowApproverrequestdata[3] != DBNull.Value)
                                {
                                    this.lblSamsungS6Edge128GBApproverNameDesg.InnerText = datrowApproverrequestdata[2].ToString() + "/" + datrowApproverrequestdata[3].ToString();
                                }
                            }
                        }
                    }

                    if ((datsetApproverequestdata != null) && (datsetApproverequestdata.Tables[1].Rows.Count > 0))
                    {
                        foreach (DataRow datrowApproverrequestdata in datsetApproverequestdata.Tables[1].Rows)
                        {
                            // Laptop
                            if (datrowApproverrequestdata[0].ToString() == "Y")
                            {
                                this.chkLaptop.Visible = true;
                                this.lblLaptop.Visible = true;
                                this.txtLaptopApproverId.Visible = true;
                                this.lblLaptopApproverNameDesg.Visible = true;
                            }
                            else
                            {
                                this.chkLaptop.Visible = false;
                                this.lblLaptop.Visible = false;
                                this.txtLaptopApproverId.Visible = false;
                                this.lblLaptopApproverNameDesg.Visible = false;
                            }

                            // Cellphone
                            if (datrowApproverrequestdata[1].ToString() == "Y")
                            {
                                this.chkCellphone.Visible = true;
                                this.lblCellphone.Visible = true;
                                this.txtCellphoneApproverId.Visible = true;
                                this.lblCellphoneApproverNameDesg.Visible = true;
                            }
                            else
                            {
                                this.chkCellphone.Visible = false;
                                this.lblCellphone.Visible = false;
                                this.txtCellphoneApproverId.Visible = false;
                                this.lblCellphoneApproverNameDesg.Visible = false;
                            }

                            // Blackberry
                            if (datrowApproverrequestdata[2].ToString() == "Y")
                            {
                                this.chkBlackberry.Visible = true;
                                this.lblBlackberry.Visible = true;
                                this.txtBlackberryApproverId.Visible = true;
                                this.lblBlackberryApproverNameDesg.Visible = true;
                            }
                            else
                            {
                                this.chkBlackberry.Visible = false;
                                this.lblBlackberry.Visible = false;
                                this.txtBlackberryApproverId.Visible = false;
                                this.lblBlackberryApproverNameDesg.Visible = false;
                            }
                            //// BlackberryZ10
                            if (datrowApproverrequestdata[3].ToString() == "Y")
                            {
                                this.rdbBlackberryZ10.Visible = true;
                                this.lblBlackberryZ10.Visible = true;
                                this.txtBlackberryZ10ApproverId.Visible = true;
                                this.lblBlackberryZ10ApproverNameDesg.Visible = true;
                            }
                            else
                            {
                                this.rdbBlackberryZ10.Visible = false;
                                this.lblBlackberryZ10.Visible = false;
                                this.txtBlackberryZ10ApproverId.Visible = false;
                                this.lblBlackberryZ10ApproverNameDesg.Visible = false;
                            }
                            //// SamsungS3
                            if (datrowApproverrequestdata[4].ToString() == "Y")
                            {
                                this.rdbSamsungS3.Visible = true;
                                this.lblSamsungS3.Visible = true;
                                this.txtSamsungS3ApproverId.Visible = true;
                                this.lblSamsungS3ApproverNameDesg.Visible = true;
                            }
                            else
                            {
                                this.rdbSamsungS3.Visible = false;
                                this.lblSamsungS3.Visible = false;
                                this.txtSamsungS3ApproverId.Visible = false;
                                this.lblSamsungS3ApproverNameDesg.Visible = false;
                            }
                            //// SamsungS4
                            if (datrowApproverrequestdata[5].ToString() == "Y")
                            {
                                this.rdbSamsungS4.Visible = true;
                                this.lblSamsungS4.Visible = true;
                                this.txtSamsungS4ApproverId.Visible = true;
                                this.lblSamsungS4ApproverNameDesg.Visible = true;
                            }
                            else
                            {
                                this.rdbSamsungS4.Visible = false;
                                this.lblSamsungS4.Visible = false;
                                this.txtSamsungS4ApproverId.Visible = false;
                                this.lblSamsungS4ApproverNameDesg.Visible = false;
                            }
                            //// SamsungS5
                            if (datrowApproverrequestdata[6].ToString() == "Y")
                            {
                                this.rdbSamsungS5.Visible = true;
                                this.lblSamsungS5.Visible = true;
                                this.txtSamsungS5ApproverId.Visible = true;
                                this.lblSamsungS5ApproverNameDesg.Visible = true;
                            }
                            else
                            {
                                this.rdbSamsungS5.Visible = false;
                                this.lblSamsungS5.Visible = false;
                                this.txtSamsungS5ApproverId.Visible = false;
                                this.lblSamsungS5ApproverNameDesg.Visible = false;
                            }
                            //// IPhone4S
                            if (datrowApproverrequestdata[7].ToString() == "Y")
                            {
                                this.rdbIPhone4S.Visible = true;
                                this.lblIPhone4S.Visible = true;
                                this.txtIPhone4SApproverId.Visible = true;
                                this.lblIPhone4SApproverNameDesg.Visible = true;
                            }
                            else
                            {
                                this.rdbIPhone4S.Visible = false;
                                this.lblIPhone4S.Visible = false;
                                this.txtIPhone4SApproverId.Visible = false;
                                this.lblIPhone4SApproverNameDesg.Visible = false;
                            }
                            //// IPhone5C
                            if (datrowApproverrequestdata[8].ToString() == "Y")
                            {
                                this.rdbIPhone5C.Visible = true;
                                this.lblIPhone5C.Visible = true;
                                this.txtIPhone5CApproverId.Visible = true;
                                this.lblIPhone5CApproverNameDesg.Visible = true;
                            }
                            else
                            {
                                this.rdbIPhone5C.Visible = false;
                                this.lblIPhone5C.Visible = false;
                                this.txtIPhone5CApproverId.Visible = false;
                                this.lblIPhone5CApproverNameDesg.Visible = false;
                            }
                            //// IPhone5S
                            if (datrowApproverrequestdata[9].ToString() == "Y")
                            {
                                this.rdbIPhone5S.Visible = true;
                                this.lblIPhone5S.Visible = true;
                                this.txtIPhone5SApproverId.Visible = true;
                                this.lblIPhone5SApproverNameDesg.Visible = true;
                            }
                            else
                            {
                                this.rdbIPhone5S.Visible = false;
                                this.lblIPhone5S.Visible = false;
                                this.txtIPhone5SApproverId.Visible = false;
                                this.lblIPhone5SApproverNameDesg.Visible = false;
                            }
                            //// SamsungNote3
                            if (datrowApproverrequestdata[10].ToString() == "Y")
                            {
                                this.rdbSamsungNote3.Visible = true;
                                this.lblSamsungNote3.Visible = true;
                                this.txtSamsungNote3ApproverId.Visible = true;
                                this.lblSamsungNote3ApproverNameDesg.Visible = true;
                            }
                            else
                            {
                                this.rdbSamsungNote3.Visible = false;
                                this.lblSamsungNote3.Visible = false;
                                this.txtSamsungNote3ApproverId.Visible = false;
                                this.lblSamsungNote3ApproverNameDesg.Visible = false;
                            }

                            //// LGG2
                            if (datrowApproverrequestdata[11].ToString() == "Y")
                            {
                                this.rdbLGG2.Visible = true;
                                this.lblLGG2.Visible = true;
                                this.txtLGG2ApproverId.Visible = true;
                                this.lblLGG2ApproverNameDesg.Visible = true;
                            }
                            else
                            {
                                this.rdbLGG2.Visible = false;
                                this.lblLGG2.Visible = false;
                                this.txtLGG2ApproverId.Visible = false;
                                this.lblLGG2ApproverNameDesg.Visible = false;
                            }

                            //// SamsungNote4
                            if (datrowApproverrequestdata[12].ToString() == "Y")
                            {
                                this.rdbSamsungNote4.Visible = true;
                                this.lblSamsungNote4.Visible = true;
                                this.txtSamsungNote4ApproverId.Visible = true;
                                this.lblSamsungNote4ApproverNameDesg.Visible = true;
                            }
                            else
                            {
                                this.rdbSamsungNote4.Visible = false;
                                this.lblSamsungNote4.Visible = false;
                                this.txtSamsungNote4ApproverId.Visible = false;
                                this.lblSamsungNote4ApproverNameDesg.Visible = false;
                            }
                            //// IPhone6
                            if (datrowApproverrequestdata[13].ToString() == "Y")
                            {
                                this.rdbIPhone6.Visible = true;
                                this.lblIPhone6.Visible = true;
                                this.txtIPhone6ApproverId.Visible = true;
                                this.lblIPhone6ApproverNameDesg.Visible = true;
                            }
                            else
                            {
                                this.rdbIPhone6.Visible = false;
                                this.lblIPhone6.Visible = false;
                                this.txtIPhone6ApproverId.Visible = false;
                                this.lblIPhone6ApproverNameDesg.Visible = false;
                            }
                            //// IPhone6P
                            if (datrowApproverrequestdata[14].ToString() == "Y")
                            {
                                this.rdbIPhone6P.Visible = true;
                                this.lblIPhone6P.Visible = true;
                                this.txtIPhone6PApproverId.Visible = true;
                                this.lblIPhone6PApproverNameDesg.Visible = true;
                            }
                            else
                            {
                                this.rdbIPhone6P.Visible = false;
                                this.lblIPhone6P.Visible = false;
                                this.txtIPhone6PApproverId.Visible = false;
                                this.lblIPhone6PApproverNameDesg.Visible = false;
                            }

                            ////// LG G3
                            //if (datrowApproverrequestdata[15].ToString() == "Y")
                            //{
                            //    this.rdbLGG3.Visible = true;
                            //    this.lblLGG3.Visible = true;
                            //    this.txtLGG3ApproverId.Visible = true;
                            //    this.lblLGG3ApproverNameDesg.Visible = true;
                            //}
                            //else
                            //{
                            //    this.rdbLGG3.Visible = false;
                            //    this.lblLGG3.Visible = false;
                            //    this.txtLGG3ApproverId.Visible = false;
                            //    this.lblLGG3ApproverNameDesg.Visible = false;
                            //}

                            ////// Samsung S6 32GB
                            //if (datrowApproverrequestdata[15].ToString() == "Y")
                            //{
                            //    this.rdbSamsungS632GB.Visible = true;
                            //    this.lblSamsungS632GB.Visible = true;
                            //    this.txtSamsungS632GBApproverId.Visible = true;
                            //    this.lblSamsungS632GBApproverNameDesg.Visible = true;
                            //}
                            //else
                            //{
                            //    this.rdbSamsungS632GB.Visible = false;
                            //    this.lblSamsungS632GB.Visible = false;
                            //    this.txtSamsungS632GBApproverId.Visible = false;
                            //    this.lblSamsungS632GBApproverNameDesg.Visible = false;
                            //}

                            ////// Samsung S6 64GB
                            //if (datrowApproverrequestdata[15].ToString() == "Y")
                            //{
                            //    this.rdbSamsungS664GB.Visible = true;
                            //    this.lblSamsungS664GB.Visible = true;
                            //    this.txtSamsungS664GBApproverId.Visible = true;
                            //    this.lblSamsungS664GBApproverNameDesg.Visible = true;
                            //}
                            //else
                            //{
                            //    this.rdbSamsungS664GB.Visible = false;
                            //    this.lblSamsungS664GB.Visible = false;
                            //    this.txtSamsungS664GBApproverId.Visible = false;
                            //    this.lblSamsungS664GBApproverNameDesg.Visible = false;
                            //}

                            ////// Samsung S6 128GB
                            //if (datrowApproverrequestdata[15].ToString() == "Y")
                            //{
                            //    this.rdbSamsungS6128GB.Visible = true;
                            //    this.lblSamsungS6128GB.Visible = true;
                            //    this.txtSamsungS6128GBApproverId.Visible = true;
                            //    this.lblSamsungS6128GBApproverNameDesg.Visible = true;
                            //}
                            //else
                            //{
                            //    this.rdbSamsungS6128GB.Visible = false;
                            //    this.lblSamsungS6128GB.Visible = false;
                            //    this.txtSamsungS6128GBApproverId.Visible = false;
                            //    this.lblSamsungS6128GBApproverNameDesg.Visible = false;
                            //}

                            ////// Samsung S6 Edge 32GB
                            //if (datrowApproverrequestdata[15].ToString() == "Y")
                            //{
                            //    this.rdbSamsungS6Edge32GB.Visible = true;
                            //    this.lblSamsungS6Edge32GB.Visible = true;
                            //    this.txtSamsungS6Edge32GBApproverId.Visible = true;
                            //    this.lblSamsungS6Edge32GBApproverNameDesg.Visible = true;
                            //}
                            //else
                            //{
                            //    this.rdbSamsungS6Edge32GB.Visible = false;
                            //    this.lblSamsungS6Edge32GB.Visible = false;
                            //    this.txtSamsungS6Edge32GBApproverId.Visible = false;
                            //    this.lblSamsungS6Edge32GBApproverNameDesg.Visible = false;
                            //}
                            ////// Samsung S6 Edge 64GB
                            //if (datrowApproverrequestdata[15].ToString() == "Y")
                            //{
                            //    this.rdbSamsungS6Edge64GB.Visible = true;
                            //    this.lblSamsungS6Edge64GB.Visible = true;
                            //    this.txtSamsungS6Edge64GBApproverId.Visible = true;
                            //    this.lblSamsungS6Edge64GBApproverNameDesg.Visible = true;
                            //}
                            //else
                            //{
                            //    this.rdbSamsungS6Edge64GB.Visible = false;
                            //    this.lblSamsungS6Edge64GB.Visible = false;
                            //    this.txtSamsungS6Edge64GBApproverId.Visible = false;
                            //    this.lblSamsungS6Edge64GBApproverNameDesg.Visible = false;
                            //}
                            ////// Samsung S6 Edge 128GB
                            //if (datrowApproverrequestdata[15].ToString() == "Y")
                            //{
                            //    this.rdbSamsungS6Edge128GB.Visible = true;
                            //    this.lblSamsungS6Edge128GB.Visible = true;
                            //    this.txtSamsungS6Edge128GBApproverId.Visible = true;
                            //    this.lblSamsungS6Edge128GBApproverNameDesg.Visible = true;
                            //}
                            //else
                            //{
                            //    this.rdbSamsungS6Edge128GB.Visible = false;
                            //    this.lblSamsungS6Edge128GB.Visible = false;
                            //    this.txtSamsungS6Edge128GBApproverId.Visible = false;
                            //    this.lblSamsungS6Edge128GBApproverNameDesg.Visible = false;
                            //}
                        }
                    }

                    this.lblContractorAssetName.Visible = false;
                    this.ddEquipment.Visible = false;
                    this.lblAprvrIdHeader.Visible = false;
                    this.txtappid.Visible = false;
                    this.lblApproverNameHeader.Visible = false;
                    this.ContctEquiAprvName.Visible = false;
                }
            }
        }

        /// <summary>
        /// Method for Page Load
        /// </summary>
        /// <param name="sender">Sends the Data</param>
        /// <param name="e">Event for Page load</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", Justification = "Reviewed")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        protected void Page_Load(object sender, EventArgs e)
        {
            int contractorFlag1 = Convert.ToInt16(Request.QueryString["IsCont"]);

            if (!this.IsPostBack)
            {
                CandidateServicesClient objCID = new CandidateServicesClient();
                //// Utility.UtilityMethods objUtil = new UtilityMethods();

                // CandidateDetail[] objStateformlist = objCID.FetchStateTaxFormList();

                CandidateDetail objCandidateDetail = new CandidateDetail();

                string cand = Request.QueryString["cand"];
                objCandidateDetail.CandidateId = Convert.ToInt64(cand);

                CandidateServicesClient objCandClient = new CandidateServicesClient();
                OneC.OnBoarding.DC.CandidateDC.CandidateDetail[] objCandDetail = objCandClient.FetchCandidateId(objCandidateDetail);

                string candidateId = objCandDetail[0].CandidateId.ToString();

                string[] objarray = this.GetGeographyMaster(22, 1, Convert.ToInt32(candidateId));

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

                this.lblmsg.Visible = false;
                this.lblmsg_cntct.Visible = false;
                if (contractorFlag1 == 1)
                {
                    this.contractorFlag = 1;
                    if (string.IsNullOrEmpty(this.fileurl))
                    {
                        this.lblLaptop.Visible = false;
                        this.lblCellphone.Visible = false;
                        this.lblBlackberry.Visible = false;
                        this.lblSamsungNote3.Visible = false;
                        this.lblSamsungS3.Visible = false;
                        this.lblSamsungS4.Visible = false;
                        this.lblSamsungS5.Visible = false;
                        this.lblIPhone4S.Visible = false;
                        this.lblIPhone5C.Visible = false;
                        this.lblIPhone5S.Visible = false;
                        this.lblLGG2.Visible = false;

                        this.lblSamsungNote4.Visible = false;
                        this.lblIPhone6.Visible = false;
                        this.lblIPhone6P.Visible = false;

                        this.lblLGG3.Visible = false;
                        this.lblSamsungS632GB.Visible = false;
                        this.lblSamsungS664GB.Visible = false;
                        this.lblSamsungS6128GB.Visible = false;
                        this.lblSamsungS6Edge32GB.Visible = false;
                        this.lblSamsungS6Edge64GB.Visible = false;
                        this.lblSamsungS6Edge128GB.Visible = false;

                        this.lblAssetheader.Visible = false;
                        this.lblApproveridheader.Visible = false;
                        this.lblNameDesig.Visible = false;
                        this.txtLaptopApproverId.Visible = false;
                        this.txtCellphoneApproverId.Visible = false;
                        this.txtBlackberryApproverId.Visible = false;
                        this.txtBlackberryZ10ApproverId.Visible = false;
                        this.txtSamsungNote3ApproverId.Visible = false;
                        this.txtSamsungS3ApproverId.Visible = false;
                        this.txtSamsungS4ApproverId.Visible = false;
                        this.txtSamsungS5ApproverId.Visible = false;
                        this.txtIPhone4SApproverId.Visible = false;
                        this.txtIPhone5CApproverId.Visible = false;
                        this.txtIPhone5SApproverId.Visible = false;
                        this.txtLGG2ApproverId.Visible = false;

                        this.txtSamsungNote4ApproverId.Visible = false;
                        this.txtIPhone6ApproverId.Visible = false;
                        this.txtIPhone6PApproverId.Visible = false;

                        this.txtLGG3ApproverId.Visible = false;
                        this.txtSamsungS632GBApproverId.Visible = false;
                        this.txtSamsungS664GBApproverId.Visible = false;
                        this.txtSamsungS6128GBApproverId.Visible = false;
                        this.txtSamsungS6Edge32GBApproverId.Visible = false;
                        this.txtSamsungS6Edge64GBApproverId.Visible = false;
                        this.txtSamsungS6Edge128GBApproverId.Visible = false;

                        this.chkLaptop.Visible = false;
                        this.chkCellphone.Visible = false;
                        this.lblBlackberry.Visible = false;
                        this.rdbBlackberryZ10.Visible = false;
                        this.rdbSamsungNote3.Visible = false;
                        this.rdbSamsungS3.Visible = false;
                        this.rdbSamsungS4.Visible = false;
                        this.rdbSamsungS5.Visible = false;
                        this.rdbIPhone4S.Visible = false;
                        this.rdbIPhone5C.Visible = false;
                        this.rdbIPhone5S.Visible = false;
                        this.rdbLGG2.Visible = false;

                        this.rdbSamsungNote4.Visible = false;
                        this.rdbIPhone6.Visible = false;
                        this.rdbIPhone6P.Visible = false;

                        this.rdbLGG3.Visible = false;
                        this.rdbSamsungS632GB.Visible = false;
                        this.rdbSamsungS664GB.Visible = false;
                        this.rdbSamsungS6128GB.Visible = false;
                        this.rdbSamsungS6Edge32GB.Visible = false;
                        this.rdbSamsungS6Edge64GB.Visible = false;
                        this.rdbSamsungS6Edge128GB.Visible = false;

                        this.btnSubmit.Visible = false;
                        this.lblContractorAssetName.Visible = false;
                        this.ddEquipment.Visible = false;
                        this.lblAprvrIdHeader.Visible = false;
                        this.txtappid.Visible = false;
                        this.lblApproverNameHeader.Visible = false;
                        this.ContctEquiAprvName.Visible = false;
                        this.btnSubmit_Cntcr.Visible = false;
                    }
                    else
                    {
                        this.lblLaptop.Visible = false;
                        this.lblCellphone.Visible = false;
                        this.lblBlackberry.Visible = false;
                        this.lblBlackberryZ10.Visible = false;
                        this.lblSamsungNote3.Visible = false;
                        this.lblSamsungS3.Visible = false;
                        this.lblSamsungS4.Visible = false;
                        this.lblSamsungS5.Visible = false;
                        this.lblIPhone4S.Visible = false;
                        this.lblIPhone5C.Visible = false;
                        this.lblIPhone5S.Visible = false;
                        this.lblLGG2.Visible = false;

                        this.lblSamsungNote4.Visible = false;
                        this.lblIPhone6.Visible = false;
                        this.lblIPhone6P.Visible = false;

                        this.lblLGG3.Visible = false;
                        this.lblSamsungS632GB.Visible = false;
                        this.lblSamsungS664GB.Visible = false;
                        this.lblSamsungS6128GB.Visible = false;
                        this.lblSamsungS6Edge32GB.Visible = false;
                        this.lblSamsungS6Edge64GB.Visible = false;
                        this.lblSamsungS6Edge128GB.Visible = false;

                        this.lblAssetheader.Visible = false;
                        this.lblApproveridheader.Visible = false;
                        this.lblNameDesig.Visible = false;
                        this.txtLaptopApproverId.Visible = false;
                        this.txtCellphoneApproverId.Visible = false;
                        this.txtBlackberryApproverId.Visible = false;
                        this.txtBlackberryZ10ApproverId.Visible = false;
                        this.txtSamsungNote3ApproverId.Visible = false;
                        this.txtSamsungS3ApproverId.Visible = false;
                        this.txtSamsungS4ApproverId.Visible = false;
                        this.txtSamsungS5ApproverId.Visible = false;
                        this.txtIPhone4SApproverId.Visible = false;
                        this.txtIPhone5CApproverId.Visible = false;
                        this.txtLGG2ApproverId.Visible = false;

                        this.txtSamsungNote4ApproverId.Visible = false;
                        this.txtIPhone6ApproverId.Visible = false;
                        this.txtIPhone6PApproverId.Visible = false;

                        this.txtLGG3ApproverId.Visible = false;
                        this.txtSamsungS632GBApproverId.Visible = false;
                        this.txtSamsungS664GBApproverId.Visible = false;
                        this.txtSamsungS6128GBApproverId.Visible = false;
                        this.txtSamsungS6Edge32GBApproverId.Visible = false;
                        this.txtSamsungS6Edge64GBApproverId.Visible = false;
                        this.txtSamsungS6Edge128GBApproverId.Visible = false;

                        this.chkLaptop.Visible = false;
                        this.chkCellphone.Visible = false;
                        this.lblBlackberry.Visible = false;
                        this.rdbBlackberryZ10.Visible = false;
                        this.rdbSamsungNote3.Visible = false;
                        this.rdbSamsungS3.Visible = false;
                        this.rdbSamsungS4.Visible = false;
                        this.rdbSamsungS5.Visible = false;
                        this.rdbIPhone4S.Visible = false;
                        this.rdbIPhone5C.Visible = false;
                        this.rdbIPhone5S.Visible = false;
                        this.rdbLGG2.Visible = false;

                        this.rdbSamsungNote4.Visible = false;
                        this.rdbIPhone6.Visible = false;
                        this.rdbIPhone6P.Visible = false;

                        this.rdbLGG3.Visible = false;
                        this.rdbSamsungS632GB.Visible = false;
                        this.rdbSamsungS664GB.Visible = false;
                        this.rdbSamsungS6128GB.Visible = false;
                        this.rdbSamsungS6Edge32GB.Visible = false;
                        this.rdbSamsungS6Edge64GB.Visible = false;
                        this.rdbSamsungS6Edge128GB.Visible = false;

                        this.btnSubmit.Visible = false;
                        this.lblContractorAssetName.Visible = true;
                        this.ddEquipment.Visible = true;
                        this.lblAprvrIdHeader.Visible = true;
                        this.txtappid.Visible = true;
                        this.lblApproverNameHeader.Visible = true;
                        this.ContctEquiAprvName.Visible = true;
                        this.btnSubmit_Cntcr.Visible = true;

                        // ContcrEquidd.Visible = false;
                        // ContcrEquilbl.Visible = false;
                        // ContctEquiAprvName.Visible = false;
                        this.FetchAssetDetails();
                    }
                }
                else
                {
                    if (string.IsNullOrEmpty(this.fileurl))
                    {
                        this.lblContractorAssetName.Visible = false;
                        this.ddEquipment.Visible = false;
                        this.lblAprvrIdHeader.Visible = false;
                        this.txtappid.Visible = false;
                        this.lblApproverNameHeader.Visible = false;
                        this.ContctEquiAprvName.Visible = false;
                        this.btnSubmit_Cntcr.Visible = false;
                        this.lblLaptop.Visible = false;
                        this.lblCellphone.Visible = false;
                        this.lblBlackberry.Visible = false;
                        this.lblBlackberryZ10.Visible = false;
                        this.lblSamsungNote3.Visible = false;
                        this.lblSamsungS3.Visible = false;
                        this.lblSamsungS4.Visible = false;
                        this.lblSamsungS5.Visible = false;
                        this.lblIPhone4S.Visible = false;
                        this.lblIPhone5C.Visible = false;
                        this.lblIPhone5S.Visible = false;
                        this.lblLGG2.Visible = false;

                        this.lblSamsungNote4.Visible = false;
                        this.lblIPhone6.Visible = false;
                        this.lblIPhone6P.Visible = false;

                        this.lblLGG3.Visible = false;
                        this.lblSamsungS632GB.Visible = false;
                        this.lblSamsungS664GB.Visible = false;
                        this.lblSamsungS6128GB.Visible = false;
                        this.lblSamsungS6Edge32GB.Visible = false;
                        this.lblSamsungS6Edge64GB.Visible = false;
                        this.lblSamsungS6Edge128GB.Visible = false;

                        this.lblAssetheader.Visible = false;
                        this.lblApproveridheader.Visible = false;
                        this.lblNameDesig.Visible = false;
                        this.txtLaptopApproverId.Visible = false;
                        this.txtCellphoneApproverId.Visible = false;
                        this.txtBlackberryApproverId.Visible = false;
                        this.txtBlackberryZ10ApproverId.Visible = false;
                        this.txtSamsungNote3ApproverId.Visible = false;
                        this.txtSamsungS3ApproverId.Visible = false;
                        this.txtSamsungS4ApproverId.Visible = false;
                        this.txtSamsungS5ApproverId.Visible = false;
                        this.txtIPhone4SApproverId.Visible = false;
                        this.txtIPhone5CApproverId.Visible = false;
                        this.txtIPhone5SApproverId.Visible = false;
                        this.txtLGG2ApproverId.Visible = false;

                        this.txtSamsungNote4ApproverId.Visible = false;
                        this.txtIPhone6ApproverId.Visible = false;
                        this.txtIPhone6PApproverId.Visible = false;

                        this.txtLGG3ApproverId.Visible = false;
                        this.txtSamsungS632GBApproverId.Visible = false;
                        this.txtSamsungS664GBApproverId.Visible = false;
                        this.txtSamsungS6128GBApproverId.Visible = false;
                        this.txtSamsungS6Edge32GBApproverId.Visible = false;
                        this.txtSamsungS6Edge64GBApproverId.Visible = false;
                        this.txtSamsungS6Edge128GBApproverId.Visible = false;

                        this.chkLaptop.Visible = false;
                        this.chkCellphone.Visible = false;
                        this.lblBlackberry.Visible = false;
                        this.rdbBlackberryZ10.Visible = false;
                        this.rdbSamsungNote3.Visible = false;
                        this.rdbSamsungS3.Visible = false;
                        this.rdbSamsungS4.Visible = false;
                        this.rdbSamsungS5.Visible = false;
                        this.rdbIPhone4S.Visible = false;
                        this.rdbIPhone5C.Visible = false;
                        this.rdbIPhone5S.Visible = false;
                        this.rdbLGG2.Visible = false;

                        this.rdbSamsungNote4.Visible = false;
                        this.rdbIPhone6.Visible = false;
                        this.rdbIPhone6P.Visible = false;

                        this.rdbLGG3.Visible = false;
                        this.rdbSamsungS632GB.Visible = false;
                        this.rdbSamsungS664GB.Visible = false;
                        this.rdbSamsungS6128GB.Visible = false;
                        this.rdbSamsungS6Edge32GB.Visible = false;
                        this.rdbSamsungS6Edge64GB.Visible = false;
                        this.rdbSamsungS6Edge128GB.Visible = false;

                        this.btnSubmit.Visible = false;
                    }
                    else
                    {
                        this.lblContractorAssetName.Visible = false;
                        this.ddEquipment.Visible = false;
                        this.lblAprvrIdHeader.Visible = false;
                        this.txtappid.Visible = false;
                        this.lblApproverNameHeader.Visible = false;
                        this.ContctEquiAprvName.Visible = false;
                        this.btnSubmit_Cntcr.Visible = false;
                        this.lblLaptop.Visible = true;
                        this.lblCellphone.Visible = true;
                        this.lblBlackberry.Visible = true;
                        this.lblBlackberryZ10.Visible = true;
                        this.lblSamsungNote3.Visible = true;
                        this.lblSamsungS3.Visible = true;
                        this.lblSamsungS4.Visible = true;
                        this.lblSamsungS5.Visible = true;
                        this.lblIPhone4S.Visible = true;
                        this.lblIPhone5C.Visible = true;
                        this.lblIPhone5S.Visible = true;
                        this.lblLGG2.Visible = true;

                        this.lblSamsungNote4.Visible = true;
                        this.lblIPhone6.Visible = true;
                        this.lblIPhone6P.Visible = true;

                        this.lblLGG3.Visible = true;
                        this.lblSamsungS632GB.Visible = true;
                        this.lblSamsungS664GB.Visible = true;
                        this.lblSamsungS6128GB.Visible = true;
                        this.lblSamsungS6Edge32GB.Visible = true;
                        this.lblSamsungS6Edge64GB.Visible = true;
                        this.lblSamsungS6Edge128GB.Visible = true;

                        this.lblAssetheader.Visible = true;
                        this.lblApproveridheader.Visible = true;
                        this.lblNameDesig.Visible = true;
                        this.txtLaptopApproverId.Visible = true;
                        this.txtCellphoneApproverId.Visible = true;
                        this.txtBlackberryApproverId.Visible = true;
                        this.txtBlackberryZ10ApproverId.Visible = true;
                        this.txtSamsungNote3ApproverId.Visible = true;
                        this.txtSamsungS3ApproverId.Visible = true;
                        this.txtSamsungS4ApproverId.Visible = true;
                        this.txtSamsungS5ApproverId.Visible = true;
                        this.txtIPhone4SApproverId.Visible = true;
                        this.txtIPhone5CApproverId.Visible = true;
                        this.txtIPhone5SApproverId.Visible = true;
                        this.txtLGG2ApproverId.Visible = true;

                        this.txtSamsungNote4ApproverId.Visible = true;
                        this.txtIPhone6ApproverId.Visible = true;
                        this.txtIPhone6PApproverId.Visible = true;

                        this.txtLGG3ApproverId.Visible = true;
                        this.txtSamsungS632GBApproverId.Visible = true;
                        this.txtSamsungS664GBApproverId.Visible = true;
                        this.txtSamsungS6128GBApproverId.Visible = true;
                        this.txtSamsungS6Edge32GBApproverId.Visible = true;
                        this.txtSamsungS6Edge64GBApproverId.Visible = true;
                        this.txtSamsungS6Edge128GBApproverId.Visible = true;

                        this.chkLaptop.Visible = true;
                        this.chkCellphone.Visible = true;
                        this.lblBlackberry.Visible = true;
                        this.rdbBlackberryZ10.Visible = true;
                        this.rdbSamsungNote3.Visible = true;
                        this.rdbSamsungS3.Visible = true;
                        this.rdbSamsungS4.Visible = true;
                        this.rdbSamsungS5.Visible = true;
                        this.rdbIPhone4S.Visible = true;
                        this.rdbIPhone5C.Visible = true;
                        this.rdbIPhone5S.Visible = true;
                        this.rdbLGG2.Visible = true;

                        this.rdbSamsungNote4.Visible = true;
                        this.rdbIPhone6.Visible = true;
                        this.rdbIPhone6P.Visible = true;

                        this.rdbLGG3.Visible = true;
                        this.rdbSamsungS632GB.Visible = true;
                        this.rdbSamsungS664GB.Visible = true;
                        this.rdbSamsungS6128GB.Visible = true;
                        this.rdbSamsungS6Edge32GB.Visible = true;
                        this.rdbSamsungS6Edge64GB.Visible = true;
                        this.rdbSamsungS6Edge128GB.Visible = true;

                        this.btnSubmit.Visible = true;

                        this.FetchAssetDetails();
                    }
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
                    objarray = this.GetGeographyMaster(22, 1, Convert.ToInt32(cand));
                    if (!string.IsNullOrEmpty(objarray[1].ToString()))
                    {
                        this.fileurl = Convert.ToString(objarray[1].ToString());
                    }
                    else
                    {
                        this.fileurl = string.Empty;
                    }

                    // File must be 400kb or smaller
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
        /// Method to submit the Details of the Candidate and fetch the Asset Details
        /// </summary>
        /// <param name="sender">Sends the Session Details</param>
        /// <param name="e">To get the submitted details</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1505:AvoidUnmaintainableCode", Justification = "reviewed")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", Justification = "Reviewed")]
        protected void BtnSubmit_Click(object sender, EventArgs e)
        {
            try
            {
                ApprovalDetails objApprovalDetails = new ApprovalDetails();
                Utility.UtilityMethods objUtil = new UtilityMethods();
                SessionDetails sessionDetail = new SessionDetails();
                sessionDetail = objUtil.SessionDetail;
                string sessionId = sessionDetail.SessionId.ToString();
                string cand = Request.QueryString["cand"];
                short contractorFlag = Convert.ToInt16(Request.QueryString["IsCont"]);
                string message;
                objApprovalDetails.CandidateId = Convert.ToInt32(cand.ToString());

                if (contractorFlag == 1)
                {
                    if (string.IsNullOrEmpty(this.hdnSelectedEquipment.Value))
                    {
                        message = "alert('Please Select an equipment')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        return;
                    }

                    if (string.IsNullOrEmpty(this.txtappid.Value.ToString()))
                    {
                        message = "alert('Please Enter ApproverId')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        this.ContctEquiAprvName.InnerText = string.Empty;
                        return;
                    }

                    // else if (ddEquipment.SelectedIndex == 0 && txtappid.Value.ToString() != string.Empty)
                    // {
                    //    message = "alert('Please Enter ApproverId')";
                    //    Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                    //    return;
                    // }
                    if (string.IsNullOrEmpty(this.txtappid.Value))
                    {
                        this.ContctEquiAprvName.InnerText = string.Empty;
                    }

                    objApprovalDetails.ContractorEquipment = Convert.ToInt32(this.hdnSelectedEquipment.Value.ToString());
                    if (!string.IsNullOrEmpty(this.txtappid.Value.ToString()))
                    {
                        objApprovalDetails.ContractorEquipmentApproverId = Convert.ToInt32(this.txtappid.Value.ToString());
                    }

                    objApprovalDetails.SessionId = Convert.ToInt32(sessionId.ToString());
                    using (DashBoardServicesClient objDashBoardServicesClient = new DashBoardServicesClient())
                    {
                        objDashBoardServicesClient.SaveApprovalRequestData(objApprovalDetails);
                    }

                    this.lblmsg.Visible = false;
                    this.lblmsg_cntct.Visible = true;
                    this.FetchAssetDetails();
                }
                else
                {
                    // if (this.chkLaptop.Checked == false && this.chkBlackberry.Checked == false && this.chkCellphone.Checked == false && this.txtLaptopApproverId.Value.ToString() == string.Empty && this.txtCellphoneApproverId.Value.ToString() == string.Empty && this.txtBlackberryApproverId.Value.ToString() == string.Empty)
                    // {
                    //    message = "alert('Please select an equipment to update')";
                    //    Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                    //    this.lblLaptopApproverNameDesg.InnerText = string.Empty;
                    //    return;
                    // }
                    if (this.chkLaptop.Checked == false && this.chkBlackberry.Checked == false && this.chkCellphone.Checked == false && this.rdbBlackberryZ10.Checked == false && this.rdbSamsungS3.Checked == false && this.rdbSamsungS4.Checked == false && this.rdbSamsungS5.Checked == false && this.rdbSamsungNote3.Checked == false && this.rdbIPhone4S.Checked == false && this.rdbIPhone5C.Checked == false && this.rdbIPhone5S.Checked == false && this.rdbSamsungNote4.Checked == false && this.rdbIPhone6.Checked == false && this.rdbIPhone6P.Checked == false && this.rdbLGG3.Checked == false && this.rdbSamsungS632GB.Checked == false && this.rdbSamsungS664GB.Checked == false && this.rdbSamsungS6128GB.Checked == false && this.rdbSamsungS6Edge32GB.Checked == false && this.rdbSamsungS6Edge64GB.Checked == false && this.rdbSamsungS6Edge128GB.Checked == false && string.IsNullOrEmpty(this.txtLGG2ApproverId.Value.ToString()))
                    {
                        message = "alert('Please select an equipment to update')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        this.lblLaptopApproverNameDesg.InnerText = string.Empty;
                        return;
                    }

                    if (this.chkLaptop.Checked == true && string.IsNullOrEmpty(this.txtLaptopApproverId.Value.ToString()))
                    {
                        message = "alert('Please Enter ApproverId for Laptop')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        this.lblLaptopApproverNameDesg.InnerText = string.Empty;
                        this.lblCellphoneApproverNameDesg.InnerText = string.Empty;
                        this.lblBlackberryApproverNameDesg.InnerText = string.Empty;
                        return;
                    }
                    else if (this.chkLaptop.Checked == false && !string.IsNullOrEmpty(this.txtLaptopApproverId.Value.ToString()))
                    {
                        message = "alert('Please Select Assettype for Laptop')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        return;
                    }

                    if (this.chkCellphone.Checked == true && string.IsNullOrEmpty(this.txtCellphoneApproverId.Value.ToString()))
                    {
                        message = "alert('Please Enter ApproverId for Cellphone')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        this.lblCellphoneApproverNameDesg.InnerText = string.Empty;
                        return;
                    }
                    else if (this.chkCellphone.Checked == false && !string.IsNullOrEmpty(this.txtCellphoneApproverId.Value.ToString()))
                    {
                        message = "alert('Please Select Assettype for Cellphone')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);

                        return;
                    }

                    if (this.chkBlackberry.Checked == true && string.IsNullOrEmpty(this.txtBlackberryApproverId.Value.ToString()))
                    {
                        message = "alert('Please Enter ApproverId for Blackberry')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        this.lblBlackberryApproverNameDesg.InnerText = string.Empty;
                        return;
                    }
                    else if (this.chkBlackberry.Checked == false && !string.IsNullOrEmpty(this.txtBlackberryApproverId.Value.ToString()))
                    {
                        message = "alert('Please Select Assettype for Blackberry')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        return;
                    }

                    if (this.rdbBlackberryZ10.Checked == true && string.IsNullOrEmpty(this.txtBlackberryZ10ApproverId.Value.ToString()))
                    {
                        message = "alert('Please Enter ApproverId for BlackberryZ10')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        this.lblBlackberryZ10ApproverNameDesg.InnerText = string.Empty;
                        return;
                    }
                    else if (this.rdbBlackberryZ10.Checked == false && !string.IsNullOrEmpty(this.txtBlackberryZ10ApproverId.Value.ToString()))
                    {
                        message = "alert('Please Select Assettype for BlackberryZ10')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        return;
                    }

                    if (this.rdbSamsungS3.Checked == true && string.IsNullOrEmpty(this.txtSamsungS3ApproverId.Value.ToString()))
                    {
                        message = "alert('Please Enter ApproverId for SamsungS3')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        this.lblSamsungS3ApproverNameDesg.InnerText = string.Empty;
                        return;
                    }
                    else if (this.rdbSamsungS3.Checked == false && !string.IsNullOrEmpty(this.txtSamsungS3ApproverId.Value.ToString()))
                    {
                        message = "alert('Please Select Assettype for SamsungS3')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        return;
                    }

                    if (this.rdbSamsungS4.Checked == true && string.IsNullOrEmpty(this.txtSamsungS4ApproverId.Value.ToString()))
                    {
                        message = "alert('Please Enter ApproverId for SamsungS4')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        this.lblSamsungS4ApproverNameDesg.InnerText = string.Empty;
                        return;
                    }
                    else if (this.rdbSamsungS4.Checked == false && !string.IsNullOrEmpty(this.txtSamsungS4ApproverId.Value.ToString()))
                    {
                        message = "alert('Please Select Assettype for SamsungS4')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        return;
                    }

                    if (this.rdbSamsungS5.Checked == true && string.IsNullOrEmpty(this.txtSamsungS5ApproverId.Value.ToString()))
                    {
                        message = "alert('Please Enter ApproverId for SamsungS5')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        this.lblSamsungS5ApproverNameDesg.InnerText = string.Empty;
                        return;
                    }
                    else if (this.rdbSamsungS5.Checked == false && !string.IsNullOrEmpty(this.txtSamsungS5ApproverId.Value.ToString()))
                    {
                        message = "alert('Please Select Assettype for SamsungS5')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        return;
                    }

                    if (this.rdbSamsungNote3.Checked == true && string.IsNullOrEmpty(this.txtSamsungNote3ApproverId.Value.ToString()))
                    {
                        message = "alert('Please Enter ApproverId for SamsungNote3')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        this.lblSamsungNote3ApproverNameDesg.InnerText = string.Empty;
                        return;
                    }
                    else if (this.rdbSamsungNote3.Checked == false && !string.IsNullOrEmpty(this.txtSamsungNote3ApproverId.Value.ToString()))
                    {
                        message = "alert('Please Select Assettype for SamsungNote3')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        return;
                    }

                    if (this.rdbIPhone4S.Checked == true && string.IsNullOrEmpty(this.txtIPhone4SApproverId.Value.ToString()))
                    {
                        message = "alert('Please Enter ApproverId for IPhone4S')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        this.lblIPhone4SApproverNameDesg.InnerText = string.Empty;
                        return;
                    }
                    else if (this.rdbIPhone4S.Checked == false && !string.IsNullOrEmpty(this.txtIPhone4SApproverId.Value.ToString()))
                    {
                        message = "alert('Please Select Assettype for IPhone4S')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        return;
                    }

                    if (this.rdbIPhone5C.Checked == true && string.IsNullOrEmpty(this.txtIPhone5CApproverId.Value.ToString()))
                    {
                        message = "alert('Please Enter ApproverId for IPhone5C')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        this.lblIPhone5CApproverNameDesg.InnerText = string.Empty;
                        return;
                    }
                    else if (this.rdbIPhone5C.Checked == false && !string.IsNullOrEmpty(this.txtIPhone5CApproverId.Value.ToString()))
                    {
                        message = "alert('Please Select Assettype for IPhone5C')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        return;
                    }

                    if (this.rdbIPhone5S.Checked == true && string.IsNullOrEmpty(this.txtIPhone5SApproverId.Value.ToString()))
                    {
                        message = "alert('Please Enter ApproverId for IPhone5S')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        this.lblIPhone5SApproverNameDesg.InnerText = string.Empty;
                        return;
                    }
                    else if (this.rdbIPhone5S.Checked == false && !string.IsNullOrEmpty(this.txtIPhone5SApproverId.Value.ToString()))
                    {
                        message = "alert('Please Select Assettype for IPhone5S')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        return;
                    }

                    if (this.rdbLGG2.Checked == true && string.IsNullOrEmpty(this.txtLGG2ApproverId.Value.ToString()))
                    {
                        message = "alert('Please Enter ApproverId for LGG2')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        this.lblLGG2ApproverNameDesg.InnerText = string.Empty;
                        return;
                    }
                    else if (this.rdbLGG2.Checked == false && !string.IsNullOrEmpty(this.txtLGG2ApproverId.Value.ToString()))
                    {
                        message = "alert('Please Select Assettype for LGG2')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        return;
                    }

                    if (this.rdbSamsungNote4.Checked == true && string.IsNullOrEmpty(this.txtSamsungNote4ApproverId.Value.ToString()))
                    {
                        message = "alert('Please Enter ApproverId for SamsungNote4')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        this.lblSamsungNote4ApproverNameDesg.InnerText = string.Empty;
                        return;
                    }
                    else if (this.rdbSamsungNote4.Checked == false && !string.IsNullOrEmpty(this.txtSamsungNote4ApproverId.Value.ToString()))
                    {
                        message = "alert('Please Select Assettype for SamsungNote4')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        return;
                    }

                    if (this.rdbIPhone6.Checked == true && string.IsNullOrEmpty(this.txtIPhone6ApproverId.Value.ToString()))
                    {
                        message = "alert('Please Enter ApproverId for IPhone6')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        this.lblIPhone6ApproverNameDesg.InnerText = string.Empty;
                        return;
                    }
                    else if (this.rdbIPhone6.Checked == false && !string.IsNullOrEmpty(this.txtIPhone6ApproverId.Value.ToString()))
                    {
                        message = "alert('Please Select Assettype for IPhone6')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        return;
                    }

                    if (this.rdbIPhone6P.Checked == true && string.IsNullOrEmpty(this.txtIPhone6PApproverId.Value.ToString()))
                    {
                        message = "alert('Please Enter ApproverId for IPhone6P')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        this.lblIPhone6PApproverNameDesg.InnerText = string.Empty;
                        return;
                    }
                    else if (this.rdbIPhone6P.Checked == false && !string.IsNullOrEmpty(this.txtIPhone6PApproverId.Value.ToString()))
                    {
                        message = "alert('Please Select Assettype for IPhone6P')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        return;
                    }

                    //Added new phones

                    if (this.rdbLGG3.Checked == true && string.IsNullOrEmpty(this.txtLGG3ApproverId.Value.ToString()))
                    {
                        message = "alert('Please Enter ApproverId for LGG3')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        this.lblLGG3ApproverNameDesg.InnerText = string.Empty;
                        return;
                    }
                    else if (this.rdbLGG3.Checked == false && !string.IsNullOrEmpty(this.txtLGG3ApproverId.Value.ToString()))
                    {
                        message = "alert('Please Select Assettype for LGG3')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        return;
                    }

                    if (this.rdbSamsungS632GB.Checked == true && string.IsNullOrEmpty(this.txtSamsungS632GBApproverId.Value.ToString()))
                    {
                        message = "alert('Please Enter ApproverId for SamsungS6 32GB')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        this.lblSamsungS632GBApproverNameDesg.InnerText = string.Empty;
                        return;
                    }
                    else if (this.rdbSamsungS632GB.Checked == false && !string.IsNullOrEmpty(this.txtSamsungS632GBApproverId.Value.ToString()))
                    {
                        message = "alert('Please Select Assettype for SamsungS6 32GB')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        return;
                    }


                    if (this.rdbSamsungS664GB.Checked == true && string.IsNullOrEmpty(this.txtSamsungS664GBApproverId.Value.ToString()))
                    {
                        message = "alert('Please Enter ApproverId for SamsungS6 64GB')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        this.lblSamsungS664GBApproverNameDesg.InnerText = string.Empty;
                        return;
                    }
                    else if (this.rdbSamsungS664GB.Checked == false && !string.IsNullOrEmpty(this.txtSamsungS664GBApproverId.Value.ToString()))
                    {
                        message = "alert('Please Select Assettype for SamsungS6 64GB')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        return;
                    }

                    if (this.rdbSamsungS6128GB.Checked == true && string.IsNullOrEmpty(this.txtSamsungS6128GBApproverId.Value.ToString()))
                    {
                        message = "alert('Please Enter ApproverId for SamsungS6 128GB')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        this.lblSamsungS6128GBApproverNameDesg.InnerText = string.Empty;
                        return;
                    }
                    else if (this.rdbSamsungS6128GB.Checked == false && !string.IsNullOrEmpty(this.txtSamsungS6128GBApproverId.Value.ToString()))
                    {
                        message = "alert('Please Select Assettype for SamsungS6 128GB')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        return;
                    }

                    if (this.rdbSamsungS6Edge32GB.Checked == true && string.IsNullOrEmpty(this.txtSamsungS6Edge32GBApproverId.Value.ToString()))
                    {
                        message = "alert('Please Enter ApproverId for SamsungS6 Edge 32GB')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        this.lblSamsungS6Edge32GBApproverNameDesg.InnerText = string.Empty;
                        return;
                    }
                    else if (this.rdbSamsungS6Edge32GB.Checked == false && !string.IsNullOrEmpty(this.txtSamsungS6Edge32GBApproverId.Value.ToString()))
                    {
                        message = "alert('Please Select Assettype for SamsungS6 Edge 32GB')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        return;
                    }

                    if (this.rdbSamsungS6Edge64GB.Checked == true && string.IsNullOrEmpty(this.txtSamsungS6Edge64GBApproverId.Value.ToString()))
                    {
                        message = "alert('Please Enter ApproverId for SamsungS6 Edge 64GB')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        this.lblSamsungS6Edge64GBApproverNameDesg.InnerText = string.Empty;
                        return;
                    }
                    else if (this.rdbSamsungS6Edge64GB.Checked == false && !string.IsNullOrEmpty(this.txtSamsungS6Edge64GBApproverId.Value.ToString()))
                    {
                        message = "alert('Please Select Assettype for SamsungS6 Edge 64GB')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        return;
                    }

                    if (this.rdbSamsungS6Edge128GB.Checked == true && string.IsNullOrEmpty(this.txtSamsungS6Edge128GBApproverId.Value.ToString()))
                    {
                        message = "alert('Please Enter ApproverId for SamsungS6 Edge 128GB')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        this.lblSamsungS6Edge128GBApproverNameDesg.InnerText = string.Empty;
                        return;
                    }
                    else if (this.rdbSamsungS6Edge128GB.Checked == false && !string.IsNullOrEmpty(this.txtSamsungS6Edge128GBApproverId.Value.ToString()))
                    {
                        message = "alert('Please Select Assettype for SamsungS6 Edge 128GB')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "ErrorMessage", message, true);
                        return;
                    }

                    //Added new phones ended

                    if (string.IsNullOrEmpty(this.txtLaptopApproverId.Value))
                    {
                        this.lblLaptopApproverNameDesg.InnerText = string.Empty;
                    }

                    if (string.IsNullOrEmpty(this.txtCellphoneApproverId.Value))
                    {
                        this.lblCellphoneApproverNameDesg.InnerText = string.Empty;
                    }

                    if (string.IsNullOrEmpty(this.txtBlackberryApproverId.Value))
                    {
                        this.lblBlackberryApproverNameDesg.InnerText = string.Empty;
                    }

                    if (string.IsNullOrEmpty(this.txtBlackberryZ10ApproverId.Value))
                    {
                        this.lblBlackberryZ10ApproverNameDesg.InnerText = string.Empty;
                    }

                    if (string.IsNullOrEmpty(this.txtSamsungS3ApproverId.Value))
                    {
                        this.lblSamsungS3ApproverNameDesg.InnerText = string.Empty;
                    }

                    if (string.IsNullOrEmpty(this.txtSamsungS4ApproverId.Value))
                    {
                        this.lblSamsungS4ApproverNameDesg.InnerText = string.Empty;
                    }

                    if (string.IsNullOrEmpty(this.txtSamsungS5ApproverId.Value))
                    {
                        this.lblSamsungS5ApproverNameDesg.InnerText = string.Empty;
                    }

                    if (string.IsNullOrEmpty(this.txtSamsungNote3ApproverId.Value))
                    {
                        this.lblSamsungNote3ApproverNameDesg.InnerText = string.Empty;
                    }

                    if (string.IsNullOrEmpty(this.txtIPhone4SApproverId.Value))
                    {
                        this.lblIPhone4SApproverNameDesg.InnerText = string.Empty;
                    }

                    if (string.IsNullOrEmpty(this.txtIPhone5CApproverId.Value))
                    {
                        this.lblIPhone5CApproverNameDesg.InnerText = string.Empty;
                    }

                    if (string.IsNullOrEmpty(this.txtIPhone5SApproverId.Value))
                    {
                        this.lblIPhone5SApproverNameDesg.InnerText = string.Empty;
                    }

                    if (string.IsNullOrEmpty(this.txtLGG2ApproverId.Value))
                    {
                        this.lblLGG2ApproverNameDesg.InnerText = string.Empty;
                    }

                    if (string.IsNullOrEmpty(this.txtSamsungNote4ApproverId.Value))
                    {
                        this.lblSamsungNote4ApproverNameDesg.InnerText = string.Empty;
                    }

                    if (string.IsNullOrEmpty(this.txtIPhone6ApproverId.Value))
                    {
                        this.lblIPhone6ApproverNameDesg.InnerText = string.Empty;
                    }

                    if (string.IsNullOrEmpty(this.txtIPhone6PApproverId.Value))
                    {
                        this.lblIPhone6PApproverNameDesg.InnerText = string.Empty;
                    }
                    // Added new phones
                    if (string.IsNullOrEmpty(this.txtLGG3ApproverId.Value))
                    {
                        this.lblLGG3ApproverNameDesg.InnerText = string.Empty;
                    }

                    if (string.IsNullOrEmpty(this.txtSamsungS632GBApproverId.Value))
                    {
                        this.lblSamsungS632GBApproverNameDesg.InnerText = string.Empty;
                    }

                    if (string.IsNullOrEmpty(this.txtSamsungS664GBApproverId.Value))
                    {
                        this.lblSamsungS664GBApproverNameDesg.InnerText = string.Empty;
                    }
                    if (string.IsNullOrEmpty(this.txtSamsungS6128GBApproverId.Value))
                    {
                        this.lblSamsungS6128GBApproverNameDesg.InnerText = string.Empty;
                    }
                    if (string.IsNullOrEmpty(this.txtSamsungS6Edge32GBApproverId.Value))
                    {
                        this.lblSamsungS6Edge32GBApproverNameDesg.InnerText = string.Empty;
                    }
                    if (string.IsNullOrEmpty(this.txtSamsungS6Edge64GBApproverId.Value))
                    {
                        this.lblSamsungS6Edge64GBApproverNameDesg.InnerText = string.Empty;
                    }
                    if (string.IsNullOrEmpty(this.txtSamsungS6Edge128GBApproverId.Value))
                    {
                        this.lblSamsungS6Edge128GBApproverNameDesg.InnerText = string.Empty;
                    }
                    // Added new phones ends
                    if (this.chkLaptop.Checked == true)
                    {
                        objApprovalDetails.Laptop = 1;
                    }
                    else
                    {
                        objApprovalDetails.Laptop = 0;
                    }

                    if (this.chkCellphone.Checked == true)
                    {
                        objApprovalDetails.Cellphone = 1;
                    }
                    else
                    {
                        objApprovalDetails.Cellphone = 0;
                    }

                    if (this.chkBlackberry.Checked == true)
                    {
                        objApprovalDetails.Blackberry = 1;
                    }
                    else
                    {
                        objApprovalDetails.Blackberry = 0;
                    }

                    if (this.rdbBlackberryZ10.Checked == true)
                    {
                        objApprovalDetails.BlackberryZ10 = 1;
                        objApprovalDetails.SamsungNote3 = 0;
                        objApprovalDetails.Samsungs4 = 0;
                        objApprovalDetails.Samsungs5 = 0;
                        objApprovalDetails.Samsungs3 = 0;
                        objApprovalDetails.IPhone4s = 0;
                        objApprovalDetails.IPhone5c = 0;
                        objApprovalDetails.IPhone5s = 0;
                        objApprovalDetails.LGG2 = 0;
                        objApprovalDetails.SamsungNote4 = 0;
                        objApprovalDetails.Iphone6 = 0;
                        objApprovalDetails.IPhone6p = 0;
                        objApprovalDetails.LGG3 = 0;
                        objApprovalDetails.SamsungS632GB = 0;
                        objApprovalDetails.SamsungS664GB = 0;
                        objApprovalDetails.SamsungS6128GB = 0;
                        objApprovalDetails.SamsungS6Edge32GB = 0;
                        objApprovalDetails.SamsungS6Edge64GB = 0;
                        objApprovalDetails.SamsungS6Edge128GB = 0;

                    }
                    else if (this.rdbSamsungS3.Checked == true)
                    {
                        objApprovalDetails.BlackberryZ10 = 0;
                        objApprovalDetails.SamsungNote3 = 0;
                        objApprovalDetails.Samsungs4 = 0;
                        objApprovalDetails.Samsungs5 = 0;
                        objApprovalDetails.Samsungs3 = 1;
                        objApprovalDetails.IPhone4s = 0;
                        objApprovalDetails.IPhone5c = 0;
                        objApprovalDetails.IPhone5s = 0;
                        objApprovalDetails.LGG2 = 0;
                        objApprovalDetails.SamsungNote4 = 0;
                        objApprovalDetails.Iphone6 = 0;
                        objApprovalDetails.IPhone6p = 0;
                        objApprovalDetails.LGG3 = 0;
                        objApprovalDetails.SamsungS632GB = 0;
                        objApprovalDetails.SamsungS664GB = 0;
                        objApprovalDetails.SamsungS6128GB = 0;
                        objApprovalDetails.SamsungS6Edge32GB = 0;
                        objApprovalDetails.SamsungS6Edge64GB = 0;
                        objApprovalDetails.SamsungS6Edge128GB = 0;
                    }
                    else if (this.rdbSamsungS4.Checked == true)
                    {
                        objApprovalDetails.BlackberryZ10 = 0;
                        objApprovalDetails.SamsungNote3 = 0;
                        objApprovalDetails.Samsungs4 = 1;
                        objApprovalDetails.Samsungs5 = 0;
                        objApprovalDetails.Samsungs3 = 0;
                        objApprovalDetails.IPhone4s = 0;
                        objApprovalDetails.IPhone5c = 0;
                        objApprovalDetails.IPhone5s = 0;
                        objApprovalDetails.LGG2 = 0;
                        objApprovalDetails.SamsungNote4 = 0;
                        objApprovalDetails.Iphone6 = 0;
                        objApprovalDetails.IPhone6p = 0;
                        objApprovalDetails.LGG3 = 0;
                        objApprovalDetails.SamsungS632GB = 0;
                        objApprovalDetails.SamsungS664GB = 0;
                        objApprovalDetails.SamsungS6128GB = 0;
                        objApprovalDetails.SamsungS6Edge32GB = 0;
                        objApprovalDetails.SamsungS6Edge64GB = 0;
                        objApprovalDetails.SamsungS6Edge128GB = 0;
                    }
                    else if (this.rdbSamsungS5.Checked == true)
                    {
                        objApprovalDetails.BlackberryZ10 = 0;
                        objApprovalDetails.SamsungNote3 = 0;
                        objApprovalDetails.Samsungs4 = 0;
                        objApprovalDetails.Samsungs5 = 1;
                        objApprovalDetails.Samsungs3 = 0;
                        objApprovalDetails.IPhone4s = 0;
                        objApprovalDetails.IPhone5c = 0;
                        objApprovalDetails.IPhone5s = 0;
                        objApprovalDetails.LGG2 = 0;
                        objApprovalDetails.SamsungNote4 = 0;
                        objApprovalDetails.Iphone6 = 0;
                        objApprovalDetails.IPhone6p = 0;
                        objApprovalDetails.LGG3 = 0;
                        objApprovalDetails.SamsungS632GB = 0;
                        objApprovalDetails.SamsungS664GB = 0;
                        objApprovalDetails.SamsungS6128GB = 0;
                        objApprovalDetails.SamsungS6Edge32GB = 0;
                        objApprovalDetails.SamsungS6Edge64GB = 0;
                        objApprovalDetails.SamsungS6Edge128GB = 0;
                    }
                    else if (this.rdbIPhone4S.Checked == true)
                    {
                        objApprovalDetails.BlackberryZ10 = 0;
                        objApprovalDetails.SamsungNote3 = 0;
                        objApprovalDetails.Samsungs4 = 0;
                        objApprovalDetails.Samsungs5 = 0;
                        objApprovalDetails.Samsungs3 = 0;
                        objApprovalDetails.IPhone4s = 1;
                        objApprovalDetails.IPhone5c = 0;
                        objApprovalDetails.IPhone5s = 0;
                        objApprovalDetails.LGG2 = 0;
                        objApprovalDetails.SamsungNote4 = 0;
                        objApprovalDetails.Iphone6 = 0;
                        objApprovalDetails.IPhone6p = 0;
                        objApprovalDetails.LGG3 = 0;
                        objApprovalDetails.SamsungS632GB = 0;
                        objApprovalDetails.SamsungS664GB = 0;
                        objApprovalDetails.SamsungS6128GB = 0;
                        objApprovalDetails.SamsungS6Edge32GB = 0;
                        objApprovalDetails.SamsungS6Edge64GB = 0;
                        objApprovalDetails.SamsungS6Edge128GB = 0;
                    }
                    else if (this.rdbIPhone5C.Checked == true)
                    {
                        objApprovalDetails.BlackberryZ10 = 0;
                        objApprovalDetails.SamsungNote3 = 0;
                        objApprovalDetails.Samsungs4 = 0;
                        objApprovalDetails.Samsungs5 = 0;
                        objApprovalDetails.Samsungs3 = 0;
                        objApprovalDetails.IPhone4s = 0;
                        objApprovalDetails.IPhone5c = 1;
                        objApprovalDetails.IPhone5s = 0;
                        objApprovalDetails.LGG2 = 0;
                        objApprovalDetails.SamsungNote4 = 0;
                        objApprovalDetails.Iphone6 = 0;
                        objApprovalDetails.IPhone6p = 0;
                        objApprovalDetails.LGG3 = 0;
                        objApprovalDetails.SamsungS632GB = 0;
                        objApprovalDetails.SamsungS664GB = 0;
                        objApprovalDetails.SamsungS6128GB = 0;
                        objApprovalDetails.SamsungS6Edge32GB = 0;
                        objApprovalDetails.SamsungS6Edge64GB = 0;
                        objApprovalDetails.SamsungS6Edge128GB = 0;
                    }
                    else if (this.rdbIPhone5S.Checked == true)
                    {
                        objApprovalDetails.BlackberryZ10 = 0;
                        objApprovalDetails.SamsungNote3 = 0;
                        objApprovalDetails.Samsungs4 = 0;
                        objApprovalDetails.Samsungs5 = 0;
                        objApprovalDetails.Samsungs3 = 0;
                        objApprovalDetails.IPhone4s = 0;
                        objApprovalDetails.IPhone5c = 0;
                        objApprovalDetails.IPhone5s = 1;
                        objApprovalDetails.LGG2 = 0;
                        objApprovalDetails.SamsungNote4 = 0;
                        objApprovalDetails.Iphone6 = 0;
                        objApprovalDetails.IPhone6p = 0;
                        objApprovalDetails.LGG3 = 0;
                        objApprovalDetails.SamsungS632GB = 0;
                        objApprovalDetails.SamsungS664GB = 0;
                        objApprovalDetails.SamsungS6128GB = 0;
                        objApprovalDetails.SamsungS6Edge32GB = 0;
                        objApprovalDetails.SamsungS6Edge64GB = 0;
                        objApprovalDetails.SamsungS6Edge128GB = 0;
                    }
                    else if (this.rdbSamsungNote3.Checked == true)
                    {
                        objApprovalDetails.BlackberryZ10 = 0;
                        objApprovalDetails.SamsungNote3 = 1;
                        objApprovalDetails.Samsungs4 = 0;
                        objApprovalDetails.Samsungs5 = 0;
                        objApprovalDetails.Samsungs3 = 0;
                        objApprovalDetails.IPhone4s = 0;
                        objApprovalDetails.IPhone5c = 0;
                        objApprovalDetails.IPhone5s = 0;
                        objApprovalDetails.LGG2 = 0;
                        objApprovalDetails.SamsungNote4 = 0;
                        objApprovalDetails.Iphone6 = 0;
                        objApprovalDetails.IPhone6p = 0;
                        objApprovalDetails.LGG3 = 0;
                        objApprovalDetails.SamsungS632GB = 0;
                        objApprovalDetails.SamsungS664GB = 0;
                        objApprovalDetails.SamsungS6128GB = 0;
                        objApprovalDetails.SamsungS6Edge32GB = 0;
                        objApprovalDetails.SamsungS6Edge64GB = 0;
                        objApprovalDetails.SamsungS6Edge128GB = 0;
                    }
                    else if (this.rdbLGG2.Checked == true)
                    {
                        objApprovalDetails.BlackberryZ10 = 0;
                        objApprovalDetails.LGG2 = 1;
                        objApprovalDetails.SamsungNote3 = 0;
                        objApprovalDetails.Samsungs4 = 0;
                        objApprovalDetails.Samsungs5 = 0;
                        objApprovalDetails.Samsungs3 = 0;
                        objApprovalDetails.IPhone4s = 0;
                        objApprovalDetails.IPhone5c = 0;
                        objApprovalDetails.IPhone5s = 0;
                        objApprovalDetails.SamsungNote4 = 0;
                        objApprovalDetails.Iphone6 = 0;
                        objApprovalDetails.IPhone6p = 0;
                        objApprovalDetails.LGG3 = 0;
                        objApprovalDetails.SamsungS632GB = 0;
                        objApprovalDetails.SamsungS664GB = 0;
                        objApprovalDetails.SamsungS6128GB = 0;
                        objApprovalDetails.SamsungS6Edge32GB = 0;
                        objApprovalDetails.SamsungS6Edge64GB = 0;
                        objApprovalDetails.SamsungS6Edge128GB = 0;
                    }
                    else if (this.rdbSamsungNote4.Checked == true)
                    {
                        objApprovalDetails.BlackberryZ10 = 0;
                        objApprovalDetails.LGG2 = 0;
                        objApprovalDetails.SamsungNote3 = 0;
                        objApprovalDetails.Samsungs4 = 0;
                        objApprovalDetails.Samsungs5 = 0;
                        objApprovalDetails.Samsungs3 = 0;
                        objApprovalDetails.IPhone4s = 0;
                        objApprovalDetails.IPhone5c = 0;
                        objApprovalDetails.IPhone5s = 0;
                        objApprovalDetails.SamsungNote4 = 1;
                        objApprovalDetails.Iphone6 = 0;
                        objApprovalDetails.IPhone6p = 0;
                        objApprovalDetails.LGG3 = 0;
                        objApprovalDetails.SamsungS632GB = 0;
                        objApprovalDetails.SamsungS664GB = 0;
                        objApprovalDetails.SamsungS6128GB = 0;
                        objApprovalDetails.SamsungS6Edge32GB = 0;
                        objApprovalDetails.SamsungS6Edge64GB = 0;
                        objApprovalDetails.SamsungS6Edge128GB = 0;
                    }
                    else if (this.rdbIPhone6.Checked == true)
                    {
                        objApprovalDetails.BlackberryZ10 = 0;
                        objApprovalDetails.LGG2 = 0;
                        objApprovalDetails.SamsungNote3 = 0;
                        objApprovalDetails.Samsungs4 = 0;
                        objApprovalDetails.Samsungs5 = 0;
                        objApprovalDetails.Samsungs3 = 0;
                        objApprovalDetails.IPhone4s = 0;
                        objApprovalDetails.IPhone5c = 0;
                        objApprovalDetails.IPhone5s = 0;
                        objApprovalDetails.SamsungNote4 = 0;
                        objApprovalDetails.Iphone6 = 1;
                        objApprovalDetails.IPhone6p = 0;
                        objApprovalDetails.LGG3 = 0;
                        objApprovalDetails.SamsungS632GB = 0;
                        objApprovalDetails.SamsungS664GB = 0;
                        objApprovalDetails.SamsungS6128GB = 0;
                        objApprovalDetails.SamsungS6Edge32GB = 0;
                        objApprovalDetails.SamsungS6Edge64GB = 0;
                        objApprovalDetails.SamsungS6Edge128GB = 0;
                    }
                    else if (this.rdbIPhone6P.Checked == true)
                    {
                        objApprovalDetails.BlackberryZ10 = 0;
                        objApprovalDetails.LGG2 = 0;
                        objApprovalDetails.SamsungNote3 = 0;
                        objApprovalDetails.Samsungs4 = 0;
                        objApprovalDetails.Samsungs5 = 0;
                        objApprovalDetails.Samsungs3 = 0;
                        objApprovalDetails.IPhone4s = 0;
                        objApprovalDetails.IPhone5c = 0;
                        objApprovalDetails.IPhone5s = 0;
                        objApprovalDetails.SamsungNote4 = 0;
                        objApprovalDetails.Iphone6 = 0;
                        objApprovalDetails.IPhone6p = 1;
                        objApprovalDetails.LGG3 = 0;
                        objApprovalDetails.SamsungS632GB = 0;
                        objApprovalDetails.SamsungS664GB = 0;
                        objApprovalDetails.SamsungS6128GB = 0;
                        objApprovalDetails.SamsungS6Edge32GB = 0;
                        objApprovalDetails.SamsungS6Edge64GB = 0;
                        objApprovalDetails.SamsungS6Edge128GB = 0;
                    }
                    else if (this.rdbLGG3.Checked == true)                  //Added new phones
                    {
                        objApprovalDetails.BlackberryZ10 = 0;
                        objApprovalDetails.LGG2 = 0;
                        objApprovalDetails.SamsungNote3 = 0;
                        objApprovalDetails.Samsungs4 = 0;
                        objApprovalDetails.Samsungs5 = 0;
                        objApprovalDetails.Samsungs3 = 0;
                        objApprovalDetails.IPhone4s = 0;
                        objApprovalDetails.IPhone5c = 0;
                        objApprovalDetails.IPhone5s = 0;
                        objApprovalDetails.SamsungNote4 = 0;
                        objApprovalDetails.Iphone6 = 0;
                        objApprovalDetails.IPhone6p = 0;
                        objApprovalDetails.LGG3 = 1;
                        objApprovalDetails.SamsungS632GB = 0;
                        objApprovalDetails.SamsungS664GB = 0;
                        objApprovalDetails.SamsungS6128GB = 0;
                        objApprovalDetails.SamsungS6Edge32GB = 0;
                        objApprovalDetails.SamsungS6Edge64GB = 0;
                        objApprovalDetails.SamsungS6Edge128GB = 0;
                    }
                    else if (this.rdbSamsungS632GB.Checked == true)
                    {
                        objApprovalDetails.BlackberryZ10 = 0;
                        objApprovalDetails.LGG2 = 0;
                        objApprovalDetails.SamsungNote3 = 0;
                        objApprovalDetails.Samsungs4 = 0;
                        objApprovalDetails.Samsungs5 = 0;
                        objApprovalDetails.Samsungs3 = 0;
                        objApprovalDetails.IPhone4s = 0;
                        objApprovalDetails.IPhone5c = 0;
                        objApprovalDetails.IPhone5s = 0;
                        objApprovalDetails.SamsungNote4 = 0;
                        objApprovalDetails.Iphone6 = 0;
                        objApprovalDetails.IPhone6p = 0;
                        objApprovalDetails.LGG3 = 0;
                        objApprovalDetails.SamsungS632GB = 1;
                        objApprovalDetails.SamsungS664GB = 0;
                        objApprovalDetails.SamsungS6128GB = 0;
                        objApprovalDetails.SamsungS6Edge32GB = 0;
                        objApprovalDetails.SamsungS6Edge64GB = 0;
                        objApprovalDetails.SamsungS6Edge128GB = 0;
                    }
                    else if (this.rdbSamsungS664GB.Checked == true)
                    {
                        objApprovalDetails.BlackberryZ10 = 0;
                        objApprovalDetails.LGG2 = 0;
                        objApprovalDetails.SamsungNote3 = 0;
                        objApprovalDetails.Samsungs4 = 0;
                        objApprovalDetails.Samsungs5 = 0;
                        objApprovalDetails.Samsungs3 = 0;
                        objApprovalDetails.IPhone4s = 0;
                        objApprovalDetails.IPhone5c = 0;
                        objApprovalDetails.IPhone5s = 0;
                        objApprovalDetails.SamsungNote4 = 0;
                        objApprovalDetails.Iphone6 = 0;
                        objApprovalDetails.IPhone6p = 0;
                        objApprovalDetails.LGG3 = 0;
                        objApprovalDetails.SamsungS632GB = 0;
                        objApprovalDetails.SamsungS664GB = 1;
                        objApprovalDetails.SamsungS6128GB = 0;
                        objApprovalDetails.SamsungS6Edge32GB = 0;
                        objApprovalDetails.SamsungS6Edge64GB = 0;
                        objApprovalDetails.SamsungS6Edge128GB = 0;
                    }
                    else if (this.rdbSamsungS6128GB.Checked == true)
                    {
                        objApprovalDetails.BlackberryZ10 = 0;
                        objApprovalDetails.LGG2 = 0;
                        objApprovalDetails.SamsungNote3 = 0;
                        objApprovalDetails.Samsungs4 = 0;
                        objApprovalDetails.Samsungs5 = 0;
                        objApprovalDetails.Samsungs3 = 0;
                        objApprovalDetails.IPhone4s = 0;
                        objApprovalDetails.IPhone5c = 0;
                        objApprovalDetails.IPhone5s = 0;
                        objApprovalDetails.SamsungNote4 = 0;
                        objApprovalDetails.Iphone6 = 0;
                        objApprovalDetails.IPhone6p = 0;
                        objApprovalDetails.LGG3 = 0;
                        objApprovalDetails.SamsungS632GB = 0;
                        objApprovalDetails.SamsungS664GB = 0;
                        objApprovalDetails.SamsungS6128GB = 1;
                        objApprovalDetails.SamsungS6Edge32GB = 0;
                        objApprovalDetails.SamsungS6Edge64GB = 0;
                        objApprovalDetails.SamsungS6Edge128GB = 0;
                    }
                    else if (this.rdbSamsungS6Edge32GB.Checked == true)
                    {
                        objApprovalDetails.BlackberryZ10 = 0;
                        objApprovalDetails.LGG2 = 0;
                        objApprovalDetails.SamsungNote3 = 0;
                        objApprovalDetails.Samsungs4 = 0;
                        objApprovalDetails.Samsungs5 = 0;
                        objApprovalDetails.Samsungs3 = 0;
                        objApprovalDetails.IPhone4s = 0;
                        objApprovalDetails.IPhone5c = 0;
                        objApprovalDetails.IPhone5s = 0;
                        objApprovalDetails.SamsungNote4 = 0;
                        objApprovalDetails.Iphone6 = 0;
                        objApprovalDetails.IPhone6p = 0;
                        objApprovalDetails.LGG3 = 0;
                        objApprovalDetails.SamsungS632GB = 0;
                        objApprovalDetails.SamsungS664GB = 0;
                        objApprovalDetails.SamsungS6128GB = 0;
                        objApprovalDetails.SamsungS6Edge32GB = 1;
                        objApprovalDetails.SamsungS6Edge64GB = 0;
                        objApprovalDetails.SamsungS6Edge128GB = 0;
                    }
                    else if (this.rdbSamsungS6Edge64GB.Checked == true)
                    {
                        objApprovalDetails.BlackberryZ10 = 0;
                        objApprovalDetails.LGG2 = 0;
                        objApprovalDetails.SamsungNote3 = 0;
                        objApprovalDetails.Samsungs4 = 0;
                        objApprovalDetails.Samsungs5 = 0;
                        objApprovalDetails.Samsungs3 = 0;
                        objApprovalDetails.IPhone4s = 0;
                        objApprovalDetails.IPhone5c = 0;
                        objApprovalDetails.IPhone5s = 0;
                        objApprovalDetails.SamsungNote4 = 0;
                        objApprovalDetails.Iphone6 = 0;
                        objApprovalDetails.IPhone6p = 0;
                        objApprovalDetails.LGG3 = 0;
                        objApprovalDetails.SamsungS632GB = 0;
                        objApprovalDetails.SamsungS664GB = 0;
                        objApprovalDetails.SamsungS6128GB = 0;
                        objApprovalDetails.SamsungS6Edge32GB = 0;
                        objApprovalDetails.SamsungS6Edge64GB = 1;
                        objApprovalDetails.SamsungS6Edge128GB = 0;
                    }
                    else if (this.rdbSamsungS6Edge128GB.Checked == true)
                    {
                        objApprovalDetails.BlackberryZ10 = 0;
                        objApprovalDetails.LGG2 = 0;
                        objApprovalDetails.SamsungNote3 = 0;
                        objApprovalDetails.Samsungs4 = 0;
                        objApprovalDetails.Samsungs5 = 0;
                        objApprovalDetails.Samsungs3 = 0;
                        objApprovalDetails.IPhone4s = 0;
                        objApprovalDetails.IPhone5c = 0;
                        objApprovalDetails.IPhone5s = 0;
                        objApprovalDetails.SamsungNote4 = 0;
                        objApprovalDetails.Iphone6 = 0;
                        objApprovalDetails.IPhone6p = 0;
                        objApprovalDetails.LGG3 = 0;
                        objApprovalDetails.SamsungS632GB = 0;
                        objApprovalDetails.SamsungS664GB = 0;
                        objApprovalDetails.SamsungS6128GB = 0;
                        objApprovalDetails.SamsungS6Edge32GB = 0;
                        objApprovalDetails.SamsungS6Edge64GB = 0;
                        objApprovalDetails.SamsungS6Edge128GB = 1;              //Added new phones ends
                    }
                    else
                    {
                        objApprovalDetails.BlackberryZ10 = 0;
                        objApprovalDetails.SamsungNote3 = 0;
                        objApprovalDetails.Samsungs4 = 0;
                        objApprovalDetails.Samsungs5 = 0;
                        objApprovalDetails.Samsungs3 = 0;
                        objApprovalDetails.IPhone4s = 0;
                        objApprovalDetails.IPhone5c = 0;
                        objApprovalDetails.IPhone5s = 0;
                        objApprovalDetails.LGG2 = 0;
                        objApprovalDetails.SamsungNote4 = 0;
                        objApprovalDetails.Iphone6 = 0;
                        objApprovalDetails.IPhone6p = 0;
                        objApprovalDetails.LGG3 = 0;
                        objApprovalDetails.SamsungS632GB = 0;
                        objApprovalDetails.SamsungS664GB = 0;
                        objApprovalDetails.SamsungS6128GB = 0;
                        objApprovalDetails.SamsungS6Edge32GB = 0;
                        objApprovalDetails.SamsungS6Edge64GB = 0;
                        objApprovalDetails.SamsungS6Edge128GB = 0;
                    }

                    if (!string.IsNullOrEmpty(this.txtCellphoneApproverId.Value.ToString()))
                    {
                        objApprovalDetails.CellphoneApproverId = Convert.ToInt32(this.txtCellphoneApproverId.Value.ToString());
                    }
                    else
                    {
                        objApprovalDetails.CellphoneApproverId = 0;
                    }

                    if (!string.IsNullOrEmpty(this.txtLaptopApproverId.Value.ToString()))
                    {
                        objApprovalDetails.LaptopApproverId = Convert.ToInt32(this.txtLaptopApproverId.Value.ToString());
                    }
                    else
                    {
                        objApprovalDetails.LaptopApproverId = 0;
                    }

                    if (!string.IsNullOrEmpty(this.txtBlackberryApproverId.Value.ToString()))
                    {
                        objApprovalDetails.BlackberryApproverId = Convert.ToInt32(this.txtBlackberryApproverId.Value.ToString());
                    }
                    else
                    {
                        objApprovalDetails.BlackberryApproverId = 0;
                    }

                    if (!string.IsNullOrEmpty(this.txtBlackberryZ10ApproverId.Value.ToString()))
                    {
                        objApprovalDetails.BlackberryZ10ApproverId = Convert.ToInt32(this.txtBlackberryZ10ApproverId.Value.ToString());
                    }
                    else
                    {
                        objApprovalDetails.BlackberryZ10ApproverId = 0;
                    }

                    if (!string.IsNullOrEmpty(this.txtSamsungS3ApproverId.Value.ToString()))
                    {
                        objApprovalDetails.SamsungS3ApproverId = Convert.ToInt32(this.txtSamsungS3ApproverId.Value.ToString());
                    }
                    else
                    {
                        objApprovalDetails.SamsungS3ApproverId = 0;
                    }

                    if (!string.IsNullOrEmpty(this.txtSamsungS4ApproverId.Value.ToString()))
                    {
                        objApprovalDetails.SamsungS4ApproverId = Convert.ToInt32(this.txtSamsungS4ApproverId.Value.ToString());
                    }
                    else
                    {
                        objApprovalDetails.SamsungS4ApproverId = 0;
                    }

                    if (!string.IsNullOrEmpty(this.txtSamsungS5ApproverId.Value.ToString()))
                    {
                        objApprovalDetails.SamsungS5ApproverId = Convert.ToInt32(this.txtSamsungS5ApproverId.Value.ToString());
                    }
                    else
                    {
                        objApprovalDetails.SamsungS5ApproverId = 0;
                    }

                    if (!string.IsNullOrEmpty(this.txtSamsungNote3ApproverId.Value.ToString()))
                    {
                        objApprovalDetails.SamsungNote3ApproverId = Convert.ToInt32(this.txtSamsungNote3ApproverId.Value.ToString());
                    }
                    else
                    {
                        objApprovalDetails.SamsungNote3ApproverId = 0;
                    }

                    if (!string.IsNullOrEmpty(this.txtIPhone4SApproverId.Value.ToString()))
                    {
                        objApprovalDetails.IPhone4SApproverId = Convert.ToInt32(this.txtIPhone4SApproverId.Value.ToString());
                    }
                    else
                    {
                        objApprovalDetails.IPhone4SApproverId = 0;
                    }

                    if (!string.IsNullOrEmpty(this.txtIPhone5CApproverId.Value.ToString()))
                    {
                        objApprovalDetails.IPhone5CApproverId = Convert.ToInt32(this.txtIPhone5CApproverId.Value.ToString());
                    }
                    else
                    {
                        objApprovalDetails.IPhone5CApproverId = 0;
                    }

                    if (!string.IsNullOrEmpty(this.txtIPhone5SApproverId.Value.ToString()))
                    {
                        objApprovalDetails.IPhone5SApproverId = Convert.ToInt32(this.txtIPhone5SApproverId.Value.ToString());
                    }
                    else
                    {
                        objApprovalDetails.IPhone5SApproverId = 0;
                    }

                    if (!string.IsNullOrEmpty(this.txtLGG2ApproverId.Value.ToString()))
                    {
                        objApprovalDetails.LGG2ApproverId = Convert.ToInt32(this.txtLGG2ApproverId.Value.ToString());
                    }
                    else
                    {
                        objApprovalDetails.LGG2ApproverId = 0;
                    }

                    if (!string.IsNullOrEmpty(this.txtSamsungNote4ApproverId.Value.ToString()))
                    {
                        objApprovalDetails.SamsungNote4ApproverId = Convert.ToInt32(this.txtSamsungNote4ApproverId.Value.ToString());
                    }
                    else
                    {
                        objApprovalDetails.SamsungNote4ApproverId = 0;
                    }

                    if (!string.IsNullOrEmpty(this.txtIPhone6ApproverId.Value.ToString()))
                    {
                        objApprovalDetails.IPhone6ApproverId = Convert.ToInt32(this.txtIPhone6ApproverId.Value.ToString());
                    }
                    else
                    {
                        objApprovalDetails.IPhone6ApproverId = 0;
                    }

                    if (!string.IsNullOrEmpty(this.txtIPhone6PApproverId.Value.ToString()))
                    {
                        objApprovalDetails.IPhone6PApproverId = Convert.ToInt32(this.txtIPhone6PApproverId.Value.ToString());
                    }
                    else
                    {
                        objApprovalDetails.IPhone6PApproverId = 0;
                    }

                    //Added new phones

                    if (!string.IsNullOrEmpty(this.txtLGG3ApproverId.Value.ToString()))
                    {
                        objApprovalDetails.LGG3ApproverId = Convert.ToInt32(this.txtLGG3ApproverId.Value.ToString());
                    }
                    else
                    {
                        objApprovalDetails.LGG3ApproverId = 0;
                    }

                    if (!string.IsNullOrEmpty(this.txtSamsungS632GBApproverId.Value.ToString()))
                    {
                        objApprovalDetails.SamsungS632GBApproverId = Convert.ToInt32(this.txtSamsungS632GBApproverId.Value.ToString());
                    }
                    else
                    {
                        objApprovalDetails.SamsungS632GBApproverId = 0;
                    }

                    if (!string.IsNullOrEmpty(this.txtSamsungS664GBApproverId.Value.ToString()))
                    {
                        objApprovalDetails.SamsungS664GBApproverId = Convert.ToInt32(this.txtSamsungS664GBApproverId.Value.ToString());
                    }
                    else
                    {
                        objApprovalDetails.SamsungS664GBApproverId = 0;
                    }

                    if (!string.IsNullOrEmpty(this.txtSamsungS6128GBApproverId.Value.ToString()))
                    {
                        objApprovalDetails.SamsungS6128GBApproverId = Convert.ToInt32(this.txtSamsungS6128GBApproverId.Value.ToString());
                    }
                    else
                    {
                        objApprovalDetails.SamsungS6128GBApproverId = 0;
                    }

                    if (!string.IsNullOrEmpty(this.txtSamsungS6Edge32GBApproverId.Value.ToString()))
                    {
                        objApprovalDetails.SamsungS6Edge32GBApproverId = Convert.ToInt32(this.txtSamsungS6Edge32GBApproverId.Value.ToString());
                    }
                    else
                    {
                        objApprovalDetails.SamsungS6Edge32GBApproverId = 0;
                    }

                    if (!string.IsNullOrEmpty(this.txtSamsungS6Edge64GBApproverId.Value.ToString()))
                    {
                        objApprovalDetails.SamsungS6Edge64GBApproverId = Convert.ToInt32(this.txtSamsungS6Edge64GBApproverId.Value.ToString());
                    }
                    else
                    {
                        objApprovalDetails.SamsungS6Edge64GBApproverId = 0;
                    }

                    if (!string.IsNullOrEmpty(this.txtSamsungS6Edge128GBApproverId.Value.ToString()))
                    {
                        objApprovalDetails.SamsungS6Edge128GBApproverId = Convert.ToInt32(this.txtSamsungS6Edge128GBApproverId.Value.ToString());
                    }
                    else
                    {
                        objApprovalDetails.SamsungS6Edge128GBApproverId = 0;
                    }
                    ////Added new phones ends

                    objApprovalDetails.SessionId = Convert.ToInt32(sessionId.ToString());

                    using (DashBoardServicesClient objDashBoardServicesClient = new DashBoardServicesClient())
                    {
                        objDashBoardServicesClient.SaveApprovalRequestData(objApprovalDetails);
                    }

                    this.lblmsg.Visible = true;
                    this.lblmsg_cntct.Visible = false;
                    this.FetchAssetDetails();
                }
            }
            catch (Exception)
            {
                throw;
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
            objarray = this.GetGeographyMaster(22, 1, Convert.ToInt32(candidateId));
            sysKey.KeyId = 62;
            sysKey = this.obj.GetSystemKey(sysKey);

            // Guid filecontentid = new Guid(objarray[2].ToString());//File Content ID
            Guid fileContentId = Guid.Empty;
            if (!string.IsNullOrEmpty(objarray[0].ToString()) && !string.IsNullOrEmpty(objarray[1].ToString()))
            {
                FileUploadService.FileUploadDC objFileUploadDC = new FileUploadService.FileUploadDC();
                FileUploadService.MFileuploadResponse objMFileuploadResponse = new FileUploadService.MFileuploadResponse();
                FileUploadService.DocumentUploadServiceClient objDocumentUploadServiceClient = new FileUploadService.DocumentUploadServiceClient("BasicHttpMtomBinding");
                this.fileUploadId = Convert.ToInt32(objarray[0].ToString());
                this.fileurl = Convert.ToString(objarray[1].ToString());
                objFileUploadDC.FileUploadId = this.fileUploadId;
                objFileUploadDC.FileContentId = fileContentId;
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

        /// <summary>
        /// Method to get the Location details of the candidate
        /// </summary>
        /// <param name="mode">Mode of the candidate for particular country</param>
        /// <param name="parentcode">To get the parent code</param>
        /// <returns>equipment list</returns>
        private ArrayList GetGeographyMaster(int mode, int parentcode)
        {
            int i = 0;
            ArrayList equipmentArr = new ArrayList();
            CandidateServicesClient objService = new CandidateServicesClient();
            Country objCountry = new Country();
            objCountry.Mode = mode;
            objCountry.ParentId = parentcode;
            objCountry.CandidateId = 0;
            CountryListSource countryData = objService.GetGeographyMaster(objCountry);
            CountryList objlist = countryData.CountryData;
            foreach (Country ml in objlist)
            {
                equipmentArr.Add(new { ID = ml.CountryCode, Description = ml.CountryDescription.ToString() });
                this.equipmentDic.Add(i, ml.CountryCode);
                i++;
            }

            return equipmentArr;
        }
    }
}
        #endregion Page Event handlers
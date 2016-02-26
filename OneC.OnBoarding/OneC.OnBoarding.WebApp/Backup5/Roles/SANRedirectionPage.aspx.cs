namespace OneC.OnBoarding.WebApp.Roles
{
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
    using SANSharedServicesLibrary;
    using System.Xml.Linq;


    public partial class SANRedirectionPage : System.Web.UI.Page
    {
        /// <summary>
        /// 369041: session Detail
        /// </summary>
        private SessionDetails sessionDetail;

        /// <summary>
        /// Object of class sanWrapperService
        /// </summary>
        private SanWrapperService objSANService;

        /// <summary>
        /// declares a string parameter to have unique Template Id.
        /// </summary>
        private string apptemplateid;

        /// <summary>
        ///  string clientURL
        /// </summary>
        private string clientURL = string.Empty;

        /// <summary>
        ///  string PhotoPageURL
        /// </summary>
        private string PhotoPageURL = string.Empty;

        /// <summary>
        /// string finalQueryString
        /// </summary>
        private string finalQueryString = string.Empty;

        /// <summary>
        ///  declares a string parameter to have encrypted Query string
        /// </summary>
        private string encryptedQuerystring = string.Empty;

        /// <summary>
        ///  XDocument resultantMetadata
        /// </summary>
        private XDocument resultantMetadata;

        /// <summary>
        /// integer AppId
        /// </summary>
        private int appId ;

        /// <summary>
        /// integer candidateId
        /// </summary>
        private string candidateId;

        /// <summary>
        /// 369041: Utility Methods: A static method used when you need to do stuff that does not need an instance of a class.
        /// </summary>
        private Utility.UtilityMethods objUtil = new UtilityMethods();

        /// <summary>
        /// 369041: Utility Methods: A static method used when you need to do stuff that does not need an instance of a class.
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields", Justification = "Reviewed.")]
        private OBUtilityMethodsClient obj = new OBUtilityMethodsClient();

        /// <summary>
        /// 369041: Session
        /// </summary>
        private SessionHelper objSession = new SessionHelper();

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

        protected void Page_Load(object sender, EventArgs e)
        {
            int redirectionType = Convert.ToInt32(Request.QueryString["redType"]);

            appId = 2;
            OBUtilityMethodsClient obj = new OBUtilityMethodsClient();
            SystemKey sysKey = new SystemKey();

            CandidateServicesClient objCandClient = new CandidateServicesClient();

            CandidateDetail[] objCandDetail = objCandClient.FetchCandidateTracking(this.sessionDetail);
            ////candidateId = objCandDetail[0].CandidateId.ToString();

            string redirectionURL = string.Empty;
            if (!String.IsNullOrEmpty((string)Session["OBRedirectionURL"]))
            {
                redirectionURL = (string)Session["OBRedirectionURL"];
            }
            
            Uri uri = new Uri(redirectionURL);
            string queryString = uri.Query;
            candidateId = System.Web.HttpUtility.ParseQueryString(queryString).Get("cand").ToString();


            if (redirectionType == 1) 
            {
                sysKey.KeyId = 40;
            } 
            else if (redirectionType == 2)
            {
                sysKey.KeyId = 62;
            }

            sysKey = obj.GetSystemKey(sysKey);
            this.apptemplateid = sysKey.KeyValue;

            if (this.sessionDetail == null)
            {
                this.sessionDetail = this.objUtil.SessionDetail;
            }
            this.objSANService = new SanWrapperService();
            string uploadFileMethod = Convert.ToString(ConfigurationManager.AppSettings["SANUploadMethod"]);

            if (Request.Form["sanMReturnHdnField"] != null)
            {
                try
                {
                    this.sanMReturnHdnField.Value = Request.Form["sanMReturnHdnField"];

                    if (Convert.ToString(ConfigurationManager.AppSettings["SANMultipleAccounts"]) == "true")
                    {
                        this.resultantMetadata = XDocument.Parse(this.objSANService.GetMetaResultValue(this.apptemplateid, this.sanMReturnHdnField.Value));
                    }
                    else
                    {
                        this.resultantMetadata = XDocument.Parse(this.objSANService.GetMetaResultValue(this.appId, this.sanMReturnHdnField.Value));
                    }

                    if (uploadFileMethod == "UploadFile_WithResponse")
                    {
                        XElement returnElement = this.resultantMetadata != null ? this.resultantMetadata.Element("SanResultInfo") : null;
                        if (returnElement != null)
                        {
                            var responseData = from datas in this.resultantMetadata.Descendants("SanResultInfo")
                                               select new
                                               {
                                                   sanStatus = datas.Element("SanStatus").Value,
                                                   fileName = datas.Element("FileName").Value,
                                                   contentId = datas.Element("SanFileContentId").Value,
                                                   uploadId = datas.Element("SanFileUploadId").Value,
                                                   fileUrl = datas.Element("SanFileUrl").Value,
                                                   fileExtUrl = datas.Element("SanFileExternalUrl").Value,
                                                   fileLocation = datas.Element("SanFileLocation").Value
                                               };

                            string sancontentId = Convert.ToString(responseData.FirstOrDefault().contentId);
                            string sanUploadId = Convert.ToString(responseData.FirstOrDefault().uploadId);
                            string sanFileUrl = Convert.ToString(responseData.FirstOrDefault().fileUrl);
                            string sanExtUrl = Convert.ToString(responseData.FirstOrDefault().fileExtUrl);
                            string sanFileLoc = Convert.ToString(responseData.FirstOrDefault().fileLocation);
                            string sanfileName = Convert.ToString(responseData.FirstOrDefault().fileName);
                            string sanStatus = Convert.ToString(responseData.FirstOrDefault().sanStatus);

                            if (sanStatus == "Success")
                            {
                                SANUploadDetails UploadDetails = new SANUploadDetails();
                                UploadDetails.CandidateId = Convert.ToInt32(candidateId);
                                if (redirectionType == 1)
                                {
                                    UploadDetails.AppTemplateId = 1;
                                }
                                UploadDetails.FileUploadId = Convert.ToInt32(sanUploadId);
                                UploadDetails.FileContentId = sancontentId.ToString();

                                string fileExt = ".jpg";
                                if (!string.IsNullOrEmpty(sanfileName))
                                {
                                    fileExt = (sanfileName.Split('.')[sanfileName.Split('.').Length - 1]).ToString();
                                }

                                if (redirectionType == 1)
                                {
                                    UploadDetails.FileName = candidateId + "." + fileExt;
                                    UploadDetails.FileSaveName = candidateId + "." + fileExt;
                                }
                                else if (redirectionType == 2)
                                {
                                    UploadDetails.FileName = sanfileName.ToString();
                                    UploadDetails.FileSaveName = sanfileName.ToString();
                                }

                                UploadDetails.FileURL = sanFileUrl.ToString();
                                UploadDetails.FileExternalURL = sanExtUrl.ToString();
                                UploadDetails.FileLocation = sanFileLoc.ToString();
                                if (redirectionType == 1)
                                {
                                    UploadDetails.KeyId = 40;
                                }
                                else if (redirectionType == 2)
                                {
                                    UploadDetails.KeyId = 62;
                                }
                                UploadDetails.SessionId = sessionDetail.SessionId;
                                obj.SaveSANUploadDetails(UploadDetails);
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    ErrorLogger logger = new ErrorLogger(this.sessionDetail.SessionId);
                    logger.LogError(ex);
                }
            }            
            Response.Redirect(redirectionURL);
        }                    
    }
}
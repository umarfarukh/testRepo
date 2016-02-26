// <copyright file = "FormPDF.aspx.cs" company = "CTS">
// Copyright (c) OnBoarding_FormPDF. All rights reserved.
// </copyright>

namespace OneC.OnBoarding.WebApp.Roles.NHPages
{
    using System;
    using System.Collections.Generic;
    using System.IO;    
    using System.Linq;
    using System.Text;
    using System.Web;
    using System.Web.UI;
    using System.Web.UI.WebControls;
    using OneC.OnBoarding.DC.CandidateDC;
    using OneC.OnBoarding.DC.UtilityDC;
    using OneC.OnBoarding.WebApp.Service.CandidateServices;        
    using OneC.OnBoarding.WebApp.Utility;    
    using Winnovative.WnvHtmlConvert;
    
    /// <summary>
    /// Initialize FormPDF class
    /// </summary>
    public partial class FormPDF : System.Web.UI.Page
    {
        /// <summary>
        /// Filed CandidateId
        /// </summary>
        private long candidateId;

        /// <summary>
        /// Session Id
        /// </summary>
        private long sessionId;

        /// <summary>
        /// Task Id
        /// </summary>
        private int taskId;

        /// <summary>
        /// PDF FIle Name
        /// </summary>
        private string pdfFileName;

        /// <summary>
        /// PDF option
        /// </summary>
        private string pdfOption;

        /// <summary>
        /// PDF option flag
        /// </summary>
        private int pdfOptionFlag;

        /// <summary>
        /// Document Name
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields", Justification = "Reviewed.")]
        private string documentName;

        /// <summary>
        /// Initialize Get HTML Content To Generate PDF
        /// </summary>
        /// <param name="sessionId"> Session Id </param>
        /// <param name="candidateId"> Candidate Id </param>
        /// <param name="taskId"> Task Id </param>
        /// <param name="pdfFileName"> PDF File Name </param>
        /// <param name="pdfOption"> PDF Option </param>
         [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", Justification = "Reviewed")]
        public void GetHTMLContentToGeneratePDF(long sessionId, long candidateId, int taskId, string pdfFileName, string pdfOption)
        {
            string strHTMLContent = string.Empty;
            string strHtmlPath = string.Empty;
            string date = string.Format("{0:MM/dd/yyyy HH:mm:ss tt}", DateTime.Now);
            string pdfName = string.Empty;
            pdfName = candidateId + "_" + pdfFileName + "_" + date;
            SaveTaskDC objHTML = new SaveTaskDC();
            //// objHTML.TaskId = taskId;
            objHTML.CandidateId = candidateId;
            objHTML.TaskId = taskId;
            //// #region Service call
            ////Creating new client to get message from DB
            var clntUtility = new CandidateServicesClient();

            try
            {
                clntUtility.Open();
                strHTMLContent = clntUtility.GetHtmlContentToGeneratePDF(objHTML);
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
            //// #endregion

            StringBuilder strbuild = new StringBuilder();
            strbuild.Append(strHTMLContent);

            try
            {
                string tempFolderPath = Server.MapPath("~/Temp/");
                strHtmlPath = tempFolderPath + "OnBoardingForm" + Guid.NewGuid().ToString().Replace("-", string.Empty) + ".htm";
                FileStream fileStr = new FileStream(strHtmlPath, FileMode.CreateNew, FileAccess.ReadWrite);
                StreamWriter strW = new StreamWriter(fileStr);
                strW.WriteLine(strbuild);
                strW.Flush();
                strW.Close();
                //// fileStr.Close(); //// strw have this value and closed
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
                logger.LogError(ex);
            }

            int margin = 10;
            PdfConverter pdfConverter = new PdfConverter();
            pdfConverter.LicenseKey = "AygxIzIjNTAjNS0zIzAyLTIxLTo6Ojo=";
            //// set the converter options
            pdfConverter.PdfDocumentOptions.PdfPageSize = PdfPageSize.A4;
            pdfConverter.PdfDocumentOptions.PdfCompressionLevel = PdfCompressionLevel.Normal;
            pdfConverter.PdfDocumentOptions.PdfPageOrientation = PDFPageOrientation.Portrait;
            pdfConverter.PdfDocumentOptions.BottomMargin = margin;
            pdfConverter.PdfDocumentOptions.TopMargin = margin;
            pdfConverter.PdfDocumentOptions.LeftMargin = margin;
            pdfConverter.PdfDocumentOptions.RightMargin = margin;
            //// set if header and footer are shown in the PDF - optional - default is false 
            pdfConverter.PdfDocumentOptions.ShowHeader = false; ////cbAddHeader.Checked;
            pdfConverter.PdfDocumentOptions.ShowFooter = false; //// bAddFooter.Checked;
            //// set to generate a pdf with selectable text or a pdf with embedded image - optional - default is true
            pdfConverter.PdfDocumentOptions.GenerateSelectablePdf = true; //// radioConvertToSelectablePDF.Checked;
            //// set if the HTML content is resized if necessary to fit the PDF page width - optional - default is true
            pdfConverter.PdfDocumentOptions.FitWidth = true; //// cbFitWidth.Checked;
            //// set the embedded fonts option - optional - default is false
            pdfConverter.PdfDocumentOptions.EmbedFonts = true; //// cbEmbedFonts.Checked;
            //// set the live HTTP links option - optional - default is true
            pdfConverter.PdfDocumentOptions.LiveUrlsEnabled = true; //// cbLiveLinks.Checked;
            pdfConverter.PdfSecurityOptions.CanEditContent = false;
            pdfConverter.ScriptsEnabled = false; ////cbClientScripts.Checked;
            pdfConverter.ActiveXEnabled = true; ////cbActiveXEnabled.Checked;
            pdfConverter.PdfDocumentOptions.JpegCompressionEnabled = false; //// cbJpegCompression.Checked;
            pdfConverter.PdfBookmarkOptions.TagNames = new string[] { "H1", "H2" };
            pdfConverter.PdfDocumentInfo.AuthorName = "1COnboarding";
            StreamReader strRead = new StreamReader(strHtmlPath);
            StringBuilder strbuilder = new StringBuilder(strRead.ReadToEnd());
            strRead.Close();
            //// strRead.Dispose();
            byte[] pdfBytes = null;
            pdfBytes = pdfConverter.GetPdfBytesFromHtmlString(strbuilder.ToString(), strHtmlPath);
            ////send the PDF document as a response to the browser for download

            try
                {
                Response.Clear();
                MemoryStream memstrmOutputFile = new MemoryStream(pdfBytes);
                Response.ContentType = "application/pdf";
                Response.AddHeader("content-disposition", pdfOption + ";filename=" + pdfName + ".pdf; size=" + pdfBytes.Length.ToString());
                Response.Buffer = true;
                memstrmOutputFile.WriteTo(Response.OutputStream);
                HttpContext.Current.ApplicationInstance.CompleteRequest();
                memstrmOutputFile.Flush();
                }
            catch (Exception ex)
                {
                ErrorLogger logger = new ErrorLogger(sessionId);
                logger.LogError(ex);
                }
           

            if (File.Exists(strHtmlPath))
            {
                File.Delete(strHtmlPath);
            }
        }              

        /// <summary>
        /// Initialize Page Load method
        /// </summary>
        /// <param name="sender"> Sender info </param>
        /// <param name="e"> Event Arguments </param>
        protected void Page_Load(object sender, EventArgs e)
        {
            this.candidateId = Convert.ToInt64(Request.QueryString["candidateId"]);
            this.sessionId = Convert.ToInt64(Request.QueryString["sessionId"]);
            this.taskId = Convert.ToInt16(Request.QueryString["taskId"]);
            this.pdfFileName = Request.QueryString["pdfFileName"];
            this.pdfOptionFlag = Convert.ToInt16(Request.QueryString["pdfOption"]);
            this.documentName = Request.QueryString["documentName"];

            if (this.pdfOptionFlag == 1)
            {
                this.pdfOption = "attachment"; //// For PDF Download 
            }
            else
            {
                this.pdfOption = "inline"; //// For PDF Preview
            }

            this.GetHTMLContentToGeneratePDF(this.sessionId, this.candidateId, this.taskId, this.pdfFileName, this.pdfOption);
        }
    }
}
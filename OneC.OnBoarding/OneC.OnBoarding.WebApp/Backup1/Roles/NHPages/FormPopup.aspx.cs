//-----------------------------------------------------------------------=
// <copyright file="FormPopup.aspx.cs" company="Cognizant Technology Solutions">
// Copyright  . All Rights Reserved.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace            : OneC.OnBoarding.Services.ServiceContract
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

namespace OneC.OnBoarding.WebApp.Roles.NHPages
{
    #region Namespaces
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Configuration;
    using System.Data;
    using System.Data.SqlClient;
    using System.Linq;
    using System.Text;
    using System.Web;
    using System.Web.Services;
    using System.Web.UI;
    using System.Web.UI.WebControls;
    using iTextSharp.text;
    using iTextSharp.text.pdf;
    using Winnovative.WnvHtmlConvert;
    #endregion Namespaces

    /// <summary>
    /// 369041: Class which holds all the Form Popups
    /// </summary>
    public partial class FormPopup : System.Web.UI.Page
    {
        [WebMethod]

        /// <summary>
        /// 369041: Convert Html Template File To Pdf
        /// </summary>
        /// <param name="htmlstring">HTML string</param>
        /// <param name="margin">total Count</param>
        /// <param name="pdfName">PDF Name</param>
        public static void ConvertHtmlTemplateFileToPdf(string htmlstring, int margin, string pdfName)
        {            
            PdfConverter pdfConverter = new PdfConverter();
            pdfConverter.LicenseKey = "AygxIzIjNTAjNS0zIzAyLTIxLTo6Ojo="; // set the converter options
            pdfConverter.PdfDocumentOptions.PdfPageSize = PdfPageSize.A4;
            pdfConverter.PdfDocumentOptions.PdfCompressionLevel = PdfCompressionLevel.Normal;
            pdfConverter.PdfDocumentOptions.PdfPageOrientation = PDFPageOrientation.Portrait;
            pdfConverter.PdfDocumentOptions.BottomMargin = margin;
            pdfConverter.PdfDocumentOptions.TopMargin = margin;
            pdfConverter.PdfDocumentOptions.LeftMargin = margin;
            pdfConverter.PdfDocumentOptions.RightMargin = margin; // set if header and footer are shown in the PDF - optional - default is false 
            pdfConverter.PdfDocumentOptions.ShowHeader = false; // cbAddHeader.Checked;
            pdfConverter.PdfDocumentOptions.ShowFooter = false; // bAddFooter.Checked;
            // set to generate a pdf with selectable text or a pdf with embedded image - optional - default is true
            pdfConverter.PdfDocumentOptions.GenerateSelectablePdf = true; // radioConvertToSelectablePDF.Checked;
            // set if the HTML content is resized if necessary to fit the PDF page width - optional - default is true
            pdfConverter.PdfDocumentOptions.FitWidth = true; // cbFitWidth.Checked;
            // 
            // set the embedded fonts option - optional - default is false
            pdfConverter.PdfDocumentOptions.EmbedFonts = true; // cbEmbedFonts.Checked;
            // set the live HTTP links option - optional - default is true
            pdfConverter.PdfDocumentOptions.LiveUrlsEnabled = true; // cbLiveLinks.Checked;
            pdfConverter.ScriptsEnabledInImage = false; // cbClientScripts.Checked;
            pdfConverter.ActiveXEnabledInImage = true; // cbActiveXEnabled.Checked;
            pdfConverter.PdfDocumentOptions.JpegCompressionEnabled = true; // cbJpegCompression.Checked;

            pdfConverter.PdfBookmarkOptions.TagNames = new string[] { "H1", "H2" };

            pdfConverter.PdfDocumentInfo.AuthorName = "Winnovative HTML to PDF Converter";
            StringBuilder buldr = new StringBuilder(htmlstring);
            byte[] pdfBytes = null;
            pdfBytes = pdfConverter.GetPdfBytesFromHtmlString(buldr.ToString(), string.Empty);
            System.Web.HttpResponse response = System.Web.HttpContext.Current.Response;
            response.Clear();
            response.AddHeader("Content-Disposition", "attachment; filename=" + pdfName + ".pdf; size=" + pdfBytes.Length.ToString());
            response.Write("<script language='javascript' type='text/javascript'>   window.print(this)</script>");
            response.BinaryWrite(pdfBytes);
            response.Flush();
            response.End();
        }

        [WebMethod]

        /// <summary>
        /// 369041: Consists of Array List
        /// </summary>
        /// <param name="masterCode">master Code</param>
        /// <returns>Consists of Array List</returns>
        public static ArrayList GetMaster(int masterCode)
        {
            ArrayList arr = new ArrayList();
            using (SqlConnection con = new SqlConnection())
            {
                con.ConnectionString = ConfigurationManager.ConnectionStrings["conString"].ToString();
                SqlCommand com = new SqlCommand();
                com.CommandType = CommandType.Text;
                com.Connection = con;
                con.Open();
                string cmdtxt = "SELECT CCodeID, CDescription, RTRIM(ISNULL(CUserDefined1, '')) AS UserValue1 FROM MasterCodes WITH(NOLOCK) WHERE CParentRef = " + masterCode.ToString() + " AND RowStatus = 1";
                com.CommandText = cmdtxt;
                SqlDataReader dr = com.ExecuteReader();

                if (dr != null)
                {
                    while (dr.Read())
                    {
                        arr.Add(new { id = dr[0].ToString(), description = dr[1].ToString(), userValue1 = dr[2].ToString() });
                    }
                }

                com.Dispose();
                ////con.Dispose();
            }

            return arr;
        }
    }
}
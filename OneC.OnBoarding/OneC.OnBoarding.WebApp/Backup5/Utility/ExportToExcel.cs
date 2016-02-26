//-----------------------------------------------------------------------=
// <copyright file="ExportToExcel.cs" company="Cognizant Technology Solutions">
// Copyright  . All Rights Reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace OneC.OnBoarding.WebApp.Utility
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.IO;
    using System.IO.Compression;
    using System.Linq;
    using System.Text;
    using System.Web;
    using System.Web.UI;
    using System.Xml;
    using System.Xml.Xsl;
    using ICSharpCode.SharpZipLib.Zip;
    #endregion

    /// <summary>
    /// Export to Excel class
    /// </summary>
    public static class ExportToExcel
    {
        ////public static void ExportDatasetToExcel(DataSet dsXlXml, string stringFileName)
        ////{
        ////    try
        ////    {
        ////        int iWorkSheet = 0;
        ////        int iCol = 0, iRow = 0;
        ////        int size = (int)Math.Pow(2, 29);
        ////        iWorkSheet = dsXlXml.Tables.Count;
        ////        iWorkSheet = Convert.ToInt32(iWorkSheet);
        ////        iWorkSheet++;
        ////        System.Text.StringBuilder strExcelXml = new System.Text.StringBuilder();
        ////        HttpContext.Current.Response.Clear();
        ////        // Set as Excel as the primary format
        ////        HttpContext.Current.Response.AddHeader("Content-Type", "application/Excel");
        ////        //Save the output as .xls
        ////        HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;filename=" + stringFileName.ToString() + ".xls");
        ////        //First Write the Excel Header
        ////        strExcelXml.Append(ExcelHeader());
        ////        //Create Styles
        ////        strExcelXml.Append(ExcelStyles());
        ////        DataTable dtXlXml;
        ////        for (int i = 1; i < iWorkSheet; i++)
        ////        {
        ////            dtXlXml = dsXlXml.Tables[i - 1];
        ////            if (dtXlXml.Rows.Count > 0)
        ////            {
        ////                iRow = dtXlXml.Rows.Count;
        ////            }
        ////            if (dtXlXml.Columns.Count > 0)
        ////            {
        ////                iCol = dtXlXml.Columns.Count;
        ////            }
        ////            try
        ////            {
        ////                //Retreive the values of Sheet,column and Rows
        ////                iCol = Convert.ToInt32(iCol);
        ////                iRow = Convert.ToInt32(iRow);
        ////                iRow++;
        ////                iCol++;
        ////            }
        ////            catch (Exception ex)
        ////            {
        ////                //return "";
        ////            }
        ////            // Create First Worksheet tag
        ////            //strExcelXml.Append("<Worksheet ss:Name=\"WorkSheet" + i.ToString() + "\">");
        ////            //strExcelXml.Append("<Worksheet ss:Name=\"" + dtXlXml.TableName + "\">");
        ////            strExcelXml.Append("<Worksheet ss:Name=\"" + "Report" + "\">");
        ////            // Then Table Tag
        ////            strExcelXml.Append("<Table>");
        ////            // Header Row Tag
        ////            //strExcelXml.Append("<tr>");
        ////            strExcelXml.Append("<Row ss:AutoFitHeight=\"1\" >\n")
        ////            for (int j = 1; j < iCol; j++)
        ////            {
        ////                // Header Cell Tags
        ////                strExcelXml.Append("<Cell ss:StyleID=\"Header\"><Data ss:Type=\"String\">");
        ////                strExcelXml.Append(dtXlXml.Columns[j - 1].ColumnName.ToString());
        ////                strExcelXml.Append("</Data></Cell>\n");
        ////            }
        ////            //strExcelXml.Append("</tr>");
        ////            strExcelXml.Append("</Row>\n");
        ////            for (int k = 1; k < iRow; k++)
        ////            {
        ////                // Row Tag
        ////                //strExcelXml.Append("<tr>");
        ////                strExcelXml.Append("<Row ss:AutoFitHeight=\"1\" >\n");
        ////                for (int j = 1; j < iCol; j++)
        ////                {
        ////                    // Cell Tags
        ////                    //strExcelXml.Append("<td>");
        ////                    if (dtXlXml.Columns[j - 1].DataType.ToString() == "System.DateTime")
        ////                    {
        ////                        //if (((DateTime)dtXlXml.Rows[k - 1][j - 1]) != null)
        ////                        string check_date = (dtXlXml.Rows[k - 1][j - 1]).ToString();
        ////                        //if (!string.IsNullOrEmpty(check_date))
        ////                        if (check_date != string.Empty)
        ////                        {
        ////                            DateTime XMLDate = (DateTime)dtXlXml.Rows[k - 1][j - 1];
        ////                            string XMLDatetoString = ""; //Excel Converted Date
        ////                            XMLDatetoString = XMLDate.Year.ToString() +
        ////                                     "-" +
        ////                                     (XMLDate.Month < 10 ? "0" +
        ////                                     XMLDate.Month.ToString() : XMLDate.Month.ToString()) +
        ////                                     "-" +
        ////                                     (XMLDate.Day < 10 ? "0" +
        ////                                     XMLDate.Day.ToString() : XMLDate.Day.ToString())
        ////                            strExcelXml.Append("<Cell ss:StyleID=\"DateLiteral\"><Data ss:Type=\"DateTime\">");
        ////                            strExcelXml.Append(XMLDatetoString);
        ////                            strExcelXml.Append("</Data></Cell>\n");
        ////                        }
        ////                        else
        ////                        {
        ////                            strExcelXml.Append("<Cell ss:StyleID=\"s21\"><Data ss:Type=\"String\">");
        ////                            strExcelXml.Append("</Data></Cell>\n");
        ////                        }
        ////                    }
        ////                    else
        ////                    {
        ////                        strExcelXml.Append("<Cell ss:StyleID=\"s21\"><Data ss:Type=\"String\">");
        ////                        //strExcelXml.Append("Sheet" + i.ToString() + "Row" + k.ToString() + "Col" + j.ToString());
        ////                        strExcelXml.Append(dtXlXml.Rows[k - 1][j - 1].ToString());
        ////                        //strExcelXml.Append("</td>");
        ////                        strExcelXml.Append("</Data></Cell>\n");
        ////                    }
        ////                }
        ////                //strExcelXml.Append("</tr>");
        ////                strExcelXml.Append("</Row>\n");
        ////                HttpContext.Current.Response.Write(strExcelXml.ToString());
        ////                strExcelXml.Length = 0;
        ////            }
        ////            strExcelXml.Append("</Table>");
        ////            strExcelXml.Append("</Worksheet>");
        ////        }
        ////        // Close the Workbook tag (in Excel header you can see the Workbook tag)
        ////        strExcelXml.Append("</Workbook>\n");
        ////        StringBuilder strExcelXmlTemp = new StringBuilder();
        ////        HttpContext.Current.Response.Write(strExcelXml.ToString());
        ////        //HttpContext.Current.Response.End();
        ////        HttpContext.Current.ApplicationInstance.CompleteRequest();
        ////        HttpContext.Current.Response.End();
        ////    }
        ////    catch (System.Threading.ThreadAbortException) { }
        ////    catch (Exception Ex)
        ////    {
        ////        throw Ex;
        ////    }
        ////}
        //// <summary>
        //// Creates Excel Header         
        //// </summary>
        //// <returns>Excel Header Strings</returns>
        ////private static string ExcelHeader()
        ////{
        ////    // Excel header
        ////    System.Text.StringBuilder sb = new System.Text.StringBuilder();
        ////    sb.Append("<?xml version=\"1.0\"?>\n");
        ////    sb.Append("<?mso-application progid=\"Excel.Sheet\"?>\n");
        ////    sb.Append("<Workbook xmlns=\"urn:schemas-microsoft-com:office:spreadsheet\" ");
        ////    sb.Append("xmlns:o=\"urn:schemas-microsoft-com:office:office\" ");
        ////    sb.Append("xmlns:x=\"urn:schemas-microsoft-com:office:excel\" ");
        ////    sb.Append("xmlns:ss=\"urn:schemas-microsoft-com:office:spreadsheet\" ");
        ////    sb.Append("xmlns:html=\"http://www.w3.org/TR/REC-html40\">\n");
        ////    sb.Append("<DocumentProperties xmlns=\"urn:schemas-microsoft-com:office:office\">");
        ////    sb.Append("<Author></Author>");
        ////    sb.Append("</DocumentProperties>");
        ////    sb.Append("<ExcelWorkbook xmlns=\"urn:schemas-microsoft-com:office:excel\">\n");
        ////    sb.Append("<ProtectStructure>False</ProtectStructure>\n");
        ////    sb.Append("<ProtectWindows>False</ProtectWindows>\n");
        ////    sb.Append("</ExcelWorkbook>\n");
        ////    return sb.ToString();
        ////}
        //// <summary>
        ////Read styles and copy it to the Excel string
        ////</summary>
        //// <returns></returns>
        ////private static string ExcelStyles()
        ////{
        ////    System.Text.StringBuilder sb = new System.Text.StringBuilder();
        ////    sb.Append("<Styles>\n");
        ////    sb.Append("<Style ss:ID=\"Default\" ss:Name=\"Normal\">\n");
        ////    sb.Append("<Alignment ss:Vertical=\"Bottom\"/>\n");
        ////    //sb.Append("<Header ss:Pattern=\"Bold\"/>\n");
        ////    sb.Append("<Borders/>\n");
        ////    sb.Append("<Font/>\n");
        ////    sb.Append("<Interior/>\n");
        ////    sb.Append("<NumberFormat/>\n");
        ////    sb.Append("<Protection/>\n");
        ////    sb.Append("</Style>\n");
        ////    sb.Append("<Style ss:ID=\"Header\">\n");
        ////    sb.Append("<Font ss:Bold=\"1\" />\n");
        ////    sb.Append("<Interior ss:Pattern=\"Solid\"/>\n");
        ////    sb.Append("</Style>\n");
        ////    sb.Append("<Style ss:ID=\"s21\">\n");
        ////    sb.Append("<Interior ss:Pattern=\"Solid\"/>\n");
        ////    sb.Append("</Style>\n");
        ////    sb.Append("<Style ss:ID=\"DateLiteral\">");
        ////    sb.Append("<NumberFormat ss:Format=\"dd/mm/yyyy;@\"/> </Style>");
        ////    sb.Append("</Styles>\n");
        ////    return sb.ToString();
        ////}

        /// <summary>
        /// method for export dataset to excel
        /// </summary>
        /// <param name="datsetReportData">dataset Report Data</param>
        /// <param name="fileName">file Name</param>
        public static void ExportDatasetToExcel(DataSet datsetReportData, string fileName)
        {
            if (datsetReportData == null)
            {
                throw new ArgumentNullException("datsetReportData");
            }
            else
            {
                if (datsetReportData.Tables.Count == 0)
                {
                    throw new ArgumentNullException("datsetReportData");
                }
                else
                {
                    datsetReportData.DataSetName = "Root";
                    datsetReportData.Tables[0].TableName = "Data";
                    XmlDocument xmlReportData = new XmlDocument();
                    xmlReportData.LoadXml(datsetReportData.GetXml());
                    string tempFolderPath = HttpContext.Current.Server.MapPath("~/Temp/");
                    string reportFilePath = tempFolderPath + "Report" + Guid.NewGuid().ToString().Replace("-", string.Empty) + ".xls";
                   ConvertXMLToHTMLString(xmlReportData, null, reportFilePath);
                    bool isFileCompressed = false;
                    FileInfo downloadFile = new FileInfo(reportFilePath);
                    if (downloadFile.Length > 2097152)  
                    {
                        reportFilePath = ZipLargeReportFile(downloadFile, fileName);
                        isFileCompressed = true;
                    }

                    ////Initiate File stream process to client
                    StreamReportFile(reportFilePath, fileName, isFileCompressed);
                    ////Delete old temp files
                    DeleteOldFilesfromTemp(tempFolderPath);
                }
            }
        }

        /// <summary>
        /// method for Stream report file
        /// </summary>
        /// <param name="reportFilePath"> report File Path</param>
        /// <param name="reportFileName">report File Name</param>
        /// <param name="isFileCompressed">is File Compressed</param>
        private static void StreamReportFile(string reportFilePath, string reportFileName, bool isFileCompressed)
        {
            FileInfo file = new FileInfo(reportFilePath); //// full file path on disk
            HttpContext.Current.Response.ClearContent(); //// neded to clear previous (if any) written content
            HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment; filename=" + reportFileName + file.Extension);
            HttpContext.Current.Response.AddHeader("Content-Length", file.Length.ToString());

            if (isFileCompressed)
            {
                HttpContext.Current.Response.ContentType = "application/x-zip-compressed"; ////RFC 3023
            }
            else
            {
                HttpContext.Current.Response.ContentType = "application/octet-stream"; ////RFC 3023
                HttpContext.Current.Response.ContentEncoding = System.Text.Encoding.UTF8;
                HttpContext.Current.Response.BinaryWrite(System.Text.Encoding.UTF8.GetPreamble());
            }

            HttpContext.Current.Response.TransmitFile(file.FullName, 0, -1);
            HttpContext.Current.ApplicationInstance.CompleteRequest();
        }

        /// <summary>
        /// Method to convert XML to HTML string
        /// </summary>
        /// <param name="xmlReportData">xml report data</param>
        /// <param name="xsltPath">xml path</param>
        /// <param name="reportPathWithFileName">report path with file name</param>
        private static void ConvertXMLToHTMLString(XmlDocument xmlReportData, string xsltPath, string reportPathWithFileName)
        {
            ////Creating stringwriter obj to return HTML
            using (StreamWriter strmwrtrHtmlData = new StreamWriter(reportPathWithFileName, false, Encoding.UTF8))
            {
                ////Setting default style sheet if not supplied
                if (xsltPath == null || xsltPath.Length == 0)
                {
                    xsltPath = HttpContext.Current.Server.MapPath("~/Templates/ReportDefaultStyle.xslt");
                }

                ////Initiate Xsl transform
                XslCompiledTransform xslTransformer = new XslCompiledTransform();
                ////Load Xsl string

                xslTransformer.Load(xsltPath);
                xmlReportData.PreserveWhitespace = true;
                ////Transform Xml data as HTML string to string writer

                xslTransformer.Transform(xmlReportData.CreateNavigator(), new XsltArgumentList(), strmwrtrHtmlData);
            }
        }

        /// <summary>
        /// Method which Deletes the files from TempFolder earlier than 1 hour
        /// </summary>
        /// <param name="path"> string path </param>
        private static void DeleteOldFilesfromTemp(string path)
        {
            string[] files = Directory.GetFiles(path);

            foreach (string file in files)
            {
                try
                {
                    FileInfo fi = new FileInfo(file);
                    if (fi.CreationTime < DateTime.Now.AddMinutes(-15))
                    {
                        fi.Delete();
                    }
                }
                catch
                {
                }
            }
        }

        /// <summary>
        /// Method to zip large files
        /// </summary>
        /// <param name="reportFile">report file</param>
        /// <param name="fileName">file name</param>
        /// <returns>zip file name</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        private static string ZipLargeReportFile(FileInfo reportFile, string fileName)
        {
            string filePath = reportFile.FullName;
            string zipFileName = reportFile.FullName.Replace(reportFile.Extension, ".zip");
            int trimLength = reportFile.Directory.ToString().Length;
            trimLength += 1; ////remove '\'
            FileStream ostream;
            byte[] obuffer;
            
            string outPath = filePath;
            ZipOutputStream outptZipStream = new ZipOutputStream(File.Create(zipFileName)); // create zip stream
            outptZipStream.SetLevel(9); //// maximum compression
            ZipEntry otputZipEntry;
            otputZipEntry = new ZipEntry(fileName + reportFile.Extension);
            outptZipStream.PutNextEntry(otputZipEntry);

            if (!filePath.EndsWith(@"/")) 
            {
                ostream = File.OpenRead(filePath);
                obuffer = new byte[ostream.Length];
                ostream.Read(obuffer, 0, obuffer.Length);
                outptZipStream.Write(obuffer, 0, obuffer.Length);
                ostream.Close();
            }

            outptZipStream.Finish();
            outptZipStream.Close();

            try
            { 
                if (File.Exists(filePath))
                { 
                    File.Delete(filePath); 
                } 
            }
            catch
            {
            }

            return zipFileName;
        }
    }
}
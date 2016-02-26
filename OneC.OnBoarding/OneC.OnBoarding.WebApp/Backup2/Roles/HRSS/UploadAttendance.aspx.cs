//-----------------------------------------------------------------------=
// <copyright file="UploadAttendance.aspx.cs" company="Cognizant Technology Solutions">
// Copyright  . All Rights Reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OneC.OnBoarding.WebApp.Roles.HRSS
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Configuration;
    using System.Data;
    using System.Data.SqlClient;
    using System.IO;
    using System.Linq;
    using System.Reflection;
    using System.Text;
    using System.Web;
    using System.Web.Services;
    using System.Web.UI;
    using System.Web.UI.WebControls;
    using System.Xml;
    using System.Xml.Linq;
    using System.Xml.Serialization;    
    using System.Xml.XPath;
    using System.Xml.Xsl;
    using OneC.OnBoarding.DC.CandidateDC;
    using OneC.OnBoarding.DC.DashBoardDC;
    using OneC.OnBoarding.DC.UtilityDC;
    using OneC.OnBoarding.WebApp.Service.CandidateServices;
    using OneC.OnBoarding.WebApp.Service.DashBoardServices;
    using OneC.OnBoarding.WebApp.Service.OBUtilityMethods;    
    using OneC.OnBoarding.WebApp.Utility;

    /// <summary>
    /// Documentation of class UploadAttendance.
    /// </summary>
    public partial class UploadAttendance : System.Web.UI.Page
    {  
        /// <summary>
        /// Method for error Candidate List
        /// </summary>
        private string errorCandidatelist = string.Empty; 

       /// <summary>
       /// Method for upload Candidate Update Successfully
       /// </summary>
       private string uploadCandidateUpdateSuccessfully = string.Empty;

       /// <summary>
       ///  added 312539 Attendance UploadExcel DetailsData
       /// </summary>
       /// <param name="objCandidateDetail"> candidate detail</param>
       /// <returns>stylecop error fix</returns>
       public string AttendanceUploadExcelDetailsData(CandidateDetail objCandidateDetail)
       {
           using (DashBoardServicesClient obj = new DashBoardServicesClient())
           {
               DataSet candDetailist = obj.AttendanceUploadExcelDetailsData(objCandidateDetail);
               if (candDetailist != null && candDetailist.Tables.Count > 0)
               {
                   this.errorCandidatelist = candDetailist.Tables[0].Rows[0][0].ToString(); //// stylecop fix  changed errorCandidatelist to ErrorCandidatelist --  397785 
                   this.uploadCandidateUpdateSuccessfully = candDetailist.Tables[1].Rows[0][0].ToString();
               }
           }

           return null;
       }
     
       /// <summary>
       /// Method for candidate bulk upload
       /// </summary>
       /// <param name="objCandidateDetail"> candidate detail</param>
       /// <returns>candidate detail list</returns>
       [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", Justification = "Reviewed.")]
       public string CandidateidBulkUpload(CandidateDetail objCandidateDetail)
       {
           using (DashBoardServicesClient obj = new DashBoardServicesClient())
           {
               string errCandidateIdList = obj.CandidateidBulkUpload(objCandidateDetail); ////stylecop warning fix , changed ErCandidate to errCandidateIdList
               return objCandidateDetail.ErrorCandidateIdList = errCandidateIdList; ////stylecop warning fix , changed ErCandidate to errCandidateIdList
           }
       }

       /// <summary>
       /// Method for page load
       /// </summary>
       /// <param name="sender"> object sender </param>
       /// <param name="e">event args e </param>
        protected void Page_Load(object sender, EventArgs e)
        {
            string s = Request.QueryString["page"];
            this.hidquerstingvalue.Value = s;
        }
        ////  Added 312539 upload excel to update fedex.

       /// <summary>
        /// Method for button click
        /// </summary>
        /// <param name="sender">object sender </param>
        /// <param name="e"> event args e</param>
       protected void BtnUpload_Click(object sender, EventArgs e)
        {
          //// ClientScript.RegisterStartupScript(typeof(Page), "ScriptSubmit", "<script language='Javascript'>  var $backgroundOverLay = $('<div id='overLay'/>'); $('body').prepend($backgroundOverLay); $('#overLay').css({  'opacity': '0.6' }); $('#overLay').show(); popupStatus = 1; </script>");
            System.Threading.Thread.Sleep(5000);
            ////string Message;
            DataTable dt = null;
            if (this.xlsUpload.HasFile)
            {
                ////divloadingimage.Visible = true;
                bool uplod = true;
                string fleUpload = Path.GetExtension(this.xlsUpload.FileName.ToString());

                if (fleUpload.Trim().ToLower() == ".xml")
                {
                    this.xlsUpload.SaveAs(Server.MapPath("~/Roles/HRSS/" + this.xlsUpload.FileName.ToString()));
                    //// Save excel file into Server sub dir
                    //// to catch excel file downloading permission
                    string uploadedFile = Server.MapPath("~/Roles/HRSS/" + this.xlsUpload.FileName.ToString());
                    dt = new DataTable();
                    DataSet ds = new DataSet();
                    dt = ExcelReader.ReadExcelXML(uploadedFile);
                    ds.Tables.Add(dt);
                    string result = string.Empty;
                    StringWriter sw = new StringWriter();
                    ds.WriteXml(sw);
                    result = sw.ToString();
                    if (dt.Rows.Count > 0)
                    {
                       //// divloadingimage.Visible = true;
                        try
                        {                                                       
                            Utility.UtilityMethods objUtil = new UtilityMethods();
                            CandidateDetail objCandidateDetail = new CandidateDetail();
                            objCandidateDetail.CandidateAttendancStatus = result;
                            objCandidateDetail.SessionId = objUtil.SessionDetail.SessionId;
                            this.AttendanceUploadExcelDetailsData(objCandidateDetail);

                            if (uplod)
                            {
                                string errormesg = string.Empty;
                                errormesg = this.errorCandidatelist.ToString();
                                if (errormesg == "All candidates updated successfully.")
                                {
                                    this.mesgshow.Text = string.Empty;
                                    this.mesgshowsuccess.Text = errormesg;
                                    this.UpdatedCandidateDetail.Value = this.uploadCandidateUpdateSuccessfully.ToString();
                                }
                                else
                                {
                                    this.uploadCandidateFaild.Value = this.errorCandidatelist.ToString();
                                    this.UpdatedCandidateDetail.Value = this.uploadCandidateUpdateSuccessfully.ToString();
                                }                               
                            }
                        }
                        catch (Exception)
                        {
                           uplod = false;
                           this.mesgshowsuccess.Text = string.Empty;
                           this.mesgshow.Text = "Failed to upload the file.";                          
                        }
                    }
                    else
                    {
                        this.mesgshowsuccess.Text = string.Empty;
                        this.mesgshow.Text = "No records to upload the file.";                    
                    }

                    File.Delete(uploadedFile);
                    ////file in sub dir 'lsUploadFile' no need to keep...
                }
                else
                {
                    this.mesgshowsuccess.Text = string.Empty;
                    this.mesgshow.Text = "Please upload  a valid file.";                  
                }
            }
            else
            {
              //// divloadingimage.Visible = false;
                this.mesgshowsuccess.Text = string.Empty;
                this.mesgshow.Text = "Please select the file to upload.";
            }
        }
         
       /// <summary>
       /// Method for bulk upload button click
       /// </summary>
       /// <param name="sender"> object sender </param>
       /// <param name="e"> event args e</param>
       protected void Btnbulkuplodexcel_Click(object sender, System.EventArgs e) //// stylecop fix , changed  btnbulkuplodexcel_Click to  Btnbulkuplodexcel_Click --397785
        {
            ////string Message;         
            DataTable dt = null;
            if (this.xlsUpload.HasFile)
            {         
                bool uplod = true;
                string fleUpload = Path.GetExtension(this.xlsUpload.FileName.ToString());
                if (fleUpload.Trim().ToLower() == ".xml")
                {
                    this.xlsUpload.SaveAs(Server.MapPath("~/Roles/HRSS/" + this.xlsUpload.FileName.ToString()));
                    //// Save excel file into Server sub dir
                    //// to catch excel file downloading permission
                    string uploadedFile = Server.MapPath("~/Roles/HRSS/" + this.xlsUpload.FileName.ToString());
                    dt = new DataTable();
                    DataSet ds = new DataSet();
                    dt = ExcelReader.ReadExcelXML(uploadedFile);
                    ds.Tables.Add(dt);
                    string result = string.Empty;
                    StringWriter sw = new StringWriter();
                    ds.WriteXml(sw);
                    result = sw.ToString();
                    if (dt.Rows.Count > 0)
                    {
                        //// divloadingimage.Visible = true;
                        try
                        {
                            UploadAttendance objHRSSPage = new UploadAttendance();
                            Utility.UtilityMethods objUtil = new UtilityMethods();                        
                            CandidateDetail objCandidateDetail = new CandidateDetail();
                            objCandidateDetail.CandidateIdList = result;
                            objCandidateDetail.SessionId = objUtil.SessionDetail.SessionId;
                            objHRSSPage.CandidateidBulkUpload(objCandidateDetail);

                            if (uplod)
                            {
                                string errormesg = string.Empty;
                                errormesg = objCandidateDetail.ErrorCandidateIdList.ToString();
                                if (errormesg == "All candidates updated successfully.")
                                {
                                    this.mesgshow.Text = string.Empty;
                                    this.mesgshowsuccess.Text = errormesg;
                                }
                                else
                                {
                                    this.uploadCandidateFaild.Value = errormesg;
                                }                               
                            }
                        }
                        catch (Exception)
                        {
                            uplod = false;
                            this.mesgshowsuccess.Text = string.Empty;
                           this.mesgshow.Text = "Failed to upload the file.";                           
                        }
                    }
                    else
                    {
                        this.mesgshowsuccess.Text = string.Empty;
                        this.mesgshow.Text = "No records to upload the file.";                      
                    }

                    File.Delete(uploadedFile);
                    ////file in sub dir 'lsUploadFile' no need to keep...
                }
                else
                {
                    this.mesgshowsuccess.Text = string.Empty;
                    this.mesgshow.Text = "Please upload  a valid file.";
                }
            }
            else
            {                
                this.mesgshowsuccess.Text = string.Empty;
                this.mesgshow.Text = "Please select the file to upload.";              
            }
        }

        /// <summary>
        /// Documentation for the method.
        /// </summary>
        /// <param name="uploadedFile">uploaded file</param>
        /// <returns>Not implemented exception</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", Justification = "Reviewed.")]
        private DataTable XlsInsert(string uploadedFile) ////stylecop warning fix changed xlsInsert to XlsInsert --397785
        {
            throw new NotImplementedException();
        }

        protected void DownloadTemplate_Click(object sender, EventArgs e)
        {
            Response.ContentType = "text/xml";
            Response.AppendHeader("Content-Disposition", "attachment; filename=InductionAttendanceTemplate.xml");
            Response.TransmitFile(Server.MapPath("~/Templates/InductionAttendanceTemplates/InductionAttendanceTemplate.xml"));
            Response.End(); 
        }
    }
}
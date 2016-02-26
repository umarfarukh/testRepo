//-----------------------------------------------------------------------=
// <copyright file="InterApp.aspx.cs" company="Cognizant Technology Solutions">
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
namespace HReStorage
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.UI;
    using System.Web.UI.WebControls;

    /// <summary>
    /// Class which holds the Page Load event
    /// </summary>
    public partial class InterApp : System.Web.UI.Page
    {
        /// <summary>
        /// This array variable stores Data sent to ECM
        /// </summary>
        private string[] dataToECM = null;

        /// <summary>
        /// This variable stores ECM Message
        /// </summary>
        private string tempECMMessage = string.Empty;

        /// <summary>
        /// This variable stores ECM Code
        /// </summary>
        private string tempECMCode = string.Empty;

        /// <summary>
        /// This variable stores Utility Message
        /// </summary>
        private string tempUtilityMessage = string.Empty;

        /// <summary>
        /// This variable stores Utility Status
        /// </summary>
        private string tempUtilityStatus = string.Empty;

        /// <summary>
        /// This variable stores Document ID
        /// </summary>
        private string tempdocumentID = string.Empty;

        /// <summary>
        /// This Variable sets Flag 
        /// </summary>
        private int flag = 0;

        /// <summary>
        /// Method for Page Load
        /// </summary>
        /// <param name="sender">Sends the Data</param>
        /// <param name="e">Event for Page load</param>
        protected void Page_Load(object sender, EventArgs e)
        {
            OneC.OnBoarding.WebApp.Utility.SessionHelper objSession = new OneC.OnBoarding.WebApp.Utility.SessionHelper();

            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            this.flag = 0;
            this.GetVal.Text = "Before getting data from ECM";
            if (!string.IsNullOrEmpty(Request.Form["ECMMessage"]))
            {
                //// string test1 = ValidateECMMessage(Request.Form["ECMMessage"] + Request.Form["ECMMessage"] + "Successfully checked in content item 'CTSECMIN_14177784'." + Request.Form["ECMMessage"] + "Successfully checked in content item 'CTSECMIN_14177784'.");
                objSession.SetSessionValue("ECMMessage", Request.Form["ECMMessage"]);
            }

            if (!string.IsNullOrEmpty(Request.Form["ECMCode"]))
            {
                objSession.SetSessionValue("ECMCode", Request.Form["ECMCode"]);
            }

            if (!string.IsNullOrEmpty(Request.Form["UtilityMessage"]))
            {
                objSession.SetSessionValue("UtilityMessage", Request.Form["UtilityMessage"]);
            }

            if (!string.IsNullOrEmpty(Request.Form["OverallStatus"]))
            {
                objSession.SetSessionValue("OverallStatus", Request.Form["OverallStatus"]);
            }

            if (!string.IsNullOrEmpty(Request.Form["dID"]))
            {
                objSession.SetSessionValue("dID", Request.Form["dID"]);
            }

            if (this.Session["ECMMessage"] != null)
            {
                this.flag = 1;
                this.tempECMMessage = objSession.GetSessionValue("ECMMessage").ToString();
            }

            if (this.Session["ECMCode"] != null)
            {
                this.flag = 1;
                this.tempECMCode = objSession.GetSessionValue("ECMCode").ToString();
            }

            if (this.Session["UtilityMessage"] != null)
            {
                this.flag = 1;
                this.tempUtilityMessage = objSession.GetSessionValue("UtilityMessage").ToString();
            }

            if (this.Session["OverallStatus"] != null)
            {
                this.flag = 1;
                this.tempUtilityStatus = objSession.GetSessionValue("OverallStatus").ToString();
            }

            if (this.Session["dID"] != null)
            {
                this.flag = 1;
                this.tempdocumentID = objSession.GetSessionValue("dID").ToString();
            }

            this.dataToECM = Request.RawUrl.Split('?');
            if (this.dataToECM.Length == 2)
            {
                string uploadUtilityUrl = System.Configuration.ConfigurationManager.AppSettings["UploadUtilityURL"].ToString().Trim() + "?" + this.dataToECM[1];
                Response.Redirect(uploadUtilityUrl);
            }
            else
            {
                if (this.flag == 1)
                {
                    this.ClientScript.RegisterClientScriptBlock(this.GetType(), "ReturnStatus", "var SendMessage=\"" + this.tempECMMessage + "\";", true);
                    this.ClientScript.RegisterClientScriptBlock(this.GetType(), "ReturnStatus1", "var SendCode=\"" + this.tempECMCode + "\";", true);
                    this.ClientScript.RegisterClientScriptBlock(this.GetType(), "ReturnStatus2", "var SendUtilMessage=\"" + this.tempUtilityMessage + "\";", true);
                    this.ClientScript.RegisterClientScriptBlock(this.GetType(), "ReturnStatus3", "var SendStatus=\"" + this.tempUtilityStatus + "\";", true);
                    this.ClientScript.RegisterClientScriptBlock(this.GetType(), "ReturnStatus4", "var DocumentID=\"" + this.tempdocumentID + "\";", true);
                    string forSuccess = "<script type='text/javascript'>DoOnSuccess();</script>";
                    ClientScript.RegisterStartupScript(this.GetType(), "Success", forSuccess);
                }
            }
        }
    }
}
//-----------------------------------------------------------------------=
// <copyright file="UploadFile.aspx.cs" company="Cognizant Technology Solutions">
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
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Services;
    using System.Web.UI;
    using System.Web.UI.WebControls;
    using OneC.OnBoarding.DC.UtilityDC;
    using OneC.OnBoarding.WebApp.Service.OBUtilityMethods;
    using OneC.OnBoarding.WebApp.Utility;

    /// <summary>
    /// Class holds all the Files uploaded by the Candidate
    /// </summary>
    public partial class UploadFile : System.Web.UI.Page
    {
        #region Private Data Members

        /// <summary>
        /// To get the Session Details
        /// </summary>
        private SessionDetails sessionDetail;

        /// <summary>
        /// To get the Utility Methods
        /// </summary>
       private Utility.UtilityMethods objUtil = new UtilityMethods();

       // /// <summary>
       // /// To get the Login ID of the Candidate
      //  /// </summary>
        // private string loginID;
        #endregion Private Data Members

        /// <summary>
        /// 208099: Web method to get list of tasks for candidate
        /// </summary>
        /// <param name="subject">Subject of the Query</param>
        /// <param name="body">Body of the Query</param>
        /// <returns>mail status</returns>
        [WebMethod]
        public static bool PostQuery(string subject, string body)
        {
            SessionDetails objsess = new SessionDetails();
            using (OBUtilityMethodsClient objClient = new OBUtilityMethodsClient())
            {
                string loginID;
                bool mailstatus = false;
                if (objsess != null)
                {
                    loginID = objsess.LoginId;
                    MailData objMail = new MailData();
                    objMail.Subject = subject;
                    objMail.Body = body;
                    objMail.FromId = loginID.ToString();
                    mailstatus = objClient.SendMailWithConfirmBoolStatus(objMail);
                }

                return mailstatus;
            }
        }

        /// <summary>
        /// Method for Page Initialization
        /// </summary>
        /// <param name="sender">to get the Session Detail</param>
        /// <param name="e">This parameter helps in getting Session Details</param>
        protected void Page_init(object sender, EventArgs e)
        {
            /* Initialize session detail */
            if (this.objUtil.SessionDetail != null)
            {
                this.sessionDetail = this.objUtil.SessionDetail;
                this.hdnLoginID.Value = this.sessionDetail.LoginId;
            }            
        }

        /// <summary>
        /// Method for Page Initialization
        /// </summary>
        /// <param name="sender">Sends the Details of the User</param>
        /// <param name="e">this is used to get the File uploaded by the Candidate</param>
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                this.FileUploadAttach = new FileUpload();
            }

            // MailData objmaildata = new MailData();           
        }

        /// <summary>
        /// Method to get the File Uploaded By the Candidate
        /// </summary>
        /// <param name="sender">To get the Details of the Attachment</param>
        /// <param name="e">This parameter helps in getting the File Uploaded</param>
        protected void BtnUploadFile_Click(object sender, EventArgs e)
        {
            MailAttachment objMailAttachment = new MailAttachment();

            // MailerEntity objMailEntity = new MailerEntity();
           // MailData objMailData = new MailData();
            objMailAttachment.AttachmentName = this.FileUploadAttach.FileName;
            HttpPostedFile file = this.FileUploadAttach.PostedFile;

            // objMailAttachment.AttachmentContent =Convert.ToByte(FileUploadAttach.PostedFile);
            byte[] fileData = null;

            // Get size of the file
            int numberFileLen = file.ContentLength;

            // Make sure the size of the file is > 0
            if (numberFileLen > 0)
            {
                fileData = new byte[file.ContentLength];
                file.InputStream.Read(fileData, 0, numberFileLen);
            }

            objMailAttachment.AttachmentContent = fileData;

            using (OBUtilityMethodsClient objUtilityClnt = new OBUtilityMethodsClient())
            {
               objUtilityClnt.UploadAttachment(objMailAttachment);
                
            // hdnFileType.Value = fileID.ToString();
            }
        }
    }
}

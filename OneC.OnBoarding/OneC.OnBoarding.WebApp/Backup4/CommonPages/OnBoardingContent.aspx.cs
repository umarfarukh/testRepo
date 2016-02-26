//-----------------------------------------------------------------------=
// <copyright file="OnBoardingContent.aspx.cs" company="Cognizant Technology Solutions">
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
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Collections.Specialized;
    using System.Configuration;
    using System.Linq;
    using System.Web;
    using System.Web.UI;
    using System.Web.UI.WebControls;
    using OneC.OnBoarding.DC.UtilityDC;
    using OneC.OnBoarding.WebApp.Service.OBUtilityMethods;
    using OneC.OnBoarding.WebApp.Utility;

    #endregion Namespaces

    /// <summary>
    /// This Class helps in getting the Onboarding Content 
    /// </summary>
    public partial class OnBoardingContent : System.Web.UI.Page
    {
        #region Declarations

        // /// <summary>
        // /// Page ID
        // /// </summary>
        // private int pageId = 1;

        /// <summary>
        /// Session Details
        /// </summary>
        private SessionDetails sessionDetail;

        // /// <summary>
        // /// Logged in User Information
        // /// </summary>
        // private UserInfoDC loggedInUserInfo;

        /// <summary>
        /// Redirected to URL
        /// </summary>
        private string redirectUrl = string.Empty;

        /// <summary>
        /// User Role List 
        /// </summary>
        private UserRolesList roleList;

        /* Initializing global object for Utility class to access utility methods if required */

        /// <summary>
        /// Utility Methods 
        /// </summary>
        private Utility.UtilityMethods objUtil = new UtilityMethods();

        /// <summary>
        /// Session Helper
        /// </summary>
        private SessionHelper session = new SessionHelper();

        /// <summary>
        /// Gets or sets Current User Information
        /// </summary>
        public UserInfoDC CurrentUserInfo 
        { 
            get; 
            set; 
        }

        #endregion

        #region Page Methods

        /// <summary>
        /// Method for Page Initialization
        /// </summary>
        /// <param name="sender">Sends the Data</param>
        /// <param name="e">Event for page initialization</param>
        protected void Page_init(object sender, EventArgs e)
        {
            /* Initialize session detail */
            if (ConfigurationManager.AppSettings["Isdowntimeenabled"].ToString() == "true")
            {
                Response.Redirect("DownTime.aspx");
            }

            this.sessionDetail = (SessionDetails)this.session.GetSessionValue("SessionDetail");

            /* If session not available then deny access */
            if (this.sessionDetail == null)
            {
                this.objUtil.RedirectToAccessBlock(UtilityMethods.OBSESSIONNOTFOUND);
            }
            else
            {
                if (!this.sessionDetail.IsSessionActive)
                {
                    this.objUtil.RedirectToAccessBlock(UtilityMethods.OBSESSIONEXPIRED);
                }
                else
                {
                    try
                    {
                        if (this.session.GetSessionValue("CurrentUserInfo") != null)
                        {
                            // Getting value from session
                            this.CurrentUserInfo = (UserInfoDC)this.session.GetSessionValue("CurrentUserInfo");
                        }
                        else
                        {
                            UserInfo user;
                            if (!string.IsNullOrEmpty(Request.QueryString["makemeas"]))
                            {
                           //// if (Request.QueryString["makemeas"] != null)
                            
                              ////  if (Request.QueryString["makemeas"] != string.Empty)
                               //// {
                                    user = new UserInfo(this.sessionDetail, Request.QueryString["makemeas"]);
                                    this.CurrentUserInfo = user.CurrentUserInfo;
                                    if (this.CurrentUserInfo.IsApplicationInSupportMode == false)
                                    {
                                        this.objUtil.RedirectToAccessBlock(UtilityMethods.OBUNAUTHORIZEDMAKEMEAS);
                                    }
                               //// }
                            }
                            else
                            {
                                user = new UserInfo(this.sessionDetail);
                                this.CurrentUserInfo = user.CurrentUserInfo;
                            }

                            // Set currentuserinfo object in session
                            this.session.SetSessionValue("CurrentUserInfo", this.CurrentUserInfo);
                        }

                        if (!Page.IsPostBack)
                        {
                            this.SetRolesList();
                        }
                    }
                    catch (Exception ex)
                    {
                        ErrorLogger logger = new ErrorLogger(this.sessionDetail.SessionId);
                        logger.LogError(ex);
                    }
                }
            }
        }

        /// <summary>
        /// Method for Page Load
        /// </summary>
        /// <param name="sender">Sends the Data</param>
        /// <param name="e">Event for Page load</param>
        protected void Page_Load(object sender, EventArgs e)
        {
            /* Assigning keyvalues for Session timeout intervals */

            // hdnExpire.Value = objUtil.SessionExpireDuration;
            // hdnWarning.Value = objUtil.SessionWarningDuration;
            if (!Page.IsPostBack)
            {
                try
                {
                    ////string dbConString = ConfigurationManager.ConnectionStrings["conString"].ConnectionString;
                    if (ConfigurationManager.AppSettings["ispenabled"].ToString() == "true")
                    {
                        this.SetRolePagenw(1);
                    }
                    else
                    {
                        this.SetRolePage();
                    }
                }
                catch (Exception ex)
                {
                    ErrorLogger logger = new ErrorLogger(this.sessionDetail.SessionId);
                    logger.LogError(ex);
                }
            }

            /* Check for valid access request to this page starts here */

            // PageAccess pageAccess = objUtil.IsPageAllowed(pageId, 0, DC.UtilityDC.RoleGroup.HRSS);
            // if (pageAccess.IsAllowed == false)
            //    Response.RedirectPermanent("/AccessBlock.aspx?BlockId=" 
            //        + HttpUtility.HtmlEncode(pageAccess.MessageId.ToString()), true);
        }

        #endregion

        #region Role Config Methods

        /// <summary>
        /// 260947: Event handler method for Selected Roles List which gets fired when index changed
        /// </summary>
        /// <param name="sender">Sends the Roles List</param>
        /// <param name="e">Event for getting the Selected Roles List</param>
        protected void SelRolesList_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (ConfigurationManager.AppSettings["ispenabled"].ToString() == "true")
            {
                string selectedRole1 = this.SelRolesList.SelectedItem.ToString();
                if (selectedRole1 == "RC")
                {
                    this.SetRolePagenw(2);
                }
                else if (selectedRole1 == "NH")
                {
                    this.SetRolePagenw(1);
                }
                else if (selectedRole1 == "HRSS")
                {
                    this.SetRolePagenw(3);
                }
            }
            else
            {
                this.SetSelectedRolePage(this.SelRolesList.SelectedItem.ToString());
            }
        }

        /// <summary>
        /// 260947: Method which loads the corresponding page for the role chosen
        /// </summary>
        /// <param name="selectedRole">To get the selected Role Page</param>
        private void SetSelectedRolePage(string selectedRole)
        {
            // Getting value from session
            if (this.session.GetSessionValue("RolesList") != null)
            {
                this.roleList = (UserRolesList)this.session.GetSessionValue("RolesList");
            }

            this.redirectUrl = string.Empty;
            if (this.roleList != null)
            {
                this.redirectUrl = this.roleList.Where(x => x.RoleGroupCode.Trim() == selectedRole.Trim()).OrderBy(x => x.RoleDisplayOrder).Select(x => x.RoleURL.Trim()).First();
                this.SetSessionData(this.redirectUrl);
            }
            else
            {
                this.objUtil.RedirectToAccessBlock(UtilityMethods.OBACCESSDENIED);
            }

            this.SetRolePage();
        }

        /// <summary>
        /// 298589: This method is used to store the query string parameter values in session
        /// </summary>
        /// <param name="param">To get the Session Data</param>
        private void SetSessionData(string param)
        {
            string querystring = null;
            int iqs = param.IndexOf('?');
            if (iqs >= 0)
            {
                querystring = (iqs < param.Length - 1) ? param.Substring(iqs + 1) : string.Empty;

               // redirectUrl = param.Substring(0, iqs);
            }

            NameValueCollection qscol = HttpUtility.ParseQueryString(querystring);
            foreach (var qsi in qscol.AllKeys)
            {
                this.session.SetSessionValue(qsi, qscol[qsi]);
            }

            // session.SetSessionValue(keyName, Value);
        }

        /// <summary>
        /// 260947: Loading the corresponding page for selected role
        /// </summary>
        private void SetRolePage()
        {
            // redirectUrl = "../Roles/NHPages/NHDashBoard.aspx";
            string str = "<script type='text/javascript'>loadIframe('" + this.redirectUrl + "');" + "</script>";
            Page.ClientScript.RegisterStartupScript(this.GetType(), "onload", str);
        }

        /// <summary>
        /// 260947: Loading the corresponding page for selected role
        /// </summary>
        /// <param name="mode">mode value to display page</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", Justification = "Reviewed")]
        private void SetRolePagenw(int mode)
        {
            if (mode == 1)
            {
                this.redirectUrl = "../Roles/NHPages/NHDashboard.htm";
            }
            else if (mode == 2)
            {
                this.redirectUrl = "../Roles/NHPages/RCDashBoardn.htm";
            }
            else if (mode == 3)
            {
                this.redirectUrl = "../Roles/NHPages/HRSSDashBoardn.htm";
            }

            string str = "<script type='text/javascript'>loadIframe('" + this.redirectUrl + "');" + "</script>";
            Page.ClientScript.RegisterStartupScript(this.GetType(), "onload", str);
        }

        /// <summary>
        /// 260947: Getting list of roles from DB along with country and URLs for each role
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", MessageId = "ab", Justification = "reviewed")]
        private void SetRolesList()
        {
            if (ConfigurationManager.AppSettings["ispenabled"].ToString() == "true")
            {
                OneC.OnBoarding.DC.UtilityDC.RoleGroup ab = new DC.UtilityDC.RoleGroup();
                OneC.OnBoarding.DC.UtilityDC.UserRoles[] roleList = new OneC.OnBoarding.DC.UtilityDC.UserRoles[3];
                roleList[0] = new UserRoles();
                roleList[1] = new UserRoles();
                roleList[2] = new UserRoles();
                roleList[0].RoleCountryId = "3";
                roleList[0].RoleDescription = "New Hire";
                roleList[0].RoleDetailId = "R_ID_0060";
                roleList[0].RoleDisplayOrder = 1;
                roleList[0].RoleGroupCode = "NH";
                roleList[0].RoleGroupId = OneC.OnBoarding.DC.UtilityDC.RoleGroup.NH;
                roleList[0].RoleURL = "../Roles/NHPages/NHHomepagenew.htm";

                roleList[1].RoleCountryId = "3";
                roleList[1].RoleDescription = "Recruiting Coordinator";
                roleList[1].RoleDetailId = "R_ID_0061";
                roleList[1].RoleDisplayOrder = 2;
                roleList[1].RoleGroupCode = "RC";
                roleList[1].RoleGroupId = OneC.OnBoarding.DC.UtilityDC.RoleGroup.RC;
                roleList[1].RoleURL = "../Roles/NHPages/NHHomepagenew.htm";

                roleList[2].RoleCountryId = "3";
                roleList[2].RoleDescription = "Recruiting Coordinator";
                roleList[2].RoleDetailId = "R_ID_0068";
                roleList[2].RoleDisplayOrder = 2;
                roleList[2].RoleGroupCode = "HRSS";
                roleList[2].RoleGroupId = OneC.OnBoarding.DC.UtilityDC.RoleGroup.HRSS;
                roleList[2].RoleURL = "../Roles/NHPages/NHHomepagenew.htm";

                if (roleList != null)
                {
                    // Set currentuserinfo object in session
                    this.session.SetSessionValue("RolesList", roleList);

                    foreach (string roleItem in roleList.OrderBy(x => x.RoleDisplayOrder).Select(x => x.RoleGroupCode).Distinct().ToList())
                    {
                        this.SelRolesList.Items.Add(roleItem);
                    }

                    // Setting the inital page of first role in dropdown
                    this.SetSelectedRolePage(this.SelRolesList.Items[0].ToString());

                    if (this.SelRolesList.Items.Count != 0 && this.SelRolesList.Items.Count <= 1)
                    {
                        this.SelRolesList.Style.Add("display", "none");
                        this.SpanRoles.Style.Add("display", "none");
                    }
                }
                else
                {
                    this.objUtil.RedirectToAccessBlock(UtilityMethods.OBACCESSDENIED);
                }
            }
            else
            {
            // Getting list of roles from DB
            this.roleList = this.objUtil.GetUserRoles();

            if (this.roleList != null && this.roleList.Count > 0)
            {
                // Set currentuserinfo object in session
                this.session.SetSessionValue("RolesList", this.roleList);

                foreach (string roleItem in this.roleList.OrderBy(x => x.RoleDisplayOrder).Select(x => x.RoleGroupCode).Distinct().ToList())
                {
                    this.SelRolesList.Items.Add(roleItem);
                }

                // Setting the inital page of first role in dropdown
                this.SetSelectedRolePage(this.SelRolesList.Items[0].ToString());

                if (this.SelRolesList.Items.Count != 0 && this.SelRolesList.Items.Count <= 1)
                {
                    this.SelRolesList.Style.Add("display", "none");
                    this.SpanRoles.Style.Add("display", "none");
                }
            }
            else
            {
                this.objUtil.RedirectToAccessBlock(UtilityMethods.OBACCESSDENIED);
            }
            }
        }

        #endregion
    };
}

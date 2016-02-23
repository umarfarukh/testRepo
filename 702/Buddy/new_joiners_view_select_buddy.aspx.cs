// ***********************************************************************
// Assembly         : Buddy
// Author           : 397757
// Created          : 07-15-2014
//
// Last Modified By : 397757
// Last Modified On : 08-12-2014
// ***********************************************************************
// <copyright file="New_joiners_view_select_buddy.aspx.cs" company="Cognizant Technology Solutions">
//     Copyright (c) Cognizant Technology Solutions. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

/// <summary>
/// The Buddy namespace.
/// </summary>
namespace Buddy
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Diagnostics;
    using System.IO;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Web;
    using System.Web.Services;
    using System.Web.SessionState;
    using System.Web.UI;
    using System.Web.UI.WebControls;
    using BuddyBLL;
    using BuddyBLL.ExceptionLoggingService;
    using CTS.OneC.Platform.CoreServices.FormRedirectionUrl;
    using CTS.OneCognizant.Platform.CoreServices;

    /// <summary>
    /// Class New_joiners_view_select_buddy.
    /// </summary>
    public partial class New_joiners_view_select_buddy : System.Web.UI.Page ////397757
    {      
        /// <summary>
        /// Raises the supervisor request.
        /// </summary>
        /// <param name="joineeId">The joiner identifier.</param>
        /// <returns>System. String.</returns>
        [WebMethod]
        public static string RaiseSupervisorRequest(string joineeId)  ////397757////
        {
            BuddyBLL.Relation r = new BuddyBLL.Relation(); ////397757////
            return r.RaiseSupervisorRequest(joineeId);
        }

        /// <summary>
        /// Gets the supervisor details.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>System. String.</returns>
        [WebMethod]
        public static string GetSupervisorDetails(string userId)
        {
            BuddyBLL.Relation r = new BuddyBLL.Relation(); ////397757////
            r.GetSupervisorDetails(userId);
            return r.MySupervisorName;
        }

        /// <summary>
        /// Handles the Load event of the Page control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="EventArgs"/> instance containing the event data.</param>
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (string.IsNullOrEmpty(HttpContext.Current.Session["UserId"] as string))
                {
                    UserContext usr = UserContext.GetUserContext();
                    string userId = usr.CurrentUser.UserId; ////397757
                    string userName = usr.CurrentUser.FirstName; ////397757

                    BuddyBLL.User userDetails = new BuddyBLL.User(userId); ////397757
                    userDetails.GetUserType(userId);
                    HttpSessionState ss = HttpContext.Current.Session;

                    HttpContext.Current.Session["UserId"] = userId;
                    HttpContext.Current.Session["DisplayName"] = userDetails.DisplayName;
                    if (userDetails.Base64img != null)
                    {
                        HttpContext.Current.Session["UserPhoto"] = userDetails.Base64img;
                    }
                    else
                    {
                        HttpContext.Current.Session["UserPhoto"] = string.Empty;
                    }

                    HttpContext.Current.Session["Gender"] = userDetails.Gender;
                    HttpContext.Current.Session["IsJoinee"] = userDetails.IsJoinee;
                    HttpContext.Current.Session["IsSupervisor"] = userDetails.IsSupervisor;
                    HttpContext.Current.Session["IsTM"] = userDetails.IsTM;
                    HttpContext.Current.Session["IsMasteradmin"] = userDetails.IsMasteradmin;

                    BuddyBLL.AdminConfiguration conf = new AdminConfiguration(); ////397757
                    conf.GetConnectionDuration(userId);
                    HttpContext.Current.Session["ConnectionDuration"] = conf.BuddyDuration.ToString();
                }

                this.CurrentUserId.Value = HttpContext.Current.Session["UserId"].ToString();
                this.DisplayName.Value = HttpContext.Current.Session["DisplayName"].ToString();
                this.Gender.Value = HttpContext.Current.Session["Gender"].ToString();
                this.myImageSrc.Value = HttpContext.Current.Session["UserPhoto"].ToString();
                this.isSupervisor.Value = HttpContext.Current.Session["IsSupervisor"].ToString();
                this.isTM.Value = HttpContext.Current.Session["IsTM"].ToString();
                this.isMasteradmin.Value = HttpContext.Current.Session["IsMasteradmin"].ToString();
                this.ConnectionDuration.Value = HttpContext.Current.Session["ConnectionDuration"].ToString();
            }
            catch (Exception ex)
            {
                LoggingClient logclient = new LoggingClient();
                try
                {
                    if (logclient != null)
                    {
                        ExceptionLog obj = new ExceptionLog();
                        var frame = new StackFrame(0);
                        var classname = frame.GetMethod().ReflectedType.FullName;
                        var methodname = frame.GetMethod().Name;
                        obj.ApplicationName = "Buddy";
                        obj.ClassName = frame.GetMethod().ReflectedType.FullName;
                        obj.MethodName = frame.GetMethod().Name;
                        obj.Message = ex.Message;
                        obj.StackTrace = ex.StackTrace;
                        obj.ApplicationType = ApplicationType.WebApplication;
                        obj.EmployeeID = UserContext.GetUserContext().CurrentUser.UserId;
                        ////obj.EmployeeID = System.Security.Principal.WindowsIdentity.GetCurrent().Name;
                        obj.GlobalAppId = 702;
                        obj.MachineName = Environment.MachineName;
                        logclient.LogException(obj);
                    }
                }
                catch (Exception)
                {
                    throw;
                }

                string erroMsg = Server.UrlEncode(ex.Message);
                Response.Redirect("BuddyAppError.aspx?Error=" + erroMsg + string.Empty, false);
            }
        }
    }
}
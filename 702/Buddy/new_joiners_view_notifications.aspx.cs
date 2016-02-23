// ***********************************************************************
// Assembly         : Buddy
// Author           : 397757
// Created          : 07-15-2014
//
// Last Modified By : 397757
// Last Modifiedd On : 07-15-2014
// ***********************************************************************
// <copyright file="New_joiners_view_notifications.aspx.cs" company="Cognizant Technology Solutions">
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
    using System.Diagnostics;
    using System.Web;
    using System.Web.Script.Serialization;
    using System.Web.Services;
    using System.Web.SessionState;
    using BuddyBLL;
    using BuddyBLL.ExceptionLoggingService;
    using CTS.OneCognizant.Platform.CoreServices;

    /// <summary>
    /// Class new joiners view notifications.
    /// </summary>
    public partial class New_joiners_view_notifications : System.Web.UI.Page ////397757
    {
        /// <summary>
        /// Gets the notification joiner team members.
        /// </summary>
        /// <param name="buddyId">The buddy identifier.</param>
        /// <returns>System. String.</returns>
        [WebMethod]
        public static string GetNotificationJoineeTeamMembers(string buddyId)  ////397757////
        {
            BuddyBLL.Relation r = new BuddyBLL.Relation();  ////397757////
            r.GetSupervisorNotification(buddyId);
            string retVal = new JavaScriptSerializer().Serialize(r);
            return retVal;
        }

        /// <summary>
        /// Disconnections the request.
        /// </summary>
        /// <param name="joineeId">The joiner identifier.</param>
        /// <param name="buddyId">The buddy identifier.</param>
        /// <param name="bywhom">The by whom.</param>
        /// <param name="requestType">Type of the request.</param>
        /// <returns>System. String.</returns>
        [WebMethod]
        public static string DisconnectionRequest(string joineeId, string buddyId, string bywhom, string requestType) ////397757////
        {
            BuddyBLL.Relation r = new BuddyBLL.Relation(); ////397757////
            r.DisconnectionRequest(joineeId, buddyId, bywhom, requestType);
            string retVal = new JavaScriptSerializer().Serialize(r);
            return retVal;
        }

        /// <summary>
        /// Gets the contact card.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>System. String.</returns>
        [WebMethod]
        public static string GetContactCard(string userId) ////397757////
        {
            BuddyBLL.User u = new BuddyBLL.User(); ////397757////
            u.GetUserContactCard(userId);
            string retVal = new JavaScriptSerializer().Serialize(u);
            return retVal;
        }

        /// <summary>
        /// Gets the joiner inbox notification.
        /// </summary>
        /// <param name="joineeId">The joiner identifier.</param>
        /// <returns>a String.</returns>
        [WebMethod]
        public static string GetJoineeInboxNotification(string joineeId) ////397757////
        {
            BuddyBLL.Relation r = new BuddyBLL.Relation(); ////397757////
            r.GetJoineeInboxNotification(joineeId);
            string retVal = new JavaScriptSerializer().Serialize(r);
            return retVal;
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
                    string userId = usr.CurrentUser.UserId; ////397757////
                    string userName = usr.CurrentUser.FirstName;  ////397757////

                    BuddyBLL.User userDetails = new BuddyBLL.User(userId);  ////397757////
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

                    BuddyBLL.AdminConfiguration conf = new AdminConfiguration();  ////397757////
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
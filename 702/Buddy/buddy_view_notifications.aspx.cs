//-----------------------------------------------------------------------
// <copyright file="buddy_view_notifications.aspx.cs" company="Cognizant">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
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
    using System.Web.Script.Serialization;
    using System.Web.Services;
    using System.Web.SessionState;
    using System.Web.UI;
    using System.Web.UI.WebControls;
    using BuddyBLL;
    using BuddyBLL.ExceptionLoggingService;
    using CTS.OneC.Platform.CoreServices.FormRedirectionUrl;
    using CTS.OneCognizant.Platform.CoreServices;
    
    /// <summary>
    /// class for buddy view notifications
    /// </summary>
    public partial class Buddy_view_notifications : System.Web.UI.Page
    {
        /// <summary>
        /// method to Get Notification Buddy Requests
        /// </summary>
        /// <param name="buddyId">Buddy Id</param>
        /// <returns>a value</returns>
        [WebMethod]
        public static string GetNotificationBuddyRequests(string buddyId)
        {
            BuddyBLL.Relation r = new BuddyBLL.Relation();
            r.GetNotificationBuddyRequests(buddyId);
            string retVal = new JavaScriptSerializer().Serialize(r);
            return retVal;
        }

        /// <summary>
        /// method to Get Notification Buddy Disconnection Alerts
        /// </summary>
        /// <param name="buddyId">Buddy Id</param>
        /// <returns>a value</returns>
        [WebMethod]
        public static string GetNotificationBuddyDisconnectionAlerts(string buddyId)
        {
            BuddyBLL.Relation r = new BuddyBLL.Relation();
            r.GetNotificationBuddyDisconnectionAlerts(buddyId);
            string retVal = new JavaScriptSerializer().Serialize(r);
            return retVal;
        }

        /// <summary>
        /// method to GetNotificationBuddyOther
        /// </summary>
        /// <param name="buddyId">Buddy Id</param>
        /// <returns>a value</returns>
        [WebMethod]
        public static string GetNotificationBuddyOther(string buddyId)
        {
            BuddyBLL.Relation r = new BuddyBLL.Relation();
            r.GetNotificationBuddyOther(buddyId);
            string retVal = new JavaScriptSerializer().Serialize(r);
            return retVal;
        }

        /// <summary>
        /// method to Get Notification Buddy Team Members
        /// </summary>
        /// <param name="buddyId">Buddy Id</param>
        /// <returns>a value</returns>
        [WebMethod]
        public static string GetNotificationBuddyTeamMembers(string buddyId)
        {
            BuddyBLL.Relation r = new BuddyBLL.Relation();
            r.GetSupervisorNotification(buddyId);
            string retVal = new JavaScriptSerializer().Serialize(r);
            return retVal;
        }

        /// <summary>
        /// method to Buddy Connection Request
        /// </summary>
        /// <param name="joineeId">Joiner Id</param>
        /// <param name="buddyId">Buddy Id</param>
        /// <param name="requestType">Request Type</param>
        /// <param name="rejectionComment">Rejection Comment</param>
        /// <param name="supervisorRecommended">supervisor Recommended</param>
        /// <returns>a value</returns>
        [WebMethod]
        public static string BuddyConnectionRequest(string joineeId, string buddyId, string requestType, string rejectionComment, string supervisorRecommended)
        {
            BuddyBLL.Relation r = new BuddyBLL.Relation();
            r.BuddyConnectionRequest(joineeId, buddyId, requestType, rejectionComment, supervisorRecommended);
            string retVal = new JavaScriptSerializer().Serialize(r);
            return retVal;
        }

        /// <summary>
        /// method to Disconnection Request
        /// </summary>
        /// <param name="joineeId">Joiner Id</param>
        /// <param name="buddyId">Buddy Id</param>
        /// <param name="bywhom">By Whom</param>
        /// <param name="requestType">Request Type</param>
        /// <returns>a value</returns>
        [WebMethod]
        public static string DisconnectionRequest(string joineeId, string buddyId, string bywhom, string requestType)
        {
            BuddyBLL.Relation r = new BuddyBLL.Relation();
            r.DisconnectionRequest(joineeId, buddyId, bywhom, requestType);
            string retVal = new JavaScriptSerializer().Serialize(r);
            return retVal;
        }

        /// <summary>
        /// method to Get Contact Card
        /// </summary>
        /// <param name="userId">User Id</param>
        /// <returns>a value</returns>
        [WebMethod]
        public static string GetContactCard(string userId)
        {
            BuddyBLL.User u = new BuddyBLL.User();
            u.GetUserContactCard(userId);
            string retVal = new JavaScriptSerializer().Serialize(u);
            return retVal;
        }

        /// <summary>
        /// method for page load
        /// </summary>
        /// <param name="sender">for sender</param>
        /// <param name="e">for e</param>
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (string.IsNullOrEmpty(HttpContext.Current.Session["UserId"] as string))
                {
                    UserContext usr = UserContext.GetUserContext();
                    string userId = usr.CurrentUser.UserId;
                    string userName = usr.CurrentUser.FirstName;

                    BuddyBLL.User userDetails = new BuddyBLL.User(userId);
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
                    HttpContext.Current.Session["IsRegisteredBuddy"] = userDetails.IsRegisteredBuddy;

                    BuddyBLL.AdminConfiguration conf = new AdminConfiguration();
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
                this.isRegistered.Value = HttpContext.Current.Session["IsRegisteredBuddy"].ToString();
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
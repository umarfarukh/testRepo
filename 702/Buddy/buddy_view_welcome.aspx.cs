//-----------------------------------------------------------------------
// <copyright file="buddy_view_welcome.aspx.cs" company="Cognizant">
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
    using System.Web.Services;
    using System.Web.SessionState;
    using System.Web.UI;
    using System.Web.UI.WebControls;
    using BuddyBLL;
    using BuddyBLL.ExceptionLoggingService;   
    using CTS.OneC.Platform.CoreServices.FormRedirectionUrl; 
    using CTS.OneCognizant.Platform.CoreServices;
  
    /// <summary>
    /// class for buddy view welcome
    /// </summary>
    public partial class Buddy_view_welcome : System.Web.UI.Page
    {
        /// <summary>
        /// method for page load
        /// </summary>
        /// <param name="sender">for sender></param>
        /// <param name="e">for e</param>
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (string.IsNullOrEmpty(HttpContext.Current.Session["UserId"] as string))
                {
                    UserContext usr = UserContext.GetUserContext();
                    string userId = usr.CurrentUser.UserId;                  

                    BuddyBLL.User userDetails = new BuddyBLL.User(userId);
                    userDetails.GetUserType(userId);
                    
                    HttpContext.Current.Session["UserId"] = userId;
                    HttpContext.Current.Session["DisplayName"] = userDetails.DisplayName;
                    ////298015 - FxCop
                    if (!string.IsNullOrEmpty(userDetails.Base64img))   
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
                    HttpContext.Current.Session["AcceptanceCountOfRegBuddy"] = conf.AcceptanceCountOfRegBuddy.ToString();
                    HttpContext.Current.Session["AcceptanceCountOfUnRegBuddy"] = conf.AcceptanceCountOfUnRegBuddy.ToString();
                    HttpContext.Current.Session["ConnectionsOfJoiners"] = conf.ConnectionsOfJoiners.ToString();
                    HttpContext.Current.Session["CountryId"] = userDetails.CountryId;
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
                this.CountryId.Value = HttpContext.Current.Session["CountryId"].ToString();
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
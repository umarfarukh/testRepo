//-----------------------------------------------------------------------
// <copyright file="BuddyAppHome.aspx.cs" company="Cognizant">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
namespace Buddy
{
    using System;  
    using System.Collections.Generic;
    using System.Configuration;
    using System.Data;
    using System.Data.SqlClient;
    using System.Diagnostics;
    using System.IO;
    using System.Linq;
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
    /// class for Buddy App Home
    /// </summary>
    public partial class BuddyAppHome : System.Web.UI.Page
    {
        /// <summary>
        /// method for Is Associate Eligible
        /// </summary>
        /// <param name="buddyId">Buddy Id</param>
        /// <returns>a value</returns>
        [WebMethod]
        public static string IsAssociateEligible(string buddyId)
        {
            BuddyBLL.User r = new BuddyBLL.User();
            r.IsAssociateEligible(buddyId);
            string retVal = new JavaScriptSerializer().Serialize(r);
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
                string userId = string.Empty;
                string userName = string.Empty;
                if (Request.QueryString["MakeMeAs"] != null)
                {
                    //// 1. retrieve logged in user's user id thru usercontext
                    UserContext testusr = UserContext.GetUserContext();
                    string currentUserId = testusr.CurrentUser.UserId;

                    //// 2. check whether masteradmin using user class method named 'GetUserType()'
                    BuddyBLL.User checkMasterAdmin = new BuddyBLL.User();
                    checkMasterAdmin.GetUserType(currentUserId);
                   
                    //// 3. see if masteradmin using IsMasteradmin datamember
                    bool isMasteradmin = checkMasterAdmin.IsMasteradmin;


                    //// 4. if he is masteradmin then copy UserId frm querystring follow normal procedure
                    if (isMasteradmin)                                        
                    {
                       userId = Request.QueryString["MakeMeAs"];
                    }
                    else
                    {
                        //// 5. else redirect to not eligible page Response.Redirect("BuddyAppEligibleError.aspx", false);
                        userId = null;
                        Response.Redirect("BuddyAppEligibleError.aspx", false);
                    }                  
                }
                else
                {
                    UserContext usr = UserContext.GetUserContext();
                    ////userId = "380864";
                    userId =  usr.CurrentUser.UserId;
                    userName = usr.CurrentUser.FirstName;  
                }

                if (userId != null)
                {
                    BuddyBLL.User userDetails = new BuddyBLL.User(userId);
                    userDetails.GetUserType(userId);
                    
                    bool isEligible = userDetails.IsEligible;
                    //// IsEligible = true;
                  
                    if (isEligible)
                    {
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
                        HttpContext.Current.Session["IsJoinee"] = "True";//// userDetails.IsJoinee;
                        HttpContext.Current.Session["IsSupervisor"] = userDetails.IsSupervisor;
                        HttpContext.Current.Session["IsTM"] = userDetails.IsTM;
                        HttpContext.Current.Session["IsMasteradmin"] = userDetails.IsMasteradmin;
                        HttpContext.Current.Session["IsRegisteredBuddy"] = userDetails.IsRegisteredBuddy;
                        HttpContext.Current.Session["ConnectionDuration"] = userDetails.BuddyDuration;
                        HttpContext.Current.Session["AcceptanceCountOfRegBuddy"] = userDetails.AcceptanceCountOfRegBuddy;
                        HttpContext.Current.Session["AcceptanceCountOfUnRegBuddy"] = userDetails.AcceptanceCountOfUnRegBuddy;
                        HttpContext.Current.Session["ConnectionsOfJoiners"] = userDetails.ConnectionsOfJoiners;
                        HttpContext.Current.Session["CountryId"] = userDetails.CountryId;
                        HttpContext.Current.Session["Designation"] = userDetails.Designation;

                        this.IsJoinee.Value = "True";//// Convert.ToString(userDetails.IsJoinee);
                        this.IsLateral.Value = "True";//// Convert.ToString(userDetails.IsLateral);
                        this.UserCountryId.Value = Convert.ToString(userDetails.CountryId);
                    }
                    else
                    {
                        Response.Redirect("BuddyAppEligibleError.aspx", false);
                    }
                }
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
                        //// obj.EmployeeID = System.Security.Principal.WindowsIdentity.GetCurrent().Name;
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

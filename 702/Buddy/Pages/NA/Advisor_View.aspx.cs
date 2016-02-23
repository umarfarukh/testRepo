// ***********************************************************************
// Assembly         : Joinee
// Author           : 320768
// Created          : 09-06-2014
//
// Last Modified By : 320768
// Last Modified On : 09-06-2014
// ***********************************************************************
// <copyright file="Advisor_View.aspx.cs" company="Cognizant Technology Solutions">
//     Copyright (c) Cognizant Technology Solutions. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace Buddy.Pages.NA
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
    /// Advisor View
    /// </summary>
    public partial class Advisor_View : System.Web.UI.Page
    {        
        /// <summary>
        /// Get PageContent
        /// </summary>
        /// <param name="countryId">country Id</param>
        /// <param name="pageName">page name</param>
        /// <param name="role">user role</param>
        /// <returns> page content</returns>
        [WebMethod]
        public static string PageContent(string countryId, string pageName, string role)
        {
            BuddyBLL.User user = new BuddyBLL.User();
            user.GetPageContent(countryId, pageName, role);
            string retVal = new JavaScriptSerializer().Serialize(user);
            return retVal;
        }

        /// <summary>
        /// method to Get Notification Buddy Requests
        /// </summary>
        /// <param name="buddyId">Buddy Id</param>
        /// <returns>a value</returns>
        [WebMethod]
        public static string NotificationBuddyRequests(string buddyId)
        {
            BuddyBLL.Relation r = new BuddyBLL.Relation();
            r.GetNotificationBuddyRequests(buddyId);
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
        /// Buddy Alerts
        /// </summary>
        /// <param name="buddyId">buddy id</param>
        /// <returns>buddy alerts</returns>
        [WebMethod]
        public static string GetBuddyAlerts(string buddyId)
        {
            BuddyBLL.Relation r = new BuddyBLL.Relation();
            r.GetBuddyAlerts(buddyId);
            string retVal = new JavaScriptSerializer().Serialize(r);
            return retVal;
        }

        /// <summary>
        /// Feedback Questions
        /// </summary>
        /// <param name="buddyId">buddy Id</param>
        /// <param name="joineeId">joiner Id</param>
        /// <param name="countryId">country id</param>
        /// <param name="reviewType">review type</param>
        /// <returns>feedback question</returns>
        [WebMethod]
        public static string GetFeedbackQuestions(string buddyId, string joineeId, string countryId, string reviewType)
        {
            BuddyBLL.Relation r = new BuddyBLL.Relation();
            r.GetFeedbackQuestions(buddyId, joineeId, countryId, reviewType);
            string retVal = new JavaScriptSerializer().Serialize(r);
            return retVal;
        }

        /// <summary>
        /// All ConnectionsOfUser
        /// </summary>
        /// <param name="associate_Id">associate id</param>
        /// <param name="user_Type">user type</param>
        /// <returns>connection user</returns>
        [WebMethod]
        public static string GetAllConnectionsOfUser(string associate_Id, string user_Type)
        {
            BuddyBLL.User u = new BuddyBLL.User();
            u.GetAllConnectionsOfUser(associate_Id, user_Type);
            string retVal = new JavaScriptSerializer().Serialize(u);
            return retVal;
        }

        /// <summary>
        /// method for Disconnection Request
        /// </summary>
        /// <param name="joineeId">Joiner Id</param>
        /// <param name="buddyId">Buddy Id</param>
        /// <param name="bywhom">By Whom</param>
        /// <param name="requestType">Request Type</param>
        /// <returns>a value</returns>
        [WebMethod]
        public static string DisconnectionRequestByBuddy(string joineeId, string buddyId, string bywhom, string requestType)
        {
            BuddyBLL.Relation r = new BuddyBLL.Relation(); ////397757////
            r.DisconnectionRequest(joineeId, buddyId, bywhom, requestType);
            string retVal = new JavaScriptSerializer().Serialize(r);
            return retVal;
        }

        /// <summary>
        /// Method to Nominate As Buddy
        /// </summary>
        /// <param name="buddyId">Buddy Id</param>
        /// <returns>a value</returns>
        [WebMethod]
        public static string NominateAsBuddy(string buddyId) ////397757:////
        {
            BuddyBLL.User user = new BuddyBLL.User(); ////397757:////
            string retValue = user.NominateAsBuddy(buddyId).ToString();
            return retValue;
        }

        /// <summary>
        /// Show or hide tiles
        /// </summary>
        /// <param name="userId">user Id</param>
        /// <param name="userType">user Type</param>
        /// <returns>result 1 or 2 or 3</returns>
        [WebMethod]
        public static string ShowHideTiles(string userId, string userType)
        {
            BuddyBLL.User associate = new BuddyBLL.User();
            associate.ShowHideTiles(userId, userType);
            string retVal = new JavaScriptSerializer().Serialize(associate);
            return retVal;
        }


        [WebMethod]
        public static string ExportToExcel(string countryId)
        {
            Advisor_View a = new Advisor_View();
            a.Export(countryId);
            return "";
        }

        [WebMethod]
        public void Export(string countryId = "0")
        {
            BuddyBLL.Dashboard d = new BuddyBLL.Dashboard(); ////397757:////
            //string retVal = d.ExportToExcel(countryId).ToString();
           
            DataSet ds1 = d.ExportToExcel(countryId);
            DataSet ds = new DataSet();
            ds.Tables.Add(ds1.Tables[0].Copy());
            ds.Tables.Add(ds1.Tables[1].Copy());
            ds.Tables[0].TableName = "Statistics of Connections";
            ds.Tables[1].TableName = "Connection Details";
            HttpContext.Current.Response.ClearContent();
            //Response.ClearContent();
            ////Give  the excel  output  filename  with .xls extension
            HttpContext.Current.Response.AddHeader("content-disposition", "attachment; filename=BuddyAppConnectionDetails.xls");
            HttpContext.Current.Response.ContentType = "application/excel";
            string excelHeader;
            if (ds1.Tables[1].Rows.Count != 0)
            {
                excelHeader = "<b>Buddy/Joinee Connection Report : </b>";
            }
            else
            {
                excelHeader = "<b>Buddy/Joinee Connection Report : No Connections found</b> ";
            }

            System.IO.StringWriter sw = new System.IO.StringWriter();
            HtmlTextWriter htw = new HtmlTextWriter(sw);

            DataGrid dg = new DataGrid();
            htw.WriteLine("<HTML>");
            htw.WriteLine("<font size='3'> " + excelHeader + " </font>");
            htw.WriteLine("<br></br>");
            htw.WriteLine("<br></br>");

            dg.DataSource = ds.Tables[0];
            dg.DataBind();
            ////rendering  the  gridview  in  html  form
            dg.RenderControl(htw);
            htw.WriteLine("<br></br>");
            htw.WriteLine("<br></br>");
            dg.DataSource = ds.Tables[1];
            dg.DataBind();
            dg.RenderControl(htw);

            htw.WriteLine("<br></br>");
            htw.WriteLine("</HTML>");

            HttpContext.Current.Response.Write(sw.ToString());
            HttpContext.Current.Response.End();


            //return "a";
        }

        /// <summary>
        ///  Handles the Load event of the Page control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">instance containing the event data.</param>
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
                    HttpContext.Current.Session["Designation"] = userDetails.Designation;
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

                    BuddyBLL.AdminConfiguration conf = new AdminConfiguration();
                    conf.GetConnectionDuration(userId);
                    HttpContext.Current.Session["ConnectionDuration"] = conf.BuddyDuration.ToString();
                    HttpContext.Current.Session["CountryId"] = userDetails.CountryId;
                }

                this.CurrentUserId.Value = HttpContext.Current.Session["UserId"].ToString();
                this.DisplayName.Value = HttpContext.Current.Session["DisplayName"].ToString();
                this.Gender.Value = HttpContext.Current.Session["Gender"].ToString();
                this.myImageSrc.Value = HttpContext.Current.Session["UserPhoto"].ToString();
                this.isSupervisor.Value = HttpContext.Current.Session["IsSupervisor"].ToString();
                this.isTM.Value = HttpContext.Current.Session["IsTM"].ToString();
                this.isMasteradmin.Value = HttpContext.Current.Session["IsMasteradmin"].ToString();
                this.ConnectionDuration.Value = HttpContext.Current.Session["ConnectionDuration"].ToString();
                this.Designation.Value = HttpContext.Current.Session["Designation"].ToString();
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
                Response.Redirect("BuddyAppError.aspx?Error=" + erroMsg + " ", false);
            }
        }
    }
}
// ***********************************************************************
// Assembly         : Buddy
// Author           : 320768
// Created          : 09-06-2014
//
// Last Modified By : 320768
// Last Modified On : 09-06-2014
// ***********************************************************************
// <copyright file="NewHire_View.aspx.cs" company="Cognizant Technology Solutions">
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
    /// Class NewHire_View
    /// </summary>
    public partial class NewHire_View : System.Web.UI.Page
    {
        /// <summary>
        /// 397757:variable for User Id
        /// </summary>
        private static string userId;

        /// <summary>
        /// Search Associate
        /// </summary>
        /// <param name="searchText">Search text</param>
        /// <returns>Associate names</returns>
        [WebMethod]
        public static string SearchAssoData(string searchText)
        {
            ////string[] strarr = {"vikul","vivek" };
            BuddyBLL.User user = new BuddyBLL.User();
            user.SearchAssoData(searchText);
            string retVal = new JavaScriptSerializer().Serialize(user.Users);
            return retVal;
        }

        /// <summary>
        /// Search Projects
        /// </summary>
        /// <param name="searchText"> Search text</param>
        /// <returns>Projects name </returns>
        [WebMethod]
        public static string SearchProject(string searchText)
        {
            BuddyBLL.User user = new BuddyBLL.User();
            user.SearchProject(searchText);
            string retVal = new JavaScriptSerializer().Serialize(user.Projname);
            return retVal;
        }

        /// <summary>
        /// Search BU
        /// </summary>
        /// <param name="searchText">Search text</param>
        /// <returns>BU names</returns>
        [WebMethod]
        public static string SearchBU(string searchText)
        {
            BuddyBLL.User user = new BuddyBLL.User();
            user.SearchBU(searchText);
            string retVal = new JavaScriptSerializer().Serialize(user.Projname);
            return retVal;
        }

        /// <summary>
        /// Search Account
        /// </summary>
        /// <param name="searchText">Search text</param>
        /// <returns>Account names</returns>
        [WebMethod]
        public static string SearchAccount(string searchText)
        {
            BuddyBLL.User user = new BuddyBLL.User();
            user.SearchAccount(searchText);
            string retVal = new JavaScriptSerializer().Serialize(user.Projname);
            return retVal;
        }

        /// <summary>
        /// Location or cities
        /// </summary>
        /// <param name="associateId">User Id</param>
        /// <returns>Location names</returns>
        [WebMethod]
        public static string GetLocation(string associateId)
        {
            BuddyBLL.User user = new BuddyBLL.User();
            user.GetLocation(associateId);
            string retVal = new JavaScriptSerializer().Serialize(user);
            return retVal;
        }

        /// <summary>
        /// function for GetAllPossibleAdvisors
        /// </summary>
        /// <param name="joineeId"> Join Id</param>
        /// <param name="buddyId"> Buddy Id</param>
        /// <param name="location">Advisors location</param>
        /// <param name="bussinessUnitId">Advisors BU</param>
        /// <param name="projectId">Advisors Project</param>
        /// <param name="accountId">Advisors Account</param>     
        /// <returns>All Advisors</returns>
        [WebMethod]
        public static string GetAllPossibleAdvisors(string joineeId, string buddyId, string location, string bussinessUnitId, string projectId, string accountId)
        {
            BuddyBLL.User advisors = new BuddyBLL.User();
            advisors.GetAllPossibleAdvisors(joineeId, buddyId, location, bussinessUnitId, projectId, accountId);
            string retVal = new JavaScriptSerializer().Serialize(advisors.AdvisorsInfo);
            return retVal;
        }

        /// <summary>
        /// RaiseSupervisor Request
        /// </summary>
        /// <param name="joineeId"> Join Id</param>
        /// <returns>True or False </returns>
        [WebMethod]
        public static string RaiseSupervisorRequest(string joineeId)
        {
            BuddyBLL.Relation r = new BuddyBLL.Relation();
            return r.RaiseSupervisorRequest(joineeId);
        }

       /// <summary>
        /// Send NotificationMail
       /// </summary>
        /// <param name="supervisorId">supervisor Id</param>
        /// <param name="advisorId">advisor Id</param>
        /// <param name="requestType">request Type</param>
       /// <returns>true or false</returns>
        [WebMethod]
        public static string SendNotificationMail(string supervisorId, string advisorId, string requestType)
        {
            BuddyBLL.User r = new BuddyBLL.User();
            return r.SendNotificationMail(supervisorId, advisorId, requestType);             
        }

        /// <summary>
        /// Is AssociateEligible
        /// </summary>
        /// <param name="buddyId"> Buddy Id </param>
        /// <returns> True or False </returns>
        [WebMethod]
        public static string IsAssociateEligible(string buddyId)
        {
            BuddyBLL.User associate = new BuddyBLL.User();
            associate.IsAssociateEligible(buddyId);
            string retVal = new JavaScriptSerializer().Serialize(associate);
            return retVal;
        }

        /// <summary>
        /// Check ConnectionRequest
        /// </summary>
        /// <param name="joineeId"> Join Id</param>
        /// <param name="buddyId"> Buddy Id </param>
        /// <returns> True or False </returns>
        [WebMethod]
        public static string CheckConnectionRequest(string joineeId, string buddyId)
        {
            BuddyBLL.Relation r = new BuddyBLL.Relation();
            string retVal = r.CheckConnectionRequest(joineeId, buddyId).ToString();
            return retVal;
        }

        /// <summary>
        /// BuddyConnection Request
        /// </summary>
        /// <param name="joineeId"> Join Id </param>
        /// <param name="buddyId"> Buddy Id </param>
        /// <param name="requestType">Request Type</param>
        /// <param name="rejectionComment"> Rejection Comment</param>
        /// <param name="supervisorRecommended"> supervisor Recommended</param>
        /// <returns>Connection Request </returns>
        [WebMethod]
        public static string BuddyConnectionRequest(string joineeId, string buddyId, string requestType, string rejectionComment, string supervisorRecommended)
        {
            BuddyBLL.Relation user = new BuddyBLL.Relation();
            user.BuddyConnectionRequest(joineeId, buddyId, requestType, rejectionComment, supervisorRecommended);
            string retVal = new JavaScriptSerializer().Serialize(user);
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
        public static string DisconnectionRequest(string joineeId, string buddyId, string bywhom, string requestType)
        {
            BuddyBLL.Relation r = new BuddyBLL.Relation(); ////397757////
            r.DisconnectionRequest(joineeId, buddyId, bywhom, requestType);
            string retVal = new JavaScriptSerializer().Serialize(r);
            return retVal;
        }

        /// <summary>
        ///  Get FeedbackQuestions
        /// </summary>
        /// <param name="buddyId">buddy Id</param>
        /// <param name="joineeId">join Id</param>
        /// <param name="countryId">country Id</param>
        /// <param name="reviewType">review Type</param>       
        /// <returns>feedback Questions</returns>
        [WebMethod]
        public static string GetFeedbackQuestions(string buddyId, string joineeId, string countryId, string reviewType)
        {
            BuddyBLL.Relation r = new BuddyBLL.Relation();
            r.GetFeedbackQuestions(buddyId, joineeId, countryId, reviewType);
            string retVal = new JavaScriptSerializer().Serialize(r);
            return retVal;
        }

        /// <summary>
        /// Set FeedbackQuestions
        /// </summary>
        /// <param name="joineeId">join Id</param>
        /// <param name="buddyId">buddy Id</param>
        /// <param name="list"> list as array</param>
        /// <returns> True or false</returns>
        [WebMethod]
        public static string SetFeedbackQuestions(string joineeId, string buddyId, string list)
        {
            BuddyBLL.Relation r = new BuddyBLL.Relation();
            r.SetFeedbackQuestions(joineeId, buddyId, list);
            string retVal = new JavaScriptSerializer().Serialize(r);
            return retVal;
        }

        /// <summary>
        /// View AdvisorsDetails
        /// </summary>
        /// <param name="joineeId">join Id</param>
        /// <param name="type">user type</param>
        /// <returns> connections of user </returns>
        [WebMethod]
        public static string ViewAdvisorsDetails(string joineeId, string type)
        {
            BuddyBLL.User r = new BuddyBLL.User();
            r.GetAllConnectionsOfUser(joineeId, type);
            string retVal = new JavaScriptSerializer().Serialize(r);
            return retVal;
        }

        /// <summary>
        /// Get PageContent
        /// </summary>
        /// <param name="countryId">country Id</param>
        /// <param name="pageName">page name</param>
        /// <param name="role">user role</param>
        /// <returns> page content</returns>
        [WebMethod]
        public static string GetPageContent(string countryId, string pageName, string role)
        {
            BuddyBLL.User user = new BuddyBLL.User();
            user.GetPageContent(countryId, pageName, role);
            string retVal = new JavaScriptSerializer().Serialize(user);
            return retVal;
        }

        /// <summary>
        /// method for Get Enable Status Of Feed Button
        /// </summary>
        /// <param name="joineeID">Joiner ID</param>
        /// <param name="buddyID">Buddy ID</param>
        /// <returns>a value</returns>
        [WebMethod]
        public static string GetEnableStatusOfFeedButton(string joineeID, string buddyID) ////397757////
        {
            BuddyBLL.Relation r = new BuddyBLL.Relation(); ////397757////
            r.GetEnableStatusOfFeedButton(joineeID, buddyID);
            string retVal = new JavaScriptSerializer().Serialize(r);
            return retVal;
        }

        /// <summary>
        /// Show or hide tiles
        /// </summary>
        /// <param name="joineeId">Joiner Id </param>
        /// <param name="userType">user Type</param>
        /// <returns>result 1 or 2 or 3</returns>
        [WebMethod]
        public static string ShowHideTiles(string joineeId, string userType)
        {
            BuddyBLL.User associate = new BuddyBLL.User();
            associate.ShowHideTiles(joineeId, userType);
            string retVal = new JavaScriptSerializer().Serialize(associate);
            return retVal;
        }

        /// <summary>
        /// 397757:Method to Get configuration
        /// </summary> 
        /// <param name="associate_Id">Associate Id</param>
        /// <param name="countryId">Country Id</param>
        /// <returns>for value</returns>
        [WebMethod]
        public static string Getconfiguration(string associate_Id, string countryId) ////397757:////
        {
            BuddyBLL.AdminConfiguration ob = new BuddyBLL.AdminConfiguration();
            ob.GetConfiguration(associate_Id, countryId);
            string retvalue = new JavaScriptSerializer().Serialize(ob);
            return retvalue;
        }

        /// <summary>
        /// Method to Configure Admin
        /// </summary> 
        /// <param name="buddyDuration">Buddy Duration</param>
        /// <param name="requestToRegBuddy">Request To Registered Buddy</param>
        /// <param name="requestAcceptedByRegBuddy">Request Accepted By Registered Buddy</param>
        /// <param name="requestToUnRegBuddy">Request To UnRegister Buddy</param>
        /// <param name="requestAcceptedByUnRegBuddy">Request Accepted By UnRegistered Buddy</param>
        /// <param name="requestsSendByJoinee">Requests Send By Joiner</param>
        /// <param name="connectionsOfJoiners">Connections Of Joiners</param>
        /// <param name="selectCountryId">Select Country Id </param>
        [WebMethod]
        public static void ConfigureAdmin(int buddyDuration, int requestToRegBuddy, int requestAcceptedByRegBuddy, int requestToUnRegBuddy, int requestAcceptedByUnRegBuddy, int requestsSendByJoinee, int connectionsOfJoiners, string selectCountryId) ////397757:////
        {
            string associate_Id;
            BuddyBLL.AdminConfiguration bll = new BuddyBLL.AdminConfiguration();
            associate_Id = Convert.ToString(userId);

            bll.SetConfigDetails(associate_Id, buddyDuration, requestToRegBuddy, requestToUnRegBuddy, requestAcceptedByRegBuddy, requestAcceptedByUnRegBuddy, requestsSendByJoinee, connectionsOfJoiners, selectCountryId);
            if (HttpContext.Current.Session["CountryId"].ToString() == selectCountryId)
            {
                HttpContext.Current.Session["ConnectionDuration"] = buddyDuration;
            }

            return;
        }

        /// <summary>
        /// Method to Get DashBoard Tab Prefill Values
        /// </summary>
        /// <returns>a value</returns>
        [WebMethod]
        public static string GetDashBoardTabPrefillValues()
        {
            BuddyBLL.AdminConfiguration b = new BuddyBLL.AdminConfiguration(); ////397757:////
            b.GetDashBoardTabPrefillValues();
            string retValue = new JavaScriptSerializer().Serialize(b);
            return retValue;
        }

        /// <summary>
        /// Method to Get DashBoard Data
        /// </summary>
        /// <param name="bU">BU name</param>
        /// <param name="chk">check 0 or 1</param>
        /// <param name="countryId">Country Id </param>
        /// <returns>a value</returns>
        [WebMethod]
        public static string GetDashBoardData(string bU, string chk, string countryId) ////397757:////
        {
            BuddyBLL.AdminConfiguration b = new BuddyBLL.AdminConfiguration(); ////397757:////
            b.GetDashBoardData(bU, chk, countryId);
            string retValue = new JavaScriptSerializer().Serialize(b);
            return retValue;
        }

        /// <summary>
        /// Method to Get Dashboard Connections of User
        /// </summary>
        /// <param name="datauserid">Data user id</param>
        /// <param name="chk">to check</param>
        /// <returns>a value</returns>
        [WebMethod]
        public static string GetDashboardConnectionsofUser(string datauserid, string chk) ////397757:////
        {
            BuddyBLL.AdminConfiguration b = new BuddyBLL.AdminConfiguration(); ////397757:////
            b.GetDashboardConnectionsofUser(datauserid, chk);
            string retValue = new JavaScriptSerializer().Serialize(b);
            return retValue;
        }

        /// <summary>
        /// Method to Showing Admin
        /// </summary>
        /// <returns>a value</returns>
        [WebMethod]
        public static string ShowingAdmin()
        {
            BuddyBLL.AdminConfiguration ob = new BuddyBLL.AdminConfiguration();

            string retvalue = new JavaScriptSerializer().Serialize(ob.GetAllAdmins());
            return retvalue;
        }

        /// <summary>
        /// Method to Adding Admin
        /// </summary>
        /// <param name="associate_ID">Associate ID</param>
        [WebMethod]
        public static void AddingAdmin(string associate_ID) ////397757:////
        {
            string actionType = "A"; ////397757:////
            BuddyBLL.AdminConfiguration adminbll = new BuddyBLL.AdminConfiguration(); ////397757:////
            adminbll.AddRemoveAdmin(associate_ID, actionType);
        }

        /// <summary>
        /// Method to Removing Admin
        /// </summary>
        /// <param name="associate_ID">Associate ID</param>
        [WebMethod]
        public static void RemovingAdmin(string associate_ID) ////397757:////
        {
            string actionType = "R"; ////397757:////
            BuddyBLL.AdminConfiguration adminbll = new BuddyBLL.AdminConfiguration(); ////397757:////
            adminbll.AddRemoveAdmin(associate_ID, actionType);
        }

        /// <summary>
        /// Method to Get Recommendable Joiners
        /// </summary>
        /// <param name="supervisorId">Supervisor Id</param>
        /// <returns>a value</returns>
        [WebMethod]
        public static string GetRecommendableJoinees(string supervisorId) ////397757:////
        {
            string retvalue;
            BuddyBLL.User joinees = new BuddyBLL.User(); ////397757:////
            joinees.GetRecommendableJoinees(supervisorId);
            retvalue = new JavaScriptSerializer().Serialize(joinees);
            return retvalue;
        }

        /// <summary>
        /// Method to Get Recommendable Advisors
        /// </summary>
        /// <param name="joineeId">joiner Id</param>
        /// <returns>a value</returns>
        [WebMethod]
        public static string GetRecommendableAdvisors(string joineeId) ////397757:////
        {
            string retvalue;
            BuddyBLL.User joinees = new BuddyBLL.User(); ////397757:////
            joinees.GetRecommendableAdvisors(joineeId);
            retvalue = new JavaScriptSerializer().Serialize(joinees);
            return retvalue;
        }

        /// <summary>
        /// method to Get Unenrolled Buddies
        /// </summary>
        /// <param name="supervisorId">Supervisor Id</param>
        /// <returns>a value</returns>
        [WebMethod]
        public static string GetUnenrolledBuddies(string supervisorId) ////397757:////
        {
            BuddyBLL.User buddies = new BuddyBLL.User(); ////397757:////
            buddies.GetUnenrolledBuddies(supervisorId);
            string retvalue = new JavaScriptSerializer().Serialize(buddies);
            return retvalue;
        }

        /// <summary>
        /// Buddy Alerts
        /// </summary>
       /// <param name="joineeId">joiner alerts</param>
       /// <returns>alerts of joiner</returns>
        [WebMethod]
        public static string GetJoineeAlerts(string joineeId)
        {
            BuddyBLL.Relation r = new BuddyBLL.Relation();
            r.GetJoineeAlerts(joineeId);
            string retVal = new JavaScriptSerializer().Serialize(r.ObjJoineeAlerts);
            return retVal;
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

        /// <summary>
        /// Method to Get Excel Data
        /// </summary>
        /// <param name="sender">for sender</param>
        /// <param name="e">for e</param>
        protected void GetExcelData(object sender, EventArgs e)
        {
            BuddyBLL.Dashboard d = new BuddyBLL.Dashboard();
            ////298015-Country Id passed
            string countryId = this.hiddenCountryId.Value;
            if (countryId == string.Empty || countryId == null)
            {
                countryId = "0";    ////default value for all country selection
            }

            DataSet ds1 = d.ExportToExcel(countryId);
            DataSet ds = new DataSet();
            ds.Tables.Add(ds1.Tables[0].Copy());
            ds.Tables.Add(ds1.Tables[1].Copy());
            ds.Tables[0].TableName = "Statistics of Connections";
            ds.Tables[1].TableName = "Connection Details";
            Response.ClearContent();
            ////Give  the excel  output  filename  with .xls extension
            Response.AddHeader("content-disposition", "attachment; filename=BuddyAppConnectionDetails.xls");
            Response.ContentType = "application/excel";
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

            Response.Write(sw.ToString());
            Response.End();
        }
    }
}
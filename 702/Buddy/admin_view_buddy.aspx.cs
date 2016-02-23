//-----------------------------------------------------------------------
// <copyright file="Admin_view_buddy.aspx.cs" company="Cognizant">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
namespace Buddy
{
    using System;
    using System.Collections.Generic;
    using System.Data;
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
    using CTS.OneC.Platform.CoreServices.FormRedirectionUrl;
    using CTS.OneCognizant.Platform.CoreServices;

    /// <summary>
    /// Admin view buddy
    /// </summary>
    public partial class Admin_view_buddy : System.Web.UI.Page
    {
        /// <summary>
        /// 397757:variable for User Id
        /// </summary>
        private static string userId;

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
            HttpContext.Current.Session["ConnectionDuration"] = buddyDuration;
            return;
        }

        /// <summary>
        /// Method to Get Pie Chart Buddy
        /// </summary>  
        /// <returns>a value</returns>
        [WebMethod]
        public static string GetPieChartBuddy()
        {
            BuddyBLL.AdminConfiguration b = new BuddyBLL.AdminConfiguration(); ////397757:////
            b.GetPieChartBuddy();
            string retValue = new JavaScriptSerializer().Serialize(b);
            return retValue;
        }

        /// <summary>
        /// Method to Get BU Names
        /// </summary> 
        /// <returns>a value</returns>
        [WebMethod]
        public static string GetBUNames()
        {
            BuddyBLL.AdminConfiguration b = new BuddyBLL.AdminConfiguration(); ////397757:////
            ////  BuddyBLL.Dashboard b = new BuddyBLL.Dashboard();
            b.GetBUNames();
            string retValue = new JavaScriptSerializer().Serialize(b.BUNames);
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
        /// Method to Get All Buddies DashBoard
        /// </summary>
        /// <returns>a value</returns>
        [WebMethod]
        public static string GetAllBuddiesDashBoard()
        {
            BuddyBLL.AdminConfiguration b = new BuddyBLL.AdminConfiguration(); ////397757:////
            b.GetAllBuddiesDashBoard();
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
        /// Method to Search NAME
        /// </summary>
        /// <param name="associateID">Associate ID</param>
        /// <returns>a value</returns>
        [WebMethod]
        public static string SearchNAME(string associateID) ////397757:////
        {
            BuddyBLL.AdminConfiguration ob = new BuddyBLL.AdminConfiguration();
            string retvalue = new JavaScriptSerializer().Serialize(ob.SearchNAMES(associateID));
            return retvalue;
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
        /// Method to Get Recommendable Buddies
        /// </summary>
        /// <param name="joineeId">Joiner Id</param>
        /// <returns>a value</returns>
        [WebMethod]
        public static string GetRecommendableBuddies(string joineeId) ////397757:////
        {
            string retvalue;
            BuddyBLL.User buddies = new BuddyBLL.User(); ////397757:////
            buddies.GetAllLikelyBuddies(joineeId, "Recommend", 2);
            retvalue = new JavaScriptSerializer().Serialize(buddies);
            return retvalue;
        }

        /// <summary>
        /// Method to Check Connection Request
        /// </summary>
        /// <param name="joineeId">Joiner Id</param>
        /// <param name="buddyId">Buddy Id</param>
        /// <returns>a value</returns>
        [WebMethod]
        public static string CheckConnectionRequest(string joineeId, string buddyId) ////397757:////
        {
            BuddyBLL.Relation r = new BuddyBLL.Relation(); ////397757:////
            string retVal = r.CheckConnectionRequest(joineeId, buddyId).ToString();
            return retVal;
        }

        /// <summary>
        /// Method to Buddy Connection Request
        /// </summary>
        /// <param name="joineeId">Joiner Id</param>
        /// <param name="buddyId">Buddy Id</param>
        /// <param name="requestType">Request Type</param>
        /// <param name="rejectionComment">Rejection Comment</param>
        /// <param name="supervisorRecommended">supervisor Recommended</param>
        /// <returns>a value</returns>
        [WebMethod]
        public static string BuddyConnectionRequest(string joineeId, string buddyId, string requestType, string rejectionComment, string supervisorRecommended) ////397757:////
        {
            BuddyBLL.Relation r = new BuddyBLL.Relation(); ////397757:////
            r.BuddyConnectionRequest(joineeId, buddyId, requestType, rejectionComment, supervisorRecommended);
            string retVal = new JavaScriptSerializer().Serialize(r);
            return retVal;
        }

        /// <summary>
        /// Method to Get Unenrolled Buddies
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
        /// Method to Retract As Buddy
        /// </summary>
        /// <param name="buddyId">Buddy Id</param>
        /// <returns>a value</returns>
        [WebMethod]
        public static string RetractAsBuddy(string buddyId) ////397757:////
        {
            BuddyBLL.User user = new BuddyBLL.User(); ////397757:////
            string retValue = user.RetractAsBuddy(buddyId).ToString();
            return retValue;
        }

        /// <summary>
        /// Method to Get Contact Card
        /// </summary>
        /// <param name="userId">User Id</param>
        /// <returns>a value</returns>
        [WebMethod]
        public static string GetContactCard(string userId) ////397757:////
        {
            BuddyBLL.User u = new BuddyBLL.User(); ////397757:////
            u.GetUserContactCard(userId);
            string retVal = new JavaScriptSerializer().Serialize(u);
            return retVal;
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
        /// Method to Admin view buddy
        /// </summary>
        /// <param name="sender">for sender</param>
        /// <param name="e">for e</param>
        protected void Page_Load(object sender, EventArgs e)
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

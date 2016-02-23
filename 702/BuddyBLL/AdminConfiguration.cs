// -----------------------------------------------------------------------
// <copyright file="AdminConfiguration.cs" company="Cognizant Technology Pvt Ltd">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

/// <summary>
/// The BuddyBLL namespace.
/// </summary>
namespace BuddyBLL
{
    using System;
    using System.Collections.Generic;
    using System.Configuration;
    using System.Data;
    using System.Data.SqlClient;
    using System.Diagnostics;
    using System.IO;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Text;
    using System.Web;
    using BuddyBLL.ExceptionLoggingService;
    using BuddyBLL.UserProfileService;
    using BuddyDAL; 
    using CTS.OneC.PlatForm.CoreServices;
    using CTS.OneCognizant.Platform.CoreServices;
  
    /// <summary>
    /// Class for admin configuration details
    /// </summary>
    [DataContract]
    public class AdminConfiguration
    {
        /// <summary>
        /// The country list
        /// </summary>
        [DataMember]
        private CountryDetail[] countryList = null;
     
        /// <summary>
        /// Gets or sets bu names
        /// </summary>
        [DataMember]
        private BU[] bunames = null;
   
        /// <summary>
        /// The dashboard data
        /// </summary>
        [DataMember]
        private GetDashBoard[] dashboarddata = null;
      
        /// <summary>
        /// Initializes a new instance of the <see cref="AdminConfiguration"/> class.
        /// </summary>      
        public AdminConfiguration()
        {
        }
   
        /// <summary>
        /// Gets or sets country list
        /// </summary>
        [DataMember]
        public CountryDetail[] CountryList
        {
            get { return this.countryList; }
            set { this.countryList = value; }
        }

        /// <summary>
        /// Gets or sets bu names
        /// </summary>
        [DataMember]
        public BU[] BUNames
        {
            get { return this.bunames; }
            set { this.bunames = value; }
        }

        /// <summary>
        /// Gets or sets dashboard data
        /// </summary>
        [DataMember]
        public GetDashBoard[] DashBoardData
        {
            get { return this.dashboarddata; }
            set { this.dashboarddata = value; }
        }

        /// <summary>
        /// Gets or sets the duration of the buddy.
        /// </summary>
        /// <value>The duration of the buddy.</value>
        [DataMember]
        public int BuddyDuration { get; set; }

        /// <summary>
        /// Gets or sets the request count to registered buddy.
        /// </summary>
        /// <value>The request count to registered buddy.</value>
        [DataMember]
        public int RequestCountToRegBuddy { get; set; }

        /// <summary>
        /// Gets or sets the request count to un registered buddy.
        /// </summary>
        /// <value>The request count to un registered buddy.</value>
        [DataMember]
        public int RequestCountToUnRegBuddy { get; set; }

        /// <summary>
        /// Gets or sets the acceptance count of registered buddy.
        /// </summary>
        /// <value>The acceptance count of registered buddy.</value>
        [DataMember]
        public int AcceptanceCountOfRegBuddy { get; set; }

        /// <summary>
        /// Gets or sets the acceptance count of un registered buddy.
        /// </summary>
        /// <value>The acceptance count of un registered buddy.</value>
        [DataMember]
        public int AcceptanceCountOfUnRegBuddy { get; set; }

        /// <summary>
        /// Gets or sets the requests send by joiner.
        /// </summary>
        /// <value>The requests send by joiner.</value>
        [DataMember]
        public int RequestsSendByJoinee { get; set; }

        /// <summary>
        /// Gets or sets the connections of joiners.
        /// </summary>
        /// <value>The connections of joiners.</value>
        [DataMember]
        public int ConnectionsOfJoiners { get; set; }

        /// <summary>
        /// Gets or sets the connections of joiners.
        /// </summary>
        /// <value>The connections of joiners.</value>
        [DataMember]
        public string CountryName { get; set; }

        /// <summary>
        /// Gets or sets the buddy joiner connections.
        /// </summary>
        /// <value>The buddy joiner connections.</value>
        [DataMember]
        public int BuddyJoineeConnections { get; set; }

        /// <summary>
        /// Gets or sets the no of application users.
        /// </summary>
        /// <value>The no of application users.</value>
        [DataMember]
        public int NoofAppusers { get; set; }

        /// <summary>
        /// Gets or sets the name of the search.
        /// </summary>
        /// <value>The name of the search.</value>
        [DataMember]
        public string[] SearchNAME { get; set; }

        /// <summary>
        /// Gets or sets the connected_buddies.
        /// </summary>
        /// <value>The connected_buddies.</value>
        [DataMember]
        public int Connected_buddies { get; set; }

        /// <summary>
        /// Gets or sets Count of Connected_buddies
        /// </summary>
        /// <value>The non connected_buddies.</value>
        [DataMember]
        public int NonConnected_buddies { get; set; }

        /// <summary>
        /// Gets or sets count of NonConnected_buddies
        /// </summary>
        /// <value>The total_ buddies.</value>
        [DataMember]
        public int Total_Buddies { get; set; }

        #region GetAllAdmins
        /// <summary>
        /// Method to get all admins
        /// </summary>
        /// <returns> User details</returns>
        public User[] GetAllAdmins()
        {
            User[] usr = null;
            DataTable dt = new DataTable();
            try
            {
                DALTransaction d = new DALTransaction();
                dt = d.ShowAdmin();
                usr = new User[dt.Rows.Count];

                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    usr[i] = new User();
                    usr[i].UserId = dt.Rows[i]["Associate_ID"].ToString();
                    //// User usrdetail = new User(usr[i].UserId);
                    usr[i].UserName = dt.Rows[i]["Associate_Name"].ToString();
                    usr[i].Designation = dt.Rows[i]["Designation"].ToString();
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
                        ////obj.EmployeeID = System.Security.Principal.WindowsIdentity.GetCurrent().Name;
                        ////obj.EmployeeID = UserID;
                        obj.GlobalAppId = 702;
                        obj.MachineName = Environment.MachineName;
                        logclient.LogException(obj);
                    }
                }
                catch (Exception)
                {
                    throw;
                }

                throw;
            }

            return usr;
        }

        #endregion

        #region AddRemoveAsAdmin
        /// <summary>
        /// Method to add or remove user to admin panel
        /// </summary>
        /// <param name="associate_Id">The associate_ identifier.</param>
        /// <param name="actionType">Type of the action.</param>
        public void AddRemoveAdmin(string associate_Id, string actionType)
        {
            string userID = null;
            int adminType = 0;
            try
            {
                DALTransaction dal = new DALTransaction();
                if (actionType == "A")
                {
                    int dt = dal.AddRemoveAdmin(actionType, associate_Id, adminType);
                }
                else if (actionType == "R")
                {
                    dal.AddRemoveAdmin(actionType, associate_Id, adminType);
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
                        ////obj.EmployeeID = System.Security.Principal.WindowsIdentity.GetCurrent().Name;
                        obj.EmployeeID = userID;
                        obj.GlobalAppId = 702;
                        obj.MachineName = Environment.MachineName;
                        logclient.LogException(obj);
                    }
                }
                catch (Exception)
                {
                    throw;
                }

                throw;
            }
        }
        #endregion

        /// <summary>
        /// Method to get configuration details
        /// </summary>
        /// <param name="userID">The user identifier.</param>
        /// <param name="countryId">The country identifier.</param>
        #region GetConfiguration
        public void GetConfiguration(string userID, string countryId)
        {
            try
            {
                DALTransaction dal = new DALTransaction();
                DataSet dt = dal.GetConfiguration(countryId);
                this.CountryList = new CountryDetail[dt.Tables[1].Rows.Count];

                if (dt.Tables[0].Rows.Count != 0)
                {
                    this.BuddyDuration = Convert.ToInt32(dt.Tables[0].Rows[0]["tinyint_BuddyDuration"]);
                    this.RequestCountToRegBuddy = Convert.ToInt32(dt.Tables[0].Rows[0]["tinyint_NoOfRequestSentToReg"]);
                    this.RequestCountToUnRegBuddy = Convert.ToInt32(dt.Tables[0].Rows[0]["tinyint_NoOfRequestSentToUnReg"]);
                    this.AcceptanceCountOfRegBuddy = Convert.ToInt32(dt.Tables[0].Rows[0]["tinyint_NoOfRequestAcceptByReg"]);
                    this.AcceptanceCountOfUnRegBuddy = Convert.ToInt32(dt.Tables[0].Rows[0]["tinyint_NoOfRequestAcceptByUnReg"]);
                    this.BuddyJoineeConnections = Convert.ToInt32(dt.Tables[0].Rows[0]["NoofBuddyNewjoineeConnected"]);
                    this.NoofAppusers = Convert.ToInt32(dt.Tables[0].Rows[0]["NoofAppUsers"]);
                    this.RequestsSendByJoinee = Convert.ToInt32(dt.Tables[0].Rows[0]["tinyint_NoOfRequestSentByJoinee"]);
                    this.ConnectionsOfJoiners = Convert.ToInt32(dt.Tables[0].Rows[0]["tinyint_NoOfJoineeConnections"]);
                    this.CountryName = dt.Tables[0].Rows[0]["CountryName"].ToString();
                }
                else
                {
                    this.BuddyDuration = 0;
                    this.RequestCountToRegBuddy = 0;
                    this.RequestCountToUnRegBuddy = 0;
                    this.AcceptanceCountOfRegBuddy = 0;
                    this.AcceptanceCountOfUnRegBuddy = 0;
                    this.BuddyJoineeConnections = 0;
                    this.NoofAppusers = 0;
                    this.RequestsSendByJoinee = 0;
                    this.ConnectionsOfJoiners = 0;
                }

                for (int i = 0; i < dt.Tables[1].Rows.Count; i++)
                {
                    this.CountryList[i] = new CountryDetail();
                    this.CountryList[i].CountryId = dt.Tables[1].Rows[i]["CountryId"].ToString();
                    this.CountryList[i].CountryDesc = dt.Tables[1].Rows[i]["CountryDesc"].ToString();
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
                        ////obj.EmployeeID = System.Security.Principal.WindowsIdentity.GetCurrent().Name;
                        obj.EmployeeID = userID;
                        obj.GlobalAppId = 702;
                        obj.MachineName = Environment.MachineName;
                        logclient.LogException(obj);
                    }
                }
                catch
                {
                    throw;
                }

                throw;
            }
        }
        #endregion

        /// <summary>
        /// Method to update configuration details
        /// </summary>
        /// <param name="userID">The user identifier.</param>
        /// <param name="buddyDuration">Duration of the buddy.</param>
        /// <param name="requestToRegBuddy">The request to registered buddy.</param>
        /// <param name="requestToUnRegBuddy">The request to un registered buddy.</param>
        /// <param name="requestAcceptedByRegBuddy">The request accepted by registered buddy.</param>
        /// <param name="requestAcceptedByUnRegBuddy">The request accepted by un registered buddy.</param>
        /// <param name="requestsSendByJoinee">The requests send by joiner.</param>
        /// <param name="connectionsOfJoiners">The connections of joiners.</param>
        /// <param name="countryId">The country identifier.</param>
        #region SetConfigDetails
        public void SetConfigDetails(string userID, int buddyDuration, int requestToRegBuddy, int requestToUnRegBuddy, int requestAcceptedByRegBuddy, int requestAcceptedByUnRegBuddy, int requestsSendByJoinee, int connectionsOfJoiners, string countryId)
        {
            try
            {
                DALTransaction d = new DALTransaction();
                d.SetConfiguration(buddyDuration, requestToRegBuddy, requestToUnRegBuddy, requestAcceptedByRegBuddy, requestAcceptedByUnRegBuddy, requestsSendByJoinee, connectionsOfJoiners, countryId);
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
                        ////obj.EmployeeID = System.Security.Principal.WindowsIdentity.GetCurrent().Name;
                        obj.EmployeeID = userID;
                        obj.GlobalAppId = 702;
                        obj.MachineName = Environment.MachineName;
                        logclient.LogException(obj);
                    }
                }
                catch (Exception)
                {
                    throw;
                }

                throw;
            }
        }
        #endregion

        /// <summary>
        /// Methods Get BUNames of buddy,Get PieChart of New Joiner/Get PieChart of Buddy,Get AllBuddies of DashBoard combined to one along with country names
        /// </summary>
        #region GetDashBoardTabPrefillValues
        public void GetDashBoardTabPrefillValues()
        {
            DALTransaction d = new DALTransaction();
            DataSet ds = d.GetDashBoardTabPrefillValues();

            int bucount = ds.Tables[0].Rows.Count;
            int countryCount = ds.Tables[1].Rows.Count;
            int dashboardBuddyCount = ds.Tables[2].Rows.Count;

            this.BUNames = new BU[bucount];
            this.CountryList = new CountryDetail[countryCount];
            this.DashBoardData = new GetDashBoard[dashboardBuddyCount];

            for (int i = 0; i < bucount; i++)
            {
                this.BUNames[i] = new BU();
                this.BUNames[i].DeptId = ds.Tables[0].Rows[i]["varchar_BUId"].ToString();
                this.BUNames[i].DeptDesc = ds.Tables[0].Rows[i]["varchar_BUDesc"].ToString();
            }

            for (int i = 0; i < countryCount; i++)
            {
                this.CountryList[i] = new CountryDetail();
                this.CountryList[i].CountryId = ds.Tables[1].Rows[i]["CountryId"].ToString();
                this.CountryList[i].CountryDesc = ds.Tables[1].Rows[i]["CountryDesc"].ToString();
            }

            for (int i = 0; i < dashboardBuddyCount; i++)
            {
                this.DashBoardData[i] = new GetDashBoard();
                this.DashBoardData[i].BuddyId = ds.Tables[2].Rows[i]["Asso_id"].ToString();
                this.DashBoardData[i].BuddyName = ds.Tables[2].Rows[i]["Asso_Name"].ToString();
                this.DashBoardData[i].Designation = ds.Tables[2].Rows[i]["Designation"].ToString();
                this.DashBoardData[i].Connection = ds.Tables[2].Rows[i]["ActiveConn"].ToString();
                this.DashBoardData[i].AvgFeedback = ds.Tables[2].Rows[i]["AverageFeedback"].ToString();
            }

            this.Connected_buddies = Convert.ToInt32(ds.Tables[3].Rows[0]["Connected_buddies"].ToString());
            this.NonConnected_buddies = Convert.ToInt32(ds.Tables[3].Rows[0]["NonConnected_buddies"].ToString());
            this.Total_Buddies = Convert.ToInt32(ds.Tables[3].Rows[0]["Total_Buddies"].ToString());

            return;
        }
        #endregion

        #region BUNames
        /// <summary>
        /// Gets the bu names.
        /// </summary>
        public void GetBUNames()
        {
            try
            {
                DALTransaction d = new DALTransaction();
                DataTable dt = d.GetBUNames();
                this.BUNames = new BU[dt.Rows.Count];
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    this.BUNames[i] = new BU();
                    this.BUNames[i].DeptDesc = dt.Rows[i]["varchar_BUDesc"].ToString();
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
                        ////obj.EmployeeID = System.Security.Principal.WindowsIdentity.GetCurrent().Name;
                        ////obj.EmployeeID = UserID;
                        obj.GlobalAppId = 702;
                        obj.MachineName = Environment.MachineName;
                        logclient.LogException(obj);
                    }
                }
                catch (Exception)
                {
                    throw;
                }

                throw;
            }
        }
        #endregion

        #region GetPieChartBuddy
        /// <summary>
        /// Gets the pie chart buddy.
        /// </summary>
        public void GetPieChartBuddy()
        {
            DataTable dt = new DataTable();
            DALTransaction dal = new DALTransaction();
            dt = dal.GetPieChartBuddy();
            this.Connected_buddies = Convert.ToInt32(dt.Rows[0]["Connected_buddies"].ToString());
            this.NonConnected_buddies = Convert.ToInt32(dt.Rows[0]["NonConnected_buddies"].ToString());
            this.Total_Buddies = Convert.ToInt32(dt.Rows[0]["Total_Buddies"].ToString());
        }
        #endregion

        #region GetPieChartNJ
        /// <summary>
        /// Gets the pie chart new joiner.
        /// </summary>
        public void GetPieChartNJ()
        {
            DataTable dt = new DataTable();
            DALTransaction dal = new DALTransaction();
            dt = dal.GetPieChartNJ();
            this.Connected_buddies = Convert.ToInt32(dt.Rows[0]["Connected_buddies"].ToString());
            this.NonConnected_buddies = Convert.ToInt32(dt.Rows[0]["NonConnected_buddies"].ToString());
            this.Total_Buddies = Convert.ToInt32(dt.Rows[0]["Total_Buddies"].ToString());
        }
        #endregion

        #region GetDashBoardData
        /// <summary>
        /// Gets the dash board data.
        /// </summary>
        /// <param name="bU">The b u.</param>
        /// <param name="chk">The CHK.</param>
        /// <param name="countryId">The country identifier.</param>
        public void GetDashBoardData(string bU, string chk, string countryId)
        {
            DALTransaction d = new DALTransaction();
            DataSet ds = d.GetDashBoardData(bU, chk, countryId);
            DataTable dt = ds.Tables[0];
            DataTable dt2 = ds.Tables[1];

            this.DashBoardData = new GetDashBoard[dt.Rows.Count];

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                this.DashBoardData[i] = new GetDashBoard();
                this.DashBoardData[i].BuddyId = dt.Rows[i]["Asso_id"].ToString();
                this.DashBoardData[i].BuddyName = dt.Rows[i]["Asso_Name"].ToString();
                this.DashBoardData[i].Designation = dt.Rows[i]["Designation"].ToString();
                this.DashBoardData[i].Connection = dt.Rows[i]["ActiveConn"].ToString();
                if (chk == "true")
                {
                    this.DashBoardData[i].AvgFeedback = dt.Rows[i]["AverageFeedback"].ToString();
                }
            }

            ////29815- piechart data 
            this.Connected_buddies = Convert.ToInt32(dt2.Rows[0]["Connected_buddies"].ToString());
            this.NonConnected_buddies = Convert.ToInt32(dt2.Rows[0]["NonConnected_buddies"].ToString());
            this.Total_Buddies = Convert.ToInt32(dt2.Rows[0]["Total_Buddies"].ToString());
        }
        #endregion

        #region GetAllBuddiesDashBoard
        /// <summary>
        /// Gets all buddies dash board.
        /// </summary>
        public void GetAllBuddiesDashBoard()
        {
            DALTransaction d = new DALTransaction();
            DataTable dt = d.GetAllBuddiesDashBoard(); ////pass BU and Buddy/NJ

            DataTable dtresult = new DataTable();

            this.DashBoardData = new GetDashBoard[dt.Rows.Count];

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                this.DashBoardData[i] = new GetDashBoard();
                this.DashBoardData[i].BuddyId = dt.Rows[i]["Asso_id"].ToString();
                this.DashBoardData[i].BuddyName = dt.Rows[i]["Asso_Name"].ToString();
                this.DashBoardData[i].Designation = dt.Rows[i]["Designation"].ToString();
                this.DashBoardData[i].Connection = dt.Rows[i]["ActiveConn"].ToString();
                this.DashBoardData[i].AvgFeedback = dt.Rows[i]["AverageFeedback"].ToString();
            }
        }

        #endregion

        #region GetDashboardConnectionsofUser
        /// <summary>
        /// Gets the dashboard connections of user.
        /// </summary>
        /// <param name="datauserid">The data user identification.</param>
        /// <param name="chk">The CHK.</param>
        public void GetDashboardConnectionsofUser(string datauserid, string chk)
        {
            DALTransaction d = new DALTransaction();
            DataTable dt = d.GetDashboardConnectionsofUser(datauserid, chk); ////pass BU and Buddy/NJ

            this.DashBoardData = new GetDashBoard[dt.Rows.Count];

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                this.DashBoardData[i] = new GetDashBoard();
                this.DashBoardData[i].BuddyId = dt.Rows[i]["Asso_id"].ToString();
                this.DashBoardData[i].BuddyName = dt.Rows[i]["Asso_Name"].ToString();
                this.DashBoardData[i].Designation = dt.Rows[i]["Designation"].ToString();
                this.DashBoardData[i].Connection = dt.Rows[i]["ConnectedDate"].ToString();
                this.DashBoardData[i].ConnectionStartDate = dt.Rows[i]["ConnectionStartDate"].ToString();
                this.DashBoardData[i].ConnectionEndDate = dt.Rows[i]["ConnectionEndDate"].ToString();
            }
        }

        #endregion

        #region SearchIntellisense
        /// <summary>
        /// Method to retrieve names
        /// </summary>
        /// <param name="associateID">The associate identifier.</param>
        /// <returns> User details</returns>
        public User SearchNAMES(string associateID)
        {
            User usr = null;
            try
            {
                DataTable dt = new DataTable();
                DALTransaction d = new DALTransaction();

                dt = d.SearchNAME(associateID);
                if (dt.Rows.Count != 0)
                {
                    usr = new User();
                    usr.UserId = dt.Rows[0][0].ToString();
                    usr.UserName = dt.Rows[0]["Associate_Name"].ToString();
                }
                else
                {
                    usr = new User();
                    usr.UserId = associateID;
                    usr.UserName = null;
                }
            }
            catch
            {
            }

            return usr;
        }
        #endregion

        #region GetConnectionDuration
        /// <summary>
        /// Gets the duration of the connection.
        /// </summary>
        /// <param name="associate_Id">The associate_ identifier.</param>
        public void GetConnectionDuration(string associate_Id)
        {
            DALTransaction dal = new DALTransaction();
            DataTable dt = dal.GetConnectionDuration();
            try
            {
                this.BuddyDuration = Convert.ToInt16(dt.Rows[0]["ConnectionDuration"].ToString());
                this.AcceptanceCountOfRegBuddy = Convert.ToInt16(dt.Rows[0]["RegBuddyConnections"].ToString());
                this.AcceptanceCountOfUnRegBuddy = Convert.ToInt16(dt.Rows[0]["UnregBuddyConnections"].ToString());
                this.ConnectionsOfJoiners = Convert.ToInt16(dt.Rows[0]["JoineeConnections"].ToString());
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
                        ////obj.EmployeeID = System.Security.Principal.WindowsIdentity.GetCurrent().Name;
                        obj.EmployeeID = associate_Id;
                        obj.GlobalAppId = 702;
                        obj.MachineName = Environment.MachineName;
                        logclient.LogException(obj);
                    }
                }
                catch
                {
                    throw;
                }

                throw;
            }
        }
        #endregion       
     
        /// <summary>
        /// Class BU.
        /// </summary>
        public class BU
        {
            /// <summary>
            /// Gets or sets the department identifier.
            /// </summary>
            /// <value>The department identifier.</value>
            [DataMember]
            public string DeptId { get; set; }

            /// <summary>
            /// Gets or sets the department description.
            /// </summary>
            /// <value>The department description.</value> 
            [DataMember]
            public string DeptDesc { get; set; }

            ////[DataMember]
            ////public string BuddyID { get; set; }
            ////[DataMember]
            ////public string AssociateName { get; set; }

            ////[DataMember]
            ////public string connections { get; set; }
        }

        /// <summary>
        /// Class GetDashBoard.
        /// </summary>
        public class GetDashBoard
        {
            /// <summary>
            /// Gets or sets the buddy identifier.
            /// </summary>
            /// <value>The buddy identifier.</value>
            [DataMember]
            public string BuddyId { get; set; }

            /// <summary>
            /// Gets or sets the name of the buddy.
            /// </summary>
            /// <value>The name of the buddy.</value>
            [DataMember]
            public string BuddyName { get; set; }

            /// <summary>
            /// Gets or sets the designation.
            /// </summary>
            /// <value>The designation.</value>
            [DataMember]
            public string Designation { get; set; }

            /// <summary>
            /// Gets or sets the connection.
            /// </summary>
            /// <value>The connection.</value>
            [DataMember]
            public string Connection { get; set; }

            /// <summary>
            /// Gets or sets the average feedback.
            /// </summary>
            /// <value>The average feedback.</value>
            [DataMember]
            public string AvgFeedback { get; set; }

            /// <summary>
            /// Gets or sets the base64 image.
            /// </summary>
            /// <value>The base64 image.</value>
            [DataMember]
            public string Base64img { get; set; }

            /// <summary>
            /// Gets or sets the connection start date.
            /// </summary>
            /// <value>The connection start date.</value>
            [DataMember]
            public string ConnectionStartDate { get; set; }

            /// <summary>
            /// Gets or sets the connection end date.
            /// </summary>
            /// <value>The connection end date.</value>
            [DataMember]
            public string ConnectionEndDate { get; set; }
        }   

        /// <summary>
        /// Gets or sets Count of Total_Buddies
        /// </summary>
        public class CountryDetail
        {
            /// <summary>
            /// Gets or sets the country identifier.
            /// </summary>
            /// <value>The country identifier.</value>
            public string CountryId { get; set; }

            /// <summary>
            /// Gets or sets the country description.
            /// </summary>
            /// <value>The country description.</value>       
            public string CountryDesc { get; set; }
        }   
   }
}

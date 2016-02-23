// -----------------------------------------------------------------------
// <copyright file="User.cs" company="Cognizant Technology Pvt Ltd">
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
    using System.Data;
    using System.Data.SqlClient;
    using System.Diagnostics;
    using System.Diagnostics.CodeAnalysis;
    using System.Drawing;
    using System.Drawing.Imaging;
    using System.IO;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Text;
    using System.Web;
    using System.Windows.Forms;
    using BuddyBLL;
    using BuddyBLL.ExceptionLoggingService;
    using BuddyBLL.ServiceReferenceForMail;
    using BuddyBLL.UserProfileService;
    using BuddyDAL;
    using CTS.OneCognizant.Platform.CoreServices;    

    /// <summary>
    /// Class for storing general details of logged-in user
    /// </summary>
    [DataContract]
    public class User
    {
        /// <summary>
        /// Initializes a new instance of the Page Content Details
        /// </summary>
        private PageContent[] pageContentDetails = null;

        /// <summary>
        /// Initializes a new instance of the Buddy List
        /// </summary>
        private User[] buddyList = null;

        /// <summary>
        /// Initializes a new instance of the Joiner List
        /// </summary>
        private User[] joineeList = null;

        /// <summary>
        /// Initializes a new instance of the Event Result
        /// </summary>
        private User[] eventResult = new User[0];

        /// <summary>
        /// Initializes a new instance of the My Connections
        /// </summary>
        private Relation[] myConnections = null;

        /// <summary>
        /// Initializes a new instance of the object Feedback History
        /// </summary>
        private Relation[] objFeedbackHistory = new Relation[0];

        /// <summary>
        /// Initializes a new instance of the Users
        /// </summary>
        private UserInfo[] users = null;

        /// <summary>
        /// Initializes a new instance of the GetAdvisors
        /// </summary>
        private GetAdvisors[] advisorsInfo = null;

        /// <summary>
        /// Initializes a new instance of the Project Name
        /// </summary>
        private ProjectName[] projname = null;

        /// <summary>
        /// Initializes a new instance of the Location
        /// </summary>
        private Location[] city = null;

        /// <summary>
        /// Initializes a new instance of the Location
        /// </summary>
        private ShowHideTiles[] tiles = null;

        /// <summary>
        ///  Initializes a new instance of the<see cref="User"/> class.
        /// </summary>
        public User()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="User"/> class.
        /// </summary>
        /// <param name="associate_Id">Associate Id</param>
        public User(string associate_Id)
        {
            ////BuddyBLL.UserProfileService.UserProfileClient objUserProfileClient = new UserProfileService.UserProfileClient("BasicHttpBinding_IUserProfile");

            BuddyBLL.UserProfileService.UserProfileClient objUserProfileClient;
            try
            {
                objUserProfileClient = new BuddyBLL.UserProfileService.UserProfileClient("NetTcpBinding_IUserProfile");
            }
            catch
            {
                objUserProfileClient = new BuddyBLL.UserProfileService.UserProfileClient("BasicHttpBinding_IUserProfile");
            }

            DataSet ds = new DataSet();
            DataSet dsassBasicInfo = new DataSet();
            DALTransaction d = new DALTransaction();
            ds = objUserProfileClient.GetAssociateDataByAssociateID(associate_Id, "702", EnumclassViewType.DetailedView);
            dsassBasicInfo = d.GetAssociateData(associate_Id);
            if (ds.Tables[0].Rows.Count == 0)
            {
                ds = dsassBasicInfo;
            }

            this.UserId = associate_Id;
            if (dsassBasicInfo.Tables[0].Rows.Count != 0)
            {
                this.Gender = dsassBasicInfo.Tables[0].Rows[0]["Gender"].ToString();
                this.Onsite_Offshore = dsassBasicInfo.Tables[0].Rows[0]["Onsite_Offshore"].ToString();
            }
            else
            {
                this.Gender = "M";
                this.Onsite_Offshore = "OF";
            }

            this.UserName = ds.Tables[0].Rows[0]["Associate_FirstName"].ToString() + " " + ds.Tables[0].Rows[0]["Associate_LastName"].ToString();
            this.DisplayName = ds.Tables[0].Rows[0]["Associate_FirstName"].ToString();
            if (ds.Tables[0].Rows[0]["UserPhoto"] != DBNull.Value)
            {
                this.Base64img = System.Convert.ToBase64String((byte[])ds.Tables[0].Rows[0]["UserPhoto"], 0, ((byte[])ds.Tables[0].Rows[0]["UserPhoto"]).Length);
            }
            else
            {
                this.Base64img = null;
            }

            this.Department = ds.Tables[0].Rows[0]["Dept_Desc"].ToString();
            this.Designation = ds.Tables[0].Rows[0]["JobCodeDescription"].ToString();
            this.VNET = ds.Tables[0].Rows[0]["VNET"].ToString();
        }

        /// <summary>
        /// Gets or sets count of city
        /// </summary>
        public Location[] City
        {
            get { return this.city; }
            set { this.city = value; }
        }

        /// <summary>
        /// Gets or sets PageContent details
        /// </summary>
        public PageContent[] PageContentDetails
        {
            get { return this.pageContentDetails; }
            set { this.pageContentDetails = value; }
        }

        /// <summary>
        /// Gets or sets buddy List
        /// </summary>
        public User[] BuddyList
        {
            get { return this.buddyList; }
            set { this.buddyList = value; }
        }

        /// <summary>
        /// Gets or sets joiner List
        /// </summary>
        public User[] JoineeList
        {
            get { return this.joineeList; }
            set { this.joineeList = value; }
        }

        /// <summary>
        /// Gets or sets event Result
        /// </summary>
        public User[] EventResult
        {
            get { return this.eventResult; }
            set { this.eventResult = value; }
        }      

        /// <summary>
        /// Gets or sets my Connections
        /// </summary>
        public Relation[] MyConnections
        {
            get { return this.myConnections; }
            set { this.myConnections = value; }
        }

        /// <summary>
        /// Gets or sets object Feedback History
        /// </summary>
        public Relation[] ObjFeedbackHistory
        {
            get { return this.objFeedbackHistory; }
            set { this.objFeedbackHistory = value; }
        }

        /// <summary>
        /// Gets or sets count of users
        /// </summary>
        public UserInfo[] Users
        {
            get { return this.users; }
            set { this.users = value; }
        }      

        /// <summary>
        /// Gets or sets project name
        /// </summary>
        public ProjectName[] Projname
        { 
          get { return this.projname; }
            set { this.projname = value; }
        }

        /// <summary>
        /// Gets or sets Tiles
        /// </summary>
        public ShowHideTiles[] Tiles
        {
            get { return this.tiles; }
            set { this.tiles = value; }
        }  

        /// <summary>
        /// Gets or sets advisors Information
        /// </summary>
        public GetAdvisors[] AdvisorsInfo 
        {
           get { return this.advisorsInfo; }
           set { this.advisorsInfo = value; }
        }       

        /// <summary>
        /// Gets or sets count of  User Id
        /// </summary>
        [DataMember]
        public string UserId { get; set; }

        /// <summary>
        /// Gets or sets count of User Name 
        /// </summary>
        [DataMember]
        public string UserName { get; set; }

        /// <summary>
        /// Gets or sets count of User FirstName
        /// </summary>
        [DataMember]
        public string UserFirstName { get; set; }

        /// <summary>
        /// Gets or sets count of Display Name
        /// </summary>
        [DataMember]
        public string DisplayName { get; set; }

        /// <summary>
        /// Gets or sets count of Designation
        /// </summary>
        [DataMember]
        public string Designation { get; set; }

        /// <summary>
        /// Gets or sets count of Supervisor ID
        /// </summary>
        [DataMember]
        public string SupervisorID { get; set; }

        /// <summary>
        /// Gets or sets count of Days Total
        /// </summary>
        [DataMember]
        public string DaysTotal { get; set; }

        /// <summary>
        /// Gets or sets count of Connected To Id
        /// </summary>
        [DataMember]
        public string ConnectedToId { get; set; }

        /// <summary>
        /// Gets or sets count of User Photo
        /// </summary>
        [DataMember]
        public byte[] UserPhoto { get; set; }

        /// <summary>
        /// Gets or sets count of base64 image
        /// </summary>
        [DataMember]
        public string Base64img { get; set; }

        /// <summary>
        /// Gets or sets count of Location
        /// </summary>
        [DataMember]
        public string Location { get; set; }

        /// <summary>
        /// Gets or sets count of Office Venue
        /// </summary>
        [DataMember]
        public string OfficeVenue { get; set; }

        /// <summary>
        /// Gets or sets count of Gender
        /// </summary>
        [DataMember]
        public string Gender { get; set; }

        /// <summary>
        /// Gets or sets count of Department
        /// </summary>
        [DataMember]
        public string Department { get; set; }

        /// <summary>
        /// Gets or sets count of  BU 
        /// </summary>
        [DataMember]
        public string BU { get; set; }

        /// <summary>
        /// Gets or sets count of Onsite_Offshore
        /// </summary>
        [DataMember]
        public string Onsite_Offshore { get; set; }

        /// <summary>
        /// Gets or sets count of Language Spoken
        /// </summary>
        [DataMember]
        public string LanguageSpoken { get; set; }

        /// <summary>
        /// Gets or sets count of Project Name
        /// </summary>
        [DataMember]
        public string ProjectName { get; set; }

        /// <summary>
        /// Gets or sets count of VNET
        /// </summary>
        [DataMember]
        public string VNET { get; set; }

        /// <summary>
        /// Gets or sets count of Email Id
        /// </summary>
        [DataMember]
        public string EmailId { get; set; }

        /// <summary>
        /// Gets or sets count of User Type
        /// </summary>
        [DataMember]
        public string UserType { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the item is Joiner
        /// </summary>
        [DataMember]
        public bool IsJoinee { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the item is Registered Buddy
        /// </summary>
        [DataMember]
        public bool IsRegisteredBuddy { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the item is Available
        /// </summary>
        [DataMember]
        public bool IsAvailable { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the item is Same Facility
        /// </summary>
        [DataMember]
        public bool IsSameFacility { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the item is Same Bay
        /// </summary>
        [DataMember]
        public bool IsSameBay { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the item is Same BU
        /// </summary>
        [DataMember]
        public bool IsSameBU { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the item Is Same Department
        /// </summary>
        [DataMember]
        public bool IsSameDept { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the item is Same Grade
        /// </summary>
        [DataMember]
        public bool IsSameGrade { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the item is supervisor
        /// </summary>
        [DataMember]
        public bool IsSupervisor { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the item is Talent Manager
        /// </summary>
        [DataMember]
        public bool IsTM { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the item is Master admin
        /// </summary>
        [DataMember]
        public bool IsMasteradmin { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the item is lateral
        /// </summary>
        [DataMember]
        public bool IsLateral { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the item is eligible
        /// </summary>
        [DataMember]
        public bool IsEligible { get; set; }

        /// <summary>
        /// Gets or sets count of Date Of Joining
        /// </summary>
        [DataMember]
        public DateTime DOJ { get; set; }

        /// <summary>
        /// Gets or sets count of Number Of All Connections
        /// </summary>
        [DataMember]
        public int NoOfAllConnections { get; set; }         ////pending + active + disconnected

        /// <summary>
        /// Gets or sets count of Number Of Active Connections
        /// </summary>
        [DataMember]
        public int NoOfActiveConnections { get; set; }      ////active   

        /// <summary>
        /// Gets or sets count of Buddy Duration
        /// </summary>
        [DataMember]
        public int BuddyDuration { get; set; } //// As Admin Configuration.-MS2013JUN28

        /// <summary>
        /// Gets or sets count of Acceptance Count Of Registered Buddy
        /// </summary>
        [DataMember]
        public int AcceptanceCountOfRegBuddy { get; set; } //// As Admin Configuration.-MS2013JUN28

        /// <summary>
        /// Gets or sets count of Acceptance Count Of UnRegistered Buddy
        /// </summary>
        [DataMember]
        public int AcceptanceCountOfUnRegBuddy { get; set; } //// As Admin Configuration.-MS2013JUN28

        /// <summary>
        /// Gets or sets count of Connections Of Joiners
        /// </summary>
        [DataMember]
        public int ConnectionsOfJoiners { get; set; } //// As Admin Configuration.-MS2013JUN28

        /// <summary>
        /// Gets or sets count of Country Id
        /// </summary>
        [DataMember]
        public string CountryId { get; set; }

        /// <summary>
        /// Method to Get User Type
        /// </summary>
        /// <param name="userId">user Id</param> 
        #region GetUserType
        public void GetUserType(string userId)
        {
            DALTransaction d = new DALTransaction();
            DataTable dt = new DataTable();

            dt = d.GetUserType(userId);
            this.IsJoinee = Convert.ToBoolean(dt.Rows[0]["isJoinee"].ToString());
            this.IsRegisteredBuddy = Convert.ToBoolean(dt.Rows[0]["isRegisteredBuddy"].ToString());
            this.IsTM = Convert.ToBoolean(dt.Rows[0]["isTM"].ToString());
            this.IsMasteradmin = Convert.ToBoolean(dt.Rows[0]["isMasterAdmin"].ToString());
            this.IsSupervisor = Convert.ToBoolean(dt.Rows[0]["isSupervisor"].ToString());
            this.IsEligible = Convert.ToBoolean(dt.Rows[0]["isEligible"].ToString());
            this.IsLateral = Convert.ToBoolean(dt.Rows[0]["isLateral"].ToString());
            this.BuddyDuration = Convert.ToInt16(dt.Rows[0]["ConnectionDuration"].ToString());
            this.AcceptanceCountOfRegBuddy = Convert.ToInt16(dt.Rows[0]["RegBuddyConnections"].ToString());
            this.AcceptanceCountOfUnRegBuddy = Convert.ToInt16(dt.Rows[0]["UnregBuddyConnections"].ToString());
            this.ConnectionsOfJoiners = Convert.ToInt16(dt.Rows[0]["JoineeConnections"].ToString());
            if (dt.Rows[0]["CountryId"] != null)
            {
                this.CountryId = dt.Rows[0]["CountryId"].ToString();
            }
            else
            {
                this.CountryId = "Other";
            }
        }
        #endregion

        /// <summary>
        /// Method to make user registered buddy
        /// </summary>
        /// <param name="strAssociate_Ids">string Associate Ids</param>
        /// <returns>Buddy List</returns>
        #region NominateAsBuddy
        public int NominateAsBuddy(string strAssociate_Ids)
        {
            int n = -1;
            try
            {
                DALTransaction d = new DALTransaction();
                n = d.NominateAsBuddy(strAssociate_Ids);
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

                throw;
            }

            return n;
        }
        #endregion

        /// <summary>
        ///  Method to retract as buddy
        /// </summary>
        /// <param name="associate_Id">Associate Id</param>
        /// <returns>Buddy list</returns>
        #region RetractAsBuddy
        public int RetractAsBuddy(string associate_Id)
        {
            int n = -1;
            try
            {
                DALTransaction d = new DALTransaction();
                n = d.RetractAsBuddy(associate_Id);
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
                        obj.EmployeeID = associate_Id;
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

                throw;
            }

            return n;
        }
        #endregion

        /// <summary>
        /// Method to retrieve no. of active connections of given User
        /// </summary>
        /// <param name="associate_Id">Associate Id</param>
        /// <param name="user_Type">User Type</param>
        /// <returns>Connections Of User</returns>
        #region GetAllConnectionsOfUser
        public bool GetAllConnectionsOfUser(string associate_Id, string user_Type)
        {
            DataTable dt = new DataTable();
            try
            {
                DALTransaction d = new DALTransaction();
                dt = d.GetAllConnections(associate_Id, user_Type).Tables[0];

                if (dt.Rows.Count == 0)
                {
                    return false;
                }

                this.MyConnections = new Relation[dt.Rows.Count];

                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    this.MyConnections[i] = new Relation();
                    this.MyConnections[i].UserId = associate_Id;
                    if (user_Type == "Joinee")
                    {
                        this.MyConnections[i].ConnectedToId = dt.Rows[i]["buddyId"].ToString();
                    }
                    else
                    {
                        this.MyConnections[i].ConnectedToId = dt.Rows[i]["JoineeId"].ToString();
                    }

                    this.MyConnections[i].UserFirstName = dt.Rows[i]["Associate_FirstName"].ToString();
                    this.MyConnections[i].UserName = dt.Rows[i]["Associate_FirstName"].ToString() + ' ' + dt.Rows[i]["Associate_LastName"].ToString();
                    this.MyConnections[i].UserDesignation = dt.Rows[i]["Designation"].ToString();
                    this.MyConnections[i].UserBU = dt.Rows[i]["BU"].ToString();
                    this.MyConnections[i].ConnectionStatus = dt.Rows[i]["ConnectionStatus"].ToString();
                    this.MyConnections[i].ConnectionStartDate = Convert.ToDateTime(dt.Rows[i]["ConnectionStartDate"]).ToString("MM/dd/yyyy");
                    this.MyConnections[i].ConnectionEndDate = Convert.ToDateTime(dt.Rows[i]["ConnectionEndDate"]).ToString("MM/dd/yyyy");
                    this.MyConnections[i].DaysTotal = dt.Rows[i]["DaysLeft"].ToString();
                    this.MyConnections[i].FeedbackStatus = dt.Rows[i]["FeedbackStatus"].ToString();
                    this.MyConnections[i].ConnectionEndStatus = dt.Rows[i]["ConnectionEndStatus"].ToString();
                    this.MyConnections[i].DaysToShowAdvisor = dt.Rows[i]["DaysToShowAdvisor"].ToString();
                    switch (dt.Rows[i]["DisconnectionStatus"].ToString())
                    {
                        case "11":
                            this.MyConnections[i].DisconnectionStatus = "Disengaged";
                            break;
                        case "01":
                            this.MyConnections[i].DisconnectionStatus = "Disengaged from Joinee";
                            break;
                        case "10":
                            this.MyConnections[i].DisconnectionStatus = "Disengaged from Buddy";
                            break;
                        default:
                            this.MyConnections[i].DisconnectionStatus = "Connected";
                            break;
                    }
                }

                return true;
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
                        obj.EmployeeID = associate_Id;
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

                throw;
            }
        }
        #endregion

        /// <summary>
        /// Method to retrieve all the likely buddies of user according to different criteria
        /// </summary>
        /// <param name="associate_Id">Associate Id</param>
        /// <param name="filter_Type">Filter Type</param>
        /// <param name="upto_Level">Level of Associate</param>
        #region GetAllLikelyBuddies
        public void GetAllLikelyBuddies(string associate_Id, string filter_Type, int upto_Level)
        {
            DataTable dtallBuddies = new DataTable();

            try
            {
                DALTransaction d = new DALTransaction();

                dtallBuddies = d.GetAllLikelyBuddies(associate_Id, filter_Type, upto_Level);

                int totalbuddies = 0;

                if (dtallBuddies.Rows.Count > 130)
                {
                    totalbuddies = 130;
                }
                else
                {
                    totalbuddies = dtallBuddies.Rows.Count;
                }

                this.BuddyList = new BuddyBLL.User[totalbuddies];
                for (int i = 0; i < totalbuddies; i++)
                {
                    this.BuddyList[i] = new User();
                    this.BuddyList[i].UserId = dtallBuddies.Rows[i]["Associate_Id"].ToString();
                    this.BuddyList[i].BU = dtallBuddies.Rows[i]["BU"].ToString();
                    this.BuddyList[i].Designation = dtallBuddies.Rows[i]["Associate_Designation"].ToString();
                    this.BuddyList[i].UserName = dtallBuddies.Rows[i]["Associate_FirstName"].ToString() + " " + dtallBuddies.Rows[i]["Associate_LastName"].ToString();
                    this.BuddyList[i].DisplayName = dtallBuddies.Rows[i]["Associate_FirstName"].ToString();
                    this.BuddyList[i].Location = dtallBuddies.Rows[i]["Location"].ToString();
                    this.BuddyList[i].Gender = dtallBuddies.Rows[i]["Gender"].ToString();
                    this.BuddyList[i].IsRegisteredBuddy = Convert.ToBoolean(dtallBuddies.Rows[i]["RegistrationStatus"]);
                    this.BuddyList[i].IsAvailable = Convert.ToBoolean(dtallBuddies.Rows[i]["AvailableStatus"]);
                    this.BuddyList[i].IsSameFacility = Convert.ToBoolean(dtallBuddies.Rows[i]["isSameFacility"]);
                    this.BuddyList[i].IsSameBay = Convert.ToBoolean(dtallBuddies.Rows[i]["isSameBay"]);
                    this.BuddyList[i].IsSameBU = Convert.ToBoolean(dtallBuddies.Rows[i]["isSameBU"]);
                    this.BuddyList[i].IsSameDept = Convert.ToBoolean(dtallBuddies.Rows[i]["isSameDept"]);
                    this.BuddyList[i].IsSameGrade = Convert.ToBoolean(dtallBuddies.Rows[i]["isSameGrade"]);
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
                        obj.EmployeeID = associate_Id;
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

                throw;
            }
        }
        #endregion

        /// <summary>
        /// Method to Get User ContactCard
        /// </summary>
        /// <param name="associateId">Associate Id</param>
        #region GetUserContactCard
        public void GetUserContactCard(string associateId)
        {
            DALTransaction d = new DALTransaction();

            ////BuddyBLL.UserProfileService.UserProfileClient objUserProfileClient = new UserProfileService.UserProfileClient("BasicHttpBinding_IUserProfile");

            BuddyBLL.UserProfileService.UserProfileClient objUserProfileClient;
            try
            {
                objUserProfileClient = new BuddyBLL.UserProfileService.UserProfileClient("NetTcpBinding_IUserProfile");
            }
            catch
            {
                objUserProfileClient = new BuddyBLL.UserProfileService.UserProfileClient("BasicHttpBinding_IUserProfile");
            }

            DataSet dsp = new DataSet();

            DataSet ds = d.GetUserContactCard(associateId);
            if (ds.Tables[0].Rows.Count != 0)
            {
                this.UserId = ds.Tables[0].Rows[0]["UserId"].ToString();
                this.UserName = ds.Tables[0].Rows[0]["UserName"].ToString();
                this.IsAvailable = Convert.ToBoolean(ds.Tables[0].Rows[0]["AvailableStatus"].ToString());
                this.IsRegisteredBuddy = Convert.ToBoolean(ds.Tables[0].Rows[0]["RegStatus"].ToString());
                this.Designation = ds.Tables[0].Rows[0]["Designation"].ToString();
                this.LanguageSpoken = ds.Tables[0].Rows[0]["LanguageSpeaks"].ToString();
                this.ProjectName = ds.Tables[0].Rows[0]["ProjectName"].ToString();
                this.BU = ds.Tables[0].Rows[0]["BU"].ToString();
                this.OfficeVenue = ds.Tables[0].Rows[0]["OfficeVenue"].ToString();
                this.Location = ds.Tables[0].Rows[0]["Location"].ToString();

                dsp = objUserProfileClient.GetAssociateDataByAssociateID(this.UserId, "702", EnumclassViewType.DetailedView);
                if (dsp.Tables[0].Rows.Count != 0 || dsp.Tables.Count != 0)
                {
                    if (dsp.Tables[0].Rows[0]["UserPhoto"] != DBNull.Value)
                    {
                        this.Base64img = System.Convert.ToBase64String((byte[])dsp.Tables[0].Rows[0]["UserPhoto"], 0, ((byte[])dsp.Tables[0].Rows[0]["UserPhoto"]).Length);
                    }
                    else
                    {
                        this.Base64img = null;
                    }

                    this.VNET = dsp.Tables[0].Rows[0]["VNET"].ToString();
                    this.DisplayName = dsp.Tables[0].Rows[0]["Associate_FirstName"].ToString();
                    this.EmailId = dsp.Tables[0].Rows[0]["EMail_ID"].ToString();
                }
                else
                {
                    this.Base64img = null;
                    this.VNET = "Not Available";
                    this.DisplayName = "Not Available";
                    this.OfficeVenue = "Not Available";
                    this.Location = "Not Available";
                }
            }
            else
            {
                this.LanguageSpoken = "Not Available";
                this.UserId = "Not Available";
                this.UserName = "Not Available";
                this.IsAvailable = true;
                this.IsRegisteredBuddy = true;
                this.Designation = "Not Available";
                this.ProjectName = "Not Available";
                this.BU = "Not Available";
                this.Base64img = null;
                this.VNET = "Not Available";
                this.DisplayName = "Not Available";
                this.OfficeVenue = "Not Available";
                this.Location = "Not Available";
            }
        }
        #endregion

        /// <summary>
        /// Method to Get Feedback History
        /// </summary>
        /// <param name="buddy_Id">Buddy Id</param>
        #region GetFeedbackHistory
        public void GetFeedbackHistory(string buddy_Id)
        {
            DALTransaction d = new DALTransaction();

            DataTable dt = d.GetFeedbackHistory(buddy_Id);
            this.ObjFeedbackHistory = new Relation[dt.Rows.Count];
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                this.ObjFeedbackHistory[i] = new Relation();
                this.ObjFeedbackHistory[i].UserId = dt.Rows[i]["Buddy_Id"].ToString();
                this.ObjFeedbackHistory[i].UserName = dt.Rows[i]["Buddy_Name"].ToString();
            }
        }
        #endregion

        /// <summary>
        /// Method to retrieve all possible recommendable joiners of given supervisor
        /// </summary>
        /// <param name="supervisorId">supervisor Id</param>
        /// <returns>Joiner List</returns>
        #region GetRecommendableJoinees
        public bool GetRecommendableJoinees(string supervisorId)
        {
            DataTable dtallJoinees = new DataTable();
            try
            {
                DALTransaction d = new DALTransaction();
                dtallJoinees = d.GetRecommendableJoinees(supervisorId);

                if (dtallJoinees.Rows.Count == 0)
                {
                    return false;
                }

                this.JoineeList = new User[dtallJoinees.Rows.Count];

                for (int i = 0; i < dtallJoinees.Rows.Count; i++)
                {
                    this.JoineeList[i] = new User();
                    this.JoineeList[i].UserId = dtallJoinees.Rows[i]["Associate_Id"].ToString();
                    this.JoineeList[i].Designation = dtallJoinees.Rows[i]["Associate_Designation"].ToString();
                    this.JoineeList[i].UserName = dtallJoinees.Rows[i]["Associate_FirstName"].ToString() + " " + dtallJoinees.Rows[i]["Associate_LastName"].ToString();
                    this.JoineeList[i].DisplayName = dtallJoinees.Rows[i]["Associate_FirstName"].ToString();
                    this.JoineeList[i].Gender = dtallJoinees.Rows[i]["Gender"].ToString();
                }

                return true;
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
                        obj.EmployeeID = supervisorId;
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

                throw;
            }
        }
        #endregion

        /// <summary>
        /// Method to retrieve all possible recommendable joiners of given supervisor
        /// </summary>
        /// <param name="joineeId">joiner Id</param>
        #region GetRecommendableAdvisors
        public void GetRecommendableAdvisors(string joineeId)
        {
            DataSet dtallJoinees = new DataSet();
            try
            {
                DALTransaction d = new DALTransaction();
                dtallJoinees = d.GetRecommendableAdvisors(joineeId);

                this.JoineeList = new User[dtallJoinees.Tables[0].Rows.Count];

                for (int i = 0; i < dtallJoinees.Tables[0].Rows.Count; i++)
                {
                    this.JoineeList[i] = new User();
                    this.JoineeList[i].UserId = dtallJoinees.Tables[0].Rows[i]["Associate_Id"].ToString();
                    this.JoineeList[i].Designation = dtallJoinees.Tables[0].Rows[i]["Designation"].ToString();
                    ////this.JoineeList[i].UserName = dtallJoinees.Rows[i]["Associate_FirstName"].ToString() + " " + dtallJoinees.Rows[i]["Associate_LastName"].ToString();
                    this.JoineeList[i].DisplayName = dtallJoinees.Tables[0].Rows[i]["AssociateName"].ToString();
                    ////this.JoineeList[i].Gender = dtallJoinees.Rows[i]["Gender"].ToString();
                }

                this.BuddyList = new User[dtallJoinees.Tables[1].Rows.Count];
                for (int i = 0; i < dtallJoinees.Tables[1].Rows.Count; i++)
                {
                    this.BuddyList[i] = new User();
                    this.BuddyList[i].ConnectionsOfJoiners = Convert.ToInt16(dtallJoinees.Tables[1].Rows[i]["tinyint_NoOfJoineeConnections"].ToString());
                }

                return;
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
                        obj.EmployeeID = joineeId;
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

                throw;
            }
        }
        #endregion

        /// <summary>
        /// Method to retrieve all unenrolled buddies of given supervisor
        /// </summary>
        /// <param name="supervisorId">Supervisor Id</param>
        /// <returns>Unenrolled Buddies</returns>
        #region GetUnenrolledBuddies
        public bool GetUnenrolledBuddies(string supervisorId)
        {
            DataTable dtunenrolledBuddies = new DataTable();
            try
            {
                DALTransaction d = new DALTransaction();
                dtunenrolledBuddies = d.GetUnenrolledBuddies(supervisorId);

                if (dtunenrolledBuddies.Rows.Count == 0)
                {
                    return false;
                }

                this.BuddyList = new User[dtunenrolledBuddies.Rows.Count];

                for (int i = 0; i < dtunenrolledBuddies.Rows.Count; i++)
                {
                    this.BuddyList[i] = new User();
                    this.BuddyList[i].UserId = dtunenrolledBuddies.Rows[i]["Associate_Id"].ToString();
                    this.BuddyList[i].Designation = dtunenrolledBuddies.Rows[i]["Associate_Designation"].ToString();
                    this.BuddyList[i].UserName = dtunenrolledBuddies.Rows[i]["Associate_FirstName"].ToString() + " " + dtunenrolledBuddies.Rows[i]["Associate_LastName"].ToString();
                    this.BuddyList[i].DisplayName = dtunenrolledBuddies.Rows[i]["Associate_FirstName"].ToString();
                }

                return true;
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
                        obj.EmployeeID = supervisorId;
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

                throw;
            }
        }
        #endregion

        /// <summary>
        /// Method to Search Associate Data
        /// </summary>
        /// <param name="searchText">Search Text</param>
        #region SearchAssoData
        public void SearchAssoData(string searchText)
        {
            DALTransaction d = new DALTransaction();
            try
            {
                DataTable dt = new DataTable();
                dt = d.SearchAssoData(searchText);
                this.Users = new UserInfo[dt.Rows.Count];
                ////BuddyList=new User[dt.Rows.Count];
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    this.Users[i] = new UserInfo();
                    this.Users[i].UserId = dt.Rows[i]["Associate_Id"].ToString();
                    this.Users[i].UserName = dt.Rows[i]["AssoName"].ToString();
                }
            }
            catch
            {
            }
        }
        #endregion

        /// <summary>
        /// Method to get Is Associate Eligible
        /// </summary>
        /// <param name="userId">User Id</param>
        #region IsAssociateEligible
        public void IsAssociateEligible(string userId)
        {
            DALTransaction d = new DALTransaction();
            DataTable dt = new DataTable();

            dt = d.IsAssociateEligible(userId);
            this.IsEligible = Convert.ToBoolean(dt.Rows[0]["IsEligible"]);
        }
        #endregion

        /// <summary>
        /// Method to Get New Joiner Associate Type
        /// </summary>
        /// <param name="asso_Id">Associate Id</param>
        /// <returns>Is Lateral</returns>
        #region GetNewJoineeAssociateType
        public string GetNewJoineeAssociateType(string asso_Id)
        {
            DALTransaction d = new DALTransaction();
            DataTable dt = new DataTable();

            dt = d.GetNewJoineeAssociateType(asso_Id);
            this.IsLateral = Convert.ToBoolean(dt.Rows[0]["IsEligible"]);
            return this.IsLateral.ToString();
        }
        #endregion

        /// <summary>
        /// Get PageContent
        /// </summary>
        /// <param name="countryId">country Id</param>
        /// <param name="pageName">page name</param>
        /// <param name="role">user role</param>
        #region PageContent
        public void GetPageContent(string countryId, string pageName, string role)
        {
            DALTransaction d = new DALTransaction();
            DataTable dt = new DataTable();

            dt = d.GetPageContent(countryId, pageName, role);
            this.PageContentDetails = new PageContent[dt.Rows.Count];
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    this.PageContentDetails[i] = new PageContent();
                    this.PageContentDetails[i].Reader = dt.Rows[i]["Reader"].ToString();
                    this.PageContentDetails[i].Content = dt.Rows[i]["Content"].ToString();
                    this.PageContentDetails[i].TileNo = dt.Rows[i]["varchar_TileNo"].ToString();
                }
            }
        }
        #endregion

        #region GetAllPossibleAdvisors
        /// <summary>
        /// function for GetAllPossibleAdvisors
        /// </summary>
        /// <param name="joineeId"> Joiner Id</param>
        /// <param name="buddyId"> Buddy Id</param>
        /// <param name="location">Advisors location</param>
        /// <param name="buid">Advisors BU</param>
        /// <param name="projectId">Advisors Project</param>
        /// <param name="accountId">Advisors Account</param>
        public void GetAllPossibleAdvisors(string joineeId, string buddyId, string location, string buid, string projectId, string accountId)
        {
            DALTransaction d = new DALTransaction();
            DataTable dt = new DataTable();
            dt = d.GetAllPossibleAdvisors(joineeId, buddyId, location, buid, projectId, accountId);
            this.AdvisorsInfo = new GetAdvisors[dt.Rows.Count];
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                this.AdvisorsInfo[i] = new GetAdvisors();
                this.AdvisorsInfo[i].Associate_Id = dt.Rows[i]["Associate_Id"].ToString();
                this.AdvisorsInfo[i].Associate_Name = dt.Rows[i]["AssociateName"].ToString();
                this.AdvisorsInfo[i].Location = dt.Rows[i]["Location"].ToString();
                this.AdvisorsInfo[i].BU = dt.Rows[i]["BU"].ToString();
                this.AdvisorsInfo[i].Designation = dt.Rows[i]["Designation"].ToString();
                this.AdvisorsInfo[i].Level = dt.Rows[i]["Level"].ToString();
                this.AdvisorsInfo[i].ProjectName = dt.Rows[i]["ProjectName"].ToString();
                this.AdvisorsInfo[i].Account = dt.Rows[i]["Account"].ToString();
                this.AdvisorsInfo[i].IsRegisteredBuddy = dt.Rows[i]["IsRegisteredBuddy"].ToString();
                this.AdvisorsInfo[i].IsAvailable = dt.Rows[i]["IsAvailable"].ToString();
            }
        }
        #endregion

        /// <summary>
        /// Method to get Search Project
        /// </summary>
        /// <param name="searchText">Search Text</param>
        #region SearchProject
        public void SearchProject(string searchText)
        {
            DALTransaction d = new DALTransaction();
            try
            {
                DataTable dt = new DataTable();
                dt = d.SearchProject(searchText);
                this.Projname = new ProjectName[dt.Rows.Count];
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    this.Projname[i] = new ProjectName();
                    this.Projname[i].ProjectId = dt.Rows[i]["Project_ID"].ToString();
                    this.Projname[i].Projectname = dt.Rows[i]["Project_Name"].ToString();
                }
            }
            catch
            {
            }
        }
        #endregion

        /// <summary>
        /// Method to get Search BU
        /// </summary>
        /// <param name="searchText">Search Text</param>
        #region SearchBU
        public void SearchBU(string searchText)
        {
            DALTransaction d = new DALTransaction();
            try
            {
                DataTable dt = new DataTable();
                dt = d.SearchBU(searchText);
                this.Projname = new ProjectName[dt.Rows.Count];
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    this.Projname[i] = new ProjectName();
                    this.Projname[i].ProjectId = dt.Rows[i]["BUId"].ToString();
                    this.Projname[i].Projectname = dt.Rows[i]["BUDesc"].ToString();
                }
            }
            catch
            {
            }
        }
        #endregion

        /// <summary>
        /// Method to Search Account
        /// </summary>
        /// <param name="searchText">Search Text</param>
        #region SearchAccount
        public void SearchAccount(string searchText)
        {
            DALTransaction d = new DALTransaction();
            try
            {
                DataTable dt = new DataTable();
                dt = d.SearchAccount(searchText);
                this.Projname = new ProjectName[dt.Rows.Count];
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    this.Projname[i] = new ProjectName();
                    this.Projname[i].ProjectId = dt.Rows[i]["CustomerID"].ToString();
                    this.Projname[i].Projectname = dt.Rows[i]["CustomerName"].ToString();
                }
            }
            catch
            {
            }
        }
        #endregion

        /// <summary>
        /// Method to Get Location
        /// </summary>
        /// <param name="associateId">Associate Id</param>
        #region GetLocation
        public void GetLocation(string associateId)
        {
            DALTransaction d = new DALTransaction();
            try
            {
                DataSet dt = new DataSet();
                dt = d.GetLocation(associateId);
                this.City = new Location[dt.Tables[0].Rows.Count];
                for (int i = 0; i < dt.Tables[0].Rows.Count; i++)
                {
                    this.City[i] = new Location();
                    this.City[i].Cityname = dt.Tables[0].Rows[i]["Location"].ToString();
                }

                this.AdvisorsInfo = new GetAdvisors[dt.Tables[1].Rows.Count];
                for (int i = 0; i < dt.Tables[1].Rows.Count; i++)
                {
                    this.AdvisorsInfo[i] = new GetAdvisors();
                    this.AdvisorsInfo[i].Associate_Id = dt.Tables[1].Rows[i]["Associate_Id"].ToString();
                    this.AdvisorsInfo[i].Associate_Name = dt.Tables[1].Rows[i]["AssociateName"].ToString();
                    this.AdvisorsInfo[i].Location = dt.Tables[1].Rows[i]["Location"].ToString();
                    this.AdvisorsInfo[i].BU = dt.Tables[1].Rows[i]["BU"].ToString();
                    this.AdvisorsInfo[i].Designation = dt.Tables[1].Rows[i]["Designation"].ToString();
                    this.AdvisorsInfo[i].Level = dt.Tables[1].Rows[i]["Level"].ToString();
                    this.AdvisorsInfo[i].ProjectName = dt.Tables[1].Rows[i]["ProjectName"].ToString();
                    this.AdvisorsInfo[i].Account = dt.Tables[1].Rows[i]["Account"].ToString();
                    ////this.AdvisorsInfo[i].IsRegisteredBuddy = dt.Tables[1].Rows[i]["IsRegisteredBuddy"].ToString();
                    ////this.AdvisorsInfo[i].IsAvailable = dt.Tables[1].Rows[i]["IsAvailable"].ToString();
                }
            }
            catch
            {
            }
        }
        #endregion

        /// <summary>
        /// Method to get Show Hide Tiles
        /// </summary>
        /// <param name="joineeId">joiner Id</param>
        /// <param name="userType">user Type</param>
        #region ShowHideTiles
        public void ShowHideTiles(string joineeId, string userType)
        {
            DALTransaction d = new DALTransaction();
            try
            {
                DataTable dt = new DataTable();
                dt = d.ShowHideTiles(joineeId, userType);
                this.Tiles = new ShowHideTiles[dt.Rows.Count];
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    this.Tiles[i] = new ShowHideTiles();
                    this.Tiles[i].EnableViewAdvisor = dt.Rows[i]["EnableViewAdvisor"].ToString();
                    this.Tiles[i].EnableAskSupervisor = dt.Rows[i]["EnableAskSupervisor"].ToString();
                    this.Tiles[i].EnableSearch = dt.Rows[i]["EnableSearch"].ToString();
                    this.Tiles[i].EnableConnections = dt.Rows[i]["EnableConnections"].ToString();
                    this.Tiles[i].EnablePending = dt.Rows[i]["EnablePending"].ToString();
                    this.Tiles[i].EnableEnrollment = dt.Rows[i]["EnableEnrollment"].ToString();
                }
            }
            catch
            {
            }
        }
        #endregion

        /// <summary>
        /// Send NotificationMail 
        /// </summary>
        /// <param name="supervisorId">supervisor Id</param>
        /// <param name="joineeId">join Id</param>
        /// <param name="requesttype">request type</param>
        /// <returns>true or false</returns>
        #region SendNotificationMail
        public string SendNotificationMail(string supervisorId, string joineeId, string requesttype)
        {
            if (requesttype == "notifyAll")
            {
                DataTable dtunenrolledBuddies = new DataTable();
                DALTransaction d = new DALTransaction();
                dtunenrolledBuddies = d.GetUnenrolledBuddies(supervisorId);
                this.BuddyList = new User[dtunenrolledBuddies.Rows.Count];
                for (int i = 0; i < dtunenrolledBuddies.Rows.Count; i++)
                {
                    //// this.BuddyList[i] = new User();
                    ////  this.BuddyList[i].UserId = dtunenrolledBuddies.Rows[i]["Associate_Id"].ToString();
                    string advisorId = dtunenrolledBuddies.Rows[i]["Associate_Id"].ToString();
                    RequestUnifiedVASContractClient client = new RequestUnifiedVASContractClient();
                    StringBuilder strXML = new StringBuilder();
                    ////  User supervisor = new User(mySupervisorId);
                    User joinee = new User(advisorId);
                    ////   string supervisorname = supervisor.UserName;
                    string joineename = joinee.UserName;
                    string email_Subject = string.Empty;
                    string email_Body = string.Empty;
                    string email_Text = string.Empty;
                    string email_Salutation = string.Empty;
                    string email_URL = string.Empty;
                    string url_Text = string.Empty;
                    string url = string.Empty;
                    string email_Bcc = string.Empty;
                    string email_Cc = string.Empty;
                    string subject_Line = string.Empty;
                    string requestid = string.Empty;
                    string requestType = "supervisor";

                    DataTable dt = new DataTable();
                    DALTransaction instmail = new DALTransaction();
                    dt = instmail.InstantMailer(advisorId, requestType);
                    email_Subject = dt.Rows[0]["Subject"].ToString();
                    url = dt.Rows[0]["URL"].ToString();
                    email_Body = dt.Rows[0]["Email_Body"].ToString();
                    email_Body = email_Body.Replace("@Joineename", joineename);
                    email_Body = email_Body.Replace("@URL", url);
                    email_Text = dt.Rows[0]["Email_Text"].ToString();
                    //// email_Text = email_Text.Replace("@Supervisorname", supervisorname);
                    subject_Line = dt.Rows[0]["subjectline"].ToString();
                    email_URL = dt.Rows[0]["URL"].ToString();
                    email_Bcc = dt.Rows[0]["Email_Bcc"].ToString();
                    email_Cc = dt.Rows[0]["Email_Cc"].ToString();
                    email_Salutation = dt.Rows[0]["Salutation"].ToString();
                    url_Text = dt.Rows[0]["URL_Text"].ToString();
                    requestid = dt.Rows[0]["RequestId"].ToString();
                    ////MySupervisorId = "332265";
                   //// email_Cc = joineeId;
                    ////Email_Bcc = "298014";
                    strXML.Append("<OneCommunicator version='1'>");
                    strXML.Append("<TransactionParameters>");
                    strXML.Append("<Recipients>" + advisorId + "</Recipients>");
                    strXML.Append("<RequestId>" + requestid + "</RequestId>");
                    strXML.Append("<Process>Mail_To_Buddies</Process>");
                    strXML.Append("<GlobalAppId>702</GlobalAppId>");
                    strXML.Append("</TransactionParameters>");
                    strXML.Append("<ChannelParameters>");
                    strXML.Append("<Email>");
                    strXML.Append("<CC>" + email_Cc + "</CC>");
                    strXML.Append("<BCC>" + email_Bcc + "</BCC>");
                    strXML.Append("<TemplateParameters>");
                    strXML.Append("<Text>" + email_Text + "</Text>");
                    strXML.Append("<URLText>" + subject_Line + "</URLText>");
                    strXML.Append("<URL>" + url + "</URL>");
                    strXML.Append("<EmailBody>" + email_Body + "</EmailBody>");
                    strXML.Append("<Salutation>" + email_Salutation + "</Salutation>");
                    strXML.Append("<Subject>" + email_Subject + "</Subject>");
                    strXML.Append("</TemplateParameters>");
                    strXML.Append("</Email>");
                    strXML.Append("</ChannelParameters>");
                    strXML.Append("</OneCommunicator>");
                    string res = client.Notify(strXML.ToString(), null);
                }
            }
            else
            {
                RequestUnifiedVASContractClient client = new RequestUnifiedVASContractClient();
                StringBuilder strXML = new StringBuilder();
                ////  User supervisor = new User(mySupervisorId);
                User joinee = new User(joineeId);
                ////   string supervisorname = supervisor.UserName;
                string joineename = joinee.UserName;
                string email_Subject = string.Empty;
                string email_Body = string.Empty;
                string email_Text = string.Empty;
                string email_Salutation = string.Empty;
                string email_URL = string.Empty;
                string url_Text = string.Empty;
                string url = string.Empty;
                string email_Bcc = string.Empty;
                string email_Cc = string.Empty;
                string subject_Line = string.Empty;
                string requestid = string.Empty;
                string requestType = "supervisor";

                DataTable dt = new DataTable();
                DALTransaction instmail = new DALTransaction();
                dt = instmail.InstantMailer(joineeId, requestType);
                email_Subject = dt.Rows[0]["Subject"].ToString();
                url = dt.Rows[0]["URL"].ToString();
                email_Body = dt.Rows[0]["Email_Body"].ToString();
                email_Body = email_Body.Replace("@Joineename", joineename);
                email_Body = email_Body.Replace("@URL", url);
                email_Text = dt.Rows[0]["Email_Text"].ToString();
                //// email_Text = email_Text.Replace("@Supervisorname", supervisorname);
                subject_Line = dt.Rows[0]["subjectline"].ToString();
                email_URL = dt.Rows[0]["URL"].ToString();
                email_Bcc = dt.Rows[0]["Email_Bcc"].ToString();
                email_Cc = dt.Rows[0]["Email_Cc"].ToString();
                email_Salutation = dt.Rows[0]["Salutation"].ToString();
                url_Text = dt.Rows[0]["URL_Text"].ToString();
                requestid = dt.Rows[0]["RequestId"].ToString();
                ////MySupervisorId = "332265";
                email_Cc = joineeId;
                ////Email_Bcc = "298014";
                strXML.Append("<OneCommunicator version='1'>");
                strXML.Append("<TransactionParameters>");
                strXML.Append("<Recipients>" + joineeId + "</Recipients>");
                strXML.Append("<RequestId>" + requestid + "</RequestId>");
                strXML.Append("<Process>Mail_To_Buddies</Process>");
                strXML.Append("<GlobalAppId>702</GlobalAppId>");
                strXML.Append("</TransactionParameters>");
                strXML.Append("<ChannelParameters>");
                strXML.Append("<Email>");
                strXML.Append("<CC>" + email_Cc + "</CC>");
                strXML.Append("<BCC>" + email_Bcc + "</BCC>");
                strXML.Append("<TemplateParameters>");
                strXML.Append("<Text>" + email_Text + "</Text>");
                strXML.Append("<URLText>" + subject_Line + "</URLText>");
                strXML.Append("<URL>" + url + "</URL>");
                strXML.Append("<EmailBody>" + email_Body + "</EmailBody>");
                strXML.Append("<Salutation>" + email_Salutation + "</Salutation>");
                strXML.Append("<Subject>" + email_Subject + "</Subject>");
                strXML.Append("</TemplateParameters>");
                strXML.Append("</Email>");
                strXML.Append("</ChannelParameters>");
                strXML.Append("</OneCommunicator>");
                string res = client.Notify(strXML.ToString(), null);
            }

            return "success";
        }
        #endregion
    }

    /// <summary>
    /// Initializes a new instance of the User Information
    /// </summary>
    [SuppressMessage("StyleCop.CSharp.MaintainabilityRules", "SA1402:FileMayOnlyContainASingleClass", Justification = "Reviewed.")]
    [DataContract]
    public class UserInfo
    {
        /// <summary>
        /// Gets or sets count of UserId
        /// </summary>
        [DataMember]
        public string UserId { get; set; }

        /// <summary>
        /// Gets or sets count of User Name
        /// </summary>
        [DataMember]
        public string UserName { get; set; }
    }

    /// <summary>
    /// Initializes a new instance of the Page Content
    /// </summary>
    [DataContract]
    public class PageContent
    {
        /// <summary>
        /// Gets or sets count of Reader
        /// </summary>
        [DataMember]
        public string Reader { get; set; }

        /// <summary>
        /// Gets or sets count of Content
        /// </summary>
        [DataMember]
        public string Content { get; set; }

        /// <summary>
        /// Gets or sets count of Tile Number
        /// </summary>
        [DataMember]
        public string TileNo { get; set; }
    }

    /// <summary>
    /// Initializes a new instance of the GetAdvisors
    /// </summary>
    [DataContract]
    public class GetAdvisors
    {
        /// <summary>
        /// Gets or sets count of Associate_Id
        /// </summary>
        [DataMember]
        public string Associate_Id { get; set; }

        /// <summary>
        /// Gets or sets count of Associate Name
        /// </summary>
        [DataMember]
        public string Associate_Name { get; set; }

        /// <summary>
        /// Gets or sets count of Location
        /// </summary>
        [DataMember]
        public string Location { get; set; }

        /// <summary>
        /// Gets or sets count of BU
        /// </summary>
        [DataMember]
        public string BU { get; set; }

        /// <summary>
        /// Gets or sets count of Project Name
        /// </summary>
        [DataMember]
        public string ProjectName { get; set; }

        /// <summary>
        /// Gets or sets count of Account
        /// </summary>
        [DataMember]
        public string Account { get; set; }

        /// <summary>
        /// Gets or sets count of Level
        /// </summary>
        [DataMember]
        public string Level { get; set; }

        /// <summary>
        /// Gets or sets count of Designation
        /// </summary>
        [DataMember]
        public string Designation { get; set; }

        /// <summary>
        /// Gets or sets count of Is Registered Buddy
        /// </summary>
        [DataMember]
        public string IsRegisteredBuddy { get; set; }

        /// <summary>
        /// Gets or sets count of Is Available
        /// </summary>
        [DataMember]
        public string IsAvailable { get; set; }
    }

    /// <summary>
    /// Initializes a new instance of class ProjectId
    /// </summary>
    [DataContract]
    public class ProjectName
    {
        /// <summary>
        /// Gets or sets count of Project Id
        /// </summary>
        [DataMember]
        public string ProjectId { get; set; }

        /// <summary>
        /// Gets or sets count of Project name
        /// </summary>
        [DataMember]
        public string Projectname { get; set; }
    }

    /// <summary>
    /// Initializes a new instance of class ProjectId
    /// </summary>
    [DataContract]
    public class ShowHideTiles
    {
        /// <summary>
        /// Gets or sets count of Project Id
        /// </summary>
        [DataMember]
        public string EnableViewAdvisor { get; set; }

        /// <summary>
        /// Gets or sets count of Project Id
        /// </summary>
        [DataMember]
        public string EnableAskSupervisor { get; set; }

        /// <summary>
        /// Gets or sets count of Project Id
        /// </summary>
        [DataMember]
        public string EnableSearch { get; set; }

        /// <summary>
        /// Gets or sets count of Project Id
        /// </summary>
        [DataMember]
        public string EnableConnections { get; set; }

        /// <summary>
        /// Gets or sets count of Project Id
        /// </summary>
        [DataMember]
        public string EnablePending { get; set; }

        /// <summary>
        /// Gets or sets count of Project Id
        /// </summary>
        [DataMember]
        public string EnableEnrollment { get; set; }
    }

    /// <summary>
    /// Gets or sets count of Location 
    /// </summary>
    [DataContract]
    public class Location
    {
        /// <summary>
        /// Gets or sets City name
        /// </summary>
        [DataMember]
        public string Cityname { get; set; }
    }
}

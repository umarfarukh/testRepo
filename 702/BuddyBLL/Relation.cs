// -----------------------------------------------------------------------
// <copyright file="Relation.cs" company="Cognizant Technology Pvt Ltd">
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
    using System.IO;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Text;
    using System.Web;
    using BuddyBLL;
    using BuddyBLL.ExceptionLoggingService;
    using BuddyBLL.ServiceReferenceForMail;
    using BuddyBLL.UserProfileService;
    using BuddyDAL;
    using CTS.OneCognizant.Platform.CoreServices;

    /// <summary>
    /// Class for info of connection details
    /// </summary>
    [DataContract]
    public class Relation
    {
        /// <summary>
        /// Method to GetBuddyDetails
        /// </summary>
        private Relation[] getBuddyDetails = new Relation[0];

        /// <summary>
        /// Initializes a new instance of the Object My All Connections
        /// </summary>
        private Relation[] objMyAllConnections = new Relation[0];

        /// <summary>
        ///  Initializes a new instance of the Object My Pending Connections
        /// </summary>
        private Relation[] objMyPendingConnections = new Relation[0];

        /// <summary>
        ///  Initializes a new instance of the Object Joiner Notification
        /// </summary>
        private Relation[] objJoineeNotification = new Relation[0];

        /// <summary>
        ///  Initializes a new instance of the Buddy Notify 
        /// </summary>
        private Relation[] buddyNotify = new Relation[0];

        /// <summary>
        ///  Initializes a new instance of the Object Feedback History
        /// </summary>
        private Relation[] objFeedbackHistory = new Relation[0];

        /// <summary>
        ///  Initializes a new instance of the Joiner Notify
        /// </summary>
        private Relation[] joineeNotify = new Relation[0];

        /// <summary>
        /// Initializes a new instance of the buddy alerts
        /// </summary>
        private BuddyALERTS[] objBuddyAlerts = null;

        /// <summary>
        ///  Initializes a new instance of the feedbackQuestion
        /// </summary>
        private FeedbackQuestion[] objFeedbackQuestions = null;

        /// <summary>
        /// Method for joiner alerts
        /// </summary>
        private JoineeALERTS[] objJoineeAlerts = null;

        /// <summary>
        /// Method for average feedback
        /// </summary>
        private Avgfeedback[] objAvgFeedback = null;

        /// <summary>
        /// Initializes a new instance of the <see cref="Relation"/> class.
        /// </summary>
        public Relation()
        {
        }

        /// <summary>
        /// Gets or sets GetBuddyDetails
        /// </summary>
        public Relation[] GetBuddyDetails
        {
            get { return this.getBuddyDetails; }
            set { this.getBuddyDetails = value; }
        }

        /// <summary>
        /// Gets or sets Object MyAllConnections
        /// </summary>
        public Relation[] ObjMyAllConnections
        {
            get { return this.objMyAllConnections; }
            set { this.objMyAllConnections = value; }
        }

        /// <summary>
       /// Gets or sets Object MyPendingConnections
        /// </summary>
       public Relation[] ObjMyPendingConnections
       {
           get { return this.objMyPendingConnections; }
           set { this.objMyPendingConnections = value; }
       }

        /// <summary>
         /// Gets or sets Object Joiner eNotification
        /// </summary>
         public Relation[] ObjJoineeNotification
         {
             get { return this.objJoineeNotification; }
             set { this.objJoineeNotification = value; }
         }

        /// <summary>
        /// Gets or sets Buddy Notify
        /// </summary>
         public Relation[] BuddyNotify
         {
             get { return this.buddyNotify; }
             set { this.buddyNotify = value; }
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
        /// Gets or sets joiner Notify
        /// </summary>
        public Relation[] JoineeNotify
        {
            get { return this.joineeNotify; }
            set { this.joineeNotify = value; }
        }

        /// <summary>
        /// Gets or sets object Feedback Questions
        /// </summary>
        public FeedbackQuestion[] ObjFeedbackQuestions
        {
            get { return this.objFeedbackQuestions; }
            set { this.objFeedbackQuestions = value; }
        }

        /// <summary>
        /// Gets or sets object Buddy Alerts
        /// </summary>
        public BuddyALERTS[] ObjBuddyAlerts
        {
            get { return this.objBuddyAlerts; }
            set { this.objBuddyAlerts = value; }
        }     

        /// <summary>
        /// Gets or sets object Joiner Alerts
        /// </summary>
        public JoineeALERTS[] ObjJoineeAlerts
        {
            get { return this.objJoineeAlerts; }
            set { this.objJoineeAlerts = value; }
        }
 
        /// <summary>
        /// Gets or sets object Average Feedback
        /// </summary>
        public Avgfeedback[] ObjAvgFeedback
        {
            get { return this.objAvgFeedback; }
            set { this.objAvgFeedback = value; }
        }
  
        /// <summary>
        /// Gets or sets UserId
        /// </summary>
        [DataMember]
        public string UserId { get; set; }

        /// <summary>
        /// Gets or sets ConnectedToId
        /// </summary>
        [DataMember]
        public string ConnectedToId { get; set; }

        /// <summary>
        /// Gets or sets ConnectionStatus
        /// </summary>
        [DataMember]
        public string ConnectionStatus { get; set; }

        /// <summary>
        ///  Gets or sets ConnectionStartDate
        /// </summary>
        [DataMember]
        public string ConnectionStartDate { get; set; }

        /// <summary>
        ///  Gets or sets ConnectionEndDate
        /// </summary>
        [DataMember]
        public string ConnectionEndDate { get; set; }

        /// <summary>
        ///  Gets or sets FeedbackComment
        /// </summary>
        [DataMember]
        public string FeedbackComment { get; set; }

        /// <summary>
        ///  Gets or sets FeedbackRating
        /// </summary>
        [DataMember]
        public int FeedbackRating { get; set; }

        /// <summary>
        ///  Gets or sets AverageFeedback
        /// </summary>
        [DataMember]
        public int AverageFeedback { get; set; }

        /// <summary>
        ///  Gets or sets DisconnectionStatus
        /// </summary>
        [DataMember]
        public string DisconnectionStatus { get; set; }

        /// <summary>
        ///  Gets or sets DisconnectComment
        /// </summary>
        [DataMember]
        public string DisconnectComment { get; set; }

        /// <summary>
        ///  Gets or sets DisconnectionRequestDate
        /// </summary>
        [DataMember]
        public DateTime DisconnectionRequestDate { get; set; }

        /// <summary>
        ///  Gets or sets DisconnectionRequestBy_Id
        /// </summary>
        [DataMember]
        public string DisconnectionRequestBy_Id { get; set; }

        /// <summary>
        ///  Gets or sets UserName
        /// </summary>
        [DataMember]
        public string UserName { get; set; }

        /// <summary>
        ///  Gets or sets UserFirstName
        /// </summary>
        [DataMember]
        public string UserFirstName { get; set; }

        /// <summary>
        ///  Gets or sets UserDesignation
        /// </summary>
        [DataMember]
        public string UserDesignation { get; set; }

        /// <summary>
        ///  Gets or sets UserLanguage
        /// </summary>
        [DataMember]
        public string UserLanguage { get; set; }

        /// <summary>
        ///  Gets or sets UserProjectName
        /// </summary>
        [DataMember]
        public string UserProjectName { get; set; }

        /// <summary>
        ///  Gets or sets UserBU
        /// </summary>
        [DataMember]
        public string UserBU { get; set; }

        /// <summary>
        ///  Gets or sets BuddyDesignation
        /// </summary>
        [DataMember]
        public string BuddyDesignation { get; set; }

        /// <summary>
        ///  Gets or sets UserPhoto
        /// </summary>
        [DataMember]
        public string UserPhoto { get; set; }

        /// <summary>
        ///  Gets or sets DaysTotal
        /// </summary>
        [DataMember]
        public string DaysTotal { get; set; }

        /// <summary>
        /// Gets or sets Feedback Status
        /// </summary>
        [DataMember]
        public string FeedbackStatus { get; set; }

        /// <summary>
        /// Gets or sets ConnectionEnd status
        /// </summary>
        [DataMember]
        public string ConnectionEndStatus { get; set; }

        /// <summary>
        /// Gets or sets to show Advisor
        /// </summary>
        [DataMember]
        public string DaysToShowAdvisor { get; set; }

        /// <summary>
        ///  Gets or sets BuddiesId
        /// </summary>
        [DataMember]
        public string BuddiesId { get; set; }

        /// <summary>
        ///  Gets or sets BuddyName
        /// </summary>
        [DataMember]
        public string BuddyName { get; set; }

        /// <summary>
        ///  Gets or sets comments
        /// </summary>
        [DataMember]
        public string Comments { get; set; }

        /// <summary>
        ///  Gets or sets ratings
        /// </summary>
        [DataMember]
        public int Ratings { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether IsAlertNotification
        /// </summary>
        [DataMember]
        public bool IsAlertNotification { get; set; }

        /// <summary>
        ///  Gets or sets DisconnectionRequests
        /// </summary>
        [DataMember]
        public int DisconnectionRequests { get; set; }

        /// <summary>
        ///  Gets or sets FeedbackRequest
        /// </summary>
        [DataMember]
        public int FeedbackRequest { get; set; }

        /// <summary>
        ///  Gets or sets base64 image
        /// </summary>
        [DataMember]
        public string Base64img { get; set; }

        /// <summary>
        ///  Gets or sets MySupervisorId
        /// </summary>
        [DataMember]
        public string MySupervisorId { get; set; }

        /// <summary>
        ///  Gets or sets MySupervisorName
        /// </summary>
        [DataMember]
        public string MySupervisorName { get; set; }

        /// <summary>
        /// Method to get pending  connection details buddy
        /// </summary>
        #region GetPendingConnectionsOfUser
        public void GetPendingConnectionsOfUser()
        {
            DALTransaction d = new DALTransaction();
            DataTable dtpendingConnections = d.GetPendingConnectionsOfUser(); ////pass userid

            this.ObjMyPendingConnections = new Relation[dtpendingConnections.Rows.Count];

            for (int i = 0; i < dtpendingConnections.Rows.Count; i++)
            {
                this.ObjMyPendingConnections[i] = new Relation();
                this.ObjMyPendingConnections[i].UserId = dtpendingConnections.Rows[i]["Joinee_Id"].ToString();
                this.ObjMyPendingConnections[i].UserName = dtpendingConnections.Rows[i]["Joinee_Name"].ToString();
                this.ObjMyPendingConnections[i].UserDesignation = dtpendingConnections.Rows[i]["Designation"].ToString();
                this.ObjMyPendingConnections[i].UserLanguage = dtpendingConnections.Rows[i]["LanguageSpoken"].ToString();
                this.ObjMyPendingConnections[i].UserProjectName = dtpendingConnections.Rows[i]["ProjectName"].ToString();
                this.ObjMyPendingConnections[i].UserBU = dtpendingConnections.Rows[i]["varchar_BUDesc"].ToString();
            }
        }
        #endregion

        /// <summary>
        /// Method to GetNotificationBuddyRequests
        /// </summary>
        /// <param name="buddyId">buddy Id</param>
        #region GetNotificationBuddyRequests
        public void GetNotificationBuddyRequests(string buddyId)
        {
            DALTransaction d = new DALTransaction();
            DataSet dtpendingConnections = d.GetNotificationBuddyRequests(buddyId); ////pass userid

            if (dtpendingConnections.Tables[0].Rows.Count != 0)
            {
                this.ObjMyPendingConnections = new Relation[dtpendingConnections.Tables[0].Rows.Count];

                for (int i = 0; i < dtpendingConnections.Tables[0].Rows.Count; i++)
                {
                    this.ObjMyPendingConnections[i] = new Relation();

                    this.ObjMyPendingConnections[i].UserId = dtpendingConnections.Tables[0].Rows[i]["UserId"].ToString();
                    this.ObjMyPendingConnections[i].UserName = dtpendingConnections.Tables[0].Rows[i]["UserName"].ToString();
                    this.ObjMyPendingConnections[i].UserDesignation = dtpendingConnections.Tables[0].Rows[i]["Designation"].ToString();
                    this.ObjMyPendingConnections[i].UserLanguage = dtpendingConnections.Tables[0].Rows[i]["LanguageSpeaks"].ToString();
                    this.ObjMyPendingConnections[i].UserProjectName = dtpendingConnections.Tables[0].Rows[i]["ProjectName"].ToString();
                    this.ObjMyPendingConnections[i].UserBU = dtpendingConnections.Tables[0].Rows[i]["BU"].ToString();
                    this.ObjMyPendingConnections[i].Base64img = null;
                }
            }
            else
            {
             }
        }
        #endregion

        /// <summary>
        /// Method to Get Notification details of Joiner
        /// </summary>
        /// <param name="joineeId">Joiner Id</param>   
        #region GetJoineeAlertNotification
        public void GetJoineeAlertNotification(string joineeId)
        {
            DALTransaction d = new DALTransaction();
            DataTable dtjoineeNotification = d.GetJoineeAlertNotification(joineeId); ////pass userid

            if (dtjoineeNotification.Rows.Count != 0)
            {
                this.ObjJoineeNotification = new Relation[dtjoineeNotification.Rows.Count];
                for (int i = 0; i < dtjoineeNotification.Rows.Count; i++)
                {
                    this.ObjJoineeNotification[i] = new Relation();
                    this.ObjJoineeNotification[i].UserId = dtjoineeNotification.Rows[i]["Buddy_Id"].ToString();
                    this.ObjJoineeNotification[i].UserName = dtjoineeNotification.Rows[i]["Buddy_Name"].ToString();
                    this.ObjJoineeNotification[i].UserDesignation = dtjoineeNotification.Rows[i]["Designation"].ToString();
                    this.ObjJoineeNotification[i].ConnectionStartDate = Convert.ToDateTime(dtjoineeNotification.Rows[i]["ConnectionStartDate"]).ToString("MM/dd/yyyy");
                    this.ObjJoineeNotification[i].ConnectionEndDate = Convert.ToDateTime(dtjoineeNotification.Rows[i]["ConnectionEndDate"]).ToString("MM/dd/yyyy");
                    this.ObjJoineeNotification[i].DaysTotal = dtjoineeNotification.Rows[i]["DateDiff"].ToString();
                    this.ObjJoineeNotification[i].DisconnectionRequests = Convert.ToInt16(dtjoineeNotification.Rows[i]["DisconnectionRequest"]);
                    this.ObjJoineeNotification[i].FeedbackRequest = Convert.ToInt16(dtjoineeNotification.Rows[i]["FeedbackRequest"]);
                }
            }
            else
            {
            }
        }
        #endregion

        /// <summary>
        /// Method to Set feedback
        /// </summary>
        /// <param name="joineeId">Joiner Id</param>
        /// <param name="buddyId">Buddy Id</param>
        /// <param name="feedBackComment">FeedBack Comment</param>  
        /// <param name="rating">feedback rating</param>
        #region SetFeedbackDetails
        public void SetFeedbackDetails(string joineeId, string buddyId, string feedBackComment, int rating)
        {
            DALTransaction dal = new DALTransaction();
            dal.SetFeedbackDetails(joineeId, buddyId, feedBackComment, rating);
        }
        #endregion

        /// <summary>
        /// Method to Get Buddy feedback Details
        /// </summary>
        /// <param name="joineeId">Joiner Id</param>
        /// <param name="buddyId">Buddy Id</param>
        #region GetBuddyFeedbackDetails
        public void GetBuddyFeedbackDetails(string joineeId, string buddyId)
        {
            DALTransaction d = new DALTransaction();

            DataTable dt = d.GetBuddyFeedbackDetails(joineeId, buddyId);
            if (dt.Rows.Count != 0)
            {
                this.BuddiesId = dt.Rows[0]["BuddyId"].ToString();
               this.BuddyName = dt.Rows[0]["BuddyFirstName"].ToString();
                this.UserName = dt.Rows[0]["JoineeName"].ToString();
                this.BuddyDesignation = dt.Rows[0]["Designation"].ToString();
                this.ConnectionStartDate = Convert.ToDateTime(dt.Rows[0]["ConnectionStartDate"]).ToString("MM/dd/yyyy");
                this.ConnectionEndDate = Convert.ToDateTime(dt.Rows[0]["ConnectionEndDate"]).ToString("MM/dd/yyyy");
                this.FeedbackComment = dt.Rows[0]["FeedbackComments"].ToString();
                this.FeedbackRating = Convert.ToInt16(dt.Rows[0]["FeedbackRating"].ToString());
                this.DaysTotal = dt.Rows[0]["DaysLeft"].ToString();
            }
            else
            {
            }
        }
        #endregion

        /// <summary>
        /// Method to get Result of all buddy
        /// </summary>
        /// <param name="joineeId">Joiner Id</param>
        /// <param name="buddyId">Buddy Id</param>
        /// <param name="list">list containing feed</param>
        #region SetFeedbackQuestions
        public void SetFeedbackQuestions(string joineeId, string buddyId, string list)
        {
            DALTransaction dal = new DALTransaction();
            dal.SetFeedbackQuestions(joineeId, buddyId, list);
        }
        #endregion

        /// <summary>
        /// Method to get notification of buddy disconnection alerts
        /// </summary>
        /// <param name="buddyId">Buddy Id</param>
        #region GetNotificationBuddyDisconnectionAlerts
        public void GetNotificationBuddyDisconnectionAlerts(string buddyId)
        {
            DALTransaction d = new DALTransaction();
            DataTable dtdisconnection = d.GetNotificationBuddyDisconnectionAlerts(buddyId); ////pass userid

            if (dtdisconnection.Rows.Count != 0)
            {
                this.ObjMyPendingConnections = new Relation[dtdisconnection.Rows.Count];

                for (int i = 0; i < dtdisconnection.Rows.Count; i++)
                {
                    this.ObjMyPendingConnections[i] = new Relation();
                    this.ObjMyPendingConnections[i].UserId = dtdisconnection.Rows[i]["JoineeId"].ToString();
                    this.ObjMyPendingConnections[i].UserName = dtdisconnection.Rows[i]["Name"].ToString();
                    this.ObjMyPendingConnections[i].UserDesignation = dtdisconnection.Rows[i]["Designation"].ToString();
                    this.ObjMyPendingConnections[i].ConnectionStartDate = Convert.ToDateTime(dtdisconnection.Rows[0]["ConnectionStartDate"]).ToString("MM/dd/yyyy");
                    this.ObjMyPendingConnections[i].ConnectionEndDate = Convert.ToDateTime(dtdisconnection.Rows[0]["ConnectionEndDate"]).ToString("MM/dd/yyyy");
                    this.ObjMyPendingConnections[i].DaysTotal = dtdisconnection.Rows[i]["DiffDate"].ToString();
                }
            }
            else
            {
            }
        }
        #endregion

        /// <summary>
        /// Method to get enable status of feed button
        /// </summary>
        /// <param name="joineeId">Joiner Id</param>
        /// <param name="buddyId">Buddy Id</param>
        #region GetEnableStatusOfFeedButton
        public void GetEnableStatusOfFeedButton(string joineeId, string buddyId)
        {
            DALTransaction dal = new DALTransaction();
            DataTable dt = dal.GetEnableStatusOfFeedButton(joineeId, buddyId);
            this.ConnectionStatus = dt.Rows[0]["RETURNSTATUS"].ToString();
        }
        #endregion

        /// <summary>
        ///  Method to get feedback history
        /// </summary>
        /// <param name="buddy_Id">buddy Id</param>
        #region GetFeedbackHistory
        public void GetFeedbackHistory(string buddy_Id)
        {
            DALTransaction d = new DALTransaction();

            DataTable dt = d.GetFeedbackHistory(buddy_Id);
            this.ObjFeedbackHistory = new Relation[dt.Rows.Count];
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                this.ObjFeedbackHistory[i] = new Relation();
                this.ObjFeedbackHistory[i].Ratings = Convert.ToInt32(dt.Rows[i]["tinyint_FeedbackRating"]);
                this.ObjFeedbackHistory[i].Comments = dt.Rows[i]["varchar_FeedbackComments"].ToString();
            }
        }
        #endregion

        /// <summary>
        /// Method to get notification of other buddies
        /// </summary>
        /// <param name="buddyId">Buddy Id</param>
        #region GetNotificationBuddyOther
        public void GetNotificationBuddyOther(string buddyId)
        {
            DALTransaction d = new DALTransaction();
            DataTable dtdisconnection = d.GetNotificationBuddyOther(buddyId); ////pass userid

            if (dtdisconnection.Rows.Count != 0)
            {
                this.ObjMyPendingConnections = new Relation[dtdisconnection.Rows.Count];

                for (int i = 0; i < dtdisconnection.Rows.Count; i++)
                {
                    this.ObjMyPendingConnections[i] = new Relation();
                    this.ObjMyPendingConnections[i].UserId = dtdisconnection.Rows[i]["JoineeId"].ToString();
                    this.ObjMyPendingConnections[i].UserName = dtdisconnection.Rows[i]["Name"].ToString();
                    this.ObjMyPendingConnections[i].UserDesignation = dtdisconnection.Rows[i]["Designation"].ToString();
                    this.ObjMyPendingConnections[i].ConnectionStartDate = Convert.ToDateTime(dtdisconnection.Rows[0]["ConnectionStartDate"]).ToString("MM/dd/yyyy");
                    this.ObjMyPendingConnections[i].ConnectionEndDate = Convert.ToDateTime(dtdisconnection.Rows[0]["ConnectionEndDate"]).ToString("MM/dd/yyyy");
                    this.ObjMyPendingConnections[i].DisconnectionStatus = dtdisconnection.Rows[i]["DisconnectionStatus"].ToString();
                }
            }
            else
            {
            }
        }

        #endregion

        /// <summary>
        /// Method to get notification to buddy
        /// </summary>
        /// <param name="buddyID">Buddy ID</param>
        #region GetBuddyNotify
        public void GetBuddyNotify(string buddyID)
        {
            DALTransaction d = new DALTransaction();
            DataTable dt = d.GetBuddyNotify(buddyID); ////pass BU and Buddy/NJ

            DataTable dtresult = new DataTable();

            this.BuddyNotify = new Relation[dt.Rows.Count];

            for (int i = 0; i < dt.Rows.Count; i++)
            {
               this.BuddyNotify[i] = new Relation();
               this.BuddyNotify[i].UserId = dt.Rows[i]["varchar_JoineeId"].ToString();
               this.BuddyNotify[i].BuddyName = dt.Rows[i]["Associate_Name"].ToString();
               this.BuddyNotify[i].ConnectionStatus = dt.Rows[i]["Notification_Text"].ToString();
            }
        }
        #endregion

        /// <summary>
        ///  Method to get notification count of joiner and buddy
        /// </summary>
        /// <param name="userid">User id</param>
        /// <param name="type">type of associate</param>
        #region GetBuddyJoineeNotificationCount
        public void GetBuddyJoineeNotificationCount(string userid, string type)
        {
            DALTransaction d = new DALTransaction();
            DataTable dt = d.GetBuddyJoineeNotificationCount(userid, type);
            this.BuddyNotify = new Relation[dt.Rows.Count];
            if (dt.Rows.Count != 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                   this.BuddyNotify[i] = new Relation();
                   this.BuddyNotify[i].UserId = dt.Rows[i]["Asso_Id"].ToString();
                }
            }
        }
        #endregion

        /// <summary>
        /// method for notifying joiner about disconnection request and feedback
        /// </summary>
        /// <param name="joineeID">Joiner ID</param>
        #region GetJoineeNotify
        public void GetJoineeNotify(string joineeID)
        {
            DALTransaction d = new DALTransaction();
            DataTable dt = d.GetJoineeNotify(joineeID);

            this.JoineeNotify = new Relation[dt.Rows.Count];

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                this.JoineeNotify[i] = new Relation();
                this.JoineeNotify[i].UserId = dt.Rows[i]["Buddy_Id"].ToString();
                this.JoineeNotify[i].UserName = dt.Rows[i]["Buddy_Name"].ToString();
               this.JoineeNotify[i].ConnectionStatus = dt.Rows[i]["NotificationText"].ToString();
           }
        }
        #endregion

        /// <summary>
        /// Method to Check Connection Request
        /// </summary>
        /// <param name="joineeId">Joiner Id</param>
        /// <param name="buddyId">Buddy Id</param>
        /// <returns>result of check</returns>
        #region CheckConnectionRequest
        public int CheckConnectionRequest(string joineeId, string buddyId)
        {
            int result = 0;
            DALTransaction d = new DALTransaction();
            result = d.CheckConnectionRequest(joineeId, buddyId);
            return result;
        }
        #endregion

        /// <summary>
        /// Method to get Buddy Connection Request
        /// </summary>
        /// <param name="joineeId">Joiner Id</param>
        /// <param name="buddyId">Buddy Id</param>
        /// <param name="requestType">Request Type</param>
        /// <param name="rejectionComment">Rejection Comment</param>
        /// <param name="supervisorRecommended">supervisor Recommended</param>
        /// <returns>result of request</returns>
        #region BuddyConnectionRequest
        public int BuddyConnectionRequest(string joineeId, string buddyId, string requestType, string rejectionComment, string supervisorRecommended)
        {
            int result = 0;
            DALTransaction d = new DALTransaction();
            result = d.BuddyConnectionRequest(joineeId, buddyId, requestType, rejectionComment, supervisorRecommended);
            switch (requestType)
            {
                case "Send":
                case "SEND":
                    this.MailofRequestsend(joineeId, buddyId, requestType);
                    break;

                case "Accept":
                case "ACCEPT":
                    this.MailofAcceptance(joineeId, buddyId, requestType);
                    break;

                case "Reject":
                case "REJECT":
                    this.MailofRejection(joineeId, buddyId, requestType, rejectionComment);
                    break;
            }

            return result;
        }
        #endregion

        /// <summary>
        /// Method to get Disconnection Request
        /// </summary>
        /// <param name="joineeId">Joiner Id</param>
        /// <param name="buddyId">Buddy Id</param>
        /// <param name="bywhom">By Whom</param>
        /// <param name="requestType">Request Type</param>
        /// <returns>result of disconnection</returns>
        #region DisconnectionRequest
        public int DisconnectionRequest(string joineeId, string buddyId, string bywhom, string requestType)
        {
            int result = 0;
            DALTransaction d = new DALTransaction();
            result = d.DisconnectionRequest(joineeId, buddyId, bywhom, requestType);
            return result;
        }
        #endregion

        /// <summary>
        /// Method to get Mail of Acceptance
        /// </summary>
        /// <param name="joineeid">Joiner id</param>
        /// <param name="buddyid">buddy id</param>
        /// <param name="requestType">Request Type</param>
        /// <returns>success of mail acceptance</returns>
        #region MailofAcceptance
        public string MailofAcceptance(string joineeid, string buddyid, string requestType)
        {
            RequestUnifiedVASContractClient client = new RequestUnifiedVASContractClient();
            StringBuilder strXML = new StringBuilder();
            User buddy = new User(buddyid);
            User joinee = new User(joineeid);
            string joineeName = joinee.UserName;
            string buddyName = buddy.UserName;
            AdminConfiguration buddyDuration = new AdminConfiguration();
            //// BuddyDuration.GetConfiguration(Joineeid);
            int d = buddyDuration.BuddyDuration;
            string days = d.ToString();
            string startdate = DateTime.Now.ToString("MMM dd, yyyy"); ////May 09, 2013
            string endDate = DateTime.Now.AddDays(d).ToString("MMM dd, yyyy");
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

            DataTable dt = new DataTable();
            DALTransaction instmail = new DALTransaction();
            dt = instmail.InstantMailer(buddyid, requestType);
            email_Subject = dt.Rows[0]["Subject"].ToString();
            email_Body = dt.Rows[0]["Email_Body"].ToString();
            email_Body = email_Body.Replace("@BuddyName", buddyName);
            email_Body = email_Body.Replace("@Startdate", startdate);
            email_Body = email_Body.Replace("@EndDate", endDate);
            email_Body = email_Body.Replace("@days", days);
            email_Text = dt.Rows[0]["Email_Text"].ToString();
            email_Text = email_Text.Replace("@JoineeName", joineeName);
            subject_Line = dt.Rows[0]["subjectline"].ToString();
            email_URL = dt.Rows[0]["URL"].ToString();
            url = dt.Rows[0]["URL"].ToString();
            email_Bcc = dt.Rows[0]["Email_Bcc"].ToString();
            email_Cc = dt.Rows[0]["Email_Cc"].ToString();
            email_Salutation = dt.Rows[0]["Salutation"].ToString();
            url_Text = dt.Rows[0]["URL_Text"].ToString();
            requestid = dt.Rows[0]["RequestId"].ToString();
            //// Joineeid = "332265";
            email_Cc = buddyid;
            //// Email_Bcc = "298014";
            strXML.Append("<OneCommunicator version='1'>");
            strXML.Append("<TransactionParameters>");
            strXML.Append("<Recipients>" + joineeid + "</Recipients>");
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
            return "success";
        }
        #endregion MailofAcceptance

        /// <summary>
        /// Method to get Mail of Rejection
        /// </summary>
        /// <param name="joineeId">Joiner Id</param>
        /// <param name="buddyId">Buddy Id</param>
        /// <param name="requestType">Request Type</param>
        /// <param name="rejectionComment">Rejection Comment</param>
        /// <returns>Success of Mail</returns>
        #region MailofRejection
        public string MailofRejection(string joineeId, string buddyId, string requestType, string rejectionComment)
        {
            RequestUnifiedVASContractClient client = new RequestUnifiedVASContractClient();
            StringBuilder strXML = new StringBuilder();
            User buddy = new User(buddyId);
            User joinee = new User(joineeId);
            string joineeName = joinee.UserName;
            string buddyName = buddy.UserName;
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

            DataTable dt = new DataTable();
            DALTransaction instmail = new DALTransaction();
            dt = instmail.InstantMailer(joineeId, requestType);
            email_Subject = dt.Rows[0]["Subject"].ToString();
            url = dt.Rows[0]["URL"].ToString();
            email_Body = dt.Rows[0]["Email_Body"].ToString();
            email_Body = email_Body.Replace("@BuddyName", buddyName);
            email_Body = email_Body.Replace("@RejectionComment", rejectionComment);
            email_Body = email_Body.Replace("@URL_Text", url);
            email_Text = dt.Rows[0]["Email_Text"].ToString();
            email_Text = email_Text.Replace("@JoineeName", joineeName);
            subject_Line = dt.Rows[0]["subjectline"].ToString();
            email_URL = dt.Rows[0]["URL"].ToString();
            email_Bcc = dt.Rows[0]["Email_Bcc"].ToString();
            email_Cc = dt.Rows[0]["Email_Cc"].ToString();
            email_Salutation = dt.Rows[0]["Salutation"].ToString();
            url_Text = dt.Rows[0]["URL_Text"].ToString();
            requestid = dt.Rows[0]["RequestId"].ToString();
            ////JoineeId = "332265";
            ////Email_Cc = "150474";
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
            return "success";
        }
        #endregion MailofRejection

        /// <summary>
        /// Method to get Mail of Request send
        /// </summary>
        /// <param name="joineeid">Joiner id</param>
        /// <param name="buddyid">Buddy id</param>
        /// <param name="requestType">Request Type</param>
        /// <returns>success of Mail Requests</returns>
        #region MailofRequestsend
        public string MailofRequestsend(string joineeid, string buddyid, string requestType)
        {
            RequestUnifiedVASContractClient client = new RequestUnifiedVASContractClient();
            StringBuilder strXML = new StringBuilder();
            int requestid = 702;
            User buddy = new User(buddyid);
            User joinee = new User(joineeid);
            string joineeName = joinee.UserName;
            string buddyName = buddy.UserName;
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
            string rrequestid = string.Empty;

            DataTable dt = new DataTable();
            DALTransaction instmail = new DALTransaction();
            dt = instmail.InstantMailer(joineeid, requestType);
            email_Subject = dt.Rows[0]["Subject"].ToString();
            url = dt.Rows[0]["URL"].ToString();
            email_Body = dt.Rows[0]["Email_Body"].ToString();
            email_Body = email_Body.Replace("@JoineeName", joineeName);
            email_Body = email_Body.Replace("@URL", url);
            email_Text = dt.Rows[0]["Email_Text"].ToString();
            email_Text = email_Text.Replace("@BuddyName", buddyName);
            subject_Line = dt.Rows[0]["subjectline"].ToString();
            email_URL = dt.Rows[0]["URL"].ToString();
            email_Bcc = dt.Rows[0]["Email_Bcc"].ToString();
            email_Cc = dt.Rows[0]["Email_Cc"].ToString();
            email_Salutation = dt.Rows[0]["Salutation"].ToString();
            url_Text = dt.Rows[0]["URL_Text"].ToString();
            rrequestid = dt.Rows[0]["RequestId"].ToString();
            ////Buddyid = "332265";
            email_Cc = joineeid;
            ////Email_Bcc = "298014";
            strXML.Append("<OneCommunicator version='1'>");
            strXML.Append("<TransactionParameters>");
            strXML.Append("<Recipients>" + buddyid + "</Recipients>");
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
            return "success";
        }
        #endregion mailofRequestsend

        /// <summary>
        /// Method to get Mail of Supervisor Request send
        /// </summary>
        /// <param name="mySupervisorId">My Supervisor Id</param>
        /// <param name="joineeId">Joiner Id</param>
        /// <returns>success of supervisor Request</returns>
        #region MailofSupervisorRequestsend
        public string MailofSupervisorRequestsend(string mySupervisorId, string joineeId)
        {
            RequestUnifiedVASContractClient client = new RequestUnifiedVASContractClient();
            StringBuilder strXML = new StringBuilder();
            User supervisor = new User(mySupervisorId);
            User joinee = new User(joineeId);
            string supervisorname = supervisor.UserName;
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
            email_Text = email_Text.Replace("@Supervisorname", supervisorname);
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
            strXML.Append("<Recipients>" + mySupervisorId + "</Recipients>");
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
            return "success";
        }
        #endregion MailofSupervisorRequestsend

        /// <summary>
        /// Method to get RaiseSupervisorRequest
        /// </summary>
        /// <param name="joineeId">Joiner Id</param>
        /// <returns>true request</returns>
        #region RaiseSupervisorRequest
        public string RaiseSupervisorRequest(string joineeId)
        {
            DALTransaction d = new DALTransaction();
            int n = d.RaiseSupervisorRequest(joineeId);
            if (n == 1)
            {
                Relation r = new Relation();
                r.GetSupervisorDetails(joineeId);
                r.MailofSupervisorRequestsend(r.MySupervisorId, joineeId);
                return "true";
            }
            else
            {
                return "false";
            }
        }
        #endregion

        /// <summary>
        /// Method to get Supervisor Details
        /// </summary>
        /// <param name="userID">user ID</param>
        #region GetSupervisorDetails
        public void GetSupervisorDetails(string userID)
        {
            DALTransaction d = new DALTransaction();
            DataTable dt = d.GetSupervisorId(userID);
            this.MySupervisorId = dt.Rows[0]["Supervisor_ID"].ToString();
            this.MySupervisorName = dt.Rows[0]["Associate_FirstName"].ToString();
        }
        #endregion

        /// <summary>
        /// Method to Get Joiner Other Notification
        /// </summary>
        /// <param name="joineeId">Joiner Id</param>
        #region GetJoineeOtherNotification
        public void GetJoineeOtherNotification(string joineeId)
        {
            DALTransaction d = new DALTransaction();
            DataTable dtjoineeNotification = d.GetJoineeOtherNotification(joineeId); ////pass userid

            if (dtjoineeNotification.Rows.Count != 0)
            {
                this.ObjJoineeNotification = new Relation[dtjoineeNotification.Rows.Count];

                for (int i = 0; i < dtjoineeNotification.Rows.Count; i++)
                {
                    this.ObjJoineeNotification[i] = new Relation();
                    this.ObjJoineeNotification[i].UserId = dtjoineeNotification.Rows[i]["Buddy_Id"].ToString();
                    this.ObjJoineeNotification[i].UserName = dtjoineeNotification.Rows[i]["Buddy_Name"].ToString();
                    this.ObjJoineeNotification[i].UserDesignation = dtjoineeNotification.Rows[i]["Designation"].ToString();
                    this.ObjJoineeNotification[i].ConnectionStartDate = Convert.ToDateTime(dtjoineeNotification.Rows[i]["ConnectionStartDate"]).ToString("MM/dd/yyyy");
                    this.ObjJoineeNotification[i].ConnectionEndDate = Convert.ToDateTime(dtjoineeNotification.Rows[i]["ConnectionEndDate"]).ToString("MM/dd/yyyy");
                    this.ObjJoineeNotification[i].ConnectionStatus = dtjoineeNotification.Rows[i]["StatusText"].ToString();
                }
            }
            else
            {
         }
        }
        #endregion

        /// <summary>
        /// Method to Get Supervisor Notification
        /// </summary>
        /// <param name="supervisorId">Supervisor Id</param>
        #region GetSupervisorNotification
        public void GetSupervisorNotification(string supervisorId)
        {
            DALTransaction d = new DALTransaction();
            DataTable dtsupervisorNotification = d.GetSupervisorNotification(supervisorId); ////pass SupervisorId

            if (dtsupervisorNotification.Rows.Count != 0)
            {
                this.ObjJoineeNotification = new Relation[dtsupervisorNotification.Rows.Count];

                for (int i = 0; i < dtsupervisorNotification.Rows.Count; i++)
                {
                    this.ObjJoineeNotification[i] = new Relation();
                    this.ObjJoineeNotification[i].UserId = dtsupervisorNotification.Rows[i]["varchar_JoineeId"].ToString();
                    this.ObjJoineeNotification[i].UserName = dtsupervisorNotification.Rows[i]["UserName"].ToString();
                    this.ObjJoineeNotification[i].UserDesignation = dtsupervisorNotification.Rows[i]["Designation"].ToString();
                }
            }
            else
            {
           }
        }
        #endregion

        /// <summary>
        /// Method to Get Joiner Inbox Notification
        /// </summary>
        /// <param name="joineeId">Joiner Id</param>
        #region GetJoineeInboxNotification
        public void GetJoineeInboxNotification(string joineeId)
        {
            DALTransaction d = new DALTransaction();
            DataTable dtjoineeAlertNotification = d.GetJoineeAlertNotification(joineeId); //// pass userid
            DataTable dtjoineeOtherNotification = d.GetJoineeOtherNotification(joineeId);
            int lenAlert = dtjoineeAlertNotification.Rows.Count;
            int lenOther = dtjoineeOtherNotification.Rows.Count;
            int lentotal = lenAlert + lenOther;
            int i = 0;
            this.ObjJoineeNotification = new Relation[lentotal];
            if (lenAlert != 0)
            {
                for (int j = 0; j < lenAlert; j++)
                {
                    this.ObjJoineeNotification[i] = new Relation();
                    this.ObjJoineeNotification[i].UserId = dtjoineeAlertNotification.Rows[j]["Buddy_Id"].ToString();
                    this.ObjJoineeNotification[i].UserName = dtjoineeAlertNotification.Rows[j]["Buddy_Name"].ToString();
                    this.ObjJoineeNotification[i].UserDesignation = dtjoineeAlertNotification.Rows[j]["Designation"].ToString();
                    this.ObjJoineeNotification[i].ConnectionStartDate = Convert.ToDateTime(dtjoineeAlertNotification.Rows[j]["ConnectionStartDate"]).ToString("MM/dd/yyyy");
                    this.ObjJoineeNotification[i].ConnectionEndDate = Convert.ToDateTime(dtjoineeAlertNotification.Rows[j]["ConnectionEndDate"]).ToString("MM/dd/yyyy");
                    this.ObjJoineeNotification[i].DaysTotal = dtjoineeAlertNotification.Rows[j]["DateDiff"].ToString();
                    this.ObjJoineeNotification[i].DisconnectionRequests = Convert.ToInt16(dtjoineeAlertNotification.Rows[j]["DisconnectionRequest"]);
                    this.ObjJoineeNotification[i].FeedbackRequest = Convert.ToInt16(dtjoineeAlertNotification.Rows[j]["FeedbackRequest"]);
                    this.ObjJoineeNotification[i].IsAlertNotification = true;
                    i++;
                }
            }

            if (lenOther != 0)
            {
                for (int k = 0; k < lenOther; k++)
                {
                    this.ObjJoineeNotification[i] = new Relation();
                    this.ObjJoineeNotification[i].UserId = dtjoineeOtherNotification.Rows[k]["Buddy_Id"].ToString();
                    this.ObjJoineeNotification[i].UserName = dtjoineeOtherNotification.Rows[k]["Buddy_Name"].ToString();
                    this.ObjJoineeNotification[i].UserDesignation = dtjoineeOtherNotification.Rows[k]["Designation"].ToString();
                    this.ObjJoineeNotification[i].ConnectionStartDate = Convert.ToDateTime(dtjoineeOtherNotification.Rows[k]["ConnectionStartDate"]).ToString("MM/dd/yyyy");
                    this.ObjJoineeNotification[i].ConnectionEndDate = Convert.ToDateTime(dtjoineeOtherNotification.Rows[k]["ConnectionEndDate"]).ToString("MM/dd/yyyy");
                    this.ObjJoineeNotification[i].ConnectionStatus = dtjoineeOtherNotification.Rows[k]["StatusText"].ToString();
                    this.ObjJoineeNotification[i].IsAlertNotification = false;
                    i++;
                }
            }
        }
        #endregion

        /// <summary>
        /// Method to Get Feedback Questions
        /// </summary>
        /// <param name="buddyId">Buddy Id</param>
        /// <param name="joineeId">Joiner Id</param>
        /// <param name="countryId">country Id</param>
        /// <param name="reviewType">Review Type</param>
        #region GetFeedbackQuestions
        public void GetFeedbackQuestions(string buddyId, string joineeId, string countryId, string reviewType)
        {
            DALTransaction d = new DALTransaction();
            DataTable dt = d.GetFeedbackQuestions(buddyId, joineeId, countryId, reviewType);
            this.ObjFeedbackQuestions = new FeedbackQuestion[dt.Rows.Count];
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                this.ObjFeedbackQuestions[i] = new FeedbackQuestion();
                this.ObjFeedbackQuestions[i].QuestionID = dt.Rows[i]["QuestionID"].ToString();
                this.ObjFeedbackQuestions[i].QuestionText = dt.Rows[i]["varchar_QuestionText"].ToString();
                this.ObjFeedbackQuestions[i].Feedback = dt.Rows[i]["Feedback"].ToString();
                this.ObjFeedbackQuestions[i].IsFeedbackShared = dt.Rows[i]["IsFeedbackShared"].ToString();
            }
        }
        #endregion

        /// <summary>
        /// Method to get GetBuddyAlerts
        /// </summary>
        /// <param name="buddyId">Buddy Id</param>
        #region GetBuddyAlerts
        public void GetBuddyAlerts(string buddyId)
        {
            DALTransaction d = new DALTransaction();

            DataTable dt = d.GetBuddyAlerts(buddyId);
            this.ObjBuddyAlerts = new BuddyALERTS[dt.Rows.Count];
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                this.ObjBuddyAlerts[i] = new BuddyALERTS();
                this.ObjBuddyAlerts[i].NewHireId = dt.Rows[i]["NewHireId"].ToString();
                this.ObjBuddyAlerts[i].BuddyAlerts = dt.Rows[i]["Alerts"].ToString();
            }
        }
        #endregion

        /// <summary>
        /// Method to Get Average Feedback
        /// </summary>
        /// <param name="buddyId">Buddy Id</param>
        /// <param name="joineeId">Joiner Id</param>
        /// <param name="reviewType">Review Type</param>
        #region GetAverageFeedback
        public void GetAverageFeedback(string buddyId, string joineeId, string reviewType)
        {
            DALTransaction d = new DALTransaction();

            DataTable dt = d.GetAverageFeedback(buddyId, joineeId, reviewType);
            this.ObjAvgFeedback = new Avgfeedback[dt.Rows.Count];
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                this.ObjAvgFeedback[i] = new Avgfeedback();
                this.ObjAvgFeedback[i].QuestionID = dt.Rows[i]["QuestionID"].ToString();
                this.ObjAvgFeedback[i].QuestionText = dt.Rows[i]["varchar_QuestionText"].ToString();
                this.ObjAvgFeedback[i].Feedback = dt.Rows[i]["Feedback"].ToString();
            }
        }
        #endregion
     
        /// <summary>
        /// Method to Get Joiner Alerts
        /// </summary>
        /// <param name="joineeId">Joiner Id</param>
        #region GetJoineeAlerts
        public void GetJoineeAlerts(string joineeId)
        {
            DALTransaction d = new DALTransaction();

            DataTable dt = d.GetJoineeAlerts(joineeId);
            this.ObjJoineeAlerts = new JoineeALERTS[dt.Rows.Count];
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                this.ObjJoineeAlerts[i] = new JoineeALERTS(); 
                this.ObjJoineeAlerts[i].AdvisorId = dt.Rows[i]["AdvisorId"].ToString();
                this.ObjJoineeAlerts[i].JoineeAlerts = dt.Rows[i]["Alerts"].ToString();   
           }
        }
      #endregion
  }

/// <summary>
/// Initializes a new instance of the  feedback Question.
/// </summary>
[SuppressMessage("StyleCop.CSharp.MaintainabilityRules", "SA1402:FileMayOnlyContainASingleClass", Justification = "Reviewed.")]
[DataContract]
public class FeedbackQuestion
{
    /// <summary>
    /// Gets or sets count of Question ID
    /// </summary>
    [DataMember]
    public string QuestionID { get; set; }

    /// <summary>
    /// Gets or sets count of Question Text
    /// </summary>
    [DataMember]
    public string QuestionText { get; set; }

    /// <summary>
    /// Gets or sets count of Feedback
    /// </summary>
    [DataMember]
    public string Feedback { get; set; }

    /// <summary>
    /// Gets or sets Is FeedbackShared
    /// </summary>
    [DataMember]
    public string IsFeedbackShared { get; set; }
}

/// <summary>
/// Method for BuddyALERTS
/// </summary>
[DataContract]
public class BuddyALERTS
{
    /// <summary>
    /// Gets or sets count of NewHireId
    /// </summary>
    [DataMember]
    public string NewHireId { get; set; }

    /// <summary>
    /// Gets or sets count of BuddyAlerts
    /// </summary>
    [DataMember]
    public string BuddyAlerts { get; set; }
}

/// <summary>
/// Method for average feedback
/// </summary>
[DataContract]
public class Avgfeedback
{
    /// <summary>
    /// Gets or sets count of QuestionID
    /// </summary>
    [DataMember]
    public string QuestionID { get; set; }

    /// <summary>
    /// Gets or sets count of QuestionText
    /// </summary>
    [DataMember]
    public string QuestionText { get; set; }

    /// <summary>
    /// Gets or sets count of Feedback
    /// </summary>
    [DataMember]
    public string Feedback { get; set; }
}

/// <summary>
/// Method to get Joiner ALERTS
/// </summary>
[DataContract]
public class JoineeALERTS
{
    /// <summary>
    /// Gets or sets count of AdvisorId
    /// </summary>
    [DataMember]
    public string AdvisorId { get; set; }

    /// <summary>
    /// Gets or sets count of Joiner Alerts
    /// </summary>
    [DataMember]
    public string JoineeAlerts { get; set; }
}
}

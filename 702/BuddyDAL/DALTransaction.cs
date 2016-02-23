// ***********************************************************************
// Assembly         : BuddyDAL
// Author           : 397757
// Created          : 07-15-2014
//
// Last Modified By : 397757
// Last Modified On : 08-18-2014
// ***********************************************************************
// <copyright file="DALTransaction.cs" company="Cognizant Technology Solutions">
//     Copyright (c) Cognizant Technology Solutions. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

/// <summary>
/// The BuddyDAL namespace.
/// </summary>
namespace BuddyDAL
{
    using System;
    using System.Collections.Generic;
    using System.Configuration;
    using System.Data;
    using System.Data.SqlClient;
    using System.Linq;
    using System.Text;
    using System.Web;

    /// <summary>
    /// Method for DAL Transaction
    /// </summary>
    public class DALTransaction : IDisposable
    {
        #region Variables

        /// <summary>
        /// The m_connection string
        /// </summary>
        private string mconnectionString;
        #endregion

        #region Dispose
        /// <summary>
        /// The disposed
        /// </summary>
        private bool disposed = false;

        #endregion

        #region Constructor

        /// <summary>
        /// Initializes a new instance of the <see cref="DALTransaction"/> class.
        /// </summary>
        public DALTransaction()
        {
            //// modify the key to match with what you have provided in your web.config file
            this.mconnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["BuddyConnectionString"].ConnectionString;
        }
        #endregion constructor

        #region Dispose
        /// <summary>
        /// Finalizes an instance of the <see cref="DALTransaction"/> class.
        /// </summary>
        ~DALTransaction()
        {
            this.Dispose(false);
        }

        #endregion

        #region Properties
        /// <summary>
        /// Gets the connection string.
        /// </summary>
        /// <value>The connection string.</value>
        private string ConnectionString
        {
            get
            {
                return this.mconnectionString;
            }
        }
        #endregion

        #region ShowJoinees

        /// <summary>
        /// Shows the joiners.
        /// </summary>
        /// <param name="buddyId">The buddy identifier.</param>
        /// <returns>the DataTable.</returns>
        public DataTable ShowJoinees(string buddyId) ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtdata = new DataTable();
            string query = "usp_702_ShowJoinees"; //// store procedure name comes here ,397757
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@VarcharBuddy_Id", buddyId);
                            cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dtdata);
                            dtdata.TableName = "RelationTable"; //// set a proper table name, if necessary
                        }

                        conSqlConnection.Close();
                    }
                }

                return dtdata;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion ShowJoinees

        #region AddRemoveAdmin
        /// <summary>
        /// Adds the remove admin.
        /// </summary>
        /// <param name="actionType">Type of the action.</param>
        /// <param name="associate_Id">The associate_ identifier.</param>
        /// <param name="adminType">Type of the admin.</param>
        /// <returns>System. Integer32.</returns>
        public int AddRemoveAdmin(string actionType, string associate_Id, int adminType) ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            int n = 0;
            string query = "usp_702_AddRemoveAdmin"; //// store procedure name comes here : 397757

            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@ActionType", actionType);
                            cmdEmpData.Parameters.AddWithValue("@AssociateId", associate_Id);
                            cmdEmpData.Parameters.AddWithValue("@AdminType", adminType);
                            n = cmdEmpData.ExecuteNonQuery();
                        }

                        conSqlConnection.Close();
                    }
                }

                return n;
            }
            catch
            {
                throw;
                ////return "Admin already exists";
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }
        #endregion AddAdmin

        #region GetConfiguration
        /// <summary>
        /// Method for showing Configured Details
        /// </summary>
        /// <param name="countryId">The country identifier.</param>
        /// <returns>Buddy Id</returns>
        public DataSet GetConfiguration(string countryId)
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataSet dtdata = new DataSet();
            string query = "usp_702_GetConfiguration"; //// store procedure name comes here ////397757
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@CountryId", countryId);
                            cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dtdata);
                            dtdata.Tables[0].TableName = "ConfigurationTable"; //// set a proper table name, if necessary
                            dtdata.Tables[1].TableName = "Country";
                        }

                        conSqlConnection.Close();
                    }
                }

                return dtdata;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion GetConfiguration

        #region SetConfiguration
        /// <summary>
        /// Method for Configuration by Admin
        /// </summary>
        /// <param name="buddyDuration">Buddy Duration</param>
        /// <param name="requestToRegBuddy">Request To Registered Buddy</param>
        /// <param name="requestToUnRegBuddy">Request To UnRegistered Buddy</param>
        /// <param name="requestAcceptedByRegBuddy">Request Accepted By Registered Buddy</param>
        /// <param name="requestAcceptedByUnRegBuddy">Request Accepted By UnRegistered Buddy</param>
        /// <param name="requestsSendByJoinee">The requests send by joiner.</param>
        /// <param name="connectionsOfJoiners">The connections of joiners.</param>
        /// <param name="countryId">The country identifier.</param>
        /// <returns>BuddyDuration, DurationDisengagement, RequestToRegisteredBuddy, RequestToUnRegisteredBuddy, RequestAcceptedByRegisteredBuddy and RequestAcceptedByUnRegisteredBuddy</returns> 
        public int SetConfiguration(int buddyDuration, int requestToRegBuddy, int requestToUnRegBuddy, int requestAcceptedByRegBuddy, int requestAcceptedByUnRegBuddy, int requestsSendByJoinee, int connectionsOfJoiners, string countryId) ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            int n = 0;
            string query = "usp_702_SetConfiguration"; //// store procedure name comes here ////397757

            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@Buddy_Duration ", buddyDuration);
                            cmdEmpData.Parameters.AddWithValue("@Noof_RequestTo_RegisteredBuddy", requestToRegBuddy);
                            cmdEmpData.Parameters.AddWithValue("@Noof_RequestTo_UnRegisteredBuddy", requestToUnRegBuddy);
                            cmdEmpData.Parameters.AddWithValue("@Noof_Request_AcceptedBy_RegisteredBuddy", requestAcceptedByRegBuddy);
                            cmdEmpData.Parameters.AddWithValue("@Noof_Request_AcceptedBy_UnRegisteredBuddy", requestAcceptedByUnRegBuddy);
                            cmdEmpData.Parameters.AddWithValue("@Noof_Request_By_Joinee", requestsSendByJoinee);
                            cmdEmpData.Parameters.AddWithValue("@Noof_Connections_Of_Joinee", connectionsOfJoiners);
                            cmdEmpData.Parameters.AddWithValue("@CountryId", countryId);
                            n = cmdEmpData.ExecuteNonQuery();
                        }

                        conSqlConnection.Close();
                    }
                }

                return n;
            }
            catch
            {
                throw;
                ////return "Admin already exists";
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion SetConfiguration

        #region ShowAdmin
        /// <summary>
        /// Show Admin To MasterAdmin for Remove
        /// </summary>
        /// <returns>Admin Id</returns>       
        public DataTable ShowAdmin()
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtdata = new DataTable();
            string query = "usp_702_GetAllAdmins"; //// store procedure name comes here ////397757
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dtdata);
                            dtdata.TableName = "AdminTable"; //// set a proper table name, if necessary
                        }
                    }
                }

                return dtdata;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion ShowAdmin

        #region NominateAsBuddy
        /// <summary>
        /// Method to Nominate as buddy
        /// </summary>
        /// <param name="strBuddyId">string BuddyId</param>
        /// <returns>Buddy Id</returns>
        public int NominateAsBuddy(string strBuddyId)
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            string query = "usp_702_NominateAsBuddy"; //// store procedure name comes here ////397757
            int n = -1;
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@strBuddy_Id", strBuddyId);     //// comma separated buddy id's 
                            n = cmdEmpData.ExecuteNonQuery();
                        }

                        conSqlConnection.Close();
                    }
                }

                return n;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region RetractAsBuddy
        /// <summary>
        /// Retracts as buddy.
        /// </summary>
        /// <param name="buddyId">The buddy identifier.</param>
        /// <returns>System. Integer32.</returns>
        public int RetractAsBuddy(string buddyId) ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            string query = "usp_702_RetractAsBuddy"; //// store procedure name comes here ////397757
            int n = -1;
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@Buddy_Id", buddyId);
                            n = cmdEmpData.ExecuteNonQuery();
                        }

                        conSqlConnection.Close();
                    }
                }

                return n;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetAllConnections
        /// <summary>
        /// Method to retrieve all the connections of given user
        /// </summary>
        /// <param name="associate_Id">Associate Id</param>
        /// <param name="user_Type">User Type</param>
        /// <returns>Associate_Id and User_Type</returns>
        public DataSet GetAllConnections(string associate_Id, string user_Type) ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataSet dsempData = new DataSet();
            string query = "usp_702_GetAllConnectionsOfUser";  ////397757
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@Associate_Id", associate_Id);
                            cmdEmpData.Parameters.AddWithValue("@User_Type", user_Type); //// Buddy or Joinee
                            daempData.Fill(dsempData);
                            dsempData.Tables[0].TableName = "Connection_Details_Of_User";
                        }

                        conSqlConnection.Close();
                    }
                }

                return dsempData;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region BUNameList
        /// <summary>
        /// Gets the bu name list.
        /// </summary>
        /// <returns>the DataTable.</returns>
        public DataTable GetBUNameList()
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtdata = new DataTable();
            string query = "usp_702_GetBUList"; //// store procedure name comes here ////397757
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            ////   cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dtdata);
                            dtdata.TableName = "BU list"; //// set a proper table name, if necessary
                        }
                    }
                }

                return dtdata;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region BUNames
        /// <summary>
        /// Gets the bu names.
        /// </summary>
        /// <returns>the DataTable.</returns>
        public DataTable GetBUNames()
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtdata = new DataTable();
            string query = "usp_702_GetBUNames"; //// store procedure name comes here ////397757
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;

                            ////   cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dtdata);
                            dtdata.TableName = "BU list"; //// set a proper table name, if necessary
                        }
                    }
                }

                return dtdata;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region ExportToExcel
        /// <summary>
        /// Exports to excel.
        /// </summary>
        /// <param name="countryId">The country identifier.</param>
        /// <returns>the DataSet.</returns>
        public DataSet ExportToExcel(string countryId = "0") ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataSet dsempData = new DataSet();
            string query = "usp_702_ExportToExcel"; //// store procedure name comes here ////397757
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            ////298015-Country Id passed
                            cmdEmpData.Parameters.AddWithValue("@CountryId", countryId);
                            cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dsempData);
                            dsempData.Tables[0].TableName = "Excel Report";
                        }
                    }
                }

                return dsempData;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); ////make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region SetFeedback
        /// <summary>
        /// Method to SetFeedback
        /// </summary>
        /// <param name="joineeId">The joiner identifier.</param>
        /// <param name="buddyId">The buddy identifier.</param>
        /// <param name="feedbackComment">The feedback comment.</param>
        /// <param name="rating">The rating.</param>
        public void SetFeedbackDetails(string joineeId, string buddyId, string feedbackComment, int rating) ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            string query = "usp_702_SetFeedbackDetails"; //// store procedure name comes here ////397757

            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@Joinee_Id", joineeId);
                            cmdEmpData.Parameters.AddWithValue("@Buddy_Id", buddyId);
                            cmdEmpData.Parameters.AddWithValue("@FeedbackComment", feedbackComment);
                            cmdEmpData.Parameters.AddWithValue("@FeedbackRating", rating);
                            cmdEmpData.ExecuteNonQuery();
                        }

                        conSqlConnection.Close();
                    }
                }
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetFeedback
        /// <summary>
        /// Method to GetFeedback
        /// </summary>
        /// <param name="joinee_Id">The joiner identifier.</param>
        /// <param name="buddy_Id">The buddy identifier.</param>
        /// <returns>Join Id and Buddy Id</returns>
        public DataTable GetFeedBack(string joinee_Id, string buddy_Id) ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dt = new DataTable();
            string query = "usp_702_GetFeedbackDetails"; //// store procedure name comes here ////397757

            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@Joinee_Id", joinee_Id);
                            cmdEmpData.Parameters.AddWithValue("@Buddy_Id", buddy_Id);
                            cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dt);
                        }

                        conSqlConnection.Close();
                    }
                }

                return dt;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetUserType
        /// <summary>
        /// Returns user type  Associate_Id
        /// </summary>
        /// <param name="associate_Id">The associate_ identifier.</param> 
        /// <returns>Associate Id</returns>
        public DataTable GetUserType(string associate_Id)
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();

            string query = "usp_702_GetAssociateType"; //// store procedure name comes here ////397757
            DataTable dt = new DataTable();
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@Associate_Id", associate_Id);
                            cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dt);
                        }

                        conSqlConnection.Close();
                    }
                }

                return dt;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetDashBoardTabPrefillValues
        /// <summary>
        /// Method to retrieve prefill values of admin-dashboard tab
        /// (previous 3 calls combined namely GetBUNames for buddy,GetPieChartNJ/GetPieChartBuddy,GetAllBuddiesDashBoard )
        /// </summary>
        /// <returns>AssociateId and UserType</returns>
        public DataSet GetDashBoardTabPrefillValues()
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataSet dsempData = new DataSet();
            string query = "usp_702_GetDashBoardTabPrefillValues"; ////397757
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            daempData.Fill(dsempData);
                            dsempData.Tables[0].TableName = "BU list";
                            dsempData.Tables[1].TableName = "Country list";
                            dsempData.Tables[2].TableName = "BuddyDashboard Data";
                            dsempData.Tables[3].TableName = "PieChart Data";
                        }

                        conSqlConnection.Close();
                    }
                }

                return dsempData;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetAllLikelyBuddies
        /// <summary>
        /// Method to retrieve all likely buddies of user
        /// </summary>
        /// <param name="associate_Id">Associate Id</param>
        /// <param name="filter_Type">Filter Type</param>
        /// <param name="upto_Level">The up to level.</param>
        /// <returns>Associate_Id, Filter_Type and Level</returns>
        public DataTable GetAllLikelyBuddies(string associate_Id, string filter_Type, int upto_Level) ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtempData = new DataTable();
            string query = "usp_702_GetAllLikelyBuddies";

            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@associate_id", associate_Id);
                            cmdEmpData.Parameters.AddWithValue("@filter_type", filter_Type);
                            cmdEmpData.Parameters.AddWithValue("@upto_level", upto_Level);
                            daempData.Fill(dtempData);
                            dtempData.TableName = "LikelyBuddies";
                        }

                        conSqlConnection.Close();
                    }
                }

                return dtempData;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetPieChartBuddy
        /// <summary>
        /// Gets the pie chart buddy.
        /// </summary>
        /// <returns>the DataTable.</returns>
        public DataTable GetPieChartBuddy()
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dsempData = new DataTable();
            string query = "usp_702_GetpiechartBuddy"; //// store procedure name comes here ////397757
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            ////cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dsempData);
                            dsempData.TableName = "<< proper table name >>"; //// set a proper table name, if necessary
                        }
                    }
                }

                return dsempData;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }
        #endregion

        #region GetPieChartNJ
        /// <summary>
        /// Gets the pie chart of new joiners.
        /// </summary>
        /// <returns>the DataTable.</returns>
        public DataTable GetPieChartNJ()
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dsempData = new DataTable();
            string query = "usp_702_GetpiechartBuddy"; //// store procedure name comes here ////397757
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            //// cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dsempData);
                            dsempData.TableName = "<< proper table name >>"; //// set a proper table name, if necessary
                        }
                    }
                }

                return dsempData;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetDashBoardData
        /// <summary>
        /// Gets the dash board data.
        /// </summary>
        /// <param name="bU">The bu.</param>
        /// <param name="chk">The CHK.</param>
        /// <param name="countryId">The country identifier.</param>
        /// <returns>the DataSet.</returns>
        public DataSet GetDashBoardData(string bU, string chk, string countryId) ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataSet dsempData = new DataSet();
            string query = "usp_702_GetDashBoardData"; //// store procedure name comes here ////397757

            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@BU", bU);
                            cmdEmpData.Parameters.AddWithValue("@Chk", chk);
                            cmdEmpData.Parameters.AddWithValue("@CountryId", countryId);
                            //// cmdEmpData.ExecuteNonQuery();

                            daempData.Fill(dsempData);
                            dsempData.Tables[0].TableName = "tbl_Buddy_GetDashboard";
                            dsempData.Tables[1].TableName = "PieChart Data";
                        }

                        conSqlConnection.Close();
                    }
                }

                return dsempData;
            }
            catch
            {
                throw;
            }
            finally
            {
                dsempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetDashboardConnectionsofUser
        //// string userid = "298015";

        /// <summary>
        /// Gets the dashboard connections of user.
        /// </summary>
        /// <param name="datauserid">The data user id.</param>
        /// <param name="chk">The CHK.</param>
        /// <returns>the DataTable.</returns>
        public DataTable GetDashboardConnectionsofUser(string datauserid, string chk) ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtdata = new DataTable();
            string query = "usp_702_GetDashboardConnectionsBuddy_NJ"; //// store procedure name comes here ////397757

            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@User_Id", datauserid);
                            cmdEmpData.Parameters.AddWithValue("@chk", chk);
                            //// cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dtdata);
                            dtdata.TableName = "tbl_Buddy_GetDashboard"; //// set a proper table name, if necessary
                        }

                        conSqlConnection.Close();
                    }
                }

                return dtdata;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetAllBuddiesDashBoard
        /// <summary>
        /// Gets all buddies dash board.
        /// </summary>
        /// <returns>the DataTable.</returns>
        public DataTable GetAllBuddiesDashBoard()
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtdata = new DataTable();
            string query = "usp_702_GetAllBuddiesDashboard"; //// store procedure name comes here ////397757

            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            //// cmdEmpData.Parameters.AddWithValue("@User_Id", userid);                           
                            //// cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dtdata);
                            dtdata.TableName = "tbl_Buddy_GetDashboard"; //// set a proper table name, if necessary
                        }

                        conSqlConnection.Close();
                    }
                }

                return dtdata;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetJoineeAlertNotification
        /// <summary>
        /// Gets the joiner alert notification.
        /// </summary>
        /// <param name="joineeId">The joiner identifier.</param>
        /// <returns>the DataTable.</returns>
        public DataTable GetJoineeAlertNotification(string joineeId) ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtdata = new DataTable();
            string query = "usp_702_GetAlertNotificationJoinee"; //// store procedure name comes here ////397757

            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@Joinee_Id", joineeId);
                            daempData.Fill(dtdata);
                            //// dtData.TableName = "tbl_Buddy_GetDashboard"; //// set a proper table name, if necessary
                        }

                        conSqlConnection.Close();
                    }
                }

                return dtdata;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetJoineeOtherNotification
        /// <summary>
        /// Gets the joiner other notification.
        /// </summary>
        /// <param name="joineeId">The joiner identifier.</param>
        /// <returns>the DataTable.</returns>
        public DataTable GetJoineeOtherNotification(string joineeId) ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtdata = new DataTable();
            string query = "usp_702_GetOtherNotificationJoinee"; //// store procedure name comes here ////397757

            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@Joinee_Id", joineeId);
                            daempData.Fill(dtdata);
                            ////dtData.TableName = "tbl_Buddy_GetDashboard"; //// set a proper table name, if necessary
                        }

                        conSqlConnection.Close();
                    }
                }

                return dtdata;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetUserContactCard
        /// <summary>
        /// Gets the user contact card.
        /// </summary>
        /// <param name="associateId">The associate identifier.</param>
        /// <returns>the DataSet.</returns>
        /// <exception cref="System.Exception">Database exception occurred!!!</exception>
        public DataSet GetUserContactCard(string associateId) ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataSet dtsearch = new DataSet();
            string query = "usp_702_GetUserContactCard"; ////397757
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@AssociateId", associateId);
                            daempData.Fill(dtsearch);
                            ////dtSearch.TableName = "Questions";
                        }

                        conSqlConnection.Close();
                    }
                }

                return dtsearch;
            }
            catch
            {
                throw new Exception("Database exception occurred!!!");
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetBuddyFeedbackDetails
        /// <summary>
        /// Gets the buddy feedback details.
        /// </summary>
        /// <param name="joineeId">The joiner identifier.</param>
        /// <param name="buddyId">The buddy identifier.</param>
        /// <returns>the DataTable.</returns>
        public DataTable GetBuddyFeedbackDetails(string joineeId, string buddyId) ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtdata = new DataTable();
            string query = "usp_702_GetBuddyJoineeRelationStatus"; //// store procedure name comes here ////397757

            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@Joinee_Id", joineeId);
                            cmdEmpData.Parameters.AddWithValue("@Buddy_Id", buddyId);
                            //// cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dtdata);
                            dtdata.TableName = "tbl_Buddy_GetDashboard"; //// set a proper table name, if necessary
                        }

                        conSqlConnection.Close();
                    }
                }

                return dtdata;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetPendingConnectionsOfUser

        /// <summary>
        /// Gets the pending connections of user.
        /// </summary>
        /// <returns>the DataTable.</returns>
        public DataTable GetPendingConnectionsOfUser()
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dsempData = new DataTable();
            string query = "usp_702_GetPendingConnectionsOfUser"; //// store procedure name comes here ////397757
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            //// cmdEmpData.Parameters.AddWithValue("@chk", chk);
                            ////cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dsempData);
                        }
                    }
                }

                return dsempData;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetNotificationBuddyRequests
        /// <summary>
        /// Gets the notification buddy requests.
        /// </summary>
        /// <param name="buddyId">The buddy identifier.</param>
        /// <returns>the DataSet.</returns>
        public DataSet GetNotificationBuddyRequests(string buddyId)
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataSet dsempData = new DataSet();
            string query = "usp_702_GetBuddyNotification"; //// store procedure name comes here ////397757
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@Buddy_Id", buddyId);
                            //// cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dsempData);
                        }
                    }
                }

                return dsempData;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetNotificationBuddyDisconnectionAlerts
        /// <summary>
        /// Gets the notification buddy disconnection alerts.
        /// </summary>
        /// <param name="buddyId">The buddy identifier.</param>
        /// <returns>the DataTable.</returns>
        public DataTable GetNotificationBuddyDisconnectionAlerts(string buddyId) ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dsempData = new DataTable();
            string query = "usp_702_GetNotificationBuddyDisconnectionAlerts"; //// store procedure name comes here
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            ////cmdEmpData.Parameters.AddWithValue("@Joinee_Id", JoineeId);
                            cmdEmpData.Parameters.AddWithValue("@Buddy_Id", buddyId);
                            ////cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dsempData);
                        }
                    }
                }

                return dsempData;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetNotificationBuddyOther
        /// <summary>
        /// Gets the notification buddy other.
        /// </summary>
        /// <param name="buddyId">The buddy identifier.</param>
        /// <returns>the DataTable.</returns>
        public DataTable GetNotificationBuddyOther(string buddyId) ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dsempData = new DataTable();
            string query = "usp_702_GetOtherNotificationBuddy"; //// store procedure name comes here ////397757
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@Buddy_Id", buddyId);
                            ////cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dsempData);
                        }
                    }
                }

                return dsempData;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetFeedbackHistory

        /// <summary>
        /// Gets the feedback history.
        /// </summary>
        /// <param name="buddy_Id">The buddy_ identifier.</param>
        /// <returns>the DataTable.</returns>
        public DataTable GetFeedbackHistory(string buddy_Id)
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtdata = new DataTable();
            string query = "usp_702_GetFeedbackHistory"; //// store procedure name comes here ////397757

            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@Buddy_Id", buddy_Id);
                            //// cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dtdata);
                            dtdata.TableName = "tbl_Buddy_feedback"; //// set a proper table name, if necessary
                        }

                        conSqlConnection.Close();
                    }
                }

                return dtdata;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetRecommendableJoinees

        /// <summary>
        /// Returns User_Type Associate_Id
        /// </summary>
        /// <param name="supervisorId">The supervisor identifier.</param>
        /// <returns>User_Type and Associate_Id</returns>
        public DataTable GetRecommendableJoinees(string supervisorId)
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtdata = new DataTable();
            string query = "usp_702_GetRecommendableJoinees"; ////397757
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@SupervisorId", supervisorId);
                            daempData.Fill(dtdata);
                            dtdata.TableName = "Recommendable Joinees";
                        }

                        conSqlConnection.Close();
                    }
                }

                return dtdata;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetRecommendableAdvisors

        /// <summary>
        /// Returns User_Type Associate_Id
        /// </summary>
        /// <param name="joineeId">The joiner identifier.</param>
        /// <returns>User_Type and Associate_Id</returns>
        public DataSet GetRecommendableAdvisors(string joineeId)
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataSet dtdata = new DataSet();
            string query = "usp_702_GetRecommendableAdvisors_NA"; ////397757
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@joineeId", joineeId);
                            daempData.Fill(dtdata);
                           //// dtdata.TableName = "Recommendable Joinees";
                        }

                        conSqlConnection.Close();
                    }
                }

                return dtdata;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region SearchNAME

        /// <summary>
        /// Method for
        /// </summary>
        /// <param name="associateID">The associate identifier.</param>
        /// <returns>User_Type and Associate_Id</returns>
        public DataTable SearchNAME(string associateID)
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtdata = new DataTable();
            string query = "usp_702_SearchNAME"; //// store procedure name comes here ////397757
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@AssociateID", associateID);
                            cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dtdata);
                        }
                    }
                }

                return dtdata;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }
        #endregion ShowJoinees

        #region GetBuddyNotify
        /// <summary>
        /// Gets the buddy notify.
        /// </summary>
        /// <param name="buddyID">The buddy identifier.</param>
        /// <returns>the DataTable.</returns>
        public DataTable GetBuddyNotify(string buddyID)
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtdata = new DataTable();
            string query = "usp_702_GetBuddyNotify"; //// store procedure name comes here ////397757

            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@BuddyID", buddyID);
                            //// cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dtdata);
                            dtdata.TableName = "tbl_Buddy_Notification"; //// set a proper table name, if necessary
                        }

                        conSqlConnection.Close();
                    }
                }

                return dtdata;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetBuddyJoineeNotificationCount

        /// <summary>
        /// Gets the buddy joiner notification count.
        /// </summary>
        /// <param name="userid">The user id.</param>
        /// <param name="type">The type.</param>
        /// <returns>the DataTable.</returns>
        /// <exception cref="System.Exception">Database exception occurred!!!</exception>
        public DataTable GetBuddyJoineeNotificationCount(string userid, string type) ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtsearch = new DataTable();
            string query = "usp_702_BuddyJoineeNotificationCount"; ////397757
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@Userid", userid);
                            cmdEmpData.Parameters.AddWithValue("@Requestor_type", type);
                            daempData.Fill(dtsearch);
                            //// dtSearch.TableName = "Questions";
                        }

                        conSqlConnection.Close();
                    }
                }

                return dtsearch;
            }
            catch
            {
                throw new Exception("Database exception occurred!!!");
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetJoineeNotify

        /// <summary>
        /// Method to Notify
        /// </summary>
        /// <param name="joineeID">The joiner identifier.</param>
        /// <returns>Buddy Id</returns>
        public DataTable GetJoineeNotify(string joineeID)
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtempData = new DataTable();
            string query = "usp_702_GetJoineeNotification";
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@Joinee_Id", joineeID);
                            daempData.Fill(dtempData);
                        }

                        conSqlConnection.Close();
                    }
                }

                return dtempData;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetEnableStatusOfFeedButton

        /// <summary>
        /// Gets the enable status of feed button.
        /// </summary>
        /// <param name="joineeId">The joiner identifier.</param>
        /// <param name="buddyId">The buddy identifier.</param>
        /// <returns>the DataTable.</returns>
        public DataTable GetEnableStatusOfFeedButton(string joineeId, string buddyId) ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dsempData = new DataTable();
            string query = "usp_702_GetEnableStatusOfFeedButton"; //// store procedure name comes here
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@Joinee_Id", joineeId);
                            cmdEmpData.Parameters.AddWithValue("@Buddy_Id", buddyId);
                            //// cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dsempData);
                        }
                    }
                }

                return dsempData;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region CheckConnectionRequest

        /// <summary>
        /// Checks the connection request.
        /// </summary>
        /// <param name="joineeId">The joiner identifier.</param>
        /// <param name="buddyId">The buddy identifier.</param>
        /// <returns>System. Integer32.</returns>
        public int CheckConnectionRequest(string joineeId, string buddyId) ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            string query = "usp_702_CheckConnectionRequest_New"; //// store procedure name comes here ////397757
            int n = 0;
            DataTable dsempData = new DataTable();
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@JoineeId", joineeId);
                            cmdEmpData.Parameters.AddWithValue("@BuddyId", buddyId);
                            daempData.Fill(dsempData);
                            n = Convert.ToInt16(dsempData.Rows[0]["result"].ToString());
                        }

                        conSqlConnection.Close();
                    }
                }

                return n;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region BuddyConnectionRequest

        /// <summary>
        /// Method to send ConnectionRequest to Buddy
        /// </summary>
        /// <param name="joineeId">Join Id</param>
        /// <param name="buddyId">Buddy Id</param>
        /// <param name="requestType">Request Type</param>
        /// <param name="rejectionComment">Rejection Comment</param>
        /// <param name="supervisorRecommended">supervisor Recommended</param>
        /// <returns>JoinId, BuddyId, RequestType and RejectionComment</returns>
        /// Send, Accept, Reject
        /// in case of request type = reject
        public int BuddyConnectionRequest(string joineeId, string buddyId, string requestType, string rejectionComment, string supervisorRecommended) ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            int n = 0;
            string query = "usp_702_BuddyConnectionRequest"; //// store procedure name comes here ////397757

            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@JoineeId", joineeId);
                            cmdEmpData.Parameters.AddWithValue("@BuddyId", buddyId);
                            cmdEmpData.Parameters.AddWithValue("@RequestType", requestType);
                            cmdEmpData.Parameters.AddWithValue("@RejectionComment", rejectionComment);
                            cmdEmpData.Parameters.AddWithValue("@bit_IsSupervisorRecommended", supervisorRecommended);
                            n = cmdEmpData.ExecuteNonQuery();
                        }

                        conSqlConnection.Close();
                    }
                }

                return n;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region DisconnectionRequest

        /// <summary>
        /// Method to send DisconnectionRequest to Buddy
        /// </summary>
        /// <param name="joineeId">Join Id</param>
        /// <param name="buddyId">Buddy Id</param>
        /// <param name="bywhom">By Whom</param>
        /// <param name="requestType">Request Type</param>
        /// <returns>JoinId, BuddyId, RequestType and ByWhom</returns>
        /// by whom request is raised, joinne/buddy
        /// SEND, ACCEPT, REJECT
        public int DisconnectionRequest(string joineeId, string buddyId, string bywhom, string requestType) ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            string query = "usp_702_DisconnectionRequest"; //// store procedure name comes here ////397757
            int n = 0;
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@JoineeId", joineeId);
                            cmdEmpData.Parameters.AddWithValue("@BuddyId", buddyId);
                            cmdEmpData.Parameters.AddWithValue("@ByWhom", bywhom);
                            cmdEmpData.Parameters.AddWithValue("@RequestType", requestType);
                            n = cmdEmpData.ExecuteNonQuery();
                        }

                        conSqlConnection.Close();
                    }
                }

                return n;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetAssociateData

        /// <summary>
        /// Gets the associate data.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>the DataSet.</returns>
        public DataSet GetAssociateData(string userId) ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataSet ds = new DataSet();
            string query = "usp_702_GetAssociateData"; ////397757
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@UserId", userId);
                            daempData.Fill(ds);
                            ////dtSearch.TableName = "Questions";
                        }

                        conSqlConnection.Close();
                    }
                }

                return ds;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }
        #endregion

        #region RaiseSupervisorRequest

        /// <summary>
        /// Raises the supervisor request.
        /// </summary>
        /// <param name="joineeId">The joiner identifier.</param>
        /// <returns>System. Integer32.</returns> 
        public int RaiseSupervisorRequest(string joineeId) ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtdata = new DataTable();
            string query = "usp_702_RaiseSupervisorRequest"; //// store procedure name comes here ////397757
            int res = -1;
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@JoineeId", joineeId);
                            res = Convert.ToInt32(cmdEmpData.ExecuteScalar());
                            ////   cmdEmpData.ExecuteNonQuery();
                            ////daEmpData.Fill(dtData);
                            ////dtData.TableName = "BU list"; //// set a proper table name, if necessary
                        }
                    }
                }

                return res;
            }
            catch
            {
                throw;
            }
        }

        #endregion

        #region GetSupervisorId

        /// <summary>
        /// Gets the supervisor identifier.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>the DataTable.</returns>
        /// <exception cref="System.Exception">Database exception occurred!!!</exception>
        public DataTable GetSupervisorId(string userId)
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtdata = new DataTable();
            string query = "usp_702_GetSupervisorId";    ////397757        
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@UserId", userId);
                            cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dtdata);
                            dtdata.TableName = "SupervisorDetails";
                        }

                        conSqlConnection.Close();
                    }
                }

                return dtdata;
            }
            catch
            {
                throw new Exception("Database exception occurred!!!");
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetUnenrolledBuddies

        /// <summary>
        /// Method to retrieve all unenrolled Buddies of given supervisor
        /// </summary>
        /// <param name="supervisorId">The supervisor identifier.</param>
        /// <returns>Associate_Id and User_Type</returns>
        public DataTable GetUnenrolledBuddies(string supervisorId) ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtdata = new DataTable();
            string query = "usp_702_GetUnenrolledBuddies"; ////397757
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@SupervisorId", supervisorId);
                            daempData.Fill(dtdata);
                            dtdata.TableName = "Unenrolled Buddies";
                        }

                        conSqlConnection.Close();
                    }
                }

                return dtdata;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetSupervisorNotification

        /// <summary>
        /// Gets the supervisor notification.
        /// </summary>
        /// <param name="supervisorId">The supervisor identifier.</param>
        /// <returns>the DataTable.</returns>
        public DataTable GetSupervisorNotification(string supervisorId) ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtdata = new DataTable();
            string query = "usp_702_GetSupervisorNotification"; //// store procedure name comes here ////397757

            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@SupervisorId", supervisorId);
                            cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dtdata);
                            ////dtData.TableName = "BU list"; //// set a proper table name, if necessary
                        }
                    }
                }

                return dtdata;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region SearchAssoData

        /// <summary>
        /// Searches the associate data.
        /// </summary>
        /// <param name="searchText">The search text.</param>
        /// <returns>the DataTable.</returns>
        public DataTable SearchAssoData(string searchText) ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtdata = new DataTable();
            string query = "usp_702_Searchassociate"; //// store procedure name comes here ////397757

            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@SearchText", searchText);
                            cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dtdata);
                            ////dtData.TableName = "BU list"; //// set a proper table name, if necessary
                        }
                    }
                }

                return dtdata;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetConnectionDuration
        /// <summary>
        /// Gets the duration of the connection.
        /// </summary>
        /// <returns>the DataTable.</returns>
        /// <exception cref="System.Exception">Database exception occurred!!!</exception>
        public DataTable GetConnectionDuration()
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtdata = new DataTable();
            string query = "usp_702_GetConnectionDuration"; ////397757   
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dtdata);
                            dtdata.TableName = "ConnectionDuration";
                        }

                        conSqlConnection.Close();
                    }
                }

                return dtdata;
            }
            catch
            {
                throw new Exception("Database exception occurred!!!");
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region InstantMailer

        /// <summary>
        /// Method to Instant Mailer
        /// </summary>
        /// <param name="associateId">associate Id</param>
        /// <param name="requestType">Request Type</param>
        /// <returns>JoinId, BuddyId, ByWhom and RequestType</returns>
        public DataTable InstantMailer(string associateId, string requestType) ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtempData = new DataTable();
            string query = "usp_702_InstantMailerNew"; //// store procedure name comes here ////397757
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@AssociateId", associateId);
                            cmdEmpData.Parameters.AddWithValue("@RequestType", requestType);
                            daempData.Fill(dtempData);
                        }

                        conSqlConnection.Close();
                    }
                }

                return dtempData;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region IsAssociateEligible

        /// <summary>
        /// Returns  Associate_Id
        /// </summary>
        /// <param name="associate_Id">The associate_ identifier.</param>
        /// <returns>Associate Id</returns>
        public DataTable IsAssociateEligible(string associate_Id)
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            string query = "usp_702_IsAssociateEligible"; //// store procedure name comes here ////397757
            DataTable dt = new DataTable();
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@Associate_Id", associate_Id);
                            cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dt);
                        }

                        conSqlConnection.Close();
                    }
                }

                return dt;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetNewJoineeAssociateType

        /// <summary>
        /// Returns user type Associate_Id
        /// </summary>
        /// <param name="associate_Id">The associate_ identifier.</param>
        /// <returns>Associate Id</returns>
        public DataTable GetNewJoineeAssociateType(string associate_Id) ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            string query = "usp_702_GetNewJoineeAssociateType"; //// store procedure name comes here ////397757
            DataTable dt = new DataTable();
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@Asso_Id", associate_Id);
                            cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dt);
                        }

                        conSqlConnection.Close();
                    }
                }

                return dt;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetPageContent

        /// <summary>
        /// Returns user type Associate_Id
        /// </summary>
        /// <param name="countryId">Country Id</param>
        /// <param name="pageName">Page Name</param>
        /// <param name="role">user Role</param>
        /// <returns>Page content</returns>  
        public DataTable GetPageContent(string countryId, string pageName, string role) ////397757
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            string query = "usp_702_PageContent"; //// store procedure name comes here ////397757
            DataTable dt = new DataTable();
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@CountryId", countryId);
                            cmdEmpData.Parameters.AddWithValue("@PageName", pageName);
                            cmdEmpData.Parameters.AddWithValue("@Role", role);
                            cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dt);
                        }

                        conSqlConnection.Close();
                    }
                }

                return dt;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetAllPossibleAdvisors

        /// <summary>
        /// function for GetAllPossibleAdvisors
        /// </summary>
        /// <param name="joineeId">joins Id</param>
        /// <param name="buddyId">Buddy Id</param>
        /// <param name="location">Advisors location</param>
        /// <param name="buid">Advisors BU</param>
        /// <param name="projectId">Advisors Project</param>
        /// <param name="accountId">Advisors Account</param>
        /// <returns>All Advisors</returns>
        public DataTable GetAllPossibleAdvisors(string joineeId, string buddyId, string location, string buid, string projectId, string accountId)
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            string query = "usp_702_GetPossibleAdvisors_NA"; //// store procedure name comes here ////397757
            DataTable dt = new DataTable();
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@joineeId", joineeId);
                            cmdEmpData.Parameters.AddWithValue("@BuddyId", buddyId);
                            cmdEmpData.Parameters.AddWithValue("@Location", location);
                            cmdEmpData.Parameters.AddWithValue("@BUId", buid);
                            cmdEmpData.Parameters.AddWithValue("@ProjectId", projectId);
                            cmdEmpData.Parameters.AddWithValue("@AccountId", accountId);
                            cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dt);
                        }
                    }
                }

                return dt;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetFeedbackQuestions

        /// <summary>
        /// Gets the feedback questions.
        /// </summary>
        /// <param name="buddyId">buddy Id.</param>
        /// <param name="joineeId">joiner Id.</param>
        /// <param name="countryId">country Id.</param>
        /// <param name="reviewType">review Type.</param>
        /// <returns>the DataTable.</returns>
        public DataTable GetFeedbackQuestions(string buddyId, string joineeId, string countryId, string reviewType)
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtdata = new DataTable();
            string query = "usp_702_GetFeedbackQuestions_NA"; //// store procedure name comes here ////397757

            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@Buddy_Id", buddyId);
                            cmdEmpData.Parameters.AddWithValue("@Joinee_Id", joineeId);
                            cmdEmpData.Parameters.AddWithValue("@Country_Id", countryId);
                            cmdEmpData.Parameters.AddWithValue("@ReviewType", reviewType);
                            //// cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dtdata);
                            dtdata.TableName = "UserFeedback"; //// set a proper table name, if necessary
                        }

                        conSqlConnection.Close();
                    }
                }

                return dtdata;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetBuddyAlerts

        /// <summary>
        /// Gets the Buddy alerts.
        /// </summary>
        /// <param name="buddyId">The buddy identifier.</param>
        /// <returns>the DataTable.</returns>
        public DataTable GetBuddyAlerts(string buddyId)
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtdata = new DataTable();
            string query = "usp_702_GetAllAdvisorAlerts_NA"; //// store procedure name comes here ////397757

            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@Buddy_Id", buddyId);
                            //// cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dtdata);
                            dtdata.TableName = "UserFeedback"; //// set a proper table name, if necessary
                        }

                        conSqlConnection.Close();
                    }
                }

                return dtdata;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetJoineeAlerts

        /// <summary>
        /// Gets the alerts.
        /// </summary>
        /// <param name="joineeId">joiner Id.</param>
        /// <returns>the DataTable.</returns>
        public DataTable GetJoineeAlerts(string joineeId)
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtdata = new DataTable();
            string query = "usp_702_GetAllNewHireAlerts_NA"; //// store procedure name comes here ////397757

            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@Joinee_Id", joineeId);
                            //// cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dtdata);
                            dtdata.TableName = "UserFeedback"; //// set a proper table name, if necessary
                        }

                        conSqlConnection.Close();
                    }
                }

                return dtdata;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region SetFeedbackQuestions

        /// <summary>
        /// Method to SetFeedbackQuestions
        /// </summary>
        /// <param name="joineeId">The joiner identifier.</param>
        /// <param name="buddyId">The buddy identifier.</param>
        /// <param name="list">The list.</param>
        public void SetFeedbackQuestions(string joineeId, string buddyId, string list)
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            string query = "usp_702_SetJoineeBuddyFeedbackRating_NA"; //// store procedure name comes here

            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@Joinee_Id", joineeId);
                            cmdEmpData.Parameters.AddWithValue("@Buddy_Id", buddyId);
                            cmdEmpData.Parameters.AddWithValue("@strfeedback", list);
                            cmdEmpData.ExecuteNonQuery();
                        }

                        conSqlConnection.Close();
                    }
                }
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetAverageFeedback
        /// <summary>
        /// Gets the average feedback.
        /// </summary>
        /// <param name="buddyId">The buddy identifier.</param>
        /// <param name="joineeId">The joiner identifier.</param>
        /// <param name="reviewType">Type of the review.</param>
        /// <returns>the DataTable.</returns>
        public DataTable GetAverageFeedback(string buddyId, string joineeId, string reviewType)
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtdata = new DataTable();
            string query = "usp_702_GetFeedbackQuestions_NA"; //// store procedure name comes here

            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@Buddy_Id", buddyId);
                            cmdEmpData.Parameters.AddWithValue("@Joinee_Id", joineeId);
                            cmdEmpData.Parameters.AddWithValue("@ReviewType", reviewType);
                            //// cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dtdata);
                            dtdata.TableName = "UserFeedback"; //// set a proper table name, if necessary
                        }

                        conSqlConnection.Close();
                    }
                }

                return dtdata;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region SearchProject

        /// <summary>
        /// Searches the project.
        /// </summary>
        /// <param name="searchText">The search text.</param>
        /// <returns>the DataTable.</returns>
        public DataTable SearchProject(string searchText)
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtdata = new DataTable();
            string query = "usp_702_GetProjectNames_NA"; //// store procedure name comes here

            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@ProjectNameText", searchText);
                            cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dtdata);
                            ////dtData.TableName = "BU list"; //// set a proper table name, if necessary
                        }
                    }
                }

                return dtdata;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region SearchBU

        /// <summary>
        /// Searches the bu.
        /// </summary>
        /// <param name="searchText">The search text.</param>
        /// <returns>the DataTable.</returns>
        public DataTable SearchBU(string searchText)
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtdata = new DataTable();
            string query = "usp_702_GetBUNames_NA"; //// store procedure name comes here

            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@BUNameText", searchText);
                            cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dtdata);
                            ////dtData.TableName = "BU list"; //// set a proper table name, if necessary
                        }
                    }
                }

                return dtdata;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region SearchAccount
        /// <summary>
        /// Searches the account.
        /// </summary>
        /// <param name="searchText">The search text.</param>
        /// <returns>the DataTable.</returns>
        public DataTable SearchAccount(string searchText)
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataTable dtdata = new DataTable();
            string query = "usp_702_GetAccountNames_NA"; //// store procedure name comes here

            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@AccountNameText", searchText);
                            cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dtdata);
                            ////dtData.TableName = "BU list"; //// set a proper table name, if necessary
                        }
                    }
                }

                return dtdata;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region GetLocation

        /// <summary>
        /// Gets the location.
        /// </summary>
        /// <param name="associateId">The associate identifier.</param>
        /// <returns>the DataTable.</returns>
        public DataSet GetLocation(string associateId)
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataSet dtdata = new DataSet();
            string query = "usp_702_GetLocation_NA"; //// store procedure name comes here

            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@AssociateId", associateId);
                            cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dtdata);
                            ////dtData.TableName = "BU list"; //// set a proper table name, if necessary
                        }
                    }
                }

                return dtdata;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region ShowHideTiles

       /// <summary>
        /// Returns  result
       /// </summary>
        /// <param name="associate_Id">associate_ identifier</param>
       /// <param name="userType">user Type</param>
        /// <returns>result 1 or 2 or 3</returns>
        public DataTable ShowHideTiles(string associate_Id, string userType)
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            string query = "usp_702_Show_hide_Tiles"; //// store procedure name comes here ////397757
            DataTable dt = new DataTable();
            try
            {
                if (!string.IsNullOrEmpty(this.mconnectionString))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@UserId", associate_Id);
                            cmdEmpData.Parameters.AddWithValue("@UserType", userType);
                            cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dt);
                        }

                        conSqlConnection.Close();
                    }
                }

                return dt;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion

        #region Dispose

        /// <summary>
        /// Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.
        /// </summary>
        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// Releases unmanaged and - optionally - managed resources.
        /// </summary>
        /// <param name="disposeManagedResources"><c>true</c> to release both managed and unmanaged resources; <c>false</c> to release only unmanaged resources.</param>
        protected virtual void Dispose(bool disposeManagedResources)
        {
            if (!this.disposed)
            {
                this.disposed = true;
            }
        }
         #endregion
    }
}
#region
#endregion

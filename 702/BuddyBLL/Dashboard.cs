// -----------------------------------------------------------------------
// <copyright file="Dashboard.cs" company="Cognizant Technology Pvt Ltd">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace BuddyBLL
{
    using System;
    using System.Collections; 
    using System.Collections.Generic;
    using System.Data;
    using System.Data.SqlClient;
    using System.Diagnostics;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Text;
    using System.Web;
    using System.Web.UI;
    using System.Web.UI.WebControls;
    using BuddyBLL.ExceptionLoggingService;   
    using BuddyDAL;
       
    ////using BuddyBLL.ExceptionLoggingService;

    /// <summary>
    /// Class for details of admin dashboard
    /// </summary>.
    [DataContract]
    public class Dashboard
    {
        /// <summary>
        /// object to hold all admin list
        /// </summary>
        [DataMember]
        private User[] allAdmins = null;

        /// <summary>
        /// object to hold all BU name list
        /// </summary>
        [DataMember]
        private BU[] bunameList = null;

        /// <summary>
        /// object to hold dashboard data
        /// </summary>
        [DataMember]
        private BU[] getDashBoard = null;

        /// <summary>
        /// Initializes a new instance of the <see cref="Dashboard"/> class.
        /// </summary>
        #region Dashboard
        public Dashboard()
        {
        }
        #endregion

        /// <summary>
        /// Gets or sets All Admins
        /// </summary>
        public User[] AllAdmins
        {
            get { return this.allAdmins; }
            set { this.allAdmins = value; }
        }

        /// <summary>
        /// Gets or sets name List
        /// </summary>
        public BU[] BUNameList 
         {
             get { return this.bunameList; }
             set { this.bunameList = value; }
        }   

        /// <summary>
        /// Gets or sets get DashBoard
        /// </summary>
        public BU[] GetDashBoard
        {
            get { return this.getDashBoard; }
            set { this.getDashBoard = value; }
        }

        /// <summary>
        /// Gets or sets Count of connected buddies
        /// </summary>
        [DataMember]
        public int Connected_buddies { get; set; }

        /// <summary>
        ///  Gets or sets Count of Non_Connected buddies
        /// </summary>
        [DataMember]
        public int NonConnected_buddies { get; set; }

        /// <summary>
        /// Gets or sets count of Registered buddies
        /// </summary>
        [DataMember]
        public int Registered_buddies { get; set; }

        /// <summary>
        ///  Gets or sets count of Non_Registered buddies
        /// </summary>
        [DataMember]
        public int Non_Registered_buddies { get; set; }

        /// <summary>
        /// Gets or sets count of active connections
        /// </summary>
        [DataMember]
        public int NoOfActiveConnections { get; set; }

        /// <summary>
        /// Gets or sets count of joiners
        /// </summary>
        [DataMember]
        public int NoOfJoinees { get; set; }

        /// <summary>
        /// Gets or sets count of active buddies
        /// </summary>
        [DataMember]
        public int NoOfActiveBuddies { get; set; }        ////reg + unreg

        /// <summary>
        /// Method to get details of Export To Excel 
        /// </summary>
        /// <param name="countryId">Country Id</param>
        /// <returns>Export To Excel</returns>
        #region ExportToExcel
        public DataSet ExportToExcel(string countryId = "0")
        {
            DALTransaction d = new DALTransaction();
            return d.ExportToExcel(countryId);
        }
        #endregion       

        /// <summary>
        /// Initializes a new instance of class BU
        /// </summary>
        public class BU
        {
            /// <summary>
            /// Gets or sets count of Department Id
            /// </summary>
            [DataMember]
            public string DeptId { get; set; }

            /// <summary>
            /// Gets or sets count of Department Description
            /// </summary>
            [DataMember]
            public string DeptDesc { get; set; }

            /// <summary>
            /// Gets or sets count of Buddy ID
            /// </summary>
            [DataMember]
            public string BuddyID { get; set; }

            /// <summary>
            /// Gets or sets count of Associate Name
            /// </summary>
            [DataMember]
            public string AssociateName { get; set; }

            /// <summary>
            /// Gets or sets count of connections
            /// </summary>
            [DataMember]
            public string Connections { get; set; }
         }      
    }
}

#region
#endregion

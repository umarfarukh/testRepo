//-----------------------------------------------------------------------
// <copyright file="VendorDashboard.cs" company="CTS">
//     Copyright (c) . All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

/*About me
*******************************************************
* Name space        : OneC.OnBoarding.DC
* Class Name       : VendorDashboard.cs
* Version          : 1.0
* Type             : DataContract
* Purpose          : Data contracts for DashBoards
* Created date     : 2014-May-05
* Author           : 298589
* Reviewed by      :
*------------------------------------------------------
*                  Change history
*------------------------------------------------------
* Date             :
* Author           :
* Signature        :
* Reviewed by      :
* Change details   :
* -----------------------------------------------------
*******************************************************
 */

namespace OneC.OnBoarding.DC.BGVDC
{
    using System;
    using System.Collections.ObjectModel;
    using System.Runtime.Serialization;

    /// <summary>
    /// Represents dummy class
    /// </summary> 
    [Serializable]
    public class VendorDashboard
    {
        #region Properties

        /// <summary>
        /// Gets or sets Action
        /// </summary>
        [DataMember(Name = "Action", Order = 1)]
        public string Action { get; set; }
        #endregion
    }

    /// <summary>
    /// Represents the document list of items
    /// </summary>
    [Serializable]
    public class DocListItems
    {
        #region Properties

        /// <summary>
        /// Gets or sets Action
        /// </summary>
        [DataMember(Name = "Action", Order = 4)]
        public string Action
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets DocId
        /// </summary>
        [DataMember(Name = "DocId", Order = 1)]
        public string DocId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets Status
        /// </summary>
        [DataMember(Name = "Status", Order = 2)]
        public int Status
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets SubStatus
        /// </summary>
        [DataMember(Name = "SubStatus", Order = 3)]
        public int SubStatus
        {
            get;
            set;
        }

        #endregion Properties
    }

    /// <summary>
    /// Represents the report items
    /// </summary>
    public class ReportItems
    {
        #region Properties

        /// <summary>
        /// Gets or sets ReportSubStatus
        /// </summary>
        [DataMember(Name = "ReportSubStatus", Order = 1)]
        public int ReportSubStatus
        {
            get;
            set;
        }

        #endregion Properties
    }

    /// <summary>
    /// Represents the list of report items
    /// </summary>
    [Serializable]
    public class ReportListItems
    {
        #region Properties

        /// <summary>
        /// Gets or sets FinalStatus
        /// </summary>
        [DataMember(Name = "FinalStatus", Order = 1)]
        public int FinalStatus
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets FinalSubStatus
        /// </summary>
        [DataMember(Name = "FinalSubStatus", Order = 2)]
        public int FinalSubStatus
        {
            get;
            set;
        }

        #endregion Properties
    }

    /// <summary>
    /// Represents the pop up window of vendor candidate information screen
    /// </summary>
    [Serializable]
    public class VendorCandidateInfo
    {
        #region Properties

        /// <summary>
        /// Gets or sets CandidateId
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 1)]
        public long CandidateId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets InfoXML
        /// </summary>
        [DataMember(Name = "InfoXML", Order = 3)]
        public string InfoXML
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets SessionId
        /// </summary>
        [DataMember(Name = "SessionId", Order = 2)]
        public long SessionId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets SP Mode
        /// </summary>
        [DataMember(Name = "SpMode", Order = 3)]
        public int SpMode
        {
            get;
            set;
        }

        #endregion Properties

        #region Methods

        /// <summary>
        /// Represents the method to dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        #endregion Methods
    }

    /// <summary>
    /// Represents the dashboard parameters of vendor dashboard
    /// </summary>
    public class VendorDashboardData
    {
        #region Properties

        /// <summary>
        /// Gets or sets AdSearch
        /// </summary>
        [DataMember(Name = "AdSearch", Order = 3)]
        public string AdSearch
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets LeftPanel
        /// </summary>
        [DataMember(Name = "LeftPanel", Order = 1)]
        public string LeftPanel
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets RightPanel
        /// </summary>
        [DataMember(Name = "RightPanel", Order = 2)]
        public string RightPanel
        {
            get;
            set;
        }

        #endregion Properties

        #region Methods

        /// <summary>
        /// Represents the method to dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        #endregion Methods
    }

    /// <summary>
    /// Represents the vendor dashboard parameters
    /// </summary>
    [DataContract(Name = "VendorDashboard", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/BGVDC/")]
    [Serializable]
    public class VendorDashboardParams
    {
        #region Properties

        /// <summary>
        /// Gets or sets AssociateId
        /// </summary>
        [DataMember(Name = "AssociateId", Order = 3)]
        public int AssociateId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets CandidateId
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 2)]
        public long CandidateId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets CanStatus
        /// </summary>
        [DataMember(Name = "CanStatus", Order = 4)]
        public int CanStatus
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets CategoryId
        /// </summary>
        [DataMember(Name = "CategoryId", Order = 7)]
        public int CategoryId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets From
        /// </summary>
        [DataMember(Name = "From", Order = 6)]
        public string From
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets ReportStatus
        /// </summary>
        [DataMember(Name = "ReportStatus", Order = 5)]
        public int ReportStatus
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets SessionId
        /// </summary>
        [DataMember(Name = "SessionId", Order = 1)]
        public long SessionId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets SP Mode
        /// </summary>
        [DataMember(Name = "SpMode", Order = 8)]
        public int SpMode
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets To
        /// </summary>
        [DataMember(Name = "To", Order = 9)]
        public string To
        {
            get;
            set;
        }

        #endregion Properties

        #region Methods

        /// <summary>
        /// Represents the method to dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        #endregion Methods
    }

    /// <summary>
    /// Represents the document list screen of vendor dashboard
    /// </summary>
    [Serializable]
    public class VendorDocListInfoParams
    {
        #region Properties

        /// <summary>
        /// Gets or sets Action
        /// </summary>
        [DataMember(Name = "Action", Order = 6)]
        public string Action
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets CandidateBGVAssignComponentDetail
        /// </summary>
        [DataMember(Name = "CandidateBgvAssignComponentDetail", Order = 7)]
        public int CandidateBgvAssignComponentDetail
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets CandidateBGVConComponentDetail
        /// </summary>
        [DataMember(Name = "CandidateBgvConComponentDetail", Order = 8)]
        public int CandidateBgvConComponentDetail
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets CandidateBGVVendorMapping
        /// </summary>
        [DataMember(Name = "CandidateBgvVendorMapping", Order = 9)]
        public int CandidateBgvVendorMapping
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets CandidateId
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 2)]
        public int CandidateId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets DocList
        /// </summary>
        [DataMember(Name = "DocList", Order = 10)]
        public Collection<DocListItems> DocList
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets FinalStatus
        /// </summary>
        [DataMember(Name = "FinalStatus", Order = 12)]
        public int FinalStatus
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets FinalSubStatus
        /// </summary>
        [DataMember(Name = "FinalSubStatus", Order = 5)]
        public int FinalSubStatus
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets SessionId
        /// </summary>
        [DataMember(Name = "SessionId", Order = 1)]
        public int SessionId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets SP Mode
        /// </summary>
        [DataMember(Name = "SpMode", Order = 11)]
        public int SpMode
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets Status
        /// </summary>
        [DataMember(Name = "Status", Order = 3)]
        public int Status
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets SubStatus
        /// </summary>
        [DataMember(Name = "SubStatus", Order = 4)]
        public int SubStatus
        {
            get;
            set;
        }

        #endregion Properties

        #region Methods

        /// <summary>
        /// Represents the method to dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        #endregion Methods
    }

    /// <summary>
    /// Represents the document list screen of vendor dashboard
    /// </summary>
    [Serializable]
    public class VendorDocListResponse
    {
        /// <summary>
        /// Gets or sets DocList
        /// </summary>        #region Properties
        [DataMember(Name = "DocList", Order = 1)]
        public Collection<DocListItems> DocList
        {
            get;
            set;
        }

        #region Methods

        /// <summary>
        /// Represents the method to dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        #endregion Methods
    }
}
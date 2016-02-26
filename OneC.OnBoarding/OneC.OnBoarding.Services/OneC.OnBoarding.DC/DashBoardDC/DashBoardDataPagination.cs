// <copyright file = "DashBoardDataPagination.cs" company = "CTS">
// Copyright (c) OnBoarding_DashBoardDataPagination. All rights reserved.
// </copyright>

namespace OneC.OnBoarding.DC.CandidateDC
{
    #region Namespaces    
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Web;
    using OneC.OnBoarding.DC.DashBoardDC;
    #endregion

    /// <summary>
    /// Data Contract for DashboardData Pagination
    /// </summary>
    [DataContract(Name = "DashBoardDataPagination", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/DashBoardDC/")]
    [Serializable]
    public class DashBoardDataPagination : ApprovalDetails
    {
        /// <summary>
        /// Gets or sets Page Size
        /// </summary>
        [DataMember(Name = "PageSize", Order = 1)]
        public long PageSize { get; set; }

        /// <summary>
        /// Gets or sets Page No
        /// </summary>
        [DataMember(Name = "PageNo", Order = 2)]
        public long PageNo { get; set; }

        /// <summary>
        /// Gets or sets TotalCount of Records
        /// </summary>
        [DataMember(Name = "TotalRecords", Order = 3)]
        public long TotalRecords { get; set; }

        /// <summary>
        /// Gets or sets RowNumber
        /// </summary>
        [DataMember(Name = "RowNumber", Order = 3)]
        public long RowNumber { get; set; }

        /// <summary>
        /// Gets or sets grid = 0 Excel =1 
        /// </summary>
        [DataMember(Name = "Excel", Order = 4)]
        public long Excel { get; set; }

        /// <summary>
        /// Gets or sets PreJoiningCount
        /// </summary>
        [DataMember(Name = "PreJoiningCount", Order = 5)]
        public long PreJoiningCount { get; set; }

        /// <summary>
        /// Gets or sets PostJoiningCount
        /// </summary>
        [DataMember(Name = "PostJoiningCount", Order = 6)]
        public long PostJoiningCount { get; set; }

        /// <summary>
        /// Gets or sets JoiningProcessId
        /// </summary>
        [DataMember(Name = "ProcessId", Order = 7)]
        public long JoiningProcessId { get; set; }

        /// <summary>
        /// Gets or sets LaptopCount
        /// </summary>
        [DataMember(Name = "LaptopCount", Order = 8)]
        public long LaptopCount { get; set; }

        /// <summary>
        /// Gets or sets CellPhoneCount
        /// </summary>
        [DataMember(Name = "CellPhoneCount", Order = 9)]
        public long CellPhoneCount { get; set; }

        /// <summary>
        /// Gets or sets BlackberryCount
        /// </summary>
        [DataMember(Name = "BlackberryCount", Order = 10)]
        public long BlackberryCount { get; set; }

        /// <summary>
        /// Gets or sets ClientEquipmentCount
        /// </summary>
        [DataMember(Name = "ClientEquipmentCount", Order = 11)]
        public long ClientEquipmentCount { get; set; }

        /// <summary>
        /// Gets or sets CheckCountry
        /// </summary>
        [DataMember(Name = "CheckCountry", Order = 12)]////to get switzerland country flag
        public string CheckCountry { get; set; }

        /// <summary>
        /// Gets or sets DataCardCount
        /// </summary>
        [DataMember(Name = "DataCardCount", Order = 13)]
        public long DataCardCount { get; set; }

        /// <summary>
        /// Gets or sets RequestId
        /// </summary>
        ////[DataMember(Name = "RequestId", Order = 8)]
        ////public int RequestId { get; set; }

        /// <summary>
        /// Gets or sets CandidateId
        /// </summary>
        ////[DataMember(Name = "CandidateId", Order = 2)]
        ////public int CandidateId { get; set; }

        /// <summary>
        /// Gets or sets Description
        /// </summary>
        ////[DataMember(Name = "Description", Order = 9)]
        ////public string Description { get; set; }

        /// <summary>
        /// Gets or sets ApproverId
        /// </summary>
        ////[DataMember(Name = "ApproverId", Order = 10)]
        ////public int ApproverId { get; set; }

        /// <summary>
        /// Gets or sets GroupType
        /// </summary>
        ////[DataMember(Name = "GroupType", Order = 11)]
        ////public int GroupType { get; set; }

        /// <summary>
        /// Gets or sets TrackingInfo
        /// </summary>
        ////[DataMember(Name = "TrackingInfo", Order = 12)]
        ////public int TrackingInfo { get; set; }

        /// <summary>
        /// Gets or sets LocationCode
        /// </summary>
        ////[DataMember(Name = "LocationCode", Order = 7)]
        ////public int LocationCode { get; set; }

        ///// <summary>
        ///// Gets or sets RequestStatus
        ///// </summary>
        ////[DataMember(Name = "RequestStatus", Order = 13)]
        ////public int RequestStatus { get; set; }

        ///// <summary>
        ///// Gets or sets Type
        ///// </summary>
        ////[DataMember(Name = "Type", Order = 14)]
        ////public int Type { get; set; }

        ///// <summary>
        ///// Gets or sets RequestApprovedDate
        ///// </summary>
        ////[DataMember(Name = "RequestApprovedDate", Order = 15)]
        ////public DateTime RequestApprovedDate { get; set; }

        ///// <summary>
        ///// Gets or sets PendingTo
        ///// </summary>
        ////[DataMember(Name = "PendingTo", Order = 16)]
        ////public int PendingTo { get; set; }

        ///// <summary>
        ///// Gets or sets Comments
        ///// </summary>
        ////[DataMember(Name = "Comments", Order = 17)]
        ////public string Comments { get; set; }

        ///// <summary>
        ///// Gets or sets ApprovalRequestStatus
        ///// </summary>
        ////[DataMember(Name = "approvalRequestStatus", Order = 18)]
        ////public ApprovalRequestStatus approvalRequestStatus { get; set; }

        ////[DataMember(Name = "TypeName", Order = 19)]
        ////public string TypeName { get; set; }

        ////[DataMember(Name = "RequestStatusId", Order = 20)]
        ////public int RequestStatusId { get; set; }

        ////[DataMember(Name = "RequestStatusDesc", Order = 21)]
        ////public string RequestStatusDesc { get; set; }
    }

    /// <summary>
    /// List for Dashboard Data Pagination
    /// </summary>
    [Serializable]
    public class DashBoardDataPaginationList : List<DashBoardDataPagination>
    {
    }
}

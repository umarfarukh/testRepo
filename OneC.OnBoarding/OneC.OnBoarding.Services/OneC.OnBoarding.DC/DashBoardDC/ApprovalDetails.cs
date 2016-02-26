// <copyright file = "ApprovalDetails.cs" company = "CTS">
// Copyright (c) OnBoarding_ApprovalDetails. All rights reserved.
// </copyright>

namespace OneC.OnBoarding.DC.DashBoardDC
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Linq;    
    using System.Runtime.Serialization;
    using System.Text;
    using OneC.OnBoarding.DC.CandidateDC;
    #endregion

    /// <summary>
    /// Data Contract for Approval Details
    /// </summary>
    [DataContract(Name = "ApprovalDetails", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/DashBoardDC/")]
    [Serializable]
    public class ApprovalDetails 
    {
        /// <summary>
        /// Gets or sets RequestId
        /// </summary>
        [DataMember(Name = "RequestId", Order = 1)]
        public int RequestId { get; set; }

        //// [DataMember(Name = "CandidateId", Order = 2)]
        //// public int CandidateId { get; set; }

        /// <summary>
        /// Gets or sets Description
        /// </summary>
        [DataMember(Name = "Description", Order = 2)]
        public string Description { get; set; }

        /// <summary>
        /// Gets or sets ApproverId
        /// </summary>
        [DataMember(Name = "ApproverId", Order = 3)]
        public int ApproverId { get; set; }

        /// <summary>
        /// Gets or sets Group Type
        /// </summary>
        [DataMember(Name = "GroupType", Order = 4)]
        public int GroupType { get; set; }

        /// <summary>
        /// Gets or sets Tracking Info
        /// </summary>
        [DataMember(Name = "TrackingInfo", Order = 5)]
        public int TrackingInfo { get; set; }

        //// [DataMember(Name = "LocationCode", Order = 7)]
        //// public int LocationCode { get; set; }

        /// <summary>
        /// Gets or sets Request Status
        /// </summary>
        [DataMember(Name = "RequestStatus", Order = 6)]
        public int RequestStatus { get; set; }

        /// <summary>
        /// Gets or sets Type
        /// </summary>
        [DataMember(Name = "Type", Order = 7)]
        public int Type { get; set; }

        /// <summary>
        /// Gets or sets Request Approved Date
        /// </summary>
        [DataMember(Name = "RequestApprovedDate", Order = 8)]
        public DateTime RequestApprovedDate { get; set; }

        /// <summary>
        /// Gets or sets Pending To
        /// </summary>
        [DataMember(Name = "PendingTo", Order = 9)]
        public int PendingTo { get; set; }
        
        /// <summary>
        /// Gets or sets Comments
        /// </summary>
        [DataMember(Name = "Comments", Order = 10)]
        public string Comments { get; set; }

        // [DataMember(Name = "approvalRequestStatus", Order = 11)]
        // public ApprovalRequestStatus approvalRequestStatus { get; set; }

        /// <summary>
        /// Gets or sets TypeName
        /// </summary>
        [DataMember(Name = "TypeName", Order = 11)]
        public string TypeName { get; set; }

        /// <summary>
        /// Gets or sets RequestStatusId
        /// </summary>
        [DataMember(Name = "RequestStatusId", Order = 12)]
        public int RequestStatusId { get; set; }

        /// <summary>
        /// Gets or sets RequestStatus Description
        /// </summary>
        [DataMember(Name = "RequestStatusDesc", Order = 13)]
        public string RequestStatusDesc { get; set; }

        /// <summary>
        /// Gets or sets Laptop
        /// </summary>
        [DataMember(Name = "Laptop", Order = 14)]
        public int Laptop { get; set; }

        /// <summary>
        /// Gets or sets Cellphone
        /// </summary>
        [DataMember(Name = "Cellphone", Order = 15)]
        public int Cellphone { get; set; }

        /// <summary>
        /// Gets or sets Blackberry
        /// </summary>
        [DataMember(Name = "Blackberry", Order = 16)]
        public int Blackberry { get; set; }

        /// <summary>
        /// Gets or sets CandidateId
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 17)]
        public long CandidateId { get; set; }

        /// <summary>
        /// Gets or sets SessionId
        /// </summary>
        [DataMember(Name = "SessionId", Order = 18)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets LaptopApproverId
        /// </summary>
        [DataMember(Name = "LaptopApproverId", Order = 19)]
        public int LaptopApproverId { get; set; }

        /// <summary>
        /// Gets or sets CellphoneApproverId
        /// </summary>
        [DataMember(Name = "CellphoneApproverId", Order = 20)]
        public int CellphoneApproverId { get; set; }

        /// <summary>
        /// Gets or sets BlackberryApproverId
        /// </summary>
        [DataMember(Name = "BlackberryApproverId", Order = 21)]
        public int BlackberryApproverId { get; set; }

        /// <summary>
        /// Gets or sets ContractorEquipment
        /// </summary>
        [DataMember(Name = "ContractorEquipment", Order = 22)]
        public int ContractorEquipment { get; set; }

        /// <summary>
        /// Gets or sets ContractorEquipmentApproverId
        /// </summary>
        [DataMember(Name = "ContractorEquipmentApproverId", Order = 23)]
        public int ContractorEquipmentApproverId { get; set; }

        /// <summary>
        /// Gets or sets BlackBerryZ10
        /// </summary>
        [DataMember(Name = "BlackberryZ10", Order = 24)]
        public int BlackberryZ10 { get; set; }

        /// <summary>
        /// Gets or sets Samsung s3
        /// </summary>
        [DataMember(Name = "Samsungs3", Order = 25)]
        public int Samsungs3 { get; set; }

        /// <summary>
        /// Gets or sets Samsung s4
        /// </summary>
        [DataMember(Name = "Samsungs4", Order = 26)]
        public int Samsungs4 { get; set; }

        /// <summary>
        /// Gets or sets Samsung s5
        /// </summary>
        [DataMember(Name = "Samsungs5", Order = 27)]
        public int Samsungs5 { get; set; }

        /// <summary>
        /// Gets or sets SamsungNote3
        /// </summary>
        [DataMember(Name = "SamsungNote3", Order = 28)]
        public int SamsungNote3 { get; set; }

        /// <summary>
        /// Gets or sets IPhone 4S
        /// </summary>
        [DataMember(Name = "Iphone4S", Order = 29)]
        public int IPhone4s { get; set; }

        /// <summary>
        /// Gets or sets IPhone5C
        /// </summary>
        [DataMember(Name = "IPhone5C", Order = 30)]
        public int IPhone5c { get; set; }

        /// <summary>
        /// Gets or sets IPhone5S
        /// </summary>
        [DataMember(Name = "IPhone5S", Order = 31)]
        public int IPhone5s { get; set; }

        /// <summary>
        /// Gets or sets BlackberryZ10ApproverId
        /// </summary>
        [DataMember(Name = "BlackberryZ10ApproverId", Order = 32)]
        public int BlackberryZ10ApproverId { get; set; }

        /// <summary>
        /// Gets or sets SamsungS3ApproverId
        /// </summary>
        [DataMember(Name = "SamsungS3ApproverId", Order = 33)]
        public int SamsungS3ApproverId { get; set; }

        /// <summary>
        /// Gets or sets SamsungS4ApproverId
        /// </summary>
        [DataMember(Name = "SamsungS4ApproverId", Order = 34)]
        public int SamsungS4ApproverId { get; set; }

        /// <summary>
        /// Gets or sets SamsungS5ApproverId
        /// </summary>
        [DataMember(Name = "SamsungS5ApproverId", Order = 35)]
        public int SamsungS5ApproverId { get; set; }

        /// <summary>
        /// Gets or sets SamsungNote3ApproverId
        /// </summary>
        [DataMember(Name = "SamsungNote3ApproverId", Order = 36)]
        public int SamsungNote3ApproverId { get; set; }

        /// <summary>
        /// Gets or sets IPhone4SApproverId
        /// </summary>
        [DataMember(Name = "IPhone4SApproverId", Order = 37)]
        public int IPhone4SApproverId { get; set; }

        /// <summary>
        /// Gets or sets IPhone5SApproverId
        /// </summary>
        [DataMember(Name = "IPhone5SApproverId", Order = 38)]
        public int IPhone5SApproverId { get; set; }

        /// <summary>
        /// Gets or sets IPhone5CApproverId
        /// </summary>
        [DataMember(Name = "IPhone5CApproverId", Order = 39)]
        public int IPhone5CApproverId { get; set; }

        /// <summary>
        /// Gets or sets LGG2
        /// </summary>
        [DataMember(Name = "LGG2ApproverId", Order = 40)]
        public int LGG2ApproverId { get; set; }

        /// <summary>
        /// Gets or sets LGG2
        /// </summary>
        [DataMember(Name = "LGG2", Order = 41)]
        public int LGG2 { get; set; }

        /// <summary>
        /// Gets or sets SamsungNote4
        /// </summary>
        [DataMember(Name = "SamsungNote4", Order = 42)]
        public int SamsungNote4 { get; set; }

        /// <summary>
        /// Gets or sets IPhone6
        /// </summary>
        [DataMember(Name = "Iphone6", Order = 43)]
        public int Iphone6 { get; set; }

        /// <summary>
        /// Gets or sets IPhone6P
        /// </summary>
        [DataMember(Name = "IPhone6p", Order = 44)]
        public int IPhone6p { get; set; }

        /// <summary>
        /// Gets or sets SamsungNote4ApproverId
        /// </summary>
        [DataMember(Name = "SamsungNote4ApproverId", Order = 45)]
        public int SamsungNote4ApproverId { get; set; }

        /// <summary>
        /// Gets or sets IPhone6ApproverId
        /// </summary>
        [DataMember(Name = "IPhone6ApproverId", Order = 46)]
        public int IPhone6ApproverId { get; set; }

        /// <summary>
        /// Gets or sets IPhone6PApproverId
        /// </summary>
        [DataMember(Name = "IPhone6PApproverId", Order = 47)]
        public int IPhone6PApproverId { get; set; }

        /// <summary>
        /// Gets or sets LGG3
        /// </summary>
        [DataMember(Name = "LGG3", Order = 48)]
        public int LGG3 { get; set; }

        /// <summary>
        /// Gets or sets LGG3
        /// </summary>
        [DataMember(Name = "LGG3ApproverId", Order = 49)]
        public int LGG3ApproverId { get; set; }

        /// <summary>
        /// Gets or sets SamsungS632GB
        /// </summary>
        [DataMember(Name = "SamsungS632GB", Order = 50)]
        public int SamsungS632GB { get; set; }

        /// <summary>
        /// Gets or sets SamsungS632GBApproverId
        /// </summary>
        [DataMember(Name = "SamsungS632GBApproverId", Order = 51)]
        public int SamsungS632GBApproverId { get; set; }

        /// <summary>
        /// Gets or sets SamsungS664GB
        /// </summary>
        [DataMember(Name = "SamsungS664GB", Order = 52)]
        public int SamsungS664GB { get; set; }

        /// <summary>
        /// Gets or sets SamsungS664GBApproverId
        /// </summary>
        [DataMember(Name = "SamsungS664GBApproverId", Order = 53)]
        public int SamsungS664GBApproverId { get; set; }

        /// <summary>
        /// Gets or sets SamsungS6128GB
        /// </summary>
        [DataMember(Name = "SamsungS6128GB", Order = 54)]
        public int SamsungS6128GB { get; set; }

        /// <summary>
        /// Gets or sets SamsungS6128GBApproverId
        /// </summary>
        [DataMember(Name = "SamsungS6128GBApproverId", Order = 55)]
        public int SamsungS6128GBApproverId { get; set; }

        /// <summary>
        /// Gets or sets SamsungS6Edge32GB
        /// </summary>
        [DataMember(Name = "SamsungS6Edge32GB", Order = 56)]
        public int SamsungS6Edge32GB { get; set; }

        /// <summary>
        /// Gets or sets SamsungS6Edge32GBApproverId
        /// </summary>
        [DataMember(Name = "SamsungS6Edge32GBApproverId", Order = 57)]
        public int SamsungS6Edge32GBApproverId { get; set; }

        /// <summary>
        /// Gets or sets SamsungS6Edge64GB
        /// </summary>
        [DataMember(Name = "SamsungS6Edge64GB", Order = 58)]
        public int SamsungS6Edge64GB { get; set; }

        /// <summary>
        /// Gets or sets SamsungS6Edge64GBApproverId
        /// </summary>
        [DataMember(Name = "SamsungS6Edge64GBApproverId", Order = 59)]
        public int SamsungS6Edge64GBApproverId { get; set; }

        /// <summary>
        /// Gets or sets SamsungS6Edge128GB
        /// </summary>
        [DataMember(Name = "SamsungS6Edge128GB", Order = 60)]
        public int SamsungS6Edge128GB { get; set; }

        /// <summary>
        /// Gets or sets SamsungS6Edge128GBApproverId
        /// </summary>
        [DataMember(Name = "SamsungS6Edge128GBApproverId", Order = 61)]
        public int SamsungS6Edge128GBApproverId { get; set; }
    }   
}
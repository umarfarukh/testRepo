// <copyright file = "DashboardDataDC.cs" company = "CTS">
// Copyright (c) OnBoarding_DashboardDataDC. All rights reserved.
// </copyright>

/*About me
*******************************************************
* Namespace        : OneC.OnBoarding.DC         
* Class Name       : DashBoardDataDC.cs
* Version          : 1.0
* Type             : DataContract
* Purpose          : Data contracts for DashBoards
* Created date     : 2012-Dec-12
* Author           : 312511
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

namespace OneC.OnBoarding.DC.DashBoardDC
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Linq;    
    using System.Runtime.Serialization;
    using System.Text;
    #endregion Namespaces

    /// <summary>
    /// Data Contract for Dashboard Data
    /// </summary>
    [DataContract(Name = "DashboardDataDC", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/DashBoardDC/")]

    [Serializable]
    public class DashboardDataDC
    {
        /// <summary>
        /// Gets or sets StartDate
        /// </summary>
        [DataMember(Name = "StartDate", Order = 1)]
        public int StartDate { get; set; }

        /// <summary>
        /// Gets or sets EndDate
        /// </summary>
        [DataMember(Name = "EndDate", Order = 2)]
        public int EndDate { get; set; }

        /// <summary>
        /// Gets or sets SessionId
        /// </summary>
        [DataMember(Name = "SessionId", Order = 3)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets Role
        /// </summary>
        [DataMember(Name = "Role", Order = 4)]
        public string RoleId { get; set; }

        /// <summary>
        /// Gets or sets Candidate RecruiterID
        /// </summary>
        [DataMember(Name = "RecruiterID", Order = 5)]
        public int RecruiterID { get; set; }

        /// <summary>
        /// Gets or sets Candidate Id
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 6)]
        public long CandidateId { get; set; }

        /// <summary>
        /// Gets or sets Candidate Email Id
        /// </summary>
        [DataMember(Name = "CandidateEmailId", Order = 7)]
        public string CandidateEmailId { get; set; }

        /// <summary>
        /// Gets or sets Candidate Requisition ID 
        /// </summary>
        [DataMember(Name = "Requisition", Order = 8)]
        public string Requisition { get; set; }

        /// <summary>
        /// Gets or sets Candidate Type 
        /// </summary>
        [DataMember(Name = "CandidateType", Order = 9)]
        public int? CandidateType { get; set; }

        /// <summary>
        /// Gets or sets Candidate Process Type 
        /// </summary>
        [DataMember(Name = "ProcessID", Order = 10)]
        public int ProcessID { get; set; }

        /// <summary>
        /// Gets or sets Candidate Country Code
        /// </summary>
        [DataMember(Name = "CountryID", Order = 11)]
        public int CountryID { get; set; }

        /// <summary>
        /// Gets or sets Candidate From Date
        /// </summary>
        [DataMember(Name = "FromDate", Order = 12)]
        public DateTime FromDate { get; set; }

        /// <summary>
        /// Gets or sets Candidate ToDate
        /// </summary>
        [DataMember(Name = "ToDate", Order = 13)]
        public DateTime ToDate { get; set; }

        /// <summary>
        /// Gets or sets Candidate Name
        /// </summary>
        [DataMember(Name = "CandidateFName", Order = 14)]
        public string CandidateFName { get; set; }

        /// <summary>
        /// Gets or sets Page No
        /// </summary>
        [DataMember(Name = "PageNo", Order = 15)]
        public int PageNo { get; set; }

        /// <summary>
        /// Gets or sets Page Size
        /// </summary>
        [DataMember(Name = "PageSize", Order = 16)]
        public int PageSize { get; set; }

        /// <summary>
        /// Gets or sets candidate name search
        /// </summary>
        [DataMember(Name = "Item1", Order = 17)]
        public string Item1 { get; set; }

        /// <summary>
        /// Gets or sets Candidate Associate Id
        /// </summary>
        [DataMember(Name = "AssociateId", Order = 18)]
        public int AssociateId { get; set; }

        /// <summary>
        /// Gets or sets Candidate JoiningLocation
        /// </summary>
        [DataMember(Name = "JoiningLocation", Order = 19)]
        public string JoiningLocation { get; set; }

        /// <summary>
        /// Gets or sets Candidate JoiningLocation 
        /// </summary>
        [DataMember(Name = "InductionLocation", Order = 20)]
        public string InductionLocation { get; set; }

        /// <summary>
        /// Gets or sets Candidate JoiningLocation 
        /// </summary>
        [DataMember(Name = "InductionStatus", Order = 21)]
        public string InductionStatus { get; set; }

        ///// <summary>
        ///// Gets or sets Candidate CandidateID 
        ///// </summary>
        ////[DataMember(Name = "CandidateID", Order = 22)]
        ////public Int32 CandidateID { get; set; }

        /// <summary>
        /// Gets or sets Candidate CandidateName 
        /// </summary>
        [DataMember(Name = "CandidateName", Order = 23)]
        public string CandidateName { get; set; }

        /// <summary>
        /// Gets or sets Candidate DOJ 
        /// </summary>
        [DataMember(Name = "DOJ", Order = 24)]
        public DateTime DOJ { get; set; }

        /// <summary>
        /// Gets or sets Candidate InductionMode 
        /// </summary>
        [DataMember(Name = "InductionMode", Order = 25)]
        public string InductionMode { get; set; }

        /// <summary>
        /// Gets or sets Candidate OfferStatus 
        /// </summary>
        [DataMember(Name = "OfferStatus", Order = 26)]
        public string OfferStatus { get; set; }

        /// <summary>
        /// Gets or sets Candidate InductionCandidateType 
        /// </summary>
        [DataMember(Name = "InductionCandidateType", Order = 27)]
        public string InductionCandidateType { get; set; }

        /// <summary>
        /// Gets or sets Candidate DOJ 
        /// </summary>
        [DataMember(Name = "InductinDate", Order = 28)]
        public DateTime? InductinDate { get; set; }

        /// <summary>
        /// Gets or sets CountryName
        /// </summary>
        [DataMember(Name = "Country", Order = 29)]
        public string Country { get; set; }

        /// <summary>
        /// Gets or sets CandidateStatus
        /// </summary>
        [DataMember(Name = "CandidateStatus", Order = 30)]
        public string CandidateStatus { get; set; }

        /// <summary>
        /// Gets or sets AttendanceUpdate Candidate list
        /// </summary>
        [DataMember(Name = "AtteandanceUpdateCandiadatelist", Order = 31)]
        public string AtteandanceUpdateCandiadatelist { get; set; }

        /// <summary>
        /// Gets or sets is Single
        /// </summary>
        [DataMember(Name = "IsSingle", Order = 32)]
        public string IsSingle { get; set; }

        /// <summary>
        /// Gets or sets BGV Initiation From Date
        /// </summary>
        [DataMember(Name = "BGVInitiationDate", Order = 33)]
        public DateTime? BGVInitiationDate { get; set; }

        /// <summary>
        /// Gets or sets BGV Vendor Id
        /// </summary>
        [DataMember(Name = "VendorId", Order = 34)]
        public int VendorId { get; set; }

        /// <summary>
        /// Gets or sets BGV Initiation To Date
        /// </summary>
        [DataMember(Name = "BGVInitiationToDate", Order = 35)]
        public DateTime? BGVInitiationToDate { get; set; }

        /// <summary>
        /// Gets or sets Candidate City Id
        /// </summary>
        [DataMember(Name = "CityId", Order = 36)]
        public int CityId { get; set; }

        /// <summary>
        /// Gets or sets Candidate State Id
        /// </summary>
        [DataMember(Name = "StateId", Order = 37)]
        public int StateId { get; set; }

        /// <summary>
        /// Gets or sets BGV CIS Status Id
        /// </summary>
        [DataMember(Name = "CisStatusId", Order = 38)]
        public int CisStatusId { get; set; }

        /// <summary>
        /// Gets or sets BGV Final Status Id
        /// </summary>
        [DataMember(Name = "BgvFinalStatusId", Order = 39)]
        public int BgvFinalStatusId { get; set; }

        /// <summary>
        /// Gets or sets BGV Type Of Joining
        /// </summary>
        [DataMember(Name = "TypeOfJoining", Order = 40)]
        public int TypeOfJoining { get; set; }

        /// <summary>
        /// Gets or sets Vendor Login Id
        /// </summary>
        [DataMember(Name = "VendorLoginID", Order = 41)]
        public string VendorLoginID { get; set; }

        /// <summary>
        /// Gets or sets BGV Case Priority
        /// </summary>
        [DataMember(Name = "CasePriority", Order = 42)]
        public int CasePriority { get; set; }

        /// <summary>
        /// Gets or sets BGV Initiation From Date
        /// </summary>
        [DataMember(Name = "BGVInitiationFromDate", Order = 43)]
        public DateTime? BGVInitiationFromDate { get; set; }

        /// <summary>
        /// Gets or sets BGV Specification Status
        /// </summary>
        [DataMember(Name = "BGVSpecificationStatus", Order = 44)]
        public int BGVSpecificationStatus { get; set; }

        #region HireType requirement for UK Lateral
        /// <summary>
        /// Gets or sets 305054: HireType for UK Lateral
        /// </summary>
        [DataMember(Name = "HireType", Order = 45)]
        public int HireType { get; set; }

        /// <summary>
        /// Gets or sets 305054: ParentID
        /// </summary>
        [DataMember(Name = "ParentId", Order = 46)]
        public int ParentId { get; set; }

        /// <summary>
        /// Gets or sets Candidate Type Description
        /// </summary>
        [DataMember(Name = "CandidateTypeDesc", Order = 47)]
        public string CandidateTypeDesc { get; set; }

        /// <summary>
        /// Gets or sets Candidate Type Code
        /// </summary>
        [DataMember(Name = "CandidateTypeCode", Order = 48)]
        public int CandidateTypeCode { get; set; }
        #endregion

        /// <summary>
        /// Gets or sets Switzerland Excel 
        /// </summary>
        [DataMember(Name = "SwizExcel", Order = 49)]
        public int SwizExcel { get; set; }

        /// <summary>
        /// Gets or sets Country and city description
        /// </summary>
        [DataMember(Name = "CountryCityDesc", Order = 50)]
        public string CountryCityDesc { get; set; }

        /// <summary>
        /// Gets or sets Country Name
        /// </summary>
        [DataMember(Name = "CountryName", Order = 51)]
        public string CountryName { get; set; }

        /// <summary>
        /// Gets or sets TaskId
        /// </summary>
        [DataMember(Name = "TaskId", Order = 52)]
        public int TaskId { get; set; }

        /// <summary>
        /// Gets or sets SaveMode
        /// </summary>
        [DataMember(Name = "SaveMode", Order = 53)]
        public int SaveMode { get; set; }

        /// <summary>
        /// Gets or sets ERProcess
        /// </summary>
        [DataMember(Name = "ERProcess", Order = 54)]
        public int ERProcess { get; set; }

        /// <summary>
        /// Gets or sets ERSubmittedCandidate Status
        /// </summary>
        [DataMember(Name = "ERSubmitted", Order = 55)]
        public int ERSubmitted { get; set; }

        /// <summary>
        /// Gets or sets ERProcessRC Status
        /// </summary>
        [DataMember(Name = "ERConfirmation", Order = 56)]
        public int ERConfirmation { get; set; }

        /// <summary>
        /// Gets or sets AssetStatus 
        /// </summary>
        [DataMember(Name = "AssetStatus", Order = 57)]
        public int AssetStatus { get; set; }
        
        /// <summary>
        /// Gets or sets CandidateDocUploadStatus
        /// </summary>
        [DataMember(Name = "CandidateDocUploadStatus", Order = 58)]
        public short CandidateDocUploadStatus { get; set; }

        /// <summary>
        /// Gets or sets Manager Document UploadStatus
        /// </summary>
       [DataMember(Name = "MngrDocUploadStatus", Order = 58)]
        public short MngrDocUploadStatus { get; set; }

        ///// <summary>
        ///// Gets or sets exteneded DateInputBox
        ///// </summary>
        ////[DataMember(Name = "ExtendedDate", Order = 59)]
        ////public DateTime ExtendedDate { get; set; }

       /// <summary>
       /// Gets or sets Candidate Process Type 
       /// </summary>
       [DataMember(Name = "ProcessType", Order = 60)]
       public int ProcessType { get; set; }
    }

    /// <summary>
    /// Class for Dashboard Data list
    /// </summary>
    [Serializable]
    public class DashBoardDataList : List<DashboardDataDC>
    {
    }
}
// -----------------------------------------------------------------------
// <copyright file="SaveComponent.cs" company="CTS">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace OneC.OnBoarding.DC.BGVDC
{
    using System;
    using System.Collections.ObjectModel;
    using System.Data;
    using System.Runtime.Serialization;

    /// <summary>
    /// Represents the data contract for document list info screen.
    /// </summary>
    [DataContract(Name = "SaveComponent", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/BGVDC/")]
    [Serializable]
    public class SaveComponent
    {
        /// <summary>
        /// Gets or sets the value of Session Id.
        /// </summary>
        [DataMember(Name = "SessionId", Order = 1)]
        public int Sessionid
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the Candidate.
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 2)]
        public int CandidateId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the logged user role group Id.
        /// </summary>
        [DataMember(Name = "RoleGroupId", Order = 3)]
        public int RoleGroupId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the stored procedure mode.
        /// </summary>
        [DataMember(Name = "SpMode", Order = 4)]
        public int SpMode
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the Component list
        /// </summary>
        [DataMember(Name = "CompDetail", Order = 5)]
        public Collection<ComponentList> CompDetail
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the Document list
        /// </summary>
        [DataMember(Name = "DocDataList", Order = 6)]
        public Collection<DocDataList> DocDetail
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets Total experience
        /// </summary>
        [DataMember(Name = "TotalExp", Order = 7)]
        public int TotalExp
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the Component detail id
        /// </summary>
        [DataMember(Name = "CompDetailId", Order = 8)]
        public int CompDetailId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the component code.
        /// </summary>
        [DataMember(Name = "ComponentRunnerId", Order = 9)]
        public int ComponentRunnerId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the Verification type
        /// </summary>
        [DataMember(Name = "VerifyType", Order = 10)]
        public string VerifyType
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the feedback comments
        /// </summary>
        [DataMember(Name = "Comments", Order = 11)]
        public string Comments
        {
            get;
            set;
        }

        /// <summary>
        /// Represents to dispose the garbage collector
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }

    /// <summary>
    /// Represents the document data list items.
    /// </summary>
    [Serializable]
    public class DocDataList
    {
        /// <summary>
        /// Gets or sets CompDetailId
        /// </summary>
        [DataMember(Name = "CompDetailId", Order = 1)]
        public int CompDetailId { get; set; }

        /// <summary>
        /// Gets or sets CompRunnerId
        /// </summary>
        [DataMember(Name = "CompRunnerId", Order = 2)]
        public int CompRunnerId { get; set; }

        /// <summary>
        /// Gets or sets DocMatrixId
        /// </summary>
        [DataMember(Name = "DocMatrixId", Order = 3)]
        public int DocMatrixId { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether IsMandatory is enabled.
        /// </summary>
        [DataMember(Name = "IsMandatory", Order = 4)]
        public bool IsMandatory { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether IsDefault is enabled.
        /// </summary>
        [DataMember(Name = "IsDefault", Order = 5)]
        public bool IsDefault { get; set; }

        /// <summary>
        /// Gets or sets Remarks
        /// </summary>
        [DataMember(Name = "Remarks", Order = 6)]
        public string Remarks { get; set; }

        /// <summary>
        /// Gets or sets DocumentValue
        /// </summary>
        [DataMember(Name = "DocumentValue", Order = 7)]
        public string DocumentValue { get; set; }
    }

    /// <summary>
    /// Represents the component list items.
    /// </summary>
    [Serializable]
    public class ComponentList
    {
        /// <summary>
        /// Gets or sets InstitutionId
        /// </summary>
        [DataMember(Name = "InstitutionId", Order = 1)]
        public int InstitutionId { get; set; }

        /// <summary>
        /// Gets or sets InstitutionName
        /// </summary>
        [DataMember(Name = "InstitutionName", Order = 2)]
        public string InstitutionName { get; set; }

        /// <summary>
        /// Gets or sets School
        /// </summary>
        [DataMember(Name = "School", Order = 3)]
        public string School { get; set; }

        /// <summary>
        /// Gets or sets Percentage
        /// </summary>
        [DataMember(Name = "Percentage", Order = 4)]
        public string Percentage { get; set; }

        /// <summary>
        /// Gets or sets CTo
        /// </summary>
        [DataMember(Name = "CTo", Order = 5)]
        public string CTo { get; set; }

        /// <summary>
        /// Gets or sets HTo
        /// </summary>
        [DataMember(Name = "HTo", Order = 6)]
        public string HTo { get; set; }

        /// <summary>
        /// Gets or sets MOD
        /// </summary>
        [DataMember(Name = "MOD", Order = 7)]
        public int MOD { get; set; }

        /// <summary>
        /// Gets or sets Specialization
        /// </summary>
        [DataMember(Name = "Specialization", Order = 8)]
        public string Specialization { get; set; }

        /// <summary>
        /// Gets or sets BuId
        /// </summary>
        [DataMember(Name = "BuId", Order = 9)]
        public int BuId { get; set; }

        /// <summary>
        /// Gets or sets Code
        /// </summary>
        [DataMember(Name = "Code", Order = 10)]
        public string Code { get; set; }

        /// <summary>
        /// Gets or sets CFrom
        /// </summary>
        [DataMember(Name = "CFrom", Order = 11)]
        public string CFrom { get; set; }

        /// <summary>
        /// Gets or sets HFrom
        /// </summary>
        [DataMember(Name = "HFrom", Order = 12)]
        public string HFrom { get; set; }

        /// <summary>
        /// Gets or sets CompDetailId
        /// </summary>
        [DataMember(Name = "CompDetailId", Order = 13)]
        public int CompDetailId { get; set; }

        /// <summary>
        /// Gets or sets ComponentRunnerId
        /// </summary>
        [DataMember(Name = "ComponentRunnerId", Order = 14)]
        public int ComponentRunnerId { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the IsActive is enabled.
        /// </summary>
        [DataMember(Name = "IsActive", Order = 15)]
        public bool IsActive { get; set; }

        /// <summary>
        /// Gets or sets SuspectStatus
        /// </summary>
        [DataMember(Name = "SuspectStatus", Order = 16)]
        public int SuspectStatus { get; set; }

        /// <summary>
        /// Gets or sets SuspectRaisedBy
        /// </summary>
        [DataMember(Name = "SuspectRaisedBy", Order = 17)]
        public int SuspectRaisedBy { get; set; }

        /// <summary>
        /// Gets or sets SuspectRaisedTS
        /// </summary>
        [DataMember(Name = "SuspectRaisedTS", Order = 18)]
        public string SuspectRaisedTS { get; set; }

        /// <summary>
        /// Gets or sets BackPaperRequestedBy
        /// </summary>
        [DataMember(Name = "BackPaperRequestedBy", Order = 19)]
        public int BackPaperRequestedBy { get; set; }

        /// <summary>
        /// Gets or sets SuspectClearedBy
        /// </summary>
        [DataMember(Name = "SuspectClearedBy", Order = 20)]
        public int SuspectClearedBy { get; set; }

        /// <summary>
        /// Gets or sets SuspectClearedTS
        /// </summary>
        [DataMember(Name = "SuspectClearedTS", Order = 21)]
        public string SuspectClearedTS { get; set; }

        /// <summary>
        /// Gets or sets TypeGroup
        /// </summary>
        [DataMember(Name = "TypeGroup", Order = 22)]
        public int TypeGroup { get; set; }

        /// <summary>
        /// Gets or sets InstitutionNameOthers
        /// </summary>
        [DataMember(Name = "InstitutionNameOthers", Order = 23)]
        public string InstitutionNameOthers { get; set; }

        /// <summary>
        /// Gets or sets PrincipalCompany
        /// </summary>
        [DataMember(Name = "PrincipalCompany", Order = 24)]
        public string PrincipalCompany { get; set; }

        /// <summary>
        /// Gets or sets EmploymentType
        /// </summary>
        [DataMember(Name = "EmploymentType", Order = 25)]
        public string EmploymentType { get; set; }

        /// <summary>
        /// Gets or sets HRMName
        /// </summary>
        [DataMember(Name = "HRMName", Order = 26)]
        public string HRMName { get; set; }

        /// <summary>
        /// Gets or sets HRPNo
        /// </summary>
        [DataMember(Name = "HRPNo", Order = 27)]
        public string HRPNo { get; set; }

        /// <summary>
        /// Gets or sets HREmailId
        /// </summary>
        [DataMember(Name = "HREmailId", Order = 28)]
        public string HREmailId { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the IsMismatchIdentifiedFrom is enabled.
        /// </summary>
        [DataMember(Name = "IsMismatchIdentifiedFrom", Order = 29)]
        public bool IsMismatchIdentifiedFrom { get; set; }

        /// <summary>
        /// Gets or sets MismatchQueryFrom
        /// </summary>
        [DataMember(Name = "MismatchQueryFrom", Order = 30)]
        public string MismatchQueryFrom { get; set; }

        /// <summary>
        /// Gets or sets MismatchDescriptionFrom
        /// </summary>
        [DataMember(Name = "MismatchDescriptionFrom", Order = 31)]
        public string MismatchDescriptionFrom { get; set; }

        /// <summary>
        /// Gets or sets MismatchFeedbackFrom
        /// </summary>
        [DataMember(Name = "MismatchFeedbackFrom", Order = 32)]
        public string MismatchFeedbackFrom { get; set; }

        /// <summary>
        /// Gets or sets MismatchStatusFrom
        /// </summary>
        [DataMember(Name = "MismatchStatusFrom", Order = 33)]
        public int MismatchStatusFrom { get; set; }

        /// <summary>
        /// Gets or sets MismatchStatusActionCommentsFrom
        /// </summary>
        [DataMember(Name = "MismatchStatusActionCommentsFrom", Order = 34)]
        public string MismatchStatusActionCommentsFrom { get; set; }

        /// <summary>
        /// Gets or sets MismatchStatusActionByFrom
        /// </summary>
        [DataMember(Name = "MismatchStatusActionByFrom", Order = 35)]
        public string MismatchStatusActionByFrom { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the IsOverLapIdentified is enabled.
        /// </summary>
        [DataMember(Name = "IsOverLapIdentified", Order = 36)]
        public bool IsOverLapIdentified { get; set; }

        /// <summary>
        /// Gets or sets OverLapQuery
        /// </summary>
        [DataMember(Name = "OverLapQuery", Order = 38)]
        public string OverLapQuery { get; set; }

        /// <summary>
        /// Gets or sets OverLapDescription
        /// </summary>
        [DataMember(Name = "OverLapDescription", Order = 39)]
        public string OverLapDescription { get; set; }

        /// <summary>
        /// Gets or sets OverLapFeedback
        /// </summary>
        [DataMember(Name = "OverLapFeedback", Order = 40)]
        public string OverLapFeedback { get; set; }

        /// <summary>
        /// Gets or sets OverLapStatus
        /// </summary>
        [DataMember(Name = "OverLapStatus", Order = 41)]
        public int OverLapStatus { get; set; }

        /// <summary>
        /// Gets or sets OverLapStatusActionComments
        /// </summary>
        [DataMember(Name = "OverLapStatusActionComments", Order = 42)]
        public string OverLapStatusActionComments { get; set; }

        /// <summary>
        /// Gets or sets OverLapStatusActionBy
        /// </summary>
        [DataMember(Name = "OverLapStatusActionBy", Order = 43)]
        public int OverLapStatusActionBy { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the IsGapIdentified is enabled.
        /// </summary>
        [DataMember(Name = "IsGapIdentified", Order = 44)]
        public bool IsGapIdentified { get; set; }

        /// <summary>
        /// Gets or sets GapQuery
        /// </summary>
        [DataMember(Name = "GapQuery", Order = 45)]
        public string GapQuery { get; set; }

        /// <summary>
        /// Gets or sets GapDescription
        /// </summary>
        [DataMember(Name = "GapDescription", Order = 46)]
        public string GapDescription { get; set; }

        /// <summary>
        /// Gets or sets GapFeedback
        /// </summary>
        [DataMember(Name = "GapFeedback", Order = 47)]
        public string GapFeedback { get; set; }

        /// <summary>
        /// Gets or sets GapStatus
        /// </summary>
        [DataMember(Name = "GapStatus", Order = 48)]
        public int GapStatus { get; set; }

        /// <summary>
        /// Gets or sets GapStatusActionComments
        /// </summary>
        [DataMember(Name = "GapStatusActionComments", Order = 49)]
        public string GapStatusActionComments { get; set; }

        /// <summary>
        /// Gets or sets GapStatusActionBy
        /// </summary>
        [DataMember(Name = "GapStatusActionBy", Order = 50)]
        public int GapStatusActionBy { get; set; }

        /// <summary>
        /// Gets or sets SpecializationOthers
        /// </summary>
        [DataMember(Name = "SpecializationOthers", Order = 51)]
        public string SpecializationOthers { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the IsMismatchIdentifiedTo is enabled.
        /// </summary>
        [DataMember(Name = "IsMismatchIdentifiedTo", Order = 52)]
        public bool IsMismatchIdentifiedTo { get; set; }

        /// <summary>
        /// Gets or sets MismatchQueryTo
        /// </summary>
        [DataMember(Name = "MismatchQueryTo", Order = 53)]
        public string MismatchQueryTo { get; set; }

        /// <summary>
        /// Gets or sets MismatchDescriptionTo
        /// </summary>
        [DataMember(Name = "MismatchDescriptionTo", Order = 54)]
        public string MismatchDescriptionTo { get; set; }

        /// <summary>
        /// Gets or sets MismatchFeedbackTo
        /// </summary>
        [DataMember(Name = "MismatchFeedbackTo", Order = 55)]
        public string MismatchFeedbackTo { get; set; }

        /// <summary>
        /// Gets or sets MismatchStatusTo
        /// </summary>
        [DataMember(Name = "MismatchStatusTo", Order = 56)]
        public int MismatchStatusTo { get; set; }

        /// <summary>
        /// Gets or sets MismatchStatusActionCommentsTo
        /// </summary>
        [DataMember(Name = "MismatchStatusActionCommentsTo", Order = 57)]
        public string MismatchStatusActionCommentsTo { get; set; }

        /// <summary>
        /// Gets or sets MismatchStatusActionByTo
        /// </summary>
        [DataMember(Name = "MismatchStatusActionByTo", Order = 58)]
        public string MismatchStatusActionByTo { get; set; }
    }

    /// <summary>
    /// Represents the save component parameters.
    /// </summary>
    public class SaveComponentParam
    {
        /// <summary>
        /// Gets or sets the value of Session Id.
        /// </summary>
        [DataMember(Name = "SessionId", Order = 1)]
        public int Sessionid
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the Candidate.
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 2)]
        public int CandidateId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the logged user role group Id.
        /// </summary>
        [DataMember(Name = "RoleGroupId", Order = 3)]
        public int RoleGroupId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the stored procedure mode.
        /// </summary>
        [DataMember(Name = "SpMode", Order = 4)]
        public int SpMode
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets CompDetail
        /// </summary>
        [DataMember(Name = "CompDetail", Order = 5)]
        public DataTable CompDetail
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets DocDetail
        /// </summary>
        [DataMember(Name = "DocDataList", Order = 6)]
        public DataTable DocDetail
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets Total Experience
        /// </summary>
        [DataMember(Name = "TotalExp", Order = 7)]
        public int TotalExp
        {
            get;
            set;
        }

        /// <summary>
        /// Represents to dispose the garbage collector
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
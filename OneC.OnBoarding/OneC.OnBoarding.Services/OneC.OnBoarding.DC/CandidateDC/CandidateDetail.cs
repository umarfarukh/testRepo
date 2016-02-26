//// <copyright file="CandidateDetail.cs" company="CognizantTechnologySolutions">
////Copyright (c) CognizantTechnologySolutions. All rights reserved.
//// </copyright>

/*About me
*******************************************************
* Namespace        : OneC.OnBoarding.DC         
* Class Name       : CandidateDetail.cs
* Version          : 1.0
* Type             : DataContract
* Purpose          : Data contracts for Candidate Class
* Created date     : 2012-Jan-02
* Author           : 208099
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
namespace OneC.OnBoarding.DC.CandidateDC
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Web;
    using OneC.OnBoarding.DC.CandidateDC;
    using OneC.OnBoarding.DC.UtilityDC;
    #endregion Namespaces

    /// <summary>
    /// Data contract for New Hire Details
    /// </summary>
    [DataContract(Name = "CandidateDetail", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/CandidateDC/")]
    [Serializable]
    public class CandidateDetail : DashBoardDataPagination
    {
        /// <summary>
        /// Gets or sets Candidate Id
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 1)]
        public long CandidateId { get; set; }

        /// <summary>
        /// Gets or sets Login Id
        /// </summary>
        [DataMember(Name = "LoginId", IsRequired = true, Order = 2)]
        public string LoginId { get; set; }

        /// <summary>
        /// Gets or sets Candidate Associate Id
        /// </summary>
        [DataMember(Name = "AssociateId", Order = 3)]
        public int AssociateId { get; set; }

        /// <summary>
        /// Gets or sets Candidate Name
        /// </summary>
        [DataMember(Name = "CandidateFName", Order = 4)]
        public string CandidateFName { get; set; }

        /// <summary>
        /// Gets or sets Candidate Email Id
        /// </summary>
        [DataMember(Name = "CandidateEmailId", Order = 5)]
        public string CandidateEmailId { get; set; }

        /// <summary>
        /// Gets or sets Candidate Type 
        /// </summary>
        [DataMember(Name = "CandidateType", Order = 6)]
        public int? CandidateType { get; set; }

        /// <summary>
        /// Gets or sets Candidate Process Type 
        /// </summary>
        [DataMember(Name = "ProcessID", Order = 7)]
        public int ProcessID { get; set; }

        /// <summary>
        /// Gets or sets Candidate Mobile No
        /// </summary>
        [DataMember(Name = "CandidateMobileNo", Order = 8)]
        public string CandidateMobileNo { get; set; }

        /// <summary>
        /// Gets or sets Candidate Date Of Joining 
        /// </summary>
        [DataMember(Name = "CandidateDOJ", Order = 9)]
        public string CandidateDOJ { get; set; }

        /// <summary>
        /// Gets or sets Candidate Offer Extended Date 
        /// </summary>
        [DataMember(Name = "OfferExtendedDate", Order = 10)]
        public DateTime OfferExtendedDate { get; set; }

        /// <summary>
        /// Gets or sets Candidate Offer Status 
        /// </summary>
        [DataMember(Name = "CandOfferStatus", Order = 11)]
        public short CandidateOfferStatus { get; set; }

        /// <summary>
        /// Gets or sets Candidate DIM Status 
        /// </summary>
        [DataMember(Name = "CandDIMStatus", Order = 12)]
        public int CandDIMStatus { get; set; }

        /// <summary>
        /// Gets or sets Candidate Reason For Reject
        /// </summary>
        [DataMember(Name = "ReasonForReject", Order = 13)]
        public string ReasonForReject { get; set; }

        /// <summary>
        /// Gets or sets Candidate Work Location
        /// </summary>
        [DataMember(Name = "WorkLocation", Order = 14)]
        public int WorkLocation { get; set; }

        /// <summary>
        /// Gets or sets Candidate ConvenientTimeToReach
        /// </summary>
        [DataMember(Name = "ConvenientTimeToReach", Order = 21)]
        public int ConvenientTimeToReach { get; set; }

        /// <summary>
        /// Gets or sets CandidateCountry Code
        /// </summary>
        [DataMember(Name = "CountryID", Order = 15)]
        public int CountryID { get; set; }

        /// <summary>
        /// Gets or sets CandidateStateCode
        /// </summary>
        [DataMember(Name = "StateCode", Order = 16)]
        public int StateId { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether is IsFirstTimeLogin 
        /// </summary>
        [DataMember(Name = "IsFirstTimeLogin", Order = 17)]
        public bool IsFirstTimeLogin { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether is Pre joining Forms Completed 
        /// </summary>
        [DataMember(Name = "IsPreJoiningFormalitiesCompleted", Order = 18)]
        public bool IsPreJoiningFormalitiesCompleted { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether is Post joining Forms Completed  
        /// </summary>
        [DataMember(Name = "IsPostJoiningFormalitiesCompleted", Order = 19)]
        public bool IsPostJoiningFormalitiesCompleted { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether is CandidateIsAllowed Access  
        /// </summary>
        [DataMember(Name = "IsAccessAllowed", Order = 20)]
        public bool IsAccessAllowed { get; set; }

        /// <summary>
        /// Gets or sets Candidate Requisition ID 
        /// </summary>
        [DataMember(Name = "Requisition", Order = 22)]
        public string Requisition { get; set; }

        /// <summary>
        /// Gets or sets Candidate From Date
        /// </summary>
        [DataMember(Name = "FromDate", Order = 23)]
        public DateTime FromDate { get; set; }

        /// <summary>
        /// Gets or sets Candidate ToDate
        /// </summary>
        [DataMember(Name = "ToDate", Order = 24)]
        public DateTime ToDate { get; set; }

        /// <summary>
        /// Gets or sets Candidate RecruiterID
        /// </summary>
        [DataMember(Name = "RecruiterID", Order = 25)]
        public int RecruiterID { get; set; }

        /// <summary>
        /// Gets or sets RecruiterName
        /// </summary>
        [DataMember(Name = "RecruiterName", Order = 27)]
        public string RecruiterName { get; set; }

        /// <summary>
        /// Gets or sets PaperWorkStatus
        /// </summary>
        [DataMember(Name = "PaperWorkStatus", Order = 28)]
        public string PaperWorkStatus { get; set; }

        /// <summary>
        /// Gets or sets CandidateOfferStatusDescription
        /// </summary>
        [DataMember(Name = "CandidateOfferStatusDesc", Order = 29)]
        public string CandidateOfferStatusDesc { get; set; }

        /// <summary>
        /// Gets or sets DesignationDescription
        /// </summary>
        [DataMember(Name = "DesignationDesc", Order = 30)]
        public string DesignationDesc { get; set; }

        /// <summary>
        ///  Gets or sets Candidate LName
        /// </summary>
        [DataMember(Name = "CandidateLName", Order = 31)]
        public string CandidateLName { get; set; }

        /// <summary>
        /// Gets or sets Candidate MName
        /// </summary>
        [DataMember(Name = "CandidateMName", Order = 32)]
        public string CandidateMName { get; set; }

        /// <summary>
        /// Gets or sets Candidate Department Name
        /// </summary>
        [DataMember(Name = "DepartmentName", Order = 33)]
        public string DepartmentName { get; set; }

        /// <summary>
        /// Gets or sets Candidate Welcome Mail Status 
        /// </summary>
        [DataMember(Name = "WelcomeMailStatus", Order = 34)]
        public string WelcomeMailStatus { get; set; }

        /// <summary>
        /// Gets or sets Role
        /// </summary>
        [DataMember(Name = "Role", Order = 35)]
        public string RoleId { get; set; }

        /// <summary>
        /// Gets or sets ShowUpdateDivision
        /// </summary>
        [DataMember(Name = "ShowUpdateDiv", Order = 26)]
        public int ShowUpdateDiv { get; set; }

        /// <summary>
        /// Gets or sets Candidate Address
        /// </summary>
        [DataMember(Name = "CandidateAddress", Order = 36)]
        public string CandidateAddress { get; set; }

        /// <summary>
        /// Gets or sets Candidate Level Of Hire
        /// </summary>
        [DataMember(Name = "LevelOfHire", Order = 37)]
        public string LevelOfHire { get; set; }

        /// <summary>
        /// Gets or sets Candidate Seat No
        /// </summary>
        [DataMember(Name = "CandSeatNo", Order = 38)]
        public string CandSeatNo { get; set; }

        /// <summary>
        /// Gets or sets CityId
        /// </summary>
        [DataMember(Name = "CityId", Order = 39)]
        public long CityId { get; set; }

        /// <summary>
        /// Gets or sets CountryCityDescription
        /// </summary>
        [DataMember(Name = "CountryCityDesc", Order = 40)]
        public string CountryCityDesc { get; set; }

        /// <summary>
        /// Gets or sets ResendMail
        /// </summary>
        [DataMember(Name = "ResendMail", Order = 41)]
        public int ResendMail { get; set; }

        /// <summary>
        /// Gets or sets Mode
        /// </summary>
        [DataMember(Name = "Mode", Order = 42)]
        public int Mode { get; set; }

        /// <summary>
        /// Gets or sets Country Name
        /// </summary>
        [DataMember(Name = "CountryName", Order = 43)]
        public string CountryName { get; set; }

        /// <summary>
        /// Gets or sets City Name
        /// </summary>
        [DataMember(Name = "CityName", Order = 44)]
        public string CityName { get; set; }

        /// <summary>
        /// Gets or sets LocationDescription
        /// </summary>
        [DataMember(Name = "LocationDesc", Order = 46)]
        public string LocationDesc { get; set; }

        /// <summary>
        /// Gets or sets Job code
        /// </summary>
        [DataMember(Name = "Jobcode", Order = 47)]
        public string Jobcode { get; set; }

        /// <summary>
        /// Gets or sets lapTopCount
        /// </summary>
        [DataMember(Name = "lapTopCount", Order = 48)]
        public int LapTopCount { get; set; }

        /// <summary>
        /// Gets or sets laptopBlackBerryCount
        /// </summary>
        [DataMember(Name = "laptopBlackBerryCount", Order = 49)]
        public int LaptopBlackBerryCount { get; set; }

        /// <summary>
        /// Gets or sets Candidate Joining Status 
        /// </summary>
        [DataMember(Name = "CandidateJoiningStatus", Order = 50)]
        public short CandidateJoiningStatus { get; set; }

        /// <summary>
        /// Gets or sets SoWorkLocation 
        /// </summary>
        [DataMember(Name = "SoWorkLocation", Order = 51)]
        public string SoWorkLocation { get; set; }

        /// <summary>
        /// Gets or sets Redirection url if redirection required
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1056:UriPropertiesShouldNotBeStrings", Justification = "Reviewed."), DataMember(Name = "RedirectionUrl", Order = 53)]
        public string RedirectUrl { get; set; }

        /// <summary>
        /// Gets or sets Redirection url if redirection required
        /// </summary>
        [DataMember(Name = "LocationCode", Order = 54)]
        public string LocationCode { get; set; }

        /// <summary>
        /// Gets or sets ProjectId
        /// </summary>
        [DataMember(Name = "ProjectId", Order = 55)]
        public long ProjectId { get; set; }

        /// <summary>
        /// Gets or sets EmployeeId
        /// </summary>
        [DataMember(Name = "EmployeeId", Order = 56)]
        public string EmployeeId { get; set; }

        /// <summary>
        /// Gets or sets HiringManagerId
        /// </summary>
        [DataMember(Name = "HiringManagerId", Order = 57)]
        public long HiringManagerId { get; set; }

        /// <summary>
        /// Gets or sets ProjectName
        /// </summary>
        [DataMember(Name = "ProjectName", Order = 58)]
        public string ProjectName { get; set; }

        /// <summary>
        /// Gets or sets DOJ
        /// </summary>
        [DataMember(Name = "DOJ", Order = 59)]
        public string DOJ { get; set; }

        /// <summary>
        /// Gets or sets OExtendedDate
        /// </summary>
        [DataMember(Name = "OExtendedDate", Order = 60)]
        public string OfferExtendDate { get; set; }

        /// <summary>
        /// Gets or sets DepartmentGroup
        /// </summary>
        [DataMember(Name = "DepartmentGroup", Order = 61)]
        public string DepartmentGroup { get; set; }

        /// <summary>
        /// Gets or sets ESAWorkLocation
        /// </summary>
        [DataMember(Name = "ESAWorkLocation", Order = 62)]
        public string ESAWorkLocation { get; set; }

        /// <summary>
        /// Gets or sets Asset Type
        /// </summary>
        [DataMember(Name = "AssetType", Order = 63)]
        public string AssetType { get; set; }

        /// <summary>
        /// Gets or sets Asset Request Status
        /// </summary>
        [DataMember(Name = "AssetRequestStatus", Order = 64)]
        public string AssetRequestStatus { get; set; }

        /// <summary>
        /// Gets or sets SessionId
        /// </summary>
        [DataMember(Name = "SessionId", Order = 65)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets Timeline Status
        /// </summary>
        [DataMember(Name = "TimelineStatus", Order = 66)]
        public string TimelineStatus { get; set; }

        /// <summary>
        /// Gets or sets TrainingId
        /// </summary>
        [DataMember(Name = "TrainingId", Order = 67)]
        public int TrainingId { get; set; }

        /// <summary>
        /// Gets or sets Laptop Request Status
        /// </summary>
        [DataMember(Name = "LaptopRequestStatus", Order = 68)]
        public string LaptopRequestStatus { get; set; }

        /// <summary>
        /// Gets or sets Blackberry Request Status
        /// </summary>
        [DataMember(Name = "BlackberryRequestStatus", Order = 69)]
        public string BlackberryRequestStatus { get; set; }

        /// <summary>
        /// Gets or sets CellPhone Request Status
        /// </summary>
        [DataMember(Name = "CellPhoneRequestStatus", Order = 70)]
        public string CellPhoneRequestStatus { get; set; }

        /// <summary>
        /// Gets or sets ShippingAddress
        /// </summary>
        [DataMember(Name = "ShippingAddress", Order = 71)]
        public string ShippingAddress { get; set; }

        /// <summary>
        /// Gets or sets Job Description
        /// </summary>
        [DataMember(Name = "JobDescription", Order = 72)]
        public string JobDescription { get; set; }

        /// <summary>
        /// Gets or sets Gender
        /// </summary>
        [DataMember(Name = "Gender", Order = 73)]
        public string Gender { get; set; }

        /// <summary>
        /// Gets or sets Associate Name
        /// </summary>
        [DataMember(Name = "AssociateName", Order = 74)]
        public string AssociateName { get; set; }

        /// <summary>
        /// Gets or sets Grade Description
        /// </summary>
        [DataMember(Name = "GradeDescription", Order = 75)]
        public string GradeDescription { get; set; }

        /// <summary>
        /// Gets or sets State Description
        /// </summary>
        [DataMember(Name = "StateDescription", Order = 76)]
        public string StateDescription { get; set; }

        /// <summary>
        /// Gets or sets Supervisor Id
        /// </summary>
        [DataMember(Name = "SupervisorId", Order = 77)]
        public int SupervisorId { get; set; }

        /// <summary>
        /// Gets or sets Supervisor Name
        /// </summary>
        [DataMember(Name = "SupervisorName", Order = 78)]
        public string SupervisorName { get; set; }

        /// <summary>
        /// Gets or sets Skills
        /// </summary>
        [DataMember(Name = "Skills", Order = 79)]
        public string Skills { get; set; }

        /// <summary>
        /// Gets or sets Department Code
        /// </summary>
        [DataMember(Name = "DepartmentCode", Order = 80)]
        public string DepartmentCode { get; set; }

        /// <summary>
        /// Gets or sets DOB
        /// </summary>
        [DataMember(Name = "DOB", Order = 81)]
        public string DOB { get; set; }

        /// <summary>
        /// Gets or sets Education Level
        /// </summary>
        [DataMember(Name = "EducationLevel", Order = 82)]
        public string EducationLevel { get; set; }

        /// <summary>
        /// Gets or sets Year of Passing
        /// </summary>
        [DataMember(Name = "YOP", Order = 83)]
        public string YOP { get; set; }

        /// <summary>
        /// Gets or sets Previous Employer
        /// </summary>
        [DataMember(Name = "PreviousEmployer", Order = 84)]
        public string PreviousEmployer { get; set; }

        /// <summary>
        /// Gets or sets Institution
        /// </summary>
        [DataMember(Name = "Institution", Order = 85)]
        public string Institution { get; set; }

        /// <summary>
        /// Gets or sets Candidate Type Description
        /// </summary>
        [DataMember(Name = "CandidateTypeDesc", Order = 86)]
        public string CandidateTypeDesc { get; set; }

        /// <summary>
        /// Gets or sets Hire Status
        /// </summary>
        [DataMember(Name = "HireStatus", Order = 87)]
        public string HireStatus { get; set; }

        /// <summary>
        /// Gets or sets Candidate Experience
        /// </summary>
        [DataMember(Name = "Experience", Order = 88)]
        public string Experience { get; set; }

        /// <summary>
        /// Gets or sets Candidate Campus Location1
        /// </summary>
        [DataMember(Name = "CampusLoc1", Order = 89)]
        public string CampusLoc1 { get; set; }

        /// <summary>
        /// Gets or sets Candidate Campus Location2
        /// </summary>
        [DataMember(Name = "CampusLoc2", Order = 90)]
        public string CampusLoc2 { get; set; }

        /// <summary>
        /// Gets or sets Program Code
        /// </summary>
        [DataMember(Name = "ProgramCode", Order = 91)]
        public string ProgramCode { get; set; }

        /// <summary>
        /// Gets or sets Application Form Status
        /// </summary>
        [DataMember(Name = "AppFormStatus", Order = 92)]
        public string AppFormStatus { get; set; }

        /// <summary>
        /// Gets or sets UG Discipline
        /// </summary>
        [DataMember(Name = "UGDiscipline", Order = 93)]
        public string UGDiscipline { get; set; }

        /// <summary>
        /// Gets or sets UG Grade
        /// </summary>
        [DataMember(Name = "UGGrade", Order = 94)]
        public string UGGrade { get; set; }

        /// <summary>
        /// Gets or sets UG University
        /// </summary>
        [DataMember(Name = "UGUniversity", Order = 95)]
        public string UGUniversity { get; set; }

        /// <summary>
        /// Gets or sets PG Discipline
        /// </summary>
        [DataMember(Name = "PGDiscipline", Order = 96)]
        public string PGDiscipline { get; set; }

        /// <summary>
        /// Gets or sets PG Grade
        /// </summary>
        [DataMember(Name = "PGGrade", Order = 97)]
        public string PGGrade { get; set; }

        /// <summary>
        /// Gets or sets PG University
        /// </summary>
        [DataMember(Name = "PGUniversity", Order = 98)]
        public string PGUniversity { get; set; }

        /// <summary>
        /// Gets or sets X Marks
        /// </summary>
        [DataMember(Name = "XMarks", Order = 99)]
        public string XMarks { get; set; }

        /// <summary>
        /// Gets or sets XII Marks
        /// </summary>
        [DataMember(Name = "XIIMarks", Order = 100)]
        public string XIIMarks { get; set; }

        /// <summary>
        /// Gets or sets Application Form Status
        /// </summary>
        [DataMember(Name = "CountryEmailID", Order = 101)]
        public string CountryEmailID { get; set; }

        /// <summary>
        /// Gets or sets Name on ID card
        /// </summary>
        [DataMember(Name = "NameOnIDCard", Order = 102)]
        public string NameOnIDCard { get; set; }

        /// <summary>
        /// Gets or sets Filter
        /// </summary>
        [DataMember(Name = "Filter", Order = 103)]
        public int Filter { get; set; }

        /// <summary>
        /// Gets or sets FileUploadStatus Id
        /// </summary>
        [DataMember(Name = "Status", Order = 104)]
        public int? Status { get; set; }

        /// <summary>
        /// Gets or sets FileUploadStatus Description
        /// </summary>
        [DataMember(Name = "FileUploadStatusDesc", Order = 105)]
        public string FileUploadStatusDesc { get; set; }

        /// <summary>
        /// Gets or sets associate Name
        /// </summary>
        [DataMember(Name = "Name", Order = 106)]
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets Practice Name
        /// </summary>
        [DataMember(Name = "PracticeName", Order = 107)]
        public string PracticeName { get; set; }

        /// <summary>
        /// Gets or sets DepartmentDescription
        /// </summary>
        [DataMember(Name = "DepartmentDesc", Order = 108)]
        public string DepartmentDesc { get; set; }

        /// <summary>
        /// Gets or sets OSWorkLocation
        /// </summary>
        [DataMember(Name = "OSWorkLocation", Order = 109)]
        public string OSWorkLocation { get; set; }

        /// <summary>
        /// Gets or sets LapTop
        /// </summary>
        [DataMember(Name = "LapTop", Order = 110)]
        public string LapTop { get; set; }

        /// <summary>
        /// Gets or sets BlackBerry
        /// </summary>
        [DataMember(Name = "BlackBerry", Order = 111)]
        public string BlackBerry { get; set; }

        /// <summary>
        /// Gets or sets Parameter LapTop
        /// </summary>
        [DataMember(Name = "ParamLapTop", Order = 112)]
        public string ParamLapTop { get; set; }

        /// <summary>
        /// Gets or sets CodeId
        /// </summary>
        [DataMember(Name = "CodeId", Order = 113)]
        public string CodeId { get; set; }

        /// <summary>
        /// Gets or sets CDescription
        /// </summary>
        [DataMember(Name = "CDescription", Order = 114)]
        public string CDescription { get; set; }

        /// <summary>
        /// Gets or sets Flag
        /// </summary>
        [DataMember(Name = "Flag", Order = 115)]
        public int Flag { get; set; }

        /// <summary>
        /// Gets or sets TaskId
        /// </summary>
        [DataMember(Name = "TaskId", Order = 116)]
        public int TaskId { get; set; }

        /// <summary>
        /// Gets or sets ClientEquipmentRequestStatus
        /// </summary>
        [DataMember(Name = "ClientEquipmentRequestStatus", Order = 117)]
        public string ClientEquipmentRequestStatus { get; set; }

        /// <summary>
        /// Gets or sets Candidate migration type
        /// </summary>
        [DataMember(Name = "MigratedCandidate", Order = 118)]
        public short MigratedCandidate { get; set; }

        /// <summary>
        /// Gets or sets CUserDefined1
        /// </summary>
        [DataMember(Name = "CUserDefined1", Order = 119)]
        public string CUserDefined1 { get; set; }

        /// <summary>
        /// Gets or sets CUserDefined2
        /// </summary>
        [DataMember(Name = "CUserDefined2", Order = 120)]
        public string CUserDefined2 { get; set; }

        /// <summary>
        /// Gets or sets Fed-ex
        /// </summary>
        [DataMember(Name = "Fedex", Order = 121)]
        public string Fedex { get; set; }

        /// <summary>
        /// Gets or sets Campus Joining Venue
        /// </summary>
        [DataMember(Name = "CampusJoiningVenue", Order = 122)]
        public string CampusJoiningVenue { get; set; }

        /// <summary>
        /// Gets or sets Campus Reporting Time
        /// </summary>
        [DataMember(Name = "CampusReportingTime", Order = 123)]
        public string CampusReportingTime { get; set; }

        /// <summary>
        /// Gets or sets Campus Joining Location
        /// </summary>
        [DataMember(Name = "CampusJoiningLocation", Order = 124)]
        public int CampusJoiningLocation { get; set; }

        /// <summary>
        /// Gets or sets Dim Resend mail
        /// </summary>
        [DataMember(Name = "DateIntimationMailStatus", Order = 125)]
        public int DateIntimationMailStatus { get; set; }

        /// <summary>
        /// Gets or sets Dim Status
        /// </summary>
        [DataMember(Name = "DateIntimationStatus", Order = 126)]
        public int DateIntimationStatus { get; set; }

        /// <summary>
        /// Gets or sets Campus Candidate Dim Mailer Status 
        /// </summary>
        [DataMember(Name = "DimMailerStatus", Order = 127)]
        public string DimMailerStatus { get; set; }

        /// <summary>
        /// Gets or sets Survey Allowed status
        /// </summary>
        [DataMember(Name = "IsSurveyAllowed", Order = 128)]
        public string IsSurveyAllowed { get; set; }

        /// <summary>
        /// Gets or sets Survey url
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1056:UriPropertiesShouldNotBeStrings", Justification = "Reviewed."), DataMember(Name = "SurveyUrl", Order = 129)]
        public string SurveyUrl { get; set; }

        /// <summary>
        /// Gets or sets Asset Approval
        /// </summary>
        [DataMember(Name = "AssetApproval", Order = 130)]
        public int AssetApproval { get; set; }

        /// <summary>
        /// Gets or sets Asset Approval Flag
        /// </summary>
        [DataMember(Name = "AssetApprovalFlag", Order = 131)]
        public int AssetApprovalFlag { get; set; }

        /// <summary>
        /// Gets or sets LapTopApproverDetails
        /// </summary>
        [DataMember(Name = "LapTopApproverDetails", Order = 132)]
        public string LapTopApproverDetails { get; set; }

        /// <summary>
        /// Gets or sets CellPhoneApproverDetails
        /// </summary>
        [DataMember(Name = "CellPhoneApproverDetails", Order = 133)]
        public string CellPhoneApproverDetails { get; set; }

        /// <summary>
        /// Gets or sets Asset Approval Flag
        /// </summary>
        [DataMember(Name = "BlacberryApproverDetails", Order = 134)]
        public string BlacberryApproverDetails { get; set; }

        /// <summary>
        /// Gets or sets CGuide url
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1056:UriPropertiesShouldNotBeStrings", Justification = "Reviewed."), DataMember(Name = "CGuideURL", Order = 135)]
        public string CGuideURL { get; set; }

        /// <summary>
        /// Gets or sets BU description
        /// </summary>
        [DataMember(Name = "BUDescription", Order = 136)]
        public string BUDescription { get; set; }

        /// <summary>
        /// Gets or sets Stage description
        /// </summary>
        [DataMember(Name = "StageDescription", Order = 137)]
        public string StageDescription { get; set; }

        /// <summary>
        /// Gets or sets Check_CountryID
        /// </summary>
        [DataMember(Name = "Check_CountryID", Order = 138)]
        public string Check_CountryID { get; set; }

        /// <summary>
        /// Gets or sets Recruiter coordinator ChosenLocation
        /// </summary>
        [DataMember(Name = "RcChosenLocation", Order = 139)]
        public string RcChosenLocation { get; set; }

        /// <summary>
        /// Gets or sets NSSChosenLocation
        /// </summary>
        [DataMember(Name = "NSSChosenLocation", Order = 140)]
        public string NSSChosenLocation { get; set; }

        /// <summary>
        /// Gets or sets ManilaCountryId
        /// </summary>
        [DataMember(Name = "ManilaCountryId", Order = 141)]
        public string ManilaCountryId { get; set; }

        /// <summary>
        /// Gets or sets ESAESAHiringManagerID
        /// </summary>
        [DataMember(Name = "ESAHiringManagerID", Order = 142)]
        public int ESAHiringManagerID { get; set; }

        /// <summary>
        /// Gets or sets ESA Hiring Manager Name
        /// </summary>
        [DataMember(Name = "ESAHiringManagerName", Order = 143)]
        public string ESAHiringManagerName { get; set; }

        /// <summary>
        /// Gets or sets ESA Hiring Manager Mobile No
        /// </summary>
        [DataMember(Name = "ESAHiringManagerMobileNo", Order = 144)]
        public string ESAHiringManagerMobileNo { get; set; }

        /// <summary>
        /// Gets or sets ESA Hiring Manager Virtual net
        /// </summary>
        [DataMember(Name = "ESAHiringManagerVnetNo", Order = 145)]
        public string ESAHiringManagerVnetNo { get; set; }

        /// <summary>
        /// Gets or sets Recruiter Mobile No
        /// </summary>
        [DataMember(Name = "RecruiterMobileNo", Order = 146)]
        public string RecruiterMobileNo { get; set; }

        /// <summary>
        /// Gets or sets Recruiter Virtual net No
        /// </summary>
        [DataMember(Name = "RecruiterVnetNo", Order = 147)]
        public string RecruiterVnetNo { get; set; }

        /// <summary>
        /// Gets or sets CurrentDate 
        /// </summary>
        [DataMember(Name = "CurrentDate", Order = 148)]
        public string CurrentDate { get; set; }

        /// <summary>
        /// Gets or sets Joining Status 
        /// </summary>
        [DataMember(Name = "JoingStatus", Order = 149)]
        public int JoingStatus { get; set; }

        /// <summary>
        /// Gets or sets RCComment 
        /// </summary>
        [DataMember(Name = "RCComment", Order = 150)]
        public string RCComment { get; set; }

        /// <summary>
        /// Gets or sets TODAY 
        /// </summary>
        [DataMember(Name = "Today", Order = 151)]
        public string Today { get; set; }

        /// <summary>
        /// Gets or sets Hire Type 
        /// </summary>
        [DataMember(Name = "HireType", Order = 152)]
        public int? HireType { get; set; }

        /// <summary>
        /// Gets or sets Hire Type Description
        /// </summary>
        [DataMember(Name = "HireTypeDes", Order = 153)]
        public string HireTypeDes { get; set; }

        /// <summary>
        /// Gets or sets Hire Type 
        /// </summary>
        [DataMember(Name = "UKHRSSFlag", Order = 154)]
        public int? UKHRSSFlag { get; set; }

        /// <summary>
        /// Gets or sets NotificationMapping Id 
        /// </summary>
        [DataMember(Name = "NotificationMappingId", Order = 154)]
        public int NotificationMappingId { get; set; }

        /// <summary>
        /// Gets or sets EnableEdit
        /// </summary>
        [DataMember(Name = "EnableEdit", Order = 155)]
        public int EnableEdit { get; set; }

        /// <summary>
        /// Gets or sets RoleDetailId
        /// </summary>
        [DataMember(Name = "RoleDetailId", Order = 156)]
        public string RoleDetailId { get; set; }

        /// <summary>
        /// Gets or sets ER RC Status
        /// </summary>
        [DataMember(Name = "ERRequestStatus", Order = 157)]
        public int ERRequestStatus { get; set; }

        /// <summary>
        /// Gets or sets Induction Attendance Status
        /// </summary>
        [DataMember(Name = "CandidateAttendancStatus", Order = 158)]
        public string CandidateAttendancStatus { get; set; }

        /// <summary>
        /// Gets or sets bulk upload CandidateIdList
        /// </summary>
        [DataMember(Name = "CandidateIdList", Order = 159)]
        public string CandidateIdList { get; set; }

        /// <summary>
        /// Gets or sets bulk upload ErrorCandidateIdList
        /// </summary>
        [DataMember(Name = "ErrorCandidateIdList", Order = 160)]
        public string ErrorCandidateIdList { get; set; }

        /// <summary>
        /// Gets or sets Requesting Department
        /// </summary>
        [DataMember(Name = "RequestingDepartment", Order = 161)]
        public string RequestingDepartment { get; set; }

        /// <summary>
        /// Gets or sets Owning Department
        /// </summary>
        [DataMember(Name = "OwningDepartment", Order = 162)]
        public string OwniningDepartment { get; set; }

        /// <summary>
        /// Gets or sets CE Flag
        /// </summary>
        [DataMember(Name = "CEFlag", Order = 163)]
        public string CEFlag { get; set; }

        /// <summary>
        /// Gets or sets DataCard 
        /// </summary>
        [DataMember(Name = "DataCard", Order = 164)]
        public string DataCard { get; set; }

        /// <summary>
        /// Gets or sets KeyBoard Language 
        /// </summary>
        [DataMember(Name = "KeyBoardLanguage", Order = 165)]
        public string KeyBoardLanguage { get; set; }

        /// <summary>
        /// Gets or sets Delete Flag 
        /// </summary>
        [DataMember(Name = "DeleteFlag", Order = 166)]
        public int DeleteFlag { get; set; }

        /// <summary>
        /// Gets or sets BloodGroup
        /// </summary>
        [DataMember(Name = "BloodGroup", Order = 167)]
        public string BloodGroup { get; set; }

        /// <summary>
        /// Gets or sets Z10 
        /// </summary>
        [DataMember(Name = "Z10", Order = 168)]
        public string Z10 { get; set; }

        /// <summary>
        /// Gets or sets Q10 
        /// </summary>
        [DataMember(Name = "Q10", Order = 169)]
        public string Q10 { get; set; }

        /// <summary>
        /// Gets or sets SamsungS3
        /// </summary>
        [DataMember(Name = "SamsungS3", Order = 170)]
        public string SamsungS3 { get; set; }

        /// <summary>
        /// Gets or sets SamsungS4
        /// </summary>
        [DataMember(Name = "SamsungS4", Order = 171)]
        public string SamsungS4 { get; set; }

        /// <summary>
        /// Gets or sets SamsungS5
        /// </summary>
        [DataMember(Name = "SamsungS5", Order = 172)]
        public string SamsungS5 { get; set; }

        /// <summary>
        ///  Gets or sets IPhone4S
        /// </summary>
        [DataMember(Name = "IPhone4S", Order = 173)]
        public string IPhone4S { get; set; }

        /// <summary>
        ///  Gets or sets IPhone5c
        /// </summary>
        [DataMember(Name = "IPhone5C", Order = 174)]
        public string IPhone5C { get; set; }

        /// <summary>
        /// Gets or sets IPhone5S
        /// </summary>
        [DataMember(Name = "IPhone5S", Order = 175)]
        public string IPhone5S { get; set; }

        /// <summary>
        /// Gets or sets ContractorEquipmentApproverDetails
        /// </summary>
        [DataMember(Name = "ContractorEquipmentApproverDetails", Order = 176)]
        public string ContractorEquipmentApproverDetails { get; set; }

        /// <summary>
        /// Gets or sets FacilitatorId
        /// </summary>
        [DataMember(Name = "FacilitatorId", Order = 177)]
        public string FacilitatorId { get; set; }

        /// <summary>
        /// Gets or sets LGG2 
        /// </summary>
        [DataMember(Name = "LGg2", Order = 178)]
        public string LGg2 { get; set; }

        /// <summary>
        /// Gets or sets SamsungNote3 
        /// </summary>
        [DataMember(Name = "Samsungnote3", Order = 179)]
        public string Samsungnote3 { get; set; }

        /// <summary>
        /// Gets or sets SmartphoneApproverDetails 
        /// </summary>
        [DataMember(Name = "SmartphoneApproverDetails", Order = 180)]
        public string SmartphoneApproverDetails { get; set; }

        /// <summary>
        /// Gets or sets Date Comparer 
        /// </summary>
        [DataMember(Name = "DojComparer", Order = 181)]
        public string DojComparer { get; set; }

        /// <summary>
        /// Gets or sets Confirm Status by RC in ActionTab.js
        /// </summary>
        [DataMember(Name = "ConfirmStatus", Order = 182)]
        public short ConfirmStatus { get; set; }

        /// <summary>
        /// Gets or sets Total Count
        /// </summary>
        [DataMember(Name = "TotalCount", Order = 183)]
        public int TotalCount { get; set; }

        /// <summary>
        /// Gets or sets Resend I9 Mail 
        /// </summary>
        [DataMember(Name = "ResendI9Mail", Order = 184)]
        public short ResendI9Mail { get; set; }

        /// <summary>
        /// Gets or sets SamsungNote4 
        /// </summary>
        [DataMember(Name = "Samsungnote4", Order = 185)]
        public string Samsungnote4 { get; set; }

        /// <summary>
        /// Gets or sets IPhone6 
        /// </summary>
        [DataMember(Name = "IPhone6", Order = 186)]
        public string IPhone6 { get; set; }

        /// <summary>
        /// Gets or sets IPhone6P 
        /// </summary>
        [DataMember(Name = "IPhone6P", Order = 187)]
        public string IPhone6P { get; set; }

        /// <summary>
        /// Gets or sets Tasksubstatus 
        /// </summary>
        [DataMember(Name = "Tasksubstatus", Order = 188)]
        public int Tasksubstatus { get; set; }

        /// <summary>
        /// Gets or sets LGg3 
        /// </summary>
        [DataMember(Name = "LGg3", Order = 189)]
        public string LGg3 { get; set; }

        /// <summary>
        /// Gets or sets SamsungS632GB 
        /// </summary>
        [DataMember(Name = "Samsungs632GB", Order = 190)]
        public string Samsungs632GB { get; set; }

        /// <summary>
        /// Gets or sets SamsungS664GB 
        /// </summary>
        [DataMember(Name = "SamsungS664GB", Order = 191)]
        public string Samsungs664GB { get; set; }

        /// <summary>
        /// Gets or sets SamsungS6128GB 
        /// </summary>
        [DataMember(Name = "SamsungS6128GB", Order = 192)]
        public string Samsungs6128GB { get; set; }

        /// <summary>
        /// Gets or sets SamsungS6Edge32GB 
        /// </summary>
        [DataMember(Name = "SamsungS6Edge32GB", Order = 193)]
        public string Samsungs6Edge32GB { get; set; }

        /// <summary>
        /// Gets or sets SamsungS6Edge64GB 
        /// </summary>
        [DataMember(Name = "SamsungS6Edge64GB", Order = 194)]
        public string Samsungs6Edge64GB { get; set; }

        /// <summary>
        /// Gets or sets SamsungS6Edge128GB 
        /// </summary>
        [DataMember(Name = "SamsungS6Edge128GB", Order = 195)]
        public string Samsungs6Edge128GB { get; set; }

        /// <summary>
        /// Gets or sets PortingName 
        /// </summary>
        [DataMember(Name = "PortingName", Order = 196)]
        public string PortingName { get; set; }

        /// <summary>
        /// Gets or sets PortingAddress 
        /// </summary>
        [DataMember(Name = "PortingAddress", Order = 197)]
        public string PortingAddress { get; set; }

        /// <summary>
        /// Gets or sets PortingPhoneNumber 
        /// </summary>
        [DataMember(Name = "PortingPhoneNumber", Order = 198)]
        public string PortingPhoneNumber { get; set; }

        /// <summary>
        /// Gets or sets PortWirelessProvider 
        /// </summary>
        [DataMember(Name = "PortWirelessProvider", Order = 199)]
        public string PortWirelessProvider { get; set; }

        /// <summary>
        /// Gets or sets PortPassword 
        /// </summary>
        [DataMember(Name = "PortPassword", Order = 200)]
        public string PortPassword { get; set; }

        /// <summary>
        /// Gets or sets PortAccountNumber 
        /// </summary>
        [DataMember(Name = "PortAccountNumber", Order = 201)]
        public string PortAccountNumber { get; set; }
    }

    /// <summary>
    /// List of candidateDetail
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class CandidateDetailList : List<CandidateDetail>
    {
    }

    /// <summary>
    /// class of candidateDetailList
    /// </summary>
    [Serializable]
    public class CandidateDetails
    {
        /// <summary>
        /// Gets or sets List of Candidates
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList CandidateDetailList
        {       // modisfied to fix style cop errors
            get;
            set;
        }
    }
}

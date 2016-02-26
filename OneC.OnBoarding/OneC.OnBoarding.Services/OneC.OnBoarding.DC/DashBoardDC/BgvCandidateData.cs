//-----------------------------------------------------------------------
// <copyright file="BgvCandidateData.cs" company="OnBoarding_CTS">
//     Copyright BGV data. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
/*About me
*******************************************************
* Namespace        : OneC.OnBoarding.DC.DashBoardDC         
* Class Name       : BgvCandidateData
* Version          : 1.0
* Type             : DataContract
* Purpose          : Data contracts for Bgv Data
* Created date     : 2012-Nov-29
* Author           : 208099
* Reviewed by      :
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
    /// Data Contract for BGV Data
    /// </summary>
    [DataContract(Name = "BgvCandidateData", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/DashBoardDC/")]
    [Serializable]
    public sealed class BgvCandidateData : IDisposable
    {       
        /// <summary>
        ///  Gets or sets CandidateId
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 1, IsRequired = true)]
        public long CandidateId { get; set; }

        /// <summary>
        /// Gets or sets Candidate Name
        /// </summary>
        [DataMember(Name = "CandidateName", Order = 2, IsRequired = true)]
        public string CandidateName { get; set; }

        /// <summary>
        /// Gets or sets CIS DataXml
        /// </summary>
        [DataMember(Name = "CisPersonalDataXML", Order = 3, IsRequired = true)]
        public string CisPersonalDataXML { get; set; }

        /// <summary>
        /// Gets or sets TaskSessionId
        /// </summary>
        [DataMember(Name = "SessionId", Order = 4, IsRequired = true)]
        public long SessionId { get; set; }

        /// <summary>
        ///  Gets or sets CountryId
        /// </summary>
        [DataMember(Name = "CountryId", Order = 5, IsRequired = true)]
        public int CountryId { get; set; }

        /// <summary>
        /// Gets or sets CIS Data Xml
        /// </summary>
        [DataMember(Name = "CisPrefillData", Order = 6, IsRequired = true)]
        public string CisPrefillData { get; set; }

        /// <summary>
        ///  Gets or sets CIS Started flag
        /// </summary>
        [DataMember(Name = "IsCisStarted", Order = 7, IsRequired = true)]
        public int IsCisStarted { get; set; }

        /// <summary>
        /// Gets or sets TypeGroup
        /// </summary>
        [DataMember(Name = "TypeGroup", Order = 8)]
        public int TypeGroup { get; set; }

        /// <summary>
        /// Gets or sets CIS ComponentData
        /// </summary>
        [DataMember(Name = "CisComponentData", Order = 9)]
        public string CisComponentData { get; set; }

        /// <summary>
        /// Gets or sets ComponentDetailId
        /// </summary>
        [DataMember(Name = "ComponentDetailId", Order = 10)]
        public int ComponentDetailId { get; set; }

        /// <summary>
        /// Gets or sets ComponentHtml
        /// </summary>
        [DataMember(Name = "ComponentHtml", Order = 11)]
        public string ComponentHtml { get; set; }

        /// <summary>
        /// Gets or sets Flag to identify whether component assignments are initiated
        /// </summary>
        [DataMember(Name = "IsCisComponentStarted", Order = 12, IsRequired = true)]
        public int IsCisComponentStarted { get; set; }

        /// <summary>
        /// Gets or sets TypeId
        /// </summary>
        [DataMember(Name = "TypeId", Order = 13)]
        public int TypeId { get; set; }

        /// <summary>
        /// Gets or sets IsPrefill
        /// </summary>
        [DataMember(Name = "IsPrefill", Order = 14)]
        public int IsPrefill { get; set; }

        /// <summary>
        /// Gets or sets SPMode
        /// </summary>
        [DataMember(Name = "SpMode", Order = 15, IsRequired = true)]
        public int SpMode { get; set; }

        /// <summary>
        /// Gets or sets DashboardMode
        /// </summary>
        [DataMember(Name = "DashboardMode", Order = 16)]
        public int DashboardMode { get; set; }

        /// <summary>
        /// Gets or sets CIS PersonalDataLogXML
        /// </summary>
        [DataMember(Name = "CisPersonalDataLogXML", Order = 17)]
        public string CisPersonalDataLogXML { get; set; }

        /// <summary>
        /// Gets or sets CIS Status
        /// </summary>
        [DataMember(Name = "CisStatus", Order = 18)]
        public int CisStatus { get; set; }

        /// <summary>
        /// Gets or sets ComponentList
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "ComponentList", Order = 19)]
        public List<ComponentDC> ComponentList { get; set; }

        /// <summary>
        /// Gets or sets CIS Experience DataXML
        /// </summary>
        [DataMember(Name = "CisExpDataXML", Order = 20)]
        public string CisExpDataXML { get; set; }

        /// <summary>
        /// Gets or sets CIS Experience DataLogXML
        /// </summary>
        [DataMember(Name = "CisExpDataLogXML", Order = 21)]
        public string CisExpDataLogXML { get; set; }

        /// <summary>
        /// Gets or sets CIS education DataXML
        /// </summary>
        [DataMember(Name = "CisEduDataXML", Order = 22)]
        public string CisEduDataXML { get; set; }

        /// <summary>
        /// Gets or sets CIS education DataLogXML
        /// </summary>
        [DataMember(Name = "CisEduDataLogXML", Order = 23)]
        public string CisEduDataLogXML { get; set; }

        /// <summary>
        /// Gets or sets CompanyName
        /// </summary>
        [DataMember(Name = "CompanyName", Order = 24)]
        public string CompanyName { get; set; }

        /// <summary>
        /// Gets or sets Employment Type
        /// </summary>
        [DataMember(Name = "EmploymentType", Order = 25)]
        public int EmploymentType { get; set; }

        /// <summary>
        /// Gets or sets documentData
        /// </summary>
        [DataMember(Name = "DocumentData", Order = 26)]
        public string DocumentData { get; set; }

        /// <summary>
        /// Gets or sets Autocomplete Name data search 
        /// </summary>
        [DataMember(Name = "ItemName", Order = 27)]
        public string ItemName { get; set; }

        /// <summary>
        /// Gets or sets Is redirection required
        /// </summary>
        [DataMember(Name = "RedirectMode", Order = 28)]
        public int RedirectMode { get; set; }

        /// <summary>
        /// Gets or sets Redirect to URL
        /// </summary>
        [DataMember(Name = "RedirectTo", Order = 29)]
        public string RedirectTo { get; set; }

        /// <summary>
        /// Gets or sets Specific component type
        /// </summary>
        [DataMember(Name = "ComponentType", Order = 30)]
        public int ComponentType { get; set; }

        /// <summary>
        /// Gets or sets CIS ComponentDataXML
        /// </summary>
        [DataMember(Name = "CisComponentDataXML", Order = 31)]
        public string CisComponentDataXML { get; set; }

        /// <summary>
        /// Gets or sets DocumentName
        /// </summary>
        [DataMember(Name = "DocumentName", Order = 32)]
        public string DocumentName { get; set; }

        /// <summary>
        /// Gets or sets InSufficientDocument
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "InSufficientDocument", Order = 33)]
        public List<ReqDocList> InSufficientDocument { get; set; }

        /// <summary>
        /// Gets or sets Content
        /// </summary>
        [DataMember(Name = "Content", Order = 34)]
        public string Content { get; set; }

        /// <summary>
        /// Gets or sets Status
        /// </summary>
        [DataMember(Name = "Status", Order = 35)]
        public int Status { get; set; }

        /// <summary>
        /// Gets or sets RoleGroupId
        /// </summary>
        [DataMember(Name = "RoleGroupId", Order = 36, IsRequired = true)]
        public int RoleGroupId { get; set; }

        /// <summary>
        /// Gets or sets CIS DocumentListXml
        /// </summary>
        [DataMember(Name = "CisDocumentListXml", Order = 37)]
        public string CisDocumentListXml { get; set; }

        /// <summary>
        /// Gets or sets Save Mode
        /// </summary>
        [DataMember(Name = "SaveMode", Order = 38)]
        public int SaveMode { get; set; }

        /// <summary>
        /// Gets or sets MenuTab
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "MenuTab", Order = 39)]
        public MenuTabList MenuTab { get; set; }

        /// <summary>
        /// Gets or sets InstitutionList
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "InstitutionList", Order = 40)]
        public InstitutionList InstitutionList { get; set; }

        /// <summary>
        /// Gets or sets CIS Saved flag
        /// </summary>
        [DataMember(Name = "IsCisSaved", Order = 41)]
        public int IsCisSaved { get; set; }

        /// <summary>
        /// Gets or sets CIS Submitted flag
        /// </summary>
        [DataMember(Name = "IsCisSubmitted", Order = 42)]
        public int IsCisSubmitted { get; set; }

        /// <summary>
        /// Gets or sets CIS ComponentDataLog
        /// </summary>
        [DataMember(Name = "CisComponentDataLog", Order = 43)]
        public string CisComponentDataLog { get; set; }

        /// <summary>
        /// Gets or sets To specify education and Experience  log xml value 
        /// </summary>
        [DataMember(Name = "CisComponentDataLogXML", Order = 44)]
        public string CisComponentDataLogXML { get; set; }

        /// <summary>
        /// Gets or sets Relevant Experience
        /// </summary>
        [DataMember(Name = "RelevantExp", Order = 45)]
        public int RelevantExp { get; set; }

        /// <summary>
        /// Gets or sets HRSS SaveStatus
        /// </summary>
        [DataMember(Name = "HrssSaveStatus", Order = 46)]
        public int HrssSaveStatus { get; set; }

        /// <summary>
        /// Gets or sets IsAssignedToVendor
        /// </summary>
        [DataMember(Name = "IsAssignedToVendor", Order = 47)]
        public int IsAssignedToVendor { get; set; }

        /// <summary>
        /// Gets or sets CandidateSaveStatus
        /// </summary>
        [DataMember(Name = "CandidateSaveStatus", Order = 48)]
        public int CandidateSaveStatus { get; set; }

        /// <summary>
        /// Method for Dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }

    /// <summary>
    /// Data Contract for BGV Document Data
    /// </summary>
    public class DocumentDC
    {
        /// <summary>
        /// Gets or sets DocumentId
        /// </summary>
        [DataMember(Name = "DocumentId", Order = 1)]
        public int DocumentId { get; set; }

        /// <summary>
        /// Gets or sets DocumentName
        /// </summary>
        [DataMember(Name = "DocumentName", Order = 2)]
        public string DocumentName { get; set; }

        /// <summary>
        /// Gets or sets IsMandatory
        /// </summary>
        [DataMember(Name = "IsMandatory", Order = 3)]
        public int IsMandatory { get; set; }

        /// <summary>
        /// Gets or sets IsDefault
        /// </summary>
        [DataMember(Name = "IsDefault", Order = 4)]
        public int IsDefault { get; set; }

        /// <summary>
        /// Gets or sets DocumentStatus
        /// </summary>
        [DataMember(Name = "DocumentStatus", Order = 5)]
        public int DocumentStatus { get; set; }

        /// <summary>
        /// Gets or sets ComponentDetailId
        /// </summary>
        [DataMember(Name = "ComponentDetailId", Order = 6)]
        public int ComponentDetailId { get; set; }
    }

    /// <summary>
    /// Data Contract for BGV Component Data
    /// </summary>
    public class ComponentDC
    {
        /// <summary>
        /// Gets or sets ComponentId
        /// </summary>
        [DataMember(Name = "ComponentId", Order = 1)]
        public int ComponentId { get; set; }

        /// <summary>
        /// Gets or sets Component Description
        /// </summary>
        [DataMember(Name = "ComponentDesc", Order = 2)]
        public string ComponentDesc { get; set; }

        /// <summary>
        /// Gets or sets ComponentDetailId
        /// </summary>
        [DataMember(Name = "ComponentDetailId", Order = 3)]
        public int ComponentDetailId { get; set; }

        /// <summary>
        /// Gets or sets ComponentHtml
        /// </summary>
        [DataMember(Name = "ComponentHtml", Order = 4)]
        public string ComponentHtml { get; set; }

        /// <summary>
        /// Gets or sets ComponentCode
        /// </summary>
        [DataMember(Name = "ComponentCode", Order = 5)]
        public string ComponentCode { get; set; }

        /// <summary>
        /// Gets or sets IsComponentSelected
        /// </summary>
        [DataMember(Name = "IsComponentSelected", Order = 6)]
        public int IsComponentSelected { get; set; }
    }

    /// <summary>
    /// Data Contract for BGV institution Data
    /// </summary>
    public class InstitutionDC
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
        /// Gets or sets InstitutionTypeId
        /// </summary>        
        [DataMember(Name = "InstitutionTypeId", Order = 3)]
        public int InstitutionTypeId { get; set; }

        /// <summary>
        /// Gets or sets InstitutionAddress
        /// </summary>        
        [DataMember(Name = "InstitutionAddress", Order = 4)]
        public string InstitutionAddress { get; set; }

        /// <summary>
        /// Gets or sets InstitutionAddress2
        /// </summary>        
        [DataMember(Name = "InstitutionAddress2", Order = 5)]
        public string InstitutionAddress2 { get; set; }

        /// <summary>
        /// Gets or sets InstitutionStateId
        /// </summary>        
        [DataMember(Name = "InstitutionStateId", Order = 6)]
        public int InstitutionStateId { get; set; }

        /// <summary>
        /// Gets or sets InstitutionCountryId
        /// </summary>        
        [DataMember(Name = "InstitutionCountryId", Order = 7)]
        public int InstitutionCountryId { get; set; }

        /// <summary>
        /// Gets or sets SuspectRating
        /// </summary>        
        [DataMember(Name = "SuspectRating", Order = 8)]
        public int SuspectRating { get; set; }

        /// <summary>
        /// Gets or sets SuspectSource
        /// </summary>        
        [DataMember(Name = "SuspectSource", Order = 9)]
        public string SuspectSource { get; set; }

        /// <summary>
        /// Gets or sets Suspect Description
        /// </summary>        
        [DataMember(Name = "SuspectDesc", Order = 10)]
        public string SuspectDesc { get; set; }

        /// <summary>
        /// Gets or sets IsActive
        /// </summary>        
        [DataMember(Name = "IsActive", Order = 11)]
        public int IsActive { get; set; }

        /// <summary>
        /// Gets or sets SessionId
        /// </summary>       
        [DataMember(Name = "SessionId", Order = 12, IsRequired = true)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets mode
        /// </summary>        
        [DataMember(Name = "mode", Order = 13)]
        public int Mode { get; set; }

        /// <summary>
        /// Gets or sets EffectiveDate
        /// </summary>        
        [DataMember(Name = "EffectiveDate", Order = 14)]
        public string EffectiveDate { get; set; }

        /// <summary>
        /// Gets or sets DocumentConfig
        /// </summary>        
        [DataMember(Name = "DocumentConfig", Order = 15)]
        public string DocumentConfig { get; set; }

        /// <summary>
        /// Gets or sets SuspectStatus
        /// </summary>       
        [DataMember(Name = "SuspectStatus", Order = 16)]
        public int SuspectStatus { get; set; }

        /// <summary>
        /// Gets or sets BackPaperRequestedBy
        /// </summary>        
        [DataMember(Name = "BackPaperRequestedBy", Order = 17)]
        public string BackPaperRequestedBy { get; set; }

        /// <summary>
        /// Gets or sets SearchInstitution
        /// </summary>        
        [DataMember(Name = "SearchInstitution", Order = 18)]
        public string SearchInstitution { get; set; }
    }

    /// <summary>
    /// Data Contract for BGV Upload Data
    /// </summary>
    public class BGVDocumentUploadDetail
    {
        ///// <summary>
        ///// TypeGroup
        ///// </summary>
        ////[DataMember(Name = "TypeGroup", Order = 1)]
        ////public int TypeGroup { get; set; }

        ///// <summary>
        ///// ComponentId
        ///// </summary>
        ////[DataMember(Name = "ComponentId", Order = 2)]
        ////public int ComponentId { get; set; }

        ///// <summary>
        ///// ComponentDesc
        ///// </summary>
        ////[DataMember(Name = "ComponentDesc", Order = 3)]
        ////public string ComponentDesc { get; set; }

        ///// <summary>
        ///// InstitutionId
        ///// </summary>
        ////[DataMember(Name = "InstitutionId", Order = 4)]
        ////public int InstitutionId { get; set; }

        ///// <summary>
        ///// InstitutionName
        ///// </summary>
        ////[DataMember(Name = "InstitutionName", Order = 5)]
        ////public string InstitutionName { get; set; }

        ///// <summary>
        ///// DocumentId
        ///// </summary>
        ////[DataMember(Name = "DocumentId", Order = 6)]
        ////public int DocumentId { get; set; }

        ///// <summary>
        ///// DocumentName
        ///// </summary>
        ////[DataMember(Name = "DocumentName", Order = 7)]
        ////public string DocumentName { get; set; }

        ///// <summary>
        ///// DocumentStatus
        ///// </summary>
        ////[DataMember(Name = "DocumentStatus", Order = 8)]
        ////public int DocumentStatus { get; set; }

        ///// <summary>
        ///// ActionStatus
        ///// </summary>
        ////[DataMember(Name = "ActionStatus", Order = 9)]
        ////public int ActionStatus { get; set; }

        /// <summary>
        /// Gets or sets HTML Content
        /// </summary>
        [DataMember(Name = "HtmlContent", Order = 1, IsRequired = true)]
        public string HtmlContent { get; set; }
    }

    /// <summary>
    /// Data Contract for BGV Document Approval Data
    /// </summary>
    public class DocumentApprovalStatusDC
    {
        /// <summary>
        /// Gets or sets Mode
        /// </summary>
        [DataMember(Name = "Mode", Order = 1, IsRequired = true)]
        public int Mode { get; set; }

        /// <summary>
        /// Gets or sets Response
        /// </summary>
        [DataMember(Name = "Response", Order = 2, IsRequired = true)]
        public int Response { get; set; }

        /// <summary>
        /// Gets or sets Comment
        /// </summary>
        [DataMember(Name = "Comment", Order = 3, IsRequired = true)]
        public string Comment { get; set; }

        /// <summary>
        ///  Gets or sets CandidateId
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 4, IsRequired = true)]
        public long CandidateId { get; set; }

        /// <summary>
        ///  Gets or sets SessionId
        /// </summary>
        [DataMember(Name = "SessionId", Order = 5, IsRequired = true)]
        public long SessionId { get; set; }

        /// <summary>
        ///  Gets or sets ECM Document Name
        /// </summary>
        [DataMember(Name = "ECMDocumentName", Order = 6)]
        public string ECMDocumentName { get; set; }

        /// <summary>
        /// Gets or sets VendorEnabled
        /// </summary>
        [DataMember(Name = "VendorEnabled", Order = 7, IsRequired = true)]
        public int VendorEnabled { get; set; }

        /// <summary>
        /// Gets or sets BGV Specification Status
        /// </summary>
        [DataMember(Name = "BGvSpecStatus", Order = 8, IsRequired = true)]
        public int BGvSpecStatus { get; set; }

        /// <summary>
        /// Gets or sets MandatoryApproved
        /// </summary>
        [DataMember(Name = "MandatoryApproved", Order = 9, IsRequired = true)]
        public int MandatoryApproved { get; set; }

        /// <summary>
        /// Gets or sets RequestDoc
        /// </summary>
        [DataMember(Name = "RequestDoc", Order = 10, IsRequired = true)]
        public int RequestDoc { get; set; }

        /// <summary>
        /// Gets or sets RoleId
        /// </summary>
        [DataMember(Name = "RoleId", Order = 12, IsRequired = true)]
        public int RoleGroupId { get; set; }

        /// <summary>
        /// Gets or sets DocumentStatus
        /// </summary>
        [DataMember(Name = "DocumentStatus", Order = 13)]
        public int DocumentStatus { get; set; }

        /// <summary>
        /// Gets or sets ApprovalStatus
        /// </summary>
        [DataMember(Name = "ApprovalStatus", Order = 14)]
        public int ApprovalStatus { get; set; }

        /// <summary>
        /// Gets or sets StatusTxt
        /// </summary>
        [DataMember(Name = "StatusTxt", Order = 15)]
        public string StatusTxt { get; set; }

        /// <summary>
        /// Gets or sets Upload
        /// </summary>
        [DataMember(Name = "Upload", Order = 17)]
        public int Upload { get; set; }

        /// <summary>
        /// Gets or sets View
        /// </summary>
        [DataMember(Name = "DocView", Order = 18)]
        public int DocView { get; set; }

        /// <summary>
        /// Gets or sets Approve
        /// </summary>
        [DataMember(Name = "Approve", Order = 19)]
        public int Approve { get; set; }

        /// <summary>
        /// Gets or sets Reject
        /// </summary>
        [DataMember(Name = "Reject", Order = 20)]
        public int Reject { get; set; }

        /// <summary>
        /// Gets or sets MandatoryDocUploaded
        /// </summary>
        [DataMember(Name = "MandatoryDocUploaded", Order = 21)]
        public int MandatoryDocUploaded { get; set; }

        /// <summary>
        /// Gets or sets CIS DocDataFlag
        /// </summary>
        [DataMember(Name = "CisDocDataFlag", Order = 22)]
        public int CisDocDataFlag { get; set; }

        /// <summary>
        /// Gets or sets DocumentMatrixId
        /// </summary>
        [DataMember(Name = "DocumentMatrixId", Order = 23)]
        public int DocumentMatrixId { get; set; }

        /// <summary>
        /// Gets or sets FK_CandidateBGVComponentDetail
        /// </summary>
        [DataMember(Name = "CandidateBgvComponentDetail", Order = 24)]
        public long CandidateBgvComponentDetail { get; set; }

        /// <summary>
        /// Gets or sets Url
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1056:UriPropertiesShouldNotBeStrings", Justification = "Reviewed."), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "Url", Order = 25)]
        public string Url { get; set; }

        /// <summary>
        /// Gets or sets NotificationEvenMappingId
        /// </summary>
        [DataMember(Name = "NotificationMappingId", Order = 26)]
        public long NotificationMappingId { get; set; }

        /// <summary>
        /// Gets or sets RetStatus
        /// </summary>
        [DataMember(Name = "RetStatus", Order = 27)]
        public int RetStatus { get; set; }

        /// <summary>
        /// Gets or sets CIS Status
        /// </summary>
        [DataMember(Name = "CisStatus", Order = 28)]
        public int CisStatus { get; set; }

        /// <summary>
        /// Gets or sets Submit Button Enabled
        /// </summary>
        [DataMember(Name = "SubmitBtnEnabled", Order = 29)]
        public int SubmitBtnEnabled { get; set; }

        /// <summary>
        /// Gets or sets Approval Button Enable
        /// </summary>
        [DataMember(Name = "ApprovalBtnEnable", Order = 30)]
        public int ApprovalBtnEnable { get; set; }

        /// <summary>
        /// Gets or sets Mandatory doc submitted alert
        /// </summary>
        [DataMember(Name = "MandatoryAlert", Order = 31)]
        public int MandatoryAlert { get; set; }

        /// <summary>
        /// Gets or sets Document uploaded TS
        /// </summary>
        [DataMember(Name = "DocUploadedTS", Order = 32)]
        public string DocUploadedTS { get; set; }

        /// <summary>
        /// Gets or sets Document uploaded TS
        /// </summary>
        [DataMember(Name = "InfoMsg", Order = 33)]
        public string InfoMsg { get; set; }

        /// <summary>
        /// Gets or sets ManDocConfigXML is the data of mandatory document in back papers page.
        /// </summary>
        [DataMember(Name = "ManDocConfigXML", Order = 34)]
        public string ManDocConfigXML { get; set; }
    }

    /// <summary>
    /// Data Contract for Required Document List
    /// </summary>
    public class ReqDocList
    {
        /// <summary>
        /// Gets or sets Vendor requested for insufficiency document
        /// </summary>
        [DataMember(Name = "ReqDocName", Order = 1)]
        public string ReqDocName { get; set; }
    }

    /// <summary>
    /// Data Contract for Menu Tab Content
    /// </summary>
    public class MenuTabContent
    {
        /// <summary>
        /// Gets or sets MenuName
        /// </summary>
        [DataMember(Name = "MenuName", Order = 1)]
        public string MenuName { get; set; }

        /// <summary>
        /// Gets or sets PageUrl
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1056:UriPropertiesShouldNotBeStrings", Justification = "Reviewed."), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "PageUrl", Order = 2)]
        public string PageUrl { get; set; }

        /// <summary>
        /// Gets or sets IsUrlAllowed
        /// </summary>
        [DataMember(Name = "IsUrlAllowed", Order = 3)]
        public int IsUrlAllowed { get; set; }

        /// <summary>
        /// Gets or sets To check whether BGV is available for that specified country and BU Id
        /// </summary>
        [DataMember(Name = "IsBgvEnabled", Order = 4)]
        public int IsBgvEnabled { get; set; }

        /// <summary>
        /// Gets or sets To check landing page
        /// </summary>
        [DataMember(Name = "CurrentPage", Order = 5)]
        public int CurrentPage { get; set; }
    }

    /// <summary>
    /// Contract used for get / set BGV related page notifications
    /// </summary>
    [Serializable]
    public class BgvPageNotification
    {
        /// <summary>
        /// Gets or sets MessageOrder to be followed while displaying
        /// </summary>
        [DataMember(Name = "MessageOrder", Order = 1, IsRequired = true)]
        public int MessageOrder { get; set; }

        /// <summary>
        /// Gets or sets Message to be displayed
        /// </summary>
        [DataMember(Name = "Message", Order = 2, IsRequired = true)]
        public string Message { get; set; }
    }

    /// <summary>
    /// Data Contract for BGV Page Notification Data
    /// </summary>    
    [DataContract(Name = "BgvPageNotificationData", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/DashBoardDC/")]
    [Serializable]
    public sealed class BgvPageNotificationData : IDisposable
    {
        /// <summary>
        /// Gets or sets Candidate Id
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 1, IsRequired = true)]
        public long CandidateId { get; set; }

        /// <summary>
        /// Gets or sets SessionId
        /// </summary>
        [DataMember(Name = "SessionId", Order = 2, IsRequired = true)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets RoleGroupId
        /// </summary>
        [DataMember(Name = "RoleGroupId", Order = 3, IsRequired = true)]
        public int RoleGroupId { get; set; }

        /// <summary>
        /// Gets or sets BGV PageId
        /// </summary>
        [DataMember(Name = "BgvPageId", Order = 4, IsRequired = true)]
        public int BgvPageId { get; set; }

        /// <summary>
        /// Gets or sets BGV PageNotificationList
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "BgvPageNoticationList", Order = 4, IsRequired = false)]
        public List<BgvPageNotification> BgvPageNoticationList { get; set; }

        /// <summary>
        /// Method for Dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }

    /// <summary>
    /// Data Contract for Document Details
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class DocumentDetailList : List<DocumentDC>
    {
    }

    /// <summary>
    /// Data Contract for Upload Document Details
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class BgvUploadDocument : List<BGVDocumentUploadDetail>
    {
    }

    /// <summary>
    /// Data Contract for Component Details
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class ComponentList : List<ComponentDC>
    {
    }

    /// <summary>
    /// Data Contract for Requested Document Details
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class RequestedDocuments : List<ReqDocList>
    {
    }

    /// <summary>
    /// Data Contract for Menu Details
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class MenuTabList : List<MenuTabContent>
    {
    }

    /// <summary>
    /// Data Contract for Institution Details
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class InstitutionList : List<InstitutionDC>
    {
    }
}
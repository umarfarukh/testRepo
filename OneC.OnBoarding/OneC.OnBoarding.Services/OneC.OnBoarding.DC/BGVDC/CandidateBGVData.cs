//-----------------------------------------------------------------------
// <copyright file="CandidateBGVData.cs" company="CTS">
//     Copyright (c) . All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

/*About me
*******************************************************
* Name space        : OneC.OnBoarding.DC
* Class Name       : CandidateBGVData.cs
* Version          : 1.0
* Type             : DataContract
* Purpose          : Data contracts for DashBoards
* Created date     : 2014-July-04
* Author           : 313248
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
    using System.Data;
    using System.Runtime.Serialization;

    /// <summary>
    /// Data Contract for CandidateBGVData
    /// </summary>
    [DataContract(Name = "CandidateBGVData", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/BGVDC/")]
    [Serializable]
    public class CandidateBGVData
    {
        /// <summary>
        /// Gets or sets for CandidateId
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 1, IsRequired = true)]
        public long CandidateId { get; set; }

        /// <summary>
        /// Gets or sets for Candidate Name
        /// </summary>
        [DataMember(Name = "CandidateName", Order = 2, IsRequired = true)]
        public string CandidateName { get; set; }

        /// <summary>
        /// Gets or sets for SessionId
        /// </summary>
        [DataMember(Name = "SessionId", Order = 3, IsRequired = true)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets for CountryId
        /// </summary>
        [DataMember(Name = "CountryId", Order = 4, IsRequired = true)]
        public int CountryId { get; set; }

        /// <summary>
        /// Gets or sets for ComponentCode
        /// </summary>
        [DataMember(Name = "ComponentCode", Order = 5)]
        public string ComponentCode { get; set; }

        /// <summary>
        /// Gets or sets for ComponentDetailId
        /// </summary>
        [DataMember(Name = "ComponentDetailId", Order = 6)]
        public int ComponentDetailId { get; set; }

        /// <summary>
        /// Gets or sets for ComponentRunnerId
        /// </summary>
        [DataMember(Name = "ComponentRunnerId", Order = 7)]
        public int ComponentRunnerId { get; set; }

        /// <summary>
        /// Gets or sets for SP Mode
        /// </summary>
        [DataMember(Name = "SpMode", Order = 8)]
        public int SpMode { get; set; }

        /// <summary>
        /// Gets or sets for AssignVendorBoxList
        /// </summary>
        [DataMember(Name = "AssignVendorBoxList", Order = 9)]
        public Collection<AssignVendorVerificationData> AssignVendorBoxList { get; set; }

        /// <summary>
        /// Gets or sets for AssignVendorDocList
        /// </summary>
        [DataMember(Name = "AssignVendorComponentList", Order = 10)]
        public Collection<AssignVendorComponentData> AssignVendorComponentList { get; set; }

        /// <summary>
        /// Gets or sets for AssignVendorDocList
        /// </summary>
        [DataMember(Name = "AssignVendorDocList", Order = 11)]
        public Collection<AssignVendorDocumentData> AssignVendorDocList { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether this is Active
        /// </summary>
        [DataMember(Name = "IsActive", Order = 12)]
        public bool IsActive { get; set; }

        /// <summary>
        /// Method for Dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }

    /// <summary>
    /// Class for DocumentDC
    /// </summary>
    public class DocumentDC
    {
        /// <summary>
        /// Gets or sets for DocumentId
        /// </summary>
        [DataMember(Name = "DocumentId", Order = 1)]
        public int DocumentId { get; set; }

        /// <summary>
        /// Gets or sets for DocumentName
        /// </summary>
        [DataMember(Name = "DocumentName", Order = 2)]
        public string DocumentName { get; set; }

        /// <summary>
        /// Gets or sets for IsMandatory
        /// </summary>
        [DataMember(Name = "IsMandatory", Order = 3)]
        public int IsMandatory { get; set; }

        /// <summary>
        /// Gets or sets for IsDefault
        /// </summary>
        [DataMember(Name = "IsDefault", Order = 4)]
        public int IsDefault { get; set; }

        /// <summary>
        /// Gets or sets for DocumentStatus
        /// </summary>
        [DataMember(Name = "DocumentStatus", Order = 5)]
        public int DocumentStatus { get; set; }

        /// <summary>
        /// Gets or sets for ComponentDetailId
        /// </summary>
        [DataMember(Name = "ComponentDetailId", Order = 6)]
        public int ComponentDetailId { get; set; }

        /// <summary>
        /// Gets or sets for ComponentRunnerId
        /// </summary>
        [DataMember(Name = "ComponentRunnerId", Order = 7)]
        public int ComponentRunnerId { get; set; }

        /// <summary>
        /// Method for Dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }

    /// <summary>
    /// Class for ComponentDC
    /// </summary>
    public class ComponentDC
    {
        /// <summary>
        /// Gets or sets for ComponentId
        /// </summary>
        [DataMember(Name = "ComponentId", Order = 1)]
        public int ComponentId { get; set; }

        /// <summary>
        /// Gets or sets for Component Des
        /// </summary>
        [DataMember(Name = "ComponentDesc", Order = 2)]
        public string ComponentDesc { get; set; }

        /// <summary>
        /// Gets or sets for ComponentDetailId
        /// </summary>
        [DataMember(Name = "ComponentDetailId", Order = 3)]
        public int ComponentDetailId { get; set; }

        /// <summary>
        /// Gets or sets for ComponentHtml
        /// </summary>
        [DataMember(Name = "ComponentHtml", Order = 4)]
        public string ComponentHtml { get; set; }

        /// <summary>
        /// Gets or sets for ComponentCode
        /// </summary>
        [DataMember(Name = "ComponentCode", Order = 5)]
        public string ComponentCode { get; set; }

        /// <summary>
        /// Gets or sets for IsComponentSelected
        /// </summary>
        [DataMember(Name = "IsComponentSelected", Order = 6)]
        public int IsComponentSelected { get; set; }

        /// <summary>
        /// Gets or sets for ComponentRunnerId
        /// </summary>
        [DataMember(Name = "ComponentRunnerId", Order = 7)]
        public int ComponentRunnerId { get; set; }

        /// <summary>
        /// Gets or sets for AssignStatus
        /// </summary>
        [DataMember(Name = "AssignStatus", Order = 8)]
        public int AssignStatus { get; set; }

        /// <summary>
        /// Method for Dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }

    /// <summary>
    /// Class for ComponentDataDC
    /// </summary>
    public class ComponentDataDC
    {
        /// <summary>
        /// Gets or sets for ComponentRunnerId
        /// </summary>
        [DataMember(Name = "ComponentRunnerId", Order = 1)]
        public int ComponentRunnerId { get; set; }

        /// <summary>
        /// Gets or sets for InstitutionId
        /// </summary>
        [DataMember(Name = "InstitutionId", Order = 2)]
        public int InstitutionId { get; set; }

        /// <summary>
        /// Gets or sets for InstitutionName
        /// </summary>
        [DataMember(Name = "InstitutionName", Order = 3)]
        public string InstitutionName { get; set; }

        /// <summary>
        /// Gets or sets for DisplayOrder
        /// </summary>
        [DataMember(Name = "DisplayOrder", Order = 4)]
        public int DisplayOrder { get; set; }

        /// <summary>
        /// Gets or sets for CandidateFrom
        /// </summary>
        [DataMember(Name = "CandFrom", Order = 5)]
        public string CandFrom { get; set; }

        /// <summary>
        /// Gets or sets for CandidateTo
        /// </summary>
        [DataMember(Name = "CandTo", Order = 6)]
        public string CandTo { get; set; }

        /// <summary>
        /// Gets or sets for HRFrom
        /// </summary>
        [DataMember(Name = "HRFrom", Order = 7)]
        public string HRFrom { get; set; }

        /// <summary>
        /// Gets or sets for HRTo
        /// </summary>
        [DataMember(Name = "HRTo", Order = 8)]
        public string HRTo { get; set; }

        /// <summary>
        /// Gets or sets for EducationCollegeName
        /// </summary>
        [DataMember(Name = "EduCollegeName", Order = 9)]
        public string EduCollegeName { get; set; }

        /// <summary>
        /// Gets or sets for EducationPercentage
        /// </summary>
        [DataMember(Name = "EduPercentage", Order = 10)]
        public int EduPercentage { get; set; }

        /// <summary>
        /// Gets or sets for EducationSpecialization
        /// </summary>
        [DataMember(Name = "EduSpecialization", Order = 11)]
        public string EduSpecialization { get; set; }

        /// <summary>
        /// Gets or sets for EducationModeOfEducation
        /// </summary>
        [DataMember(Name = "EduModeOfEducation", Order = 12)]
        public string EduModeOfEducation { get; set; }

        /// <summary>
        /// Gets or sets for ComponentDetailId
        /// </summary>
        [DataMember(Name = "ComponentDetailId", Order = 13)]
        public int ComponentDetailId { get; set; }

        /// <summary>
        /// Gets or sets for ComponentCode
        /// </summary>
        [DataMember(Name = "ComponentCode", Order = 14)]
        public string ComponentCode { get; set; }

        /// <summary>
        /// Gets or sets for ComponentId
        /// </summary>
        [DataMember(Name = "ComponentId", Order = 15)]
        public int ComponentId { get; set; }

        /// <summary>
        /// Gets or sets for Component Des
        /// </summary>
        [DataMember(Name = "ComponentDesc", Order = 16)]
        public string ComponentDesc { get; set; }

        /// <summary>
        /// Gets or sets for NHStatus
        /// </summary>
        [DataMember(Name = "NHStatus", Order = 17)]
        public string NHStatus { get; set; }

        /// <summary>
        /// Gets or sets for VendorName
        /// </summary>
        [DataMember(Name = "VendorName", Order = 18)]
        public string VendorName { get; set; }

        /// <summary>
        /// Gets or sets for VendorStatus
        /// </summary>
        [DataMember(Name = "VendorStatus", Order = 19)]
        public string VendorStatus { get; set; }

        /// <summary>
        /// Gets or sets for VendorSubStatus
        /// </summary>
        [DataMember(Name = "VendorSubStatus", Order = 20)]
        public string VendorSubStatus { get; set; }

        /// <summary>
        /// Gets or sets for VendorComments
        /// </summary>
        [DataMember(Name = "VendorComments", Order = 21)]
        public string VendorComments { get; set; }

        /// <summary>
        /// Gets or sets for CandidateId
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 22, IsRequired = true)]
        public long CandidateId { get; set; }

        /// <summary>
        /// Gets or sets for SessionId
        /// </summary>
        [DataMember(Name = "SessionId", Order = 23, IsRequired = true)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets for BoxId
        /// </summary>
        [DataMember(Name = "BoxId", Order = 24)]
        public int BoxId { get; set; }

        /// <summary>
        /// Method for Dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }

    /// <summary>
    /// Class for DocumentDataDC
    /// </summary>
    public class DocumentDataDC
    {
        /// <summary>
        /// Gets or sets for CandidateId
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 1, IsRequired = true)]
        public long CandidateId { get; set; }

        /// <summary>
        /// Gets or sets for SessionId
        /// </summary>
        [DataMember(Name = "SessionId", Order = 2, IsRequired = true)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets for BoxId
        /// </summary>
        [DataMember(Name = "BoxId", Order = 3)]
        public int BoxId { get; set; }

        /// <summary>
        /// Gets or sets for DocumentId
        /// </summary>
        [DataMember(Name = "DocumentId", Order = 4)]
        public int DocumentId { get; set; }

        /// <summary>
        /// Gets or sets for DocumentName
        /// </summary>
        [DataMember(Name = "DocumentName", Order = 5)]
        public string DocumentName { get; set; }

        /// <summary>
        /// Gets or sets for ComponentId
        /// </summary>
        [DataMember(Name = "ComponentId", Order = 6)]
        public int ComponentId { get; set; }

        /// <summary>
        /// Gets or sets for ComponentRunnerId
        /// </summary>
        [DataMember(Name = "ComponentRunnerId", Order = 7)]
        public int ComponentRunnerId { get; set; }

        /// <summary>
        /// Gets or sets for ComponentDetailId
        /// </summary>
        [DataMember(Name = "ComponentDetailId", Order = 8)]
        public int ComponentDetailId { get; set; }

        /// <summary>
        /// Gets or sets for ComponentCode
        /// </summary>
        [DataMember(Name = "ComponentCode", Order = 9)]
        public string ComponentCode { get; set; }

        /// <summary>
        /// Gets or sets for AssignStatus
        /// </summary>
        [DataMember(Name = "IsAssignToVendor", Order = 10)]
        public int IsAssignToVendor { get; set; }

        /// <summary>
        /// Gets or sets for IsMandatory
        /// </summary>
        [DataMember(Name = "IsMandatory", Order = 11)]
        public int IsMandatory { get; set; }

        /// <summary>
        /// Gets or sets for IsDefault
        /// </summary>
        [DataMember(Name = "IsDefault", Order = 12)]
        public int IsDefault { get; set; }

        /// <summary>
        /// Gets or sets for DocumentStatus
        /// </summary>
        [DataMember(Name = "DocumentStatus", Order = 13)]
        public int DocumentStatus { get; set; }

        /// <summary>
        /// Gets or sets for DocumentMatrixId
        /// </summary>
        [DataMember(Name = "DocumentMatrixId", Order = 14)]
        public int DocumentMatrixId { get; set; }

        /// <summary>
        /// Method for Dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }

    /// <summary>
    /// Class for AssignVendorDocumentData
    /// </summary>
    public class AssignVendorDocumentData
    {
        /// <summary>
        /// Gets or sets for BoxId
        /// </summary>
        [DataMember(Name = "BoxId", Order = 1)]
        public int BoxId { get; set; }

        /// <summary>
        /// Gets or sets for ComponentCode
        /// </summary>
        [DataMember(Name = "ComponentCode", Order = 2)]
        public string ComponentCode { get; set; }

        /// <summary>
        /// Gets or sets for ComponentDetailId
        /// </summary>
        [DataMember(Name = "ComponentDetailId", Order = 3)]
        public int ComponentDetailId { get; set; }

        /// <summary>
        /// Gets or sets for ComponentRunnerId
        /// </summary>
        [DataMember(Name = "ComponentRunnerId", Order = 4)]
        public int ComponentRunnerId { get; set; }

        /// <summary>
        /// Gets or sets for DocumentMatrixId
        /// </summary>
        [DataMember(Name = "DocumentMatrixId", Order = 5)]
        public int DocumentMatrixId { get; set; }

        /// <summary>
        /// Gets or sets for AssignStatus
        /// </summary>
        [DataMember(Name = "AssignStatus", Order = 6)]
        public int AssignStatus { get; set; }

        /// <summary>
        /// Method for Dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }

    /// <summary>
    /// Class for AssignVendorVerificationData
    /// </summary>
    public class AssignVendorVerificationData
    {
        /// <summary>
        /// Gets or sets for BoxId
        /// </summary>
        [DataMember(Name = "BoxId", Order = 1)]
        public int BoxId { get; set; }

        /// <summary>
        /// Gets or sets for VendorId
        /// </summary>
        [DataMember(Name = "VendorId", Order = 2)]
        public int VendorId { get; set; }

        /// <summary>
        /// Gets or sets for VendorId
        /// </summary>
        [DataMember(Name = "VerificationLevel", Order = 3)]
        public int VerificationLevel { get; set; }

        /// <summary>
        /// Gets or sets for HR status
        /// </summary>
        [DataMember(Name = "Hrstatus", Order = 4)]
        public int HrStatus { get; set; }

        /// <summary>
        /// Gets or sets for HRComment
        /// </summary>
        [DataMember(Name = "HrComment", Order = 5)]
        public string HrComment { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether this is Active
        /// </summary>
        [DataMember(Name = "IsActive", Order = 6)]
        public int IsActive { get; set; }

        /// <summary>
        /// Gets or sets for AssignType
        /// </summary>
        [DataMember(Name = "AssignType", Order = 7)]
        public int AssignType { get; set; }

        /// <summary>
        /// Method for Dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }

    /// <summary>
    /// Class for AssignVendorComponentData
    /// </summary>
    public class AssignVendorComponentData
    {
        /// <summary>
        /// Gets or sets for BoxId
        /// </summary>
        [DataMember(Name = "BoxId", Order = 1)]
        public int BoxId { get; set; }

        /// <summary>
        /// Gets or sets for ComponentCode
        /// </summary>
        [DataMember(Name = "ComponentCode", Order = 2)]
        public string ComponentCode { get; set; }

        /// <summary>
        /// Gets or sets for ComponentDetailId
        /// </summary>
        [DataMember(Name = "ComponentDetailId", Order = 3)]
        public int ComponentDetailId { get; set; }

        /// <summary>
        /// Gets or sets for ComponentRunnerId
        /// </summary>
        [DataMember(Name = "ComponentRunnerId", Order = 4)]
        public int ComponentRunnerId { get; set; }

        /// <summary>
        /// Gets or sets for HR Status
        /// </summary>
        [DataMember(Name = "HrStatus", Order = 6)]
        public int HrStatus { get; set; }

        /// <summary>
        /// Gets or sets for HR Comments
        /// </summary>
        [DataMember(Name = "HrComments", Order = 7)]
        public string HrComments { get; set; }

        /// <summary>
        /// Method for Dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }

    /// <summary>
    /// Class for AssignVendorData
    /// </summary>
    public class AssignVendorData
    {
        /// <summary>
        /// Gets or sets for CandidateId
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 1, IsRequired = true)]
        public long CandidateId { get; set; }

        /// <summary>
        /// Gets or sets for SessionId
        /// </summary>
        [DataMember(Name = "SessionId", Order = 2, IsRequired = true)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets for AssignVendorVerificationDetail
        /// </summary>
        [DataMember(Name = "AssignVendorVerificationDetail", Order = 3)]
        public DataTable AssignVendorVerificationDetail { get; set; }

        /// <summary>
        /// Gets or sets for AssignVendorComponentDetail
        /// </summary>
        [DataMember(Name = "AssignVendorComponentDetail", Order = 4)]
        public DataTable AssignVendorComponentDetail { get; set; }

        /// <summary>
        /// Gets or sets for AssignVendorDocumentDetail
        /// </summary>
        [DataMember(Name = "AssignVendorDocumentDetail", Order = 5)]
        public DataTable AssignVendorDocumentDetail { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether this is Active
        /// </summary>
        [DataMember(Name = "IsActive", Order = 6)]
        public bool IsActive { get; set; }

        /// <summary>
        /// Method for Dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
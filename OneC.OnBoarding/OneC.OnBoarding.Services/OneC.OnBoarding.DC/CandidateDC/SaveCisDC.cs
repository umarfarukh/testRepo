// <copyright file = "SaveCisDC.cs" company = "CTS">
// Copyright (c) OnBoarding_SaveCisDC. All rights reserved.
// </copyright>

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DC         
 * Class Name       : SaveCisDC.cs
 * Version          : 1.0
 * Type             : DataContract
 * Purpose          : Data contracts for Saving Cis Details
 * Created date     : 2012-Dec-20
 * Author           : 249510
 * Reviewed by      :
 *******************************************************
*/

namespace OneC.OnBoarding.DC.CandidateDC
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Text;
    #endregion Namespaces

    /// <summary>
    /// Data Contract for saving task details
    /// </summary>
    [DataContract(Name = "SaveCisDC", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/CandidateDC/")]
    [Serializable]
    public sealed class SaveCisDC : IDisposable
    {
        /// <summary>
        /// Gets or sets Current SessionId
        /// </summary>
        [DataMember(Name = "SessionId", Order = 1, IsRequired = true)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets CandidateId
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 2, IsRequired = true)]
        public long CandidateId { get; set; }

        /// <summary>
        /// Gets or sets Candidate Name
        /// </summary>
        [DataMember(Name = "CandidateName", Order = 3, IsRequired = true)]
        public string CandidateName { get; set; }

        /// <summary>
        /// Gets or sets CISStatus
        /// </summary>
        [DataMember(Name = "CisStatus", Order = 4, IsRequired = true)]
        public int CisStatus { get; set; }

        /// <summary>
        /// Gets or sets SP Mode
        /// </summary>
        [DataMember(Name = "SpMode", Order = 5, IsRequired = true)]
        public int SpMode { get; set; }

        /// <summary>
        /// Gets or sets DashboardMode
        /// </summary>
        [DataMember(Name = "DashboardMode", Order = 6, IsRequired = true)]
        public int DashboardMode { get; set; }

        /// <summary>
        /// Gets or sets Is Candidate Information Sheet Save
        /// </summary>
        [DataMember(Name = "IsCisSaved", Order = 7, IsRequired = true)]
        public int IsCisSaved { get; set; }

        /// <summary>
        /// Gets or sets Is Candidate Information Sheet Submit
        /// </summary>
        [DataMember(Name = "IsCisSubmitted", Order = 8, IsRequired = true)]
        public int IsCisSubmitted { get; set; }

        /// <summary>
        /// Gets or sets Is Candidate Information Sheet Locked
        /// </summary>
        [DataMember(Name = "IsCisLocked", Order = 9, IsRequired = true)]
        public int IsCisLocked { get; set; }

        /// <summary>
        /// Gets or sets Is the validation success
        /// </summary>
        [DataMember(Name = "ValidationStatus", Order = 10, IsRequired = true)]
        public int ValidationStatus { get; set; }

        /// <summary>
        /// Gets or sets Validation message
        /// </summary>
        [DataMember(Name = "ValidationMessage", Order = 11, IsRequired = true)]
        public string ValidationMessage { get; set; }

        /// <summary>
        /// Gets or sets Candidate Information Sheet PersonalDataXML
        /// </summary>
        [DataMember(Name = "CisPersonalDataXML", Order = 12, IsRequired = true)]
        public string CisPersonalDataXML { get; set; }

        /// <summary>
        /// Gets or sets Candidate Information Sheet PersonalDataLogXML
        /// </summary>
        [DataMember(Name = "CisPersonalDataLogXML", Order = 13, IsRequired = true)]
        public string CisPersonalDataLogXML { get; set; }

        /// <summary>
        /// Gets or sets Candidate Information Sheet Experience DataXML
        /// </summary>
        [DataMember(Name = "CisExpDataXML", Order = 14, IsRequired = true)]
        public string CisExpDataXML { get; set; }

        /// <summary>
        /// Gets or sets Candidate Information Sheet Experience DataLogXML
        /// </summary>
        [DataMember(Name = "CisExpDataLogXML", Order = 15, IsRequired = true)]
        public string CisExpDataLogXML { get; set; }

        /// <summary>
        /// Gets or sets Candidate Information Sheet EduDataXML
        /// </summary>
        [DataMember(Name = "CisEduDataXML", Order = 16, IsRequired = true)]
        public string CisEduDataXML { get; set; }

        /// <summary>
        /// Gets or sets Candidate Information Sheet EduDataLogXML
        /// </summary>
        [DataMember(Name = "CisEduDataLogXML", Order = 17, IsRequired = true)]
        public string CisEduDataLogXML { get; set; }

        /// <summary>
        /// Gets or sets Personal Data flag
        /// </summary>
        [DataMember(Name = "CisPersonalDataFlag", Order = 18, IsRequired = true)]
        public int CisPersonalDataFlag { get; set; }

        /// <summary>
        /// Gets or sets Personal Data flag
        /// </summary>
        [DataMember(Name = "CisEduDataFlag", Order = 19, IsRequired = true)]
        public int CisEduDataFlag { get; set; }

        /// <summary>
        /// Gets or sets Personal Data flag
        /// </summary>
        [DataMember(Name = "CisExpDataFlag", Order = 20, IsRequired = true)]
        public int CisExpDataFlag { get; set; }

        /// <summary>
        /// Gets or sets Candidate Information Sheet DataXML
        /// </summary>
        [DataMember(Name = "CisDataXML", Order = 21, IsRequired = true)]
        public string CisDataXML { get; set; }

        /// <summary>
        /// Gets or sets Role group to which the current logged in user belongs
        /// </summary>
        [DataMember(Name = "RoleGroupId", Order = 22, IsRequired = true)]
        public int RoleGroupId { get; set; }

        /// <summary>
        /// Gets or sets Mode
        /// </summary>
        [DataMember(Name = "Mode", Order = 23, IsRequired = true)]
        public int Mode { get; set; }

        /// <summary>
        /// Gets or sets Status
        /// </summary>
        [DataMember(Name = "Status", Order = 24)]
        public int Status { get; set; }

        /// <summary>
        /// Gets or sets CountryId
        /// </summary>
        [DataMember(Name = "CountryId", Order = 25)]
        public int CountryId { get; set; }

        /// <summary>
        /// Gets or sets Specific component type
        /// </summary>
        [DataMember(Name = "ComponentType", Order = 26)]
        public int ComponentType { get; set; }

        /// <summary>
        /// Gets or sets Candidate Information Sheet DocumentListXml
        /// </summary>
        [DataMember(Name = "CisDocumentListXml", Order = 27)]
        public string CisDocumentListXml { get; set; }

        /// <summary>
        /// Gets or sets Candidate Information Sheet ComponentData
        /// </summary>
        [DataMember(Name = "CisComponentData", Order = 28)]
        public string CisComponentData { get; set; }

        /// <summary>
        /// Gets or sets SaveMode
        /// </summary>
        [DataMember(Name = "SaveMode", Order = 29)]
        public int SaveMode { get; set; }

        /// <summary>
        /// Gets or sets SaveMode
        /// </summary>
        [DataMember(Name = "BpNoGoFlag", Order = 30)]
        public int BpNoGoFlag { get; set; }

        /// <summary>
        /// Gets or sets BP NoGoComments
        /// </summary>
        [DataMember(Name = "bpNoGoComments", Order = 31)]
        public string BpNoGoComments { get; set; }

        /// <summary>
        /// Gets or sets Method for Dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}

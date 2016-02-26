// <copyright file = "HTransferCandidateData.cs" company = "CTS">
// Copyright (c) OnBoarding_HTransferCandidateData. All rights reserved.
// </copyright>

namespace OneC.OnBoarding.DC.DashBoardDC
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Text;
    #endregion

    /// <summary>
    /// Data Contract for HTransfer Data
    /// </summary>
    [DataContract(Name = "HTransferCandidateData", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/DashBoardDC/")]
    [Serializable]
    public sealed class HTransferCandidateData : IDisposable 
    {      
        /// <summary>
        ///  Gets or sets CandidateId
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 1, IsRequired = true)]
        public long CandidateId { get; set; }

        /// <summary>
        /// Gets or sets TaskSessionId
        /// </summary>
        [DataMember(Name = "SessionId", Order = 2, IsRequired = true)]
        public long SessionId { get; set; }

        /// <summary>
        ///  Gets or sets CandidateId
        /// </summary>
        [DataMember(Name = "CountryId", Order = 3, IsRequired = true)]
        public int CountryId { get; set; }

        /// <summary>
        /// Gets or sets SPMode
        /// </summary>
        [DataMember(Name = "SpMode", Order = 4, IsRequired = true)]
        public int SpMode { get; set; }

        /// <summary>
        /// Gets or sets RoleGroupId
        /// </summary>
        [DataMember(Name = "RoleGroupId", Order = 5, IsRequired = true)]
        public int RoleGroupId { get; set; }

        /// <summary>
        /// Method for Dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }

    /// <summary>
    /// Class for HTransfer Document Upload
    /// </summary>
    public class HTransferDocumentUploadDetail
    {
        /// <summary>
        /// Gets or sets htmlContent
        /// </summary>
        [DataMember(Name = "HtmlContent", Order = 1, IsRequired = true)]
        public string HtmlContent { get; set; }
    }

    /// <summary>
    /// Class for HTransferCandidateDocInfo
    /// </summary>
    public class HTransferCandidateDocInfo
    {
        /// <summary>
        /// Gets or sets CanBeSubmitted
        /// </summary>
        [DataMember(Name = "CanBeSubmitted", Order = 1)]
        public short CanBeSubmitted { get; set; } 
                           
        /// <summary>
        /// Gets or sets UploadURL
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1056:UriPropertiesShouldNotBeStrings", Justification = "Reviewed."), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "UploadURL", Order = 2)]
        public string UploadURL { get; set; }

        /// <summary>
        /// Gets or sets PK_CandidateDocumentUploadDetail
        /// </summary>
        [DataMember(Name = "Pk_CandidateDocumentUploadDetail", Order = 3)]
        public long Pk_CandidateDocumentUploadDetail { get; set; }

        /// <summary>
        /// Gets or sets DocumentName
        /// </summary>
        [DataMember(Name = "DocumentName", Order = 4)]
        public string DocumentName { get; set; }

        /// <summary>
        /// Gets or sets DocumentStatus
        /// </summary>
        [DataMember(Name = "DocumentStatus", Order = 5)]
        public string DocumentStatus { get; set; }

        /// <summary>
        /// Gets or sets QuestionGroupId
        /// </summary>
        [DataMember(Name = "QuestionGroupId", Order = 6)]
        public int QuestionGroupId { get; set; }

        /// <summary>
        /// Gets or sets IsMandatory
        /// </summary>
        [DataMember(Name = "IsMandatory", Order = 7)]
        public short IsMandatory { get; set; }
    }

    /// <summary>
    /// Class for HTransferDocumentDC
    /// </summary>
    public class HTransferDocumentDC
    {
        /// <summary>
        /// Gets or sets CandidateId
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 1, IsRequired = true)]
        public long CandidateId { get; set; }

        /// <summary>
        /// Gets or sets TaskSessionId
        /// </summary>
        [DataMember(Name = "SessionId", Order = 2, IsRequired = true)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets RoleGroupId
        /// </summary>
        [DataMember(Name = "RoleGroupId", Order = 3, IsRequired = true)]
        public int RoleGroupId { get; set; }

        /// <summary>
        /// Gets or sets DocumentId
        /// </summary>
        [DataMember(Name = "DocumentId", Order = 4)]
        public int DocumentId { get; set; }

        /// <summary>
        /// Gets or sets DocumentName
        /// </summary>
        [DataMember(Name = "DocumentName", Order = 5)]
        public string DocumentName { get; set; }

        /// <summary>
        /// Gets or sets SPMode
        /// </summary>
        [DataMember(Name = "SpMode", Order = 6, IsRequired = true)]
        public int SpMode { get; set; }

        /// <summary>
        /// Gets or sets DocumentStatus
        /// </summary>
        [DataMember(Name = "DocumentStatus", Order = 7)]
        public int DocumentStatus { get; set; }

        /// <summary>
        /// Gets or sets PK_CandidateDocumentUploadDetail
        /// </summary>
        [DataMember(Name = "Pk_CandidateDocumentUploadDetail", Order = 8)]
        public long Pk_CandidateDocumentUploadDetail { get; set; }

        /// <summary>
        /// Gets or sets YesNoFlag
        /// </summary>
        [DataMember(Name = "YNFlag", Order = 9)]
        public int YNFlag { get; set; }

        /// <summary>
        /// Gets or sets QuestionGroupId
        /// </summary>
        [DataMember(Name = "QuestionGroupId", Order = 10)]
        public int QuestionGroupId { get; set; }

        /// <summary>
        /// Gets or sets DocumentUploadSource
        /// </summary>
        [DataMember(Name = "UploadSrc", Order = 11)]
        public string UploadSrc { get; set; }

        /// <summary>
        /// Gets or sets GroupUploadedCount
        /// </summary>
        [DataMember(Name = "GroupUploadedCount", Order = 12)]
        public int GroupUploadedCount { get; set; }

        /// <summary>
        /// Gets or sets ECMDocumentName
        /// </summary>
        [DataMember(Name = "ECMDocumentName", Order = 13)]
        public string ECMDocumentName { get; set; }

        /// <summary>
        /// Gets or sets StatusFlag
        /// </summary>
        [DataMember(Name = "StatusFlag", Order = 14)]
        public int StatusFlag { get; set; }

        /// <summary>
        /// Gets or sets ResponseMessage
        /// </summary>
        [DataMember(Name = "ResponseMessage", Order = 15)]
        public string ResponseMessage { get; set; }

        /// <summary>
        /// Gets or sets ResponseCode
        /// </summary>
        [DataMember(Name = "ResponseCode", Order = 16)]
        public int ResponseCode { get; set; }

        /// <summary>
        /// Gets or sets Filename
        /// </summary>
        [DataMember(Name = "Filename", Order = 17)]
        public string Filename { get; set; }

        /// <summary>
        /// Gets or sets FileType
        /// </summary>
        [DataMember(Name = "FileType", Order = 18)]
        public string FileType { get; set; }
        
        /// <summary>
        /// Gets or sets AdditionalDocumentName
        /// </summary>
        [DataMember(Name = "AdditionalDocumentName", Order = 19)]
        public string AdditionalDocumentName { get; set; }
    }

    /// <summary>
    /// List for HTransferDocumentDetail
    /// </summary>
    [Serializable]
    public class HTransferDocumentDetailList : List<HTransferDocumentDC>
    { 
    }

    /// <summary>
    /// List for HTransferUploadDocument
    /// </summary>
    [Serializable]
    public class HTransferUploadDocument : List<HTransferDocumentUploadDetail>
    {
    }
}
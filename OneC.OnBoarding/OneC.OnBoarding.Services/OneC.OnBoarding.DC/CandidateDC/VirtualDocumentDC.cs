// <copyright file = "VirtualDocumentDC.cs" company = "CTS">
// Copyright (c) OnBoarding_VirtualDocumentDC. All rights reserved.
// </copyright>

namespace OneC.OnBoarding.DC.CandidateDC
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Text;
    using System.Web;
    using OneC.OnBoarding.DC.CandidateDC;
    using OneC.OnBoarding.DC.UtilityDC;
    #endregion Namespaces

    /// <summary>
    /// Data Contract for VirtualDocumentDC
    /// </summary>
    [DataContract(Name = "VirtualDocumentDC", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/CandidateDC/")]
    [Serializable]
    public class VirtualDocumentDC
    {
        /// <summary>
        /// Gets or sets for SessionId
        /// </summary>
        [DataMember(Name = "SessionId", Order = 0)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets for CandidateId
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 1)]
        public long CandidateId { get; set; }

        /// <summary>
        /// Gets or sets for TaskId
        /// </summary>
        [DataMember(Name = "TaskId", Order = 2)]
        public int TaskId { get; set; }

        /// <summary>
        /// Gets or sets for ECMDocumentName
        /// </summary>
        [DataMember(Name = "ECMDocumentName", Order = 3)]
        public string ECMDocumentName { get; set; }

        /// <summary>
        /// Gets or sets for StatusMode
        /// </summary>
        [DataMember(Name = "StatusMode", Order = 3)]
        public int StatusMode { get; set; }

        /// <summary>
        /// Gets or sets for StatusFlag
        /// </summary>
        [DataMember(Name = "StatusFlag", Order = 4)]
        public int StatusFlag { get; set; }

        /// <summary>
        /// Gets or sets for ResponseCode
        /// </summary>
        [DataMember(Name = "ResponseCode", Order = 5)]
        public int ResponseCode { get; set; }

        /// <summary>
        /// Gets or sets for ResponseMessage
        /// </summary>
        [DataMember(Name = "ResponseMessage", Order = 6)]
        public string ResponseMessage { get; set; }

        /// <summary>
        /// Gets or sets for ApprovedBy
        /// </summary>
        [DataMember(Name = "ApprovedBy", Order = 7)]
        public int ApprovedBy { get; set; }

        /// <summary>
        /// Gets or sets for FileName
        /// </summary>
        [DataMember(Name = "FileName", Order = 8)]
        public string FileName { get; set; }

        /// <summary>
        /// Gets or sets for FileType
        /// </summary>
        [DataMember(Name = "FileType", Order = 9)]
        public string FileType { get; set; }

        ////[DataMember(Name = "DocumentId", Order = 5)]
        ////public int DocumentId { get; set; }
    }
}
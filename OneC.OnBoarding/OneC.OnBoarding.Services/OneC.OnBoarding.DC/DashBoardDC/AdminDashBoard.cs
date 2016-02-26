// <copyright file = "AdminDashBoard.cs" company = "CTS">
// Copyright (c) OnBoarding_AdminDashBoard. All rights reserved.
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
    /// Data Contract for Admin Dashboard
    /// </summary>
    [DataContract(Name = "AdminDashBoard", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/DashBoardDC/")]
    [Serializable]
    public class AdminDashBoard
    {
        /// <summary>
        /// Gets or sets CandidateId 
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 1)]
        public int CandidateId { get; set; }

        /// <summary>
        /// Gets or sets TaskId
        /// </summary>
        [DataMember(Name = "TaskId", Order = 2)]
        public int TaskId { get; set; }

        /// <summary>
        /// Gets or sets File Upload Id
        /// </summary>
        [DataMember(Name = "FileUploadId", Order = 3)]
        public int FileUploadId { get; set; }

        /// <summary>
        /// Gets or sets File Upload Status
        /// </summary>
        [DataMember(Name = "FileUploadStatus", Order = 4)]
        public int FileUploadStatus { get; set; }

        /// <summary>
        /// Gets or sets File Upload URL
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1056:UriPropertiesShouldNotBeStrings", Justification = "Reviewed."), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "FileUploadURL", Order = 5)]
        public string FileUploadURL { get; set; }

        /// <summary>
        /// Gets or sets File Upload Status Description
        /// </summary>
        [DataMember(Name = "FileUploadStatusDesc", Order = 6)]
        public string FileUploadStatusDesc { get; set; }

        /// <summary>
        /// Gets or sets ModifiedDate
        /// </summary>
        [DataMember(Name = "ModifiedDate", Order = 7)]
        public DateTime ModifiedDate { get; set; }

        /// <summary>
        /// Gets or sets RejectionDate
        /// </summary>
        [DataMember(Name = "RejectionDate", Order = 8)]
        public string RejectionDate { get; set; }

        /// <summary>
        /// Gets or sets SessionId
        /// </summary>
        [DataMember(Name = "SessionId", IsRequired = true, Order = 9)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets RoleId
        /// </summary>
        [DataMember(Name = "Role", Order = 10)]
        public string RoleId { get; set; }

        /// <summary>
        /// Gets or sets FileScanStatus
        /// </summary>
        [DataMember(Name = "FileScanStatus", Order = 11)]
        public string FileScanStatus { get; set; }
        
        /// <summary>
        /// Gets or sets TaskStatus
        /// </summary>
        [DataMember(Name = "TaskStatus", Order = 12, IsRequired = true)]
        public int TaskStatus { get; set; }

        /// <summary>
        /// Gets or sets CountryId
        /// </summary>
        [DataMember(Name = "CountryId", Order = 13, IsRequired = true)]
        public int CountryId { get; set; }

        /// <summary>
        /// Gets or sets Photo Status description
        /// </summary>
        [DataMember(Name = "Photostatusdescription", Order = 14, IsRequired = true)]
        public string Photostatusdescription { get; set; }
    }
}

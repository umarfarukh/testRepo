// <copyright file = "FileUploadDC.cs" company = "CTS">
// Copyright (c) OnBoarding_FileUploadDC. All rights reserved.
// </copyright>

/*About me
*******************************************************
* Namespace        : OneC.OnBoarding.DC         
* Class Name       : FileUploadDC.cs
* Version          : 1.0
* Type             : DataContract
* Purpose          : Data contracts for FileUpload Class
* Created date     : 2012-May-22
* Author           : 267083
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
    using System.Collections.ObjectModel;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Web;
    using OneC.OnBoarding.DC.CandidateDC;
    using OneC.OnBoarding.DC.UtilityDC;
    #endregion Namespaces

    /// <summary>
    /// Data Contract for FileUploadDC
    /// </summary>
    [DataContract(Name = "FileUploadDC", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/CandidateDC/")]
    [Serializable]
    public class FileUploadDC
    {
        /// <summary>
        /// Gets or sets Session Id
        /// </summary>
        [DataMember(Name = "SessionId", Order = 1)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets Candidate Id
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 2)]
        public long CandidateId { get; set; }

        /// <summary>
        /// Gets or sets Id
        /// </summary>
        [DataMember(Name = "Id", Order = 3)]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets Mode
        /// </summary>
        [DataMember(Name = "Mode", Order = 4)]
        public int Mode { get; set; }

        /// <summary>
        /// Gets or sets File Details
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "FileDetails", Order = 5)]
        public FileDetailList FileDetails { get; set; }

        /// <summary>
        /// Gets or sets Country Id
        /// </summary>
        [DataMember(Name = "CountryId", Order = 6)]
        public int CountryId { get; set; }

        /// <summary>
        /// Gets or sets Meta Data
        /// </summary>
        [DataMember(Name = "MetaData", Order = 7)]
        public string MetaData { get; set; }

        /// <summary>
        /// Gets or sets Title
        /// </summary>
        [DataMember(Name = "Title", Order = 8)]
        public string Title { get; set; }

        /// <summary>
        /// Gets or sets Author
        /// </summary>
        [DataMember(Name = "Author", Order = 9)]
        public string Author { get; set; }

        /// <summary>
        /// Gets or sets Account
        /// </summary>
        [DataMember(Name = "Account", Order = 10)]
        public string Account { get; set; }

        /// <summary>
        /// Gets or sets Associate Id
        /// </summary>
        [DataMember(Name = "AssociateId", Order = 11)]
        public int AssociateId { get; set; }

        /// <summary>
        /// Gets or sets DocumentType
        /// </summary>
        [DataMember(Name = "DocumentType", Order = 12)]
        public string DocumentType { get; set; }

        /// <summary>
        /// Gets or sets SecurityGroup
        /// </summary>
        [DataMember(Name = "SecurityGroup", Order = 13)]
        public string SecurityGroup { get; set; }

        /// <summary>
        /// Gets or sets SecurityGroup
        /// </summary>
        [DataMember(Name = "IsECMEnabled", Order = 13)]
        public int IsECMEnabled { get; set; }

        /// <summary>
        /// Gets or sets FileContentId
        /// </summary>
        [DataMember(Name = "FileContentId", Order = 14)]
        public Guid FileContentId { get; set; }

        /// <summary>
        /// Gets or sets CreatedBy
        /// </summary>
        [DataMember(Name = "CreatedBy", Order = 15)]
        public int CreatedBy { get; set; }        
    }

    /// <summary>
    /// Data Contract for File Detail
    /// </summary>
    [DataContract(Name = "FileDetail", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/CandidateDC/")]
    [Serializable]
    public class FileDetail
    {
        /// <summary>
        /// Gets or sets File Approval Status
        /// </summary>
        [DataMember(Name = "FileApprovalStatus", Order = 1)]
        public int FileApprovalStatus { get; set; }

        /// <summary>
        /// Gets or sets File Upload Status
        /// </summary>
        [DataMember(Name = "FileUploadStatus", Order = 2)]
        public int FileUploadStatus { get; set; }

        /// <summary>
        /// Gets or sets File Name
        /// </summary>
        [DataMember(Name = "FileName", Order = 3)]
        public string FileName { get; set; }

        /// <summary>
        /// Gets or sets Document Name
        /// </summary>
        [DataMember(Name = "DocumentName", Order = 4)]
        public string DocumentName { get; set; }

        /// <summary>
        /// Gets or sets File type
        /// </summary>
        [DataMember(Name = "Filetype", Order = 5)]
        public string Filetype { get; set; }

        /// <summary>
        /// Gets or sets File type Flag
        /// </summary>
        [DataMember(Name = "Flag", Order = 6)]
        public int Flag { get; set; }

        /// <summary>
        /// Gets or sets Document Id
        /// </summary>
        [DataMember(Name = "DocumentId", Order = 7)]
        public int DocumentId { get; set; }

        /// <summary>
        /// Gets or sets Lock status on task
        /// </summary>
        [DataMember(Name = "IsTaskLocked", Order = 8)]
        public int IsTaskLocked { get; set; }

        /// <summary>
        /// Method for Dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }

    /// <summary>
    /// Data Contract for File Detail List
    /// </summary>
    [CollectionDataContract(Name = "FileDetailList", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/CandidateDC/")]
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class FileDetailList : List<FileDetail>
    { 
    }
}
//-----------------------------------------------------------------------
// <copyright file="DocumentDetail.cs" company="OnBoarding_CTS">
//     Copyright BGV data. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DC.UtilityDC
 * Class Name       : DocumentDetail.cs
 * Version          : 1.0
 * Type             : DataContract
 * Purpose          : Data Contracts for ECM functionality
 * Created date     : 2012-Oct-18
 * Author           : 312267
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

namespace OneC.OnBoarding.DC.UtilityDC
{
    #region Namespace
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Linq;    
    using System.Runtime.Serialization;
    using System.Text;
    #endregion Namespace

    /// <summary>
    /// To initialize the approve mode :312267
    /// </summary>
    public enum DocumentApprovalMode
    {
        /// <summary>
        /// for null values
        /// </summary>
        None = 0,

        /// <summary>
        /// This will states the process of auto approval.
        /// </summary>
        Auto = 1,

        /// <summary>
        /// This will states the process of manual approval.
        /// </summary>
        Manual = 2
    }

    /// <summary>
    /// ECM Status
    /// </summary>
    public enum ECMStatus
    {
        /// <summary>
        /// for null values
        /// </summary>
        None = 0,

        /// <summary>
        /// This will states the success status of ECM file.
        /// </summary>
        Pass = 1,

        /// <summary>
        /// This will states the failed status of ECM file.
        /// </summary>
        Fail = 2
    }

    /// <summary>
    /// ECM Status
    /// </summary>
    public enum UpdateStatusMode
    {
        /// <summary>
        /// for null values
        /// </summary>
        None = 0,

        /// <summary>
        /// This will states the PDF generation mode
        /// </summary>
        PdfGeneration = 1,

        /// <summary>
        /// This will states the Upload mode
        /// </summary>
        ECMUpload = 2,

        /// <summary>
        /// This will states the Approval mode.
        /// </summary>
        Approval = 3
    }

    /// <summary>
    /// Data Contract for DocumentDetail
    /// </summary>
    [DataContract(Name = "DocumentDetail", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/IntegrationServices/DataContracts/")]
    [Serializable]
    public class DocumentDetail
    {
        /// <summary>
        /// Gets or sets SessionId
        /// </summary>
        [DataMember(Name = "SessionId", IsRequired = true, Order = 0)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets DocumentMode
        /// </summary>
        [DataMember(Name = "DocumentMode", IsRequired = false, Order = 1)]
        public int DocumentMode { get; set; }

        /// <summary>
        /// Gets or sets CandidateId
        /// </summary>
        [DataMember(Name = "CandidateId", IsRequired = true, Order = 2)]
        public long CandidateId { get; set; }

        /// <summary>
        /// Gets or sets AssociateId
        /// </summary>
        [DataMember(Name = "AssociateId", IsRequired = true, Order = 3)]
        public int AssociateId { get; set; }

        /// <summary>
        /// Gets or sets TaskId
        /// </summary>
        [DataMember(Name = "TaskId", IsRequired = true, Order = 4)]
        public int TaskId { get; set; }

        /// <summary>
        /// Gets or sets DocumentName
        /// </summary>
        [DataMember(Name = "DocumentName", IsRequired = true, Order = 5)]
        public string DocumentName { get; set; }

        /// <summary>
        /// Gets or sets DocumentTitle
        /// </summary>
        [DataMember(Name = "DocumentTitle", IsRequired = true, Order = 6)]
        public string DocumentTitle { get; set; }

        /// <summary>
        /// Gets or sets DocumentPath
        /// </summary>
        [DataMember(Name = "DocumentPath", IsRequired = true, Order = 7)]
        public string DocumentPath { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether IsDocumentContentIncluded
        /// </summary>
        //// <remarks>true if content is included as byte[], false if content is not included</remarks>
        [DataMember(Name = "IsDocumentContentIncluded", IsRequired = true, Order = 8)]
        public bool IsDocumentContentIncluded { get; set; }

        /// <summary>
        /// Gets or sets DocumentContent
        /// </summary>
        [DataMember(Name = "DocumentContent", IsRequired = true, Order = 9)]
        public byte[] DocumentContent { get; set; }

        /// <summary>
        /// Gets or sets DocumentAuthor
        /// </summary>
        [DataMember(Name = "DocumentAuthor", IsRequired = true, Order = 10)]
        public string DocumentAuthor { get; set; }

        /// <summary>
        /// Gets or sets DocumentType
        /// </summary>
        [DataMember(Name = "DocumentType", IsRequired = true, Order = 11)]
        public string DocumentType { get; set; }

        /// <summary>
        /// Gets or sets SubDocumentType
        /// </summary>
        [DataMember(Name = "SubDocumentType", IsRequired = true, Order = 12)]
        public string SubDocumentType { get; set; }

        /// <summary>
        /// Gets or sets IsUploaded
        /// </summary>
        [DataMember(Name = "IsUploaded", IsRequired = true, Order = 13)]
        public int IsUploaded { get; set; }

        /// <summary>
        /// Gets or sets IsApproved
        /// </summary>
        [DataMember(Name = "IsApproved", IsRequired = true, Order = 14)]
        public int IsApproved { get; set; }

        /// <summary>
        /// Gets or sets SecurityGroup
        /// </summary>
        [DataMember(Name = "SecurityGroup", IsRequired = true, Order = 15)]
        public string SecurityGroup { get; set; }

        /// <summary>
        /// Gets or sets Account
        /// </summary>
        [DataMember(Name = "Account", IsRequired = true, Order = 16)]
        public string Account { get; set; }

        /// <summary>
        /// Gets or sets MetaData
        /// </summary>
        [DataMember(Name = "MetaData", IsRequired = false, Order = 17)]
        public string MetaData { get; set; }

        /// <summary>
        /// Gets or sets DocumentMetaDataInfo
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "DocumentMetaDataInfo", IsRequired = true, Order = 18)]
        public DocumentMetaDataList DocumentMetaDataInfo { get; set; }

        /// <summary>
        /// Gets or sets ECMDocumentName
        /// </summary>
        [DataMember(Name = "ECMDocumentName", IsRequired = true, Order = 19)]
        public string ECMDocumentName { get; set; }

        /// <summary>
        /// Gets or sets XGenericName
        /// </summary>
        [DataMember(Name = "XGenericName", IsRequired = true, Order = 20)]
        public string XGenericName { get; set; }

        /// <summary>
        /// Gets or sets DocumentId
        /// </summary>
        [DataMember(Name = "DocumentId", IsRequired = true, Order = 21)]
        public int DocumentId { get; set; }

        /// <summary>
        /// Gets or sets FileType
        /// </summary>
        [DataMember(Name = "FileType", IsRequired = true, Order = 22)]
        public string FileType { get; set; }
    }

    /// <summary>
    /// Data Contract for Document Meta data
    /// </summary>
    [DataContract(Name = "DocumentMetaData", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/IntegrationServices/DataContracts/")]
    [Serializable]
    public class DocumentMetaData
    {
        /// <summary>
        /// Gets or sets Meta Data Name
        /// </summary>
        [DataMember(Name = "MetaDataName", IsRequired = true, Order = 1)]
        public string MetaDataName { get; set; }

        /// <summary>
        /// Gets or sets Meta Data Value
        /// </summary>
        [DataMember(Name = "MetaDataValue", IsRequired = true, Order = 2)]
        public string MetaDataValue { get; set; }
    }

    /// <summary>
    /// Data Contract Document Meta data
    /// </summary>
    [CollectionDataContract(Name = "DocumentMetaDataList", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/IntegrationServices/DataContracts/")]
    [Serializable]
    public class DocumentMetaDataList : List<DocumentMetaData>
    {
    }
        
    /// <summary>
    /// 312267 : Response from ECM upload
    /// </summary>
    [DataContract(Name = "DocumentResponse", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/IntegrationServices/DataContracts/")]
    [Serializable]
    public class DocumentResponse
    {
        /// <summary>
        /// File Name
        /// </summary>
        private string fileName;

        /// <summary>
        /// File Content
        /// </summary>
        private byte[] fileContent;

        /// <summary>
        /// File Type
        /// </summary>
        private string fileType;

        /// <summary>
        /// Gets or sets Document Detail
        /// </summary>
        [DataMember(Name = "DocumentDetail", IsRequired = true, Order = 1)]
        public DocumentDetail DocumentDetail { get; set; }

        /// <summary>
        /// Gets or sets ECMStatus Flag
        /// </summary>
        [DataMember(Name = "ECMStatusFlag", IsRequired = true, Order = 2)]
        public int ECMStatusFlag { get; set; }

        /// <summary>
        /// Gets or sets Status Code
        /// </summary>
        [DataMember(Name = "StatusCode", IsRequired = true, Order = 3)]
        public int StatusCode { get; set; }

        /// <summary>
        /// Gets or sets Status Message
        /// </summary>
        [DataMember(Name = "StatusMessage", IsRequired = true, Order = 4)]
        public string StatusMessage { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether SpecifiedStatus
        /// </summary>
        [DataMember(Name = "SpecifiedStatus", IsRequired = true, Order = 5)]
        public bool SpecifiedStatus { get; set; }               

        /// <summary>
        /// Gets or sets FileName
        /// </summary>
        [DataMember(Name = "FileName", IsRequired = true, Order = 6)]
        public string FileName 
        {
            get { return this.fileName; } set { this.fileName = value; } 
        }
                
        /// <summary>
        /// Gets or sets ECM FileContent
        /// </summary>
        [DataMember(Name = "FileContent", IsRequired = true, Order = 7)]
        public byte[] FileContent 
        { 
            get { return this.fileContent; } set { this.fileContent = value; } 
        }
       
        /// <summary>
        /// Gets or sets FileType
        /// </summary>
        [DataMember(Name = "FileType", IsRequired = true, Order = 8)]
        public string FileType 
        {
            get { return this.fileType; } set { this.fileType = value; } 
        }

        /// <summary>
        /// Gets or sets CustomMessage
        /// </summary>
        [DataMember(Name = "CustomMessage", IsRequired = true, Order = 9)]
        public string CustomMessage { get; set; }
    }

    /// <summary>
    /// 312267 : To update PDF,ECM and approval status
    /// </summary>
    [DataContract(Name = "VirtualDocumentDetail")]
    public class VirtualDocumentDetail
    {
        /// <summary>
        /// Gets or sets SessionId
        /// </summary>
        [DataMember(Name = "SessionId", Order = 0)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets CandidateId
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 1)]
        public long CandidateId { get; set; }

        /// <summary>
        /// Gets or sets TaskId
        /// </summary>
        [DataMember(Name = "TaskId", Order = 2)]
        public int TaskId { get; set; }

        /// <summary>
        /// Gets or sets ECM Document Name
        /// </summary>
        [DataMember(Name = "ECMDocumentName", Order = 3)]
        public string ECMDocumentName { get; set; }

        /// <summary>
        /// Gets or sets Status Mode
        /// </summary>
        [DataMember(Name = "StatusMode", Order = 3)]
        public int StatusMode { get; set; }

        /// <summary>
        /// Gets or sets Status Flag
        /// </summary>
        [DataMember(Name = "StatusFlag", Order = 4)]
        public int StatusFlag { get; set; }

        /// <summary>
        /// Gets or sets Response Code
        /// </summary>
        [DataMember(Name = "ResponseCode", Order = 5)]
        public int ResponseCode { get; set; }

        /// <summary>
        /// Gets or sets Response Message
        /// </summary>
        [DataMember(Name = "ResponseMessage", Order = 6)]
        public string ResponseMessage { get; set; }

        /// <summary>
        /// Gets or sets ApprovedBy
        /// </summary>
        [DataMember(Name = "ApprovedBy", Order = 7)]
        public int ApprovedBy { get; set; }

        /// <summary>
        /// Gets or sets FileName
        /// </summary>
        [DataMember(Name = "FileName", Order = 8)]
        public string FileName { get; set; }

        /// <summary>
        /// Gets or sets FileType
        /// </summary>
        [DataMember(Name = "FileType", Order = 9)]
        public string FileType { get; set; }
    }
}
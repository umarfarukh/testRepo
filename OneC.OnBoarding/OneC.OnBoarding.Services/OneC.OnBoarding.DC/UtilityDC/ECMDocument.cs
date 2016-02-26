// <copyright file = "ECMDocument.cs" company = "CTS">
// Copyright (c) OnBoarding_ECMDocument. All rights reserved.
// </copyright>

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DC
 * Class Name       : ECMDocument.cs
 * Version          : 1.0
 * Type             : DataContract
 * Purpose          : Data contracts for MailData class without Attachment
 * Created date     : 2013-MAR-22
 * Author           : 298589
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
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Linq;    
    using System.Runtime.Serialization;
    using System.Web;
    #endregion Namespaces

    /// <summary>
    /// Data contract for ECMDocument
    /// </summary>
    [DataContract(Name = "ECMDocument", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/UtilityDC/")]
    [Serializable]
    public class ECMDocument
    {
        /// <summary>
        /// Gets or sets CandidateId
        /// </summary>
        [DataMember(Name = "CandidateId", IsRequired = true, Order = 1)]
        public long CandidateId { get; set; }

        /// <summary>
        /// Gets or sets SessionId
        /// </summary>
        [DataMember(Name = "SessionId", IsRequired = true, Order = 2)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets DocumentId
        /// </summary>
        [DataMember(Name = "DocumentId", IsRequired = true, Order = 3)]
        public int DocumentId { get; set; }

        /// <summary>
        /// Gets or sets ECMDocumentName
        /// </summary>
        [DataMember(Name = "ECMDocumentName", IsRequired = true, Order = 4)]
        public string ECMDocumentName { get; set; }

        /// <summary>
        /// Gets or sets CandidateBGVComponentDetailKey
        /// </summary>
        [DataMember(Name = "CandidateBgvComponentDetailKey", IsRequired = true, Order = 5)]
        public long CandidateBgvComponentDetailKey { get; set; }

        /// <summary>
        /// Gets or sets StatusFlag
        /// </summary>
        [DataMember(Name = "StatusFlag", IsRequired = true, Order = 6)]
        public int StatusFlag { get; set; }

        /// <summary>
        /// Gets or sets ResponseMessage
        /// </summary>
        [DataMember(Name = "ResponseMessage", IsRequired = true, Order = 7)]
        public string ResponseMessage { get; set; }

        /// <summary>
        /// Gets or sets ResponseCode
        /// </summary>
        [DataMember(Name = "ResponseCode", IsRequired = true, Order = 8)]
        public int ResponseCode { get; set; }

        /// <summary>
        /// Gets or sets Filename
        /// </summary>
        [DataMember(Name = "Filename", IsRequired = true, Order = 9)]
        public string Filename { get; set; }

        /// <summary>
        /// Gets or sets FileType
        /// </summary>
        [DataMember(Name = "FileType", IsRequired = true, Order = 10)]
        public string FileType { get; set; }

        /// <summary>
        /// Gets or sets Mode
        /// </summary>
        [DataMember(Name = "Mode", IsRequired = true, Order = 11)]
        public int Mode { get; set; }

        /// <summary>
        /// Gets or sets WebFormMode 
        /// </summary>
        [DataMember(Name = "WebFormMode", IsRequired = true, Order = 12)]
        public int WebFormMode { get; set; }

        /// <summary>
        /// Gets or sets ApprovedBy
        /// </summary>
        [DataMember(Name = "ApprovedBy", Order = 13)]
        public long ApprovedBy { get; set; }

        /// <summary>
        /// Gets or sets SaveMode parameter is added to know whether it is a template or document 
        /// </summary>
        [DataMember(Name = "SaveMode", Order = 14)]
        public int SaveMode { get; set; }

        /// <summary>
        /// Gets or sets PK id to identify the HTransfer related document for which uploaded details has to be updated
        /// </summary>
        ////261671
        [DataMember(Name = "Pk_CandidateDocumentUploadDetail", Order = 15)]
        public long Pk_CandidateDocumentUploadDetail { get; set; }

        /// <summary>
        /// Gets or sets SPMode for calling HTransfer methods
        /// </summary>
        [DataMember(Name = "SpMode", Order = 16)]
        public int SpMode { get; set; }
    }
}
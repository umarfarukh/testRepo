// <copyright file = "MailData.cs" company = "CTS">
// Copyright (c) OnBoarding_MailData. All rights reserved.
// </copyright>

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DC
 * Class Name       : MailData.cs
 * Version          : 1.0
 * Type             : DataContract
 * Purpose          : Data contracts for MailData class without Attachment
 * Created date     : 2012-Feb-01
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
namespace OneC.OnBoarding.DC.UtilityDC
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Linq;    
    using System.Runtime.Serialization;
    using System.Web;
    #endregion Namespaces

    /// <summary>
    /// Data contract for Mailers
    /// </summary>
    [DataContract(Name = "MailData", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/UtilityDC/")]
    [Serializable]
    public sealed class MailData : IDisposable
    {
        /// <summary>
        /// Gets or sets From Id 
        /// </summary>
        [DataMember(Name = "From", IsRequired = true, Order = 0)]
        public string FromId { get; set; }

        /// <summary>
        /// Gets or sets To Id 
        /// </summary>
        [DataMember(Name = "To", IsRequired = true, Order = 0)]
        public string ToId { get; set; }

        /// <summary>
        /// Gets or sets CC address
        /// </summary>
        [DataMember(Name = "Cc", Order = 1)]
        public string CcId { get; set; }

        /// <summary>
        /// Gets or sets BCC address
        /// </summary>
        [DataMember(Name = "Bcc", Order = 2)]
        public string BccId { get; set; }

        /// <summary>
        /// Gets or sets Mail Subject
        /// </summary>
        [DataMember(Name = "Subject", Order = 3)]
        public string Subject { get; set; }

        /// <summary>
        /// Gets or sets Mail Body
        /// </summary>
        [DataMember(Name = "Body", Order = 4)]
        public string Body { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether mail needs to be resent if incases of failure
        /// </summary>
        [DataMember(Name = "ResendOnFail", Order = 5)]
        public bool ResendOnFail { get; set; }

        /// <summary>
        /// Gets or sets Resend mail frequency in minutes for failed mail attempts
        /// </summary>
        [DataMember(Name = "ResendFrequency", Order = 6)]
        public int ResendFrequency { get; set; }

        /// <summary>
        /// Gets or sets Maximum resend mail retry attempts
        /// </summary>
        [DataMember(Name = "ResendMaxLimit", Order = 7)]
        public int ResendMaxLimit { get; set; }

        /// <summary>
        /// Gets or sets Mail scheduled time
        /// </summary>
        [DataMember(Name = "ScheduleMailAt", Order = 8)]
        public DateTime? ScheduleMailAt { get; set; }

        /// <summary>
        /// Gets or sets Days from which mail is active
        /// </summary>
        [DataMember(Name = "RemainderValidFromDays", Order = 9)]
        public int RemainderValidFromDays { get; set; }

        /// <summary>
        /// Gets or sets Days till mail is active
        /// </summary>
        [DataMember(Name = "RemainderValidTillDays", Order = 10)]
        public int RemainderValidTillDays { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether Is Resend Required
        /// </summary>
        [DataMember(Name = "IsReSendRequired", Order = 11)]
        public bool IsReSendRequired { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether Is Remainder Required
        /// </summary>
        [DataMember(Name = "IsRemainderRequired", Order = 12)]
        public bool IsRemainderRequired { get; set; }

        /// <summary>
        /// Gets or sets CandidateId 
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 13)]
        public long CandidateId { get; set; }

        /// <summary>
        /// Gets or sets SessionId 
        /// </summary>
        [DataMember(Name = "SessionId", Order = 14)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets Notification code 
        /// </summary>
        [DataMember(Name = "NotificationEventID", Order = 15, IsRequired = true)]
        public int NotificationEventID { get; set; }

        /// <summary>
        /// Gets or sets Country Id
        /// </summary>
        [DataMember(Name = "CountryId", Order = 16, IsRequired = true)]
        public int CountryId { get; set; }

        /// <summary>
        /// Gets or sets List of mail attachments
        /// </summary>
        [DataMember(Name = "MailAttachmentsDetail", Order = 17)]
        public MailAttachmentsDetail MailAttachmentsDetail { get; set; }

        /// <summary>
        /// Gets or sets Notification Mapping Id
        /// </summary>
        [DataMember(Name = "Notification Mapping Id", Order = 18)]
        public int NotificationMappingId { get; set; }

        /// <summary>
        /// Gets or sets Notification Id
        /// </summary>
        [DataMember(Name = "NotificationId", Order = 19)]
        public int NotificationId { get; set; }

        /// <summary>
        /// Gets or sets SPMode
        /// </summary>
        [DataMember(Name = "SpMode", Order = 20)]
        public int SpMode { get; set; }

        /// <summary>
        /// Gets or sets NotificationMasterId
        /// </summary>
        [DataMember(Name = "NotificationMasterId", Order = 21)]
        public int NotificationMasterId { get; set; }

        /// <summary>
        /// Method for Dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }

    #region Mail attachment contracts

    /// <summary>
    /// Data Contract for Mail Attachment 
    /// </summary>
    /* Attachement Details */
    [DataContract(Name = "MailAttachment", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/UtilityDC/")]
    public class MailAttachment
    {
        /// <summary>
        /// Gets or sets Mail Attachment Content
        /// </summary>
        [DataMember(Name = "AttachmentContent", Order = 1)]
        public byte[] AttachmentContent { get; set; }

        /// <summary>
        /// Gets or sets Mail Attachment Name
        /// </summary> 
        [DataMember(Name = "AttachmentName", Order = 1)]
        public string AttachmentName { get; set; }
    }

    /// <summary>
    /// Data Contract for Mail Attachment Detail
    /// </summary> 
    [DataContract(Name = "MailAttachmentsDetail", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/UtilityDC/")]
    [Serializable]
    public class MailAttachmentsDetail 
    {
        /// <summary>
        /// Gets or sets MailAttachment
        /// </summary> 
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "MailAttachments", Order = 1)]
        public List<MailAttachment> MailAttachments { get; set; }
    }
    #endregion
}
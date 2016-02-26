// <copyright file = "GetMailContent.cs" company = "CTS">
// Copyright (c) OnBoarding_GetMailContent. All rights reserved.
// </copyright>

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DC
 * Class Name       : SendMailDC.cs
 * Version          : 1.0
 * Type             : DataContract
 * Purpose          : Data contract for Mailer content
 * Created date     : 2012-Dec-12
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
    /// Data contract for Mailers
    /// </summary>
    [DataContract(Name = "SendMail", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/UtilityDC/")]
    [Serializable]
    public sealed class GetMailContent : IDisposable
    {
        /// <summary>
        /// Gets or sets CandidateId
        /// </summary>
        [DataMember(Name = "CandidateId", IsRequired = true, Order = 1)]
        public long CandidateId { get; set; }

        ////[DataMember(Name = "NotificationEventId", Order = 2)]
        ////public int NotificationEventId { get; set; }

        /// <summary>
        /// Gets or sets SessionId
        /// </summary>
        [DataMember(Name = "SessionId", IsRequired = true, Order = 3)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets Body Content
        /// </summary>
        [DataMember(Name = "BodyContent",  Order = 4)]
        public string BodyContent { get; set; }

        /// <summary>
        /// Gets or sets FromId
        /// </summary>
        [DataMember(Name = "FromId",  Order = 5)]
        public string FromId { get; set; }

        /// <summary>
        /// Gets or sets Subject
        /// </summary>
        [DataMember(Name = "Subject",  Order = 6)]
        public string Subject { get; set; }

        /// <summary>
        /// Gets or sets ToId
        /// </summary>
        [DataMember(Name = "ToId",  Order = 7)]
        public string ToId { get; set; }

        /// <summary>
        /// Gets or sets CCId
        /// </summary>
        [DataMember(Name = "CcId",  Order = 8)]
        public string CcId { get; set; }

        /// <summary>
        /// Gets or sets BCC Id
        /// </summary>
        [DataMember(Name = "BccId",  Order = 9)]
        public string BccId { get; set; }

        ////[DataMember(Name = "CountryId",Order = 10)]
        ////public int CountryId { get; set; }

        /// <summary>
        /// Gets or sets Header Content
        /// </summary>
        [DataMember(Name = "HeaderContent",  Order = 11)]
        public string HeaderContent { get; set; }

        /// <summary>
        /// Gets or sets FooterContent
        /// </summary>
        [DataMember(Name = "FooterContent", Order = 12)]
        public string FooterContent { get; set; }

        /// <summary>
        /// Gets or sets Notification Mapping Id
        /// </summary>
        [DataMember(Name = "NotificationMappingId", IsRequired = true, Order = 13)]
        public int NotificationMappingId { get; set; }

        /// <summary>
        /// Method for Dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}

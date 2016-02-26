// <copyright file = "SaveRLAFeedbackDC.cs" company = "CTS">
// Copyright (c) OnBoarding_SaveRLAFeedbackDC. All rights reserved.
// </copyright>

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DC         
 * Class Name       : SaveRLAFeedbackDC.cs
 * Version          : 1.0
 * Type             : DataContract
 * Purpose          : Data contracts for Saving Relocation app feedback
 * Created date     : 2014 - 02 - 11
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
    /// Data Contract for saving feedback values
    /// </summary>
    [DataContract(Name = "SaveRLAFeedbackDC", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/CandidateDC/")]
    [Serializable]
    public sealed class SaveRLAFeedbackDC : IDisposable
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
        /// Gets or sets Dashboard Mode
        /// </summary>
        [DataMember(Name = "DashboardMode", Order = 3, IsRequired = true)]
        public int DashboardMode { get; set; }

        /// <summary>
        /// Gets or sets Is Feedback Submitted
        /// </summary>
        [DataMember(Name = "IsFeedbackSubmitted", Order = 4, IsRequired = true)]
        public int IsFeedbackSubmitted { get; set; }

        /// <summary>
        /// Gets or sets Role group to which the current logged in user belongs
        /// </summary>
        [DataMember(Name = "RoleGroupId", Order = 5, IsRequired = true)]
        public int RoleGroupId { get; set; }

        /// <summary>
        /// Gets or sets CountryId
        /// </summary>
        [DataMember(Name = "CountryId", Order = 6)]
        public int CountryId { get; set; }

        /// <summary>
        /// Gets or sets Feedback Value
        /// </summary>
        [DataMember(Name = "FeedbackValue", Order = 7, IsRequired = true)]
        public string FeedbackValue { get; set; }

        /// <summary>
        /// Method for Dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
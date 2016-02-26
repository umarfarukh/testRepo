// <copyright file = "BgvNHDashboardData.cs" company = "CTS">
// Copyright (c) OnBoarding_BgvNHDashboardData. All rights reserved.
// </copyright>

/*About me
*******************************************************
* Namespace        : OneC.OnBoarding.DC.CandidateDC         
* Class Name       : BgvNHDashboardData
* Version          : 1.0
* Type             : DataContract
* Purpose          : Data contracts for Bgv NH Dashboard Data
* Created date     : 2013-Feb-19
* Author           : 260947
* Reviewed by      :
*******************************************************
*/
namespace OneC.OnBoarding.DC.CandidateDC
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Linq;    
    using System.Runtime.Serialization;
    using System.Text;
    #endregion

    /// <summary>
    /// Data Contract for BGV Data
    /// </summary>
    [DataContract(Name = "BgvNHDashboardData", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/DashBoardDC/")]
    [Serializable]
    public class BgvNHDashboardData
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
        /// Gets or sets a value indicating whether Can show BGV tab in NH dashboard
        /// </summary>
        [DataMember(Name = "CanShowBgvTab", Order = 3)]
        public bool CanShowBgvTab { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether Can show Pre joining tab in NH dashboard
        /// </summary>
        [DataMember(Name = "CanShowPreJoiningTab", Order = 4)]
        public bool CanShowPreJoiningTab { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether Can show Post joining tab in NH dashboard
        /// </summary>
        [DataMember(Name = "CanShowPostJoiningTab", Order = 5)]
        public bool CanShowPostJoiningTab { get; set; }

        /// <summary>
        /// Gets or sets Message to be displayed when CIS is in progress by NH
        /// </summary>
        [DataMember(Name = "HtmlForCisInProgress", Order = 6)]
        public string HtmlForCisInProgress { get; set; }

        /// <summary>
        /// Gets or sets CIS Status
        /// </summary>
        [DataMember(Name = "CisStatus", Order = 7)]
        public int CisStatus { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether CanShowPostJoiningTab
        /// </summary>
       [DataMember(Name = "CanShowHTransferTab", Order = 8)]
        public bool CanShowHTransferTab { get; set; }

        /// <summary>
        /// Gets or sets HtmlForHTransferInProgress
        /// </summary>
        [DataMember(Name = "HtmlForHTransferInProgress", Order = 9)]
       public string HtmlForHTransferInProgress { get; set; }

        /// <summary>
        /// Method for Dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
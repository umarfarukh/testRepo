// <copyright file="SurveyDC.cs" company="OnBoarding_CTS">
//     Copyright (c) Survey details. All rights reserved.
// </copyright>

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DC
 * Class Name       : Survey.cs
 * Version          : 1.0
 * Type             : DataContract
 * Purpose          : Data contracts for Survey
 * Created date     : 2012-Aug-07
 * Author           : 249510
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
    /// Data Contract for Survey 
    /// </summary>
    [DataContract(Name = "SurveyDC", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/UtilityDC/")]
    [Serializable]
    public sealed class SurveyDC : IDisposable
    {
        /// <summary>
        /// Gets or sets Survey Data XML
        /// </summary>
        [DataMember(Name = "SurveyDataXml",  Order = 1)]
        public string SurveyDataXml { get; set; }

        /// <summary>
        /// Gets or sets Survey Design XML
        /// </summary>
        [DataMember(Name = "SurveyDesignXml",  Order = 2)]
        public string SurveyDesignXml { get; set; }

        /// <summary>
        /// Gets or sets Candidate Survey Design XML
        /// </summary>
        [DataMember(Name = "CandidateSurveyDetailXml", Order = 3)]
        public string CandidateSurveyDetailXml { get; set; }

        /// <summary>
        /// Gets or sets Survey Type 
        /// </summary>
        [DataMember(Name = "SurveyType", IsRequired = true, Order = 4)]
        public string SurveyType { get; set; }

        /// <summary>
        /// Gets or sets Survey Status
        /// </summary>
        [DataMember(Name = "SurveyStatus", Order = 5)]
        public string SurveyStatus { get; set; }

        /// <summary>
        /// Gets or sets Candidate ID
        /// </summary>
        [DataMember(Name = "CandidateId", IsRequired = true, Order = 6)]
        public long CandidateId { get; set; }

        /// <summary>
        /// Gets or sets ReturnSurveyType
        /// </summary>
        [DataMember(Name = "ReturnSurveyType", Order = 7)]
        public int ReturnSurveyType { get; set; }

        /// <summary>
        /// Gets or sets SPMode
        /// </summary>
        [DataMember(Name = "SpMode", Order = 8)]
        public int SpMode { get; set; }

        /// <summary>
        /// Method for dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
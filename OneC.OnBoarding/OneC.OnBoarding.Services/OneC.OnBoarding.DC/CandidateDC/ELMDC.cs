// <copyright file = "ELMDC.cs" company = "CTS">
// Copyright (c) OnBoarding_ELMDC. All rights reserved.
// </copyright>

/*About me
*******************************************************
* Namespace        : OneC.OnBoarding.DC         
* Class Name       : ELMDC.cs
* Version          : 1.0
* Type             : DataContract
* Purpose          : Data contracts for ELM Status
* Created date     : 2012-Feb-11
* Author           : 195514
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
    #endregion Namespaces
    /// <summary>
    /// Class for ELMDC
    /// </summary>
    [Serializable]
    public class ELMDC
    {
        /// <summary>
        /// Gets or sets SessionId
        /// </summary>
        [DataMember(Name = "SessionId", Order = 65)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets CandidateId
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 1)]
        public long CandidateId { get; set; }

        /// <summary>
        /// Gets or sets ELMStatus
        /// </summary>
        [DataMember(Name = "ELMStatus", Order = 2)]
        public string ELMStatus { get; set; }

        /// <summary>
        /// Gets or sets ELMCourseCode
        /// </summary>
        [DataMember(Name = "ELMCourseCode", Order = 3)]
        public string ELMCourseCode { get; set; }

        /// <summary>
        /// Gets or sets ActivityID
        /// </summary>
        [DataMember(Name = "ActivityID", Order = 4)]
        public string ActivityID { get; set; }

        /// <summary>
        /// Gets or sets CompletedDate
        /// </summary>
        [DataMember(Name = "CompletedDate", Order = 5)]
        public string CompletedDate { get; set; }
    }

    /// <summary>
    /// Class for ELMStatusList
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class ELMStatusList : List<ELMDC>
    { 
    }
}
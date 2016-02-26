// <copyright file = "CampusReportingTimeDC.cs" company = "CTS">
// Copyright (c) OnBoarding_CampusReportingTimeDC. All rights reserved.
// </copyright>

/*About me
*******************************************************
* Namespace        : OneC.OnBoarding.DC         
* Class Name       : CampusReportingTimeDC.cs
* Version          : 1.0
* Type             : DataContract
* Purpose          : Data contracts for campus reporting time
* Created date     : 2012-Aug-08
* Author           : 312511
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
    /// Class for CampusReportingTimeDC
    /// </summary>
    [Serializable]
    public class CampusReportingTimeDC
    {
        /// <summary>
        /// Gets or sets Reporting time Description
        /// </summary>
        [DataMember(Name = "ReportingTimeDesc", Order = 1)]
        public string ReportingTimeDesc { get; set; }

        /// <summary>
        /// Gets or sets Reporting time Code
        /// </summary>
        [DataMember(Name = "ReportingTimeCode", Order = 2)]
        public int ReportingTimeCode { get; set; }
    }

    /// <summary>
    /// Class for CampusReportingTimeList
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class CampusReportingTimeList : List<CampusReportingTimeDC>
    { 
    }
}
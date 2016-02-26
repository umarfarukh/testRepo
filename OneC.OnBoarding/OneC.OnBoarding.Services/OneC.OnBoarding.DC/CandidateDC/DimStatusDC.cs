// <copyright file = "DimStatusDC.cs" company = "CTS">
// Copyright (c) OnBoarding_DimStatusDC. All rights reserved.
// </copyright>

/*About me
*******************************************************
* Namespace        : OneC.OnBoarding.DC         
* Class Name       : DimStatusDC.cs
* Version          : 1.0
* Type             : DataContract
* Purpose          : Data contracts for Dim Status
* Created date     : 2012-Aug-06
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
    /// Class for DimStatusDC
    /// </summary>
    [Serializable]
    public class DimStatusDC
    {
        /// <summary>
        /// Gets or sets Dim Status Description
        /// </summary>
        [DataMember(Name = "DimStatusDesc", Order = 1)]
        public string DimStatusDesc { get; set; }

        /// <summary>
        /// Gets or sets Dim Status Code
        /// </summary>
        [DataMember(Name = "DimStatusCode", Order = 2)]
        public int DimStatusCode { get; set; }
    }

    /// <summary>
    /// Class for DimStatusList
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class DimStatusList : List<DimStatusDC>
    { 
    }
}
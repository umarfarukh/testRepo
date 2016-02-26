// <copyright file = "OfferStatusDC.cs" company = "CTS">
// Copyright (c) OnBoarding_OfferStatusDC. All rights reserved.
// </copyright>

/*About me
*******************************************************
* Namespace        : OneC.OnBoarding.DC         
* Class Name       : OfferStatusDC.cs
* Version          : 1.0
* Type             : DataContract
* Purpose          : Data contracts for Offer Status
* Created date     : 2012-Jan-23
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
    /// Class for OfferStatusDC
    /// </summary>
    [Serializable]
    public class OfferStatusDC
    {
        /// <summary>
        /// Gets or sets Offer Status Description
        /// </summary>
        [DataMember(Name = "OfferStatusDesc", Order = 1)]
        public string OfferStatusDesc { get; set; }

        /// <summary>
        /// Gets or sets Offer Status Code
        /// </summary>
        [DataMember(Name = "OfferStatusCode", Order = 2)]
        public int OfferStatusCode { get; set; }
    }

    /// <summary>
    /// Class for Offer Status List
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class OfferStatusList : List<OfferStatusDC>
    { 
    }
}
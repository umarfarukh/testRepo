// <copyright file = "LocationDC.cs" company = "CTS">
// Copyright (c) OnBoarding_LocationDC. All rights reserved.
// </copyright>

/*About me
*******************************************************
* Namespace        : OneC.OnBoarding.DC         
* Class Name       : LocationDC.cs
* Version          : 1.0
* Type             : DataContract
* Purpose          : Data contracts for Getting Locations
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
    /// Class for LocationDC
    /// </summary>
    [Serializable]
    public class LocationDC
    {
        /// <summary>
        /// Gets or sets Location Description
        /// </summary>
        [DataMember(Name = "LocationDesc", Order = 1)]
        public string LocationDesc { get; set; }

        /// <summary>
        /// Gets or sets Location Code
        /// </summary>
        [DataMember(Name = "LocationCode", Order = 2)]
        public int LocationCode { get; set; }
    }

    /// <summary>
    /// Class for Location Master List
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class LocationMasterList : List<LocationDC>
    { 
    }
}
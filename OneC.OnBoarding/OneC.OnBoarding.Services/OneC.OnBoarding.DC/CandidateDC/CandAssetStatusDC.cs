// <copyright file = "CandAssetStatusDC.cs" company = "CTS">
// Copyright (c) OnBoarding_CandAssetStatusDC. All rights reserved.
// </copyright>

/*About me
*******************************************************
* Namespace        : OneC.OnBoarding.DC         
* Class Name       : AssetStatusDC.cs
* Version          : 1.0
* Type             : DataContract 
* Purpose          : Data contracts for Asset Status
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
    /// Class for CandidateAssetStatusDC
    /// </summary>
    [Serializable]
    public class CandAssetStatusDC
    {
        /// <summary>
        /// Gets or sets Asset Status Description
        /// </summary>
        [DataMember(Name = "AssetStatusDesc", Order = 1)]
        public string AssetStatusDesc { get; set; }

        /// <summary>
        /// Gets or sets Asset Status Code
        /// </summary>
        [DataMember(Name = "AssetStatusCode", Order = 2)]
        public int AssetStatusCode { get; set; }

        /// <summary>
        /// Gets or sets Asset Type
        /// </summary>
        [DataMember(Name = "AssetType", Order = 3)]
        public string AssetType { get; set; }

        /// <summary>
        /// Gets or sets Asset Type
        /// </summary>
        [DataMember(Name = "AssetTrackingID", Order = 4)]
        public int AssetTrackingID { get; set; }

        /// <summary>
        /// Gets or sets Asset Type
        /// </summary>
        [DataMember(Name = "Comments", Order = 5)]
        public string Comments { get; set; }

        /// <summary>
        /// Gets or sets Asset Type
        /// </summary>
        [DataMember(Name = "FedEx", Order = 6)]
        public string FedEx { get; set; }

        /// <summary>
        /// Gets or sets Asset Type
        /// </summary>
        [DataMember(Name = "AssetType", Order = 7)]
        public string DeliveryDate { get; set; }

        /// <summary>
        /// Gets or sets SessionId
        /// </summary>
        [DataMember(Name = "SessionId", Order = 8)]
        public long SessionId { get; set; }
    }

    /// <summary>
    /// Class for CandidateAssetStatusList
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class CandAssetStatusList : List<CandAssetStatusDC>
    { 
    }
}
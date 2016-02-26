// <copyright file = "AssetStatusDC.cs" company = "CTS">
// Copyright (c) OnBoarding_AssetStatusDC. All rights reserved.
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
    /// Class for AssetStatusDC
    /// </summary>
    [Serializable]
    public class AssetStatusDC
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
        /// Gets or sets Comments
        /// </summary>
        [DataMember(Name = "Comments", Order = 4)]
        public string Comments { get; set; }

        /// <summary>
        /// Gets or sets LTCommentsLog
        /// </summary>
        [DataMember(Name = "LTCommentsLog", Order = 5)]
        public string LTCommentsLog { get; set; }

        /// <summary>
        /// Gets or sets BBCommentsLog
        /// </summary>
        [DataMember(Name = "BBCommentsLog", Order = 6)]
        public string BBCommentsLog { get; set; }

        /// <summary>
        /// Gets or sets CPCommentsLog
        /// </summary>
        [DataMember(Name = "CPCommentsLog", Order = 7)]
        public string CPCommentsLog { get; set; }

        /// <summary>
        /// Gets or sets IrelandCommentsFlag
        /// </summary>
        [DataMember(Name = "IrelandCommentsFlag", Order = 8)]
        public int IrelandCommentsFlag { get; set; }
    }

    /// <summary>
    /// Class for AssetStatusList
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class AssetStatusList : List<AssetStatusDC>
    { 
    }
}
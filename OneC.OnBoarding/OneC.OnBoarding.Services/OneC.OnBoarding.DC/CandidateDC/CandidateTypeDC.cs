// <copyright file = "CandidateTypeDC.cs" company = "CTS">
// Copyright (c) OnBoarding_CandidateTypeDC. All rights reserved.
// </copyright>

/*About me
*******************************************************
* Namespace        : OneC.OnBoarding.DC         
* Class Name       : CandidateTypeDC.cs
* Version          : 1.0
* Type             : DataContract
* Purpose          : Data contracts for Candidate Type
* Created date     : 2012-Feb-13
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
    /// Class for CandidateTypeDC
    /// </summary>
    [Serializable]
    public class CandidateTypeDC
    {
        /// <summary>
        /// Gets or sets Candidate Type Description
        /// </summary>
        [DataMember(Name = "CandidateTypeDesc", Order = 1)]
        public string CandidateTypeDesc { get; set; }

        /// <summary>
        /// Gets or sets Candidate Type Code
        /// </summary>
        [DataMember(Name = "CandidateTypeCode", Order = 2)]
        public int CandidateTypeCode { get; set; }

        /// <summary>
        /// Gets or sets ParentID
        /// </summary>
        [DataMember(Name = "ParentId", Order = 3)]
        public int ParentId { get; set; }
    }

    /// <summary>
    /// Class for CandidateTypeList
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class CandidateTypeList : List<CandidateTypeDC>
    { 
    }
}
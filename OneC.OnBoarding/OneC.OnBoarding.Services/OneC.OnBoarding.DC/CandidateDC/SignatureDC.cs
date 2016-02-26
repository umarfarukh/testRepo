// <copyright file = "SignatureDC.cs" company = "CTS">
// Copyright (c) OnBoarding_PageSignature. All rights reserved.
// </copyright>

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DC         
 * Class Name       : .cs
 * Version          : 1.0
 * Type             : DataContract
 * Purpose          : Data contracts for Signing Form
 * Created date     : 2012-Feb-21
 * Author           : 207953
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
    using System.Text;
    #endregion Namespaces

    /// <summary>
    /// Data Contract for PageSignature
    /// </summary>
    [DataContract(Name = "PageSignature", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/CandidateDC/")]
    [Serializable]
    public class PageSignature
    {
        /// <summary>
        ///  Gets or sets for SignaturePageId
        /// </summary>
        public int SignaturePageId { get; set; }

        /// <summary>
        ///  Gets or sets for SignatureStatus
        /// </summary>
        public string SignatureStatus { get; set; }

        /// <summary>
        /// Gets or sets for SignerName
        /// </summary>
        public string SignerName { get; set; }

        /// <summary>
        /// Gets or sets for SignatureTS
        /// </summary>
        public DateTime SignatureTS { get; set; }
    }

    /// <summary>
    /// Class for PageSignatureList
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class PageSignatureList : List<PageSignature>
    { 
    }
    
    /// <summary>
    /// Data Contract for PageSignatureContainer
    /// </summary>
    [DataContract(Name = "PageSignatureContainer", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/CandidateDC/")]
    [Serializable]
    public class PageSignatureContainer
    {
        /// <summary>
        /// Gets or sets for TaskId
        /// </summary>
        [DataMember(Name = "TaskId", Order = 1)]
        public int TaskId { get; set; }

        /// <summary>
        /// Gets or sets for PageSignatureList
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "PageSignatureList", Order = 1)]
        public PageSignatureList SignatureData { get; set; }
    }
}
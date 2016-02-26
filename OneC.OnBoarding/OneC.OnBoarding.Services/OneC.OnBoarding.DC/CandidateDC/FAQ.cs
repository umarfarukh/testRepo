// <copyright file = "Faq.cs" company = "CTS">
// Copyright (c) OnBoarding_Faq. All rights reserved.
// </copyright>

/*About me
*******************************************************
* Namespace        : OneC.OnBoarding.DC         
* Class Name       : FAQ.cs
* Version          : 1.0
* Type             : DataContract
* Purpose          : Data contracts for FAQ
* Created date     : 2012-MAR-27
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
    using System.Diagnostics.CodeAnalysis;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Web;
    #endregion Namespaces

    /// <summary>
    /// Data contract for FAQ
    /// </summary>
    [DataContract(Name = "Faq", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/CandidateDC/")]
    [Serializable]
    public class Faq
    {
        ///// <summary>
        ///// FAQ ID
        ///// </summary>
        ////[DataMember(Name = "FaqId", Order = 1)]
        ////public int FaqId { get; set; }

        /// <summary>
        /// Gets or sets FAQ Question
        /// </summary>
        [DataMember(Name = "FaqQuestion", Order = 2)]
        public string FaqQuestion { get; set; }

        /// <summary>
        /// Gets or sets FAQ Answer
        /// </summary>
        [DataMember(Name = "FaqAnswer", Order = 3)]
        public string FaqAnswer { get; set; }

        ///// <summary>
        ///// FAQ Group Name
        ///// </summary>
        ////[DataMember(Name = "FaqGroup", Order = 4)]
        ////public string FaqGroup { get; set; }
    }

    /// <summary>
    /// Class for Frequently asked questions List
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class FaqList : List<Faq>
    { 
    }

    /// <summary>
    /// Class for Frequently asked questions Data
    /// </summary>
    [Serializable]
    public class FaqData
    {
        /// <summary>
        /// Gets or sets group name
        /// </summary>
        public string FaqGroupName { get; set; }

        /// <summary>
        /// Gets or sets Details
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public FaqList FaqDetails { get; set; }
    }

    /// <summary>
    /// Class for Frequently asked questions DataList
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class FaqDataList : List<FaqData>
    { 
    }

    [SuppressMessage("StyleCop.CSharp.DocumentationRules", "SA1600:ElementsMustBeDocumented", Justification = "Reviewed.")]

    /// <summary>
    /// Class for Frequently asked questions MasterList
    /// </summary>
    [Serializable]
    public class FaqMasterList
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public FaqDataList FaqMasterData { get; set; }
    }

    [SuppressMessage("StyleCop.CSharp.DocumentationRules", "SA1600:ElementsMustBeDocumented", Justification = "Reviewed.")]

    /// <summary>
    /// Class for Frequently asked questions search
    /// </summary>
    public class FaqSearch
    {
        public long CandidateId { get; set; }

        public int CountryId { get; set; }

        public int ProcessId { get; set; }

        public int BuId { get; set; }

        public int TaskId { get; set; }
    }
}   
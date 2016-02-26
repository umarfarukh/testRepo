// <copyright file = "MasterList.cs" company = "CTS">
// Copyright (c) OnBoarding_MasterList. All rights reserved.
// </copyright>

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DC         
 * Class Name       : MasterList.cs
 * Version          : 1.0
 * Type             : DataContract
 * Purpose          : Data contracts for Fetching Master Details
 * Created date     : 2012-Feb-13
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
    /// Data Contract for Master List 
    /// </summary>
    [DataContract(Name = "MasterList", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/CandidateDC/")]
    [Serializable]
    public class MasterList
    {
        /// <summary>
        /// Gets or sets Master Code
        /// </summary>
        [DataMember(Name = "MasterCode", Order = 1)]
        public string MasterCode { get; set; }

        /// <summary>
        /// Gets or sets Master Description
        /// </summary>
        [DataMember(Name = "MasterDescription", Order = 2)]
        public string MasterDescription { get; set; }

        /// <summary>
        /// Gets or sets Master UserValue
        /// </summary>
        [DataMember(Name = "MasterUserValue", Order = 3)]
        public string MasterUserValue { get; set; }

        /// <summary>
        /// Gets or sets ParentId
        /// </summary>
        [DataMember(Name = "ParentId", Order = 4)]
        public int ParentId { get; set; }

        /// <summary>
        /// Gets or sets Mode
        /// </summary>
        [DataMember(Name = "[Mode]", Order = 5)]
        public int Mode { get; set; }

        /// <summary>
        /// Gets or sets Master UserValue2
        /// </summary>
        [DataMember(Name = "MasterUserValue2", Order = 6)]
        public string MasterUserValue2 { get; set; }

        /// <summary>
        /// Gets or sets CandidateId
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 6)]
        public long CandidateId { get; set; }

        /// <summary>
        /// Gets or sets Coverage Amount
        /// </summary>
        [DataMember(Name = "CoveragAmount", Order = 7)]
        public string CoveragAmount { get; set; }

        /// <summary>
        /// Gets or sets Coverage type
        /// </summary>
        [DataMember(Name = "Coveragetype", Order = 7)]
        public int Coveragetype { get; set; }
    }

    /// <summary>
    /// Class for Master List Data
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class MasterListData : List<MasterList>
    { 
    }

    /// <summary>
    /// Data Contract for Master List Source
    /// </summary>
    [DataContract(Name = "MasterListSource", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/CandidateDC/")]
    [Serializable]
    public class MasterListSource
    {
        /// <summary>
        /// Gets or sets MasterData
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "MasterData", Order = 4)]
        public MasterListData MasterData { get; set; }
    }
}
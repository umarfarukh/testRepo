// <copyright file = "EducationMaster.cs" company = "CTS">
// Copyright (c) OnBoarding_EducationMaster. All rights reserved.
// </copyright>

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DC         
 * Class Name       : EducationDetail.cs
 * Version          : 1.0
 * Type             : DataContract
 * Purpose          : Data contracts for Fetching Education Details
 * Created date     : 2012-Jan-06
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
    using System.Text;
    #endregion Namespaces

    /// <summary>
    /// Data Contract for Education Master
    /// </summary>
    [DataContract(Name = "EducationMaster", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/CandidateDC/")]
    [Serializable]
    public class EducationMaster
    {
        /// <summary>
        ///  Gets or sets Code
        /// </summary>
        [DataMember(Name = "Code", Order = 1)]
        public string CollegeCode { get; set; }

        /// <summary>
        /// Gets or sets EDescription
        /// </summary>
        [DataMember(Name = "Description", Order = 2)]
        public string CollegeDescription { get; set; }
    }

    /// <summary>
    /// Class for EducationList
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class EducationList : List<EducationMaster>
    { 
    }

    /// <summary>
    /// Class for EducationMasterList
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class EducationMasterList : List<List<EducationMaster>>
    { 
    }
}
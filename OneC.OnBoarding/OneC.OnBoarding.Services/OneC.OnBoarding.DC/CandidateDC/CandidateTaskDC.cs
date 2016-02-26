// <copyright file = "CandidateTaskDC.cs" company = "CTS">
// Copyright (c) OnBoarding_CandidateTask. All rights reserved.
// </copyright>

/*About me
*******************************************************
* Namespace        : OneC.OnBoarding.DC         
* Class Name       : CandidateDetail.cs
* Version          : 1.0
* Type             : DataContract
* Purpose          : Data contracts for Task Master
* Created date     : 2012-Jan-30
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
    using OneC.OnBoarding.DC.CandidateDC;
    using OneC.OnBoarding.DC.UtilityDC;
    #endregion Namespaces

    /// <summary>
    /// Data contract for CandidateTask
    /// </summary>
    [DataContract(Name = "CandidateTask", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/CandidateDC/")]
    [Serializable]
    public class CandidateTask
    {
        /// <summary>
        /// Gets or sets CandidateDetails
        /// </summary>
        [DataMember(Name = "CandidateDetails", Order = 1)]
        public CandidateDetail CandidateDetails { get; set; }

        /// <summary>
        /// Gets or sets TaskDetails
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "TaskDetails", Order = 2)]
        public List<TaskDetail> TaskDetails { get; set; }

        /// <summary>
        /// Gets or sets OfferStatusMaster
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "OfferStatusMaster", Order = 3)]
        public OfferStatusList OfferStatusMaster { get; set; }

        /// <summary>
        /// Gets or sets JoiningStatusMaster
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "JoiningStatusMaster", Order = 4)]
        public JoiningStatusList JoiningStatusMaster { get; set; }

        /// <summary>
        /// Gets or sets AssetStatusMaster
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "AssetStatusMaster", Order = 5)]
        public AssetStatusList AssetStatusMaster { get; set; }

        /// <summary>
        /// Gets or sets CandidateAssetStatus
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "CandAssetStatus", Order = 6)]
        public CandAssetStatusList CandAssetStatus { get; set; }

        /// <summary>
        /// Gets or sets TrainingList
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "TrainingList", Order = 7)]
        public TrainingList TrainingList { get; set; }

        /// <summary>
        /// Gets or sets DimStatusMaster
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "DimStatusMaster", Order = 8)]
        public DimStatusList DimStatusMaster { get; set; }

        /// <summary>
        /// Gets or sets LocationMaster
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "LocationMaster", Order = 9)]
        public LocationMasterList LocationMaster { get; set; }

        /// <summary>
        /// Gets or sets CampusReportingTimeMaster
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "CampusReportingTimeMaster", Order = 10)]
        public CampusReportingTimeList CampusReportingTimeMaster { get; set; }

        /// <summary>
        /// Gets or sets AssetComments
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "AssetComments", Order = 11)]
        public AssetStatusList AssetComments { get; set; }
    }
}

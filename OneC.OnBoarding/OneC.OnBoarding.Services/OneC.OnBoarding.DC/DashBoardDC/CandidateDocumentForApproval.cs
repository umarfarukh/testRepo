// <copyright file = "CandidateDocumentForApproval.cs" company = "CTS">
// Copyright (c) OnBoarding_CandidateDocumentForApproval. All rights reserved.
// </copyright>

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DC
 * Class Name       : CandidateDocumentForApproval.cs.cs
 * Version          : 1.0
 * Type             : DataContract
 * Purpose          : Get Candidate Document For Approval in HRSS Dashboard
 * Created date     : 2012-Oct-30
 * Author           : 298589
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
namespace OneC.OnBoarding.DC.DashBoardDC
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
    /// Data Contract for getting the List of Candidate's document in HRSS Dashboard
    /// </summary>
    [DataContract(Name = "CandidateDocumentForApproval", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/DashBoardDC/")]
    [Serializable]
    public class CandidateDocumentForApproval
    {
        /// <summary>
        /// Gets or sets CandidateId
        /// </summary>
        [DataMember(Name = "CandidateId", IsRequired = true, Order = 1)]
        public long CandidateId { get; set; }

        /// <summary>
        /// Gets or sets DocumentName
        /// </summary>
        [DataMember(Name = "DocumentName", IsRequired = true, Order = 2)]
        public string DocumentName { get; set; }

        /// <summary>
        /// Gets or sets ECM Document Id
        /// </summary>
        [DataMember(Name = "ECMDocumentId", IsRequired = true, Order = 3)]
        public string ECMDocumentId { get; set; }      
    }
    
    /// <summary>
    /// List for CandidateApproveListData 
    /// </summary>
    [Serializable]
    public class CandidateApproveListData : List<CandidateDocumentForApproval>
    { 
    }

    /// <summary>
    /// Data contract for CandidateApproveListDataSource
    /// </summary>
    [DataContract(Name = "CandidateApproveListDataSource", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/DashBoardDC/")]
    [Serializable]
    public class CandidateApproveListDataSource
    {
        /// <summary>
        /// Gets or sets Approve Data
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "CandidateApproveListData", Order = 4)]
        public CandidateApproveListData ApproveData { get; set; }
    }
}

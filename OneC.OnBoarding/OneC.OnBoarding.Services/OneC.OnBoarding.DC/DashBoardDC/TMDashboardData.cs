// <copyright file ="TMDashboardData.cs" company="OnBoarding_CTS">
// Copyright BGV data. All rights reserved.
// </copyright>

/*About me
*******************************************************
* Namespace        : OneC.OnBoarding.DC.DashBoardDC         
* Class Name       : TMDashboardData
* Version          : 1.0
* Type             : DataContract
* Purpose          : Data contracts for TM DashBoard
* Created date     : 2012-Jun-20
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

namespace OneC.OnBoarding.DC.DashBoardDC
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Linq;    
    using System.Runtime.Serialization;
    using System.Text;
    #endregion

    /// <summary>
    /// Data Contract TM Dashboard Data
    /// </summary>
    [DataContract(Name = "TMDashboardData", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/DashBoardDC/")]
    [Serializable]
    public class TMDashboardData
    {
        /// <summary>
        /// Gets or sets Department Data
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "DepartmentDataList", Order = 1)]
        public DepartmentDataList DepartmentName { get; set; }
    }

    /// <summary>
    /// Data Contract for Department Data
    /// </summary>
    [DataContract(Name = "DepartmentData", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/DashBoardDC/")]
    [Serializable]
    public class DepartmentData
    {
        /// <summary>
        /// Gets or sets Department Name
        /// </summary>
        [DataMember(Name = "DepartmentName", Order = 1)]
        public string DepartmentName { get; set; }

        /// <summary>
        /// Gets or sets Department Code
        /// </summary>
        [DataMember(Name = "DepartmentCode", Order = 2)]
        public string DepartmentCode { get; set; }
    }

    /// <summary>
    /// List for Department Data
    /// </summary>
    public class DepartmentDataList : List<DepartmentData>
    {
    }
}

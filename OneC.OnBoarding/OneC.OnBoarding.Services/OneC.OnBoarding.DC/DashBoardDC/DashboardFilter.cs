// <copyright file = "DashboardFilter.cs" company = "CTS">
// Copyright (c) OnBoarding_DashboardFilter. All rights reserved.
// </copyright>

/*About me
*******************************************************
* Namespace        : OneC.OnBoarding.DC         
* Class Name       : DashboardFilter.cs
* Version          : 1.0
* Type             : DataContract
* Purpose          : Data contract for DashBoard filter
* Created date     : 2013-Jun-22
* Author           : 260947
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
    /// Data Contract for Dashboard Filter
    /// </summary>
    [DataContract(Name = "DashboardFilter", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/DashBoardDC/")]
    [Serializable]
    public sealed class DashboardFilter : IDisposable
    {        
        /// <summary>
        /// Gets or sets Name of the filter criteria
        /// </summary>
        [DataMember(Name = "FilterName", Order = 1, IsRequired = true)]
        public string FilterName { get; set; }

        /// <summary>
        /// Gets or sets Id of the value
        /// </summary>
        [DataMember(Name = "FilterId", Order = 2, IsRequired = true)]
        public string FilterId { get; set; }

        /// <summary>
        /// Gets or sets Description of the value
        /// </summary>
        [DataMember(Name = "FilterDesc", Order = 3, IsRequired = true)]
        public string FilterDesc { get; set; }

        /// <summary>
        /// Gets or sets Order to sort and display
        /// </summary>
        [DataMember(Name = "FilterOrder", Order = 4, IsRequired = true)]
        public int FilterOrder { get; set; }
        
        /// <summary>
        /// Method for Dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }

    /// <summary>
    /// Data Contract for Dashboard filters
    /// </summary>
    [DataContract(Name = "DashboardFilters", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/DashBoardDC/")]
    [Serializable]
    public class DashboardFilters
    {
        /// <summary>
        /// Gets or sets RoleGroupId to which the dashboard filter need to be retrieved
        /// </summary>
        [DataMember(Name = "RoleGroupId", Order = 1, IsRequired = true)]
        public OneC.OnBoarding.DC.UtilityDC.RoleGroup RoleGroupId { get; set; }

        /// <summary>
        /// Gets or sets List of dashboard filters
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "DashboardFilterList", Order = 2, IsRequired = true)]
        public List<DashboardFilter> DashboardFilterList { get; set; }
    }
}

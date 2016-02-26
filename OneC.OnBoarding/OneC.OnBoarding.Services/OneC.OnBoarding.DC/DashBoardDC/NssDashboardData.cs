// <copyright file = "NssDashboardData.cs" company = "CTS">
// Copyright (c) OnBoarding_NssDashboardData. All rights reserved.
// </copyright>

/*About me
*******************************************************
* Namespace        : OneC.OnBoarding.DC.DashBoardDC         
* Class Name       : NssDashboardData
* Version          : 1.0
* Type             : DataContract
* Purpose          : Data contracts for NSS DashBoard
* Created date     : 2012-Jan-16
* Author           : 312539
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
    /// Data Contract for NSS Dashboard Data
    /// </summary>
    [DataContract(Name = "NssDashboardData", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/DashBoardDC/")]
    [Serializable]
    public class NssDashboardData
    {
        /// <summary>
        /// Gets or sets Designation Description
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "DesignationDescList", Order = 1)]
        public DesignationDataList DesignationDesc { get; set; }

        /// <summary>
        /// Gets or sets Location Description list
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "LocationDescList", Order = 2)]
        public DesignationDataList LocationDescList { get; set; }        
    }

    /// <summary>
    /// Data Contract for Designation Data
    /// </summary>
    [DataContract(Name = "DesignationData", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/DashBoardDC/")]
    [Serializable]
    public class DesignationData
    {
        /// <summary>
        /// Gets or sets Designation Description
        /// </summary>
        [DataMember(Name = "DesignationDesc", Order = 1)]
        public string DesigniationDesc { get; set; }

        /// <summary>
        /// Gets or sets Job code
        /// </summary>
        [DataMember(Name = "Jobcode", Order = 2)]
        public string Jobcode { get; set; } 

        /// <summary>
        /// Gets or sets Location Description
        /// </summary>
        [DataMember(Name = "LocationDesc", Order = 4)]
        public string LocationDesc { get; set; }

        /// <summary>
        /// Gets or sets Location Code
        /// </summary>
        [DataMember(Name = "LocationCode", Order = 5)]
        public string LocationCode { get; set; }       
    }     

    /// <summary>
    /// Data Contract for Timeline Filter
    /// </summary>
    //// Added by 195514 for Timline(live,history,pipeline) dropdown
    [DataContract(Name = "TimelineFilter", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/DashBoardDC/")]
    [Serializable]
    public class TimelineFilter
    {
        /// <summary>
        /// Gets or sets TimelineFilterId
        /// </summary>
        [DataMember(Name = "TimelineFilterId", Order = 1)]
        public int TimelineFilterId { get; set; }

        /// <summary>
        /// Gets or sets TimelineDescription
        /// </summary>
        [DataMember(Name = "TimelineDescription", Order = 2)]
        public string TimelineDescription { get; set; }

        /// <summary>
        /// Gets or sets Country Code
        /// </summary>
        [DataMember(Name = "CountryID", Order = 3)]
        public int CountryID { get; set; }

        /// <summary>
        /// Gets or sets SessionId
        /// </summary>
        [DataMember(Name = "SessionId", Order = 4)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets Role
        /// </summary>
        [DataMember(Name = "Role", Order = 5)]
        public string RoleId { get; set; }
    }
    
    /// <summary>
    /// Data Contract for Asset Request Status
    /// </summary>
    //// Added by 195514 for status dropdown
    [DataContract(Name = "AssetRequestStatus", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/DashBoardDC/")]
    [Serializable]
    public class AssetRequestStatus
    {
        /// <summary>
        /// Gets or sets Asset Status Id
        /// </summary>
        [DataMember(Name = "AssetStatusId", Order = 1)]
        public int AssetStatusId { get; set; }

        /// <summary>
        /// Gets or sets Status Description
        /// </summary>
        [DataMember(Name = "StatusDescription", Order = 2)]
        public string StatusDescription { get; set; }      
    }

    /// <summary>
    /// List for Designation Data
    /// </summary>
    public class DesignationDataList : List<DesignationData>
    {
    }     
}
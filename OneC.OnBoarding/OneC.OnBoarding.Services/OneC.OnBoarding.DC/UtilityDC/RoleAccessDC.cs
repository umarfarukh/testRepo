// <copyright file="RoleAccessDC.cs" company="OnBoarding_CTS">
//     Copyright BGV data. All rights reserved.
// </copyright>

namespace OneC.OnBoarding.DC.UtilityDC
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
    /// Data Contract for RoleAccess
    /// </summary>
    [Serializable]
    public class RoleAccessDC
    {
        /// <summary>
        /// Gets or sets SessionId
        /// </summary>
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets RoleGroupId
        /// </summary>
        public string RoleGroupId { get; set; }

        /// <summary>
        /// Gets or sets RoleDetailId
        /// </summary>
        public string RoleDetailId { get; set; }

        /// <summary>
        /// Gets or sets RoleName
        /// </summary>
        public string RoleName { get; set; }

        /// <summary>
        /// Gets or sets CountryId
        /// </summary>
        public int CountryId { get; set; }

        /// <summary>
        /// Gets or sets CountryName
        /// </summary>
        public string CountryName { get; set; }

        /// <summary>
        /// Gets or sets ActiveUserId
        /// </summary>
        ////For Active Users
        public string ActiveUserId { get; set; }

        /// <summary>
        /// Gets or sets ActiveUserName
        /// </summary>
        public string ActiveUserName { get; set; }

        /// <summary>
        /// Gets or sets ActivationDate
        /// </summary>
        public string ActivationDate { get; set; }

        /// <summary>
        /// Gets or sets AssociateName
        /// </summary>
        public string AssociateName { get; set; }

        /// <summary>
        /// Gets or sets AssociateId
        /// </summary>
        public long AssociateId { get; set; }

        /// <summary>
        /// Gets or sets PortFolio
        /// </summary>
        public string PortFolio { get; set; }

        /// <summary>
        /// Gets or sets ActiveStatus
        /// </summary>
        public int ActiveStatus { get; set; }
    }

    /// <summary>
    /// List for User Role Access
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class UserRolesAceesList : List<RoleAccessDC>
    {
    }

    /// <summary>
    /// Data Contract for User Role Access Container
    /// </summary>
    [DataContract(Name = "UserRolesAccessContainer", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/UtilityDC/")]
    [Serializable]
    public class UserRolesAccessContainer
    {
        /// <summary>
        /// Gets or sets User Role list object
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "UserRolesAccess", IsRequired = true, Order = 1)]
        public UserRolesAceesList UserRolesListObj { get; set; }

        /// <summary>
        /// Gets or sets User Role list object1
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "RoleAssociateList", IsRequired = true, Order = 2)]
        public RoleAssociateList UserRolesListObj1 { get; set; }
    }

    /// <summary>
    /// Data Contract for Role Associate
    /// </summary>
    [Serializable]
    public class RoleAssociateDc
    {
        /// <summary>
        /// Gets or sets AssociateName
        /// </summary>
        public string AssociateName { get; set; }

        /// <summary>
        /// Gets or sets AssociateId
        /// </summary>
        public long AssociateId { get; set; }

        /// <summary>
        /// Gets or sets Designation 
        /// </summary>
        public string Designation { get; set; }

        /// <summary>
        /// Gets or sets Location
        /// </summary>
        public string Location { get; set; }
    }

    /// <summary>
    /// List for RoleAssociate
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class RoleAssociateList : List<RoleAssociateDc>
    { 
    }
}
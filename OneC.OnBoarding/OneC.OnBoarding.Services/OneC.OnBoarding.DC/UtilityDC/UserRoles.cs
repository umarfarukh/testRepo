// <copyright file = "UserRoles.cs" company = "CTS">
// Copyright (c) OnBoarding_UserRoles. All rights reserved.
// </copyright>
/*About me
*******************************************************
* Namespace        : OneC.OnBoarding.DC         
* Class Name       : UserRoles.cs
* Version          : 1.0
* Type             : DataContract
* Purpose          : Data contracts for User Roles
* Created date     : 2012-Jan-04
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
    /// 260947: Enumerator for Role group code
    /// </summary>
    public enum RoleGroup
    {
        /// <summary>
        /// Flag for NoRole
        /// </summary>
        NoRole = 0,

        /// <summary>
        /// Flag for RC
        /// </summary>
        RC = 1,

        /// <summary>
        /// Flag for HRSS
        /// </summary>
        HRSS = 2,

        /// <summary>
        /// Flag for TM
        /// </summary>
        TM = 3,

        /// <summary>
        /// Flag for IM
        /// </summary>
        IM = 4,

        /// <summary>
        /// Flag for NSS
        /// </summary>
        NSS = 5,

        /// <summary>
        /// Flag for NH
        /// </summary>
        NH = 6,

        /// <summary>
        /// Flag for Admin
        /// </summary>
        ADMIN = 7,

        /// <summary>
        /// Flag for ASM
        /// </summary>
        ASM = 8,

        /// <summary>
        /// Flag for OEPM
        /// </summary>
        OEPM = 9,

        /// <summary>
        /// Flag for SU
        /// </summary>
        SU = 10,

        /// <summary>
        /// Flag for Vendor
        /// </summary>
        VENDOR = 11
    }

    /// <summary>
    /// Data contract for User Roles
    /// </summary>
    //// [DataContract(Name = "UserRoles", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/UtilityDC/")]
    [Serializable]
    public class UserRoles
    {
        /// <summary>
        /// Gets or sets Role Detail Id
        /// </summary>
        public string RoleDetailId { get; set; }

        /// <summary>
        /// Gets or sets Role Group Id
        /// </summary>
        public RoleGroup RoleGroupId { get; set; }

        /// <summary>
        /// Gets or sets Role Group Code
        /// </summary>
        public string RoleGroupCode { get; set; }

        /// <summary>
        /// Gets or sets Role Description
        /// </summary>
        public string RoleDescription { get; set; }

        /// <summary>
        /// Gets or sets Country mapped for this role
        /// </summary>
        public string RoleCountryId { get; set; }

        /// <summary>
        /// Gets or sets Role URL
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1056:UriPropertiesShouldNotBeStrings", Justification = "Reviewed.")]
        public string RoleURL { get; set; }

        /// <summary>
        /// Gets or sets Role Display Order
        /// </summary>
        public int RoleDisplayOrder { get; set; }
    }

    /// <summary>
    /// List for User roles
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class UserRolesList : List<UserRoles>
    {
    }

    /// <summary>
    /// 260947: Class container to hold UserRolesList 
    /// </summary>
    [DataContract(Name = "UserRolesContainer", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/UtilityDC/")]
    [Serializable]
    public class UserRolesContainer
    {
        /// <summary>
        /// Gets or sets User roles
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "UserRoles", IsRequired = true, Order = 1)]
        public UserRolesList UserRoles { get; set; }
    }
    
    /// <summary>
    /// Data contract for Page accessing
    /// </summary>
    [DataContract(Name = "PageAccess", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/UtilityDC/")]
    [Serializable]
    public class PageAccess
    {
        /// <summary>
        /// Gets or sets Role group id of type RoleGroup
        /// </summary>
        [DataMember(Name = "RoleGroupId", IsRequired = true, Order = 1)]
        public RoleGroup RoleGroupId { get; set; }

        /// <summary>
        /// Gets or sets Unique Page id assigned to that page
        /// </summary>
        [DataMember(Name = "PageId", IsRequired = true, Order = 2)]
        public int PageId { get; set; }

        /// <summary>
        /// Gets or sets Country id assigned by Onboarding
        /// </summary>
        [DataMember(Name = "CountryId", IsRequired = true, Order = 3)]
        public int CountryId { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether this page is allowed for this request
        /// </summary>
        [DataMember(Name = "IsAllowed", IsRequired = false, Order = 4)]
        public bool IsAllowed { get; set; }

        /// <summary>
        /// Gets or sets Redirection url if redirection required
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1056:UriPropertiesShouldNotBeStrings", Justification = "Reviewed."), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "RedirectionUrl", IsRequired = false, Order = 5)]
        public string RedirectUrl { get; set; }

        /// <summary>
        /// Gets or sets Redirection error message id
        /// </summary>
        [DataMember(Name = "MessageId", IsRequired = false, Order = 5)]
        public int MessageId { get; set; }
    }

    ///// <summary>
    ///// Data contract for External user information
    ///// </summary>
    //// [DataContract(Name = "ExternalUser", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/UtilityDC/")]
    //// [Serializable]
    //// public class ExternalUser
    //// {
    ///// <summary>
    ///// Firstname of external user
    ///// </summary>
    ////    [DataMember(Name = "FirstName", IsRequired = true, Order = 1)]
    ////    public string FirstName { get; set; }

    ///// <summary>
    ///// Lastname of external user
    ///// </summary>
    ////    [DataMember(Name = "LastName", IsRequired = true, Order = 2)]
    ////    public string LastName { get; set; }

    ///// <summary>
    ///// EmailId of external user
    ///// </summary>
    ////    [DataMember(Name = "EmailId", IsRequired = true, Order = 3)]
    ////    public string EmailId { get; set; }

    ///// <summary>
    ///// Display Name of external user
    ///// </summary>
    ////    [DataMember(Name = "DisplayName", IsRequired = true, Order = 4)]
    ////    public string DisplayName { get; set; }

    ///// <summary>
    ///// Whether the external user is eligible for InSupport mode
    ///// </summary>
    ////    [DataMember(Name = "InSupportMode", IsRequired = true, Order = 4)]
    ////    public bool InSupportMode { get; set; }

    ///// <summary>
    ///// User type
    ///// </summary>
    ///// <remarks>1->Role based user, 2->Candidate;</remarks>
    ////    [DataMember(Name = "UserType", IsRequired = true, Order = 4)]
    ////    public int UserType { get; set; }
    //// }

    /// <summary>
    /// Data Contract for Page Menu Mapping
    /// </summary>
    [DataContract(Name = "PageMenuMappingContract", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/UtilityDC/")]
    [Serializable]
    public class PageMenuMappingContract 
    {
        /// <summary>
        /// Gets or sets Session ID
        /// </summary>
        [DataMember(Name = "SessionId", IsRequired = true, Order = 1)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets RoleId
        /// </summary>
        [DataMember(Name = "RoleId", IsRequired = true, Order = 2)]
        public int RoleId { get; set; }

        /// <summary>
        /// Gets or sets CountryId
        /// </summary>
        [DataMember(Name = "CountryId", IsRequired = true, Order = 3)]
        public int CountryId { get; set; }

        /// <summary>
        /// Gets or sets Base Page Id
        /// </summary>
        [DataMember(Name = "BasePageId", IsRequired = true, Order = 4)]
        public int BasePageId { get; set; }
    }

    /// <summary>
    /// Type for mapping Page and Menu
    /// </summary>
    [Serializable]
    public sealed class PageMenuMapping : IDisposable
    {
        /// <summary>
        /// Menu Id
        /// </summary>
        private int menuId;

        /// <summary>
        /// Menu Name
        /// </summary>
        private string menuName;

        /// <summary>
        /// Menu Tool tip
        /// </summary>
        private string menuToolTip;

        /// <summary>
        /// Menu Image
        /// </summary>
        private string menuImage;

        /// <summary>
        /// Page URL
        /// </summary>
        private string pageUrl;

        /// <summary>
        /// Event On Click
        /// </summary>
        private string eventOnClick;

        /// <summary>
        /// CSS Class
        /// </summary>
        private string cssClass;

        /// <summary>
        /// Initializes a new instance of the PageMenuMapping class
        /// </summary>
        /// <param name="menuId">Menu Id</param>
        /// <param name="menuName">Menu Name</param>
        /// <param name="menuToolTip">Menu Tool Tip</param>
        /// <param name="menuImage">Menu Image</param>
        /// <param name="pageUrl">Page URL</param>
        /// <param name="eventOnClick">Event On Click</param>
        /// <param name="cssClass">CSS Class</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1054:UriParametersShouldNotBeStrings", MessageId = "4#", Justification = "Reviewed.")]
        public PageMenuMapping(int menuId, string menuName, string menuToolTip, string menuImage, string pageUrl, string eventOnClick, string cssClass)
        {
            this.menuId = menuId;
            this.menuName = menuName;
            this.menuToolTip = menuToolTip;
            this.menuImage = menuImage;
            this.pageUrl = pageUrl;
            this.eventOnClick = eventOnClick;
            this.cssClass = cssClass;
        }

        /// <summary>
        /// Gets Unique menu identifier
        /// </summary>        
        public int MenuId 
        { 
            get { return this.menuId; } 
        }

        /// <summary>
        /// Gets Name of the menu
        /// </summary>        
        public string MenuName 
        {
            get { return this.menuName; } 
        }

        /// <summary>
        /// Gets Tooltip info for menu
        /// </summary>
        public string MenuToolTip 
        {
            get { return this.menuToolTip; } 
        }

        /// <summary>
        /// Gets Image which needs to be displayed for the menu
        /// </summary>
        public string MenuImage 
        {
            get { return this.menuImage; } 
        }

        /// <summary>
        /// Gets Redirection URL for menu
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1056:UriPropertiesShouldNotBeStrings", Justification = "Reviewed.")]
        public string PageUrl 
        {
            get { return this.pageUrl; } 
        }

        /// <summary>
        /// Gets JS Function which needs to be called on mouse click event
        /// </summary>
        public string EventOnClick 
        {
            get { return this.eventOnClick; } 
        }

        /// <summary>
        /// Gets CSS style class which needs to be applied
        /// </summary>
        public string CssClass 
        {
            get { return this.cssClass; } 
        }

        /// <summary>
        /// Method for Dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }

    /// <summary>
    /// List for Page Menu Mapping
    /// </summary>
    [Serializable]
    public class PageMenuMappingList : List<PageMenuMapping> 
    {
    }

    /// <summary>
    /// Container to hold list of Page and Menu mappings of type PageMenuMapping
    /// </summary>
    [DataContract(Name = "PageMenuMappingContainer", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/UtilityDC/")]
    [Serializable]
    public sealed class PageMenuMappingContainer : IDisposable
    {
        /// <summary>
        /// Gets or sets Page Menu Mapping 
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "PageMenuMappings", IsRequired = true, Order = 1)]
        public PageMenuMappingList PageMenuMappings { get; set; }

        /// <summary>
        /// Method for Dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
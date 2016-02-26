// <copyright file = "UserInfoDC.cs" company = "CTS" >
// Copyright (c) OnBoarding_UserInfo. All rights reserved.
// </copyright>

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DC.UtilityDC
 * Class Name       : UserInfo
 * Version          : 1.0
 * Type             : DataContract
 * Purpose          : Datacontract for currently logged in user information 
 * Created date     : 2012-Feb-14
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

namespace OneC.OnBoarding.DC.UtilityDC
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Text;
    #endregion

    /// <summary>
    /// Data contract to store info about current logged in user
    /// </summary>
    [DataContract(Name = "UserInfoDC", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/UtilityDC/")]
    [Serializable]
    public class UserInfoDC
    {
        /// <summary>
        /// Gets or sets Login Id of currently logged in user
        /// </summary>
        [DataMember(Name = "LoginId", IsRequired = true, Order = 1)]
        public string LoginId { get; set; }

        /// <summary>
        /// Gets or sets First name of currently logged in user
        /// </summary>
        [DataMember(Name = "FirstName", IsRequired = true, Order = 2)]
        public string FirstName { get; set; }

        /// <summary>
        /// Gets or sets Last name of currently logged in user
        /// </summary>
        [DataMember(Name = "LastName", IsRequired = true, Order = 3)]
        public string LastName { get; set; }

        /// <summary>
        /// Gets or sets Display name of currently logged in user
        /// </summary>
        [DataMember(Name = "DisplayName", IsRequired = true, Order = 4)]
        public string DisplayName { get; set; }

        /// <summary>
        /// Gets or sets Email id of currently logged in user
        /// </summary>
        [DataMember(Name = "EmailId", IsRequired = true, Order = 5)]
        public string EmailId { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether Is currently logged in user is external user
        /// </summary>
        [DataMember(Name = "IsExternalUser", IsRequired = true, Order = 6)]
        public bool IsExternalUser { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the logged in User is candidate
        /// </summary>
        [DataMember(Name = "IsCandidate", IsRequired = true, Order = 9)]
        public bool IsCandidate { get; set; }

        /// <summary>
        /// Gets or sets logged in User
        /// </summary>
        [DataMember(Name = "LoggedInUser", IsRequired = true, Order = 10)]
        public string LoggedInUser { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether Is Application working in InSupportMode
        /// </summary>
        [DataMember(Name = "IsApplicationInSupportMode", IsRequired = true, Order = 10)]
        public bool IsApplicationInSupportMode { get; set; }
        
        // Added by Chaitanya to implement the IDM Retry mechanisam

        /// <summary>
        /// Gets or sets a value indicating whether Is Application working in InSupportMode
        /// </summary>
        [DataMember(Name = "EnableIdmRetry", IsRequired = true, Order = 11)]
        public bool EnableIdmRetry { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether Is Application working in InSupportMode
        /// </summary>
        [DataMember(Name = "ChkRegistrationStatus", IsRequired = true, Order = 12)]
        public bool ChkRegistrationStatus { get; set; }
    }
}
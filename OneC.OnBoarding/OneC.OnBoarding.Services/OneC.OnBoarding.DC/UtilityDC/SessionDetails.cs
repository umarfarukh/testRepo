// <copyright file="SessionDetails.cs" company="OnBoarding_CTS">
//     Copyright BGV data. All rights reserved.
// </copyright>

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.BAL         
 * Class Name       : SessionDetails.cs
 * Version          : 1.0
 * Type             : DataContract
 * Purpose          : 
 * Created date     : 2011-Dec-06    
 * Author           : 260947
 * Reviewed by      :
 *------------------------------------------------------
 *                  Change history
 *------------------------------------------------------
 * Date             :2012-Jan-05
 * Author           :226708
 * Signature        :
 * Reviewed by      :
 * Change details   :Modified the name of the attributes to be inline with the Database entities
 * -----------------------------------------------------
 *******************************************************
*/

namespace OneC.OnBoarding.DC.UtilityDC
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Linq;    
    using System.Runtime.Serialization;    
    using System.Web;
    #endregion

    /// <summary>
    /// Data contract for session related information
    /// </summary>
    [DataContract(Name = "SessionDetails", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/")]
    [Serializable]
    public class SessionDetails
    {
        /// <summary>
        /// Gets or sets To store the session id of current session
        /// </summary>
        [DataMember(Name = "SessionId", IsRequired = true, Order = 1)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets Stores current login user
        /// </summary>
        [DataMember(Name = "LoginId", IsRequired = true, Order = 2)]
        public string LoginId { get; set; }

        /// <summary>
        /// Gets or sets Start time of current session
        /// </summary>  
        [DataMember(Name = "SessionStartTime", IsRequired = true, Order = 3)]
        public DateTime SessionStartTime { get; set; }

        /// <summary>
        /// Gets or sets Details of client browser
        /// </summary>
        [DataMember(Name = "BrowserDetails", IsRequired = true, Order = 4)]
        public string BrowserDetails { get; set; }

        /// <summary>
        /// Gets or sets Session extension count 
        /// </summary>
        [DataMember(Name = "SessionCount", IsRequired = true, Order = 5)]
        public short SessionCount { get; set; }

        /// <summary>
        /// Gets or sets Session Remarks 
        /// </summary>
        [DataMember(Name = "Remarks", IsRequired = true, Order = 6)]
        public string Remarks { get; set; }

        /// <summary>
        /// Gets or sets Session Flag  0 -> New session, 1 -> Increment
        /// </summary>
        [DataMember(Name = "SessionFlag", IsRequired = true, Order = 7)]
        public short SessionFlag { get; set; }

        /// <summary>
        /// Gets or sets Session Id provided by Session Server
        /// </summary>
        [DataMember(Name = "UniqueSessionId", IsRequired = true, Order = 8)]
        public string UniqueSessionId { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether Is Session Active
        /// </summary>
        [DataMember(Name = "IsSessionActive", IsRequired = true, Order = 9)]
        [DefaultValue(false)]
        public bool IsSessionActive { get; set; }

        /// <summary>
        /// Gets or sets LoggedIn User
        /// </summary>
        [DataMember(Name = "LoggedInUser", IsRequired = true, Order = 10)]
        public string LoggedInUser { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether To enable or disable custom log messages
        /// </summary>
        /// <remarks>0- No log; 1- Log custom message;</remarks>
        [DataMember(Name = "IsCustomMessageLogEnabled", IsRequired = true, Order = 11)]
        [DefaultValue(false)]
        public bool IsCustomMessageLogEnabled { get; set; }

        /// <summary>
        /// Gets or sets IP address
        /// </summary>
        [DataMember(Name = "IpAddress", IsRequired = true, Order = 12)]
        public string IpAddress { get; set; }
    }
}
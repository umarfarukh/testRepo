// <copyright file = "Messages.cs" company = "CTS">
// Copyright (c) Onboarding_Messages. All rights reserved.
// </copyright>

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DC         
 * Class Name       : Messages.cs
 * Version          : 1.0
 * Type             : DataContract
 * Purpose          : Data contracts for Fetching Alert Messages
 * Created date     : 2012-Jan-31
 * Author           : 220930
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
    #endregion Namespaces

    /// <summary>
    /// Enumerator to identify message type
    /// </summary>
    public enum MessageType 
    {
        /// <summary>
        /// for null values
        /// </summary>
        None = 0,

        /// <summary>
        /// To know the message type sent by system
        /// </summary>
        System = 1,

        /// <summary>
        /// To know the message type sent by Application
        /// </summary>
        Application = 2
    }

    /// <summary>
    /// Data contract Country Master
    /// </summary>
    [DataContract(Name = "Messages", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/UtilityDC/")]
    [Serializable]
    public class Messages
    {
        /// <summary>
        /// Gets or sets MethodType
        /// </summary>
        [DataMember(Name = "MethodType", Order = 1, IsRequired = true)]
        public MessageType MethodType { get; set; }

        /// <summary>
        /// Gets or sets Message Id
        /// </summary>
        [DataMember(Name = "MessageId", Order = 2, IsRequired = true)]
        public int MessageId { get; set; }

        /// <summary>
        /// Gets or sets Message
        /// </summary>
        [DataMember(Name = "Message", Order = 3, IsRequired = true)]
        public string Message { get; set; }

        /// <summary>
        /// Gets or sets Display Message
        /// </summary>
        [DataMember(Name = "DisplaMessage", Order = 4, IsRequired = true)]
        public string DisplayMessage { get; set; }

        /// <summary>
        /// Gets or sets Display type
        /// </summary>
        [DataMember(Name = "DisplayType", Order = 4, IsRequired = true)]
        public string DisplayType { get; set; }

        /// <summary>
        /// Gets or sets Message Code
        /// </summary>
        [DataMember(Name = "MessageCode", Order = 5, IsRequired = true)]
        public string MessageCode { get; set; }

        /// <summary>
        /// Gets or sets SessionId
        /// </summary>
        [DataMember(Name = "SessionId", Order = 6, IsRequired = true)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets CountryId
        /// </summary>
        [DataMember(Name = "CountryId", Order = 7, IsRequired = false)]
        public int CountryId { get; set; }
    }
}
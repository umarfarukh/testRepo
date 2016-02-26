// <copyright file = "ErrorDetail.cs" company = "CTS">
// Copyright (c) OnBoarding_ErrorDetail. All rights reserved.
// </copyright>

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DC
 * Class Name       : ErrorDetail.cs
 * Version          : 1.0
 * Type             : DataContract
 * Purpose          : Data contracts for error class
 * Created date     : 2011-Dec-08
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
    using System.Web;
    #endregion

    /// <summary>
    /// Data contract for error information logging
    /// </summary>
    [DataContract(Name = "ErrorDetail", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/UtilityDC/")]
    [Serializable]
    public class ErrorDetails
    {
        /// <summary>
        /// Gets or sets Global session id 
        /// </summary>
        [DataMember(Name = "SessionId", IsRequired = true, Order = 1)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets Error Source
        /// </summary>
        [DataMember(Name = "ErrorSource", IsRequired = true, Order = 2)]
        public string ErrorSource { get; set; }

        /// <summary>
        /// Gets or sets Exception message
        /// </summary>
        [DataMember(Name = "Message", IsRequired = true, Order = 3)]
        public string ErrorMessage { get; set; }

        /// <summary>
        /// Gets or sets Exception stack trace
        /// </summary>
        [DataMember(Name = "StackTrace", Order = 4)]
        public string StackTrace { get; set; }

        /// <summary>
        /// Gets or sets Inner exception message
        /// </summary>
        [DataMember(Name = "InnerException", Order = 5)]
        public string InnerException { get; set; }

        /// <summary>
        /// Gets or sets Exception Timestamp
        /// </summary>
        [DataMember(Name = "ExceptionDateTime", IsRequired = true, Order = 6)]
        public DateTime ExceptionDateTime { get; set; }
    }
}
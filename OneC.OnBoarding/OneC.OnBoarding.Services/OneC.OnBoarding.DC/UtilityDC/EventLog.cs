// <copyright file = "EventLog.cs" company = "CTS">
// Copyright (c) OnBoarding_EventLog. All rights reserved.
// </copyright>

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DC       
 * Class Name       : EventLog.Cs
 * Version          : 1.0
 * Type             : DataContract
 * Purpose          : Data members for event log
 * Created date     : 2012-Jan-06
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
    /// Data contract for event logging
    /// </summary>
    [DataContract(Name = "EventLog", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/UtilityDC/")]
    [Serializable]
    public class EventLog
    {
        /// <summary>
        /// Gets or sets Global session id 
        /// </summary>
        [DataMember(Name = "SessionId", IsRequired = true, Order = 1)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets Long Candidate id for whom the value is changed by this event
        /// </summary>
        [DataMember(Name = "CandidateId", IsRequired = false, Order = 2)]
        public long CandidateId { get; set; }

        /// <summary>
        /// Gets or sets Unique page id
        /// </summary>
        [DataMember(Name = "PageId", IsRequired = true, Order = 3)]
        public int PageId { get; set; }

        /// <summary>
        /// Gets or sets Type of event
        /// </summary>
        [DataMember(Name = "Event", IsRequired = true, Order = 4)]
        public string Event { get; set; }

        /// <summary>
        /// Gets or sets Name of method which cause the event
        /// </summary>
        /// <remarks>Method name is retrieved from Stack Trace</remarks>
        [DataMember(Name = "MethodName", IsRequired = true, Order = 5)]
        public string MethodName { get; set; }

        /// <summary>
        /// Gets or sets New value changed by this event
        /// </summary>
        [DataMember(Name = "Value", IsRequired = true, Order = 6)]
        public string Value { get; set; }

        /// <summary>
        /// Gets or sets Timestamp of event occurred
        /// </summary>
        [DataMember(Name = "EventTS", IsRequired = true, Order = 7)]
        public DateTime EventTS { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether Determines whether the value to be logged is a XML type or string type
        /// </summary>
        /// <remarks>True if xml value, False if string value</remarks>
        [DataMember(Name = "XmlType", IsRequired = true, Order = 8)]
        public bool XmlType { get; set; }

        /// <summary>
        /// Gets or sets User defined comment
        /// </summary>
        [DataMember(Name = "Comment", IsRequired = true, Order = 9)]
        public string Comment { get; set; }
    }
}

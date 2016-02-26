// <copyright file="SystemKey.cs" company="OneBoarding_CTS">
// Copyright (c) System Keys.All rights reserved.
// </copyright>

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DC.UtilityDC
 * Class Name       : SystemKey
 * Version          : 1.0
 * Type             : DataContract
 * Purpose          : Data contract for getting system key
 * Created date     : 2012-Jan-11
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
    /// Data contract for system Key related information
    /// </summary>
    [DataContract(Name = "SystemKey", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/UtilityDC/")]
    [Serializable]
    public class SystemKey
    {
        /// <summary>
        /// Gets or sets System key id
        /// </summary>
        [DataMember(Name = "KeyId", IsRequired = false, Order = 1)]
        public int KeyId { get; set; }

        /// <summary>
        /// Gets or sets System key code
        /// </summary>
        [DataMember(Name = "KeyCode", IsRequired = false, Order = 2)]
        public string KeyCode { get; set; }

        /// <summary>
        /// Gets or sets System key group code
        /// </summary>
        [DataMember(Name = "KeyGroupCode", IsRequired = false, Order = 3)]
        public string KeyGroupCode { get; set; }

        /// <summary>
        /// Gets or sets Country id
        /// </summary>
        [DataMember(Name = "CountryId ", IsRequired = true, Order = 4)]
        public int CountryId { get; set; }
        
        /// <summary>
        /// Gets or sets Output system key value
        /// </summary>
        [DataMember(Name = "KeyValue ", Order = 5)]
        public string KeyValue { get; set; }
    }

    /// <summary>
    /// List object for system key
    /// </summary>
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class SystemKeyList : List<SystemKey>
    {
    }
}

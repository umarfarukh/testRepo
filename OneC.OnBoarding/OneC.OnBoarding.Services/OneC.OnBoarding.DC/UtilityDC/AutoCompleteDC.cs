// <copyright file = "AutoCompleteDC.cs" company = "CTS">
// Copyright (c) OnBoarding_AutoCompleteDC. All rights reserved.
// </copyright>

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DC
 * Class Name       : AutocompleteDC.cs
 * Version          : 1.0
 * Type             : DataContract
 * Purpose          : Data contracts for MailData class without Attachment
 * Created date     : 2013-Feb-05
 * Author           : 298589
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
    #endregion Namespaces

    /// <summary>
    /// Data Contract for autocomplete plugin
    /// </summary>
    public sealed class AutoCompleteDC : IDisposable
    {
        /// <summary>
        /// Gets or sets Id of the selected value from Auto complete control
        /// </summary>
        [DataMember(Name = "ItemId", IsRequired = true, Order = 1)]
        public string ItemId { get; set; }

        /// <summary>
        /// Gets or sets Name which will be displayed in Auto complete control
        /// </summary>
        [DataMember(Name = "ItemName", IsRequired = true, Order = 2)]
        public string ItemName { get; set; }

        /// <summary>
        /// Gets or sets Description which will be displayed if display mode is 2
        /// </summary>
        [DataMember(Name = "ItemDescription", IsRequired = true, Order = 3)]
        public string ItemDescription { get; set; }

        /// <summary>
        /// Method for Dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}

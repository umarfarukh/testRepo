// <copyright file = "MCkinleyDC.cs" company = "CTS">
// Copyright (c) OnBoarding_MCkinleyDC. All rights reserved.
// </copyright>

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DC
 * Class Name       : MailData.cs
 * Version          : 1.0
 * Type             : DataContract
 * Purpose          : Data contracts for MailData class without Attachment
 * Created date     : 2012-Feb-01
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
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Web;
    #endregion Namespaces

    /// <summary>
    /// Data contract for Mailers
    /// </summary>
    [DataContract(Name = "MCkinleyDC", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/UtilityDC/")]
    [Serializable]
    public sealed class MCkinleyDC : IDisposable
    {
        /// <summary>
        /// Gets or sets Content
        /// </summary>
        [DataMember(Name = "Content", IsRequired = true, Order = 1)]
        public string Content { get; set; }
        ///// <summary>
        ///// To address 
        ///// </summary>
        ////[DataMember(Name = "CategoryId", IsRequired = true, Order = 1)]
        ////public string CategoryId { get; set; }

        ///// <summary>
        ///// To address 
        ///// </summary>
        ////[DataMember(Name = "SubCategoryId", IsRequired = true, Order = 2)]
        ////public string SubCategoryId { get; set; }

        ////[DataMember(Name = "CatSubCatId", IsRequired = true, Order = 3)]
        ////public string CatSubCatId { get; set; }

        ///// <summary>
        ///// To address 
        ///// </summary>
        ////[DataMember(Name = "CategoryName", IsRequired = true, Order = 4)]
        ////public string CategoryName { get; set; }

        ////[DataMember(Name = "TypeId", IsRequired = true, Order = 5)]
        ////public string TypeId { get; set; }

        ///// <summary>
        ///// To address 
        ///// </summary>
        ////[DataMember(Name = "RelativeUrl", IsRequired = true, Order = 6)]
        ////public string RelativeUrl { get; set; }

        /// <summary>
        /// Method for Dispose 
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}

// <copyright file="OBFaultContractFC.cs" company="OnBoarding_CTS">
//     Copyright BGV data. All rights reserved.
// </copyright>

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DC.UtilityDC
 * Class Name       : OBFaultContractFC
 * Version          : 1.0
 * Type             : DataContract
 * Purpose          : Datacontract for getting exceptions thrown by methods
 * Created date     : 2012-Feb-16
 * Author           : 
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
    /// Data contract for error information logging
    /// </summary>
    [DataContract(Name = "OBFaultContractFC", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/UtilityDC/")]
    [Serializable]
    public sealed class OBFaultContractFC : IDisposable
    {       
        /// <summary>
        /// Gets or sets Source which raised the exception
        /// </summary>
        [DataMember(Name = "FaultSource", IsRequired = true, Order = 1)]
        public string FaultSource { get; set; }

        /// <summary>
        /// Gets or sets Message of raised exception
        /// </summary>
        [DataMember(Name = "FaultMessage", IsRequired = true, Order = 2)]
        public string FaultMessage { get; set; }

        /// <summary>
        /// Gets or sets Stack trace of raised exception
        /// </summary>
        [DataMember(Name = "FaultStack", IsRequired = true, Order = 3)]
        public string FaultStack { get; set; }

        /// <summary>
        /// Gets or sets Inner exception
        /// </summary>
        [DataMember(Name = "FaultInnerException", IsRequired = true, Order = 4)]
        public string FaultInnerException { get; set; }

        /// <summary>
        /// Method for Dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
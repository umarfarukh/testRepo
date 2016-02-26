// -----------------------------------------------------------------------
// <copyright file="TotalCountDC.cs" company="Cognizant Technology Solutions">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace OneC.OnBoarding.DC.DashBoardDC
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Text;

    /// <summary>
    /// TODO: Update summary.
    /// </summary>
    [DataContract(Name = "TotalCountDC", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/DashBoardDC/")]
    [Serializable]
    public class TotalCountDC
    {
        /// <summary>
        /// Gets or sets total count
        /// </summary>
        public int TotalCount { get; set; }
    }
}

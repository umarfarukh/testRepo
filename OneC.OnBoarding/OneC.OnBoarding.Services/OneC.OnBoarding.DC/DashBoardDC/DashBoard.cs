// <copyright file = "DashBoard.cs" company = "CTS">
// Copyright (c) OnBoarding_DashBoard. All rights reserved.
// </copyright>

/*About me
*******************************************************
* Namespace        : OneC.OnBoarding.DC         
* Class Name       : DashBoard.cs
* Version          : 1.0
* Type             : DataContract
* Purpose          : Data contracts for DashBoard
* Created date     : 2012-Jan-16
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

namespace OneC.OnBoarding.DC.DashBoardDC
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Linq;    
    using System.Runtime.Serialization;
    using System.Text;
    using OneC.OnBoarding.DC.UtilityDC;
    #endregion Namespaces

    /// <summary>
    /// Data contract for User Roles
    /// </summary>
    [DataContract(Name = "DashBoard", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/DashBoardDC/")]
    
    [Serializable]
    public class DashBoard : UserRoles
    {
        /// <summary>
        /// Gets or sets StartDate
        /// </summary>
        [DataMember(Name = "StartDate", Order = 1)]
        public int StartDate { get; set; }

        /// <summary>
        /// Gets or sets EndDate
        /// </summary>
        [DataMember(Name = "EndDate", Order = 2)]
        public int EndDate { get; set; }
    }
}
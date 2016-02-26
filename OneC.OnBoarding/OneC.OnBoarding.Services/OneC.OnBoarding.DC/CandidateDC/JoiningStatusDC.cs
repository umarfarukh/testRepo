// <copyright file = "JoiningStatusDC.cs" company = "CTS">
// Copyright (c) OnBoarding_JoiningStatusDC. All rights reserved.
// </copyright>

/*About me
*******************************************************
* Namespace        : OneC.OnBoarding.DC         
* Class Name       : JoiningStatusDC.cs
* Version          : 1.0
* Type             : DataContract
* Purpose          : Data contracts for Joining Status
* Created date     : 2012-Feb-11
* Author           : 312511
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
namespace OneC.OnBoarding.DC.CandidateDC
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Web;
    #endregion Namespaces

    /// <summary>
    /// Class for JoiningStatusDC
    /// </summary>
    [Serializable]
    public class JoiningStatusDC
    {
        /// <summary>
        /// Gets or sets Joining Status Description
        /// </summary>
        [DataMember(Name = "JoiningStatusDesc", Order = 1)]
        public string JoiningStatusDesc { get; set; }

        /// <summary>
        /// Gets or sets Joining Status Code
        /// </summary>
        [DataMember(Name = "JoiningrStatusCode", Order = 2)]
        public int JoiningStatusCode { get; set; }

        /// <summary>
        /// Gets or sets Joining Status Description for NA
        /// </summary>
        [DataMember(Name = "JoiningStatusDescNA", Order = 3)]
        public string JoiningStatusDescNA { get; set; }

        /// <summary>
        /// Gets or sets Joining Status Code for NA
        /// </summary>
        [DataMember(Name = "JoiningrStatusCodeNA", Order = 4)]
        public int JoiningStatusCodeNA { get; set; }
    }

    /// <summary>
    /// Class for Joining Status List
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class JoiningStatusList : List<JoiningStatusDC>
    { 
    }
}
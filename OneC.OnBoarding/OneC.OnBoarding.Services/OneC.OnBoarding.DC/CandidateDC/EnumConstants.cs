// <copyright file = "EnumConstants.cs" company = "CTS">
// Copyright (c) OnBoarding_EnumConstants. All rights reserved.
// </copyright>

namespace OneC.OnBoarding.DC.CandidateDC
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics.CodeAnalysis;
    using System.Linq;
    using System.Text;

    /// <summary>
    /// Class for Enumerator Constants
    /// </summary>
    public static class EnumConstants
    {
        /// <summary>
        /// Offer Status Enumeration
        /// </summary>
        private enum OfferStatus : int
        {
            /// <summary>
            /// Flag for None
            /// </summary>
            None = 0,

            /// <summary>
            /// FLag for Offer Accepted        
            /// </summary>
            OfferAccepted = 1,

            /// <summary>
            /// Flag for Offer rejected
            /// </summary>
            OfferRejected = 2,            
        }
    }
}

//-----------------------------------------------------------------------
// <copyright file="BulkSearchItem.cs" company="External">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp
 * Class Name       : BulkSearchItem.cs
 * Version          : 1.0
 * Type             : Class
 * Purpose          : Cs page for search bulk data
 * Created date     : 2012-Feb-13
 * Author           : 368982
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

namespace com.qas.proweb
{
    using System;
    using com.qas.proweb.soap;

    /// <summary>
    /// Simple class to encapsulate the search items returned by a bulk verification.
    /// </summary>
    public class BulkSearchItem
    {
        // Private members

        /// <summary>
        /// field for formatted Address 
        /// </summary>
        private FormattedAddress m_Address;

        /// <summary>
        /// field for Verification Levels
        /// </summary>
        private VerificationLevels m_eVerifyLevel;

        /// <summary>
        /// field for Input Address
        /// </summary>
        private string m_sInputAddress;

        /// <summary>
        /// Initializes a new instance of the <see cref="BulkSearchItem"/> class.
        /// </summary>
        /// <param name="t">QA Bulk Search Item Type</param>
        public BulkSearchItem(QABulkSearchItemType t)
        {
            QAAddressType address = t.QAAddress;
            if (address == null)
            {
                this.m_Address = null;
            }
            else
            {
                this.m_Address = new FormattedAddress(address);
            }

            this.m_eVerifyLevel = (VerificationLevels)t.VerifyLevel;
            this.m_sInputAddress = t.InputAddress;
        }

        // -- Public Constants --

        /// <summary>
        /// Enumeration of verification levels
        /// </summary>
        public enum VerificationLevels
        {
            /// <summary>
            /// variable for No verified matches found, or not application
            /// </summary>
            None = VerifyLevelType.None,

            /// <summary>
            /// variable for High confidence match found (address returned)
            /// </summary>
            Verified = VerifyLevelType.Verified,

            /// <summary>
            /// variable for Single match found, but user confirmation is recommended (address returned)
            /// </summary>
            InteractionRequired = VerifyLevelType.InteractionRequired,

            /// <summary>
            /// variable for Address was verified to premises level only (pick list returned)
            /// </summary>
            PremisesPartial = VerifyLevelType.PremisesPartial,

            /// <summary>
            /// variable for Address was verified to street level only (pick list returned)
            /// </summary>
            StreetPartial = VerifyLevelType.StreetPartial,

            /// <summary>
            /// variable for Address was verified to multiple addresses (pick list returned)
            /// </summary>
            Multiple = VerifyLevelType.Multiple,

            /// <summary>
            /// variable for Address was verified to multiple addresses (pick list returned)
            /// </summary>
            VerifiedPlace = VerifyLevelType.VerifiedPlace,

            /// <summary>
            /// variable for Address was verified to multiple addresses (pick list returned)
            /// </summary>
            VerifiedStreet = VerifyLevelType.VerifiedStreet
        }

        // -- Read-only Properties --

        /// <summary>
        /// Gets (Returns) the address (may be null)
        /// </summary>
        public FormattedAddress Address
        {
            get
            {
                return this.m_Address;
            }
        }

        /// <summary>
        /// Gets (Returns) the original search address
        /// </summary>
        /// <returns></returns>
        public string InputAddress
        {
            get
            {
                return this.m_sInputAddress;
            }
        }

        /// <summary>
        /// Gets (Returns) the verification level of the result (only relevant when using the verification engine)
        /// </summary>
        public VerificationLevels VerifyLevel
        {
            get
            {
                return this.m_eVerifyLevel;
            }
        }
    }
}

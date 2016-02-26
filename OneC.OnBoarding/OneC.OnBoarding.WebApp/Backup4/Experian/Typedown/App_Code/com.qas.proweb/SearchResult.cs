//-----------------------------------------------------------------------
// <copyright file="SearchResult.cs" company="External">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp
 * Class Name       : SearchResult.cs
 * Version          : 1.0
 * Type             : Class
 * Purpose          : Cs page for search data 
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

/// QAS Pro Web > (c) QAS Ltd > www.qas.com
/// 
/// Common Classes > SearchResult.cs
/// The results of a search
namespace com.qas.proweb
{
    using System;
    using com.qas.proweb.soap;

    /// <summary>
    /// Class to encapsulate data returned by a search
    /// </summary>
    public class SearchResult
    {
        // -- Private Members --

        /// <summary>
        /// field for Formatted Address
        /// </summary>
        private FormattedAddress m_Address = null;

        /// <summary>
        /// field for Pick list 
        /// </summary>
        private Picklist m_Picklist = null;

        /// <summary>
        /// field for Verify Level
        /// </summary>
        private VerificationLevels m_eVerifyLevel = VerificationLevels.None;

        /// <summary>
        /// field for Firm Name Changed Field
        /// </summary>
        private bool m_bldgFirmNameChangedField;

        /// <summary>
        /// field for primary Number Changed Field
        /// </summary>
        private bool m_primaryNumberChangedField;

        /// <summary>
        /// field for street Corrected Field
        /// </summary>
        private bool m_streetCorrectedField;

        /// <summary>
        /// field for rural Highway Contract Matched Field
        /// </summary>
        private bool m_ruralRteHighwayContractMatchedField;

        /// <summary>
        /// field for city Name Changed Field
        /// </summary>
        private bool m_cityNameChangedField;

        /// <summary>
        /// field for city Alias Matched Field
        /// </summary>
        private bool m_cityAliasMatchedField;

        /// <summary>
        /// field for state Province Changed Field 
        /// </summary>
        private bool m_stateProvinceChangedField;

        /// <summary>
        /// field for post Code Corrected Field
        /// </summary>
        private bool m_postCodeCorrectedField;

        /// <summary>
        /// field for secondary Number Retained Field
        /// </summary>
        private bool m_secondaryNumRetainedField;

        /// <summary>
        /// field for Info Retained Field
        /// </summary>
        private bool m_idenPreStInfoRetainedField;

        /// <summary>
        /// field for Info Retained Field
        /// </summary>
        private bool m_genPreStInfoRetainedField;

        /// <summary>
        /// field for post Info Retained Field
        /// </summary>
        private bool m_postStInfoRetainedField;

        // -- Public Methods --

        /// <summary>
        /// Initializes a new instance of the <see cref="SearchResult"/> class.Construct from a SOAP-layer object 
        /// </summary>
        /// <param name="sr">QA Search Result</param>
        public SearchResult(QASearchResult sr)
        {
            QAAddressType address = sr.QAAddress;
            if (address != null)
            {
                this.m_Address = new FormattedAddress(address);
            }

            QAPicklistType picklist = sr.QAPicklist;
            if (picklist != null)
            {
                this.m_Picklist = new Picklist(picklist);
            }

            this.m_eVerifyLevel = (VerificationLevels)sr.VerifyLevel;

            if (sr.VerificationFlags != null)
            {
                this.m_bldgFirmNameChangedField = sr.VerificationFlags.BldgFirmNameChanged;
                this.m_primaryNumberChangedField = sr.VerificationFlags.PrimaryNumberChanged;
                this.m_streetCorrectedField = sr.VerificationFlags.StreetCorrected;
                this.m_ruralRteHighwayContractMatchedField = sr.VerificationFlags.RuralRteHighwayContractMatched;
                this.m_cityNameChangedField = sr.VerificationFlags.CityNameChanged;
                this.m_cityAliasMatchedField = sr.VerificationFlags.CityAliasMatched;
                this.m_stateProvinceChangedField = sr.VerificationFlags.StateProvinceChanged;
                this.m_postCodeCorrectedField = sr.VerificationFlags.PostCodeCorrected;
                this.m_secondaryNumRetainedField = sr.VerificationFlags.SecondaryNumRetained;
                this.m_idenPreStInfoRetainedField = sr.VerificationFlags.IdenPreStInfoRetained;
                this.m_genPreStInfoRetainedField = sr.VerificationFlags.GenPreStInfoRetained;
                this.m_postStInfoRetainedField = sr.VerificationFlags.PostStInfoRetained;
            }
            else
            {
                this.m_bldgFirmNameChangedField = false;
                this.m_primaryNumberChangedField = false;
                this.m_streetCorrectedField = false;
                this.m_ruralRteHighwayContractMatchedField = false;
                this.m_cityNameChangedField = false;
                this.m_cityAliasMatchedField = false;
                this.m_stateProvinceChangedField = false;
                this.m_postCodeCorrectedField = false;
                this.m_secondaryNumRetainedField = false;
                this.m_idenPreStInfoRetainedField = false;
                this.m_genPreStInfoRetainedField = false;
                this.m_postStInfoRetainedField = false;
            }
        }

        // -- Public Constants --

        /// <summary>
        /// Enumeration of verification levels
        /// </summary>
        public enum VerificationLevels
        {
            /// <summary>
            /// No verified matches found, or not application
            /// </summary>
            None = VerifyLevelType.None,

            /// <summary>
            /// High confidence match found (address returned)
            /// </summary>
            Verified = VerifyLevelType.Verified,

            /// <summary>
            ///  Single match found, but user confirmation is recommended (address returned)
            /// </summary>
            InteractionRequired = VerifyLevelType.InteractionRequired,

            /// <summary>
            ///  Address was verified to premises level only (pick list returned)
            /// </summary>
            PremisesPartial = VerifyLevelType.PremisesPartial,

            /// <summary>
            ///  Address was verified to street level only (pick list returned)
            /// </summary>
            StreetPartial = VerifyLevelType.StreetPartial,

            /// <summary>
            ///  Address was verified to multiple addresses (pick list returned)
            /// </summary>
            Multiple = VerifyLevelType.Multiple,

            /// <summary>
            ///  Address was verified to multiple addresses (pick list returned)
            /// </summary>
            VerifiedPlace = VerifyLevelType.VerifiedPlace,

            /// <summary>
            ///  Address was verified to multiple addresses (pick list returned)
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
        /// Gets (Returns) the pick list (may be null)
        /// </summary>
        /// <returns></returns>
        public Picklist Picklist
        {
            get
            {
                return this.m_Picklist;
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

        /// <summary>
        /// Gets a value indicating whether the building or firm name has been changed
        /// </summary>
        public bool BldgFirmNameChanged
        {
            get
            {
                return this.m_bldgFirmNameChangedField;
            }
        }

        /// <summary>
        /// Gets a value indicating whether the primary number has been changed
        /// </summary>
        public bool PrimaryNumberChanged
        {
            get
            {
                return this.m_primaryNumberChangedField;
            }
        }

        /// <summary>
        /// Gets a value indicating whether the street has been corrected
        /// </summary>
        public bool StreetCorrected
        {
            get
            {
                return this.m_streetCorrectedField;
            }
        }

        /// <summary>
        /// Gets a value indicating whether a rural route or highway contract has been matched
        /// </summary>
        public bool RuralRteHighwayContractMatched
        {
            get
            {
                return this.m_ruralRteHighwayContractMatchedField;
            }
        }

        /// <summary>
        /// Gets a value indicating whether the city name has been changed
        /// </summary>
        public bool CityNameChanged
        {
            get
            {
                return this.m_cityNameChangedField;
            }
        }

        /// <summary>
        /// Gets a value indicating whether the city alias has been matched
        /// </summary>
        public bool CityAliasMatched
        {
            get
            {
                return this.m_cityAliasMatchedField;
            }
        }

        /// <summary>
        /// Gets a value indicating whether the state or province has been changed
        /// </summary>
        public bool StateProvinceChanged
        {
            get
            {
                return this.m_stateProvinceChangedField;
            }
        }

        /// <summary>
        /// Gets a value indicating whether the postcode has been corrected
        /// </summary>
        public bool PostCodeCorrected
        {
            get
            {
                return this.m_postCodeCorrectedField;
            }
        }

        /// <summary>
        /// Gets a value indicating whether the secondary number has been retained
        /// </summary>
        public bool SecondaryNumRetained
        {
            get
            {
                return this.m_secondaryNumRetainedField;
            }
        }

        /// <summary>
        /// Gets a value indicating whether identifiable pre-street info has been retained
        /// </summary>
        public bool IdenPreStInfoRetained
        {
            get
            {
                return this.m_idenPreStInfoRetainedField;
            }
        }

        /// <summary>
        /// Gets a value indicating whether general pre-street info has been retained
        /// </summary>
        public bool GenPreStInfoRetained
        {
            get
            {
                return this.m_genPreStInfoRetainedField;
            }
        }

        /// <summary>
        /// Gets a value indicating whether post street info has been retained
        /// </summary>
        public bool PostStInfoRetained
        {
            get
            {
                return this.m_postStInfoRetainedField;
            }
        }
    }
}

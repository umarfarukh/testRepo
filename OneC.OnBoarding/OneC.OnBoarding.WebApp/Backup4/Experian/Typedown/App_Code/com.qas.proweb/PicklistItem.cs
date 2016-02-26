//-----------------------------------------------------------------------
// <copyright file="PicklistItem.cs" company="External">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp
 * Class Name       : PicklistItem.cs
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

/// QuickAddress Pro Web > (c) QAS Ltd > www.qas.com
/// 
/// Common Classes > Pick list Item.cs
/// Pick list item details
namespace com.qas.proweb
{
    using System;
    using com.qas.proweb.soap;

    /// <summary>
    /// Simple class to encapsulate the data associated with one line of a pick list
    /// </summary>
    public class PicklistItem
    {
        // -- Private Members --

        /// <summary>
        /// field for Moniker
        /// </summary>
        private string m_sMoniker;

        /// <summary>
        /// field for Text
        /// </summary>
        private string m_sText;

        /// <summary>
        /// field for Postcode
        /// </summary>
        private string m_sPostcode;

        /// <summary>
        /// field for Score
        /// </summary>
        private int m_iScore;

        /// <summary>
        /// field for Partial Address
        /// </summary>
        private string m_sPartialAddress;

        /// <summary>
        /// field for Full Address
        /// </summary>
        private bool m_bFullAddress;

        /// <summary>
        /// field for Multiples
        /// </summary>
        private bool m_bMultiples;

        /// <summary>
        /// field for Can Step
        /// </summary>
        private bool m_bCanStep;

        /// <summary>
        /// field for Match
        /// </summary>
        private bool m_bAliasMatch;

        /// <summary>
        /// field for Post code Record
        /// </summary>
        private bool m_bPostcodeRecode;

        /// <summary>
        /// field for Cross Border Match
        /// </summary>
        private bool m_bCrossBorderMatch;

        /// <summary>
        /// field for Dummy PO Box
        /// </summary>
        private bool m_bDummyPOBox;

        /// <summary>
        /// field for Name
        /// </summary>
        private bool m_bName;

        /// <summary>
        /// field for Information
        /// </summary>
        private bool m_bInformation;

        /// <summary>
        /// field for Warn Information
        /// </summary>
        private bool m_bWarnInformation;

        /// <summary>
        /// field for Incomplete Address
        /// </summary>
        private bool m_bIncompleteAddress;

        /// <summary>
        /// field for Unresolvable Range
        /// </summary>
        private bool m_bUnresolvableRange;

        /// <summary>
        /// field for Phantom Primary Point
        /// </summary>
        private bool m_bPhantomPrimaryPoint;

        /// <summary>
        /// field for Formatted Address
        /// </summary>
        private QAAddressType m_FormattedAddress;

        // -- Public Methods --

        /// <summary>
        /// Initializes a new instance of the <see cref="PicklistItem"/> class.Construct from SOAP-layer object
        /// </summary>
        /// <param name="tItem">Pick list Entry Type</param>
        public PicklistItem(PicklistEntryType tItem)
        {
            this.m_sText = tItem.Picklist;
            this.m_sPostcode = tItem.Postcode;
            this.m_iScore = System.Convert.ToInt32(tItem.Score);
            this.m_sMoniker = tItem.Moniker;
            this.m_sPartialAddress = tItem.PartialAddress;
            this.m_FormattedAddress = tItem.QAAddress;

            // Flags
            this.m_bFullAddress = tItem.FullAddress;
            this.m_bMultiples = tItem.Multiples;
            this.m_bCanStep = tItem.CanStep;
            this.m_bAliasMatch = tItem.AliasMatch;
            this.m_bPostcodeRecode = tItem.PostcodeRecoded;
            this.m_bCrossBorderMatch = tItem.CrossBorderMatch;
            this.m_bDummyPOBox = tItem.DummyPOBox;
            this.m_bName = tItem.Name;
            this.m_bInformation = tItem.Information;
            this.m_bWarnInformation = tItem.WarnInformation;
            this.m_bIncompleteAddress = tItem.IncompleteAddr;
            this.m_bUnresolvableRange = tItem.UnresolvableRange;
            this.m_bPhantomPrimaryPoint = tItem.PhantomPrimaryPoint;
        }

        // -- Read-only Properties --

        /// <summary>
        /// Gets (Returns) the moniker representing this item 
        /// </summary>
        public string Moniker
        {
            get
            {
                return this.m_sMoniker;
            }
        }

        /// <summary>
        /// Gets (Returns) the pick list text for display
        /// </summary>
        public string Text
        {
            get
            {
                return this.m_sText;
            }
        }

        /// <summary>
        /// Gets (Returns) the postcode for display; may be empty
        /// </summary>
        public string Postcode
        {
            get
            {
                return this.m_sPostcode;
            }
        }

        /// <summary>
        /// Gets (Returns) the percentage score of this item; 0 if not applicable
        /// </summary>
        public int Score
        {
            get
            {
                return this.m_iScore;
            }
        }

        /// <summary>
        /// Gets (Returns) the formatted address for this item
        /// </summary>
        public FormattedAddress FinalAddress
        {
            get
            {
                return new FormattedAddress(this.m_FormattedAddress);
            }
        }

        /// <summary>
        /// Gets (Returns) the score of this item for display, as "100%", or "" if score not applicable
        /// </summary>
        public string ScoreAsString
        {
            get
            {
                if (this.Score > 0)
                {
                    return this.Score.ToString() + "%";
                }
                else
                {
                    return string.Empty;
                }
            }
        }

        /// <summary>
        /// Gets (Returns) the full address details captured thus far 
        /// </summary>
        public string PartialAddress
        {
            get
            {
                return this.m_sPartialAddress;
            }
        }

        // -- Read-only Property Flags --

        /// <summary>
        /// Gets a value indicating whether this item represents a full deliverable address, so can be formatted
        /// </summary>
        public bool IsFullAddress
        {
            get
            {
                return this.m_bFullAddress;
            }
        }

        /// <summary>
        /// Gets a value indicating whether this item represents multiple addresses (for display purposes)
        /// </summary>
        public bool IsMultipleAddresses
        {
            get
            {
                return this.m_bMultiples;
            }
        }

        /// <summary>
        /// Gets a value indicating whether the item can be stepped into
        /// </summary>
        public bool CanStep
        {
            get
            {
                return this.m_bCanStep;
            }
        }

        /// <summary>
        /// Gets a value indicating whether this entry is an alias match, which you may wish to highlight to the user
        /// </summary>
        public bool IsAliasMatch
        {
            get
            {
                return this.m_bAliasMatch;
            }
        }

        /// <summary>
        /// Gets a value indicating whether this entry has a recoded postcode, which you may wish to highlight to the user
        /// </summary>
        public bool IsPostcodeRecoded
        {
            get
            {
                return this.m_bPostcodeRecode;
            }
        }

        /// <summary>
        /// Gets a value indicating whether this entry is a dummy (for DataSets without premise information)
        /// It can neither be stepped into nor formatted, but must be refined against with premise details
        /// </summary>
        public bool IsIncompleteAddress
        {
            get
            {
                return this.m_bIncompleteAddress;
            }
        }

        /// <summary>
        /// Gets a value indicating whether this entry is a range dummy (for DataSets with only ranges of premise information)
        /// It can neither be stepped into nor formatted, but must be refined against with premise details
        /// </summary>
        public bool IsUnresolvableRange
        {
            get
            {
                return this.m_bUnresolvableRange;
            }
        }

        /// <summary>
        /// Gets a value indicating whether this entry is a premise
        /// </summary>
        public bool IsPhantomPrimaryPoint
        {
            get
            {
                return this.m_bPhantomPrimaryPoint;
            }
        }

        /// <summary>
        /// Gets a value indicating whether this entry represents a nearby area, outside the strict initial
        /// boundaries of the search, which you may wish to highlight to the user
        /// </summary>
        public bool IsCrossBorderMatch
        {
            get
            {
                return this.m_bCrossBorderMatch;
            }
        }

        /// <summary>
        /// Gets a value indicating whether this entry is a dummy PO Box (which you may wish to display differently)
        /// </summary>
        public bool IsDummyPOBox
        {
            get
            {
                return this.m_bDummyPOBox;
            }
        }

        /// <summary>
        /// Gets a value indicating whether this entry is a Names item (which you may wish to display differently)
        /// </summary>
        public bool IsName
        {
            get
            {
                return this.m_bName;
            }
        }

        /// <summary>
        /// Gets a value indicating whether this entry is an informational prompt, rather than an address
        /// </summary>
        public bool IsInformation
        {
            get
            {
                return this.m_bInformation;
            }
        }

        /// <summary>
        /// Gets a value indicating whether this entry is a warning prompt, indicating that it is not possible to
        /// proceed any further (due to no matches, too many matches, etc.)
        /// </summary>
        public bool IsWarnInformation
        {
            get
            {
                return this.m_bWarnInformation;
            }
        }
    }
}

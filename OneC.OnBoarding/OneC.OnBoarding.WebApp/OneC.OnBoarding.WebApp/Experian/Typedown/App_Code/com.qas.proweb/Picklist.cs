//-----------------------------------------------------------------------
// <copyright file="Picklist.cs" company="External">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp
 * Class Name       : Picklist.cs
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
/// Common Classes > Pick list.cs
/// Pick list details
namespace com.qas.proweb
{
    using System;
    using com.qas.proweb.soap;

    /// <summary>
    /// Simple class to encapsulate Pick list data
    /// </summary>
    public class Picklist
    {
        //// -- Private Members --

        /// <summary>
        /// field for Moniker
        /// </summary>
        private string m_sMoniker;

        /// <summary>
        /// field for Items
        /// </summary>
        private PicklistItem[] m_aItems;

        /// <summary>
        /// field for Prompt
        /// </summary>
        private string m_sPrompt;

        /// <summary>
        /// field for Total
        /// </summary>
        private int m_iTotal;

        /// <summary>
        /// field for Auto Step in Safe
        /// </summary>
        private bool m_bAutoStepinSafe;

        /// <summary>
        /// field for Auto Step in Past Close
        /// </summary>
        private bool m_bAutoStepinPastClose;

        /// <summary>
        /// field for Auto Format Safe
        /// </summary>
        private bool m_bAutoFormatSafe;

        /// <summary>
        /// field for Auto Format Past Close
        /// </summary>
        private bool m_bAutoFormatPastClose;

        /// <summary>
        /// field for Large Potential
        /// </summary>
        private bool m_bLargePotential;

        /// <summary>
        /// field for Max Matches
        /// </summary>
        private bool m_bMaxMatches;

        /// <summary>
        /// field for More Other Matches
        /// </summary>
        private bool m_bMoreOtherMatches;

        /// <summary>
        /// field for Threshold
        /// </summary>
        private bool m_bOverThreshold;

        /// <summary>
        /// field for Timeout
        /// </summary>
        private bool m_bTimeout;

        // -- Public Methods --

        /// <summary>
        /// Initializes a new instance of the <see cref="Picklist"/> class.Construct from SOAP-layer object
        /// </summary>
        /// <param name="p">QA Pick list Type</param>
        public Picklist(QAPicklistType p)
        {
            this.m_iTotal = System.Convert.ToInt32(p.Total);
            this.m_sMoniker = p.FullPicklistMoniker;
            this.m_sPrompt = p.Prompt;
            this.m_bAutoStepinSafe = p.AutoStepinSafe;
            this.m_bAutoStepinPastClose = p.AutoStepinPastClose;
            this.m_bAutoFormatSafe = p.AutoFormatSafe;
            this.m_bAutoFormatPastClose = p.AutoFormatPastClose;
            this.m_bLargePotential = p.LargePotential;
            this.m_bMaxMatches = p.MaxMatches;
            this.m_bMoreOtherMatches = p.MoreOtherMatches;
            this.m_bOverThreshold = p.OverThreshold;
            this.m_bTimeout = p.Timeout;

            //// Convert the lines in the picklist
            this.m_aItems = null;
            PicklistEntryType[] aItems = p.PicklistEntry;
            //// Check for null as we can have an empty picklist
            if (aItems != null)
            {
                int iSize = aItems.GetLength(0);
                if (iSize > 0)
                {
                    this.m_aItems = new PicklistItem[iSize];
                    for (int i = 0; i < iSize; i++)
                    {
                        this.m_aItems[i] = new PicklistItem(aItems[i]);
                    }
                }
            }
        }

        // -- Read-only Properties --

        /// <summary>
        /// Gets (Returns) the full pick list moniker; that is, the moniker that describes this entire pick list
        /// </summary>
        public string Moniker
        {
            get
            {
                return this.m_sMoniker;
            }
        }

        /// <summary>
        /// Gets (Returns) the array of Pick list Item objects
        /// </summary>
        public PicklistItem[] Items
        {
            get
            {
                return this.m_aItems;
            }
        }

        /// <summary>
        /// Gets (Returns) the number of items in the pick list
        /// </summary>
        public int Length
        {
            get
            {
                return this.m_aItems != null ? this.m_aItems.Length : 0;
            }
        }

        /// <summary>
        /// Gets (Returns) the prompt indicating what should be entered next by the user
        /// </summary>
        public string Prompt
        {
            get
            {
                return this.m_sPrompt;
            }
        }

        /// <summary>
        /// Gets (Returns) the total number of addresses (excluding information) within this address location (approximately)
        /// </summary>
        public int Total
        {
            get
            {
                return this.m_iTotal;
            }
        }

        // -- Read-only Property Flags --

        /// <summary>
        /// Gets a value indicating whether that it is safe to automatically step-in to the first (and only) pick list item
        /// </summary>
        public bool IsAutoStepinSafe
        {
            get
            {
                return this.m_bAutoStepinSafe;
            }
        }

        /// <summary>
        /// Gets a value indicating whether that you may wish to automatically step-in to the first item, as 
        /// there was only one exact match, and other close matches
        /// </summary>
        public bool IsAutoStepinPastClose
        {
            get
            {
                return this.m_bAutoStepinPastClose;
            }
        }

        /// <summary>
        /// Gets a value indicating whether the pick list contains a single non-informational step-in item
        /// which you may wish to automatically step into after a refinement
        /// </summary>
        public bool IsAutoStepinSingle
        {
            get
            {
                return this.Length == 1
                    && this.Items[0].CanStep
                    && !this.Items[0].IsInformation;
            }
        }

        /// <summary>
        /// Gets a value indicating whether that it is safe to automatically format the first (and only) pick list item
        /// </summary>
        public bool IsAutoFormatSafe
        {
            get
            {
                return this.m_bAutoFormatSafe;
            }
        }

        /// <summary>
        /// Gets a value indicating whether that you may wish to automatically format the first item, as
        /// there was only one exact match, and other close matches
        /// </summary>
        public bool IsAutoFormatPastClose
        {
            get
            {
                return this.m_bAutoFormatPastClose;
            }
        }

        /// <summary>
        /// Gets a value indicating whether that the pick list contains a single non-informational final-address item
        /// which you may wish to automatically format after a refinement
        /// </summary>
        public bool IsAutoFormatSingle
        {
            get
            {
                return this.Length == 1
                    && this.Items[0].IsFullAddress
                    && !this.Items[0].IsInformation;
            }
        }

        /// <summary>
        /// Gets a value indicating whether that the pick list potentially contains too many items to display
        /// </summary>
        public bool IsLargePotential
        {
            get
            {
                return this.m_bLargePotential;
            }
        }

        /// <summary>
        /// Gets a value indicating whether that the number of matches exceeded the maximum allowed
        /// </summary>
        public bool IsMaxMatches
        {
            get
            {
                return this.m_bMaxMatches;
            }
        }

        /// <summary>
        /// Gets a value indicating whether that there are additional matches that can be displayed
        /// Only exact matches to the refinement text have been shown, as including all matches would be over threshold
        /// They can be shown by stepping into the informational at the bottom of the pick list
        /// </summary>
        public bool AreMoreMatches
        {
            get
            {
                return this.m_bMoreOtherMatches;
            }
        }

        /// <summary>
        /// Gets a value indicating whether that the number of matches exceeded the threshold
        /// </summary>
        public bool IsOverThreshold
        {
            get
            {
                return this.m_bOverThreshold;
            }
        }

        /// <summary>
        /// Gets a value indicating whether that the search timed out
        /// </summary>
        public bool IsTimeout
        {
            get
            {
                return this.m_bTimeout;
            }
        }
    }
}

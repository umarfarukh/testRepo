//-----------------------------------------------------------------------
// <copyright file="FormattedAddress.cs" company="External">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp
 * Class Name       : FormattedAddress.cs
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

//// QuickAddress Pro Web > (c) QAS Ltd > www.qas.com
//// Common Classes > FormattedAddress.cs
//// Formatted address details

namespace com.qas.proweb
{
    using System;
    using com.qas.proweb.soap;

    /// <summary>
    /// Simple class to encapsulate data associated with a formatted address
    /// </summary>
    public class FormattedAddress
    {
        //// -- Private Members --

        /// <summary>
        /// field for address line
        /// </summary>
        private AddressLine[] m_aAddressLines;

        /// <summary>
        /// field for bulk data is overflow
        /// </summary>
        private bool m_bIsOverflow;

        /// <summary>
        /// field for bulk data is truncated
        /// </summary>
        private bool m_bIsTruncated;

        /// <summary>
        /// field for status 
        /// </summary>
        private DPVStatusType m_dPVStatusField;

        /// <summary>
        /// field for missing data flag
        /// </summary>
        private bool m_bIsMissingSubPrem;

        // -- Public Methods --

        /// <summary>
        /// Initializes a new instance of the <see cref="FormattedAddress"/> class. Construct from SOAP-layer object
        /// </summary>
        /// <param name="t">QA Address Type</param>
        public FormattedAddress(QAAddressType t)
        {
            this.m_bIsOverflow = t.Overflow;
            this.m_bIsTruncated = t.Truncated;
            this.m_dPVStatusField = t.DPVStatus;
            this.m_bIsMissingSubPrem = t.MissingSubPremise;

            AddressLineType[] aLines = t.AddressLine;
            //// We must have lines in an address so aLines should never be null
            int iSize = aLines.GetLength(0);
            if (iSize > 0)
            {
                this.m_aAddressLines = new AddressLine[iSize];
                for (int i = 0; i < iSize; i++)
                {
                    this.m_aAddressLines[i] = new AddressLine(aLines[i]);
                }
            }
        }

        // -- Read-only Properties --

        /// <summary>
        /// Gets (Returns) the array of address line objects
        /// </summary>
        public AddressLine[] AddressLines
        {
            get
            {
                return this.m_aAddressLines;
            }
        }

        /// <summary>
        /// Gets (Returns) the number of lines in the address
        /// </summary>
        public int Length
        {
            get
            {
                return this.m_aAddressLines != null ? this.m_aAddressLines.Length : 0;
            }
        }

        /// <summary>
        /// Gets a value indicating whether Flag that indicates there were not enough address lines configured to contain the address
        /// </summary>
        public bool IsOverflow
        {
            get
            {
                return this.m_bIsOverflow;
            }
        }

        /// <summary>
        /// Gets a value indicating whether Flag that indicates one or more address lines were truncated
        /// </summary>
        public bool IsTruncated
        {
            get
            {
                return this.m_bIsTruncated;
            }
        }

        /// <summary>
        /// Gets a value indicating whether Flag that this address may be missing sub-premise info
        /// </summary>
        public bool IsMissingSubPrem
        {
            get
            {
                return this.m_bIsMissingSubPrem;
            }
        }

        /// <summary>
        /// Gets or sets value for DPV Status
        /// </summary>
        public DPVStatusType DPVStatus
        {
            get
            {
                return this.m_dPVStatusField;
            }

            set
            {
                this.m_dPVStatusField = value;
            }
        }        
    }
}

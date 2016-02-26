//-----------------------------------------------------------------------
// <copyright file="ExampleAddress.cs" company="External">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp
 * Class Name       : ExampleAddress.cs
 * Version          : 1.0
 * Type             : Class
 * Purpose          : Cs page for sample address
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
//// Common Classes > ExampleAddress.cs
//// Example address details

namespace com.qas.proweb
{
    using System;
    using com.qas.proweb.soap;

    /// <summary>
    /// Simple class to encapsulate example address data
    /// </summary>
    public class ExampleAddress
    {
        //// -- Private Members --

        /// <summary>
        /// field for address comment
        /// </summary>
        private string m_sComment;

        /// <summary>
        /// field value for address
        /// </summary>
        private FormattedAddress m_Address;

        // -- Public Methods --

        /// <summary>
        /// Initializes a new instance of the <see cref="ExampleAddress"/> class.Construct from SOAP-layer object
        /// </summary>
        /// <param name="a">QA Example Address</param>
        public ExampleAddress(QAExampleAddress a)
        {
            this.m_sComment = a.Comment;
            this.m_Address = new FormattedAddress(a.Address);
        }

        // -- Read-only Properties --

        /// <summary>
        /// Gets (Returns) a comment describing the example address
        /// </summary>
        public string Comment
        {
            get
            {
                return this.m_sComment;
            }
        }

        /// <summary>
        /// Gets (Returns) the formatted example address
        /// </summary>
        public AddressLine[] AddressLines
        {
            get
            {
                return this.m_Address.AddressLines;
            }
        }

        //// -- Private Members --

        /// <summary>
        /// Create array from SOAP-layer array
        /// </summary>
        /// <param name="aAddresses">address array</param>
        /// <returns>address result</returns>
        public static ExampleAddress[] createArray(QAExampleAddress[] aAddresses)
        {
            ExampleAddress[] aResults = null;
            if (aAddresses != null)
            {
                int iSize = aAddresses.GetLength(0);
                if (iSize > 0)
                {
                    aResults = new ExampleAddress[iSize];
                    for (int i = 0; i < iSize; i++)
                    {
                        aResults[i] = new ExampleAddress(aAddresses[i]);
                    }
                }
            }

            return aResults;
        }
    }
}

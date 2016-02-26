//-----------------------------------------------------------------------
// <copyright file="CanSearch.cs" company="External">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp
 * Class Name       : CanSearch.cs
 * Version          : 1.0
 * Type             : Class
 * Purpose          : Cs page for search
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
/// Common Classes > CanSearch.cs
/// Details about searching availability
namespace com.qas.proweb
{
    using System;
    using com.qas.proweb.soap;

    /// <summary>
    /// Simple class to encapsulate the result of a CanSearch operation:
    /// searching availability, and the reasons when unavailable
    /// </summary>
    public class CanSearch
    {
        // -- Private Members --

        /// <summary>
        /// Variable for boolean flag
        /// </summary>
        private bool m_bOk;

        /// <summary>
        /// Variable for the error message
        /// </summary>
        private string m_sErrorMessage;

        /// <summary>
        /// variable for error
        /// </summary>
        private int m_iError;

        // -- Public Methods --

        /// <summary>
        /// Initializes a new instance of the <see cref="CanSearch"/> class.Construct from SOAP-layer object
        /// </summary>
        /// <param name="tResult">QA Search Ok</param>
        public CanSearch(QASearchOk tResult)
        {
            this.m_bOk = tResult.IsOk;

            if (tResult.ErrorCode != null)
            {
                this.m_iError = System.Convert.ToInt32(tResult.ErrorCode);
            }

            if (tResult.ErrorMessage != null)
            {
                this.m_sErrorMessage = tResult.ErrorMessage + " [" + this.m_iError + "]";
            }
        }

        // -- Read-only Properties --

        /// <summary>
        /// Gets a value indicating whether searching is possible for the requested data-engine-layout combination
        /// </summary>
        public bool IsOk
        {
            get
            {
                return this.m_bOk;
            }
        }

        /// <summary>
        /// Gets (Returns) error information relating why it is not possible to search the requested data-engine-layout
        /// </summary>
        public string ErrorMessage
        {
            get
            {
                return this.m_sErrorMessage;
            }
        }
    }
}
//-----------------------------------------------------------------------
// <copyright file="BulkSearchResult.cs" company="External">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp
 * Class Name       : BulkSearchResult.cs
 * Version          : 1.0
 * Type             : Class
 * Purpose          : Cs page for search bulk data result
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
    /// Simple class to encapsulate the array of results returned by a bulk verification
    /// </summary>
    public class BulkSearchResult
    {
        // Private members

        /// <summary>
        /// variable for bulk search items array
        /// </summary>
        private BulkSearchItem[] m_BulkSearchItemArray;

        /// <summary>
        /// variable for bulk error messages
        /// </summary>
        private string m_BulkErrorMessage;

        /// <summary>
        /// variable for bulk error codes
        /// </summary>
        private int m_iBulkErrorCode;

        /// <summary>
        /// Initializes a new instance of the <see cref="BulkSearchResult"/> class.
        /// </summary>
        /// <param name="bsr">QA Bulk Search Result</param>
        public BulkSearchResult(QABulkSearchResult bsr)
        {
            // We must have lines in an address so aLines should never be null
            int iSize = bsr.BulkAddress.GetLength(0);
            if (bsr.BulkError != null)
            {
                this.m_BulkErrorMessage = bsr.BulkError;
            }
            else
            {
                this.m_BulkErrorMessage = string.Empty;
            }

            if (bsr.ErrorCode != null)
            {
                this.m_iBulkErrorCode = System.Convert.ToInt32(bsr.ErrorCode);
            }
            else
            {
                this.m_iBulkErrorCode = 0;
            }

            if (iSize > 0)
            {
                this.m_BulkSearchItemArray = new BulkSearchItem[iSize];
                for (int i = 0; i < iSize; i++)
                {
                    this.m_BulkSearchItemArray[i] = new BulkSearchItem(bsr.BulkAddress[i]);
                }
            }
        }

        /// <summary>
        /// Gets a value for Bulk Search Items array
        /// </summary>
        public BulkSearchItem[] BulkSearchItems
        {
            get
            {
                return this.m_BulkSearchItemArray;
            }
        }

        /// <summary>
        /// Method to return error message
        /// </summary>
        /// <returns>Bulk error message</returns>
        public string ErrorMessage()
        {
            return this.m_BulkErrorMessage;
        }

        /// <summary>
        /// Method to return Error code
        /// </summary>
        /// <returns>Bulk error code</returns>
        public int ErrorCode()
        {
            return this.m_iBulkErrorCode;
        }
    }
}

//-----------------------------------------------------------------------
// <copyright file="Layout.cs" company="External">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp
 * Class Name       : Layout.cs
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
/// Common Classes > Layout.cs
/// Layout details (for address formatting)
namespace com.qas.proweb
{
    using System;
    using com.qas.proweb.soap;

    /// <summary>
    /// Simple class to encapsulate layout data
    /// </summary>
    public class Layout
    {
        //// -- Private Members --

        /// <summary>
        /// field for name
        /// </summary>
        private string m_sName = null;

        /// <summary>
        /// field for comment
        /// </summary>
        private string m_sComment = null;

        // -- Public Methods --

        /// <summary>
        /// Initializes a new instance of the <see cref="Layout"/> class.Construct from SOAP-layer object
        /// </summary>
        /// <param name="l">QA Layout</param>
        public Layout(QALayout l)
        {
            this.m_sName = l.Name;
            this.m_sComment = l.Comment;
        }

        // -- Read-only Properties --

        /// <summary>
        /// Gets (Returns) the name of the layout
        /// </summary>
        public string Name
        {
            get
            {
                return this.m_sName;
            }
        }

        /// <summary>
        /// Gets (Returns) any comment associated with this layout
        /// </summary>
        public string Comment
        {
            get
            {
                return this.m_sComment;
            }
        }

        // -- Public Methods --

        /// <summary>
        /// Create array from SOAP-layer array
        /// </summary>
        /// <param name="aLayouts">QA Layout</param>
        /// <returns>a Results</returns>
        public static Layout[] CreateArray(QALayout[] aLayouts)
        {
            Layout[] aResults = null;
            if (aLayouts != null)
            {
                int iSize = aLayouts.GetLength(0);
                if (iSize > 0)
                {
                    aResults = new Layout[iSize];
                    for (int i = 0; i < iSize; i++)
                    {
                        aResults[i] = new Layout(aLayouts[i]);
                    }
                }
            }

            return aResults;
        }

        /// <summary>
        /// Returns the Layout which matches the name, otherwise null
        /// </summary>
        /// <param name="aLayouts">Array of layouts to search</param>
        /// <param name="sLayoutName">Layout name to search for</param>
        /// <returns>a Layouts</returns>
        public static Layout FindByName(Layout[] aLayouts, string sLayoutName)
        {
            for (int i = 0; i < aLayouts.GetLength(0); i++)
            {
                if (aLayouts[i].Name.Equals(sLayoutName))
                {
                    return aLayouts[i];
                }
            }

            return null;
        }
    }
}
//-----------------------------------------------------------------------
// <copyright file="PromptSet.cs" company="External">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp
 * Class Name       : PromptSet.cs
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
/// Common Classes > Prompt Set.cs
/// Prompt set details
namespace com.qas.proweb
{
    using System;
    using com.qas.proweb.soap;

    /// <summary>
    /// Simple class to encapsulate data representing a search prompt set
    /// </summary>
    public class PromptSet
    {
        // -- Private Members --

        /// <summary>
        /// field for dynamic
        /// </summary>
        private bool m_bDynamic;

        /// <summary>
        /// field for lines
        /// </summary>
        private PromptLine[] m_aLines;

        // -- Public Methods --

        /// <summary>
        /// Initializes a new instance of the <see cref="PromptSet"/> class.Construct from SOAP-layer object
        /// </summary>
        /// <param name="tPromptSet">QA Prompt Set</param>
        public PromptSet(QAPromptSet tPromptSet)
        {
            this.m_bDynamic = tPromptSet.Dynamic;

            this.m_aLines = null;
            if (tPromptSet.Line != null)
            {
                int iSize = tPromptSet.Line.GetLength(0);
                if (iSize > 0)
                {
                    this.m_aLines = new PromptLine[iSize];
                    for (int i = 0; i < iSize; i++)
                    {
                        this.m_aLines[i] = new PromptLine(tPromptSet.Line[i]);
                    }
                }
            }
        }

        // -- Public Constants --

        /// <summary>
        /// Enumeration of available search prompt sets
        /// </summary>
        public enum Types
        {
            /// <summary>
            /// field for One Line
            /// </summary>
            OneLine = PromptSetType.OneLine,

            /// <summary>
            /// field for Default
            /// </summary>
            Default = PromptSetType.Default,

            /// <summary>
            /// field for Generic
            /// </summary>
            Generic = PromptSetType.Generic,

            /// <summary>
            /// field for Optimal
            /// </summary>
            Optimal = PromptSetType.Optimal,

            /// <summary>
            /// field for Alternate
            /// </summary>
            Alternate = PromptSetType.Alternate,

            /// <summary>
            /// field for Alternate2
            /// </summary>
            Alternate2 = PromptSetType.Alternate2,

            /// <summary>
            /// field for alternate3
            /// </summary>
            Alternate3 = PromptSetType.Alternate3
        }

        // -- Read-only Properties --

        /// <summary>
        /// Gets a value indicating whether (Returns whether) dynamic searching should be used (submitting the search as they type)
        /// </summary>
        public bool IsDynamic
        {
            get
            {
                return this.m_bDynamic;
            }
        }

        /// <summary>
        /// Gets (Returns) the array of search prompt lines that make up this search prompt set
        /// </summary>
        public PromptLine[] Lines
        {
            get
            {
                return this.m_aLines;
            }
        }

        // -- Public Methods --

        /// <summary>
        /// Returns a <code>String[]</code> of prompts (from the search prompt line array)
        /// </summary>
        /// <returns>as Results</returns>
        public string[] GetLinePrompts()
        {
            int iSize = this.m_aLines.GetLength(0);
            string[] asResults = new string[iSize];
            for (int i = 0; i < iSize; i++)
            {
                asResults[i] = this.m_aLines[i].Prompt;
            }

            return asResults;
        }
    }
}

//-----------------------------------------------------------------------
// <copyright file="PromptLine.cs" company="External">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp
 * Class Name       : PromptLine.cs
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
/// Common Classes > Prompt Line.cs
/// Prompt line details
namespace com.qas.proweb
{
    using System;
    using com.qas.proweb.soap;

    /// <summary>
    /// This class encapsulates one line of a search prompt set.
    /// </summary>
    public class PromptLine
    {
        // -- Private Members --
        
        /// <summary>
        /// field for Prompt
        /// </summary>
        private string m_sPrompt;

        /// <summary>
        /// field for Example
        /// </summary>
        private string m_sExample;

        /// <summary>
        /// field for Suggested Input Length
        /// </summary>
        private int m_iSuggestedInputLength = 0; // positive integer

        // -- Public Methods --

         /// <summary>
        /// Initializes a new instance of the <see cref="PromptLine"/> class.Construct from SOAP-layer object
         /// </summary>
        /// <param name="t">Prompt Line</param>
        public PromptLine(com.qas.proweb.soap.PromptLine t)
        {
            this.m_sPrompt = t.Prompt;
            this.m_sExample = t.Example;
            this.m_iSuggestedInputLength = System.Convert.ToInt32(t.SuggestedInputLength);
        }

        // -- Read-only Properties --

        /// <summary>
        /// Gets (Returns) the prompt for this input line (e.g. "Town" or "Street")
        /// </summary>
        public string Prompt
        {
            get
            {
                return this.m_sPrompt;
            }
        }

        /// <summary>
        /// Gets (Returns) an example of what is expected for this input line (e.g. "London")
        /// </summary>
        public string Example
        {
            get
            {
                return this.m_sExample;
            }
        }

        /// <summary>
        /// Gets (Returns) the length in characters that is suggested for an input field for this line
        /// </summary>
        public int SuggestedInputLength
        {
            get
            {
                return this.m_iSuggestedInputLength;
            }
        }
    }
}

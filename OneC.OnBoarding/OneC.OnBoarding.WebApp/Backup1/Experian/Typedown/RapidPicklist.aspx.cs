//-----------------------------------------------------------------------
// <copyright file="RapidPicklist.aspx.cs" company="External">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp
 * Class Name       : RapidPicklist.aspx.cs
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
/// Intranet > Rapid Addressing > Standard > RapidPicklist
/// Results frame, displays picklist, handles dynamic seaching/refinement
namespace com.qas.prowebintegration
{
    using System;
    using System.Collections;
    using System.ComponentModel;
    using System.Data;
    using System.Drawing;
    using System.Web;
    using System.Web.SessionState;
    using System.Web.UI;
    using System.Web.UI.HtmlControls;
    using System.Web.UI.WebControls;
    using com.qas.proweb;                    // QuickAddress services

    /// <summary>
    /// Intranet > Rapid Addressing > Standard > Full Quick Address searching with hierarchical pick lists
    /// Perform dynamic searching and refinement, updating the pick list in response
    /// Main actions:
    ///   - (None): included directly in main parent page (JavaScript picks up the pick list from parent)
    ///   - Dynamic search/refinement: caused by JavaScript in main parent page
    /// This page is based on RapidBasePage, which provides functionality common to the scenario
    /// </summary>
    public partial class RapidPicklist : RapidBasePage
    {
        /** Page members **/

        /// <summary>
        ///  Current pick list, to display
        /// </summary>
        protected Picklist m_Picklist = null;

        /** Page controls **/

        /// <summary>
        ///  Gets Location of pick list data; determined by whether we are being directly or indirectly requested
        /// </summary>
        protected string DataSource
        {
            get
            {
                // Direct: by browser java script - indirect: just due to parent page reference
                return this.DataID == string.Empty ? "parent." : string.Empty;
            }
        }

        /// <summary>
        ///  Gets Pick list depth - visual hint (set by browser Java script)
        /// </summary>
        protected string HistoryDepth
        {
            get
            {
                return HiddenHistoryDepth.Value;
            }
        }

        /// <summary>
        ///  Gets Text to search/refine on
        /// </summary>
        protected string SearchString
        {
            get
            {
                return HiddenSearchText.Value;
            }
        }

        /// <summary>
        ///  Gets or sets Moniker of the pick list item selected (set by browser Java script)
        /// </summary>
        private string Moniker
        {
            get
            {
                return HiddenMoniker.Value;
            }

            set
            {
                HiddenMoniker.Value = value;
            }
        }

        /// <summary>
        ///  Gets Country data identifier (i.e. AUS)
        /// </summary>
        private string DataID
        {
            get
            {
                return HiddenDataID.Value;
            }
        }

        /// <summary>
        /// Update event: perform initial or refinement search
        /// </summary>
        /// <param name="sender">object sender</param>
        /// <param name="e">Event Arguments</param>
        protected void ActionUpdate_Click(object sender, System.EventArgs e)
        {
            if (this.Moniker == string.Empty)
            {
                this.InitialDynamicSearch();
            }
            else
            {
                this.RefinementSearch();
            }
        }

        /** Methods **/

        /// <summary>
        /// Perform initial dynamic (Type down) search
        /// </summary>
        protected void InitialDynamicSearch()
        {
            try
            {
                theQuickAddress.Engine = QuickAddress.EngineTypes.Typedown;
                this.m_Picklist = theQuickAddress.Search(this.DataID, this.SearchString, PromptSet.Types.Default).Picklist;
            }
            catch (Exception x)
            {
                this.GoErrorPage(x);
            }
            //// Display results picklist: done by page
        }

        /// <summary>
        /// Perform refinement search on Moniker and SearchString
        /// </summary>
        protected void RefinementSearch()
        {
            try
            {
                this.m_Picklist = theQuickAddress.Refine(this.Moniker, this.SearchString);
            }
            catch (Exception x)
            {
                this.GoErrorPage(x);
            }

            // Display results picklist: done by page
        }

        /** Page events **/

        #region Web Form Designer generated code
        override protected void OnInit(EventArgs e)
        {
            //
            // CODEGEN: This call is required by the ASP.NET Web Form Designer.
            //
            InitializeComponent();
            base.OnInit(e);
        }

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {

        }
        #endregion
    }
}

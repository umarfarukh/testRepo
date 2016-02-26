//-----------------------------------------------------------------------
// <copyright file="HierBasePage.cs" company="External">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp
 * Class Name       : HierBasePage.cs
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

/// QAS Pro Web integration code
/// (C) QAS Ltd, www.qas.com
namespace com.qas.prowebintegration
{
    using System;
    using System.Collections;                        // ArrayList class
    using com.qas.proweb;                            // QuickAddress services

    /// <summary>
    /// Scenario "Address Capture on the Intranet" - hierarchical pick lists
    /// This is the base class for the pages of the scenario
    /// It provides common functionality and facilitates inter-page value passing through the ViewState
    /// </summary>
    public class HierBasePage : System.Web.UI.Page
    {
        /// <summary>
        /// Retrieve the state of the previous page
        /// </summary>
        protected HierBasePage StoredPage = null;

        // Page filenames

        /// <summary>
        /// constant field page BEGIN
        /// </summary>
        private const string PAGE_BEGIN = "HierInput.aspx";

        /// <summary>
        /// constant field page SEARCH
        /// </summary>
        private const string PAGE_SEARCH = "HierSearch.aspx";

        /// <summary>
        /// constant field page FORMAT
        /// </summary>
        private const string PAGE_FORMAT = "HierAddress.aspx";

        /// <summary>
        ///  Pick list step-in warnings, to be displayed on next page
        /// </summary>
        public enum StepinWarnings
        {
            /// <summary>
            /// field for none value
            /// </summary>
            None,

            /// <summary>
            /// field for close matches
            /// </summary>
            CloseMatches,

            /// <summary>
            /// field for cross border
            /// </summary>
            CrossBorder,

            /// <summary>
            /// field for post code recode
            /// </summary>
            PostcodeRecode
        }

        /** Stored properties **/

        /// <summary>
        ///  Gets or sets Country data identifier (i.e. AUS)
        /// </summary>
        public string StoredDataID
        {
            get
            {
                return (string)ViewState[Constants.FIELD_DATA_ID];
            }

            set
            {
                this.ViewState[Constants.FIELD_DATA_ID] = value;
            }
        }

        /// <summary>
        /// Gets or sets  Country display name (i.e. Australia)
        /// </summary>
        public string StoredCountryName
        {
            get
            {
                return (string)ViewState[Constants.FIELD_COUNTRY_NAME];
            }

            set
            {
                this.ViewState[Constants.FIELD_COUNTRY_NAME] = value;
            }
        }

        /// <summary>
        ///  Gets or sets  Initial user search (i.e. 14 main street, boston)
        /// </summary>
        public string StoredUserInput
        {
            get
            {
                return (string)ViewState[Constants.FIELD_INPUT_LINES];
            }

            set
            {
                this.ViewState[Constants.FIELD_INPUT_LINES] = value;
            }
        }

        /// <summary>
        ///  Gets or sets  How we arrived on the formatting page (i.e. country not available)
        /// </summary>
        public Constants.Routes StoredRoute
        {
            get
            {
                object objValue = ViewState[Constants.FIELD_ROUTE];
                return (objValue != null) ? (Constants.Routes)objValue : Constants.Routes.Okay;
            }

            set
            {
                this.ViewState[Constants.FIELD_ROUTE] = value;
            }
        }

        // For transfering values between Search -> Address pages

        /// <summary>
        ///  Gets or sets  Moniker of the address
        /// </summary>
        public string StoredMoniker
        {
            get
            {
                return (string)ViewState[Constants.FIELD_MONIKER];
            }

            set
            {
                this.ViewState[Constants.FIELD_MONIKER] = value;
            }
        }

        /// <summary>
        ///  Gets or sets  Step-in warning (i.e. Postcode has been recoded)
        /// </summary>
        public StepinWarnings StoredWarning
        {
            get
            {
                object objValue = ViewState["Warning"];
                return (objValue != null) ? (StepinWarnings)objValue : StepinWarnings.None;
            }

            set
            {
                this.ViewState["Warning"] = value;
            }
        }

        /// <summary>
        ///  Gets or sets Additional address/error information
        /// </summary>
        public string StoredErrorInfo
        {
            get
            {
                return (string)ViewState[Constants.FIELD_ERROR_INFO];
            }

            set
            {
                this.ViewState[Constants.FIELD_ERROR_INFO] = value;
            }
        }

        /** Helper functions **/

        /// <summary>
        ///  Pick list history
        /// </summary>
        /// <returns>History Stack</returns>
        public HistoryStack GetStoredHistory()
        {
            object objValue = ViewState["History"];
            if (objValue is ArrayList)
            {
                HistoryStack stack = new HistoryStack((ArrayList)objValue);
                return stack;
            }

            return new HistoryStack();
        }

        /// <summary>
        /// Method to Set Stored History
        /// </summary>
        /// <param name="vValue">Set Stored History</param>
        public void SetStoredHistory(HistoryStack vValue)
        {
            this.ViewState["History"] = vValue;
        }

        /// <summary>
        ///  Pick up the preceding page, so we can access it's ViewState (see Stored properties section)
        /// </summary>
        /// <param name="sender">object sender</param>
        /// <param name="e">event arguments</param>
        protected virtual void Page_BaseLoad(object sender, System.EventArgs e)
        {
            if (!this.IsPostBack && Context.Handler is HierBasePage)
            {
                // Retrieve the state of the previous page, so it is available to us
                this.StoredPage = Context.Handler as HierBasePage;
            }
            else
            {
                // Point stored page to us, as we are the previous page
                this.StoredPage = this;
            }
        }

        /** Helper functions **/

        /// <summary>
        ///  Create a new QAS service, connected to the configured server
        /// </summary>
        /// <returns>Quick Address</returns>
        protected QuickAddress NewQuickAddress()
        {
            // Retrieve server URL from web.config
            string sServerURL = System.Configuration.ConfigurationManager.AppSettings[Constants.KEY_SERVER_URL];
            string sFormatAddressInPicklist = System.Configuration.ConfigurationManager.AppSettings[Constants.KEY_FORMATADDRESSINPICKLIST];
            bool bFormatAddressInPicklist = Convert.ToBoolean(sFormatAddressInPicklist);

            // Create QuickAddress search object
            QuickAddress cQuickAddress = new QuickAddress(sServerURL);
            cQuickAddress.FormattedAddressInPicklist = bFormatAddressInPicklist;

            return cQuickAddress;
        }

        /// <summary>
        ///  Fetch the layout from the config
        /// </summary>
        /// <returns>string layout</returns>
        protected string GetLayout()
        {
            string sLayout;
            string sDataID = this.StoredDataID;

            // Look for a layout specific to this datamap 
            sLayout = System.Configuration.ConfigurationManager.AppSettings[Constants.KEY_LAYOUT + "." + sDataID];

            if (sLayout == null || sLayout == string.Empty)
            {
                // No layout found specific to this datamap - try the default
                sLayout = System.Configuration.ConfigurationManager.AppSettings[Constants.KEY_LAYOUT];
            }

            return sLayout;
        }

        /// <summary>
        ///  Transfer to the initial page, to select the country and enter search terms
        /// </summary>
        protected void GoFirstPage()
        {
            Server.Transfer(PAGE_BEGIN);
        }

        /// <summary>
        ///  Transfer to the address searching and pick list display page
        /// </summary>
        protected void GoSearchPage()
        {
            Server.Transfer(PAGE_SEARCH);
        }

        /// <summary>
        ///  Transfer to the address confirmation page to retrieve the found address
        /// </summary>
        /// <param name="sMoniker">string Moniker</param>
        /// <param name="eWarn">Step in Warnings</param>
        protected void GoFormatPage(string sMoniker, StepinWarnings eWarn)
        {
            this.StoredPage.StoredRoute = Constants.Routes.Okay;
            this.StoredPage.StoredMoniker = sMoniker;
            this.StoredPage.StoredWarning = eWarn;
            Server.Transfer(PAGE_FORMAT);
        }

        /// <summary>
        ///  Transfer to the address confirmation page for manual address entry, after capture failure
        /// </summary>
        /// <param name="route">a route</param>
        protected void GoErrorPage(Constants.Routes route)
        {
            this.StoredPage.StoredRoute = route;
            Server.Transfer(PAGE_FORMAT);
        }

        /// <summary>
        /// Method to Go error page
        /// </summary>
        /// <param name="route">a route</param>
        /// <param name="sMessage">string message</param>
        protected void GoErrorPage(Constants.Routes route, string sMessage)
        {
            this.StoredPage.StoredRoute = route;
            this.StoredPage.StoredErrorInfo = sMessage;
            Server.Transfer(PAGE_FORMAT);
        }

        /// <summary>
        ///  Transfer to the address confirmation page for manual address entry, after exception thrown
        /// </summary>
        /// <param name="x">an exception</param>
        protected void GoErrorPage(Exception x)
        {
            this.StoredPage.StoredRoute = Constants.Routes.Failed;
            this.StoredPage.StoredErrorInfo = x.Message;
            Server.Transfer(PAGE_FORMAT);
        }

        /// <summary>
        ///  Transfer out of the scenario to the final (summary) page
        /// </summary>
        protected void GoFinalPage()
        {
            Server.Transfer(Constants.PAGE_FINAL_ADDRESS);
        }

        /** Helper classes **/

        /// <summary>
        /// Helper class: stack of all the search pick lists we've stepped through
        /// Implemented using an ArrayList so we can enumerate forwards through them for display,
        /// the 'bottom' of the stack is element 0, the 'top' is element Count - 1, where items are pushed and popped
        /// </summary>
        [Serializable]
        public class HistoryStack : ArrayList
        {
            /// <summary>
            /// Initializes a new instance of the <see cref="HistoryStack" /> class.
            /// </summary>
            public HistoryStack()
            {
            }

            /// <summary>
            /// Initializes a new instance of the <see cref="HistoryStack" /> class.
            /// </summary>
            /// <param name="vValue">Array List</param>
            public HistoryStack(ArrayList vValue)
            {
                foreach (object obj in vValue)
                {
                    this.Add((HistoryItem)obj);
                }
            }

            /// <summary>
            ///  Gets or sets the element at the specified index
            /// </summary>
            /// <param name="iIndex">integer index</param>
            /// <returns>History Item</returns>
            public new HistoryItem this[int iIndex]
            {
                get
                {
                    return (HistoryItem)base[iIndex];
                }

                set
                {
                    base[iIndex] = value;
                }
            }

            /// <summary>
            ///  Returns the object at the top of the stack without removing it
            /// </summary>
            /// <returns>History Item</returns>
            public HistoryItem Peek()
            {
                return (HistoryItem)this[Count - 1];
            }

            /// <summary>
            ///  Removes and returns the object at the top of the stack
            /// </summary>
            /// <returns>History Item</returns>
            public HistoryItem Pop()
            {
                HistoryItem tail = this.Peek();
                this.RemoveAt(this.Count - 1);
                return tail;
            }

            /// <summary>
            ///  Inserts an object at the top of the stack: prevents duplicates
            /// </summary>
            /// <param name="item">an item</param>
            public void Add(HistoryItem item)
            {
                if (this.Count == 0 || !this.Peek().Moniker.Equals(item.Moniker))
                {
                    base.Add(item);
                }
            }

            /// <summary>
            ///  Inserts an object at the top of the stack
            /// </summary>
            /// <param name="sMoniker">string Moniker</param>
            /// <param name="sText">string Text</param>
            /// <param name="sPostcode">string Postcode</param>
            /// <param name="sScore">string Score</param>
            public void Push(string sMoniker, string sText, string sPostcode, string sScore)
            {
                HistoryItem item = new HistoryItem(sMoniker, sText, sPostcode, sScore);
                this.Add(item);
            }

            /// <summary>
            ///  Inserts an object at the top of the stack
            /// </summary>
            /// <param name="item">a item</param>
            public void Push(PicklistItem item)
            {
                this.Push(item.Moniker, item.Text, item.Postcode, item.ScoreAsString);
            }
        }

        /// <summary>
        /// Helper class: store details of a search pick list we've seen
        /// </summary>
        [Serializable]
        public class HistoryItem
        {
            /// <summary>
            /// field for Moniker
            /// </summary>
            public string Moniker = string.Empty;

            /// <summary>
            /// field for Text
            /// </summary>
            public string Text = string.Empty;

            /// <summary>
            /// field for Postcode
            /// </summary>
            public string Postcode = string.Empty;

            /// <summary>
            /// field for Score
            /// </summary>
            public string Score = string.Empty;

            /// <summary>
            /// Initializes a new instance of the <see cref="HistoryItem" /> class.
            /// </summary>
            /// <param name="sMonikerIn">string Moniker</param>
            /// <param name="sTextIn">string Text</param>
            /// <param name="sPostcodeIn">string Postcode</param>
            /// <param name="sScoreIn">string Score</param>
            public HistoryItem(string sMonikerIn, string sTextIn, string sPostcodeIn, string sScoreIn)
            {
                this.Moniker = sMonikerIn;
                this.Text = sTextIn;
                this.Postcode = sPostcodeIn;
                this.Score = sScoreIn;
            }
        }
    }
}

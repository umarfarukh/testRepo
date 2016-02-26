//-----------------------------------------------------------------------
// <copyright file="RapidBasePage.cs" company="External">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp
 * Class Name       : RapidBasePage.cs
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
/// Intranet > Rapid Addressing > Standard > RapidBase
/// Provide common functionality and value transfer
namespace com.qas.prowebintegration
{
    using System;
    using System.Collections;                // ArrayList class
    using System.Text;                        // StringBuilder
    using com.qas.proweb;                    // QuickAddress services

    /// <summary>
    /// Intranet > Rapid Addressing > Standard > RapidBase
    /// This is the base class for the pages of the scenario
    /// It provides common functionality and facilitates inter-page value passing through the ViewState
    /// </summary>
    public class RapidBasePage : System.Web.UI.Page
    {
        /** Attributes & Constants **/

        // Select Box width constants 

        /// <summary>
        /// filed for MAX DATAMAP NAME LENGTH 
        /// </summary>
        protected const int MAX_DATAMAP_NAME_LENGTH = 26;

        /// <summary>
        /// filed for SELECT WIDTH 
        /// </summary>
        protected const string SELECT_WIDTH = "16em";
        
        // Viewstate names

        /// <summary>
        /// filed for Call back 
        /// </summary>
        protected const string FIELD_CALLBACK = "Callback";

        /// <summary>
        ///  Pick list history, stored in ViewState
        /// </summary>
        protected HistoryStack m_aHistory = null;

        /// <summary>
        ///  List of data maps available on server
        /// </summary>
        protected Dataset[] m_atDatasets = null;

        // Filenames

        /// <summary>
        /// filed for page SEARCH
        /// </summary>
        private const string PAGE_SEARCH = "RapidSearch.aspx";

        /// <summary>
        /// filed for page FORMAT
        /// </summary>
        private const string PAGE_FORMAT = "RapidAddress.aspx";

        // Viewstate names

        /// <summary>
        /// filed for Engine 
        /// </summary>
        private const string FIELD_ENGINE = "Engine";

        /// <summary>
        /// filed for History 
        /// </summary>
        private const string FIELD_HISTORY = "History";

        /// <summary>
        /// filed for WARNING 
        /// </summary>
        private const string FIELD_WARNING = "Warning";

        /// <summary>
        /// filed for DATA LIST 
        /// </summary>
        private const string FIELD_DATALIST = "Datalist";

        /// <summary>
        /// field for quick address
        /// </summary>
        private static QuickAddress s_searchService = null;

        /// <summary>
        ///  Store the state of the previous page
        /// </summary>
        private RapidBasePage StoredPage = null;

        
        /// <summary>
        ///  Enumerate operations that can be performed on a pick list item
        /// </summary>
        protected enum Commands
        {
            /// <summary>
            /// Step in to sub-pick list
            /// </summary>
            StepIn,                                    // Step in to sub-picklist

            /// <summary>
            /// Force-accept an un-recognized address
            /// </summary>
            ForceFormat,                            // Force-accept an unrecognised address

            /// <summary>
            /// Format into final address
            /// </summary>
            Format,                                    // Format into final address

            /// <summary>
            ///  User must enter a value within the range shown
            /// </summary>
            HaltRange,                                // User must enter a value within the range shown

            /// <summary>
            /// User must enter premise details
            /// </summary>
            HaltIncomplete,                            // User must enter premise details

            /// <summary>
            ///  No hyperlink action - self-explanatory informational
            /// </summary>
            None                                    // No hyperlink action - self-explanatory informational
        }

        /// <summary>
        ///  Enumerate the pick list item types (affects icon displayed)
        /// </summary>
        protected enum Types
        {
            /// <summary>
            /// Pick list item is an alias (synonym)
            /// </summary>
            Alias,                                    // Picklist item is an alias (synonym)

            /// <summary>
            /// Pick list item is an informational
            /// </summary>
            Info,                                    // Picklist item is an informational

            /// <summary>
            /// Pick list item is a warning informational
            /// </summary>
            InfoWarn,                                // Picklist item is a warning informational

            /// <summary>
            /// Pick list item is a name/person 
            /// </summary>
            Name,                                    // Picklist item is a name/person 

            /// <summary>
            /// Pick list item is a name alias (i.e. forename synonym)
            /// </summary>
            NameAlias,                                // Picklist item is a name alias (i.e. forename synonym)

            /// <summary>
            /// Pick list item is a PO Box grouping
            /// </summary>
            POBox,                                    // Picklist item is a PO Box grouping

            /// <summary>
            /// Pick list item is standard
            /// </summary>
            Standard                                // Picklist item is standard
        }

        /// <summary>
        ///  Pick list step-in warnings (displayed on next page)
        /// </summary>
        protected enum StepinWarnings
        {
            /// <summary>
            /// field for No warning
            /// </summary>
            None,                                    // No warning

            /// <summary>
            /// field for Auto-stepped past close matches
            /// </summary>
            CloseMatches,                            // Auto-stepped past close matches

            /// <summary>
            /// field for Stepped into cross-border match
            /// </summary>
            CrossBorder,                            // Stepped into cross-border match

            /// <summary>
            /// field for Force-format step-in performed
            /// </summary>
            ForceAccept,                            // Force-format step-in performed

            /// <summary>
            /// field for Stepped into informational item (i.e. 'Click to Show All')
            /// </summary>
            Info,                                    // Stepped into informational item (i.e. 'Click to Show All')

            /// <summary>
            /// field for Address elements have overflowed the layout
            /// </summary>
            Overflow,                                // Address elements have overflowed the layout

            /// <summary>
            /// field for Stepped into postcode recode
            /// </summary>
            PostcodeRecode,                            // Stepped into postcode recode

            /// <summary>
            /// field for Address elements have been truncated by the layout
            /// </summary>
            Truncate,                                // Address elements have been truncated by the layout

            /// <summary>
            /// field for status
            /// </summary>
            DpvStatusConf,

            /// <summary>
            /// field for status
            /// </summary>
            DpvStatusUnConf,

            /// <summary>
            /// field for status
            /// </summary>
            DpvStatusConfMisSec,

            /// <summary>
            /// field for locked
            /// </summary>
            DpvLocked,

            /// <summary>
            /// field for see hit
            /// </summary>
            DpvSeedHit,

            /// <summary>
            /// field for missing sub-premise
            /// </summary>
            MissingSubPrem                          // This address may be missing a sub-premise
        }

        /** Stored properties **/

        /// <summary>
        /// Gets or sets Name of Java script function to call on completion
        /// </summary>
        protected string StoredCallback
        {
            get
            {
                return (string)ViewState[FIELD_CALLBACK];
            }

            set
            {
                this.ViewState[FIELD_CALLBACK] = value;
            }
        }

        /// <summary>
        ///  Gets or sets Country data identifier (i.e. AUS)
        /// </summary>
        protected string StoredDataID
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
        /// Gets or sets Stored Search String
        /// </summary>
        protected string StoredSearchString
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
        /// Gets or sets  Stored List of data maps available on server
        /// </summary>
        protected Dataset[] StoredDataMapList
        {
            get
            {
                return (Dataset[])ViewState[FIELD_DATALIST];
            }

            set
            {
                this.ViewState[FIELD_DATALIST] = value;
            }
        }

        /// <summary>
        /// Gets or sets   Additional address/error information
        /// </summary>
        protected string StoredErrorInfo
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

        /// <summary>
        /// Gets or sets Moniker of the address
        /// </summary>
        protected string StoredMoniker
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
        /// Gets or sets How we arrived on the formatting page (i.e. pre-search check failed)
        /// </summary>
        protected Constants.Routes StoredRoute
        {
            get
            {
                object objValue = ViewState[Constants.FIELD_ROUTE];
                return (objValue != null) ? (Constants.Routes)objValue : Constants.Routes.Undefined;
            }

            set
            {
                this.ViewState[Constants.FIELD_ROUTE] = value;
            }
        }

        /// <summary>
        /// Gets or sets Search engine selected
        /// </summary>
        protected QuickAddress.EngineTypes StoredSearchEngine
        {
            get
            {
                object objValue = ViewState[FIELD_ENGINE];

                return (objValue != null) ? (QuickAddress.EngineTypes)objValue : QuickAddress.EngineTypes.Typedown;
            }

            set
            {
                this.ViewState[FIELD_ENGINE] = value;
            }
        }

        /// <summary>
        /// Gets or sets Step-in warning (i.e. Postcode has been recoded)
        /// </summary>
        protected StepinWarnings StoredWarning
        {
            get
            {
                object objValue = ViewState[FIELD_WARNING];
                return (objValue != null) ? (StepinWarnings)objValue : StepinWarnings.None;
            }

            set
            {
                this.ViewState[FIELD_WARNING] = value;
            }
        }

        /// <summary>
        /// Gets or sets  Pick list history, get
        /// </summary>
        /// <returns>History Stack</returns>
        protected HistoryStack GetStoredHistory()
        {
            object objValue = ViewState[FIELD_HISTORY];
            if (objValue is ArrayList)
            {
                HistoryStack stack = new HistoryStack((ArrayList)objValue);
                return stack;
            }

            return new HistoryStack();
        }

        /// <summary>
        /// field for Set Stored History. Pick list history, set
        /// </summary>
        /// <param name="value">History Stack</param>
        protected void SetStoredHistory(HistoryStack value)
        {
            this.ViewState[FIELD_HISTORY] = value;
        }

        /// <summary>
        /// Gets Access the QuickAddress service, connected to the configured server
        /// Singleton pattern: maintain a single instance, created only on demand
        /// </summary>
        protected QuickAddress theQuickAddress
        {
            get
            {
                if (s_searchService == null)
                {
                    // Retrieve server URL from web.config
                    string sServerURL = System.Configuration.ConfigurationManager.AppSettings[Constants.KEY_SERVER_URL];
                    string sFormatAddressInPicklist = System.Configuration.ConfigurationManager.AppSettings[Constants.KEY_FORMATADDRESSINPICKLIST];
                    bool bFormatAddressInPicklist = Convert.ToBoolean(sFormatAddressInPicklist);

                    // Create QuickAddress search object
                    s_searchService = new QuickAddress(sServerURL);
                    s_searchService.FormattedAddressInPicklist = bFormatAddressInPicklist;
                }

                return s_searchService;
            }
        }

        /** Base methods **/

        /// <summary>
        /// Pick up the preceding page, so we can access it's ViewState (see Stored properties section)
        /// </summary>
        /// <param name="sender">object sender</param>
        /// <param name="e">Event Arguments</param>
        protected virtual void Page_Load(object sender, System.EventArgs e)
        {
            if (!this.IsPostBack && (Context.Handler is RapidBasePage))
            {
                // Retrieve the state of the previous page, so it is available to us
                this.StoredPage = Context.Handler as RapidBasePage;

                this.StoredCallback = this.StoredPage.StoredCallback;
                this.StoredDataID = this.StoredPage.StoredDataID;
                this.StoredSearchEngine = this.StoredPage.StoredSearchEngine;
                this.StoredErrorInfo = this.StoredPage.StoredErrorInfo;
                this.StoredMoniker = this.StoredPage.StoredMoniker;
                this.StoredRoute = this.StoredPage.StoredRoute;
                this.StoredWarning = this.StoredPage.StoredWarning;
                this.StoredDataMapList = this.StoredPage.StoredDataMapList;
                this.StoredSearchString = this.StoredPage.StoredSearchString;
            }
            else
            {
                // Point stored page to us, as we are the previous page
                this.StoredPage = this;
            }

            // Pick up history, passed around in viewstate
            this.m_aHistory = this.StoredPage.GetStoredHistory();
        }

        /// <summary>
        /// Store the history back to the view state prior to rendering
        /// </summary>
        /// <returns>Save View State</returns>
        protected override object SaveViewState()
        {
            this.SetStoredHistory(this.m_aHistory);
            return base.SaveViewState();
        }

        /** Common methods **/

        /// <summary>
        ///  Get the layout from the config file
        /// </summary>
        /// <returns>string Layout</returns>
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
        /// Transfer to the address searching and pick list display page
        /// </summary>
        /// <param name="sDataID">Data ID</param>
        /// <param name="eEngine">Engine Types</param>
        protected void GoSearchPage(string sDataID, QuickAddress.EngineTypes eEngine)
        {
            // Store values back to the view state
            this.StoredPage.StoredDataID = sDataID;
            this.StoredPage.SetStoredHistory(this.m_aHistory);
            this.StoredPage.StoredSearchEngine = eEngine;

            Server.Transfer(PAGE_SEARCH);
        }

        /// <summary>
        ///  Transfer to the address confirmation page to retrieve the found address
        /// </summary>
        /// <param name="sDataID">Data ID</param>
        /// <param name="eEngine">Engine Types</param>
        /// <param name="sMoniker">string Moniker</param>
        /// <param name="eWarn">Step in Warnings</param>
        protected void GoFormatPage(string sDataID, QuickAddress.EngineTypes eEngine, string sMoniker, StepinWarnings eWarn)
        {
            // Store values back to the view state
            this.StoredPage.StoredDataID = sDataID;
            this.StoredPage.StoredMoniker = sMoniker;
            this.StoredPage.SetStoredHistory(this.m_aHistory);
            this.StoredPage.StoredRoute = Constants.Routes.Okay;
            this.StoredPage.StoredSearchEngine = eEngine;
            this.StoredPage.StoredWarning = eWarn;

            Server.Transfer(PAGE_FORMAT);
        }

        /// <summary>
        ///  Transfer to the address confirmation page for manual address entry, after capture failure
        /// </summary>
        /// <param name="route">Constants Routes</param>
        /// <param name="sReason">string Reason</param>
        protected void GoErrorPage(Constants.Routes route, string sReason)
        {
            this.StoredPage.StoredErrorInfo = sReason;
            this.StoredPage.StoredRoute = route;
            Server.Transfer(PAGE_FORMAT);
        }

        /// <summary>
        /// Transfer to the address confirmation page for manual address entry, after exception thrown
        /// </summary>
        /// <param name="x">an exception</param>
        protected void GoErrorPage(Exception x)
        {
            this.StoredPage.StoredErrorInfo = x.Message;
            this.StoredPage.StoredRoute = Constants.Routes.Failed;
            Server.Transfer(PAGE_FORMAT);
        }

        /** Page display **/

        /// <summary>
        /// Write out pick list HTML and associated action array to Java script variables
        /// This is included in two distinct places:
        ///   - main searching page, for whole page updating
        ///   - pick list results frame, for dynamic pick list updating
        /// The pick list picks up and uses the values from the appropriate place
        /// </summary>
        /// <param name="picklist">Pick list</param>
        /// <param name="sDepth">string Depth</param>
        protected void RenderPicklistData(Picklist picklist, string sDepth)
        {
            if (picklist == null)
            {
                // No picklist in this context: write out empty values
                Response.Write("var sPicklistHTML = '';\n");
                Response.Write("var asActions = new Array();");
            }
            else
            {
                // Build sActions into a string, while writing picklistHTML out to Response
                StringBuilder sActions = new StringBuilder();

                //// Build picklist HTML into JavaScript string
                ////   - icon, operation, display text, hover text, postcode, score

                Response.Write("var sPicklistHTML = \"<table class='picklist indent" + sDepth + "'>\\\n");

                for (int i = 0; i < picklist.Length; ++i)
                {
                    PicklistItem item = picklist.Items[i];

                    // Step-in warning
                    StepinWarnings eWarn = StepinWarnings.None;
                    if (item.IsCrossBorderMatch)
                    {
                        eWarn = StepinWarnings.CrossBorder;
                    }
                    else if (item.IsPostcodeRecoded)
                    {
                        eWarn = StepinWarnings.PostcodeRecode;
                    }

                    // Commands: what to do if they click on the item
                    Commands eCmd = Commands.None;
                    if (item.CanStep)
                    {
                        eCmd = Commands.StepIn;
                    }
                    else if (item.IsFullAddress)
                    {
                        eCmd = item.IsInformation ? Commands.ForceFormat : Commands.Format;
                    }
                    else if (item.IsUnresolvableRange)
                    {
                        eCmd = Commands.HaltRange;
                    }
                    else if (item.IsIncompleteAddress)
                    {
                        eCmd = Commands.HaltIncomplete;
                    }

                    // Type: indicates the type of icon to display (used in combination with the operation)
                    Types eType = Types.Standard;
                    if (item.IsInformation)
                    {
                        eType = item.IsWarnInformation ? Types.InfoWarn : Types.Info;
                        eWarn = StepinWarnings.Info;
                    }
                    else if (item.IsDummyPOBox)
                    {
                        eType = Types.POBox;
                    }
                    else if (item.IsName)
                    {
                        eType = item.IsAliasMatch ? Types.NameAlias : Types.Name;
                    }
                    else if (item.IsAliasMatch || item.IsCrossBorderMatch || item.IsPostcodeRecoded)
                    {
                        eType = Types.Alias;
                    }

                    // Start building HTML

                    // Set the class depending on the function & type -> displayed icon
                    string sClass = "stop";
                    if (eCmd == Commands.StepIn)
                    {
                        if (eType == Types.Alias)
                        {
                            sClass = "aliasStep";
                        }
                        else if (eType == Types.Info)
                        {
                            sClass = "infoStep";
                        }
                        else if (eType == Types.POBox)
                        {
                            sClass = "pobox";
                        }
                        else
                        {
                            sClass = "stepIn";
                        }
                    }
                    else if (eCmd == Commands.Format)
                    {
                        if (eType == Types.Alias)
                        {
                            sClass = "alias";
                        }
                        else if (eType == Types.Name)
                        {
                            sClass = "name";
                        }
                        else if (eType == Types.NameAlias)
                        {
                            sClass = "nameAlias";
                        }
                        else
                        {
                            sClass = "format";
                        }
                    }
                    else if ((eCmd == Commands.HaltIncomplete) || (eCmd == Commands.HaltRange))
                    {
                        sClass = "halt";
                    }
                    else if (eType == Types.Info)
                    {
                        sClass = "info";
                    }

                    if (i == 0)
                    {
                        sClass += " first";
                    }

                    // Hyperlink
                    string sAnchorStart = string.Empty, sAnchorEnd = string.Empty;
                    if (eCmd != Commands.None)
                    {
                        sAnchorStart = "<a href='javascript:action(" + i.ToString() + ");' "
                            + "tabindex='" + (i + 1) + "' "
                            + "title=\\\"" + this.JavascriptEncode(item.PartialAddress) + "\\\">";
                        sAnchorEnd = "</a>";
                    }

                    string sScore = (item.Score > 0) ? item.Score + "%" : " ";

                    //// Write out HTML

                    Response.Write("<tr>");
                    Response.Write("<td class='pickitem " + sClass + "'>" + sAnchorStart + "<div>");
                    Response.Write(this.JavascriptEncode(Server.HtmlEncode(item.Text)) + "</div>" + sAnchorEnd + "</td>");
                    Response.Write("<td class='postcode'>" + this.JavascriptEncode(Server.HtmlEncode(item.Postcode)) + "</td>");
                    Response.Write("<td class='score'>" + sScore + "</td>");
                    Response.Write("</tr>\\\n");

                    //// Picklist actions - javascript array variable

                    sActions.Append("'" + (eCmd != Commands.None ? eCmd.ToString() : " "));
                    switch (eCmd)
                    {
                        case Commands.StepIn:
                            sActions.Append("(\"" + item.Moniker + "\",\"" + this.JavascriptEncode(Server.HtmlEncode(item.Text)) + "\",");
                            sActions.Append("\"" + item.Postcode + "\",\"" + item.ScoreAsString + "\",\"" + eWarn.ToString() + "\")");
                            break;
                        case Commands.Format:
                            sActions.Append("(\"" + item.Moniker + "\",\"" + eWarn.ToString() + "\")");
                            break;
                        case Commands.ForceFormat:
                            sActions.Append("(\"" + item.Moniker + "\")");
                            break;
                        case Commands.HaltIncomplete:
                        case Commands.HaltRange:
                            sActions.Append("()");
                            break;
                    }

                    sActions.Append("',");
                }

                // Close off picklist HTML
                Response.Write("</table>\";\n");

                //// Write out Actions

                Response.Write("var asActions = new Array(");
                Response.Write(sActions.ToString());
                Response.Write("'');\n");
            }
        }

        /// <summary>
        /// Method override: Use pick list history in order to work out indent depth
        /// </summary>
        /// <param name="picklist">pick list</param>
        protected void RenderPicklistData(Picklist picklist)
        {
            this.RenderPicklistData(picklist, this.m_aHistory.Count.ToString());
        }

        /// <summary>
        /// Encode the string so it's value is correct when used as a Java script string
        /// i.e. Jack's "friendly" dog  ->  Jack\'s \"friendly\" dog
        /// </summary>
        /// <param name="str">Plain text string to encode</param>
        /// <returns>String with special characters escaped</returns>
        protected string JavascriptEncode(string str)
        {
            return str.Replace("\\", "\\\\").Replace("'", "\\'").Replace("\"", "\\\"");
        }

        /** Support classes: Picklist history **/

        /// <summary>
        /// Helper class: stack of all the search pick lists we've stepped through
        /// Implemented using an ArrayList so we can enumerate forwards through them for display,
        /// the 'bottom' of the stack is element 0, the 'top' is element Count - 1, where items are pushed and popped
        /// </summary>
        [Serializable]
        protected class HistoryStack : ArrayList
        {
            /// <summary>
            ///  Initializes a new instance of the <see cref="HistoryStack"/> class.Default constructor
            /// </summary>
            public HistoryStack()
            {
            }

            /// <summary>
            ///  Initializes a new instance of the <see cref="HistoryStack"/> class.Construct from an ArrayList
            /// </summary>
            /// <param name="vValue">Array List</param>
            public HistoryStack(ArrayList vValue)
            {
                foreach (object obj in vValue)
                {
                    base.Add((HistoryItem)obj);
                }
            }

            /// <summary>
            /// Inserts an object at the top of the stack: prevents duplicates
            /// </summary>
            /// <param name="item">History Item</param>
            public void Add(HistoryItem item)
            {
                if (this.Count == 0 || !this.Peek().Moniker.Equals(item.Moniker))
                {
                    base.Add(item);
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
            ///  Inserts an object at the top of the stack
            /// </summary>
            /// <param name="sMoniker">string Moniker</param>
            /// <param name="sText">string Text</param>
            /// <param name="sPostcode">string Postcode</param>
            /// <param name="sScore">string Score</param>
            /// <param name="sRefine">string Refine</param>
            public void Push(string sMoniker, string sText, string sPostcode, string sScore, string sRefine)
            {
                HistoryItem item = new HistoryItem(sMoniker, sText, sPostcode, sScore, sRefine);
                this.Add(item);
            }

            /// <summary>
            ///  Inserts an object at the top of the stack
            /// </summary>
            /// <param name="item">Pick list Item</param>
            public void Push(PicklistItem item)
            {
                this.Push(item.Moniker, item.Text, item.Postcode, item.ScoreAsString, string.Empty);
            }

            /// <summary>
            ///  Truncate the stack down to a certain size
            /// </summary>
            /// <param name="iCount">integer Count</param>
            public void Truncate(int iCount)
            {
                if (this.Count > iCount)
                {
                    this.RemoveRange(iCount, this.Count - iCount);
                }
            }

            /// <summary>
            ///  Gets or sets the element at the specified index
            /// </summary>
            /// <param name="iIndex">integer Index</param>
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

        }

        /// <summary>
        /// Helper class: stores details of search pick lists visited
        /// </summary>
        [Serializable]
        protected class HistoryItem
        {
            /// <summary>
            /// string Moniker
            /// </summary>
            public string Moniker = string.Empty;

            /// <summary>
            /// string Text
            /// </summary>
            public string Text = string.Empty;

            /// <summary>
            /// string Postcode 
            /// </summary>
            public string Postcode = string.Empty;

            /// <summary>
            /// string Score 
            /// </summary>
            public string Score = string.Empty;

            /// <summary>
            /// string Refine
            /// </summary>
            public string Refine = string.Empty;

            /// <summary>
            /// Initializes a new instance of the <see cref="HistoryItem"/> class.
            /// </summary>
            /// <param name="sMonikerIn">string Moniker</param>
            /// <param name="sTextIn">string Text</param>
            /// <param name="sPostcodeIn">string Postcode</param>
            /// <param name="sScoreIn">string Score</param>
            /// <param name="sRefineIn">string Refine</param>
            public HistoryItem(string sMonikerIn, string sTextIn, string sPostcodeIn, string sScoreIn, string sRefineIn)
            {
                this.Moniker = sMonikerIn;
                this.Text = sTextIn;
                this.Postcode = sPostcodeIn;
                this.Score = sScoreIn;
                this.Refine = sRefineIn;
            }
        }
    }
}

//-----------------------------------------------------------------------
// <copyright file="KeyBasePage.cs" company="External">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp
 * Class Name       : KeyBasePage.cs
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

/// QuickAddress Pro Web integration code
/// (C) QAS Ltd, www.qas.com
namespace com.qas.prowebintegration
{
    using System;
    using System.Web;
    using com.qas.proweb;                  // QuickAddress services

    /// <summary>
    /// Scenario "Key Search" - flattened pick lists
    /// This is the base class for the pages of the scenario
    /// It provides common functionality and facilitates inter-page value passing through hidden fields
    /// </summary>
    public class KeyBasePage : System.Web.UI.Page
    {
        // Page filenames

        /// <summary>
        /// constant field for page begin 
        /// </summary>
        protected const string PAGE_BEGIN = "KeyCountry.aspx";

        /// <summary>
        /// constant field for page INPUT
        /// </summary>
        protected const string PAGE_INPUT = "KeyPrompt.aspx";

        /// <summary>
        /// constant field for page SEARCH 
        /// </summary>
        protected const string PAGE_SEARCH = "KeySearch.aspx";

        /// <summary>
        /// constant field for page FORMAT
        /// </summary>
        protected const string PAGE_FORMAT = "KeyAddress.aspx";

        /// <summary>
        /// Field names specific to the Key finder scenario
        /// Which prompt set is selected - set on PAGE_INPUT, also used by PAGE_SEARCH
        /// </summary>
        protected const string FIELD_PROMPTSET = "PromptSet";

        /// <summary>
        ///  Used to recreate the pick list - set and used by PAGE_SEARCH
        /// </summary>
        protected const string FIELD_PICKLIST_MONIKER = "PicklistMoniker";

        /// <summary>
        ///  The pick list item requiring refinement - set on PAGE_SEARCH, used by PAGE_REFINE
        /// </summary>
        protected const string FIELD_REFINE_MONIKER = "RefineMoniker";

        /// <summary>
        /// Initializes a new instance of the <see cref="KeyBasePage"/> class.No construction necessary, provides shared functionality
        /// </summary>
        public KeyBasePage()
        {
        }

        /** Helper functions **/

        /// <summary>
        ///  Create a new QAS service, connected to the configured server
        /// </summary>
        /// <returns>Quick Address</returns>
        protected QuickAddress NewQuickAddress()
        {
            //// Retrieve server URL from web.config
            string sServerURL = System.Configuration.ConfigurationManager.AppSettings[Constants.KEY_SERVER_URL];
            //// Create QuickAddress search object
            return new QuickAddress(sServerURL);
        }

        /// <summary>
        ///  Transfer to the initial page, to select the country
        /// </summary>
        protected void GoFirstPage()
        {
            Server.Transfer(PAGE_BEGIN);
        }

        /// <summary>
        ///  Transfer to the input page, which prompts for address terms
        /// </summary>
        protected void GoInputPage()
        {
            Server.Transfer(PAGE_INPUT);
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
        protected void GoFormatPage(string sMoniker)
        {
            if (sMoniker != null)
            {
                this.SetMoniker(sMoniker);
            }

            this.SetRoute(Constants.Routes.Okay);
            Server.Transfer(PAGE_FORMAT);
        }

        /// <summary>
        ///  Transfer to the address confirmation page for manual address entry, after capture failed
        /// </summary>
        /// <param name="route">a route</param>
        protected void GoErrorPage(Constants.Routes route)
        {
            this.SetRoute(route);
            Server.Transfer(PAGE_FORMAT);
        }

        /// <summary>
        ///  Transfer to the address confirmation page for manual address entry - include reason for failure
        /// </summary>
        /// <param name="route">constant route</param>
        /// <param name="sMessage">string Message</param>
        protected void GoErrorPage(Constants.Routes route, string sMessage)
        {
            this.SetRoute(route);
            this.SetErrorInfo(sMessage);
            Server.Transfer(PAGE_FORMAT);
        }

        /// <summary>
        ///  Transfer to the address confirmation page for manual address entry, after exception thrown
        /// </summary>
        /// <param name="x">an Exception</param>
        protected void GoErrorPage(Exception x)
        {
            this.SetRoute(Constants.Routes.Failed);
            this.SetErrorInfo(x.Message);
            Server.Transfer(PAGE_FORMAT);
        }

        /// <summary>
        ///  Transfer out of the scenario to the final (summary) page
        /// </summary>
        protected void GoFinalPage()
        {
            Server.Transfer(Constants.PAGE_FINAL_ADDRESS);
        }

        /* Common field rendering routines */

        /// <summary>
        ///  Propagate a value through, from the Request into a hidden field on our page
        /// </summary>
        /// <param name="sKey">string Key</param>
        protected void RenderRequestString(string sKey)
        {
            string sValue = Request[sKey];
            this.RenderHiddenField(sKey, sValue);
        }

        /// <summary>
        ///  Propagate values through, from the Request to hidden fields on our page
        /// </summary>
        /// <param name="sKey">string Key</param>
        protected void RenderRequestArray(string sKey)
        {
            string[] asValues = Request.Params.GetValues(sKey);
            if (asValues != null)
            {
                foreach (string sValue in asValues)
                {
                    this.RenderHiddenField(sKey, sValue);
                }
                //// Add dummy entry to 1-sized arrays to allow array subscripting in JavaScript
                if (asValues.Length == 1)
                {
                    this.RenderHiddenField(sKey, null);
                }
            }
        }

        /// <summary>
        ///  Render a hidden field directly into the page
        /// </summary>
        /// <param name="sKey">string Key</param>
        /// <param name="sValue">string Value</param>
        protected void RenderHiddenField(string sKey, string sValue)
        {
            Response.Write("<input type=\"hidden\" name=\"");
            Response.Write(sKey);
            if (sValue != null)
            {
                Response.Write("\" value=\"");
                Response.Write(HttpUtility.HtmlEncode(sValue));
            }

            Response.Write("\" />\n");
        }

        /// <summary>
        ///  Render a boolean hidden field directly into the page
        /// </summary>
        /// <param name="sKey">string Key</param>
        /// <param name="bValue">boolean value</param>
        protected void RenderHiddenField(string sKey, bool bValue)
        {
            Response.Write("<input type=\"hidden\" name=\"");
            Response.Write(sKey);
            //// Only write a value if it is True
            if (bValue)
            {
                Response.Write("\" value=\"");
                Response.Write(true.ToString());
            }

            Response.Write("\" />\n");
        }

        /** Stored parameters **/

        /// <summary>
        ///  Country data identifier (i.e. AUS)
        /// </summary>
        /// <returns>a request</returns>
        protected string GetDataID()
        {
            return this.Request[Constants.FIELD_DATA_ID];
        }

        /// <summary>
        ///  Country display name (i.e. Australia)
        /// </summary>
        /// <returns>a request</returns>
        protected string GetCountryName()
        {
            return this.Request[Constants.FIELD_COUNTRY_NAME];
        }

        /// <summary>
        /// Method for layout
        /// </summary>
        /// <returns>string layout</returns>
        protected string GetLayout()
        {
            string sLayout;
            string sDataID = this.GetDataID();

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
        ///  Prompt set selected
        /// </summary>
        /// <returns>string sValue</returns>
        protected PromptSet.Types GetPromptSet()
        {
            string sValue = Request[FIELD_PROMPTSET];
            return (sValue != null)
                ? (PromptSet.Types)Enum.Parse(typeof(PromptSet.Types), sValue)
                : PromptSet.Types.Optimal;
        }

        /// <summary>
        /// Method to set prompt set
        /// </summary>
        /// <param name="ePromptSet">prompt set</param>
        protected void SetPromptSet(PromptSet.Types ePromptSet)
        {
            Request.Cookies.Set(new HttpCookie(FIELD_PROMPTSET, ePromptSet.ToString()));
        }

        /// <summary>
        ///  Initial user search (i.e. "14 main street", "boston")
        /// </summary>
        /// <returns>string Value</returns>
        protected string[] GetInputLines()
        {
            string[] asValues = Request.Params.GetValues(Constants.FIELD_INPUT_LINES);
            return (asValues != null)
                ? asValues
                : new string[0];
        }

        /// <summary>
        ///  Current search state, how we arrived on the address format page (i.e. too many matches)
        /// </summary>
        /// <returns>string Value</returns>
        protected Constants.Routes GetRoute()
        {
            string sValue = Request[Constants.FIELD_ROUTE];
            return (sValue != null)
                ? (Constants.Routes)Enum.Parse(typeof(Constants.Routes), sValue)
                : Constants.Routes.Undefined;
        }

        /// <summary>
        ///  Error information returned through the exception
        /// </summary>
        /// <returns>a request</returns>
        protected string GetErrorInfo()
        {
            return this.Request[Constants.FIELD_ERROR_INFO];
        }

        /// <summary>
        /// Method to set error info
        /// </summary>
        /// <param name="sErrorInfo">error info</param>
        protected void SetErrorInfo(string sErrorInfo)
        {
            Request.Cookies.Set(new HttpCookie(Constants.FIELD_ERROR_INFO, sErrorInfo));
        }

        /// <summary>
        ///  Moniker of the final address
        /// </summary>
        /// <returns>a request</returns>
        protected string GetMoniker()
        {
            return this.Request[Constants.FIELD_MONIKER];
        }

        /// <summary>
        ///  Moniker of the initial flattened pick list
        /// </summary>
        /// <returns>a request</returns>
        protected string GetPicklistMoniker()
        {
            return this.Request[FIELD_PICKLIST_MONIKER];
        }

        /// <summary>
        /// Method to set pick list moniker
        /// </summary>
        /// <param name="sMoniker">string moniker</param>
        protected void SetPicklistMoniker(string sMoniker)
        {
            Request.Cookies.Set(new HttpCookie(FIELD_PICKLIST_MONIKER, sMoniker));
        }

        /// <summary>
        /// Method to Set Route
        /// </summary>
        /// <param name="eRoute">constant route</param>
        private void SetRoute(Constants.Routes eRoute)
        {
            Request.Cookies.Set(new HttpCookie(Constants.FIELD_ROUTE, eRoute.ToString()));
        }

        /// <summary>
        /// Method to set moniker
        /// </summary>
        /// <param name="sMoniker">string Moniker</param>
        private void SetMoniker(string sMoniker)
        {
            Request.Cookies.Set(new HttpCookie(Constants.FIELD_MONIKER, sMoniker));
        }
    }
}

//-----------------------------------------------------------------------
// <copyright file="BulkBase.cs" company="External">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp
 * Class Name       : BulkBase.cs
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

/// QAS Pro Web > (c) QAS Ltd > www.qas.com
/// Web > Bulk Verification > BulkBase
/// Provide common functionality and value transfer
namespace com.qas.prowebintegration
{
    using System;
    using System.Web;
    using com.qas.proweb;         // QuickAddress services

    /// <summary>
    /// Web > Bulk Verification > BulkBase
    /// This is the base class for the pages of the scenario
    /// It provides common functionality and simple inter-page value passing
    /// </summary>
    public class BulkBase : System.Web.UI.Page
    {
        /** Attributes & Constants **/

        /// <summary>
        /// field for search Service
        /// </summary>
        private QuickAddress m_searchService = null;

        // Page filenames

        /** Methods **/

        /// <summary>
        /// Gets a  value to Create a new QuickAddress service, connected to the configured server
        /// </summary>
        protected QuickAddress theQuickAddress
        {
            get
            {
                if (this.m_searchService == null)
                {
                    //// Retrieve server URL from web.config
                    string sServerURL = System.Configuration.ConfigurationSettings.AppSettings[Constants.KEY_SERVER_URL];
                    //// Create QuickAddress search object
                    this.m_searchService = new QuickAddress(sServerURL);
                }

                return this.m_searchService;
            }
        }

        /// <summary>
        ///  Gets the layout from the config
        /// </summary>
        /// <returns>as Layout</returns>
        protected string GetLayout()
        {
            string sLayout = string.Empty;
            string sDataID = Request[Constants.FIELD_DATA_ID];

            if (sDataID != null && sDataID != string.Empty)
            {
                // Look for a layout specific to this datamap
                sLayout = System.Configuration.ConfigurationManager.AppSettings[Constants.KEY_LAYOUT + "." + sDataID];

                if (sLayout == null || sLayout == string.Empty)
                {
                    // No layout found specific to this datamap - try the default
                    sLayout = System.Configuration.ConfigurationManager.AppSettings[Constants.KEY_LAYOUT];
                }
            }

            return sLayout;
        }

        /// <summary>
        ///  Error information returned through the exception
        /// </summary>
        /// <returns>a Request</returns>
        protected string GetErrorInfo()
        {
            return this.Request[Constants.FIELD_ERROR_INFO];
        }

        /// <summary>
        /// Method to set error info
        /// </summary>
        /// <param name="sErrorInfo">Error Info</param>
        protected void SetErrorInfo(string sErrorInfo)
        {
            Request.Cookies.Set(new HttpCookie(Constants.FIELD_ERROR_INFO, sErrorInfo));
        }

        /// <summary>
        /// Current search state, how we arrived on the address format page (i.e. too many matches)
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
        /// Method to Set Route
        /// </summary>
        /// <param name="eRoute">Set Route</param>
        protected void SetRoute(Constants.Routes eRoute)
        {
            Request.Cookies.Set(new HttpCookie(Constants.FIELD_ROUTE, eRoute.ToString()));
        }
    }
}

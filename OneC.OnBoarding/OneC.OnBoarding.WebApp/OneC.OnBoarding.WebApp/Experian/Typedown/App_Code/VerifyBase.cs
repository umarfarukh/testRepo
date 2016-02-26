//-----------------------------------------------------------------------
// <copyright file="VerifyBase.cs" company="External">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp
 * Class Name       : VerifyBase.cs
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
/// Web > Verification > VerifyBase
/// Provide common functionality and value transfer
namespace com.qas.prowebintegration
{
    using System;
    using System.Web;
    using com.qas.proweb;                    // QuickAddress services

    /// <summary>
    /// Web > Verification > VerifyBase
    /// This is the base class for the pages of the scenario
    /// It provides common functionality and simple inter-page value passing
    /// </summary>
    public class VerifyBase : System.Web.UI.Page
    {
        /** Attributes & Constants **/

        // Page filenames

        /// <summary>
        /// field for 
        /// </summary>
        private const string PAGE_REFINE = "VerifyRefine.aspx";

        /// <summary>
        /// field for 
        /// </summary>
        private QuickAddress m_searchService = null;

        /// <summary>
        /// field for 
        /// </summary>
        private string[] m_asInputAddress;

        /** Stored properties **/

        /// <summary>
        /// Gets a value for input address
        ///  Entered address to check
        /// </summary>
        protected string[] GetInputAddress
        {
            get
            {
                if (this.m_asInputAddress == null)
                {
                    this.m_asInputAddress = Request.Form.GetValues(Constants.FIELD_INPUT_LINES);
                }

                return this.m_asInputAddress;
            }
        }

        /** Methods **/

        /// <summary>
        /// Gets a value for search Service
        ///  Create a new QAS service, connected to the configured server
        /// </summary>
        protected QuickAddress theQuickAddress
        {
            get
            {
                if (this.m_searchService == null)
                {
                    // Retrieve server URL from web.config
                    string sServerURL = System.Configuration.ConfigurationSettings.AppSettings[Constants.KEY_SERVER_URL];
                    string sFormatAddressInPicklist = System.Configuration.ConfigurationManager.AppSettings[Constants.KEY_FORMATADDRESSINPICKLIST];
                    bool bFormatAddressInPicklist = Convert.ToBoolean(sFormatAddressInPicklist);

                    // Create QAS search object
                    this.m_searchService = new QuickAddress(sServerURL);
                    this.m_searchService.FormattedAddressInPicklist = bFormatAddressInPicklist;
                }

                return this.m_searchService;
            }
        }

        /// <summary>
        ///  Get the layout from the config
        /// </summary>
        /// <returns>string Layout</returns>
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
        ///  Transfer out of the scenario to display the formatted address
        /// </summary>
        /// <param name="sMoniker">string Moniker</param>
        protected void GoFinalPage(string sMoniker)
        {
            this.FormatAddress(sMoniker);
            Server.Transfer(Constants.PAGE_FINAL_ADDRESS);
        }

        /// <summary>
        ///  Transfer out of the scenario to the original input screen
        /// </summary>
        protected void GoInputPage()
        {
            Server.Transfer(Constants.PAGE_VERIFY_INPUT);
        }
            
        /// <summary>
        ///  Transfer out of the scenario to display the found address
        /// </summary>
        protected void GoFinalPage()
        {
            Server.Transfer(Constants.PAGE_FINAL_ADDRESS);
        }

        /// <summary>
        ///  Transfer out of the scenario to display the input address, after exception thrown
        /// </summary>
        /// <param name="x">an Exception</param>
        protected void GoErrorPage(Exception x)
        {
            // Copy input lines through to output
            this.SetAddressResult(this.GetInputAddress);
            this.SetAddressInfo("address verification " + Constants.Routes.Failed + ", so the entered address has been used");
            this.SetErrorInfo(x.Message);
            Server.Transfer(Constants.PAGE_FINAL_ADDRESS);
        }

        /// <summary>
        ///  Transfer out of the scenario to display the input address, after verification failed
        /// </summary>
        /// <param name="route">constant route </param>
        /// <param name="sReason">string Reason</param>
        protected void GoErrorPage(Constants.Routes route, string sReason)
        {
            // Copy input lines through to output
            this.SetAddressResult(this.GetInputAddress);
            this.SetAddressInfo("address verification " + route + ", so the entered address has been used");
            this.SetErrorInfo(sReason);
            Server.Transfer(Constants.PAGE_FINAL_ADDRESS);
        }

        /// <summary>
        /// Retrieve a final formatted address from the moniker, which came from the pick list
        /// </summary>
        /// <param name="sMoniker">Search Point Moniker of address to retrieve</param>
        protected void FormatAddress(string sMoniker)
        {
            try
            {
                // Format the address
                FormattedAddress tAddressResult = this.theQuickAddress.GetFormattedAddress(sMoniker, this.GetLayout());
                this.SetAddressResult(tAddressResult);
            }
            catch (Exception x)
            {
                this.SetAddressResult(this.GetInputAddress);
                this.SetAddressInfo("address verification is not available, so the entered address has been used");
                this.SetErrorInfo(x.Message);
            }
        }

        /** Stored properties **/

        /// <summary>
        ///  Write out the address result - into the Request as cookies (server side only)
        /// </summary>
        /// <param name="tAddressResult">Formatted Address</param>
        protected void SetAddressResult(FormattedAddress tAddressResult)
        {
            Request.Cookies.Remove(Constants.FIELD_ADDRESS_LINES);
            foreach (AddressLine tLine in tAddressResult.AddressLines)
            {
                Request.Cookies.Add(new HttpCookie(Constants.FIELD_ADDRESS_LINES, tLine.Line));
            }

            this.AddAddressWarnings(tAddressResult);
        }

        /// <summary>
        ///  Write out the address result - into the Request as cookies (server side only)
        /// </summary>
        /// <param name="asAddress">Set Address Result</param>
        protected void SetAddressResult(string[] asAddress)
        {
            Request.Cookies.Remove(Constants.FIELD_ADDRESS_LINES);
            foreach (string sLine in asAddress)
            {
                Request.Cookies.Add(new HttpCookie(Constants.FIELD_ADDRESS_LINES, sLine));
            }
        }

        /// <summary>
        ///  Country display name (i.e. Australia)
        /// </summary>
        /// <returns>country name</returns>
        protected string GetCountry()
        {
            return this.Request[Constants.FIELD_COUNTRY_NAME];
        }

        /// <summary>
        ///  Country display name (i.e. Australia)
        /// </summary>
        /// <param name="sCountry">country name</param>
        protected void SetCountry(string sCountry)
        {
            Request.Cookies.Set(new HttpCookie(Constants.FIELD_COUNTRY_NAME, sCountry));
        }

        /// <summary>
        ///  Error information returned through the exception
        /// </summary>
        /// <param name="sErrorInfo">Error Info</param>
        protected void SetErrorInfo(string sErrorInfo)
        {
            Request.Cookies.Set(new HttpCookie(Constants.FIELD_ERROR_INFO, sErrorInfo));
        }

        /// <summary>
        ///  Moniker of the final address
        /// </summary>
        /// <returns>constant field moniker</returns>
        protected string GetMoniker()
        {
            return this.Request[Constants.FIELD_MONIKER];
        }

        /// <summary>
        ///  Get the state of the verification searching
        /// </summary>
        /// <returns>ADDRESS INFO]</returns>
        protected string GetAddressInfo()
        {
            return this.Request[Constants.FIELD_ADDRESS_INFO];
        }

        /// <summary>
        ///  Get the address information, HTML transformed
        /// </summary>
        /// <returns>Address Info HTML</returns>
        protected string GetAddressInfoHTML()
        {
            return this.GetAddressInfo().Replace("\n", "<br />");
        }

        /// <summary>
        ///  Set the state of the verification searching
        /// </summary>
        /// <param name="sAddressInfo">Address Info</param>
        protected void SetAddressInfo(string sAddressInfo)
        {
            Request.Cookies.Set(new HttpCookie(Constants.FIELD_ADDRESS_INFO, sAddressInfo));
        }

        /// <summary>
        ///  Add formatted address warnings to the address info
        /// </summary>
        /// <param name="tAddressResult">Address Result</param>
        protected void AddAddressWarnings(FormattedAddress tAddressResult)
        {
            if (tAddressResult.IsOverflow)
            {
                this.SetAddressInfo(this.GetAddressInfo() + "\nWarning: Address has overflowed the layout &#8211; elements lost");
            }

            if (tAddressResult.IsTruncated)
            {
                this.SetAddressInfo(this.GetAddressInfo() + "\nWarning: Address elements have been truncated");
            }

            if (tAddressResult.IsMissingSubPrem)
            {
                this.SetAddressInfo(this.GetAddressInfo() + "\nWarning: This address may be missing sub-building information");
            }
        }
    }
}

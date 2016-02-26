//-----------------------------------------------------------------------
// <copyright file="QuickAddress.cs" company="External">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp
 * Class Name       : QuickAddress.cs
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
/// Common Classes > QuickAddress.cs
/// Main searching functionality
namespace com.qas.proweb
{
    using System;
    using System.Configuration;            // ConfigurationSettings.AppSettings
    using System.Text;                     // StringBuilder
    using com.qas.proweb.soap;             // QuickAddress Pro Web wrapped SOAP-layer

    /// <summary>
    /// This class is a facade into Pro Web and provides the main functionality of the package.
    /// It uses the com.QuickAddress.pro web.soap package in a stateless manner, but some optional settings
    /// are maintained between construction and the main "business" call to the soap package.
    /// An instance of this class is not intended to be preserved across different pages.
    /// The intended usage idiom is:
    ///   construct instance - set optional settings - call main method (e.g. search) - discard instance
    /// </summary>
    public class QuickAddress
    {
        /// <summary>
        /// Line separator - determined by a configuration setting on the server
        /// </summary>
        private const char cLINE_SEPARATOR = '|';

        // -- Private Members --

        /// <summary>
        /// QuickAddress Pro Web search service
        /// </summary>
        private ProWeb m_Service = null;

        /// <summary>
        /// Engine searching configuration settings (optional to override server defaults)
        /// </summary>
        private EngineType m_Engine = null;

        /// <summary>
        /// Configuration file settings (optional to override defaults)
        /// </summary>
        private QAConfigType m_Config = null;

        /// <summary>
        /// Formatted Addresses to be returned in the pick list
        /// </summary>
        private bool m_bFormattedAddressInPicklist = false;

        // -- Public Construction --

        /// <summary>
        /// Initializes a new instance of the <see cref="QuickAddress"/> class.Constructs the search service, using the URL of the QuickAddress Server
        /// </summary>
        /// <param name="sEndpointURL">The URL of the QuickAddress SOAP service, e.g. http://local host:2021/</param>
        public QuickAddress(string sEndpointURL)
        {
            this.m_Service = new ProWeb();
            this.m_Service.Url = sEndpointURL;
            this.m_Engine = new EngineType();
            this.m_Config = new QAConfigType();
        }

        // -- Public Constants --

        /// <summary>
        /// Enumeration of engine types
        /// </summary>
        public enum EngineTypes
        {
            /// <summary>
            /// field for Single line
            /// </summary>
            Singleline = EngineEnumType.Singleline,

            /// <summary>
            /// field for Type down
            /// </summary>
            Typedown = EngineEnumType.Typedown,

            /// <summary>
            /// field for Verification
            /// </summary>
            Verification = EngineEnumType.Verification,

            /// <summary>
            /// field for Key finder
            /// </summary>
            Keyfinder = EngineEnumType.Keyfinder
        }

        /// <summary>
        /// Enumeration of engine searching intensity levels
        /// </summary>
        public enum SearchingIntesityLevels
        {
            /// <summary>
            /// field for Exact
            /// </summary>
            Exact = EngineIntensityType.Exact,

            /// <summary>
            /// field for Close
            /// </summary>
            Close = EngineIntensityType.Close,

            /// <summary>
            /// field for Extensive
            /// </summary>
            Extensive = EngineIntensityType.Extensive
        }

        // -- Public Properties --

        /// <summary>
        /// Gets or sets the current engine; if left unset, the search will use the default, SingleLine
        /// </summary>
        public EngineTypes Engine
        {
            get
            {
                return (EngineTypes)this.m_Engine.Value;
            }

            set
            {
                this.m_Engine.Value = (EngineEnumType)value;
            }
        }

        /// <summary>
        /// Sets the engine intensity; if left unset, the search will use the server default value
        /// </summary>
        public SearchingIntesityLevels SearchingIntesity
        {
            set
            {
                this.m_Engine.Intensity = (EngineIntensityType)value;
                this.m_Engine.IntensitySpecified = true;
            }
        }

        /// <summary>
        /// Sets the pick list threshold - the maximum number of entries in a pick list,
        /// returned by step-in and refinement; ignored by the initial search
        /// If left unset, the server default will be used
        /// </summary>
        public int Threshold
        {
            set
            {
                this.m_Engine.Threshold = System.Convert.ToString(value);
            }
        }

        /// <summary>
        /// Sets the timeout period (milliseconds); if left unset, the server default will be used
        /// </summary>
        public int Timeout
        {
            set
            {
                this.m_Engine.Timeout = System.Convert.ToString(value);
            }
        }

        /// <summary>
        /// Sets a value indicating whether operations produce a flattened or hierarchical pick list;
        /// If left unset, the default value of false (hierarchical) will be used
        /// </summary>
        public bool Flatten
        {
            set
            {
                this.m_Engine.Flatten = value;
                this.m_Engine.FlattenSpecified = true;
            }
        }

        /// <summary>
        /// Sets a value indicating whether for Formatted Address In Pick list
        /// </summary>
        public bool FormattedAddressInPicklist
        {
            set
            {
                this.m_bFormattedAddressInPicklist = value;
            }
        }

        /// <summary>
        /// Sets the config file to read settings from; if left unset, the default "variable" file will be used
        /// </summary>
        public string ConfigFile
        {
            set
            {
                this.m_Config.IniFile = value;   ////variable=qawserve.ini
            }
        }

        /// <summary>
        /// Sets the config section to read settings from; if left unset, the default "[QADefault]" section will be used
        /// </summary>
        public string ConfigSection
        {
            set
            {
                this.m_Config.IniSection = value;
            }
        }

        // -- Private Methods - Helpers --

        /// <summary>
        /// Gets (Return) the QuickAddress Pro Web SOAP service
        /// </summary>
        private ProWeb SearchService
        {
            get
            {
                return this.m_Service;
            }
        }

        // -- Public Methods - Searching Operations --

        /// <summary>
        /// Test whether a search can be performed using a data set/layout/engine combination
        /// </summary>
        /// <param name="sDataID">Three-letter data identifier</param>
        /// <param name="sLayout">Name of the layout; optional</param>
        /// <returns>Is the country and layout combination available</returns>
        /// <throws>SoapException</throws>
        public CanSearch CanSearch(string sDataID, string sLayout)
        {
            QACanSearch param = new QACanSearch();
            param.Country = sDataID;
            param.Engine = this.m_Engine;
            param.Layout = sLayout;
            param.QAConfig = this.m_Config;

            CanSearch tResult = null;
            try
            {
                // Make the call to the server
                QASearchOk cansearchResult = this.SearchService.DoCanSearch(param);

                tResult = new CanSearch(cansearchResult);
            }
            catch (Exception x)
            {
                this.MapException(x);
            }

            return tResult;
        }

        /// <summary>
        /// Method overload: provides the CanSearch function without the optional sLayout argument
        /// </summary>
        /// <param name="sDataID">Data ID</param>
        /// <returns>Can Search</returns>
        public CanSearch CanSearch(string sDataID)
        {
            return this.CanSearch(sDataID, null);
        }

        /// <summary>
        /// Perform an initial search for the search terms in the specified data set
        /// If using the verification engine, the result may include a formatted address and/or a pick list
        /// Other engines only produce a pick list
        /// </summary>
        /// <param name="sDataID">Three-letter identifier of the data to search</param>
        /// <param name="asSearch">Array of search terms</param>
        /// <param name="tPromptSet">Name of the search prompt set applied to the search terms</param>
        /// <param name="sLayout">Name of the layout (verification engine only); optional</param>
        /// <returns>Search result, containing a pick list and/or formatted address</returns>
        /// <throws>SoapException</throws>
        public SearchResult Search(string sDataID, string[] asSearch, PromptSet.Types tPromptSet, string sLayout)
        {
            System.Diagnostics.Debug.Assert(asSearch != null && asSearch.GetLength(0) > 0);

            // Concatenate search terms
            StringBuilder sSearch = new StringBuilder(asSearch[0]);
            for (int i = 1; i < asSearch.GetLength(0); i++)
            {
                sSearch.Append(cLINE_SEPARATOR);
                sSearch.Append(asSearch[i]);
            }

            return this.Search(sDataID, sSearch.ToString(), tPromptSet, sLayout);
        }

        /// <summary>
        /// Method overload: provides the Search function without the optional Layout argument
        /// </summary>
        /// <param name="sDataID">Three-letter identifier of the data to search</param>
        /// <param name="asSearch">Array of search terms</param>
        /// <param name="tPromptSet">Name of the search prompt set applied to the search terms</param>
        /// <returns>Search result, containing a pick list and/or formatted address</returns>
        public SearchResult Search(string sDataID, string[] asSearch, PromptSet.Types tPromptSet)
        {
            return this.Search(sDataID, asSearch, tPromptSet, null);     //// <throws>SoapException</throws>
        }

        /// <summary>
        /// Method overload: the Search function with search terms as a single string
        /// </summary>
        /// <param name="sDataID">Three-letter identifier of the data to search</param>
        /// <param name="sSearch">Search terms</param>
        /// <param name="tPromptSet">Name of the search prompt set applied to the search terms</param>
        /// <param name="sLayout">Name of the layout (verification engine only); optional</param>
        /// <returns>Search result, containing a pick list and/or formatted address</returns>
        public SearchResult Search(string sDataID, string sSearch, PromptSet.Types tPromptSet, string sLayout)
        {
            System.Diagnostics.Debug.Assert(sDataID != null);       //// <throws>SoapException</throws>
            System.Diagnostics.Debug.Assert(sSearch != null);

            // Set up the parameter for the SOAP call
            QASearch param = new QASearch();
            param.Country = sDataID;
            param.Engine = this.m_Engine;
            param.Engine.PromptSet = (PromptSetType)tPromptSet;
            param.Engine.PromptSetSpecified = true;
            param.Layout = sLayout;
            param.QAConfig = this.m_Config;
            param.Search = sSearch;
            param.FormattedAddressInPicklist = this.m_bFormattedAddressInPicklist;

            SearchResult result = null;
            try
            {
                // Make the call to the server
                QASearchResult searchResult = this.SearchService.DoSearch(param);

                result = new SearchResult(searchResult);
            }
            catch (Exception x)
            {
                this.MapException(x);
            }

            return result;
        }

        /// <summary>
        /// Method overload: the Search function with search terms as a single string, without Layout
        /// </summary>
        /// <param name="sDataID">Three-letter identifier of the data to search</param>
        /// <param name="sSearch">Search terms</param>
        /// <param name="tPromptSet">Name of the search prompt set applied to the search terms</param>
        /// <returns>Search result, containing a pick list and/or formatted address</returns>
        public SearchResult Search(string sDataID, string sSearch, PromptSet.Types tPromptSet)
        {
            return this.Search(sDataID, sSearch, tPromptSet, null);          //// <throws>SoapException</throws>
        }

        /// <summary>
        ///  Method: the Bulk Verification function with search terms as a single string that get
        /// split into an array of strings (on the \ character).
        /// </summary>
        /// <param name="sDataID">Three-letter identifier of the data to search</param>
        /// <param name="asSearch">Search string</param>
        /// <param name="tPromptSet">Name of the layout (verification engine only); optional</param>
        /// <param name="sLayout">Search result, containing a pick list and/or formatted address</param>
        /// <returns>a result</returns> 
        public BulkSearchResult BulkSearch(string sDataID, string[] asSearch, PromptSet.Types tPromptSet, string sLayout)
        {
            QASearchType BulkSearchTerm = new QASearchType();   //// <throws>SoapException</throws>
            int iSize = asSearch.GetLength(0);
 
            System.Diagnostics.Debug.Assert(sDataID != null);
            System.Diagnostics.Debug.Assert(asSearch != null);

            // Set up the parameter for the SOAP call
            QABulkSearch param = new QABulkSearch();
            param.Country = sDataID;
            param.Layout = sLayout;
            param.QAConfig = this.m_Config;
            param.Engine = this.m_Engine;
            BulkSearchTerm.Search = new string[iSize];
            BulkSearchResult result = null;

            int i;
            for (i = 0; i < iSize; i++)
            {
                BulkSearchTerm.Search[i] = asSearch[i];
            }

            param.BulkSearchTerm = BulkSearchTerm;
            try
            {
                // Make the call to the server
                QABulkSearchResult bulkSearchResult = this.SearchService.DoBulkSearch(param);

                result = new BulkSearchResult(bulkSearchResult);
            }
            catch (Exception x)
            {
                this.MapException(x);
            }

            return result;
        }

        /// <summary>
        /// Perform a refinement, filtering the specified pick list using the supplied text
        /// NB: Step in delegates to this function with blank refinement text
        /// </summary>
        /// <param name="sMoniker">The search point moniker of the pick list to refine</param>
        /// <param name="sRefinementText">The refinement text</param>
        /// <returns>Pick list result</returns>
        public Picklist Refine(string sMoniker, string sRefinementText)
        {
            System.Diagnostics.Debug.Assert(sMoniker != null && sRefinementText != null);

            // Set up the parameter for the SOAP call
            QARefine param = new QARefine();
            param.Moniker = sMoniker;
            param.Refinement = sRefinementText;
            param.QAConfig = this.m_Config;
            param.Threshold = this.m_Engine.Threshold;
            param.Timeout = this.m_Engine.Timeout;
            param.FormattedAddressInPicklist = this.m_bFormattedAddressInPicklist;

            Picklist result = null;
            try
            {
                // Make the call to the server
                QAPicklistType picklist = this.SearchService.DoRefine(param).QAPicklist;

                result = new Picklist(picklist);
            }
            catch (Exception x)
            {
                this.MapException(x);
            }

            return result;
        }

        /// <summary>
        /// Perform a step-in: return the pick list for a particular moniker
        /// NB: delegates to the Refine function with blank refinement text
        /// </summary>
        /// <param name="sMoniker">The search point moniker of the pick list being displayed</param>
        /// <returns>Pick list result</returns>
        public Picklist StepIn(string sMoniker)
        {
            return this.Refine(sMoniker, string.Empty);
        }

        /// <summary>
        /// Retrieve the final address specified by the moniker, formatted using the requested layout
        /// </summary>
        /// <param name="sMoniker">Search point moniker of the address item</param>
        /// <param name="sLayout">Name of the layout name (specifies how the address should be formatted)</param>
        /// <returns>Formatted address result</returns>
        public FormattedAddress GetFormattedAddress(string sMoniker, string sLayout)
        {
            System.Diagnostics.Debug.Assert(sMoniker != null && sLayout != null);

            // Set up the parameter for the SOAP call
            QAGetAddress param = new QAGetAddress();
            param.Layout = sLayout;
            param.Moniker = sMoniker;
            param.QAConfig = this.m_Config;

            FormattedAddress result = null;
            try
            {
                // Make the call to the server
                QAAddressType address = this.SearchService.DoGetAddress(param).QAAddress;

                result = new FormattedAddress(address);
            }
            catch (Exception x)
            {
                this.MapException(x);
            }

            return result;
        }

        // -- Public Methods - Status Operations --

        /// <summary>
        /// Retrieve all the available data sets
        /// </summary>
        /// <returns>Array of available data sets</returns>
        public Dataset[] GetAllDatasets()
        {
            Dataset[] aResults = null;
            try
            {
                // Make the call to the server
                QADataSet[] aDatasets = this.SearchService.DoGetData(new QAGetData());
                aResults = Dataset.CreateArray(aDatasets);
            }
            catch (Exception x)
            {
                this.MapException(x);
            }

            return aResults;
        }

        /// <summary>
        /// Method for get data map detail
        /// </summary>
        /// <param name="sID">a ID</param>
        /// <returns>a Data sets</returns>
        public LicensedSet[] GetDataMapDetail(string sID)
        {
            LicensedSet[] aDatasets = null;
            
            try
            {
                QAGetDataMapDetail tRequest = new QAGetDataMapDetail();
                tRequest.DataMap = sID;

                QADataMapDetail tMapDetail = this.SearchService.DoGetDataMapDetail(tRequest);
                aDatasets = LicensedSet.createArray(tMapDetail);
            }
            catch (Exception x)
            {
                this.MapException(x);
            }

            return aDatasets;
        }

        /// <summary>
        /// Retrieve an array of all the layouts available for the specified data set
        /// </summary>
        /// <param name="sDataID">3-letter identifier of the data set of interest</param>
        /// <returns>Array of layouts within this data set</returns>
        public Layout[] GetAllLayouts(string sDataID)
        {
            System.Diagnostics.Debug.Assert(sDataID != null);

            // Set up the parameter for the SOAP call
            QAGetLayouts param = new QAGetLayouts();
            param.Country = sDataID;
            param.QAConfig = this.m_Config;

            Layout[] aResults = null;
            try
            {
                // Make the call to the server
                QALayout[] aLayouts = this.SearchService.DoGetLayouts(param);
                aResults = Layout.CreateArray(aLayouts);
            }
            catch (Exception x)
            {
                this.MapException(x);
            }

            return aResults;
        }

        /// <summary>
        /// Retrieve an array of example addresses for this data set in the specified layout
        /// </summary>
        /// <param name="sDataID">data set of interest, 3-letter identifier</param>
        /// <param name="sLayout">Layout to apply</param>
        /// <returns>Array of example addresses</returns>
        public ExampleAddress[] GetExampleAddresses(string sDataID, string sLayout)
        {
            // Set up the parameter for the SOAP call
            QAGetExampleAddresses param = new QAGetExampleAddresses();
            param.Country = sDataID;
            param.Layout = sLayout;
            param.QAConfig = this.m_Config;

            ExampleAddress[] aResults = null;
            try
            {
                // Make the call to the server
                QAExampleAddress[] aAddresses = this.SearchService.DoGetExampleAddresses(param);
                aResults = ExampleAddress.createArray(aAddresses);
            }
            catch (Exception x)
            {
                this.MapException(x);
            }

            return aResults;
        }

        /// <summary>
        /// Retrieve detailed licensing information about all the data sets and DataPlus sets installed
        /// </summary>
        /// <returns> Array of licensing information, one per data set</returns>
        public LicensedSet[] GetLicenceInfo()
        {
            LicensedSet[] aResults = null;
            try
            {
                // Make the call to the server
                QALicenceInfo info = this.SearchService.DoGetLicenseInfo(new QAGetLicenseInfo());
                aResults = LicensedSet.createArray(info);
            }
            catch (Exception x)
            {
                this.MapException(x);
            }

            return aResults;
        }

        /// <summary>
        /// Retrieve the search prompt set for a particular data set
        /// </summary>
        /// <param name="sDataID">data set of interest, 3-letter identifier</param>
        /// <param name="tType">Input template of interest</param>
        /// <returns>Input template, array of template lines</returns>
        public PromptSet GetPromptSet(string sDataID, PromptSet.Types tType)
        {
            System.Diagnostics.Debug.Assert(sDataID != null);

            // Set up the parameter for the SOAP call
            QAGetPromptSet param = new QAGetPromptSet();
            param.Country = sDataID;
            param.Engine = this.m_Engine;
            param.PromptSet = (PromptSetType)tType;
            param.QAConfig = this.m_Config;

            PromptSet result = null;
            try
            {
                // Make the call to the server
                QAPromptSet tPromptSet = this.SearchService.DoGetPromptSet(param);
                result = new PromptSet(tPromptSet);
            }
            catch (Exception x)
            {
                this.MapException(x);
            }

            return result;
        }

        /// <summary>
        /// Retrieve system (diagnostic) information from the server
        /// </summary>
        /// <returns>Array of strings, tab-separated key/value pairs of system information</returns>
        public string[] GetSystemInfo()
        {
            string[] aResults = null;
            try
            {
                // Make the call to the server
                aResults = this.SearchService.DoGetSystemInfo(new QAGetSystemInfo());
            }
            catch (Exception x)
            {
                this.MapException(x);
            }

            return aResults;
        }

        /// <summary>
        /// Rethrow a remote SoapException exception, with details parsed and exposed
        /// </summary>
        /// <param name="x">a Exception</param>
        private void MapException(Exception x)
        {
            System.Diagnostics.Debugger.Log(0, "Error", x.ToString() + "\n");

            if (x is System.Web.Services.Protocols.SoapHeaderException)
            {
                System.Web.Services.Protocols.SoapHeaderException xHeader = x as System.Web.Services.Protocols.SoapHeaderException;
                throw x;
            }
            else if (x is System.Web.Services.Protocols.SoapException)
            {
                // Parse out qas:QAFault string
                System.Web.Services.Protocols.SoapException xSoap = x as System.Web.Services.Protocols.SoapException;
                System.Xml.XmlNode xmlDetail = xSoap.Detail;

                string sDetail = xmlDetail.InnerText.Trim();
                string[] asDetail = sDetail.Split('\n');

                string sMessage = asDetail[1].Trim() + " [" + asDetail[0].Trim() + "]";

                // If there is detail available, add it to the message
                // Do this in reverse order - the most relevant detail is the last one
                if (asDetail.Length > 2)
                {
                    for (int i = asDetail.Length - 1; i > 1; --i)
                    {
                        sMessage += '\n' + asDetail[i].Trim(); 
                    }
                }

                QAServerException xThrow = new QAServerException(sMessage, xSoap);
                throw xThrow;
            }
            else
            {
                throw x;
            }
        }
    }

    /// <summary>
    /// Define a QAServerException
    /// </summary>
    [global::System.Serializable]
    public class QAServerException : ApplicationException
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="QAServerException"/> class.
        /// </summary>
        public QAServerException() 
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="QAServerException"/> class.
        /// </summary>
        /// <param name="message">a message</param>
        public QAServerException(string message) : base(message) 
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="QAServerException"/> class.
        /// </summary>
        /// <param name="message">a message</param>
        /// <param name="inner">inner Exception</param>
        public QAServerException(string message, Exception inner) : base(message, inner) 
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="QAServerException"/> class.
        /// </summary>
        /// <param name="info">Serialization Information</param>
        /// <param name="context">Streaming Context</param>
        protected QAServerException(System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context) : base(info, context) 
        {
        }
    }
}

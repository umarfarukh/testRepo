//-----------------------------------------------------------------------
// <copyright file="RapidAddress.cs" company="External">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp
 * Class Name       : RapidAddress.cs
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
/// Intranet > Rapid Addressing > Standard > RapidAddress
/// Format the final address
namespace com.qas.prowebintegration
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Data;
    using System.Drawing;
    using System.Web;
    using System.Web.SessionState;
    using System.Web.UI;
    using System.Web.UI.HtmlControls;
    using System.Web.UI.WebControls;
    using com.qas.proweb;                  // QAS services

    /// <summary>
    /// Intranet > Rapid Addressing > Standard > Full QAS searching with hierarchical pick lists
    /// Retrieve and format the final address, or provide manual entry on failure; pass address back to calling window
    /// This page is based on RapidBasePage, which provides functionality common to the scenario
    /// </summary>
    public partial class RapidAddress : RapidBasePage
    {
        /** Page members **/

        /// <summary>
        /// field for
        /// </summary>
        protected List<MultiDataplusDisplayGroup> m_MultiDataplusDisplayGroups;

        /// <summary>
        /// field for
        /// </summary>
        protected MultiDataplusControl[] m_MultiDataplusControls;

        /// <summary>
        /// field for
        /// </summary>
        private string m_sDataID = string.Empty;

        /** Methods **/

        /// <summary>
        /// Pick up values transferred from other pages
        /// </summary>
        /// <param name="sender">object sender</param>
        /// <param name="e">Event Arguments</param>
        protected override void Page_Load(object sender, System.EventArgs e)
        {
            base.Page_Load(sender, e);

            this.DataID = Request.Form[Constants.FIELD_DATA_ID];

            if (this.DataID == string.Empty)
            {
                this.DataID = this.StoredDataID;
            }
            else
            {
                this.StoredDataID = this.DataID;
            }

            if (country.Items.Count > 0)
            {
                country.SelectedValue = this.m_sDataID;
            }

            // Load datasets from server
            if (this.StoredDataMapList == null)
            {
                try
                {
                    this.m_atDatasets = theQuickAddress.GetAllDatasets();
                    this.StoredDataMapList = this.m_atDatasets;
                }
                catch (Exception x)
                {
                    this.m_atDatasets = null;
                }
            }
            else
            {
                this.m_atDatasets = this.StoredDataMapList;
            }

            if (!this.IsPostBack)
            {
                // Display values in transit from Searching page
                this.SearchEngine = this.StoredSearchEngine;

                // Address result
                FormattedAddress addr = null;

                string[] asLines = null;
                string[] asLabels = null;

                // Retrieve address
                this.FormatAddress(ref addr, ref asLabels, ref asLines);

                if (addr != null)
                {
                    this.DisplayAddress(addr);
                }
                else
                {
                    this.DisplayAddress(asLabels, asLines);
                }

                this.RenderMultiDataplusControls();

                // Set display messages
                this.SetWelcomeMessage(this.StoredRoute);
                this.SetWarningMessage(this.StoredWarning);
                this.SetErrorMessage();
            }

            this.PopulateDatasets();

            // Else leave it to the event handlers (New, Back, Accept)
        }

        /// <summary>
        /// Method for Populate Datasets
        /// </summary>
        protected void PopulateDatasets()
        {
            country.Items.Clear();

            // Populate drop down list of countries
            country.Attributes.CssStyle["width"] = SELECT_WIDTH;

            //ListItem itemheader1 = new ListItem("-- Datamaps Available --", string.Empty);
            //itemheader1.Attributes["class"] = "heading";
            //country.Items.Add(itemheader1);

            string sDatamapName;

            if (this.m_atDatasets != null)
            {
                Array.Sort(this.m_atDatasets);

                foreach (Dataset dset in this.m_atDatasets)
                {
                    sDatamapName = dset.Name;

                    if (sDatamapName.Length > MAX_DATAMAP_NAME_LENGTH)
                    {
                        sDatamapName = sDatamapName.Substring(0, MAX_DATAMAP_NAME_LENGTH - 3) + "...";
                    }

                    ListItem litem = new ListItem(sDatamapName, dset.ID);
                    country.Items.Add(litem);
                }
            }

            //ListItem itemheader2 = new ListItem("-- Other --", string.Empty);
            //itemheader2.Attributes["class"] = "heading";
            //country.Items.Add(itemheader2);

            foreach (Dataset dset in Constants.gatNetCountries)
            {
                bool bDuplicate = false;

                if (this.m_atDatasets != null)
                {
                    foreach (Dataset serverDset in this.m_atDatasets)
                    {
                        if (serverDset.Name == dset.Name || serverDset.ID == dset.ID)
                        {
                            bDuplicate = true;
                            break;
                        }
                    }
                }

                if (!bDuplicate)
                {
                    sDatamapName = dset.Name;

                    if (sDatamapName.Length > MAX_DATAMAP_NAME_LENGTH)
                    {
                        sDatamapName = sDatamapName.Substring(0, MAX_DATAMAP_NAME_LENGTH - 3) + "...";
                    }

                    ListItem litem = new ListItem(sDatamapName, dset.ID);
                    country.Items.Add(litem);
                }
            }

            if (this.m_sDataID.Length > 0)
            {
                country.SelectedValue = this.m_sDataID;
            }
            else
            {
                country.SelectedIndex = 1;
            }
            if ((Request.QueryString["Origin"]) == "StartDate")
            {
                country.Items.RemoveAt(0);
                
            }

        }

        /// <summary>
        /// Start a new search - initialize/blank values
        /// </summary>
        protected void NewSearch()
        {
            // Empty history - to forget initial search string
            m_aHistory.Clear();

            this.ResetWarningMessage();

            this.GoSearchPage(this.DataID, this.SearchEngine);
        }

        /// <summary>
        /// Start a new search, but retrieve the search string from the history top
        /// </summary>
        protected void FreshSearch()
        {
            // Cut down history - to keep just initial search string for new search
            m_aHistory.Truncate(1);

            this.ResetWarningMessage();

            this.GoSearchPage(this.DataID, this.SearchEngine);
        }

        /// <summary>
        /// Retrieve the formatted address based on the StoredMoniker, or create a set of blank lines
        /// </summary>
        /// <param name="addr">Formatted Address</param>
        /// <param name="asLabels">Array of labels for each line (address type descriptions)</param>
        /// <param name="asLines">Array of address lines</param>
        protected void FormatAddress(ref FormattedAddress addr, ref string[] asLabels, ref string[] asLines)
        {
            if (StoredRoute.Equals(Constants.Routes.Okay))
            {
                try
                {
                    // Format final address using Moniker and Layout
                    addr = theQuickAddress.GetFormattedAddress(this.StoredMoniker, this.GetLayout());
                    AddressLine[] aLines = addr.AddressLines;

                    if (!(addr.DPVStatus == com.qas.proweb.soap.DPVStatusType.DPVNotConfigured))
                    {
                        if (addr.DPVStatus == com.qas.proweb.soap.DPVStatusType.DPVConfirmed)
                        {
                            this.StoredWarning = StepinWarnings.DpvStatusConf;
                        }
                        else if (addr.DPVStatus == com.qas.proweb.soap.DPVStatusType.DPVConfirmedMissingSec)
                        {
                            this.StoredWarning = StepinWarnings.DpvStatusConfMisSec;
                        }
                        else
                        {
                            this.StoredWarning = StepinWarnings.DpvStatusUnConf;
                        }
                    }

                    // Address layout issues override other warnings
                    if (addr.IsOverflow)
                    {
                        this.StoredWarning = StepinWarnings.Overflow;
                    }
                    else if (addr.IsTruncated)
                    {
                        this.StoredWarning = StepinWarnings.Truncate;
                    }

                    if (addr.DPVStatus == com.qas.proweb.soap.DPVStatusType.DPVLocked)
                    {
                        this.StoredWarning = StepinWarnings.DpvLocked;
                    }

                    if (addr.DPVStatus == com.qas.proweb.soap.DPVStatusType.DPVSeedHit)
                    {
                        this.StoredWarning = StepinWarnings.DpvSeedHit;
                    }
                }
                catch (Exception x)
                {
                    addr = null;
                    this.StoredRoute = Constants.Routes.Failed;
                    this.StoredErrorInfo = x.Message;
                }
            }

            // Provide default (empty) address for manual entry
            if (!StoredRoute.Equals(Constants.Routes.Okay))
            {
                asLabels = new string[]
                {
                    "Address Line 1", "Address Line 2", "Address Line 3",
                    "City", "State or Province", "ZIP or Postal Code"
                };
                asLines = new string[]
                {
                   string.Empty, string.Empty, string.Empty, string.Empty, string.Empty, string.Empty
                };
            }
        }
        
        /** Page updating **/

        /// <summary>
        /// Method to Display Address
        /// </summary>
        /// <param name="addr">Formatted Address</param>
        protected void DisplayAddress(FormattedAddress addr)
        {
            int iIndex = 0;
            for (iIndex = 0; iIndex < addr.Length; ++iIndex)
            {
                if (addr.AddressLines[iIndex].LineType == AddressLine.Types.DataPlus)
                {
                    if (addr.AddressLines[iIndex].DataplusGroups != null)
                    {
                        this.AddMultiDataplusLine(addr.AddressLines[iIndex].Label, addr.AddressLines[iIndex].DataplusGroups, iIndex);
                    }
                    else
                    {
                        this.AddDataplusLine(addr.AddressLines[iIndex].Label, addr.AddressLines[iIndex].Line, iIndex);
                    }
                }
                else
                {
                    this.AddAddressLine(addr.AddressLines[iIndex].Label, addr.AddressLines[iIndex].Line, iIndex);
                }
            }

            ////Adds Custom Dropdown
            //this.AddCustomDropdown("Work Location Type", new string[] { "Home", "Client Office", "Cognizant Office" }, iIndex);
            if ((Request.QueryString["Origin"]) == "StartDate")
            {
                AddCustomDropdown("Work Location Type*", new string[] {" ", "Home", "Client Office", "Cognizant Office" }, iIndex);

            }

        }

        /// <summary>
        /// Add a table row, with cells for the label, a gap, and a select box
        /// </summary>
        /// <param name="sLabel">string Label</param>
        /// <param name="sItems">array of items</param>
        /// <param name="iLineNum">Line Number</param>
        /// <returns>The text input control</returns>
        protected HtmlSelect AddCustomDropdown(string sLabel, string[] sItems, int iLineNum)
        {
            TableRow row = new TableRow();

            TableCell cellLabel = new TableCell();
            cellLabel.CssClass = "label";
            LiteralControl label = new LiteralControl(sLabel);
            cellLabel.Controls.Add(label);
            row.Cells.Add(cellLabel);

            TableCell cellAddress = new TableCell();
            cellAddress.CssClass = "line";
            HtmlSelect addressLine = new HtmlSelect();
            foreach (string item in sItems)
            {
                addressLine.Items.Add(item);
            }

            addressLine.ID = Constants.FIELD_ADDRESS_LINES + iLineNum.ToString();
            addressLine.Attributes.Add("onKeyPress", "return onKeyUp(event);");
            cellAddress.Controls.Add(addressLine);
            row.Cells.Add(cellAddress);

            TableAddress.Rows.Add(row);

            return addressLine;
        }

        /// <summary>
        /// Dynamically populate the TableAddress table control from the arguments
        /// </summary>
        /// <param name="asLabels">string labels</param>
        /// <param name="asLines">as lines</param>
        protected void DisplayAddress(string[] asLabels, string[] asLines)
        {
            for (int iIndex = 0; iIndex < asLines.Length; ++iIndex)
            {
                this.AddAddressLine(asLabels[iIndex], asLines[iIndex], iIndex);
            }
        }

        /// <summary>
        /// Add a table row, with cells for the label, a gap, and a text input control
        /// </summary>
        /// <param name="sLabel">string Label</param>
        /// <param name="sLine">string Line</param>
        /// <param name="iLineNum">Line Number</param>
        /// <returns>The text input control</returns>
        protected HtmlInputText AddAddressLine(string sLabel, string sLine, int iLineNum)
        {
            TableRow row = new TableRow();

            TableCell cellLabel = new TableCell();
            cellLabel.CssClass = "label";
            LiteralControl label = new LiteralControl(sLabel);
            cellLabel.Controls.Add(label);
            row.Cells.Add(cellLabel);

            TableCell cellAddress = new TableCell();
            cellAddress.CssClass = "line";
            HtmlInputText addressLine = new HtmlInputText();
            addressLine.Value = sLine;
            addressLine.ID = Constants.FIELD_ADDRESS_LINES + iLineNum.ToString();
            addressLine.Attributes.Add("onKeyPress", "return onKeyUp(event);");
            cellAddress.Controls.Add(addressLine);
            row.Cells.Add(cellAddress);

            TableAddress.Rows.Add(row);

            return addressLine;
        }

        /// <summary>
        /// Method to Add Data plus Line
        /// </summary>
        /// <param name="sLabel">string Label</param>
        /// <param name="sLine">string Line</param>
        /// <param name="iLineNum">Line Number</param>
        protected void AddDataplusLine(string sLabel, string sLine, int iLineNum)
        {
            TableRow row = new TableRow();

            TableCell cellLabel = new TableCell();
            cellLabel.CssClass = "label";
            LiteralControl label = new LiteralControl(sLabel);
            cellLabel.Controls.Add(label);
            row.Cells.Add(cellLabel);

            TableCell cellAddress = new TableCell();
            cellAddress.CssClass = "line";
            LiteralControl addressLine = new LiteralControl(sLine);
            cellAddress.ID = Constants.FIELD_ADDRESS_LINES + iLineNum.ToString();
            cellAddress.Controls.Add(addressLine);
            row.Cells.Add(cellAddress);

            TableAddress.Rows.Add(row);
        }

        /// <summary>
        /// Method to Add Multi-Data plus Line
        /// </summary>
        /// <param name="sLabel">string Label</param>
        /// <param name="aGroups">array Groups</param>
        /// <param name="iLineNum">Line Number</param>
        protected void AddMultiDataplusLine(string sLabel, DataplusGroup[] aGroups, int iLineNum)
        {
            if (this.m_MultiDataplusDisplayGroups == null)
            {
                this.m_MultiDataplusDisplayGroups = new List<MultiDataplusDisplayGroup>();
            }

            TableRow row = new TableRow();

            TableCell cellLabel = new TableCell();
            cellLabel.CssClass = "label";
            LiteralControl label = new LiteralControl(sLabel);
            cellLabel.Controls.Add(label);
            row.Cells.Add(cellLabel);

            TableCell cellAddress = new TableCell();
            cellAddress.CssClass = "line multidp";
            cellAddress.ID = Constants.FIELD_ADDRESS_LINES + iLineNum.ToString();

            string sElemID = string.Empty;

            for (int i = 0; i < aGroups.Length; ++i)
            {
                if (i != 0)
                {
                    Label comma = new Label();
                    comma.Text = ",&nbsp;";
                    cellAddress.Controls.Add(comma);
                }

                DataplusGroup grp = aGroups[i];

                sElemID = grp.Name + this.m_MultiDataplusDisplayGroups.Count.ToString();

                MultiDataplusDisplayGroup dispGrp = new MultiDataplusDisplayGroup();

                dispGrp.sGroup = grp.Name;
                dispGrp.iLineNum = iLineNum;
                dispGrp.sElemID = sElemID;
                dispGrp.asItems = grp.Items;

                Label addressLine = new Label();
                addressLine.Text = string.Empty;

                addressLine.ID = sElemID;
                cellAddress.Controls.Add(addressLine);

                this.m_MultiDataplusDisplayGroups.Add(dispGrp);
            }

            row.Cells.Add(cellAddress);
            TableAddress.Rows.Add(row);
        }

        /// <summary>
        ///  Take the list of multi-data plus display groups & work out the controls we need to draw
        /// </summary>
        /// <returns>Multi-Data plus Controls</returns>
        protected MultiDataplusControl[] GetMultiDPControls()
        {
            // If we have any multi dataplus groups, and we haven't done this already...
            if (this.m_MultiDataplusControls == null && this.m_MultiDataplusDisplayGroups != null)
            {
                List<MultiDataplusControl> lControls = new List<MultiDataplusControl>();
                List<string> lGroupsUsed = new List<string>();

                foreach (MultiDataplusDisplayGroup grp in this.m_MultiDataplusDisplayGroups)
                {
                    // Check if we've already created a control for this group..
                    if (!lGroupsUsed.Contains(grp.sGroup) && grp.sGroup != string.Empty)
                    {
                        MultiDataplusControl ctrl = new MultiDataplusControl();

                        ctrl.sGroup = grp.sGroup;

                        ctrl.sFwdID = "fwd" + lControls.Count.ToString();
                        ctrl.sBackID = "bck" + lControls.Count.ToString();
                        ctrl.sReturnID = "rtn" + lControls.Count.ToString();
                        ctrl.sIndexID = "idx" + lControls.Count.ToString();

                        // Don't draw controls if there's only one item in the group
                        ctrl.bRender = (grp.asItems.Length > 1) ? true : false;

                        lGroupsUsed.Add(grp.sGroup);
                        lControls.Add(ctrl);
                    }
                }

                this.m_MultiDataplusControls = lControls.ToArray();
            }

            return this.m_MultiDataplusControls;
        }

        /// <summary>
        ///  Add any multi data plus controls to the page
        /// </summary>
        private void RenderMultiDataplusControls()
        {
            MultiDataplusControl[] aCtrls = this.GetMultiDPControls();

            if (aCtrls != null)
            {
                foreach (MultiDataplusControl ctrl in aCtrls)
                {
                    if (ctrl.bRender == true)
                    {
                        TableRow row = new TableRow();

                        TableCell cellName = new TableCell();
                        cellName.Text = "&nbsp;" + ctrl.sGroup + "&nbsp;";
                        row.Cells.Add(cellName);

                        TableCell cellBack = new TableCell();
                        HtmlInputButton btnBack = new HtmlInputButton();
                        btnBack.Value = "<";
                        btnBack.ID = ctrl.sBackID;
                        cellBack.Controls.Add(btnBack);
                        row.Cells.Add(cellBack);

                        TableCell cellIndex = new TableCell();
                        cellIndex.ID = ctrl.sIndexID;
                        row.Cells.Add(cellIndex);

                        TableCell cellFwd = new TableCell();
                        HtmlInputButton btnFwd = new HtmlInputButton();
                        btnFwd.Value = ">";
                        btnFwd.ID = ctrl.sFwdID;
                        cellFwd.Controls.Add(btnFwd);
                        row.Cells.Add(cellFwd);

                        TableCell cellRtn = new TableCell();
                        HtmlInputCheckBox chkRtn = new HtmlInputCheckBox();
                        chkRtn.ID = ctrl.sReturnID;
                        cellRtn.Controls.Add(chkRtn);
                        row.Cells.Add(cellRtn);

                        TableCell cellRtnLabel = new TableCell();
                        cellRtnLabel.Text = "&nbsp;Return this";
                        row.Cells.Add(cellRtnLabel);

                        TableMultiDPCtrl.Rows.Add(row);
                    }
                }
            }
        }

        /// <summary>
        /// Update the welcome message displayed below the toolbar, depending on searching success
        /// </summary>
        /// <param name="eRoute">Constants Routes</param>
        private void SetWelcomeMessage(Constants.Routes eRoute)
        {
            // Set the welcome message depending on how we got here (the route)
            switch (eRoute)
            {
                case Constants.Routes.Okay:
                    LabelPrompt.Text = "Please confirm the address";
                    break;
                default:
                    LabelPrompt.Text = "Searching is not available &#8211; please enter the address below";
                    break;
            }
        }

        /// <summary>
        /// Update the warning message displayed in the status bar, depending on preceding step-in
        /// </summary>
        /// <param name="eWarn">Step in Warnings</param>
        private void SetWarningMessage(StepinWarnings eWarn)
        {
            // Set the step-in message depending on the warning
            switch (eWarn)
            {
                case StepinWarnings.CloseMatches:
                    infoStatus.InnerHtml = "There are also close matches available &#8211; click <a href=\"javascript:stepBack();\">back</a> to see them";
                    statusData.Attributes["class"] += " message";
                    break;
                case StepinWarnings.CrossBorder:
                    infoStatus.InnerHtml = "Address selected is outside of the entered locality";
                    statusData.Attributes["class"] += " warning";
                    break;
                case StepinWarnings.ForceAccept:
                    infoStatus.InnerHtml = "Address not verified";
                    statusData.Attributes["class"] += " alert";
                    break;
                case StepinWarnings.Overflow:
                    infoStatus.InnerHtml = "Address has overflowed the layout &#8211; elements lost";
                    statusData.Attributes["class"] += " alert";
                    break;
                case StepinWarnings.PostcodeRecode:
                    infoStatus.InnerHtml = "Postal code has been updated by the Postal Authority";
                    statusData.Attributes["class"] += " warning";
                    break;
                case StepinWarnings.Truncate:
                    infoStatus.InnerHtml = "Address elements have been truncated";
                    statusData.Attributes["class"] += " alert";
                    break;
                case StepinWarnings.DpvStatusConf:
                    infoStatus.InnerHtml = "DPV validated";
                    statusData.Attributes["class"] += " message";
                    break;
                case StepinWarnings.DpvStatusUnConf:
                    infoStatus.InnerHtml = "WARNING - DPV not validated";
                    statusData.Attributes["class"] += " alert";
                    break;
                case StepinWarnings.DpvStatusConfMisSec:
                    infoStatus.InnerHtml = "DPV validated but secondary number incorrect or missing";
                    statusData.Attributes["class"] += " alert";
                    break;
                case StepinWarnings.DpvLocked:
                    infoStatus.InnerHtml = "WARNING - DPV validation locked";
                    statusData.Attributes["class"] += " alert";
                    break;
                case StepinWarnings.DpvSeedHit:
                    infoStatus.InnerHtml = "WARNING - DPV - Seed address hit";
                    statusData.Attributes["class"] += " alert";
                    break;
                default:
                    break;
            }
        }

        /// <summary>
        /// Reset Warning Message
        /// </summary>
        private void ResetWarningMessage()
        {
            // Clear any warning info
            infoStatus.InnerHtml = "&nbsp;";
            statusData.Attributes["Class"] = "status";
            this.StoredWarning = StepinWarnings.None;
        }

        /// <summary>
        /// Show the panel and populate if appropriate
        /// </summary>
        private void SetErrorMessage()
        {
            //// Make the panel visible as appropriate
            PlaceholderInfo.Visible = !StoredRoute.Equals(Constants.Routes.Okay);
            //// Update the content
            LiteralRoute.Text = StoredRoute.ToString();
            if (this.StoredErrorInfo != null)
            {
                LiteralError.Text = "<br />" + "The QAS server is not available. " + this.StoredErrorInfo;
            }
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

        #endregion

        /// <summary>
        /// 'New' button clicked: transfer to the searching page, new (blank) search
        /// </summary>
        /// <param name="sender">object sender</param>
        /// <param name="e">Event Arguments</param>
        protected void ButtonNew_ServerClick(object sender, System.EventArgs e)
        {
            this.NewSearch();
        }

        /// <summary>
        /// 'Back' button clicked: transfer to the searching page, display last pick list shown
        /// </summary>
        /// <param name="sender">object sender</param>
        /// <param name="e">Event Arguments</param>
        protected void ButtonBack_ServerClick(object sender, System.EventArgs e)
        {
            this.GoSearchPage(this.DataID, this.SearchEngine);
        }

        /// <summary>
        /// Search engine changed: transfer to the searching page, fresh search (retain initial search string)
        /// </summary>
        /// <param name="sender">object sender</param>
        /// <param name="e">Event Arguments</param>
        protected void RadioEngine_Changed(object sender, System.EventArgs e)
        {
            this.FreshSearch();
        }

        /// <summary>
        /// Country database changed: transfer to the searching page, fresh search (retain initial search string)
        /// </summary>
        /// <param name="sender">object sender</param>
        /// <param name="e">Event Arguments</param>
        protected void Country_Changed(object sender, System.EventArgs e)
        {
            this.FreshSearch();
        }

        #region Web Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
        }
                #endregion

        /** Page controls **/

        /// <summary>
        ///  Gets Name of Java script function to call on completion
        /// </summary>
        protected string CallBackFunction
        {
            get
            {
                return this.StoredCallback;
            }
        }

        /// <summary>
        ///  Gets or sets Country data identifier (i.e. AUS)
        /// </summary>
        protected string DataID
        {
            get
            {
                if (this.m_sDataID == null)
                {
                    return string.Empty;
                }

                return this.m_sDataID;
            }

            set
            {
                if (value == null)
                {
                    this.m_sDataID = string.Empty;
                }
                else
                {
                    this.m_sDataID = value;
                }
            }
        }

        /// <summary>
        ///  Gets or sets Search engine selected
        /// </summary>
        private QuickAddress.EngineTypes SearchEngine
        {
            get
            {
                if (RadioSingleline.Checked)
                {
                    return QuickAddress.EngineTypes.Singleline;
                }

                if (RadioTypedown.Checked) { return QuickAddress.EngineTypes.Typedown; }
                if (RadioKeyfinder.Checked)
                {
                    return QuickAddress.EngineTypes.Keyfinder;
                }

                return QuickAddress.EngineTypes.Singleline;
            }

            set
            {
                RadioSingleline.Checked = (value == QuickAddress.EngineTypes.Singleline);
                RadioTypedown.Checked = (value == QuickAddress.EngineTypes.Typedown);
                RadioKeyfinder.Checked = (value == QuickAddress.EngineTypes.Keyfinder);
            }
        }
    }

    /// <summary>
    ///  Helper class - Describes a group of multi data plus items
    /// </summary>
    public class MultiDataplusDisplayGroup
    {
        /// <summary>
        /// Name of the group these items belong to e.g. 'GBRELC'
        /// </summary>
        public string sGroup;       // Name of the group these items belong to e.g. 'GBRELC'

        /// <summary>
        /// Line of the address these items appear on
        /// </summary>
        public int iLineNum;        // Line of the address these items appear on

        /// <summary>
        /// Id of the element which displays the current item
        /// </summary>
        public string sElemID;      // Id of the element which displays the current item

        /// <summary>
        /// The items.
        /// </summary>
        public string[] asItems;    // The items.
    }

    /// <summary>
    ///  Helper class - Describes a multi data plus control to draw on the page
    /// </summary>
    public class MultiDataplusControl
    {
        /// <summary>
        /// Name of the group this controls e.g. 'GBRGAS'
        /// </summary>
        public string sGroup;       // Name of the group this controls e.g. 'GBRGAS'

        /// <summary>
        /// Id of the element used as the 'increment' button
        /// </summary>
        public string sFwdID;       // Id of the element used as the 'increment' button

        /// <summary>
        /// Id of the element used as the 'decrement' button
        /// </summary>
        public string sBackID;      // Id of the element used as the 'decrement' button

        /// <summary>
        /// Id of the checkbox used to determine whether to 'return this'
        /// </summary>
        public string sReturnID;    // Id of the checkbox used to determine whether to 'return this'

        /// <summary>
        ///  Id of the element displaying the current position
        /// </summary>
        public string sIndexID;     // Id of the element displaying the current position

        /// <summary>
        /// Whether to draw this control
        /// </summary>
        public bool bRender;        // Whether to draw this control
    }
}

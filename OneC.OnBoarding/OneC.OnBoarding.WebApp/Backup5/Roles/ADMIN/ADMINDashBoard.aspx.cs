//-----------------------------------------------------------------------=
// <copyright file="ADMINDashBoard.aspx.cs" company="Cognizant Technology Solutions">
// Copyright  . All Rights Reserved.
// </copyright>
//-----------------------------------------------------------------------

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp.Roles.HRSS       
 * Page Name        : ADMINDashBoard.aspx
 * Version          : 1.0
 * Type             : Web page class file
 * Purpose          : Page For HRSS DashBoard
 * Created date     : 2012-Feb-02
 * Author           : 312511
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

namespace OneC.OnBoarding.WebApp.Roles.ADMIN
{
#region Namespaces
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Data;
using System.IO;
using System.Linq;
using System.Reflection;
using System.ServiceModel;
using System.Text;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Serialization;
using System.Xml.XPath;
using System.Xml.Xsl;
using OneC.OnBoarding.DC.CandidateDC;
using OneC.OnBoarding.DC.DashBoardDC;
using OneC.OnBoarding.DC.UtilityDC;
using OneC.OnBoarding.WebApp.Service.CandidateServices;
using OneC.OnBoarding.WebApp.Service.DashBoardServices;
using OneC.OnBoarding.WebApp.Service.OBUtilityMethods;
using OneC.OnBoarding.WebApp.Utility;

#endregion Namespaces

    /// <summary>
    /// Documentation for the class ADMINDashBoard
    /// </summary>
    public partial class ADMINDashBoard : System.Web.UI.Page
    {
        /// <summary>
        /// documentation for Role id
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields", Justification = "Reviewed.")]
        private string roleid;

        /// <summary>
        /// initializing session details 
        /// </summary>
        private SessionDetails sessionDetail;

        /// <summary>
        /// initializing data Page Index Dash Board candidates
        /// </summary>
        private int dataPageIndexDashBoardcandidates = 1;

        /// <summary>
        /// initializing total Pages Display Dash Board candidates
        /// </summary>
        private int totalPagesDisplayDashBoardcandidates = 3;

        /// <summary>
        /// Initializing global object for Utility class to access utility methods if required
        /// </summary>
        private Utility.UtilityMethods objUtil = new UtilityMethods(); //// stylecop fix - given access modifier- 397785 

        /// <summary>
        /// Initializing global object for Utility class to access utility methods if required
        /// </summary>
         private SessionHelper objSession = new SessionHelper(); //// stylecop fix - given access modifier- 397785 

        /// <summary>
        /// Initializing global object for Utility class to access utility methods if required
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields", Justification = "Reviewed.")]
         private OBUtilityMethodsClient obj = new OBUtilityMethodsClient(); //// stylecop fix - given access modifier- 397785 

        /// <summary>
        /// initializing page Size Dash Board candidates 
        /// </summary>
        private int pageSizeDashBoardcandidates = 3;

        #region WebMethods

        /// <summary>
        /// Binds the Candidate type 
        /// </summary>
        /// <returns>candidate type</returns>
        [WebMethod]
        public static CandidateTypeDC[] BindCandidateType()
        {
            try
            {
                using (CandidateServicesClient objDashBoardClient = new CandidateServicesClient())
                {
                    return (CandidateTypeDC[])objDashBoardClient.FetchCandidateType();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Binds file upload status for admin
        /// </summary>
        /// <param name="countryID">country ID</param>
        /// <returns>upload status</returns>
        [WebMethod]
        public static CandidateDetail[] BindStatus(int countryID)
        {
            try
            {
                CandidateDetail objCandidateDetail = new CandidateDetail();
                objCandidateDetail.CountryID = countryID;
                using (DashBoardServicesClient objDashBoardClient = new DashBoardServicesClient())
                {
                    return (CandidateDetail[])objDashBoardClient.GetStatusList(objCandidateDetail);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Binds Location List for admin
        /// </summary>
        /// <param name="sessionid">session id</param>
        /// <returns>location list</returns>
        [WebMethod]
        public static City[] BindLocation(long sessionid)
        {
            AdminDashBoard objAdmin = new AdminDashBoard();
            SessionHelper objSession = new SessionHelper();
            SessionDetails objSessiondetail = new SessionDetails();
            CandidateDetail objCandidateDetail = new CandidateDetail();
            UserRolesList usr = (UserRolesList)objSession.GetSessionValue("RolesList");

            foreach (UserRoles roleData in usr)
            {
                if (roleData.RoleGroupId == DC.UtilityDC.RoleGroup.ADMIN)
                {
                    objCandidateDetail.RoleId = roleData.RoleDetailId;
                }
            }

            objAdmin.SessionId = sessionid;
            objAdmin.RoleId = objCandidateDetail.RoleId;
            ////CityList citylist = new CityList(); commented for fixing code analysis error CA1804

            /* Service call to DB*/
            ////Creating client for service
            var clnt = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                ////Opening client
                clnt.Open();
                ////Executing the method
                return (City[])clnt.GetLocationList(objAdmin);
            }
            catch (FaultException<OBFaultContractFC> ex)
            {
                (new ErrorLogger(objSessiondetail.SessionId)).LogError(ex);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(objSessiondetail.SessionId)).LogError(ex);
            }
            finally
            {
                ////If connection resulted in faulted state then aborting client
                if (clnt.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    clnt.Abort();
                }
                else
                {
                    clnt.Close(); ////Closing connection if no exception
                }

                clnt = null; ////Clearing client
            }

            return (City[])clnt.GetLocationList(objAdmin);
        }

        /// <summary>
        /// Represents a customer in the database in grid view.
        /// </summary>
        /// <param name="gridView">grid view</param>
        /// <param name="pageNo">page no</param>
        /// <param name="candidateID">candidate ID</param>
        /// <param name="name">name of the candidate</param>
        /// <param name="fromDate">from date</param>
        /// <param name="todate">to date</param>
        /// <param name="candidateType">candidate type</param>
        /// <param name="status">customer status</param>
        /// <param name="cityName">city Name</param>
        /// <returns>customer in database</returns>
        [WebMethod]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        public static string TransformXML(string gridView, string pageNo, string candidateID, string name, DateTime fromDate, DateTime todate, int candidateType, int status, string cityName) ////stylecop warning fix , changed "Cityname" to "cityname" and "toDate" to "todate" - 397785
        {
            try
            {
                ADMINDashBoard objADMINDashBoard = new ADMINDashBoard();
                ////CandidateDetailList objCandidateDetailList = new CandidateDetailList(); commented for fixing code analysis error CA1804
                CandidateDetail objCandidateDetail = new CandidateDetail();
                TotalCountDC tc = new TotalCountDC();
                CandidateDetail[] cand;
                Utility.UtilityMethods objUtil = new UtilityMethods();
                objCandidateDetail.AssociateId = int.Parse(objUtil.SessionDetail.LoginId);
                if (!string.IsNullOrEmpty(candidateID))
                {
                    objCandidateDetail.CandidateId = Convert.ToInt64(candidateID);
                }

                objCandidateDetail.Name = name;
                objCandidateDetail.Status = status;
                objCandidateDetail.CandidateType = candidateType;
                objCandidateDetail.FromDate = fromDate;
                objCandidateDetail.ToDate = todate;
                objCandidateDetail.CityName = cityName;
                objCandidateDetail.Filter = int.Parse(gridView);
                if (!string.IsNullOrEmpty(pageNo))
                {
                    objCandidateDetail.PageNo = Convert.ToInt64(pageNo);
                }

                objCandidateDetail.PageSize = objADMINDashBoard.pageSizeDashBoardcandidates;

                if (!string.IsNullOrEmpty(pageNo))
                {
                    objADMINDashBoard.dataPageIndexDashBoardcandidates = int.Parse(pageNo);
                }

                tc.TotalCount = 0;
                //// int totalRecords = 0;
                SessionHelper objSession = new SessionHelper();
                SessionDetails objSessionDetails = new SessionDetails();
                UserRolesList usr = (UserRolesList)objSession.GetSessionValue("RolesList");

                if (usr == null)
                {
                    usr = objUtil.GetUserRoles(); //// Getting user role list from DB if the same is not available in session 
                }

                ////foreach (UserRoles roleData in usr)
                ////{
                ////    if (roleData.RoleGroupId == DC.UtilityDC.RoleGroup.ADMIN && roleData.RoleCountryId == country.ToString())
                ////    {
                ////        objCandidateDetail.RoleId = roleData.RoleDetailId;
                ////    }
                ////}
                objSession.SetSessionValue("CandidateDetail", objCandidateDetail);
                using (DashBoardServicesClient objDashBoardClient = new DashBoardServicesClient())
                {
                    cand = objDashBoardClient.FetchADMINDataDashboard(objCandidateDetail, tc);
                }

                if (cand != null && cand.Count() > 0)
                {
                    tc.TotalCount = cand[0].TotalCount;
                    List<CandidateDetail> candidateDetailListColl = cand.ToList();
                    return objADMINDashBoard.LoadData(candidateDetailListColl, tc.TotalCount) + "*#@ 1";  ////-1 added to enable export button
                }
                else
                {
                    return "  <div class=\"footer_rc_invalid\"> <p>Oops!!! No such result found!</p> </div>" + " *#@ 0"; ////-1 added to disable export button
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// to Clear the existing session
        /// </summary>
        [WebMethod]
        public static void ClearSession()
        {
            SessionHelper objSession = new SessionHelper();
            objSession.RemoveSessionKey("CandidateDetail");
        }
        #endregion

        /// <summary>
        /// Binds the candidate details
        /// </summary>
        /// <param name="objCandidateDetailList">Candidate Detail List</param>
        /// <param name="totalRecords">Total Records</param>
        /// <returns>string Page </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public string LoadData(List<CandidateDetail> objCandidateDetailList, int totalRecords)
        {
            //// transform the personnel.xml file to HTML
          //  XslCompiledTransform transform = new XslCompiledTransform();
           XslTransform transform = new XslTransform();
            StringWriter stringWriter = new StringWriter();
            string strOutXml = string.Empty;
            strOutXml = DashboardUtility.Serialize<List<CandidateDetail>>(objCandidateDetailList);
            XmlUrlResolver resolver = new XmlUrlResolver();
            resolver.Credentials = System.Net.CredentialCache.DefaultCredentials;
            string strStartHtml = "<div style=\"height:230px;\">  ";
            ////  doc.Add(new XElement("root", retCand.Select(x => new XElement("Data", x))));
            XmlDocument xmldoc = new XmlDocument();
            xmldoc.LoadXml(strOutXml);
            //// load up the stylesheet
            transform.Load(HttpContext.Current.Server.MapPath("ADMINDashBoardGrid.xslt"), resolver);
            ////transform.Load("..\\DashBoardGrid.xslt", resolver);
            //// perform the transformation
            XPathDocument doc = new XPathDocument(new StringReader(strOutXml));
            transform.Transform(doc, null, stringWriter, resolver);
            string pagination = " </div><div id=\"CommentsPaginationDiv\">" + this.DoPagingForDashboard(totalRecords) + "</div>";
            string strPage = strStartHtml + stringWriter.ToString() + pagination;
            ////  string str ="<tr> <th class=\"sno\">S no.</th><th class=\"c_name\">Candidate Name</th> <th class=\"l_id\" >Login Id</th><th class=\"level\" >Level</th><th class=\"r_name\">Recruiter Name(ID)</th><th class=\"o_status\">Offer Status</th><th class=\"p_work\">Paperwork</th> </tr>";
            return strPage;
        }

        /// <summary>
        /// object to Excel conversion
        /// </summary>
        /// <param name="candidateDetails">candidate details list</param>
        /// <returns>export to excel</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", Justification = "Reviewed.")]
        public DataTable Cover(List<CandidateDetail> candidateDetails)
        {
            DataTable dtExportToexcel = new DataTable();
            dtExportToexcel.Columns.Add("CandidateId", typeof(long));
            dtExportToexcel.Columns.Add("FullName", typeof(string));
            dtExportToexcel.Columns.Add("NameOnIDCard", typeof(string));
            dtExportToexcel.Columns.Add("PhotoUploadStatus", typeof(string));
            dtExportToexcel.Columns.Add("Job Level", typeof(string));
            dtExportToexcel.Columns.Add("Owning Department", typeof(string));
            dtExportToexcel.Columns.Add("Requesting Department", typeof(string));
            dtExportToexcel.Columns.Add("SO WorkLocation", typeof(string));
            dtExportToexcel.Columns.Add("ESA WorkLocation", typeof(string));
            dtExportToexcel.Columns.Add("Project Name", typeof(string));
            dtExportToexcel.Columns.Add("AssociateId", typeof(string));
            dtExportToexcel.Columns.Add("City", typeof(string));
            dtExportToexcel.Columns.Add("Expected DOJ", typeof(string));
            dtExportToexcel.Columns.Add("OfferExtendedDate", typeof(string));
            dtExportToexcel.Columns.Add("Department Grouping", typeof(string));
            dtExportToexcel.Columns.Add("Practice Name", typeof(string));
            dtExportToexcel.Columns.Add("ShippingAddress", typeof(string));
            dtExportToexcel.Columns.Add("EmergencyContactNumber", typeof(string));
            dtExportToexcel.Columns.Add("BloodGroup", typeof(string));
            ////dtExportToexcel.Columns.Add("RecruiterID", typeof(Int16));
            foreach (CandidateDetail candidate in candidateDetails)
            {
                DataRow dr = dtExportToexcel.NewRow();
                dr["CandidateId"] = candidate.CandidateId;
                dr["FullName"] = candidate.Name;
                dr["NameOnIDCard"] = candidate.NameOnIDCard;
                dr["Job Level"] = candidate.Jobcode;
                dr["PhotoUploadStatus"] = candidate.FileUploadStatusDesc;
                dr["Owning Department"] = candidate.DepartmentName;
                dr["Requesting Department"] = candidate.DepartmentName;
                dr["SO WorkLocation"] = candidate.SoWorkLocation;
                dr["ESA WorkLocation"] = candidate.ESAWorkLocation;
                dr["Project Name"] = candidate.ProjectName;
                dr["AssociateId"] = candidate.AssociateId;
                dr["City"] = candidate.CityName;
                dr["Expected DOJ"] = candidate.CandidateDOJ;
                dr["OfferExtendedDate"] = candidate.OfferExtendedDate;
                dr["Department Grouping"] = candidate.DepartmentGroup;
                dr["Practice Name"] = candidate.PracticeName;
                
                if (candidate.CountryID != 4)
                {
                    if (dtExportToexcel.Columns.Contains("ShippingAddress"))
                    {
                        dtExportToexcel.Columns.Remove("ShippingAddress");
                    }

                    if (candidate.CountryID != 3)
                    {
                        if (dtExportToexcel.Columns.Contains("EmergencyContactNumber"))
                        {
                            dtExportToexcel.Columns.Remove("EmergencyContactNumber");
                        }
                    }
                }

                if (candidate.CountryID == 4)
                {
                    dr["ShippingAddress"] = candidate.ShippingAddress;
                    dr["EmergencyContactNumber"] = candidate.CandidateMobileNo;
                }

                if (candidate.CountryID == 3)
                {
                    dr["EmergencyContactNumber"] = candidate.CandidateMobileNo;
                    dr["BloodGroup"] = candidate.BloodGroup;
                }

                dtExportToexcel.Rows.Add(dr);
            }

            return dtExportToexcel;
        }

        #region Event Handlers

        /// <summary>
        /// Export to excel for a HRSS View 
        /// </summary>
        /// <param name="sender"> object sender</param>
        /// <param name="e">Event Args e</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", Justification = "Reviewed")]
        protected void ExportButton_Click(object sender, EventArgs e)
        {
            try
            {
                CandidateDetail objCandidateDetail = new CandidateDetail();
                SessionHelper objSession = new SessionHelper();
                if (objSession.GetSessionValue("CandidateDetail") != null)
                {
                    objCandidateDetail = (CandidateDetail)objSession.GetSessionValue("CandidateDetail");
                    ////CandidateDetail[] cand;
                    CandidateDetails objCandDetails = new CandidateDetails();
                    var clnt = new Service.DashBoardServices.DashBoardServicesClient();
                    try
                    {
                        clnt.Open();
                        objCandDetails = clnt.FetchADMINDataDashboardExcel(objCandidateDetail);
                    }
                    catch (FaultException<OBFaultContractFC> ex)
                    {
                        (new ErrorLogger(this.sessionDetail.SessionId)).LogError(ex);
                    }
                    catch (Exception ex)
                    {
                        (new ErrorLogger(this.sessionDetail.SessionId)).LogError(ex);
                    }
                    finally
                    {
                        if (clnt.State == System.ServiceModel.CommunicationState.Faulted)
                        {
                            clnt.Abort();
                        }
                        else
                        {
                            clnt.Close();
                        }

                        clnt = null;
                    }

                    if (objCandDetails.CandidateDetailList != null && objCandDetails.CandidateDetailList.Count() > 0)
                    {
                        DataSet dsExportToExcel = new DataSet();
                        dsExportToExcel.Tables.Add(this.Cover(objCandDetails.CandidateDetailList));
                        ExportToExcel.ExportDatasetToExcel(dsExportToExcel, "Results");
                    }
                }
            }
            catch (FaultException<OBFaultContractFC> ex)
            {
                (new ErrorLogger(this.sessionDetail.SessionId)).LogError(ex);
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(this.sessionDetail.SessionId);
                logger.LogError(ex);
            }
            finally
            {
                HttpContext.Current.Response.End();
            }
        }
        #endregion

        #region Page Init

        /// <summary>
        /// method for page initialization
        /// </summary>
        /// <param name="sender">object sender</param>
        /// <param name="e">Event Args e</param>
        protected void Page_init(object sender, EventArgs e)
        {
            /* Initialize session detail */
            if (this.objUtil.SessionDetail != null)
            {
                this.sessionDetail = this.objUtil.SessionDetail;
            }

            this.hdnSessionId.Value = this.sessionDetail.SessionId.ToString();
        }
        #endregion

        #region Page Load

        /// <summary>
        /// method for page load
        /// </summary>
        /// <param name="sender">object sender</param>
        /// <param name="e">event Args e</param>
        protected void Page_Load(object sender, EventArgs e)
        {
            /* Initialize session detail */
            if (this.sessionDetail == null)
            {
                this.sessionDetail = this.objUtil.SessionDetail;
            }

            if (!this.IsPostBack)
            {
                try
                {
                    ////SystemKey sysKey = new SystemKey(); 
                    ////DashBoard objDC = new DashBoard();
                    ////sysKey.KeyId = 6;
                    ////sysKey = obj.GetSystemKey(sysKey);
                    ////DateTime dtStartDate = DateTime.Today.AddDays(Convert.ToInt16(sysKey.KeyValue));//DateTime.Today.AddDays(Convert.ToInt16(objDC.StartDate)) ;
                    ////sysKey.KeyId = 7;
                    ////sysKey = obj.GetSystemKey(sysKey);
                    ////DateTime dtEndDate = DateTime.Today.AddDays(Convert.ToInt16(sysKey.KeyValue));//DateTime.Today.AddDays(Convert.ToInt16(objDC.EndDate));
                    ////hdnStartDate.Value = dtStartDate.ToShortDateString();
                    this.DOJFromInputBox.Attributes.Add("readonly", "readonly");
                    //// hdnEndDate.Value = dtEndDate.ToShortDateString();
                    this.DOJToInputBox.Attributes.Add("readonly", "readonly");
                    ////string postJoiningCount = string.Empty; commented for fixing code analysis error CA1804
                    ////string preJoiningCount = string.Empty; commented for fixing code analysis error CA1804
                    CandidateDetail objCandidateDetail = new CandidateDetail();
                    UserRolesList usr = (UserRolesList)this.objSession.GetSessionValue("RolesList");
                    objCandidateDetail.AssociateId = int.Parse(this.sessionDetail.LoginId);
                    foreach (UserRoles roleData in usr)
                    {
                        if (roleData.RoleGroupId == DC.UtilityDC.RoleGroup.ADMIN)
                        {
                            objCandidateDetail.RoleId = roleData.RoleDetailId;
                        }
                    }

                    Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "SessionMaintainer", "<script type='text/javascript'>initiateSM();</script>");
                }
                catch (Exception ex)
                {
                    ErrorLogger logger = new ErrorLogger(this.sessionDetail.SessionId);
                    logger.LogError(ex);
                }
            }
        }
        #endregion

        /// <summary>
        /// Pagination for the dashboard view 
        /// </summary>
        /// <param name="itotalCount">Total Count</param>
        /// <returns>SB Content</returns>
        private string DoPagingForDashboard(int itotalCount)
        {
            if (itotalCount.Equals(0))
            {
                return string.Empty;
            }

            int pagesCount = itotalCount / this.pageSizeDashBoardcandidates;
            int remainder = itotalCount % this.pageSizeDashBoardcandidates;

            StringBuilder sbcontent = new StringBuilder(string.Empty, 800);

            try
            {
                ////Bind First
                int firstPageNoIndex = 1;
                int firstPageStartIndex = 0;
                ////Bind Last
                int lastPageNoIndex = 1;
                int lastPageStartIndex = 0;
                if (remainder == 0)
                {
                    lastPageNoIndex = itotalCount / this.pageSizeDashBoardcandidates;
                    lastPageStartIndex = ((itotalCount / this.pageSizeDashBoardcandidates) * this.pageSizeDashBoardcandidates) - this.pageSizeDashBoardcandidates;
                }
                else
                {
                    lastPageNoIndex = (itotalCount / this.pageSizeDashBoardcandidates) + 1;
                    lastPageStartIndex = (itotalCount / this.pageSizeDashBoardcandidates) * this.pageSizeDashBoardcandidates;
                }
                ////Bind Prev
                int prevPageNoIndex = this.dataPageIndexDashBoardcandidates - 1;
                int prevPageStartIndex = (prevPageNoIndex * this.pageSizeDashBoardcandidates) - this.pageSizeDashBoardcandidates;
                if (prevPageNoIndex <= firstPageNoIndex)
                {
                    prevPageNoIndex = firstPageNoIndex;
                    prevPageStartIndex = firstPageStartIndex;
                }
                ////Bind Next
                int nextPageNoIndex = this.dataPageIndexDashBoardcandidates + 1;
                int nextPageStartIndex = (nextPageNoIndex * this.pageSizeDashBoardcandidates) - this.pageSizeDashBoardcandidates;
                if (nextPageNoIndex >= lastPageNoIndex)
                {
                    nextPageNoIndex = lastPageNoIndex;
                    nextPageStartIndex = lastPageStartIndex;
                }
                ////Bind number of pages to display
                int prevPageCount = this.dataPageIndexDashBoardcandidates - (this.totalPagesDisplayDashBoardcandidates / 2);
                int nextPageCount = this.dataPageIndexDashBoardcandidates + (this.totalPagesDisplayDashBoardcandidates / 2);
                if (prevPageCount <= 0)
                {
                    prevPageCount = firstPageNoIndex;
                    nextPageCount = firstPageNoIndex + this.totalPagesDisplayDashBoardcandidates - 1;
                }

                if (nextPageCount >= lastPageNoIndex)
                {
                    nextPageCount = lastPageNoIndex;
                    prevPageCount = lastPageNoIndex - this.totalPagesDisplayDashBoardcandidates + 1;
                }

                sbcontent.Append("<div class=\"pagination\">");
                sbcontent.Append("<div class=\"btn_pagination\">");
                sbcontent.Append("<div class=\"flt_right\">");

                if ((pagesCount > 0) && (itotalCount > this.pageSizeDashBoardcandidates))
                {
                    if (this.dataPageIndexDashBoardcandidates == 1)
                    {
                        sbcontent.Append("<span class='active_point' >First</span></a>");
                        sbcontent.Append("<span class='active_point' >Previous</span></a>");
                    }
                    else
                    {
                        ////Append First
                        sbcontent.Append("<a href=\"javascript:PaginationDashboard(" + firstPageStartIndex + "," + firstPageNoIndex + ")\">First</a>");
                        sbcontent.Append("<a href=\"javascript:PaginationDashboard(" + prevPageStartIndex + "," + prevPageNoIndex + ")\"><span class='prev_point' >Previous</span></a>");
                    }

                    for (int i = prevPageCount; i <= nextPageCount; i++)
                    {
                        if (i >= firstPageNoIndex && i <= lastPageNoIndex)
                        {
                            int startIndex = (i * this.pageSizeDashBoardcandidates) - this.pageSizeDashBoardcandidates; //// changed iStartIndex to startindex- 397785
                            if (i.Equals(this.dataPageIndexDashBoardcandidates))
                            {
                                sbcontent.Append("<span class='active_point'>" + i.ToString() + "</span>");
                            }
                            else
                            {
                                sbcontent.Append("<a href=\"javascript:PaginationDashboard(" + startIndex.ToString() + "," + i.ToString() + ")\">" + i.ToString() + "</a>"); //// changed iStartIndex to startindex- 397785
                            }
                        }
                    }

                    if (this.dataPageIndexDashBoardcandidates == lastPageNoIndex)
                    {
                        sbcontent.Append("<span class='active_point' >Next</span></a>");
                        sbcontent.Append("<span class='active_point' >Last</span></a>");
                    }
                    else
                    {
                        ////Append Next
                        sbcontent.Append("<a href=\"javascript:PaginationDashboard(" + nextPageStartIndex + "," + nextPageNoIndex + ")\"><span class='next_point' >Next</span></a>");
                        ////Append Last
                        sbcontent.Append("<a href=\"javascript:PaginationDashboard(" + lastPageStartIndex + "," + lastPageNoIndex + ")\">Last</a>");
                    }
                }

                sbcontent.Append("<div class=\"clear\"></div>");
                sbcontent.Append("</div><span class=\"totalResult\" style=\"margin-top:3px\" >Total (" + itotalCount + ")</span> </div><div class=\"clear\"></div></div>");
            }
            catch (Exception)
            {
                throw;
            }

            return sbcontent.ToString() + "<div class='clear'></div>";
        }
    }
}

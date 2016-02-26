// <copyright file = "ForecastDashBoard.aspx.cs" company = "CTS">
// Copyright (c) OnBoarding_ForecastDashBoard. All rights reserved
// </copyright>

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp.Roles.NSSPages      
 * Page Name        : ForecastDashBoard.aspx
 * Version          : 1.0
 * Type             : Web page class file
 * Purpose          : Page For ForecastDashBoard
 * Created date     : 2012-Jan-30
 * Author           : 312539
 * Reviewed by      : Vivek,Chaitanya
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
namespace OneC.OnBoarding.WebApp.Roles.NSSPages
{
    #region Namespaces
    using System;    
    using System.Collections; 
    using System.Collections.Generic;
    using System.Data;
    using System.Diagnostics.CodeAnalysis;
    using System.IO;
    using System.Linq;    
    using System.Reflection;
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

    [SuppressMessage("StyleCop.CSharp.MaintainabilityRules", "SA1400:AccessModifierMustBeDeclared", Justification = "Reviewed.")]

    /// <summary>
    /// Initialization partial class Forecast Dashboard
    /// </summary>
    public partial class ForecastDashBoarde : System.Web.UI.Page
    {   
        #region  Object initialization

        /// <summary>
        /// Object instantiation for Utility methods
        /// </summary>
        Utility.UtilityMethods objUtil = new UtilityMethods();

        /// <summary>
        /// Object instantiation for OBUtilityMethodsClient
        /// </summary>
         [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields", Justification = "Reviewed.")]
        OBUtilityMethodsClient obj = new OBUtilityMethodsClient();

        #endregion       

        #region  Dashboard Pageing Parameters initialization

        ////Initializing dashboard candidate list limit size

        /// <summary>
        /// Page size dashboard candidates limit
        /// </summary>
        private int pageSizeDashBoardcandidates = 5;

        /// <summary>
        /// Total page display dashboard candidates limit
        /// </summary>
        private int totalPagesDisplayDashBoardcandidates = 3;

        /// <summary>
        /// Data page index dashboard candidates limit
        /// </summary>
        private int dataPageIndexDashBoardcandidates = 1;

        #endregion

        #region Page initialization

        /// <summary>
        /// Session Details
        /// </summary>
        private SessionDetails sessionDetail;

        #endregion
        
        #region WebMethod

        /// <summary>
        /// Select Box Bind Country
        /// </summary>
        /// <returns>Array List</returns>
        [WebMethod]
        public static DashboardDataDC[] BindLocation()
        {
            try
            {
               //// ForecastDashBoarde objNssDashBoard = new ForecastDashBoarde();
                DashboardDataDC objCandidateDetail = new DashboardDataDC();
                DashBoardServicesClient objDashBoardClient = new DashBoardServicesClient();
                UtilityMethods objUtil = new UtilityMethods();
                SessionHelper objSession = new SessionHelper();
                ////UserRolesList roleList = new UserRolesList();

                UserRolesList usr = (UserRolesList)objSession.GetSessionValue("RolesList");

                if (usr == null)
                {
                    usr = objUtil.GetUserRoles();  //// Getting user role list from DB if the same is not available in session 
                }

                foreach (UserRoles roleData in usr)
                {
                    if (roleData.RoleGroupId == DC.UtilityDC.RoleGroup.NSS)
                    {
                        objCandidateDetail.RoleId = roleData.RoleGroupCode;
                    }
                }

                objCandidateDetail.SessionId = objUtil.SessionDetail.SessionId;
                return (DashboardDataDC[])objDashBoardClient.GetHRSSMappedCountry(objCandidateDetail);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Select Box Bind City
        /// </summary>
        /// <param name="countryId"> Country Id </param>
        /// <param name="fromDate"> From Date </param>
        /// <param name="endDate">To Date</param>
        /// <returns>Array List</returns>
        [WebMethod]
        public static CandidateDetail[] BindCity(int countryId, DateTime fromDate, DateTime endDate)
        {
            try
            {
                CandidateDetail objCandidateDetail = new CandidateDetail();
                DashBoardServicesClient objDashBoardClient = new DashBoardServicesClient();
                objCandidateDetail.CountryID = countryId;
                objCandidateDetail.FromDate = fromDate;
                objCandidateDetail.ToDate = endDate;
                return (CandidateDetail[])objDashBoardClient.GetCity(objCandidateDetail);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Select Box Bind  WorkLocation
        /// </summary>
        /// <param name="countryId"> Country Id</param>
        /// <param name="cityId"> City Id</param>
        /// <param name="fromDate"> From Date </param>
        /// <param name="endDate"> To Date </param>
        /// <returns> Designation Data list </returns>     
        [WebMethod]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public static DesignationDataList BindWorklocation(int countryId, int cityId, DateTime fromDate, DateTime endDate)
        {
            try
            {
                CandidateDetail objCandidateDetail = new CandidateDetail();
                DesignationDataList retList = new DesignationDataList();
                objCandidateDetail.CountryID = countryId;
                objCandidateDetail.CityId = cityId;
                objCandidateDetail.FromDate = fromDate;
                objCandidateDetail.ToDate = endDate;
                using (DashBoardServicesClient objDashBoardClient = new DashBoardServicesClient())
                {
                    NssDashboardData objNssDashboardData = new NssDashboardData();
                    objNssDashboardData = objDashBoardClient.BindWorklocation(objCandidateDetail);
                    retList = objNssDashboardData.DesignationDesc;

                    foreach (DesignationData d in retList)
                    {
                        d.LocationCode.ToString();
                    }
                }

                return retList;
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Select Box Bind Designation Description
        /// </summary>
        /// <param name="countryId"> Country Id </param>
        /// <param name="cityId"> city Id </param>
        /// <param name="locationCode"> Location Code</param>
        /// <param name="fromDate"> From Date</param>
        /// <param name="endDate"> To Date</param>
        /// <returns> Array List </returns>
        [WebMethod]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public static DesignationDataList BindCandidateLevel(int countryId, int cityId, string locationCode, DateTime fromDate, DateTime endDate)
        {
            try
            {
                CandidateDetail objCandidateDetail = new CandidateDetail();
                DesignationDataList retList = new DesignationDataList();
                //// DesignationData objNssDashBoardData = new DesignationData();
                objCandidateDetail.CountryID = countryId;
                objCandidateDetail.CityId = cityId;
                objCandidateDetail.LocationCode = locationCode;
                objCandidateDetail.FromDate = fromDate;
                objCandidateDetail.ToDate = endDate;
                using (DashBoardServicesClient objDashBoardClient = new DashBoardServicesClient())
                {
                    NssDashboardData objNssDashboardData = new NssDashboardData();
                    objNssDashboardData = objDashBoardClient.GetLevel(objCandidateDetail);
                    retList = objNssDashboardData.DesignationDesc;

                    foreach (DesignationData d in retList)
                    {
                        d.Jobcode.ToString();
                    }
                }

                return retList;
            }
            catch (Exception)
            {
                throw;
            }
        }

        [SuppressMessage("StyleCop.CSharp.LayoutRules", "SA1503:CurlyBracketsMustNotBeOmitted", Justification = "Reviewed.")]

        /// <summary>
        /// // Bind Data in Table passing parameter in SP name : Get Forecast Dash Board Data
        /// </summary>
        /// <param name="gridView"> Grid View</param>
        /// <param name="loginId"> Login Id </param>
        /// <param name="candidateId"> Candidate Id</param>
        /// <param name="candidateName"> Candidate Name </param>
        /// <param name="locationCode"> Location Code </param>
        /// <param name="associateId"> Associate Id </param>
        /// <param name="cityId"> City Id </param>
        /// <param name="fromDate"> From Date </param>
        /// <param name="endDate"> To Date </param>
        /// <param name="jobCode"> Job Code </param>
        /// <param name="countryId"> Country Id </param>
        /// <param name="pageNo"> Page Number </param>
        /// <param name="laptopsele"> Laptop select </param>
        /// <returns> returning List </returns>
        [WebMethod]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", MessageId = "loginId", Justification = "Reviewed.")]
        public static string TransformXML(string gridView, string loginId, string candidateId, string candidateName, string locationCode, string associateId, int cityId, DateTime fromDate, DateTime endDate, string jobCode, int countryId, int pageNo, string laptopsele)
        {
            try
            {
                ForecastDashBoarde objNSSDashBoard = new ForecastDashBoarde();
                string selectobj = string.Empty;
                ////string strOutXml = string.Empty;         removed to fix code analysis warning
                ////CandidateDetailList objCandidateDetailList = new CandidateDetailList();         removed to fix code analysis warning
                CandidateDetail objCandidateDetail = new CandidateDetail();
                ////DesignationData objNssDashBoardData = new DesignationData();         removed to fix code analysis warning
                TotalCountDC tc = new TotalCountDC();
                CandidateDetail[] cand;
                UtilityMethods objUtil = new UtilityMethods();
                objCandidateDetail.LoginId = objUtil.SessionDetail.LoginId;

                if (!string.IsNullOrEmpty(candidateId))
                {
                    objCandidateDetail.CandidateId = Convert.ToInt32(candidateId);
                }

                if (!string.IsNullOrEmpty(associateId))
                {
                    objCandidateDetail.AssociateId = Convert.ToInt32(associateId);
                }

                objCandidateDetail.AssociateName = candidateName;
                objCandidateDetail.LocationCode = locationCode;
                objCandidateDetail.CityId = cityId;
                objCandidateDetail.FromDate = fromDate;
                objCandidateDetail.ToDate = endDate;
                objCandidateDetail.Jobcode = jobCode;
                objCandidateDetail.CountryID = countryId;
                objCandidateDetail.Excel = int.Parse(gridView);
                objCandidateDetail.PageNo = pageNo;

                if (laptopsele == "0")
                {
                    selectobj = string.Empty;
                }
                else if (laptopsele == "1")
                {
                    selectobj = "LapTop";
                }
                else if (laptopsele == "2")
                {
                    selectobj = "BlackBerry";
                }

                objCandidateDetail.ParamLapTop = selectobj;
                objCandidateDetail.PageSize = objNSSDashBoard.pageSizeDashBoardcandidates;
                objNSSDashBoard.dataPageIndexDashBoardcandidates = pageNo;
                tc.TotalCount = 0;
               //// int totalRecords = 0;
                SessionHelper objSession = new SessionHelper();
                objSession.SetSessionValue("FetchNssDetail", objCandidateDetail);

                using (DashBoardServicesClient objDashBoardClient = new DashBoardServicesClient())
                    cand = objDashBoardClient.FetchNSSData(objCandidateDetail, tc);

                if (cand != null && cand.Count() > 0)
                {
                    List<CandidateDetail> candidateDetailListColl = cand.ToList();
                    objCandidateDetail.LapTopCount = cand[0].LapTopCount;
                    objCandidateDetail.LaptopBlackBerryCount = cand[0].LaptopBlackBerryCount;
                    objSession.SetSessionValue("FetchNssData", objCandidateDetail);
                    return objNSSDashBoard.LoadData(candidateDetailListColl, tc.TotalCount) + "*#@ 1"; ////-1 added to enable export button
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
        /// LapTop and Blackberry Count
        /// </summary>
        /// <returns> return array </returns>
        [WebMethod]
        public static ArrayList LapTopBlackpBerryCount()
        {
            try
            {
                DashBoardServicesClient objDashBoardClient = new DashBoardServicesClient();
                ////CandidateDetailList objCandidateDetailList = new CandidateDetailList();
                CandidateDetail objCandidateDetail = new CandidateDetail();

                SessionHelper objSession = new SessionHelper();

                ArrayList objArray = new ArrayList();
                if (objSession.GetSessionValue("FetchNssData") != null)
                {
                    objCandidateDetail = (CandidateDetail)objSession.GetSessionValue("FetchNssDetail");

                    if (objCandidateDetail != null)
                    {
                        int lapTopCount = objCandidateDetail.LapTopCount;
                        int laptopBlackBerryCount = objCandidateDetail.LaptopBlackBerryCount;

                        objArray.Add(new { Display = "lapTopCount", Value = lapTopCount });
                        objArray.Add(new { Display = "BlackBerryCount", Value = laptopBlackBerryCount });
                    }
                    else
                    {
                        int lapTopCount = 0;
                        int laptopBlackBerryCount = 0;

                        objArray.Add(new { Display = "lapTopCount", Value = lapTopCount });
                        objArray.Add(new { Display = "BlackBerryCount", Value = laptopBlackBerryCount });
                        objSession.RemoveSessionKey("FetchNssData");
                    }

                    objDashBoardClient.Close();
                    objSession.RemoveSessionKey("FetchNssData");
                }
                else
                {
                    int lapTopCount = 0;
                    int laptopBlackBerryCount = 0;

                    objArray.Add(new { Display = "lapTopCount", Value = lapTopCount });
                    objArray.Add(new { Display = "BlackBerryCount", Value = laptopBlackBerryCount });
                    objSession.RemoveSessionKey("FetchNssData");
                }

                return objArray;
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Select Box Laptop or Blackberry
        /// </summary>
        /// <param name="fromDate"> From Date </param>
        /// <param name="endDate"> To Date </param>
        /// <returns> Candidate Detail </returns>
        [WebMethod]
        public static CandidateDetail[] Equipment(DateTime fromDate, DateTime endDate)
        {
            try
            {
                CandidateDetail objCandidateDetail = new CandidateDetail();
                DashBoardServicesClient objDashBoardClient = new DashBoardServicesClient();
                objCandidateDetail.FromDate = fromDate;
                objCandidateDetail.ToDate = endDate;
                return (CandidateDetail[])objDashBoardClient.Equipment(objCandidateDetail);
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion WebMethod
       
        #region Private & Public Methods

        /// <summary>
        /// Convert Object To XML
        /// </summary>
        /// <param name="objData"> Object data </param>
        /// <returns> return string </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", Justification = "Reviewed.")]
        public static string ConvertObjectToXML(object objData)
        {
            string retStr = string.Empty;

            BindingFlags instancePublicAndNot = BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic;
            var test = objData.GetType()
                            .GetProperties(instancePublicAndNot)
                            .OfType<MemberInfo>()
                            .Where(x => x.MemberType.Equals(MemberTypes.Property)
                                    && objData.GetType().GetProperty(x.Name.ToString()).GetValue(objData, null) != null
                                    && objData.GetType().GetProperty(x.Name.ToString()).GetValue(objData, null).ToString() != "0")
                           .Select(x => new XElement(x.Name.Trim().ToString(), objData.GetType().GetProperty(x.Name.Trim().ToString()).GetValue(objData, null)).ToString())
                           .ToArray();

            string typeName = objData.GetType().ToString();

            /*   if(typeName.Contains("."))
                   typeName = typeName.Split('.')[typeName.Split('.').GetUpperBound(0)].ToString();
              // string xmlString = " xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema";
               retStr = "<" + typeName +  ">" + string.Join("", test).ToString() + "</" + typeName + ">";
              // retStr = "<?xml version='1.0' encoding='utf-16'?>" + retStr  ;*/

            retStr = string.Join(string.Empty, test).ToString();
            return retStr;
        }

        /// <summary>
        ///  Export Excel Data
        /// </summary>
        /// <param name="candidateDetails">Candidate Details</param>
        /// <returns>string excel report</returns>
         [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
         [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", Justification = "Reviewed.")]
        public DataTable Cover(List<CandidateDetail> candidateDetails)            
        {
            try
            {
            DataTable dtExportToexcel = new DataTable();

            dtExportToexcel.Columns.Add("CandidateId", typeof(long));
            dtExportToexcel.Columns.Add("FullName", typeof(string));
            dtExportToexcel.Columns.Add("JobLevel", typeof(string));
            //// dtExportToexcel.Columns.Add("OwningDepartment", typeof(string));
            dtExportToexcel.Columns.Add("RequestingDepartment", typeof(string));
            dtExportToexcel.Columns.Add("SO WorkLocation", typeof(string));
            dtExportToexcel.Columns.Add("ESAWorkLocation", typeof(string));
            dtExportToexcel.Columns.Add("ProjectName", typeof(string));
            dtExportToexcel.Columns.Add("AssociateId", typeof(string));
            dtExportToexcel.Columns.Add("City", typeof(string));
            dtExportToexcel.Columns.Add("ExpectedDOJ", typeof(string));
            dtExportToexcel.Columns.Add("OfferExtendedDate", typeof(string));
            dtExportToexcel.Columns.Add("DepartmentGroup", typeof(string));
            dtExportToexcel.Columns.Add("PracticeName", typeof(string));
            dtExportToexcel.Columns.Add("LapTop", typeof(string));
            dtExportToexcel.Columns.Add("BlackBerry", typeof(string));
         
            foreach (CandidateDetail candidate in candidateDetails)
            {
                DataRow dr = dtExportToexcel.NewRow();
                dr["CandidateId"] = candidate.CandidateId;
                dr["FullName"] = candidate.AssociateName;
                dr["JobLevel"] = candidate.DesignationDesc;
               //// dr["OwningDepartment"] = candidate.DepartmentName;
                dr["RequestingDepartment"] = candidate.DepartmentDesc;
                if (candidate.AssociateId != 0)
                {
                    dr["AssociateId"] = candidate.AssociateId;
                }
                else
                {
                    dr["AssociateId"] = string.Empty;
                }

                dr["SO WorkLocation"] = candidate.ESAWorkLocation;
                dr["City"] = candidate.CityName;
                dr["ProjectName"] = candidate.ProjectName;
                dr["DepartmentGroup"] = candidate.DepartmentGroup;
                dr["ESAWorkLocation"] = candidate.ESAWorkLocation;
                dr["OfferExtendedDate"] = candidate.OfferExtendDate;
                dr["ExpectedDOJ"] = candidate.DOJ;
                dr["RequestingDepartment"] = candidate.DepartmentDesc;
                dr["PracticeName"] = candidate.PracticeName;
                if (!string.IsNullOrEmpty(candidate.LapTop))
                {
                    dr["LapTop"] = candidate.LapTop;
                }
                else
                { 
                    dr["LapTop"] = string.Empty; 
                }

                if (!string.IsNullOrEmpty(candidate.BlackBerry))
                {
                    dr["BlackBerry"] = candidate.BlackBerry;
                }
                else
                { 
                    dr["BlackBerry"] = string.Empty; 
                }

                dtExportToexcel.Rows.Add(dr);
            }
         
            return dtExportToexcel;           
             }
            catch (Exception)
            {
                throw;
            }
        }
         
        /// <summary>
        ///  Table Bind CandidateDetail
        /// </summary>
        /// <param name="objCandidateDetailList"> Candidate Detail list </param>
        /// <param name="totalRecords"> Total Records </param>
        /// <returns>string data</returns>
          [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public string LoadData(List<CandidateDetail> objCandidateDetailList, int totalRecords)
        {
            //// transform the personnel.xml file to HTML
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
            transform.Load(HttpContext.Current.Server.MapPath("DashBoardBindGrid.xslt"), resolver);
            ////transform.Load("..\\DashBoardGrid.xslt", resolver);

            //// perform the transformation
            XPathDocument doc = new XPathDocument(new StringReader(strOutXml));

            transform.Transform(doc, null, stringWriter, resolver);

            string pagination = " </div><div id=\"CommentsPaginationDiv\">" + this.DoPagingForDashboard(totalRecords) + "</div>";
            string strPage = strStartHtml + stringWriter.ToString() + pagination;
            ////   string str ="<tr> <th class=\"sno\">S no.</th><th class=\"c_name\">Candidate Name</th> <th class=\"l_id\" >Login Id</th><th class=\"level\" >Level</th><th class=\"r_name\">Recruiter Name(ID)</th><th class=\"o_status\">Offer Status</th><th class=\"p_work\">Paperwork</th> </tr>";
            return strPage;
        }              
       
        #endregion 

        #region PageLoad

        /// <summary>
        /// Page Load
        /// </summary>
        /// <param name="sender"> Sender object </param>
        /// <param name="e"> Event arguments </param>
        protected void Page_Load(object sender, EventArgs e)
        {
            if (this.sessionDetail == null)
            {
                this.sessionDetail = this.objUtil.SessionDetail;
            }

            if (!this.IsPostBack)
            {
                try
                {
                    ////OBUtilityMethodsClient obj = new OBUtilityMethodsClient();
                    ////SystemKey sysKey = new SystemKey();
                    ////DashBoard objDC = new DashBoard();

                    ////sysKey.KeyId = 25;
                    ////sysKey = obj.GetSystemKey(sysKey);
                    ////DateTime dtStartDate = DateTime.Today.AddDays(Convert.ToInt16(sysKey.KeyValue));//DateTime.Today.AddDays(Convert.ToInt16(objDC.StartDate)) ;

                    ////sysKey.KeyId = 26;
                    ////sysKey = obj.GetSystemKey(sysKey);
                    ////DateTime dtEndDate = DateTime.Today.AddDays(Convert.ToInt16(sysKey.KeyValue));//DateTime.Today.AddDays(Convert.ToInt16(objDC.EndDate));

                    //// hdnStartDate.Value = dtStartDate.ToShortDateString();
                    this.DOJFromInputBox.Attributes.Add("readonly", "readonly");
                    ////   hdnEndDate.Value = dtEndDate.ToShortDateString();
                    this.DOJToInputBox.Attributes.Add("readonly", "readonly");

                    CandidateDetail objCandidateDetail = new CandidateDetail();
                    objCandidateDetail.LoginId = this.sessionDetail.LoginId;
                }
                catch (Exception ex)
                {
                    ErrorLogger logger = new ErrorLogger(this.sessionDetail.SessionId);
                    logger.LogError(ex);
                }
            }
        }
        #endregion

        #region ExportExcel
                
        /// <summary>
        /// Added by : 312539 
        /// Date : 10-08-2012
        /// Export Excel ClickEvent Dynamic get column excel report.
        /// </summary>
        /// <param name="sender"> sender object </param>
        /// <param name="e"> Event arguments</param>
        protected void ExportButton_Click(object sender, EventArgs e)
        {
            try
            {
                CandidateDetail objCandidateDetail = new CandidateDetail();
                DataSet dsExportToExcel = new DataSet();
                SessionHelper objSession = new SessionHelper();
                TotalCountDC tc = new TotalCountDC();
                if (objSession.GetSessionValue("FetchNssDetail") != null)
                {
                    objCandidateDetail = (CandidateDetail)objSession.GetSessionValue("FetchNssDetail");
                    objCandidateDetail.Excel = 1;
                    objCandidateDetail.PageNo = 1;
                    tc.TotalCount = 0;
                    ////int totalRecords = 0;

                    using (DashBoardServicesClient objDashBoardClient = new DashBoardServicesClient())
                    {
                        dsExportToExcel = objDashBoardClient.ForcasteDashboardExcelReport(objCandidateDetail, tc);
                    }

                    if ((dsExportToExcel != null) && (dsExportToExcel.Tables[5].Rows.Count > 0))
                    {
                        DataTable dtExportToExcel0 = dsExportToExcel.Tables[0];
                        dsExportToExcel.Tables.Remove(dtExportToExcel0);

                        DataTable dtExportToExcel1 = dsExportToExcel.Tables[0];
                        dsExportToExcel.Tables.Remove(dtExportToExcel1);

                        DataTable dtExportToExcel2 = dsExportToExcel.Tables[0];
                        dsExportToExcel.Tables.Remove(dtExportToExcel2);

                        DataTable dtExportToExcel3 = dsExportToExcel.Tables[0];
                        dsExportToExcel.Tables.Remove(dtExportToExcel3);

                        DataTable dtExportToExcel4 = dsExportToExcel.Tables[0];
                        dsExportToExcel.Tables.Remove(dtExportToExcel4);

                        DataTable dtExportToExcel5 = dsExportToExcel.Tables[0];
                        dsExportToExcel.Tables.Remove(dtExportToExcel5);
                        ExportToExcel.ExportDatasetToExcel(dsExportToExcel, "Results");
                    }
                }
            }
            catch (System.Threading.ThreadAbortException)
            {
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(this.sessionDetail.SessionId);
                logger.LogError(ex);
            }
        }
        ////protected void ExportButton_Click(object sender, EventArgs e)
        ////{  
        ////    try
        ////  {
        ////    CandidateDetail objCandidateDetail = new CandidateDetail();
        ////    DashBoardServicesClient objDashBoardClient = new DashBoardServicesClient();
        ////    SessionHelper objSession = new SessionHelper();
        ////        if (objSession.GetSessionValue("FetchNssDetail") != null)
        ////        {
        ////            objCandidateDetail = ((CandidateDetail)objSession.GetSessionValue("FetchNssDetail"));
        ////            objCandidateDetail.Excel = 1;
        ////            objCandidateDetail.PageNo = 1;
        ////            CandidateDetail[] cand;
        ////            int totalRecords = 0;
        ////            cand = objDashBoardClient.FetchNSSData(objCandidateDetail, ref totalRecords);

        ////            if (cand.Count() > 0)
        ////            {
        ////                DataSet dsExportToExcel = new DataSet();
        ////                dsExportToExcel.Tables.Add(Cover(cand.ToList()));
        ////                ExportToExcel.ExportDatasetToExcel(dsExportToExcel, "Results");
        ////            }
        ////        }
        ////     }
        ////    catch (Exception)
        ////    {
        ////        throw;
        ////    }
        ////    finally
        ////    { }
        ////}
        #endregion
              
        #region Private and public methods continution

        /// <summary>
        /// show Paging ForDashboard
        /// </summary>
        /// <param name="totalCount"> Total Count</param>
        /// <returns> Dash board data </returns>
        private string DoPagingForDashboard(int totalCount)
        {
            if (totalCount.Equals(0))
            {
                return string.Empty;
            }

            int ipagesCount = totalCount / this.pageSizeDashBoardcandidates;
            int iremainder = totalCount % this.pageSizeDashBoardcandidates;
            StringBuilder sbcontent = new StringBuilder(string.Empty, 800);

            try
            {
                ////Bind First
                int ifirstPageNoIndex = 1;
                int ifirstPageStartIndex = 0;

                ////Bind Last
                int ilastPageNoIndex = 1;
                int ilastPageStartIndex = 0;
                if (iremainder == 0)
                {
                    ilastPageNoIndex = totalCount / this.pageSizeDashBoardcandidates;
                    ilastPageStartIndex = ((totalCount / this.pageSizeDashBoardcandidates) * this.pageSizeDashBoardcandidates) - this.pageSizeDashBoardcandidates;
                }
                else
                {
                    ilastPageNoIndex = (totalCount / this.pageSizeDashBoardcandidates) + 1;
                    ilastPageStartIndex = (totalCount / this.pageSizeDashBoardcandidates) * this.pageSizeDashBoardcandidates;
                }

                ////Bind Prev
                int iprevPageNoIndex = this.dataPageIndexDashBoardcandidates - 1;
                int iprevPageStartIndex = (iprevPageNoIndex * this.pageSizeDashBoardcandidates) - this.pageSizeDashBoardcandidates;
                if (iprevPageNoIndex <= ifirstPageNoIndex)
                {
                    iprevPageNoIndex = ifirstPageNoIndex;
                    iprevPageStartIndex = ifirstPageStartIndex;
                }

                ////Bind Next
                int inextPageNoIndex = this.dataPageIndexDashBoardcandidates + 1;
                int inextPageStartIndex = (inextPageNoIndex * this.pageSizeDashBoardcandidates) - this.pageSizeDashBoardcandidates;
                if (inextPageNoIndex >= ilastPageNoIndex)
                {
                    inextPageNoIndex = ilastPageNoIndex;
                    inextPageStartIndex = ilastPageStartIndex;
                }

                ////Bind number of pages to display
                int iprevPageCount = this.dataPageIndexDashBoardcandidates - (this.totalPagesDisplayDashBoardcandidates / 2);
                int inextPageCount = this.dataPageIndexDashBoardcandidates + (this.totalPagesDisplayDashBoardcandidates / 2);
                if (iprevPageCount <= 0)
                {
                    iprevPageCount = ifirstPageNoIndex;
                    inextPageCount = ifirstPageNoIndex + this.totalPagesDisplayDashBoardcandidates - 1;
                }

                if (inextPageCount >= ilastPageNoIndex)
                {
                    inextPageCount = ilastPageNoIndex;
                    iprevPageCount = ilastPageNoIndex - this.totalPagesDisplayDashBoardcandidates + 1;
                }

                sbcontent.Append("<div class=\"pagination\">");
                sbcontent.Append("<div class=\"btn_pagination\">");
                sbcontent.Append("<div class=\"flt_right\">");

                if ((ipagesCount > 0) && (totalCount > this.pageSizeDashBoardcandidates))
                {
                    if (this.dataPageIndexDashBoardcandidates == 1)
                    {
                        sbcontent.Append("<span class='active_point' >First</span></a>");
                        sbcontent.Append("<span class='active_point' >Previous</span></a>");
                    }
                    else
                    {
                        ////Append First
                        sbcontent.Append("<a href=\"javascript:PaginationDashboard(" + ifirstPageStartIndex + "," + ifirstPageNoIndex + ")\">First</a>");
                        sbcontent.Append("<a href=\"javascript:PaginationDashboard(" + iprevPageStartIndex + "," + iprevPageNoIndex + ")\"><span class='prev_point' >Previous</span></a>");
                    }

                    for (int i = iprevPageCount; i <= inextPageCount; i++)
                    {
                        if (i >= ifirstPageNoIndex && i <= ilastPageNoIndex)
                        {
                            int istartIndex = (i * this.pageSizeDashBoardcandidates) - this.pageSizeDashBoardcandidates;
                            if (i.Equals(this.dataPageIndexDashBoardcandidates))
                            {
                                sbcontent.Append("<span class='active_point'>" + i.ToString() + "</span>");
                            }
                            else
                            {
                                sbcontent.Append("<a href=\"javascript:PaginationDashboard(" + istartIndex.ToString() + "," + i.ToString() + ")\">" + i.ToString() + "</a>");
                            }
                        }
                    }

                    if (this.dataPageIndexDashBoardcandidates == ilastPageNoIndex)
                    {
                        sbcontent.Append("<span class='active_point' >Next</span></a>");
                        sbcontent.Append("<span class='active_point' >Last</span></a>");
                    }
                    else
                    {
                        ////Append Next
                        sbcontent.Append("<a href=\"javascript:PaginationDashboard(" + inextPageStartIndex + "," + inextPageNoIndex + ")\"><span class='next_point' >Next</span></a>");

                        ////Append Last
                        sbcontent.Append("<a href=\"javascript:PaginationDashboard(" + ilastPageStartIndex + "," + ilastPageNoIndex + ")\">Last</a>");
                    }
                }

                sbcontent.Append("<div class=\"clear\"></div>");
                sbcontent.Append("</div><span class=\"totalResult\" style=\"margin-top:3px\" >Total (" + totalCount + ")</span> </div><div class=\"clear\"></div></div>");
            }
            catch
            {
                throw;
            }

            return sbcontent.ToString() + "<div class='clear'></div>";
        }
        #endregion
    }
}
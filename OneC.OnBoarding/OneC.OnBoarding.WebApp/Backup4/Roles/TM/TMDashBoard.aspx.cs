// <copyright file = "TMDashboard.aspx.cs" company = "CTS">
// Copyright (c) OnBoarding_TMDashboard. All rights reserved.
// </copyright>

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp.Roles.TM       
 * Page Name        : TMDashBoard.aspx
 * Version          : 1.0
 * Type             : Web page class file
 * Purpose          : Page For TM DashBoard
 * Created date     : 2012-Mar-25
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

namespace OneC.OnBoarding.WebApp.Roles.TM
{
    #region Namespaces
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.ComponentModel;
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

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields", MessageId = "obj", Justification = "Reviewed.")]
    [SuppressMessage("StyleCop.CSharp.DocumentationRules", "SA1600:ElementsMustBeDocumented", Justification = "Reviewed.")]

    /// <summary>
    /// Class for TMDashboard
    /// </summary>
    public partial class TMDashboard : System.Web.UI.Page
    { 
        #region Page initialization
        private SessionDetails sessionDetail;
        #endregion

        #region Dashboard parameters initialization
        ////Initializing dashboard candidate list limit size
        private int pageSizeDashBoardcandidates = 5;
        private int totalPagesDisplayDashBoardcandidates = 3;
        private int dataPageIndexDashBoardcandidates = 1;
        #endregion

        #region TaskDetails
        private int ipageSizeTask = 5;
        private int itotalPagesDisplayTask = 1;
        private int idataPageIndexPendingTask = 1;
        #endregion

        /* Initializing global object for Utility class to access utility methods if required */
        [SuppressMessage("StyleCop.CSharp.MaintainabilityRules", "SA1400:AccessModifierMustBeDeclared", Justification = "Reviewed.")]
        Utility.UtilityMethods objUtil = new UtilityMethods();
        [SuppressMessage("StyleCop.CSharp.MaintainabilityRules", "SA1400:AccessModifierMustBeDeclared", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields", Justification = "Reviewed.")]
        OBUtilityMethodsClient obj = new OBUtilityMethodsClient();
        [SuppressMessage("StyleCop.CSharp.MaintainabilityRules", "SA1400:AccessModifierMustBeDeclared", Justification = "Reviewed.")]
        SessionHelper objSession = new SessionHelper();

        #region WebMethods
        /// <summary>
        /// Binds the Candidate type 
        /// </summary>
        /// <returns> candidate type </returns>
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
            ////finally
            ////{ 
            ////}
        }

        /// <summary>
        /// Binds Country for TM
        /// </summary>
        /// <returns> country list </returns>
        [WebMethod]
        public static DashboardDataDC[] BindCountry()
        {
            try
            {
                DashBoardServicesClient objDashBoardClient = new DashBoardServicesClient();
                ////TMDashboard objTMDashBoard = new TMDashboard();
                DashboardDataDC objCandidateDetail = new DashboardDataDC();
                Utility.UtilityMethods objUtil = new UtilityMethods();
                objCandidateDetail.SessionId = objUtil.SessionDetail.SessionId;
                SessionHelper objSession = new SessionHelper();
                UserRolesList usr = (UserRolesList)objSession.GetSessionValue("RolesList");
                if (usr == null)
                { 
                    usr = objUtil.GetUserRoles();  //// Getting user role list from DB if the same is not available in session 
                }

                foreach (UserRoles roleData in usr)
                {
                    if (roleData.RoleGroupId == DC.UtilityDC.RoleGroup.TM)
                    {
                        objCandidateDetail.RoleId = roleData.RoleGroupCode;
                    }
                }

                return (DashboardDataDC[])objDashBoardClient.GetHRSSMappedCountry(objCandidateDetail);
            }
            catch (Exception)
            {
                throw;
            }
            ////finally
            ////{ 
            ////}
        }

        /// <summary>
        /// Method for Transform XML
        /// </summary>
        /// <param name="gridView"> grid View </param>
        /// <param name="processId"> process Id </param>
        /// <param name="pageNo"> page No </param>
        /// <param name="candidateID"> candidate ID </param>
        /// <param name="name"> name value </param>
        /// <param name="recruiterID"> recruiter ID </param>
        /// <param name="emailID"> email ID </param>
        /// <param name="requisition"> requisition value </param>
        /// <param name="candidateType"> candidate Type </param>
        /// <param name="fromDate"> from date </param>
        /// <param name="endDate"> to date </param>
        /// <param name="country"> country name </param>
        /// <param name="departmentCode"> department Code </param>
        /// <returns> returns XML </returns>
        [WebMethod]
        public static string TransformXML(string gridView, string processId, string pageNo, string candidateID, string name, string recruiterID, string emailID, string requisition, int candidateType, DateTime fromDate, DateTime endDate, int country, string departmentCode)
        {
            try
            {
                TMDashboard objTMDashBoard = new TMDashboard();
                ////CandidateDetailList objCandidateDetailList = new CandidateDetailList();
                CandidateDetail objCandidateDetail = new CandidateDetail();
                TotalCountDC tc = new TotalCountDC();
                CandidateDetail[] cand;
                Utility.UtilityMethods objUtil = new UtilityMethods();
                objCandidateDetail.SessionId = objUtil.SessionDetail.SessionId;
                SessionHelper objSession = new SessionHelper();
                UserRolesList usr = (UserRolesList)objSession.GetSessionValue("RolesList");
                if (usr == null)
                { 
                    usr = objUtil.GetUserRoles();  //// Getting user role list from DB if the same is not available in session 
                }

                foreach (UserRoles roleData in usr)
                {
                    if (roleData.RoleGroupId == DC.UtilityDC.RoleGroup.TM)
                    {
                        objCandidateDetail.RoleId = roleData.RoleGroupCode; ////roleData.RoleDetailId;
                    }
                }

                if (!string.IsNullOrEmpty(candidateID))
                { 
                    objCandidateDetail.CandidateId = Convert.ToInt64(candidateID);
                }

                objCandidateDetail.RecruiterID = string.IsNullOrEmpty(recruiterID) ? -1 : int.Parse(recruiterID);
                objCandidateDetail.CandidateEmailId = emailID;
                objCandidateDetail.Requisition = requisition;
                objCandidateDetail.CandidateType = candidateType;
                objCandidateDetail.ProcessID = int.Parse(processId);
                objCandidateDetail.DepartmentCode = departmentCode;
                objCandidateDetail.CountryID = country;
                objCandidateDetail.FromDate = fromDate;
                objCandidateDetail.ToDate = endDate;
                objCandidateDetail.CandidateFName = name;
                objCandidateDetail.Excel = int.Parse(gridView);
                objCandidateDetail.PageNo = int.Parse(pageNo);
                objCandidateDetail.PageSize = objTMDashBoard.pageSizeDashBoardcandidates;
                objTMDashBoard.dataPageIndexDashBoardcandidates = int.Parse(pageNo);
                tc.TotalCount = 0;
                ////int totalRecords = 0;
                objSession.SetSessionValue("CandidateDetail", objCandidateDetail);
                using (DashBoardServicesClient objDashBoardClient = new DashBoardServicesClient())
                {
                    cand = objDashBoardClient.FetchRCData(objCandidateDetail, tc);
                }

                if (cand != null && cand.Count() > 0)
                {
                    tc.TotalCount = cand[0].TotalCount;
                    List<CandidateDetail> candidateDetailListColl = cand.ToList();
                    return objTMDashBoard.LoadData(candidateDetailListColl, tc.TotalCount) + "*#@ 1"; ////-1 added to enable export button
                }
                else if (objCandidateDetail.CountryID == -1)
                {
                    return "<div class=\"footer_rc_invalid\"> <p>Oops!!! No countries Mapped!</p> </div>" + " *#@ 0";
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
            ////finally
            ////{ 
            ////}
        }

        /// <summary>
        /// pagination for Tasks
        /// </summary>
        /// <param name="startIndex"> start Index </param>
        /// <param name="pageNo"> page NO </param>
        /// <returns> page details </returns>
        [WebMethod]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", MessageId = "startIndex", Justification = "Reviewed.")]
        public static string PersonalDataTaskPagination(int startIndex, int pageNo)
        {
            try
            {
                SessionHelper objSession = new SessionHelper();
                CandidateDetail candidateDetails = (CandidateDetail)objSession.GetSessionValue("Task");
                candidateDetails.PageNo = pageNo;
                TMDashboard objTMPage = new TMDashboard();
                candidateDetails.PageSize = objTMPage.ipageSizeTask;
                //// objCandidateDetail.PageSize = objTMDashBoard.ipageSizeDashBoardcandidates;
                objTMPage.idataPageIndexPendingTask = pageNo;
                objSession.SetSessionValue("PaginationTask", pageNo);
                return objTMPage.LoadPersonalDetails(candidateDetails);
            }
            catch (Exception)
            {
                throw;
            }
            ////finally
            ////{ 
            ////}
        }

        /// <summary>
        /// to Clear the existing session
        /// </summary>
        [WebMethod]
        public static void ClearSession()
        {
            SessionHelper objSession = new SessionHelper();
            objSession.RemoveSessionKey("PaginationTask");
            objSession.RemoveSessionKey("Task");
            objSession.RemoveSessionKey("CandidateDetail");
        }

        /// <summary>
        /// sub function to bind drill down
        /// </summary>
        /// <param name="candidateID"> candidate ID </param>
        /// <param name="processId"> process ID </param>
        /// <returns> drill down data </returns>
        [WebMethod]
        public static string PersonalData(long candidateID, int processId)
        {
            try
            {
                SessionHelper objSession = new SessionHelper();
                TMDashboard objTMPage = new TMDashboard();
                CandidateDetail objCandidateDetail = new CandidateDetail();
                objCandidateDetail.CandidateId = candidateID;
                objCandidateDetail.ProcessID = processId;
                objCandidateDetail.RoleId = DC.UtilityDC.RoleGroup.TM.GetHashCode().ToString();
                objCandidateDetail.PageNo = objTMPage.idataPageIndexPendingTask;
                objCandidateDetail.PageSize = objTMPage.ipageSizeTask;
                objSession.SetSessionValue("Task", objCandidateDetail);
                //// HttpContext.Current.Session.Add("Task", objCandidateDetail);
                return objTMPage.LoadPersonalDetails(objCandidateDetail);
            }
            catch (Exception)
            {
                throw;
            }
            ////finally
            ////{ 
            ////}
        }

        /// <summary>
        /// Updates DOJ , offer status email for a candidate
        /// </summary>
        /// <param name="candidate"> candidate ID </param>
        /// <param name="candidateDOJ"> candidate DOJ </param>
        /// <param name="offerStatus"> offer Status </param>
        /// <param name="emailId"> email Id </param>
        /// <param name="resendMail"> resend Mail </param>
        /// <returns> candidate details </returns>
        [WebMethod]
        public static string UpdatePersonalData(long candidate, string candidateDOJ, string offerStatus, string emailId, short resendMail)
        {
            try
            {
                CandidateDetail objCand = new CandidateDetail();
                Utility.UtilityMethods objUtil = new UtilityMethods();
                SessionDetails sessionDetail = new SessionDetails();
                sessionDetail = objUtil.SessionDetail;
                objCand.CandidateId = candidate;
                if (!string.IsNullOrEmpty(offerStatus))
                { 
                    objCand.CandidateOfferStatus = short.Parse(offerStatus);
                }

                if (!string.IsNullOrEmpty(candidateDOJ))
                { 
                    objCand.CandidateDOJ = candidateDOJ;
                }

                objCand.CandidateEmailId = emailId;
                objCand.ResendMail = resendMail;
                string sessionId = sessionDetail.SessionId.ToString();
                objCand.SessionId = long.Parse(sessionId);
                using (DashBoardServicesClient objDashBoardServicesClient = new DashBoardServicesClient()) 
                {
                    objDashBoardServicesClient.UpdateCandidateDetails(objCand);
                }

                TMDashboard objTM = new TMDashboard();
                SessionHelper objSessionHelper = new SessionHelper();
                return objTM.LoadPersonalDetails((CandidateDetail)objSessionHelper.GetSessionValue("CandidateDetails"));
            }
            catch (Exception)
            {
                throw;
            }
            ////finally
            ////{ 
            ////}
        }

        ///// <summary>
        ///// Used to unlock candidate access
        ///// </summary>
        ///// <param name="Candidate"></param>
        ///// <param name="CountryId"></param>
        ///// <returns></returns>
        ////[WebMethod]
        ////public static string UnlockCandidateAccess(Int64 candidate, Int16 countryId)
        ////{
        ////    try
        ////    {
        ////        CandidateDetail objCand = new CandidateDetail();
        ////        objCand.CandidateId = candidate;
        ////        objCand.CountryID = countryId;
        ////        TMDashBoard objTM = new TMDashBoard();
        ////        using (DashBoardServicesClient objDashBoardServicesClient = new DashBoardServicesClient())
        ////        {
        ////            objDashBoardServicesClient.UnlockCandidateAccess(objCand);
        ////        }
        ////        SessionHelper objSessionHelper = new SessionHelper();
        ////        return objTM.LoadPersonalDetails(((CandidateDetail)objSessionHelper.GetSessionValue("CandidateDetails")));
        ////    }
        ////    catch (Exception)
        ////    {
        ////        throw;
        ////    }
        ////    finally
        ////    { }
        ////}

        /// <summary>
        /// To update candidate joining status
        /// </summary>
        /// <param name="candidate"> candidate ID </param>
        /// <param name="joiningStatus"> joining status </param>
        /// <returns> returns status </returns>
        [WebMethod]
        public static string UpdateCandidateJoiningStatusDetails(long candidate, string joiningStatus)
        {
            try
            {
                DashBoardServicesClient obj = new DashBoardServicesClient();
                CandidateDetail objCand = new CandidateDetail();
                SessionDetails sessionDetail = new SessionDetails();
                Utility.UtilityMethods objUtil = new UtilityMethods();
                sessionDetail = objUtil.SessionDetail;
                //// var candidateId = HttpContext.Current.Request.Form["hdnCandidateid"].ToString();
                objCand.CandidateId = candidate;
                if (!string.IsNullOrEmpty(joiningStatus))
                { 
                    objCand.CandidateJoiningStatus = short.Parse(joiningStatus);
                }

                string sessionId = sessionDetail.SessionId.ToString();
                objCand.SessionId = long.Parse(sessionId);
                using (DashBoardServicesClient objDashBoardServicesClient = new DashBoardServicesClient())
                {
                    obj.UpdateCandidateJoiningStatusDetails(objCand);
                }

                TMDashboard objTM = new TMDashboard();
                SessionHelper objSessionHelper = new SessionHelper();
                return objTM.LoadPersonalDetails((CandidateDetail)objSessionHelper.GetSessionValue("CandidateDetails"));
            }
            catch (Exception)
            {
                throw;
            }
            ////finally
            ////{ 
            ////}
        }

        /// <summary>
        /// Binds Department for TM
        /// </summary>
        /// <param name="country"> country name </param>
        /// <returns> returns department </returns>
        [WebMethod]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public static DepartmentDataList BindDepartment(int country)
        {
            try
            {
                DepartmentDataList retList = new DepartmentDataList();
                ////DepartmentData objDepartmentData = new DepartmentData();                
                CandidateDetail objCandidate = new CandidateDetail();
                SessionDetails sessionDetail = new SessionDetails();
                Utility.UtilityMethods objUtil = new UtilityMethods();
                sessionDetail = objUtil.SessionDetail;
                SessionHelper objSession = new SessionHelper();
                UserRolesList usr = (UserRolesList)objSession.GetSessionValue("RolesList");
                string sessionId = sessionDetail.SessionId.ToString();
                if (usr == null)
                { 
                    usr = objUtil.GetUserRoles();  //// Getting user role list from DB if the same is not available in session 
                }

                foreach (UserRoles roleData in usr)
                {
                    if (roleData.RoleGroupId == DC.UtilityDC.RoleGroup.TM)
                    {
                        objCandidate.RoleId = roleData.RoleGroupCode; 
                    }
                }

                objCandidate.SessionId = long.Parse(sessionId);
                objCandidate.CountryID = country;
                using (DashBoardServicesClient objDashBoardClient = new DashBoardServicesClient())
                {
                    TMDashboardData objTMDashboardData = new TMDashboardData();
                    objTMDashboardData = objDashBoardClient.GetDepartment(objCandidate);
                    retList = objTMDashboardData.DepartmentName;

                    foreach (DepartmentData d in retList)
                    {
                        d.DepartmentCode.ToString();
                    }
                }

                return retList;
            }
            catch (Exception)
            {
                throw;
            }
            ////finally
            ////{ 
            ////}
        }

        #endregion
        #region Private & Public Methods
        /// <summary>
        /// sub function to bind drill down
        /// </summary>
        /// <param name="objCandidateDetail"> object Candidate Detail </param>
        /// <returns> drill down data </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", MessageId = "obj", Justification = "Reviewed.")]
        public string LoadPersonalDetails(CandidateDetail objCandidateDetail)
        {
            //// Create a resolver with default credentials.
            SessionHelper objSessionHelper = new SessionHelper();
            objSessionHelper.SetSessionValue("CandidateDetails", objCandidateDetail);
            XmlUrlResolver resolver = new XmlUrlResolver();
            resolver.Credentials = System.Net.CredentialCache.DefaultCredentials;
            TMDashboard objTMPage = new TMDashboard();
            //// transform the personnel.xml file to HTML
            XslTransform transform = new XslTransform();
            string strOutXml = string.Empty;
            CandidateTask objCandidateTask = new CandidateTask();
            using (DashBoardServicesClient obj = new DashBoardServicesClient())
            {
                objCandidateTask = obj.FetchCandidateData(objCandidateDetail);
            }

            CandidateDetail candDetail = objCandidateTask.CandidateDetails;
            OfferStatusList offerStatus = objCandidateTask.OfferStatusMaster;
            List<TaskDetail> candTask = objCandidateTask.TaskDetails;
            JoiningStatusList joiningStatus = objCandidateTask.JoiningStatusMaster;
            int totalRecords = 0;
            if (candTask.Count() > 0)
            {
                totalRecords = candTask[0].TotalRecords;
            }

            strOutXml = DashboardUtility.ConvertObjectToXML(candDetail);
            if (offerStatus.Count != 0)
            {
                strOutXml = strOutXml + DashboardUtility.Serialize<OfferStatusList>(offerStatus);
            }

            if (candTask.Count != 0)
            {
                strOutXml = strOutXml + DashboardUtility.Serialize<List<TaskDetail>>(candTask);
            }

            if (joiningStatus.Count != 0)
            {
                strOutXml = strOutXml + DashboardUtility.Serialize<JoiningStatusList>(joiningStatus);
            }

            StringWriter stringWriterPersonalData = new StringWriter();
            strOutXml = strOutXml.Replace("<?xml version=\"1.0\" encoding=\"utf-16\"?>", string.Empty);
            strOutXml = "<CandidateTask>" + strOutXml + "</CandidateTask>";
            strOutXml = strOutXml.Replace("<?xml version=\"1.0\" encoding=\"utf-16\"?>", string.Empty);
            XmlDocument xmldoc = new XmlDocument();
            xmldoc.LoadXml(strOutXml);
            //// load up the stylesheet
            transform.Load(HttpContext.Current.Server.MapPath("TMDrillDownTemplate.xslt"), resolver);
            //// perform the transformation
            XPathDocument doc = new XPathDocument(new StringReader(strOutXml));
            if (objSessionHelper.GetSessionValue("PaginationTask") != null)
            {
                objTMPage.idataPageIndexPendingTask = (int)objSessionHelper.GetSessionValue("PaginationTask");
            }

            transform.Transform(doc, null, stringWriterPersonalData, resolver);
            string formattedString = stringWriterPersonalData.ToString().Replace("<div id=\"paginationTask\">", " <div id=\"paginationTask\">" + objTMPage.DoPagingForTasks(totalRecords));
            return formattedString.ToString();
        }

        /// <summary>
        /// Binds the candidate details
        /// </summary>
        /// <param name="objCandidateDetailList"> detail list </param>
        /// <param name="totalRecords"> total records </param>
        /// <returns> candidate details </returns>
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
            //// doc.Add(new XElement("root", retCand.Select(x => new XElement("Data", x))));
            XmlDocument xmldoc = new XmlDocument();
            xmldoc.LoadXml(strOutXml);
            //// load up the stylesheet
            transform.Load(HttpContext.Current.Server.MapPath("TMDashBoardGrid.xslt"), resolver);
            //// perform the transformation
            XPathDocument doc = new XPathDocument(new StringReader(strOutXml));
            transform.Transform(doc, null, stringWriter, resolver);
            string pagination = " </div><div id=\"CommentsPaginationDiv\">" + this.DoPagingForDashboard(totalRecords) + "</div>";
            string strPage = strStartHtml + stringWriter.ToString() + pagination;
            //// string str ="<tr> <th class=\"sno\">S no.</th><th class=\"c_name\">Candidate Name</th> <th class=\"l_id\" >Login Id</th><th class=\"level\" >Level</th><th class=\"r_name\">Recruiter Name(ID)</th><th class=\"o_status\">Offer Status</th><th class=\"p_work\">Paperwork</th> </tr>";
            return strPage;
        }

        ///// <summary>
        ///// object to Excel conversion
        ///// </summary>
        ///// <param name="candidateDetails"></param>
        ///// <returns></returns>
        //// public DataTable Cover(List<CandidateDetail> candidateDetails) 
        //// {
        ////    DataTable dtExportToexcel = new DataTable();
        ////    dtExportToexcel.Columns.Add("LoginId", typeof(string));
        ////    dtExportToexcel.Columns.Add("DOJ", typeof(string));
        ////    dtExportToexcel.Columns.Add("EmployeeId", typeof(string));
        ////    dtExportToexcel.Columns.Add("Name", typeof(string));
        ////    dtExportToexcel.Columns.Add("DepartmentId", typeof(string));
        ////    dtExportToexcel.Columns.Add("Department", typeof(string));
        ////    dtExportToexcel.Columns.Add("Jobcode", typeof(string));
        ////    dtExportToexcel.Columns.Add("JobCodeDescription", typeof(string));
        ////    dtExportToexcel.Columns.Add("Gradedescription", typeof(string));
        ////    dtExportToexcel.Columns.Add("Locationdescription", typeof(string));
        ////    dtExportToexcel.Columns.Add("Location", typeof(string));
        ////    dtExportToexcel.Columns.Add("Region", typeof(string));
        ////    dtExportToexcel.Columns.Add("Hire/Rehire", typeof(string));
        ////    dtExportToexcel.Columns.Add("DOB", typeof(string));
        ////    dtExportToexcel.Columns.Add("Gender", typeof(string));
        ////    dtExportToexcel.Columns.Add("Experience", typeof(string));
        ////    dtExportToexcel.Columns.Add("CandidateType", typeof(string));
        ////    dtExportToexcel.Columns.Add("HighestEducationLevel", typeof(string));
        ////    dtExportToexcel.Columns.Add("Specialization", typeof(string));
        ////    dtExportToexcel.Columns.Add("Institution/University", typeof(string));
        ////    dtExportToexcel.Columns.Add("YearOfPassing", typeof(string));
        ////    dtExportToexcel.Columns.Add("PreviousEmployer", typeof(string));
        ////    dtExportToexcel.Columns.Add("SuperVisorId", typeof(Int32));
        ////    dtExportToexcel.Columns.Add("SuperVisorName", typeof(string));           
        ////    foreach (CandidateDetail candidate in candidateDetails)
        ////    {
        ////        DataRow dr = dtExportToexcel.NewRow();
        ////        dr["LoginId"] = candidate.LoginId;
        ////        dr["DOJ"] = candidate.CandidateDOJ;
        ////        dr["EmployeeId"] = candidate.LoginId;
        ////        dr["Name"] = candidate.CandidateFName;
        ////        dr["DepartmentId"] = candidate.DepartmentCode;
        ////        dr["Department"] = candidate.DepartmentName;
        ////        dr["Jobcode"] = candidate.Jobcode;
        ////        dr["JobCodeDescription"] = candidate.DesignationDesc;
        ////        dr["Gradedescription"] = candidate.GradeDescription;
        ////        dr["Locationdescription"] = candidate.LocationDesc;
        ////        dr["Location"] = candidate.LocationDesc;
        ////        dr["Region"] = candidate.CountryName;
        ////        dr["Hire/Rehire"] = candidate.HireStatus;
        ////        dr["DOB"] = candidate.DOB;
        ////        dr["Gender"] = candidate.Gender;
        ////       dr["Experience"] = candidate.Experience;
        ////        dr["CandidateType"] = candidate.CandidateTypeDesc;
        ////        dr["HighestEducationLevel"] = candidate.EducationLevel;
        ////        dr["Specialization"] = candidate.UGDiscipline;
        ////        dr["Institution/University"] = candidate.Institution;
        ////        dr["YearOfPassing"] = candidate.YOP;
        ////        dr["PreviousEmployer"] = candidate.PreviousEmployer;
        ////        dr["SuperVisorId"] = candidate.SupervisorId;
        ////        dr["SuperVisorName"] = candidate.SupervisorName;
        ////        dtExportToexcel.Rows.Add(dr);
        ////    }
        ////    return dtExportToexcel;
        //// }

        #endregion
        #region Event Handlers
        /// <summary>
        /// Export to excel for a TM View 
        /// </summary>
        /// <param name="sender"> sender event </param>
        /// <param name="e"> click event </param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", MessageId = "objSession", Justification = "Reviewed.")]
        protected void ExportButton_Click(object sender, ImageClickEventArgs e)
        {
            try
            {
                CandidateDetail objCandidateDetail = new CandidateDetail();
                DataSet dsExportToExcel = new DataSet();
                SessionHelper objSession = new SessionHelper();
                TotalCountDC tc = new TotalCountDC();
                if (objSession.GetSessionValue("CandidateDetail") != null)
                {
                    objCandidateDetail = (CandidateDetail)objSession.GetSessionValue("CandidateDetail");
                    objCandidateDetail.Excel = 1;
                    objCandidateDetail.PageNo = 1;
                    tc.TotalCount = 0;
                    ////int totalRecords = 0;
                    int processId = objCandidateDetail.ProcessID;
                    string fileName = string.Empty;
                    if (processId == 1)
                    {
                        fileName = "Prejoining";
                    }
                    else
                    {
                        fileName = "Postjoining";
                    }

                    using (DashBoardServicesClient objDashBoardClient = new DashBoardServicesClient())
                    {
                        dsExportToExcel = objDashBoardClient.FetchDashboardDataForExcel(objCandidateDetail, tc);
                    }

                    if ((dsExportToExcel != null) && (dsExportToExcel.Tables[1].Rows.Count > 0))
                    {
                        DataTable dtExportToExcel = dsExportToExcel.Tables[0];
                        dsExportToExcel.Tables.Remove(dtExportToExcel);
                        ExportToExcel.ExportDatasetToExcel(dsExportToExcel, fileName);
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
            finally
            {
                HttpContext.Current.Response.End();
            }
        }

        #endregion

        #region Page Methods
        protected void Page_init(object sender, EventArgs e)
        {
            /* Initialize session detail */
            if (this.objUtil.SessionDetail != null)
            {
                this.sessionDetail = this.objUtil.SessionDetail;
            }

            this.hdnSessionId.Value = this.sessionDetail.SessionId.ToString();
        }

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
                    //// SystemKey sysKey = new SystemKey();
                    //// DashBoard objDC = new DashBoard();
                    //// sysKey.KeyId = 6;
                    //// sysKey = obj.GetSystemKey(sysKey);
                    //// DateTime dtStartDate = DateTime.Today.AddDays(Convert.ToInt16(objDC.StartDate));
                    //// sysKey.KeyId = 7;
                    //// sysKey = obj.GetSystemKey(sysKey);
                    //// DateTime dtEndDate = DateTime.Today.AddDays(Convert.ToInt16(objDC.EndDate));                    
                    //// sysKey.KeyId = 25;
                    //// sysKey = obj.GetSystemKey(sysKey);
                    //// DateTime dtStartDate = DateTime.Today.AddDays(Convert.ToInt16(sysKey.KeyValue));//DateTime.Today.AddDays(Convert.ToInt16(objDC.StartDate)) ;
                    //// sysKey.KeyId = 26;
                    //// sysKey = obj.GetSystemKey(sysKey);
                    //// DateTime dtEndDate = DateTime.Today.AddDays(Convert.ToInt16(sysKey.KeyValue));//DateTime.Today.AddDays(Convert.ToInt16(objDC.EndDate));
                    //// hdnStartDate.Value = dtStartDate.ToShortDateString();
                    this.DOJFromInputBox.Attributes.Add("readonly", "readonly");
                    //// hdnEndDate.Value = dtEndDate.ToShortDateString();
                    this.DOJToInputBox.Attributes.Add("readonly", "readonly");
                    string postJoiningCount = string.Empty;
                    string preJoiningCount = string.Empty;
                    CandidateDetail objCandidateDetail = new CandidateDetail();
                    UserRolesList usr = (UserRolesList)this.objSession.GetSessionValue("RolesList");
                    objCandidateDetail.AssociateId = int.Parse(this.sessionDetail.LoginId);
                    foreach (UserRoles roleData in usr)
                    {
                        if (roleData.RoleGroupId == DC.UtilityDC.RoleGroup.TM)
                        {
                            objCandidateDetail.RoleId = roleData.RoleDetailId;
                        }
                    }

                    using (OneC.OnBoarding.WebApp.Service.DashBoardServices.DashBoardServicesClient objDashBoardClient = new DashBoardServicesClient())
                    {
                        DashBoardDataPagination objDashBoard = objDashBoardClient.DashBoardProcessCountForHRSS(objCandidateDetail);
                        DashboardUtility.CalculatePreAndPostJoiningNumbers(objDashBoard.PreJoiningCount, objDashBoard.PostJoiningCount, ref preJoiningCount, ref postJoiningCount);
                        //// lblPreJoiningStats.Text = preJoiningCount.ToString();
                        this.lblPostJoiningStats.Text = postJoiningCount.ToString();
                    }
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
        /// <param name="itotalCount"> total count </param>
        /// <returns> Pagination numbers </returns>
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
                            int startIndex = (i * this.pageSizeDashBoardcandidates) - this.pageSizeDashBoardcandidates;
                            if (i.Equals(this.dataPageIndexDashBoardcandidates))
                            {
                                sbcontent.Append("<span class='active_point'>" + i.ToString() + "</span>");
                            }
                            else
                            {
                                sbcontent.Append("<a href=\"javascript:PaginationDashboard(" + startIndex.ToString() + "," + i.ToString() + ")\">" + i.ToString() + "</a>");
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
            ////finally
            ////{ 
            ////}

            return sbcontent.ToString() + "<div class='clear'></div>";
        }

        /// <summary>
        /// Pagination for Tasks View 
        /// </summary>
        /// <param name="itotalCount"> total count </param>
        /// <returns> page numbers </returns>
        private string DoPagingForTasks(int itotalCount)
        {
            if (itotalCount.Equals(0))
            {
                return string.Empty;
            }

            int pagesCount = itotalCount / this.ipageSizeTask;
            int remainder = itotalCount % this.ipageSizeTask;
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
                    lastPageNoIndex = itotalCount / this.ipageSizeTask;
                    lastPageStartIndex = ((itotalCount / this.ipageSizeTask) * this.ipageSizeTask) - this.ipageSizeTask;
                }
                else
                {
                    lastPageNoIndex = (itotalCount / this.ipageSizeTask) + 1;
                    lastPageStartIndex = (itotalCount / this.ipageSizeTask) * this.ipageSizeTask;
                }

                ////Bind Prev
                int prevPageNoIndex = this.idataPageIndexPendingTask - 1;
                int prevPageStartIndex = (prevPageNoIndex * this.ipageSizeTask) - this.ipageSizeTask;
                if (prevPageNoIndex <= firstPageNoIndex)
                {
                    prevPageNoIndex = firstPageNoIndex;
                    prevPageStartIndex = firstPageStartIndex;
                }

                ////Bind Next
                int nextPageNoIndex = this.idataPageIndexPendingTask + 1;
                int nextPageStartIndex = (nextPageNoIndex * this.ipageSizeTask) - this.ipageSizeTask;
                if (nextPageNoIndex >= lastPageNoIndex)
                {
                    nextPageNoIndex = lastPageNoIndex;
                    nextPageStartIndex = lastPageStartIndex;
                }

                ////Bind number of pages to display
                int prevPageCount = this.idataPageIndexPendingTask - (this.itotalPagesDisplayTask / 2);
                int nextPageCount = this.idataPageIndexPendingTask + (this.itotalPagesDisplayTask / 2);
                if (prevPageCount <= 0)
                {
                    prevPageCount = firstPageNoIndex;
                    nextPageCount = firstPageNoIndex + this.itotalPagesDisplayTask - 1;
                }

                if (nextPageCount >= lastPageNoIndex)
                {
                    nextPageCount = lastPageNoIndex;
                    prevPageCount = lastPageNoIndex - this.itotalPagesDisplayTask + 1;
                }

                sbcontent.Append("<div class=\"pagination\">");
                sbcontent.Append("<div class=\"btn_pagination\">");
                sbcontent.Append("<div class=\"flt_right\">");
                if ((pagesCount > 0) && (itotalCount > this.ipageSizeTask))
                {
                    if (this.idataPageIndexPendingTask == 1)
                    {
                        sbcontent.Append("<span class='active_point' >First</span></a>");
                        sbcontent.Append("<span class='active_point' >Previous</span></a>");
                    }
                    else
                    {
                        ////Append First
                        sbcontent.Append("<a href=\"javascript:PaginationTask(" + firstPageStartIndex + "," + firstPageNoIndex + ")\">First</a>");
                        sbcontent.Append("<a href=\"javascript:PaginationTask(" + prevPageStartIndex + "," + prevPageNoIndex + ")\"><span class='prev_point' >Previous</span></a>");
                    }

                    for (int i = prevPageCount; i <= nextPageCount; i++)
                    {
                        if (i >= firstPageNoIndex && i <= lastPageNoIndex)
                        {
                            int startIndex = (i * this.ipageSizeTask) - this.ipageSizeTask;
                            if (i.Equals(this.idataPageIndexPendingTask))
                            {
                                sbcontent.Append("<span class='active_point'>" + i.ToString() + "</span>");
                            }
                            else
                            {
                                sbcontent.Append("<a href=\"javascript:PaginationTask(" + startIndex.ToString() + "," + i.ToString() + ")\">" + i.ToString() + "</a>");
                            }
                        }
                    }

                    if (this.idataPageIndexPendingTask == lastPageNoIndex)
                    {
                        sbcontent.Append("<span class='active_point' >Next</span></a>");
                        sbcontent.Append("<span class='active_point' >Last</span></a>");
                    }
                    else
                    {
                        ////Append Next
                        sbcontent.Append("<a href=\"javascript:PaginationTask(" + nextPageStartIndex + "," + nextPageNoIndex + ")\"><span class='next_point' >Next</span></a>");
                        ////Append Last
                        sbcontent.Append("<a href=\"javascript:PaginationTask(" + lastPageStartIndex + "," + lastPageNoIndex + ")\">Last</a>");
                    }
                }

                sbcontent.Append("<div class=\"clear\"></div>");
                sbcontent.Append("</div><span class=\"totalResult\" style=\"margin-top:3px\" >Total (" + itotalCount + ")</span> </div><div class=\"clear\"></div></div>");
            }
            catch (Exception)
            {
                throw;
            }
            ////finally
            ////{ 
            ////}

            return sbcontent.ToString() + "<div class='clear'></div>";
        }
    }
}
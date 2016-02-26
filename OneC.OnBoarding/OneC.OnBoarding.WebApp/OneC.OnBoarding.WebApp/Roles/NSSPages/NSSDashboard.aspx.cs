// <copyright file = "NSSDashboard.aspx.cs" company = "CTS">
// Copyright (c) Onboarding_NSSDashboard. All rights reserved.
// </copyright>

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp.Roles.NSS       
 * Page Name        : NSSDashBoard.aspx
 * Version          : 1.0
 * Type             : Web page class file
 * Purpose          : Page For NSS DashBoard
 * Created date     : 2012-Feb-02
 * Author           : 195514
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

namespace OneC.OnBoarding.WebApp.Roles.NSS
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
    ////using System.Data.OleDb;
    #endregion Namespaces
    ////[SuppressMessage("StyleCop.CSharp.MaintainabilityRules", "SA1400:AccessModifierMustBeDeclared", Justification = "Reviewed.")]

    /// <summary>
    /// Initialize NSS Dashboard class
    /// </summary>
    public partial class NSSDashBoard : System.Web.UI.Page
    {
        /// <summary>
        /// blackberry asset trackingID 
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields", Justification = "Reviewed.")]
        private static string bbryAssetTrackingID;

        /// <summary>
        /// session details
        /// </summary>
        #region Page initialization
        private SessionDetails sessionDetail;
        #endregion
                
        #region Dashboard parameters initialization  

        //// Initializing dashboard candidate list limit size

        /// <summary>
        /// Dashboard candidates page size
        /// </summary>
        private int pageSizeDashBoardcandidates = 5;

        /// <summary>
        /// Dashboard candidates total pages
        /// </summary>
        private int totalPagesDisplayDashBoardcandidates = 3;

        /// <summary>
        /// Page index
        /// </summary>
        private int dataPageIndexDashBoardcandidates = 1;

        #endregion

        #region TaskDetails
        /// <summary>
        /// Page size
        /// </summary>
        private int ipageSizeTask = 5;

        /// <summary>
        /// Total Pages
        /// </summary>
        private int itotalPagesDisplayTask = 1;

        /// <summary>
        /// Page index
        /// </summary>
        private int idataPageIndexPendingTask = 1;

        #endregion

        /* Initializing global object for Utility class to access utility methods if required */

        /// <summary>
        /// Object instantiation for Utility methods
        /// </summary>
        private Utility.UtilityMethods objUtil = new UtilityMethods();

        /// <summary>
        /// Object instantiation for utility methods
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields", Justification = "Reviewed.")]
        private OBUtilityMethodsClient obj = new OBUtilityMethodsClient();

        /// <summary>
        /// Object instantiation for session helper
        /// </summary>
        private SessionHelper objSession = new SessionHelper();
        
        /// <summary>
        /// Binds Timeline for NSS
        /// </summary>        
        /// <returns> time line filter </returns>
        [WebMethod]
        public static TimelineFilter[] BindTimeline()
        {
            try
            {
                DashBoardServicesClient objDashBoardClient = new DashBoardServicesClient();
                ////NSSDashBoard objNSSDashBoard = new NSSDashBoard();
                return (TimelineFilter[])objDashBoardClient.GetTimelineFilters();
            }
            catch (Exception)
            {
                throw;
            }           
        }

        /// <summary>
        /// Binds Status for NSS
        /// </summary>
        /// <param name="timelineId"> Time Line id </param>
        /// <param name="country"> Country id </param>
        /// <returns> returns asset request status </returns>
        [WebMethod]
        public static AssetRequestStatus[] BindStatus(int timelineId, int country)
        {
            try
            {
                DashBoardServicesClient objDashBoardClient = new DashBoardServicesClient();
                //// NSSDashBoard objNSSDashBoard = new NSSDashBoard();
                TimelineFilter objTimeline = new TimelineFilter();
                objTimeline.TimelineFilterId = timelineId;
                objTimeline.CountryID = country;
                Utility.UtilityMethods objUtil = new UtilityMethods();
                objTimeline.SessionId = objUtil.SessionDetail.SessionId;
                SessionHelper objSession = new SessionHelper();
                UserRolesList usr = (UserRolesList)objSession.GetSessionValue("RolesList");

                if (usr == null)
                {
                    usr = objUtil.GetUserRoles();  //// Getting user role list from DB if the same is not available in session 
                }

                foreach (UserRoles roleData in usr)
                {
                    if (roleData.RoleGroupId == DC.UtilityDC.RoleGroup.NSS)
                    {
                        objTimeline.RoleId = roleData.RoleGroupCode;
                    }
                }

                return (AssetRequestStatus[])objDashBoardClient.GetAssetRequestTimelineStatus(objTimeline);
            }
            catch (Exception)
            {
                throw;
            }           
        }

        /// <summary>
        /// Binds Country for NSS
        /// </summary>
        /// <returns> Country info </returns>
        [WebMethod]
        public static DashboardDataDC[] BindCountry()
        {
            try
            {
                DashBoardServicesClient objDashBoardClient = new DashBoardServicesClient();
                ////NSSDashBoard objNSSDashBoard = new NSSDashBoard();
                DashboardDataDC objCandidateDetail = new DashboardDataDC();
                Utility.UtilityMethods objUtil = new UtilityMethods();
                objCandidateDetail.SessionId = objUtil.SessionDetail.SessionId;
                ////objCandidateDetail.AssociateId = int.Parse((this.sessionDetail.LoginId));
                SessionHelper objSession = new SessionHelper();
                UserRolesList usr = (UserRolesList)objSession.GetSessionValue("RolesList");
                objCandidateDetail.AssociateId = int.Parse(objUtil.SessionDetail.LoginId);

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

                return (DashboardDataDC[])objDashBoardClient.GetHRSSMappedCountry(objCandidateDetail);

                ////objCandidateDetail.ProcessID = 1;
                ////if (hdnProcessId != null)
                ////    objCandidateDetail.ProcessID = string.IsNullOrEmpty(hdnProcessId.Value.ToString()) ? 0 : Convert.ToInt32(hdnProcessId.Value);
                ////using (OneC.OnBoarding.WebApp.Service.DashBoardServices.DashBoardServicesClient objDashBoardClient = new DashBoardServicesClient())
                ////{
                ////    DashBoardDataPagination objDashBoard = objDashBoardClient.DashBoardAssetCountForNSS(objCandidateDetail);
                ////    //DashboardUtility.CalculatePreAndPostJoiningNumbers(objDashBoard.PreJoiningCount, objDashBoard.PostJoiningCount, ref preJoiningCount, ref  postJoiningCount);
                ////    lblLaptopCnt.Text = objDashBoard.LaptopCount.ToString();
                ////    lblCellCnt.Text = objDashBoard.CellPhoneCount.ToString();
                ////    lblBBCnt.Text = objDashBoard.BlackberryCount.ToString();
                ////}
            }
            catch (Exception)
            {
                throw;
            }           
        }
        
        /// <summary>
        /// static method for transform xml
        /// </summary>
        /// <param name="gridView"> parameter is grid view </param>
        /// <param name="processId"> parameter is process id </param>
        /// <param name="pageNo"> parameter is page number </param>
        /// <param name="name"> parameter is name </param>
        /// <param name="designation"> parameter is designation </param>
        /// <param name="projectID"> parameter is project id </param>
        /// <param name="managerID"> parameter is manager id </param>
        /// <param name="fromDate"> parameter is form date </param>
        /// <param name="endDate"> parameter is to Date </param>
        /// <param name="country"> parameter is country </param>
        /// <param name="assetStatus"> parameter is asset status </param>        
        /// <param name="timelineStatus"> parameter is timeline Status </param>        
        /// <param name="hireType"> parameter is hire type </param>
        /// <returns> returns candidate detail in xml format </returns>
        [WebMethod]
        public static string TransformXML(string gridView, string processId, string pageNo, string name, string designation, string projectID, string managerID, DateTime fromDate, DateTime endDate, int country, string assetStatus, string timelineStatus, int hireType)
        {
            try
            {
                NSSDashBoard objNSSDashBoard = new NSSDashBoard();
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
                    if (roleData.RoleGroupId == DC.UtilityDC.RoleGroup.NSS)
                    {
                        objCandidateDetail.RoleId = roleData.RoleGroupCode; //// roleData.RoleDetailId;
                    }
                }

                objCandidateDetail.ProcessID = int.Parse(processId);
                objCandidateDetail.CandidateFName = name;
                objCandidateDetail.DesignationDesc = designation;
                objCandidateDetail.ProjectId = string.IsNullOrEmpty(projectID) ? 0 : Convert.ToInt64(projectID);
                objCandidateDetail.HiringManagerId = string.IsNullOrEmpty(managerID) ? 0 : Convert.ToInt64(managerID);
                objCandidateDetail.FromDate = fromDate;
                objCandidateDetail.ToDate = endDate;
                objCandidateDetail.AssetRequestStatus = assetStatus;
                objCandidateDetail.TimelineStatus = timelineStatus;
                objCandidateDetail.CountryID = country;
                objCandidateDetail.Excel = int.Parse(gridView);
                objCandidateDetail.PageNo = int.Parse(pageNo);
                objCandidateDetail.PageSize = objNSSDashBoard.pageSizeDashBoardcandidates;                
                objCandidateDetail.HireType = hireType;
                objNSSDashBoard.dataPageIndexDashBoardcandidates = int.Parse(pageNo);
                tc.TotalCount = 0;
                int totalRecords = 0;
                objSession.SetSessionValue("CandidateDetail", objCandidateDetail);

                using (DashBoardServicesClient objDashBoardClient = new DashBoardServicesClient())
                {
                    cand = objDashBoardClient.FetchNSSDashBoardData(objCandidateDetail, tc);
                }
                
                if (cand != null && cand.Count() > 0)
                {
                    totalRecords = cand[0].TotalCount;
                    List<CandidateDetail> candidateDetailListColl = cand.ToList();
                    return objNSSDashBoard.LoadData(candidateDetailListColl, totalRecords) + "*#@ 1"; ////-1 added to enable export button
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
        /// pagination for Tasks
        /// </summary>
        /// <param name="startIndex"> start index </param>
        /// <param name="pageNo"> page number </param>
        /// <returns> returns personal info </returns>
        [WebMethod]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", MessageId = "startIndex", Justification = "Reviewed.")]
        public static string PersonalDataTaskPagination(int startIndex, int pageNo)
        {
            try
            {
                SessionHelper objSession = new SessionHelper();
                CandidateDetail candidateDetails = (CandidateDetail)objSession.GetSessionValue("Task");
                candidateDetails.PageNo = pageNo;

                NSSDashBoard objNSSPage = new NSSDashBoard();
                candidateDetails.PageSize = objNSSPage.ipageSizeTask;
                //// objCandidateDetail.PageSize = objNSSDashBoard.ipageSizeDashBoardcandidates;
                objNSSPage.idataPageIndexPendingTask = pageNo;

                objSession.SetSessionValue("PaginationTask", pageNo);
                return objNSSPage.LoadPersonalDetails(candidateDetails);
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
            objSession.RemoveSessionKey("PaginationTask");
            objSession.RemoveSessionKey("Task");
            objSession.RemoveSessionKey("CandidateDetail");
        }

        /// <summary>
        /// sub function to bind drill down
        /// </summary>
        /// <param name="candidateID"> candidate id </param>
        /// <param name="processId"> Process id </param>
        /// <returns>return personal data</returns>
        [WebMethod]
        public static string PersonalData(long candidateID, int processId)
        {
            try
            {
                SessionHelper objSession = new SessionHelper();
                NSSDashBoard objNSSPage = new NSSDashBoard();
                CandidateDetail objCandidateDetail = new CandidateDetail();

                objCandidateDetail.CandidateId = candidateID;
                objCandidateDetail.ProcessID = processId;
                objCandidateDetail.RoleId = DC.UtilityDC.RoleGroup.NSS.GetHashCode().ToString();
                objCandidateDetail.PageNo = objNSSPage.idataPageIndexPendingTask;
                objCandidateDetail.PageSize = objNSSPage.ipageSizeTask;

                objSession.SetSessionValue("Task", objCandidateDetail);

                ////  HttpContext.Current.Session.Add("Task", objCandidateDetail);
                return objNSSPage.LoadPersonalDetails(objCandidateDetail);
            }
            catch (Exception)
            {
                throw;
            }          
        }

        // [SuppressMessage("StyleCop.CSharp.DocumentationRules", "SA1611:ElementParametersMustBeDocumented", Justification = "Reviewed.")]        

        /// <summary>
        /// Update Personal Data values
        /// </summary>
        /// <param name="laptopAssetTrackingID">laptop tracking id</param>
        /// <param name="cellAssetTrackingID">cell Asset tracking id</param>
        /// <param name="bbryAssetTrackingID">blackberry asset tracking id</param>
        /// <param name="ceqpAssetTrackingID">CE tracking id</param>
        /// <param name="dcardAssetTrackingID">DC tracking id</param>
        /// <param name="laptopstatus">laptop status</param>
        /// <param name="cellstatus">cell status</param>
        /// <param name="bbstatus">BB status</param>
        /// <param name="cestatus">CE status</param>
        /// <param name="dcstatus">DC status</param>
        /// <param name="laptopcomments">laptop comments</param>
        /// <param name="cellcomments">cell comments</param>
        /// <param name="bbcomments">BB comments</param>
        /// <param name="cecomments">CE comments</param>
        /// <param name="dccomments">DC comments</param>
        /// <param name="laptopFedex">laptop FedEx</param>
        /// <param name="cellFedex">cell FedEx</param>
        /// <param name="bbryFedex">blackberry FedEx</param>
        /// <param name="ceqpFedex">CE FedEx</param>
        /// <param name="dcardFedex">DC FedEx</param>
        /// <param name="laptopddate">laptop date</param>
        /// <param name="cellddate">cell date</param>
        /// <param name="bbddate">BB date</param>
        /// <param name="ceddate">CE date</param>
        /// <param name="dcddate">DC date</param>
        /// <param name="z10AssetTrackingID">z10 tracking id</param>
        /// <param name="q10AssetTrackingID">q10 tracking id</param>
        /// <param name="samsungS3AssetTrackingID">samsung S3 tracking id</param>
        /// <param name="samsungS4AssetTrackingID">samsung S4 tracking id</param>
        /// <param name="samsungS5AssetTrackingID">samsung S5 tracking id</param>
        /// <param name="iphone4SAssetTrackingID">iPhone 4S tracking id</param>
        /// <param name="iphone5SAssetTrackingID">iPhone 5S tracking id</param>
        /// <param name="iphone5CAssetTrackingID">iPhone 5C tracking id</param>
        /// <param name="lgg2AssetTrackingID">LG tracking id</param>
        /// <param name="samsungNote3AssetTrackingID">samsung note tracking id</param>
        /// <param name="samsungNote4AssetTrackingID">samsung note 4 tracking id</param>
        /// <param name="iPhone6AssetTrackingID">iPhone 6 tracking id</param>
        /// <param name="iPhone6PAssetTrackingID">iPhone 6P tracking id</param>
        /// <param name="z10statusValue">z10 status Value</param>
        /// <param name="q10statusValue">q10 status Value</param>
        /// <param name="samsungS3statusValue">samsung S3 status Value</param>
        /// <param name="samsungS4statusValue">samsung S4 status Value</param>
        /// <param name="samsungS5statusValue">samsung S5 status Value</param>
        /// <param name="iphone4SstatusValue">iPhone 4S status Value</param>
        /// <param name="iphone5SstatusValue">iPhone 5S status Value</param>
        /// <param name="iphone5CstatusValue">iPhone 5C status Value</param>
        /// <param name="lgg2statusValue">LG status Value</param>
        /// <param name="samsungNote3statusValue">samsung note status Value</param>
        /// <param name="samsungNote4statusValue">samsung note 4 status Value</param>
        /// <param name="iPhone6statusValue">iPhone 6 status Value</param>
        /// <param name="iPhone6PstatusValue">iPhone 6P status Value</param>
        /// <param name="z10CommentsValue">z10 comments Value</param>
        /// <param name="q10CommentsValue">q10 comments Value</param>
        /// <param name="samsungS3CommentsValue">samsung S3 comments Value</param>
        /// <param name="samsungS4CommentsValue">samsung S4 comments Value</param>
        /// <param name="samsungS5CommentsValue">samsung S5 comments Value</param>
        /// <param name="iphone4SCommentsValue">iPhone 4S comments Value</param>
        /// <param name="iphone5SCommentsValue">iPhone 5S comments Value</param>
        /// <param name="iphone5CCommentsValue">iPhone 5C comments Value</param>
        /// <param name="lgg2CommentsValue">LG comments Value</param>
        /// <param name="samsungNote3CommentsValue">samsung note comments Value</param>
        /// <param name="samsungNote4CommentsValue">samsung note 4 comments Value</param>
        /// <param name="iPhone6CommentsValue">iPhone 6 comments Value</param>
        /// <param name="iPhone6PCommentsValue">iPhone 6P comments Value</param>
        /// <param name="z10FedExValue">z10 FedEx Value</param>
        /// <param name="q10FedExValue">q10 FedEx Value</param>
        /// <param name="samsungS3FedExValue">samsung S3 FedEx Value</param>
        /// <param name="samsungS4FedExValue">samsung S4 FedEx Value</param>
        /// <param name="samsungS5FedExValue">samsung S5 FedEx Value</param>
        /// <param name="iphone4SFedExValue">iPhone 4S FedEx Value</param>
        /// <param name="iphone5SFedExValue">iPhone 5S FedEx Value</param>
        /// <param name="iphone5CFedExValue">iPhone 5C FedEx Value</param>
        /// <param name="lgg2FedExValue">LG FedEx Value</param>
        /// <param name="samsungNote3FedExValue">samsung note FedEx Value</param>
        /// <param name="samsungNote4FedExValue">samsung note 4 FedEx Value</param>
        /// <param name="iPhone6FedExValue">iPhone 6 FedEx Value</param>
        /// <param name="iPhone6PFedExValue">iPhone 6P FedEx Value</param>
        /// <param name="z10ddateValue">z10 date Value</param>
        /// <param name="q10ddateValue">q10 date Value</param>
        /// <param name="samsungS3ddateValue">samsung S3 date Value</param>
        /// <param name="samsungS4ddateValue">samsung S4 date Value</param>
        /// <param name="samsungS5ddateValue">samsung S5 date Value</param>
        /// <param name="iphone4SddateValue">iPhone 4S date Value</param>
        /// <param name="iphone5SddateValue">iPhone 5S date Value</param>
        /// <param name="iphone5CddateValue">iPhone 5C date Value</param>
        /// <param name="lgg2ddateValue">LG date Value</param>
        /// <param name="samsungNote3ddateValue">samsung note date Value</param>
        /// <param name="samsungNote4ddateValue">samsung note 4 date Value</param>
        /// <param name="iPhone6ddateValue">iPhone 6 date Value</param>
        /// <param name="iPhone6PddateValue">iPhone 6P date Value</param>
        /// <returns> updates personal data </returns>
        [WebMethod]
        [SuppressMessage("StyleCop.CSharp.NamingRules", "SA1305:FieldNamesMustNotUseHungarianNotation", Justification = "Reviewed.")]
          ////public static string UpdatePersonalData(string laptopAssetTrackingID, string cellAssetTrackingID, string bbryAssetTrackingID, string ceqpAssetTrackingID, string dcardAssetTrackingID, string laptopstatus, string cellstatus, string bbstatus, string cestatus, string dcstatus, string laptopcomments, string cellcomments, string bbcomments, string cecomments, string dccomments, string laptopFedex, string cellFedex, string bbryFedex, string ceqpFedex, string dcardFedex, string laptopddate, string cellddate, string bbddate, string ceddate, string dcddate, string z10AssetTrackingID, string q10AssetTrackingID, string samsungS3AssetTrackingID, string samsungS4AssetTrackingID, string samsungS5AssetTrackingID, string iphone4SAssetTrackingID, string iphone5SAssetTrackingID, string iphone5CAssetTrackingID, string lgg2AssetTrackingID, string samsungNote3AssetTrackingID, string z10statusValue, string q10statusValue, string samsungS3statusValue, string samsungS4statusValue, string samsungS5statusValue, string iphone4SstatusValue, string iphone5SstatusValue, string iphone5CstatusValue, string lgg2statusValue, string samsungNote3statusValue, string z10CommentsValue, string q10CommentsValue, string samsungS3CommentsValue, string samsungS4CommentsValue, string samsungS5CommentsValue, string iphone4SCommentsValue, string iphone5SCommentsValue, string iphone5CCommentsValue, string lgg2CommentsValue, string samsungNote3CommentsValue, string z10FedExValue, string q10FedExValue, string samsungS3FedExValue, string samsungS4FedExValue, string samsungS5FedExValue, string iphone4SFedExValue, string iphone5SFedExValue, string iphone5CFedExValue, string lgg2FedExValue, string samsungNote3FedExValue, string z10ddateValue, string q10ddateValue, string samsungS3ddateValue, string samsungS4ddateValue, string samsungS5ddateValue, string iphone4SddateValue, string iphone5SddateValue, string iphone5CddateValue, string lgg2ddateValue, string samsungNote3ddateValue)
        public static string UpdatePersonalData(string laptopissuedAssetTrackingID, string androidAssetTrackingID, string clientlaptopAssetTrackingID, string laptopAssetTrackingID, string cellAssetTrackingID, string bbryAssetTrackingID, string ceqpAssetTrackingID, string dcardAssetTrackingID, string laptopissuedstatus, string androidstatus, string clientlaptopstatus, string laptopstatus, string cellstatus, string bbstatus, string cestatus, string dcstatus, string laptopissuedcomments, string androidcomments, string clientlaptopcomments, string laptopcomments, string cellcomments, string bbcomments, string cecomments, string dccomments, string laptopissuedFedex, string androidFedex, string clientlaptopFedex, string laptopFedex, string cellFedex, string bbryFedex, string ceqpFedex, string dcardFedex, string laptopissuedddate, string androidddate, string clientlaptopddate, string laptopddate, string cellddate, string bbddate, string ceddate, string dcddate, string z10AssetTrackingID, string q10AssetTrackingID, string samsungS3AssetTrackingID, string samsungS4AssetTrackingID, string samsungS5AssetTrackingID, string iphone4SAssetTrackingID, string iphone5SAssetTrackingID, string iphone5CAssetTrackingID, string lgg2AssetTrackingID, string samsungNote3AssetTrackingID, string samsungNote4AssetTrackingID, string iPhone6AssetTrackingID, string iPhone6PAssetTrackingID, string lgg3AssetTrackingID, string samsungS632GBAssetTrackingID, string samsungS664GBAssetTrackingID, string samsungS6128GBAssetTrackingID, string samsungS6Edge32GBAssetTrackingID, string samsungS6Edge64GBAssetTrackingID, string samsungS6Edge128GBAssetTrackingID, string z10statusValue, string q10statusValue, string samsungS3statusValue, string samsungS4statusValue, string samsungS5statusValue, string iphone4SstatusValue, string iphone5SstatusValue, string iphone5CstatusValue, string lgg2statusValue, string samsungNote3statusValue, string samsungNote4statusValue, string iPhone6statusValue, string iPhone6PstatusValue, string lgg3statusValue, string samsungS632GBstatusValue, string samsungS664GBstatusValue, string samsungS6128GBstatusValue, string samsungS6Edge32GBstatusValue, string samsungS6Edge64GBstatusValue, string samsungS6Edge128GBstatusValue, string z10CommentsValue, string q10CommentsValue, string samsungS3CommentsValue, string samsungS4CommentsValue, string samsungS5CommentsValue, string iphone4SCommentsValue, string iphone5SCommentsValue, string iphone5CCommentsValue, string lgg2CommentsValue, string samsungNote3CommentsValue, string samsungNote4CommentsValue, string iPhone6CommentsValue, string iPhone6PCommentsValue, string lgg3CommentsValue, string samsungS632GBCommentsValue, string samsungS664GBCommentsValue, string samsungS6128GBCommentsValue, string samsungS6Edge32GBCommentsValue, string samsungS6Edge64GBCommentsValue, string samsungS6Edge128GBCommentsValue, string z10FedExValue, string q10FedExValue, string samsungS3FedExValue, string samsungS4FedExValue, string samsungS5FedExValue, string iphone4SFedExValue, string iphone5SFedExValue, string iphone5CFedExValue, string lgg2FedExValue, string samsungNote3FedExValue, string samsungNote4FedExValue, string iPhone6FedExValue, string iPhone6PFedExValue, string lgg3FedExValue, string samsungS632GBFedExValue, string samsungS664GBFedExValue, string samsungS6128GBFedExValue, string samsungS6Edge32GBFedExValue, string samsungS6Edge64GBFedExValue, string samsungS6Edge128GBFedExValue, string z10ddateValue, string q10ddateValue, string samsungS3ddateValue, string samsungS4ddateValue, string samsungS5ddateValue, string iphone4SddateValue, string iphone5SddateValue, string iphone5CddateValue, string lgg2ddateValue, string samsungNote3ddateValue, string samsungNote4ddateValue, string iPhone6ddateValue, string iPhone6PddateValue, string lgg3ddateValue, string samsungS632GBddateValue, string samsungS664GBddateValue, string samsungS6128GBddateValue, string samsungS6Edge32GBddateValue, string samsungS6Edge64GBddateValue, string samsungS6Edge128GBddateValue)
        {           
            try
            {
                Utility.UtilityMethods objUtil = new UtilityMethods();
                CandAssetStatusList objCandAssetList = new CandAssetStatusList();

                CandAssetStatusDC objCandlaptopissuedAsset = new CandAssetStatusDC();

                objCandlaptopissuedAsset.AssetTrackingID = !string.IsNullOrEmpty(laptopissuedAssetTrackingID) ? int.Parse(laptopissuedAssetTrackingID) : 0;
                objCandlaptopissuedAsset.AssetStatusCode = !string.IsNullOrEmpty(laptopissuedstatus) ? int.Parse(laptopissuedstatus) : 0;
                objCandlaptopissuedAsset.Comments = laptopissuedcomments;
                objCandlaptopissuedAsset.FedEx = laptopissuedFedex;
                objCandlaptopissuedAsset.DeliveryDate = !string.IsNullOrEmpty(laptopissuedddate) ? Convert.ToDateTime(laptopissuedddate).ToShortDateString() : string.Empty;
                objCandlaptopissuedAsset.SessionId = objUtil.SessionDetail.SessionId;
                objCandAssetList.Add(objCandlaptopissuedAsset);

                CandAssetStatusDC objCandandroidAsset = new CandAssetStatusDC();

                objCandandroidAsset.AssetTrackingID = !string.IsNullOrEmpty(androidAssetTrackingID) ? int.Parse(androidAssetTrackingID) : 0;
                objCandandroidAsset.AssetStatusCode = !string.IsNullOrEmpty(androidstatus) ? int.Parse(androidstatus) : 0;
                objCandandroidAsset.Comments = androidcomments;
                objCandandroidAsset.FedEx = androidFedex;
                objCandandroidAsset.DeliveryDate = !string.IsNullOrEmpty(androidddate) ? Convert.ToDateTime(androidddate).ToShortDateString() : string.Empty;
                objCandandroidAsset.SessionId = objUtil.SessionDetail.SessionId;
                objCandAssetList.Add(objCandandroidAsset);

                CandAssetStatusDC objCandclientlaptopAsset = new CandAssetStatusDC();

                objCandclientlaptopAsset.AssetTrackingID = !string.IsNullOrEmpty(clientlaptopAssetTrackingID) ? int.Parse(clientlaptopAssetTrackingID) : 0;
                objCandclientlaptopAsset.AssetStatusCode = !string.IsNullOrEmpty(clientlaptopstatus) ? int.Parse(clientlaptopstatus) : 0;
                objCandclientlaptopAsset.Comments = clientlaptopcomments;
                objCandclientlaptopAsset.FedEx = clientlaptopFedex;
                objCandclientlaptopAsset.DeliveryDate = !string.IsNullOrEmpty(clientlaptopddate) ? Convert.ToDateTime(clientlaptopddate).ToShortDateString() : string.Empty;
                objCandclientlaptopAsset.SessionId = objUtil.SessionDetail.SessionId;
                objCandAssetList.Add(objCandclientlaptopAsset);


                CandAssetStatusDC objCandlaptopAsset = new CandAssetStatusDC();
              
                objCandlaptopAsset.AssetTrackingID =   !string.IsNullOrEmpty(laptopAssetTrackingID) ? int.Parse(laptopAssetTrackingID) : 0;
                objCandlaptopAsset.AssetStatusCode = !string.IsNullOrEmpty(laptopstatus) ? int.Parse(laptopstatus) : 0;
                objCandlaptopAsset.Comments = laptopcomments;
                objCandlaptopAsset.FedEx = laptopFedex;
                objCandlaptopAsset.DeliveryDate = !string.IsNullOrEmpty(laptopddate) ? Convert.ToDateTime(laptopddate).ToShortDateString() : string.Empty;
                objCandlaptopAsset.SessionId = objUtil.SessionDetail.SessionId;
                objCandAssetList.Add(objCandlaptopAsset);

                CandAssetStatusDC objCandcellAsset = new CandAssetStatusDC();
                objCandcellAsset.AssetTrackingID = !string.IsNullOrEmpty(cellAssetTrackingID) ? int.Parse(cellAssetTrackingID) : 0;
                objCandcellAsset.AssetStatusCode = !string.IsNullOrEmpty(cellstatus) ? int.Parse(cellstatus) : 0;
                objCandcellAsset.Comments = cellcomments;
                objCandcellAsset.FedEx = cellFedex;
                objCandcellAsset.DeliveryDate = !string.IsNullOrEmpty(cellddate) ? Convert.ToDateTime(cellddate).ToShortDateString() : string.Empty;
                objCandcellAsset.SessionId = objUtil.SessionDetail.SessionId;
                objCandAssetList.Add(objCandcellAsset);

                CandAssetStatusDC objCandbbAsset = new CandAssetStatusDC();
                objCandbbAsset.AssetTrackingID = !string.IsNullOrEmpty(bbryAssetTrackingID) ? int.Parse(bbryAssetTrackingID) : 0;                
                objCandbbAsset.AssetStatusCode = !string.IsNullOrEmpty(bbstatus) ? int.Parse(bbstatus) : 0;
                objCandbbAsset.Comments = bbcomments;
                objCandbbAsset.FedEx = bbryFedex;                
                objCandbbAsset.DeliveryDate = !string.IsNullOrEmpty(bbddate) ? Convert.ToDateTime(bbddate).ToShortDateString() : string.Empty;
                objCandbbAsset.SessionId = objUtil.SessionDetail.SessionId;
                objCandAssetList.Add(objCandbbAsset);

                CandAssetStatusDC objCandceAsset = new CandAssetStatusDC();
                objCandceAsset.AssetTrackingID = !string.IsNullOrEmpty(ceqpAssetTrackingID) ? int.Parse(ceqpAssetTrackingID) : 0;
                objCandceAsset.AssetStatusCode = !string.IsNullOrEmpty(cestatus) ? int.Parse(cestatus) : 0;
                objCandceAsset.Comments = cecomments;
                objCandceAsset.FedEx = ceqpFedex;
                objCandceAsset.DeliveryDate = !string.IsNullOrEmpty(ceddate) ? Convert.ToDateTime(ceddate).ToShortDateString() : string.Empty;
                objCandceAsset.SessionId = objUtil.SessionDetail.SessionId;
                objCandAssetList.Add(objCandceAsset);

                CandAssetStatusDC objCanddcAsset = new CandAssetStatusDC();
                objCanddcAsset.AssetTrackingID =  !string.IsNullOrEmpty(dcardAssetTrackingID) ? int.Parse(dcardAssetTrackingID) : 0;
                objCanddcAsset.AssetStatusCode = !string.IsNullOrEmpty(dcstatus) ? int.Parse(dcstatus) : 0;
                objCanddcAsset.Comments = dccomments;
                objCanddcAsset.FedEx = dcardFedex;
                objCanddcAsset.DeliveryDate = !string.IsNullOrEmpty(dcddate) ? Convert.ToDateTime(dcddate).ToShortDateString() : string.Empty;
                objCanddcAsset.SessionId = objUtil.SessionDetail.SessionId;
                objCandAssetList.Add(objCanddcAsset);

                CandAssetStatusDC objCandZ10Asset = new CandAssetStatusDC();
                objCandZ10Asset.AssetTrackingID = !string.IsNullOrEmpty(z10AssetTrackingID) ? int.Parse(z10AssetTrackingID) : 0;
                objCandZ10Asset.AssetStatusCode = !string.IsNullOrEmpty(z10statusValue) ? int.Parse(z10statusValue) : 0;
                objCandZ10Asset.Comments = z10CommentsValue;
                objCandZ10Asset.FedEx = z10FedExValue;
                objCandZ10Asset.DeliveryDate = !string.IsNullOrEmpty(z10ddateValue) ? Convert.ToDateTime(z10ddateValue).ToShortDateString() : string.Empty;
                objCandZ10Asset.SessionId = objUtil.SessionDetail.SessionId;
                objCandAssetList.Add(objCandZ10Asset);

                CandAssetStatusDC objCandQ10Asset = new CandAssetStatusDC();
                objCandQ10Asset.AssetTrackingID = !string.IsNullOrEmpty(q10AssetTrackingID) ? int.Parse(q10AssetTrackingID) : 0;
                objCandQ10Asset.AssetStatusCode = !string.IsNullOrEmpty(q10statusValue) ? int.Parse(q10statusValue) : 0;
                objCandQ10Asset.Comments = q10CommentsValue;
                objCandQ10Asset.FedEx = q10FedExValue;
                objCandQ10Asset.DeliveryDate = !string.IsNullOrEmpty(q10ddateValue) ? Convert.ToDateTime(q10ddateValue).ToShortDateString() : string.Empty;
                objCandQ10Asset.SessionId = objUtil.SessionDetail.SessionId;
                objCandAssetList.Add(objCandQ10Asset);

                CandAssetStatusDC objCandSamsungS3Asset = new CandAssetStatusDC();
                objCandSamsungS3Asset.AssetTrackingID = !string.IsNullOrEmpty(samsungS3AssetTrackingID) ? int.Parse(samsungS3AssetTrackingID) : 0;
                objCandSamsungS3Asset.AssetStatusCode = !string.IsNullOrEmpty(samsungS3statusValue) ? int.Parse(samsungS3statusValue) : 0;
                objCandSamsungS3Asset.Comments = samsungS3CommentsValue;
                objCandSamsungS3Asset.FedEx = samsungS3FedExValue;
                objCandSamsungS3Asset.DeliveryDate = !string.IsNullOrEmpty(samsungS3ddateValue) ? Convert.ToDateTime(samsungS3ddateValue).ToShortDateString() : string.Empty;
                objCandSamsungS3Asset.SessionId = objUtil.SessionDetail.SessionId;
                objCandAssetList.Add(objCandSamsungS3Asset);

                CandAssetStatusDC objCandSamsungS4Asset = new CandAssetStatusDC();
                objCandSamsungS4Asset.AssetTrackingID = !string.IsNullOrEmpty(samsungS4AssetTrackingID) ? int.Parse(samsungS4AssetTrackingID) : 0;
                objCandSamsungS4Asset.AssetStatusCode = !string.IsNullOrEmpty(samsungS4statusValue) ? int.Parse(samsungS4statusValue) : 0;
                objCandSamsungS4Asset.Comments = samsungS4CommentsValue;
                objCandSamsungS4Asset.FedEx = samsungS4FedExValue;
                objCandSamsungS4Asset.DeliveryDate = !string.IsNullOrEmpty(samsungS4ddateValue) ? Convert.ToDateTime(samsungS4ddateValue).ToShortDateString() : string.Empty;
                objCandSamsungS4Asset.SessionId = objUtil.SessionDetail.SessionId;
                objCandAssetList.Add(objCandSamsungS4Asset);

                CandAssetStatusDC objCandSamsungS5Asset = new CandAssetStatusDC();
                objCandSamsungS5Asset.AssetTrackingID = !string.IsNullOrEmpty(samsungS5AssetTrackingID) ? int.Parse(samsungS5AssetTrackingID) : 0;
                objCandSamsungS5Asset.AssetStatusCode = !string.IsNullOrEmpty(samsungS5statusValue) ? int.Parse(samsungS5statusValue) : 0;
                objCandSamsungS5Asset.Comments = samsungS5CommentsValue;
                objCandSamsungS5Asset.FedEx = samsungS5FedExValue;
                objCandSamsungS5Asset.DeliveryDate = !string.IsNullOrEmpty(samsungS5ddateValue) ? Convert.ToDateTime(samsungS5ddateValue).ToShortDateString() : string.Empty;
                objCandSamsungS5Asset.SessionId = objUtil.SessionDetail.SessionId;
                objCandAssetList.Add(objCandSamsungS5Asset);

                CandAssetStatusDC objCandIPhone4SAsset = new CandAssetStatusDC();
                objCandIPhone4SAsset.AssetTrackingID = !string.IsNullOrEmpty(iphone4SAssetTrackingID) ? int.Parse(iphone4SAssetTrackingID) : 0;
                objCandIPhone4SAsset.AssetStatusCode = !string.IsNullOrEmpty(iphone4SstatusValue) ? int.Parse(iphone4SstatusValue) : 0;
                objCandIPhone4SAsset.Comments = iphone4SCommentsValue;
                objCandIPhone4SAsset.FedEx = iphone4SFedExValue;
                objCandIPhone4SAsset.DeliveryDate = !string.IsNullOrEmpty(iphone4SddateValue) ? Convert.ToDateTime(iphone4SddateValue).ToShortDateString() : string.Empty;
                objCandIPhone4SAsset.SessionId = objUtil.SessionDetail.SessionId;
                objCandAssetList.Add(objCandIPhone4SAsset);

                CandAssetStatusDC objCandIPhone5SAsset = new CandAssetStatusDC();
                objCandIPhone5SAsset.AssetTrackingID = !string.IsNullOrEmpty(iphone5SAssetTrackingID) ? int.Parse(iphone5SAssetTrackingID) : 0;
                objCandIPhone5SAsset.AssetStatusCode = !string.IsNullOrEmpty(iphone5SstatusValue) ? int.Parse(iphone5SstatusValue) : 0;
                objCandIPhone5SAsset.Comments = iphone5SCommentsValue;
                objCandIPhone5SAsset.FedEx = iphone5SFedExValue;
                objCandIPhone5SAsset.DeliveryDate = !string.IsNullOrEmpty(iphone5SddateValue) ? Convert.ToDateTime(iphone5SddateValue).ToShortDateString() : string.Empty;
                objCandIPhone5SAsset.SessionId = objUtil.SessionDetail.SessionId;
                objCandAssetList.Add(objCandIPhone5SAsset);

                CandAssetStatusDC objCandIPhone5CAsset = new CandAssetStatusDC();
                objCandIPhone5CAsset.AssetTrackingID = !string.IsNullOrEmpty(iphone5CAssetTrackingID) ? int.Parse(iphone5CAssetTrackingID) : 0;
                objCandIPhone5CAsset.AssetStatusCode = !string.IsNullOrEmpty(iphone5CstatusValue) ? int.Parse(iphone5CstatusValue) : 0;
                objCandIPhone5CAsset.Comments = iphone5CCommentsValue;
                objCandIPhone5CAsset.FedEx = iphone5CFedExValue;
                objCandIPhone5CAsset.DeliveryDate = !string.IsNullOrEmpty(iphone5CddateValue) ? Convert.ToDateTime(iphone5CddateValue).ToShortDateString() : string.Empty;
                objCandIPhone5CAsset.SessionId = objUtil.SessionDetail.SessionId;
                objCandAssetList.Add(objCandIPhone5CAsset);

                CandAssetStatusDC objCandlgg2Asset = new CandAssetStatusDC();
                objCandlgg2Asset.AssetTrackingID = !string.IsNullOrEmpty(lgg2AssetTrackingID) ? int.Parse(lgg2AssetTrackingID) : 0;
                objCandlgg2Asset.AssetStatusCode = !string.IsNullOrEmpty(lgg2statusValue) ? int.Parse(lgg2statusValue) : 0;
                objCandlgg2Asset.Comments = lgg2CommentsValue;
                objCandlgg2Asset.FedEx = lgg2FedExValue;
                objCandlgg2Asset.DeliveryDate = !string.IsNullOrEmpty(lgg2ddateValue) ? Convert.ToDateTime(lgg2ddateValue).ToShortDateString() : string.Empty;
                objCandlgg2Asset.SessionId = objUtil.SessionDetail.SessionId;
                objCandAssetList.Add(objCandlgg2Asset);

                CandAssetStatusDC objCandsamsungNote3Asset = new CandAssetStatusDC();
                objCandsamsungNote3Asset.AssetTrackingID = !string.IsNullOrEmpty(samsungNote3AssetTrackingID) ? int.Parse(samsungNote3AssetTrackingID) : 0;
                objCandsamsungNote3Asset.AssetStatusCode = !string.IsNullOrEmpty(samsungNote3statusValue) ? int.Parse(samsungNote3statusValue) : 0;
                objCandsamsungNote3Asset.Comments = samsungNote3CommentsValue;
                objCandsamsungNote3Asset.FedEx = samsungNote3FedExValue;
                objCandsamsungNote3Asset.DeliveryDate = !string.IsNullOrEmpty(samsungNote3ddateValue) ? Convert.ToDateTime(samsungNote3ddateValue).ToShortDateString() : string.Empty;
                objCandsamsungNote3Asset.SessionId = objUtil.SessionDetail.SessionId;
                objCandAssetList.Add(objCandsamsungNote3Asset);

                CandAssetStatusDC objCandsamsungNote4Asset = new CandAssetStatusDC();
                objCandsamsungNote4Asset.AssetTrackingID = !string.IsNullOrEmpty(samsungNote4AssetTrackingID) ? int.Parse(samsungNote4AssetTrackingID) : 0;
                objCandsamsungNote4Asset.AssetStatusCode = !string.IsNullOrEmpty(samsungNote4statusValue) ? int.Parse(samsungNote4statusValue) : 0;
                objCandsamsungNote4Asset.Comments = samsungNote4CommentsValue;
                objCandsamsungNote4Asset.FedEx = samsungNote4FedExValue;
                objCandsamsungNote4Asset.DeliveryDate = !string.IsNullOrEmpty(samsungNote4ddateValue) ? Convert.ToDateTime(samsungNote4ddateValue).ToShortDateString() : string.Empty;
                objCandsamsungNote4Asset.SessionId = objUtil.SessionDetail.SessionId;
                objCandAssetList.Add(objCandsamsungNote4Asset);

                CandAssetStatusDC objCandiPhone6Asset = new CandAssetStatusDC();
                objCandiPhone6Asset.AssetTrackingID = !string.IsNullOrEmpty(iPhone6AssetTrackingID) ? int.Parse(iPhone6AssetTrackingID) : 0;
                objCandiPhone6Asset.AssetStatusCode = !string.IsNullOrEmpty(iPhone6statusValue) ? int.Parse(iPhone6statusValue) : 0;
                objCandiPhone6Asset.Comments = iPhone6CommentsValue;
                objCandiPhone6Asset.FedEx = iPhone6FedExValue;
                objCandiPhone6Asset.DeliveryDate = !string.IsNullOrEmpty(iPhone6ddateValue) ? Convert.ToDateTime(iPhone6ddateValue).ToShortDateString() : string.Empty;
                objCandiPhone6Asset.SessionId = objUtil.SessionDetail.SessionId;
                objCandAssetList.Add(objCandiPhone6Asset);

                CandAssetStatusDC objCandiPhone6PAsset = new CandAssetStatusDC();
                objCandiPhone6PAsset.AssetTrackingID = !string.IsNullOrEmpty(iPhone6PAssetTrackingID) ? int.Parse(iPhone6PAssetTrackingID) : 0;
                objCandiPhone6PAsset.AssetStatusCode = !string.IsNullOrEmpty(iPhone6PstatusValue) ? int.Parse(iPhone6PstatusValue) : 0;
                objCandiPhone6PAsset.Comments = iPhone6PCommentsValue;
                objCandiPhone6PAsset.FedEx = iPhone6PFedExValue;
                objCandiPhone6PAsset.DeliveryDate = !string.IsNullOrEmpty(iPhone6PddateValue) ? Convert.ToDateTime(iPhone6PddateValue).ToShortDateString() : string.Empty;
                objCandiPhone6PAsset.SessionId = objUtil.SessionDetail.SessionId;
                objCandAssetList.Add(objCandiPhone6PAsset);

                CandAssetStatusDC objCandlgg3Asset = new CandAssetStatusDC();
                objCandlgg3Asset.AssetTrackingID = !string.IsNullOrEmpty(lgg3AssetTrackingID) ? int.Parse(lgg3AssetTrackingID) : 0;
                objCandlgg3Asset.AssetStatusCode = !string.IsNullOrEmpty(lgg3statusValue) ? int.Parse(lgg3statusValue) : 0;
                objCandlgg3Asset.Comments = lgg3CommentsValue;
                objCandlgg3Asset.FedEx = lgg3FedExValue;
                objCandlgg3Asset.DeliveryDate = !string.IsNullOrEmpty(lgg3ddateValue) ? Convert.ToDateTime(lgg3ddateValue).ToShortDateString() : string.Empty;
                objCandlgg3Asset.SessionId = objUtil.SessionDetail.SessionId;
                objCandAssetList.Add(objCandlgg3Asset);

                CandAssetStatusDC objCandsamsungS632GBAsset = new CandAssetStatusDC();
                objCandsamsungS632GBAsset.AssetTrackingID = !string.IsNullOrEmpty(samsungS632GBAssetTrackingID) ? int.Parse(samsungS632GBAssetTrackingID) : 0;
                objCandsamsungS632GBAsset.AssetStatusCode = !string.IsNullOrEmpty(samsungS632GBstatusValue) ? int.Parse(samsungS632GBstatusValue) : 0;
                objCandsamsungS632GBAsset.Comments = samsungS632GBCommentsValue;
                objCandsamsungS632GBAsset.FedEx = samsungS632GBFedExValue;
                objCandsamsungS632GBAsset.DeliveryDate = !string.IsNullOrEmpty(samsungS632GBddateValue) ? Convert.ToDateTime(samsungS632GBddateValue).ToShortDateString() : string.Empty;
                objCandsamsungS632GBAsset.SessionId = objUtil.SessionDetail.SessionId;
                objCandAssetList.Add(objCandsamsungS632GBAsset);

                CandAssetStatusDC objCandsamsungS664GBAsset = new CandAssetStatusDC();
                objCandsamsungS664GBAsset.AssetTrackingID = !string.IsNullOrEmpty(samsungS664GBAssetTrackingID) ? int.Parse(samsungS664GBAssetTrackingID) : 0;
                objCandsamsungS664GBAsset.AssetStatusCode = !string.IsNullOrEmpty(samsungS664GBstatusValue) ? int.Parse(samsungS664GBstatusValue) : 0;
                objCandsamsungS664GBAsset.Comments = samsungS664GBCommentsValue;
                objCandsamsungS664GBAsset.FedEx = samsungS664GBFedExValue;
                objCandsamsungS664GBAsset.DeliveryDate = !string.IsNullOrEmpty(samsungS664GBddateValue) ? Convert.ToDateTime(samsungS664GBddateValue).ToShortDateString() : string.Empty;
                objCandsamsungS664GBAsset.SessionId = objUtil.SessionDetail.SessionId;
                objCandAssetList.Add(objCandsamsungS664GBAsset);

                CandAssetStatusDC objCandsamsungS6128GBAsset = new CandAssetStatusDC();
                objCandsamsungS6128GBAsset.AssetTrackingID = !string.IsNullOrEmpty(samsungS6128GBAssetTrackingID) ? int.Parse(samsungS6128GBAssetTrackingID) : 0;
                objCandsamsungS6128GBAsset.AssetStatusCode = !string.IsNullOrEmpty(samsungS6128GBstatusValue) ? int.Parse(samsungS6128GBstatusValue) : 0;
                objCandsamsungS6128GBAsset.Comments = samsungS6128GBCommentsValue;
                objCandsamsungS6128GBAsset.FedEx = samsungS6128GBFedExValue;
                objCandsamsungS6128GBAsset.DeliveryDate = !string.IsNullOrEmpty(samsungS6128GBddateValue) ? Convert.ToDateTime(samsungS6128GBddateValue).ToShortDateString() : string.Empty;
                objCandsamsungS6128GBAsset.SessionId = objUtil.SessionDetail.SessionId;
                objCandAssetList.Add(objCandsamsungS6128GBAsset);

                CandAssetStatusDC objCandsamsungS6Edge32GBAsset = new CandAssetStatusDC();
                objCandsamsungS6Edge32GBAsset.AssetTrackingID = !string.IsNullOrEmpty(samsungS6Edge32GBAssetTrackingID) ? int.Parse(samsungS6Edge32GBAssetTrackingID) : 0;
                objCandsamsungS6Edge32GBAsset.AssetStatusCode = !string.IsNullOrEmpty(samsungS6Edge32GBstatusValue) ? int.Parse(samsungS6Edge32GBstatusValue) : 0;
                objCandsamsungS6Edge32GBAsset.Comments = samsungS6Edge32GBCommentsValue;
                objCandsamsungS6Edge32GBAsset.FedEx = samsungS6Edge32GBFedExValue;
                objCandsamsungS6Edge32GBAsset.DeliveryDate = !string.IsNullOrEmpty(samsungS6Edge32GBddateValue) ? Convert.ToDateTime(samsungS6Edge32GBddateValue).ToShortDateString() : string.Empty;
                objCandsamsungS6Edge32GBAsset.SessionId = objUtil.SessionDetail.SessionId;
                objCandAssetList.Add(objCandsamsungS6Edge32GBAsset);

                CandAssetStatusDC objCandsamsungS6Edge64GBAsset = new CandAssetStatusDC();
                objCandsamsungS6Edge64GBAsset.AssetTrackingID = !string.IsNullOrEmpty(samsungS6Edge64GBAssetTrackingID) ? int.Parse(samsungS6Edge64GBAssetTrackingID) : 0;
                objCandsamsungS6Edge64GBAsset.AssetStatusCode = !string.IsNullOrEmpty(samsungS6Edge64GBstatusValue) ? int.Parse(samsungS6Edge64GBstatusValue) : 0;
                objCandsamsungS6Edge64GBAsset.Comments = samsungS6Edge64GBCommentsValue;
                objCandsamsungS6Edge64GBAsset.FedEx = samsungS6Edge64GBFedExValue;
                objCandsamsungS6Edge64GBAsset.DeliveryDate = !string.IsNullOrEmpty(samsungS6Edge64GBddateValue) ? Convert.ToDateTime(samsungS6Edge64GBddateValue).ToShortDateString() : string.Empty;
                objCandsamsungS6Edge64GBAsset.SessionId = objUtil.SessionDetail.SessionId;
                objCandAssetList.Add(objCandsamsungS6Edge64GBAsset);

                CandAssetStatusDC objCandsamsungS6Edge128GBAsset = new CandAssetStatusDC();
                objCandsamsungS6Edge128GBAsset.AssetTrackingID = !string.IsNullOrEmpty(samsungS6Edge128GBAssetTrackingID) ? int.Parse(samsungS6Edge128GBAssetTrackingID) : 0;
                objCandsamsungS6Edge128GBAsset.AssetStatusCode = !string.IsNullOrEmpty(samsungS6Edge128GBstatusValue) ? int.Parse(samsungS6Edge128GBstatusValue) : 0;
                objCandsamsungS6Edge128GBAsset.Comments = samsungS6Edge128GBCommentsValue;
                objCandsamsungS6Edge128GBAsset.FedEx = samsungS6Edge128GBFedExValue;
                objCandsamsungS6Edge128GBAsset.DeliveryDate = !string.IsNullOrEmpty(samsungS6Edge128GBddateValue) ? Convert.ToDateTime(samsungS6Edge128GBddateValue).ToShortDateString() : string.Empty;
                objCandsamsungS6Edge128GBAsset.SessionId = objUtil.SessionDetail.SessionId;
                objCandAssetList.Add(objCandsamsungS6Edge128GBAsset);

                CandAssetStatusDC[] candAssetList = objCandAssetList.ToArray();

                using (DashBoardServicesClient objDashBoardServicesClient = new DashBoardServicesClient())
                {
                    objDashBoardServicesClient.UpdateNSSAssetDetails(candAssetList);
                }

                NSSDashBoard objNSS = new NSSDashBoard();

                SessionHelper objSessionHelper = new SessionHelper();
                return objNSS.LoadPersonalDetails((CandidateDetail)objSessionHelper.GetSessionValue("CandidateDetails"));
            }
            catch (Exception)
            {
                throw;
            }          
        }
       
        /// <summary>
        /// 305054 : Method to get change the count in Manila NSS Dashboard 
        /// </summary>
        /// <param name="processId"> process id </param>
        /// <returns> returns assets array </returns>
        [WebMethod]
        public static ArrayList ChangeAssertCount(int processId) 
        {
            ArrayList retObj = new ArrayList();
            CandidateDetail objCanDetail = new CandidateDetail();
            SessionHelper objSession = new SessionHelper();
            UtilityMethods objUtil = new UtilityMethods();
              UserRolesList usr = (UserRolesList)objSession.GetSessionValue("RolesList");
                    objCanDetail.AssociateId = int.Parse(objUtil.SessionDetail.LoginId);          
          
            foreach (UserRoles roleData in usr)
            {
                if (roleData.RoleGroupId == DC.UtilityDC.RoleGroup.NSS)
                {
                    objCanDetail.RoleId = roleData.RoleDetailId;                   
                }
            }

            objCanDetail.ProcessID = processId;         
            DashBoardDataPagination objDashBoardCount = new DashBoardDataPagination();
            ////#region Service Call
            var objDashboard = new DashBoardServicesClient();

            try
            {
                objDashboard.Open();
                objDashBoardCount = objDashboard.DashBoardAssetCountForNSS(objCanDetail);
                ////objDashboard.Close();
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(objUtil.SessionDetail.SessionId);
                logger.LogError(ex);
            }
            finally
            {
                if (objDashboard.State != System.ServiceModel.CommunicationState.Faulted)
                {
                    objDashboard.Close();
                }
                else
                {
                    objDashboard.Abort();
                }

                objDashboard = null;
            }

            ////foreach (DashBoardDataPagination ml in objDashBoardCount)
            ////{
            retObj.Add(new { LaptopCount = objDashBoardCount.LaptopCount, BlackberryCount = objDashBoardCount.BlackberryCount, CellPhoneCount = objDashBoardCount.CellPhoneCount, ClientEquipmentCount = objDashBoardCount.ClientEquipmentCount, DataCardCount = objDashBoardCount.DataCardCount });
            ////}

            return retObj;
            ////#endregion
        }
        
        #region Private & Public Methods

        /// <summary>
        /// sub function to bind drill down
        /// </summary>
        /// <param name="objCandidateDetail"> Candidate details </param>
        /// <returns> Returns personal details </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", MessageId = "obj", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", MessageId = "objUtil", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", Justification = "Reviewed.")]
        public string LoadPersonalDetails(CandidateDetail objCandidateDetail)
        {
            //// Create a resolver with default credentials.
            SessionHelper objSessionHelper = new SessionHelper();
            objSessionHelper.SetSessionValue("CandidateDetails", objCandidateDetail);
            XmlUrlResolver resolver = new XmlUrlResolver();
            resolver.Credentials = System.Net.CredentialCache.DefaultCredentials;
            NSSDashBoard objNSSPage = new NSSDashBoard();
            //// transform the personnel.xml file to HTML
            XslTransform transform = new XslTransform();
            string strOutXml = string.Empty;

            CandidateTask objCandidateTask = new CandidateTask();
            Utility.UtilityMethods objUtil = new UtilityMethods();
            objCandidateDetail.SessionId = objUtil.SessionDetail.SessionId;

            using (DashBoardServicesClient obj = new DashBoardServicesClient())
            {
                objCandidateTask = obj.FetchNSSCandidateData(objCandidateDetail);
            }

            CandidateDetail candDetail = objCandidateTask.CandidateDetails;
            OfferStatusList offerStatus = objCandidateTask.OfferStatusMaster;
            List<TaskDetail> candTask = objCandidateTask.TaskDetails;
            JoiningStatusList joiningStatus = objCandidateTask.JoiningStatusMaster;
            AssetStatusList assetStatus = objCandidateTask.AssetStatusMaster;
            CandAssetStatusList candAssetStatus = objCandidateTask.CandAssetStatus;
            AssetStatusList assetComment = objCandidateTask.AssetComments;

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

            if (assetStatus.Count != 0)
            {
                strOutXml = strOutXml + DashboardUtility.Serialize<AssetStatusList>(assetStatus);
            }

            if (candAssetStatus.Count != 0)
            {
                strOutXml = strOutXml + DashboardUtility.Serialize<CandAssetStatusList>(candAssetStatus);
            }

            if (assetComment.Count != 0)
            {
                strOutXml = strOutXml + DashboardUtility.Serialize<AssetStatusList>(assetComment);
            }

            StringWriter stringWriterPersonalData = new StringWriter();

            strOutXml = strOutXml.Replace("<?xml version=\"1.0\" encoding=\"utf-16\"?>", string.Empty);

            strOutXml = "<CandidateTask>" + strOutXml + "</CandidateTask>";

            strOutXml = strOutXml.Replace("<?xml version=\"1.0\" encoding=\"utf-16\"?>", string.Empty);

            XmlDocument xmldoc = new XmlDocument();
            xmldoc.LoadXml(strOutXml);

            //// load up the stylesheet
            transform.Load(HttpContext.Current.Server.MapPath("NSSDrillDownTemplate.xslt"), resolver);

            //// perform the transformation
            XPathDocument doc = new XPathDocument(new StringReader(strOutXml));

            if (objSessionHelper.GetSessionValue("PaginationTask") != null)
            {
                objNSSPage.idataPageIndexPendingTask = (int)objSessionHelper.GetSessionValue("PaginationTask");
            }

            transform.Transform(doc, null, stringWriterPersonalData, resolver);
            string formattedString = stringWriterPersonalData.ToString().Replace("<div id=\"paginationTask\">", " <div id=\"paginationTask\">" + objNSSPage.DoPagingForTasks(totalRecords));
            return formattedString.ToString();
        }

        /// <summary>
        ///  added #312539 upload excel to update Fed-ex
        /// </summary>
        /// <param name="objCandidateDetailList"> Candidate Detail List </param>
        /// <returns> returns excel details </returns>
          [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
          [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", MessageId = "obj", Justification = "Reviewed.")]
          [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", Justification = "Reviewed.")]
        public string UploadExcelDetails(List<CandidateDetail> objCandidateDetailList)
        {
            CandidateDetail[] objCandidate = objCandidateDetailList.ToArray();
            using (DashBoardServicesClient obj = new DashBoardServicesClient())
            {
                obj.UploadExcelDetailsData(objCandidate);
            }

            return null;
        }

        /// <summary>
        /// Binds the candidate details
        /// </summary>
        /// <param name="objCandidateDetailList"> Candidate Detail list </param>
        /// <param name="totalRecords"> Total records </param>
        /// <returns> returns page info </returns>
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
            string strStartHtml = "<div style=\"height:230px; overflow:auto;overflow-x: hidden \">  ";
            ////  doc.Add(new XElement("root", retCand.Select(x => new XElement("Data", x))));
            XmlDocument xmldoc = new XmlDocument();
            xmldoc.LoadXml(strOutXml);

            //// load up the stylesheet
            transform.Load(HttpContext.Current.Server.MapPath("NSSDashBoardGrid.xslt"), resolver);
            ////transform.Load("..\\DashBoardGrid.xslt", resolver);

            //// perform the transformation
            XPathDocument doc = new XPathDocument(new StringReader(strOutXml));

            transform.Transform(doc, null, stringWriter, resolver);

            string pagination = " </div><div id=\"CommentsNSSPaginationDiv\">" + this.DoPagingForDashboard(totalRecords) + "</div>";
            string strPage = strStartHtml + stringWriter.ToString() + pagination;
            ////   string str ="<tr> <th class=\"sno\">S no.</th><th class=\"c_name\">Candidate Name</th> <th class=\"l_id\" >Login Id</th><th class=\"level\" >Level</th><th class=\"r_name\">Recruiter Name(ID)</th><th class=\"o_status\">Offer Status</th><th class=\"p_work\">Paperwork</th> </tr>";
            return strPage;
        }
        #endregion

        /// <summary>
        /// upload method initialized
        /// </summary>
        /// <param name="sender"> sender info </param>
        /// <param name="e"> event arguments </param>
        ////  Added 312539 upload excel to update fedex.
         [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", MessageId = "objUtil", Justification = "Reviewed.")]
        protected void BtnUpload_Click(object sender, EventArgs e)
        {
            string message;
            DataTable dt = null;
            if (this.xlsUpload.HasFile)
            {
                bool uplod = true;
                string fleUpload = Path.GetExtension(this.xlsUpload.FileName.ToString());

                if (fleUpload.Trim().ToLower() == ".xml")
                {
                    this.xlsUpload.SaveAs(Server.MapPath("~/Roles/NSSPages/" + this.xlsUpload.FileName.ToString()));
                    //// Save excel file into Server sub dir
                    //// to catch excel file downloading permission
                    string uploadedFile = Server.MapPath("~/Roles/NSSPages/" + this.xlsUpload.FileName.ToString());
                    dt = new DataTable();
                    dt = ExcelReader.ReadExcelXML(uploadedFile);
                    if (dt.Rows.Count > 0)
                    {
                        try
                        {
                            NSSDashBoard objNSSPage = new NSSDashBoard();
                            Utility.UtilityMethods objUtil = new UtilityMethods();
                            List<CandidateDetail> objCandidateDetailList = new List<CandidateDetail>();

                            foreach (DataRow dr in dt.Rows)
                            {
                                CandidateDetail objCandidateDetail = new CandidateDetail();
                                objCandidateDetail.AssociateId = Convert.ToInt32(dr[0]);
                                objCandidateDetail.Fedex = dr[1].ToString();
                                objCandidateDetail.AssetType = dr[2].ToString();
                                objCandidateDetail.SessionId = objUtil.SessionDetail.SessionId;
                                objCandidateDetailList.Add(objCandidateDetail);
                                objCandidateDetail = null;
                            }

                            objNSSPage.UploadExcelDetails(objCandidateDetailList);

                            if (uplod)
                            {
                                ClientScript.RegisterStartupScript(typeof(Page), "ScriptSubmit", "<script language='Javascript'>alert(' File has been uploaded successfully .');</script>");
                            }
                        }
                        catch (Exception)
                        {
                            uplod = false;
                            ClientScript.RegisterStartupScript(typeof(Page), "ScriptSubmit", "<script language='Javascript'>alert('Failed to upload the file.');</script>");
                        }
                    }
                    else
                    {
                        message = "alert('No Records to upload the file.')";
                        Page.ClientScript.RegisterStartupScript(this.GetType(), "UploadMessage", message, true);
                    }

                    File.Delete(uploadedFile);
                    ////file in sub dir 'lsUploadFile' no need to keep...
                }
                else
                {
                    message = "alert('Please upload  a valid file')";
                    Page.ClientScript.RegisterStartupScript(this.GetType(), "UploadMessage", message, true);
                }
            }
            else
            {
                ClientScript.RegisterStartupScript(typeof(Page), "ScriptSubmit", "<script language='Javascript'>alert('Please select the file to upload.');</script>");
            }
        }
               
        #region Page Load

        /// <summary>
        /// page initialization
        /// </summary>
        /// <param name="sender"> sender information  </param>
        /// <param name="e"> event arguments </param>
        protected void Page_init(object sender, EventArgs e)
        {
            /* Initialize session detail */

            if (this.objUtil.SessionDetail != null)
            {
                this.sessionDetail = this.objUtil.SessionDetail;
            }

            this.hdnSessionId.Value = this.sessionDetail.SessionId.ToString();
        }

        /// <summary>
        /// Page load method
        /// </summary>
        /// <param name="sender"> sender information </param>
        /// <param name="e"> event arguments </param>
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
                    ////OBUtilityMethodsClient obj = new OBUtilityMethodsClient();
                    //// SystemKey sysKey = new SystemKey();
                   //// DashBoard objDC = new DashBoard();

                    ////sysKey.KeyId = 25;
                    ////sysKey = obj.GetSystemKey(sysKey);
                    ////DateTime dtStartDate = DateTime.Today.AddDays(Convert.ToInt16(sysKey.KeyValue));//DateTime.Today.AddDays(Convert.ToInt16(objDC.StartDate)) ;

                    ////sysKey.KeyId = 26;
                    ////sysKey = obj.GetSystemKey(sysKey);
                    ////DateTime dtEndDate = DateTime.Today.AddDays(Convert.ToInt16(sysKey.KeyValue));//DateTime.Today.AddDays(Convert.ToInt16(objDC.EndDate));

                    ////hdnStartDate.Value = dtStartDate.ToShortDateString();
                    this.DOJFromInputBox.Attributes.Add("readonly", "readonly");
                    ////hdnEndDate.Value = dtEndDate.ToShortDateString();
                    this.DOJToInputBox.Attributes.Add("readonly", "readonly");

                    ////string postJoiningCount = string.Empty;
                    ////string preJoiningCount = string.Empty;

                    CandidateDetail objCandidateDetail = new CandidateDetail();
                    UserRolesList usr = (UserRolesList)this.objSession.GetSessionValue("RolesList");

                    objCandidateDetail.AssociateId = int.Parse(this.sessionDetail.LoginId);

                    foreach (UserRoles roleData in usr)
                    {
                        if (roleData.RoleGroupId == DC.UtilityDC.RoleGroup.NSS)
                        {
                            objCandidateDetail.RoleId = roleData.RoleDetailId;
                        }
                    }

                    objCandidateDetail.ProcessID = 1;

                    if (this.hdnProcessId != null)
                    {
                        objCandidateDetail.ProcessID = string.IsNullOrEmpty(this.hdnProcessId.Value.ToString()) ? 0 : Convert.ToInt32(this.hdnProcessId.Value);
                    }

                    using (OneC.OnBoarding.WebApp.Service.DashBoardServices.DashBoardServicesClient objDashBoardClient = new DashBoardServicesClient())
                    {
                        DashBoardDataPagination objDashBoard = objDashBoardClient.DashBoardAssetCountForNSS(objCandidateDetail);
                        ////DashboardUtility.CalculatePreAndPostJoiningNumbers(objDashBoard.PreJoiningCount, objDashBoard.PostJoiningCount, ref preJoiningCount, ref  postJoiningCount);
                        this.lblLaptopCnt.Text = objDashBoard.LaptopCount.ToString();
                        this.lblCellCnt.Text = objDashBoard.CellPhoneCount.ToString();
                        this.lblBBCnt.Text = objDashBoard.BlackberryCount.ToString();
                        this.lblDCCnt.Text = objDashBoard.DataCardCount.ToString();
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

        #region Event Handlers
        /// <summary>
        /// Export to excel for a NSS View 
        /// </summary>
        /// <param name="sender"> sender info </param>
        /// <param name="e"> event arguments </param>  
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", MessageId = "objSession", Justification = "Reviewed.")]
        protected void ExportNssReport_Click(object sender, EventArgs e)
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
                        fileName = "NssAssetReport";
                    }
                    else
                    {
                        fileName = "NssAssetReport";
                    }

                    using (DashBoardServicesClient objDashBoardClient = new DashBoardServicesClient())
                    {
                        dsExportToExcel = objDashBoardClient.FetchNSSDashBoardAssetReport(objCandidateDetail, tc);
                    }

                    if ((dsExportToExcel != null) && (dsExportToExcel.Tables[0].Rows.Count > 0) && tc.TotalCount != 0)
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
        }

        /// <summary>
        /// button click event for excel data
        /// </summary>
        /// <param name="sender"> sender information </param>
        /// <param name="e"> event arguments </param>
         [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", MessageId = "objSession", Justification = "Reviewed.")]
        protected void ExportButton_Click(object sender, EventArgs e)
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

                    using (DashBoardServicesClient objDashBoardClient = new DashBoardServicesClient())
                    {
                        dsExportToExcel = objDashBoardClient.FetchNSSDashboardDataForExcel(objCandidateDetail, tc);
                    }

                    if ((dsExportToExcel != null) && (dsExportToExcel.Tables[1].Rows.Count > 0))
                    {
                        DataTable dtExportToExcel = dsExportToExcel.Tables[0];
                        dsExportToExcel.Tables.Remove(dtExportToExcel);
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
            finally
            {
                HttpContext.Current.Response.End();
            }
        }
        #endregion

        #region private and public cont

        /// <summary>
        /// Pagination for the dashboard view 
        /// </summary>
        /// <param name="itotalCount"> Total count </param>
        /// <returns> returns page info </returns>
        private string DoPagingForDashboard(int itotalCount)
        {
            if (itotalCount.Equals(0))
            {
                return string.Empty;
            }

            int ipagesCount = itotalCount / this.pageSizeDashBoardcandidates;
            int iremainder = itotalCount % this.pageSizeDashBoardcandidates;
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
                    ilastPageNoIndex = itotalCount / this.pageSizeDashBoardcandidates;
                    ilastPageStartIndex = ((itotalCount / this.pageSizeDashBoardcandidates) * this.pageSizeDashBoardcandidates) - this.pageSizeDashBoardcandidates;
                }
                else
                {
                    ilastPageNoIndex = (itotalCount / this.pageSizeDashBoardcandidates) + 1;
                    ilastPageStartIndex = (itotalCount / this.pageSizeDashBoardcandidates) * this.pageSizeDashBoardcandidates;
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

                if ((ipagesCount > 0) && (itotalCount > this.pageSizeDashBoardcandidates))
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
                sbcontent.Append("</div><span class=\"totalResult\" style=\"margin-top:3px\" >Total (" + itotalCount + ")</span> </div><div class=\"clear\"></div></div>");
            }
            catch (Exception)
            {
                throw;
            }

            return sbcontent.ToString() + "<div class='clear'></div>";
        }

        /// <summary>
        /// Pagination for Tasks View 
        /// </summary>
        /// <param name="itotalCount"> Total count </param>
        /// <returns> returns page info </returns>
        private string DoPagingForTasks(int itotalCount)
        {
            if (itotalCount.Equals(0))
            {
                return string.Empty;
            }

            int ipagesCount = itotalCount / this.ipageSizeTask;
            int iremainder = itotalCount % this.ipageSizeTask;
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
                    ilastPageNoIndex = itotalCount / this.ipageSizeTask;
                    ilastPageStartIndex = ((itotalCount / this.ipageSizeTask) * this.ipageSizeTask) - this.ipageSizeTask;
                }
                else
                {
                    ilastPageNoIndex = (itotalCount / this.ipageSizeTask) + 1;
                    ilastPageStartIndex = (itotalCount / this.ipageSizeTask) * this.ipageSizeTask;
                }

                ////Bind Prev
                int iprevPageNoIndex = this.idataPageIndexPendingTask - 1;
                int iprevPageStartIndex = (iprevPageNoIndex * this.ipageSizeTask) - this.ipageSizeTask;

                if (iprevPageNoIndex <= ifirstPageNoIndex)
                {
                    iprevPageNoIndex = ifirstPageNoIndex;
                    iprevPageStartIndex = ifirstPageStartIndex;
                }

                ////Bind Next
                int inextPageNoIndex = this.idataPageIndexPendingTask + 1;
                int inextPageStartIndex = (inextPageNoIndex * this.ipageSizeTask) - this.ipageSizeTask;

                if (inextPageNoIndex >= ilastPageNoIndex)
                {
                    inextPageNoIndex = ilastPageNoIndex;
                    inextPageStartIndex = ilastPageStartIndex;
                }

                //// Bind number of pages to display
                int iprevPageCount = this.idataPageIndexPendingTask - (this.itotalPagesDisplayTask / 2);
                int inextPageCount = this.idataPageIndexPendingTask + (this.itotalPagesDisplayTask / 2);

                if (iprevPageCount <= 0)
                {
                    iprevPageCount = ifirstPageNoIndex;
                    inextPageCount = ifirstPageNoIndex + this.itotalPagesDisplayTask - 1;
                }

                if (inextPageCount >= ilastPageNoIndex)
                {
                    inextPageCount = ilastPageNoIndex;
                    iprevPageCount = ilastPageNoIndex - this.itotalPagesDisplayTask + 1;
                }

                sbcontent.Append("<div class=\"pagination\">");
                sbcontent.Append("<div class=\"btn_pagination\">");
                sbcontent.Append("<div class=\"flt_right\">");

                if ((ipagesCount > 0) && (itotalCount > this.ipageSizeTask))
                {
                    if (this.idataPageIndexPendingTask == 1)
                    {
                        sbcontent.Append("<span class='active_point' >First</span></a>");
                        sbcontent.Append("<span class='active_point' >Previous</span></a>");
                    }
                    else
                    {
                        ////Append First
                        sbcontent.Append("<a href=\"javascript:PaginationTask(" + ifirstPageStartIndex + "," + ifirstPageNoIndex + ")\">First</a>");
                        sbcontent.Append("<a href=\"javascript:PaginationTask(" + iprevPageStartIndex + "," + iprevPageNoIndex + ")\"><span class='prev_point' >Previous</span></a>");
                    }

                    for (int i = iprevPageCount; i <= inextPageCount; i++)
                    {
                        if (i >= ifirstPageNoIndex && i <= ilastPageNoIndex)
                        {
                            int istartIndex = (i * this.ipageSizeTask) - this.ipageSizeTask;
                            if (i.Equals(this.idataPageIndexPendingTask))
                            {
                                sbcontent.Append("<span class='active_point'>" + i.ToString() + "</span>");
                            }
                            else
                            {
                                sbcontent.Append("<a href=\"javascript:PaginationTask(" + istartIndex.ToString() + "," + i.ToString() + ")\">" + i.ToString() + "</a>");
                            }
                        }
                    }

                    if (this.idataPageIndexPendingTask == ilastPageNoIndex)
                    {
                        sbcontent.Append("<span class='active_point' >Next</span></a>");
                        sbcontent.Append("<span class='active_point' >Last</span></a>");
                    }
                    else
                    {
                        ////Append Next
                        sbcontent.Append("<a href=\"javascript:PaginationTask(" + inextPageStartIndex + "," + inextPageNoIndex + ")\"><span class='next_point' >Next</span></a>");

                        ////Append Last
                        sbcontent.Append("<a href=\"javascript:PaginationTask(" + ilastPageStartIndex + "," + ilastPageNoIndex + ")\">Last</a>");
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
        #endregion 

         /// <summary>
        /// Data table for XLS insert 
        /// </summary>
        /// <param name="uploadedFile"> uploaded file </param>
        /// <returns> returns not implemented exception </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode", Justification = "Reviewed")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", MessageId = "uploadedFile", Justification = "Reviewed.")]
        private DataTable XlsInsert(string uploadedFile)
        {
            throw new NotImplementedException();
        }
    }
}
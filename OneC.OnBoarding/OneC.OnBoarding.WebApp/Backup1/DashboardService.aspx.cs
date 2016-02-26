//-----------------------------------------------------------------------
// <copyright file="DashboardService.aspx.cs" company="Cognizant">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp
 * Class Name       : DashboardService
 * Version          : 1.0
 * Type             : Class
 * Purpose          : Aspx page to hold all the web methods for dashboard services
 * Created date     : 2012-Dec-14
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

namespace OneC.OnBoarding.WebApp
{
    #region Namespaces
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Configuration;
    using System.Data;
    using System.IO;
    using System.Linq;
    using System.Net;
    using System.Runtime.Remoting.Messaging;
    using System.ServiceModel;
    using System.Text;
    using System.Web;
    using System.Web.Script.Serialization;
    using System.Web.Services;
    using System.Web.UI;
    using System.Web.UI.HtmlControls;
    using System.Web.UI.WebControls;
    using System.Xml;
    using System.Xml.Serialization;
    using OneC.OnBoarding.DC.CandidateDC;
    using OneC.OnBoarding.DC.DashBoardDC;
    using OneC.OnBoarding.DC.UtilityDC;
    using OneC.OnBoarding.WebApp.Service.CandidateServices;
    using OneC.OnBoarding.WebApp.Service.DashBoardServices;
    using OneC.OnBoarding.WebApp.Service.OBUtilityMethods;
    using OneC.OnBoarding.WebApp.Utility;
    #endregion
    /// <summary>
    /// 260947: Dashboard Service class
    /// </summary>
    public partial class DashboardService : System.Web.UI.Page
    {
        ////Dashboard Pagination For HRSS

        /// <summary>
        /// variable for page Size DashBoard candidates
        /// </summary>
        private static int pageSizeDashBoardcandidates = 5;

        /// <summary>
        /// variable for total Pages Display DashBoard candidates
        /// </summary>
        private static int totalPagesDisplayDashBoardcandidates = 3;

        /// <summary>
        /// variable for data Page Index DashBoard candidates
        /// </summary>
        private static int dataPageIndexDashBoardcandidates = 1;

        #region Dashboard

        /// <summary>
        /// variable for dashboard filters
        /// </summary>
        /// <param name="sessionId">session Id</param>
        /// <param name="roleGroupId">role Group Id</param>
        /// <returns>object dashboard filters</returns>
        [WebMethod(BufferResponse = true, Description = "Gets list of dashboard filters", EnableSession = true)]
        public static DashboardFilters GetDashboardFilter(long sessionId, int roleGroupId)
        {
            DashboardFilters objDashboardFilters = new DashboardFilters();
            objDashboardFilters.RoleGroupId = (OneC.OnBoarding.DC.UtilityDC.RoleGroup)Enum.ToObject(typeof(OneC.OnBoarding.DC.UtilityDC.RoleGroup), roleGroupId);

            ////Returning empty object if RoleGroupId is not available or No Role has been found
            if (objDashboardFilters.RoleGroupId != DC.UtilityDC.RoleGroup.NoRole)
            {
                ////#region Service call to DB
                var clnt = new Service.DashBoardServices.DashBoardServicesClient();
                try
                {
                    clnt.Open();
                    objDashboardFilters = clnt.GetDashboardFilters(objDashboardFilters);
                    return objDashboardFilters;
                }
                catch (FaultException<OBFaultContractFC> ex)
                {
                    (new ErrorLogger(sessionId)).LogError(ex);
                    return objDashboardFilters;
                }
                catch (Exception ex)
                {
                    (new ErrorLogger(sessionId)).LogError(ex);
                    return objDashboardFilters;
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
                    objDashboardFilters = null;
                }
        #endregion
            }
            else
            {
                return objDashboardFilters;
            }
        }

        /// <summary>
        /// Binds Default Date for Dashboard
        /// </summary>
        /// <param name="countryID">country ID</param>
        /// <returns>object array</returns>
        [WebMethod]
        public static ArrayList GetDefaultDate(int countryID)
        {
            SystemKey sysKey = new SystemKey();
            ArrayList objArray = new ArrayList();
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            ////#region Service call to DB
            var clnt = new Service.OBUtilityMethods.OBUtilityMethodsClient();
            try
            {
                clnt.Open();
                string dtsDate, dteDate, dtuKHRSSEDate;

                string format = "MM/dd/yyyy";
                sysKey.CountryId = countryID;

                sysKey.KeyGroupCode = "DASHBOARD_START_DATE";
                sysKey = clnt.GetFilterDate(sysKey);
                DateTime dtstartDate = DateTime.Today.AddDays(Convert.ToInt16(sysKey.KeyValue)); ////DateTime.Today.AddDays(Convert.ToInt16(objDC.StartDate)) ;
                dtsDate = dtstartDate.ToString(format);

                sysKey.KeyGroupCode = "DASHBOARD_END_DATE";
                ////Executing the method
                sysKey = clnt.GetFilterDate(sysKey);
                DateTime dtendDate = DateTime.Today.AddMonths(Convert.ToInt16(sysKey.KeyValue)); ////DateTime.Today.AddDays(Convert.ToInt16(objDC.EndDate));
                dteDate = dtendDate.ToString(format);

                DateTime today = DateTime.Now;
                DateTime newYear = new DateTime(today.Year + 1, 1, 1);
                DateTime dtuKHrssEndDate = newYear.AddDays(-1);
                dtuKHRSSEDate = dtuKHrssEndDate.ToString(format);

                objArray.Add(new { Display = "Start Date", Value = dtsDate });
                objArray.Add(new { Display = "End Date", Value = dteDate });
                objArray.Add(new { Display = "UK HRSS End Date", Value = dtuKHRSSEDate });
            }
            catch (FaultException<OBFaultContractFC> ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
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

            ////#endregion
            return objArray;
        }

        /// <summary>
        /// Binds the Country for HRSS 
        /// </summary>
        /// <returns>object dashboard array</returns>
        [WebMethod]
        public static DashboardDataDC[] BindCountryForHRSS()
        {
            DashboardDataDC[] objDashboardarray = null;
            DashboardDataDC objDashboardData = new DashboardDataDC();
            Utility.UtilityMethods objUtil = new UtilityMethods();
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            ////#region Service call to DB
            var clnt = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                clnt.Open();
                objDashboardData.SessionId = objUtil.SessionDetail.SessionId;
                SessionHelper objSession = new SessionHelper();
                UserRolesList usr = (UserRolesList)objSession.GetSessionValue("RolesList");

                if (usr == null)
                {
                    usr = objUtil.GetUserRoles();  //// Getting user role list from DB if the same is not available in session 
                }

                foreach (UserRoles roleData in usr)
                {
                    if (roleData.RoleGroupId == DC.UtilityDC.RoleGroup.HRSS)
                    {
                        objDashboardData.RoleId = roleData.RoleGroupCode;
                    }
                }

                objDashboardarray = clnt.GetHRSSMappedCountry(objDashboardData);
            }
            catch (FaultException<OBFaultContractFC> ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
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

            ////#endregion
            return objDashboardarray;
        }

        /// <summary>
        /// Binds the location for RC
        /// </summary>
        /// <returns>array of location mapped for the RC</returns>
        [WebMethod]
        public static DashboardDataDC[] BindLocationForRC()
        {
            DashboardDataDC[] objDashboardarray = null;
            DashboardDataDC objDashboardData = new DashboardDataDC();
            Utility.UtilityMethods objUtil = new UtilityMethods();
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            ////#region Service call to DB
            var clnt = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                clnt.Open();
                objDashboardData.RecruiterID = int.Parse(objUtil.SessionDetail.LoginId);
                objDashboardarray = clnt.GetWorkLocation(objDashboardData);
            }
            catch (FaultException<OBFaultContractFC> ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
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

            ////#endregion
            return objDashboardarray;
        }

        /// <summary>
        /// Binds the Candidate type 
        /// </summary>
        /// <returns>object candidate</returns>
        [WebMethod]
        public static CandidateTypeDC[] BindCandidateType()
        {
            CandidateTypeDC[] objCand = null;
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            ////#region Service call to DB
            var clnt = new Service.CandidateServices.CandidateServicesClient();
            try
            {
                clnt.Open();
                objCand = clnt.FetchCandidateType();
            }
            catch (FaultException<OBFaultContractFC> ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
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

            ////#endregion
            return objCand;
        }

        /// <summary>
        /// 305054 Binds the Lateral Candidate Hire type 
        /// </summary>
        /// <param name="parentId">parent id</param>
        /// <returns>object dashboard client</returns>
        [WebMethod] ////hiretypeforuk
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        public static DashboardDataDC[] BindCandidateHireType(int parentId)
        {
            SessionHelper objsession = new SessionHelper();
            DashboardDataDC objdashboarddetail = new DashboardDataDC();
            objdashboarddetail.ParentId = parentId;
            try
            {
                using (DashBoardServicesClient objdashboardclient = new DashBoardServicesClient())
                {
                    return (DashboardDataDC[])objdashboardclient.FetchCandidateHireType(objdashboarddetail);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Fetching the candidate lists
        /// </summary>
        /// <param name="processId">process Id</param>
        /// <param name="pageNo">page Number</param>
        /// <param name="candidateID">candidate ID</param>
        /// <param name="name">for name</param>
        /// <param name="recruiterID">recruiter ID</param>
        /// <param name="emailID">email ID</param>
        /// <param name="requisition">for requisition</param>
        /// <param name="candidateType">candidate Type</param>
        /// <param name="fromDate">from Date</param>
        /// <param name="todate">to Date</param>
        /// <param name="country">for country</param>
        /// <param name="associateId">Associate Id</param>
        /// <param name="vendorId">Vendor Id</param>
        /// <param name="cisStatus">CIS Status</param>
        /// <param name="bgvFinalStatus">BGV Final Status</param>
        /// <param name="hireType">Hire Type</param>
        /// <param name="offerStatus">Offer Status</param>      
        /// <param name="candidateDocUploadStatus">candidate Document Upload Status</param>
        /// <param name="mngrDocUploadStatus">Manager Document Upload Status</param>
        /// <returns>XML candidates list</returns>
        [WebMethod]
        public static string FetchCandidatesForDashboard(string processId, string pageNo, string candidateID, string name, string recruiterID, string emailID, string requisition, int candidateType, DateTime fromDate, DateTime todate, int country, string associateId, int vendorId, int cisStatus, int bgvFinalStatus, int hireType, string offerStatus, short candidateDocUploadStatus, short mngrDocUploadStatus)
        {
            SessionHelper objSession = new SessionHelper();
            DashboardDataDC objDashboardDetail = new DashboardDataDC();
            TotalCountDC tc = new TotalCountDC();
            Utility.UtilityMethods objUtil = new UtilityMethods();
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            string xmlcandidateslist = string.Empty;
            ////#region Service call to DB
            var clnt = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                clnt.Open();
                objDashboardDetail.SessionId = objUtil.SessionDetail.SessionId;
                UserRolesList usr = (UserRolesList)objSession.GetSessionValue("RolesList");
                if (usr == null)
                {
                    usr = objUtil.GetUserRoles();  //// Getting user role list from DB if the same is not available in session 
                }

                foreach (UserRoles roleData in usr)
                {
                    if (roleData.RoleGroupId == DC.UtilityDC.RoleGroup.HRSS)
                    {
                        objDashboardDetail.RoleId = roleData.RoleGroupCode; ////roleData.RoleDetailId;
                    }
                }

                objDashboardDetail.CandidateId = string.IsNullOrEmpty(candidateID) ? -1 : Convert.ToInt64(candidateID);
                objDashboardDetail.RecruiterID = string.IsNullOrEmpty(recruiterID) ? -1 : int.Parse(recruiterID);
                objDashboardDetail.CandidateEmailId = emailID;
                objDashboardDetail.Requisition = requisition;
                objDashboardDetail.CandidateType = candidateType;
                objDashboardDetail.ProcessID = int.Parse(processId);
                objDashboardDetail.CountryID = country;
                objDashboardDetail.FromDate = fromDate;
                objDashboardDetail.ToDate = todate;
                objDashboardDetail.CandidateFName = name;
                objDashboardDetail.PageNo = int.Parse(pageNo);
                objDashboardDetail.PageSize = pageSizeDashBoardcandidates;
                objDashboardDetail.AssociateId = string.IsNullOrEmpty(associateId) ? -1 : Convert.ToInt32(associateId);
                objDashboardDetail.VendorId = vendorId;
                objDashboardDetail.CisStatusId = cisStatus;
                objDashboardDetail.BgvFinalStatusId = bgvFinalStatus;
                objDashboardDetail.HireType = hireType;
                objDashboardDetail.OfferStatus = offerStatus;
                objDashboardDetail.CandidateDocUploadStatus = candidateDocUploadStatus;
                objDashboardDetail.MngrDocUploadStatus = mngrDocUploadStatus;
                dataPageIndexDashBoardcandidates = int.Parse(pageNo);
                tc.TotalCount = 0;
                ////int totalRecords = 0;
                objSession.SetSessionValue("CandidateDetail", objDashboardDetail);
                xmlcandidateslist = clnt.FetchCandidatesForDashboard(objDashboardDetail, tc);
            }
            catch (FaultException<OBFaultContractFC> ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
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

            ////#endregion
            return xmlcandidateslist;
        }

        /// <summary>
        /// Fetching the candidate lists For RC
        /// </summary>
        /// <param name="processId">process Id</param>
        /// <param name="pageNo">page No</param>
        /// <param name="candidateID">candidate ID</param>
        /// <param name="name">candidate name</param>
        /// <param name="emailID">Candidate Email Id</param>
        /// <param name="requisition">for requisition</param>
        /// <param name="candidateType">candidate Type</param>
        /// <param name="fromDate">from Date</param>
        /// <param name="todate">to Date</param>
        /// <param name="location">candidate location</param>
        /// <param name="associateId">Associate Id</param>
        /// <param name="typeOfJoining">Type Of Joining</param>
        /// <param name="cisStatus">CIS Status</param>
        /// <param name="offerStatus">Offer Status</param>
        /// <param name="hireType">Hire Type</param>
        /// <returns>XML candidates list</returns>
        [WebMethod]
        public static string FetchCandidatesForDashboardRC(string processId, string pageNo, string candidateID, string name, string emailID, string requisition, int candidateType, DateTime fromDate, DateTime todate, string location, string associateId, int typeOfJoining, int cisStatus, string offerStatus, int hireType)
        {
            SessionHelper objSession = new SessionHelper();
            DashboardDataDC objDashboardDetail = new DashboardDataDC();
            Utility.UtilityMethods objUtil = new UtilityMethods();
            TotalCountDC tc = new TotalCountDC();
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            string xmlcandidateslist = string.Empty;
            ////#region Service call to DB
            var clnt = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                clnt.Open();
                objDashboardDetail.SessionId = objUtil.SessionDetail.SessionId;
                UserRolesList usr = (UserRolesList)objSession.GetSessionValue("RolesList");
                if (usr == null)
                {
                    usr = objUtil.GetUserRoles();  //// Getting user role list from DB if the same is not available in session 
                }

                foreach (UserRoles roleData in usr)
                {
                    if (roleData.RoleGroupId == DC.UtilityDC.RoleGroup.RC)
                    {
                        objDashboardDetail.RoleId = roleData.RoleGroupCode; ////roleData.RoleDetailId;
                    }
                }

                objDashboardDetail.CandidateId = string.IsNullOrEmpty(candidateID) ? -1 : Convert.ToInt64(candidateID);
                objDashboardDetail.RecruiterID = int.Parse(objUtil.SessionDetail.LoginId);
                objDashboardDetail.CandidateEmailId = emailID;
                objDashboardDetail.Requisition = requisition;
                objDashboardDetail.CandidateType = candidateType;
                objDashboardDetail.ProcessID = int.Parse(processId);
                if ((location != null) && (location != "null"))
                {
                    string[] id = location.Split('-');
                    if (string.IsNullOrEmpty(id[0].ToString()))
                    {
                        objDashboardDetail.CountryID = -1;
                        objDashboardDetail.CityId = -1;
                        objDashboardDetail.StateId = -1;
                    }
                    else
                    {
                        objDashboardDetail.CountryID = int.Parse(id[0]);
                        objDashboardDetail.CityId = int.Parse(id[2]);
                        objDashboardDetail.StateId = int.Parse(id[1]);
                    }
                }

                objDashboardDetail.FromDate = fromDate;
                objDashboardDetail.ToDate = todate;
                objDashboardDetail.CandidateFName = name;
                objDashboardDetail.PageNo = int.Parse(pageNo);
                objDashboardDetail.PageSize = pageSizeDashBoardcandidates;
                objDashboardDetail.AssociateId = string.IsNullOrEmpty(associateId) ? -1 : Convert.ToInt32(associateId);
                ////objDashboardDetail.VendorId = VendorId;
                objDashboardDetail.CisStatusId = cisStatus;
                ////objDashboardDetail.BgvFinalStatusId = BgvFinalStatus;
                objDashboardDetail.TypeOfJoining = typeOfJoining;
                objDashboardDetail.OfferStatus = offerStatus;
                objDashboardDetail.HireType = hireType;
                dataPageIndexDashBoardcandidates = int.Parse(pageNo);
                tc.TotalCount = 0;
                ////int totalRecords = 0;
                objSession.SetSessionValue("CandidateDetail", objDashboardDetail);
                xmlcandidateslist = clnt.FetchCandidatesForDashboard(objDashboardDetail, tc);
            }
            catch (FaultException<OBFaultContractFC> ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
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

            ////#endregion
            return xmlcandidateslist;
        }

        /// <summary>
        /// Pagination for the dashboard Grid view 
        /// </summary>
        /// <param name="itotalCount"> total count</param>
        /// <returns>for string</returns>
        [WebMethod]
        public static string DoPagingForDashboard(int itotalCount)
        {
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            if (itotalCount.Equals(0))
            {
                return string.Empty;
            }

            int pagesCount = itotalCount / pageSizeDashBoardcandidates;
            int remainder = itotalCount % pageSizeDashBoardcandidates;
            StringBuilder strbContent = new StringBuilder(string.Empty, 800);

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
                    lastPageNoIndex = itotalCount / pageSizeDashBoardcandidates;
                    lastPageStartIndex = ((itotalCount / pageSizeDashBoardcandidates) * pageSizeDashBoardcandidates) - pageSizeDashBoardcandidates;
                }
                else
                {
                    lastPageNoIndex = (itotalCount / pageSizeDashBoardcandidates) + 1;
                    lastPageStartIndex = (itotalCount / pageSizeDashBoardcandidates) * pageSizeDashBoardcandidates;
                }

                ////Bind Prev
                int prevPageNoIndex = dataPageIndexDashBoardcandidates - 1;
                int prevPageStartIndex = (prevPageNoIndex * pageSizeDashBoardcandidates) - pageSizeDashBoardcandidates;
                if (prevPageNoIndex <= firstPageNoIndex)
                {
                    prevPageNoIndex = firstPageNoIndex;
                    prevPageStartIndex = firstPageStartIndex;
                }

                ////Bind Next
                int nextPageNoIndex = dataPageIndexDashBoardcandidates + 1;
                int nextPageStartIndex = (nextPageNoIndex * pageSizeDashBoardcandidates) - pageSizeDashBoardcandidates;
                if (nextPageNoIndex >= lastPageNoIndex)
                {
                    nextPageNoIndex = lastPageNoIndex;
                    nextPageStartIndex = lastPageStartIndex;
                }

                ////Bind number of pages to display
                int prevPageCount = dataPageIndexDashBoardcandidates - (totalPagesDisplayDashBoardcandidates / 2);
                int nextPageCount = dataPageIndexDashBoardcandidates + (totalPagesDisplayDashBoardcandidates / 2);
                if (prevPageCount <= 0)
                {
                    prevPageCount = firstPageNoIndex;
                    nextPageCount = firstPageNoIndex + totalPagesDisplayDashBoardcandidates - 1;
                }

                if (nextPageCount >= lastPageNoIndex)
                {
                    nextPageCount = lastPageNoIndex;
                    prevPageCount = lastPageNoIndex - totalPagesDisplayDashBoardcandidates + 1;
                }

                strbContent.Append("<div class=\"pagination\">");
                strbContent.Append("<div class=\"btn_pagination\">");
                strbContent.Append("<div class=\"flt_right\">");

                if ((pagesCount > 0) && (itotalCount > pageSizeDashBoardcandidates))
                {
                    if (dataPageIndexDashBoardcandidates == 1)
                    {
                        strbContent.Append("<span class='active_point' >First</span></a>");
                        strbContent.Append("<span class='active_point' >Previous</span></a>");
                    }
                    else
                    {
                        ////Append First
                        strbContent.Append("<a href=\"#\" OnClick=\"javascript:PaginationDashboard(" + firstPageStartIndex + "," + firstPageNoIndex + ")\">First</a>");
                        strbContent.Append("<a href=\"#\" OnClick=\"javascript:PaginationDashboard(" + prevPageStartIndex + "," + prevPageNoIndex + ")\"><span class='prev_point' >Previous</span></a>");
                    }

                    for (int i = prevPageCount; i <= nextPageCount; i++)
                    {
                        if (i >= firstPageNoIndex && i <= lastPageNoIndex)
                        {
                            int startIndex = (i * pageSizeDashBoardcandidates) - pageSizeDashBoardcandidates;
                            if (i.Equals(dataPageIndexDashBoardcandidates))
                            {
                                strbContent.Append("<span class='active_point'>" + i.ToString() + "</span>");
                            }
                            else
                            {
                                strbContent.Append("<a href=\"#\" OnClick=\"javascript:PaginationDashboard(" + startIndex.ToString() + "," + i.ToString() + ")\">" + i.ToString() + "</a>");
                            }
                        }
                    }

                    if (dataPageIndexDashBoardcandidates == lastPageNoIndex)
                    {
                        strbContent.Append("<span class='active_point' >Next</span></a>");
                        strbContent.Append("<span class='active_point' >Last</span></a>");
                    }
                    else
                    {
                        ////Append Next
                        strbContent.Append("<a href=\"#\" OnClick=\"javascript:PaginationDashboard(" + nextPageStartIndex + "," + nextPageNoIndex + ")\"><span class='next_point' >Next</span></a>");

                        ////Append Last
                        strbContent.Append("<a href=\"#\" OnClick=\"javascript:PaginationDashboard(" + lastPageStartIndex + "," + lastPageNoIndex + ")\">Last</a>");
                    }
                }

                strbContent.Append("<div class=\"clear\"></div>");
                strbContent.Append("</div><span class=\"active_point\" style=\"font-weight:bold\" >Total (" + itotalCount + ")</span> </div><div class=\"clear\"></div></div>");
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }

            return strbContent.ToString() + "<div class='clear'></div>";
        }

        /// <summary>
        /// Getting the candidate search filter data
        /// </summary>
        /// <param name="val">for value</param>
        /// <returns>for data</returns>
        [WebMethod]
        public static ArrayList FetchCandidatessearchForDashboard(string val)
        {
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            ArrayList data = new ArrayList();
            DataSet dscandidatesFilterSearchdata;
            AutoCompleteDC objAutocomplete = new AutoCompleteDC();
            ////#region Service call to DB
            var clnt = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                clnt.Open();
                objAutocomplete.ItemName = val;
                dscandidatesFilterSearchdata = clnt.FetchCandidatesFilterSearchdata(objAutocomplete);
                foreach (DataRow dr in dscandidatesFilterSearchdata.Tables[0].Rows)
                {
                    data.Add(new { ItemId = dr["CandidateId"].ToString(), ItemName = dr["CandidateName"].ToString() });
                }
            }
            catch (FaultException<OBFaultContractFC> ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
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

            ////#endregion
            return data;
        }

        /// <summary>
        /// Getting the process count For HRSS
        /// </summary>
        /// <returns>array process count</returns>
        [WebMethod]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1024:UsePropertiesWhereAppropriate", Justification = "Reviewed")]
        public static ArrayList GetProcessCountForHRSS()
        {
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            SessionDetails sessionDetail = new SessionDetails();
            Utility.UtilityMethods objUtil = new UtilityMethods();
            ////TotalCountDC tc = new TotalCountDC();
            SessionHelper objSession = new SessionHelper();
            CandidateDetail objdashboarddetail = new CandidateDetail();
            string postJoiningCount = string.Empty;
            string preJoiningCount = string.Empty;
            ArrayList arrprocesscount = new ArrayList();
            ////#region Service call to DB
            var clnt = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                clnt.Open();
                if (objUtil.SessionDetail != null)
                {
                    sessionDetail = objUtil.SessionDetail;
                }

                objdashboarddetail.AssociateId = int.Parse(sessionDetail.LoginId);
                UserRolesList usr = (UserRolesList)objSession.GetSessionValue("RolesList");
                if (usr == null)
                {
                    usr = objUtil.GetUserRoles();  //// Getting user role list from DB if the same is not available in session 
                }

                foreach (UserRoles roleData in usr)
                {
                    if (roleData.RoleGroupId == DC.UtilityDC.RoleGroup.HRSS)
                    {
                        objdashboarddetail.RoleId = roleData.RoleDetailId;
                    }
                }

                DashBoardDataPagination objDashBoard = clnt.DashBoardProcessCountForHRSS(objdashboarddetail);
                DashboardUtility.CalculatePreAndPostJoiningNumbers(objDashBoard.PreJoiningCount, objDashBoard.PostJoiningCount, ref preJoiningCount, ref postJoiningCount);
                arrprocesscount.Add(preJoiningCount.ToString());
                arrprocesscount.Add(postJoiningCount.ToString());
            }
            catch (FaultException<OBFaultContractFC> ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
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

            ////#endregion
            return arrprocesscount;
        }

        /// <summary>
        /// Getting the process count For RC
        /// </summary>
        /// <returns>array of process count</returns>
        [WebMethod]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1024:UsePropertiesWhereAppropriate", Justification = "Reviewed")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        public static ArrayList GetProcessCountForRC()
        {
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            SessionDetails sessionDetail = new SessionDetails();
            Utility.UtilityMethods objUtil = new UtilityMethods();
            SessionHelper objSession = new SessionHelper();
            CandidateDetail objdashboarddetail = new CandidateDetail();
            string postJoiningCount = string.Empty;
            string preJoiningCount = string.Empty;
            ArrayList arrprocesscount = new ArrayList();
            ////#region Service call to DB
            var clnt = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                clnt.Open();
                if (objUtil.SessionDetail != null)
                {
                    sessionDetail = objUtil.SessionDetail;
                }

                objdashboarddetail.RecruiterID = Convert.ToInt32(objUtil.SessionDetail.LoginId);
                UserRolesList usr = (UserRolesList)objSession.GetSessionValue("RolesList");
                if (usr == null)
                {
                    usr = objUtil.GetUserRoles();  //// Getting user role list from DB if the same is not available in session 
                }

                foreach (UserRoles roleData in usr)
                {
                    if (roleData.RoleGroupId == DC.UtilityDC.RoleGroup.RC)
                    {
                        objdashboarddetail.RoleId = roleData.RoleDetailId;
                    }
                }

                DashBoardDataPagination objDashBoard = clnt.DashBoardProcessCount(objdashboarddetail);
                DashboardUtility.CalculatePreAndPostJoiningNumbers(objDashBoard.PreJoiningCount, objDashBoard.PostJoiningCount, ref preJoiningCount, ref postJoiningCount);
                arrprocesscount.Add(preJoiningCount.ToString());
                arrprocesscount.Add(postJoiningCount.ToString());
            }
            catch (FaultException<OBFaultContractFC> ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
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
            ////#endregion
            return arrprocesscount;
        }

        /// <summary>
        /// To Calculate the pre-joining  and  post-joining count
        /// </summary>
        /// <param name="prejoiningCount">total count of pre-joining Candidates</param>
        /// <param name="postjoiningCount">total count of post-joining Candidates</param>
        /// <param name="preJoiningText">percentage calculation of pre-joining </param>
        /// <param name="postJoiningText">percentage calculation of post-joining</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1045:DoNotPassTypesByReference", Justification = "Reviewed")]
        public static void CalculatePreAndPostJoiningNumbers(long prejoiningCount, long postjoiningCount, ref string preJoiningText, ref string postJoiningText)
        {
            double totalSum = prejoiningCount + postjoiningCount;
            double dblPrejoiningPercent = 0, dblPostjoiningPercent = 0;

            if (prejoiningCount > 0)
            {
                dblPrejoiningPercent = (prejoiningCount / totalSum) * 100;
            }

            if (postjoiningCount > 0)
            {
                dblPostjoiningPercent = (postjoiningCount / totalSum) * 100;
            }

            int prejoiningPercent = 0, postjoiningPercent = 0;

            if (dblPrejoiningPercent > 0)
            {
                prejoiningPercent = Convert.ToInt32(Math.Round(dblPrejoiningPercent));
            }

            if (dblPostjoiningPercent > 0)
            {
                postjoiningPercent = Convert.ToInt32(Math.Round(dblPostjoiningPercent));
            }

            if (((prejoiningPercent + postjoiningPercent) < 100) && (prejoiningPercent > 0 || postjoiningPercent > 0))
            {
                if (prejoiningPercent > postjoiningPercent)
                {
                    prejoiningPercent += 100 - (prejoiningPercent + postjoiningPercent);
                }
                else
                {
                    postjoiningPercent += 100 - (prejoiningPercent + postjoiningPercent);
                }
            }

            preJoiningText = prejoiningCount.ToString() + " (" + prejoiningPercent.ToString() + "%)";
            postJoiningText = postjoiningCount.ToString() + " (" + postjoiningPercent.ToString() + "%)";
        }

        /// <summary>
        /// Updates DOJ , offer status email for a lateral candidate
        /// </summary>
        /// <param name="candidate">for candidate</param>
        /// <param name="candidateDOJ">candidate DOJ</param>
        /// <param name="offerStatus">offer Status</param>
        /// <param name="emailId">email Id</param>
        /// <param name="resendMail">resend Mail</param>
        /// <param name="managerId">manager Id</param>
        /// <param name="managerName">manager Name</param>
        /// <param name="managerMobileNo">manager Mobile Number</param>
        /// <param name="managerVnetNo">manager VNET Number</param>
        /// <param name="recruiterId">recruiter Id</param>
        /// <param name="recruiterName">recruiter Name</param>
        /// <param name="recruiterMobileNo">recruiter Mobile Number</param>
        /// <param name="recruiterVnetNo">recruiter VNET Number</param>
        [WebMethod]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        public static void UpdatePersonalData(long candidate, string candidateDOJ, string offerStatus, string emailId, short resendMail, string managerId, string managerName, string managerMobileNo, string managerVnetNo, string recruiterId, string recruiterName, string recruiterMobileNo, string recruiterVnetNo)
        {
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            CandidateDetail objCand = new CandidateDetail();
            Utility.UtilityMethods objUtil = new UtilityMethods();
            SessionDetails sessionDetail = new SessionDetails();
            ////#region Service call to DB
            var clnt = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                clnt.Open();
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
                objCand.SessionId = sessionId;
                objCand.ESAHiringManagerID = string.IsNullOrEmpty(managerId) ? -1 : Convert.ToInt32(managerId);
                objCand.ESAHiringManagerName = managerName;
                objCand.ESAHiringManagerMobileNo = managerMobileNo;
                objCand.ESAHiringManagerVnetNo = managerVnetNo;
                objCand.RecruiterID = string.IsNullOrEmpty(recruiterId) ? -1 : Convert.ToInt32(recruiterId);
                objCand.RecruiterName = recruiterName;
                objCand.RecruiterMobileNo = recruiterMobileNo;
                objCand.RecruiterVnetNo = recruiterVnetNo;
                clnt.UpdateCandidateDetails(objCand);
            }
            catch (FaultException<OBFaultContractFC> ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
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

            //////#endregion
        }

        /// <summary>
        /// Updates DOJ , email for a lateral candidate
        /// </summary>
        /// <param name="candidate">candidate id</param>
        /// <param name="candidateDOJ">candidate DOJ</param>
        /// <param name="emailId">candidate email Id</param>
        /// <param name="resendMail">resend Mail</param>
        [WebMethod]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        public static void UpdatePersonalDataForManila(long candidate, string candidateDOJ, string emailId, short resendMail)
        {
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            CandidateDetail objCand = new CandidateDetail();
            Utility.UtilityMethods objUtil = new UtilityMethods();
            SessionDetails sessionDetail = new SessionDetails();
            ////#region Service call to DB
            var clnt = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                clnt.Open();
                sessionDetail = objUtil.SessionDetail;
                objCand.CandidateId = candidate;
                objCand.CandidateEmailId = emailId;
                objCand.ResendMail = resendMail;
                objCand.SessionId = sessionId;
                if (!string.IsNullOrEmpty(candidateDOJ))
                {
                    objCand.CandidateDOJ = candidateDOJ;
                }

                clnt.UpdateCandidateDetails(objCand);
            }
            catch (FaultException<OBFaultContractFC> ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
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
            ////#endregion
        }

        /// <summary>
        /// Updates DOJ , offer status email for a campus candidate
        /// </summary>
        /// <param name="candidate">Candidate Id</param>
        /// <param name="candidateDOJ">candidate DOJ</param>
        /// <param name="offerStatus">Candidate Offer Status</param>
        /// <param name="emailId">Candidate Email Id</param>
        /// <param name="resendMail">Resend Mail</param>
        /// <param name="dimStatus">Date Intimation Mail Status</param>
        /// <param name="joiningLocation">Campus Joining Location</param>
        /// <param name="reportingTime">Campus Reporting Time</param>
        /// <param name="joiningVenue">Campus Joining Venue</param>
        /// <param name="dimresendmail">Date Intimation Resend Mail Status</param>
        [WebMethod]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        public static void UpdatePersonalDataForCampus(long candidate, string candidateDOJ, string offerStatus, string emailId, short resendMail, int dimStatus, int joiningLocation, string reportingTime, string joiningVenue, int dimresendmail)
        {
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            CandidateDetail objCand = new CandidateDetail();
            Utility.UtilityMethods objUtil = new UtilityMethods();
            SessionDetails sessionDetail = new SessionDetails();
            ////#region Service call to DB
            var clnt = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                clnt.Open();
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
                objCand.DateIntimationStatus = dimStatus;
                objCand.CampusJoiningLocation = joiningLocation;
                objCand.CampusReportingTime = reportingTime;
                objCand.CampusJoiningVenue = joiningVenue;
                objCand.DateIntimationMailStatus = dimresendmail;
                objCand.SessionId = sessionId;
                clnt.UpdateCandidateDetails(objCand);
            }
            catch (FaultException<OBFaultContractFC> ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
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
            ////#endregion
        }

        /// <summary>
        /// Used to update asset approval request
        /// </summary>
        /// <param name="candidate">Candidate Id</param>
        /// <param name="assetApprovalStatus">asset Approval Status</param>
        [WebMethod]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        public static void UpdateAssetApprovalStatus(long candidate, string assetApprovalStatus)
        {
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            CandidateDetail objCand = new CandidateDetail();
            Utility.UtilityMethods objUtil = new UtilityMethods();
            SessionDetails sessionDetail = new SessionDetails();
            ////#region Service call to DB
            var clnt = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                clnt.Open();
                sessionDetail = objUtil.SessionDetail;
                objCand.CandidateId = candidate;
                if (!string.IsNullOrEmpty(assetApprovalStatus))
                {
                    objCand.AssetApproval = short.Parse(assetApprovalStatus);
                }

                objCand.SessionId = sessionId;
                clnt.UpdateAssetApprovalStatus(objCand);
            }
            catch (FaultException<OBFaultContractFC> ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
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

            ////#endregion
        }

        /// <summary>
        /// Used to unlock candidate access
        /// </summary>
        /// <param name="candidate">Candidate Id </param>
        /// <param name="countryId">Country ID </param>
        [WebMethod]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        public static void UnlockCandidateAccess(long candidate, short countryId)
        {
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            CandidateDetail objCand = new CandidateDetail();
            Utility.UtilityMethods objUtil = new UtilityMethods();
            SessionDetails sessionDetail = new SessionDetails();
            ////#region Service call to DB
            var clnt = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                clnt.Open();
                sessionDetail = objUtil.SessionDetail;
                objCand.CandidateId = candidate;
                objCand.CountryID = countryId;
                objCand.SessionId = sessionId;
                clnt.UnlockCandidateAccess(objCand);
            }
            catch (FaultException<OBFaultContractFC> ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
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
            ////#endregion
        }

        /// <summary>
        /// To update candidate joining status
        /// </summary>
        /// <param name="candidate">candidate id</param>
        /// <param name="joiningStatus">joining Status</param>
        [WebMethod]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        public static void UpdateCandidateJoiningStatusDetails(long candidate, string joiningStatus)
        {
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            CandidateDetail objCand = new CandidateDetail();
            SessionDetails sessionDetail = new SessionDetails();
            Utility.UtilityMethods objUtil = new UtilityMethods();
            ////#region Service call to DB
            var clnt = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                clnt.Open();
                sessionDetail = objUtil.SessionDetail;
                objCand.CandidateId = candidate;
                if (!string.IsNullOrEmpty(joiningStatus))
                {
                    objCand.CandidateJoiningStatus = short.Parse(joiningStatus);
                }

                objCand.SessionId = sessionId;
                clnt.UpdateCandidateJoiningStatusDetails(objCand);
            }
            catch (FaultException<OBFaultContractFC> ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
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

            ////#endregion
        }

        /// <summary>
        /// Fetching the prefill values of a candidate in dashboard
        /// </summary>
        /// <param name="candidateID">candidate ID</param>
        /// <param name="associateID">associate ID</param>
        /// <returns>XML candidate list</returns>
        [WebMethod]
        public static string FetchCandidatesPrefillvalues(string candidateID, string associateID)
        {
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            DashboardDataDC objDashboardDetail = new DashboardDataDC();
            string xmlcandidateslist = string.Empty;
            ////#region Service call to DB
            var clnt = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                clnt.Open();
                objDashboardDetail.CandidateId = string.IsNullOrEmpty(candidateID) ? -1 : Convert.ToInt64(candidateID);
                objDashboardDetail.AssociateId = string.IsNullOrEmpty(associateID) ? -1 : Convert.ToInt32(associateID);
                xmlcandidateslist = clnt.FetchCandidatesPrefillvalues(objDashboardDetail);
            }
            catch (FaultException<OBFaultContractFC> ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
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

            ////#endregion
            return xmlcandidateslist;
        }

        /// <summary>
        /// Fetching the candidate lists For Vendor Dashboard
        /// </summary>
        /// <param name="candidateID">candidate ID</param>
        /// <param name="name">for name</param>
        /// <param name="associateId">Associate Id</param>
        /// <param name="casePriority">case Priority</param>
        /// <param name="bgvInitiationFromDate">BGV Initiation From Date</param>
        /// <param name="bgvInitiationToDate">BGV Initiation To Date</param>
        /// <param name="bgvSpecificationStatus">BGV Specification Status</param>
        /// <param name="pageNo">page Number</param>
        /// <returns>XML candidate list</returns>
        [WebMethod]
        public static string FetchCandidatesForVendorDashboard(string candidateID, string name, string associateId, int casePriority, DateTime bgvInitiationFromDate, DateTime bgvInitiationToDate, int bgvSpecificationStatus, string pageNo)
        {
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            DashboardDataDC objDashboardDetail = new DashboardDataDC();
            Utility.UtilityMethods objUtil = new UtilityMethods();
            TotalCountDC tc = new TotalCountDC();
            SessionHelper objSession = new SessionHelper();
            string xmlcandidateslist = string.Empty;
            ////#region Service call to DB
            var clnt = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                clnt.Open();
                objDashboardDetail.SessionId = objUtil.SessionDetail.SessionId;
                UserRolesList usr = (UserRolesList)objSession.GetSessionValue("RolesList");
                if (usr == null)
                {
                    usr = objUtil.GetUserRoles();  //// Getting user role list from DB if the same is not available in session 
                }

                foreach (UserRoles roleData in usr)
                {
                    if (roleData.RoleGroupId == DC.UtilityDC.RoleGroup.VENDOR)
                    {
                        objDashboardDetail.RoleId = roleData.RoleGroupCode;
                    }
                }

                objDashboardDetail.CandidateId = string.IsNullOrEmpty(candidateID) ? -1 : Convert.ToInt64(candidateID);
                objDashboardDetail.CandidateFName = name;
                objDashboardDetail.AssociateId = string.IsNullOrEmpty(associateId) ? -1 : Convert.ToInt32(associateId);
                objDashboardDetail.CasePriority = casePriority;
                objDashboardDetail.BGVInitiationFromDate = bgvInitiationFromDate;
                objDashboardDetail.BGVInitiationToDate = bgvInitiationToDate;
                objDashboardDetail.BGVSpecificationStatus = bgvSpecificationStatus;
                objDashboardDetail.PageNo = int.Parse(pageNo);
                objDashboardDetail.PageSize = pageSizeDashBoardcandidates;
                dataPageIndexDashBoardcandidates = int.Parse(pageNo);
                tc.TotalCount = 0;
                ////int totalRecords = 0;
                objSession.SetSessionValue("CandidateDetail", objDashboardDetail);
                xmlcandidateslist = clnt.FetchCandidatesForVendorDashboard(objDashboardDetail, tc);
            }
            catch (FaultException<OBFaultContractFC> ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
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
            ////#endregion
            return xmlcandidateslist;
        }

        ////#endregion

        #region PersonalDetails

        /// <summary>
        /// Fetching Personal data
        /// </summary>
        /// <param name="candidateID">candidate ID</param>
        /// <param name="processId">process Id</param>
        /// <param name="candidateType">candidate Type</param>
        /// <param name="pageNo">page Number</param>
        /// <returns>returns personal details</returns>
        [WebMethod]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", MessageId = "candidateType", Justification = "Reviewed.")]
        public static string PersonalData(long candidateID, int processId, string candidateType, string pageNo)
        {
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            DashboardDataDC objDashboardDetail = new DashboardDataDC();
            Utility.UtilityMethods objUtil = new UtilityMethods();
            //// List<DataSet> listData = new List<DataSet>();
            string personalDetails = string.Empty;
            SessionHelper objSession = new SessionHelper();
            ////#region Service call to DB
            var clnt = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                clnt.Open();
                objDashboardDetail.SessionId = objUtil.SessionDetail.SessionId;
                objDashboardDetail.CandidateId = candidateID;
                objDashboardDetail.ProcessID = processId;
                objDashboardDetail.RoleId = DC.UtilityDC.RoleGroup.HRSS.GetHashCode().ToString(); ////"2";
                objDashboardDetail.PageNo = int.Parse(pageNo);
                objDashboardDetail.PageSize = pageSizeDashBoardcandidates;
                dataPageIndexDashBoardcandidates = int.Parse(pageNo);
                objSession.SetSessionValue("CandidateDetail", objDashboardDetail);
                personalDetails = clnt.FetchCandidatePersonalData(objDashboardDetail);
            }
            catch (FaultException<OBFaultContractFC> ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
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

            ////#endregion
            return personalDetails;
        }

        #endregion

        /// <summary>
        /// 312539 DOJConfirm RC for NA
        /// </summary>
        /// <param name="candidateid">candidate id</param>
        /// <returns>returns object candidate or null</returns>
        [WebMethod]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        public static string ConfirmDoj(long candidateid, Int16 confirmstatus, int dojtaskid, string rccomment, string candidatedoj,int mode)
        {
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            CandidateDetail objCand = new CandidateDetail();
            Utility.UtilityMethods objUtil = new UtilityMethods();
            SessionDetails sessionDetail = new SessionDetails();
            ////#region Service call to DB
            var conn = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                conn.Open();
                sessionDetail = objUtil.SessionDetail;
                objCand.CandidateId = candidateid;
                objCand.SessionId = sessionId;
                objCand.ConfirmStatus = confirmstatus;
                objCand.TaskId = dojtaskid;
                objCand.RCComment = rccomment;
                objCand.Mode = mode;
                if (!string.IsNullOrEmpty(candidatedoj))
                {
                    objCand.CandidateDOJ = candidatedoj;
                }
                conn.UpdateCandidateDOJConfirm(objCand);
                return null;
            }
            catch (FaultException<OBFaultContractFC> ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
                if (conn.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    conn.Abort();
                }
                else
                {
                    conn.Close(); ////Closing connection if no exception
                }

                conn = null; ////Clearing client
            }

            ////#endregion
            return null;
        }

        /// <summary>
        /// 313277 Notify NSS to cancel ER request
        /// </summary>
        /// <param name="candidateid">candidate id</param>
        /// <param name="countryId">country Id</param>
        /// <param name="notificationMasterId">Notification Master Id</param>
        /// <returns>mail status</returns>
        [WebMethod]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        public static string CancelERRequest(long candidateid, short countryId, short notificationMasterId)
        {
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            MailData mailData = new MailData();
            Utility.UtilityMethods objUtil = new UtilityMethods();
            SessionDetails sessionDetail = new SessionDetails();
            ////#region Service call to DB
            var conn = new Service.OBUtilityMethods.OBUtilityMethodsClient();
            string mailStatus = string.Empty;
            try
            {
                conn.Open();
                sessionDetail = objUtil.SessionDetail;
                mailData.CandidateId = candidateid;
                mailData.SessionId = sessionId;
                mailData.CountryId = countryId;
                mailData.NotificationMasterId = notificationMasterId;
                mailData.SpMode = 1;
                mailStatus = conn.SendMail(mailData);
            }
            catch (FaultException<OBFaultContractFC> ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
                if (conn.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    conn.Abort();
                }
                else
                {
                    conn.Close(); ////Closing connection if no exception
                }

                conn = null; ////Clearing client
            }
            ////#endregion
            return mailStatus;
        }

        /// <summary>
        ///  Added: 312539 update candidate info for NA
        /// </summary>
        /// <param name="candidate">candidate id</param>
        /// <param name="candidateDOJ">candidate DOJ</param>
        /// <param name="emailId">email Id</param>
        /// <param name="resendMail">resend Mail</param>
        /// <param name="joiningStatus">joining Status</param>
        /// <param name="rccomment">RC Comment</param>
        [WebMethod]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        public static void UpdateCandidateData(long candidate, string candidateDOJ, string emailId, short resendMail, int joiningStatus, string rccomment, short resendI9Mail,int mode)
        {
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            CandidateDetail objCand = new CandidateDetail();
            Utility.UtilityMethods objUtil = new UtilityMethods();
            SessionDetails sessionDetail = new SessionDetails();
            ////#region Service call to DB
            var connect = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                connect.Open();
                sessionDetail = objUtil.SessionDetail;
                objCand.CandidateId = candidate;
                if (!string.IsNullOrEmpty(candidateDOJ))
                {
                    objCand.CandidateDOJ = candidateDOJ;
                }

                objCand.CandidateEmailId = emailId;
                objCand.ResendMail = resendMail;
                objCand.SessionId = sessionId;
                objCand.RCComment = rccomment;
                objCand.JoingStatus = joiningStatus;
                objCand.ResendI9Mail = resendI9Mail;
                objCand.Mode = mode;
                connect.UpdateCandidateDetails(objCand);
            }
            catch (FaultException<OBFaultContractFC> ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
                if (connect.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    connect.Abort();
                }
                else
                {
                    connect.Close(); ////Closing connection if no exception
                }

                connect = null; ////Clearing client
            }

            ////#endregion
        }

        #region ER process
        /// <summary>
        /// 312539 Save RC Confirm ER request for NA
        /// </summary>
        /// <param name="sessionId">session Id</param>
        /// <param name="candidateId">candidate Id</param>
        /// <param name="taskId">task Id</param>
        /// <param name="saveMode">save Mode</param>
        /// <param name="erprocess">ER process</param>
        /// <returns>object dashboard details</returns>
        [WebMethod]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        public static string SaveConfirmationERprocess(long sessionId, long candidateId, int taskId, int saveMode, int erprocess)
        {
            var objDashBoardClient = new DashBoardServicesClient();
            try
            {
                objDashBoardClient.Open();
                DashboardDataDC objDashboardDetail = new DashboardDataDC();
                SessionHelper objSession = new SessionHelper();
                objDashboardDetail.CandidateId = candidateId;
                objDashboardDetail.SessionId = sessionId;
                objDashboardDetail.TaskId = taskId;
                objDashboardDetail.SaveMode = saveMode;
                objDashboardDetail.ERProcess = erprocess;
                objDashBoardClient.SaveConfirmationERprocess(objDashboardDetail);
            }
            catch (Exception)
            {
                ////ErrorLogger logger = new ErrorLogger(sessionId);
                ////logger.LogError(ex);
                throw;
            }
            finally
            {
                objDashBoardClient.Abort();
            }

            return null;
        }

        /// <summary>
        /// Fetching the ER Process candidate lists
        /// </summary>
        /// <param name="processId">process Id</param>
        /// <param name="pageNo">page Number</param>
        /// <param name="candidateID">candidate ID</param>
        /// <param name="name">candidate name</param>
        /// <param name="fromDate">from Date</param>
        /// <param name="todate">to Date</param>
        /// <param name="country">or country</param>
        /// <param name="erfromcandidatectatus">ER from candidate status</param>
        /// <param name="confirmationerprocess">confirmation ER process</param>
        /// <param name="hireType">Hire Type</param>
        /// <param name="processType">process type</param>
        /// <returns>XML candidate list</returns>
        [WebMethod]
        public static string GetERprocessCandidateView(string processId, string pageNo, string candidateID, string name, DateTime fromDate, DateTime todate, int country, int erfromcandidatectatus, int confirmationerprocess, int hireType, int processType)
        {
            SessionHelper objSession = new SessionHelper();
            DashboardDataDC objDashboardDetail = new DashboardDataDC();
            Utility.UtilityMethods objUtil = new UtilityMethods();
            TotalCountDC tc = new TotalCountDC();
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            string xmlcandidateslist = string.Empty;
            ////#region Service call to DB
            var clnt = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                clnt.Open();
                objDashboardDetail.SessionId = objUtil.SessionDetail.SessionId;
                UserRolesList usr = (UserRolesList)objSession.GetSessionValue("RolesList");
                if (usr == null)
                {
                    usr = objUtil.GetUserRoles();  //// Getting user role list from DB if the same is not available in session 
                }

                foreach (UserRoles roleData in usr)
                {
                    if (roleData.RoleGroupId == DC.UtilityDC.RoleGroup.HRSS)
                    {
                        objDashboardDetail.RoleId = roleData.RoleGroupCode; ////roleData.RoleDetailId;
                    }
                }

                objDashboardDetail.CandidateId = string.IsNullOrEmpty(candidateID) ? -1 : Convert.ToInt64(candidateID);
                objDashboardDetail.ProcessID = int.Parse(processId);
                objDashboardDetail.CountryID = country;
                objDashboardDetail.FromDate = fromDate;
                objDashboardDetail.ToDate = todate;
                objDashboardDetail.CandidateFName = name;
                objDashboardDetail.ERConfirmation = confirmationerprocess;
                objDashboardDetail.ERSubmitted = erfromcandidatectatus;
                ////objDashboardDetail.AssetStatus = asset;
                objDashboardDetail.PageNo = int.Parse(pageNo);
                objDashboardDetail.PageSize = pageSizeDashBoardcandidates;
                objDashboardDetail.HireType = hireType;
                objDashboardDetail.ProcessType = processType;
                dataPageIndexDashBoardcandidates = int.Parse(pageNo);
                tc.TotalCount = 0;
                //// int totalRecords = 0;
                objSession.SetSessionValue("CandidateDetail", objDashboardDetail);
                xmlcandidateslist = clnt.GetERprocessCandidateView(objDashboardDetail, tc);
            }
            catch (FaultException<OBFaultContractFC> ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
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

        #endregion
            return xmlcandidateslist;
        }
        ////#endregion

        /// <summary>
        /// 312020: Method to save data regarding State and Location of candidate on Date Of Joining
        /// </summary>
        /// <param name="candidateID">Passing Candidate Id</param>
        /// <param name="reportedDOJ">Passing Date Of Joining reported by candidate</param>
        /// <param name="dojConfirmStatus">passing confirmation Status of Date Of Joining by candidate</param>
        /// <param name="dojComments">passing date of joining comments</param>
        /// <param name="country">passing Country Name</param>
        /// <param name="address1">passing Address 1</param>
        /// <param name="address2">passing Address 2</param>
        /// <param name="stateName">passing state Name</param>
        /// <param name="cityName">passing City Name</param>
        /// <param name="zip">passing zip</param>
        /// <param name="locationConfirmStatus">passing location confirmation status by candidate</param>
        /// <param name="locationComments">passing location comments</param>
        /// <param name="hiringManagerConfirmStatus">confirmation status by Hiring Manager</param>
        /// <param name="hiringManagerComments">confirmation comments by Hiring Manager</param>
        /// <param name="locationType"> passing the location type</param>
        [WebMethod]
        public static int UpdateCandidateStateLocationData(long candidateID, string reportedDOJ, int dojConfirmStatus, string dojComments, string country, string address1, string address2, string stateName, string cityName, string zip, int locationConfirmStatus, string locationComments, int hiringManagerConfirmStatus, string hiringManagerComments, string locationType,string county)
        {
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            StartDateAndLocationDC objstrtdtloc = new StartDateAndLocationDC();
            Utility.UtilityMethods objUtil = new UtilityMethods();
            SessionDetails sessionDetail = new SessionDetails();
            int uploadStatus = 0;
            ////#region Service call to DB
            var connect = new Service.OBUtilityMethods.OBUtilityMethodsClient();

            // var connect = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                connect.Open();
                sessionDetail = objUtil.SessionDetail;
                objstrtdtloc.CandidateId = candidateID;
                objstrtdtloc.ReportedDOJ = reportedDOJ;
                objstrtdtloc.DOJConfirmStatus = dojConfirmStatus;
                objstrtdtloc.DOJComments = dojComments;
                objstrtdtloc.Country = country;
                objstrtdtloc.Address1 = address1;
                objstrtdtloc.Address2 = address2;
                objstrtdtloc.State = stateName;
                objstrtdtloc.City = cityName;
                objstrtdtloc.Zip = zip;
                objstrtdtloc.LocationConfirmStatus = locationConfirmStatus;
                objstrtdtloc.LocationComments = locationComments;
                objstrtdtloc.HiringManagerConfirmStatus = hiringManagerConfirmStatus;
                objstrtdtloc.HiringManagerComments = hiringManagerComments;
                objstrtdtloc.SessionId = sessionId;
                objstrtdtloc.LocationType = locationType;
                objstrtdtloc.County = county;
                uploadStatus = connect.UpdateCandidateStateAndLocationDetails(objstrtdtloc);
            }
            catch (FaultException<OBFaultContractFC> ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
                if (connect.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    connect.Abort();
                }
                else
                {
                    connect.Close(); ////Closing connection if no exception
                }

                connect = null; ////Clearing client
            }
            return uploadStatus;
            ////#endregion
        }

        /// <summary>
        /// Method for Export to Excel data
        /// </summary>
        public void ExcelExportForDashboard()
        {
            string roleId = Request.QueryString["roleid"].ToString().Trim();
            string pageNo = Request.QueryString["pageNo"].ToString().Trim();
            string candidateID = Request.QueryString["candidateID"].ToString().Trim();
            string name = Request.QueryString["name"].ToString().Trim();
            string associateId = Request.QueryString["associateId"].ToString().Trim();
            if (roleId == "11")
            {
                int casePriority = int.Parse(Request.QueryString["casepriority"]);
                DateTime bgvInitiationFromDate = DateTime.Parse(Request.QueryString["BGVInitFromDate"]);
                DateTime bgvInitiationToDate = DateTime.Parse(Request.QueryString["BGVInitToDate"]);
                int bgvSpecificationStatus = int.Parse(Request.QueryString["BGVSpecificationStatus"]);
                this.ExporttoexcelVendor(candidateID, name, associateId, casePriority, bgvInitiationFromDate, bgvInitiationToDate, bgvSpecificationStatus, pageNo);
            }
            else
            {
                string processId = Request.QueryString["processId"].ToString().Trim();
                string emailID = Request.QueryString["emailID"].ToString().Trim();
                string requisition = Request.QueryString["requisition"].ToString().Trim();
                int candidateType = int.Parse(Request.QueryString["candidateType"]);
                DateTime fromDate = DateTime.Parse(Request.QueryString["fromDate"]);
                DateTime todate = DateTime.Parse(Request.QueryString["toDate"]);
                if (roleId == "1")
                {
                    string location = Request.QueryString["location"].ToString().Trim();
                    int typeOfJoining = int.Parse(Request.QueryString["typeofjoining"]);
                    this.ExporttoexcelRC(processId, pageNo, candidateID, name, emailID, requisition, candidateType, fromDate, todate, location, associateId, typeOfJoining);
                }
                else if (roleId == "2")
                {
                    int vendorId = int.Parse(Request.QueryString["vendorId"]);
                    int cisStatus = int.Parse(Request.QueryString["cisstatus"]);
                    int bgvFinalStatus = int.Parse(Request.QueryString["bgvfinalstatus"]);
                    string recruiterID = Request.QueryString["recruiterID"].ToString().Trim();
                    int country = int.Parse(Request.QueryString["country"]);
                    int hireType = int.Parse(Request.QueryString["HireType"]);
                    int swizExcel = int.Parse(Request.QueryString["SwizExcel"].Trim());
                    string offerStatus = Request.QueryString["offerStatus"];
                    short documentUploadStatus = short.Parse(Request.QueryString["documentUploadStatus"]);
                    short mngrDocUploadStatus = short.Parse(Request.QueryString["MngrDocUploadStatus"]);
                    if (swizExcel == 1 || swizExcel == 2)
                    {
                        this.Exporttoexcelforswiz(processId, pageNo, candidateID, name, recruiterID, emailID, requisition, candidateType, fromDate, todate, country, associateId, vendorId, cisStatus, bgvFinalStatus, hireType, swizExcel, offerStatus, documentUploadStatus);
                    }
                    else
                    {
                        this.Exporttoexcel(processId, pageNo, candidateID, name, recruiterID, emailID, requisition, candidateType, fromDate, todate, country, associateId, vendorId, cisStatus, bgvFinalStatus, hireType, offerStatus, documentUploadStatus, mngrDocUploadStatus);
                    }
                }
            }
        }
        ////#region Page methods

        /// <summary>
        /// variable for Excel Export For Dashboard
        /// </summary>
        /// <param name="sender">for sender</param>
        /// <param name="e">for event</param>
        protected void Page_Load(object sender, EventArgs e)
        {
            this.ExcelExportForDashboard();
        }
        ////#endregion

        /// <summary>
        /// Method to Fetch candidates for Excel report generation for Vendor dashboard
        /// </summary>
        /// <param name="candidateID">candidate ID</param>
        /// <param name="name">for name</param>
        /// <param name="associateId">Associate Id</param>
        /// <param name="casePriority">case Priority</param>
        /// <param name="bgvInitiationFromDate">BGV Initiation From Date</param>
        /// <param name="bgvInitiationToDate">BGV Initiation To Date</param>
        /// <param name="bgvSpecificationStatus">BGV Specification Status</param>
        /// <param name="pageNo">page Number</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        protected void ExporttoexcelVendor(string candidateID, string name, string associateId, int casePriority, DateTime bgvInitiationFromDate, DateTime bgvInitiationToDate, int bgvSpecificationStatus, string pageNo)
        {
            DashboardDataDC objDashboardDetail = new DashboardDataDC();
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            Utility.UtilityMethods objUtil = new UtilityMethods();
            TotalCountDC tc = new TotalCountDC();
            DataSet dsexportToExcel = new DataSet();
            SessionHelper objSession = new SessionHelper();
            ////#region Service call to DB
            var clnt = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                objDashboardDetail.SessionId = objUtil.SessionDetail.SessionId;
                UserRolesList usr = (UserRolesList)objSession.GetSessionValue("RolesList");
                if (usr == null)
                {
                    usr = objUtil.GetUserRoles();  //// Getting user role list from DB if the same is not available in session 
                }

                foreach (UserRoles roleData in usr)
                {
                    if (roleData.RoleGroupId == DC.UtilityDC.RoleGroup.VENDOR)
                    {
                        objDashboardDetail.RoleId = roleData.RoleGroupCode;
                    }
                }

                objDashboardDetail.CandidateId = string.IsNullOrEmpty(candidateID) ? -1 : Convert.ToInt64(candidateID);
                objDashboardDetail.CandidateFName = name;
                objDashboardDetail.AssociateId = string.IsNullOrEmpty(associateId) ? -1 : Convert.ToInt32(associateId);
                objDashboardDetail.CasePriority = casePriority;
                objDashboardDetail.BGVInitiationFromDate = bgvInitiationFromDate;
                objDashboardDetail.BGVInitiationToDate = bgvInitiationToDate;
                objDashboardDetail.BGVSpecificationStatus = bgvSpecificationStatus;
                objDashboardDetail.PageNo = int.Parse(pageNo);
                objDashboardDetail.PageSize = pageSizeDashBoardcandidates;
                dataPageIndexDashBoardcandidates = int.Parse(pageNo);
                tc.TotalCount = 0;
                ////int totalRecords = 0;
                objSession.SetSessionValue("CandidateDetail", objDashboardDetail);

                string fileName = string.Empty;
                fileName = "Vendor";
                dsexportToExcel = clnt.FetchCandidatesForVendorDashboardExcel(objDashboardDetail, tc);
                if ((dsexportToExcel != null) && (dsexportToExcel.Tables[1].Rows.Count > 0))
                {
                    DataTable dtexportToExcel = dsexportToExcel.Tables[0];
                    dsexportToExcel.Tables.Remove(dtexportToExcel);
                    ExportToExcel.ExportDatasetToExcel(dsexportToExcel, fileName);
                }
            }
            catch (FaultException<OBFaultContractFC> ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
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

            ////#endregion
        }

        /// <summary>
        /// Method to Fetch candidates for Excel report generation RC
        /// </summary>
        /// <param name="processId">process Id</param>
        /// <param name="pageNo">page Number</param>
        /// <param name="candidateID">candidate ID</param>
        /// <param name="name">for name</param>
        /// <param name="emailID">email ID</param>
        /// <param name="requisition">for requisition</param>
        /// <param name="candidateType">candidate Type</param>
        /// <param name="fromDate">from Date</param>
        /// <param name="todate">to Date</param>
        /// <param name="location">for location</param>
        /// <param name="associateId">Associate Id</param>
        /// <param name="typeOfJoining">Type Of Joining</param>
        protected void ExporttoexcelRC(string processId, string pageNo, string candidateID, string name, string emailID, string requisition, int candidateType, DateTime fromDate, DateTime todate, string location, string associateId, int typeOfJoining)
        {
            DashboardDataDC objDashboardDetail = new DashboardDataDC();
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            Utility.UtilityMethods objUtil = new UtilityMethods();
            TotalCountDC tc = new TotalCountDC();
            DataSet dsexportToExcel = new DataSet();
            SessionHelper objSession = new SessionHelper();
            ////#region Service call to DB
            var clnt = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                objDashboardDetail.SessionId = objUtil.SessionDetail.SessionId;
                UserRolesList usr = (UserRolesList)objSession.GetSessionValue("RolesList");
                if (usr == null)
                {
                    usr = objUtil.GetUserRoles();  //// Getting user role list from DB if the same is not available in session 
                }

                foreach (UserRoles roleData in usr)
                {
                    if (roleData.RoleGroupId == DC.UtilityDC.RoleGroup.RC)
                    {
                        objDashboardDetail.RoleId = roleData.RoleGroupCode; ////roleData.RoleDetailId;
                    }
                }

                objDashboardDetail.CandidateId = string.IsNullOrEmpty(candidateID) ? -1 : Convert.ToInt64(candidateID);
                objDashboardDetail.RecruiterID = int.Parse(objUtil.SessionDetail.LoginId);
                objDashboardDetail.CandidateEmailId = emailID;
                objDashboardDetail.Requisition = requisition;
                objDashboardDetail.CandidateType = candidateType;
                objDashboardDetail.ProcessID = int.Parse(processId);
                if ((!string.IsNullOrEmpty(location)) && (location != "null"))
                {
                    string[] id = location.Split('-');
                    if (string.IsNullOrEmpty(id[0].ToString()))
                    {
                        objDashboardDetail.CountryID = -1;
                        objDashboardDetail.CityId = -1;
                        objDashboardDetail.StateId = -1;
                    }
                    else
                    {
                        objDashboardDetail.CountryID = int.Parse(id[0]);
                        objDashboardDetail.CityId = int.Parse(id[2]);
                        objDashboardDetail.StateId = int.Parse(id[1]);
                    }
                }

                objDashboardDetail.FromDate = fromDate;
                objDashboardDetail.ToDate = todate;
                objDashboardDetail.CandidateFName = name;
                objDashboardDetail.PageNo = int.Parse(pageNo);
                objDashboardDetail.PageSize = pageSizeDashBoardcandidates;
                objDashboardDetail.AssociateId = string.IsNullOrEmpty(associateId) ? -1 : Convert.ToInt32(associateId);
                ////objDashboardDetail.VendorId = VendorId;
                ////objDashboardDetail.CisStatusId = CisStatus;
                ////objDashboardDetail.BgvFinalStatusId = BgvFinalStatus;
                objDashboardDetail.TypeOfJoining = typeOfJoining;
                dataPageIndexDashBoardcandidates = int.Parse(pageNo);
                tc.TotalCount = 0;
                //// int totalRecords = 0;
                objSession.SetSessionValue("CandidateDetail", objDashboardDetail);

                string fileName = string.Empty;
                if (processId == "1")
                {
                    fileName = "Prejoining";
                }
                else if (processId == "2")
                {
                    fileName = "Postjoining";
                }
                else
                {
                    fileName = "BGV";
                }

                dsexportToExcel = clnt.FetchCandidatesForDashboardExcel(objDashboardDetail, tc);
                if ((dsexportToExcel != null) && (dsexportToExcel.Tables[1].Rows.Count > 0))
                {
                    DataTable dtexportToExcel = dsexportToExcel.Tables[0];
                    dsexportToExcel.Tables.Remove(dtexportToExcel);
                    ExportToExcel.ExportDatasetToExcel(dsexportToExcel, fileName);
                }
            }
            catch (FaultException<OBFaultContractFC> ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
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

            ////#endregion
        }

        /// <summary>
        /// Method to Fetch candidates for Excel report generation HRSS
        /// </summary>
        /// <param name="processId">process Id</param>
        /// <param name="pageNo">page Number</param>
        /// <param name="candidateID">candidate ID</param>
        /// <param name="name">for name</param>
        /// <param name="recruiterID">recruiter ID</param>
        /// <param name="emailID">email ID</param>
        /// <param name="requisition">for requisition</param>
        /// <param name="candidateType">candidate Type</param>
        /// <param name="fromDate">from Date</param>
        /// <param name="todate">to Date</param>
        /// <param name="country">for country</param>
        /// <param name="associateId">Associate Id</param>
        /// <param name="vendorId">Vendor Id</param>
        /// <param name="cisStatus">CIS Status</param>
        /// <param name="bgvFinalStatus">BGV Final Status</param>
        /// <param name="hireType">Hire Type</param>
        /// <param name="swizExcel">SWIZ Excel</param>
        /// <param name="offerStatus">Offer Status</param>
        /// <param name="documentUploadStatus">document Upload Status</param>
        protected void Exporttoexcelforswiz(string processId, string pageNo, string candidateID, string name, string recruiterID, string emailID, string requisition, int candidateType, DateTime fromDate, DateTime todate, int country, string associateId, int vendorId, int cisStatus, int bgvFinalStatus, int hireType, int swizExcel, string offerStatus, short documentUploadStatus)
        {
            DashboardDataDC objDashboardDetail = new DashboardDataDC();
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            Utility.UtilityMethods objUtil = new UtilityMethods();
            TotalCountDC tc = new TotalCountDC();
            DataSet dsexportToExcel = new DataSet();
            SessionHelper objSession = new SessionHelper();
            ////#region Service call to DB
            var clnt = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                objDashboardDetail.SessionId = objUtil.SessionDetail.SessionId;
                UserRolesList usr = (UserRolesList)objSession.GetSessionValue("RolesList");
                if (usr == null)
                {
                    usr = objUtil.GetUserRoles();  //// Getting user role list from DB if the same is not available in session 
                }

                foreach (UserRoles roleData in usr)
                {
                    if (roleData.RoleGroupId == DC.UtilityDC.RoleGroup.HRSS)
                    {
                        objDashboardDetail.RoleId = roleData.RoleGroupCode; ////roleData.RoleDetailId;
                    }
                }

                objDashboardDetail.CandidateId = string.IsNullOrEmpty(candidateID) ? -1 : Convert.ToInt64(candidateID);
                objDashboardDetail.RecruiterID = string.IsNullOrEmpty(recruiterID) ? -1 : int.Parse(recruiterID);
                objDashboardDetail.CandidateEmailId = emailID;
                objDashboardDetail.Requisition = requisition;
                objDashboardDetail.CandidateType = candidateType;
                objDashboardDetail.ProcessID = int.Parse(processId);
                objDashboardDetail.CountryID = country;
                objDashboardDetail.FromDate = fromDate;
                objDashboardDetail.ToDate = todate;
                objDashboardDetail.CandidateFName = name;
                objDashboardDetail.PageNo = int.Parse(pageNo);
                objDashboardDetail.PageSize = pageSizeDashBoardcandidates;
                objDashboardDetail.AssociateId = string.IsNullOrEmpty(associateId) ? -1 : Convert.ToInt32(associateId);
                objDashboardDetail.VendorId = vendorId;
                objDashboardDetail.CisStatusId = cisStatus;
                objDashboardDetail.BgvFinalStatusId = bgvFinalStatus;
                objDashboardDetail.HireType = hireType;
                objDashboardDetail.SwizExcel = swizExcel;
                objDashboardDetail.OfferStatus = offerStatus;
                objDashboardDetail.CandidateDocUploadStatus = documentUploadStatus;
                dataPageIndexDashBoardcandidates = int.Parse(pageNo);
                tc.TotalCount = 0;
                ////int totalRecords = 0;
                objSession.SetSessionValue("CandidateDetail", objDashboardDetail);

                string fileName = string.Empty;
                if (processId == "1")
                {
                    fileName = "Prejoining";
                }
                else if (processId == "2")
                {
                    fileName = "Postjoining";
                }
                else
                {
                    fileName = "BGV";
                }

                dsexportToExcel = clnt.FetchCandidatesForDashboardExcel(objDashboardDetail, tc);
                if ((dsexportToExcel != null) && (dsexportToExcel.Tables[1].Rows.Count > 0))
                {
                    DataTable dtexportToExcel = dsexportToExcel.Tables[0];
                    dsexportToExcel.Tables.Remove(dtexportToExcel);
                    ExportToExcel.ExportDatasetToExcel(dsexportToExcel, fileName);
                }
            }
            catch (FaultException<OBFaultContractFC> ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
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

            ////#endregion
        }

        /// <summary>
        /// Method to Fetch candidates for Excel report generation HRSS
        /// </summary>
        /// <param name="processId">process Id</param>
        /// <param name="pageNo">page Number</param>
        /// <param name="candidateID">candidate ID</param>
        /// <param name="name">for name</param>
        /// <param name="recruiterID">recruiter ID</param>
        /// <param name="emailID">email ID</param>
        /// <param name="requisition">for requisition</param>
        /// <param name="candidateType">candidate Type</param>
        /// <param name="fromDate">from Date</param>
        /// <param name="todate">to Date</param>
        /// <param name="country">for country</param>
        /// <param name="associateId">Associate Id</param>
        /// <param name="vendorId">Vendor Id</param>
        /// <param name="cisStatus">CIS Status</param>
        /// <param name="bgvFinalStatus">BGV Final Status</param>
        /// <param name="hireType">Hire Type</param>
        /// <param name="offerStatus">Offer Status</param>
        /// <param name="documentUploadStatus">document Upload Status</param>
        /// <param name="mngrDocUploadStatus">Manager Document Upload Status</param>
        protected void Exporttoexcel(string processId, string pageNo, string candidateID, string name, string recruiterID, string emailID, string requisition, int candidateType, DateTime fromDate, DateTime todate, int country, string associateId, int vendorId, int cisStatus, int bgvFinalStatus, int hireType, string offerStatus, short documentUploadStatus, short mngrDocUploadStatus)
        {
            DashboardDataDC objDashboardDetail = new DashboardDataDC();
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            Utility.UtilityMethods objUtil = new UtilityMethods();
            TotalCountDC tc = new TotalCountDC();
            DataSet dsexportToExcel = new DataSet();
            SessionHelper objSession = new SessionHelper();
            ////#region Service call to DB
            var clnt = new Service.DashBoardServices.DashBoardServicesClient();
            try
            {
                objDashboardDetail.SessionId = objUtil.SessionDetail.SessionId;
                UserRolesList usr = (UserRolesList)objSession.GetSessionValue("RolesList");
                if (usr == null)
                {
                    usr = objUtil.GetUserRoles();  //// Getting user role list from DB if the same is not available in session 
                }

                foreach (UserRoles roleData in usr)
                {
                    if (roleData.RoleGroupId == DC.UtilityDC.RoleGroup.HRSS)
                    {
                        objDashboardDetail.RoleId = roleData.RoleGroupCode; ////roleData.RoleDetailId;
                    }
                }

                objDashboardDetail.CandidateId = string.IsNullOrEmpty(candidateID) ? -1 : Convert.ToInt64(candidateID);
                objDashboardDetail.RecruiterID = string.IsNullOrEmpty(recruiterID) ? -1 : int.Parse(recruiterID);
                objDashboardDetail.CandidateEmailId = emailID;
                objDashboardDetail.Requisition = requisition;
                objDashboardDetail.CandidateType = candidateType;
                objDashboardDetail.ProcessID = int.Parse(processId);
                objDashboardDetail.CountryID = country;
                objDashboardDetail.FromDate = fromDate;
                objDashboardDetail.ToDate = todate;
                objDashboardDetail.CandidateFName = name;
                objDashboardDetail.PageNo = int.Parse(pageNo);
                objDashboardDetail.PageSize = pageSizeDashBoardcandidates;
                objDashboardDetail.AssociateId = string.IsNullOrEmpty(associateId) ? -1 : Convert.ToInt32(associateId);
                objDashboardDetail.VendorId = vendorId;
                objDashboardDetail.CisStatusId = cisStatus;
                objDashboardDetail.BgvFinalStatusId = bgvFinalStatus;
                objDashboardDetail.HireType = hireType;
                objDashboardDetail.OfferStatus = offerStatus;
                objDashboardDetail.CandidateDocUploadStatus = documentUploadStatus;
                objDashboardDetail.MngrDocUploadStatus = mngrDocUploadStatus;
                dataPageIndexDashBoardcandidates = int.Parse(pageNo);
                tc.TotalCount = 0;
                //// int totalRecords = 0;
                objSession.SetSessionValue("CandidateDetail", objDashboardDetail);

                string fileName = string.Empty;
                if (processId == "1")
                {
                    fileName = "Prejoining";
                }
                else if (processId == "2")
                {
                    fileName = "Postjoining";
                }
                else if (processId == "4")
                {
                    fileName = "H-Transfer";
                }
                else
                {
                    fileName = "BGV";
                }

                dsexportToExcel = clnt.FetchCandidatesForDashboardExcel(objDashboardDetail, tc);
                if ((dsexportToExcel != null) && (dsexportToExcel.Tables[1].Rows.Count > 0))
                {
                    DataTable dtexportToExcel = dsexportToExcel.Tables[0];
                    dsexportToExcel.Tables.Remove(dtexportToExcel);
                    ExportToExcel.ExportDatasetToExcel(dsexportToExcel, fileName);
                }
            }
            catch (FaultException<OBFaultContractFC> ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
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
            ////#endregion
        }
    }
}

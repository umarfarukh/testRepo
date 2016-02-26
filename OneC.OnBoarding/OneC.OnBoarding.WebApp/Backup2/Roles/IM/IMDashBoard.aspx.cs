//-----------------------------------------------------------------------=
// <copyright file="IMDAshBoard.aspx.cs" company="Cognizant Technology Solutions">
// Copyright  . All Rights Reserved.
// </copyright>
//-----------------------------------------------------------------------

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp.Roles.IM       
 * Page Name        : IMDashBoard.aspx
 * Version          : 1.0
 * Type             : Web page class file
 * Purpose          : Page For IM DashBoard
 * Created date     : 2012-MAR-29
 * Author           : 208099
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
namespace OneC.OnBoarding.WebApp.Roles.IM
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
    using System.Net;
    using System.Net.Security;
    using System.Reflection;
    using System.Security.Cryptography.X509Certificates;
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
    using Microsoft.Exchange.WebServices.Data;
    using OneC.OnBoarding.DC.CandidateDC;
    using OneC.OnBoarding.DC.DashBoardDC;
    using OneC.OnBoarding.DC.UtilityDC;
    using OneC.OnBoarding.WebApp.Service.CandidateServices;
    using OneC.OnBoarding.WebApp.Service.DashBoardServices;
    using OneC.OnBoarding.WebApp.Service.OBUtilityMethods;
    using OneC.OnBoarding.WebApp.Utility;
    #endregion Namespaces

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1506:AvoidExcessiveClassCoupling", Justification = "Reviewed.")]

    /// <summary>
    /// Represents the class for IMDashBoard
    /// </summary>
    public partial class IMDashBoard : System.Web.UI.Page
    {
        #region Page initialization
        /// <summary>
        /// initializing SessionDetails
        /// </summary>
        private SessionDetails sessionDetail;
        //// <summary>
        //// 312511: Enumerator for RoleDetails
        //// </summary>
        ////  public enum RoleDetails 
        //// {
        ////    [DescriptionAttribute("R_ID_0101")]
        ////    RoleId
        //// }
        #endregion

        #region Dashboard parameters initialization
        /// <summary>
        /// initializing page Size 
        /// </summary>
        private int pageSizeDashBoardcandidates = 5;

        /// <summary>
        /// initializing total Pages Display 
        /// </summary>
        private int totalPagesDisplayDashBoardcandidates = 3;

        /// <summary>
        /// initializing data Page Index
        /// </summary>
        private int dataPageIndexDashBoardcandidates = 1;
        #endregion

        #region TaskDetails
        /// <summary>
        /// initializing page size task
        /// </summary>
        private int ipageSizeTask = 5;

        /// <summary>
        /// initializing total pages display task
        /// </summary>
        private int itotalPagesDisplayTask = 1;

        /// <summary>
        /// initializing data page Index pending task
        /// </summary>
        private int idataPageIndexPendingTask = 1;
        #endregion

        /// <summary>
        /// Initializing global object for Utility class to access utility methods
        /// </summary>
        private Utility.UtilityMethods objUtil = new UtilityMethods(); //// stylecop fix - given access modifier- 397785 

        /// <summary>
        /// Initializing global object for Utility class to access utility methods client
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields", Justification = "Reviewed.")]
        private OBUtilityMethodsClient obj = new OBUtilityMethodsClient(); //// stylecop fix - given access modifier- 397785 

        /// <summary>
        /// initializing session helper
        /// </summary>
        private SessionHelper objSession = new SessionHelper();  //// stylecop fix - given access modifier- 397785 
  
        #region WebMethods

        [WebMethod]

        /// <summary>
        /// Binds the Candidate type 
        /// </summary>
        /// <returns>candidate type</returns>
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
        /// Binds Country for IM
        /// </summary>
        /// <returns>country bind</returns>
        [WebMethod]
        public static DashboardDataDC[] BindCountry()
        {
            try
            {
                DashBoardServicesClient objDashBoardClient = new DashBoardServicesClient();
                //// IMDashBoard objIMDashBoard = new IMDashBoard();
                DashboardDataDC objCandidateDetail = new DashboardDataDC();
                Utility.UtilityMethods objUtil = new UtilityMethods();
                ////  objCandidateDetail.LoginId = objUtil.sessionDetail.LoginId;
                objCandidateDetail.SessionId = objUtil.SessionDetail.SessionId;
                SessionHelper objSession = new SessionHelper();
                UserRolesList usr = (UserRolesList)objSession.GetSessionValue("RolesList");

                if (usr == null)
                {
                    usr = objUtil.GetUserRoles();  //// Getting user role list from DB if the same is not available in session 
                }

                foreach (UserRoles roleData in usr)
                {
                    if (roleData.RoleGroupId == DC.UtilityDC.RoleGroup.IM)
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
        }

        /// <summary>
        /// Represents a customer in the database in grid view.
        /// </summary>
        /// <param name="gridView">grid view</param>
        /// <param name="processId">process Id</param>
        /// <param name="pageNo">page no</param>
        /// <param name="candidateID">candidate ID</param>
        /// <param name="name">name of the candidate</param>
        /// <param name="emailID">email Id</param>
        /// <param name="recruiterID">recruiter ID</param>
        /// <param name="fromDate">from date</param>
        /// <param name="todate">to date</param>
        /// <param name="country">country id</param>
        /// <param name="hireType">Hire type</param>
        /// <returns>customer in database</returns>
        [WebMethod]
        public static string TransformXML(string gridView, string processId, string pageNo, string candidateID, string name, string emailID, string recruiterID, DateTime fromDate, DateTime todate, int country, int hireType)
        {
            try
            {
                IMDashBoard objIMDashBoard = new IMDashBoard();
                ////CandidateDetailList objCandidateDetailList = new CandidateDetailList();
                CandidateDetail objCandidateDetail = new CandidateDetail();
                TotalCountDC tc = new TotalCountDC();
                CandidateDetail[] cand;
                Utility.UtilityMethods objUtil = new UtilityMethods();
                objCandidateDetail.AssociateId = int.Parse(objUtil.SessionDetail.LoginId);
                SessionHelper objSession = new SessionHelper();
                UserRolesList usr = (UserRolesList)objSession.GetSessionValue("RolesList");
                if (usr == null)
                {
                    usr = objUtil.GetUserRoles();  //// Getting user role list from DB if the same is not available in session 
                }

                foreach (UserRoles roleData in usr)
                {
                    if (roleData.RoleGroupId == DC.UtilityDC.RoleGroup.IM && roleData.RoleCountryId == country.ToString())
                    {
                        objCandidateDetail.RoleId = roleData.RoleDetailId;
                    }
                }

                if (!string.IsNullOrEmpty(candidateID))
                {
                    objCandidateDetail.CandidateId = Convert.ToInt64(candidateID);
                }

                objCandidateDetail.RecruiterID = string.IsNullOrEmpty(recruiterID) ? -1 : int.Parse(recruiterID);            
                objCandidateDetail.CandidateEmailId = emailID;
                objCandidateDetail.ProcessID = int.Parse(processId);
                objCandidateDetail.CountryID = country;
                objCandidateDetail.FromDate = fromDate;
                objCandidateDetail.ToDate = todate;
                objCandidateDetail.CandidateFName = name;
                objCandidateDetail.Excel = int.Parse(gridView);
                objCandidateDetail.PageNo = int.Parse(pageNo);
                objCandidateDetail.PageSize = objIMDashBoard.pageSizeDashBoardcandidates;
                objCandidateDetail.HireType = hireType;
                objIMDashBoard.dataPageIndexDashBoardcandidates = int.Parse(pageNo);
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
                    return objIMDashBoard.LoadData(candidateDetailListColl, tc.TotalCount) + "*#@ 1"; ////-1 added to enable export button
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
        /// <param name="startIndex"> start index</param>
        /// <param name="pageNo">page number</param>
        /// <returns> candidate details</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", MessageId = "startIndex", Justification = "Reviewed.")]
        [WebMethod]
        public static string PersonalDataTaskPagination(int startIndex, int pageNo)
        {
            try
            {
                SessionHelper objSession = new SessionHelper();
                CandidateDetail candidateDetails = (CandidateDetail)objSession.GetSessionValue("Task");
                candidateDetails.PageNo = pageNo;
                IMDashBoard objIMPage = new IMDashBoard();
                candidateDetails.PageSize = objIMPage.ipageSizeTask;
                //// objCandidateDetail.PageSize = objIMDashBoard.ipageSizeDashBoardcandidates;
                objIMPage.idataPageIndexPendingTask = pageNo;
                objSession.SetSessionValue("PaginationTask", pageNo);
                return objIMPage.LoadPersonalDetails(candidateDetails);
            }
            catch (Exception)
            {
                throw;
            }
        }
        ////  protected void excelview_Click(object sender, EventArgs e) - As per M, Jayalakshmi (Cognizant) removed the code  
     
        /// <summary>
        /// to Clear the existing session
        /// </summary>
        [WebMethod]
        public static void ClearSession()
        {
            SessionHelper objSession = new SessionHelper();
            objSession.RemoveSessionKey("PaginationTask");
            objSession.RemoveSessionKey("Task");
            objSession.RemoveSessionKey("TrainingDetail");
        }

        /// <summary>
        /// sub function to bind drill down
        /// </summary>
        /// <param name="candidateID">candidate ID</param>
        /// <param name="processId">process ID</param>
        /// <returns>personal data</returns>
        [WebMethod]
        public static string PersonalData(long candidateID, int processId)
        {
            try
            {
                SessionHelper objSession = new SessionHelper();
                IMDashBoard objIMPage = new IMDashBoard();
                CandidateDetail objCandidateDetail = new CandidateDetail();
                objCandidateDetail.CandidateId = candidateID;
                objCandidateDetail.ProcessID = processId;
                objCandidateDetail.RoleId = DC.UtilityDC.RoleGroup.IM.GetHashCode().ToString();
                objCandidateDetail.PageNo = objIMPage.idataPageIndexPendingTask;
                objCandidateDetail.PageSize = objIMPage.ipageSizeTask;
                objSession.SetSessionValue("Task", objCandidateDetail);
                ////  HttpContext.Current.Session.Add("Task", objCandidateDetail);
                return objIMPage.LoadPersonalDetails(objCandidateDetail);
            }
            catch (Exception)
            {
                throw;
            }
        }
     
        /// <summary>
        /// method for bing training name
        /// </summary>
        /// <param name="countryId">Country Id</param>
        /// <returns>array list</returns>
        [WebMethod]
        public static ArrayList BindTrainingName(int countryId)
        {
            ////Creating new client to get message from DB
            var clntUtility = new CandidateServicesClient();
            NewHireTrainingDC objTrainingDC = new NewHireTrainingDC();
            objTrainingDC.CountryId = countryId;
            NewHireTrainingDC[] objDC = null;
            ArrayList arlist = new ArrayList();
            int i = 0;        
                clntUtility.Open();
                objDC = clntUtility.FetchTrainingMaster(objTrainingDC);
                foreach (NewHireTrainingDC aa in objDC)
                {
                    arlist.Add(new { ID = aa.TrainingId, Description = aa.TrainingName });
                    i += 1;
                }

             clntUtility.Close();           
            return arlist;
        }

        /// <summary>
        /// 208099: Method to Update Training Date of a Candidate
        /// </summary>
        /// <param name="candidateId">candidate Id</param>
        /// <param name="trainingId">training Id</param>
        /// <param name="mode">mode of update</param>
        /// <param name="countryId">Country Id</param>
        /// <param name="candidateIDs">candidate IDs</param>
        /// <param name="dayFlag">day flag</param>
        /// <returns>ret status</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", Justification = "Reviewed.")]
        [WebMethod(BufferResponse = false, Description = "Saves the content of task to DB", EnableSession = true)]
        public static int UpdateCandidateTrainingDate(int candidateId, int trainingId, int mode, int countryId, string candidateIDs, int dayFlag)
        {
            int retStatus = 0;
            ////string strCandTrainingxml = string.Empty;
            Utility.UtilityMethods objUtil = new UtilityMethods();
            long sessionId = objUtil.SessionDetail.SessionId;
            ////SaveTaskDC objsave = new SaveTaskDC();
            CandidateTrainingDC objCandTraining = new CandidateTrainingDC();
            candidateIDs = candidateIDs.Replace("/", string.Empty).ToString();                   
            objCandTraining.TrainingId = trainingId;
            objCandTraining.CandidateId = candidateId;
            objCandTraining.CandidateIdsForUpdate = candidateIDs;
            ////Creating new client to get message from DB
            var clntUtility = new CandidateServicesClient();
            try
            {
                clntUtility.Open();
              //// objCandTraining.TaskId = Convert.ToInt16(TaskID.IMTaskId);
                objCandTraining.Mode = mode;
                objCandTraining.SessionId = sessionId;
                objCandTraining.CountryId = countryId;
                objCandTraining.DayFlag = dayFlag;
                ////objCandTraining.TrainingData = "<NewHireInduction><TrainingId>" + TrainingId + "</TrainingId><TrainingStatus>2</TrainingStatus><RegistrationCount>0</RegistrationCount><AttendanceStatus>0</AttendanceStatus><AttendanceStatusDay2></AttendanceStatusDay2><AppointmentID1></AppointmentID1><AppointmentID2></AppointmentID2></NewHireInduction>";
                objCandTraining.TrainingData = "<NewHireInduction><TrainingId>" + trainingId + "</TrainingId><TrainingStatus>2</TrainingStatus><RegistrationCount>0</RegistrationCount><AttendanceStatus>0</AttendanceStatus><AttendanceStatusDay2>0</AttendanceStatusDay2><AppointmentID1></AppointmentID1><AppointmentID2></AppointmentID2><LastMeetingRequestSentDate></LastMeetingRequestSentDate><LastMeetingRequestSentBy></LastMeetingRequestSentBy><LastMeetingRequestSentTrainingDate></LastMeetingRequestSentTrainingDate><LastMeetingRequestSentDate-2></LastMeetingRequestSentDate-2><LastMeetingRequestSentBy-2></LastMeetingRequestSentBy-2><LastMeetingRequestSentTrainingDate-2></LastMeetingRequestSentTrainingDate-2></NewHireInduction>";
              ////  objCandTraining.TrainingData = strCandTrainingxml.InnerXml;
                //// doc = null;
                retStatus = clntUtility.UpdateCandidateTrainingDate(objCandTraining);               
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
                logger.LogError(ex);
            }
            finally
            {
                if (clntUtility.State != System.ServiceModel.CommunicationState.Faulted)
                {
                    clntUtility.Close();
                }
                else
                {
                    clntUtility.Abort();
                }

                clntUtility = null;
            }
             ////#region Logging Event Data
            ////string comment = "Saving of task {" + taskId.ToString() + "} resulted in status {" + retStatus.ToString() + "}";
            ////LogEventData(sessionId, candidateId, taskId, "Save task mode{" + saveMode.ToString() + "}", "SaveTaskData", objsave.TaskData, true, comment);
            ////#endregion

            return retStatus;
        }

        /// <summary>
        /// Pagination for the dashboard view 
        /// </summary>
        /// <param name="pageSize">page size</param>
        /// <param name="pageNo">page no</param>
        /// <param name="startDate">start date</param>
        /// <param name="endDate">end date</param>
        /// <param name="country">country id</param>
        /// <returns>training list</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", MessageId = "pageSize", Justification = "Reviewed.")]
        [WebMethod]
        public static ArrayList FetchTrainingData(int pageSize, int pageNo, DateTime startDate, DateTime endDate, int country)
        {
            FormsService objForm = new FormsService();
            ////Creating new client to get message from DB
            var clntUtility = new Service.CandidateServices.CandidateServicesClient();
            ArrayList objArray = new ArrayList();
            //// TrainingList objTrainingData = new TrainingList();
            Utility.UtilityMethods objUtil = new UtilityMethods();
            TotalCountDC tc = new TotalCountDC();
            string strTrainingList = string.Empty;
            SessionHelper objSession = new SessionHelper();
            NewHireTrainingDC[] objTrainingDC;
            NewHireTrainingDC objDc = new NewHireTrainingDC();
            CandidateTrainingDC objtrdc = new CandidateTrainingDC();
            tc.TotalCount = 0;
            ////int totalCount = 0;
            long sessionId = objUtil.SessionDetail.SessionId;
            try
            {
                clntUtility.Open();
                objDc.PageNo = pageNo;
                objDc.PageSize = objForm.PageSizeDashBoardcandidates;                
                objDc.StartDate = startDate;
                objDc.EndDate = endDate;
                objDc.CountryId = country;
                objtrdc.StartDate = startDate;
                objtrdc.EndDate = endDate;
                objtrdc.CountryId = country;
                objForm.DataPageIndexDashBoardcandidates = pageNo;
                objSession.SetSessionValue("TrainingDetail", objtrdc);
                objTrainingDC = clntUtility.FetchTraningData(objDc, tc);
                ////tc.TotalCount = objTrainingDC[0].TotalCount;
                ////  totalCount = objTrainingDC.Count();
               
                if (objTrainingDC != null && objTrainingDC.Count() > 0)
                {
                    tc.TotalCount = objTrainingDC[0].TotalCount;
                 ////   strTrainingList = DashboardUtility.Serialize<List<NewHireTrainingDC>>(objTrainingDC);
                    strTrainingList = DashboardUtility.Serialize(objTrainingDC);
                  ////  strTrainingList = Serialize(objTrainingDC);
                    objArray.Add(new { Display = string.Empty, Value = strTrainingList });
                    int pagesCount = tc.TotalCount / objForm.PageSizeDashBoardcandidates;  //// changed iPagesCount & iRemainder to "pagesCount" & "remainder"- 397785
                    int remainder = tc.TotalCount % objForm.PageSizeDashBoardcandidates;
                    StringBuilder sbcontent = new StringBuilder(string.Empty, 800);
                    try
                    {
                        ////Bind First
                        int firstPageNoIndex = 1;                       //// changed iFirstPageNoIndex & iFirstPageStartIndex to  "firstPageNoIndex" & "firstPageStartIndex"  - 397785
                        int firstPageStartIndex = 0;

                        ////Bind Last
                        int lastPageNoIndex = 1;                         //// changed iLastPageNoIndex & iLastPageStartIndex to  "lastPageNoIndex" & "lastPageStartIndex"  - 397785
                        int lastPageStartIndex = 0;
                        if (remainder == 0)
                        {
                            lastPageNoIndex = tc.TotalCount / objForm.PageSizeDashBoardcandidates;
                            lastPageStartIndex = ((tc.TotalCount / objForm.PageSizeDashBoardcandidates) * objForm.PageSizeDashBoardcandidates) - objForm.PageSizeDashBoardcandidates;
                        }
                        else
                        {
                            lastPageNoIndex = (tc.TotalCount / objForm.PageSizeDashBoardcandidates) + 1;
                            lastPageStartIndex = (tc.TotalCount / objForm.PageSizeDashBoardcandidates) * objForm.PageSizeDashBoardcandidates;
                        }

                        ////Bind Prev
                        int prevPageNoIndex = objForm.DataPageIndexDashBoardcandidates - 1;                                                      //// changed iPrevPageNoIndex & iPrevPageStartIndex to  "prevPageNoIndex" & "prevPageStartIndex"  - 397785
                        int prevPageStartIndex = (prevPageNoIndex * objForm.PageSizeDashBoardcandidates) - objForm.PageSizeDashBoardcandidates;
                        if (prevPageNoIndex <= firstPageNoIndex)
                        {
                            prevPageNoIndex = firstPageNoIndex;
                            prevPageStartIndex = firstPageStartIndex;
                        }

                        ////Bind Next
                        int nextPageNoIndex = objForm.DataPageIndexDashBoardcandidates + 1;                                                    //// changed iNextPageNoIndex & iNextPageStartIndex to  "nextPageNoIndex" & "nextPageStartIndex"  - 397785
                        int nextPageStartIndex = (nextPageNoIndex * objForm.PageSizeDashBoardcandidates) - objForm.PageSizeDashBoardcandidates;
                        if (nextPageNoIndex >= lastPageNoIndex)
                        {
                            nextPageNoIndex = lastPageNoIndex;
                            nextPageStartIndex = lastPageStartIndex;
                        }

                        ////Bind number of pages to display
                        int prevPageCount = objForm.DataPageIndexDashBoardcandidates - (objForm.TotalPagesDisplayDashBoardcandidates / 2);      //// changed iPrevPageCount & iNextPageCount to  "prevPageCount" & "nextPageCount"  - 397785
                        int nextPageCount = objForm.DataPageIndexDashBoardcandidates + (objForm.TotalPagesDisplayDashBoardcandidates / 2);
                        if (prevPageCount <= 0)
                        {
                            prevPageCount = firstPageNoIndex;
                            nextPageCount = firstPageNoIndex + objForm.TotalPagesDisplayDashBoardcandidates - 1;
                        }

                        if (nextPageCount >= lastPageNoIndex)
                        {
                            nextPageCount = lastPageNoIndex;
                            prevPageCount = lastPageNoIndex - objForm.TotalPagesDisplayDashBoardcandidates + 1;
                        }

                        sbcontent.Append("<div class=\"pagination\">");
                        sbcontent.Append("<div class=\"btn_pagination\" >");
                        sbcontent.Append("<div class=\"flt_right\" style=\"margin-top:47px\">");

                        if ((pagesCount > 0) && (tc.TotalCount > objForm.PageSizeDashBoardcandidates))
                        {
                            if (objForm.DataPageIndexDashBoardcandidates == 1)
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
                                    int startIndex = (i * objForm.PageSizeDashBoardcandidates) - objForm.PageSizeDashBoardcandidates; //// stylecop- changed iStartIndex to startIndex 397785
                                    if (i.Equals(objForm.DataPageIndexDashBoardcandidates))
                                    {
                                        sbcontent.Append("<span class='active_point'>" + i.ToString() + "</span>");
                                    }
                                    else
                                    {
                                        sbcontent.Append("<a href=\"javascript:PaginationDashboard(" + startIndex.ToString() + "," + i.ToString() + ")\">" + i.ToString() + "</a>");
                                    }
                                }
                            }

                            if (objForm.DataPageIndexDashBoardcandidates == lastPageNoIndex)
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
                        sbcontent.Append("</div><span class=\"totalResult\" style=\"margin-top:50px\" >Total (" + tc.TotalCount + ")</span> </div><div class=\"clear\"></div></div>");
                    }
                    catch
                    {
                        throw;
                    }
                    ////  return sbContent.ToString() + "<div class='clear'></div>";
                    objArray.Add(new { Display = string.Empty, Value = sbcontent.ToString() + "<div class='clear'></div>" });
                    //// clntUtility.Close(); //// already closed in final block
                }
                else if (tc.TotalCount.Equals(0))
                    {
                    objArray.Add(new { Display = string.Empty, Value = "<div id=\"footer\" class=\"footer_rc_invalid\"> <p>Oops!!! No such result found!</p> </div>" });
                    objArray.Add(new { Display = string.Empty, Value = string.Empty });
                    }
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
                logger.LogError(ex);
            }
            finally
            {
                if (clntUtility.State != System.ServiceModel.CommunicationState.Faulted)
                {
                    clntUtility.Close();
                }
                else
                {
                    clntUtility.Abort();
                }

                clntUtility = null;
            }

            return objArray;
           ////  return strTrainingList;
        }

        /// <summary>
        /// Pagination for the dashboard view 
        /// </summary>
        /// <param name="trainingId"> Training Id </param>
        /// <param name="countryId"> country Id </param>
        /// <returns>records list</returns>
        [WebMethod]
        public static ArrayList FetchTrainingDrillDownData(int trainingId, int countryId)
        {
            var clntUtility = new Service.CandidateServices.CandidateServicesClient();
            ArrayList objArray = new ArrayList();
            string strTrainingList = string.Empty;
            Utility.UtilityMethods objUtil = new UtilityMethods();
            long sessionId = objUtil.SessionDetail.SessionId;
            CandidateTrainingDC objTrainingDC = new CandidateTrainingDC();
            CandidateTrainingDC[] objTrainingDCArray;
            try
            {
                clntUtility.Open();
                objTrainingDC.TrainingId = trainingId;
                objTrainingDC.CountryId = countryId;
                objTrainingDCArray = clntUtility.FetchTrainingDrillDownData(objTrainingDC);
                if (objTrainingDCArray.Count().Equals(0))
                {
                    objArray.Add(new { Display = string.Empty, Value = string.Empty });
                    objArray.Add(new { Display = string.Empty, Value = "<div class=\"footer_rc_invalid\"> <p>Oops!!! No such result found!</p> </div>" });
                }
                else
                {
                   //// strTrainingList = ObjectSerializer(objTrainingDCArray);
                    strTrainingList = DashboardUtility.Serialize(objTrainingDCArray);
                    objArray.Add(new { Display = string.Empty, Value = strTrainingList });
                    objArray.Add(new { Display = string.Empty, Value = string.Empty });
                }

                //// clntUtility.Close();//// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
                logger.LogError(ex);
            }
            finally
            {
                if (clntUtility.State != System.ServiceModel.CommunicationState.Faulted)
                {
                    clntUtility.Close();
                }
                else
                {
                    clntUtility.Abort();
                }

                clntUtility = null;
            }

            return objArray;
            //// clntUtility.Close();
        }

        /// <summary>
        /// 208099: Method to Update Training Data
        /// </summary>
        /// <param name="countryId">country Id</param>
        /// <param name="trainingId">training id</param>
        /// <param name="dateToUpdate">date to update</param>
        /// <param name="mode">mode of update</param>
        /// <returns>ret status</returns>
        [WebMethod(BufferResponse = false, Description = "Saves the content of task to DB", EnableSession = true)]
        public static int UpdateNHOTrainingData(int countryId, int trainingId, string dateToUpdate, int mode)
        {
            int retStatus = 0;
            ////  string str = taskData;
            ////SaveTaskDC objsave = new SaveTaskDC();
            NewHireTrainingDC objTraining = new NewHireTrainingDC();
            Utility.UtilityMethods objUtil = new UtilityMethods();
            long sessionId = objUtil.SessionDetail.SessionId;
            objTraining.TrainingId = trainingId;
            objTraining.TrainingScheduledDate = dateToUpdate;
            objTraining.SessionId = sessionId;
            objTraining.Mode = mode;
            objTraining.CountryId = countryId;
            ////Creating new client to get message from DB
            var clntUtility = new CandidateServicesClient();
            try
            {
                clntUtility.Open();
                retStatus = clntUtility.UpdateNHOTrainingData(objTraining);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
                logger.LogError(ex);
            }
            finally
            {
                if (clntUtility.State != System.ServiceModel.CommunicationState.Faulted)
                {
                    clntUtility.Close();
                }
                else
                {
                    clntUtility.Abort();
                }

                clntUtility = null;
            }
            ////#region Logging Event Data
            ////string comment = "Saving of task {" + taskId.ToString() + "} resulted in status {" + retStatus.ToString() + "}";
            ////LogEventData(sessionId, candidateId, taskId, "Save task mode{" + saveMode.ToString() + "}", "SaveTaskData", objsave.TaskData, true, comment);
            ////#endregion
            return retStatus;
        }

        #region SendMail with NotificationID
        /// <summary>
        /// 208099:Method to send mail
        /// </summary>
        /// <param name="notificationMasterId">Notification MasterId</param>
        /// <param name="countryID">CountryId of logged in candidate</param>
        /// <param name="candidateID">CandidateId of logged in candidate</param>
        /// <returns>ret status</returns>
        [WebMethod(BufferResponse = true, Description = "Method to send mail", EnableSession = true)]
        public static int SendInductionDateChange(int notificationMasterId, int countryID, int candidateID)
        {
            int retStatus = 0;
            long sessionId;
            SessionDetails sessionDetail;
            Utility.UtilityMethods objUtil = new UtilityMethods();
            sessionDetail = objUtil.SessionDetail;
            sessionId = sessionDetail.SessionId;
            var clntUtility = new OBUtilityMethodsClient();
            try
            {
                clntUtility.Open();
                //// Sends Induction Date Cahnge Mail
                MailData objMailData = new MailData();
                objMailData.NotificationMasterId = notificationMasterId;
                objMailData.CountryId = countryID;
                objMailData.SessionId = sessionId;
                objMailData.CandidateId = candidateID;
               //// objMailData.ToId = candidateID.ToString();
                //// SendMail(24, null, countryId);
                retStatus = clntUtility.SendNotificationMail(objMailData);
                //// clntUtility.Close(); //// already closed in final block
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
                logger.LogError(ex);
            }
            finally
            {
                if (clntUtility.State != System.ServiceModel.CommunicationState.Faulted)
                {
                    clntUtility.Close();
                }
                else
                {
                    clntUtility.Abort();
                }

                clntUtility = null;
            }

            return retStatus;
        }

        #endregion
        /// <summary>
        /// Binds Default Date for Dashboard
        /// </summary>
        /// <param name="countryID">Country ID</param>
        /// <returns>Array list</returns>
        [WebMethod]
        public static ArrayList GetDefaultDate(int countryID)
        {
            try
            {
                SystemKey sysKey = new SystemKey();
                OBUtilityMethodsClient obj = new OBUtilityMethodsClient();
                ArrayList objArray = new ArrayList();
                string dattimNHOSDate, dattimNHOEDate, dattimSDate, dattimEDate;
                sysKey.CountryId = countryID;
                sysKey.KeyGroupCode = "DASHBOARD_START_DATE";
                sysKey = obj.GetFilterDate(sysKey);
                DateTime dtStartDate = DateTime.Today.AddDays(Convert.ToInt16(sysKey.KeyValue)); ////DateTime.Today.AddDays(Convert.ToInt16(objDC.StartDate)) ;
                dattimSDate = dtStartDate.ToShortDateString();
                sysKey.KeyGroupCode = "DASHBOARD_END_DATE";
                sysKey = obj.GetFilterDate(sysKey);
                DateTime dtEndDate = DateTime.Today.AddMonths(Convert.ToInt16(sysKey.KeyValue)); ////DateTime.Today.AddDays(Convert.ToInt16(objDC.EndDate));
                dattimEDate = dtEndDate.ToShortDateString();
                sysKey.KeyGroupCode = "NHO_START_FILTERS";
                sysKey = obj.GetFilterDate(sysKey);
                DateTime dattimNHOStartDate = DateTime.Today.AddDays(Convert.ToInt16(sysKey.KeyValue)); ////DateTime.Today.AddDays(Convert.ToInt16(objDC.StartDate)) ;
                dattimNHOSDate = dattimNHOStartDate.ToShortDateString();
                sysKey.KeyGroupCode = "NHO_END_FILTERS";
                sysKey = obj.GetFilterDate(sysKey);
                DateTime dattimNHOEndDate = DateTime.Today.AddMonths(Convert.ToInt16(sysKey.KeyValue)); ////DateTime.Today.AddDays(Convert.ToInt16(objDC.EndDate));
                dattimNHOEDate = dattimNHOEndDate.ToShortDateString();
                objArray.Add(new { Display = "Start Date", Value = dattimSDate });
                objArray.Add(new { Display = "End Date", Value = dattimEDate });
                objArray.Add(new { Display = "Start Date", Value = dattimNHOSDate });
                objArray.Add(new { Display = "End Date", Value = dattimNHOEDate });
                return objArray;
            }
            catch (Exception)
            {
                throw;
            }
        }

        #region InductionDiaryInvites
        /// <summary>
        /// 261890:Method to Create Diary Invite
        /// </summary>
        /// <param name="retTrainingList">Candidate Training data arrayList</param>
        /// <param name="cnt">Count of the candidate in arrayList</param>
        /// <returns>status Invite</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", Justification = "Reviewed.")]
        public static int SendDiaryInvite(NewHireTrainingDC[] retTrainingList, int cnt)
        {
            int statusInvite = 0;
            long sessionid = retTrainingList[0].SessionId;
            try
            {
                if (retTrainingList[cnt].RequiredAttendees != null)
                {
                    ExchangeService service1 = new ExchangeService();
                    ServicePointManager.ServerCertificateValidationCallback =
                    delegate(object obj, X509Certificate certificate, X509Chain chain, SslPolicyErrors errors)
                    {
                        //// trust any certificate
                        return true;
                    };
                    string serviceAccount = retTrainingList[cnt].ServiceAccount;
                    string servicePW = retTrainingList[cnt].ServicePWD;
                    string serviceDomain = retTrainingList[cnt].ServiceDomain;
                    string serviceUrl = retTrainingList[cnt].ServiceUrl.ToString(); //// stylecop fix  changed serviceUrl to ServiceUrl -- by 397785 on behalf of 316778
                    service1.Credentials = new NetworkCredential(serviceAccount, servicePW, serviceDomain);
                    service1.Url = new Uri(serviceUrl);
                    if (retTrainingList[cnt].OperationType == 1)
                    {
                        Appointment app = new Appointment(service1);
                        app.Subject = retTrainingList[cnt].Subject;
                        app.Body = new MessageBody(BodyType.HTML, retTrainingList[cnt].Body);
                        app.StartTimeZone = TimeZoneInfo.FindSystemTimeZoneById("GMT Standard Time");
                        app.EndTimeZone = TimeZoneInfo.FindSystemTimeZoneById("GMT Standard Time");
                        app.Location = retTrainingList[cnt].Location;
                        app.Start = retTrainingList[cnt].MeetingStartDate;
                        app.End = retTrainingList[cnt].MeetingEndDate;
                        if (retTrainingList[cnt].IsReminderSet == "true")
                        {
                            app.IsReminderSet = true;
                        }

                        app.ReminderMinutesBeforeStart = retTrainingList[cnt].ReminderMinutesBeforeStart;
                        app.RequiredAttendees.Add(retTrainingList[cnt].RequiredAttendees);
                        if (retTrainingList[cnt].OfcMailId != retTrainingList[cnt].RequiredAttendees)
                        {
                            app.RequiredAttendees.Add(retTrainingList[cnt].OfcMailId);
                        }

                        app.Save(SendInvitationsMode.SendToAllAndSaveCopy);
                        //// int returnstatus = 
                            SaveMeetingID(app.Id.ToString(), sessionid, retTrainingList[cnt].TaskId, retTrainingList[cnt].Candidateid, 1, retTrainingList[cnt].MeetingRequestNum);
                        ////SaveMeetingID meetingDet = new SaveMeetingID();
                        ////meetingDet.MeetingID = app.Id.ToString();
                        ////meetingDet.SessionId = sessionId;
                        ////meetingDet.TaskId = objCandTraining.TaskId;
                        ////meetingDet.CandidateId = objCandTraining.CandidateId;
                    }
                }

                statusInvite = 1;
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionid);
                logger.LogError(ex);
                statusInvite = 0;
            }

            return statusInvite;
        }

        /// <summary>
        /// 261890:Method to Update Diary Invite
        /// </summary>
        /// <param name="retTrainingList">Candidate Training data arrayList</param>
        /// <param name="cnt">Count of the candidate in arrayList</param>
        /// <returns>update Status</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", Justification = "Reviewed.")]
        public static int UpdateDiaryInvite(NewHireTrainingDC[] retTrainingList, int cnt)
        {
            int updStatus = 0;
            long sessionid = retTrainingList[0].SessionId;
            try
            {
                ExchangeService service1 = new ExchangeService();
                ServicePointManager.ServerCertificateValidationCallback =
                delegate(object obj, X509Certificate certificate, X509Chain chain, SslPolicyErrors errors)
                {
                    //// trust any certificate
                    return true;
                };
                string serviceAccount = retTrainingList[cnt].ServiceAccount;
                string servicePW = retTrainingList[cnt].ServicePWD;
                string serviceDomain = retTrainingList[cnt].ServiceDomain;
                string serviceUrl = retTrainingList[cnt].ServiceUrl.ToString();    //// stylecop fix  changed serviceUrl to ServiceUrl -- by 397785 on behalf of 316778          
                service1.Credentials = new NetworkCredential(serviceAccount, servicePW, serviceDomain);
                service1.Url = new Uri(serviceUrl);
                Appointment app = Appointment.Bind(service1, new ItemId(retTrainingList[cnt].MeetingID.ToString()));
                app.Start = retTrainingList[cnt].MeetingStartDate;
                app.End = retTrainingList[cnt].MeetingEndDate;
                app.Body = new MessageBody(BodyType.HTML, retTrainingList[cnt].Body);
                app.StartTimeZone = TimeZoneInfo.FindSystemTimeZoneById("GMT Standard Time");
                app.EndTimeZone = TimeZoneInfo.FindSystemTimeZoneById("GMT Standard Time");
                app.Location = retTrainingList[cnt].Location;
                if (retTrainingList[cnt].OfcMailId != retTrainingList[cnt].RequiredAttendees)
                {
                    app.RequiredAttendees.Add(retTrainingList[cnt].OfcMailId);
                }

                app.Update(ConflictResolutionMode.AlwaysOverwrite);
                //// int returnstatus =
                    SaveMeetingID(app.Id.ToString(), sessionid, retTrainingList[cnt].TaskId, retTrainingList[cnt].Candidateid, 2, retTrainingList[cnt].MeetingRequestNum);
                updStatus = 1;
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionid);
                logger.LogError(ex);
                updStatus = 0;
            }

            return updStatus;
        }

        /// <summary>
        /// 261890:Method to Cancel Diary Invite
        /// </summary>
        /// <param name="retTrainingList">Candidate Training data arrayList</param>
        /// <param name="cnt">Count of the candidate in arrayList</param>
        /// <returns>cancel Status</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", Justification = "Reviewed.")]
        public static int CancelDiaryInvite(NewHireTrainingDC[] retTrainingList, int cnt)
        {
            int cnclStatus = 0;
            long sessionid = retTrainingList[0].SessionId;
            try
            {
                ExchangeService service1 = new ExchangeService();
                ServicePointManager.ServerCertificateValidationCallback =
                delegate(object obj, X509Certificate certificate, X509Chain chain, SslPolicyErrors errors)
                {
                    //// trust any certificate
                    return true;
                };
                string serviceAccount = retTrainingList[cnt].ServiceAccount;
                string servicePW = retTrainingList[cnt].ServicePWD;
                string serviceDomain = retTrainingList[cnt].ServiceDomain;
                string serviceUrl = retTrainingList[cnt].ServiceUrl.ToString(); //// stylecop fix  changed serviceUrl to ServiceUrl -- by 397785 on behalf of 316778
                service1.Credentials = new NetworkCredential(serviceAccount, servicePW, serviceDomain);
                service1.Url = new Uri(serviceUrl);
                Appointment app = Appointment.Bind(service1, new ItemId(retTrainingList[cnt].MeetingID.ToString()));
                app.CancelMeeting("Your Induction Manager cancelled your Induction Progarm.");
                //// int returnstatus = 
                    SaveMeetingID(app.Id.ToString(), sessionid, retTrainingList[cnt].TaskId, retTrainingList[cnt].Candidateid, 3, retTrainingList[cnt].MeetingRequestNum);
                cnclStatus = 1;
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionid);
                logger.LogError(ex);
                cnclStatus = 0;
            }

            return cnclStatus;
        }

        /// <summary>
        /// method for saving meeting id
        /// </summary>
        /// <param name="meetingID">Meeting Id</param>
        /// <param name="sessionId">Session Id</param>
        /// <param name="taskId">Task Id</param>
        /// <param name="candidateId">Candidate Id</param>
        /// <param name="mode">Mode of save</param>
        /// <param name="meetingRequestNum">meeting request Number</param>
        /// <returns>return status</returns>
        public static int SaveMeetingID(string meetingID, long sessionId, int taskId, long candidateId, int mode, int meetingRequestNum)
        {
            int returnstatus;
            SaveMeetingID meetingDet = new SaveMeetingID();
            meetingDet.MeetingID = meetingID;
            meetingDet.SessionId = sessionId;
            meetingDet.TaskId = taskId;
            meetingDet.CandidateId = candidateId;
            meetingDet.Mode = mode;
            meetingDet.MeetingRequestNum = meetingRequestNum;
            var meetinUtility = new CandidateServicesClient();
            try
            {
                meetinUtility.Open();
                meetinUtility.SaveMeetingID(meetingDet);
                //// meetinUtility.Close(); //// already closed in final block
                returnstatus = 1;
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
                logger.LogError(ex);
                returnstatus = 0;
            }
            finally
            {
                if (meetinUtility.State != System.ServiceModel.CommunicationState.Faulted)
                {
                    meetinUtility.Close();
                }
                else
                {
                    meetinUtility.Abort();
                }

                meetinUtility = null;
            }

            return returnstatus;
        }

        /// <summary>
        /// method to send induction dairy invite
        /// </summary>
        /// <param name="candidateId">Candidate Id</param>
        /// <param name="trainingId">Training Id</param>
        /// <param name="countryId">Country Id</param>
        /// <param name="mode">Mode to send</param>
        /// <returns>ret status</returns>
        [WebMethod(BufferResponse = false, Description = "Sends induction Diary invite", EnableSession = true)]
        public static int SendInductionDiaryInvite(int candidateId, int trainingId, int countryId, int mode)
        {
            int retStatus = 0;
            int successCnt = 0;
            NewHireTrainingDC[] retTrainingList;
            Utility.UtilityMethods objUtil = new UtilityMethods();
            long sessionId = objUtil.SessionDetail.SessionId;
            ////SaveTaskDC objsave = new SaveTaskDC();
            CandidateTrainingDC objCandTraining = new CandidateTrainingDC();
            objCandTraining.CandidateId = candidateId;
            objCandTraining.TrainingId = trainingId;
            objCandTraining.CountryId = countryId;
            objCandTraining.Mode = mode;
            
            var clntUtility = new CandidateServicesClient();
            try
            {
                clntUtility.Open();
                retTrainingList = clntUtility.SendInductionDiaryInvites(objCandTraining);
                int trainingListLength = 0;
                int cnt = 0;               
                trainingListLength = retTrainingList.Length;
                if (retTrainingList != null && retTrainingList[cnt].InductionDiaryFlag == 1)
                {
                    while (cnt < trainingListLength)
                    {
                        ////To check whether Mail id is not empty
                        if (retTrainingList[cnt].RequiredAttendees != null) 
                        {
                            ////retTrainingList[cnt].Candidateid = objCandTraining.CandidateId;
                            ////retTrainingList[cnt].TaskId = objCandTraining.TaskId;
                            retTrainingList[cnt].SessionId = sessionId;
                            retTrainingList[cnt].MeetingRequestNum = 1;                            
                            if (retTrainingList[cnt].OperationType == 1)
                            {
                                ////OperationType--1 is to create the Diary Invite
                                int ret1 = SendDiaryInvite(retTrainingList, cnt);                             
                                if (retTrainingList[cnt].Score == 1 && ret1 == 1) 
                                {
                                    ////It will process the second meeting request only when scoreFlag  is '1' and first meeting request got successfully created
                                    retTrainingList[cnt].MeetingStartDate = retTrainingList[cnt].MeetingStartDate2;
                                    retTrainingList[cnt].MeetingEndDate = retTrainingList[cnt].MeetingEndDate2;
                                    ////retTrainingList[cnt].Body = retTrainingList[cnt].Body2;
                                    retTrainingList[cnt].MeetingRequestNum = 2;
                                    int ret2 = SendDiaryInvite(retTrainingList, cnt);
                                    if (ret2 == 1)
                                    {
                                        successCnt = successCnt + 1;
                                    }
                                }
                                else if (ret1 == 1)
                                {
                                    successCnt = successCnt + 1;
                                }
                            }                           
                            else if (retTrainingList[cnt].OperationType == 2) 
                            {
                                ////OperationType--2 is to update the Diary Invite
                                int ret1 = UpdateDiaryInvite(retTrainingList, cnt);
                                if (retTrainingList[cnt].Score == 1 && ret1 == 1) 
                                {
                                    ////It will process the second meeting request only when scoreFlag  is '1' and first meeting request got successfully created
                                    retTrainingList[cnt].MeetingID = retTrainingList[cnt].MeetingID2;
                                    retTrainingList[cnt].MeetingStartDate = retTrainingList[cnt].MeetingStartDate2;
                                    retTrainingList[cnt].MeetingEndDate = retTrainingList[cnt].MeetingEndDate2;
                                    ////retTrainingList[cnt].Body = retTrainingList[cnt].Body2;
                                    retTrainingList[cnt].MeetingRequestNum = 2;
                                    int ret2 = UpdateDiaryInvite(retTrainingList, cnt);
                                    if (ret2 == 1)
                                    {
                                        successCnt = successCnt + 1;
                                    }
                                }
                                else if (ret1 == 1)
                                {
                                    successCnt = successCnt + 1;
                                }
                            }
                            else if (retTrainingList[cnt].OperationType == 3)  
                            {
                                ////OperationType--3 is to cancel the Diary Invite
                                int ret1 = CancelDiaryInvite(retTrainingList, cnt);
                                if (retTrainingList[cnt].Score == 1)
                                {
                                    retTrainingList[cnt].MeetingID = retTrainingList[cnt].MeetingID2;
                                    retTrainingList[cnt].MeetingRequestNum = 2;
                                    int ret2 = CancelDiaryInvite(retTrainingList, cnt);
                                    if (ret2 == 1)
                                    {
                                        successCnt = successCnt + 1;
                                    }
                                }
                                else if (ret1 == 1)
                                {
                                    successCnt = successCnt + 1;
                                }
                            }                          
                        }

                        cnt++;
                    }

                    retStatus = successCnt;
                }            
            }
            catch (Exception ex)
            {
                retStatus = successCnt;
                ErrorLogger logger = new ErrorLogger(sessionId);
                logger.LogError(ex);
            }

            return retStatus;
        }
        #endregion
        /// <summary>
        /// sub function to bind drill down
        /// </summary>
        /// <param name="objCandidateDetail"> Candidate details</param>
        /// <returns>string Writer Personal Data</returns>
         [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", MessageId = "obj", Justification = "Reviewed.")]
        public string LoadPersonalDetails(CandidateDetail objCandidateDetail)
        {
            //// Create a resolver with default credentials.
            SessionHelper objSessionHelper = new SessionHelper();
            objSessionHelper.SetSessionValue("CandidateDetails", objCandidateDetail);
            XmlUrlResolver resolver = new XmlUrlResolver();
            resolver.Credentials = System.Net.CredentialCache.DefaultCredentials;
            //// IMDashBoard objIMPage = new IMDashBoard();
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
            TrainingList trainingList = objCandidateTask.TrainingList;
            ////int totalRecords = 0;
            ////if (candTask.Count() > 0)
            ////{
            ////    totalRecords = candTask[0].TotalRecords;
            ////}

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

            if (trainingList.Count != 0)
            {
                strOutXml = strOutXml + DashboardUtility.Serialize<TrainingList>(trainingList);
            }

            StringWriter stringWriterPersonalData = new StringWriter();
            strOutXml = strOutXml.Replace("<?xml version=\"1.0\" encoding=\"utf-16\"?>", string.Empty);
            strOutXml = "<CandidateTask>" + strOutXml + "</CandidateTask>";
            strOutXml = strOutXml.Replace("<?xml version=\"1.0\" encoding=\"utf-16\"?>", string.Empty);
            XmlDocument xmldoc = new XmlDocument();
            xmldoc.LoadXml(strOutXml);
            //// load up the stylesheet
            transform.Load(HttpContext.Current.Server.MapPath("IMDrillDownTemplate.xslt"), resolver);
            //// perform the transformation
            XPathDocument doc = new XPathDocument(new StringReader(strOutXml));
            //// if (objSessionHelper.GetSessionValue("PaginationTask") != null)
            //// objIMPage.idataPageIndexPendingTask = ((int)(objSessionHelper.GetSessionValue("PaginationTask")));
            transform.Transform(doc, null, stringWriterPersonalData, resolver);
            //// string formattedString = stringWriterPersonalData.ToString().Replace("<div id=\"paginationTask\">", " <div id=\"paginationTask\">" + objIMPage.DoPagingForTasks(totalRecords));
            return stringWriterPersonalData.ToString();
        }

        /// <summary>
        /// Binds the candidate details
        /// </summary>
        /// <param name="objCandidateDetailList"> Candidate detail list</param>
        /// <param name="totalRecords">total records</param>
        /// <returns>string Page</returns>
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
            string strStartHtml = "<div style=\"height:200px;\">  ";
            ////  doc.Add(new XElement("root", retCand.Select(x => new XElement("Data", x))));
            XmlDocument xmldoc = new XmlDocument();
            xmldoc.LoadXml(strOutXml);
            //// load up the stylesheet
            transform.Load(HttpContext.Current.Server.MapPath("IMDashBoardGrid.xslt"), resolver);
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
        /// <param name="candidateDetails"> candidate details</param>
        /// <returns>data Export To excel</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", Justification = "Reviewed.")]
        public DataTable Cover(List<CandidateTrainingDC> candidateDetails)
        {
            DataTable dtExportToexcel = new DataTable();
            dtExportToexcel.Columns.Add("CandidateId", typeof(int));
            dtExportToexcel.Columns.Add("AssociateId", typeof(int));
            dtExportToexcel.Columns.Add("CandidateName", typeof(string));
            dtExportToexcel.Columns.Add("DOJ", typeof(string));
            dtExportToexcel.Columns.Add("Grade", typeof(string));
            dtExportToexcel.Columns.Add("Department", typeof(string));
            if (candidateDetails[0].UKHireTypeFlag == 1)
            {
                dtExportToexcel.Columns.Add("HireType", typeof(string));
            }

            dtExportToexcel.Columns.Add("RegistrationDate", typeof(string));
            dtExportToexcel.Columns.Add("InductionDate", typeof(string));
            if (candidateDetails[0].UKHireTypeFlag == 1)
            {
                dtExportToexcel.Columns.Add("AttendanceStatusDay1", typeof(string));
                dtExportToexcel.Columns.Add("AttendanceStatusDay2", typeof(string));
            }
            else
            {
                dtExportToexcel.Columns.Add("AttendanceStatus", typeof(string));
            }

            dtExportToexcel.Columns.Add("EmailId", typeof(string));
            dtExportToexcel.Columns.Add("MobileNo", typeof(string));
            dtExportToexcel.Columns.Add("HiringManager", typeof(string));
            dtExportToexcel.Columns.Add("JobCode", typeof(string));
            foreach (CandidateTrainingDC candidate in candidateDetails)
            {
                DataRow dr = dtExportToexcel.NewRow();
                dr["CandidateId"] = candidate.CandidateId;
                dr["AssociateId"] = candidate.AssociateId;
                dr["CandidateName"] = candidate.AssociateName;
                dr["DOJ"] = candidate.DOJ;
                dr["Grade"] = candidate.Grade;
                dr["Department"] = candidate.Department;
                if ((candidateDetails[0].CountryId == 4) || (candidateDetails[0].CountryId == 104))
                {
                    dr["HireType"] = candidate.HireType;
                }

                dr["RegistrationDate"] = candidate.RegisteredDate;
                dr["InductionDate"] = candidate.TrainingScheduledDate;
                if ((candidateDetails[0].CountryId == 4) || (candidateDetails[0].CountryId == 104))
                {
                    dr["AttendanceStatusDay1"] = candidate.AttendanceStatusDay1;
                    dr["AttendanceStatusDay2"] = candidate.AttendanceStatusDay2;
                }
                else
                {
                    dr["AttendanceStatus"] = candidate.AttendanceStatus;
                }

                dr["EmailId"] = candidate.EmailID;
                dr["MobileNo"] = candidate.MobileNo;
                dr["HiringManager"] = candidate.HiringManager;
                dr["JobCode"] = candidate.JobCode;
                dtExportToexcel.Rows.Add(dr);
            }

            return dtExportToexcel;
        }

        #region Event Handlers
        /// <summary>
        /// Export to excel for a IM View 
        /// </summary>
        /// <param name="sender">object sender</param>
        /// <param name="e"> event e</param>
         [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1500:VariableNamesShouldNotMatchFieldNames", MessageId = "objSession", Justification = "Reviewed.")]
        protected void ExportButton_Click(object sender, EventArgs e)
        {
            try
            {
                CandidateTrainingDC objDc = new CandidateTrainingDC();
                SessionHelper objSession = new SessionHelper();
                if (objSession.GetSessionValue("TrainingDetail") != null)
                {
                    objDc = (CandidateTrainingDC)objSession.GetSessionValue("TrainingDetail");
                    ////CandidateDetail[] cand;
                    CandidateTrainingDetails objCandDetails = new CandidateTrainingDetails();
                    var clnt = new Service.DashBoardServices.DashBoardServicesClient();
                    try
                    {
                        clnt.Open();
                        objCandDetails = clnt.FetchTrainingExcelData(objDc);
                    }
                    catch (FaultException<OBFaultContractFC> ex)
                    {
                        new ErrorLogger(this.sessionDetail.SessionId).LogError(ex);
                    }
                    catch (Exception ex)
                    {
                        new ErrorLogger(this.sessionDetail.SessionId).LogError(ex);
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
                new ErrorLogger(this.sessionDetail.SessionId).LogError(ex);
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

        #region Page Load
        /// <summary>
        /// method for page load
        /// </summary>
        /// <param name="sender">object sender</param>
        /// <param name="e">Event Args e</param>
        protected void Page_Load(object sender, EventArgs e)
        {
            //// Initialize session detail 
            if (this.sessionDetail == null)
            {
                this.sessionDetail = this.objUtil.SessionDetail;
            }

            if (!this.IsPostBack)
            {
                try
                {
                    //// OBUtilityMethodsClient obj = new OBUtilityMethodsClient();
                    ////  SystemKey sysKey = new SystemKey();
                    //// DashBoard objDC = new DashBoard();

                    //// sysKey.KeyId = 6;
                    //// sysKey = obj.GetSystemKey(sysKey);
                    //// DateTime dtStartDate = DateTime.Today.AddDays(Convert.ToInt16(sysKey.KeyValue));
                    //// sysKey.KeyId = 7;
                    //// sysKey = obj.GetSystemKey(sysKey);
                    //// DateTime dtEndDate = DateTime.Today.AddDays(Convert.ToInt16(sysKey.KeyValue));
                    //// sysKey.KeyId = 32;
                    //// sysKey = obj.GetSystemKey(sysKey);
                    //// DateTime dtTrainingStartDate = DateTime.Today.AddDays(Convert.ToInt16(sysKey.KeyValue));
                    //// sysKey.KeyId = 33;
                    //// sysKey = obj.GetSystemKey(sysKey);
                    //// DateTime dtTrainingEndDate = DateTime.Today.AddDays(Convert.ToInt16(sysKey.KeyValue));
                    //// hdnStartDate.Value = dtStartDate.ToShortDateString();
                    this.DOJFromInputBox.Attributes.Add("readonly", "readonly");
                    //// hdnEndDate.Value = dtEndDate.ToShortDateString();
                    this.DOJToInputBox.Attributes.Add("readonly", "readonly");
                    //// hdnTrainingStartDate.Value = dtTrainingStartDate.ToShortDateString();
                    this.training_dateFrom.Attributes.Add("readonly", "readonly");
                    ////  hdnTrainingEndDate.Value = dtTrainingEndDate.ToShortDateString();
                    this.training_dateTo.Attributes.Add("readonly", "readonly");
                    string postJoiningCount = string.Empty;
                    string preJoiningCount = string.Empty;
                    CandidateDetail objCandidateDetail = new CandidateDetail();
                    UserRolesList usr = (UserRolesList)this.objSession.GetSessionValue("RolesList");
                    objCandidateDetail.AssociateId = int.Parse(this.sessionDetail.LoginId);
                    foreach (UserRoles roleData in usr)
                    {
                        if (roleData.RoleGroupId == DC.UtilityDC.RoleGroup.IM)
                        {
                            objCandidateDetail.RoleId = roleData.RoleDetailId;
                        }
                    }

                    using (OneC.OnBoarding.WebApp.Service.DashBoardServices.DashBoardServicesClient objDashBoardClient = new DashBoardServicesClient())
                    {
                        DashBoardDataPagination objDashBoard = objDashBoardClient.DashBoardProcessCountForHRSS(objCandidateDetail);
                        DashboardUtility.CalculatePreAndPostJoiningNumbers(objDashBoard.PreJoiningCount, objDashBoard.PostJoiningCount, ref preJoiningCount, ref postJoiningCount);
                        this.lblPreJoiningStats.Text = preJoiningCount.ToString();
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
        /// method for paging for dashboard
        /// </summary>
        /// <param name="itotalCount">total count</param>
        /// <returns>SB content</returns>
        private string DoPagingForDashboard(int itotalCount) 
        {
            if (itotalCount.Equals(0))
            {
                return string.Empty;
            }

            int pagesCount = itotalCount / this.pageSizeDashBoardcandidates; //// changed iPagesCount & iRemainder to "pagesCount" & "remainder"- 397785
            int remainder = itotalCount % this.pageSizeDashBoardcandidates; 
            StringBuilder sbcontent = new StringBuilder(string.Empty, 800);
            try
            {
                ////Bind First
                int firstPageNoIndex = 1; //// changed iFirstPageNoIndex & iFirstPageStartIndex to  "firstPageNoIndex" & "firstPageStartIndex"  - 397785
                int firstPageStartIndex = 0; 
                ////Bind Last
                int lastPageNoIndex = 1;  //// changed iLastPageNoIndex & iLastPageStartIndex to  "lastPageNoIndex" & "lastPageStartIndex"  - 397785
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
                int prevPageNoIndex = this.dataPageIndexDashBoardcandidates - 1;                                                    //// changed iPrevPageNoIndex & iPrevPageStartIndex to  "prevPageNoIndex" & "prevPageStartIndex"  - 397785
                int prevPageStartIndex = (prevPageNoIndex * this.pageSizeDashBoardcandidates) - this.pageSizeDashBoardcandidates;    
                if (prevPageNoIndex <= firstPageNoIndex)
                {
                    prevPageNoIndex = firstPageNoIndex;
                    prevPageStartIndex = firstPageStartIndex;
                }
                ////Bind Next
                int nextPageNoIndex = this.dataPageIndexDashBoardcandidates + 1;                                                      //// changed iNextPageNoIndex & iNextPageStartIndex to  "nextPageNoIndex" & "nextPageStartIndex"  - 397785                                            
                int nextPageStartIndex = (nextPageNoIndex * this.pageSizeDashBoardcandidates) - this.pageSizeDashBoardcandidates;
                if (nextPageNoIndex >= lastPageNoIndex)
                {
                    nextPageNoIndex = lastPageNoIndex;
                    nextPageStartIndex = lastPageStartIndex;
                }
                ////Bind number of pages to display
                int prevPageCount = this.dataPageIndexDashBoardcandidates - (this.totalPagesDisplayDashBoardcandidates / 2); //// changed iPrevPageCount & iNextPageCount to  "prevPageCount" & "nextPageCount"  - 397785
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
                sbcontent.Append("<div class=\"btn_pagination\" >");
                sbcontent.Append("<div class=\"flt_right\" style=\"margin-top:47px\">");

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
                        sbcontent.Append("<a href=\"javascript:PaginationDashboard1(" + firstPageStartIndex + "," + firstPageNoIndex + ")\">First</a>");
                        sbcontent.Append("<a href=\"javascript:PaginationDashboard1(" + prevPageStartIndex + "," + prevPageNoIndex + ")\"><span class='prev_point' >Previous</span></a>");
                    }

                    for (int i = prevPageCount; i <= nextPageCount; i++)
                    {
                        if (i >= firstPageNoIndex && i <= lastPageNoIndex)
                        {
                            int startIndex = (i * this.pageSizeDashBoardcandidates) - this.pageSizeDashBoardcandidates; ////stylecop-changed iStartIndex to startIndex 397785
                            if (i.Equals(this.dataPageIndexDashBoardcandidates))
                            {
                                sbcontent.Append("<span class='active_point'>" + i.ToString() + "</span>");
                            }
                            else
                            {
                                sbcontent.Append("<a href=\"javascript:PaginationDashboard1(1" + startIndex.ToString() + "," + i.ToString() + ")\">" + i.ToString() + "</a>");
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
                        sbcontent.Append("<a href=\"javascript:PaginationDashboard1(" + nextPageStartIndex + "," + nextPageNoIndex + ")\"><span class='next_point' >Next</span></a>");
                        ////Append Last
                        sbcontent.Append("<a href=\"javascript:PaginationDashboard1(" + lastPageStartIndex + "," + lastPageNoIndex + ")\">Last</a>");
                    }
                }

                sbcontent.Append("<div class=\"clear\"></div>");
                sbcontent.Append("</div><span class=\"totalResult\" style=\"margin-top:50px\" >Total (" + itotalCount + ")</span> </div><div class=\"clear\"></div></div>");
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
        /// <param name="itotalCount"> total count</param>
        /// <returns>SB Content</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode", Justification = "Reviewed")]
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
                sbcontent.Append("<div class=\"flt_right\" style=\"margin-top:47px\">");
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
                            int startIndex = (i * this.ipageSizeTask) - this.ipageSizeTask; ////stylecop- changed iStartIndex to startIndex 397785
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
                sbcontent.Append("</div><span class=\"totalResult\" style=\"margin-top:50px\" >Total (" + itotalCount + ")</span> </div><div class=\"clear\"></div></div>");
            }
            catch (Exception)
            {
                throw;
            }

            return sbcontent.ToString() + "<div class='clear'></div>";
        }    
    }
        #endregion   
}

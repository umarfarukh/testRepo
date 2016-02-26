//// <copyright file="DashBoardBAL.cs" company="CognizantTechnologySolutions">
////Copyright (c) CognizantTechnologySolutions. All rights reserved.
//// </copyright>
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.BAL         
 * Class Name       : DashBoardBAL.cs
 * Version          : 1.0
 * Type             : Business Access Class
 * Purpose          : Methods Related to DAshBoard
 * Created date     : 2011-Jan-16
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
namespace OneC.OnBoarding.BAL.DashBoard
{
    #region namespace
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Text;
    using OneC.OnBoarding.DAL.DashBoard;
    using OneC.OnBoarding.DC.CandidateDC;
    using OneC.OnBoarding.DC.DashBoardDC;
    using OneC.OnBoarding.DC.UtilityDC;
    #endregion

    /// <summary>
    /// DashBoard BAL
    /// </summary>
    public sealed class DashBoardBAL : IDisposable
    {
        #region IDisposable Members
        /// <summary>
        /// Dispose Method
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        #endregion

        #region DashBoard DB Methods

        /// <summary>
        /// Method to get list of dashboard filters
        /// </summary>
        /// <param name="objDashboardFilters">Object of type DashboardFilters</param>
        /// <returns>dash board filters</returns>
        public DashboardFilters GetDashboardFilters(DashboardFilters objDashboardFilters)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetDashboardFilters(objDashboardFilters);
            }
        }

        /// <summary>
        /// 220930: Method to Fetch Training Details
        /// </summary>
        /// <param name="candDetail">To fetch Training Excel data</param>
        /// <returns>list of candidates </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateTrainingList FetchTrainingExcelData(CandidateTrainingDC candDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                CandidateTrainingList retCand = new CandidateTrainingList();
                retCand = objDAL.FetchTrainingExcelData(candDetail);
                return retCand;
            }
        }

        /// <summary>
        /// 208099: Method to Fetch Candidate Details
        /// 253297: Modified
        /// </summary>
        /// <param name="candDetail">Candidate Detail</param>
        /// <param name="totalCount">total records to returned</param>
        /// <returns>returns candidates</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList FetchRCData(CandidateDetail candDetail, TotalCountDC totalCount)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                CandidateDetailList retCand = new CandidateDetailList();
                retCand = objDAL.FetchRCData(candDetail,  totalCount);
                return retCand;
            }
        }

        /// <summary>
        /// 208099: Method to Fetch Candidate Data
        /// 253297: Modified - Null conditions handled 
        /// </summary>
        /// <param name="candDetail"> to send data</param>
        /// <returns>saved data</returns>
        public CandidateTask FetchCandidateData(CandidateDetail candDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
               //// List<TaskDetail> ret = new List<TaskDetail>();
                return objDAL.FetchCandidateData(candDetail);
            }
        }

        /// <summary>
        /// 195514: Method to Fetch NSS Data
        /// </summary>
        /// <param name="candDetail">to save data</param>
        /// <returns>saved data</returns>
        public CandidateTask FetchNSSCandidateData(CandidateDetail candDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
               //// List<TaskDetail> ret = new List<TaskDetail>();
                return objDAL.FetchNSSCandidateData(candDetail);
            }
        }

        /// <summary>
        /// 195514: Method to update Candidate Asset Details
        /// </summary>
        /// <param name="candAssetList">To Update NSS Asset Details</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public void UpdateNSSAssetDetails(CandAssetStatusList candAssetList)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                objDAL.UpdateNSSAssetDetails(candAssetList);
            }
        }

        /// <summary>
        /// 208099: Method to update Candidate Details
        /// 253297: Modified   -  update the below mentioned fields 
        /// </summary>
        /// <param name="candDetail">Candidate detail are provided to do update parameters like EDOJ , Offer status , Email Id </param>
        public void UpdateCandidateDetails(CandidateDetail candDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                objDAL.UpdateCandidateDetails(candDetail);
            }
        }

        /// <summary>
        /// 253297 : Method to unlock Access of candidate 
        /// </summary>
        /// <param name="candDetail">CandidateId is passed and country id is passed </param>
        public void UnlockCandidateAccess(CandidateDetail candDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                objDAL.UnlockCandidateAccess(candDetail);
            }
        }

        /// <summary>
        /// To get location mapped for particular RC  -  RC dashBoard
        /// </summary>
        /// <param name="dashboardData">To get dash Board data</param>
        /// <returns>work location of dashboard data</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public DashBoardDataList GetWorkLocation(DashboardDataDC dashboardData)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetWorkLocation(dashboardData);
            }
        }

        /// <summary>
        /// To get Equipment detail
        /// </summary>
        /// <param name="candidateDetail">candidate detail required for Equipment</param>
        /// <returns>candidate details</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList Equipment(CandidateDetail candidateDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                CandidateDetailList retCand = new CandidateDetailList();
                retCand = objDAL.Equipment(candidateDetail);
                return retCand;
            }
        }

        /// <summary>
        /// To get Laptop and Blackberry count
        /// </summary>
        /// <param name="candDetail">candidate details</param>
        /// <returns>count of candidates</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList LapTopBlackpBerryCount(CandidateDetail candDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                CandidateDetailList retCand = new CandidateDetailList();
                retCand = objDAL.LapTopBlackpBerryCount(candDetail);
                return retCand;
            }
        }

        /// <summary>
        /// To get country for HRSS dash board
        /// </summary>
        /// <param name="dashboardData">Data required for dash board</param>
        /// <returns>mapped country</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public DashBoardDataList GetHRSSMappedCountry(DashboardDataDC dashboardData)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetHRSSMappedCountry(dashboardData);
            }
        }

        /// <summary>
        /// To get location for NSS dashBoard  
        /// Get Work location
        /// Added : 312539
        /// </summary>
        /// <param name="candidateDetail">candidate detail</param>
        /// <returns>data required for NSS dash board</returns>
        public NssDashboardData GetLevel(CandidateDetail candidateDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                //// NssDashboardData retArray = new NssDashboardData();
                NssDashboardData objData = objDAL.GetLevel(candidateDetail);

                return objData;
            }
        }

        /// <summary>
        /// To get location for NSS dashBoard 
        /// Get City
        /// Added : 312539
        /// </summary>
        /// <param name="candidateDetail">candidate detail</param>
        /// <returns>city of candidate</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList GetCity(CandidateDetail candidateDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetCity(candidateDetail);
            }
        }

        /// <summary>
        /// To get location for NSS dashBoard 
        /// Get GetCityWork location
        /// Added : 312539
        /// </summary>
        /// <param name="candidateDetail">candidate detail</param>
        /// <returns>binding work location data</returns>
        public NssDashboardData BindWorklocation(CandidateDetail candidateDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
               //// NssDashboardData retArray = new NssDashboardData();
                NssDashboardData objData = objDAL.BindWorklocation(candidateDetail);

                return objData;
            }
        }

        /// <summary>
        /// To get NSS dashboard details
        /// </summary>
        /// <param name="candDetail">candidate detail</param>
        /// <param name="totalCount">total count</param>
        /// <returns>candidate id</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList FetchNSSData(CandidateDetail candDetail, TotalCountDC totalCount)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                CandidateDetailList retCand = new CandidateDetailList();
                retCand = objDAL.FetchNSSData(candDetail, totalCount);
                return retCand;
            }
        }

        /// <summary>
        /// TO get NSS dash board details
        /// </summary>
        /// <param name="candDetail">candidate detail</param>
        /// <param name="totalCount">Total count</param>
        /// <returns>candidate id</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList FetchNSSDashBoardData(CandidateDetail candDetail, TotalCountDC totalCount)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                CandidateDetailList retCand = new CandidateDetailList();
                retCand = objDAL.FetchNSSDashBoardData(candDetail, totalCount);
                return retCand;
            }
        }

        /// <summary>
        /// 312511: Method to Fetch HRSS Dashboard data
        /// </summary>
        /// <param name="candDetail">candidate detail</param>
        /// <param name="totalCount">total count</param>
        /// <returns>candidate id</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList FetchHRSSData(CandidateDetail candDetail, TotalCountDC totalCount)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                CandidateDetailList retCand = new CandidateDetailList();
                retCand = objDAL.FetchHRSSData(candDetail, totalCount);
                return retCand;
            }
        }

        /// <summary>
        /// 312511: Method to update Candidate Joining Status Details for HRSS
        /// </summary>
        /// <param name="candDetail">Candidate detail</param>
        public void UpdateCandidateJoiningStatusDetails(CandidateDetail candDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                objDAL.UpdateCandidateJoiningStatusDetails(candDetail);
            }
        }

        /// <summary>
        /// To get country for IM dashBoard
        /// </summary>
        /// <param name="candidateDetail">candidate detail</param>
        /// <returns>mapped country</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList GetIMMappedCountry(CandidateDetail candidateDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetIMMappedCountry(candidateDetail);
            }
        }

        /// <summary>
        /// 195514: Method to get timeline for NSS Dashboard
        /// </summary>
        /// <returns>Time line filters</returns>
        public TimelineFilter[] GetTimelineFilters()
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetTimelineFilters();
            }
        }

        /// <summary>
        /// 195514: Method to get status of nSS Dashboard
        /// </summary>
        /// <param name="objTimelineFilter">Time line filters</param>
        /// <returns>status of timeline</returns>
        public AssetRequestStatus[] GetAssetRequestTimelineStatus(TimelineFilter objTimelineFilter)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetAssetRequestTimelineStatus(objTimelineFilter);
            }
        }
        #endregion DashBoard DB Methods

        /// <summary>
        /// To FetchNSS Dashboard data
        /// </summary>
        /// <param name="candDetail">candidate detail</param>
        /// <param name="totalCount">total count</param>
        /// <returns>candidate detail list</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList FetchNSSDataDashboard(CandidateDetail candDetail, TotalCountDC totalCount)
        {
            using (DashBoardDAL objDashBoardDAL = new DashBoardDAL())
            {
                return objDashBoardDAL.FetchNSSDataDashboard(candDetail, totalCount);
            }
        }

        /// <summary>
        /// 224730: To get status for file upload
        /// </summary>
        /// <param name="adminDashBoard">Admin Dash board</param>
        /// <returns>dashboard data</returns>
        public AdminDashBoard GetFileUploadDetails(AdminDashBoard adminDashBoard)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetFileUploadDetails(adminDashBoard);
            }
        }

        /// <summary>
        /// 224730: Method to Fetch admin Dashboard data
        /// </summary>
        /// <param name="candDetail">Candidate detail</param>
        /// <param name="totalCount">total count</param>
        /// <returns>candidate id</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList FetchADMINDataDashboard(CandidateDetail candDetail, TotalCountDC totalCount)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                CandidateDetailList retCand = new CandidateDetailList();
                retCand = objDAL.FetchADMINDataDashboard(candDetail, totalCount);
                return retCand;
            }
        }

        /// <summary>
        /// 224730: To get status for file upload
        /// </summary>
        /// <param name="candDetail">candidate detail</param>
        /// <returns>status of candidate</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList GetStatusList(CandidateDetail candDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetStatusList(candDetail);
            }
        }

        /// <summary>
        /// 220930: To get location for file upload
        /// </summary>
        /// <param name="objadmin">candidate detail</param>
        /// <returns>location list</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CityList GetLocationList(AdminDashBoard objadmin)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetLocationList(objadmin);
            }
        }

        /// <summary>
        /// 224730: Method to Fetch admin Dashboard data
        /// </summary>
        /// <param name="candDetail">Candidate Detail</param>
        /// <returns>candidate list</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList FetchADMINDataDashboardExcel(CandidateDetail candDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                CandidateDetailList retCand = new CandidateDetailList();
                retCand = objDAL.FetchADMINDataDashboardExcel(candDetail);
                return retCand;
            }
        }

        /// <summary>
        /// 312511 : To get Department based on country for TM Dashboard
        /// </summary>
        /// <param name="candidateDetail">candidate detail</param>
        /// <returns>array of candidate</returns>
        public TMDashboardData GetDepartment(CandidateDetail candidateDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                TMDashboardData retArray = new TMDashboardData();
                retArray = objDAL.GetDepartment(candidateDetail);
                return retArray;
            }
        }

        /// <summary>
        /// Used to fetch 
        /// </summary>
        /// <param name="candidateDetail">candidate detail</param>
        /// <returns>process count</returns>
        public DashBoardDataPagination DashBoardProcessCount(CandidateDetail candidateDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.DashBoardProcessCount(candidateDetail);
            }
        }

        /// <summary>
        /// dash board process count 
        /// </summary>
        /// <param name="candidateDetail">candidate detail</param>
        /// <returns>count of candidate</returns>      
        public DashBoardDataPagination DashBoardProcessCountForHRSS(CandidateDetail candidateDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.DashBoardProcessCountForHRSS(candidateDetail);
            }
        }

        /// <summary>
        /// 195514:Used to  fetch the asset Count For NSS
        /// </summary>
        /// <param name="candidateDetail">candidate detail</param>
        /// <returns>asset count</returns>
        public DashBoardDataPagination DashBoardAssetCountForNSS(CandidateDetail candidateDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                try
                {
                    return objDAL.DashBoardAssetCountForNSS(candidateDetail);
                }
                catch
                {
                    throw;
                }
            }
        }

        /// <summary>
        /// 312511: Method to Fetch Data for Excel report generation
        /// </summary>
        /// <param name="candDetail"> Sends the search criteria specified in dashboard. </param>
        /// <param name="totalCount"> returns the total records returned for search criteria</param>
        /// <returns>dash board data for excel</returns>
        public DataSet FetchDashboardDataForExcel(CandidateDetail candDetail, TotalCountDC totalCount)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.FetchDashboardDataForExcel(candDetail, totalCount);
            }
        }

        /// <summary>
        /// 312539: Method to Fetch  Asset Report Excel report generation
        /// </summary>
        /// <param name="candDetail"> Sends the search criteria specified in dashboard. </param>
        /// <param name="totalCount"> returns the total records returned for search criteria</param>
        /// <returns>Dashboard Asser Report</returns>
        public DataSet FetchNSSDashBoardAssetReport(CandidateDetail candDetail, TotalCountDC totalCount)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.FetchNSSDashBoardAssetReport(candDetail, totalCount);
            }
        }

        /// <summary>
        /// 312511: Method to Fetch Data for Excel report generation for NSS Dashboard
        /// </summary>
        /// <param name="candDetail"> Sends the search criteria specified in dashboard. </param>
        /// <param name="totalCount"> returns the total records returned for search criteria</param>
        /// <returns>NSS Dashboard Data</returns>
        public DataSet FetchNSSDashboardDataForExcel(CandidateDetail candDetail, TotalCountDC totalCount)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.FetchNSSDashboardDataForExcel(candDetail, totalCount);
            }
        }

        /// <summary>
        /// 312539: Method to Fetch  Asset Report Excel report generation
        /// </summary>
        /// <param name="candDetail"> Sends the search criteria specified in dashboard. </param>
        /// <param name="totalCount"> returns the total records returned for search criteria</param>
        /// <returns>fore casting dash board excel</returns>
        public DataSet ForcasteDashboardExcelReport(CandidateDetail candDetail, TotalCountDC totalCount)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.ForcasteDashboardExcelReport(candDetail, totalCount);
            }
        }

        /// <summary>
        /// 312539: Method to UploadExcelDetailsData to update  table
        /// </summary>
        /// <param name="candDetail">Candidate Detail</param>
        public void UploadExcelDetailsData(CandidateDetail[] candDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                objDAL.UploadExcelDetailsData(candDetail);
            }
        }

        /// <summary>
        /// 208099: Method to update Candidate Photo Upload Detail
        /// </summary>
        /// <param name="candDetail">candidate Detail</param>
        public void UpdatePhotoStatus(CandidateDetail candDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                objDAL.UpdatePhotoStatus(candDetail);
            }
        }

        /// <summary>
        /// 312511: Method to insert/update data for upload Approval Request from Dashboard
        /// </summary>
        /// <param name="appDetail">app Detail</param>
        public void SaveApprovalRequestData(ApprovalDetails appDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                objDAL.SaveApprovalRequestData(appDetail);
            }
        }

        /// <summary>
        /// 312511: Method to get Data for Asset Approval Request for Dashboard
        /// </summary>
        /// <param name="appDetail">App Detail</param>
        /// <returns>Approval request data</returns>
        public DataSet FetchAssetApprovalRequestData(ApprovalDetails appDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.FetchAssetApprovalRequestData(appDetail);
            }
        }

        /// <summary>
        /// 312511: Method to update AssetApproval Status
        /// </summary>
        /// <param name="candDetail">candidate Detail</param>
        public void UpdateAssetApprovalStatus(CandidateDetail candDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                objDAL.UpdateAssetApprovalStatus(candDetail);
            }
        }

        ///// <summary>
        ///// 298589: Method to ApproveCandidateList
        ///// </summary>

        ////public CandidateApproveListDataSource GetDocumentsforApproval(CandidateDocumentForApproval CandidateId)
        ////{
        ////    using(DashBoardDAL objDAL = new DashBoardDAL()){
        ////    return objDAL.GetDocumentsforApproval(CandidateId);
        ////}

        /// <summary>
        /// 312539 To get CROP Induction Tracker joining location
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>
        /// <returns>candidate Induction location</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList GetInductionLocation(CandidateDetail candidateDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetInductionLocation(candidateDetail);
            }
        }

        /// <summary>
        /// 312539 To get CROP InductionCandidateStatus
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>
        /// <returns>candidate status</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList GetInductionCandidateStatus(CandidateDetail candidateDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetInductionCandidateStatus(candidateDetail);
            }
        }

        /// CanidateJoiningType
        /// <summary>
        /// 312539 To get CROP Get Candidate Joining Types
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>
        /// <returns>candidate Joining Types</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList GetCanidateJoiningTypes(CandidateDetail candidateDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetCanidateJoiningTypes(candidateDetail);
            }
        }

        /// <summary>
        /// 312539 To get CROP InductionCountryName
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>
        /// <returns>country name</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList GetInductionCountryName(CandidateDetail candidateDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetInductionCountryName(candidateDetail);
            }
        }

        /// <summary>
        /// 312539 To get CROP Induction Tracker joining location
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>
        /// <returns>joining location</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList GetJoiningLocation(CandidateDetail candidateDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetJoiningLocation(candidateDetail);
            }
        }

        /// <summary>
        /// 312539 To get Candidate Hire Status
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>
        /// <returns>Candidate hire status</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList GetChireStatus(CandidateDetail candidateDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetChireStatus(candidateDetail);
            }
        }

        /// <summary>
        /// 312539 : Method to Fetch candidates induction tracker  for showing in dashboard
        /// </summary>
        /// <param name="dashboardDetail"> Sends the search criteria specified in dashboard. </param>
        /// <param name="totalCount"> returns the total records returned for search criteria</param>
        /// <returns>Candidate Induction Tracker Dashboard data</returns>
        public string FetchCandidateInductionTrackerDashboard(DashboardDataDC dashboardDetail, TotalCountDC totalCount)
        {
            using (DashBoardDAL objDashBoardDAL = new DashBoardDAL())
            {
                return objDashBoardDAL.FetchCandidateInductionTrackerDashboard(dashboardDetail, totalCount);
            }
        }

        /// <summary>
        /// 312539 : Method to Fetch candidates details based on location
        /// </summary>
        /// <param name="dashboardDetail"> Sends the search criteria specified in dashboard. </param>
        /// <param name="totalCount"> returns the total records returned for search criteria</param>
        /// <returns>Candidate Details Induction Location</returns>
        public string FetchCandidateDetailsInductionLocation(DashboardDataDC dashboardDetail, TotalCountDC totalCount)
        {
            using (DashBoardDAL objDashBoardDAL = new DashBoardDAL())
            {
                return objDashBoardDAL.FetchCandidateDetailsInductionLocation(dashboardDetail, totalCount);
            }
        }

        /// <summary>
        /// 312539: Method to download Induction Attendance Tracker
        /// </summary>
        /// <param name="dashboardDetail"> Sends the search criteria specified in dashboard. </param>
        /// <param name="totalCount"> returns the total records returned for search criteria</param>
        /// <returns>Attendance Excel</returns>
        public DataSet DownloadAttendanceExcel(DashboardDataDC dashboardDetail, TotalCountDC totalCount)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.DownloadAttendanceExcel(dashboardDetail, totalCount);
            }
        }

        /// <summary>
        /// 312539: Update Candidate Attendance Tracker
        /// </summary>
        /// <param name="dashboardDetail">dashboard Detail</param>
        public void UpdateCandidateAttendanceTracker(DashboardDataDC dashboardDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                objDAL.UpdateCandidateAttendanceTracker(dashboardDetail);
            }
        }

        /// <summary>
        /// 312539 : DOJ Confirmation
        /// </summary>
        /// <param name="candDetail">Candidate detail are provided to do update parameters like EDOJ , Offer status , Email Id </param>
        public void UpdateCandidateDOJConfirm(CandidateDetail candDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                objDAL.UpdateCandidateDOJConfirm(candDetail);
            }
        }

        /// <summary>
        /// 312511 : Method to fetch the associate contact details
        /// </summary>
        /// <param name="dashboardDetail">dashboard detail</param>
        /// <returns>information of Person</returns>
        public CandidateDetail FetchPOCInfo(DashboardDataDC dashboardDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.FetchPOCInfo(dashboardDetail);
            }
        }

        /// <summary>
        /// 305054: Method to Fetch Candidate Hire Type
        /// </summary>
        /// <param name="parentId">parent id</param>
        /// <returns>candidate hire type</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public DashBoardDataList FetchCandidateHireType(DashboardDataDC parentId)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.FetchCandidateHireType(parentId);
            }
        }
        #region BGVDashboard
        /// <summary>
        /// 312511 : Method to Fetch candidates for showing in dashboard
        /// </summary>
        /// <param name="dashboardDetail"> Sends the search criteria specified in dashboard. </param>
        /// <param name="totalCount"> returns the total records returned for search criteria</param>
        /// <returns>candidates searched</returns>
        public string FetchCandidatesForDashboard(DashboardDataDC dashboardDetail, TotalCountDC totalCount)
        {
            using (DashBoardDAL objDashBoardDAL = new DashBoardDAL())
            {
                return objDashBoardDAL.FetchCandidatesForDashboard(dashboardDetail, totalCount);
            }
        }

        /// <summary>
        /// 312511: Method to Fetch candidates for Excel report generation
        /// </summary>
        /// <param name="dashboardDetail">search criteria required for dash board</param>
        /// <param name="totalCount">total count</param>
        /// <returns>searched data</returns>
        public DataSet FetchCandidatesForDashboardExcel(DashboardDataDC dashboardDetail, TotalCountDC totalCount)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.FetchCandidatesForDashboardExcel(dashboardDetail, totalCount);
            }
        }

        /// <summary>
        /// 312511: Method to get filter data for candidate search
        /// </summary>
        /// <param name="autoCompleteDC">Auto complete data</param>
        /// <returns>data searched</returns>
        public DataSet FetchCandidatesFilterSearchdata(AutoCompleteDC autoCompleteDC)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.FetchCandidatesFilterSearchdata(autoCompleteDC);
            }
        }

        /// <summary>
        /// 312539: get personal details
        /// </summary>
        /// <param name="dashboardDetail">Dash board detail</param>
        /// <returns>candidate personal data</returns>
        public string FetchCandidatePersonalData(DashboardDataDC dashboardDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.FetchCandidatePersonalData(dashboardDetail);
            }
        }

        /// <summary>
        /// 312511 : Method to fetch the prefill values of a candidate in dashboard
        /// </summary>
        /// <param name="dashboardDetail">Dash board details</param>
        /// <returns>candidates prefill values</returns>
        public string FetchCandidatesPrefillvalues(DashboardDataDC dashboardDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.FetchCandidatesPrefillvalues(dashboardDetail);
            }
        }

        /// <summary>
        /// 312511 : Method to Fetch candidates for showing in vendor dashboard
        /// </summary>
        /// <param name="dashboardDetail">dashboard detail</param>
        /// <param name="totalCount">total count</param>
        /// <returns>candidates for vendor dash board</returns>
        public string FetchCandidatesForVendorDashboard(DashboardDataDC dashboardDetail, TotalCountDC totalCount)
        {
            using (DashBoardDAL objDashBoardDAL = new DashBoardDAL())
            {
                return objDashBoardDAL.FetchCandidatesForVendorDashboard(dashboardDetail, totalCount);
            }
        }

        /// <summary>
        /// 312511: Method to Fetch candidates for Excel report generation for Vendor dashboard
        /// </summary>
        /// <param name="dashboardDetail">dashboard detail</param>
        /// <param name="totalCount">total count</param>
        /// <returns>data for excel</returns>
        public DataSet FetchCandidatesForVendorDashboardExcel(DashboardDataDC dashboardDetail, TotalCountDC totalCount)
        {
            using (DashBoardDAL objDashBoardDAL = new DashBoardDAL())
            {
                return objDashBoardDAL.FetchCandidatesForVendorDashboardExcel(dashboardDetail, totalCount);
            }
        }
        #endregion
        #region BGV Business Methods

        /// <summary>
        /// 208099 : Method to get all the saved and prefilled values
        /// </summary>
        /// <param name="prefillvalues">prefill values</param>
        /// <returns>data return</returns>
        public BgvCandidateData GetCisData(BgvCandidateData prefillvalues)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetCisData(prefillvalues);
            }
        }

        /// <summary>
        /// 313248 : Method to Get Component list
        /// </summary>
        /// <param name="objCandidateDetail">Type group id</param>
        /// <returns>component list</returns>
        public BgvCandidateData GetComponentList(BgvCandidateData objCandidateDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetComponentList(objCandidateDetail);
            }
        }

        /// <summary>
        /// 260947 : Method to get component detail id based on Component code, Candidate's BU and CountryId
        /// </summary>
        /// <param name="componentData">component data</param>
        /// <returns>component detail id</returns>
        public BgvComponent GetComponentDetailId(BgvComponent componentData)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetComponentDetailId(componentData);
            }
        }

        /// <summary>
        ///  260947 : Method to Get Component HTML
        /// </summary>
        /// <param name="componentData">Component data</param>
        /// <returns>component configuration</returns>
        public BgvComponent GetComponentConfig(BgvComponent componentData)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetComponentConfig(componentData);
            }
        }

        /// <summary>
        /// 260947 : Method to get suspect status of an institution
        /// </summary>
        /// <param name="componentData">Type of component</param>
        /// <returns>Status of the component</returns>
        public InstitutionDC GetSuspectStatus(BgvComponent componentData)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetSuspectStatus(componentData);
            }
        }

        /// <summary>
        /// 260947 : Method to Get Component details available for a candidate
        /// </summary>
        /// <param name="candidateData">candidate data</param>
        /// <returns>component data</returns>
        public BgvCandidateData GetCandidateComponentData(BgvCandidateData candidateData)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetCandidateComponentData(candidateData);
            }
        }

        /// <summary>
        /// 249510 : Method to Get Document Data
        /// </summary>
        /// <param name="documentDetail">Document detail</param>
        /// <returns>Document data</returns>
        public BgvComponent GetDocumetDataXml(BgvComponent documentDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetDocumetDataXml(documentDetail);
            }
        }

        /// <summary>
        /// 249510 : Method to fetch  URL
        /// </summary>
        /// <param name="roleURL">Role data</param>
        /// <returns>role URL</returns>
        public BgvCandidateData GetURLforRole(BgvCandidateData roleURL)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetURLforRole(roleURL);
            }
        }

        /// <summary>
        /// Method to get list of notification messages which needs to be displayed in BGV pages
        /// </summary>
        /// <param name="objBgvPageNotificationData">Notification Data</param>
        /// <returns>page notification</returns>
        public BgvPageNotificationData GetPageNotification(BgvPageNotificationData objBgvPageNotificationData)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetPageNotification(objBgvPageNotificationData);
            }
        }

        /// <summary>
        /// 249510 : Method to get Relevant experience information
        /// </summary>
        /// <param name="expInfo">Experience information</param>
        /// <returns>Relevant Experience information</returns>
        public BgvCandidateData GetRelevantExpInfo(BgvCandidateData expInfo)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetRelevantExpInfo(expInfo);
            }
        }

        /// <summary>
        /// 298589 : Method to Approve or reject uploaded documents
        /// </summary>
        /// <param name="documentStatus">Document status</param>
        /// <returns>Approval status</returns> 
        public DocumentApprovalStatusDC DocumentApprovalStatus(DocumentApprovalStatusDC documentStatus)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.DocumentApprovalStatus(documentStatus);
            }
        }

        /// <summary>
        /// 313248 : Method to Get Document List 
        /// </summary>
        /// <param name="candidateData">candidate data</param>
        /// <returns>Document list</returns>
        public BGVDocumentUploadDetail GetDocumentList(BgvCandidateData candidateData)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetDocumentList(candidateData);
            }
        }

        /// <summary>
        /// 298589 : Method to get back papers
        /// </summary>
        /// <param name="docList">Document list</param>
        /// <returns>Back paper list</returns>
        public BGVDocumentUploadDetail GetBackPapers(BgvCandidateData docList)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetBackPapers(docList);
            }
        }

        /// <summary>
        /// 249510: Method to get filter data for Employment Name search
        /// </summary>
        /// <param name="employmentNameDetail">Auto search</param>
        /// <returns>Values searched</returns>
        public BgvCandidateData EmploymentNameAutoSearch(BgvCandidateData employmentNameDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.EmploymentNameAutoSearch(employmentNameDetail);
            }
        }

        /// <summary>
        /// Save Vendor Document List
        /// </summary>
        /// <param name="listData">vendor list</param>
        /// <returns>saved vendor list</returns>
        public BgvCandidateData SaveVendorDocList(BgvCandidateData listData)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.SaveVendorDocList(listData);
            }
        }

        /// <summary>
        /// 298589 : Method to update is suspect raised in back papers
        /// </summary>
        /// <param name="listData">candidate list</param>
        /// <returns>suspect status</returns>
        public int UpdateSuspectStatus(BgvCandidateData listData)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.UpdateSuspectStatus(listData);
            }
        }

        /// <summary>
        /// 298589 : Method to Save Back papers
        /// </summary>
        /// <param name="documentStatus">document status</param>
        /// <returns>status of back papers</returns>
        public DocumentApprovalStatusDC SaveBackPapers(DocumentApprovalStatusDC documentStatus)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.SaveBackPapers(documentStatus);
            }
        }
        #endregion

        #region BGV config screens Business Methods

        /// <summary>
        /// 312267 : method to get values from database
        /// </summary>
        /// <param name="countryName">country id</param>
        /// <returns>country name</returns>
        public DataSet DropDownCountry(BgvComponentMapping countryName)
        {
            using (DashBoardDAL objDropDownCounry = new DashBoardDAL())
            {
                return objDropDownCounry.DropDownCountry(countryName);
            }
        }

        /// <summary>
        /// 312267 : Method to set component mapping
        /// </summary>
        /// <param name="objBgvMap">mapping data</param>
        /// <returns>component mapping data</returns>
        public DataSet BgvMapping(BgvComponentMapping objBgvMap)
        {
            using (DashBoardDAL objSaveDAL = new DashBoardDAL())
            {
                return objSaveDAL.BgvMapping(objBgvMap);
            }
        }

        /// <summary>
        /// 312267 : method to add Document
        /// </summary>
        /// <param name="objBgvDocAdding">document adding</param>
        /// <returns>document added data</returns>
        public DataSet BgvDocumentAdding(BgvComponentMapping objBgvDocAdding)
        {
            using (DashBoardDAL objAddDoc = new DashBoardDAL())
            {
                return objAddDoc.BgvDocumentAdding(objBgvDocAdding);
            }
        }

        /// <summary>
        /// 312223 : method to fill values In  Institution Details
        /// </summary>
        /// <param name="objBgvIns">prefill institutions</param>
        /// <returns>prefill values</returns>
        public DataSet BgvInstituionPrefill(InstitutionDC objBgvIns)
        {
            using (DashBoardDAL objInstitutionPrefillDAL = new DashBoardDAL())
            {
                return objInstitutionPrefillDAL.BgvInstituionPrefill(objBgvIns);
            }
        }

        /// <summary>
        /// 312223 : method to Insert Update delete values In Institution Master table
        /// </summary>
        /// <param name="objBgvIns">save institution</param>
        /// <returns>status save</returns>
        public DataSet BgvSaveInstituion(InstitutionDC objBgvIns)
        {
            using (DashBoardDAL objSaveDAL = new DashBoardDAL())
            {
                return objSaveDAL.BgvSaveInstituion(objBgvIns);
            }
        }

        /// <summary>
        /// 312223 : validate values In  Institution details
        /// </summary>
        /// <param name="objBgvIns">institution names</param>
        /// <returns>validation value</returns>
        public DataSet BgvValidateInstituion(InstitutionDC objBgvIns)
        {
            using (DashBoardDAL objval = new DashBoardDAL())
            {
                return objval.BgvValidateInstituion(objBgvIns);
            }
        }
        #endregion

        /// <summary>
        /// 312539: ER process confirm RC
        /// </summary>
        /// <param name="dashboardDetail">dashboard detail</param>
        public void SaveConfirmationERprocess(DashboardDataDC dashboardDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                objDAL.SaveConfirmationERprocess(dashboardDetail);
            }
        }

        /// <summary>
        /// 312539: ER process candidate status list
        /// </summary>
        /// <param name="dashboardDetail">Dashboard detail</param>
        /// <param name="totalCount">total count</param>
        /// <returns>candidate view</returns>
        public string GetERprocessCandidateView(DashboardDataDC dashboardDetail, TotalCountDC totalCount)
        {
            using (DashBoardDAL objDashBoardDAL = new DashBoardDAL())
            {
                return objDashBoardDAL.GetERprocessCandidateView(dashboardDetail, totalCount);
            }
        }

        /// <summary>
        /// 312539: Method to Upload Excel Mark Induction Attendance 
        /// </summary>
        /// <param name="candDetail">Candidate Detail</param>
        /// <returns>upload details</returns>
        public DataSet AttendanceUploadExcelDetailsData(CandidateDetail candDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.AttendanceUploadExcelDetailsData(candDetail);
            }
        }

        /// <summary>
        /// Candidate id Bulk Upload
        /// </summary>
        /// <param name="candDetail">candidate detail</param>
        /// <returns>candidate id bulk upload</returns>
        public string CandidateidBulkUpload(CandidateDetail candDetail)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.CandidateidBulkUpload(candDetail);
            }
        }

        #region HTransfer Methods

        /// <summary>
        /// 261671 : Method to Get Document List 
        /// </summary>
        /// <param name="candidateData">candidate data</param>
        /// <returns>document upload list</returns>
        public HTransferDocumentUploadDetail GetUploadDocumentList(HTransferCandidateData candidateData)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetUploadDocumentList(candidateData);
            }
        }

        /// <summary>
        ///  261671 : Method to Get and insert group Document List 
        /// </summary>
        /// <param name="candidateData">candidate data</param>
        /// <returns>group document list</returns>
        public HTransferDocumentUploadDetail GetGroupDocumentList(HTransferDocumentDC candidateData)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.GetGroupDocumentList(candidateData);
            }
        }

        /// <summary>
        /// 261671 : Method to Insert or delete HTransfer Document into table after clicking Add / Remove buttons.
        /// </summary>
        /// <param name="candidateData">candidate data</param>
        /// <returns>deleted document</returns>
        public HTransferCandidateDocInfo InsertDeleteDocument(HTransferDocumentDC candidateData)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.InsertDeleteDocument(candidateData);
            }
        }

        /// <summary>
        /// 261671: Method to get save  uploaded return values
        /// </summary>
        /// <param name="candidateData">candidate data</param>
        /// <returns>document name</returns>
        public HTransferCandidateDocInfo SaveHTransferUploadedDocName(HTransferDocumentDC candidateData)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.SaveHTransferUploadedDocName(candidateData);
            }
        }

        /// <summary>
        /// 261671 : Method to Submit HTransfer Section
        /// </summary>
        /// <param name="candidateData">candidate data</param>
        /// <returns>document status</returns>
        public HTransferDocumentUploadDetail SubmitHTransferDocuments(HTransferCandidateData candidateData)
        {
            using (DashBoardDAL objDAL = new DashBoardDAL())
            {
                return objDAL.SubmitHTransferDocuments(candidateData);
            }
        }

        #endregion
    }
}

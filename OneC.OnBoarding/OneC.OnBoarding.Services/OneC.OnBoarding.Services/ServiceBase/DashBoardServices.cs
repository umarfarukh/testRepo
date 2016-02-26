//-----------------------------------------------------------------------=
// <copyright file="DashBoardServices.cs" company="Cognizant Technology Solutions">
// Copyright  . All Rights Reserved.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 ******************************************************* 
 * Namespace        : OneC.OnBoarding.Services.ServiceBase
 * Class Name       : DashboardServices
 * Version          : 1.0
 * Type             : Class
 * Purpose          : Method references of BAL service methods
 * Created date     : 2012-Jan-17
 * Author           : 260947
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

namespace OneC.OnBoarding.Services.ServiceBase
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.ServiceModel;
    using System.Text;
    using OneC.OnBoarding.BAL.DashBoard;
    using OneC.OnBoarding.BAL.Utility;
    using OneC.OnBoarding.DC.CandidateDC;
    using OneC.OnBoarding.DC.DashBoardDC;
    using OneC.OnBoarding.DC.UtilityDC;
    using OneC.OnBoarding.Services.ServiceContract;
    #endregion Namespaces

    /// <summary>
    /// 260947: Class which holds all the dashboard related service method mapping to BAL
    /// </summary>
    public sealed class DashBoardServices : IDashBoardServices, IDisposable
    {
        /// <summary>
        /// 260947: Method to Dispose 
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// Method to get list of dashboard filters
        /// </summary>
        /// <param name="objDashboardFilters">Dashboard Filters</param>
        /// <returns>Dashboard Filters from BAL</returns>
        public DashboardFilters GetDashboardFilters(DashboardFilters objDashboardFilters)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetDashboardFilters(objDashboardFilters);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 220930: Method to Fetch Training Details
        /// 369041: Modified
        /// </summary>
        /// <param name="candDetail">Candidate Detail</param>
        /// <returns>Candidate Details</returns>
        public CandidateTrainingDetails FetchTrainingExcelData(CandidateTrainingDC candDetail)
        {
            CandidateTrainingDetails retCand = new CandidateTrainingDetails();
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    retCand.CandidateDetailList = objBAL.FetchTrainingExcelData(candDetail);
                    return retCand;
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        ///  208099: Method to Fetch RC Data of the Candidate 
        /// 253297: Modified
        /// 369041: Modified
        /// </summary>
        /// <param name="candidateDetail">Sends the search criteria specified in dashboard.</param>
        /// <param name="totalCount"> returns the total records returned for search criteria</param>
        /// <returns>Candidate Details list Count</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList FetchRCData(CandidateDetail candidateDetail,  TotalCountDC totalCount)
        {
            CandidateDetailList retCand = new CandidateDetailList();

            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    retCand = objBAL.FetchRCData(candidateDetail, totalCount);
                    return retCand;
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 208099: Method to Fetch Candidate Data
        /// 253297: Modified - Null conditions handled 
        /// </summary>
        /// <param name="candDetail">Fetches the Candidate Detail</param>
        /// <returns>Candidate Detail</returns>
        public CandidateTask FetchCandidateData(CandidateDetail candDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.FetchCandidateData(candDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 195514: Method to Fetch NSS Candidate Data
        /// </summary>
        /// <param name="candDetail">Candidate Detail</param>
        /// <returns>NSS Candidate Detail</returns>
        public CandidateTask FetchNSSCandidateData(CandidateDetail candDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.FetchNSSCandidateData(candDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 208099: Method to update Candidate Details
        /// 253297: Modified   -  update the below mentioned fields 
        /// </summary>
        /// <param name="candDetail">Candidate detail are provided to do update parameters like EDOJ , Offer status , Email Id </param>
        public void UpdateCandidateDetails(CandidateDetail candDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    objBAL.UpdateCandidateDetails(candDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 369041: To get the DashBoard Process Count
        /// </summary>
        /// <param name="candidateDetail">Sends the search criteria specified in dashboard</param>
        /// <returns>Candidate Detail</returns>
        public DashBoardDataPagination DashBoardProcessCount(CandidateDetail candidateDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.DashBoardProcessCount(candidateDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// To get location mapped for particular RC  -  RC dashBoard
        /// </summary>
        /// <param name="dashboardData">Sends Dashboard Data to get work location</param>
        /// <returns>Dashboard Data</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public DashBoardDataList GetWorkLocation(DashboardDataDC dashboardData)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetWorkLocation(dashboardData);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 253297 : Method to unlock Access of candidate 
        /// 369041:Modified
        /// </summary>
        /// <param name="candDetail">CandidateId is passed and country ID is passed</param>
        public void UnlockCandidateAccess(CandidateDetail candDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    objBAL.UnlockCandidateAccess(candDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// To get Level for NSS DashBoard
        ///  Added :312539 Modified:369041
        /// </summary>
        /// <param name="candidateDetail">Sends Candidate Detail to get the Level</param>
        /// <returns>Level of the Candidate</returns>
        public NssDashboardData GetLevel(CandidateDetail candidateDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetLevel(candidateDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// To get City from Dashboard BAL 
        ///  Added :312539
        /// </summary>
        /// <param name="candidateDetail">Candidate Detail is provided to get the City</param>
        /// <returns>City of the Candidate</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList GetCity(CandidateDetail candidateDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetCity(candidateDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        // public CandidateDetailList BindWorklocation(CandidateDetail candidateDetail)
        // {
        //    try
        //    {
        //        DashBoardBAL objBAL = new DashBoardBAL();
        //        return objBAL.BindWorklocation(candidateDetail);
        //    }
        //    catch
        //    {
        //        throw;
        //    }
        // }

        /// <summary>
        /// To get location for NSS DashBoard
        ///  Get City Work location
        ///  Added :312539 Modified:369041
        /// </summary>
        /// <param name="candidateDetail">Candidate Detail is provided to bind work location</param>
        /// <returns>Bind Work location of the Candidate</returns>
        public NssDashboardData BindWorklocation(CandidateDetail candidateDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.BindWorklocation(candidateDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        ///  Get NSS Dashboard Detail
        ///  Added: 312539, 369041
        /// </summary>
        /// <param name="candidateDetail">candidateDetail is provided to fetch NSS Data</param>
        /// <param name="totalCount">Total count of the Candidate</param>
        /// <returns>Candidate Detail and Total count </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList FetchNSSData(CandidateDetail candidateDetail, TotalCountDC totalCount)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.FetchNSSData(candidateDetail, totalCount);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        ///  Get NSS Dashboard Detail
        ///  Added: 195514,369041
        /// </summary>
        /// <param name="candidateDetail">candidateDetail is provided to fetch NSS Data</param>
        /// <param name="totalCount">Total count of the Candidate</param>
        /// <returns>Candidate Detail and Total count </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList FetchNSSDashBoardData(CandidateDetail candidateDetail, TotalCountDC totalCount)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.FetchNSSDashBoardData(candidateDetail, totalCount);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 369041: Equipment
        /// </summary>
        /// <param name="candidateDetail">candidateDetail is provided to get the Equipment details</param>
        /// <returns>Equipment details of the Candidate</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList Equipment(CandidateDetail candidateDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.Equipment(candidateDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 369041: To get the LapTop Black Berry Count
        /// </summary>
        /// <param name="candidateDetail">candidateDetail is provided to get the Laptop details</param>
        /// <returns>candidate LapTop Black Berry Details</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList LapTopBlackpBerryCount(CandidateDetail candidateDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.LapTopBlackpBerryCount(candidateDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// To get country for HRSS dashBoard
        /// </summary>
        /// <param name="dashboardData">dashboard Data sends the details of the HRSS Mapped Country</param>
        /// <returns>dashboard Data of HRSS Mapped Country</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public DashBoardDataList GetHRSSMappedCountry(DashboardDataDC dashboardData)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetHRSSMappedCountry(dashboardData);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312511: Method to Fetch HRSS Dashboard Data
        /// </summary>
        /// <param name="candidateDetail">Sends the search criteria specified in dashboard.</param>
        /// <param name="totalCount"> returns the total records returned for search criteria</param>
        /// <returns>HRSS Candidate Details</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList FetchHRSSData(CandidateDetail candidateDetail, TotalCountDC totalCount)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.FetchHRSSData(candidateDetail, totalCount);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312511:Method to update Candidate Joining Status Details for HRSS
        /// </summary>
        /// <param name="candDetail">Candidate detail</param>
        public void UpdateCandidateJoiningStatusDetails(CandidateDetail candDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    objBAL.UpdateCandidateJoiningStatusDetails(candDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312511: Used to  fetch DashBoard Process Count For HRSS
        /// </summary>
        /// <param name="candidateDetail">Sends the Process Count for HRSS Dashboard</param>
        /// <returns>Process Count For HRSS of the Candidate</returns>
        public DashBoardDataPagination DashBoardProcessCountForHRSS(CandidateDetail candidateDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.DashBoardProcessCountForHRSS(candidateDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 195514:Used to  fetch the asset Count For NSS
        /// </summary>
        /// <param name="candidateDetail">Sends the Asset Count For NSS</param>
        /// <returns>Asset Count For NSS</returns>
        public DashBoardDataPagination DashBoardAssetCountForNSS(CandidateDetail candidateDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.DashBoardAssetCountForNSS(candidateDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 369041: Method to Fetch NSS Dashboard Data
        /// </summary>
        /// <param name="candDetail">Sends the search criteria specified in dashboard.</param>
        /// <param name="totalCount">returns the total records returned for search criteria</param>
        /// <returns>NSS Candidate Details</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList FetchNSSDataDashboard(CandidateDetail candDetail, TotalCountDC totalCount)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.FetchNSSDataDashboard(candDetail, totalCount);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 369041: To get country for IM dashBoard
        /// </summary>
        /// <param name="candidateDetail">To get the country of the Candidate for IM Dashboard</param>
        /// <returns>Country Mapped</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList GetIMMappedCountry(CandidateDetail candidateDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetIMMappedCountry(candidateDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 195514:To get timeline for NSS Dashboard
        /// </summary>
        /// <returns>Timeline Filters</returns>
        public TimelineFilter[] GetTimelineFilters()
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetTimelineFilters();
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 195514:To get timeline for NSS Dashboard
        /// 369041: Modified
        /// </summary>
        /// <param name="objTimelineFilter">To get the Asset request Timeline Status</param>
        /// <returns>Asset Request Status</returns>
        public AssetRequestStatus[] GetAssetRequestTimelineStatus(TimelineFilter objTimelineFilter)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetAssetRequestTimelineStatus(objTimelineFilter);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 195514:To get timeline for NSS Dashboard
        /// 369041: Modified : Method to Update the NSS Asset Details of the candidate
        /// </summary>
        /// <param name="candAssetList">This parameter helps in getting the Updated NSS Asset Details of the candidate</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public void UpdateNSSAssetDetails(CandAssetStatusList candAssetList)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    objBAL.UpdateNSSAssetDetails(candAssetList);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312511 : To get Department based on country for TM Dashboard
        /// </summary>
        /// <param name="candidateDetail">It helps in finding the Department of the Candidate</param>
        /// <returns>Department which Candidate belongs to</returns>
        public TMDashboardData GetDepartment(CandidateDetail candidateDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetDepartment(candidateDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        #region Admin DashBoard
        /// <summary>
        /// 224730:To get status list 
        /// 369041: Modified
        /// </summary>
        /// <param name="candDetail">This parameter helps in getting the status list of the Candidate</param>
        /// <returns>Status List</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList GetStatusList(CandidateDetail candDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetStatusList(candDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 224730:To get File Upload status and Id if it exists
        /// 369041: Modified
        /// </summary>
        /// <param name="adminDashBoard">It helps in finding the File upload details from ADMIN Dashboard</param>
        /// <returns>File Upload details</returns>
        public AdminDashBoard GetFileUploadDetails(AdminDashBoard adminDashBoard)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetFileUploadDetails(adminDashBoard);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 224730:To get admin dashboard data
        /// </summary>
        /// <param name="candDetail">To fetch the details of the Candidate </param>
        /// <param name="totalCount">Total Count of the Details</param>
        /// <returns>Admin Dashboard Data</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList FetchADMINDataDashboard(CandidateDetail candDetail, TotalCountDC totalCount)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.FetchADMINDataDashboard(candDetail, totalCount);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 224730:To get admin dashboard data for excel
        /// 369041: Modified
        /// </summary>
        /// <param name="candDetail">To fetch the ADMIN Dashboard details of the Candidates into the Excel</param>
        /// <returns>Candidate Details present in ADMIN Dashboard</returns>
        public CandidateDetails FetchADMINDataDashboardExcel(CandidateDetail candDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    CandidateDetails objCandDetails = new CandidateDetails();
                    objCandDetails.CandidateDetailList = objBAL.FetchADMINDataDashboardExcel(candDetail);
                    return objCandDetails;
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 369041: To get the Location list of the Candidates
        /// </summary>
        /// <param name="objadmin">To fetch the ADMIN Dashboard details of the Candidates into the Excel</param>
        /// <returns>Candidate Details present in ADMIN Dashboard</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CityList GetLocationList(AdminDashBoard objadmin)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetLocationList(objadmin);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }
        #endregion

        /// <summary>
        /// 312511: Method to Fetch Data for Excel report generation
        /// 369041: Modified
        /// </summary>
        /// <param name="candDetail"> Sends the search criteria specified in dashboard. </param>
        /// <param name="totalCount"> returns the total records returned for search criteria</param>
        /// <returns>Dashboard Data For Excel</returns>
        public DataSet FetchDashboardDataForExcel(CandidateDetail candDetail, TotalCountDC totalCount)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.FetchDashboardDataForExcel(candDetail, totalCount);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312539: Method to Fetch Data for Excel report generation
        /// </summary>
        /// <param name="candDetail"> Sends the search criteria specified in dashboard. </param>
        /// <param name="totalCount"> returns the total records returned for search criteria</param>
        /// <returns>NSS Dashboard Asset Report</returns>
        public DataSet FetchNSSDashBoardAssetReport(CandidateDetail candDetail, TotalCountDC totalCount)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.FetchNSSDashBoardAssetReport(candDetail, totalCount);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312511: Method to Fetch Data for Excel report generation for NSS Dashboard
        /// </summary>
        /// <param name="candDetail"> Sends the search criteria specified in dashboard. </param>
        /// <param name="totalCount"> returns the total records returned for search criteria</param>
        /// <returns>NSS Dashboard Data For Excel</returns>
        public DataSet FetchNSSDashboardDataForExcel(CandidateDetail candDetail, TotalCountDC totalCount)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.FetchNSSDashboardDataForExcel(candDetail, totalCount);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312539: Method to Fetch Data for Excel report generation for NSS  Forecast Dashboard Excel Report
        /// </summary>
        /// <param name="candDetail"> Sends the search criteria specified in dashboard. </param>
        /// <param name="totalCount"> returns the total records returned for search criteria</param>
        /// <returns>Forecast Dashboard Excel Report</returns>
        public DataSet ForcasteDashboardExcelReport(CandidateDetail candDetail, TotalCountDC totalCount)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.ForcasteDashboardExcelReport(candDetail, totalCount);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312539 : Method to update uploaded excel details of the Candidate
        /// 369041: Modified
        /// </summary>
        /// <param name="candDetail">To Upload Excel Details of the Candidate</param>
        public void UploadExcelDetailsData(CandidateDetail[] candDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    objBAL.UploadExcelDetailsData(candDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 208099: Method to update Candidate Photo Upload Details
        /// </summary>
        /// <param name="candDetail">To get the Candidate Detail</param>
        public void UpdatePhotoStatus(CandidateDetail candDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    objBAL.UpdatePhotoStatus(candDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312511: Method to insert/update data for upload Approval Request from Dashboard
        /// 369041: Modified
        /// </summary>
        /// <param name="appDetail">To get the Approval details of the Requests</param>
        public void SaveApprovalRequestData(ApprovalDetails appDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    objBAL.SaveApprovalRequestData(appDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312511: Method to get Data for Asset Approval Request for Dashboard
        /// 369041: Modified
        /// </summary>
        /// <param name="appDetail">to fetch the approval details of an asset raised request</param>
        /// <returns>Asset approval request data</returns>
        public DataSet FetchAssetApprovalRequestData(ApprovalDetails appDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.FetchAssetApprovalRequestData(appDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312511: Method to update AssetApproval Status
        ///  369041: Modified
        /// </summary>
        /// <param name="candDetail">To get the Candidate detail</param>
        public void UpdateAssetApprovalStatus(CandidateDetail candDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    objBAL.UpdateAssetApprovalStatus(candDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312539 : To get joining location CROP Induction Tracker
        /// </summary>
        /// <param name="candidateDetail">To get the Joining location details of the Candidate</param>
        /// <returns>Joining Location</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList GetJoiningLocation(CandidateDetail candidateDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetJoiningLocation(candidateDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312539 : To get the Induction Location from the Tracker
        /// 369041: Modified
        /// </summary>
        /// <param name="candidateDetail">It helps in searching the Induction location of the Candidate</param>
        /// <returns>Induction Location for the Candidate</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList GetInductionLocation(CandidateDetail candidateDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetInductionLocation(candidateDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312539 : to get joining location CROP InductionCandidateStatus
        /// 369041 : Modified
        /// </summary>
        /// <param name="candidateDetail">To get the Induction Status of the Candidate</param>
        /// <returns>Candidate Induction Status</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList GetInductionCandidateStatus(CandidateDetail candidateDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetInductionCandidateStatus(candidateDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312539 : To get joining location CROP Get Induction Country Name
        /// 369041: Modified
        /// </summary>
        /// <param name="candidateDetail">It helps in searching the induction Country Name</param>
        /// <returns>Country Name in which Induction is done for a candidate</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList GetInductionCountryName(CandidateDetail candidateDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetInductionCountryName(candidateDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312539 :369041: To get the joining location CROP i.e., to get the Candidate Joining Types
        /// </summary>
        /// <param name="candidateDetail">It will help in getting the joining types like Lateral or Campus</param>
        /// <returns>Candidate Joining types of the Candidate</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList GetCanidateJoiningTypes(CandidateDetail candidateDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetCanidateJoiningTypes(candidateDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312539 : To get C-hire Status
        /// </summary>
        /// <param name="candidateDetail">To get the C-Hire Status of the Candidate</param>
        /// <returns>C-Hire Status</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList GetChireStatus(CandidateDetail candidateDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetChireStatus(candidateDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312539 : Method to Fetch candidatesInduction Tracker for showing in dashboard
        /// 369041: Modified
        /// </summary>
        /// <param name="dashboardDetail">Sends the search criteria specified in dashboard.</param>
        /// <param name="totalCount">returns the total records returned for search criteria</param>
        /// <returns>Candidate Induction Tracker to display in Dashboard</returns>
        public string FetchCandidateInductionTrackerDashboard(DashboardDataDC dashboardDetail, TotalCountDC totalCount)
        {
            try
            {
                using (DashBoardBAL objDashBoardBAL = new DashBoardBAL())
                {
                    return objDashBoardBAL.FetchCandidateInductionTrackerDashboard(dashboardDetail, totalCount);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312539 : Method to Fetch candidates Details Induction Tracker based on location
        /// 369041: Modified
        /// </summary>
        /// <param name="dashboardDetail"> Sends the search criteria specified in dashboard. </param>
        /// <param name="totalCount"> returns the total records returned for search criteria</param>
        /// <returns>Induction Location details of the Candidate</returns>
        public string FetchCandidateDetailsInductionLocation(DashboardDataDC dashboardDetail, TotalCountDC totalCount)
        {
            try
            {
                using (DashBoardBAL objDashBoardBAL = new DashBoardBAL())
                {
                    return objDashBoardBAL.FetchCandidateDetailsInductionLocation(dashboardDetail, totalCount);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312539 : Method to Download Induction Attendance Tracker Excel
        /// 369041: Modified
        /// </summary>
        /// <param name="dashboardDetail">Sends the search criteria specified in dashboard.</param>
        /// <param name="totalCount">returns the total records returned for search criteria</param>
        /// <returns>returns the Attendance Excel</returns>
        public DataSet DownloadAttendanceExcel(DashboardDataDC dashboardDetail, TotalCountDC totalCount)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.DownloadAttendanceExcel(dashboardDetail, totalCount);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312539: Method to Update Candidate Attendance Tracker
        ///  369041: Modified
        /// </summary>
        /// <param name="dashboardDetail">To get the details of the Dashboard data</param>
        public void UpdateCandidateAttendanceTracker(DashboardDataDC dashboardDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    objBAL.UpdateCandidateAttendanceTracker(dashboardDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }
        ///// <summary>
        ///// 298589:Method to get the document approval list in HRSS Dashboard
        ///// </summary>
        ///// <param name="GetCandidateDocumentListForApproval"></param>
        ///// <returns></returns>
        ////public CandidateApproveListDataSource GetCandidateDocumentListForApproval(CandidateDocumentForApproval CandidateId)
        ////{
        ////    CandidateApproveListDataSource retCandidateData = new CandidateApproveListDataSource();
        ////    try
        ////    {
        ////        DashBoardBAL objCandidateDocData = new DashBoardBAL();
        ////        retCandidateData = objCandidateDocData.GetDocumentsforApproval(CandidateId);

        ////    }
        ////    catch (Exception ex)
        ////    {
        ////        OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
        ////        throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
        ////    }
        ////    finally
        ////    {
        ////    }
        ////    return retCandidateData;
        ////}

        /// <summary>
        /// 312539: DOJ Confirm RC FOR NA
        /// </summary>
        /// <param name="candDetail">Candidate detail are provided to do update parameters like EDOJ , Offer status , Email Id </param>
        public void UpdateCandidateDOJConfirm(CandidateDetail candDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    objBAL.UpdateCandidateDOJConfirm(candDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312511 : Method to fetch the associate contact details
        /// 369041: Modified
        /// </summary>
        /// <param name="dashboardDetail">To fetch the POC Associate information from the DashBoard Data </param>
        /// <returns>POC Associate Information</returns>
        public CandidateDetail FetchPOCInfo(DashboardDataDC dashboardDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.FetchPOCInfo(dashboardDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 305054: Method to Fetch Candidate Hire Type (hire type for UK)
        /// 369041: Modified
        /// </summary>
        /// <param name="parentId">Parent Id is used to fetch the Candidate Hire Type Data from Dashboard</param>
        /// <returns>DashBoard Date List</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public DashBoardDataList FetchCandidateHireType(DashboardDataDC parentId)
        {
            DashBoardDataList retDashBoardDateList = new DashBoardDataList();
            try
            {
                using (DashBoardBAL objCandidateBAL = new DashBoardBAL())
                {
                    retDashBoardDateList = objCandidateBAL.FetchCandidateHireType(parentId);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            return retDashBoardDateList;
        }

        #region BGVDashboard

        /// <summary>
        /// 312511 : Method to Fetch candidates for showing in dashboard
        /// 369041: Modified
        /// </summary>
        /// <param name="dashboardDetail"> Sends the search criteria specified in dashboard. </param>
        /// <param name="totalCount"> returns the total records returned for search criteria</param>
        /// <returns>Candidates For Dashboard</returns>
        public string FetchCandidatesForDashboard(DashboardDataDC dashboardDetail, TotalCountDC totalCount)
        {
            try
            {
                using (DashBoardBAL objDashBoardBAL = new DashBoardBAL())
                {
                    return objDashBoardBAL.FetchCandidatesForDashboard(dashboardDetail, totalCount);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312511: Method to Fetch candidates for Excel report generation
        /// 369041: Modified
        /// </summary>
        /// <param name="dashboardDetail"> Sends the search criteria specified in dashboard. </param>
        /// <param name="totalCount"> returns the total records returned for search criteria</param>
        /// <returns>Returns the Candidates For Dashboard Excel</returns>
        public DataSet FetchCandidatesForDashboardExcel(DashboardDataDC dashboardDetail, TotalCountDC totalCount)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.FetchCandidatesForDashboardExcel(dashboardDetail, totalCount);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312511: Method to get filter data for candidate search
        /// </summary>
        /// <param name="autoCompleteDC">It helps in auto complete search of the Candidate with the help of filters</param>
        /// <returns>Candidate Filter Search Data auto complete</returns>
        public DataSet FetchCandidatesFilterSearchdata(AutoCompleteDC autoCompleteDC)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.FetchCandidatesFilterSearchdata(autoCompleteDC);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312511 : Method to fetch the personal details of the candidate in dashboard
        /// 369041: Modified
        /// </summary>
        /// <param name="dashboardDetail">To fetch the candidate personal date from Dashboard</param>
        /// <returns>Candidate Personal data</returns>
        public string FetchCandidatePersonalData(DashboardDataDC dashboardDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.FetchCandidatePersonalData(dashboardDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312511 : Method to fetch the prefill values of a candidate in dashboard
        /// 369041: Modified
        /// </summary>
        /// <param name="dashboardDetail">To fetch the candidate pre-fill values</param>
        /// <returns>Pre-fill values of the candidate</returns>
        public string FetchCandidatesPrefillvalues(DashboardDataDC dashboardDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.FetchCandidatesPrefillvalues(dashboardDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312511 : Method to Fetch candidates for showing in vendor dashboard
        /// 369041: Modified
        /// </summary>
        /// <param name="dashboardDetail">Sends the search criteria specified in dashboard.</param>
        /// <param name="totalCount">returns the total records returned for search criteria</param>
        /// <returns>Candidates For showing in Vendor Dashboard</returns>
        public string FetchCandidatesForVendorDashboard(DashboardDataDC dashboardDetail, TotalCountDC totalCount)
        {
            try
            {
                using (DashBoardBAL objDashBoardBAL = new DashBoardBAL())
                {
                    return objDashBoardBAL.FetchCandidatesForVendorDashboard(dashboardDetail, totalCount);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312511: Method to Fetch candidates for Excel report generation for Vendor dashboard
        ///  369041: Modified
        /// </summary>
        /// <param name="dashboardDetail"> Sends the search criteria specified in dashboard. </param>
        /// <param name="totalCount"> returns the total records returned for search criteria</param>
        /// <returns>Candidates For Vendor Dashboard Excel</returns>
        public DataSet FetchCandidatesForVendorDashboardExcel(DashboardDataDC dashboardDetail, TotalCountDC totalCount)
        {
            try
            {
                using (DashBoardBAL objDashBoardBAL = new DashBoardBAL())
                {
                    return objDashBoardBAL.FetchCandidatesForVendorDashboardExcel(dashboardDetail, totalCount);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }
        #endregion

        #region BGV Service Methods

        /// <summary>
        /// 208099 : Method to get all the saved and prefilled values
        ///  369041: Modified
        /// </summary>
        /// <param name="getprefillvalues">To get the pre-fill values of the Candidate</param>
        /// <returns>Pre-fill values from CIS Data</returns>
        public BgvCandidateData GetCisData(BgvCandidateData getprefillvalues)
        {
            try
            {
                using (DashBoardBAL objprefillBAL = new DashBoardBAL())
                {
                    return objprefillBAL.GetCisData(getprefillvalues);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 313248 : Method to Get Component list 
        /// 369041: Modified
        /// </summary>
        /// <param name="typeGroupId">Type Group ID is used to get the Component list for BGV of the Candidate</param>
        /// <returns>Type Group ID of the component</returns>
        public BgvCandidateData GetComponentList(BgvCandidateData typeGroupId)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetComponentList(typeGroupId);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 260947 : Method to get component detail ID based on Component code, Candidate's BU and Country ID
        /// 369041: Modified
        /// </summary>
        /// <param name="componentData">Object of type BGVComponent</param>
        /// <returns>Component detail ID</returns>
        public BgvComponent GetComponentDetailId(BgvComponent componentData)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetComponentDetailId(componentData);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 260947 : Method to Get Component Configuration
        /// 369041: Modified
        /// </summary>
        /// <param name="componentData">Object of type BGVComponent</param>
        /// <returns>Component Configuration</returns>
        public BgvComponent GetComponentConfig(BgvComponent componentData)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetComponentConfig(componentData);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 260947 : Method to get suspect status of an institution
        /// 369041: Modified
        /// </summary>
        /// <param name="componentData">Object of type BGVComponent</param>
        /// <returns>Suspect Status</returns>
        public InstitutionDC GetSuspectStatus(BgvComponent componentData)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetSuspectStatus(componentData);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 260947 : Method to Get Component Data
        /// 369041: Modified
        /// </summary>
        /// <param name="candidateData">Object of type BGV Component</param>
        /// <returns>Candidate Component Data</returns>
        public BgvCandidateData GetCandidateComponentData(BgvCandidateData candidateData)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetCandidateComponentData(candidateData);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 249510 : Method to Get Document Data Xml
        /// 369041: Modified
        /// </summary>
        /// <param name="getDocumentDataXml">To get the Document Data in the XML Format</param>
        /// <returns>Document Data in XML format</returns>
        public BgvComponent GetDocumetDataXml(BgvComponent getDocumentDataXml)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetDocumetDataXml(getDocumentDataXml);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        ///  249510 : Method to fetch BGV URL
        ///  369041: Modified
        /// </summary>
        /// <param name="roleURL">To get the BGV URL for role of the Candidate</param>
        /// <returns>BGV URL of the Candidate</returns>
        public BgvCandidateData GetURLforRole(BgvCandidateData roleURL)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetURLforRole(roleURL);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 369041: Method to get list of notification messages which needs to be displayed in BGV pages
        /// </summary>
        /// <param name="objBgvPageNotificationData">Object of type BGV Page Notification Data</param>
        /// <returns>Page Notification Data is returned</returns>
        public BgvPageNotificationData GetPageNotification(BgvPageNotificationData objBgvPageNotificationData)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetPageNotification(objBgvPageNotificationData);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        ///  249510 : Method to get Relevant experience information
        ///  369041: Modified
        /// </summary>
        /// <param name="expInfo">This Parameter helps in getting the Relevant experience information of the Candidate</param>
        /// <returns>Experience Information</returns>
        public BgvCandidateData GetRelevantExpInfo(BgvCandidateData expInfo)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetRelevantExpInfo(expInfo);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 313248 :Method to Get Document List 
        /// 369041:Modified
        /// </summary>
        /// <param name="getCandidateData">To get the BGV Candidate Data</param>
        /// <returns>Document List</returns>
        public BGVDocumentUploadDetail GetDocumentList(BgvCandidateData getCandidateData)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetDocumentList(getCandidateData);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 298589 : Method to Approve or Reject Upload documents
        /// </summary>
        /// <param name="documentStatus">This helps in searching the document approval status</param>
        /// <returns>Document approval status</returns>
        public DocumentApprovalStatusDC DocumentApprovalStatus(DocumentApprovalStatusDC documentStatus)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.DocumentApprovalStatus(documentStatus);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 298589 : Method to Get Back Papers
        /// 369041: Modified
        /// </summary>
        /// <param name="getCandidateData">To get the Back papers of the candidate</param>
        /// <returns>Back Papers of the candidate</returns>
        public BGVDocumentUploadDetail GetBackPapers(BgvCandidateData getCandidateData)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetBackPapers(getCandidateData);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 249510: Method to get filter data for Employment Name
        /// 369041: Modified
        /// </summary>
        /// <param name="employmentNameDetail">It helps in auto search the employment name</param>
        /// <returns>Employment Name</returns>
        public BgvCandidateData EmploymentNameAutoSearch(BgvCandidateData employmentNameDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.EmploymentNameAutoSearch(employmentNameDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// Method to save vendor document list
        /// </summary>
        /// <param name="listData">To get the BGV Candidate data for saving Vendor Document list</param>
        /// <returns>Save Vendor document list</returns>
        public BgvCandidateData SaveVendorDocList(BgvCandidateData listData)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.SaveVendorDocList(listData);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 298589 : Method to update is suspect raised in back papers
        /// 369041: Modified Data
        /// </summary>
        /// <param name="listData">To get the BGV Candidate Data</param>
        /// <returns>Updated List of the Suspect Status</returns>
        public int UpdateSuspectStatus(BgvCandidateData listData)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.UpdateSuspectStatus(listData);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 298589: Method to Save Back Papers
        /// </summary>
        /// <param name="dsDocumentDetails">To get the document approval status for saving Back Papers</param>
        /// <returns>Back Papers Saved</returns>
        public DocumentApprovalStatusDC SaveBackPapers(DocumentApprovalStatusDC dsDocumentDetails)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.SaveBackPapers(dsDocumentDetails);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }
        #endregion

        #region BGV Config screens Service Methods

        /// <summary>
        /// 312267: 369041: method to get values from database
        /// </summary>
        /// <param name="countryName">It helps to display the Country names in the Drop Down</param>
        /// <returns>Country names in the drop down list are returned</returns>
        public DataSet DropDownCountry(BgvComponentMapping countryName)
        {
            try
            {
                using (DashBoardBAL objDropDownCounry = new DashBoardBAL())
                {
                    return objDropDownCounry.DropDownCountry(countryName);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312267 : Method to set component mapping
        /// 369041: Modified
        /// </summary>
        /// <param name="objBgvMap">It helps in BGV Component mapping</param>
        /// <returns>BGV Mapping</returns>
        public DataSet BgvMapping(BgvComponentMapping objBgvMap)
        {
            try
            {
                using (DashBoardBAL objBgvComMapping = new DashBoardBAL())
                {
                    return objBgvComMapping.BgvMapping(objBgvMap);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312267 :369041: Method to add BGV Document
        /// </summary>
        /// <param name="objBgvDocAdding">It helps in BGV Component Mapping for adding the Documents</param>
        /// <returns>BGV Document Adding for the component Mapping</returns>
        public DataSet BgvDocumentAdding(BgvComponentMapping objBgvDocAdding)
        {
            try
            {
                using (DashBoardBAL objBgvDocAdd = new DashBoardBAL())
                {
                    return objBgvDocAdd.BgvDocumentAdding(objBgvDocAdding);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312223 : method to pre-fill values In BGV Institution Details
        ///  369041: Modified
        /// </summary>
        /// <param name="getprefillvalues">To get the pre-fill values</param>
        /// <returns>pre-fill values</returns>
        public DataSet BgvInstituionPrefill(InstitutionDC getprefillvalues)
        {
            try
            {
                using (DashBoardBAL objprefillBgvIns = new DashBoardBAL())
                {
                    return objprefillBgvIns.BgvInstituionPrefill(getprefillvalues);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312223 : 369041: method to Insert/Update/Delete values In BGV Institution Master table
        /// </summary>
        /// <param name="objBgvIns">This parameter helps in saving the BGV Institution Data</param>
        /// <returns>Institution Data is Saved for BGV</returns>
        public DataSet BgvSaveInstituion(InstitutionDC objBgvIns)
        {
            try
            {
                using (DashBoardBAL objBgvDal = new DashBoardBAL())
                {
                    return objBgvDal.BgvSaveInstituion(objBgvIns);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312223 :369041: validate values In BGV Institution details
        /// </summary>
        /// <param name="objBgvIns">BGV Institution object is to fetch all the Institutions for Back Ground Verification</param>
        /// <returns>BGV Institutions</returns>
        public DataSet BgvValidateInstituion(InstitutionDC objBgvIns)
        {
            try
            {
                using (DashBoardBAL objBgvDal = new DashBoardBAL())
                {
                    return objBgvDal.BgvValidateInstituion(objBgvIns);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        #endregion

        /// <summary>
        /// 312539: Method to Update Candidate Attendance Tracker
        ///  369041: Modified
        /// </summary>
        /// <param name="dashboardDetail">To get the Dashboard Data</param>
        public void SaveConfirmationERprocess(DashboardDataDC dashboardDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    objBAL.SaveConfirmationERprocess(dashboardDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312539,369041 :To Get ER Process candidate list 
        /// </summary>
        /// <param name="dashboardDetail">dashboard Detail</param>
        /// <param name="totalCount">total Count</param>
        /// <returns>dashboard Detail and Total Count</returns>
        public string GetERprocessCandidateView(DashboardDataDC dashboardDetail, TotalCountDC totalCount)
        {
            try
            {
                using (DashBoardBAL objDashBoardBAL = new DashBoardBAL())
                {
                    return objDashBoardBAL.GetERprocessCandidateView(dashboardDetail,  totalCount);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 312539 : Method to update uploaded excel details for attendance mark induction
        ///  369041: Modified
        /// </summary>
        /// <param name="candDetail">Candidate Detail is provided to get the Excel Details Data</param>
        /// <returns>Attendance Upload Excel Details Data of the Candidates</returns>
        public DataSet AttendanceUploadExcelDetailsData(CandidateDetail candDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.AttendanceUploadExcelDetailsData(candDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 369041: This method helps in getting the Candidate Bulk Upload details
        /// </summary>
        /// <param name="candDetail">to get the ID of the Candidate who Uploaded Documents in bulk</param>
        /// <returns>Candidate ID</returns>
        public string CandidateidBulkUpload(CandidateDetail candDetail)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.CandidateidBulkUpload(candDetail);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        #region HTransfer Methods

        /// <summary>
        /// 261671 : Method to Get HT transfer Document List 
        ///  369041: Modified
        /// </summary>
        /// <param name="getCandidateData">To get the H-Transfer Candidate Document list of the Candidate</param>
        /// <returns>Upload Document List</returns>
        public HTransferDocumentUploadDetail GetUploadDocumentList(HTransferCandidateData getCandidateData)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetUploadDocumentList(getCandidateData);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 261671 : Method to Get and insert HT transfer  group Document List 
        ///  369041: Modified
        /// </summary>
        /// <param name="getCandidateData">To get the H-Transfer Document Data</param>
        /// <returns>Group Document List of the Candidate</returns>
        public HTransferDocumentUploadDetail GetGroupDocumentList(HTransferDocumentDC getCandidateData)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.GetGroupDocumentList(getCandidateData);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 261671:369041: Method to save ECM return parameter values to Database
        /// </summary>
        /// <param name="objDocName">This parameter is used to save the H-Transfer uploaded Document Name</param>
        /// <returns>H-Transfer Uploaded document Name is saved</returns>
        public HTransferCandidateDocInfo SaveHTransferUploadedDocName(HTransferDocumentDC objDocName)
        {
            ////string NewUploadSrc = "";           
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.SaveHTransferUploadedDocName(objDocName);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 261671 : Method to Insert or delete HT transfer Document into table after clicking Add / Remove buttons. 
        /// </summary>
        /// <param name="candidateDocData">candidate H-Transfer Document Data</param>
        /// <returns>Insert Delete Document Data of the Candidate</returns>
        public HTransferCandidateDocInfo InsertDeleteDocument(HTransferDocumentDC candidateDocData)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.InsertDeleteDocument(candidateDocData);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 261671 : Method to Submit HTransfer Section
        /// 369041: Modified
        /// </summary>
        /// <param name="getCandidateData">To get the H-Transfer data submitted by the Candidate</param>
        /// <returns>H- transfer Documents Submitted</returns>
        public HTransferDocumentUploadDetail SubmitHTransferDocuments(HTransferCandidateData getCandidateData)
        {
            try
            {
                using (DashBoardBAL objBAL = new DashBoardBAL())
                {
                    return objBAL.SubmitHTransferDocuments(getCandidateData);
                }
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        #endregion
    }
}
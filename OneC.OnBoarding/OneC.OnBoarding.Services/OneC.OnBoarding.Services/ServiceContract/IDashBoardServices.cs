//-----------------------------------------------------------------------=
// <copyright file="IDashBoardServices.cs" company="Cognizant Technology Solutions">
// Copyright  . All Rights Reserved.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace            : OneC.OnBoarding.Services.ServiceContract 
 * Interface Name       : IDashBoardServices.cs
 * Version              : 1.0
 * Type                 : Interface
 * Purpose              : Interface references of dashboard service methods
 * Created date         : 2012-Jan-16
 * Author               : 208099
 * Reviewed by          :
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

namespace OneC.OnBoarding.Services.ServiceContract
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Net.Security;
    using System.Runtime.Serialization;
    using System.ServiceModel;
    using System.Text;
    using OneC.OnBoarding.DC.CandidateDC;
    using OneC.OnBoarding.DC.DashBoardDC;
    using OneC.OnBoarding.DC.UtilityDC;
    #endregion Namespaces

    [ServiceContract(Name = "IDashBoardServices", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DashBoardServices/ServiceContracts/")]

    /// <summary>
    /// 369041: Interface which holds all the DashBoard Services
    /// </summary>
    public interface IDashBoardServices
    {
        [OperationContract(Name = "GetDashboardFilters", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Dashboard Filters
        /// </summary>
        /// <param name="objDashboardFilters">Dashboard Filters</param>   
        /// <returns>Get Dashboard Filters</returns>
        DashboardFilters GetDashboardFilters(DashboardFilters objDashboardFilters);

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "FetchRCData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch RC Data
        /// </summary>
        /// <param name="candDetail">candidate Detail</param>  
        /// <param name="totalCount">total Count</param> 
        /// <returns>Fetch RC Data</returns>
        CandidateDetailList FetchRCData(CandidateDetail candDetail, TotalCountDC totalCount);

        [OperationContract(Name = "FetchTrainingExcelData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch Training Excel Data
        /// </summary>
        /// <param name="candDetail">candidate Detail</param>  
        /// <returns>Fetch Training Excel Data</returns>
        CandidateTrainingDetails FetchTrainingExcelData(CandidateTrainingDC candDetail);

        [OperationContract(Name = "FetchCandidateData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch Candidate Data
        /// </summary>
        /// <param name="candDetail">candidate Detail</param>  
        /// <returns>Fetch Candidate Data</returns>
        CandidateTask FetchCandidateData(CandidateDetail candDetail);

        [OperationContract(Name = "UpdateCandidateDetails", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Update Candidate Details
        /// </summary>
        /// <param name="candDetail">candidate Detail</param>  
        void UpdateCandidateDetails(CandidateDetail candDetail);

        [OperationContract(Name = "DashBoardProcessCount", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To get DashBoard Process Count
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>  
        /// <returns>DashBoard Process Count</returns>
        DashBoardDataPagination DashBoardProcessCount(CandidateDetail candidateDetail);

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "GetWorkLocation", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Work Location
        /// </summary>
        /// <param name="dashboardData">dashboard Data</param>  
        /// <returns>Get Work Location</returns>
        DashBoardDataList GetWorkLocation(DashboardDataDC dashboardData);

        [OperationContract(Name = "UnlockCandidateAccess", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Unlock Candidate Access
        /// </summary>
        /// <param name="candDetail">candidate Detail</param>  
        void UnlockCandidateAccess(CandidateDetail candDetail);

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "GetHRSSMappedCountry", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get HRSS Mapped Country
        /// </summary>
        /// <param name="dashboardData">dashboard Data</param>  
        /// <returns>Get HRSS Mapped Country</returns>
        DashBoardDataList GetHRSSMappedCountry(DashboardDataDC dashboardData);

        // AddeD : 312539
        [OperationContract(Name = "GetLevel", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To get Level
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>  
        /// <returns>get Level</returns>
        NssDashboardData GetLevel(CandidateDetail candidateDetail);

        // AddeD : 312539
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "GetCity", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To get City
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>  
        /// <returns>get City</returns>
        CandidateDetailList GetCity(CandidateDetail candidateDetail);

        // AddeD : 312539
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "LapTopBlackpBerryCount", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To LapTop Black Berry Count
        /// </summary>
        /// <param name="candDetail">candidate Detail</param>  
        /// <returns>LapTop Black Berry Count</returns>
        CandidateDetailList LapTopBlackpBerryCount(CandidateDetail candDetail);

        // AddeD : 312539
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "Equipment", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To get Equipment
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>  
        /// <returns>get Equipment</returns>
        CandidateDetailList Equipment(CandidateDetail candidateDetail);

        // Added : 312539
        [OperationContract(Name = "BindWorklocation", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Bind Work location
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>  
        /// <returns>Bind Work location</returns>
        NssDashboardData BindWorklocation(CandidateDetail candidateDetail);

        // Added : 312539
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "FetchNSSData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch NSS Data
        /// </summary>
        /// <param name="candDetail">candidate Detail</param>  
        /// <param name="totalCount">total Count</param> 
        /// <returns>Fetch NSS Data</returns>
        CandidateDetailList FetchNSSData(CandidateDetail candDetail, TotalCountDC totalCount);

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "FetchHRSSData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>FetchNSSDataDashboard
        /// 369041: To Fetch HRSS Data
        /// </summary>
        /// <param name="candDetail">candidate Detail</param>  
        /// <param name="totalCount">total Count</param> 
        /// <returns>Fetch HRSS Data</returns>
        CandidateDetailList FetchHRSSData(CandidateDetail candDetail, TotalCountDC totalCount);

        [OperationContract(Name = "UpdateCandidateJoiningStatusDetails", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Update Candidate Joining Status Details
        /// </summary>
        /// <param name="candDetail">candidate Detail</param>  
        void UpdateCandidateJoiningStatusDetails(CandidateDetail candDetail);

        [OperationContract(Name = "DashBoardProcessCountForHRSS", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get DashBoard Process Count For HRSS
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>  
        /// <returns>Get DashBoard Process Count For HRSS</returns>
        DashBoardDataPagination DashBoardProcessCountForHRSS(CandidateDetail candidateDetail);

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "FetchNSSDataDashboard", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch NSS Data Dashboard
        /// </summary>
        /// <param name="candDetail">candidate Detail</param>  
        /// <param name="totalCount">total Count</param> 
        /// <returns>Fetch NSS Data Dashboard</returns>
        CandidateDetailList FetchNSSDataDashboard(CandidateDetail candDetail, TotalCountDC totalCount);

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "GetIMMappedCountry", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get IM Mapped Country
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>  
        /// <returns>Get IM Mapped Country</returns>
        CandidateDetailList GetIMMappedCountry(CandidateDetail candidateDetail);

        // Added : 195514
        [OperationContract(Name = "GetTimelineFilters", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Timeline Filters
        /// </summary>
        /// <returns>Get Timeline Filters</returns>
        TimelineFilter[] GetTimelineFilters();

        // Added : 195514
        [OperationContract(Name = "GetAssetRequestTimelineStatus", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Asset Request Timeline Status
        /// 305054: reverted 369041
        /// </summary>
        /// <param name="timelineFilterId">timeline Filter</param>  
        /// <returns>Get Asset Request Timeline Status</returns>
        AssetRequestStatus[] GetAssetRequestTimelineStatus(TimelineFilter timelineFilterId);

        // Added : 195514
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "FetchNSSDashBoardData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch NSS DashBoard Data
        /// </summary>
        /// <param name="candDetail">candidate Detail</param>  
        /// <param name="totalCount">total Count</param> 
        /// <returns>Fetch NSS DashBoard Data</returns>
        CandidateDetailList FetchNSSDashBoardData(CandidateDetail candDetail, TotalCountDC totalCount);

        // Added : 195514
        [OperationContract(Name = "FetchNSSCandidateData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch NSS Candidate Data
        /// </summary>
        /// <param name="candDetail">candidate Detail</param>  
        /// <returns>Fetch NSS Candidate Data</returns>
        CandidateTask FetchNSSCandidateData(CandidateDetail candDetail);

        // Added : 195514
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "UpdateNSSAssetDetails", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Update NSS Asset Details
        /// </summary>
        /// <param name="candAssetList">Candidate Asset List</param>  
        void UpdateNSSAssetDetails(CandAssetStatusList candAssetList);

        // Added : 195514
        [OperationContract(Name = "DashBoardAssetCountForNSS", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get DashBoard Asset Count For NSS
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>  
        /// <returns>Get DashBoard Asset Count For NSS</returns>
        DashBoardDataPagination DashBoardAssetCountForNSS(CandidateDetail candidateDetail);

        // Added 224730
        [OperationContract(Name = "GetFileUploadDetails", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get File Upload Details
        /// </summary>
        /// <param name="adminDashBoard">Admin DashBoard</param>
        /// <returns>Get File Upload Details</returns>
        AdminDashBoard GetFileUploadDetails(AdminDashBoard adminDashBoard);

        #region Admin dashboard methods

        // added 224730
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "FetchADMINDataDashboard", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch ADMIN Data Dashboard
        /// </summary>
        /// <param name="candDetail">candidate Detail</param>  
        /// <param name="totalCount">total Count</param> 
        /// <returns>Fetch ADMIN Data Dashboard</returns>
        CandidateDetailList FetchADMINDataDashboard(CandidateDetail candDetail, TotalCountDC totalCount);

        // added 224730
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "GetStatusList", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Status List
        /// </summary>
        /// <param name="candDetail">candidate Detail</param>  
        /// <returns>Get Status List</returns>
        CandidateDetailList GetStatusList(CandidateDetail candDetail);

        // added 224730
        [OperationContract(Name = "FetchADMINDataDashboardExcel", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch ADMIN Data Dashboard Excel
        /// </summary>
        /// <param name="candDetail">candidate Detail</param>  
        /// <returns>Fetch ADMIN Data Dashboard Excel</returns>
        CandidateDetails FetchADMINDataDashboardExcel(CandidateDetail candDetail);

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "GetLocationList", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Location List
        /// </summary>
        /// <param name="objadmin">Admin DashBoard</param>
        /// <returns>Get Location List</returns>
        CityList GetLocationList(AdminDashBoard objadmin);

        #endregion

        [OperationContract(Name = "GetDepartment", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Department
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>  
        /// <returns>Get Department</returns>
        TMDashboardData GetDepartment(CandidateDetail candidateDetail);

        [OperationContract(Name = "FetchDashboardDataForExcel", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch Dashboard Data For Excel
        /// </summary>
        /// <param name="candDetail">candidate Detail</param>  
        /// <param name="totalCount">total Count</param> 
        /// <returns>Fetch Dashboard Data For Excel</returns>
        DataSet FetchDashboardDataForExcel(CandidateDetail candDetail, TotalCountDC totalCount);

        [OperationContract(Name = "FetchNSSDashBoardAssetReport", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch NSS DashBoard Asset Report
        /// </summary>
        /// <param name="candDetail">candidate Detail</param>  
        /// <param name="totalCount">total Count</param> 
        /// <returns>Fetch NSS DashBoard Asset Report</returns>
        DataSet FetchNSSDashBoardAssetReport(CandidateDetail candDetail, TotalCountDC totalCount);

        [OperationContract(Name = "FetchNSSDashboardDataForExcel", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch NSS Dashboard Data For Excel
        /// </summary>
        /// <param name="candDetail">candidate Detail</param>  
        /// <param name="totalCount">total Count</param> 
        /// <returns>Fetch NSS Dashboard Data For Excel</returns>
        DataSet FetchNSSDashboardDataForExcel(CandidateDetail candDetail, TotalCountDC totalCount);

        [OperationContract(Name = "ForcasteDashboardExcelReport", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Forecast Dashboard Excel Report
        /// </summary>
        /// <param name="candDetail">candidate Detail</param>  
        /// <param name="totalCount">total Count</param> 
        /// <returns>Forecast Dashboard Excel Report</returns>
        DataSet ForcasteDashboardExcelReport(CandidateDetail candDetail, TotalCountDC totalCount);

        // Added  ID:312539 Date: 10-08-2012
        // for nss Dashboard upload excel update table  method
        [OperationContract(Name = "UploadExcelDetailsData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Upload Excel Details Data
        /// </summary>
        /// <param name="candDetail">candidate Detail</param>  
        void UploadExcelDetailsData(CandidateDetail[] candDetail);

        [OperationContract(Name = "UpdatePhotoStatus", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Update Photo Status
        /// </summary>
        /// <param name="candDetail">candidate Detail</param>  
        void UpdatePhotoStatus(CandidateDetail candDetail);

        // Added : 312511
        [OperationContract(Name = "SaveApprovalRequestData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Save Approval Request Data
        /// </summary>
        /// <param name="appDetail">Approval Details</param>
        void SaveApprovalRequestData(ApprovalDetails appDetail);

        // Added : 312511
        [OperationContract(Name = "FetchAssetApprovalRequestData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch Asset Approval Request Data
        /// </summary>
        /// <param name="appDetail">Approval Details</param>
        /// <returns>Fetch Asset Approval Request Data</returns>
        DataSet FetchAssetApprovalRequestData(ApprovalDetails appDetail);

        // Added : 312511
        [OperationContract(Name = "UpdateAssetApprovalStatus", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Update Asset Approval Status
        /// </summary>
        /// <param name="candDetail">candidate Detail</param>  
        void UpdateAssetApprovalStatus(CandidateDetail candDetail);

        // 312539
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "GetJoiningLocation", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Joining Location
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>  
        /// <returns>Get Joining Location</returns>
        CandidateDetailList GetJoiningLocation(CandidateDetail candidateDetail);

        // 312539
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "GetInductionLocation", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Induction Location
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>  
        /// <returns>Get Induction Location</returns>
        CandidateDetailList GetInductionLocation(CandidateDetail candidateDetail);

        // 312539
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "GetInductionCandidateStatus", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Induction Candidate Status
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>  
        /// <returns>Get Induction Candidate Status</returns>
        CandidateDetailList GetInductionCandidateStatus(CandidateDetail candidateDetail);

        // 312539
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "GetInductionCountryName", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Induction Country Name
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>  
        /// <returns>Get Induction Country Name</returns>
        CandidateDetailList GetInductionCountryName(CandidateDetail candidateDetail);

        // 312539
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "GetCanidateJoiningTypes", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Candidate Joining Types
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>  
        /// <returns>Get Candidate Joining Types</returns>
        CandidateDetailList GetCanidateJoiningTypes(CandidateDetail candidateDetail);

        // 312539
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "GetChireStatus", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get C-Hire Status
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>  
        /// <returns>Get C-Hire Status</returns>
        CandidateDetailList GetChireStatus(CandidateDetail candidateDetail);

        // 312539
        [OperationContract(Name = "FetchCandidateInductionTrackerDashboard", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch Candidate Induction Tracker Dashboard
        /// </summary>
        /// <param name="dashboardDetail">Dashboard Detail</param>  
        /// <param name="totalCount">total Count</param> 
        /// <returns>Fetch Candidate Induction Tracker Dashboard</returns>
        string FetchCandidateInductionTrackerDashboard(DashboardDataDC dashboardDetail, TotalCountDC totalCount);

        // 312539
        [OperationContract(Name = "FetchCandidateDetailsInductionLocation", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch Candidate Details Induction Location
        /// </summary>
        /// <param name="dashboardDetail">Dashboard Detail</param>  
        /// <param name="totalCount">total Count</param> 
        /// <returns>Fetch Candidate Details Induction Location</returns>
        string FetchCandidateDetailsInductionLocation(DashboardDataDC dashboardDetail, TotalCountDC totalCount);

        // 312539
        [OperationContract(Name = "DownloadAttendanceExcel", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch Candidate Details Induction Location
        /// </summary>
        /// <param name="dashboardDetail">Dashboard Detail</param>  
        /// <param name="totalCount">total Count</param> 
        /// <returns>Fetch Candidate Details Induction Location</returns>
        DataSet DownloadAttendanceExcel(DashboardDataDC dashboardDetail, TotalCountDC totalCount);

        // Added : 312539
        [OperationContract(Name = "UpdateCandidateAttendanceTracker", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Update Candidate Attendance Tracker
        /// </summary>
        /// <param name="dashboardDetail">dashboard Detail</param>
        void UpdateCandidateAttendanceTracker(DashboardDataDC dashboardDetail);

        // [OperationContract(Name = "GetCandidateDocumentListForApproval", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        // [FaultContract(typeof(OBFaultContractFC))]
        // CandidateApproveListDataSource GetCandidateDocumentListForApproval(CandidateDocumentForApproval CandidateId);

        // added:312539
        [OperationContract(Name = "UpdateCandidateDOJConfirm", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Update Candidate DOJ Confirm
        /// </summary>
        /// <param name="candDetail">candidate Detail</param>  
        void UpdateCandidateDOJConfirm(CandidateDetail candDetail);

        // 312511
        [OperationContract(Name = "FetchPOCInfo", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch POC Information
        /// </summary>
        /// <param name="dashboardDetail">Dashboard Detail</param>  
        /// <returns>Fetch POC Information</returns>
        CandidateDetail FetchPOCInfo(DashboardDataDC dashboardDetail);

        // 305054 HireType requirement for UK Lateral
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "FetchCandidateHireType", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch Candidate Hire Type
        /// </summary>
        /// <param name="parentId">parent ID</param>  
        /// <returns>Fetch Candidate Hire Type</returns>
        DashBoardDataList FetchCandidateHireType(DashboardDataDC parentId); // 305054 end here

        #region BGVDashboard

        // 312511
        [OperationContract(Name = "FetchCandidatesForDashboard", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch Candidates For Dashboard
        /// </summary>
        /// <param name="dashboardDetail">Dashboard Detail</param>  
        /// <param name="totalCount">total Count</param> 
        /// <returns>Fetch Candidates For Dashboard</returns>
        string FetchCandidatesForDashboard(DashboardDataDC dashboardDetail, TotalCountDC totalCount);

        // 312511
        [OperationContract(Name = "FetchCandidatesForDashboardExcel", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch Candidates For Dashboard Excel
        /// </summary>
        /// <param name="dashboardDetail">Dashboard Detail</param>  
        /// <param name="totalCount">total Count</param> 
        /// <returns>Fetch Candidates For Dashboard Excel</returns>
        DataSet FetchCandidatesForDashboardExcel(DashboardDataDC dashboardDetail, TotalCountDC totalCount);

        // 312511
        [OperationContract(Name = "FetchCandidatesFilterSearchdata", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch Candidates Filter Search data
        /// </summary>
        /// <param name="autoCompleteDC">Auto Complete DC</param>  
        /// <returns>Fetch Candidates Filter Search data</returns>
        DataSet FetchCandidatesFilterSearchdata(AutoCompleteDC autoCompleteDC);

        // 312539 
        [OperationContract(Name = "FetchCandidatePersonalData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch Candidate Personal Data
        /// </summary>
        /// <param name="dashboardDetail">Dashboard Data DC</param>  
        /// <returns>Fetch Candidates Filter Search data</returns>
        string FetchCandidatePersonalData(DashboardDataDC dashboardDetail);

        // 312511
        [OperationContract(Name = "FetchCandidatesPrefillvalues", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch Candidates Prefill values
        /// </summary>
        /// <param name="dashboardDetail">Dashboard Data DC</param>  
        /// <returns>Fetch Candidates Prefill values</returns>
        string FetchCandidatesPrefillvalues(DashboardDataDC dashboardDetail);

        // 312511
        [OperationContract(Name = "FetchCandidatesForVendorDashboard", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch Candidates For Vendor Dashboard
        /// </summary>
        /// <param name="dashboardDetail">Dashboard Detail</param>  
        /// <param name="totalCount">total Count</param> 
        /// <returns>Fetch Candidates For Vendor Dashboard</returns>
        string FetchCandidatesForVendorDashboard(DashboardDataDC dashboardDetail, TotalCountDC totalCount);

        // 312511
        [OperationContract(Name = "FetchCandidatesForVendorDashboardExcel", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch Candidates For Vendor Dashboard Excel
        /// </summary>
        /// <param name="dashboardDetail">Dashboard Detail</param>  
        /// <param name="totalCount">total Count</param> 
        /// <returns>Fetch Candidates For Vendor Dashboard Excel</returns>
        DataSet FetchCandidatesForVendorDashboardExcel(DashboardDataDC dashboardDetail, TotalCountDC totalCount);
        #endregion
        #region BGV Service Methods

        [OperationContract(Name = "GetCisData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get CIS Data
        /// </summary> 
        /// <param name="prefillvalues">prefill values</param> 
        /// <returns>Get CIS Data</returns>
        BgvCandidateData GetCisData(BgvCandidateData prefillvalues);

        [OperationContract(Name = "GetComponentList", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Component List
        /// </summary> 
        /// <param name="typeGroupId">type Group ID</param> 
        /// <returns>Get Component List</returns>
        BgvCandidateData GetComponentList(BgvCandidateData typeGroupId);

        [OperationContract(Name = "GetComponentDetailId", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Component Detail ID
        /// </summary> 
        /// <param name="componentData">component Data</param> 
        /// <returns>Get Component Detail ID</returns>
        BgvComponent GetComponentDetailId(BgvComponent componentData);

        [OperationContract(Name = "GetComponentConfig", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Component Configuration
        /// </summary> 
        /// <param name="componentData">component Data</param> 
        /// <returns>Get Component Configuration</returns>
        BgvComponent GetComponentConfig(BgvComponent componentData);

        [OperationContract(Name = "GetSuspectStatus", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Suspect Status
        /// </summary> 
        /// <param name="componentData">component Data</param> 
        /// <returns>Get Suspect Status</returns>
        InstitutionDC GetSuspectStatus(BgvComponent componentData);

        [OperationContract(Name = "GetCandidateComponentData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Candidate Component Data
        /// </summary> 
        /// <param name="candidateData">candidate Data</param> 
        /// <returns>Get Candidate Component Data</returns>
        BgvCandidateData GetCandidateComponentData(BgvCandidateData candidateData);

        [OperationContract(Name = "GetDocumetDataXml", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Document Data Xml
        /// </summary> 
        /// <param name="requestedDoc">requested Documents</param> 
        /// <returns>Get Document Data Xml</returns>
        BgvComponent GetDocumetDataXml(BgvComponent requestedDoc);

        [OperationContract(Name = "GetURLforRole", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get URL for Role
        /// </summary> 
        /// <param name="roleURL">role URL</param> 
        /// <returns>Get URL for Role</returns>
        BgvCandidateData GetURLforRole(BgvCandidateData roleURL);

        [OperationContract(Name = "GetPageNotification", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Page Notification
        /// </summary> 
        /// <param name="objBgvPageNotificationData">BGV Page Notification Data</param> 
        /// <returns>Get Page Notification</returns>
        BgvPageNotificationData GetPageNotification(BgvPageNotificationData objBgvPageNotificationData);

        [OperationContract(Name = "GetRelevantExpInfo", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Relevant Experience Information
        /// </summary> 
        /// <param name="expInfo">Experience Information</param> 
        /// <returns>Get Relevant Experience Information</returns>
        BgvCandidateData GetRelevantExpInfo(BgvCandidateData expInfo);

        [OperationContract(Name = "GetDocumentList", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Document List
        /// </summary> 
        /// <param name="candidateData">Candidate Data</param> 
        /// <returns>Get Document List</returns>
        BGVDocumentUploadDetail GetDocumentList(BgvCandidateData candidateData);

        [OperationContract(Name = "DocumentApprovalStatus", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Document Approval Status
        /// </summary> 
        /// <param name="documentStatus">document Status</param> 
        /// <returns>Document Approval Status</returns>
        DocumentApprovalStatusDC DocumentApprovalStatus(DocumentApprovalStatusDC documentStatus);

        [OperationContract(Name = "GetBackPapers", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Back Papers
        /// </summary> 
        /// <param name="candidateData">candidate Data</param> 
        /// <returns>Get Back Papers</returns>
        BGVDocumentUploadDetail GetBackPapers(BgvCandidateData candidateData);

        [OperationContract(Name = "EmploymentNameAutoSearch", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Auto Search Employment Name 
        /// </summary> 
        /// <param name="employmentNameDetail">employment Name Detail</param> 
        /// <returns>Auto Search Employment Name</returns>
        BgvCandidateData EmploymentNameAutoSearch(BgvCandidateData employmentNameDetail);

        [OperationContract(Name = "UpdateSuspectStatus", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Update Suspect Status
        /// </summary> 
        /// <param name="listData">list Data</param> 
        /// <returns>Update Suspect Status</returns>
        int UpdateSuspectStatus(BgvCandidateData listData);

        [OperationContract(Name = "SaveBackPapers", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Save Back Papers
        /// </summary> 
        /// <param name="dsDocumentDetails">Document Details</param> 
        /// <returns>Save Back Papers</returns>
        DocumentApprovalStatusDC SaveBackPapers(DocumentApprovalStatusDC dsDocumentDetails);

        #endregion

        #region BGV Config Screens Service Methods

        // 312267
        [OperationContract(Name = "DropDownCountry", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Drop Down Country
        /// </summary> 
        /// <param name="countryName">country Name</param> 
        /// <returns>Drop Down Country</returns>
        DataSet DropDownCountry(BgvComponentMapping countryName);

        // 312267
        [OperationContract(Name = "BgvMapping", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To BGV Mapping
        /// </summary> 
        /// <param name="objBgvComMapping">BGV Component Mapping</param> 
        /// <returns>BGV Mapping</returns>
        DataSet BgvMapping(BgvComponentMapping objBgvComMapping);

        // 312267
        [OperationContract(Name = "BgvDocumentAdding", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To BGV Document Adding
        /// </summary> 
        /// <param name="objBgvDocAdding">BGV Documents</param> 
        /// <returns>BGV Mapping</returns>
        DataSet BgvDocumentAdding(BgvComponentMapping objBgvDocAdding);

        // 312223
        [OperationContract(Name = "BgvInstituionPrefill", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To BGV Institution Prefill
        /// </summary> 
        /// <param name="objbgvIns">BGV Institutions</param> 
        /// <returns>BGV Institution Prefill</returns>
        DataSet BgvInstituionPrefill(InstitutionDC objbgvIns);

        // 312223
        [OperationContract(Name = "BgvSaveInstituion", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To BGV Save Institution
        /// </summary> 
        /// <param name="objBgvIns">BGV Institutions</param> 
        /// <returns>BGV Save Institution</returns>
        DataSet BgvSaveInstituion(InstitutionDC objBgvIns);

        // 312223
        [OperationContract(Name = "BgvValidateInstituion", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To BGV Validate Institution
        /// </summary> 
        /// <param name="objBgvIns">BGV Institutions</param> 
        /// <returns>BGV Validate Institution</returns>
        DataSet BgvValidateInstituion(InstitutionDC objBgvIns);

        #endregion

        ////Added : 312539
        [OperationContract(Name = "SaveConfirmationERprocess", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Save Confirmation ER process
        /// </summary>
        /// <param name="dashboardDetail">Dashboard Data DC</param>  
        void SaveConfirmationERprocess(DashboardDataDC dashboardDetail);

        // 312539
        [OperationContract(Name = "GetERprocessCandidateView", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get ER process Candidate View
        /// </summary>
        /// <param name="dashboardDetail">Dashboard Detail</param>  
        /// <param name="totalCount">total Count</param> 
        /// <returns>Get ER process Candidate View</returns>
        string GetERprocessCandidateView(DashboardDataDC dashboardDetail, TotalCountDC totalCount);

        [OperationContract(Name = "AttendanceUploadExcelDetailsData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: Attendance Upload Excel Details Data
        /// </summary>
        /// <param name="candDetail">candidate Detail</param> 
        /// <returns>Attendance Upload Excel Details Data</returns>
        DataSet AttendanceUploadExcelDetailsData(CandidateDetail candDetail);

        [OperationContract(Name = "CandidateidBulkUpload", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: Candidate ID Bulk Upload
        /// </summary>
        /// <param name="candDetail">candidate Detail</param> 
        /// <returns>Candidate ID Bulk Upload</returns>
        string CandidateidBulkUpload(CandidateDetail candDetail);

        #region HTransfer Service Methods

        // 261671
        [OperationContract(Name = "GetUploadDocumentList", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Upload Document List
        /// </summary> 
        /// <param name="candidateData">Candidate Data</param> 
        /// <returns>Get Upload Document List</returns>
        HTransferDocumentUploadDetail GetUploadDocumentList(HTransferCandidateData candidateData);

        [OperationContract(Name = "GetGroupDocumentList", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Group Document List
        /// </summary> 
        /// <param name="candidateData">Candidate Data</param> 
        /// <returns>Get Group Document List</returns>
        HTransferDocumentUploadDetail GetGroupDocumentList(HTransferDocumentDC candidateData);

        [OperationContract(Name = "InsertDeleteDocument", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Insert Delete Document
        /// </summary> 
        /// <param name="candidateData">Candidate Data</param> 
        /// <returns>Insert Delete Document</returns>
        HTransferCandidateDocInfo InsertDeleteDocument(HTransferDocumentDC candidateData);

        [OperationContract(Name = "SaveHTransferUploadedDocName", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Save HTransfer Uploaded Document Name
        /// </summary> 
        /// <param name="candidateData">Candidate Data</param> 
        /// <returns>Save HTransfer Uploaded Document Name</returns>
        HTransferCandidateDocInfo SaveHTransferUploadedDocName(HTransferDocumentDC candidateData);

        [OperationContract(Name = "SubmitHTransferDocuments", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Submit HTransfer Documents
        /// </summary> 
        /// <param name="candidateData">Candidate Data</param> 
        /// <returns>Submit HTransfer Documents</returns>
        HTransferDocumentUploadDetail SubmitHTransferDocuments(HTransferCandidateData candidateData);

        #endregion
    }
}

//-----------------------------------------------------------------------
// <copyright file="ICandidateServices.cs" company="Cognizant Technology Solutions">
// Copyright  . All Rights Reserved.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace            : OneC.OnBoarding.Services.ServiceContract
 * Interface Name       : ICandidateServices.cs
 * Version              : 1.0
 * Type                 : Interface
 * Purpose              : Interface references of candidate service methods
 * Created date         : 2012-Jan-20
 * Author               : 260947
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
    using System.Linq;
    using System.Net.Security;
    using System.Runtime.Serialization;
    using System.ServiceModel;
    using System.Text;
    using OneC.OnBoarding.DC.CandidateDC;
    using OneC.OnBoarding.DC.DashBoardDC;
    using OneC.OnBoarding.DC.UtilityDC;
    #endregion

    [ServiceContract(Name = "ICandidateServices", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/CandidateServices/ServiceContracts/")]

    /// <summary>
    /// 369041: Interface which holds all the Candidate Services
    /// </summary>
    public interface ICandidateServices
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "FetchCandidateTracking", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To fetch candidate tracking
        /// </summary>
        /// <param name="sessionDetail">session Detail</param>   
        /// <returns name="FetchCandidateTracking">Fetch Candidate Tracking</returns>
        CandidateDetailList FetchCandidateTracking(SessionDetails sessionDetail);

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "FetchTaskList", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To fetch Task List
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>   
        /// <returns name="FetchTaskList">Fetch Task List</returns>
        TaskDetailsList FetchTaskList(CandidateDetail candidateDetail);

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "FetchCandidateType", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To fetch candidate tracking
        /// </summary>
        /// <returns name="FetchCandidateType">Fetch Candidate Type</returns>
        CandidateTypeList FetchCandidateType();

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "FetchCandidateHireType", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch Candidate Hire Type
        /// </summary>
        /// <param name="parentId">parent Id</param>   
        /// <returns name="FetchCandidateHireType">Fetch Candidate Hire Type</returns>
        CandidateTypeList FetchCandidateHireType(CandidateTypeDC parentId); // hiretypeforuk

        [OperationContract(Name = "FetchMasterData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch Master Data
        /// </summary>
        /// <param name="parentCode">parent Code</param>   
        /// <returns name="FetchMasterData">Fetch Master Data</returns>
        MasterListSource FetchMasterData(MasterList parentCode);

        [OperationContract(Name = "GetPrefillValues", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Prefill Values
        /// </summary>
        /// <param name="prefillvalues">prefill values</param>   
        /// <returns name="GetPrefillValues">Get Prefill Values</returns>
        SaveTaskDC GetPrefillValues(SaveTaskDC prefillvalues);

        [OperationContract(Name = "SaveTaskData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Save Task Data
        /// </summary>
        /// <param name="saveTaskdata">save Task data</param>   
        /// <returns name="SaveTaskData">Save Task Data</returns>
        int SaveTaskData(SaveTaskDC saveTaskdata);

        [OperationContract(Name = "ValidateAuthenticationKey", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Validate Authentication Key
        /// </summary>
        /// <param name="getSignKey">get Sign Key</param>   
        /// <returns name="ValidateAuthenticationKey">Validate Authentication Key</returns>
        int ValidateAuthenticationKey(SaveTaskDC getSignKey);

        [OperationContract(Name = "ValidateTaskContent", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Validate Task Content
        /// </summary>
        /// <param name="param">parameters for validation</param>   
        /// <returns name="ValidateTaskContent">Validate Task Content</returns>
        SaveTaskDC ValidateTaskContent(SaveTaskDC param);

        [OperationContract(Name = "GetHtmlContentToGeneratePDF", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Html Content To Generate PDF
        /// </summary>
        /// <param name="getParams">get Parameters</param>   
        /// <returns name="GetHtmlContentToGeneratePDF">Get Html Content To Generate PDF</returns>
        SaveTaskDC GetHtmlContentToGeneratePDF(SaveTaskDC getParams);

        [OperationContract(Name = "GetGeographyMaster", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Geography Master
        /// </summary>
        /// <param name="country">Country to get its geography master</param>   
        /// <returns name="GetGeographyMaster">Get Geography Master</returns>
        CountryListSource GetGeographyMaster(Country country);

        [OperationContract(Name = "ResetAuthenticationKey", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Reset Authentication Key
        /// </summary>
        /// <param name="resetKey">reset Key</param>   
        void ResetAuthenticationKey(SaveTaskDC resetKey);

        [OperationContract(Name = "SaveMeetingID", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Save Meeting ID
        /// </summary>
        /// <param name="meetingDetail">meeting Detail</param>   
        void SaveMeetingID(SaveMeetingID meetingDetail);

        [OperationContract(Name = "FetchFaq", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch FAQ
        /// </summary>
        /// <param name="faqSearch">FAQ Search</param>   
        /// <returns name="FetchFAQ">Fetch FAQ</returns>
        string FetchFAQ(FaqSearch faqSearch);

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "FetchTrainingMaster", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch Training Master
        /// </summary>
        /// <param name="objTraining">New Hire Training</param>   
        /// <returns name="FetchTrainingMaster">Fetch Training Master</returns>
        TrainingList FetchTrainingMaster(NewHireTrainingDC objTraining);

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "FetchTrainingStatus", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch Training Status
        /// </summary>
        /// <returns name="FetchTrainingStatus">Fetch Training Status</returns>
        TrainingList FetchTrainingStatus();

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "FetchTraningData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch Training Data
        /// </summary>
        /// <param name="objDc">New Hire DC</param>   
        /// <param name="totalCount">total Count</param> 
        /// <returns name="FetchTraningData">Fetch Training Data</returns>
        TrainingList FetchTraningData(NewHireTrainingDC objDc, TotalCountDC totalCount);

        [OperationContract(Name = "UpdateTrainingDate", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Update Training Date
        /// </summary>
        /// <param name="objTrainingList">Training List</param>   
        /// <returns>Update Training Date</returns>
        int UpdateTrainingDate(NewHireTrainingDC objTrainingList);

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "FetchTrainingDrillDownData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch Training Drill Down Data
        /// </summary>
        /// <param name="objTrainingDrillDown">Training Drill Down</param>   
        /// <returns>Fetch Training Drill Down Data</returns>
        CandidateTrainingList FetchTrainingDrillDownData(CandidateTrainingDC objTrainingDrillDown);

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "FetchTrainingDates", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch Training Dates
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>   
        /// <returns>Fetch Training Dates</returns>
        CandidateTrainingList FetchTrainingDates(CandidateDetail candidateDetail);

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "FetchTrainingDetails", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch Training Details
        /// </summary>
        /// <param name="objTrainingDC">Training DC</param>   
        /// <returns>Fetch Training Details</returns>
        TrainingList FetchTrainingDetails(NewHireTrainingDC objTrainingDC);

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "PopulateCandidateTrainingDetails", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Populate Candidate Training Details
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>   
        /// <returns>Populate Candidate Training Details</returns>
        TrainingList PopulateCandidateTrainingDetails(CandidateDetail candidateDetail);

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "SendInductionDiaryInvites", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Send Induction Diary Invites
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>   
        /// <returns>To Send Induction Diary Invites</returns>
        TrainingList SendInductionDiaryInvites(CandidateTrainingDC candidateDetail);

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "RegisterCancelTrainingDetails", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Register Cancel Training Details
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>   
        /// <returns>Register Cancel Training Details</returns>
        TrainingList RegisterCancelTrainingDetails(CandidateTrainingDC candidateDetail);

        [OperationContract(Name = "UpdateCandidateTrainingDate", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Update Candidate Training Date
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>   
        /// <returns>Update Candidate Training Date</returns>
        int UpdateCandidateTrainingDate(CandidateTrainingDC candidateDetail);

        [OperationContract(Name = "GetEmployersDetails", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Employers Details
        /// </summary>
        /// <param name="getEmployerdata">Get Employers data</param>   
        /// <returns>Get Employers Details</returns>
        SaveTaskDC GetEmployersDetails(SaveTaskDC getEmployerdata);

        [OperationContract(Name = "UpdateNHOTrainingData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Update NHO Training Data
        /// </summary>
        /// <param name="objTrainingList">Training List</param>   
        /// <returns>Update NHO Training Data</returns>
        int UpdateNHOTrainingData(NewHireTrainingDC objTrainingList);

        [OperationContract(Name = "GetMedicalTopupCover", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get Medical Top up Cover
        /// </summary>
        /// <param name="getcandidateID">Get candidate ID</param>   
        /// <returns>Get Medical Top up Cover</returns>
        MasterListSource GetMedicalTopupCover(MasterList getcandidateID);

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "UpdateELMStatus", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Update ELM Status
        /// </summary>
        /// <param name="elmLIST">ELM LIST</param>   
        void UpdateELMStatus(ELMStatusList elmLIST);

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "FetchCandidateId", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch Candidate Detail
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>   
        /// <returns>Fetch Candidate Detail</returns>
        CandidateDetailList FetchCandidateId(CandidateDetail candidateDetail);

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), OperationContract(Name = "FetchStateTaxFormList", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch Candidate Detail
        /// </summary>  
        /// <returns>Fetch Candidate Detail</returns>
        CandidateDetailList FetchStateTaxFormList(CandidateDetail candidateDetail);

        [OperationContract(Name = "SaveSurveyData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Save Survey Data
        /// </summary>
        /// <param name="saveSurveydata">save Survey data</param>   
        /// <returns>Save Survey Data</returns>
        int SaveSurveyData(SaveTaskDC saveSurveydata);

        [OperationContract(Name = "FetchFileUploadData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Fetch File Upload Data
        /// </summary>
        /// <param name="uploadData">upload Data</param>   
        /// <returns>Fetch File Upload Data</returns>
        FileUploadDC FetchFileUploadData(FileUploadDC uploadData);

        [OperationContract(Name = "UpdateStatus", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Update Status
        /// </summary>
        /// <param name="objDocumentDetail">Document Detail</param>   
        /// <returns>Update Status</returns>
        int UpdateStatus(VirtualDocumentDC objDocumentDetail);

        #region BGV Service Methods

        [OperationContract(Name = "ValidateCisContent", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Validate CIS Content
        /// </summary>
        /// <param name="objCis">CIS Content</param>   
        /// <returns>Validate CIS Content</returns>
        SaveCisDC ValidateCisContent(SaveCisDC objCis);

        [OperationContract(Name = "SaveCandidateComponentData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Save Candidate Component Data
        /// </summary>
        /// <param name="objCandidateData">Candidate Data</param>   
        /// <returns>Save Candidate Component Data</returns>
        SaveCisDC SaveCandidateComponentData(SaveCisDC objCandidateData);

        [OperationContract(Name = "ValidateComponentData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Validate Component Data
        /// </summary>
        /// <param name="objComponentData">Component Data</param>   
        /// <returns>Validate Component Data</returns>
        SaveCisDC ValidateComponentData(SaveCisDC objComponentData);

        [OperationContract(Name = "SaveCisData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Save CIS Data
        /// </summary>
        /// <param name="saveCisdata">save CIS data</param>   
        /// <returns>Save CIS Data</returns>
        int SaveCisData(SaveCisDC saveCisdata);

        [OperationContract(Name = "GetNHDashboardBgvStatus", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Get NH Dashboard BGV Status
        /// </summary>
        /// <param name="objNHDashboardData">NH Dashboard Data</param>   
        /// <returns>Get NH Dashboard BGV Status</returns>
        BgvNHDashboardData GetNHDashboardBgvStatus(BgvNHDashboardData objNHDashboardData);

        [OperationContract(Name = "SaveBpNoGo", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Save Back Paper
        /// </summary>
        /// <param name="saveBpNoGo">save Back Paper</param>   
        /// <returns>Save Back Paper</returns>
        int SaveBpNoGo(SaveCisDC saveBpNoGo);

        [OperationContract(Name = "PendingBackPaperCount", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To Pending Back Paper Count
        /// </summary>
        /// <param name="saveBpNoGo">save Back Paper</param>   
        /// <returns>Pending Back Paper Count</returns>
        int PendingBackPaperCount(SaveCisDC saveBpNoGo);

        #endregion

        #region RLA
        [OperationContract(Name = "saveFeedback", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]

        /// <summary>
        /// 369041: To save Feedback
        /// </summary>
        /// <param name="saveFeedback">save Feedback RLA</param>   
        /// <returns>save Feedback</returns>
        int SaveFeedback(SaveRLAFeedbackDC saveFeedback);
        #endregion
    }
}

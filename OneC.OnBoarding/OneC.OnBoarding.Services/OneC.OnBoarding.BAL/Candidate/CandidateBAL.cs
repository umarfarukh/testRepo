//// <copyright file="CandidateBAL.cs" company="CognizantTechnologySolutions">
////Copyright (c) CognizantTechnologySolutions. All rights reserved.
//// </copyright>

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.BAL         
 * Class Name       : NewHireBAL.cs
 * Version          : 1.0
 * Type             : Business Access Class
 * Purpose          : Methods Related to New Hire
 * Created date     : 2011-Jan-05
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

namespace OneC.OnBoarding.BAL.Candidate
{
    #region #Namespaces
    using System;
    using System.Collections.ObjectModel;
    using System.Data;
    using System.Linq;
    using System.Text;
    using OneC.OnBoarding.DAL.Candidate;
    using OneC.OnBoarding.DC.CandidateDC;
    using OneC.OnBoarding.DC.DashBoardDC;
    using OneC.OnBoarding.DC.UtilityDC;
    #endregion #Namespaces
    /// <summary>
    /// Candidate BAL
    /// </summary>
    public class CandidateBAL
    {
        #region Candidate Methods
        /// <summary>
        /// Method to Fetch Candidate Details
        /// </summary>
        /// <param name="sessionDetail">session Detail</param>
        /// <returns>candidate detail</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList FetchCandidateTracking(SessionDetails sessionDetail)
        {
            CandidateDAL objNHDAL = new CandidateDAL();
            CandidateDetailList retCand = new CandidateDetailList();
            retCand = objNHDAL.FetchCandidateTracking(sessionDetail);
            return retCand;
        }

        /// <summary>
        /// 208099: Method to Fetch Tasks
        /// </summary>
        /// <param name="candidateDetail">Candidate detail</param>
        /// <returns>candidate Task</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public TaskDetailsList FetchTaskList(CandidateDetail candidateDetail)
        {
            CandidateDAL objNHDAL = new CandidateDAL();
            TaskDetailsList retTask = new TaskDetailsList();
            retTask = objNHDAL.FetchTaskList(candidateDetail);
            return retTask;
        }

        /// <summary>
        /// Method to Education Details
        /// </summary>
        /// <param name="stateMaster">to save state master</param>
        /// <returns>saved data</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public EducationMasterList FetchEducationMaster(State stateMaster)
        {
            CandidateDAL objNHDAL = new CandidateDAL();
            //// List<object> sublist = new List<object>();
            EducationMasterList eduSublist = new EducationMasterList();
            eduSublist = objNHDAL.FetchEducationMaster(stateMaster);
            return eduSublist;
        }

        /// <summary>
        /// 312511: Method to Fetch Candidate Type
        /// </summary>
        /// <returns>candidate data</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateTypeList FetchCandidateType()
        {
            CandidateDAL objCandidateDAL = new CandidateDAL();
            return objCandidateDAL.FetchCandidateType();
        }

        /// <summary>
        /// 312511: Method to Fetch Candidate Type
        /// </summary>
        /// <param name="parentId">to save candidate type</param>
        /// <returns>saved candidate type</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateTypeList FetchCandidateHireType(CandidateTypeDC parentId)
        {
            CandidateDAL objCandidateDAL = new CandidateDAL();
            return objCandidateDAL.FetchCandidateHireType(parentId);
        }

        /// <summary>
        /// 207953 : Method to Fetch Master Data 
        /// </summary>
        /// <param name="parentCode">parent Code</param>
        /// <returns>master data</returns>
        public MasterListSource FetchMasterData(MasterList parentCode)
        {
            CandidateDAL objMasterDAL = new CandidateDAL();
            return objMasterDAL.FetchMasterData(parentCode);
        }

        /// <summary>
        /// 207953 : Method to Save task data
        /// </summary>
        /// <param name="saveData">to save data</param>
        /// <returns>saved data</returns>
        public int SaveTaskData(SaveTaskDC saveData)
        {
            CandidateDAL objSaveDataDAL = new CandidateDAL();
            return objSaveDataDAL.SaveTaskData(saveData);
        }

        /// <summary>
        /// 207953 : Method to get all the saved and prefilled values 
        /// </summary>
        /// <param name="prefillvalues">to save prefill values</param>
        /// <returns>saved data</returns>
        public SaveTaskDC GetPrefillValues(SaveTaskDC prefillvalues)
        {
            CandidateDAL objPrefillDAL = new CandidateDAL();
            return objPrefillDAL.GetPrefillValues(prefillvalues);
        }

        /// <summary>
        /// 207953 : Method to validate authentication key for signing the form
        /// </summary>
        /// <param name="getSignKey">to get sign key</param>
        /// <returns>signed key</returns>
        public int ValidateAuthenticationKey(SaveTaskDC getSignKey)
        {
            CandidateDAL objSignkey = new CandidateDAL();
            return objSignkey.ValidateAuthenticationKey(getSignKey);
        }

        /// <summary>
        /// 207953 : Method to fetch  HTML for the PDF generation
        /// </summary>
        /// <param name="getParams">to get parameters</param>
        /// <returns>saved data</returns>
        public SaveTaskDC GetHtmlContentToGeneratePDF(SaveTaskDC getParams)
        {
            CandidateDAL objHTML = new CandidateDAL();
            return objHTML.GetHtmlContentToGeneratePDF(getParams);
        }

        /// <summary>
        /// 207953 : Method to validate personal details form
        /// </summary>
        /// <param name="param">to save data</param>
        /// <returns>saved data</returns>
        public SaveTaskDC ValidateTaskContent(SaveTaskDC param)
        {
            CandidateDAL objValid = new CandidateDAL();
            return objValid.ValidateTaskContent(param);
        }

        /// <summary>
        /// 207953 : Method to fetch the country list
        /// </summary>
        /// <param name="country">To get country</param>
        /// <returns>saved country</returns>
        public CountryListSource GetGeographyMaster(Country country)
        {
            CandidateDAL objGeo = new CandidateDAL();
            return objGeo.GetGeographyMaster(country);
        }

        /// <summary>
        /// 207953 : Method to reset the authentication key
        /// </summary>
        /// <param name="resetKey">to get reset key</param>
        public void ResetAuthenticationKey(SaveTaskDC resetKey)
        {
            CandidateDAL objKey = new CandidateDAL();
            objKey.ResetAuthenticationKey(resetKey);
        }

        /// <summary>
        /// 261890 : Method to Save Meeting ID
        /// </summary>
        /// <param name="meetingDetail">to save data</param>
        public void SaveMeetingID(SaveMeetingID meetingDetail)
        {
            CandidateDAL meetingdet = new CandidateDAL();
            meetingdet.SaveMeetingID(meetingDetail);
        }

        /// <summary>
        /// 208099: Method to Fetch FAQ
        /// </summary>
        /// <param name="faqSearch">to search FAQ</param>
        /// <returns>saved data</returns>
        public string FetchFAQ(FaqSearch faqSearch)
        {
            CandidateDAL objNHDAL = new CandidateDAL();
            //// FaqMasterList retFAQ = new FaqMasterList();
            string str = objNHDAL.FetchFAQ(faqSearch);
            return str;
        }

        /// <summary>
        /// 208099: Method to Fetch Training Master
        /// </summary>
        /// <param name="objTraining">to save data</param>
        /// <returns>saved data</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public TrainingList FetchTrainingMaster(NewHireTrainingDC objTraining)
        {
            CandidateDAL objNHDAL = new CandidateDAL();
            return objNHDAL.FetchTrainingMaster(objTraining);
        }

        /// <summary>
        /// 208099: Method to Fetch Training Status
        /// </summary>
        /// <returns>training status</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public TrainingList FetchTrainingStatus()
        {
            CandidateDAL objNHDAL = new CandidateDAL();
            return objNHDAL.FetchTrainingStatus();
        }

        /// <summary>
        /// 208099: Method to Fetch Training Status
        /// </summary>
        /// <param name="objDc">object from data contract</param>
        /// <param name="totalCount">total count</param>
        /// <returns>saved data</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public TrainingList FetchTraningData(NewHireTrainingDC objDc, TotalCountDC totalCount)
        {
            CandidateDAL objNHDAL = new CandidateDAL();
            return objNHDAL.FetchTraningData(objDc, totalCount);
        }

        /// <summary>
        /// 208099: Method to Update Training Data
        /// </summary>
        /// <param name="objTrainingList">Training List</param>
        /// <returns>saved list</returns>
        public int UpdateNHOTrainingData(NewHireTrainingDC objTrainingList)
        {
            CandidateDAL objTrainingDataDAL = new CandidateDAL();
            return objTrainingDataDAL.UpdateNHOTrainingData(objTrainingList);
        }

        /// <summary>
        /// 208099: Method to Update Training Data
        /// </summary>
        /// <param name="objTrainingList">to save data</param>
        /// <returns>saved data</returns>
        public int UpdateTrainingDate(NewHireTrainingDC objTrainingList)
        {
            CandidateDAL objTrainingDataDAL = new CandidateDAL();
            return objTrainingDataDAL.UpdateTrainingDate(objTrainingList);
        }

        /// <summary>
        /// 208099: Method to Fetch DrillDown Training Data
        /// </summary>
        /// <param name="objDc">to save data</param>
        /// <returns>saved data</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateTrainingList FetchTrainingDrillDownData(CandidateTrainingDC objDc)
        {
            CandidateDAL objNHDAL = new CandidateDAL();
            return objNHDAL.FetchTrainingDrillDownData(objDc);
        }

        /// <summary>
        /// 208099: Method to Fetch Training Dates
        /// </summary>
        /// <param name="candidateDetail">to save candidate data</param>
        /// <returns>saved data</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateTrainingList FetchTrainingDates(CandidateDetail candidateDetail)
        {
            CandidateDAL objNHDAL = new CandidateDAL();
            return objNHDAL.FetchTrainingDates(candidateDetail);
        }

        /// <summary>
        /// 208099: Method to Fetch Training Details
        /// </summary>
        /// <param name="objTrainingDC">to save data</param>
        /// <returns>saved data</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public TrainingList FetchTrainingDetails(NewHireTrainingDC objTrainingDC)
        {
            CandidateDAL objNHDAL = new CandidateDAL();
            return objNHDAL.FetchTrainingDetails(objTrainingDC);
        }

        /// <summary>
        /// 208099: Method to Populate Training Details
        /// </summary>
        /// <param name="candidateDetail">to save data</param>
        /// <returns>saved data</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public TrainingList PopulateCanddidateTrainingDetails(CandidateDetail candidateDetail)
        {
            CandidateDAL objNHDAL = new CandidateDAL();
            return objNHDAL.PopulateCanddidateTrainingDetails(candidateDetail);
        }

        /// <summary>
        /// 207953 : Method to Save task data
        /// </summary>
        /// <param name="candidateDetail">to save data</param>
        /// <returns>saved data</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public TrainingList RegisterCancelTrainingDetails(CandidateTrainingDC candidateDetail)
        {
            CandidateDAL objSaveDataDAL = new CandidateDAL();
            return objSaveDataDAL.RegisterCancelTrainingDetails(candidateDetail);
        }

        /// <summary>
        /// 261890 : Method to Send Induction Diary Invites
        /// </summary>
        /// <param name="candidateDetail">to save data</param>
        /// <returns>saved data</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public TrainingList SendInductionDiaryInvites(CandidateTrainingDC candidateDetail)
        {
            CandidateDAL objDal = new CandidateDAL();
            TrainingList returnTrainingList = new TrainingList();
            returnTrainingList = objDal.SendInductionDiaryInvites(candidateDetail);
            return returnTrainingList;
        }

        /// <summary>
        /// 207953 : Method to Save task data
        /// </summary>
        /// <param name="candidateDetail">to save data</param>
        /// <returns>saved data</returns>
        public int UpdateCandidateTrainingDate(CandidateTrainingDC candidateDetail)
        {
            CandidateDAL objSaveDataDAL = new CandidateDAL();
            return objSaveDataDAL.UpdateCandidateTrainingDate(candidateDetail);
        }
        #endregion NewHire Methods

        /// <summary>
        /// 207953 : Method to get Employers Data
        /// </summary>
        /// <param name="getEmployerdata">to save data</param>
        /// <returns>saved data</returns>
        public SaveTaskDC GetEmployersDetails(SaveTaskDC getEmployerdata)
        {
            CandidateDAL objDal = new CandidateDAL();
            return objDal.GetEmployersDetails(getEmployerdata);
        }

        /// <summary>
        /// 207953 : Method to get medical  top up
        /// </summary>
        /// <param name="getcandidateID">to save data</param>
        /// <returns>saved data</returns>
        public MasterListSource GetMedicalTopupCover(MasterList getcandidateID)
        {
            CandidateDAL objMedMaster = new CandidateDAL();
            return objMedMaster.GetMedicalTopupCover(getcandidateID);
        }

        /// <summary>
        /// 195514: Method to Update ELM Status
        /// </summary>
        /// <param name="elmLIST">to save data</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public void UpdateELMStatus(ELMStatusList elmLIST)
        {
            CandidateDAL objELMDataDAL = new CandidateDAL();
            objELMDataDAL.UpdateELMStatus(elmLIST);
        }

        /// <summary>
        /// 267083: Method to get CandidateId
        /// </summary>
        /// <param name="candidateDetail">to save data</param>
        /// <returns>saved data</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList FetchCandidateId(CandidateDetail candidateDetail)
        {
            CandidateDAL objNHDAL = new CandidateDAL();
            CandidateDetailList retCand = new CandidateDetailList();
            retCand = objNHDAL.FetchCandidateId(candidateDetail);
            return retCand;
        }

        /// <summary>
        /// /// 267083: Method to get State tax form list
        /// </summary>
        /// <returns>saved data</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList FetchStateTaxFormList(CandidateDetail candidateDetail)
        {
            CandidateDAL objNHDAL = new CandidateDAL();
            CandidateDetailList retCand = new CandidateDetailList();
            retCand = objNHDAL.FetchStateTaxFormList(candidateDetail);
            return retCand;
        }

        /// <summary>
        /// 298589: Method to save Survey
        /// </summary>
        /// <param name="saveSurveyData">to save survey data</param>
        /// <returns>saved survey data</returns>
        public int SaveSurveyData(SaveTaskDC saveSurveyData)
        {
            CandidateDAL objSaveDataDAL = new CandidateDAL();
            return objSaveDataDAL.SaveSurveyData(saveSurveyData);
        }

        /// <summary>
        /// 267083: Method to get upload data
        /// </summary>
        /// <param name="uploadData">to upload data</param>
        /// <returns>uploaded data</returns>
        public FileUploadDC FetchFileUploadData(FileUploadDC uploadData)
        {
            return (new CandidateDAL()).FetchFileUploadData(uploadData);
        }

        /// <summary>
        /// Method to get DocumentDetail
        /// </summary>
        /// <param name="objDocumentDetail">to save data</param>
        /// <returns>Document Detail</returns>
        public int UpdateStatus(VirtualDocumentDC objDocumentDetail)
        {
            return (new CandidateDAL()).UpdateStatus(objDocumentDetail);
        }

        #region BGV Business Methods
        /// <summary>
        /// 249510 : Method to validate  details form
        /// </summary>
        /// <param name="param">to validate data</param>
        /// <returns>validated data</returns>
        public SaveCisDC ValidateCisContent(SaveCisDC param)
        {
            return (new CandidateDAL()).ValidateCisContent(param);
        }

        /// <summary>
        /// 260947 : Method to Get Component details available for a candidate
        /// </summary>
        /// <param name="candidateData"> to save data</param>
        /// <returns>saved data</returns>
        public SaveCisDC SaveCandidateComponentData(SaveCisDC candidateData)
        {
            return (new CandidateDAL()).SaveCandidateComponentData(candidateData);
        }

        /// <summary>
        /// 249510 : Method to validate  component data
        /// </summary>
        /// <param name="param">to save data</param>
        /// <returns>saved data</returns>
        public SaveCisDC ValidateComponentData(SaveCisDC param)
        {
            return (new CandidateDAL()).ValidateComponentData(param);
        }

        /// <summary>
        /// 249510 : Method to Save CIS data
        /// </summary>
        /// <param name="saveCisData">to save data</param>
        /// <returns>saved data</returns>
        public int SaveCisData(SaveCisDC saveCisData)
        {
            return (new CandidateDAL()).SaveCisData(saveCisData);
        }

        /// <summary>
        /// 260947:Method to get  Status for the Candidate
        /// </summary>
        /// <param name="objNHDashboardData">data to save</param>
        /// <returns>saved data</returns>
        public BgvNHDashboardData GetNHDashboardBgvStatus(BgvNHDashboardData objNHDashboardData)
        {
            return (new CandidateDAL()).GetNHDashboardBgvStatus(objNHDashboardData);
        }

        /// <summary>
        /// 249510 : BPNOGO
        /// </summary>
        /// <param name="saveBpNoGo">to save data</param>
        /// <returns>saved data</returns>
        public int SaveBpNoGo(SaveCisDC saveBpNoGo)
        {
            return (new CandidateDAL()).SaveBpNoGo(saveBpNoGo);
        }

        /// <summary>
        /// 249510 : BPNOGO Pending back paper count
        /// </summary>
        /// <param name="pendingBackpaperCount">paper data</param>
        /// <returns>pending Paper count</returns>
        public int PendingBackPaperCount(SaveCisDC pendingBackpaperCount)
        {
            return (new CandidateDAL()).PendingBackPaperCount(pendingBackpaperCount);
        }

        #endregion
        #region RLA
        /// <summary>
        /// To return the Feed Back
        /// </summary>
        /// <param name="saveFeedback">Type of FeedBack</param>
        /// <returns>Feedback flag</returns>
        public int SaveFeedback(SaveRLAFeedbackDC saveFeedback)
        {
            return (new CandidateDAL()).SaveFeedback(saveFeedback);
        }
        #endregion
    }
}

//-----------------------------------------------------------------------=
// <copyright file="CandidateServices.cs" company="Cognizant Technology Solutions">
// Copyright  . All Rights Reserved.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.Services.ServiceBase
 * Class Name       : CandidateServices
 * Version          : 1.0
 * Type             : Class
 * Purpose          : Method references of BAL service methods
 * Created date     : 2012-Jan-20
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
    using System.Collections.ObjectModel;
    using System.Linq;
    using System.ServiceModel;
    using System.Web;
    using OneC.OnBoarding.BAL.Candidate;
    using OneC.OnBoarding.DC.CandidateDC;
    using OneC.OnBoarding.DC.DashBoardDC;
    using OneC.OnBoarding.DC.UtilityDC;
    using OneC.OnBoarding.Services.ServiceContract;
    #endregion

    /// <summary>
    /// 260947: Class which holds all the candidate related service method mapping to BAL
    /// </summary>
    public sealed class CandidateServices : ICandidateServices, IDisposable
    {
        /// <summary>
        /// 369041: Method to Dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// 208099: Method to Track Candidate Detail
        /// </summary>
        /// <param name="sessionDetail">session Detail</param>
        /// <returns>Candidate Detail List</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList FetchCandidateTracking(SessionDetails sessionDetail)
        {
            CandidateDetailList retCand = new CandidateDetailList();

            try
            {
                CandidateBAL objNHBAL = new CandidateBAL();
                retCand = objNHBAL.FetchCandidateTracking(sessionDetail);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            return retCand;
        }

        /// <summary>
        /// 208099: Method to Fetch Tasks 
        /// </summary>
        /// <param name="candidateDetail">Candidate detail</param>
        /// <returns>Task details</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public TaskDetailsList FetchTaskList(CandidateDetail candidateDetail)
        {
            TaskDetailsList retTask = new TaskDetailsList();

            try
            {
                CandidateBAL objNHBAL = new CandidateBAL();
                retTask = objNHBAL.FetchTaskList(candidateDetail);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            return retTask;
        }

        /// <summary>
        /// 312511: 369041: Method to Fetch Candidate Type
        /// </summary>
        /// <returns>Candidate Type</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateTypeList FetchCandidateType()
        {
            CandidateTypeList retCandidateType = new CandidateTypeList();
            try
            {
                CandidateBAL objCandidateBAL = new CandidateBAL();
                retCandidateType = objCandidateBAL.FetchCandidateType();
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            return retCandidateType;
        }

        /// <summary>
        /// 261890: Method to Fetch Candidate Hire Type for UK
        /// </summary>
        /// <param name="parentId">Parent ID to fetch the Candidate Hire Type</param>
        /// <returns>Candidate type</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateTypeList FetchCandidateHireType(CandidateTypeDC parentId)
        {
            CandidateTypeList retCandidateType = new CandidateTypeList();
            try
            {
                CandidateBAL objCandidateBAL = new CandidateBAL();
                retCandidateType = objCandidateBAL.FetchCandidateHireType(parentId);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            return retCandidateType;
        }

        /// <summary>
        /// 207953 :369041: Method to Fetch Master Data
        /// </summary>
        /// <param name="parentCode">Parent Code</param>
        /// <returns>Master Data</returns>
        public MasterListSource FetchMasterData(MasterList parentCode)
        {
            MasterListSource retMasterData = new MasterListSource();
            try
            {
                CandidateBAL objMasterDataBAL = new CandidateBAL();
                retMasterData = objMasterDataBAL.FetchMasterData(parentCode);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            return retMasterData;
        }

        /// <summary>
        /// 207953 : Method to Save task data
        /// </summary>
        /// <param name="saveTaskdata">save Task data</param>
        /// <returns>Status of the Task</returns>
        public int SaveTaskData(SaveTaskDC saveTaskdata)
        {
            int retStatus = 0;
            try
            {
                CandidateBAL objSaveDataBAL = new CandidateBAL();
                retStatus = objSaveDataBAL.SaveTaskData(saveTaskdata);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            return retStatus;
        }

        /// <summary>
        /// 369041 : Method to get all the saved and prefilled values 
        /// </summary>
        /// <param name="prefillvalues">To get the prefill values</param>
        /// <returns>Prefill Values</returns>
        public SaveTaskDC GetPrefillValues(SaveTaskDC prefillvalues)
        {
            try
            {
                CandidateBAL objprefillBAL = new CandidateBAL();
                return objprefillBAL.GetPrefillValues(prefillvalues);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 207953 : Method to validate authentication key for signing the form
        /// </summary>
        /// <param name="getSignKey">Sign Key used for Validating the Authentication Key</param>
        /// <returns>Status of Validation of authentication Key</returns>
        public int ValidateAuthenticationKey(SaveTaskDC getSignKey)
        {
            int retStatus = 0;
            try
            {
                CandidateBAL objSignkey = new CandidateBAL();
                retStatus = objSignkey.ValidateAuthenticationKey(getSignKey);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            return retStatus;
        }

        /// <summary>
        /// 207953 : Method to get Html Content To Generate PDF
        /// </summary>
        /// <param name="getParams">Get the parameters</param>
        /// <returns>Parameters to get HTML Content</returns>
        public SaveTaskDC GetHtmlContentToGeneratePDF(SaveTaskDC getParams)
        {
            CandidateBAL objHTML = new CandidateBAL();
            return objHTML.GetHtmlContentToGeneratePDF(getParams);
        }

        /// <summary>
        /// 369041 : Method to validate the Task content
        /// </summary>
        /// <param name="param">Parameters to validate the Task content</param>
        /// <returns>Parameters to validate task content </returns>
        public SaveTaskDC ValidateTaskContent(SaveTaskDC param)
        {
            CandidateBAL objValid = new CandidateBAL();
            return objValid.ValidateTaskContent(param);
        }

        /// <summary>
        /// 207953 : Method to fetch the country list
        /// </summary>
        /// <param name="country">Country object</param>
        /// <returns>Country List</returns>
        public CountryListSource GetGeographyMaster(Country country)
        {
            CandidateBAL objGeo = new CandidateBAL();
            return objGeo.GetGeographyMaster(country);
        }

        /// <summary>
        /// 207953 : Method to reset the authentication key
        /// </summary>
        /// <param name="resetKey">reset Authentication Key</param>
        public void ResetAuthenticationKey(SaveTaskDC resetKey)
        {
            CandidateBAL objKey = new CandidateBAL();
            objKey.ResetAuthenticationKey(resetKey);
        }

        /// <summary>
        /// 208099:369041: Method to Fetch FAQ
        /// </summary>
        /// <param name="faqSearch">FAQ Search</param>
        /// <returns>String FAQ</returns>
        public string FetchFAQ(FaqSearch faqSearch)
        {
            // FaqData retObj = new FaqData(); --unused object,FxCop code analysis , 397785
            // FaqMasterList retFAQ = new FaqMasterList();  --unused object,FxCop code analysis , 397785
            string str = string.Empty;
            try
            {
                CandidateBAL objNHBAL = new CandidateBAL();
                str = objNHBAL.FetchFAQ(faqSearch);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            ////  retObj.FaqDetails = retFAQ;
            return str;
        }

        /// <summary>
        /// 208099:369041: Method to Fetch Training Master
        /// </summary>
        /// <param name="objTraining">New Hire Training Details</param>
        /// <returns>Training List</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public TrainingList FetchTrainingMaster(NewHireTrainingDC objTraining)
        {
            TrainingList retTrainList = new TrainingList();
            try
            {
                CandidateBAL objCandidateBAL = new CandidateBAL();
                retTrainList = objCandidateBAL.FetchTrainingMaster(objTraining);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            return retTrainList;
        }

        /// <summary>
        /// 208099: Method to Fetch Training Status
        /// </summary>
        /// <returns>Training List</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public TrainingList FetchTrainingStatus()
        {
            TrainingList retTrainList = new TrainingList();
            try
            {
                CandidateBAL objCandidateBAL = new CandidateBAL();
                retTrainList = objCandidateBAL.FetchTrainingStatus();
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            return retTrainList;
        }

        /// <summary>
        /// 208099: 369041: Method to Fetch Training Status
        /// </summary>
        /// <param name="objDc">New Hire Training Details</param>
        /// <param name="totalCount">total Count of the Candidates</param>
        /// <returns>Training List</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public TrainingList FetchTraningData(NewHireTrainingDC objDc, TotalCountDC totalCount)
        {
            TrainingList retTrainList = new TrainingList();
            try
            {
                CandidateBAL objCandidateBAL = new CandidateBAL();
                retTrainList = objCandidateBAL.FetchTraningData(objDc, totalCount);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            return retTrainList;
        }

        /// <summary>
        /// 369041: Method to Update Training Date
        /// </summary>
        /// <param name="objTrainingList">Training List</param>
        /// <returns>Update Training Date</returns>
        public int UpdateTrainingDate(NewHireTrainingDC objTrainingList)
        {
            int retStatus = 0;
            try
            {
                CandidateBAL objTrainingDataBAL = new CandidateBAL();
                retStatus = objTrainingDataBAL.UpdateTrainingDate(objTrainingList);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            return retStatus;
        }

        /// <summary>
        /// 208099: Method to Update NHO Training Data
        /// </summary>
        /// <param name="objTrainingList">Training List</param>
        /// <returns>Update NHO Training Date</returns>
        public int UpdateNHOTrainingData(NewHireTrainingDC objTrainingList)
        {
            int retStatus = 0;
            try
            {
                CandidateBAL objTrainingDataBAL = new CandidateBAL();
                retStatus = objTrainingDataBAL.UpdateNHOTrainingData(objTrainingList);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            return retStatus;
        }

        /// <summary>
        /// 208099: Method to Fetch DrillDown Training Data
        /// </summary>
        /// <param name="objDc">Candidate Training Details</param>
        /// <returns>Training List</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateTrainingList FetchTrainingDrillDownData(CandidateTrainingDC objDc)
        {
            CandidateTrainingList retTrainList = new CandidateTrainingList();
            try
            {
                CandidateBAL objCandidateBAL = new CandidateBAL();
                retTrainList = objCandidateBAL.FetchTrainingDrillDownData(objDc);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            return retTrainList;
        }

        /// <summary>
        /// 208099: Method to Fetch Training Date
        /// </summary>
        /// <param name="candidateDetail">Candidate Detail</param>
        /// <returns>Training List</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateTrainingList FetchTrainingDates(CandidateDetail candidateDetail)
        {
            CandidateTrainingList retTrainList = new CandidateTrainingList();
            try
            {
                CandidateBAL objCandidateBAL = new CandidateBAL();
                retTrainList = objCandidateBAL.FetchTrainingDates(candidateDetail);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            return retTrainList;
        }

        /// <summary>
        /// 208099: Method to Fetch Training Details
        /// </summary>
        /// <param name="objTrainingDC">New Hire Training Details</param>
        /// <returns>Training List</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public TrainingList FetchTrainingDetails(NewHireTrainingDC objTrainingDC)
        {
            TrainingList retTrainList = new TrainingList();
            try
            {
                CandidateBAL objCandidateBAL = new CandidateBAL();
                retTrainList = objCandidateBAL.FetchTrainingDetails(objTrainingDC);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            return retTrainList;
        }

        /// <summary>
        /// 208099: Method to Populate Training Details
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>
        /// <returns>Training List</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public TrainingList PopulateCandidateTrainingDetails(CandidateDetail candidateDetail)
        {
            TrainingList retTrainList = new TrainingList();
            try
            {
                CandidateBAL objCandidateBAL = new CandidateBAL();
                retTrainList = objCandidateBAL.PopulateCanddidateTrainingDetails(candidateDetail);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            return retTrainList;
        }

        /// <summary>
        /// 207953 : Method to Register Cancel Training Details
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>
        /// <returns>Register Cancel Training Details</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public TrainingList RegisterCancelTrainingDetails(CandidateTrainingDC candidateDetail)
        {
            TrainingList retTrainingList = new TrainingList();
            try
            {
                CandidateBAL objSaveDataBAL = new CandidateBAL();
                retTrainingList = objSaveDataBAL.RegisterCancelTrainingDetails(candidateDetail);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            return retTrainingList;
        }

        /// <summary>
        /// 369041 : Method to Send Induction Diary Invites
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>
        /// <returns>Send Induction Diary Invites</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public TrainingList SendInductionDiaryInvites(CandidateTrainingDC candidateDetail)
        {
            TrainingList retTrainingList = new TrainingList();
            try
            {
                CandidateBAL objInviteBAL = new CandidateBAL();
                retTrainingList = objInviteBAL.SendInductionDiaryInvites(candidateDetail);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            return retTrainingList;
        }

        /// <summary>
        /// 369041 : Method to Update Candidate Training Date
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>
        /// <returns>Return Status</returns>
        public int UpdateCandidateTrainingDate(CandidateTrainingDC candidateDetail)
        {
            int retStatus = 0;
            try
            {
                CandidateBAL objSaveDataBAL = new CandidateBAL();
                retStatus = objSaveDataBAL.UpdateCandidateTrainingDate(candidateDetail);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            return retStatus;
        }

        /// <summary>
        /// 207953 : Method to Get Employers Details
        /// </summary>
        /// <param name="getEmployerdata">Get Employer data</param>
        /// <returns>Employers Details</returns>
        public SaveTaskDC GetEmployersDetails(SaveTaskDC getEmployerdata)
        {
            CandidateBAL objBal = new CandidateBAL();
            return objBal.GetEmployersDetails(getEmployerdata);
        }

        /// <summary>
        /// 207953 : Method to get Medical Top up Cover
        /// </summary>
        /// <param name="getcandidateID">candidate ID</param>
        /// <returns>Master Data</returns>
        public MasterListSource GetMedicalTopupCover(MasterList getcandidateID)
        {
            MasterListSource retMasterData = new MasterListSource();
            try
            {
                CandidateBAL objMasterDataBAL = new CandidateBAL();
                retMasterData = objMasterDataBAL.GetMedicalTopupCover(getcandidateID);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            return retMasterData;
        }

        /// <summary>
        /// 195514: Method to Update ELM Status
        /// </summary>
        /// <param name="elmLIST">ELM LIST</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public void UpdateELMStatus(ELMStatusList elmLIST)
        {
            try
            {
                CandidateBAL objELMDataBAL = new CandidateBAL();
                objELMDataBAL.UpdateELMStatus(elmLIST);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 267083: Method to Track candidateID
        /// </summary>
        /// <param name="candidateDetail">Fetch Candidate Detail</param>
        /// <returns>Candidate Details List</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList FetchCandidateId(CandidateDetail candidateDetail)
        {
            CandidateDetailList retCand = new CandidateDetailList();

            try
            {
                CandidateBAL objNHBAL = new CandidateBAL();
                retCand = objNHBAL.FetchCandidateId(candidateDetail);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            return retCand;
        }

        /// <summary>
        /// 267083:369041: Method to get state tax form List
        /// </summary>
        /// <returns>Candidate Tax Forms List</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList FetchStateTaxFormList(CandidateDetail candidateDetail)
        {
            CandidateDetailList retCand = new CandidateDetailList();

            try
            {
                CandidateBAL objNHBAL = new CandidateBAL();
                retCand = objNHBAL.FetchStateTaxFormList(candidateDetail);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            return retCand;
        }

        /// <summary>
        /// 369041 : Method to Save Survey Data
        /// </summary>
        /// <param name="saveSurveydata">Save Survey Data</param>
        /// <returns>Status of the Survey</returns>
        public int SaveSurveyData(SaveTaskDC saveSurveydata)
        {
            int retStatus = 0;
            try
            {
                CandidateBAL objSaveDataBAL = new CandidateBAL();
                retStatus = objSaveDataBAL.SaveSurveyData(saveSurveydata);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            return retStatus;
        }

        /// <summary>
        /// 267083: Method to get File Upload data
        /// </summary>
        /// <param name="uploadData">Upload Data</param>
        /// <returns>Uploaded File</returns>
        public FileUploadDC FetchFileUploadData(FileUploadDC uploadData)
        {
            FileUploadDC retFile = new FileUploadDC();
            try
            {
                CandidateBAL objNHBAL = new CandidateBAL();
                retFile = objNHBAL.FetchFileUploadData(uploadData);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            return retFile;
        }

        /// <summary>
        /// 261890 : 369041: Method to Save Meeting ID
        /// </summary>
        /// <param name="meetingDetail">Meeting Details</param>
        public void SaveMeetingID(SaveMeetingID meetingDetail)
        {
            CandidateBAL meetingDet = new CandidateBAL();
            meetingDet.SaveMeetingID(meetingDetail);
        }

        /// <summary>
        /// 267083: Method to get File Upload data
        /// </summary>
        /// <param name="objDocumentDetail">Document Detail</param>
        /// <returns>Update Status</returns>
        public int UpdateStatus(VirtualDocumentDC objDocumentDetail)
        {
            int retUpdateStatus = 0;

            try
            {
                CandidateBAL objUpBAL = new CandidateBAL();
                retUpdateStatus = objUpBAL.UpdateStatus(objDocumentDetail);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }

            return retUpdateStatus;
        }
        #region BGV Service Methods

        /// <summary>
        /// Method to validate the CIS Content
        /// </summary>
        /// <param name="objCis">CIS details of type Save CIS</param>
        /// <returns>Save CIS DC Object</returns>
        public SaveCisDC ValidateCisContent(SaveCisDC objCis)
        {
            try
            {
                return (new CandidateBAL()).ValidateCisContent(objCis);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 260947 : Method to Save Candidate Component Data
        /// </summary>
        /// <param name="objCandidateData">Object of Candidate Data</param>
        /// <returns>Candidate Data</returns>
        public SaveCisDC SaveCandidateComponentData(SaveCisDC objCandidateData)
        {
            try
            {
                return (new CandidateBAL()).SaveCandidateComponentData(objCandidateData);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 207953 : 369041 : Method to validate CIS component data
        /// </summary>
        /// <param name="objComponentData">Component Data</param>
        /// <returns>Component Data after Validation</returns>
        public SaveCisDC ValidateComponentData(SaveCisDC objComponentData)
        {
            try
            {
                return (new CandidateBAL()).ValidateComponentData(objComponentData);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 249510 : 369041: Method to Save CIS data
        /// </summary>
        /// <param name="saveCisdata">Save CIS data</param>
        /// <returns>CIS data</returns>
        public int SaveCisData(SaveCisDC saveCisdata)
        {
            try
            {
                return (new CandidateBAL()).SaveCisData(saveCisdata);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 260947:Method to get BGV Status for the Candidate
        /// </summary>
        /// <param name="objNHDashboardData">NH Dashboard Data to get the BGV Status for the Candidate</param>
        /// <returns>NH Dashboard Data</returns>
        public BgvNHDashboardData GetNHDashboardBgvStatus(BgvNHDashboardData objNHDashboardData)
        {
            try
            {
                return (new CandidateBAL()).GetNHDashboardBgvStatus(objNHDashboardData);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 249510:369041: Method to Save the Back Paper Count
        /// </summary>
        /// <param name="saveBpNoGo">save BPNOGO</param>
        /// <returns>BPNOGO Back Paper Count</returns>
        public int SaveBpNoGo(SaveCisDC saveBpNoGo)
        {
            try
            {
                return (new CandidateBAL()).SaveBpNoGo(saveBpNoGo);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// 249510:369041: Method is used to get the pending Back Paper Count
        /// </summary>
        /// <param name="pendingBackpaperCount">Back Paper Count</param>
        /// <returns>Back paper Count Pending</returns>
        public int PendingBackPaperCount(SaveCisDC pendingBackpaperCount)
        {
            try
            {
                return (new CandidateBAL()).PendingBackPaperCount(pendingBackpaperCount);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        #endregion

        #region RLA
        /// <summary>
        /// 249510 :369041 : Method to Save CIS data
        /// </summary>
        /// <param name="saveFeedback">It is used to save the RLA Feed back</param>
        /// <returns>Feed Back</returns>
        public int SaveFeedback(SaveRLAFeedbackDC saveFeedback)
        {
            try
            {
                return (new CandidateBAL()).SaveFeedback(saveFeedback); ////Style cop 312020 
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

//// <copyright file="CandidateDAL.cs" company="CognizantTechnologySolutions">
////Copyright (c) CognizantTechnologySolutions. All rights reserved.
//// </copyright>
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DAL.Candidate      
 * Class Name       : NewHireDAL.cs
 * Version          : 1.0
 * Type             : Class
 * Purpose          : Methods Related to Candidate
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

namespace OneC.OnBoarding.DAL.Candidate
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Data;
    using System.Data.SqlClient;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Xml.Serialization;
    using OneC.OnBoarding.DC.CandidateDC;
    using OneC.OnBoarding.DC.DashBoardDC;
    using OneC.OnBoarding.DC.UtilityDC;
    #endregion Namespaces
    /// <summary>
    /// Candidate data access layer
    /// </summary>
    public class CandidateDAL
    {
        #region Candidate DB Methods

        /// <summary>
        /// 260947: Method to create XML from object
        /// </summary>
        /// <param name="obj">object related to xml</param>
        /// <returns>formatted xml</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "0", Justification = "Reviewed."), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public static string ObjectSerializer(object obj)
        {
            string retStr = string.Empty;
            try
            {
                MemoryStream mem = new MemoryStream();
                System.Xml.Serialization.XmlSerializer xs = new XmlSerializer(obj.GetType());
                xs.Serialize(mem, obj);
                byte[] data = mem.GetBuffer();
                retStr = Encoding.UTF8.GetString(data, 0, data.Length).Replace("\0", string.Empty);

                mem.Dispose();
            }
            catch
            {
                retStr = string.Empty;
            }

            return retStr;
        }

        /// <summary>
        /// 208099: Method to Fetch Candidate Details
        /// </summary>
        /// <param name="sessionDetail">Session Detail</param>
        /// <returns>Candidate details regarding the session</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList FetchCandidateTracking(SessionDetails sessionDetail)
        {
            DataSet datsetCandidate;
            CandidateDetailList retCand = new CandidateDetailList();
            datsetCandidate = DBHelper.ExecuteDataset("usp_FetchCandidateTracking", sessionDetail);

            foreach (DataRow dr in datsetCandidate.Tables[0].Rows)
            {
                CandidateDetail objDCNH = new CandidateDetail();
                long icandidateId = 0;
                objDCNH.CandidateId = dr["CandidateID"] != DBNull.Value ? long.Parse(dr["CandidateID"].ToString()) : icandidateId;

                if (!string.IsNullOrEmpty(dr["CandidateType"].ToString()))
                {
                    objDCNH.CandidateType = Convert.ToInt16(dr["CandidateType"].ToString());
                }

                objDCNH.CandidateFName = dr["FName"].ToString();
                objDCNH.CandidateLName = dr["LName"].ToString();
                objDCNH.DesignationDesc = dr["Designation"].ToString();
                objDCNH.RedirectUrl = dr["RedirectURL"].ToString();
                objDCNH.CountryID = Convert.ToInt16(dr["CountryID"]);
                objDCNH.StateId = Convert.ToInt16(dr["StateID"]);
                objDCNH.CandidateEmailId = dr["EmailId"].ToString();
                objDCNH.CountryEmailID = dr["ToId"].ToString();
                objDCNH.AssociateId = dr["AssociateId"] != DBNull.Value ? int.Parse(dr["AssociateId"].ToString()) : 0;
                objDCNH.MigratedCandidate = Convert.ToInt16(dr["IsMigratedCandidate"]);
                objDCNH.DOJ = dr["DOJ"].ToString();
                objDCNH.IsSurveyAllowed = dr["IsSurveyAllowed"].ToString();
                objDCNH.SurveyUrl = dr["Surveyurl"].ToString();
                objDCNH.CGuideURL = dr["CGuideURL"].ToString();
                ////Commented the below section as we got errors...The value is directly assigned...
                ////if (dr["DOJ"] != DBNull.Value)
                ////{
                ////objDCNH.DOJ = String.Format("{0:dd-MM-yyyy}", dr["DOJ"]); 
                ////Convert.ToDateTime(dr["DOJ"]).ToShortDateString();
                ////}
                objDCNH.DojComparer = dr["DojComparer"].ToString();
                retCand.Add(objDCNH);
            }

            datsetCandidate.Dispose();

            return retCand;
        }

        /// <summary>
        /// 208099: Method to Fetch Tasks
        /// </summary>
        /// <param name="candidateDetail">candidate Detail</param>
        /// <returns>returns details regarding the task</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "0", Justification = "Reviewed."), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public TaskDetailsList FetchTaskList(CandidateDetail candidateDetail)
        {
            DataSet datsetTaskList;
            TaskDetailsList retTask = new TaskDetailsList();
            datsetTaskList = DBHelper.ExecuteDataset("usp_GetNHTaskList", candidateDetail);
            int cnt = 0;

            if (datsetTaskList != null && datsetTaskList.Tables[0].Rows.Count > 0)
            {
                if (datsetTaskList.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in datsetTaskList.Tables[0].Rows)
                    {
                        TaskDetail objDCTask = new TaskDetail();
                        objDCTask.TaskId = Convert.ToInt16(dr["TaskID"]);
                        objDCTask.Title = dr["Title"].ToString();
                        objDCTask.StatusMessage = dr["StatusMessage"].ToString();
                        objDCTask.TooltipText = dr["TooltipText"].ToString();
                        objDCTask.StatusImage = dr["DetailViewStatusImage"].ToString();
                        objDCTask.TileViewStatusImage = dr["TileViewStatusImage"].ToString();
                        objDCTask.Description = dr["Description"].ToString();
                        if (dr["DueCompletionDate"] != DBNull.Value)
                        {
                            objDCTask.DueCompletionDate = dr["DueCompletionDate"].ToString();
                        }

                        objDCTask.RequiredTime = dr["RequiredTime"].ToString();
                        objDCTask.ActionMessage = dr["ActionMessage"].ToString();
                        objDCTask.IsReminder = Convert.ToInt16(dr["IsReminder"]);
                        objDCTask.RelativeUrl = dr["RelativeUrl"].ToString();
                        objDCTask.IsResourceCenter = Convert.ToInt16(dr["IsResourceCenter"]);
                        objDCTask.PreviousTaskStatus = Convert.ToInt16(dr["PrevTaskStatus"]);
                        objDCTask.PreviousMandatoryTask_Ref = Convert.ToInt16(dr["PreviousMandatoryTask_Ref"]);
                        objDCTask.IsLinkEnable = Convert.ToInt16(dr["IsLinkEnable"]);
                        objDCTask.SampleFormUrl = dr["SampleFormUrl"].ToString();
                        objDCTask.IsQuerystringrequired = Convert.ToInt16(dr["IsQuerystringrequired"]);
                        objDCTask.IsOverlayrequired = Convert.ToInt16(dr["IsOverlayrequired"]);
                        objDCTask.IsExternalURL = Convert.ToInt16(dr["IsExternalURL"]);
                        objDCTask.ProcessID = candidateDetail.ProcessID;
                        if (dr["SurveyType"] != DBNull.Value)
                        {
                            objDCTask.SurveyType = Convert.ToInt16(dr["SurveyType"]);
                        }
                        ////if (candidateDetail.LoadCount == 1)
                        ////{
                        if (cnt == 0)
                        {
                            if (datsetTaskList.Tables[1].Rows.Count > 0)
                            {
                                objDCTask.NextTask = Convert.ToString(datsetTaskList.Tables[1].Rows[0]["Title"]);
                                objDCTask.TaskTotalCount = Convert.ToInt16(datsetTaskList.Tables[1].Rows[0]["TotalCount"]);
                                objDCTask.TaskPendingCount = Convert.ToInt16(datsetTaskList.Tables[1].Rows[0]["PendingCount"]);
                                objDCTask.TaskCompeltedCount = Convert.ToInt16(datsetTaskList.Tables[1].Rows[0]["CompletedCount"]);
                                objDCTask.DaysLeft = Convert.ToInt16(datsetTaskList.Tables[1].Rows[0]["DaysLeft"]);
                                if (datsetTaskList.Tables[1].Rows[0]["DaysLefPercentage"] != DBNull.Value)
                                {
                                    objDCTask.DaysLeftPercentage = Convert.ToInt32(datsetTaskList.Tables[1].Rows[0]["DaysLefPercentage"]);
                                }

                                objDCTask.TaskPercentage = (Convert.ToInt32(datsetTaskList.Tables[1].Rows[0]["CompletedCount"]) * 100) / Convert.ToInt32(datsetTaskList.Tables[1].Rows[0]["TotalCount"]);
                                objDCTask.PersonCount = Convert.ToInt16(datsetTaskList.Tables[1].Rows[0]["PersonCount"]);
                                objDCTask.PreJoiningCompletedFlag = Convert.ToInt32(datsetTaskList.Tables[1].Rows[0]["PreJoiningCompletedFlag"]);
                                objDCTask.PostJoiningCompletedFlag = Convert.ToInt32(datsetTaskList.Tables[1].Rows[0]["PostJoiningCompletedFlag"]);
                                objDCTask.NHPhoto = datsetTaskList.Tables[1].Rows[0]["NHPhoto"].ToString();
                                objDCTask.ProcessID = candidateDetail.ProcessID;
                                objDCTask.IsAssociateIdGenerated = Convert.ToInt32(datsetTaskList.Tables[1].Rows[0]["IsAssociateIdGenerated"]);
                                objDCTask.IsPostEnable = Convert.ToInt16(datsetTaskList.Tables[1].Rows[0]["IsPostEnabled"]);
                                objDCTask.FlashFile = Convert.ToString(datsetTaskList.Tables[1].Rows[0]["FlashFile"]);
                                if (datsetTaskList.Tables[1].Rows[0]["DefaultView"] != DBNull.Value)
                                {
                                    objDCTask.DefaultView = Convert.ToInt16(datsetTaskList.Tables[1].Rows[0]["DefaultView"]);
                                }

                                objDCTask.IsPreJoiningMsg = Convert.ToInt16(datsetTaskList.Tables[1].Rows[0]["IsPreJoiningCompletionMsgShow"]);
                                objDCTask.IsPreJoiningTabEnabled = Convert.ToInt32(datsetTaskList.Tables[1].Rows[0]["IsPreJoiningTabEnabled"]);
                                objDCTask.IsPostJoiningTabEnabled = Convert.ToInt32(datsetTaskList.Tables[1].Rows[0]["IsPostJoiningTabEnabled"]);
                                objDCTask.IsPhotoImageRequired = Convert.ToInt32(datsetTaskList.Tables[1].Rows[0]["IsPhotoImageRequired"]);
                                objDCTask.IsFaqRequired = Convert.ToInt32(datsetTaskList.Tables[1].Rows[0]["IsFaqRequired"]);
                                objDCTask.IsCGuideEnabled = Convert.ToInt32(datsetTaskList.Tables[1].Rows[0]["IsCGuideEnabled"]);
                                objDCTask.IsRelocationEnabled = Convert.ToInt32(datsetTaskList.Tables[1].Rows[0]["IsRelocationEnabled"]);

                                cnt++;
                            }
                        }

                        retTask.Add(objDCTask);
                    }
                }
            }

            return retTask;
        }

        /// <summary>
        /// 208099: Method to Fetch Education Masters
        /// </summary>
        /// <param name="stateMaster">Education master details</param>
        /// <returns>state list</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public EducationMasterList FetchEducationMaster(State stateMaster)
        {
            int itableNo = 0;
            DataSet datsetEducation;
            EducationList eduSublist = new EducationList();
            EducationMasterList eduList = new EducationMasterList();

            datsetEducation = DBHelper.ExecuteDataset("usp_FetchEducationMaster", stateMaster);
            if (datsetEducation.Tables.Count != 0)
            {
                ////foreach (DataTable dt in dsEducation.Tables)
                ////{
                foreach (DataRow dr in datsetEducation.Tables[itableNo].Rows)
                {
                    EducationMaster objDCcolMas = new EducationMaster();
                    objDCcolMas.CollegeCode = dr["Code"].ToString();
                    objDCcolMas.CollegeDescription = dr["Description"].ToString();
                    eduSublist.Add(objDCcolMas);
                }

                eduList.Add(eduSublist);
                itableNo++;
                //// }
            }

            datsetEducation.Dispose();
            return eduList;
        }

        /// <summary>
        /// 312511: Method to Fetch Candidate Type
        /// </summary>
        /// <returns>candidate type</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateTypeList FetchCandidateType()
        {
            DataSet datsetCandidateType;
            CandidateTypeList retCandType = new CandidateTypeList();
            datsetCandidateType = DBHelper.ExecuteDataset("usp_Fetch_CandidateType");
            foreach (DataRow dr in datsetCandidateType.Tables[0].Rows)
            {
                CandidateTypeDC objCandTypeDC = new CandidateTypeDC();
                objCandTypeDC.CandidateTypeCode = dr["Code"] != DBNull.Value ? int.Parse(dr["Code"].ToString()) : 0;
                objCandTypeDC.CandidateTypeDesc = dr["Description"].ToString();
                retCandType.Add(objCandTypeDC);
            }

            return retCandType;
        }

        /// <summary>
        /// 261890: Method to Fetch Candidate Hire Type
        /// </summary>
        /// <param name="parentId">parent Id</param>
        /// <returns>Candidate hire type</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateTypeList FetchCandidateHireType(CandidateTypeDC parentId)
        {
            DataSet datsetCandidateHireType;
            CandidateTypeList retCandType = new CandidateTypeList();
            datsetCandidateHireType = DBHelper.ExecuteDataset("usp_FetchMasters", parentId);
            foreach (DataRow dr in datsetCandidateHireType.Tables[0].Rows)
            {
                CandidateTypeDC objCandTypeDC = new CandidateTypeDC();
                objCandTypeDC.CandidateTypeCode = dr["Code"] != DBNull.Value ? int.Parse(dr["Code"].ToString()) : 0;
                objCandTypeDC.CandidateTypeDesc = dr["Description"].ToString();
                retCandType.Add(objCandTypeDC);
            }

            return retCandType;
        }

        /// <summary>
        /// 207953: Method to Fetch Master Data
        /// </summary>
        /// <param name="parentCode">Parent Code</param>
        /// <returns>master data</returns>
        public MasterListSource FetchMasterData(MasterList parentCode)
        {
            DataSet datsetMasterData;
            MasterListSource retMasterSrc = new MasterListSource();
            MasterListData retMasterData = new MasterListData();
            datsetMasterData = DBHelper.ExecuteDataset("usp_FetchMasters", parentCode);

            foreach (DataRow dr in datsetMasterData.Tables[0].Rows)
            {
                MasterList objMasterList = new MasterList();
                objMasterList.MasterCode = dr["CCodeID"].ToString();
                objMasterList.MasterDescription = dr["CDescription"].ToString();
                objMasterList.MasterUserValue = dr["UserValue1"].ToString();
                retMasterData.Add(objMasterList);
            }

            retMasterSrc.MasterData = retMasterData;
            return retMasterSrc;
        }

        /// <summary>
        /// 207953: Method to Save Task Data
        /// </summary>
        /// <param name="saveTaskdata">task data</param>
        /// <returns>status of save</returns>
        public int SaveTaskData(SaveTaskDC saveTaskdata)
        {
            return (int)DBHelper.ExecuteScalar("usp_SaveCandidateTaskData", saveTaskdata);
        }

        /// <summary>
        /// 207953: Method to Save Task Data
        /// </summary>
        /// <param name="getprefillvalues">To get prefill values</param>
        /// <returns>data related to prefill</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "0", Justification = "Reviewed.")]
        public SaveTaskDC GetPrefillValues(SaveTaskDC getprefillvalues)
        {
            DataSet datsetPrefillValues;
            //// StringWriter strw = new StringWriter();
            SaveTaskDC objPrefillDC = new SaveTaskDC();
            datsetPrefillValues = DBHelper.ExecuteDataset("usp_GetTaskPrefillValues", getprefillvalues);

            if (datsetPrefillValues != null)
            {
                datsetPrefillValues.DataSetName = "PrefillValues";

                ////Assign candidate related data to object
                if (datsetPrefillValues.Tables[0] != null)
                {
                    datsetPrefillValues.Tables[0].TableName = "CandidateData";

                    objPrefillDC.CandidateId = getprefillvalues.CandidateId;
                    objPrefillDC.CandidateName = datsetPrefillValues.Tables[0].Rows[0]["CandidateName"].ToString();
                    objPrefillDC.IsTaskAllowed = Convert.ToInt16(datsetPrefillValues.Tables[0].Rows[0]["IsTaskAllowed"]);
                    objPrefillDC.IsBgvInitiated = Convert.ToInt16(datsetPrefillValues.Tables[0].Rows[0]["IsBgvInitiated"]);
                    datsetPrefillValues.Tables.RemoveAt(0);
                }

                ////If task is allowed then setting other parameters
                if (objPrefillDC.IsTaskAllowed == 1)
                {
                    ////Assigning task design Xml to object
                    if (datsetPrefillValues.Tables[0] != null)
                    {
                        datsetPrefillValues.Tables[0].TableName = "TaskDesignXML";
                        objPrefillDC.TaskDesignXML = datsetPrefillValues.Tables[0].Rows[0]["TaskDesignXML"].ToString();
                        objPrefillDC.TaskRepeaterTemplates = datsetPrefillValues.Tables[0].Rows[0]["TaskRepeaterTemplates"].ToString();
                        datsetPrefillValues.Tables.RemoveAt(0);
                    }

                    ////Assign task data XML to object
                    if (datsetPrefillValues.Tables[0] != null)
                    {
                        datsetPrefillValues.Tables[0].TableName = "TaskDataXML";

                        ////Assigning task saved data Xml to object
                        objPrefillDC.TaskDataXML = datsetPrefillValues.Tables[0].Rows[0]["TaskDataXML"].ToString();

                        ////Assigning task signature Xml to object
                        objPrefillDC.TaskSignatureXML = datsetPrefillValues.Tables[0].Rows[0]["TaskSignatureXML"].ToString();
                        objPrefillDC.TaskStatus = Convert.ToInt16(datsetPrefillValues.Tables[0].Rows[0]["TaskStatus"]);
                        objPrefillDC.IsTaskSaved = Convert.ToInt16(datsetPrefillValues.Tables[0].Rows[0]["IsTaskSaved"]);
                        objPrefillDC.IsTaskSubmitted = Convert.ToInt16(datsetPrefillValues.Tables[0].Rows[0]["IsTaskSubmitted"]);
                        objPrefillDC.TaskTitle = datsetPrefillValues.Tables[0].Rows[0]["TaskTitle"].ToString();
                        objPrefillDC.LastViewPageIndex = Convert.ToInt16(datsetPrefillValues.Tables[0].Rows[0]["LastViewedPageIndex"]);
                        objPrefillDC.SignatureKey = datsetPrefillValues.Tables[0].Rows[0]["SignatureKey"].ToString();
                        objPrefillDC.IsResetRequired = Convert.ToInt16(datsetPrefillValues.Tables[0].Rows[0]["IsResetRequired"]);
                        objPrefillDC.IsSaveRequired = Convert.ToInt16(datsetPrefillValues.Tables[0].Rows[0]["IsSaveRequired"]);
                        objPrefillDC.IsSubmitRequired = Convert.ToInt16(datsetPrefillValues.Tables[0].Rows[0]["IsSubmitRequired"]);
                        objPrefillDC.IsTaskLocked = Convert.ToInt16(datsetPrefillValues.Tables[0].Rows[0]["IsTaskLocked"]);
                        objPrefillDC.SignEffectiveDate = datsetPrefillValues.Tables[0].Rows[0]["SignEffectiveDate"].ToString();

                        datsetPrefillValues.Tables.RemoveAt(0);
                    }

                    ////Assigning task prefilling data to object in XML format
                    if (datsetPrefillValues.Tables.Count > 0)
                    {
                        int tableCount = 0;
                        foreach (DataTable dt in datsetPrefillValues.Tables)
                        {
                            tableCount += 1;
                            dt.TableName = "Set" + tableCount.ToString();
                        }

                        objPrefillDC.TaskPrefillValues = datsetPrefillValues.GetXml().ToString();
                    }
                }
            }

            return objPrefillDC;
        }

        /// <summary>
        /// 207953 : Method to validate Authentication key
        /// </summary>
        /// <param name="getSignatureKey">Authentication key</param>
        /// <returns>status of Authentication</returns>
        public int ValidateAuthenticationKey(SaveTaskDC getSignatureKey)
        {
            int retSignkey = 0;
            DataSet datsetResult = DBHelper.ExecuteDataset("usp_ValidateAuthenticationKey", getSignatureKey);

            if (datsetResult != null)
            {
                if (datsetResult.Tables.Count > 0)
                {
                    retSignkey = Convert.ToInt32(datsetResult.Tables[0].Rows[0][0].ToString());
                }
            }

            datsetResult.Dispose();
            return retSignkey;
        }

        /// <summary>
        /// 207953 : Method to get HTML content for PDF generation
        /// </summary>
        /// <param name="getParams">parameters for PDF</param>
        /// <returns>html content</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public SaveTaskDC GetHtmlContentToGeneratePDF(SaveTaskDC getParams)
        {
            SaveTaskDC resultSet = new SaveTaskDC();

            DataSet outCome;

            outCome = DBHelper.ExecuteDataset("usp_GetPdfGenerationHTML", getParams);

            resultSet.strHTML = outCome.Tables[0].Rows[0][0].ToString();
            resultSet.pdfComp = Convert.ToInt32(outCome.Tables[1].Rows[0][0]);

            return resultSet;
        }

        /// <summary>
        /// 207953 : Method to validate personal details form for UK
        /// </summary>
        /// <param name="param">parameters of task</param>
        /// <returns>validation of task content</returns>
        public SaveTaskDC ValidateTaskContent(SaveTaskDC param)
        {
            //// SaveTaskDCData objValidData = new SaveTaskDCData();
            //// SaveTaskDCSource objValidsrc = new SaveTaskDCSource();
            SaveTaskDC objValidList = new SaveTaskDC();
            DataSet datsetValidation;
            datsetValidation = DBHelper.ExecuteDataset("usp_ValidateTaskData", param);
            datsetValidation.DataSetName = "ValidationSet";
            if (datsetValidation != null)
            {
                if (datsetValidation.Tables.Count > 0)
                {
                    objValidList.ValidationStatus = Convert.ToInt16(datsetValidation.Tables[0].Rows[0][0].ToString());
                    datsetValidation.Tables.RemoveAt(0);
                    if (datsetValidation.Tables[0].Rows.Count > 0)
                    {
                        datsetValidation.Tables[0].TableName = "ValidationError";
                    }

                    objValidList.ValidationMessage = datsetValidation.GetXml().ToString();
                }
            }

            return objValidList;
        }

        /// <summary>
        /// 207953 : Method to fetch the country list
        /// </summary>
        /// <param name="country">Country name</param>
        /// <returns>country list</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public CountryListSource GetGeographyMaster(Country country)
        {
            CountryListSource objsrc = new CountryListSource();
            DataSet datsetCountry = new DataSet();
            CountryList objCountryList = new CountryList();

            datsetCountry = DBHelper.ExecuteDataset("[usp_FetchGeographyMaster]", country);

            foreach (DataRow dr in datsetCountry.Tables[0].Rows)
            {
                Country objCountry = new Country();
                objCountry.CountryCode = dr["Code"].ToString();
                objCountry.CountryDescription = dr["Description"].ToString();
                objCountryList.Add(objCountry);
            }

            objsrc.CountryData = objCountryList;
            return objsrc;
        }

        /// <summary>
        /// 207953 : Method to reset the authentication key
        /// </summary>
        /// <param name="resetKey">reset authentication key</param>
        public void ResetAuthenticationKey(SaveTaskDC resetKey)
        {
            DBHelper.ExecuteNonQuery("usp_ResetAuthenticationKey", resetKey);
        }

        /// <summary>
        /// 261890 : Method to Save Meeting ID
        /// </summary>
        /// <param name="meetingDetail">Meeting Detail</param>
        public void SaveMeetingID(SaveMeetingID meetingDetail)
        {
            DBHelper.ExecuteNonQuery("usp_SaveMeetingID", meetingDetail);
        }

        /// <summary>
        ///  208099: Method to Fetch Tasks
        /// </summary>
        /// <param name="faqSearch">search Frequently Asked Questions</param>
        /// <returns>searched content</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public string FetchFAQ(FaqSearch faqSearch)
        {
            DataSet datsetFAQList;

            //// FaqList faqSubList = new FaqList();
            FaqMasterList objMasterList = new FaqMasterList();

            DataSet datsetFinal = new DataSet();
            int itableNo = 0;

            FaqData objFaqdata = new FaqData();
            objFaqdata.FaqDetails = new FaqList();
            objMasterList.FaqMasterData = new FaqDataList();
            Faq objFaq = new Faq();
            //// FaqList objfaqlist = new FaqList();
            datsetFAQList = DBHelper.ExecuteDataset("usp_FetchFAQ", faqSearch);
            foreach (DataRow drfAQID in datsetFAQList.Tables[1].Rows)
            {
                string faqid = drfAQID.ItemArray[0].ToString();
                DataTable dtfAQ = new DataTable();
                dtfAQ.Columns.Add("FAQMasterId", typeof(int));
                dtfAQ.Columns.Add("FAQMasterDesc", typeof(string));
                dtfAQ.Columns.Add("Question", typeof(string));
                dtfAQ.Columns.Add("Answer", typeof(string));

                DataRow[] rows = datsetFAQList.Tables[0].Select("FAQMasterId=" + faqid);

                foreach (DataRow dd in rows)
                {
                    dtfAQ.Rows.Add(dd.ItemArray);
                }

                datsetFinal.Tables.Add(dtfAQ);
            }

            ////    FaqDataList objFaqDataList = new FaqDataList();
            ////foreach (DataTable dt in dsFinal.Tables)
            ////{
            //// objFaqDataList = new FaqDataList();
            objFaqdata = new FaqData();
            objFaqdata.FaqDetails = new FaqList();
            foreach (DataRow dr in datsetFinal.Tables[itableNo].Rows)
            {
                objFaq = new Faq();
                objFaq.FaqQuestion = dr["Question"].ToString();
                objFaq.FaqAnswer = dr["Answer"].ToString();
                objFaqdata.FaqGroupName = dr["FAQMasterDesc"].ToString();
                objFaqdata.FaqDetails.Add(objFaq);
            }

            itableNo++;
            objMasterList.FaqMasterData.Add(objFaqdata);
            //// }

            string strFaq = ObjectSerializer(objMasterList);
            return strFaq;
        }

        /// <summary>
        /// 208099: Method to Fetch Training Type
        /// </summary>
        /// <param name="objTraining">object related to training</param>
        /// <returns>training type</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public TrainingList FetchTrainingMaster(NewHireTrainingDC objTraining)
        {
            DataSet datsetTrainingDate;
            TrainingList retTrainList = new TrainingList();

            datsetTrainingDate = DBHelper.ExecuteDataset("usp_FetchTrainingMaster", objTraining);
            foreach (DataRow dr in datsetTrainingDate.Tables[0].Rows)
            {
                NewHireTrainingDC objTrainingDC = new NewHireTrainingDC();
                objTrainingDC.TrainingId = dr["TrainingId"] != DBNull.Value ? int.Parse(dr["TrainingId"].ToString()) : 0;
                objTrainingDC.TrainingName = dr["TrainingScheduledDate"].ToString();
                retTrainList.Add(objTrainingDC);
            }

            return retTrainList;
        }

        /// <summary>
        /// 208099: Method to Fetch Training Type
        /// </summary>
        /// <returns>Training status</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public TrainingList FetchTrainingStatus()
        {
            DataSet datsetTrainingDate;
            TrainingList retTrainList = new TrainingList();

            datsetTrainingDate = DBHelper.ExecuteDataset("usp_FetchTrainingStatus");
            foreach (DataRow dr in datsetTrainingDate.Tables[0].Rows)
            {
                NewHireTrainingDC objTrainingDC = new NewHireTrainingDC();
                objTrainingDC.StatusCode = dr["StatusCode"] != DBNull.Value ? int.Parse(dr["StatusCode"].ToString()) : 0;
                objTrainingDC.TrainingStatus = dr["StatusDesc"].ToString();
                retTrainList.Add(objTrainingDC);
            }

            return retTrainList;
        }

        /// <summary>
        /// 208099: Method to Fetch Training Type
        /// </summary>
        /// <param name="objDc">New hire training object</param>
        /// <param name="totalCount">total count</param>
        /// <returns>training data</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "1", Justification = "Reviewed."), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public TrainingList FetchTraningData(NewHireTrainingDC objDc, TotalCountDC totalCount)
        {
            DataSet datsetTrainingData;
            TrainingList retTrainList = new TrainingList();

            datsetTrainingData = DBHelper.ExecuteDataset("usp_FetchTrainingData", objDc);
            if (datsetTrainingData != null && datsetTrainingData.Tables.Count > 0)
            {
                if (datsetTrainingData.Tables[0].Rows.Count > 0)
                {
                    totalCount.TotalCount = 0;
                    totalCount.TotalCount = int.Parse(datsetTrainingData.Tables[0].Rows[0][0].ToString());
                }

                foreach (DataRow dr in datsetTrainingData.Tables[1].Rows)
                {
                    NewHireTrainingDC objTrainingDC = new NewHireTrainingDC();
                    objTrainingDC.TrainingId = Convert.ToInt16(dr["TrainingId"]);
                    objTrainingDC.TrainingName = dr["TrainingName"].ToString();
                    objTrainingDC.TrainingLocation = dr["TrainingLocation"].ToString();
                    objTrainingDC.StartTime = dr["StartTime"].ToString();
                    objTrainingDC.EndTime = dr["EndTime"].ToString();
                    objTrainingDC.TrainingScheduledDate = string.Format("{0:dd-MM-yyyy}", dr["TrainingScheduledDate"]);
                    objTrainingDC.CandidateCount = Convert.ToInt16(dr["CandidateCount"]);
                    objTrainingDC.IsBlocked = Convert.ToInt16(dr["IsBlocked"]);
                    objTrainingDC.TotalCount = int.Parse(datsetTrainingData.Tables[0].Rows[0][0].ToString());

                    retTrainList.Add(objTrainingDC);
                }
            }

            return retTrainList;
        }

        /// <summary>
        /// 208099: Method to Update Training Data
        /// </summary>
        /// <param name="objTrainingList">object related to training</param>
        /// <returns>updated training date</returns>
        public int UpdateTrainingDate(NewHireTrainingDC objTrainingList)
        {
            return (int)DBHelper.ExecuteScalar("usp_UpdateTrainingData", objTrainingList);
        }

        /// <summary>
        /// 208099: Method to Update Training Data
        /// </summary>
        /// <param name="objTrainingList">object related to training list</param>
        /// <returns>updated training data</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public int UpdateNHOTrainingData(NewHireTrainingDC objTrainingList)
        {
            int retStatus = 0;
            DataSet datsetUpdateStatus = new DataSet();
            datsetUpdateStatus = DBHelper.ExecuteDataset("usp_UpdateTrainingData", objTrainingList);
            if (datsetUpdateStatus.Tables.Count > 0)
            {
                retStatus = Convert.ToInt16(datsetUpdateStatus.Tables[0].Rows[0][0].ToString());
            }

            return retStatus;
            //// return (int)DBHelper.ExecuteScalar("usp_UpdateTrainingData", objTrainingList);
        }

        /// <summary>
        /// 208099: Method to Fetch Training Data
        /// </summary>
        /// <param name="objDc">object drill down data</param>
        /// <returns>training list</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateTrainingList FetchTrainingDrillDownData(CandidateTrainingDC objDc)
        {
            DataSet datsetDrillDownData;
            CandidateTrainingList retTrainList = new CandidateTrainingList();
            datsetDrillDownData = DBHelper.ExecuteDataset("usp_FetchDrillDownTrainingData", objDc);
            if (datsetDrillDownData != null && datsetDrillDownData.Tables.Count > 0)
            {
                foreach (DataRow dr in datsetDrillDownData.Tables[0].Rows)
                {
                    CandidateTrainingDC objTrainingDC = new CandidateTrainingDC();
                    objTrainingDC.AssociateId = Convert.ToInt32(dr["AssociateID"]);
                    objTrainingDC.AssociateName = dr["Name"].ToString();
                    ////objTrainingDC.RegisteredDate = Convert.ToDateTime(dr["RegistrationDate"]).ToShortDateString();
                    objTrainingDC.RegisteredDate = dr["RegistrationDate"].ToString();
                    objTrainingDC.TrainingId = Convert.ToInt32(dr["TrainingId"].ToString());
                    objTrainingDC.RegisterationCount = Convert.ToInt32(dr["RegisteredCount"].ToString());
                    objTrainingDC.AttendanceStatus = Convert.ToInt32(dr["AttendanceStatus"].ToString());
                    objTrainingDC.Day2Flag = Convert.ToInt32(dr["Day2Flag"].ToString());
                    objTrainingDC.UKFlag = Convert.ToInt32(dr["UKFlag"].ToString());
                    if (objTrainingDC.UKFlag == 1)
                    {
                        objTrainingDC.Score = Convert.ToInt32(dr["Score"].ToString());
                        if (objTrainingDC.Day2Flag == 1 && objTrainingDC.Score <= 45)
                        {
                            objTrainingDC.AttendanceStatusDay2 = dr["AttendanceStatusDay2"].ToString();
                        }
                    }

                    objTrainingDC.TrainingName = dr["TrainingName"].ToString();
                    objTrainingDC.CandidateId = Convert.ToInt32(dr["CandidateId"]);
                    objTrainingDC.TrainingScheduledDate = dr["TrainingScheduledDate"].ToString();
                    objTrainingDC.BU = dr["BU"].ToString();
                    objTrainingDC.Grade = dr["Grade"].ToString();
                    retTrainList.Add(objTrainingDC);
                }
            }

            return retTrainList;
        }

        /// <summary>
        /// 208099: Method to Fetch Training Dates
        /// </summary>
        /// <param name="candidateDetail">Candidate detail</param>
        /// <returns>Training list</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateTrainingList FetchTrainingDates(CandidateDetail candidateDetail)
        {
            DataSet datsetTrainingDates;
            CandidateTrainingList retTrainList = new CandidateTrainingList();
            datsetTrainingDates = DBHelper.ExecuteDataset("usp_FetchTrainingDates", candidateDetail);
            if (datsetTrainingDates != null && datsetTrainingDates.Tables.Count > 0)
            {
                foreach (DataRow dr in datsetTrainingDates.Tables[0].Rows)
                {
                    CandidateTrainingDC objTrainingDC = new CandidateTrainingDC();
                    objTrainingDC.TrainingId = Convert.ToInt32(dr["TrainingId"]);
                    objTrainingDC.RegisteredDate = dr["TrainingScheduledDate"].ToString();
                    retTrainList.Add(objTrainingDC);
                }
            }

            return retTrainList;
        }

        /// <summary>
        /// 208099: Method to Fetch Training Details
        /// </summary>
        /// <param name="objTrainingDC">training details</param>
        /// <returns>training data</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public TrainingList FetchTrainingDetails(NewHireTrainingDC objTrainingDC)
        {
            DataSet datsetTrainingDetails;
            TrainingList retTrainList = new TrainingList();
            datsetTrainingDetails = DBHelper.ExecuteDataset("usp_FetchTrainingDetails", objTrainingDC);
            if (datsetTrainingDetails != null && datsetTrainingDetails.Tables.Count > 0)
            {
                foreach (DataRow dr in datsetTrainingDetails.Tables[0].Rows)
                {
                    NewHireTrainingDC objTrainingDetailsDC = new NewHireTrainingDC();
                    objTrainingDetailsDC.TrainingState = dr["TrainingState"].ToString();
                    objTrainingDetailsDC.TrainingCity = dr["TrainingCity"].ToString();
                    objTrainingDetailsDC.StartTime = dr["StartTime"].ToString();
                    objTrainingDetailsDC.EndTime = dr["EndTime"].ToString();
                    objTrainingDetailsDC.DaytwoStartTime = dr["DaytwoStartTime"].ToString();
                    objTrainingDetailsDC.DaytwoEndTime = dr["DaytwoEndTime"].ToString();
                    ////   objTrainingDC.TrainingName = dr["TrainingName"].ToString();
                    retTrainList.Add(objTrainingDetailsDC);
                }
            }

            return retTrainList;
        }

        /// <summary>
        /// 208099: Method to Fetch Training Dates
        /// </summary>
        /// <param name="candidateDetail">candidate detail</param>
        /// <returns>populate training details</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public TrainingList PopulateCanddidateTrainingDetails(CandidateDetail candidateDetail)
        {
            DataSet datsetTrainingDates;
            TrainingList retTrainList = new TrainingList();
            datsetTrainingDates = DBHelper.ExecuteDataset("usp_FetchTrainingDates", candidateDetail);
            if (datsetTrainingDates != null && datsetTrainingDates.Tables.Count > 0)
            {
                foreach (DataRow dr in datsetTrainingDates.Tables[0].Rows)
                {
                    NewHireTrainingDC objTrainingDetailsDC = new NewHireTrainingDC();
                    objTrainingDetailsDC.TrainingId = Convert.ToInt16(dr["TrainingId"]);
                    objTrainingDetailsDC.TrainingState = dr["TrainingState"].ToString();
                    objTrainingDetailsDC.TrainingCity = dr["TrainingCity"].ToString();
                    objTrainingDetailsDC.StartTime = dr["StartTime"].ToString();
                    objTrainingDetailsDC.EndTime = dr["EndTime"].ToString();
                    retTrainList.Add(objTrainingDetailsDC);
                }
            }

            if (retTrainList.Count() == 0)
            {
                NewHireTrainingDC objTrainingDetailsDC = new NewHireTrainingDC();
                objTrainingDetailsDC.TrainingId = 0;
                retTrainList.Add(objTrainingDetailsDC);
            }

            return retTrainList;
        }

        /// <summary>
        ///  207953: Method to Save Task Data
        /// </summary>
        /// <param name="candidateDetail">candidate detail</param>
        /// <returns>registered or canceled training details</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public TrainingList RegisterCancelTrainingDetails(CandidateTrainingDC candidateDetail)
        {
            DataSet datsetTraining;
            TrainingList retTrainList = new TrainingList();
            datsetTraining = DBHelper.ExecuteDataset("usp_NewHireInductionRegistration", candidateDetail);
            NewHireTrainingDC objTrainingDetailsDC = new NewHireTrainingDC();
            if (datsetTraining != null && datsetTraining.Tables.Count > 2)
            {
                objTrainingDetailsDC.ServiceAccount = datsetTraining.Tables[2].Rows[0]["ServiceAccount"].ToString();
                objTrainingDetailsDC.ServicePWD = datsetTraining.Tables[2].Rows[0]["ServicePWD"].ToString();
                objTrainingDetailsDC.ServiceUrl = datsetTraining.Tables[2].Rows[0]["serviceUrl"].ToString();
                objTrainingDetailsDC.ServiceDomain = datsetTraining.Tables[2].Rows[0]["ServiceDomain"].ToString();
                objTrainingDetailsDC.RequiredAttendees = datsetTraining.Tables[2].Rows[0]["RequiredAttendees"].ToString();
                objTrainingDetailsDC.Subject = datsetTraining.Tables[2].Rows[0]["Subject"].ToString();
                objTrainingDetailsDC.Body = datsetTraining.Tables[2].Rows[0]["Body"].ToString();
                objTrainingDetailsDC.IsReminderSet = datsetTraining.Tables[2].Rows[0]["IsReminderSet"].ToString();
                objTrainingDetailsDC.ReminderMinutesBeforeStart = Convert.ToInt16(datsetTraining.Tables[2].Rows[0]["ReminderMinutesBeforeStart"]);
                objTrainingDetailsDC.Score = Convert.ToInt16(datsetTraining.Tables[2].Rows[0]["Score"]);
                DateTime strtDate = (datsetTraining.Tables[2].Rows[0]["MeetingStartDate"]).ToString() == "" ? DateTime.MinValue : Convert.ToDateTime(datsetTraining.Tables[2].Rows[0]["MeetingStartDate"]);
                objTrainingDetailsDC.MeetingStartDate = strtDate;
                DateTime endDate = (datsetTraining.Tables[2].Rows[0]["MeetingEndDate"]).ToString() == "" ? DateTime.MinValue : Convert.ToDateTime(datsetTraining.Tables[2].Rows[0]["MeetingEndDate"]);
                objTrainingDetailsDC.MeetingEndDate = endDate;
                objTrainingDetailsDC.OperationType = Convert.ToInt32(datsetTraining.Tables[2].Rows[0]["OperationType"]);
                objTrainingDetailsDC.MeetingID = datsetTraining.Tables[2].Rows[0]["MeetingID"].ToString();
                DateTime strtDate2 = (datsetTraining.Tables[2].Rows[0]["MeetingStartDate2"]).ToString() == "" ? DateTime.MinValue : Convert.ToDateTime(datsetTraining.Tables[2].Rows[0]["MeetingStartDate2"]);
                objTrainingDetailsDC.MeetingStartDate2 = strtDate2;
                if (objTrainingDetailsDC.Score == 1)
                {
                    DateTime endDate2 = (datsetTraining.Tables[2].Rows[0]["MeetingEndDate2"]).ToString() == "" ? DateTime.MinValue : Convert.ToDateTime(datsetTraining.Tables[2].Rows[0]["MeetingEndDate2"]);
                    objTrainingDetailsDC.MeetingEndDate2 = endDate2;
                    objTrainingDetailsDC.MeetingID2 = datsetTraining.Tables[2].Rows[0]["MeetingID2"].ToString();
                }

                objTrainingDetailsDC.OfcMailId = datsetTraining.Tables[2].Rows[0]["OfcMailId"].ToString();
                objTrainingDetailsDC.InductionDiaryFlag = Convert.ToInt32(datsetTraining.Tables[2].Rows[0]["InductionDiaryFlag"]);
                objTrainingDetailsDC.Location = datsetTraining.Tables[2].Rows[0]["Location"].ToString();
            }

            if (datsetTraining != null && datsetTraining.Tables.Count > 0)
            {
                /*Tranasction Status */
                objTrainingDetailsDC.Mode = Convert.ToInt16(datsetTraining.Tables[0].Rows[0][0]);
                objTrainingDetailsDC.IsMailToBeSent = Convert.ToInt16(datsetTraining.Tables[1].Rows[0]["IsMailToBeSent"]);
                retTrainList.Add(objTrainingDetailsDC);
            }

            return retTrainList;
        }

        /// <summary>
        /// 261890: Method to send InductionDiaryInvite
        /// </summary>
        /// <param name="candidateDetail">Candidate detail</param>
        /// <returns>list of induction invites</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1806:DoNotIgnoreMethodResults", Justification = "Reviewed.", MessageId = "System.Int32.TryParse(System.String,System.Int32@)"), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public TrainingList SendInductionDiaryInvites(CandidateTrainingDC candidateDetail)
        {
            DataSet datsetTraining;
            TrainingList retTrainList = new TrainingList();
            datsetTraining = DBHelper.ExecuteDataset("usp_SendInductionDiaryInvite", candidateDetail);

            if ((datsetTraining != null) && (datsetTraining.Tables.Count > 0) && (datsetTraining.Tables[0].Rows.Count > 0))
            {
                int totalCount = 0;
                int.TryParse(datsetTraining.Tables[0].Rows[0][0].ToString(), out totalCount);
            }

            foreach (DataRow dr in datsetTraining.Tables[0].Rows)
            {
                NewHireTrainingDC objTrainingDetailsDC = new NewHireTrainingDC();

                if (datsetTraining.Tables[0].Columns.Contains("ServiceAccount"))
                {
                    objTrainingDetailsDC.ServiceAccount = dr["ServiceAccount"].ToString();
                }

                if (datsetTraining.Tables[0].Columns.Contains("ServicePWD"))
                {
                    objTrainingDetailsDC.ServicePWD = dr["ServicePWD"].ToString();
                }

                if (datsetTraining.Tables[0].Columns.Contains("serviceUrl"))
                {
                    objTrainingDetailsDC.ServiceUrl = dr["serviceUrl"].ToString();
                }

                if (datsetTraining.Tables[0].Columns.Contains("ServiceDomain"))
                {
                    objTrainingDetailsDC.ServiceDomain = dr["ServiceDomain"].ToString();
                }

                if (datsetTraining.Tables[0].Columns.Contains("RequiredAttendees"))
                {
                    objTrainingDetailsDC.RequiredAttendees = dr["RequiredAttendees"].ToString();
                }

                if (datsetTraining.Tables[0].Columns.Contains("Subject"))
                {
                    objTrainingDetailsDC.Subject = dr["Subject"].ToString();
                }

                if (datsetTraining.Tables[0].Columns.Contains("Body"))
                {
                    objTrainingDetailsDC.Body = dr["Body"].ToString();
                }

                if (datsetTraining.Tables[0].Columns.Contains("IsReminderSet"))
                {
                    objTrainingDetailsDC.IsReminderSet = dr["IsReminderSet"].ToString();
                }

                if (datsetTraining.Tables[0].Columns.Contains("ReminderMinutesBeforeStart"))
                {
                    objTrainingDetailsDC.ReminderMinutesBeforeStart = Convert.ToInt32(dr["ReminderMinutesBeforeStart"]);
                }

                if (datsetTraining.Tables[0].Columns.Contains("Score"))
                {
                    objTrainingDetailsDC.Score = Convert.ToInt32(dr["Score"]);
                }

                if (datsetTraining.Tables[0].Columns.Contains("MeetingStartDate"))
                {
                    DateTime strtDate = dr["MeetingStartDate"].ToString()==""?DateTime.MinValue:Convert.ToDateTime(dr["MeetingStartDate"]);
                    objTrainingDetailsDC.MeetingStartDate = strtDate;
                }

                if (datsetTraining.Tables[0].Columns.Contains("OperationType"))
                {
                    objTrainingDetailsDC.OperationType = Convert.ToInt32(dr["OperationType"]);
                }

                if (datsetTraining.Tables[0].Columns.Contains("MeetingEndDate"))
                {
                    //objTrainingDetailsDC.MeetingEndDate = Convert.ToDateTime(dr["MeetingEndDate"]);
                    DateTime endDate = dr["MeetingEndDate"].ToString() == "" ? DateTime.MinValue : Convert.ToDateTime(dr["MeetingEndDate"]);
                    objTrainingDetailsDC.MeetingEndDate = endDate;
                }

                if (datsetTraining.Tables[0].Columns.Contains("MeetingID"))
                {
                    objTrainingDetailsDC.MeetingID = dr["MeetingID"].ToString();
                }

                if (datsetTraining.Tables[0].Columns.Contains("Candidateid"))
                {
                    objTrainingDetailsDC.Candidateid = Convert.ToInt32(dr["Candidateid"]);
                }

                if (datsetTraining.Tables[0].Columns.Contains("TaskId"))
                {
                    objTrainingDetailsDC.TaskId = Convert.ToInt32(dr["TaskId"]);
                }

                if (objTrainingDetailsDC.Score == 1)
                {
                    if (datsetTraining.Tables[0].Columns.Contains("MeetingID2"))
                    {
                        objTrainingDetailsDC.MeetingID2 = dr["MeetingID2"].ToString();
                    }

                    if (datsetTraining.Tables[0].Columns.Contains("MeetingEndDate2"))
                    {
                        //objTrainingDetailsDC.MeetingEndDate2 = Convert.ToDateTime(dr["MeetingEndDate2"]);
                        DateTime endDate2 = dr["MeetingEndDate2"].ToString() == "" ? DateTime.MinValue : Convert.ToDateTime(dr["MeetingEndDate2"]);
                        objTrainingDetailsDC.MeetingEndDate2 = endDate2;

                    }

                    if (datsetTraining.Tables[0].Columns.Contains("MeetingStartDate2"))
                    {
                        //objTrainingDetailsDC.MeetingStartDate2 = Convert.ToDateTime(dr["MeetingStartDate2"]);
                        DateTime strDate2 = dr["MeetingStartDate2"].ToString() == "" ? DateTime.MinValue : Convert.ToDateTime(dr["MeetingStartDate2"]);
                        objTrainingDetailsDC.MeetingStartDate2 = strDate2;
                    }
                }

                if (datsetTraining.Tables[0].Columns.Contains("OfcMailId"))
                {
                    objTrainingDetailsDC.OfcMailId = dr["OfcMailId"].ToString();
                }

                if (datsetTraining.Tables[0].Columns.Contains("InductionDiaryFlag"))
                {
                    objTrainingDetailsDC.InductionDiaryFlag = Convert.ToInt32(dr["InductionDiaryFlag"]);
                }

                if (datsetTraining.Tables[0].Columns.Contains("Location"))
                {
                    objTrainingDetailsDC.Location = dr["Location"].ToString();
                }

                retTrainList.Add(objTrainingDetailsDC);
            }

            return retTrainList;
        }

        /// <summary>
        /// 207953: Method to Save Task Data
        /// </summary>
        /// <param name="candidateDetail">candidate detail</param>
        /// <returns>updated training date</returns>
        public int UpdateCandidateTrainingDate(CandidateTrainingDC candidateDetail)
        {
            return (int)DBHelper.ExecuteScalar("usp_UpdateCandidateTrainingDate", candidateDetail);
        }
        #endregion NewHire DB Methods

        /// <summary>
        /// 207953: Method to get Employers details
        /// </summary>
        /// <param name="getEmployerdata">Employer data</param>
        /// <returns>employer details</returns>
        public SaveTaskDC GetEmployersDetails(SaveTaskDC getEmployerdata)
        {
            DataSet datsetPrefillValues;
            //// StringWriter strw = new StringWriter();
            SaveTaskDC objPrefillDC = new SaveTaskDC();
            datsetPrefillValues = DBHelper.ExecuteDataset("usp_GetEmployersDetails", getEmployerdata);
            if (datsetPrefillValues.Tables[0] != null)
            {
                datsetPrefillValues.Tables[0].TableName = "TaskDataXML";

                ////Assigning task saved data Xml to object
                objPrefillDC.TaskDataXML = datsetPrefillValues.Tables[0].Rows[0]["TaskDataXML"].ToString();
            }

            return objPrefillDC;
        }

        /// <summary>
        /// 207953: Method to  Medical Top-up coverage based on the grade code
        /// </summary>
        /// <param name="getcandidateID">candidate id</param>
        /// <returns>medical top cover</returns>
        public MasterListSource GetMedicalTopupCover(MasterList getcandidateID)
        {
            DataSet datsetMasterData;
            MasterListSource retMasterSrc = new MasterListSource();
            MasterListData retMasterData = new MasterListData();
            datsetMasterData = DBHelper.ExecuteDataset("usp_FetchMedicalCoverageAmount", getcandidateID);

            foreach (DataRow dr in datsetMasterData.Tables[0].Rows)
            {
                MasterList objMasterList = new MasterList();
                objMasterList.MasterUserValue = dr["Code"].ToString();
                objMasterList.MasterDescription = dr["Description"].ToString();
                retMasterData.Add(objMasterList);
            }

            retMasterSrc.MasterData = retMasterData;
            return retMasterSrc;
        }

        /// <summary>
        /// 195514: Method to update ELM Details
        /// </summary>
        /// <param name="elmLIST">List of learning</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "0", Justification = "Reviewed."), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public void UpdateELMStatus(ELMStatusList elmLIST)
        {
            try
            {
                foreach (ELMDC objELM in elmLIST)
                {
                    DBHelper.ExecuteNonQuery("usp_UpdateELMStatus", objELM);
                }
            }
            catch
            {
                throw;
            }
        }

        /// <summary>
        /// 267083: Method to Fetch Candidate ID
        /// </summary>
        /// <param name="candidateDetail">candidate detail</param>
        /// <returns>Associate Id</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList FetchCandidateId(CandidateDetail candidateDetail)
        {
            DataSet datsetCandidate;
            CandidateDetailList retCand = new CandidateDetailList();
            datsetCandidate = DBHelper.ExecuteDataset("usp_GetAssociateID", candidateDetail);

            foreach (DataRow dr in datsetCandidate.Tables[0].Rows)
            {
                CandidateDetail objDCNH = new CandidateDetail();
                long icandidateId = 0;
                objDCNH.CandidateId = dr["CandidateID"] != DBNull.Value ? long.Parse(dr["CandidateID"].ToString()) : icandidateId;
                objDCNH.Flag = Convert.ToInt32(dr["Flag"]);
                objDCNH.MigratedCandidate = Convert.ToInt16(dr["IsMigratedCandidate"]);

                retCand.Add(objDCNH);
            }

            datsetCandidate.Dispose();

            return retCand;
        }

        /// <summary>
        /// 267083: Method to Get State Tax form List
        /// </summary>
        /// <returns>list of states</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList FetchStateTaxFormList(CandidateDetail candidateDetail)
        {
            DataSet datsetStateW4FormList;
            CandidateDetailList retCand = new CandidateDetailList();
            datsetStateW4FormList = DBHelper.ExecuteDataset("usp_GetStateW4FormList", candidateDetail);

            foreach (DataRow dr in datsetStateW4FormList.Tables[0].Rows)
            {
                CandidateDetail objDCNH = new CandidateDetail();
                objDCNH.CDescription = Convert.ToString(dr["CDescription"]);
                objDCNH.CUserDefined1 = Convert.ToString(dr["CUserDefined1"]);
                objDCNH.CUserDefined2 = Convert.ToString(dr["CUserDefined2"]);

                retCand.Add(objDCNH);
            }

            datsetStateW4FormList.Dispose();

            return retCand;
        }

        /// <summary>
        /// 298589: Method to Save Survey Data
        /// </summary>
        /// <param name="saveSurveydata">save survey data</param>
        /// <returns>status of survey</returns>
        public int SaveSurveyData(SaveTaskDC saveSurveydata)
        {
            return (int)DBHelper.ExecuteScalar("usp_Survey_SaveSurveyDetail", saveSurveydata);
        }

        /// <summary>
        /// 267083: Method to Get Upload Data
        /// </summary>
        /// <param name="uploadData">Uploaded data</param>
        /// <returns>file uploaded data</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "0", Justification = "Reviewed.")]
        public FileUploadDC FetchFileUploadData(FileUploadDC uploadData)
        {
            DataSet datsetFetchUploadData = DBHelper.ExecuteDataset("usp_ECM_FetchFileUploadData", uploadData);

            if (datsetFetchUploadData != null && datsetFetchUploadData.Tables.Count > 0)
            {
                DataRow drbaseInfo = datsetFetchUploadData.Tables[0].Rows[0];

                uploadData.CandidateId = Convert.ToInt64(drbaseInfo["CandidateId"]);
                uploadData.MetaData = drbaseInfo["MetaData"].ToString();
                uploadData.AssociateId = Convert.ToInt32(drbaseInfo["AssociateId"]);
                uploadData.Title = drbaseInfo["Title"].ToString();
                uploadData.Account = drbaseInfo["Account"].ToString();
                uploadData.Author = drbaseInfo["Author"].ToString();
                uploadData.DocumentType = drbaseInfo["DocumentTypeName"].ToString();
                uploadData.SecurityGroup = drbaseInfo["SecurityGroup"].ToString();
                uploadData.IsECMEnabled = Convert.ToInt32(drbaseInfo["IsECMEnabled"]);

                uploadData.FileDetails = new FileDetailList();

                foreach (DataRow dr in datsetFetchUploadData.Tables[1].Rows)
                {
                    FileDetail objFileDetail = new FileDetail();
                    objFileDetail.FileUploadStatus = Convert.ToInt32(dr["FileUploadStatus"]);
                    objFileDetail.FileApprovalStatus = Convert.ToInt32(dr["FileApprovalStatus"]);
                    objFileDetail.FileName = Convert.ToString(dr["FileName"]);
                    objFileDetail.DocumentName = dr["DocumentName"].ToString();
                    objFileDetail.IsTaskLocked = Convert.ToInt32(dr["IsTaskLocked"]);
                    objFileDetail.Filetype = dr["Filetype"].ToString();
                    uploadData.FileDetails.Add(objFileDetail);
                    objFileDetail.Dispose();
                }
            }

            datsetFetchUploadData.Dispose();
            return uploadData;
        }

        /// <summary>
        /// to update document upload status
        /// </summary>
        /// <param name="objDocumentDetail">object for document detail</param>
        /// <returns>updated status</returns>
        public int UpdateStatus(VirtualDocumentDC objDocumentDetail)
        {
            return Convert.ToInt32(DBHelper.ExecuteScalar("usp_ECM_UpdateStatus", objDocumentDetail));
        }

        #region BGV Business Methods

        /// <summary>
        /// 249510 : Method to validate  details 
        /// </summary>
        /// <param name="param">content details</param>
        /// <returns>content of document</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public SaveCisDC ValidateCisContent(SaveCisDC param)
        {
            SaveCisDC objValidList = new SaveCisDC();
            DataSet datsetCisValidation;
            datsetCisValidation = DBHelper.ExecuteDataset("usp_BGV_ValidateCisData", param);
            datsetCisValidation.DataSetName = "ValidationSet";
            if (datsetCisValidation != null)
            {
                if (datsetCisValidation.Tables.Count > 0)
                {
                    objValidList.ValidationStatus = Convert.ToInt32(datsetCisValidation.Tables[0].Rows[0][0].ToString());
                    datsetCisValidation.Tables.RemoveAt(0);
                    if (datsetCisValidation.Tables[0].Rows.Count > 0)
                    {
                        datsetCisValidation.Tables[0].TableName = "ValidationError";
                    }

                    objValidList.ValidationMessage = datsetCisValidation.GetXml().ToString();
                }
            }

            datsetCisValidation = null;
            return objValidList;
        }

        /// <summary>
        /// Method to save component data for a candidate
        /// </summary>
        /// <param name="componentData">component data</param>
        /// <returns>flag values</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public SaveCisDC SaveCandidateComponentData(SaveCisDC componentData)
        {
            DataSet datsetSaveComponent;
            SaveCisDC objGetFlagValues = new SaveCisDC();
            datsetSaveComponent = DBHelper.ExecuteDataset("usp_BGV_SaveCandidateComponentData", componentData);
            if (datsetSaveComponent.Tables[0] != null)
            {
                datsetSaveComponent.Tables[0].TableName = "SaveStaus";

                objGetFlagValues.Status = Convert.ToInt32(datsetSaveComponent.Tables[0].Rows[0][0].ToString());
                datsetSaveComponent.Tables.RemoveAt(0);
            }

            datsetSaveComponent.DataSetName = "ValidationSet";
            if (datsetSaveComponent.Tables.Count > 0)
            {
                datsetSaveComponent.Tables[0].TableName = "ValidationError";
                objGetFlagValues.ValidationMessage = datsetSaveComponent.GetXml().ToString();
            }

            datsetSaveComponent = null;
            return objGetFlagValues;
        }

        /// <summary>
        /// 249510 : Method to validate  component data
        /// </summary>
        /// <param name="param">data of component</param>
        /// <returns>status of validation</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public SaveCisDC ValidateComponentData(SaveCisDC param)
        {
            SaveCisDC objValidList = new SaveCisDC();
            DataSet datsetCisValidation;
            datsetCisValidation = DBHelper.ExecuteDataset("usp_BGV_ValidateCisComponentData", param);
            datsetCisValidation.DataSetName = "ValidationSet";
            if (datsetCisValidation != null)
            {
                if (datsetCisValidation.Tables.Count > 0)
                {
                    objValidList.ValidationStatus = Convert.ToInt32(datsetCisValidation.Tables[0].Rows[0][0].ToString());
                    datsetCisValidation.Tables.RemoveAt(0);
                    if (datsetCisValidation.Tables[0].Rows.Count > 0)
                    {
                        datsetCisValidation.Tables[0].TableName = "ValidationError";
                    }

                    objValidList.ValidationMessage = datsetCisValidation.GetXml().ToString();
                }
            }

            datsetCisValidation = null;
            return objValidList;
        }

        /// <summary>
        /// 249510: Method to Save Data
        /// </summary>
        /// <param name="saveCisdata">save data content</param>
        /// <returns>status of the data saved</returns>
        public int SaveCisData(SaveCisDC saveCisdata)
        {
            return Convert.ToInt32(DBHelper.ExecuteScalar("usp_BGV_SaveCandidateBgvDetail", saveCisdata));
        }

        /// <summary>
        /// 260947:Method to get  Status for the Candidate
        /// </summary>
        /// <param name="objNHDashboardData">dash board data</param>
        /// <returns>status of dashboard</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "0", Justification = "Reviewed.")]
        public BgvNHDashboardData GetNHDashboardBgvStatus(BgvNHDashboardData objNHDashboardData)
        {
            DataSet datsetCisValidation;
            datsetCisValidation = DBHelper.ExecuteDataset("usp_BGV_Con_GetBgvTaskList", objNHDashboardData);
            if (datsetCisValidation != null)
            {
                if (datsetCisValidation.Tables.Count > 0 && datsetCisValidation.Tables[0].Rows.Count > 0)
                {
                    objNHDashboardData.CanShowBgvTab = Convert.ToBoolean(datsetCisValidation.Tables[0].Rows[0]["CanShowBgvTab"]);
                    objNHDashboardData.CanShowPreJoiningTab = Convert.ToBoolean(datsetCisValidation.Tables[0].Rows[0]["CanShowPreJoiningTab"]);
                    objNHDashboardData.CanShowPostJoiningTab = Convert.ToBoolean(datsetCisValidation.Tables[0].Rows[0]["CanShowPostJoiningTab"]);
                    objNHDashboardData.HtmlForCisInProgress = datsetCisValidation.Tables[0].Rows[0]["HtmlForCisInProgress"].ToString();
                    objNHDashboardData.CisStatus = Convert.ToInt32(datsetCisValidation.Tables[0].Rows[0]["BgvStatus"]);
                    objNHDashboardData.CanShowHTransferTab = Convert.ToBoolean(datsetCisValidation.Tables[0].Rows[0]["CanShowHTransferTab"]);
                    objNHDashboardData.HtmlForHTransferInProgress = datsetCisValidation.Tables[0].Rows[0]["HtmlForHTransferInProgress"].ToString();
                }
            }

            return objNHDashboardData;
        }

        /// <summary>
        /// 249510: data to get saved 
        /// </summary>
        /// <param name="saveBpNoGo">data to save</param>
        /// <returns>saved status</returns>
        public int SaveBpNoGo(SaveCisDC saveBpNoGo)
        {
            return Convert.ToInt32(DBHelper.ExecuteScalar("usp_BGV_SaveBpNoGo", saveBpNoGo));
        }

        /// <summary>
        /// 249510: Pending back paper count
        /// </summary>
        /// <param name="pendingBackpaperCount">data to save pending back paper</param>
        /// <returns>count of pending documents</returns>
        public int PendingBackPaperCount(SaveCisDC pendingBackpaperCount)
        {
            return Convert.ToInt32(DBHelper.ExecuteScalar("usp_BGV_GetPendingDocumentsCount", pendingBackpaperCount));
        }

        #endregion

        #region RLA
        /// <summary>
        /// 249510: Method to Save  Data
        /// </summary>
        /// <param name="saveFeedback">data for feed back</param>
        /// <returns>status of save</returns>
        public int SaveFeedback(SaveRLAFeedbackDC saveFeedback)
        {
            return Convert.ToInt32(DBHelper.ExecuteScalar("usp_RLA_SaveFeedbackDetail", saveFeedback));
        }

        #endregion
    }
}

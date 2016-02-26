// <copyright file = "DashBoardDAL.cs" company = "CTS">
// Copyright (c) OnBoarding_DashBoardDAL. All rights reserved.
// </copyright>

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DAL.DashBoard      
 * Class Name       : DashBoard.cs
 * Version          : 1.0
 * Type             : Class
 * Purpose          : Methods Related to DashBoard
 * Created date     : 2012-Jan-12
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

namespace OneC.OnBoarding.DAL.DashBoard
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Data;
    using System.Data.SqlClient;
    using System.Linq;
    using System.Text;
    using OneC.OnBoarding.DC.CandidateDC;
    using OneC.OnBoarding.DC.DashBoardDC;
    using OneC.OnBoarding.DC.UtilityDC;

    #endregion Namespaces

    /// <summary>
    /// Class for DashBoardDAL
    /// </summary>
    public sealed class DashBoardDAL : IDisposable
    {
        /// <summary>
        /// Method for Dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        #region DashBoard DB Methods

        /// <summary>
        /// Method for GetDashboardFilters
        /// </summary>
        /// <param name="objDashboardFilters"> object Dashboard Filters </param>
        /// <returns> dashboard filters </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed."), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "0", Justification = "Reviewed.")]
        public DashboardFilters GetDashboardFilters(DashboardFilters objDashboardFilters)
        {
            objDashboardFilters.DashboardFilterList = new List<DashboardFilter>();
            DataSet dsGetDashboardFilters = DBHelper.ExecuteDataset("usp_GetDashboardFilters", objDashboardFilters);
            if (dsGetDashboardFilters != null && dsGetDashboardFilters.Tables.Count > 0 && dsGetDashboardFilters.Tables[0].Rows.Count > 0)
            {
                objDashboardFilters.DashboardFilterList = (from DataRow dr in dsGetDashboardFilters.Tables[0].Rows
                                                           select new DashboardFilter()
                                                           {
                                                               FilterName = dr["FilterName"].ToString(),
                                                               FilterId = dr["FilterId"].ToString(),
                                                               FilterDesc = dr["FilterDesc"].ToString(),
                                                               FilterOrder = Convert.ToInt32(dr["FilterOrder"])
                                                           }).ToList();
            }

            return objDashboardFilters;
        }

        /// <summary>
        /// 220930: Method to Fetch Training Details
        /// </summary>
        /// <param name="candDetail"> CandidateTraining Detail </param>
        /// <returns> returns training details </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateTrainingList FetchTrainingExcelData(CandidateTrainingDC candDetail)
        {
            DataSet dsRCData;
            CandidateTrainingList retCand = new CandidateTrainingList();
            dsRCData = DBHelper.ExecuteDataset("usp_FetchInductionTrainingDataExcel", candDetail); //// IM dashboard Excel.
            ////if ((dsRCData != null) && (dsRCData.Tables.Count > 0) && (dsRCData.Tables[0].Rows.Count > 0))
            ////{
            ////    totalCount = 0;
            ////    int.TryParse(dsRCData.Tables[0].Rows[0][0].ToString(), out totalCount);
            ////}

            foreach (DataRow dr in dsRCData.Tables[0].Rows)
            {
                CandidateTrainingDC objCandDC = new CandidateTrainingDC();

                if (dr["CandidateId"] != DBNull.Value)
                {
                    objCandDC.CandidateId = Convert.ToInt32(dr["CandidateId"]);
                }

                if (dr["AssociateId"] != DBNull.Value)
                {
                    objCandDC.AssociateId = Convert.ToInt32(dr["AssociateId"]);
                }

                objCandDC.AssociateName = dr["CandidateName"].ToString();
                objCandDC.DOJ = dr["DOJ"].ToString();
                objCandDC.Grade = dr["Grade"].ToString();
                objCandDC.Department = dr["BU"].ToString();
                objCandDC.HireType = dr["HireType"].ToString();
                objCandDC.RegisteredDate = dr["RegistrationDate"].ToString();
                objCandDC.TrainingScheduledDate = dr["TrainingScheduledDate"].ToString();
                objCandDC.UKHireTypeFlag = Convert.ToInt16(dr["UKHireTypeFlag"]);
                if (objCandDC.UKHireTypeFlag == 1)
                {
                    objCandDC.AttendanceStatusDay1 = Convert.ToInt32(dr["AttendanceStatusDay1"]);
                    objCandDC.AttendanceStatusDay2 = dr["AttendanceStatusDay2"].ToString();
                }
                else
                {
                    objCandDC.AttendanceStatus = Convert.ToInt32(dr["AttendanceStatus"]);
                }

                objCandDC.EmailID = dr["EmailId"].ToString();
                objCandDC.MobileNo = dr["MobileNo"].ToString();
                objCandDC.HiringManager = dr["HiringManager"].ToString();
                objCandDC.JobCode = dr["JobCode"].ToString();
                objCandDC.CountryId = Convert.ToInt32(dr["CountryId"]);

                retCand.Add(objCandDC);
            }

            return retCand;
        }

        /// <summary>
        /// 208099: Method to Fetch Data
        /// 253297: Modified
        /// </summary>
        /// <param name="candDetail"> Sends the search criteria specified in dashboard. </param>
        /// <param name="totalCount"> returns the total records returned for search criteria </param>
        /// <returns> returns candidate details </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "1", Justification = "Reviewed."), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1505:AvoidUnmaintainableCode", Justification = "Reviewed."), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList FetchRCData(CandidateDetail candDetail, TotalCountDC totalCount)
        {
            DataSet dsRCData;
            CandidateDetailList retCand = new CandidateDetailList();
            dsRCData = DBHelper.ExecuteDataset("usp_GetDashBoardData", candDetail); // HRSS,RC & TM dashboards use same SP.
            if ((dsRCData != null) && (dsRCData.Tables.Count > 0) && (dsRCData.Tables[0].Rows.Count > 0))
            {
                try
                {
                    totalCount.TotalCount = 0;
                    totalCount.TotalCount = int.Parse(dsRCData.Tables[0].Rows[0][0].ToString());   //// 397785 , code analysis fix CA1806 
                }
                catch
                {
                    totalCount.TotalCount = 0;
                }
            }

            foreach (DataRow dr in dsRCData.Tables[1].Rows)
            {
                CandidateDetail objCandDC = new CandidateDetail();
                if (dsRCData.Tables[1].Columns.Contains("RecruiterNameID"))
                {
                    objCandDC.RecruiterName = dr["RecruiterNameID"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("LoginId"))
                {
                    objCandDC.LoginId = dr["LoginId"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("ProcessId"))
                {
                    if (dr["ProcessId"] != DBNull.Value)
                    {
                        objCandDC.ProcessID = Convert.ToInt16(dr["ProcessId"]);
                    }
                }

                if (dsRCData.Tables[1].Columns.Contains("CandidateId"))
                {
                    if (dr["CandidateId"] != DBNull.Value)
                    {
                        objCandDC.CandidateId = Convert.ToInt64(dr["CandidateId"]);
                    }
                }

                if (dsRCData.Tables[1].Columns.Contains("CountryId"))
                {
                    if (dr["CountryId"] != DBNull.Value)
                    {
                        objCandDC.CountryID = Convert.ToInt16(dr["CountryId"]);
                    }
                }

                if (dsRCData.Tables[1].Columns.Contains("CandidateName"))
                {
                    objCandDC.CandidateFName = dr["CandidateName"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("DOJ"))
                {
                    objCandDC.CandidateDOJ = dr["DOJ"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("PaperWorkStatusDesc"))
                {
                    objCandDC.PaperWorkStatus = dr["PaperWorkStatusDesc"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("OfferStatusDesc"))
                {
                    objCandDC.CandidateOfferStatusDesc = dr["OfferStatusDesc"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("DesignationDesc"))
                {
                    objCandDC.DesignationDesc = dr["DesignationDesc"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("RowNumber"))
                {
                    if (dr["RowNumber"] != DBNull.Value)
                    {
                        objCandDC.RowNumber = Convert.ToInt64(dr["RowNumber"]);
                    }
                }

                if (dsRCData.Tables[1].Columns.Contains("DepartmentDesc"))
                {
                    objCandDC.DepartmentName = dr["DepartmentDesc"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("Jobcode"))
                {
                    objCandDC.Jobcode = dr["Jobcode"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("CountryName"))
                {
                    objCandDC.CountryName = dr["CountryName"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("StateDescription"))
                {
                    objCandDC.StateDescription = dr["StateDescription"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("CityDesc"))
                {
                    objCandDC.CityName = dr["CityDesc"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("Grade"))
                {
                    objCandDC.GradeDescription = dr["Grade"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("Skills"))
                {
                    objCandDC.Skills = dr["Skills"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("DepartmentCode"))
                {
                    objCandDC.DepartmentCode = dr["DepartmentCode"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("DesignationDesc"))
                {
                    objCandDC.DesignationDesc = dr["DesignationDesc"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("LocationDesc"))
                {
                    objCandDC.LocationDesc = dr["LocationDesc"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("DOB"))
                {
                    objCandDC.DOB = dr["DOB"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("Gender"))
                {
                    objCandDC.Gender = dr["Gender"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("CandidateType"))
                {
                    objCandDC.CandidateTypeDesc = dr["CandidateType"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("Institution"))
                {
                    objCandDC.Institution = dr["Institution"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("ProgramCode"))
                {
                    objCandDC.ProgramCode = dr["ProgramCode"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("DateOfPassing"))
                {
                    objCandDC.YOP = dr["DateOfPassing"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("HighestEducationLevel"))
                {
                    objCandDC.EducationLevel = dr["HighestEducationLevel"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("PreviousEmployer"))
                {
                    objCandDC.PreviousEmployer = dr["PreviousEmployer"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("HCMSupervisorId"))
                {
                    if (dr["HCMSupervisorId"] != DBNull.Value)
                    {
                        objCandDC.SupervisorId = Convert.ToInt32(dr["HCMSupervisorId"]);
                    }
                }

                if (dsRCData.Tables[1].Columns.Contains("HCMSupervisorName"))
                {
                    objCandDC.SupervisorName = dr["HCMSupervisorName"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("HireStatus"))
                {
                    objCandDC.HireStatus = dr["HireStatus"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("RelevantExperience"))
                {
                    objCandDC.Experience = dr["RelevantExperience"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("CampusLoc1"))
                {
                    objCandDC.CampusLoc1 = dr["CampusLoc1"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("CampusLoc2"))
                {
                    objCandDC.CampusLoc2 = dr["CampusLoc2"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("DateIntimationStatus"))
                {
                    if (dr["DateIntimationStatus"] != DBNull.Value)
                    {
                        objCandDC.CandDIMStatus = Convert.ToInt32(dr["DateIntimationStatus"]);
                    }
                }

                if (dsRCData.Tables[1].Columns.Contains("LocationDesc"))
                {
                    objCandDC.ESAWorkLocation = dr["LocationDesc"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("DOJ"))
                {
                    objCandDC.DOJ = dr["DOJ"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("AddressLine"))
                {
                    objCandDC.CandidateAddress = dr["AddressLine"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("EmailId"))
                {
                    objCandDC.CandidateEmailId = dr["EmailId"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("MobilePhone"))
                {
                    objCandDC.CandidateMobileNo = dr["MobilePhone"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("UGDiscipline"))
                {
                    objCandDC.UGDiscipline = dr["UGDiscipline"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("UGGrade"))
                {
                    objCandDC.UGGrade = dr["UGGrade"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("UGUniversity"))
                {
                    objCandDC.UGUniversity = dr["UGUniversity"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("PGDiscipline"))
                {
                    objCandDC.PGDiscipline = dr["PGDiscipline"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("PGGrade"))
                {
                    objCandDC.PGGrade = dr["PGGrade"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("PGUniversity"))
                {
                    objCandDC.PGUniversity = dr["PGUniversity"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("XMarks"))
                {
                    objCandDC.XMarks = dr["XMarks"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("XIIMarks"))
                {
                    objCandDC.XIIMarks = dr["XIIMarks"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("TaskStatus"))
                {
                    objCandDC.AppFormStatus = dr["TaskStatus"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("StageDescription"))
                {
                    objCandDC.StageDescription = dr["StageDescription"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("BUDescription"))
                {
                    objCandDC.BUDescription = dr["BUDescription"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("Check_CountryID"))
                {
                    objCandDC.Check_CountryID = dr["Check_CountryID"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("RcChosenLocation"))
                {
                    objCandDC.RcChosenLocation = dr["RcChosenLocation"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("HireTypeDes"))
                {
                    objCandDC.HireTypeDes = dr["HireTypeDes"].ToString();
                }

                if (dsRCData.Tables[1].Columns.Contains("UKHRSSFlag"))
                {
                    if (dr["UKHRSSFlag"] != DBNull.Value)
                    {
                        objCandDC.UKHRSSFlag = Convert.ToInt32(dr["UKHRSSFlag"]);
                    }
                }

                objCandDC.TotalCount = int.Parse(dsRCData.Tables[0].Rows[0][0].ToString());
                retCand.Add(objCandDC);
            }

            return retCand;
        }

        /// <summary>
        /// 208099: Method to Fetch Candidate Data
        /// 253297: Modified - Null conditions handled 
        /// 312511: worked for DeferDOJ campus module(India)
        /// </summary>
        /// <param name="candDetail"> Candidate Detail </param>
        /// <returns> returns candidate data </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "0", Justification = "Reviewed."), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1506:AvoidExcessiveClassCoupling", Justification = "Reviewed."), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1505:AvoidUnmaintainableCode", Justification = "Reviewed.")]
        public CandidateTask FetchCandidateData(CandidateDetail candDetail)
        {
            DataSet dsCandidateData;
            List<TaskDetail> ret = new List<TaskDetail>();
            OfferStatusList objList = new OfferStatusList();
            TrainingList objTrainingList = new TrainingList();
            JoiningStatusList objJoiningList = new JoiningStatusList();
            CandidateDetail objDC = new CandidateDetail();
            //// TaskDetail objTask = new TaskDetail();
            CandidateTask objCandidateTask = new CandidateTask();
            ////TaskDetail ret1 = new TaskDetail();
            AssetStatusList objAssetList = new AssetStatusList();
            DimStatusList objDimList = new DimStatusList();
            LocationMasterList objLocationList = new LocationMasterList();
            CampusReportingTimeList objCampusReportingTimeList = new CampusReportingTimeList();

            dsCandidateData = DBHelper.ExecuteDataset("usp_FetchDrillDownData", candDetail);

            /* Task Details */
            if (dsCandidateData.Tables.Count > 0)
            {
                if (dsCandidateData.Tables.Count == 3 && dsCandidateData.Tables[2].Rows.Count > 0)
                {
                    foreach (DataRow drTask in dsCandidateData.Tables[2].Rows)
                    {
                        TaskDetail objTaskDetailDC = new TaskDetail();
                        objTaskDetailDC.Title = drTask["Title"].ToString();
                        objTaskDetailDC.StatusImage = drTask["DetailViewStatusImage"].ToString();
                        objTaskDetailDC.Status = Convert.ToInt16(drTask["Status"]);
                        objTaskDetailDC.TotalRecords = drTask["TotalRecords"] != DBNull.Value ? int.Parse(drTask["TotalRecords"].ToString()) : 0;
                        objTaskDetailDC.RelativeUrl = drTask["RelativeUrl"].ToString();
                        objTaskDetailDC.TaskId = Convert.ToInt16(drTask["TaskID"]);
                        objTaskDetailDC.IsQuerystringrequired = Convert.ToInt16(drTask["IsQuerystringrequired"]);
                        objTaskDetailDC.IsOverlayrequired = Convert.ToInt16(drTask["IsOverlayrequired"]);
                        objTaskDetailDC.CountryID = Convert.ToInt32(drTask["CountryId"]);
                        objTaskDetailDC.ECMDocumentName = drTask["ECMDocumentName"].ToString();
                        objTaskDetailDC.DocumentUploadStatus = Convert.ToInt32(drTask["DocumentUploadStatus"]);
                        objTaskDetailDC.IsECMEnabled = Convert.ToInt16(drTask["IsECMEnabled"]);
                        ret.Add(objTaskDetailDC);
                    }
                }
                else if (dsCandidateData.Tables.Count > 3 && candDetail.CandidateType != 2)
                {
                    if (candDetail.RoleId == "2")
                    {
                        if (dsCandidateData.Tables[3].Rows.Count > 0)
                        {
                            foreach (DataRow drTask in dsCandidateData.Tables[3].Rows)
                            {
                                TaskDetail objTaskDetailDC = new TaskDetail();
                                objTaskDetailDC.Title = drTask["Title"].ToString();
                                objTaskDetailDC.StatusImage = drTask["DetailViewStatusImage"].ToString();
                                objTaskDetailDC.Status = Convert.ToInt16(drTask["Status"]);
                                objTaskDetailDC.TotalRecords = drTask["TotalRecords"] != DBNull.Value ? int.Parse(drTask["TotalRecords"].ToString()) : 0;
                                objTaskDetailDC.RelativeUrl = drTask["RelativeUrl"].ToString();
                                objTaskDetailDC.TaskId = Convert.ToInt16(drTask["TaskID"]);
                                objTaskDetailDC.IsQuerystringrequired = Convert.ToInt16(drTask["IsQuerystringrequired"]);
                                objTaskDetailDC.IsOverlayrequired = Convert.ToInt16(drTask["IsOverlayrequired"]);
                                objTaskDetailDC.CountryID = Convert.ToInt32(drTask["CountryId"]);
                                objTaskDetailDC.ECMDocumentName = drTask["ECMDocumentName"].ToString();
                                objTaskDetailDC.DocumentUploadStatus = Convert.ToInt32(drTask["DocumentUploadStatus"]);
                                objTaskDetailDC.IsECMEnabled = Convert.ToInt16(drTask["IsECMEnabled"]);
                                ret.Add(objTaskDetailDC);
                            }
                        }
                    }
                    else
                    {
                        if (dsCandidateData.Tables[0].Rows[0]["CountryId"].ToString() == "3")
                        {
                            if (dsCandidateData.Tables[2].Rows.Count > 0)
                            {
                                foreach (DataRow drTask in dsCandidateData.Tables[2].Rows)
                                {
                                    TaskDetail objTaskDetailDC = new TaskDetail();
                                    objTaskDetailDC.Title = drTask["Title"].ToString();

                                    objTaskDetailDC.StatusImage = drTask["DetailViewStatusImage"].ToString();
                                    objTaskDetailDC.Status = Convert.ToInt16(drTask["Status"]);
                                    objTaskDetailDC.TotalRecords = drTask["TotalRecords"] != DBNull.Value ? int.Parse(drTask["TotalRecords"].ToString()) : 0;
                                    objTaskDetailDC.RelativeUrl = drTask["RelativeUrl"].ToString();
                                    objTaskDetailDC.TaskId = Convert.ToInt16(drTask["TaskID"]);
                                    objTaskDetailDC.IsQuerystringrequired = Convert.ToInt16(drTask["IsQuerystringrequired"]);
                                    objTaskDetailDC.IsOverlayrequired = Convert.ToInt16(drTask["IsOverlayrequired"]);
                                    objTaskDetailDC.CountryID = Convert.ToInt32(drTask["CountryId"]);
                                    objTaskDetailDC.ECMDocumentName = drTask["ECMDocumentName"].ToString();
                                    objTaskDetailDC.DocumentUploadStatus = Convert.ToInt32(drTask["DocumentUploadStatus"]);
                                    objTaskDetailDC.IsECMEnabled = Convert.ToInt16(drTask["IsECMEnabled"]);
                                    ret.Add(objTaskDetailDC);
                                }
                            }
                        }
                        else
                        {
                            if (dsCandidateData.Tables[3].Rows.Count > 0)
                            {
                                foreach (DataRow drTask in dsCandidateData.Tables[3].Rows)
                                {
                                    TaskDetail objTaskDetailDC = new TaskDetail();
                                    objTaskDetailDC.Title = drTask["Title"].ToString();

                                    objTaskDetailDC.StatusImage = drTask["DetailViewStatusImage"].ToString();
                                    objTaskDetailDC.Status = Convert.ToInt16(drTask["Status"]);
                                    objTaskDetailDC.TotalRecords = drTask["TotalRecords"] != DBNull.Value ? int.Parse(drTask["TotalRecords"].ToString()) : 0;
                                    objTaskDetailDC.RelativeUrl = drTask["RelativeUrl"].ToString();
                                    objTaskDetailDC.TaskId = Convert.ToInt16(drTask["TaskID"]);
                                    objTaskDetailDC.IsQuerystringrequired = Convert.ToInt16(drTask["IsQuerystringrequired"]);
                                    objTaskDetailDC.IsOverlayrequired = Convert.ToInt16(drTask["IsOverlayrequired"]);
                                    objTaskDetailDC.CountryID = Convert.ToInt32(drTask["CountryId"]);
                                    objTaskDetailDC.ECMDocumentName = drTask["ECMDocumentName"].ToString();
                                    objTaskDetailDC.DocumentUploadStatus = Convert.ToInt32(drTask["DocumentUploadStatus"]);
                                    objTaskDetailDC.IsECMEnabled = Convert.ToInt16(drTask["IsECMEnabled"]);
                                    ret.Add(objTaskDetailDC);
                                }
                            }
                        }
                    }
                }
                else if (candDetail.CandidateType == 2)
                {
                    if (dsCandidateData.Tables[5].Rows.Count > 0)
                    {
                        foreach (DataRow drTask in dsCandidateData.Tables[5].Rows)
                        {
                            TaskDetail objTaskDetailDC = new TaskDetail();
                            objTaskDetailDC.Title = drTask["Title"].ToString();
                            objTaskDetailDC.StatusImage = drTask["DetailViewStatusImage"].ToString();
                            objTaskDetailDC.Status = Convert.ToInt16(drTask["Status"]);
                            objTaskDetailDC.TotalRecords = drTask["TotalRecords"] != DBNull.Value ? int.Parse(drTask["TotalRecords"].ToString()) : 0;
                            objTaskDetailDC.RelativeUrl = drTask["RelativeUrl"].ToString();
                            objTaskDetailDC.TaskId = Convert.ToInt16(drTask["TaskID"]);
                            objTaskDetailDC.IsQuerystringrequired = Convert.ToInt16(drTask["IsQuerystringrequired"]);
                            objTaskDetailDC.IsOverlayrequired = Convert.ToInt16(drTask["IsOverlayrequired"]);
                            objTaskDetailDC.CountryID = Convert.ToInt32(drTask["CountryId"]);
                            objTaskDetailDC.ECMDocumentName = drTask["ECMDocumentName"].ToString();
                            objTaskDetailDC.DocumentUploadStatus = Convert.ToInt32(drTask["DocumentUploadStatus"]);
                            objTaskDetailDC.IsECMEnabled = Convert.ToInt16(drTask["IsECMEnabled"]);
                            ret.Add(objTaskDetailDC);
                        }
                    }
                }

                /* Assign Personal Data */
                ////   if (dsRCData.Tables.Contains("Tables[0]"))
                if (dsCandidateData.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in dsCandidateData.Tables[0].Rows)
                    {
                        if (dsCandidateData.Tables[0].Columns.Contains("FName"))
                        {
                            objDC.CandidateFName = dr["FName"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("LName"))
                        {
                            objDC.CandidateLName = dr["LName"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("CandidateId"))
                        {
                            objDC.CandidateId = Convert.ToInt64(dr["CandidateId"]);
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("EmailID"))
                        {
                            objDC.CandidateEmailId = dr["EmailID"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("Mobile"))
                        {
                            objDC.CandidateMobileNo = dr["Mobile"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("Address"))
                        {
                            objDC.CandidateAddress = dr["Address"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("LevelOfHire"))
                        {
                            objDC.LevelOfHire = dr["LevelOfHire"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("Department"))
                        {
                            objDC.DepartmentName = dr["Department"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("RecruiterID"))
                        {
                            objDC.RecruiterName = dr["RecruiterID"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("SeatNumber"))
                        {
                            if (dr["SeatNumber"] != DBNull.Value)
                            {
                                objDC.CandSeatNo = dr["SeatNumber"].ToString();
                            }
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("DOJ"))
                        {
                            objDC.CandidateDOJ = Convert.ToDateTime(dr["DOJ"]).ToShortDateString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("ConvenientTime"))
                        {
                            objDC.ConvenientTimeToReach = Convert.ToInt16(dr["ConvenientTime"]);
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("OfferStatus"))
                        {
                            objDC.CandidateOfferStatus = Convert.ToInt16(dr["OfferStatus"]);
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("MailStatus"))
                        {
                            objDC.WelcomeMailStatus = dr["MailStatus"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("IsAccessAllowed"))
                        {
                            objDC.IsAccessAllowed = dr["IsAccessAllowed"] != DBNull.Value ? Convert.ToBoolean(dr["IsAccessAllowed"]) : false;
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("CountryID"))
                        {
                            objDC.CountryID = dr["CountryID"] != DBNull.Value ? Convert.ToInt16(dr["CountryID"].ToString()) : 0;
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("ProcessID"))
                        {
                            objDC.ProcessID = dr["ProcessID"] != DBNull.Value ? Convert.ToInt16(dr["ProcessID"].ToString()) : 0;
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("CurrentDate"))
                        {
                            objDC.CurrentDate = dr["CurrentDate"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("Today"))
                        {
                            objDC.Today = dr["Today"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("HMComment"))
                        {
                            objDC.RCComment = dr["HMComment"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("ShowUpdateDiv"))
                        {
                            objDC.ShowUpdateDiv = Convert.ToInt16(dr["ShowUpdateDiv"]);
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("AssociateID"))
                        {
                            objDC.AssociateId = Convert.ToInt32(dr["AssociateID"]);
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("CountryId"))
                        {
                            objDC.CountryID = Convert.ToInt32(dr["CountryId"]);
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("JoiningStatus"))
                        {
                            objDC.CandidateJoiningStatus = Convert.ToInt16(dr["JoiningStatus"]);
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("TrainingId"))
                        {
                            objDC.TrainingId = Convert.ToInt16(dr["TrainingId"]);
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("Jobcode"))
                        {
                            objDC.Jobcode = dr["Jobcode"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("DesignationDesc"))
                        {
                            objDC.JobDescription = dr["DesignationDesc"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("Gender"))
                        {
                            objDC.Gender = dr["Gender"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("CandidateName"))
                        {
                            objDC.AssociateName = dr["CandidateName"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("LoginId"))
                        {
                            objDC.LoginId = dr["LoginId"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("CountryName"))
                        {
                            objDC.CountryName = dr["CountryName"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("StateDescription"))
                        {
                            objDC.StateDescription = dr["StateDescription"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("CityDesc"))
                        {
                            objDC.CityName = dr["CityDesc"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("Grade"))
                        {
                            objDC.GradeDescription = dr["Grade"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("HCMSupervisorId"))
                        {
                            if (dr["HCMSupervisorId"] != DBNull.Value)
                            {
                                objDC.SupervisorId = Convert.ToInt32(dr["HCMSupervisorId"]);
                            }
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("HCMSupervisorName"))
                        {
                            if (dr["HCMSupervisorName"] != DBNull.Value)
                            {
                                objDC.SupervisorName = dr["HCMSupervisorName"].ToString();
                            }
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("CandidateType"))
                        {
                            if (dr["CandidateType"] != DBNull.Value)
                            {
                                objDC.CandidateType = Convert.ToInt32(dr["CandidateType"]);
                            }
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("CampusJoiningVenue"))
                        {
                            if (dr["CampusJoiningVenue"] != DBNull.Value)
                            {
                                objDC.CampusJoiningVenue = dr["CampusJoiningVenue"].ToString();
                            }
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("CampusReportingTime"))
                        {
                            if (dr["CampusReportingTime"] != DBNull.Value)
                            {
                                objDC.CampusReportingTime = dr["CampusReportingTime"].ToString();
                            }
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("DateIntimationStatus"))
                        {
                            if (dr["DateIntimationStatus"] != DBNull.Value)
                            {
                                objDC.CandDIMStatus = Convert.ToInt16(dr["DateIntimationStatus"]);
                            }
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("CampusJoiningLocation"))
                        {
                            if (dr["CampusJoiningLocation"] != DBNull.Value)
                            {
                                objDC.CampusJoiningLocation = Convert.ToInt32(dr["CampusJoiningLocation"]);
                            }
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("CampusReportingTime"))
                        {
                            if (dr["CampusReportingTime"] != DBNull.Value)
                            {
                                objDC.CampusReportingTime = dr["CampusReportingTime"].ToString();
                            }
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("MailDimStatus"))
                        {
                            if (dr["MailDimStatus"] != DBNull.Value)
                            {
                                objDC.DimMailerStatus = dr["MailDimStatus"].ToString();
                            }
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("AssetApproval"))
                        {
                            if (dr["AssetApproval"] != DBNull.Value)
                            {
                                objDC.AssetApproval = Convert.ToInt16(dr["AssetApproval"]);
                            }
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("AssetApprovalFlag"))
                        {
                            if (dr["AssetApprovalFlag"] != DBNull.Value)
                            {
                                objDC.AssetApprovalFlag = Convert.ToInt16(dr["AssetApprovalFlag"]);
                            }
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("ManCountryID"))
                        {
                            if (dr["ManCountryID"] != DBNull.Value)
                            {
                                objDC.ManilaCountryId = dr["ManCountryID"].ToString();
                            }
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("Tasksubstatus"))
                        {
                            objDC.Tasksubstatus = Convert.ToInt16(dr["Tasksubstatus"]);
                        }
                    }
                }

                if (objDC.CountryID == 3 && candDetail.ProcessID != 2 && candDetail.CandidateType == 1)
                {
                    if (dsCandidateData.Tables[3].Rows.Count > 0)
                    {
                        foreach (DataRow drdashboard in dsCandidateData.Tables[3].Rows)
                        {
                            if (dsCandidateData.Tables[3].Columns.Contains("RecruiterId"))
                            {
                                objDC.RecruiterID = Convert.ToInt32(drdashboard["RecruiterId"]);
                            }

                            if (dsCandidateData.Tables[3].Columns.Contains("RecruiterName"))
                            {
                                objDC.RecruiterName = drdashboard["RecruiterName"].ToString();
                            }

                            if (dsCandidateData.Tables[3].Columns.Contains("RecruiterMobileNumber"))
                            {
                                objDC.RecruiterMobileNo = drdashboard["RecruiterMobileNumber"].ToString();
                            }

                            if (dsCandidateData.Tables[3].Columns.Contains("RecruiterVnetNumber"))
                            {
                                objDC.RecruiterVnetNo = drdashboard["RecruiterVnetNumber"].ToString();
                            }

                            if (dsCandidateData.Tables[3].Columns.Contains("ESAHiringManagerId"))
                            {
                                objDC.ESAHiringManagerID = Convert.ToInt32(drdashboard["ESAHiringManagerId"]);
                            }

                            if (dsCandidateData.Tables[3].Columns.Contains("ESAHiringManagerName"))
                            {
                                objDC.ESAHiringManagerName = drdashboard["ESAHiringManagerName"].ToString();
                            }

                            if (dsCandidateData.Tables[3].Columns.Contains("ESAHiringManagerMobileNumber"))
                            {
                                objDC.ESAHiringManagerMobileNo = drdashboard["ESAHiringManagerMobileNumber"].ToString();
                            }

                            if (dsCandidateData.Tables[3].Columns.Contains("ESAHiringManagerVnetNumber"))
                            {
                                objDC.ESAHiringManagerVnetNo = drdashboard["ESAHiringManagerVnetNumber"].ToString();
                            }
                        }
                    }
                }

                ////Showing Asset status details for US & UK
                if ((dsCandidateData.Tables.Count > 3) && (objDC.CountryID != 3))
                {
                    if (dsCandidateData.Tables[2].Rows.Count > 0)
                    {
                        foreach (DataRow dr in dsCandidateData.Tables[2].Rows)
                        {
                            AssetStatusDC assetStatus = new AssetStatusDC();
                            if (dsCandidateData.Tables[2].Columns.Contains("AssetType"))
                            {
                                assetStatus.AssetType = dr["AssetType"].ToString();
                            }

                            if (dsCandidateData.Tables[2].Columns.Contains("Status"))
                            {
                                assetStatus.AssetStatusDesc = dr["Status"].ToString();
                            }

                            if (dsCandidateData.Tables[2].Columns.Contains("Comments"))
                            {
                                assetStatus.Comments = dr["Comments"].ToString();
                            }

                            objAssetList.Add(assetStatus);
                        }
                    }
                }

                /*Assign Div */
                if (dsCandidateData.Tables.Count >= 2 && dsCandidateData.Tables[1].Rows.Count > 0 && candDetail.CandidateType != 2)
                {
                    foreach (DataRow drStatus in dsCandidateData.Tables[1].Rows)
                    {
                        if (candDetail.ProcessID == 1)
                        {
                            if (dsCandidateData.Tables[1].Columns.Contains("Status"))
                            {
                                OfferStatusDC objStatusMaster = new OfferStatusDC();
                                objStatusMaster.OfferStatusCode = drStatus["StatusCode"] != DBNull.Value ? int.Parse(drStatus["StatusCode"].ToString()) : 0;
                                objStatusMaster.OfferStatusDesc = drStatus["Status"].ToString();
                                objList.Add(objStatusMaster);
                            }
                        }

                        if (dsCandidateData.Tables[1].Columns.Contains("TrainingId"))
                        {
                            NewHireTrainingDC objTrainingDC = new NewHireTrainingDC();
                            objTrainingDC.TrainingId = drStatus["TrainingId"] != DBNull.Value ? int.Parse(drStatus["TrainingId"].ToString()) : 0;
                            objTrainingDC.TrainingScheduledDate = drStatus["TrainingScheduledDate"].ToString();
                            objTrainingList.Add(objTrainingDC);
                        }
                        else if (candDetail.ProcessID == 2 && objDC.CountryID == 3)
                        {
                            if (dsCandidateData.Tables[1].Columns.Contains("Status"))
                            {
                                JoiningStatusDC objJoiningMaster = new JoiningStatusDC();
                                objJoiningMaster.JoiningStatusCode = drStatus["StatusCode"] != DBNull.Value ? int.Parse(drStatus["StatusCode"].ToString()) : 0;
                                objJoiningMaster.JoiningStatusDesc = drStatus["Status"].ToString();
                                objJoiningList.Add(objJoiningMaster);
                            }
                        }
                    }
                }

                ////Showing photo upload status for India HRSS Dashboard
                if (dsCandidateData.Tables.Count == 4 && objDC.CountryID == 3 && candDetail.ProcessID == 1)
                {
                    if (dsCandidateData.Tables[2].Rows.Count > 0)
                    {
                        foreach (DataRow drStatus in dsCandidateData.Tables[2].Rows)
                        {
                            if (dsCandidateData.Tables[2].Columns.Contains("Description"))
                            {
                                objDC.FileUploadStatusDesc = drStatus["Description"].ToString();
                            }
                        }
                    }
                }

                ////312511:Dim Status implemented for India RC & HRSS Dashboard campus module
                if ((candDetail.CandidateType == 2) && (objDC.CountryID != 4))
                {
                    if (candDetail.ProcessID == 1)
                    {
                        if (dsCandidateData.Tables[1].Rows.Count > 0)
                        {
                            foreach (DataRow drStatus in dsCandidateData.Tables[1].Rows)
                            {
                                if (dsCandidateData.Tables[1].Columns.Contains("Status"))
                                {
                                    OfferStatusDC objStatusMaster = new OfferStatusDC();
                                    objStatusMaster.OfferStatusCode = drStatus["StatusCode"] != DBNull.Value ? int.Parse(drStatus["StatusCode"].ToString()) : 0;
                                    objStatusMaster.OfferStatusDesc = drStatus["Status"].ToString();
                                    objList.Add(objStatusMaster);
                                }
                            }
                        }

                        if (dsCandidateData.Tables[2].Rows.Count > 0)
                        {
                            DimStatusDC objDimMaster = new DimStatusDC();
                            objDimMaster.DimStatusCode = -1;
                            objDimMaster.DimStatusDesc = "--------Select--------";
                            objDimList.Insert(0, objDimMaster);
                            foreach (DataRow drStatus in dsCandidateData.Tables[2].Rows)
                            {
                                if (dsCandidateData.Tables[2].Columns.Contains("Status"))
                                {
                                    objDimMaster = new DimStatusDC();
                                    objDimMaster.DimStatusCode = drStatus["StatusCode"] != DBNull.Value ? int.Parse(drStatus["StatusCode"].ToString()) : 0;
                                    objDimMaster.DimStatusDesc = drStatus["Status"].ToString();
                                    objDimList.Add(objDimMaster);
                                }
                            }
                        }

                        if (dsCandidateData.Tables[3].Rows.Count > 0)
                        {
                            LocationDC objLocationMaster = new LocationDC();
                            objLocationMaster.LocationCode = -1;
                            objLocationMaster.LocationDesc = "-------Select-------";
                            objLocationList.Insert(0, objLocationMaster);
                            foreach (DataRow drStatus in dsCandidateData.Tables[3].Rows)
                            {
                                if (dsCandidateData.Tables[3].Columns.Contains("Status"))
                                {
                                    objLocationMaster = new LocationDC();
                                    objLocationMaster.LocationCode = drStatus["StatusCode"] != DBNull.Value ? int.Parse(drStatus["StatusCode"].ToString()) : 0;
                                    objLocationMaster.LocationDesc = drStatus["Status"].ToString();
                                    objLocationList.Add(objLocationMaster);
                                }
                            }
                        }

                        if (dsCandidateData.Tables[4].Rows.Count > 0)
                        {
                            CampusReportingTimeDC objCampusReportingTime = new CampusReportingTimeDC();
                            objCampusReportingTime.ReportingTimeCode = -1;
                            objCampusReportingTime.ReportingTimeDesc = "--Select--";
                            objCampusReportingTimeList.Insert(0, objCampusReportingTime);
                            foreach (DataRow drStatus in dsCandidateData.Tables[4].Rows)
                            {
                                if (dsCandidateData.Tables[4].Columns.Contains("Status"))
                                {
                                    objCampusReportingTime = new CampusReportingTimeDC();
                                    objCampusReportingTime.ReportingTimeCode = drStatus["StatusCode"] != DBNull.Value ? int.Parse(drStatus["StatusCode"].ToString()) : 0;
                                    objCampusReportingTime.ReportingTimeDesc = drStatus["Status"].ToString();
                                    objCampusReportingTimeList.Add(objCampusReportingTime);
                                }
                            }
                        }
                    }
                    else if (candDetail.ProcessID == 2)
                    {
                        if (dsCandidateData.Tables[1].Rows.Count > 0)
                        {
                            foreach (DataRow drStatus in dsCandidateData.Tables[1].Rows)
                            {
                                if (dsCandidateData.Tables[1].Columns.Contains("Status"))
                                {
                                    JoiningStatusDC objJoiningMaster = new JoiningStatusDC();
                                    objJoiningMaster.JoiningStatusCode = drStatus["StatusCode"] != DBNull.Value ? int.Parse(drStatus["StatusCode"].ToString()) : 0;
                                    objJoiningMaster.JoiningStatusDesc = drStatus["Status"].ToString();
                                    objJoiningList.Add(objJoiningMaster);
                                }
                            }
                        }
                    }
                }

                ////Joing status for NA
                if (candDetail.RoleId == "1" || candDetail.RoleId == "2")
                {
                    if (((objDC.CountryID == 1) || (objDC.CountryID == 2)) && (candDetail.ProcessID == 1))
                    {
                        if (dsCandidateData.Tables[4].Rows.Count > 0)
                        {
                            JoiningStatusDC objJoiningMaster = new JoiningStatusDC();
                            objJoiningMaster.JoiningStatusCodeNA = -1;
                            objJoiningMaster.JoiningStatusDescNA = "-Select-";
                            objJoiningList.Insert(0, objJoiningMaster);
                            foreach (DataRow drStatus in dsCandidateData.Tables[4].Rows)
                            {
                                if (dsCandidateData.Tables[4].Columns.Contains("Status"))
                                {
                                    objJoiningMaster = new JoiningStatusDC();
                                    objJoiningMaster.JoiningStatusCodeNA = drStatus["StatusCode"] != DBNull.Value ? int.Parse(drStatus["StatusCode"].ToString()) : 0;
                                    objJoiningMaster.JoiningStatusDescNA = drStatus["Status"].ToString();
                                    objJoiningList.Add(objJoiningMaster);
                                }
                            }
                        }
                    }
                }

                objCandidateTask.CandidateDetails = new CandidateDetail();
                objCandidateTask.OfferStatusMaster = objList;
                objCandidateTask.CandidateDetails = objDC;
                objCandidateTask.TaskDetails = ret;
                objCandidateTask.JoiningStatusMaster = objJoiningList;
                objCandidateTask.TrainingList = objTrainingList;
                objCandidateTask.AssetStatusMaster = objAssetList;
                objCandidateTask.DimStatusMaster = objDimList;
                objCandidateTask.LocationMaster = objLocationList;
                objCandidateTask.CampusReportingTimeMaster = objCampusReportingTimeList;
            }

            return objCandidateTask;
        }

        /// <summary>
        /// 195514: To Fetch NA / UK NSS Data
        /// </summary>
        /// <param name="candDetail"> Candidate Detail </param>
        /// <returns> returns UK and NA NSS data </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Maintainability", "CA1505:AvoidUnmaintainableCode", Justification = "Reviewed.")]
        public CandidateTask FetchNSSCandidateData(CandidateDetail candDetail)
        {
            DataSet dsCandidateData;
            List<TaskDetail> ret = new List<TaskDetail>();
            OfferStatusList objList = new OfferStatusList();
            JoiningStatusList objJoiningList = new JoiningStatusList();
            AssetStatusList objAssetList = new AssetStatusList();
            CandAssetStatusList objCandAssetList = new CandAssetStatusList();
            CandidateDetail objDC = new CandidateDetail();
            ////TaskDetail objTask = new TaskDetail();
            CandidateTask objCandidateTask = new CandidateTask();
            ////TaskDetail ret1 = new TaskDetail();
            AssetStatusList objCandAssetCommentList = new AssetStatusList();

            dsCandidateData = DBHelper.ExecuteDataset("usp_FetchNSSDrillDownData", candDetail);
            /* Task Details */
            if (dsCandidateData.Tables.Count > 0)
            {
                if (dsCandidateData.Tables.Count > 3)
                {
                    if (dsCandidateData.Tables[3].Rows.Count > 0)
                    {
                        foreach (DataRow drTask in dsCandidateData.Tables[3].Rows)
                        {
                            TaskDetail objTaskDetailDC = new TaskDetail();
                            objTaskDetailDC.RelativeUrl = drTask["RelativeUrl"].ToString();
                            objTaskDetailDC.TaskId = Convert.ToInt16(drTask["TaskID"]);
                            objTaskDetailDC.Title = drTask["Title"].ToString();
                            objTaskDetailDC.StatusImage = drTask["DetailViewStatusImage"].ToString();
                            objTaskDetailDC.Status = Convert.ToInt16(drTask["Status"]);
                            objTaskDetailDC.TotalRecords = drTask["TotalRecords"] != DBNull.Value ? int.Parse(drTask["TotalRecords"].ToString()) : 0;
                            objTaskDetailDC.ECMDocumentName = drTask["ECMDocumentName"].ToString();
                            objTaskDetailDC.DocumentUploadStatus = Convert.ToInt32(drTask["DocumentUploadStatus"]);
                            objTaskDetailDC.IsECMEnabled = Convert.ToInt16(drTask["IsECMEnabled"]);
                            ////objTaskDetailDC.IsLinkEnable = drTask["IsLinkEnable"] != DBNull.Value ? int.Parse(drTask["IsLinkEnable"].ToString()) : 0;
                            ret.Add(objTaskDetailDC);
                        }
                    }
                }

                /* Assign Personal Data */
                //// if (dsRCData.Tables.Contains("Tables[0]"))
                if (dsCandidateData.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in dsCandidateData.Tables[0].Rows)
                    {
                        if (dsCandidateData.Tables[0].Columns.Contains("FName"))
                        {
                            objDC.CandidateFName = dr["FName"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("LName"))
                        {
                            objDC.CandidateLName = dr["LName"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("CandidateId"))
                        {
                            objDC.CandidateId = Convert.ToInt64(dr["CandidateId"]);
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("EmailID"))
                        {
                            objDC.CandidateEmailId = dr["EmailID"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("Mobile"))
                        {
                            objDC.CandidateMobileNo = dr["Mobile"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("Address"))
                        {
                            objDC.CandidateAddress = dr["Address"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("LevelOfHire"))
                        {
                            objDC.LevelOfHire = dr["LevelOfHire"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("ShippingAddress"))
                        {
                            objDC.ShippingAddress = dr["ShippingAddress"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("Department"))
                        {
                            objDC.DepartmentName = dr["Department"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("RecruiterID"))
                        {
                            objDC.RecruiterName = dr["RecruiterID"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("SeatNo"))
                        {
                            objDC.CandSeatNo = dr["SeatNo"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("DOJ"))
                        {
                            objDC.CandidateDOJ = Convert.ToDateTime(dr["DOJ"]).ToShortDateString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("ConvenientTime"))
                        {
                            objDC.ConvenientTimeToReach = Convert.ToInt16(dr["ConvenientTime"]);
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("OfferStatus"))
                        {
                            objDC.CandidateOfferStatus = Convert.ToInt16(dr["OfferStatus"]);
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("MailStatus"))
                        {
                            objDC.WelcomeMailStatus = dr["MailStatus"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("IsAccessAllowed"))
                        {
                            objDC.IsAccessAllowed = dr["IsAccessAllowed"] != DBNull.Value ? Convert.ToBoolean(dr["IsAccessAllowed"]) : false;
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("CountryID"))
                        {
                            objDC.CountryID = dr["CountryID"] != DBNull.Value ? Convert.ToInt16(dr["CountryID"].ToString()) : 0;
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("ProcessID"))
                        {
                            objDC.ProcessID = dr["ProcessID"] != DBNull.Value ? Convert.ToInt16(dr["ProcessID"].ToString()) : 0;
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("ShowUpdateDiv"))
                        {
                            objDC.ShowUpdateDiv = Convert.ToInt16(dr["ShowUpdateDiv"]);
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("AssociateID"))
                        {
                            objDC.AssociateId = Convert.ToInt32(dr["AssociateID"]);
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("CountryId"))
                        {
                            objDC.CountryID = Convert.ToInt32(dr["CountryId"]);
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("JoiningStatus"))
                        {
                            objDC.CandidateJoiningStatus = Convert.ToInt16(dr["JoiningStatus"]);
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("NSSChosenLocation"))
                        {
                            objDC.NSSChosenLocation = dr["NSSChosenLocation"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("RoleDetailId"))
                        {
                            objDC.RoleDetailId = dr["RoleDetailId"].ToString();
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("EnableEdit"))
                        {
                            if (Convert.ToInt16(dr["EnableEdit"]) == 0)
                            {
                                objDC.EnableEdit = -1;
                            }
                            else
                            {
                                objDC.EnableEdit = Convert.ToInt16(dr["EnableEdit"]);
                            }
                        }

                        if (dsCandidateData.Tables[0].Columns.Contains("CEFlag"))
                        {
                            objDC.CEFlag = dr["CEFlag"].ToString();
                        }
                       
                    }
                }

                ////Asset details data for US
                if (dsCandidateData.Tables.Count >= 2 && dsCandidateData.Tables[1].Rows.Count > 0)
                {
                    foreach (DataRow drStatus in dsCandidateData.Tables[1].Rows)
                    {
                        if (dsCandidateData.Tables[1].Columns.Contains("Status"))
                        {
                            AssetStatusDC objAssetMaster = new AssetStatusDC();
                            objAssetMaster.AssetStatusCode = drStatus["StatusCode"] != DBNull.Value ? int.Parse(drStatus["StatusCode"].ToString()) : 0;
                            objAssetMaster.AssetStatusDesc = drStatus["Status"].ToString();
                            objAssetList.Add(objAssetMaster);
                        }
                    }
                }

                ////Asset details data for US
                if (dsCandidateData.Tables.Count >= 3 && dsCandidateData.Tables[2].Rows.Count > 0)
                {
                    foreach (DataRow drStatus in dsCandidateData.Tables[2].Rows)
                    {
                        if (dsCandidateData.Tables[2].Columns.Contains("Status"))
                        {
                            CandAssetStatusDC objCandAssetMaster = new CandAssetStatusDC();
                            objCandAssetMaster.AssetStatusCode = drStatus["StatusCode"] != DBNull.Value ? int.Parse(drStatus["StatusCode"].ToString()) : 0;
                            objCandAssetMaster.AssetStatusDesc = drStatus["Status"].ToString();
                            objCandAssetMaster.AssetType = drStatus["AssetType"].ToString();
                            objCandAssetMaster.AssetTrackingID = drStatus["RequestTrackingID"] != DBNull.Value ? int.Parse(drStatus["RequestTrackingID"].ToString()) : 0;
                            objCandAssetMaster.Comments = drStatus["comments"].ToString();
                            objCandAssetMaster.FedEx = drStatus["fedex"].ToString();
                            objCandAssetMaster.DeliveryDate = drStatus["deliverydate"] != DBNull.Value ? Convert.ToDateTime(drStatus["deliverydate"]).ToShortDateString() : string.Empty; ////Convert.ToDateTime(drStatus["deliverydate"]).ToShortDateString();
                            objCandAssetList.Add(objCandAssetMaster);
                        }
                    }
                }

                //// 312539
                //// Asset details data for US
                if (dsCandidateData.Tables[4].Rows.Count > 0)
                {
                    foreach (DataRow dr in dsCandidateData.Tables[4].Rows)
                    {
                        if (dsCandidateData.Tables[4].Columns.Contains("LapTopApproverDetails"))
                        {
                            objDC.LapTopApproverDetails = dr["LapTopApproverDetails"].ToString();
                        }
                    }
                }

                if (dsCandidateData.Tables[5].Rows.Count > 0)
                {
                    foreach (DataRow dr in dsCandidateData.Tables[5].Rows)
                    {
                        if (dsCandidateData.Tables[5].Columns.Contains("BlacberryApproverDetails"))
                        {
                            objDC.BlacberryApproverDetails = dr["BlacberryApproverDetails"].ToString();
                        }
                    }
                }

                if (dsCandidateData.Tables[6].Rows.Count > 0)
                {
                    foreach (DataRow dr in dsCandidateData.Tables[6].Rows)
                    {
                        if (dsCandidateData.Tables[6].Columns.Contains("CellPhoneApproverDetails"))
                        {
                            objDC.CellPhoneApproverDetails = dr["CellPhoneApproverDetails"].ToString();
                        }
                    }
                }

                if (dsCandidateData.Tables[7].Rows.Count > 0)
                {
                    foreach (DataRow dr in dsCandidateData.Tables[7].Rows)
                    {
                        if (dsCandidateData.Tables[7].Columns.Contains("DataCardApproverDetails"))
                        {
                            objDC.CellPhoneApproverDetails = dr["DataCardApproverDetails"].ToString();
                        }

                        if (dsCandidateData.Tables[7].Columns.Contains("ContractorEquipmentApproverDetails"))
                        {
                            objDC.ContractorEquipmentApproverDetails = dr["ContractorEquipmentApproverDetails"].ToString();
                        }
                    }
                }

                ////if (dsCandidateData.Tables[7].Rows.Count > 0)
                ////{
                ////    foreach (DataRow dr in dsCandidateData.Tables[6].Rows)
                ////    {
                ////        if (dsCandidateData.Tables[6].Columns.Contains("ContractorEquipmentApproverDetails"))
                ////        {
                ////            objDC.ContractorEquipmentApproverDetails = dr["ContractorEquipmentApproverDetails"].ToString();
                ////        }
                ////    }
                ////}

                ////305054
                if (dsCandidateData.Tables[8].Rows.Count > 0)
                {
                    foreach (DataRow dr in dsCandidateData.Tables[8].Rows)
                    {
                        AssetStatusDC objAssetComments = new AssetStatusDC();
                        if (dsCandidateData.Tables[8].Columns.Contains("LTCommentsLog"))
                        {
                            objAssetComments.LTCommentsLog = dr["LTCommentsLog"].ToString();
                        }

                        if (dsCandidateData.Tables[8].Columns.Contains("BBCommentsLog"))
                        {
                            objAssetComments.BBCommentsLog = dr["BBCommentsLog"].ToString();
                        }

                        if (dsCandidateData.Tables[8].Columns.Contains("CPCommentsLog"))
                        {
                            objAssetComments.CPCommentsLog = dr["CPCommentsLog"].ToString();
                        }

                        if (dsCandidateData.Tables[8].Columns.Contains("IrelandCommentsFlag"))
                        {
                            objAssetComments.IrelandCommentsFlag = Convert.ToInt16(dr["IrelandCommentsFlag"]);
                        }

                        objCandAssetCommentList.Add(objAssetComments);
                    }
                }

                if (dsCandidateData.Tables[9].Rows.Count > 0)
                {
                    foreach (DataRow dr in dsCandidateData.Tables[9].Rows)
                    {
                        if (dsCandidateData.Tables[9].Columns.Contains("SmartphoneApproverDetails"))
                        {
                            objDC.SmartphoneApproverDetails = dr["SmartphoneApproverDetails"].ToString();
                        }
                    }
                }

                ////*Assign Div */
                ////if (dsCandidateData.Tables.Count >= 2 && dsCandidateData.Tables[1].Rows.Count > 0)
                ////{
                ////    foreach (DataRow drStatus in dsCandidateData.Tables[1].Rows)
                ////    {
                ////        if (candDetail.ProcessID == 1)
                ////        {
                ////            OfferStatusDC objStatusMaster = new OfferStatusDC();
                ////            if (dsCandidateData.Tables[1].Columns.Contains("Status"))
                ////            {
                ////                objStatusMaster.OfferStatusCode = drStatus["StatusCode"] != DBNull.Value ? int.Parse(drStatus["StatusCode"].ToString()) : 0;
                ////                objStatusMaster.OfferStatusDesc = drStatus["Status"].ToString();
                ////                objList.Add(objStatusMaster);
                ////            }
                ////        }
                ////        else if ((candDetail.ProcessID == 2) && (objDC.CountryID == 3))
                ////        {
                ////            if (dsCandidateData.Tables[1].Columns.Contains("Status"))
                ////            {
                ////                JoiningStatusDC objJoiningMaster = new JoiningStatusDC();
                ////                objJoiningMaster.JoiningStatusCode = drStatus["StatusCode"] != DBNull.Value ? int.Parse(drStatus["StatusCode"].ToString()) : 0;
                ////                objJoiningMaster.JoiningStatusDesc = drStatus["Status"].ToString();
                ////                objJoiningList.Add(objJoiningMaster);
                ////            }
                ////        }
                ////    }
                ////}

                objCandidateTask.CandidateDetails = new CandidateDetail();
                objCandidateTask.OfferStatusMaster = objList;
                objCandidateTask.CandidateDetails = objDC;
                objCandidateTask.TaskDetails = ret;
                objCandidateTask.JoiningStatusMaster = objJoiningList;
                objCandidateTask.AssetStatusMaster = objAssetList;
                objCandidateTask.CandAssetStatus = objCandAssetList;
                objCandidateTask.AssetComments = objCandAssetCommentList;
            }

            return objCandidateTask;
        }

        /// <summary>
        /// 195514: Method to update Candidate Asset Details
        /// </summary>
        /// <param name="candAssetList"> Candidate detail are provided to do update parameters like EDOJ , Offer status , Email Id </param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "0", Justification = "Reviewed."), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public void UpdateNSSAssetDetails(CandAssetStatusList candAssetList)
        {
            try
            {
                foreach (CandAssetStatusDC objCandAsset in candAssetList)
                {
                    DBHelper.ExecuteNonQuery("usp_UpdateNssCandidateAssetInfo", objCandAsset);
                }
            }
            catch
            {
                throw;
            }
        }

        /// <summary>
        /// 208099: Method to update Candidate Details
        /// 253297: Modified - update the below mentioned fields 
        /// </summary>
        /// <param name="candDetail"> Candidate detail are provided to do update parameters like EDOJ , Offer status , Email Id </param>
        public void UpdateCandidateDetails(CandidateDetail candDetail)
        {
            DBHelper.ExecuteNonQuery("usp_UpdateCandidateInfo", candDetail);
        }

        /// <summary>
        /// 253297 : Method to unlock Access of candidate 
        /// </summary>
        /// <param name="candDetail"> CandidateId is passed and country id is passed </param>
        public void UnlockCandidateAccess(CandidateDetail candDetail)
        {
            DBHelper.ExecuteNonQuery("usp_UnlockCandidateAccess", candDetail);
        }

        /// <summary>
        /// To get location mapped for particular RC  -  RC dashBoard
        /// </summary>
        /// <param name="dashboardData"> dashboard Data </param>
        /// <returns> returns location list for RC </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public DashBoardDataList GetWorkLocation(DashboardDataDC dashboardData)
        {
            DataSet dsWorkLocation;
            DashBoardDataList objDashboardData = new DashBoardDataList();
            dsWorkLocation = DBHelper.ExecuteDataset("usp_GetWorkLocation", dashboardData);
            if (dsWorkLocation != null && dsWorkLocation.Tables.Count > 0)
            {
                if (dsWorkLocation.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in dsWorkLocation.Tables[0].Rows)
                    {
                        DashboardDataDC objDashboardDC = new DashboardDataDC();
                        objDashboardDC.CountryID = dr["CountryID"] != DBNull.Value ? Convert.ToInt16(dr["CountryID"].ToString()) : 0;
                        objDashboardDC.CityId = dr["CityId"] != DBNull.Value ? Convert.ToInt32(dr["CityId"].ToString()) : 0;
                        objDashboardDC.StateId = dr["StateId"] != DBNull.Value ? Convert.ToInt16(dr["StateId"].ToString()) : 0;
                        objDashboardDC.CountryCityDesc = dr["Description"].ToString();
                        objDashboardData.Add(objDashboardDC);
                    }
                }
                else
                {
                    DashboardDataDC objDashboardDC = new DashboardDataDC();
                    objDashboardDC.CountryCityDesc = "-----------Select-----------";
                    objDashboardDC.CountryID = -1;
                    objDashboardDC.CityId = -1;
                    objDashboardDC.StateId = -1;
                    objDashboardData.Add(objDashboardDC);
                }
            }

            return objDashboardData;
        }

        /// <summary>
        /// 312511 : Method to fetch mapped country for HRSS dashBoard
        /// </summary>
        /// <param name="dashboardData"> dashboard Data </param>
        /// <returns> country list for HRSS </returns> 
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public DashBoardDataList GetHRSSMappedCountry(DashboardDataDC dashboardData)
        {
            DataSet dsHRSSData;
            DashBoardDataList objDashboardData = new DashBoardDataList();
            dsHRSSData = DBHelper.ExecuteDataset("usp_GetCountryForHRSS", dashboardData);
            if (dsHRSSData != null && dsHRSSData.Tables.Count > 0)
            {
                if (dsHRSSData.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in dsHRSSData.Tables[0].Rows)
                    {
                        DashboardDataDC objDashboardDC = new DashboardDataDC();
                        objDashboardDC.CountryName = dr["CountryName"].ToString();
                        objDashboardDC.CountryID = dr["CountryID"] != DBNull.Value ? Convert.ToInt16(dr["CountryID"].ToString()) : 0;
                        objDashboardData.Add(objDashboardDC);
                    }
                }
                else
                {
                    DashboardDataDC objDashboardDC = new DashboardDataDC();
                    objDashboardDC.CountryName = "-----------Select-----------";
                    objDashboardDC.CountryID = -1;
                    objDashboardData.Add(objDashboardDC);
                }
            }

            return objDashboardData;
        }

        /// <summary>
        /// To get location for NSS Dashboard (Equipment Select Box - added : 312539)
        /// </summary>
        /// <param name="candidateDetail"> candidate detail </param>
        /// <returns> Equipment list </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList Equipment(CandidateDetail candidateDetail)
        {
            DataSet dsForcatsData;
            CandidateDetailList retCand = new CandidateDetailList();
            dsForcatsData = DBHelper.ExecuteDataset("usp_GetForecastDashBoardData", candidateDetail);
            if (dsForcatsData.Tables[3].Rows.Count > 0)
            {
                foreach (DataRow dr in dsForcatsData.Tables[3].Rows)
                {
                    CandidateDetail objCandDC = new CandidateDetail();
                    if (dsForcatsData.Tables[3].Columns.Contains("CDescription"))
                    {
                        objCandDC.CodeId = dr["CCodeId"].ToString();
                        objCandDC.CDescription = dr["CDescription"].ToString();
                        retCand.Add(objCandDC);
                    }
                }
            }

            return retCand;
        }

        /// <summary>
        /// Method for Laptop Blackberry Count
        /// </summary>
        /// <param name="candDetail"> candidate detail </param>
        /// <returns> returns equipment list </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList LapTopBlackpBerryCount(CandidateDetail candDetail)
        {
            DataSet dsNssData;
            CandidateDetailList retCand = new CandidateDetailList();
            CandidateDetail objCandDC = new CandidateDetail();
            dsNssData = DBHelper.ExecuteDataset("usp_GetForecastDashBoardData", candDetail);

            ////if (dsNssData.Tables[0].Rows.Count > 0)
            ////{
            ////    totalCount = 0;
            ////    int.TryParse(dsNssData.Tables[4].Rows[0][0].ToString(), out totalCount);
            ////}

            if (dsNssData.Tables[6].Rows.Count > 0)
            {
                foreach (DataRow dr in dsNssData.Tables[6].Rows)
                {
                    objCandDC.LapTopCount = dr["LapTopCount"] != DBNull.Value ? Convert.ToInt32(dr["LapTopCount"].ToString()) : 0;
                    objCandDC.LaptopBlackBerryCount = dr["BlackBerryCount"] != DBNull.Value ? Convert.ToInt32(dr["BlackBerryCount"].ToString()) : 0;
                    retCand.Add(objCandDC);
                }
            }
            else
            {
                objCandDC.LapTopCount = 0;
                objCandDC.LaptopBlackBerryCount = 0;
                retCand.Add(objCandDC);
            }

            return retCand;
        }

        /// <summary>
        /// To get location for NSS DashBoard
        /// Get City
        /// Added : 312539
        /// </summary>
        /// <param name="candidateDetail"> candidate Detail </param>
        /// <returns> city list for NSS </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList GetCity(CandidateDetail candidateDetail)
        {
            DataSet dsForcatsData;
            CandidateDetailList retCand = new CandidateDetailList();
            dsForcatsData = DBHelper.ExecuteDataset("usp_GetForecastDashBoardData", candidateDetail);
            if (dsForcatsData.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in dsForcatsData.Tables[0].Rows)
                {
                    CandidateDetail objCandDC = new CandidateDetail();
                    if (dsForcatsData.Tables[0].Columns.Contains("CityDesc"))
                    {
                        // objCandDC.CountryID = dr["CountryID"] != DBNull.Value ? Convert.ToInt16(dr["CountryID"].ToString()) : 0;
                        objCandDC.CityId = dr["CityId"] != DBNull.Value ? Convert.ToInt64(dr["CityId"].ToString()) : 0;
                        objCandDC.CityName = dr["CityDesc"].ToString();
                        retCand.Add(objCandDC);
                    }
                }
            }

            return retCand;
        }

        /// <summary>
        /// To get location for NSS DashBoard
        /// Get city based Work location
        /// Added : 312539
        /// </summary>
        /// <param name="candidateDetail"> candidate Detail </param>
        /// <returns> location for NSS </returns>
        public NssDashboardData BindWorklocation(CandidateDetail candidateDetail)
        {
            DataSet dsForcatsData;
            NssDashboardData retCand = new NssDashboardData();
            dsForcatsData = DBHelper.ExecuteDataset("usp_GetForecastDashBoardData", candidateDetail);
            DesignationDataList objLocationDescList = new DesignationDataList();
            if (dsForcatsData.Tables[1].Rows.Count > 0)
            {
                foreach (DataRow dr in dsForcatsData.Tables[1].Rows)
                {
                    DesignationData objCandDC = new DesignationData();
                    if (dsForcatsData.Tables[1].Columns.Contains("LocationDesc"))
                    {
                        objCandDC.LocationCode = dr["LocationCode"].ToString();
                        objCandDC.LocationDesc = dr["LocationDesc"].ToString();
                        objLocationDescList.Add(objCandDC);
                    }
                }
            }

            retCand.DesignationDesc = objLocationDescList;
            return retCand;
        }

        /// <summary>
        /// To get location for NSS DashBoard
        /// Added : 312539
        /// </summary>
        /// <param name="candidateDetail"> candidate Detail </param>
        /// <returns> location for NSS </returns>
        public NssDashboardData GetLevel(CandidateDetail candidateDetail)
        {
            DataSet dsForcatsData;
            NssDashboardData retCand = new NssDashboardData();
            dsForcatsData = DBHelper.ExecuteDataset("usp_GetForecastDashBoardData", candidateDetail);
            DesignationDataList lstDesignationData = new DesignationDataList();
            if (dsForcatsData.Tables[2].Rows.Count > 0)
            {
                foreach (DataRow dr in dsForcatsData.Tables[2].Rows)
                {
                    DesignationData objCandDC = new DesignationData();
                    if (dsForcatsData.Tables[2].Columns.Contains("DesignationDesc"))
                    {
                        objCandDC.Jobcode = dr["Jobcode"].ToString();
                        objCandDC.DesigniationDesc = dr["DesignationDesc"].ToString();
                        lstDesignationData.Add(objCandDC);
                    }
                }
            }

            retCand.DesignationDesc = lstDesignationData;
            return retCand;
        }

        /// <summary>
        /// Get Data NSS DashBoard
        /// Added: 312539
        /// </summary>
        /// <param name="candDetail"> Candidate Detail </param>
        /// <param name="totalCount"> total count </param>
        /// <returns> returns data for NSS </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "1", Justification = "Reviewed."), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList FetchNSSData(CandidateDetail candDetail, TotalCountDC totalCount)
        {
            DataSet dsNssData;
            CandidateDetailList retCand = new CandidateDetailList();
            dsNssData = DBHelper.ExecuteDataset("usp_GetForecastDashBoardData", candDetail);
            if (dsNssData.Tables[0].Rows.Count > 0)
            {
                try
                {
                    totalCount.TotalCount = 0;
                    totalCount.TotalCount = int.Parse(dsNssData.Tables[4].Rows[0][0].ToString());                //// 397785 , code analysis fix CA1806 
                }
                catch
                {
                    totalCount.TotalCount = 0;
                }
                //// totalCount.totalCount = 0;
                //// totalCount.totalCount = int.TryParse(dsNssData.Tables[4].Rows[0][0].ToString(), totalCount.totalCount);
            }

            foreach (DataRow dr in dsNssData.Tables[5].Rows)
            {
                CandidateDetail objCandDC = new CandidateDetail();
                objCandDC.CandidateId = dr["CandidateId"] != DBNull.Value ? Convert.ToInt64(dr["CandidateId"].ToString()) : 0;
                objCandDC.AssociateName = dr["CandidateName"].ToString();
                objCandDC.SoWorkLocation = dr["LocationDesc"].ToString();
                objCandDC.AssociateId = dr["AssociateId"] != DBNull.Value ? Convert.ToInt32(dr["AssociateId"].ToString()) : 0;
                objCandDC.ESAWorkLocation = dr["LocationDesc"].ToString();
                objCandDC.DesignationDesc = dr["DesignationDesc"].ToString();
                objCandDC.LapTop = dr["LapTop"].ToString();
                objCandDC.BlackBerry = dr["BlackBerry"].ToString();
                objCandDC.CityName = dr["CityDesc"].ToString();
                objCandDC.PracticeName = dr["PracticeName"].ToString();
                objCandDC.ProjectName = dr["ProjectName"].ToString();
                objCandDC.DepartmentDesc = dr["DepartmentDesc"].ToString();
                objCandDC.DepartmentGroup = dr["DepartmentGrouping"].ToString();
                ////if (objCandDC.CityName != null) { objCandDC.LapTop = dr["LapTop"].ToString(); ; } else { objCandDC.LapTop = " "; }
                ////if (objCandDC.DepartmentGroup != null) { objCandDC.BlackBerry = dr["BlackBerry"].ToString(); } else { objCandDC.BlackBerry = " "; }
                ////if (objCandDC.CityName != null) { objCandDC.CityName = dr["CityDesc"].ToString(); } else { objCandDC.CityName = " "; }
                ////if (objCandDC.DepartmentGroup != null) { objCandDC.DepartmentGroup = dr["DepartmentGrouping"].ToString(); } else { objCandDC.DepartmentGroup = " "; }
                ////if (objCandDC.PracticeName != null) { objCandDC.PracticeName = dr["PracticeName"].ToString(); } else { objCandDC.PracticeName = " "; }
                ////if (objCandDC.ProjectName != null) { objCandDC.ProjectName = dr["ProjectName"].ToString(); } else { objCandDC.ProjectName = " "; }
                ////if (objCandDC.DepartmentDesc != null) { objCandDC.DepartmentDesc = dr["DepartmentDesc"].ToString(); } else { objCandDC.DepartmentDesc = " "; }
                ////if (objCandDC.OSWorkLocation != null) { objCandDC.OSWorkLocation = dr["OSWorkLocation"].ToString(); } else { objCandDC.OSWorkLocation = " "; }
                objCandDC.DOJ = dr["DOJ"].ToString();
                objCandDC.OfferExtendDate = dr["OfferExtendedDate"].ToString();
                objCandDC.LapTopCount = dr["LapTopCount"] != DBNull.Value ? Convert.ToInt32(dr["LapTopCount"].ToString()) : 0;
                objCandDC.LaptopBlackBerryCount = dr["BlackBerryCount"] != DBNull.Value ? Convert.ToInt32(dr["BlackBerryCount"].ToString()) : 0;
                objCandDC.RowNumber = dr["RowNumber"] != DBNull.Value ? Convert.ToInt64(dr["RowNumber"].ToString()) : 0;
                retCand.Add(objCandDC);
            }

            return retCand;
        }

        /// <summary>
        /// Get Data NSS DashBoard
        /// Added: 195514
        /// </summary>
        /// <param name="candDetail"> Candidate Detail </param>
        /// <param name="totalCount"> total count </param>
        /// <returns> returns data for NSS </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "1", Justification = "Reviewed."), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList FetchNSSDashBoardData(CandidateDetail candDetail, TotalCountDC totalCount)
        {
            DataSet dsNssData;
            CandidateDetailList retCand = new CandidateDetailList();
            dsNssData = DBHelper.ExecuteDataset("usp_GetNSSDashBoardData", candDetail);
            if (dsNssData.Tables[0].Rows.Count > 0)
            {
                try
                {
                    totalCount.TotalCount = 0;
                    totalCount.TotalCount = int.Parse(dsNssData.Tables[0].Rows[0][0].ToString());                //// 397785 , code analysis fix CA1806 
                }
                catch
                {
                    totalCount.TotalCount = 0;
                }
                ////  totalCount = 0;
                ////   int.TryParse(dsNssData.Tables[0].Rows[0][0].ToString(), out totalCount);
            }

            foreach (DataRow dr in dsNssData.Tables[1].Rows)
            {
                CandidateDetail objCandDC = new CandidateDetail();
                objCandDC.LoginId = dr["LoginId"].ToString();
                if (dsNssData.Tables[1].Columns.Contains("AssociateId"))
                {
                    objCandDC.AssociateId = Convert.ToInt32(dr["AssociateId"].ToString());
                }

                objCandDC.CandidateId = dr["CandidateId"] != DBNull.Value ? Convert.ToInt64(dr["CandidateId"].ToString()) : 0;
                objCandDC.CandidateFName = dr["CandidateName"].ToString();
                objCandDC.ProjectId = string.IsNullOrEmpty(dr["ProjectId"].ToString()) ? 0 : Convert.ToInt64(dr["ProjectId"]);
                ////objCandDC.ProjectName = dr["ProjectName"].ToString();
                objCandDC.CountryID = dr["CountryId"] != DBNull.Value ? Convert.ToInt32(dr["CountryId"].ToString()) : 0;
                objCandDC.DesignationDesc = dr["DesignationDesc"].ToString();
                //// objCandDC.DOJ = dr["DOJ"].ToString();
                //// objCandDC.DOJ = String.Format("{0:dd-MM-yyyy}", dr["DOJ"]);
                //// objCandDC.DOJ = dr["DOJ"] != DBNull.Value ? String.Format("{0:dd-MM-yyyy}", dr["DOJ"]) : "";
                objCandDC.DOJ = dr["DOJ"] != DBNull.Value ? string.Format("{0:dd-MMM-yyyy}", dr["DOJ"]) : string.Empty;
                objCandDC.HiringManagerId = string.IsNullOrEmpty(dr["ManagerID"].ToString()) ? 0 : Convert.ToInt64(dr["ManagerID"]); ////Convert.ToInt64(dr["ManagerID"]);
                objCandDC.RowNumber = dr["RowNumber"] != DBNull.Value ? Convert.ToInt64(dr["RowNumber"].ToString()) : 0;
                objCandDC.ShippingAddress = dr["ShippingAddress"].ToString();
                objCandDC.LaptopRequestStatus = dr["Laptop"].ToString();
                objCandDC.CellPhoneRequestStatus = dr["CellPhone"].ToString();
                objCandDC.BlackberryRequestStatus = dr["Blackberry"].ToString();
                if (dsNssData.Tables[1].Columns.Contains("ClientEquipment"))
                {
                    objCandDC.ClientEquipmentRequestStatus = dr["ClientEquipment"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("NSSChosenLocation"))
                {
                    objCandDC.NSSChosenLocation = dr["NSSChosenLocation"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("ManilaCountryId"))
                {
                    objCandDC.ManilaCountryId = dr["ManilaCountryId"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("HireType"))
                {
                    objCandDC.HireTypeDes = dr["HireType"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("ERRequestStatus"))
                {
                    objCandDC.ERRequestStatus = dr["ERRequestStatus"] != DBNull.Value ? Convert.ToInt32(dr["ERRequestStatus"].ToString()) : 0;
                }

                if (dsNssData.Tables[1].Columns.Contains("RequestingDepartment"))
                {
                    objCandDC.RequestingDepartment = dr["RequestingDepartment"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("ESAWorkLocation"))
                {
                    objCandDC.ESAWorkLocation = dr["ESAWorkLocation"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("OwniningDepartment"))
                {
                    objCandDC.OwniningDepartment = dr["OwniningDepartment"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("DataCard"))
                {
                    objCandDC.DataCard = dr["DataCard"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("CEFlag"))
                {
                    objCandDC.CEFlag = dr["CEFlag"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("KeyBoardLanguage"))
                {
                    objCandDC.KeyBoardLanguage = dr["KeyBoardLanguage"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("LGG2"))
                {
                    objCandDC.LGg2 = dr["LGG2"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("SamsungNote3"))
                {
                    objCandDC.Samsungnote3 = dr["SamsungNote3"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("Samsung_S4"))
                {
                    objCandDC.SamsungS4 = dr["Samsung_S4"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("Samsung_S5"))
                {
                    objCandDC.SamsungS5 = dr["Samsung_S5"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("IPhone_4S"))
                {
                    objCandDC.IPhone4S = dr["IPhone_4S"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("IPhone_5C"))
                {
                    objCandDC.IPhone5C = dr["IPhone_5C"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("IPhone_5S"))
                {
                    objCandDC.IPhone5S = dr["IPhone_5S"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("Z10_Free"))
                {
                    objCandDC.Z10 = dr["Z10_Free"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("Q10"))
                {
                    objCandDC.Q10 = dr["Q10"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("Samsung_S3"))
                {
                    objCandDC.SamsungS3 = dr["Samsung_S3"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("SamsungNote4"))
                {
                    objCandDC.Samsungnote4 = dr["SamsungNote4"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("IPhone_6"))
                {
                    objCandDC.IPhone6 = dr["IPhone_6"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("IPhone_6P"))
                {
                    objCandDC.IPhone6P = dr["IPhone_6P"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("LG_G3_16GB"))
                {
                    objCandDC.LGg3 = dr["LG_G3_16GB"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("Samsung_S6_32GB"))
                {
                    objCandDC.Samsungs632GB = dr["Samsung_S6_32GB"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("Samsung_S6_64GB"))
                {
                    objCandDC.Samsungs664GB = dr["Samsung_S6_64GB"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("Samsung_S6_128GB"))
                {
                    objCandDC.Samsungs6128GB = dr["Samsung_S6_128GB"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("Samsung_S6edge_32GB"))
                {
                    objCandDC.Samsungs6Edge32GB = dr["Samsung_S6edge_32GB"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("Samsung_S6edge_64GB"))
                {
                    objCandDC.Samsungs6Edge64GB = dr["Samsung_S6edge_64GB"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("Samsung_S6edge_128GB"))
                {
                    objCandDC.Samsungs6Edge128GB = dr["Samsung_S6edge_128GB"].ToString();
                }

                if (dsNssData.Tables[1].Columns.Contains("PortingName"))
                {
                    objCandDC.PortingName = dr["PortingName"].ToString();
                }
                if (dsNssData.Tables[1].Columns.Contains("PortingAddress"))
                {
                    objCandDC.PortingAddress = dr["PortingAddress"].ToString();
                }
                if (dsNssData.Tables[1].Columns.Contains("PortPortingNumber"))
                {
                    objCandDC.PortingPhoneNumber = dr["PortPortingNumber"].ToString();
                }
                if (dsNssData.Tables[1].Columns.Contains("PortWirelessProvider"))
                {
                    objCandDC.PortWirelessProvider = dr["PortWirelessProvider"].ToString();
                }
                if (dsNssData.Tables[1].Columns.Contains("PortPassword"))
                {
                    objCandDC.PortPassword = dr["PortPassword"].ToString();
                }
                if (dsNssData.Tables[1].Columns.Contains("PortAccountNumber"))
                {
                    objCandDC.PortAccountNumber = dr["PortAccountNumber"].ToString();
                }

                objCandDC.TotalCount = int.Parse(dsNssData.Tables[0].Rows[0][0].ToString()); //305054 - due to total count is always 0
                retCand.Add(objCandDC);
            }

            return retCand;
        }

        /// <summary>
        /// 312511: Method to Fetch HRSS Dashboard Data
        /// </summary>
        /// <param name="candDetail"> Candidate Detail </param>
        /// <param name="totalCount"> total count </param>
        /// <returns> returns HRSS data </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "1", Justification = "Reviewed."), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList FetchHRSSData(CandidateDetail candDetail, TotalCountDC totalCount)
        {
            DataSet dsHRSSData;
            CandidateDetailList retCand = new CandidateDetailList();
            dsHRSSData = DBHelper.ExecuteDataset("usp_GetDashBoardData", candDetail); // HRSS and RC dashboards use same SP.
            if (dsHRSSData != null && dsHRSSData.Tables.Count > 0)
            {
                if (dsHRSSData.Tables[0].Rows.Count > 0)
                {
                    try
                    {
                        totalCount.TotalCount = 0;
                        totalCount.TotalCount = int.Parse(dsHRSSData.Tables[0].Rows[0][0].ToString());
                    }
                    catch
                    {
                        totalCount.TotalCount = 0;
                    }
                    ////    totalCount = 0;
                    ////    int.TryParse(dsHRSSData.Tables[0].Rows[0][0].ToString(), out totalCount);
                }

                foreach (DataRow dr in dsHRSSData.Tables[1].Rows)
                {
                    CandidateDetail objCandDC = new CandidateDetail();
                    objCandDC.RecruiterName = dr["RecruiterNameID"].ToString();
                    objCandDC.LoginId = dr["LoginId"].ToString();
                    objCandDC.CandidateId = Convert.ToInt64(dr["CandidateId"]);
                    objCandDC.CandidateFName = dr["CandidateName"].ToString();
                    objCandDC.PaperWorkStatus = dr["PaperWorkStatusDesc"].ToString();
                    objCandDC.CandidateOfferStatusDesc = dr["OfferStatusDesc"].ToString();
                    objCandDC.DOJ = dr["DOJ"].ToString();
                    objCandDC.DesignationDesc = dr["DesignationDesc"].ToString();
                    objCandDC.RowNumber = Convert.ToInt64(dr["RowNumber"]);
                    retCand.Add(objCandDC);
                }
            }

            return retCand;
        }

        /// <summary>
        /// 312511: Method to update Candidate Joining Status Details for HRSS
        /// </summary>
        /// <param name="candDetail"> Candidate detail </param>
        public void UpdateCandidateJoiningStatusDetails(CandidateDetail candDetail)
        {
            DBHelper.ExecuteNonQuery("usp_UpdateCandidateAttendanceStatus", candDetail);
        }

        /// <summary>
        /// 208099 : Method to fetch mapped country for IM dashBoard
        /// </summary>
        /// <param name="candidateDetail"> candidate Detail </param>
        /// <returns> country list </returns> 
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList GetIMMappedCountry(CandidateDetail candidateDetail)
        {
            DataSet dsHRSSData;
            CandidateDetailList retCand = new CandidateDetailList();
            dsHRSSData = DBHelper.ExecuteDataset("usp_GetCountryForHRSS", candidateDetail);
            if (dsHRSSData != null && dsHRSSData.Tables.Count > 0)
            {
                foreach (DataRow dr in dsHRSSData.Tables[0].Rows)
                {
                    CandidateDetail objCandDC = new CandidateDetail();
                    objCandDC.CountryName = dr["CountryName"].ToString();
                    objCandDC.CountryID = dr["CountryID"] != DBNull.Value ? Convert.ToInt16(dr["CountryID"].ToString()) : 0;
                    retCand.Add(objCandDC);
                }
            }

            return retCand;
        }

        /// <summary>
        /// 195514 : Method to fetch status for NSS dashboard
        /// </summary>
        /// <param name="objTimelineFilter"> object Timeline Filter </param>
        /// <returns> returns asset status </returns> 
        public AssetRequestStatus[] GetAssetRequestTimelineStatus(TimelineFilter objTimelineFilter)
        {
            DataSet dsAssetRequestStatus;
            AssetRequestStatus[] arrAssetRequestStatus = null;
            dsAssetRequestStatus = DBHelper.ExecuteDataset("usp_GetAssetRequestStatusTimelineFilter", objTimelineFilter);
            if (dsAssetRequestStatus != null && dsAssetRequestStatus.Tables.Count > 0)
            {
                arrAssetRequestStatus = new AssetRequestStatus[dsAssetRequestStatus.Tables[0].Rows.Count];
                for (int temp = 0; temp < dsAssetRequestStatus.Tables[0].Rows.Count; temp++)
                {
                    arrAssetRequestStatus[temp] = new AssetRequestStatus();
                    DataRow dr = dsAssetRequestStatus.Tables[0].Rows[temp];
                    if (!DBNull.Value.Equals(dr["AssetStatusId"]))
                    {
                        arrAssetRequestStatus[temp].AssetStatusId = Convert.ToInt32(dr["AssetStatusId"].ToString());
                    }

                    if (!DBNull.Value.Equals(dr["StatusDescription"]))
                    {
                        arrAssetRequestStatus[temp].StatusDescription = dr["StatusDescription"].ToString();
                    }
                }
            }

            return arrAssetRequestStatus;
        }

        /// <summary>
        /// 195514 : Method to fetch timeline for NSS dashboard
        /// </summary>
        /// <returns> returns time line filter </returns> 
        public TimelineFilter[] GetTimelineFilters()
        {
            DataSet dsTimelineFilter;
            TimelineFilter[] arrTimelineFilter = null;
            dsTimelineFilter = DBHelper.ExecuteDataset("usp_GetTimelineFilter");
            if (dsTimelineFilter != null && dsTimelineFilter.Tables.Count > 0)
            {
                arrTimelineFilter = new TimelineFilter[dsTimelineFilter.Tables[0].Rows.Count];
                for (int temp = 0; temp < dsTimelineFilter.Tables[0].Rows.Count; temp++)
                {
                    arrTimelineFilter[temp] = new TimelineFilter();
                    DataRow dr = dsTimelineFilter.Tables[0].Rows[temp];
                    if (!DBNull.Value.Equals(dr["TimelineFilterId"]))
                    {
                        arrTimelineFilter[temp].TimelineFilterId = Convert.ToInt32(dr["TimelineFilterId"].ToString());
                    }

                    if (!DBNull.Value.Equals(dr["TimelineDescription"]))
                    {
                        arrTimelineFilter[temp].TimelineDescription = dr["TimelineDescription"].ToString();
                    }
                }
            }

            return arrTimelineFilter;
        }

        /// <summary>
        /// 312511 : To get Department based on country for TM Dashboard
        /// </summary>
        /// <param name="candidateDetail"> candidate Detail </param>
        /// <returns> candidate list </returns>
        public TMDashboardData GetDepartment(CandidateDetail candidateDetail)
        {
            DataSet dsDepartment;
            TMDashboardData retCand = new TMDashboardData();
            dsDepartment = DBHelper.ExecuteDataset("usp_GetDepartment", candidateDetail);
            DepartmentDataList lstDepartmentData = new DepartmentDataList();
            if (dsDepartment.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in dsDepartment.Tables[0].Rows)
                {
                    DepartmentData objDepartmentDC = new DepartmentData();
                    if (dsDepartment.Tables[0].Columns.Contains("DepartmentDesc"))
                    {
                        if (dr["DepartmentDesc"] != DBNull.Value)
                        {
                            objDepartmentDC.DepartmentName = dr["DepartmentDesc"].ToString();
                        }

                        if (dr["DepartmentCode"] != DBNull.Value)
                        {
                            objDepartmentDC.DepartmentCode = dr["DepartmentCode"].ToString();
                        }

                        lstDepartmentData.Add(objDepartmentDC);
                    }
                }
            }
            else
            {
                DepartmentData objDepartmentDC = new DepartmentData();
                objDepartmentDC.DepartmentName = "-----------Select-----------";
                objDepartmentDC.DepartmentCode = "-1";
                lstDepartmentData.Add(objDepartmentDC);
            }

            retCand.DepartmentName = lstDepartmentData;
            return retCand;
        }

        #endregion DashBoard DB Methods

        #region NSSDashboard
        /// <summary>
        /// Method for Fetch NSS Data Dashboard
        /// </summary>
        /// <param name="candDetail"> candidate detail </param>
        /// <param name="totalCount"> total count </param>
        /// <returns> candidate list </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "1", Justification = "Reviewed."), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList FetchNSSDataDashboard(CandidateDetail candDetail, TotalCountDC totalCount)
        {
            DataSet dsRCData;
            CandidateDetailList retCand = new CandidateDetailList();
            dsRCData = DBHelper.ExecuteDataset("usp_GetNSSDashboard", candDetail);
            if ((dsRCData != null) && (dsRCData.Tables.Count > 0) && (dsRCData.Tables[0].Rows.Count > 0))
            {
                try
                {
                    totalCount.TotalCount = 0;
                    totalCount.TotalCount = int.Parse(dsRCData.Tables[0].Rows[0][0].ToString());                //// 397785 , code analysis fix 
                }
                catch
                {
                    totalCount.TotalCount = 0;
                }
                //// totalCount = 0;
                ////  int.TryParse(dsRCData.Tables[0].Rows[0][0].ToString(), out totalCount);
            }

            foreach (DataRow dr in dsRCData.Tables[1].Rows)
            {
                CandidateDetail objApprovalDetails = new CandidateDetail();
                objApprovalDetails.CandidateId = dr["CandidateId"] != DBNull.Value ? Convert.ToInt64(dr["CandidateId"].ToString()) : 0;
                objApprovalDetails.RequestId = dr["RequestId"] != DBNull.Value ? Convert.ToInt16(dr["RequestId"].ToString()) : 0;
                objApprovalDetails.CandidateFName = dr["FName"].ToString();
                objApprovalDetails.CandidateMName = dr["MName"].ToString();
                objApprovalDetails.CandidateLName = dr["LName"].ToString();
                objApprovalDetails.DesignationDesc = dr["JobDescription"].ToString();
                objApprovalDetails.RowNumber = dr["RowNumber"] != DBNull.Value ? Convert.ToInt64(dr["RowNumber"].ToString()) : 0;
                objApprovalDetails.EmployeeId = dr["EmployeeId"].ToString();
                objApprovalDetails.CandidateDOJ = dr["DOJ"] != DBNull.Value ? Convert.ToDateTime(dr["DOJ"]).ToShortDateString() : string.Empty;
                objApprovalDetails.HiringManagerId = dr["HiringManagerId"] != DBNull.Value ? Convert.ToInt64(dr["HiringManagerId"].ToString()) : 0;
                ////  objApprovalDetails.Description = dr["Description"].ToString();
                objApprovalDetails.Type = dr["AssetTypeId"] != DBNull.Value ? Convert.ToInt16(dr["AssetTypeId"].ToString()) : 0;
                objApprovalDetails.TypeName = dr["AssetName"].ToString();
                objApprovalDetails.RequestStatusDesc = dr["StatusDescription"].ToString();
                objApprovalDetails.RequestStatus = dr["RequestStatus"] != DBNull.Value ? Convert.ToInt16(dr["RequestStatus"].ToString()) : 0;
                retCand.Add(objApprovalDetails);
            }

            return retCand;
        }

        #endregion

        #region AdminDashboard
        /// <summary>
        /// 224730 : Method to fetch status list for file upload - admin dashboard
        /// </summary>
        /// <param name="adminDashBoard"> admin dashboard </param>
        /// <returns> candidate list </returns> 
        public AdminDashBoard GetFileUploadDetails(AdminDashBoard adminDashBoard)
        {
            DataSet dsStatusData;
            AdminDashBoard objCandDC = new AdminDashBoard();
            dsStatusData = DBHelper.ExecuteDataset("usp_GetFileUploadDetails", adminDashBoard);
            if (dsStatusData != null && dsStatusData.Tables.Count > 0)
            {
                foreach (DataRow dr in dsStatusData.Tables[0].Rows)
                {
                    objCandDC.FileUploadId = dr["FileUploadId"] != DBNull.Value ? Convert.ToInt32(dr["FileUploadId"].ToString()) : 0;
                    objCandDC.FileUploadStatus = dr["Status"] != DBNull.Value ? Convert.ToInt16(dr["Status"].ToString()) : -1;
                    objCandDC.FileUploadStatusDesc = dr["StatusDescription"].ToString();
                    objCandDC.FileUploadURL = dr["FileURL"].ToString();
                    objCandDC.ModifiedDate = dr["ModifiedDate"] != DBNull.Value ? Convert.ToDateTime(dr["ModifiedDate"]) : DateTime.MinValue;
                    objCandDC.RejectionDate = dr["RejectionDate"] != DBNull.Value ? dr["RejectionDate"].ToString() : null;
                    //objCandDC.FileScanStatus = dr["FileScanStatus"] != DBNull.Value ? dr["FileScanStatus"].ToString() : null;
                    objCandDC.TaskStatus = Convert.ToInt16(dr["TaskStatus"]);
                    objCandDC.Photostatusdescription = dr["Photostatusdescription"].ToString();
                }
            }

            return objCandDC;
        }

        /// <summary>
        /// Method for Fetch ADMIN Data Dashboard
        /// </summary>
        /// <param name="candDetail"> candidate detail </param>
        /// <param name="totalCount"> total count </param>
        /// <returns> candidate list </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "1", Justification = "Reviewed."), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "0", Justification = "Reviewed."), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList FetchADMINDataDashboard(CandidateDetail candDetail, TotalCountDC totalCount)
        {
            DataSet dsAssociateList;
            CandidateDetailList retCand = new CandidateDetailList();
            if (string.IsNullOrEmpty(candDetail.Name))
            {
                candDetail.Name = null;
            }

            if (candDetail.Status == -1)
            {
                candDetail.Status = null;
            }

            dsAssociateList = DBHelper.ExecuteDataset("usp_SearchPendingList", candDetail);
            if ((dsAssociateList != null) && (dsAssociateList.Tables.Count > 0) && (dsAssociateList.Tables[0].Rows.Count > 0))
            {
                try
                {
                    totalCount.TotalCount = 0;                //// 397785 , code analysis fix 
                    totalCount.TotalCount = int.Parse(dsAssociateList.Tables[0].Rows[0][0].ToString());
                }
                catch
                {
                    totalCount.TotalCount = 0;
                }
                ////  totalCount = 0;
                ////  int.TryParse(dsAssociateList.Tables[0].Rows[0][0].ToString(), out totalCount);
            }

            foreach (DataRow dr in dsAssociateList.Tables[1].Rows)
            {
                CandidateDetail objApprovalDetails = new CandidateDetail();
                objApprovalDetails.LocationDesc = dr["WorkLocation"].ToString();
                objApprovalDetails.CountryID = dr["CountryId"] != DBNull.Value ? Convert.ToInt32(dr["CountryId"].ToString()) : 0;
                objApprovalDetails.CandidateId = dr["CandidateId"] != DBNull.Value ? Convert.ToInt64(dr["CandidateId"].ToString()) : 0;
                objApprovalDetails.Name = dr["Name"].ToString();
                objApprovalDetails.Jobcode = dr["JobLevel"].ToString();
                objApprovalDetails.CandidateDOJ = dr["DOJ"] != DBNull.Value ? dr["DOJ"].ToString() : string.Empty;
                objApprovalDetails.FileUploadStatusDesc = dr["StatusDescription"].ToString();
                objApprovalDetails.Status = dr["Status"] != DBNull.Value ? Convert.ToInt16(dr["Status"].ToString()) : 0;
                objApprovalDetails.RowNumber = Convert.ToInt64(dr["RowNumber"]);
                objApprovalDetails.TaskId = Convert.ToInt32(dr["TaskId"]);
                if (dr["AssociateId"] != DBNull.Value)
                {
                    objApprovalDetails.AssociateId = Convert.ToInt32(dr["AssociateId"]);
                }

                if (dr["PhoneNumber"] != DBNull.Value)
                {
                    objApprovalDetails.CandidateMobileNo = dr["PhoneNumber"].ToString();
                }

                if (dr["ShippingAddress"] != DBNull.Value)
                {
                    objApprovalDetails.ShippingAddress = dr["ShippingAddress"].ToString();
                }

                objApprovalDetails.TotalCount = int.Parse(dsAssociateList.Tables[0].Rows[0][0].ToString());
                retCand.Add(objApprovalDetails);
            }

            return retCand;
        }

        /// <summary>
        /// 224730 : Method to fetch status list for file upload - admin dashboard
        /// <param name="candidateDetail">Sends CountryId</param>
        /// </summary>
        /// <param name="candDetail"> candidate detail </param>
        /// <returns> candidate list </returns> 
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList GetStatusList(CandidateDetail candDetail)
        {
            DataSet dsStatusData;
            CandidateDetailList retCand = new CandidateDetailList();
            dsStatusData = DBHelper.ExecuteDataset("usp_GetFileUploadStatusList", candDetail);
            if (dsStatusData != null && dsStatusData.Tables.Count > 0)
            {
                foreach (DataRow dr in dsStatusData.Tables[0].Rows)
                {
                    CandidateDetail objCandDC = new CandidateDetail();
                    objCandDC.Status = dr["StatusId"] != DBNull.Value ? Convert.ToInt16(dr["StatusId"].ToString()) : 0;
                    objCandDC.FileUploadStatusDesc = dr["StatusDescription"].ToString();
                    retCand.Add(objCandDC);
                }
            }

            return retCand;
        }

        /// <summary>
        /// 220930 : Method to fetch status list for file upload - admin dashboard
        /// </summary>
        /// <param name="objadmin"> object admin </param>
        /// <returns> returns city list </returns> 
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CityList GetLocationList(AdminDashBoard objadmin)
        {
            CityList retCityList = new CityList();
            DataSet dsLocationData;
            dsLocationData = DBHelper.ExecuteDataset("usp_GetLocationList", objadmin);
            if (dsLocationData != null && dsLocationData.Tables.Count > 0)
            {
                foreach (DataRow dr in dsLocationData.Tables[0].Rows)
                {
                    City objCty = new City();
                    objCty.CityDescription = dr["CityDescription"].ToString();
                    objCty.CountryID = Convert.ToInt16(dr["CountryId"]);
                    retCityList.Add(objCty);
                }
            }

            dsLocationData = null;
            return retCityList;
        }

        /// <summary>
        /// Method for Fetch ADMIN Data Dashboard Excel
        /// </summary>
        /// <param name="candDetail"> candidate detail </param>
        /// <returns> candidate list </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "0", Justification = "Reviewed."), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList FetchADMINDataDashboardExcel(CandidateDetail candDetail)
        {
            DataSet dsAssociateList;
            CandidateDetailList retCand = new CandidateDetailList();
            if (string.IsNullOrEmpty(candDetail.Name))
            {
                candDetail.Name = null;
            }

            if (candDetail.Status == -1)
            {
                candDetail.Status = null;
            }

            dsAssociateList = DBHelper.ExecuteDataset("usp_GetadminDashBoardExcel", candDetail);
            if ((dsAssociateList != null) && (dsAssociateList.Tables.Count > 0) && (dsAssociateList.Tables[0].Rows.Count > 0))
            {
                foreach (DataRow dr in dsAssociateList.Tables[0].Rows)
                {
                    CandidateDetail objApprovalDetails = new CandidateDetail();
                    objApprovalDetails.DepartmentGroup = dr["Department Grouping"].ToString();
                    objApprovalDetails.DepartmentName = dr["OwningDepartment"].ToString();
                    objApprovalDetails.ProjectName = dr["ProjectName"].ToString();
                    objApprovalDetails.ESAWorkLocation = dr["ESAWorkLocation"].ToString();
                    objApprovalDetails.SoWorkLocation = dr["SO WorkLocation"].ToString();
                    objApprovalDetails.OfferExtendedDate = Convert.ToDateTime(dr["OfferExtendedDate"]);
                    objApprovalDetails.CandidateId = dr["CandidateId"] != DBNull.Value ? Convert.ToInt64(dr["CandidateId"].ToString()) : 0;
                    objApprovalDetails.Name = dr["FullName"].ToString();
                    objApprovalDetails.Jobcode = dr["JobLevel"].ToString();
                    objApprovalDetails.CandidateDOJ = dr["ExpectedDOJ"] != DBNull.Value ? Convert.ToDateTime(dr["ExpectedDOJ"]).ToShortDateString() : string.Empty;
                    objApprovalDetails.FileUploadStatusDesc = dr["PhotoUploadStatus"].ToString();
                    objApprovalDetails.NameOnIDCard = dr["NameOnIDCard"].ToString();
                    objApprovalDetails.AssociateId = dr["AssociateId"] != DBNull.Value ? Convert.ToInt32(dr["AssociateId"]) : 0;
                    objApprovalDetails.CityName = dr["City"].ToString();
                    objApprovalDetails.PracticeName = dr["Practice Name"].ToString();
                    objApprovalDetails.ShippingAddress = dr["ShippingAddress"].ToString();
                    objApprovalDetails.CandidateMobileNo = dr["EmergencyContactNumber"].ToString();
                    objApprovalDetails.CountryID = dr["CountryId"] != DBNull.Value ? Convert.ToInt32(dr["CountryId"].ToString()) : 0;
                    objApprovalDetails.BloodGroup = dr["BloodGroup"].ToString();
                    retCand.Add(objApprovalDetails);
                }
            }

            return retCand;
        }

        #endregion

        /// <summary>
        /// Used to fetch the pre joining/post joining Count
        /// </summary>
        /// <param name="candidateDetail"> RC ID is passed </param>
        /// <returns> dashboard count </returns>
        public DashBoardDataPagination DashBoardProcessCount(CandidateDetail candidateDetail)
        {
            DataSet dsDashBoard;
            DashBoardDataPagination objDashBoardCount = new DashBoardDataPagination();

            dsDashBoard = DBHelper.ExecuteDataset("usp_GetCandidatesCount", candidateDetail);

            if (dsDashBoard != null)
            {
                if (dsDashBoard.Tables[0].Rows.Count > 0)
                {
                    objDashBoardCount.PreJoiningCount = Convert.ToInt64(dsDashBoard.Tables[0].Rows[0][0].ToString());
                    objDashBoardCount.PostJoiningCount = Convert.ToInt64(dsDashBoard.Tables[0].Rows[0][1].ToString());
                }
            }

            return objDashBoardCount;
        }

        /// <summary>
        /// Used to fetch the pre joining/post joining Count For HRSS
        /// </summary>
        /// <param name="candidateDetail"> candidate Detail </param>
        /// <returns> returns dashboard count </returns>
        public DashBoardDataPagination DashBoardProcessCountForHRSS(CandidateDetail candidateDetail)
        {
            DataSet dsHRSSData;
            DashBoardDataPagination objDashBoardCount = new DashBoardDataPagination();
            objDashBoardCount.PreJoiningCount = 0;
            objDashBoardCount.PostJoiningCount = 0;
            objDashBoardCount.CheckCountry = "false";
            dsHRSSData = DBHelper.ExecuteDataset("usp_GetCandidatesCountForHRSS", candidateDetail);
            if (dsHRSSData != null)
            {
                if (dsHRSSData.Tables[0].Rows.Count > 0)
                {
                    objDashBoardCount.PreJoiningCount = Convert.ToInt64(dsHRSSData.Tables[0].Rows[0][0].ToString());
                    objDashBoardCount.PostJoiningCount = Convert.ToInt64(dsHRSSData.Tables[0].Rows[0][1].ToString());
                }

                if (dsHRSSData.Tables[1].Rows.Count > 0)
                {
                    objDashBoardCount.CheckCountry = Convert.ToString(dsHRSSData.Tables[1].Rows[0][0].ToString());
                }
            }

            return objDashBoardCount;
        }

        /// <summary>
        /// 195514: Used to fetch the asset Count For NSS
        /// </summary>
        /// <param name="candidateDetail"> candidate Detail </param>
        /// <returns> returns dashboard count </returns>
        public DashBoardDataPagination DashBoardAssetCountForNSS(CandidateDetail candidateDetail)
        {
            DataSet dsNSSData;
            DashBoardDataPagination objDashBoardCount = new DashBoardDataPagination();
            objDashBoardCount.LaptopCount = 0;
            objDashBoardCount.BlackberryCount = 0;
            objDashBoardCount.CellPhoneCount = 0;
            objDashBoardCount.DataCardCount = 0;
            dsNSSData = DBHelper.ExecuteDataset("usp_GetCandidatesAssetCountForNSS", candidateDetail);
            if (dsNSSData != null)
            {
                if (dsNSSData.Tables[0].Rows.Count > 0)
                {
                    objDashBoardCount.LaptopCount = Convert.ToInt64(dsNSSData.Tables[0].Rows[0][0].ToString());
                    objDashBoardCount.CellPhoneCount = Convert.ToInt64(dsNSSData.Tables[0].Rows[0][1].ToString());
                    objDashBoardCount.BlackberryCount = Convert.ToInt64(dsNSSData.Tables[0].Rows[0][2].ToString());
                    objDashBoardCount.ClientEquipmentCount = Convert.ToInt64(dsNSSData.Tables[0].Rows[0][3].ToString());
                    objDashBoardCount.DataCardCount = Convert.ToInt64(dsNSSData.Tables[0].Rows[0][3].ToString()); ////CE equipment
                }
            }

            return objDashBoardCount;
        }

        /// <summary>
        /// 312511: Method to Fetch Data for Excel report generation
        /// </summary>
        /// <param name="candDetail"> Sends the search criteria specified in dashboard. </param>
        /// <param name="totalCount"> returns the total records returned for search criteria </param>
        /// <returns> DS Dashboard Data </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "1", Justification = "Reviewed.")]
        public DataSet FetchDashboardDataForExcel(CandidateDetail candDetail, TotalCountDC totalCount)
        {
            DataSet dsDashboardData;
            dsDashboardData = DBHelper.ExecuteDataset("usp_GetDashBoardData", candDetail);
            if ((dsDashboardData != null) && (dsDashboardData.Tables.Count > 0) && (dsDashboardData.Tables[0].Rows.Count > 0))
            {
                try
                {
                    totalCount.TotalCount = 0;               //// 397785 , code analysis fix CA1806 
                    totalCount.TotalCount = int.Parse(dsDashboardData.Tables[0].Rows[0][0].ToString());
                }
                catch
                {
                    totalCount.TotalCount = 0;
                }

                ////totalCount = 0;
                ////bool success= int.TryParse(dsDashboardData.Tables[0].Rows[0][0].ToString(), out totalCount);
                ////if (!success)
                ////{
                ////    totalCount = 0;
                ////}
            }

            return dsDashboardData;
        }

        /// <summary>
        /// Get Data NSS DashBoard Asset Report
        /// 312539
        /// </summary>
        /// <param name="candDetail"> candidate Detail </param>
        /// <param name="totalCount"> total count </param>
        /// <returns> data set </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "1", Justification = "Reviewed.")]
        public DataSet FetchNSSDashBoardAssetReport(CandidateDetail candDetail, TotalCountDC totalCount)
        {
            DataSet dsNssData;
            dsNssData = DBHelper.ExecuteDataset("usp_GetNSSDashBoardAssetReport", candDetail);
            if ((dsNssData != null) && (dsNssData.Tables.Count > 0) && (dsNssData.Tables[0].Rows.Count > 0))
            {
                try
                {
                    totalCount.TotalCount = 0;                //// 397785 , code analysis fix CA1806 
                    totalCount.TotalCount = int.Parse(dsNssData.Tables[0].Rows[0][0].ToString());
                }
                catch
                {
                    totalCount.TotalCount = 0;
                }
                ////totalCount = 0;
                ////int.TryParse(dsNssData.Tables[0].Rows[0][0].ToString(), out totalCount);
            }

            return dsNssData;
        }

        /// <summary>
        /// 312511: Method to Fetch Data for Excel report generation for NSS Dashboard
        /// </summary>
        /// <param name="candDetail"> Sends the search criteria specified in dashboard. </param>
        /// <param name="totalCount"> returns the total records returned for search criteria </param>
        /// <returns> DS Dashboard Data </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "1", Justification = "Reviewed.")]
        public DataSet FetchNSSDashboardDataForExcel(CandidateDetail candDetail, TotalCountDC totalCount)
        {
            DataSet dsDashboardData;
            dsDashboardData = DBHelper.ExecuteDataset("usp_GetNSSDashBoardData", candDetail);
            if ((dsDashboardData != null) && (dsDashboardData.Tables.Count > 0) && (dsDashboardData.Tables[0].Rows.Count > 0))
            {
                try
                {
                    totalCount.TotalCount = 0;                //// 397785 , code analysis fix CA1806 
                    totalCount.TotalCount = int.Parse(dsDashboardData.Tables[0].Rows[0][0].ToString());
                }
                catch
                {
                    totalCount.TotalCount = 0;
                }
                ////totalCount = 0;
                ////bool success=int.TryParse(dsDashboardData.Tables[0].Rows[0][0].ToString(), out totalCount);
                ////if (!success)
                ////{
                ////    totalCount = 0;
                ////}
            }

            return dsDashboardData;
        }

        /// <summary>
        /// 312539: Method to Fetch Data for Excel report generation for Forecast Dashboard
        /// </summary>
        /// <param name="candDetail"> Sends the search criteria specified in dashboard. </param>
        /// <param name="totalCount"> returns the total records returned for search criteria </param>
        /// <returns> DS Dashboard Data </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "1", Justification = "Reviewed.")]
        public DataSet ForcasteDashboardExcelReport(CandidateDetail candDetail, TotalCountDC totalCount)
        {
            DataSet dsDashboardData;
            dsDashboardData = DBHelper.ExecuteDataset("usp_GetForecastDashBoardData", candDetail);
            if ((dsDashboardData != null) && (dsDashboardData.Tables.Count > 0) && (dsDashboardData.Tables[5].Rows.Count > 0))
            {
                try
                {
                    totalCount.TotalCount = 0;                //// 397785 , code analysis fix CA1806 
                    totalCount.TotalCount = int.Parse(dsDashboardData.Tables[0].Rows[0][0].ToString());
                }
                catch
                {
                    totalCount.TotalCount = 0;
                }
                ////totalCount = 0;
                ////bool success = int.TryParse(dsDashboardData.Tables[0].Rows[0][0].ToString(), out totalCount);
                ////if (!success)
                ////{
                ////    totalCount = 0;
                ////}
            }

            return dsDashboardData;
        }

        /// <summary>
        /// 312539: Method to Fetch Data for import excel update table UploadExcelDetailsData
        /// </summary>
        /// <param name="candDetail"> candidate Detail </param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "0", Justification = "Reviewed.")]
        public void UploadExcelDetailsData(CandidateDetail[] candDetail)
        {
            try
            {
                foreach (CandidateDetail objCand in candDetail)
                {
                    DBHelper.ExecuteNonQuery("usp_UpdateNssCandidateFedex", objCand);
                }
            }
            catch
            {
                throw;
            }
        }

        /// <summary>
        /// 208099: Method to update Candidate Photo Upload Details
        /// </summary>
        /// <param name="candDetail"> Candidate detail </param>
        public void UpdatePhotoStatus(CandidateDetail candDetail)
        {
            DBHelper.ExecuteNonQuery("usp_UpdatePrintStatus", candDetail);
        }

        /// <summary>
        /// 312511: Method to insert/update data for upload Approval Request from Dashboard
        /// </summary>
        /// <param name="appDetail"> app Detail </param>
        public void SaveApprovalRequestData(ApprovalDetails appDetail)
        {
            DBHelper.ExecuteNonQuery("usp_InsertDashboardApprovalRequest", appDetail);
        }

        /// <summary>
        /// 312511: Method to get Data for Asset Approval Request for Dashboard
        /// </summary>
        /// <param name="appDetail"> app Detail </param>
        /// <returns> returns data set </returns>
        public DataSet FetchAssetApprovalRequestData(ApprovalDetails appDetail)
        {
            DataSet dsAssetApprovalData;
            dsAssetApprovalData = DBHelper.ExecuteDataset("usp_GetDashboardAssetApprovalRequest", appDetail);
            return dsAssetApprovalData;
        }

        /// <summary>
        /// 312511: Method to update AssetApproval Status
        /// </summary>
        /// <param name="candDetail"> candidate Detail </param>
        public void UpdateAssetApprovalStatus(CandidateDetail candDetail)
        {
            DBHelper.ExecuteNonQuery("usp_UpdateAssetApprovalStatus", candDetail);
        }

        /// <summary>
        /// 312539 : Method to fetch Joining location CORP Induction Tracker
        /// </summary>
        /// <param name="candidateDetail"> candidate Detail </param>
        /// <returns> returns candidate Detail </returns> 
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList GetJoiningLocation(CandidateDetail candidateDetail)
        {
            DataSet dsCorpjlocation;
            CandidateDetailList retCand = new CandidateDetailList();
            dsCorpjlocation = DBHelper.ExecuteDataset("usp_IAT_Induction_JoiningLoation", candidateDetail);
            if (dsCorpjlocation.Tables[0].Rows.Count > 0 && dsCorpjlocation != null)
            {
                foreach (DataRow dr in dsCorpjlocation.Tables[0].Rows)
                {
                    CandidateDetail objCandDC = new CandidateDetail();
                    if (dr["City"] != null)
                    {
                        objCandDC.CityName = dr["City"].ToString();
                    }

                    retCand.Add(objCandDC);
                }
            }

            return retCand;
        }

        /// <summary>
        /// 312539 : Method to fetch Joining location CORP Induction Tracker
        /// </summary>
        /// <param name="candidateDetail"> candidate Detail </param>
        /// <returns> returns candidate Detail </returns> 
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList GetInductionLocation(CandidateDetail candidateDetail)
        {
            DataSet dsCorpjlocation;
            CandidateDetailList retCand = new CandidateDetailList();
            dsCorpjlocation = DBHelper.ExecuteDataset("usp_IAT_Induction_JoiningLoation", candidateDetail);
            if (dsCorpjlocation.Tables[1].Rows.Count > 0 && dsCorpjlocation != null)
            {
                foreach (DataRow dr in dsCorpjlocation.Tables[1].Rows)
                {
                    CandidateDetail objCandDC = new CandidateDetail();
                    if (dr["Venue"] != null)
                    {
                        objCandDC.LocationDesc = dr["Venue"].ToString();
                    }

                    retCand.Add(objCandDC);
                }
            }

            return retCand;
        }

        /// <summary>
        /// 312539 : Method to fetch Joining location CORP Induction Tracker
        /// </summary>
        /// <param name="candidateDetail"> candidate Detail </param>
        /// <returns> returns candidate Detail </returns> 
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList GetInductionCandidateStatus(CandidateDetail candidateDetail)
        {
            DataSet dsCorpjlocation;
            CandidateDetailList retCand = new CandidateDetailList();
            dsCorpjlocation = DBHelper.ExecuteDataset("usp_IAT_Induction_JoiningLoation", candidateDetail);
            if (dsCorpjlocation.Tables[2].Rows.Count > 0 && dsCorpjlocation != null)
            {
                foreach (DataRow dr in dsCorpjlocation.Tables[2].Rows)
                {
                    CandidateDetail objCandDC = new CandidateDetail();
                    if (dr["CandidateStatus"] != null)
                    {
                        objCandDC.LocationDesc = dr["CandidateStatus"].ToString();
                    }

                    retCand.Add(objCandDC);
                }
            }

            return retCand;
        }

        /// <summary>
        /// 312539 : Method to fetch Get Induction Country Name
        /// </summary>
        /// <param name="candidateDetail"> candidate Detail </param>
        /// <returns> returns candidate Detail </returns> 
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList GetInductionCountryName(CandidateDetail candidateDetail)
        {
            DataSet dsCorpjlocation;
            CandidateDetailList retCand = new CandidateDetailList();
            dsCorpjlocation = DBHelper.ExecuteDataset("usp_IAT_Induction_JoiningLoation", candidateDetail);
            if (dsCorpjlocation.Tables[4].Rows.Count > 0 && dsCorpjlocation != null)
            {
                foreach (DataRow dr in dsCorpjlocation.Tables[4].Rows)
                {
                    CandidateDetail objCandDC = new CandidateDetail();
                    if (dr["CountryName"] != null)
                    {
                        objCandDC.LocationDesc = dr["CountryName"].ToString();
                    }

                    retCand.Add(objCandDC);
                }
            }

            return retCand;
        }

        /// <summary>
        /// 312539 : Method to fetch Get C Hire Status
        /// </summary>
        /// <param name="candidateDetail"> candidate Detail </param>
        /// <returns> candidate list </returns> 
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList GetChireStatus(CandidateDetail candidateDetail)
        {
            DataSet dsCorpjlocation;
            CandidateDetailList retCand = new CandidateDetailList();
            dsCorpjlocation = DBHelper.ExecuteDataset("usp_IAT_Induction_JoiningLoation", candidateDetail);
            if (dsCorpjlocation.Tables[5].Rows.Count > 0 && dsCorpjlocation != null)
            {
                foreach (DataRow dr in dsCorpjlocation.Tables[5].Rows)
                {
                    CandidateDetail objCandDC = new CandidateDetail();
                    if (dr["CHireStatus"] != null)
                    {
                        objCandDC.LocationDesc = dr["CHireStatus"].ToString();
                    }

                    retCand.Add(objCandDC);
                }
            }

            return retCand;
        }

        /// <summary>
        /// 312539 : Method to fetch Get Candidate Joining Types
        /// </summary>
        /// <param name="candidateDetail"> candidate Detail </param>
        /// <returns> candidate joining type Detail </returns> 
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateDetailList GetCanidateJoiningTypes(CandidateDetail candidateDetail)
        {
            DataSet dsCorpjlocation;
            CandidateDetailList retCand = new CandidateDetailList();
            dsCorpjlocation = DBHelper.ExecuteDataset("usp_IAT_Induction_JoiningLoation", candidateDetail);
            if (dsCorpjlocation.Tables[3].Rows.Count > 0 && dsCorpjlocation != null)
            {
                foreach (DataRow dr in dsCorpjlocation.Tables[3].Rows)
                {
                    CandidateDetail objCandDC = new CandidateDetail();
                    if (dr["CanddidateType"] != null)
                    {
                        objCandDC.LocationDesc = dr["CanddidateType"].ToString();
                    }

                    retCand.Add(objCandDC);
                }
            }

            return retCand;
        }

        /// <summary>
        /// 312539 : Method to Fetch candidates Induction tracker for showing in dashboard
        /// </summary>
        /// <param name="dashboardDetail"> Sends the search criteria specified in dashboard. </param>
        /// <param name="totalCount"> returns the total records returned for search criteria </param>
        /// <returns> candidate list </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "1", Justification = "Reviewed.")]
        public string FetchCandidateInductionTrackerDashboard(DashboardDataDC dashboardDetail, TotalCountDC totalCount)
        {
            DataSet dsDashboardData;
            dsDashboardData = DBHelper.ExecuteDataset("usp_IAT_GetInductionDetails", dashboardDetail);
            string xmlcandidateslist = string.Empty;
            if (dsDashboardData != null && dsDashboardData.Tables.Count > 0)
            {
                if (dsDashboardData.Tables[1].Rows.Count > 0)
                {
                    try
                    {
                        totalCount.TotalCount = 0;                    //// 397785 , code analysis fix CA1806 
                        totalCount.TotalCount = int.Parse(dsDashboardData.Tables[1].Rows[0][0].ToString());
                    }
                    catch
                    {
                        totalCount.TotalCount = 0;
                    }
                    ////totalCount = 0;
                    ////bool success = int.TryParse(dsDashboardData.Tables[1].Rows[0][0].ToString(), out totalCount);
                    ////if (!success)
                    ////{
                    ////    totalCount = 0;
                    ////}
                }

                if (dsDashboardData.Tables[0].Rows.Count > 0)
                {
                    xmlcandidateslist = dsDashboardData.GetXml();
                }
            }

            return xmlcandidateslist;
        }

        /// <summary>
        /// 312539 : Method to Fetch candidates details based on location
        /// </summary>
        /// <param name="dashboardDetail"> Sends the search criteria specified in dashboard. </param>
        /// <param name="totalCount"> returns the total records returned for search criteria </param>
        /// <returns> candidate list </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "1", Justification = "Reviewed.")]
        public string FetchCandidateDetailsInductionLocation(DashboardDataDC dashboardDetail, TotalCountDC totalCount)
        {
            DataSet dsDashboardData;
            dsDashboardData = DBHelper.ExecuteDataset("usp_IAT_GetInductionCandidateDetails", dashboardDetail);
            string xmlcandidateslist = string.Empty;
            if (dsDashboardData != null && dsDashboardData.Tables.Count > 0)
            {
                if (dsDashboardData.Tables[1].Rows.Count > 0)
                {
                    try
                    {
                        totalCount.TotalCount = 0;                    //// 397785 , code analysis fix CA1806 
                        totalCount.TotalCount = int.Parse(dsDashboardData.Tables[1].Rows[0][0].ToString());
                    }
                    catch
                    {
                        totalCount.TotalCount = 0;
                    }
                    ////totalCount = 0;
                    ////bool success = int.TryParse(dsDashboardData.Tables[1].Rows[0][0].ToString(), out totalCount);
                    ////if (!success)
                    ////{
                    ////    totalCount = 0;
                    ////}
                }

                if (dsDashboardData.Tables[0].Rows.Count > 0)
                {
                    xmlcandidateslist = dsDashboardData.GetXml();
                }
            }

            return xmlcandidateslist;
        }

        /// <summary>
        /// 312539: Method to Download Induction Attendance Tracker Excel
        /// </summary>
        /// <param name="dashboardDetail"> Sends the search criteria specified in dashboard. </param>
        /// <param name="totalCount"> returns the total records returned for search criteria </param>
        /// <returns> dashboard data </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "1", Justification = "Reviewed.")]
        public DataSet DownloadAttendanceExcel(DashboardDataDC dashboardDetail, TotalCountDC totalCount)
        {
            DataSet dsDashboardData;
            dsDashboardData = DBHelper.ExecuteDataset("usp_IAT_GetInductionAttendancDetailsExcel", dashboardDetail);
            if ((dsDashboardData != null) && (dsDashboardData.Tables.Count > 0) && (dsDashboardData.Tables[0].Rows.Count > 0))
            {
                try
                {
                    totalCount.TotalCount = 0;                //// 397785 , code analysis fix CA1806
                    totalCount.TotalCount = int.Parse(dsDashboardData.Tables[0].Rows[0][0].ToString());
                }
                catch
                {
                    totalCount.TotalCount = 0;
                }
                ////totalCount = 0;
                ////bool success = int.TryParse(dsDashboardData.Tables[0].Rows[0][0].ToString(), out totalCount);
                ////if (!success)
                ////{
                ////    totalCount = 0;
                ////}
            }

            return dsDashboardData;
        }

        /// <summary>
        /// 312539: Update Candidate Attendance Tracker
        /// </summary>
        /// <param name="dashboardDetail"> Candidate detail </param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "0", Justification = "Reviewed.")]
        public void UpdateCandidateAttendanceTracker(DashboardDataDC dashboardDetail)
        {
            try
            {
                if (dashboardDetail.IsSingle != "0")
                {
                    if (dashboardDetail.AtteandanceUpdateCandiadatelist.Trim().Length != 0)
                    {
                        int total = dashboardDetail.AtteandanceUpdateCandiadatelist.Trim().TrimStart(',').Split(',').Length;
                        if (total > 0)
                        {
                            for (int i = 0; i < total; i++)
                            {
                                string candidateInfo = dashboardDetail.AtteandanceUpdateCandiadatelist.Trim().TrimStart(',').Split(',')[i].ToString();
                                if (candidateInfo.Trim().Split('/').Length > 0)
                                {
                                    DashboardDataDC objDashboardDetail = new DashboardDataDC();
                                    objDashboardDetail.InductionStatus = candidateInfo.Trim().Split('/')[0].TrimStart(',');
                                    objDashboardDetail.CandidateId = Convert.ToInt32(candidateInfo.Trim().Split('/')[1]);
                                    objDashboardDetail.CandidateName = candidateInfo.Trim().Split('/')[2];
                                    objDashboardDetail.SessionId = dashboardDetail.SessionId;
                                    DBHelper.ExecuteNonQuery("usp_IAT_UpdateCandidateAttendance", objDashboardDetail);
                                    objDashboardDetail = null;
                                }
                            }
                        }
                    }
                }
                else
                {
                    DBHelper.ExecuteNonQuery("usp_IAT_UpdateCandidateBulkAttendance", dashboardDetail);
                }
            }
            catch
            {
                throw;
            }
        }

        ///// <summary>
        ///// 298589: Method to Get Approved Documents in HRSS Dashboard
        ///// </summary>
        ///// <param name="candDetail"></param>
        ////public CandidateApproveListDataSource GetDocumentsforApproval(CandidateDocumentForApproval CandidateId)
        ////{
        ////    DataSet dsCandidateData;
        ////    CandidateApproveListDataSource objCanDataSource = new CandidateApproveListDataSource();
        ////    CandidateApproveListData objCanData = new CandidateApproveListData();
        ////    dsCandidateData = DBHelper.ExecuteDataset("usp_ECM_GetCandidateDocumentListForApproval", CandidateId);
        ////    foreach (DataRow dr in dsCandidateData.Tables[0].Rows)
        ////    {
        ////        CandidateDocumentForApproval objCandidateDoc = new CandidateDocumentForApproval();
        ////        objCandidateDoc.CandidateId = Convert.ToInt64(dr["CandidateId"].ToString());
        ////        objCandidateDoc.DocumentName = dr["FileName"].ToString();
        ////        objCandidateDoc.ECMDocumentId = dr["ECMDocumentId"].ToString();
        ////        objCandidateDoc.ApprovalStatus = Convert.ToInt32(dr["ApprovalStatus"].ToString());
        ////        objCandidateDoc.TaskName = dr["TaskName"].ToString();
        ////        objCandidateDoc.DocumentApproveRemark = dr["DocumentApproveRemark"].ToString();
        ////        objCandidateDoc.TaskId = Convert.ToInt32(dr["TaskId"].ToString());
        ////        objCandidateDoc.CurrentDate = dr["CurrentDate"].ToString();
        ////        objCandidateDoc.ECMDocumentName = dr["ECMDocumentName"].ToString();
        ////        objCanData.Add(objCandidateDoc);
        ////    }
        ////    objCanDataSource.ApproveData = objCanData;
        ////    return objCanDataSource;
        ////}

        /// <summary>
        /// 312539: DOJ Confirm
        /// </summary>
        /// <param name="candDetail"> Candidate detail are provided to do update parameters like EDOJ , Offer status , Email Id </param>
        public void UpdateCandidateDOJConfirm(CandidateDetail candDetail)
        {
            DBHelper.ExecuteNonQuery("usp_UpdateCandidateDOJConfirm", candDetail);
        }

        /// <summary>
        /// 312511 : Method to fetch the associate contact details
        /// </summary>
        /// <param name="dashboardDetail"> dashboard Detail </param>
        /// <returns> returns associate contact Detail </returns>
        public CandidateDetail FetchPOCInfo(DashboardDataDC dashboardDetail)
        {
            CandidateDetail objCandidate = new CandidateDetail();
            ////objCandidate.CandidateId = dashboardDetail.CandidateId;
            DataSet dsPOCInfo;
            dsPOCInfo = DBHelper.ExecuteDataset("usp_FetchAssociateContactInfo", dashboardDetail);
            if (dsPOCInfo != null && dsPOCInfo.Tables.Count > 0)
            {
                if (dsPOCInfo.Tables[0].Rows.Count > 0)
                {
                    objCandidate.RecruiterID = Convert.ToInt32(dsPOCInfo.Tables[0].Rows[0]["RecruiterId"]);
                    objCandidate.RecruiterName = dsPOCInfo.Tables[0].Rows[0]["RecruiterName"].ToString();
                    objCandidate.RecruiterMobileNo = dsPOCInfo.Tables[0].Rows[0]["RecruiterMobileNumber"].ToString();
                    objCandidate.RecruiterVnetNo = dsPOCInfo.Tables[0].Rows[0]["RecruiterVnetNumber"].ToString();
                }
            }

            return objCandidate;
        }

        /// <summary>
        /// 261890: Method to Fetch Candidate Hire Type
        /// </summary>
        /// <param name="parentId"> parent Id </param>
        /// <returns> candidate type </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public DashBoardDataList FetchCandidateHireType(DashboardDataDC parentId)
        {
            DataSet dsCandidateHireType;
            DashBoardDataList retCandType = new DashBoardDataList();
            dsCandidateHireType = DBHelper.ExecuteDataset("usp_FetchMasters", parentId);
            foreach (DataRow dr in dsCandidateHireType.Tables[0].Rows)
            {
                DashboardDataDC objCandTypeDC = new DashboardDataDC();
                objCandTypeDC.CandidateTypeCode = dr["Code"] != DBNull.Value ? int.Parse(dr["Code"].ToString()) : 0;
                objCandTypeDC.CandidateTypeDesc = dr["Description"].ToString();
                retCandType.Add(objCandTypeDC);
            }

            return retCandType;
        }

        #region BGVDashboard
        /// <summary>
        /// 312511 : Method to Fetch candidates for showing in dashboard 
        /// </summary>
        /// <param name="dashboardDetail"> Sends the search criteria specified in dashboard. </param>
        /// <param name="totalCount"> returns the total records returned for search criteria</param>
        /// <returns> candidate list </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "1", Justification = "Reviewed.")]
        public string FetchCandidatesForDashboard(DashboardDataDC dashboardDetail, TotalCountDC totalCount)
        {
            DataSet dsDashboardData;
            dsDashboardData = DBHelper.ExecuteDataset("usp_FetchDashboardCandidates", dashboardDetail); // HRSS,RC & TM dashboards use same SP.
            string xmlcandidateslist = string.Empty;
            if (dsDashboardData != null && dsDashboardData.Tables.Count > 0)
            {
                if (dsDashboardData.Tables[0].Rows.Count > 0)
                {
                    try
                    {
                        totalCount.TotalCount = 0;                    //// 397785 , code analysis fix CA1806 
                        totalCount.TotalCount = int.Parse(dsDashboardData.Tables[0].Rows[0][0].ToString());
                    }
                    catch
                    {
                        totalCount.TotalCount = 0;
                    }

                    ////totalCount = 0;
                    ////bool success = int.TryParse(dsDashboardData.Tables[0].Rows[0][0].ToString(), out totalCount);
                    ////if (!success)
                    ////{
                    ////    totalCount = 0;
                    ////}
                }

                xmlcandidateslist = dsDashboardData.GetXml();
            }

            return xmlcandidateslist;
        }

        /// <summary>
        /// 312511: Method to Fetch candidates for Excel report generation
        /// </summary>
        /// <param name="dashboardDetail"> Sends the search criteria specified in dashboard. </param>
        /// <param name="totalCount"> returns the total records returned for search criteria</param>
        /// <returns> dashboard data </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "1", Justification = "Reviewed.")]
        public DataSet FetchCandidatesForDashboardExcel(DashboardDataDC dashboardDetail, TotalCountDC totalCount)
        {
            DataSet dsDashboardData;
            dsDashboardData = DBHelper.ExecuteDataset("usp_FetchDashboardCandidatesForExcel", dashboardDetail);
            if ((dsDashboardData != null) && (dsDashboardData.Tables.Count > 0) && (dsDashboardData.Tables[0].Rows.Count > 0))
            {
                try
                {
                    totalCount.TotalCount = 0;                //// 397785 , code analysis fix CA1806 
                    totalCount.TotalCount = int.Parse(dsDashboardData.Tables[0].Rows[0][0].ToString());
                }
                catch
                {
                    totalCount.TotalCount = 0;
                }
                ////totalCount = 0;
                ////bool success = int.TryParse(dsDashboardData.Tables[0].Rows[0][0].ToString(), out totalCount);
                ////if (!success)
                ////{
                ////    totalCount = 0;
                ////}
            }

            return dsDashboardData;
        }

        /// <summary>
        /// 312511: Method to get filter data for candidate search
        /// </summary>
        /// <param name="autoCompleteDC"> auto Complete DC </param>
        /// <returns> SP result set </returns>
        public DataSet FetchCandidatesFilterSearchdata(AutoCompleteDC autoCompleteDC)
        {
            return DBHelper.ExecuteDataset("usp_CandidateSearchForDashboard", autoCompleteDC);
        }

        /// <summary>
        /// 312539: get personal details
        /// </summary>
        /// <param name="dashboardDetail"> dashboard Detail </param>
        /// <returns> xml for personal details </returns>
        public string FetchCandidatePersonalData(DashboardDataDC dashboardDetail)
        {
            DataSet dsDashboardData;
            string xmlpersnaldetail = string.Empty;
            dsDashboardData = DBHelper.ExecuteDataset("usp_FetchDrillDownDataCandidateInfo", dashboardDetail);
            if (dsDashboardData != null)
            {
                xmlpersnaldetail = dsDashboardData.GetXml();
            }

            return xmlpersnaldetail;
        }

        /// <summary>
        /// 312511 : Method to fetch the prefill values of a candidate in dashboard
        /// </summary>
        /// <param name="dashboardDetail"> dashboard Detail </param>
        /// <returns> returns xml list </returns>
        public string FetchCandidatesPrefillvalues(DashboardDataDC dashboardDetail)
        {
            DataSet datsetPrefillCandidateData;
            datsetPrefillCandidateData = DBHelper.ExecuteDataset("usp_FetchCandidatePrefillValues", dashboardDetail);
            string xmlcandidateslist = string.Empty;
            if (datsetPrefillCandidateData != null && datsetPrefillCandidateData.Tables.Count > 0)
            {
                if (datsetPrefillCandidateData.Tables[0].Rows.Count > 0)
                {
                    xmlcandidateslist = datsetPrefillCandidateData.GetXml();
                }
            }

            return xmlcandidateslist;
        }

        /// <summary>
        /// 312511 : Method to Fetch candidates for showing in vendor dashboard
        /// </summary>
        /// <param name="dashboardDetail"> Sends the search criteria specified in dashboard. </param>
        /// <param name="totalCount"> returns the total records returned for search criteria</param>
        /// <returns> returns xml for candidate list </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "1", Justification = "Reviewed.")]
        public string FetchCandidatesForVendorDashboard(DashboardDataDC dashboardDetail, TotalCountDC totalCount)
        {
            DataSet dsDashboardData;
            dsDashboardData = DBHelper.ExecuteDataset("usp_FetchVendorDashboardCandidates", dashboardDetail);
            string xmlcandidateslist = string.Empty;
            if (dsDashboardData != null && dsDashboardData.Tables.Count > 0)
            {
                if (dsDashboardData.Tables[0].Rows.Count > 0)
                {
                    try
                    {
                        totalCount.TotalCount = 0;                    //// 397785 , code analysis fix CA1806 
                        totalCount.TotalCount = int.Parse(dsDashboardData.Tables[0].Rows[0][0].ToString());
                    }
                    catch
                    {
                        totalCount.TotalCount = 0;
                    }
                    ////totalCount = 0;
                    ////bool success = int.TryParse(dsDashboardData.Tables[0].Rows[0][0].ToString(), out totalCount);
                    ////if (!success)
                    ////{
                    ////    totalCount = 0;
                    ////}
                }

                xmlcandidateslist = dsDashboardData.GetXml();
            }

            return xmlcandidateslist;
        }

        /// <summary>
        /// 312511: Method to Fetch candidates for Excel report generation for Vendor dashboard
        /// </summary>
        /// <param name="dashboardDetail"> Sends the search criteria specified in dashboard. </param>
        /// <param name="totalCount"> returns the total records returned for search criteria</param>
        /// <returns> dashboard data </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "1", Justification = "Reviewed.")]
        public DataSet FetchCandidatesForVendorDashboardExcel(DashboardDataDC dashboardDetail, TotalCountDC totalCount)
        {
            DataSet dsDashboardData;
            dsDashboardData = DBHelper.ExecuteDataset("usp_FetchVendorDashboardCandidatesForExcel", dashboardDetail);
            if ((dsDashboardData != null) && (dsDashboardData.Tables.Count > 0) && (dsDashboardData.Tables[0].Rows.Count > 0))
            {
                try
                {
                    totalCount.TotalCount = 0;                //// 397785 , code analysis fix CA1806 
                    totalCount.TotalCount = int.Parse(dsDashboardData.Tables[0].Rows[0][0].ToString());
                }
                catch
                {
                    totalCount.TotalCount = 0;
                }
                ////totalCount = 0;
                ////bool success = int.TryParse(dsDashboardData.Tables[0].Rows[0][0].ToString(), out totalCount);
                ////if (!success)
                ////{
                ////    totalCount = 0;
                ////}
            }

            return dsDashboardData;
        }

        #endregion
        #region BGV Data Access Methods

        /// <summary>
        /// 249510: Method to Save CIS Data
        /// </summary>
        /// <param name="getprefillvalues"> get prefill values </param>
        /// <returns> returns get prefill values </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public BgvCandidateData GetCisData(BgvCandidateData getprefillvalues)
        {
            DataSet dsPrefillValues;
            BgvCandidateData objPrefillDC = new BgvCandidateData();
            dsPrefillValues = DBHelper.ExecuteDataset("usp_BGV_SaveCandidateBgvDetail", getprefillvalues);
            if (dsPrefillValues != null)
            {
                dsPrefillValues.DataSetName = "PrefillValues";
                ////Assign Cis data XML to object
                if (dsPrefillValues.Tables.Count > 0 && dsPrefillValues.Tables[0] != null)
                {
                    dsPrefillValues.Tables[0].TableName = "CisDataXML";
                    ////Assigning Cis personal data Xml to object
                    objPrefillDC.CisPersonalDataXML = dsPrefillValues.Tables[0].Rows[0]["CisPersonalDataXML"].ToString();
                    objPrefillDC.CisPersonalDataLogXML = dsPrefillValues.Tables[0].Rows[0]["CisPersonalDataLogXML"].ToString();
                    objPrefillDC.IsCisStarted = Convert.ToInt16(dsPrefillValues.Tables[0].Rows[0]["IsCisLocked"]);
                    objPrefillDC.CisStatus = Convert.ToInt16(dsPrefillValues.Tables[0].Rows[0]["CisStatus"]);
                    dsPrefillValues.Tables.RemoveAt(0);
                }

                ////Assigning Cis prefilling data to object in XML format
                if (dsPrefillValues.Tables.Count > 0)
                {
                    int tableCount = 0;
                    DataTable dt = dsPrefillValues.Tables[0];
                    tableCount += 1;
                    dt.TableName = "Set" + tableCount.ToString();
                    objPrefillDC.CisPrefillData = dsPrefillValues.GetXml().ToString();
                    dsPrefillValues.Tables.RemoveAt(0);
                }

                ////Assigning Cis prefilling data to object in XML format
                if (dsPrefillValues.Tables.Count > 0)
                {
                    int tableCount = 0;
                    foreach (DataTable dt in dsPrefillValues.Tables)
                    {
                        tableCount += 1;
                        dt.TableName = "Set" + tableCount.ToString();
                    }

                    objPrefillDC.CisComponentData = dsPrefillValues.GetXml().ToString();
                }
            }

            dsPrefillValues = null;
            return objPrefillDC;
        }

        /// <summary>
        /// 313248:Method to get the component list
        /// </summary>
        /// <param name="typeGroupId"> type GroupId </param>
        /// <returns> object Candidate Component Data </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public BgvCandidateData GetComponentList(BgvCandidateData typeGroupId)
        {
            DataSet dsComponentDetails;
            BgvCandidateData objCandidateComponentData = new BgvCandidateData();
            ComponentList retComList = new ComponentList();
            dsComponentDetails = DBHelper.ExecuteDataset("usp_BGV_GetComponentList", typeGroupId);
            if (dsComponentDetails.Tables.Count > 0)
            {
                foreach (DataRow dr in dsComponentDetails.Tables[0].Rows)
                {
                    ComponentDC objComponent = new ComponentDC();
                    objComponent.ComponentId = Convert.ToInt32(dr["ComponentId"]);
                    objComponent.ComponentDesc = dr["ComponentDesc"].ToString();
                    objComponent.ComponentDetailId = Convert.ToInt32(dr["ComponentDetailId"]);
                    objComponent.ComponentCode = dr["ComponentCode"].ToString();
                    objComponent.IsComponentSelected = Convert.ToInt32(dr["IsComponentSelected"]);
                    retComList.Add(objComponent);
                    objCandidateComponentData.ComponentList = retComList;
                }

                dsComponentDetails.Tables.RemoveAt(0);
            }

            if (dsComponentDetails.Tables.Count > 0)
            {
                objCandidateComponentData.CisEduDataXML = dsComponentDetails.Tables[0].Rows[0][0].ToString();
            }

            dsComponentDetails = null;
            return objCandidateComponentData;
        }

        /// <summary>
        /// Method to get component detail id based on Component code, Candidate's BU and CountryId
        /// </summary>
        /// <param name="componentData"> component Data </param>
        /// <returns> returns component Data </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "0", Justification = "Reviewed.")]
        public BgvComponent GetComponentDetailId(BgvComponent componentData)
        {
            DataSet dsComponentDetails = DBHelper.ExecuteDataset("usp_BGV_GetComponentDetailId", componentData);
            if (dsComponentDetails.Tables.Count > 0)
            {
                componentData.ComponentDetailId = Convert.ToInt32(dsComponentDetails.Tables[0].Rows[0]["ComponentDetailId"]);
            }

            dsComponentDetails = null;
            return componentData;
        }

        /// <summary>
        /// Method to get component configurations
        /// </summary>
        /// <param name="componentData"> component Data </param>
        /// <returns> returns component Data </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "0", Justification = "Reviewed.")]
        public BgvComponent GetComponentConfig(BgvComponent componentData)
        {
            DataSet dsComponentDetails = DBHelper.ExecuteDataset("usp_BGV_GetComponentConfig", componentData);
            if (dsComponentDetails.Tables.Count > 0)
            {
                componentData.ComponentName = dsComponentDetails.Tables[0].Rows[0]["ComponentName"].ToString();
                componentData.XMLTemplate = dsComponentDetails.Tables[0].Rows[0]["DataXML"].ToString();
                componentData.HTMLTemplate = dsComponentDetails.Tables[0].Rows[0]["DataHTML"].ToString();
                componentData.IsRepeatable = Convert.ToBoolean(dsComponentDetails.Tables[0].Rows[0]["IsRepeatable"]);
                componentData.DisplayOrder = Convert.ToInt32(dsComponentDetails.Tables[0].Rows[0]["DisplayOrder"]);
                componentData.CanDelete = Convert.ToBoolean(dsComponentDetails.Tables[0].Rows[0]["CanDelete"]);
                componentData.MaxRunnerId = Convert.ToInt32(dsComponentDetails.Tables[0].Rows[0]["MaxRunnerId"]);
            }

            dsComponentDetails = null;
            return componentData;
        }

        /// <summary>
        /// Method to get suspect status for an institution
        /// </summary>
        /// <param name="componentData"> component Data </param>
        /// <returns> returns component Data </returns>
        public InstitutionDC GetSuspectStatus(BgvComponent componentData)
        {
            InstitutionDC objInstitute = new InstitutionDC();
            DataSet dsComponentDetails = DBHelper.ExecuteDataset("usp_BGV_GetSuspectInfo", componentData);
            if (dsComponentDetails.Tables.Count > 0 && dsComponentDetails.Tables[0].Rows.Count > 0)
            {
                objInstitute.BackPaperRequestedBy = dsComponentDetails.Tables[0].Rows[0]["BackPaperRequestedBy"].ToString();
                objInstitute.SuspectStatus = Convert.ToInt32(dsComponentDetails.Tables[0].Rows[0]["SuspectStatus"]);
                objInstitute.SuspectRating = Convert.ToInt32(dsComponentDetails.Tables[0].Rows[0]["SuspectRating"]);
                objInstitute.SuspectSource = dsComponentDetails.Tables[0].Rows[0]["SuspectSource"].ToString();
                objInstitute.SuspectDesc = dsComponentDetails.Tables[0].Rows[0]["SuspectDescription"].ToString();
                objInstitute.IsActive = Convert.ToInt32(dsComponentDetails.Tables[0].Rows[0]["IsActive"]);
            }

            dsComponentDetails = null;
            return objInstitute;
        }

        /// <summary>
        /// Method to get component data for a candidate
        /// </summary>
        /// <param name="componentData"> component Data </param>
        /// <returns> returns component Data </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "0", Justification = "Reviewed.")]
        public BgvCandidateData GetCandidateComponentData(BgvCandidateData componentData)
        {
            DataSet dsComponentDetails = DBHelper.ExecuteDataset("usp_BGV_GetCandidateComponentData", componentData);
            if (dsComponentDetails.Tables.Count > 0)
            {
                componentData.CisComponentData = dsComponentDetails.Tables[0].Rows[0]["DataXML"].ToString();
                componentData.CisComponentDataLog = dsComponentDetails.Tables[0].Rows[0]["LogXML"].ToString();
                componentData.IsCisStarted = Convert.ToInt16(dsComponentDetails.Tables[0].Rows[0]["IsCisLocked"]);
                componentData.CisStatus = Convert.ToInt16(dsComponentDetails.Tables[0].Rows[0]["CisStatus"]);
                componentData.RedirectMode = Convert.ToInt16(dsComponentDetails.Tables[0].Rows[0]["RedirectMode"]);
                componentData.RedirectTo = dsComponentDetails.Tables[0].Rows[0]["RedirectTo"].ToString();
                componentData.HrssSaveStatus = Convert.ToInt16(dsComponentDetails.Tables[0].Rows[0]["HrssSaveStatus"].ToString());
                componentData.CandidateSaveStatus = Convert.ToInt16(dsComponentDetails.Tables[0].Rows[0]["CandidateSaveStatus"].ToString());
                componentData.IsAssignedToVendor = Convert.ToInt32(dsComponentDetails.Tables[0].Rows[0]["IsAssignedToVendor"].ToString());
            }

            dsComponentDetails = null;
            return componentData;
        }

        /// <summary>
        /// 249510: To get the document list for candidate
        /// </summary>
        /// <param name="documentDetails"> document Details </param>
        /// <returns> returns document Details </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public BgvComponent GetDocumetDataXml(BgvComponent documentDetails)
        {
            DataSet dsDocumentDetails;
            BgvComponent objDocDC = new BgvComponent();
            dsDocumentDetails = DBHelper.ExecuteDataset("usp_BGV_GetDocList", documentDetails);
            if (dsDocumentDetails.Tables.Count > 0)
            {
                dsDocumentDetails.DataSetName = "DesignHtml";
                dsDocumentDetails.Tables[0].TableName = "Data";
                objDocDC.XMLTemplate = dsDocumentDetails.GetXml().ToString();
            }

            dsDocumentDetails = null;
            return objDocDC;
        }

        /// <summary>
        ///  249510 : Method to fetch BGV URL 
        /// </summary>
        /// <param name="roleURL"> role URL </param>
        /// <returns> returns candidate data </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public BgvCandidateData GetURLforRole(BgvCandidateData roleURL)
        {
            DataSet dsTabs;
            BgvCandidateData objCanData = new BgvCandidateData();
            MenuTabList objMenuTab = new MenuTabList();
            dsTabs = DBHelper.ExecuteDataset("usp_BGV_GetURLforRole", roleURL);
            foreach (DataRow dr in dsTabs.Tables[0].Rows)
            {
                MenuTabContent objMTC = new MenuTabContent();
                objMTC.MenuName = dr["MenuName"].ToString();
                objMTC.PageUrl = dr["PageUrl"].ToString();
                objMTC.IsUrlAllowed = Convert.ToInt16(dr["IsUrlAllowed"]);
                objMTC.IsBgvEnabled = Convert.ToInt16(dr["IsBgvEnabled"]);
                objMTC.CurrentPage = Convert.ToInt16(dr["CurrentPage"]);
                objMenuTab.Add(objMTC);
            }

            objCanData.MenuTab = objMenuTab;
            dsTabs = null;
            return objCanData;
        }

        /// <summary>
        /// Method to get list of notification messages which needs to be displayed in BGV pages
        /// </summary>
        /// <param name="objBgvPageNotificationData"> Object of type BGV Page Notification Data </param>
        /// <returns> BGV Page Notification Data </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "0", Justification = "Reviewed.")]
        public BgvPageNotificationData GetPageNotification(BgvPageNotificationData objBgvPageNotificationData)
        {
            DataSet dsTabs;
            dsTabs = DBHelper.ExecuteDataset("usp_BGV_GetPageNotification", objBgvPageNotificationData);
            objBgvPageNotificationData.BgvPageNoticationList = new List<BgvPageNotification>();
            foreach (DataRow dr in dsTabs.Tables[0].Rows)
            {
                BgvPageNotification objBgvPageNotification = new BgvPageNotification();
                objBgvPageNotification.MessageOrder = Convert.ToInt16(dr["MsgOrder"]);
                objBgvPageNotification.Message = dr["DisplayMsg"].ToString();
                objBgvPageNotificationData.BgvPageNoticationList.Add(objBgvPageNotification);
            }

            dsTabs = null;
            return objBgvPageNotificationData;
        }

        /// <summary>
        ///  249510 : Method to get Relevant EXP info
        /// </summary>
        /// <param name="expInfo"> EXP Info </param>
        /// <returns> returns DOC DC </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public BgvCandidateData GetRelevantExpInfo(BgvCandidateData expInfo)
        {
            ////int val = int.Parse(DBHelper.ExecuteScalar("usp_BGV_GetExpInfo", ExpInfo).ToString());
            ////return (int)DBHelper.ExecuteScalar("usp_GetExpInfo", ExpInfo);
            ////return val;
            DataSet dsExpInfo;
            BgvCandidateData objDocDC = new BgvCandidateData();
            dsExpInfo = DBHelper.ExecuteDataset("usp_BGV_GetExpInfo", expInfo);
            if (dsExpInfo.Tables.Count > 0)
            {
                dsExpInfo.DataSetName = "ExpInfo";
                dsExpInfo.Tables[0].TableName = "ExpInfo";
                objDocDC.RelevantExp = Convert.ToInt16(dsExpInfo.Tables[0].Rows[0][0].ToString());
                objDocDC.CisStatus = Convert.ToInt16(dsExpInfo.Tables[0].Rows[0][1].ToString());
            }

            return objDocDC;
        }

        /// <summary>
        /// 298589: Method to update approve or reject for the uploaded document
        /// </summary>    
        /// <param name="documentStatus"> document Status </param>
        /// <returns> returns DOC approval </returns>
        public DocumentApprovalStatusDC DocumentApprovalStatus(DocumentApprovalStatusDC documentStatus)
        {
            DataSet dsDocumentDetails;
            DocumentApprovalStatusDC objDocApproval = new DocumentApprovalStatusDC();
            dsDocumentDetails = DBHelper.ExecuteDataset("usp_BGV_DocumentApprovalStatus", documentStatus);
            if (dsDocumentDetails.Tables.Count > 0)
            {
                foreach (DataRow dr in dsDocumentDetails.Tables[0].Rows)
                {
                    objDocApproval.RequestDoc = Convert.ToInt16(dr["RequestDoc"]);
                    objDocApproval.VendorEnabled = Convert.ToInt16(dr["VendorEnabled"]);
                    objDocApproval.BGvSpecStatus = Convert.ToInt16(dr["BGvSpecStatus"]);
                    objDocApproval.MandatoryApproved = Convert.ToInt16(dr["MandatoryApproved"]);
                    objDocApproval.StatusTxt = dr["StatusTxt"].ToString();
                    objDocApproval.DocumentStatus = Convert.ToInt32(dr["DocumentStatus"]);
                    objDocApproval.ApprovalStatus = Convert.ToInt32(dr["ApprovalStatus"]);
                    objDocApproval.Upload = Convert.ToInt16(dr["Upload"]);
                    objDocApproval.DocView = Convert.ToInt16(dr["DocView"]);
                    objDocApproval.Approve = Convert.ToInt16(dr["Approve"]);
                    objDocApproval.Reject = Convert.ToInt16(dr["Reject"]);
                    objDocApproval.MandatoryDocUploaded = Convert.ToInt16(dr["MandatoryDocUploaded"]);
                    objDocApproval.CisDocDataFlag = Convert.ToInt32(dr["CisDocDataFlag"]);
                    objDocApproval.ECMDocumentName = dr["ECMDocumentName"].ToString();
                    objDocApproval.Url = dr["Url"].ToString();
                    objDocApproval.CisStatus = Convert.ToInt32(dr["CisStatus"]);
                    objDocApproval.SubmitBtnEnabled = Convert.ToInt32(dr["SubmitBtnEnabled"]);
                    objDocApproval.ApprovalBtnEnable = Convert.ToInt32(dr["ApprovalBtnEnable"]);
                    objDocApproval.MandatoryAlert = Convert.ToInt32(dr["MandatoryAlert"]);
                    objDocApproval.DocUploadedTS = dr["DocUploadedTS"].ToString();
                    objDocApproval.InfoMsg = dr["InfoMsg"].ToString();
                }
            }

            dsDocumentDetails = null;
            return objDocApproval;
        }

        /// <summary>
        /// 313248: To get the document list for candidate
        /// </summary>
        /// <param name="documentDetails"> document Details </param>
        /// <returns> returns DOC list </returns>
        public BGVDocumentUploadDetail GetDocumentList(BgvCandidateData documentDetails)
        {
            DataSet dsDocumentDetails;
            BGVDocumentUploadDetail objDocDC = new BGVDocumentUploadDetail();
            //// BgvUploadDocument retDocList = new BgvUploadDocument();
            dsDocumentDetails = DBHelper.ExecuteDataset("usp_BGV_GetDocumentList", documentDetails);
            if (dsDocumentDetails.Tables.Count > 0)
            {
                dsDocumentDetails.DataSetName = "DesignHtml";
                dsDocumentDetails.Tables[0].TableName = "Data";
                objDocDC.HtmlContent = dsDocumentDetails.GetXml().ToString();
            }

            dsDocumentDetails = null;
            return objDocDC;
        }

        /// <summary>
        /// 298589: Method to get back paper list 
        /// </summary>
        /// <param name="docList"> DOC list </param>
        /// <returns> returns DOC list </returns>
        public BGVDocumentUploadDetail GetBackPapers(BgvCandidateData docList)
        {
            DataSet dsDocumentDetails;
            BGVDocumentUploadDetail objDocDC = new BGVDocumentUploadDetail();
            //// BgvUploadDocument retDocList = new BgvUploadDocument();
            dsDocumentDetails = DBHelper.ExecuteDataset("usp_BGV_GetBackPaperList", docList);
            if (dsDocumentDetails.Tables.Count > 0)
            {
                dsDocumentDetails.DataSetName = "DesignHtml";
                dsDocumentDetails.Tables[0].TableName = "Data";
                objDocDC.HtmlContent = dsDocumentDetails.GetXml().ToString();
            }

            dsDocumentDetails = null;
            return objDocDC;
        }

        /// <summary>
        /// 249510: Method to get filter data for Employment Name
        /// </summary>
        /// <param name="employmentNameDetail"> employment Name Detail </param>
        /// <returns> returns Institution name </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public BgvCandidateData EmploymentNameAutoSearch(BgvCandidateData employmentNameDetail)
        {
            DataSet dsInstitutionList;
            BgvCandidateData objInstitutionName = new BgvCandidateData();
            InstitutionList retInstitutionList = new InstitutionList();
            dsInstitutionList = DBHelper.ExecuteDataset("usp_BGV_EmploymentNameAutoSearch", employmentNameDetail);
            if (dsInstitutionList.Tables.Count > 0)
            {
                foreach (DataRow dr in dsInstitutionList.Tables[0].Rows)
                {
                    InstitutionDC objInstitution = new InstitutionDC();
                    objInstitution.InstitutionId = Convert.ToInt32(dr["ItemId"]);
                    objInstitution.InstitutionName = dr["ItemVal"].ToString();
                    retInstitutionList.Add(objInstitution);
                    objInstitutionName.InstitutionList = retInstitutionList;
                }
            }

            dsInstitutionList = null;
            return objInstitutionName;
        }

        /// <summary>
        ///  298589 : Method to Save Vendor response
        /// </summary>
        /// <param name="listData"> list Data </param>
        /// <returns> returns DOC list </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public BgvCandidateData SaveVendorDocList(BgvCandidateData listData)
        {
            DataSet dsDocumentDetails;
            BgvCandidateData objDocDC = new BgvCandidateData();
            dsDocumentDetails = DBHelper.ExecuteDataset("usp_BGV_SaveVendorListData", listData);
            if (dsDocumentDetails.Tables.Count > 0)
            {
                dsDocumentDetails.DataSetName = "Content";
                dsDocumentDetails.Tables[0].TableName = "Data";
                objDocDC.Content = dsDocumentDetails.GetXml().ToString();
            }

            dsDocumentDetails = null;
            return objDocDC;
        }

        /// <summary>
        /// 298589: Method to Save back papers 
        /// </summary>
        /// <param name="dsDocData"> document data </param>
        /// <returns> returns the DOC approval </returns>
        public DocumentApprovalStatusDC SaveBackPapers(DocumentApprovalStatusDC dsDocData)
        {
            DataSet dsDocumentDetails;
            DocumentApprovalStatusDC objDocApproval = new DocumentApprovalStatusDC();
            dsDocumentDetails = DBHelper.ExecuteDataset("usp_BGV_SaveBackPapers", dsDocData);
            if (dsDocumentDetails.Tables.Count > 0)
            {
                foreach (DataRow dr in dsDocumentDetails.Tables[0].Rows)
                {
                    objDocApproval.ECMDocumentName = dr["ECMDocumentName"].ToString();
                    objDocApproval.Url = dr["Url"].ToString();
                }
            }

            dsDocumentDetails = null;
            return objDocApproval;
        }

        #endregion

        #region BGV Config screen Data Access methods
        /// <summary>
        /// 312267 : method to take values from DB
        /// </summary>
        /// <param name="countryName"> country Name </param>
        /// <returns> returns the data set </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public DataSet DropDownCountry(BgvComponentMapping countryName)
        {
            DataSet ds = new DataSet();
            ds = DBHelper.ExecuteDataset("usp_BGVConfig_GetComponentMappingDetails", countryName);
            return ds;
        }

        /// <summary>
        /// 312267 : Method to set component mapping
        /// </summary>
        /// <param name="objBgvMap"> object BGV Map </param>
        /// <returns> returns the data set </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public DataSet BgvMapping(BgvComponentMapping objBgvMap)
        {
            DataSet ds = new DataSet();
            ////   BgvComponentMapping objBgvComMappingDc = new BgvComponentMapping();
            ds = DBHelper.ExecuteDataset("usp_BGVConfig_SetComponentMapping", objBgvMap);
            return ds;
        }

        /// <summary>
        /// 312267 : method to add BGV Document
        /// </summary>
        /// <param name="objBgvDocAdding"> object for BGV DOC Adding </param>
        /// <returns> returns documents </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public DataSet BgvDocumentAdding(BgvComponentMapping objBgvDocAdding)
        {
            DataSet dsAddDoc = new DataSet();
            dsAddDoc = DBHelper.ExecuteDataset("usp_BGVConfig_SetDocument", objBgvDocAdding);
            return dsAddDoc;
        }

        /// <summary>
        /// 312223 : method to fill values In BGV Institution Details
        /// </summary>
        /// <param name="objBgvIns"> object for BGV INS </param>
        /// <returns> returns the data set </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public DataSet BgvInstituionPrefill(InstitutionDC objBgvIns)
        {
            DataSet ds = new DataSet();
            ds = DBHelper.ExecuteDataset("usp_BGV_InstituionPrefill", objBgvIns);
            return ds;
        }

        /// <summary>
        /// 312223 : method to Insert/Update/Delete values In BGV Institution Master table
        /// </summary>
        /// <param name="objBgvIns"> object for BGV Institution </param>
        /// <returns> returns SP status </returns>
        public DataSet BgvSaveInstituion(InstitutionDC objBgvIns)
        {
            DataSet spStatus;
            spStatus = DBHelper.ExecuteDataset("usp_BGV_SaveInstitutionMaster", objBgvIns);
            return spStatus;
        }

        /// <summary>
        /// 312223 : validate values In BGV Institution details
        /// </summary>
        /// <param name="objBgvIns"> BGV Institution </param>
        /// <returns> returns SP status </returns>
        public DataSet BgvValidateInstituion(InstitutionDC objBgvIns)
        {
            DataSet spStatus;
            spStatus = DBHelper.ExecuteDataset("usp_BGV_ValidateBgvInstituion", objBgvIns);
            return spStatus;
        }

        /// <summary>
        /// 298589 : Method to update issue suspect raised in back papers
        /// </summary>
        /// <param name="listData"> list data </param>
        /// <returns> returns data list </returns>
        public int UpdateSuspectStatus(BgvCandidateData listData)
        {
            return int.Parse(DBHelper.ExecuteScalar("usp_BGV_UpdateSuspectStatus", listData).ToString());
        }

        #endregion

        /// <summary>
        /// 312539: ER Process Save Confirmation to RC
        /// </summary>
        /// <param name="dashboardDetail"> dashboard Detail  </param>
        public void SaveConfirmationERprocess(DashboardDataDC dashboardDetail)
        {
            try
            {
                DBHelper.ExecuteNonQuery("usp_SaveERRequestApproval", dashboardDetail);
            }
            catch
            {
                throw;
            }
        }

        /// <summary>
        /// 312539 : the method get ER process candidate list 
        /// </summary>
        /// <param name="dashboardDetail"> dashboard Detail </param>
        /// <param name="totalCount"> total Count </param>
        /// <returns> returns xml for candidate list </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "1", Justification = "Reviewed.")]
        public string GetERprocessCandidateView(DashboardDataDC dashboardDetail, TotalCountDC totalCount)
        {
            DataSet dsDashboardData;
            dsDashboardData = DBHelper.ExecuteDataset("usp_GetERProcesCandidatesStatus", dashboardDetail);
            string xmlcandidateslist = string.Empty;
            if (dsDashboardData != null && dsDashboardData.Tables.Count > 0)
            {
                if (dsDashboardData.Tables[0].Rows.Count > 0)
                {
                    try
                    {
                        totalCount.TotalCount = 0;                    //// 397785 , code analysis fix CA1806 
                        totalCount.TotalCount = int.Parse(dsDashboardData.Tables[0].Rows[0][0].ToString());
                    }
                    catch
                    {
                        totalCount.TotalCount = 0;
                    }
                    ////    totalCount = 0;
                    //// int.TryParse(dsDashboardData.Tables[0].Rows[0][0].ToString(), out totalCount);
                }

                xmlcandidateslist = dsDashboardData.GetXml();
            }

            return xmlcandidateslist;
        }

        /// <summary>
        /// 312539: Method to Fetch Data for Induction UploadExcelDetails
        /// </summary>
        /// <param name="candDetail"> candidate Detail </param>
        /// <returns> returns candidate details list </returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", MessageId = "errorCandidatelist", Justification = "Reviewed.")]
        public DataSet AttendanceUploadExcelDetailsData(CandidateDetail candDetail)
        {
            DataSet candDetailist;
            string errorCandidatelist = string.Empty;
            candDetailist = DBHelper.ExecuteDataset("usp_UploadInductionAttendance", candDetail);
            return candDetailist;
        }

        /// <summary>
        /// Method for CandidateId Bulk Upload
        /// </summary>
        /// <param name="candDetail"> candidate Detail </param>
        /// <returns> returns the error candidate list </returns>
        public string CandidateidBulkUpload(CandidateDetail candDetail)
        {
            SqlDataReader candDetailist;
            string errorCandidatelist = string.Empty;
            candDetailist = DBHelper.ExecuteReader("usp_BulkUploadCandidateIdHRSS", candDetail);
            while (candDetailist.Read())
            {
                string candidateIdList = candDetailist["ErrorCandidateIdList"].ToString();
                if (candidateIdList != null)
                {
                    errorCandidatelist = candidateIdList.ToString();
                }
            }

            return errorCandidatelist;
        }

        #region HTransferMethods
        /// <summary>
        /// 261671: To get the HT document list for candidate
        /// </summary>
        /// <param name="documentDetails"> document Details </param>
        /// <returns> returns the HT document details </returns>
        public HTransferDocumentUploadDetail GetUploadDocumentList(HTransferCandidateData documentDetails)
        {
            DataSet dsDocumentDetails;
            HTransferDocumentUploadDetail objDocDC = new HTransferDocumentUploadDetail();
            ////    HTransferUploadDocument retDocList = new HTransferUploadDocument();
            dsDocumentDetails = DBHelper.ExecuteDataset("usp_HTransfer_GetDocumentList", documentDetails);
            if (dsDocumentDetails.Tables.Count > 0)
            {
                dsDocumentDetails.DataSetName = "DesignHtml";
                dsDocumentDetails.Tables[0].TableName = "Data";
                dsDocumentDetails.Tables[1].TableName = "Group";
                dsDocumentDetails.Tables[2].TableName = "SubmitData";
                objDocDC.HtmlContent = dsDocumentDetails.GetXml().ToString();
            }

            dsDocumentDetails = null;
            return objDocDC;
        }

        /// <summary>
        /// 261671: Returns list of documents for a particular group
        /// </summary>
        /// <param name="documentDetails"> document Details </param>
        /// <returns> returns the document details </returns>
        public HTransferDocumentUploadDetail GetGroupDocumentList(HTransferDocumentDC documentDetails)
        {
            DataSet dsDocumentDetails;
            HTransferDocumentUploadDetail objDocDC = new HTransferDocumentUploadDetail();
            dsDocumentDetails = DBHelper.ExecuteDataset("usp_HTransfer_GetDocumentList", documentDetails);
            if (dsDocumentDetails.Tables.Count > 0)
            {
                dsDocumentDetails.DataSetName = "DesignHtml";
                dsDocumentDetails.Tables[0].TableName = "GroupData";
                dsDocumentDetails.Tables[1].TableName = "SubmitData";
                objDocDC.HtmlContent = dsDocumentDetails.GetXml().ToString();
            }

            dsDocumentDetails = null;
            return objDocDC;
        }

        /// <summary>
        /// 261671: To Insert or delete HT transfer Document into table after clicking Add / Remove buttons.
        /// 261671: To remove Documents after clicking on NO radio buttons
        /// </summary>
        /// <param name="documentDetails"> document Details </param>
        /// <returns> returns the DOC data </returns>
        public HTransferCandidateDocInfo InsertDeleteDocument(HTransferDocumentDC documentDetails)
        {
            DataSet dsCandidateDocData;
            ////Int64 Pk_CandidateDocumentUploadDetail;
            HTransferCandidateDocInfo objCandidateDocData = new HTransferCandidateDocInfo();
            dsCandidateDocData = DBHelper.ExecuteDataset("usp_HTransfer_GetDocumentList", documentDetails);
            foreach (DataRow dr in dsCandidateDocData.Tables[0].Rows)
            {
                if (dr["Pk_CandidateDocumentUploadDetail"] != DBNull.Value)
                {
                    objCandidateDocData.Pk_CandidateDocumentUploadDetail = Convert.ToInt64(dr["Pk_CandidateDocumentUploadDetail"]);
                }

                if (dr["URL"] != DBNull.Value)
                {
                    objCandidateDocData.UploadURL = dr["URL"].ToString();
                }

                if (dr["DocumentName"] != DBNull.Value)
                {
                    objCandidateDocData.DocumentName = dr["DocumentName"].ToString();
                }

                if (dr["DocumentStatus"] != DBNull.Value)
                {
                    objCandidateDocData.DocumentStatus = dr["DocumentStatus"].ToString();
                }

                if (dr["IsMandatory"] != DBNull.Value)
                {
                    objCandidateDocData.IsMandatory = Convert.ToInt16(dr["IsMandatory"].ToString());
                }
            }

            foreach (DataRow dr in dsCandidateDocData.Tables[1].Rows)
            {
                if (dr["CanBeSubmitted"] != DBNull.Value)
                {
                    objCandidateDocData.CanBeSubmitted = Convert.ToInt16(dr["CanBeSubmitted"].ToString());
                }
            }

            dsCandidateDocData = null;
            return objCandidateDocData;
        }

        /// <summary>
        /// 261671: Method to save ECM document return values after uploading the document
        /// </summary>
        /// <param name="candidateData"> candidate Data </param>
        /// <returns> returns the candidate data </returns>
        public HTransferCandidateDocInfo SaveHTransferUploadedDocName(HTransferDocumentDC candidateData)
        {
            HTransferCandidateDocInfo objCandData = new HTransferCandidateDocInfo();
            DataSet uploadSrcDS;
            uploadSrcDS = DBHelper.ExecuteDataset("usp_HTransfer_GetDocumentList", candidateData);
            foreach (DataRow drDocSrc in uploadSrcDS.Tables[0].Rows)
            {
                objCandData.UploadURL = drDocSrc["URL"].ToString();
                objCandData.DocumentStatus = drDocSrc["DocumentStatus"].ToString();
                objCandData.QuestionGroupId = Convert.ToInt32(drDocSrc["QuestionGroupId"]);
            }

            foreach (DataRow dr in uploadSrcDS.Tables[1].Rows)
            {
                if (dr["CanBeSubmitted"] != DBNull.Value)
                {
                    objCandData.CanBeSubmitted = Convert.ToInt16(dr["CanBeSubmitted"].ToString());
                }
            }

            return objCandData;
        }

        /// <summary>
        /// 261671: To get the HT document list for candidate
        /// </summary>
        /// <param name="documentDetails"> document Details </param>
        /// <returns> returns DOC upload details </returns>
        public HTransferDocumentUploadDetail SubmitHTransferDocuments(HTransferCandidateData documentDetails)
        {
            DataSet dsDocumentDetails;
            HTransferDocumentUploadDetail objDocDC = new HTransferDocumentUploadDetail();
            ////   HTransferUploadDocument retDocList = new HTransferUploadDocument();
            dsDocumentDetails = DBHelper.ExecuteDataset("usp_HTransfer_GetDocumentList", documentDetails);
            if (dsDocumentDetails.Tables.Count > 0)
            {
                dsDocumentDetails.DataSetName = "SubmitInfo";
                dsDocumentDetails.Tables[0].TableName = "SubmitData";
                dsDocumentDetails.Tables[1].TableName = "MessageData";
                objDocDC.HtmlContent = dsDocumentDetails.GetXml().ToString();
            }

            dsDocumentDetails = null;
            return objDocDC;
        }

        #endregion
    }
}
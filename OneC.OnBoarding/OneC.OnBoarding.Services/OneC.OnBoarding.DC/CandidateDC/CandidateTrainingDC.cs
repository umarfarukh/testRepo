// <copyright file = "CandidateTrainingDC.cs" company = "CTS">
// Copyright (c) OnBoarding_CandidateTrainingDC. All rights reserved.
// </copyright>

/*About me
*******************************************************
* Namespace        : OneC.OnBoarding.DC         
* Class Name       : CandidateTrainingDC.cs
* Version          : 1.0
* Type             : DataContract
* Purpose          : Data contracts for NHO Training
* Created date     : 2012-Feb-13
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

namespace OneC.OnBoarding.DC.CandidateDC 
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Web;
    #endregion Namespaces

    /// <summary>
    /// Data contract for CandidateTrainingDC
    /// </summary>
    [DataContract(Name = "CandidateTrainingDC", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/CandidateDC/")]
    [Serializable]
    public class CandidateTrainingDC
    {
        /// <summary>
        /// Gets or sets TrainingId
        /// </summary>
        [DataMember(Name = "TrainingId", Order = 1)]
        public int TrainingId { get; set; }

        /// <summary>
        /// Gets or sets TrainingName
        /// </summary>
        [DataMember(Name = "TrainingName", Order = 2)]
        public string TrainingName { get; set; }

        /// <summary>
        /// Gets or sets AssociateId
        /// </summary>
        [DataMember(Name = "AssociateId", Order = 3)]
        public int AssociateId { get; set; }

        /// <summary>
        /// Gets or sets AssociateName
        /// </summary>
        [DataMember(Name = "AssociateName", Order = 4)]
        public string AssociateName { get; set; }

        /// <summary>
        /// Gets or sets RegisteredDate
        /// </summary>
        [DataMember(Name = "RegisteredDate", Order = 5)]
        public string RegisteredDate { get; set; }

        /// <summary>
        /// Gets or sets CandidateId
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 6)]
        public int CandidateId { get; set; }

        /// <summary>
        /// Gets or sets Transaction Mode
        /// </summary>
        [DataMember(Name = "Mode", Order = 7)]
        public int Mode { get; set; }

        /// <summary>
        /// Gets or sets SessionId
        /// </summary>
        [DataMember(Name = "SessionId", Order = 8)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets TrainingData
        /// </summary>
        [DataMember(Name = "TrainingData", Order = 9)]
        public string TrainingData { get; set; }

        /// <summary>
        /// Gets or sets Training Date
        /// </summary>
        [DataMember(Name = "TrainingDate", Order = 10)]
        public string TrainingScheduledDate { get; set; }

        /// <summary>
        /// Gets or sets TaskId
        /// </summary>
        [DataMember(Name = "TaskId", Order = 11)]
        public int TaskId { get; set; }

        /// <summary>
        /// Gets or sets Status
        /// </summary>
        [DataMember(Name = "Status", Order = 12)]
        public string Status { get; set; }

        /// <summary>
        /// Gets or sets Candidate RegistrationCount
        /// </summary>
        [DataMember(Name = "RegisterationCount", Order = 13)]
        public int RegisterationCount { get; set; }

        /// <summary>
        /// Gets or sets Candidate AttendanceStatus
        /// </summary>
        [DataMember(Name = "AttendanceStatus", Order = 14)]
        public int AttendanceStatus { get; set; }

        /// <summary>
        /// Gets or sets CandidateIdsForUpdate
        /// </summary>
        [DataMember(Name = "CandidateIdsForUpdate", Order = 15)]
        public string CandidateIdsForUpdate { get; set; }

        /// <summary>
        /// Gets or sets CountryId
        /// </summary>
        [DataMember(Name = "CountryId", Order = 16)]
        public int CountryId { get; set; }

        /// <summary>
        /// Gets or sets Candidate Grade
        /// </summary>
        [DataMember(Name = "Grade", Order = 17)]
        public string Grade { get; set; }

        /// <summary>
        /// Gets or sets Candidate BU
        /// </summary>
        [DataMember(Name = "BU", Order = 18)]
        public string BU { get; set; }

        /// <summary>
        /// Gets or sets Department
        /// </summary>
        [DataMember(Name = "Department", Order = 19)]
        public string Department { get; set; }
        
        /// <summary>
        /// Gets or sets DOJ
        /// </summary>
        [DataMember(Name = "DOJ", Order = 20)]
        public string DOJ { get; set; }

        /// <summary>
        /// Gets or sets Training Start Date
        /// </summary>
        [DataMember(Name = "StartDate", Order = 21)]
        public DateTime StartDate { get; set; }

        /// <summary>
        /// Gets or sets Training End Date
        /// </summary>
        [DataMember(Name = "EndDate", Order = 22)]
        public DateTime EndDate { get; set; }

        /// <summary>
        /// Gets or sets EmailID
        /// </summary>
        [DataMember(Name = "EmailID", Order = 23)]
        public string EmailID { get; set; }

        /// <summary>
        /// Gets or sets MobileNo
        /// </summary>
        [DataMember(Name = "MobileNo", Order = 24)]
        public string MobileNo { get; set; }

        /// <summary>
        /// Gets or sets HiringManager
        /// </summary>
        [DataMember(Name = "HiringManager", Order = 25)]
        public string HiringManager { get; set; }

        /// <summary>
        /// Gets or sets JobCode
        /// </summary>
        [DataMember(Name = "JobCode", Order = 26)]
        public string JobCode { get; set; }

        /// <summary>
        /// Gets or sets HireType
        /// </summary>
        [DataMember(Name = "HireType", Order = 27)]
        public string HireType { get; set; }

        /// <summary>
        /// Gets or sets Score
        /// </summary>
        [DataMember(Name = "Score", Order = 28)]
        public int Score { get; set; }

        /// <summary>
        /// Gets or sets Candidate AttendanceStatusDay2
        /// </summary>
        [DataMember(Name = "AttendanceStatusDay2", Order = 29)]
        public string AttendanceStatusDay2 { get; set; }

        /// <summary>
        /// Gets or sets Flag for Day2
        /// </summary>
        [DataMember(Name = "Day2Flag", Order = 30)]
        public int Day2Flag { get; set; }

        /// <summary>
        /// Gets or sets Flag for Day
        /// </summary>
        [DataMember(Name = "DayFlag", Order = 31)]
        public int DayFlag { get; set; }

        /// <summary>
        /// Gets or sets Flag for Day
        /// </summary>
        [DataMember(Name = "UKFlag", Order = 32)]
        public int UKFlag { get; set; }

        /// <summary>
        /// Gets or sets Flag for Day
        /// </summary>
        [DataMember(Name = "UKHireTypeFlag", Order = 33)]
        public int UKHireTypeFlag { get; set; }

        /// <summary>
        /// Gets or sets Candidate AttendanceStatus
        /// </summary>
        [DataMember(Name = "AttendanceStatusDay1", Order = 34)]
        public int AttendanceStatusDay1 { get; set; }
    }

    /// <summary>
    /// Class for CandidateTrainingList
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class CandidateTrainingList : List<CandidateTrainingDC>
    { 
    }

    /// <summary>
    /// Class for CandidateTrainingDetails
    /// </summary>
    [Serializable]
    public class CandidateTrainingDetails
    {
        /// <summary>
        /// Gets or sets List for CandidateDetail
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        public CandidateTrainingList CandidateDetailList
        {
            get; // modified to fix style cop
            set;
        }
    }
}
// <copyright file = "NewHireTrainingDC.cs" company = "CTS">
// Copyright (c) OnBoarding_NewHireTrainingDC. All rights reserved.
// </copyright>

/*About me
*******************************************************
* Namespace        : OneC.OnBoarding.DC         
* Class Name       : NewHireTraining.cs
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
  /// Data Contract for NewHireTrainingDC
  /// </summary>
  [DataContract(Name = "NewHireTrainingDC", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/CandidateDC/")]
  [Serializable]
  public class NewHireTrainingDC
  {
      /// <summary>
      /// Gets or sets Training Name
      /// </summary>
      [DataMember(Name = "TrainingName", Order = 1)]
      public string TrainingName { get; set; }

      /// <summary>
      /// Gets or sets Training Code
      /// </summary>
      [DataMember(Name = "TrainingCode", Order = 2)]
      public int TrainingId { get; set; }

      /// <summary>
      /// Gets or sets Training Status
      /// </summary>
      [DataMember(Name = "TrainingStatus", Order = 3)]
      public string TrainingStatus { get; set; }

      /// <summary>
      /// Gets or sets Training Status
      /// </summary>
      [DataMember(Name = "StatusCode", Order = 4)]
      public int StatusCode { get; set; }

      /// <summary>
      /// Gets or sets Training Date
      /// </summary>
      [DataMember(Name = "TrainingDate", Order = 5)]
      public string TrainingScheduledDate { get; set; }

      /// <summary>
      /// Gets or sets Training Location
      /// </summary>
      [DataMember(Name = "TrainingLocation", Order = 6)]
      public string TrainingLocation { get; set; }

      /// <summary>
      /// Gets or sets Start Time
      /// </summary>
      [DataMember(Name = "StartTime", Order = 7)]
      public string StartTime { get; set; }

      /// <summary>
      /// Gets or sets End Time
      /// </summary>
      [DataMember(Name = "EndTime", Order = 8)]
      public string EndTime { get; set; }

      /// <summary>
      /// Gets or sets Candidate Count
      /// </summary>
      [DataMember(Name = "CandidateCount", Order = 9)]
      public int CandidateCount { get; set; }

      /// <summary>
      /// Gets or sets Task SessionId
      /// </summary>
      [DataMember(Name = "SessionId", Order = 10)]
      public long SessionId { get; set; }

      /// <summary>
      /// Gets or sets Transaction Mode
      /// </summary>
      [DataMember(Name = "Mode", Order = 11)]
      public int Mode { get; set; }

      /// <summary>
      /// Gets or sets Page Size
      /// </summary>
      [DataMember(Name = "PageSize", Order = 12)]
      public int PageSize { get; set; }

      /// <summary>
      /// Gets or sets PageNo
      /// </summary>
      [DataMember(Name = "PageNo", Order = 13)]
      public int PageNo { get; set; }

      /// <summary>
      /// Gets or sets CountryId
      /// </summary>
      [DataMember(Name = "CountryId", Order = 14)]
      public int CountryId { get; set; }

      /// <summary>
      /// Gets or sets TrainingState
      /// </summary>
      [DataMember(Name = "TrainingState", Order = 15)]
      public string TrainingState { get; set; }

      /// <summary>
      /// Gets or sets TrainingCity
      /// </summary>
      [DataMember(Name = "TrainingCity", Order = 16)]
      public string TrainingCity { get; set; }

      /// <summary>
      /// Gets or sets Training Start Date
      /// </summary>
      [DataMember(Name = "StartDate", Order = 17)]
      public DateTime StartDate { get; set; }

      /// <summary>
      /// Gets or sets Training End Date
      /// </summary>
      [DataMember(Name = "EndDate", Order = 18)]
      public DateTime EndDate { get; set; }

      /// <summary>
      /// Gets or sets IsMailToBeSent
      /// </summary>
      [DataMember(Name = "IsMailToBeSent", Order = 19)]
      public int IsMailToBeSent { get; set; }

      /// <summary>
      /// Gets or sets IsBlocked
      /// </summary>
      [DataMember(Name = "IsBlocked", Order = 20)]
      public int IsBlocked { get; set; }

      /// <summary>
      /// Gets or sets ServiceAccount- Induction Diary
      /// </summary>
      [DataMember(Name = "ServiceAccount", Order = 21)]
      public string ServiceAccount { get; set; }

      /// <summary>
      /// Gets or sets ServicePWD- Induction Diary
      /// </summary>
      [DataMember(Name = "ServicePWD", Order = 22)]
      public string ServicePWD { get; set; }

      /// <summary>
      /// Gets or sets ServiceDomain- Induction Diary
      /// </summary>
      [DataMember(Name = "ServiceDomain", Order = 23)]
      public string ServiceDomain { get; set; }

      /// <summary>
      /// Gets or sets serviceUrl- Induction Diary
      /// </summary>
      [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1056:UriPropertiesShouldNotBeStrings", Justification = "Reviewed."), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "ServiceUrl", Order = 24)]
      public string ServiceUrl { get; set; }

      /// <summary>
      /// Gets or sets Body- Induction Diary
      /// </summary>
      [DataMember(Name = "Body", Order = 25)]
      public string Body { get; set; }

      /// <summary>
      /// Gets or sets MeetingStartDate- Induction Diary
      /// </summary>
      [DataMember(Name = "MeetingStartDate", Order = 26)]
      public DateTime MeetingStartDate { get; set; }

      /// <summary>
      /// Gets or sets MeetingEndDate- Induction Diary
      /// </summary>
      [DataMember(Name = "MeetingEndDate", Order = 27)]
      public DateTime MeetingEndDate { get; set; }

      /// <summary>
      /// Gets or sets IsReminderSet- Induction Diary
      /// </summary>
      [DataMember(Name = "IsReminderSet", Order = 28)]
      public string IsReminderSet { get; set; }

      /// <summary>
      /// Gets or sets ReminderMinutesBeforeStart- Induction Diary
      /// </summary>
      [DataMember(Name = "ReminderMinutesBeforeStart", Order = 29)]
      public int ReminderMinutesBeforeStart { get; set; }

      /// <summary>
      /// Gets or sets RequiredAttendees- Induction Diary
      /// </summary>
      [DataMember(Name = "RequiredAttendees", Order = 30)]
      public string RequiredAttendees { get; set; }

      /// <summary>
      /// Gets or sets Score- Induction Diary
      /// </summary>
      [DataMember(Name = "Score", Order = 31)]
      public int Score { get; set; }

      /// <summary>
      /// Gets or sets Subject- Induction Diary
      /// </summary>
      [DataMember(Name = "Subject", Order = 32)]
      public string Subject { get; set; }

      /// <summary>
      /// Gets or sets Meeting ID- Induction Diary
      /// </summary>
      [DataMember(Name = "MeetingID", Order = 33)]
      public string MeetingID { get; set; }

      /// <summary>
      /// Gets or sets Operation Type- Induction Diary
      /// </summary>
      [DataMember(Name = "OperationType", Order = 34)]
      public int OperationType { get; set; }

      /// <summary>
      /// Gets or sets Day 2 Induction start date for UK - Induction Diary
      /// </summary>
      [DataMember(Name = "DaytwoStartTime", Order = 35)]
      public string DaytwoStartTime { get; set; }

      /// <summary>
      /// Gets or sets Day 2 Induction end date for UK - Induction Diary
      /// </summary>
      [DataMember(Name = "DaytwoEndTime", Order = 36)]
      public string DaytwoEndTime { get; set; }

      /// <summary>
      /// Gets or sets Candidate id - Induction Diary
      /// </summary>
      [DataMember(Name = "Candidateid", Order = 37)]
      public long Candidateid { get; set; }

      /// <summary>
      /// Gets or sets TaskId - Induction Diary
      /// </summary>
      [DataMember(Name = "TaskId", Order = 38)]
      public int TaskId { get; set; }

      /// <summary>
      /// Gets or sets MeetingStartDate- Induction Diary
      /// </summary>
      [DataMember(Name = "MeetingStartDate2", Order = 39)]
      public DateTime MeetingStartDate2 { get; set; }

      /// <summary>
      /// Gets or sets MeetingEndDate- Induction Diary
      /// </summary>
      [DataMember(Name = "MeetingEndDate2", Order = 40)]
      public DateTime MeetingEndDate2 { get; set; }

      /// <summary>
      /// Gets or sets Meeting ID 2- Induction Diary
      /// </summary>
      [DataMember(Name = "MeetingID2", Order = 41)]
      public string MeetingID2 { get; set; }

      /// <summary>
      /// Gets or sets Office MailId- Induction Diary
      /// </summary>
      [DataMember(Name = "OfcMailId", Order = 42)]
      public string OfcMailId { get; set; }

      /// <summary>
      /// Gets or sets Meeting Request Number
      /// </summary>
      [DataMember(Name = "MeetingRequestNum", Order = 43)]
      public int MeetingRequestNum { get; set; }

      /// <summary>
      /// Gets or sets InductionDiaryFlag- Induction Diary
      /// </summary>
      [DataMember(Name = "InductionDiaryFlag", Order = 44)]
      public int InductionDiaryFlag { get; set; }

      /// <summary>
      /// Gets or sets Location- Induction Diary
      /// </summary>
      [DataMember(Name = "Location", Order = 45)]
      public string Location { get; set; }

      /// <summary>
      /// Gets or sets Total Count
      /// </summary>
      [DataMember(Name = "TotalCount", Order = 46)]
      public int TotalCount { get; set; }
  }

  /// <summary>
  /// Class for Training List
  /// </summary>
  [Serializable]
  [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
  public class TrainingList : List<NewHireTrainingDC>
      {
      }

  /// <summary>
  /// Class for Training Lists
  /// </summary>
  [Serializable]
  public class TrainingLists
  {
      /// <summary>
      /// Gets or sets Field for Training List
      /// </summary>
      [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
      public TrainingList TraininigList
      {
          get;
          set;
      }
  }
}
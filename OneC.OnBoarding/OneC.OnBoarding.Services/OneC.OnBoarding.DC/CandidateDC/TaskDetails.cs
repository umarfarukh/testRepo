// <copyright file = "TaskDetails.cs" company = "CTS">
// Copyright (c) OnBoarding_TaskDetail. All rights reserved.
// </copyright>

/*About me
*******************************************************
* Namespace        : OneC.OnBoarding.DC         
* Class Name       : TaskDetail.cs
* Version          : 1.0
* Type             : DataContract
* Purpose          : Data contracts for New Hire Task
* Created date     : 2012-Jan-04
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
    /// Data contract for New Hire Details
    /// </summary>
    [DataContract(Name = "TaskDetails", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/CandidateDC/")]

    [Serializable]
    public class TaskDetail 
    {
        /// <summary>
        /// Gets or sets Task Title
        /// </summary>
        [DataMember(Name = "Title", Order = 1)]
        public string Title { get; set; }

        /// <summary>
        /// Gets or sets Task Description
        /// </summary>
        [DataMember(Name = "Description", Order = 2)]
        public string Description { get; set; }

        /// <summary>
        /// Gets or sets Task Due/Completion Date
        /// </summary>
        [DataMember(Name = "DueCompletionDate", Order = 3)]
        public string DueCompletionDate { get; set; }

        /// <summary>
        /// Gets or sets Required Time for Task
        /// </summary>
        [DataMember(Name = "RequiredTime", Order = 4)]
        public string RequiredTime { get; set; }

        /// <summary>
        /// Gets or sets Task URL
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1056:UriPropertiesShouldNotBeStrings", Justification = "Reviewed."), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "RelativeUrl", Order = 5)]
        public string RelativeUrl { get; set; }

        /// <summary>
        /// Gets or sets Sample Task URL
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1056:UriPropertiesShouldNotBeStrings", Justification = "Reviewed."), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "SampleFormUrl", Order = 6)]
        public string SampleFormUrl { get; set; }

        /// <summary>
        /// Gets or sets Task Status
        /// </summary>
        [DataMember(Name = "Status", Order = 7)]
        public int Status { get; set; }

        /// <summary>
        /// Gets or sets Task Status Message
        /// </summary>
        [DataMember(Name = "StatusMessage", Order = 8)]
        public string StatusMessage { get; set; }

        /// <summary>
        /// Gets or sets Task Action Message
        /// </summary>
        [DataMember(Name = "ActionMessage", Order = 9)]
        public string ActionMessage { get; set; }

        /// <summary>
        /// Gets or sets Detail View Status Image
        /// </summary>
        [DataMember(Name = "StatusImage", Order = 10)]
        public string StatusImage { get; set; }

        /// <summary>
        /// Gets or sets Is Reminder Required
        /// </summary>
        [DataMember(Name = "IsReminder", Order = 11)]
        public int IsReminder { get; set; }

        /// <summary>
        /// Gets or sets Is Resource Center Required
        /// </summary>
        [DataMember(Name = "IsResourceCenter", Order = 12)]
        public int IsResourceCenter { get; set; }

        /// <summary>
        /// Gets or sets Task FAQ Url
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1056:UriPropertiesShouldNotBeStrings", Justification = "Reviewed."), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "FAQUrl", Order = 13)]
        public string FAQUrl { get; set; }

        /// <summary>
        /// Gets or sets Task Sample Image
        /// </summary>
        [DataMember(Name = "SampleFormImage", Order = 14)]
        public string SampleFormImage { get; set; }

        /// <summary>
        /// Gets or sets Task Order
        /// </summary>
        [DataMember(Name = "TaskOrder", Order = 15)]
        public int TaskOrder { get; set; }

        /// <summary>
        /// Gets or sets Previous Task ID
        /// </summary>
        [DataMember(Name = "PreviousTaskID", Order = 16)]
        public int PreviousMandatoryTask_Ref { get; set; }

        /// <summary>
        /// Gets or sets Previous Task Status
        /// </summary>
        [DataMember(Name = "PreviousTaskStatus", Order = 17)]
        public int PreviousTaskStatus { get; set; }
       
        /// <summary>
        /// Gets or sets Total Records
        /// </summary>
        [DataMember(Name = "TotalRecords", Order = 18)]
        public int TotalRecords { get; set; }

        /// <summary>
        /// Gets or sets Next Task 
        /// </summary>
        [DataMember(Name = "NextTask", Order = 19)]
        public string NextTask { get; set; }

        /// <summary>
        /// Gets or sets Total Task Count
        /// </summary>
        [DataMember(Name = "TaskTotalCount", Order = 20)]
        public int TaskTotalCount { get; set; }

        /// <summary>
        /// Gets or sets Task Pending Count
        /// </summary>
        [DataMember(Name = "TaskPendingCount", Order = 21)]
        public int TaskPendingCount { get; set; }

        /// <summary>
        /// Gets or sets Task Completed Count
        /// </summary>
        [DataMember(Name = "TaskCompeltedCount", Order = 22)]
        public int TaskCompeltedCount { get; set; }

        /// <summary>
        /// Gets or sets Days Left
        /// </summary>
        [DataMember(Name = "DaysLeft", Order = 23)]
        public int DaysLeft { get; set; }

        /// <summary>
        /// Gets or sets Tile View Status Image
        /// </summary>
        [DataMember(Name = "TileViewStatusImage", Order = 24)]
        public string TileViewStatusImage { get; set; }

        /// <summary>
        /// Gets or sets Percentage of Days Left
        /// </summary>
        [DataMember(Name = "DaysLeftPercentage", Order = 25)]
        public float DaysLeftPercentage { get; set; }

        /// <summary>
        /// Gets or sets Percentage of Tasks
        /// </summary>
        [DataMember(Name = "TaskPercentage", Order = 26)]
        public float TaskPercentage { get; set; }

        /// <summary>
        /// Gets or sets Count of the people joining
        /// </summary>
        [DataMember(Name = "PersonCount", Order = 26)]
        public int PersonCount { get; set; }

        /// <summary>
        /// Gets or sets PreJoining Completion Flag
        /// </summary>
        [DataMember(Name = "PreJoiningCompletedFlag", Order = 27)]
        public int PreJoiningCompletedFlag { get; set; }

        /// <summary>
        /// Gets or sets PostJoining Completion Flag
        /// </summary>
        [DataMember(Name = "PostJoiningCompletedFlag", Order = 28)]
        public int PostJoiningCompletedFlag { get; set; }

        /// <summary>
        /// Gets or sets Task Id
        /// </summary>
        [DataMember(Name = "TaskId", Order = 29)]
        public int TaskId { get; set; }

        /// <summary>
        /// Gets or sets Is Associate ID Generated
        /// </summary>
        [DataMember(Name = "IsAssociateIdGenerated", Order = 30)]
        public int IsAssociateIdGenerated { get; set; }

        /// <summary>
        /// Gets or sets Process ID
        /// </summary>
        [DataMember(Name = "ProcessID", Order = 31)]
        public int ProcessID { get; set; }

        /// <summary>
        /// Gets or sets Is Link Enable
        /// </summary>
        [DataMember(Name = "IsLinkEnable", Order = 32)]
        public int IsLinkEnable { get; set; }

        /// <summary>
        /// Gets or sets Is Link Enable
        /// </summary>
        [DataMember(Name = "IsPostEnable", Order = 33)]
        public int IsPostEnable { get; set; }

        /// <summary>
        /// Gets or sets Flash File 
        /// </summary>
        [DataMember(Name = "FlashFile", Order = 34)]
        public string FlashFile { get; set; }

        /// <summary>
        /// Gets or sets Default View 
        /// </summary>
        [DataMember(Name = "DefaultView", Order = 35)]
        public int DefaultView { get; set; }

        /// <summary>
        /// Gets or sets NHPhoto URL 
        /// </summary>
        [DataMember(Name = "NHPhoto", Order = 36)]
        public string NHPhoto { get; set; }

        /// <summary>
        /// Gets or sets Default View 
        /// </summary>
        [DataMember(Name = "IsSucessPopUp", Order = 37)]
        public int IsPreJoiningMsg { get; set; }

        /// <summary>
        /// Gets or sets Task Status Message
        /// </summary>
        [DataMember(Name = "TooltipText", Order = 38)]
        public string TooltipText { get; set; }

        /// <summary>
        /// Gets or sets Is Query String required
        /// </summary>
        [DataMember(Name = "IsQuerystringrequired", Order = 39)]
        public int IsQuerystringrequired { get; set; } 

        /// <summary>
        /// Gets or sets Is Overlay required
        /// </summary>
        [DataMember(Name = "IsOverlayrequired", Order = 40)]
        public int IsOverlayrequired { get; set; }

        /// <summary>
        /// Gets or sets Can enable Pre-Joining tab
        /// </summary>
        [DataMember(Name = "IsPreJoiningTabEnabled", Order = 41)]
        public int IsPreJoiningTabEnabled { get; set; }

        /// <summary>
        /// Gets or sets Can enable Post-Joining tab
        /// </summary>
        [DataMember(Name = "IsPostJoiningTabEnabled", Order = 42)]
        public int IsPostJoiningTabEnabled { get; set; }

        /// <summary>
        /// Gets or sets Is External URL
        /// </summary>
        [DataMember(Name = "IsExternalURL", Order = 43)]
        public int IsExternalURL { get; set; }

        /// <summary>
        /// Gets or sets Country Id
        /// </summary>
        [DataMember(Name = "CountryID", Order = 44)]
        public int CountryID { get; set; }

        /// <summary>
        /// Gets or sets ECM Document Name
        /// </summary>
        [DataMember(Name = "ECMDocumentName", Order = 45)]
        public string ECMDocumentName { get; set; }

        /// <summary>
        /// Gets or sets Country Id
        /// </summary>
        [DataMember(Name = "DocumentUploadStatus", Order = 46)]
        public int DocumentUploadStatus { get; set; }

        /// <summary>
        /// Gets or sets ECM enabled status
        /// </summary>
        [DataMember(Name = "IsECMEnabled", Order = 47)]
        public short IsECMEnabled { get; set; }

        /// <summary>
        /// Gets or sets SurveyType
        /// </summary>
        [DataMember(Name = "SurveyType", Order = 48)]
        public int SurveyType { get; set; }

        /// <summary>
        /// Gets or sets Can enable photo image
        /// </summary>
        [DataMember(Name = "IsPhotoImageRequired", Order = 49)]
        public int IsPhotoImageRequired { get; set; }

        /// <summary>
        /// Gets or sets Can enable FAQ Icon
        /// </summary>
        [DataMember(Name = "IsFaqRequired", Order = 50)]
        public int IsFaqRequired { get; set; }

        /// <summary>
        /// Gets or sets Can enable CGuide Icon
        /// </summary>
        [DataMember(Name = "IsCGuideEnabled", Order = 51)]
        public int IsCGuideEnabled { get; set; }

        /// <summary>
        /// Gets or sets Can enable relocation Icon
        /// </summary>
        [DataMember(Name = "IsRelocationEnabled", Order = 52)]
        public int IsRelocationEnabled { get; set; }
    }

    /// <summary>
    /// Class for TaskDetailsList
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class TaskDetailsList : List<TaskDetail>
    { 
    }
}
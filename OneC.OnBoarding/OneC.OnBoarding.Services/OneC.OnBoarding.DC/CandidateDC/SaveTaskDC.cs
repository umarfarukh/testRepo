// <copyright file = "SaveTaskDC.cs" company = "CTS">
// Copyright (c) OnBoarding_SaveTaskDC. All rights reserved.
// </copyright>

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DC         
 * Class Name       : .cs
 * Version          : 1.0
 * Type             : DataContract
 * Purpose          : Data contracts for Saving task Details
 * Created date     : 2012-Feb-15
 * Author           : 207953
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
    using System.ComponentModel;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Text;
    #endregion Namespaces

    /// <summary>
    /// Data Contract for saving task details
    /// </summary>
    [DataContract(Name = "SaveTaskDC", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/CandidateDC/")]
    [Serializable]
    public class SaveTaskDC
    {
        /// <summary>
        /// Gets or sets CandidateId
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 1, IsRequired = true)]
        public long CandidateId { get; set; }

        /// <summary>
        /// Gets or sets Candidate Name
        /// </summary>
        [DataMember(Name = "CandidateName", Order = 2, EmitDefaultValue = true, IsRequired = true)]
        public string CandidateName { get; set; }

        /// <summary>
        /// Gets or sets TaskId
        /// </summary>
        [DataMember(Name = "TaskId", Order = 3, IsRequired = true)]
        public int TaskId { get; set; }

        /// <summary>
        /// Gets or sets Task Data
        /// </summary>
        [DataMember(Name = "TaskData", Order = 4, IsRequired = true)]
        public string TaskData { get; set; }

        /// <summary>
        /// Gets or sets Task Status
        /// </summary>
        [DataMember(Name = "TaskStatus", Order = 5, IsRequired = true)]
        public int TaskStatus { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether Is TaskSigned
        /// </summary>
        [DataMember(Name = "IsTasksigned", Order = 6, IsRequired = true)]
        public bool IsTaskSigned { get; set; }

        /// <summary>
        /// Gets or sets Is TaskSubmit
        /// </summary>
        [DefaultValue(-1)]
        [DataMember(Name = "IsTaskSaved", Order = 7, EmitDefaultValue = true, IsRequired = true)]
        public int IsTaskSaved { get; set; }

        /// <summary>
        /// Gets or sets Is TaskSubmit
        /// </summary>
        [DataMember(Name = "IsTaskSubmitted", Order = 8, IsRequired = true)]
        public int IsTaskSubmitted { get; set; }

        /// <summary>
        /// Gets or sets Is TaskLocked
        /// </summary>
        [DataMember(Name = "IsTaskLocked", Order = 9, IsRequired = true)]
        public int IsTaskLocked { get; set; }

        /// <summary>
        /// Gets or sets LastViewPageIndex
        /// </summary>
        [DataMember(Name = "LastViewPageInex", Order = 10, IsRequired = true)]
        public int LastViewPageIndex { get; set; }
        
        /// <summary>
        /// Gets or sets Task SessionId
        /// </summary>
        [DataMember(Name = "SessionId", Order = 11, IsRequired = true)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets Task Design Xml
        /// </summary>
        [DataMember(Name = "TaskDesignXML", Order = 12, IsRequired = true)]
        public string TaskDesignXML { get; set; }

        /// <summary>
        /// Gets or sets Task Data Xml
        /// </summary>
        [DataMember(Name = "TaskDataXML", Order = 13, IsRequired = true)]
        public string TaskDataXML { get; set; }

        /// <summary>
        /// Gets or sets Task prefill Xml
        /// </summary>
        [DataMember(Name = "TaskPrefillValues", Order = 14, IsRequired = true)]
        public string TaskPrefillValues { get; set; }

        /// <summary>
        /// Gets or sets Task signature Xml
        /// </summary>
        [DataMember(Name = "TaskSignatureXML", Order = 15, IsRequired = true)]
        public string TaskSignatureXML { get; set; }

        /// <summary>
        /// Gets or sets Signature key
        /// </summary>
        [DataMember(Name = "SignatureKey", Order = 16, IsRequired = true)]
        public string SignatureKey { get; set; }

        /// <summary>
        /// Gets or sets Task repeater template
        /// </summary>
        [DataMember(Name = "TaskRepeaterTemplates", Order = 17, IsRequired = true)]
        public string TaskRepeaterTemplates { get; set; }

        /// <summary>
        /// Gets or sets Is the task is allowed for access
        /// </summary>
        [DefaultValue(false)]
        [DataMember(Name = "IsTaskAllowed", Order = 18, EmitDefaultValue = true, IsRequired = true)]
        public int IsTaskAllowed { get; set; }

        /// <summary>
        /// Gets or sets Is the validation success
        /// </summary>
        [DataMember(Name = "ValidationStatus", Order = 19, IsRequired = true)]
        public int ValidationStatus { get; set; }

        /// <summary>
        /// Gets or sets Validation message
        /// </summary>
        [DataMember(Name = "ValidationMessage", Order = 20, IsRequired = true)]
        public string ValidationMessage { get; set; }

        /// <summary>
        /// Gets or sets Country Id
        /// /// </summary>
        [DataMember(Name = "CountryId", Order = 21)]
        public int CountryId { get; set; }
        
        /// <summary>
        /// Gets or sets Task Title 
        /// /// </summary>
        [DataMember(Name = "TaskTitle", Order = 22)]
        public string TaskTitle { get; set; }

        /// <summary>
        /// Gets or sets Validation ErrorId 
        /// /// </summary>
        [DataMember(Name = "ErrorId", Order = 23)]
        public string ErrorId { get; set; }

        /// <summary>
        /// Gets or sets Validation TagId 
        /// /// </summary>
        [DataMember(Name = "TagId", Order = 23)]
        public string TagId { get; set; }

        /// <summary>
        /// Gets or sets Validation ControlId 
        /// /// </summary>
        [DataMember(Name = "ControlId", Order = 24)]
        public string ControlId { get; set; }

        /// <summary>
        /// Gets or sets Is ResetRequired
        /// </summary>
        [DataMember(Name = "IsResetRequired", Order = 25, IsRequired = true)]
        [DefaultValue(0)]
        public int IsResetRequired { get; set; }

        /// <summary>
        /// Gets or sets Is SaveRequired
        /// </summary>
        [DataMember(Name = "IsSaveRequired", Order = 26, IsRequired = true)]
        [DefaultValue(0)]
        public int IsSaveRequired { get; set; }

        /// <summary>
        /// Gets or sets Is SubmitRequired
        /// </summary>
        [DataMember(Name = "IsSubmitRequired", Order = 27, IsRequired = true)]
        [DefaultValue(1)]
        public int IsSubmitRequired { get; set; }

        /// <summary>
        /// Gets or sets Type of the survey
        /// </summary>
        [DataMember(Name = "SurveyType", Order = 28, IsRequired = true)]
        [DefaultValue(1)]
        public int SurveyType { get; set; }

        /// <summary>
        /// Gets or sets Survey Data
        /// </summary>
        [DataMember(Name = "SurveyData", Order = 29, IsRequired = true)]
        [DefaultValue(1)]
        public string SurveyData { get; set; }

        /// <summary>
        /// Gets or sets Survey Status
        /// </summary>
        [DataMember(Name = "SurveyStatus", Order = 30, IsRequired = true)]
        [DefaultValue(1)]
        public int SurveyStatus { get; set; }

        /// <summary>
        /// Gets or sets Signature effective date to display in task
        /// </summary>
        [DataMember(Name = "SignEffectiveDate", Order = 31, IsRequired = true)]
        public string SignEffectiveDate { get; set; }

        /// <summary>
        /// Gets or sets Is BGV Initiated
        /// </summary>
        [DataMember(Name = "IsBgvInitiated", Order = 32, IsRequired = true)]
        public int IsBgvInitiated { get; set; }

        /// <summary>
        /// Gets or sets String Html 
        /// </summary>
        [DataMember(Name = "strHTML", Order = 33, IsRequired = true)]
        public string strHTML { get; set; }

        /// <summary>
        /// Gets or sets PDF Component
        /// </summary>
        [DataMember(Name = "pdfComp", Order = 34, IsRequired = true)]
        public int pdfComp { get; set; }     
    }

    /// <summary>
    /// Class for Save TaskDC Data
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class SaveTaskDCData : List<SaveTaskDC>
    { 
    }

    /// <summary>
    /// Data Contract for Save TaskDC Source
    /// </summary>
    [DataContract(Name = "SaveTaskDCSource", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/CandidateDC/")]
    [Serializable]
    public class SaveTaskDCSource
    {
        /// <summary>
        /// Gets or sets for Save TaskDC Data
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "SaveTaskDCData", Order = 1)]
        public SaveTaskDCData SaveTaskDCData { get; set; }
    }
}
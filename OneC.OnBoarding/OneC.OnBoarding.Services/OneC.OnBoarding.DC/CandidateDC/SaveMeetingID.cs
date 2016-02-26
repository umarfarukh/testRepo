// <copyright file = "SaveMeetingID.cs" company = "CTS">
// Copyright (c) OnBoarding_SaveMeetingID. All rights reserved.
// </copyright>

namespace OneC.OnBoarding.DC.CandidateDC
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Web;
    #endregion Namespaces

    /// <summary>
    /// Data Contract for SaveMeetingID
    /// </summary>
    [DataContract(Name = "SaveMeetingID", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/CandidateDC/")]
    [Serializable]
    public class SaveMeetingID
    {
        /// <summary>
        /// Gets or sets SessionId
        /// </summary>
        [DataMember(Name = "SessionId", Order = 1)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets Meeting ID - Induction Diary
        /// </summary>
        [DataMember(Name = "MeetingID", Order = 2)]
        public string MeetingID { get; set; }

        /// <summary>
        /// Gets or sets CandidateId
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 3)]
        public long CandidateId { get; set; }

        /// <summary>
        /// Gets or sets TaskId
        /// </summary>
        [DataMember(Name = "TaskId", Order = 4)]
        public int TaskId { get; set; }

        /// <summary>
        /// Gets or sets Mode
        /// </summary>
        [DataMember(Name = "Mode", Order = 5)]
        public int Mode { get; set; }

        /// <summary>
        /// Gets or sets Meeting Request Number
        /// </summary>
        [DataMember(Name = "MeetingRequestNum", Order = 5)]
        public int MeetingRequestNum { get; set; }
    }

    /// <summary>
    /// Class for MeetingList
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class MeetingList : List<SaveMeetingID>
    { 
    }
}
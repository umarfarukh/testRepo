// -----------------------------------------------------------------------
// <copyright file="StartDateAndLocationDC.cs" company="Cognizant Technology Solutions">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------
/*About me
*******************************************************
* Namespace        : OneC.OnBoarding.DC         
* Class Name       : StartDateAndLocationDC.cs
* Version          : 1.0
* Type             : DataContract
* Purpose          : Data contracts for Joining Status
* Created date     : 2014-AUG-20
* Author           : 312020
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
 namespace OneC.OnBoarding.DC.UtilityDC
{
    #region NameSpaces
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Web;
    #endregion

    /// <summary>
    /// 312020: Class to save the data by RC or HRSS regarding Start date and Location.
    /// </summary>
    [Serializable]
    public class StartDateAndLocationDC
    {
        /// <summary>
        /// Gets or sets CandidateId
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 1)]
        public long CandidateId { get; set; }

        /// <summary>
        /// Gets or sets ReportedDOJ
        /// </summary>
        [DataMember(Name = "ReportedDOJ", Order = 2)]
        public string ReportedDOJ { get; set; }

        /// <summary>
        /// Gets or sets DOJConfirmStatus
        /// </summary>
        [DataMember(Name = "DOJConfirmStatus", Order = 3)]
        public int DOJConfirmStatus { get; set; }

        /// <summary>
        /// Gets or sets DOJComments
        /// </summary>
        [DataMember(Name = "DOJComments", Order = 4)]
        public string DOJComments { get; set; }

        /// <summary>
        /// Gets or sets Country
        /// </summary>
        [DataMember(Name = "Country", Order = 5)]
        public string Country { get; set; }

        /// <summary>
        /// Gets or sets Address1
        /// </summary>
        [DataMember(Name = "Address1", Order = 6)]
        public string Address1 { get; set; }

        /// <summary>
        /// Gets or sets Address2
        /// </summary>
        [DataMember(Name = "Address2", Order = 7)]
        public string Address2 { get; set; }

        /// <summary>
        /// Gets or sets State
        /// </summary>
        [DataMember(Name = "State", Order = 8)]
        public string State { get; set; }

        /// <summary>
        /// Gets or sets City
        /// </summary>
        [DataMember(Name = "City", Order = 9)]
        public string City { get; set; }

        /// <summary>
        /// Gets or sets Zip
        /// </summary>
        [DataMember(Name = "Zip", Order = 10)]
        public string Zip { get; set; }

        /// <summary>
        /// Gets or sets Location Confirm Status
        /// </summary>
        [DataMember(Name = "LocationConfirmStatus", Order = 10)]
        public int LocationConfirmStatus { get; set; }

        /// <summary>
        /// Gets or sets Location Comments
        /// </summary>
        [DataMember(Name = "LocationComments", Order = 11)]
        public string LocationComments { get; set; }

        /// <summary>
        /// Gets or sets Hiring Manager Confirm Status
        /// </summary>
        [DataMember(Name = "HiringManagerConfirmStatus", Order = 12)]
        public int HiringManagerConfirmStatus { get; set; }

        /// <summary>
        /// Gets or sets Hiring Manager Comments
        /// </summary>
        [DataMember(Name = "HiringManagerComments", Order = 13)]
        public string HiringManagerComments { get; set; }

        /// <summary>
        /// Gets or sets SessionId
        /// </summary>
        [DataMember(Name = "SessionId", Order = 14)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets Location Type
        /// </summary>
        [DataMember(Name = "LocationType", Order = 15)]
        public string LocationType { get; set; }
       
        /// <summary>
        /// Gets or sets the FileContentId
        /// </summary>
        [DataMember(Name = "FileContentId", Order = 16)]
        public string FileContentId { get; set; }

        /// <summary>
        /// Gets or sets Mode
        /// </summary>
        [DataMember(Name = "Mode", Order = 17)]
        public int Mode { get; set; }

        /// <summary>
        /// Gets or sets County
        /// </summary>
        [DataMember(Name = "County", Order = 18)]
        public string County { get; set; }

    }

     /// <summary>
     /// list for start date and location
     /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class StartDateAndLocationList : List<StartDateAndLocationDC>
    {
    }
}

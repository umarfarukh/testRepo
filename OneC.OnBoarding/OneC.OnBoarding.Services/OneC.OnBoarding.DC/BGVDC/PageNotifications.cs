//-----------------------------------------------------------------------
// <copyright file="PageNotifications.cs" company="CTS">
//      Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
namespace OneC.OnBoarding.DC.BGVDC
{
    using System;
    using System.Runtime.Serialization;

    /// <summary>
    /// Represents the data contract for page notifications.
    /// </summary>
    [DataContract(Name = "PageNotifications", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/BGVDC/")]
    [Serializable]
    public class PageNotifications
    {
        #region Properties

        /// <summary>
        /// Gets or sets the BGV page Id.
        /// </summary>
        [DataMember(Name = "BgvPageId", Order = 4)]
        public int BgvPageId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the Candidate.
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 2)]
        public int CandidateId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the logged user role group Id.
        /// </summary>
        [DataMember(Name = "RoleGroupId", Order = 3)]
        public int RoleGroupId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the value of Session Id.
        /// </summary>
        [DataMember(Name = "SessionId", Order = 1)]
        public int Sessionid
        {
            get;
            set;
        }

        /// <summary>
        /// Represents to dispose the garbage collector
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        #endregion Properties
    }
}
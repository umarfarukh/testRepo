//-----------------------------------------------------------------------
// <copyright file="PageNavigationDC.cs" company="CTS">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------

namespace OneC.OnBoarding.DC.BGVDC
{
    using System;
    using System.Runtime.Serialization;

    /// <summary>
    /// Represents the data contract for page navigation.
    /// </summary>
    [DataContract(Name = "PageNavigationDC", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/BGVDC/")]
    [Serializable]
    public class PageNavigationDC
    {
        /// <summary>
        /// Gets or sets the value of Session Id.
        /// </summary>
        [DataMember(Name = "SessionId", Order = 1)]
        public int SessionId
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
        /// Represents to dispose the garbage collector
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
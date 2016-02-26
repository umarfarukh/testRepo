//-----------------------------------------------------------------------
// <copyright file="CompareDC.cs" company="CTS">
//     Copyright (c) . All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace OneC.OnBoarding.DC.BGVDC
{
    using System;
    using System.Runtime.Serialization;

    /// <summary>
    /// Represents the data contract for document list info screen.
    /// </summary>
    [DataContract(Name = "CompareDC", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/BGVDC/")]
    [Serializable]
    public class CompareDC
    {
        #region Properties

        /// <summary>
        /// Gets or sets the Candidate.
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 1)]
        public int CandidateId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the page Id.
        /// </summary>
        [DataMember(Name = "PageId", Order = 2)]
        public int PageId
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

        #endregion Properties

        #region Methods

        /// <summary>
        /// Represents to dispose the garbage collector
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        #endregion Methods
    }
}
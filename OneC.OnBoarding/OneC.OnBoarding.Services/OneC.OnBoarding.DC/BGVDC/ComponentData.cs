// -----------------------------------------------------------------------
// <copyright file="ComponentData.cs" company="CTS">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace OneC.OnBoarding.DC.BGVDC
{
    using System;
    using System.Runtime.Serialization;

    /// <summary>
    /// Represents the data contract for document list info screen.
    /// </summary>
    [DataContract(Name = "ComponentData", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/BGVDC/")]
    [Serializable]
    public class ComponentData
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
        /// Gets or sets the stored procedure mode.
        /// </summary>
        [DataMember(Name = "SpMode", Order = 4)]
        public int SpMode
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the component code.
        /// </summary>
        [DataMember(Name = "ComponentCode", Order = 5)]
        public string ComponentCode
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the component code.
        /// </summary>
        [DataMember(Name = "ComponentRunnerId", Order = 6)]
        public int ComponentRunnerId
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
// <copyright file = "BgvComponent.cs" company = "CTS">
// Copyright (c) OnBoarding_BgvComponent. All rights reserved.
// </copyright>

/*About me
*******************************************************
* Namespace        : OneC.OnBoarding.DC.DashBoardDC         
* Class Name       : BgvComponent
* Version          : 1.0
* Type             : DataContract
* Purpose          : Data contracts for Bgv Component
* Created date     : 2013-JAN-21
* Author           : 260947
* Reviewed by      :
*******************************************************
*/

namespace OneC.OnBoarding.DC.DashBoardDC
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Linq;    
    using System.Runtime.Serialization;
    using System.Text;    
    #endregion

    /// <summary>
    /// Contract for BGV component details
    /// </summary>
    [DataContract(Name = "BgvComponent", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/DashBoardDC/")]
    [Serializable]
    public sealed class BgvComponent : IDisposable
    {
        /// <summary>
        /// Gets or sets Candidate Id of the candidate
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 1, IsRequired = true)]
        public long CandidateId { get; set; }

        /// <summary>
        /// Gets or sets Component Id of the specifying component
        /// </summary>
        [DataMember(Name = "ComponentId", Order = 2, IsRequired = false)]
        public int ComponentId { get; set; }

        /// <summary>
        /// Gets or sets Component detail Id of the mapped component
        /// </summary>
        [DataMember(Name = "ComponentDetailId", Order = 3, IsRequired = false)]
        public int ComponentDetailId { get; set; }

        /// <summary>
        /// Gets or sets Country Id to which the specific component is mapped
        /// </summary>
        [DataMember(Name = "CountryId", Order = 4, IsRequired = false)]
        public int CountryId { get; set; }

        /// <summary>
        /// Gets or sets BU Id to which the specific component is mapped
        /// </summary>
        [DataMember(Name = "BUId", Order = 5, IsRequired = false)]
        public int BUId { get; set; }

        /// <summary>
        /// Gets or sets HTML template which is designed for this mapped component 
        /// </summary>
        [DataMember(Name = "HTMLTemplate", Order = 6, IsRequired = false)]
        public string HTMLTemplate { get; set; }

        /// <summary>
        /// Gets or sets XML template which is designed for this mapped component 
        /// </summary>
        [DataMember(Name = "XMLTemplate", Order = 7, IsRequired = false)]
        public string XMLTemplate { get; set; }

        /// <summary>
        /// Gets or sets Display order of component
        /// </summary>
        [DataMember(Name = "DisplayOrder", Order = 8, IsRequired = true)]
        [DefaultValue(0)]
        public int DisplayOrder { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether Is this component can be repeated
        /// </summary>
        [DataMember(Name = "IsRepeatable", Order = 9, IsRequired = false)]
        public bool IsRepeatable { get; set; }

        /// <summary>
        /// Gets or sets Runner id which acts as a unique id for specific repeating component
        /// </summary>
        [DataMember(Name = "RunnerId", Order = 10, IsRequired = false)]
        public int RunnerId { get; set; }

        /// <summary>
        /// Gets or sets Unique id for current session
        /// </summary>
        [DataMember(Name = "SessionId", Order = 11, IsRequired = true)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets Component type to identify Education, Employment and Other types
        /// </summary>
        [DataMember(Name = "ComponentType", Order = 12, IsRequired = true)]
        public int ComponentType { get; set; }

        /// <summary>
        /// Gets or sets Component name
        /// </summary>
        [DataMember(Name = "ComponentName", Order = 13, IsRequired = true)]
        public string ComponentName { get; set; }

        /// <summary>
        /// Gets or sets Institution Id 
        /// </summary>
        [DataMember(Name = "InstitutionId", Order = 14, IsRequired = false)]
        public int InstitutionId { get; set; }

        /// <summary>
        /// Gets or sets Component code
        /// </summary>
        [DataMember(Name = "ComponentCode", Order = 15, IsRequired = true)]
        public string ComponentCode { get; set; }

        /// <summary>
        /// Gets or sets SuspectRaisedSession
        /// </summary>
        [DataMember(Name = "SuspectRaisedSession", Order = 16, IsRequired = true)]
        public long SuspectRaisedSession { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether Flag to identify whether the component can be deleted
        /// </summary>
        [DataMember(Name = "CanDelete", Order = 17, IsRequired = false)]
        public bool CanDelete { get; set; }

        /// <summary>
        /// Gets or sets Flag to get the Document List
        /// </summary>
        [DataMember(Name = "Mode", Order = 18, IsRequired = false)]
        public int Mode { get; set; }

        /// <summary>
        /// Gets or sets Max RunnerId allowable for Experience info screen
        /// </summary>
        [DataMember(Name = "MaxRunnerId", Order = 19, IsRequired = false)]
        public int MaxRunnerId { get; set; }

        /// <summary>
        /// Method for Dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
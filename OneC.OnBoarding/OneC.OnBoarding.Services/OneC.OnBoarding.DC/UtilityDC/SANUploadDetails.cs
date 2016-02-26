// -----------------------------------------------------------------------
// <copyright file="SANUploadDetails.cs" company="Cognizant Technology Solutions">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace OneC.OnBoarding.DC.UtilityDC
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Text;

    /// <summary>
    /// Data contract for SAN upload details
    /// </summary>
    [DataContract(Name = "SANUploadDetails", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/IntegrationServices/DataContracts/")]
    [Serializable]
    public class SANUploadDetails
    {
        /// <summary>
        /// Gets or sets To store the Candidate id 
        /// </summary>
        [DataMember(Name = "CandidateId", IsRequired = true, Order = 0)]
        public int CandidateId { get; set; }

        /// <summary>
        /// Gets or sets To store the Associate id 
        /// </summary>
        [DataMember(Name = "AssociateId", IsRequired = false, Order = 1)]
        public int AssociateId { get; set; }

        /// <summary>
        /// Gets or sets To store the File Upload Id
        /// </summary>
        [DataMember(Name = "FileUploadId", IsRequired = true, Order = 2)]
        public int FileUploadId { get; set; }

        /// <summary>
        /// Gets or sets To store the AppTemplate Id
        /// </summary>
        [DataMember(Name = "AppTemplateId", IsRequired = false, Order = 3)]
        public int AppTemplateId { get; set; }

        /// <summary>
        /// Gets or sets To store the File Name
        /// </summary>
        [DataMember(Name = "FileName", IsRequired = true, Order = 4)]
        public string FileName { get; set; }

        /// <summary>
        /// Gets or sets To store the File Save Name
        /// </summary>
        [DataMember(Name = "FileSaveName", IsRequired = false, Order = 5)]
        public string FileSaveName { get; set; }

        /// <summary>
        /// Gets or sets To store the File URL
        /// </summary>
        [DataMember(Name = "FileURL", IsRequired = true, Order = 6)]
        public string FileURL { get; set; }

        /// <summary>
        /// Gets or sets To store the File External URL
        /// </summary>
        [DataMember(Name = "FileExternalURL", IsRequired = true, Order = 7)]
        public string FileExternalURL { get; set; }

        /// <summary>
        /// Gets or sets To store the File Location
        /// </summary>
        [DataMember(Name = "FileLocation", IsRequired = true, Order = 8)]
        public string FileLocation { get; set; }

        /// <summary>
        /// Gets or sets To store the File Content Id
        /// </summary>
        [DataMember(Name = "FileContentId", IsRequired = true, Order = 9)]
        public string FileContentId { get; set; }

        /// <summary>
        /// Gets or sets To store the Key Id
        /// </summary>
        [DataMember(Name = "KeyId", IsRequired = true, Order = 10)]
        public int KeyId { get; set; }

        /// <summary>
        /// Gets or sets To store the Current SessionI d
        /// </summary>
        [DataMember(Name = "SessionId", IsRequired = true, Order = 11)]
        public long SessionId { get; set; }
    }
}

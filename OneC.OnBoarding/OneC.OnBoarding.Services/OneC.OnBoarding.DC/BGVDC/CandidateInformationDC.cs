// -----------------------------------------------------------------------
// <copyright file="CandidateInformationDC.cs" company="CTS">
//      Company copyright tag.
// </copyright>
// -----------------------------------------------------------------------
namespace OneC.OnBoarding.DC.BGVDC
{
    using System;
    using System.Runtime.Serialization;

    /// <summary>
    /// Represents the candidate information DC
    /// </summary>
    [DataContract(Name = "CandidateInformationDC", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/BGVDC/")]
    [Serializable]
    public class CandidateInformationDC
    {
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
        /// Gets or sets the Candidate.
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 2)]
        public int CandidateId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets Component Des
        /// </summary>
        [DataMember(Name = "ComponentDesc", Order = 3)]
        public string ComponentDesc
        {
            get;
            set;
        }

        // [DataMember(Name = "ComponentData", Order = 4)]
        // public List<ComponentsList> ComponentData
        // {
        //    get;
        //    set;
        // }

        /// <summary>
        /// Gets or sets the value of RoleGroup Id.
        /// </summary>
        [DataMember(Name = "RoleGroupId", Order = 5)]
        public int RoleGroupId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the Mode.
        /// </summary>
        [DataMember(Name = "Mode", Order = 12)]
        public int Mode
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets FirstName
        /// </summary>
        [DataMember(Name = "BasicInformationComponentDetailId", Order = 2)]
        public int BasicInformationComponentDetailId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets MiddleName
        /// </summary>
        [DataMember(Name = "CurrentAddressComponentDetailId", Order = 3)]
        public int CurrentAddressComponentDetailId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether this is permanent address
        /// </summary>
        [DataMember(Name = "IsPermanentAddressSame", Order = 4)]
        public bool IsPermanentAddressSame
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets Designation
        /// </summary>
        [DataMember(Name = "PermanentAddressComponentDetailId", Order = 5)]
        public int PermanentAddressComponentDetailId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether this is long stay address
        /// </summary>
        [DataMember(Name = "IsLongestStayAddressSame", Order = 6)]
        public bool IsLongestStayAddressSame
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets TypeOfJoiner
        /// </summary>
        [DataMember(Name = "LongestStayAddressComponentDetailId", Order = 7)]
        public int LongestStayAddressComponentDetailId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets OfferExtendedDate
        /// </summary>
        [DataMember(Name = "BasicInformationCandidateID", Order = 8)]
        public string BasicInformationCandidateID
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets Associate ID
        /// </summary>
        [DataMember(Name = "BasicInformationAssociateId", Order = 9)]
        public string BasicInformationAssociateId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets OfferLocation
        /// </summary>
        [DataMember(Name = "BasicInformationFirstName", Order = 9)]
        public string BasicInformationFirstName
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets JoiningLocation
        /// </summary>
        [DataMember(Name = "BasicInformationMiddleName", Order = 10)]
        public string BasicInformationMiddleName
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets AccountName
        /// </summary>
        [DataMember(Name = "BasicInformationLastName", Order = 11)]
        public string BasicInformationLastName
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets FatherName
        /// </summary>
        [DataMember(Name = "BasicInformationFatherName", Order = 11)]
        public string BasicInformationFatherName
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets Date of birth
        /// </summary>
        [DataMember(Name = "BasicInformationDOB", Order = 11)]
        public string BasicInformationDOB
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets OwningDepartment
        /// </summary>
        [DataMember(Name = "BasicInformationDesignation", Order = 12)]
        public string BasicInformationDesignation
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets BU
        /// </summary>
        [DataMember(Name = "BasicInformationExpectedDateofJoining", Order = 13)]
        public string BasicInformationExpectedDateofJoining
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets CasePriority
        /// </summary>
        [DataMember(Name = "BasicInformationTypeOfJoiner", Order = 14)]
        public int BasicInformationTypeOfJoiner
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets HomePhone
        /// </summary>
        [DataMember(Name = "BasicInformationOfferExtendedDate", Order = 15)]
        public string BasicInformationOfferExtendedDate
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets Mobile
        /// </summary>
        [DataMember(Name = "BasicInformationOfferLocation", Order = 16)]
        public string BasicInformationOfferLocation
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets EmailId
        /// </summary>
        [DataMember(Name = "BasicInformationJoiningLocation", Order = 17)]
        public string BasicInformationJoiningLocation
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets MiddleName
        /// </summary>
        [DataMember(Name = "BasicInformationAccountName", Order = 3)]
        public string BasicInformationAccountName
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets LastName
        /// </summary>
        [DataMember(Name = "BasicInformationOwningDepartment", Order = 4)]
        public string BasicInformationOwningDepartment
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets Designation
        /// </summary>
        [DataMember(Name = "BasicInformationBU", Order = 5)]
        public string BasicInformationBU
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets Expected Date of Joining
        /// </summary>
        [DataMember(Name = "BasicInformationCasePriority", Order = 6)]
        public int BasicInformationCasePriority
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets TypeOfJoiner
        /// </summary>
        [DataMember(Name = "BasicInformationHomePhone", Order = 7)]
        public string BasicInformationHomePhone
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets OfferExtendedDate
        /// </summary>
        [DataMember(Name = "BasicInformationMobile", Order = 8)]
        public string BasicInformationMobile
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets OfferLocation
        /// </summary>
        [DataMember(Name = "BasicInformationEmailId", Order = 9)]
        public string BasicInformationEmailId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets JoiningLocation
        /// </summary>
        [DataMember(Name = "CurrentAddressAddress", Order = 10)]
        public string CurrentAddressAddress
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets AccountName
        /// </summary>
        [DataMember(Name = "CurrentAddressCountry", Order = 11)]
        public string CurrentAddressCountry
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets OwningDepartment
        /// </summary>
        [DataMember(Name = "CurrentAddressState", Order = 12)]
        public string CurrentAddressState
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets BU
        /// </summary>
        [DataMember(Name = "CurrentAddressCity", Order = 13)]
        public string CurrentAddressCity
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets CasePriority
        /// </summary>
        [DataMember(Name = "CurrentAddressPinCode", Order = 14)]
        public string CurrentAddressPinCode
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets HomePhone
        /// </summary>
        [DataMember(Name = "CurrentAddressDurationofstayFrom", Order = 15)]
        public string CurrentAddressDurationofstayFrom
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets Mobile
        /// </summary>
        [DataMember(Name = "CurrentAddressDurationofstayTo", Order = 16)]
        public string CurrentAddressDurationofstayTo
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets EmailId
        /// </summary>
        [DataMember(Name = "PermanentAddressAddress", Order = 17)]
        public string PermanentAddressAddress
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets TypeOfJoiner
        /// </summary>
        [DataMember(Name = "PermanentAddressCountry", Order = 7)]
        public string PermanentAddressCountry
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets OfferExtendedDate
        /// </summary>
        [DataMember(Name = "PermanentAddressState", Order = 8)]
        public string PermanentAddressState
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets OfferLocation
        /// </summary>
        [DataMember(Name = "PermanentAddressCity", Order = 9)]
        public string PermanentAddressCity
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets JoiningLocation
        /// </summary>
        [DataMember(Name = "PermanentAddressPinCode", Order = 10)]
        public string PermanentAddressPinCode
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets AccountName
        /// </summary>
        [DataMember(Name = "PermanentAddressDurationofstayFrom", Order = 11)]
        public string PermanentAddressDurationofstayFrom
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets OwningDepartment
        /// </summary>
        [DataMember(Name = "PermanentAddressDurationofstayTo", Order = 12)]
        public string PermanentAddressDurationofstayTo
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets BU
        /// </summary>
        [DataMember(Name = "LongestStayAddressAddress", Order = 13)]
        public string LongestStayAddressAddress
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets CasePriority
        /// </summary>
        [DataMember(Name = "LongestStayAddressCountry", Order = 14)]
        public string LongestStayAddressCountry
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets HomePhone
        /// </summary>
        [DataMember(Name = "LongestStayAddressState", Order = 15)]
        public string LongestStayAddressState
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets Mobile
        /// </summary>
        [DataMember(Name = "LongestStayAddressCity", Order = 16)]
        public string LongestStayAddressCity
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets EmailId
        /// </summary>
        [DataMember(Name = "LongestStayAddressPinCode", Order = 17)]
        public string LongestStayAddressPinCode
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets Mobile
        /// </summary>
        [DataMember(Name = "LongestStayAddressDurationofstayFrom", Order = 16)]
        public string LongestStayAddressDurationofstayFrom
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets EmailId
        /// </summary>
        [DataMember(Name = "LongestStayAddressDurationofstayTo", Order = 17)]
        public string LongestStayAddressDurationofstayTo
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets EmailId
        /// </summary>
        [DataMember(Name = "PR1Name", Order = 17)]
        public string PR1Name
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets EmailId
        /// </summary>
        [DataMember(Name = "PR1Designation", Order = 17)]
        public string PR1Designation
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets EmailId
        /// </summary>
        [DataMember(Name = "PR1Company", Order = 17)]
        public string PR1Company
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets EmailId
        /// </summary>
        [DataMember(Name = "PR1Landline", Order = 17)]
        public string PR1Landline
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets EmailId
        /// </summary>
        [DataMember(Name = "PR1Mobile", Order = 17)]
        public string PR1Mobile
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets EmailId
        /// </summary>
        [DataMember(Name = "PR1Email", Order = 17)]
        public string PR1Email
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets EmailId
        /// </summary>
        [DataMember(Name = "PR1Address", Order = 17)]
        public string PR1Address
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets EmailId
        /// </summary>
        [DataMember(Name = "PR2Name", Order = 17)]
        public string PR2Name
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets EmailId
        /// </summary>
        [DataMember(Name = "PR2Designation", Order = 17)]
        public string PR2Designation
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets EmailId
        /// </summary>
        [DataMember(Name = "PR2Company", Order = 17)]
        public string PR2Company
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets EmailId
        /// </summary>
        [DataMember(Name = "PR2Landline", Order = 17)]
        public string PR2Landline
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets EmailId
        /// </summary>
        [DataMember(Name = "PR2Mobile", Order = 17)]
        public string PR2Mobile
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets EmailId
        /// </summary>
        [DataMember(Name = "PR2Email", Order = 17)]
        public string PR2Email
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets EmailId
        /// </summary>
        [DataMember(Name = "PR2Address", Order = 17)]
        public string PR2Address
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
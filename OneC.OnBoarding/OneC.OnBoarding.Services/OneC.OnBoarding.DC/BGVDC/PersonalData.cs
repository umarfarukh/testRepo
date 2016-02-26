// -----------------------------------------------------------------------
// <copyright file="PersonalData.cs" company="CTS">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace OneC.OnBoarding.DC.BGVDC
{
    using System;
    using System.Runtime.Serialization;

    /// <summary>
    /// TODO: Update summary.
    /// </summary>
    public class PersonalData
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
        [DataMember(Name = "Mode", Order = 4)]
        public int Mode
        {
            get;
            set;
        }

        /// <summary>
        ///  Gets or sets the candidate first name
        /// </summary>
        [DataMember(Name = "CandidateFName", Order = 5)]
        public string CandidateFName
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the  candidate last name
        /// </summary>
        [DataMember(Name = "CandidateLName", Order = 6)]
        public string CandidateLName
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the  candidate first name
        /// </summary>
        [DataMember(Name = "CandidateMName", Order = 7)]
        public string CandidateMName
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the  Designation
        /// </summary>
        [DataMember(Name = "Designation", Order = 8)]
        public string Designation
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the  Expected date of joining
        /// </summary>
        [DataMember(Name = "EDOJ", Order = 9)]
        public string EDOJ
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the  Type of joining whether short/ normal
        /// </summary>
        [DataMember(Name = "Joining", Order = 10)]
        public int Joining
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the  Offer Extended Date
        /// </summary>
        [DataMember(Name = "OED", Order = 11)]
        public string OED
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the Offer Location
        /// </summary>
        [DataMember(Name = "OfferLocation", Order = 12)]
        public string OfferLocation
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the  Joining location
        /// </summary>
        [DataMember(Name = "JoiningLocation", Order = 13)]
        public string JoiningLocation
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the Account Name
        /// </summary>
        [DataMember(Name = "AccountName", Order = 14)]
        public string AccountName
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the  Owning department
        /// </summary>
        [DataMember(Name = "OwningDept", Order = 15)]
        public string OwningDept
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the  Business entity type value
        /// </summary>
        [DataMember(Name = "BusinessEntity", Order = 16)]
        public string BusinessEntity
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the  candidate first name
        /// </summary>
        [DataMember(Name = "CasePriority", Order = 17)]
        public string CasePriority
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the Expected BGV closure date
        /// </summary>
        [DataMember(Name = "EBGVClosureDate", Order = 18)]
        public string EBGVClosureDate
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the BGV completion date
        /// </summary>
        [DataMember(Name = "BGVCompletionDate", Order = 19)]
        public string BGVCompletionDate
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the  land line number
        /// </summary>
        [DataMember(Name = "LandLineNumber", Order = 20)]
        public string LanNumber
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the  Mobile number
        /// </summary>
        [DataMember(Name = "MobileNumber", Order = 21)]
        public string MobileNumber
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the  Email id
        /// </summary>
        [DataMember(Name = "EmailId", Order = 22)]
        public string EmailId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the  Current address
        /// </summary>
        [DataMember(Name = "CurrentAddress", Order = 23)]
        public string CurrentAddress
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the  Current Country
        /// </summary>
        [DataMember(Name = "CurrentCountry", Order = 24)]
        public string CurrentCountry
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the  Current city
        /// </summary>
        [DataMember(Name = "CurrentCity", Order = 25)]
        public string CurrentCity
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the  Current state
        /// </summary>
        [DataMember(Name = "CurrentState", Order = 26)]
        public string CurrentState
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the  Current address PinCode
        /// </summary>
        [DataMember(Name = "CurrentPinCode", Order = 27)]
        public string CurrentPinCode
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the  Current duration of stay from
        /// </summary>
        [DataMember(Name = "CurrentDurationStayFrom", Order = 28)]
        public string CurrentDurationStayFrom
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the  Current duration of stay to
        /// </summary>
        [DataMember(Name = "CurrentDurationStayTo", Order = 29)]
        public string CurrentDurationStayTo
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the  Permanent address
        /// </summary>
        [DataMember(Name = "PermanentAddress", Order = 30)]
        public string PermanentAddress
        {
            get;
            set;
        }

        /// <summary>
        ///  Gets or sets the  Permanent Country
        /// </summary>
        [DataMember(Name = "PermanentCountry", Order = 31)]
        public string PermanentCountry
        {
            get;
            set;
        }

        /// <summary>
        ///  Gets or sets the  Permanent city
        /// </summary>
        [DataMember(Name = "PermanentCity", Order = 32)]
        public string PermanentCity
        {
            get;
            set;
        }

        /// <summary>
        ///  Gets or sets the  Permanent state
        /// </summary>
        [DataMember(Name = "PermanentState", Order = 33)]
        public string PermanentStatetate
        {
            get;
            set;
        }

        /// <summary>
        ///  Gets or sets the  Permanent PinCode
        /// </summary>
        [DataMember(Name = "PermanentPinCode", Order = 34)]
        public string PermanentPinCode
        {
            get;
            set;
        }

        /// <summary>
        ///  Gets or sets the  Permanent duration of stay from
        /// </summary>
        [DataMember(Name = "PermanentDurationStayFrom", Order = 35)]
        public string PermanentDurationStayFrom
        {
            get;
            set;
        }

        /// <summary>
        ///  Gets or sets the  Permanent duration of stay to
        /// </summary>
        [DataMember(Name = "PermanentDurationStayTo", Order = 36)]
        public string PermanentDurationStayTo
        {
            get;
            set;
        }

        /// <summary>
        ///  Gets or sets the  Longest stay address
        /// </summary>
        [DataMember(Name = "LongestStayAddress", Order = 37)]
        public string LongestStayAddress
        {
            get;
            set;
        }

        /// <summary>
        ///   Gets or sets the  Longest stay Country
        /// </summary>
        [DataMember(Name = "LongestStayCountry", Order = 38)]
        public string LongestStayCountry
        {
            get;
            set;
        }

        /// <summary>
        ///   Gets or sets the  Longest stay city
        /// </summary>
        [DataMember(Name = "LongestStayCity", Order = 39)]
        public string LongestStayCity
        {
            get;
            set;
        }

        /// <summary>
        ///   Gets or sets the  Longest stay state
        /// </summary>
        [DataMember(Name = "LongestStayState", Order = 40)]
        public string LongestStayState
        {
            get;
            set;
        }

        /// <summary>
        ///   Gets or sets the  Longest stay PinCode
        /// </summary>
        [DataMember(Name = "LongestStayPinCode", Order = 41)]
        public string LongestStayPinCode
        {
            get;
            set;
        }

        /// <summary>
        ///   Gets or sets the  Longest stay duration of stay from  date
        /// </summary>
        [DataMember(Name = "LongestStayDurationStayFrom", Order = 42)]
        public string LongestStayDurationStayFrom
        {
            get;
            set;
        }

        /// <summary>
        ///   Gets or sets the  Longest stay duration of stay to
        /// </summary>
        [DataMember(Name = "LongestStayDurationStayTo", Order = 43)]
        public string LongestStayDurationStayTo
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
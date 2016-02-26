// <copyright file = "GeographyMaster.cs" company = "CTS">
// Copyright (c) OnBoarding_GeographyMaster. All rights reserved.
// </copyright>

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DC         
 * Class Name       : GeographyMaster.cs
 * Version          : 1.0
 * Type             : DataContract
 * Purpose          : Data contracts for Fetching Geography Master
 * Created date     : 2012-Jan-06
 * Author           : 208099
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
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Linq;    
    using System.Runtime.Serialization;
    using System.Text;
    #endregion Namespaces

    /// <summary>
    /// Data contract Country Master
    /// </summary>
    [DataContract(Name = "Country", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/UtilityDC/")]
    [Serializable]
    public class Country
    {
        /// <summary>
        /// Gets or sets Country Code
        /// </summary>
        [DataMember(Name = "CountryCode", Order = 1, IsRequired = true)]
        public string CountryCode { get; set; }

        /// <summary>
        /// Gets or sets Country id assigned by Onboarding
        /// </summary>
        [DataMember(Name = "CountryId", Order = 2, IsRequired = true)]
        public int CountryId { get; set; }

        /// <summary>
        /// Gets or sets Country Description
        /// </summary>
        [DataMember(Name = "CountryDescription", Order = 3, IsRequired = true)]
        public string CountryDescription { get; set; }

        /// <summary>
        /// Gets or sets Mode
        /// </summary>
        [DataMember(Name = "Mode", Order = 4, IsRequired = true)]
        public int Mode { get; set; }

        /// <summary>
        /// Gets or sets ParentId
        /// </summary>
        [DataMember(Name = "ParentId", Order = 5, IsRequired = true)]
        public int ParentId { get; set; }

         /// <summary>
        /// Gets or sets CandidateId
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 6, IsRequired = true)]
        public int CandidateId { get; set; }

        /// <summary>
        /// Gets or sets Coverage Amount
        /// </summary>
        [DataMember(Name = "CoveragAmount ", Order = 7, IsRequired = true)]
        public string CoveragAmount { get; set; }

        /// <summary>
        /// Gets or sets Premium
        /// </summary>
        [DataMember(Name = "Premium ", Order = 8, IsRequired = true)]
        public string Premium { get; set; }
    }

    /// <summary>
    /// Class for Country list
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class CountryList : List<Country>
    { 
    }

    /// <summary>
    /// Data Contract for Country list source
    /// </summary>
    [DataContract(Name = "CountryListSource", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/CandidateDC/")]
    [Serializable]
    public class CountryListSource
    {
        /// <summary>
        /// Gets or sets CountryData
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "CountryList", Order = 4)]
        public CountryList CountryData { get; set; }
    }

    /// <summary>
    /// Data contract State Master
    /// </summary>
    [DataContract(Name = "State", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/UtilityDC/")]
    [Serializable]
    public class State
    {
        /// <summary>
        /// Gets or sets State Code
        /// </summary>
        [DataMember(Name = "StateCode", Order = 1, IsRequired = true)]
        public string StateCode { get; set; }

        /// <summary>
        /// Gets or sets State id assigned by Onboarding
        /// </summary>
        [DataMember(Name = "StateId", Order = 2, IsRequired = true)]
        public int StateId { get; set; }

        /// <summary>
        /// Gets or sets State Description
        /// </summary>
        [DataMember(Name = "StateDescription", Order = 3, IsRequired = true)]
        public string StateDescription { get; set; }

        /// <summary>
        /// Gets or sets Country Code
        /// </summary>
        [DataMember(Name = "CountryCode", Order = 4, IsRequired = true)]
        public string CountryCode { get; set; }

        /// <summary>
        /// Gets or sets Id assigned by Onboarding
        /// </summary>
        [DataMember(Name = "CountryId", Order = 5, IsRequired = true)]
        public int CountryId { get; set; }

        /// <summary>
        /// Gets or sets Mode
        /// </summary>
        [DataMember(Name = "Mode", Order = 6, IsRequired = true)]
        public int Mode { get; set; }
    }

    /// <summary>
    /// Class for State list
    /// </summary>
    [Serializable]
    public class StateList : List<State>
    {
    }

    /// <summary>
    /// Data contract City Master
    /// </summary>
    [DataContract(Name = "City", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/UtilityDC/")]
    [Serializable]
    public class City
    {
        /// <summary>
        /// Gets or sets City Code
        /// </summary>
        [DataMember(Name = "CityCode", Order = 1, IsRequired = true)]
        public string CityCode { get; set; }

        /// <summary>
        /// Gets or sets City id assigned by Onboarding
        /// </summary>
        [DataMember(Name = "CityId", Order = 2, IsRequired = true)]
        public int CityId { get; set; }

        /// <summary>
        /// Gets or sets City Description
        /// </summary>
        [DataMember(Name = "CityDescription", Order = 3, IsRequired = true)]
        public string CityDescription { get; set; }

        /// <summary>
        /// Gets or sets State id to which this location is mapped
        /// </summary>
        [DataMember(Name = "StateId", Order = 4, IsRequired = true)]
        public int StateId { get; set; }

        /// <summary>
        /// Gets or sets CountryID
        /// </summary>
        [DataMember(Name = "CountryID", Order = 5, IsRequired = true)]
        public int CountryID { get; set; }
    }

    /// <summary>
    /// Class for City list
    /// </summary>
    [Serializable]
    public class CityList : List<City>
    { 
    }

    /// <summary>
    /// Data contract for Location Master
    /// </summary>
    [DataContract(Name = "Location", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/UtilityDC/")]
    [Serializable]
    public class Location
    {
        /// <summary>
        /// Gets or sets Location Code
        /// </summary>
        [DataMember(Name = "LocationCode", Order = 1, IsRequired = true)]
        public string LocationCode { get; set; }

        /// <summary>
        /// Gets or sets Location Id assigned by Onboarding
        /// </summary>
        [DataMember(Name = "LocationId", Order = 2, IsRequired = true)]
        public int LocationId { get; set; }

        /// <summary>
        /// Gets or sets Location Description
        /// </summary>
        [DataMember(Name = "LocationDescription", Order = 3, IsRequired = true)]
        public string LocationDescription { get; set; }

        /// <summary>
        /// Gets or sets City Id to which this location belongs
        /// </summary>
        [DataMember(Name = "CityId", Order = 4, IsRequired = true)]
        public int CityId { get; set; }

        /// <summary>
        /// Gets or sets Country Id to which this location belongs
        /// </summary>
        [DataMember(Name = "CountryId", Order = 5, IsRequired = true)]
        public int CountryId { get; set; }
    }

    /// <summary>
    /// Class for Location list
    /// </summary>
    [Serializable]
    public class LocationList : List<Location>
    {
    }
}
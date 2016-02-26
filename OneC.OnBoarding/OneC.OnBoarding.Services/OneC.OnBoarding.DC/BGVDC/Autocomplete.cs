// -----------------------------------------------------------------------
// <copyright file="Autocomplete.cs" company="CTS">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace OneC.OnBoarding.DC.BGVDC
{
    using System;
    using System.Collections.ObjectModel;
    using System.Runtime.Serialization;

    /// <summary>
    /// Represents the input parameters of back papers get SP.
    /// </summary>
    [DataContract(Name = "Autocomplete", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/BGVDC/")]
    [Serializable]
    public class Autocomplete
    {
        /// <summary>
        /// Gets or sets the value of ItemName
        /// </summary>
        [DataMember(Name = "ItemName", Order = 1)]
        public string ItemName
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the value of TypeGroup
        /// </summary>
        [DataMember(Name = "TypeGroup", Order = 2)]
        public int TypeGroup
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets Items
        /// </summary>
        [DataMember(Name = "Items", Order = 3)]
        public Collection<ItemList> Items
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

    /// <summary>
    /// Gets or set the list of items
    /// </summary>
    [Serializable]
    public class ItemList
    {
        /// <summary>
        /// Gets or sets the value of ItemVal
        /// </summary>
        [DataMember(Name = "ItemVal", Order = 1)]
        public string ItemVal
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the value of ItemId
        /// </summary>
        [DataMember(Name = "ItemId", Order = 2)]
        public string ItemId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the value of ItemId
        /// </summary>
        [DataMember(Name = "SChk", Order = 3)]
        public int SChk
        {
            get;
            set;
        }
    }
}
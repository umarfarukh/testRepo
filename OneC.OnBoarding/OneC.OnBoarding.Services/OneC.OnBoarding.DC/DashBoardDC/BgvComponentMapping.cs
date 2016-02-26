// <copyright file = "BgvComponentMapping.cs" company = "CTS">
// Copyright (c) OnBoarding_BgvComponentMapping. All rights reserved.
// </copyright>

/*About me
*******************************************************
* Namespace        : OneC.OnBoarding.DC.DashBoardDC         
* Class Name       : BgvComponentMapping
* Version          : 1.0
* Type             : DataContract
* Purpose          : Data contracts for Bgv ComponenetMapping
* Created date     : 2013-Jan-07
* Author           : 312267
* Reviewed by      :
*******************************************************
*/

namespace OneC.OnBoarding.DC.DashBoardDC
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Linq;    
    using System.Runtime.Serialization;
    using System.Text;
    #endregion

    /// <summary>
    /// Data Contract for BGV Data
    /// </summary>
    [DataContract(Name = "BgvComponentMapping", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/DashBoardDC/")]
    [Serializable]
    public sealed class BgvComponentMapping : IDisposable
    {
        /// <summary>
        /// initialization Enumeration for Modes
        /// </summary>
        private enum Modes
        {
            /// <summary>
            /// Flag for null values
            /// </summary>
            None = 0,

            /// <summary>
            /// Flag for Insert
            /// </summary>
            Insert = 1,

            /// <summary>
            /// Flag for Delete
            /// </summary>
            Delete = 2,

            /// <summary>
            /// Flag for Update
            /// </summary>
            Update = 3,

            /// <summary>
            /// Flag for UpdateForMatrix
            /// </summary>
            UpdateForMatrix = 4
        }
       
        /// <summary>
        /// Gets or sets ComponentId
        /// </summary>
        [DataMember(Name = "ComponentId", Order = 1)]
        public int ComponentId { get; set; }

        /// <summary>
        /// Gets or sets TypeId
        /// </summary>
        [DataMember(Name = "TypeId", Order = 2)]
        public int TypeId { get; set; }

        /// <summary>
        /// Gets or sets BU Id
        /// </summary>
        [DataMember(Name = "BUId", Order = 3)]
        public int BUId { get; set; }

        /// <summary>
        /// Gets or sets CountryId
        /// </summary>
        [DataMember(Name = "CountryId", Order = 4)]
        public int CountryId { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether Is repeatable
        /// </summary>
        [DataMember(Name = "IsRepeatable", Order = 5)]
        public bool IsRepeatable { get; set; }

        /// <summary>
        /// Gets or sets Mode
        /// </summary>
        [DataMember(Name = "Mode", Order = 6)]
        public int Mode { get; set; }

        /// <summary>
        /// Gets or sets  Session Id
        /// </summary>
        [DataMember(Name = "SessionId", Order = 7)]
        public long SessionId { get; set; }

        /// <summary>
        /// Gets or sets ComponentDetailId
        /// </summary>
        [DataMember(Name = "ComponentDetailId", Order = 8)]
        public int ComponentDetailId { get; set; }

        /// <summary>
        /// Gets or sets HTMLTemplate
        /// </summary>
        [DataMember(Name = "HTMLTemplate", Order = 9)]
        public string HTMLTemplate { get; set; }

        /// <summary>
        /// Gets or sets XMLTemplate
        /// </summary>
        [DataMember(Name = "XMLTemplate", Order = 10)]
        public string XMLTemplate { get; set; }

        /// <summary>
        /// Gets or sets Can Delete
        /// </summary>
        [DataMember(Name = "CanDelete", Order = 11)]
        public int CanDelete { get; set; }

        /// <summary>
        /// Gets or sets CanAssignToVendor
        /// </summary>
        [DataMember(Name = "CanAssignToVendor", Order = 12)]
        public string CanAssignToVendor { get; set; }

        /// <summary>
        /// Gets or sets DocumentId
        /// </summary>
        //// for Document Adding
        [DataMember(Name = "DocumentId", Order = 13)]
        public int DocumentId { get; set; }

        /// <summary>
        /// Gets or sets DocumentName
        /// </summary>
        [DataMember(Name = "DocumentName", Order = 14)]
        public string DocumentName { get; set; }

        /// <summary>
        /// Gets or sets DocumentMatrixId
        /// </summary>
        //// for update document config based on BgvDocumentMatrix
        [DataMember(Name = "DocumentMatrixId", Order = 15)]
        public int DocumentMatrixId { get; set; }

        /// <summary>
        /// Gets or sets IsDefault
        /// </summary>
        [DataMember(Name = "IsDefault", Order = 16)]
        public int IsDefault { get; set; }

        /// <summary>
        /// Gets or sets IsMandatory
        /// </summary>
        [DataMember(Name = "IsMandatory", Order = 17)]
        public int IsMandatory { get; set; }

        /// <summary>
        /// Gets or sets DocumentConfiguration XML
        /// </summary>
        [DataMember(Name = "DocumentConfigXml", Order = 18)]
        public string DocumentConfigXml { get; set; }

        /// <summary>
        /// Method for Dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }    
}
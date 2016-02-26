//-----------------------------------------------------------------------
// <copyright file="BackPapersDC.cs" company="CTS">
//      Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
*******************************************************
* Namespace        : OneC.OnBoarding.DC
* Class Name       : VendorDashboard.cs
* Version          : 1.0
* Type             : DataContract
* Purpose          : Data contracts for DashBoards
* Created date     : 2014-May-05
* Author           : 298589
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

namespace OneC.OnBoarding.DC.BGVDC
{
    using System;
    using System.Collections.ObjectModel;
    using System.Data;
    using System.Runtime.Serialization;

    /// <summary>
    /// Represents the data contract for back papers
    /// </summary>
    [Serializable]
    public class BackPapersDC
    {
        #region Properties

        /// <summary>
        /// Gets or sets BPNoGoTxt
        /// </summary>
        [DataMember(Name = "BPNoGoTxt", Order = 6)]
        public string BPNoGoTxt
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets CandidateId
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 2)]
        public int CandidateId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets ManDocConfig
        /// </summary>
        [DataMember(Name = "ManDocConfig", Order = 4)]
        public DataTable ManDocConfig
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets RetStatus
        /// </summary>
        [DataMember(Name = "RetStatus", Order = 5)]
        public byte RetStatus
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets SessionId
        /// </summary>
        [DataMember(Name = "SessionId", Order = 1)]
        public int SessionId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets SP Mode
        /// </summary>
        [DataMember(Name = "SpMode", Order = 3)]
        public int SpMode
        {
            get;
            set;
        }

        #endregion Properties

        #region Methods

        /// <summary>
        /// Represents the method to dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        #endregion Methods
    }

    /// <summary>
    /// Represents the input parameters of back papers get SP.
    /// </summary>
    [DataContract(Name = "BackPapersDC", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/BGVDC/")]
    [Serializable]
    public class BackPapersParams
    {
        #region Properties

        /// <summary>
        /// Gets or sets BPNoGoTxt
        /// </summary>
        [DataMember(Name = "BPNoGoTxt", Order = 6)]
        public string BPNoGoTxt
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets CandidateId
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 2)]
        public int CandidateId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets ManDocConfigList
        /// </summary>
        [DataMember(Name = "ManDocConfig", Order = 4)]
        public Collection<ManDocConfig> ManDocConfigList
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets RetStatus
        /// </summary>
        [DataMember(Name = "RetStatus", Order = 5)]
        public byte RetStatus
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets SessionId
        /// </summary>
        [DataMember(Name = "SessionId", Order = 1)]
        public int SessionId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets SP Mode
        /// </summary>
        [DataMember(Name = "SpMode", Order = 3)]
        public int SpMode
        {
            get;
            set;
        }

        #endregion Properties

        #region Methods

        /// <summary>
        /// Represents the method to dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        #endregion Methods
    }

    /// <summary>
    /// Represents the mandatory document configuration for back papers
    /// </summary>
    [Serializable]
    public class ManDocConfig
    {
        #region Properties

        /// <summary>
        /// Gets or sets CandidateBGVComponentDetail
        /// </summary>
        [DataMember(Order = 2, Name = "CandidateBgvComponentDetail")]
        public int CandidateBgvComponentDetail
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets DocumentMatrixId
        /// </summary>
        [DataMember(Order = 1, Name = "DocumentMatrixId")]
        public int DocumentMatrixId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets IsDefault
        /// </summary>
        [DataMember(Order = 3, Name = "IsDefault")]
        public byte IsDefault
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets IsMandatory
        /// </summary>
        [DataMember(Order = 4, Name = "IsMandatory")]
        public byte IsMandatory
        {
            get;
            set;
        }

        #endregion Properties
    }
}
//-----------------------------------------------------------------------
// <copyright file="UploadUtilityDC.cs" company="CTS">
//      Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DC
 * Class Name       : UploadDC.cs
 * Version          : 1.0
 * Type             : DataContract
 * Purpose          : Data contracts for file upload
 * Created date     : 2014-Jan-21
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
namespace OneC.OnBoarding.DC.UtilityDC
{
    using System;
    using System.Runtime.Serialization;

    /// <summary>
    /// Represents the upload return response DC
    /// </summary>
    public sealed class UploadReturnResponseDC : IDisposable
    {
        #region Properties

        /// <summary>
        /// Gets or sets DataXML
        /// </summary>        
        public string DataXML
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
    /// Data contract for file upload
    /// </summary>
    [DataContract(Name = "UploadUtiltiyDC", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/UtilityDC/")]
    [Serializable]
    public sealed class UploadUtiltiyDC : IDisposable
    {
        #region Properties

        /// <summary>
        /// Gets or sets CandidateId
        /// </summary>        
        [DataMember(Name = "CandidateId", Order = 2, IsRequired = true)]
        public long CandidateId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets DocumentId
        /// </summary>        
        [DataMember(Name = "DocumentId", Order = 11)]
        public int DocumentId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets ECM Utility Message
        /// </summary>        
        [DataMember(Name = "ECMUtilMessage", Order = 8)]
        public string ECMUtilMessage
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets FileContentId
        /// </summary>        
        [DataMember(Name = "FileContentId", Order = 14)]
        public string FileContentId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets FileUploadId
        /// </summary>        
        [DataMember(Name = "FileUploadId", Order = 13)]
        public long FileUploadId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets Mode
        /// </summary>        
        [DataMember(Name = "Mode", Order = 6, IsRequired = true)]
        public int Mode
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets RoleGroupId
        /// </summary>        
        [DataMember(Name = "RoleGroupId", Order = 4, IsRequired = true)]
        public int RoleGroupId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets SendCode
        /// </summary>        
        [DataMember(Name = "SendCode", Order = 9)]
        public int SendCode
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets SendMessage
        /// </summary>        
        [DataMember(Name = "SendMessage", Order = 10)]
        public string SendMessage
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets SendStatus
        /// </summary>        
        [DataMember(Name = "SendStatus", Order = 7)]
        public string SendStatus
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets SessionId
        /// </summary>        
        [DataMember(Name = "SessionId", Order = 1, IsRequired = true)]
        public long SessionId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets Stored procedure Mode
        /// </summary>        
        [DataMember(Name = "SpMode", Order = 5, IsRequired = true)]
        public int SpMode
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets UpGroupId
        /// </summary>        
        [DataMember(Name = "UpGroupId", Order = 3, IsRequired = true)]
        public string UpGroupId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets UpId
        /// </summary>        
        [DataMember(Name = "UpId", Order = 12)]
        public string UpId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets UploadDocRemarks
        /// </summary>        
        [DataMember(Name = "UploadDocRemarks", Order = 16)]
        public string UploadDocRemarks
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets UpRunnerId
        /// </summary>        
        [DataMember(Name = "UpRunnerId", Order = 15)]
        public int UpRunnerId
        {
            get;
            set;
        }

       /// <summary>
        /// Gets or sets a value indicating whether return properties
       /// </summary>
        [DataMember(Name = "Return", Order = 16)]
        public bool Return
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
}
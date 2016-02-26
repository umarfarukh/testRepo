//-----------------------------------------------------------------------
// <copyright file="UploadSessionStorage.cs" company="CTS">
//      Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DC
 * Class Name       : UploadSessionStorage.cs
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
    using System.Collections.Generic;
    using System.Runtime.Serialization;

    /// <summary>
    /// Data contract for file upload
    /// </summary>
    [DataContract(Name = "UploadSessionStorage", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/UtilityDC/")]
    [Serializable]
    public sealed class UploadSessionStorage : IDisposable
    {
        #region Properties

        /// <summary>
        /// Gets or sets DocumentId
        /// </summary>        
        [DataMember(Name = "DocumentId", Order = 5)]
        public int DocumentId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets ECMContentId
        /// </summary>        
        [DataMember(Name = "ECMDocumentContentId", Order = 1)]
        public string ECMContentId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets FileContentId
        /// </summary>        
        [DataMember(Name = "FileContentId", Order = 7)]
        public string FileContentId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets FileUploadId
        /// </summary>        
        [DataMember(Name = "FileUploadId", Order = 6)]
        public long FileUploadId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets MasterCopyContentId
        /// </summary>        
        [DataMember(Name = "MasterCopyContentId", Order = 2)]
        public string MasterCopyContentId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets SANDownloadURL
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1056:UriPropertiesShouldNotBeStrings", Justification = "Reviewed."), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed."), DataMember(Name = "SANDownloadURL", Order = 8)]
        public string SANDownloadURL
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets TemplateContentId
        /// </summary>        
        [DataMember(Name = "DownloadTemplateContentId", Order = 3)]
        public string TemplateContentId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets UpId
        /// </summary>        
        [DataMember(Name = "UpId", Order = 4)]
        public string UpId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets UpRunnerId
        /// </summary>        
        [DataMember(Name = "UpRunnerId", Order = 9)]
        public int UpRunnerId
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
    /// Represents the list of upload session storage list
    /// </summary>
    [Serializable]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
    public class UploadSessionStorageDCList : List<UploadSessionStorage>
    {
    }

    /// <summary>
    /// Represents the list of upload session storage data
    /// </summary>
    [DataContract(Name = "UploadStorageData", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/UtilityDC/")]
    [Serializable]
    public class UploadStorageData
    {
        #region Fields

        /// <summary>
        /// Represents the list of upload session storage
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("StyleCop.CSharp.MaintainabilityRules", "SA1401:FieldsMustBePrivate", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1002:DoNotExposeGenericLists", Justification = "Reviewed.")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1051:DoNotDeclareVisibleInstanceFields", Justification = "Reviewed.")]
        [DataMember(Name = "Data", IsRequired = true, Order = 1)]
        public List<UploadSessionStorage> UploadSessionStorageData;

        #endregion Fields
    }
}
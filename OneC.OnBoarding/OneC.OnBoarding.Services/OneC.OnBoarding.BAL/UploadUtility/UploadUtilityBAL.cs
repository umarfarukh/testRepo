//-----------------------------------------------------------------------
// <copyright file="UploadUtilityBAL.cs" company="CTS">
//      Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DAL.Upload
 * Class Name       : Upload.cs
 * Version          : 1.0
 * Type             : Class
 * Purpose          : Methods Related to Upload functionalities
 * Created date     : 2014-FEB-14
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
namespace OneC.OnBoarding.DC.UploadUtility
{
    using System;
    using System.Data;

    using Newtonsoft.Json;

    using OneC.OnBoarding.DAL.UploadUtility;
    using OneC.OnBoarding.DC.UtilityDC;

    /// <summary>
    /// Represents the upload utility tool BAL
    /// </summary>
    public sealed class UploadUtilityBAL : IDisposable
    {
        #region Methods
        /// <summary>
        /// Represents the method to dispose the garbage collection.
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// Represents the method to fetch the latest ECM upload URL
        /// </summary>
        /// <param name="objUploadUtiltiyDC">Represents the data contract object</param>
        /// <returns>Returns the latest ECM URL</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed."), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1055:UriReturnValuesShouldNotBeStrings", Justification = "Reviewed.")]
        public string GetECMUploadURL(UploadUtiltiyDC objUploadUtiltiyDC)
        {
            string strJson = string.Empty;
            DataSet objDataSet = (new UploadUtilityDAL()).GetECMUploadURL(objUploadUtiltiyDC);
            if (objDataSet.Tables.Count > 0)
            {
                objDataSet.DataSetName = "Upload";
                objDataSet.Tables[0].TableName = "Data";
                strJson = JsonConvert.SerializeObject(objDataSet, Formatting.None);
            }

            return strJson;
        }

        /// <summary>
        /// Represents the method to get the upload configuration.
        /// </summary>
        /// <param name="upload">Represents the DC of upload utility tool DC</param>
        /// <returns>Returns the set of upload configuration</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public string GetUploadList(UploadUtiltiyDC upload)
        {
            string strJson = string.Empty;
            DataSet objDataSet = (new UploadUtilityDAL()).GetUploadList(upload);
            if (objDataSet.Tables.Count > 0)
            {
                objDataSet.DataSetName = "Upload";
                objDataSet.Tables[0].TableName = "UploadEnableChecks";
                objDataSet.Tables[1].TableName = "Data";
                strJson = JsonConvert.SerializeObject(objDataSet, Formatting.None);
            }

            return strJson;
        }

        /// <summary>
        /// Represents the method to save the upload response.
        /// </summary>
        /// <param name="objUploadUtiltiyDC">Represents the data contract of upload utility tool DC</param>
        /// <returns>Returns the latest configuration after upload success</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public string SaveUploadResponse(UploadUtiltiyDC objUploadUtiltiyDC)
        {
            string strJson = string.Empty;
            DataSet objDataSet = (new UploadUtilityDAL()).SaveUploadResponse(objUploadUtiltiyDC);
            if (objDataSet.Tables.Count > 0)
            {
                objDataSet.DataSetName = "Upload";
                objDataSet.Tables[0].TableName = "UploadEnableChecks";
                objDataSet.Tables[1].TableName = "Data";
                strJson = JsonConvert.SerializeObject(objDataSet, Formatting.None);
            }

            return strJson;
        }

        /// <summary>
        /// Represents the method to save the SAN upload response.
        /// </summary>
        /// <param name="uploadDetails">Represents the data contract of upload utility tool DC</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
        public void SaveSANUploadDetails(SANUploadDetails uploadDetails)
        {
            (new UploadUtilityDAL()).SaveSANUploadDetails(uploadDetails);            
        }

        #endregion Methods
    }
}
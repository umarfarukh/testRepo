//-----------------------------------------------------------------------
// <copyright file="UploadUtilityDAL.cs" company="CTS">
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
namespace OneC.OnBoarding.DAL.UploadUtility
{
    using System;
    using System.Data;

    using OneC.OnBoarding.DC.UtilityDC;

    /// <summary>
    /// Represents the upload utility DAL.
    /// </summary>
    public sealed class UploadUtilityDAL : IDisposable
    {
        #region Methods

        /// <summary>
        /// Represents the method to dispose garbage collection
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// Represents the method to fetch the updated ECM URL
        /// </summary>
        /// <param name="objUploadUtiltiyDC">Represents the data contract input</param>
        /// <returns>Returns the updated ECM URL for upload</returns>
        public DataSet GetECMUploadURL(UploadUtiltiyDC objUploadUtiltiyDC)
        {
            return DBHelper.ExecuteDataset("usp_GetECMURL", objUploadUtiltiyDC);
        }

        /// <summary>
        /// Represents the method to get the upload configuration of the request page
        /// </summary>
        /// <param name="objUploadUtiltiyDC">Represents the data contract input</param>
        /// <returns>Returns the set of upload records</returns>
        public DataSet GetUploadList(UploadUtiltiyDC objUploadUtiltiyDC)
        {
            return DBHelper.ExecuteDataset("usp_Get_CandidateUploadDocument", objUploadUtiltiyDC);
        }

        /// <summary>
        /// Represents the method to save the upload  response.
        /// </summary>
        /// <param name="objUploadUtiltiyDC">Represents the data contract input</param>
        /// <returns>Returns the URL of upload and updated configuration</returns>
        public DataSet SaveUploadResponse(UploadUtiltiyDC objUploadUtiltiyDC)
        {
            return DBHelper.ExecuteDataset("usp_Save_CandidateUploadDocument", objUploadUtiltiyDC);
        }

        /// <summary>
        /// Represents the method to save the SAN upload  response.
        /// </summary>
        /// <param name="uploadDetails">Represents the data contract input</param>
        public void SaveSANUploadDetails(SANUploadDetails uploadDetails)
        {
             DBHelper.ExecuteNonQuery("usp_InsertSanUploadResponse", uploadDetails);
        }

        #endregion Methods
    }
}
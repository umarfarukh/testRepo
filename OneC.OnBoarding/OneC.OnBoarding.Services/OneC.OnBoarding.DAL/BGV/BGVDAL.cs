//-----------------------------------------------------------------------
// <copyright file="BGVDAL.cs" company="CTS">
//      Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DAL.BGV
 * Class Name       : BGVBAL.cs
 * Version          : 1.0
 * Type             : Class
 * Purpose          : Methods Related to BGV
 * Created date     : 2014-Jun-06
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

namespace OneC.OnBoarding.DAL.BGV
{
    using System;
    using System.Data;

    using OneC.OnBoarding.DC.BGVDC;

    /// <summary>
    /// Represents the data access layer for BGV stored procedures.
    /// </summary>
    public class BGVDAL
    {
        #region Methods

        /// <summary>
        /// Represents the method to search institution or college name or company name search.
        /// </summary>
        /// <param name="objAutocomplete">Represents the Auto complete data contract.</param>
        /// <returns>Return the list of data.</returns>
        public DataSet AutoSearch(Autocomplete objAutocomplete)
        {
            return DBHelper.ExecuteDataset("usp_BGV_EmploymentNameAutoSearch", objAutocomplete);
        }

        /// <summary>
        /// Represents the method to get or save the back papers screen.
        /// </summary>
        /// <param name="objBackPapersDC">Represents the input data contract.</param>
        /// <returns>Return the list of data.</returns>
        public DataSet BackPapers(BackPapersDC objBackPapersDC)
        {
            return DBHelper.ExecuteDataset("usp_BGV_BackPapers", objBackPapersDC);
        }

        /// <summary>
        /// Represents the method to get or save the document list info for HRSS, NH and RC dashboard.
        /// </summary>
        /// <param name="objDocListInfo">Represents the input data contract.</param>
        /// <returns>Return the list of data.</returns>
        public DataSet DocListInfo(DocListInfo objDocListInfo)
        {
            return DBHelper.ExecuteDataset("usp_BGV_DocListInfo", objDocListInfo);
        }

        /// <summary>
        /// Get the vendor dashboard prams data.
        /// </summary>
        /// <param name="objvendorDashboardParams">The Vendor Dashboard Prams data contract.</param>
        /// <returns>Return stored procedure output in dataset.</returns>
        public DataSet FetchVendorDashboardData(VendorDashboardParams objvendorDashboardParams)
        {
            return DBHelper.ExecuteDataset("usp_BGV_FetchVendorDashboardData", objvendorDashboardParams);
        }

        /// <summary>
        /// Represents the method to fetch the candidate data to assign vendor.
        /// </summary>
        /// <param name="objAssignVendorData">Represents the input data contract.</param>
        /// <returns>Return the list of data.</returns>
        public DataSet GetAssignVendorCandidateData(CandidateBGVData objAssignVendorData)
        {
            DataSet dsgetAvCandidateData;
            dsgetAvCandidateData = DBHelper.ExecuteDataset("usp_BGV_GetAssignVendorCandidateData", objAssignVendorData);
            return dsgetAvCandidateData;
        }

        /// <summary>
        /// Represents the method to fetch components to assign vendor
        /// </summary>
        /// <param name="objAssignVendorData">Represents the input data contract.</param>
        /// <returns>Return the list of data.</returns>
        public DataSet GetAssignVendorComponents(CandidateBGVData objAssignVendorData)
        {
            DataSet dsgetAVCandidateData;
            dsgetAVCandidateData = DBHelper.ExecuteDataset("usp_BGV_GetAssignVendorComponents", objAssignVendorData);
            return dsgetAVCandidateData;
        }

        /// <summary>
        /// Represents the method to get education and experience information data.
        /// </summary>
        /// <param name="objComponentData">Represents the input data contract.</param>
        /// <returns>Return the list of data.</returns>
        public DataSet GetComponentData(ComponentData objComponentData)
        {
            return DBHelper.ExecuteDataset("usp_BGV_Con_GetComponentData", objComponentData);
        }

        /// <summary>
        /// Represents the method to get the page list based on role.
        /// </summary>
        /// <param name="objPageNavigationDC">Represents the input data contract.</param>
        /// <returns>Return the list of data.</returns>
        public DataSet GetPagePathForRole(PageNavigationDC objPageNavigationDC)
        {
            return DBHelper.ExecuteDataset("usp_BGV_Con_PageNavigation", objPageNavigationDC);
        }

        /// <summary>
        /// Represents the method to get the candidate information.
        /// </summary>
        /// <param name="objCandidateInformationDC">Represents the input data contract of candidate information</param>
        /// <returns>Return the list of data.</returns>
        public DataSet GetPersonalData(CandidateInformationDC objCandidateInformationDC)
        {
            return DBHelper.ExecuteDataset("usp_Bgv_Con_CandidateInfo", objCandidateInformationDC);
        }

        /// <summary>
        /// Represents the method to get the vendor candidate information.
        /// </summary>
        /// <param name="objVendorCandidateInfo">Represents the input data contract of vendor candidate information</param>
        /// <returns>Return the list of data.</returns>
        public DataSet GetVendorCandidateData(VendorCandidateInfo objVendorCandidateInfo)
        {
            DataSet dsgetVendorCandidateData;
            dsgetVendorCandidateData = DBHelper.ExecuteDataset("usp_BGV_GetVendorCandidateData", objVendorCandidateInfo);
            return dsgetVendorCandidateData;
        }

        /// <summary>
        /// Represents the method to get the vendor document list information.
        /// </summary>
        /// <param name="objVendorDashboardParams">Represents the input data contract of vendor dashboard parameters</param>
        /// <returns>Return the list of data.</returns>
        public DataSet GetVendorDocListInfo(VendorDashboardParams objVendorDashboardParams)
        {
            DataSet dsgetDocList;
            dsgetDocList = DBHelper.ExecuteDataset("usp_BGV_GetDocListForVendor", objVendorDashboardParams);
            return dsgetDocList;
        }

        /// <summary>
        /// Represents the method to save the assigned vendor candidate data.
        /// </summary>
        /// <param name="objAssignVendorData">Represents the input data contract of assigned vendor data.</param>
        /// <returns>Return the list of data.</returns>
        public DataSet SaveAssignVendorCandidateData(AssignVendorData objAssignVendorData)
        {
            DataSet dsreturnStatus;
            dsreturnStatus = DBHelper.ExecuteDataset("usp_BGV_SaveAssignVendorCandidateData", objAssignVendorData);
            return dsreturnStatus;
        }

        /// <summary>
        /// Represents the method to save the qualifications screen transactions.
        /// </summary>
        /// <param name="objSaveComponentParam">Represents the input data contract.</param>
        /// <returns>Return the list of data.</returns>
        public DataSet SaveComponentData(SaveComponentParam objSaveComponentParam)
        {
            return DBHelper.ExecuteDataset("usp_BGV_Con_SaveCandidateComponentData", objSaveComponentParam);
        }

        /// <summary>
        /// Represents the method to save the qualifications screen transactions.
        /// </summary>
        /// <param name="objSaveComponentData">Represents the input data contract.</param>
        /// <returns>Return the list of data.</returns>
        public DataSet SaveVerificationData(SaveComponent objSaveComponentData)
        {
            return DBHelper.ExecuteDataset("usp_BGV_Con_SaveComponentVerification", objSaveComponentData);
        }

        /// <summary>
        /// Represents the method to save the candidate information data.
        /// </summary>
        /// <param name="objCandidateInformationDC">Represents the input data contract.</param>
        /// <returns>Return the list of data.</returns>
        public DataSet SavePersonalData(CandidateInformationDC objCandidateInformationDC)
        {
            return DBHelper.ExecuteDataset("usp_BGV_Con_SavePersonalData", objCandidateInformationDC);
        }

        /// <summary>
        /// Represents the method to save the vendor document list data.
        /// </summary>
        /// <param name="objVendorDocListInfoParams">Represents the input data contract.</param>
        /// <returns>Return the list of data.</returns>
        public DataSet SaveVendorDocListInfo(VendorDocListInfoParams objVendorDocListInfoParams)
        {
            return DBHelper.ExecuteDataset("usp_BGV_SaveVendorListData", objVendorDocListInfoParams);
        }

        /// <summary>
        /// Represents the method to validate the candidate qualification information data.
        /// </summary>
        /// <param name="objValidation">Represents the input data contract.</param>
        /// <returns>Return the list of data.</returns>
        public DataSet ValidateComponentData(ValidateComponentData objValidation)
        {
            return DBHelper.ExecuteDataset("usp_BGV_Con_ValidateCisComponentData", objValidation);
        }

        /// <summary>
        /// Represents the method to validate the candidate personal information data.
        /// </summary>
        /// <param name="objValidation">Represents the input data contract.</param>
        /// <returns>Return the list of data.</returns>
        public DataSet ValidatePersonalInfo(ValidatePersonalData objValidation)
        {
            return DBHelper.ExecuteDataset("usp_BGV_Con_ValidatePersonalInfo", objValidation);
        }

        /// <summary>
        /// Represents the method to get page notifications.
        /// </summary>
        /// <param name="objPageNotifications">Represents the input data contract.</param>
        /// <returns>Return the list of notifications.</returns>
        public DataSet GetPageNotifications(PageNotifications objPageNotifications)
        {
            return DBHelper.ExecuteDataset("usp_BGV_Con_PageNotifications", objPageNotifications);
        }

        /// <summary>
        /// This method is used to compare the data
        /// </summary>
        /// <param name="objCompareDC">Input parameters</param>
        /// <returns>Returns comparison data</returns>
        public DataSet GetPageComparisionData(CompareDC objCompareDC)
        {
            return DBHelper.ExecuteDataset("usp_BGV_CompareData", objCompareDC);
        }

        /// <summary>
        /// Represents the method to dispose garbage collector.
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        #endregion Methods
    }
}
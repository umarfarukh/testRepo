//-----------------------------------------------------------------------
// <copyright file="BGVUtilityMethods.cs" company="CTS">
//      Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.Services.ServiceBase
 * Class Name       : BGVUtilityMethods.cs
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

namespace OneC.OnBoarding.Services.ServiceBase
{
    using System;
    using System.Collections.ObjectModel;
    using System.ServiceModel;
    using OneC.OnBoarding.BAL.BGV;
    using OneC.OnBoarding.DC.BGVDC;
    using OneC.OnBoarding.DC.UtilityDC;
    using OneC.OnBoarding.Services.ServiceContract;

    /// <summary>
    /// Class which holds all the BGV related service method mapping to BAL
    /// </summary>
    public class BGVUtilityMethods : IBGVUtilityMethods
    {
        #region Methods

        /// <summary>
        /// This method is used to get the list of institution based on auto search field.
        /// </summary>
        /// <param name="objAutocomplete">Input data contract to search matched list.</param>
        /// <returns>List of institutions.</returns>
        public Autocomplete AutoSearch(Autocomplete objAutocomplete)
        {
            try
            {
                return (new BGVBAL()).AutoSearch(objAutocomplete);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// This method is used to get and save the back papers
        /// </summary>
        /// <param name="objBackPapersParams">Data contract for input parameters</param>
        /// <returns>Response of back papers</returns>
        public string BackPapers(BackPapersParams objBackPapersParams)
        {
            try
            {
                return (new BGVBAL()).BackPapers(objBackPapersParams);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// This method is used to get the component data for candidate qualifications screen.
        /// </summary>
        /// <param name="objComponentData">Data Contract for input parameters</param>
        /// <returns>Returns the list of components</returns>
        public string ComponentData(ComponentData objComponentData)
        {
            try
            {
                return (new BGVBAL()).GetComponentData(objComponentData);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// This method is used to get the list of documents to upload.
        /// </summary>
        /// <param name="objDocListInfo">Data contract for input parameters</param>
        /// <returns>Returns the list of configured documents</returns>
        public string DocListInfo(DocListInfo objDocListInfo)
        {
            try
            {
                return (new BGVBAL()).DocListInfo(objDocListInfo);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// This method is used to get the vendor dashboard data.
        /// </summary>
        /// <param name="objVendorDashboardParams">Data contract for input parameters</param>
        /// <returns>Returns the vendor dashboard data</returns>
        public string FetchVendorDashboardData(VendorDashboardParams objVendorDashboardParams)
        {
            try
            {
                return (new BGVBAL()).FetchVendorDashboardData(objVendorDashboardParams);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// This method is used to get the candidate information based on candidate id.
        /// </summary>
        /// <param name="objAssignVendorData">Data Contract for input parameters</param>
        /// <returns>Returns the candidate information data</returns>
        public string GetAssignVendorCandidateData(CandidateBGVData objAssignVendorData)
        {
            try
            {
                return (new BGVBAL()).GetAssignVendorCandidateData(objAssignVendorData);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// This method is used to get the assigned vendor components based on logged user.
        /// </summary>
        /// <param name="objAssignVendorData">Data contract for input</param>
        /// <returns>Returns the vendor assigned components data.</returns>
        public string GetAssignVendorComponents(CandidateBGVData objAssignVendorData)
        {
            try
            {
                return (new BGVBAL()).GetAssignVendorComponents(objAssignVendorData);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// This method is used to get the page URL's based on logged user.
        /// </summary>
        /// <param name="objPageNavigationDC">Data contract for input data</param>
        /// <returns>Returns the list of URL's</returns>
        public string GetPagePathForRole(PageNavigationDC objPageNavigationDC)
        {
            try
            {
                return (new BGVBAL()).GetPagePathForRole(objPageNavigationDC);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// This method is used to get the candidate data for vendor dashboard.
        /// </summary>
        /// <param name="objVendorCandidateInfo">Data contract for input</param>
        /// <returns>returns the vendor candidate data</returns>
        public string GetVendorCandidateData(VendorCandidateInfo objVendorCandidateInfo)
        {
            try
            {
                return (new BGVBAL()).GetVendorCandidateData(objVendorCandidateInfo);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// This method is used to get the candidate assigned components to vendor.
        /// </summary>
        /// <param name="objVendorDashboardParams">Data Contract for input</param>
        /// <returns>Returns the document list of assigned components</returns>
        public string GetVendorDocListInfo(VendorDashboardParams objVendorDashboardParams)
        {
            try
            {
                return (new BGVBAL()).GetVendorDocListInfo(objVendorDashboardParams);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// This method is used to get the candidate information.
        /// </summary>
        /// <param name="objCandidateInformationDC">Data contract for input.</param>
        /// <returns>Returns the candidate information</returns>
        public string PersonalData(CandidateInformationDC objCandidateInformationDC)
        {
            try
            {
                return (new BGVBAL()).GetPersonalData(objCandidateInformationDC);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// This method is used to save transaction of vendor status.
        /// </summary>
        /// <param name="objAssignVendorData">Data contract for input.</param>
        /// <returns>Returns the saved response</returns>
        public string SaveAssignVendorCandidateData(CandidateBGVData objAssignVendorData)
        {
            try
            {
                return (new BGVBAL()).SaveAssignVendorCandidateData(objAssignVendorData);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// This method is used to save the component data
        /// </summary>
        /// <param name="objSaveComponent">Data Contract for input.</param>
        /// <returns>Returns integer saved response</returns>
        public int SaveComponentData(SaveComponent objSaveComponent)
        {
            try
            {
                return (new BGVBAL()).SaveComponentData(objSaveComponent);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// This method is used to save the component data
        /// </summary>
        /// <param name="objSaveComponent">Data Contract for input.</param>
        /// <returns>Returns integer saved response</returns>
        public int SaveVerificationData(SaveComponent objSaveComponent)
        {
            try
            {
                return (new BGVBAL()).SaveVerificationData(objSaveComponent);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// This method is used to save the candidate information
        /// </summary>
        /// <param name="objCandidateInformationDC">Data contact for input.</param>
        /// <returns>Returns the saved response.</returns>
        public int SavePersonalData(CandidateInformationDC objCandidateInformationDC)
        {
            try
            {
                return (new BGVBAL()).SavePersonalData(objCandidateInformationDC);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// This method is used to save vendor document list data,
        /// </summary>
        /// <param name="objVendorDocListInfoParams">Data contract for input</param>
        /// <returns>Returns the saved response.</returns>
        public string SaveVendorDocListInfo(VendorDocListInfoParams objVendorDocListInfoParams)
        {
            try
            {
                return (new BGVBAL()).SaveVendorDocListInfo(objVendorDocListInfoParams);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// This method is used to validate the component data.
        /// </summary>
        /// <param name="objValidation">Data contract for input.</param>
        /// <returns>Returns the validation response.</returns>
        public Validation ValidateComponentData(Validation objValidation)
        {
            try
            {
                return (new BGVBAL()).ValidateComponentData(objValidation);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// This method is used to validate the personal data.
        /// </summary>
        /// <param name="objValidation">Data contract for input.</param>
        /// <returns>Returns the validation response.</returns>
        public ValidatePersonalData ValidatePersonalInfo(ValidatePersonalData objValidation)
        {
            try
            {
                return (new BGVBAL()).ValidatePersonalInfo(objValidation);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// Represents the method to get the page notifications based on candidate.
        /// </summary>
        /// <param name="objPageNotifications">Represents the input data contract</param>
        /// <returns>Returns the list of notifications</returns>
        public Collection<string> GetPageNotifications(PageNotifications objPageNotifications)
        {
            try
            {
                return (new BGVBAL()).GetPageNotifications(objPageNotifications);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// Represents the method to get the page notifications based on candidate.
        /// </summary>
        /// <param name="objCompareDC">Represents the input data contract</param>
        /// <returns>Returns the list of notifications</returns>
        public string GetPageComparisionData(CompareDC objCompareDC)
        {
            try
            {
                return (new BGVBAL()).GetPageComparisionData(objCompareDC);
            }
            catch (Exception ex)
            {
                OBFaultContractFC objFault = OBUtilityMethods.GetFaultException(ex);
                throw new FaultException<OBFaultContractFC>(objFault, objFault.FaultMessage);
            }
        }

        /// <summary>
        /// Represents the method to dispose the garbage collector.
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        #endregion Methods
    }
}
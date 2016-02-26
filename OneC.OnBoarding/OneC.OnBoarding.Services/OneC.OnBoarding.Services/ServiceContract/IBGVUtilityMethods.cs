//-----------------------------------------------------------------------
// <copyright file="IBGVUtilityMethods.cs" company="CTS">
//      Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------

/*About me
 *******************************************************
 * Namespace            : OneC.OnBoarding.Services.ServiceContract
 * Interface Name       : IBGVUtilityServices.cs
 * Version              : 1.0
 * Type                 : Interface
 * Purpose              : Interface references of BGV service methods
 * Created date         : 2014-JULY-20
 * Author               : 298589
 * Reviewed by          :
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

namespace OneC.OnBoarding.Services.ServiceContract
{
    using System.Collections.ObjectModel;
    using System.Net.Security;
    using System.ServiceModel;
    using OneC.OnBoarding.DC.BGVDC;
    using OneC.OnBoarding.DC.UtilityDC;

    /// <summary>
    /// Interface which holds all the BGV Utility Services
    /// </summary>
    [ServiceContract(Name = "IBGVUtilityMethods", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/BGVUtilityMethods/ServiceContracts/")]
    public interface IBGVUtilityMethods
    {
        #region Vendor Dashboard

        /// <summary>
        /// This interface  is used to get the vendor dashboard data.
        /// </summary>
        /// <param name="objVendorDashboardParams">Data contract for input parameters</param>
        /// <returns>Returns the vendor dashboard data</returns>
        [OperationContract(Name = "FetchVendorDashboardData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]
        string FetchVendorDashboardData(VendorDashboardParams objVendorDashboardParams);

        /// <summary>
        /// This interface  is used to get the candidate data for vendor dashboard.
        /// </summary>
        /// <param name="objVendorCandidateInfo">Data contract for input</param>
        /// <returns>returns the vendor candidate data</returns>
        [OperationContract(Name = "GetVendorCandidateData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]
        string GetVendorCandidateData(VendorCandidateInfo objVendorCandidateInfo);

        /// <summary>
        /// This interface  is used to get the candidate assigned components to vendor.
        /// </summary>
        /// <param name="objVendorDashboardParams">Data Contract for input</param>
        /// <returns>Returns the document list of assigned components</returns>
        [OperationContract(Name = "GetVendorDocListInfo", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]
        string GetVendorDocListInfo(VendorDashboardParams objVendorDashboardParams);

        /// <summary>
        /// This interface  is used to save vendor document list data,
        /// </summary>
        /// <param name="objVendorDocListInfoParams">Data contract for input</param>
        /// <returns>Returns the saved response.</returns>
        [OperationContract(Name = "SaveVendorDocListInfo", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]
        string SaveVendorDocListInfo(VendorDocListInfoParams objVendorDocListInfoParams);

        #endregion Vendor Dashboard

        #region Assign Vendor

        /// <summary>
        /// This interface  is used to get the candidate information based on candidate id.
        /// </summary>
        /// <param name="objAssignVendorData">Data Contract for input parameters</param>
        /// <returns>Returns the candidate information data</returns>
        [OperationContract(Name = "GetAssignVendorCandidateData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]
        string GetAssignVendorCandidateData(CandidateBGVData objAssignVendorData);

        /// <summary>
        /// This interface  is used to get the assigned vendor components based on logged user.
        /// </summary>
        /// <param name="objAssignVendorData">Data contract for input</param>
        /// <returns>Returns the vendor assigned components data.</returns>
        [OperationContract(Name = "GetAssignVendorComponents", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]
        string GetAssignVendorComponents(CandidateBGVData objAssignVendorData);

        /// <summary>
        /// This interface  is used to save transaction of vendor status.
        /// </summary>
        /// <param name="objAssignVendorData">Data contract for input.</param>
        /// <returns>Returns the saved response</returns>
        [OperationContract(Name = "SaveAssignVendorCandidateData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]
        string SaveAssignVendorCandidateData(CandidateBGVData objAssignVendorData);

        #endregion Assign Vendor

        #region BackPapers

        /// <summary>
        /// This interface  is used to get and save the back papers
        /// </summary>
        /// <param name="objBackPapersParams">Data contract for input parameters</param>
        /// <returns>Response of back papers</returns>
        [OperationContract(Name = "BackPapers", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]
        string BackPapers(BackPapersParams objBackPapersParams);

        #endregion BackPapers

        #region DocListInfo

        /// <summary>
        /// This interface  is used to get the list of documents to upload.
        /// </summary>
        /// <param name="objDocListInfo">Data contract for input parameters</param>
        /// <returns>Returns the list of configured documents</returns>
        [OperationContract(Name = "DocListInfo", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]
        string DocListInfo(DocListInfo objDocListInfo);

        #endregion DocListInfo

        #region ComponentData

        /// <summary>
        /// This interface  is used to get the component data for candidate qualifications screen.
        /// </summary>
        /// <param name="objComponentData">Data Contract for input parameters</param>
        /// <returns>Returns the list of components</returns>
        [OperationContract(Name = "ComponentData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]
        string ComponentData(ComponentData objComponentData);

        /// <summary>
        /// This interface  is used to save the component data
        /// </summary>
        /// <param name="objSaveComponent">Data Contract for input.</param>
        /// <returns>Returns integer saved response</returns>
        [OperationContract(Name = "SaveComponentData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]
        int SaveComponentData(SaveComponent objSaveComponent);

        /// <summary>
        /// This interface  is used to save the verification component data
        /// </summary>
        /// <param name="objSaveComponent">Data Contract for input.</param>
        /// <returns>Returns integer saved response</returns>
        [OperationContract(Name = "SaveVerificationData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]
        int SaveVerificationData(SaveComponent objSaveComponent);

        /// <summary>
        /// This interface  is used to get the list of institution based on auto search field.
        /// </summary>
        /// <param name="objAutocomplete">Input data contract to search matched list.</param>
        /// <returns>List of institutions.</returns>
        [OperationContract(Name = "AutoSearch", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]
        Autocomplete AutoSearch(Autocomplete objAutocomplete);

        /// <summary>
        /// This interface  is used to validate the component data.
        /// </summary>
        /// <param name="objValidation">Data contract for input.</param>
        /// <returns>Returns the validation response.</returns>
        [OperationContract(Name = "ValidateComponentData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]
        Validation ValidateComponentData(Validation objValidation);

        #endregion ComponentData

        #region PersonalData

        /// <summary>
        /// This interface  is used to get the candidate information.
        /// </summary>
        /// <param name="objCandidateInformationDC">Data contract for input.</param>
        /// <returns>Returns the candidate information</returns>
        [OperationContract(Name = "PersonalData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]
        string PersonalData(CandidateInformationDC objCandidateInformationDC);

        /// <summary>
        /// This interface  is used to save the candidate information
        /// </summary>
        /// <param name="objCandidateInformationDC">Data contact for input.</param>
        /// <returns>Returns the saved response.</returns>
        [OperationContract(Name = "SavePersonalData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]
        int SavePersonalData(CandidateInformationDC objCandidateInformationDC);

        /// <summary>
        /// This interface  is used to validate the personal data.
        /// </summary>
        /// <param name="objValidation">Data contract for input.</param>
        /// <returns>Returns the validation response.</returns>
        [OperationContract(Name = "ValidatePersonalInfo", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]
        ValidatePersonalData ValidatePersonalInfo(ValidatePersonalData objValidation);

        #endregion PersonalData

        #region page navigation

        /// <summary>
        /// This interface  is used to get the page URL's based on logged user.
        /// </summary>
        /// <param name="objPageNavigationDC">Data contract for input data</param>
        /// <returns>Returns the list of URL's</returns>
        [OperationContract(Name = "GetPagePathForRole", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]
        string GetPagePathForRole(PageNavigationDC objPageNavigationDC);

        #endregion page navigation

        #region page notification

        /// <summary>
        /// This interface  is used to get the page notifications based on logged user.
        /// </summary>
        /// <param name="objPageNotifications">Data contract for input data</param>
        /// <returns>Returns the notification list</returns>
        [OperationContract(Name = "GetPageNotifications", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]
        Collection<string> GetPageNotifications(PageNotifications objPageNotifications);

        #endregion page notification

        #region Comaprison

        /// <summary>
        /// This interface  is used to get the page URL's based on logged user.
        /// </summary>
        /// <param name="objCompareDC">Data contract for input data</param>
        /// <returns>Returns the list of URL's</returns>
        [OperationContract(Name = "GetPageComparisionData", IsTerminating = false, IsInitiating = true, IsOneWay = false, AsyncPattern = false, ProtectionLevel = ProtectionLevel.None)]
        [FaultContract(typeof(OBFaultContractFC))]
        string GetPageComparisionData(CompareDC objCompareDC);

        #endregion Comaprison
    }
}
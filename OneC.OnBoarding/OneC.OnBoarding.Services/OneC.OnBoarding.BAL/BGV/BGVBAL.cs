//-----------------------------------------------------------------------
// <copyright file="BGVBAL.cs" company="CTS">
//      Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.BAL.BGV
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

namespace OneC.OnBoarding.BAL.BGV
{
    using System;
    using System.Collections.ObjectModel;
    using System.Data;
    using System.Linq;
    using System.Reflection;
    using Newtonsoft.Json;
    using OneC.OnBoarding.DAL.BGV;
    using OneC.OnBoarding.DC.BGVDC;

    /// <summary>
    /// Represents the business access layer for BGV stored procedures.
    /// </summary>
    public class BGVBAL
    {
        #region Methods

        /// <summary>
        /// Represents the method to search institution or college name or company name search.
        /// </summary>
        /// <param name="objAutocomplete">Represents the Auto complete data contract.</param>
        /// <returns>Return the list of data.</returns>
        public Autocomplete AutoSearch(Autocomplete objAutocomplete)
        {
            Autocomplete dataAutocomplete = new Autocomplete();
            DataSet autoComplete = (new BGVDAL()).AutoSearch(objAutocomplete);
            if (autoComplete.Tables.Count > 0)
            {
                autoComplete.Tables[0].TableName = "Items";
                dataAutocomplete = JsonConvert.DeserializeObject<Autocomplete>(JsonConvert.SerializeObject(autoComplete, Newtonsoft.Json.Formatting.None));
            }

            return dataAutocomplete;
        }

        /// <summary>
        /// Represents the method to get or save the back papers screen.
        /// </summary>
        /// <param name="objBackPapersParams">Represents the input data contract.</param>
        /// <returns>Return the list of data.</returns>
        public string BackPapers(BackPapersParams objBackPapersParams)
        {
            string strJson = string.Empty;
            DataSet dsdata;
            BGVDAL objDAL = new BGVDAL(); 
            BackPapersDC objBackPapersDC = new BackPapersDC();
            if (objBackPapersParams != null)
            {
                objBackPapersDC.CandidateId = objBackPapersParams.CandidateId;

                if (objBackPapersParams.ManDocConfigList != null)
                {
                    objBackPapersDC.ManDocConfig = this.ToDataTable(objBackPapersParams.ManDocConfigList);
                }
                else
                {
                    objBackPapersDC.ManDocConfig = this.ToDataTable(new Collection<ManDocConfig>());
                }

                objBackPapersDC.SessionId = objBackPapersParams.SessionId;
                objBackPapersDC.SpMode = objBackPapersParams.SpMode;
                objBackPapersDC.RetStatus = objBackPapersParams.RetStatus;
                objBackPapersDC.BPNoGoTxt = objBackPapersParams.BPNoGoTxt;
                try
                {
                    dsdata = objDAL.BackPapers(objBackPapersDC);
                    if (dsdata.Tables.Count > 0)
                    {
                        if (objBackPapersParams.SpMode == 1)
                        {
                            dsdata.Tables[0].TableName = "BackPapers";
                            dsdata.Tables[1].TableName = "ManDocConfig";
                            dsdata.Tables[2].TableName = "Utils";
                            dsdata.Tables[3].TableName = "Checks";
                            strJson = JsonConvert.SerializeObject(dsdata, Newtonsoft.Json.Formatting.None);
                        }

                        if (objBackPapersParams.SpMode == 2)
                        {
                            dsdata.Tables[0].TableName = "RetStatus";
                            strJson = dsdata.Tables[0].Rows[0][0].ToString();
                            strJson = strJson.ToLower();
                        }
                    }
                }
                catch
                {
                    throw;
                }
            }

            return strJson;
        }

        /// <summary>
        /// This method is used to compare the data
        /// </summary>
        /// <param name="objCompareDC">Input parameters</param>
        /// <returns>Returns comparison data</returns>
        public string GetPageComparisionData(CompareDC objCompareDC)
        {
            string strJson = string.Empty;
            DataSet dsdata;
            BGVDAL objDAL = new BGVDAL();
            dsdata = objDAL.GetPageComparisionData(objCompareDC);
            if (dsdata.Tables.Count > 0)
            {
                try
                {
                    dsdata.Tables[0].TableName = "Compare";
                    strJson = JsonConvert.SerializeObject(dsdata, Newtonsoft.Json.Formatting.None);
                }
                catch
                {
                    throw;
                }
            }

            return strJson;
        }

        /// <summary>
        /// Represents to dispose the garbage collection.
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// Represents the method to get the document list information screen.
        /// </summary>
        /// <param name="objDocListInfo">Represents the input data contract of dashboard parameters</param>
        /// <returns>Return the list of data.</returns>
        public string DocListInfo(DocListInfo objDocListInfo)
        {
            string strJson = string.Empty;
            BGVDAL objDAL = new BGVDAL();

            DataSet docListData = objDAL.DocListInfo(objDocListInfo);
            try
            {
                if (objDocListInfo != null)
                {
                    if (docListData != null)
                    {
                        if (docListData.Tables.Count > 0 && objDocListInfo.SpMode == 0)
                        {
                            docListData.Tables[0].TableName = "DocList";
                            docListData.Tables[1].TableName = "Utilities";
                        }

                        if (docListData.Tables.Count > 0 && objDocListInfo.SpMode == 1)
                        {
                            docListData.Tables[0].TableName = "RetStatus";
                        }

                        if (docListData.Tables.Count > 0 && objDocListInfo.SpMode == 2)
                        {
                            docListData.Tables[0].TableName = "DocList";
                            docListData.Tables[1].TableName = "Utilities";
                        }

                        if (docListData.Tables.Count > 0 && objDocListInfo.SpMode == 3)
                        {
                            docListData.Tables[0].TableName = "Utilities";
                        }
                    }
                }
            }
            catch
            {
                throw;
            }
            finally
            {
                strJson = JsonConvert.SerializeObject(docListData, Newtonsoft.Json.Formatting.None);
            }

            return strJson;
        }

        /// <summary>
        /// Get the vendor dashboard prams data.
        /// </summary>
        /// <param name="objvendorDashboardParams">The Vendor Dashboard Prams data contract.</param>
        /// <returns>Return stored procedure output in dataset.</returns>
        public string FetchVendorDashboardData(VendorDashboardParams objvendorDashboardParams)
        {
            string jsonData = string.Empty;
            DataSet dsdashboardData;
            BGVDAL objDAL = new BGVDAL();
            try
            {
                if (objvendorDashboardParams != null)
                {
                    dsdashboardData = objDAL.FetchVendorDashboardData(objvendorDashboardParams);
                    if (dsdashboardData.Tables.Count > 0 && objvendorDashboardParams.SpMode == 0)
                    {
                        dsdashboardData.Tables[0].TableName = "LeftPanel";
                        dsdashboardData.Tables[1].TableName = "RightPanel";
                        dsdashboardData.Tables[2].TableName = "AdSearch";
                        dsdashboardData.Tables[3].TableName = "CanStatus";
                    }

                    if (dsdashboardData.Tables.Count > 0 && (objvendorDashboardParams.SpMode == 1 || objvendorDashboardParams.SpMode == 2))
                    {
                        dsdashboardData.Tables[0].TableName = "RightPanel";
                    }

                    jsonData = JsonConvert.SerializeObject(dsdashboardData, Newtonsoft.Json.Formatting.Indented);
                }
            }
            catch
            {
                throw;
            }

            return jsonData;
        }

        /// <summary>
        /// Represents the method to fetch the candidate data to assign vendor.
        /// </summary>
        /// <param name="objAssignVendorData">Represents the input data contract.</param>
        /// <returns>Return the list of data.</returns>
        public string GetAssignVendorCandidateData(CandidateBGVData objAssignVendorData)
        {
            string jsonData = string.Empty;
            DataSet dsdashboardData;
            BGVDAL objDAL = new BGVDAL();

            try
            {
                if (objAssignVendorData != null)
                {
                    dsdashboardData = objDAL.GetAssignVendorCandidateData(objAssignVendorData);
                    dsdashboardData.DataSetName = "AssignVendorDetail";
                    if (dsdashboardData.Tables.Count > 0 && objAssignVendorData.SpMode == 1)
                    {
                        dsdashboardData.Tables[0].TableName = "CandidateDetail";
                        dsdashboardData.Tables[1].TableName = "ComponentDetail";
                        dsdashboardData.Tables[2].TableName = "DocumentDetail";
                        jsonData = JsonConvert.SerializeObject(dsdashboardData, Newtonsoft.Json.Formatting.Indented);
                    }

                    if (dsdashboardData.Tables.Count > 0 && objAssignVendorData.SpMode == 2)
                    {
                        dsdashboardData.Tables[0].TableName = "ComponentDetail";
                        dsdashboardData.Tables[1].TableName = "DocumentDetail";
                        jsonData = JsonConvert.SerializeObject(dsdashboardData, Newtonsoft.Json.Formatting.Indented);
                    }

                    if (dsdashboardData.Tables.Count > 0 && objAssignVendorData.SpMode == 3)
                    {
                        jsonData = dsdashboardData.Tables[0].Rows[0][0].ToString();
                    }
                }
            }
            catch
            {
                throw;
            }

            return jsonData;
        }

        /// <summary>
        /// Represents the method to fetch components to assign vendor
        /// </summary>
        /// <param name="objAssignVendorData">Represents the input data contract.</param>
        /// <returns>Return the list of data.</returns>
        public string GetAssignVendorComponents(CandidateBGVData objAssignVendorData)
        {
            string jsonData = string.Empty;
            DataSet dsdashboardData;
            BGVDAL objDAL = new BGVDAL();

            try
            {
                dsdashboardData = objDAL.GetAssignVendorComponents(objAssignVendorData);
                dsdashboardData.DataSetName = "AssignVendorDetail";
                if (dsdashboardData.Tables.Count > 0)
                {
                    dsdashboardData.Tables[0].TableName = "ComponentList";
                }

                jsonData = JsonConvert.SerializeObject(dsdashboardData, Newtonsoft.Json.Formatting.Indented);
            }
            catch
            {
                throw;
            }

            return jsonData;
        }

        /// <summary>
        /// Represents the method to get education and experience information data.
        /// </summary>
        /// <param name="objComponentData">Represents the input data contract.</param>
        /// <returns>Return the list of data.</returns>
        public string GetComponentData(ComponentData objComponentData)
        {
            string strJson = string.Empty;
            DataSet componentData = (new BGVDAL()).GetComponentData(objComponentData);
            SaveComponent objSaveComponent = new SaveComponent();
            try
            {
                if (objComponentData != null)
                {
                    if (componentData.Tables.Count > 0 && objComponentData.SpMode == 1)
                    {
                        DataTable dtcomponentList = new DataTable();
                        dtcomponentList.Dispose();
                        dtcomponentList = this.CreateEmptyDataTable(objSaveComponent.CompDetail);

                        dtcomponentList.TableName = "CompList";
                        componentData.Tables[0].TableName = "Utilities";
                        componentData.Tables[1].TableName = "CompDetail";
                        if (objComponentData.RoleGroupId == 2)
                        {
                            componentData.Tables[2].TableName = "ComponentList";
                        }

                        componentData.Tables.Add(dtcomponentList.Copy());
                    }

                    if (componentData.Tables.Count > 0 && objComponentData.SpMode == 2)
                    {
                        componentData.Tables[0].TableName = "DocList";
                    }
                }
            }
            catch
            {
                throw;
            }
            finally
            {
                strJson = JsonConvert.SerializeObject(componentData, Newtonsoft.Json.Formatting.None);
            }

            return strJson;
        }

        /// <summary>
        /// Represents the method to get the page list based on role.
        /// </summary>
        /// <param name="objPageNavigationDC">Represents the input data contract.</param>
        /// <returns>Return the list of data.</returns>
        public string GetPagePathForRole(PageNavigationDC objPageNavigationDC)
        {
            string strJson = string.Empty;
            DataSet personalData = (new BGVDAL()).GetPagePathForRole(objPageNavigationDC);
            try
            {
                if (personalData.Tables.Count > 0)
                {
                    personalData.Tables[0].TableName = "Tabs";
                }
            }
            catch
            {
                throw;
            }
            finally
            {
                strJson = JsonConvert.SerializeObject(personalData, Newtonsoft.Json.Formatting.None);
            }

            return strJson;
        }

        /// <summary>
        /// Represents the method to get the candidate information.
        /// </summary>
        /// <param name="objCandidateInformationDC">Represents the input data contract of candidate information</param>
        /// <returns>Return the list of data.</returns>
        public string GetPersonalData(CandidateInformationDC objCandidateInformationDC)
        {
            string strJson = string.Empty;
            DataSet personalData = (new BGVDAL()).GetPersonalData(objCandidateInformationDC);
            try
            {
                if (personalData.Tables.Count > 0)
                {
                    personalData.Tables[0].TableName = "ComponentsList";
                    personalData.Tables[1].TableName = "Utilities";
                }
            }
            catch
            {
                throw;
            }
            finally
            {
                strJson = JsonConvert.SerializeObject(personalData, Newtonsoft.Json.Formatting.None);
            }

            return strJson;
        }

        /// <summary>
        /// Represents the method to get the vendor candidate information.
        /// </summary>
        /// <param name="objVendorCandidateInfo">Represents the input data contract of vendor candidate information</param>
        /// <returns>Return the list of data.</returns>
        public string GetVendorCandidateData(VendorCandidateInfo objVendorCandidateInfo)
        {
            string strJson = string.Empty;
            DataSet ds;
            BGVDAL objDAL = new BGVDAL();
            ds = objDAL.GetVendorCandidateData(objVendorCandidateInfo);
            if (ds.Tables.Count > 0)
            {
                ds.Tables[0].TableName = "BasicInfo";
                ds.Tables[1].TableName = "EduInfo";
                ds.Tables[2].TableName = "ExpInfo";
            }

            strJson = JsonConvert.SerializeObject(ds, Newtonsoft.Json.Formatting.None);
            return strJson;
        }

        /// <summary>
        /// Represents the method to get the vendor document list information.
        /// </summary>
        /// <param name="objVendorDashboardParams">Represents the input data contract of vendor dashboard parameters</param>
        /// <returns>Return the list of data.</returns>
        public string GetVendorDocListInfo(VendorDashboardParams objVendorDashboardParams)
        {
            string strJson = string.Empty;
            DataSet ds;
            BGVDAL objDAL = new BGVDAL();
            ds = objDAL.GetVendorDocListInfo(objVendorDashboardParams);
            if (ds.Tables.Count > 0)
            {
                ds.Tables[0].TableName = "CompList";
                ds.Tables[1].TableName = "CompListData";
                ds.Tables[2].TableName = "DocSub";
                ds.Tables[3].TableName = "Utilities";
                ds.Tables[4].TableName = "CommentsCheck";
            }

            strJson = JsonConvert.SerializeObject(ds, Newtonsoft.Json.Formatting.None);
            return strJson;
        }

        /// <summary>
        /// Represents the method to save the assigned vendor candidate data.
        /// </summary>
        /// <param name="objAssignVendorData">Represents the input data contract of assigned vendor data.</param>
        /// <returns>Return the list of data.</returns>
        public string SaveAssignVendorCandidateData(CandidateBGVData objAssignVendorData)
        {
            string saveStatus = string.Empty;
            DataSet dsdashboardData;
            AssignVendorData objAVData = new AssignVendorData();
            BGVDAL objDAL = new BGVDAL();
            if (objAssignVendorData != null)
            {
                objAVData.CandidateId = objAssignVendorData.CandidateId;
                objAVData.SessionId = objAssignVendorData.SessionId;
                objAVData.IsActive = objAssignVendorData.IsActive;
                objAVData.AssignVendorVerificationDetail = this.ToDataTable(objAssignVendorData.AssignVendorBoxList);
                objAVData.AssignVendorComponentDetail = this.ToDataTable(objAssignVendorData.AssignVendorComponentList);
                objAVData.AssignVendorDocumentDetail = this.ToDataTable(objAssignVendorData.AssignVendorDocList);
                dsdashboardData = objDAL.SaveAssignVendorCandidateData(objAVData);
                saveStatus = dsdashboardData.Tables[0].Rows[0][0].ToString();
            }

            return saveStatus;
        }

        /// <summary>
        /// Represents the method to save the qualifications screen transactions.
        /// </summary>
        /// <param name="objSaveComponentData">Returns the input data contract.</param>
        /// <returns>Return the list of data.</returns>
        public int SaveComponentData(SaveComponent objSaveComponentData)
        {
            int retStatus = 0;
            SaveComponentParam objSaveComponentParam = new SaveComponentParam();
            if (objSaveComponentData != null)
            {
                objSaveComponentParam.Sessionid = objSaveComponentData.Sessionid;
                objSaveComponentParam.CandidateId = objSaveComponentData.CandidateId;
                objSaveComponentParam.RoleGroupId = objSaveComponentData.RoleGroupId;
                objSaveComponentParam.SpMode = objSaveComponentData.SpMode;
                objSaveComponentParam.DocDetail = this.ToDataTable(objSaveComponentData.DocDetail);
                objSaveComponentParam.CompDetail = this.ToDataTable(objSaveComponentData.CompDetail);
                objSaveComponentParam.TotalExp = objSaveComponentData.TotalExp;
            }

            DataSet componentData = (new BGVDAL()).SaveComponentData(objSaveComponentParam);
            try
            {
                if (componentData.Tables.Count > 0)
                {
                    retStatus = int.Parse(componentData.Tables[0].Rows[0][0].ToString());
                }
            }
            catch
            {
                throw;
            }

            return retStatus;
        }

        /// <summary>
        /// Represents the method to save the qualifications screen transactions.
        /// </summary>
        /// <param name="objSaveComponentData">Returns the input data contract.</param>
        /// <returns>Return the list of data.</returns>
        public int SaveVerificationData(SaveComponent objSaveComponentData)
        {
            int retStatus = 0;

            DataSet componentData = (new BGVDAL()).SaveVerificationData(objSaveComponentData);
            try
            {
                if (componentData.Tables.Count > 0)
                {
                    retStatus = int.Parse(componentData.Tables[0].Rows[0][0].ToString());
                }
            }
            catch
            {
                throw;
            }

            return retStatus;
        }

        /// <summary>
        /// Represents the method to save the candidate information data.
        /// </summary>
        /// <param name="objCandidateInformationDC">Returns the input data contract.</param>
        /// <returns>Return the list of data.</returns>
        public int SavePersonalData(CandidateInformationDC objCandidateInformationDC)
        {
            int retStatus = 0;
            ////retStatus = objSavePersonaDataDAL.SavePersonalData(objCandidateInformationDC);
            ////return retStatus;
            DataSet personalData = (new BGVDAL()).SavePersonalData(objCandidateInformationDC);
            try
            {
                if (personalData.Tables.Count > 0)
                {
                    retStatus = int.Parse(personalData.Tables[0].Rows[0][0].ToString());
                }
            }
            catch
            {
                throw;
            }

            return retStatus;
        }

        /// <summary>
        /// Represents the method to save the vendor document list data.
        /// </summary>
        /// <param name="objVendorDocListInfoParams">Returns the input data contract.</param>
        /// <returns>Return the list of data.</returns>
        public string SaveVendorDocListInfo(VendorDocListInfoParams objVendorDocListInfoParams)
        {
            string strJson = string.Empty;
            DataSet vendorData = new DataSet();
            vendorData.Dispose();
            BGVDAL objDAL = new BGVDAL();
            if (objVendorDocListInfoParams != null)
            {
                if (objVendorDocListInfoParams.DocList != null && objVendorDocListInfoParams.DocList.Count > 0)
                {
                    VendorDocListInfoParams objVendorDocListInfoParam = new VendorDocListInfoParams();
                    objVendorDocListInfoParam.SessionId = objVendorDocListInfoParams.SessionId;
                    objVendorDocListInfoParam.CandidateId = objVendorDocListInfoParams.CandidateId;
                    objVendorDocListInfoParam.FinalSubStatus = objVendorDocListInfoParams.FinalSubStatus;
                    objVendorDocListInfoParam.FinalStatus = objVendorDocListInfoParams.FinalStatus;
                    objVendorDocListInfoParam.SpMode = objVendorDocListInfoParams.SpMode;
                    if (objVendorDocListInfoParam.SpMode == 0)
                    {
                        foreach (DocListItems list in objVendorDocListInfoParams.DocList)
                        {
                            objVendorDocListInfoParam.Action = list.Action;
                            objVendorDocListInfoParam.Status = list.Status;
                            objVendorDocListInfoParam.SubStatus = list.SubStatus;
                            list.DocId = list.DocId.Replace("ID", string.Empty);
                            objVendorDocListInfoParam.CandidateBgvAssignComponentDetail = int.Parse(list.DocId.Split('_')[0]);
                            objVendorDocListInfoParam.CandidateBgvConComponentDetail = int.Parse(list.DocId.Split('_')[1]);
                            objVendorDocListInfoParam.CandidateBgvVendorMapping = int.Parse(list.DocId.Split('_')[2]);
                            vendorData = objDAL.SaveVendorDocListInfo(objVendorDocListInfoParam);
                        }
                    }
                    else
                    {
                        vendorData = objDAL.SaveVendorDocListInfo(objVendorDocListInfoParam);
                    }
                }
                else
                {
                    vendorData = objDAL.SaveVendorDocListInfo(objVendorDocListInfoParams);
                }
            }

            if (vendorData.Tables.Count > 0)
            {
                vendorData.Tables[0].TableName = "Status";
            }

            strJson = JsonConvert.SerializeObject(vendorData, Newtonsoft.Json.Formatting.None);
            return strJson;
        }

        /// <summary>
        /// Represents the method to validate the candidate component information data.
        /// </summary>
        /// <param name="objValidation">Returns the input data contract.</param>
        /// <returns>Return the list of data.</returns>
        public Validation ValidateComponentData(Validation objValidation)
        {
            Collection<string> msgList = new Collection<string>();
            ValidateComponentData validate = new ValidateComponentData();
            if (objValidation != null)
            {
                validate.CompDetail = this.ToDataTable(objValidation.CompDetail);
                validate.Sessionid = objValidation.Sessionid;
                validate.CandidateId = objValidation.CandidateId;
                validate.TotalExp = objValidation.TotalExp;
                validate.RoleGroupId = objValidation.RoleGroupId;
                DataSet componentData = (new BGVDAL()).ValidateComponentData(validate);
                if (componentData.Tables.Count > 0)
                {
                    if (bool.Parse(componentData.Tables[0].Rows[0][0].ToString()))
                    {
                        foreach (DataRow s in componentData.Tables[1].Rows)
                        {
                            msgList.Add(s[0].ToString());
                        }

                        objValidation.ReturnMessage = msgList;
                    }
                }
            }

            return objValidation;
        }

        /// <summary>
        /// Represents the method to validate the candidate personal information data.
        /// </summary>
        /// <param name="objValidation">Returns the input data contract.</param>
        /// <returns>Return the list of data.</returns>
        public ValidatePersonalData ValidatePersonalInfo(ValidatePersonalData objValidation)
        {
            Collection<string> msgList = new Collection<string>();
            ValidatePersonalData validate = new ValidatePersonalData();
            if (objValidation != null)
            {
                validate.BasicInformationAccountName = objValidation.BasicInformationAccountName;
                validate.BasicInformationBU = objValidation.BasicInformationBU;
                validate.BasicInformationCandidateID = objValidation.CandidateId.ToString();
                validate.BasicInformationCasePriority = objValidation.BasicInformationCasePriority;
                validate.BasicInformationDesignation = objValidation.BasicInformationDesignation;
                validate.BasicInformationEmailId = objValidation.BasicInformationEmailId;
                validate.BasicInformationExpectedDateofJoining = objValidation.BasicInformationExpectedDateofJoining;
                validate.BasicInformationFirstName = objValidation.BasicInformationFirstName;
                validate.BasicInformationHomePhone = objValidation.BasicInformationHomePhone;
                validate.BasicInformationJoiningLocation = objValidation.BasicInformationJoiningLocation;
                validate.BasicInformationLastName = objValidation.BasicInformationLastName;
                validate.BasicInformationMiddleName = objValidation.BasicInformationMiddleName;
                validate.BasicInformationMobile = objValidation.BasicInformationMobile;
                validate.BasicInformationOfferExtendedDate = objValidation.BasicInformationOfferExtendedDate;
                validate.BasicInformationOfferLocation = objValidation.BasicInformationOfferLocation;
                validate.BasicInformationOwningDepartment = objValidation.BasicInformationOwningDepartment;
                validate.BasicInformationTypeOfJoiner = objValidation.BasicInformationTypeOfJoiner;
                validate.CurrentAddressAddress = objValidation.CurrentAddressAddress;
                validate.CurrentAddressCity = objValidation.CurrentAddressCity;
                validate.CurrentAddressCountry = objValidation.CurrentAddressCountry;
                validate.CurrentAddressDurationofstayFrom = objValidation.CurrentAddressDurationofstayFrom;
                validate.CurrentAddressDurationofstayTo = objValidation.CurrentAddressDurationofstayTo;
                validate.CurrentAddressPinCode = objValidation.CurrentAddressPinCode;
                validate.CurrentAddressState = objValidation.CurrentAddressState;
                validate.PermanentAddressAddress = objValidation.PermanentAddressAddress;
                validate.PermanentAddressCity = objValidation.PermanentAddressCity;
                validate.PermanentAddressCountry = objValidation.PermanentAddressCountry;
                validate.PermanentAddressDurationofstayFrom = objValidation.PermanentAddressDurationofstayFrom;
                validate.PermanentAddressDurationofstayTo = objValidation.PermanentAddressDurationofstayTo;
                validate.PermanentAddressPinCode = objValidation.PermanentAddressPinCode;
                validate.PermanentAddressState = objValidation.PermanentAddressState;
                validate.LongestStayAddressAddress = objValidation.LongestStayAddressAddress;
                validate.LongestStayAddressCity = objValidation.LongestStayAddressCity;
                validate.LongestStayAddressCountry = objValidation.LongestStayAddressCountry;
                validate.LongestStayAddressDurationofstayFrom = objValidation.LongestStayAddressDurationofstayFrom;
                validate.LongestStayAddressDurationofstayTo = objValidation.LongestStayAddressDurationofstayTo;
                validate.LongestStayAddressPinCode = objValidation.LongestStayAddressPinCode;
                validate.LongestStayAddressState = objValidation.LongestStayAddressState;
                validate.BasicInformationComponentDetailId = objValidation.BasicInformationComponentDetailId;
                validate.RoleGroupId = objValidation.RoleGroupId;
                validate.Mode = objValidation.Mode;
                validate.CandidateId = objValidation.CandidateId;
                validate.BasicInformationFatherName = objValidation.BasicInformationFatherName;
                validate.BasicInformationDOB = objValidation.BasicInformationDOB;
                validate.PR1Name = objValidation.PR1Name;
                validate.PR1Designation = objValidation.PR1Designation;
                validate.PR1Company = objValidation.PR1Company;
                validate.PR1Landline = objValidation.PR1Landline;
                validate.PR1Mobile = objValidation.PR1Mobile;
                validate.PR1Email = objValidation.PR1Email;
                validate.PR1Address = objValidation.PR1Address;
                validate.PR2Name = objValidation.PR2Name;
                validate.PR2Designation = objValidation.PR2Designation;
                validate.PR2Company = objValidation.PR2Company;
                validate.PR2Landline = objValidation.PR2Landline;
                validate.PR2Mobile = objValidation.PR2Mobile;
                validate.PR2Email = objValidation.PR2Email;
                validate.PR2Address = objValidation.PR2Address;

                DataSet componentData = (new BGVDAL()).ValidatePersonalInfo(validate);
                if (componentData.Tables.Count > 0)
                {
                    if (bool.Parse(componentData.Tables[0].Rows[0][0].ToString()))
                    {
                        foreach (DataRow s in componentData.Tables[1].Rows)
                        {
                            msgList.Add(s[0].ToString());
                        }

                        objValidation.ReturnMessage = msgList;
                    }
                }
            }

            return objValidation;
        }

        /// <summary>
        /// Represents the method to get the page notifications based on candidate.
        /// </summary>
        /// <param name="objPageNotifications">Represents the input data contract.</param>
        /// <returns>Returns the list of page notifications</returns>
        public Collection<string> GetPageNotifications(PageNotifications objPageNotifications)
        {
            Collection<string> listData = null;
            try
            {
                DataSet dataSet = (new BGVDAL()).GetPageNotifications(objPageNotifications);
                if (dataSet.Tables.Count > 0)
                {
                    listData = new Collection<string>(dataSet.Tables[0].AsEnumerable().Select(x => x[0].ToString()).ToList());
                }
            }
            catch
            {
                throw;
            }

            return listData;
        }

        /////// <summary>
        /////// This method is used to convert data table to XML.
        /////// </summary>
        /////// <param name="dt">Data table</param>
        /////// <param name="tableName">Table Name</param>
        /////// <returns>Returns the XML output.</returns>
        ////private string ConvertDataTableToXML(DataTable dt, string tableName)
        ////{
        ////    string xmlString = string.Empty;
        ////    using (TextWriter writer = new StringWriter())
        ////    {
        ////        dt.TableName = tableName;
        ////        dt.WriteXml(writer);
        ////        xmlString = writer.ToString();
        ////    }

        ////    return xmlString;
        ////}

        /// <summary>
        /// This method is used to create empty data table based on the list.
        /// </summary>
        /// <typeparam name="T">A generic type parameter allows you to specify an arbitrary type T to a method at compile-time, without specifying a concrete type in the method or class declaration.</typeparam>
        /// <param name="items">Represents a strongly typed list of objects</param>
        /// <returns>Returns the empty data table based on the list.</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", MessageId = "items", Justification = "Need generic type parameters to create empty data table.")]
        private DataTable CreateEmptyDataTable<T>(Collection<T> items)
        {
            int i = 0;
            using (DataTable dataTable = new DataTable(typeof(T).Name))
            {
                PropertyInfo[] props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
                var values = new object[props.Length];
                foreach (PropertyInfo prop in props)
                {
                    dataTable.Columns.Add(prop.Name);
                    if (prop.PropertyType == typeof(string))
                    {
                        values[i] = string.Empty;
                    }

                    if (prop.PropertyType == typeof(int))
                    {
                        values[i] = 0;
                    }

                    if (prop.PropertyType == typeof(bool))
                    {
                        values[i] = false;
                    }

                    i++;
                }

                dataTable.Rows.Add(values);
                return dataTable;
            }
        }

        /// <summary>
        /// This method is used to convert list to data table.
        /// </summary>
        /// <typeparam name="T">A generic type parameter allows you to specify an arbitrary type T to a method at compile-time, without specifying a concrete type in the method or class declaration.</typeparam>
        /// <param name="items">Represents a strongly typed list of objects</param>
        /// <returns>Returns data table as output.</returns>
        private DataTable ToDataTable<T>(Collection<T> items)
        {
            using (DataTable dataTable = new DataTable(typeof(T).Name))
            {
                PropertyInfo[] props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
                foreach (PropertyInfo prop in props)
                {
                    dataTable.Columns.Add(prop.Name);
                }

                foreach (T item in items)
                {
                    var values = new object[props.Length];
                    for (int i = 0; i < props.Length; i++)
                    {
                        values[i] = props[i].GetValue(item, null);
                    }

                    dataTable.Rows.Add(values);
                }

                return dataTable;
            }
        }

        #endregion Methods
    }
}
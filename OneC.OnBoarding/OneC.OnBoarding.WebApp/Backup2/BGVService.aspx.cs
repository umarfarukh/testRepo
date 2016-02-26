// -----------------------------------------------------------------------
// <copyright file="BGVService.aspx.cs" company="CTS">
//      Company copyright tag.
// </copyright>
// -----------------------------------------------------------------------
namespace OneC.OnBoarding.WebApp
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Web.Services;
    using System.Xml;

    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;

    using OneC.OnBoarding.DC.BGVDC;
    using OneC.OnBoarding.DC.UtilityDC;
    using OneC.OnBoarding.WebApp.Utility;

    using BGVUtils = OneC.OnBoarding.WebApp.Service.BGVUtilityMethods.BGVUtilityMethodsClient;

    /// <summary>
    /// Represent the class for BGV service
    /// </summary>
    public partial class BGVService : System.Web.UI.Page
    {
        #region Methods

        /// <summary>
        /// Represent the method to get auto search data
        /// </summary>
        /// <param name="value">input value</param>
        /// <param name="type">input type</param>
        /// <returns>get value</returns>
        [WebMethod]
        public static ArrayList AutoSearch(string value, int type)
        {
            ArrayList data = new ArrayList();
            int sessionId = int.Parse(((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId.ToString());
            Autocomplete objAutocomplete = new Autocomplete();
            objAutocomplete.ItemName = value.Trim();
            objAutocomplete.TypeGroup = type;
            var con = new BGVUtils();
            try
            {
                con.Open();
                objAutocomplete = con.AutoSearch(objAutocomplete);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
                if (con.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    con.Abort();
                }
                else
                {
                    con.Close();
                }

                con = null;
            }

            foreach (var ls in objAutocomplete.Items)
            {
                data.Add(new { ItemId = ls.ItemId, ItemVal = ls.ItemVal, SChk = ls.SChk });
            }

            return data;
        }

        /// <summary>
        /// Represent the method to get back papers
        /// </summary>
        /// <param name="candidateId">candidate ID</param>
        /// <param name="mode">method mode</param>
        /// <param name="docList">document list</param>
        /// <param name="noGoTxt">no go text</param>
        /// <returns>get back papers</returns>
        [WebMethod]
        public static string BackPapers(int candidateId, int mode, string docList, string noGoTxt)
        {
            string strJson = string.Empty;
            try
            {
                int sessionId = int.Parse(((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId.ToString());
                BackPapersParams objBackpapers = new BackPapersParams();

                objBackpapers = JsonConvert.DeserializeObject<BackPapersParams>(docList);

                objBackpapers.SessionId = sessionId;
                objBackpapers.CandidateId = candidateId;
                objBackpapers.SpMode = mode;
                objBackpapers.BPNoGoTxt = noGoTxt;
                var con = new BGVUtils();
                try
                {
                    con.Open();
                    strJson = con.BackPapers(objBackpapers);
                }
                catch (Exception ex)
                {
                    (new ErrorLogger(sessionId)).LogError(ex);
                }
                finally
                {
                    if (con.State == System.ServiceModel.CommunicationState.Faulted)
                    {
                        con.Abort();
                    }
                    else
                    {
                        con.Close();
                    }

                    con = null;
                }
            }
            catch (Exception ex)
            {
                (new ErrorLogger()).LogError(ex);
            }

            return strJson;
        }

        /// <summary>
        /// Represent the method to get document list
        /// </summary>
        /// <param name="candidateId">candidate ID</param>
        /// <param name="mode">method mode</param>
        /// <param name="uploadId">UP Id</param>
        /// <param name="uploadRunnerId">UP RunnerId</param>
        /// <returns>get document list</returns>
        [WebMethod]
        public static string DocListInfo(int candidateId, int mode, string uploadId, int uploadRunnerId)
        {
            string strJson = string.Empty;
            DocListInfo objDocListInfo = new DocListInfo();
            objDocListInfo.Sessionid = int.Parse(((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId.ToString());
            objDocListInfo.RoleGroupId = int.Parse((new SessionHelper()).GetSessionValue("rgid").ToString());
            objDocListInfo.SpMode = mode;
            objDocListInfo.CandidateId = int.Parse(candidateId.ToString());
            objDocListInfo.UpId = uploadId;
            objDocListInfo.UpRunnerId = uploadRunnerId;
            var con = new BGVUtils();
            try
            {
                con.Open();
                strJson = con.DocListInfo(objDocListInfo);
            }
            catch
            {
            }
            finally
            {
                if (con.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    con.Abort();
                }
                else
                {
                    con.Close();
                }

                con = null;
            }

            return strJson;
        }

        /// <summary>
        /// Represent the method to fetch drill down data
        /// </summary>
        /// <param name="strData">string data</param>
        /// <param name="mode">method mode</param>
        /// <returns>fetch candidate details</returns>
        [WebMethod]
        public static string FetchDrillDownData(string strData, int mode)
        {
            string strJson = string.Empty;
            try
            {
                var con = new BGVUtils();
                long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
                VendorDashboardParams objVendorDashboardParams = new VendorDashboardParams();
                if (mode == 0)
                {
                    objVendorDashboardParams.CategoryId = int.Parse(strData.Split('_')[0].ToString());
                    objVendorDashboardParams.CanStatus = int.Parse(strData.Split('_')[1].ToString());
                    objVendorDashboardParams.SpMode = 1;
                }

                if (mode == 1)
                {
                    XmlDocument xml = (XmlDocument)JsonConvert.DeserializeXmlNode(strData);
                    objVendorDashboardParams = JsonConvert.DeserializeObject<VendorDashboardParams>(JsonConvert.SerializeXmlNode(xml, Newtonsoft.Json.Formatting.None, true).ToString());
                    xml = null;
                    objVendorDashboardParams.SpMode = 2;
                }

                objVendorDashboardParams.SessionId = sessionId;

                try
                {
                    con.Open();
                    strJson = con.FetchVendorDashboardData(objVendorDashboardParams);
                }
                catch (Exception ex)
                {
                    (new ErrorLogger(sessionId)).LogError(ex);
                }
                finally
                {
                    if (con.State == System.ServiceModel.CommunicationState.Faulted)
                    {
                        con.Abort();
                    }
                    else
                    {
                        con.Close();
                    }

                    con = null;
                }
            }
            catch (Exception ex)
            {
                (new ErrorLogger()).LogError(ex);
            }

            return strJson;
        }

        /// <summary>
        /// Represent the method to fetch vendor data
        /// </summary>
        /// <returns>fetch candidate list</returns>
        [WebMethod]
        public static string FetchVendorDashboardData()
        {
            string jsonData = string.Empty;
            try
            {
                long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
                VendorDashboardParams objVendorDashboardParams = new VendorDashboardParams();
                VendorDashboardData objVendorDashboardData = new VendorDashboardData();
                objVendorDashboardParams.SessionId = sessionId;
                objVendorDashboardParams.SpMode = 0;
                var con = new BGVUtils();
                try
                {
                    con.Open();
                    jsonData = con.FetchVendorDashboardData(objVendorDashboardParams);
                }
                catch (Exception ex)
                {
                    (new ErrorLogger(sessionId)).LogError(ex);
                }
                finally
                {
                    if (con.State == System.ServiceModel.CommunicationState.Faulted)
                    {
                        con.Abort();
                    }
                    else
                    {
                        con.Close();
                    }

                    con = null;
                }
            }
            catch (Exception ex)
            {
                (new ErrorLogger()).LogError(ex);
            }

            return jsonData;
        }

        /// <summary>
        /// Method to fetch the candidate data to assign vendor
        /// </summary>
        /// <param name="candidateId">candidate ID</param>
        /// <param name="componentCode">comp code</param>
        /// <param name="componentDetailId">comp detail ID</param>
        /// <param name="componentRunnerId">comp runner ID</param>
        /// <param name="mode">SP mode</param>
        /// <returns>assign vendor data</returns>
        [WebMethod]
        public static string GetAssignVendorCandidateData(long candidateId, string componentCode, int componentDetailId, int componentRunnerId, int mode)
        {
            string jsonData = string.Empty;
            try
            {
                long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
                CandidateBGVData objAssignVendorData = new CandidateBGVData();
                objAssignVendorData.SessionId = sessionId;
                objAssignVendorData.CandidateId = candidateId;
                objAssignVendorData.SpMode = mode;
                if (mode == 2)
                {
                    objAssignVendorData.ComponentCode = componentCode;
                    objAssignVendorData.ComponentDetailId = componentDetailId;
                    objAssignVendorData.ComponentRunnerId = componentRunnerId;
                }

                var con = new BGVUtils();
                try
                {
                    con.Open();
                    jsonData = con.GetAssignVendorCandidateData(objAssignVendorData);
                }
                catch (Exception ex)
                {
                    (new ErrorLogger(sessionId)).LogError(ex);
                }
                finally
                {
                    if (con.State == System.ServiceModel.CommunicationState.Faulted)
                    {
                        con.Abort();
                    }
                    else
                    {
                        con.Close();
                    }

                    con = null;
                }
            }
            catch (Exception ex)
            {
                (new ErrorLogger()).LogError(ex);
            }

            return jsonData;
        }

        /// <summary>
        /// Method to fetch components to assign vendor
        /// </summary>
        /// <param name="candidateId">candidate ID</param>
        /// <returns>assign vendor components</returns>
        [WebMethod]
        public static string GetAssignVendorComponents(long candidateId)
        {
            string jsonData = string.Empty;
            try
            {
                long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
                CandidateBGVData objAssignVendorData = new CandidateBGVData();

                objAssignVendorData.SessionId = sessionId;
                objAssignVendorData.CandidateId = candidateId;

                var con = new BGVUtils();
                try
                {
                    con.Open();
                    jsonData = con.GetAssignVendorComponents(objAssignVendorData);
                }
                catch (Exception ex)
                {
                    (new ErrorLogger(sessionId)).LogError(ex);
                }
                finally
                {
                    if (con.State == System.ServiceModel.CommunicationState.Faulted)
                    {
                        con.Abort();
                    }
                    else
                    {
                        con.Close();
                    }

                    con = null;
                }
            }
            catch (Exception ex)
            {
                (new ErrorLogger()).LogError(ex);
            }

            return jsonData;
        }

        /// <summary>
        /// Represent the method to get component data
        /// </summary>
        /// <param name="candidateId">candidate ID</param>
        /// <param name="mode">method mode</param>
        /// <param name="code">component code</param>
        /// <param name="comRunnerId">Runner Id</param>
        /// <returns>get Component Data</returns>
        [WebMethod]
        public static string GetComponentData(int candidateId, int mode, string code, int comRunnerId)
        {
            string strJson = string.Empty;
            int sessionId = int.Parse(((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId.ToString());
            ComponentData objComponentData = new ComponentData();
            objComponentData.CandidateId = candidateId;
            objComponentData.SessionId = sessionId;
            objComponentData.RoleGroupId = int.Parse((new SessionHelper()).GetSessionValue("rgid").ToString());
            objComponentData.SpMode = mode;
            objComponentData.ComponentCode = code;
            objComponentData.ComponentRunnerId = comRunnerId;
            var con = new BGVUtils();
            try
            {
                con.Open();
                strJson = con.ComponentData(objComponentData);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
                if (con.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    con.Abort();
                }
                else
                {
                    con.Close();
                }

                con = null;
            }

            return strJson;
        }

        /// <summary>
        /// Represents the method to get the page notifications based on candidate.
        /// </summary>
        /// <param name="candidateId">Candidate ID</param>
        /// <param name="bgvpageId">BGV page Id will be available in Java Script page</param>
        /// <returns>Returns the list of notifications.</returns>
        [WebMethod]
        public static string[] GetPageNotifications(int candidateId, int bgvpageId)
        {
            string[] arr = new string[] { };
            int sessionId = int.Parse(((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId.ToString());
            PageNotifications objPageNotifications = new PageNotifications();
            objPageNotifications.CandidateId = candidateId;
            objPageNotifications.Sessionid = sessionId;
            objPageNotifications.RoleGroupId = int.Parse((new SessionHelper()).GetSessionValue("rgid").ToString());
            objPageNotifications.BgvPageId = bgvpageId;
            var con = new BGVUtils();
            try
            {
                con.Open();
                arr = con.GetPageNotifications(objPageNotifications);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
                if (con.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    con.Abort();
                }
                else
                {
                    con.Close();
                }

                con = null;
            }

            return arr;
        }

        /// <summary>
        /// Represent the method to get page URL data
        /// </summary>
        /// <param name="candidateId">candidate Id</param>
        /// <returns>get URL</returns>
        [WebMethod]
        public static string GetPageUrlForRole(int candidateId)
        {
            string strJson = string.Empty;
            try
            {
                int sessionId = int.Parse(((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId.ToString());
                PageNavigationDC objPageNavigationDC = new PageNavigationDC();
                objPageNavigationDC.CandidateId = candidateId;
                objPageNavigationDC.SessionId = sessionId;
                objPageNavigationDC.RoleGroupId = int.Parse((new SessionHelper()).GetSessionValue("rgid").ToString());
                var con = new BGVUtils();
                try
                {
                    con.Open();
                    strJson = con.GetPagePathForRole(objPageNavigationDC);
                }
                catch (Exception ex)
                {
                    (new ErrorLogger(sessionId)).LogError(ex);
                }
                finally
                {
                    if (con.State == System.ServiceModel.CommunicationState.Faulted)
                    {
                        con.Abort();
                    }
                    else
                    {
                        con.Close();
                    }

                    con = null;
                }
            }
            catch (Exception ex)
            {
                (new ErrorLogger()).LogError(ex);
            }

            return strJson;
        }

        /// <summary>
        /// Represent the method to get personal data
        /// </summary>
        /// <param name="candidateId">candidate Id</param>
        /// <returns>get Candidate personal Data</returns>
        [WebMethod]
        public static string GetPersonalData(int candidateId)
        {
            string strJson = string.Empty;
            int sessionId = int.Parse(((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId.ToString());
            CandidateInformationDC objPersonalData = new CandidateInformationDC();
            objPersonalData.Sessionid = sessionId;
            objPersonalData.CandidateId = candidateId;
            objPersonalData.RoleGroupId = int.Parse((new SessionHelper()).GetSessionValue("rgid").ToString());
            var con = new BGVUtils();
            try
            {
                con.Open();
                strJson = con.PersonalData(objPersonalData);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
                if (con.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    con.Abort();
                }
                else
                {
                    con.Close();
                }

                con = null;
            }

            return strJson;
        }

        /// <summary>
        /// Represent the method to get session data
        /// </summary>
        /// <param name="data">session data</param>
        /// <returns>get session data</returns>
        public static string GetSessionData(string data)
        {
            SessionDetails objSessionDeatils = new SessionDetails();

            return data;
        }

        /// <summary>
        /// Represent the method to fetch vendor candidate data
        /// </summary>
        /// <param name="candidateId">candidate Id</param>
        /// <returns>get candidate detail</returns>
        [WebMethod]
        public static string GetVendorCandidateData(string candidateId)
        {
            string strJSON = string.Empty;
            VendorCandidateInfo objVendorCandidateInfo = new VendorCandidateInfo();
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            objVendorCandidateInfo.SessionId = sessionId;
            objVendorCandidateInfo.CandidateId = long.Parse(candidateId);
            objVendorCandidateInfo.SpMode = 0;
            var con = new BGVUtils();
            try
            {
                con.Open();
                strJSON = con.GetVendorCandidateData(objVendorCandidateInfo);
                con.Close();
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
                if (con.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    con.Abort();
                }
                else
                {
                    con.Close();
                }

                con = null;
            }

            return strJSON;
        }

        /// <summary>
        /// Represent the method to fetch vendor document list data
        /// </summary>
        /// <param name="candidateId">candidate Id</param>
        /// <returns>candidate document detail</returns>
        [WebMethod]
        public static string GetVendorDocListData(string candidateId)
        {
            string strJSON = string.Empty;

            VendorDashboardParams objVendorDashboardParams = new VendorDashboardParams();
            long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
            objVendorDashboardParams.CandidateId = long.Parse(candidateId);
            objVendorDashboardParams.SessionId = sessionId;
            var con = new BGVUtils();
            try
            {
                con.Open();
                strJSON = con.GetVendorDocListInfo(objVendorDashboardParams);
                con.Close();
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
                if (con.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    con.Abort();
                }
                else
                {
                    con.Close();
                }

                con = null;
            }

            return strJSON;
        }

        /// <summary>
        /// Method to save assign vendor documents
        /// </summary>
        /// <param name="candidateId">candidate ID</param>
        /// <param name="verifyList">verification list</param>
        /// <param name="compList"> component list</param>
        /// <param name="docList">document list</param>
        /// <returns>save candidate data</returns>
        [WebMethod]
        public static string SaveAssignVendorDocument(long candidateId, Collection<AssignVendorVerificationData> verifyList, Collection<AssignVendorComponentData> compList, Collection<AssignVendorDocumentData> docList)
        {
            string saveStatus = string.Empty;
            try
            {
                long sessionId = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId;
                CandidateBGVData objAssignVendorData = new CandidateBGVData();
                objAssignVendorData.CandidateId = candidateId;
                objAssignVendorData.SessionId = sessionId;
                objAssignVendorData.AssignVendorBoxList = verifyList;
                objAssignVendorData.AssignVendorComponentList = compList;
                objAssignVendorData.AssignVendorDocList = docList;
                ////objAssignVendorData.IsActive = isActive;

                var con = new BGVUtils();
                try
                {
                    con.Open();
                    saveStatus = con.SaveAssignVendorCandidateData(objAssignVendorData);
                }
                catch (Exception ex)
                {
                    (new ErrorLogger(sessionId)).LogError(ex);
                }
                finally
                {
                    if (con.State == System.ServiceModel.CommunicationState.Faulted)
                    {
                        con.Abort();
                    }
                    else
                    {
                        con.Close();
                    }

                    con = null;
                }
            }
            catch (Exception ex)
            {
                (new ErrorLogger()).LogError(ex);
            }

            return saveStatus;
        }

        /// <summary>
        /// Represent the method to save component data
        /// </summary>
        /// <param name="candidateId">candidate Id</param>
        /// <param name="compData">component Data</param>
        /// <param name="docData">document data</param>
        /// <param name="compConfig">component configure</param>
        /// <param name="mode">method mode</param>
        /// <param name="totalExp">total experience</param>
        /// <returns>save component data</returns>
        [WebMethod]
        public static int SaveComponentData(int candidateId, string compData, string docData, string compConfig, int mode, string totalExp)
        {
            int retStatus = 0;
            int sessionId = int.Parse(((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId.ToString());
            SaveComponent objSaveComponentDC = new SaveComponent();
            objSaveComponentDC = JsonConvert.DeserializeObject<SaveComponent>(compData, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
            Collection<DocDataList> docList = new Collection<DocDataList>();
            XmlDocument doc = (XmlDocument)JsonConvert.DeserializeXmlNode(docData, "Root");
            foreach (XmlNode x in doc.SelectNodes("Root").Item(0).ChildNodes)
            {
                DocDataList objDocDataList = new DocDataList();
                if (x.InnerText != string.Empty)
                {
                    objDocDataList.IsDefault = bool.Parse(x["IsDefault"].InnerText.ToString());
                    ////if (objDocDataList.IsDefault == true)
                   //// {
                        objDocDataList.CompDetailId = int.Parse(x["CompDetailId"].InnerText.ToString());
                        objDocDataList.CompRunnerId = int.Parse(x["CompRunnerId"].InnerText.ToString());
                        objDocDataList.DocMatrixId = int.Parse(x["DocMatrixId"].InnerText.ToString());
                        objDocDataList.IsMandatory = bool.Parse(x["IsMandatory"].InnerText.ToString());
                        objDocDataList.IsDefault = bool.Parse(x["IsDefault"].InnerText.ToString());
                        objDocDataList.Remarks = x["Remarks"].InnerText.ToString();
                        objDocDataList.DocumentValue = x["DocumentValue"].InnerText.ToString();
                        docList.Add(objDocDataList);
                   //// }
                }
            }

            objSaveComponentDC.DocDetail = docList;
            objSaveComponentDC.CandidateId = candidateId;
            objSaveComponentDC.Sessionid = sessionId;
            objSaveComponentDC.RoleGroupId = int.Parse((new SessionHelper()).GetSessionValue("rgid").ToString());
            objSaveComponentDC.SpMode = mode;
            objSaveComponentDC.TotalExp = int.Parse(totalExp.ToString().Trim());
            doc = null;
            var con = new BGVUtils();
            try
            {
                con.Open();
                retStatus = con.SaveComponentData(objSaveComponentDC);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
                if (con.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    con.Abort();
                }
                else
                {
                    con.Close();
                }

                con = null;
            }

            return retStatus;
        }

        /// <summary>
        /// This method represents to save the verification data.
        /// </summary>
        /// <param name="candidateId">Candidate Id</param>
        /// <param name="verifyType">Verification Type</param>
        /// <param name="compoObj">Component object</param>
        /// <param name="mode">Mode of methods</param>
        /// <param name="comments">Comments provided</param>
        /// <returns>Status of verification data.</returns>
        [WebMethod]
        public static int SaveVerificationData(int candidateId, string verifyType, string compoObj, int mode, string comments)
        {
            int retStatus = 0;
            int sessionId = int.Parse(((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId.ToString());
            SaveComponent objSaveComponentDC = new SaveComponent();
            objSaveComponentDC = JsonConvert.DeserializeObject<SaveComponent>(compoObj, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
            objSaveComponentDC.Sessionid = sessionId;
            objSaveComponentDC.CandidateId = candidateId;
            objSaveComponentDC.VerifyType = verifyType;
            objSaveComponentDC.RoleGroupId = int.Parse((new SessionHelper()).GetSessionValue("rgid").ToString());
            objSaveComponentDC.SpMode = mode;
            objSaveComponentDC.Comments = comments;
            var con = new BGVUtils();
            try
            {
                con.Open();
                retStatus = con.SaveVerificationData(objSaveComponentDC);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
                if (con.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    con.Abort();
                }
                else
                {
                    con.Close();
                }

                con = null;
            }

            return retStatus;
        }

        /// <summary>
        /// Represent the method to save document list response
        /// </summary>
        /// <param name="candidateId">candidate Id</param>
        /// <param name="response">save documents</param>
        /// <param name="actionDiv">action div</param>
        /// <param name="mode">method mode</param>
        /// <returns>save document data</returns>
        [WebMethod]
        public static string SaveDocListInfoResponse(int candidateId, string response, string actionDiv, int mode)
        {
            string strJson = string.Empty;
            int sessionId = int.Parse(((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId.ToString());
            VendorDocListInfoParams objVendorDocListInfoParams = new VendorDocListInfoParams();
            objVendorDocListInfoParams.SpMode = mode;
            if (mode == 0)
            {
                VendorDocListResponse objVendorDocListResponse = new VendorDocListResponse();
                objVendorDocListResponse = JsonConvert.DeserializeObject<VendorDocListResponse>(response);
                ////DocListItems objDocListItems = objVendorDocListResponse.DocList.Find(delegate(DocListItems vdr) { return vdr.DocId == actionDiv; });
                List<DocListItems> selectedItem = new List<DocListItems>(objVendorDocListResponse.DocList);
                DocListItems objDocListItems = selectedItem.Find(delegate(DocListItems vdr) { return vdr.DocId == actionDiv; });
                actionDiv = actionDiv.Replace("ID", string.Empty);
                if (actionDiv != string.Empty && mode == 0)
                {
                    objVendorDocListInfoParams.Action = objDocListItems.Action;
                    objVendorDocListInfoParams.Status = objDocListItems.Status;
                    objVendorDocListInfoParams.SubStatus = objDocListItems.SubStatus;
                    objVendorDocListInfoParams.CandidateBgvAssignComponentDetail = int.Parse(actionDiv.Split('_')[0]);
                    objVendorDocListInfoParams.CandidateBgvConComponentDetail = int.Parse(actionDiv.Split('_')[1]);
                    objVendorDocListInfoParams.CandidateBgvVendorMapping = int.Parse(actionDiv.Split('_')[2]);
                }
                else
                {
                    objVendorDocListInfoParams.DocList = objVendorDocListResponse.DocList;
                }
            }

            if (mode == 1 || mode == 2)
            {
                JObject jsonObject = JObject.Parse(response);
                objVendorDocListInfoParams.FinalStatus = int.Parse(jsonObject["Report"][0]["ReportStatus"].ToString());
                objVendorDocListInfoParams.FinalSubStatus = int.Parse(jsonObject["Report"][0]["ReportSubStatus"].ToString());
            }

            objVendorDocListInfoParams.SessionId = sessionId;
            objVendorDocListInfoParams.CandidateId = candidateId;
            var con = new BGVUtils();
            try
            {
                con.Open();
                strJson = con.SaveVendorDocListInfo(objVendorDocListInfoParams);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
                if (con.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    con.Abort();
                }
                else
                {
                    con.Close();
                }

                con = null;
            }

            return strJson;
        }

        /// <summary>
        /// Method to save personal data
        /// </summary>
        /// <param name="candidateId">candidate Id</param>
        /// <param name="personalData">personal Data</param>
        /// <param name="mode">save mode</param>
        /// <returns>save personal details</returns>
        [WebMethod]
        public static int SavePersonalData(int candidateId, string personalData, int mode)
        {
            int saveStatus = 0;
            try
            {
                int sessionId = int.Parse(((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId.ToString());
                CandidateInformationDC objPersonalData = new CandidateInformationDC();
                objPersonalData = JsonConvert.DeserializeObject<CandidateInformationDC>(personalData, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                objPersonalData.Sessionid = sessionId;
                objPersonalData.CandidateId = candidateId;
                objPersonalData.RoleGroupId = int.Parse((new SessionHelper()).GetSessionValue("rgid").ToString());
                objPersonalData.Mode = mode;
                var con = new BGVUtils();
                try
                {
                    con.Open();
                    saveStatus = con.SavePersonalData(objPersonalData);
                }
                catch (Exception ex)
                {
                    (new ErrorLogger(sessionId)).LogError(ex);
                }
                finally
                {
                    if (con.State == System.ServiceModel.CommunicationState.Faulted)
                    {
                        con.Abort();
                    }
                    else
                    {
                        con.Close();
                    }

                    con = null;
                }
            }
            catch (Exception ex)
            {
                (new ErrorLogger()).LogError(ex);
            }

            return saveStatus;
        }

        /// <summary>
        /// Represent the method to validate component data
        /// </summary>
        /// <param name="candidateId">Candidate Id</param>
        /// <param name="compData">Component Data</param>
        /// <param name="totalExp">Total Experience</param>
        /// <returns>validate component</returns>
        [WebMethod]
        public static List<string> ValidateComponentData(int candidateId, string compData, string totalExp)
        {
            List<string> msg = new List<string>();
            int sessionId = int.Parse(((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId.ToString());
            Validation objValidation = new Validation();
            objValidation = JsonConvert.DeserializeObject<Validation>(compData);
            objValidation.TotalExp = int.Parse(totalExp.ToString().Trim());
            objValidation.RoleGroupId = int.Parse((new SessionHelper()).GetSessionValue("rgid").ToString());
            objValidation.CandidateId = candidateId;
            objValidation.Sessionid = sessionId;
            var con = new BGVUtils();
            try
            {
                con.Open();
                objValidation = con.ValidateComponentData(objValidation);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
                if (con.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    con.Abort();
                }
                else
                {
                    con.Close();
                }

                con = null;
            }

            if (objValidation.ReturnMessage != null)
            {
                foreach (string s in objValidation.ReturnMessage)
                {
                    msg.Add(s);
                }
            }

            return msg;
        }

        /// <summary>
        /// Represents the personal validation.
        /// </summary>
        /// <param name="personalData">personal Data</param>
        /// <param name="mode">Mode of method</param>
        /// <param name="candidateId">candidate Id</param>
        /// <returns>Returns the response</returns>
        [WebMethod]
        public static List<string> ValidatePersonalInfo(string personalData, int mode, int candidateId)
        {
            List<string> msg = new List<string>();
            int sessionId = int.Parse(((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId.ToString());
            ValidatePersonalData objValidation = new ValidatePersonalData();
            objValidation = JsonConvert.DeserializeObject<ValidatePersonalData>(personalData);
            objValidation.RoleGroupId = int.Parse((new SessionHelper()).GetSessionValue("rgid").ToString());
            objValidation.Mode = mode;
            objValidation.CandidateId = candidateId;
            var con = new BGVUtils();
            try
            {
                con.Open();
                objValidation = con.ValidatePersonalInfo(objValidation);
            }
            catch (Exception ex)
            {
                (new ErrorLogger(sessionId)).LogError(ex);
            }
            finally
            {
                if (con.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    con.Abort();
                }
                else
                {
                    con.Close();
                }

                con = null;
            }

            if (objValidation.ReturnMessage != null)
            {
                foreach (string s in objValidation.ReturnMessage)
                {
                    msg.Add(s);
                }
            }

            return msg;
        }

        /// <summary>
        /// Represents the comparison data
        /// </summary>
        /// <param name="candidateId">candidate Id</param>
        /// <param name="pageId">page Id</param>
        /// <returns>Returns the response</returns>
        [WebMethod]
        public static string GetCompareData(int candidateId, int pageId)
        {
            string strJson = string.Empty;
            CompareDC objCompare = new CompareDC();
            objCompare.CandidateId = candidateId;
            objCompare.PageId = pageId;
            objCompare.RoleGroupId = int.Parse((new SessionHelper()).GetSessionValue("rgid").ToString());
            using (BGVUtils cln = new BGVUtils())
            {
                try
                {
                    strJson = cln.GetPageComparisionData(objCompare);
                }
                catch (Exception ex)
                {
                    int sessionId = int.Parse(((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).SessionId.ToString());
                    (new ErrorLogger(sessionId)).LogError(ex);
                }
                finally
                {
                    if (cln.State == System.ServiceModel.CommunicationState.Faulted)
                    {
                        cln.Abort();
                    }
                    else
                    {
                        cln.Close();
                    }
                }
            }

            return strJson;
        }

        /// <summary>
        /// Method to load page
        /// </summary>
        /// <param name="sender">page sender</param>
        /// <param name="e">page argument</param>
        protected void Page_Load(object sender, EventArgs e)
        {
        }

        #endregion Methods
    }
}
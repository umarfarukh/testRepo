//-----------------------------------------------------------------------=
// <copyright file="NHDashBoard.aspx.cs" company="Cognizant Technology Solutions">
// Copyright  . All Rights Reserved.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp.NHPages     
 * Page Name        : NHDashBoard.aspx
 * Version          : 1.0
 * Type             : Web page class file
 * Purpose          : Page For NH DashBoard
 * Created date     : 2012-Jan-24
 * Author           : 208099
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

namespace OneC.OnBoarding.WebApp.Roles.NHPages
{
    #region Namespaces
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Text;
    using System.Web;
    using System.Web.Services;
    using System.Web.UI;
    using System.Web.UI.WebControls;
    using System.Xml;
    using System.Xml.Serialization;
    using System.Xml.XPath;
    using System.Xml.Xsl;
    using OneC.OnBoarding.DC.CandidateDC;
    using OneC.OnBoarding.DC.UtilityDC;
    using OneC.OnBoarding.WebApp.ELMService;
    using OneC.OnBoarding.WebApp.Service.CandidateServices;
    using OneC.OnBoarding.WebApp.Utility;
    #endregion Namespaces

    /// <summary>
    /// 369041: Class which holds all the NH Dashboard details
    /// </summary>
    public partial class NHDashBoard : System.Web.UI.Page
    {
        #region Private Data Members

        // /// <summary>
        // /// 369041: Current user info will be available in this object
        // /// </summary>
        // private UserInfoDC currentUser = null;

        /// <summary>
        /// 369041: This object contains the Current user Session related information 
        /// </summary>
        private SessionDetails sessionDetail;
        /* Initializing global object for Utility class to access utility methods if required */

        /// <summary>
        /// 369041: Initializing global object for Utility class
        /// </summary>
        private Utility.UtilityMethods objUtil = new UtilityMethods();
        #endregion Private Data Members
        #region Page Methods

        #region Data retrieval Methods

        /// <summary>
        /// 208099: Web method to get list of tasks for candidate
        /// </summary>
        /// <param name="candidateId">Candidate Id of logged in candidate</param>
        /// <param name="processId">Process Id defines whether candidate is in Pre-Joining/ Post-Joining</param>
        /// <param name="countryId">Country Id of country to which candidate belongs</param>
        /// <param name="stateId">State Id of country to which candidate belongs</param>
        /// <param name="role">Role of LoggedIn user</param>
        /// <param name="associateId">Associate Id of the candidate</param>
        /// <param name="sessionId">session Id of the candidate</param>
        /// <returns>Array List</returns>
        [WebMethod]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", Justification = "Reviewed.")]
        public static ArrayList GetTaskList(long candidateId, int processId, int countryId, int stateId, string role, string associateId, long sessionId)
        {
            // #region "GetELMCourses"
            // if (processId == 2 && Convert.ToInt32(associateId) != 0)
            // {
            //    CI_CT_ELM1C_PortTypeClient objClient = null;
            //    try
            //    {
            //        objClient = new CI_CT_ELM1C_PortTypeClient();
            //        LM_PERSON_IDTypeShape3 objPersonId = new LM_PERSON_IDTypeShape3();
            //        Find__CompIntfc__CT_ELM1CTypeShape objELMTypeShape = new Find__CompIntfc__CT_ELM1CTypeShape();
            //        LM_PERSON_IDTypeShape2 objPersonId2 = new LM_PERSON_IDTypeShape2();

            // objPersonId.Value = Convert.ToInt32(associateId);
            // objELMTypeShape.LM_PERSON_ID = objPersonId;
            //        CT_ELM1CComplexTypeShape1[] objRespTypeShape;
            //        objRespTypeShape = objClient.CI_CT_ELM1C_F(objELMTypeShape);

            // using (CandidateServicesClient objCandClient = new CandidateServicesClient())
            //        {
            //            try
            //            {
            //                ELMStatusList elmLIST = new ELMStatusList();
            //                StringBuilder sbXml;
            //                //sbXml.Append("<ELM>");
            //                for (int i = 0; i < objRespTypeShape.Length; i++)
            //                {
            //                    if (objRespTypeShape != null)
            //                    {
            //                        ELMDC objELMDC = new ELMDC();                                    
            //                        sbXml = new StringBuilder();
            //                        int intActivityID = Convert.ToInt32(objRespTypeShape[i].LM_ACT_ID.Value.ToString());
            //                        sbXml.Append("<ActivityID>" + intActivityID + "</ActivityID>");
            //                        objELMDC.ActivityID = sbXml.ToString();
            //                        objELMDC.CandidateId = Convert.ToInt32(candidateId);
            //                        objELMDC.CompletedDate = objRespTypeShape[i].DESCR1.Value;
            //                        objELMDC.ELMCourseCode = objRespTypeShape[i].LM_CRSE_CODE.Value.ToString().Trim();
            //                        objELMDC.ELMStatus = objRespTypeShape[i].DESCR.Value.ToString().Trim();
            //                        objELMDC.SessionId = Convert.ToInt32(sessionId);
            //                        elmLIST.Add(objELMDC);
            //                        //sbXml.Append("<Elearning>");
            //                        //int intApplicantID = Convert.ToInt32(associateId);
            //                        //int intActivityID = Convert.ToInt32(objRespTypeShape[i].LM_ACT_ID.Value.ToString());
            //                        //string strCourseCode = objRespTypeShape[i].LM_CRSE_CODE.Value.ToString().Trim();
            //                        //string strTitle = objRespTypeShape[i].LM_CS_LONG_NM.Value.ToString().Trim();
            //                        //string strType = objRespTypeShape[i].LM_DM_LONG_NM.Value.ToString().Trim();
            //                        //string strStatus = objRespTypeShape[i].DESCR.Value.ToString().Trim();
            //                        //string strCompleteddt = objRespTypeShape[i].DESCR1.Value;
            //                        //sbXml.Append(" ApplicantID='" + intApplicantID + "' ActivityID='" + intActivityID + "' CourseCode='" + strCourseCode + "' Title='" + strTitle + "' Type='" + strType + "' Status='" + strStatus + "' Completeddt='" + strCompleteddt + "'>");
            //                        //sbXml.Append("</Elearning>");
            //                    }
            //                }
            //                //sbXml.Append("</ELM>");
            //                ELMDC[] ELMDetailsList = elmLIST.ToArray();
            //                objCandClient.UpdateELMStatus(ELMDetailsList);
            //            }
            //            catch
            //            {
            //                throw;
            //            }

            // }
            //    }
            //    catch
            //    {
            //        throw;
            //    }
            // }
            // #endregion
            CandidateDetail objCandidateDetail = new CandidateDetail();
            SessionHelper objSession = new SessionHelper();

            if (((CandidateDetail)objSession.GetSessionValue("Task")) == null)
            {
                /*Assign Values To CandidateDetail */
                objCandidateDetail.CandidateId = candidateId;
                objCandidateDetail.CountryID = countryId;
                objCandidateDetail.StateId = stateId;
                objCandidateDetail.RoleId = role;
                objSession.SetSessionValue("Task", objCandidateDetail);
                objCandidateDetail.ProcessID = processId;
                objCandidateDetail.SessionId = sessionId;
            }
            else
            {
                objCandidateDetail = (CandidateDetail)objSession.GetSessionValue("Task");
                objCandidateDetail.ProcessID = processId;
                objCandidateDetail.SessionId = sessionId;
            }

            ArrayList objArray = new ArrayList();
            try
            {
                using (CandidateServicesClient objCandClient = new CandidateServicesClient())
                {
                    TaskDetail[] taskDtl = objCandClient.FetchTaskList(objCandidateDetail);

                    if (taskDtl != null && taskDtl.Count() > 0)
                    {
                        string nextTask = taskDtl[0].NextTask.ToString();
                        int totalCount = taskDtl[0].TaskTotalCount;
                        int pendingCount = taskDtl[0].TaskPendingCount;
                        int completedCount = taskDtl[0].TaskCompeltedCount;
                        int daysLeft = taskDtl[0].DaysLeft;
                        float daysLeftPercentage = taskDtl[0].DaysLeftPercentage;
                        float taskPercentage = taskDtl[0].TaskPercentage;
                        int personCount = taskDtl[0].PersonCount;
                        ////string relativeUrl = taskDtl[0].RelativeUrl.ToString();/*Code Analysis*/
                        int preJoiningCompletedFlag = taskDtl[0].PreJoiningCompletedFlag;
                        int postJoiningCompletedFlag = taskDtl[0].PostJoiningCompletedFlag;
                        ////int taskId = taskDtl[0].TaskId;/*Code Analysis*/
                        int isPostEnabled = taskDtl[0].IsPostEnable;
                        string flashFile = taskDtl[0].FlashFile;
                        int defaultView = taskDtl[0].DefaultView;
                        string nhphoto = taskDtl[0].NHPhoto;
                        int isPreJoiningMsg = taskDtl[0].IsPreJoiningMsg;
                        int isPreJoiningTabEnabled = taskDtl[0].IsPreJoiningTabEnabled;
                        int isPostJoiningTabEnabled = taskDtl[0].IsPostJoiningTabEnabled;
                        int isPhotoImageRequired = taskDtl[0].IsPhotoImageRequired;
                        int isFaqRequired = taskDtl[0].IsFaqRequired;
                        ////int surveyType = taskDtl[0].SurveyType;/*Code Analysis*/
                        int isCGuideEnabled = taskDtl[0].IsCGuideEnabled;
                        int isRelocationEnabled =taskDtl[0].IsRelocationEnabled;
                        objArray.Add(new { Display = "Next Task", Value = nextTask });
                        objArray.Add(new { Display = "TotalCount", Value = totalCount });
                        objArray.Add(new { Display = "PendingCount", Value = pendingCount });
                        objArray.Add(new { Display = "CompletedCount", Value = completedCount });
                        objArray.Add(new { Display = "DaysLeft", Value = daysLeft });
                        objArray.Add(new { Display = "DaysLeftPercentage", Value = daysLeftPercentage });
                        objArray.Add(new { Display = "TaskPercentage", Value = taskPercentage });
                        objArray.Add(new { Display = "PersonCount", Value = personCount });
                        objArray.Add(new { Display = "PreJoiningCompletedFlag", Value = preJoiningCompletedFlag });
                        objArray.Add(new { Display = "PostJoiningCompletedFlag", Value = postJoiningCompletedFlag });
                        objArray.Add(new { Display = "NHPhoto", Value = nhphoto });
                        string strOutXml;

                        List<TaskDetail> tskList = taskDtl.ToList();
                        strOutXml = Serialize<List<TaskDetail>>(tskList);

                        XmlUrlResolver resolver = new XmlUrlResolver();
                        resolver.Credentials = System.Net.CredentialCache.DefaultCredentials;

                        StringWriter swlistView = new StringWriter();
                        StringWriter swbookView = new StringWriter();
                        StringWriter swyhumbView = new StringWriter();

                        // XslTransform transform = new XslTransform();
                        XslCompiledTransform transform = new XslCompiledTransform();
                        XPathDocument doc = new XPathDocument(new StringReader(strOutXml));

                        // load up the stylesheet
                        // if(ViewId ==1)
                        transform.Load(HttpContext.Current.Server.MapPath("NHTemplate.xslt"), XsltSettings.Default, resolver);
                        transform.Transform(doc, null, swlistView);
                        objArray.Add(new { Display = "TaskList", Value = swlistView.ToString() });

                        // if (ViewId == 2)
                        transform.Load(HttpContext.Current.Server.MapPath("BookView_Template.xslt"), XsltSettings.Default, resolver);
                        transform.Transform(doc, null, swbookView);
                        objArray.Add(new { Display = "TaskList", Value = swbookView.ToString() });

                        // if (ViewId == 3)
                        transform.Load(HttpContext.Current.Server.MapPath("ThumbNail_Template.xslt"), XsltSettings.Default, resolver);
                        transform.Transform(doc, null, swyhumbView);
                        objArray.Add(new { Display = "TaskList", Value = swyhumbView.ToString() });

                        objArray.Add(new { Display = string.Empty, Value = isPostEnabled });
                        objArray.Add(new { Display = string.Empty, Value = flashFile });
                        objArray.Add(new { Display = string.Empty, Value = defaultView });
                        objArray.Add(new { Display = "IsPreJoiningMsg", Value = isPreJoiningMsg });
                        objArray.Add(new { Display = "IsPreJoiningTabEnabled", Value = isPreJoiningTabEnabled });
                        objArray.Add(new { Display = "IsPostJoiningTabEnabled", Value = isPostJoiningTabEnabled });
                        objArray.Add(new { Display = "IsPhotoImageRequired", Value = isPhotoImageRequired });
                        objArray.Add(new { Display = "IsFaqRequired", Value = isFaqRequired });
                        objArray.Add(new { Display = "IsCGuideEnabled", Value = isCGuideEnabled });
                        objArray.Add(new { Display = "IsRelocationEnabled", Value =isRelocationEnabled });

                        swlistView.Dispose();
                        swbookView.Dispose();
                        swyhumbView.Dispose();
                    }
                    else
                    {
                        objArray.Add(new { Display = "No Data Available!", Value = string.Empty });
                    }

                    ////objCandClient.Close();
                }
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
                logger.LogError(ex);
            }

            return objArray;
        }

        /// <summary>
        /// 208099: Method to serialize object
        /// </summary>
        /// <typeparam name="T">Object type</typeparam>
        /// <param name="value">Object value</param>
        /// <returns>Serialized string</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA2202:Do not dispose objects multiple times", Justification = "Reviewed.")]
        public static string Serialize<T>(T value)
        {
            if (value == null)
            {
                return null;
            }

            XmlSerializer serializer = new XmlSerializer(typeof(T));
            XmlWriterSettings settings = new XmlWriterSettings();
            settings.Encoding = new UTF8Encoding(true, false);
            settings.Indent = false;
            settings.OmitXmlDeclaration = false;
            using (StringWriter textWriter = new StringWriter())
            {
                try
                {
                    using (XmlWriter xmlWriter = XmlWriter.Create(textWriter, settings))
                    {
                        serializer.Serialize(xmlWriter, value);
                    }

                    return textWriter.ToString();
                }
                finally
                {
                    textWriter.Close();
                }
            }
        }

        #endregion Data retrieval Methods

        /// <summary>
        /// 369041: Consists of Array List
        /// </summary>
        /// <param name="sender">Supports al the methods</param>
        /// <param name="e">Contains event data.</param>
        protected void Page_init(object sender, EventArgs e)
        {
            /* Initialize session detail */
            if (this.objUtil.SessionDetail != null)
            {
                this.sessionDetail = this.objUtil.SessionDetail;
            }

            // if (!sessionDetail.IsSessionActive)
            // (new UtilityMethods()).RedirectToAccessBlock(UtilityMethods.OB_SESSION_EXPIRED);
            this.hdnSessionId.Value = this.sessionDetail.SessionId.ToString();
        }

        /// <summary>
        /// 369041: Default method to Load the Page.
        /// </summary>
        /// <param name="sender">Supports al the methods</param>
        /// <param name="e">Contains event data.</param>
        protected void Page_Load(object sender, EventArgs e)
        {
            // #region NHWorkspace

            /* Check for Candidate Account Validity and Fetch Information */
            if (!this.IsPostBack)
            {
                if (this.sessionDetail != null)
                {
                    using (CandidateServicesClient objCandClient = new CandidateServicesClient())
                    {
                        CandidateDetail[] objCandDetail = objCandClient.FetchCandidateTracking(this.sessionDetail);

                        // if ((objCandDetail[0].CountryID == 169) || (objCandDetail[0].CountryID == 45) || (objCandDetail[0].CountryID == 62))
                        // {
                        //    Name.InnerText = objCandDetail[0].CandidateFName;
                        // }
                        // else
                        // {
                        this.Name.InnerText = objCandDetail[0].CandidateFName + " " + objCandDetail[0].CandidateLName;

                        this.Designation.InnerText = objCandDetail[0].DesignationDesc;
                        this.hdnCountryId.Value = objCandDetail[0].CountryID.ToString();
                        this.hdnStateId.Value = objCandDetail[0].StateId.ToString();
                        this.hdnCandidateId.Value = objCandDetail[0].CandidateId.ToString();
                        this.hdnCountryEmailId.Value = objCandDetail[0].CountryEmailID.ToString();
                        this.hdnEmailId.Value = objCandDetail[0].CandidateEmailId.ToString();
                        this.hdnAssocaiteId.Value = objCandDetail[0].AssociateId.ToString();
                        this.hdnDOJ.Value = objCandDetail[0].DOJ.ToString();
                        this.hdnMigrateCandidate.Value = objCandDetail[0].MigratedCandidate.ToString();
                        this.hdnCandidateType.Value = objCandDetail[0].CandidateType.ToString();

                        // hdnIsPreJoiningEnabled.Value = objCandDetail[0].IsPreJoiningEnabled.ToString();
                        // hdnIsPostJoiningEnabled.Value = objCandDetail[0].IsPostJoiningEnabled.ToString();
                        this.hdnSurveyAllowed.Value = objCandDetail[0].IsSurveyAllowed.ToString();
                        this.hdnSurveyUrl.Value = objCandDetail[0].SurveyUrl.ToString();
                        this.hdnCGuideURL.Value = objCandDetail[0].CGuideURL.ToString();
                        this.hdnNavigateURL.Value = System.Configuration.ConfigurationManager.AppSettings["NavigatorURL"].ToString();
                        this.hdnDojComparer.Value = objCandDetail[0].DojComparer.ToString();//312020 Commented As not moving to Prod
                        this.hdnRoleGropuId.Value = "6";

                        if (Request.QueryString["skpsrvy"] != null && Request.QueryString["skpsrvy"].ToString() == "1")
                        {
                            this.hdnSurveyAllowed.Value = "0";
                        }

                        string redirectUrl = objCandDetail[0].RedirectUrl;

                        // if survey is eligible then adding survey eligible flag
                        if (objCandDetail[0].IsSurveyAllowed.ToString() == "1" && !string.IsNullOrEmpty(redirectUrl))
                        {
                            redirectUrl = redirectUrl + "&dosrvy=" + objCandDetail[0].IsSurveyAllowed.ToString();
                        }

                        if (!string.IsNullOrEmpty(redirectUrl))
                        {
                            Response.Redirect(redirectUrl, false);
                            if (redirectUrl.Contains("AccessBlock"))
                            {
                                // if (objCandDetail[0].RedirectUrl.ToString() != "")
                                // {
                                //    Response.Redirect(objCandDetail[0].RedirectUrl, false);
                                //    //Page.ClientScript.RegisterStartupScript(this.GetType(), "Redirect", "<script language='javascript'>navigate('" + objCandDetail[0].RedirectUrl.ToString() + "')</script>");
                                //    //Response.Write("<script language='javascript'>navigate('" + objCandDetail[0].RedirectUrl.ToString() + "')</script>");
                                // if (objCandDetail[0].RedirectUrl.ToString().Contains("AccessBlock"))
                                this.sessionDetail.IsSessionActive = false;
                                (new SessionHelper()).SetSessionValue("SessionDetail", this.sessionDetail);

                                HttpContext.Current.Response.End();
                                HttpContext.Current.ApplicationInstance.CompleteRequest();
                            }
                        }
                        else
                        {
                            this.hdnSmMode.Value = "1";
                        }

                        objCandClient.Close();
                    }
                }
            }

            // #endregion NHWorkspace
        }
        #endregion
    }
}

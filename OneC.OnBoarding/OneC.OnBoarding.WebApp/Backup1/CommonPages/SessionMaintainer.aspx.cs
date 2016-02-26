//-----------------------------------------------------------------------=
// <copyright file="SessionMaintainer.aspx.cs" company="Cognizant Technology Solutions">
// Copyright  . All Rights Reserved.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.OnBoardingWebApp.CommonPages
 * Class Name       : SessionMaintainer
 * Version          : 1.0
 * Type             : WebPage class
 * Purpose          : Class which maintains session
 * Created date     : 2012-May-09
 * Author           : 260947
 *******************************************************
*/

namespace OneC.OnBoarding.OnBoardingWebApp.CommonPages
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.ServiceModel;
    using System.Web;
    using System.Web.UI;
    using System.Web.UI.WebControls;
    using OneC.OnBoarding.DC.UtilityDC;
    using OneC.OnBoarding.WebApp.Service.OBUtilityMethods;
    using OneC.OnBoarding.WebApp.Utility;
    #endregion Namespaces

    /// <summary>
    /// Class which Contains Session Maintainer 
    /// </summary>
    public partial class SessionMaintainer : System.Web.UI.Page
    {
        /// <summary>
        /// Method for Page load event
        /// </summary>
        /// <param name="sender">Sends the Data</param>
        /// <param name="e">Event for Page load</param>
        protected void Page_Load(object sender, EventArgs e)
        {
            SessionDetails sessionDetail = (SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail");
            if (sessionDetail != null && sessionDetail.IsSessionActive == true)
            {
                if (this.IncrementSessionCount(sessionDetail))
                {
                    this.MetaRefresh.Attributes["content"] = Convert.ToString(120) + ";url=SessionMaintainer.aspx?q=" + DateTime.Now.Ticks;
                }
            }
        }

        /// <summary>
        /// 260947:  Method which increments session count
        /// </summary>
        /// <param name="sessDetails">Sends the session details for the count of session Increment</param>
        /// <returns>Session Details</returns>
        private bool IncrementSessionCount(SessionDetails sessDetails)
        {
            SessionHelper objSession = new SessionHelper();
            sessDetails.SessionFlag = 1;
            sessDetails.IsSessionActive = true;

            // #region Service call
            var clntUtility = new OBUtilityMethodsClient();
            try
            {
                clntUtility.Open();
                sessDetails = clntUtility.SetSession(sessDetails);
                ////clntUtility.Close(); ////already closed clntutility in final method
            }
            catch (FaultException<OBFaultContractFC> ex)
            { 
                (new ErrorLogger(sessDetails.SessionId)).LogError(ex); 
            }
            catch (Exception ex)
            { 
                (new ErrorLogger(sessDetails.SessionId)).LogError(ex);
            }
            finally
            {
                if (clntUtility.State != System.ServiceModel.CommunicationState.Faulted)
                {
                    clntUtility.Close();
                }
                else
                {
                    clntUtility.Abort();
                }

                clntUtility = null;
            }

            // #endregion
            objSession.SetSessionValue("SessionDetail", sessDetails);
            if (Request.Form["hdnSSId"] == null)
            {
                Response.Write("<input type='hidden' id='hdnSSId' Value='" + sessDetails.SessionId.ToString() + "'/>");
            }

            return sessDetails.IsSessionActive;
        }
    }
}

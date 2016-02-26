//-----------------------------------------------------------------------=
// <copyright file="PopUp.aspx.cs" company="Cognizant Technology Solutions">
// Copyright  . All Rights Reserved.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace            : OneC.OnBoarding.WebApp.CommonPages
 * Interface Name       : IDashBoardServices.cs
 * Version              : 1.0
 * Type                 : Interface
 * Purpose              : Interface references of dashboard service methods
 * Created date         : 2012-Jan-16
 * Author               : 208099
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

namespace OneC.OnBoarding.WebApp.CommonPages
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.UI;
    using System.Web.UI.WebControls;
    using OneC.OnBoarding.DC.UtilityDC;
    using OneC.OnBoarding.WebApp.Service.OBUtilityMethods;
    using OneC.OnBoarding.WebApp.Utility;
    #endregion Namespaces

    /// <summary>
    /// Class which holds the Pop Up during page load 
    /// </summary>
    public partial class PopUp : System.Web.UI.Page
    {
        /// <summary>
        /// 369041: Method for Page load event
        /// </summary>
        /// <param name="sender">Sends the Data</param>
        /// <param name="e">Event for Page load</param>
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                Utility.UtilityMethods objUtil = new UtilityMethods();
                SessionDetails sessDetails = objUtil.SessionDetail;
                sessDetails.IsSessionActive = false;

                objUtil.SetSessionActive(false);
                if (Request.Form["hdnSSId"] == null)
                {
                    Response.Write("<input type='hidden' id='hdnSSId' Value='" + sessDetails.SessionId.ToString() + "'/>");
                }
            }
            catch
            {
            }
        }

        /// <summary>
        /// Method for Button click event to get the Session Details
        /// </summary>
        /// <param name="sender">Sends the Session Value</param>
        /// <param name="e">Send the Session Details</param>
        protected void BtnOk_Click(object sender, EventArgs e)
        {
            OBUtilityMethodsClient obj = new OBUtilityMethodsClient();

            OneC.OnBoarding.WebApp.Utility.SessionHelper objSession = new Utility.SessionHelper();
            SessionDetails sessDetails = (SessionDetails)objSession.GetSessionValue("SessionDetail");

            sessDetails.SessionFlag = 1;
            sessDetails.IsSessionActive = true;
            obj.SetSession(sessDetails);
            Utility.UtilityMethods objUtil = new UtilityMethods();
            objUtil.SetSessionActive(true);
            objSession.SetSessionValue("SessionDetail", sessDetails);

            if (!ClientScript.IsClientScriptBlockRegistered("ClientScript"))
            {
                ClientScript.RegisterClientScriptBlock(this.GetType(), "ClientScript", "<script language='javascript' type='text/javascript'>ClosePopup();</script>");
            }
        }
    }
}

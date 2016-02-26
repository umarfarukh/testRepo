//-----------------------------------------------------------------------=
// <copyright file="AccessBlock.aspx.cs" company="Cognizant Technology Solutions">
// Copyright  . All Rights Reserved.
// </copyright>
//-----------------------------------------------------------------------

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp
 * Class Name       : AccessBlock
 * Version          : 1.0
 * Type             : Class
 * Purpose          : Web page to show block or error information
 * Created date     : 2011-Jan-31
 * Author           : 260947
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

namespace OneC.OnBoarding.WebApp
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.UI;
    using System.Web.UI.WebControls;
    #endregion

    /// <summary>
    /// AccessBlock class
    /// </summary>
    public partial class AccessBlock : System.Web.UI.Page
    {
        #region Page Methods
        /// <summary>
        /// Method for Page Load
        /// </summary>
        /// <param name="sender"> object sender</param>
        /// <param name="e">Event Args e</param>
        protected void Page_Load(object sender, EventArgs e)
        {
            string displayMessage = string.Empty;          
            var sessionId = Request.QueryString["SSId"];
            long retSession;

            if (long.TryParse(sessionId, out retSession) == true)
            {
                ////Static error message which needs to be displayed
                if (Request.QueryString["Message"] != null)
                {
                    displayMessage = HttpUtility.HtmlDecode(Request.QueryString["Message"]);
                }

                if (Request.QueryString["BlockId"] != null)
                {
                    int messageId = Convert.ToInt32(HttpUtility.HtmlDecode(Request.QueryString["BlockId"]));
                    int countryId = 0;

                    if (Request.QueryString["CountryId"] != null)
                    {
                        countryId = Convert.ToInt32(HttpUtility.HtmlDecode(Request.QueryString["CountryId"]));
                    }
                    ////Creating new client to get message from DB
                    ////The message will be based on BlockId provided in query string
                    var clntUtility = new Service.OBUtilityMethods.OBUtilityMethodsClient();
                    try
                    {
                        clntUtility.Open();
                        DC.UtilityDC.Messages getMessage = new DC.UtilityDC.Messages(); ////Initializing new message object
                        getMessage.MessageId = messageId;
                        getMessage.MethodType = DC.UtilityDC.MessageType.Application;
                        getMessage.SessionId = long.Parse(sessionId);
                        getMessage.CountryId = countryId;
                        getMessage = clntUtility.GetMessage(getMessage); ////Getting message from DB
                        displayMessage = getMessage.DisplayMessage;                      
                        //// clntUtility.Close(); //// already closed in final block
                    }
                    catch
                    {
                        displayMessage = string.Empty;
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
                    }
                }
            }
            else
            {
                displayMessage = "Access denied";
            }
            ////Checking for valid message
            if (displayMessage != null && displayMessage.Trim().Length > 0)
            {
                displayMessage = displayMessage.Trim();
            }
            else
            {
                displayMessage = "Thank you for accessing One Cognizant - OnBoarding application";
            }

            ////Displaying message
            this.divBody.InnerHtml = displayMessage;
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.Cache.SetExpires(DateTime.UtcNow.AddHours(-1));
            Response.Cache.SetNoStore();                      
            Session.Clear();
            Session.Abandon();
        }
        #endregion
    }
}
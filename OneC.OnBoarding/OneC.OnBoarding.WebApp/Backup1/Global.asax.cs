//-----------------------------------------------------------------------
// <copyright file="Global.asax.cs" company="Cognizant">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp
 * Class Name       : Global
 * Version          : 1.0
 * Type             : Class
 * Purpose          : Core class which handles each request
 * Created date     : Project creation date
 * Author           : System
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
    using System.Web.Security;
    using System.Web.SessionState;
    using OneC.OnBoarding.WebApp.Utility;
    #endregion
    /// <summary>
    /// for service request
    /// </summary>
    public class Global : System.Web.HttpApplication
    {
        /// <summary>
        /// This method is used for Application Start
        /// </summary>
        /// <param name="sender">The sender is the control for application start </param>
        /// <param name="e">arguments used for events</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode", Justification = "Reviewed")]
        private void Application_Start(object sender, EventArgs e)
        {
            // Code that runs on application startup
        }

        /// <summary>
        /// This method is used for Application end
        /// </summary>
        /// <param name="sender">The sender is the control for application start </param>
        /// <param name="e">arguments used for events</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode", Justification = "Reviewed")]
        private void Application_End(object sender, EventArgs e)
        {
            // Code that runs on application shutdown
        }

        /// <summary>
        /// This method is used for Application error
        /// </summary>
        /// <param name="sender">The sender is the control for application start </param>
        /// <param name="e">arguments used for events</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode", Justification = "Reviewed")]
        private void Application_Error(object sender, EventArgs e)
        {
            // Code that runs when an unhandled error occurs
        }

        /// <summary>
        /// This method is used for Application beginning request
        /// </summary>
        /// <param name="sender">The sender is the control for application start </param>
        /// <param name="e">arguments used for events</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode", Justification = "Reviewed")]
        private void Application_BeginRequest(object sender, EventArgs e)
        {       
        }

        /// <summary>
        /// This method is used for Application End Request
        /// </summary>
        /// <param name="sender">The sender is the control for application start </param>
        /// <param name="e">arguments used for events</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode", Justification = "Reviewed")]
        private void Application_EndRequest(object sender, EventArgs e)
        {
        }

        /// <summary>
        /// This method is used for Starting Session
        /// </summary>
        /// <param name="sender">The sender is the control for application start </param>
        /// <param name="e">arguments used for events</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode", Justification = "Reviewed")]
        private void Session_Start(object sender, EventArgs e)
        {
            // Code that runs when a new session is started
            try
            {
                Response.Cache.SetCacheability(HttpCacheability.NoCache);
                Response.Cache.SetExpires(DateTime.UtcNow.AddHours(-1));
                Response.Cache.SetNoStore();               
                Utility.UtilityMethods objUtil = new Utility.UtilityMethods();
                objUtil.InitiateSession(HttpContext.Current, this.Request);
                //// Response.RedirectPermanent(objUtil.GetLandingURL().ToString(), false);
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger();
                logger.LogError(ex);
                Response.RedirectPermanent("AccessBlock.aspx?BlockId=" + UtilityMethods.OBACCESSDENIED.ToString(), true); // Access denied
            }
        }

        /// <summary>
        /// This method is used for ending Session
        /// </summary>
        /// <param name="sender">The sender is the control for application start </param>
        /// <param name="e">arguments used for events</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode", Justification = "Reviewed")]
        private void Session_End(object sender, EventArgs e)
        {
            // Code that runs when a session ends. 
            // Note: The Session_End event is raised only when the sessionstate mode
            // is set to InProc in the Web.config file. If session mode is set to StateServer 
            // or SQLServer, the event is not raised.
        }
    }
}

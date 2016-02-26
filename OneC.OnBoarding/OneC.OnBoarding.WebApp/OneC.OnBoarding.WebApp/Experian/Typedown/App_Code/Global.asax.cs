//-----------------------------------------------------------------------
// <copyright file="Global.cs" company="External">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp
 * Class Name       : Global.cs
 * Version          : 1.0
 * Type             : Class
 * Purpose          : Cs page for search data 
 * Created date     : 2012-Feb-13
 * Author           : 368982
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

namespace com.qas.prowebintegration
{
    using System;
    using System.Collections;
    using System.ComponentModel;
    using System.Web;
    using System.Web.SessionState;

    /// <summary>
    /// description for Global.
    /// </summary>
    public class Global : System.Web.HttpApplication
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Global"/> class.
        /// </summary>
        public Global()
        {
            this.InitializeComponent();
        }

        /// <summary>
        /// Method to Application Start
        /// </summary>
        /// <param name="sender">object sender</param>
        /// <param name="e">event arguments</param>
        protected void Application_Start(object sender, EventArgs e)
        {
        }

        /// <summary>
        ///  Method to Session Start
        /// </summary>
        /// <param name="sender">object sender</param>
        /// <param name="e">event arguments</param>
        protected void Session_Start(object sender, EventArgs e)
        {
        }

        /// <summary>
        ///  Method to Application Begin Request
        /// </summary>
        /// <param name="sender">object sender</param>
        /// <param name="e">event arguments</param>
        protected void Application_BeginRequest(object sender, EventArgs e)
        {
        }

        /// <summary>
        ///  Method to Application End Request
        /// </summary>
        /// <param name="sender">object sender</param>
        /// <param name="e">event arguments</param>
        protected void Application_EndRequest(object sender, EventArgs e)
        {
        }

        /// <summary>
        ///  Method to Application Authenticate Request
        /// </summary>
        /// <param name="sender">object sender</param>
        /// <param name="e">event arguments</param>
        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {
        }

        /// <summary>
        ///  Method to Application Error
        /// </summary>
        /// <param name="sender">object sender</param>
        /// <param name="e">event arguments</param>
        protected void Application_Error(object sender, EventArgs e)
        {
        }

        /// <summary>
        ///  Method to Session End
        /// </summary>
        /// <param name="sender">object sender</param>
        /// <param name="e">event arguments</param>
        protected void Session_End(object sender, EventArgs e)
        {
        }

        /// <summary>
        ///  Method to Application End
        /// </summary>
        /// <param name="sender">object sender</param>
        /// <param name="e">event arguments</param>
        protected void Application_End(object sender, EventArgs e)
        {
        }

        #region Web Form Designer generated code
        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
        }
        #endregion
    }
}
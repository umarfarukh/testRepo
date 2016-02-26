//-----------------------------------------------------------------------
// <copyright file="SessionHelper.cs" company="Cognizant">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp.Utility
 * Class Name       : SessionHelper
 * Type             : Class
 * Purpose          : Class which gets or sets session value
 * Created date     : 2012-Jan-18
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

namespace OneC.OnBoarding.WebApp.Utility
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.SessionState;
    #endregion

    /// <summary>
    /// 260947: Interface which helps in accessing session state namespace
    /// </summary>
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1040:AvoidEmptyInterfaces", Justification = "Reviewed.")]
    public interface IRequiresSessionState
    {
    }

    /// <summary>
    /// 260947: Class which access session data across application for class files
    /// </summary>
    public class SessionHelper : System.Web.SessionState.IRequiresSessionState
    {
        /// <summary>
        /// 260947: Method which gets value from session
        /// </summary>
        /// <param name="sessionKey">Session key</param>
        /// <returns>Returns object type</returns>
        public object GetSessionValue(string sessionKey)
        {
            if (HttpContext.Current.Session[sessionKey] != null)
            {
                return HttpContext.Current.Session[sessionKey];
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 260947: Method which sets value to session
        /// </summary>
        /// <param name="sessionKey">Session key name</param>
        /// <param name="value">value of key</param>
        public void SetSessionValue(string sessionKey, object value)
        {
            if (HttpContext.Current.Session[sessionKey] != null)
            {
                HttpContext.Current.Session.Remove(sessionKey);
            }

            HttpContext.Current.Session[sessionKey] = value;
        }

        /// <summary>
        /// 260947: Method which removes session key from session
        /// </summary>
        /// <param name="sessionKey">Session key</param>
        public void RemoveSessionKey(string sessionKey)
        {
            if (HttpContext.Current.Session[sessionKey] != null)
            {
                HttpContext.Current.Session.Remove(sessionKey);
            }
        }
    }
}
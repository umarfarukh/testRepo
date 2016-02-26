using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SANSharedServicesLibrary;
using System.Configuration;

namespace OneC.OnBoarding.WebApp.Utility
{
    public class SAN
    {
        /// <summary>
        /// string finalQueryString
        /// </summary>
        private string finalQueryString = string.Empty;

        /// <summary>
        ///  declares a string parameter to have encrypted Query string
        /// </summary>
        private string encryptedQuerystring = string.Empty;

        /// <summary>
        /// Object of class sanWrapperService
        /// </summary>
        private SanWrapperService objSANService;

        #region SAN Query string Method

        /// <summary>
        /// Method defining Getting the query string
        /// </summary>
        /// <returns>query string</returns>
        public string GetQueryStringValues(int appId, string appTemplateid, string logonUser, string clientURL, long sessionId)
        {

            string encryptedKey = string.Empty;
            string uploadMethod = string.Empty;
            string finalQuerystring = string.Empty;
            try
            {
                uploadMethod = Convert.ToString(ConfigurationManager.AppSettings["UploadMethod"]);

                if (Convert.ToString(ConfigurationManager.AppSettings["SANMultipleAccounts"]) == "true")
                {
                    encryptedKey = this.objSANService.GetAuthrTokenKey(appId, appTemplateid, logonUser);
                    finalQuerystring = string.Format("?SANAppId={0}&SANOneCQueryUrl={1}&SANMethod={2}&SANAuthrTokenKey={3}&SANTemplateId={4}", appId, clientURL, uploadMethod, encryptedKey, appTemplateid);
                    this.finalQueryString = this.objSANService.EncryptQuerystring(appTemplateid, finalQuerystring);
                    this.encryptedQuerystring = string.Format("?SANAppId={0}&SanAuthorisationString={1}", appTemplateid, this.finalQueryString);
                }
                else
                {
                    encryptedKey = this.objSANService.GetAuthrTokenKey(appId, logonUser);
                    finalQuerystring = string.Format("?SANAppId={0}&SANOneCQueryUrl={1}&SANMethod={2}&SANAuthrTokenKey={3}&SANTemplateId={4}", appId, clientURL, uploadMethod, encryptedKey, appTemplateid);
                    this.finalQueryString = this.objSANService.EncryptQuerystring(appId, finalQuerystring);
                    this.encryptedQuerystring = string.Format("?SANAppId={0}&SanAuthorisationString={1}", appId, this.finalQueryString);
                }
            }
            catch (Exception ex)
            {
                ErrorLogger logger = new ErrorLogger(sessionId);
                logger.LogError(ex);
            }

            return encryptedQuerystring;
        }
        #endregion
    }
}
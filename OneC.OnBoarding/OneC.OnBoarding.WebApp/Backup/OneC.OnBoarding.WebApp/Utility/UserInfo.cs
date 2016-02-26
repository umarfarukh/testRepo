//-----------------------------------------------------------------------
// <copyright file="UserInfo.cs" company="Cognizant">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp.Utility
 * Class Name       : UserInfo
 * Version          : 1.0
 * Type             : Class
 * Purpose          : Class to hold user related information through out application
 * Created date     : 2012-Feb-14
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
    using System.ServiceModel;
    using System.Web;
    using CTS.OneCognizant.Platform.CoreServices;
    using OneC.OnBoarding.DC.UtilityDC;
    #endregion

    /// <summary>
    /// sealed class for User Information
    /// </summary>
    [Serializable]
    public sealed class UserInfo
    {
        /// <summary>
        /// private field of session details
        /// </summary>
        private SessionDetails sessionDetail;

        /// <summary>
        /// on Behalf Of User field
        /// </summary>
        private string behalfOfUser;

        /// <summary>
        /// current user information details
        /// </summary>
        private UserInfoDC currentUserInfo = new UserInfoDC();

        /// <summary>
        /// Initializes a new instance of the <see cref="UserInfo"/> class
        /// </summary>
        /// <param name="sessionDetail">Session information</param>
        /// <param name="behalfOfUser">Account to which OnBehalfOf mode as to work</param>
        public UserInfo(SessionDetails sessionDetail, string behalfOfUser)
        {
            this.sessionDetail = sessionDetail;
            this.behalfOfUser = behalfOfUser;
            this.GetUserContext();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="UserInfo"/> class
        /// </summary>
        /// <param name="sessionDetail">session detail</param>
        public UserInfo(SessionDetails sessionDetail)
        {
            this.sessionDetail = sessionDetail;
            this.GetUserContext();
        }

        /// <summary>
        /// Gets or sets current user information
        /// </summary>
        public UserInfoDC CurrentUserInfo
        {
            get { return this.currentUserInfo; }
            set { this.currentUserInfo = value; }
        }

        /// <summary>
        /// 260947:Method to call UserContext DLL and to get data for Internal users
        /// </summary>
        private void GetUserContext()
        {
            try
            {
                UserContext objUser = UserContext.GetUserContext();

                this.currentUserInfo.LoggedInUser = objUser.CurrentUser.UserId;
                this.currentUserInfo.LoginId = objUser.CurrentUser.UserId;
                this.currentUserInfo.FirstName = objUser.CurrentUser.FirstName;
                this.currentUserInfo.LastName = objUser.CurrentUser.LastName;
                this.currentUserInfo.EmailId = objUser.CurrentUser.EmailID;
                this.currentUserInfo.IsExternalUser = objUser.CurrentUser.IsNonAssociate;
                this.currentUserInfo.DisplayName = objUser.CurrentUser.FirstName;
            }
            catch
            {
            }

            this.GetLoggedInUserInfo();
        }

        /// <summary>
        /// 260947: Method which gets data for external user from DB 
        /// if not exists in database will update the login details based on the IDM Registration status
        /// </summary>
        private void GetLoggedInUserInfo()
        {
            UserInfoDC user = this.GetUserInfoFromDatabase();
            this.currentUserInfo.EnableIdmRetry = user.EnableIdmRetry;
            this.currentUserInfo.ChkRegistrationStatus = user.ChkRegistrationStatus;

            if (this.currentUserInfo.EnableIdmRetry == true)
            {
                if (this.currentUserInfo.ChkRegistrationStatus == true)
                {
                    string retStr = string.Empty;
                    var idmclnt = new IDMSvcRefFromIDM.Service_EUMSClient();
                    try
                    {
                        retStr = idmclnt.GetRegistrationStatus(user.LoginId);
                        if (retStr == "REGISTERED-ACTIVE")
                        {
                            var retryclnt = new Service.OBUtilityMethods.OBUtilityMethodsClient();
                            retryclnt.UpdateIDMRegistartionforRetry(this.sessionDetail);
                        }
                    }
                    catch (Exception ex)
                    { // Catching unhandled exception with global exception class
                        retStr = ex.Message.ToString().Trim();
                        (new ErrorLogger(this.sessionDetail.SessionId)).LogError(ex);
                    }
                    finally
                    {
                        // If connection resulted in faulted state then aborting client
                        if (idmclnt.State == System.ServiceModel.CommunicationState.Faulted)
                        {
                            idmclnt.Abort();
                        }
                        else
                        {
                            idmclnt.Close();   // Closing connection if no exception
                        }

                        idmclnt = null;    // Disposing client
                    }

                    // UF20130930
                    user = this.GetUserInfoFromDatabase();
                }
            }

            // UF20130930
            // Repeat call to func GetUserInfoFromDatabase; already called at start; 
            // reqd. to call only when UpdateIDMRegistartionforRetry is called
            // so moving below line inside if condition above           
            // user = GetUserInfoFromDatabase(); 
            this.currentUserInfo.LoggedInUser = user.LoggedInUser;
            this.currentUserInfo.LoginId = user.LoginId;
            this.currentUserInfo.IsExternalUser = user.IsExternalUser;
            this.currentUserInfo.IsCandidate = user.IsCandidate;
            this.currentUserInfo.IsApplicationInSupportMode = user.IsApplicationInSupportMode;

            // End Implementaion of IDM retry
            if (user.IsCandidate == true)
            { // If the current user is candidate then setting values with restricted access
                this.currentUserInfo.FirstName = user.FirstName;
                this.currentUserInfo.LastName = user.LastName;
                this.currentUserInfo.EmailId = user.EmailId;
                this.currentUserInfo.DisplayName = user.DisplayName;
            }
            else
            {
                if (user.IsExternalUser == true)
                { // If the user is external user then assigning the data from DB
                    this.currentUserInfo.FirstName = user.FirstName;
                    this.currentUserInfo.LastName = user.LastName;
                    this.currentUserInfo.EmailId = user.EmailId;
                    this.currentUserInfo.DisplayName = user.DisplayName;
                }
                else
                {
                    this.currentUserInfo.LoginId = this.behalfOfUser;
                }
            }
        }

        /// <summary>
        /// 260947: Method which gets data for external user from DB
        /// </summary>
        /// <returns>user data</returns>
        private UserInfoDC GetUserInfoFromDatabase()
        {
            UserInfoDC user = new UserInfoDC();

            // Creating client for service
            var clnt = new Service.OBUtilityMethods.OBUtilityMethodsClient();
            try
            {
                // Opening client
                clnt.Open();

                // Executing the method
                user = clnt.GetExternalUserInfo(this.sessionDetail);
            }
            catch (FaultException<OBFaultContractFC> ex)
            { 
                // Catching custom exception of type OBFaultContract
                (new ErrorLogger(this.sessionDetail.SessionId)).LogError(ex); 
            }
            catch (Exception ex)
            { 
                // Catching unhandled exception with global exception class
                (new ErrorLogger(this.sessionDetail.SessionId)).LogError(ex);
            }
            finally
            {
                // If connection resulted in faulted state then aborting client
                if (clnt.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    clnt.Abort();
                }
                else
                {
                    // Closing connection if no exception
                    clnt.Close(); 
                }

                clnt = null; // Clearing client
            }

            return user;
        }
    }
}

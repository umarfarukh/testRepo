//-----------------------------------------------------------------------=
// <copyright file="ErrorLogger.cs" company="Cognizant Technology Solutions">
// Copyright  . All Rights Reserved.
// </copyright>
//-----------------------------------------------------------------------

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp.Utility
 * Class Name       : ErrorLogger
 * Type             : Class
 * Purpose          : Class which logs system errors
 * Created date     : 2012-Jan-20
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
    using System.Data;
    using System.Data.SqlClient;
    using System.Linq;
    using System.ServiceModel;
    using System.Text;
    using System.Web;
    using OneC.OnBoarding.DC.UtilityDC;

    #endregion

    /// <summary>
    /// 260947: Class which provides method for logging unexpected system errors
    /// </summary>
    public sealed class ErrorLogger : IDisposable
    {
        /// <summary>
        /// Private variable for session Id
        /// </summary>
        private long sessionId;

        /// <summary>
        /// Session Details
        /// </summary>
        private SessionDetails sessionDetail;

        /// <summary>
        /// Initializes a new instance of the <see cref="ErrorLogger"/> class
        /// </summary>
        public ErrorLogger()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ErrorLogger"/> class
        /// </summary>
        /// <param name="sessionId">Session id</param>
        public ErrorLogger(long sessionId)
        {
            this.sessionId = sessionId;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ErrorLogger"/> class
        /// </summary>
        /// <param name="sessionDetail">Session detail</param>
        public ErrorLogger(SessionDetails sessionDetail)
        {
            if (sessionDetail != null)
            {
                this.sessionId = sessionDetail.SessionId;
                this.sessionDetail = sessionDetail;
            }
        }

        /// <summary>
        /// 260947: Method which logs error into database
        /// </summary>
        /// <param name="ex">Exception detail</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", Justification = "Reviewed.")]        
        public void LogError(Exception ex)
        {
            DateTime errDateTime = DateTime.Now.ToLocalTime();
            ErrorDetails errDetail = new ErrorDetails();
            try
            {
                /* Preparing exception information */
                errDetail.ErrorSource = ex.Source;
                errDetail.ErrorMessage = ex.Message;
                errDetail.ExceptionDateTime = errDateTime;
                errDetail.SessionId = this.sessionId;
                errDetail.StackTrace = ex.StackTrace;
                errDetail.InnerException = ex.InnerException == null ? null : ex.InnerException.ToString();
                var clntUtility = new Service.OBUtilityMethods.OBUtilityMethodsClient();
                try
                {
                    clntUtility.Open();
                    clntUtility.LogException(errDetail);
                }
                catch
                {
                    this.LogErrorOnDBServiceFail(errDetail);
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
            }
            catch
            {
                this.LogErrorOnDBServiceFail(errDetail);
            }
        }

        /// <summary>
        /// 260947: Method which logs error into database
        /// </summary>
        /// <param name="ex">Exception detail of type OBFaultContractFC</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", Justification = "Reviewed.")]
        public void LogError(OBFaultContractFC ex)
        {
            DateTime errDateTime = DateTime.Now.ToLocalTime();
            ErrorDetails errDetail = new ErrorDetails();
            try
            {
                /* Preparing exception information */
                errDetail.ErrorSource = ex.FaultSource;
                errDetail.ErrorMessage = ex.FaultMessage.ToString();
                errDetail.ExceptionDateTime = errDateTime;
                errDetail.SessionId = this.sessionId;
                errDetail.StackTrace = ex.FaultStack;
                errDetail.InnerException = ex.FaultInnerException == null ? string.Empty : ex.FaultInnerException.ToString();
                var clnt = new Service.OBUtilityMethods.OBUtilityMethodsClient();
                try
                {
                    clnt.Open();
                    clnt.LogException(errDetail);
                }
                catch
                {
                    this.LogErrorOnDBServiceFail(errDetail);
                }
                finally
                {
                    if (clnt.State != System.ServiceModel.CommunicationState.Faulted)
                    {
                        clnt.Close();
                    }
                    else
                    {
                        clnt.Abort();
                    }
                }
            }
            catch
            {
                this.LogErrorOnDBServiceFail(errDetail);
            }
        }

        /// <summary>
        /// 260947: Method which logs custom track info into database
        /// </summary>
        /// <param name="customMessage">Custom message string</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", Justification = "Reviewed.")]
        public void LogMessage(string customMessage)
        {
            bool isCustomMessageLogEnabled;
            if (this.sessionDetail != null)
            {
                isCustomMessageLogEnabled = this.sessionDetail.IsCustomMessageLogEnabled;
            }
            else
            {
                isCustomMessageLogEnabled = ((SessionDetails)(new SessionHelper()).GetSessionValue("SessionDetail")).IsCustomMessageLogEnabled;
            }

            if (isCustomMessageLogEnabled)
            {
                DateTime errDateTime = DateTime.Now.ToLocalTime();
                ErrorDetails errDetail = new ErrorDetails();
                try
                {
                    /* Preparing exception information */
                    errDetail.ErrorSource = "Log";
                    errDetail.ErrorMessage = customMessage.ToString();
                    errDetail.ExceptionDateTime = errDateTime;
                    errDetail.SessionId = this.sessionId;
                    errDetail.StackTrace = string.Empty; 
                    errDetail.InnerException = string.Empty;
                    var clntUtility = new Service.OBUtilityMethods.OBUtilityMethodsClient();
                    try
                    {
                        clntUtility.Open();
                        clntUtility.LogException(errDetail);
                    }
                    catch
                    {
                        this.LogErrorOnDBServiceFail(errDetail);
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
                }
                catch
                {
                    this.LogErrorOnDBServiceFail(errDetail);
                }
            }
        }

        /// <summary>
        /// dispose method
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        /// <summary>
        ///  Method for LogErrorOnDBServiceFail
        /// </summary>
        /// <param name="errDetail">Exception details</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", Justification = "Reviewed.")]
        private void LogErrorOnDBServiceFail(ErrorDetails errDetail)
        {
            using (SqlConnection errCon = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["conString"].ConnectionString))
            {
                SqlCommand errCmd = new SqlCommand();
                errCmd.CommandType = CommandType.StoredProcedure;
                errCmd.Connection = errCon;
                errCmd.CommandText = "usp_LogException";
                SqlParameter errParams;
                errParams = new SqlParameter();
                errParams.ParameterName = "SessionId";
                errParams.SqlDbType = SqlDbType.BigInt;
                errParams.Value = this.sessionId;
                errParams.Direction = ParameterDirection.Input;
                errCmd.Parameters.Add(errParams);
                errParams = new SqlParameter();
                errParams.ParameterName = "ErrorSource";
                errParams.SqlDbType = SqlDbType.VarChar;
                errParams.Value = errDetail.ErrorSource;
                errParams.Direction = ParameterDirection.Input;
                errCmd.Parameters.Add(errParams);
                errParams = new SqlParameter();
                errParams.ParameterName = "ErrorMessage";
                errParams.SqlDbType = SqlDbType.VarChar;
                errParams.Value = errDetail.ErrorMessage;
                errParams.Direction = ParameterDirection.Input;
                errCmd.Parameters.Add(errParams);
                errParams = new SqlParameter();
                errParams.ParameterName = "StackTrace";
                errParams.SqlDbType = SqlDbType.VarChar;
                errParams.Value = errDetail.StackTrace;
                errParams.Direction = ParameterDirection.Input;
                errCmd.Parameters.Add(errParams);
                errParams = new SqlParameter();
                errParams.ParameterName = "InnerException";
                errParams.SqlDbType = SqlDbType.VarChar;
                errParams.Value = errDetail.InnerException == null ? string.Empty : errDetail.InnerException.ToString();
                errParams.Direction = ParameterDirection.Input;
                errCmd.Parameters.Add(errParams);
                errParams = new SqlParameter();
                errParams.ParameterName = "ExceptionDateTime";
                errParams.SqlDbType = SqlDbType.DateTime;
                errParams.Value = errDetail.ExceptionDateTime;
                errParams.Direction = ParameterDirection.Input;
                errCmd.Parameters.Add(errParams);
                errCon.Open();
                errCmd.ExecuteNonQuery();
                errCon.Close();
                errCmd.Dispose();
            }
        }
    }
}

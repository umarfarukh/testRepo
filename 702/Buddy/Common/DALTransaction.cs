// ***********************************************************************
// <copyright file="DALTransaction.cs" company="Cognizant Technology Solutions">
//     Copyright (c) Cognizant Technology Solutions. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace Buddy
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.SqlClient;
    using System.Diagnostics.CodeAnalysis;
    using System.Linq;
    using System.Web;

    /// <summary>
    /// Method for DAL Transaction
    /// </summary>
    public class DALTransaction : IDisposable
    {
        #region Variables
        /// <summary>
        /// The m_connection string
        /// </summary>   
        private string mconnectionString;
        #endregion

        #region Dispose
        /// <summary>
        /// The disposed
        /// </summary>
        private bool disposed = false;

        #endregion

        #region Constructor

        /// <summary>
        /// Initializes a new instance of the <see cref="DALTransaction"/> class.
        /// </summary>
        public DALTransaction()
        {
            //// modify the key to match with what you have provided in your web.config file
            this.mconnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["AppConnString"].ConnectionString;
        }

        #endregion

        #region Dispose
        /// <summary>
        /// Finalizes an instance of the <see cref="DALTransaction"/> class.
        /// </summary>
        ~DALTransaction()
        {
            this.Dispose(false);
        }

        #endregion

        #region Properties
        /// <summary>
        /// Gets connection string
        /// </summary>
        private string ConnectionString
        {
            get
            {
                return this.mconnectionString;
            }
        }

        #endregion

        #region Methods
        /// <summary>
        /// Method for GetData
        /// </summary>
        /// <param name="param1">Parameter 1</param>
        /// <returns>data set</returns>
        [SuppressMessage("StyleCop.CSharp.MaintainabilityRules", "SA1119:StatementMustNotUseUnnecessaryParenthesis", Justification = "Reviewed.")]
        public DataSet GetData(string param1)
        {
            this.mconnectionString = this.ConnectionString;
            SqlConnection conSqlConnection;
            SqlDataAdapter daempData = new SqlDataAdapter();
            DataSet dsempData = new DataSet();
            string query = "<< stored procedure name >>"; //// store procedure name comes here
            try
            {
                if ((!string.IsNullOrEmpty(this.mconnectionString)))
                {
                    using (conSqlConnection = new SqlConnection(this.mconnectionString))
                    {
                        conSqlConnection.Open();
                        using (SqlCommand cmdEmpData = new SqlCommand(query, conSqlConnection))
                        {
                            daempData.SelectCommand = cmdEmpData;
                            cmdEmpData.Connection = conSqlConnection;
                            cmdEmpData.CommandType = CommandType.StoredProcedure;
                            cmdEmpData.Parameters.AddWithValue("@param1", param1);
                            //// cmdEmpData.ExecuteNonQuery();
                            daempData.Fill(dsempData);
                            dsempData.Tables[0].TableName = "<< proper table name >>"; //// set a proper table name, if necessary
                        }
                    }
                }

                return dsempData;
            }
            catch
            {
                throw;
            }
            finally
            {
                daempData.Dispose(); //// make sure you dispose the Data Adapter instance
            }
        }

        #endregion       
      
        #region Dispose

        /// <summary>
        /// Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.
        /// </summary>
        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// Releases unmanaged and - optionally - managed resources.
        /// </summary>
        /// <param name="disposeManagedResources"><c>true</c> to release both managed and unmanaged resources; <c>false</c> to release only unmanaged resources.</param>
        protected virtual void Dispose(bool disposeManagedResources)
        {
            if (!this.disposed)
            {
                this.disposed = true;
            }
        }
         #endregion
    }
}
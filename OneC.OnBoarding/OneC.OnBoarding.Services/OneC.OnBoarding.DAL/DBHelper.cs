//// <copyright file="DBHelper.cs" company="CognizantTechnologySolutions">
////Copyright (c) CognizantTechnologySolutions. All rights reserved.
//// </copyright>

/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DAL         
 * Class Name       : Utility.cs
 * Version          : 1.0
 * Type             : Class
 * Purpose          : Utility methods for Onboarding
 * Created date     : 2011-Dec-28
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

namespace OneC.OnBoarding.DAL
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Configuration;
    using System.Data;
    using System.Data.SqlClient;
    using System.Linq;
    using System.Reflection;
    using System.Runtime.Serialization;
    using System.Runtime.Serialization.Formatters;
    using System.Text;
    using System.Xml;
    using Microsoft.ApplicationBlocks.Data;
    #endregion
    /// <summary>
    /// 260947: Global data base helper class which has common methods for data base events
    /// </summary>
    public sealed class DBHelper
    {
        #region Declarations
        /// <summary>
        /// Global database connection string
        /// </summary>
        private static string dbconstring = ConfigurationManager.ConnectionStrings["conString"].ConnectionString;//261890- Added Private to remove stylecop

        #endregion
        /// <summary>
        /// Prevents a default instance of the DBHelper class from being created
        /// </summary>
        private DBHelper()
        {
        }

        /// <summary>
        /// Gets 260947: Property which gets global connection object
        /// </summary>
        public static SqlConnection GetConnection
        {
            get
            {
                return new SqlConnection(dbconstring);
            }
        }

        #region ExecuteDataset
        /// <summary>
        /// 260947: DB helper method which executes SP and returns dataset
        /// </summary>
        /// <remarks>Uses Helper class</remarks>
        /// <param name="spName">Stored procedure name</param>
        /// <returns>Data set</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", MessageId = "0", Justification = "Reviewed.")]
        public static DataSet ExecuteDataset(string spName)
        {
            spName = spName.Trim();
            return SqlHelper.ExecuteDataset(DBHelper.GetConnection, spName);
        }

        /// <summary>
        /// 260947: DB helper method which executes SP and returns dataset
        /// </summary>
        /// <remarks>Uses Helper class</remarks>
        /// <param name="spName">Stored procedure name</param>
        /// <param name="objDataContract">Data contract object</param>
        /// <returns>Data set</returns>
        public static DataSet ExecuteDataset(string spName, object objDataContract)
        {
            return SqlHelper.ExecuteDataset(dbconstring, CommandType.StoredProcedure, spName, GetSpParametersWithValue(spName, GetDataContractMembers(objDataContract)));

            ////try
            ////{
            ////    spName = spName.Trim();
            ////    using (SqlConnection dbcon = DBHelper.GetConnection)
            ////    {
            ////        dbcon.Open();
            ////        retDs = SqlHelper.ExecuteDataset(dbcon, spName, GetSpParametersWithValue(spName, GetDataContractMembers(objDataContract)));
            ////        dbcon.Close();
            ////    }
            ////}
            ////catch (Exception ex) { throw ex; }
            ////return retDs;
        }

        #endregion

        #region ExecuteNonQuery

        /// <summary>
        /// 260947: DB helper method which executes SP and returns integer
        /// </summary>
        /// <param name="spName">Stored procedure name</param>
        /// <param name="objDataContract">Data contract object</param>
        /// <returns>returns Integer</returns>
        public static int ExecuteNonQuery(string spName, object objDataContract)
        {
            ////int retValue;

            ////if (spName == null)
            ////    throw new Exception("Stored procedure name not found");

            ////if (spName.Trim() =="")
            ////    throw new Exception("Stored procedure name not found");

            ////if (objDataContract == null)
            ////    throw new Exception("Data contract object not found");
            return SqlHelper.ExecuteNonQuery(dbconstring, spName, GetSpParametersWithValue(spName, GetDataContractMembers(objDataContract)));
            ////try
            ////{
            ////    spName = spName.Trim();
            ////    using (SqlConnection dbcon = DBHelper.GetConnection)
            ////    {
            ////        //dbcon.Open();
            //        //retValue = SqlHelper.ExecuteNonQuery(dbcon, spName, GetSpParametersWithValue(spName, GetDataContractMembers(objDataContract)));
            //        //dbcon.Close();
            ////    }
            ////}
            ////catch{ throw; }
            ////return retValue;
        }

        #endregion

        #region ExecuteReader

        /// <summary>
        /// 260947: DataBase helper method which executes SP and returns DataReader
        /// </summary>
        /// <param name="spName">Stored procedure name</param>
        /// <param name="objDataContract">Data contract object</param>
        /// <returns>Data Reader</returns>
        public static SqlDataReader ExecuteReader(string spName, object objDataContract)
        {
            ////SqlDataReader retDr;

            ////if (spName == null)
            ////    throw new Exception("Stored procedure name not found");

            ////if (spName.Trim() == "")
            ////    throw new Exception("Stored procedure name not found");

            ////if (objDataContract == null)
            ////    throw new Exception("Data contract object not found");

            try
            {
                return SqlHelper.ExecuteReader(dbconstring, spName, GetSpParametersWithValue(spName, GetDataContractMembers(objDataContract)));
                ////spName = spName.Trim();
                ////using (SqlConnection dbcon = DBHelper.GetConnection)
                ////{
                ////    dbcon.Open();
                ////    retDr = SqlHelper.ExecuteReader(dbcon, spName, GetSpParametersWithValue(spName, GetDataContractMembers(objDataContract)));
                ////    //dbcon.Close();
                ////}
            }
            catch
            {
                throw;
            }
            ////return retDr;
        }

        #endregion

        #region ExecuteScalar

        /// <summary>
        /// 260947: DB helper method which executes SP and returns DataReader
        /// </summary>
        /// <param name="spName">Stored procedure name</param>
        /// <param name="objDataContract">Data contract object</param>
        /// <returns>Execute Scalar</returns>
        public static object ExecuteScalar(string spName, object objDataContract)
        {
            object retObj;
            if (spName == null)
            {
                throw new ArgumentNullException("spName");
            }

            if (string.IsNullOrEmpty(spName.Trim()))
            {
                throw new ArgumentNullException("spName");
            }

            if (objDataContract == null)
            {
                throw new ArgumentNullException("spName");
            }

            try
            {
                spName = spName.Trim();
                //// System.IO.StreamWriter file = new System.IO.StreamWriter("D:\\OnboardingLog.txt",true);
                ////string lines = "@ B4 DB Connection";
                using (SqlConnection dbcon = DBHelper.GetConnection)
                {
                    //// lines = "@ Aft DB Connection in DBHelper";
                    //// file.Write(lines);
                    //// file.Close(); 
                    dbcon.Open();
                    retObj = SqlHelper.ExecuteScalar(dbcon, spName, GetSpParametersWithValue(spName, GetDataContractMembers(objDataContract)));
                    ////dbcon.Close();
                }
            }
            catch
            {
                throw;
            }

            return retObj;
        }

        #endregion

        #region ExecuteXmlReader

        /// <summary>
        /// 260947: Data Base helper method which executes Stored Procedure and returns Structured query language DataReader
        /// </summary>
        /// <param name="spName">Stored procedure name</param>
        /// <param name="objDataContract">Data contract object</param>
        /// <returns>Xml Reader</returns>
        public static XmlReader ExecuteXmlReader(string spName, object objDataContract)
        {
            XmlReader retXmlReader;

            if (spName == null)
            {
                throw new ArgumentNullException("spName");
            }

            if (string.IsNullOrEmpty(spName.Trim()))
            {
                throw new ArgumentNullException("spName");
            }

            if (objDataContract == null)
            {
                throw new ArgumentNullException("spName");
            }

            try
            {
                spName = spName.Trim();
                using (SqlConnection dbcon = DBHelper.GetConnection)
                {
                    dbcon.Open();
                    retXmlReader = SqlHelper.ExecuteXmlReader(dbcon, spName, GetSpParametersWithValue(spName, GetDataContractMembers(objDataContract)));
                    ////dbcon.Close();
                }
            }
            catch
            {
                throw;
            }

            return retXmlReader;
        }

        #endregion

        #region Private utility methods & constructors

        /// <summary>
        /// 260947: Method which returns list of parameters for given SP
        /// </summary>
        /// <param name="spName">Stored procedure name</param>
        /// <returns>Returns Parameter[]</returns>
        public static SqlParameter[] GetSpParameters(string spName)
        {
            return SqlHelperParameterCache.GetSpParameterSet(dbconstring, spName);
        }

        //261890- Changed Private methods order to remove stylecop

        /// <summary>
        /// 260947: Method which set values to parameters from DC object
        /// </summary>
        /// <param name="spName">Stored procedure name</param>
        /// <param name="paramValue">Dictionary object which has key as members and value as object</param>
        /// <returns>Returns Parameter[]</returns>
        private static SqlParameter[] GetSpParametersWithValue(string spName, Dictionary<string, object> paramValue)
        {
            SqlParameter[] retSpParam;

            /* Getting parameters from DB */
            retSpParam = DBHelper.GetSpParameters(spName);

            /* Mapping and setting values to parameters */
            foreach (SqlParameter param in retSpParam)
            {
                if (param.SqlDbType == SqlDbType.Structured)
                {
                    string[] typeNameParts = param.TypeName.Split('.');
                    if (typeNameParts.Length == 3)
                    {
                        param.TypeName = string.Format("{0}.{1}", typeNameParts[1], typeNameParts[2]);
                    }
                }
            }

            /* Mapping and setting values to parameters */
            foreach (SqlParameter param in retSpParam)
            {
                foreach (var data in paramValue.Where(dc => dc.Key.Trim().ToLower() == param.ParameterName.ToString().Replace("@", string.Empty).Trim().ToLower()))
                {
                    if (param.SqlDbType == SqlDbType.Structured)
                    {
                        param.Value = (DataTable)data.Value;
                    }
                    else
                    {
                        param.Value = data.Value;
                    }
                }
            }

            return retSpParam;
        }

        /// <summary>
        /// 260947: Method which gets list of data members available to the supplied data contract
        /// </summary>
        /// <param name="objDC">contract members</param>
        /// <returns>members of data</returns>
        private static Dictionary<string, object> GetDataContractMembers(object objDC)
        {
            Dictionary<string, object> retDCMembers = new Dictionary<string, object>();

            BindingFlags instancePublicAndNot = BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic;

            retDCMembers = objDC.GetType()
                            .GetProperties(instancePublicAndNot)
                            .OfType<MemberInfo>()
                            .Where(x => x.MemberType.Equals(MemberTypes.Property))
                            .Select(x => new { member = x.Name.Trim().ToString(), value = objDC.GetType().GetProperty(x.Name.Trim().ToString()).GetValue(objDC, null) })
                            .ToDictionary(d => d.member, d => d.value);

            return retDCMembers;
        }

        #endregion private utility methods & constructors
    }
}

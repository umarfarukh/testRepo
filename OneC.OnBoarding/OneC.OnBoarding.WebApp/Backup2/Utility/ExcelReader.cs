//-----------------------------------------------------------------------
// <copyright file="ExcelReader.cs" company="Cognizant">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp.Utility
 * Class Name       : ExcelReader
 * Type             : Class
 * Purpose          : Class which read excel 
 * Created date     : 2013-sep-27
 * Author           : 312539
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
    using System.Collections;
    using System.Collections.Generic;
    using System.Data;
    using System.IO;
    using System.Linq;
    using System.Web;
    using System.Web.Services;
    using System.Web.UI;
    using System.Web.UI.WebControls;
    using System.Xml;
    using System.Xml.XPath;
    using System.Xml.Xsl;
    #endregion
    /// <summary>
    /// The class for Excel reader
    /// </summary>
    public static class ExcelReader
    {
        /// <summary>
        /// Main static method which imports XML spreadsheet into DataTable
        /// </summary>
        /// <param name="excelXmlFile">Imported file</param>
        /// <returns>dataTable result</returns>
        public static DataTable ReadExcelXML(string excelXmlFile)
        {
            DataTable dt = new DataTable();
            XmlDocument xc = new XmlDocument();

            xc.Load(excelXmlFile);
            XmlNamespaceManager nsmgr = new XmlNamespaceManager(xc.NameTable);
            nsmgr.AddNamespace("o", "urn:schemas-microsoft-com:office:office");
            nsmgr.AddNamespace("x", "urn:schemas-microsoft-com:office:excel");
            nsmgr.AddNamespace("ss", "urn:schemas-microsoft-com:office:spreadsheet");

            XmlElement xe = (XmlElement)xc.DocumentElement.SelectSingleNode("//ss:Worksheet/ss:Table", nsmgr);
            if (xe == null)
            {
                return null;
            }

            XmlNodeList xl = xe.SelectNodes("ss:Row", nsmgr);
            int row = -1, col = 0;
            Dictionary<int, string> cols = new Dictionary<int, string>();
            foreach (XmlElement xi in xl)
            {
                XmlNodeList xcells = xi.SelectNodes("ss:Cell", nsmgr);
                col = 0;
                foreach (XmlElement xcell in xcells)
                {
                    if (row == -1)
                    {
                        dt.Columns.Add(xcell.InnerText);
                        cols[col++] = xcell.InnerText;
                    }
                    else
                    {
                        if (xcell.Attributes["ss:Index"] != null)
                        {
                            int idx = int.Parse(xcell.Attributes["ss:Index"].InnerText);
                            col = idx - 1;
                        }

                        SetCol(dt, row, (string)cols[col++], xcell.InnerText.ToString(), typeof(string));
                    }
                }

                row++;
            }

            return dt;
        }

        /// <summary>
        /// Adds row to data table, manages System.DBNull and so
        /// </summary>
        /// <param name="dt">data table</param>
        /// <param name="acceptChanges">Accept Changes</param>
        /// <returns>row count</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:Validate arguments of public methods", Justification = "Reviewed.")]
        public static int AddRow(DataTable dt, bool acceptChanges)
        {
            object[] values = new object[dt.Columns.Count];
            for (int column = 0; column < dt.Columns.Count; column++)
            {
                if (!dt.Columns[column].AllowDBNull)
                {
                    if (dt.Columns[column].DefaultValue != null &&
                        dt.Columns[column].DefaultValue != System.DBNull.Value)
                    {
                        values[column] = dt.Columns[column].DefaultValue;
                    }
                }
            }

            dt.Rows.Add(values);
            if (acceptChanges)
            {
                dt.AcceptChanges();
            }

            return dt.Rows.Count - 1;
        }

        /// <summary>
        /// Sets data into data table in safe manner of row index
        /// </summary>
        /// <param name="dt">Data Table to set</param>
        /// <param name="row1">Ordinal row index</param>
        /// <param name="columnName">name of column to set</param>
        /// <param name="value">non/typed value to set</param>
        /// <param name="typeOfValue">Because Value can be null we must know data type to manage default values</param>
        /// <returns>data column</returns>
        public static DataColumn SetCol(DataTable dt, int row1, string columnName, object value, System.Type typeOfValue)
        {
           // bool added = false;
            if (dt == null || string.IsNullOrEmpty(columnName))
            {
                return null;
            }

            if (value == null)
            {
                value = System.DBNull.Value;
            }

            int numberIndex = -1;
            DataColumn dcol = null;
            if (dt.Columns.Contains(columnName))
            {
                dcol = dt.Columns[columnName];
            }
            else
            {
                dcol = dt.Columns.Add(columnName, typeOfValue);
            }

            if (dcol.ReadOnly)
            {
                dcol.ReadOnly = false;
            }

            numberIndex = dcol.Ordinal;
            //// new empty row appended
            if (dt.Rows.Count == row1 && row1 >= 0)
            {
                AddRow(dt, false);
                
            // added = true;
            }

            // one row
            if (row1 >= 0)
            {
                dt.Rows[row1][numberIndex] = value;
            }
            else if (row1 == -1)
            { // all rows
                try
                {
                    for (row1 = 0; row1 < dt.Rows.Count; row1++)
                    {
                        if (dt.Rows[row1].RowState == DataRowState.Deleted)
                        {
                            continue;
                        }

                        dt.Rows[row1][numberIndex] = value;
                    }
                }
                catch (Exception)
                {
                }
            }

            return dcol;
        }
    }
}
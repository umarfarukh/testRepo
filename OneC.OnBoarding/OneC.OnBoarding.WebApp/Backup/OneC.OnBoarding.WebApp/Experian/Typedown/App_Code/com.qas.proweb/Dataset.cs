//-----------------------------------------------------------------------
// <copyright file="DataSet.cs" company="External">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp
 * Class Name       : DataSet.cs
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

/// QuickAddress Pro Web > (c) QAS Ltd > www.qas.com
/// Common Classes > DataSet.cs
/// Data set details
namespace com.qas.proweb
{
    using System;
    using com.qas.proweb.soap;

    /// <summary>
    /// Simple class to encapsulate a Dataset - a searchable 'country'
    /// </summary>
    [Serializable]
    public class Dataset : IComparable
    {
        // -- Private Members --

        /// <summary>
        /// variable for id
        /// </summary>
        private string m_sID = null;

        /// <summary>
        /// variable for name
        /// </summary>
        private string m_sName = null;

        // -- Public Methods --

        /// <summary>
        /// Initializes a new instance of the <see cref="Dataset"/> class. Default constructor
        /// </summary>
        public Dataset()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="Dataset"/> class.
        /// </summary>
        /// <param name="d">QA data set</param>
        public Dataset(QADataSet d)
        {
            this.m_sID = d.ID;
            this.m_sName = d.Name;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="Dataset"/> class.
        /// </summary>
        /// <param name="sID">candidate ID</param>
        /// <param name="sName">search name</param>
        public Dataset(string sID, string sName)
        {
            this.m_sID = sID;
            this.m_sName = sName;
        }

        // -- Read-only Properties --

        /// <summary>
        /// Gets (Returns) the name of the data set
        /// </summary>
        public string Name
        {
            get
            {
                return this.m_sName;
            }
        }

        /// <summary>
        /// Gets (Returns) the ID of the data set (DataId)
        /// </summary>
        public string ID
        {
            get
            {
                return this.m_sID;
            }
        }

        /// <summary>
        /// Create array from SOAP-layer array
        /// </summary>
        /// <param name="aDatasets">a Data sets</param>
        /// <returns>a Results</returns>
        public static Dataset[] CreateArray(QADataSet[] aDatasets)
        {
            Dataset[] aResults = null;
            if (aDatasets != null)
            {
                int iSize = aDatasets.GetLength(0);
                if (iSize > 0)
                {
                    aResults = new Dataset[iSize];
                    for (int i = 0; i < iSize; i++)
                    {
                        aResults[i] = new Dataset(aDatasets[i]);
                    }
                }
            }

            return aResults;
        }

        /// <summary>
        /// Gets (Returns) the Dataset which matches the data ID, otherwise null
        /// </summary>
        /// <param name="aDatasets">Dataset array to search</param>
        /// <param name="sDataID">Data identifier to search for</param>
        /// <returns>a Data sets</returns>
        public static Dataset FindByID(Dataset[] aDatasets, string sDataID)
        {
            for (int i = 0; i < aDatasets.GetLength(0); i++)
            {
                if (aDatasets[i].ID.Equals(sDataID))
                {
                    return aDatasets[i];
                }
            }

            return null;
        }

        /// <summary>
        /// Method to  Implement IComparable interface
        /// </summary>
        /// <param name="obj">object to compare </param>
        /// <returns>name compared and matched</returns>
        public int CompareTo(object obj)
        {
            if (obj is Dataset)
            {
                Dataset dset = (Dataset)obj;

                return this.Name.CompareTo(dset.Name);
            }
            else
            {
                throw new ArgumentException("Object is not a Dataset");
            }
        }
    }
}
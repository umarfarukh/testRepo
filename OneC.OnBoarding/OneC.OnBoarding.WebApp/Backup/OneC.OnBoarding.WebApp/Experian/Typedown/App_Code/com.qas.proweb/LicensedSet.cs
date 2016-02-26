//-----------------------------------------------------------------------
// <copyright file="LicensedSet.cs" company="External">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp
 * Class Name       : LicensedSet.cs
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
/// 
/// Common Classes > LicensedSet.cs
/// Data licencing details
namespace com.qas.proweb
{
    using System;
    using com.qas.proweb.soap;

    /// <summary>
    /// Simple class to encapsulates data for a single licensed set
    /// </summary>
    public class LicensedSet
    {
        // -- Private Members --

        /// <summary>
        /// field for ID
        /// </summary>
        private string m_sID;

        /// <summary>
        /// field for Description
        /// </summary>
        private string m_sDescription;

        /// <summary>
        /// field for Copyright
        /// </summary>
        private string m_sCopyright;

        /// <summary>
        /// field for Version
        /// </summary>
        private string m_sVersion;

        /// <summary>
        /// field for Base Country
        /// </summary>
        private string m_sBaseCountry;

        /// <summary>
        /// field for Status
        /// </summary>
        private string m_sStatus;

        /// <summary>
        /// field for Server
        /// </summary>
        private string m_sServer;

        /// <summary>
        /// field for Warning Level
        /// </summary>
        private WarningLevels m_eWarningLevel;

        /// <summary>
        /// field for Days Left
        /// </summary>
        private int m_iDaysLeft;          // non-negative

        /// <summary>
        /// field for Data Days Left
        /// </summary>
        private int m_iDataDaysLeft;        // non-negative

        /// <summary>
        /// field for License days left
        /// </summary>
        private int m_iLicenceDaysLeft;     // non-negative

        // -- Public Methods --

        /// <summary>
        /// Initializes a new instance of the <see cref="LicensedSet"/> class.Construct from SOAP-layer object
        /// </summary>
        /// <param name="s">QA Licensed Set</param>
        public LicensedSet(QALicensedSet s)
        {
            this.m_sID = s.ID;
            this.m_sDescription = s.Description;
            this.m_sCopyright = s.Copyright;
            this.m_sVersion = s.Version;
            this.m_sBaseCountry = s.BaseCountry;
            this.m_sStatus = s.Status;
            this.m_sServer = s.Server;
            this.m_eWarningLevel = (WarningLevels)s.WarningLevel;
            this.m_iDaysLeft = System.Convert.ToInt32(s.DaysLeft);
            this.m_iDataDaysLeft = System.Convert.ToInt32(s.DataDaysLeft);
            this.m_iLicenceDaysLeft = System.Convert.ToInt32(s.LicenceDaysLeft);
        }

        // -- Public Constants --

        /// <summary>
        /// Enumeration of warning levels that can be returned
        /// </summary>
        public enum WarningLevels
        {
            /// <summary>
            /// value for None
            /// </summary>
            None = LicenceWarningLevel.None,

            /// <summary>
            /// value for Data Expiring
            /// </summary>
            DataExpiring = LicenceWarningLevel.DataExpiring,

            /// <summary>
            /// value for License Expiring
            /// </summary>
            LicenceExpiring = LicenceWarningLevel.LicenceExpiring,

            /// <summary>
            /// value for Click sLow
            /// </summary>
            ClicksLow = LicenceWarningLevel.ClicksLow,

            /// <summary>
            /// value for Evaluation
            /// </summary>
            Evaluation = LicenceWarningLevel.Evaluation,

            /// <summary>
            /// value for No Clicks
            /// </summary>
            NoClicks = LicenceWarningLevel.NoClicks,

            /// <summary>
            /// value for Data Expired
            /// </summary>
            DataExpired = LicenceWarningLevel.DataExpired,

            /// <summary>
            /// value for Evaluation License Expired
            /// </summary>
            EvalLicenceExpired = LicenceWarningLevel.EvalLicenceExpired,

            /// <summary>
            /// value for Full License Expired
            /// </summary>
            FullLicenceExpired = LicenceWarningLevel.FullLicenceExpired,

            /// <summary>
            /// value for License Not Found
            /// </summary>
            LicenceNotFound = LicenceWarningLevel.LicenceNotFound,

            /// <summary>
            /// value for data unreadable
            /// </summary>
            DataUnreadable = LicenceWarningLevel.DataUnreadable
        }

        // -- Read-only Properties --

        /// <summary>
        /// Gets (Returns) the ID of the licensed data
        /// </summary>
        public string ID
        {
            get
            {
                return this.m_sID;
            }
        }

        /// <summary>
        /// Gets (Returns) the description of the licensed data
        /// </summary>
        public string Description
        {
            get
            {
                return this.m_sDescription;
            }
        }

        /// <summary>
        /// Gets (Returns) the owner of the copyright for the licensed data
        /// </summary>
        public string Copyright
        {
            get
            {
                return this.m_sCopyright;
            }
        }

        /// <summary>
        /// Gets (Returns) the version of the licensed data
        /// </summary>
        public string Version
        {
            get
            {
                return this.m_sVersion;
            }
        }

        /// <summary>
        /// Gets (Returns) the DataId of the country with which this licensed dataset is associated
        /// </summary>
        public string BaseCountry
        {
            get
            {
                return this.m_sBaseCountry;
            }
        }

        /// <summary>
        /// Gets (Returns) status text detailing the amount of time left on the licensed set
        /// </summary>
        public string Status
        {
            get
            {
                return this.m_sStatus;
            }
        }

        /// <summary>
        /// Gets (Returns) the name of the QAS server where the data is being used
        /// </summary>
        public string Server
        {
            get
            {
                return this.m_sServer;
            }
        }

        /// <summary>
        /// Gets (Returns) the enumeration of the state of the data set
        /// </summary>
        public WarningLevels WarningLevel
        {
            get
            {
                return this.m_eWarningLevel;
            }
        }

        /// <summary>
        /// Gets (Returns) the number of days that the data will remain usable
        /// </summary>
        public int DaysLeft
        {
            get
            {
                return this.m_iDaysLeft;
            }
        }

        /// <summary>
        /// Gets (Returns) the number of days until the data expires
        /// </summary>
        public int DataDaysLeft
        {
            get
            {
                return this.m_iDataDaysLeft;
            }
        }

        /// <summary>
        /// Gets (Returns) the number of days until the license expires for this data
        /// </summary>
        public int LicenceDaysLeft
        {
            get
            {
                return this.m_iLicenceDaysLeft;
            }
        }

        // -- Public Methods --

        /// <summary>
        /// Create array of LicensedSets given a SOAP-layer QALicenseInfo object.
        /// We do not directly represent the QALicenseInfo structure, so lose it's warningLevel member
        /// We simply return an array of LicensedSets.
        /// </summary>
        /// <param name="info">QA License Info</param>
        /// <returns>a Results</returns>
        public static LicensedSet[] createArray(QALicenceInfo info)
        {
            LicensedSet[] aResults = null;
            QALicensedSet[] aInfo = info.LicensedSet;
            if (aInfo != null)
            {
                int iSize = aInfo.GetLength(0);
                if (iSize > 0)
                {
                    aResults = new LicensedSet[iSize];
                    for (int i = 0; i < iSize; i++)
                    {
                        aResults[i] = new LicensedSet(aInfo[i]);
                    }
                }
            }

            return aResults;
        }

        /// <summary>
        /// Method to create array for data map detail
        /// </summary>
        /// <param name="info">QA Data Map Detail</param>
        /// <returns>a Results</returns>
        public static LicensedSet[] createArray(QADataMapDetail info)
        {
            LicensedSet[] aResults = null;
            QALicensedSet[] aInfo = info.LicensedSet;

            if (aInfo != null)
            {
                if (aInfo.Length > 0)
                {
                    aResults = new LicensedSet[aInfo.Length];

                    for (int i = 0; i < aInfo.Length; ++i)
                    {
                        aResults[i] = new LicensedSet(aInfo[i]);
                    }
                }
            }

            return aResults;
        }
    }
}

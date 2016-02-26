//-----------------------------------------------------------------------
// <copyright file="AddressLine.cs" company="External">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.WebApp
 * Class Name       : AddressLine.cs
 * Version          : 1.0
 * Type             : Class
 * Purpose          : Aspx page to hold all the web methods for forms services
 * Created date     : 2012-Feb-13
 * Author           : External
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

//// QuickAddress Pro Web > (c) QAS Ltd > www.qas.com
//// Common Classes > AddressLine.cs
//// Address line details

namespace com.qas.proweb
{
    using System;
    using com.qas.proweb.soap;

    /// <summary>
    /// AddressLine encapsulates data associated with an address line of a formatted address.
    /// </summary>
    public class AddressLine
    {
       // -- Private Members --

        /// <summary>
        /// Variable used for label
        /// </summary>
        private string m_sLabel;

        /// <summary>
        /// Variable used for m_sLine
        /// </summary>
        private string m_sLine;

        /// <summary>
        /// Variable used for m_eLineType
        /// </summary>
        private Types m_eLineType;

        /// <summary>
        /// Variable used for m_bIsTruncated
        /// </summary>
        private bool m_bIsTruncated;

        /// <summary>
        /// Variable used for m_bIsOverflow
        /// </summary>
        private bool m_bIsOverflow;

        /// <summary>
        /// Variable used for Data plus Groups
        /// </summary>
        private DataplusGroup[] m_atDataplusGroups;

        // -- Public Methods --

        /// <summary>
        /// Initializes a new instance of the <see cref="AddressLine"/> class. Construct from SOAP-layer object
        /// </summary>
        /// <param name="t">Address Line Type</param>
        public AddressLine(AddressLineType t)
        {
            this.m_sLabel = t.Label;
            this.m_sLine = t.Line;
            this.m_eLineType = (Types)t.LineContent;
            this.m_bIsTruncated = t.Truncated;
            this.m_bIsOverflow = t.Overflow;

            if (t.DataplusGroup != null)
            {
                this.m_atDataplusGroups = new DataplusGroup[t.DataplusGroup.Length];

                for (int i = 0; i < t.DataplusGroup.Length; i++)
                {
                    DataplusGroup tGroup = new DataplusGroup(t.DataplusGroup[i]);

                    this.m_atDataplusGroups[i] = tGroup;
                }
            }
        }

        // -- Public Constants --

        /// <summary>
        /// Enumeration of available line types returned by getLineType()
        /// </summary>
        public enum Types
        {
            /// <summary>
            /// sets a value none
            /// </summary>
            None = LineContentType.None,

            /// <summary>
            /// sets a value address
            /// </summary>
            Address = LineContentType.Address,

            /// <summary>
            /// sets a value Name
            /// </summary>
            Name = LineContentType.Name,

            /// <summary>
            /// sets a value Ancillary
            /// </summary>
            Ancillary = LineContentType.Ancillary,

            /// <summary>
            /// sets a value DataPlus
            /// </summary>
            DataPlus = LineContentType.DataPlus
        }

        // -- Read-only Properties --

        /// <summary>
        /// Gets Returns the label of the line, probably the name of the address element fixed to it
        /// </summary>
        public string Label
        {
            get
            {
                return this.m_sLabel;
            }
        }

        /// <summary>
        /// Gets (Returns) the contents of the address line itself
        /// </summary>
        public string Line
        {
            get
            {
                return this.m_sLine;
            }
        }

        /// <summary>
        /// Gets values for data plus groups
        /// </summary>
        public DataplusGroup[] DataplusGroups
        {
            get
            {
                return this.m_atDataplusGroups;
            }
        }

        /// <summary>
        /// Gets (Returns) the type of the address line (Types enumeration: None ... DataPlus)
        /// </summary>
        public Types LineType
        {
            get
            {
                return this.m_eLineType;
            }
        }

        /// <summary>
        /// Gets a value indicating whether the line was truncated (Returns the flag)
        /// </summary>
        public bool IsTruncated
        {
            get
            {
                return this.m_bIsTruncated;
            }
        }

        /// <summary>
        /// Gets a value indicating whether some address elements were lost from this line( Returns the flag)
        /// </summary>
        public bool IsOverflow
        {
            get
            {
                return this.m_bIsOverflow;
            }
        }
    }

    /// <summary>
    /// Data plus Group is a named collection of items attached to an address line
    /// </summary>
    public class DataplusGroup
    {
        // -- Private Members --

        /// <summary>
        /// variable for group name array
        /// </summary>
        private string m_sGroupName;

        /// <summary>
        /// variable for items array
        /// </summary>
        private string[] m_asItems;

        /// <summary>
        /// Initializes a new instance of the <see cref="DataplusGroup"/> class. Construct from SOAP-layer object
        /// </summary>
        /// <param name="t"> Data plus Group Type</param>
        public DataplusGroup(DataplusGroupType t)
        {
            this.m_sGroupName = t.GroupName;
            this.m_asItems = t.DataplusGroupItem;
        }

        // -- Read-only Properties --

        /// <summary>
        /// Gets (Returns) the name of this data plus group ( may be an empty string )
        /// </summary>
        public string Name
        {
            get
            {
                return this.m_sGroupName;
            }
        }

        /// <summary>
        /// Gets (Returns) the data plus items in this group
        /// </summary>
        public string[] Items
        {
            get
            {
                return this.m_asItems;
            }
        }
    }
}

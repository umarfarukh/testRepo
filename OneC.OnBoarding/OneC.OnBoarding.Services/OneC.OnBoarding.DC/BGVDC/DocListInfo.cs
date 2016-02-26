//-----------------------------------------------------------------------
// <copyright file="DocListInfo.cs" company="CTS">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------

/*About me
*******************************************************
* Namespace        : OneC.OnBoarding.DC
* Class Name       : DocListInfo.cs
* Version          : 1.0
* Type             : DataContract
* Purpose          : Data contracts for DashBoards
* Created date     : 2014-May-05
* Author           : 298589
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

namespace OneC.OnBoarding.DC.BGVDC
{
    using System;
    using System.Runtime.Serialization;

    /// <summary>
    /// Represents the data contract for document list info screen.
    /// </summary>
    [DataContract(Name = "DocListInfo", Namespace = "http://onecognizant.cognizant.com/OnBoardingService/DataContracts/BGVDC/")]
    [Serializable]
    public class DocListInfo
    {
        /// <summary>
        /// Gets or sets the  Session id.
        /// </summary>
        [DataMember(Name = "SessionId", Order = 1)]
        public int Sessionid
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the Candidate.
        /// </summary>
        [DataMember(Name = "CandidateId", Order = 2)]
        public int CandidateId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the logged user role group Id.
        /// </summary>
        [DataMember(Name = "RoleGroupId", Order = 3)]
        public int RoleGroupId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the stored procedure mode.
        /// </summary>
        [DataMember(Name = "SpMode", Order = 4)]
        public int SpMode
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the value of upload runner Id.
        /// </summary>
        [DataMember(Name = "UpRunnerId", Order = 15)]
        public int UpRunnerId
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the value of up Id.
        /// </summary>
        [DataMember(Name = "UpId", Order = 12)]
        public string UpId
        {
            get;
            set;
        }

        /// <summary>
        /// Represents to dispose the garbage collector
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
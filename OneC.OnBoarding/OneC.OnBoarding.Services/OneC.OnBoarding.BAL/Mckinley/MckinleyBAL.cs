//// <copyright file="MckinleyBAL.cs" company="CognizantTechnologySolutions">
////Copyright (c) CognizantTechnologySolutions. All rights reserved.
//// </copyright>
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.BAL         
 * Class Name       : DashBoardBAL.cs
 * Version          : 1.0
 * Type             : Business Access Class
 * Purpose          : Methods Related to DAshBoard
 * Created date     : 2011-Jan-16
 * Author           : 208099
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

namespace OneC.OnBoarding.BAL.Mckinley
{
    #region #endregion
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Text;
    using OneC.OnBoarding.DAL.Mckinley;
    using OneC.OnBoarding.DC.UtilityDC;
    #endregion #endregion
    /// <summary>
    /// Mc Kinley BAL
    /// </summary>
    public sealed class MckinleyBAL : IDisposable
    {
        #region IDisposable Members
        /// <summary>
        /// Method to Dispose
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        #endregion

        /// <summary>
        /// To get Mc Kinley Categories
        /// </summary>
        /// <param name="mckinleyCategories">to get categories of mc kinley</param>
        /// <returns>categories of mc kinley</returns>
        public MCkinleyDC GetMckinleyCategories(MCkinleyDC mckinleyCategories)
        {
            using (MckinleyDAL objDAL = new MckinleyDAL())
            {
                return objDAL.GetMckinleyCategories(mckinleyCategories);
            }
        }
    }
}

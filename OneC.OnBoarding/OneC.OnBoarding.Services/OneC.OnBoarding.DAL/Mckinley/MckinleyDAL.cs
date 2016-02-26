//// <copyright file="MckinleyDAL.cs" company="CognizantTechnologySolutions">
////Copyright (c) CognizantTechnologySolutions. All rights reserved.
//// </copyright>
/*About me
 *******************************************************
 * Namespace        : OneC.OnBoarding.DAL.DashBoard      
 * Class Name       : DashBoard.cs
 * Version          : 1.0
 * Type             : Class
 * Purpose          : Methods Related to DashBoard
 * Created date     : 2012-Jan-12
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

namespace OneC.OnBoarding.DAL.Mckinley
{
    #region Namespaces
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Text;  
    using OneC.OnBoarding.DC.UtilityDC;
    #endregion Namespaces
    /// <summary>
    /// Mc Kinley DAL
    /// </summary>
   public sealed class MckinleyDAL : IDisposable 
    { 
       /// <summary>
       /// method to dispose
       /// </summary>
       public void Dispose()
       {
           GC.SuppressFinalize(this);
       }

       /// <summary>
       /// To get Mc Kinley Categories
       /// </summary>
       /// <param name="mckinleyCategories">categories of Mc Kinley</param>
       /// <returns>returns category </returns>
       [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope", Justification = "Reviewed.")]
       public MCkinleyDC GetMckinleyCategories(MCkinleyDC mckinleyCategories)
       {
           MCkinleyDC objMCkinleyDC = new MCkinleyDC();
 
           DataSet dsMckinleyCategories;
           dsMckinleyCategories = DBHelper.ExecuteDataset("sp_Categories", mckinleyCategories);
           if (dsMckinleyCategories.Tables.Count > 0)
           {
               dsMckinleyCategories.DataSetName = "Mckinley";
               dsMckinleyCategories.Tables[0].TableName = "Data";
               objMCkinleyDC.Content = dsMckinleyCategories.GetXml().ToString();
           }
           
           return objMCkinleyDC;
       }
    }
}

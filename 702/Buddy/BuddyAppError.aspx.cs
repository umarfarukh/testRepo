﻿//-----------------------------------------------------------------------
// <copyright file="BuddyAppError.aspx.cs" company="Cognizant">
//     Company copyright tag.
// </copyright>
//-----------------------------------------------------------------------
namespace Buddy
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.UI;
    using System.Web.UI.WebControls;

    /// <summary>
    /// class for Buddy App Error
    /// </summary>
    public partial class BuddyAppError : System.Web.UI.Page
    {
        /// <summary>
        /// method for page load
        /// </summary>
        /// <param name="sender">for sender</param>
        /// <param name="e">for e</param>
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.QueryString["Error"] != null)
            {
                this.ErrorMessage.InnerHtml = Request.QueryString["Error"];
            }
        }
    }
}
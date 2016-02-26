//-----------------------------------------------------------------------=
// <copyright file="DashboardUtility.cs" company="Cognizant Technology Solutions">
// Copyright  . All Rights Reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace OneC.OnBoarding.WebApp.Utility
{
    using System;
    using System.Collections.Generic;       
    using System.IO;
    using System.Linq; 
    using System.Reflection;
    using System.Text; 
    using System.Web;
    using System.Xml;
    using System.Xml.Linq;
    using System.Xml.Serialization;

  ////  [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1045 oNotPassTypesByReference", Justification = "Reviewed")]

    /// <summary>
    /// 260947: Class which provides method for logging unexpected system errors
    /// </summary>
    public static class DashboardUtility
    {
        /// <summary>
        /// Code to serialize the object(s) 
        /// </summary>
        /// <typeparam name="T"> T type </typeparam>
        /// <param name="value">value of the type</param>
        /// <returns> Text Writer </returns>
        public static string Serialize<T>(T value)
        {
            if (value == null)
            {
                return null;
            }

            XmlSerializer serializer = new XmlSerializer(typeof(T));
            XmlWriterSettings settings = new XmlWriterSettings();
            settings.Encoding = new UnicodeEncoding(false, false); //// no BOM in a .NET string 
            settings.Indent = false;
            settings.OmitXmlDeclaration = false;

            using (StringWriter textWriter = new StringWriter())
                {  
                try
                    {              
                    using (XmlWriter xmlWriter = XmlWriter.Create(textWriter, settings))
                    {
                        serializer.Serialize(xmlWriter, value);
                    }

                    return textWriter.ToString();
                    }
                finally 
                    {
                        textWriter.Close();              
                    }
                }                       
        }

        /// <summary>
        /// Converts objects to XML data
        /// </summary>
        /// <param name="objData">object to serialize </param>
        /// <returns>returns string</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1804:RemoveUnusedLocals", Justification = "Reviewed.")]
        public static string ConvertObjectToXML(object objData)
        {
            string retStr = string.Empty;
            BindingFlags instancePublicAndNot = BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic;
            var test = objData.GetType()
                            .GetProperties(instancePublicAndNot)
                            .OfType<MemberInfo>()
                            .Where(x => x.MemberType.Equals(MemberTypes.Property)
                                    && objData.GetType().GetProperty(x.Name.ToString()).GetValue(objData, null) != null
                                    && objData.GetType().GetProperty(x.Name.ToString()).GetValue(objData, null).ToString() != "0")                                   
                           .Select(x => new XElement(x.Name.Trim().ToString(), objData.GetType().GetProperty(x.Name.Trim().ToString()).GetValue(objData, null)).ToString())
                           .ToArray();

            string typeName = objData.GetType().ToString();
            retStr = string.Join(string.Empty, test).ToString();
            return retStr;
        }

        /// <summary>
        /// To calculate the pre and post joining numbers
        /// </summary>
        /// <param name="prejoiningCount">total count of pre-joining Candidates</param>
        /// <param name="postjoiningCount">total count of post-joining Candidates</param>
        /// <param name="preJoiningText">percentage calculation of pre-joining</param>
        /// <param name="postJoiningText">percentage calculation of post-joining</param>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1045:DoNotPassTypesByReference", Justification = "Reviewed")]
        public static void CalculatePreAndPostJoiningNumbers(long prejoiningCount, long postjoiningCount, ref string preJoiningText, ref string postJoiningText)
        {
            double totalSum = prejoiningCount + postjoiningCount;
            double dblPrejoiningPercent = 0, dblPostjoiningPercent = 0;

            if (prejoiningCount > 0)
            {
                dblPrejoiningPercent = (prejoiningCount / totalSum) * 100;
            }

            if (postjoiningCount > 0)
            {
                dblPostjoiningPercent = (postjoiningCount / totalSum) * 100;
            }

            int prejoiningPercent = 0, postjoiningPercent = 0;

            if (dblPrejoiningPercent > 0)
            {
                prejoiningPercent = Convert.ToInt32(Math.Round(dblPrejoiningPercent));
            }

            if (dblPostjoiningPercent > 0)
            {
                postjoiningPercent = Convert.ToInt32(Math.Round(dblPostjoiningPercent));
            }

            if (((prejoiningPercent + postjoiningPercent) < 100) && (prejoiningPercent > 0 || postjoiningPercent > 0))
            {
                if (prejoiningPercent > postjoiningPercent)
                {
                    prejoiningPercent += 100 - (prejoiningPercent + postjoiningPercent);
                }
                else
                {
                    postjoiningPercent += 100 - (prejoiningPercent + postjoiningPercent);
                }
            }

            preJoiningText = prejoiningCount.ToString() + " (" + prejoiningPercent.ToString() + "%)";
            postJoiningText = postjoiningCount.ToString() + " (" + postjoiningPercent.ToString() + "%)";
        }
    }
}
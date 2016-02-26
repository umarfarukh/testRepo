using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;

namespace OneC.OnBoarding.WebApp.CommonPages
{
    public partial class DownTime : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string IST_Start, IST_End;
            DateTime PST_Start, PST_End, UT_Start, UT_End,s,s1,s2;
            s = DateTime.Now.Date;
           
            IST_Start = ConfigurationManager.AppSettings["downtimestarttime"].ToString();
            IST_End = ConfigurationManager.AppSettings["downtimeendtime"].ToString();

            string[] words = IST_Start.Split('.');
            string[] words1 = IST_End.Split('.');

            s1 = s.AddHours(int.Parse(words[0]));
            s1 = s1.AddMinutes(int.Parse(words[1]));
            s2 = s.AddHours(int.Parse(words1[0]));
            s2 = s2.AddMinutes(int.Parse(words1[1]));
            PST_Start=TimeZoneInfo.ConvertTimeBySystemTimeZoneId(s1, TimeZoneInfo.Local.Id, "Pacific Standard Time");
            PST_End = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(s2, TimeZoneInfo.Local.Id, "Pacific Standard Time");
            UT_Start = s1.ToUniversalTime();
            UT_End = s2.ToUniversalTime();
            lblISTStart.Text = s1.ToString();
            lblISTEnd.Text = s2.ToString();
            lblPSTStart.Text = PST_Start.ToString();
            lblPSTEnd.Text = PST_End.ToString();
            lblGMTStart.Text = UT_Start.ToString();
            lblGMTEnd.Text = UT_End.ToString();
            
        }
    }
}
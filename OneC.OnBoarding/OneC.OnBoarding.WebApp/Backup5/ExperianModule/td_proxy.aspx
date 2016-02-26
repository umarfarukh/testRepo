<%@ Page Language="C#" Debug="true" %>

<%@ Import Namespace="System.Net" %>
<%@ Import Namespace="System.IO" %>
<%=""%>
<%
    string proxy = "";
    string proxyUser = "";
    string proxyPassword = "";
    string proxyDomain = "";
    string username = "";
    string password = "";
    string serviceUrl = "https://www.intelligentsearch.com/TowerDataWS/PhoneEmail.asmx/wsFindEmailPhone";

    // Get search information from POST.
    string email = (Request.Params["email"] != null) ? Uri.EscapeDataString(string.Format("\"{0}\"", Request.Params["email"])) : string.Empty;
    string phone = (Request.Params["phone"] != null) ? Uri.EscapeDataString(string.Format("\"{0}\"", Request.Params["phone"])) : string.Empty;
    string emailLev = Request.Params["emaillev"] != null ? Uri.UnescapeDataString(Request.Params["emaillev"]) : string.Empty;
    string response = "{}";
    string jsonpCallback = !string.IsNullOrEmpty(Request.Params["jsonpCallback"]) ? Uri.EscapeDataString(Request.Params["jsonpCallback"]) : string.Empty;

    Response.ContentType = "application/json";

    try
    {
        if (!string.IsNullOrEmpty(email) || !string.IsNullOrEmpty(phone))
        {
            String param = String.Format("{0}?username={1}&password={2}&email={3}&phone={4}",
                                          serviceUrl,
                                          Uri.EscapeUriString(username),
                                          Uri.EscapeUriString(password),
                                          email,
                                          phone);

            // Uncomment next two line to log request to web service.
            //File.AppendAllText(@"C:\work\Localhost\ProWebIst\aspLog.txt", param);
            //File.AppendAllText(@"C:\work\Localhost\ProWebIst\aspLog.txt", System.Environment.NewLine);

            HttpWebRequest serviceRequest = (HttpWebRequest)WebRequest.Create(param);
            serviceRequest.Method = WebRequestMethods.Http.Get;
            serviceRequest.ContentType = "application/json; charset=utf-8";
            serviceRequest.Accept = "application/json";

            // If proxy is set.
            if (!string.IsNullOrEmpty(proxy))
            {
                WebProxy serviceProxy = new WebProxy();
                serviceProxy.Address = new Uri(proxy);

                if (!string.IsNullOrEmpty(proxyUser))
                {
                    serviceProxy.Credentials = new NetworkCredential(proxyUser, proxyPassword, proxyDomain);
                }

                serviceRequest.Proxy = serviceProxy;
            }

            HttpWebResponse serviceResponse = (HttpWebResponse)serviceRequest.GetResponse();
            using (StreamReader r = new StreamReader(serviceResponse.GetResponseStream()))
            {
                response = r.ReadToEnd();
            }

            // Uncomment next two line to log response from web service.
            //File.AppendAllText(@"C:\work\Localhost\ProWebIst\aspLog.txt", response);
            //File.AppendAllText(@"C:\work\Localhost\ProWebIst\aspLog.txt", System.Environment.NewLine);
        }

        // Determine whether it is JSONP.
        if (!string.IsNullOrEmpty(jsonpCallback))
        {
            response = jsonpCallback + "(" + response + ")";
            Response.ContentType = "application/javascript";
        }

        Response.Write(response);
    }
    catch (Exception ex)
    {
        string thisError = "{ \"d\":{ \"error\": \"" + ex.Message + "\" }}";

        if (!string.IsNullOrEmpty(jsonpCallback))
        {
            thisError = jsonpCallback + "(" + thisError + ")";
            Response.ContentType = "application/javascript";
        }

        Response.Write(thisError);

        // Uncomment next two line to log error.
        //File.AppendAllText(@"C:\work\Localhost\ProWebIst\aspLog.txt", ex.Message);
        //File.AppendAllText(@"C:\work\Localhost\ProWebIst\aspLog.txt", System.Environment.NewLine);
    }
%>